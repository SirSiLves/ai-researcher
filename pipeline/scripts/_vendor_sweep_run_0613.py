#!/usr/bin/env python3
"""ai-vendor-sweep for 2026-06-13 — runs incremental sweep on today's files."""
import json
import os
import re
import shutil
import glob
import math
from datetime import date, timedelta
from collections import Counter

TODAY = '2026-06-13'
ISO_TS = '2026-06-13T18:05:55+00:00'
PREV_UPDATED = '2026-06-12'
_candidates = [
    '/Users/yruosch/Documents/Claude/Projects/AI Researcher',
    '/sessions/kind-modest-tesla/mnt/AI Researcher',
]
_root = next((p for p in _candidates if os.path.isdir(p)), None)
if _root is None:
    raise SystemExit('Could not locate project root')
DATA_DIR = f'{_root}/data'
STATE_DIR = f'{_root}/pipeline/state'
os.chdir(DATA_DIR)

with open(f'{STATE_DIR}/sources.json') as f:
    sources = json.load(f)
with open(f'{STATE_DIR}/discovered_orgs.json') as f:
    disc = json.load(f)

vc = sources['radar_config']['vendor_sweep_config']
vel_cfg = sources['radar_config']['velocity_config']
nc = sources['news_collector']
orgs = disc['orgs']

# IDEMPOTENT RE-RUN GUARD
for slug, o in list(orgs.items()):
    mbd = o.get('mentions_by_date') or {}
    if mbd.get(TODAY, 0) > 0:
        o['total_mentions'] = max(0, o.get('total_mentions', 0) - mbd.get(TODAY, 0))
        del mbd[TODAY]
    he = o.get('hot_events') or []
    o['hot_events'] = [e for e in he if e.get('date') != TODAY]
    vh = o.get('velocity_history') or []
    o['velocity_history'] = [e for e in vh if e.get('date') != TODAY]
    ch = o.get('classification_history') or []
    o['classification_history'] = [e for e in ch if e.get('date') != TODAY]

alias_map = {}
def add_alias(slug, alias):
    if not alias:
        return
    alias_map.setdefault(alias.lower(), set()).add(slug)

KNOWN_ALIASES = {
    'openai': ['OpenAI'], 'anthropic': ['Anthropic'],
    'google_deepmind': ['Google DeepMind', 'DeepMind'], 'meta': ['Meta AI'],
    'mistral': ['Mistral AI', 'Mistral Small 4', 'Magistral', 'Pixtral', 'Devstral'],
    'deepseek': ['DeepSeek'], 'apple': ['Apple'],
    'salesforce': ['Salesforce', 'Agentforce'],
    'sap': ['SAP', 'Joule Studio', 'Joule'],
    'snowflake': ['Snowflake'], 'nvidia': ['NVIDIA'],
    'amazon-aws': ['Amazon Web Services', 'AWS Bedrock', 'Amazon Bedrock', 'AgentCore'],
    'huggingface': ['Hugging Face', 'HuggingFace'], 'langchain': ['LangChain'],
    'langgraph': ['LangGraph'], 'crewai': ['CrewAI'],
    'xai': ['xAI'], 'cohere': ['Cohere'], 'aleph-alpha': ['Aleph Alpha'],
    'microsoft': ['Microsoft', 'Copilot', 'MAI-Thinking-1', 'MAI-Code-1-Flash'],
    'github': ['GitHub'], 'red-hat': ['Red Hat'], 'redhat_ibm': ['Red Hat', 'IBM', 'Watsonx'],
    'servicenow': ['ServiceNow'], 'palantir': ['Palantir'], 'adobe': ['Adobe'],
    'siemens': ['Siemens'], 'atlassian': ['Atlassian'], 'crowdstrike': ['CrowdStrike'],
    'elastic': ['Elastic', 'Elasticsearch'], 'n8n': ['n8n'],
    'deutsche-telekom': ['Deutsche Telekom', 'Telekom'],
    'stanford-hai': ['Stanford HAI'], 'cern': ['CERN'],
    'ethz': ['ETH Zurich', 'ETHZ'], 'eth-zurich': ['ETH Zurich'], 'epfl': ['EPFL'],
    'bank-safra-sarasin': ['Bank J. Safra Sarasin', 'J. Safra Sarasin', 'Safra Sarasin'],
    'ey': [], 'kpmg': ['KPMG'], 'mckinsey': ['McKinsey'],
    'isomorphic-labs': ['Isomorphic Labs'], 'daedalean': ['Daedalean'],
    'contextual-ai': ['Contextual AI'], 'ramp': ['Ramp'], 'gic': ['GIC'],
    'govern-ai': ['Govern-AI'], 'simonwillison': ['Simon Willison'],
    'interconnects': ['Interconnects', 'Nathan Lambert'], 'lawfare': ['Lawfare'],
    'cnbc': ['CNBC'], 'handelsblatt': ['Handelsblatt'],
    'alpineai': ['AlpineAI'], 'uber': ['Uber'], 'genentech': ['Genentech'],
}
for slug, aliases in KNOWN_ALIASES.items():
    add_alias(slug, slug.replace('-', ' '))
    add_alias(slug, slug.replace('_', ' '))
    for a in aliases:
        add_alias(slug, a)

for slug, info in orgs.items():
    s_norm = slug.replace('-', ' ').replace('_', ' ')
    if len(s_norm) >= 3:
        add_alias(slug, s_norm)
    for a in info.get('aliases', []) or []:
        add_alias(slug, a)
    for k in (info.get('alias_hits') or {}).keys():
        add_alias(slug, k)

SRC_TYPE_MAP = {'news': 'tech_news', 'papers': 'paper', 'blogs': 'long_form_blog',
    'jobs': 'job_posting_skill_mention', 'linkedin': 'linkedin_network_post',
    'daily': 'daily_synthesis'}

today_files = []
_year, _month = TODAY[:4], TODAY[5:7]
for top in ['news', 'papers', 'blogs', 'jobs', 'linkedin', 'daily']:
    path = f'{top}/{_year}/{_month}/{TODAY}.md'
    if os.path.exists(path):
        today_files.append((top, path))
print('Today files:', [p for _, p in today_files])

file_contents = {}
for top, path in today_files:
    with open(path, encoding='utf-8') as f:
        file_contents[(top, path)] = f.read()

