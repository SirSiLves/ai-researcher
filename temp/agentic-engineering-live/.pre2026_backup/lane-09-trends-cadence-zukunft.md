# Tempo, Trends & Ausblick — warum kontinuierliches Dranbleiben nötig ist

_Live-Recherche (Web) · erstellt 2026-06-04 · Thema: Agentic Engineering — Mehrwert / Notwendigkeit / Hiring._

## Kernaussagen dieser Lane

- **Das Release-Tempo der Frontier-Labs ist „relentless": Der mediane Abstand zwischen Modell-Releases fiel von 37,5 Tagen (2023) auf 11 Tage (2026 YTD) — Anthropic shippt im ~6-Wochen-Takt, OpenAI quartalsweise** (ARK / officechai / digitalapplied, April 2026).
- **Die Fähigkeiten verdoppeln sich rasant: METR misst, dass die autonom lösbare Aufgabenlänge sich historisch alle ~7 Monate verdoppelt — seit 2024 sogar alle ~3 Monate; Top-Agenten schaffen jetzt ~320 Min. (Claude Opus 4.5) bei 50 % Zuverlässigkeit** (METR, Jan/Mai 2026).
- **Standards konsolidieren sich extrem schnell: MCP wuchs von ~100k auf 97 Mio. monatliche SDK-Downloads in 18 Monaten (970×), >10'000 öffentliche Server; A2A überschritt in 12 Monaten 150+ Organisationen** (Anthropic Dez 2025; Linux Foundation April 2026).
- **Benchmarks sättigen in Monaten, nicht Jahren: SWE-bench-Verified-Spitze stieg von 48,5 % (GPT-4 Turbo, 2023) auf >93 % (2026); „Humanity's Last Exam" sprang von 8,8 % (Anf. 2025) auf >50 % (April 2026)** (Stanford AI Index 2026 / IEEE Spectrum).
- **Analysten sehen einen Inflektionspunkt mit Hiring-Konsequenz: Gartner — bis 2028 nutzen 75–90 % der Enterprise-Entwickler KI-Coding-Tools (von <10 % 2023); McKinsey — Hiring verschiebt sich von Volumen zu Tiefen-/Plattform-Expertise** (Gartner 2024–2026; McKinsey 2026).
- **Die Praxis ändert sich quartalsweise: Multi-File-Edits stiegen in Claude-Code-Sessions von 34 % (Q1 2025) auf 78 % (Q1 2026); autonome Aktionen pro Session verdoppelten sich in 6 Monaten** (Anthropic 2026 Agentic Coding Trends Report).

## Belege

### Release-Kadenz kollabiert: 37,5 → 11 Tage Median
- **Aussage:** Der branchenweite mediane Abstand zwischen Frontier-Modell-Releases fiel von 37,5 Tagen (2023) auf 13,5 (2024), 17 (2025) und 11 Tage (2026 YTD); OpenAI von 170,5 auf 49 Tage, Anthropic 2025 auf 75 Tage. Datenbasis: ARK Investment Management.
- **Quelle:** OfficeChai (auf Basis ARK Invest) · 28. April 2026
- **Link:** https://officechai.com/ai/frontier-labs-are-releasing-new-models-faster-than-ever-shows-data/
- **Datum:** 2026-04-28
- **Beleg-Zitat:** "The pace, in short, is relentless." (Median: 2023 = 37.5, 2024 = 13.5, 2025 = 17, 2026 YTD = 11 days)
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### Anthropic ~6-Wochen-Takt, OpenAI quartalsweise (H1 2026)
- **Aussage:** Was früher 6–9-monatige Flaggschiff-Zyklen waren, verdichtete sich auf quartalsweise (OpenAI) bzw. sechswöchentlich (Anthropic); vier Labs shippten Jan–Mai 2026 zusammen >20 Produktionsmodelle.
- **Quelle:** Digital Applied — Frontier Models H1 2026 Retrospective · 2026
- **Link:** https://www.digitalapplied.com/blog/frontier-models-h1-2026-retrospective-release-cadence-data
- **Datum:** 2026 (H1-Retrospektive)
- **Beleg-Zitat:** "What used to be six-to-nine-month flagship cycles tightened toward quarterly for OpenAI and six-weekly for Anthropic."
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### METR: Aufgabenlänge verdoppelt sich alle ~7 Monate, seit 2024 alle ~3
- **Aussage:** Die Aufgabenlänge (gemessen an menschlicher Bearbeitungszeit), die Agenten autonom mit 50 % Zuverlässigkeit lösen, verdoppelt sich seit 6 Jahren ca. alle 7 Monate; seit 2023 alle ~4,4 Monate, seit 2024 alle ~88,6 Tage (~3 Monate). Aktuell: Claude Opus 4.5 = 320 Min., GPT-5 = 214 Min.
- **Quelle:** METR — Time Horizon 1.1 · 29. Januar 2026
- **Link:** https://metr.org/blog/2026-1-29-time-horizon-1-1/
- **Datum:** 2026-01-29
- **Beleg-Zitat:** "Since 2024: 88.6 days (~3 months)" doubling time; "Claude Opus 4.5: 320 minutes [170-729]"
- **Relevanz:** mehrwert
- **Stärke:** stark

