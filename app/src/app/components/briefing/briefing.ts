import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';

import { DataService, RadarDay } from '../../services/data.service';

type Tag = 'transition' | 'surging' | 'breadth' | 'sector-new' | 'sector-gone';

interface BriefingItem {
  tag: Tag;
  label: string;
  body: string;
  weight: number;
  topicId?: string;
  to?: string;          // route link
}

const TAG_LABEL: Record<Tag, string> = {
  'transition':   'Stage',
  'surging':      'Surging',
  'breadth':      'Breadth',
  'sector-new':   'New sector',
  'sector-gone':  'Sector dissolved'
};

@Component({
  selector: 'app-briefing',
  standalone: true,
  imports: [RouterLink, Skeleton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="briefing">
      <header class="briefing__head">
        <h2 class="briefing__title">Signal — today on the radar</h2>
        @if (asOfDate(); as d) {
          <span class="briefing__as-of tabular">{{ d }}</span>
        }
      </header>

      @if (loading()) {
        <div class="briefing__skeleton">
          @for (i of [1,2,3,4,5]; track i) {
            <p-skeleton width="100%" height="2.4rem"></p-skeleton>
          }
        </div>
      } @else if (items().length === 0) {
        <p class="briefing__empty muted italic">Quiet day — no stage transitions, surges, or breadth jumps in the latest snapshot.</p>
      } @else {
        <ol class="briefing__list">
          @for (it of items(); track it.label + it.tag) {
            <li class="briefing__item">
              <a [routerLink]="it.to ?? null" class="briefing__row" [class.is-disabled]="!it.to">
                <span class="briefing__tag" [attr.data-tag]="it.tag">{{ TAG_LABEL[it.tag] }}</span>
                <span class="briefing__label">{{ it.label }}</span>
                <span class="briefing__body">{{ it.body }}</span>
                @if (it.to) {
                  <span class="briefing__cta" aria-hidden="true">→</span>
                }
              </a>
            </li>
          }
        </ol>
      }
    </section>
  `,
  styles: [`
    :host { display: block; }
    .briefing {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-card);
      padding: 1.1rem 1.25rem 0.6rem;
    }
    .briefing__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 0.7rem;
      margin-bottom: 0.4rem;
      border-bottom: 1px solid var(--line);
    }
    .briefing__title {
      margin: 0;
      font-family: var(--sans);
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: -0.005em;
      color: var(--fg);
    }
    .briefing__as-of {
      font-size: 0.7rem;
      color: var(--fg-4);
      font-family: var(--mono);
    }
    .briefing__skeleton {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .briefing__empty {
      padding: 0.6rem 0;
      font-size: 0.84rem;
      color: var(--fg-3);
    }
    .briefing__list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .briefing__item { border-bottom: 1px solid var(--line); }
    .briefing__item:last-child { border-bottom: 0; }
    .briefing__row {
      display: grid;
      grid-template-columns: 6rem minmax(0, 22rem) minmax(0, 1fr) 1rem;
      gap: 1rem;
      align-items: center;
      min-height: 48px;
      padding: 0.55rem 0.55rem;
      color: var(--fg);
      text-decoration: none;
      border-radius: var(--radius);
      cursor: pointer;
      transition: background .15s, box-shadow .15s;
    }
    .briefing__row:hover:not(.is-disabled) {
      background: var(--bg-soft-2);
      text-decoration: none;
    }
    .briefing__row:focus-visible { outline: none; box-shadow: 0 0 0 3px var(--accent-ring); }
    .briefing__row:hover:not(.is-disabled) .briefing__cta {
      color: var(--accent);
      transform: translateX(2px);
    }
    .briefing__row.is-disabled { cursor: default; pointer-events: none; }

    .briefing__tag {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--sans);
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      padding: 0.25rem 0.55rem;
      border-radius: var(--radius);
      background: var(--bg-soft-2);
      color: var(--fg-3);
      white-space: nowrap;
      justify-self: start;
      border: 0;
      min-height: 22px;
    }
    .briefing__tag[data-tag="surging"]     { background: var(--accent-soft); color: var(--accent-strong); }
    .briefing__tag[data-tag="transition"]  { background: var(--info-soft); color: var(--info-text); }
    .briefing__tag[data-tag="sector-new"]  { background: var(--pos-soft); color: var(--pos-text); }
    .briefing__tag[data-tag="sector-gone"] { background: var(--warn-soft); color: var(--warn-text); }
    .briefing__tag[data-tag="breadth"]     { background: var(--bg-soft-2); color: var(--fg-3); }

    .briefing__label {
      font-family: var(--sans);
      font-size: 0.87rem;
      font-weight: 500;
      line-height: 1.35;
      color: var(--fg);
    }
    .briefing__body {
      font-family: var(--mono);
      font-style: normal;
      font-size: 0.75rem;
      line-height: 1.4;
      color: var(--fg-3);
    }
    .briefing__cta {
      font-family: var(--sans);
      font-size: 0.85rem;
      color: var(--fg-4);
      transition: color .12s, transform .12s;
      justify-self: end;
    }

    @media (max-width: 800px) {
      .briefing__row {
        grid-template-columns: 5rem 1fr;
        grid-template-areas:
          "tag label"
          "tag body"
          "tag cta";
      }
      .briefing__tag { grid-area: tag; }
      .briefing__label { grid-area: label; }
      .briefing__body { grid-area: body; }
      .briefing__cta { grid-area: cta; justify-self: start; }
    }
  `]
})
export class Briefing {
  private readonly data = inject(DataService);

  readonly loading = signal<boolean>(true);
  readonly day = signal<RadarDay | null>(null);

  readonly TAG_LABEL = TAG_LABEL;

  readonly asOfDate = computed(() => this.day()?.date ?? null);

  readonly items = computed<BriefingItem[]>(() => {
    const d = this.day();
    if (!d) return [];
    const out: BriefingItem[] = [];

    // 1. Stage transitions (highest weight — these are the rare "the field moved" events)
    for (const m of d.stage_movements ?? []) {
      const weight =
        m.to === 'mainstream' ? 95 :
        m.to === 'consolidating' ? 85 :
        m.to === 'fading' ? 75 :
        70;
      out.push({
        tag: 'transition',
        label: m.topic,
        body: `${m.from ?? 'new'} → ${m.to}${m.reason ? ' · ' + m.reason : ''}`,
        weight,
        topicId: this.findTopicIdByLabel(d, m.topic) ?? undefined,
        to: undefined  // set below once we know the id
      });
    }

    // 2. Sector births / dissolutions
    for (const name of d.sectors_spawned_today ?? []) {
      out.push({
        tag: 'sector-new',
        label: name,
        body: 'crossed the spawn threshold today',
        weight: 80,
        to: '/sectors'
      });
    }
    for (const name of d.sectors_dissolved_today ?? []) {
      out.push({
        tag: 'sector-gone',
        label: name,
        body: 'dropped below the dissolve threshold',
        weight: 60,
        to: '/sectors'
      });
    }

    // 3. Surging topics (direction surging — score_fast >> score_slow)
    const surging = d.topics
      .filter(t => t.direction === 'surging')
      .sort((a, b) => b.score_fast - a.score_fast)
      .slice(0, 4);
    for (const t of surging) {
      out.push({
        tag: 'surging',
        label: t.label,
        body: `loudness ${t.score_fast.toFixed(0)} · ${t.breadth_7d} orgs · sector ${t.sector}`,
        weight: 65 + Math.min(15, t.score_fast / 10),
        topicId: t.id,
        to: undefined
      });
    }

    // 4. Breadth jumps — high_breadth flag = above-threshold cross-source spread
    const breadthJumps = d.topics
      .filter(t => t.high_breadth && t.direction !== 'fading')
      .sort((a, b) => b.breadth_7d - a.breadth_7d)
      .slice(0, 4);
    for (const t of breadthJumps) {
      // dedupe against surging
      if (surging.some(s => s.id === t.id)) continue;
      out.push({
        tag: 'breadth',
        label: t.label,
        body: `${t.breadth_7d} orgs in 7 days · ${t.source_type_count} source types`,
        weight: 50 + Math.min(15, t.breadth_7d),
        topicId: t.id,
        to: undefined
      });
    }

    // Finalize topic links (now that all topicId fields are set)
    for (const it of out) {
      if (it.topicId && !it.to) it.to = `/radar/topic/${encodeURIComponent(it.topicId)}`;
    }

    return out.sort((a, b) => b.weight - a.weight).slice(0, 10);
  });

  constructor() {
    this.data.loadRadarIndex()
      .then(idx => {
        const entries = idx.entries.filter(e => !e.is_versioned);
        const latest = entries[0];
        if (!latest) { this.loading.set(false); return; }
        return this.data.loadRadarDay(latest.json_path).then(d => {
          this.day.set(d);
          this.loading.set(false);
        });
      })
      .catch(() => this.loading.set(false));
  }

  private findTopicIdByLabel(d: RadarDay, label: string): string | null {
    // Stage movements name a "topic" string; it usually matches an id or label
    const byId = d.topics.find(t => t.id === label);
    if (byId) return byId.id;
    const byLabel = d.topics.find(t => t.label === label || t.label.startsWith(label));
    return byLabel?.id ?? null;
  }
}
