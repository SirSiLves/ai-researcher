import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

type Theme = 'dark' | 'light';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  readonly tabs = [
    { path: '/today',   label: 'Today'   },
    { path: '/trends',  label: 'Trends'  },
    { path: '/firms',   label: 'Firms'   },
    { path: '/reports', label: 'Reports' }
  ];

  readonly theme = signal<Theme>('light');
  readonly year = new Date().getFullYear();

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
}
