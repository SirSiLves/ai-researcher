#!/usr/bin/env python3
"""Rebuild radar/index.json manifest from all radar/**/*.json files.

Idempotent — scans the radar tree every time. Consumed by the webapp.
Called at the end of every ai-trend-radar run (and any backfill wave)
so manual additions / deletions / backfills are reflected.

Paths stored in the manifest are RELATIVE TO DATA_ROOT (e.g. `radar/2026/05/
2026-05-14.json`) — the webapp's DataService prepends `data/`.
"""

import json
import sys

from _lib import DATA_ROOT, RADAR_DIR


def main() -> int:
    radar_dir = RADAR_DIR
    entries = []
    for path in sorted(radar_dir.rglob("*.json")):
        if path.name == "index.json":
            continue
        date_id = path.stem
        try:
            with open(path) as handle:
                data = json.load(handle)
            rel_json = path.relative_to(DATA_ROOT).as_posix()
            rel_md = rel_json.replace(".json", ".md")
            entries.append(
                {
                    "date_id": date_id,
                    "date": data.get("date", date_id),
                    "topic_count": len(data.get("topics", [])),
                    "stage_movement_count": len(data.get("stage_movements", [])),
                    "json_path": rel_json,
                    "md_path": rel_md,
                    "is_versioned": "-v" in date_id,
                }
            )
        except Exception as exc:  # noqa: BLE001
            print(f"skip {path}: {exc}", file=sys.stderr)

    entries.sort(key=lambda e: (e["date"], e["is_versioned"]), reverse=True)

    payload = {
        "generated_at": entries[0]["date"] if entries else None,
        "entries": entries,
        "_note": "Updated by ai-trend-radar at the end of each run. Consumed by the webapp.",
    }
    out = radar_dir / "index.json"
    with open(out, "w") as handle:
        json.dump(payload, handle, indent=2)

    newest = entries[0]["date_id"] if entries else "none"
    print(f"manifest: {len(entries)} entries, newest = {newest}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
