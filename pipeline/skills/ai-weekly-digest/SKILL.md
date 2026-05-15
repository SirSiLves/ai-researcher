---
name: ai-weekly-digest
description: Cumulative weekly rollup — runs DAILY, reads MONDAY→TODAY of the current week's dailies, and OVERWRITES weekly/{YYYY}/{YYYY-Www}.md each run. The file grows from 1 day on Monday to 7 days on Sunday and freezes after Sunday's run as the canonical week file. Spawned by the orchestrator every day.
---

You are the **weekly digest agent**. You build the current week's cumulative rollup. **You run EVERY day, not just Mondays.** Each run replaces the previous day's version with a fresh roll-up that covers Monday through today.

The user wanted this behavior: "On Monday only content of 1 day, on Tuesday combined content of Tuesday and Monday, on Wednesday content of 3 days, and so on. Content is just replaced." So:

| Day | Dailies covered | Behavior |
|-----|------------------|----------|
| Mon | Mon (1 file) | First write of the week's weekly file |
| Tue | Mon + Tue (2) | Overwrite — replace yesterday's snapshot |
| Wed | Mon + Tue + Wed (3) | Overwrite |
| … | … | Overwrite |
| Sun | Mon..Sun (7) | Overwrite — this is the "final" version of the week |
| Mon (next) | Mon (1, new week) | New WEEK_ID → fresh file under the new ID |

The previous week's weekly file is now frozen with its full 7-day content. The `ai-trends` agent reads THAT (the prior week's, complete) on Monday — not the current week's brand-new 1-day snapshot.

## Architectural pyramid
```
collectors → daily orchestrator → daily/{YYYY}/{MM}/{date}.md (one per day)
daily/{YYYY}/{MM}/{date}.md (×1..7) → ai-weekly-digest (this skill, daily) → weekly/{YYYY}/{WEEK_ID}.md (overwritten each day of the week)
weekly/{YYYY}/{WEEK_ID}.md (×4-5) → ai-monthly-rollup → monthly/{YYYY}/{YYYY-MM}.md (one per month, first Monday only)
```

Each layer reads only the layer immediately below. Don't skip layers.

## 1. Setup
- Workspace folder: `/Users/yruosch/Documents/Claude/Projects/AI Researcher/`
- Read `sources.json` `weekly_digest` section.
- **Timestamps come from the orchestrator's invocation footer.** Look for `PIPELINE TIMESTAMPS` in the footer that follows this skill text — it carries authoritative `TODAY` (YYYY-MM-DD), `WEEK_ID` (YYYY-Www), `MONDAY`, `SUNDAY`, `DOW_ISO` (1=Mon..7=Sun). Use those. If invoked standalone (no footer), fall back to `eval "$(scripts/now.sh)"` from the workspace root. Do NOT compute the date or ISO week locally.
- **Output filename:** `weekly/{YYYY}/{WEEK_ID}.md` (e.g. `weekly/2026/2026-W20.md`). **OVERWRITE if exists** — this skill is cumulative, not versioned. The previous day's snapshot is intentionally replaced.

## 2. Gather inputs

Read dailies from **this week's Monday through today** (NOT "last 7 dailies" — that crosses week boundaries).

```bash
# All daily files dated between $MONDAY and $TODAY inclusive:
find daily -type f -name '*.md' | sort | python3 -c "
import sys, os
monday, today = '$MONDAY', '$TODAY'
for p in sys.stdin:
    p = p.strip()
    name = os.path.basename(p).replace('.md', '')
    if monday <= name <= today:
        print(p)
"
```

Read each file in parallel. Expect `DOW_ISO` files: Monday → 1 file, Tuesday → 2, Wednesday → 3, etc.

For "What changed vs. last week", also read the **previous** week's weekly file (the one already on disk, completed and frozen):

```bash
find weekly -type f -name '*.md' | sort | grep -v "/{WEEK_ID}\.md$" | tail -1
```

If no prior week exists, note "first weekly rollup" in the diff section.

## 3. Synthesize

- **Dedupe across days.** Within this week, a story carried Mon → Wed = one weekly entry, not three.
- **Snapshot intent.** This is a SNAPSHOT of the week SO FAR, not a retrospective on a completed week (unless it's Sunday's run). On Monday the file says "1 day of data, week just starting." On Sunday it says "7 days, week complete."
- **Cluster thematically.** Group by theme ("Open-weight models", "Agent infra", "Policy & geopolitics", "Swiss market", "Research methodology").
- **Promote, don't replicate.** Drop ~80% of items.
- **Quantify where possible.** "3 daily files this week mentioned MCP-adoption."

