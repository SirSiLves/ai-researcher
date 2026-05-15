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
# Optional as-of override (any mode):
#
#   ./now.sh --for 2026-05-08   # treat that date as TODAY; all derived
#                                fields (WEEK_ID, MONDAY, SUNDAY, DOW_ISO,
#                                IS_MONDAY, IS_FIRST_MONDAY_OF_MONTH, MONTH,
#                                PREV_WEEK_*) are computed relative to it.
#                                Used by the ai-replay skill when re-running
#                                the pipeline for a past or specific date.
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

# Parse optional --for DATE override anywhere in argv. Any value passed to
# --for must be ISO YYYY-MM-DD. Anything else exits with an error. After
# extraction, the remaining args are passed through to the mode dispatcher.
AS_OF=""
remaining=()
while [ "$#" -gt 0 ]; do
  case "$1" in
    --for)
      if [ "$#" -lt 2 ]; then
        echo "error: --for requires a YYYY-MM-DD argument" >&2
        exit 2
      fi
      AS_OF="$2"
      shift 2
      ;;
    --for=*)
      AS_OF="${1#*=}"
      shift
      ;;
    *)
      remaining+=("$1")
      shift
      ;;
  esac
done
# Restore remaining args for the mode dispatcher below.
set -- "${remaining[@]+"${remaining[@]}"}"

# Run python3 for the heavy lifting. Reliable across macOS and Linux.
fields=$(AS_OF="$AS_OF" python3 - <<'PY'
import os
from datetime import date, datetime, timedelta
as_of = os.environ.get("AS_OF", "").strip()
if as_of:
    try:
        today = date.fromisoformat(as_of)
    except ValueError:
        raise SystemExit(f"error: --for value '{as_of}' is not YYYY-MM-DD")
else:
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
# AS_OF marker — empty for live "today", set to the override when --for is
# used. Skills can check this to know whether they're in a replay run and
# (e.g.) format an "as-of" note in their output header.
print(f"AS_OF={as_of}")
PY
)

case "${1:-}" in
  ""|--shell)
    # Prefix `export ` so a single `eval "$(scripts/now.sh)"` makes these
    # vars visible to spawned Python subprocesses (otherwise they only set
    # local shell variables). Scripts still fall back to date.today() if
    # TODAY isn't in the env, so standalone runs keep working.
    printf '%s\n' "$fields" | sed 's/^/export /'
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
