/** Slice a markdown document by H2 (`## `) headings.
 *  Returns each non-empty section as `{ title, body }`.
 *  Title is stripped of leading emoji + whitespace for matching. */
export interface MdSection {
  title: string;
  rawTitle: string;
  body: string;
}

export function sliceByH2(md: string): MdSection[] {
  const lines = md.split('\n');
  const sections: MdSection[] = [];
  let current: MdSection | null = null;
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h2) {
      if (current) sections.push(current);
      const raw = h2[1];
      const clean = raw.replace(/^[\p{Extended_Pictographic}\s]+/u, '').trim();
      current = { title: clean, rawTitle: raw, body: '' };
    } else if (current) {
      current.body += line + '\n';
    }
  }
  if (current) sections.push(current);
  return sections.filter(s => s.body.trim().length > 0);
}

/** Find the first section whose cleaned title matches the regex. */
export function findSection(md: string, regex: RegExp): MdSection | null {
  for (const s of sliceByH2(md)) if (regex.test(s.title)) return s;
  return null;
}

/** Extract the ai-briefing lead block, if present.
 *  The pipeline wraps the lead in `<!-- BRIEFING_START -->` / `<!-- BRIEFING_END -->`
 *  markers inserted right after the H1. Returns the raw markdown between them,
 *  with the lead's own H2 ("## The day/week/month in 90 seconds") stripped so a
 *  caller can render the H2 as its own DOM heading. */
export interface BriefingBlock {
  /** Cleaned H2 title (e.g. "The day in 90 seconds") or null if not present. */
  heading: string | null;
  /** Everything below the H2, trimmed. */
  body: string;
  /** True when the upstream skill marked the lead as degraded. */
  degraded: boolean;
}

const BRIEFING_RE = /<!--\s*BRIEFING_START\s*-->([\s\S]*?)<!--\s*BRIEFING_END\s*-->/;

export function findBriefing(md: string): BriefingBlock | null {
  const m = md.match(BRIEFING_RE);
  if (!m) return null;
  const raw = m[1].trim();
  if (!raw) return null;

  const after = md.slice(m.index! + m[0].length, m.index! + m[0].length + 200);
  const degraded = /<!--\s*BRIEFING_DEGRADED\s*-->/.test(after);

  const lines = raw.split('\n');
  let heading: string | null = null;
  const bodyLines: string[] = [];
  let headingConsumed = false;
  for (const line of lines) {
    if (!headingConsumed) {
      const h2 = line.match(/^##\s+(.+?)\s*$/);
      if (h2) {
        heading = h2[1].replace(/^[\p{Extended_Pictographic}\s]+/u, '').trim();
        headingConsumed = true;
        continue;
      }
      // Allow blank lines or stray comment lines before the H2.
      if (line.trim() === '' || line.trim().startsWith('<!--')) continue;
    }
    bodyLines.push(line);
  }
  return { heading, body: bodyLines.join('\n').trim(), degraded };
}
