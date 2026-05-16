import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Skeleton } from 'primeng/skeleton';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

import { DataService, ReportEntry } from '../../services/data.service';
import { PageHeader } from '../../components/page-header/page-header';

interface MonthGroup {
  monthLabel: string;
  monthKey: string;
  entries: ReportEntry[];
}

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [FormsModule, RouterLink, Skeleton, InputText, IconField, InputIcon, PageHeader],
  templateUrl: './archive.html',
  styleUrl: './archive.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArchivePage {
  private readonly data = inject(DataService);

  readonly dailies = signal<ReportEntry[]>([]);
  readonly query = signal<string>('');
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  readonly filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.dailies();
    return this.dailies().filter(d =>
      d.date_id.includes(q) ||
      d.headline.toLowerCase().includes(q)
    );
  });

  readonly grouped = computed<MonthGroup[]>(() => {
    const list = this.filtered();
    const byMonth = new Map<string, ReportEntry[]>();
    for (const entry of list) {
      const key = entry.date_id.slice(0, 7); // YYYY-MM
      if (!byMonth.has(key)) byMonth.set(key, []);
      byMonth.get(key)!.push(entry);
    }
    return Array.from(byMonth.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([monthKey, entries]) => {
        const parsed = new Date(monthKey + '-01T00:00:00');
        const monthLabel = parsed.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        return { monthLabel, monthKey, entries };
      });
  });

  readonly totalLabel = computed(() => {
    const total = this.dailies().length;
    const shown = this.filtered().length;
    return total === shown ? `${total} editions` : `${shown} of ${total}`;
  });

  constructor() {
    this.data.loadReportsIndex()
      .then(idx => {
        const list = idx.entries.filter(e => e.cadence === 'daily' && !e.is_versioned);
        this.dailies.set(list);
        this.loading.set(false);
      })
      .catch(err => {
        this.error.set(`Couldn't load reports index: ${err.message ?? err}`);
        this.loading.set(false);
      });
  }

  weekday(dateId: string): string {
    const d = new Date(dateId + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short' });
  }

  dayOnly(dateId: string): string {
    return dateId.slice(8, 10);
  }
}
