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

export interface OrgDetail {
  slug: string;
  generated_at: string;
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
  velocity?: OrgVelocity;
  velocity_history?: OrgVelocityPoint[];
  topic_mix?: Record<string, number>;
  radar_appearances?: any[];
  hot_events?: any[];
  classification_history?: any[];
  last_classification?: any;
  [k: string]: any;
}

// After the 2026-05-16 publish/research restructure, the data tree splits into:
//   data/publish/  — what humans read (daily, weekly, monthly, radar, orgs, reports)
//   data/research/sweeps/ — pipeline-internal change logs (vendor/keyword/github candidates)
//   data/research/sources/ — raw collector dumps (NEVER consumed by the UI)
//
// Manifest entries store paths relative to the appropriate base, so the service
// picks the right base for each request.
const SWEEP_CADENCE_PREFIXES = ['vendor_candidates/', 'keyword_candidates/', 'github_candidates/'];

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(HttpClient);
  private readonly publishBase = 'data/publish';
  private readonly sweepsBase  = 'data/research/sweeps';

  readonly reports = signal<ReportsIndex | null>(null);
  readonly radar = signal<RadarIndex | null>(null);
  readonly orgs = signal<OrgsIndex | null>(null);

  private readonly orgDetailCache = new Map<string, Promise<OrgDetail>>();
  private readonly radarDayCache = new Map<string, Promise<RadarDay>>();
  private readonly markdownCache = new Map<string, Promise<string>>();

  /** Resolve a manifest-relative path to a fully-qualified URL.
   *  Sweep cadences live under data/research/sweeps/; everything else
   *  publish-side is under data/publish/.
   */
  private resolve(relativePath: string): string {
    const isSweep = SWEEP_CADENCE_PREFIXES.some(p => relativePath.startsWith(p));
    return `${isSweep ? this.sweepsBase : this.publishBase}/${relativePath}`;
  }

  loadReportsIndex(): Promise<ReportsIndex> {
    return firstValueFrom(this.http.get<ReportsIndex>(`${this.publishBase}/reports/index.json`))
      .then(r => { this.reports.set(r); return r; });
  }

  loadRadarIndex(): Promise<RadarIndex> {
    return firstValueFrom(this.http.get<RadarIndex>(`${this.publishBase}/radar/index.json`))
      .then(r => { this.radar.set(r); return r; });
  }

  loadOrgsIndex(): Promise<OrgsIndex> {
    return firstValueFrom(this.http.get<OrgsIndex>(`${this.publishBase}/orgs/index.json`))
      .then(r => { this.orgs.set(r); return r; });
  }

  loadOrgDetail(slug: string): Promise<OrgDetail> {
    const cached = this.orgDetailCache.get(slug);
    if (cached) return cached;
    const p = firstValueFrom(this.http.get<OrgDetail>(`${this.publishBase}/orgs/${slug}.json`));
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
