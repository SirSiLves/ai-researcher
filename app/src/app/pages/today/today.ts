import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Skeleton } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { Card } from 'primeng/card';

import { DataService, ReportEntry, RadarDay, RadarTopic, SweepSummary } from '../../services/data.service';
import { findSection } from '../../services/markdown-sections';
import { LinkTopicsDirective } from '../../services/link-topics.directive';
import { PulseRadar } from '../../components/pulse-radar/pulse-radar';
import { PulseHero } from '../../components/pulse-hero/pulse-hero';
import { PulseBriefing } from '../../components/pulse-briefing/pulse-briefing';
import { DigestCard } from '../../components/digest-card/digest-card';

interface DigestSlot {
  key: string;
  title: string;
  subtitle: string;
  source: string;
}

@Component({
  selector: 'app-pulse',
  standalone: true,
  imports: [
    RouterLink, FormsModule,
    Skeleton, ButtonModule, DatePicker, Card,
    PulseRadar, PulseHero, PulseBriefing, DigestCard,
    LinkTopicsDirective
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

  readonly radarDay = signal<RadarDay | null>(null);
  readonly radarHistory = signal<RadarDay[]>([]);
  readonly radarWindow = signal<'7d' | '14d' | '30d' | '90d'>('7d');
  private readonly radarEntries = signal<{ date_id: string; json_path: string; is_versioned: boolean }[]>([]);

  readonly vendorSweep  = signal<SweepSummary | null>(null);
  readonly keywordSweep = signal<SweepSummary | null>(null);
  readonly githubSweep  = signal<SweepSummary | null>(null);

  /** All raw collector report entries — populated from reports/index.json
   *  (the build_reports_manifest.py output now includes news/papers/blogs/etc.).
   *  Filtered to the current selectedDate() in `rawSourcesForDate`. */
  readonly rawSourceEntries = signal<ReportEntry[]>([]);

  readonly sectorNames = computed<string[]>(() => (this.radarDay()?.sectors ?? []).map(s => s.name));
  readonly radarDateIds = computed<string[]>(() => this.radarEntries().map(e => e.date_id));
  /** Topics on the current day — fed to the LinkTopicsDirective so digest /
   *  briefing / news prose can auto-link to /map/topic/:id. Empty until
   *  the radar JSON loads. */
  readonly topicsForLinks = computed<readonly RadarTopic[]>(() => this.radarDay()?.topics ?? []);

  /** Raw collector files (news/papers/blogs/etc.) that exist for the current
   *  date — surfaced as a small footer strip so the researcher can pop the
   *  long tail rather than only seeing the synthesized briefing. */
  readonly rawSourcesForDate = computed<Array<{ label: string; cadence: string; path: string }>>(() => {
    const date = this.selectedDate();
    if (!date) return [];
    const SOURCE_CADENCES = new Set(['news', 'papers', 'blogs', 'hackernews', 'github', 'linkedin', 'jobs']);
    return this.rawSourceEntries()
      .filter(e => SOURCE_CADENCES.has(e.cadence) && e.date_id === date && !e.is_versioned)
      .sort((a, b) => a.cadence.localeCompare(b.cadence))
      .map(e => ({ label: e.cadence_label, cadence: e.cadence, path: `data/${e.path}` }));
  });

  /** "Radar watch" (template as of 2026-07) with fallback to the old
   *  "What changed vs. yesterday" section so pre-July dailies still render. */
  readonly diffSection = computed<{ title: string; subtitle: string; body: string } | null>(() => {
    const md = this.markdown();
    if (!md) return null;
    const radar = findSection(md, /radar\s+watch/i);
    if (radar?.body.trim()) {
      return {
        title: 'Radar watch',
        subtitle: 'Momentum movers from the topic radar — the strongest risers and faders behind today\'s coverage.',
        body: radar.body
      };
    }
    const diff = findSection(md, /what\s+changed/i);
    if (diff?.body.trim()) {
      return {
        title: 'Since yesterday',
        subtitle: 'What moved between yesterday\'s snapshot and today\'s — re-rated theses, new distribution moves, theme rotations across GitHub and HN.',
        body: diff.body
      };
    }
    return null;
  });

  /** Digest cards: GitHub, HN, blogs, jobs, research. */
  readonly digestSlots = computed<DigestSlot[]>(() => {
    const md = this.markdown();
    if (!md) return [];
    const map: { key: string; title: string; subtitle: string; match: RegExp }[] = [
      {
        key: 'github',
        title: 'GitHub momentum',
        subtitle: 'Trending AI repos today + star-count deltas on the watched-repo list — the earliest signal before mainstream coverage.',
        match: /github\s*momentum/i
      },
      {
        key: 'hn',
        title: 'Hacker News pulse',
        subtitle: 'Front-page items filtered for AI relevance, with the sentiment-shift signal the threads collectively send.',
        match: /hacker\s*news/i
      },
      {
        key: 'blogs',
        title: 'Best blog reads',
        subtitle: 'Long-form analysis from independent practitioners (Willison, SemiAnalysis, Stratechery, Latent Space, Every).',
        match: /(best\s*blog|^blog\s*reads|long.?form)/i
      },
      {
        key: 'research',
        title: 'Research highlights',
        subtitle: 'ArXiv + Hugging Face papers filtered to LLM, agent, retrieval, and evaluation work that actually moves the field.',
        match: /research|papers/i
      },
      {
        key: 'jobs',
        title: 'Swiss job market',
        subtitle: 'AI / LLM / GenAI openings in Switzerland with the pattern read on what titles and skills are consolidating.',
        match: /swiss|jobs/i
      },
      {
        key: 'linkedin',
        title: 'LinkedIn pulse',
        subtitle: 'Practitioner posts and Pulse articles surfacing reference architectures, scorecards, and field reports.',
        match: /linkedin/i
      }
    ];
    const out: DigestSlot[] = [];
    for (const m of map) {
      const sec = findSection(md, m.match);
      if (sec && sec.body.trim()) {
        out.push({ key: m.key, title: m.title, subtitle: m.subtitle, source: sec.body });
      }
    }
    return out;
  });

  /** Major news as a wide "what shipped today" block. */
  readonly majorNews = computed<string>(() => {
    const md = this.markdown();
    if (!md) return '';
    const s = findSection(md, /major\s*news|news\s*&\s*releases/i);
    return s?.body ?? '';
  });

  /** One-line summary like "vendor: no changes · keyword: +131 · github: no changes". */
  readonly sweepLine = computed<string>(() => {
    const parts: string[] = [];
    const fmt = (label: string, s: SweepSummary | null) => {
      if (!s) return null;
      if (s.no_changes) return `${label} —`;
      if (s.applied || s.removed) {
        const a = s.applied ? `+${s.applied}` : '';
        const r = s.removed ? `−${s.removed}` : '';
        return `${label} ${[a, r].filter(Boolean).join(' ')}`;
      }
      return `${label} —`;
    };
    const v = fmt('vendor',  this.vendorSweep());  if (v) parts.push(v);
    const k = fmt('keyword', this.keywordSweep()); if (k) parts.push(k);
    const g = fmt('github',  this.githubSweep());  if (g) parts.push(g);
    return parts.join('  ·  ');
  });

  goToTopic(t: RadarTopic) {
    this.router.navigate(['/map/topic', t.id]);
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

  constructor() {
    this.data.loadRadarIndex().then(idx => {
      this.radarEntries.set(idx.entries.filter(e => !e.is_versioned));
    }).catch(() => { /* optional */ });

    effect(() => {
      const date = this.selectedDate();
      const entries = this.radarEntries();
      const win = this.radarWindow();
      if (!date || !entries.length) return;
      let idx = entries.findIndex(e => e.date_id === date);
      if (idx < 0) idx = entries.findIndex(e => e.date_id <= date);
      if (idx < 0) idx = 0;
      const entry = entries[idx];
      const days = win === '90d' ? 90 : win === '30d' ? 30 : win === '14d' ? 14 : 7;
      const windowPaths = entries.slice(idx, idx + days).map(e => e.json_path);
      this.radarDay.set(null);
      this.radarHistory.set([]);
      Promise.all([
        this.data.loadRadarDay(entry.json_path),
        this.data.loadRadarHistory(windowPaths, days)
      ]).then(([d, hist]) => {
        if (this.selectedDate() !== date) return;
        this.radarDay.set(d);
        this.radarHistory.set(hist);
      }).catch(() => { /* optional */ });
    });

    effect(() => {
      const date = this.selectedDate();
      if (!date) return;
      this.vendorSweep.set(null);
      this.keywordSweep.set(null);
      this.githubSweep.set(null);
      this.data.loadSweep('vendor',  date).then(s => { if (this.selectedDate() === date) this.vendorSweep.set(s); }).catch(() => {});
      this.data.loadSweep('keyword', date).then(s => { if (this.selectedDate() === date) this.keywordSweep.set(s); }).catch(() => {});
      this.data.loadSweep('github',  date).then(s => { if (this.selectedDate() === date) this.githubSweep.set(s); }).catch(() => {});
    });

    this.data.loadReportsIndex().then(idx => {
      const dailies = idx.entries.filter(e => e.cadence === 'daily' && !e.is_versioned);
      this.dailies.set(dailies);
      this.rawSourceEntries.set(idx.entries);
      const routeParam = this.route.snapshot.paramMap.get('date');
      this.selectedDate.set(routeParam ?? dailies[0]?.date_id ?? null);
    }).catch(err => {
      this.error.set(`Couldn't load reports index: ${err.message ?? err}`);
      this.loading.set(false);
    });

    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe(params => {
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