### METR-Extrapolation: Monatslange Projekte bis Ende des Jahrzehnts
- **Aussage:** Setzt sich der Trend fort, könnten Frontier-Systeme bis Ende des Jahrzehnts autonom monatslange Projekte stemmen; bei der jüngeren (schnelleren) Rate evtl. monatslange Aufgaben bereits 2027.
- **Quelle:** METR — Measuring AI Ability to Complete Long Tasks · 19. März 2025
- **Link:** https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/
- **Datum:** 2025-03-19
- **Beleg-Zitat:** "If the trend of the past 6 years continues to the end of this decade, frontier AI systems will be capable of autonomously carrying out month-long projects."
- **Relevanz:** mehrwert
- **Stärke:** stark

### MCP-Standard: 97 Mio. Downloads, 970× in 18 Monaten
- **Aussage:** MCP wuchs von ~100k monatlichen SDK-Downloads zum Start (Nov 2024) auf 97 Mio. (März 2026) — ein 970×-Anstieg in 18 Monaten; >10'000 aktive öffentliche Server; adoptiert von ChatGPT, Cursor, Gemini, Microsoft Copilot, VS Code.
- **Quelle:** Digital Applied — MCP Adoption Statistics 2026 / Anthropic Dez 2025
- **Link:** https://www.digitalapplied.com/blog/mcp-adoption-statistics-2026-model-context-protocol
- **Datum:** 2026-05-24 (Snapshot); Anthropic-Zahl Dez 2025
- **Beleg-Zitat:** "97M+ monthly SDK downloads cited by Anthropic (December 2025)"; "10,000+ active public servers"
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### MCP wird Infrastruktur: Spende an Linux-Foundation/AAIF
- **Aussage:** Anthropic spendete MCP am 9. Dez 2025 an die Agentic AI Foundation (Directed Fund der Linux Foundation), mitgegründet mit Block und OpenAI, unterstützt von Google, Microsoft, AWS, Cloudflare, Bloomberg. >10'000 aktive öffentliche Server, 97 Mio.+ monatliche SDK-Downloads.
- **Quelle:** Anthropic — Donating the Model Context Protocol · 9. Dezember 2025
- **Link:** https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation
- **Datum:** 2025-12-09
- **Beleg-Zitat:** "Over 10,000 active public MCP servers across the ecosystem"; "97M+ monthly SDK downloads"
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### A2A: 150+ Organisationen im ersten Jahr, Produktion bei MS/AWS/Google
- **Aussage:** Das Agent2Agent-Protokoll überschritt zum Einjahres-Jubiläum (April 2026) 150+ unterstützende Organisationen (von >50 ein Jahr zuvor), läuft produktiv in Azure AI Foundry, Amazon Bedrock AgentCore und bei Salesforce/SAP/ServiceNow; 22'000+ GitHub-Stars, 5 SDK-Sprachen.
- **Quelle:** Linux Foundation (Pressemitteilung) · 9. April 2026
- **Link:** https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year
- **Datum:** 2026-04-09
- **Beleg-Zitat:** "A2A has moved from initial release to a production-ready open standard" within less than one year; "more than 150 organizations"
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### SWE-bench Verified: von 48,5 % (2023) auf >93 % (2026)
- **Aussage:** SWE-bench-Verified-Scores stiegen von 48,5 % (GPT-4 Turbo, Nov 2023) auf 77,2 % (Claude 4 Sonnet, Okt 2025); per Juni 2026 führt Claude Mythos Preview mit 93,9 %, gefolgt von Claude Opus 4.8 (88,6 %). 92 evaluierte Modelle.
- **Quelle:** Local AI Master / Awesome Agents (SWE-bench-Leaderboards) · Juni 2026
- **Link:** https://www.codeant.ai/blogs/swe-bench-scores
- **Datum:** 2026-04-13 (Leaderboard-Snapshot); historische Reihe ab 2023
- **Beleg-Zitat:** "Claude Mythos Preview | 93.9% | April 13, 2026"; "Average (83 models) | 63.4%"
- **Relevanz:** mehrwert
- **Stärke:** mittel

