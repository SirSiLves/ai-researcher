# Mehrwert I — Produktivität, Geschwindigkeit, Durchsatz

_Live-Recherche (Web) · erstellt 2026-06-04 · Thema: Agentic Engineering — Mehrwert / Notwendigkeit / Hiring._

## Kernaussagen dieser Lane

- **Geschwindigkeit auf Task-Ebene ist real und gross:** In einem kontrollierten GitHub-Experiment lösten Entwickler mit Copilot dieselbe Aufgabe **55 % schneller** (1 h 11 min statt 2 h 41 min) — GitHub Research, 2022/aktualisiert.
- **Durchsatz steigt auch im Enterprise-Massstab:** Bei Accenture stieg die **Pull-Request-Merge-Rate um 15 %**, die Zahl erfolgreicher Builds um **84 %** (GitHub × Accenture RCT, Mai 2024).
- **Code-Anteil von KI explodiert:** Bei Google sind **>25 % des neuen Codes** KI-generiert (Pichai, Okt. 2024); bei Anthropic schreibt KI laut CEO Amodei bereits **die Mehrheit** des Codes (2025).
- **Konkreter Banken-Case:** Morgan Stanleys Eigenbau-Tool DevGen.AI verarbeitete **9 Mio. Zeilen Legacy-Code** und sparte **280'000 Entwicklerstunden** in 5 Monaten (Juni 2025) — direkt relevant für eine Schweizer Bank.
- **Ehrliches Gegengewicht 1 — METR:** In einem randomisierten Trial waren erfahrene Open-Source-Entwickler mit KI **19 % LANGSAMER**, obwohl sie sich 20 % schneller _fühlten_ (METR, Juli 2025).
- **Ehrliches Gegengewicht 2 — Qualität & Stabilität:** DORA 2025 bestätigt negative Beziehung zwischen KI-Adoption und Delivery-Stabilität; GitClear misst **8-fach mehr duplizierten Code** und Rückgang von Refactoring von 25 % auf <10 % der Änderungen.

## Belege

### Cursor/Anysphere: schnellstes 0→2-Mrd.-ARR der B2B-Software-Geschichte
- **Aussage:** Anysphere (Cursor) wuchs von 100 Mio. (Jan. 2025) auf **2 Mrd. USD ARR (Feb. 2026)** — schnellste Skalierung von 0 auf 2 Mrd. in der B2B-Software-Historie; ~60 % Umsatz aus Enterprise, >50 % der Fortune 500 nutzen es.
- **Quelle:** TheNextWeb (Cursor/Anysphere-Finanzierungsbericht)
- **Link:** https://thenextweb.com/news/cursor-anysphere-2-billion-funding-50-billion-valuation-ai-coding
- **Datum:** 2026
- **Beleg-Zitat:** "Cursor in talks to raise $2B at $50B valuation after hitting $2B ARR in three years"
- **Relevanz:** kontext
- **Stärke:** mittel

### Faros AI 2026: Epics pro Entwickler +66 %

- **Aussage:** Im AI Engineering Report 2026 (Telemetrie von 22'000 Entwicklern, 4'000+ Teams) stieg die Zahl abgeschlossener Epics pro Entwickler um 66 %, die Task-Throughput pro Entwickler um 33,7 % und die PR-Merge-Rate pro Entwickler um 16,2 % zwischen Tief- und Hochphasen der KI-Adoption.
- **Quelle:** Faros AI · AI Engineering Report 2026 · 2026-04-12
- **Link:** https://www.faros.ai/blog/ai-acceleration-whiplash-takeaways
- **Datum:** 2026-04-12
- **Beleg-Zitat:** "Epics completed per developer are up 66%" ... "Task throughput per developer is up 33.7%" ... "PR merge rate per developer is up 16.2%"
- **Relevanz:** mehrwert
- **Stärke:** stark

### Faros AI 2026: "Acceleration Whiplash" — mehr Code, mehr Fehler

- **Aussage:** Dieselbe 2026-Telemetrie zeigt die Kehrseite: die mediane PR-Review-Zeit stieg um 441 % (2025: 91 %) und Incidents pro PR um 242,7 % — pro gemergtem Change hat sich die Wahrscheinlichkeit eines Produktionsvorfalls mehr als verdreifacht.
- **Quelle:** Faros AI · AI Engineering Report 2026 (via faros.ai-Auszug) · 2026-04
- **Link:** https://www.faros.ai/blog/key-takeaways-from-the-dora-report-2025
- **Datum:** 2026-04
- **Beleg-Zitat:** "Median time in PR review is up 441%, compared to 91% in our 2025 dataset" ... "Incidents per PR are up 242.7%, meaning ... the probability of a production incident has more than tripled"
- **Relevanz:** gegenargument
- **Stärke:** stark

### DORA ROI 2026: 35–40 % auf Greenfield, ≤10 % auf Legacy

