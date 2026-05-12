# Orchestrator update — paste into your `ai-daily-research` scheduled task

Your scheduled task's prompt currently has Steps 1–8. The Monday-only weekly section (Step 7) needs to be replaced, and a new Step 7.5 + Step 7.6 added, to support the new layered architecture:

```
collectors → daily → weekly → monthly → trends
```

## What changes

- **Step 7** (was: "Monday-only — weekly trends rollup, updates trends.md") becomes weekly that writes `weekly/{YYYY-Www}.md` instead of prepending to `trends.md`. The skill file `skills/ai-weekly-digest/SKILL.md` has already been updated; you just need the orchestrator to spawn it on Mondays as before.
- **Step 7.5** (NEW) — On the first Monday of the month, also spawn `ai-monthly-rollup` to consolidate the prior month's weekly files into `monthly/{YYYY-MM}.md`.
- **Step 7.6** (NEW) — After weekly (and after monthly when it runs), spawn `ai-trends` to append durable shifts to `trends.md`.

## Replacement text for Step 7 (and add 7.5, 7.6)

Replace the existing Step 7 in your scheduled-task prompt with the block below:

````markdown
## 7. Monday-only — weekly rollup

If day-of-week (from §1) is `1` (Monday), spawn ONE Agent call:
- `subagent_type`: `"general-purpose"`
- `description`: `"Weekly rollup"`
- `prompt`: contents of `skills/ai-weekly-digest/SKILL.md` followed by the same `TODAY'S DATE: {YYYY-MM-DD}` footer as in §3.

Wait for it to return. The agent writes `weekly/{YYYY-Www}.md` and updates `index.md`.

## 7.5. First-Monday-of-month — monthly rollup

If today is a Monday AND today's day-of-month is in 1..7 (i.e. this is the first Monday of the month), spawn ONE more Agent call:
- `subagent_type`: `"general-purpose"`
- `description`: `"Monthly rollup"`
- `prompt`: contents of `skills/ai-monthly-rollup/SKILL.md` followed by the `TODAY'S DATE: {YYYY-MM-DD}` footer.

Compute the previous month with one bash:
```bash
python3 -c "from datetime import date, timedelta; t=date.today(); p=(t.replace(day=1)-timedelta(days=1)); print(f'{p.year}-{p.month:02d}')"
```
Pass the resulting `YYYY-MM` to the agent in the footer as `TARGET_MONTH: YYYY-MM`.

Wait for it to return. The agent writes `monthly/{YYYY-MM}.md` and updates `index.md`.

## 7.6. After weekly / monthly — trends update

If §7 ran (and §7.5 ran), spawn ONE more Agent call to update the long-term trends file:
- `subagent_type`: `"general-purpose"`
- `description`: `"Trends update"`
- `prompt`: contents of `skills/ai-trends/SKILL.md` followed by the `TODAY'S DATE: {YYYY-MM-DD}` footer AND a `SOURCE:` line.

If §7.5 ran (a monthly file was just written), pass `SOURCE: monthly/{YYYY-MM}.md` (the new monthly file).
Otherwise (only weekly ran), pass `SOURCE: weekly/{YYYY-Www}.md` (the new weekly file).

Wait for it to return. The agent appends 0–4 entries to `trends.md` and confirms.
````

## Then update Step 8 (Finish)

Step 8 currently lists confirmation messages. Add a Monday/first-Monday variant to make the orchestrator's confirmation match what actually ran:

```
- `Saved daily/2026-05-12.md (28 items). 5/5 collectors ok. Index + weekly/2026-W20 + trends updated.`
- `Saved daily/2026-06-01.md (31 items). 5/5 ok. Index + weekly/2026-W23 + monthly/2026-05 + trends updated.`
```

(The exact wording is your call — these examples just show the new layers being mentioned.)

## How to apply

1. Open your Cowork scheduled tasks UI, find `ai-daily-research`, edit it.
2. Replace Step 7 with the three blocks above (7, 7.5, 7.6).
3. Save.

The skill files referenced (`skills/ai-weekly-digest/SKILL.md`, `skills/ai-monthly-rollup/SKILL.md`, `skills/ai-trends/SKILL.md`) are already up to date in the workspace — no change needed there.

## Migration note

The first time §7.5 fires (early June 2026), there will only be ~5 weekly files for May. The monthly agent's "Insufficient data" stub guard handles a brand-new pipeline, but with 5 weekly files it'll run a real rollup.
