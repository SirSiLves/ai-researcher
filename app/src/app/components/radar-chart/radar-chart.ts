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

// Editorial sector palette — muted, paper-friendly (matches CSS vars).
const SECTOR_COLORS: Record<string, { fill: string; stroke: string }> = {
  'Models & capabilities':    { fill: 'rgba(111, 77, 140, 0.55)', stroke: 'rgba(111, 77, 140, 1)' },
  'Agents & infrastructure':  { fill: 'rgba(47, 99, 131, 0.55)',  stroke: 'rgba(47, 99, 131, 1)' },
  'Governance & market':      { fill: 'rgba(154, 106, 35, 0.55)', stroke: 'rgba(154, 106, 35, 1)' },
  'Methods & research':       { fill: 'rgba(45, 107, 58, 0.55)',  stroke: 'rgba(45, 107, 58, 1)' },
};

const FALLBACK = { fill: 'rgba(138, 127, 112, 0.55)', stroke: 'rgba(138, 127, 112, 1)' };

interface TopicPoint {
  x: number;          // momentum_7d_pct
  y: number;          // sustained_days
  r: number;          // bubble radius (derived from breadth_7d)
  topic: RadarTopic;
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

  constructor() {
    effect(() => {
      const data = this.topics();
      if (this.chart) this.renderTo(this.chart, data);
    });
  }

  ngAfterViewInit(): void {
    const ctx = this.canvas().nativeElement.getContext('2d');
    if (!ctx) return;
    this.chart = new Chart(ctx, {
      type: 'bubble',
      data: { datasets: [] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 350 },
        scales: {
          x: {
            type: 'linear',
            title: { display: true, text: '7-day momentum (%)', color: '#6f6557', font: { weight: 500, family: 'Inter, sans-serif', size: 12 } },
            grid: { color: 'rgba(26,22,18,0.05)' },
            ticks: { color: '#8a7f70', callback: v => `${v}%`, font: { family: 'Inter, sans-serif', size: 11 } }
          },
          y: {
            type: 'linear',
            title: { display: true, text: 'Sustained days', color: '#6f6557', font: { weight: 500, family: 'Inter, sans-serif', size: 12 } },
            grid: { color: 'rgba(26,22,18,0.05)' },
            ticks: { color: '#8a7f70', stepSize: 1, precision: 0, font: { family: 'Inter, sans-serif', size: 11 } },
            min: 0
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: { color: '#4a423a', usePointStyle: true, padding: 16, font: { family: 'Inter, sans-serif', size: 12 } }
          },
          tooltip: {
            backgroundColor: '#1a1612',
            titleFont: { family: 'Source Serif 4, Charter, serif', weight: 600, size: 13 },
            bodyFont: { family: 'Inter, sans-serif', size: 12 },
            padding: 10,
            callbacks: {
              title: items => {
                const p = items[0]?.raw as TopicPoint;
                return p?.topic?.label ?? '';
              },
              label: item => {
                const p = item.raw as TopicPoint;
                const t = p.topic;
                return [
                  `Sector: ${t.sector}`,
                  `Stage: ${t.stage}`,
                  `Momentum 7d: ${t.momentum_7d_pct.toFixed(1)}%`,
                  `Sustained: ${t.sustained_days} day${t.sustained_days === 1 ? '' : 's'}`,
                  `Breadth 7d: ${t.breadth_7d}${t.high_breadth ? ' (high)' : ''}`,
                  `Score: ${t.score.toFixed(1)}`
                ];
              }
            }
          }
        }
      }
    });
    this.renderTo(this.chart, this.topics());
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
    this.chart = null;
  }

  private renderTo(chart: Chart, topics: RadarTopic[]) {
    const bySector = new Map<string, TopicPoint[]>();
    for (const t of topics) {
      const point: TopicPoint = {
        x: t.momentum_7d_pct,
        y: t.sustained_days,
        // breadth_7d ranges ~2-12; map to a 6-22 px radius
        r: 6 + Math.min(t.breadth_7d, 14) * 1.2,
        topic: t
      };
      if (!bySector.has(t.sector)) bySector.set(t.sector, []);
      bySector.get(t.sector)!.push(point);
    }
    const datasets = [...bySector.entries()].map(([sector, points]) => {
      const c = SECTOR_COLORS[sector] ?? FALLBACK;
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
