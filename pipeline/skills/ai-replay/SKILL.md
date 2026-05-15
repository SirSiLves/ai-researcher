---
name: ai-replay
description: Canonical orchestrator spec for the AI Researcher pipeline. Runs the full daily fan-out on demand. **Today only** — collectors fetch live URLs, all dated outputs use today's date from scripts/now.sh. Same-day re-runs MERGE into existing files rather than producing -v2 variants. THIS FILE IS ALSO THE SPEC THE NIGHTLY CRON SHOULD FOLLOW — paste the §1–§8 procedure into the Cowork scheduled-task prompt.
---

You are the **manual replay agent AND the canonical orchestrator spec**. This file plays two roles:

1. **Invoked directly** (user types "Run ai-replay"): you ARE the orchestrator. Follow steps §1–§8 below, spawning subagents for each collector and synthesis step.
2. **As written documentation**: the nightly cron `ai-daily-research` lives in Cowork's UI and must implement the same §1–§8 procedure. When the cron drifts, paste this skill's procedure back into the scheduled-task prompt to reconcile.

**Single source of truth.** Previously a file called `skills/ORCHESTRATOR_UPDATE.md` documented a delta. That file is deleted; THIS file is now the only canonical reference. Read it top-to-bottom to know what the daily pipeline should be doing.

