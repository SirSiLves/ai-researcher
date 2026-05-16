import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type Tone = 'accent' | 'success' | 'warn' | 'danger' | 'info' | 'neutral';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stat-card surface surface--hover" [attr.data-tone]="tone()">
      <div class="stat-card__head">
        <span class="stat-card__label">{{ label() }}</span>
        @if (icon(); as ic) {
          <span class="stat-card__icon" [attr.data-tone]="tone()">
            <i class="pi" [class]="'pi-' + ic"></i>
          </span>
        }
      </div>

      <div class="stat-card__row">
        <span class="stat-card__value">{{ value() }}</span>
        @if (delta() != null) {
          <span class="stat-card__delta"
                [class.is-pos]="(delta()!) > 0"
                [class.is-neg]="(delta()!) < 0"
                [class.is-zero]="(delta()!) === 0">
            @if ((delta()!) > 0) { <i class="pi pi-arrow-up-right"></i> }
            @else if ((delta()!) < 0) { <i class="pi pi-arrow-down-right"></i> }
            @else { · }
            {{ deltaLabel() }}
          </span>
        }
      </div>

      @if (sparkline().length > 1) {
        <svg viewBox="0 0 120 36" preserveAspectRatio="none" class="stat-card__spark" aria-hidden="true">
          <defs>
            <linearGradient [attr.id]="gradId()" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   [attr.stop-color]="strokeColor()" stop-opacity="0.25"></stop>
              <stop offset="100%" [attr.stop-color]="strokeColor()" stop-opacity="0"></stop>
            </linearGradient>
          </defs>
          <path class="stat-card__area"   [attr.d]="areaPath()"    [attr.fill]="'url(#' + gradId() + ')'" stroke="none" />
          <path class="stat-card__stroke" [attr.d]="strokePath()"  [attr.stroke]="strokeColor()" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          @if (lastPoint(); as p) {
            <circle [attr.cx]="p.x" [attr.cy]="p.y" r="2" [attr.fill]="strokeColor()" />
          }
        </svg>
      } @else if (hint()) {
        <span class="stat-card__hint">{{ hint() }}</span>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .stat-card {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      min-height: 132px;
      padding: 1.1rem 1.25rem 0.85rem;
      position: relative;
      overflow: hidden;
    }
    .stat-card__head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.5rem;
    }
    .stat-card__label {
      font-family: var(--sans);
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--fg-4);
    }
    .stat-card__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      font-size: 0.9rem;
      background: color-mix(in srgb, var(--accent) 12%, transparent);
      color: var(--accent-strong);
    }
    .stat-card__icon[data-tone="success"] { background: color-mix(in srgb, var(--pos) 14%, transparent); color: var(--pos-text); }
    .stat-card__icon[data-tone="warn"]    { background: color-mix(in srgb, var(--warn) 16%, transparent); color: var(--warn-text); }
    .stat-card__icon[data-tone="danger"]  { background: color-mix(in srgb, var(--neg) 14%, transparent); color: var(--neg-text); }
    .stat-card__icon[data-tone="info"]    { background: color-mix(in srgb, var(--info) 14%, transparent); color: var(--info-text); }
    .stat-card__icon[data-tone="neutral"] { background: var(--bg-soft-2); color: var(--fg-3); }

    .stat-card__row {
      display: flex;
      align-items: baseline;
      gap: 0.6rem;
      flex-wrap: wrap;
    }
    .stat-card__value {
      font-family: var(--sans);
      font-size: 1.85rem;
      font-weight: 600;
      letter-spacing: -0.025em;
      color: var(--fg);
      line-height: 1;
      font-variant-numeric: tabular-nums;
      font-feature-settings: "cv11", "ss01";
    }
    .stat-card__delta {
      display: inline-flex;
      align-items: center;
      gap: 0.2rem;
      padding: 2px 8px;
      border-radius: 999px;
      font-family: var(--sans);
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--fg-3);
      background: var(--bg-soft-2);
      letter-spacing: -0.005em;
    }
    .stat-card__delta i { font-size: 0.7rem; }
    .stat-card__delta.is-pos {
      background: color-mix(in srgb, var(--pos) 14%, transparent);
      color: var(--pos-text);
    }
    .stat-card__delta.is-neg {
      background: color-mix(in srgb, var(--neg) 14%, transparent);
      color: var(--neg-text);
    }

    .stat-card__hint {
      font-size: 0.78rem;
      color: var(--fg-4);
      line-height: 1.4;
      margin-top: -0.1rem;
    }

    .stat-card__spark {
      width: 100%;
      height: 36px;
      display: block;
      margin-top: auto;
    }
  `]
})
export class StatCard {
  readonly label = input.required<string>();
  readonly value = input.required<string | number>();
  readonly icon = input<string>('chart-line');
  readonly tone = input<Tone>('accent');
  readonly delta = input<number | null>(null);
  readonly deltaSuffix = input<string>('');
  readonly hint = input<string>('');
  readonly sparkline = input<number[]>([]);

  // Stable id for the SVG gradient
  private readonly _id = `sc-${Math.random().toString(36).slice(2, 9)}`;

  readonly gradId = computed(() => this._id);

  readonly strokeColor = computed(() => {
    const tone = this.tone();
    switch (tone) {
      case 'success': return 'var(--pos)';
      case 'warn':    return 'var(--warn)';
      case 'danger':  return 'var(--neg)';
      case 'info':    return 'var(--info)';
      case 'neutral': return 'var(--fg-4)';
      default:        return 'var(--accent)';
    }
  });

  readonly deltaLabel = computed(() => {
    const d = this.delta();
    if (d == null) return '';
    const sign = d > 0 ? '+' : '';
    return `${sign}${d}${this.deltaSuffix()}`;
  });

  // Geometry helpers ------------------------------------------------------
  private readonly W = 120;
  private readonly H = 36;
  private readonly PAD = 2;

  private points = computed<Array<{ x: number; y: number }>>(() => {
    const data = this.sparkline();
    if (data.length < 2) return [];
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = Math.max(1, max - min);
    const step = (this.W) / (data.length - 1);
    const usable = this.H - this.PAD * 2;
    return data.map((v, i) => ({
      x: +(i * step).toFixed(2),
      y: +(this.PAD + (1 - (v - min) / range) * usable).toFixed(2)
    }));
  });

  readonly strokePath = computed(() => {
    const pts = this.points();
    if (!pts.length) return '';
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  });

  readonly areaPath = computed(() => {
    const pts = this.points();
    if (!pts.length) return '';
    const start = `M${pts[0].x},${this.H}`;
    const line = pts.map(p => `L${p.x},${p.y}`).join(' ');
    const end = `L${pts[pts.length - 1].x},${this.H} Z`;
    return `${start} ${line} ${end}`;
  });

  readonly lastPoint = computed(() => {
    const pts = this.points();
    return pts.length ? pts[pts.length - 1] : null;
  });
}
