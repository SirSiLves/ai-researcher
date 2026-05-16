# AI Researcher — Style guide

Goal: look like an enterprise admin/intel SaaS built on PrimeNG Aura. Not editorial. Not Anthropic. Not "hand-rolled paper UI."

Source of truth for visual decisions is **PrimeNG Aura's design tokens** (`@primeuix/themes/aura`). When in doubt, default to what Aura ships.

## Identity rules — what we are and aren't

| | We are | We are not |
| - | - | - |
| Posture | Admin dashboard | Publication / magazine |
| Typography | Inter sans + JetBrains Mono | Any serif, italic body, drop caps |
| Surfaces | White on slate-50, hairline borders | Cream / paper / warm beige |
| Accent | One color (electric blue), used sparingly | Red, salmon, multi-warm |
| Header style | Compact route bar (kicker + title + meta) | Big serif headline + italic deck |
| Components | PrimeNG (Card, Panel, Tabs, Tag, Button, DataTable, Menubar, Toolbar) | Bespoke chips, custom tabs, hand-rolled card chrome |

## Tokens

Map our app variables to Aura's actual values. Light first.

| Var | Light | Dark | Aura equivalent |
| - | - | - | - |
| `--bg`           | `#ffffff`           | `#020617`           | `surface.0` / `surface.950` |
| `--bg-soft`      | `#f8fafc`           | `#0f172a`           | `surface.50` / `surface.900` |
| `--bg-soft-2`    | `#f1f5f9`           | `#1e293b`           | `surface.100` / `surface.800` |
| `--panel`        | `#ffffff`           | `#0f172a`           | `surface.0` / `surface.900` |
| `--line`         | `#e2e8f0`           | `#334155`           | `surface.200` / `surface.700` |
| `--line-2`       | `#cbd5e1`           | `#475569`           | `surface.300` / `surface.600` |
| `--fg`           | `#0f172a`           | `#f8fafc`           | text.color |
| `--fg-2`         | `#1e293b`           | `#e2e8f0`           | — |
| `--fg-3`         | `#475569`           | `#94a3b8`           | `surface.600` / `surface.400` |
| `--fg-4`         | `#64748b`           | `#94a3b8`           | text.muted.color |
| `--accent`       | `#3b82f6`           | `#60a5fa`           | primary (we keep blue, not Aura emerald — already wired) |
| `--pos`          | `#22c55e`           | `#22c55e`           | green.500 |
| `--neg`          | `#ef4444`           | `#ef4444`           | red.500 |
| `--warn`         | `#f97316`           | `#f97316`           | orange.500 |
| `--info`         | `#0ea5e9`           | `#0ea5e9`           | sky.500 |

## Type

- One font for prose: **Inter**, weights 400/500/600/700. Optical features `cv11`, `ss01`.
- One font for data: **JetBrains Mono**, weights 400/500/600.
- **No serif. No italic body.** Italic only for asides like an em-tag.
- Base size: `14px`. Line-height: `1.5` body, `1.3` headings.
- Heading scale (used inside dashboard chrome, not as big article titles):
  - `page-head__title` → 1.15rem / 600 / `-0.01em`
  - `section__title`   → 0.92rem / 600
  - `card__title`      → 0.88rem / 600
- Body text 0.875rem (14px).
- Labels (small caps, mono): 0.66rem / 600 / `letter-spacing 0.10em` / uppercase.
- Numeric data: JetBrains Mono. Always `font-variant-numeric: tabular-nums`.

## Radius scale (matches Aura)

- `--radius`      `6px`  — buttons, inputs, menus, panels, sections
- `--radius-sm`   `4px`  — small chips, tags, kbd
- `--radius-lg`   `12px` — Cards (Aura default for Card is xl=12px)
- `--radius-pill` `9999px` — only when explicitly pill

## Shadows (Aura's two-drop pattern)

- `--shadow-card`   `0 1px 3px 0 rgba(0,0,0,.06), 0 1px 2px -1px rgba(0,0,0,.06)`
- `--shadow-popover` `0 4px 6px -1px rgba(0,0,0,.08), 0 2px 4px -2px rgba(0,0,0,.08)`
- `--shadow-modal`   `0 20px 25px -5px rgba(0,0,0,.10), 0 8px 10px -6px rgba(0,0,0,.08)`
- `--shadow-input`   `0 1px 2px 0 rgba(15,23,42,.04)` (hairline)

## Spacing & rhythm

- 4px grid. Use multiples: 4 / 8 / 12 / 16 / 20 / 24 / 32.
- Card body padding: `1.25rem` (20px) — Aura default.
- Section gap inside a card: `0.75rem` (12px).
- Page vertical rhythm: `1.25rem` (20px) between major sections.
- Form control min-height: `38px`. Buttons min-height: `34px` (sm) / `38px` (md).
- **Touch target minimum 36×36px** for clickable chips, table rows, list links.
- Tables: cell padding `0.75rem 1rem` (12/16px).
- Never use line-height < 1.35 on body text. Never set hard `height` on text containers (causes the cut-off the user saw).

