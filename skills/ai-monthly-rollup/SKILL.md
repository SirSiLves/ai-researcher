---
name: ai-monthly-rollup
description: Monthly rollup — reads the previous month's weekly/*.md files and writes monthly/{YYYY}/{YYYY-MM}.md. Spawned by the orchestrator on the first Monday of each month.
---

You are the **monthly rollup agent** in the AI Researcher pipeline. You read **only the previous month's `weekly/*.md` files** and produce one self-contained `monthly/{YYYY}/{YYYY-MM}.md` file.

You DO NOT touch `daily/`, `news/`, `papers/`, `blogs/`, `jobs/`, or `linkedin/`. Those have already been consolidated into weekly files. Your input is pre-curated; your job is to consolidate the month.

Architectural pyramid:
```
collectors → daily orchestrator → daily/{YYYY}/{MM}/{date}.md (one per day)
daily/{YYYY}/{MM}/{date}.md (×7) → ai-weekly-digest → weekly/{YYYY}/{Monday}.md (one per week)
weekly/{YYYY}/{Monday}.md (×4-5) → ai-monthly-rollup (this skill) → monthly/{YYYY}/{YYYY-MM}.md (one per month)
```

Each layer reads only the layer immediately below.

## 1. Setup
- Workspace folder: `/Users/yruosch/Documents/Claude/Projects/AI Researcher/`
- Compute today's date: `date +%Y-%m-%d`. You're invoked on the first Monday of a month, so today's day-of-month is in 1–7.
- Compute the previous month: today minus ~30 days, formatted `YYYY-MM`. Example: invoked 2026-06-01 → previous month is `2026-05`.
- Output: `monthly/{YYYY}/{YYYY-MM}.md`. If exists, append `-v2`, `-v3`, etc. (never overwrite).

## 2. Gather inputs

Weekly filenames are ISO week ids (`YYYY-Www`), so they don't directly encode the calendar month — week 18 might span April/May, week 22 might span May/June. Use one Python call to enumerate the weekly files whose Monday-or-Sunday falls inside the target month:

```bash
cd "/Users/yruosch/Documents/Claude/Projects/AI Researcher" && \
  python3 - <<'PY'
import re, sys, os
from datetime import date, timedelta
target = "2026-05"  # ← substitute the previous month's YYYY-MM
ty, tm = map(int, target.split("-"))
files = sorted(f for f in os.listdir("weekly") if re.fullmatch(r"\d{4}-W\d{2}\.md", f))
for f in files:
    y, w = int(f[0:4]), int(f[6:8])
    mon = date.fromisocalendar(y, w, 1)
    sun = mon + timedelta(days=6)
    # include if any day of the week falls in the target month
    if (mon.year == ty and mon.month == tm) or (sun.year == ty and sun.month == tm):
        print(f"weekly/{f}")
PY
```

Read each printed file with the Read tool, in parallel where possible. A typical month yields 4 weekly files; some yield 5.

For "What changed vs. last month", read the most recent prior `monthly/*.md` file:

```bash
find monthly -type f -name '*.md' | sort | tail -2 | head -1
```

If empty / no prior month exists, note "first monthly rollup" in the diff section.

If fewer than 2 weekly files exist for the target month (pipeline still warming up), write a brief stub file noting "Insufficient data — pipeline still warming up; only N weekly file(s) available" and exit.

## 3. Synthesize

The weekly files are already heavily curated and themed. Your job is to compress 4-5 weeks of weekly themes into a single monthly view that highlights the durable shifts.

Apply this filter:

- **Promote across-week themes only.** A theme that appeared in 3+ weekly files becomes a monthly headline. A theme in 1 weekly is dropped unless individually monumental (e.g., a major model release).
- **Dedupe across weeks.** Same story carried multiple weeks = one monthly entry.
- **Quantify the shape of the month.** "EU AI Act enforcement was top story 3 weeks running", "Open-weight releases: 5 new models", "Swiss AI hiring: ~15 distinct roles, top employers CERN/ETH/Giotto.ai".
- **Strip the daily/weekly noise.** No "what happened on Tuesday". Monthly view is "what defined this month".
- **Prefer durable signal over peak signal.** A controversy that flared one week and died is less notable than a steady drumbeat.

Target: ~150-220 lines for the monthly file.

## 4. Write `monthly/{YYYY}/{YYYY-MM}.md`

Use this exact structure (consistency = greppable across months):

```markdown
# AI Monthly — {Month Name YYYY}

_Consolidated from weekly rollups: weekly/2026/2026-W19.md, weekly/2026/2026-W20.md, …_

## TL;DR
- 5–7 bullets, the things that defined this month at a 30-day altitude.

## Defining themes
3–5 themes that ran multiple weeks. Each:
**Theme name** — 3–5 sentences synthesizing the arc across the month. _Why it matters:_ one line.
Backing weeks: [YYYY-Www](../weekly/YYYY-Www.md), …

## Major releases & milestones
6–10 high-signal product / model / framework releases that shipped this month. Each: **What** — 1 line. [link]

## Research highlights
5–8 papers or research threads that were referenced multiple weeks. Each: **Title or thread** — 1 line. [link]

## Switzerland / job market pulse
- Recurring employers
- Notable role types
- Salary signals if observed
- Hiring tempo (busier / quieter / steady)

## What changed vs. last month
3–5 bullets: durable shifts only — what's now in the conversation that wasn't, what's faded.
If no prior `monthly/*.md` exists: "First monthly rollup — no comparison available."

## Sources read this month
- weekly/: list of files actually read (e.g., `weekly/2026/2026-W19.md`, …)
  Note any gaps (e.g., `weekly/2026/2026-W21.md` missing — weekly digest failed that Monday).
```

## 5. Update `index.md`

Open `index.md` with Read. Find `<!-- MONTHLY_START -->` and use Edit to insert directly after it (replace the marker with marker + new entry on the next line):

```
<!-- MONTHLY_START -->
- [{Month Name YYYY}](monthly/{YYYY}/{YYYY-MM}.md) — {one-line headline summary, ~80 chars}
```

(Use `replace_all: false`; the marker appears exactly once.) Do NOT touch the rest of the file.

If the marker doesn't yet exist (older `index.md`), open the file and add a `## Monthly summaries` section with the markers before writing.

## 6. Finish
- One-line confirmation: `Saved monthly/{YYYY}/{YYYY-MM}.md ({N} themes, {K} releases). Index updated.`
- Do NOT post the full content to chat.
- Do NOT touch any `daily/`, `news/`, `papers/`, `blogs/`, `jobs/`, `linkedin/`, or `weekly/` files. Read-only.
- Do NOT touch `trends.md` — deprecated.

## Constraints & quality bar
- Don't fabricate items. Every claim must be traceable to a weekly file read this run.
- Don't reproduce >15-word verbatim excerpts from the weeklies.
- Keep the monthly file under ~220 lines. The point of a monthly view is compression, not concatenation.
