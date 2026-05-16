import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DecimalPipe, NgClass } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Skeleton } from 'primeng/skeleton';
import { Drawer } from 'primeng/drawer';

import {
  DataService,
  RadarDay,
  RadarEntry,
  RadarTopic,
  TopicCluster
} from '../../services/data.service';
import { RadarChart } from '../../components/radar-chart/radar-chart';
import { TrendRadar } from '../../components/trend-radar/trend-radar';
import { DateBar } from '../../components/date-bar/date-bar';
import { MaturityBadge } from '../../components/maturity-badge/maturity-badge';
import { PinnedChips } from '../../components/pinned-chips/pinned-chips';
import { PageHeader } from '../../components/page-header/page-header';

interface ClusterView {
  cluster: TopicCluster;
  delta: number;
  topics: RadarTopic[];
  sparkline: number[];
  topicSourceMix: Record<string, number>;
}

interface SourceMix {
  bucket: string;
  value: number;
  share: number;
}

const SOURCE_LABELS: Record<string, string> = {
  paper:                       'Papers',
  long_form_blog:              'Long-form blogs',
  priority_vendor_blog:        'Priority vendor blogs',
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

@Component({
  selector: 'app-trends',
  standalone: true,
  imports: [
    RouterLink, DecimalPipe, NgClass,
    TableModule, Skeleton, Drawer,
    RadarChart, TrendRadar, DateBar, MaturityBadge, PinnedChips, PageHeader
  ],
  templateUrl: './trends.html',
  styleUrl: './trends.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrendsPage {
  private readonly data = inject(DataService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly entries = signal<RadarEntry[]>([]);
  readonly selectedDate = signal<string | null>(null);
  readonly day = signal<RadarDay | null>(null);
  readonly history = signal<RadarDay[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  readonly selectedTopic = signal<RadarTopic | null>(null);
  readonly drawerOpen = signal<boolean>(false);

  readonly chipFilter = signal<string | null>(null);

  readonly filteredTopics = computed<RadarTopic[]>(() => {
    const d = this.day();
    if (!d) return [];
    const filt = this.chipFilter();
    if (!filt) return d.topics;
    return d.topics.filter(t => t.sector === filt);
  });

  readonly availableDates = computed(() => this.entries().map(e => e.date_id));

  readonly sectorNames = computed<string[]>(() => (this.day()?.sectors ?? []).map(s => s.name));
  readonly clusters = computed<TopicCluster[]>(() => this.day()?.topic_clusters ?? []);

  readonly clusterViews = computed<ClusterView[]>(() => {
    const d = this.day();
    if (!d) return [];
    const clusters = d.topic_clusters ?? [];
    const sparkMap = this.clusterSparklines();
    return clusters
      .map(c => {
        const ids = new Set(c.topic_ids);
        const topics = d.topics
          .filter(t => ids.has(t.id))
          .sort((a, b) => b.score_fast - a.score_fast);
        const mix: Record<string, number> = {};
        for (const t of topics) {
          const cap = t.source_mentions_capped ?? {};
          for (const k of Object.keys(cap)) {
            if (k === '_note') continue;
            const v = cap[k];
            if (typeof v === 'number') mix[k] = (mix[k] || 0) + v;
          }
        }
        return {
          cluster: c,
          delta: c.cluster_score_fast - c.cluster_score_slow,
          topics,
          sparkline: sparkMap[c.id] ?? [],
          topicSourceMix: mix
        };
      })
      .sort((a, b) => b.delta - a.delta);
  });

  readonly clusterSparklines = computed<Record<string, number[]>>(() => {
    const days = this.history();
    if (!days.length) return {};
    const byCluster: Record<string, number[]> = {};
    for (const day of days) {
      const todays = new Map((day.topic_clusters ?? []).map(c => [c.id, c.cluster_score_fast]));
      for (const id of new Set([...Object.keys(byCluster), ...todays.keys()])) {
        byCluster[id] = byCluster[id] ?? [];
        byCluster[id].push(todays.get(id) ?? 0);
      }
    }
    return byCluster;
  });

  readonly loudest = computed<RadarTopic[]>(() => {
    const d = this.day();
    if (!d) return [];
    return [...d.topics].sort((a, b) => b.score_fast - a.score_fast).slice(0, 10);
  });

  readonly risingCount = computed(
    () => this.day()?.topics.filter(t => t.direction === 'rising' || t.direction === 'surging').length ?? 0
  );
  readonly fadingCount = computed(() => this.day()?.topics.filter(t => t.direction === 'fading').length ?? 0);

  readonly drawerSourceMix = computed<SourceMix[]>(() => {
    const t = this.selectedTopic();
    if (!t) return [];
    const cap = t.source_mentions_capped ?? {};
    const items: { bucket: string; value: number }[] = [];
    for (const [k, v] of Object.entries(cap)) {
      if (k === '_note') continue;
      if (typeof v !== 'number' || !v) continue;
      items.push({ bucket: SOURCE_LABELS[k] ?? k, value: v });
    }
    items.sort((a, b) => b.value - a.value);
    const total = items.reduce((sum, i) => sum + i.value, 0) || 1;
    return items.map(i => ({ ...i, share: i.value / total }));
  });

  readonly drawerDeltaPct = computed<number | null>(() => {
    const t = this.selectedTopic();
    if (!t) return null;
    const slow = t.score_slow;
    if (!slow) return null;
    return ((t.score_fast - t.score_slow) / slow) * 100;
  });

  constructor() {
    this.data.loadRadarIndex()
      .then(idx => {
        const entries = idx.entries.filter(e => !e.is_versioned);
        this.entries.set(entries);
        const routeParam = this.route.snapshot.paramMap.get('date');
        this.selectedDate.set(routeParam ?? entries[0]?.date_id ?? null);
      })
      .catch(err => {
        this.error.set(`Couldn't load radar index: ${err.message ?? err}`);
        this.loading.set(false);
      });

    this.route.paramMap.subscribe(params => {
      const d = params.get('date');
      if (d && d !== this.selectedDate()) this.selectedDate.set(d);
    });

    effect(() => {
      const date = this.selectedDate();
      const list = this.entries();
      if (!date || !list.length) return;
      const idx = list.findIndex(e => e.date_id === date);
      if (idx < 0) return;
      const entry = list[idx];

      this.loading.set(true);
      this.day.set(null);
      this.history.set([]);

      const windowPaths = list.slice(idx, idx + 14).map(e => e.json_path);
      Promise.all([
        this.data.loadRadarDay(entry.json_path),
        this.data.loadRadarHistory(windowPaths, 14)
      ])
        .then(([d, hist]) => {
          this.day.set(d);
          this.history.set(hist);
          this.loading.set(false);
        })
        .catch(err => {
          this.error.set(`Couldn't load ${entry.json_path}: ${err.message ?? err}`);
          this.loading.set(false);
        });
    });

    effect(() => {
      const date = this.selectedDate();
      if (date && this.route.snapshot.paramMap.get('date') !== date) {
        this.router.navigate(['/radar', date], { replaceUrl: !this.route.snapshot.paramMap.get('date') });
      }
    });
  }

  selectTopic(t: RadarTopic) {
    this.selectedTopic.set(t);
    this.drawerOpen.set(true);
  }

  closeDrawer() {
    this.drawerOpen.set(false);
  }

  sparkPath(values: number[], width = 120, height = 32): string {
    if (!values.length) return '';
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = Math.max(1, max - min);
    const stepX = values.length > 1 ? width / (values.length - 1) : 0;
    return values
      .map((v, i) => {
        const x = (i * stepX).toFixed(1);
        const y = (height - ((v - min) / range) * height).toFixed(1);
        return `${i === 0 ? 'M' : 'L'}${x},${y}`;
      })
      .join(' ');
  }

  directionDot(dir: string): string {
    switch (dir) {
      case 'surging': return 'dot--strong';
      case 'rising':  return 'dot--accent';
      case 'fading':  return 'dot--warn';
      default:        return 'dot--muted';
    }
  }

  directionArrow(dir: string): string {
    switch (dir) {
      case 'surging': return '▲▲';
      case 'rising':  return '▲';
      case 'fading':  return '▼';
      case 'steady':  return '·';
      default:        return '·';
    }
  }

  pickDate(d: string) { this.selectedDate.set(d); }
}
