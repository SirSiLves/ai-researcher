import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, viewChild } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
import { Popover } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';

import { DataService, RadarDay } from '../../services/data.service';
import { StatCard } from '../stat-card/stat-card';

interface SeriesPoint {
  date: string;
  topics: number;
  surging: number;
  rising: number;
  breadth: number;
}

@Component({
  selector: 'app-trend-summary',
  standalone: true,
  imports: [Skeleton, Popover, ButtonModule, StatCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <div class="trend-summary__skeleton">
        <p-skeleton width="100%" height="9rem"></p-skeleton>
        <p-skeleton width="100%" height="14rem"></p-skeleton>
      </div>
    } @else if (series().length > 1) {
      <div class="trend-summary">
        <div class="trend-summary__kpis">
          <app-stat-card label="Topics tracked"
                         [value]="latest().topics"
                         icon="compass"
                         tone="accent"
                         [delta]="latest().topics - first().topics"
                         [sparkline]="seriesArray('topics')" />
          <app-stat-card label="Surging"
                         [value]="latest().surging"
                         icon="bolt"
                         tone="success"
                         [delta]="latest().surging - first().surging"
                         [sparkline]="seriesArray('surging')" />
          <app-stat-card label="Rising direction"
                         [value]="latest().rising"
                         icon="arrow-up-right"
                         tone="info"
                         [delta]="latest().rising - first().rising"
                         [sparkline]="seriesArray('rising')" />
          <app-stat-card label="High breadth"
                         [value]="latest().breadth"
                         icon="users"
                         tone="warn"
                         [delta]="latest().breadth - first().breadth"
                         [sparkline]="seriesArray('breadth')" />
        </div>

        <section class="surface trend-summary__chart-card">
          <header class="trend-summary__head">
            <div>
              <h2 class="trend-summary__title">{{ title() }}</h2>
              <p class="trend-summary__deck muted">
                {{ series().length }} radar snapshot{{ series().length === 1 ? '' : 's' }} ·
                {{ series()[0].date }} → {{ series()[series().length - 1].date }}
              </p>
            </div>
            <div class="trend-summary__legend-row">
              <ul class="trend-summary__legend">
                <li><span class="trend-summary__swatch trend-summary__swatch--surging"></span> surging</li>
                <li><span class="trend-summary__swatch trend-summary__swatch--rising"></span> rising</li>
                <li><span class="trend-summary__swatch trend-summary__swatch--breadth"></span> high breadth</li>
              </ul>
              <button pButton type="button" text rounded size="small"
                      class="trend-summary__help"
                      (click)="glossary.toggle($event)"
                      aria-label="Signal definitions">
                <i class="pi pi-question-circle"></i>
              </button>
              <p-popover #glossary appendTo="body" styleClass="trend-summary__pop">
                <div class="trend-summary__glossary">
                  <h3>Signal definitions</h3>
                  <p class="muted">From the radar's dual-EMA model. Fast EMA tracks the last few days; slow EMA tracks the rolling baseline.</p>
                  <dl>
                    <dt><span class="trend-summary__swatch trend-summary__swatch--surging"></span> Surging</dt>
                    <dd>Fast EMA ≥ <strong>1.5×</strong> slow EMA. Today's news spike on this topic.</dd>

                    <dt><span class="trend-summary__swatch trend-summary__swatch--rising"></span> Rising</dt>
                    <dd>Fast EMA between <strong>1.15×</strong> and 1.5× slow EMA. Trending up, not exploding. (The chart's <em>rising</em> line includes surging.)</dd>

                    <dt>Steady</dt>
                    <dd>Fast within ±15% of slow. Noise floor.</dd>

                    <dt>Fading</dt>
                    <dd>Fast EMA < <strong>0.85×</strong> slow EMA. Topic cooling.</dd>

                    <dt><span class="trend-summary__swatch trend-summary__swatch--breadth"></span> High breadth</dt>
                    <dd>Independent of speed. Counts topics where ≥ <strong>8 distinct orgs</strong> mentioned it in 7 days. The cross-source convergence signal — many different sources are pointing at the same thing.</dd>
                  </dl>
                </div>
              </p-popover>
            </div>
          </header>
          <svg viewBox="0 0 600 160" preserveAspectRatio="none" class="trend-summary__svg" aria-hidden="true">
            <defs>
              <linearGradient id="trendSurgGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--pos)" stop-opacity="0.18"></stop>
                <stop offset="100%" stop-color="var(--pos)" stop-opacity="0"></stop>
              </linearGradient>
            </defs>
            <path [attr.d]="areaPath('surging')" fill="url(#trendSurgGrad)" stroke="none" />
            <path [attr.d]="linePath('surging')" stroke="var(--pos)" stroke-width="1.75" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            <path [attr.d]="linePath('rising')"  stroke="var(--accent)" stroke-width="1.75" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            <path [attr.d]="linePath('breadth')" stroke="var(--warn)" stroke-width="1.5"  fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 2" />
          </svg>
          <div class="trend-summary__axis tabular">
            <span>{{ series()[0].date }}</span>
            <span>{{ series()[series().length - 1].date }}</span>
          </div>
        </section>
      </div>
    } @else if (!loading() && series().length <= 1) {
      <p class="trend-summary__empty muted">No radar coverage for this period yet.</p>
    }
  `,
  styles: [`
    :host { display: block; }
    .trend-summary { display: flex; flex-direction: column; gap: 1rem; }
    .trend-summary__skeleton { display: flex; flex-direction: column; gap: 1rem; }
    .trend-summary__kpis {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1rem;
    }
    @media (max-width: 980px) {
      .trend-summary__kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 540px) {
      .trend-summary__kpis { grid-template-columns: 1fr; }
    }
    .trend-summary__chart-card { display: flex; flex-direction: column; gap: 0.85rem; }
    .trend-summary__head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      padding-bottom: 0.55rem;
      border-bottom: 1px solid var(--hairline);
    }
    .trend-summary__title {
      margin: 0;
      font-size: 1.05rem;
      font-weight: 600;
      letter-spacing: -0.018em;
      color: var(--fg);
    }
    .trend-summary__deck { margin: 0.25rem 0 0; font-size: 0.85rem; }
    .trend-summary__legend-row {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    .trend-summary__legend {
      list-style: none;
      margin: 0;
      padding: 0;
      display: inline-flex;
      gap: 1rem;
      font-size: 0.78rem;
      color: var(--fg-3);
    }
    .trend-summary__help {
      width: 1.6rem;
      height: 1.6rem;
      color: var(--fg-4);
    }
    .trend-summary__help:hover { color: var(--fg); }
    :host ::ng-deep .trend-summary__pop.p-popover {
      max-width: 28rem;
    }
    :host ::ng-deep .trend-summary__pop .p-popover-content {
      padding: 1.1rem 1.25rem;
    }
    .trend-summary__glossary h3 {
      margin: 0 0 0.4rem;
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: -0.012em;
    }
    .trend-summary__glossary > p {
      margin: 0 0 0.85rem;
      font-size: 0.82rem;
      line-height: 1.45;
    }
    .trend-summary__glossary dl {
      display: grid;
      grid-template-columns: 7rem 1fr;
      gap: 0.55rem 1rem;
      margin: 0;
      font-size: 0.82rem;
      line-height: 1.45;
    }
    .trend-summary__glossary dt {
      font-weight: 600;
      color: var(--fg);
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }
    .trend-summary__glossary dd { margin: 0; color: var(--fg-2); }
    .trend-summary__glossary strong { color: var(--fg); font-weight: 600; }
    .trend-summary__swatch {
      display: inline-block;
      width: 0.85rem;
      height: 0.2rem;
      vertical-align: middle;
      margin-right: 0.35rem;
    }
    .trend-summary__swatch--surging { background: var(--pos); }
    .trend-summary__swatch--rising  { background: var(--accent); }
    .trend-summary__swatch--breadth { background: var(--warn); }
    .trend-summary__svg {
      width: 100%;
      height: 200px;
      display: block;
    }
    .trend-summary__axis {
      display: flex;
      justify-content: space-between;
      font-size: 0.74rem;
      color: var(--fg-4);
    }
    .trend-summary__empty {
      padding: 1.5rem 0;
      text-align: center;
      font-size: 0.9rem;
    }
  `]
})
export class TrendSummary {
  private readonly data = inject(DataService);

  /** Anchor date for the window — usually the latest day in the window. */
  readonly anchor = input<string | null>(null);
  /** Inclusive number of days to load ending at the anchor. */
  readonly days   = input<number>(7);
  /** Title shown in the chart card header. */
  readonly title  = input<string>('Momentum');

  readonly loading = signal<boolean>(true);
  readonly history = signal<RadarDay[]>([]);

  constructor() {
    effect(() => {
      const a = this.anchor();
      const d = this.days();
      if (!a) { this.loading.set(true); return; }
      this.loading.set(true);
      this.data.loadRadarIndex().then(idx => {
        const entries = idx.entries.filter(e => !e.is_versioned);
        // Find the radar entry whose date_id <= anchor (closest in the past or equal).
        let i = entries.findIndex(e => e.date_id === a);
        if (i < 0) i = entries.findIndex(e => e.date_id <= a);
        if (i < 0) i = 0;
        const windowPaths = entries.slice(i, i + d).map(e => e.json_path);
        return this.data.loadRadarHistory(windowPaths, d).then(hist => {
          if (this.anchor() !== a) return;
          this.history.set(hist);
          this.loading.set(false);
        });
      }).catch(() => {
        this.history.set([]);
        this.loading.set(false);
      });
    });
  }

  readonly series = computed<SeriesPoint[]>(() => {
    return this.history().map(d => ({
      date: d.date,
      topics: d.topics.length,
      surging: d.topics.filter(t => t.direction === 'surging').length,
      rising:  d.topics.filter(t => t.direction === 'rising' || t.direction === 'surging').length,
      breadth: d.topics.filter(t => t.high_breadth).length
    }));
  });

  readonly first = computed(() => this.series()[0] ?? { date: '', topics: 0, surging: 0, rising: 0, breadth: 0 });
  readonly latest = computed(() => this.series()[this.series().length - 1] ?? { date: '', topics: 0, surging: 0, rising: 0, breadth: 0 });

  seriesArray(key: 'topics' | 'surging' | 'rising' | 'breadth'): number[] {
    return this.series().map(p => p[key]);
  }

  linePath(key: 'topics' | 'surging' | 'rising' | 'breadth'): string {
    return this.pointsPath(this.seriesArray(key));
  }

  areaPath(key: 'topics' | 'surging' | 'rising' | 'breadth'): string {
    const stroke = this.pointsPath(this.seriesArray(key));
    if (!stroke) return '';
    return `${stroke} L600,160 L0,160 Z`;
  }

  private pointsPath(values: number[]): string {
    if (values.length < 2) return '';
    const w = 600, h = 160, pad = 4;
    const max = Math.max(1, ...values);
    const step = w / (values.length - 1);
    return values.map((v, i) => {
      const x = (i * step).toFixed(1);
      const y = (h - pad - (v / max) * (h - pad * 2)).toFixed(1);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');
  }
}
