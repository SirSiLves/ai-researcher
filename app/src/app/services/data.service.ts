import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface ReportEntry {
  cadence: 'daily' | 'weekly' | 'monthly' | 'radar' | 'vendor_candidates' | 'keyword_candidates' | 'github_candidates';
  cadence_label: string;
  date_id: string;
  sort_date: string;
  path: string;
  headline: string;
  is_versioned: boolean;
}

export interface ReportsIndex {
  generated_at: string | null;
  cadences: string[];
  entries: ReportEntry[];
}

export interface RadarEntry {
  date_id: string;
  date: string;
  topic_count: number;
  stage_movement_count: number;
  json_path: string;
  md_path: string;
  is_versioned: boolean;
}

export interface RadarIndex {
  generated_at: string | null;
  entries: RadarEntry[];
}

export interface SectorHistoryEntry {
  date: string;
  from: string | null;
  to: string;
  reason?: string;
}

export interface ClusterHistoryEntry {
  date: string;
  from: string | null;
  to: string;
  reason?: string;
}

export interface RadarTopic {
  id: string;
  label: string;
  stage: 'emerging' | 'consolidating' | 'mainstream' | 'fading';
  score: number;
  score_fast: number;
  score_slow: number;
  direction: 'rising' | 'falling' | 'flat' | 'surging' | 'fading' | 'steady' | string;
  momentum_7d_pct: number | null;
  sustained_days: number;
  breadth_7d: number;
  breadth_30d: number;
  high_breadth: boolean;
  source_type_count: number;
  sector: string;
  first_seen: string;
  breadth_orgs_7d: string[];
  supporting_files: string[];
  supporting_links: string[];
  cluster_id?: string;
  source_mentions_capped?: Record<string, number | string>;
  source_mentions?: Record<string, number | string>;
  raw_score_today?: number;
  score_fast_yesterday?: number;
  score_slow_yesterday?: number;
  score_7d_ago?: number | null;
  score_30d_ago?: number | null;
  score_90d_ago?: number | null;
  score_180d_ago?: number | null;
  sector_history?: SectorHistoryEntry[];
  cluster_history?: ClusterHistoryEntry[];
}

export interface RadarSector {
  name: string;
  description?: string;
  topic_ids: string[];
  first_seen?: string;
  consecutive_low_days?: number;
  topic_count?: number;
  active_orgs?: number;
}

export interface StageMovement {
  topic: string;
  from: string | null;
  to: string;
  first_observed_today?: boolean;
  reason?: string;
}

export interface TopicCluster {
  id: string;
  name: string;
  topic_ids: string[];
  size: number;
  first_seen: string;
  cluster_score_slow: number;
  cluster_score_fast: number;
  cluster_direction: 'rising' | 'falling' | 'steady' | string;
  cluster_breadth_7d: number;
  members_moving_together: boolean;
}

export interface SectorMovement {
  sector: string;
  type?: string;
  from?: string;
  to?: string;
  reason?: string;
  [k: string]: any;
}

export interface RadarDay {
  date: string;
  rolling_window_days?: number;
  sectors: RadarSector[];
  topics: RadarTopic[];
  topic_clusters?: TopicCluster[];
  stage_movements: StageMovement[];
  sector_movements?: SectorMovement[];
  sectors_spawned_today?: string[];
  sectors_dissolved_today?: string[];
  background_topics_count?: number;
}

export interface OrgIndexEntry {
  slug: string;
  is_priority: boolean;
  coverage: string;
  tier_hint: string | null;
  region: string | null;
  total_mentions: number;
  distinct_days: number;
  first_seen: string;
  last_seen: string;
  velocity_7d: number;
  velocity_ratio: number;
  velocity_status: 'surging' | 'accelerating' | 'steady' | 'cooling' | string;
  velocity_28d_avg: number;
  /** 31-day rolling window. Drives the row sparkline on /firms and the
   *  velocity line chart on /firms/:slug. Lives on the index entry so the
   *  list view renders from a single HTTP request. */
  velocity_history: OrgVelocityPoint[];
  topic_count: number;
  top_topics: string[];
}

