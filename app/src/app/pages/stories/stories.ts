import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Skeleton } from 'primeng/skeleton';
import { Tag } from 'primeng/tag';

import {
  DataService,
  RadarDay,
  TopicCluster,
  RadarTopic
} from '../../services/data.service';
import { PageHeader } from '../../components/page-header/page-header';

interface StoryRow {
  cluster: TopicCluster;
  delta: number;
  topics: RadarTopic[];
  topFirms: string[];
  spark: number[];
  sectors: string[];
}

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [RouterLink, DecimalPipe, Skeleton, Tag, PageHeader],
  templateUrl: './stories.html',
  styleUrl: './stories.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoriesPage {
  private readonly data = inject(DataService);

  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);
  readonly day = signal<RadarDay | null>(null);
  readonly history = signal<RadarDay[]>([]);

  readonly stories = computed<StoryRow[]>(() => {
    const d = this.day();
    const hist = this.history();
    if (!d) return [];
    const clusters = d.topic_clusters ?? [];
    return clusters
      .map(c => {
        const ids = new Set(c.topic_ids);
        const topics = d.topics
          .filter(t => ids.has(t.id))
          .sort((a, b) => b.score_fast - a.score_fast);
        const sectors = Array.from(new Set(topics.map(t => t.sector)));
        const firmCount = new Map<string, number>();
        for (const t of topics) {
          for (const o of t.breadth_orgs_7d ?? []) {
            firmCount.set(o, (firmCount.get(o) ?? 0) + 1);
          }
        }
        const topFirms = Array.from(firmCount.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([slug]) => slug);
        const spark = hist.map(day =>
          (day.topic_clusters ?? []).find(x => x.id === c.id)?.cluster_score_fast ?? 0
        );
        return {
          cluster: c,
          delta: c.cluster_score_fast - c.cluster_score_slow,
          topics,
          topFirms,
          spark,
          sectors
        };
      })
      .sort((a, b) => b.delta - a.delta);
  });

  readonly stats = computed(() => {
    const s = this.stories();
    return {
      stories: s.length,
      topics: s.reduce((sum, x) => sum + x.topics.length, 0),
      firms: new Set(s.flatMap(x => x.topFirms)).size
    };
  });

  constructor() {
    this.data.loadRadarIndex()
      .then(idx => {
        const entries = idx.entries.filter(e => !e.is_versioned);
        const latest = entries[0];
        if (!latest) { this.loading.set(false); return; }
        const windowPaths = entries.slice(0, 14).map(e => e.json_path);
        return Promise.all([
          this.data.loadRadarDay(latest.json_path),
          this.data.loadRadarHistory(windowPaths, 14)
        ]).then(([day, hist]) => {
          this.day.set(day);
          this.history.set(hist);
          this.loading.set(false);
        });
      })
      .catch(err => {
        this.error.set(`Couldn't load radar: ${err?.message ?? err}`);
        this.loading.set(false);
      });
  }

  directionTone(dir: string): 'success' | 'info' | 'warn' | 'secondary' {
    switch (dir) {
      case 'rising':  return 'success';
      case 'steady':  return 'secondary';
      case 'falling': return 'warn';
      default:        return 'info';
    }
  }

  sparkPath(values: number[], w = 120, h = 32): string {
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
}