- **Aussage:** Die DORA-ROI-Studie 2026 (Google Cloud, ~5'000 Tech-Profis, 100+ h Interviews) beziffert den KI-Produktivitätsgewinn bei einfachen Greenfield-Tasks auf 35–40 %, bei komplexem Legacy-Code dagegen oft auf 10 % oder weniger.
- **Quelle:** InfoQ über DORA "ROI of AI-assisted Software Development" (2026.01) · 2026-05-11
- **Link:** https://www.infoq.com/news/2026/05/dora-roi-ai-assisted-dev-report/
- **Datum:** 2026-05-11
- **Beleg-Zitat:** "AI yields a 35 to 40% productivity gain on simple, greenfield tasks" but "its impact on complex legacy code is often 10% or less"
- **Relevanz:** kontext
- **Stärke:** stark

### METR 2026: RCT-Update — Beweislage bleibt schwach

- **Aussage:** Im Update vom Feb 2026 (57 Entwickler, 143 Repos, 800+ Tasks) schätzt METR die KI-Wirkung auf -18 % (CI -38 % bis +9 %) bei den ursprünglichen bzw. -4 % bei neuen Teilnehmern — wegen starker Selbstselektion (30–50 % reichten Tasks nicht ein, weil sie nicht ohne KI arbeiten wollten) wertet METR dies als nur "very weak evidence".
- **Quelle:** METR · "We are Changing our Developer Productivity Experiment Design" · 2026-02-24
- **Link:** https://metr.org/blog/2026-02-24-uplift-update/
- **Datum:** 2026-02-24
- **Beleg-Zitat:** "our data is only very weak evidence for the size of this increase" ... "30% to 50% of developers told us that they were choosing not to submit some tasks because they did not want to do them without AI"
- **Relevanz:** gegenargument
- **Stärke:** mittel

### JetBrains 2026: KI-Nutzer schreiben 8× mehr Code

- **Aussage:** JetBrains-Research (2 Jahre Logs von 800 Entwicklern, publiziert Apr 2026) zeigt, dass KI-Nutzer ihre getippten Zeichen um ~600/Monat steigerten (Nicht-Nutzer ~75/Monat); über 80 % berichten gestiegene Produktivität, über die Hälfte weniger Codier-Zeit — aber auch deutlich mehr iteratives Löschen (~100 vs. ~7 Deletions/Monat).
- **Quelle:** JetBrains Research Blog · "Understanding AI's Impact on Developer Workflows" · 2026-04
- **Link:** https://blog.jetbrains.com/research/2026/04/ai-impact-developer-workflows/
- **Datum:** 2026-04
- **Beleg-Zitat:** "over 80% of respondents reported that the introduction of AI coding tools slightly or significantly increased their productivity"
- **Relevanz:** mehrwert
- **Stärke:** mittel

### JetBrains 2026: 90 % nutzen KI, 74 % spezialisierte Dev-Tools

- **Aussage:** Im Januar 2026 nutzten 90 % der Entwickler regelmässig mindestens ein KI-Tool bei der Arbeit, und 74 % hatten bereits spezialisierte Entwickler-KI-Tools (Coding-Assistenten, Editoren, Agenten — nicht nur Chatbots) adoptiert.
- **Quelle:** JetBrains Research Blog · "Which AI Coding Tools Do Developers Actually Use at Work?" · 2026-04
- **Link:** https://blog.jetbrains.com/research/2026/04/which-ai-coding-tools-do-developers-actually-use-at-work/
- **Datum:** 2026-04
- **Beleg-Zitat:** "90% of developers regularly used at least one AI tool at work for coding and development tasks" ... "74% of developers worldwide had already adopted specialized AI tools for developers"
- **Relevanz:** kontext
- **Stärke:** stark

### Stack Overflow 2026: Agentennutzung verdoppelt auf 59 %

- **Aussage:** Laut Stack-Overflow-Erhebung (Mai 2026) nutzen 59 % der Entwickler bei der Arbeit Agenten (2025: 31 %), tägliche Nutzung stieg von 14 % auf 37 %; bei Architekten sind es 52 % tägliche Nutzung. GitHub Copilot (65 %) und Claude Code (50 %) sind die führenden Coding-Agenten.
- **Quelle:** Stack Overflow Blog · "Agents on a leash" · 2026-05-27
- **Link:** https://stackoverflow.blog/2026/05/27/agents-on-a-leash-agentic-ai-remains-mostly-monitored-at-work/
- **Datum:** 2026-05-27
- **Beleg-Zitat:** "59% use agents at work at any frequency, compared to 31% in the 2025 Developer Survey." Daily usage increased significantly from 14% to 37%.
- **Relevanz:** kontext
- **Stärke:** mittel

### Sonar 2026: KI schreibt 42 % des committeten Codes

- **Aussage:** Die State-of-Code-Erhebung 2026 (1'100+ Entwickler weltweit, publiziert 8. Jan 2026) ermittelt, dass KI heute 42 % des committeten Codes ausmacht und 72 % der KI-erprobten Entwickler sie täglich nutzen — Skalierung der Durchsatzbasis.
- **Quelle:** Sonar · "Sonar Data Reveals Critical Verification Gap in AI Coding" · 2026-01-08
- **Link:** https://www.sonarsource.com/company/press-releases/sonar-data-reveals-critical-verification-gap-in-ai-coding/
- **Datum:** 2026-01-08
- **Beleg-Zitat:** "AI accounts for 42% of all committed code" ... "72% of developers who have tried AI use it every day"
- **Relevanz:** kontext
- **Stärke:** stark

### Sonar 2026: Verifikations-Flaschenhals frisst Durchsatz

- **Aussage:** Dieselbe Sonar-Studie 2026 zeigt, dass der Geschwindigkeitsgewinn teils im Review verpufft: 38 % sagen, KI-Code zu prüfen sei aufwändiger als menschlichen Code, 96 % vertrauen KI-Output nicht voll, nur 48 % verifizieren ihn stets vor dem Commit.
- **Quelle:** Sonar · State of Code Developer Survey 2026 · 2026-01-08
- **Link:** https://www.sonarsource.com/company/press-releases/sonar-data-reveals-critical-verification-gap-in-ai-coding/
- **Datum:** 2026-01-08
- **Beleg-Zitat:** "38% of developers noting that reviewing AI-generated code requires more effort than reviewing code written by their human colleagues" ... only 48% "always check their AI-assisted code before committing it"
- **Relevanz:** gegenargument
- **Stärke:** stark

### TELUS 2026: Engineering shippt Code 30 % schneller

- **Aussage:** Im Anthropic 2026 Agentic Coding Trends Report berichtet TELUS, dass Engineering-Teams Code 30 % schneller ausliefern und über 500'000 Entwicklerstunden eingespart wurden (~40 Min. pro KI-Interaktion), bei 57'000 KI-nutzenden Mitarbeitenden.
- **Quelle:** Anthropic 2026 Agentic Coding Trends Report / TELUS Customer Story · 2026
- **Link:** https://claude.com/customers/telus
- **Datum:** 2026
- **Beleg-Zitat:** "Engineering teams are shipping code 30% faster" ... "500,000+ hours saved to date"
- **Relevanz:** mehrwert
- **Stärke:** mittel

### Anthropic 2026: ~60 % der Arbeit mit KI-Unterstützung

- **Aussage:** Der Anthropic 2026 Agentic Coding Trends Report (publiziert 2026) hält fest, dass Entwickler KI inzwischen in rund 60 % ihrer Arbeit einsetzen — ein Indikator für die breite Verschiebung Richtung agentischer Workflows in 2026.
- **Quelle:** Anthropic · 2026 Agentic Coding Trends Report · 2026
- **Link:** https://resources.anthropic.com/2026-agentic-coding-trends-report
- **Datum:** 2026
- **Beleg-Zitat:** "developers are now using AI in roughly 60% of their work"
- **Relevanz:** kontext
- **Stärke:** schwach

### DORA ROI 2026: temporärer "Productivity Dip" vor dem Gewinn

- **Aussage:** Die DORA-ROI-Studie 2026 modelliert für eine 500-Personen-Engineering-Org einen Erstjahres-ROI von 39 % bei ~8 Monaten Payback, warnt aber, dass die meisten Organisationen zunächst einen vorübergehenden Produktivitätsrückgang erleben (Lernkurve, "Verification Tax", Anpassung der Downstream-Prozesse), bevor langfristige Gewinne eintreten.
- **Quelle:** InfoQ über DORA "ROI of AI-assisted Software Development" (2026.01) · 2026-05-11
- **Link:** https://www.infoq.com/news/2026/05/dora-roi-ai-assisted-dev-report/
- **Datum:** 2026-05-11
- **Beleg-Zitat:** First-year return "approximately $11.6 million against $8.4 million investment" ... "ROI: 39% with ~8-month payback period"
- **Relevanz:** notwendigkeit
- **Stärke:** mittel

## Lücken / Unsicherheiten

- **DORA-Stabilität in Zahlen:** Die exakten Prozentwerte, wie stark ein bestimmter Anstieg der KI-Adoption die Delivery-Stabilität senkt bzw. den Durchsatz hebt, stehen nur im Vollbericht-PDF; die öffentlichen Blog-/News-Seiten liefern nur die Richtung (positiv Durchsatz, negativ Stabilität), nicht die Koeffizienten.
- **Anthropic-Zahl ("Mehrheit des Codes"):** Amodeis Aussage ist eine Selbstauskunft ohne offengelegte Messmethode; das exakte Datum des zitierten Interviews war auf der Quellseite nicht eindeutig (2025). Der "90 %"-Wert ist eine Prognose, kein Ist-Stand. Daher als Stärke "mittel" markiert.
- **Bain 10–15 %:** Nur als Sekundärzitat (SD Times/ITPro) bestätigt, nicht direkt aus dem Bain-Originalreport gefetcht — daher "schwach".
- **Cursor-ARR:** Finanzkennzahlen stammen aus Tech-Presse/Finanzierungsberichten, nicht aus geprüften Abschlüssen — als Markt-Kontext belastbar, als harte Bilanzzahl mit Vorsicht.
- **Anthropic 2026 Agentic Coding Trends Report:** Die Landing-Page lieferte keine extrahierbaren Zahlen (nur Marketing); konkrete Zahlen stecken im PDF, das nicht sauber gefetcht werden konnte.
