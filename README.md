# AI Researcher

A self-maintaining daily research pipeline for the LLM / Generative AI / RAG / agent-protocols / AI-governance space, plus the Swiss AI job market. **One scheduled task** orchestrates seven collector subagents in parallel, synthesizes a single daily digest with reading priorities, fires a trend radar with dynamic sectors and cross-topic clustering, runs a vendor sweep that auto-maintains the source list, and cumulatively rolls up weekly / monthly views. Manual replay for today is supported via `ai-replay`.

The whole point: **be a step ahead.** Reactive ingestion (news, papers, blogs, jobs, LinkedIn) is necessary but not sufficient. The pipeline adds earlier signals (GitHub trending, Hacker News, vendor velocity) and analytical layers (radar with dual-EMA persistence + cross-source breadth + co-mention clusters) so the long-term shifts are visible alongside the daily news.

> **Pipeline state (as of 2026-05-14).** The pipeline started writing to `news/`, `papers/`, `blogs/`, `jobs/`, `linkedin/`, `daily/`, `radar/`, `weekly/` on 2026-05-04. Currently:
> - **Working:** all 7 collectors, daily synthesis, trend radar (8 days of history), vendor sweep (auto-applied 18 enterprise vendors with 0 drift against the audit log), firm view (83 orgs incl. 6 priority vendors), keyword sweep (first run today produced 200-phrase tally, 17 on watch list, 0 promotions — sustained-day gate needs 2+ consecutive runs), briefing radar (`radar.html`), full polar radar (`radar-classic.html`).
> - **Awaiting first successful Monday run:** `trends.md` — the `ai-trends` skill is Monday-only and either hasn't been spawned by the cron yet, or has only seen "no durable shifts" days. Will materialize when a Monday run produces at least one entry.
> - **Awaiting first first-Monday-of-month run:** `monthly/` already has 2026-03 and 2026-04 from earlier backfills; June 2026 will be the first cron-produced monthly rollup.
> If a folder is missing, it's most likely never-yet-fired rather than broken. Run `ai-replay` to force a fresh pass.

## Pipeline at a glance

```
┌─────────────────────────────────────────────────────────────────────────────┐
│   ai-daily-research (cron: 0 20 * * *, local time)        Two entry points: │
│   ai-replay        (manual, anytime)                       same fan-out     │
│                                                                             │
│   §1  scripts/now.sh → canonical TODAY / WEEK_ID / MONDAY / IS_MONDAY / …   │
│   §2  mkdir nested year/month folders if missing                            │
│                                                                             │
│   §3  fan out 7 collectors in PARALLEL ───────────────────────────────────┐ │
│       ai-news    ai-papers    ai-blogs    ai-jobs-ch    ai-linkedin       │ │
│       ai-github  ai-hackernews                                            │ │
│                                                                           │ │
│   §4  read all 7 outputs                                                  │ │
│   §5  synthesize → daily/{YYYY}/{MM}/{date}.md ─── leads with 🎯 top-5    │ │
│                                                                             │
│   §6.5  ai-trend-radar      → radar/{date}.{md,json} + radar/index.json    │
│   §6.6  ai-vendor-sweep     → vendor_candidates/{date}.md (auto-applies    │
│                                changes to sources.json)                    │
│   §7    ai-weekly-digest    → weekly/{YYYY-Www}.md (overwrites daily,      │
│                                cumulative Mon→Sun)                         │
│   §7.5  ai-trends           → trends.md (Monday only, reads prior week)    │
│   §7.6  ai-monthly-rollup   → monthly/{YYYY-MM}.md (first Monday of month) │
└─────────────────────────────────────────────────────────────────────────────┘
```

Failed subagents don't block the orchestrator. The pipeline degrades gracefully.

**Same-day re-runs MERGE, never produce `-v2`.** If you trigger `ai-replay` on a day the cron already ran (or vice versa), each skill reads its existing same-day file and merges new items in: existing entries win on conflict (preserves your manual edits), new items append, derived meta-sections (Sources scanned, Theme balance, vendor coverage) regenerate. The same-day file is always the canonical record for that date.

## File layout

