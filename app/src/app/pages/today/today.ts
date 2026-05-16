import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Skeleton } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';

import { DataService, ReportEntry, RadarDay } from '../../services/data.service';
import { PageHeader } from '../../components/page-header/page-header';
import { StatCard } from '../../components/stat-card/stat-card';
import { ArticleCards } from '../../components/article-cards/article-cards';
import { MaturityBadge } from '../../components/maturity-badge/maturity-badge';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [RouterLink, DecimalPipe, FormsModule, Skeleton, ButtonModule, DatePicker, PageHeader, StatCard, MaturityBadge, ArticleCards],
  templateUrl: './today.html',
  styleUrl: './today.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodayPage {
  private readonly data = inject(DataService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly dailies = signal<ReportEntry[]>([]);
  readonly selectedDate = signal<string | null>(null);
  readonly markdown = signal<string>('');
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  // KPI + Stories data — follows the selected date
  readonly radarDay = signal<RadarDay | null>(null);
  readonly radarHistory = signal<RadarDay[]>([]);
  private readonly radarEntries = signal<{ date_id: string; json_path: string; is_versioned: boolean }[]>([]);

  readonly stageShifts = computed(() => {
    const d = this.radarDay();
    if (!d) return [];
    return (d.stage_movements ?? []).map(m => ({
      topic: m.topic,
      from: m.from ?? 'new',
      to: m.to,
      reason: m.reason
    }));
  });

  readonly stories = computed(() => {
    const d = this.radarDay();
    const hist = this.radarHistory();
    if (!d) return [];
    const clusters = d.topic_clusters ?? [];
    return clusters
      .map(c => {
        const ids = new Set(c.topic_ids);
        const topics = d.topics.filter(t => ids.has(t.id))
          .sort((a, b) => b.score_fast - a.score_fast);
        const firmCount = new Map<string, number>();
        for (const t of topics) {
          for (const o of t.breadth_orgs_7d ?? []) {
            firmCount.set(o, (firmCount.get(o) ?? 0) + 1);
          }
        }
        const topFirms = Array.from(firmCount.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([slug]) => slug);
        const spark = hist.map(day =>
          (day.topic_clusters ?? []).find(x => x.id === c.id)?.cluster_score_fast ?? 0
        );
        return {
          cluster: c,
          delta: c.cluster_score_fast - c.cluster_score_slow,
          topics,
          topFirms,
          spark,
          sectors: Array.from(new Set(topics.map(t => t.sector)))
        };
      })
      .sort((a, b) => b.delta - a.delta)
      .slice(0, 6);
  });

  sparkPath(values: number[], w = 120, h = 28): string {
    if (values.length < 2) return '';
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = Math.max(1, max - min);
    const step = w / (values.length - 1);
    return values.map((v, i) => {
      const x = (i * step).toFixed(1);
      const y = (h - ((v - min) / range) * (h - 4) - 2).toFixed(1);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');
  }

  readonly kpis = computed(() => {
    const d = this.radarDay();
    const hist = this.radarHistory();
    if (!d) return null;
    const surging = d.topics.filter(t => t.direction === 'surging').length;
    const rising  = d.topics.filter(t => t.direction === 'rising' || t.direction === 'surging').length;
    const fading  = d.topics.filter(t => t.direction === 'fading').length;
    const breadth = d.topics.filter(t => t.high_breadth).length;
    // sparklines from history (chronological)
    const spark = (key: 'surging' | 'rising' | 'fading' | 'breadth') =>
      hist.map(day => {
        switch (key) {
          case 'surging': return day.topics.filter(t => t.direction === 'surging').length;
          case 'rising':  return day.topics.filter(t => t.direction === 'rising' || t.direction === 'surging').length;
          case 'fading':  return day.topics.filter(t => t.direction === 'fading').length;
          case 'breadth': return day.topics.filter(t => t.high_breadth).length;
        }
      });
    return {
      topics:  { value: d.topics.length,    delta: d.topics.length - (hist[0]?.topics.length ?? d.topics.length), spark: hist.map(h => h.topics.length) },
      surging: { value: surging,            delta: surging - (spark('surging')[0] ?? surging), spark: spark('surging') },
      rising:  { value: rising,             delta: rising  - (spark('rising')[0]  ?? rising),  spark: spark('rising')  },
      breadth: { value: breadth,            delta: breadth - (spark('breadth')[0] ?? breadth), spark: spark('breadth') }
    };
  });

  readonly current = computed(() => {
    const date = this.selectedDate();
    if (!date) return null;
    return this.dailies().find(d => d.date_id === date) ?? null;
  });

  readonly currentIndex = computed(() => {
    const date = this.selectedDate();
    return this.dailies().findIndex(d => d.date_id === date);
  });

  readonly formattedDate = computed(() => {
    const d = this.selectedDate();
    if (!d) return '';
    const parsed = new Date(d + 'T00:00:00');
    return parsed.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  });

  readonly headlineDisplay = computed(() => {
    const c = this.current();
    return c?.headline || "Today's research digest";
  });

  readonly recentList = computed(() => {
    const cur = this.selectedDate();
    return this.dailies()
      .filter(d => d.date_id !== cur)
      .slice(0, 6);
  });

  readonly canPrev = computed(() => this.currentIndex() < this.dailies().length - 1);
  readonly canNext = computed(() => this.currentIndex() > 0);

  // === Date-picker helpers ============================================
  readonly availableDateSet = computed(() => new Set(this.dailies().map(d => d.date_id)));
  readonly selectedDateValue = computed(() => {
    const d = this.selectedDate();
    return d ? new Date(d + 'T00:00:00') : null;
  });
  readonly minDateValue = computed(() => {
    const list = this.dailies();
    return list.length ? new Date(list[list.length - 1].date_id + 'T00:00:00') : null;
  });
  readonly maxDateValue = computed(() => {
    const list = this.dailies();
    return list.length ? new Date(list[0].date_id + 'T00:00:00') : null;
  });

  pickFromCalendar(d: Date | null) {
    if (!d) return;
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (this.availableDateSet().has(iso)) {
      this.selectedDate.set(iso);
    }
  }

  readonly isLatest = computed(() => {
    const list = this.dailies();
    const cur = this.selectedDate();
    return list.length > 0 && cur === list[0].date_id;
  });

  constructor() {
    // Load the radar index once
    this.data.loadRadarIndex().then(idx => {
      this.radarEntries.set(idx.entries.filter(e => !e.is_versioned));
    }).catch(() => { /* radar block is optional */ });

    // Whenever selectedDate changes, fetch the matching radar day + the
    // 14 prior days so KPIs and Stories reflect the chosen edition.
    effect(() => {
      const date = this.selectedDate();
      const entries = this.radarEntries();
      if (!date || !entries.length) return;
      // Find the radar entry whose date_id matches the selected day; if none
      // (radar might be sparser than dailies), fall back to the nearest
      // radar entry on or before that day.
      let idx = entries.findIndex(e => e.date_id === date);
      if (idx < 0) idx = entries.findIndex(e => e.date_id <= date);
      if (idx < 0) idx = 0;
      const entry = entries[idx];
      const windowPaths = entries.slice(idx, idx + 14).map(e => e.json_path);
      this.radarDay.set(null);
      this.radarHistory.set([]);
      Promise.all([
        this.data.loadRadarDay(entry.json_path),
        this.data.loadRadarHistory(windowPaths, 14)
      ]).then(([d, hist]) => {
        // Guard against stale resolution if the user clicked through several dates
        if (this.selectedDate() !== date) return;
        this.radarDay.set(d);
        this.radarHistory.set(hist);
      }).catch(() => { /* KPI block is optional */ });
    });

    this.data.loadReportsIndex().then(idx => {
      const dailies = idx.entries.filter(e => e.cadence === 'daily' && !e.is_versioned);
      this.dailies.set(dailies);
      const routeParam = this.route.snapshot.paramMap.get('date');
      const initial = routeParam ?? dailies[0]?.date_id ?? null;
      this.selectedDate.set(initial);
    }).catch(err => {
      this.error.set(`Couldn't load reports index: ${err.message ?? err}`);
      this.loading.set(false);
    });

    this.route.paramMap.subscribe(params => {
      const d = params.get('date');
      if (d && d !== this.selectedDate()) this.selectedDate.set(d);
    });

    effect(() => {
      const date = this.selectedDate();
      const list = this.dailies();
      if (!date || !list.length) return;
      const entry = list.find(d => d.date_id === date);
      if (!entry) return;
      this.loading.set(true);
      this.markdown.set('');
      this.data.loadMarkdown(entry.path)
        .then(text => { this.markdown.set(text); this.loading.set(false); })
        .catch(err => {
          this.error.set(`Couldn't load ${entry.path}: ${err.message ?? err}`);
          this.loading.set(false);
        });
    });

    effect(() => {
      const date = this.selectedDate();
      if (date && this.route.snapshot.paramMap.get('date') !== date) {
        this.router.navigate(['/today', date], { replaceUrl: !this.route.snapshot.paramMap.get('date') });
      }
    });
  }

  prev() {
    const list = this.dailies();
    const i = this.currentIndex();
    if (i < list.length - 1) this.selectedDate.set(list[i + 1].date_id);
  }

  next() {
    const list = this.dailies();
    const i = this.currentIndex();
    if (i > 0) this.selectedDate.set(list[i - 1].date_id);
  }
}
