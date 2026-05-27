#!/usr/bin/env python3
"""One-shot helper for ai-github SKILL: scrape trending + watched-repo stars.

Outputs a JSON blob on stdout so the agent can format markdown.
"""
import json
import re
import sys
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from html import unescape
from pathlib import Path

ROOT = Path("/sessions/exciting-youthful-maxwell/mnt/AI Researcher")
SOURCES = ROOT / "pipeline/state/sources.json"
STATE = ROOT / "pipeline/state/github_stars.json"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "en-US,en;q=0.9",
}

NUM_RE = re.compile(r"[\d,]+")


def fetch(url, retries=2, timeout=25):
    for attempt in range(retries + 1):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read().decode("utf-8", errors="replace"), None
        except Exception as e:
            if attempt == retries:
                return None, str(e)
            time.sleep(2 + attempt * 2)
    return None, "unknown"


def parse_trending(html):
    """Parse github.com/trending HTML; one article per repo."""
    repos = []
    # split by <article tags
    chunks = html.split("<article")
    for ch in chunks[1:]:
        # owner/name from h2 > a[href='/owner/name']
        m = re.search(r'<h2[^>]*>.*?<a[^>]*href="/([^/"]+)/([^"/]+)"', ch, re.S)
        if not m:
            continue
        owner, name = m.group(1), m.group(2)
        if not owner or not name:
            continue
        # description
        desc_m = re.search(r'<p[^>]*class="col-9[^"]*"[^>]*>(.*?)</p>', ch, re.S)
        if not desc_m:
            desc_m = re.search(r'<p[^>]*>(.*?)</p>', ch, re.S)
        desc = ""
        if desc_m:
            desc = re.sub(r"<[^>]+>", "", desc_m.group(1)).strip()
            desc = unescape(re.sub(r"\s+", " ", desc))
        # language
        lang_m = re.search(r'<span itemprop="programmingLanguage">([^<]+)</span>', ch)
        lang = lang_m.group(1).strip() if lang_m else "-"
        # total stars: first /stargazers link's enclosing <a> text
        stars_m = re.search(
            r'<a[^>]*href="/[^"]+/stargazers"[^>]*>(.*?)</a>', ch, re.S
        )
        total_stars = None
        if stars_m:
            inner = re.sub(r"<[^>]+>", "", stars_m.group(1))
            mn = re.search(r"[\d,]+", inner)
            if mn:
                total_stars = int(mn.group(0).replace(",", ""))
        # stars today: span.d-inline-block.float-sm-right contains "N stars today" or "N stars this week"
        today_m = re.search(
            r'<span[^>]*class="d-inline-block float-sm-right"[^>]*>(.*?)</span>',
            ch,
            re.S,
        )
        stars_today = 0
        if today_m:
            txt = re.sub(r"<[^>]+>", "", today_m.group(1))
            mn = re.search(r"([\d,]+)\s+stars?", txt)
            if mn:
                stars_today = int(mn.group(1).replace(",", ""))
        repos.append(
            {
                "full_name": f"{owner}/{name}",
                "owner": owner,
                "name": name,
                "description": desc,
                "language": lang,
                "total_stars": total_stars,
                "stars_today": stars_today,
            }
        )
    return repos


def parse_topic(html):
    """github.com/topics/X HTML — find repo articles too."""
    repos = []
    # topic pages use <article ...> blocks similar in structure
    chunks = html.split("<article")
    for ch in chunks[1:]:
        m = re.search(r'<h3[^>]*>.*?<a[^>]*href="/([^/"]+)/([^"/]+)"', ch, re.S)
        if not m:
            # try h2
            m = re.search(r'<h[12]?\s[^>]*>.*?<a[^>]*href="/([^/"]+)/([^"/]+)"', ch, re.S)
            if not m:
                continue
        owner, name = m.group(1), m.group(2)
        # description: <div class="px-3 pt-3"> contains a <p>
        desc_m = re.search(r'<p[^>]*class="[^"]*color-fg-muted[^"]*"[^>]*>(.*?)</p>', ch, re.S)
        if not desc_m:
            desc_m = re.search(r'<p[^>]*>(.*?)</p>', ch, re.S)
        desc = ""
        if desc_m:
            desc = re.sub(r"<[^>]+>", "", desc_m.group(1)).strip()
            desc = unescape(re.sub(r"\s+", " ", desc))
        # total stars: look for star count near the star icon — usually in a span after stargazers link or aria-label
        stars_m = re.search(r'aria-label="([\d,]+)\s+users? starred', ch)
        total_stars = int(stars_m.group(1).replace(",", "")) if stars_m else None
        if total_stars is None:
            sm2 = re.search(r'<a[^>]*href="/[^"]+/stargazers"[^>]*>(.*?)</a>', ch, re.S)
            if sm2:
                inner = re.sub(r"<[^>]+>", "", sm2.group(1))
                mn = re.search(r"[\d,]+", inner)
                if mn:
                    total_stars = int(mn.group(0).replace(",", ""))
        repos.append(
            {
                "full_name": f"{owner}/{name}",
                "owner": owner,
                "name": name,
                "description": desc,
                "language": "-",
                "total_stars": total_stars,
                "stars_today": 0,  # topic pages don't show daily delta
            }
        )
    return repos


