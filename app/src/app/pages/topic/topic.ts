import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DecimalPipe, NgClass } from '@angular/common';
import { Skeleton } from 'primeng/skeleton';
import { MenuItem } from 'primeng/api';
import { PageHeader } from '../../components/page-header/page-header';

import {
  DataService,
  RadarDay,
  RadarTopic,
  SectorHistoryEntry,
  ClusterHistoryEntry
} from '../../services/data.service';

interface SeriesPoint {
  date: string;
  fast: number;
  slow: number;
  breadth: number;
}

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [RouterLink, DecimalPipe, NgClass, Skeleton, PageHeader],
  templateUrl: './topic.html',
  styleUrl: './topic.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicPage {
  private readonly data = inject(DataService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly topicId = signal<string>('');
  readonly topic = signal<RadarTopic | null>(null);
  readonly history = signal<RadarDay[]>([]);
  readonly latestDate = signal<string | null>(null);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  // Cohort of timeline events combining sector + cluster history
  readonly lifeline = computed(() => {
    const t = this.topic();
    if (!t) return [] as Array<{ kind: 'sector' | 'cluster'; entry: SectorHistoryEntry | ClusterHistoryEntry }>;
    const items: Array<{ kind: 'sector' | 'cluster'; entry: SectorHistoryEntry | ClusterHistoryEntry }> = [];
    for (const e of t.sector_history ?? []) items.push({ kind: 'sector', entry: e });
    for (const e of t.cluster_history ?? []) items.push({ kind: 'cluster', entry: e });
    return items.sort((a, b) => a.entry.date.localeCompare(b.entry.date));
  });

  // Dual-axis series: fast + slow score (left) + breadth_7d (right) across the loaded window
  readonly series = computed<SeriesPoint[]>(() => {
    const id = this.topicId();
    const days = this.history();
    if (!id || !days.length) return [];
    return days.map(d => {
      const t = d.topics.find(x => x.id === id);
      return {
        date: d.date,
        fast: t?.score_fast ?? 0,
        slow: t?.score_slow ?? 0,
        breadth: t?.breadth_7d ?? 0
      };
    });
  });

  readonly seriesPath = computed(() => this.linePath(this.series().map(p => p.fast), 320, 80));
  readonly slowPath   = computed(() => this.linePath(this.series().map(p => p.slow), 320, 80));
  readonly breadthPath = computed(() => this.linePath(this.series().map(p => p.breadth), 320, 80));

  readonly maxScore = computed(() =>
    Math.max(1, ...this.series().map(p => Math.max(p.fast, p.slow)))
  );
  readonly maxBreadth = computed(() =>
    Math.max(1, ...this.series().map(p => p.breadth))
  );

  readonly clusterName = computed(() => {
    const id = this.topic()?.cluster_id;
    if (!id) return '';
    for (let i = this.history().length - 1; i >= 0; i--) {
      const c = (this.history()[i].topic_clusters ?? []).find(x => x.id === id);
      if (c) return c.name;
    }
    return id;
  });

  readonly breadcrumb = computed<MenuItem[]>(() => {
    const t = this.topic();
    return [
      { label: 'Map', routerLink: '/map' },
      { label: t?.sector ?? '—' },
      { label: 'Topic' }
    ];
  });

  readonly breadcrumbHome: MenuItem = { icon: 'pi pi-home', routerLink: '/pulse' };

  readonly pipelineAgeDays = computed(() => {
    const launch = new Date('2026-05-04');
    const now = new Date();
    return Math.max(0, Math.floor((now.getTime() - launch.getTime()) / 86400000));
  });

  readonly windowStatus = computed(() => {
    const age = this.pipelineAgeDays();
    return {
      d7:   age >= 10 ? 'warm'    : age >= 6 ? 'warming' : 'cold',
      d30:  age >= 35 ? 'warm'    : age >= 25 ? 'warming' : 'cold',
      d90:  age >= 100 ? 'warm'   : age >= 70 ? 'warming' : 'cold',
      d180: age >= 190 ? 'warm'   : age >= 150 ? 'warming' : 'cold'
    };
  });

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && id !== this.topicId()) {
        this.topicId.set(id);
        this.loadTopic(id);
      }
    });
  }

  private async loadTopic(id: string) {
    this.loading.set(true);
    this.topic.set(null);
    this.history.set([]);
    this.error.set(null);

    try {
      const idx = await this.data.loadRadarIndex();
      const entries = idx.entries.filter(e => !e.is_versioned);
      if (!entries.length) { this.loading.set(false); return; }
      this.latestDate.set(entries[0].date_id);

      const windowPaths = entries.slice(0, 60).map(e => e.json_path);
      const hist = await this.data.loadRadarHistory(windowPaths, 60);
      this.history.set(hist);

      // Find topic on the latest day; fall back to walking backward if it's missing
      let found: RadarTopic | null = null;
      for (let i = hist.length - 1; i >= 0; i--) {
        const t = hist[i].topics.find(x => x.id === id);
        if (t) { found = t; break; }
      }
      if (!found) {
        this.error.set(`Topic "${id}" not found in the last ${hist.length} radar snapshots.`);
        this.loading.set(false);
        return;
      }
      this.topic.set(found);
      this.loading.set(false);
    } catch (err: any) {
      this.error.set(`Couldn't load topic data: ${err?.message ?? err}`);
      this.loading.set(false);
    }
  }

  private linePath(values: number[], width: number, height: number): string {
    if (!values.length) return '';
    const max = Math.max(1, ...values);
    const stepX = values.length > 1 ? width / (values.length - 1) : 0;
    return values
      .map((v, i) => {
        const x = (i * stepX).toFixed(1);
        const y = (height - (v / max) * (height - 4)).toFixed(1);
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

  windowChip(status: string): string {
    return status === 'warm' ? 'chip--accent' : 'chip--outline';
  }
}
