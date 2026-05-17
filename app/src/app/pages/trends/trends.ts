import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe, NgClass } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Skeleton } from 'primeng/skeleton';
import { DatePicker } from 'primeng/datepicker';
import { Panel } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { Drawer } from 'primeng/drawer';

import {
  DataService,
  RadarDay,
  RadarEntry,
  RadarTopic,
  RadarSector,
  TopicCluster
} from '../../services/data.service';
import { RadarChart } from '../../components/radar-chart/radar-chart';
import { MarkdownViewer } from '../../components/markdown-viewer/markdown-viewer';

interface ClusterView {
  cluster: TopicCluster;
  delta: number;            // fast - slow ; positive = accelerating
  topics: RadarTopic[];
  sparkline: number[];      // cluster_score_fast across the window (chrono)
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
    FormsModule, DecimalPipe, NgClass,
    TableModule, Skeleton, DatePicker, Panel, ButtonModule, Drawer,
    RadarChart, MarkdownViewer
  ],
  templateUrl: './trends.html',
  styleUrl: './trends.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrendsPage {
  private readonly data = inject(DataService);

  readonly entries = signal<RadarEntry[]>([]);
  readonly selectedDate = signal<string | null>(null);
  readonly day = signal<RadarDay | null>(null);
  readonly history = signal<RadarDay[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);
  readonly note = signal<string>('');
  readonly showNote = signal<boolean>(false);

  // Drawer state
  readonly selectedTopic = signal<RadarTopic | null>(null);
  readonly drawerOpen = signal<boolean>(false);

  readonly availableDateSet = computed(() => new Set(this.entries().map(e => e.date_id)));
  readonly minDate = computed(() => {
    const e = this.entries();
    return e.length ? new Date(e[e.length - 1].date_id + 'T00:00:00') : null;
  });
  readonly maxDate = computed(() => {
    const e = this.entries();
    return e.length ? new Date(e[0].date_id + 'T00:00:00') : null;
  });
  readonly selectedDateValue = computed(() => {
    const d = this.selectedDate();
    return d ? new Date(d + 'T00:00:00') : null;
  });
  readonly currentIndex = computed(() => {
    const d = this.selectedDate();
    return this.entries().findIndex(e => e.date_id === d);
  });
  readonly canOlder = computed(() => {
    const i = this.currentIndex();
    return i >= 0 && i < this.entries().length - 1;
  });
  readonly canNewer = computed(() => this.currentIndex() > 0);

  readonly dateFilter = (d: { year: number; month: number; day: number }): boolean => {
    const iso = `${d.year}-${String(d.month + 1).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`;
    return this.availableDateSet().has(iso);
  };

  readonly sectors = computed<RadarSector[]>(() => this.day()?.sectors ?? []);
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

  // Cluster_id → chronological fast-score series across loaded history.
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
  readonly stageMoves = computed(() => this.day()?.stage_movements ?? []);

  // ─ Drawer-only computeds ─────────────────────────────────────────────────
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
        this.selectedDate.set(entries[0]?.date_id ?? null);
      })
      .catch(err => {
        this.error.set(`Couldn't load radar index: ${err.message ?? err}`);
        this.loading.set(false);
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
      this.note.set('');

      // Pull selected day + history window (selected + 13 older) in parallel.
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

      this.data.loadMarkdown(entry.md_path)
        .then(text => this.note.set(text))
        .catch(() => { /* note is optional */ });
    });
  }

  // ─ Inline helpers used in template ───────────────────────────────────────
  topicsInSector(s: RadarSector): RadarTopic[] {
    const d = this.day();
    if (!d) return [];
    const ids = new Set(s.topic_ids);
    return d.topics.filter(t => ids.has(t.id)).sort((a, b) => b.score_fast - a.score_fast);
  }

  selectTopic(t: RadarTopic) {
    this.selectedTopic.set(t);
    this.drawerOpen.set(true);
  }

  closeDrawer() {
    this.drawerOpen.set(false);
  }

  /** Build an inline SVG sparkline path for the cluster fast-score series. */
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

  sparkLast(values: number[]): number {
    return values.length ? values[values.length - 1] : 0;
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

  sourceLabel(key: string): string {
    return SOURCE_LABELS[key] ?? key;
  }

  pickDate(d: string) { this.selectedDate.set(d); }

  pickFromCalendar(d: Date | null) {
    if (!d) return;
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (this.availableDateSet().has(iso)) this.selectedDate.set(iso);
  }

  older() {
    const i = this.currentIndex();
    const list = this.entries();
    if (i >= 0 && i < list.length - 1) this.selectedDate.set(list[i + 1].date_id);
  }
  newer() {
    const i = this.currentIndex();
    if (i > 0) this.selectedDate.set(this.entries()[i - 1].date_id);
  }
  latest() {
    const e = this.entries();
    if (e.length) this.selectedDate.set(e[0].date_id);
  }

  toggleNote() { this.showNote.update(v => !v); }
}
