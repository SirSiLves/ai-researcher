#!/usr/bin/env python3
"""Build the github/{YYYY}/{MM}/{TODAY}.md file + update github_stars.json."""
import json
import re
import sys
from pathlib import Path

ROOT = Path("/sessions/exciting-youthful-maxwell/mnt/AI Researcher")
SOURCES = ROOT / "pipeline/state/sources.json"
STATE = ROOT / "pipeline/state/github_stars.json"
DATA = ROOT / "data"
TODAY = "2026-05-25"
YYYY = "2026"
MM = "05"
ISO_TS = "2026-05-25T18:06:18+00:00"
OUT = DATA / f"github/{YYYY}/{MM}/{TODAY}.md"

d = json.load(open("/tmp/gh_collect.json"))
state = json.load(open(STATE))
sources = json.load(open(SOURCES))
gc = sources["github_collector"]
watched_input = gc["watched_repos"]

# ---------- Category classifier ----------
AGENT_FRAMEWORK = ["agent framework", "managed agents", "agent platform", "multi-agent", "autogen", "crewai", "agent stack", "agent toolkit", "agent harness"]
CODING_AGENT = ["claude code", "codex", "coding agent", "pair programming", "cli", "vscode", "cursor", "gemini cli", "opencode", "ide", "tui", "terminal"]
MCP = ["mcp", "model context protocol"]
SKILLS = ["skill", "plugin", "claude.md", "claude-plugins", ".md file"]
INFERENCE = ["inference", "serving", "vllm", "llama.cpp", "ollama", "gpu", "throughput"]
RAG = ["rag", "retrieval", "vector", "embedding"]
MODEL_WEIGHTS = ["model weights", "foundation model", "pretrained", "open-weight", "open weights"]
EVAL = ["eval", "benchmark", "observability", "tracing", "phoenix", "langfuse"]
DEV_TOOL = ["dev tool", "developer tool", "scaffolding", "boilerplate", "browser", "web scrap"]
EDUCATION = ["course", "tutorial", "learn", "from scratch", "guide", "roadmap"]
RESEARCH = ["research", "academic", "paper"]
GOVERNANCE = ["governance", "policy", "safety", "compliance"]


def classify(desc: str, name: str) -> str:
    t = (desc + " " + name).lower()
    if any(k in t for k in MCP):
        return "MCP server / tool"
    if any(k in t for k in SKILLS):
        return "skills / plugins"
    if any(k in t for k in CODING_AGENT):
        return "coding agent / dev tool"
    if any(k in t for k in AGENT_FRAMEWORK):
        return "agent framework"
    if any(k in t for k in INFERENCE):
        return "inference / serving"
    if any(k in t for k in RAG):
        return "RAG infra"
    if any(k in t for k in MODEL_WEIGHTS):
        return "model weights"
    if any(k in t for k in EVAL):
        return "eval / observability"
    if any(k in t for k in GOVERNANCE):
        return "AI governance / safety"
    if any(k in t for k in EDUCATION):
        return "education / training"
    if any(k in t for k in RESEARCH):
        return "research / academic"
    if any(k in t for k in DEV_TOOL):
        return "dev tool"
    return "other"


# ---------- AI relevance filter ----------
AI_KW = re.compile(
    r"\b(ai|llm|llms|gpt|claude|gemini|anthropic|openai|agent|agentic|rag|mcp|"
    r"transformer|model[s]?|inference|embedding|vector|prompt|"
    r"finetun|fine-tun|huggingface|ollama|vllm|langchain|llama|"
    r"deepseek|qwen|mistral|kimi|cursor|copilot|codex|coding agent|"
    r"semantic kernel|skills|plugin|chat|vibe|knowledge graph|"
    r"agents|multi-agent|workflow|automation|chatgpt|foundation model|"
    r"prompt engineering|context|memory|tool use|tool calling|browser-use|"
    r"scraping|terminal|tui|cli|sdk|toolkit|harness)\b",
    re.IGNORECASE,
)

EXCLUDE_KW = re.compile(
    r"\b(bitwarden|password manager|paperless|document management|"
    r"photo and video|cryptocurrency only|game engine|salesforce alternative|"
    r"video downloader|vpn|proxy platform)\b",
    re.IGNORECASE,
)


