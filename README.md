# AI Researcher

A self-maintaining daily research pipeline for the LLM / Generative AI / RAG / agent-protocols / AI-governance space, plus the Swiss AI job market, with an Angular SPA on top for browsing the output. **One scheduled task** orchestrates seven collector subagents in parallel, synthesizes a single daily digest with reading priorities, fires a trend radar with dynamic sectors and cross-topic clustering, runs a vendor sweep that auto-maintains the source list, and cumulatively rolls up weekly / monthly views. Manual replay for today is supported via `ai-replay`.

## Repository layout

```
.
├── app/         Angular SPA — reads everything in data/. Run with `npm install && npx ng serve`
│                from inside app/. Built with Angular 21 + PrimeNG (Aura light theme).
│                app/public/data is a symlink to ../../data so dev-server and prod build serve
│                the JSON/MD under the same origin.
│
├── pipeline/    Everything the nightly cron writes / runs
│   ├── scripts/         Python helpers (build_org_view, run_keyword_sweep, run_github_sweep,
│   │                    rebuild_change_logs, …) + now.sh + Apple Notes bridge (.applescript,
│   │                    .plist, .sh).
│   ├── skills/          ai-news, ai-papers, ai-blogs, ai-jobs-ch, ai-linkedin, ai-github,
│   │                    ai-hackernews + the synthesizers (ai-trend-radar, ai-vendor-sweep,
│   │                    ai-keyword-sweep, ai-weekly-digest, ai-trends, ai-monthly-rollup) +
│   │                    ai-replay (manual entry point).
│   ├── state/           Persistent pipeline state — sources.json, discovered_orgs.json,
│   │                    discovered_keywords.json, github_stars.json, vendor_changes.{json,log},
│   │                    keyword_changes.{json,log}, github_changes.{json,log}, *.bak.
│   └── CRON_PROMPT.md   Canonical orchestrator prompt for the Cowork scheduled task.
│
├── data/                    Split into publish/ (what humans read) and research/ (raw + internal):
│   ├── publish/             What the web app reads + what gets published.
│   │   ├── daily/  weekly/  monthly/  radar/   Cadence reports (.md + .json where applicable).
│   │   ├── orgs/  {slug}.json + index.json     Firm-level coverage view.
│   │   ├── reports/ index.json                  Flat dated index of every published cadence artifact.
│   │   └── index.md                             Human-readable TOC (legacy).
│   └── research/            Inputs the orchestrator reads, plus pipeline-internal change logs.
│       ├── sources/         Raw collector outputs — never surfaced in the web app.
│       │   └── news/  papers/  blogs/  jobs/  linkedin/  github/  hackernews/
│       └── sweeps/          Sweep change logs (auto-applied vs `state/sources.json`).
│           └── vendor_candidates/  keyword_candidates/  github_candidates/
│
└── legacy/      Pre-Angular standalone HTML (app.html, orgs.html, radar.html) kept as reference
                 for the redesign. Will be deleted once the SPA reaches feature parity.
```

The pipeline scripts use `_lib.py`'s `PUBLISH_DIR / RESEARCH_DIR / SOURCES_DIR / SWEEPS_DIR` constants (plus per-cadence aliases like `DAILY_DIR / RADAR_DIR / ORGS_DIR`) as the single source of truth for layout — change those if you move things again. The Angular `DataService` knows the publish/sweeps split and routes requests to the right base.

## Running the app locally

```bash
cd app
npm install            # first time only
npx ng serve           # → http://localhost:4200 — hot reload, serves data/ via symlink
npx ng build           # production build → app/dist/app/
```

> **Note on the LaunchAgent.** `pipeline/scripts/com.yves.ai-digest-to-notes.plist` watches `data/publish/daily`, `data/publish/weekly`, `data/publish/monthly`, `data/publish/trends.md` (post-2026-05-16 restructure). After updating, re-copy + reload the installed plist: `launchctl unload ~/Library/LaunchAgents/com.yves.ai-digest-to-notes.plist && cp pipeline/scripts/com.yves.ai-digest-to-notes.plist ~/Library/LaunchAgents/ && launchctl load ~/Library/LaunchAgents/com.yves.ai-digest-to-notes.plist`.

> **The sections below describe the pipeline in detail.** Path examples (`daily/...`, `radar/...`) are written cadence-relative; substitute `data/publish/daily/...` for the publish-side and `data/research/sources/news/...` / `data/research/sweeps/vendor_candidates/...` for the research-side.

