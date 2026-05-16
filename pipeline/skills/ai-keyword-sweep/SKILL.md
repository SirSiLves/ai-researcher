---
name: ai-keyword-sweep
description: Daily keyword/topic-coverage sweep with AUTO-APPLY. Same architecture as ai-vendor-sweep, applied to keywords instead of orgs. Mines today's source files for n-gram phrases NOT yet in any keyword list (news web_search_queries, radar topic_taxonomy_seed, hackernews filter_keywords, linkedin pulse_topic_queries / hashtags). Classifies them, auto-applies promotions to `sources.json`, removes expired entries, writes a daily change log.
---

> **Path resolution.** CWD when this skill runs is `data/`. Every cadence — `daily/`, `weekly/`, `monthly/`, `radar/`, `orgs/`, `reports/`, `news/`, `papers/`, `blogs/`, `jobs/`, `linkedin/`, `github/`, `hackernews/`, `vendor_candidates/`, `keyword_candidates/`, `github_candidates/`, `index.md` — is a sibling directly under `data/`. Output paths are bare (no `publish/` or `research/` prefix).
>
> **State files** (`sources.json`, `discovered_orgs.json`, `discovered_keywords.json`, `github_stars.json`, `vendor_changes.{json,log}`, `keyword_changes.{json,log}`, `github_changes.{json,log}`, `sources.json.{vendor,keyword,github}.bak`) live at `../pipeline/state/<filename>`. Helper scripts at `../pipeline/scripts/<name>.py` invoked as `python3 ../pipeline/scripts/<name>.py`. Other SKILLs at `../pipeline/skills/<name>/SKILL.md`.

You are the **keyword-coverage sweep agent**. The user's complaint that motivated this skill:

> "Currently the keywords which are going to be searched. If we just always use the same words, perhaps we will important things missing too."

This is the same risk shape as the vendor sweep — frozen lists go stale. The solution is the same: discover candidates, classify them, auto-apply with safeguards, audit every mutation, allow one-step rollback.

## Pipeline position

```
collectors → daily orchestrator → daily/{date}.md
                                + ai-trend-radar → radar/{date}.json
                                + ai-vendor-sweep → vendor_candidates/{date}.md (mutates orgs)
                                + ../pipeline/scripts/build_org_view.py → orgs/*.json
                                + YOU (ai-keyword-sweep) → keyword_candidates/{date}.md (mutates keywords)
                                + ai-weekly-digest
```

You read what's on disk; you don't fetch anything. Your inputs are the same source-file tree the radar and vendor sweep already process.

## 1. Setup

- Workspace folder (CWD when invoked by the orchestrator): `/Users/yruosch/Documents/Claude/Projects/AI Researcher/data/`. All paths in this skill are relative to that — every cadence is a sibling directly under `data/`.
- Read `sources.json` `keyword_sweep_config` section for thresholds. If the section doesn't exist yet, the skill bootstraps it with defaults (see §1.5) — write it back to `sources.json` and continue.
- **Timestamps from the orchestrator footer.** Look for `PIPELINE TIMESTAMPS` and use `TODAY`, `WEEK_ID`, `MONDAY`. Standalone fallback: `eval "$(../pipeline/scripts/now.sh)"`. Do NOT compute the date manually.
- **Output filename:** `keyword_candidates/{YYYY}/{MM}/{date}.md`. Overwrite if exists on the same day (re-runs replace — one canonical sweep per day, same as the vendor sweep).
- **State file:** `discovered_keywords.json` at workspace root. Read it; mutate it; write it back.
- **Audit log:** `keyword_changes.log` at workspace root. Append-only.

## 1.5. Default config

If `sources.json.keyword_sweep_config` is missing, add this block on the first run:

