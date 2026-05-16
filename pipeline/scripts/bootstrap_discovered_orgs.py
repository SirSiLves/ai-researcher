#!/usr/bin/env python3
"""
One-shot bootstrap for the ai-vendor-sweep skill.

Mines all existing source files (news/, blogs/, papers/, jobs/, linkedin/, daily/)
for mentions of orgs from scripts/seed_orgs.json, and writes a running tally to
discovered_orgs.json. From the next sweep run forward, the skill takes over and
appends new orgs incrementally.

Idempotent: re-running rebuilds the tally from scratch. No external dependencies.
"""
import json
import os
import re
import sys
from collections import defaultdict
from pathlib import Path
from datetime import date


# AI/ML keyword set for context_required orgs (Sierra, Pi, etc.). At least one
# of these must appear in the same file as the org name for the match to count.
AI_CONTEXT_KEYWORDS = {
    "ai", "ml", "llm", "rag", "agent", "agents", "model", "models", "gen ai",
    "generative", "machine learning", "deep learning", "neural", "transformer",
    "openai", "anthropic", "claude", "gpt", "gemini", "fine-tun", "embedding",
    "vector", "retrieval", "inference", "tokens", "prompt", "frontier", "mcp",
    "copilot", "training data", "foundation model", "alignment", "safety",
    "agentic", "autonomous agent", "kuenstliche intelligenz", "künstliche",
}


# Map file-path prefix → source_type slug used elsewhere in the pipeline.
SOURCE_TYPE_BY_DIR = {
    "news": "tech_news",
    "papers": "paper",
    "blogs": "long_form_blog",
    "jobs": "job_posting_skill_mention",
    "linkedin": "linkedin_network_post",
    "daily": "daily_synthesis",
}


def alias_pattern(alias: str) -> re.Pattern:
    """Whole-word, case-insensitive match. Allows dots, hyphens, spaces inside aliases."""
    # Escape, but preserve internal whitespace as flexible whitespace
    escaped = re.escape(alias)
    # Word boundary on letter sides; for tokens starting/ending with punctuation, use lookarounds.
    return re.compile(rf"(?<![A-Za-z0-9_]){escaped}(?![A-Za-z0-9_])", re.IGNORECASE)


def has_ai_context(text: str) -> bool:
    lower = text.lower()
    return any(kw in lower for kw in AI_CONTEXT_KEYWORDS)


def collect_source_files(root: Path):
    """Yield (rel_path, source_type, file_date) for every collector output file."""
    for top, src_type in SOURCE_TYPE_BY_DIR.items():
        d = root / top
        if not d.exists():
            continue
        for p in d.rglob("*.md"):
            base = p.stem  # 2026-05-08
            try:
                fdate = date.fromisoformat(base)
            except ValueError:
                continue
            yield p.relative_to(root).as_posix(), src_type, fdate.isoformat()