export interface OrgsIndex {
  generated_at: string | null;
  total_orgs: number;
  priority_count: number;
  entries: OrgIndexEntry[];
  _note?: string;
}

export interface OrgVelocity {
  velocity_7d: number;
  velocity_28d_avg: number;
  velocity_ratio: number;
  velocity_status: 'surging' | 'accelerating' | 'steady' | 'cooling' | string;
}

export interface OrgVelocityPoint {
  date: string;
  velocity_7d: number;
  velocity_ratio: number;
}

/** Parsed shape of a sweep change-log markdown file (vendor / keyword / github).
 *  The MD writers all follow the same convention: an H2 "What changed in
 *  sources.json today" followed by bullets like `- **verb-name** payload`.
 *  When nothing changed, the section is a single italic line. */
export interface SweepSummary {
  kind: 'vendor' | 'keyword' | 'github';
  date_id: string;
  /** True when the section contains "No changes" text — drives the empty UI. */
  no_changes: boolean;
  /** Counts per verb across the whole MD (e.g. promote-add: 131). */
  verbs: Record<string, number>;
  /** Total mutations applied = sum of the additive verbs (promote-add, hot-event-add, proven-promote, deep-watch-promote, revive). */
  applied: number;
  /** Total expirations / demotions = sum of removal verbs (expire-remove, deep-watch-demote, auto-demote). */
  removed: number;
  /** Raw markdown — useful if a caller wants to render the full body. */
  markdown: string;
}

/** Per-firm detail file (orgs/{slug}.json). Contains the heavy fields the
 *  drawer + /firms/:slug page need but the list view doesn't. Velocity and
 *  velocity_history live on OrgIndexEntry (orgs/index.json) — single source
 *  of truth for the row sparkline + detail-page line chart. */
export interface OrgDetail {
  slug: string;
  coverage: string;
  tier_hint: string | null;
  region: string | null;
  blog_url_hint?: string;
  first_seen: string;
  last_seen: string;
  total_mentions: number;
  distinct_days: number;
  is_priority?: boolean;
  distinct_source_types: string[];
  mentions_by_source_type: Record<string, number>;
  mentions_by_date?: Record<string, number>;
  aliases?: string[];
  context_samples?: string[];
  topic_mix?: Record<string, number>;
  radar_appearances?: any[];
  hot_events?: any[];
  classification_history?: any[];
  last_classification?: any;
  [k: string]: any;
}

// data/ is flat: every cadence is a sibling folder under data/. The UI
// consumes daily/, weekly/, monthly/, radar/, orgs/, reports/, plus the three
// sweep change logs. Raw collector dumps (news/, papers/, blogs/, jobs/,
// linkedin/, github/, hackernews/) are siblings too but the UI never reads
// them — they're researcher-internal.

/** Insertion-order LRU: re-getting an entry promotes it to most-recent.
 *  Drops oldest when size exceeds capacity. Used to bound long-session memory. */
class LRU<K, V> {
  private readonly m = new Map<K, V>();
  constructor(private readonly capacity: number) {}
  get(key: K): V | undefined {
    if (!this.m.has(key)) return undefined;
    const v = this.m.get(key)!;
    this.m.delete(key);
    this.m.set(key, v);
    return v;
  }
  set(key: K, value: V): void {
    if (this.m.has(key)) this.m.delete(key);
    this.m.set(key, value);
    while (this.m.size > this.capacity) {
      const oldest = this.m.keys().next().value;
      if (oldest === undefined) break;
      this.m.delete(oldest);
    }
  }
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(HttpClient);
  private readonly dataBase = 'data';

  readonly reports = signal<ReportsIndex | null>(null);
  readonly radar = signal<RadarIndex | null>(null);
  readonly orgs = signal<OrgsIndex | null>(null);

