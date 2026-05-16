"""
Shared helpers for daily pipeline scripts.

Three small utilities live here so build_org_view.py and run_keyword_sweep.py
(and any future daily script) don't drift apart on basic mechanics:

  - SOURCE_DIRS / SOURCE_TYPE_FROM_DIR   single canonical mapping of folder → source_type
  - iter_source_files(root)              yield (Path, source_type, YYYY-MM-DD) for every dated .md
  - whole_word_pattern(alias)            case-insensitive whole-wordish regex

Layout anchors after the 2026-05-16 publish/research restructure:

  - REPO_ROOT    = parent of pipeline/, data/, app/, legacy/
  - PIPELINE_DIR = REPO_ROOT/pipeline                       (scripts + skills + CRON_PROMPT.md)
  - STATE_DIR    = REPO_ROOT/pipeline/state                 (sources.json, discovered_*, .bak)
  - DATA_ROOT    = REPO_ROOT/data                           (top-level data dir)
  - PUBLISH_DIR  = REPO_ROOT/data/publish                   (what the web app reads + humans publish)
  - RESEARCH_DIR = REPO_ROOT/data/research                  (raw inputs + pipeline-internal change logs)
  - SOURCES_DIR  = REPO_ROOT/data/research/sources          (raw collector dumps)
  - SWEEPS_DIR   = REPO_ROOT/data/research/sweeps           (vendor/keyword/github sweep change logs)
  - DAILY_DIR    = PUBLISH_DIR/daily   WEEKLY_DIR/MONTHLY_DIR/RADAR_DIR/ORGS_DIR/REPORTS_DIR analogous
  - INDEX_MD     = PUBLISH_DIR/index.md                     (human-readable TOC)

bootstrap_discovered_orgs.py intentionally does NOT import this — it's a
one-shot historical artifact with a narrower SOURCE_DIRS scope, frozen in
time so re-runs reproduce the original tally.
"""
import re
from pathlib import Path

PIPELINE_DIR = Path(__file__).resolve().parent.parent
REPO_ROOT    = PIPELINE_DIR.parent
STATE_DIR    = PIPELINE_DIR / "state"
DATA_ROOT    = REPO_ROOT / "data"
PUBLISH_DIR  = DATA_ROOT / "publish"
RESEARCH_DIR = DATA_ROOT / "research"
SOURCES_DIR  = RESEARCH_DIR / "sources"
SWEEPS_DIR   = RESEARCH_DIR / "sweeps"
DAILY_DIR    = PUBLISH_DIR / "daily"
WEEKLY_DIR   = PUBLISH_DIR / "weekly"
MONTHLY_DIR  = PUBLISH_DIR / "monthly"
RADAR_DIR    = PUBLISH_DIR / "radar"
ORGS_DIR     = PUBLISH_DIR / "orgs"
REPORTS_DIR  = PUBLISH_DIR / "reports"
INDEX_MD     = PUBLISH_DIR / "index.md"

# Publish-side cadences (what humans read)
PUBLISH_CADENCES = ["daily", "weekly", "monthly", "radar"]

# Research-side sweeps (pipeline-internal change logs)
SWEEP_CADENCES   = ["vendor_candidates", "keyword_candidates", "github_candidates"]

# Folders the source-mining helpers walk. Note: `daily` lives in PUBLISH_DIR; the
# others live in SOURCES_DIR. iter_source_files() handles the split.
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


def _source_dir_path(top: str) -> Path:
    """`daily/` is publish-side; everything else is research-side."""
    if top == "daily":
        return DAILY_DIR
    return SOURCES_DIR / top


def iter_source_files(root: Path | None = None):
    """Yield (path, source_type, file_date_iso) for every dated source markdown.

    Handles both `YYYY-MM-DD.md` and `YYYY-MM-DD-vN.md` naming. Skips files
    whose name doesn't match — e.g. README.md inside a source dir. The `root`
    argument is kept for backwards compatibility (callers pass DATA_ROOT) but
    the resolved per-folder paths come from the publish/research split.
    """
    for top in SOURCE_DIRS:
        base = _source_dir_path(top)
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


def upsert_index_marker_line(index_path: Path, marker: str, today: str, line: str) -> bool:
    """Insert or replace today's entry directly after a `<!-- {marker}_START -->` block.

    Replace-don't-append: if there's already a `- [{today}]` line between the
    START and END markers, rewrite that line in place. Otherwise insert
    immediately after the START marker (newest first). Returns True if the
    file changed, False if today's line was already identical or markers
    weren't found.
    """
    if not index_path.exists():
        return False
    text = index_path.read_text()
    start = f"<!-- {marker}_START -->"
    end = f"<!-- {marker}_END -->"
    if start not in text or end not in text:
        return False
    today_prefix = f"- [{today}]"
    lines = text.split("\n")
    # Find marker indices.
    try:
        start_idx = next(i for i, ln in enumerate(lines) if ln.strip() == start)
        end_idx = next(i for i, ln in enumerate(lines) if ln.strip() == end)
    except StopIteration:
        return False
    # Look for existing today line in the section.
    new_lines = list(lines)
    replaced = False
    for i in range(start_idx + 1, end_idx):
        if new_lines[i].lstrip().startswith(today_prefix):
            if new_lines[i] == line:
                return False  # No change.
            new_lines[i] = line
            replaced = True
            break
    if not replaced:
        new_lines.insert(start_idx + 1, line)
    new_text = "\n".join(new_lines)
    if new_text == text:
        return False
    index_path.write_text(new_text)
    return True
