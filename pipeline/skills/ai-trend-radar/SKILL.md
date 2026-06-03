---
name: ai-trend-radar
description: Daily trend radar — reads recent collector outputs + prior radar.json, scores topics on TWO dimensions (persistence via dual EMA, breadth via distinct-org count), clusters them into dynamic sectors with hysteresis, assigns stages (Emerging / Consolidating / Mainstream / Fading), and emits radar/{YYYY}/{MM}/{date}.md + radar/{YYYY}/{MM}/{date}.json. Spawned by the orchestrator after daily synthesis.
---

> **Path resolution.** CWD when this skill runs is `data/`. Every cadence — `daily/`, `weekly/`, `monthly/`, `radar/`, `orgs/`, `reports/`, `news/`, `papers/`, `blogs/`, `jobs/`, `linkedin/`, `github/`, `hackernews/`, `vendor_candidates/`, `keyword_candidates/`, `github_candidates/`, `index.md` — is a sibling directly under `data/`. Output paths are bare (no `publish/` or `research/` prefix).
>
> **State files** (`sources.json`, `discovered_orgs.json`, `discovered_keywords.json`, `github_stars.json`, `vendor_changes.{json,log}`, `keyword_changes.{json,log}`, `github_changes.{json,log}`, `sources.json.{vendor,keyword,github}.bak`) live at `../pipeline/state/<filename>`. Helper scripts at `../pipeline/scripts/<name>.py` invoked as `python3 ../pipeline/scripts/<name>.py`. Other SKILLs at `../pipeline/skills/<name>/SKILL.md`.

You are the **trend radar agent**. The user's goal is to be *a step ahead* — to spot patterns early, distinguish noise from signal, and see where multiple independent sources converge on the same direction. The daily digest tells them what happened today; the radar tells them what's *shifting*.

The radar tracks topics across **two orthogonal dimensions** plus a **dynamic categorization**:

1. **Persistence** — `score_slow` (dual EMA). Is this signal sustained over time? Drives stage classification.
2. **Breadth** — `breadth_7d` / `breadth_30d`. How many *distinct organizations* are talking about this right now? Surfaces "many companies converging on the same topic" as a first-class visual signal.
3. **Sector** — which thematic cluster the topic belongs to *this week*. Sectors are computed dynamically each run (with hysteresis to prevent layout churn), so when the field shifts (e.g. RAG → Agents) the radar reflects that.

Your output has two files of the same content in different shapes:

1. **`radar/{YYYY}/{MM}/YYYY-MM-DD.md`** — human-readable narrative grouped by sector + stage. The user reads this every morning in Apple Notes.
2. **`radar/{YYYY}/{MM}/YYYY-MM-DD.json`** — structured data with the same topics, scores, momentum, source citations, breadth, sectors. Drives the radar.html viewer and any future dashboard. The user does NOT read this directly; it's machine fuel.

Both files come from the same scoring pass.

## Pipeline position

```
collectors → daily orchestrator → daily/{YYYY}/{MM}/{date}.md
                                + spawns YOU (ai-trend-radar) every day
                                  ↓
                                  reads: news/, /papers/, /blogs/, /jobs/, /linkedin/
                                          over the rolling window
                                  reads: radar/{YYYY}/{MM}/{yesterday}.json (for EMA + momentum)
                                  writes: radar/{YYYY}/{MM}/{date}.md + radar/{YYYY}/{MM}/{date}.json
```

You read everything in the rolling window (default 30 days), apply scoring with smoothing, and produce one radar per day. The radar smooths over days, so single loud-news days don't churn the picture.

## 1. Setup

- Workspace folder (CWD when invoked by the orchestrator): `/Users/yruosch/Documents/Claude/Projects/AI Researcher/data/`. All paths in this skill are relative to that — every cadence is a sibling directly under `data/`.
- Read `sources.json` `radar_config` section — all weights, thresholds, EMA alpha, and the topic taxonomy seed live there. Do NOT hardcode any of these.
- **Timestamps come from the orchestrator's invocation footer.** Look for `PIPELINE TIMESTAMPS` in the footer that follows this skill text — it carries authoritative `TODAY` (YYYY-MM-DD), `WEEK_ID` (YYYY-Www), `MONDAY`, `SUNDAY`, `MONTH`, `DOW_ISO`. Use those. If invoked standalone (no footer), fall back to `eval "$(../pipeline/scripts/now.sh)"` from the workspace root — same single source of truth. Do NOT compute the date or ISO week locally with `date +%Y-%m-%d` or bash arithmetic; that has drifted in the past.
- Output paths: `radar/{YYYY}/{MM}/{date}.md` and `radar/{YYYY}/{MM}/{date}.json`. Both files live under the same `{YYYY}/{MM}/` folder — do NOT write the JSON to the `radar/` root, that path was wrong in earlier versions of this spec. **If either exists for the same date, REPLACE in place — do NOT write `-v2`.** Unlike the collectors, the radar is fully derived from a single scoring pass over the rolling window — there's no manual editorial work to preserve. Re-running for today produces an authoritative new snapshot.
  - **Write order: JSON first, markdown second.** If the JSON write fails the markdown won't appear either, so a half-written run is visible (no md, no json) rather than silent (md present, viewer blind because no JSON in `radar/index.json`). The HTML viewer reads the JSON; the human reads the md — the JSON is load-bearing for tomorrow's EMA smoothing too.
  - **JSON:** overwrite the file with the new run's full content. The EMA computation still reads `radar/{YYYY}/{MM}/{yesterday}.json` (not today's own earlier version) — so re-running today doesn't compound-smooth its own scores.
  - **Markdown:** overwrite the file with the new run's full content. Add a single italic line under the subtitle: `_Re-run at {ISO_TS} — replaces the earlier same-day snapshot._`
  Never create `-v2`, `-v3`. The same-day file is the canonical record.

