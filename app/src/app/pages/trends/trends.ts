import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';

import { DataService } from '../../services/data.service';
import { MarkdownViewer } from '../../components/markdown-viewer/markdown-viewer';
import { PageHeader } from '../../components/page-header/page-header';

/**
 * Long-arc trends view.
 *
 * Renders `data/trends.md` — the three-layer ledger maintained by the
 * ai-trends pipeline skill:
 *   1. "Now" snapshot (4-6 sentence current state)
 *   2. Themed timelines (per-theme arcs with dated waypoints)
 *   3. Per-month log (compact dated bullets)
 *
 * This is the answer to "how is the AI/GenAI field changing over months/years"
 * — independent of the daily radar, which is a 30-day rolling instrument.
 */
@Component({
  selector: 'app-trends-arc',
  standalone: true,
  imports: [RouterLink, Skeleton, MarkdownViewer, PageHeader],
  templateUrl: './trends.html',
  styleUrl: './trends.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrendsPage {
  private readonly data = inject(DataService);

  readonly markdown = signal<string>('');
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  /** Extract section anchors from the markdown so the side rail can deep-link. */
  readonly themes = computed<string[]>(() => {
    const md = this.markdown();
    if (!md) return [];
    const out: string[] = [];
    for (const line of md.split('\n')) {
      const m = line.match(/^### (.+)/);
      if (m) out.push(m[1].trim());
    }
    return out;
  });

  readonly nowSnapshot = computed<string>(() => {
    const md = this.markdown();
    if (!md) return '';
    // Grab everything between "## Now — YYYY-MM" and the first "---"
    const m = md.match(/##\s+Now\s+—\s+\d{4}-\d{2}\s*\n+([\s\S]*?)\n+---/);
    return m ? m[1].trim() : '';
  });

  readonly nowMonth = computed<string>(() => {
    const md = this.markdown();
    const m = md.match(/##\s+Now\s+—\s+(\d{4}-\d{2})/);
    return m ? m[1] : '';
  });

  constructor() {
    this.data.loadMarkdown('trends.md')
      .then(text => {
        this.markdown.set(text);
        this.loading.set(false);
      })
      .catch(err => {
        this.error.set(`Couldn't load trends.md — ${err?.message ?? err}`);
        this.loading.set(false);
      });
  }

  scrollTo(theme: string): void {
    const slug = theme.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    // marked.js generates id="theme-name" from h3 text by default — match that.
    const el = document.getElementById(slug);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