HOT_KW = vc.get('hot_event_keywords', [])

alias_list = sorted([a for a in alias_map.keys() if len(a) >= 3], key=lambda x: -len(x))
alias_regex = {a: re.compile(r'(?<![a-zA-Z0-9])' + re.escape(a) + r'(?![a-zA-Z0-9])', re.IGNORECASE) for a in alias_list}

mention_inc = {}
def bump(slug, src_type, file_path, file_date, hits_count, sample_text):
    rec = mention_inc.setdefault(slug, {'total': 0, 'by_src_type': Counter(),
        'by_date': Counter(), 'sample': None, 'hot_events': []})
    rec['total'] += hits_count
    rec['by_src_type'][src_type] += hits_count
    rec['by_date'][file_date] += hits_count
    if rec['sample'] is None:
        rec['sample'] = sample_text

for (top, path), content in file_contents.items():
    src_type = SRC_TYPE_MAP[top]
    for a, rx in alias_regex.items():
        matches = list(rx.finditer(content))
        if not matches:
            continue
        first = matches[0]
        snippet = re.sub(r'\s+', ' ', content[max(0, first.start()-60):min(len(content), first.end()+60)])[:160]
        for slug in alias_map[a]:
            bump(slug, src_type, path, TODAY, len(matches), snippet + f"  ({path})")

# Slugs whose today-context is a false hot-event co-occurrence, judged by reading
# the files: org named only as an INVESTOR in someone else's round, or paired with a
# funding/merger keyword that describes a *different* org in the same bullet.
#   - iconiq: appears only as "Iconiq/GIC-led" investor in Ramp's round, not raising itself.
#   - deutsche-telekom: today's event is a GPU-datacenter expansion; the 'merger'/'funding'
#     keywords belong to the Cohere–Aleph Alpha talks bundled in the same daily bullet.
HOT_EVENT_BLOCKLIST = {'iconiq', 'deutsche-telekom', 'gic',
    # 2026-06-13: tcs — the 'IPO' keyword co-occurring with TCS belongs to ANTHROPIC, not TCS:
    #   "...partnership with Tata Consultancy Services... after confidential [IPO] filing (June 8)"
    #   and the theme-balance line "Frontier model releases: 4 (Anthropic IPO/TCS, ...)". TCS's real
    #   event today is a Claude deployment partnership, not a funding/IPO event. Suppress the false
    #   hot-event so TCS classifies as watch/uncovered instead of getting a 30-day enterprise slot.
    'tcs'}

def detect_hot(aliases_to_check):
    for (top, path), content in file_contents.items():
        # Split on blank lines AND on markdown list-item boundaries, so a funding
        # keyword in one bullet can't co-occur with an org named in a sibling bullet.
        raw_paras = re.split(r'\n\s*\n', content)
        paras = []
        for rp in raw_paras:
            # split a bullet block into individual list items
            parts = re.split(r'\n(?=\s*[-*]\s)', rp)
            paras.extend(parts)
        for para in paras:
            para_lower = para.lower()
            hot_kw_found = [kw for kw in HOT_KW if kw.lower() in para_lower]
            if not hot_kw_found:
                continue
            for a in aliases_to_check:
                rx = alias_regex.get(a) or re.compile(r'(?<![a-zA-Z0-9])' + re.escape(a) + r'(?![a-zA-Z0-9])', re.IGNORECASE)
                m = rx.search(para)
                if not m:
                    continue
                snippet = re.sub(r'\s+', ' ', para[max(0, m.start()-60):min(len(para), m.end()+60)])[:200]
                for slug in alias_map.get(a, [a]):
                    if slug in HOT_EVENT_BLOCKLIST:
                        continue
                    rec = mention_inc.setdefault(slug, {'total': 0, 'by_src_type': Counter(),
                        'by_date': Counter(), 'sample': None, 'hot_events': []})
                    seen = set((e['keyword'], e['source_file']) for e in rec['hot_events'])
                    for kw in hot_kw_found:
                        if (kw, path) in seen:
                            continue
                        rec['hot_events'].append({'date': TODAY, 'keyword': kw, 'source_file': path, 'snippet': snippet})
                        seen.add((kw, path))

detect_hot(list(alias_regex.keys()))

# Radar-derived new orgs
radar_files = sorted(glob.glob(f'radar/{_year}/*/{_year}-*.json'))[-30:]
radar_orgs = set()
REJECT_SUFFIX = ('-paper', '-bench', '-act', '-toolkit', '-spec', '-protocol')
REJECT_EXACT = {'commission','consilium','europarl','eu','iso','mind','every','infosec','mcp','a2a',
    # 2026-06-13: radar breadth surfaced non-org / junk slugs — reject (states, generic gov terms,
    # initials of people, mis-parsed concepts, and dup variants of already-tracked slugs)
    'colorado','connecticut','us-government','eu-ai-office','ft','mvanhorn','mksglu','mempalace',
    'blue41','cactus','cma',
    'alephalpha','deutschetelekom'}
BRAND_PARENT = {'claude':'anthropic','claude-code':'anthropic','gpt-5':'openai','codex':'openai',
    'sora':'openai','gemini':'google_deepmind','deepmind':'google_deepmind','llama':'meta',
    'qwen':'alibaba-qwen','kimi':'moonshot','azure':'microsoft','github-copilot':'microsoft',
    'bedrock':'amazon-aws','agentforce':'salesforce','watsonx':'redhat_ibm','cortex':'snowflake'}
for rf in radar_files:
    try:
        rj = json.load(open(rf))
    except Exception:
        continue
    for t in rj.get('topics', []):
        for o in t.get('breadth_orgs_7d', []) or []:
            radar_orgs.add(o)

new_orgs_today = []
def org_filter_ok(slug):
    if not slug or len(slug) < 3:
        return False
    if slug.endswith(REJECT_SUFFIX):
        return False
    if slug in REJECT_EXACT or slug in BRAND_PARENT:
        return False
    return True

for radar_slug in radar_orgs:
    if radar_slug in orgs or not org_filter_ok(radar_slug):
        continue
    orgs[radar_slug] = {'tier_hint': None, 'coverage': 'uncovered', 'blog_url_hint': None,
        'first_seen': TODAY, 'last_seen': TODAY, 'total_mentions': 0, 'distinct_days': 0,
        'distinct_source_types': [], 'mentions_by_source_type': {}, 'mentions_by_date': {},
        'aliases': [radar_slug], 'alias_hits': {}, 'context_samples': [],
        'discovered_from': f'radar/{TODAY}.json', 'discovered_on': TODAY}
    new_orgs_today.append(radar_slug)

