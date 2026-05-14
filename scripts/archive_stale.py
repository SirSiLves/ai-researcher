#!/usr/bin/env python3
"""
archive_stale.py — moves long-tail entries out of the live tally files into
parallel archive files. Reduces working-file size; preserves data.

Two scopes, both opt-in via flags:

  --orgs        Move discovered_orgs.json entries with low lifetime mentions
                AND long silence into discovered_orgs_archive.json.
  --keywords    Move discovered_keywords.json entries judged 'boilerplate' AND
                whose verdict is past TTL into discovered_keywords_archive.json.

Thresholds live in sources.json under archive_config (added below).

Reverse path: if a slug/phrase resurfaces in a later sweep, the sweep should
recognize the archive entry and restore it (TODO — not currently wired). For
now, archived entries stay archived and reappear as fresh discoveries if
mentioned again. This is acceptable because the archive file IS still
available for inspection.

Idempotent: re-running with no candidates is a no-op.

Usage:
  python3 scripts/archive_stale.py --orgs
  python3 scripts/archive_stale.py --keywords
  python3 scripts/archive_stale.py --orgs --keywords    # both
  python3 scripts/archive_stale.py --orgs --dry-run     # preview
"""
import argparse
import json
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TODAY = date.today().isoformat()


def load_archive_config(sources):
    """Pull thresholds from sources.json. Falls back to safe defaults."""
    cfg = sources.get("archive_config", {})
    return {
        "orgs": {
            "max_total_mentions": cfg.get("orgs", {}).get("max_total_mentions", 3),
            "min_silence_days":   cfg.get("orgs", {}).get("min_silence_days", 60),
        },
        "keywords": {
            "verdict_ttl_days": cfg.get("keywords", {}).get("verdict_ttl_days", 30),
            "min_silence_days": cfg.get("keywords", {}).get("min_silence_days", 30),
        },
    }


def archive_orgs(dry_run=False):
    src_path = ROOT / "discovered_orgs.json"
    arc_path = ROOT / "discovered_orgs_archive.json"
    sources = json.loads((ROOT / "sources.json").read_text())
    thresholds = load_archive_config(sources)["orgs"]

    data = json.loads(src_path.read_text())
    orgs = data.get("orgs", {})
    today_d = date.fromisoformat(TODAY)

    candidates = []
    for slug, entry in orgs.items():
        tm = entry.get("total_mentions", 0)
        if tm > thresholds["max_total_mentions"]:
            continue
        last_seen = entry.get("last_seen", "9999-12-31")
        try:
            silence = (today_d - date.fromisoformat(last_seen)).days
        except ValueError:
            silence = -1
        if silence < thresholds["min_silence_days"]:
            continue
        # Sacred: never archive priority vendors (they're scanned separately
        # by build_org_view; archiving would be visually invisible to the
        # firm view but still wrong in principle).
        if entry.get("coverage") in {"priority", "enterprise", "deep_watch"}:
            continue
        candidates.append((slug, tm, last_seen, silence, entry))

    if not candidates:
        print(f"[archive_stale] orgs: no candidates "
              f"(threshold: <={thresholds['max_total_mentions']} mentions AND "
              f">={thresholds['min_silence_days']}d silent)")
        return

    print(f"[archive_stale] orgs: {len(candidates)} candidates "
          f"(threshold: <={thresholds['max_total_mentions']} mentions AND "
          f">={thresholds['min_silence_days']}d silent):")
    for slug, tm, last_seen, silence, _ in candidates[:10]:
        print(f"  - {slug}: {tm} mentions, last seen {last_seen} ({silence}d ago)")
    if len(candidates) > 10:
        print(f"  ... +{len(candidates) - 10} more")

    if dry_run:
        print("[archive_stale] orgs: dry-run, no changes written")
        return

    # Load or initialize archive
    if arc_path.exists():
        archive = json.loads(arc_path.read_text())
    else:
        archive = {
            "_purpose": "Long-tail orgs moved out of discovered_orgs.json. Each carries a _archived_on stamp. If the slug resurfaces with new mentions, the next vendor sweep will create a fresh entry in discovered_orgs.json — no merging is attempted (history here is read-only).",
            "orgs": {},
        }
    archive_orgs_dict = archive.setdefault("orgs", {})

    for slug, tm, last_seen, silence, entry in candidates:
        archived_entry = dict(entry)
        archived_entry["_archived_on"] = TODAY
        archived_entry["_archived_reason"] = f"{tm} lifetime mentions, silent {silence}d (over thresholds)"
        archive_orgs_dict[slug] = archived_entry
        del orgs[slug]

    archive["last_archived"] = TODAY
    arc_path.write_text(json.dumps(archive, indent=2))
    src_path.write_text(json.dumps(data, indent=2))
    print(f"[archive_stale] orgs: archived {len(candidates)} entries → {arc_path.name} "
          f"(active tally: {len(orgs)} orgs, archive: {len(archive_orgs_dict)} orgs)")


