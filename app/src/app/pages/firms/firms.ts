import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Skeleton } from 'primeng/skeleton';
import { SelectButton } from 'primeng/selectbutton';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';

import { DataService, OrgIndexEntry, OrgDetail } from '../../services/data.service';
import { PageHeader } from '../../components/page-header/page-header';

const SPARK_BLOCKS = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

@Component({
  selector: 'app-firms',
  standalone: true,
  imports: [
    FormsModule,
    TableModule, Skeleton,
    SelectButton, InputText, IconField, InputIcon,
    ToggleSwitch, ButtonModule, Tag, PageHeader
  ],
  templateUrl: './firms.html',
  styleUrl: './firms.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirmsPage {
  private readonly data = inject(DataService);
  private readonly router = inject(Router);

  readonly orgs = signal<OrgIndexEntry[]>([]);
  readonly query = signal<string>('');
  readonly velocityFilter = signal<string | null>(null);
  readonly priorityOnly = signal<boolean>(false);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  private readonly historyCache = new Map<string, number[]>();
  readonly historyVersion = signal<number>(0);

  readonly velocityOptions = [
    { label: 'All',          value: null },
    { label: 'Surging',      value: 'surging' },
    { label: 'Accelerating', value: 'accelerating' },
    { label: 'Steady',       value: 'steady' },
    { label: 'Cooling',      value: 'cooling' }
  ];

  readonly filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    const vel = this.velocityFilter();
    const pri = this.priorityOnly();
    return this.orgs()
      .filter(o => !q || o.slug.toLowerCase().includes(q) || o.top_topics.some(t => t.toLowerCase().includes(q)))
      .filter(o => !vel || o.velocity_status === vel)
      .filter(o => !pri || o.is_priority);
  });

  readonly stats = computed(() => {
    const orgs = this.orgs();
    if (!orgs.length) return null;
    return {
      total: orgs.length,
      priority: orgs.filter(o => o.is_priority).length,
      surging: orgs.filter(o => o.velocity_status === 'surging').length,
      filtered: this.filtered().length
    };
  });

  constructor() {
    this.data.loadOrgsIndex()
      .then(idx => {
        this.orgs.set(idx.entries);
        this.loading.set(false);
        this.warmupSparklines(idx.entries);
      })
      .catch(err => {
        this.error.set(`Couldn't load orgs index: ${err.message ?? err}`);
        this.loading.set(false);
      });
  }

  private cacheHistory(slug: string, d: OrgDetail) {
    if (d.velocity_history?.length) {
      this.historyCache.set(slug, d.velocity_history.map(p => p.velocity_7d));
      this.historyVersion.update(v => v + 1);
    }
  }

  private async warmupSparklines(orgs: OrgIndexEntry[]) {
    const BATCH = 8;
    for (let i = 0; i < orgs.length; i += BATCH) {
      const slice = orgs.slice(i, i + BATCH);
      await Promise.all(slice.map(o =>
        this.data.loadOrgDetail(o.slug)
          .then(d => this.cacheHistory(o.slug, d))
          .catch(() => { /* swallow */ })
      ));
    }
  }

  rowSpark(slug: string): string {
    this.historyVersion();
    const arr = this.historyCache.get(slug);
    return arr ? this.sparkFromArr(arr.slice(-14)) : '';
  }

  private sparkFromArr(arr: number[]): string {
    if (!arr.length) return '';
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = Math.max(1, max - min);
    return arr.map(v => SPARK_BLOCKS[Math.min(7, Math.floor(((v - min) / range) * 7.999))]).join('');
  }

  open(slug: string) {
    this.router.navigate(['/firms', slug]);
  }

  statusLabel(status: string): string { return status || '—'; }

  statusSeverity(status: string | undefined): 'success' | 'info' | 'warn' | 'secondary' | 'danger' {
    switch (status) {
      case 'surging':      return 'success';
      case 'accelerating': return 'info';
      case 'steady':       return 'secondary';
      case 'cooling':      return 'warn';
      default:             return 'secondary';
    }
  }

  clearFilters() {
    this.query.set('');
    this.velocityFilter.set(null);
    this.priorityOnly.set(false);
  }
}
