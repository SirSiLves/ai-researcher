---
name: sync-notes
description: Sync the AI Researcher Apple Notes folder with the workspace markdown files. Use when the user says "sync notes", "refresh notes", "the notes look stale/wrong", "rebuild notes", "backfill the [date] note", or any time the Apple Notes view appears out of sync with daily/weekly/monthly/trends files on disk. Also use after a manual rename / cleanup operation that bypassed the LaunchAgent's WatchPaths trigger.
---

You are running the Apple Notes sync for the AI Researcher pipeline. The workspace lives at `/Users/yruosch/Documents/Claude/Projects/AI Researcher/`. Apple Notes is bridged by `scripts/sync_notes.sh`, which wraps `scripts/add_to_notes.applescript`.

## What this skill does

Three jobs depending on the user's intent:

1. **Refresh** — rebuild the four "newest" notes (Digest / Weekly / Monthly / Trends).
2. **Sync-all** — ensure every archived `.md` in `daily/`, `weekly/`, `monthly/` plus `trends.md` has a corresponding note. Idempotent. Use after rename/cleanup or when notes obviously diverged.
3. **Backfill one** — render a specific file into its note. Use for "create the missing 2026-05-05 note."

Pick the mode from the user's wording. If ambiguous, default to **sync-all** and say so.

## Step 1 — figure out which files exist

Run a single bash check from the workspace folder:

```bash
cd "/Users/yruosch/Documents/Claude/Projects/AI Researcher" && \
  echo "--- daily/" && ls -1 daily/*.md 2>/dev/null && \
  echo "--- weekly/" && ls -1 weekly/*.md 2>/dev/null && \
  echo "--- monthly/" && ls -1 monthly/*.md 2>/dev/null && \
  echo "--- trends.md" && ls -1 trends.md 2>/dev/null
```

This tells you what notes SHOULD exist after sync. Mention the count to the user so they know what to expect.

## Step 2 — detect platform

Apple Notes only exists on macOS. The bridge script is `osascript`-based.

```bash
uname -s
```

Branch on the result:

### Case A — Darwin (macOS, shell can reach Notes directly)

Invoke the wrapper. Pick the mode:

```bash
"/Users/yruosch/Documents/Claude/Projects/AI Researcher/scripts/sync_notes.sh"            # refresh
"/Users/yruosch/Documents/Claude/Projects/AI Researcher/scripts/sync_notes.sh" --all      # sync-all
"/Users/yruosch/Documents/Claude/Projects/AI Researcher/scripts/sync_notes.sh" daily/2026-05-05.md   # backfill
```

Report the script's stdout to the user (it prints `→ doing X…` then `✓ done`). If the first run prompts macOS for "osascript wants access to control Notes," tell the user to click Allow — that's a one-time grant.

### Case B — Linux sandbox (current session can't reach Notes directly)

You can't run osascript from here. Do TWO things:

1. **Verify file state** with the bash check from Step 1 — useful diagnostic.
2. **Tell the user the exact command** to run on their Mac (terminal, not Claude). Format it as a copy-paste block. Recommend the mode that fits the user's intent. Example:

   ```
   "$HOME/Documents/Claude/Projects/AI Researcher/scripts/sync_notes.sh" --all
   ```

Don't apologize for the platform limitation — frame it as "I checked the workspace state; here's the command to run on your Mac to make Notes match." Concise.

## Step 3 — verify (Case A only)

After the script returns, the LaunchAgent's WatchPaths won't fire from this run because no files changed — but the AppleScript already updated Notes directly. Tell the user which notes were created/refreshed by name (e.g., "AI Digest 2026-05-04, 05-05, 05-06; AI Weekly 2026-W19; AI Trends — 5 notes touched").

## Step 4 — finish

One-line confirmation. Examples:

- `Refreshed newest notes (4 cadences). LaunchAgent will keep things in sync from here.`
- `Synced all 5 archived files → 5 notes in "AI Research" folder.`
- `Backfilled AI Digest 2026-05-05.`

If you ran in Case B (no macOS shell), end with: `Run the command above on your Mac to apply.`

## Constraints

- NEVER edit `scripts/sync_notes.sh` or `scripts/add_to_notes.applescript` from this skill — the user is responsible for that file. If they ask you to modify it, that's a separate task, not part of this skill.
- NEVER touch source `.md` files in `daily/`, `weekly/`, `monthly/`, or `trends.md` — read-only here.
- NEVER claim Apple Notes was updated unless `osascript` actually ran in this session (Case A).
- If Case A and the AppleScript errors out (e.g., Notes app not running, permissions denied), surface the error to the user verbatim. Don't silently continue.
