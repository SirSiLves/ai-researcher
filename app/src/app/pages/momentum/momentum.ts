import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Skeleton } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';

import { DataService, RadarDay, RadarTopic, ReportEntry } from '../../services/data.service';
import { TrendSummary } from '../../components/trend-summary/trend-summary';
import { MarkdownViewer } from '../../components/markdown-viewer/markdown-viewer';

type Window = '7d' | '30d' | '90d';

interface Mover {
  topic: RadarTopic;
  scoreNow: number;
  scoreThen: number;
  delta: number;
  pctDelta: number;
  trend: number[];
  sector: string;
}

const WINDOW_DAYS: Record<Window, number> = { '7d': 7, '30d': 30, '90d': 90 };

@Component({
  selector: 'app-momentum',
  standalone: true,
  imports: [DecimalPipe, Skeleton, ButtonModule, TrendSummary, MarkdownViewer],
  templateUrl: './momentum.html',
  styleUrl: './momentum.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MomentumPage {
  private readonly data = inject(DataService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  // Expose JS globals for the template
  readonly Math = Math;

  readonly window = signal<Window>('7d');
  readonly windows: Window[] = ['7d', '30d', '90d'];
  readonly latestRadarDate = signal<string | null>(null);
  readonly history = signal<RadarDay[]>([]);
  readonly loading = signal<boolean>(true);
  readonly direction = signal<'rising' | 'falling' | 'all'>('all');

  readonly windowDays = computed(() => WINDOW_DAYS[this.window()]);

  /** Weekly markdown (in 7d view) or monthly markdown (in 30d/90d view). */
  readonly companionMarkdown = signal<string>('');
  readonly companionMeta = signal<{ label: string; date_id: string; cadence: string } | null>(null);
  readonly showCompanion = signal<boolean>(false);

  /** Pre-index history: Map<topicId, score_fast[]> aligned to history order.
   *  Built once per history change — replaces O(W·T) per-row lookups. */
  private readonly historyIndex = computed<{ days: number; byId: Map<string, number[]> }>(() => {
    const hist = this.history();
    const byId = new Map<string, number[]>();
    const W = hist.length;
    for (let i = 0; i < W; i++) {
      for (const t of hist[i].topics) {
        let arr = byId.get(t.id);
        if (!arr) { arr = new Array(W).fill(0); byId.set(t.id, arr); }
        arr[i] = t.score_fast ?? 0;
      }
    }
    return { days: W, byId };
  });

  // Movers — topics ranked by Δscore (today − N days ago).
  readonly movers = computed<Mover[]>(() => {
    const hist = this.history();
    if (hist.length < 2) return [];
    const today = hist[hist.length - 1];
    const then = hist[0];
    const thenById = new Map(then.topics.map(t => [t.id, t]));
    const { byId } = this.historyIndex();

    const out: Mover[] = [];
    for (const t of today.topics) {
      const past = thenById.get(t.id);
      const scoreNow = t.score_fast ?? 0;
      const scoreThen = past?.score_fast ?? 0;
      const delta = scoreNow - scoreThen;
      const pctDelta = scoreThen > 0 ? (delta / scoreThen) * 100 : (scoreNow > 0 ? 100 : 0);
      const trend = byId.get(t.id) ?? [];
      out.push({
        topic: t,
        scoreNow,
        scoreThen,
        delta,
        pctDelta,
        trend,
        sector: t.sector
      });
    }

    const dir = this.direction();
    let filtered = out;
    if (dir === 'rising') filtered = out.filter(m => m.delta > 0);
    else if (dir === 'falling') filtered = out.filter(m => m.delta < 0);

    filtered.sort((a, b) => {
      if (dir === 'falling') return a.delta - b.delta;
      return b.delta - a.delta;
    });
    return filtered.slice(0, 20);
  });

  readonly windowLabel = computed(() => {
    switch (this.window()) {
      case '7d':  return 'Last 7 days · This week';
      case '30d': return 'Last 30 days · This month';
      case '90d': return 'Last 90 days · This quarter';
    }
  });

  pickWindow(w: Window) {
    this.window.set(w);
    this.router.navigate(['/momentum', w], { replaceUrl: true });
  }

  toggleDirection(d: 'rising' | 'falling' | 'all') {
    this.direction.set(d);
  }

  goToTopic(t: RadarTopic) {
    this.router.navigate(['/map/topic', t.id]);
  }

  trendPath(values: number[], w = 120, h = 28): string {
    if (values.length < 2) return '';
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = Math.max(0.01, max - min);
    const step = w / (values.length - 1);
    return values.map((v, i) => {
      const x = (i * step).toFixed(1);
      const y = (h - ((v - min) / range) * (h - 4) - 2).toFixed(1);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');
  }

  constructor() {
    // ─ Sync window from URL on init ─
    const wParam = this.route.snapshot.paramMap.get('window');
    if (wParam === '7d' || wParam === '30d' || wParam === '90d') {
      this.window.set(wParam);
    }

    // ─ Load radar history when window changes ─
    effect(() => {
      const w = this.window();
      const days = WINDOW_DAYS[w];
      this.loading.set(true);
      this.data.loadRadarIndex().then(idx => {
        const entries = idx.entries.filter(e => !e.is_versioned);
        if (!entries.length) return;
        const latest = entries[0].date_id;
        this.latestRadarDate.set(latest);
        const windowPaths = entries.slice(0, days).map(e => e.json_path);
        return this.data.loadRadarHistory(windowPaths, days).then(h => {
          this.history.set(h);
          this.loading.set(false);
        });
      }).catch(() => {
        this.loading.set(false);
      });
    });

    // ─ Load companion markdown (weekly for 7d, monthly otherwise) ─
    effect(() => {
      const w = this.window();
      this.data.loadReportsIndex().then(idx => {
        if (w === '7d') {
          const weekly = idx.entries.find(e => e.cadence === 'weekly' && !e.is_versioned);
          if (weekly) {
            this.companionMeta.set({ label: 'This week · ' + weekly.date_id, date_id: weekly.date_id, cadence: 'weekly' });
            this.data.loadMarkdown(weekly.path).then(md => this.companionMarkdown.set(md));
            return;
          }
        } else {
          const monthly = idx.entries.find(e => e.cadence === 'monthly' && !e.is_versioned);
          if (monthly) {
            this.companionMeta.set({ label: 'This month · ' + monthly.date_id, date_id: monthly.date_id, cadence: 'monthly' });
            this.data.loadMarkdown(monthly.path).then(md => this.companionMarkdown.set(md));
            return;
          }
        }
        this.companionMeta.set(null);
        this.companionMarkdown.set('');
      }).catch(() => {});
    });
  }
}
