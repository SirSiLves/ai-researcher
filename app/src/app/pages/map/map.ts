import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Skeleton } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';

import {
  DataService,
  RadarDay,
  RadarTopic,
  RadarSector,
  OrgIndexEntry
} from '../../services/data.service';
import { humanizeSlug } from '../../services/humanize';

interface SectorRow {
  sector: RadarSector;
  topics: RadarTopic[];
  rising: number;
  fading: number;
  topScore: number;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [FormsModule, DecimalPipe, Skeleton, ButtonModule],
  templateUrl: './map.html',
  styleUrl: './map.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapPage {
  private readonly data = inject(DataService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly radarDay = signal<RadarDay | null>(null);
  readonly orgsList = signal<OrgIndexEntry[]>([]);
  readonly loading = signal<boolean>(true);
  readonly availableDates = signal<string[]>([]);
  readonly selectedDate = signal<string | null>(null);

  // Selection state
  readonly activeSector = signal<string | null>(null);
  readonly search = signal<string>('');
  readonly sortKey = signal<'score' | 'momentum' | 'breadth' | 'stage'>('score');
  readonly stageFilter = signal<Set<string>>(new Set());

  // Lookup: lowercase label/slug → canonical org slug from orgs index.
  private readonly orgIndex = computed<Map<string, string>>(() => {
    const m = new Map<string, string>();
    for (const o of this.orgsList()) {
      m.set(o.slug.toLowerCase(), o.slug);
      m.set(o.slug.toLowerCase().replace(/-/g, ' '), o.slug);
      m.set(o.slug.toLowerCase().replace(/-/g, ''), o.slug);
    }
    return m;
  });

  /** Resolve a breadth_orgs_7d entry (may be label or slug) to the canonical org slug, or null. */
  resolveOrgSlug(raw: string): string | null {
    const idx = this.orgIndex();
    if (idx.has(raw.toLowerCase())) return idx.get(raw.toLowerCase())!;
    // Try kebab-casing.
    const kebab = raw.toLowerCase().trim().replace(/[\s_]+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (idx.has(kebab)) return idx.get(kebab)!;
    return null;
  }

  // ── DERIVED ──────────────────────────────────────────────────
  readonly sectorRows = computed<SectorRow[]>(() => {
    const d = this.radarDay();
    if (!d) return [];
    const byId = new Map(d.topics.map(t => [t.id, t]));
    return d.sectors.map(s => {
      const topics = s.topic_ids.map(id => byId.get(id)).filter((t): t is RadarTopic => !!t);
      const rising = topics.filter(t => t.direction === 'rising' || t.direction === 'surging').length;
      const fading = topics.filter(t => t.direction === 'fading').length;
      const topScore = topics.reduce((m, t) => Math.max(m, t.score_fast ?? 0), 0);
      return { sector: s, topics, rising, fading, topScore };
    }).sort((a, b) => b.topScore - a.topScore);
  });

  /** Topics filtered by current selection (sector, search, stage). */
  readonly filteredTopics = computed<RadarTopic[]>(() => {
    const d = this.radarDay();
    if (!d) return [];
    const sec = this.activeSector();
    const q = this.search().trim().toLowerCase();
    const stages = this.stageFilter();
    const key = this.sortKey();

    let out = d.topics.slice();
    if (sec) out = out.filter(t => t.sector === sec);
    if (q) out = out.filter(t => t.label.toLowerCase().includes(q));
    if (stages.size) out = out.filter(t => stages.has(t.stage));

    out.sort((a, b) => {
      if (key === 'score')    return (b.score_fast ?? 0) - (a.score_fast ?? 0);
      if (key === 'momentum') {
        const ma = (a.score_fast ?? 0) - (a.score_slow ?? 0);
        const mb = (b.score_fast ?? 0) - (b.score_slow ?? 0);
        return mb - ma;
      }
      if (key === 'breadth')  return (b.breadth_7d ?? 0) - (a.breadth_7d ?? 0);
      if (key === 'stage') {
        const order = ['mainstream', 'consolidating', 'emerging', 'fading'];
        return order.indexOf(a.stage) - order.indexOf(b.stage);
      }
      return 0;
    });
    return out;
  });

  /** Top firms in the current view — derived from active topics' breadth_orgs_7d.
   *  Only firms present in the orgs index are surfaced (others are unknown handles
   *  like blog authors that aren't tracked as organizations). */
  readonly topFirms = computed<{ slug: string; raw: string; mentions: number; org: OrgIndexEntry }[]>(() => {
    const topics = this.filteredTopics();
    if (!topics.length) return [];
    const orgMap = new Map(this.orgsList().map(o => [o.slug, o]));
    const counts = new Map<string, { count: number; raw: string }>();
    for (const t of topics) {
      for (const raw of t.breadth_orgs_7d ?? []) {
        const slug = this.resolveOrgSlug(raw);
        if (!slug) continue;
        const row = counts.get(slug) ?? { count: 0, raw };
        row.count += 1;
        counts.set(slug, row);
      }
    }
    return Array.from(counts.entries())
      .map(([slug, row]) => ({
        slug,
        raw: row.raw,
        mentions: row.count,
        org: orgMap.get(slug)!
      }))
      .filter(f => f.org)
      .sort((a, b) => {
        if (b.mentions !== a.mentions) return b.mentions - a.mentions;
        return (b.org.velocity_7d ?? 0) - (a.org.velocity_7d ?? 0);
      })
      .slice(0, 12);
  });

  readonly allStages = ['mainstream', 'consolidating', 'emerging', 'fading'];

  selectSector(name: string | null) {
    this.activeSector.update(cur => cur === name ? null : name);
  }

  toggleStage(stage: string) {
    this.stageFilter.update(set => {
      const next = new Set(set);
      next.has(stage) ? next.delete(stage) : next.add(stage);
      return next;
    });
  }

  clearAll() {
    this.activeSector.set(null);
    this.search.set('');
    this.stageFilter.set(new Set());
  }

  goToTopic(t: RadarTopic) {
    this.router.navigate(['/map/topic', t.id]);
  }

  goToFirm(slug: string) {
    this.router.navigate(['/map/firm', slug]);
  }

  /** Template helper — humanize a slug for display. */
  humanize(slug: string): string { return humanizeSlug(slug); }

  goBackToPulse() {
    const d = this.selectedDate();
    this.router.navigate(d ? ['/pulse', d] : ['/pulse']);
  }

  prevDate() {
    const dates = this.availableDates();
    const cur = this.selectedDate();
    const idx = dates.indexOf(cur ?? '');
    if (idx >= 0 && idx + 1 < dates.length) this.setDate(dates[idx + 1]);
  }
  nextDate() {
    const dates = this.availableDates();
    const cur = this.selectedDate();
    const idx = dates.indexOf(cur ?? '');
    if (idx > 0) this.setDate(dates[idx - 1]);
  }
  setDate(d: string) {
    this.selectedDate.set(d);
    this.router.navigate(['/map/at', d], { replaceUrl: true });
  }

  readonly canPrev = computed(() => {
    const dates = this.availableDates();
    const cur = this.selectedDate();
    return dates.indexOf(cur ?? '') < dates.length - 1;
  });
  readonly canNext = computed(() => {
    const dates = this.availableDates();
    const cur = this.selectedDate();
    return dates.indexOf(cur ?? '') > 0;
  });

  readonly formattedDate = computed(() => {
    const d = this.selectedDate();
    if (!d) return '';
    return new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
    });
  });

