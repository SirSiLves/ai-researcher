# Plan — Make "breadth" measure convergence, not co-mention

**Status:** proposal for review. No pipeline behavior changes until approved.
**Author:** trend-quality assessment follow-up, 2026-05-30.
**Companion to:** `EVICTION_PLAN.md` (sprawl) — this addresses the opposite and
more urgent problem: the radar's headline metric is structurally misleading.

---

## Problem — proven from the live data

Breadth (`breadth_7d` / `breadth_30d` = "how many distinct **organizations** are
talking about this") is the radar's flagship signal. The entire "convergence =
importance" thesis rests on it, and `importance` (the primary ranking key) is
`days_in_sources × source_types × ln(breadth_30d + 2)` — so a wrong breadth
mis-ranks the whole board.

**It is currently counting co-mention, not convergence.** Hard evidence from
`radar/2026/05/2026-05-29.json`:

- `frontier-models-google` ranked **#5 of 42** (importance 785, breadth 40) on
  **one** real mention today (a single HN post, `source_type_count: 1`).
- Its `breadth_orgs_7d` list: `benzinga, bloomberg, cnn, heise, macquarie`
  (news outlets + a bank — *messengers*) and `anthropic, deepseek, meta,
  microsoft, nvidia, openai, salesforce, sap` (*competitors co-mentioned in
  the same roundup*, not doing Google AI). **Almost none are "converging on"
  the topic.** They are names that appeared in the same paragraph.

Two distinct defects produce this:

1. **Publishers counted as participants.** A Heise/Bloomberg/CNN article
   *about* a topic adds the outlet to breadth. News outlets are messengers, not
   converging organizations — yet `heise`, `handelsblatt`, `techcrunch`,
   `theverge`, `nzz` are explicitly listed as valid breadth slugs (§4 line 139).
2. **Roundup / comparison co-mention.** A "Gemini 3.5 vs Claude vs GPT-5.5"
   comparison piece, filed under one topic, tags *all* named labs as orgs for
   that topic. Competitors mentioned for contrast become false "participants."

The rule at §4 line 138 already gestures at "primary subject, not the author,"
but it does not distinguish **actor** (the org doing/shipping/affected by the
thing) from **mentioned-in-passing** (named for context/contrast/comparison),
and it does not exclude publishers. So in practice big, broadly-*reported*
stories get inflated breadth regardless of actual convergence — exactly the
coverage-volume bias the metric was meant to avoid.

## Goal

Redefine breadth so a topic's org set contains **only organizations that are
actors in the topic** — shipping it, adopting it, regulating it, hiring for it,
or directly affected by it — and **excludes publishers and contrast-only
co-mentions**. Re-rank `importance` on the corrected breadth. The number should
answer "how many organizations are *doing* this," which is what the user asked
for on 2026-05-14 ("if many companies are talking or writing about the same
topic").

## Non-goals

- No change to persistence (EMA `score_slow`) or stage logic.
- No change to the 7 collectors or what they ingest — this is purely how the
  radar *attributes* orgs to topics from already-collected mentions.
- Not the eviction gate (separate plan) — though the two compose: corrected
  breadth feeds the eviction floors, making them mean something.

---

## Design

### A. Config — extend `radar_config.breadth_config` in `sources.json`

```json
"breadth_config": {
  "window_short_days": 7,
  "window_long_days": 30,
  "max_mentions_per_org_per_day": 2,

  "_attribution_comment": "Breadth counts ACTORS, not messengers or contrast co-mentions. An org counts toward a topic only when it is the subject acting on the topic (shipping / adopting / regulating / hiring / directly affected). Publishers reporting the story and competitors named only for comparison do NOT count.",
  "publisher_slugs": [
    "heise", "handelsblatt", "techcrunch", "theverge", "venturebeat",
    "nzz", "golem", "t3n", "arstechnica", "infoq", "zdnet", "marktechpost",
    "bloomberg", "cnbc", "cnn", "axios", "benzinga", "9to5google",
    "the-information", "reuters", "ft", "wsj",
    "simonwillison", "latentspace", "stratechery", "semianalysis",
    "interconnects", "pragmaticengineer"
  ],
  "_publisher_comment": "Slugs on this list are tech-press / analyst publishers and individual commentators. They are messengers — excluded from breadth counts but STILL kept in source_mentions for transparency. A publisher slug only counts toward breadth if the publisher is itself the subject (e.g. an NZZ story ABOUT NZZ building RAG).",
  "_finance_press_note": "macquarie, bnp, goldman etc. are banks; they count ONLY when they are the actor (deploying / investing / issuing a mandate), never when quoted as analysts in a market-reaction story.",

  "thresholds": {
    "high_breadth_7d": 8,
    "very_high_breadth_7d": 12,
    "_comment": "Lowered from 15/20. Removing publishers + contrast co-mentions shrinks every topic's org set; re-tune against the new distribution after the first corrected run (see Rollout step 3)."
  }
}
```

### B. Skill — rewrite the org-attribution rule (§4, lines 132–148)

Replace the single fuzzy bullet with an explicit **actor test** and a
publisher-exclusion step. New rule text (drop-in for line 138):

> **For every mention, attribute an org only if that org is an *actor* in the
> topic** — it shipped/announced the thing, adopted/deployed it, regulates it,
> is hiring for it, or is directly and specifically affected by it (e.g. a stock
> move attributed to the topic). Use the **actor test**: "Is this org *doing
> something* with the topic, or merely *named* in the coverage of it?"
>
> - **Counts (actor):** OpenAI blog post shipping a feature → `openai`.
>   ServiceNow GA of an agent platform → `servicenow`. UBS jobs.ch posting for
>   an AI engineer → `ubs`. SAP making Claude its default reasoning engine →
>   `sap` *and* `anthropic` (both are actors in that deal).
> - **Does NOT count (messenger):** A Heise/Bloomberg/CNN article reporting the
>   story → the publisher is excluded (it's on `publisher_slugs`).
> - **Does NOT count (contrast co-mention):** A "Gemini 3.5 vs Claude vs GPT-5.5"
>   benchmark roundup filed under `frontier-models-google` → only `google` (the
>   subject of *this* topic) counts; `anthropic`/`openai` are named for contrast,
>   not converging on Google's models, so they are NOT added to *this* topic's
>   breadth. (They get their own breadth on *their own* topics from *their own*
>   actor-mentions.)
>
> When you cannot tell whether an org is an actor or just mentioned, **exclude
> it** — breadth should under-count rather than inflate. This is the opposite of
> the prior "when ambiguous, pick the primary subject" guidance, which biased
> toward inclusion.

Then add the deterministic filter step before the breadth count:

> After assembling each topic's raw org set, drop any slug in
> `radar_config.breadth_config.publisher_slugs` **unless that publisher is
> itself the topic's subject**. Keep all mentions (including publisher ones) in
> `source_mentions` for transparency — only the breadth *count* changes.

Breadth formulas (§4 lines 144–145) are unchanged in shape; they now operate on
the actor-filtered org set.

### C. Skill — add a self-audit line the run must emit (§4)

To make the correction observable and catch regression, the radar emits a new
top-level JSON field:

```json
"breadth_audit": {
  "publishers_excluded": 14,        // total publisher-slug attributions dropped this run
  "contrast_comentions_excluded": "agent estimate or n/a",
  "median_breadth_30d": 9,          // the new distribution — drives threshold re-tune
  "max_breadth_30d_topic": "ai-coding-agents"
}
```

`publishers_excluded` is exact (deterministic set-difference). The contrast count
is best-effort. `median_breadth_30d` is what step 3 of rollout uses to re-tune
`high_breadth_7d`.

### D. No change needed to `compute_topic_importance.py`

Importance is computed in the skill (§4.8) as
`days_in_sources × source_types × ln(breadth_30d + 2)`, reading `breadth_30d`
from the radar's own pass. Once breadth is corrected, importance re-ranks
automatically. **Verify** the script doesn't independently recompute breadth —
it doesn't (it only counts keyword presence for `days_in_sources` /
`source_types`); confirmed against §4.8. No code change.

### E. Markdown output (§7) — annotate the breadth line

The per-topic line `breadth_30d {N} orgs` stays, but the "Orgs talking this
week" list (§7 line 473) is now an *actors* list. Change the label to
`_Orgs acting on this:_` and **sort by mention-count, not alphabetically** (the
current alphabetical truncation to 20 was itself a bias — every list started
with a/b/c orgs and dropped the z's). Show top 10 by actor-mention frequency.

---

## Where it hooks in (file-by-file)

| File | Change | Size |
|---|---|---|
| `pipeline/state/sources.json` | Add `publisher_slugs` + attribution comments to `breadth_config`; lower thresholds | data-only |
| `pipeline/skills/ai-trend-radar/SKILL.md` §4 (lines 132–148) | Rewrite org-attribution rule (actor test + publisher exclusion); add audit emit | ~1 section |
| `pipeline/skills/ai-trend-radar/SKILL.md` §6 (JSON schema) | Document `breadth_audit` block | few lines |
| `pipeline/skills/ai-trend-radar/SKILL.md` §7 (markdown) | Relabel "Orgs talking" → "Orgs acting on this"; sort by frequency not alpha | few lines |
| `pipeline/scripts/compute_topic_importance.py` | **Verify only** — confirm it reads breadth, doesn't recompute it | 0 (read) |
| app `data.service.ts` / `map.ts` | Optional: surface `breadth_audit` + the high_breadth flag re-tune | defer |

**No orchestrator change** — breadth lives entirely inside the radar pass.

---

## Migration / backfill

- The fix is **forward-only**: tomorrow's radar computes corrected breadth.
  Historical radar JSONs keep their inflated numbers (they're snapshots; the
  EMA reads `score_slow`, not breadth, so prior-day breadth doesn't poison the
  smoothing).
- **One-time validation** before trusting it: run the radar once with the new
  rule, diff the new `breadth_orgs_7d` lists against 2026-05-29's, and confirm
  publishers/contrast-orgs dropped out. The `frontier-models-google` topic is
  the canonical test — it should fall sharply (from breadth 40 on 1 real
  mention to a small actor count), which will drop it out of the top 5. That
  drop is the *correct* behaviour, not a regression.

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Over-exclusion: a real actor on the publisher list (e.g. NZZ builds its own RAG) gets dropped | "unless the publisher is itself the subject" carve-out; publisher_slugs is editable |
| LLM still can't reliably judge actor-vs-mention | The deterministic publisher filter catches the biggest source (outlets) regardless of LLM judgment; the contrast-co-mention rule is guidance but the publisher exclusion alone fixes most of the demonstrated inflation |
| Thresholds now wrong (set for inflated distribution) | `breadth_audit.median_breadth_30d` drives a one-shot re-tune (rollout step 3) |
| Ranking churns hard on first run | Expected and correct — document the re-rank in "What moved today" so it reads as a methodology fix, not noise |

## Rollout

1. Land config + skill edits.
2. Run radar once; inspect `breadth_audit` + diff `breadth_orgs_7d` vs prior day.
   Confirm `frontier-models-google`-type co-mention inflation collapsed.
3. Read `breadth_audit.median_breadth_30d`; set `high_breadth_7d` ≈ top-third of
   the *new* distribution, `very_high_breadth_7d` ≈ top-quartile.
4. Watch one week. The top-5-by-importance should now track real convergence
   (multi-actor deals, broad adoption) rather than broadly-reported single
   events.

## Acceptance criteria

- A topic with one real mention + many co-mentioned competitors (the
  `frontier-models-google` case) no longer ranks top-5.
- `breadth_orgs_7d` lists contain actors, not news outlets — spot-check: no
  `bloomberg`/`cnn`/`heise` in any topic's breadth unless that outlet is the
  subject.
- `importance` re-ranking is explainable: high-importance topics have multiple
  distinct *actor* orgs, not high press volume.
- All attribution rules + the publisher list live in `sources.json`; the skill
  references them, hardcodes nothing.

---

## Why this is higher-leverage than the other open plans

`EVICTION_PLAN.md` keeps the board from sprawling; the index-slim + dead-code
cleanup are hygiene. **This one fixes whether the radar is *telling the truth*.**
The radar looks authoritative — clean scores, 40-org breadth counts — but a
top-5 "trend" can currently be one HN post plus 39 co-mentions. Closing the gap
between how trustworthy it *looks* and how trustworthy it *is* is the single
change that most improves the product's actual job: being a step ahead on
*real* convergence.