def archive_keywords(dry_run=False):
    src_path = ROOT / "discovered_keywords.json"
    arc_path = ROOT / "discovered_keywords_archive.json"
    sources = json.loads((ROOT / "sources.json").read_text())
    thresholds = load_archive_config(sources)["keywords"]

    data = json.loads(src_path.read_text())
    keywords = data.get("keywords", {})
    today_d = date.fromisoformat(TODAY)

    candidates = []
    for phrase, entry in keywords.items():
        # Only archive boilerplate-judged + past TTL + silent
        if entry.get("boilerplate_decision") != "boilerplate":
            continue
        decided_at = entry.get("boilerplate_decided_at")
        if not decided_at:
            continue
        try:
            ttl_age = (today_d - date.fromisoformat(decided_at)).days
        except ValueError:
            continue
        if ttl_age < thresholds["verdict_ttl_days"]:
            continue
        last_seen = entry.get("last_seen", "9999-12-31")
        try:
            silence = (today_d - date.fromisoformat(last_seen)).days
        except ValueError:
            silence = -1
        if silence < thresholds["min_silence_days"]:
            continue
        candidates.append((phrase, ttl_age, silence, entry))

    if not candidates:
        print(f"[archive_stale] keywords: no candidates "
              f"(threshold: boilerplate verdict >={thresholds['verdict_ttl_days']}d old "
              f"AND >={thresholds['min_silence_days']}d silent)")
        return

    print(f"[archive_stale] keywords: {len(candidates)} candidates:")
    for phrase, ttl_age, silence, _ in candidates[:10]:
        print(f"  - \"{phrase}\": verdict {ttl_age}d old, silent {silence}d")
    if len(candidates) > 10:
        print(f"  ... +{len(candidates) - 10} more")

    if dry_run:
        print("[archive_stale] keywords: dry-run, no changes written")
        return

    if arc_path.exists():
        archive = json.loads(arc_path.read_text())
    else:
        archive = {
            "_purpose": "Boilerplate-judged keywords past their verdict TTL, moved out of discovered_keywords.json to keep the active tally focused on signal. Each carries a _archived_on stamp. The next sweep run that mines a phrase that's in this archive will create a fresh entry in discovered_keywords.json — and the agent will judge it again. If the new judgment overturns boilerplate, the new entry stays active.",
            "keywords": {},
        }
    archive_kw_dict = archive.setdefault("keywords", {})

    for phrase, ttl_age, silence, entry in candidates:
        archived_entry = dict(entry)
        archived_entry["_archived_on"] = TODAY
        archived_entry["_archived_reason"] = f"boilerplate verdict {ttl_age}d old, silent {silence}d"
        archive_kw_dict[phrase] = archived_entry
        del keywords[phrase]

    archive["last_archived"] = TODAY
    arc_path.write_text(json.dumps(archive, indent=2))
    src_path.write_text(json.dumps(data, indent=2))
    print(f"[archive_stale] keywords: archived {len(candidates)} entries → {arc_path.name} "
          f"(active tally: {len(keywords)} phrases, archive: {len(archive_kw_dict)} phrases)")


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--orgs", action="store_true", help="Archive stale long-tail orgs")
    p.add_argument("--keywords", action="store_true", help="Archive boilerplate-tagged keywords past TTL")
    p.add_argument("--dry-run", action="store_true", help="Preview without writing")
    args = p.parse_args()
    if not (args.orgs or args.keywords):
        p.print_help()
        sys.exit(1)
    if args.orgs:
        archive_orgs(dry_run=args.dry_run)
    if args.keywords:
        archive_keywords(dry_run=args.dry_run)


if __name__ == "__main__":
    main()
