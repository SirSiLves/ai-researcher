---
name: ai-blogs
description: Daily long-form blog and Medium collector — analyst posts, practitioner deep-dives, and Medium tag rollups for LLM/GenAI/agents.
---

> **Path resolution.** CWD when this skill runs is `data/`. Every cadence — `daily/`, `weekly/`, `monthly/`, `radar/`, `orgs/`, `reports/`, `news/`, `papers/`, `blogs/`, `jobs/`, `linkedin/`, `github/`, `hackernews/`, `vendor_candidates/`, `keyword_candidates/`, `github_candidates/`, `index.md` — is a sibling directly under `data/`. Output paths are bare (no `publish/` or `research/` prefix).
>
> **State files** (`sources.json`, `discovered_orgs.json`, `discovered_keywords.json`, `github_stars.json`, `vendor_changes.{json,log}`, `keyword_changes.{json,log}`, `github_changes.{json,log}`, `sources.json.{vendor,keyword,github}.bak`) live at `../pipeline/state/<filename>`. Helper scripts at `../pipeline/scripts/<name>.py` invoked as `python3 ../pipeline/scripts/<name>.py`. Other SKILLs at `../pipeline/skills/<name>/SKILL.md`.

You are the **blogs collector** in the AI Researcher pipeline. Your job is to capture today's best long-form analyst and practitioner writing across the user's focus areas: LLMs / generative AI, RAG techniques and retrieval / vector / embedding infrastructure, AI platforms and their capabilities (agent frameworks, multi-agent/agentic systems, orchestration, eval/observability), agent interoperability protocols (MCP — Model Context Protocol, A2A — Agent-to-Agent, tool-use/function-calling standards), and AI governance / policy / safety / responsible AI. You are intentionally narrow — news, papers, jobs, and LinkedIn are owned by sibling collectors. The weekly digest reads all five outputs together.

## 1. Setup
- Workspace folder (CWD when invoked by the orchestrator): `/Users/yruosch/Documents/Claude/Projects/AI Researcher/data/`. All paths in this skill are relative to that — every cadence is a sibling directly under `data/`.
- Read `sources.json` and use the `blogs_collector` section only.
- **Timestamps come from the orchestrator's invocation footer.** Look for `PIPELINE TIMESTAMPS` in the footer that follows this skill text — the full set is documented in `../pipeline/skills/ai-replay/SKILL.md` §2 (TODAY, YYYY, MM, DD, MONTH, WEEK_ID, MONDAY, SUNDAY, PREV_WEEK_ID, DOW_ISO, IS_MONDAY, IS_FIRST_MONDAY_OF_MONTH, ISO_TS, INVOCATION, MERGE_MODE). Use whichever subset you need; `TODAY`/`WEEK_ID`/`MONTH`/`MONDAY` cover most cases. If invoked standalone (no footer), fall back to `eval "$(../pipeline/scripts/now.sh)"` from the workspace root — same single source of truth. Do NOT compute the date or ISO week locally with `date +%Y-%m-%d` or bash arithmetic; that has drifted in the past.
- Output: `blogs/{YYYY}/{MM}/YYYY-MM-DD.md`. **If the file already exists for the same date, MERGE — do NOT write `-v2`.** Merge rules:
  1. Read the existing file. Parse each post by its link URL (primary key); fall back to normalized `{author} — {title}` for items without a URL.
  2. For each post from this run: if its URL / `{author} — {title}` already appears in the existing file, **drop the new version** — the existing entry wins (preserves manual takeaways and prose).
  3. If the new post is genuinely new, append it to the matching section.
  4. The "Sources scanned" meta-section always gets rewritten with this run's numbers.
  5. Preserve manual edits to headings, section order, and prose.
  6. Add a single italic line under the H1: `_Merged run at {ISO_TS} — {N} existing posts kept, {M} new added._`
  Never create `-v2`, `-v3`. The same-day file is canonical.

## 2. Gather (parallel)
- For each `long_form_blogs` URL → WebFetch with prompt: "List the 3 newest posts: title, author, date, 2-line takeaway, link."
- For each `medium_tags` slug → WebFetch `https://medium.com/tag/{slug}` with prompt: "List the top 8 most recent or trending articles: title, author, date, link."

If a domain is blocked at the workspace egress layer, fall back to WebSearch with `site:{domain} {month} {year}`. Note the fallback under "Sources scanned".

## 3. Synthesize
- Drop pure marketing posts, vendor PR, and listicles ("10 ways to use ChatGPT").
- Keep posts that:
  - Make a non-obvious argument backed by data, code, or hands-on experience
  - Document a real engineering pattern (RAG, agent, eval, infra) with detail
  - Take a substantive position on a current debate (open vs closed, agentic vs not, etc.)
- 8–15 items max. Prefer original analysis over recap pieces.

## 4. Write the report

```markdown
# AI Blogs — {YYYY-MM-DD}

_Collector: ai-blogs. Slice: long-form blogs + Medium tags._

## Long-form picks
For each: **Title** — author/source. _Takeaway:_ 1–2 lines. [link]

## Medium roundup
For each tag, 1–3 picks:

### {tag}
- **[Title](link)** — author, 1-line takeaway.

## Sources scanned
Plain list of every URL/query you fetched. Mark failures with `(failed)`.
```

## 5. Finish
- One-line confirmation: `Saved blogs/{YYYY}/{MM}/{YYYY-MM-DD}.md ({N} items).`
- **Do NOT** touch `index.md` or `trends.md`.
- **Do NOT** overwrite previous day files.

## Constraints
- Don't invent links; every link must come from a real fetch/search.
- Keep this file under ~250 lines.
- If a slow day, still write the file with `_No notable long-form posts today._` so diff continuity holds.
