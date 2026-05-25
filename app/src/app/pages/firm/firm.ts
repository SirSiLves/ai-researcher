import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Skeleton } from 'primeng/skeleton';
import { MeterGroup } from 'primeng/metergroup';
import { ProgressBar } from 'primeng/progressbar';
import { Tag } from 'primeng/tag';
import { MenuItem } from 'primeng/api';
import { PageHeader } from '../../components/page-header/page-header';

import { DataService, OrgDetail, OrgIndexEntry, RadarDay } from '../../services/data.service';

interface VelocityPoint {
  date: string;
  v7: number;
  ratio: number;
}

const SPARK_BLOCKS = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

/** Brand / product slugs that used to be standalone firms but now fold into a
 *  canonical parent (matches BRAND_TO_PARENT in build_org_view.py). A user
 *  navigating to /map/firm/claude — via bookmark, an external link, or a stale
 *  page reference — gets transparently redirected to the parent firm rather
 *  than a 404. Keep in sync with the Python map; the duplication is small
 *  enough that two declarations is cleaner than fetching a server-side map. */
const BRAND_TO_PARENT: Record<string, string> = {
  claude:           'anthropic',
  'claude-code':    'anthropic',
  mythos:           'anthropic',
  stainless:        'anthropic',
  'gpt-5':          'openai',
  codex:            'openai',
  gemini:           'google-deepmind',
  deepmind:         'google-deepmind',
  llama:            'meta',
  qwen:             'alibaba',
  tongyi:           'alibaba',
  kimi:             'moonshot',
  azure:            'microsoft',
  'github-copilot': 'microsoft',
  'amazon-aws':     'aws',
  bedrock:          'aws',
  agentforce:       'salesforce',
  watsonx:          'ibm',
  cortex:           'snowflake',
};