  // Bounded caches: enough for 90d momentum + a few archive drawer peeks.
  private readonly orgDetailCache = new LRU<string, Promise<OrgDetail>>(40);
  private readonly radarDayCache  = new LRU<string, Promise<RadarDay>>(120);
  private readonly markdownCache  = new LRU<string, Promise<string>>(40);

  /** Resolve a manifest-relative path to a fully-qualified URL under data/. */
  private resolve(relativePath: string): string {
    return `${this.dataBase}/${relativePath}`;
  }

  loadReportsIndex(): Promise<ReportsIndex> {
    return firstValueFrom(this.http.get<ReportsIndex>(`${this.dataBase}/reports/index.json`))
      .then(r => { this.reports.set(r); return r; });
  }

  loadRadarIndex(): Promise<RadarIndex> {
    return firstValueFrom(this.http.get<RadarIndex>(`${this.dataBase}/radar/index.json`))
      .then(r => { this.radar.set(r); return r; });
  }

  loadOrgsIndex(): Promise<OrgsIndex> {
    return firstValueFrom(this.http.get<OrgsIndex>(`${this.dataBase}/orgs/index.json`))
      .then(r => { this.orgs.set(r); return r; });
  }

  /** Look up an OrgIndexEntry by slug, loading the index lazily if needed.
   *  Used by the firm detail page (deep-linked /firms/:slug) to read the
   *  velocity series without re-fetching. */
  async orgIndexEntry(slug: string): Promise<OrgIndexEntry | null> {
    const idx = this.orgs() ?? await this.loadOrgsIndex();
    return idx.entries.find(e => e.slug === slug) ?? null;
  }

  loadOrgDetail(slug: string): Promise<OrgDetail> {
    const cached = this.orgDetailCache.get(slug);
    if (cached) return cached;
    const p = firstValueFrom(this.http.get<OrgDetail>(`${this.dataBase}/orgs/${slug}.json`));
    this.orgDetailCache.set(slug, p);
    return p;
  }

  loadRadarDay(jsonPath: string): Promise<RadarDay> {
    const cached = this.radarDayCache.get(jsonPath);
    if (cached) return cached;
    const p = firstValueFrom(this.http.get<RadarDay>(this.resolve(jsonPath)));
    this.radarDayCache.set(jsonPath, p);
    return p;
  }

  loadMarkdown(relativePath: string): Promise<string> {
    const cached = this.markdownCache.get(relativePath);
    if (cached) return cached;
    const p = firstValueFrom(this.http.get(this.resolve(relativePath), { responseType: 'text' }));
    this.markdownCache.set(relativePath, p);
    return p;
  }

  // Load the last N radar days (newest first) using already-cached requests
  // where possible. Returns days in chronological order (oldest → newest).
  async loadRadarHistory(jsonPaths: string[], limit = 14): Promise<RadarDay[]> {
    const recent = jsonPaths.slice(0, limit);
    const days = await Promise.all(recent.map(p => this.loadRadarDay(p).catch(() => null)));
    return days.filter((d): d is RadarDay => !!d).reverse();
  }

  /** Load and parse a sweep change-log MD into a SweepSummary.
   *  Tolerates missing files (returns null) and "no changes" days. */
  async loadSweep(kind: 'vendor' | 'keyword' | 'github', date_id: string): Promise<SweepSummary | null> {
    const r = this.reports();
    if (!r) await this.loadReportsIndex();
    const reports = this.reports();
    if (!reports) return null;
    const cadence = `${kind}_candidates` as const;
    const entry = reports.entries.find(e => e.cadence === cadence && e.date_id === date_id && !e.is_versioned);
    if (!entry) return null;
    const md = await this.loadMarkdown(entry.path).catch(() => '');
    if (!md) return null;
    return parseSweep(kind, date_id, md);
  }

  // Convenience: get the most recent daily report
  latestDaily(): ReportEntry | null {
    const r = this.reports();
    if (!r) return null;
    return r.entries.find(e => e.cadence === 'daily' && !e.is_versioned) ?? null;
  }

