#!/usr/bin/env python3
"""
Compute per-topic importance from raw source file presence.

Importance is the answer to: "how many distinct days has each topic shown up
in the underlying source files (daily/news/papers/blogs/linkedin/github/hn/jobs),
across how many distinct source types?"

This is independent of the radar agent's decision to create or not create a
topic on a given day — so a topic the radar was slow to recognize still gets
credit for its real source-file presence.

Inputs:
  - pipeline/state/topic_keywords.json    {topic_id: {keywords: [str], ...}}
  - data/<source_type>/YYYY/MM/*.md       last 30 days

Output:
  - JSON to stdout: {topic_id: {days_in_sources, source_types_in_sources,
                                window_days, computed_at}}
  - Also writes:    data/radar/.importance_cache/{YYYY-MM-DD}.json

Usage:
  python3 pipeline/scripts/compute_topic_importance.py [--as-of YYYY-MM-DD]
"""
import argparse
import datetime
import json
import os
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
DATA = REPO / 'data'
STATE = REPO / 'pipeline' / 'state'

SOURCE_TYPES = ['daily', 'news', 'papers', 'blogs', 'linkedin', 'github', 'hackernews', 'jobs']
WINDOW_DAYS = 30


def iter_source_files(as_of: datetime.date):
    """Yield (date, source_type, content_lower) for every file in the 30d window."""
    for src in SOURCE_TYPES:
        root = DATA / src
        if not root.exists():
            continue
        for path in sorted(root.rglob('*.md')):
            try:
                file_date = datetime.date.fromisoformat(path.stem)
            except ValueError:
                continue
            delta = (as_of - file_date).days
            if delta < 0 or delta >= WINDOW_DAYS:
                continue
            try:
                yield (path.stem, src, path.read_text(encoding='utf-8', errors='replace').lower())
            except OSError:
                continue


def build_pattern(keywords):
    """
    Build a single regex matching any of the keywords.

    Keywords that are short or contain only letters/digits (e.g. 'rsi', 'aims',
    'mcp', 'ubs', 'ap2') get **word-boundary** matching — they only match when
    surrounded by non-alphanumeric characters. Without this, 'rsi' matches
    "ve**rsi**on" / "unive**rsi**tät" / "ove**rsi**ght", which over-inflated
    automated-ai-research to a false rank-1 importance score (97 matches in
    30d of source files, 85 of them false positives).

    Multi-word phrases (containing spaces, hyphens, dots) use substring
    matching since they're long enough to be safe.
    """
    parts = []
    for kw in keywords:
        kw = kw.strip().lower()
        if len(kw) < 3:
            continue
        # Escape regex metachars but allow space-as-flexible-whitespace.
        escaped = re.escape(kw).replace(r'\ ', r'\s+')
        # Decide: word-boundary or substring?
        # Word-boundary if the keyword is "compact": no spaces, no hyphens,
        # no dots — i.e. a single token that's small enough to risk
        # collisions inside larger words.
        is_compact_token = not any(c in kw for c in ' -./')
        if is_compact_token:
            # (?<![a-z0-9]) ... (?![a-z0-9]) — works around \b being too
            # permissive with digits in tokens like 'o3', 'k2.5'.
            escaped = r'(?<![a-z0-9])' + escaped + r'(?![a-z0-9])'
        parts.append(escaped)
    if not parts:
        return None
    return re.compile('(?:' + '|'.join(parts) + ')', re.IGNORECASE)


def compute(as_of: datetime.date):
    kw_path = STATE / 'topic_keywords.json'
    if not kw_path.exists():
        sys.stderr.write(f'ERROR: {kw_path} not found. Run the seeder first.\n')
        sys.exit(1)
    kw_data = json.loads(kw_path.read_text(encoding='utf-8'))
    topics = kw_data.get('topics', {})

    # Pre-compile patterns
    patterns = {}
    for tid, t in topics.items():
        pat = build_pattern(t.get('keywords', []))
        if pat is not None:
            patterns[tid] = pat

    # One pass over source files; per topic accumulate (days, source_types)
    days_set = {tid: set() for tid in patterns}
    src_set = {tid: set() for tid in patterns}

    file_count = 0
    for date_str, src_type, content in iter_source_files(as_of):
        file_count += 1
        for tid, pat in patterns.items():
            if pat.search(content):
                days_set[tid].add(date_str)
                src_set[tid].add(src_type)

    result = {}
    for tid in patterns:
        result[tid] = {
            'days_in_sources': len(days_set[tid]),
            'source_types_in_sources': len(src_set[tid]),
            'window_days': WINDOW_DAYS,
            'computed_at': as_of.isoformat(),
        }

    # Cache for the radar skill to read. Stored OUTSIDE data/radar/ because
    # scripts/build_org_view.py and scripts/rebuild_radar_manifest.py both
    # rglob('*.json') under data/radar/ and would mis-interpret this file as
    # a daily radar snapshot.
    cache_dir = DATA / '.cache' / 'importance'
    cache_dir.mkdir(parents=True, exist_ok=True)
    cache_path = cache_dir / f'{as_of.isoformat()}.json'
    cache_path.write_text(json.dumps({
        '_computed_at': as_of.isoformat(),
        '_window_days': WINDOW_DAYS,
        '_files_scanned': file_count,
        '_topic_count': len(result),
        'topics': result,
    }, indent=2), encoding='utf-8')

    return result, file_count, cache_path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--as-of', help='YYYY-MM-DD, defaults to today')
    ap.add_argument('--quiet', action='store_true')
    args = ap.parse_args()

    if args.as_of:
        as_of = datetime.date.fromisoformat(args.as_of)
    else:
        as_of = datetime.date.today()

    result, file_count, cache_path = compute(as_of)

    if not args.quiet:
        sys.stderr.write(f'Scanned {file_count} source files (window {WINDOW_DAYS}d as-of {as_of}).\n')
        sys.stderr.write(f'Computed importance for {len(result)} topics.\n')
        sys.stderr.write(f'Cache: {cache_path}\n')
    # Stdout: JSON result
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
