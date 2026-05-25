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

# Stage anchors for run-timing inference. Each entry: (stage_name, path_template).
# Stage end-time is taken as the artifact's mtime, when it falls on the same date
# as the run. Order is the orchestrator's CRON_PROMPT.md flow. Missing artifacts
# are reported as such — never blocks anything.
#
# Path templates may use {yyyy} / {mm} / {today} / {week_id}; resolution happens
# inside derive_run_timing().
STAGE_ANCHORS = [
    ('jobs',                'jobs/{yyyy}/{mm}/{today}.md'),
    ('papers',              'papers/{yyyy}/{mm}/{today}.md'),
    ('hackernews',          'hackernews/{yyyy}/{mm}/{today}.md'),
    ('blogs',               'blogs/{yyyy}/{mm}/{today}.md'),
    ('news',                'news/{yyyy}/{mm}/{today}.md'),
    ('github',              'github/{yyyy}/{mm}/{today}.md'),
    ('linkedin',            'linkedin/{yyyy}/{mm}/{today}.md'),
    ('daily+briefing',      'daily/{yyyy}/{mm}/{today}.md'),
    ('radar_importance',    '.cache/importance/{today}.json'),
    ('radar_json',          'radar/{yyyy}/{mm}/{today}.json'),
    ('radar_md',            'radar/{yyyy}/{mm}/{today}.md'),
    ('vendor_sweep',        'vendor_candidates/{yyyy}/{mm}/{today}.md'),
    ('orgs_view',           'orgs/index.json'),
    ('keyword_sweep',       'keyword_candidates/{yyyy}/{mm}/{today}.md'),
    ('github_sweep',        'github_candidates/{yyyy}/{mm}/{today}.md'),
    ('reports_manifest',    'reports/index.json'),
    ('gap_keywords',        'radar/gap_keywords.json'),
    ('index_md',            'index.md'),
    ('weekly+briefing',     'weekly/{yyyy}/{week_id}.md'),
]

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


