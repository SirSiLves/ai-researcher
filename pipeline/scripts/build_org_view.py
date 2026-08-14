#!/usr/bin/env python3
"""
build_org_view.py — consolidates discovered_orgs.json + all radar JSONs +
source files into a per-org dataset that drives the firm view.

Outputs:
  orgs/index.json        — sorted org list + velocity_history per entry. One
                           file powers the entire /firms list view, including
                           the row sparkline. App fetches this once instead of
                           one HTTP request per firm.
  orgs/{slug}.json       — detail-only fields (mentions_by_date, radar_appearances,
                           hot_events, classification_history, context_samples,
                           topic_mix, aliases, source-type breakdown). Loaded
                           lazily when a firm's drawer or detail page opens.
                           Does NOT carry velocity_history (lives in index.json).

What it adds beyond discovered_orgs.json:
  1. Priority vendors (OpenAI, Anthropic, Google DeepMind, Meta, Mistral, DeepSeek)
     — the sweep skips these because they're "already covered," but they're the
     most important companies for the firm view. We scan source files for them
     here and produce the same data shape as discovered orgs.
  2. Velocity history — computed from mentions_by_date (the sweep persists this
     going forward, but the bootstrap version of discovered_orgs.json doesn't
     have it yet, so we recompute every run).
  3. Topic mix — for each org, scan the source files it was mentioned in, look
     for topic_taxonomy_seed strings, count co-occurrences. This is the third
     axis of the firm view. Will be replaced by radar's `breadth_orgs_7d` once
     the radar starts populating that field on real runs.

Idempotent — re-running rebuilds the orgs/ tree from scratch, but per-firm
files are only re-written when their content actually changed. A second
same-day run touches zero per-firm files. Daily run touches only the orgs
whose mention/topic/radar state moved.

Hooked into ai-replay's §6.7 step (added in this commit), so it runs daily
alongside the radar and vendor sweep.
"""
import json
import os
import re
import sys
from collections import defaultdict
from datetime import date, timedelta
from pathlib import Path

from _lib import iter_source_files, whole_word_pattern, REPO_ROOT, STATE_DIR, DATA_ROOT, RADAR_DIR, ORGS_DIR

ROOT = REPO_ROOT  # back-compat alias for downstream `path.relative_to(ROOT)` calls
# Prefer TODAY from the env (set by `eval "$(scripts/now.sh)"` in the
# orchestrator); fall back to wall-clock date for standalone runs.
TODAY = os.environ.get("TODAY") or date.today().isoformat()

# Priority vendors — not in discovered_orgs.json but mandatory for the firm view.
# Aliases match case-insensitive whole-word substring (same logic as the sweep).
PRIORITY_VENDORS = {
    "openai": {
        "display_name": "OpenAI",
        "aliases": ["OpenAI", "GPT-4", "GPT-5", "ChatGPT", "Sora", "DALL-E"],
        "tier_hint": "frontier-lab",
        "region": "us",
        "blog_url_hint": "https://openai.com/blog",
        "coverage": "priority",
    },
    "anthropic": {
        "display_name": "Anthropic",
        "aliases": ["Anthropic", "Claude", "Claude Opus", "Claude Sonnet", "Claude Haiku"],
        "tier_hint": "frontier-lab",
        "region": "us",
        "blog_url_hint": "https://www.anthropic.com/news",
        "coverage": "priority",
    },
    "google-deepmind": {
        "display_name": "Google DeepMind",
        "aliases": ["Google DeepMind", "DeepMind", "Gemini", "AlphaFold", "AlphaEvolve", "AlphaProof"],
        "tier_hint": "frontier-lab",
        "region": "us",
        "blog_url_hint": "https://deepmind.google/blog/",
        "coverage": "priority",
    },
    "meta": {
        "display_name": "Meta",
        "aliases": ["Meta AI", "Llama", "LLaMA", "FAIR Labs", "Meta FAIR"],
        "tier_hint": "frontier-lab",
        "region": "us",
        "blog_url_hint": "https://ai.meta.com/blog/",
        "coverage": "priority",
    },
    "mistral": {
        "display_name": "Mistral",
        "aliases": ["Mistral", "Mistral AI", "Mixtral", "Codestral"],
        "tier_hint": "frontier-lab",
        "region": "fr",
        "blog_url_hint": "https://mistral.ai/news",
        "coverage": "priority",
    },
    "deepseek": {
        "display_name": "DeepSeek",
        "aliases": ["DeepSeek", "DeepSeek-V", "DeepSeek-R"],
        "tier_hint": "frontier-lab",
        "region": "cn",
        "blog_url_hint": "https://api-docs.deepseek.com/news",
        "coverage": "priority",
    },
}


