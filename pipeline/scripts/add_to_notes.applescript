-- add_to_notes.applescript
-- Manages the "AI Research" folder in Apple Notes from the workspace
-- markdown files. Three modes:
--
-- (a) Default — refresh newest of each cadence (used by LaunchAgent).
--     osascript scripts/add_to_notes.applescript
--     Rebuilds: AI Digest {newest-daily}, AI Weekly {newest-weekly},
--               AI Monthly {newest-monthly}, AI Trends.
--
-- (b) Single-file backfill — render one specific file into its note.
--     osascript scripts/add_to_notes.applescript daily/2026-05-05.md
--     osascript scripts/add_to_notes.applescript weekly/2026-W19.md
--     Cadence inferred from path prefix.
--
-- (c) Sync-all — ensure every archived .md has a corresponding note.
--     osascript scripts/add_to_notes.applescript sync-all
--     Iterates daily/, weekly/, monthly/ in full + trends.md. Idempotent.
--     Use when you suspect Notes has drifted out of sync (missed days,
--     post-rename cleanup, fresh Mac, etc.).
--
-- All modes dedupe by note title (delete-and-recreate to force a clean
-- layout pass). Notes operations are cheap; skipping logic isn't.

on run argv
	-- Cadence files live under data/ (flat layout since the 2026-05-16 flatten
	-- commit). workspaceFolder is the cadence root that callers pass relative
	-- paths against (daily/…, weekly/…, monthly/…).
	set repoFolder to (POSIX path of (path to home folder)) & "Documents/Claude/Projects/AI Researcher/"
	set workspaceFolder to repoFolder & "data/"
	set renderScript to repoFolder & "pipeline/scripts/render_for_notes.sh"

	tell application "Notes"
		if not (exists folder "AI Research" of default account) then
			tell default account to make new folder with properties {name:"AI Research"}
		end if
	end tell

	if (count of argv) is 0 then
		-- Mode (a): refresh newest of each cadence.
		my refreshFromFolder(workspaceFolder, renderScript, "daily", "AI Digest ")
		my refreshFromFolder(workspaceFolder, renderScript, "weekly", "AI Weekly ")
		my refreshFromFolder(workspaceFolder, renderScript, "monthly", "AI Monthly ")
		my refreshFromSingleFile(workspaceFolder, renderScript, "trends.md", "AI Trends")
	else
		set firstArg to item 1 of argv as text
		if firstArg is "sync-all" then
			-- Mode (c): iterate every archived .md across cadences.
			my syncAllInFolder(workspaceFolder, renderScript, "daily", "AI Digest ")
			my syncAllInFolder(workspaceFolder, renderScript, "weekly", "AI Weekly ")
			my syncAllInFolder(workspaceFolder, renderScript, "monthly", "AI Monthly ")
			my refreshFromSingleFile(workspaceFolder, renderScript, "trends.md", "AI Trends")
		else
			-- Mode (b): single-file backfill.
			my backfillFromArg(workspaceFolder, renderScript, firstArg)
		end if
	end if
end run

on backfillFromArg(workspaceFolder, renderScript, relativeOrAbsolutePath)
	-- Accept either an absolute path or a workspace-relative path.
	if relativeOrAbsolutePath starts with "/" then
		set fullPath to relativeOrAbsolutePath
	else
		set fullPath to workspaceFolder & relativeOrAbsolutePath
	end if

	-- Verify the file exists.
	try
		do shell script "test -f " & quoted form of fullPath
	on error
		display dialog "Backfill failed: file not found at " & fullPath buttons {"OK"} default button "OK"
		return
	end try

	-- Infer cadence and title prefix from the path.
	set baseTitle to do shell script "basename " & quoted form of fullPath & " .md | sed 's/-v[0-9]*$//'"

	if fullPath contains "/daily/" then
		set noteTitle to "AI Digest " & baseTitle
	else if fullPath contains "/weekly/" then
		set noteTitle to "AI Weekly " & baseTitle
	else if fullPath contains "/monthly/" then
		set noteTitle to "AI Monthly " & baseTitle
	else if fullPath ends with "trends.md" then
		set noteTitle to "AI Trends"
	else
		display dialog "Backfill failed: cannot infer cadence from path " & fullPath & ". Expected daily/, weekly/, monthly/, or trends.md." buttons {"OK"} default button "OK"
		return
	end if

	my writeNote(renderScript, fullPath, noteTitle)
