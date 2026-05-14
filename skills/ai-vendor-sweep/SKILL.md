---
name: ai-vendor-sweep
description: Daily vendor-coverage sweep with AUTO-APPLY. Reads discovered_orgs.json + today's source files + sources.json vendor lists, classifies every org we've seen into promote / watch / silent / hot-event / already-covered tiers, AUTOMATICALLY MUTATES sources.json (adds promotions and hot events, removes expired ones), and emits vendor_candidates/{YYYY}/{MM}/{date}.md as a CHANGE LOG describing what it did. Runs every day after the radar. Spawned by the orchestrator after ai-trend-radar.
---

You are the **vendor-coverage sweep agent**. The user's complaints that motivated this skill:

1. *"we cover always the same enterprises"* — the fixed `priority_vendors` (5 labs) + `enterprise_vendors` (8 cos) blind us to emerging companies.
2. *"i dont want to do that by myself, you need to do that directly"* — recommendations alone aren't enough; the user wants the pipeline to self-maintain.

So this skill does TWO things: (a) classifies every org we've ever seen, and (b) **directly mutates `sources.json`** to add promotions and hot events (and remove expired ones). The user reads the daily change log to know what happened — but doesn't need to apply anything.

## Pipeline position

```
collectors → daily orchestrator → daily/{YYYY}/{MM}/{date}.md
                                + ai-trend-radar → radar/{date}.json (has breadth_orgs_7d per topic)
                                + YOU (ai-vendor-sweep) → vendor_candidates/{date}.md  ← this skill
                                + ai-weekly-digest
```

You read what's already on disk; you don't fetch anything. The radar already extracts orgs from mentions (going forward) — you consume that. The bootstrap script populated `discovered_orgs.json` from existing source files; you maintain it incrementally.

## 1. Setup

- Workspace folder: `/Users/yruosch/Documents/Claude/Projects/AI Researcher/`
- Read `sources.json` `vendor_sweep_config` section for thresholds.
- **Timestamps from the orchestrator footer.** Look for `PIPELINE TIMESTAMPS` and use `TODAY`, `WEEK_ID`, `MONDAY`. Standalone fallback: `eval "$(scripts/now.sh)"`. Do NOT compute the date manually.
- **Output filename:** `vendor_candidates/{YYYY}/{MM}/{date}.md`. Overwrite if exists on the same day (re-running replaces — there's only ever one canonical sweep per day).
- **State file:** `discovered_orgs.json` at workspace root. Read it; mutate it; write it back.

## 2. Read state

In parallel (single message, multiple Read/bash calls):

1. `Read discovered_orgs.json` — running tally of every org we've ever seen.
2. `Read sources.json` — for current priority/enterprise vendor lists and vendor_sweep_config thresholds.
3. **All radar JSONs in last 30 days** — globbed via:
   ```bash
   find radar -type f -name '*.json' -not -name 'index.json' | sort | tail -30
   ```
4. **Today's source files only** (incremental update to the tally):
   ```bash
   find news papers blogs jobs linkedin daily -type f -name "${TODAY}.md" 2>/dev/null
   ```

## 3. Update the org tally incrementally

For each of today's source files:

- Identify which source type it represents from its top directory (`news/` → `tech_news`, `papers/` → `paper`, `blogs/` → `long_form_blog`, `jobs/` → `job_posting_skill_mention`, `linkedin/` → `linkedin_network_post`, `daily/` → `daily_synthesis`).
- Read content. Extract org mentions. Two paths:
  - **Known orgs (already in `discovered_orgs.json.orgs`):** detect via case-insensitive substring of any known alias from the seed (and any aliases the skill has added historically). Increment counters.
  - **New orgs (not in tally):** LLM-extract by reading the file. A "new org" is any company / lab / research institution / public sector body name that appears at least 2 times in the file and that's NOT already in the tally. Add it with `coverage: "uncovered"`, `tier_hint: null` (you'll classify in step 4), `aliases: [the canonical name]`, `discovered_on: {TODAY}`.
