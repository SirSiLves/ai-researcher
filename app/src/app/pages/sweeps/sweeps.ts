import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
import { Tabs, TabList, Tab } from 'primeng/tabs';

import { DataService, ReportEntry } from '../../services/data.service';
import { MarkdownViewer } from '../../components/markdown-viewer/markdown-viewer';
import { PageHeader } from '../../components/page-header/page-header';
import { StatCard } from '../../components/stat-card/stat-card';

type SweepKind = 'vendor_candidates' | 'keyword_candidates' | 'github_candidates';

interface SweepTab {
  key: SweepKind;
  label: string;
  hint: string;
}

@Component({
  selector: 'app-sweeps',
  standalone: true,
  imports: [Skeleton, Tabs, TabList, Tab, MarkdownViewer, PageHeader, StatCard],
  templateUrl: './sweeps.html',
  styleUrl: './sweeps.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SweepsPage {
  private readonly data = inject(DataService);

  readonly tabs: SweepTab[] = [
    { key: 'vendor_candidates',  label: 'Vendor',  hint: 'orgs auto-applied to sources.json' },
    { key: 'keyword_candidates', label: 'Keyword', hint: 'n-grams auto-extended into search lists' },
    { key: 'github_candidates',  label: 'GitHub',  hint: 'trending repos auto-added to watched_repos' }
  ];

  readonly active = signal<SweepKind>('vendor_candidates');
  readonly entries = signal<ReportEntry[]>([]);
  readonly latestEntry = signal<ReportEntry | null>(null);
  readonly markdown = signal<string>('');
  readonly markdownLoading = signal<boolean>(false);
  readonly selectedEntry = signal<ReportEntry | null>(null);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  readonly activeTab = computed(() => this.tabs.find(t => t.key === this.active())!);

  /** Parse a sweep markdown run for the headline numbers used in the stat tiles. */
  readonly stats = computed<{
    accelerating: number | null;
    cooling: number | null;
    surging: number | null;
    promoted: number | null;
    hotEvents: number | null;
  }>(() => {
    const md = this.markdown();
    const grab = (re: RegExp) => {
      const m = md.match(re);
      return m ? Number(m[1]) : null;
    };
    return {
      accelerating: grab(/(\d+)\s+accelerating/i),
      cooling:      grab(/(\d+)\s+cooling/i),
      surging:      grab(/(\d+)\s+surging/i)
                 ?? grab(/Surging\s*\(ratio[^)]+\)\s*[—-]\s*(\d+)/),
      promoted:     grab(/Pending[^(]*\((\d+)\)/i)
                 ?? grab(/(\d+)\s+promoted/i),
      hotEvents:    grab(/(\d+)\s+auto[- ]added\s+hot[- ]event/i)
                 ?? grab(/(\d+)\s+hot[- ]event\s+candidates/i),
    };
  });

  readonly hasStats = computed(() => {
    const s = this.stats();
    return s.accelerating != null || s.cooling != null || s.surging != null
      || s.promoted != null || s.hotEvents != null;
  });

  readonly recent = computed(() => {
    return this.entries()
      .filter(e => e.cadence === this.active() && !e.is_versioned)
      .sort((a, b) => b.sort_date.localeCompare(a.sort_date))
      .slice(0, 30);
  });

  constructor() {
    this.data.loadReportsIndex()
      .then(idx => {
        this.entries.set(idx.entries);
        this.loading.set(false);
      })
      .catch(err => {
        this.error.set(`Couldn't load reports index: ${err.message ?? err}`);
        this.loading.set(false);
      });

    effect(() => {
      const recent = this.recent();
      const sel = this.selectedEntry();
      // If active tab changed, jump to that tab's latest entry
      const desired = sel && recent.some(r => r.path === sel.path) ? sel : recent[0] ?? null;
      this.latestEntry.set(recent[0] ?? null);
      if (desired) this.loadEntry(desired);
      else { this.markdown.set(''); }
    });
  }

  pickTab(k: SweepKind) {
    if (k !== this.active()) {
      this.selectedEntry.set(null);
      this.active.set(k);
    }
  }

  pickEntry(e: ReportEntry) {
    this.selectedEntry.set(e);
    this.loadEntry(e);
  }

  private loadEntry(e: ReportEntry) {
    this.markdownLoading.set(true);
    this.markdown.set('');
    this.data.loadMarkdown(e.path)
      .then(text => { this.markdown.set(text); this.markdownLoading.set(false); })
      .catch(err => {
        this.error.set(`Couldn't load ${e.path}: ${err.message ?? err}`);
        this.markdownLoading.set(false);
      });
  }

  currentEntry(): ReportEntry | null {
    return this.selectedEntry() ?? this.latestEntry();
  }
}
