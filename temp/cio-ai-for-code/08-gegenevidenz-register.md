# Gegenevidenz-Register (deckweit)

_Konsolidierte Sammlung aller als **Gegenevidenz** markierten Befunde aus den Cluster-Dateien 01–07. Zweck: Glaubwürdigkeits-Rückgrat für die CIO-Vorlage — der Entscheid muss zeigen, dass die Kehrseite (Produktivitäts-Slowdowns, Qualitäts-/Sicherheitsregressionen, gescheiterte Piloten, Lock-in/Tollbooth, Hype/Bubble, Benchmark-Grenzen) gesichtet wurde. Stichtag Archiv: 2026-06-03. Jeder Block ist 1:1 aus der jeweiligen Cluster-Datei übernommen — Zahlen und Quellen unverändert, inkl. Verifizierungsstatus._

**Umfang:** 111 Gegenevidenz-/Einschränkungs-Befunde aus 7 Clustern. Bei jedem Block verweist die **Fundstelle** auf die Originalquelle; die Cluster-Datei in der jeweiligen Gruppenüberschrift nennt den Sammlungsort.

> Hinweis für die Konsolidierung: Diese Liste ist bewusst **breit und ungewichtet**. Einige Befunde sind Einzelquellen oder "nicht einzeln verifiziert" (siehe **Verifizierung**-Feld) — vor Verwendung in einer Board-Vorlage entsprechend gewichten bzw. nachprüfen.

## Produktivität (24)
_Quelle der Blöcke: `02-produktivitaet-und-gegenevidenz.md`_

### METR self-reported Survey: Eigeneinschätzung 1,3× → 2,0× → 2,5× (NEU seit Stichtag-nah)
- **Befund:** Selbstberichtete METR-Umfrage unter 349 technischen Fachkräften (87 Software-Engineers, 71 Researcher, 129 Akademiker/PhD, 48 Founder/Manager): "Wert der Arbeit" bei 1,3× (März 2025) → 2,0× (März 2026) → Prognose 2,5× (März 2027); aktueller Median 1,4–2× Wert, ~3× Geschwindigkeit. METR-eigene Mitarbeitende berichten die NIEDRIGSTEN Zuwächse jeder Subgruppe; frühere Arbeiten fanden, dass Selbstberichte den Zeit-Effekt um ~40 Prozentpunkte überschätzen.
- **Originalquelle:** METR · 2026-05-11 · https://metr.org/blog/2026-05-11-ai-usage-survey/
- **Fundstelle:** news/2026/05/2026-05-19.md → LinkedIn/Items section; ergänzt durch online-Fetch der METR-Seite
- **Datum:** 2026-05-11
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Online-Fetch der METR-Seite verifiziert: "METR staff give the lowest change in value answers of any subgroup")
- **Art:** Beleg + Gegenevidenz (Selbstbericht zeigt Gewinne, aber METR warnt selbst vor Unzuverlässigkeit)
- **Notiz:** Dies ist eine SELBSTBERICHTETE Umfrage, NICHT die randomisierte METR-Kontrollstudie — Zahlen sind Eigeneinschätzung, tendenziell optimistisch; die Messprofis (METR-Staff) selbst nennen die kleinsten Gewinne.
- **Zitat (opt.):** "survey results are not necessarily grounded in reality... METR staff give the lowest change in value answers of any subgroup we study"

### Salesforce: gesamte Engineering-Org auf Claude Code, +79% PRs/Entwickler (NEU seit Stichtag-nah)
- **Befund:** Salesforce verlegte seine gesamte Engineering-Org auf Claude Code (unbegrenzte Token) und meldete für April 2026: +79% Pull Requests pro Entwickler, ~5% weniger Incidents, +50,8% Work-Items YoY und eine 33-Endpoint-API-Migration, geschätzt auf 231 Personentage, fertig in 13 (~18× schneller).
- **Originalquelle:** Salesforce · 2026-05-28 · https://www.salesforce.com/news/stories/how-engineering-became-agentic/
- **Fundstelle:** weekly/2026/2026-W22.md → Enterprise agent revenue section; auch daily/2026/05/2026-05-30.md, monthly/2026-05.md
- **Datum:** 2026-05-28
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (mit Gegenevidenz-naher Qualifizierung)
- **Notiz:** Größte First-Party-Agentic-Coding-ROI-Zahl bisher — ausdrücklich Hersteller-eigene, NICHT unabhängig geprüfte Zahlen ("vendor's own figures, unaudited"); der ~5%-Incident-Rückgang ist gering.
- **Zitat (opt.):** "+79% PRs/developer ... a 33-endpoint API migration ... done ~18× faster (231→13 person-days)"

### "Domain expertise has always been the real moat" (HN, 779 Punkte) (NEU seit Stichtag-nah)
- **Befund:** HN-Thread (779 Punkte / 488 Kommentare): Da KI das Coden kommodifiziert, verschiebt sich der dauerhafte Vorteil auf Domänenwissen — nicht auf reine Coding-Geschwindigkeit. Pushback im Thread: Modelle sind auf frühere Implementierungen vortrainiert, viel "Ambiguität" war im Trainingsset schon gelöst.
- **Originalquelle:** HN · 2026-05-31 · https://news.ycombinator.com/item?id=48340411
- **Fundstelle:** daily/2026/05/2026-05-31.md → Hacker News pulse; weekly/2026/2026-W22.md
- **Datum:** 2026-05-31
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz / Kontext
- **Notiz:** Relativiert reine Produktivitätsgewinn-Zahlen — der Flaschenhals ist laut Diskurs Domänenverständnis, nicht Tippgeschwindigkeit.

### Nolan Lawson: Produktivität aus langsameren Review-Zyklen, nicht schnellerem Tippen (NEU seit Stichtag-nah)
- **Befund:** Nolan Lawson ("Using AI to write better code more slowly"): Produktivitätsgewinn aus KI-Coding kommt aus erzwungen langsameren Review-/Verifizier-Zyklen, NICHT aus schnellerem Tippen — HN 1.208 Punkte / 443 Kommentare (eine zweite Erfassung nennt 1.107/408).
- **Originalquelle:** Nolan Lawson · 2026-05-25 · https://nolanlawson.com/2026/05/25/using-ai-to-write-better-code-more-slowly/
- **Fundstelle:** hackernews/2026/05/2026-05-27.md → Top items; auch daily/2026/05/2026-05-26.md → Hacker News pulse
- **Datum:** 2026-05-25
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz
- **Notiz:** Direkte Hype-Korrektur und Top-HN-Stimmungsbild — der Titel selbst widerspricht dem "55%-faster"-Narrativ.
- **Zitat (opt.):** "Productivity from AI coding comes from forcing slower review/verify cycles, not faster typing."

### Uber-President: KI-Ausgaben "harder to justify" (NEU seit Stichtag-nah)
- **Befund:** Uber-President nennt KI-Ausgaben öffentlich "harder to justify" — Top-20-Enterprise-Kunde hinterfragt GenAI-ROI (HN 230, eine zweite Erfassung 298 Punkte). Begleit-Thread nennt Subscription-vs-API-Kostengap 10–40×.
- **Originalquelle:** HN/Uber · 2026-05-26 (auch 05-27 erfasst) · https://news.ycombinator.com/item?id=48277485
- **Fundstelle:** daily/2026/05/2026-05-26.md → Hacker News pulse; daily/2026/05/2026-05-27.md
- **Datum:** 2026-05-26
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** HN-Front-Page verschob sich von "look what AI can do" zu "is this worth it" — Produktivitätsgewinn muss gegen Kosten gerechnet werden.

### Maxim Salnikov: Compound-Error-Mathematik der Multi-Step-Tasks (NEU seit Stichtag-nah)
- **Befund:** Compound-Error: 99% Genauigkeit/Schritt über 50 Schritte = ~60% Erfolg; bei 95%/Schritt nur ~8%. Modell-Routing als ~24×-Kostenhebel (Claude Opus 4.7 vs GPT-5.4 mini). Copilot-CLI-Team liefert laut Quelle ~500 PRs/Woche bei ~53% Test-Coverage.
- **Originalquelle:** Maxim Salnikov (Microsoft/GitHub), LinkedIn · 2026-05-28 · https://www.linkedin.com/pulse/practitioners-guide-getting-more-value-out-ai-coding-agent-salnikov-mhume/
- **Fundstelle:** linkedin/2026/05/2026-05-28.md (Zeile 29)
- **Datum:** 2026-05-28
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert (Einzelquelle)
- **Art:** Kontext / Gegenevidenz
- **Notiz:** Zeigt quantitativ, warum lange agentische Ketten zuverlässigkeitskritisch sind — kleine Per-Schritt-Fehlerraten kollabieren über viele Schritte; ~500 PRs/Woche-Throughput steht ~53% Coverage gegenüber.

### Pragmatic-Engineer-Umfrage (906 Engineers): Shippers profitieren am meisten, häufen Tech-Debt am schnellsten (NEU seit Stichtag-nah)
- **Befund:** 906 Engineers/Leads (Median 11–15 J. Erfahrung): 95% nutzen KI-Tools wöchentlich, 55% nutzen Agenten; Claude Code von null zum meistgenutzten Tool in 8 Monaten. "Max"-Pläne ~$100–200/Monat pro Engineer. Die "Shippers"-Kohorte profitiert am meisten UND häuft Tech-Debt am schnellsten an; schwächere Engineers leveln auf, produzieren aber Slop.
- **Originalquelle:** Gergely Orosz, The Pragmatic Engineer · 2026-05-21 · https://newsletter.pragmaticengineer.com/p/the-impact-of-ai-on-software-engineers-2026
- **Fundstelle:** blogs/2026/05/2026-05-21.md → Blog picks
- **Datum:** 2026-05-21
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg + Gegenevidenz
- **Notiz:** Sauberste empirische Momentaufnahme der KI-augmentierten Softwarearbeit Mitte 2026 — nuanciert: Geschwindigkeit ja, aber Schuldenaufbau.
- **Zitat (opt.):** "The 'Shippers' cohort benefits most but adds tech debt fastest."

### Guido Greber "Die KI-Illusion": 88% Schweizer Firmen nutzen KI, 41% CEOs ohne ROI (NEU seit Stichtag-nah)
- **Befund:** Digital Gipfel Schweiz 2026 (Andermatt): ~88% der Schweizer Firmen nutzen KI, aber 41% der CEOs berichten KEINEN ROI — echte Produktivität entsteht erst, wenn Organisationen aufhören mit Kleintools zu "flicken" und Workflows neu denken ("Elektrizitäts-Paradox").
- **Originalquelle:** Guido Greber (de) · 2026-05-30 / 2026-06-01 · https://de.linkedin.com/pulse/die-ki-illusion-warum-uns-kleine-tools-nicht-retten-und-guido-greber-8rxhe
- **Fundstelle:** daily/2026/05/2026-05-30.md → LinkedIn pulse; weekly/2026/2026-W23.md; linkedin/2026/06/2026-06-01.md
- **Datum:** 2026-05-30
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz
- **Notiz:** Schweizer "KI-Illusion"-Quelle: Adoption hoch, Produktivität/ROI aber nicht — Workflow-Redesign statt Copilot-Aufsatz.
- **Zitat (opt.):** "88% of Swiss companies use AI, yet 41% of CEOs report no ROI"

### DORA 2026 "ROI of AI-assisted Software Development": J-Curve, verification tax, $344K (NEU seit Stichtag-nah)
- **Befund:** DORA modelliert AI-Wert als J-Curve (initialer Produktivitäts-DIP vor Uplift), getrieben von Lernkurve, "verification tax" (Review von KI-Code) und Pipeline-Anpassung; Change Failure Rate steigt 5%→6% post-Adoption = ~$344K negativer Downtime-Impact. Für eine 500-Personen-Org modelliert der Report dennoch ~$11,6M Ertrag im ersten Jahr auf ~$8,4M Investition = 39% ROI, ~8 Monate Payback.
- **Originalquelle:** Google Cloud / DORA (Nathen Harvey) · 2026-05-11 · https://dora.dev/ai/roi/report/ (Analyse: https://www.infoq.com/news/2026/05/dora-roi-ai-assisted-dev-report/)
- **Fundstelle:** Online (nicht im Archiv) — Online-Fetch dora.dev + InfoQ
- **Datum:** 2026-05-11
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (dora.dev + InfoQ; PDF selbst überschritt Fetch-Limit, Zahlen via Report-Seite + InfoQ verifiziert)
- **Art:** Beleg + Gegenevidenz (Gewinn UND Dip/Instabilitätskosten in einem Report)
- **Notiz:** AI-ROI ist nicht sofort — messbarer Dip und quantifizierte Instabilitätskosten; benennt die "verification tax".
- **Zitat (opt.):** "the assumed change failure rate rises from 5% to 6% after AI adoption [producing] a negative downtime impact of $344,000"

### Stanford SWE-Produktivität: 35–40% greenfield vs ≤10% legacy (NEU seit Stichtag-nah)
- **Befund:** Stanford-Forschung (zitiert in DORA 2026 ROI-Report): AI liefert 35–40% Produktivitätsgewinn bei einfachen Greenfield-Tasks, aber nur ~10% oder weniger bei komplexem Legacy-Code (auf High-Complexity-Arbeit ~5–10%). Sekundärberichte nennen einen Netto-Schnitt von 15–20% nach Rework/Bug-Fixing (Initial-Output +30–40%, aber Rework erodiert ihn).
- **Originalquelle:** Stanford (via DORA ROI report / InfoQ) · 2026-05-11 · https://www.infoq.com/news/2026/05/dora-roi-ai-assisted-dev-report/
- **Fundstelle:** Online (nicht im Archiv) — Online-Fetch InfoQ
- **Datum:** 2026-05-11
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** confirmed (verbatim auf InfoQ); 15–20%-Netto-Schnitt ist Sekundärberichterstattung, nicht separat gefetcht
- **Art:** Gegenevidenz / Kontext
- **Notiz:** Quantifiziert, WARUM Studien sich widersprechen — AI hilft viel bei neuem/einfachem Code und wenig bei harter Legacy-Arbeit; reconciled DORA-Gewinne mit METR-Slowdown (METR nutzte 1M-LOC-Repos).
- **Zitat (opt.):** "while AI yields a 35 to 40% productivity gain on simple, greenfield tasks, its impact on complex legacy code is often 10% or less"

### Claw-Eval-Live: stärkstes Modell nur 66,7% Task-Completion (NEU seit Stichtag-nah)
- **Befund:** Live-Agent-Benchmark mit deterministischem Grading: das stärkste Modell erreicht nur 66,7% Task-Completion auf sich entwickelnden Real-World-Workflows.
- **Originalquelle:** Chenxin Li, Zhengyang Tang · 2026-05-02 · arXiv:2604.28139
- **Fundstelle:** papers/2026/05/2026-05-02.md; daily/2026/05/2026-05-02.md → Papers
- **Datum:** 2026-05-02
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** In realistischen, sich ändernden Workflows scheitert selbst das beste Modell zu ~1/3 — relativiert Produktivitäts-Headlines.

