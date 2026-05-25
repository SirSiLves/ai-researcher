#!/usr/bin/env python3
"""
Backfill importance fields into historical radar JSON snapshots.

When `compute_topic_importance.py` runs as part of the daily radar pipeline,
the radar agent merges three fields onto each topic:
  - days_in_sources_30d
  - source_types_in_sources_30d
  - importance  (= days × source_types × ln(breadth_30d + 2))

If a radar snapshot was written before that pipeline step existed, those
fields stay null. This script reads the matching importance cache for each
target date and patches the radar JSON in place.

Usage:
  python3 pipeline/scripts/backfill_radar_importance.py 2026-05-17 2026-05-18 ...
  python3 pipeline/scripts/backfill_radar_importance.py --all-missing
"""
import argparse
import datetime
import json
import math
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
DATA = REPO / 'data'


def radar_path(date_str: str) -> Path:
    y, m, _ = date_str.split('-')
    return DATA / 'radar' / y / m / f'{date_str}.json'


def cache_path(date_str: str) -> Path:
    return DATA / '.cache' / 'importance' / f'{date_str}.json'


def patch_one(date_str: str) -> tuple[int, int]:
    """Return (patched_count, total_topics)."""
    rp = radar_path(date_str)
    cp = cache_path(date_str)
    if not rp.exists():
        sys.stderr.write(f'  skip {date_str}: radar file missing ({rp})\n')
        return (0, 0)
    if not cp.exists():
        sys.stderr.write(f'  skip {date_str}: importance cache missing ({cp})\n')
        return (0, 0)

    radar = json.loads(rp.read_text(encoding='utf-8'))
    cache = json.loads(cp.read_text(encoding='utf-8'))
    by_id = cache.get('topics', {})

    patched = 0
    for t in radar.get('topics', []):
        tid = t.get('id')
        entry = by_id.get(tid)
        if not entry:
            continue
        days = entry.get('days_in_sources', 0) or 0
        srcs = entry.get('source_types_in_sources', 0) or 0
        breadth = t.get('breadth_30d') or 0
        try:
            breadth_int = int(breadth)
        except (TypeError, ValueError):
            breadth_int = 0
        importance = round(days * srcs * math.log(breadth_int + 2), 2)
        t['days_in_sources_30d'] = days
        t['source_types_in_sources_30d'] = srcs
        t['importance'] = importance
        patched += 1

    rp.write_text(json.dumps(radar, indent=2, ensure_ascii=False), encoding='utf-8')
    return (patched, len(radar.get('topics', [])))


def find_missing() -> list[str]:
    """Find every radar JSON where at least one topic has importance == null."""
    out = []
    for path in sorted((DATA / 'radar').rglob('*.json')):
        if path.name == 'index.json':
            continue
        try:
            d = json.loads(path.read_text(encoding='utf-8'))
        except json.JSONDecodeError:
            continue
        topics = d.get('topics', [])
        if topics and any(t.get('importance') in (None, 0) for t in topics):
            out.append(path.stem)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('dates', nargs='*', help='YYYY-MM-DD dates to patch')
    ap.add_argument('--all-missing', action='store_true',
                    help='Find every radar JSON with null importance and patch it')
    args = ap.parse_args()

    if args.all_missing:
        dates = find_missing()
        sys.stderr.write(f'Found {len(dates)} radar snapshots with null importance.\n')
    else:
        dates = args.dates

    if not dates:
        sys.stderr.write('No dates to patch.\n')
        sys.exit(1)

    total_patched = 0
    for d in dates:
        try:
            datetime.date.fromisoformat(d)
        except ValueError:
            sys.stderr.write(f'  skip {d}: not a valid YYYY-MM-DD\n')
            continue
        patched, total = patch_one(d)
        sys.stderr.write(f'  {d}: patched {patched}/{total} topics\n')
        total_patched += patched

    sys.stderr.write(f'Done. Patched {total_patched} topic entries across {len(dates)} files.\n')


if __name__ == '__main__':
    main()
