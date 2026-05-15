import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-markdown-viewer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="markdown" [innerHTML]="rendered()"></div>`
})
export class MarkdownViewer {
  readonly source = input<string>('');
  readonly sanitize = input<boolean>(true);

  private readonly sanitizer: DomSanitizer;
  constructor(sanitizer: DomSanitizer) { this.sanitizer = sanitizer; }

  readonly rendered = computed<SafeHtml>(() => {
    const src = this.source() ?? '';
    if (!src) return '';
    const html = marked.parse(src, { async: false }) as string;
    return this.sanitize() ? this.sanitizer.bypassSecurityTrustHtml(html) : html;
  });
}
