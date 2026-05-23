#!/usr/bin/env python3
"""
Backfill radar continuity across topic-recreation gaps.

THE BUG THIS FIXES:
  The radar's EMA + sustained_days carry-forward only looks at *yesterday's*
  JSON. If a topic existed on day N, was absent on day N+1, and reappeared on
  day N+2, the radar treats it as brand new on N+2 — score_fast / score_slow
  reset to raw_today, sustained_days resets to 1, first_seen advances. Any
  topic that ever had a one-day gap loses its full history.

  Concrete example pre-fix: ai-coding-agents was on the radar Mar 15 → May 4
  (51 sustained days), absent during the May 5-13 pipeline rewrite, then back
  May 14 onward — but the May 14 JSON shows sustained_days=1, score_slow=70.5
  (jumped from 21 because EMA restarted).

THE FIX:
  Walk every radar JSON chronologically. For each topic on each day, look back
  up to LOOKBACK_DAYS to find the most recent prior occurrence of the same
  topic_id. If found, carry first_seen forward, recompute sustained_days as a
  continuous counter across the gap (each missed day still counts; the topic
  has been "the same arc" the whole time), and chain the EMAs forward across
  the gap using α_fast / α_slow applied gap_days times with raw=0 (no signal
  on missed days) before today's α-blend with raw_today.

  This is purely mechanical: no hardcoded list of "special" topics. Any topic
  ID that recurs within LOOKBACK_DAYS gets bridged, no matter which topic it
  is. As the field evolves, the set of bridged topics evolves with it.

  Topics that didn't exist within LOOKBACK_DAYS of their reappearance are
  treated as genuine restarts (no carry).

USAGE:
  python3 pipeline/scripts/backfill_radar_carry.py [--dry-run] [--limit-days N]

The script writes radar JSONs in place. Markdown files are NOT touched (those
are frozen snapshots). The .json is what the webapp + tomorrow's run consume.
"""
import argparse
import datetime
import json
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
RADAR_DIR = REPO / 'data' / 'radar' / '2026'

# Match SKILL.md §4 defaults — keep in sync if those change.
ALPHA_FAST = 0.3
ALPHA_SLOW = 0.05
LOOKBACK_DAYS = 30
# Stage rules — mirror radar_config.stages in sources.json.
STAGE_MAINSTREAM_MIN_SCORE = 70
STAGE_MAINSTREAM_MIN_DAYS = 30
STAGE_CONSOLIDATING_RANGE = (30, 70)
STAGE_CONSOLIDATING_MIN_DAYS = 7
STAGE_CONSOLIDATING_MIN_SRC = 3
STAGE_EMERGING_RANGE = (10, 30)
STAGE_EMERGING_MAX_AGE = 21
STAGE_EMERGING_MIN_SRC = 2
STAGE_FADING_MOMENTUM = -0.25
STAGE_FADING_PREVIOUS_HIGH = 50


def load_radar_files():
    """Return [(date, path, json)] sorted by date ascending."""
    out = []
    for p in sorted(RADAR_DIR.rglob('*.json')):
        if p.name == 'index.json':
            continue
        try:
            d = json.loads(p.read_text(encoding='utf-8'))
        except Exception as e:
            print(f'skip malformed {p}: {e}', file=sys.stderr)
            continue
        out.append((p.stem, p, d))
    out.sort(key=lambda x: x[0])
    return out


def date_delta(a, b):
    return (datetime.date.fromisoformat(a) - datetime.date.fromisoformat(b)).days