# LLM-extracted new orgs from today's files (named legal entities appearing >=2x, journalist test passed)
# 2026-06-13: TCS (Tata Consultancy Services) — Anthropic systems-integrator partnership, news=3/daily=4.
#   Also attaches a blog_url_hint + aliases onto the radar-derived `tcs` slug (radar path adds it first).
# Ona — OpenAI's acquisition target (coding env); news=2. Named entity passes journalist test; given a
#   blog hint so the apply-gate can evaluate it (it's pre-acquisition, still an independent entity today).
NEW_ORG_CANDIDATES = {
    'tcs': {'canonical': 'Tata Consultancy Services', 'aliases': ['TCS', 'Tata Consultancy Services', 'Tata Consultancy'],
        'blog_url_hint': 'https://www.tcs.com/insights', 'tier_hint': 'systems-integrator'},
    'ona': {'canonical': 'Ona', 'aliases': ['Ona'],
        'blog_url_hint': 'https://www.ona.com/blog', 'tier_hint': 'coding-agent-env'},
    # Crusoe — $1.38B Series E at $10B valuation (Crunchbase megarounds). Radar surfaces `crusoe`
    # with no blog hint; attach one so a genuine funding hot-event can apply rather than be rejected.
    'crusoe': {'canonical': 'Crusoe Energy', 'aliases': ['Crusoe'],
        'blog_url_hint': 'https://www.crusoe.ai/blog', 'tier_hint': 'ai-compute-infra'},
}
for slug, meta in NEW_ORG_CANDIDATES.items():
    if slug in orgs:
        if not orgs[slug].get('blog_url_hint') and meta.get('blog_url_hint'):
            orgs[slug]['blog_url_hint'] = meta['blog_url_hint']
        if not orgs[slug].get('tier_hint') and meta.get('tier_hint'):
            orgs[slug]['tier_hint'] = meta['tier_hint']
        for a in meta.get('aliases', []):
            if a not in (orgs[slug].get('aliases') or []):
                orgs[slug].setdefault('aliases', []).append(a)
                add_alias(slug, a)
        continue
    total = 0
    for content in file_contents.values():
        for a in meta['aliases']:
            total += len(re.findall(r'(?<![a-zA-Z0-9])' + re.escape(a) + r'(?![a-zA-Z0-9])', content, re.IGNORECASE))
    if total < 2:
        continue
    orgs[slug] = {'tier_hint': meta.get('tier_hint'), 'coverage': 'uncovered',
        'blog_url_hint': meta.get('blog_url_hint'), 'first_seen': TODAY, 'last_seen': TODAY,
        'total_mentions': 0, 'distinct_days': 0, 'distinct_source_types': [],
        'mentions_by_source_type': {}, 'mentions_by_date': {}, 'aliases': meta['aliases'],
        'alias_hits': {}, 'context_samples': [], 'discovered_on': TODAY}
    new_orgs_today.append(slug)
    for a in meta['aliases']:
        add_alias(slug, a)
    for (top, path), content in file_contents.items():
        src_type = SRC_TYPE_MAP[top]
        for a in meta['aliases']:
            ms = list(re.finditer(r'(?<![a-zA-Z0-9])' + re.escape(a) + r'(?![a-zA-Z0-9])', content, re.IGNORECASE))
            if not ms:
                continue
            first = ms[0]
            snippet = re.sub(r'\s+', ' ', content[max(0, first.start()-60):min(len(content), first.end()+60)])[:160]
            bump(slug, src_type, path, TODAY, len(ms), snippet + f"  ({path})")
    detect_hot(meta['aliases'])

# Apply mentions
for slug, inc in mention_inc.items():
    if slug not in orgs:
        continue
    o = orgs[slug]
    if not o.get('first_seen') or TODAY < o['first_seen']:
        o['first_seen'] = TODAY
    if not o.get('last_seen') or TODAY > o['last_seen']:
        o['last_seen'] = TODAY
    o['total_mentions'] = o.get('total_mentions', 0) + inc['total']
    mbst = o.setdefault('mentions_by_source_type', {})
    for st, n in inc['by_src_type'].items():
        mbst[st] = mbst.get(st, 0) + n
    mbd = o.setdefault('mentions_by_date', {})
    for d, n in inc['by_date'].items():
        mbd[d] = mbd.get(d, 0) + n
    o['distinct_days'] = len(o.get('mentions_by_date', {}))
    dst = set(o.get('distinct_source_types', []))
    dst.update(inc['by_src_type'].keys())
    o['distinct_source_types'] = sorted(dst)
    samples = o.get('context_samples', [])
    if inc['sample']:
        samples.append(inc['sample'])
    o['context_samples'] = samples[-6:]
    he = o.setdefault('hot_events', [])
    for ev in inc['hot_events']:
        he.append(ev)
    o['hot_events'] = he[-10:]

# Velocity
today_d = date.fromisoformat(TODAY)
d7 = today_d - timedelta(days=7)
d28 = today_d - timedelta(days=28)
def velocity_for(org):
    v7 = v28 = 0
    for ds, n in org.get('mentions_by_date', {}).items():
        try:
            dd = date.fromisoformat(ds)
        except Exception:
            continue
        if dd > today_d:
            continue
        if dd >= d28:
            v28 += n
        if dd >= d7:
            v7 += n
    v28_avg = v28 / 4.0
    ratio = v7 / max(v28_avg, 1.0)
    if ratio >= vel_cfg.get('hot_event_velocity_threshold', 5.0):
        status = 'surging'
    elif ratio >= vel_cfg.get('accelerating_ratio', 3.0):
        status = 'accelerating'
    elif ratio <= vel_cfg.get('decelerating_ratio', 0.33):
        status = 'cooling'
    else:
        status = 'steady'
    return v7, v28_avg, ratio, status
for slug, o in orgs.items():
    v7, v28_avg, ratio, status = velocity_for(o)
    o['velocity_7d'] = v7
    o['velocity_28d_avg'] = round(v28_avg, 2)
    o['velocity_ratio'] = round(ratio, 2)
    o['velocity_status'] = status
    vh = o.setdefault('velocity_history', [])
    vh.append({'date': TODAY, 'v7': v7, 'v28_avg': round(v28_avg, 2), 'ratio': round(ratio, 2), 'status': status})
    o['velocity_history'] = vh[-30:]

