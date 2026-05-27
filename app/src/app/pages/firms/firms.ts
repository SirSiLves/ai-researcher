import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Skeleton } from 'primeng/skeleton';
import { Drawer } from 'primeng/drawer';
import { SelectButton } from 'primeng/selectbutton';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { MeterGroup } from 'primeng/metergroup';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';

import { DataService, OrgIndexEntry, OrgDetail } from '../../services/data.service';
import { humanizeSlug } from '../../services/humanize';

const SPARK_BLOCKS = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

@Component({
  selector: 'app-firms',
  standalone: true,
  imports: [
    FormsModule, DecimalPipe,
    TableModule, Skeleton, Drawer,
    SelectButton, InputText, IconField, InputIcon, MeterGroup,
    ToggleSwitch, ButtonModule
  ],
  templateUrl: './firms.html',
  styleUrl: './firms.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirmsPage {
  private readonly data = inject(DataService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly orgs = signal<OrgIndexEntry[]>([]);
  readonly query = signal<string>('');
  readonly velocityFilter = signal<string | null>(null);
  readonly priorityOnly = signal<boolean>(false);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  readonly selectedSlug = signal<string | null>(null);
  readonly detail = signal<OrgDetail | null>(null);
  readonly detailLoading = signal<boolean>(false);

  /** Display label for a firm row: prefer the build-side display_name, then
   *  humanizeSlug() so brand names like "OpenAI" / "Hugging Face" render
   *  correctly even before display_name lands in older index files. */
  firmDisplay(o: OrgIndexEntry): string {
    return o.display_name || humanizeSlug(o.slug);
  }

  readonly velocityOptions = [
    { label: 'All',          value: null },
    { label: 'Surging',      value: 'surging' },
    { label: 'Accelerating', value: 'accelerating' },
    { label: 'Steady',       value: 'steady' },
    { label: 'Cooling',      value: 'cooling' }
  ];

  /** Slug → index entry. Built once when the index loads; powers row sparklines
   *  and drawer-side velocity without the per-firm fetch waterfall. */
  private readonly bySlug = computed<Map<string, OrgIndexEntry>>(() => {
    const m = new Map<string, OrgIndexEntry>();
    for (const o of this.orgs()) m.set(o.slug, o);
    return m;
  });

  readonly filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    const vel = this.velocityFilter();
    const pri = this.priorityOnly();
    return this.orgs()
      .filter(o => !q || o.slug.toLowerCase().includes(q) || o.top_topics.some(t => t.toLowerCase().includes(q)))
      .filter(o => !vel || o.velocity_status === vel)
      .filter(o => !pri || o.is_priority);
  });

  readonly maxVelocity = computed(() => Math.max(1, ...this.orgs().map(o => o.velocity_7d)));

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

  /** Selected firm's index entry — drives drawer-side velocity stats + sparkline.
   *  Resolved from the in-memory index map; no extra HTTP request. */
  readonly selectedEntry = computed<OrgIndexEntry | null>(() => {
    const slug = this.selectedSlug();
    return slug ? (this.bySlug().get(slug) ?? null) : null;
  });

  readonly detailSpark = computed<number[]>(() => {
    const e = this.selectedEntry();
    return e?.velocity_history?.map(p => p.velocity_7d) ?? [];
  });

  readonly topicMixSorted = computed(() => {
    const d = this.detail();
    if (!d?.topic_mix) return [] as Array<{ topic: string; n: number }>;
    return Object.entries(d.topic_mix)
      .map(([topic, n]) => ({ topic, n: n as number }))
      .sort((a, b) => b.n - a.n)
      .slice(0, 12);
  });

  readonly sourceMeter = computed(() => {
    const d = this.detail();
    if (!d?.mentions_by_source_type) return [];
    const counts = Object.values(d.mentions_by_source_type).map(v => v as number);
    const total = counts.reduce((s, v) => s + v, 0) || 1;
    return Object.entries(d.mentions_by_source_type)
      .filter(([_, v]) => (v as number) > 0)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .map(([key, value]) => ({
        label: key,
        value: ((value as number) / total) * 100,
        raw: value as number
      }));
  });

  /** Derived from the selected index entry (not the per-firm detail file),
   *  since velocity_history + velocity stats live on the index now. */
  readonly detailVelocity = computed(() => {
    const e = this.selectedEntry();
    if (!e) return null;
    return {
      velocity_7d: e.velocity_7d,
      velocity_28d_avg: e.velocity_28d_avg,
      velocity_ratio: e.velocity_ratio,
      velocity_status: e.velocity_status
    };
  });

  constructor() {
    this.data.loadOrgsIndex()
      .then(idx => {
        this.orgs.set(idx.entries);
        this.loading.set(false);
        const slug = this.route.snapshot.paramMap.get('slug');
        if (slug) this.selectedSlug.set(slug);
      })
      .catch(err => {
        this.error.set(`Couldn't load orgs index: ${err.message ?? err}`);
        this.loading.set(false);
      });

    effect(() => {
      const slug = this.selectedSlug();
      if (!slug) { this.detail.set(null); return; }
      this.detailLoading.set(true);
      this.data.loadOrgDetail(slug)
        .then(d => { this.detail.set(d); this.detailLoading.set(false); })
        .catch(err => {
          this.error.set(`Couldn't load orgs/${slug}.json: ${err.message ?? err}`);
          this.detailLoading.set(false);
        });
    });
  }

  rowSpark(slug: string): string {
    const e = this.bySlug().get(slug);
    if (!e?.velocity_history?.length) return '';
    const arr = e.velocity_history.slice(-14).map(p => p.velocity_7d);
    return this.sparkFromArr(arr);
  }

  private sparkFromArr(arr: number[]): string {
    if (!arr.length) return '';
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = Math.max(1, max - min);
    return arr.map(v => SPARK_BLOCKS[Math.min(7, Math.floor(((v - min) / range) * 7.999))]).join('');
  }

  detailSparkStr(): string {
    return this.sparkFromArr(this.detailSpark());
  }

  open(slug: string) {
    this.selectedSlug.set(slug);
    this.router.navigate(['/firms', slug], { replaceUrl: !this.route.snapshot.paramMap.get('slug') });
  }

  close() {
    this.selectedSlug.set(null);
    this.router.navigate(['/firms']);
  }

  statusLabel(status: string): string { return status || '—'; }

  bar(value: number, max: number, width = 10): string {
    if (!max) return '';
    const pct = Math.min(1, Math.abs(value) / max);
    const cells = Math.round(pct * width);
    return cells === 0 ? '·' : '▇'.repeat(cells);
  }

  clearFilters() {
    this.query.set('');
    this.velocityFilter.set(null);
    this.priorityOnly.set(false);
  }
}
