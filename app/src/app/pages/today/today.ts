import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Skeleton } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';

import { DataService, ReportEntry, RadarDay, RadarTopic, TopicCluster } from '../../services/data.service';
import { humanizeSlug } from '../../services/humanize';
import { PulseRadar } from '../../components/pulse-radar/pulse-radar';
import { ArticleCards } from '../../components/article-cards/article-cards';
import { PriorityCards } from '../../components/priority-cards/priority-cards';

interface HeroStat {
  label: string;
  value: number;
  delta: number | null;
  tone: 'accent' | 'success' | 'warn' | 'neutral';
  hint: string;
}

interface StoryCard {
  cluster: TopicCluster;
  topics: RadarTopic[];
  topicsOverflow: number;
  topFirms: { slug: string; label: string }[];
  firmsOverflow: number;
  direction: string;
  trend: number[];
}

interface DayChange {
  kind: 'promoted' | 'demoted' | 'new-sector' | 'first-seen';
  label: string;
  detail: string;
  topicId?: string;
  tone: 'success' | 'warn' | 'accent' | 'neutral';
  icon: string;
}

@Component({
  selector: 'app-pulse',
  standalone: true,
  imports: [
    RouterLink, FormsModule,
    Skeleton, ButtonModule, DatePicker,
    PulseRadar, ArticleCards, PriorityCards
  ],
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
  readonly showBrief = signal<boolean>(false);

  readonly radarDay = signal<RadarDay | null>(null);
  readonly radarHistory = signal<RadarDay[]>([]);
  private readonly radarEntries = signal<{ date_id: string; json_path: string; is_versioned: boolean }[]>([]);

  readonly sectorNames = computed<string[]>(() => (this.radarDay()?.sectors ?? []).map(s => s.name));
  readonly radarDateIds = computed<string[]>(() => this.radarEntries().map(e => e.date_id));

  // ── HERO STATS — three numbers, each with yesterday's delta ──────────
  readonly heroStats = computed<HeroStat[]>(() => {
    const today = this.radarDay();
    const hist = this.radarHistory();
    if (!today) return [];
    // history is oldest → newest. Yesterday = second-to-last (last is today).
    const yesterday = hist.length >= 2 ? hist[hist.length - 2] : null;

    const surgingT = today.topics.filter(t => t.direction === 'surging').length;
    const risingT  = today.topics.filter(t => t.direction === 'rising' || t.direction === 'surging').length;
    const fadingT  = today.topics.filter(t => t.direction === 'fading').length;
    const surgingY = yesterday?.topics.filter(t => t.direction === 'surging').length ?? surgingT;
    const risingY  = yesterday?.topics.filter(t => t.direction === 'rising' || t.direction === 'surging').length ?? risingT;
    const fadingY  = yesterday?.topics.filter(t => t.direction === 'fading').length ?? fadingT;

    return [
      {
        label: 'Topics on radar',
        value: today.topics.length,
        delta: yesterday ? today.topics.length - yesterday.topics.length : null,
        tone: 'accent',
        hint: `${today.sectors.length} sectors covered`
      },
      {
        label: 'Surging now',
        value: surgingT,
        delta: yesterday ? surgingT - surgingY : null,
        tone: 'success',
        hint: `${risingT} rising in total`
      },
      {
        label: 'Cooling',
        value: fadingT,
        delta: yesterday ? fadingT - fadingY : null,
        tone: 'warn',
        hint: yesterday ? `was ${fadingY} yesterday` : 'no prior reference'
      }
    ];
  });

  // ── WHAT CHANGED TODAY ────────────────────────────────────────────────
  readonly dayChanges = computed<DayChange[]>(() => {
    const d = this.radarDay();
    if (!d) return [];
    const out: DayChange[] = [];
    const topicById = new Map(d.topics.map(t => [t.id, t]));
    const topicByLabel = new Map(d.topics.map(t => [t.label, t]));
    const STAGE_ORDER = ['fading', 'emerging', 'consolidating', 'mainstream'];

    for (const sm of d.stage_movements ?? []) {
      const t = topicById.get(sm.topic) ?? topicByLabel.get(sm.topic);
      const fromIdx = sm.from ? STAGE_ORDER.indexOf(sm.from) : -1;
      const toIdx = STAGE_ORDER.indexOf(sm.to);
      if (!sm.from || fromIdx < 0) {
        out.push({
          kind: 'first-seen',
          label: t?.label ?? sm.topic,
          detail: `New on radar · ${sm.to}`,
          topicId: t?.id,
          tone: 'accent',
          icon: 'pi-plus-circle'
        });
      } else if (toIdx > fromIdx) {
        out.push({
          kind: 'promoted',
          label: t?.label ?? sm.topic,
          detail: `${sm.from} → ${sm.to}`,
          topicId: t?.id,
          tone: 'success',
          icon: 'pi-arrow-up-right'
        });
      } else if (toIdx < fromIdx) {
        out.push({
          kind: 'demoted',
          label: t?.label ?? sm.topic,
          detail: `${sm.from} → ${sm.to}`,
          topicId: t?.id,
          tone: 'warn',
          icon: 'pi-arrow-down-right'
        });
      }
    }

    for (const name of d.sectors_spawned_today ?? []) {
      out.push({
        kind: 'new-sector',
        label: name,
        detail: 'New sector emerged',
        tone: 'accent',
        icon: 'pi-th-large'
      });
    }
    return out.slice(0, 8);
  });

  /** Pre-index history clusters: Map<clusterId, score[]> aligned to history order. */
  private readonly clusterHistory = computed<Map<string, number[]>>(() => {
    const hist = this.radarHistory();
    const byId = new Map<string, number[]>();
    const W = hist.length;
    for (let i = 0; i < W; i++) {
      for (const c of (hist[i].topic_clusters ?? [])) {
        let arr = byId.get(c.id);
        if (!arr) { arr = new Array(W).fill(0); byId.set(c.id, arr); }
        arr[i] = c.cluster_score_fast ?? 0;
      }
    }
    return byId;
  });

  // ── TOP STORIES (clusters, ranked by fast momentum) ──────────────────
  readonly topStories = computed<StoryCard[]>(() => {
    const d = this.radarDay();
    if (!d || !d.topic_clusters?.length) return [];
    const byId = new Map(d.topics.map(t => [t.id, t]));
    const ranked = [...d.topic_clusters]
      .filter(c => c.size >= 2)
      .sort((a, b) => b.cluster_score_fast - a.cluster_score_fast)
      .slice(0, 5);

    const TOPIC_CAP = 4;
    const FIRM_CAP = 4;
    const histIdx = this.clusterHistory();
    return ranked.map(c => {
      const allTopics = c.topic_ids
        .map(id => byId.get(id))
        .filter((t): t is RadarTopic => !!t)
        .sort((a, b) => b.score_fast - a.score_fast);

      // Aggregate firm mentions across the cluster's topics; pick most prominent.
      const firmCounts = new Map<string, number>();
      for (const t of allTopics) {
        for (const o of t.breadth_orgs_7d ?? []) {
          firmCounts.set(o, (firmCounts.get(o) ?? 0) + 1);
        }
      }
      const rankedFirms = Array.from(firmCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([slug]) => ({ slug, label: humanizeSlug(slug) }));

      const trend = histIdx.get(c.id) ?? [];
      return {
        cluster: c,
        topics: allTopics.slice(0, TOPIC_CAP),
        topicsOverflow: Math.max(0, allTopics.length - TOPIC_CAP),
        topFirms: rankedFirms.slice(0, FIRM_CAP),
        firmsOverflow: Math.max(0, rankedFirms.length - FIRM_CAP),
        direction: c.cluster_direction,
        trend
      };
    });
  });

  goToTopic(t: RadarTopic) {
    this.router.navigate(['/map/topic', t.id]);
  }

  goToStory(c: TopicCluster) {
    this.router.navigate(['/map/story', c.id]);
  }

  goToFirm(slug: string) {
    this.router.navigate(['/map/firm', slug]);
  }

  // ── Navigation by date ───────────────────────────────────────────────
  readonly currentIndex = computed(() => {
    const date = this.selectedDate();
    return this.dailies().findIndex(d => d.date_id === date);
  });
  readonly canPrev = computed(() => this.currentIndex() < this.dailies().length - 1);
  readonly canNext = computed(() => this.currentIndex() > 0);

  readonly formattedDate = computed(() => {
    const d = this.selectedDate();
    if (!d) return '';
    return new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  });

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
    if (this.availableDateSet().has(iso)) this.selectedDate.set(iso);
  }

  // Sparkline → path for hero stats (each stat shows its own 14d series).
  heroSparkPath(key: 'topics' | 'surging' | 'fading'): string {
    const hist = this.radarHistory();
    if (hist.length < 2) return '';
    const vals = hist.map(d => {
      if (key === 'topics') return d.topics.length;
      if (key === 'surging') return d.topics.filter(t => t.direction === 'surging').length;
      return d.topics.filter(t => t.direction === 'fading').length;
    });
    const w = 120, h = 36, pad = 2;
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = Math.max(1, max - min);
    const step = w / (vals.length - 1);
    const usable = h - pad * 2;
    return vals.map((v, i) => {
      const x = (i * step).toFixed(1);
      const y = (pad + (1 - (v - min) / range) * usable).toFixed(1);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');
  }

  storyTrendPath(values: number[], w = 80, h = 22): string {
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
    this.data.loadRadarIndex().then(idx => {
      this.radarEntries.set(idx.entries.filter(e => !e.is_versioned));
    }).catch(() => { /* radar block is optional */ });

    effect(() => {
      const date = this.selectedDate();
      const entries = this.radarEntries();
      if (!date || !entries.length) return;
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
        if (this.selectedDate() !== date) return;
        this.radarDay.set(d);
        this.radarHistory.set(hist);
      }).catch(() => { /* radar block is optional */ });
    });

    this.data.loadReportsIndex().then(idx => {
      const dailies = idx.entries.filter(e => e.cadence === 'daily' && !e.is_versioned);
      this.dailies.set(dailies);
      const routeParam = this.route.snapshot.paramMap.get('date');
      this.selectedDate.set(routeParam ?? dailies[0]?.date_id ?? null);
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
      const param = this.route.snapshot.paramMap.get('date');
      if (date && param !== date) {
        this.router.navigate(['/pulse', date], { replaceUrl: !param });
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
  jumpToLatest() {
    const list = this.dailies();
    if (list.length) this.selectedDate.set(list[0].date_id);
  }
}
