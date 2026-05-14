"""
Shared helpers for daily pipeline scripts.

Three small utilities live here so build_org_view.py and run_keyword_sweep.py
(and any future daily script) don't drift apart on basic mechanics:

  - SOURCE_DIRS / SOURCE_TYPE_FROM_DIR   single canonical mapping of folder → source_type
  - iter_source_files(root)              yield (Path, source_type, YYYY-MM-DD) for every dated .md
  - whole_word_pattern(alias)            case-insensitive whole-wordish regex

bootstrap_discovered_orgs.py intentionally does NOT import this — it's a
one-shot historical artifact with a narrower SOURCE_DIRS scope, frozen in
time so re-runs reproduce the original tally.
"""
import re
from pathlib import Path

SOURCE_DIRS = ["news", "papers", "blogs", "jobs", "linkedin", "daily", "github", "hackernews"]

SOURCE_TYPE_FROM_DIR = {
    "news": "tech_news",
    "papers": "paper",
    "blogs": "long_form_blog",
    "jobs": "job_posting_skill_mention",
    "linkedin": "linkedin_network_post",
    "daily": "daily_synthesis",
    "github": "github_signal",
    "hackernews": "hackernews_signal",
}

_DATE_PREFIX_RE = re.compile(r"^(\d{4}-\d{2}-\d{2})")


def iter_source_files(root: Path):
    """Yield (path, source_type, file_date_iso) for every dated source markdown.

    Handles both `YYYY-MM-DD.md` and `YYYY-MM-DD-vN.md` naming. Skips files
    whose name doesn't match — e.g. README.md inside a source dir.
    """
    for top in SOURCE_DIRS:
        base = root / top
        if not base.exists():
            continue
        for p in base.rglob("*.md"):
            m = _DATE_PREFIX_RE.match(p.name.replace(".md", ""))
            if not m:
                continue
            yield p, SOURCE_TYPE_FROM_DIR[top], m.group(1)


def whole_word_pattern(alias: str) -> re.Pattern:
    """Case-insensitive whole-word(ish) match for company names / phrases.

    Boundary is "not alphanumeric" on either side, so internal dots, hyphens,
    spaces inside the alias survive. `re.escape` makes the alias literal.
    """
    return re.compile(r"(?<![A-Za-z0-9])" + re.escape(alias) + r"(?![A-Za-z0-9])", re.IGNORECASE)
