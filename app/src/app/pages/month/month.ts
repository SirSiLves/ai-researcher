import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Skeleton } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';

import { DataService, ReportEntry } from '../../services/data.service';
import { PageHeader } from '../../components/page-header/page-header';
import { ArticleCards } from '../../components/article-cards/article-cards';
import { TrendSummary } from '../../components/trend-summary/trend-summary';

@Component({
  selector: 'app-month',
  standalone: true,
  imports: [
    RouterLink, FormsModule, Skeleton, ButtonModule, Select,
    PageHeader, ArticleCards, TrendSummary
  ],
  templateUrl: './month.html',
  styleUrl: './month.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthPage {
  private readonly data = inject(DataService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly months = signal<ReportEntry[]>([]);
  readonly selected = signal<string | null>(null);
  readonly markdown = signal<string>('');
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  readonly options = computed(() =>
    this.months().map(e => ({ label: this.label(e.date_id), value: e.date_id, headline: e.headline }))
  );

  readonly current = computed(() => {
    const id = this.selected();
    return this.months().find(e => e.date_id === id) ?? null;
  });

  readonly currentIndex = computed(() => {
    const id = this.selected();
    return this.months().findIndex(e => e.date_id === id);
  });

  readonly canPrev = computed(() => this.currentIndex() < this.months().length - 1);
  readonly canNext = computed(() => this.currentIndex() > 0);

  /** Last day of the selected month (clamped to today if the month is current). */
  readonly monthAnchor = computed<string | null>(() => {
    const id = this.selected();
    if (!id) return null;
    const m = id.match(/^(\d{4})-(\d{2})$/);
    if (!m) return null;
    const year = Number(m[1]);
    const month = Number(m[2]);
    const last = new Date(Date.UTC(year, month, 0));   // day 0 of next month = last day
    const today = new Date();
    const clamp = today < last ? today : last;
    return clamp.toISOString().slice(0, 10);
  });

  constructor() {
    this.data.loadReportsIndex().then(idx => {
      const ms = idx.entries
        .filter(e => e.cadence === 'monthly' && !e.is_versioned)
        .sort((a, b) => b.sort_date.localeCompare(a.sort_date));
      this.months.set(ms);
      const param = this.route.snapshot.paramMap.get('id');
      this.selected.set(param ?? ms[0]?.date_id ?? null);
    }).catch(err => {
      this.error.set(`Couldn't load reports index: ${err.message ?? err}`);
      this.loading.set(false);
    });

    this.route.paramMap.subscribe(p => {
      const id = p.get('id');
      if (id && id !== this.selected()) this.selected.set(id);
    });

    effect(() => {
      const id = this.selected();
      const list = this.months();
      if (!id || !list.length) return;
      const entry = list.find(e => e.date_id === id);
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
      const id = this.selected();
      if (id && this.route.snapshot.paramMap.get('id') !== id) {
        this.router.navigate(['/month', id], { replaceUrl: !this.route.snapshot.paramMap.get('id') });
      }
    });
  }

  label(id: string): string {
    const m = id.match(/^(\d{4})-(\d{2})$/);
    if (!m) return id;
    const d = new Date(Number(m[1]), Number(m[2]) - 1, 1);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  }

  prev() {
    const list = this.months();
    const i = this.currentIndex();
    if (i < list.length - 1) this.selected.set(list[i + 1].date_id);
  }

  next() {
    const list = this.months();
    const i = this.currentIndex();
    if (i > 0) this.selected.set(list[i - 1].date_id);
  }
}