def main():
    pipeline_dir = Path(__file__).resolve().parent.parent  # pipeline/
    repo_root = pipeline_dir.parent
    data_root = repo_root / "data"
    state_dir = pipeline_dir / "state"
    seed_path = pipeline_dir / "scripts" / "seed_orgs.json"
    sources_path = state_dir / "sources.json"
    out_path = state_dir / "discovered_orgs.json"
    # NOTE: This is a one-shot bootstrap artifact. After the 2026-05-16 publish/
    # research restructure, the source folders moved (`daily/` → `publish/daily/`,
    # the others → `research/sources/`). Re-running this script today will yield
    # an empty tally because it walks the pre-restructure tree on purpose. The
    # canonical, current source-walking helper is `_lib.iter_source_files()`.
    root = data_root

    with open(seed_path) as f:
        seed = json.load(f)
    with open(sources_path) as f:
        sources = json.load(f)

    seed_orgs = seed["orgs"]
    # Cross-reference: which slugs are already covered by ANY list (priority / enterprise / vendor_blogs / governance_sources / long_form_blogs).
    priority_keys = set(sources["news_collector"]["priority_vendors"].keys())
    enterprise_keys = set(sources["news_collector"]["enterprise_vendors"].keys())

    # Build a coarse "URL host" → True set for the URL-based lists
    def url_host(u):
        m = re.match(r"https?://([^/]+)", u)
        return m.group(1).lower().replace("www.", "") if m else None

    covered_hosts = set()
    for u in sources["news_collector"].get("vendor_blogs", []):
        h = url_host(u); covered_hosts.add(h) if h else None
    for u in sources["news_collector"].get("tech_news_sites", []):
        h = url_host(u); covered_hosts.add(h) if h else None
    for u in sources["news_collector"].get("swiss_sources", []):
        h = url_host(u); covered_hosts.add(h) if h else None
    for u in sources["news_collector"].get("governance_sources", []):
        h = url_host(u); covered_hosts.add(h) if h else None
    for u in sources.get("blogs_collector", {}).get("long_form_blogs", []):
        h = url_host(u); covered_hosts.add(h) if h else None

    # Build alias → org_slug map and compile patterns
    alias_index = {}
    patterns = {}
    for slug, meta in seed_orgs.items():
        for alias in meta.get("aliases", []):
            alias_index[alias] = slug
            patterns[alias] = alias_pattern(alias)

    # Tally
    org_data = defaultdict(lambda: {
        "first_seen": None,
        "last_seen": None,
        "total_mentions": 0,
        "mentions_by_source_type": defaultdict(int),
        "mentions_by_date": defaultdict(int),
        "distinct_days": set(),
        "distinct_source_types": set(),
        "first_seen_in_file": None,
        "context_samples": [],
        "alias_hits": defaultdict(int),
    })

    files = list(collect_source_files(root))
    print(f"Scanning {len(files)} source files for {len(seed_orgs)} orgs ({len(patterns)} aliases)…")

    for rel_path, src_type, fdate in files:
        try:
            text = (root / rel_path).read_text(errors="ignore")
        except Exception:
            continue
        ai_ok = has_ai_context(text)
        text_lower_sample = text[:8000]  # for context samples

        for alias, pat in patterns.items():
            slug = alias_index[alias]
            meta = seed_orgs[slug]
            if meta.get("context_required") and not ai_ok:
                continue
            matches = pat.findall(text)
            n = len(matches)
            if n == 0:
                continue

            d = org_data[slug]
            d["total_mentions"] += n
            d["mentions_by_source_type"][src_type] += n
            d["mentions_by_date"][fdate] += n
            d["distinct_days"].add(fdate)
            d["distinct_source_types"].add(src_type)
            d["alias_hits"][alias] += n
            if d["first_seen"] is None or fdate < d["first_seen"]:
                d["first_seen"] = fdate
                d["first_seen_in_file"] = rel_path
            if d["last_seen"] is None or fdate > d["last_seen"]:
                d["last_seen"] = fdate
            # Capture one short context sample per file (first match's neighborhood)
            if len(d["context_samples"]) < 3:
                m = pat.search(text_lower_sample)
                if m:
                    s = max(0, m.start() - 60)
                    e = min(len(text_lower_sample), m.end() + 90)
                    snippet = re.sub(r"\s+", " ", text_lower_sample[s:e].strip())
                    d["context_samples"].append(f"…{snippet}…  ({rel_path})")

    # Serialize: convert sets to sorted lists, defaultdicts to dicts
    out_orgs = {}
    for slug, d in org_data.items():
        meta = seed_orgs[slug]
        in_priority = slug in priority_keys
        in_enterprise = slug in enterprise_keys
        # Also do a fuzzy match for the redhat_ibm key etc.
        if not (in_priority or in_enterprise):
            for k in priority_keys | enterprise_keys:
                if slug in k or k in slug:
                    if slug != k:
                        in_priority = in_priority or (k in priority_keys and (slug in k or k.startswith(slug)))
                        in_enterprise = in_enterprise or (k in enterprise_keys and (slug in k or k.startswith(slug)))
        # URL-based coverage: extract the host from blog_url_hint and check if covered_hosts has it
        blog_host = url_host(meta.get("blog_url_hint", "") or "")
        in_url_lists = bool(blog_host and (blog_host in covered_hosts or any(blog_host.endswith("." + h) or h.endswith("." + blog_host) for h in covered_hosts)))
        if in_priority:
            coverage = "priority"
        elif in_enterprise:
            coverage = "enterprise"
        elif in_url_lists:
            coverage = "informal_url_list"
        else:
            coverage = "uncovered"
        out_orgs[slug] = {
            "tier_hint": meta.get("tier_hint"),
            "region": meta.get("region"),
            "blog_url_hint": meta.get("blog_url_hint"),
            "coverage": coverage,
            "first_seen": d["first_seen"],
            "last_seen": d["last_seen"],
            "total_mentions": d["total_mentions"],
            "distinct_days": len(d["distinct_days"]),
            "distinct_source_types": sorted(d["distinct_source_types"]),
            "mentions_by_source_type": dict(d["mentions_by_source_type"]),
            "mentions_by_date": dict(d["mentions_by_date"]),
            "alias_hits": dict(d["alias_hits"]),
            "first_seen_in_file": d["first_seen_in_file"],
            "context_samples": d["context_samples"],
        }

    # Top-level metadata
    today = max((d.get("last_seen") for d in out_orgs.values() if d.get("last_seen")), default=None)
    payload = {
        "_purpose": "Running tally of org mentions across all source files. Bootstrapped from scripts/seed_orgs.json. The ai-vendor-sweep skill updates this daily by appending mentions from new source files and classifying orgs into promote/watch/silent/hot tiers.",
        "_bootstrap": True,
        "_bootstrap_seed_size": len(seed_orgs),
        "_bootstrap_files_scanned": len(files),
        "last_updated": today,
        "orgs": out_orgs,
    }

    with open(out_path, "w") as f:
        json.dump(payload, f, indent=2, default=str)

    # Stats
    hit_count = len(out_orgs)
    uncovered = [s for s, v in out_orgs.items() if v["coverage"] == "uncovered"]
    promotion_candidates = [
        (s, v) for s, v in out_orgs.items()
        if v["coverage"] == "uncovered"
        and v["total_mentions"] >= 8
        and len(v["distinct_source_types"]) >= 3
        and v["distinct_days"] >= 4
    ]
    print(f"\nResult: {hit_count} orgs mentioned (of {len(seed_orgs)} seeded)")
    print(f"  Covered (priority): {sum(1 for v in out_orgs.values() if v['coverage'] == 'priority')}")
    print(f"  Covered (enterprise): {sum(1 for v in out_orgs.values() if v['coverage'] == 'enterprise')}")
    print(f"  Covered (informal URL list): {sum(1 for v in out_orgs.values() if v['coverage'] == 'informal_url_list')}")
    print(f"  Uncovered: {len(uncovered)}")
    print(f"  Promotion candidates (≥8 mentions, ≥3 src types, ≥4 distinct days): {len(promotion_candidates)}")
    if promotion_candidates:
        promotion_candidates.sort(key=lambda kv: -kv[1]["total_mentions"])
        print("\nTop promotion candidates:")
        for slug, v in promotion_candidates[:15]:
            srcs = ",".join(v["distinct_source_types"])
            print(f"  {slug:24} {v['total_mentions']:3} mentions · {v['distinct_days']}d · {srcs}  → {v.get('blog_url_hint','')}")
    print(f"\nWrote {out_path.relative_to(root)}")


if __name__ == "__main__":
    main()