```
sources.json                 ← all config (collector URLs, radar tuning, sweep thresholds, auto-apply rules)
sources.json.bak             ← one-step rollback of the last sweep mutation
seed_orgs.json (in scripts/) ← bootstrap list of ~120 AI companies for the sweep
discovered_orgs.json         ← running tally of every org we've seen (the sweep's state)
github_stars.json            ← running star counts on watched repos
vendor_changes.log           ← append-only audit log of every sources.json vendor mutation
vendor_changes.json          ← derived structured view (active set + consistency check against sources.json)
keyword_changes.log          ← append-only audit log of every sources.json keyword mutation
keyword_changes.json         ← derived structured view
discovered_keywords.json     ← running tally of mined n-gram phrases (the keyword sweep's state)
radar/index.json             ← manifest the HTML viewer reads to enumerate radar dates
orgs/index.json              ← manifest the firm-view HTML reads to enumerate orgs

skills/
  ai-news/SKILL.md           ← priority + enterprise + tech news, governance, web search
  ai-papers/SKILL.md         ← ArXiv + HF Papers, LLM/agent-relevant only
  ai-blogs/SKILL.md          ← long-form analyst blogs + Medium tags
  ai-jobs-ch/SKILL.md        ← Swiss AI/LLM/GenAI roles
  ai-linkedin/SKILL.md       ← Pulse + hashtag scan (browser-based; auto-skips if no Chrome)
  ai-github/SKILL.md         ← github.com/trending + curated watch-list deltas
  ai-hackernews/SKILL.md     ← HN front page + /newest + /best, AI-filtered, top-thread signal
  ai-trend-radar/SKILL.md    ← daily radar with dual EMA + breadth + dynamic sectors + clusters
  ai-vendor-sweep/SKILL.md   ← daily org classification + AUTO-APPLY to sources.json
  ai-weekly-digest/SKILL.md  ← cumulative Mon→Sun rollup, overwrites daily
  ai-trends/SKILL.md         ← Monday-only long-term trends ledger
  ai-monthly-rollup/SKILL.md ← first-Monday-of-month monthly rollup
  ai-replay/SKILL.md         ← manual on-demand orchestrator for today (this skill IS the orchestrator spec)
  ai-keyword-sweep/SKILL.md  ← daily n-gram mining + auto-extension of 4 keyword lists, with PROVEN protection for long-history terms

scripts/
  now.sh                     ← canonical date utility (single source of truth for TODAY/WEEK_ID/MONDAY etc.)
  bootstrap_discovered_orgs.py
  backfill_radar_sectors_breadth.py
  seed_orgs.json
  render_for_notes.sh        ← markdown → HTML for Apple Notes (pandoc-based, PATH-robust)
  add_to_notes.applescript   ← AppleScript bridge to Apple Notes
  preprocess_digest.py       ← markdown preprocessing for the Notes pipeline

# Nested by year/month — keep the archive scalable
daily/{YYYY}/{MM}/{date}.md          ← your primary morning read (leads with reading priorities)
news/{YYYY}/{MM}/{date}.md           ← raw news subagent output
papers/{YYYY}/{MM}/{date}.md
blogs/{YYYY}/{MM}/{date}.md
jobs/{YYYY}/{MM}/{date}.md
linkedin/{YYYY}/{MM}/{date}.md
github/{YYYY}/{MM}/{date}.md         ← GitHub trending + watch-list deltas
hackernews/{YYYY}/{MM}/{date}.md     ← AI-filtered HN front page
radar/{YYYY}/{MM}/{date}.md          ← human-readable radar
radar/{YYYY}/{MM}/{date}.json        ← machine-readable radar (drives the HTML viewer)
vendor_candidates/{YYYY}/{MM}/{date}.md  ← daily change log (what auto-applied to sources.json)
weekly/{YYYY}/{YYYY-Www}.md          ← cumulative Mon→Sun, overwritten daily
monthly/{YYYY}/{YYYY-MM}.md
trends.md                            ← long-term ledger, Monday-appended
index.md                             ← table of contents across all cadences

orgs/index.json                      ← sorted list of all orgs (firm view manifest)
orgs/{slug}.json                     ← per-org timeline / velocity / topic mix
radar.html                           ← briefing radar viewer — default morning view (Today + Arcs modes, pinned filter chips)
radar-classic.html                   ← full polar-radar layout (reference; will be retired once briefing view stabilizes)
orgs.html                            ← single-page firm view (serve via localhost)
```