```json
{
  "_comment": "Auto-extension of keyword lists. Same architecture as vendor_sweep_config — discovery → sustained-day gate → auto-apply to the relevant section of sources.json. Manual entries are sacred; auto-added entries carry _auto_added markers and can be expired/rolled back.",
  "enabled": true,
  "rolling_window_days": 30,
  "ngram_sizes": [2, 3],
  "min_ngram_chars": 6,
  "max_candidates_per_run": 200,
  "stopwords": [
    "the", "and", "for", "with", "this", "that", "from", "into", "their", "have", "been",
    "they", "what", "which", "your", "more", "than", "when", "will", "also", "such",
    "make", "made", "make", "over", "after", "before", "between", "while", "since",
    "about", "above", "below", "where", "there", "these", "those", "would", "could",
    "should", "might", "still", "very", "much", "just", "only", "even", "really"
  ],
  "promotion_thresholds": {
    "min_total_mentions": 6,
    "min_source_types": 3,
    "min_distinct_days": 4,
    "min_consecutive_days_at_promote": 2,
    "_note": "Lower than vendor-sweep promote thresholds (8/3/4/2) because keyword n-grams are inherently noisier than org-name matches — a 3-mention phrase across 3 source types over 3 days is a stronger signal for a topic than for an org. Tune up if false-positives appear."
  },
  "watch_thresholds": {
    "min_total_mentions": 3,
    "max_total_mentions": 5
  },
  "target_lists": {
    "_note": "Each candidate gets a tier_hint computed from where it appears. Multi-tier candidates (e.g. a phrase that shows up in news AND on hn AND in radar topics) get promoted to multiple lists in one sweep. Manual lists are never modified; only matching _auto_added entries are touched.",
    "news_web_search_queries": {
      "section_path": "news_collector.web_search_queries",
      "tier_hint_match": "appears in news/ source files at least 50% of its mentions",
      "format": "raw phrase (e.g. 'agentic provenance')"
    },
    "radar_topic_taxonomy": {
      "section_path": "radar_config.topic_taxonomy_seed._auto_added",
      "tier_hint_match": "appears across ≥3 source types (cross-source convergence is the radar's promotion gate)",
      "format": "raw phrase added to a new '_auto_added' group inside topic_taxonomy_seed"
    },
    "hackernews_filter_keywords": {
      "section_path": "hackernews_collector.filter_keywords",
      "tier_hint_match": "appears in hackernews/ source files OR (in news/ AND has ≥2 distinct days)",
      "format": "lowercase keyword"
    },
    "linkedin_pulse_queries": {
      "section_path": "linkedin_collector.pulse_topic_queries",
      "tier_hint_match": "appears in linkedin/ source files",
      "format": "phrase with optional #hashtag prefix if it appears with one"
    }
  },
  "auto_apply": {
    "enabled": true,
    "ttl_days_for_hot_candidates": 30,
    "auto_demote": {
      "enabled": false,
      "_note": "Disabled by default. When enabled, _auto_added keywords that haven't surfaced in the rolling window get removed — but see proven_keywords_protection below for the exception that keeps long-history keywords forever."
    }
  },
  "proven_keywords_protection": {
    "_purpose": "Keywords that have proven themselves over time become PERMANENT — they anchor long-term trend recognition. A keyword that went quiet during a slow stretch must still be on the search list when the topic re-emerges, so the re-emergence registers as continuation of an existing arc (visible in radar score_180d_ago, momentum charts) rather than as a brand-new topic. Without this protection, our long-history would erode every quarter.",
    "promotion_to_proven_thresholds": {
      "min_distinct_days_lifetime": 14,
      "min_source_types_lifetime": 4,
      "min_age_days": 30,
      "_note": "A keyword that has appeared on ≥14 distinct days, across ≥4 source types, AND has been tracked for ≥30 days is promoted from _auto_added to _proven. _proven entries are NEVER auto-removed, regardless of auto_demote setting or current activity."
    },
    "manual_entries_are_proven_by_default": true,
    "_protection_rule": "When the skill encounters a phrase that meets promotion_to_proven_thresholds, it MOVES the registry entry from {section}._auto_added_meta to {section}._proven_meta and flags it in discovered_keywords.json as 'tier_lifetime: proven'. The flat list keeps the phrase as before (the news collector / radar / etc. don't care about the registry tier). Only expiry/removal logic checks _proven status."
  },
  "hot_topic_keywords": [
    "announcement", "release", "launch", "ships", "ga", "general availability",
    "open source", "open-source", "open weight", "open-weight",
    "valuation", "funding", "series", "ipo", "acquired", "acquires",
    "benchmark", "eval", "evaluation", "outperforms", "matches", "beats"
  ]
}
```

Write this back to `sources.json` (using the same backup-then-validate-JSON pattern the vendor sweep uses) and continue.

## 2. Read state

In parallel (single message, multiple Read/bash calls):

