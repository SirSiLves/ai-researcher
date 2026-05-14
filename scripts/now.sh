#!/bin/bash
# now.sh — canonical date/time utility for the AI Researcher pipeline.
#
# Single source of truth for "what's today, what week is it, what's the
# Monday/Sunday boundary, what month are we in." Every SKILL and the
# orchestrator should call this instead of computing dates ad-hoc with
# `date +%Y-%m-%d` and bash ISO-week math (which has been a source of bugs).
#
# Two output modes:
#
#   ./now.sh                    # shell-eval format (KEY=VALUE per line)
#   ./now.sh --json             # JSON object
#   ./now.sh --field FIELD      # just one field's value (e.g. TODAY, WEEK_ID)
#
# Fields emitted:
#   TODAY      — YYYY-MM-DD
#   YYYY, MM, DD — components
#   MONTH      — YYYY-MM
#   WEEK_ID    — YYYY-Www (ISO 8601 week date, e.g. 2026-W20)
#   MONDAY     — YYYY-MM-DD of the week's Monday (ISO week start)
#   SUNDAY     — YYYY-MM-DD of the week's Sunday (ISO week end)
#   DOW_ISO    — 1=Monday … 7=Sunday
#   IS_MONDAY  — 1 if today is Monday, else 0
#   IS_FIRST_MONDAY_OF_MONTH — 1 if today is the first Monday of the month, else 0
#   EPOCH      — unix timestamp of midnight (local TZ) today
#   ISO_TS     — full ISO 8601 timestamp with timezone (for logging)
#
# All times are LOCAL timezone. macOS `date` is BSD; uses `python3` under
# the hood for portability where BSD date lacks features.

set -euo pipefail

# Run python3 for the heavy lifting. Reliable across macOS and Linux.
fields=$(python3 - <<'PY'
from datetime import date, datetime, timedelta
today = date.today()
iso = today.isocalendar()
monday = date.fromisocalendar(iso.year, iso.week, 1)
sunday = monday + timedelta(days=6)
# Previous week (used by ai-trends on Monday — reads the just-completed week,
# not the current week that has only just started accumulating).
prev_anchor = today - timedelta(days=7)
prev_iso = prev_anchor.isocalendar()
prev_monday = date.fromisocalendar(prev_iso.year, prev_iso.week, 1)
prev_sunday = prev_monday + timedelta(days=6)
# First Monday of the month
first_of_month = today.replace(day=1)
offset = (7 - first_of_month.isoweekday() + 1) % 7
first_monday = first_of_month + timedelta(days=offset)
now = datetime.now().astimezone()
print(f"TODAY={today.isoformat()}")
print(f"YYYY={today.year:04d}")
print(f"MM={today.month:02d}")
print(f"DD={today.day:02d}")
print(f"MONTH={today.year:04d}-{today.month:02d}")
print(f"WEEK_ID={iso.year:04d}-W{iso.week:02d}")
print(f"MONDAY={monday.isoformat()}")
print(f"SUNDAY={sunday.isoformat()}")
print(f"PREV_WEEK_ID={prev_iso.year:04d}-W{prev_iso.week:02d}")
print(f"PREV_WEEK_MONDAY={prev_monday.isoformat()}")
print(f"PREV_WEEK_SUNDAY={prev_sunday.isoformat()}")
print(f"DOW_ISO={today.isoweekday()}")
print(f"IS_MONDAY={'1' if today.isoweekday() == 1 else '0'}")
print(f"IS_FIRST_MONDAY_OF_MONTH={'1' if today == first_monday else '0'}")
print(f"EPOCH={int(datetime.combine(today, datetime.min.time()).timestamp())}")
print(f"ISO_TS={now.isoformat(timespec='seconds')}")
PY
)

case "${1:-}" in
  ""|--shell)
    printf '%s\n' "$fields"
    ;;
  --json)
    # Convert KEY=VALUE lines to JSON
    python3 - <<PY
import json
fields = """$fields"""
out = {}
for line in fields.strip().splitlines():
    k, v = line.split('=', 1)
    # Try int conversion
    try: v = int(v)
    except: pass
    out[k] = v
print(json.dumps(out, indent=2))
PY
    ;;
  --field)
    if [ "$#" -lt 2 ]; then
      echo "usage: now.sh --field FIELDNAME" >&2
      exit 2
    fi
    target="$2"
    printf '%s\n' "$fields" | awk -F= -v t="$target" '$1 == t { print $2; exit }'
    ;;
  --help|-h)
    sed -n '2,/^set -euo/p' "$0" | sed -n '/^#/p' | sed 's/^# \?//'
    exit 0
    ;;
  *)
    echo "error: unknown arg '$1'. Run --help for usage." >&2
    exit 2
    ;;
esac
