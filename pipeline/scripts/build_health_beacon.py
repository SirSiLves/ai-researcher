#!/usr/bin/env python3
"""
Daily health beacon — emits `data/daily/{date}-health.json` so silent pipeline
failures are visible at a glance the next morning.

What it captures:
  - per-collector: file existence, size in KB, line count, fallback markers
  - daily synthesis: presence of BRIEFING markers, top-5 section, length
  - radar: topic count, sector count, cluster count, importance populated?
  - sweep logs: present + bytes
  - state files: present + bytes
  - manifests: generated_at (so a stale manifest like the 2026-05-19 incident
    is visible immediately)
  - errors: tallied across all artifacts for anything obvious

The beacon is read-only — it never blocks the pipeline. Run as the last step.

Usage:
  python3 pipeline/scripts/build_health_beacon.py [--as-of YYYY-MM-DD]
"""
import argparse
import datetime
import json
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
DATA = REPO / 'data'
STATE = REPO / 'pipeline' / 'state'

COLLECTORS = ['news', 'papers', 'blogs', 'jobs', 'linkedin', 'github', 'hackernews']
SWEEPS = ['vendor_candidates', 'keyword_candidates', 'github_candidates']
STATE_FILES = [
    'sources.json', 'discovered_orgs.json', 'discovered_keywords.json',
    'github_stars.json', 'topic_keywords.json',
    'vendor_changes.json', 'keyword_changes.json', 'github_changes.json',
]
MANIFESTS = ['radar/index.json', 'reports/index.json', 'orgs/index.json']


def file_stats(path: Path) -> dict:
    if not path.exists():
        return {'exists': False, 'bytes': 0, 'lines': 0}
    try:
        text = path.read_text(encoding='utf-8', errors='replace')
    except OSError:
        return {'exists': True, 'bytes': path.stat().st_size, 'lines': 0, 'unreadable': True}
    return {
        'exists': True,
        'bytes': path.stat().st_size,
        'kb': round(path.stat().st_size / 1024, 1),
        'lines': text.count('\n') + (0 if text.endswith('\n') else 1),
    }


def scan_collector(name: str, yyyy: str, mm: str, today: str) -> dict:
    p = DATA / name / yyyy / mm / f'{today}.md'
    s = file_stats(p)
    s['path'] = str(p.relative_to(DATA))
    if not s['exists']:
        s['status'] = 'missing'
        return s
    # Light heuristics for collector health
    try:
        text = p.read_text(encoding='utf-8', errors='replace')
    except OSError:
        text = ''
    s['headings'] = text.count('\n## ')
    s['list_items'] = text.count('\n- ')
    s['links'] = text.count('](')
    # Common "the collector ran but found nothing" markers
    s['has_stub_marker'] = any(m in text.lower() for m in [
        'no items collected', 'collector unavailable', 'no chrome', 'no fresh items'
    ])
    # Status verdict
    if s['kb'] < 1:
        s['status'] = 'thin'
    elif s['has_stub_marker']:
        s['status'] = 'stub'
    elif s['list_items'] < 3 and name in ('news', 'papers', 'blogs'):
        s['status'] = 'low-content'
    else:
        s['status'] = 'ok'
    return s


def scan_radar(yyyy: str, mm: str, today: str) -> dict:
    out = {}
    j = DATA / 'radar' / yyyy / mm / f'{today}.json'
    m = DATA / 'radar' / yyyy / mm / f'{today}.md'
    out['json'] = file_stats(j)
    out['md'] = file_stats(m)
    if not j.exists():
        out['status'] = 'missing'
        return out
    try:
        data = json.loads(j.read_text(encoding='utf-8'))
    except Exception as e:
        out['status'] = 'malformed'
        out['error'] = str(e)
        return out
    topics = data.get('topics', [])
    out['topic_count'] = len(topics)
    out['sector_count'] = len(data.get('sectors', []))
    out['cluster_count'] = len(data.get('topic_clusters', []))
    out['stage_movements'] = len(data.get('stage_movements', []))
    out['importance_populated'] = all(
        'importance' in t and t.get('importance') is not None
        for t in topics
    )
    out['mean_importance'] = (
        round(sum(t.get('importance', 0) for t in topics) / max(1, len(topics)), 1)
    )
    out['max_importance'] = round(max((t.get('importance', 0) for t in topics), default=0), 1)
    # Stage counts
    from collections import Counter
    stages = Counter(t.get('stage') for t in topics)
    out['stages'] = dict(stages)
    out['status'] = 'ok'
    if not topics:
        out['status'] = 'empty'
    elif not out['importance_populated']:
        out['status'] = 'missing-importance'
    return out


