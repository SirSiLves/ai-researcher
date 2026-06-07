#!/usr/bin/env python3
"""Render the wave-3 deep-read + voices output to markdown."""
import json, sys

d = json.load(open(sys.argv[1]))
r = d.get("result", d)
docs = r.get("docs", [])
voices = r.get("voices", {})
if isinstance(voices, dict):
    voices = voices.get("voices", [])

print("# Wave 3 — Deep-Read Primary Sources + Key Voices\n")
print("_Each source was fetched and read in full; quotes are grounded with URL + date._\n")

for cluster in docs:
    print(f"\n## Cluster: {cluster.get('cluster','?')}\n")
    for doc in cluster.get("documents", []):
        stance = doc.get("stance", "?")
        cred = doc.get("credibility", "")
        print(f"### {doc.get('title','?')}")
        print(f"**{doc.get('author_or_org','?')}** · {doc.get('date','')} · _{doc.get('type','')}_ · stance: **{stance}**" + (f" · {cred}" if cred else ""))
        print(f"\n{doc.get('url','')}\n")
        if doc.get("summary"):
            print(f"{doc['summary']}\n")
        if doc.get("hard_numbers"):
            print("**Hard numbers:**")
            for n in doc["hard_numbers"]:
                print(f"- {n}")
            print()
        if doc.get("grounded_quotes"):
            print("**Grounded quotes:**")
            for q in doc["grounded_quotes"]:
                print(f"- > \"{q.get('quote','')}\"")
                if q.get("context"):
                    print(f"  - _{q['context']}_")
            print()
        print("")

print("\n---\n\n## Map of Key Voices (advocates · skeptics · nuanced)\n")
for v in voices:
    print(f"- **{v.get('name','?')}** ({v.get('who','')}) — _{v.get('position','')}_")
    print(f"  - \"{v.get('key_claim','')}\"")
    print(f"  - {v.get('source_url','')}")