# Classification
priority_set = set(nc['priority_vendors'].keys())
enterprise_set = set(nc['enterprise_vendors'].keys())
deep_watch_set = set(nc.get('deep_watch_vendors', {}).keys())
informal_urls = set()
for k in ['vendor_blogs', 'governance_sources']:
    v = nc.get(k, [])
    if isinstance(v, list):
        for url in v:
            informal_urls.add(url)
silent_priority = vc['silence_thresholds']['priority_vendor_silent_days']
silent_enterprise = vc['silence_thresholds']['enterprise_vendor_silent_days']
window_days = vc.get('rolling_window_days', 30)
window_start = today_d - timedelta(days=window_days)
promo_min_mentions = vc['promotion_thresholds']['min_total_mentions']
promo_min_src = vc['promotion_thresholds']['min_source_types']
promo_min_days = vc['promotion_thresholds']['min_distinct_days']
watch_min = vc['watch_thresholds']['min_total_mentions']
watch_max = vc['watch_thresholds']['max_total_mentions']
hot_min_mentions = vc['hot_event_min_thresholds']['min_mentions']

def classify(slug, o):
    last_seen = o.get('last_seen')
    last_seen_d = date.fromisoformat(last_seen) if last_seen else None
    mbd = o.get('mentions_by_date', {})
    recent_mentions = 0
    recent_days = set()
    for ds, n in mbd.items():
        if not ds:
            continue
        try:
            dd = date.fromisoformat(ds)
        except Exception:
            continue
        if dd >= window_start:
            recent_mentions += n
            if n > 0:
                recent_days.add(ds)
    recent_src = set(o.get('distinct_source_types', []))
    hot_in_window = []
    for e in o.get('hot_events', []):
        try:
            if e.get('date') and date.fromisoformat(e['date']) >= window_start:
                hot_in_window.append(e)
        except Exception:
            pass
    velocity_status = o.get('velocity_status', 'steady')
    if slug in priority_set:
        t = 'covered_healthy' if (last_seen_d and (today_d - last_seen_d).days <= silent_priority) else 'covered_silent'
        return t, recent_mentions, recent_src, recent_days, hot_in_window
    if slug in enterprise_set:
        t = 'covered_healthy' if (last_seen_d and (today_d - last_seen_d).days <= silent_enterprise) else 'covered_silent'
        return t, recent_mentions, recent_src, recent_days, hot_in_window
    if (recent_mentions >= hot_min_mentions and hot_in_window) or velocity_status == 'surging':
        return 'hot_event', recent_mentions, recent_src, recent_days, hot_in_window
    cov = o.get('coverage')
    if cov in ('uncovered', 'deep_watch'):
        if (recent_mentions >= promo_min_mentions and len(recent_src) >= promo_min_src and len(recent_days) >= promo_min_days):
            return 'promote', recent_mentions, recent_src, recent_days, hot_in_window
    if cov == 'uncovered' and watch_min <= recent_mentions <= watch_max:
        return 'watch', recent_mentions, recent_src, recent_days, hot_in_window
    blog = o.get('blog_url_hint')
    if blog:
        for u in informal_urls:
            if u and (u in blog or blog in u):
                return 'informal_covered', recent_mentions, recent_src, recent_days, hot_in_window
    return 'dormant', recent_mentions, recent_src, recent_days, hot_in_window

classifications = {}
for slug, o in orgs.items():
    tier, rm, rs, rd, hw = classify(slug, o)
    classifications[slug] = {'tier': tier, 'recent_mentions': rm, 'recent_src': rs, 'recent_days': rd, 'hot_in_window': hw}
    o['last_classification'] = tier
    o['last_classified_at'] = TODAY
    ch = o.setdefault('classification_history', [])
    last_tier = ch[-1]['tier'] if ch else None
    append = (not ch) or (tier != last_tier) or (tier in ('promote', 'hot_event'))
    if append:
        ch.append({'date': TODAY, 'tier': tier})
    o['classification_history'] = ch[-14:]

# Auto-apply
# Frontier-lab parents (and other entities whose brands belong to a parent) must NEVER be
# auto-added to enterprise_vendors via a funding-keyword co-occurrence. Microsoft, Google, Meta,
# Amazon, Apple, OpenAI, Anthropic etc. are covered (or are priority_vendors) at the frontier
# layer; a stray "IPO"/"valuation"/"billion" mention next to their name in a list is almost always
# describing a DIFFERENT org. Guards the classification->auto-apply path even when stale hot_events
# from prior runs sit in the 30d window (the per-day blocklist only suppresses NEW hot_events at
# tally-write time, not historical ones already stored on the org).
NEVER_AUTO_ADD = {
    'microsoft', 'google', 'google-cloud', 'deepmind', 'google_deepmind', 'alphabet',
    'meta', 'amazon', 'amazon-aws', 'aws', 'openai', 'anthropic', 'oracle', 'tesla',
    # 2026-06-13: novo-nordisk — its only in-window hot_events (dated 2026-06-10) are a parsing
    # artifact: the funding keywords ('billion'/'valuation'/'IPO') co-occur with a "## Sources
    # scanned — WebSearch:" line, and the slug itself doesn't even appear in the snippet. velocity
    # status is 'cooling' and there is NO real Novo Nordisk funding/M&A event today. Block the
    # stale false-positive re-promotion (historical hot_events aren't suppressed by the per-day
    # blocklist, so guard here).
    'novo-nordisk',
}
def is_valid_slug(s):
    return bool(re.fullmatch(r'[a-z][a-z0-9-]*', s))
auto_apply_cfg = vc['auto_apply']
min_consec = auto_apply_cfg['auto_promote']['min_consecutive_days_at_promote']
ttl_days = auto_apply_cfg['auto_hot_event']['ttl_days']
def sustained_promote(o, n):
    ch = o.get('classification_history', [])
    if not ch:
        return False
    dates_needed = set([(today_d - timedelta(days=i)).isoformat() for i in range(n)])
    promote_dates = set([e['date'] for e in ch if e.get('tier') == 'promote'])
    return dates_needed.issubset(promote_dates)

