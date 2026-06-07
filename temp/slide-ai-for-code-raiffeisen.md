# Slide: «AI for Code» — von Pilotprojekten zur governten Skalierung

> Entscheidungsvorlage CIO Raiffeisen Schweiz · Stand 07.06.2026 · alle Zahlen quellengeprüft (siehe Anhang)

---

## TITEL
**KI-gestützte Softwareentwicklung ist 2026 von Einzel­experimenten zur produktions­reifen, regulierbaren Enterprise-Fähigkeit gereift.**

## SUBLINE (Entscheidung)
Empfehlung: verstreute Tool-Pilots in **ein gebündeltes, kosten­kontrolliertes und FINMA-konform governtes «AI-for-Code»-Programm** überführen — der Markt ist validiert, die Ökonomie wird steuerbar, und der nötige Kontroll-Layer ist bereits beschaffbar.

---

## 5 EVIDENZ-SÄULEN (jede mit harter, geprüfter Zahl)

### 1 · Reife & belegter Produktions-ROI
Salesforce hat seine **gesamte Engineering-Organisation auf Claude Code** umgestellt und Resultate publiziert (April 2026): **+79 % Pull-Requests pro Entwickler, ~5 % weniger Incidents, +50,8 % Work-Items YoY** — und eine 33-Endpunkt-API-Migration mit **231 → 13 Personentagen (~18×)**.
→ *Grösster First-Party-ROI-Nachweis für agentisches Coding bisher (Herstellerangaben, nicht extern auditiert).*

### 2 · Markt & Momentum (strukturell, nicht Hype)
- Eigener Trend-Radar: das Thema «AI coding agents» läuft **74 Tage durchgehend**, Score **15 → 58 (≈3,9×)**, auf Allzeit-Hoch, sichtbar über **9 verschiedene Quell-Typen gleichzeitig** (News, Papers, Blogs, GitHub, HN, LinkedIn) — Breite statt Einzelspitze.
- **Cognition (Devin): $492 Mio. ARR, ~$26 Mrd. Bewertung** (verdoppelt in 8 Monaten), ~50 % MoM-Wachstum über 6 Monate, Kunden u. a. **Goldman Sachs, Santander, Mercedes-Benz, NASA** (27.05.2026). Cursor zuvor bei **$50 Mrd.**
- GitHub (K. Daigle): **Coding-Agenten +~1400 % in 2026**, **~275 Mio. Commits/Woche** (~14 Mrd./Jahr).
→ *Käufer zahlen für «committed-outcome agent work», nicht mehr für Tool-Lizenzen.*

### 3 · Ökonomie & Commoditisierung (wird budgetierbar)
- **GitHub Copilot stellt ab 01.06.2026 alle Pläne auf metered «AI Credits»** (1 Credit = $0.01) um — das Flat-Rate-Abo ist tot; Verbrauch wird **explizit budgetier- und deckelbar**.
- Stückkosten fallen hart: **DeepSeek V4-Pro dauerhaft ~$0.32/Mio. Input-Tokens — ~1/8 von Claude Opus**; auf einem Standard-Workload **$4 811 (Claude) vs. $544 (Zhipu GLM) ≈ 9× Spread**.
→ *«Advisor-Modell»-Architektur (günstiges Default-Modell, Eskalation nur bei Bedarf) erlaubt aktives Kosten-Management statt offener Lizenzkosten.*

### 4 · Governance & Interop (Kontroll-Layer existiert)
- **MCP** (Model Context Protocol) unter **Linux-Foundation-Governance**, **~110 Mio. monatliche SDK-Downloads auf 10 000+ Servern**; **A2A v1.0 bei 150+ Organisationen produktiv** — hersteller-neutrale, beschaffungs­taugliche Standards.
- **OpenAI Codex GA auf AWS Bedrock** (inkl. GovCloud) mit nativer Security/Audit; **Claude Compliance API** routet Aktivität in bestehende SIEM/DLP-Tools (CrowdStrike, Palo Alto, Wiz, Okta, Snyk …).
→ *Audit-, DLP- und Perimeter-Kontrolle sind heute einkaufbar — Skalierung muss nicht «ungoverned» sein.*

### 5 · Schweiz & Regulierung (Raiffeisen-Kontext)
- **88 % der Schweizer Firmen nutzen bereits KI** (DeepMind-Erhebung, Digital Gipfel Schweiz 2026) — der ROI entsteht laut Studie erst bei **Workflow-Redesign statt Tool-«Flicken»**.
- Schweizer Finanzplatz adoptiert governt: **Lombard Odier: GenAI-gestützte Core-Banking-Migrationen 50–60× schneller**; **Bank J. Safra Sarasin / UBS** bauen AI Centers of Excellence mit Guardrails.
- **FINMA hat Frontier-AI-Capability als «immediate systemic risk» klassifiziert** — Adoption muss kontrolliert und FINMA-konform erfolgen.
→ *Für Raiffeisen ist die Frage nicht «ob», sondern «wie governt» — Peers sind bereits dabei.*

