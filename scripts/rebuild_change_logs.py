#!/usr/bin/env python3
"""
rebuild_change_logs.py — derives structured JSON views of the append-only
change logs maintained by ai-vendor-sweep and ai-keyword-sweep.

The log files are the source of truth (atomic appends; crash-safe; git-friendly).
The JSON files derived from them are the structured query layer:

  - vendor_changes.log  →  vendor_changes.json
  - keyword_changes.log →  keyword_changes.json

Each JSON has:
  - generated_at: ISO timestamp of this rebuild
  - total_mutations: count of log lines parsed
  - by_verb: count per verb
  - by_month: count per YYYY-MM
  - active_auto_added: replay-derived set of entries currently live (added,
    not yet expired or removed)
  - expired_auto_added: replay-derived set of TTL-expired entries
  - mutations: full parsed stream, oldest first

The replay logic is forward-only: walk the log in chronological order; each
*-add verb adds to active set; each *-remove verb removes from it; each TTL
expiry detected at rebuild time moves entries from active to expired.

Runs in ~50ms over a year of typical log volume. Hooked into ai-replay §6.9.

Idempotent: re-running rebuilds the JSON files from scratch.
"""
import json
import os
import re
import sys
from collections import defaultdict
from datetime import date, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NOW = datetime.now().astimezone().isoformat(timespec="seconds")
# Prefer TODAY from the env (set by `eval "$(scripts/now.sh)"` in the
# orchestrator); fall back to wall-clock date for standalone runs.
TODAY = os.environ.get("TODAY") or date.today().isoformat()

# Legacy hot-add entries written at or before this exact ISO timestamp were a
# known sweep bug: the verb was emitted but sources.json wasn't actually
# mutated. We keep them in the .log (append-only, never truncated) but suppress
# the per-entry replay in the derived JSON view — only the count survives, so
# the JSON doesn't carry 19 lines of stale noise on every rebuild. New legacy
# hot-add entries (which shouldn't exist if the sweep skill was hardened
# correctly) would still surface, since their timestamp is past this point.
LEGACY_HOT_ADD_CUTOFF_TS = "2026-05-14T13:02:20"

# Log line format examples (variable whitespace tolerated):
#
#   2026-05-14T14:00:00 promote-add    xai     blog_urls=["..."] reason="..."
#   2026-05-14T14:00:00 hot-event-add  ubs     blog_urls=["..."] expires=2026-06-13 reason="..."
#   2026-05-14T13:02:20 hot-add        apple   expires=2026-06-13  reason="..."
#   2026-05-14T20:08:00 expire-remove  glean                                       reason="TTL elapsed"
#   2026-05-14T20:08:00 proven-promote "model context protocol"                    reason="lifetime: ..."
#
# Parsing strategy: tokenize on whitespace but respect quoted strings and
# bracketed JSON-ish payloads. Use a regex chain rather than a full grammar.

TS_RE = re.compile(r"^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:[+-]\d{2}:?\d{2}|Z)?)")
VERB_RE = re.compile(r"^(promote-add|hot-add|hot-event-add|expire-remove|auto-demote|proven-promote|deep-watch-demote|deep-watch-promote|ABORT-INVALID-JSON)$")
EXPIRES_RE = re.compile(r"expires=(\d{4}-\d{2}-\d{2})")
REASON_RE = re.compile(r'reason="([^"]*)"')
BLOG_URLS_RE = re.compile(r'blog_urls=(\[[^\]]*\])')
SLUG_OR_QUOTED_RE = re.compile(r'(?:^|\s)("[^"]+"|[A-Za-z0-9_.-]+)(?=\s|$)')

# For keyword sweep, optional target_section column right after verb:
TARGET_SECTION_RE = re.compile(r"^(news_web_search_queries|radar_topic_taxonomy|hackernews_filter_keywords|linkedin_pulse_queries|priority_vendors|enterprise_vendors|deep_watch_vendors|deep_watch_keywords|vendor_blogs|watched_repos|deep_watch_repos)$")