1. `Read discovered_keywords.json` if it exists. Schema:
   ```json
   {
     "last_updated": "2026-05-14",
     "keywords": {
       "agentic-provenance": {
         "first_seen": "2026-05-08",
         "last_seen": "2026-05-14",
         "total_mentions": 14,
         "distinct_days": 5,
         "mentions_by_source_type": {"tech_news": 8, "long_form_blog": 4, "paper": 2},
         "mentions_by_date": {"2026-05-08": 2, "2026-05-10": 3, "2026-05-12": 4, "2026-05-14": 5},
         "context_samples": ["…provenance graph…  (news/...)"],
         "current_tier": "promote",
         "classification_history": [
           {"date": "2026-05-12", "tier": "watch"},
           {"date": "2026-05-13", "tier": "promote"},
           {"date": "2026-05-14", "tier": "promote"}
         ],
         "applied_to_lists": ["news_web_search_queries", "radar_topic_taxonomy"],
         "applied_on": "2026-05-14"
       }
     }
   }
   ```
   If absent, initialize with `{"last_updated": "{TODAY}", "keywords": {}}`.

2. `Read sources.json` — for current keyword lists and `keyword_sweep_config` thresholds.

3. **Today's source files only** (incremental update):
   ```bash
   find news papers blogs jobs linkedin daily github hackernews -type f -name "${TODAY}.md" 2>/dev/null
   ```

