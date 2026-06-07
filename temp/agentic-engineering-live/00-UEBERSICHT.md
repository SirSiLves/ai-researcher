# Agentic Engineering — Live-Recherche: Übersicht & Kernargumente (2026-only)

_Live-Web-Recherche · zuletzt aktualisiert 2026-06-04 · **ausschliesslich Quellen mit 2026-Datum** (alles vor 2026 wurde bewusst entfernt, da 2026 den Stand überholt hat). 132 belegte Funde über 9 Lanes, jede Zahl mit Quelle + Link + Verifizierungs-Stärke. Rohmaterial zur Untermauerung einer CIO-Entscheidung._

## Worum es geht & Methode

Diese Sammlung beantwortet für einen Bank-CIO drei Fragen: **(1) Welchen Mehrwert** schafft Agentic Engineering, **(2) warum ist es notwendig** (nicht optional), und **(3) warum müssen Personen eingestellt / dediziert dafür abgestellt werden?** Recherchiert wurde breit (Vendor, Analysten, Surveys, Job-Markt, Praktiker, Kritik); aufgenommen wurde nur, was eine **2026-datierte** Quelle belegt. Jeder Fund liegt in der zugehörigen `lane-*.md`-Datei mit wörtlichem Beleg-Zitat und Link.

> **Wichtig zur Datierung:** Einige Funde stammen aus 2026-Reports, die teils auf Datenfenstern bis Ende 2025 beruhen (z. B. Stanford AI Index 2026, JetBrains Jan-2026-Erhebung). Sie zählen als 2026, weil die *Veröffentlichung/Erhebung* 2026 ist; wo das Datenfenster relevant ist, steht es im Befund.

## 1. Der Mehrwert (warum es Wert schafft)

- **Faros AI 2026 (22'000 Entwickler, 4'000+ Teams): +66 % abgeschlossene Epics/Entwickler, +33,7 % Task-Throughput, +16,2 % PR-Merge-Rate** zwischen Tief- und Hochphasen der KI-Adoption. — Faros AI Engineering Report 2026 (2026-04-12) · `lane-02`
- **DORA-ROI-Studie 2026 (Google Cloud, ~5'000 Profis): 35–40 % Produktivitätsgewinn bei Greenfield, aber ≤10 % bei komplexem Legacy-Code**; modellierter Erstjahres-ROI ~39 % bei ~8 Monaten Payback. — InfoQ über DORA (2026-05-11) · `lane-02/03`
- **TELUS: Engineering shippt Code 30 % schneller, >500'000 Std. gespart** (57'000 KI-nutzende Mitarbeitende). — Anthropic 2026 Agentic Coding Trends Report · `lane-01/02`
- **McKinsey: 3–5× Produktivität mit agentischen Systemen; ein Finanzdienstleister baute eine „AI agent factory" mit 40–70 % Produktivitätsplus** auf einem Greenfield-Payment-System. — McKinsey „Rewiring software delivery for the agentic era" (2026) · `lane-01`
- **Grant Thornton 2026: Firmen mit vollintegrierter KI melden 4× häufiger KI-getriebenes Umsatzwachstum (58 % vs. 15 % im Pilotstadium)** — der „AI Proof Gap". — Grant Thornton AI Impact Survey (2026-04-13) · `lane-03`
- **Markt: Enterprise-AI-Coding-Agents ~9,8–11,0 Mrd. USD annualisiert (Gartner, Mai 2026)** — eigene Magic-Quadrant-Kategorie, Reifesprung von „Assistenz" zu „Agent". — `lane-01/04`

## 2. Warum es gebraucht wird (notwendig, nicht optional)

- **Sicherheits-/Patch-Argument (der stärkste Notwendigkeits-Block):**
  - **Time-to-Exploit ist negativ: −1 Tag (2024), geschätzt −7 Tage (2025); Angriffs-Hand-off von >8 Std. (2022) auf 22 Sekunden (2025).** — Mandiant M-Trends 2026 (2026-03-24) · `lane-04`
  - **Anthropics „Mythos" findet tausende High-Severity-Lücken — >99 % bleiben ungepatcht.** Discovery überholt Patching massiv. — Fortune (2026-04-14) · `lane-04`
  - **Nur 8 % der Organisationen patchen voll autonom, >60 % noch manuell.** — Adaptiva State of Patch Management 2026 (2026-05-21) · `lane-04`
  - **IBM X-Force 2026: +44 % Angriffe auf öffentlich erreichbare Apps** (u. a. durch KI-gestützte Schwachstellensuche). — IBM (2026-02-25) · `lane-04`
