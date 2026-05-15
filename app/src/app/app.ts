import { ChangeDetectionStrategy, Component } from '@angular/core';
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
    { path: '/today', label: 'Today', icon: 'pi-calendar' },
    { path: '/trends', label: 'Trends', icon: 'pi-chart-line' },
    { path: '/firms', label: 'Firms', icon: 'pi-building' },
    { path: '/reports', label: 'Reports', icon: 'pi-folder' }
  ];
}