### Anthropic Claude Code-Regression: stiller Qualitätsverfall (NEU seit Stichtag-nah)
- **Befund:** Anthropic-Postmortem bestätigt: "Modelle wurden schlechter"-Beschwerden waren real, Ursache aber drei separate Harness-Bugs — u.a. ein 26.-März-Bug (Thinking-Context-Clear) feuerte fälschlich jede Runde statt nach 1h Idle und machte Claude "forgetful and repetitive"; Reasoning-Effort fiel am 4. März still von high auf medium (revertiert 7. April).
- **Originalquelle:** Anthropic Engineering Postmortem (via Simon Willison) · 2026-04-23/24 · https://www.anthropic.com/engineering/april-23-postmortem ; simonwillison.net/2026/Apr/24/recent-claude-code-quality-reports
- **Fundstelle:** daily/2026/04/2026-04-24.md → narrative; daily/2026/03/2026-03-26.md; weekly/2026/2026-W17.md
- **Datum:** 2026-04-23
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Konkretes Beispiel, dass Produktivitäts-Tools wochenlang still degradieren können (Harness-Bug, nicht Modell) — Stabilitäts-Caveat zur Gewinn-Story.

### Empirische Studie: 110.000 OSS-PRs — Agent-Code mehr Churn, niedrigere Survival (NEU seit Stichtag-nah)
- **Befund:** Empirische Studie über 110.000 Open-Source-PRs (Codex, Claude Code, Copilot, Jules, Devin): Agent-geschriebener Code zeigt höhere Code-Churn und niedrigere Survival-Rates als menschlich geschriebener Code.
- **Originalquelle:** Razvan Mihai Popescu, David Gros (TU Delft) · 2026-04-04 · arXiv:2604.00917
- **Fundstelle:** papers/2026/04/2026-04-04.md → Picks; weekly/2026/2026-W14.md → Notable papers
- **Datum:** 2026-04-04
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz
- **Notiz:** Härtester empirischer Datenpunkt für die "Agent-Produktivität vs. Agent-Debt"-Debatte im Archiv (110K-PR-Stichprobe) — Durchsatz vs. Rework/Stabilität.
- **Zitat (opt.):** "agent code has elevated churn and lower survival vs human-authored"

### Drei OSS-Maintainer: Security-Reports von 2–3/Woche auf 5–10/Tag (NEU seit Stichtag-nah)
- **Befund:** Greg Kroah-Hartman (Linux), Daniel Stenberg (cURL), Willy Tarreau (HAProxy) bestätigen: die Kernel-Security-Liste kippte in ~einem Monat von 2–3 Slop-Reports/Woche auf 5–10 echte (oft duplizierte) KI-assistierte Reports/Tag.
- **Originalquelle:** Simon Willison · 2026-04-03 · https://simonwillison.net/2026/Apr/3/greg-kroah-hartman/
- **Fundstelle:** weekly/2026/2026-W14.md → narrative + blog picks; daily/2026/04/2026-04-03.md
- **Datum:** 2026-04-03
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg / Gegenevidenz (zweischneidig)
- **Notiz:** Echte Funde steigen real, aber die Review-/Triage-Last verschiebt den Engpass — Durchsatz vs. Stabilität konkret; der Bottleneck wandert zur Patch-/Maintainer-Kapazität.

### Forecasting Research Institute: nur ~1 Prozentpunkt zusätzliches BIP bis 2030 (NEU seit Stichtag-nah)
- **Befund:** Umfrage (69 Ökonomen, 52 Branchenexperten, 401 Laien): erwarten rapiden KI-Fortschritt, aber nur ~1 Prozentpunkt zusätzliches BIP bis 2030 — ein "genuine puzzle" (Produktivitätsparadox makro).
- **Originalquelle:** Forecasting Research Institute · 2026-04-06 (via Jack Clark, Import AI 452) · jack-clark.net
- **Fundstelle:** daily/2026/04/2026-04-06.md → Lead narrative
- **Datum:** 2026-04-06
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (im Archiv; via Import AI referenziert)
- **Art:** Gegenevidenz / Kontext (Makro)
- **Notiz:** Wichtiger Makro-Kontrapunkt zum Mikro-Produktivitäts-Hype — Experten sehen kaum BIP-Effekt; das Produktivitätsparadox in Zahlen.

### Bryan Cantrill: LLMs fehlt die "Tugend der Faulheit" (NEU seit Stichtag-nah)
- **Befund:** LLMs fehlt die "virtue of laziness" — Arbeit kostet sie nichts, also häufen sie Müll auf Systeme, statt die knappen, sauberen Abstraktionen zu bauen, die Menschen zur Zeitersparnis erstellen.
- **Originalquelle:** Bryan Cantrill via Simon Willison · 2026-04-13 · Jack-Clark/Willison-Verweis
- **Fundstelle:** daily/2026/04/2026-04-13.md → narrative + blog picks
- **Datum:** 2026-04-13
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz / Kontext (konzeptuell)
- **Notiz:** Konzeptuelles Korrektiv zur "time saved"-Story — ohne Zeitknappheit fehlt LLMs der Anreiz zu effizienten Abstraktionen.
- **Zitat (opt.):** "LLMs lack the virtue of laziness"

### "Constraint Decay": Bruch unter strukturellen Constraints (NEU seit Stichtag-nah)
- **Befund:** arXiv-Paper + Praktiker-Konsens: LLM-Agents schneiden bei Greenfield-Generierung gut ab, brechen aber unter architektonischen/strukturellen Constraints scharf ein; Sentiment-Shift von "du promptest falsch" zu "das Constraint-Following-Primitive fehlt".
- **Originalquelle:** "Constraint Decay: The Fragility of LLM Agents in Back End Code Generation" · 2026-05-25 · HN-Thread 269 pts/173 comments (news.ycombinator.com/item?id=48256912)
- **Fundstelle:** daily/2026/05/2026-05-25.md → HN / sentiment
- **Datum:** 2026-05-25
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert (arXiv-ID im Archiv nicht erfasst, nur HN-Verweis)
- **Art:** Gegenevidenz
- **Notiz:** Formalisiert den Brownfield-Bruch — flankiert den Stanford-Befund (greenfield vs legacy) aus Praktikersicht.

### SlopCodeBench: misst Code-Qualitäts-Erosion über lange Sessions (NEU seit Stichtag-nah)
- **Befund:** Erster Benchmark, der explizit die Code-Qualitäts-Erosion durch Agenten über lange, iterative Aufgaben misst — agent-geschriebener Code wird verbose und strukturell erodiert vs. menschliche Repos (die Drift-Lücke, die SWE-bench nicht sieht).
- **Originalquelle:** Gabriel Orlanski, Devjeet Roy, Alexander Yun, Changho Shin · 2026-03-27 · arXiv:2603.24755
- **Fundstelle:** daily/2026/03/2026-03-28.md → Papers; daily/2026/03/2026-03-27.md → Top papers; weekly/2026/2026-W13.md
- **Datum:** 2026-03-27
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Macht "Slop-Akkumulation" messbar — quantifizierbarer Beleg für Stabilitätsverlust bei Durchsatz.

### Mario Zechner "slowing the fuck down": LOC-Durchsatz ≠ Produktivität (NEU seit Stichtag-nah)
- **Befund:** Argumentiert, man habe Engineering-Disziplin gegen LOC-Durchsatz getauscht; Agenten häufen kleine "booboos" schneller an, als Menschen reviewen können → "cognitive debt". Vorschlag: tägliches KI-LOC-Limit, Architektur/APIs handschreiben.
- **Originalquelle:** Mario Zechner (HN, via Simon Willison) · 2026-03-25 · https://news.ycombinator.com/item?id=47517539
- **Fundstelle:** daily/2026/03/2026-03-25.md → Blog/HN section
- **Datum:** 2026-03-25
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Vom Schöpfer eines Coding-Agent-Tools — LOC-Durchsatz ≠ Produktivität, weil Review zum Engpass wird.
- **Zitat (opt.):** "agents accumulate small 'booboos' faster than humans can review, producing cognitive debt"

### DORA 2025-Report: AI weiterhin NEGATIV mit Delivery-Stabilität (Throughput vs Stability)
- **Befund:** Selber Report: AI-Adoption hat WEITERHIN eine NEGATIVE Beziehung zur Software-Delivery-Stabilität — schnellere, größere Changesets überfordern Pipelines und erhöhen Instabilität ohne starke Test-/Versionskontroll-/Feedback-Loops. DORA rahmt AI als "Amplifier".
- **Originalquelle:** Google Cloud / DORA · 2025-09-23 · https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report
- **Fundstelle:** Online (nicht im Archiv) — Online-Fetch Google Cloud Announcement
- **Datum:** 2025-09-23
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** confirmed (verbatim auf gefetchter Seite)
- **Art:** Gegenevidenz
- **Notiz:** Der kanonische "Produktivität rauf, Qualität/Stabilität runter"-DORA-Befund — Throughput-vs-Stability-Spannung in einem Report.
- **Zitat (opt.):** "AI adoption does continue to have a negative relationship with software delivery stability... an increase in change volume leads to instability."

### ISSRE-2025-Studie: AI-Code mehr High-Risk-Vulns, repetitiver
- **Befund:** Large-Scale-Studie (500.000+ Python/Java-Samples über ChatGPT, DeepSeek-Coder, Qwen-Coder): KI-generierter Code ist einfacher und repetitiver, enthält aber MEHR High-Risk-Security-Schwachstellen und mehr ungenutzte Konstrukte / hardcoded Debugging als menschlicher Code. (Sekundär: GitClear — Code-Duplikation stieg 8,3% (2021) → 12,3% (2024), Refactoring fiel von 25% auf <10%; nicht separat gefetcht.)
- **Originalquelle:** Cotroneo, Improta, Liguori (ISSRE 2025) · 2025-08-29 · https://arxiv.org/abs/2508.21634
- **Fundstelle:** Online (nicht im Archiv) — Online-Fetch arXiv-Abstract
- **Datum:** 2025-08-29
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** confirmed (Abstract verbatim; exakte Ratios bräuchten Full-PDF; GitClear-Zahlen sind Sekundärbericht, nicht separat gefetcht)
- **Art:** Gegenevidenz
- **Notiz:** Peer-reviewter Primärquellen-Beleg, dass Produktivität mit messbaren Security-/Maintainability-Kosten im generierten Code einhergeht — unabhängig von DORA/METR.
- **Zitat (opt.):** "AI-generated code is generally simpler and more repetitive, yet more prone to unused constructs and hardcoded debugging... also contains more high-risk security vulnerabilities"

### METR 2026 Follow-up: Produktivitätssignal unzuverlässig durch Selektionseffekte
- **Befund:** Re-Run des berühmten Experiments (Ende 2025): das Produktivitätssignal wurde durch Selektionseffekte UNZUVERLÄSSIG — für wiederkehrende Entwickler -18% Speedup (CI -38% bis +9%), für neue Entwickler -4% (CI -15% bis +9%); 30–50% der Devs reichten Tasks nicht ein, die sie nicht ohne AI machen wollten. METR redesignt die Studie (fixed-task/observational), nennt es "very weak evidence".
- **Originalquelle:** METR · 2026-02-24 · https://metr.org/blog/2026-02-24-uplift-update/
- **Fundstelle:** Online (nicht im Archiv) — Online-Fetch METR-Seite
- **Datum:** 2026-02-24
- **Status ggü. bisherigem Stand:** aktualisiert
- **Verifizierung:** confirmed (verbatim auf gefetchter Seite)
- **Art:** Gegenevidenz / Kontext
- **Notiz:** Wichtigstes 2026-Update zur Studie — die ursprüngliche +19%-Verlangsamung ist NICHT settled; CIs kreuzen jetzt Null, Selektionsbias trübt das Signal.
- **Zitat (opt.):** "the estimated speedup is -4%, with a confidence interval between -15% and +9%" (neue Devs); wiederkehrende Devs -18% (CI -38% bis +9%)

### METR RCT (Original): erfahrene OSS-Entwickler 19% LANGSAMER
- **Befund:** Randomisierte kontrollierte Studie: Zugang zu early-2025 AI-Tools machte erfahrene Open-Source-Entwickler 19% LANGSAMER, nicht schneller. Design: 16 erfahrene Devs, 246 reale Issues (~2h je) auf eigenen reifen Repos (Ø 22k+ Stars, 1M+ LOC), ~5 J. Repo-Erfahrung; AI primär Cursor Pro mit Claude 3.5/3.7 Sonnet. Konfidenzintervall +2% bis +39%.
- **Originalquelle:** METR (Joel Becker, Nate Rush, Beth Barnes, David Rein) · 2025-07-10 · https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ (Paper: arXiv:2507.09089)
- **Fundstelle:** Online (nicht im Archiv) — Online-Fetch METR-Blog + arXiv-Abstract
- **Datum:** 2025-07-10
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** confirmed (verbatim auf METR-Blog + arXiv)
- **Art:** Gegenevidenz
- **Notiz:** Die stärkste kontrollierte Gegenevidenz zum KI-Coding-Hype — ein echtes RCT (kein Selbstbericht) auf reifen Repos zeigt eine Verlangsamung, wo alle (auch die Devs selbst) eine große Beschleunigung erwarteten.
- **Zitat (opt.):** "When developers are allowed to use AI tools, they take 19% longer to complete issues"

### METR RCT: Wahrnehmungs-vs-Realitäts-Lücke (~40 Prozentpunkte)
- **Befund:** Entwickler prognostizierten, AI würde die Completion-Zeit um 24% senken, und glaubten selbst NACH der gemessenen 19%-Verlangsamung, AI hätte sie um 20% beschleunigt. Externe Experten lagen noch falscher (Ökonomen erwarteten -39%, ML-Experten -38%).
- **Originalquelle:** METR · 2025-07-10 · https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ (arXiv:2507.09089)
- **Fundstelle:** Online (nicht im Archiv) — Online-Fetch METR-Blog + arXiv-Abstract
- **Datum:** 2025-07-10
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** confirmed (verbatim auf METR-Blog + arXiv)
- **Art:** Gegenevidenz
- **Notiz:** Quantifiziert, warum anekdotische "AI macht mich schneller"-Claims unzuverlässig sind — subjektive Speedup-Schätzungen lagen ~40 Prozentpunkte neben der gemessenen Realität.
- **Zitat (opt.):** "developers expected AI to speed them up by 24%... they still believed AI had sped them up by 20%"

## Qualität/Risiken/Validierung (25)
_Quelle der Blöcke: `04-qualitaet-risiken-validierung.md`_

### Compliance-Bias / fehlende Abstention bei RLHF-Agents ("What Benchmarks Don't Measure")
- **Befund:** Paper benennt "compliance bias": RLHF-trainierte Agents tendieren strukturell dazu, weiterzumachen, auch ohne ausreichende Inputs, Evidenz oder Autorisierung; Evaluationen müssten messen, ob ein Agent überhaupt hätte handeln sollen (Abstention-Kompetenz).
- **Originalquelle:** Victor Ojewale, Suresh Venkatasubramanian · 2026-06-03 · arXiv:2606.02965
- **Fundstelle:** papers/2026/06/2026-06-03.md → Picks / weekly/2026/2026-W23.md → Notable papers
- **Datum:** 2026-06-03
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Benennt eine strukturelle RLHF-Schwäche, die Standard-Benchmarks nicht erfassen.
- **Zitat:** "agents structurally proceed even without sufficient authorization"

### Multi-Agent-Debate degradiert Generierung (Vorzeichenwechsel)
- **Befund:** Über 3 Benchmarks, 4 Modellfamilien und 6'000+ Task-Conditions degradiert Multi-Agent-Debate die Generierung um −1.6 bis −15.5 Prozentpunkte via "critique-induced confusion" (halluziniertes Kritiker-Feedback, das der Generator akzeptiert), verbessert aber die Fehlererkennung.
- **Originalquelle:** Chirag Parmar, Akshat Mehta, Henglin Wu et al. · 2026-06-03 · arXiv:2606.02866
- **Fundstelle:** papers/2026/06/2026-06-03.md → Picks / weekly/2026/2026-W23.md → Notable papers
- **Datum:** 2026-06-03
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz
- **Notiz:** Quantifizierter Beleg, dass mehr Agenten nicht automatisch besser sind; Vorzeichenwechsel je nach Task.
- **Zitat:** "debate's sign reverses … degrading generation (−1.6 to −15.5pp)"

