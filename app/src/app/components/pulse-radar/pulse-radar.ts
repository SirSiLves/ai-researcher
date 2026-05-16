import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal
} from '@angular/core';
import { NgClass, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadarTopic, RadarDay, StageMovement, TopicCluster } from '../../services/data.service';

/**
 * Pulse Radar — a new ground-up implementation.
 *
 * Geometry
 *   - 4 sector quadrants × 4 maturity rings.
 *   - Blip placement: angular position is sector centerline + per-bucket spread;
 *     radial position is the chosen ring's mid-radius. Capacity-aware spillover
 *     pushes overflow outward so the center never piles up.
 *
 * Visual language
 *   - Color = direction (surging/rising/steady/fading).
 *   - Size  = √(loudness / max).
 *   - Surging blips render a pulsing "echo" halo.
 *   - A slow rotating sweep arm provides ambient motion; disabled under
 *     prefers-reduced-motion.
 *   - Hovering a blip dims the field and draws a radial guide line from centre.
 *
 * Interaction
 *   - 4 filter affordances: sector chips, direction chips, stage chips, search.
 *   - Active filters dim non-matching blips and legend rows; tooltip + click
 *     remain on visible blips only.
 *   - Click anywhere on a blip (or its legend row) → `topicSelect.emit(topic)`.
 *   - Legend rows hover-sync with the radar; when a blip is hovered, the
 *     matching legend row auto-scrolls into view inside the legend panel.
 */

const RINGS = ['inner', 'core', 'mid', 'edge'] as const;
type Ring = (typeof RINGS)[number];

const RING_LABELS: Record<Ring, string> = {
  inner: 'Mainstream',
  core:  'Consolidating',
  mid:   'Surfacing',
  edge:  'Edge'
};

const STAGE_TO_RING: Record<string, Ring> = {
  mainstream:    'inner',
  consolidating: 'core',
  emerging:      'mid',
  fading:        'edge'
};

const DIRECTIONS = ['surging', 'rising', 'steady', 'fading'] as const;
type Direction = (typeof DIRECTIONS)[number];

interface Blip {
  topic: RadarTopic;
  cx: number;
  cy: number;
  r: number;
  ring: Ring;
  sector: string;
  direction: Direction | string;
  /** 1-based order index — used for staggered entrance animation + label. */
  i: number;
  /** Window-momentum in [-1, 1] — drives the trajectory bias and the surfacing-list sort. */
  momentum: number;
}

interface Quadrant {
  sector: string;
  startAngle: number;
  endAngle: number;
  midAngle: number;
  /** Endpoint of the radial divider on the rim. */
  edgeX: number;
  edgeY: number;
  /** SVG path id for arc text. */
  pathId: string;
  /** Path describing the arc the label sits on (outer rim, offset). */
  labelArcPath: string;
  /** Whether the arc was reversed so text reads left-to-right at the bottom. */
  labelReversed: boolean;
}

// SVG geometry.
const PAD = 96;            // canvas padding around the radar circle
const RADIUS = 232;
const SIZE = RADIUS * 2 + PAD * 2;
const CENTER = SIZE / 2;

// Ring outer radii — fractions of RADIUS, outer-to-inner.
const RING_RADII: Record<Ring, number> = {
  edge:  RADIUS,
  mid:   RADIUS * 0.72,
  core:  RADIUS * 0.46,
  inner: RADIUS * 0.22
};