- For each mention, append/update:
  ```json
  {
    "first_seen": min(first_seen, file_date),
    "last_seen":  max(last_seen, file_date),
    "total_mentions": existing + new,
    "mentions_by_source_type[src_type]": existing + new,
    "mentions_by_date[file_date]": existing + new,
    "distinct_days": union with file_date,
    "distinct_source_types": union with src_type,
    "context_samples": existing + [one short ±60-char snippet around the first hit in this file]
                       — cap at 6 total samples per org.
  }
  ```
- **Hot-event detection:** when scanning a file for an org, also check if the same paragraph contains any keyword from `vendor_sweep_config.hot_event_keywords`. If yes, record:
  ```json
  "hot_events": [{"date": "{file_date}", "keyword": "Series B", "source_file": "...", "snippet": "..."}]
  ```
  Append-only. Cap at 10 hot events per org (drop oldest).

**Also pull breadth-derived orgs from radar JSONs.** For each radar JSON in the last 30 days, take every `topic.breadth_orgs_7d` entry — if a slug there isn't yet in `discovered_orgs.json.orgs`, add it with `tier_hint: null, coverage: "uncovered"`, `discovered_from: "radar/{date}.json"`. This is how the radar's first-class org extraction feeds back into vendor coverage.

## 3.5. Compute velocity per org

Added 2026-05-14 — addresses user's "vendor velocity is a leading indicator" point. For each org in the tally:

```
velocity_7d         = mentions in the last 7 days
velocity_28d_avg    = (mentions in the last 28 days) / 4   # weekly average over 4-week baseline
velocity_ratio      = velocity_7d / max(velocity_28d_avg, 1.0)
```

Then assign a velocity tag using `radar_config.velocity_config`:

- `velocity_ratio >= velocity_config.hot_event_velocity_threshold` (default 5.0) → `velocity_status: "surging"`. **This contributes to hot_event tier in §4 even without a funding keyword.** Surge alone is a hot signal — something material is happening at this vendor right now.
- `velocity_ratio >= velocity_config.accelerating_ratio` (default 3.0) → `velocity_status: "accelerating"`. Reported in the change log but doesn't auto-trigger hot_event.
- `velocity_ratio <= velocity_config.decelerating_ratio` (default 0.33) → `velocity_status: "cooling"`. Informational. Don't demote silent vendors on this signal alone.
- Otherwise → `velocity_status: "steady"`.

Store these fields on each org in `discovered_orgs.json`:
```json
"velocity_7d": 12,
"velocity_28d_avg": 2.5,
"velocity_ratio": 4.8,
"velocity_status": "accelerating",
"velocity_history": [
  {"date": "2026-05-14", "ratio": 4.8, "status": "accelerating"}
]
```
Cap `velocity_history` at the last 30 entries per org.

## 4. Classify each org into a tier

For every org in `discovered_orgs.json.orgs`, compute its tier *for today's sweep*:

```
window_days = vendor_sweep_config.rolling_window_days  (default 30)
window_start = TODAY - window_days
recent_mentions = sum(mentions_by_date[d] for d in mentions_by_date if d >= window_start)
recent_source_types = { src_type : mentions_by_source_type[src_type] > 0 in window }
recent_distinct_days = { d in mentions_by_date if d >= window_start }
```

**Tier assignment (apply in order, first match wins):**

1. **`covered_healthy`** — org is in `priority_vendors` OR `enterprise_vendors` AND has at least one mention in the last `silence_thresholds.priority_vendor_silent_days` (priority) or `silence_thresholds.enterprise_vendor_silent_days` (enterprise) days. Coverage works; no action.

2. **`covered_silent`** — org is in `priority_vendors` OR `enterprise_vendors` BUT no mention in the silence window. **Flag for review** — either the vendor went quiet (drop them?) or our scrape is broken (broken URL?). Output: "_no topic-relevant mention since {last_seen}; verify blog URL or consider demoting._"