## 2. Gather inputs

In parallel (single message, multiple bash + Read calls):

1. List rolling-window source files. For each of `news/`, `papers/`, `blogs/`, `jobs/`, `linkedin/`, `daily/`, take the last `rolling_window_days` files (default 30).
   ```bash
   for d in news papers blogs jobs linkedin daily; do find $d -type f -name '*.md' 2>/dev/null | sort | tail -30; done
   ```
2. Read each listed file. Bulk-read with parallel Read calls.
3. Read `radar/{YYYY}/{MM}/{yesterday}.json` if it exists — this is the EMA baseline. If absent (day 1 of radar, or yesterday's run failed), proceed with no smoothing baseline; flag "first radar — no prior scores." Use `find radar -name '{yesterday}.json' -type f | head -1` if you don't know the year/month folder.

## 3. Extract topics

A *topic* is a coherent theme that can recur across days, not a one-off news item. Examples: `mcp-adoption`, `agentic-retrieval`, `prompt-engineer-decline`, `frontier-lab-jvs`, `vendor-governance-business-line`.

**Use the topic taxonomy seed** from `radar_config.topic_taxonomy_seed` as your stable topic ID list. When you encounter a story in the rolling window, map it to one of the seed topics if applicable. Only create a new topic ID when the story genuinely doesn't fit an existing arc — and if you do, give it a stable kebab-case ID future runs can reuse.

For each topic, collect every mention in the rolling window with:
- which file it appeared in (e.g. `news/2026/05/2026-05-10.md`)
- which source type the file represents (priority_vendor_blog / enterprise_vendor_blog / paper / long_form_blog / tech_news / governance_source / linkedin_network_post / linkedin_hashtag_post / job_posting_skill_mention / medium_aggregator)
- the date of the file (used for momentum and age)

### 3.5. Maintain `topic_keywords.json`

`../pipeline/state/topic_keywords.json` is the per-topic keyword registry that feeds `compute_topic_importance.py` (run in §4.8). It is the **source of truth for what counts as a mention** of each topic in raw source files — distinct from the radar's day-by-day topic creation decisions. The score-driven `score_slow` measures recent loudness; the keyword-driven `importance` measures structural persistence across all source types over the 30-day window.

**Schema:**
```json
{
  "topics": {
    "agent-memory": {
      "keywords": ["agent memory", "long-term memory", "letta", "mem0", "longmemeval", "atomic facts", ...],
      "label": "Agent memory (Datasette Agent layered memory, context-rot, Code with Claude memory track)",
      "_seeded_on": "2026-05-22",
      "_llm_enriched": true,
      "_last_updated": "2026-05-22"
    }
  }
}
```

**When to update:**
- **New topic created today**: append an entry with `keywords` covering the topic name, the parenthetical examples in the label, and 3-7 synonyms / product names / vendor names that would plausibly appear in source files about this topic. Examples of good keyword choices: specific product names (`claude code`, `cursor`, `letta`), vendor names (`langchain`, `pinecone`), abbreviations and version strings (`mcp`, `gemini 3.5 flash`, `kimi k2.5`). Avoid bare generic words (`agent`, `model`, `platform`) — they match everything.
- **Existing topic's label rotates today**: update its `keywords` to include any new examples, and bump `_last_updated`. Do not remove existing keywords (they preserve historical match continuity).
- **Topic stops appearing**: leave the entry alone. It stays available for future revival.

Use Edit with `replace_all: false`. Read the file, find the topics object, insert / update the relevant entry. Do not rewrite the whole file from scratch.

## 4. Score each topic

For each topic, compute:

**Raw score this run:**
```
raw = Σ (min(mention_count_for_type, cap_for_type) × source_weight_for_type)
```

For each source type:
- Capped count = min(actual mentions, `radar_config.max_mentions_per_source_type[type]`). Defaults: LinkedIn hashtag = 3, Medium / aggregator = 3, all others = 5.
- Contribution = capped count × `radar_config.source_weights[type]`.
- Sum contributions across all source types → raw.

The cap exists so a single chatty source (LinkedIn hashtag noise, aggregator re-posts) can't dominate a topic's score by volume alone. The full uncapped mention counts are still recorded in `source_mentions` for transparency — only the score math uses the capped values.

**Convergence multiplier:**
If the topic appears in `>= radar_config.convergence_multiplier.min_source_types` (default 3) DIFFERENT source types, multiply raw by `radar_config.convergence_multiplier.multiplier` (default 1.5). "Appears in" counts a source type if its uncapped mention count > 0 — diversity is what's rewarded, not volume.

**Dual EMA smoothing:**
The radar runs TWO EMAs in parallel — short-term reactive and long-term structural. This is the user's central request: "currently it feels too daily-focused on single events." The slow EMA is what tells you structural truth; the fast EMA tells you direction-of-change.

If `radar/{YYYY}/{MM}/{yesterday}.json` exists and contains this topic:
```
score_fast = α_fast × raw_today + (1 - α_fast) × score_fast_yesterday
score_slow = α_slow × raw_today + (1 - α_slow) × score_slow_yesterday
```
- `α_fast` = `radar_config.ema_alpha_fast` (default 0.3 — ~2.3-day half-life, reacts to news of the day)
- `α_slow` = `radar_config.ema_alpha_slow` (default 0.05 — ~14-day half-life, structural)

If first appearance for this topic: `score_fast = score_slow = raw_today`.

For backward compatibility in the JSON, also expose `score = score_slow` as the primary score field (which is what stage classification uses below).

**Breadth — distinct organizations *acting on* the topic.**

This is the *cross-source convergence* dimension. Independent from persistence. Answers: "how many separate organizations are *doing something* with this right now?" — NOT "how many outlets reported it." Coverage volume is not convergence; a single widely-reported event must not post a 40-org breadth.

For each topic, while collecting mentions:

- **For every mention, attribute an org only if that org is an *actor* in the topic** — it shipped/announced the thing, adopted/deployed it, regulates it, is hiring for it, or is directly and specifically affected by it (e.g. a stock move attributed to the topic). Use the **actor test**: *"Is this org doing something with the topic, or merely named in the coverage of it?"*
  - **Counts (actor):** an OpenAI blog post shipping a feature → `openai`. ServiceNow GA of an agent platform → `servicenow`. A UBS jobs.ch posting for an AI engineer → `ubs`. SAP making Claude its default reasoning engine → `sap` *and* `anthropic` (both are actors in that deal). A LinkedIn Pulse from an Accenture analyst about ServiceNow Otto → `servicenow` (the subject company is the actor; the analyst/author is the messenger).
  - **Does NOT count (messenger / publisher):** a Heise/Bloomberg/CNN article *reporting* the story → the publisher is excluded. Every slug in `radar_config.breadth_config.publisher_slugs` is a messenger, not a participant.
  - **Does NOT count (contrast co-mention):** a "Gemini 3.5 vs Claude vs GPT-5.5" benchmark roundup filed under `frontier-models-google` → only `google` (the subject of *this* topic) counts; `anthropic`/`openai` are named for contrast, not converging on Google's models, so they are NOT added to *this* topic's breadth. (They earn their own breadth on *their own* topics from *their own* actor-mentions.)
  - When you cannot tell whether an org is an actor or just mentioned, **exclude it** — breadth should under-count rather than inflate. This reverses the old "when ambiguous, pick the primary subject" rule, which let broadly-reported single events post inflated breadth.
- **Deterministic publisher filter (apply before counting):** after assembling each topic's raw org set, drop any slug in `radar_config.breadth_config.publisher_slugs` **unless that publisher is itself the topic's subject** (e.g. an NZZ story about NZZ building RAG). This catches the biggest source of inflation regardless of LLM judgment. Keep dropped slugs in `source_mentions` for transparency — only the breadth *count* changes.
- Use lowercase, kebab-case slugs. Be consistent across days. Common actor slugs: `openai`, `anthropic`, `google`, `microsoft`, `meta`, `mistral`, `deepseek`, `sap`, `salesforce`, `servicenow`, `nvidia`, `snowflake`, `databricks`, `ibm`, `redhat`, `n8n`, `oracle`, `workday`, `pinecone`, `langchain`, `llamaindex`, `huggingface`, `apple`. (Publication slugs like `heise`, `bloomberg`, `techcrunch` are NOT actor slugs — they live on `publisher_slugs` and are excluded from breadth.)
- Apply the per-day cap: `radar_config.breadth_config.max_mentions_per_org_per_day` (default 2). One company spamming five blog posts on the same day still only contributes 2 to breadth math (though all are kept in `source_mentions` for transparency).

Compute, **on the actor-filtered org set**:
```
breadth_7d  = | { actor-org : org acted on this topic in any source file dated within last 7 days } |
breadth_30d = | { actor-org : org acted on this topic in any source file dated within last 30 days } |
```

These are distinct-actor counts in the respective windows. Also emit `breadth_orgs_7d` = the list of actor-org slugs **sorted by descending actor-mention frequency** (most-active actor first), capped at the top 20 — so the viewer shows *which companies are doing this*, not an alphabetical truncation that always dropped the z's. Topics with `breadth_7d >= radar_config.breadth_config.thresholds.high_breadth_7d` are flagged `high_breadth: true` in the JSON — the viewer uses this for visual emphasis.

**Momentum + biography:**

Look up this topic's prior radar.json entries at chained lookbacks to populate biography fields:

```
score_7d_ago   = score_slow from radar JSON of (TODAY - 7 days),  null if not available
score_30d_ago  = score_slow from radar JSON of (TODAY - 30 days), null if not available
score_90d_ago  = score_slow from radar JSON of (TODAY - 90 days), null if not available
score_180d_ago = score_slow from radar JSON of (TODAY - 180 days), null if not available
```

Use `find radar -name '{target_date}*.json' -type f | head -1` for each lookback. These let the future viz render long-arc charts without loading hundreds of files.

```
momentum_7d_pct = (score_slow_today - score_7d_ago) / score_7d_ago × 100
direction = "surging" if score_fast > score_slow * 1.50   # 4-tier added 2026-05-14
          | "rising"  if score_fast > score_slow * 1.10
          | "fading"  if score_fast < score_slow * 0.90
          | "steady"  otherwise
```

The `surging` tier is the topic-level analogue of the vendor-level velocity surge — score_fast has 1.5×'d the slow baseline, meaning the topic is having a *moment*. The viewer renders these dots with a brighter glow.

The `direction` field is the user-facing answer to "is this trending up or down right now" — short-term derived from comparing fast vs. slow.

## 4.5. Cluster topics into dynamic sectors (hysteresis-stabilized)

Sectors are the *quadrants* of the radar — the thematic buckets. Unlike a fixed taxonomy (Models / Agents / Governance / Methods forever), sectors are **recomputed every run** so the radar reflects what's actually happening in the field. RAG-as-a-sector dissolving into Agents over weeks is exactly the kind of structural shift the user wants visible.

But sectors must be **stable enough day-to-day to be readable.** Two mechanisms enforce that:

1. **Sticky priors.** Read `prior_sectors` from yesterday's radar JSON (`radar/{YYYY}/{MM}/{yesterday}.json` → `sectors` array). The clustering step gets these as input. Yesterday's sector for each topic is the default; only re-assign when the topic clearly doesn't fit anymore.
2. **Min/max bounds.** Configured in `radar_config.sector_config`:
   - `min_sectors` (default 3), `max_sectors` (default 6)
   - `min_topics_per_sector` (default 2) — sector dissolves if it falls below this for `sector_dissolve_after_days_below_min` (default 5) consecutive days; its remaining topics merge into the nearest sector.
   - `min_topics_for_new_sector` (default 3) — don't spawn a new sector for fewer than this many topics that "don't fit" — let them sit in their existing sector instead.

**Procedure (LLM-driven — you do this yourself, in the radar-skill conversation):**

a) Read `prior_sectors` from yesterday's radar JSON. Format is `[{"name": "...", "topic_ids": [...], "first_seen": "YYYY-MM-DD"}, ...]`. If no prior radar exists, seed with `radar_config.sector_config._starter_sectors`.