@Component({
  selector: 'app-pulse-radar',
  standalone: true,
  imports: [NgClass, FormsModule, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pulse-radar.html',
  styleUrl: './pulse-radar.scss'
})
export class PulseRadar {
  private readonly host = inject(ElementRef<HTMLElement>);

  // ── Inputs / outputs ────────────────────────────────────────────────
  readonly topics = input.required<RadarTopic[]>();
  readonly sectorOrder = input<string[]>([]);
  /** Per-topic 14-day sparkline data; oldest → newest. Used in the rich tooltip. */
  readonly history = input<RadarDay[]>([]);
  /** Today's stage movements (topic crossed a maturity threshold). */
  readonly stageMovements = input<StageMovement[]>([]);
  /** Today's topic clusters (used for cluster connection lines + tooltip). */
  readonly clusters = input<TopicCluster[]>([]);
  /** Optional: available dates for the time-travel scrubber (newest first). */
  readonly availableDates = input<string[]>([]);
  /** Optional: currently selected date — drives the scrubber active tick. */
  readonly selectedDate = input<string | null>(null);
  /** When true, render the topic inventory below the radar canvas. Default off. */
  readonly showTopicList = input<boolean>(false);
  readonly topicSelect = output<RadarTopic>();
  readonly dateSelect = output<string>();

  /** Trend window — drives trail length, position trajectory, and the segmented
   *  control above the canvas. The page is responsible for handing back a
   *  `history` slice of matching length. */
  readonly window = input<'7d' | '14d' | '30d' | '90d'>('7d');
  readonly windowChange = output<'7d' | '14d' | '30d' | '90d'>();
  readonly WINDOWS = ['7d', '14d', '30d', '90d'] as const;
  /** Window length in days, derived from the input. */
  readonly windowDays = computed<number>(() => {
    switch (this.window()) {
      case '7d':  return 7;
      case '14d': return 14;
      case '30d': return 30;
      case '90d': return 90;
    }
  });

  // ── Template constants ──────────────────────────────────────────────
  readonly RING_KEYS = RINGS;
  readonly RING_LABELS = RING_LABELS;
  readonly DIRECTIONS = DIRECTIONS;
  readonly viewBox = `0 0 ${SIZE} ${SIZE}`;

  /** When a sector is filtered, crop the viewBox to that quadrant for a
   *  smooth zoom-in. Falls back to the full radar viewBox otherwise. */
  readonly activeViewBox = computed(() => {
    const sec = this.sectorFilter();
    if (!sec) return this.viewBox;
    const q = this.quadrants().find(q => q.sector === sec);
    if (!q) return this.viewBox;
    // Compute the axis-aligned bounding box of the quadrant's pie slice plus
    // a small padding for labels.
    const startA = q.startAngle;
    const endA = q.endAngle;
    const corners = [
      [CENTER, CENTER],
      [CENTER + Math.cos(startA) * RADIUS, CENTER + Math.sin(startA) * RADIUS],
      [CENTER + Math.cos(endA)   * RADIUS, CENTER + Math.sin(endA)   * RADIUS],
    ];
    // Add any cardinal points (0, π/2, π, 3π/2) the arc happens to cross.
    const cardinals = [0, Math.PI / 2, Math.PI, -Math.PI / 2, 3 * Math.PI / 2, -Math.PI];
    for (const c of cardinals) {
      if (angleInRange(c, startA, endA)) {
        corners.push([CENTER + Math.cos(c) * RADIUS, CENTER + Math.sin(c) * RADIUS]);
      }
    }
    const xs = corners.map(c => c[0]);
    const ys = corners.map(c => c[1]);
    const pad = 60;
    const minX = Math.min(...xs) - pad;
    const minY = Math.min(...ys) - pad;
    const maxX = Math.max(...xs) + pad;
    const maxY = Math.max(...ys) + pad;
    const w = maxX - minX;
    const h = maxY - minY;
    // Keep the viewBox square so the SVG doesn't squish.
    const side = Math.max(w, h);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    return `${cx - side / 2} ${cy - side / 2} ${side} ${side}`;
  });
  readonly SIZE = SIZE;
  readonly CENTER = CENTER;
  readonly RADIUS = RADIUS;

  // ── Filter state ────────────────────────────────────────────────────
  readonly sectorFilter = signal<string | null>(null);
  readonly directionFilter = signal<Set<string>>(new Set());
  readonly stageFilter = signal<Set<Ring>>(new Set());
  readonly search = signal<string>('');
  readonly clusterFilter = signal<string | null>(null);
  readonly hover = signal<Blip | null>(null);

  // ── Derived ─────────────────────────────────────────────────────────
  /** Resolved sector order: input → topic-derived → empty. Capped at 4. */
  readonly sectors = computed<string[]>(() => {
    const order = this.sectorOrder();
    const derived = Array.from(new Set(this.topics().map(t => t.sector)));
    return (order.length ? order : derived).slice(0, 4);
  });

  readonly quadrants = computed<Quadrant[]>(() => {
    const sectors = this.sectors();
    if (!sectors.length) return [];
    const step = (Math.PI * 2) / sectors.length;
    return sectors.map((sector, i) => {
      // Start at top (-π/2), clockwise.
      const start = -Math.PI / 2 + i * step;
      const end = start + step;
      const mid = (start + end) / 2;
      const edgeR = RADIUS;
      const edgeX = CENTER + Math.cos(start) * edgeR;
      const edgeY = CENTER + Math.sin(start) * edgeR;
      // Label-arc radius sits slightly outside the rim.
      const arcR = RADIUS + 18;
      // We always render the arc text so it reads left-to-right. If the arc's
      // midAngle lies in the bottom half (sin > ~0.05), reverse the sweep
      // direction so the text isn't upside-down.
      const reversed = Math.sin(mid) > 0.05;
      const a1 = reversed ? end : start;
      const a2 = reversed ? start : end;
      const x1 = CENTER + Math.cos(a1) * arcR;
      const y1 = CENTER + Math.sin(a1) * arcR;
      const x2 = CENTER + Math.cos(a2) * arcR;
      const y2 = CENTER + Math.sin(a2) * arcR;
      const sweep = reversed ? 0 : 1;
      const labelArcPath = `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${arcR} ${arcR} 0 0 ${sweep} ${x2.toFixed(2)} ${y2.toFixed(2)}`;
      return {
        sector,
        startAngle: start,
        endAngle: end,
        midAngle: mid,
        edgeX, edgeY,
        pathId: `pulse-radar-arc-${i}`,
        labelArcPath,
        labelReversed: reversed
      };
    });
  });

  /**
   * Place blips via a deterministic force simulation.
   *
   * Each blip's cell is determined by (sector quadrant, maturity ring). Within
   * that cell:
   *   1. We seed an initial (angle, radius) from a hash of `topic.id` so the
   *      layout is reproducible across reloads.
   *   2. Capacity-based spillover bumps excess inner-ring topics outward to
   *      keep the small center legible.
   *   3. A small force simulation runs ~140 ticks: pairwise collision pushes
   *      blips apart; a clamp step at the end of each tick re-projects any blip
   *      that has escaped its (quadrant arc, ring annulus) bounding box.
   *
   * No external dependency — the simulation is ~30 lines.
   */
  readonly blips = computed<Blip[]>(() => {
    const quadrants = this.quadrants();
    if (!quadrants.length) return [];
    const sectorIndex = new Map(quadrants.map((q, i) => [q.sector, i]));
    const topics = this.topics();
    if (!topics.length) return [];

    // Score thresholds (quartiles) — used when topic.stage is degenerate.
    const sortedScores = topics.map(t => t.score_fast).sort((a, b) => a - b);
    const q1 = quantile(sortedScores, 0.25);
    const q2 = quantile(sortedScores, 0.5);
    const q3 = quantile(sortedScores, 0.75);
    const maxScore = Math.max(1, ...topics.map(t => t.score_fast));

    interface Slot {
      topic: RadarTopic;
      qi: number;
      ring: Ring;
      r: number;
      x: number;
      y: number;
    }
    const slots = new Map<string, Slot[]>(); // key = `${qi}:${ring}`
    for (const t of topics) {
      const qi = sectorIndex.get(t.sector);
      if (qi === undefined) continue;
      const ring = chooseRing(t, q1, q2, q3);
      const key = `${qi}:${ring}`;
      const arr = slots.get(key) ?? [];
      arr.push({ topic: t, qi, ring, r: blipRadius(t.score_fast, maxScore), x: 0, y: 0 });
      slots.set(key, arr);
    }

    // Spillover: if a cell is so packed that no force layout can fit its
    // contents (rough capacity = area / blip-area × 0.6), bump the smallest
    // blips outward to the next ring.
    const arcMargin = 0.06;
    const annulusFor = (ring: Ring) => {
      const outer = RING_RADII[ring];
      const inner = innerRing(ring) ? RING_RADII[innerRing(ring) as Ring] : 0;
      return { outer, inner };
    };
    const cellCapacity = (qi: number, ring: Ring): number => {
      const { outer, inner } = annulusFor(ring);
      const span = (quadrants[qi].endAngle - quadrants[qi].startAngle) - arcMargin * 2;
      const area = 0.5 * span * (outer * outer - inner * inner);
      const blipArea = Math.PI * 12 * 12; // generous: ~12px radius blip footprint
      return Math.max(1, Math.floor((area / blipArea) * 0.8));
    };
    const spill: Ring[] = ['inner', 'core', 'mid'];
    for (let qi = 0; qi < quadrants.length; qi++) {
      for (const here of spill) {
        const next: Ring = here === 'inner' ? 'core' : here === 'core' ? 'mid' : 'edge';
        const arr = slots.get(`${qi}:${here}`) ?? [];
        const cap = cellCapacity(qi, here);
        if (arr.length > cap) {
          // Keep biggest in place, bump smallest out.
          arr.sort((a, b) => b.topic.score_fast - a.topic.score_fast);
          const keep = arr.slice(0, cap);
          const overflow = arr.slice(cap).map(s => ({ ...s, ring: next }));
          slots.set(`${qi}:${here}`, keep);
          const into = slots.get(`${qi}:${next}`) ?? [];
          slots.set(`${qi}:${next}`, into.concat(overflow));
        }
      }
    }

    // Look up start-of-window scores so position can be trajectory-biased.
    // Topics gaining slow-score over the window get pulled inward (toward
    // mainstream), losing topics drift outward. Returns a value in [-1, 1].
    // When a topic didn't exist N days ago we walk forward through history
    // to find its earliest appearance — keeps trails meaningful at 90d.
    const hist = this.history();
    const win = this.windowDays();
    const winStartIdx = Math.max(0, hist.length - win);
    const findEarliest = (id: string): RadarTopic | null => {
      for (let i = winStartIdx; i < hist.length; i++) {
        const t = hist[i].topics.find(x => x.id === id);
        if (t) return t;
      }
      return null;
    };
    const momentumOf = (t: RadarTopic): number => {
      const before = findEarliest(t.id);
      if (!before) return 0.8; // brand-new on radar this window → strong inward pull
      const slow = (t.score_slow ?? 0);
      const slowBefore = (before.score_slow ?? 0);
      const denom = Math.max(15, Math.max(slow, slowBefore));
      const m = (slow - slowBefore) / denom;
      return Math.max(-1, Math.min(1, m));
    };

    // Seed each blip with a deterministic initial position.
    for (const arr of slots.values()) {
      for (const s of arr) {
        const quad = quadrants[s.qi];
        const { outer, inner } = annulusFor(s.ring);
        const span = (quad.endAngle - quad.startAngle) - arcMargin * 2;
        const startA = quad.startAngle + arcMargin;
        const h = hash32(s.topic.id);
        const aFrac = (h % 1000) / 1000;        // 0..1
        const baseRFrac = ((h >>> 10) % 1000) / 1000;
        // Trajectory bias: rising → small rFrac (inner edge); falling → large.
        // Mostly trajectory (85%), small hash jitter (15%) so topics don't all
        // pile onto a single ring radius.
        const mom = momentumOf(s.topic); // -1..1
        const trajRFrac = 0.5 - mom * 0.5; // rising=0, steady=0.5, falling=1
        const rFrac = trajRFrac * 0.85 + baseRFrac * 0.15;
        const angle = startA + span * aFrac;
        // Bias toward the middle of the annulus so blips don't sit on rings.
        const innerPad = s.r + 2;
        const outerPad = s.r + 2;
        const radial = (inner + innerPad) + (outer - inner - innerPad - outerPad) * rFrac;
        s.x = CENTER + Math.cos(angle) * radial;
        s.y = CENTER + Math.sin(angle) * radial;
      }
    }

    // Flatten slots into a single array, preserving (quadrant, ring) order.
    const all: Slot[] = [];
    const ringOrder: Ring[] = ['edge', 'mid', 'core', 'inner'];
    for (let qi = 0; qi < quadrants.length; qi++) {
      for (const ring of ringOrder) {
        const arr = slots.get(`${qi}:${ring}`) ?? [];
        for (const s of arr) all.push(s);
      }
    }

    // Force simulation: collide + clamp into (quadrant, ring) box.
    // We split the run into two phases:
    //   Phase 1 (cooling): collisions push at full strength early, decaying.
    //   Phase 2 (settle):  many small full-strength collision-only passes so
    //                       no overlaps remain at the final positions.
    const PHASE1 = 100;
    const PHASE2 = 40;
    const TICKS = PHASE1 + PHASE2;
    for (let tick = 0; tick < TICKS; tick++) {
      const cool = tick < PHASE1 ? (1 - tick / PHASE1) * 0.85 + 0.15 : 1; // never zero
      // Pairwise collision.
      for (let i = 0; i < all.length; i++) {
        for (let j = i + 1; j < all.length; j++) {
          const a = all[i], b = all[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d2 = dx * dx + dy * dy;
          const minD = (a.r + b.r) + 2;
          if (d2 < minD * minD && d2 > 0.0001) {
            const d = Math.sqrt(d2);
            const overlap = (minD - d) / 2;
            const nx = dx / d;
            const ny = dy / d;
            a.x -= nx * overlap * cool;
            a.y -= ny * overlap * cool;
            b.x += nx * overlap * cool;
            b.y += ny * overlap * cool;
          }
        }
      }
      // Clamp each blip back into its (quadrant, ring) bounding box.
      for (const s of all) {
        const quad = quadrants[s.qi];
        const { outer, inner } = annulusFor(s.ring);
        const dx = s.x - CENTER;
        const dy = s.y - CENTER;
        let theta = Math.atan2(dy, dx);
        let rad = Math.sqrt(dx * dx + dy * dy);
        const tStart = quad.startAngle + arcMargin;
        const tEnd = quad.endAngle - arcMargin;
        theta = normaliseAngle(theta, tStart, tEnd);
        if (theta < tStart) theta = tStart;
        if (theta > tEnd) theta = tEnd;
        const rMin = inner + s.r + 1;
        const rMax = outer - s.r - 1;
        if (rad < rMin) rad = rMin;
        if (rad > rMax) rad = rMax;
        s.x = CENTER + Math.cos(theta) * rad;
        s.y = CENTER + Math.sin(theta) * rad;
      }
    }

    // Number blips in (quadrant, ring) order so the numbered list reads
    // clockwise around the radar, ring-by-ring within each quadrant.
    const out: Blip[] = [];
    let n = 0;
    for (let qi = 0; qi < quadrants.length; qi++) {
      for (const ring of ringOrder) {
        const arr = (slots.get(`${qi}:${ring}`) ?? []).slice()
          .sort((a, b) => b.topic.score_fast - a.topic.score_fast);
        for (const s of arr) {
          n += 1;
          out.push({
            topic: s.topic,
            cx: s.x,
            cy: s.y,
            r: s.r,
            ring: s.ring,
            sector: s.topic.sector,
            direction: s.topic.direction,
            i: n,
            momentum: momentumOf(s.topic),
          });
        }
      }
    }
    return out;
  });

  /** Motion trails — each blip's position at the start of the trend window.
   *  Computed using the same seeded layout against the historical day's data. */
  readonly trails = computed<Array<{ x1: number; y1: number; x2: number; y2: number; topicId: string; direction: string }>>(() => {
    const today = this.blips();
    if (!today.length) return [];
    const hist = this.history();
    if (hist.length < 2) return [];
    // history is oldest → newest. Walk back by windowDays-1 from the latest day.
    const win = this.windowDays();
    const winStartIdx = Math.max(0, hist.length - win);

    // Recompute past positions using the same algorithm structure as `blips`
    // — but only for topics that exist today. We reuse quadrant geometry and
    // the seeded hash so the past position is consistent.
    // For each topic, find its earliest appearance within the window — handles
    // topics that didn't exist at the very start of a 90d window.
    const quadrants = this.quadrants();
    if (!quadrants.length) return [];
    const sectorIndex = new Map(quadrants.map((q, i) => [q.sector, i]));
    const arcMargin = 0.06;

    const out: Array<{ x1: number; y1: number; x2: number; y2: number; topicId: string; direction: string }> = [];
    for (const b of today) {
      // Find the earliest day within the window where this topic existed.
      let past: RadarDay | null = null;
      let pastT: RadarTopic | null = null;
      for (let i = winStartIdx; i < hist.length - 1; i++) {
        const t = hist[i].topics.find(p => p.id === b.topic.id);
        if (t) { past = hist[i]; pastT = t; break; }
      }
      if (!past || !pastT) continue;
      const qi = sectorIndex.get(pastT.sector);
      if (qi === undefined) continue;
      const sortedScores = past.topics.map(t => t.score_fast).sort((a, b) => a - b);
      const q1 = quantile(sortedScores, 0.25);
      const q2 = quantile(sortedScores, 0.5);
      const q3 = quantile(sortedScores, 0.75);
      const ring = chooseRing(pastT, q1, q2, q3);
      const outer = RING_RADII[ring];
      const inner = innerRing(ring) ? RING_RADII[innerRing(ring) as Ring] : 0;
      const quad = quadrants[qi];
      const span = (quad.endAngle - quad.startAngle) - arcMargin * 2;
      const startA = quad.startAngle + arcMargin;
      const h = hash32(pastT.id);
      const aFrac = (h % 1000) / 1000;
      const rFrac = ((h >>> 10) % 1000) / 1000;
      const radial = inner + (outer - inner) * (0.2 + rFrac * 0.6);
      const angle = startA + span * aFrac;
      const x1 = CENTER + Math.cos(angle) * radial;
      const y1 = CENTER + Math.sin(angle) * radial;
      // Skip tiny moves (< 5px) to avoid trail noise on stationary blips.
      const dx = b.cx - x1;
      const dy = b.cy - y1;
      if (dx * dx + dy * dy < 25) continue;
      out.push({ x1, y1, x2: b.cx, y2: b.cy, topicId: b.topic.id, direction: b.direction });
    }
    return out;
  });

  /** Compact list of what changed today — drives the side "What changed" panel. */
  readonly changedToday = computed<Array<{ kind: 'new' | 'in' | 'out'; topic: RadarTopic | null; label: string; from?: string; to: string }>>(() => {
    const today = this.history()[this.history().length - 1]?.date;
    const byLabel = new Map(this.topics().map(t => [t.label, t]));
    const byId = new Map(this.topics().map(t => [t.id, t]));
    const out: Array<{ kind: 'new' | 'in' | 'out'; topic: RadarTopic | null; label: string; from?: string; to: string }> = [];

    // Stage movements first.
    for (const sm of this.stageMovements()) {
      const topic = byId.get(sm.topic) ?? byLabel.get(sm.topic) ?? null;
      const fromIdx = STAGE_ORDER.indexOf(sm.from ?? '');
      const toIdx = STAGE_ORDER.indexOf(sm.to);
      if (!sm.from || fromIdx < 0) {
        out.push({ kind: 'new', topic, label: topic?.label ?? sm.topic, to: sm.to });
      } else if (toIdx > fromIdx) {
        out.push({ kind: 'in', topic, label: topic?.label ?? sm.topic, from: sm.from, to: sm.to });
      } else if (toIdx < fromIdx) {
        out.push({ kind: 'out', topic, label: topic?.label ?? sm.topic, from: sm.from, to: sm.to });
      }
    }

    // Pure first-sightings (no stage_movement entry but first_seen = today).
    if (today) {
      for (const t of this.topics()) {
        if (t.first_seen === today && !out.find(x => x.topic?.id === t.id)) {
          out.push({ kind: 'new', topic: t, label: t.label, to: t.stage ?? '' });
        }
      }
    }
    return out;
  });

  /** Numbered side list grouped by ring (inner=Mainstream → edge=Edge). */
  readonly legendByRing = computed(() => {
    const blips = this.blips();
    const out: { ring: Ring; label: string; entries: Blip[] }[] = [];
    for (const ring of RINGS) {
      const entries = blips
        .filter(b => b.ring === ring)
        .sort((a, b) => a.i - b.i);
      if (entries.length) out.push({ ring, label: RING_LABELS[ring], entries });
    }
    return out;
  });

  /** Window-aware ordering — surfacing list groups by movement.
   *  Rising (gaining momentum) at top, steady in the middle, falling at the bottom.
   *  The grouping changes whenever the trend window changes. */
  readonly legendByMomentum = computed(() => {
    const blips = this.blips();
    const rising = blips.filter(b => b.momentum > 0.08).sort((a, b) => b.momentum - a.momentum);
    const falling = blips.filter(b => b.momentum < -0.08).sort((a, b) => a.momentum - b.momentum);
    const steady = blips.filter(b => b.momentum >= -0.08 && b.momentum <= 0.08)
                        .sort((a, b) => (b.topic.score_fast ?? 0) - (a.topic.score_fast ?? 0));
    const out: { kind: 'rising' | 'steady' | 'falling'; label: string; entries: Blip[] }[] = [];
    if (rising.length)  out.push({ kind: 'rising',  label: `Rising over ${this.windowDays()}d`, entries: rising });
    if (steady.length)  out.push({ kind: 'steady',  label: 'Steady',                              entries: steady });
    if (falling.length) out.push({ kind: 'falling', label: `Falling over ${this.windowDays()}d`,  entries: falling });
    return out;
  });

  /** Legend grouped by sector, in quadrant order. */
  readonly legendGroups = computed(() => {
    const blips = this.blips();
    const bySector = new Map<string, Blip[]>();
    for (const b of blips) {
      const arr = bySector.get(b.sector) ?? [];
      arr.push(b);
      bySector.set(b.sector, arr);
    }
    return this.quadrants().map(q => ({
      sector: q.sector,
      entries: (bySector.get(q.sector) ?? []).sort((a, b) => b.topic.score_fast - a.topic.score_fast)
    }));
  });

  // ── Dashboard-grade derived signals ─────────────────────────────────
  /** Top stat strip — counts of directions across all topics today. */
  readonly stats = computed(() => {
    const ts = this.topics();
    const surging = ts.filter(t => t.direction === 'surging').length;
    const rising  = ts.filter(t => t.direction === 'rising' || t.direction === 'surging').length;
    const fading  = ts.filter(t => t.direction === 'fading').length;
    return { total: ts.length, surging, rising, fading };
  });

  /** Biggest mover today = topic with largest (score_fast - score_slow) delta. */
  readonly biggestMover = computed<RadarTopic | null>(() => {
    let best: RadarTopic | null = null;
    let bestDelta = -Infinity;
    for (const t of this.topics()) {
      const d = (t.score_fast ?? 0) - (t.score_slow ?? 0);
      if (d > bestDelta) { bestDelta = d; best = t; }
    }
    return best;
  });

  /** Hottest sector = sector with most surging+rising topics today. */
  readonly hottestSector = computed<{ name: string; rising: number; total: number } | null>(() => {
    const bySector = new Map<string, { rising: number; total: number }>();
    for (const t of this.topics()) {
      const row = bySector.get(t.sector) ?? { rising: 0, total: 0 };
      row.total += 1;
      if (t.direction === 'rising' || t.direction === 'surging') row.rising += 1;
      bySector.set(t.sector, row);
    }
    let best: { name: string; rising: number; total: number } | null = null;
    for (const [name, row] of bySector.entries()) {
      if (!best || row.rising > best.rising) best = { name, ...row };
    }
    return best;
  });

  /** Sector-side-rail rows: count, rising, fading, top 2 topics. */
  readonly sectorRows = computed(() => {
    const byTopic = new Map(this.topics().map(t => [t.id, t]));
    return this.quadrants().map((q, idx) => {
      const ts = this.topics().filter(t => t.sector === q.sector);
      const rising = ts.filter(t => t.direction === 'rising' || t.direction === 'surging').length;
      const fading = ts.filter(t => t.direction === 'fading').length;
      const top = [...ts]
        .sort((a, b) => (b.score_fast ?? 0) - (a.score_fast ?? 0))
        .slice(0, 2);
      return { sector: q.sector, idx, total: ts.length, rising, fading, top };
    });
  });

  /** Map: topic-id → stage-movement (if any today). */
  readonly stageMovementMap = computed<Map<string, StageMovement>>(() => {
    const m = new Map<string, StageMovement>();
    for (const sm of this.stageMovements()) {
      // stage_movements uses topic label/slug — try both.
      m.set(sm.topic, sm);
    }
    return m;
  });

  /** Cluster connection lines — pairs of (blip-a, blip-b) inside the same cluster. */
  readonly clusterLines = computed<Array<{ x1: number; y1: number; x2: number; y2: number; clusterId: string }>>(() => {
    const blips = this.blips();
    const byId = new Map(blips.map(b => [b.topic.id, b]));
    const out: Array<{ x1: number; y1: number; x2: number; y2: number; clusterId: string }> = [];
    for (const c of this.clusters()) {
      // Centroid of the cluster — connect each member to it (star pattern).
      const members = c.topic_ids.map(id => byId.get(id)).filter((b): b is Blip => !!b);
      if (members.length < 2) continue;
      const cx = members.reduce((s, b) => s + b.cx, 0) / members.length;
      const cy = members.reduce((s, b) => s + b.cy, 0) / members.length;
      for (const b of members) {
        out.push({ x1: cx, y1: cy, x2: b.cx, y2: b.cy, clusterId: c.id });
      }
    }
    return out;
  });

  /** Cluster name for a topic, if any. */
  clusterNameOf(topic: RadarTopic): string | null {
    if (!topic.cluster_id) return null;
    const c = this.clusters().find(x => x.id === topic.cluster_id);
    return c?.name ?? null;
  }

  /** 14-day score_fast sparkline for a topic from history input. */
  sparkOf(topicId: string): number[] {
    return this.history().map(d => {
      const t = d.topics.find(x => x.id === topicId);
      return t?.score_fast ?? 0;
    });
  }

  /** Convert sparkline values to SVG path. */
  sparkPath(values: number[], w = 120, h = 28): string {
    if (values.length < 2) return '';
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = Math.max(1, max - min);
    const step = w / (values.length - 1);
    return values.map((v, i) => {
      const x = (i * step).toFixed(1);
      const y = (h - ((v - min) / range) * (h - 4) - 2).toFixed(1);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');
  }

  // ── Filter logic ────────────────────────────────────────────────────
  readonly hasActiveFilters = computed(() =>
    this.sectorFilter() !== null
    || this.directionFilter().size > 0
    || this.stageFilter().size > 0
    || this.clusterFilter() !== null
    || this.search().trim().length > 0
  );

  /** IDs of blips that pass the current filter combination. */
  readonly visibleIds = computed<Set<string>>(() => {
    const sec = this.sectorFilter();
    const dirs = this.directionFilter();
    const stages = this.stageFilter();
    const cluster = this.clusterFilter();
    const clusterMembers = cluster
      ? new Set(this.clusters().find(c => c.id === cluster)?.topic_ids ?? [])
      : null;
    const q = this.search().trim().toLowerCase();
    const out = new Set<string>();
    for (const b of this.blips()) {
      if (sec && b.sector !== sec) continue;
      if (dirs.size && !dirs.has(b.direction as string)) continue;
      if (stages.size && !stages.has(b.ring)) continue;
      if (clusterMembers && !clusterMembers.has(b.topic.id)) continue;
      if (q && !b.topic.label.toLowerCase().includes(q)) continue;
      out.add(b.topic.id);
    }
    return out;
  });

  readonly visibleCount = computed(() => this.visibleIds().size);

  toggleSector(s: string) { this.sectorFilter.update(cur => cur === s ? null : s); }
  toggleDirection(d: string) {
    this.directionFilter.update(set => {
      const next = new Set(set);
      next.has(d) ? next.delete(d) : next.add(d);
      return next;
    });
  }
  /** Exclusive direction select — used by the top-of-radar stat tiles.
   *  Toolbar chips still use `toggleDirection` for additive multi-select.
   *  Accepts a single direction or a list (e.g. "rising" tile maps to
   *  rising+surging to match the displayed count). */
  selectDirectionOnly(dirs: string | string[]) {
    const list = Array.isArray(dirs) ? dirs : [dirs];
    const cur = this.directionFilter();
    const sameSet = cur.size === list.length && list.every(d => cur.has(d));
    this.directionFilter.set(sameSet ? new Set() : new Set(list));
  }
  toggleStage(r: Ring) {
    this.stageFilter.update(set => {
      const next = new Set(set);
      next.has(r) ? next.delete(r) : next.add(r);
      return next;
    });
  }
  toggleCluster(id: string) {
    this.clusterFilter.update(cur => cur === id ? null : id);
  }
  clearFilters() {
    this.sectorFilter.set(null);
    this.directionFilter.set(new Set());
    this.stageFilter.set(new Set());
    this.clusterFilter.set(null);
    this.search.set('');
  }

  // ── Hover + click ───────────────────────────────────────────────────
  onBlipEnter(b: Blip) { this.hover.set(b); }
  onBlipLeave() { this.hover.set(null); }
  onBlipClick(b: Blip) { this.topicSelect.emit(b.topic); }
  onLegendEnter(topicId: string) {
    const b = this.blips().find(x => x.topic.id === topicId);
    if (b) this.hover.set(b);
  }

  // Effect: when a radar blip is hovered, scroll the matching legend row
  // into view in the side panel so the user can read its name.
  constructor() {
    effect(() => {
      const h = this.hover();
      if (!h) return;
      queueMicrotask(() => {
        const sel = `[data-topic-id="${cssEscape(h.topic.id)}"]`;
        const el = this.host.nativeElement.querySelector(sel) as HTMLElement | null;
        if (el && typeof el.scrollIntoView === 'function') {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  }

  // ── Template helpers ────────────────────────────────────────────────
  ringR(r: Ring): number { return RING_RADII[r]; }


  /** Pretty SVG path for one quadrant — used for the gradient wash. */
  quadrantPath(q: Quadrant): string {
    const r = RADIUS;
    const sx = CENTER + Math.cos(q.startAngle) * r;
    const sy = CENTER + Math.sin(q.startAngle) * r;
    const ex = CENTER + Math.cos(q.endAngle) * r;
    const ey = CENTER + Math.sin(q.endAngle) * r;
    const large = q.endAngle - q.startAngle > Math.PI ? 1 : 0;
    return `M ${CENTER} ${CENTER} L ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey} Z`;
  }

  /** When a blip is hovered, return the (cx, cy) at radar centre for guide line. */
  guideLine = computed(() => {
    const h = this.hover();
    if (!h) return null;
    return {
      x1: CENTER,
      y1: CENTER,
      x2: h.cx,
      y2: h.cy
    };
  });

  directionDot(dir: string): string {
    switch (dir) {
      case 'surging': return 'pulse--surging';
      case 'rising':  return 'pulse--rising';
      case 'steady':  return 'pulse--steady';
      case 'fading':  return 'pulse--fading';
      default:        return 'pulse--steady';
    }
  }

  /** Y position for ring labels — placed on the top vertical centerline,
   *  just inside each ring boundary. */
  ringLabelY(r: Ring): number { return CENTER - RING_RADII[r] + 14; }
}

// ─────────── Helpers ───────────

function chooseRing(t: RadarTopic, q1: number, q2: number, q3: number): Ring {
  if (t.stage && STAGE_TO_RING[t.stage]) {
    // We can't tell here whether stage is degenerate, so we always honour it.
    return STAGE_TO_RING[t.stage];
  }
  const s = t.score_fast;
  if (s >= q3) return 'inner';
  if (s >= q2) return 'core';
  if (s >= q1) return 'mid';
  return 'edge';
}

function blipRadius(score: number, maxScore: number): number {
  // 5px floor (touchable), ~14px ceiling.
  const scaled = Math.sqrt(Math.max(0, score) / Math.max(1, maxScore));
  return 5 + scaled * 9;
}

/** STAGE_ORDER: outer (edge / fading) → inner (mainstream). Higher index = more central. */
const STAGE_ORDER = ['fading', 'edge', 'emerging', 'consolidating', 'mainstream'];

/** Stable 32-bit hash (FNV-1a). Used as a deterministic seed for blip placement. */
function hash32(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Normalise angle `theta` so it sits in the range that wraps from `start` to `end`,
 *  handling the wrap at ±π. */
function normaliseAngle(theta: number, start: number, end: number): number {
  while (theta < start - Math.PI) theta += Math.PI * 2;
  while (theta > end + Math.PI) theta -= Math.PI * 2;
  return theta;
}

/** True if angle `a` lies inside the inclusive range [start, end]. Handles the wrap. */
function angleInRange(a: number, start: number, end: number): boolean {
  const TAU = Math.PI * 2;
  // Bring everything into [0, 2π).
  const norm = (x: number) => ((x % TAU) + TAU) % TAU;
  const A = norm(a), S = norm(start), E = norm(end);
  if (S <= E) return A >= S && A <= E;
  return A >= S || A <= E;
}

function quantile(sorted: number[], p: number): number {
  if (!sorted.length) return 0;
  const idx = (sorted.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return sorted[lo] * (hi - idx) + sorted[hi] * (idx - lo);
}

function innerRing(r: Ring): Ring | null {
  const order: Ring[] = ['inner', 'core', 'mid', 'edge'];
  const i = order.indexOf(r);
  return i > 0 ? order[i - 1] : null;
}

function cssEscape(s: string): string {
  if (typeof (globalThis as any).CSS?.escape === 'function') {
    return (globalThis as any).CSS.escape(s);
  }
  return s.replace(/[^a-zA-Z0-9_-]/g, ch => `\\${ch}`);
}
