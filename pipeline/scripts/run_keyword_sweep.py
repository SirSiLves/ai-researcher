#!/usr/bin/env python3
"""
run_keyword_sweep.py — pure-Python implementation of the ai-keyword-sweep skill.

The SKILL.md spec describes a large agentic process (mine n-grams, classify,
auto-apply to sources.json, audit log, proven-promote). For reproducibility
and speed, this script implements that exact procedure deterministically.

Outputs (idempotent across re-runs on the same day):
  - discovered_keywords.json       (running tally, append-update incrementally)
  - keyword_candidates/{YYYY}/{MM}/{TODAY}.md (today's change log)
  - keyword_changes.log            (append-only audit, one line per mutation)
  - sources.json                   (mutated per auto-apply rules, with backup)
  - sources.json.keyword.bak       (one-step rollback target — per-sweep .bak)

Run order: scripts/run_keyword_sweep.py
Hooked from ai-replay §6.8 as a fallback when the agent isn't spawned.
"""
import json
import os
import re
import shutil
import sys
from collections import defaultdict
from datetime import date, datetime, timedelta
from pathlib import Path

from _lib import iter_source_files, upsert_index_marker_line, REPO_ROOT, STATE_DIR, DATA_ROOT, INDEX_MD

ROOT = REPO_ROOT  # back-compat for `path.relative_to(ROOT)` calls
# Prefer TODAY from the env (set by `eval "$(scripts/now.sh)"` in the
# orchestrator); fall back to wall-clock date for standalone runs.
TODAY = os.environ.get("TODAY") or date.today().isoformat()
NOW_ISO = datetime.now().astimezone().isoformat(timespec="seconds")

# Target list section paths in sources.json
TARGET_PATHS = {
    "news_web_search_queries": ("news_collector", "web_search_queries"),
    "hackernews_filter_keywords": ("hackernews_collector", "filter_keywords"),
    "linkedin_pulse_queries": ("linkedin_collector", "pulse_topic_queries"),
    # radar_topic_taxonomy is a special case: a new "_auto_added" key inside topic_taxonomy_seed
}

# Where the parallel _auto_added_meta / _deep_watch_meta registries live for each
# target list. Each section gets its OWN registry (locality with the flat list
# it tracks). Manual entries are anything in the flat list with no registry entry.
META_PATHS = {
    "news_web_search_queries":   ("news_collector",),
    "hackernews_filter_keywords": ("hackernews_collector",),
    "linkedin_pulse_queries":    ("linkedin_collector",),
    "radar_topic_taxonomy":      ("radar_config", "topic_taxonomy_seed"),
}


def _meta_container(sources, target):
    """Walk META_PATHS[target] to get the dict that holds _auto_added_meta + _deep_watch_meta."""
    obj = sources
    for key in META_PATHS[target]:
        obj = obj.setdefault(key, {})
    return obj


def _flat_list(sources, target):
    """Get the actual list (or _auto_added array) of phrases for this target."""
    if target == "radar_topic_taxonomy":
        return sources["radar_config"]["topic_taxonomy_seed"].setdefault("_auto_added", [])
    key1, key2 = TARGET_PATHS[target]
    return sources[key1].setdefault(key2, [])

TOKEN_RE = re.compile(r"[a-z][a-z0-9'-]+")
URL_RE = re.compile(r"https?://\S+|\b[a-z0-9.-]+\.[a-z]{2,}\b")
MARKDOWN_LINK_RE = re.compile(r"\[([^\]]+)\]\([^)]+\)")
CODE_FENCE_RE = re.compile(r"```[\s\S]*?```", re.MULTILINE)
FRONTMATTER_RE = re.compile(r"^---[\s\S]*?^---\s*$", re.MULTILINE)

# Boilerplate detection is AGENT-DRIVEN, not hard-coded.
#
# The script does NOT have a list of boilerplate phrases. Instead, every
# candidate phrase gets stored in discovered_keywords.json with three fields:
#
#   boilerplate_decision:  "signal" | "boilerplate" | null
#   boilerplate_reason:    short string (the agent's rationale)
#   boilerplate_decided_at: YYYY-MM-DD (verdict has a 30-day TTL)
#
# Phrases where the decision is null OR > 30 days old are added to
# keyword_judge_request.md for an agent to review. The agent reads the phrase
# + 1-2 context samples and writes back a JSON verdict file the script then
# applies on the next run.
#
# Until a phrase has been judged, it's tentatively treated as signal — it's
# tracked in the tally and counted toward classification, but not auto-applied
# (since auto-apply requires the sustained-day gate anyway). This keeps the
# pipeline running with no agent involvement; the agent's role is to prune
# template artifacts when it runs.
#
# Why this design:
# - No hard-coded lists go stale.
# - New template artifacts the pipeline introduces get caught the first time
#   the agent reviews them, not after I notice and patch the script.
# - The 30-day TTL means the agent gets a chance to revise verdicts as the
#   meaning of phrases shifts over time.