def derive_display_name(slug: str, entry: dict) -> str:
    """Pick a human-readable name for a firm.

    Priority order:
      1. entry["display_name"] if set (priority vendors hardcode this).
      2. Most-hit alias that has at least one uppercase letter — typically the
         best brand form (e.g. "Anthropic" over "anthropic", "Hugging Face"
         over "hugging face"). Ties broken by the alias seen most often.
      3. The longest alias as a fallback.
      4. Title-cased slug for orgs we know nothing about beyond their key.

    Avoids returning an all-lowercase form when a mixed-case alias is available,
    which is what made firm headers read "anthropic" instead of "Anthropic"
    before this fix.
    """
    name = entry.get("display_name")
    if name:
        return name
    alias_hits = entry.get("alias_hits") or {}
    aliases = list(alias_hits.keys()) or entry.get("aliases") or []
    if not aliases:
        # Fallback: title-case the slug, replacing hyphens with spaces.
        return slug.replace("-", " ").title()
    mixed_case = [a for a in aliases if any(c.isupper() for c in a)]
    if mixed_case:
        # Among mixed-case aliases, prefer the one with the most hits.
        mixed_case.sort(key=lambda a: (-alias_hits.get(a, 0), -len(a)))
        return mixed_case[0]
    # No mixed-case alias — fall back to the longest one.
    return max(aliases, key=len)

# Brand / product slugs that the vendor sweep agent has registered as their own
# "orgs" but actually belong to a priority vendor. Their mentions are *already*
# counted under the parent via PRIORITY_VENDORS' alias scan, so leaving them as
# separate orgs double-counts on the leaderboard ("claude" showed up 4th with
# velocity_7d=378 — same physical mentions Anthropic was already crediting via
# its "Claude" alias).
#
# Also covers a pair of true duplicates: amazon-aws → aws (the sweep agent
# created both for the same firm).
#
# Maintenance: when adding a new priority vendor to PRIORITY_VENDORS above,
# add any of its brand slugs here too so the next build folds them in.
BRAND_TO_PARENT = {
    # Anthropic family
    "claude":          "anthropic",
    "claude-code":     "anthropic",
    "mythos":          "anthropic",  # Anthropic's leaked-then-acknowledged model
    "stainless":       "anthropic",  # acquired May 2026, hosted product wound down
    # OpenAI family
    "gpt-5":           "openai",
    "codex":           "openai",
    # Google-DeepMind family
    "gemini":          "google-deepmind",
    "deepmind":        "google-deepmind",
    # Meta family
    "llama":           "meta",
    # Alibaba family — note seed_orgs.json has slug "alibaba-qwen"; not currently
    # in PRIORITY_VENDORS but discovered_orgs has both "alibaba" and "qwen", so
    # fold qwen into alibaba (the firm) here. If the sweep ever promotes the
    # alibaba-qwen seed slug it'll need adjustment.
    "qwen":            "alibaba",
    "tongyi":          "alibaba",
    # Moonshot
    "kimi":            "moonshot",
    # Microsoft family — Bedrock is AWS, Azure is Microsoft, github-copilot is
    # Microsoft (via GitHub). Be careful: "azure" alone can name many things,
    # but in this corpus it's overwhelmingly Azure OpenAI/AI services.
    "azure":           "microsoft",
    "github-copilot":  "microsoft",
    # AWS family
    "amazon-aws":      "aws",
    "bedrock":         "aws",
    # Salesforce family
    "agentforce":      "salesforce",
    # IBM family
    "watsonx":         "ibm",
    # Snowflake family
    "cortex":          "snowflake",
    # Protocol slug — not a firm at all. Drop entirely (parent=None means
    # delete without merging into anyone).
    "mcp":             None,
}