### Empirische Studie über 110'000 PRs: Agent-Code hat höhere Churn, niedrigere Survival-Rate
- **Befund:** Empirische Studie über 110'000 Open-Source-PRs (Codex, Claude Code, Copilot, Jules, Devin): Agent-geschriebener Code zeigt höhere Code-Churn und niedrigere Survival-Rates als menschlich-geschriebener Code; Agent-Beteiligung steigt.
- **Originalquelle:** Razvan Mihai Popescu, David Gros (TU Delft) · 2026-04-04 · arXiv:2604.00917
- **Fundstelle:** papers/2026/04/2026-04-04.md → Picks / weekly/2026/2026-W14.md → Notable papers
- **Datum:** 2026-04-04
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz
- **Notiz:** Härtester empirischer Datenpunkt für die "Agent-Produktivität vs. Agent-Debt"-Debatte im Archiv; 110K-PR-Stichprobe.
- **Zitat:** "agent code has elevated churn and lower survival vs human-authored"

### CoderRabbit: AI-co-authored PRs tragen ~1.7× mehr Findings
- **Befund:** Analyse von 470 PRs (320 AI-co-authored, 150 menschlich): AI-PRs enthielten 10.83 Findings vs. 6.45 in menschlichen PRs (~1.7×); critical issues +40 % (240→341 pro 100 PRs), major issues +70 % (257→447), ~75 % mehr Logik-/Korrektheits-Findings; im 90. Perzentil 26 Issues/Change (>2× menschliche Baseline).
- **Originalquelle:** Help Net Security (über CodeRabbit-Report), "AI code looks fine until the review starts" · 2025-12-23 · helpnetsecurity.com/2025/12/23/coderabbit-ai-assisted-pull-requests-report/
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2025-12-23
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Zahlen auf der abgerufenen Seite bestätigt); newer_than_archive: false
- **Art:** Beleg / Gegenevidenz (Qualitäts-/Review-Last)
- **Notiz:** Unabhängige Korroboration, dass AI-PRs materiell mehr Defekte pro Change tragen; Skew zu Logik/Korrektheit (nicht bloss kosmetisch).
- **Zitat:** "AI pull requests contained 10.83 findings compared with 6.45 in human submissions"

### Constraint Decay: LLM-Agents brechen unter strukturellen Constraints ein
- **Befund:** arXiv-Paper zeigt, dass LLM-Agents bei Greenfield-Generierung gut abschneiden, aber unter architektonischen/strukturellen Constraints (Backend-Code) scharf einbrechen; Praktiker bestätigen die "Wand". Sentiment-Shift von "du promptest falsch" zu "das Constraint-Following-Primitive fehlt".
- **Originalquelle:** "Constraint Decay: The Fragility of LLM Agents in Back End Code Generation" · 2026-05-25 · HN-Thread 269 pts/173 comments (news.ycombinator.com/item?id=48256912)
- **Fundstelle:** daily/2026/05/2026-05-25.md → HN / sentiment
- **Datum:** 2026-05-25
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert (arXiv-ID nicht im Archiv erfasst, nur HN-Verweis)
- **Art:** Gegenevidenz
- **Notiz:** Formalisiert den Brownfield-Bruch; Praktiker (@guhcampos/@pron/@vishvananda) bestätigen.
- **Zitat:** "the constraint-following primitive is missing"

### Nolan Lawson: Produktivität durch langsamere Review-Zyklen, nicht schnelleres Tippen
- **Befund:** "Using AI to write (better) code more slowly" argumentiert, der Produktivitätsgewinn aus KI-Coding komme aus erzwungen langsameren Review-/Verifizier-Zyklen, NICHT aus schnellerem Tippen — HN 1'107–1'208 pts / 408–443 Kommentare.
- **Originalquelle:** Nolan Lawson · 2026-05-25 · nolanlawson.com/2026/05/25/using-ai-to-write-better-code-more-slowly/ (HN: news.ycombinator.com/item?id=48272984)
- **Fundstelle:** hackernews/2026/05/2026-05-27.md → Top items; daily/2026/05/2026-05-26.md → Hacker News pulse
- **Datum:** 2026-05-25
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz (Hype-Korrektur)
- **Notiz:** Praktiker-Gegenstimme zu naiven Produktivitäts-Claims; verortet den Wert im Review/Verify, nicht im Tippen.
- **Zitat:** "Productivity from AI coding comes from forcing slower review/verify cycles, not faster typing."

### curl-Maintainer Stenberg widerspricht Glasswing-Claim (90.6 % TP-Rate)
- **Befund:** Daniel Stenberg (curl) widerspricht öffentlich Anthropics Glasswing-Claim (1'752 high/critical Vulns bei 90.6 % True-Positive-Rate): kein Beleg, dass dieses Setup Probleme in höherem/fortgeschrittenerem Grad finde als andere Tools — erster credentialed OSS-Maintainer, der Anthropics Vuln-Discovery-Claims an Thread-Spitze bestreitet.
- **Originalquelle:** Daniel Stenberg (curl) via HN · 2026-05-24 · HN 537 pts/318 comments (news.ycombinator.com/item?id=48240419)
- **Fundstelle:** daily/2026/05/2026-05-24.md → Glasswing HN / weekly/2026/2026-W21.md → Sentiment
- **Datum:** 2026-05-24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz
- **Notiz:** Liefert die "90.6 % TP-Rate"-Zahl plus credentialed Pushback gegen die Marketing-Framings.
- **Zitat:** "no evidence that this setup finds issues to any … higher … degree than the other tools"

### Faithfulness-/Halluzinations-Korrektive: Attribution Blind Spot & Provenance-Role Collapse
- **Befund:** "The Attribution Blind Spot" diagnostiziert, ob ein RAG-Modell tatsächlich den abgerufenen Kontext nutzt vs. parametrisches Memory; "Provenance-Role Collapse" benennt einen Source-Monitoring-Fehler, bei dem Long-Term-Agents rohe Evidenz mit wahrheitstragenden Claims verwechseln.
- **Originalquelle:** diverse arXiv · 2026-05-23/26 · arXiv:2605.26778, arXiv:2605.25869
- **Fundstelle:** weekly/2026/2026-W23.md → Notable papers / papers/2026/05/2026-05-26.md → Other items
- **Datum:** 2026-05-26
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Eval-Gap)
- **Notiz:** Zwei benannte Failure-Modes als Evaluation-Gap-Evidenz.

### Anthropic-Postmortem: Claude-Code-Regression real, Ursache drei Harness-Bugs
- **Befund:** Anthropic bestätigt, dass "Modelle wurden schlechter"-Beschwerden real waren, Ursache aber drei separate Harness-Bugs — u.a. ein 26.-März-Bug, der gestaltes Thinking jeden Turn löschte und Claude "forgetful and repetitive" über die ganze Session machte; Reasoning-Effort fiel am 4. März still von high auf medium (revertiert 7. April).
- **Originalquelle:** Anthropic via Simon Willison / Anthropic Engineering Postmortem · 2026-04-23/24 · simonwillison.net/2026/Apr/24/recent-claude-code-quality-reports ; anthropic.com/engineering/april-23-postmortem
- **Fundstelle:** daily/2026/04/2026-04-24.md → Top stories / weekly/2026/2026-W17.md → Anthropic regression
- **Datum:** 2026-04-23/24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Stabilität/Validierung)
- **Notiz:** Konkretester "wir haben es falsch gemacht"-Frontier-Lab-Postmortem 2026; zeigt, dass Produktivitäts-Tools wochenlang still degradieren können (Harness-Bug, nicht Modell).

### "AI psychosis"-Cluster / Agent-Procurement überholt Agent-Deployability
- **Befund:** Mitchell Hashimotos These, dass "ganze Firmen" unter KI-Psychose stünden, hielt zwei Tage HN-Platz 1 (1'727→2'061 pts; 1'210 Kommentare); flankiert von Amazon-"Mitarbeiter erfinden Aufgaben, um KI-Nutzungsquoten zu erfüllen", arXiv-1-Jahr-Bann für halluzinierte Referenzen, Turso-Bug-Bounty-Rückzug wegen AI-Spam.
- **Originalquelle:** Mitchell Hashimoto via HN · 2026-05-16/17 · HN 2'061 pts/1'210 comments
- **Fundstelle:** weekly/2026/2026-W20.md → Sentiment turn / daily/2026/05/2026-05-16.md
- **Datum:** 2026-05-17
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz (Sentiment)
- **Notiz:** Grösster HN-Thread der Woche (2× Marge); Bear-Case "Procurement-outrunning-deployability" verfestigt sich.
- **Zitat:** "agent-procurement is outrunning agent-deployability"

### Sentiment-Receipts gegen KI-Coding-Optimismus (Vendor-spezifisch)
- **Befund:** Microsoft kündigt intern Claude-Code-Lizenzen trotz Entwickler-Präferenz (HN 473 pts) und pusht Copilot CLI; Claude-Preis-Fatigue ist HN-Mehrheitsmeinung; reale Token-Burn-Zahlen aus internem Trial ("voller Claude-Monatsbudget in einer Woche, Hälfte an einem Tag"); Google Antigravity-2.0 "Bait-and-Switch" (HN 733 pts).
- **Originalquelle:** The Verge/Notepad + Pragmatic Engineer via HN · 2026-05-23/24 · weekly synthesis
- **Fundstelle:** weekly/2026/2026-W21.md → Sentiment thread hardens
- **Datum:** 2026-05-24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Sentiment/Kosten)
- **Notiz:** Vendor-spezifische Receipts für den Deployability-Bear-Case; Kostenrationierung wird Mainstream.
- **Zitat:** "full Claude monthly budget in a week, half in one day"

### Claw-Eval-Live: stärkstes Modell nur 66.7 % Task-Completion
- **Befund:** Live-Agent-Benchmark: selbst mit deterministischem Grading erreicht das stärkste Modell nur 66.7 % Task-Completion auf sich entwickelnden Real-World-Workflows.
- **Originalquelle:** Chenxin Li, Zhengyang Tang · 2026-05-02 · arXiv:2604.28139
- **Fundstelle:** papers/2026/05/2026-05-02.md; daily/2026/05/2026-05-02.md → Papers
- **Datum:** 2026-05-02
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Eval-Gap)
- **Notiz:** In realistischen, sich ändernden Workflows scheitert selbst das beste Modell zu ~1/3.

### MonitorBench / "Therefore I Am. I Think": CoT als Validierungssignal fragwürdig
- **Befund:** MonitorBench zeigt, dass Monitorbarkeit scharf fällt, wenn strukturelles Reasoning nicht erforderlich ist; sowohl Open- als auch Closed-Weight-Modelle versagen. "Therefore I Am. I Think" zeigt, dass Reasoning-Modelle Tool-Call-Entscheidungen in Pre-Generation-Aktivierungen kodieren — die Chain-of-Thought kann teils Post-hoc-Rationalisierung sein.
- **Originalquelle:** MonitorBench / "Therefore I Am. I Think" · 2026-04-01 · daily research wave
- **Fundstelle:** daily/2026/04/2026-04-01.md → Research wave (synthesis)
- **Datum:** 2026-04-01
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Eval-Gap/Monitoring)
- **Notiz:** Untergräbt CoT als Validierungs-/Monitoring-Signal; relevant für "kann man Agent-Reasoning trauen?".
- **Zitat:** "monitorability drops sharply when structural reasoning isn't required"

### SlopCodeBench: erstes Benchmark für Code-Erosion über Agent-Sessions
- **Befund:** SlopCodeBench (erstes Benchmark für "slop accumulation") misst Code-Qualitätsverfall von Coding-Agents über lange iterative Sessions; agent-erzeugter Code wird zunehmend verbose und erodiert strukturell gegenüber menschlichen Repos — füllt die Drift-Lücke, die SWE-Bench (Single-Shot) nicht sieht.
- **Originalquelle:** Gabriel Orlanski, Devjeet Roy, Alexander Yun, Changho Shin · 2026-03-27 · arXiv:2603.24755
- **Fundstelle:** daily/2026/03/2026-03-27.md → Top papers / papers/2026/03/2026-03-27.md → Picks (auch daily/2026-03-28.md, weekly/2026-W13.md)
- **Datum:** 2026-03-27
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Code-Erosion)
- **Notiz:** Erstes Benchmark, das gezielt Code-Erosion über sequentielle Agent-Erweiterungen quantifiziert; Gegengewicht zu SWE-Bench-Single-Shot-Leaderboards.

### Mario Zechner: "cognitive debt" — Agenten häufen "booboos" schneller an als Review verkraftet
- **Befund:** Argumentiert, man habe Engineering-Disziplin gegen LOC-Durchsatz getauscht; Agenten häufen kleine "booboos" schneller an, als Menschen reviewen können → "cognitive debt". Vorschlag: tägliches KI-LOC-Limit, Architektur/APIs handschreiben.
- **Originalquelle:** Mario Zechner (HN, via Simon Willison) · 2026-03-25 · news.ycombinator.com/item?id=47517539
- **Fundstelle:** daily/2026/03/2026-03-25.md → Blog/HN section
- **Datum:** 2026-03-25
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Review-Bottleneck)
- **Notiz:** Vom Schöpfer eines Coding-Agent-Tools: LOC-Durchsatz ≠ Produktivität, weil Review zum Engpass wird.
- **Zitat:** "agents accumulate small 'booboos' faster than humans can review, producing cognitive debt"

### Pragmatic Engineer: "Shippers" profitieren am meisten, häufen aber Tech-Debt am schnellsten an
- **Befund:** Umfrage unter 906 Engineers/Leads (Median 11–15 J. Erfahrung): 95 % nutzen KI-Tools wöchentlich, 55 % nutzen Agenten — aber die "Shippers"-Kohorte profitiert am meisten UND häuft Tech-Debt am schnellsten an; schwächere Engineers leveln auf, produzieren aber Slop.
- **Originalquelle:** Gergely Orosz, The Pragmatic Engineer · 2026-05-21 · newsletter.pragmaticengineer.com/p/the-impact-of-ai-on-software-engineers-2026
- **Fundstelle:** blogs/2026/05/2026-05-21.md → Blog picks
- **Datum:** 2026-05-21
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz (Tech-Debt)
- **Notiz:** Empirische Momentaufnahme; nuanciert: Geschwindigkeit ja, aber Schuldenaufbau.
- **Zitat:** "The 'Shippers' cohort benefits most but adds tech debt fastest."

### Bryan Cantrill: LLMs fehlt die "Tugend der Faulheit"
- **Befund:** LLMs fehlt die "Tugend der Faulheit" — Arbeit kostet sie nichts, also häufen sie Müll auf Systeme, statt die knappen, sauberen Abstraktionen zu bauen, die Menschen zur Zeitersparnis erstellen.
- **Originalquelle:** Bryan Cantrill via Simon Willison · 2026-04-13 · jack-clark/Willison-Verweis
- **Fundstelle:** daily/2026/04/2026-04-13.md → narrative + blog picks
- **Datum:** 2026-04-13
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Architektur-/Abstraktions-Qualität)
- **Notiz:** Konzeptuelles Korrektiv zur "time saved"-Story: ohne Zeitknappheit fehlt LLMs der Anreiz zu effizienten Abstraktionen.
- **Zitat:** "LLMs lack the virtue of laziness"