@Component({
  selector: 'app-firm',
  standalone: true,
  imports: [RouterLink, DecimalPipe, Skeleton, MeterGroup, ProgressBar, Tag, PageHeader],
  templateUrl: './firm.html',
  styleUrl: './firm.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirmPage {
  private readonly data = inject(DataService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly slug = signal<string>('');
  readonly detail = signal<OrgDetail | null>(null);
  /** Index entry for this firm. Carries velocity + velocity_history (which
   *  used to live on OrgDetail). Loaded in parallel with the detail file. */
  readonly indexEntry = signal<OrgIndexEntry | null>(null);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  readonly radarDay = signal<RadarDay | null>(null);

  readonly storiesForFirm = computed(() => {
    const d = this.radarDay();
    const slug = this.slug();
    if (!d || !slug) return [];
    const map = new Map<string, { id: string; name: string; topicCount: number }>();
    for (const c of d.topic_clusters ?? []) {
      const ids = new Set(c.topic_ids);
      const topics = d.topics.filter(t => ids.has(t.id));
      const count = topics.filter(t => (t.breadth_orgs_7d ?? []).includes(slug)).length;
      if (count > 0) {
        map.set(c.id, { id: c.id, name: c.name, topicCount: count });
      }
    }
    return Array.from(map.values()).sort((a, b) => b.topicCount - a.topicCount);
  });

  readonly velocitySeries = computed<VelocityPoint[]>(() => {
    const e = this.indexEntry();
    if (!e?.velocity_history?.length) return [];
    return e.velocity_history.map(p => ({
      date: p.date,
      v7: p.velocity_7d,
      ratio: p.velocity_ratio
    }));
  });

  /** Velocity snapshot — read from the index entry, since per-firm files no
   *  longer carry it. */
  readonly velocity = computed(() => {
    const e = this.indexEntry();
    if (!e) return null;
    return {
      velocity_7d: e.velocity_7d,
      velocity_28d_avg: e.velocity_28d_avg,
      velocity_ratio: e.velocity_ratio,
      velocity_status: e.velocity_status
    };
  });

  /** Full mentions_by_date — chronological. */
  readonly mentionsSeries = computed<Array<{ date: string; n: number }>>(() => {
    const m = this.detail()?.mentions_by_date;
    if (!m) return [];
    return Object.entries(m)
      .map(([date, n]) => ({ date, n: n as number }))
      .sort((a, b) => a.date.localeCompare(b.date));
  });

  readonly mentionsBars = computed<{
    rects: Array<{ x: number; y: number; w: number; h: number; date: string; n: number }>;
    max: number;
    days: number;
    w: number;
    h: number;
  }>(() => {
    const data = this.mentionsSeries();
    const w = 600, h = 80;
    if (!data.length) return { rects: [], max: 0, days: 0, w, h };
    const max = Math.max(1, ...data.map(p => p.n));
    const step = w / data.length;
    const bw = Math.max(1, step - 1);
    const rects = data.map((p, i) => {
      const barH = (p.n / max) * (h - 4);
      return {
        x: +(i * step).toFixed(2),
        y: +(h - barH).toFixed(2),
        w: +bw.toFixed(2),
        h: +barH.toFixed(2),
        date: p.date,
        n: p.n
      };
    });
    return { rects, max, days: data.length, w, h };
  });

  readonly aliases = computed<string[]>(() => {
    const a = this.detail()?.aliases;
    return a ? Array.from(new Set(a.filter(x => x !== this.detail()?.slug))) : [];
  });

  readonly velocityPath = computed(() =>
    this.linePath(this.velocitySeries().map(p => p.v7), 320, 70)
  );

  readonly ratioPath = computed(() =>
    this.linePath(this.velocitySeries().map(p => p.ratio), 320, 70)
  );

  readonly sourceMeter = computed(() => {
    const d = this.detail();
    if (!d?.mentions_by_source_type) return [];
    // Denominator MUST be the sum of source-type counts, not total_mentions.
    // total_mentions is raw match count (every alias hit, every occurrence),
    // typically ~25× the source-type count (which counts distinct events:
    // one bump per file × source-type pair). Dividing per-type by
    // total_mentions made every bar render as "1%" or "0%".
    const counts = Object.values(d.mentions_by_source_type).map(v => v as number);
    const total = counts.reduce((s, v) => s + v, 0) || 1;
    return Object.entries(d.mentions_by_source_type)
      .filter(([_, v]) => (v as number) > 0)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .map(([key, value]) => ({
        label: key,
        value: ((value as number) / total) * 100,
        raw: value as number
      }));
  });

  readonly topicMixSorted = computed(() => {
    const d = this.detail();
    if (!d?.topic_mix) return [] as Array<{ topic: string; n: number }>;
    return Object.entries(d.topic_mix)
      .map(([topic, n]) => ({ topic, n: n as number }))
      .sort((a, b) => b.n - a.n)
      .slice(0, 12);
  });

  readonly radarAppearances = computed(() => {
    const d = this.detail();
    return (d?.radar_appearances ?? []) as Array<{
      date: string;
      topics: Array<{ topic_id: string; topic_label: string; sector?: string }>;
    }>;
  });

  readonly classificationHistory = computed(() => {
    const d = this.detail();
    return (d?.classification_history ?? []) as Array<{ date: string; tier?: string; reason?: string }>;
  });

  readonly breadcrumb = computed<MenuItem[]>(() => {
    const d = this.detail();
    return [
      { label: 'Map', routerLink: '/map' },
      { label: d?.tier_hint ?? '—' },
      { label: 'Firm' }
    ];
  });
  readonly breadcrumbHome: MenuItem = { icon: 'pi pi-home', routerLink: '/pulse' };

  readonly hotEvents = computed(() => {
    const d = this.detail();
    return (d?.hot_events ?? []) as Array<{ date: string; reason?: string; ratio?: number }>;
  });

  constructor() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (!slug) return;
      // Redirect brand/product slugs to their canonical parent. replaceUrl=true
      // so the bookmark/back-button history doesn't get the brand URL stuck in
      // it. Skip the load — the redirect will fire paramMap again with the
      // parent slug.
      const parent = BRAND_TO_PARENT[slug];
      if (parent) {
        this.router.navigate(['/map/firm', parent], { replaceUrl: true });
        return;
      }
      if (slug !== this.slug()) {
        this.slug.set(slug);
        this.loadFirm(slug);
      }
    });
  }

  private async loadFirm(slug: string) {
    this.loading.set(true);
    this.detail.set(null);
    this.indexEntry.set(null);
    this.error.set(null);
    try {
      // Detail + index entry in parallel. The detail has the heavy fields;
      // the index entry has velocity + velocity_history.
      const [d, entry] = await Promise.all([
        this.data.loadOrgDetail(slug),
        this.data.orgIndexEntry(slug)
      ]);
      this.detail.set(d);
      this.indexEntry.set(entry);
      this.loading.set(false);
    } catch (err: any) {
      this.error.set(`Couldn't load firm "${slug}": ${err?.message ?? err}`);
      this.loading.set(false);
    }

    // Load the latest radar so we can surface story cross-cuts
    try {
      const idx = await this.data.loadRadarIndex();
      const entries = idx.entries.filter(e => !e.is_versioned);
      if (entries[0]) {
        const day = await this.data.loadRadarDay(entries[0].json_path);
        this.radarDay.set(day);
      }
    } catch { /* cross-cuts are optional */ }
  }

  velocitySparkStr(): string {
    const arr = this.velocitySeries().map(p => p.v7);
    if (!arr.length) return '';
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = Math.max(1, max - min);
    return arr.map(v => SPARK_BLOCKS[Math.min(7, Math.floor(((v - min) / range) * 7.999))]).join('');
  }

  bar(value: number, max: number, width = 10): string {
    if (!max) return '';
    const pct = Math.min(1, Math.abs(value) / max);
    const cells = Math.round(pct * width);
    return cells === 0 ? '·' : '▇'.repeat(cells);
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

  statusLabel(status: string | undefined): string { return status || '—'; }

  firmSubtitle(d: OrgDetail): string {
    const parts: string[] = [];
    if (d.coverage) parts.push(`coverage ${d.coverage}`);
    parts.push(`${d.total_mentions} mentions over ${d.distinct_days} days`);
    return parts.join(' · ');
  }

  statusSeverity(status: string | undefined): 'success' | 'info' | 'warn' | 'secondary' | 'danger' {
    switch (status) {
      case 'surging':      return 'success';
      case 'accelerating': return 'info';
      case 'steady':       return 'secondary';
      case 'cooling':      return 'warn';
      default:             return 'secondary';
    }
  }
}
