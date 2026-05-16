#!/bin/bash
# sync_notes.sh — ergonomic wrapper around add_to_notes.applescript
#
# Apple Notes is supposed to refresh automatically via the LaunchAgent
# (com.yves.ai-digest-to-notes.plist) whenever a file in daily/, weekly/,
# monthly/, or trends.md changes. When that's not enough — backfilling a
# missed day, fresh Mac, post-rename cleanup, the watcher dropped an event
# while asleep — use this script.
#
# Usage:
#   ./sync_notes.sh              # refresh newest of each cadence + trends
#   ./sync_notes.sh --all        # ensure every archived .md has a note
#   ./sync_notes.sh <file.md>    # backfill one specific file
#   ./sync_notes.sh --help       # this message
#
# Examples:
#   ./sync_notes.sh
#   ./sync_notes.sh --all
#   ./sync_notes.sh daily/2026-05-05.md
#   ./sync_notes.sh weekly/2026-W19.md

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APPLESCRIPT="$SCRIPT_DIR/add_to_notes.applescript"
# Cadence files live under data/ (flat layout since the 2026-05-16 flatten
# commit). SCRIPT_DIR/../.. is the repo root; data/ is its child and holds
# daily/, weekly/, monthly/ and the rest as siblings.
WORKSPACE="$(cd "$SCRIPT_DIR/../../data" && pwd)"

if [[ ! -f "$APPLESCRIPT" ]]; then
  echo "error: $APPLESCRIPT not found" >&2
  exit 1
fi

case "${1:-}" in
  ""|refresh)
    echo "→ refreshing newest of each cadence (daily, weekly, monthly, trends)…"
    osascript "$APPLESCRIPT"
    echo "✓ done"
    ;;

  --all|-a|sync-all)
    echo "→ syncing ALL archived files in $WORKSPACE…"
    osascript "$APPLESCRIPT" sync-all
    echo "✓ done — every daily/weekly/monthly file now has a corresponding note"
    ;;

  --help|-h|help)
    sed -n '2,/^set -euo/p' "$0" | sed -n '/^#/p' | sed 's/^# \?//'
    exit 0
    ;;

  --*)
    echo "error: unknown flag '$1'. Run --help for usage." >&2
    exit 2
    ;;

  *)
    # Treat as a file path. Accept absolute, workspace-relative, or
    # bare filename in the cwd.
    target="$1"
    if [[ ! -f "$target" ]]; then
      if [[ -f "$WORKSPACE/$target" ]]; then
        target="$WORKSPACE/$target"
      else
        echo "error: file not found: $1" >&2
        exit 3
      fi
    fi
    echo "→ backfilling note from $target…"
    osascript "$APPLESCRIPT" "$target"
    echo "✓ done"
    ;;
esac