### Benchmarks sättigen in Monaten — neue (härtere) Tests nötig
- **Aussage:** Stanford AI Index 2026: KI-Fähigkeit wuchs 2025 schneller als je in einem Jahrzehnt; „Humanity's Last Exam" sprang von 8,8 % (o1, Anf. 2025) auf 38,3 % und >50 % (April 2026, Opus 4.6 / Gemini 3.1 Pro); OSWorld-Agentenerfolg von 12 % auf ~66 %. Benchmarks veralten in Monaten statt Jahren.
- **Quelle:** Stanford AI Index 2026 (via IEEE Spectrum) · April 2026
- **Link:** https://spectrum.ieee.org/state-of-ai-index-2026
- **Datum:** 2026-04
- **Beleg-Zitat:** "Evaluations that were designed to stay relevant for years are saturating in months."; HLE "8.8 percent" → "38.3 percent" → "top 50 percent"
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### Praxis verschiebt sich quartalsweise: autonome Aktionen verdoppeln sich in 6 Monaten
- **Aussage:** Anthropics 2026 Agentic Coding Trends Report: Multi-File-Edits stiegen in Claude-Code-Sessions von 34 % (Q1 2025) auf 78 % (Q1 2026); durchschnittliche Session-Länge von 4 Min. (Autocomplete) auf 23 Min. (Agentic); autonome Aktionen pro Session verdoppelten sich in nur 6 Monaten (~20). 2026 = Wechsel von Einzelassistenten zu koordinierten Agenten-Teams.
- **Quelle:** Anthropic — 2026 Agentic Coding Trends Report (via Beam-Zusammenfassung)
- **Link:** https://getbeam.dev/blog/anthropic-agentic-coding-trends-2026.html
- **Datum:** 2026
- **Beleg-Zitat:** Multi-file edits "Q1 2025: 34%" → "Q1 2026: 78%"; session length "2024: 4 minutes" → "2026: 23 minutes"
- **Relevanz:** mehrwert
- **Stärke:** mittel

### Gartner: bis 2028 nutzen 75–90 % der Entwickler KI-Coding-Tools
- **Aussage:** Gartner: bis 2028 nutzen 75 % der Enterprise-Software-Engineers KI-Code-Assistenten, von <10 % Anfang 2023 (spätere Prognose: 90 % von <14 % Anfang 2024); Q3 2023 pilotierten/deployten bereits 63 % der befragten 598 Engineering-Leader.
- **Quelle:** Gartner (via The Register) · 13. April 2024
- **Link:** https://www.theregister.com/2024/04/13/gartner_ai_enterprise_code/
- **Datum:** 2024-04-13
- **Beleg-Zitat:** "By 2028, 75 percent of enterprise software engineers will use AI code assistants, up from less than 10 percent in early 2023."
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### Gartner: bis 2027 behandeln >65 % der Teams die IDE als optional
- **Aussage:** Gartner (Mai-2026-Report zu Enterprise-AI-Coding-Agents): bis 2027 behandeln >65 % der Engineering-Teams, die agentisches Coding nutzen, integrierte Entwicklungsumgebungen (IDEs) als optional und verlagern Kontrolle/Governance/Validierung auf automatisierte Plattformen.
- **Quelle:** Gartner Newsroom (via Suchergebnis-Reporting; Primärseite 403-gesperrt) · 20. Mai 2026
- **Link:** https://www.gartner.com/en/newsroom/press-releases/2026-05-20-gartner-says-the-market-for-enterprise-ai-coding-agents-is-entering-a-new-phase-of-expansion-and-competitive-realignment
- **Datum:** 2026-05-20
- **Beleg-Zitat:** "by 2027, over 65% of engineering teams using agentic coding will treat integrated development environments (IDEs) as optional"
- **Relevanz:** notwendigkeit
- **Stärke:** mittel

