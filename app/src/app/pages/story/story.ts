import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe, NgClass } from '@angular/common';
import { Skeleton } from 'primeng/skeleton';
import { Tag } from 'primeng/tag';

import {
  DataService,
  RadarDay,
  TopicCluster,
  RadarTopic
} from '../../services/data.service';
import { PageHeader } from '../../components/page-header/page-header';
import { MenuItem } from 'primeng/api';

interface FirmRow {
  slug: string;
  topicCount: number;
  topics: string[];
}

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [RouterLink, DecimalPipe, NgClass, Skeleton, Tag, PageHeader],
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
        const row = map.get(o) ?? { slug: o, topicCount: 0, topics: [] };
        row.topicCount += 1;
        if (!row.topics.includes(t.label)) row.topics.push(t.label);
        map.set(o, row);
      }
    }
    return Array.from(map.values()).sort((a, b) => b.topicCount - a.topicCount);
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
      { label: 'Stories', routerLink: '/stories' },
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
