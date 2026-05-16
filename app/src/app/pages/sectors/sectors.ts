import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Skeleton } from 'primeng/skeleton';

import {
  DataService,
  RadarDay,
  RadarEntry,
  RadarSector,
  RadarTopic
} from '../../services/data.service';
import { DateBar } from '../../components/date-bar/date-bar';
import { MaturityBadge } from '../../components/maturity-badge/maturity-badge';
import { PinnedChips } from '../../components/pinned-chips/pinned-chips';
import { PageHeader } from '../../components/page-header/page-header';

@Component({
  selector: 'app-sectors',
  standalone: true,
  imports: [DecimalPipe, Skeleton, DateBar, MaturityBadge, PinnedChips, PageHeader],
  templateUrl: './sectors.html',
  styleUrl: './sectors.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectorsPage {
  private readonly data = inject(DataService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly entries = signal<RadarEntry[]>([]);
  readonly selectedDate = signal<string | null>(null);
  readonly day = signal<RadarDay | null>(null);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  readonly availableDates = computed(() => this.entries().map(e => e.date_id));
  readonly allSectors = computed<RadarSector[]>(() => this.day()?.sectors ?? []);
  readonly sectorNames = computed(() => this.allSectors().map(s => s.name));
  readonly chipFilter = signal<string | null>(null);
  readonly sectors = computed<RadarSector[]>(() => {
    const list = this.allSectors();
    const filt = this.chipFilter();
    if (!filt) return list;
    return list.filter(s => s.name === filt);
  });

  readonly stats = computed(() => {
    const d = this.day();
    if (!d) return null;
    return {
      topics: d.topics.length,
      sectors: d.sectors.length,
      activeOrgs: d.sectors.reduce((sum, s) => sum + (s.active_orgs ?? 0), 0)
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
      this.data.loadRadarDay(entry.json_path)
        .then(d => { this.day.set(d); this.loading.set(false); })
        .catch(err => {
          this.error.set(`Couldn't load ${entry.json_path}: ${err.message ?? err}`);
          this.loading.set(false);
        });
    });

    effect(() => {
      const date = this.selectedDate();
      if (date && this.route.snapshot.paramMap.get('date') !== date) {
        this.router.navigate(['/sectors', date], { replaceUrl: !this.route.snapshot.paramMap.get('date') });
      }
    });
  }

  topicsInSector(s: RadarSector): RadarTopic[] {
    const d = this.day();
    if (!d) return [];
    const ids = new Set(s.topic_ids);
    return d.topics.filter(t => ids.has(t.id)).sort((a, b) => b.score_fast - a.score_fast);
  }

  pick(date: string) { this.selectedDate.set(date); }

  directionDot(dir: string): string {
    switch (dir) {
      case 'surging': return 'dot--strong';
      case 'rising':  return 'dot--accent';
      case 'fading':  return 'dot--warn';
      default:        return 'dot--muted';
    }
  }
}