promotions_to_add = []
hot_events_to_add = []
expired_to_remove = []
auto_demotions_to_remove = []
deep_watch_demotions = []
deep_watch_promotions_to_revive = []
rejected_no_blog_url = []
rejected_invalid_slug = []

for slug, info in classifications.items():
    tier = info['tier']
    o = orgs[slug]
    if slug in NEVER_AUTO_ADD:
        continue  # frontier-lab parent / brand-of-parent — never auto-add to enterprise_vendors
    if tier == 'promote':
        if not sustained_promote(o, min_consec):
            continue
        if slug in priority_set or slug in enterprise_set:
            continue
        if not is_valid_slug(slug):
            rejected_invalid_slug.append((slug, tier)); continue
        blog = o.get('blog_url_hint')
        if not blog:
            rejected_no_blog_url.append((slug, tier)); continue
        if slug in deep_watch_set:
            deep_watch_promotions_to_revive.append((slug, 'sustained_promote', info))
        else:
            reason = f"promote: {info['recent_mentions']} mentions, {len(info['recent_src'])} src types, {len(info['recent_days'])} distinct days over {window_days}d"
            host = re.sub(r'^https?://(www\.)?', '', blog).split('/')[0]
            payload = {'blog_urls': [blog], 'research_urls': [],
                'fallback_search': f"site:{host} 2026 (announcement OR release OR launch)",
                '_auto_added': True, '_added_on': TODAY, '_added_reason': reason}
            promotions_to_add.append((slug, payload, reason, info))
    elif tier == 'hot_event':
        if slug in priority_set or slug in enterprise_set:
            continue
        if not is_valid_slug(slug):
            rejected_invalid_slug.append((slug, tier)); continue
        blog = o.get('blog_url_hint')
        if not blog:
            rejected_no_blog_url.append((slug, tier)); continue
        kw = info['hot_in_window'][-1]['keyword'] if info['hot_in_window'] else None
        if kw:
            reason = f"hot-event: keyword='{kw}', velocity_status={o.get('velocity_status')}"
        else:
            reason = f"hot-event: velocity surge — ratio {o.get('velocity_ratio')}"
        snippet = info['hot_in_window'][-1]['snippet'] if info['hot_in_window'] else ''
        if slug in deep_watch_set:
            deep_watch_promotions_to_revive.append((slug, 'hot_event', info))
        else:
            host = re.sub(r'^https?://(www\.)?', '', blog).split('/')[0]
            payload = {'blog_urls': [blog], 'research_urls': [],
                'fallback_search': f"site:{host} 2026 (announcement OR release OR launch)",
                '_auto_added': True, '_added_on': TODAY, '_added_reason': reason,
                '_expires_on': (today_d + timedelta(days=ttl_days)).isoformat()}
            hot_events_to_add.append((slug, payload, reason, info, snippet, kw))

for slug, entry in nc['enterprise_vendors'].items():
    if not entry.get('_auto_added'):
        continue
    exp = entry.get('_expires_on')
    if not exp:
        continue
    try:
        if date.fromisoformat(exp) < today_d:
            expired_to_remove.append((slug, exp))
    except Exception:
        continue

auto_demote_cfg = auto_apply_cfg.get('auto_demote', {})
if auto_demote_cfg.get('enabled'):
    for slug, info in classifications.items():
        if info['tier'] != 'covered_silent':
            continue
        entry = nc['enterprise_vendors'].get(slug)
        if entry and entry.get('_auto_added'):
            auto_demotions_to_remove.append((slug, 'covered_silent'))

# Backup
shutil.copy(f'{STATE_DIR}/sources.json', f'{STATE_DIR}/sources.json.vendor.bak')
applied_log = []

for slug, exp in expired_to_remove:
    if nc['enterprise_vendors'].get(slug, {}).get('_auto_added'):
        del nc['enterprise_vendors'][slug]
        applied_log.append(('expire-remove', slug, {}, 'hot event TTL elapsed'))
for slug, reason in auto_demotions_to_remove:
    if nc['enterprise_vendors'].get(slug, {}).get('_auto_added'):
        del nc['enterprise_vendors'][slug]
        applied_log.append(('auto-demote', slug, {}, reason))
for slug, payload, reason, info in promotions_to_add:
    nc['enterprise_vendors'][slug] = payload
    applied_log.append(('promote-add', slug, {'blog_urls': payload['blog_urls']}, reason))
for slug, payload, reason, info, snippet, kw in hot_events_to_add:
    nc['enterprise_vendors'][slug] = payload
    applied_log.append(('hot-event-add', slug, {'blog_urls': payload['blog_urls'], 'expires': payload['_expires_on']}, reason))
for slug, trigger, info in deep_watch_promotions_to_revive:
    if slug in nc.get('deep_watch_vendors', {}):
        entry = nc['deep_watch_vendors'].pop(slug)
        for k in ['_demoted_on', '_demoted_reason', '_demoted_from']:
            entry.pop(k, None)
        entry['_auto_added'] = True
        entry['_added_on'] = TODAY
        if trigger == 'hot_event':
            entry['_expires_on'] = (today_d + timedelta(days=ttl_days)).isoformat()
        nc['enterprise_vendors'][slug] = entry
        applied_log.append(('deep-watch-promote', slug, {'blog_urls': entry.get('blog_urls', [])}, f'returned via {trigger}'))