- **Marktstandard im Finanzsektor: Software Engineering ist die reifste KI-Anwendung der Finanzindustrie — 42 % voll produktiv ausgerollt, 33 % in Entwicklung** (628 Organisationen, inkl. Zentralbanken). — Cambridge Centre for Alternative Finance, Global AI in Financial Services Report 2026 (2026-04-28) · `lane-04`
- **Adoptions-Baseline kippt: agentische Nutzung fast verdoppelt von 31 % auf 59 %; tägliche Nutzung 14 % → 37 %.** — Stack Overflow (2026-05-27) · `lane-02/04`
- **Gartner: asynchrone Coding-Agenten heben Team-Produktivität bis 2028 um 30–50 %** (vs. 0–20 % bei reinen Assistenten) — „table stakes" für 2026. — Gartner MQ 2026 via GitHub Blog (2026-05-22) · `lane-04`
- **Wettbewerbsdruck: 99 % der CEOs erwarten in 2 Jahren KI-bedingten Stellenabbau** (Mercer, 12'000 Befragte). — Tom's Hardware (2026-05-26) · `lane-04`

## 3. Warum Personen einstellen / aktiv dranbleiben (das Hiring-Argument — Schwerpunkt)

**Die Nachfrage explodiert:**
- **Agentic-AI-Skill-Cluster +2'643 % (2024→2025) in US-Stellenausschreibungen** — stärkster Hiring-Beleg. — Stanford AI Index 2026, Kap. 4 (2026-04) · `lane-01/05`
- **Agentic-AI-Stellen +280 % YoY (~90'000 US-Inserate); Forward-Deployed-Engineer-Inserate +800 %** — eine Rolle, die es vor drei Jahren nicht gab. — Stanford AI Index 2026 / Lightcast · `lane-04/05`
- **„AI Engineer" = Platz 1 der am schnellsten wachsenden Jobs (LinkedIn Jobs on the Rise 2026), +143 % YoY**; 639'000 neue KI-Stellen in den USA (Datenfenster 2023–2025). — WEF/LinkedIn (Jan 2026) · `lane-05`
- **JetBrains Jan-2026: 90 % nutzen regelmässig KI, 74 % haben spezialisierte Dev-KI-Tools** (Claude Code 3 %→18 %, Cursor stark steigend). — JetBrains Research (2026-04) · `lane-02/05`

**Es braucht dedizierte, neue Rollen — nicht nur ein Tool:**
- **~20 neue agentic Rollen** (Box/McKinsey/LinkedIn): Forward Deployed Engineer, AI Evals Engineer, Context Engineer, AI Agent Architect, AI Enablement Lead, AI Governance Lead u. a. — Yahoo Finance/Box (2026) · `lane-05`
- **Agentic Engineers sind eine eigene Disziplin; Gehaltsbänder 2026: 175–325K+, Top bis 400K** — abgegrenzt von „GenAI Engineers". — KORE1 (2026) · `lane-05`
- **Bank-Präzedenzfall: JPMorgan-CEO Dimon (21.05.2026) — „mehr KI-Leute, weniger Banker"**; der Hiring-Mix kippt aktiv. — PYMNTS (2026-05-21) · `lane-05/07`

**Warum dediziert/governed — sonst scheitert es:**
- **Modell-Release-Kadenz ~alle 3 Tage / Median von 37,5 auf 11 Tage gefallen** — ohne dediziertes Tracking nicht mehr zu folgen. — `lane-06/09`
- **Governance-Lücke: nur 34 % behandeln Agenten-Identität wie menschliche Identität (Okta); nur 21 % haben ein reifes Governance-Modell für autonome Agenten (Deloitte 2026).** — `lane-03/06`
- **Enablement entscheidet: „Lizenzen verteilen reicht nicht" — Champion-/Plattform-Programme heben Adoption messbar; Workflow-Redesign ist der grösste EBIT-Hebel.** — `lane-06`
- **Citi rollt agentische KI an 40'000 Entwickler aus — mit striktem Review, RAG-only, kein autonomes Deployment** = Governance ist Personalarbeit. — `lane-07`

## Ehrliche Gegenargumente (für Board-Glaubwürdigkeit)

- **Faros AI 2026 „Acceleration Whiplash": PR-Review-Zeit +441 %, Incidents pro PR +242,7 %** — mehr Code, mehr Fehler; der Engpass wandert ins Review. — `lane-02/08`
- **METR-Update (2026-02-24): KI-Wirkung −18 % bei erfahrenen Entwicklern, aber nur „very weak evidence"** wegen Selbstselektion. — `lane-02/08`
- **CloudBees: 81 % melden mehr Produktionsfehler durch KI-Code; nur 31 % des KI-Spends messbar zuordenbar.** — The Register (2026-05-20) · `lane-03/08`
- **Uber verbrannte sein gesamtes 2026-Coding-Budget in 4 Monaten; COO bezweifelt direkten Kundennutzen.** — Fortune (2026-05-26) · `lane-03/08`
- **ICONIQ: „Token-Steuer" — Inferenz frisst ~23 % des Umsatzes bei skalierenden KI-Firmen.** — Tech Times (2026-06-01) · `lane-03/08`
- **Forrester (2026-06-03): „Chasing, few catching" — drei Viertel führen agentische KI ein, nur eine Minderheit betreibt sie real produktiv.** — `lane-01/08`
- **Thoughtworks Tech Radar Vol. 34: Warnung vor „Cognitive Debt"** — Disziplin und Engineering-Fundamente nötig. — `lane-01/08`

## Stärkste Einzelbelege (Top 10, 2026-only)

1. **Agentic-AI-Skill-Cluster +2'643 % (2024→2025)** — Stanford AI Index 2026 · https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf
2. **Mandiant: Time-to-Exploit −1 Tag (2024), Hand-off 22 Sekunden (2025)** — M-Trends 2026 · https://www.helpnetsecurity.com/2026/03/24/mandiant-m-trends-2026-report/
3. **Faros AI 2026: +66 % Epics/Entwickler — und +441 % Review-Zeit (Kehrseite)** — https://www.faros.ai/blog/ai-acceleration-whiplash-takeaways
4. **JPMorgan/Dimon (21.05.2026): „mehr KI-Leute, weniger Banker"** — https://www.pymnts.com/artificial-intelligence-2/2026/jpmorgan-prioritizing-ai-hires-over-bankers/
5. **Anthropic „Mythos": tausende Lücken gefunden, >99 % ungepatcht** — https://fortune.com/2026/04/14/anthropic-mythos-reveals-security-gap-ai-finds-flaws-far-faster-than-companies-can-patch-them/
6. **Cambridge 2026: Software Engineering = reifste KI-Anwendung im Finanzsektor (42 % voll produktiv)** — https://www.jbs.cam.ac.uk/2026/report-finds-uneven-ai-adoption-in-financial-services/
7. **DORA-ROI 2026: 35–40 % Greenfield vs. ≤10 % Legacy; ~39 % Erstjahres-ROI** — https://www.infoq.com/news/2026/05/dora-roi-ai-assisted-dev-report/
8. **Grant Thornton 2026: vollintegrierte KI → 4× häufiger Umsatzwachstum (58 % vs. 15 %)** — https://www.grantthornton.com/insights/press-releases/2026/april/grant-thornton-survey-on-ai-proof-gap
9. **Citi: agentische KI an 40'000 Entwickler, governance-first** — `lane-07`
10. **Stack Overflow (2026-05-27): agentische Nutzung 31 % → 59 %, täglich 14 % → 37 %** — https://stackoverflow.blog/2026/05/27/agents-on-a-leash-agentic-ai-remains-mostly-monitored-at-work/

## Datei-Index

| Datei | Thema | Funde |
|---|---|---|
| `lane-01-definition-und-marktreife.md` | Definition, Abgrenzung, Marktreife | 14 |
| `lane-02-mehrwert-produktivitaet.md` | Mehrwert I — Produktivität/Durchsatz (+ Gegenevidenz) | 13 |
| `lane-03-mehrwert-business-roi.md` | Mehrwert II — Business/ROI/Kosten | 14 |
| `lane-04-warum-notwendig-druck.md` | Warum notwendig — Druck, Standard, Security | 15 |
| `lane-05-hiring-rollen-skills.md` | Hiring — neue Rollen, Stellenmarkt, Gehälter | 12 |
| `lane-06-hiring-warum-dediziert.md` | Warum dediziert — Governance, Enablement, Platform | 14 |
| `lane-07-enterprise-faelle-finance.md` | Enterprise-/Finanzpraxis (Banken) | 16 |
| `lane-08-skeptik-und-grenzen.md` | Skepsis, Grenzen, Gegenargumente | 17 |
| `lane-09-trends-cadence-zukunft.md` | Tempo, Trends, Ausblick | 17 |
| `99-QA-quellen-check.md` | Quellen-Liveness-Prüfung | — |

## Stand & Verlässlichkeit

- **132 Funde, alle 2026-datiert** (vor-2026-Belege vollständig entfernt; Backup in `.pre2026_backup/`).
- **Verteilung:** Notwendigkeit 43 · Mehrwert 29 · Hiring 22 · Gegenargument 19 · Kontext 19. Stärke: 72 „stark".
- **Quellen-Check:** 107/117 URLs direkt erreichbar; die übrigen sind reale, Bot-blockierte Quellen (Gartner, McKinsey, WEF, Microsoft, Cambridge JBS, FIS, BNY) — keine erfundenen Links (siehe `99-QA-quellen-check.md`).
- **Vorsicht für die Konsolidierung:** Funde mit Stärke „mittel/schwach" oder Datenfenster bis 2025 vor Board-Verwendung an der Primärquelle gegenprüfen.
