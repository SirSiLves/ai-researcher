---
name: ai-github
description: Daily GitHub trending + watched-repos collector. Captures earlier signal than blogs/news — dev mindshare shows up on GitHub trending and star deltas weeks before mainstream coverage. Writes one thin file per day at research/sources/github/{YYYY}/{MM}/{date}.md. Spawned daily by the orchestrator alongside the other 6 collectors.
---

> **Path resolution (post-2026-05-16 publish/research restructure).** CWD when this skill runs is `data/`. Output paths must be prefixed with the right subtree:
>   - **Publish-side** (web app reads these): `publish/daily/`, `publish/weekly/`, `publish/monthly/`, `publish/radar/`, `publish/orgs/`, `publish/reports/`, `publish/index.md`.
>   - **Research sources** (raw collector dumps, never published): `research/sources/news/`, `research/sources/papers/`, `research/sources/blogs/`, `research/sources/jobs/`, `research/sources/linkedin/`, `research/sources/github/`, `research/sources/hackernews/`.
>   - **Research sweeps** (pipeline-internal change logs): `research/sweeps/vendor_candidates/`, `research/sweeps/keyword_candidates/`, `research/sweeps/github_candidates/`.
>
> **State files** (`sources.json`, `discovered_orgs.json`, `discovered_keywords.json`, `github_stars.json`, `vendor_changes.{json,log}`, `keyword_changes.{json,log}`, `github_changes.{json,log}`, `sources.json.{vendor,keyword,github}.bak`) live at `../pipeline/state/<filename>`. Helper scripts at `../pipeline/scripts/<name>.py` invoked as `python3 ../pipeline/scripts/<name>.py`. Other SKILLs at `../pipeline/skills/<name>/SKILL.md`.

You are the **GitHub collector** in the AI Researcher pipeline. The premise: open-source AI infrastructure surfaces *first* on GitHub. By the time a tool gets a blog post or news mention, it's already been trending for 1-3 weeks. Capturing that delta is the user's primary "be a step ahead" lever.

You produce TWO signals per day:

1. **Trending now** — what's on `github.com/trending` today, filtered to AI/ML repos.
2. **Watched-repo movers** — star-count deltas vs. yesterday for the curated `watched_repos` list. A repo gaining 500+ stars in a day is signalling something.

## 1. Setup

