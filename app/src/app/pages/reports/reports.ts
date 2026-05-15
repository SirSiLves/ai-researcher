import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Skeleton } from 'primeng/skeleton';
import { Message } from 'primeng/message';
import { Drawer } from 'primeng/drawer';
import { Button } from 'primeng/button';
import { DataService, ReportEntry } from '../../services/data.service';
import { MarkdownViewer } from '../../components/markdown-viewer/markdown-viewer';

const CADENCE_COLORS: Record<string, string> = {
  daily: '#3b82f6',
  weekly: '#8b5cf6',
  monthly: '#f59e0b',
  radar: '#10b981',
  vendor_candidates: '#ec4899',
  keyword_candidates: '#ef4444',
  github_candidates: '#64748b'
};

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [FormsModule, InputText, IconField, InputIcon, Skeleton, Message, Drawer, Button, MarkdownViewer],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsPage {
  private readonly data = inject(DataService);

  readonly entries = signal<ReportEntry[]>([]);
  readonly cadences = signal<string[]>([]);
  readonly activeCadences = signal<Set<string>>(new Set());
  readonly query = signal<string>('');
  readonly selected = signal<ReportEntry | null>(null);
  readonly markdown = signal<string>('');
  readonly markdownLoading = signal<boolean>(false);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  readonly filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    const active = this.activeCadences();
    return this.entries().filter(e => {
      if (active.size && !active.has(e.cadence)) return false;
      if (!q) return true;
      return e.headline.toLowerCase().includes(q) || e.date_id.toLowerCase().includes(q);
    });
  });

  constructor() {
    this.data.loadReportsIndex()
      .then(idx => {
        this.entries.set(idx.entries);
        this.cadences.set(idx.cadences);
        this.loading.set(false);
      })
      .catch(err => {
        this.error.set(`Failed to load reports index: ${err.message ?? err}`);
        this.loading.set(false);
      });

    effect(() => {
      const sel = this.selected();
      if (!sel) { this.markdown.set(''); return; }
      this.markdownLoading.set(true);
      this.data.loadMarkdown(sel.path)
        .then(text => { this.markdown.set(text); this.markdownLoading.set(false); })
        .catch(err => {
          this.error.set(`Couldn't load ${sel.path}: ${err.message ?? err}`);
          this.markdownLoading.set(false);
        });
    });
  }

  toggle(cadence: string, checked: boolean) {
    const next = new Set(this.activeCadences());
    if (checked) next.add(cadence); else next.delete(cadence);
    this.activeCadences.set(next);
  }

  isActive(cadence: string): boolean {
    return this.activeCadences().has(cadence);
  }

  cadenceColor(cadence: string): string {
    return CADENCE_COLORS[cadence] ?? '#94a3b8';
  }

  open(entry: ReportEntry) {
    this.selected.set(entry);
  }

  close() {
    this.selected.set(null);
    this.markdown.set('');
  }

  clearFilters() {
    this.activeCadences.set(new Set());
  }
}
