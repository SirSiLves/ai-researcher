import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Skeleton } from 'primeng/skeleton';
import { Listbox } from 'primeng/listbox';

import { DataService, ReportEntry } from '../../services/data.service';
import { MarkdownViewer } from '../../components/markdown-viewer/markdown-viewer';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [FormsModule, Skeleton, Listbox, MarkdownViewer],
  templateUrl: './today.html',
  styleUrl: './today.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodayPage {
  private readonly data = inject(DataService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly dailies = signal<ReportEntry[]>([]);
  readonly selectedDate = signal<string | null>(null);
  readonly markdown = signal<string>('');
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  readonly current = computed(() => {
    const date = this.selectedDate();
    if (!date) return null;
    return this.dailies().find(d => d.date_id === date) ?? null;
  });

  readonly currentIndex = computed(() => {
    const date = this.selectedDate();
    return this.dailies().findIndex(d => d.date_id === date);
  });

  readonly formattedDate = computed(() => {
    const d = this.selectedDate();
    if (!d) return '';
    const parsed = new Date(d + 'T00:00:00');
    return parsed.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  });

  readonly canPrev = computed(() => this.currentIndex() < this.dailies().length - 1);
  readonly canNext = computed(() => this.currentIndex() > 0);

  constructor() {
    this.data.loadReportsIndex().then(idx => {
      const dailies = idx.entries.filter(e => e.cadence === 'daily' && !e.is_versioned);
      this.dailies.set(dailies);
      const routeParam = this.route.snapshot.paramMap.get('date');
      const initial = routeParam ?? dailies[0]?.date_id ?? null;
      this.selectedDate.set(initial);
    }).catch(err => {
      this.error.set(`Couldn't load reports index: ${err.message ?? err}`);
      this.loading.set(false);
    });

    effect(() => {
      const date = this.selectedDate();
      const list = this.dailies();
      if (!date || !list.length) return;
      const entry = list.find(d => d.date_id === date);
      if (!entry) return;
      this.loading.set(true);
      this.markdown.set('');
      this.data.loadMarkdown(entry.path)
        .then(text => { this.markdown.set(text); this.loading.set(false); })
        .catch(err => {
          this.error.set(`Couldn't load ${entry.path}: ${err.message ?? err}`);
          this.loading.set(false);
        });
    });

    effect(() => {
      const date = this.selectedDate();
      if (date && this.route.snapshot.paramMap.get('date') !== date) {
        this.router.navigate(['/today', date], { replaceUrl: !this.route.snapshot.paramMap.get('date') });
      }
    });
  }

  onPick(value: string | null) {
    if (value) this.selectedDate.set(value);
  }

  prev() {
    const list = this.dailies();
    const i = this.currentIndex();
    if (i < list.length - 1) this.selectedDate.set(list[i + 1].date_id);
  }

  next() {
    const list = this.dailies();
    const i = this.currentIndex();
    if (i > 0) this.selectedDate.set(list[i - 1].date_id);
  }
}