def derive_run_timing(today: str) -> dict:
    """Reconstruct per-step durations from filesystem mtimes.

    Lossy by design — mtime ≠ true end (an agent may write a file 30s after its
    real work finished, and any post-processing won't show up here). Anchors that
    fall on a different date than `today` are dropped (probably stale from a
    prior run / a partial replay). Stages are reported in mtime order — the
    orchestrator's nominal order in CRON_PROMPT.md isn't enforced because
    user-driven replays don't necessarily follow it.
    """
    today_date = datetime.date.fromisoformat(today)
    yyyy = today[:4]
    mm = today[5:7]
    iso = today_date.isocalendar()
    week_id = f'{iso.year:04d}-W{iso.week:02d}'

    rows = []
    for stage, tpl in STAGE_ANCHORS:
        rel = tpl.format(yyyy=yyyy, mm=mm, today=today, week_id=week_id)
        p = DATA / rel
        if not p.exists():
            rows.append({'stage': stage, 'path': rel, 'status': 'missing'})
            continue
        mtime = datetime.datetime.fromtimestamp(p.stat().st_mtime)
        # Drop anchors that didn't get touched today. Two cases, treated
        # differently because their implications differ:
        #   - mtime BEFORE today_date → the step definitely didn't run on
        #     `today_date`; the anchor predates it. Status: 'stale'.
        #   - mtime AFTER today_date → the anchor was overwritten by a later
        #     run. We can't tell whether the step ran on `today_date` or not;
        #     the original mtime is gone. Status: 'overwritten'. Only relevant
        #     when the beacon is replayed for a historical date — for "today"
        #     this branch is unreachable.
        if mtime.date() != today_date:
            status = 'stale' if mtime.date() < today_date else 'overwritten'
            rows.append({
                'stage': stage,
                'path': rel,
                'status': status,
                'mtime': mtime.isoformat(timespec='seconds'),
            })
            continue
        rows.append({
            'stage': stage,
            'path': rel,
            'status': 'ok',
            'mtime': mtime.isoformat(timespec='seconds'),
            'mtime_epoch': int(mtime.timestamp()),
        })

    ok = [r for r in rows if r['status'] == 'ok']
    ok.sort(key=lambda r: r['mtime_epoch'])

    # Drop anchors that don't belong to today's contiguous run. Same-day mtime
    # isn't enough: a backfilled `radar/gap_keywords.json` from earlier in the
    # morning would otherwise anchor the first stage hours before the real run
    # started. Define the run as the densest cluster of anchors — find the
    # largest single gap between consecutive anchors; if that gap is larger
    # than the threshold below, split there and keep the side containing the
    # most stages. Repeat until all remaining gaps are within the threshold.
    #
    # 75min was picked from observation: real evening runs have shown
    # individual stage gaps up to 60min (keyword-sweep stalls on 2026-05-21),
    # while morning backfills sit hours away from the evening cluster.
    GAP_THRESHOLD = 75 * 60
    while len(ok) >= 2:
        gaps = [
            (i, ok[i]['mtime_epoch'] - ok[i - 1]['mtime_epoch'])
            for i in range(1, len(ok))
        ]
        worst_i, worst_gap = max(gaps, key=lambda g: g[1])
        if worst_gap <= GAP_THRESHOLD:
            break
        left = ok[:worst_i]
        right = ok[worst_i:]
        # Keep the side with more anchors; tie → keep the later one (current run
        # is usually the more recent cluster).
        if len(left) > len(right):
            dropped, ok = right, left
        else:
            dropped, ok = left, right
        for d in dropped:
            d['status'] = 'out-of-run'
            d.pop('sec_since_prev', None)
        # Re-find these in `rows` and update their status (they're the same
        # dicts, so the mutation already propagated).

    # Walk in chronological order, computing each stage's duration from the
    # previous stage's mtime. The first stage has no prior anchor → duration is
    # reported as `null` rather than guessed. NOTE: `sec_since_prev` is wall
    # clock — when stages run in parallel (vendor_sweep overlaps radar), the
    # field underestimates the slower stage's actual work.
    prev_epoch = None
    for r in ok:
        if prev_epoch is None:
            r['sec_since_prev'] = None
        else:
            r['sec_since_prev'] = r['mtime_epoch'] - prev_epoch
        prev_epoch = r['mtime_epoch']

    summary = {
        'stages_observed': len(ok),
        'stages_missing': sum(1 for r in rows if r['status'] == 'missing'),
        'stages_stale': sum(1 for r in rows if r['status'] == 'stale'),
        'stages_out_of_run': sum(1 for r in rows if r['status'] == 'out-of-run'),
        'stages_overwritten': sum(1 for r in rows if r['status'] == 'overwritten'),
    }
    if ok:
        first = ok[0]
        last = ok[-1]
        summary['first_stage'] = first['stage']
        summary['first_mtime'] = first['mtime']
        summary['last_stage'] = last['stage']
        summary['last_mtime'] = last['mtime']
        summary['total_sec'] = last['mtime_epoch'] - first['mtime_epoch']
        # Top-3 slowest stages by sec_since_prev (skip the first stage which
        # has no prior anchor).
        ranked = sorted(
            (r for r in ok if r.get('sec_since_prev') is not None),
            key=lambda r: r['sec_since_prev'],
            reverse=True,
        )
        summary['slowest'] = [
            {'stage': r['stage'], 'sec': r['sec_since_prev']}
            for r in ranked[:3]
        ]
        # If intermediate anchors got overwritten (later run clobbered them),
        # the durations after each gap silently roll into the next visible
        # stage and inflate it. Flag the inflation risk in the summary.
        if summary['stages_overwritten'] > 0:
            summary['caveat'] = (
                'Some anchors were overwritten by a later run; durations of '
                'stages following each gap may be inflated.'
            )

    # Strip the epoch field from every row — it's an implementation detail.
    for r in rows:
        r.pop('mtime_epoch', None)

    # Re-order rows so the JSON reads chronologically. `ok` rows come first in
    # mtime order; missing/stale/out-of-run rows go at the end in their original
    # declaration order, so downstream readers don't need to re-sort.
    ok_paths = {id(r) for r in ok}
    other = [r for r in rows if id(r) not in ok_paths]
    rows = ok + other

    return {'summary': summary, 'stages': rows}


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
        'timing': {},
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

    # Run timing (mtime-inferred). Read-only; reports per-stage durations and a
    # slowest-3 summary so the morning-after question "why did it take that long
    # last night?" has a one-file answer.
    beacon['timing'] = derive_run_timing(today)
    # An anchor that's "out-of-run" (mtime hours away from the run cluster),
    # "stale" (mtime predates the target date), or "missing" means the
    # orchestrator skipped the step. Surface each as its own alert so the
    # morning report names the exact stage.
    #
    # "overwritten" anchors (mtime is after the target date) are intentionally
    # NOT alerted: the original mtime has been clobbered by a later run, so we
    # genuinely can't tell whether the step ran on the target date. This only
    # applies when the beacon is replayed for a historical date.
    for s in beacon['timing']['stages']:
        if s['status'] in ('out-of-run', 'stale'):
            beacon['alerts'].append({
                'severity': 'warn',
                'where': f"timing.{s['stage']}",
                'message': (
                    f"stage '{s['stage']}' wasn't touched today — anchor "
                    f"{s['path']} last modified {s.get('mtime', '?')}"
                ),
            })
        elif s['status'] == 'missing':
            beacon['alerts'].append({
                'severity': 'warn',
                'where': f"timing.{s['stage']}",
                'message': (
                    f"stage '{s['stage']}' anchor missing — "
                    f"{s['path']} doesn't exist"
                ),
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
    t = beacon['timing']['summary']
    if t.get('total_sec') is not None:
        mins = t['total_sec'] // 60
        secs = t['total_sec'] % 60
        slowest_str = ', '.join(
            f"{s['stage']}={s['sec']}s" for s in t.get('slowest', [])
        )
        sys.stderr.write(
            f"[timing] {mins}m{secs:02d}s total ({t['stages_observed']} stages). "
            f"slowest: {slowest_str}\n"
        )
    if args.print or beacon['alerts']:
        for a in beacon['alerts']:
            sys.stderr.write(f'  [{a["severity"]}] {a["where"]}: {a["message"]}\n')


if __name__ == '__main__':
    main()
