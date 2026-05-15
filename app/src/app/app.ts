import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  readonly tabs = [
    { path: '/today',   label: 'Today' },
    { path: '/trends',  label: 'Trends' },
    { path: '/firms',   label: 'Firms' },
    { path: '/reports', label: 'Reports' }
  ];

  private readonly now = signal(new Date());
  readonly today = computed(() => {
    const d = this.now();
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  });
}
