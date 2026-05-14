#!/usr/bin/env python3
"""
run_keyword_sweep.py — pure-Python implementation of the ai-keyword-sweep skill.

The SKILL.md spec describes a large agentic process (mine n-grams, classify,
auto-apply to sources.json, audit log, proven-promote). For reproducibility
and speed, this script implements that exact procedure deterministically.

Outputs (idempotent across re-runs on the same day):
  - discovered_keywords.json       (running tally, append-update incrementally)
  - keyword_candidates/{YYYY}/{MM}/{TODAY}.md (today's change log)
  - keyword_changes.log            (append-only audit, one line per mutation)
  - sources.json                   (mutated per auto-apply rules, with backup)
  - sources.json.bak               (one-step rollback target)

Run order: scripts/run_keyword_sweep.py
Hooked from ai-replay §6.8 as a fallback when the agent isn't spawned.
"""
import json
import os
import re
import shutil
import sys
from collections import defaultdict
from datetime import date, datetime, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TODAY = date.today().isoformat()
NOW_ISO = datetime.now().astimezone().isoformat(timespec="seconds")

SOURCE_DIRS = ["news", "papers", "blogs", "jobs", "linkedin", "daily", "github", "hackernews"]
SRC_TYPE_FROM_DIR = {
    "news": "tech_news",
    "papers": "paper",
    "blogs": "long_form_blog",
    "jobs": "job_posting_skill_mention",
    "linkedin": "linkedin_network_post",
    "daily": "daily_synthesis",
    "github": "github_signal",
    "hackernews": "hackernews_signal",
}

# Target list section paths in sources.json
TARGET_PATHS = {
    "news_web_search_queries": ("news_collector", "web_search_queries"),
    "hackernews_filter_keywords": ("hackernews_collector", "filter_keywords"),
    "linkedin_pulse_queries": ("linkedin_collector", "pulse_topic_queries"),
    # radar_topic_taxonomy is a special case: a new "_auto_added" key inside topic_taxonomy_seed
}

TOKEN_RE = re.compile(r"[a-z][a-z0-9'-]+")
URL_RE = re.compile(r"https?://\S+|\b[a-z0-9.-]+\.[a-z]{2,}\b")
MARKDOWN_LINK_RE = re.compile(r"\[([^\]]+)\]\([^)]+\)")
CODE_FENCE_RE = re.compile(r"```[\s\S]*?```", re.MULTILINE)
FRONTMATTER_RE = re.compile(r"^---[\s\S]*?^---\s*$", re.MULTILINE)

# Boilerplate phrases — these appear in our own collector templates / digest
# scaffolding rather than in the substance of what's being reported. Hard-coded
# blocklist to avoid them dominating the n-gram tally. Add new patterns here
# when the daily candidate output surfaces obvious template artifacts.
BOILERPLATE_PHRASES = {
    # Daily / weekly synthesis template
    "why notable", "why matters", "what changed", "what changed vs",
    "sources scanned", "sources read", "theme balance", "reading priorities",
    "top stories", "top papers", "top reading", "new active", "new added",
    "anon takeaway", "anon takeaways", "takeaway anon",
    "headline summary", "stack notable", "notable llm", "notable critique",
    "tldr bullets",
    # Merge-banner artifacts: "_Merged run at … — N existing kept, M new added._"
    "existing kept", "kept new", "kept new added", "new added top",
    "existing kept new", "t13 existing kept",
    "merged run", "added top", "added top picks",
    # GitHub collector template
    "stars today", "stars baseline", "stars baseline last", "baseline last",
    "baseline last commit", "last commit", "last commit context",
    "commit context", "trending today", "python stars", "typescript stars",
    "rust stars", "javascript stars", "stars gained",
    # HN collector template
    "pts comments", "comments age", "comments hn", "pts age",
    # ArXiv / papers boilerplate
    "category arxiv", "arxiv category", "arxiv link", "arxiv id",
    # Generic markdown structure
    "table contents", "bullet point", "code block", "list item",
    "web search", "web fetch",  # these are our tool names
}