def is_ai(desc: str, name: str) -> bool:
    t = desc + " " + name
    if not desc and not name:
        return False
    if AI_KW.search(t):
        return True
    # name patterns: claude, gpt, llm, agent, mcp anywhere
    if re.search(r"(claude|gpt|llm|agent|mcp|rag|prompt|skill|chat)", name, re.IGNORECASE):
        return True
    return False


# ---------- Build trending list ----------
# Tag each repo with the source type: 'trending' (has stars_today) or 'topic-only'
trending_map = d["trending_map"]

# Mark which repos came from a trending page (have real stars_today)
trending_page_slugs = set()
for u, blob in d["results"]["trending"].items():
    for r in blob["items"]:
        trending_page_slugs.add(r["full_name"])

trending = []
for slug, r in trending_map.items():
    desc = (r.get("description") or "").strip()
    if not is_ai(desc, r.get("name", "")):
        continue
    if EXCLUDE_KW.search(desc):
        if not (re.search(r"\b(ai agent|llm|claude|gpt|coding agent|rag|mcp)\b", desc, re.IGNORECASE)):
            continue
    total = r.get("total_stars") or 0
    today_s = r.get("stars_today") or 0
    is_trending_page = slug in trending_page_slugs
    # Score: prioritize today's delta heavily; topic-only repos get a much smaller signal
    # so they don't crowd out actual movers. They still surface if they're huge or
    # if no trending repos exist.
    if is_trending_page:
        score = min(today_s, 2000) + 0.05 * total
    else:
        # topic-only: only consider if total_stars is exceptional, and heavily discount
        score = 0.005 * total
    trending.append(
        {
            "slug": slug,
            "owner": r["owner"],
            "name": r["name"],
            "lang": r.get("language") or "-",
            "desc": desc,
            "total": total,
            "today": today_s,
            "score": score,
            "category": classify(desc, r["name"]),
            "from_trending_page": is_trending_page,
        }
    )
trending.sort(key=lambda x: -x["score"])
# Keep top 25, but require at least some signal: drop topic-only repos with score < 200
trending = [t for t in trending if t["score"] >= 30][:25]

# ---------- Build watched movers ----------
prior_repos = state.get("repos", {})
movers = []
for slug, info in d["results"]["watched"].items():
    stars = info["stars"]
    prior = prior_repos.get(slug, {})
    prior_today = prior.get("current_stars")
    delta = None
    if stars is not None and prior_today is not None:
        delta = stars - prior_today
    delta7 = None
    if stars is not None and prior.get("stars_history"):
        history = prior["stars_history"]
        if len(history) >= 7:
            old = history[-7]["stars"]
            delta7 = stars - old
        elif len(history) >= 1:
            old = history[0]["stars"]
            delta7 = stars - old
    movers.append(
        {
            "slug": slug,
            "stars": stars,
            "delta": delta,
            "delta7": delta7,
        }
    )

# Filter: skip delta < 50 unless trailing 7d accelerated (delta > delta7/7)
def keep_mover(m):
    if m["delta"] is None:
        return False
    if m["delta"] >= 50:
        return True
    if m["delta7"] and m["delta7"] / 7 < m["delta"]:
        return True
    return False

movers_kept = [m for m in movers if keep_mover(m)]
movers_kept.sort(key=lambda m: -(m["delta"] or 0))
movers_kept = movers_kept[:15]

# ---------- Context heuristic for movers ----------
def context_for(m, prior_lookup):
    d1 = m["delta"]
    d7 = m["delta7"]
    avg7 = (d7 / 7) if d7 else 0
    if d1 >= 1500:
        return "Major surge — likely viral post / launch / conference signal."
    if d1 >= 500:
        return "Strong day-over-day growth — investigate for release or media mention."
    if d7 and d7 >= 1500:
        return "Strong week-over-week momentum — sustained interest."
    if avg7 and d1 > avg7 * 1.5:
        return "Acceleration above trailing 7d average — fresh catalyst likely."
    return "Healthy steady accumulation."

# ---------- Why-notable line ----------
def why_notable(t):
    return t["category"]

# ---------- Cumulative tally ----------
n_total = len(d["results"]["watched"])
n_with_delta = sum(1 for m in movers if m["delta"] is not None)
n_first = sum(1 for m in movers if m["delta"] is None and m["stars"] is not None)

