#!/usr/bin/env python3
"""
One-shot backfill: adds `sector`, `sector_history`, `breadth_7d`, `breadth_30d`,
`breadth_orgs_7d`, `high_breadth` fields to every existing radar/{YYYY}/{MM}/{date}.json,
and adds a top-level `sectors` array describing this day's sector composition.

Runs idempotently: re-running overwrites the augmentation. Safe to invoke after
any later manual JSON edits.

The skill computes sectors dynamically per-run going forward. This backfill seeds
the 8 days we already have (2026-05-05 → 2026-05-13) with a uniform clustering
that matches the user's stated framing: Models / Agents / Governance & Market /
Methods. From the next live radar run onward, the skill takes over and can split,
merge, rename, dissolve sectors as the field shifts.

Breadth is approximated for the backfill: we don't have per-mention org data on
disk for these dates, so we proxy `breadth_7d` as the count of DISTINCT
supporting_files dated within the last 7 days (a file ≈ a collector channel for
that day). The real org-based breadth kicks in on the next live run.
"""
import json
import os
import sys
from collections import defaultdict
from datetime import date, timedelta
from pathlib import Path

# ---- topic → sector mapping (initial backfill assignment) -------------------
# Derived from the topic_taxonomy_seed group keys in sources.json, adapted to
# the 4 user-validated starter sectors. Topics not in this map use a fuzzy
# fallback based on substring matching against topic IDs.

TOPIC_TO_SECTOR = {
    # Models & capabilities
    "frontier-models-openai": "Models & capabilities",
    "frontier-models-anthropic": "Models & capabilities",
    "frontier-models-google": "Models & capabilities",
    "frontier-models-mistral": "Models & capabilities",
    "frontier-models-deepseek": "Models & capabilities",
    "frontier-models-llama-qwen-kimi": "Models & capabilities",
    "open-weight-wave": "Models & capabilities",
    "open-vs-closed": "Models & capabilities",
    "open-coding-parity": "Models & capabilities",

    # Agents & infrastructure
    "mcp-adoption": "Agents & infrastructure",
    "mcp-security": "Agents & infrastructure",
    "a2a-protocol": "Agents & infrastructure",
    "agent-sdks": "Agents & infrastructure",
    "tool-use-standards": "Agents & infrastructure",
    "opentelemetry-for-ai": "Agents & infrastructure",
    "agentic-retrieval": "Agents & infrastructure",
    "vector-db-market": "Agents & infrastructure",
    "agent-platforms-enterprise": "Agents & infrastructure",
    "vertical-agents-finance": "Agents & infrastructure",
    "vertical-agents-healthcare": "Agents & infrastructure",
    "vertical-agents-legal": "Agents & infrastructure",
    "voice-realtime-agents": "Agents & infrastructure",
    "agentic-ides": "Agents & infrastructure",
    "autonomous-pr-agents": "Agents & infrastructure",
    "compound-engineering": "Agents & infrastructure",
    "ai-research-agents": "Agents & infrastructure",
    "knowledge-graphs": "Agents & infrastructure",

    # Governance & market
    "eu-ai-act": "Governance & market",
    "iso-42001": "Governance & market",
    "nist-ai-rmf": "Governance & market",
    "ai-safety-institute": "Governance & market",
    "pentagon-anthropic": "Governance & market",
    "vendor-governance-business-line": "Governance & market",
    "frontier-lab-jvs": "Governance & market",
    "implementation-revenue": "Governance & market",
    "swiss-ai-context": "Governance & market",
    "ai-engineer-hiring": "Governance & market",
    "rag-engineer-postings": "Governance & market",
    "agent-engineer-postings": "Governance & market",
    "prompt-engineer-decline": "Governance & market",
    "ai-governance-roles": "Governance & market",
    "ml-platform-engineer": "Governance & market",

    # Methods & research
    "long-context-vs-rag": "Methods & research",
    "rag-eval": "Methods & research",
    "swe-bench": "Methods & research",
    "clawbench": "Methods & research",
    "real-world-agentic-evals": "Methods & research",
    "evaluation-gap": "Methods & research",
    "disaggregated-serving": "Methods & research",
    "co-packaged-optics": "Methods & research",
    "kv-cache-handoff": "Methods & research",
    "edge-inference": "Methods & research",
}

SECTOR_DESCRIPTIONS = {
    "Models & capabilities": "Frontier model releases, capability claims, open-weight competitive moves",
    "Agents & infrastructure": "Agent protocols, SDKs, retrieval, agent platforms, vertical agents — the integration layer",
    "Governance & market": "Regulation, compliance frameworks, vendor M&A, joint ventures, hiring signals, geographic markets",
    "Methods & research": "Evals, infrastructure research, technique comparisons, papers driving the next wave",
}