b) Take the set of topics that placed into a stage this run (Emerging / Consolidating / Mainstream / Fading — i.e. anything not in background).

c) For each topic, decide which sector it belongs to *this run*. Reasoning order:
   - If the topic was in a sector yesterday AND that sector still exists AND the topic still fits its theme → keep it there.
   - Else, check whether it fits another existing sector's theme — assign to the best fit.
   - Else (it doesn't fit any existing sector AND there are ≥ `min_topics_for_new_sector` other unassigned topics that share its theme) → propose a new sector. Name it with a 2-4 word label (e.g., "Edge inference", "Open-weight wave"). Add it to the sectors list.
   - Else (no fit, no critical mass for new sector) → assign to the nearest existing sector and note in `sector_history` that this was a forced fit (low confidence).

d) Apply post-clustering rules:
   - If any sector has fewer than `min_topics_per_sector` topics this run, increment its `consecutive_low_days` counter (carried in the JSON). If it crosses the dissolve threshold, dissolve it: redistribute its topics to other sectors, drop it from `sectors`.
   - If total sectors > `max_sectors`, merge the two most thematically similar.
   - If total sectors < `min_sectors`, split the largest one along its strongest internal theme line.

e) For every topic whose sector assignment differs from yesterday's, append an entry to its `sector_history`:
   ```json
   {"date": "{TODAY}", "from": "{prior_sector_name | null}", "to": "{new_sector_name}", "reason": "{1-line why — e.g. 'RAG-eval topics now dominantly tied to agent-loop discussion'}"}
   ```
   `sector_history` lives on each topic and carries forward run to run. Treat it as append-only: copy yesterday's array and only push a new entry when a transition actually happened.

