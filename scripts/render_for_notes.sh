#!/bin/bash
# render_for_notes.sh PATH_TO_DAILY_MD
# Outputs HTML on stdout, ready to set as Apple Notes body.
#
# Pipeline:  source.md  ->  preprocess_digest.py  ->  pandoc (or python markdown)
#
# When invoked from AppleScript's `do shell script`, the PATH is stripped to
# `/usr/bin:/bin:/usr/sbin:/sbin` — Homebrew's `/opt/homebrew/bin` and
# `/usr/local/bin` are NOT included by default, so a plain `command -v pandoc`
# fails even when pandoc is installed. We fix this by:
#   (a) exporting Homebrew paths into PATH at script start, AND
#   (b) probing common absolute paths for pandoc as a belt-and-suspenders.
# If pandoc still isn't found, we try python's `markdown` package; final
# fallback is a <pre>-wrapped plain dump that at least preserves line breaks.
#
# Diagnostic: set the env var `RENDER_DEBUG=1` to log which renderer was used
# to /tmp/render_for_notes.log. Useful when troubleshooting why Notes shows
# raw markdown instead of formatted text.
set -euo pipefail

# Make Homebrew binaries reachable when the launcher (AppleScript / launchd)
# stripped PATH. Do this BEFORE any `command -v` check.
export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/local/sbin:${PATH:-/usr/bin:/bin}"

if [ "$#" -ne 1 ]; then
    echo "usage: render_for_notes.sh PATH_TO_DAILY_MD" >&2
    exit 2
fi

INPUT="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

log() {
    if [ "${RENDER_DEBUG:-}" = "1" ]; then
        printf '%s\t%s\n' "$(date +%FT%T)" "$*" >> /tmp/render_for_notes.log
    fi
}

PROCESSED="$(python3 "$SCRIPT_DIR/preprocess_digest.py" "$INPUT")"

# Probe for pandoc: try absolute Homebrew paths first, then PATH search.
PANDOC=""
for candidate in "/opt/homebrew/bin/pandoc" "/usr/local/bin/pandoc"; do
    if [ -x "$candidate" ]; then
        PANDOC="$candidate"
        break
    fi
done
if [ -z "$PANDOC" ]; then
    if PANDOC_FROM_PATH="$(command -v pandoc 2>/dev/null)"; then
        PANDOC="$PANDOC_FROM_PATH"
    fi
fi

if [ -n "$PANDOC" ]; then
    log "renderer: pandoc ($PANDOC) for $INPUT"
    printf '%s' "$PROCESSED" | "$PANDOC" -f gfm -t html
elif python3 -c 'import markdown' 2>/dev/null; then
    log "renderer: python-markdown for $INPUT"
    printf '%s' "$PROCESSED" | python3 -c "
import sys, markdown
print(markdown.markdown(
    sys.stdin.read(),
    extensions=['extra', 'sane_lists', 'tables', 'fenced_code']
))"
else
    log "renderer: <pre> fallback (no pandoc, no python-markdown) for $INPUT"
    # Escape minimal HTML so the raw markdown at least doesn't break the page.
    ESCAPED="$(printf '%s' "$PROCESSED" | sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g')"
    printf '<pre>%s</pre>' "$ESCAPED"
fi
