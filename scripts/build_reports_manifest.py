#!/usr/bin/env python3
"""Build reports/index.json — a flat dated index of every cadence artifact.

Walks daily/, weekly/, monthly/, radar/, vendor_candidates/, keyword_candidates/,
github_candidates/ and emits one entry per markdown file. Consumed by app.html
(the unified UI) for the Reports tab.

Idempotent — safe to re-run. Should be wired into the same cron tail as
rebuild_radar_manifest.py.
"""

import glob
import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

CADENCES = [
    ("daily", "Daily", r"(\d{4}-\d{2}-\d{2})"),
    ("weekly", "Weekly", r"(\d{4}-W\d{2})"),
    ("monthly", "Monthly", r"(\d{4}-\d{2})"),
    ("radar", "Radar", r"(\d{4}-\d{2}-\d{2}(?:-v\d+)?)"),
    ("vendor_candidates", "Vendor sweep", r"(\d{4}-\d{2}-\d{2})"),
    ("keyword_candidates", "Keyword sweep", r"(\d{4}-\d{2}-\d{2})"),
    ("github_candidates", "GitHub sweep", r"(\d{4}-\d{2}-\d{2})"),
]


_BORING_BULLETS = (
    "sector movements",
    "no sector reassignments",
    "no topic reassignments",
    "no reassignments",
    "auto-applied this run",
    "auto-applied earlier",
    "auto-applied today",
    "what changed",
    "tally summary",
    "repos seen in window",
    "currently in watched_repos",
    "currently in deep_watch",
    "files scanned",
)


def _clean(text: str) -> str:
    """Normalise a markdown headline string: strip all ** / __ / ` markers
    and surrounding quotes, normalise whitespace, drop trailing punctuation
    that becomes orphaned after marker removal."""
    # Remove all ** and __ runs anywhere
    text = re.sub(r"\*\*|__", "", text)
    # Collapse multiple spaces from cleanup
    text = re.sub(r"\s+", " ", text).strip()
    # Drop surrounding quotes
    if len(text) >= 2 and text[0] in '"“`\'' and text[-1] in '"”`\'':
        text = text[1:-1].strip()
    # Trim trailing : or . that's now orphaned
    text = text.rstrip(":.").strip()
    return text


def _extract_link_text(body: str) -> str | None:
    """If a bullet starts with [text](url) or **[text](url)**, return text."""
    # **[text](url)**
    m = re.match(r"^\*\*\[([^\]]+)\]\([^)]+\)\*\*", body)
    if m:
        return m.group(1)
    # [text](url)
    m = re.match(r"^\[([^\]]+)\]\([^)]+\)", body)
    if m:
        return m.group(1)
    return None


def first_headline(path: Path) -> str:
    """Pull a useful one-line summary from a markdown report.

    Strategy:
      1. Skip H1, italic meta blocks, and any H2 like "## TL;DR" / "## Summary".
      2. Prefer the first non-boilerplate bullet. Inside bullets:
         - if it leads with [text](url) or **[text](url)**, use that link text
         - else strip the leading **bold** span and use the bold text
         - else use the bullet body
      3. Skip radar/sweep boilerplate bullets entirely.
      4. Fall back to the first non-empty prose line.
    """
    try:
        with open(path, encoding="utf-8") as handle:
            lines = handle.read().splitlines()
    except OSError:
        return ""

    for line in lines[1:200]:
        stripped = line.strip()
        if not stripped:
            continue
        # italic meta block "_..._"
        if stripped.startswith("_") and stripped.endswith("_"):
            continue
        # H1..H6 — skip
        if stripped.startswith("#"):
            continue
        # bullet
        if stripped.startswith(("- ", "* ")):
            body = stripped[2:].strip()
            cleaned_for_check = _clean(body).lower()
            if any(cleaned_for_check.startswith(b) for b in _BORING_BULLETS):
                continue
            # leading link?
            link_text = _extract_link_text(body)
            if link_text:
                return _clean(link_text)[:200]
            # leading **bold**?
            if body.startswith("**"):
                end = body.find("**", 2)
                if end > 2:
                    head = body[2:end]
                    return _clean(head)[:200]
            return _clean(body)[:200]
        # numbered priority "1. ..."
        num = stripped.split(". ", 1)
        if num[0].isdigit() and len(num) == 2:
            body = num[1]
            link_text = _extract_link_text(body)
            if link_text:
                return _clean(link_text)[:200]
            return _clean(body)[:200]
        # Bold "section eyebrow" like "**Sector movements:**" → not a real
        # headline. Skip whether it stands alone or is followed by an italic
        # meta blurb like "_No sector reassignments today._".
        if re.match(r"^\*\*[^*]+:\*\*\s*(_[^_]+_)?\s*$", stripped):
            continue
        # prose line — last-resort headline
        cleaned = _clean(stripped)
        if not cleaned:
            continue
        # Reject obvious boilerplate that survived the above checks
        if any(cleaned.lower().startswith(b) for b in _BORING_BULLETS):
            continue
        return cleaned[:200]
    return ""


def sort_key(entry: dict) -> tuple:
    return (entry["sort_date"], entry["cadence"])


def main() -> int:
    entries = []
    for cadence_dir, cadence_label, date_pat in CADENCES:
        for path in glob.glob(f"{cadence_dir}/**/*.md", recursive=True):
            base = os.path.basename(path).replace(".md", "")
            match = re.match(date_pat, base)
            if not match:
                continue
            date_id = match.group(1)
            # Sort by the ISO date even for weekly/monthly (best-effort lexicographic).
            if cadence_dir == "weekly":
                year, week = date_id.split("-W")
                sort_date = f"{year}-W{int(week):02d}"
            elif cadence_dir == "monthly":
                sort_date = f"{date_id}-99"
            else:
                sort_date = date_id
            entries.append(
                {
                    "cadence": cadence_dir,
                    "cadence_label": cadence_label,
                    "date_id": date_id,
                    "sort_date": sort_date,
                    "path": path,
                    "headline": first_headline(ROOT / path),
                    "is_versioned": "-v" in base,
                }
            )

    entries.sort(key=sort_key, reverse=True)

    payload = {
        "generated_at": entries[0]["date_id"] if entries else None,
        "cadences": [c[0] for c in CADENCES],
        "entries": entries,
        "_note": "Flat dated index of every cadence artifact. Consumed by app.html.",
    }

    out = ROOT / "reports" / "index.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    with open(out, "w", encoding="utf-8") as handle:
        json.dump(payload, handle, indent=2, ensure_ascii=False)

    by_cadence = {}
    for e in entries:
        by_cadence[e["cadence"]] = by_cadence.get(e["cadence"], 0) + 1
    summary = ", ".join(f"{k}={v}" for k, v in by_cadence.items())
    print(f"reports manifest: {len(entries)} entries ({summary}) -> {out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
