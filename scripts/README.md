# Apple Notes delivery

Five files bridge the digests into Apple Notes:

- `add_to_notes.applescript` — reads the newest `daily/*.md` (or any file passed as an argument), hands it to `render_for_notes.sh`, and (re)creates a note in an "AI Research" folder. Three modes — see "Sync command" below. Deduplicates by title.
- `sync_notes.sh` — ergonomic wrapper. **This is the command to remember.** Use it whenever Notes drift out of sync.
- `render_for_notes.sh` — orchestrates the rendering pipeline: runs `preprocess_digest.py`, then converts to HTML via `pandoc` (preferred), Python `markdown` (fallback), or a `<pre>` plain dump (last resort).
- `preprocess_digest.py` — Notes-specific transforms applied to the markdown on its way to HTML (the source `daily/*.md` is left untouched):
  - inserts Apple Notes tags `#ai-daily #YYYY-MM-DD` under the H1 (Notes indexes tags natively)
  - rewrites relative `(../news/...)` links to absolute `file://` URLs that actually open from Notes
  - converts the Pipeline status bullets to GFM task-list checkboxes (`- [x]` / `- [ ]`) — Notes renders these as real checkboxes
  - wraps the TL;DR section in a blockquote for visual emphasis
- `com.yves.ai-digest-to-notes.plist` — LaunchAgent. **Primary trigger:** watches the `daily/`, `weekly/`, `monthly/` folders and `trends.md`, fires within seconds of any new file landing — independent of how long the orchestrator took. **Backup trigger:** 22:00 calendar fire, in case the watcher missed the event (e.g. Mac was asleep). Dedupe in the AppleScript makes both safe to run.

## Sync command — `sync_notes.sh`

Three modes, all run via the wrapper for clarity:

```bash
# Refresh the newest of each cadence (daily, weekly, monthly, trends).
# Same operation the LaunchAgent performs.
./scripts/sync_notes.sh

# Sync ALL archived files — ensure every daily/weekly/monthly .md has
# a corresponding note. Idempotent. Use after rename/cleanup operations,
# fresh-Mac setups, or whenever Notes is missing days.
./scripts/sync_notes.sh --all

# Backfill one specific file by path (workspace-relative or absolute).
./scripts/sync_notes.sh daily/2026-05-05.md
./scripts/sync_notes.sh weekly/2026-W19.md
```

Run from the workspace root or with the absolute path:

```bash
"$HOME/Documents/Claude/Projects/AI Researcher/scripts/sync_notes.sh" --all
```

When the LaunchAgent's WatchPaths fail to fire (Mac asleep on file change, the watcher missed the event, or a manual rename didn't trigger inotify), `sync_notes.sh --all` is the recovery hammer.

## One-time install

```bash
# 1. (recommended) better formatting — install pandoc once
brew install pandoc            # fallback: pip3 install markdown

# 2. make sure the helper scripts are executable
chmod +x "/Users/yruosch/Documents/Claude/Projects/AI Researcher/scripts/render_for_notes.sh"
chmod +x "/Users/yruosch/Documents/Claude/Projects/AI Researcher/scripts/preprocess_digest.py"
chmod +x "/Users/yruosch/Documents/Claude/Projects/AI Researcher/scripts/sync_notes.sh"

# 3. allow the AppleScript to control Notes the first time
osascript "/Users/yruosch/Documents/Claude/Projects/AI Researcher/scripts/add_to_notes.applescript"
# macOS will prompt: "osascript wants access to control Notes" → allow.
# Confirm a new note appeared in Notes → "AI Research" folder.

# 4. install the launch agent — primary trigger watches daily/, backup at 22:00
cp "/Users/yruosch/Documents/Claude/Projects/AI Researcher/scripts/com.yves.ai-digest-to-notes.plist" ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.yves.ai-digest-to-notes.plist
```

## Iterate on rendering

The preprocessor is decoupled from Notes — you can preview what Notes will see by piping through `render_for_notes.sh`:

```bash
# see the preprocessed markdown
python3 "/Users/yruosch/Documents/Claude/Projects/AI Researcher/scripts/preprocess_digest.py" \
  "/Users/yruosch/Documents/Claude/Projects/AI Researcher/daily/2026-05-05.md"

# see the rendered HTML (what gets stuffed into Notes' body)
bash "/Users/yruosch/Documents/Claude/Projects/AI Researcher/scripts/render_for_notes.sh" \
  "/Users/yruosch/Documents/Claude/Projects/AI Researcher/daily/2026-05-05.md"
```

## Verify

```bash
# next scheduled fire
launchctl list | grep ai-digest-to-notes

# fire it manually
launchctl start com.yves.ai-digest-to-notes
# then check /tmp/ai-digest-to-notes.{out,err} and your Notes app
```

## Uninstall

```bash
launchctl unload ~/Library/LaunchAgents/com.yves.ai-digest-to-notes.plist
rm ~/Library/LaunchAgents/com.yves.ai-digest-to-notes.plist
```

## Notes

- The watcher fires within seconds of the orchestrator dropping the daily file — no fixed time, so no race if the orchestrator runs long.
- The 22:00 calendar fire is a backup for cases where the watcher missed the event (Mac asleep, user logged out). Dedupe in the AppleScript keeps it safe.
- If the Mac is asleep both at write time and at 22:00, launchd holds missed events and fires them on next wake — you still get the note when you next open the lid.
- The "AI Research" folder is created in your default Notes account on first run (iCloud if signed in, otherwise local On-My-Mac).
- Reload after editing the plist:
  ```bash
  launchctl unload ~/Library/LaunchAgents/com.yves.ai-digest-to-notes.plist
  launchctl load   ~/Library/LaunchAgents/com.yves.ai-digest-to-notes.plist
  ```
