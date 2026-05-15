import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Skeleton } from 'primeng/skeleton';
import { Message } from 'primeng/message';

import { DataService, ReportEntry } from '../../services/data.service';
import { MarkdownViewer } from '../../components/markdown-viewer/markdown-viewer';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [FormsModule, Select, Skeleton, Message, MarkdownViewer],
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

  readonly options = computed(() =>
    this.dailies().map(d => ({
      label: `${d.date_id} — ${d.headline.slice(0, 80)}${d.headline.length > 80 ? '…' : ''}`,
      value: d.date_id
    }))
  );

  constructor() {
    this.data.loadReportsIndex().then(idx => {
      const dailies = idx.entries.filter(e => e.cadence === 'daily' && !e.is_versioned);
      this.dailies.set(dailies);
      const routeParam = this.route.snapshot.paramMap.get('date');
      const initial = routeParam ?? dailies[0]?.date_id ?? null;
      this.selectedDate.set(initial);
    }).catch(err => {
      this.error.set(`Failed to load reports index: ${err.message ?? err}`);
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

    // Reflect chosen date in URL
    effect(() => {
      const date = this.selectedDate();
      if (date && this.route.snapshot.paramMap.get('date') !== date) {
        this.router.navigate(['/today', date], { replaceUrl: !this.route.snapshot.paramMap.get('date') });
      }
    });
  }

  onPick(value: string) {
    this.selectedDate.set(value);
  }
}
