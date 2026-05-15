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

export interface RadarTopic {
  id: string;
  label: string;
  stage: 'emerging' | 'consolidating' | 'mainstream' | 'fading';
  score: number;
  score_fast: number;
  score_slow: number;
  direction: 'rising' | 'falling' | 'flat' | string;
  momentum_7d_pct: number;
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
}

export interface RadarSector {
  name: string;
  description?: string;
  topic_ids: string[];
}

export interface StageMovement {
  topic: string;
  from: string | null;
  to: string;
  first_observed_today?: boolean;
  reason?: string;
}

export interface RadarDay {
  date: string;
  sectors: RadarSector[];
  topics: RadarTopic[];
  stage_movements: StageMovement[];
  sector_movements?: any[];
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
  distinct_source_types: string[];
  mentions_by_source_type: Record<string, number>;
  daily_history?: Array<{ date: string; mentions: number }>;
  topics?: Array<{ id: string; mentions: number; first_seen: string; last_seen: string }>;
  recent_context?: Array<{ date: string; source_type: string; snippet: string; path: string }>;
  [k: string]: any;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(HttpClient);
  private readonly base = 'data';

  readonly reports = signal<ReportsIndex | null>(null);
  readonly radar = signal<RadarIndex | null>(null);
  readonly orgs = signal<OrgsIndex | null>(null);

  private readonly orgDetailCache = new Map<string, Promise<OrgDetail>>();
  private readonly radarDayCache = new Map<string, Promise<RadarDay>>();
  private readonly markdownCache = new Map<string, Promise<string>>();

  loadReportsIndex(): Promise<ReportsIndex> {
    return firstValueFrom(this.http.get<ReportsIndex>(`${this.base}/reports/index.json`))
      .then(r => { this.reports.set(r); return r; });
  }

  loadRadarIndex(): Promise<RadarIndex> {
    return firstValueFrom(this.http.get<RadarIndex>(`${this.base}/radar/index.json`))
      .then(r => { this.radar.set(r); return r; });
  }

  loadOrgsIndex(): Promise<OrgsIndex> {
    return firstValueFrom(this.http.get<OrgsIndex>(`${this.base}/orgs/index.json`))
      .then(r => { this.orgs.set(r); return r; });
  }

  loadOrgDetail(slug: string): Promise<OrgDetail> {
    const cached = this.orgDetailCache.get(slug);
    if (cached) return cached;
    const p = firstValueFrom(this.http.get<OrgDetail>(`${this.base}/orgs/${slug}.json`));
    this.orgDetailCache.set(slug, p);
    return p;
  }

  loadRadarDay(jsonPath: string): Promise<RadarDay> {
    const cached = this.radarDayCache.get(jsonPath);
    if (cached) return cached;
    const p = firstValueFrom(this.http.get<RadarDay>(`${this.base}/${jsonPath}`));
    this.radarDayCache.set(jsonPath, p);
    return p;
  }

  loadMarkdown(relativePath: string): Promise<string> {
    const cached = this.markdownCache.get(relativePath);
    if (cached) return cached;
    const p = firstValueFrom(this.http.get(`${this.base}/${relativePath}`, { responseType: 'text' }));
    this.markdownCache.set(relativePath, p);
    return p;
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
