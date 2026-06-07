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

### MCP-Standard: 97 Mio. Downloads, 970× in 18 Monaten
- **Aussage:** MCP wuchs von ~100k monatlichen SDK-Downloads zum Start (Nov 2024) auf 97 Mio. (März 2026) — ein 970×-Anstieg in 18 Monaten; >10'000 aktive öffentliche Server; adoptiert von ChatGPT, Cursor, Gemini, Microsoft Copilot, VS Code.
- **Quelle:** Digital Applied — MCP Adoption Statistics 2026 / Anthropic Dez 2025
- **Link:** https://www.digitalapplied.com/blog/mcp-adoption-statistics-2026-model-context-protocol
- **Datum:** 2026-05-24 (Snapshot); Anthropic-Zahl Dez 2025
- **Beleg-Zitat:** "97M+ monthly SDK downloads cited by Anthropic (December 2025)"; "10,000+ active public servers"
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

### OpenAI-Release-Median fällt auf 49 Tage (2026 YTD)
- **Aussage:** OpenAIs Median-Abstand zwischen Frontier-Releases fiel von 170,5 Tagen (2023) über 84,5 (2024) und 58 (2025) auf nur noch 49 Tage im laufenden Jahr 2026 — rund 70% Kompression in drei Jahren.
- **Quelle:** OfficeChai (Auswertung Release-Daten) · 2026-04-29
- **Link:** https://officechai.com/ai/frontier-labs-are-releasing-new-models-faster-than-ever-shows-data/
- **Datum:** 2026-04-29
- **Beleg-Zitat:** "In 2023, the industry median sat at 37.5 days between releases. By 2024, that had compressed to 13.5 days."
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### MCP erreicht 41% Produktiv-Einsatz in Unternehmen
- **Aussage:** Laut Stacklok-Enterprise-Survey 2026 sind 41% der befragten Software-Organisationen mit MCP-Servern in Produktion (29% limitiert, 12% breit); die offizielle Registry zählt 9.652 aktuelle Server-Records (Snapshot 24.05.2026).
- **Quelle:** Digital Applied · MCP Adoption Statistics 2026 · 2026-05-24
- **Link:** https://www.digitalapplied.com/blog/mcp-adoption-statistics-2026-model-context-protocol
- **Datum:** 2026-05-24
- **Beleg-Zitat:** "29% limited production and 12% broad production based on Stacklok's 2026 software enterprise survey, yielding 41% total production adoption."
- **Relevanz:** mehrwert
- **Stärke:** mittel

### GDPval: Top-Modell trifft Profis in 84,9% der Vergleiche
- **Aussage:** Auf GDPval (real-ökonomische Wissensarbeit über 44 Berufe) erreicht GPT-5.5 einen Score von 84,9%, d.h. es erreicht oder übertrifft menschliche Fachleute in 84,9% der Vergleiche — GPT-5.4 lag im März 2026 noch bei 83,0%.
- **Quelle:** MarkTechPost (GPT-5.5 Release) · 2026-04-23
- **Link:** https://www.marktechpost.com/2026/04/23/openai-releases-gpt-5-5-a-fully-retrained-agentic-model-that-scores-82-7-on-terminal-bench-2-0-and-84-9-on-gdpval/
- **Datum:** 2026-04-23
- **Beleg-Zitat:** "GPT-5.5 scores 84.9% on GDPval, which tests agents across 44 occupations of knowledge work."
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### Terminal-Bench 2.0: Agenten lösen 82,7% realer CLI-Aufgaben
- **Aussage:** Auf Terminal-Bench 2.0 (komplexe Kommandozeilen-Workflows) erreicht GPT-5.5 im April 2026 82,7%; im März 2026 führte Codex dort noch mit 77,3% vor Claude (65,4%) — ein neuer, härterer Agenten-Benchmark jenseits von SWE-bench.
- **Quelle:** MarkTechPost · 2026-04-23 (zudem Morph LLM, 2026-03-04)
- **Link:** https://www.marktechpost.com/2026/04/23/openai-releases-gpt-5-5-a-fully-retrained-agentic-model-that-scores-82-7-on-terminal-bench-2-0-and-84-9-on-gdpval/
- **Datum:** 2026-04-23
- **Beleg-Zitat:** "GPT-5.5 scores 82.7% on Terminal-Bench 2.0, which tests complex command-line workflows."
- **Relevanz:** mehrwert
- **Stärke:** stark