## The seven collectors

Each is a self-contained Agent prompt at `skills/{name}/SKILL.md`. The orchestrator spawns all seven in a single message (parallel). Failed collectors don't block synthesis.

- **ai-news** — Priority vendors (6 frontier labs: OpenAI, Anthropic, Google DeepMind, Meta, Mistral, DeepSeek) with mandatory coverage and per-vendor fallback search. Enterprise vendors (8 manual starters: SAP, Salesforce, ServiceNow, NVIDIA, Snowflake, Red Hat/IBM, n8n, Workday/Oracle — plus the auto-grown list maintained by `ai-vendor-sweep`; currently 25 total as of 2026-05-14) with the same discipline. Tech news, Swiss sources, governance feeds, breaking-news web searches.
- **ai-papers** — ArXiv categories (cs.CL, cs.AI, cs.LG, cs.MA, stat.ML, cs.IR) + HuggingFace Papers, filtered to LLM/agent relevance.
- **ai-blogs** — Long-form analyst blogs (Simon Willison, Karpathy, Lilian Weng, latent.space, Eugene Yan, Sebastian Raschka, Stratechery, SemiAnalysis, etc.) + Medium tags.
- **ai-jobs-ch** — Swiss-focused AI/LLM/GenAI roles across jobs.ch, swissdevjobs, LinkedIn, YC, ETH/EPFL, plus Wellfound/Indeed for cross-border.
- **ai-linkedin** — Pulse posts + hashtag scan (#LLM, #GenerativeAI, #RAG, #AIagents, #MCP, #AIGovernance) via Claude in Chrome. Topic-driven, not author-driven. Skips silently if Chrome isn't reachable.
- **ai-github** — github.com/trending (all langs + Python/TS/Rust/Go specific) + AI topic pages. Star-count delta tracking on 47 curated repos (state in `github_stars.json`).
- **ai-hackernews** — HN front page, /newest, /best, AI-keyword-filtered. Top 8 items get comment-thread signal extraction (top 3 votes + critique flags).

## The trend radar

Two-dimensional + dynamic categorization:

- **Persistence** (`score_slow`) — dual-EMA-smoothed (fast α=0.3, slow α=0.05). Slow drives stage classification (Mainstream / Consolidating / Emerging / Fading). Fast vs. slow ratio drives the `direction` field (surging / rising / steady / fading).
- **Breadth** (`breadth_7d` / `breadth_30d`) — distinct organizations mentioning a topic in the window. Independent of persistence. Surfaces the cross-source convergence signal ("many companies talking about the same thing this week"). Org-per-day capped at 2 to prevent one chatty source from gaming it.
- **Sectors** — recomputed every run by LLM clustering with hysteresis (3–6 sectors, sticky priors, dissolve below 2 topics for 5 days, spawn from ≥3 topics that don't fit). Sector names persist across days unless the field genuinely shifts. Reflects the user's observation that "RAG was a sector once; today its topics scatter across Agents and Retrieval."
- **Topic clusters** — pairwise co-mention graph over 7-day window; connected components become clusters. Each cluster gets a sticky 2-4 word name. Surfaces the *mega-trend* signal (e.g., `mcp-adoption + tool-use-standards + a2a-protocol + agent-sdks` → "Agent protocol stack") that's invisible if you only look at topics one at a time.

Topic stages classify by `score_slow` (not raw score), so a loud single news day doesn't bounce a topic between stages — that's the central anti-noise mechanism.

## The keyword sweep — auto-extending the search lists

Parallel architecture to the vendor sweep, applied to keywords instead of orgs. Motivated by: *"if we just always use the same words, perhaps we will miss important things too."*

Runs daily after the firm view. Mines today's source files for 2- and 3-gram phrases NOT yet covered by any keyword list (news `web_search_queries`, radar `topic_taxonomy_seed`, hackernews `filter_keywords`, linkedin `pulse_topic_queries` / hashtags). Computes the same primitive metrics — total mentions, distinct source types, distinct days — and applies the same sustained-day gate before auto-extending `sources.json`.

**Tiers (same shape as vendor sweep):**
1. `already_applied` — phrase is currently in at least one target list. No action.
2. `hot_topic` — phrase co-occurs with announcement/release/funding keywords AND has ≥2 mentions. Auto-added with `_expires_on = TODAY + 30 days`.
3. `promote` — uncovered phrase, ≥6 mentions / ≥3 source types / ≥4 distinct days, held `promote` tier for ≥2 consecutive days. Auto-added to the relevant target list(s).
4. `watch` — uncovered, 3–5 mentions. No action; surfaces in change log.
5. `dormant` — everything else.

**PROVEN keywords are permanent.** This is the load-bearing protection for long-term trend recognition. Once a keyword crosses ≥14 distinct days, ≥4 source types, and ≥30 days of age (while still being on at least one target list), it gets promoted from `_auto_added_meta` to `_proven_meta`. **Proven entries are NEVER auto-removed**, regardless of TTL, auto-demote, or current activity. A keyword going quiet after being proven means a trend is dormant, not dead — when it returns, we need to recognize it as continuation of the existing arc (visible in radar's `score_180d_ago`, momentum charts), not as a brand-new topic. Manual entries are proven by default.

**Auto-apply safeties** (identical to vendor sweep):
- `sources.json.bak` rollback before every write.
- `keyword_changes.log` append-only audit trail (verbs: `promote-add`, `hot-add`, `expire-remove`, `proven-promote`).
- JSON parse-validation before write; abort on failure.
- Auto-demote disabled by default; even when enabled, proven entries are excluded.
- Disable via `keyword_sweep_config.auto_apply.enabled: false` — reverts to recommendation-only.

**Output:** `keyword_candidates/{YYYY}/{MM}/{date}.md` — daily change log describing what was applied, pending, watching, and newly proven. `discovered_keywords.json` carries the running tally.

**Implementation:** the SKILL.md spec is implemented deterministically in `scripts/run_keyword_sweep.py` (Python, ~500 lines). `ai-replay` calls this script in §6.8 rather than spawning an agent — the procedure is well-defined and reproducibility is more valuable than LLM eloquence here. Includes a hard-coded boilerplate filter to drop template artifacts ("stars today", "kept new added", "pts comments", etc.) that would otherwise dominate the n-gram tally.

## The vendor sweep — auto-applied

Runs daily after the radar. Reads `discovered_orgs.json` (running tally), today's source files, recent radar JSONs (for `breadth_orgs_7d`), and `sources.json` vendor lists. Classifies every org, then **mutates `sources.json` directly**.

**Tiers (apply in order, first match wins):**
1. `covered_healthy` — on a vendor list, mentioned within silence threshold. No action.
2. `covered_silent` — on a list, silent for ≥45d (priority) or ≥60d (enterprise). Flagged in change log; **auto-demote is OFF by default** — the user decides.
3. `hot_event` — either a funding/M&A/IPO keyword detected, OR `velocity_status: "surging"` (velocity_ratio ≥ 5×). Auto-added to `enterprise_vendors` with `_expires_on = TODAY + 30 days`.
4. `promote` — uncovered, ≥8 mentions / ≥3 source types / ≥4 distinct days in last 28 days, sustained for ≥2 consecutive sweep runs. Auto-added to `enterprise_vendors`.
5. `watch` — uncovered, 3–7 mentions. No action; surfaces in change log.
6. `informal_covered` — covered via URL-only lists (`vendor_blogs`, `governance_sources`, etc.). No double-promotion.
7. `dormant` — tracked but uninteresting.

**Vendor velocity:** for each org, `velocity_ratio = (mentions in last 7d) / (avg mentions/wk over 28d baseline)`. Surge ≥5× triggers hot_event without needing a funding keyword. Acceleration ≥3× is informational. Cooling ≤0.33× is informational only — never an auto-demote trigger.

**Auto-apply safeties:**
- Never writes to `priority_vendors`. Promotions and hot events ALWAYS go to `enterprise_vendors`.
- Never modifies entries without `_auto_added: true` — manual entries are sacred.
- Before every write: `cp sources.json sources.json.bak` (one-step rollback).
- After every change: line appended to `vendor_changes.log` (append-only audit trail).
- Before write: JSON parse-validate; abort if invalid.
- Each auto-added entry carries `_auto_added`, `_added_on`, `_added_reason`, optionally `_expires_on`.
- Disable via `radar_config.vendor_sweep_config.auto_apply.enabled: false` — reverts to recommendation-only.

**Expiration:** hot-event entries past `_expires_on` get auto-removed on the next sweep, UNLESS they meanwhile crossed the sustained-promote gate (in which case they were already re-added without expiry).

## Outputs by cadence

| Cadence  | File                              | What it contains                                                                                 | Read order |
|----------|-----------------------------------|--------------------------------------------------------------------------------------------------|------------|
| Daily    | `daily/{YYYY}/{MM}/{date}.md`     | Leads with 🎯 top-5 reading priorities. Then themed slices, GitHub/HN sections, what-changed.    | Every morning. |
| Daily    | `radar/{YYYY}/{MM}/{date}.md`     | Polar-radar-style narrative grouped by sector → stage. "What moved" callout at top.              | When you want depth. |
| Daily    | `vendor_candidates/{date}.md`     | Change log: what was added/removed/expired in `sources.json`. Pending promotions. Watch tier.    | Skim daily. |
| Weekly   | `weekly/{YYYY}/{YYYY-Www}.md`     | Cumulative Mon→Sun rollup. Overwritten each day of the week — Sunday is the canonical version.   | Monday morning for previous week's full picture. |
| Weekly   | `trends.md`                       | Long-term ledger of durable shifts. Appended every Monday by `ai-trends`.                        | Monthly status meeting. |
| Monthly  | `monthly/{YYYY}/{YYYY-MM}.md`     | First-Monday-of-month rollup synthesizing the prior month's weekly files.                        | When reviewing a month's arc. |

## The firm view — `orgs.html`

The user's stated goal of "see a trend grow on different firms" gets its own view, separate from the topic-centric radar. **Pick an org → see its mention timeline, source-type mix, velocity history, and topic mix**, all on one screen. Sorted by velocity ratio with priority vendors pinned to the top.

`orgs.html` reads two files generated by `scripts/build_org_view.py`:

- `orgs/index.json` — sorted list of every org with summary metrics (velocity, total mentions, days active, top topics, tier hint, coverage).
- `orgs/{slug}.json` — full per-org timeline: `mentions_by_date`, source-type breakdown, velocity history (30-day rolling), topic mix, radar appearances, classification history, hot events, context snippets.

The generator rebuilds the entire `orgs/` tree each run (~8-12 seconds) so it's always consistent with `discovered_orgs.json`. It also closes one gap the sweep leaves open: **priority vendors (OpenAI, Anthropic, Google DeepMind, Meta, Mistral, DeepSeek) aren't tracked in `discovered_orgs.json`** because the sweep treats them as already-covered — but they're the most important companies for the firm view. The generator scans source files for those 6 vendors directly so they appear in the firm view alongside the discovered orgs.

`ai-replay` runs the generator automatically (§6.7); standalone invocation:

```bash
python3 scripts/build_org_view.py
```

**Open the view:**

```bash
cd "/Users/yruosch/Documents/Claude/Projects/AI Researcher"
python3 -m http.server 8000
open http://localhost:8000/orgs.html
```

Features:
- **Searchable & filterable left rail** — search by slug or top topic; filter by tier hint (frontier-lab / enterprise-vendor / vertical-agent / infra / hosting / hardware / research-lab / safety / open-weight); sort by velocity / mentions / recency / topic count / A–Z.
- **Mention activity** — bar chart of files-with-mention per day across the org's full history.
- **Velocity history** — line chart of mentions/7d + velocity ratio (7d / weekly-avg-28d) over the last 30 days. Surging / accelerating / cooling / steady chips per the same thresholds the vendor sweep uses.
- **Source-type mix** — doughnut chart showing what kind of sources are covering this org (tech_news / paper / long_form_blog / linkedin / etc.).
- **Topic mix** — bar chart of which topic-taxonomy strings co-occur with this org's mentions in source files. Will be replaced by radar's `breadth_orgs_7d` once that field starts populating on real runs.
- **Radar appearances** — every date this org showed up in any radar topic's `breadth_orgs_7d` (currently empty across the board; populates as the radar runs forward).
- **Classification & hot events** — last 10 sweep classifications and recorded hot events.
- **Context samples** — short snippets of where the org was first seen in source files.

## The HTML radar viewer

Two HTML viewers ship side-by-side. **`radar.html` is the briefing view** (default — what you open every morning). **`radar-classic.html` is the full polar-radar layout** (kept as a reference for now; will be retired if briefing view holds up over a few weeks of use).

### `radar.html` — briefing mode (default)

Two modes accessible via a tab switch at the top:

- **Today** — the morning briefing. Up to 10 ranked items: stage transitions (both directions), surging topics, sector births/deaths, breadth jumps vs. yesterday, hot vendor events. Sorted by signal weight. Each clickable. On quiet days, auto-opens the polar-radar disclosure with an explanation. Supporting panels (clusters, sector evolution, top-8 score history) live behind `▸` disclosure buttons — present but quiet.

- **Arcs** — long-term lens. Left rail: filterable, searchable topic list with stage dot + direction arrow per row. Right: chosen topic's life-cycle arc (persistence + breadth dual-axis chart over all history), 7d/30d/90d/180d-ago stats with "cold" markers when the window isn't warm yet, sector history, orgs talking, supporting files. One topic at a time, no clutter.

**Filter chips** at the top of every mode, two tiers:
- **★ Pinned** (gold star) — survives sessions via localStorage. Stays even when the underlying sector/cluster isn't in today's snapshot (shows tooltip "Pinned but no topics in this snapshot").
- **Dynamic** (☆) — today's sectors + clusters, minus the already-pinned. Click ☆ to pin, ★ to unpin. Click the chip body (not the star) to filter the active mode.

Both sectors (◆) and topic clusters (🔗) get chips in one row.

**Cross-links**: `→ firm view` (`orgs.html`), `→ classic radar` (`radar-classic.html`), `→ index` (`index.md`).

**Maturity badge** next to the date selector: pipeline age in days + which momentum windows are reliable (cold / warming / warm).

### `radar-classic.html` — the full polar radar (reference)

The original single-screen layout: polar radar SVG with concentric stage rings and sector quadrants, plus 6 supporting panels (clusters, sector evolution, top-8 score history, highest breadth, what-moved, topic detail) and a Radar/Scatter toggle. Identical data; busier display. Use this when you specifically want the cloud-of-dots view.

### Serve both:

```bash
cd "/Users/yruosch/Documents/Claude/Projects/AI Researcher"
python3 -m http.server 8000
open http://localhost:8000/radar.html         # briefing (default)
open http://localhost:8000/radar-classic.html # full polar
```



## Configuration — `sources.json`

Edit this to change what the pipeline tracks. Major sections:

| Key                                          | Purpose                                                                              |
|----------------------------------------------|--------------------------------------------------------------------------------------|
| `news_collector.priority_vendors`            | Frontier labs (5). MANDATORY coverage. Never modified by auto-apply.                 |
| `news_collector.enterprise_vendors`          | Platform layer (8 starter + auto-added). Mutated by the vendor sweep.                |
| `news_collector.vendor_blogs`                | Informal blog URL list. Counted as `informal_covered`.                               |
| `news_collector.tech_news_sites`             | Heise, Handelsblatt, t3n, TheVerge, TechCrunch, ArsTechnica, …                       |
| `news_collector.swiss_sources`               | NZZ, SwissInfo.                                                                      |
| `news_collector.governance_sources`          | Stanford HAI, OECD AI, AI Act EU, AISI, NIST, METR, Apollo, …                        |
| `papers_collector`                           | ArXiv categories + HF Papers + max per category.                                     |
| `blogs_collector`                            | Medium tags + curated long-form blogs.                                               |
| `jobs_ch_collector`                          | Swiss role keywords + locations + boards.                                            |
| `linkedin_collector`                         | Pulse topic queries + hashtag feeds + capture rules.                                 |
| `github_collector`                           | Trending URLs + AI topic pages + 47 watched repos.                                   |
| `hackernews_collector`                       | HN endpoints + AI filter keywords + min-points threshold.                            |
| `radar_config.source_weights`                | Per-mention contribution to topic scores.                                            |
| `radar_config.max_mentions_per_source_type`  | Caps to prevent one chatty source dominating.                                        |
| `radar_config.stages`                        | Score ranges + sustained-days for each stage.                                        |
| `radar_config.sector_config`                 | Dynamic sector clustering thresholds (min/max sectors, dissolve/spawn rules).        |
| `radar_config.breadth_config`                | Breadth window days + per-org-per-day cap + high-breadth threshold.                  |
| `radar_config.clustering_config`             | Co-mention window + min co-mentions + min cluster size.                              |
| `radar_config.velocity_config`               | Vendor + topic velocity thresholds (surging / accelerating / cooling).               |
| `radar_config.vendor_sweep_config`           | Promotion / watch / silence thresholds + hot-event keywords + auto-apply rules.      |
| `radar_config.topic_taxonomy_seed`           | Seed topic IDs (group keys serve as category *hints*, not authoritative).            |

## How to use

```
# Read today's digest
open daily/{YYYY}/{MM}/{date}.md
# …or in Apple Notes if the sync-notes skill is enabled

# Drill into a slice for the day
open news/{YYYY}/{MM}/{date}.md         # or papers/, blogs/, jobs/, linkedin/, github/, hackernews/

# Inspect the radar visually
cd "/Users/yruosch/Documents/Claude/Projects/AI Researcher"
python3 -m http.server 8000
open http://localhost:8000/radar.html

# See what auto-applied to sources.json today
open vendor_candidates/{YYYY}/{MM}/{date}.md
tail -50 vendor_changes.log

# Roll back the most recent sources.json mutation
cp sources.json.bak sources.json

# Run the full pipeline on demand (TODAY only)
# Tell Claude: "Run ai-replay" (or "/ai-replay")
# Same fan-out as the nightly cron: 7 collectors + daily + radar + sweep
# + weekly (always) + trends (Mondays) + monthly (1st Monday of month).
# If today's files already exist, they are MERGED — existing items kept,
# new items added, derived sections regenerated. No -v2 ever.

# Run the scheduled task version (also TODAY only)
# Tell Claude: "Run the ai-daily-research task now."
# This is the Cowork-scheduled task; ai-replay is the manual equivalent.

# Re-run a single collector
# Tell Claude: "Run the ai-news SKILL only" (uses skills/ai-news/SKILL.md directly).
# The skill respects the same MERGE rules — re-running won't produce -v2.

# Pause the schedule
# Tell Claude: "Pause the ai-daily-research task."

# Change what's tracked
# Edit the relevant section of sources.json. Manual entries (no _auto_added flag) are preserved by every sweep.

# Disable auto-apply (revert to recommendation-only mode)
# In sources.json: set radar_config.vendor_sweep_config.auto_apply.enabled = false
```

## Schedule

```
ai-daily-research   cron: 0 20 * * *    (every day at 20:00 local; +jitter ~5 min)
```

Everything else (radar, vendor sweep, weekly, Monday trends, first-Monday-of-month monthly) is spawned by the orchestrator within the same run — no separate cron entries.

## State & persistence

- `discovered_orgs.json` — running org tally. The sweep maintains it. Has every org's mention dates, source types, contexts, velocity history, classification history.
- `github_stars.json` — running star counts for watched repos. The GitHub collector maintains it.
- `radar/index.json` — manifest of available radar dates, rebuilt every radar run.
- `sources.json.bak` — single most recent backup before a sweep mutation.
- `vendor_changes.log` / `keyword_changes.log` — append-only audit logs of every auto-apply mutation. Never truncated. Source of truth for sweep history.
- `vendor_changes.json` / `keyword_changes.json` — derived structured views of the logs, rebuilt every run by `scripts/rebuild_change_logs.py`. Carry parsed mutations, counts per verb/month, currently-active set, expired set, proven set, and (for vendor) a consistency check against `sources.json _auto_added` entries. Safe to delete — rebuilt next run.

## Date handling — `scripts/now.sh`

Single source of truth for `TODAY`, `WEEK_ID` (YYYY-Www), `MONDAY`, `SUNDAY`, `PREV_WEEK_ID`, `DOW_ISO`, `IS_MONDAY`, `IS_FIRST_MONDAY_OF_MONTH`, etc. Every skill and the orchestrator pulls dates from here — never via `date +%Y-%m-%d` directly (which caused drift bugs in early versions). The orchestrator passes these as a `PIPELINE TIMESTAMPS` footer to every subagent; subagents trust the passed values rather than recomputing.

Supports an optional `--for YYYY-MM-DD` override that recomputes every derived field relative to the given date:

```bash
./scripts/now.sh --for 2026-05-11        # all fields recomputed for that Monday
./scripts/now.sh --for 2026-05-11 --json # same, JSON output
./scripts/now.sh --field WEEK_ID --for 2026-12-31  # one field for a target date
```

The override is plumbed end-to-end (also surfaces as `AS_OF` in the output) but **the `ai-replay` skill currently uses today only** — past-date replay is out of scope because collectors fetch live URLs. The `--for` flag is available for one-off shell tooling (e.g. recomputing what the WEEK_ID *would have been* on a specific date).

## Maintenance

```bash
# Pipeline health
ls daily/{YYYY}/{MM}/ | wc -l         # how many days have a digest?
grep -c 'failed' daily/{YYYY}/{MM}/*.md  # how often is a collector failing?
tail -100 vendor_changes.log          # what has auto-applied recently?
ls radar/{YYYY}/{MM}/ | wc -l         # radar days on file
cat sources.json | python3 -c 'import json,sys; d=json.load(sys.stdin); print(len(d["news_collector"]["enterprise_vendors"]))'

# Cleanup
# Manual entries in enterprise_vendors are never touched. If you want to remove an auto-added entry permanently, also remove it from discovered_orgs.json or it may be re-promoted.

# Tuning examples
# Too event-driven? Lower ema_alpha_slow (default 0.05) to 0.02 in sources.json
# Sectors thrashing? Raise min_topics_per_sector (default 2) to 3
# Too many promotions? Raise promotion_thresholds.min_total_mentions (default 8) to 12
# Hot events too aggressive? Raise velocity_config.hot_event_velocity_threshold (default 5.0)
```

## Skills not covered above

- `skills/sync-notes/SKILL.md` — manual one-shot to push the latest daily into Apple Notes. The orchestrator does this automatically via the AppleScript bridge; this skill is for catching up after missed days or backfilling.

## What the pipeline does NOT do (yet)

Deferred items (documented in conversation history):

- **Past-date replay** (collectors fetch live URLs — out of scope; would need historical archives like Common Crawl).
- **Daily health beacon:** `daily/{date}-health.json` with per-collector item counts + failure flags, so "is the pipeline alive" is a one-glance signal.
- **Soft cap on `enterprise_vendors` size** with a "deep-watch" demotion tier — auto-grown list is at 18 today (post-bug-fix; was 26 before the legacy `hot-add` entries got reclassified). Trajectory still says 40+ by month-end if the sweep keeps promoting; needs a budget mechanism before then.
- **Cron-side orchestrator alignment.** `skills/ai-replay/SKILL.md` is now the canonical orchestrator spec (the previous `ORCHESTRATOR_UPDATE.md` is deleted). The cron'd `ai-daily-research` task in Cowork's UI should be pasted from §1–§8 of that file. Until verified, treat the cron's behavior as "should match ai-replay but trust nothing."
- **Twitter/X collector** via Claude in Chrome (curated researcher list).
- **Earnings-call / 10-Q AI-mention tracker.**
- **A/B testing infrastructure** for threshold tuning.
- **Pattern-matching forecasting** ("vibe coding wave looks like 2024 RAG wave").

**Shipped this session:** firm view (`orgs.html`), keyword sweep (Python implementation + first run with 200-phrase tally), briefing radar (`radar.html`), change-log JSON views with consistency check (caught the vendor-sweep legacy `hot-add` bug), vendor-sweep skill hardened to prevent the bug from recurring, maturity badge in briefing radar, sector/cluster filter chips with pinned+dynamic tiers.

Add any of the deferred items by writing a new `skills/{name}/SKILL.md` (or `scripts/{name}.py` if deterministic), then wiring it into `ai-replay/SKILL.md` (and the cron-side orchestrator) at the appropriate §3 (collector) or §6.x (post-synthesis agent) step.