def parse_line(line):
    """Parse one log line. Returns dict or None if unparseable."""
    line = line.rstrip("\n")
    if not line.strip():
        return None

    ts_match = TS_RE.match(line)
    if not ts_match:
        return None
    ts = ts_match.group(1)
    rest = line[ts_match.end():].strip()

    # First whitespace-delimited token after timestamp is the verb.
    parts = rest.split(None, 1)
    if not parts:
        return None
    verb = parts[0]
    if not VERB_RE.match(verb):
        return None
    after_verb = parts[1] if len(parts) > 1 else ""

    # Optional target_section column (only used by keyword sweep)
    target_section = None
    sub_parts = after_verb.split(None, 1)
    if sub_parts and TARGET_SECTION_RE.match(sub_parts[0]):
        target_section = sub_parts[0]
        after_verb = sub_parts[1] if len(sub_parts) > 1 else ""

    # Next token is the subject (slug for vendors, quoted phrase for keywords)
    subject_match = re.match(r'\s*("[^"]+"|[A-Za-z0-9_.-]+)', after_verb)
    if not subject_match:
        return None
    subject = subject_match.group(1).strip('"')
    payload_raw = after_verb[subject_match.end():]

    expires_match = EXPIRES_RE.search(payload_raw)
    reason_match = REASON_RE.search(payload_raw)
    blog_urls_match = BLOG_URLS_RE.search(payload_raw)

    return {
        "ts": ts,
        "ts_date": ts.split("T")[0],
        "verb": verb,
        "target_section": target_section,
        "subject": subject,
        "expires_on": expires_match.group(1) if expires_match else None,
        "reason": reason_match.group(1) if reason_match else None,
        "blog_urls_raw": blog_urls_match.group(1) if blog_urls_match else None,
    }


# Canonicalize sweep-specific verbs to a single semantic family:
#   ADD verbs:        promote-add, hot-event-add (CANONICAL; written only when sources.json was mutated)
#   LEGACY ADD verbs: hot-add (DEPRECATED — early sweep runs emitted this without
#                              actually applying to sources.json. Treat these as
#                              "log-only" candidates that never reached sources.json,
#                              not as live promotions.)
#   REMOVE verbs:     expire-remove, auto-demote (delete entry outright)
#   PROMOTE-PROVEN:   proven-promote (moves into permanent tier, not a removal)
#   DEEP-WATCH:       deep-watch-demote moves active → deep-watch holding tier;
#                     deep-watch-promote moves deep-watch holding → active.
#                     Neither is a removal — entries persist across the move,
#                     just in a different section of sources.json. The replay
#                     tracks both `active` and `deep_watch_active` sets.
ADD_VERBS_CANONICAL = {"promote-add", "hot-event-add"}
ADD_VERBS_LEGACY = {"hot-add"}  # log-only; do not contribute to active set
ADD_VERBS = ADD_VERBS_CANONICAL | ADD_VERBS_LEGACY
# Only verbs actually emitted by the skills. The previous spec listed
# promote-remove and hot-remove as theoretical possibilities, but no skill
# emits them — removals always go through expire-remove (TTL) or auto-demote
# (silent vendors). Adding them back would require adding the emit path in
# the skill first.
REMOVE_VERBS = {"expire-remove", "auto-demote"}
PROVEN_VERBS = {"proven-promote"}
DEEP_WATCH_DEMOTE_VERBS = {"deep-watch-demote"}
DEEP_WATCH_PROMOTE_VERBS = {"deep-watch-promote"}


