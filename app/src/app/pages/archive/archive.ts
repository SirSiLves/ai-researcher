import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Skeleton } from 'primeng/skeleton';
import { Drawer } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

import { DataService, ReportEntry } from '../../services/data.service';
import { MarkdownViewer } from '../../components/markdown-viewer/markdown-viewer';

type Cadence = 'all' | 'daily' | 'weekly' | 'monthly' | 'radar' | 'sweeps' | 'sources';

const CADENCE_LABEL: Record<Cadence, string> = {
  all:     'All',
  daily:   'Daily',
  weekly:  'Weekly',
  monthly: 'Monthly',
  radar:   'Radar',
  sweeps:  'Sweeps',
  sources: 'Raw sources'
};

const SWEEP_CADENCES = new Set(['vendor_candidates', 'keyword_candidates', 'github_candidates']);
/** Raw-collector dumps — exposed under the "Raw sources" cadence so a
 *  researcher can browse the long tail (papers/blogs/HN/etc.) directly
 *  instead of only via the synthesized daily briefing. */
const SOURCE_CADENCES = new Set(['news', 'papers', 'blogs', 'hackernews', 'github', 'linkedin', 'jobs']);

interface MonthGroup {
  key: string;
  label: string;
  entries: ReportEntry[];
  total: number;
  hasMore: boolean;
}

/** How many rows to show per month before user clicks "show more". */
const PAGE_SIZE = 50;

/** Bucket an entry into its calendar month, even when the date_id is an ISO
 *  week (`2026-W21`). A naive `slice(0, 7)` truncates the W## suffix and
 *  collapses every weekly into "2026-W2" / "2026-W1" buckets. Here we resolve
 *  weekly IDs to their Monday's YYYY-MM so weekly rollups sit next to that
 *  week's daily entries in the archive. */
