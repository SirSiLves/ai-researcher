import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [Breadcrumb],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-breadcrumb [model]="model()" [home]="home" class="page-header__crumbs" />
    <header class="page-header__bar">
      <div class="page-header__main">
        <h1 class="page-header__title">{{ title() }}</h1>
        @if (subtitle()) { <p class="page-header__subtitle">{{ subtitle() }}</p> }
      </div>
      <div class="page-header__actions">
        <ng-content />
      </div>
    </header>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .page-header__bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
      min-height: 56px;
      padding: 1rem 1.25rem;
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-card);
    }
    .page-header__main { min-width: 0; }
    .page-header__title {
      margin: 0;
      font-family: var(--sans);
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.018em;
      line-height: 1.25;
      color: var(--fg);
    }
    .page-header__subtitle {
      margin: 0.35rem 0 0;
      font-size: 0.88rem;
      color: var(--fg-3);
      line-height: 1.5;
    }
    .page-header__actions {
      display: inline-flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    :host ::ng-deep .page-header__crumbs.p-breadcrumb {
      background: transparent;
      border: 0;
      padding: 0;
    }
  `]
})
export class PageHeader {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly model = input<MenuItem[]>([]);
  readonly home: MenuItem = { icon: 'pi pi-home', routerLink: '/today' };
}