The whole point: **be a step ahead.** Reactive ingestion (news, papers, blogs, jobs, LinkedIn) is necessary but not sufficient. The pipeline adds earlier signals (GitHub trending, Hacker News, vendor velocity) and analytical layers (radar with dual-EMA persistence + cross-source breadth + co-mention clusters) so the long-term shifts are visible alongside the daily news.

> **Checking pipeline state.** The pipeline started writing on 2026-05-04. To see what's actually been produced (vs. what should have been), the file system is the source of truth:
> ```bash
> ls daily/{YYYY}/{MM}/ | wc -l                 # how many daily digests this month
> for d in news papers blogs jobs linkedin github hackernews; do
>   echo "$d: $(ls $d/{YYYY}/{MM}/ 2>/dev/null | wc -l) files this month"
> done                                            # per-collector cadence — silent collectors stand out
> ls radar/{YYYY}/{MM}/*.json | wc -l            # radar runs on file
> tail -50 vendor_changes.log                     # what auto-applied recently
> python3 scripts/rebuild_change_logs.py          # refresh the derived JSON views (vendor/keyword/github)
> ```
> If a folder is missing or sparse, it's most likely "never-yet-fired by the cron" rather than broken. Run `ai-replay` to force a fresh pass — it exercises all 7 collectors plus radar/sweeps end-to-end. (Cron drift is a recurring failure mode: see `CRON_PROMPT.md` for the canonical prompt to paste into the Cowork scheduled-task UI.) `trends.md` is Monday-only; first monthly rollup happens on the first Monday of the month.

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
│   §6.7  scripts/build_org_view.py    → orgs/index.json + orgs/{slug}.json  │
│   §6.8  scripts/run_keyword_sweep.py → keyword_candidates/{date}.md        │
│                                + keyword_judge_request.md (agent loop)     │
│   §6.85 scripts/run_github_sweep.py  → github_candidates/{date}.md         │
│                                (auto-extends watched_repos)                │
│   §6.9  scripts/rebuild_change_logs.py → vendor/keyword/github_changes.json│
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
sources.json.vendor.bak      ← one-step rollback of the last vendor sweep mutation
sources.json.keyword.bak     ← one-step rollback of the last keyword sweep mutation
sources.json.github.bak      ← one-step rollback of the last github sweep mutation
seed_orgs.json (in scripts/) ← bootstrap list of ~120 AI companies for the sweep
discovered_orgs.json         ← running tally of every org we've seen (the sweep's state)
github_stars.json            ← running star counts on watched repos
vendor_changes.log           ← append-only audit log of every sources.json vendor mutation
vendor_changes.json          ← derived view: active + deep-watch sets, expired, proven, consistency check
keyword_changes.log          ← append-only audit log of every sources.json keyword mutation
keyword_changes.json         ← derived structured view (same shape as vendor_changes.json)
github_changes.log           ← append-only audit log of every github_collector.watched_repos mutation
github_changes.json          ← derived structured view (same shape as vendor_changes.json)
discovered_keywords.json     ← running tally of mined n-gram phrases (the keyword sweep's state)
discovered_orgs_archive.json ← long-tail orgs pruned from discovered_orgs.json (created lazily by scripts/archive_stale.py)
discovered_keywords_archive.json ← boilerplate-tagged keywords past TTL (created lazily by scripts/archive_stale.py)
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
vendor_candidates/{YYYY}/{MM}/{date}.md  ← daily change log (vendor sweep mutations to sources.json)
keyword_candidates/{YYYY}/{MM}/{date}.md ← daily change log (keyword sweep mutations to sources.json)
github_candidates/{YYYY}/{MM}/{date}.md  ← daily change log (github sweep mutations to watched_repos)
weekly/{YYYY}/{YYYY-Www}.md          ← cumulative Mon→Sun, overwritten daily
monthly/{YYYY}/{YYYY-MM}.md
trends.md                            ← long-term ledger, Monday-appended
index.md                             ← table of contents across all cadences

orgs/index.json                      ← sorted list of all orgs (firm view manifest)
orgs/{slug}.json                     ← per-org timeline / velocity / topic mix
radar.html                           ← briefing radar viewer — Today + Arcs modes, pinned filter chips
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
- `sources.json.keyword.bak` rollback before every write (per-sweep .bak — see "State & persistence").
- `keyword_changes.log` append-only audit trail (verbs: `promote-add`, `hot-event-add`, `expire-remove`, `proven-promote`). Legacy `hot-add` (no payload) is deprecated and will not be emitted.
- JSON parse-validation before write; abort on failure.
- Auto-demote disabled by default; even when enabled, proven entries are excluded.
- Disable via `keyword_sweep_config.auto_apply.enabled: false` — reverts to recommendation-only.

**Output:** `keyword_candidates/{YYYY}/{MM}/{date}.md` — daily change log describing what was applied, pending, watching, and newly proven. `discovered_keywords.json` carries the running tally.

**Implementation:** two-step. `scripts/run_keyword_sweep.py` (deterministic Python) does the mining, classification, sustained-day gate, and auto-apply. An **agent** does boilerplate-judging — the script never has a hard-coded list of "template phrases to drop." Instead, every candidate phrase enters the tally; the script writes `keyword_judge_request.md` listing phrases that need a verdict; the agent reads each phrase + context and writes `keyword_judge_verdicts.json` with `signal`/`boilerplate` decisions; the next sweep run applies the verdicts and caches them for 30 days before re-asking. This means new template artifacts the pipeline introduces get caught the first time the agent reviews them, not after someone notices and patches the script.

## The github sweep — auto-extending the watched-repos list

Same pattern as vendor and keyword sweeps, applied to GitHub repos. Motivated by: trending repos surface 1-3 weeks before mainstream coverage, but the daily collector only tracks star-count deltas on the manually-curated `watched_repos` list. A repo that explodes today gets a one-day call-out and then is forgotten. The github sweep auto-extends `watched_repos` for repos that consistently trend.

Runs daily after the keyword sweep. Mines the rolling 14-day window of `github/{YYYY}/{MM}/*.md` files for trending-repo H3 entries. Per-repo: distinct trending days, max one-day star delta, total star delta in the window.

**Tiers:**
1. `covered_active` — already in `watched_repos`. No action.
2. `revive` — in `deep_watch_repos` AND ≥1 trending appearance. Re-promote to `watched_repos`.
3. `hot_event` — uncovered AND max-one-day delta ≥5,000 stars. Auto-add with 30-day TTL.
4. `promote` — uncovered AND ≥3 distinct trending days in 14d, sustained for ≥2 consecutive sweep runs. Auto-add to `watched_repos`.
5. `watch` — uncovered AND ≥2 trending days. No action; surfaces in change log.
6. `dormant` — everything else.

**Soft cap:** `max_watched_repos` (default 80). When exceeded AND `_auto_added` repos are silent for ≥60 days (no trending appearance), the OLDEST-SILENT (up to 3 per run) get moved to `news_collector.github_collector.deep_watch_repos`. The github collector skips the deep-watch list for daily star-fetch but the sweep still recognizes returning trending appearances as `revive`.

**Auto-apply safeties** (identical pattern to vendor + keyword sweeps):
- `sources.json.github.bak` rollback before every write (per-sweep .bak).
- `github_changes.log` append-only audit trail (verbs: `promote-add`, `hot-event-add`, `expire-remove`, `deep-watch-demote`, `deep-watch-promote`).
- JSON parse-validation before write; abort on failure.
- Manual entries (no `_auto_added` in `github_stars.json`) are NEVER touched.
- Disable via `github_sweep_config.auto_apply.enabled: false`.

**State:** `github_stars.json` carries `_auto_added`, `_added_on`, `_added_reason`, `_classification_history`, `_demoted_on/_demoted_reason` (when applicable) per repo. `github_candidates/{YYYY}/{MM}/{date}.md` is the daily change log.

**Implementation:** `scripts/run_github_sweep.py` — single deterministic Python script. No agent involvement.

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
- Before every write: `cp sources.json sources.json.vendor.bak` (per-sweep rollback target).
- After every change: line appended to `vendor_changes.log` (append-only audit trail).
- Before write: JSON parse-validate; abort if invalid.
- Each auto-added entry carries `_auto_added`, `_added_on`, `_added_reason`, optionally `_expires_on`.
- Disable via `radar_config.vendor_sweep_config.auto_apply.enabled: false` — reverts to recommendation-only.

**Expiration:** hot-event entries past `_expires_on` get auto-removed on the next sweep, UNLESS they meanwhile crossed the sustained-promote gate (in which case they were already re-added without expiry).

**Soft cap + deep-watch demotion (added 2026-05-14):** the sweep enforces `max_enterprise_vendors` (default 30). When the list exceeds the cap AND there are `_auto_added` entries silent for ≥60 days, the OLDEST-SILENT (up to 3 per run) get moved into `news_collector.deep_watch_vendors` rather than deleted. The news collector skips the deep-watch list for daily fetches, but the radar still recognizes mentions. **Re-promotion path:** if a deep-watch vendor classifies as `hot_event` or sustained-`promote`, the original entry moves back to `enterprise_vendors` (so a returning vendor isn't seen as a brand-new promotion). Manual entries and entries classified hot/promote today are NEVER demoted. Audit verbs: `deep-watch-demote`, `deep-watch-promote`. The same mechanism applies to keyword lists (`web_search_queries`, `filter_keywords`, `pulse_topic_queries`, `topic_taxonomy_seed._auto_added`) with per-list caps and `_deep_watch_meta` registries — proven keywords are exempt as always.

## Long-tail archive — `scripts/archive_stale.py`

Two state files grow without bound: `discovered_orgs.json` (running org tally) and `discovered_keywords.json` (mined-phrase tally). Most growth is healthy (real signal), but a long tail of single-mention orgs and boilerplate-tagged keywords doesn't pay rent. Run periodically (weekly or monthly) to prune them into parallel archive files:

```bash
python3 scripts/archive_stale.py --orgs --keywords --dry-run    # preview
python3 scripts/archive_stale.py --orgs --keywords              # write
```

**Org thresholds** (`archive_config.orgs` in sources.json): `total_mentions ≤ 3` AND silent for `≥ 60 days`. Priority/enterprise/deep-watch orgs are never archived. Archived to `discovered_orgs_archive.json` (created lazily).

**Keyword thresholds** (`archive_config.keywords`): boilerplate verdict ≥ 30 days old AND silent for ≥ 30 days. Phrases without a verdict are never archived. Archived to `discovered_keywords_archive.json`.

If a slug or phrase resurfaces after archival, the next sweep creates a fresh entry (no auto-restore from archive — kept simple). The archive files are read-only history.

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

## The HTML radar viewer — `radar.html`

The briefing view, opened every morning. Two modes accessible via a tab switch at the top:

- **Today** — the morning briefing. Up to 10 ranked items: stage transitions (both directions), surging topics, sector births/deaths, breadth jumps vs. yesterday, hot vendor events. Sorted by signal weight. Each clickable. On quiet days, auto-opens the polar-radar disclosure with an explanation. Supporting panels (clusters, sector evolution, top-8 score history) live behind `▸` disclosure buttons — present but quiet.

- **Arcs** — long-term lens. Left rail: filterable, searchable topic list with stage dot + direction arrow per row. Right: chosen topic's life-cycle arc (persistence + breadth dual-axis chart over all history), 7d/30d/90d/180d-ago stats with "cold" markers when the window isn't warm yet, sector history, orgs talking, supporting files. One topic at a time, no clutter.

**Filter chips** at the top of every mode, two tiers:
- **★ Pinned** (gold star) — survives sessions via localStorage. Stays even when the underlying sector/cluster isn't in today's snapshot (shows tooltip "Pinned but no topics in this snapshot").
- **Dynamic** (☆) — today's sectors + clusters, minus the already-pinned. Click ☆ to pin, ★ to unpin. Click the chip body (not the star) to filter the active mode.

Both sectors (◆) and topic clusters (🔗) get chips in one row.

**Cross-links**: `→ firm view` (`orgs.html`), `→ index` (`index.md`).

**Maturity badge** next to the date selector: pipeline age in days + which momentum windows are reliable (cold / warming / warm).

### Serve it:

```bash
cd "/Users/yruosch/Documents/Claude/Projects/AI Researcher"
python3 -m http.server 8000
open http://localhost:8000/radar.html
```



## Configuration — `sources.json`

Edit this to change what the pipeline tracks. Major sections:

| Key                                          | Purpose                                                                              |
|----------------------------------------------|--------------------------------------------------------------------------------------|
| `news_collector.priority_vendors`            | Frontier labs (5). MANDATORY coverage. Never modified by auto-apply.                 |
| `news_collector.enterprise_vendors`          | Platform layer (8 starter + auto-added). Mutated by the vendor sweep.                |
| `news_collector.deep_watch_vendors`          | Auto-demoted vendors (silent + over soft cap). News collector skips these for daily fetch; sweep can re-promote. |
| `news_collector.vendor_blogs`                | Informal blog URL list. Counted as `informal_covered`.                               |
| `news_collector.tech_news_sites`             | Heise, Handelsblatt, t3n, TheVerge, TechCrunch, ArsTechnica, …                       |
| `news_collector.swiss_sources`               | NZZ, SwissInfo.                                                                      |
| `news_collector.governance_sources`          | Stanford HAI, OECD AI, AI Act EU, AISI, NIST, METR, Apollo, …                        |
| `papers_collector`                           | ArXiv categories + HF Papers + max per category.                                     |
| `blogs_collector`                            | Medium tags + curated long-form blogs.                                               |
| `jobs_ch_collector`                          | Swiss role keywords + locations + boards.                                            |
| `linkedin_collector`                         | Pulse topic queries + hashtag feeds + capture rules.                                 |
| `github_collector`                           | Trending URLs + AI topic pages + watched_repos (manual seed; auto-extended by github sweep). |
| `github_collector.github_sweep_config`       | Repo promotion thresholds (≥3 trending days in 14d, sustained-day gate), hot-event delta, soft cap (`deep_watch_demote.max_watched_repos`). |
| `hackernews_collector`                       | HN endpoints + AI filter keywords + min-points threshold.                            |
| `radar_config.source_weights`                | Per-mention contribution to topic scores.                                            |
| `radar_config.max_mentions_per_source_type`  | Caps to prevent one chatty source dominating.                                        |
| `radar_config.stages`                        | Score ranges + sustained-days for each stage.                                        |
| `radar_config.sector_config`                 | Dynamic sector clustering thresholds (min/max sectors, dissolve/spawn rules).        |
| `radar_config.breadth_config`                | Breadth window days + per-org-per-day cap + high-breadth threshold.                  |
| `radar_config.clustering_config`             | Co-mention window + min co-mentions + min cluster size.                              |
| `radar_config.velocity_config`               | Vendor + topic velocity thresholds (surging / accelerating / cooling).               |
| `radar_config.vendor_sweep_config`           | Promotion / watch / silence thresholds + hot-event keywords + auto-apply rules + soft cap (`deep_watch_demote.max_enterprise_vendors`). |
| `radar_config.keyword_sweep_config`          | Auto-extending keyword lists; promote/watch/proven thresholds + per-list soft caps (`deep_watch_demote.max_per_list`). |
| `radar_config.topic_taxonomy_seed`           | Seed topic IDs (group keys serve as category *hints*, not authoritative).            |
| `archive_config`                             | Long-tail pruning thresholds for `scripts/archive_stale.py` (orgs and keywords).     |

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

# Roll back the most recent sources.json mutation (per sweep — pick the one whose
# change you want to undo)
cp sources.json.vendor.bak sources.json     # undo last vendor sweep mutation
cp sources.json.keyword.bak sources.json    # undo last keyword sweep mutation
cp sources.json.github.bak sources.json     # undo last github sweep mutation

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
- `sources.json.{vendor,keyword,github}.bak` — per-sweep backups, each refreshed at the start of its sweep's auto-apply step. Rolling back a single sweep no longer clobbers the others' rollback target.
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
- **Cron-side orchestrator alignment.** `skills/ai-replay/SKILL.md` is now the canonical orchestrator spec (the previous `ORCHESTRATOR_UPDATE.md` is deleted). The cron'd `ai-daily-research` task in Cowork's UI should be pasted from §1–§8 of that file. Until verified, treat the cron's behavior as "should match ai-replay but trust nothing."
- **Twitter/X collector** via Claude in Chrome (curated researcher list).
- **Earnings-call / 10-Q AI-mention tracker.**
- **A/B testing infrastructure** for threshold tuning.
- **Pattern-matching forecasting** ("vibe coding wave looks like 2024 RAG wave").

**Shipped this session:** firm view (`orgs.html`), keyword sweep (Python implementation + first run with 200-phrase tally), briefing radar (`radar.html`), change-log JSON views with consistency check (caught the vendor-sweep legacy `hot-add` bug), vendor-sweep skill hardened to prevent the bug from recurring, maturity badge in briefing radar, sector/cluster filter chips with pinned+dynamic tiers, deep-watch demotion for vendors / keywords / github-watched-repos (soft cap + re-promotion path; manual + proven entries sacred), github sweep (`scripts/run_github_sweep.py` — auto-extends `watched_repos` from trending-day tracking; new `github_changes.log/.json`), long-tail archive script (`scripts/archive_stale.py`) for org/keyword tally pruning, shared `scripts/_lib.py` (deduped iter_source_files / whole_word_pattern / SOURCE_DIRS across daily scripts), radar.html sector-shift block + arc-detail expanded stat grid (sustained_days / convergence / breadth / 180d), legacy hot-add filter in vendor_changes.json, full SKILL.md timestamp-footer cleanup, ai-trend-radar SKILL path fixes (root vs nested JSON; write-JSON-first guard).

Add any of the deferred items by writing a new `skills/{name}/SKILL.md` (or `scripts/{name}.py` if deterministic), then wiring it into `ai-replay/SKILL.md` (and the cron-side orchestrator) at the appropriate §3 (collector) or §6.x (post-synthesis agent) step.
