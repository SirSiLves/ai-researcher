#!/usr/bin/env python3
"""
build_org_view.py — consolidates discovered_orgs.json + all radar JSONs +
source files into a per-org dataset that drives orgs.html.

Outputs:
  orgs/index.json        — sorted org list with summary metrics
  orgs/{slug}.json       — full per-org timeline + topic mix + classification history

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

Idempotent — re-running rebuilds the orgs/ tree from scratch.

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
        "aliases": ["OpenAI", "GPT-4", "GPT-5", "ChatGPT", "Sora", "DALL-E"],
        "tier_hint": "frontier-lab",
        "region": "us",
        "blog_url_hint": "https://openai.com/blog",
        "coverage": "priority",
    },
    "anthropic": {
        "aliases": ["Anthropic", "Claude", "Claude Opus", "Claude Sonnet", "Claude Haiku"],
        "tier_hint": "frontier-lab",
        "region": "us",
        "blog_url_hint": "https://www.anthropic.com/news",
        "coverage": "priority",
    },
    "google-deepmind": {
        "aliases": ["Google DeepMind", "DeepMind", "Gemini", "AlphaFold", "AlphaEvolve", "AlphaProof"],
        "tier_hint": "frontier-lab",
        "region": "us",
        "blog_url_hint": "https://deepmind.google/blog/",
        "coverage": "priority",
    },
    "meta": {
        "aliases": ["Meta AI", "Llama", "LLaMA", "FAIR Labs", "Meta FAIR"],
        "tier_hint": "frontier-lab",
        "region": "us",
        "blog_url_hint": "https://ai.meta.com/blog/",
        "coverage": "priority",
    },
    "mistral": {
        "aliases": ["Mistral", "Mistral AI", "Mixtral", "Codestral"],
        "tier_hint": "frontier-lab",
        "region": "fr",
        "blog_url_hint": "https://mistral.ai/news",
        "coverage": "priority",
    },
    "deepseek": {
        "aliases": ["DeepSeek", "DeepSeek-V", "DeepSeek-R"],
        "tier_hint": "frontier-lab",
        "region": "cn",
        "blog_url_hint": "https://api-docs.deepseek.com/news",
        "coverage": "priority",
    },
}

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
    if ratio >= 5.0:
        status = "surging"
    elif ratio >= 3.0:
        status = "accelerating"
    elif ratio <= 0.33:
        status = "cooling"
    else:
        status = "steady"
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


def build_topic_mix(org_entry, taxonomy, file_index):
    """For one org, find which topic-taxonomy strings appear alongside its mentions.

    For every source file the org was mentioned in, scan the file for every
    topic alias and count co-occurrences. Returns {topic: count} sorted.
    """
    mentioned_in = set()
    # Build set of file paths where this org was mentioned. We use first_seen_in_file
    # as a proxy + mentions_by_date keys to crosswalk file_index.
    org_dates = set(org_entry.get("mentions_by_date", {}).keys())
    if not org_dates:
        return {}

    aliases = list(org_entry.get("alias_hits", {}).keys())
    if not aliases:
        aliases = org_entry.get("aliases", [])  # priority vendors carry aliases
    if not aliases:
        return {}
    org_patterns = [whole_word_pattern(a) for a in aliases]

    # Topic patterns (flat: topic_string → pattern)
    topic_patterns = {}
    for group, topics in taxonomy.items():
        if group.startswith("_") or not isinstance(topics, list):
            continue
        for t in topics:
            topic_patterns[t] = whole_word_pattern(t)

    topic_counts = defaultdict(int)

    # Limit to files within org_dates — much cheaper than scanning everything.
    candidate_files = [
        (p, st, fd) for p, st, fd in file_index if fd in org_dates
    ]
    for path, _, _ in candidate_files:
        try:
            text = path.read_text(errors="ignore")
        except Exception:
            continue
        # Must contain at least one org alias to count
        if not any(rx.search(text) for rx in org_patterns):
            continue
        for topic_name, rx in topic_patterns.items():
            n = len(rx.findall(text))
            if n:
                topic_counts[topic_name] += n
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


def main():
    sources_json = load_sources_json()
    taxonomy = sources_json.get("radar_config", {}).get("topic_taxonomy_seed", {})

    discovered = load_discovered()
    discovered_orgs = discovered.get("orgs", {})

    print(f"[build_org_view] indexing source files…", file=sys.stderr)
    file_index = list(iter_source_files(DATA_ROOT))
    print(f"[build_org_view] {len(file_index)} source files indexed", file=sys.stderr)

    print(f"[build_org_view] scanning for priority vendors…", file=sys.stderr)
    priority_tally = scan_priority_vendors(file_index)
    print(f"[build_org_view] priority vendors with data: {sorted(priority_tally.keys())}", file=sys.stderr)

    # Merge tallies. Priority wins over discovered (same slug should never collide,
    # but just in case).
    all_orgs = {**discovered_orgs, **priority_tally}

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

    print(f"[build_org_view] building per-org files for {len(all_orgs)} orgs…", file=sys.stderr)

    # Ensure orgs/ exists
    orgs_dir = ORGS_DIR
    orgs_dir.mkdir(parents=True, exist_ok=True)

    index_entries = []
    for slug, entry in all_orgs.items():
        mentions_by_date = entry.get("mentions_by_date", {})
        velocity = compute_velocity(mentions_by_date, TODAY)
        velocity_history = compute_velocity_history(mentions_by_date, TODAY, window_days=30)
        topic_mix = build_topic_mix(entry, taxonomy, file_index)
        radar_appearances = attach_radar_org_appearances(slug, radar_jsons)

        per_org = {
            "slug": slug,
            "generated_at": TODAY,
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
            "velocity": velocity,
            "velocity_history": velocity_history,
            "topic_mix": topic_mix,
            "radar_appearances": radar_appearances,
            "hot_events": entry.get("hot_events", []),
            "classification_history": entry.get("classification_history", []),
            "last_classification": entry.get("last_classification"),
            "is_priority": slug in PRIORITY_VENDORS,
        }
        # Write per-org file
        (orgs_dir / f"{slug}.json").write_text(json.dumps(per_org, indent=2, ensure_ascii=False))

        index_entries.append({
            "slug": slug,
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
        "_note": "Rebuilt every run by scripts/build_org_view.py. Consumed by orgs.html.",
    }
    (orgs_dir / "index.json").write_text(json.dumps(index_payload, indent=2, ensure_ascii=False))

    print(
        f"[build_org_view] wrote orgs/index.json + {len(index_entries)} per-org files. "
        f"Priority orgs with data: {sum(1 for e in index_entries if e['is_priority'])}/{len(PRIORITY_VENDORS)}.",
        file=sys.stderr,
    )


if __name__ == "__main__":
    main()
