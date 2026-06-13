import pickle,json,datetime,os
TODAY='2026-06-10'; YYYY='2026'; MM='06'
st=pickle.load(open('.sweep_state.pkl','rb'))
results=st['results']; orgs=st['D']['orgs']; new_added=st['new_added']; het=st['hot_events_today']
ap=pickle.load(open('.sweep_apply.pkl','rb'))
src=json.load(open('../pipeline/state/sources.json'))
nc=src['news_collector']; ev=nc['enterprise_vendors']; pv=nc['priority_vendors']
auto_ev=sum(1 for v in ev.values() if v.get('_auto_added'))

def consec(o):
    c=0
    for e in reversed(o.get('classification_history',[])):
        if e.get('tier')=='promote': c+=1
        else: break
    return c

# pending: promote tier today, not yet sustained 2 days
pend=ap['pending']
# rejected promotions (real orgs hitting promote+sustained but no blog)
rej=ap['rejected_no_blog']

# velocity accelerating (real-looking), sort desc
acc=sorted([(s,o['velocity_ratio'],o['velocity_7d'],o['velocity_28d_avg']) for s,o in orgs.items()
            if o.get('velocity_status')=='accelerating'], key=lambda x:-x[1])
cool=[s for s,o in orgs.items() if o.get('velocity_status')=='cooling']

# watch list, cap 20
watch=sorted([(s,m1,m2,orgs[s].get('velocity_ratio'),orgs[s].get('tier_hint'))
              for s,(t,m1,m2,m3) in results.items() if t=='watch'], key=lambda x:-x[1])[:20]

tiers={}
for s,(t,*_) in results.items(): tiers[t]=tiers.get(t,0)+1
cov={}
for o in orgs.values(): cov[o.get('coverage')]=cov.get(o.get('coverage'),0)+1

# source files
files=[f'{t}/{YYYY}/{MM}/{TODAY}.md' for t in ['news','papers','blogs','jobs','linkedin','daily']]

# sustained-promote rejects (real promote candidates that hit gate but lacked blog url)
sust_rej=[r for r in rej if r[1]=='promote']

L=[]
L.append(f'# Vendor sweep — {TODAY}\n')
L.append('_Daily change log. The pipeline auto-maintains `sources.json` — promotions and hot events are added directly, expired hot events are removed. This page describes what happened. To roll back a single run: `cp ../pipeline/state/sources.json.vendor.bak ../pipeline/state/sources.json`._\n')

L.append('## 📋 What changed in sources.json today\n')
L.append('_No changes to `sources.json` this run._\n')
L.append('Why nothing applied, despite 11 orgs sitting at `promote` tier and a busy news day:')
L.append('')
L.append('- **Sustained promotions — all rejected (no blog URL).** Every org that held `promote` for ≥2 consecutive days lacks a `blog_url_hint` in the tally, so there is no URL to seed `blog_urls=[…]` (Step C.5 reject). Real-org candidates blocked this way: ' + ', '.join(f'`{r[0]}`' for r in sust_rej if r[0] in ('ey','intuit','nous-research','roche','stripe')) + '. The remainder (`a2a-protocol`, `annex-iii`, `eugene`, `postgres`, `spring`) are protocol/section/surname slugs that should not be vendors and are correctly never applied.')
L.append('- **Hot events — none genuine.** Today\'s loudest funding story (Databricks at a $165–175B valuation) cannot be applied: `databricks` is already informally covered via `vendor_blogs` and carries no `blog_url_hint`. The one keyword-co-occurrence candidate with a URL (`novo-nordisk`) was a false positive — the keywords appeared only inside a "Sources scanned" stale/dropped WebSearch line, not real content — and was filtered out.')
L.append('- **Expired hot events — none today.** All TTL\'d `_auto_added` entries still have `_expires_on ≥ 2026-06-10`; the earliest expiries (2026-06-13) remove next week.')
L.append(f'- **Deep-watch demotion — no eligible candidates.** `enterprise_vendors` sits at {len(ev)}/{nc and 30} (OVERFLOW regime, eff. silence 14d), but every over-cap `_auto_added` entry is either mentioned within the last 14 days or is a hot-event still inside its `_expires_on` TTL (exempt by design — TTL expiry walks the count down instead). No forced purge this run.')
L.append('')

L.append(f'## ⏳ Pending — needs one more day at promote tier ({len(pend)})')
L.append('Orgs that hit promote thresholds today but have not yet held that tier for the required 2 consecutive days. Will auto-apply tomorrow if they stay at promote **and** acquire a blog_url_hint.\n')
for s,m1,m2,m3,cd in pend:
    L.append(f'**{s}** — {m1} mentions, {m2} src types, days at promote so far: {cd}/2')
L.append('')

L.append(f'## ⚡ Velocity signals ({len(acc)} accelerating, {len(cool)} cooling)')
L.append('Orgs whose posting cadence has changed significantly. Independent of tier. No org reached the `surging` (≥5.0) hot-event threshold today.\n')
L.append(f'**Accelerating ({len(acc)}, top 10 by ratio):**')
for s,r,v7,vb in acc[:10]:
    L.append(f'**{s}** — velocity_ratio {r}× ({v7} mentions/7d vs. {vb}/wk baseline) · informational; watch tomorrow')
L.append('')

L.append(f'## 👀 Watch list ({tiers.get("watch",0)} total, showing top 20)')
L.append('Orgs trending upward but below promotion thresholds (3–7 mentions in window).\n')
for s,m1,m2,r,th in watch:
    L.append(f'**{s}** — {m1} mentions / {m2} src types · velocity {r}× · {th or "—"}')
L.append('')

L.append('## ⚠️ Silent covered vendors (0)')
L.append('No `_auto_added` enterprise vendor crossed the 60-day silence threshold this run (auto-demote stays disabled regardless).\n')

L.append('## Tally summary')
L.append(f'- Orgs tracked: {len(orgs)}')
L.append(f'- Covered (priority): {len(pv)}')
L.append(f'- Covered (enterprise — incl. {auto_ev} auto-added): {len(ev)}')
L.append(f'- Covered (informal URL list): see `vendor_blogs` / `governance_sources` (host-matched, not separately counted this run)')
L.append(f'- Uncovered (coverage field): {cov.get("uncovered",0)}')
L.append(f'- New orgs added to tally today: {len(new_added)} ({", ".join(new_added)})')
L.append(f'- Hot-event records appended to tally today: {len(het)} (mention-level; none met the apply bar)')
L.append('')

L.append('## Sources scanned this run')
L.append('- discovered_orgs.json (prev last_updated 2026-06-09)')
L.append('- Today\'s source files: ' + ', '.join(files))
L.append('- Radar JSONs in window: 30 (2026-05-13 … 2026-06-10)')
L.append('- sources.json snapshot before edit → sources.json.vendor.bak (0 changes applied — backup unchanged from prior run)')
L.append('')

out=f'vendor_candidates/{YYYY}/{MM}/{TODAY}.md'
os.makedirs(os.path.dirname(out),exist_ok=True)
open(out,'w',encoding='utf-8').write('\n'.join(L)+'\n')
print('wrote',out,'lines=',len(L))
