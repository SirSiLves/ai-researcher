import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

type Theme = 'dark' | 'light';

interface NavTab {
  path: string;
  label: string;
  icon: string;
}

interface NavGroup {
  label: string;
  items: NavTab[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  readonly navGroups: NavGroup[] = [
    {
      label: 'Briefing',
      items: [
        { path: '/today',     label: 'Today',    icon: 'sun' },
        { path: '/week',      label: 'Week',     icon: 'calendar' },
        { path: '/month',     label: 'Month',    icon: 'calendar-times' },
        { path: '/archive',   label: 'Archive',  icon: 'inbox' }
      ]
    },
    {
      label: 'Narrative',
      items: [
        { path: '/stories',   label: 'Stories',  icon: 'sitemap' },
        { path: '/firms',     label: 'Firms',    icon: 'building' }
      ]
    },
    {
      label: 'Deep',
      items: [
        { path: '/radar',     label: 'Topic radar', icon: 'compass' },
        { path: '/sectors',   label: 'Sectors',     icon: 'th-large' },
        { path: '/movements', label: 'Movements',   icon: 'arrows-h' }
      ]
    },
    {
      label: 'System',
      items: [
        { path: '/sweeps',    label: 'Sweeps',   icon: 'sync' },
        { path: '/library',   label: 'Library',  icon: 'book' }
      ]
    }
  ];

  readonly theme = signal<Theme>('light');
  readonly year = new Date().getFullYear();

  readonly todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  readonly todayShort = new Date().toISOString().slice(0, 10);

  readonly volume = String(Math.max(1, new Date().getFullYear() - 2025));
  readonly issue = String(this.isoWeek(new Date())).padStart(2, '0');

  ngOnInit() {
    try {
      const t = localStorage.getItem('air.theme') as Theme | null;
      const initial: Theme = t === 'dark' ? 'dark' : 'light';
      this.theme.set(initial);
      this.applyTheme(initial);
    } catch { /* ignore */ }
  }

  toggleTheme() {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    this.applyTheme(next);
    try { localStorage.setItem('air.theme', next); } catch { /* ignore */ }
  }

  private applyTheme(t: Theme) {
    if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
  }

  private isoWeek(d: Date): number {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const day = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }
}
