import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-digest-card',
  standalone: true,
  imports: [Card],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (html(); as h) {
      <p-card styleClass="dg">
        @if (title() || kicker() || subtitle()) {
          <header class="dg__head">
            @if (kicker()) {
              <span class="dg__kicker">{{ kicker() }}</span>
            }
            @if (title()) {
              <h2 class="dg__title">{{ title() }}</h2>
            }
            @if (subtitle()) {
              <p class="dg__subtitle">{{ subtitle() }}</p>
            }
          </header>
        }
        <div class="markdown dg__body" [innerHTML]="h"></div>
      </p-card>
    }
  `,
  styles: [`
    :host { display: block; height: 100%; }
    :host ::ng-deep .dg.p-card {
      height: 100%;
      border-radius: var(--radius-lg);
      background: var(--panel);
      border: 1px solid var(--hairline);
      box-shadow: none;
      overflow: hidden;
    }
    :host ::ng-deep .dg .p-card-body { padding: 0; height: 100%; display: flex; flex-direction: column; }
    :host ::ng-deep .dg .p-card-content { padding: 0; flex: 1; display: flex; flex-direction: column; }

    .dg__head {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      padding: 1.15rem 1.4rem 0.85rem;
      border-bottom: 1px solid var(--hairline);
    }
    .dg__kicker {
      font-family: var(--mono);
      font-size: 0.64rem;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--fg-4);
    }
    .dg__title {
      margin: 0;
      font-size: 1.05rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--fg);
    }
    .dg__subtitle {
      margin: 0.3rem 0 0;
      font-size: 0.8rem;
      line-height: 1.45;
      color: var(--fg-4);
      max-width: 58ch;
    }
    .dg__body {
      font-size: 0.88rem;
      line-height: 1.6;
      color: var(--fg-2);
      max-width: none;
      padding: 1rem 1.4rem 1.4rem;
      flex: 1;
    }
    .dg__body :host ::ng-deep {
      h3 { font-size: 0.92rem; font-weight: 600; margin: 0.95rem 0 0.3rem; color: var(--fg); letter-spacing: -0.01em; }
      h3:first-child { margin-top: 0; }
      ul, ol { padding-inline-start: 1.15rem; margin: 0.3rem 0; }
      li { margin: 0.45em 0; }
      p { margin: 0.5em 0; }
      a { color: var(--accent); text-decoration: none; border-bottom: 1px solid color-mix(in srgb, var(--accent) 30%, transparent); }
      a:hover { color: var(--accent-strong); border-bottom-color: var(--accent-strong); }
      strong { color: var(--fg); font-weight: 600; }
      em { color: var(--fg-3); font-style: italic; }
      code { font-family: var(--mono); font-size: 0.82em; background: var(--bg-soft); padding: 0.1em 0.4em; border-radius: 4px; }
    }

  `]
})
export class DigestCard {
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly kicker = input<string>('');
  readonly source = input<string>('');

  private readonly sanitizer: DomSanitizer;
  constructor(sanitizer: DomSanitizer) { this.sanitizer = sanitizer; }

  readonly html = computed<SafeHtml | null>(() => {
    const src = this.source().trim();
    if (!src) return null;
    return this.sanitizer.bypassSecurityTrustHtml(marked.parse(src, { async: false }) as string);
  });
}