---

## SCHWEIZ-/GOVERNANCE-ANKER (eine Zeile)
Als FINMA-beaufsichtigte Bank zählt das **«Wie»**: FINMA stuft Frontier-AI bereits als systemisches Risiko ein, Schweizer Peers stehen governte AI-CoEs auf, und der Kontroll-Layer (MCP/A2A unter Linux Foundation, In-Perimeter-Ausführung, Compliance-API in bestehende SIEM/DLP, EU-AI-Act / ISO 42001 / NIST) ist **beschaffbar und auditierbar**.

---

## SPRECHERNOTIZEN (CIO)
«Die Evidenz ist hart und aktuell. Salesforce hat Ende Mai org-weit **+79 % Pull-Requests pro Entwickler** und eine **18-fach schnellere Migration** gemeldet — bei **~5 % weniger Incidents**, die Qualität hielt also. Der Markt ist mehrfach validiert: Cognition/Devin bei **$492 Mio. ARR und ~$26 Mrd.** mit **Goldman Sachs und Santander** als zahlenden Bank-Kunden; GitHub sieht **~275 Mio. Commits/Woche**. Gleichzeitig wird die Ökonomie steuerbar: **DeepSeek liegt bei ~1/8 des Claude-Opus-Preises**, und **GitHub Copilot ist zum 1. Juni auf metered Credits** umgestellt — wir können Verbrauch also explizit budgetieren und deckeln. Entscheidend für uns als FINMA-Bank: der **Kontroll-Layer existiert bereits** — MCP mit **~110 Mio. monatlichen Downloads** unter neutraler Linux-Foundation-Governance, In-Perimeter-Ausführung, und Schweizer Peers wie **Lombard Odier (50–60× schnellere Migrationen)** bauen bereits governte AI-CoEs. Meine Empfehlung: von verstreuten Pilots auf **ein gebündeltes, kostenkontrolliertes, FINMA-konform governtes Programm** umstellen.»

---

## QUELLEN-ANHANG (Backup-Slide)
| Aussage | Quelle (repo-relativ) |
|---|---|
| Salesforce +79 % PRs/Dev, ~5 % weniger Incidents, 231→13 PT (~18×) | `data/news/2026/05/2026-05-30.md`, `data/weekly/2026/2026-W22.md`, `data/monthly/2026/2026-05.md` |
| Radar-Arc 15→58 über 74 Tage, 9 Quell-Typen | `data/radar/2026/**` (eigene Berechnung, `pipeline/state` Radar-JSON) |
| Cognition $492 Mio. ARR / ~$26 Mrd. / Goldman+Santander | `data/news/2026/05/2026-05-27.md` |
| Cursor $50 Mrd. Runde | `data/orgs/cursor.json`, `data/news/2026/05/2026-05-27.md` |
| Coding-Agenten +1400 %, ~275 Mio. Commits/Woche | `data/blogs/2026/06/2026-06-05.md`, `data/weekly/2026/2026-W23.md` |
| Copilot → metered AI Credits ($0.01) ab 01.06.2026 | `data/news/2026/06/2026-06-01.md` |
| DeepSeek V4-Pro ~$0.32/M (~1/8 Opus); 9× Spread | `data/daily/2026/05/2026-05-26.md`, `data/weekly/2026/2026-W21.md` |
| MCP ~110 Mio. Downloads / 10 000+ Server; A2A 150+ Orgs | `data/trends.md` |
| Codex GA auf Bedrock GovCloud; Claude Compliance API | `data/news/2026/06/2026-06-05.md`, `data/weekly/2026/2026-W22.md` |
| 88 % Schweizer Firmen nutzen KI (DeepMind / Digital Gipfel) | `data/linkedin/2026/05/2026-05-30.md`, `data/weekly/2026/2026-W23.md` |
| Lombard Odier 50–60× schnellere Migrationen; J. Safra Sarasin CoE | `data/jobs/2026/05/2026-05-21.md`, `data/jobs/2026/06/2026-06-05.md` |
| FINMA «immediate systemic risk» | `data/news/2026/05/2026-05-21.md`, `data/trends.md` |

> **Hinweis zur Datenqualität:** Aus der ursprünglichen Synthese entfernt, weil in den Quelldateien nur als redigierter Platzhalter (`n`) vorhanden — NICHT verwenden: «41 % der CEOs ohne ROI», «28 Security-Integrationen», «97 Mio. / 18 000 MCP-Server», «Uber-Cap $1 500/Monat». Salesforce-/Cognition-Zahlen sind Herstellerangaben (unauditiert) — so kennzeichnen.