VERDICT_TTL_DAYS = 30


def needs_judgment(entry, today_iso):
    """True if this phrase needs an agent's boilerplate verdict."""
    if "boilerplate_decision" not in entry:
        return True
    if entry["boilerplate_decision"] is None:
        return True
    decided_at = entry.get("boilerplate_decided_at")
    if not decided_at:
        return True
    try:
        delta = (date.fromisoformat(today_iso) - date.fromisoformat(decided_at)).days
    except Exception:
        return True
    return delta > VERDICT_TTL_DAYS


def is_judged_boilerplate(entry):
    """True if this phrase has been judged as boilerplate AND verdict is fresh."""
    return entry.get("boilerplate_decision") == "boilerplate"


def clean_text(text):
    """Strip frontmatter, code fences, URLs, markdown link syntax, lowercase."""
    text = FRONTMATTER_RE.sub("", text)
    text = CODE_FENCE_RE.sub(" ", text)
    text = MARKDOWN_LINK_RE.sub(r" \1 ", text)  # keep link text, drop URL
    text = URL_RE.sub(" ", text)
    return text.lower()


def tokenize(text):
    return TOKEN_RE.findall(text)


def gen_ngrams(tokens, n, stopwords, min_chars):
    out = []
    for i in range(len(tokens) - n + 1):
        gram = tokens[i:i + n]
        if any(t in stopwords or len(t) < 3 for t in gram):
            continue
        phrase = " ".join(gram)
        if len(phrase) < min_chars:
            continue
        out.append(phrase)
    return out


def get_covered_keywords(sources, taxonomy):
    """Build the lowercase set of phrases already present in any target list."""
    covered = set()
    covered |= {q.lower() for q in sources.get("news_collector", {}).get("web_search_queries", [])}
    covered |= {q.lower() for q in sources.get("hackernews_collector", {}).get("filter_keywords", [])}
    covered |= {q.lower() for q in sources.get("linkedin_collector", {}).get("pulse_topic_queries", [])}
    for group, topics in taxonomy.items():
        if group.startswith("_") or not isinstance(topics, list):
            continue
        covered |= {t.lower() for t in topics}
    # Also dedupe by partial overlap (single tokens)
    return covered