3. **`hot_event`** — org satisfies EITHER:
   - (keyword path) org has ≥ `hot_event_min_thresholds.min_mentions` (default 2) mentions in the window AND at least one `hot_events` entry within `window_days`. Funding rounds and M&A get a vendor on the radar fast.
   - (velocity path, added 2026-05-14) `velocity_status == "surging"` (velocity_ratio ≥ 5.0). The vendor's posting cadence has 5×'d relative to its 4-week baseline — something material is happening. Record the trigger as `hot_event_reason: "velocity surge — ratio X.Y"` instead of a keyword.
   Promotes temporarily (30 days) regardless of total volume.

4. **`promote`** — org is `coverage: "uncovered"` AND:
   - `recent_mentions ≥ promotion_thresholds.min_total_mentions` (default 8)
   - `|recent_source_types| ≥ promotion_thresholds.min_source_types` (default 3)
   - `|recent_distinct_days| ≥ promotion_thresholds.min_distinct_days` (default 4)
   These get a recommended action: "add to `enterprise_vendors` in `sources.json` with `blog_urls: [<blog_url_hint>]`."

5. **`watch`** — org is `coverage: "uncovered"` AND in the watch range:
   - `watch_thresholds.min_total_mentions ≤ recent_mentions ≤ watch_thresholds.max_total_mentions` (defaults 3..7)
   Not yet promotable but trending. Show in a separate section.

6. **`informal_covered`** — org is in `vendor_blogs`, `governance_sources`, `long_form_blogs`, etc. (URL-only lists). It IS covered but at a lower tier than priority/enterprise. Don't flag unless silent.

7. **`dormant`** — everything else. Tracked but uninteresting today.

Set `last_classification: "{tier}"` and `last_classified_at: "{TODAY}"` on each org. Also append to `classification_history` (cap at last 14 entries):
```json
{"date": "{TODAY}", "tier": "{tier}"}
```
`classification_history` is what powers the sustained-signal gate in §6 (auto-apply): a `promote` tier must hold for ≥ `auto_apply.auto_promote.min_consecutive_days_at_promote` consecutive days before the skill mutates `sources.json`.

## 5.5. Auto-apply: mutate sources.json

This is the new step (added 2026-05-14). Read `radar_config.vendor_sweep_config.auto_apply`. If `auto_apply.enabled` is false, **skip this section entirely** — the skill behaves as a recommender only.

Otherwise:

**Step A — Backup.** If we're about to write to sources.json, first `cp sources.json sources.json.bak` (overwrites previous backup). This is the rollback button.

**Step B — Compute the change set.** Build a `changes` dict with four lists:

- `promotions_to_add`: orgs classified `promote` today AND whose `classification_history` contains `promote` for ≥ `auto_promote.min_consecutive_days_at_promote` (default 2) consecutive days ending today.
- `hot_events_to_add`: orgs classified `hot_event` today that are NOT already in `enterprise_vendors`. (No sustained-day requirement.)
- `expired_to_remove`: enterprise_vendors entries where `_auto_added: true` AND `_expires_on < TODAY`. (Manual entries never touched, even if expired.)
- `auto_demotions_to_remove`: ONLY if `auto_demote.enabled` is true (default false), orgs classified `covered_silent` that are auto-added.

**Step C — Apply the change set to sources.json.** Read sources.json. For each promotion / hot event addition, write into `news_collector.enterprise_vendors.{slug}`:

```json
{
  "blog_urls": ["{blog_url_hint from discovered_orgs.json}"],
  "research_urls": [],
  "fallback_search": "site:{primary_domain} 2026 (announcement OR release OR launch)",
  "_auto_added": true,
  "_added_on": "{TODAY}",
  "_added_reason": "promote: 23 mentions, 4 source types, 6 distinct days over 28d"
}
```

For hot events, additionally set `"_expires_on": "{TODAY + auto_hot_event.ttl_days}"`.

For removals, delete the matching key from `enterprise_vendors`. Only proceed if the entry has `_auto_added: true` — under no circumstances modify a manually-added entry.