function monthKeyOf(entry: ReportEntry): string {
  const raw = entry.sort_date || entry.date_id;
  // YYYY-Www → Monday-of-week's YYYY-MM
  const weekMatch = /^(\d{4})-W(\d{2})$/.exec(raw);
  if (weekMatch) {
    const year = Number(weekMatch[1]);
    const week = Number(weekMatch[2]);
    // ISO-week Monday: take Jan 4 of the year (always week 1 per ISO 8601),
    // subtract its day-of-week-from-Monday, then add (week-1)*7.
    const jan4 = new Date(Date.UTC(year, 0, 4));
    const jan4DowMon = (jan4.getUTCDay() + 6) % 7; // Mon=0 ... Sun=6
    const week1Monday = new Date(jan4);
    week1Monday.setUTCDate(jan4.getUTCDate() - jan4DowMon);
    const monday = new Date(week1Monday);
    monday.setUTCDate(week1Monday.getUTCDate() + (week - 1) * 7);
    const mm = String(monday.getUTCMonth() + 1).padStart(2, '0');
    return `${monday.getUTCFullYear()}-${mm}`;
  }
  // YYYY-MM (monthly entries) or YYYY-MM-DD (everything else)
  return raw.slice(0, 7);
}

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [FormsModule, Skeleton, Drawer, ButtonModule, MarkdownViewer],
  templateUrl: './archive.html',
  styleUrl: './archive.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArchivePage {
  private readonly data = inject(DataService);
  private readonly router = inject(Router);

  readonly all = signal<ReportEntry[]>([]);
  readonly cadence = signal<Cadence>('all');
  readonly query = signal<string>('');
  /** What the input shows immediately; `query` (which drives filtering over
   *  ~1000 entries) follows after a 250ms debounce to avoid per-keystroke jank. */
  readonly queryDraft = signal<string>('');
  private searchTimer: ReturnType<typeof setTimeout> | null = null;
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);
  readonly cadences: Cadence[] = ['all', 'daily', 'weekly', 'monthly', 'radar', 'sweeps', 'sources'];
  /** Per-month "expanded" flag for showing all rows beyond PAGE_SIZE. */
  readonly expanded = signal<Set<string>>(new Set());

  // Drawer state
  readonly drawerOpen = signal<boolean>(false);
  readonly drawerEntry = signal<ReportEntry | null>(null);
  readonly drawerMarkdown = signal<string>('');
  readonly drawerLoading = signal<boolean>(false);

  cadenceLabel(c: Cadence): string { return CADENCE_LABEL[c]; }

  onSearchInput(value: string) {
    this.queryDraft.set(value);
    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.query.set(value), 250);
  }

  private cadenceMatches(entry: ReportEntry, cadence: Cadence): boolean {
    if (cadence === 'all') return true;
    if (cadence === 'sweeps') return SWEEP_CADENCES.has(entry.cadence);
    if (cadence === 'sources') return SOURCE_CADENCES.has(entry.cadence);
    return entry.cadence === cadence;
  }

  /** Pre-index by cadence to avoid O(N) walks on every cadence-tab render.
   *  Runs once per index load. */
  private readonly byCadence = computed<Record<Cadence, ReportEntry[]>>(() => {
    const out: Record<Cadence, ReportEntry[]> = {
      all: [], daily: [], weekly: [], monthly: [], radar: [], sweeps: [], sources: []
    };
    for (const e of this.all()) {
      if (e.is_versioned) continue;
      out.all.push(e);
      if (e.cadence === 'daily')   out.daily.push(e);
      if (e.cadence === 'weekly')  out.weekly.push(e);
      if (e.cadence === 'monthly') out.monthly.push(e);
      if (e.cadence === 'radar')   out.radar.push(e);
      if (SWEEP_CADENCES.has(e.cadence))  out.sweeps.push(e);
      if (SOURCE_CADENCES.has(e.cadence)) out.sources.push(e);
    }
    return out;
  });

  readonly cadenceCounts = computed<Record<Cadence, number>>(() => {
    const idx = this.byCadence();
    return {
      all: idx.all.length,
      daily: idx.daily.length,
      weekly: idx.weekly.length,
      monthly: idx.monthly.length,
      radar: idx.radar.length,
      sweeps: idx.sweeps.length,
      sources: idx.sources.length
    };
  });

  readonly filtered = computed<ReportEntry[]>(() => {
    const c = this.cadence();
    const q = this.query().toLowerCase().trim();
    // Start from the cadence-indexed slice instead of the full list.
    const base = this.byCadence()[c] ?? [];
    if (!q) return base;
    return base.filter(entry =>
      entry.date_id.toLowerCase().includes(q) ||
      entry.headline.toLowerCase().includes(q) ||
      entry.cadence_label.toLowerCase().includes(q)
    );
  });

  readonly grouped = computed<MonthGroup[]>(() => {
    const list = this.filtered();
    const expanded = this.expanded();
    const byMonth = new Map<string, ReportEntry[]>();
    for (const entry of list) {
      const key = monthKeyOf(entry);
      if (!byMonth.has(key)) byMonth.set(key, []);
      byMonth.get(key)!.push(entry);
    }
    return Array.from(byMonth.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([key, entries]) => {
        // sort entries within the month newest-first
        entries.sort((a, b) => (b.sort_date || b.date_id).localeCompare(a.sort_date || a.date_id));
        let label = key;
        if (/^\d{4}-\d{2}$/.test(key)) {
          const parsed = new Date(key + '-01T00:00:00');
          label = parsed.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        }
        const total = entries.length;
        const visible = expanded.has(key) ? entries : entries.slice(0, PAGE_SIZE);
        return {
          key,
          label,
          entries: visible,
          total,
          hasMore: total > visible.length
        };
      });
  });

  expandMonth(key: string) {
    this.expanded.update(s => {
      const next = new Set(s);
      next.add(key);
      return next;
    });
  }

  readonly totalLabel = computed(() => {
    const total = this.all().filter(e => !e.is_versioned).length;
    const shown = this.filtered().length;
    return total === shown ? `${total} items` : `${shown} of ${total}`;
  });

  openEntry(entry: ReportEntry) {
    // For radar items, jump directly to the map snapshot.
    if (entry.cadence === 'radar') {
      this.router.navigate(['/map']);
      return;
    }
    // For daily items, jump to Pulse for that date.
    if (entry.cadence === 'daily') {
      this.router.navigate(['/pulse', entry.date_id]);
      return;
    }
    // For weekly/monthly/sweeps, open inline drawer with the markdown.
    this.drawerEntry.set(entry);
    this.drawerMarkdown.set('');
    this.drawerLoading.set(true);
    this.drawerOpen.set(true);
    this.data.loadMarkdown(entry.path)
      .then(md => {
        if (this.drawerEntry()?.path !== entry.path) return;
        this.drawerMarkdown.set(md);
        this.drawerLoading.set(false);
      })
      .catch(() => this.drawerLoading.set(false));
  }

  closeDrawer() {
    this.drawerOpen.set(false);
  }

  cadenceTone(entry: ReportEntry): string {
    if (entry.cadence === 'daily')   return 'accent';
    if (entry.cadence === 'weekly')  return 'success';
    if (entry.cadence === 'monthly') return 'info';
    if (entry.cadence === 'radar')   return 'warn';
    if (SWEEP_CADENCES.has(entry.cadence)) return 'neutral';
    if (SOURCE_CADENCES.has(entry.cadence)) return 'subtle';
    return 'neutral';
  }

  constructor() {
    this.data.loadReportsIndex()
      .then(idx => {
        this.all.set(idx.entries);
        this.loading.set(false);
      })
      .catch(err => {
        this.error.set(`Couldn't load reports index: ${err.message ?? err}`);
        this.loading.set(false);
      });
  }
}
