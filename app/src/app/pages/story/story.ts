import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe, NgClass } from '@angular/common';
import { Skeleton } from 'primeng/skeleton';
import { MeterGroup } from 'primeng/metergroup';

import {
  DataService,
  RadarDay,
  TopicCluster,
  RadarTopic
} from '../../services/data.service';
import { PageHeader } from '../../components/page-header/page-header';
import { humanizeSlug } from '../../services/humanize';
import { MenuItem } from 'primeng/api';

interface FirmRow {
  slug: string;
  topicCount: number;
  topics: string[];
  pct: number;
}

interface SourceMix {
  label: string;
  value: number;
  color: string;
}

const SOURCE_LABELS: Record<string, string> = {
  paper:                       'Papers',
  long_form_blog:              'Long-form blogs',
  priority_vendor_blog:        'Vendor blogs',
  enterprise_vendor_blog:      'Enterprise blogs',
  tech_news:                   'Tech news',
  linkedin_network_post:       'LinkedIn',
  medium_aggregator:           'Medium / aggregators',
  github_trending_signal:      'GitHub trending',
  github_watched_star_delta:   'GitHub stars',
  hn_front_page:               'Hacker News',
  governance_source:           'Governance / policy',
  job_posting_skill_mention:   'Job posts'
};

const SOURCE_COLORS: Record<string, string> = {
  paper:                       '#0ea5e9',
  long_form_blog:              '#3b82f6',
  priority_vendor_blog:        '#2563eb',
  enterprise_vendor_blog:      '#6366f1',
  tech_news:                   '#8b5cf6',
  linkedin_network_post:       '#06b6d4',
  medium_aggregator:           '#94a3b8',
  github_trending_signal:      '#a855f7',
  github_watched_star_delta:   '#7c3aed',
  hn_front_page:               '#f97316',
  governance_source:           '#10b981',
  job_posting_skill_mention:   '#eab308'
};

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [RouterLink, DecimalPipe, NgClass, Skeleton, MeterGroup, PageHeader],
  templateUrl: './story.html',
  styleUrl: './story.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoryPage {
  private readonly data = inject(DataService);
  private readonly route = inject(ActivatedRoute);

  readonly storyId = signal<string>('');
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  readonly day = signal<RadarDay | null>(null);
  readonly history = signal<RadarDay[]>([]);
  /** slug → display_name from orgs/index.json. firmDisplay() falls back to
   *  the slug while this is empty. */
  readonly firmNames = signal<Record<string, string>>({});

  firmDisplay(slug: string): string {
    return this.firmNames()[slug] ?? humanizeSlug(slug);
  }

  readonly cluster = computed<TopicCluster | null>(() => {
    const d = this.day();
    const id = this.storyId();
    if (!d || !id) return null;
    return (d.topic_clusters ?? []).find(c => c.id === id) ?? null;
  });

  readonly topics = computed<RadarTopic[]>(() => {
    const d = this.day();
    const c = this.cluster();
    if (!d || !c) return [];
    const ids = new Set(c.topic_ids);
    return d.topics
      .filter(t => ids.has(t.id))
      .sort((a, b) => b.score_fast - a.score_fast);
  });

  readonly sectors = computed<string[]>(() =>
    Array.from(new Set(this.topics().map(t => t.sector)))
  );

  readonly firms = computed<FirmRow[]>(() => {
    const ts = this.topics();
    const map = new Map<string, FirmRow>();
    for (const t of ts) {
      for (const o of t.breadth_orgs_7d ?? []) {
        const row = map.get(o) ?? { slug: o, topicCount: 0, topics: [], pct: 0 };
        row.topicCount += 1;
        if (!row.topics.includes(t.label)) row.topics.push(t.label);
        map.set(o, row);
      }
    }
    const rows = Array.from(map.values()).sort((a, b) => b.topicCount - a.topicCount);
    const max = Math.max(1, ...rows.map(r => r.topicCount));
    return rows.map(r => ({ ...r, pct: (r.topicCount / max) * 100 }));
  });

  readonly sourceMix = computed<SourceMix[]>(() => {
    const totals: Record<string, number> = {};
    for (const t of this.topics()) {
      const cap = t.source_mentions_capped ?? {};
      for (const [k, v] of Object.entries(cap)) {
        if (k === '_note') continue;
        if (typeof v !== 'number' || !v) continue;
        totals[k] = (totals[k] ?? 0) + v;
      }
    }
    const sum = Object.values(totals).reduce((a, b) => a + b, 0);
    if (!sum) return [];
    return Object.entries(totals)
      .sort(([, a], [, b]) => b - a)
      .map(([k, v]) => ({
        label: SOURCE_LABELS[k] ?? k,
        value: (v / sum) * 100,
        color: SOURCE_COLORS[k] ?? '#64748b'
      }));
  });

  readonly delta = computed(() => {
    const c = this.cluster();
    return c ? c.cluster_score_fast - c.cluster_score_slow : 0;
  });

  readonly sparkline = computed<number[]>(() => {
    const id = this.storyId();
    return this.history().map(d =>
      (d.topic_clusters ?? []).find(c => c.id === id)?.cluster_score_fast ?? 0
    );
  });

  readonly sparkPath = computed(() => {
    const v = this.sparkline();
    if (v.length < 2) return '';
    const w = 600, h = 100;
    const min = Math.min(...v);
    const max = Math.max(...v);
    const range = Math.max(1, max - min);
    const step = w / (v.length - 1);
    return v.map((val, i) => {
      const x = (i * step).toFixed(1);
      const y = (h - ((val - min) / range) * (h - 8) - 4).toFixed(1);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');
  });

  readonly areaPath = computed(() => {
    const v = this.sparkline();
    if (v.length < 2) return '';
    const w = 600, h = 100;
    const min = Math.min(...v);
    const max = Math.max(...v);
    const range = Math.max(1, max - min);
    const step = w / (v.length - 1);
    const stroke = v.map((val, i) => {
      const x = (i * step).toFixed(1);
      const y = (h - ((val - min) / range) * (h - 8) - 4).toFixed(1);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');
    return `${stroke} L${w},${h} L0,${h} Z`;
  });


  readonly evidence = computed<string[]>(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const t of this.topics()) {
      for (const link of t.supporting_links ?? []) {
        if (!seen.has(link)) { seen.add(link); out.push(link); }
        if (out.length >= 12) return out;
      }
    }
    return out;
  });

  readonly breadcrumb = computed<MenuItem[]>(() => {
    const c = this.cluster();
    return [
      { label: 'Map', routerLink: '/map' },
      { label: c?.name ?? 'Story' }
    ];
  });

  constructor() {
    this.route.paramMap.subscribe(p => {
      const id = p.get('id');
      if (id && id !== this.storyId()) {
        this.storyId.set(id);
        this.load();
      }
    });
    // Eagerly populate firmNames for the "Firms in this story" chips.
    this.data.loadOrgsIndex().then(idx => {
      const m: Record<string, string> = {};
      for (const e of idx.entries) {
        if (e.display_name) m[e.slug] = e.display_name;
      }
      this.firmNames.set(m);
    }).catch(() => { /* keep slug fallback */ });
  }

  private async load() {
    this.loading.set(true);
    this.error.set(null);
    try {
      const idx = await this.data.loadRadarIndex();
      const entries = idx.entries.filter(e => !e.is_versioned);
      const latest = entries[0];
      if (!latest) { this.loading.set(false); return; }
      const windowPaths = entries.slice(0, 14).map(e => e.json_path);
      const [d, hist] = await Promise.all([
        this.data.loadRadarDay(latest.json_path),
        this.data.loadRadarHistory(windowPaths, 14)
      ]);
      this.day.set(d);
      this.history.set(hist);
      this.loading.set(false);
    } catch (err: any) {
      this.error.set(`Couldn't load story: ${err?.message ?? err}`);
      this.loading.set(false);
    }
  }

  directionDotClass(dir: string): string {
    switch (dir) {
      case 'surging': return 'dot--strong';
      case 'rising':  return 'dot--accent';
      case 'fading':  return 'dot--warn';
      default:        return 'dot--muted';
    }
  }
}