def apply_ema_chain(prior_score, raw_today, alpha, gap_days):
    """
    Apply the EMA forward across (gap_days - 1) missing days where raw=0,
    then apply the today blend with raw=raw_today.

    A topic that's been at score 21 with no signal for 9 days under α=0.05:
      day 1 missing: 0.05 * 0 + 0.95 * 21 = 19.95
      day 2 missing: 0.05 * 0 + 0.95 * 19.95 = 18.95
      ...
      day 9 missing: ≈ 13.2
      then today with raw=91: 0.05 * 91 + 0.95 * 13.2 ≈ 17.1

    Under α_fast=0.3 the decay is much faster, so fast EMA approaches raw_today
    quickly. Under α_slow=0.05 the slow EMA carries much more of the prior
    history forward — which is exactly the "structural truth" the radar wants.
    """
    s = prior_score
    # gap_days - 1 missing days with raw=0
    for _ in range(max(0, gap_days - 1)):
        s = alpha * 0.0 + (1 - alpha) * s
    # Then today's actual blend
    s = alpha * raw_today + (1 - alpha) * s
    return s


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dry-run', action='store_true',
                    help='Compute changes but do not write files')
    ap.add_argument('--limit-days', type=int, default=None,
                    help='Only process the first N radar files (for testing)')
    args = ap.parse_args()

    files = load_radar_files()
    if args.limit_days:
        files = files[:args.limit_days]
    print(f'Loaded {len(files)} radar JSONs ({files[0][0]} → {files[-1][0]})')

    # State: topic_id → corrected-as-of-yesterday {date, score_slow, score_fast,
    #                                              sustained_days, first_seen, stage}.
    # On each day we EITHER re-bridge across a gap OR cascade yesterday's
    # corrected values forward by one day, which means recomputing today's
    # sustained_days/EMAs/stage from prior + today's raw signal even when the
    # gap is 1. This ensures the fix doesn't only apply to the gap-day itself
    # but to every subsequent day too.
    last_seen = {}

    # Track stats
    bridged_gap = 0       # topic-day records where gap >= 2 was bridged
    cascaded = 0          # topic-day records where prior-corrected state cascaded into today
    fresh = 0             # genuine first appearances or beyond-lookback restarts
    stage_changes = 0
    files_modified = 0

    for idx, (date_str, path, d) in enumerate(files):
        modified = False
        topics = d.get('topics', [])

        for t in topics:
            tid = t.get('id')
            if not tid:
                continue
            raw = t.get('raw_score_today', 0)
            today_first_seen_orig = t.get('first_seen', date_str)
            src_ct = t.get('source_type_count', 0)
            momentum_pct = t.get('momentum_7d_pct') or 0

            prior = last_seen.get(tid)
            if prior is None:
                # Genuine first appearance — keep whatever the radar agent wrote.
                fresh += 1
                last_seen[tid] = {
                    'date': date_str,
                    'score_slow': t.get('score_slow', raw),
                    'score_fast': t.get('score_fast', raw),
                    'sustained_days': t.get('sustained_days', 1),
                    'first_seen': today_first_seen_orig,
                    'stage': t.get('stage'),
                }
                continue

            gap = date_delta(date_str, prior['date'])
            if gap > LOOKBACK_DAYS:
                # Too cold — treat as restart (genuine new arc, even if id matches)
                fresh += 1
                last_seen[tid] = {
                    'date': date_str,
                    'score_slow': t.get('score_slow', raw),
                    'score_fast': t.get('score_fast', raw),
                    'sustained_days': t.get('sustained_days', 1),
                    'first_seen': today_first_seen_orig,
                    'stage': t.get('stage'),
                }
                continue

            # gap >= 1 and <= LOOKBACK_DAYS → carry/cascade.
            new_slow = apply_ema_chain(prior['score_slow'], raw, ALPHA_SLOW, gap)
            new_fast = apply_ema_chain(prior['score_fast'], raw, ALPHA_FAST, gap)
            new_sustained = prior['sustained_days'] + gap
            new_first_seen = prior['first_seen']

            # Only mark the JSON as modified if our values differ from what's
            # already there. Avoids spurious file writes on already-correct days.
            cur_slow = t.get('score_slow')
            cur_fast = t.get('score_fast')
            cur_sus = t.get('sustained_days')
            cur_fs = t.get('first_seen')

            def near(a, b, tol=0.05):
                if a is None or b is None: return a == b
                return abs(a - b) < tol

            changed = (not near(cur_slow, new_slow) or not near(cur_fast, new_fast)
                       or cur_sus != new_sustained or cur_fs != new_first_seen)

            if changed:
                t['score_slow'] = round(new_slow, 2)
                t['score_fast'] = round(new_fast, 2)
                t['score'] = round(new_slow, 2)
                t['sustained_days'] = new_sustained
                t['first_seen'] = new_first_seen
                modified = True

            # Re-evaluate stage with corrected sustained_days + score_slow.
            previously_consolidating = prior.get('stage') in ('mainstream', 'consolidating')

            old_stage = t.get('stage')
            new_stage = None

            if previously_consolidating and momentum_pct < STAGE_FADING_MOMENTUM * 100 \
                    and prior['score_slow'] >= STAGE_FADING_PREVIOUS_HIGH:
                new_stage = 'fading'
            elif new_slow >= STAGE_MAINSTREAM_MIN_SCORE and new_sustained >= STAGE_MAINSTREAM_MIN_DAYS:
                new_stage = 'mainstream'
            elif STAGE_CONSOLIDATING_RANGE[0] <= new_slow < STAGE_CONSOLIDATING_RANGE[1] \
                    and new_sustained >= STAGE_CONSOLIDATING_MIN_DAYS \
                    and src_ct >= STAGE_CONSOLIDATING_MIN_SRC:
                new_stage = 'consolidating'
            elif STAGE_EMERGING_RANGE[0] <= new_slow < STAGE_EMERGING_RANGE[1] \
                    and src_ct >= STAGE_EMERGING_MIN_SRC \
                    and (date_delta(date_str, new_first_seen) <= STAGE_EMERGING_MAX_AGE
                         or new_sustained <= STAGE_EMERGING_MAX_AGE):
                new_stage = 'emerging'
            else:
                new_stage = old_stage

            if new_stage and new_stage != old_stage:
                t['stage'] = new_stage
                stage_changes += 1
                modified = True

            if gap >= 2:
                bridged_gap += 1
            else:
                cascaded += 1

            last_seen[tid] = {
                'date': date_str,
                'score_slow': new_slow,
                'score_fast': new_fast,
                'sustained_days': new_sustained,
                'first_seen': new_first_seen,
                'stage': t.get('stage'),
            }

        if modified:
            files_modified += 1
            if not args.dry_run:
                path.write_text(json.dumps(d, indent=2, ensure_ascii=False))

    print(f'\nDone.')
    print(f'  Topic-day records:')
    print(f'    fresh (no prior in window):    {fresh}')
    print(f'    cascaded (gap=1, EMA chained): {cascaded}')
    print(f'    bridged across gap (gap>=2):   {bridged_gap}')
    print(f'    stage transitions recomputed:  {stage_changes}')
    print(f'  Files {"would be" if args.dry_run else ""} modified: {files_modified}')


if __name__ == '__main__':
    main()
