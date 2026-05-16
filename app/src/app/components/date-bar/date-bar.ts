import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  computed,
  input
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-date-bar',
  standalone: true,
  imports: [FormsModule, ButtonModule, DatePicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="datebar">
      <button pButton type="button" text size="small"
              (click)="emitOlder()" [disabled]="!canOlder()" aria-label="Older day">
        <i class="pi pi-chevron-left"></i>
      </button>
      <p-datepicker [ngModel]="selectedDateValue()"
                    (ngModelChange)="emitPick($event)"
                    [minDate]="minDateValue()!"
                    [maxDate]="maxDateValue()!"
                    [dateFormat]="'yy-mm-dd'"
                    [readonlyInput]="true"
                    [showIcon]="true"
                    appendTo="body"
                    styleClass="datebar__picker"
                    [inputId]="inputId()" />
      <button pButton type="button" text size="small"
              (click)="emitNewer()" [disabled]="!canNewer()" aria-label="Newer day">
        <i class="pi pi-chevron-right"></i>
      </button>
      <button pButton type="button" text size="small"
              (click)="emitLatest()" [disabled]="!canNewer()">Latest</button>
      <span class="muted datebar__count">{{ availableDates().length }} days</span>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .datebar {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.6rem 0.85rem;
      background: var(--bg-soft);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      flex-wrap: wrap;
    }
    .datebar__count { font-size: 0.74rem; margin-left: auto; padding-left: 0.5rem; }
    :host ::ng-deep .datebar__picker .p-inputtext {
      font-family: var(--mono);
      font-size: 0.82rem;
      letter-spacing: 0.01em;
    }
  `]
})
export class DateBar {
  readonly availableDates = input.required<string[]>();
  readonly selectedDate = input<string | null>(null);
  readonly inputId = input<string>('date-bar-input');

  @Output() readonly pickChange = new EventEmitter<string>();

  readonly selectedDateValue = computed(() => {
    const d = this.selectedDate();
    return d ? new Date(d + 'T00:00:00') : null;
  });

  readonly minDateValue = computed(() => {
    const e = this.availableDates();
    return e.length ? new Date(e[e.length - 1] + 'T00:00:00') : null;
  });

  readonly maxDateValue = computed(() => {
    const e = this.availableDates();
    return e.length ? new Date(e[0] + 'T00:00:00') : null;
  });

  readonly canOlder = computed(() => {
    const date = this.selectedDate();
    if (!date) return false;
    const list = this.availableDates();
    const idx = list.indexOf(date);
    return idx >= 0 && idx < list.length - 1;
  });

  readonly canNewer = computed(() => {
    const date = this.selectedDate();
    if (!date) return false;
    return this.availableDates().indexOf(date) > 0;
  });

  emitOlder() {
    const list = this.availableDates();
    const i = list.indexOf(this.selectedDate() ?? '');
    if (i >= 0 && i < list.length - 1) {
      this.pickChange.emit(list[i + 1]);
    }
  }

  emitNewer() {
    const list = this.availableDates();
    const i = list.indexOf(this.selectedDate() ?? '');
    if (i > 0) this.pickChange.emit(list[i - 1]);
  }

  emitLatest() {
    const list = this.availableDates();
    if (list.length) this.pickChange.emit(list[0]);
  }

  emitPick(d: Date | null) {
    if (!d) return;
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (this.availableDates().includes(iso)) this.pickChange.emit(iso);
  }
}