# Deep-watch demote (two-regime soft cap per SKILL §C.6)
dw_cfg = auto_apply_cfg.get('deep_watch_demote', {})
dw_regime = None
if dw_cfg.get('enabled'):
    cap = dw_cfg.get('max_enterprise_vendors', 30)
    min_silence = dw_cfg.get('min_silence_days', 30)
    budget = dw_cfg.get('max_demotions_per_run', 5)
    overflow_factor = dw_cfg.get('overflow_factor', 1.5)
    overflow_silence = dw_cfg.get('overflow_silence_days', 14)
    overflow_threshold = cap * overflow_factor
    current_count = len(nc['enterprise_vendors'])
    if current_count > cap:
        if current_count > overflow_threshold:
            dw_regime = 'overflow'
            effective_silence = overflow_silence
            demotion_target = math.ceil(overflow_threshold)
        else:
            dw_regime = 'soft-cap'
            effective_silence = min_silence
            demotion_target = cap
        candidates = []
        for slug, entry in nc['enterprise_vendors'].items():
            if not entry.get('_auto_added'):
                continue
            info = classifications.get(slug)
            if info and info['tier'] in ('hot_event', 'promote'):
                continue
            exp = entry.get('_expires_on')
            if exp:
                try:
                    if date.fromisoformat(exp) >= today_d:
                        continue  # hot-event within TTL — exempt
                except Exception:
                    pass
            o = orgs.get(slug, {})
            last_seen = o.get('last_seen')
            if not last_seen:
                continue
            try:
                ls_d = date.fromisoformat(last_seen)
            except Exception:
                continue
            silence_days = (today_d - ls_d).days
            if silence_days < effective_silence:
                continue
            candidates.append((silence_days, last_seen, slug, entry))
        candidates.sort(key=lambda x: x[1])  # last_seen ascending
        to_take = min(current_count - demotion_target, budget)
        for silence_days, last_seen, slug, entry in candidates[:max(0, to_take)]:
            entry['_demoted_on'] = TODAY
            entry['_demoted_reason'] = f"deep-watch ({dw_regime}): silent {silence_days} days, {current_count}/cap {cap}"
            entry['_demoted_from'] = 'enterprise_vendors'
            nc.setdefault('deep_watch_vendors', {})[slug] = entry
            del nc['enterprise_vendors'][slug]
            applied_log.append(('deep-watch-demote', slug, {}, f'{dw_regime}: silent {silence_days} days, least-recent over cap={cap}'))
            deep_watch_demotions.append((slug, silence_days, last_seen))

# Validate JSON
serialized = json.dumps(sources, ensure_ascii=False, indent=2)
try:
    json.loads(serialized)
except Exception as e:
    print('JSON validation FAILED:', e)
    with open(f'{STATE_DIR}/vendor_changes.log', 'a') as f:
        f.write(f"{ISO_TS} ABORT-INVALID-JSON reason=\"{e}\"\n")
    raise SystemExit(2)

sources_changed = bool(applied_log)
if sources_changed:
    with open(f'{STATE_DIR}/sources.json', 'w', encoding='utf-8') as f:
        f.write(serialized)

# Audit log
log_lines = []
for verb, slug, payload, reason in applied_log:
    parts = [ISO_TS, verb, slug]
    if 'blog_urls' in payload:
        parts.append(f"blog_urls={json.dumps(payload['blog_urls'])}")
    if 'expires' in payload:
        parts.append(f"expires={payload['expires']}")
    parts.append(f'reason="{reason}"')
    log_lines.append(' '.join(parts))
if log_lines:
    with open(f'{STATE_DIR}/vendor_changes.log', 'a', encoding='utf-8') as f:
        for ln in log_lines:
            f.write(ln + '\n')

# Update discovered_orgs coverage
for slug, payload, reason, info in promotions_to_add:
    orgs[slug]['coverage'] = 'enterprise'; orgs[slug]['auto_applied_on'] = TODAY
for slug, payload, reason, info, snippet, kw in hot_events_to_add:
    orgs[slug]['coverage'] = 'enterprise'; orgs[slug]['auto_applied_on'] = TODAY
for slug, trigger, info in deep_watch_promotions_to_revive:
    orgs[slug]['coverage'] = 'enterprise'; orgs[slug]['auto_applied_on'] = TODAY
for slug, silence_days, last_seen in deep_watch_demotions:
    orgs[slug]['coverage'] = 'deep_watch'; orgs[slug]['auto_applied_on'] = TODAY
for slug, exp in expired_to_remove:
    if slug in orgs:
        orgs[slug]['coverage'] = 'uncovered'; orgs[slug]['removed_on'] = TODAY
        orgs[slug]['removed_reason'] = 'hot event TTL elapsed'

# Pending
pending_promote = []
for slug, info in classifications.items():
    if info['tier'] != 'promote':
        continue
    if slug in priority_set or slug in enterprise_set:
        continue
    o = orgs[slug]
    if sustained_promote(o, min_consec):
        continue
    ch = o.get('classification_history', [])
    promote_dates = set([e['date'] for e in ch if e.get('tier') == 'promote'])
    consec = 0
    for i in range(min_consec):
        if (today_d - timedelta(days=i)).isoformat() in promote_dates:
            consec += 1
        else:
            break
    blog = o.get('blog_url_hint')
    pending_promote.append((slug, info, consec, blog))

# Watch
watch_candidates = [(slug, info, orgs[slug]) for slug, info in classifications.items() if info['tier'] == 'watch']
watch_candidates.sort(key=lambda x: (-x[1]['recent_mentions'], -x[2].get('velocity_ratio', 0)))
max_watch = vc.get('output_format', {}).get('max_watch_per_run', 20)
watch_top = watch_candidates[:max_watch]

silent_covered = [(slug, info, orgs[slug]) for slug, info in classifications.items() if info['tier'] == 'covered_silent']

velocity_accel, velocity_cool, velocity_surge = [], [], []
for slug, o in orgs.items():
    st = o.get('velocity_status')
    if st == 'accelerating':
        velocity_accel.append((slug, o))
    elif st == 'cooling':
        velocity_cool.append((slug, o))
    elif st == 'surging':
        velocity_surge.append((slug, o))

hot_today_count = sum(1 for s, o in orgs.items() for e in o.get('hot_events', []) if e.get('date') == TODAY)

# Save discovered_orgs.json
disc['last_updated'] = TODAY
disc['orgs'] = {k: orgs[k] for k in sorted(orgs.keys())}
with open(f'{STATE_DIR}/discovered_orgs.json', 'w', encoding='utf-8') as f:
    json.dump(disc, f, ensure_ascii=False, indent=2)