### Faros AI "AI Productivity Paradox": Review-Bottleneck präzise quantifiziert
- **Befund:** High-AI-Adoption-Teams mergen 98 % mehr PRs, aber PR-Review-Zeit steigt 91 %, PR-Grösse +154 %; +9 % Bugs/Entwickler; +21 % Tasks erledigt; KEINE signifikante Korrelation zwischen AI-Adoption und Company-Level-Throughput/DORA/Quality-Verbesserungen.
- **Originalquelle:** Faros AI, "The AI Productivity Paradox" · 2025-07-23 · faros.ai/blog/ai-software-engineering
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2025-07-23
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Telemetrie von 10'000+ Devs über 1'255 Teams; Werte auf der abgerufenen Seite bestätigt); newer_than_archive: false
- **Art:** Beleg / Gegenevidenz (Review-Bottleneck)
- **Notiz:** Sauberste primäre Quantifizierung der Review-Bottleneck-These: AI verschiebt den Constraint von Generierung zu Review; individueller Output steigt, Company-Level-Durchsatz nicht.
- **Zitat:** "Teams with high AI adoption merge 98% more pull requests [but] PR review time increases 91% ... no significant correlation between AI adoption and improvements at the company level."

### 2024 DORA (Google): 25 % mehr AI-Adoption → −1.5 % Throughput, −7.2 % Stabilität
- **Befund:** Ein 25 %-Anstieg der AI-Adoption war mit einer geschätzten Abnahme des Delivery-Throughput um 1.5 % und einer Abnahme der Delivery-Stabilität um 7.2 % assoziiert.
- **Originalquelle:** Google Cloud, "Announcing the 2024 DORA report" (Accelerate State of DevOps 2024) · 2024-10-23 · cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2024-10-23
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (exaktes Zitat auf der abgerufenen Google-Cloud-Seite bestätigt); newer_than_archive: false
- **Art:** Gegenevidenz (Delivery-Stabilität)
- **Notiz:** Grosse, rigorose Evidenz, dass AI-Adoption Delivery-Stabilität/Throughput downstream beeinträchtigen kann, auch wenn individuelle Produktivität steigt. Siehe 2025-DORA-Korrektur unten.
- **Zitat:** "As AI adoption increased, it was accompanied by an estimated decrease in delivery throughput by 1.5%, and an estimated reduction in delivery stability by 7.2%."

### COUNTER: 2025 DORA — Throughput-Befund teilweise umgekehrt, Stabilität bleibt negativ
- **Befund:** Anders als 2024 fand der 2025-DORA-Report eine POSITIVE Beziehung zwischen AI-Adoption und Software-Delivery-Throughput (sowie Product Performance); AI-Adoption korreliert jedoch weiter NEGATIV mit Delivery-Stabilität.
- **Originalquelle:** Google Cloud, "Announcing the 2025 DORA Report" (State of AI-assisted Software Development) · 2025-09 · cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2025-09
- **Status ggü. bisherigem Stand:** widerspricht (dem 2024-DORA-Throughput-Befund)
- **Verifizierung:** nicht einzeln verifiziert (per WebSearch erfasst; Empfehlung der Quelle: Primärseite fetchen, um exakten Stabilitäts-Koeffizienten vor wörtlichem Zitat zu fixieren); newer_than_archive: false
- **Art:** Gegenevidenz / Einschränkung
- **Notiz:** Throughput-Drag von 2024 war nicht permanent; das Stabilitäts-Risiko bestand über beide Jahre.
- **Zitat:** "Unlike the previous year, the 2025 report observes a positive relationship between AI adoption on both software delivery throughput and product performance. However, AI adoption continues to have a negative relationship with software delivery stability."

### Forecasting Research Institute: nur ~1 Prozentpunkt zusätzliches BIP bis 2030
- **Befund:** Umfrage (69 Ökonomen, 52 Branchenexperten, 401 Laien) erwartet rapiden KI-Fortschritt, aber nur ~1 Prozentpunkt zusätzliches BIP bis 2030 — ein "genuine puzzle" (Produktivitätsparadox makro).
- **Originalquelle:** Forecasting Research Institute · 2026-04-06 (via Jack Clark Import AI 452) · jack-clark.net
- **Fundstelle:** daily/2026/04/2026-04-06.md → Lead narrative
- **Datum:** 2026-04-06
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz (Makro-Produktivitätsparadox)
- **Notiz:** Makro-Kontrapunkt zum Mikro-Produktivitäts-Hype: Experten sehen kaum BIP-Effekt.

### Guido Greber "Die KI-Illusion" (Digital Gipfel Schweiz 2026): 88 % nutzen KI, 41 % CEOs ohne ROI
- **Befund:** ~88 % der Schweizer Firmen nutzen KI, aber 41 % der CEOs berichten KEINEN ROI — echte Produktivität entsteht erst durch Workflow-Redesign, nicht durch das Aufschnallen von Copilot ("Elektrizitäts-Paradox").
- **Originalquelle:** Guido Greber, "Die KI-Illusion" (Digital Gipfel Schweiz 2026, Andermatt) (de) · 2026-05-30 / 2026-06-01 · de.linkedin.com/pulse/die-ki-illusion-...-guido-greber-8rxhe
- **Fundstelle:** daily/2026/05/2026-05-30.md → LinkedIn pulse; weekly/2026/2026-W23.md → Swiss reality check; linkedin/2026/06/2026-06-01.md
- **Datum:** 2026-05-30
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz (CH-spezifische ROI-Realität)
- **Notiz:** Adoption hoch, Produktivität/ROI aber nicht — Workflow-Redesign statt Copilot-Aufsatz; direkt CH-bezogen.

### ClawBench: SOTA nur 33.3 % auf 153 Produktiv-Website-Tasks
- **Befund:** Real-world agentic Eval (153 Aufgaben über 144 Produktiv-Websites) setzt den SOTA-Wert auf nur 33.3 % (Claude Sonnet 4.6 als Bester) — Sandbox-Benchmarks erzählen eine optimistischere Story als die Produktionszuverlässigkeit hergibt.
- **Originalquelle:** ClawBench / Air Street "State of AI May 2026" · 2026-05-05 · press.airstreet.com/p/state-of-ai-may-2026
- **Fundstelle:** daily/2026/05/2026-05-05.md → day-in-90s / Major news
- **Datum:** 2026-05-05
- **Status ggü. bisherigem Stand:** widerspricht ("Agenten sind reif")
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Benchmark vs. Produktion)
- **Notiz:** Wichtige Gegenevidenz gegen "autonome Agenten sind reif"; der Boden ist deutlich niedriger als das Marketing.
- **Zitat:** "Claude Sonnet 4.6 best at only 33.3% across 153 production-website tasks"

### McKinsey "State of AI Trust 2026": Responsible-AI-Reife nur 2.3/4
- **Befund:** ~500 Unternehmen: durchschnittliche Responsible-AI-Reife nur 2.3/4 (von 2.0 ein Jahr zuvor); nur ~ein Drittel erreichen Level-3 in Strategie, Governance oder Agentic-AI-Kontrollen — die Agentic-Governance-Lücke wird explizit als wachsend bezeichnet.
- **Originalquelle:** McKinsey, "State of AI trust in 2026: shifting to the agentic era" · 2026-03-25 · mckinsey.com/capabilities/tech-and-ai/our-insights/tech-forward/state-of-ai-trust-in-2026-shifting-to-the-agentic-era
- **Fundstelle:** daily/2026/03/2026-03-25.md → Top-5 / Major news
- **Datum:** 2026-03-25
- **Status ggü. bisherigem Stand:** widerspricht (Reifegrad-Optimismus)
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Governance-Reife)
- **Notiz:** Tempert den Reifegrad-Optimismus; die Reifegrad-Zahl, die laut Quelle in CISO/CAIO-Board-Decks landet.
- **Zitat:** "Average RAI maturity 2.3 (from 2.0); only ~one-third hit level-3"

### Uber-Präsident: KI-Ausgaben "harder to justify"
- **Befund:** Uber-Präsident nennt KI-Ausgaben öffentlich "harder to justify" (HN 230–298 pts) — Top-20-Enterprise-Kunde stellt GenAI-ROI infrage; Begleit-Thread mit Subscription-vs-API-Kostengap von 10-40×.
- **Originalquelle:** Hacker News · 2026-05-26/27 · news.ycombinator.com/item?id=48277485
- **Fundstelle:** daily/2026/05/2026-05-26.md → Hacker News pulse; daily/2026/05/2026-05-27.md
- **Datum:** 2026-05-26
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (ROI-Skepsis)
- **Notiz:** Grosskunde hinterfragt ROI öffentlich; Diskurs verschiebt sich von "funktioniert es" zu "ist es das wert".
- **Zitat:** "AI spending is getting 'harder to justify'"

## Security & Patch-Tempo (9)
_Quelle der Blöcke: `06-security-patch-tempo.md`_

### Glasswing-Remediation-Lücke: ~6 % Patch-Rate trotz industrieller Discovery (CSA Labs)
- **Befund:** Cloud Security Alliance Labs analysierte Project Glasswing/Mythos: in seinem ersten Monat ~23.019 Vulns total (6.202 high/critical), 1.726 als True-Positives validiert, 1.094 als high/critical bestätigt. Von 1.596 an 281 OSS-Projekte offengelegten Findings waren per Mai 2026 nur 97 gepatcht — ~6 % Remediation-Rate. Claude Mythos Preview erreichte 83,1 % auf dem CyberGym-Reproduktions-Benchmark.
- **Originalquelle:** Cloud Security Alliance Labs — "Project Glasswing and the AI Vulnerability Disclosure Velocity Crisis" · 2026 (post-Apr) · https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-vuln-discovery-velocity-disclosure-cris/
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2026 (post-April, Daten bis Mai 2026); Glasswing-Launch 2026-04-07
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert (CSA near-primary, zitiert Anthropics eigene Disclosures); newer_than_archive
- **Art:** Beleg + Gegenevidenz (Discovery-Skala vs. Patch-Rate)
- **Notiz:** Quantifiziert direkt die Discovery-vs-Patch-Lücke: industrielle Fund-Skala (10k+/Monat, 83,1 % CyberGym) trifft auf ~6 % menschliche Behebungsrate.
- **Zitat:** "approximately 23,019 total vulnerabilities including 6,202 rated high or critical severity... 1,596 vetted findings to maintainers of 281 open-source projects, of which 97 had been patched... 83.1 percent success rate on the CyberGym ... benchmark"

### curl-Maintainer Stenberg widerspricht Glasswing-Claims öffentlich
- **Befund:** curl-Maintainer Daniel Stenberg widersprach öffentlich Anthropics Glasswing-Update (1.752 H/C-Vulns bei 90,6 % TP): keine Evidenz, dass dieses Setup Issues in höherem/fortgeschrittenerem Grad findet als andere Tools — erstmals contestiert ein zertifizierter OSS-Maintainer Anthropics Vuln-Discovery-Claims an der Spitze eines HN-Threads.
- **Originalquelle:** Daniel Stenberg, HN 537 pts · 2026-05-24 · https://news.ycombinator.com/item?id=48240419
- **Fundstelle:** daily/2026/05/2026-05-24.md → HN pulse; weekly/2026/2026-W21.md
- **Datum:** 2026-05-24
- **Status ggü. bisherigem Stand:** widerspricht
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Relativiert die Glasswing-Zahlen aus Maintainer-Sicht; der Mythos-Glaubwürdigkeits-Halo beeinflusst, wie benachbarte Claims gelesen werden.
- **Zitat:** "no evidence that this setup finds issues to any particular higher or more advanced degree than the other tools"

### curl-Maintainer: AI-Reports im Volumen, das Reviewer nicht absorbieren können
- **Befund:** curl-Maintainer melden, dass AI-assisted Security-Reports in einem Volumen eintreffen, das freiwillige Reviewer nicht absorbieren können — die atomare Instanz der Glasswing-Erkenntnis "patch capacity is the bottleneck".
- **Originalquelle:** Simon Willison, "The pressure" · 2026-05-26 · https://simonwillison.net/2026/May/26/the-pressure/
- **Fundstelle:** daily/2026/05/2026-05-27.md → Best blog reads; weekly/2026/2026-W22.md
- **Datum:** 2026-05-26
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Zeigt die Schattenseite: KI erzeugt Security-Report-Volumen, das Maintainer schlucken müssen — MTTR/Patch-Kapazität als bindende Grenze.
- **Zitat:** "AI-assisted security reports at a volume volunteers can't absorb"

### Claw-Eval-Live: bestes Modell nur 66,7 % auf realen Workflows (allg. Agent-Limit)
- **Befund:** Claw-Eval-Live (Live-Agent-Benchmark): selbst mit deterministischem Grading erreicht das stärkste Modell nur 66,7 % Task-Completion auf sich entwickelnden Real-World-Workflows.
- **Originalquelle:** Chenxin Li, Zhengyang Tang · 2026-05-02 · arXiv:2604.28139
- **Fundstelle:** papers/2026/05/2026-05-02.md; daily/2026/05/2026-05-02.md → Papers
- **Datum:** 2026-05-02
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz / Kontext
- **Notiz:** Allgemeines Agent-Reliability-Limit auf realistischen Workflows; relativiert Hype um autonome Remediation.

### UK AISI: GPT-5.5 mit Mythos-vergleichbaren Cyber-Fähigkeiten — aber allgemein verfügbar
- **Befund:** UK AISI fand am 30. April, dass GPT-5.5 Cyber-Fähigkeiten vergleichbar mit Mythos hat — aber, anders als Mythos, allgemein verfügbar für jeden mit Developer-Key; die Gating-Prämisse bricht damit innerhalb von Wochen.
- **Originalquelle:** UK AISI via Simon Willison · 2026-04-30 · https://simonwillison.net/2026/Apr/30/gpt-55-cyber-capabilities/
- **Fundstelle:** daily/2026/04/2026-04-30.md → Top stories (AISI/GPT-5.5)
- **Datum:** 2026-04-30
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz / Kontext
- **Notiz:** Bricht die Gating-Prämisse, die Mythos Previews Restricted Access einen Monat zuvor rechtfertigte.
- **Zitat:** "GPT-5.5 cyber capabilities comparable to Mythos — but generally available to the public"

### Cyber Defense Benchmark: Claude Opus 4.6 markiert nur 3,8 % bösartiger Events (Recall-Realitätscheck)
- **Befund:** Cyber Defense Benchmark (Agentic Threat Hunting Evaluation for LLMs in SecOps): über 106 reale Angriffsprozeduren × 86 MITRE-ATT&CK-Subtechniken markiert selbst Claude Opus 4.6 im Schnitt nur 3,8 % der bösartigen Ereignisse.
- **Originalquelle:** Chona, Kozlov · 2026-04 · arXiv:2604.19533
- **Fundstelle:** weekly/2026/2026-W16.md → Top papers; daily/2026/04/2026-04-19.md
- **Datum:** 2026-04-19
- **Status ggü. bisherigem Stand:** widerspricht
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Scharfer Recall-Realitätscheck auf der Defensive-/Threat-Hunting-Seite — relativiert das "Defenders win"-Narrativ.
- **Zitat:** "Claude Opus 4.6 flags only 3.8% of malicious events on average"

### Empirie-Paper: AI-Agent-Code auf 110K OSS-PRs — höherer Churn, niedrigere Survival-Rate
- **Befund:** AI-Coding-Agenten auf 110K OSS-PRs (Codex/Claude Code/Copilot/Jules/Devin) zeigen höhere PR-Aktivität, aber erhöhten Code-Churn und niedrigere Survival-Raten vs. menschlich-authored Code.
- **Originalquelle:** Investigating Autonomous Agent Contributions in the Wild (Popescu, Gros, TU Delft) · 2026-04-04 · arXiv:2604.00917
- **Fundstelle:** weekly/2026/2026-W14.md → Top papers; papers/2026/04/2026-04-04.md
- **Datum:** 2026-04-04 (im Primär-Set auch als 2026-04-03 geführt)
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz
- **Notiz:** Konkreter Datenpunkt für die agent-productivity-vs-agent-debt-Debatte; relevant für "security risk of AI code".
- **Zitat:** "elevated code-churn and lower survival rates vs human-authored code"

