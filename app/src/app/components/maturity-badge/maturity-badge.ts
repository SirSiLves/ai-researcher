import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const PIPELINE_LAUNCH = '2026-05-04';

interface WindowStatus {
  label: string;
  status: 'cold' | 'warming' | 'warm';
}

@Component({
  selector: 'app-maturity-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="maturity" [class.maturity--compact]="compact()">
      <span class="maturity__age">
        <strong class="tabular">{{ ageDays() }}</strong>
        <span class="maturity__age-label">day{{ ageDays() === 1 ? '' : 's' }} of data</span>
      </span>
      <ul class="maturity__windows">
        @for (w of windows(); track w.label) {
          <li class="maturity__window" [attr.data-status]="w.status">
            <span class="maturity__window-label">{{ w.label }}</span>
            <span class="maturity__window-status">{{ w.status }}</span>
          </li>
        }
      </ul>
    </div>
  `,
  styles: [`
    :host { display: inline-block; }
    .maturity {
      display: inline-flex;
      align-items: center;
      gap: 1rem;
      padding: 0.45rem 0.85rem;
      background: var(--bg-soft);
      border: 1px solid var(--line);
      border-radius: var(--radius-sm);
      font-size: 0.78rem;
      color: var(--fg-3);
      flex-wrap: wrap;
    }
    .maturity--compact {
      padding: 0.25rem 0.55rem;
      gap: 0.5rem;
      font-size: 0.72rem;
    }
    .maturity__age {
      display: inline-flex;
      align-items: baseline;
      gap: 0.35rem;
    }
    .maturity__age strong { font-size: 0.95rem; color: var(--fg); font-weight: 600; }
    .maturity__age-label {
      font-family: var(--sans);
      letter-spacing: 0.06em;
      text-transform: uppercase;
      font-size: 0.62rem;
      color: var(--fg-4);
    }
    .maturity__windows {
      list-style: none;
      padding: 0;
      margin: 0;
      display: inline-flex;
      gap: 0.5rem;
    }
    .maturity__window {
      display: inline-flex;
      align-items: baseline;
      gap: 0.3rem;
      padding: 0.1rem 0.45rem;
      border-radius: 2px;
      font-family: var(--mono);
      letter-spacing: 0.02em;
      font-size: 0.72rem;
    }
    .maturity__window[data-status="warm"] {
      background: var(--accent-soft);
      color: var(--accent-strong);
    }
    .maturity__window[data-status="warming"] {
      background: var(--bg-soft-2);
      color: var(--fg-3);
    }
    .maturity__window[data-status="cold"] {
      background: transparent;
      color: var(--fg-5);
      border: 1px dashed var(--line-2);
    }
    .maturity__window-label { font-weight: 600; }
    .maturity__window-status { font-style: italic; }
  `]
})
export class MaturityBadge {
  readonly compact = input<boolean>(false);

  readonly ageDays = computed(() => {
    const launch = new Date(PIPELINE_LAUNCH + 'T00:00:00');
    const now = new Date();
    return Math.max(0, Math.floor((now.getTime() - launch.getTime()) / 86400000));
  });

  readonly windows = computed<WindowStatus[]>(() => {
    const age = this.ageDays();
    return [
      { label: '7d',   status: this.status(age, 6, 10) },
      { label: '30d',  status: this.status(age, 25, 35) },
      { label: '90d',  status: this.status(age, 70, 100) },
      { label: '180d', status: this.status(age, 150, 190) }
    ];
  });

  private status(age: number, warmingAt: number, warmAt: number): 'cold' | 'warming' | 'warm' {
    if (age >= warmAt) return 'warm';
    if (age >= warmingAt) return 'warming';
    return 'cold';
  }
}