def scan_manifest(rel_path: str, today: str) -> dict:
    p = DATA / rel_path
    s = file_stats(p)
    s['path'] = rel_path
    if not p.exists():
        s['status'] = 'missing'
        return s
    try:
        d = json.loads(p.read_text(encoding='utf-8'))
    except Exception as e:
        s['status'] = 'malformed'
        s['error'] = str(e)
        return s
    ga = d.get('generated_at', None)
    s['generated_at'] = ga
    if ga and ga < today:
        s['status'] = 'stale'
        s['stale_by_days'] = (
            datetime.date.fromisoformat(today)
            - datetime.date.fromisoformat(ga)
        ).days
    else:
        s['status'] = 'ok'
    # Manifest-specific count
    if 'entries' in d and isinstance(d['entries'], list):
        s['entry_count'] = len(d['entries'])
    return s


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--as-of', help='YYYY-MM-DD, defaults to today')
    ap.add_argument('--print', action='store_true', help='Print summary to stderr')
    args = ap.parse_args()

    today = args.as_of or datetime.date.today().isoformat()
    yyyy, mm = today[:4], today[5:7]

    beacon = {
        'date': today,
        'generated_at': datetime.datetime.now().isoformat(timespec='seconds'),
        'collectors': {},
        'daily': {},
        'radar': {},
        'sweeps': {},
        'state_files': {},
        'manifests': {},
        'alerts': [],
    }

    # Collectors
    for c in COLLECTORS:
        beacon['collectors'][c] = scan_collector(c, yyyy, mm, today)
        if beacon['collectors'][c]['status'] not in ('ok',):
            beacon['alerts'].append({
                'severity': 'warn' if beacon['collectors'][c]['status'] == 'thin' else 'info',
                'where': f'collectors.{c}',
                'message': f'{c} collector status: {beacon["collectors"][c]["status"]}',
            })

    # Daily synthesis
    dp = DATA / 'daily' / yyyy / mm / f'{today}.md'
    beacon['daily'] = file_stats(dp)
    if dp.exists():
        text = dp.read_text(encoding='utf-8', errors='replace')
        beacon['daily']['has_briefing'] = '<!-- BRIEFING_START -->' in text and '<!-- BRIEFING_END -->' in text
        beacon['daily']['has_top5'] = 'Top-5' in text or 'top-5' in text
        beacon['daily']['status'] = (
            'ok' if beacon['daily']['has_briefing'] and beacon['daily']['has_top5']
            else 'missing-sections'
        )
    else:
        beacon['daily']['status'] = 'missing'
        beacon['alerts'].append({
            'severity': 'error',
            'where': 'daily',
            'message': f'daily/{yyyy}/{mm}/{today}.md missing',
        })

    # Radar
    beacon['radar'] = scan_radar(yyyy, mm, today)
    if beacon['radar'].get('status') not in ('ok',):
        beacon['alerts'].append({
            'severity': 'error',
            'where': 'radar',
            'message': f'radar status: {beacon["radar"]["status"]}',
        })

    # Sweep logs
    for s in SWEEPS:
        p = DATA / s / yyyy / mm / f'{today}.md'
        beacon['sweeps'][s] = file_stats(p)
        if not p.exists():
            beacon['sweeps'][s]['status'] = 'missing'
            beacon['alerts'].append({
                'severity': 'warn',
                'where': f'sweeps.{s}',
                'message': f'{s} log missing',
            })

    # State files
    for f in STATE_FILES:
        beacon['state_files'][f] = file_stats(STATE / f)
        if not (STATE / f).exists():
            beacon['alerts'].append({
                'severity': 'error',
                'where': f'state_files.{f}',
                'message': f'state file {f} missing',
            })

    # Manifests
    for m in MANIFESTS:
        beacon['manifests'][m] = scan_manifest(m, today)
        if beacon['manifests'][m].get('status') == 'stale':
            beacon['alerts'].append({
                'severity': 'warn',
                'where': f'manifests.{m}',
                'message': f'{m} is {beacon["manifests"][m]["stale_by_days"]}d stale',
            })

    # Aggregate verdict
    counts = {}
    for a in beacon['alerts']:
        counts[a['severity']] = counts.get(a['severity'], 0) + 1
    beacon['alert_counts'] = counts
    beacon['overall_status'] = (
        'red' if counts.get('error', 0) > 0
        else 'yellow' if counts.get('warn', 0) > 0
        else 'green'
    )

    # Write
    out_path = DATA / 'daily' / yyyy / mm / f'{today}-health.json'
    out_path.write_text(json.dumps(beacon, indent=2), encoding='utf-8')

    # Console summary
    sys.stderr.write(f'[health] {today}: {beacon["overall_status"].upper()} '
                     f'({len(beacon["alerts"])} alert(s)). Wrote {out_path.relative_to(REPO)}\n')
    if args.print or beacon['alerts']:
        for a in beacon['alerts']:
            sys.stderr.write(f'  [{a["severity"]}] {a["where"]}: {a["message"]}\n')


if __name__ == '__main__':
    main()
