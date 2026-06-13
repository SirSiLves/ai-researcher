import json, datetime, re, math, os, pickle

TODAY='2026-06-10'; YYYY='2026'; MM='06'
def dadd(d,n):
    return (datetime.date.fromisoformat(d)+datetime.timedelta(days=n)).isoformat()
def ddiff(a,b):
    return (datetime.date.fromisoformat(b)-datetime.date.fromisoformat(a)).days

ST='../pipeline/state/'
src=json.load(open(ST+'sources.json'))
nc=src['news_collector']
ev=nc['enterprise_vendors']; pv=nc['priority_vendors']
dw=nc.setdefault('deep_watch_vendors',{})
vsc=src['radar_config']['vendor_sweep_config']
velc=src['radar_config']['velocity_config']

D=json.load(open(ST+'discovered_orgs.json'))
orgs=D['orgs']

src_type_map={'news':'tech_news','papers':'paper','blogs':'long_form_blog',
              'jobs':'job_posting_skill_mention','linkedin':'linkedin_network_post','daily':'daily_synthesis'}
files={}
for top in src_type_map:
    p=f'{top}/{YYYY}/{MM}/{TODAY}.md'
    if os.path.exists(p):
        files[top]=open(p,encoding='utf-8').read()

HOT_KW=vsc['hot_event_keywords']

alias2slug={}
for slug,o in orgs.items():
    al=o.get('aliases') or []
    names=set(al)|set((o.get('alias_hits') or {}).keys())|{slug.replace('-',' ')}
    for n in names:
        if n and len(n)>=4:
            alias2slug.setdefault(n.lower(),slug)

def touch(slug,src_type,file_date,fpath,snippet=None):
    o=orgs[slug]
    o['first_seen']=min(o.get('first_seen',file_date),file_date)
    o['last_seen']=max(o.get('last_seen',file_date),file_date)
    o['total_mentions']=o.get('total_mentions',0)+1
    mbs=o.setdefault('mentions_by_source_type',{}); mbs[src_type]=mbs.get(src_type,0)+1
    mbd=o.setdefault('mentions_by_date',{}); mbd[file_date]=mbd.get(file_date,0)+1
    dst=set(o.get('distinct_source_types',[])); dst.add(src_type); o['distinct_source_types']=sorted(dst)
    o['distinct_days']=len(mbd)
    if snippet:
        cs=o.setdefault('context_samples',[])
        if len(cs)<6: cs.append(snippet)

new_added=[]
radar_new={
 'bunq':{'aliases':['bunq'],'blog_url_hint':'https://www.bunq.com/news','region':'nl'},
 'crypto-finance':{'aliases':['Crypto Finance AG','Crypto Finance'],'blog_url_hint':'https://www.cryptofinance.ch/en/news/','region':'ch'},
 'safra-sarasin':{'aliases':['Bank J. Safra Sarasin','Safra Sarasin'],'blog_url_hint':'https://www.jsafrasarasin.com/content/jsafrasarasin/en/media.html','region':'ch'},
}
for slug,meta in radar_new.items():
    if slug not in orgs:
        orgs[slug]={'tier_hint':None,'region':meta['region'],'blog_url_hint':meta['blog_url_hint'],
            'coverage':'uncovered','first_seen':TODAY,'last_seen':TODAY,'total_mentions':0,
            'distinct_days':0,'distinct_source_types':[],'mentions_by_source_type':{},'mentions_by_date':{},
            'aliases':meta['aliases'],'discovered_on':TODAY,'discovered_from':'radar/2026-06-10.json',
            'context_samples':[],'velocity_history':[]}
        new_added.append(slug)
        for a in meta['aliases']:
            if len(a)>=4: alias2slug.setdefault(a.lower(),slug)

hot_events_today={}
for top,content in files.items():
    src_type=src_type_map[top]
    low=content.lower()
    fpath=f'{top}/{YYYY}/{MM}/{TODAY}.md'
    paras=re.split(r'\n\s*\n',content)
    for alias,slug in alias2slug.items():
        idx=low.find(alias)
        if idx==-1: continue
        snippet=content[max(0,idx-60):idx+60].replace('\n',' ').strip()
        touch(slug,src_type,TODAY,fpath,f'…{snippet}…  ({fpath})')
        for para in paras:
            pl=para.lower()
            if alias in pl:
                for kw in HOT_KW:
                    if kw.lower() in pl:
                        hot_events_today.setdefault(slug,[])
                        if not any(h[0]==kw for h in hot_events_today[slug]):
                            hsn=para.strip().replace('\n',' ')[:140]
                            hot_events_today[slug].append((kw,fpath,hsn))
                break

for slug,evs in hot_events_today.items():
    o=orgs[slug]
    he=o.setdefault('hot_events',[])
    for kw,fpath,snip in evs:
        he.append({'date':TODAY,'keyword':kw,'source_file':fpath,'snippet':snip})
    o['hot_events']=he[-10:]

def velocity(o):
    mbd=o.get('mentions_by_date',{})
    w7=sum(c for d,c in mbd.items() if 0<=ddiff(d,TODAY)<7)
    w28=sum(c for d,c in mbd.items() if 0<=ddiff(d,TODAY)<28)
    avg=w28/4.0
    ratio=w7/max(avg,1.0)
    if ratio>=velc['hot_event_velocity_threshold']: st='surging'
    elif ratio>=velc['accelerating_ratio']: st='accelerating'
    elif ratio<=velc['decelerating_ratio']: st='cooling'
    else: st='steady'
    return w7,round(avg,2),round(ratio,2),st

