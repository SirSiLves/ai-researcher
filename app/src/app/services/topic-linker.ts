/**
 * Topic-linker: rewrites rendered markdown HTML so that the longest
 * topic-label matches become clickable links into /map/topic/:id.
 *
 * The daily digest mentions topics by their label (or fragments of it)
 * dozens of times per page — making those clickable closes the
 * Pulse → Topic detail loop.
 *
 * Matches are case-insensitive but token-bounded (so "AI coding agents"
 * doesn't match inside "non-AI codecs"). We work on rendered HTML rather
 * than raw markdown, but we **skip** text inside existing <a>, <code>,
 * <pre>, and inside attribute values — those are not narrative prose.
 *
 * The output is HTML with synthetic `<a data-topic-id="…" class="topic-link">…</a>`
 * anchors. Wire a host-level (click) handler that intercepts them and
 * routes via Router.navigate(['/map/topic', id]).
 */
import type { RadarTopic } from './data.service';

export interface TopicMatcher {
  /** Pre-sorted by token-length descending so the longest match wins. */
  patterns: Array<{ id: string; tokens: string[]; full: string }>;
}

/** Build a matcher from the topic list on the current radar day. */
export function buildTopicMatcher(topics: readonly RadarTopic[]): TopicMatcher {
  const patterns = topics.map(t => {
    // Strip parenthetical fragments — "(Q2 $10.9B + …)" — they're noise
    // and never appear in the digest prose verbatim.
    const clean = (t.label ?? '').replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
    // Tokens for matching: try the full clean label first, then a few
    // shorter, distinctive variants (split on "—" / "·").
    const variants = new Set<string>();
    if (clean.length >= 4) variants.add(clean);
    for (const part of clean.split(/\s+[—·:]\s+/)) {
      const trimmed = part.trim();
      if (trimmed.length >= 6) variants.add(trimmed);
    }
    return {
      id: t.id,
      full: clean,
      tokens: Array.from(variants).sort((a, b) => b.length - a.length)
    };
  });
  // Sort patterns globally so longer labels win when multiple match the same span.
  patterns.sort((a, b) => b.full.length - a.full.length);
  return { patterns };
}

const SKIP_TAGS = /^(a|code|pre|script|style)$/i;

/** Walk an HTML string and rewrite topic-label occurrences into anchor tags.
 *  Uses DOMParser so we don't touch text inside skip tags or attributes. */
export function linkTopicsInHtml(html: string, matcher: TopicMatcher): string {
  if (!html || !matcher.patterns.length || typeof DOMParser === 'undefined') return html;
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');
  const root = doc.body.firstElementChild as HTMLElement | null;
  if (!root) return html;
  walk(root, matcher);
  return root.innerHTML;
}

function walk(node: Node, matcher: TopicMatcher): void {
  // Recurse into element children, skipping forbidden tags.
  const kids: ChildNode[] = Array.from(node.childNodes);
  for (const child of kids) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      const el = child as Element;
      if (SKIP_TAGS.test(el.tagName)) continue;
      walk(el, matcher);
    } else if (child.nodeType === Node.TEXT_NODE) {
      const text = child.nodeValue ?? '';
      if (!text.trim()) continue;
      const rewritten = rewriteText(text, matcher);
      if (rewritten === text) continue;
      // Replace text node with a fragment whose innerHTML carries the anchors.
      const span = node.ownerDocument!.createElement('span');
      span.innerHTML = rewritten;
      const frag = node.ownerDocument!.createDocumentFragment();
      while (span.firstChild) frag.appendChild(span.firstChild);
      child.parentNode!.replaceChild(frag, child);
    }
  }
}

/** Replace each first occurrence of every token-pattern within `text`,
 *  ordered longest-first to avoid nested matches. Returns escaped HTML. */
function rewriteText(text: string, matcher: TopicMatcher): string {
  // We'll build a tagged interval list, sorted by start, longest-first.
  type Interval = { start: number; end: number; id: string; label: string };
  const intervals: Interval[] = [];
  const lower = text.toLowerCase();
  const used = new Array(text.length).fill(false);

  for (const p of matcher.patterns) {
    for (const token of p.tokens) {
      if (token.length < 4) continue;
      const t = token.toLowerCase();
      let from = 0;
      while (from < lower.length) {
        const i = lower.indexOf(t, from);
        if (i < 0) break;
        const end = i + t.length;
        // Token-boundary check
        const before = i === 0 ? ' ' : text[i - 1];
        const after = end >= text.length ? ' ' : text[end];
        const isBoundaryOk = !/[A-Za-z0-9]/.test(before) && !/[A-Za-z0-9]/.test(after);
        // Don't overlap
        let overlap = false;
        for (let k = i; k < end; k++) { if (used[k]) { overlap = true; break; } }
        if (isBoundaryOk && !overlap) {
          intervals.push({ start: i, end, id: p.id, label: text.slice(i, end) });
          for (let k = i; k < end; k++) used[k] = true;
          break; // only the first occurrence per token
        }
        from = i + 1;
      }
    }
  }

  if (!intervals.length) return text;
  intervals.sort((a, b) => a.start - b.start);

  let out = '';
  let cursor = 0;
  for (const iv of intervals) {
    if (iv.start < cursor) continue;
    out += escapeHtml(text.slice(cursor, iv.start));
    out += `<a class="topic-link" data-topic-id="${escapeAttr(iv.id)}" href="#/map/topic/${encodeURIComponent(iv.id)}">${escapeHtml(iv.label)}</a>`;
    cursor = iv.end;
  }
  out += escapeHtml(text.slice(cursor));
  return out;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, c => c === '&' ? '&amp;' : c === '<' ? '&lt;' : '&gt;');
}
function escapeAttr(s: string): string {
  return s.replace(/[&<>"']/g, c =>
    c === '&' ? '&amp;' :
    c === '<' ? '&lt;' :
    c === '>' ? '&gt;' :
    c === '"' ? '&quot;' : '&#39;');
}