def fold_brand_slugs(orgs: dict) -> tuple[dict, list[str]]:
    """Absorb known brand/product slugs into their canonical parent.

    For each (brand, parent) in BRAND_TO_PARENT:
      - parent is None → drop the brand slug entirely (e.g. `mcp` is a protocol).
      - parent in orgs → merge brand's mentions_by_date, mentions_by_source_type,
        alias_hits, radar_appearances, context_samples, hot_events into parent;
        recompute first_seen/last_seen/total_mentions/distinct_days/
        distinct_source_types; drop the brand from `orgs`.
      - parent not in orgs → leave brand alone (the parent isn't tracked, so
        folding would lose data). Logged to stderr.

    Returns (filtered_orgs, dropped_files) — `dropped_files` is the list of
    `data/orgs/<slug>.json` paths to delete from disk after the rebuild.
    """
    dropped_files = []
    for brand, parent in BRAND_TO_PARENT.items():
        if brand not in orgs:
            continue
        brand_entry = orgs[brand]
        if parent is None:
            # Pure drop — not a firm at all.
            del orgs[brand]
            dropped_files.append(brand)
            continue
        if parent not in orgs:
            print(f"[build_org_view] brand {brand!r} → parent {parent!r} not tracked yet, leaving brand alone",
                  file=sys.stderr)
            continue
        # Merge into parent. The parent is the priority entry (which has the
        # higher-quality scan), so we ADD brand counts on top.
        parent_entry = orgs[parent]
        # mentions_by_date — sum per date
        pmbd = parent_entry.setdefault("mentions_by_date", {})
        for d, n in (brand_entry.get("mentions_by_date") or {}).items():
            pmbd[d] = pmbd.get(d, 0) + n
        # mentions_by_source_type — sum per type
        pmbst = parent_entry.setdefault("mentions_by_source_type", {})
        for t, n in (brand_entry.get("mentions_by_source_type") or {}).items():
            pmbst[t] = pmbst.get(t, 0) + n
        # alias_hits — sum
        pah = parent_entry.setdefault("alias_hits", {})
        for a, n in (brand_entry.get("alias_hits") or {}).items():
            pah[a] = pah.get(a, 0) + n
        # radar_appearances — concatenate, dedupe by (date, topic_id)
        pra = parent_entry.setdefault("radar_appearances", [])
        seen = {(r.get("date"), tuple(t.get("topic_id") for t in r.get("topics", [])))
                for r in pra}
        for r in (brand_entry.get("radar_appearances") or []):
            key = (r.get("date"), tuple(t.get("topic_id") for t in r.get("topics", [])))
            if key not in seen:
                pra.append(r)
                seen.add(key)
        # hot_events — concatenate
        parent_entry.setdefault("hot_events", []).extend(brand_entry.get("hot_events") or [])
        # context_samples — keep parent's, top up from brand if room
        ctx = parent_entry.setdefault("context_samples", [])
        for s in (brand_entry.get("context_samples") or []):
            if len(ctx) >= 12:
                break
            if s not in ctx:
                ctx.append(s)
        # Recompute summaries
        parent_entry["total_mentions"] = sum(pmbd.values())
        parent_entry["distinct_days"] = len(pmbd)
        parent_entry["distinct_source_types"] = sorted(pmbst.keys())
        # first_seen / last_seen — span of either entry
        for k in ("first_seen", "last_seen"):
            pv = parent_entry.get(k)
            bv = brand_entry.get(k)
            if bv and (not pv or (k == "first_seen" and bv < pv) or (k == "last_seen" and bv > pv)):
                parent_entry[k] = bv
        # Done — drop the brand from the map and queue its file for deletion.
        del orgs[brand]
        dropped_files.append(brand)
    return orgs, dropped_files


def load_sources_json():
    with open(STATE_DIR / "sources.json") as f:
        return json.load(f)


def load_discovered():
    with open(STATE_DIR / "discovered_orgs.json") as f:
        return json.load(f)


def scan_priority_vendors(file_index):
    """Build a priority-vendor tally with the same shape as discovered_orgs.orgs."""
    patterns = {
        slug: [whole_word_pattern(a) for a in info["aliases"]]
        for slug, info in PRIORITY_VENDORS.items()
    }
    tally = {
        slug: {
            **PRIORITY_VENDORS[slug],
            "first_seen": None,
            "last_seen": None,
            "total_mentions": 0,
            "distinct_days": 0,
            "distinct_source_types": [],
            "mentions_by_source_type": defaultdict(int),
            "mentions_by_date": defaultdict(int),
            "alias_hits": defaultdict(int),
            "first_seen_in_file": None,
            "context_samples": [],
        }
        for slug in PRIORITY_VENDORS
    }
    for path, src_type, file_date in file_index:
        try:
            text = path.read_text(errors="ignore")
        except Exception:
            continue
        for slug, regexes in patterns.items():
            entry = tally[slug]
            hit_in_file = False
            for regex in regexes:
                hits = regex.findall(text)
                if not hits:
                    continue
                hit_in_file = True
                alias = regexes[0].pattern  # imperfect but informational
                entry["alias_hits"][hits[0]] += len(hits)
                entry["total_mentions"] += len(hits)
            if hit_in_file:
                entry["mentions_by_source_type"][src_type] += 1
                entry["mentions_by_date"][file_date] += 1
                if entry["first_seen"] is None or file_date < entry["first_seen"]:
                    entry["first_seen"] = file_date
                    entry["first_seen_in_file"] = str(path.relative_to(ROOT))
                if entry["last_seen"] is None or file_date > entry["last_seen"]:
                    entry["last_seen"] = file_date
                # Keep up to 6 context samples
                if len(entry["context_samples"]) < 6:
                    # Find first match position for any alias
                    for regex in regexes:
                        m = regex.search(text)
                        if m:
                            lo = max(0, m.start() - 60)
                            hi = min(len(text), m.end() + 60)
                            snippet = text[lo:hi].replace("\n", " ").strip()
                            entry["context_samples"].append(
                                f"…{snippet}…  ({path.relative_to(ROOT)})"
                            )
                            break
    # Finalize: compute distinct_days and distinct_source_types, drop empty orgs
    out = {}
    for slug, entry in tally.items():
        if entry["total_mentions"] == 0:
            continue
        entry["distinct_days"] = len(entry["mentions_by_date"])
        entry["distinct_source_types"] = sorted(entry["mentions_by_source_type"].keys())
        entry["mentions_by_source_type"] = dict(entry["mentions_by_source_type"])
        entry["mentions_by_date"] = dict(sorted(entry["mentions_by_date"].items()))
        entry["alias_hits"] = dict(entry["alias_hits"])
        out[slug] = entry
    return out


