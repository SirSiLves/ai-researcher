#!/usr/bin/env python3
"""Extract clean markdown from workflow task-output JSON for the agentic-coding research."""
import json, sys

def load_result(path):
    with open(path) as f:
        data = json.load(f)
    # task-output wrapper: {summary, agentCount, logs, result}
    if isinstance(data, dict) and "result" in data:
        return data["result"]
    return data

def fmt_findings_dim(item):
    out = []
    f = item.get("findings", item if "dimension" in item else {})
    v = item.get("verdict", {})
    dim = f.get("dimension", "?")
    out.append(f"## {dim}\n")
    if v:
        out.append(f"**Adversarial verdict:** `{v.get('verdict','?')}`")
        if v.get("overturned_claims"):
            out.append("\n**Overturned / hype-flagged claims:**")
            for c in v["overturned_claims"]:
                out.append(f"- ⚠️ {c}")
        if v.get("corrected_numbers"):
            out.append("\n**Numbers needing a caveat:**")
            for c in v["corrected_numbers"]:
                out.append(f"- ✏️ {c}")
        if v.get("notes"):
            out.append(f"\n_Skeptic notes:_ {v['notes']}")
        out.append("")
    if f.get("pro_arguments"):
        out.append("**PRO arguments:**")
        for p in f["pro_arguments"]:
            out.append(f"- ✅ {p}")
        out.append("")
    if f.get("contra_arguments"):
        out.append("**CONTRA arguments:**")
        for c in f["contra_arguments"]:
            out.append(f"- ❌ {c}")
        out.append("")
    if f.get("numbers"):
        out.append("**Hard numbers:**")
        for n in f["numbers"]:
            ctx = f" — {n.get('context')}" if n.get("context") else ""
            out.append(f"- **{n.get('metric','?')}: {n.get('value','?')}**{ctx}  \n  [{n.get('source_url','')}]")
        out.append("")
    if f.get("key_findings"):
        out.append("**Key findings (grounded):**")
        for kf in f["key_findings"]:
            out.append(f"- **{kf.get('claim','?')}**")
            out.append(f"  - Evidence: {kf.get('evidence','')}")
            out.append(f"  - Source: {kf.get('source_url','')} ({kf.get('date','')})")
        out.append("")
    if f.get("confidence_notes"):
        out.append(f"_Confidence notes:_ {f['confidence_notes']}\n")
    if f.get("sources"):
        out.append("**Sources:**")
        for s in f["sources"]:
            out.append(f"- {s}")
        out.append("")
    return "\n".join(out)

if __name__ == "__main__":
    path = sys.argv[1]
    title = sys.argv[2] if len(sys.argv) > 2 else "Research Findings"
    result = load_result(path)
    print(f"# {title}\n")
    for item in result:
        print(fmt_findings_dim(item))
        print("\n---\n")
