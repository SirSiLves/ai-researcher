import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  input,
  OnDestroy,
  viewChild
} from '@angular/core';
import {
  Chart,
  BubbleController,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

import { RadarTopic } from '../../services/data.service';

Chart.register(BubbleController, LinearScale, PointElement, Tooltip, Legend);

interface TopicPoint {
  x: number;
  y: number;
  r: number;
  topic: RadarTopic;
}

const FONT = '"Inter", system-ui, sans-serif';

function readVar(name: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function hexToRgba(hex: string, alpha: number): string {
  if (hex.startsWith('rgb')) return hex;
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function sectorColor(i: number): { fill: string; stroke: string } {
  const slot = (i % 4) + 1;
  const c = readVar(`--sector-${slot}`, '#888');
  return { fill: hexToRgba(c, 0.22), stroke: c };
}

@Component({
  selector: 'app-radar-chart',
  imports: [],
  templateUrl: './radar-chart.html',
  styleUrl: './radar-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadarChart implements AfterViewInit, OnDestroy {
  readonly topics = input.required<RadarTopic[]>();
  readonly hostRef = inject(ElementRef);

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private chart: Chart | null = null;
  private themeObserver: MutationObserver | null = null;

  constructor() {
    effect(() => {
      const data = this.topics();
      if (this.chart) this.renderTo(this.chart, data);
    });
  }

  ngAfterViewInit(): void {
    const ctx = this.canvas().nativeElement.getContext('2d');
    if (!ctx) return;

    const palette = this.palette();
    this.chart = new Chart(ctx, {
      type: 'bubble',
      data: { datasets: [] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 220 },
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: '7-day momentum (%)',
              color: palette.axis,
              font: { weight: 600, family: FONT, size: 11 }
            },
            grid: { color: palette.grid, lineWidth: 1 },
            border: { color: palette.grid },
            ticks: {
              color: palette.tick,
              callback: v => `${v}`,
              font: { family: FONT, size: 11 }
            }
          },
          y: {
            type: 'linear',
            title: {
              display: true,
              text: 'Sustained days',
              color: palette.axis,
              font: { weight: 600, family: FONT, size: 11 }
            },
            grid: { color: palette.grid, lineWidth: 1 },
            border: { color: palette.grid },
            ticks: { color: palette.tick, stepSize: 1, precision: 0, font: { family: FONT, size: 11 } },
            min: 0
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            align: 'start',
            labels: {
              color: palette.legend,
              usePointStyle: true,
              boxWidth: 8,
              boxHeight: 8,
              padding: 12,
              font: { family: FONT, size: 11, weight: 500 }
            }
          },
          tooltip: {
            backgroundColor: palette.tipBg,
            borderColor: palette.tipBorder,
            borderWidth: 1,
            titleColor: palette.tipFg,
            bodyColor: palette.tipFg,
            titleFont: { family: FONT, weight: 700, size: 13 },
            bodyFont:  { family: FONT, size: 12 },
            padding: 12,
            cornerRadius: 4,
            displayColors: false,
            callbacks: {
              title: items => (items[0]?.raw as TopicPoint)?.topic?.label ?? '',
              label: item => {
                const p = item.raw as TopicPoint;
                const t = p.topic;
                return [
                  `Sector: ${t.sector}`,
                  `Stage: ${t.stage}`,
                  `7d momentum: ${t.momentum_7d_pct.toFixed(1)}%`,
                  `Sustained: ${t.sustained_days}d`,
                  `Breadth: ${t.breadth_7d}${t.high_breadth ? ' (high)' : ''}`,
                  `Score: ${t.score.toFixed(1)}`
                ];
              }
            }
          }
        }
      }
    });
    this.renderTo(this.chart, this.topics());

    this.themeObserver = new MutationObserver(() => this.applyThemeAndRender());
    this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  private palette() {
    return {
      grid:      readVar('--line', '#e7e3dc'),
      tick:      readVar('--fg-4', '#8a8580'),
      axis:      readVar('--fg-3', '#585858'),
      legend:    readVar('--fg-2', '#2e2e2e'),
      tipBg:     readVar('--fg', '#1a1a1a'),
      tipFg:     '#ffffff',
      tipBorder: readVar('--fg', '#1a1a1a')
    };
  }

  private applyThemeAndRender() {
    if (!this.chart) return;
    const p = this.palette();
    const x: any = this.chart.options.scales?.['x'];
    const y: any = this.chart.options.scales?.['y'];
    if (x?.title)  x.title.color = p.axis;
    if (y?.title)  y.title.color = p.axis;
    if (x?.grid)   x.grid.color  = p.grid;
    if (y?.grid)   y.grid.color  = p.grid;
    if (x?.ticks)  x.ticks.color = p.tick;
    if (y?.ticks)  y.ticks.color = p.tick;
    const legendOpts: any = this.chart.options.plugins?.legend;
    if (legendOpts?.labels) legendOpts.labels.color = p.legend;
    const tip: any = this.chart.options.plugins?.tooltip;
    if (tip) {
      tip.backgroundColor = p.tipBg;
      tip.titleColor = p.tipFg;
      tip.bodyColor = p.tipFg;
      tip.borderColor = p.tipBorder;
    }
    this.renderTo(this.chart, this.topics());
  }

  ngOnDestroy(): void {
    this.themeObserver?.disconnect();
    this.chart?.destroy();
    this.chart = null;
  }

  private renderTo(chart: Chart, topics: RadarTopic[]) {
    const bySector = new Map<string, TopicPoint[]>();
    for (const t of topics) {
      const point: TopicPoint = {
        x: t.momentum_7d_pct,
        y: t.sustained_days,
        r: 5 + Math.min(t.breadth_7d, 14) * 1.1,
        topic: t
      };
      if (!bySector.has(t.sector)) bySector.set(t.sector, []);
      bySector.get(t.sector)!.push(point);
    }
    const datasets = [...bySector.entries()].map(([sector, points], i) => {
      const c = sectorColor(i);
      return {
        label: sector,
        data: points,
        backgroundColor: c.fill,
        borderColor: c.stroke,
        borderWidth: 1.5,
        hoverBorderWidth: 2.5
      };
    });
    chart.data.datasets = datasets;
    chart.update('none');
  }
}