After all edits, validate the JSON parses (do a JSON round-trip in your head: if the result wouldn't be valid JSON, abort and write nothing). Write back to sources.json.

**Step D — Audit log.** Append a line per change to `vendor_changes.log` (text file, append-only, never truncated):

```
2026-05-14T20:08:00 promote-add  xai                  blog_urls=["https://x.ai/news"]                          reason="promote: 123 mentions, 3 src types, 13 days"
2026-05-14T20:08:00 hot-event-add tomoro              blog_urls=["https://www.tomoro.ai"]    expires=2026-06-13 reason="$4B JV with OpenAI"
2026-05-14T20:08:00 expire-remove glean                                                                          reason="hot event TTL elapsed"
```

One line per change. ISO timestamp + verb + slug + payload + reason. This is the running history of what the auto-applier did — never deleted, never edited.

**Step E — Update discovered_orgs.json.** For every org we just promoted, set `coverage: "enterprise"` and `auto_applied_on: "{TODAY}"`. For removals, set back to `coverage: "uncovered"` (or `"informal_url_list"` if the host matches a URL list) and note `removed_on: "{TODAY}"` with the reason.

## 5. Write `vendor_candidates/{YYYY}/{MM}/{TODAY}.md` — a CHANGE LOG

This file describes what the auto-applier did today and what's pending. The user reads it for situational awareness, NOT to take action.

```markdown
# Vendor sweep — {TODAY}

_Daily change log. The pipeline auto-maintains `sources.json` — promotions and hot events are added directly, expired hot events are removed. This page describes what happened. To roll back a single run: `cp sources.json.bak sources.json`._

## 📋 What changed in sources.json today

If anything was applied:
- **Added {N} promotion(s):** list each with slug, blog_urls, reason, sustained-day proof.
- **Added {N} hot-event vendor(s):** list each with slug, trigger keyword, expires_on, snippet.
- **Removed {N} expired hot-event entry(s):** list each with slug, reason it expired.
- **Skipped {N} silent vendor(s):** list each — auto-demote is disabled by default; flagged for manual review only.

If nothing was applied:
_No changes to `sources.json` this run._

## ⏳ Pending — needs one more day at promote tier ({N})
Orgs that hit promote thresholds today but haven't yet held that tier for the required {min_consecutive_days} consecutive days. Will auto-apply tomorrow if they stay at promote.

**{slug}** — {recent_mentions} mentions, {recent_source_types_count} src types, days at promote so far: {consecutive_days}/{required}

## ⚡ Velocity signals ({N accelerating} accelerating, {N cooling} cooling)
Orgs whose posting cadence has changed significantly. Independent of tier.

**Accelerating ({N}):**
**{slug}** — velocity_ratio {ratio}× ({velocity_7d} mentions/7d vs. {velocity_28d_avg}/wk baseline) · {status_implication}

Implications by status:
- `surging` (ratio ≥ 5.0): auto-applied to hot_event tier; expect material announcement within days
- `accelerating` (ratio ≥ 3.0): informational; watch closely tomorrow
- `cooling` (ratio ≤ 0.33): informational; not a demote trigger

## 👀 Watch list ({N})
Orgs trending upward but below promotion thresholds. Cap at `max_watch_per_run` (default 20).
**{slug}** — {recent_mentions} mentions / {src_types} src types · velocity {ratio}× · {tier_hint}

## ⚠️ Silent covered vendors ({N})
Vendors on lists whose blogs haven't surfaced mentions in {silence_days}+ days. Auto-demote is disabled — these stay on the list. Skip section if empty.
**{slug}** — last mention {last_seen}, threshold {threshold}d. Suggestion: verify blog URL, or set `auto_apply.auto_demote.enabled = true` if you want auto-removal.

## Tally summary
- Orgs tracked: {total}
- Covered (priority): {count}
- Covered (enterprise — incl. {N} auto-added): {count}
- Covered (informal URL list): {count}
- Uncovered: {count}
- New orgs added to tally today: {count}
- Hot events recorded today: {count}

## Sources scanned this run
- discovered_orgs.json (last_updated {prev})
- Today's source files: {list}
- Radar JSONs in window: {count}
- sources.json snapshot before edit → sources.json.bak ({applied_changes_count} change(s) applied)
```

Target: 100-250 lines. The change log is short by design — most days the answer is "added 1 thing, removed 0, nothing else of note." That's healthy.

## 6. Write `discovered_orgs.json` back

Update `last_updated: {TODAY}`. Write the full tally including any updates from §5 (last_classification, classification_history, auto_applied_on, removed_on). Sort `orgs` keys alphabetically for stable diffs.

## 7. Update `index.md`

Find `<!-- VENDOR_START -->`. Insert (or replace today's existing line) directly after the marker:

```markdown
- [{TODAY}](vendor_candidates/{YYYY}/{MM}/{TODAY}.md) — applied: {N} promotions, {N} hot, {N} expired; pending: {N}; watch: {N}; silent: {N}
```

**Replace-don't-append behavior:** if there's already an entry for `{TODAY}` in the vendor section, update that line in-place. Otherwise insert directly after the start marker (newest first).

## 8. Finish

One-line confirmation:
`Saved vendor_candidates/{YYYY}/{MM}/{TODAY}.md. Auto-applied: +{N_promote_added} promotions, +{N_hot_added} hot events, -{N_expired} expired. Tally has {total_orgs} orgs ({N_enterprise_auto} auto-added of {N_enterprise_total} enterprise). sources.json {modified|unchanged}.`

Do NOT post the change log to chat. Do NOT modify any source files (`news/`, `blogs/`, etc.) or the radar / weekly outputs — those are read-only inputs.

## Constraints & quality bar

- **Org slug stability.** Once an org has a slug, it never changes. Add aliases to the existing entry if you find new ways the company is referenced.
- **No hallucinated mentions.** Every count must trace back to a file you read this run (or to historical entries in `discovered_orgs.json` from previous runs).
- **Lowercase, kebab-case slugs.** `goldman-sachs`, not `Goldman Sachs` or `GoldmanSachs`.
- **Coverage = trust, not depth.** A vendor being in `vendor_blogs` (informal URL list) counts as `informal_covered` — don't auto-promote them again unless they hit hot-event triggers.
- **The sweep is daily, not Monday.** Silence and promotion windows are still measured in days (30/45/60), but the analysis runs every day so a new hot event surfaces within 24 hours and sources.json reflects it tomorrow.
- **Manual entries are sacred.** Any `enterprise_vendors` entry without `_auto_added: true` is manual — never modify it, never remove it, even if it goes silent or hits an expiry condition. The auto-applier touches ONLY entries it added itself.
- **`priority_vendors` is sacred too.** The auto-applier NEVER writes to `priority_vendors`. Promotions go to `enterprise_vendors`. Manual elevation from enterprise → priority is the user's call.
- **`covered_silent` triggers a flag, not an auto-removal.** Auto-demote stays disabled by default to prevent removing a vendor whose blog URL just briefly 503'd.
- **Hot events are temporary.** They get `_expires_on = TODAY + ttl_days` at insertion. The next sweep that observes an expired hot event removes the entry. If the same org meanwhile crossed sustained promote thresholds, it'd already have been re-added without the expiry — so the removal is harmless.
- **JSON validity is mandatory.** Before writing sources.json, parse the result. If parsing fails, abort the write, log to `vendor_changes.log` as `ABORT-INVALID-JSON`, and continue with the markdown report only.
- **Backup before write.** Always `cp sources.json sources.json.bak` before modifying sources.json. One step of rollback is always available.
- **Audit trail.** Every mutation appends a line to `vendor_changes.log`. The log is append-only — never truncated.

## How to disable auto-apply

If you ever want this skill to revert to "recommendations only" mode (manual review like the original design), set in `sources.json`:

```json
"radar_config": {
  "vendor_sweep_config": {
    "auto_apply": {
      "enabled": false
    }
  }
}
```

The skill will then write the change log without mutating sources.json (the markdown section "What changed today" will instead say "Auto-apply disabled — these are the changes the sweep WOULD have made"). Re-enabling resumes auto-application from the next run.
