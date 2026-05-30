# Plan — Topic-eviction gate with revivable dormant pool

**Status:** proposal for review. No pipeline behavior changes until approved.
**Author:** assessment follow-up, 2026-05-30.
**Decision recorded:** eviction policy = **dormant pool (revivable)**, nothing lost.

---

## Problem (from the scaling assessment)

The radar's active-topic set grows monotonically with no real eviction:

```
2026-03-15:  3 topics   2026-04-01: 20   2026-05-04: 33   2026-05-29: 42
```

~5 new topics/week, ~linear, no governor → **80–100+ active topics within 12 months.**
The promotion path is well-gated (`§3` create-new-ID rule + the keyword-sweep
`≥6 mentions / ≥3 source types / ≥4 days / 2 consecutive` gate). The retirement
path is essentially absent:

- Stage rule 5 (`Background`) *omits* a topic from output but **does not evict it**,
  does not bound the active set, and leaves it to be silently re-extracted next run.
- `fading` (rule 1) is a *label*, not a lifecycle terminal — a faded topic stays in
  the working set forever.
- `topic_keywords.json` (42 topics, 1:1 with the radar) only grows.

A radar that only adds eventually shows everything, which defeats its signal premise.

## Goal

Cap the **active** topic set (~40–50) by moving sustained-cold topics to a
**revivable dormant pool**, while preserving their full history and EMA so a
returning signal restores them cleanly. Symmetric to the promotion gate:
promotion has a multi-day, multi-source confirmation gate → retirement gets the
same shape in reverse.

## Non-goals (explicitly out of scope for this change)

- Org canonicalization / `orgs/index.json` split (Walls 2 & 3 — separate plans).
- Topic *merging* into parents (the "merge" eviction option was not chosen).
- Any change to promotion thresholds or the keyword sweep.

---

## Design

### New state file: `pipeline/state/dormant_topics.json`

Single source of truth for retired topics. Schema:

```json
{
  "_comment": "Topics evicted from the active radar by the eviction gate. Revivable.",
  "dormant": {
    "prompt-engineer-decline": {
      "label": "Prompt-engineer role decline",
      "retired_on": "2026-06-14",
      "reason": "fading 12d, importance 31 < floor 40, breadth_30d 4 < floor 6",
      "last_score_slow": 14.2,
      "last_importance": 31,
      "last_sector": "Methods & research",
      "first_seen": "2026-03-29",
      "keywords": ["prompt engineer", "prompt engineering role", "..."],
      "revivals": 0
    }
  }
}
```

`keywords` is copied from `topic_keywords.json` at eviction so revival is lossless.
`last_score_slow` seeds the EMA on revival (no cold restart).

### Config: extend `radar_config.stages` in `sources.json`

Add a sibling block to `stages` — `eviction` — so thresholds are data, not code
(consistent with the existing "do NOT hardcode" rule in the skill §1):

```json
"eviction": {
  "_comment": "Symmetric retirement gate. A topic is evicted to the dormant pool only when it stays cold across BOTH dimensions for consecutive_cold_days. Mirrors the keyword-sweep promotion gate in reverse.",
  "active_topic_soft_cap": 50,
  "importance_floor": 40,
  "breadth_30d_floor": 6,
  "score_slow_floor": 12,
  "consecutive_cold_days_required": 10,
  "protected_stages": ["mainstream"],
  "max_evictions_per_run": 3
},
"revival": {
  "_comment": "A dormant topic returns to active when current-run signal clears the emerging bar again.",
  "min_source_types": 2,
  "min_mentions_7d": 3,
  "restore_score_slow_from_dormant": true
}
```

- **`consecutive_cold_days_required: 10`** — a topic must be cold (below all three
  floors) on 10 consecutive runs before eviction. Prevents a quiet fortnight from
  evicting a structurally-important topic. (Promotion uses 4 distinct days + 2
  consecutive; retirement is deliberately *slower* than promotion — bias toward
  keeping.)
- **`protected_stages: ["mainstream"]`** — mainstream topics never auto-evict.
- **`max_evictions_per_run: 3`** — rate-limit so a data gap (e.g. the 2026-05-07
  6-topic anomaly) can't mass-evict the board in one bad run.
- **`active_topic_soft_cap: 50`** — when active count > cap, eviction is *eligible*;
  below the cap, the gate still runs but is the only pressure. The cap turns the
  gate from "nice to have" into "enforced" exactly when sprawl is happening.

### A new persistent counter on each topic in radar JSON

Add `consecutive_cold_days` (int) to each topic object in `radar/.../{date}.json`.
Carried forward like `score_slow` and `consecutive_low_days` (the sector dissolve
counter already does exactly this — §4.5 step, "carried in the JSON"). Reset to 0
on any run where the topic clears any floor.

---

## Where it hooks in (file-by-file)

