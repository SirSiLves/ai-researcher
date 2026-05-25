#!/usr/bin/env python3
"""
Build data/radar/gap_keywords.json — discovered keywords that have meaningful
cross-source presence but haven't been promoted to a radar topic yet.

This is the "what's the pipeline seeing that I'm not?" view. Sources:
  - pipeline/state/discovered_keywords.json  (raw extracted keywords)
  - pipeline/state/topic_keywords.json       (already-promoted topics)

Output: a small ranked JSON the app reads to render the gap-bridging panel
on /map.

Ranking signal = source_types × days_active × ln(total_mentions + 2). Keywords
already covered by an existing topic's keyword list (or its label tokens)
are filtered out. So is obvious pipeline-meta boilerplate ("sources scanned",
"merged run", etc.).
"""
import json
import math
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
DATA = REPO / 'data'
STATE = REPO / 'pipeline' / 'state'

# Discovered-keyword strings the pipeline emits as artifacts of its own
# bookkeeping — they show up across all source types but mean nothing.
META_BLOCKLIST = {
    'sources scanned', 'merged run', 'new added', 'sources json',
    'sources scanned today', 'changes since', 'this run',
    'websearch fallback', 'websearch site', 'websearch',
    'fallback used', 'fallback site',
}
META_PATTERN_BLOCKLIST = [
    re.compile(r'^t\d+\s+existing$'),     # "t13 existing"
    re.compile(r'^[a-z]\d+\s+\w+$'),      # "a2 existing", "p3 new"
    re.compile(r'^\d{4}-\d{2}'),          # leading date strings
    re.compile(r'^window\s+\d'),
    re.compile(r'^websearch\b'),          # pipeline-internal "websearch …" terms
    re.compile(r'^fallback\b'),
]

MIN_SOURCE_TYPES = 4
MIN_TOTAL_MENTIONS = 8
MIN_DAYS_ACTIVE = 5
TOP_N = 25


def normalize(s: str) -> str:
    return re.sub(r'[^a-z0-9]+', ' ', s.lower()).strip()


def is_meta(kw: str) -> bool:
    low = kw.lower().strip()
    if low in META_BLOCKLIST:
        return True
    return any(p.match(low) for p in META_PATTERN_BLOCKLIST)


def load_covered_terms() -> set[str]:
    """Build a set of normalized strings that are already covered by some
    existing topic's keyword list. Used to suppress redundant suggestions."""
    p = STATE / 'topic_keywords.json'
    if not p.exists():
        return set()
    topics = json.loads(p.read_text(encoding='utf-8')).get('topics', {})
    covered: set[str] = set()
    for tid, t in topics.items():
        covered.add(normalize(tid))
        covered.add(normalize(t.get('label', '')))
        for kw in t.get('keywords', []):
            covered.add(normalize(kw))
    return {c for c in covered if c}


def is_covered(kw: str, covered: set[str]) -> bool:
    n = normalize(kw)
    if not n:
        return True
    if n in covered:
        return True
    # Substring matches — "claude code" already covered by "ai-coding-agents"
    # whose keyword list includes "claude code". Iterate covered for partial hits.
    for c in covered:
        if not c:
            continue
        if c == n:
            return True
        if c in n and len(c) >= 5:
            return True
        if n in c and len(n) >= 5:
            return True
    return False


def main():
    src = STATE / 'discovered_keywords.json'
    if not src.exists():
        sys.stderr.write(f'ERROR: {src} not found.\n')
        sys.exit(1)
    payload = json.loads(src.read_text(encoding='utf-8'))
    kw_data = payload.get('keywords', {})
    covered = load_covered_terms()

    rows = []
    for kw, meta in kw_data.items():
        if is_meta(kw):
            continue
        mtypes = meta.get('mentions_by_source_type', {}) or {}
        n_types = sum(1 for c in mtypes.values() if c and c > 0)
        days = len(meta.get('mentions_by_date', {}) or {})
        total = meta.get('total_mentions', 0) or 0
        if n_types < MIN_SOURCE_TYPES or total < MIN_TOTAL_MENTIONS or days < MIN_DAYS_ACTIVE:
            continue
        if is_covered(kw, covered):
            continue
        score = n_types * days * math.log(total + 2)
        rows.append({
            'keyword': kw,
            'source_types': n_types,
            'days_active': days,
            'total_mentions': total,
            'first_seen': meta.get('first_seen'),
            'last_seen': meta.get('last_seen'),
            'gap_score': round(score, 2),
        })

    rows.sort(key=lambda r: -r['gap_score'])
    rows = rows[:TOP_N]

    out = {
        'generated_at': payload.get('last_updated'),
        '_purpose': (
            "Discovered keywords with broad cross-source presence that have "
            "not been promoted to a radar topic. Surfaces structural signals "
            "the radar layer may have missed."
        ),
        '_threshold': {
            'min_source_types': MIN_SOURCE_TYPES,
            'min_total_mentions': MIN_TOTAL_MENTIONS,
            'min_days_active': MIN_DAYS_ACTIVE,
            'top_n': TOP_N,
        },
        'candidates': rows,
    }
    dest = DATA / 'radar' / 'gap_keywords.json'
    dest.write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding='utf-8')
    sys.stderr.write(f'Wrote {dest} — {len(rows)} candidates\n')


if __name__ == '__main__':
    main()
