import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Skeleton } from 'primeng/skeleton';
import { Drawer } from 'primeng/drawer';
import { MultiSelect } from 'primeng/multiselect';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';

import { DataService, ReportEntry } from '../../services/data.service';
import { MarkdownViewer } from '../../components/markdown-viewer/markdown-viewer';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    FormsModule,
    TableModule, Skeleton, Drawer,
    MultiSelect, InputText, IconField, InputIcon,
    ToggleSwitch, ButtonModule,
    MarkdownViewer
  ],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsPage {
  private readonly data = inject(DataService);

  readonly entries = signal<ReportEntry[]>([]);
  readonly cadences = signal<string[]>([]);
  readonly activeCadences = signal<string[]>([]);
  readonly showVersioned = signal<boolean>(false);
  readonly query = signal<string>('');
  readonly selected = signal<ReportEntry | null>(null);
  readonly markdown = signal<string>('');
  readonly markdownLoading = signal<boolean>(false);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  readonly filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    const cads = this.activeCadences();
    const showVer = this.showVersioned();
    return this.entries().filter(e => {
      if (!showVer && e.is_versioned) return false;
      if (cads.length && !cads.includes(e.cadence)) return false;
      if (!q) return true;
      return e.headline.toLowerCase().includes(q) || e.date_id.toLowerCase().includes(q) || e.cadence.includes(q);
    });
  });

  readonly cadenceOptions = computed(() =>
    this.cadences().map(c => ({ label: this.cadenceLabel(c), value: c }))
  );

  constructor() {
    this.data.loadReportsIndex()
      .then(idx => {
        this.entries.set(idx.entries);
        this.cadences.set(idx.cadences);
        this.loading.set(false);
      })
      .catch(err => {
        this.error.set(`Couldn't load reports index: ${err.message ?? err}`);
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

  cadenceLabel(c: string): string {
    return c.replace(/_/g, ' ');
  }

  open(entry: ReportEntry) { this.selected.set(entry); }
  close() { this.selected.set(null); this.markdown.set(''); }

  clearFilters() {
    this.activeCadences.set([]);
    this.query.set('');
    this.showVersioned.set(false);
  }
}
