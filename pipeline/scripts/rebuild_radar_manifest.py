#!/usr/bin/env python3
"""Rebuild radar/index.json manifest from all radar/**/*.json files.

Idempotent — scans the radar tree every time. Consumed by radar.html.
Called at the end of every ai-trend-radar run (and any backfill wave)
so manual additions / deletions / backfills are reflected.
"""

import glob
import json
import os
import sys


def main() -> int:
    entries = []
    for path in sorted(glob.glob("radar/**/*.json", recursive=True)):
        if os.path.basename(path) == "index.json":
            continue
        date_id = os.path.basename(path).replace(".json", "")
        try:
            with open(path) as handle:
                data = json.load(handle)
            entries.append(
                {
                    "date_id": date_id,
                    "date": data.get("date", date_id),
                    "topic_count": len(data.get("topics", [])),
                    "stage_movement_count": len(data.get("stage_movements", [])),
                    "json_path": path,
                    "md_path": path.replace(".json", ".md"),
                    "is_versioned": "-v" in date_id,
                }
            )
        except Exception as exc:  # noqa: BLE001
            print(f"skip {path}: {exc}", file=sys.stderr)

    entries.sort(key=lambda e: (e["date"], e["is_versioned"]), reverse=True)

    payload = {
        "generated_at": entries[0]["date"] if entries else None,
        "entries": entries,
        "_note": "Updated by ai-trend-radar at the end of each run. Consumed by radar.html.",
    }
    with open("radar/index.json", "w") as handle:
        json.dump(payload, handle, indent=2)

    newest = entries[0]["date_id"] if entries else "none"
    print(f"manifest: {len(entries)} entries, newest = {newest}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