def _status_from(last_7: int, ratio: float) -> str:
    """Classify velocity_status from absolute 7d count + ratio-vs-baseline.

    Ratio alone is misleading because the baseline floor (= 1.0) lets any org
    with low 28d activity hit ratio == 4.0 from a single new mention. So we
    require **both** a meaningful absolute spike and a high rate-of-change.

    - surging:      ratio >= 3.5 AND velocity_7d >= 50   (real, large spike)
    - accelerating: ratio >= 2.0 AND velocity_7d >= 10   (real growth above noise floor)
    - cooling:      ratio <= 0.4 AND velocity_7d <= 5    (was active, has cooled)
    - steady:       everything else

    Calibrated against the observed distribution (May 2026): historically
    surging==0 under the old 5.0 / accelerating==3.0 rules because the ratio
    was capped at 4.0 by the floor. New thresholds give ~10-20 surging and a
    real accelerating tier of ~50-150 firms instead of all 271.

    NOTE: `_vendor_sweep_run.py` still uses the old 5.0 / 3.0 thresholds for
    sweep-side hot-event detection (line 421+ there). That is intentional —
    those thresholds gate side-effects on `sources.json` (promotions, hot
    events, demotions) and changing them would cascade unpredictable state
    mutations. The app's velocity_status is for *display ranking*; the sweep's
    is for *operational gating*. Keep them separate until we deliberately
    unify the two with sweep-side regression tests in place.
    """
    if ratio >= 3.5 and last_7 >= 50:
        return "surging"
    if ratio >= 2.0 and last_7 >= 10:
        return "accelerating"
    if ratio <= 0.4 and last_7 <= 5:
        return "cooling"
    return "steady"


def compute_velocity(mentions_by_date, today_iso):
    """7-day vs 28-day baseline velocity (matches vendor-sweep math)."""
    today = date.fromisoformat(today_iso)
    last_7 = sum(
        v for d, v in mentions_by_date.items()
        if (today - date.fromisoformat(d)).days < 7 and (today - date.fromisoformat(d)).days >= 0
    )
    last_28 = sum(
        v for d, v in mentions_by_date.items()
        if (today - date.fromisoformat(d)).days < 28 and (today - date.fromisoformat(d)).days >= 0
    )
    avg_weekly_baseline = last_28 / 4.0
    ratio = last_7 / max(avg_weekly_baseline, 1.0)
    status = _status_from(last_7, ratio)
    return {
        "velocity_7d": last_7,
        "velocity_28d_avg": round(avg_weekly_baseline, 2),
        "velocity_ratio": round(ratio, 2),
        "velocity_status": status,
    }


def compute_velocity_history(mentions_by_date, today_iso, window_days=30):
    """Per-day velocity for the last N days (for the chart)."""
    today = date.fromisoformat(today_iso)
    history = []
    for offset in range(window_days, -1, -1):
        d = today - timedelta(days=offset)
        d_iso = d.isoformat()
        last_7 = sum(
            v for dd, v in mentions_by_date.items()
            if 0 <= (d - date.fromisoformat(dd)).days < 7
        )
        last_28 = sum(
            v for dd, v in mentions_by_date.items()
            if 0 <= (d - date.fromisoformat(dd)).days < 28
        )
        avg_w = last_28 / 4.0
        ratio = last_7 / max(avg_w, 1.0)
        history.append({
            "date": d_iso,
            "velocity_7d": last_7,
            "velocity_ratio": round(ratio, 2),
        })
    return history


_ALNUM_RUN_RE = re.compile(r"[A-Za-z0-9]+")
_ASCII_ALNUM = frozenset("abcdefghijklmnopqrstuvwxyz0123456789")