**Output of this step** is two updates to your in-memory state:

- A `sectors` list for today: `[{"name": "...", "topic_ids": [...], "first_seen": "...", "consecutive_low_days": 0, "description": "1-line characterization of this sector this week"}, ...]`
- A `sector` field on each topic, plus a (possibly extended) `sector_history` array.

Keep sector names **stable across days** when possible — if yesterday's name was "Agents & infrastructure", don't rename to "Agent infra" today just for style. Renames are visible to the user as a sector dissolution + creation, so reserve them for when the theme truly shifted.

## 4.7. Build cross-topic clusters (co-mention graph)

Sectors group topics by *theme* (what they're about). Clusters group topics by *whether they're talked about together this week* (what's moving in concert). They're different cuts:

- A sector says: "vector-db-market is in 'Agents & infrastructure' because it's about agent-layer retrieval."
- A cluster says: "vector-db-market + agentic-retrieval + tool-use-standards + a2a-protocol are all co-mentioned in 8+ files this week — they're ONE mega-trend in motion, not four."

User-stated motivation 2026-05-14: "the radar treats topics as independent, but `mcp-adoption + tool-use-standards + a2a-protocol + agent-sdks` are clearly one mega-trend moving together. Cross-topic correlation is signal."

**Procedure:**

a) For every PAIR of topics (T_i, T_j) that placed into a stage this run, compute `co_mention_count` = number of supporting_files dated within the last `clustering_config.co_mention_window_days` (default 7 days) that appear in BOTH topics' `supporting_files`. Skip pairs where T_i == T_j.

b) Build an adjacency graph: edge between T_i and T_j if `co_mention_count >= clustering_config.min_co_mentions` (default 3).