### 1. `pipeline/state/sources.json`
Add the `eviction` + `revival` blocks under `radar_config` (above). Data-only.

### 2. `pipeline/skills/ai-trend-radar/SKILL.md`
Two edits, both small:

**(a) §3 "Extract topics" — add a revival check at the top.**
Before extracting from the seed list, read `../pipeline/state/dormant_topics.json`.
For each dormant topic, if this run's mentions clear `revival` thresholds
(`min_source_types`, `min_mentions_7d`), pull it back into the active set, seed its
`score_slow` from `last_score_slow`, increment `revivals`, and remove it from the
dormant file. Record in a new `revivals` array for the JSON output + a
"What moved today" line.

**(b) New §5.5 "Evict cold topics → dormant pool"** (right after stage assignment,
before clustering re-reads the active set so a just-evicted topic doesn't get a
sector). Pseudization:

```
for each active topic NOT in eviction.protected_stages:
    cold = importance < importance_floor
       AND breadth_30d < breadth_30d_floor
       AND score_slow  < score_slow_floor
    topic.consecutive_cold_days = cold ? prior+1 : 0

eligible = topics with consecutive_cold_days >= consecutive_cold_days_required
# enforce cap + rate limit: only when over soft cap OR always, capped at max_evictions_per_run
to_evict = sort(eligible, by ascending importance)[:max_evictions_per_run]

for t in to_evict:
    append t to dormant_topics.json (with keywords copied from topic_keywords.json)
    remove t from active topic set, topic_keywords.json
    record in stage_movements as {topic, from, to: "dormant", reason}
```

Update §5 rule 5 (`Background`) to note it now feeds the eviction counter rather
than being a silent omit.

### 3. `pipeline/skills/ai-trend-radar/SKILL.md` §6 (JSON schema) + §7 (markdown)
- JSON: document `consecutive_cold_days` per topic; add top-level `evictions` and
  `revivals` arrays alongside the existing `stage_movements` / `sector_movements`.
- Markdown "What moved today": add **Evicted to dormant** and **Revived** bullet
  groups so the human sees lifecycle terminals, not just stage hops.

### 4. `pipeline/CRON_PROMPT.md`
§6.5 already spawns the radar and notes its merge rules. Add one sentence: the
radar now also reads/writes `../pipeline/state/dormant_topics.json` (mention it in
the state-file list in the footer §2 alongside `discovered_keywords.json` etc.).
**No new orchestration step** — eviction lives inside the radar pass.

### 5. `pipeline/scripts/build_gap_keywords.py` (verify, likely 1-line)
Gap-keywords filters out "topic-covered terms" using `topic_keywords.json`. After
eviction removes a topic's keywords, those terms should re-surface as gap signals
(good — that's the early-warning loop). Confirm it reads the *current*
`topic_keywords.json` and not a cached copy. Likely no change; flagged for a read.

### 6. New: `pipeline/scripts/build_dormant_view.py` (optional, small)
Surfaces the dormant pool to the SPA (a "Dormant / revivable" panel on `/map`),
mirroring `build_gap_keywords.py`. Defer until the gate is proven; listed for
completeness. **Not in the first cut.**

---

## Backfill / migration

- One-time: seed `consecutive_cold_days = 0` on all current topics (absent field
  defaults to 0 — no migration script strictly needed; the first run sets it).
- `dormant_topics.json` starts as `{"_comment": "...", "dormant": {}}`.
- First eligible eviction won't fire until `consecutive_cold_days_required` (10)
  runs after deploy — so there is a **built-in 10-day observation window** before
  any topic actually leaves. This is intentional: watch the counter populate, tune
  the floors against real data, *then* let it bite.

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Over-eviction in a data-gap run (cf. 2026-05-07) | `max_evictions_per_run: 3` + cold counter resets on any non-cold run |
| Evicting a slow-burn structural topic | 10-consecutive-day gate (slower than promotion); `mainstream` protected; floors tuned on real counter data during the 10-day window |
| Revival thrash (evict↔revive flicker) | revival bar = emerging bar (higher than the cold floors) → hysteresis band between exit and re-entry |
| Lost history | dormant pool keeps label, EMA, keywords, sector, first_seen, revival count |

## Rollout

1. Land config + state file + skill edits (this plan).
2. Run radar normally for ~10 days; inspect `consecutive_cold_days` accumulation
   in the JSON — **no evictions possible yet** by construction.
3. Tune `importance_floor` / `breadth_30d_floor` against observed cold-topic data.
4. Let the gate bite. Watch `evictions`/`revivals` in "What moved today."

## Acceptance criteria

- Active topic count stops growing unbounded; trends toward the soft cap.
- No topic is ever lost — every eviction has a matching `dormant_topics.json` entry.
- A topic whose signal returns is revived with its prior EMA, not cold-started.
- All thresholds live in `sources.json`; nothing hardcoded in the skill.