4. **All existing keyword lists** (so we don't propose duplicates). Build the union set:
   ```python
   covered = set()
   covered |= set(sources['news_collector']['web_search_queries'])
   for group in sources['radar_config']['topic_taxonomy_seed'].values():
       if isinstance(group, list): covered |= set(group)
   covered |= set(sources['hackernews_collector']['filter_keywords'])
   covered |= set(sources['linkedin_collector'].get('pulse_topic_queries', []))
   # Lowercase for matching
   covered_lc = {x.lower() for x in covered}
   ```

## 3. Mine n-grams from today's source files

For each of today's source files:

- Read the file's content.
- Lowercase everything.
- Strip URLs, markdown link syntax, code fences, frontmatter blocks.
- Tokenize on whitespace and punctuation; drop tokens with non-letter characters.
- Generate 2-grams and 3-grams over the token stream.
- Skip n-grams where ANY token is in `stopwords` or shorter than 3 chars.
- Skip n-grams whose concatenated phrase length is < `min_ngram_chars` (default 6).
- Skip n-grams that already appear in `covered_lc` (case-insensitive substring match — "agent protocol" already covered if "agent protocols" is in the list).
- For each remaining n-gram, increment counters:
  ```python
  candidate[phrase]['mentions_by_source_type'][src_type] += 1   # per file, not per occurrence
  candidate[phrase]['mentions_by_date'][file_date] += 1
  candidate[phrase]['total_mentions'] += occurrence_count_in_file
  ```
- Capture one ±60-char context snippet for each new phrase (max 4 samples per phrase total in `discovered_keywords.json`).

**Cap at `max_candidates_per_run` (default 200)** — sort by `total_mentions × distinct_source_types` and take the top 200. Beyond that you're mining noise.

## 4. Merge into discovered_keywords.json (incremental update)

For each mined candidate from §3:

- If phrase exists in `discovered_keywords.keywords`: merge — add today's counts to existing tallies, update `last_seen`, append to `classification_history`.
- If phrase is new: add with `first_seen: {TODAY}`, `last_seen: {TODAY}`, fresh tallies.

## 5. Classify each candidate

Compute `tier` per candidate, same shape as the vendor sweep:

```
window_days = keyword_sweep_config.rolling_window_days  (default 30)
window_start = TODAY - window_days
recent_mentions = sum(mentions_by_date[d] for d in mentions_by_date if d >= window_start)
recent_source_types = { src_type : mentions_by_source_type[src_type] > 0 in window }
recent_distinct_days = { d in mentions_by_date if d >= window_start }
```

**Tier assignment (apply in order, first match wins):**

1. **`already_applied`** — phrase has `applied_to_lists` non-empty AND every target list it was promoted to still contains it (check `sources.json`). No action.

2. **`hot_topic`** — candidate co-occurs in the same paragraph with any keyword in `keyword_sweep_config.hot_topic_keywords` AND has `recent_mentions ≥ 2`. Auto-applies to relevant target lists with `_expires_on = TODAY + ttl_days_for_hot_candidates` (default 30). Examples: a phrase appearing in announcement/release/launch contexts gets onto the watch list fast.

3. **`promote`** — uncovered phrase AND:
   - `recent_mentions ≥ promotion_thresholds.min_total_mentions` (default 6)
   - `|recent_source_types| ≥ promotion_thresholds.min_source_types` (default 3)
   - `|recent_distinct_days| ≥ promotion_thresholds.min_distinct_days` (default 4)
   AND held `promote` tier for ≥ `min_consecutive_days_at_promote` (default 2) consecutive days ending today.

4. **`watch`** — uncovered phrase in the watch range:
   - `watch_thresholds.min_total_mentions ≤ recent_mentions ≤ watch_thresholds.max_total_mentions` (defaults 3..5)
   No action; surfaces in the change log.

5. **`dormant`** — everything else.

Set `current_tier` and append to `classification_history` (cap at last 14 entries):
```json
{"date": "{TODAY}", "tier": "{tier}"}
```

## 6. Compute target lists per candidate

For each candidate classified `promote` or `hot_topic`, determine which lists it should be added to using `target_lists.*.tier_hint_match`:

- **news_web_search_queries** — if ≥ 50% of its mentions are in `news/` files.
- **radar_topic_taxonomy** — if it appears across ≥ 3 distinct source types (cross-source convergence).
- **hackernews_filter_keywords** — if it appears in `hackernews/` files OR (in `news/` AND has ≥ 2 distinct days).
- **linkedin_pulse_queries** — if it appears in `linkedin/` files.

A single candidate can match multiple targets — promote to all that match. Record in `applied_to_lists`.

## 6.5. Promote long-history keywords to PROVEN status

This step is the load-bearing mechanism for the user's "keep old, proven keywords to recognize trends" requirement.

For every entry in `discovered_keywords.keywords`, check whether it qualifies for proven status:

```
lifetime_distinct_days = | set(mentions_by_date keys) |
lifetime_source_types  = | set(mentions_by_source_type keys) |
age_days               = TODAY - first_seen
```

If ALL of:
- `lifetime_distinct_days ≥ proven_keywords_protection.promotion_to_proven_thresholds.min_distinct_days_lifetime` (default 14)
- `lifetime_source_types ≥ proven_keywords_protection.promotion_to_proven_thresholds.min_source_types_lifetime` (default 4)
- `age_days ≥ proven_keywords_protection.promotion_to_proven_thresholds.min_age_days` (default 30)
- The keyword is currently in at least one target list (i.e. was previously promoted)
- The keyword is NOT already `tier_lifetime: proven`

Then:
1. Set `tier_lifetime: "proven"` on the entry in `discovered_keywords.json`.
2. For every target list this keyword appears in: MOVE its registry entry from `{section}._auto_added_meta` to `{section}._proven_meta`. The flat list entry stays untouched (collectors don't care about the registry tier).
3. Record the promotion in `proven_promotions` (return value of this step) for inclusion in the change log.

`_proven` entries are NEVER auto-removed. Even if `auto_demote.enabled` becomes true later, even if the rolling window shows zero recent mentions, the keyword stays — because its long history is the anchor that lets us recognize re-emergence as continuation.

Manual entries (anything not in a `_auto_added_meta` or `_proven_meta` registry) are treated as PROVEN by default. They were added by hand; they stay by hand.

This step does NOT mutate `sources.json`. It only mutates `discovered_keywords.json` (the registry move happens in §7C as part of the unified sources.json write).

## 7. Auto-apply: mutate sources.json

Read `keyword_sweep_config.auto_apply`. If `auto_apply.enabled` is `false`, skip this section entirely — write the change log without mutating.

Otherwise:

**Step A — Backup.** `cp ../pipeline/state/sources.json ../pipeline/state/sources.json.keyword.bak` (overwrites this sweep's previous backup). Per-sweep .bak files (`sources.json.{vendor,keyword,github}.bak`) — successive sweeps no longer clobber each other's rollback target.

**Step B — Compute the change set:**

- `promotions_to_add`: candidates classified `promote` today with `applied_on` not yet set. Each lists the target sections it should be inserted into.
- `hot_topics_to_add`: candidates classified `hot_topic` today not already in their target lists.
- `expired_to_remove`: `_auto_added` entries (across all 4 target sections) where `_expires_on < TODAY`. **Skip entries whose registry is `_proven_meta`** — proven keywords never expire, regardless of TTL. (In practice this is moot because we move them out of `_auto_added_meta` in §6.5, but the safety check is explicit.)
- `auto_demotions_to_remove`: ONLY if `auto_demote.enabled` is true (default false), `_auto_added` keywords whose phrase hasn't appeared in any source file for ≥ `rolling_window_days` days. **Never demote `_proven_meta` entries** — they're permanent anchors for trend recognition. The keyword may have gone quiet; the trend continues to exist.
- `proven_promotions_to_apply`: from §6.5 — registry entries that need to move from `_auto_added_meta` to `_proven_meta`. The flat list stays unchanged; only the registry entry moves. Each move recorded in `keyword_changes.log` with the `proven-promote` verb.
- `deep_watch_demotions`: ONLY if `auto_apply.deep_watch_demote.enabled` is true (default true). For each target list whose `len > max_per_list[name]`, find `_auto_added_meta` entries silent ≥ `min_silence_days`, sort oldest-silent first, take up to `max_demotions_per_run`. **Skip `_proven_meta` entries** — they're sacred. **Skip entries that classify as `hot_candidate` or `promote` today** — would be self-contradictory.
- `deep_watch_revivals`: phrases currently in `{section}._deep_watch_meta` that classify as `hot_candidate` or sustained-`promote` today. They get re-promoted (see Step C.6).

**Step C — Apply.** Read sources.json. For each addition:

- **news_web_search_queries**: append the phrase to the list as plain string. Standard search-query format. No way to attach `_auto_added` to a plain string in a list — so maintain a parallel registry inside `keyword_sweep_config` (e.g. `_auto_added_queries: {"agentic provenance": {"_added_on": "...", "_expires_on": "..."}}`). At read time, the news collector still uses the flat list; the registry is only for rollback tracking.

- **radar_topic_taxonomy**: there's a `_auto_added` group at the top level. Initialize it as `[]` if missing. Append the phrase to it. Same parallel registry pattern as above — `radar_config.topic_taxonomy_seed._auto_added_meta` carries the metadata.

- **hackernews_filter_keywords**: same as news (flat list + parallel registry under `hackernews_collector._auto_added_meta`).

- **linkedin_pulse_queries**: same (flat list + parallel registry under `linkedin_collector._auto_added_meta`).

For removals (expired), delete the phrase from the matching flat list AND from the registry. Only proceed if the registry entry has `_auto_added: true` — manual entries are sacred.

**Step C.6 — Deep-watch demotion / re-promotion (soft cap on each keyword list).**

This step runs AFTER the adds/removes in Step C, evaluating the cap against the post-update state.

Read `auto_apply.deep_watch_demote`. If `enabled` is false, skip this step.

For each of the 4 target sections (news_web_search_queries, hackernews_filter_keywords, linkedin_pulse_queries, radar_topic_taxonomy_auto_added):

```
current_count = len(flat_list_for_section)
cap = deep_watch_demote.max_per_list[section_name]
silence = deep_watch_demote.min_silence_days  (default 45)
budget = deep_watch_demote.max_demotions_per_run  (default 5)
```

If `current_count <= cap`, skip this section.

Otherwise, find `_auto_added_meta` candidates where ALL of:
1. The phrase is in the corresponding `_auto_added_meta` registry (i.e. it was auto-added, not manual).
2. The phrase is NOT in `_proven_meta` for this section (proven keywords are sacred).
3. `(TODAY - last_seen_in_discovered_keywords[phrase]) >= silence`.
4. The phrase is NOT classified `hot_candidate` or `promote` in this run (would self-contradict).

Sort candidates by `last_seen` ascending (oldest-silent first). Take the first `min(current_count - cap, budget)`.

For each demotion:
- Read the metadata entry from `{section}._auto_added_meta[phrase]`.
- Add `_demoted_on: TODAY`, `_demoted_reason: "deep-watch: silent {N} days, over cap {cap}"`.
- WRITE to `{section}._deep_watch_meta[phrase]` (initialize the dict if missing).
- DELETE from `{section}._auto_added_meta[phrase]`.
- REMOVE the phrase string from the flat list.
- Audit log: `deep-watch-demote {section_name} "{phrase}" reason="silent {N}d, ranked oldest-silent over cap={cap}"`.

**Re-promotion path.** For each `deep_watch_revivals` candidate:
- Read the entry from `{section}._deep_watch_meta[phrase]`.
- Drop `_demoted_on`, `_demoted_reason`. Refresh `_added_on: TODAY`.
- WRITE back to `{section}._auto_added_meta[phrase]`.
- DELETE from `{section}._deep_watch_meta[phrase]`.
- ADD the phrase string back to the flat list.
- Audit log: `deep-watch-promote {section_name} "{phrase}" reason="returned via {hot_candidate|sustained_promote}"`.

After all edits in Step C / C.6, validate the JSON parses. If it doesn't, abort the write, log `ABORT-INVALID-JSON` to `keyword_changes.log`, and continue with the markdown report only.

**Step D — Audit log.** Append per change to `keyword_changes.log`:

```
2026-05-14T20:08:00 promote-add        news_web_search_queries      "agentic provenance"           reason="6 mentions, 3 src types, 4 days"
2026-05-14T20:08:00 promote-add        radar_topic_taxonomy         "agentic provenance"           reason="cross-source convergence"
2026-05-14T20:08:00 hot-event-add      hackernews_filter_keywords   "context engineering"   expires=2026-06-13 reason="announcement context"
2026-05-14T20:08:00 expire-remove      news_web_search_queries      "tool-use governance"                       reason="TTL elapsed"
2026-05-14T20:08:00 proven-promote     news_web_search_queries      "model context protocol"                    reason="lifetime: 47 days, 6 src types, 32 distinct days"
2026-05-14T20:08:00 proven-promote     radar_topic_taxonomy         "model context protocol"                    reason="lifetime: 47 days, 6 src types, 32 distinct days"
2026-05-14T20:08:00 deep-watch-demote  hackernews_filter_keywords   "old phrase x"                              reason="silent 52d, over cap 80"
2026-05-14T20:08:00 deep-watch-promote news_web_search_queries      "returning phrase y"                        reason="returned via sustained_promote"
```

The `proven-promote` verb is the load-bearing entry — it tells the audit log "this keyword is now PERMANENT, anchored for trend recognition." Search the log with `grep proven-promote ../pipeline/state/keyword_changes.log` to see every keyword that's become proven over time.

**Step E — Update discovered_keywords.json.** For every applied candidate set `applied_to_lists` and `applied_on`. For removals set `removed_on` and `removed_reason`.

## 8. Write `keyword_candidates/{YYYY}/{MM}/{TODAY}.md` — change log

```markdown
# Keyword sweep — {TODAY}

_Daily change log. The pipeline auto-maintains the four keyword lists in sources.json — promotions and hot topics are added directly, expired entries removed. This page describes what happened. Rollback the most recent sweep: `cp ../pipeline/state/sources.json.keyword.bak ../pipeline/state/sources.json`._

## 📋 What changed in sources.json today

If anything was applied:
- **Added {N} promotion(s):** each with phrase, target list(s), reason, sustained-day proof.
- **Added {N} hot topic(s):** each with phrase, target list(s), expires_on, snippet.
- **Removed {N} expired hot entry(s):** each with phrase, target list, reason.

If nothing was applied: "_No changes to `sources.json` this run._"

## ⏳ Pending — needs more days at promote tier ({N})

Candidates that hit promote thresholds today but haven't yet held that tier for ≥ {min_consecutive_days_at_promote} consecutive days. Will auto-apply tomorrow if they stay at promote.

**"{phrase}"** — {recent_mentions} mentions, {source_types_count} src types, days at promote so far: {consecutive_days}/{required}. Target lists: {comma-joined}.

## 👀 Watch list ({N})

Phrases trending upward but below promotion thresholds. Cap at 30 per change log.

**"{phrase}"** — {recent_mentions} mentions / {src_types} src types · sample context: _{first context snippet}_

## 🏛️ Promoted to PROVEN this run ({N})

Keywords whose lifetime metrics crossed the proven threshold today (≥14 distinct days, ≥4 source types, ≥30 days of age, currently on at least one target list). These become **permanent anchors** for trend recognition — they will NEVER be auto-removed, regardless of TTL or future activity drop-offs. A keyword going quiet after being proven means a trend dipped, not that it died. Skip section if empty.

**"{phrase}"** — lifetime: {distinct_days}d, {source_types}srctypes, age {age_days}d. Now permanent on: {target_lists}.

## ⚠️ Expired this run ({N})

Auto-added entries whose TTL elapsed (and that were NOT proven). Removed from the corresponding target list. Proven entries are never in this list — they're protected. Skip section if empty.

**"{phrase}"** — was on {target_list}, added {date}, removed because {reason}.

## Tally summary
- Phrases tracked: {total}
- Promoted to date: {count}
- **Proven (permanent anchors): {count}**
- Currently watching: {count}
- Discovered today (new): {count}
- Hot topics this run: {count}
- sources.json snapshot before edit → sources.json.keyword.bak ({applied_changes_count} change(s) applied)
```

Target: 100-250 lines. Most days the auto-applier mutates 0-2 things — that's healthy.

## 9. Write `discovered_keywords.json` back

Update `last_updated: {TODAY}`. Write the full tally. Sort `keywords` keys alphabetically for stable diffs.

## 10. Update `index.md`

Find `<!-- KEYWORD_START -->` (create the section if missing — see vendor sweep for the same pattern). **Replace-don't-append behavior**: if today's entry exists, update it.

```markdown
- [{TODAY}](keyword_candidates/{YYYY}/{MM}/{TODAY}.md) — applied: {N} promotions, {N} hot, {N} expired; pending: {N}; watch: {N}
```

## 11. Finish

One-line confirmation:
`Saved keyword_candidates/{YYYY}/{MM}/{TODAY}.md. Auto-applied: +{N_promote_added} promotions, +{N_hot_added} hot topics, -{N_expired} expired. Tally has {total_keywords} phrases tracked. sources.json {modified|unchanged}.`

Do NOT post the change log to chat. Do NOT modify any source files or radar/sweep/firm-view outputs — those are read-only inputs.

## Constraints & quality bar

- **Phrase stability.** Once a phrase has been added to a target list, never silently rename it. If it should change, that's an expire + add cycle with a logged reason.
- **No hallucinated mentions.** Every count must trace back to a file you actually read this run (or to historical entries in `discovered_keywords.json` from previous runs).
- **Lowercase storage; preserve display.** Internally everything is lowercased for matching. The `format` field in `target_lists` determines casing when writing into sources.json (e.g. news queries are kept as-typed in the source file; topic taxonomy strings may be Title-Cased).
- **Manual entries are sacred.** A keyword in any of the 4 target lists without an `_auto_added` registry entry is manual — never modify it, never remove it.
- **Proven entries are sacred too.** Once a keyword crosses the proven threshold (≥14 distinct days, ≥4 source types, ≥30 days of age) and is moved to `_proven_meta`, it's a permanent anchor for trend recognition. **NEVER auto-remove a proven entry.** This is the load-bearing rule for the user's stated requirement: "we need to ensure we keep old, proven keywords, to recognize trends." A 6-month-old keyword going quiet for 3 weeks is not noise to clear out — it's a trend in dormancy that we need to be able to recognize when it returns.
- **Auto-demote stays disabled by default** to prevent removing a phrase whose source files just briefly missed a sweep window. Even if you enable it, proven entries are excluded.
- **Deep-watch is the preferred soft-cap path.** When a target list exceeds its `max_per_list` cap AND auto-added entries have gone silent past `min_silence_days`, the sweep MOVES the oldest-silent into `{section}._deep_watch_meta` (and removes the phrase string from the flat list). Re-promotion happens automatically when the phrase resurfaces with promote-tier signal. Proven and manual entries are NEVER demoted to deep-watch. Demotion never touches phrases classified `hot_candidate` or `promote` on the same day. Audit verbs: `deep-watch-demote`, `deep-watch-promote`.
- **Per-sweep backups.** This sweep writes to `sources.json.keyword.bak`; the vendor sweep writes to `sources.json.vendor.bak`; the github sweep writes to `sources.json.github.bak`. Successive sweeps no longer clobber each other's rollback target.
- **JSON validity is mandatory.** Parse-validate before writing sources.json. Abort + log on failure.
- **Hot topics expire.** Same TTL pattern as vendor hot events — 30 days then auto-removed unless meanwhile crossed sustained-promote thresholds.
- **Bootstrap is slower than steady state.** The first run with no `discovered_keywords.json` will mine all ~200 source files from scratch and produce a large watch list. Subsequent runs are incremental over today's files only.

## How to disable auto-apply

In `sources.json`:
```json
"keyword_sweep_config": {
  "auto_apply": {
    "enabled": false
  }
}
```

The skill will write the change log without mutating sources.json (the "What changed today" section will say "Auto-apply disabled — these are the changes the sweep WOULD have made"). Re-enabling resumes auto-application from the next run.