Target: ~150-250 lines for the weekly file at week-end. Earlier in the week it'll be shorter — that's fine.

## 4. Write `weekly/{YYYY}/{WEEK_ID}.md` — OVERWRITE

Use this exact structure (consistency = greppable across weeks).

**Required-section rule.** ALL section headings below MUST appear in every weekly file. If a section has no items, emit the heading and a single italic placeholder line such as `_No notable papers covered this week yet._` Never silently drop a heading.

**Cumulative-snapshot subtitle.** The italic line under the H1 reflects current state: `_Snapshot as of {TODAY} — {N} of 7 daily digests covered ({DOW_ISO}/7 through the week)._` On the Sunday run this reads `_Complete week — 7 of 7 daily digests covered._`

Template:
```markdown
# AI Weekly — {WEEK_ID} (Mon {MONDAY} → Sun {SUNDAY})

_Snapshot as of {TODAY} — {N} of 7 daily digests covered._

## TL;DR
- 5–8 bullets, the most important things across the dailies covered so far.

## Top stories
3–5 thematic clusters. Each:
**Theme name** — 2–3 sentences synthesizing what happened so far this week. _Why it matters:_ one line.
Backing: [daily/{date}](../../daily/{YYYY}/{MM}/{date}.md), [news/{date}](../../news/{YYYY}/{MM}/{date}.md) …

## Top papers
6–10 papers from this week so far. Each: **Title** — authors, _why notable:_ 1 line. [arxiv link]

## Best blog reads
4–8 long-form pieces from this week so far.

## Swiss job market
3–6 bullets: new high-signal listings, recurring employers, salary signals, hiring tempo.

## LinkedIn pulse (if available)
3–5 bullets: recurring themes in the feed, hashtag trends.

## What changed vs. last week
3–6 bullets comparing this week's emerging themes against the PRIOR week's weekly file. If no prior week file: "First weekly rollup — no comparison available."

## Sources read this run
- daily/: list of file paths actually read (Mon..Today of this week).
  Note any gaps within the week (e.g., `daily/2026/05/2026-05-08.md` missing — orchestrator failed that day).
```

## 5. Update `index.md`

Open `index.md` with Read. Find `<!-- WEEKLY_START -->`. **Replace-don't-append behavior:** if there's already an entry for the current `WEEK_ID` in the weekly section (today's run is a re-write of an existing file), update that line in-place rather than adding a new one. Otherwise insert directly after the marker (newest first).

In-place update pattern: find the existing line matching `- [{WEEK_ID}](weekly/...)` and Edit-replace it with the new headline summary. New entry pattern: insert after `<!-- WEEKLY_START -->`.

```
- [{WEEK_ID}](weekly/{YYYY}/{WEEK_ID}.md) — Mon {MONDAY} → Sun {SUNDAY}, {N}/7 days, {one-line headline summary, ~80 chars}
```

## 6. Finish
- One-line confirmation: `Saved weekly/{YYYY}/{WEEK_ID}.md ({N}/7 days covered, {K} top stories, {P} papers). Index updated.`
- Do NOT post the full content to chat.
- Do NOT touch any `daily/`, `news/`, `papers/`, `blogs/`, `jobs/`, `linkedin/`, or `monthly/` files. Read-only.
- Do NOT touch `trends.md` — owned by the ai-trends agent, which fires separately on Mondays.

## Constraints & quality bar
- Don't fabricate items. Every claim must be traceable to a daily file read this run.
- Don't reproduce >15-word verbatim excerpts.
- Keep the weekly file under ~300 lines at week-end. Earlier in the week shorter.
- The Sunday run is the "final" version — it should be the most complete and polished.
- This skill OVERWRITES the weekly file each day. That's intentional — the cumulative snapshot replaces the previous day's. **No `-v2` versioning ever, including same-day re-runs.** If invoked twice on the same day (manual re-run from `ai-replay`, or orchestrator double-fire), the second run overwrites the first — both are derived from the same daily files anyway.
- Inaugural week edge case: if MONDAY of this week is before the very first daily file in the archive, treat the start of the data as the effective MONDAY. Note in the H1 subtitle: "_Pipeline still warming up — week-of-data starts {first_daily_date}._"
