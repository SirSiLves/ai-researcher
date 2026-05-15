import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Select } from 'primeng/select';
import { Skeleton } from 'primeng/skeleton';
import { Message } from 'primeng/message';
import { Tag } from 'primeng/tag';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'primeng/tabs';

import { DataService, RadarDay, RadarEntry, RadarTopic, RadarSector } from '../../services/data.service';

const STAGE_ORDER = ['emerging', 'consolidating', 'mainstream', 'fading'] as const;
type Stage = typeof STAGE_ORDER[number];

@Component({
  selector: 'app-trends',
  standalone: true,
  imports: [FormsModule, DecimalPipe, Select, Skeleton, Message, Tag, Tabs, TabList, Tab, TabPanels, TabPanel],
  templateUrl: './trends.html',
  styleUrl: './trends.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrendsPage {
  private readonly data = inject(DataService);

  readonly entries = signal<RadarEntry[]>([]);
  readonly selectedDate = signal<string | null>(null);
  readonly day = signal<RadarDay | null>(null);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  readonly options = computed(() =>
    this.entries().map(e => ({
      label: `${e.date_id} — ${e.topic_count} topics${e.stage_movement_count ? ', ' + e.stage_movement_count + ' moves' : ''}`,
      value: e.date_id
    }))
  );

  readonly stages: Stage[] = [...STAGE_ORDER];

  readonly topicsByStage = computed(() => {
    const d = this.day();
    if (!d) return {} as Record<Stage, RadarTopic[]>;
    const groups: Record<string, RadarTopic[]> = {};
    for (const s of this.stages) groups[s] = [];
    for (const t of d.topics) {
      const stage = (this.stages as readonly string[]).includes(t.stage) ? t.stage : 'consolidating';
      (groups[stage] ?? (groups[stage] = [])).push(t);
    }
    for (const s of Object.keys(groups)) {
      groups[s].sort((a, b) => b.score - a.score);
    }
    return groups as Record<Stage, RadarTopic[]>;
  });

  readonly sectors = computed<RadarSector[]>(() => this.day()?.sectors ?? []);

  constructor() {
    this.data.loadRadarIndex()
      .then(idx => {
        const entries = idx.entries.filter(e => !e.is_versioned);
        this.entries.set(entries);
        this.selectedDate.set(entries[0]?.date_id ?? null);
      })
      .catch(err => {
        this.error.set(`Failed to load radar index: ${err.message ?? err}`);
        this.loading.set(false);
      });

    effect(() => {
      const date = this.selectedDate();
      const list = this.entries();
      if (!date || !list.length) return;
      const entry = list.find(e => e.date_id === date);
      if (!entry) return;
      this.loading.set(true);
      this.day.set(null);
      this.data.loadRadarDay(entry.json_path)
        .then(d => { this.day.set(d); this.loading.set(false); })
        .catch(err => {
          this.error.set(`Couldn't load ${entry.json_path}: ${err.message ?? err}`);
          this.loading.set(false);
        });
    });
  }

  stageSeverity(stage: string): 'info' | 'success' | 'warn' | 'secondary' | 'contrast' {
    switch (stage) {
      case 'emerging': return 'warn';
      case 'consolidating': return 'info';
      case 'mainstream': return 'success';
      case 'fading': return 'secondary';
      default: return 'contrast';
    }
  }

  directionIcon(dir: string): string {
    if (dir === 'rising') return 'pi pi-arrow-up';
    if (dir === 'falling') return 'pi pi-arrow-down';
    return 'pi pi-minus';
  }

  directionClass(dir: string): string {
    return dir === 'rising' ? 'rising' : dir === 'falling' ? 'falling' : 'muted';
  }

  topicsInSector(sector: RadarSector): RadarTopic[] {
    const d = this.day();
    if (!d) return [];
    const ids = new Set(sector.topic_ids);
    return d.topics.filter(t => ids.has(t.id)).sort((a, b) => b.score - a.score);
  }
}
