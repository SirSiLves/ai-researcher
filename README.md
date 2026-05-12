# AI Researcher

A daily research pipeline that tracks the LLM / Generative AI space and the Swiss AI job market. **One scheduled task** orchestrates a team of five subagents in parallel, then synthesizes their outputs into a single daily digest.

## Architecture

```
sources.json                ← per-collector config (edit this to change what's tracked)
skills/
  ai-news/SKILL.md          ← subagent prompt: vendor blogs + tech news + breaking-news search
  ai-papers/SKILL.md        ← subagent prompt: ArXiv + HF Papers, LLM/agent-relevant only
  ai-blogs/SKILL.md         ← subagent prompt: long-form analyst blogs + Medium tags
  ai-jobs-ch/SKILL.md       ← subagent prompt: Swiss AI/LLM/GenAI roles
  ai-linkedin/SKILL.md      ← subagent prompt: browser-based; auto-skips if no Chrome
  ai-weekly-digest/SKILL.md ← Monday-only subagent: prepends a week section to trends.md
news/YYYY-MM-DD.md          ← raw subagent output, news collector
papers/YYYY-MM-DD.md        ← raw subagent output, papers collector
blogs/YYYY-MM-DD.md         ← raw subagent output, blogs collector
jobs/YYYY-MM-DD.md          ← raw subagent output, Swiss jobs collector
linkedin/YYYY-MM-DD.md      ← raw subagent output, LinkedIn collector (or stub)
daily/YYYY-MM-DD.md         ← synthesized digest (your primary read)
index.md                    ← table of contents over daily/, newest first
trends.md                   ← weekly rollup, prepended every Monday
```

## How it runs

A single scheduled task `ai-daily-research` fires daily at 07:00 local time. The orchestrator:

1. **Fans out** five Agent calls in parallel (one per collector). Each subagent loads its `skills/<name>/SKILL.md` prompt, fetches its sources, writes its dated file, returns a brief summary.
2. **Synthesizes** the five outputs into `daily/YYYY-MM-DD.md` — deduped, themed, with "what changed vs. yesterday."
3. **Updates** `index.md` with one line for today.
4. **On Mondays only**, spawns a sixth agent (`ai-weekly-digest`) that prepends a week-summary section to `trends.md`.

LinkedIn coverage depends on Chrome being reachable when the task runs. If Chrome isn't connected, the LinkedIn subagent writes a stub and the orchestrator omits the LinkedIn section from the daily digest. No flag, no manual mode.

## How to use

- **Read today's digest** → `daily/YYYY-MM-DD.md` (or the top entry of `index.md`).
- **Drill into a slice** → open the matching `news/`, `papers/`, `blogs/`, `jobs/`, or `linkedin/` file for the day.
- **See weekly trends** → `trends.md` (newest week on top).
- **Search across history** → `grep -l "Mistral" daily/*.md` or grep into per-collector folders.
- **Run on demand** → tell Claude: "Run the `ai-daily-research` task now."
- **Re-run only one slice** → tell Claude: "Run the ai-news SKILL only" (uses `skills/ai-news/SKILL.md` directly without the orchestrator).
- **Change what's tracked** → edit the relevant section of `sources.json`.
- **Pause** → tell Claude: "Pause the `ai-daily-research` task."

## Schedule (local time)

- `ai-daily-research` orchestrator: cron `0 7 * * *` (every day at 07:00).
- The Monday weekly rollup runs as the orchestrator's last step, no separate cron.

## The "memory" piece

The dated files in each collector folder (and the synthesized `daily/`) are your historical archive. To see how the field changed:

```bash
diff "daily/2026-05-04.md" "daily/2026-05-11.md"      # week-over-week digest diff
grep -l "Mistral" daily/*.md                          # every day Mistral was mentioned
grep -c "Anthropic" news/*.md | sort -t: -k2 -n      # weight Anthropic over time
```