## Components — how each one looks

### Page route bar (replaces "page-head")
Wrap in a `<p-card>` or a div styled like one (`--shadow-card`, 12px radius, 20px padding).
- Mono kicker (uppercase, 11px, 600, `--fg-4`) → e.g. `RADAR / TOPIC`.
- Title sans, 18px, 600, `--fg`.
- Subtitle 13px, 400, `--fg-3`. Plain prose, not italic.
- Right side: metadata strip (mono numbers) or action buttons (`<p-button>`).
- Tabs (`<p-tabs>`) optional underneath for sub-views.

### Card (`<p-card>`)
Use directly when possible. Defaults: 12px radius, `--shadow-card`, 20px padding, no header fill, separates title from content with 8px gap. Don't override the radius.

### Buttons (`<p-button>`)
Always use `<p-button>`, never `<button class="btn">`. Variants:
- `severity="primary"` filled — main action only.
- `[outlined]="true"` — secondary actions.
- `[text]="true"` — tertiary / icon-only / nav.
- `[size]="'small'"` for table actions.
- Min height 34px (sm) / 38px (md). Padding `0.5rem 0.9rem`.

### Tags (`<p-tag>`)
Use directly for status. Aura's tell: pastel `{color}.100` bg + `{color}.700` text, 14px / 700, 4px/8px padding, **6px radius rectangle** (not pill — `rounded` only on demand).
- Don't roll our own `.chip` for status. Use `<p-tag>` with `severity="success|warn|danger|info|secondary"`.

### DataTable (`<p-table>`)
- Header is the same color as body. No gray fill.
- Bottom hairline on header. Column titles 600.
- Striped rows = `--bg-soft` on odd. Hover = `--bg-soft-2`.
- Selected row = `--accent-soft`.
- Cell padding 12/16.

### Tabs (`<p-tabs>` / `<p-tabview>`)
- Underline-only indicator.
- 1px slate baseline (`--line`), tab active = primary color underline + 600 label.
- 16/18 padding.
- Don't draw boxed pills.

### Menubar / topbar
- Use `<p-menubar>` if we need a real app menubar. Right now we have a custom topbar — keep it but match Aura's look:
  - 56px (was 52, give it a touch more breathing room).
  - Hover background = `--bg-soft-2`, no underline.
  - Active link = 600 weight + `--bg-soft-2` background, 4px radius pill-ish.

### Toolbar (`<p-toolbar>`)
- Used as the route bar OR a sub-actions strip on a page.
- 1px slate border, white surface, 12/16 padding.

### Inputs / Date picker
- Aura default: 6px radius, 38px min-height, hairline border, focus ring = `0 0 0 3px rgba(primary, 0.3)`.

## Interaction states

Every clickable element MUST have:
- Hover: subtle background swap (Aura: `surface.100`) — never colored fills except for primary buttons.
- Focus-visible: `0 0 0 3px var(--accent-ring)` — visible 2-3px ring at 30% opacity.
- Active/pressed: slight darken (`surface.200`) — no transform.
- Disabled: opacity 0.45, cursor not-allowed.
- Cursor: pointer when `<a>`, `<button>`, table row, list link, tag-with-toggle.

Click feedback within 100ms. No animations longer than 200ms for state transitions.

## Layout rules

- App max-width `1280px`. Gutter `clamp(16px, 2vw, 24px)`.
- Sticky topbar (56px) with `backdrop-filter: blur(8px)` and 92% bg alpha.
- Page padding-top 1.25rem; gap-between-blocks 1.25rem.
- Use `display:grid` with `minmax(0,1fr)` everywhere so columns never overflow.
- **No fixed heights on text-bearing containers** — only on chart canvases. Anything bearing text must use min-height or no height.
- Multi-line truncation only via `-webkit-line-clamp` + `overflow:hidden` AND `min-width:0` on the grid cell. Always 2-line max, ellipsis allowed.

## Common anti-patterns we keep doing — stop

- Big serif page titles, italic decks, "kicker · pipeline · subhead" lines → cut. Use the route bar pattern instead.
- Editorial dropcaps → never.
- Two-color paper warmth (any `#fbe5d2`, `#fff1e5`) → never. Surfaces are slate-tinted white only.
- Custom `.chip` for status → use `<p-tag>`.
- Custom `<button class="btn">` → use `<p-button>`.
- Custom tab UIs → use `<p-tabs>`.
- Fixed heights on rail items, list links, table cells → use min-height.

## Pre-merge checklist

Before saying "it's done":
1. Open every route in light + dark, take screenshots.
2. Confirm no text is truncated mid-character. Tooltip wherever truncation is intentional.
3. Tab through the page. Every interactive element gets a focus ring.
4. Click every clickable element. Hover state should be visible within 100ms.
5. Inspect → ensure all colors come from CSS vars / Aura tokens, no raw hex.
6. Compare against PrimeNG demos (https://primeng.org/templates) — does it look the same family?