  velocityTone(status: string): string {
    if (status === 'surging') return 'success';
    if (status === 'accelerating') return 'accent';
    if (status === 'cooling') return 'warn';
    return 'neutral';
  }

  constructor() {
    // Load orgs index + radar index once.
    Promise.all([
      this.data.loadRadarIndex(),
      this.data.loadOrgsIndex()
    ]).then(([radarIdx, orgsIdx]) => {
      this.orgsList.set(orgsIdx.entries);
      const entries = radarIdx.entries.filter(e => !e.is_versioned);
      this.availableDates.set(entries.map(e => e.date_id));
      // Initial date: route param, else latest.
      const routeDate = this.route.snapshot.paramMap.get('date');
      const initial = routeDate ?? entries[0]?.date_id ?? null;
      this.selectedDate.set(initial);
    }).catch(() => this.loading.set(false));

    // React to URL param changes (back/forward navigation).
    this.route.paramMap.subscribe(p => {
      const d = p.get('date');
      if (d && d !== this.selectedDate()) this.selectedDate.set(d);
    });

    // Load radar day whenever selectedDate changes.
    effect(() => {
      const d = this.selectedDate();
      if (!d) return;
      this.data.loadRadarIndex().then(idx => {
        const entry = idx.entries.find(e => e.date_id === d) ?? idx.entries[0];
        if (!entry) { this.loading.set(false); return; }
        this.loading.set(true);
        this.radarDay.set(null);
        return this.data.loadRadarDay(entry.json_path).then(day => {
          if (this.selectedDate() !== d) return;
          this.radarDay.set(day);
          this.loading.set(false);
        });
      }).catch(() => this.loading.set(false));
    });
  }
}
