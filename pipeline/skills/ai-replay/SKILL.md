---
name: ai-replay
description: Manual on-demand run of the full daily pipeline. Thin wrapper — the canonical §1–§8 procedure lives in ../pipeline/CRON_PROMPT.md and is NOT duplicated here. **Today only** — collectors fetch live URLs. Same-day re-runs MERGE into existing files rather than producing -v2 variants.
---

> **Path resolution.** CWD when this skill runs is `data/`. Every cadence — `daily/`, `weekly/`, `monthly/`, `radar/`, `orgs/`, `reports/`, `news/`, `papers/`, `blogs/`, `jobs/`, `linkedin/`, `github/`, `hackernews/`, `vendor_candidates/`, `keyword_candidates/`, `github_candidates/`, `index.md` — is a sibling directly under `data/`. Output paths are bare (no prefix).

You are the **manual replay agent**. You execute exactly the same pipeline
as the nightly cron, on demand.

**Single source of truth:** read
`../pipeline/CRON_PROMPT.md` and execute the procedure between the
`== START PASTE ==` and `== END PASTE ==` markers, top to bottom, with the
**three manual-mode overrides** below. Do NOT rely on a remembered copy of
the procedure, and do not skip late steps (§6.5–§7.7).

_(This file used to carry its own copy of §1–§8. That duplicate is gone:
three-way drift between this file, CRON_PROMPT.md, and the scheduled-task
prompt caused the 2026-05-14 `-v2` violation and silently killed the
health beacon + gap keywords steps from 2026-05-25 to 2026-07-01. One copy
lives in CRON_PROMPT.md; everything else points at it.)_

## Manual-mode overrides

1. **Confirm before fan-out** (replaces the cron's "no user confirmation"
   rule). After running §1 Setup (`eval "$(../pipeline/scripts/now.sh)"`,
   mkdirs), ask via `AskUserQuestion`:

   ```
   Replay for {TODAY}? This will:
     • Fan out 7 collectors (news, papers, blogs, jobs-ch, linkedin, github, hackernews)
     • Synthesize daily/{date}.md
     • Run radar + vendor/keyword/github sweeps, firm view, manifest,
       gap keywords, health beacon
     • {if IS_MONDAY=1} Run weekly rollup + ai-trends
     • {if DD=01} Run monthly rollup + trends monthly review

   Any existing same-day file will be MERGED, not versioned (-v2).
   ```

   Options: `Yes, run now` / `Only collectors, skip synthesis` / `Cancel`.
   If "Cancel," exit with no changes. If "Only collectors," stop after §3.

2. **Footer line** `INVOCATION=ai-replay (manual)` instead of
   `ai-daily-research (cron)`. `MERGE_MODE=true` stays as written.

3. **§8 confirmation** prints `ai-replay complete for {TODAY}: …` instead of
   `ai-daily-research complete …`, and MAY be followed by a short chat
   summary since a user is present. Still never post the daily content
   itself to chat.

## Scope guard

Today only. Past-date replay is intentionally out of scope (collectors
fetch live URLs; historical data isn't recoverable from WebFetch). If the
user asks for a past date, decline with: "Past-date replay isn't supported —
collectors fetch live URLs. To re-synthesize an existing day's files
manually, edit them directly and re-run only the radar/sweep/weekly agents
on that date by hand."

## Other constraints

All constraints in CRON_PROMPT.md apply unchanged (never overwrite manual
edits, never `-v2`, trust `now.sh`, failed subagents don't block). Plus:
**no partial-run rollback** — if the user cancels mid-pipeline, completed
steps stay completed; the next run merges with them.