def _build_literal_index(entries):
    """Build a first-word index for fast literal scanning.

    `entries` is an iterable of `(literal_lowercase, org_slugs, topic_ids)`.
    Returns `{first_alnum_word: [(literal, offset_of_first_word, length,
    org_slugs, topic_ids), ...]}` with each bucket sorted longest-literal-first.

    Why this exists: the previous implementation built one giant alternation
    regex over every org alias (~1,300 of them) and one regex per topic, then
    ran ~53 IGNORECASE scans over ~15 MB of source text. Python's `re` degrades
    badly on huge alternations — that took 13+ minutes and blew every sandbox
    timeout, so §6.7 of the nightly pipeline never completed and orgs/index.json
    went stale (the standing cause of a YELLOW health beacon). Indexing on each
    literal's first alphanumeric word turns the scan into one pass of cheap dict
    lookups. Match semantics are unchanged: case-insensitive literal match with
    non-alphanumeric boundaries on both sides, non-overlapping, longest-first.
    """
    index = defaultdict(list)
    for literal, org_slugs, topic_ids in entries:
        m = _ALNUM_RUN_RE.search(literal)
        if not m:
            continue  # no alphanumeric content — unmatchable under the old regex too
        index[m.group(0)].append((literal, m.start(), len(literal), org_slugs, topic_ids))
    for bucket in index.values():
        bucket.sort(key=lambda t: -t[2])
    return dict(index)


def _scan_indexed_literals(text, index):
    """Scan `text` once, returning (org_slugs_present, {topic_id: count}).

    Equivalent to running `(?<![A-Za-z0-9])(literal)(?![A-Za-z0-9])` with
    re.IGNORECASE for the org alternation and one such regex per topic, but in
    a single pass. Overlap is resolved independently per namespace — orgs keep
    their own cursor and each topic keeps its own — so a long topic keyword can
    never swallow a shorter one belonging to a different topic, which is what
    the separate-regex version guaranteed.
    """
    low = text.lower()
    n = len(low)
    slugs_present = set()
    topic_counts = defaultdict(int)
    org_cursor = 0
    topic_cursor = {}

    for wm in _ALNUM_RUN_RE.finditer(low):
        bucket = index.get(wm.group(0))
        if not bucket:
            continue
        ws = wm.start()
        org_done = False
        topics_done = set()
        for literal, offset, length, org_slugs, topic_ids in bucket:
            start = ws - offset
            if start < 0:
                continue
            end = start + length
            if end > n or low[start:end] != literal:
                continue
            if start > 0 and low[start - 1] in _ASCII_ALNUM:
                continue
            if end < n and low[end] in _ASCII_ALNUM:
                continue
            if org_slugs and not org_done and start >= org_cursor:
                slugs_present.update(org_slugs)
                org_cursor = end
                org_done = True
            for topic_id in topic_ids:
                if topic_id in topics_done or start < topic_cursor.get(topic_id, 0):
                    continue
                topic_counts[topic_id] += 1
                topic_cursor[topic_id] = end
                topics_done.add(topic_id)
    return slugs_present, topic_counts