**Scope:** today only. Past-date replay is intentionally out of scope (collectors fetch live URLs; historical data isn't recoverable from `WebFetch`). If the user asks for a past date, decline with: "Past-date replay isn't supported — collectors fetch live URLs. To re-synthesize an existing day's files manually, edit them directly and re-run only the radar/sweep/weekly agents on that date by hand."

## 1. Setup

- Workspace folder: `/Users/yruosch/Documents/Claude/Projects/AI Researcher/`
- Pull canonical timestamps:
  ```bash
  eval "$(scripts/now.sh)"
  ```
  This populates `TODAY`, `YYYY`, `MM`, `DD`, `MONTH`, `WEEK_ID`, `MONDAY`, `SUNDAY`, `PREV_WEEK_ID`, `DOW_ISO`, `IS_MONDAY`, `IS_FIRST_MONDAY_OF_MONTH`, `ISO_TS`, `AS_OF`. **All subagents you spawn must trust these values** — pass them in the `PIPELINE TIMESTAMPS` footer.
- Ensure target folders exist (idempotent):
  ```bash
  mkdir -p "news/$YYYY/$MM" "papers/$YYYY/$MM" "blogs/$YYYY/$MM" \
           "jobs/$YYYY/$MM" "linkedin/$YYYY/$MM" "github/$YYYY/$MM" \
           "hackernews/$YYYY/$MM" "daily/$YYYY/$MM" "radar/$YYYY/$MM" \
           "vendor_candidates/$YYYY/$MM" "keyword_candidates/$YYYY/$MM" \
           "weekly/$YYYY" "monthly/$YYYY" "orgs"
  ```
- Confirm with the user before fanning out:
  ```
  Replay for {TODAY}? This will:
    • Fan out 7 collectors (news, papers, blogs, jobs-ch, linkedin, github, hackernews)
    • Synthesize daily/{date}.md
    • Run radar + vendor sweep
    • {if IS_MONDAY=1} Run weekly rollup
    • {if IS_MONDAY=1} Run ai-trends
    • {if IS_FIRST_MONDAY_OF_MONTH=1} Run monthly rollup

  Any existing same-day file will be MERGED, not versioned (-v2).
  Proceed?
  ```
  Use `AskUserQuestion` with options: `Yes, run now` / `Only collectors, skip synthesis` / `Cancel`. If "Cancel," exit with no changes.

## 2. Footer template — pass to every spawned subagent

Every Agent call you spawn appends this footer to the skill prompt:

```
---
PIPELINE TIMESTAMPS (from scripts/now.sh — single source of truth):
TODAY={TODAY}
YYYY={YYYY}
MM={MM}
DD={DD}
MONTH={MONTH}
WEEK_ID={WEEK_ID}
MONDAY={MONDAY}
SUNDAY={SUNDAY}
PREV_WEEK_ID={PREV_WEEK_ID}
DOW_ISO={DOW_ISO}
IS_MONDAY={IS_MONDAY}
IS_FIRST_MONDAY_OF_MONTH={IS_FIRST_MONDAY_OF_MONTH}
ISO_TS={ISO_TS}
INVOCATION=ai-replay (manual)
MERGE_MODE=true
```

The `MERGE_MODE=true` line tells each skill it's running in replay mode and any existing same-day file should be merged into per its own merge rules. The skills are already written to handle this — your job is just to deliver the footer faithfully.

## 3. Fan out the 7 collectors in PARALLEL

Send ONE message with seven `Agent` tool calls:

| `subagent_type` | `description` | `prompt` |
|---|---|---|
| `general-purpose` | `"News collector"` | contents of `skills/ai-news/SKILL.md` + footer |
| `general-purpose` | `"Papers collector"` | contents of `skills/ai-papers/SKILL.md` + footer |
| `general-purpose` | `"Blogs collector"` | contents of `skills/ai-blogs/SKILL.md` + footer |
| `general-purpose` | `"Swiss jobs collector"` | contents of `skills/ai-jobs-ch/SKILL.md` + footer |
| `general-purpose` | `"LinkedIn collector"` | contents of `skills/ai-linkedin/SKILL.md` + footer |
| `general-purpose` | `"GitHub collector"` | contents of `skills/ai-github/SKILL.md` + footer |
| `general-purpose` | `"Hacker News collector"` | contents of `skills/ai-hackernews/SKILL.md` + footer |

Wait for ALL seven to return. A failed subagent does NOT block the rest — note the failure in the daily file's "Sources scanned" section and continue.

If the user picked "Only collectors, skip synthesis" in §1, stop here. Print:
`Collectors complete: {N}/7 succeeded. Synthesis skipped per user request.`

## 4. Read all 7 collector outputs

In parallel: Read each of `news/{YYYY}/{MM}/{TODAY}.md`, `papers/{YYYY}/{MM}/{TODAY}.md`, `blogs/{YYYY}/{MM}/{TODAY}.md`, `jobs/{YYYY}/{MM}/{TODAY}.md`, `linkedin/{YYYY}/{MM}/{TODAY}.md`, `github/{YYYY}/{MM}/{TODAY}.md`, `hackernews/{YYYY}/{MM}/{TODAY}.md`.

Skip files that don't exist (a collector failed) or contain only the stub text (LinkedIn-without-Chrome case).

## 5. Synthesize → daily/{YYYY}/{MM}/{TODAY}.md

**Merge-first.** If `daily/{YYYY}/{MM}/{TODAY}.md` already exists, READ it before writing. Same rules as the collector skills:

1. Parse existing items by their link URLs.
2. New items the prior synthesis didn't surface: append.
3. Items both runs found: existing entry wins (preserves manual editorial work).
4. The header, "Top-5 reading priorities" 🎯, "What changed vs. yesterday", and "Sources scanned" sections always get rewritten with this run's content — these are derived summaries.
5. Add an italic subtitle line: `_Re-synthesized at {ISO_TS} — {N} existing items kept, {M} new added._`

The synthesis structure (target ~250–400 lines):

```markdown
# AI Daily — {TODAY}

_Synthesized from 7 collectors. {if merged: "Re-synthesized at {ISO_TS} — {N} existing items kept, {M} new added."}_

## 🎯 Top-5 reading priorities
Five highest-signal items across all slices, ranked. Each: link + 1-line "why you'd open this first."

## Major news & releases
{from ai-news/major announcements, deduped against everything else}

## Research highlights
{from ai-papers, top 5–8}

## Best blog reads
{from ai-blogs, top 4–6}

## GitHub momentum
{from ai-github: trending now (top 5 AI repos) + 2–3 watch-list movers}

## Hacker News pulse
{from ai-hackernews: top 4 AI items with comment-thread signal if available}

## Swiss job market
{from ai-jobs-ch, top 4–6 listings}

## LinkedIn pulse (if available)
{from ai-linkedin, top 3–5; omit section entirely if stub}

## What changed vs. yesterday
3–5 bullets diffing today against {YESTERDAY}'s daily file.

## Sources scanned
- news/: {N items}
- papers/: {N items}
- blogs/: {N items}
- jobs/: {N items}
- linkedin/: {N items or "stub"}
- github/: {N items}
- hackernews/: {N items}
```

## 6. Update index.md

Find `<!-- INDEX_START -->`. **If today's line already exists**, update it in place with the new headline. Otherwise insert directly after the marker.

```
- [{TODAY}](daily/{YYYY}/{MM}/{TODAY}.md) — {one-line headline ~120 chars}
```

## 6.5. Spawn ai-trend-radar

One Agent call:
- `subagent_type`: `"general-purpose"`
- `description`: `"Trend radar"`
- `prompt`: contents of `skills/ai-trend-radar/SKILL.md` + footer.

Wait for it. The radar will replace any existing `radar/{YYYY}/{MM}/{TODAY}.{md,json}` in place (its merge rules say "the radar is fully derived; same-day re-run produces an authoritative new snapshot").

## 6.6. Spawn ai-vendor-sweep

One Agent call:
- `subagent_type`: `"general-purpose"`
- `description`: `"Vendor sweep"`
- `prompt`: contents of `skills/ai-vendor-sweep/SKILL.md` + footer.

Wait for it. The sweep will auto-mutate `sources.json` per its rules (with `sources.json.vendor.bak` rollback and `vendor_changes.log` audit trail).

## 6.7. Rebuild the firm view

Run the org-view generator directly — no subagent needed, it's a pure Python script over on-disk data:

```bash
python3 scripts/build_org_view.py
```

This rebuilds `orgs/index.json` + `orgs/{slug}.json` for every tracked org (discovered orgs + the 6 priority vendors that the sweep skips). The generator scans `discovered_orgs.json`, source files, and radar JSONs — completes in ~8-12 seconds. Idempotent. Drives `orgs.html`.

If the script exits non-zero, log the error but don't block — the rest of the pipeline doesn't depend on the firm view.

## 6.8. Run ai-keyword-sweep (Python script + agent boilerplate-judging)

Two-step process: a deterministic Python script does the mining + classification + auto-apply, and an agent decides which phrases are real signal vs. template scaffolding.

### Step 6.8a: run the sweep script

```bash
python3 scripts/run_keyword_sweep.py
```

This mines today's source files for 2/3-gram phrases (skipping anything covered by existing keyword lists AND anything the agent has already judged as boilerplate, within a 30-day verdict cache), classifies each phrase (already_applied / promote / watch / dormant), promotes phrases that held `promote` tier for ≥2 consecutive days, auto-applies to the four target lists in sources.json, runs proven-promotion for long-history keywords, writes `keyword_candidates/{date}.md`, updates `discovered_keywords.json`, and appends to `keyword_changes.log`.

The script writes `keyword_judge_request.md` listing every phrase that lacks a fresh agent verdict.

### Step 6.8b: spawn the keyword-judge agent

If `keyword_judge_request.md` exists with phrases listed, spawn ONE Agent call:
- `subagent_type`: `"general-purpose"`
- `description`: `"Keyword boilerplate-judging"`
- `prompt`: contents of `keyword_judge_request.md` + footer.

The agent reads each phrase + context snippet and writes `keyword_judge_verdicts.json` in the format the script expects (`{"verdicts": {"phrase": {"decision": "signal"|"boilerplate", "reason": "..."}, ...}}`). The next `run_keyword_sweep.py` run picks it up, applies the decisions to `discovered_keywords.json`, and archives the verdicts file to `keyword_judge_verdicts.{TODAY}.applied.json`.

If the agent decides to defer some phrases (e.g., truly ambiguous), it can omit them from the verdicts file — those phrases re-appear in tomorrow's request.

Verdict cache is 30 days. After that, the script re-asks the agent to re-evaluate (templates evolve; what was once boilerplate may become signal, or vice versa).

### Safeguards

Same shape as vendor sweep, but with its own backup file: `sources.json.keyword.bak` rollback before any mutation, audit log, JSON parse-validation before write. Boilerplate judging never mutates sources.json directly — it only affects what enters the tally.

## 6.85. Run the github sweep

Pure Python — no subagent needed:

```bash
python3 scripts/run_github_sweep.py
```

Mines `github/{YYYY}/{MM}/*.md` (the ai-github collector's daily output) for trending repo appearances over the last 14 days. Repos that trend on ≥3 distinct days AND hold 'promote' tier for ≥2 consecutive sweep runs get auto-added to `news_collector.github_collector.watched_repos`. Repos with a single-day star delta ≥5,000 get a 30-day hot-event TTL. Soft cap at 80 watched repos triggers deep-watch demotion (oldest-silent first; same shape as vendor + keyword sweeps). Manual entries are sacred. Audit trail in `github_changes.log`.

Output: `github_candidates/{YYYY}/{MM}/{TODAY}.md` (change log, same shape as vendor_candidates and keyword_candidates).

If the script exits non-zero, log the error but don't block — the rest of the pipeline doesn't depend on the github sweep.

## 6.9. Rebuild change-log JSONs

Run the change-log JSON generator directly — pure Python over the append-only logs:

```bash
python3 scripts/rebuild_change_logs.py
```

This rebuilds `vendor_changes.json` + `keyword_changes.json` + `github_changes.json` by replaying every line of `vendor_changes.log` + `keyword_changes.log` + `github_changes.log`. Each JSON has parsed mutations, counts by verb / month, currently-active set, deep-watch set, expired set, proven set, and (for vendor) a consistency check against `sources.json _auto_added` entries (surfaces drift between the log and what was actually applied).

Runs in ~50ms over a year of log volume. Idempotent. The .log files remain the source of truth; the JSONs are safe to delete and rebuild.

If the script exits non-zero, log the error but don't block — the rest of the pipeline doesn't depend on the change-log JSONs.

## 7. Weekly rollup — every day

ai-weekly-digest runs **every day**, not just Mondays — the file is cumulatively rewritten Mon→today.

One Agent call:
- `subagent_type`: `"general-purpose"`
- `description`: `"Weekly rollup"`
- `prompt`: contents of `skills/ai-weekly-digest/SKILL.md` + footer.

Wait for it. The skill overwrites `weekly/{YYYY}/{WEEK_ID}.md`.

## 7.5. Trends update — Monday only

If `IS_MONDAY=1`, spawn ONE Agent call:
- `subagent_type`: `"general-purpose"`
- `description`: `"Trends update"`
- `prompt`: contents of `skills/ai-trends/SKILL.md` + footer + this extra line:
  ```
  SOURCE: weekly/{YYYY}/{PREV_WEEK_ID}.md
  ```
  (The trends agent reads the just-completed prior week, not the current week that has only just begun. The skill itself documents this — your job is to pass the source path.)

Wait for it. The trends agent appends 0–2 entries to `trends.md`. If `trends.md` doesn't exist yet (this would be the first Monday run since the pipeline started), the trends skill creates it.

## 7.6. Monthly rollup — first Monday of month only

If `IS_FIRST_MONDAY_OF_MONTH=1`, compute the previous month:

```bash
PREV_MONTH=$(python3 -c "from datetime import date, timedelta; t=date.fromisoformat('$TODAY'); p=(t.replace(day=1)-timedelta(days=1)); print(f'{p.year}-{p.month:02d}')")
```

Spawn ONE Agent call:
- `subagent_type`: `"general-purpose"`
- `description`: `"Monthly rollup"`
- `prompt`: contents of `skills/ai-monthly-rollup/SKILL.md` + footer + this extra line:
  ```
  TARGET_MONTH: {PREV_MONTH}
  ```

Wait for it. The monthly rollup writes `monthly/{YYYY}/{PREV_MONTH}.md`, merging if it exists.

After monthly completes, if you also want trends to incorporate the new monthly file, spawn `ai-trends` again with `SOURCE: monthly/{YYYY}/{PREV_MONTH}.md`. (Optional — the orchestrator currently does this on monthly runs.)

## 8. Finish

Print a single-line confirmation that names what actually ran:

```
ai-replay complete for {TODAY}: 7/7 collectors, daily synthesized, radar updated, sweep applied {N} changes{if IS_MONDAY: ", weekly rolled up, trends updated"}{if IS_FIRST_MONDAY_OF_MONTH: ", monthly rolled up"}.
```

Examples:
- Regular Thursday: `ai-replay complete for 2026-05-14: 6/7 collectors (linkedin: no Chrome), daily synthesized, radar updated, sweep applied 2 changes, firm view rebuilt (61 orgs).`
- Monday: `ai-replay complete for 2026-05-18: 7/7 collectors, daily synthesized, radar updated, sweep applied 0 changes, firm view rebuilt, weekly rolled up, trends updated.`
- First Monday of month: `ai-replay complete for 2026-06-01: 7/7 collectors, daily synthesized, radar updated, sweep applied 1 change, firm view rebuilt, weekly rolled up, trends updated, monthly rolled up.`

## Constraints

- **Never overwrite manual user edits.** Every merge step preserves prose, headings, and ordering from the existing file. Only new items get added; existing items always win on conflict.
- **Never produce `-v2`, `-v3`.** If a skill you spawn returns saying it wrote a `-v2` file, that's a bug in the spawned skill — flag it in §8 and continue. The same-day file is the canonical record.
- **Trust `scripts/now.sh`.** Don't compute the date in bash arithmetic; that has drifted in the past.
- **Sources scanned, theme balance, vendor coverage** — these meta-sections describe the *run*, not the items. They always get regenerated with this run's numbers, not merged.
- **Failed subagents don't block.** If `ai-blogs` returns an error, note it in the daily's "Sources scanned" and continue with synthesis.
- **No partial-run rollback.** If the user cancels mid-pipeline (e.g. KeyboardInterrupt), the already-completed steps stay completed. The next replay run will merge with them.
- **`sources.json.{vendor,keyword,github}.bak`** — per-sweep rollback files, not for the daily files. If a daily merge goes wrong, the user can `git checkout daily/{YYYY}/{MM}/{TODAY}.md` (assuming the workspace is git-tracked).
- **Don't post the daily content to chat.** §8's one-line confirmation is the only chat output.