### CyberGym (UC Berkeley, Dawn Song): 1.507-Vuln-Benchmark, ~20 % Best-Agent-Baseline
- **Befund:** CyberGym ist ein 1.507-Real-World-Vulnerability-Benchmark über 188 OSS-Projekte (aus Google OSS-Fuzz). In v1 (eingereicht 2025-06-03) reproduzierten die besten AI-Agent-Kombinationen nur ~20 % der Vulns, brachten aber 34 neue Zero-Days und 18 historisch unvollständige Patches hervor. Das Paper wurde am 2026-03-24 substanziell überarbeitet.
- **Originalquelle:** arXiv:2506.02548 — "CyberGym: Evaluating AI Agents' Real-World Cybersecurity Capabilities at Scale" · eingereicht 2025-06-03, v-update 2026-03-24 · https://arxiv.org/abs/2506.02548
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2026-03-24 (Major-Revision); v1 2025-06-03
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** nicht einzeln verifiziert (akademische Primärquelle); newer_than_archive
- **Art:** Gegenevidenz / Beleg (Benchmark-Baseline)
- **Notiz:** Named Benchmark, auf dem Mythos 83,1 % meldete; der ~20-%-Best-Agent-Baseline (vs. Mythos 83,1 %) zeigt den Fähigkeitszuwachs in unter einem Jahr; 34 Zero-Days belegen reale Funde aus Benchmark-Läufen.
- **Zitat:** "1,507 real-world vulnerabilities across 188 software projects... top-performing combinations only achieve a ~20% success rate... discovery of 34 zero-day vulnerabilities and 18 historically incomplete patches"

### CISA KEV: 1.484 aktiv ausgenutzte Flaws Ende 2025; Synack MTTR 63 → 38 Tage
- **Befund:** CISAs KEV-Catalog schloss 2025 mit 1.484 aktiv ausgenutzten Flaws; 245 wurden 2025 hinzugefügt (~20 % Wachstum, >30 % über dem 185–187/Jahr-Trend von 2023–2024). Microsoft führte mit 39 Additions (von 36 in 2024). Synacks 2026-Report fand zugleich, dass die durchschnittliche MTTR von 63 auf 38 Tage fiel (−47 %), während RCE-Findings 39 % YoY stiegen — Verteidiger werden schneller, doch Exploitation (Stunden) überholt Patching (Wochen) weiterhin deutlich.
- **Originalquelle:** The Cyber Express — "CISA Known Exploited Vulnerabilities (KEV) Soared 20% In 2025" · 2026 · https://thecyberexpress.com/cisa-known-exploited-vulnerabilities-kev-2025/ ; Kiteworks/Synack 2026 report · https://www.kiteworks.com/cybersecurity-risk-management/synack-2026-exploit-window-report/
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2026-01 (Analyse); KEV-Counts Jahresende 2025
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** nicht einzeln verifiziert (KEV-Counts pre-cutoff; Synack zitiert 2025-CVEs 48.244, +20 % YoY)
- **Art:** Beleg + Gegenevidenz (63→38 Tage zeigt Verbesserung)
- **Notiz:** KEV-Stats quantifizieren das steigende Volumen bestätigter In-the-Wild-Exploitation; der MTTR-Rückgang ist ein positiver Trend-Gegenpunkt zum Doom-Framing.
- **Zitat:** "ended 2025 with 1,484 software and hardware flaws... 245 vulnerabilities were added... a roughly 20% growth rate... Average MTTR dropped from 63 days to 38 days"

## Ökonomie/Kosten/ROI (16)
_Quelle der Blöcke: `03-oekonomie-kosten-roi.md`_

### Anthropic trennt programmatische Nutzung in eigenen Credit-Pool (volle API-Raten ab 15. Juni)
- **Befund:** Anthropic trennt programmatische Claude-Nutzung (SDKs, CLIs, Drittanbieter-Tools, Agent SDK) ab 15. Juni in einen eigenen Monats-Credit-Pool: Pro $20, Max 5× $100, Max 20× $200 — abgerechnet zu vollen API-Raten; interaktive Claude-Code-Nutzung unverändert. Unabhängige Workload-Analysen beziffern die effektive Preiserhöhung je nach Agentic-Loop-Muster auf das 12- bis 175-fache; Cursor, Cline, Aider, Continue am stärksten exponiert.
- **Originalquelle:** the-decoder.com · 2026-05-14 · https://the-decoder.com/claude-subscriptions-get-separate-budgets-for-programmatic-use-billed-at-full-api-prices/ (Workload-Analyse 2026-05-26)
- **Fundstelle:** daily/2026/05/2026-05-14.md (Zeile 214); news/2026/05/2026-05-14.md; daily/2026/05/2026-05-26.md → day-in-90s (12-175×)
- **Datum:** 2026-05-14 (Ankündigung), wirksam 2026-06-15
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Billing-Split); 12-175×-Spanne: nicht einzeln verifiziert (unabhängige Workload-Analyse, Einzelquelle)
- **Art:** Beleg (Pricing-Shift) / teils Gegenevidenz (Kostenexplosion bei agentischen Loops)
- **Notiz:** Lago-CEO nennt es Ende des "15-30× Mensch-am-Keyboard-Subventions"-Modells.
- **Zitat:** "human at keyboard was a hidden 15–30× subsidy that doesn't survive agents"

### Salesforce First-Party-ROI: gesamte Engineering-Org auf Claude Code (vendor-eigen, unauditiert)
- **Befund:** Salesforce verlegte seine gesamte Engineering-Org auf Claude Code (unbegrenzte Token) und meldete +79% PRs/Entwickler, ~5% weniger Incidents, +50,8% YoY Work-Items und eine 33-Endpoint-API-Migration von geschätzt 231 Personentagen in 13 erledigt (~18×) — größte First-Party-Coding-ROI-Zahl bisher.
- **Originalquelle:** Salesforce (Eigenangaben) · ~2026-05-28 · https://www.salesforce.com/news/stories/how-engineering-became-agentic/
- **Fundstelle:** weekly/2026/2026-W22.md → Enterprise agent revenue / first hard ROI number; monthly/2026/2026-05.md; daily/2026/05/2026-05-30.md (Zeile 14)
- **Datum:** 2026-05-28
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Wortlaut), aber ausdrücklich vendor-eigene, nicht unabhängig geprüfte Zahlen ("vendor's own figures, unaudited")
- **Art:** Beleg (ROI) — mit Gegenevidenz-naher Qualifizierung (unauditiert; ~5% weniger Incidents ist gering)
- **Notiz:** Stärkste First-Party-ROI-Zahl, aber mit Vorsicht zu zitieren.
- **Zitat:** "+79% PRs/developer ... 33-endpoint API migration estimated at 231 person-days finished in 13 (~18×)"

### NVIDIA-CFO: zwei Generationen alte GPUs werten auf (H100-Mieten +20% YoY) — strukturelle Knappheit
- **Befund:** NVIDIA-CFO offenbarte (W22), dass zwei Generationen alte GPUs aufwerten (H100-Mieten +20% YoY) — Signal, dass das Inferenz-Angebot strukturell knapp ist. NVIDIA committete $150 Mrd./Jahr in Taiwan (10-15× vorherige Baseline).
- **Originalquelle:** NVIDIA CFO / Jensen Huang · ~2026-05-26 (W22)
- **Fundstelle:** weekly/2026/2026-W22.md → Geopolitics and physics
- **Datum:** 2026-05-26
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (zur "Compute-Kosten fallen schnell"-Erwartung)
- **Notiz:** Aufwertende Alt-GPUs widersprechen der naiven Erwartung fallender Compute-Kosten; strukturelle Knappheit hält Preise hoch.
- **Zitat:** "two-generation-old GPUs are appreciating (H100 rentals +20% YoY)"

### DeepSeek V4 Pro: 75%-Promo-Rabatt permanent; Cache-Hit-Pricing fällt auf 1/10
- **Befund:** DeepSeek machte den 75%-Promo-Rabatt von V4 Pro permanent (Cache-Hit-Pricing fällt auf 1/10 des Launch-Preises über alle Modelle; ~$0,32 Input/M). DeepSeek V4 Flash $0,14/$0,28 und V4 Pro $0,145/$3,48 pro Mio. — unterbieten Gemini/GPT/Claude am günstigen Ende um ~10×.
- **Originalquelle:** DeepSeek / Reporting · 2026-05-24 (permanent); 2026-04-24 (V4-Preise) · HN 460 pts
- **Fundstelle:** weekly/2026/2026-W21.md → DeepSeek V4 Pro; daily/2026/04/2026-04-24.md (Zeile 21)
- **Datum:** 2026-05-24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Preisdruck auf Frontier-Pricing-Power) / Beleg (Token-Preisverfall)
- **Notiz:** Setzt das offene Kosten-Ceiling, das die Pricing-Power der Frontier-Labs strukturell unter Druck setzt.
- **Zitat:** "cache-hit pricing drops to 1/10 launch price across all models"

### Goldman Sachs Research: Token-Verbrauch ×24 bis 2030 (120 Billiarden/Monat) — "margin inflection"
- **Befund:** Globaler Token-Verbrauch steigt bis 2030 um das 24-fache auf 120 Billiarden (quadrillion) Tokens/Monat; "margin inflection" für AI-Anbieter, da Rechenkosten sinken während Adoption steigt. 12% der Wissensarbeiter nutzen 2030 agentische AI (37% bis 2040).
- **Originalquelle:** PYMNTS (zitiert Goldman Sachs Research, Jim Schneider) · 2026-05-24 · https://www.pymnts.com/artificial-intelligence-2/2026/goldman-sachs-predicts-ai-agents-will-increase-tech-cash-flow/
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2026-05-24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert (Sekundärquelle PYMNTS zitiert Goldman Sachs; Goldman-Primärseite wegen Bot-Schutz nicht abrufbar; Zahlen auf gefetchter PYMNTS-Seite verifiziert)
- **Art:** Gegenevidenz (Volumeneffekt) / Kontext
- **Notiz:** Zentrale ökonomische Nuance: trotz 10×-billigerer Tokens steigt die Gesamt-AI-Rechnung durch Volumen.
- **Zitat:** "24-fold increase in global token consumption by 2030, reaching 120 quadrillion tokens processed per month ... a period of 'margin inflection'"

### Hitechies/Pragmatic Engineer: ~$200/Monat/Entwickler, ~30% erreichen Limits, ROI selten beziffert
- **Befund:** Tatsächlicher Enterprise-Per-Developer-Spend liegt 2026 oft bei ~$200/Monat (Inline-Tools $20-60, agentische "Max"-Pläne $100-200+); ~30% der Entwickler erreichen monatliche Nutzungslimits, ~15% nennen AI-Toolkosten ein ernstes Dauerproblem — und kaum jemand kann den ROI beziffern.
- **Originalquelle:** Hitechies (basierend auf The Pragmatic Engineer Survey, April 2026, >900 Engineers) · 2026-05-22 · https://www.hitechies.com/ai-developer-tools-cost-roi-budget-2026/
- **Fundstelle:** Online (nicht im Archiv); Bezug zu Pragmatic-Engineer-Umfrage auch in daily/2026/05/2026-05-05.md
- **Datum:** 2026-05-22
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert (Sekundärquelle, beruft sich auf Pragmatic-Engineer-Umfrage April 2026)
- **Art:** Gegenevidenz (unklarer ROI trotz hoher Ausgaben) / Beleg (reale Per-Seat-Zahlen)
- **Notiz:** Reale, umfragebasierte Spend-Zahlen statt Vendor-Listenpreise; "kaum jemand kann ROI erklären".
- **Zitat:** "Companies are spending $200 a month per developer on AI tools. Very few can explain what they're getting for it ... 30% ... had already hit usage limits"

### Google I/O: Flash 3.5 wird teurer als Vorgänger (3× Flash 3.0, 6× 3.1 Flash-Lite)
- **Befund:** Flash 3.5 ships zu 3× dem Preis von 3.0 Flash und 6× 3.1 Flash-Lite ($1,50/$9 pro Mio. Token) — erstes Mal, dass ein Flash-Tier-Modell über Generationen hinweg teurer wird; löste HN-"Margen-Schock" aus.
- **Originalquelle:** Google I/O 2026 / Hacker News (@GodelNumbering) · 2026-05-21 (W21)
- **Fundstelle:** weekly/2026/2026-W21.md → Google I/O / Flash 3.5 price hike
- **Datum:** 2026-05-21
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (zur "Token-Preise fallen monoton"-These)
- **Notiz:** Erstes günstiges Tier-Modell, das über Generationen teurer wird.
- **Zitat:** "Flash 3.5 ships at 3× the price of 3.0 Flash / 6× 3.1 Flash-Lite"

### Databricks "Advisor-Model": kostengetriebenes Modell-Routing als Enterprise-Standard
- **Befund:** Databricks-CEO Ali Ghodsi benennt die dominante "Advisor-Model"-Architektur: Enterprises nutzen günstige Open-Source-/chinesische Modelle als Default und eskalieren nur für ungelöste Tasks zu OpenAI/Anthropic. Artificial-Analysis-Benchmark eines 10-Eval-Workloads: $4.811 Claude · $3.357 ChatGPT · $1.071 DeepSeek · $948 Kimi · $544 Zhipu GLM (Claude ~9× teuerste). OpenRouter-Anteil chinesischer Modelle ~1% (2024) → >60% (Mai 2026).
- **Originalquelle:** CNBC, "Cheap AI could derail OpenAI and Anthropic's IPOs" / Artificial Analysis · 2026-05-20 · https://www.cnbc.com/2026/05/20/cheap-ai-could-derail-openai-and-anthropics-ipos.html
- **Fundstelle:** news/2026/05/2026-05-22.md (Zeile 19); weekly/2026/2026-W21.md
- **Datum:** 2026-05-20
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg (Modell-Routing-Ersparnis) / Gegenevidenz (zur Premium-Pricing-These)
- **Notiz:** Kostengetriebenes Modell-Routing als Enterprise-Standardpattern, nicht Ausnahme.
- **Zitat:** "$4,811 Claude ... $544 Zhipu GLM (Claude ~9× the cheapest)"

### Anthropic-Policy-Paper + CNBC: US-Modelle nur "several months ahead", Beijing gewinnt bei Kosten
- **Befund:** Anthropic räumte im Mai-Policy-Paper ein, dass US-Modelle nur "several months ahead" der chinesischen seien und Beijing "winning in global adoption on cost". CNBC warnt, dass billige AI die $800 Mrd.+ IPO-Bewertungen entgleisen könnte, da diese nachhaltige Premium-Preismacht voraussetzen.
- **Originalquelle:** Anthropic Mai-Policy-Paper / CNBC · 2026-05-20 · https://www.cnbc.com/2026/05/20/cheap-ai-could-derail-openai-and-anthropics-ipos.html
- **Fundstelle:** weekly/2026/2026-W21.md → Chinese-model cost story; daily/2026/05/2026-05-22.md
- **Datum:** 2026-05-20
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Lab bestätigt selbst Kosten-Nachteil; Spannung mit IPO-Premium-These)
- **Notiz:** Direkte Spannung zwischen Premium-Pricing-These und eingeräumtem Kosten-Nachteil.
- **Zitat:** "US models are only 'several months ahead' ... Beijing is 'winning in global adoption on cost'"