# ---- Markdown (canonical emoji format) ----
cap = dw_cfg.get('max_enterprise_vendors', 30)
ent_total = len(nc['enterprise_vendors'])
ent_auto = sum(1 for v in nc['enterprise_vendors'].values() if v.get('_auto_added'))
L = []
def w(s=''): L.append(s)
w(f"# Vendor sweep — {TODAY}")
w()
w('_Daily change log. The pipeline auto-maintains `sources.json` — promotions and hot events are added directly, expired hot events are removed. This page describes what happened. To roll back a single run: `cp ../pipeline/state/sources.json.vendor.bak ../pipeline/state/sources.json`._')
w()
w('## 📋 What changed in sources.json today')
w()
if applied_log:
    if promotions_to_add:
        w(f"- **Added {len(promotions_to_add)} promotion(s):**")
        for slug, payload, reason, info in promotions_to_add:
            w(f"  - **{slug}** — `blog_urls=[{payload['blog_urls'][0]}]` · reason={reason} · sustained {min_consec}/{min_consec} days at promote")
    else:
        w("- **Added 0 promotion(s).** No uncovered org with a usable `blog_url_hint` and a clean slug crossed the sustained-promote gate this run.")
    if hot_events_to_add:
        w(f"- **Added {len(hot_events_to_add)} hot-event vendor(s):**")
        for slug, payload, reason, info, snippet, kw in hot_events_to_add:
            trig = kw if kw else 'velocity surge'
            w(f"  - **{slug}** — trigger `{trig}`. `blog_urls=[{payload['blog_urls'][0]}]`, `_expires_on={payload['_expires_on']}`. Snippet: _\"{snippet[:140]}\"_")
    else:
        w("- **Added 0 hot-event vendor(s).** No applicable uncovered org with a blog URL crossed a hot-event trigger this run.")
    if expired_to_remove:
        w(f"- **Removed {len(expired_to_remove)} expired hot-event entry(s):**")
        for slug, exp in expired_to_remove:
            w(f"  - **{slug}** — expired on {exp}, hot event TTL elapsed.")
    else:
        min_exp = min((v.get('_expires_on') for v in nc['enterprise_vendors'].values() if v.get('_auto_added') and v.get('_expires_on')), default=None)
        w(f"- **Removed 0 expired hot-event entry(s).** Earliest `_expires_on` among auto-added entries is {min_exp} — nothing has elapsed yet.")
    if deep_watch_demotions:
        w(f"- **Demoted {len(deep_watch_demotions)} to deep-watch ({ent_total}/{cap} cap — {dw_regime.upper() if dw_regime else ''} regime):**")
        for slug, silence_days, last_seen in deep_watch_demotions:
            w(f"  - **{slug}** — last_seen={last_seen}, silent {silence_days} days. Moved to `deep_watch_vendors`.")
    else:
        w(f"- **Demoted 0 to deep-watch ({ent_total}/{cap} cap).** No auto-added entry cleared the effective silence bar while remaining demotable this run.")
    if deep_watch_promotions_to_revive:
        w(f"- **Re-promoted {len(deep_watch_promotions_to_revive)} from deep-watch:**")
        for slug, trigger, info in deep_watch_promotions_to_revive:
            w(f"  - **{slug}** — trigger={trigger}.")
    else:
        w("- **Re-promoted 0 from deep-watch.** `deep_watch_vendors` re-promotion path produced no candidates this run.")
    w(f"- **Skipped {len(silent_covered)} silent vendor(s):** auto-demote disabled by default — flagged for manual review only.")
    w()
    w(f"> **Net:** +{len(promotions_to_add)} promotion(s), +{len(hot_events_to_add)} hot-event(s), -{len(expired_to_remove)} expired, {len(deep_watch_demotions)} deep-watch demotion(s). `enterprise_vendors` now {ent_total} ({ent_auto} auto-added, {ent_total-ent_auto} manual). `deep_watch_vendors` {len(nc.get('deep_watch_vendors', {}))}.")
else:
    w('_No changes to `sources.json` this run._')
w()
if rejected_no_blog_url or rejected_invalid_slug:
    w(f'### Rejected candidates (not applied) — {len(rejected_no_blog_url)} no_blog_url, {len(rejected_invalid_slug)} invalid_slug')
    w('_Filtered by Step C.5. Most are real orgs with no known blog URL, or concept slugs the radar mistakenly flagged as orgs. Top 30 by slug shown._')
    w()
    for slug, tier in sorted(rejected_no_blog_url)[:30]:
        w(f"- `{slug}` — rejected_no_blog_url: {tier} candidate but no blog_url_hint")
    if len(rejected_no_blog_url) > 30:
        w(f"- _… and {len(rejected_no_blog_url)-30} more no_blog_url rejections._")
    for slug, tier in sorted(rejected_invalid_slug):
        w(f"- `{slug}` — rejected_invalid_slug: {tier} candidate, slug doesn't match [a-z][a-z0-9-]*")
    w()
w(f"## ⏳ Pending — needs one more day at promote tier ({len(pending_promote)})")
if pending_promote:
    w(f"Orgs that hit promote thresholds today but haven't yet held that tier for the required {min_consec} consecutive days (or are blocked on a missing `blog_url_hint`). Will auto-apply once both conditions are met.")
    w()
    for slug, info, consec, blog in sorted(pending_promote, key=lambda x: -x[1]['recent_mentions']):
        block = '' if blog else ' · **blocked: no `blog_url_hint`** (rejected_no_blog_url)'
        w(f"- **{slug}** — {info['recent_mentions']} mentions, {len(info['recent_src'])} src types, days at promote so far: {consec}/{min_consec}{block}")
else:
    w('_None._')
w()
w(f"## ⚡ Velocity signals ({len(velocity_accel)} accelerating, {len(velocity_cool)} cooling, {len(velocity_surge)} surging)")
w('Orgs whose posting cadence changed significantly this run. Independent of tier.')
w()
if velocity_surge:
    w(f"**Surging ({len(velocity_surge)}):**")
    for slug, o in sorted(velocity_surge, key=lambda x: -x[1].get('velocity_ratio', 0))[:15]:
        w(f"- **{slug}** — velocity_ratio {o.get('velocity_ratio'):.2f}× ({o.get('velocity_7d')} mentions/7d vs. {o.get('velocity_28d_avg')}/wk baseline) · coverage={o.get('coverage','uncovered')} · auto-promoted to hot_event tier")
    w()
w(f"**Accelerating ({len(velocity_accel)}):**")
for slug, o in sorted(velocity_accel, key=lambda x: -x[1].get('velocity_ratio', 0))[:15]:
    hint = o.get('tier_hint') or '—'
    w(f"- **{slug}** — velocity_ratio {o.get('velocity_ratio'):.2f}× ({o.get('velocity_7d')} mentions/7d vs. {o.get('velocity_28d_avg')}/wk baseline) · coverage={o.get('coverage','uncovered')} · {hint}")
