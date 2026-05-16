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
  kind: 'news' | 'research' | 'blogs' | 'github' | 'hn' | 'jobs' | 'linkedin' | 'diff' | 'meta' | 'other';
}

// Top-5 reading priorities is handled by the standalone PriorityCards component.
// "Sources scanned" is the pipeline meta block — keep it off the surface.
const HIDDEN_TITLES = [
  'top-5 reading priorities',
  'sources scanned'
];

const KIND_RULES: { match: RegExp; kind: Section['kind']; icon: string }[] = [
  { match: /(what changed|delta)/i,       kind: 'diff',     icon: 'pi-history' },
  { match: /(github|repos|repositories)/i, kind: 'github',   icon: 'pi-github' },
  { match: /(hacker news|^hn |hn pulse)/i, kind: 'hn',       icon: 'pi-comments' },
  { match: /research|paper/i,              kind: 'research', icon: 'pi-book' },
  { match: /(blog|reads)/i,                kind: 'blogs',    icon: 'pi-bookmark' },
  { match: /(job|hiring|swiss)/i,          kind: 'jobs',     icon: 'pi-briefcase' },
  { match: /linkedin|pulse/i,              kind: 'linkedin', icon: 'pi-users' },
  { match: /(news|release|major)/i,        kind: 'news',     icon: 'pi-megaphone' }
];

function classify(title: string): { kind: Section['kind']; icon: string } {
  for (const rule of KIND_RULES) {
    if (rule.match.test(title)) return { kind: rule.kind, icon: rule.icon };
  }
  return { kind: 'other', icon: 'pi-circle' };
}