def precompute_topic_mix(all_orgs, topic_keywords, file_index):
    """One-pass topic-mix builder, keyed on TODAY's radar topic IDs.

    `topic_keywords` is `pipeline/state/topic_keywords.json` — the radar
    pipeline's canonical per-topic keyword set, kept current as topics are
    born/retired. Previously we keyed topic_mix on the static
    `sources.json.radar_config.topic_taxonomy_seed` strings; that worked at
    first but the seed list rotted (30 of 51 entries no longer match any
    current topic), so firm pages showed stale labels like "DeepSeek V4" and
    "pentagon-anthropic" as a firm's top topics. Using topic_keywords keeps
    topic_mix slug-stable and label-fresh — radar churn is the source of
    truth.

    The old per-org `build_topic_mix` re-read every source file from disk
    once per org × per topic, costing ~60ms × 1104 orgs ≈ 65s on cron. That
    timed out on the Cowork bash sandbox (~30s limit), leaving orgs/index.json
    stale until the next manual rebuild.

    This version inverts the loop:
      1. Compile every org-alias pattern; compile one regex per topic that
         alternates over its keyword set.
      2. Walk source files once. For each file:
           - find which orgs are mentioned (by alias)
           - find which topics appear (any keyword hits), with their counts
           - cross-product: for each mentioned org, add the topic counts
      3. Returns {slug: {topic_id: count}} for every org with any topic hits.

    Cost is dominated by len(files) × (len(org_patterns) + len(topic_patterns))
    rather than len(orgs) × len(files). For 333 files / 1104 orgs / ~41 topics
    that drops 65s → roughly 5-8s, well inside the sandbox window.
    """
    # Build per-org list of (alias, slug) — lowercased for substring matching
    # via cheap `in` rather than regex per org per file.
    alias_to_slugs = defaultdict(list)
    for slug, entry in all_orgs.items():
        aliases = list(entry.get("alias_hits", {}).keys())
        if not aliases:
            aliases = entry.get("aliases", [])
        for a in aliases:
            # Skip too-short aliases that would over-match.
            if len(a) < 2:
                continue
            alias_to_slugs[a.lower()].append(slug)

    if not alias_to_slugs:
        return {}

    # Collect every literal we need to match, tagged with what it belongs to.
    # Org aliases carry their slug list; topic keywords carry their topic ids.
    # A literal that is BOTH an org alias and a topic keyword gets both payloads
    # and is counted once for each namespace, exactly as the two separate
    # regexes used to do.
    #
    # Topic keywords come from topic_keywords.json (the radar's source of
    # truth). Keywords shorter than 3 chars are skipped to avoid over-matching
    # common short tokens; org aliases shorter than 2 chars were already
    # dropped above.
    literal_orgs = {a: tuple(slugs) for a, slugs in alias_to_slugs.items()}
    literal_topics = defaultdict(set)
    topics_dict = topic_keywords.get("topics", {}) if isinstance(topic_keywords, dict) else {}
    for topic_id, entry in topics_dict.items():
        if topic_id.startswith("_") or not isinstance(entry, dict):
            continue
        for k in entry.get("keywords") or []:
            if isinstance(k, str) and len(k) >= 3:
                literal_topics[k.lower()].add(topic_id)

    entries = []
    for literal in set(literal_orgs) | set(literal_topics):
        entries.append((
            literal,
            literal_orgs.get(literal, ()),
            tuple(literal_topics.get(literal, ())),
        ))
    literal_index = _build_literal_index(entries)

    # Walk files once. Each file gets a single scan yielding both the set of
    # orgs mentioned and the per-topic counts.
    topic_mix_per_org = defaultdict(lambda: defaultdict(int))
    for path, _src_type, _file_date in file_index:
        try:
            text = path.read_text(errors="ignore")
        except OSError:
            continue
        slugs_in_file, topic_counts_in_file = _scan_indexed_literals(text, literal_index)
        if not slugs_in_file or not topic_counts_in_file:
            continue
        # Cross-product: each mentioned org gets the topic counts.
        for slug in slugs_in_file:
            for topic_id, count in topic_counts_in_file.items():
                topic_mix_per_org[slug][topic_id] += count

    # Sort each org's mix by count desc.
    return {
        slug: dict(sorted(counts.items(), key=lambda kv: -kv[1]))
        for slug, counts in topic_mix_per_org.items()
    }


def build_topic_mix(org_entry, topic_keywords, file_index, precomputed=None, slug=None):
    """Topic-mix accessor, keyed on TODAY's radar topic IDs.

    If `precomputed` (the dict returned by `precompute_topic_mix`) is supplied,
    just look up the slug. Otherwise fall back to the slow per-org scan so
    standalone callers (one-off scripts, tests) still work. `topic_keywords`
    has the same shape as topic_keywords.json — `{"topics": {id: {keywords: [...]}}}`.
    """
    if precomputed is not None and slug is not None:
        return precomputed.get(slug, {})

    # Fallback: original per-org scan (kept for backward compatibility).
    org_dates = set(org_entry.get("mentions_by_date", {}).keys())
    if not org_dates:
        return {}
    aliases = list(org_entry.get("alias_hits", {}).keys())
    if not aliases:
        aliases = org_entry.get("aliases", [])
    if not aliases:
        return {}
    org_patterns = [whole_word_pattern(a) for a in aliases]
    topic_patterns = {}
    for topic_id, entry in (topic_keywords.get("topics", {}) if isinstance(topic_keywords, dict) else {}).items():
        if topic_id.startswith("_") or not isinstance(entry, dict):
            continue
        kws = [k for k in (entry.get("keywords") or []) if isinstance(k, str) and len(k) >= 3]
        if not kws:
            continue
        kws_sorted = sorted(kws, key=lambda x: -len(x))
        pattern = (
            r"(?<![A-Za-z0-9])(?:"
            + "|".join(re.escape(k) for k in kws_sorted)
            + r")(?![A-Za-z0-9])"
        )
        topic_patterns[topic_id] = re.compile(pattern, re.IGNORECASE)
    topic_counts = defaultdict(int)
    candidate_files = [(p, st, fd) for p, st, fd in file_index if fd in org_dates]
    for path, _, _ in candidate_files:
        try:
            text = path.read_text(errors="ignore")
        except Exception:
            continue
        if not any(rx.search(text) for rx in org_patterns):
            continue
        for topic_id, rx in topic_patterns.items():
            n = len(rx.findall(text))
            if n:
                topic_counts[topic_id] += n
    return dict(sorted(topic_counts.items(), key=lambda kv: -kv[1]))


