import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'primeng/tabs';

interface Section {
  id: string;
  title: string;
  emoji: string | null;
  html: SafeHtml;
  bodyText: string;
  itemCount: number;
}

// Sections we deliberately do NOT show on Today.
// (Already represented elsewhere: Stories block, Sweeps page, etc.)
const HIDDEN = [
  'sources scanned',
  'what changed vs. yesterday',
  'github momentum'
];

@Component({
  selector: 'app-article-cards',
  standalone: true,
  imports: [Tabs, TabList, Tab, TabPanels, TabPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (lead(); as l) {
      <header class="article-cards__lead">
        <h1 class="article-cards__lead-title">{{ l.title }}</h1>
        @if (l.subtitle) { <p class="article-cards__lead-sub muted italic">{{ l.subtitle }}</p> }
      </header>
    }

    @if (hero(); as h) {
      <article class="article-cards__card article-cards__card--hero">
        <header class="article-cards__head">
          @if (h.emoji) { <span class="article-cards__emoji article-cards__emoji--lg">{{ h.emoji }}</span> }
          <h2 class="article-cards__title article-cards__title--lg">{{ h.title }}</h2>
          @if (h.itemCount > 0) {
            <span class="article-cards__count">{{ h.itemCount }} items</span>
          }
        </header>
        <div class="markdown article-cards__body article-cards__body--hero" [innerHTML]="h.html"></div>
      </article>
    }

    @if (tabbedSections().length) {
      <section class="article-cards__deep surface">
        <header class="article-cards__deep-head">
          <div>
            <h2 class="article-cards__deep-title">Dive deeper</h2>
            <p class="article-cards__deep-sub muted">Pick a section. The day's full briefing, broken out by theme.</p>
          </div>
        </header>

        <p-tabs [value]="active()" (valueChange)="active.set($any($event))">
          <p-tablist>
            @for (s of tabbedSections(); track s.id) {
              <p-tab [value]="s.id">
                @if (s.emoji) { <span class="article-cards__tab-emoji">{{ s.emoji }}</span> }
                {{ s.title }}
                @if (s.itemCount > 0) {
                  <span class="article-cards__tab-count">{{ s.itemCount }}</span>
                }
              </p-tab>
            }
          </p-tablist>
          <p-tabpanels>
            @for (s of tabbedSections(); track s.id) {
              <p-tabpanel [value]="s.id">
                <div class="markdown article-cards__panel-body" [innerHTML]="s.html"></div>
              </p-tabpanel>
            }
          </p-tabpanels>
        </p-tabs>
      </section>
    }
  `,
  styles: [`
    :host { display: block; }

    .article-cards__lead {
      padding: 0 0 1.25rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--hairline);
    }
    .article-cards__lead-title {
      margin: 0;
      font-size: 1.85rem;
      font-weight: 700;
      letter-spacing: -0.025em;
      line-height: 1.2;
      color: var(--fg);
    }
    .article-cards__lead-sub {
      margin: 0.5rem 0 0;
      font-size: 0.9rem;
    }

    /* === Hero card =========================================== */
    .article-cards__card--hero {
      background: linear-gradient(180deg,
        color-mix(in srgb, var(--accent) 5%, var(--panel)) 0%,
        var(--panel) 100%);
      border: 1px solid color-mix(in srgb, var(--accent) 20%, var(--hairline));
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-card);
      padding: 1.75rem 2rem 2rem;
      margin-bottom: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      min-width: 0;
    }
    .article-cards__head {
      display: flex;
      align-items: baseline;
      gap: 0.55rem;
      padding-bottom: 0.65rem;
      border-bottom: 1px solid var(--hairline);
    }
    .article-cards__emoji { font-size: 1rem; line-height: 1; }
    .article-cards__emoji--lg { font-size: 1.35rem; }
    .article-cards__title {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: -0.012em;
      color: var(--fg);
      flex: 1;
    }
    .article-cards__title--lg {
      font-size: 1.2rem;
      letter-spacing: -0.018em;
    }
    .article-cards__count {
      font-family: var(--mono);
      font-size: 0.7rem;
      color: var(--fg-4);
      background: var(--bg-soft);
      padding: 2px 8px;
      border-radius: 999px;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    /* Cards/markdown inside this component fill the column.
       Override the global .markdown max-width which would otherwise leave
       large blank space on the right of wide cards. */
    :host ::ng-deep .markdown { max-width: none !important; }

    .article-cards__body {
      max-width: none;
      font-size: 0.9rem;
    }
    .article-cards__body--hero {
      font-size: 0.95rem;
    }

    /* === Tabbed "Dive deeper" ================================ */
    .article-cards__deep {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1.5rem 1.75rem 1.75rem;
    }
    .article-cards__deep-head { padding-bottom: 0.25rem; }
    .article-cards__deep-title {
      margin: 0;
      font-size: 1.05rem;
      font-weight: 600;
      letter-spacing: -0.018em;
      color: var(--fg);
    }
    .article-cards__deep-sub { margin: 0.25rem 0 0; font-size: 0.85rem; }

    :host ::ng-deep .article-cards__deep .p-tablist {
      overflow-x: auto;
      scrollbar-width: thin;
    }
    :host ::ng-deep .article-cards__deep .p-tablist::-webkit-scrollbar {
      height: 4px;
    }
    :host ::ng-deep .article-cards__deep .p-tab {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      white-space: nowrap;
      min-width: 0;
      padding: 0.85rem 1rem !important;
    }
    :host ::ng-deep .article-cards__deep .p-tablist-nav-button {
      display: none !important; /* native scroll, no buttons */
    }
    .article-cards__tab-emoji { font-size: 0.9rem; line-height: 1; }
    .article-cards__tab-count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.4rem;
      height: 1.1rem;
      padding: 0 0.4rem;
      font-family: var(--mono);
      font-size: 0.65rem;
      font-weight: 600;
      color: var(--fg-4);
      background: var(--bg-soft);
      border-radius: 999px;
      font-variant-numeric: tabular-nums;
    }
    .article-cards__panel-body {
      padding-top: 0.85rem;
      column-gap: 2.5rem;
      column-rule: 1px solid var(--hairline);
    }
    @media (min-width: 1100px) {
      .article-cards__panel-body { column-count: 2; }
    }
    /* Keep semantic blocks (paragraph + heading + list) from breaking mid-column */
    .article-cards__panel-body :host ::ng-deep h3,
    .article-cards__panel-body :host ::ng-deep h4,
    .article-cards__panel-body :host ::ng-deep p,
    .article-cards__panel-body :host ::ng-deep li,
    .article-cards__panel-body :host ::ng-deep ul,
    .article-cards__panel-body :host ::ng-deep ol {
      break-inside: avoid;
    }
    .article-cards__panel-body :host ::ng-deep h3 {
      margin-top: 0;
    }
  `]
})
export class ArticleCards {
  readonly source = input<string>('');
  readonly active = signal<string>('');
  private readonly sanitizer: DomSanitizer;
  constructor(sanitizer: DomSanitizer) { this.sanitizer = sanitizer; }

  readonly lead = computed<{ title: string; subtitle: string } | null>(() => {
    const src = this.source() ?? '';
    if (!src) return null;
    const lines = src.split('\n');
    let title = '';
    let subtitle = '';
    for (let i = 0; i < lines.length; i++) {
      const m1 = lines[i].match(/^#\s+(.+)$/);
      if (m1 && !title) { title = m1[1].trim(); continue; }
      if (title && !subtitle) {
        const t = lines[i].trim();
        if (!t) continue;
        if (/^#{1,6}\s/.test(t)) break;
        subtitle = t.replace(/^_+|_+$/g, '').replace(/^\*+|\*+$/g, '');
        break;
      }
    }
    return title ? { title, subtitle } : null;
  });

  private readonly allSections = computed<Section[]>(() => {
    const src = this.source() ?? '';
    if (!src) return [];

    // Strip the H1 + the first paragraph
    const stripped = (() => {
      const lines = src.split('\n');
      let i = 0;
      while (i < lines.length && !/^#\s+/.test(lines[i])) i++;
      if (i < lines.length) i++;
      while (i < lines.length && !lines[i].trim()) i++;
      if (i < lines.length && !/^#{1,6}\s/.test(lines[i])) {
        while (i < lines.length && lines[i].trim()) i++;
      }
      return lines.slice(i).join('\n');
    })();

    const blocks: { heading: string; body: string }[] = [];
    let current: { heading: string; body: string } | null = null;
    for (const line of stripped.split('\n')) {
      const h2 = line.match(/^##\s+(.+)$/);
      if (h2) {
        if (current) blocks.push(current);
        current = { heading: h2[1].trim(), body: '' };
      } else if (current) {
        current.body += line + '\n';
      }
    }
    if (current) blocks.push(current);

    return blocks.map((b, idx) => {
      const emojiMatch = b.heading.match(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})\s+/u);
      const emoji = emojiMatch ? emojiMatch[1] : null;
      const titleClean = emoji ? b.heading.slice(emojiMatch![0].length).trim() : b.heading;
      const html = marked.parse(b.body, { async: false }) as string;
      const bodyText = b.body.replace(/[*_`#>~\-\[\](){}]/g, '').trim();
      const itemCount = (b.body.match(/^\s*([-*+]|\d+\.)\s+/gm) || []).length;
      return {
        id: 'sec-' + idx + '-' + titleClean.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: titleClean,
        emoji,
        html: this.sanitizer.bypassSecurityTrustHtml(html),
        bodyText,
        itemCount
      };
    }).filter(s => s.bodyText.length > 0);
  });

  readonly hero = computed<Section | null>(() => {
    const all = this.allSections();
    return all[0] ?? null;       // First H2 (Top-5 reading priorities) is always the hero
  });

  readonly tabbedSections = computed<Section[]>(() => {
    const all = this.allSections();
    const out = all.slice(1).filter(s => !HIDDEN.some(h => s.title.toLowerCase().startsWith(h)));
    // Initialise active tab if not set yet
    if (out.length && !this.active()) {
      // defer the set so signal write happens after read
      queueMicrotask(() => { if (!this.active()) this.active.set(out[0].id); });
    }
    return out;
  });
}
