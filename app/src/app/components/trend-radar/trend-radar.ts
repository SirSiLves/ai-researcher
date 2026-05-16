import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal
} from '@angular/core';
import { NgClass } from '@angular/common';
import { RadarTopic } from '../../services/data.service';

/**
 * Polar trend radar — ThoughtWorks/Zalando style.
 *
 * - Four angular quadrants = sectors (data-driven, capped at 4 for layout).
 * - Concentric rings = "tier" of presence.  Today every topic is stage=emerging,
 *   so we derive tier from score_fast quartiles, with stage taking precedence
 *   once a topic has a non-degenerate stage value.
 * - Blip = topic.  size ∝ score_fast.  color = direction.  movement glyph (▲/▼)
 *   marks surging/fading.
 *
 * Hover gives a tooltip, click emits the topic so the page can open the drawer.
 */

const RINGS = ['inner', 'core', 'mid', 'edge'] as const;
type Ring = typeof RINGS[number];

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

interface Blip {
  topic: RadarTopic;
  cx: number;
  cy: number;
  r: number;
  ring: Ring;
  sector: string;
  colorClass: string;
  movement: '▲' | '▼' | '';
  num: number; // 1-based numbered blip for the legend
}

interface Quadrant {
  sector: string;
  startAngle: number; // rad
  endAngle: number;   // rad
  midAngle: number;   // rad
  labelX: number;
  labelY: number;
  anchor: 'start' | 'end' | 'middle';
  dividerX: number;   // precomputed endpoint of the radial divider
  dividerY: number;
}

const SIZE = 520; // viewBox square — scales responsively
const CENTER = SIZE / 2;
const PAD = 28;
const RADIUS = CENTER - PAD;

@Component({
  selector: 'app-trend-radar',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trend-radar.html',
  styleUrl: './trend-radar.scss'
})
export class TrendRadar {
  readonly topics = input.required<RadarTopic[]>();
  readonly sectorOrder = input<string[]>([]);
  readonly topicSelect = output<RadarTopic>();

  readonly hover = signal<Blip | null>(null);

  readonly RING_LABELS = RING_LABELS;
  readonly SIZE = SIZE;
  readonly CENTER = CENTER;
  readonly RADIUS = RADIUS;
  readonly viewBox = `0 0 ${SIZE} ${SIZE}`;

  // Ring radii — fractions of RADIUS, outer-to-inner.
  readonly ringRadii: Record<Ring, number> = {
    edge:  RADIUS * 1.0,
    mid:   RADIUS * 0.72,
    core:  RADIUS * 0.46,
    inner: RADIUS * 0.22
  };

  readonly quadrants = computed<Quadrant[]>(() => {
    const order = this.sectorOrder();
    const sectorsFromTopics = Array.from(new Set(this.topics().map(t => t.sector)));
    const sectors = (order.length ? order : sectorsFromTopics).slice(0, 4);
    if (!sectors.length) return [];
    const n = Math.max(sectors.length, 1);
    // Start at top (-π/2) and go clockwise.
    const step = (Math.PI * 2) / n;
    return sectors.map((sector, i) => {
      const start = -Math.PI / 2 + i * step;
      const end = start + step;
      const mid = (start + end) / 2;
      // Place labels just outside the outer ring at the quadrant midpoint.
      const labelR = RADIUS + 16;
      const labelX = CENTER + Math.cos(mid) * labelR;
      const labelY = CENTER + Math.sin(mid) * labelR;
      // Anchor labels based on horizontal position so they don't overflow.
      const cos = Math.cos(mid);
      const anchor: Quadrant['anchor'] =
        cos > 0.35 ? 'start' : cos < -0.35 ? 'end' : 'middle';
      const dividerX = CENTER + Math.cos(start) * RADIUS;
      const dividerY = CENTER + Math.sin(start) * RADIUS;
      return {
        sector,
        startAngle: start, endAngle: end, midAngle: mid,
        labelX, labelY, anchor,
        dividerX, dividerY
      };
    });
  });

