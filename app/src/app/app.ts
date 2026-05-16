import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';

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
  readonly navTabs: NavTab[] = [
    { path: '/pulse',    label: 'Pulse',    icon: 'wave-pulse', hint: 'Today' },
    { path: '/momentum', label: 'Momentum', icon: 'chart-line', hint: '7d · 30d · 90d' },
    { path: '/map',      label: 'Map',      icon: 'compass',    hint: 'Sectors · Topics · Firms' },
    { path: '/archive',  label: 'Archive',  icon: 'inbox',      hint: 'Everything published' }
  ];

  readonly theme = signal<Theme>('light');
  readonly sidebarCollapsed = signal<boolean>(false);

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
