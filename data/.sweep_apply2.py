import json, datetime, re, math, os, pickle

TODAY='2026-06-10'; YYYY='2026'; MM='06'
ISO_TS='2026-06-10T18:06:31'
def dadd(d,n): return (datetime.date.fromisoformat(d)+datetime.timedelta(days=n)).isoformat()
def ddiff(a,b): return (datetime.date.fromisoformat(b)-datetime.date.fromisoformat(a)).days

ST='../pipeline/state/'
src=json.load(open(ST+'sources.json'))
nc=src['news_collector']
ev=nc['enterprise_vendors']; pv=nc['priority_vendors']
dw=nc.setdefault('deep_watch_vendors',{})
vsc=src['radar_config']['vendor_sweep_config']
aa=vsc['auto_apply']
state=pickle.load(open('.sweep_state.pkl','rb'))
results=state['results']; new_added=state['new_added']; hot_events_today=state['hot_events_today']
D=state['D']  # use the fully-updated tally from stage 1 (incl. new orgs, velocity, classification)
orgs=D['orgs']

SLUG_RE=re.compile(r'^[a-z][a-z0-9-]*$')
priority_set=set(pv.keys())
manual_ent={k for k,v in ev.items() if not v.get('_auto_added')}

def consec_promote(o):
    cnt=0
    for e in reversed(o.get('classification_history',[])):
        if e.get('tier')=='promote': cnt+=1
        else: break
    return cnt

window=vsc['rolling_window_days']; wstart=dadd(TODAY,-window)

promotions_to_add=[]; dw_revive=[]; rejected_no_blog=[]; rejected_invalid=[]; pending=[]
min_consec=aa['auto_promote']['min_consecutive_days_at_promote']

for slug,(tier,recent,nst,ndays) in results.items():
    o=orgs[slug]
    if slug in priority_set or slug in manual_ent: continue
    if tier=='promote':
        cd=consec_promote(o)
        if cd>=min_consec:
            blog=o.get('blog_url_hint')
            if not blog:
                rejected_no_blog.append((slug,'promote',recent,nst,ndays)); continue
            if not SLUG_RE.match(slug):
                rejected_invalid.append(slug); continue
            if o.get('coverage')=='deep_watch' and slug in dw:
                dw_revive.append((slug,'sustained_promote',recent,nst,ndays))
            elif slug not in ev:
                promotions_to_add.append((slug,recent,nst,ndays,cd,blog))
        else:
            pending.append((slug,recent,nst,ndays,cd))

hot_events_to_add=[]
for slug in hot_events_today:
    o=orgs[slug]
    tier=results.get(slug,('dormant',))[0]
    if tier!='hot_event': continue
    if slug in priority_set or slug in manual_ent: continue
    if slug in ev: continue
    blog=o.get('blog_url_hint')
    kws=[h[0] for h in hot_events_today[slug]]
    # guard: drop false positives where the keyword co-occurs only in a
    # "Sources scanned"/stale/dropped WebSearch line rather than real content.
    snips=' '.join(h[2] for h in hot_events_today[slug]).lower()
    if ('sources scanned' in snips) or ('stale' in snips) or ('dropped' in snips):
        continue
    if not blog:
        rejected_no_blog.append((slug,'hot_event',kws)); continue
    if not SLUG_RE.match(slug):
        rejected_invalid.append(slug); continue
    if o.get('coverage')=='deep_watch' and slug in dw:
        dw_revive.append((slug,'hot_event',kws))
    else:
        hot_events_to_add.append((slug,kws,blog))

ttl=aa['auto_hot_event']['ttl_days']
expired_to_remove=[k for k,v in ev.items() if v.get('_auto_added') and v.get('_expires_on') and v['_expires_on']<TODAY]

log_lines=[]
applied={'promotions':[],'hot_events':[],'expired':[],'dw_demote':[],'dw_promote':[]}

for slug,recent,nst,ndays,cd,blog in promotions_to_add:
    dom=re.sub(r"^https?://","",blog).split("/")[0]
    ev[slug]={'blog_urls':[blog],'research_urls':[],
        'fallback_search':f'site:{dom} 2026 (announcement OR release OR launch)',
        '_auto_added':True,'_added_on':TODAY,
        '_added_reason':f'promote: {recent} mentions, {nst} src types, {ndays} distinct days over {window}d ({cd}d at promote)'}
    applied['promotions'].append((slug,blog,ev[slug]['_added_reason']))
    log_lines.append(f'{ISO_TS} promote-add  {slug:20s} blog_urls=["{blog}"] reason="{ev[slug]["_added_reason"]}"')
    o=orgs[slug]; o['coverage']='enterprise'; o['auto_applied_on']=TODAY

for slug,kws,blog in hot_events_to_add:
    exp=dadd(TODAY,ttl); dom=re.sub(r"^https?://","",blog).split("/")[0]
    reason=f"hot-event: keyword='{kws[0]}'" if kws else 'hot-event'
    ev[slug]={'blog_urls':[blog],'research_urls':[],
        'fallback_search':f'site:{dom} 2026 (announcement OR release OR launch)',
        '_auto_added':True,'_added_on':TODAY,'_expires_on':exp,'_added_reason':reason}
    applied['hot_events'].append((slug,blog,exp,kws))
    log_lines.append(f'{ISO_TS} hot-event-add {slug:20s} blog_urls=["{blog}"] expires={exp} reason="{reason}"')
    o=orgs[slug]; o['coverage']='enterprise'; o['auto_applied_on']=TODAY

