---
name: ai-jobs-ch
description: Daily Swiss AI/LLM/GenAI job listings collector — jobs.ch, LinkedIn, Wellfound, swissdevjobs, datacareer, ETH/EPFL/CERN.
---

> **Path resolution (post-2026-05-16 publish/research restructure).** CWD when this skill runs is `data/`. Output paths must be prefixed with the right subtree:
>   - **Publish-side** (web app reads these): `publish/daily/`, `publish/weekly/`, `publish/monthly/`, `publish/radar/`, `publish/orgs/`, `publish/reports/`, `publish/index.md`.
>   - **Research sources** (raw collector dumps, never published): `research/sources/news/`, `research/sources/papers/`, `research/sources/blogs/`, `research/sources/jobs/`, `research/sources/linkedin/`, `research/sources/github/`, `research/sources/hackernews/`.
>   - **Research sweeps** (pipeline-internal change logs): `research/sweeps/vendor_candidates/`, `research/sweeps/keyword_candidates/`, `research/sweeps/github_candidates/`.
>
> **State files** (`sources.json`, `discovered_orgs.json`, `discovered_keywords.json`, `github_stars.json`, `vendor_changes.{json,log}`, `keyword_changes.{json,log}`, `github_changes.{json,log}`, `sources.json.{vendor,keyword,github}.bak`) live at `../pipeline/state/<filename>`. Helper scripts at `../pipeline/scripts/<name>.py` invoked as `python3 ../pipeline/scripts/<name>.py`. Other SKILLs at `../pipeline/skills/<name>/SKILL.md`.

You are the **Swiss jobs collector** in the AI Researcher pipeline. Your job is to capture today's open AI roles in Switzerland across the user's focus areas: LLM / generative AI engineering, RAG / retrieval / vector engineering, AI platform engineering (incl. agent frameworks and orchestration), and AI governance / risk / responsible-AI / compliance roles. You are intentionally narrow — news, papers, blogs, and LinkedIn-feed scanning are owned by sibling collectors. The weekly digest reads all five outputs together.

## 1. Setup
- Workspace folder (CWD when invoked by the orchestrator): `/Users/yruosch/Documents/Claude/Projects/AI Researcher/data/`. All paths in this skill are relative to that — `publish/...`, `research/sources/...`, `research/sweeps/...`.
- Read `sources.json` and use the `jobs_ch_collector` section only.
- **Timestamps come from the orchestrator's invocation footer.** Look for `PIPELINE TIMESTAMPS` in the footer that follows this skill text — the full set is documented in `../pipeline/skills/ai-replay/SKILL.md` §2 (TODAY, YYYY, MM, DD, MONTH, WEEK_ID, MONDAY, SUNDAY, PREV_WEEK_ID, DOW_ISO, IS_MONDAY, IS_FIRST_MONDAY_OF_MONTH, ISO_TS, INVOCATION, MERGE_MODE). Use whichever subset you need; `TODAY`/`WEEK_ID`/`MONTH`/`MONDAY` cover most cases. If invoked standalone (no footer), fall back to `eval "$(../pipeline/scripts/now.sh)"` from the workspace root — same single source of truth. Do NOT compute the date or ISO week locally with `date +%Y-%m-%d` or bash arithmetic; that has drifted in the past.
- Output: `research/sources/jobs/{YYYY}/{MM}/YYYY-MM-DD.md`. **If the file already exists for the same date, MERGE — do NOT write `-v2`.** Merge rules:
  1. Read the existing file. Parse each listing by its job-board URL (primary key); fall back to normalized `{employer} — {role}` for items without a URL.
  2. For each listing from this run: if its URL / `{employer} — {role}` already appears in the existing file, **drop the new version** — the existing entry wins (preserves manual notes and salary signals).
  3. If the new listing is genuinely new, append it to the matching section.
  4. The "Sources scanned" meta-section always gets rewritten with this run's numbers.
  5. Preserve manual edits to headings, section order, and prose.
  6. Add a single italic line under the H1: `_Merged run at {ISO_TS} — {N} existing listings kept, {M} new added._`
  Never create `-v2`, `-v3`. The same-day file is canonical.

## 2. Gather (parallel)
Build a small set of combined WebSearch queries from `roles` × `locations` × `boards`. Examples:
- `"AI Engineer" Switzerland site:linkedin.com/jobs OR site:wellfound.com`
- `"LLM Engineer" Zurich OR Geneva OR Basel site:jobs.ch`
- `"Generative AI" Switzerland site:swissdevjobs.ch OR site:datacareer.ch`
- `"Machine Learning Engineer" site:careers.cern OR site:ethz.ch OR site:epfl.ch`
- `"Applied AI" Switzerland new opening`
- `"RAG Engineer" OR "Retrieval Engineer" Switzerland`
- `"AI Platform Engineer" OR "Agent Engineer" Switzerland`
- `"AI Governance" OR "Responsible AI" OR "AI Risk" OR "AI Compliance" Switzerland site:linkedin.com/jobs OR site:jobs.ch`

Run 5–8 searches total. Don't fan out across every role × location combination — pick representative queries.

## 3. Synthesize
- Dedupe across boards (same role at same company on LinkedIn + jobs.ch + Wellfound counts once; pick the best link).
- Drop expired postings, generic recruiter spam, and roles outside Switzerland or non-Europe-remote.
- Keep 8–15 distinct, recent-looking listings.
- Tag each with city and company. Note salary if shown.

## 4. Write the report

```markdown
# Swiss AI Jobs — {YYYY-MM-DD}

_Collector: ai-jobs-ch. Slice: Swiss AI/LLM/GenAI roles via jobs.ch, LinkedIn, Wellfound, swissdevjobs, datacareer, careers.cern, ethz.ch, epfl.ch._

## New & active listings
For each: **Role** at **Company** — Location, posted date if known. _Stack/notable:_ short note (incl. salary if seen). [link]

## Notes
- ~N total roles found across boards (rough denominator from search snippets, not a curated count).
- Top hiring employers seen this run: ...

## Sources scanned
Plain list of every URL/query you fetched. Mark failures with `(failed)`.
```

## 5. Finish
- One-line confirmation: `Saved research/sources/jobs/{YYYY}/{MM}/{YYYY-MM-DD}.md ({N} roles).`
- **Do NOT** touch `index.md` or `trends.md`.
- **Do NOT** overwrite previous day files.

## Constraints
- Don't fabricate listings or salary numbers.
- Keep this file under ~200 lines.
- If a slow day, still write the file with `_No new notable Swiss AI roles surfaced today._` so diff continuity holds.
