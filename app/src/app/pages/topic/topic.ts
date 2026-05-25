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
import { humanizeSlug } from '../../services/humanize';

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
  /** slug → display_name map, populated once the orgs index loads. Empty
   *  until then; firmDisplay() returns the slug as fallback. */
  readonly firmNames = signal<Record<string, string>>({});

  /** Resolve a firm slug to its display name. Order:
   *    1. display_name from orgs/index.json (best — derived from real aliases)
   *    2. humanizeSlug() fallback (covers brand-cased orgs not yet indexed,
   *       and acronym title-casing)
   *  Result: chip labels read "Anthropic" / "OpenAI" / "Hugging Face", not
   *  "anthropic" / "openai" / "huggingface". */
  firmDisplay(slug: string): string {
    return this.firmNames()[slug] ?? humanizeSlug(slug);
  }
  /** "_Why it matters:_ ..." sentence parsed out of the latest radar.md.
   *  Present for top-5 by importance; empty for ranks 6+. */
  readonly whyItMatters = signal<string>('');

  /** Source-mix breakdown from source_mentions_capped, sorted by count desc.
   *  Drives the "where this topic is loudest" bar list. */
  readonly sourceMix = computed<Array<{ source: string; count: number; pct: number }>>(() => {
    const t = this.topic();
    const m = t?.source_mentions_capped ?? t?.source_mentions ?? {};
    const entries = Object.entries(m)
      .map(([source, raw]) => ({ source, count: typeof raw === 'number' ? raw : Number(raw) || 0 }))
      .filter(e => e.count > 0)
      .sort((a, b) => b.count - a.count);
    const total = entries.reduce((acc, e) => acc + e.count, 0) || 1;
    return entries.map(e => ({ ...e, pct: (e.count / total) * 100 }));
  });

  /** supporting_files grouped by source type for a tidy "evidence" panel. */
  readonly evidenceFiles = computed<Array<{ source: string; files: string[] }>>(() => {
    const t = this.topic();
    const files = t?.supporting_files ?? [];
    const groups = new Map<string, string[]>();
    for (const f of files) {
      const seg = f.split('/')[0] ?? 'other';
      if (!groups.has(seg)) groups.set(seg, []);
      groups.get(seg)!.push(f);
    }
    return Array.from(groups.entries())
      .map(([source, files]) => ({ source, files: files.sort().reverse() }))
      .sort((a, b) => b.files.length - a.files.length);
  });

  /** Pretty label for source-type keys ("long_form_blog" → "Long-form blog"). */
  sourceLabel(s: string): string {
    return s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  /** "data" prefix for the raw evidence links so they work from the app shell. */
  evidenceHref(path: string): string {
    return `data/${path}`;
  }

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
    // Eagerly load the orgs index for the "Firms talking" chip list. Falls
    // back gracefully (firmDisplay returns slug) if the index 404s.
    this.data.loadOrgsIndex().then(idx => {
      const m: Record<string, string> = {};
      for (const e of idx.entries) {
        if (e.display_name) m[e.slug] = e.display_name;
      }
      this.firmNames.set(m);
    }).catch(() => { /* keep slugs as fallback */ });
  }

  private async loadTopic(id: string) {
    this.loading.set(true);
    this.topic.set(null);
    this.history.set([]);
    this.error.set(null);
    this.whyItMatters.set('');

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
      let foundOnDate: string | null = null;
      for (let i = hist.length - 1; i >= 0; i--) {
        const t = hist[i].topics.find(x => x.id === id);
        if (t) { found = t; foundOnDate = hist[i].date; break; }
      }
      if (!found) {
        this.error.set(`Topic "${id}" not found in the last ${hist.length} radar snapshots.`);
        this.loading.set(false);
        return;
      }
      this.topic.set(found);
      this.loading.set(false);

      // Best-effort: pull the "_Why it matters:_ ..." line for this topic out
      // of the radar markdown on the day we found it. Only top-5 topics get
      // this section, so silent failure is fine.
      if (foundOnDate) {
        const radarEntry = entries.find(e => e.date_id === foundOnDate);
        if (radarEntry?.md_path) {
          this.data.loadMarkdown(radarEntry.md_path).then(md => {
            const sentence = extractWhy(md, found!.label);
            if (sentence) this.whyItMatters.set(sentence);
          }).catch(() => { /* optional */ });
        }
      }
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

/** Pull the "_Why it matters:_ …" sentence for a topic out of the daily radar
 *  markdown. The MD format puts that line a few rows below an "### N. label"
 *  heading; we scan a small window after each H3 looking for our label.
 *  Returns the sentence without the leading underscore tag, or '' if not found. */
function extractWhy(md: string, label: string): string {
  if (!md || !label) return '';
  const lines = md.split('\n');
  // First word(s) of the label are usually enough to find the right heading,
  // since labels contain parentheticals the H3 doesn't always carry verbatim.
  const labelHead = label.split('(')[0].trim().toLowerCase();
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^###\s+\d+\.\s+(.+)$/);
    if (!m) continue;
    const heading = m[1].trim().toLowerCase();
    // Match if the H3 starts with our label-head OR our label-head starts with the H3.
    if (!heading.startsWith(labelHead) && !labelHead.startsWith(heading.split('(')[0].trim())) continue;
    // Scan up to ~12 lines forward for the "_Why it matters:_" line.
    for (let j = i + 1; j < Math.min(i + 14, lines.length); j++) {
      const why = lines[j].match(/^_Why it matters:_\s*(.+)$/);
      if (why) return why[1].trim();
      if (/^###\s+\d+\./.test(lines[j])) break;
    }
  }
  return '';
}
