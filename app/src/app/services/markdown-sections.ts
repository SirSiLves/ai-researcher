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
