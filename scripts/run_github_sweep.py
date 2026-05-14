#!/usr/bin/env python3
"""
run_github_sweep.py — daily GitHub repo sweep, mirror of run_keyword_sweep.py.

Mines github/{YYYY}/{MM}/*.md (the ai-github collector's daily output) for
trending repo appearances, tracks per-repo distinct trending days + star
deltas, and applies a sustained-day promotion gate to auto-extend
sources.json's news_collector.github_collector.watched_repos list.

Same architecture as the vendor + keyword sweeps:
  - sustained-day gate prevents flash-in-the-pan promotions
  - hot-event path for viral one-day star spikes (TTL 30d)
  - deep-watch demotion when watched_repos exceeds the soft cap
  - manual entries (no _auto_added in github_stars.json) are sacred
  - audit trail to github_changes.log
  - one-step rollback via sources.json.github.bak (per-sweep .bak)

Outputs (idempotent across re-runs on the same day):
  - github_stars.json           (running per-repo state, extended for promotions)
  - github_candidates/{YYYY}/{MM}/{TODAY}.md  (today's change log)
  - github_changes.log          (append-only audit, one line per mutation)
  - sources.json                (mutated per auto-apply rules, with backup)

Run: python3 scripts/run_github_sweep.py
Hooked from ai-replay §6.x.
"""
import argparse
import json
import os
import re
import shutil
import sys
from collections import defaultdict
from datetime import date, datetime, timedelta
from pathlib import Path

from _lib import upsert_index_marker_line

ROOT = Path(__file__).resolve().parent.parent
# Prefer TODAY from the env (set by `eval "$(scripts/now.sh)"` in the
# orchestrator); fall back to wall-clock date for standalone runs.
TODAY = os.environ.get("TODAY") or date.today().isoformat()
NOW_ISO = datetime.now().astimezone().isoformat(timespec="seconds")

# Match a trending-repo H3 line in a github/.../*.md file:
#   ### [owner/name](https://github.com/owner/name) — `Lang` · 12,345 stars (+678 today)
TRENDING_LINE_RE = re.compile(
    r"^###\s+\[([A-Za-z0-9._-]+/[A-Za-z0-9._-]+)\]\(https?://github\.com/[^)]+\)"
    r".*?·\s*([\d,]+)\s+stars?\s*(?:\(\+([\d,]+)\s+today\))?",
    re.MULTILINE,
)

DATE_FROM_PATH_RE = re.compile(r"(\d{4}-\d{2}-\d{2})")


def iter_github_files(root: Path):
    """Yield (path, YYYY-MM-DD) for every dated github/.../*.md file."""
    base = root / "github"
    if not base.exists():
        return
    for p in base.rglob("*.md"):
        m = DATE_FROM_PATH_RE.search(p.name)
        if m:
            yield p, m.group(1)


