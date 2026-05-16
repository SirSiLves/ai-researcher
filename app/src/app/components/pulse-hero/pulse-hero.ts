import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { Card } from 'primeng/card';
import { SweepSummary } from '../../services/data.service';

interface Lead {
  rank: number;
  title: string;
  url: string | null;
  host: string | null;
  reason: SafeHtml;
}

interface Rest {
  rank: number;
  title: string;
  url: string | null;
  host: string | null;
}

@Component({
  selector: 'app-pulse-hero',
  standalone: true,
  imports: [Card],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (lead(); as L) {
      <section class="ph">
        <p-card styleClass="ph__lead-card">
          <a class="ph__lead"
             [class.is-disabled]="!L.url"
             [href]="L.url"
             target="_blank"
             rel="noopener noreferrer">
            <span class="ph__lead-rank tabular">№ {{ L.rank }}</span>
            <h2 class="ph__lead-title">{{ L.title }}</h2>
            <p class="ph__lead-reason markdown" [innerHTML]="L.reason"></p>
            @if (L.host) {
              <span class="ph__lead-host tabular">{{ L.host }} ↗</span>
            }
          </a>
        </p-card>

        @if (rest().length) {
          <p-card styleClass="ph__rest-card">
            <ol class="ph__rest">
              @for (r of rest(); track r.rank) {
                <li class="ph__rest-item">
                  <a class="ph__rest-row"
                     [class.is-disabled]="!r.url"
                     [href]="r.url"
                     target="_blank"
                     rel="noopener noreferrer">
                    <span class="ph__rest-rank tabular">{{ r.rank }}</span>
                    <span class="ph__rest-title">{{ r.title }}</span>
                    @if (r.host) {
                      <span class="ph__rest-host tabular">{{ r.host }}</span>
                    }
                  </a>
                </li>
              }
            </ol>
          </p-card>
        }
      </section>
    }
  `,
  styles: [`
    :host { display: block; }
    .ph {
      display: grid;
      grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
      gap: 1rem;
      align-items: stretch;
    }
    @media (max-width: 900px) {
      .ph { grid-template-columns: 1fr; }
    }

    /* === PrimeNG Card overrides — shared === */
    :host ::ng-deep .p-card {
      border-radius: var(--radius-lg);
      background: var(--panel);
      border: 1px solid var(--hairline);
      box-shadow: none;
      height: 100%;
      overflow: hidden;
      transition: box-shadow .15s var(--ease), border-color .15s var(--ease);
    }
    :host ::ng-deep .p-card:hover { box-shadow: var(--shadow-card); }
    :host ::ng-deep .p-card .p-card-body { padding: 0; height: 100%; }
    :host ::ng-deep .p-card .p-card-content { padding: 0; height: 100%; }

    /* === LEAD === */
    :host ::ng-deep .ph__lead-card { background: var(--panel); }
    .ph__lead {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      padding: 1.75rem 1.85rem 1.85rem;
      text-decoration: none;
      color: inherit;
      height: 100%;
      box-sizing: border-box;
    }
    .ph__lead.is-disabled { pointer-events: none; }

    .ph__lead-rank {
      font-family: var(--mono);
      font-size: 0.66rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--accent);
      align-self: flex-start;
    }
    .ph__lead-title {
      margin: 0;
      font-family: var(--sans);
      font-size: clamp(1.4rem, 2vw, 1.85rem);
      font-weight: 700;
      letter-spacing: -0.028em;
      line-height: 1.18;
      color: var(--fg);
      transition: color .15s var(--ease);
    }
    .ph__lead:hover .ph__lead-title { color: var(--accent); }
    .ph__lead-reason {
      margin: 0;
      font-size: 0.95rem;
      line-height: 1.6;
      color: var(--fg-2);
      max-width: 60ch;
    }
    .ph__lead-reason :host ::ng-deep a {
      color: var(--fg);
      text-decoration: none;
      border-bottom: 1px dashed color-mix(in srgb, var(--fg-3) 45%, transparent);
    }
    .ph__lead-reason :host ::ng-deep strong { color: var(--fg); font-weight: 600; }
    .ph__lead-host {
      font-family: var(--mono);
      font-size: 0.72rem;
      letter-spacing: 0.04em;
      color: var(--fg-4);
      margin-top: 0.4rem;
    }

    /* === REST === */
    .ph__rest {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .ph__rest-item { display: block; flex: 1; }
    .ph__rest-item:not(:last-child) { border-bottom: 1px solid var(--hairline); }
    .ph__rest-row {
      display: grid;
      grid-template-columns: 1.6rem minmax(0, 1fr) auto;
      gap: 0.85rem;
      align-items: baseline;
      padding: 0.9rem 1.25rem;
      text-decoration: none;
      color: inherit;
      height: 100%;
      box-sizing: border-box;
      transition: background .12s var(--ease);
      cursor: pointer;
    }
    .ph__rest-row:hover { background: var(--bg-soft); }
    .ph__rest-row.is-disabled { pointer-events: none; }
    .ph__rest-rank {
      font-family: var(--mono);
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--fg-5);
      align-self: start;
      padding-top: 0.1rem;
    }
    .ph__rest-title {
      font-size: 0.86rem;
      font-weight: 600;
      letter-spacing: -0.012em;
      line-height: 1.35;
      color: var(--fg);
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .ph__rest-row:hover .ph__rest-title { color: var(--accent); }
    .ph__rest-host {
      font-family: var(--mono);
      font-size: 0.68rem;
      color: var(--fg-5);
      align-self: start;
      padding-top: 0.15rem;
    }
  `]
})
export class PulseHero {
  readonly source = input<string>('');
  readonly vendor  = input<SweepSummary | null>(null);
  readonly keyword = input<SweepSummary | null>(null);
  readonly github  = input<SweepSummary | null>(null);

  private readonly sanitizer: DomSanitizer;
  constructor(sanitizer: DomSanitizer) { this.sanitizer = sanitizer; }

  private readonly parsed = computed<{ lead: Lead | null; rest: Rest[] }>(() => {
    const src = this.source() ?? '';
    if (!src) return { lead: null, rest: [] };

    // Section headings we'll look at, in priority order.
    // First match wins. The newer orchestrator uses "Top-5 reading priorities";
    // the older format used "TL;DR" or "Major announcements & releases" with
    // no dedicated priorities section, so we fall back to those.
    const HEAD_PATTERNS: RegExp[] = [
      /(reading\s*priorities|what\s+matters\s+today|^priorities\b|^top[-\s]?priorities)/i,
      /^tl;?\s*dr\b/i,
      /major\s+(announcements?|news|releases)/i,
    ];

    const sliceSection = (re: RegExp): string => {
      const lines = src.split('\n');
      let inSec = false;
      const buf: string[] = [];
      for (const line of lines) {
        const h2 = line.match(/^##\s+(.+)$/);
        if (h2) {
          if (inSec) break;
          if (re.test(h2[1])) inSec = true;
          continue;
        }
        if (inSec) buf.push(line);
      }
      return buf.join('\n');
    };

    // Extract leading items from a section body. Supports both:
    //   1. **[Title](url)** — reason            (numbered, new format)
    //   - **Title**: reason                      (bulleted, old TL;DR format)
    const extractItems = (text: string): { rank: number; raw: string }[] => {
      // Numbered first
      const numStartRe = /^(\d+)\.\s+/gm;
      const numStarts: { rank: number; index: number; headerLen: number }[] = [];
      let mm: RegExpExecArray | null;
      while ((mm = numStartRe.exec(text)) !== null) {
        numStarts.push({ rank: parseInt(mm[1], 10), index: mm.index, headerLen: mm[0].length });
      }
      if (numStarts.length >= 2) {
        const out: { rank: number; raw: string }[] = [];
        for (let i = 0; i < numStarts.length; i++) {
          const s = numStarts[i];
          const end = i + 1 < numStarts.length ? numStarts[i + 1].index : text.length;
          const raw = text.slice(s.index + s.headerLen, end).trim();
          if (raw) out.push({ rank: s.rank, raw });
        }
        return out;
      }
      // Fallback: bullet lines starting with - or *
      const bulletRe = /^[-*]\s+(.+(?:\n(?![-*]\s|##\s).*)*)/gm;
      const out: { rank: number; raw: string }[] = [];
      let rank = 1;
      let bm: RegExpExecArray | null;
      while ((bm = bulletRe.exec(text)) !== null) {
        out.push({ rank: rank++, raw: bm[1].trim() });
        if (out.length >= 5) break;
      }
      return out;
    };

    let items: { rank: number; raw: string }[] = [];
    for (const pat of HEAD_PATTERNS) {
      const body = sliceSection(pat);
      if (!body.trim()) continue;
      items = extractItems(body);
      if (items.length) break;
    }
    if (!items.length) return { lead: null, rest: [] };

    const decoded = items.slice(0, 5).map(item => {
      const link = item.raw.match(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/);
      let title = ''; let url: string | null = null; let reasonRaw = item.raw;
      if (link) {
        title = link[1]; url = link[2];
        reasonRaw = item.raw.slice(link[0].length).replace(/^\s*—\s*/, '').trim();
      } else {
        const bold = item.raw.match(/^\*\*([^*]+)\*\*/);
        if (bold) {
          title = bold[1];
          reasonRaw = item.raw.slice(bold[0].length).replace(/^\s*—\s*/, '').trim();
        } else {
          const dash = item.raw.indexOf(' — ');
          if (dash > 0) {
            title = item.raw.slice(0, dash);
            reasonRaw = item.raw.slice(dash + 3).trim();
          } else { title = item.raw; reasonRaw = ''; }
        }
      }
      return { rank: item.rank, title, url, reasonRaw };
    });

    const hostOf = (u: string | null) => {
      if (!u) return null;
      try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return null; }
    };

    const lead: Lead | null = decoded[0] ? {
      rank: decoded[0].rank,
      title: decoded[0].title,
      url: decoded[0].url,
      host: hostOf(decoded[0].url),
      reason: this.sanitizer.bypassSecurityTrustHtml(
        marked.parseInline(decoded[0].reasonRaw, { async: false }) as string
      )
    } : null;
    const rest: Rest[] = decoded.slice(1).map(d => ({
      rank: d.rank,
      title: d.title,
      url: d.url,
      host: hostOf(d.url)
    }));
    return { lead, rest };
  });

  readonly lead = computed(() => this.parsed().lead);
  readonly rest = computed(() => this.parsed().rest);
}