if len(velocity_accel) > 15:
    w(f"- _… and {len(velocity_accel)-15} more (top 15 by ratio)._")
w()
w(f"**Cooling ({len(velocity_cool)}):**")
for slug, o in sorted(velocity_cool, key=lambda x: x[0])[:15]:
    w(f"- **{slug}** — velocity_ratio {o.get('velocity_ratio'):.2f}× ({o.get('velocity_7d')} mentions/7d vs. {o.get('velocity_28d_avg')}/wk baseline) · coverage={o.get('coverage','uncovered')} · informational only")
if len(velocity_cool) > 15:
    w(f"- _… and {len(velocity_cool)-15} more._")
w()
w(f"## 👀 Watch list ({len(watch_top)})")
w(f"Orgs trending upward but below promotion thresholds (and without a hot-event trigger). Cap at `max_watch_per_run` ({max_watch}).")
w()
for slug, info, o in watch_top:
    hint = o.get('tier_hint') or '—'
    blog = o.get('blog_url_hint') or '—'
    w(f"- **{slug}** — {info['recent_mentions']} mentions / {len(info['recent_src'])} src types · velocity {o.get('velocity_ratio'):.2f}× · {hint} · blog_url={blog}")
w()
w(f"## ⚠️ Silent covered vendors ({len(silent_covered)})")
if silent_covered:
    w("Vendors on lists whose blogs haven't surfaced mentions in the silence window. Auto-demote disabled — these stay on the list.")
    w()
    for slug, info, o in silent_covered:
        thr = silent_priority if slug in priority_set else silent_enterprise
        w(f"- **{slug}** — last mention {o.get('last_seen','—')}, threshold {thr}d. Suggestion: verify blog URL.")
else:
    w('_None. The daily synthesis keeps re-surfacing the full enterprise roster, so last-seen recency stays high._')
w()
cov_priority = sum(1 for s, o in orgs.items() if o.get('coverage') == 'priority')
cov_enterprise = sum(1 for s, o in orgs.items() if o.get('coverage') == 'enterprise')
cov_informal = sum(1 for s, o in orgs.items() if o.get('coverage') in ('informal_url_list', 'informal'))
cov_deep_watch = sum(1 for s, o in orgs.items() if o.get('coverage') == 'deep_watch')
cov_uncovered = sum(1 for s, o in orgs.items() if o.get('coverage') == 'uncovered')
w('## Tally summary')
w(f"- Orgs tracked: {len(orgs)}")
w(f"- Covered (priority): {cov_priority}")
w(f"- Covered (enterprise — incl. {ent_auto} auto-added of {ent_total} enterprise in sources.json): {cov_enterprise}")
w(f"- Covered (informal URL list / deep_watch): {cov_informal} informal, {cov_deep_watch} deep_watch")
w(f"- Uncovered: {cov_uncovered}")
w(f"- New orgs added to tally today: {len(new_orgs_today)}" + (f" ({', '.join('`'+s+'`' for s in new_orgs_today[:12])}{' …' if len(new_orgs_today)>12 else ''})" if new_orgs_today else ''))
w(f"- Hot events recorded today: {hot_today_count}")
w()
w('## Sources scanned this run')
w(f"- `discovered_orgs.json` (was last_updated {PREV_UPDATED} → now {TODAY})")
w("- Today's source files: " + ', '.join(p for _, p in today_files))
w(f"- Radar JSONs in 30d window: {len(radar_files)}")
w(f"- `sources.json` snapshot before edit → `sources.json.vendor.bak` ({len(applied_log)} change(s) applied)")
w()

out_dir = f'{DATA_DIR}/vendor_candidates/{_year}/{_month}'
os.makedirs(out_dir, exist_ok=True)
out_path = f'{out_dir}/{TODAY}.md'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(L))

# Update index.md
idx_path = f'{DATA_DIR}/index.md'
idx = open(idx_path).read()
n_promote, n_hot, n_expired = len(promotions_to_add), len(hot_events_to_add), len(expired_to_remove)
n_pending, n_watch, n_silent = len(pending_promote), len(watch_top), len(silent_covered)
new_line = f"- [{TODAY}](vendor_candidates/{_year}/{_month}/{TODAY}.md) — applied: {n_promote} promotions, {n_hot} hot, {n_expired} expired; pending: {n_pending}; watch: {n_watch}; silent: {n_silent}"
vstart, vend = '<!-- VENDOR_START -->', '<!-- VENDOR_END -->'
s_idx, e_idx = idx.find(vstart), idx.find(vend)
if s_idx != -1 and e_idx != -1:
    head = idx[:s_idx + len(vstart)]
    middle = idx[s_idx + len(vstart):e_idx]
    tail = idx[e_idx:]
    middle_lines = middle.splitlines()
    replaced = False
    new_middle_lines = []
    for ml in middle_lines:
        if f"vendor_candidates/{_year}/{_month}/{TODAY}.md" in ml and ml.strip().startswith('- '):
            new_middle_lines.append(new_line); replaced = True
        else:
            new_middle_lines.append(ml)
    if not replaced:
        non_empty = [l for l in middle_lines if l.strip()]
        idx2 = head + '\n' + new_line + '\n' + '\n'.join(non_empty) + '\n' + tail
    else:
        idx2 = head + '\n'.join(new_middle_lines) + tail
    with open(idx_path, 'w', encoding='utf-8') as f:
        f.write(idx2)

modified = 'modified' if applied_log else 'unchanged'
print(f"Saved vendor_candidates/{_year}/{_month}/{TODAY}.md. Auto-applied: +{n_promote} promotions, +{n_hot} hot events, -{n_expired} expired. Tally has {len(orgs)} orgs ({ent_auto} auto-added of {ent_total} enterprise). sources.json {modified}.")
print(f"DEBUG regime={dw_regime} promotions={[s for s,_,_,_ in promotions_to_add]} hot={[s for s,_,_,_,_,_ in hot_events_to_add]} expired={[s for s,_ in expired_to_remove]} dw_demote={[s for s,_,_ in deep_watch_demotions]} new_orgs={len(new_orgs_today)} accel={len(velocity_accel)} cool={len(velocity_cool)} surge={len(velocity_surge)} pending={len(pending_promote)} watch={len(watch_top)} silent={len(silent_covered)} rej_noblog={len(rejected_no_blog_url)} rej_slug={len(rejected_invalid_slug)}")