def replay(mutations, today_iso):
    """
    Walk parsed mutations in chronological order. Derive active and expired
    sets. Returns (active_list, expired_list, proven_set, legacy_log_only,
    deep_watch_active_list) ordered for stable output.
    """
    today = date.fromisoformat(today_iso)
    # active key: (target_section or 'default', subject)
    active = {}
    deep_watch_active = {}  # entries currently held in deep_watch_* section
    legacy_log_only = []    # legacy hot-add entries: in log but never applied
    expired = []
    proven_set = set()

    for m in mutations:
        key = (m.get("target_section") or "default", m["subject"])
        if m["verb"] in ADD_VERBS_LEGACY:
            # Legacy hot-add: log-only, not actually applied to sources.json.
            # Don't promote to active; collect for separate reporting.
            legacy_log_only.append({
                **m,
                "key": key,
                "classification": "legacy_log_only",
                "_note": "Legacy 'hot-add' verb emitted by pre-2026-05-14 sweep runs without actually applying to sources.json. Confirmed by consistency_check against sources.json. Surfaced for awareness only.",
            })
            continue
        if m["verb"] in ADD_VERBS_CANONICAL:
            active[key] = {
                **m,
                "key": key,
                "tier_lifetime": "auto_added",
            }
        elif m["verb"] in REMOVE_VERBS:
            existing = active.pop(key, None)
            if existing is not None:
                expired.append({
                    **existing,
                    "removed_ts": m["ts"],
                    "removed_verb": m["verb"],
                    "removed_reason": m.get("reason"),
                })
        elif m["verb"] in PROVEN_VERBS:
            proven_set.add(key)
            if key in active:
                active[key]["tier_lifetime"] = "proven"
        elif m["verb"] in DEEP_WATCH_DEMOTE_VERBS:
            existing = active.pop(key, None)
            if existing is not None:
                deep_watch_active[key] = {
                    **existing,
                    "demoted_ts": m["ts"],
                    "demoted_reason": m.get("reason"),
                    "tier_lifetime": "deep_watch",
                }
        elif m["verb"] in DEEP_WATCH_PROMOTE_VERBS:
            existing = deep_watch_active.pop(key, None)
            if existing is not None:
                # Promoted back; drop deep-watch fields, restore as active
                restored = {k: v for k, v in existing.items()
                            if k not in {"demoted_ts", "demoted_reason"}}
                restored["promoted_back_ts"] = m["ts"]
                restored["promoted_back_reason"] = m.get("reason")
                restored["tier_lifetime"] = "auto_added"
                active[key] = restored

    # Apply TTL-based expiry derived from expires_on
    active_filtered = {}
    for key, entry in active.items():
        # PROVEN entries never expire by TTL
        if entry.get("tier_lifetime") == "proven":
            active_filtered[key] = entry
            continue
        exp = entry.get("expires_on")
        if exp is not None:
            try:
                if date.fromisoformat(exp) < today:
                    expired.append({
                        **entry,
                        "removed_ts": None,
                        "removed_verb": "ttl-expired-derived",
                        "removed_reason": f"expires_on={exp} elapsed before {today_iso}",
                    })
                    continue
            except ValueError:
                pass  # bad date, treat as still active
        active_filtered[key] = entry

    # Sort: active by target_section then subject; expired by removed_ts desc
    active_list = sorted(
        active_filtered.values(),
        key=lambda e: (e.get("target_section") or "", e["subject"])
    )
    expired_list = sorted(
        expired,
        key=lambda e: (e.get("removed_ts") or e["ts"]),
        reverse=True,
    )
    deep_watch_list = sorted(
        deep_watch_active.values(),
        key=lambda e: (e.get("target_section") or "", e["subject"])
    )
    return active_list, expired_list, proven_set, legacy_log_only, deep_watch_list


def consistency_check_vendor(active_list, deep_watch_list):
    """Cross-check derived active + deep-watch sets against sources.json _auto_added entries.

    A discrepancy means the log says we promoted X but sources.json doesn't
    have X with `_auto_added: true` (or vice versa). Real cause: a sweep run
    wrote to the log but failed mid-write to sources.json, or wrote to the
    log before deciding not to apply, or two sweeps raced.

    Returns dict with parallel checks for enterprise_vendors and deep_watch_vendors.
    All four discrepancy lists should be empty in a healthy pipeline.
    """
    try:
        sources = json.loads((ROOT / "sources.json").read_text())
    except Exception:
        return None
    nc = sources.get("news_collector", {})
    auto_in_enterprise = {
        slug for slug, entry in nc.get("enterprise_vendors", {}).items()
        if isinstance(entry, dict) and entry.get("_auto_added")
    }
    auto_in_deep_watch = {
        slug for slug, entry in nc.get("deep_watch_vendors", {}).items()
        if isinstance(entry, dict) and entry.get("_auto_added")
    }
    active_subjects = {e["subject"] for e in active_list}
    deep_watch_subjects = {e["subject"] for e in deep_watch_list}
    return {
        "auto_in_sources_count": len(auto_in_enterprise),
        "active_per_log_count": len(active_subjects),
        "log_only_not_in_sources": sorted(active_subjects - auto_in_enterprise),
        "sources_only_not_in_log": sorted(auto_in_enterprise - active_subjects),
        "deep_watch_in_sources_count": len(auto_in_deep_watch),
        "deep_watch_per_log_count": len(deep_watch_subjects),
        "deep_watch_log_only_not_in_sources": sorted(deep_watch_subjects - auto_in_deep_watch),
        "deep_watch_sources_only_not_in_log": sorted(auto_in_deep_watch - deep_watch_subjects),
        "_interpretation": (
            "All four discrepancy lists should be empty. Non-empty *_log_only means the "
            "sweep logged a mutation that didn't get applied to sources.json (failed "
            "mid-write, or two sweeps raced). Non-empty *_sources_only means a "
            "manual edit set _auto_added: true without a corresponding log entry."
        ),
    }