### HN-Cluster "AI psychosis": Top-down-Token-Spend-Mandate ($300/Tag-Quoten)
- **Befund:** HN-"AI psychosis"-Thread (Hashimoto, 2.061 Punkte/1.210 Kommentare): jede Top-Subtree beschreibt Top-down-Token-Spend-Mandate — FAANG $300/Tag-pro-Engineer-Quoten, AWS-Reps, die Opus-Spend auf Sales-Calls vorführen, CFOs, die "vibe-coden", um mit Rivalen mitzuhalten.
- **Originalquelle:** Mitchell Hashimoto (Tweet) via Hacker News · 2026-05-17 · https://news.ycombinator.com/item?id=48153379
- **Fundstelle:** daily/2026/05/2026-05-17.md (Zeile 25/101); weekly/2026/2026-W20.md → sentiment turn
- **Datum:** 2026-05-17
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Token-Ausgaben als KPI/Mandat ohne klaren Produktivitätsnutzen)
- **Notiz:** "Beschaffung läuft der Einsetzbarkeit davon."
- **Zitat:** "$300/day per-engineer Claude token quota"

### Amazon-Mitarbeiter erfinden Aufgaben, um AI-Nutzungsquoten zu erfüllen
- **Befund:** Amazon-Mitarbeiter erfinden unter Druck Aufgaben, um auferlegte AI-Nutzungsquoten zu erfüllen (HN 370 Punkte); AWS-Engineer zeigte in einer Tooling-Präsentation den Opus-Token-Spend auf dem Bildschirm — eine "offensiv große Zahl".
- **Originalquelle:** Fast Company via Hacker News · 2026-05-18 · https://news.ycombinator.com/item?id=48148337
- **Fundstelle:** daily/2026/05/2026-05-18.md (Zeile 130); hackernews/2026/05/2026-05-18.md
- **Datum:** 2026-05-18
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz ("Use-more-AI"-Mandate erzeugen messbaren, aber wertlosen Token-Burn)
- **Notiz:** Interne Kultur belohnt Ausgaben, nicht Output.
- **Zitat:** "AWS engineer ... flexed Opus token spend on screen — 'offensively large number'"

### Uber-Präsident: AI-Ausgaben "harder to justify"; Subscription-vs-API-Kostengap 10-40×
- **Befund:** Uber-Präsident nennt AI-Ausgaben öffentlich "harder to justify" (HN 298 Punkte) — Top-20-Enterprise-Kunde stellt ROI in Frage; paart mit Outsourcing+Local-AI-Thread (309 Punkte, Subscription-vs-API-Kostengap 10-40×) und AI-Fatigue-Essay zur gleichen Skepsis-Narrative.
- **Originalquelle:** Hacker News · 2026-05-27 · https://news.ycombinator.com/item?id=48277485
- **Fundstelle:** daily/2026/05/2026-05-27.md (Zeile 99); hackernews/2026/05/2026-05-27.md
- **Datum:** 2026-05-27
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Großkunde hinterfragt ROI öffentlich)
- **Notiz:** Bemerkenswerter Subscription-vs-API-Kostengap von 10-40× im Begleit-Thread.
- **Zitat:** "Uber president says AI spending is 'harder to justify'"

### GPT-5.5: Rate-Card verdoppelt (Input $2,50→$5, Output $15→$30 pro Mio.)
- **Befund:** GPT-5.5 (23. April) verdoppelte das Rate Card: Input $2,50→$5,00, Output $15→$30 pro Mio. Token (GPT-5.5 Pro bleibt $30/$180). Aggressivste OpenAI-Preisbewegung seit zwei Jahren, agent-first positioniert.
- **Originalquelle:** OpenAI · 2026-04-23 · System Card / API GA
- **Fundstelle:** weekly/2026/2026-W17.md → GPT-5.5 + dual-pricing reset; monthly/2026/2026-04.md
- **Datum:** 2026-04-23
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Preiserhöhung am Frontier-Ende) / Kontext
- **Notiz:** Erster Frontier-Lab-Preis, der API- und ChatGPT-Evaluationen getrennt gated.
- **Zitat:** "input doubled $2.50→$5.00, output doubled $15→$30 per 1M"

### GitHub Copilot pausierte Individual-Signups; Opus 4.7 auf $39 Pro+ beschränkt
- **Befund:** GitHub Copilot pausierte am 22. April Individual-Signups und beschränkte Opus 4.7 auf den $39 Pro+ Tier mit der Begründung, dass "long-running, parallelized sessions" weit mehr Ressourcen verbrauchen als die Plan-Struktur vorsah — Per-Request-Bundling brach unter agentischen Workloads.
- **Originalquelle:** GitHub (via Simon Willison) · 2026-04-22 · https://simonwillison.net/2026/Apr/22/changes-to-github-copilot/
- **Fundstelle:** daily/2026/04/2026-04-22.md (Zeile 108); weekly/2026/2026-W17.md
- **Datum:** 2026-04-22
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz / Beleg (agentische Workloads sprengen Per-Seat-/Per-Request-Bundles)
- **Notiz:** Frühwarnsignal vor dem Juni-AI-Credits-Wechsel.
- **Zitat:** "long-running, parallelized sessions consume far more resources than the original plan structure was built to support"

### Pragmatic Engineer: Token-Spend hat Capability-Skepsis als bindende Einschränkung verdrängt
- **Befund:** Pragmatic-Engineer-Umfrage unter 1.000+ Engineers: Token-Spend hat Capability-Skepsis als bindende Einschränkung von AI-Tooling verdrängt; Kostenkontrolle ist nun eine Engineering-Disziplin ("how do we make every token count").
- **Originalquelle:** Gergely Orosz, Pragmatic Engineer, "AI Tooling 2026" · 2026-05-05 · https://newsletter.pragmaticengineer.com/p/ai-tooling-2026
- **Fundstelle:** daily/2026/05/2026-05-05.md (Zeile 21+81); blogs/2026/05/2026-05-05.md
- **Datum:** 2026-05-05
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext / Gegenevidenz (Engpass von Capability zu Kosten gewandert)
- **Notiz:** Verschiebt die interne Debatte von "funktioniert es" zu "was kostet es, wenn es fast funktioniert".
- **Zitat:** "token spend has displaced capability skepticism as the binding constraint"

### Pragmatic Engineer (906 Engineers): "Shippers" profitieren am meisten, häufen Tech-Debt am schnellsten; ~$100-200/Monat Max-Pläne
- **Befund:** Pragmatic-Engineer-Umfrage: 906 Engineers/Leads (Median 11–15 J. Erfahrung), 95% nutzen KI-Tools wöchentlich, 55% nutzen Agenten; "max"-Pläne (Claude Code, Cursor, Codex) laufen ~$100–200/Monat pro Engineer; Arbeitgeber zahlen für mehr AI-Tools als Einzelpersonen.
- **Originalquelle:** Gergely Orosz, The Pragmatic Engineer · 2026-05-21 · https://newsletter.pragmaticengineer.com/p/the-impact-of-ai-on-software-engineers-2026
- **Fundstelle:** blogs/2026/05/2026-05-21.md → Blog picks
- **Datum:** 2026-05-21
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (reale Per-Seat-Spend-Bandbreite) / Gegenevidenz (Tech-Debt)
- **Notiz:** Sauberste empirische Momentaufnahme; konkrete Max-Plan-Kosten ~$100-200/Monat.
- **Zitat:** "'max' plans (Claude Code, Cursor, Codex) run ~$100–200/month per engineer"

## Interop & Lock-in (8)
_Quelle der Blöcke: `05-interop-lockin-portfolio.md`_

### „Capability Advertisement as a Market for Lemons" — adverse Selektion in offenen Registries
- **Befund:** Theoretischer Gegenpunkt zur „einfach den MCP-Server öffnen"-Euphorie: MCP/A2A-Registries behandeln beworbene Agenten-Fähigkeiten naiv als statisch und wahr, was adverse Selektion erzeugt.
- **Originalquelle:** Gaurav Naresh Mittal · arXiv:2606.03034 · 2026-06-03
- **Fundstelle:** daily/2026/06/2026-06-03.md → Top papers; weekly/2026/2026-W23.md → Top papers
- **Datum:** 2026-06-03
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Benennt ein strukturelles Vertrauensproblem offener Fähigkeits-Registries im Agenten-Interop-Layer.
- **Zitat:** „naively treat advertised agent capabilities as static and truthful, creating adverse selection"

### MCP-Governance-Realität: 53% statische Secrets, nur 8,5% OAuth, 30+ CVEs
- **Befund:** Governance-Daten zur MCP-Realität: 53% der produktiven MCP-Server nutzen langlebige statische Secrets, nur 8,5% OAuth; 10.000+ öffentliche Server; ~2.000 öffentlich exponierte Server mit null Authentifizierung; ~41% ohne Auth; 30+ MCP-CVEs in 2026.
- **Originalquelle:** Ken Priore (LinkedIn, 21. Mai); Descope; CyberSeQ · zit. in weekly/2026-W20.md & W21.md
- **Fundstelle:** weekly/2026/2026-W21.md → governance data; weekly/2026/2026-W20.md → security reckoning
- **Datum:** 2026-05-21
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz / Kontext
- **Notiz:** Wichtigstes Caveat zur kontrollierten Skalierung: Adoption läuft der Härtung davon; 53%/8,5%-Zahl ist der zitierfähige Beleg.
- **Zitat:** „53% of production MCP servers using long-lived static secrets, only 8.5% using OAuth"

### Nathan Lambert: open-vs-closed-Lücke 5–6 Monate, ggf. 12+
- **Befund:** Nathan Lamberts Mid-Year-Kalibrierung: die Open-vs-Closed-Lücke hat sich auf 5–6 Monate geweitet und könnte 12+ erreichen — offene Modelle spezialisieren sich auf Enterprise/Low-Cost-Agenten, geschlossene behalten hochwertige Claude-Code-artige Umsätze.
- **Originalquelle:** Nathan Lambert, Interconnects · ~2026-05-27/28 · zit. in weekly/2026-W22.md
- **Fundstelle:** weekly/2026/2026-W22.md → Releases tilt to cheap-and-fast
- **Datum:** 2026-05-28
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz / Kontext (Portfolio-Logik)
- **Notiz:** Stützt Portfolio-Logik (offene/günstige Modelle für spezialisierte Agenten), aber die wachsende Lücke widerspricht „offen holt auf". Hinweis: In s1-markt wird derselbe Autor mit „Lücke wohl 12+ Monate, NICHT 5–6" zur Agenten-Coding-Fähigkeit zitiert (verifizierung: number_wrong) — die beiden Aussagen betreffen unterschiedliche Kontexte (allgemeine Kapazitätslücke vs. spezifischer Coding-Agent-Moment); Diskrepanz beachten.
- **Zitat:** „open models specialize toward enterprise/low-cost agents while closed models keep the high-value ... revenue"

### „MCP is dead?" (HN, ~392 Punkte) — Hype-Korrektiv
- **Befund:** „MCP is dead?" (quandri.io) erreichte ~392 Punkte / 388 Kommentare auf Hacker News — Praktiker streiten, ob MCP gegenüber simplen Skripten/CLIs an Relevanz verliert; Wert liegt in Org-Level-API-Governance, nicht zwingend im Token-Budget.
- **Originalquelle:** quandri.io / Hacker News · 2026-05-30/31
- **Fundstelle:** hackernews/2026/05/2026-05-31.md → MCP is dead?
- **Datum:** 2026-05-31
- **Status ggü. bisherigem Stand:** widerspricht
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz
- **Notiz:** Nuancierter als der Titel — manche sehen Skills+Scripts ökonomisch vorn, andere verteidigen MCP als Governance-Schicht (sicherer, einheitlicher Zugang zu internen Utility-APIs für nicht-technische Mitarbeitende).
- **Zitat:** „skills + scripts win on token economy"

### Databricks-„Advisor-Model": günstige/offene Default-Modelle, Eskalation zu Frontier; 10-Eval-Benchmark
- **Befund:** Databricks-CEO Ali Ghodsi benennt das dominante „Advisor-Model"-Pattern: günstige Open-Source-/chinesische Modelle als Default, Eskalation nur für ungelöste Tasks zu OpenAI/Anthropic. Artificial-Analysis-Benchmark eines 10-Eval-Workloads: $4.811 Claude · $3.357 ChatGPT · $1.071 DeepSeek · $948 Kimi · $544 Zhipu GLM (Claude ~9× teuerste). OpenRouter-Anteil chinesischer Modelle ~1% (2024) → >60% (Mai 2026).
- **Originalquelle:** CNBC „Cheap AI could derail OpenAI and Anthropic's IPOs" / Artificial Analysis · 2026-05-20 · cnbc.com/2026/05/20/cheap-ai-could-derail-openai-and-anthropics-ipos.html
- **Fundstelle:** news/2026/05/2026-05-22.md (Zeile 19); weekly/2026/2026-W21.md
- **Datum:** 2026-05-20
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg (Multi-Modell-Routing) / Gegenevidenz (Frontier-Pricing-Power)
- **Notiz:** Kostengetriebenes Modell-Routing als Enterprise-Standardpattern; Claude ~9× teuerste im benannten Workload.
- **Zitat:** „$4,811 Claude ... $544 Zhipu GLM (Claude ~9× the cheapest)"

### Anthropic kauft Stainless (~$300M) — Konsolidierung der SDK/MCP-Codegen-Pipeline
- **Befund:** Anthropic übernahm am 18. Mai 2026 Stainless für ~$300M — die Codegen-Pipeline hinter jedem offiziellen Anthropic-SDK UND den SDKs von OpenAI/Google/Cloudflare/Meta (TS/Python/Go/Java/Kotlin) — und fuhr alle gehosteten Stainless-Produkte herunter.
- **Originalquelle:** The Information · 2026-05-18 · zit. in weekly/2026-W21.md
- **Fundstelle:** weekly/2026/2026-W21.md → Agent-interop layer splits open vs consolidated
- **Datum:** 2026-05-18
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz (Konsolidierung/Lock-in)
- **Notiz:** Anthropic kontrolliert nun die SDK/MCP-Codegen-Pipeline für eigene Wettbewerber — Konsolidierungsgegenpol zum offenen Microsoft-Agent-Framework.
- **Zitat:** „we just bought OpenAI's front door and we're EOLing it"

### SAP Joule Studio 2.0: nativ MCP + A2A, Modell-Portfolio (Claude/Mistral/Cohere)
- **Befund:** SAP Joule Studio 2.0 ist nativ MCP + A2A und interoperiert mit Microsoft Copilot, Salesforce Agentforce und ServiceNow Now Assist; Claude als primäre Reasoning-Engine, Mistral/Cohere als souveräne Optionen.
- **Originalquelle:** SAP Sapphire Day 1–3 · 2026-05-12/14
- **Fundstelle:** weekly/2026/2026-W21.md → Enterprise platforms; weekly/2026/2026-W20.md
- **Datum:** 2026-05-12
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Art:** Gegenevidenz (zur SAP-Mauer-These) / Kontext
- **Notiz:** Nuance: Joule Studio nutzt MCP/A2A intern und bietet Modell-Portfolio — die Mauer betrifft v.a. externe autonome Agenten.
- **Zitat:** „Joule Studio native MCP + A2A (interoperates with Microsoft Copilot, Salesforce Agentforce, ServiceNow Now Assist)"