c) Find connected components. Each component with `size >= clustering_config.min_cluster_size` (default 2) becomes a cluster. Singletons stay clusterless.

d) **Name each cluster** with a 2-4 word label that captures the shared theme. Use the topic labels of the largest 2-3 cluster members as input — derive a label that generalizes. Examples that should emerge from current data:
   - {mcp-adoption, tool-use-standards, a2a-protocol, agent-sdks} → "Agent protocol stack"
   - {vector-db-market, agentic-retrieval, long-context-vs-rag} → "Retrieval reshuffle"
   - {eu-ai-act, iso-42001, nist-ai-rmf} → "Governance regime"
   - {frontier-models-openai, frontier-models-anthropic, frontier-models-google} → "Frontier model cadence"

e) **Sticky names.** Read prior radar's `topic_clusters` if it exists. If a current cluster has ≥ 50% topic overlap with a prior cluster, REUSE the prior cluster's name. Only rename when the cluster's membership has rotated substantially.

f) Compute per-cluster aggregate metrics:
   - `cluster_score_slow` = avg of member topics' `score_slow`
   - `cluster_score_fast` = avg of member topics' `score_fast`
   - `cluster_direction` = "rising" if cluster_score_fast > cluster_score_slow × 1.15, "fading" if < 0.85, else "steady"
   - `cluster_breadth_7d` = size of union of all member topics' `breadth_orgs_7d`
   - `members_moving_together` = boolean — true if at least 3 member topics share the same `direction` value

g) On each topic, set `cluster_id` and `cluster_history` (append-only):
   ```json
   "cluster_history": [
     {"date": "2026-05-14", "from": null, "to": "Agent protocol stack", "reason": "first appearance"}
   ]
   ```
   `cluster_history` only gets a new entry when the topic's cluster changes — sticky most days.

Emit `topic_clusters` as a top-level array in the radar JSON output (see §6 schema).

## 4.8. Compute importance from raw source-file presence

After §3.5 keyword maintenance is done, run the Python script that scans all source files in the 30-day window and counts presence per topic. Importance is the user-facing measure of *structural relevance* — independent of the radar's per-day topic-creation decisions and independent of EMA score volatility.

**Why this step exists:** the radar agent sometimes takes 10-14 days to recognize a topic that's been mentioned in source files all along (e.g., `agent-memory` had 22 days of source presence before the radar carved it out as a topic on May 14). Without this step, the radar's own ranking penalizes topics it was slow to notice. With this step, a sustained topic is visibly important from day 1 regardless of when the radar gave it an ID.

```bash
python3 ../pipeline/scripts/compute_topic_importance.py --as-of {TODAY} --quiet
```

The script reads `../pipeline/state/topic_keywords.json` + all `data/<source_type>/YYYY/MM/*.md` in the 30-day window, then writes `data/.cache/importance/{TODAY}.json` with structure:

```json
{
  "_computed_at": "2026-05-22",
  "_window_days": 30,
  "_files_scanned": 240,
  "_topic_count": 41,
  "topics": {
    "agent-memory": {
      "days_in_sources": 22,
      "source_types_in_sources": 5,
      "window_days": 30,
      "computed_at": "2026-05-22"
    }
  }
}
```

**Read the cache after the script runs.** For each topic, add three fields to the JSON output (§6 schema):
- `days_in_sources_30d` (int) — distinct dates within last 30 days where any of the topic's keywords matched any source file.
- `source_types_in_sources_30d` (int) — distinct source types (daily / news / papers / blogs / linkedin / github / hackernews / jobs) where matches occurred.
- `importance` (float, 2 decimals) — computed as `days_in_sources_30d × source_types_in_sources_30d × ln(breadth_30d + 2)`. This is the primary ranking key in the markdown output (§7).