# new repos to consider: trending top-25 not in watched_repos
watched_set = set(watched_input) | set(gc.get("deep_watch_repos", []))
new_candidates = []
# Per spec: any trending repo in today's top 5 not already on the watch list.
# Also surface any trending-page repo with today >= 300 stars not on the watch list.
for t in trending[:5]:
    if t["slug"] not in watched_set:
        new_candidates.append(t["slug"])
for t in trending:
    if t["from_trending_page"] and t["today"] >= 300 and t["slug"] not in watched_set and t["slug"] not in new_candidates:
        new_candidates.append(t["slug"])
new_candidates = new_candidates[:8]

# ---------- Sources scanned ----------
src_lines = []
for u, b in d["results"]["trending"].items():
    src_lines.append((u, len(b["items"]), b["error"]))
for u, b in d["results"]["topics"].items():
    src_lines.append((u, len(b["items"]), b["error"]))
# stable order: list in original config order
ordered_urls = gc["trending_pages"] + gc["ai_topic_pages"]
ordered_src = []
src_map = {u: (n, e) for u, n, e in src_lines}
for u in ordered_urls:
    if u in src_map:
        n, e = src_map[u]
        ordered_src.append((u, n, e))
n_watched_total = len(d["results"]["watched"])
n_watched_ok = sum(1 for v in d["results"]["watched"].values() if v["stars"] is not None)
n_watched_fail = n_watched_total - n_watched_ok

# ---------- Build markdown ----------
lines = []
lines.append(f"# GitHub signal — {TODAY}")
lines.append("")
lines.append("_Trending repos + curated watch-list deltas. Earlier signal than blogs/news. The orchestrator's daily digest cites this file._")
lines.append("")
lines.append(f"## Top trending today ({len(trending)})")
lines.append("")
for t in trending:
    lines.append(
        f"### [{t['slug']}](https://github.com/{t['slug']}) — `{t['lang']}` · {t['total']:,} stars (+{t['today']} today)"
    )
    if t["desc"]:
        lines.append(t["desc"])
    lines.append(f"_Why notable:_ {why_notable(t)}.")
    lines.append("")

lines.append(f"## Watch-list movers ({len(movers_kept)})")
lines.append("")
for m in movers_kept:
    d7str = f"+{m['delta7']}" if m["delta7"] is not None else "n/a"
    lines.append(
        f"### [{m['slug']}](https://github.com/{m['slug']}) — {m['stars']:,} stars (+{m['delta']} today, {d7str} last 7d)"
    )
    lines.append(f"_Context:_ {context_for(m, prior_repos)}")
    lines.append("")

lines.append("## Cumulative tally")
lines.append("")
lines.append(f"- Watched repos tracked: {n_total}")
lines.append(f"- Repos with deltas today: {n_with_delta}")
lines.append(f"- Repos with first reading (no delta yet): {n_first}")
if new_candidates:
    cand_str = ", ".join(f"`{c}`" for c in new_candidates)
    lines.append(f"- New repos to consider adding to watch list: {cand_str}")
else:
    lines.append("- New repos to consider adding to watch list: none today")
lines.append("")
lines.append("## Sources scanned")
lines.append("")
for u, n, e in ordered_src:
    status = "ok" if (e is None and n > 0) else "failed"
    lines.append(f"- {u}: {n} items ({status})")
lines.append(f"- Star fetches: {n_watched_total} watched / {n_watched_ok} succeeded / {n_watched_fail} failed")
lines.append("")

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text("\n".join(lines))
print("WROTE:", OUT)

# ---------- Update github_stars.json ----------
state["last_updated"] = TODAY
for slug, info in d["results"]["watched"].items():
    stars = info["stars"]
    if stars is None:
        continue
    entry = state["repos"].setdefault(slug, {"first_seen": TODAY, "current_stars": stars, "stars_history": [], "last_commit": None})
    entry["current_stars"] = stars
    # append today's reading if not already
    hist = entry.setdefault("stars_history", [])
    # if last entry is TODAY, replace; else append
    if hist and hist[-1].get("date") == TODAY:
        hist[-1]["stars"] = stars
    else:
        hist.append({"date": TODAY, "stars": stars})
    # cap at last 60
    if len(hist) > 60:
        entry["stars_history"] = hist[-60:]

STATE.write_text(json.dumps(state, indent=2))
print("STATE UPDATED:", STATE)
print("trending kept:", len(trending))
print("movers kept:", len(movers_kept))
print("new candidates:", new_candidates)
