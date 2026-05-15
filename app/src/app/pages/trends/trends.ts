import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Skeleton } from 'primeng/skeleton';
import { DatePicker } from 'primeng/datepicker';
import { Panel } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';

import {
  DataService,
  RadarDay,
  RadarEntry,
  RadarTopic,
  RadarSector,
  TopicCluster
} from '../../services/data.service';
import { RadarChart } from '../../components/radar-chart/radar-chart';
import { MarkdownViewer } from '../../components/markdown-viewer/markdown-viewer';

@Component({
  selector: 'app-trends',
  standalone: true,
  imports: [
    FormsModule, DecimalPipe,
    TableModule, Skeleton, DatePicker, Panel, ButtonModule,
    RadarChart, MarkdownViewer
  ],
  templateUrl: './trends.html',
  styleUrl: './trends.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrendsPage {
  private readonly data = inject(DataService);

  readonly entries = signal<RadarEntry[]>([]);
  readonly selectedDate = signal<string | null>(null);
  readonly day = signal<RadarDay | null>(null);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);
  readonly note = signal<string>('');
  readonly showNote = signal<boolean>(false);

  readonly availableDateSet = computed(() => new Set(this.entries().map(e => e.date_id)));
  readonly minDate = computed(() => {
    const e = this.entries();
    return e.length ? new Date(e[e.length - 1].date_id + 'T00:00:00') : null;
  });
  readonly maxDate = computed(() => {
    const e = this.entries();
    return e.length ? new Date(e[0].date_id + 'T00:00:00') : null;
  });
  readonly selectedDateValue = computed(() => {
    const d = this.selectedDate();
    return d ? new Date(d + 'T00:00:00') : null;
  });
  readonly currentIndex = computed(() => {
    const d = this.selectedDate();
    return this.entries().findIndex(e => e.date_id === d);
  });
  readonly canOlder = computed(() => {
    const i = this.currentIndex();
    return i >= 0 && i < this.entries().length - 1;
  });
  readonly canNewer = computed(() => this.currentIndex() > 0);

  readonly dateFilter = (d: { year: number; month: number; day: number }): boolean => {
    const iso = `${d.year}-${String(d.month + 1).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`;
    return this.availableDateSet().has(iso);
  };

  readonly sectors = computed<RadarSector[]>(() => this.day()?.sectors ?? []);
  readonly clusters = computed<TopicCluster[]>(() => this.day()?.topic_clusters ?? []);

  readonly maxMomentum = computed(() => {
    const d = this.day();
    if (!d?.topics.length) return 1;
    return Math.max(1, ...d.topics.map(t => Math.abs(t.momentum_7d_pct)));
  });

  readonly topMovers = computed<RadarTopic[]>(() => {
    const d = this.day();
    if (!d) return [];
    return [...d.topics].sort((a, b) => b.momentum_7d_pct - a.momentum_7d_pct).slice(0, 10);
  });

  readonly risingCount = computed(() => this.day()?.topics.filter(t => t.direction === 'rising').length ?? 0);
  readonly emergingCount = computed(() => this.day()?.topics.filter(t => t.stage === 'emerging').length ?? 0);
  readonly stageMoves = computed(() => this.day()?.stage_movements ?? []);

  constructor() {
    this.data.loadRadarIndex()
      .then(idx => {
        const entries = idx.entries.filter(e => !e.is_versioned);
        this.entries.set(entries);
        this.selectedDate.set(entries[0]?.date_id ?? null);
      })
      .catch(err => {
        this.error.set(`Couldn't load radar index: ${err.message ?? err}`);
        this.loading.set(false);
      });

    effect(() => {
      const date = this.selectedDate();
      const list = this.entries();
      if (!date || !list.length) return;
      const entry = list.find(e => e.date_id === date);
      if (!entry) return;
      this.loading.set(true);
      this.day.set(null);
      this.note.set('');
      this.data.loadRadarDay(entry.json_path)
        .then(d => { this.day.set(d); this.loading.set(false); })
        .catch(err => {
          this.error.set(`Couldn't load ${entry.json_path}: ${err.message ?? err}`);
          this.loading.set(false);
        });
      this.data.loadMarkdown(entry.md_path)
        .then(text => this.note.set(text))
        .catch(() => { /* note is optional */ });
    });
  }

  topicsInCluster(c: TopicCluster): RadarTopic[] {
    const d = this.day();
    if (!d) return [];
    const ids = new Set(c.topic_ids);
    return d.topics.filter(t => ids.has(t.id)).sort((a, b) => b.score - a.score);
  }

  topicsInSector(s: RadarSector): RadarTopic[] {
    const d = this.day();
    if (!d) return [];
    const ids = new Set(s.topic_ids);
    return d.topics.filter(t => ids.has(t.id)).sort((a, b) => b.score - a.score);
  }

  directionLabel(dir: string): string {
    if (dir === 'rising') return 'rising';
    if (dir === 'falling') return 'falling';
    return 'steady';
  }

  bar(value: number, max: number, width = 12): string {
    if (!max) return '';
    const pct = Math.min(1, Math.abs(value) / max);
    const cells = Math.round(pct * width);
    return cells === 0 ? '·' : '▇'.repeat(cells);
  }

  pickDate(d: string) { this.selectedDate.set(d); }

  pickFromCalendar(d: Date | null) {
    if (!d) return;
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (this.availableDateSet().has(iso)) this.selectedDate.set(iso);
  }

  older() {
    const i = this.currentIndex();
    const list = this.entries();
    if (i >= 0 && i < list.length - 1) this.selectedDate.set(list[i + 1].date_id);
  }
  newer() {
    const i = this.currentIndex();
    if (i > 0) this.selectedDate.set(this.entries()[i - 1].date_id);
  }
  latest() {
    const e = this.entries();
    if (e.length) this.selectedDate.set(e[0].date_id);
  }

  toggleNote() { this.showNote.update(v => !v); }
}