**If `compute_topic_importance.py` fails** (script error, missing keywords file, etc.): log the failure, set all three fields to `null` on every topic, and rank §7 by `score_slow` as a fallback. Do not fail the radar run.

## 5. Assign stages — based on SLOW score (structural)

Stages are about structural state, not yesterday's news. Use `score_slow` for all stage threshold comparisons. The fast EMA is for direction-of-change only.

Apply stage rules from `radar_config.stages` IN ORDER (substitute `score_slow` wherever the rule says "score"):

1. **Fading first.** If topic was previously `mainstream` OR `consolidating` AND momentum_pct < -25% over rolling window → `fading`. (Momentum here uses slow EMA history, not fast.)
2. **Mainstream.** `score_slow` ≥ stage.mainstream.score_range[0] (default 70) AND sustained ≥ `min_sustained_days` (default 30).
3. **Consolidating.** `score_slow` in stage.consolidating.score_range AND sustained ≥ `min_sustained_days` (default 7) AND covered by ≥ `min_source_types` (default 3) source types.
4. **Emerging.** `score_slow` in stage.emerging.score_range AND first_seen within `max_age_days` (default 21) AND covered by ≥ `min_source_types` (default 2).
5. **Background** (none of the above). Topic exists but doesn't meet any stage bar. Track it internally; omit from the radar output unless user-specified.

The user's complaint was that the radar feels "daily-focused on single events." Using slow score for stage gates means a single loud day no longer promotes a topic to Consolidating. The topic has to sustain elevated mentions over the slow-EMA half-life (~14 days) before crossing the threshold. That's the structural-change view they asked for.

Stage transitions: if a topic crosses a threshold, record the transition in `stage_movements` for the JSON output ("this topic moved from emerging → consolidating today"). These transitions are the radar's highest-value moments.

## 6. Write the JSON output

Write to `radar/{YYYY}/{MM}/{YYYY-MM-DD}.json` (NOT to `radar/{YYYY-MM-DD}.json` at the root — that was a spec bug in earlier versions). Structure (note the top-level `sectors` array and per-topic `sector` / `sector_history` / `breadth_*` fields):

```json
{
  "date": "2026-05-12",
  "rolling_window_days": 30,
  "ema_alpha_fast": 0.3,
  "ema_alpha_slow": 0.05,
  "prior_radar": "radar/2026/05/2026-05-11.json",
  "sectors": [
    {
      "name": "Agents & infrastructure",
      "topic_ids": ["agentic-retrieval", "mcp-adoption", "agent-sdks", "tool-use-standards", "a2a-protocol"],
      "first_seen": "2026-04-22",
      "consecutive_low_days": 0,
      "description": "MCP adoption + cross-vendor agent protocols + agent platforms — the layer above frontier models",
      "topic_count": 5,
      "active_orgs": 14
    },
    {
      "name": "Governance & market",
      "topic_ids": ["eu-ai-act", "iso-42001", "vendor-governance-business-line", "implementation-revenue"],
      "first_seen": "2026-04-30",
      "consecutive_low_days": 0,
      "description": "Regulation, compliance frameworks, vendor governance products, services revenue dynamics",
      "topic_count": 4,
      "active_orgs": 9
    }
  ],
  "sector_movements": [
    {"topic": "vector-db-market", "from": "Retrieval & search", "to": "Agents & infrastructure", "reason": "Vector DB coverage is now dominantly about agent-loop integration, not standalone RAG"}
  ],
  "sectors_dissolved_today": ["Retrieval & search"],
  "sectors_spawned_today": [],
  "topic_clusters": [
    {
      "id": "agent-protocol-stack",
      "name": "Agent protocol stack",
      "topic_ids": ["mcp-adoption", "tool-use-standards", "a2a-protocol", "agent-sdks"],
      "size": 4,
      "first_seen": "2026-04-28",
      "cluster_score_slow": 24.8,
      "cluster_score_fast": 39.5,
      "cluster_direction": "rising",
      "cluster_breadth_7d": 11,
      "members_moving_together": true,
      "_co_mention_evidence": "shared supporting_files (sample): blogs/2026/05/2026-05-11.md, blogs/2026/05/2026-05-13.md"
    }
  ],
  "topics": [
    {
      "id": "agentic-retrieval",
      "label": "Agentic retrieval / RAG-as-decision-loop",
      "sector": "Agents & infrastructure",
      "sector_history": [
        {"date": "2026-04-22", "from": null, "to": "Retrieval & search", "reason": "first appearance"},
        {"date": "2026-05-12", "from": "Retrieval & search", "to": "Agents & infrastructure", "reason": "now coupled with agent-loop discussion"}
      ],
      "stage": "consolidating",
      "score": 87.4,
      "score_fast": 92.0,
      "score_slow": 87.4,
      "raw_score_today": 92.0,
      "score_fast_yesterday": 88.5,
      "score_slow_yesterday": 86.8,
      "direction": "rising",
      "convergence_multiplier_applied": 1.5,
      "momentum_7d_pct": 12.4,
      "score_7d_ago": 78.0,
      "score_30d_ago": 42.1,
      "score_90d_ago": null,
      "score_180d_ago": null,
      "first_seen": "2026-05-06",
      "sustained_days": 7,
      "source_type_count": 5,
      "breadth_7d": 7,
      "breadth_30d": 12,
      "breadth_orgs_7d": ["anthropic", "openai", "llamaindex", "langchain", "pinecone", "snowflake", "databricks"],
      "high_breadth": true,
      "days_in_sources_30d": 23,
      "source_types_in_sources_30d": 7,
      "importance": 414.16,
      "source_mentions": {
        "_note": "Uncapped raw counts — for transparency. The capped values used in scoring are derived by min(count, radar_config.max_mentions_per_source_type[type]).",
        "priority_vendor_blog": 1,
        "paper": 6,
        "long_form_blog": 5,
        "tech_news": 4,
        "medium_aggregator": 3
      },
      "source_mentions_capped": {
        "_note": "Mentions after applying max_mentions_per_source_type cap. Score uses these values.",
        "priority_vendor_blog": 1,
        "paper": 5,
        "long_form_blog": 5,
        "tech_news": 4,
        "medium_aggregator": 3
      },
      "supporting_files": [
        "daily/2026/05/2026-05-08.md",
        "papers/2026/05/2026-05-08.md",
        "blogs/2026/05/2026-05-08.md",
        "news/2026/05/2026-05-12.md"
      ],
      "supporting_links": [
        "https://www.llamaindex.ai/blog/rag-is-dead-long-live-agentic-retrieval"
      ],
      "cluster_id": "agent-protocol-stack",
      "cluster_history": [
        {"date": "2026-04-28", "from": null, "to": "Agent protocol stack", "reason": "first appearance"}
      ]
    }
  ],
  "stage_movements": [
    {"topic": "prompt-engineer-decline", "from": "consolidating", "to": "fading", "first_observed_today": false},
    {"topic": "vendor-governance-business-line", "from": null, "to": "emerging", "first_observed_today": true}
  ],
  "background_topics_count": 14,
  "breadth_audit": {
    "_purpose": "Makes the actor-attribution correction (BREADTH_PLAN) observable and catches regression. publishers_excluded is exact (deterministic set-difference against breadth_config.publisher_slugs); the contrast count is best-effort. median_breadth_30d drives the one-shot threshold re-tune.",
    "publishers_excluded": 14,
    "contrast_comentions_excluded": "agent estimate or n/a",
    "median_breadth_30d": 9,
    "max_breadth_30d_topic": "ai-coding-agents"
  },
  "config_snapshot": {
    "_purpose": "exact tuning constants in effect this run, for reproducibility",
    "source_weights": "...as in sources.json at run time...",
    "convergence_multiplier": "...",
    "sector_config": "...",
    "breadth_config": "..."
  }
}
```

