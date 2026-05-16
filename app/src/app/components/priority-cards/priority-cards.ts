import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

interface Priority {
  rank: number;
  title: string;
  url: string | null;
  reason: SafeHtml;
  host: string | null;
}

@Component({
  selector: 'app-priority-cards',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!priorities().length && source().length > 0) {
      <p class="prio__fallback muted">
        <i class="pi pi-info-circle" aria-hidden="true"></i>
        Couldn't extract a priorities section for this brief — expand the daily brief below to read everything.
      </p>
    }
    @if (priorities().length) {
      <section class="prio">
        <header class="prio__head">
          <div class="prio__head-left">
            <span class="prio__eyebrow">🎯 Top-5 reading priorities</span>
            <h2 class="prio__title">What matters today</h2>
          </div>
          <p class="prio__sub">If you only read five things this morning — these.</p>
        </header>

        <ol class="prio__list">
          @for (p of priorities(); track p.rank) {
            <li class="prio__item prio__item--{{ p.rank }}">
              <span class="prio__rank" aria-hidden="true">{{ p.rank }}</span>
              <div class="prio__body">
                <a class="prio__title-link"
                   [href]="p.url"
                   target="_blank"
                   rel="noopener noreferrer"
                   [class.is-disabled]="!p.url">
                  {{ p.title }}
                </a>
                <p class="prio__reason markdown" [innerHTML]="p.reason"></p>
                @if (p.host) {
                  <span class="prio__host">
                    <i class="pi pi-external-link" aria-hidden="true"></i>
                    {{ p.host }}
                  </span>
                }
              </div>
            </li>
          }
        </ol>
      </section>
    }
  `,
  styles: [`
    :host { display: block; }

    .prio__fallback {
      margin: 0 0 1rem;
      padding: 0.7rem 0.95rem;
      background: var(--bg-soft);
      border: 1px dashed var(--hairline-2);
      border-radius: var(--radius-sm);
      font-size: 0.84rem;
      color: var(--fg-3);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .prio__fallback i { color: var(--fg-4); font-size: 0.85rem; }

    .prio {
      background: linear-gradient(180deg,
        color-mix(in srgb, var(--accent) 4%, var(--panel)) 0%,
        var(--panel) 60%);
      border: 1px solid color-mix(in srgb, var(--accent) 18%, var(--hairline));
      border-radius: var(--radius-xl);
      padding: 1.5rem 1.6rem 1.4rem;
      box-shadow: var(--shadow-card);
    }

    .prio__head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--hairline);
      margin-bottom: 1.1rem;
    }
    .prio__head-left { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }
    .prio__eyebrow {
      font-family: var(--sans);
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--accent-strong);
    }
    .prio__title {
      margin: 0;
      font-family: var(--sans);
      font-size: 1.45rem;
      font-weight: 700;
      letter-spacing: -0.022em;
      color: var(--fg);
      line-height: 1.2;
    }
    .prio__sub {
      margin: 0;
      font-size: 0.86rem;
      color: var(--fg-3);
      max-width: 32ch;
      text-align: right;
    }

    .prio__list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 0.85rem;
    }
    @media (min-width: 880px) {
      .prio__list { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
      /* First card spans both columns so it reads as the lead. */
      .prio__item--1 { grid-column: 1 / -1; }
    }

    .prio__item {
      position: relative;
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: 0.85rem;
      padding: 0.95rem 1.1rem 0.95rem 0.85rem;
      background: var(--panel);
      border: 1px solid var(--hairline);
      border-radius: var(--radius-lg);
      transition: border-color .15s var(--ease), box-shadow .15s var(--ease), transform .15s var(--ease);
      box-shadow: 0 1px 1px rgba(15,23,42,.02);
    }
    .prio__item:hover {
      border-color: color-mix(in srgb, var(--accent) 30%, var(--hairline));
      box-shadow: var(--shadow-card-hover);
    }
    .prio__item--1 {
      background: linear-gradient(140deg,
        color-mix(in srgb, var(--accent) 7%, var(--panel)) 0%,
        var(--panel) 70%);
      border-color: color-mix(in srgb, var(--accent) 22%, var(--hairline));
    }

    .prio__rank {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      font-family: var(--mono);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--fg-4);
      background: var(--bg-soft);
      border-radius: var(--radius-sm);
      letter-spacing: -0.02em;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
    }
    .prio__item--1 .prio__rank {
      background: var(--accent);
      color: #fff;
      box-shadow: 0 1px 3px color-mix(in srgb, var(--accent) 40%, transparent);
    }

    .prio__body { min-width: 0; display: flex; flex-direction: column; gap: 0.35rem; }

    .prio__title-link {
      font-family: var(--sans);
      font-size: 0.985rem;
      font-weight: 600;
      letter-spacing: -0.013em;
      line-height: 1.35;
      color: var(--fg);
      text-decoration: none;
      transition: color .12s var(--ease);
    }
    .prio__item--1 .prio__title-link { font-size: 1.1rem; }
    .prio__title-link:hover { color: var(--accent-strong); }
    .prio__title-link.is-disabled { pointer-events: none; }

    .prio__reason {
      margin: 0;
      font-size: 0.86rem;
      line-height: 1.55;
      color: var(--fg-3);
    }
    .prio__item--1 .prio__reason { font-size: 0.92rem; }
    .prio__reason :host ::ng-deep a {
      color: var(--accent);
      text-decoration: none;
      border-bottom: 1px dashed color-mix(in srgb, var(--accent) 40%, transparent);
    }
    .prio__reason :host ::ng-deep a:hover { color: var(--accent-strong); }
    .prio__reason :host ::ng-deep strong { color: var(--fg-2); font-weight: 600; }

    .prio__host {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      font-family: var(--mono);
      font-size: 0.7rem;
      color: var(--fg-4);
      letter-spacing: 0;
      margin-top: 0.1rem;
    }
    .prio__host i { font-size: 0.65rem; }
  `]
})
export class PriorityCards {
  readonly source = input<string>('');
  private readonly sanitizer: DomSanitizer;
  constructor(sanitizer: DomSanitizer) { this.sanitizer = sanitizer; }

  readonly priorities = computed<Priority[]>(() => {
    const src = this.source() ?? '';
    if (!src) return [];

    // Locate the priorities section. Accept several heading variants the
    // markdown writer has used over time:
    //   "Top-5 reading priorities" · "Top reading priorities" · "Reading priorities"
    //   "Priorities" · "What matters today" · "Top priorities"
    // Stops at the next H2.
    const HEADING_RE = /(reading\s*priorities|^top[-\s]?priorities|^priorities\b|what\s+matters\s+today)/i;
    const lines = src.split('\n');
    let inSection = false;
    const buf: string[] = [];
    for (const line of lines) {
      const h2 = line.match(/^##\s+(.+)$/);
      if (h2) {
        if (inSection) break;
        if (HEADING_RE.test(h2[1])) inSection = true;
        continue;
      }
      if (inSection) buf.push(line);
    }
    if (!buf.length) return [];

    // Pull numbered list items: each starts on a line beginning with `\d+\. `.
    const text = buf.join('\n');
    const matches: { rank: number; raw: string }[] = [];
    const startRe = /^(\d+)\.\s+/gm;
    const starts: { rank: number; index: number; headerLen: number }[] = [];
    let mm: RegExpExecArray | null;
    while ((mm = startRe.exec(text)) !== null) {
      starts.push({ rank: parseInt(mm[1], 10), index: mm.index, headerLen: mm[0].length });
    }
    for (let i = 0; i < starts.length; i++) {
      const s = starts[i];
      const end = i + 1 < starts.length ? starts[i + 1].index : text.length;
      const raw = text.slice(s.index + s.headerLen, end).trim();
      if (raw) matches.push({ rank: s.rank, raw });
    }
    if (!matches.length) return [];

    return matches.slice(0, 5).map(item => {
      // First markdown link in the item is the headline link.
      const linkMatch = item.raw.match(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/);
      let title = '';
      let url: string | null = null;
      let reasonRaw = item.raw;
      if (linkMatch) {
        title = linkMatch[1];
        url = linkMatch[2];
        reasonRaw = item.raw.slice(linkMatch[0].length).replace(/^\s*—\s*/, '').trim();
      } else {
        // Fallback: take the first bold span as title, rest as reason.
        const bold = item.raw.match(/^\*\*([^*]+)\*\*/);
        if (bold) {
          title = bold[1];
          reasonRaw = item.raw.slice(bold[0].length).replace(/^\s*—\s*/, '').trim();
        } else {
          const dash = item.raw.indexOf(' — ');
          if (dash > 0) {
            title = item.raw.slice(0, dash);
            reasonRaw = item.raw.slice(dash + 3).trim();
          } else {
            title = item.raw;
            reasonRaw = '';
          }
        }
      }
      const reasonHtml = marked.parseInline(reasonRaw, { async: false }) as string;
      const host = url ? this.hostOf(url) : null;
      return {
        rank: item.rank,
        title,
        url,
        reason: this.sanitizer.bypassSecurityTrustHtml(reasonHtml),
        host
      };
    });
  });

  private hostOf(url: string): string | null {
    try {
      const u = new URL(url);
      return u.hostname.replace(/^www\./, '');
    } catch {
      return null;
    }
  }
}