  dailyByDate(date: string): ReportEntry | null {
    const r = this.reports();
    if (!r) return null;
    return r.entries.find(e => e.cadence === 'daily' && e.date_id === date) ?? null;
  }
}

// Strict allowlist of verbs the sweep emits at the start of each change-log
// bullet. Avoids treating bold org/repo/keyword names (also `- **foo**`) as verbs.
const ADDITIVE_VERBS = new Set(['promote-add', 'hot-event-add', 'proven-promote', 'deep-watch-promote', 'revive', 'hot-add']);
const REMOVAL_VERBS  = new Set(['expire-remove', 'deep-watch-demote', 'auto-demote']);
const ALL_VERBS = new Set([...ADDITIVE_VERBS, ...REMOVAL_VERBS]);

function parseSweep(kind: 'vendor' | 'keyword' | 'github', date_id: string, md: string): SweepSummary {
  // Slice the "What changed in sources.json today" section: from its H2 to the next H2.
  // Old MD writer used "What changed today"; new one uses "What changed in sources.json today".
  const lines = md.split('\n');
  let inSec = false;
  const sectionLines: string[] = [];
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      if (inSec) break;
      if (/^(?:📋\s*)?what\s+changed/i.test(h2[1])) inSec = true;
      continue;
    }
    if (inSec) sectionLines.push(line);
  }
  const body = sectionLines.join('\n');
  // Multiple "no changes" phrasings across the sweep MD writers:
  //   "No changes to sources.json"
  //   "_No changes this run_"
  //   "No promotions applied this run." (keyword sweep)
  //   "No mutations this run."
  const noChanges = /no\s+changes\s+to\s+`?sources\.json`?|_?no\s+changes\s+this\s+run_?|no\s+promotions\s+applied\s+this\s+run|no\s+mutations\s+this\s+run/i.test(body);

  // Primary signal: count bullet lines starting with `- **<known-verb>**`.
  // Vendor MDs use this format consistently for individual changes.
  const verbs: Record<string, number> = {};
  for (const m of body.matchAll(/^[-*]\s+\*\*([a-z][a-z-]*[a-z])\*\*/gmi)) {
    const verb = m[1].toLowerCase();
    if (ALL_VERBS.has(verb)) verbs[verb] = (verbs[verb] ?? 0) + 1;
  }
  let applied = 0, removed = 0;
  for (const [v, n] of Object.entries(verbs)) {
    if (ADDITIVE_VERBS.has(v)) applied += n;
    else if (REMOVAL_VERBS.has(v)) removed += n;
  }

  // Fallback for the older vendor MD format which uses a natural-language
  // summary line: "**Auto-applied today (combined sweep totals):** X promotions,
  // Y hot events, Z expired removals." Surface those counts when no verb bullets
  // matched.
  if (applied === 0 && removed === 0 && !noChanges) {
    const summary = body.match(/auto-applied[^*\n]*?\(combined[^*\n]*?\)[\s\S]*?(\d+)\s*promotion[s]?[\s\S]*?(\d+)\s*hot\s*event[s]?[\s\S]*?(\d+)\s*(?:expired|removal)/i)
                 ?? body.match(/(\d+)\s*promotion[s]?[\s\S]*?(\d+)\s*hot\s*event[s]?[\s\S]*?(\d+)\s*(?:expired|removal)/i);
    if (summary) {
      const promos = parseInt(summary[1], 10) || 0;
      const hot    = parseInt(summary[2], 10) || 0;
      const exp    = parseInt(summary[3], 10) || 0;
      if (promos) { verbs['promote-add']  = promos; applied += promos; }
      if (hot)    { verbs['hot-event-add'] = hot;    applied += hot; }
      if (exp)    { verbs['expire-remove'] = exp;    removed += exp; }
    }
  }

  return { kind, date_id, no_changes: noChanges, verbs, applied, removed, markdown: md };
}