### McKinsey: Hiring verschiebt sich von Volumen zu Tiefen-Expertise
- **Aussage:** McKinsey (AI-First-Era-Workforce): Mit Agenten als Werkzeugen sind Experten mehrfach produktiver als weniger erfahrene Kollegen bei moderater Lohndifferenz; Hiring-Prioritäten verschieben sich weg von generischen Engineering-Rollen hin zu tiefer Plattform-/Architektur-Expertise. Tech-Branche führend: 24 % nutzen Agenten im Software Engineering.
- **Quelle:** McKinsey — Designing an end-to-end technology workforce for the AI-first era · 2026
- **Link:** https://www.mckinsey.com/capabilities/mckinsey-technology/our-insights/designing-an-end-to-end-technology-workforce-for-the-ai-first-era
- **Datum:** 2026
- **Beleg-Zitat:** "Companies that continue to hire for volume rather than expertise risk inflating costs without increasing impact." (via Suchergebnis-Reporting)
- **Relevanz:** hiring
- **Stärke:** mittel

### Amodei-Prognose vom März 2025 — Anthropic-CPO bestätigt „effektiv 100 %"
- **Aussage:** Dario Amodei sagte im März 2025 voraus, KI werde in 3–6 Monaten 90 % des Codes schreiben, in 12 Monaten quasi alles. CPO Mike Krieger bestätigte am 8. Feb 2026: für die meisten Anthropic-Produkte sei dies „effektiv 100 %".
- **Quelle:** OfficeChai (Krieger-Zitat) · 8. Februar 2026
- **Link:** https://officechai.com/ai/dario-amodei-had-predicted-90-of-code-would-be-written-by-ai-but-now-at-anthropic-its-effectively-100-anthropic-cpo/
- **Datum:** 2026-02-08
- **Beleg-Zitat:** "Right now for most products at Anthropic, it's effectively 100%."
- **Relevanz:** kontext
- **Stärke:** mittel

### Gegenargument: Gartner erwartet >40 % gescheiterte Agentic-AI-Projekte bis 2027
- **Aussage:** Gartner prognostiziert, dass bis Ende 2027 über 40 % der Agentic-AI-Projekte abgebrochen werden — wegen eskalierender Kosten, unklarem Geschäftswert und unzureichenden Risiko-Controls. Zudem: SWE-bench-Verified-Scores sind durch Daten-Kontamination aufgebläht (Opus-Modell fällt von ~81 % auf ~46 % auf SWE-bench Pro).
- **Quelle:** Gartner Pressemitteilung · 25. Juni 2025; SWE-bench-Pro-Reporting (Scale/CodeAnt)
- **Link:** https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027
- **Datum:** 2025-06-25
- **Beleg-Zitat:** "Over 40% of agentic AI projects will be canceled by the end of 2027, due to escalating costs, unclear business value or inadequate risk controls."
- **Relevanz:** gegenargument
- **Stärke:** mittel

## Lücken / Unsicherheiten

- **Gartner-Primärquellen 403-gesperrt:** Die beiden Gartner-Pressemitteilungen (Mai 2026 IDE-optional / Juni 2025 Cancellation) liefern WebFetch HTTP 403. Die Zahlen (65 %, 40 %) stammen aus konsistentem Sekundär-Reporting bzw. den Such-Snippets; Wortlaut sollte vor Zitat in einem Bericht idealerweise an der Gartner-Seite selbst verifiziert werden.
- **SWE-bench-Reihe heterogen:** Verschiedene Leaderboards nennen leicht abweichende Spitzenwerte (93,9 % „Mythos Preview", 88,6–88,7 % GPT-5.5/Opus 4.8). Modellnamen wie „Claude Mythos Preview" konnte ich nicht gegen eine Anthropic-Primärquelle prüfen — als Trendbeleg robust, als exakte Modellzuordnung schwach.
- **Anthropic-PDF nicht direkt extrahierbar:** Der originale „2026 Agentic Coding Trends Report" (PDF/Landing-Page) gab keine Zahlen frei; die zitierten Werte (34→78 %, 4→23 Min.) stammen aus einer Sekundär-Zusammenfassung (Beam) — inhaltlich plausibel, aber nicht am Originaldokument verifiziert.
- **digitalapplied.com / officechai** sind Aggregatoren; ihre Cadence-Zahlen berufen sich auf ARK Invest. Die ARK-Originaldaten habe ich nicht direkt gefetcht.
- **Kein direkter Schweizer/Banken-Kontext** in dieser Lane gefunden — Fokus lag auf globalem Tempo/Trajektorie; Regulierungs-/Finanz-spezifische Cadence-Anpassungen wären eine eigene Recherche.
