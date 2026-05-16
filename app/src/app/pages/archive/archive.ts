import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Skeleton } from 'primeng/skeleton';
import { Drawer } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

import { DataService, ReportEntry } from '../../services/data.service';
import { MarkdownViewer } from '../../components/markdown-viewer/markdown-viewer';

type Cadence = 'all' | 'daily' | 'weekly' | 'monthly' | 'radar' | 'sweeps';

const CADENCE_LABEL: Record<Cadence, string> = {
  all:     'All',
  daily:   'Daily',
  weekly:  'Weekly',
  monthly: 'Monthly',
  radar:   'Radar',
  sweeps:  'Sweeps'
};

const SWEEP_CADENCES = new Set(['vendor_candidates', 'keyword_candidates', 'github_candidates']);

interface MonthGroup {
  key: string;
  label: string;
  entries: ReportEntry[];
  total: number;
  hasMore: boolean;
}

/** How many rows to show per month before user clicks "show more". */
const PAGE_SIZE = 50;

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
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);
  readonly cadences: Cadence[] = ['all', 'daily', 'weekly', 'monthly', 'radar', 'sweeps'];
  /** Per-month "expanded" flag for showing all rows beyond PAGE_SIZE. */
  readonly expanded = signal<Set<string>>(new Set());

  // Drawer state
  readonly drawerOpen = signal<boolean>(false);
  readonly drawerEntry = signal<ReportEntry | null>(null);
  readonly drawerMarkdown = signal<string>('');
  readonly drawerLoading = signal<boolean>(false);

  cadenceLabel(c: Cadence): string { return CADENCE_LABEL[c]; }

  private cadenceMatches(entry: ReportEntry, cadence: Cadence): boolean {
    if (cadence === 'all') return true;
    if (cadence === 'sweeps') return SWEEP_CADENCES.has(entry.cadence);
    return entry.cadence === cadence;
  }

  /** Pre-index by cadence to avoid O(N) walks on every cadence-tab render.
   *  Runs once per index load. */
  private readonly byCadence = computed<Record<Cadence, ReportEntry[]>>(() => {
    const out: Record<Cadence, ReportEntry[]> = { all: [], daily: [], weekly: [], monthly: [], radar: [], sweeps: [] };
    for (const e of this.all()) {
      if (e.is_versioned) continue;
      out.all.push(e);
      if (e.cadence === 'daily')   out.daily.push(e);
      if (e.cadence === 'weekly')  out.weekly.push(e);
      if (e.cadence === 'monthly') out.monthly.push(e);
      if (e.cadence === 'radar')   out.radar.push(e);
      if (SWEEP_CADENCES.has(e.cadence)) out.sweeps.push(e);
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
      sweeps: idx.sweeps.length
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
      const key = (entry.sort_date || entry.date_id).slice(0, 7);
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
        } else if (/^\d{4}-W\d{2}/.test(key)) {
          label = key;
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
