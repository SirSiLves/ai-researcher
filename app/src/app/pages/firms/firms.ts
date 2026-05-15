import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Select } from 'primeng/select';
import { Skeleton } from 'primeng/skeleton';
import { Tag } from 'primeng/tag';
import { Chip } from 'primeng/chip';
import { Message } from 'primeng/message';
import { Drawer } from 'primeng/drawer';
import { Button } from 'primeng/button';

import { DataService, OrgIndexEntry, OrgDetail } from '../../services/data.service';

const VELOCITY_BADGES: Record<string, string> = {
  surging: 'rising',
  accelerating: 'rising',
  steady: '',
  cooling: 'falling'
};

@Component({
  selector: 'app-firms',
  standalone: true,
  imports: [FormsModule, InputText, IconField, InputIcon, Select, Skeleton, Tag, Chip, Message, Drawer, Button],
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
  readonly tierFilter = signal<string | null>(null);
  readonly velocityFilter = signal<string | null>(null);
  readonly sortKey = signal<'velocity_7d' | 'total_mentions' | 'last_seen'>('velocity_7d');
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  readonly selectedSlug = signal<string | null>(null);
  readonly detail = signal<OrgDetail | null>(null);
  readonly detailLoading = signal<boolean>(false);

  readonly tierOptions = computed(() => {
    const set = new Set<string>();
    for (const o of this.orgs()) if (o.tier_hint) set.add(o.tier_hint);
    return [{ label: 'All tiers', value: null }, ...[...set].sort().map(t => ({ label: t, value: t }))];
  });

  readonly velocityOptions = [
    { label: 'All', value: null },
    { label: 'Surging', value: 'surging' },
    { label: 'Accelerating', value: 'accelerating' },
    { label: 'Steady', value: 'steady' },
    { label: 'Cooling', value: 'cooling' }
  ];

  readonly sortOptions = [
    { label: 'Velocity (7d)', value: 'velocity_7d' },
    { label: 'Total mentions', value: 'total_mentions' },
    { label: 'Last seen', value: 'last_seen' }
  ];

  readonly filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    const tier = this.tierFilter();
    const vel = this.velocityFilter();
    const sort = this.sortKey();
    return this.orgs()
      .filter(o => !q || o.slug.toLowerCase().includes(q) || o.top_topics.some(t => t.toLowerCase().includes(q)))
      .filter(o => !tier || o.tier_hint === tier)
      .filter(o => !vel || o.velocity_status === vel)
      .sort((a, b) => {
        if (sort === 'last_seen') return b.last_seen.localeCompare(a.last_seen);
        return (b[sort] as number) - (a[sort] as number);
      });
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
        this.error.set(`Failed to load orgs index: ${err.message ?? err}`);
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

  open(slug: string) {
    this.selectedSlug.set(slug);
    this.router.navigate(['/firms', slug], { replaceUrl: !this.route.snapshot.paramMap.get('slug') });
  }

  close() {
    this.selectedSlug.set(null);
    this.router.navigate(['/firms']);
  }

  velocityClass(status: string): string {
    return VELOCITY_BADGES[status] ?? '';
  }

  topSources(detail: OrgDetail): Array<{ key: string; value: number }> {
    const m = detail.mentions_by_source_type ?? {};
    return Object.entries(m)
      .filter(([_, v]) => v > 0)
      .map(([key, value]) => ({ key, value }))
      .sort((a, b) => b.value - a.value);
  }
}
