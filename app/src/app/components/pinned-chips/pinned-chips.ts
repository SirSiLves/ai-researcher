import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, inject, input } from '@angular/core';

import { PinnedService } from '../../services/pinned.service';

interface ChipRow {
  name: string;
  pinned: boolean;
  active: boolean;
}

@Component({
  selector: 'app-pinned-chips',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="chips">
      <div class="chips__row">
        @if (rows().length === 0) {
          <span class="chips__empty muted italic">No items yet — values appear when today's snapshot loads.</span>
        }
        @for (r of rows(); track r.name) {
          <button type="button"
                  class="chip-btn"
                  [class.is-pinned]="r.pinned"
                  [class.is-active]="r.active"
                  (click)="onChipClick(r.name)">
            <span class="chip-btn__star"
                  [class.is-pinned]="r.pinned"
                  (click)="onStar($event, r.name)"
                  role="button"
                  [attr.aria-label]="(r.pinned ? 'Unpin ' : 'Pin ') + r.name">
              {{ r.pinned ? '★' : '☆' }}
            </span>
            <span class="chip-btn__label">{{ r.name }}</span>
          </button>
        }
        @if (activeFilter()) {
          <button type="button" class="chip-btn chip-btn--clear" (click)="emitFilter(null)">Clear filter</button>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .chips__row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      align-items: center;
    }
    .chips__empty {
      font-family: var(--serif);
      font-size: 0.85rem;
      padding: 0.3rem 0;
    }
    .chip-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.22rem 0.55rem;
      background: var(--bg-soft);
      border: 1px solid var(--line);
      border-radius: 2px;
      color: var(--fg-3);
      font-family: var(--sans);
      font-size: 0.78rem;
      font-weight: 500;
      letter-spacing: 0.01em;
      cursor: pointer;
      transition: background .12s, color .12s, border-color .12s;
    }
    .chip-btn:hover { background: var(--bg); color: var(--fg); border-color: var(--line-2); }
    .chip-btn.is-pinned {
      background: var(--accent-soft);
      border-color: var(--accent);
      color: var(--accent-strong);
    }
    .chip-btn.is-active {
      background: var(--fg);
      color: var(--bg);
      border-color: var(--fg);
    }
    .chip-btn--clear {
      background: transparent;
      border-style: dashed;
    }
    .chip-btn__star {
      font-size: 0.86rem;
      line-height: 1;
      color: var(--fg-4);
      cursor: pointer;
      padding: 0 0.05rem;
    }
    .chip-btn__star.is-pinned { color: var(--accent); }
    .chip-btn.is-active .chip-btn__star { color: inherit; }
    .chip-btn__label { white-space: nowrap; }
  `]
})
export class PinnedChips {
  private readonly pinSvc = inject(PinnedService);

  readonly all = input.required<string[]>();
  readonly activeFilter = input<string | null>(null);

  @Output() readonly filterChange = new EventEmitter<string | null>();

  readonly rows = computed<ChipRow[]>(() => {
    const pinned = this.pinSvc.pinned();
    const today = this.all();
    const all = Array.from(new Set([...pinned, ...today]));
    const active = this.activeFilter();
    return all
      .sort((a, b) => {
        const ap = pinned.includes(a) ? 0 : 1;
        const bp = pinned.includes(b) ? 0 : 1;
        return ap - bp || a.localeCompare(b);
      })
      .map(name => ({
        name,
        pinned: pinned.includes(name),
        active: active === name
      }));
  });

  onStar(ev: MouseEvent, name: string) {
    ev.stopPropagation();
    this.pinSvc.toggle(name);
  }

  onChipClick(name: string) {
    const cur = this.activeFilter();
    this.emitFilter(cur === name ? null : name);
  }

  emitFilter(name: string | null) {
    this.filterChange.emit(name);
  }
}
