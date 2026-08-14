import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';

import { DataService } from './services/data.service';

type Theme = 'dark' | 'light';

interface NavTab {
  path: string;
  label: string;
  icon: string;
  hint: string;
}

const STORAGE_KEY_SIDEBAR = 'air.sidebar.collapsed';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ButtonModule, Tooltip],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  private readonly data = inject(DataService);

  readonly navTabs: NavTab[] = [
    { path: '/pulse',    label: 'Pulse',    icon: 'wave-pulse',  hint: 'Today' },
    { path: '/momentum', label: 'Momentum', icon: 'chart-line',  hint: '7d · 30d · 90d' },
    { path: '/map',      label: 'Map',      icon: 'compass',     hint: 'Sectors · Topics · Firms' },
    { path: '/trends',   label: 'Trends',   icon: 'sitemap',     hint: 'Long-arc ledger' },
    { path: '/archive',  label: 'Archive',  icon: 'inbox',       hint: 'Everything published' }
  ];

  readonly theme = signal<Theme>('light');
  readonly sidebarCollapsed = signal<boolean>(false);

  /** Set when the newest daily in the reports manifest is ≥2 days old —
   *  the pipeline runs nightly at ~20:00, so "newest = yesterday" is normal
   *  during the day and only a 2+ day gap means a missed run. This banner
   *  exists because the health-beacon step once died silently for 5 weeks
   *  (2026-05-24 → 2026-07-01) and nothing in the UI showed it. */
  readonly staleInfo = signal<{ date: string; days: number } | null>(null);

  readonly todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  ngOnInit() {
    try {
      const t = localStorage.getItem('air.theme') as Theme | null;
      const initial: Theme = t === 'dark' ? 'dark' : 'light';
      this.theme.set(initial);
      this.applyTheme(initial);
    } catch { /* ignore */ }

    try {
      const c = localStorage.getItem(STORAGE_KEY_SIDEBAR);
      if (c === '1') this.sidebarCollapsed.set(true);
    } catch { /* ignore */ }

    this.checkFreshness();
  }

  private checkFreshness() {
    this.data.loadReportsIndex().then(idx => {
      const newest = idx.entries
        .filter(e => e.cadence === 'daily' && !e.is_versioned)
        .map(e => e.date_id)
        .sort()
        .pop();
      if (!newest) return;
      const newestMs = new Date(newest + 'T00:00:00').getTime();
      const todayMs = new Date(new Date().toDateString()).getTime();
      const days = Math.round((todayMs - newestMs) / 86_400_000);
      if (days >= 2) this.staleInfo.set({ date: newest, days });
    }).catch(() => { /* index unreachable — page-level error states cover it */ });
  }

  toggleTheme() {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    this.applyTheme(next);
    try { localStorage.setItem('air.theme', next); } catch { /* ignore */ }
  }

  toggleSidebar() {
    const next = !this.sidebarCollapsed();
    this.sidebarCollapsed.set(next);
    try { localStorage.setItem(STORAGE_KEY_SIDEBAR, next ? '1' : '0'); } catch { /* ignore */ }
  }

  private applyTheme(t: Theme) {
    if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
  }
}