end backfillFromArg

on refreshFromFolder(workspaceFolder, renderScript, folderName, titlePrefix)
	set folderPath to workspaceFolder & folderName & "/"
	-- Find the newest *.md across the nested {YYYY}/{MM}/ subfolders.
	-- Layout post-2026-05-12 migration: daily/, news/, papers/, blogs/,
	-- jobs/, linkedin/, radar/ nest by year+month; weekly/, monthly/ by year.
	set fullPath to ""
	try
		set fullPath to do shell script "find " & quoted form of folderPath & " -type f -name '*.md' 2>/dev/null | sort | tail -1"
	end try
	if fullPath is "" then return -- folder empty / missing, nothing to do

	-- baseName from the leaf file name, strip -v2/-v3
	set baseName to do shell script "basename " & quoted form of fullPath & " .md | sed 's/-v[0-9]*$//'"
	set noteTitle to titlePrefix & baseName

	my writeNote(renderScript, fullPath, noteTitle)
end refreshFromFolder

on syncAllInFolder(workspaceFolder, renderScript, folderName, titlePrefix)
	-- Iterate every *.md in the folder (nested {YYYY}/{MM}/ subfolders) and
	-- write/refresh its corresponding note. Skips -v2/-v3 versioned files
	-- since the AppleScript dedupes titles after stripping the suffix anyway.
	set folderPath to workspaceFolder & folderName & "/"
	set fileList to ""
	try
		-- Find newline-separated absolute paths. Drop -v2-style siblings.
		set fileList to do shell script "find " & quoted form of folderPath & " -type f -name '*.md' 2>/dev/null | grep -v -- '-v[0-9][0-9]*\\.md$' | sort"
	end try
	if fileList is "" then return

	-- Split on newlines.
	set AppleScript's text item delimiters to {linefeed}
	set fileItems to text items of fileList
	set AppleScript's text item delimiters to ""

	repeat with f in fileItems
		set fullPath to f as text
		if fullPath is not "" then
			-- fullPath is now absolute (find returns full paths). Derive note title from leaf basename.
			set baseName to do shell script "basename " & quoted form of fullPath & " .md"
			set noteTitle to titlePrefix & baseName
			my writeNote(renderScript, fullPath, noteTitle)
		end if
	end repeat
end syncAllInFolder

on refreshFromSingleFile(workspaceFolder, renderScript, fileName, noteTitle)
	set fullPath to workspaceFolder & fileName
	-- Skip if the file doesn't exist.
	try
		do shell script "test -f " & quoted form of fullPath
	on error
		return
	end try
	my writeNote(renderScript, fullPath, noteTitle)
end refreshFromSingleFile

on writeNote(renderScript, fullPath, noteTitle)
	set bodyHTML to do shell script "/bin/bash " & quoted form of renderScript & " " & quoted form of fullPath
	-- Wrap with an H1 so Apple Notes uses our title as the heading. We
	-- intentionally don't set `name:` on the note (Apple Notes auto-derives
	-- it from the H1 text — setting both makes a small duplicate subtitle).
	set fullBody to "<h1>" & noteTitle & "</h1>" & bodyHTML

	tell application "Notes"
		set targetFolder to folder "AI Research" of default account
		set existing to notes of targetFolder whose name is noteTitle
		repeat with i from (count of existing) to 1 by -1
			delete item i of existing
		end repeat
		tell targetFolder to make new note with properties {body:fullBody}
	end tell
end writeNote