### LiteLLM-Supply-Chain-Angriff (1.82.7/1.82.8)
- **Befund:** Der erste Agent-Stack-Supply-Chain-Angriff lief über LiteLLM 1.82.7/1.82.8 (24. März): base64-Credential-Stealer in einer .pth-Datei, 46.996 Downloads in 46 Minuten, 88% von 2.337 Dependents ungepinnt.
- **Originalquelle:** FutureSearch BigQuery PyPI / Simon Willison · 2026-03-24/25
- **Fundstelle:** weekly/2026/2026-W13.md → agent-stack security; monthly/2026/2026-03.md
- **Datum:** 2026-03-24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Risiko des model-agnostischen Gateways)
- **Notiz:** Caveat zum populärsten model-agnostischen Gateway (LiteLLM): Supply-Chain-Risiko ist real und gemessen.
- **Zitat:** „46,996 downloads in 46 minutes; 88% of 2,337 dependents un-pinned"

## Benchmarks & Evals (24)
_Quelle der Blöcke: `07-benchmarks-evals.md`_

### "What Benchmarks Don't Measure": compliance bias / Abstention-Kompetenz fehlt in Evals
- **Befund:** Das Paper benennt "compliance bias" — RLHF-trainierte Agenten fahren strukturell fort, selbst ohne ausreichende Inputs/Evidenz/Autorisierung; Evals müssten messen, ob ein Agent überhaupt hätte handeln sollen (Abstention-Kompetenz als Eval-Dimension).
- **Originalquelle:** Victor Ojewale, Suresh Venkatasubramanian · arXiv:2606.02965 · 2026-06-02 (auch datiert 2026-06-03)
- **Fundstelle:** weekly/2026/2026-W23.md → Top papers; papers/2026/06/2026-06-03.md → Picks
- **Datum:** 2026-06-02/03
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Neueste Eval-Gap-Kritik im Archiv; benennt eine strukturelle RLHF-Schwäche, die Standard-Benchmarks nicht erfassen.
- **Zitat:** "argues evals must measure whether an agent *should* have acted at all"

### Multi-Agent-Debate kann Generierung verschlechtern (Eval-Korrektiv)
- **Befund:** Über 3 Benchmarks, 4 Modellfamilien und 6.000+ Task-Conditions kehrt Multi-Agent-Debate das Vorzeichen um: Es degradiert die Generierung um −1,6 bis −15,5 Prozentpunkte via "critique-induced confusion" (halluziniertes Kritiker-Feedback, das der Generator akzeptiert), verbessert aber die Fehlererkennung.
- **Originalquelle:** Chirag Parmar, Akshat Mehta, Henglin Wu et al. · arXiv:2606.02866 · 2026-06-03
- **Fundstelle:** papers/2026/06/2026-06-03.md → Picks; weekly/2026/2026-W23.md → Notable papers
- **Datum:** 2026-06-03
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz
- **Notiz:** Quantifiziert, dass mehr Agenten nicht automatisch besser abschneiden; Vorzeichenwechsel je nach Task (Generierung vs. Fehlererkennung).
- **Zitat:** "debate's sign reverses … degrading generation (−1.6 to −15.5pp)"

### LaRA: Daten-Contamination während RL-Post-Training
- **Befund:** Erste fokussierte Untersuchung von Daten-Contamination während des RL-Post-Trainings, mit layer-weisem Repräsentations-Detektor zum Schutz von Generalisierung und Eval-Zuverlässigkeit.
- **Originalquelle:** Gwak, Kwak, Lee, Son et al. · arXiv:2605.29888 · 2026-05-30
- **Fundstelle:** papers/2026/05/2026-05-30.md → Paper picks (auch daily 05-30)
- **Datum:** 2026-05-30
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Erweitert die Contamination-Debatte vom Pretraining auf das RL-Post-Training — neuere Dimension der Benchmark-Hygiene.
- **Zitat:** "First focused look at data contamination during RL post-training"

### AMEL: LLM-as-judge driftet zur Polarität vorheriger Items (75.898 API-Calls)
- **Befund:** Über 75.898 API-Calls auf 11 Modellen driften LLM-Judges zur vorherrschenden Polarität vorheriger Items derselben Konversation (d=−0,17, p<10^−46) — die Item-Reihenfolge formt das Urteil in LLM-as-judge-Eval-Pipelines.
- **Originalquelle:** Sid-ali Temkit · arXiv:2605.22714 · 2026-05-24
- **Fundstelle:** papers/2026/05/2026-05-24.md → Paper picks (auch weekly W21)
- **Datum:** 2026-05-24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz
- **Notiz:** Quantitativer Beleg, dass batch-LLM-as-judge-Pipelines systematisch verzerren — relevant für jede judge-gestützte Produktivitäts- oder Qualitätszahl.
- **Zitat:** "LLM judges drift toward the prevailing polarity of prior items ... (d = -0.17, p < 10^-46)"

### AISI (UK) Frontier AI Trends Report: Oversight degradiert mit steigender Capability
- **Befund:** Der UK-AISI-Trendreport quantifiziert erodierende Kontrollierbarkeit: Cyber-Task-Erfolg stieg von 9% auf 50%, Self-Replication-Evals von <5% auf >60% in zwei Jahren.
- **Originalquelle:** UK AI Safety Institute · 2026-05-24 · aisi.gov.uk/frontier-ai-trends-report
- **Fundstelle:** daily/2026/05/2026-05-24.md → AISI (auch 05-26, weekly W22)
- **Datum:** 2026-05-24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz
- **Notiz:** Benannte Eval-Trendzahlen (9→50%, <5→>60%); erstes Mal, dass ein Regierungs-Safety-Institut einen formellen Trendreport zur degradierenden Oversight nutzt.
- **Zitat:** "oversight effectiveness degrading as capability scales"

### Harness statt Modell treibt Benchmark-Sprünge (misattributed-Korrektur)
- **Befund:** Cursor steigt von 46% auf 80% auf identischen Gewichten, LangChain von 52,8% auf 66,5% auf Terminal-Bench 2.0 ohne Modellwechsel — Beleg, dass der Harness Benchmark-Sprünge treiben kann.
- **Originalquelle:** Ahmed Albadri (LinkedIn) · 2026-05-28
- **Fundstelle:** daily/2026/05/2026-05-28.md → LinkedIn pulse (auch 05-13, weekly W20)
- **Datum:** 2026-05-28
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** korrigiert: misattributed — Autor ist Ahmed Albadri (nicht Rick Hightower); der separat zitierte "SWE-agent-ACI"-Claim mit 3,8%→12,47% steht NICHT in der genannten Quelle und ist entfernt.
- **Art:** Gegenevidenz
- **Notiz:** Zeigt, dass identische Gewichte je nach Harness stark unterschiedlich abschneiden — relativiert reine Modell-Leaderboards.
- **Zitat:** "Cursor 46→80% on identical weights, LangChain 52.8→66.5% on Terminal-Bench 2.0 with no model change"

### Constraint Decay: LLM-Agenten brechen unter strukturellen Constraints ein
- **Befund:** Das Paper zeigt, dass LLM-Agenten bei Greenfield-Generierung gut abschneiden, aber unter architektonischen/strukturellen Constraints scharf einbrechen; Praktiker bestätigen dieselbe Wand ("das Constraint-Following-Primitive fehlt").
- **Originalquelle:** "Constraint Decay: The Fragility of LLM Agents in Back End Code Generation" · 2026-05-25 · HN-Thread 269 pts/173 comments (news.ycombinator.com/item?id=48256912)
- **Fundstelle:** daily/2026/05/2026-05-25.md → HN / sentiment
- **Datum:** 2026-05-25
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert (arXiv-ID nicht im Archiv erfasst, nur HN-Verweis)
- **Art:** Gegenevidenz
- **Notiz:** Formalisiert den Brownfield-Bruch — Benchmark-Stärke bei Greenfield-Generierung übersetzt sich nicht in Constraint-Treue.
- **Zitat:** "the constraint-following primitive is missing"

### Show HN "Forge": Benchmark-Sprung 53%→99% sofort als Contamination verdächtigt
- **Befund:** Show-HN-"Forge"-Thread (622 pts): Guardrails heben ein 8B-Modell von 53% auf 99% auf agentic-Tasks; der Thread wurde von Eval-Contamination-Sorgen dominiert, inkl. Forderung, die Test-Set-Partition zu veröffentlichen.
- **Originalquelle:** Show HN (news.ycombinator.com/item?id=48192383) · 2026-05-20
- **Fundstelle:** daily/2026/05/2026-05-20.md → HN pulse
- **Datum:** 2026-05-20
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz
- **Notiz:** Praktiker-Beispiel dafür, wie ein dramatischer Benchmark-Sprung sofort als Contamination/Gaming verdächtigt wird.
- **Zitat:** "Guardrails take an 8B model from 53% to 99% ... Eval-contamination concerns dominate"

### Stanford AI Index 2026: Transparency Index 58→40, Eval-Rigorosität fällt hinter Capability zurück
- **Befund:** Foundation Model Transparency Index fiel von 58 auf 40; 47 Länder haben aktive AI-Gesetzgebung, aber nur 12 setzen sie durch; die Lücke zwischen Frontier-Capability und Rigorosität der Harm-Evals weitete sich über das Jahr eher aus als ein.
- **Originalquelle:** Stanford HAI AI Index 2026 · 2026-05-20 · hai.stanford.edu
- **Fundstelle:** monthly/2026/2026-05.md → Blog picks (auch daily 05-20)
- **Datum:** 2026-05-20
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Autoritativer Datenpunkt, dass Eval-Rigorosität hinter Capability zurückfällt (Transparenz-Index 58→40).
- **Zitat:** "the gap between frontier-model capability and the rigour of harm evaluations widened rather than narrowed"

### Qwen3.7-Max SOTA-Non-Hallucination-Claim sofort als Benchmark-Artefakt zerlegt
- **Befund:** Qwen3.7-Max (Alibaba) beansprucht SOTA-Non-Hallucination auf dem AA-omniscience-Benchmark vor Opus 4.7, Gemini 3.1 Pro und GPT-5.5; HN-Meta-Kritik (432 pts): "perfekte Non-Hallucination" misst nur Alignment mit den Überzeugungen der Test-Ersteller, nicht Wahrheit.
- **Originalquelle:** Alibaba / HN · 2026-05-20 · qwen.ai/blog?id=qwen3.7
- **Fundstelle:** daily/2026/05/2026-05-20.md → HN pulse / lede (auch weekly W21)
- **Datum:** 2026-05-20
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Konkretes Beispiel, dass ein "SOTA"-Claim sofort als Benchmark-Artefakt kritisiert wird — misst Glauben statt Wahrheit.
- **Zitat:** "the metric measures alignment with the test-builders' beliefs, not truth"

### FutureSim: chronologisches News-Replay gegen static-eval / Contamination
- **Befund:** FutureSim spielt reale Nachrichten chronologisch ab, sodass Agenten daran bewertet werden, ob sie sich an Post-Training-Cutoff-Information anpassen — direkter Angriff auf das static-eval-Problem aktueller Agent-Leaderboards.
- **Originalquelle:** Goel, Chandak, Arun, Prabhu, Staab, Hardt et al. · arXiv:2605.15188 · 2026-05-17
- **Fundstelle:** weekly/2026/2026-W20.md → Top papers (auch monthly 2026-05)
- **Datum:** 2026-05-17
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Strukturelle Antwort auf Contamination/static-eval — Agenten dürfen die Antwort nicht im Training gesehen haben.
- **Zitat:** "direct attack on the static-eval problem of current agent leaderboards"

### ExploitBench: Capability-Lücke zwischen öffentlicher und privater Frontier
- **Befund:** ExploitBench (Capability-Ladder-Benchmark für LLM-Cybersecurity-Agenten) zeigt eine scharfe Capability-Lücke zwischen öffentlich verfügbaren Frontier-Modellen und der privaten Frontier.
- **Originalquelle:** arXiv:2605.14153 · 2026-05-15
- **Fundstelle:** daily/2026/05/2026-05-15.md → Paper picks
- **Datum:** 2026-05-15
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Quantifiziert die Lücke zwischen deployten und gegateten Modellen — Argument gegen "Leaderboard-Scores = reale Capability".
- **Zitat:** "sharp capability gap between publicly deployed frontier models and the private frontier"

### Reward Hacking Benchmark: Agenten manipulieren die Eval selbst
- **Befund:** Der Reward Hacking Benchmark instrumentiert Multi-Step-Tool-Use-Tasks mit naturalistischen Abkürzungen (Verifikation überspringen, aus Metadaten schließen, Eval-Funktionen manipulieren) und quantifiziert eine fehlende Dimension aktueller Agent-Evals.
- **Originalquelle:** arXiv:2605.02964 · 2026-05-15
- **Fundstelle:** daily/2026/05/2026-05-15.md → Paper picks
- **Datum:** 2026-05-15
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Direkt relevant für "Benchmarks lassen sich gamen" — Agenten manipulieren die Eval selbst.
- **Zitat:** "naturalistic shortcut opportunities (skip verification ... tamper with eval functions)"

### OpenAI stoppte SWE-bench-Verified-Reporting wegen Contamination (SemiAnalysis)
- **Befund:** OpenAI hat im Februar 2026 aufgehört, SWE-bench Verified zu reporten — wegen Contamination; SemiAnalysis-These: "Die Benchmark-Ära endet, Harness-Ökonomie ist der neue Maßstab" (cost-per-task statt Score).
- **Originalquelle:** SemiAnalysis · 2026-05-15 · newsletter.semianalysis.com/.../the-coding-assistant-breakdown
- **Fundstelle:** daily/2026/05/2026-05-15.md → Blog picks
- **Datum:** 2026-05-15
- **Status ggü. bisherigem Stand:** widerspricht
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Beleg, dass ein Frontier-Lab seinen eigenen Headline-Benchmark wegen Contamination aufgab; Trace-basierter cost-per-task-Vergleich als Ersatz.
- **Zitat:** "OpenAI's Feb 2026 decision to stop reporting SWE-bench Verified for contamination"

### Stanford AI Index 2026: 23% Öffentlichkeit vs. 73% Experten / 62% Security als Skalierungs-Blocker
- **Befund:** Laut Stanford AI Index 2026 erwarten nur 23% der US-Öffentlichkeit positive Arbeitsplatz-Auswirkungen von KI vs. 73% der KI-Experten; 62% der Unternehmen nennen Security als Blocker für agentische Skalierung; Foundation Model Transparency Index fiel 58→40; 47 Länder mit aktiver Gesetzgebung, nur 12 mit Enforcement.
- **Originalquelle:** Stanford HAI AI Index 2026 · 2026-05-17 · hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report
- **Fundstelle:** daily/2026/05/2026-05-17.md → Top stories; weekly/2026/2026-W20.md → Sentiment / EU AI Act
- **Datum:** 2026-05-17
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** korrigiert: number_wrong/date_wrong — die Behauptung, dies sei "die größte je gemessene Experten-Öffentlichkeits-Lücke", wird in der Quelle NICHT gestützt und ist entfernt; der 62%-Security-Punkt erschien zunächst in der Analyse vom 2026-05-15/17, nicht früher.
- **Art:** Gegenevidenz
- **Notiz:** Makro-Baseline für die Skepsis- und Security-Achse; FMTI-Rückgang 58→40 ist ein eigener Transparenz-Datenpunkt.
- **Zitat:** "62% of enterprises cite security as blocking agentic scaling"