def fuzzy_sector(topic_id: str) -> str:
    """Fallback for topics not in the explicit map."""
    tid = topic_id.lower()
    if "model" in tid or any(k in tid for k in ("gpt", "claude", "gemini", "llama", "mistral", "deepseek", "qwen", "kimi")):
        return "Models & capabilities"
    if any(k in tid for k in ("agent", "mcp", "a2a", "tool-use", "retrieval", "rag-loop", "vector", "vertical-")):
        return "Agents & infrastructure"
    if any(k in tid for k in ("eval", "bench", "research", "infra", "serving", "optics", "kv-cache", "edge")):
        return "Methods & research"
    if any(k in tid for k in ("act", "iso-", "nist-", "safety", "governance", "policy", "regulat", "hiring", "swiss", "revenue", "jvs", "engineer-postings")):
        return "Governance & market"
    return "Governance & market"  # safe default

def assign_sector(topic_id: str) -> str:
    return TOPIC_TO_SECTOR.get(topic_id) or fuzzy_sector(topic_id)


# ---- breadth approximation --------------------------------------------------

def parse_date(s: str):
    return date.fromisoformat(s)

def files_in_window(supporting_files, today: date, window_days: int):
    """Return supporting_files dated within (today - window_days, today]."""
    cutoff = today - timedelta(days=window_days)
    out = []
    for path in supporting_files:
        # path like "blogs/2026/05/2026-05-08.md"
        try:
            base = os.path.basename(path).replace(".md", "")
            d = parse_date(base)
            if cutoff <= d <= today:
                out.append(path)
        except Exception:
            pass
    return out

def approx_breadth(topic, today: date, window_days: int) -> int:
    """Distinct supporting_files in window as a proxy for distinct orgs.
    The skill will replace this with a real org-count on future runs."""
    return len(set(files_in_window(topic.get("supporting_files", []), today, window_days)))


# ---- main backfill ---------------------------------------------------------

def backfill_file(json_path: Path, root: Path):
    with open(json_path) as fh:
        data = json.load(fh)

    today = parse_date(data["date"])

    # Per-topic: assign sector, breadth, sector_history (initial)
    sectors_acc = defaultdict(list)  # sector_name -> [topic_id, ...]
    high_breadth_thresh = 5  # mirror radar_config.breadth_config.thresholds.high_breadth_7d

    for topic in data.get("topics", []):
        tid = topic["id"]
        sector = assign_sector(tid)
        topic["sector"] = sector
        sectors_acc[sector].append(tid)

        # Breadth proxies
        b7 = approx_breadth(topic, today, 7)
        b30 = approx_breadth(topic, today, 30)
        topic["breadth_7d"] = b7
        topic["breadth_30d"] = b30
        topic["breadth_orgs_7d"] = []  # placeholder; filled by future live runs
        topic["high_breadth"] = b7 >= high_breadth_thresh
        topic["_breadth_method"] = "approx_from_supporting_files"  # honesty flag

        # Sector history (initial seed: this is the first known assignment)
        # Only seed if not already present (idempotent re-run).
        if "sector_history" not in topic:
            topic["sector_history"] = [{
                "date": data["date"],
                "from": None,
                "to": sector,
                "reason": "backfill seed",
            }]

    # Top-level sectors array
    sectors_out = []
    for name in sorted(sectors_acc):
        topic_ids = sectors_acc[name]
        sectors_out.append({
            "name": name,
            "topic_ids": topic_ids,
            "first_seen": data["date"],  # we don't have true history; this run is the floor
            "consecutive_low_days": 0,
            "description": SECTOR_DESCRIPTIONS.get(name, ""),
            "topic_count": len(topic_ids),
            "active_orgs": None,  # backfill: org data not available
            "_backfilled": True,
        })

    # Insert sectors block + movement bookkeeping (empty for backfill)
    data["sectors"] = sectors_out
    data.setdefault("sector_movements", [])
    data.setdefault("sectors_dissolved_today", [])
    data.setdefault("sectors_spawned_today", [])

    # Re-sort topics: sector, then stage, then score desc
    STAGE_ORDER = {"mainstream": 0, "consolidating": 1, "emerging": 2, "fading": 3}
    data["topics"].sort(key=lambda t: (
        t.get("sector", "ZZZ"),
        STAGE_ORDER.get(t.get("stage", ""), 9),
        -float(t.get("score", 0) or 0),
    ))

    with open(json_path, "w") as fh:
        json.dump(data, fh, indent=2)

    return len(sectors_out), len(data["topics"])


def main():
    from _lib import DATA_ROOT, RADAR_DIR
    # `root` is what relative_to() uses for display paths below; point at DATA_ROOT
    # so paths render as `radar/2026/05/...` (manifest is relative to DATA_ROOT).
    root = DATA_ROOT
    radar_dir = RADAR_DIR
    json_files = sorted(radar_dir.rglob("*.json"))
    json_files = [p for p in json_files if p.name != "index.json"]

    print(f"Backfilling {len(json_files)} radar JSON files…")
    for jp in json_files:
        try:
            n_sec, n_top = backfill_file(jp, root)
            print(f"  {jp.relative_to(root)}: {n_sec} sectors, {n_top} topics")
        except Exception as e:
            print(f"  {jp.relative_to(root)}: FAILED — {e}", file=sys.stderr)

if __name__ == "__main__":
    main()