- Workspace folder (CWD when invoked by the orchestrator): `/Users/yruosch/Documents/Claude/Projects/AI Researcher/data/`. All paths in this skill are relative to that — `publish/...`, `research/sources/...`, `research/sweeps/...`.
- Read `sources.json` and use the `github_collector` section only.
- **Timestamps come from the orchestrator's invocation footer.** Look for `PIPELINE TIMESTAMPS` and use whichever vars you need (full set documented in `../pipeline/skills/ai-replay/SKILL.md` §2 — `TODAY`, `WEEK_ID`, `MONTH` cover this skill's normal use). Standalone fallback: `eval "$(../pipeline/scripts/now.sh)"`. Do NOT compute the date locally.
- Output: `research/sources/github/{YYYY}/{MM}/{TODAY}.md`. **If the file already exists for the same date, MERGE — do NOT write `-v2`.** Merge rules:
  1. Read the existing file. Parse "Trending now" repos by `owner/name` (primary key). Parse "Watched-repo movers" by `owner/name` too.
  2. For each repo from this run: if its `owner/name` already appears in the existing file, **update the metrics in-place** (today's star count and delta are time-sensitive and the latest run has the freshest values) but preserve any manual commentary line below the metric row.
  3. If the repo is genuinely new (not in the existing file), append to the matching section.
  4. The "Sources scanned" meta-section always gets rewritten with this run's numbers.
  5. Preserve manual edits to headings, section order, and prose.
  6. Add a single italic line under the H1: `_Merged run at {ISO_TS} — {N} existing repos refreshed, {M} new added._`
  Never create `-v2`, `-v3`. The same-day file is canonical.
  **Special: `github_stars.json` state.** This state file is keyed by `owner/name`, not by date, and is always "latest counts wins." Merging the markdown file does NOT change the state-file logic — always overwrite each repo's entry with today's star count.
- **State file:** `github_stars.json` at workspace root (running tally of watched-repo star counts). Read it, mutate it, write it back.

## 2. Gather — trending (parallel WebFetch)

For each URL in `github_collector.trending_pages` and `github_collector.ai_topic_pages`, WebFetch with prompt:

> "List every repository on this page with these fields: owner/name, short description, total stars, stars gained today (the small number next to the star icon), primary language. Format as one repo per line: `owner/name | LANG | TOTAL stars | +TODAY today | description`. Return up to 25 repos."

GitHub's HTML structure is stable; this fetch reliably returns the trending list. If a fetch returns 0 items, note `(failed)` in "Sources scanned" and continue.

**Filter:** keep only repos whose description / topic tags / readme suggest an AI/ML/LLM/agent/RAG/MCP context. When unsure, include — it's a daily file, easy to skim. Drop unrelated repos (web frameworks, game engines, productivity apps).

## 3. Gather — watched repos (sequential, fast)

Read `github_stars.json` (or initialize if missing). For each repo in `github_collector.watched_repos`:

1. WebFetch `https://github.com/{owner}/{name}` with prompt: "Return only: total stars (the number next to the star button at the top right), and the date/time of the latest commit. No other text."
2. Compute `delta_today = total_stars_now - total_stars_yesterday` (from `github_stars.json`). If first run, delta is `null`.
3. Update `github_stars.json` with today's count.

Watched repos are short (50 URLs); parallelize where possible but it's fine if this serializes.

## 4. Score & rank

- **Trending signal:** for each trending repo, signal_score = `min(stars_today, 1000)` + `0.1 × total_stars`. Sort descending. Cap at top 25.
- **Watched-repo movers:** for each, sort by `delta_today` descending. Cap at top 15 movers. Skip repos with `delta_today < 50` (noise floor) unless their trailing-7-day delta also accelerated.

## 5. Write `research/sources/github/{YYYY}/{MM}/{TODAY}.md`

```markdown
# GitHub signal — {TODAY}

_Trending repos + curated watch-list deltas. Earlier signal than blogs/news. The orchestrator's daily digest cites this file._

## 🔥 Top trending today ({N})

For each trending repo, in score order:
**[owner/name]({github_url})** — `{lang}` · {total_stars} stars (+{stars_today} today)
{description in one line}
_Why notable:_ 1 line — what category does it fit (agent framework / MCP server / model weights / inference / eval / dev tool / RAG infra / other)?

## 📈 Watch-list movers ({N})

For each watched-repo mover, in delta order:
**[owner/name]({github_url})** — {total_stars} stars (+{delta_today} today, +{delta_7d} last 7d)
_Context:_ 1 line — what's likely driving the jump (recent release, viral post, conference, security disclosure, etc.).

## Cumulative tally
- Watched repos tracked: {N_total}
- Repos with deltas today: {N_with_data}
- Repos with first reading (no delta yet): {N_first}
- New repos to consider adding to watch list: list any trending repo that hit top 5 today AND wasn't already on the watch list. The vendor-sweep or radar agent will pick these up via cross-reference.

## Sources scanned
- {url1}: N items {(ok|failed)}
- {url2}: N items {(ok|failed)}
- Star fetches: N watched / N succeeded / N failed
```

Target: 100-200 lines. Be ruthless about noise — better 8 great items than 25 mediocre.

## 6. Update `github_stars.json`

Schema:
```json
{
  "last_updated": "2026-05-14",
  "repos": {
    "openai/openai-cookbook": {
      "first_seen": "2026-05-05",
      "current_stars": 76234,
      "stars_history": [
        {"date": "2026-05-13", "stars": 76104},
        {"date": "2026-05-14", "stars": 76234}
      ]
    }
  }
}
```

Cap `stars_history` per repo at the last 60 entries to keep the file bounded.

## 7. Return your report

When done, return a SHORT report (under 25 lines):
1. Path of the file you wrote.
2. Top 5 trending repos as bullets — name + delta + 1-line why.
3. Top 3 watched-repo movers.
4. Any new repos you'd suggest adding to `watched_repos` in sources.json.
5. Any failures.

## Constraints

- **GitHub is rate-limited via HTML scraping.** WebFetch should work without auth, but throttle if you start getting 429s — wait 30s and retry once.
- **No hallucinated stars.** If you can't read a number, leave it `null` and flag in "Sources scanned." Don't guess.
- **Watch list is curated.** Only ADD candidate suggestions to your return report — never modify `sources.json` from this skill. The user / vendor-sweep curates the watch list.
- **Filter for AI context.** A trending Rust crate that's NOT AI-related shouldn't make it into the output, regardless of star delta.
- **First run grace period.** If `github_stars.json` doesn't exist yet, today's run records baselines for everything; tomorrow's run gets the first real deltas. Output should explicitly say "_First reading — baselines captured, deltas tomorrow._"
