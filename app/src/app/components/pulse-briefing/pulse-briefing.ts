import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

import { findBriefing } from '../../services/markdown-sections';

interface Lead {
  kicker: string | null;
  headline: string;
  body: SafeHtml;
  readThisFirst: { html: SafeHtml; url: string | null } | null;
  degraded: boolean;
}

@Component({
  selector: 'app-pulse-briefing',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (lead(); as L) {
      <article class="pb">
        @if (L.kicker) {
          <span class="pb__kicker">{{ L.kicker }}</span>
        }
        <h2 class="pb__headline">{{ L.headline }}</h2>
        <div class="pb__body markdown" [innerHTML]="L.body"></div>
        @if (L.readThisFirst; as R) {
          <a class="pb__read-first"
             [class.is-disabled]="!R.url"
             [href]="R.url"
             target="_blank"
             rel="noopener noreferrer">
            <span class="pb__read-first-label">Read this first</span>
            <span class="pb__read-first-text markdown" [innerHTML]="R.html"></span>
          </a>
        }
        @if (L.degraded) {
          <p class="pb__degraded">Briefing degraded — upstream quality check failed.</p>
        }
      </article>
    }
  `,
  styles: [`
    :host { display: block; width: 100%; }

    .pb {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      padding: 1.85rem clamp(1.4rem, 3vw, 2.4rem) 1.6rem;
      background: var(--panel);
      border: 1px solid var(--hairline);
      border-radius: var(--radius-lg);
      width: 100%;
      box-sizing: border-box;
    }

    .pb__kicker {
      font-family: var(--mono);
      font-size: 0.66rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--accent);
    }

    .pb__headline {
      margin: 0;
      font-family: var(--sans);
      font-size: clamp(1.45rem, 2.4vw, 2.05rem);
      font-weight: 700;
      letter-spacing: -0.028em;
      line-height: 1.18;
      color: var(--fg);
    }

    .pb__body {
      font-size: 0.98rem;
      line-height: 1.65;
      color: var(--fg-2);
      max-width: none;
    }
    .pb__body ::ng-deep p { margin: 0 0 0.85em; }
    .pb__body ::ng-deep p:last-child { margin-bottom: 0; }
    .pb__body ::ng-deep a {
      color: var(--fg);
      text-decoration: none;
      border-bottom: 1px dashed color-mix(in srgb, var(--fg-3) 45%, transparent);
      transition: color .15s var(--ease), border-color .15s var(--ease);
    }
    .pb__body ::ng-deep a:hover {
      color: var(--accent);
      border-bottom-color: var(--accent);
    }
    .pb__body ::ng-deep strong { color: var(--fg); font-weight: 600; }
    .pb__body ::ng-deep em { color: var(--fg-3); font-style: italic; }
    .pb__body ::ng-deep hr { display: none; }

    .pb__read-first {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 0.85rem 1rem;
      margin-top: 0.35rem;
      background: var(--accent-soft);
      border-radius: 6px;
      text-decoration: none;
      color: inherit;
      transition: background .15s var(--ease);
    }
    .pb__read-first:hover { background: color-mix(in srgb, var(--accent) 14%, transparent); }
    .pb__read-first.is-disabled { pointer-events: none; }
    .pb__read-first-label {
      font-family: var(--mono);
      font-size: 0.66rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--accent-strong);
    }
    .pb__read-first-text {
      font-size: 0.92rem;
      line-height: 1.5;
      color: var(--fg);
      max-width: none;
    }
    .pb__read-first-text ::ng-deep a {
      color: inherit;
      text-decoration: none;
      font-weight: 600;
    }
    .pb__read-first-text ::ng-deep strong {
      color: inherit;
      font-weight: 600;
    }

    .pb__degraded {
      margin: 0;
      font-family: var(--mono);
      font-size: 0.7rem;
      letter-spacing: 0.04em;
      color: var(--warn-text);
    }
  `]
})
export class PulseBriefing {
  readonly source = input<string>('');

  private readonly sanitizer: DomSanitizer;
  constructor(sanitizer: DomSanitizer) { this.sanitizer = sanitizer; }

  readonly lead = computed<Lead | null>(() => {
    const src = this.source() ?? '';
    if (!src) return null;
    const block = findBriefing(src);
    if (!block) return null;

    let body = block.body;

    // First non-empty paragraph that's wrapped in **...** is the headline.
    const headlineMatch = body.match(/^\s*\*\*([^*][\s\S]*?)\*\*\s*$/m);
    let headline = '';
    if (headlineMatch) {
      headline = headlineMatch[1].trim();
      body = body.replace(headlineMatch[0], '').trim();
    }

    // Pull off the "Read this first:" callout (its own paragraph, last in body).
    let readThisFirst: Lead['readThisFirst'] = null;
    const rtfMatch = body.match(/\*\*Read this first:?\*\*\s*([\s\S]+?)(?:\n\n|---|$)/i);
    if (rtfMatch) {
      const rtfRaw = rtfMatch[1].trim().replace(/^\s*[—–-]\s*/, '');
      const urlMatch = rtfRaw.match(/\[[^\]]+\]\(([^)]+)\)/);
      readThisFirst = {
        html: this.sanitizer.bypassSecurityTrustHtml(
          marked.parseInline(rtfRaw, { async: false }) as string
        ),
        url: urlMatch ? urlMatch[1] : null
      };
      body = body.slice(0, rtfMatch.index!).trim();
    }

    // Strip trailing horizontal rule from the body if any.
    body = body.replace(/\n*-{3,}\s*$/m, '').trim();

    const html = this.sanitizer.bypassSecurityTrustHtml(
      marked.parse(body, { async: false }) as string
    );

    return {
      kicker: block.heading,
      headline: headline || (block.heading ?? ''),
      body: html,
      readThisFirst,
      degraded: block.degraded
    };
  });
}