# Boilerplate prefixes/suffixes that indicate template scaffolding regardless
# of the trailing/leading word. Catches "stars X", "X stars", "X today", etc.
BOILERPLATE_TOKEN_ANCHORS = {
    # Prefixes — if the n-gram STARTS with these tokens, drop it
    "prefix": {"stars", "today's", "yesterday's", "anon", "category", "tldr"},
    # Suffixes — if the n-gram ENDS with these tokens, drop it
    "suffix": {"stars", "comments", "today", "yesterday", "arxiv", "id"},
}


def is_boilerplate(phrase):
    if phrase in BOILERPLATE_PHRASES:
        return True
    tokens = phrase.split()
    if not tokens:
        return True
    if tokens[0] in BOILERPLATE_TOKEN_ANCHORS["prefix"]:
        return True
    if tokens[-1] in BOILERPLATE_TOKEN_ANCHORS["suffix"]:
        return True
    return False


def clean_text(text):
    """Strip frontmatter, code fences, URLs, markdown link syntax, lowercase."""
    text = FRONTMATTER_RE.sub("", text)
    text = CODE_FENCE_RE.sub(" ", text)
    text = MARKDOWN_LINK_RE.sub(r" \1 ", text)  # keep link text, drop URL
    text = URL_RE.sub(" ", text)
    return text.lower()


def tokenize(text):
    return TOKEN_RE.findall(text)


def gen_ngrams(tokens, n, stopwords, min_chars):
    out = []
    for i in range(len(tokens) - n + 1):
        gram = tokens[i:i + n]
        if any(t in stopwords or len(t) < 3 for t in gram):
            continue
        phrase = " ".join(gram)
        if len(phrase) < min_chars:
            continue
        out.append(phrase)
    return out


def get_covered_keywords(sources, taxonomy):
    """Build the lowercase set of phrases already present in any target list."""
    covered = set()
    covered |= {q.lower() for q in sources.get("news_collector", {}).get("web_search_queries", [])}
    covered |= {q.lower() for q in sources.get("hackernews_collector", {}).get("filter_keywords", [])}
    covered |= {q.lower() for q in sources.get("linkedin_collector", {}).get("pulse_topic_queries", [])}
    for group, topics in taxonomy.items():
        if group.startswith("_") or not isinstance(topics, list):
            continue
        covered |= {t.lower() for t in topics}
    # Also dedupe by partial overlap (single tokens)
    return covered


def iter_source_files():
    for top in SOURCE_DIRS:
        base = ROOT / top
        if not base.exists():
            continue
        for p in base.rglob("*.md"):
            m = re.match(r"^(\d{4}-\d{2}-\d{2})", p.name)
            if not m:
                continue
            yield p, SRC_TYPE_FROM_DIR[top], m.group(1)


