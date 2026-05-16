# Data audit — what's loaded vs displayed

Snapshot 2026-05-15. Cross-checked DataService types, sample JSON, every page template.

## Today page
- **Shown**: date, headline, formatted date, markdown digest, "Older/Newer/Archive" nav, Briefing block.
- **Briefing block surfaces**: stage_movements, surging direction, sectors_spawned_today, sectors_dissolved_today, high_breadth topics.
- **Missing surface (small lift)**: `prior_radar` reference (so a reader can compare "today vs yesterday's snapshot"). `background_topics_count` (3 today) is loaded but never shown — a single small line "3 topics in background" would give context to the radar count.

## Radar page
- **Shown**: 37 topics, 9 clusters, rising/fading counts, cluster grid, polar chart, alternate scatter, loudest topics table, date bar + maturity badge, sector chips.
- **Missing**:
  - `sector_movements` (sector-level transitions) — currently unused on Radar. Cross-link to Movements.
  - `background_topics_count` — never shown.
  - `convergence_multiplier_applied` per topic — used by the radar engine, valuable in the topic drawer.
  - `momentum_7d_pct` — useful for the "vs 7d" delta in the topic drawer. Already in the interface but not rendered.

## Sectors page
- **Shown**: sector cards with name / topic_count / active_orgs / description / first 8 topics with direction dot + score.
- **Missing**:
  - `consecutive_low_days` (sector ageing) — exists, never shown.
  - `first_seen` per sector — exists, never shown. Helps user understand sector maturity.

## Movements page
- **Shown**: stage transitions grouped by `to`, editor's markdown note.
- **Missing**:
  - `sectors_spawned_today` / `sectors_dissolved_today` — sector-level movements never on Movements page (only briefing). Belongs here.
  - `sector_movements` list — exists in JSON, currently unused.

## Firms list
- **Shown**: slug, tier, V7d, 14-day spark, status (p-tag), total_mentions, top_topics[0].
- **Missing**:
  - `region` is in the index but never shown in the table.
  - `coverage` (priority/enterprise/dormant…) not shown except as priority chip — `coverage_silent` orgs hidden by the same chip.

## Firm detail page
- **Shown**: tier_hint, region, coverage, total_mentions, distinct_days, blog_url_hint, velocity stats, velocity history chart, source mix, topic mix, radar appearances (7 most recent), hot_events, classification_history, context samples.
- **Missing (high value)**:
  - `aliases` — array like `['Anthropic','Claude','Claude Opus','Claude Haiku','Claude Sonnet']`. Worth showing in a small line so users understand why a firm has 4 000+ mentions (it includes its products).
  - `mentions_by_date` (62 entries for Anthropic) — far better signal than the 31-day velocity history. Currently NOT rendered. A daily bar/spark chart over the full 62 days would be a single high-impact addition.
  - `first_seen` / `last_seen` — never shown. Useful for "how mature is this org in our coverage".
  - `distinct_source_types` — list of which collectors have ever seen this org. Currently we show percent breakdown but not the binary "covered by X collector types" list. Small addition.

## Sweeps page
- **Shown**: tabs for vendor/keyword/github, recent runs rail, rendered markdown of selected run.
- **Missing**:
  - No summary numbers anywhere. Could show "today: 0 promotions, 6 hot-events rejected" inline. That's parsed-out of the markdown today, but a tiny structured strip would help.

## Library / Archive
- Both already exhaustive. Archive groups by month; Library tables every cadence. Nothing missing.

---

# Recommended additions, ranked

1. **Firm: full `mentions_by_date` bar chart** (62 days). Biggest signal upgrade — shows arc, not just last 31 days.
2. **Firm: aliases line** under the title. Cheap to add, explains the volume.
3. **Movements: sector spawns / dissolutions block**. The data is there, the page exists for "movements", the spawns belong here.
4. **Topic drawer / page: `momentum_7d_pct` + `convergence_multiplier_applied`**. Two more numeric stats next to the existing four.
5. **Sectors: `first_seen` + `consecutive_low_days` meta** in the card meta line. One small line per card.
6. **Radar: `background_topics_count` line** ("+3 in background") next to the topic count in the route bar meta.

Items 1–3 are the high-leverage UX gaps. 4–6 are filler that costs <30 lines each.
