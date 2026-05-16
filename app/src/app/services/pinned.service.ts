import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'air.pinned-chips.v1';

@Injectable({ providedIn: 'root' })
export class PinnedService {
  readonly pinned = signal<string[]>([]);

  constructor() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) this.pinned.set(parsed.filter(x => typeof x === 'string'));
      }
    } catch { /* ignore */ }
  }

  toggle(name: string) {
    const cur = this.pinned();
    const next = cur.includes(name) ? cur.filter(n => n !== name) : [...cur, name];
    this.pinned.set(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  }

  isPinned(name: string): boolean {
    return this.pinned().includes(name);
  }

  clear() {
    this.pinned.set([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }
}