for item in dw_revive:
    slug=item[0]; trig=item[1]
    entry=dw.pop(slug)
    for k in ['_demoted_on','_demoted_reason','_demoted_from']: entry.pop(k,None)
    entry['_added_on']=TODAY
    if trig=='hot_event': entry['_expires_on']=dadd(TODAY,ttl)
    ev[slug]=entry
    applied['dw_promote'].append((slug,trig))
    log_lines.append(f'{ISO_TS} deep-watch-promote {slug:20s} blog_urls={json.dumps(entry.get("blog_urls",[]))} reason="returned via {trig}"')
    o=orgs[slug]; o['coverage']='enterprise'; o['auto_applied_on']=TODAY

for slug in expired_to_remove:
    del ev[slug]
    applied['expired'].append(slug)
    log_lines.append(f'{ISO_TS} expire-remove {slug:20s} reason="hot event TTL elapsed"')
    o=orgs.get(slug)
    if o: o['coverage']='uncovered'; o['removed_on']=TODAY

# Step C.6 deep-watch demotion
dwd=aa['deep_watch_demote']
if dwd.get('enabled'):
    cap=dwd['max_enterprise_vendors']; min_sil=dwd['min_silence_days']; budget=dwd['max_demotions_per_run']
    of_factor=dwd['overflow_factor']; of_sil=dwd['overflow_silence_days']; of_thresh=cap*of_factor
    cur=len(ev)
    if cur>cap:
        if cur>of_thresh:
            regime='overflow'; eff_sil=of_sil; target=math.ceil(of_thresh)
        else:
            regime='soft-cap'; eff_sil=min_sil; target=cap
        hot_today=set(s for s,(t,*_) in results.items() if t in ('hot_event','promote'))
        cands=[]
        for slug,v in ev.items():
            if not v.get('_auto_added'): continue
            o=orgs.get(slug); ls=o.get('last_seen') if o else None
            sil=ddiff(ls,TODAY) if ls else 9999
            if sil<eff_sil: continue
            if slug in hot_today: continue
            if v.get('_expires_on') and v['_expires_on']>=TODAY: continue
            cands.append((ls or '0000-00-00',slug,sil))
        cands.sort()
        n_take=min(cur-target,budget)
        for ls,slug,sil in cands[:max(0,n_take)]:
            entry=ev.pop(slug)
            entry['_demoted_on']=TODAY
            entry['_demoted_reason']=f'deep-watch ({regime}): silent {sil} days, {cur}/cap {cap}'
            entry['_demoted_from']='enterprise_vendors'
            dw[slug]=entry
            applied['dw_demote'].append((slug,ls,sil,regime))
            log_lines.append(f'{ISO_TS} deep-watch-demote {slug:20s} reason="{regime}: silent {sil} days, least-recent over cap={cap}"')
            o=orgs.get(slug)
            if o: o['coverage']='deep_watch'; o['auto_applied_on']=TODAY

try:
    json.dumps(src); valid=True
except Exception as e:
    valid=False; print('INVALID JSON',e)

will_mutate=bool(log_lines)
pickle.dump({'applied':applied,'log_lines':log_lines,'rejected_no_blog':rejected_no_blog,
   'rejected_invalid':rejected_invalid,'pending':pending,'will_mutate':will_mutate,
   'ev_count_after':len(ev),'dw_count_after':len(dw),'new_added':new_added},open('.sweep_apply.pkl','wb'))

print('promotions_to_add:',[p[0] for p in promotions_to_add])
print('hot_events_to_add:',[h[0] for h in hot_events_to_add])
print('dw_revive:',[d[0] for d in dw_revive])
print('expired_to_remove:',expired_to_remove)
print('dw_demote:',applied['dw_demote'])
print('rejected_no_blog count:',len(rejected_no_blog))
print('pending count:',len(pending),'->',[(p[0],p[4]) for p in pending])
print('ev count after:',len(ev),'dw after:',len(dw))
print('valid json:',valid)
for l in log_lines: print('LOG',l)

if will_mutate and valid:
    import shutil
    shutil.copy(ST+'sources.json',ST+'sources.json.vendor.bak')
    json.dump(src,open(ST+'sources.json','w'),indent=2,ensure_ascii=False)
    with open(ST+'vendor_changes.log','a') as f:
        for l in log_lines: f.write(l+'\n')
    print('WROTE sources.json + backup + appended', len(log_lines),'log lines')
else:
    print('NO sources.json MUTATION (will_mutate=%s valid=%s)'%(will_mutate,valid))

D['last_updated']=TODAY
D['orgs']=dict(sorted(orgs.items()))
json.dump(D,open(ST+'discovered_orgs.json','w'),indent=1,ensure_ascii=False)
print('WROTE discovered_orgs.json (%d orgs)'%len(orgs))