Keep the JSON deterministic — sort sectors alphabetically by name, sort topics by `sector` then `stage` then `score` descending. Include all topics that placed into a stage; omit background. Each sector entry's `active_orgs` is the count of distinct orgs across all its topics' `breadth_orgs_7d` (deduped).

## 7. Write the markdown output

Write to `radar/{YYYY}/{MM}/{YYYY-MM-DD}.md`. The user reads this in Apple Notes.

**Primary ranking is `importance`, not `score`.** Importance answers "what's structurally relevant" (sustained × broad × multi-source); score answers "what's loud this week." Score is still shown alongside, but it does not drive the ordering.

The layout has three tiers so that "what matters most" gets the most visual weight and "also tracked" stays available but compact:

```markdown
# AI Trend Radar — {YYYY-MM-DD}

_Rolling 30-day window. Topics are ranked by **importance** = `days_in_sources × source_types × ln(breadth_30d + 2)` — how often the topic actually appears in raw source files (daily/news/papers/blogs/linkedin/github/HN/jobs) over 30 days, independent of when the radar agent decided to create a topic for it. Score is loudness this week; importance is structural weight._

## What moved today
**Sector movements:** list every `sector_movements` entry as "**{topic_label}** — {from_sector} → {to_sector}. {reason}". (If no sector movements: "_No sector reassignments today._")

**Sector births / deaths:** list `sectors_spawned_today` and `sectors_dissolved_today`. (If none: skip the line.)

**Stage movements:** list every `stage_movements` entry as "**{topic_label}** — {from_stage} → {to_stage}". (If no stage movements: "_No stage transitions today — signals are steady._")

## Top 5 by importance — what actually matters this month

_These topics show up in source files most consistently, across the most source types, and engage the most distinct orgs. Persistent broad attention is the strongest signal of structural relevance._

For each of the top 5 topics by `importance`:

### {N}. {topic.label}
`{topic.stage}` · importance **{importance:.0f}** (presence {days_in_sources_30d}d / {source_types_in_sources_30d} sources, breadth_30d {breadth_30d} orgs) · score {score_slow:.0f} ({direction arrow ⇈/↑/→/↓} {momentum_7d_pct:+.0f}% 7d)

_Source mix:_ {top 3 source types by count}
_Orgs acting on this:_ {breadth_orgs_7d joined by `, `, top 10 by actor-mention frequency — these are actors, not the outlets that reported it}
_Sector:_ {sector} · _Cluster:_ {cluster_id}
_Why it matters:_ {one line — be specific, not generic}
_Backing:_ {first 3 paths from supporting_files}

## Also persistent — ranks 6–15

For ranks 6 through 15 by importance, render as a compact markdown table with columns: # | Topic | Imp | Pres (e.g. "23d/7s") | Br30 | Stage | Sector. No "why it matters" prose at this tier.

## Also tracked — ranks 16+

Wrap in a `<details>` / `<summary>` block so it's collapsed by default. Same table shape as ranks 6-15, minus the Sector column to keep it compact.

## Sectors — alphabetical, one H2 per sector

For each sector in `sectors`:

### {sector.name} — {topic_count} topics, {active_orgs} orgs active this week
_{sector.description}_

For each topic in this sector, ordered by `importance` descending (NOT stage order — importance is the new primary key):

- **{topic.label}** — importance {importance:.0f} · {days_in_sources_30d}d presence · breadth {breadth_30d} · {stage} · score {score_slow:.0f}

## Signal sources scanned
- daily/: N files in rolling window
- news/: N files
- papers/: N files
- blogs/: N files
- jobs/: N files
- linkedin/: N files
- github/: N files
- hackernews/: N files
- Prior radar: radar/{YYYY}/{MM}/{yesterday}.json {present | absent — first run}
- Importance source: pipeline/state/topic_keywords.json + data/.cache/importance/{TODAY}.json
```