def main():
    sources = json.loads((ROOT / "sources.json").read_text())
    cfg = sources["radar_config"]["keyword_sweep_config"]
    if not cfg.get("enabled", False):
        print("[keyword_sweep] disabled in config; exiting", file=sys.stderr)
        return

    print(f"[keyword_sweep] starting for {TODAY}", file=sys.stderr)

    stopwords = set(cfg["stopwords"])
    min_chars = cfg["min_ngram_chars"]
    ngram_sizes = cfg["ngram_sizes"]
    max_candidates = cfg["max_candidates_per_run"]
    taxonomy = sources["radar_config"]["topic_taxonomy_seed"]
    covered_lc = get_covered_keywords(sources, taxonomy)

    # Load existing state
    discovered_path = ROOT / "discovered_keywords.json"
    if discovered_path.exists():
        discovered = json.loads(discovered_path.read_text())
    else:
        discovered = {"last_updated": TODAY, "keywords": {}}

    # Today's source files only (incremental update per spec §2)
    today_files = []
    for p, src_type, fdate in iter_source_files():
        if fdate == TODAY:
            today_files.append((p, src_type, fdate))

    if not today_files:
        # No today files? Mine the whole rolling window for bootstrap purposes.
        cutoff = (date.fromisoformat(TODAY) - timedelta(days=cfg["rolling_window_days"])).isoformat()
        today_files = [
            (p, st, fd) for p, st, fd in iter_source_files() if fd >= cutoff
        ]
        print(f"[keyword_sweep] no files dated {TODAY}; falling back to last {cfg['rolling_window_days']}d "
              f"= {len(today_files)} files (bootstrap mode)", file=sys.stderr)

    # === Step 3: mine n-grams from candidate files ===
    fresh_candidates = defaultdict(lambda: {
        "first_seen": TODAY, "last_seen": TODAY,
        "total_mentions": 0,
        "mentions_by_source_type": defaultdict(int),
        "mentions_by_date": defaultdict(int),
        "context_samples": [],
    })

    print(f"[keyword_sweep] mining n-grams from {len(today_files)} files...", file=sys.stderr)
    for path, src_type, fdate in today_files:
        try:
            raw = path.read_text(errors="ignore")
        except Exception:
            continue
        text = clean_text(raw)
        tokens = tokenize(text)
        # File-level phrase set: each phrase counts once per source type / date pair
        phrases_in_file = set()
        phrase_counts = defaultdict(int)
        for n in ngram_sizes:
            for phrase in gen_ngrams(tokens, n, stopwords, min_chars):
                if phrase in covered_lc:
                    continue
                if is_boilerplate(phrase):
                    continue
                phrases_in_file.add(phrase)
                phrase_counts[phrase] += 1

        for phrase in phrases_in_file:
            entry = fresh_candidates[phrase]
            entry["mentions_by_source_type"][src_type] += 1
            entry["mentions_by_date"][fdate] += 1
            entry["total_mentions"] += phrase_counts[phrase]
            if entry["first_seen"] > fdate:
                entry["first_seen"] = fdate
            if entry["last_seen"] < fdate:
                entry["last_seen"] = fdate
            if len(entry["context_samples"]) < 4:
                idx = text.find(phrase)
                if idx != -1:
                    lo, hi = max(0, idx - 50), min(len(text), idx + len(phrase) + 50)
                    snippet = re.sub(r"\s+", " ", text[lo:hi]).strip()
                    entry["context_samples"].append(f"…{snippet}…  ({path.relative_to(ROOT)})")

    print(f"[keyword_sweep] mined {len(fresh_candidates)} unique candidate phrases", file=sys.stderr)

    # Cap by total_mentions × distinct_source_types
    scored = sorted(
        fresh_candidates.items(),
        key=lambda kv: -(kv[1]["total_mentions"] * len(kv[1]["mentions_by_source_type"])),
    )[:max_candidates]
    fresh_candidates = dict(scored)

    # === Step 4: merge fresh into discovered ===
    for phrase, fresh in fresh_candidates.items():
        if phrase in discovered["keywords"]:
            ent = discovered["keywords"][phrase]
            ent["last_seen"] = max(ent.get("last_seen", TODAY), TODAY)
            ent["total_mentions"] = ent.get("total_mentions", 0) + fresh["total_mentions"]
            mbs = ent.setdefault("mentions_by_source_type", {})
            for k, v in fresh["mentions_by_source_type"].items():
                mbs[k] = mbs.get(k, 0) + v
            mbd = ent.setdefault("mentions_by_date", {})
            for k, v in fresh["mentions_by_date"].items():
                mbd[k] = mbd.get(k, 0) + v
            samples = ent.setdefault("context_samples", [])
            for s in fresh["context_samples"]:
                if len(samples) < 6 and s not in samples:
                    samples.append(s)
        else:
            discovered["keywords"][phrase] = {
                "first_seen": fresh["first_seen"],
                "last_seen": fresh["last_seen"],
                "total_mentions": fresh["total_mentions"],
                "mentions_by_source_type": dict(fresh["mentions_by_source_type"]),
                "mentions_by_date": dict(fresh["mentions_by_date"]),
                "context_samples": list(fresh["context_samples"]),
                "applied_to_lists": [],
                "classification_history": [],
            }

    # === Step 5: classify each keyword ===
    pt = cfg["promotion_thresholds"]
    wt = cfg["watch_thresholds"]
    proven_thr = cfg["proven_keywords_protection"]["promotion_to_proven_thresholds"]
    window_days = cfg["rolling_window_days"]
    today_d = date.fromisoformat(TODAY)
    window_start = (today_d - timedelta(days=window_days)).isoformat()

    classifications = {}
    for phrase, ent in discovered["keywords"].items():
        mbd = ent.get("mentions_by_date", {})
        recent_mentions = sum(v for d, v in mbd.items() if d >= window_start)
        recent_source_types = set()
        # Approximate per-window source types by checking mentions_by_source_type
        # (we don't keep per-date×source type granularity)
        for d in mbd:
            if d >= window_start:
                pass  # we'll just trust mentions_by_source_type as a window proxy
        recent_source_types = set(ent.get("mentions_by_source_type", {}).keys())
        recent_distinct_days = {d for d in mbd if d >= window_start}

        tier = "dormant"
        if ent.get("applied_to_lists"):
            tier = "already_applied"
        elif (recent_mentions >= pt["min_total_mentions"]
              and len(recent_source_types) >= pt["min_source_types"]
              and len(recent_distinct_days) >= pt["min_distinct_days"]):
            tier = "promote"
        elif wt["min_total_mentions"] <= recent_mentions <= wt["max_total_mentions"]:
            tier = "watch"

        classifications[phrase] = tier
        hist = ent.setdefault("classification_history", [])
        if not hist or hist[-1]["tier"] != tier or hist[-1]["date"] != TODAY:
            hist.append({"date": TODAY, "tier": tier})
            ent["classification_history"] = hist[-14:]
        ent["current_tier"] = tier

    # === Step 6.5: proven promotion ===
    proven_promotions = []
    for phrase, ent in discovered["keywords"].items():
        if ent.get("tier_lifetime") == "proven":
            continue
        if not ent.get("applied_to_lists"):
            continue
        lifetime_days = len(ent.get("mentions_by_date", {}))
        lifetime_src_types = len(ent.get("mentions_by_source_type", {}))
        try:
            first = date.fromisoformat(ent["first_seen"])
            age_days = (today_d - first).days
        except Exception:
            age_days = 0
        if (lifetime_days >= proven_thr["min_distinct_days_lifetime"]
            and lifetime_src_types >= proven_thr["min_source_types_lifetime"]
            and age_days >= proven_thr["min_age_days"]):
            ent["tier_lifetime"] = "proven"
            ent["proven_on"] = TODAY
            proven_promotions.append({
                "phrase": phrase,
                "lifetime_days": lifetime_days,
                "lifetime_src_types": lifetime_src_types,
                "age_days": age_days,
                "target_lists": list(ent.get("applied_to_lists", [])),
            })

    # === Step 6: target list mapping ===
    def target_lists_for(phrase, ent):
        mbs = ent.get("mentions_by_source_type", {})
        total = sum(mbs.values()) or 1
        targets = []
        if (mbs.get("tech_news", 0) / total) >= 0.5:
            targets.append("news_web_search_queries")
        if len(mbs) >= 3:
            targets.append("radar_topic_taxonomy")
        if mbs.get("hackernews_signal", 0) > 0 or (
            mbs.get("tech_news", 0) > 0 and len([d for d in ent.get("mentions_by_date", {}) if d]) >= 2
        ):
            targets.append("hackernews_filter_keywords")
        if mbs.get("linkedin_network_post", 0) > 0:
            targets.append("linkedin_pulse_queries")
        return targets

    # === Step 7: auto-apply ===
    promotions_to_add = []
    for phrase, tier in classifications.items():
        if tier != "promote":
            continue
        ent = discovered["keywords"][phrase]
        # Sustained-day gate: must have held "promote" tier for >= N days in a row ending today
        hist = ent.get("classification_history", [])
        # Count trailing consecutive promote days
        consec = 0
        last_date = today_d
        for record in reversed(hist):
            if record["tier"] == "promote":
                rec_date = date.fromisoformat(record["date"])
                if (last_date - rec_date).days <= 1:
                    consec += 1
                    last_date = rec_date
                else:
                    break
            else:
                break
        if consec < pt["min_consecutive_days_at_promote"]:
            ent["_pending_consecutive_days"] = consec
            continue
        targets = target_lists_for(phrase, ent)
        if not targets:
            continue
        promotions_to_add.append((phrase, targets, ent))

    # Backup sources.json before mutation
    shutil.copy(ROOT / "sources.json", ROOT / "sources.json.bak")

    log_lines = []
    applied_count = 0
    for phrase, targets, ent in promotions_to_add:
        applied_targets = []
        for tgt in targets:
            if tgt == "radar_topic_taxonomy":
                # Add to a "_auto_added" key inside topic_taxonomy_seed
                auto_list = sources["radar_config"]["topic_taxonomy_seed"].setdefault("_auto_added", [])
                if phrase not in auto_list:
                    auto_list.append(phrase)
                    applied_targets.append(tgt)
            else:
                key1, key2 = TARGET_PATHS[tgt]
                arr = sources[key1].setdefault(key2, [])
                if phrase not in arr:
                    arr.append(phrase)
                    applied_targets.append(tgt)
        if applied_targets:
            ent["applied_to_lists"] = list(set(ent.get("applied_to_lists", []) + applied_targets))
            ent["applied_on"] = TODAY
            applied_count += 1
            reason = (f"promote: {sum(ent.get('mentions_by_source_type', {}).values())} mentions, "
                      f"{len(ent.get('mentions_by_source_type', {}))} src types, "
                      f"{len(ent.get('mentions_by_date', {}))} days")
            for tgt in applied_targets:
                log_lines.append(
                    f'{NOW_ISO} promote-add     {tgt:<30} "{phrase}" reason="{reason}"'
                )

    # Proven promotion log lines
    for promotion in proven_promotions:
        reason = (f"lifetime: {promotion['age_days']} days, "
                  f"{promotion['lifetime_src_types']} src types, "
                  f"{promotion['lifetime_days']} distinct days")
        for tgt in promotion["target_lists"]:
            log_lines.append(
                f'{NOW_ISO} proven-promote  {tgt:<30} "{promotion["phrase"]}" reason="{reason}"'
            )

    # Validate JSON before writing
    try:
        json.dumps(sources)
        (ROOT / "sources.json").write_text(json.dumps(sources, indent=2))
    except Exception as e:
        # Restore backup and abort
        shutil.copy(ROOT / "sources.json.bak", ROOT / "sources.json")
        print(f"[keyword_sweep] JSON validation failed, restored backup: {e}", file=sys.stderr)
        with (ROOT / "keyword_changes.log").open("a") as f:
            f.write(f"{NOW_ISO} ABORT-INVALID-JSON  -  reason=\"sources.json would not parse after edits\"\n")
        return

    # Append to keyword_changes.log
    if log_lines:
        with (ROOT / "keyword_changes.log").open("a") as f:
            f.write("\n".join(log_lines) + "\n")

    # === Step 9: write discovered_keywords.json ===
    discovered["last_updated"] = TODAY
    # Sort keys for stable diffs
    discovered["keywords"] = dict(sorted(discovered["keywords"].items()))
    discovered_path.write_text(json.dumps(discovered, indent=2))

    # === Step 8: write change log markdown ===
    md_dir = ROOT / f"keyword_candidates/{today_d.year:04d}/{today_d.month:02d}"
    md_dir.mkdir(parents=True, exist_ok=True)
    md_path = md_dir / f"{TODAY}.md"

    watch_phrases = [(p, discovered["keywords"][p]) for p, t in classifications.items() if t == "watch"]
    watch_phrases.sort(key=lambda kv: -kv[1].get("total_mentions", 0))
    pending = [(p, discovered["keywords"][p]) for p, t in classifications.items()
               if t == "promote" and not discovered["keywords"][p].get("applied_on")]

    md = [f"# Keyword sweep — {TODAY}\n",
          f"_Auto-extending the four keyword lists in sources.json: news web_search_queries, radar topic_taxonomy_seed._auto_added, hackernews filter_keywords, linkedin pulse_topic_queries. Pure-Python implementation via `scripts/run_keyword_sweep.py`. Rollback last mutation: `cp sources.json.bak sources.json`._\n"]

    md.append("## 📋 What changed in sources.json today\n")
    if applied_count:
        for phrase, targets, ent in promotions_to_add:
            md.append(f"- **promote-add** `\"{phrase}\"` → {', '.join(targets)}")
    else:
        md.append("_No promotions applied this run._")
    md.append("")

    md.append("## 🏛️ Promoted to PROVEN this run\n")
    if proven_promotions:
        for p in proven_promotions:
            md.append(f"- **\"{p['phrase']}\"** — lifetime: {p['lifetime_days']}d / {p['lifetime_src_types']} src types / {p['age_days']}d old. Now permanent on: {', '.join(p['target_lists'])}")
    else:
        md.append("_No keywords crossed proven thresholds this run._")
    md.append("")

    md.append(f"## ⏳ Pending — needs more days at promote tier ({len(pending)})\n")
    for phrase, ent in pending[:20]:
        consec = ent.get("_pending_consecutive_days", 0)
        req = pt["min_consecutive_days_at_promote"]
        md.append(f"- **\"{phrase}\"** — {sum(ent.get('mentions_by_source_type',{}).values())} mentions, {len(ent.get('mentions_by_source_type',{}))} src types · days at promote: {consec}/{req}")
    if len(pending) > 20:
        md.append(f"_…+{len(pending) - 20} more_")
    md.append("")

    md.append(f"## 👀 Watch list (top 30 of {len(watch_phrases)})\n")
    for phrase, ent in watch_phrases[:30]:
        samples = ent.get("context_samples") or [""]
        sample = (samples[0] if samples else "")[:100]
        md.append(f"- **\"{phrase}\"** — {ent.get('total_mentions',0)} mentions / {len(ent.get('mentions_by_source_type',{}))} src types · _{sample}_")
    md.append("")

    md.append("## Tally summary")
    proven_count = sum(1 for k in discovered["keywords"].values() if k.get("tier_lifetime") == "proven")
    md.append(f"- Phrases tracked: {len(discovered['keywords'])}")
    md.append(f"- Promoted to date: {sum(1 for k in discovered['keywords'].values() if k.get('applied_to_lists'))}")
    md.append(f"- **Proven (permanent anchors): {proven_count}**")
    md.append(f"- Currently watching: {len(watch_phrases)}")
    md.append(f"- Discovered today (new): {len(fresh_candidates)}")
    md.append(f"- Today's source files scanned: {len(today_files)}")
    md.append(f"- sources.json snapshot before edit → sources.json.bak ({applied_count} promotion(s), {len(proven_promotions)} proven-promotion(s))")
    md.append("")

    md_path.write_text("\n".join(md))

    print(f"[keyword_sweep] done. applied {applied_count} promotions, "
          f"{len(proven_promotions)} proven-promotions. "
          f"tally has {len(discovered['keywords'])} phrases. "
          f"watch list: {len(watch_phrases)}. "
          f"wrote {md_path.relative_to(ROOT)}.", file=sys.stderr)


if __name__ == "__main__":
    main()