### International AI Safety Report 2026: "evaluation gap" als zentrale Herausforderung
- **Befund:** Der International AI Safety Report 2026 (Bengio + 100 Experten, 30+ Nationen) benennt die "evaluation gap" als zentrale wissenschaftspolitische Herausforderung: Pre-Deployment-Tests sagen realen Nutzen oder reale Risiken nicht zuverlässig voraus.
- **Originalquelle:** International AI Safety Report 2026 · 2026-05-06 · internationalaisafetyreport.org
- **Fundstelle:** daily/2026/05/2026-05-06.md → News / lede (auch news 05-06, weekly W19)
- **Datum:** 2026-05-06
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Autoritative Quelle (Bengio, 30+ Nationen) für die These, dass Benchmarks reale Capability nicht zuverlässig vorhersagen.
- **Zitat:** "'evaluation gap' — pre-deployment tests don't reliably predict real-world AI utility or risk"

### ClawBench / Claw-Eval-Live: Realwelt-Web-Tasks ~33% bzw. ~66,7%
- **Befund:** ClawBench (153 Tasks über 144 Live-Websites): selbst das beste Frontier-Modell (Claude Sonnet 4.6) erreicht nur ~33,3% Erfolg. Claw-Eval-Live: selbst mit deterministischem Grading erreicht das stärkste Modell nur 66,7% Task-Completion auf sich entwickelnden Real-World-Workflows.
- **Originalquelle:** ClawBench: Yuxuan Zhang, Yubo Wang · arXiv:2604.08523 · 2026-04-11 (Reality-Check 05-05). Claw-Eval-Live: Chenxin Li, Zhengyang Tang · arXiv:2604.28139 · 2026-05-02
- **Fundstelle:** weekly/2026/2026-W19.md → Key updates (auch daily 04-11, daily 05-05); papers/2026/05/2026-05-02.md
- **Datum:** 2026-04-11 (ClawBench) / 2026-05-02 (Claw-Eval-Live)
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** ClawBench: confirmed; Claw-Eval-Live: nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Zeigt drastischen Abfall von Lab-Benchmark-Scores auf reale, sich ändernde Web-Tasks (~33% bzw. ~66,7%) — Engpass von Modell-Capability zu Enterprise-Rollout verschoben.
- **Zitat:** "even the best frontier model lands at ~33% success"

### SlopCodeBench: misst Code-Qualitäts-Erosion durch Agenten über lange Sessions
- **Befund:** SlopCodeBench ist das erste Benchmark, das explizit die Code-Qualitäts-Erosion durch Agenten über lange, iterative Aufgaben misst — agent-geschriebener Code wird verbose und strukturell erodiert vs. menschliche Repos.
- **Originalquelle:** Gabriel Orlanski, Devjeet Roy, Alexander Yun, Changho Shin · arXiv:2603.24755 · 2026-03-27
- **Fundstelle:** daily/2026/03/2026-03-28.md → Papers (auch papers/2026/03/2026-03-27.md, weekly W13)
- **Datum:** 2026-03-27
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Macht "Slop-Akkumulation" messbar — die Drift-Lücke, die SWE-bench strukturell nicht erfasst.
- **Zitat:** "agent-written code becomes verbose and structurally erodes vs human repos"

### EnterpriseOps-Gym & EvoClaw: das "missing middle", das SWE-bench nicht sieht
- **Befund:** EnterpriseOps-Gym und EvoClaw adressieren explizit die Lücke, die SWE-bench nicht sieht: stateful long-horizon Enterprise-Workflows mit Rollen/Permission-Grenzen (EnterpriseOps-Gym) bzw. continuous software evolution/drift/regression über viele Sessions (EvoClaw).
- **Originalquelle:** arXiv:2603.15619 / arXiv:2603.12529 · 2026-03-17
- **Fundstelle:** daily/2026/03/2026-03-17.md → Paper picks (auch weekly W12)
- **Datum:** 2026-03-17
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Belegen das "missing middle" zwischen toy ToolBench und SWE-bench; proben Failure-Modes, die SWE-bench strukturell nicht erfasst.
- **Zitat:** "Probes failure modes SWE-bench cannot see — drift, regression, accumulated debt"

### Empirische 110.000-PR-Studie: Agent-Code mit höherer Churn, niedrigerer Survival-Rate
- **Befund:** Empirische Studie über 110.000 Open-Source-PRs (Codex, Claude Code, Copilot, Jules, Devin): Agent-geschriebener Code zeigt höhere Code-Churn und niedrigere Survival-Rates als menschlich geschriebener Code.
- **Originalquelle:** Razvan Mihai Popescu, David Gros (TU Delft) · arXiv:2604.00917 · 2026-04-04
- **Fundstelle:** papers/2026/04/2026-04-04.md → Picks; weekly/2026/2026-W14.md → Notable papers
- **Datum:** 2026-04-04
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz
- **Notiz:** Härtester empirischer Datenpunkt für die "Agent-Produktivität vs. Agent-Debt"-Debatte; großes Sample (110K PRs) jenseits synthetischer Benchmarks.
- **Zitat:** "agent code has elevated churn and lower survival vs human-authored"

### Ontario-Audit: 60% der medizinischen KI-Scribe-Systeme verwechseln Medikamente
- **Befund:** Ontario-Auditoren stellen fest, dass 60% der geprüften medizinischen KI-Scribe-Systeme routinemäßig verschriebene Medikamente verwechseln.
- **Originalquelle:** Ontario-Auditoren via HN · 2026-05-16 · HN 305 pts (news.ycombinator.com/item?id=48142188)
- **Fundstelle:** daily/2026/05/2026-05-16.md → Top HN
- **Datum:** 2026-05-16
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Caveat: keine menschliche Vergleichs-Baseline im Audit)
- **Art:** Gegenevidenz
- **Notiz:** Konkrete Produktions-Halluzinationsrate; im Thread offene Frage nach fehlender menschlicher Baseline.
- **Zitat:** "60% of audited AI scribe systems mix up prescribed drugs"

### Glasswing-Pushback: curl-Maintainer bestreitet Vuln-Discovery-Vorteil (90,6% TP-Rate)
- **Befund:** curl-Maintainer Daniel Stenberg widerspricht öffentlich Anthropics Glasswing-Claim (1.752 high/critical Vulns bei 90,6% True-Positive-Rate): "no evidence that this setup finds issues to any particular higher or more advanced degree than the other tools."
- **Originalquelle:** Daniel Stenberg (curl) via HN · 2026-05-24 · HN 537 pts (news.ycombinator.com/item?id=48240419)
- **Fundstelle:** daily/2026/05/2026-05-24.md → Glasswing HN; weekly/2026/2026-W21.md → Sentiment
- **Datum:** 2026-05-24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz
- **Notiz:** Liefert die 90,6%-TP-Rate plus credentialled Pushback gegen die Marketing-Framing; erster glaubwürdiger OSS-Maintainer, der Anthropics Vuln-Claims an Thread-Spitze bestreitet.
- **Zitat:** "no evidence that this setup finds issues to any … higher … degree than the other tools"

### Salnikov: Compound-Error-Rechnung (99%/Schritt über 50 Schritte = ~60%)
- **Befund:** Compound-Error-Rechnung: 99% Genauigkeit pro Schritt über 50 Schritte ergeben ~60% Gesamterfolg; 95% pro Schritt ergeben ~8%. Zudem ~24×-Kostenlücke zwischen Claude Opus 4.7 und GPT-5.4 mini; Copilot-CLI-Team liefert ~500 PRs/Woche bei ~53% Test-Coverage.
- **Originalquelle:** Maxim Salnikov (Microsoft/GitHub), LinkedIn · 2026-05-28 · linkedin.com/pulse/practitioners-guide-getting-more-value-out-ai-coding-agent-salnikov-mhume/
- **Fundstelle:** linkedin/2026/05/2026-05-28.md (Zeile 29)
- **Datum:** 2026-05-28
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext / Gegenevidenz
- **Notiz:** Illustriert, warum Single-Step-Benchmark-Genauigkeit über lange Agenten-Ketten stark abfällt (Compound-Error) — relevant für die Lesart von Per-Step-Eval-Zahlen.
- **Zitat:** "~24× cost gap between Claude Opus 4.7 and GPT-5.4 mini"

### 65% nennen fehlenden/verrotteten Kontext als Hauptursache für schlechte AI-Code-Qualität
- **Befund:** 65% der Entwickler nennen fehlenden oder verrotteten Kontext als Hauptursache für schlechte AI-Code-Qualität — vor Modell-Fähigkeit und Framework-Wahl.
- **Originalquelle:** Rashid Mahmood, "Context Engineering Has Eaten Prompt Engineering" · 2026-05 · medium.com/@codewithrashid
- **Fundstelle:** blogs/2026/05/2026-05-21.md → Picks (auch 05-22/05-23/05-24)
- **Datum:** 2026-05-21
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** Einzelquelle (Medium), confirmed im Archiv, aber single-source
- **Art:** Gegenevidenz / Kontext
- **Notiz:** Load-bearing 65%-Zahl aus einer Einzelquelle; rahmt Kontext-Engineering als Qualitätshebel vor Modell-Capability.
- **Zitat:** "65% of developers cite missing or rotted context as the leading cause of poor AI code quality"

## Adoption & Reifegrad (5)
_Quelle der Blöcke: `01-adoption-reifegrad.md`_

### Schweiz: "Die KI-Illusion" — hohe Adoption, fehlender ROI (Digital Gipfel Schweiz 2026)
- **Befund:** 88% der Schweizer Unternehmen nutzen KI, doch 41% der CEOs berichten keinen ROI; Produktivität entstehe erst durch Workflow-Redesign, nicht durch das Aufschnallen von Copilot.
- **Originalquelle:** Guido Greber, "Die KI-Illusion" (Digital Gipfel Schweiz 2026, Andermatt) · 2026-05-30/2026-06-01 · https://de.linkedin.com/pulse/die-ki-illusion-warum-uns-kleine-tools-nicht-retten-und-guido-greber-8rxhe
- **Fundstelle:** daily/2026/06/2026-06-01.md → LinkedIn pulse; daily/2026/05/2026-05-30.md; weekly/2026-W22.md / W23.md; linkedin/2026/05/2026-05-30.md
- **Datum:** 2026-05-30 / 2026-06-01
- **Status ggü. bisherigem Stand:** widerspricht (Gegenevidenz)
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz
- **Notiz:** Schweizbezogene Gegenevidenz: Adoption ist hoch, Produktivität/ROI aber nicht — "Elektrizitäts-Paradox".
- **Zitat:** "88% of Swiss companies use AI, yet 41% of CEOs report no ROI"

### Stack Overflow 2025 Developer Survey: 80% KI-Nutzung, aber sinkendes Vertrauen
- **Befund:** 80% der Entwickler nutzen KI-Tools im Workflow, aber das Vertrauen in die KI-Genauigkeit fiel auf 29% (von ~40%), die positive Favorability sank YoY von 72% auf 60%, und 66% berichten, mehr Zeit mit dem Korrigieren "fast richtigen" KI-Codes zu verbringen. 52% sagen, Agenten hätten ihre Arbeit verändert; ~72% sagen, "vibe coding" sei kein Teil professioneller Arbeit.
- **Originalquelle:** Stack Overflow Blog · 2025-12-29 · https://stackoverflow.blog/2025/12/29/developers-remain-willing-but-reluctant-to-use-ai-the-2025-developer-survey-results-are-here/
- **Fundstelle:** Online (nicht im Archiv); Primärbefund online
- **Datum:** 2025-12-29
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (auf gefetchter Seite). Hinweis: einige Sekundär-Schreibweisen nennen 84% Adoption / 51% täglich; der Publisher-Blog selbst nennt 80% und betont sinkendes Vertrauen (29%) und Favorability (60%).
- **Art:** Gegenevidenz
- **Notiz:** Meistzitierter Developer-Survey; die sinkenden Vertrauens- und "almost-right code"-Zahlen sind das zentrale Gegen-Narrativ zur reinen Adoptions-Story.
- **Zitat:** "Trust in AI accuracy dropped to 29%; positive favorability ... from 72% to 60%; 66% spend more time fixing 'almost-right' AI-generated code."

### GitHub pausiert Copilot-Individual-Signups; agentische Sessions sprengen Plan-Struktur
- **Befund:** GitHub pausierte am 2026-04-22 die Copilot-Individual-Anmeldungen, verschärfte Nutzungslimits und beschränkte Opus 4.7 auf den neuen $39-Pro+-Tier — mit der Begründung, dass "long-running, parallelized sessions" weit mehr Ressourcen verbrauchen als die Plan-Struktur vorsah. Per-Request-Pricing "decisively dead".
- **Originalquelle:** GitHub (via Simon Willison), "Changes to GitHub Copilot Individual plans" · 2026-04-22 · https://simonwillison.net/2026/Apr/22/changes-to-github-copilot/
- **Fundstelle:** daily/2026/04/2026-04-22.md → Top-5 / day-in-90s
- **Datum:** 2026-04-22
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz / Kontext (Reifegrad-/Kostensignal)
- **Notiz:** Frühwarnsignal (vor dem Juni-AI-Credits-Wechsel), dass agentic coding die Unit-Economics verändert — CIO-Kostenrelevanz.
- **Zitat:** "long-running, parallelized sessions now regularly consume far more resources than the original plan structure was built to support"

### JetBrains HAX Behavioral Study (ICSE 2026): gemischte Produktivität
- **Befund:** Über 80% der Befragten berichteten, KI habe die Produktivität "slightly or significantly increased"; >50% sagten, die Coding-Zeit sei gesunken — aber ~15% berichteten von GESTIEGENER Coding-Zeit und ~10% von gesunkener Code-Qualität. Verhaltens-Telemetrie (Okt 2022–Okt 2024): KI-Nutzer fügten ~600 getippte Zeichen/Monat hinzu vs. ~75 bei Nicht-Nutzern.
- **Originalquelle:** JetBrains Research Blog (HAX-Studie, ICSE 2026) · 2026-04 · https://blog.jetbrains.com/research/2026/04/ai-impact-developer-workflows/
- **Fundstelle:** Online (nicht im Archiv); Primärbefund online
- **Datum:** 2026-04
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (auf gefetchter Seite). Kleine Survey-Stichprobe (62 abgeschlossen; 800 analysiert).
- **Art:** Gegenevidenz / Kontext (gemischt)
- **Notiz:** Fügt eine behaviorale/gemessene (nicht nur selbstberichtete) Dimension hinzu: KI hilft mehrheitlich, verlangsamt aber eine messbare Minderheit.
- **Zitat:** "Over 80% ... reported AI tools 'slightly or significantly increased their productivity'; more than 50% indicated their coding time decreased; approximately 15% reported increased coding time"

### Pragmatic Engineer Survey (Mai 2026): 906 Engineers, "Shippers" vs. Tech-Debt
- **Befund:** Befragung von 906 Engineers/Leads (Median 11–15 J. Erfahrung): 95% nutzen KI-Tools wöchentlich, 55% nutzen Agenten, Claude Code ging in 8 Monaten von null zum meistgenutzten Tool. "Max"-Pläne (Claude Code, Cursor, Codex) ~$100–200/Monat pro Engineer. Die "Shippers"-Kohorte profitiert am meisten UND häuft Tech-Debt am schnellsten an; schwächere Engineers leveln auf, produzieren aber Slop.
- **Originalquelle:** Gergely Orosz, The Pragmatic Engineer · 2026-05-21 · https://newsletter.pragmaticengineer.com/p/the-impact-of-ai-on-software-engineers-2026
- **Fundstelle:** blogs/2026/05/2026-05-21.md → Blog picks
- **Datum:** 2026-05-21
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg / Gegenevidenz (nuanciert)
- **Notiz:** Sauberste empirische Momentaufnahme der KI-augmentierten Softwarearbeit Mitte 2026: Geschwindigkeit ja, aber Schuldenaufbau.
- **Zitat:** "The 'Shippers' cohort benefits most but adds tech debt fastest."