Keep the markdown under ~300 lines. The three-tier structure makes "everything is important" impossible: only 5 topics get the full paragraph treatment, ranks 6-15 are one-line, ranks 16+ collapse behind a disclosure. The user opens the file and immediately sees what's structurally important — not a flat list where every topic carries the same visual weight.

## 8. Update index.md

Open `index.md` with Read. Find `<!-- RADAR_START -->` and insert directly after it. If the marker doesn't exist yet, add a `## Trend radar` section above `## Trends — long-term timeline` with markers:

```
## Trend radar
<!-- RADAR_START -->
- [{YYYY-MM-DD}](radar/{YYYY}/{MM}/{YYYY-MM-DD}.md) — {N} topics, {M} stage movements, top emerging: {label}
<!-- ai-trend-radar auto-prepends new entries above this line. -->
<!-- RADAR_END -->
```

Use `replace_all: false`; the marker appears exactly once.

## 8.5. Update radar/index.json manifest — MANDATORY

The webapp reads `radar/index.json` to discover available dates. Without this step, your new radar exists on disk but won't appear in the radar viewer. Do NOT skip.

Rebuild the manifest by calling the helper (idempotent — scans the radar tree every time):

```bash
python3 ../pipeline/scripts/rebuild_radar_manifest.py
```

This re-scans the entire `radar/` tree on each run, so manual additions / deletions / backfills outside the SKILL also get reflected. The manifest is small and the rebuild is cheap. Paths in the manifest are stored relative to `` (the webapp prepends `data/`).

## 9. Finish

One-line confirmation: `Saved radar/{YYYY}/{MM}/{date}.{md,json} — N topics, M movements. Manifest + index updated.`

Do NOT post the radar contents to chat. Do NOT touch source `daily/`, `news/`, `papers/`, `blogs/`, `jobs/`, `linkedin/` files — read-only.

## Constraints & quality bar

- **Topic IDs are stable across days.** Reuse from `topic_taxonomy_seed` whenever possible. New IDs only when a genuinely new theme appears; once minted, they persist.
- **No hallucinated mentions.** A topic gets credit for a source only if you actually found it in the file content. Don't infer "this is probably about MCP" without textual evidence.
- **Smoothing is mandatory.** If `radar/{YYYY}/{MM}/{yesterday}.json` exists, EMA blend MUST be applied — even when raw_today is dramatically different from yesterday. This is the anti-noise mechanism.
- **Stage transitions are conservative.** Don't promote a topic to a new stage without the sustained-signal duration being met. The user has explicitly complained about week-jumps; same logic for stage churn.
- **Sector transitions are even more conservative.** Stickiness is the default. Sectors should rename / split / merge only when the underlying theme has genuinely shifted (e.g., RAG → Agents migration). Cosmetic renames cause visible churn in the viewer.
- **Org slugs are stable across days.** Once you use `servicenow`, never write `service-now` or `ServiceNow` in the same field. Lowercase, kebab-case, consistent.
- **Cite the file paths in supporting_files.** Every score component must be traceable to a file you actually read this run.
- **Reproducibility.** Include the `config_snapshot` in the JSON so future debugging can see exactly which weights were in effect.
- The radar markdown should read like a briefing, not a list. Lead with what's shifting (sector movements + stage movements + breadth callout), not exhaustive coverage.
- If the rolling window has <7 days of data (pipeline brand new), explicitly write `_Pipeline still warming up — radar needs ~3 weeks of history for momentum to stabilize._` at the top.