for slug,o in orgs.items():
    w7,avg,ratio,st=velocity(o)
    o['velocity_7d']=w7; o['velocity_28d_avg']=avg; o['velocity_ratio']=ratio; o['velocity_status']=st
    vh=o.setdefault('velocity_history',[])
    if not vh or vh[-1].get('date')!=TODAY:
        vh.append({'date':TODAY,'ratio':ratio,'status':st})
    o['velocity_history']=vh[-30:]

window=vsc['rolling_window_days']
wstart=dadd(TODAY,-window)
pt=vsc['promotion_thresholds']; wt=vsc['watch_thresholds']
sil=vsc['silence_thresholds']; hemt=vsc['hot_event_min_thresholds']

priority_set=set(pv.keys()); ent_set=set(ev.keys()); dw_set=set(dw.keys())
url_lists=[]
for key in ['vendor_blogs','governance_sources']:
    url_lists+=nc.get(key,[])
def host_in_urllists(o):
    h=(o.get('blog_url_hint') or '')
    if not h: return False
    dom=re.sub(r'^https?://','',h).split('/')[0].lower()
    for u in url_lists:
        ud=re.sub(r'^https?://','',u).split('/')[0].lower()
        if dom and (dom==ud or dom.endswith('.'+ud) or ud.endswith('.'+dom)):
            return True
    return False

def classify(slug,o):
    mbd=o.get('mentions_by_date',{})
    recent=sum(c for d,c in mbd.items() if d>=wstart)
    rdays={d for d in mbd if d>=wstart}
    rst=set(o.get('distinct_source_types',[])) if (o.get('last_seen','')>=wstart) else set()
    cov=o.get('coverage','uncovered'); last=o.get('last_seen',''); vst=o.get('velocity_status')
    if slug in priority_set:
        thr=sil['priority_vendor_silent_days']
        return ('covered_healthy' if (last and ddiff(last,TODAY)<=thr) else 'covered_silent'),recent,len(rst),len(rdays)
    if slug in ent_set:
        thr=sil['enterprise_vendor_silent_days']
        return ('covered_healthy' if (last and ddiff(last,TODAY)<=thr) else 'covered_silent'),recent,len(rst),len(rdays)
    he=o.get('hot_events',[]); he_recent=[h for h in he if h.get('date','')>=wstart]
    if (recent>=hemt['min_mentions'] and he_recent) or vst=='surging':
        return 'hot_event',recent,len(rst),len(rdays)
    if cov in ('uncovered','deep_watch'):
        if recent>=pt['min_total_mentions'] and len(rst)>=pt['min_source_types'] and len(rdays)>=pt['min_distinct_days']:
            return 'promote',recent,len(rst),len(rdays)
    if cov=='uncovered' and wt['min_total_mentions']<=recent<=wt['max_total_mentions']:
        return 'watch',recent,len(rst),len(rdays)
    if host_in_urllists(o):
        return 'informal_covered',recent,len(rst),len(rdays)
    return 'dormant',recent,len(rst),len(rdays)

results={}
for slug,o in orgs.items():
    tier,recent,nst,ndays=classify(slug,o)
    results[slug]=(tier,recent,nst,ndays)
    o['last_classification']=tier; o['last_classified_at']=TODAY
    ch=o.setdefault('classification_history',[])
    append=(not ch) or (ch[-1].get('tier')!=tier) or (tier in ('promote','hot_event'))
    if append and not (ch and ch[-1].get('date')==TODAY):
        ch.append({'date':TODAY,'tier':tier})
    o['classification_history']=ch[-14:]

def consec_promote(o):
    cnt=0
    for e in reversed(o.get('classification_history',[])):
        if e.get('tier')=='promote': cnt+=1
        else: break
    return cnt

pickle.dump({'results':results,'new_added':new_added,'hot_events_today':hot_events_today,'D':D},open('.sweep_state.pkl','wb'))

prom=[s for s,(t,*_) in results.items() if t=='promote']
hot=[s for s,(t,*_) in results.items() if t=='hot_event']
print('classified',len(results),'orgs. new_added=',new_added)
print('PROMOTE tier today:')
for s in prom: print('  ',s,'consec=',consec_promote(orgs[s]),'metrics=',results[s],'cov=',orgs[s].get('coverage'),'blog=',orgs[s].get('blog_url_hint'))
print('HOT_EVENT tier today:')
for s in hot: print('  ',s,'metrics=',results[s],'in_ev=',s in ev,'in_dw=',s in dw,'blog=',orgs[s].get('blog_url_hint'),'cov=',orgs[s].get('coverage'),'hot_kw=',[h[0] for h in hot_events_today.get(s,[])],'vst=',orgs[s].get('velocity_status'))
print('WATCH count:',sum(1 for s,(t,*_) in results.items() if t=='watch'))
print('covered_silent auto-added enterprise:')
for s,(t,*_) in results.items():
    if t=='covered_silent' and s in ev and ev[s].get('_auto_added'): print('  ',s,'last_seen=',orgs[s].get('last_seen'))
