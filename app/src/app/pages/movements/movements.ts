import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';

import {
  DataService,
  RadarDay,
  RadarEntry,
  StageMovement
} from '../../services/data.service';
import { DateBar } from '../../components/date-bar/date-bar';
import { MaturityBadge } from '../../components/maturity-badge/maturity-badge';
import { MarkdownViewer } from '../../components/markdown-viewer/markdown-viewer';
import { PageHeader } from '../../components/page-header/page-header';

interface StageGroup {
  label: string;
  to: string;
  items: StageMovement[];
}

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [Skeleton, DateBar, MaturityBadge, MarkdownViewer, PageHeader],
  templateUrl: './movements.html',
  styleUrl: './movements.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovementsPage {
  private readonly data = inject(DataService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly entries = signal<RadarEntry[]>([]);
  readonly selectedDate = signal<string | null>(null);
  readonly day = signal<RadarDay | null>(null);
  readonly note = signal<string>('');
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  readonly availableDates = computed(() => this.entries().map(e => e.date_id));

  readonly stageGroups = computed<StageGroup[]>(() => {
    const d = this.day();
    if (!d) return [];
    const order = ['mainstream', 'consolidating', 'emerging', 'fading'];
    const labels: Record<string, string> = {
      mainstream:    'Reached mainstream',
      consolidating: 'Consolidating',
      emerging:      'Emerging',
      fading:        'Fading'
    };
    const grouped = new Map<string, StageMovement[]>();
    for (const m of d.stage_movements) {
      if (!grouped.has(m.to)) grouped.set(m.to, []);
      grouped.get(m.to)!.push(m);
    }
    return order
      .filter(s => grouped.has(s))
      .map(s => ({ to: s, label: labels[s] ?? s, items: grouped.get(s) ?? [] }));
  });

  readonly stats = computed(() => {
    const d = this.day();
    if (!d) return null;
    return {
      transitions: d.stage_movements.length,
      sectorsSpawned: d.sectors_spawned_today?.length ?? 0,
      sectorsDissolved: d.sectors_dissolved_today?.length ?? 0
    };
  });

  constructor() {
    this.data.loadRadarIndex()
      .then(idx => {
        const entries = idx.entries.filter(e => !e.is_versioned);
        this.entries.set(entries);
        const routeParam = this.route.snapshot.paramMap.get('date');
        this.selectedDate.set(routeParam ?? entries[0]?.date_id ?? null);
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

    effect(() => {
      const date = this.selectedDate();
      if (date && this.route.snapshot.paramMap.get('date') !== date) {
        this.router.navigate(['/movements', date], { replaceUrl: !this.route.snapshot.paramMap.get('date') });
      }
    });
  }

  pick(date: string) { this.selectedDate.set(date); }

  stageLabel(stage: string | null | undefined): string {
    return stage ?? 'new';
  }
}