def parse_repo_stars(html):
    """Repo page: extract total stars from #repo-stars-counter-star aria-label or text."""
    # the counter span carries aria-label="76,234 users starred this repository"
    m = re.search(
        r'id="repo-stars-counter-star"[^>]*aria-label="([\d,]+)\s+users?', html
    )
    if m:
        return int(m.group(1).replace(",", ""))
    m = re.search(
        r'id="repo-stars-counter-star"[^>]*title="([\d,]+)"', html
    )
    if m:
        return int(m.group(1).replace(",", ""))
    # fallback: <span id="repo-stars-counter-star" ...>76.2k</span>  (formatted)
    m = re.search(r'id="repo-stars-counter-star"[^>]*>([^<]+)<', html)
    if m:
        txt = m.group(1).strip()
        # could be "76,234" or "76.2k"
        if "," in txt or txt.replace(".", "").isdigit():
            try:
                return int(txt.replace(",", ""))
            except ValueError:
                pass
        # k/m suffix → unreliable; skip and use other approach
    # last fallback: parse <a href="/{owner}/{name}/stargazers"> text
    m = re.search(
        r'href="[^"]+/stargazers"[^>]*>\s*<svg[^>]*>.*?</svg>\s*<span[^>]*>([^<]+)<',
        html,
        re.S,
    )
    if m:
        txt = m.group(1).strip().replace(",", "")
        if txt.isdigit():
            return int(txt)
    return None


def main():
    sources = json.loads(SOURCES.read_text())
    gc = sources["github_collector"]
    state = {}
    if STATE.exists():
        state = json.loads(STATE.read_text())
    repos_state = state.get("repos", {})

    trending_urls = gc["trending_pages"]
    topic_urls = gc["ai_topic_pages"]
    watched = gc["watched_repos"]

    # Skip deep_watch_repos for fetching
    deep_watch = set(gc.get("deep_watch_repos", []))
    watched = [r for r in watched if r not in deep_watch]

    results = {"trending": {}, "topics": {}, "watched": {}, "errors": []}

    # 1. Trending pages (parallel)
    def do_trending(u):
        h, e = fetch(u)
        if e or not h:
            return u, [], e or "empty"
        return u, parse_trending(h), None

    with ThreadPoolExecutor(max_workers=5) as ex:
        futs = {ex.submit(do_trending, u): u for u in trending_urls}
        for f in as_completed(futs):
            u, items, err = f.result()
            results["trending"][u] = {"items": items, "error": err}
            if err:
                results["errors"].append(f"trending {u}: {err}")

    # 2. Topic pages (parallel)
    def do_topic(u):
        h, e = fetch(u)
        if e or not h:
            return u, [], e or "empty"
        return u, parse_topic(h), None

    with ThreadPoolExecutor(max_workers=5) as ex:
        futs = {ex.submit(do_topic, u): u for u in topic_urls}
        for f in as_completed(futs):
            u, items, err = f.result()
            results["topics"][u] = {"items": items, "error": err}
            if err:
                results["errors"].append(f"topic {u}: {err}")

    # 3. Watched repos — parallel star fetch
    def do_watch(slug):
        url = f"https://github.com/{slug}"
        h, e = fetch(url)
        if e or not h:
            return slug, None, e or "empty"
        return slug, parse_repo_stars(h), None

    with ThreadPoolExecutor(max_workers=10) as ex:
        futs = {ex.submit(do_watch, s): s for s in watched}
        done = 0
        for f in as_completed(futs):
            slug, stars, err = f.result()
            results["watched"][slug] = {"stars": stars, "error": err}
            if err or stars is None:
                results["errors"].append(f"watched {slug}: {err or 'no stars parsed'}")
            done += 1

    # 4. Reduce: build trending list and dedupe; build watched deltas
    trending_map = {}
    for u, blob in results["trending"].items():
        for r in blob["items"]:
            key = r["full_name"]
            existing = trending_map.get(key)
            if existing is None or (r.get("stars_today") or 0) > (existing.get("stars_today") or 0):
                trending_map[key] = r
    for u, blob in results["topics"].items():
        for r in blob["items"]:
            key = r["full_name"]
            if key not in trending_map:
                # topic-found repos don't have a daily delta; treat as 0
                trending_map[key] = r

    # 5. Build state diff/output
    out = {
        "results": results,
        "trending_map": trending_map,
        "watched_repos_input": watched,
        "prior_state_repos_count": len(repos_state),
    }
    print(json.dumps(out, default=str))


if __name__ == "__main__":
    main()