def attach_radar_org_appearances(slug, radar_jsons):
    """For each radar JSON, did this org appear in any topic's breadth_orgs_7d?

    Once radar starts populating breadth_orgs_7d for real, this becomes the
    authoritative topic→org link. For now it'll mostly be empty.
    """
    rows = []
    for r in radar_jsons:
        topics_for_org = []
        for t in r.get("topics", []):
            if slug in (t.get("breadth_orgs_7d") or []):
                topics_for_org.append({
                    "topic_id": t["id"],
                    "topic_label": t.get("label", t["id"]),
                    "sector": t.get("sector"),
                    "stage": t.get("stage"),
                })
        if topics_for_org:
            rows.append({"date": r["date"], "topics": topics_for_org})
    return rows


def load_topic_keywords():
    """Load pipeline/state/topic_keywords.json. Source of truth for which topics
    exist today and what keywords surface them in raw source text. Maintained
    by the radar pipeline (ai-trend-radar appends/retires entries here)."""
    p = STATE_DIR / "topic_keywords.json"
    if not p.exists():
        return {"topics": {}}
    with open(p) as f:
        return json.load(f)


def main():
    discovered = load_discovered()
    discovered_orgs = discovered.get("orgs", {})

    topic_keywords = load_topic_keywords()

    print(f"[build_org_view] indexing source files…", file=sys.stderr)
    file_index = list(iter_source_files(DATA_ROOT))
    print(f"[build_org_view] {len(file_index)} source files indexed", file=sys.stderr)

    print(f"[build_org_view] scanning for priority vendors…", file=sys.stderr)
    priority_tally = scan_priority_vendors(file_index)
    print(f"[build_org_view] priority vendors with data: {sorted(priority_tally.keys())}", file=sys.stderr)

    # Merge tallies. Priority wins over discovered (same slug should never collide,
    # but just in case).
    all_orgs = {**discovered_orgs, **priority_tally}

    # Fold brand/product slugs into their canonical parent. Without this, the
    # vendor sweep agent's discovery of "claude" / "gemini" / etc. creates
    # standalone slugs that double-count the mentions PRIORITY_VENDORS already
    # credited to Anthropic/Google-DeepMind/etc. See BRAND_TO_PARENT comment.
    all_orgs, dropped_brand_slugs = fold_brand_slugs(all_orgs)
    if dropped_brand_slugs:
        print(f"[build_org_view] folded {len(dropped_brand_slugs)} brand slugs into parents: "
              f"{sorted(dropped_brand_slugs)}", file=sys.stderr)

    # Load radar JSONs once
    radar_jsons = []
    radar_dir = RADAR_DIR
    if radar_dir.exists():
        for rp in sorted(radar_dir.rglob("*.json")):
            if rp.name == "index.json":
                continue
            try:
                radar_jsons.append(json.loads(rp.read_text()))
            except Exception:
                pass

    # Precompute topic-mix for every org in one source-file pass.
    # Was the bottleneck at ~60ms × 1104 orgs ≈ 65s before; now ~5-8s by
    # inverting the loop (files outer, orgs inner). Lets the script finish
    # inside Cowork's bash sandbox timeout.
    n_topics = len((topic_keywords.get("topics") or {}))
    print(f"[build_org_view] precomputing topic-mix for {len(all_orgs)} orgs against "
          f"{n_topics} current topics…", file=sys.stderr)
    topic_mix_index = precompute_topic_mix(all_orgs, topic_keywords, file_index)
    print(f"[build_org_view] topic-mix indexed for {len(topic_mix_index)} orgs", file=sys.stderr)

    print(f"[build_org_view] building per-org files for {len(all_orgs)} orgs…", file=sys.stderr)

    # Ensure orgs/ exists
    orgs_dir = ORGS_DIR
    orgs_dir.mkdir(parents=True, exist_ok=True)

    index_entries = []
    org_files_written = 0
    org_files_skipped = 0
    for slug, entry in all_orgs.items():
        mentions_by_date = entry.get("mentions_by_date", {})
        velocity = compute_velocity(mentions_by_date, TODAY)
        velocity_history = compute_velocity_history(mentions_by_date, TODAY, window_days=30)
        topic_mix = build_topic_mix(entry, topic_keywords, file_index,
                                    precomputed=topic_mix_index, slug=slug)
        radar_appearances = attach_radar_org_appearances(slug, radar_jsons)

        display_name = derive_display_name(slug, entry)
        per_org = {
            "slug": slug,
            "display_name": display_name,
            "coverage": entry.get("coverage", "uncovered"),
            "tier_hint": entry.get("tier_hint"),
            "region": entry.get("region"),
            "blog_url_hint": entry.get("blog_url_hint"),
            "first_seen": entry.get("first_seen"),
            "last_seen": entry.get("last_seen"),
            "total_mentions": entry.get("total_mentions", 0),
            "distinct_days": entry.get("distinct_days", 0),
            "distinct_source_types": entry.get("distinct_source_types", []),
            "mentions_by_source_type": entry.get("mentions_by_source_type", {}),
            "mentions_by_date": mentions_by_date,
            "aliases": list(entry.get("alias_hits", {}).keys()) or entry.get("aliases", []),
            "context_samples": entry.get("context_samples", [])[:6],
            "topic_mix": topic_mix,
            "radar_appearances": radar_appearances,
            "hot_events": entry.get("hot_events", []),
            "classification_history": entry.get("classification_history", []),
            "last_classification": entry.get("last_classification"),
            "is_priority": slug in PRIORITY_VENDORS,
        }
        # Write per-org file only when content actually changed. Without this
        # gate, the daily run touches every firm even when nothing happened to
        # it — the file's mtime moves and git sees a diff. velocity +
        # velocity_history live in orgs/index.json, not here.
        new_text = json.dumps(per_org, indent=2, ensure_ascii=False)
        org_file = orgs_dir / f"{slug}.json"
        if not org_file.exists() or org_file.read_text() != new_text:
            org_file.write_text(new_text)
            org_files_written += 1
        else:
            org_files_skipped += 1

        index_entries.append({
            "slug": slug,
            "display_name": display_name,
            "is_priority": slug in PRIORITY_VENDORS,
            "coverage": per_org["coverage"],
            "tier_hint": per_org["tier_hint"],
            "region": per_org["region"],
            "total_mentions": per_org["total_mentions"],
            "distinct_days": per_org["distinct_days"],
            "first_seen": per_org["first_seen"],
            "last_seen": per_org["last_seen"],
            "velocity_7d": velocity["velocity_7d"],
            "velocity_ratio": velocity["velocity_ratio"],
            "velocity_status": velocity["velocity_status"],
            "velocity_28d_avg": velocity["velocity_28d_avg"],
            "velocity_history": velocity_history,
            "topic_count": len(topic_mix),
            "top_topics": list(topic_mix.keys())[:3],
        })

    # Sort index: priority first, then by velocity_ratio desc, then total_mentions desc
    index_entries.sort(
        key=lambda e: (
            not e["is_priority"],
            -e["velocity_ratio"],
            -e["total_mentions"],
        )
    )

    index_payload = {
        "generated_at": TODAY,
        "total_orgs": len(index_entries),
        "priority_count": sum(1 for e in index_entries if e["is_priority"]),
        "entries": index_entries,
        "_note": (
            "Rebuilt every run by scripts/build_org_view.py. Carries velocity_history "
            "per entry so the firm list + row sparklines render from one HTTP request. "
            "Per-firm orgs/{slug}.json is loaded lazily for the drawer/detail page."
        ),
    }
    (orgs_dir / "index.json").write_text(json.dumps(index_payload, indent=2, ensure_ascii=False))

    # Clean up brand-slug files on disk. Two sources:
    #   1. Slugs the fold step just absorbed (dropped_brand_slugs).
    #   2. Slugs that were absorbed by an EARLIER run and stripped from
    #      discovered_orgs.json — their per-slug files would otherwise survive
    #      indefinitely on disk because the loop above never touched them.
    # In both cases, the index no longer references them; without this cleanup,
    # Angular's lazy fetch on /map/firm/claude would still resolve to stale
    # JSON. Belt-and-braces: remove every BRAND_TO_PARENT slug file that exists.
    brand_files_removed = 0
    for slug in BRAND_TO_PARENT:
        f = orgs_dir / f"{slug}.json"
        if f.exists():
            f.unlink()
            brand_files_removed += 1
    if brand_files_removed:
        print(f"[build_org_view] removed {brand_files_removed} stale brand-slug files",
              file=sys.stderr)

    print(
        f"[build_org_view] wrote orgs/index.json + {org_files_written} per-org files "
        f"({org_files_skipped} unchanged, skipped). "
        f"Priority orgs with data: {sum(1 for e in index_entries if e['is_priority'])}/{len(PRIORITY_VENDORS)}.",
        file=sys.stderr,
    )


if __name__ == "__main__":
    main()