def rebuild_one(log_name, json_name):
    log_path = ROOT / log_name
    json_path = ROOT / json_name
    if not log_path.exists():
        # No log → empty JSON skeleton
        empty = {
            "generated_at": NOW,
            "source_log": log_name,
            "total_mutations": 0,
            "by_verb": {},
            "by_month": {},
            "active_auto_added": [],
            "expired_auto_added": [],
            "proven_entries": [],
            "deep_watch_active": [],
            "mutations": [],
            "_note": f"{log_name} does not exist yet. Nothing to derive.",
        }
        json_path.write_text(json.dumps(empty, indent=2, ensure_ascii=False))
        print(f"[rebuild_change_logs] {log_name} missing → wrote empty {json_name}", file=sys.stderr)
        return

    mutations = []
    skipped = 0
    for raw in log_path.read_text().splitlines():
        parsed = parse_line(raw)
        if parsed is None:
            if raw.strip():
                skipped += 1
            continue
        mutations.append(parsed)

    # Chronological order (log lines are append-only but multiple lines can
    # share a timestamp — preserve file order as the tiebreaker).
    mutations_sorted = sorted(mutations, key=lambda m: m["ts"])
    active, expired, proven_set, legacy_log_only, deep_watch_active = replay(mutations_sorted, TODAY)

    by_verb = defaultdict(int)
    by_month = defaultdict(int)
    for m in mutations_sorted:
        by_verb[m["verb"]] += 1
        ym = m["ts_date"][:7]
        by_month[ym] += 1

    proven_entries = [
        {"target_section": ts or "default", "subject": s}
        for (ts, s) in sorted(proven_set)
    ]

    payload = {
        "generated_at": NOW,
        "source_log": log_name,
        "total_mutations": len(mutations_sorted),
        "skipped_unparseable": skipped,
        "by_verb": dict(sorted(by_verb.items())),
        "by_month": dict(sorted(by_month.items())),
        "active_auto_added": active,
        "expired_auto_added": expired,
        "proven_entries": proven_entries,
        "deep_watch_active": deep_watch_active,
        "legacy_log_only_count": len(legacy_log_only),
        "legacy_log_only_suppressed_count": sum(
            1 for e in legacy_log_only if e["ts"] <= LEGACY_HOT_ADD_CUTOFF_TS
        ),
        "legacy_log_only_cutoff_ts": LEGACY_HOT_ADD_CUTOFF_TS,
        "legacy_log_only": [
            e for e in legacy_log_only if e["ts"] > LEGACY_HOT_ADD_CUTOFF_TS
        ],
        "mutations": mutations_sorted,
        "_note": (
            "Derived view of " + log_name + ". The .log file is the source of truth (append-only, "
            "crash-safe, git-friendly). This JSON is regenerated each run by "
            "scripts/rebuild_change_logs.py and is safe to delete — it'll be rebuilt next run."
        ),
    }

    # Only vendor_changes.log has a corresponding sources.json section to cross-check.
    if log_name == "vendor_changes.log":
        check = consistency_check_vendor(active, deep_watch_active)
        if check is not None:
            payload["consistency_check"] = check
            n_drift = (
                len(check["log_only_not_in_sources"])
                + len(check["sources_only_not_in_log"])
                + len(check["deep_watch_log_only_not_in_sources"])
                + len(check["deep_watch_sources_only_not_in_log"])
            )
            if n_drift:
                print(
                    f"[rebuild_change_logs] ⚠ consistency drift: {n_drift} mismatches between "
                    f"vendor_changes.log replay and sources.json. See "
                    f"vendor_changes.json → consistency_check for details.",
                    file=sys.stderr,
                )

    json_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False))
    print(
        f"[rebuild_change_logs] {log_name}: {len(mutations_sorted)} mutations parsed "
        f"({skipped} skipped), {len(active)} currently active, {len(deep_watch_active)} deep-watch, "
        f"{len(expired)} expired, {len(proven_set)} proven. Wrote {json_name}.",
        file=sys.stderr,
    )


def main():
    rebuild_one("vendor_changes.log", "vendor_changes.json")
    rebuild_one("keyword_changes.log", "keyword_changes.json")
    rebuild_one("github_changes.log", "github_changes.json")


if __name__ == "__main__":
    main()