  readonly blips = computed<Blip[]>(() => {
    const quadrants = this.quadrants();
    if (!quadrants.length) return [];
    const sectorIndex = new Map(quadrants.map((q, i) => [q.sector, i]));
    const topics = this.topics();

    // Tier-by-score thresholds (used when stage is degenerate).
    const scores = topics.map(t => t.score_fast).sort((a, b) => a - b);
    const q1 = quantile(scores, 0.25);
    const q2 = quantile(scores, 0.5);
    const q3 = quantile(scores, 0.75);

    // Score-size scale: clamp so smallest still hittable, biggest doesn't crowd.
    const maxScore = Math.max(1, ...topics.map(t => t.score_fast));

    // Bucket topics by quadrant + ring so we can place them along the arc
    // without overlap.
    const buckets = new Map<string, RadarTopic[]>();
    const place: { topic: RadarTopic; ring: Ring; qIdx: number }[] = [];
    for (const t of topics) {
      const qIdx = sectorIndex.get(t.sector);
      if (qIdx === undefined) continue;
      const ring = chooseRing(t, q1, q2, q3);
      const key = `${qIdx}:${ring}`;
      const list = buckets.get(key) ?? [];
      list.push(t);
      buckets.set(key, list);
      place.push({ topic: t, ring, qIdx });
    }

    let counter = 0;
    const blips: Blip[] = [];
    // Sort within each bucket so the biggest sits at the centerline.
    for (const list of buckets.values()) {
      list.sort((a, b) => b.score_fast - a.score_fast);
    }

    for (const list of buckets.values()) {
      // No re-iteration needed; we build blips per bucket below.
    }

    // Build blips bucket by bucket (deterministic order: by quadrant then ring).
    const ringOrder: Ring[] = ['edge', 'mid', 'core', 'inner'];
    for (let qIdx = 0; qIdx < quadrants.length; qIdx++) {
      const quad = quadrants[qIdx];
      for (const ring of ringOrder) {
        const list = buckets.get(`${qIdx}:${ring}`) ?? [];
        if (!list.length) continue;

        const ringRadius = this.ringRadii[ring];
        const inner = innerRing(ring);
        const ringRadiusInner = inner ? this.ringRadii[inner] : 0;
        const midR = (ringRadius + ringRadiusInner) / 2;

        // Spread blips evenly across the inside of this quadrant arc, with
        // a small margin off the radial dividers so blips don't sit on them.
        const arcMargin = 0.08;
        const span = quad.endAngle - quad.startAngle - arcMargin * 2;
        const first = quad.startAngle + arcMargin;
        const n = list.length;
        for (let i = 0; i < n; i++) {
          const t = list[i];
          const frac = n === 1 ? 0.5 : i / (n - 1);
          const angle = first + span * frac;
          // Vary radius slightly so larger blips don't overlap.
          const radial = midR + (((i % 2) === 0 ? -1 : 1) * Math.min(8, n * 1.5));
          const cx = CENTER + Math.cos(angle) * radial;
          const cy = CENTER + Math.sin(angle) * radial;
          const r = blipRadius(t.score_fast, maxScore);
          counter += 1;
          blips.push({
            topic: t,
            cx, cy, r,
            ring,
            sector: t.sector,
            colorClass: directionClass(t.direction),
            movement: movementGlyph(t.direction),
            num: counter
          });
        }
      }
    }
    return blips;
  });

  // ─ event handlers ────────────────────────────────────────────────────
  onBlipEnter(b: Blip) { this.hover.set(b); }
  onBlipLeave() { this.hover.set(null); }
  onBlipClick(b: Blip) { this.topicSelect.emit(b.topic); }

  // ─ template helpers ──────────────────────────────────────────────────
  ringRadius(r: Ring): number { return this.ringRadii[r]; }

  ringLabelY(r: Ring): number {
    // Place ring labels on the vertical centerline, just inside the ring.
    return CENTER - this.ringRadii[r] + 12;
  }

  // SVG path for a single quadrant arc, used as a subtle fill for alternating quadrants.
  quadrantPath(q: Quadrant): string {
    const r = RADIUS;
    const sx = CENTER + Math.cos(q.startAngle) * r;
    const sy = CENTER + Math.sin(q.startAngle) * r;
    const ex = CENTER + Math.cos(q.endAngle) * r;
    const ey = CENTER + Math.sin(q.endAngle) * r;
    const large = (q.endAngle - q.startAngle) > Math.PI ? 1 : 0;
    return `M ${CENTER} ${CENTER} L ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey} Z`;
  }
}

// ─ helpers (module scope) ──────────────────────────────────────────────

function chooseRing(t: RadarTopic, q1: number, q2: number, q3: number): Ring {
  if (t.stage && STAGE_TO_RING[t.stage]) {
    const allEmerging = STAGE_TO_RING[t.stage] === 'mid';
    // If stage is informative (i.e., not degenerate "emerging"), trust it.
    // We can't know degeneracy from one topic — caller could pass a hint.
    // For now: use stage; fall through to quartile only if explicitly unknown.
    if (!allEmerging) return STAGE_TO_RING[t.stage];
  }
  // Quartile-based fallback (and current default while every topic is "emerging").
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

function directionClass(dir: string): string {
  switch (dir) {
    case 'surging': return 'blip--surging';
    case 'rising':  return 'blip--rising';
    case 'steady':  return 'blip--steady';
    case 'fading':  return 'blip--fading';
    default:        return 'blip--steady';
  }
}

function movementGlyph(dir: string): '▲' | '▼' | '' {
  if (dir === 'surging') return '▲';
  if (dir === 'fading')  return '▼';
  return '';
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