def parse_trending_lines(text):
    """Parse ### entries from a github/.../*.md file. Returns list of (repo, stars, delta)."""
    out = []
    for m in TRENDING_LINE_RE.finditer(text):
        repo = m.group(1)
        stars = int(m.group(2).replace(",", ""))
        delta = int(m.group(3).replace(",", "")) if m.group(3) else 0
        out.append((repo, stars, delta))
    return out


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--dry-run", action="store_true", help="Show classifications without writing")
    args = p.parse_args()

    sources = json.loads((ROOT / "sources.json").read_text())
    gc = sources.get("github_collector", {})
    cfg = gc.get("github_sweep_config", {})
    if not cfg.get("enabled", False):
        print("[github_sweep] disabled in config; exiting", file=sys.stderr)
        return

    print(f"[github_sweep] starting for {TODAY}", file=sys.stderr)

    rolling_days = cfg.get("rolling_window_days", 14)
    promo = cfg["promotion_thresholds"]
    watch = cfg["watch_thresholds"]
    hot = cfg["hot_event_thresholds"]
    today_d = date.fromisoformat(TODAY)
    cutoff = (today_d - timedelta(days=rolling_days)).isoformat()

    # Sacred sets — never touched
    watched = list(gc.get("watched_repos", []))
    deep_watch = list(gc.get("deep_watch_repos", []))
    watched_set = set(watched)
    deep_watch_set = set(deep_watch)

    # === Step 1: scan github/ files in rolling window ===
    files = [(p, d) for p, d in iter_github_files(ROOT) if d >= cutoff]
    files.sort(key=lambda x: x[1])
    print(f"[github_sweep] scanning {len(files)} files in last {rolling_days}d", file=sys.stderr)

    # repo → {trending_dates: set, latest_stars, max_one_day_delta, total_delta_in_window}
    appearances = defaultdict(lambda: {
        "trending_dates": set(),
        "latest_stars": 0,
        "max_one_day_delta": 0,
        "total_delta_in_window": 0,
        "first_seen_in_window": "9999-12-31",
        "last_seen_in_window": "0000-01-01",
    })

    for path, file_date in files:
        try:
            text = path.read_text()
        except Exception:
            continue
        for repo, stars, delta in parse_trending_lines(text):
            ent = appearances[repo]
            ent["trending_dates"].add(file_date)
            ent["latest_stars"] = stars  # files iter sorted, so last assignment is most recent
            ent["max_one_day_delta"] = max(ent["max_one_day_delta"], delta)
            ent["total_delta_in_window"] += delta
            if file_date < ent["first_seen_in_window"]:
                ent["first_seen_in_window"] = file_date
            if file_date > ent["last_seen_in_window"]:
                ent["last_seen_in_window"] = file_date

    # === Step 2: load github_stars.json (the persistent state) ===
    stars_path = ROOT / "github_stars.json"
    if stars_path.exists():
        stars_state = json.loads(stars_path.read_text())
    else:
        stars_state = {"last_updated": TODAY, "repos": {}}
    stars_state.setdefault("repos", {})
    stars_state["last_updated"] = TODAY

    # === Step 3: classify ===
    # Tier order (first match wins):
    #  1. covered_active: in watched_repos AND has trending appearances OR star history fresh.
    #     No action.
    #  2. hot_event: not in watched, max_one_day_delta >= hot.min_one_day_star_delta.
    #     Auto-add with TTL.
    #  3. promote: not in watched, distinct trending days >= promo.min_distinct_trending_days,
    #     classification_history sustained >= min_consecutive_days_at_promote.
    #  4. watch: not in watched, distinct trending days >= watch.min_distinct_trending_days.
    #  5. revive: in deep_watch_repos AND any trending appearance in window. Re-promote.
    #  6. dormant: everything else.
    classifications = {}  # repo → tier
    for repo, ent in appearances.items():
        n_days = len(ent["trending_dates"])
        if repo in watched_set:
            classifications[repo] = "covered_active"
        elif repo in deep_watch_set and n_days >= 1:
            classifications[repo] = "revive"
        elif ent["max_one_day_delta"] >= hot["min_one_day_star_delta"] and repo not in deep_watch_set:
            classifications[repo] = "hot_event"
        elif n_days >= promo["min_distinct_trending_days"]:
            classifications[repo] = "promote"
        elif n_days >= watch["min_distinct_trending_days"]:
            classifications[repo] = "watch"
        else:
            classifications[repo] = "dormant"

    # === Step 4: track classification_history per repo (for sustained-day gate) ===
    # The history lives inside github_stars.json under each repo's "_classification_history".
    # Auto-added entries get the marker; manual entries (added by hand to watched_repos
    # without _auto_added) are sacred — we don't track classification on them.
    for repo, tier in classifications.items():
        ent_state = stars_state["repos"].setdefault(repo, {
            "first_seen": TODAY,
            "current_stars": appearances[repo]["latest_stars"],
            "stars_history": [],
        })
        hist = ent_state.setdefault("_classification_history", [])
        # Append today's classification (cap at 21 entries)
        if not hist or hist[-1].get("date") != TODAY:
            hist.append({"date": TODAY, "tier": tier})
            ent_state["_classification_history"] = hist[-21:]

    # === Step 5: compute promotions / hot events / revivals / demotions ===
    promotions_to_add = []
    hot_events_to_add = []
    revivals = []

    for repo, tier in classifications.items():
        ent_state = stars_state["repos"].get(repo, {})
        if tier == "promote":
            hist = ent_state.get("_classification_history", [])
            consec = 0
            last_dt = today_d
            for record in reversed(hist):
                if record["tier"] == "promote":
                    rec_dt = date.fromisoformat(record["date"])
                    if (last_dt - rec_dt).days <= 1:
                        consec += 1
                        last_dt = rec_dt
                    else:
                        break
                else:
                    break
            if consec >= promo["min_consecutive_days_at_promote"]:
                promotions_to_add.append(repo)
        elif tier == "hot_event":
            hot_events_to_add.append(repo)
        elif tier == "revive":
            revivals.append(repo)

    # === Step 6: backup + apply ===
    auto_apply = cfg.get("auto_apply", {})
    if not auto_apply.get("enabled", False):
        print("[github_sweep] auto_apply disabled; recommendation-only mode", file=sys.stderr)
        applied_count = 0
        revived_count = 0
        hot_count = 0
        log_lines = []
    else:
        if not args.dry_run:
            # Per-sweep .bak so concurrent vendor/keyword runs don't clobber.
            shutil.copy(ROOT / "sources.json", ROOT / "sources.json.github.bak")

        log_lines = []
        applied_count = 0
        revived_count = 0
        hot_count = 0

        for repo in promotions_to_add:
            ent = appearances[repo]
            n_days = len(ent["trending_dates"])
            if repo not in watched:
                watched.append(repo)
                # Mark this repo as auto-added in stars_state
                stars_state["repos"][repo]["_auto_added"] = True
                stars_state["repos"][repo]["_added_on"] = TODAY
                stars_state["repos"][repo]["_added_reason"] = (
                    f"promote: {n_days} distinct trending days in {rolling_days}d, "
                    f"+{ent['total_delta_in_window']:,} stars in window"
                )
                applied_count += 1
                log_lines.append(
                    f'{NOW_ISO} promote-add        watched_repos                  "{repo}" '
                    f'reason="{n_days} distinct trending days in {rolling_days}d"'
                )

        for repo in hot_events_to_add:
            ent = appearances[repo]
            if repo not in watched:
                watched.append(repo)
                expires = (today_d + timedelta(days=auto_apply.get("ttl_days_for_hot_events", 30))).isoformat()
                stars_state["repos"][repo]["_auto_added"] = True
                stars_state["repos"][repo]["_added_on"] = TODAY
                stars_state["repos"][repo]["_expires_on"] = expires
                stars_state["repos"][repo]["_added_reason"] = (
                    f"hot-event: +{ent['max_one_day_delta']:,} stars in one day"
                )
                hot_count += 1
                log_lines.append(
                    f'{NOW_ISO} hot-event-add      watched_repos                  "{repo}" '
                    f'expires={expires} reason="+{ent["max_one_day_delta"]:,} stars in one day"'
                )

        # Revivals: deep_watch → watched
        for repo in revivals:
            if repo in deep_watch:
                deep_watch.remove(repo)
            if repo not in watched:
                watched.append(repo)
            ent_state = stars_state["repos"].setdefault(repo, {})
            for f in ("_demoted_on", "_demoted_reason"):
                ent_state.pop(f, None)
            ent_state["_auto_added"] = True
            ent_state["_added_on"] = TODAY
            ent_state["_added_reason"] = "deep-watch revival: trended again in rolling window"
            revived_count += 1
            log_lines.append(
                f'{NOW_ISO} deep-watch-promote watched_repos                  "{repo}" '
                f'reason="trended again in {rolling_days}d window"'
            )

        # Hot-event TTL expiry
        for repo in list(watched):
            ent_state = stars_state["repos"].get(repo, {})
            if not ent_state.get("_auto_added"):
                continue  # manual sacred
            exp = ent_state.get("_expires_on")
            if exp and exp < TODAY:
                # If meanwhile crossed sustained-promote threshold, drop the expiry instead of removing
                hist = ent_state.get("_classification_history", [])
                consec = 0
                last_dt = today_d
                for record in reversed(hist):
                    if record["tier"] == "promote":
                        rec_dt = date.fromisoformat(record["date"])
                        if (last_dt - rec_dt).days <= 1:
                            consec += 1
                            last_dt = rec_dt
                        else:
                            break
                    else:
                        break
                if consec >= promo["min_consecutive_days_at_promote"]:
                    ent_state.pop("_expires_on", None)
                    ent_state["_added_reason"] = (ent_state.get("_added_reason", "") +
                                                   " (sustained-promote — expiry dropped)")
                    log_lines.append(
                        f'{NOW_ISO} promote-add        watched_repos                  "{repo}" '
                        f'reason="hot event reached sustained-promote; expiry dropped"'
                    )
                else:
                    watched.remove(repo)
                    log_lines.append(
                        f'{NOW_ISO} expire-remove      watched_repos                  "{repo}" '
                        f'reason="hot-event TTL elapsed (was {exp})"'
                    )

        # === Step 7: deep-watch demotion (soft cap on watched_repos) ===
        dw_cfg = auto_apply.get("deep_watch_demote", {})
        if dw_cfg.get("enabled"):
            cap = dw_cfg.get("max_watched_repos", 80)
            min_silence = dw_cfg.get("min_silence_days", 60)
            budget = dw_cfg.get("max_demotions_per_run", 3)
            if len(watched) > cap:
                # Find candidates: _auto_added in stars_state, not classified hot/promote today,
                # silent (no trending appearance) for >= min_silence
                ineligible = {repo for repo, t in classifications.items()
                              if t in {"hot_event", "promote", "revive"}}
                candidates = []
                for repo in watched:
                    ent_state = stars_state["repos"].get(repo, {})
                    if not ent_state.get("_auto_added"):
                        continue  # manual sacred
                    if repo in ineligible:
                        continue
                    # Silence: when did this repo last trend?
                    hist = ent_state.get("_classification_history", [])
                    last_trending_day = None
                    for record in reversed(hist):
                        if record["tier"] in {"promote", "hot_event", "revive", "covered_active"}:
                            last_trending_day = record["date"]
                            break
                    if last_trending_day is None:
                        last_trending_day = ent_state.get("_added_on", "0000-01-01")
                    try:
                        silence = (today_d - date.fromisoformat(last_trending_day)).days
                    except ValueError:
                        silence = 9999
                    if silence < min_silence:
                        continue
                    candidates.append((repo, last_trending_day, silence))
                candidates.sort(key=lambda x: x[1])  # oldest-silent first
                n_to_demote = min(len(watched) - cap, budget, len(candidates))
                for repo, last_trending_day, silence in candidates[:n_to_demote]:
                    watched.remove(repo)
                    if repo not in deep_watch:
                        deep_watch.append(repo)
                    ent_state = stars_state["repos"][repo]
                    ent_state["_demoted_on"] = TODAY
                    ent_state["_demoted_reason"] = f"deep-watch: silent {silence}d, over cap {cap}"
                    log_lines.append(
                        f'{NOW_ISO} deep-watch-demote  watched_repos                  "{repo}" '
                        f'reason="silent {silence}d, ranked oldest-silent over cap={cap}"'
                    )

        # === Step 8: write back ===
        gc["watched_repos"] = watched
        gc["deep_watch_repos"] = deep_watch
        # Validate JSON before writing
        try:
            json.dumps(sources)
        except Exception as e:
            shutil.copy(ROOT / "sources.json.github.bak", ROOT / "sources.json")
            print(f"[github_sweep] JSON validation failed, restored backup: {e}", file=sys.stderr)
            with (ROOT / "github_changes.log").open("a") as f:
                f.write(f'{NOW_ISO} ABORT-INVALID-JSON  -  reason="sources.json would not parse after edits"\n')
            return
        if not args.dry_run:
            # ensure_ascii=False preserves em-dashes / other UTF-8 in source
            # strings; default escaping produces churn-only diffs against
            # hand-edited files. Trailing newline matches hand-edit convention.
            (ROOT / "sources.json").write_text(json.dumps(sources, indent=2, ensure_ascii=False) + "\n")
            stars_path.write_text(json.dumps(stars_state, indent=2, ensure_ascii=False) + "\n")
            if log_lines:
                with (ROOT / "github_changes.log").open("a") as f:
                    f.write("\n".join(log_lines) + "\n")

    # === Step 9: write change-log markdown ===
    out_md = ROOT / "github_candidates" / TODAY[:7].replace("-", "/") / f"{TODAY}.md"
    out_md.parent.mkdir(parents=True, exist_ok=True)
    lines = [
        f"# GitHub sweep — {TODAY}\n",
        ("_Daily change log of trending-repo discoveries. The pipeline auto-extends "
         "`watched_repos` for repos that consistently trend (sustained-day gate). "
         "Manual entries are sacred. Rollback the most recent sweep: `cp sources.json.github.bak sources.json`._\n"),
        "## 📋 What changed in sources.json today\n",
    ]
    if applied_count or hot_count or revived_count:
        if applied_count:
            lines.append(f"- **Added {applied_count} promotion(s) to watched_repos:**")
            for repo in promotions_to_add:
                ent = appearances[repo]
                lines.append(f"  - `{repo}` — {len(ent['trending_dates'])} distinct trending days, +{ent['total_delta_in_window']:,} stars in window")
        if hot_count:
            lines.append(f"- **Added {hot_count} hot-event repo(s):**")
            for repo in hot_events_to_add:
                ent = appearances[repo]
                lines.append(f"  - `{repo}` — +{ent['max_one_day_delta']:,} stars in one day (TTL 30d)")
        if revived_count:
            lines.append(f"- **Re-promoted {revived_count} from deep-watch:**")
            for repo in revivals:
                lines.append(f"  - `{repo}` — trended again in rolling window")
    else:
        lines.append("_No changes to `sources.json` this run._")
    lines.append("")

    # Pending (promote tier but not enough consecutive days)
    pending = [repo for repo, tier in classifications.items()
               if tier == "promote" and repo not in promotions_to_add]
    if pending:
        lines.append(f"## ⏳ Pending — needs more days at promote tier ({len(pending)})\n")
        for repo in pending[:30]:
            ent = appearances[repo]
            hist = stars_state["repos"].get(repo, {}).get("_classification_history", [])
            consec = sum(1 for r in reversed(hist) if r["tier"] == "promote")
            lines.append(f"- `{repo}` — {len(ent['trending_dates'])} trending days · "
                         f"days at promote so far: {consec}/{promo['min_consecutive_days_at_promote']}")
        lines.append("")

    # Watch tier
    watch_repos = [repo for repo, tier in classifications.items() if tier == "watch"]
    if watch_repos:
        lines.append(f"## 👀 Watch list ({len(watch_repos)})\n")
        for repo in watch_repos[:20]:
            ent = appearances[repo]
            lines.append(f"- `{repo}` — {len(ent['trending_dates'])} trending day(s), latest {ent['latest_stars']:,} stars")
        lines.append("")

    lines.append(f"## Tally summary\n")
    lines.append(f"- Repos seen in window ({rolling_days}d): {len(appearances)}")
    lines.append(f"- Currently in watched_repos: {len(watched)} (cap: {cfg.get('auto_apply', {}).get('deep_watch_demote', {}).get('max_watched_repos', 80)})")
    lines.append(f"- Currently in deep_watch_repos: {len(deep_watch)}")
    lines.append(f"- Files scanned: {len(files)}")

    if not args.dry_run:
        out_md.write_text("\n".join(lines))
        rel_path = out_md.relative_to(ROOT).as_posix()
        index_line = (f"- [{TODAY}]({rel_path}) — "
                      f"applied: {applied_count} promotion(s), {hot_count} hot, {revived_count} revived; "
                      f"pending: {len(pending)}; watch: {len(watch_repos)}; "
                      f"watched_repos: {len(watched)} / deep_watch: {len(deep_watch)}")
        upsert_index_marker_line(ROOT / "index.md", "GITHUB", TODAY, index_line)
    print(f"[github_sweep] done. applied {applied_count} promotions, {hot_count} hot events, "
          f"{revived_count} revivals. {len(appearances)} repos seen. wrote {out_md.relative_to(ROOT)}.",
          file=sys.stderr)


if __name__ == "__main__":
    main()