def main():
    sources = json.loads((STATE_DIR / "sources.json").read_text())
    cfg = sources["radar_config"]["keyword_sweep_config"]
    if not cfg.get("enabled", False):
        print("[keyword_sweep] disabled in config; exiting", file=sys.stderr)
        return

    print(f"[keyword_sweep] starting for {TODAY}", file=sys.stderr)

    stopwords = set(cfg["stopwords"])
    min_chars = cfg["min_ngram_chars"]
    ngram_sizes = cfg["ngram_sizes"]
    max_candidates = cfg["max_candidates_per_run"]
    taxonomy = sources["radar_config"]["topic_taxonomy_seed"]
    covered_lc = get_covered_keywords(sources, taxonomy)

    # Load existing state
    discovered_path = STATE_DIR / "discovered_keywords.json"
    if discovered_path.exists():
        discovered = json.loads(discovered_path.read_text())
    else:
        discovered = {"last_updated": TODAY, "keywords": {}}

    is_first_run = len(discovered.get("keywords", {})) == 0

    # Pick the scanning window:
    #   - First run (no prior tally): scan the whole rolling_window_days so the
    #     tally has real mentions_by_date history. Without this, every phrase
    #     would have first_seen == last_seen == TODAY and the sustained-day
    #     classification gate (which needs ≥4 distinct days in the window) can
    #     never fire until the script runs for 4+ days.
    #   - Subsequent runs: mine only today's files incrementally.
    if is_first_run:
        cutoff = (date.fromisoformat(TODAY) - timedelta(days=cfg["rolling_window_days"])).isoformat()
        today_files = [
            (p, st, fd) for p, st, fd in iter_source_files(DATA_ROOT) if fd >= cutoff
        ]
        print(f"[keyword_sweep] first run — scanning last {cfg['rolling_window_days']}d "
              f"= {len(today_files)} files (bootstrap window)", file=sys.stderr)
    else:
        today_files = [
            (p, st, fd) for p, st, fd in iter_source_files(DATA_ROOT) if fd == TODAY
        ]
        if not today_files:
            # No today files? Mine the whole rolling window for catch-up purposes.
            cutoff = (date.fromisoformat(TODAY) - timedelta(days=cfg["rolling_window_days"])).isoformat()
            today_files = [
                (p, st, fd) for p, st, fd in iter_source_files(DATA_ROOT) if fd >= cutoff
            ]
            print(f"[keyword_sweep] no files dated {TODAY}; falling back to last {cfg['rolling_window_days']}d "
                  f"= {len(today_files)} files (catch-up mode)", file=sys.stderr)

    # === Step 3: mine n-grams from candidate files ===
    # Use "9999-12-31" as the initial first_seen so any real date beats it.
    # Use "0000-01-01" as the initial last_seen so any real date beats it.
    # The previous default of TODAY caused first_seen=TODAY for every phrase
    # even when mining older files — visible as "201 phrases all with
    # first_seen=last_seen=TODAY" in discovered_keywords.json.
    fresh_candidates = defaultdict(lambda: {
        "first_seen": "9999-12-31", "last_seen": "0000-01-01",
        "total_mentions": 0,
        "mentions_by_source_type": defaultdict(int),
        "mentions_by_date": defaultdict(int),
        "context_samples": [],
    })

    print(f"[keyword_sweep] mining n-grams from {len(today_files)} files...", file=sys.stderr)
    for path, src_type, fdate in today_files:
        try:
            raw = path.read_text(errors="ignore")
        except Exception:
            continue
        text = clean_text(raw)
        tokens = tokenize(text)
        # File-level phrase set: each phrase counts once per source type / date pair
        phrases_in_file = set()
        phrase_counts = defaultdict(int)
        for n in ngram_sizes:
            for phrase in gen_ngrams(tokens, n, stopwords, min_chars):
                if phrase in covered_lc:
                    continue
                # Suppress phrases the agent has already judged as boilerplate
                # (verdict cached on the prior tally, still within 30-day TTL).
                existing = discovered.get("keywords", {}).get(phrase)
                if existing and is_judged_boilerplate(existing):
                    if not needs_judgment(existing, TODAY):
                        continue  # cached "boilerplate" verdict, still fresh
                phrases_in_file.add(phrase)
                phrase_counts[phrase] += 1

        for phrase in phrases_in_file:
            entry = fresh_candidates[phrase]
            entry["mentions_by_source_type"][src_type] += 1
            entry["mentions_by_date"][fdate] += 1
            entry["total_mentions"] += phrase_counts[phrase]
            if entry["first_seen"] > fdate:
                entry["first_seen"] = fdate
            if entry["last_seen"] < fdate:
                entry["last_seen"] = fdate
            if len(entry["context_samples"]) < 4:
                idx = text.find(phrase)
                if idx != -1:
                    lo, hi = max(0, idx - 50), min(len(text), idx + len(phrase) + 50)
                    snippet = re.sub(r"\s+", " ", text[lo:hi]).strip()
                    entry["context_samples"].append(f"…{snippet}…  ({path.relative_to(ROOT)})")

    print(f"[keyword_sweep] mined {len(fresh_candidates)} unique candidate phrases", file=sys.stderr)

    # Cap by total_mentions × distinct_source_types
    scored = sorted(
        fresh_candidates.items(),
        key=lambda kv: -(kv[1]["total_mentions"] * len(kv[1]["mentions_by_source_type"])),
    )[:max_candidates]
    fresh_candidates = dict(scored)

    # === Step 4: merge fresh into discovered ===
    for phrase, fresh in fresh_candidates.items():
        if phrase in discovered["keywords"]:
            ent = discovered["keywords"][phrase]
            ent["last_seen"] = max(ent.get("last_seen", TODAY), TODAY)
            ent["total_mentions"] = ent.get("total_mentions", 0) + fresh["total_mentions"]
            mbs = ent.setdefault("mentions_by_source_type", {})
            for k, v in fresh["mentions_by_source_type"].items():
                mbs[k] = mbs.get(k, 0) + v
            mbd = ent.setdefault("mentions_by_date", {})
            for k, v in fresh["mentions_by_date"].items():
                mbd[k] = mbd.get(k, 0) + v
            samples = ent.setdefault("context_samples", [])
            for s in fresh["context_samples"]:
                if len(samples) < 6 and s not in samples:
                    samples.append(s)
        else:
            discovered["keywords"][phrase] = {
                "first_seen": fresh["first_seen"],
                "last_seen": fresh["last_seen"],
                "total_mentions": fresh["total_mentions"],
                "mentions_by_source_type": dict(fresh["mentions_by_source_type"]),
                "mentions_by_date": dict(fresh["mentions_by_date"]),
                "context_samples": list(fresh["context_samples"]),
                "applied_to_lists": [],
                "classification_history": [],
            }

    # === Step 5: classify each keyword ===
    pt = cfg["promotion_thresholds"]
    wt = cfg["watch_thresholds"]
    proven_thr = cfg["proven_keywords_protection"]["promotion_to_proven_thresholds"]
    window_days = cfg["rolling_window_days"]
    today_d = date.fromisoformat(TODAY)
    window_start = (today_d - timedelta(days=window_days)).isoformat()

    classifications = {}
    for phrase, ent in discovered["keywords"].items():
        mbd = ent.get("mentions_by_date", {})
        recent_mentions = sum(v for d, v in mbd.items() if d >= window_start)
        recent_source_types = set()
        # Approximate per-window source types by checking mentions_by_source_type
        # (we don't keep per-date×source type granularity)
        for d in mbd:
            if d >= window_start:
                pass  # we'll just trust mentions_by_source_type as a window proxy
        recent_source_types = set(ent.get("mentions_by_source_type", {}).keys())
        recent_distinct_days = {d for d in mbd if d >= window_start}

        tier = "dormant"
        if ent.get("applied_to_lists"):
            tier = "already_applied"
        elif (recent_mentions >= pt["min_total_mentions"]
              and len(recent_source_types) >= pt["min_source_types"]
              and len(recent_distinct_days) >= pt["min_distinct_days"]):
            tier = "promote"
        elif wt["min_total_mentions"] <= recent_mentions <= wt["max_total_mentions"]:
            tier = "watch"

        classifications[phrase] = tier
        hist = ent.setdefault("classification_history", [])
        if not hist or hist[-1]["tier"] != tier or hist[-1]["date"] != TODAY:
            hist.append({"date": TODAY, "tier": tier})
            ent["classification_history"] = hist[-14:]
        ent["current_tier"] = tier

    # === Step 6.5: proven promotion ===
    proven_promotions = []
    for phrase, ent in discovered["keywords"].items():
        if ent.get("tier_lifetime") == "proven":
            continue
        if not ent.get("applied_to_lists"):
            continue
        lifetime_days = len(ent.get("mentions_by_date", {}))
        lifetime_src_types = len(ent.get("mentions_by_source_type", {}))
        try:
            first = date.fromisoformat(ent["first_seen"])
            age_days = (today_d - first).days
        except Exception:
            age_days = 0
        if (lifetime_days >= proven_thr["min_distinct_days_lifetime"]
            and lifetime_src_types >= proven_thr["min_source_types_lifetime"]
            and age_days >= proven_thr["min_age_days"]):
            ent["tier_lifetime"] = "proven"
            ent["proven_on"] = TODAY
            proven_promotions.append({
                "phrase": phrase,
                "lifetime_days": lifetime_days,
                "lifetime_src_types": lifetime_src_types,
                "age_days": age_days,
                "target_lists": list(ent.get("applied_to_lists", [])),
            })

    # === Step 6: target list mapping ===
    def target_lists_for(phrase, ent):
        mbs = ent.get("mentions_by_source_type", {})
        total = sum(mbs.values()) or 1
        targets = []
        if (mbs.get("tech_news", 0) / total) >= 0.5:
            targets.append("news_web_search_queries")
        if len(mbs) >= 3:
            targets.append("radar_topic_taxonomy")
        if mbs.get("hackernews_signal", 0) > 0 or (
            mbs.get("tech_news", 0) > 0 and len(ent.get("mentions_by_date", {})) >= 2
        ):
            targets.append("hackernews_filter_keywords")
        if mbs.get("linkedin_network_post", 0) > 0:
            targets.append("linkedin_pulse_queries")
        return targets

    # === Step 7: auto-apply ===
    promotions_to_add = []
    for phrase, tier in classifications.items():
        if tier != "promote":
            continue
        ent = discovered["keywords"][phrase]
        # Sustained-day gate: must have held "promote" tier for >= N days in a row ending today
        hist = ent.get("classification_history", [])
        # Count trailing consecutive promote days
        consec = 0
        last_date = today_d
        for record in reversed(hist):
            if record["tier"] == "promote":
                rec_date = date.fromisoformat(record["date"])
                if (last_date - rec_date).days <= 1:
                    consec += 1
                    last_date = rec_date
                else:
                    break
            else:
                break
        if consec < pt["min_consecutive_days_at_promote"]:
            ent["_pending_consecutive_days"] = consec
            continue
        targets = target_lists_for(phrase, ent)
        if not targets:
            continue
        promotions_to_add.append((phrase, targets, ent))

    # Backup sources.json before mutation. Per-sweep .bak so a vendor-sweep
    # rollback can't accidentally clobber a keyword-sweep snapshot (or vice
    # versa) when both have run the same day.
    shutil.copy(STATE_DIR / "sources.json", STATE_DIR / "sources.json.keyword.bak")

    log_lines = []
    applied_count = 0
    revived_count = 0
    for phrase, targets, ent in promotions_to_add:
        applied_targets = []
        revived_targets = []
        reason = (f"promote: {sum(ent.get('mentions_by_source_type', {}).values())} mentions, "
                  f"{len(ent.get('mentions_by_source_type', {}))} src types, "
                  f"{len(ent.get('mentions_by_date', {}))} days")
        for tgt in targets:
            arr = _flat_list(sources, tgt)
            meta_container = _meta_container(sources, tgt)
            auto_meta = meta_container.setdefault("_auto_added_meta", {})
            deep_watch_meta = meta_container.setdefault("_deep_watch_meta", {})

            # Re-promotion path: was this phrase deep-watched? Restore it.
            if phrase in deep_watch_meta:
                restored = {k: v for k, v in deep_watch_meta[phrase].items()
                            if k not in {"_demoted_on", "_demoted_reason"}}
                restored["_added_on"] = TODAY
                restored["_added_reason"] = reason
                auto_meta[phrase] = restored
                del deep_watch_meta[phrase]
                if phrase not in arr:
                    arr.append(phrase)
                revived_targets.append(tgt)
                log_lines.append(
                    f'{NOW_ISO} deep-watch-promote {tgt:<30} "{phrase}" reason="returned via sustained_promote"'
                )
                continue

            # Standard new-promotion path.
            if phrase not in arr:
                arr.append(phrase)
                applied_targets.append(tgt)
                auto_meta[phrase] = {
                    "_auto_added": True,
                    "_added_on": TODAY,
                    "_added_reason": reason,
                }
            elif phrase not in auto_meta:
                # Phrase already in flat list but no metadata — likely manual.
                # Don't overwrite (manual is sacred). But if we're sure WE added
                # it earlier (e.g. before metadata tracking existed), at least
                # adopt it now so future deep-watch can see it.
                # Heuristic: only adopt if we have applied_on history.
                if ent.get("applied_to_lists") and tgt in ent.get("applied_to_lists", []):
                    auto_meta[phrase] = {
                        "_auto_added": True,
                        "_added_on": ent.get("applied_on") or TODAY,
                        "_added_reason": reason + " (adopted from pre-meta era)",
                    }

        if applied_targets:
            ent["applied_to_lists"] = list(set(ent.get("applied_to_lists", []) + applied_targets))
            ent["applied_on"] = TODAY
            applied_count += 1
            for tgt in applied_targets:
                log_lines.append(
                    f'{NOW_ISO} promote-add        {tgt:<30} "{phrase}" reason="{reason}"'
                )
        if revived_targets:
            ent["applied_to_lists"] = list(set(ent.get("applied_to_lists", []) + revived_targets))
            ent["applied_on"] = TODAY
            revived_count += 1

    # Proven promotion log lines
    for promotion in proven_promotions:
        reason = (f"lifetime: {promotion['age_days']} days, "
                  f"{promotion['lifetime_src_types']} src types, "
                  f"{promotion['lifetime_days']} distinct days")
        for tgt in promotion["target_lists"]:
            log_lines.append(
                f'{NOW_ISO} proven-promote     {tgt:<30} "{promotion["phrase"]}" reason="{reason}"'
            )

    # === Step 7.5: deep-watch demotion (soft cap on each keyword list) ===
    dw_cfg = cfg.get("auto_apply", {}).get("deep_watch_demote", {})
    if dw_cfg.get("enabled"):
        max_per_list = dw_cfg.get("max_per_list", {})
        min_silence = dw_cfg.get("min_silence_days", 45)
        per_run_budget = dw_cfg.get("max_demotions_per_run", 5)
        today_d_local = date.fromisoformat(TODAY)
        # Slugs not eligible: classified hot/promote today
        ineligible = {p for p, t in classifications.items() if t in {"hot_candidate", "promote"}}
        for tgt, cap in max_per_list.items():
            if tgt not in TARGET_PATHS and tgt != "radar_topic_taxonomy_auto_added":
                continue  # unknown target name
            actual_tgt = "radar_topic_taxonomy" if tgt == "radar_topic_taxonomy_auto_added" else tgt
            arr = _flat_list(sources, actual_tgt)
            if len(arr) <= cap:
                continue
            meta_container = _meta_container(sources, actual_tgt)
            auto_meta = meta_container.setdefault("_auto_added_meta", {})
            proven_meta = meta_container.get("_proven_meta", {})
            deep_watch_meta = meta_container.setdefault("_deep_watch_meta", {})
            # Find candidates: in flat list AND in _auto_added_meta AND not proven
            # AND not classified hot/promote today AND silent >= min_silence.
            candidates = []
            for phrase in arr:
                if phrase not in auto_meta:
                    continue  # manual or unknown — sacred
                if phrase in proven_meta:
                    continue  # proven — sacred
                if phrase in ineligible:
                    continue
                ent = discovered["keywords"].get(phrase, {})
                last_seen = ent.get("last_seen", auto_meta[phrase].get("_added_on", "0000-01-01"))
                try:
                    silence_days = (today_d_local - date.fromisoformat(last_seen)).days
                except ValueError:
                    silence_days = 9999
                if silence_days < min_silence:
                    continue
                candidates.append((phrase, last_seen, silence_days))
            # Sort oldest-silent first (last_seen ascending)
            candidates.sort(key=lambda x: x[1])
            n_to_demote = min(len(arr) - cap, per_run_budget, len(candidates))
            for phrase, last_seen, silence_days in candidates[:n_to_demote]:
                # Move metadata: _auto_added_meta → _deep_watch_meta
                entry = dict(auto_meta[phrase])
                entry["_demoted_on"] = TODAY
                entry["_demoted_reason"] = f"deep-watch: silent {silence_days}d, over cap {cap}"
                deep_watch_meta[phrase] = entry
                del auto_meta[phrase]
                # Remove phrase string from flat list
                arr[:] = [p for p in arr if p != phrase]
                log_lines.append(
                    f'{NOW_ISO} deep-watch-demote  {actual_tgt:<30} "{phrase}" '
                    f'reason="silent {silence_days}d, ranked oldest-silent over cap={cap}"'
                )

    # Validate JSON before writing. ensure_ascii=False keeps em-dashes and
    # other UTF-8 chars in their natural form (Python's default escapes them
    # to —, which produces churn-only diffs against hand-edited files).
    # Trailing newline matches the convention of hand-edited config files.
    try:
        json.dumps(sources)
        (STATE_DIR / "sources.json").write_text(json.dumps(sources, indent=2, ensure_ascii=False) + "\n")
    except Exception as e:
        # Restore backup and abort
        shutil.copy(STATE_DIR / "sources.json.keyword.bak", STATE_DIR / "sources.json")
        print(f"[keyword_sweep] JSON validation failed, restored backup: {e}", file=sys.stderr)
        with (STATE_DIR / "keyword_changes.log").open("a") as f:
            f.write(f"{NOW_ISO} ABORT-INVALID-JSON  -  reason=\"sources.json would not parse after edits\"\n")
        return

    # Append to keyword_changes.log
    if log_lines:
        with (STATE_DIR / "keyword_changes.log").open("a") as f:
            f.write("\n".join(log_lines) + "\n")

    # === Step 8.5: build keyword_judge_request.md for the agent ===
    # Every phrase in the tally that lacks a fresh verdict goes into the
    # request file. The agent reads it, decides signal-vs-boilerplate per
    # phrase, and writes keyword_judge_verdicts.json which the next sweep
    # run applies. No hard-coded blocklist; the agent IS the filter.
    needs = [
        (phrase, ent) for phrase, ent in discovered["keywords"].items()
        if needs_judgment(ent, TODAY)
    ]
    if needs:
        request_path = STATE_DIR / "keyword_judge_request.md"
        lines = [
            f"# Keyword boilerplate-judgment request — {TODAY}\n",
            (
                "_The keyword sweep mined the phrases below from source files. Some are real AI-field "
                "signal (e.g. 'mcp server', 'frontier model'); others are template scaffolding from "
                "OUR OWN collector outputs (e.g. 'fresh items', 'why notable', 'pts comments'). For each "
                "phrase, decide which it is by reading the context snippet. Write a JSON verdicts file at "
                "`keyword_judge_verdicts.json` with this shape:_\n"
            ),
            "```json",
            "{",
            "  \"verdicts\": {",
            "    \"mcp server\":  {\"decision\": \"signal\",      \"reason\": \"real protocol\"},",
            "    \"fresh items\": {\"decision\": \"boilerplate\", \"reason\": \"news collector template line\"},",
            "    ...",
            "  }",
            "}",
            "```",
            "",
            (
                "_The next sweep run applies the verdicts: signal phrases stay in the tally, boilerplate "
                "phrases are suppressed from future runs (cached for 30 days, then re-asked). If a phrase "
                "is genuinely ambiguous, mark it 'signal' and let the sustained-day gate sort it out._\n"
            ),
            f"## {len(needs)} phrases needing a verdict\n",
        ]
        # Sort by signal-strength descending (most-mentioned, most-source-types first)
        # so the agent's attention budget goes to the things that matter most.
        needs.sort(key=lambda kv: -(kv[1].get("total_mentions", 0) * len(kv[1].get("mentions_by_source_type", {}))))
        for phrase, ent in needs[:300]:  # cap at 300 per run
            ctx = ent.get("context_samples") or [""]
            sample = (ctx[0] if ctx else "")[:180]
            lines.append(
                f"- **\"{phrase}\"** — {ent.get('total_mentions', 0)} mentions, "
                f"{len(ent.get('mentions_by_source_type', {}))} src types, "
                f"{len(ent.get('mentions_by_date', {}))} distinct days. "
                f"Context: _{sample}_"
            )
        if len(needs) > 300:
            lines.append(f"_…+{len(needs) - 300} more phrases not shown (capped at 300; will appear next run)._")
        request_path.write_text("\n".join(lines))
        print(f"[keyword_sweep] wrote {request_path.relative_to(ROOT)} with {len(needs)} phrases for agent review", file=sys.stderr)

    # === Step 8.6: apply any pending verdicts from the agent ===
    # The agent writes keyword_judge_verdicts.json after reviewing the request
    # file. The script picks it up on the next run, applies decisions, and
    # then deletes the verdicts file (so it doesn't re-apply stale decisions).
    verdicts_path = STATE_DIR / "keyword_judge_verdicts.json"
    applied_verdicts = 0
    if verdicts_path.exists():
        try:
            verdicts = json.loads(verdicts_path.read_text())
            for phrase, v in verdicts.get("verdicts", {}).items():
                if phrase not in discovered["keywords"]:
                    continue
                decision = v.get("decision")
                if decision not in {"signal", "boilerplate"}:
                    continue
                discovered["keywords"][phrase]["boilerplate_decision"] = decision
                discovered["keywords"][phrase]["boilerplate_reason"] = v.get("reason", "")
                discovered["keywords"][phrase]["boilerplate_decided_at"] = TODAY
                applied_verdicts += 1
            # Don't delete the verdicts file unless every entry was applied.
            # Move it to .applied so we can audit what came in.
            (STATE_DIR / f"keyword_judge_verdicts.{TODAY}.applied.json").write_text(verdicts_path.read_text())
            verdicts_path.unlink()
            print(f"[keyword_sweep] applied {applied_verdicts} agent verdicts; archived to keyword_judge_verdicts.{TODAY}.applied.json", file=sys.stderr)
        except Exception as e:
            print(f"[keyword_sweep] failed to apply verdicts: {e}", file=sys.stderr)

    # === Step 9: write discovered_keywords.json ===
    discovered["last_updated"] = TODAY
    # Sort keys for stable diffs
    discovered["keywords"] = dict(sorted(discovered["keywords"].items()))
    discovered_path.write_text(json.dumps(discovered, indent=2, ensure_ascii=False) + "\n")

    # === Step 8: write change log markdown ===
    md_dir = DATA_ROOT / f"keyword_candidates/{today_d.year:04d}/{today_d.month:02d}"
    md_dir.mkdir(parents=True, exist_ok=True)
    md_path = md_dir / f"{TODAY}.md"

    watch_phrases = [(p, discovered["keywords"][p]) for p, t in classifications.items() if t == "watch"]
    watch_phrases.sort(key=lambda kv: -kv[1].get("total_mentions", 0))
    pending = [(p, discovered["keywords"][p]) for p, t in classifications.items()
               if t == "promote" and not discovered["keywords"][p].get("applied_on")]

    md = [f"# Keyword sweep — {TODAY}\n",
          f"_Auto-extending the four keyword lists in sources.json: news web_search_queries, radar topic_taxonomy_seed._auto_added, hackernews filter_keywords, linkedin pulse_topic_queries. Pure-Python implementation via `scripts/run_keyword_sweep.py`. Rollback last mutation: `cp sources.json.keyword.bak sources.json`._\n"]

    md.append("## 📋 What changed in sources.json today\n")
    if applied_count:
        for phrase, targets, ent in promotions_to_add:
            md.append(f"- **promote-add** `\"{phrase}\"` → {', '.join(targets)}")
    else:
        md.append("_No promotions applied this run._")
    md.append("")

    md.append("## 🏛️ Promoted to PROVEN this run\n")
    if proven_promotions:
        for p in proven_promotions:
            md.append(f"- **\"{p['phrase']}\"** — lifetime: {p['lifetime_days']}d / {p['lifetime_src_types']} src types / {p['age_days']}d old. Now permanent on: {', '.join(p['target_lists'])}")
    else:
        md.append("_No keywords crossed proven thresholds this run._")
    md.append("")

    md.append(f"## ⏳ Pending — needs more days at promote tier ({len(pending)})\n")
    for phrase, ent in pending[:20]:
        consec = ent.get("_pending_consecutive_days", 0)
        req = pt["min_consecutive_days_at_promote"]
        md.append(f"- **\"{phrase}\"** — {sum(ent.get('mentions_by_source_type',{}).values())} mentions, {len(ent.get('mentions_by_source_type',{}))} src types · days at promote: {consec}/{req}")
    if len(pending) > 20:
        md.append(f"_…+{len(pending) - 20} more_")
    md.append("")

    md.append(f"## 👀 Watch list (top 30 of {len(watch_phrases)})\n")
    for phrase, ent in watch_phrases[:30]:
        samples = ent.get("context_samples") or [""]
        sample = (samples[0] if samples else "")[:100]
        md.append(f"- **\"{phrase}\"** — {ent.get('total_mentions',0)} mentions / {len(ent.get('mentions_by_source_type',{}))} src types · _{sample}_")
    md.append("")

    md.append("## Tally summary")
    proven_count = sum(1 for k in discovered["keywords"].values() if k.get("tier_lifetime") == "proven")
    md.append(f"- Phrases tracked: {len(discovered['keywords'])}")
    md.append(f"- Promoted to date: {sum(1 for k in discovered['keywords'].values() if k.get('applied_to_lists'))}")
    md.append(f"- **Proven (permanent anchors): {proven_count}**")
    md.append(f"- Currently watching: {len(watch_phrases)}")
    md.append(f"- Discovered today (new): {len(fresh_candidates)}")
    md.append(f"- Today's source files scanned: {len(today_files)}")
    md.append(f"- sources.json snapshot before edit → sources.json.keyword.bak ({applied_count} promotion(s), {len(proven_promotions)} proven-promotion(s))")
    md.append("")

    md_path.write_text("\n".join(md))

    # === Step 8.6: update index.md ===
    rel_path = md_path.relative_to(ROOT).as_posix()
    index_line = (f"- [{TODAY}]({rel_path}) — "
                  f"applied: {applied_count} promotion(s), {len(proven_promotions)} proven-promotion(s); "
                  f"pending: {len(pending)}; watch: {len(watch_phrases)}; "
                  f"tally: {len(discovered['keywords'])} phrases")
    upsert_index_marker_line(INDEX_MD, "KEYWORD", TODAY, index_line)

    print(f"[keyword_sweep] done. applied {applied_count} promotions, "
          f"{len(proven_promotions)} proven-promotions. "
          f"tally has {len(discovered['keywords'])} phrases. "
          f"watch list: {len(watch_phrases)}. "
          f"wrote {md_path.relative_to(ROOT)}.", file=sys.stderr)


if __name__ == "__main__":
    main()