### Markt für Enterprise-Coding-Agents verdreifacht sich auf ~10 Mrd. USD
- **Aussage:** Gartner beziffert den annualisierten Umsatz für Enterprise-AI-Coding-Agents per April 2026 auf 9,8-11,0 Mrd. USD — eine Verdreifachung gegenüber rund 3,0-3,5 Mrd. USD Anfang 2025, also +6,3-7,5 Mrd. in nur 16 Monaten.
- **Quelle:** beri.net, zitiert Gartner Magic Quadrant (20.05.2026) · 2026-05-22
- **Link:** https://www.beri.net/article/gartner-2026-5-coding-agent-leaders-17x-roi-decoded
- **Datum:** 2026-05-22
- **Beleg-Zitat:** "Gartner pegs annualized spend at $9.8–11.0 billion as of April 2026, up from roughly $3.0–3.5 billion in early 2025."
- **Relevanz:** hiring
- **Stärke:** stark

### Gartner: 90% der Entwickler nutzen 2028 Coding-Assistenten
- **Aussage:** Gartner prognostiziert, dass bis 2028 90% der Entwickler AI-Coding-Assistenten nutzen werden — gegenüber unter 14% Anfang 2024; weltweite AI-Ausgaben sollen 2026 auf 2,59 Bio. USD steigen (+47% ggü. 2025).
- **Quelle:** beri.net (Gartner-Forecast) / Gartner Spending-Release (19.05.2026) · 2026-05-22
- **Link:** https://www.beri.net/article/gartner-2026-5-coding-agent-leaders-17x-roi-decoded
- **Datum:** 2026-05-22
- **Beleg-Zitat:** "Gartner now forecasts that 90% will [use AI coding assistants] by 2028 (compared to under 14% in early 2024)."
- **Relevanz:** hiring
- **Stärke:** mittel

## Lücken / Unsicherheiten

- **Gartner-Primärquellen 403-gesperrt:** Die beiden Gartner-Pressemitteilungen (Mai 2026 IDE-optional / Juni 2025 Cancellation) liefern WebFetch HTTP 403. Die Zahlen (65 %, 40 %) stammen aus konsistentem Sekundär-Reporting bzw. den Such-Snippets; Wortlaut sollte vor Zitat in einem Bericht idealerweise an der Gartner-Seite selbst verifiziert werden.
- **SWE-bench-Reihe heterogen:** Verschiedene Leaderboards nennen leicht abweichende Spitzenwerte (93,9 % „Mythos Preview", 88,6–88,7 % GPT-5.5/Opus 4.8). Modellnamen wie „Claude Mythos Preview" konnte ich nicht gegen eine Anthropic-Primärquelle prüfen — als Trendbeleg robust, als exakte Modellzuordnung schwach.
- **Anthropic-PDF nicht direkt extrahierbar:** Der originale „2026 Agentic Coding Trends Report" (PDF/Landing-Page) gab keine Zahlen frei; die zitierten Werte (34→78 %, 4→23 Min.) stammen aus einer Sekundär-Zusammenfassung (Beam) — inhaltlich plausibel, aber nicht am Originaldokument verifiziert.
- **digitalapplied.com / officechai** sind Aggregatoren; ihre Cadence-Zahlen berufen sich auf ARK Invest. Die ARK-Originaldaten habe ich nicht direkt gefetcht.
- **Kein direkter Schweizer/Banken-Kontext** in dieser Lane gefunden — Fokus lag auf globalem Tempo/Trajektorie; Regulierungs-/Finanz-spezifische Cadence-Anpassungen wären eine eigene Recherche.
