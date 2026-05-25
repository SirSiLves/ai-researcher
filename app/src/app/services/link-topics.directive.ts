/**
 * `appLinkTopics` — post-processes the host element's rendered HTML so
 * occurrences of any topic label become clickable links into /map/topic/:id.
 *
 * Designed to layer on top of `[innerHTML]` containers (digest card body,
 * briefing body, raw markdown viewer). It listens for innerHTML mutations
 * and re-runs the rewrite when the bound matcher changes.
 *
 * The rewrite produces `<a class="topic-link" data-topic-id="…" href="#/map/topic/…">`.
 * Click handling: this directive intercepts host-level clicks on those
 * anchors and routes via Router.navigate instead of full-page hash nav,
 * preserving Angular state.
 */
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  effect,
  inject,
  input,
  signal
} from '@angular/core';
import { Router } from '@angular/router';
import { buildTopicMatcher, linkTopicsInHtml, TopicMatcher } from './topic-linker';
import type { RadarTopic } from './data.service';

@Directive({
  selector: '[appLinkTopics]',
  standalone: true
})
export class LinkTopicsDirective implements AfterViewInit, OnDestroy {
  readonly topics = input<readonly RadarTopic[]>([], { alias: 'appLinkTopics' });

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly router = inject(Router);

  /** MutationObserver re-applies the rewrite when the host innerHTML changes
   *  (e.g. when the digest card's `source` input swaps to a new section). */
  private observer: MutationObserver | null = null;
  private rewriting = signal<boolean>(false);
  private lastHash = '';

  constructor() {
    effect(() => {
      // Re-run rewrite when the topic list changes.
      const topics = this.topics();
      void topics;
      this.tryRewrite();
    });
  }

  ngAfterViewInit(): void {
    this.observer = new MutationObserver(() => {
      if (this.rewriting()) return;
      this.tryRewrite();
    });
    this.observer.observe(this.el.nativeElement, { childList: true, subtree: true, characterData: true });
    this.tryRewrite();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('click', ['$event'])
  onClick(ev: MouseEvent): void {
    const target = ev.target as HTMLElement | null;
    if (!target) return;
    const anchor = target.closest('a.topic-link') as HTMLAnchorElement | null;
    if (!anchor) return;
    const id = anchor.getAttribute('data-topic-id');
    if (!id) return;
    // Don't hijack modifier-clicks (let them open in new tab).
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button !== 0) return;
    ev.preventDefault();
    this.router.navigate(['/map/topic', id]);
  }

  private tryRewrite(): void {
    const host = this.el.nativeElement;
    const html = host.innerHTML;
    if (!html) return;
    const topics = this.topics();
    if (!topics.length) return;
    const matcher = buildTopicMatcher(topics);
    if (!matcher.patterns.length) return;
    // De-dupe rewrites: hash on content + topic-count.
    const hash = `${topics.length}:${html.length}:${html.slice(0, 200)}`;
    if (hash === this.lastHash) return;
    this.lastHash = hash;
    const rewritten = linkTopicsInHtmlSafely(html, matcher);
    if (rewritten === html) return;
    this.rewriting.set(true);
    try {
      host.innerHTML = rewritten;
    } finally {
      this.rewriting.set(false);
    }
  }
}

function linkTopicsInHtmlSafely(html: string, matcher: TopicMatcher): string {
  try {
    return linkTopicsInHtml(html, matcher);
  } catch {
    return html;
  }
}
