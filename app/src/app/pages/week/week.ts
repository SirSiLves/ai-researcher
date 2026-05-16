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
  selector: 'app-week',
  standalone: true,
  imports: [
    RouterLink, FormsModule, Skeleton, ButtonModule, Select,
    PageHeader, ArticleCards, TrendSummary
  ],
  templateUrl: './week.html',
  styleUrl: './week.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekPage {
  private readonly data = inject(DataService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly weeklies = signal<ReportEntry[]>([]);
  readonly selected = signal<string | null>(null);
  readonly markdown = signal<string>('');
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  readonly options = computed(() =>
    this.weeklies().map(e => ({ label: e.date_id, value: e.date_id, headline: e.headline }))
  );

  readonly current = computed(() => {
    const id = this.selected();
    return this.weeklies().find(e => e.date_id === id) ?? null;
  });

  readonly currentIndex = computed(() => {
    const id = this.selected();
    return this.weeklies().findIndex(e => e.date_id === id);
  });

  readonly canPrev = computed(() => this.currentIndex() < this.weeklies().length - 1);
  readonly canNext = computed(() => this.currentIndex() > 0);

  /** Translate "YYYY-Www" → the Sunday of that ISO week. */
  readonly weekAnchor = computed<string | null>(() => {
    const id = this.selected();
    if (!id) return null;
    const m = id.match(/^(\d{4})-W(\d{2})$/);
    if (!m) return null;
    const year = Number(m[1]);
    const week = Number(m[2]);
    // ISO: Thursday of week 1 is in January 4th. Compute Monday then add 6.
    const jan4 = new Date(Date.UTC(year, 0, 4));
    const jan4Day = jan4.getUTCDay() || 7;
    const monday = new Date(jan4.getTime() + ((week - 1) * 7 + (1 - jan4Day)) * 86_400_000);
    const sunday = new Date(monday.getTime() + 6 * 86_400_000);
    return sunday.toISOString().slice(0, 10);
  });

  constructor() {
    this.data.loadReportsIndex().then(idx => {
      const wks = idx.entries
        .filter(e => e.cadence === 'weekly' && !e.is_versioned)
        .sort((a, b) => b.sort_date.localeCompare(a.sort_date));
      this.weeklies.set(wks);
      const param = this.route.snapshot.paramMap.get('id');
      this.selected.set(param ?? wks[0]?.date_id ?? null);
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
      const list = this.weeklies();
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
        this.router.navigate(['/week', id], { replaceUrl: !this.route.snapshot.paramMap.get('id') });
      }
    });
  }

  prev() {
    const list = this.weeklies();
    const i = this.currentIndex();
    if (i < list.length - 1) this.selected.set(list[i + 1].date_id);
  }

  next() {
    const list = this.weeklies();
    const i = this.currentIndex();
    if (i > 0) this.selected.set(list[i - 1].date_id);
  }
}