@Component({
  selector: 'app-article-cards',
  standalone: true,
  imports: [Tabs, TabList, Tab, TabPanels, TabPanel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (diff(); as d) {
      <article class="cards__diff">
        <header class="cards__diff-head">
          <div class="cards__diff-eyebrow">
            <i class="pi pi-history" aria-hidden="true"></i>
            <span>What changed vs. yesterday</span>
          </div>
          <h2 class="cards__diff-title">{{ d.title }}</h2>
        </header>
        <div class="markdown cards__diff-body" [innerHTML]="d.html"></div>
      </article>
    }

    @if (tabbedSections().length) {
      <section class="cards__deep surface">
        <header class="cards__deep-head">
          <div>
            <h2 class="cards__deep-title">Dive deeper</h2>
            <p class="cards__deep-sub muted">Every section of today's briefing, broken out by theme.</p>
          </div>
        </header>

        <p-tabs [value]="active()" (valueChange)="active.set($any($event))" scrollable="true">
          <p-tablist>
            @for (s of tabbedSections(); track s.id) {
              <p-tab [value]="s.id">
                <i class="pi" [class]="iconFor(s)" aria-hidden="true"></i>
                <span class="cards__tab-label">{{ s.title }}</span>
                @if (s.itemCount > 0) {
                  <span class="cards__tab-count">{{ s.itemCount }}</span>
                }
              </p-tab>
            }
          </p-tablist>
          <p-tabpanels>
            @for (s of tabbedSections(); track s.id) {
              <p-tabpanel [value]="s.id">
                <div class="markdown cards__panel-body" [innerHTML]="s.html"></div>
              </p-tabpanel>
            }
          </p-tabpanels>
        </p-tabs>
      </section>
    }
  `,
  styles: [`
    :host { display: block; }

    /* === "What changed" card === */
    .cards__diff {
      background: var(--panel);
      border: 1px solid var(--hairline);
      border-left: 3px solid var(--accent);
      border-radius: var(--radius-lg);
      padding: 1.25rem 1.5rem 1.4rem;
      box-shadow: var(--shadow-card);
      margin-bottom: 1.25rem;
    }
    .cards__diff-head {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding-bottom: 0.6rem;
      border-bottom: 1px solid var(--hairline);
      margin-bottom: 0.9rem;
    }
    .cards__diff-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      font-family: var(--sans);
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--accent-strong);
    }
    .cards__diff-eyebrow i { font-size: 0.78rem; }
    .cards__diff-title {
      margin: 0;
      font-size: 1.05rem;
      font-weight: 600;
      letter-spacing: -0.018em;
      color: var(--fg);
    }
    .cards__diff-body { font-size: 0.9rem; max-width: none; }
    .cards__diff-body :host ::ng-deep ul { padding-inline-start: 1.25rem; }
    .cards__diff-body :host ::ng-deep li { margin: 0.45em 0; }
    .cards__diff-body :host ::ng-deep strong { color: var(--fg); }

    /* === Tabbed "Dive deeper" === */
    .cards__deep {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1.4rem 1.6rem 1.6rem;
    }
    .cards__deep-head { padding-bottom: 0.25rem; }
    .cards__deep-title {
      margin: 0;
      font-size: 1.05rem;
      font-weight: 600;
      letter-spacing: -0.018em;
      color: var(--fg);
    }
    .cards__deep-sub { margin: 0.25rem 0 0; font-size: 0.85rem; }

    :host ::ng-deep .cards__deep .p-tablist {
      overflow-x: auto;
      scrollbar-width: thin;
    }
    :host ::ng-deep .cards__deep .p-tablist::-webkit-scrollbar { height: 4px; }
    :host ::ng-deep .cards__deep .p-tab {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      white-space: nowrap;
      min-width: 0;
      padding: 0.85rem 1rem !important;
    }
    :host ::ng-deep .cards__deep .p-tab > i {
      font-size: 0.85rem;
      color: var(--fg-4);
    }
    :host ::ng-deep .cards__deep .p-tab[aria-selected="true"] > i { color: var(--accent-strong); }
    :host ::ng-deep .cards__deep .p-tablist-nav-button { display: none !important; }

    .cards__tab-label { font-weight: inherit; }
    .cards__tab-count {
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

    .cards__panel-body {
      padding-top: 0.85rem;
      column-gap: 2.5rem;
      column-rule: 1px solid var(--hairline);
      max-width: none;
    }
    @media (min-width: 1100px) {
      .cards__panel-body { column-count: 2; }
    }
    .cards__panel-body :host ::ng-deep h3,
    .cards__panel-body :host ::ng-deep h4,
    .cards__panel-body :host ::ng-deep p,
    .cards__panel-body :host ::ng-deep li,
    .cards__panel-body :host ::ng-deep ul,
    .cards__panel-body :host ::ng-deep ol {
      break-inside: avoid;
    }
    .cards__panel-body :host ::ng-deep h3 { margin-top: 0; }
    :host ::ng-deep .markdown { max-width: none !important; }
  `]
})
export class ArticleCards {
  readonly source = input<string>('');
  readonly active = signal<string>('');
  private readonly sanitizer: DomSanitizer;
  constructor(sanitizer: DomSanitizer) { this.sanitizer = sanitizer; }

  private readonly allSections = computed<Section[]>(() => {
    const src = this.source() ?? '';
    if (!src) return [];

    // Strip the H1 + the first non-heading paragraph (the synthesis subtitle).
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
      const { kind } = classify(titleClean);
      return {
        id: 'sec-' + idx + '-' + titleClean.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: titleClean,
        emoji,
        html: this.sanitizer.bypassSecurityTrustHtml(html),
        bodyText,
        itemCount,
        kind
      };
    }).filter(s => s.bodyText.length > 0);
  });

  /** "What changed vs. yesterday" lives outside the tabs as a callout. */
  readonly diff = computed<Section | null>(() => {
    return this.allSections().find(s => s.kind === 'diff') ?? null;
  });

  readonly tabbedSections = computed<Section[]>(() => {
    const all = this.allSections();
    const out = all.filter(s =>
      s.kind !== 'diff'
      && !HIDDEN_TITLES.some(h => s.title.toLowerCase().startsWith(h))
    );
    // Preferred ordering — news → research → blogs → github → hn → linkedin → jobs → other
    const order: Section['kind'][] = ['news', 'research', 'blogs', 'github', 'hn', 'linkedin', 'jobs', 'other', 'meta'];
    out.sort((a, b) => order.indexOf(a.kind) - order.indexOf(b.kind));
    if (out.length && !this.active()) {
      queueMicrotask(() => { if (!this.active()) this.active.set(out[0].id); });
    }
    return out;
  });

  iconFor(s: Section): string {
    const rule = KIND_RULES.find(r => r.kind === s.kind);
    return rule?.icon ?? 'pi-circle';
  }
}
