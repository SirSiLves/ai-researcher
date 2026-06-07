# Produktivität & Effizienzgewinn (inkl. Gegenevidenz)

_Belegsammlung (Rohmaterial für spätere CIO-Konsolidierung). Stichtag Archiv: 2026-06-03. Neutral, vollständig, jede Zahl mit Quelle + Verifizierungsstatus._

## Worum es geht
Dieses Cluster sammelt die Evidenz dazu, WO der Produktivitäts-/Effizienzmehrwert von KI- und agentischem Coding messbar ist und WO nicht — beide Richtungen. Es umfasst kontrollierte Studien (METR-RCT), den DORA-Durchsatz-vs-Stabilitäts-Befund, Task-Completion-Tempo, reale Enterprise-Produktivitätszahlen (Salesforce, Google, Snap, Mizuho), den "verification tax"/Slowdown-erfahrener-Entwickler-Effekt sowie Rework/Churn/Slop-Akkumulation. Es kann CIO-Fragen beantworten wie: Wie groß ist der gemessene Gewinn? Hält er einer kontrollierten Studie stand? Wo kippt Geschwindigkeit in Instabilität/Tech-Debt? Wie task- und codebasenabhängig sind die Zahlen?

## Befunde

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

### Anthropic/OpenAI haben Product-Market-Fit; Kosten-Kontext $2.180 vs $200 (NEU seit Stichtag-nah)
- **Befund:** Simon Willison datiert die durable PMF von Coding-Agenten auf April 2026; seine Eigennutzung hätte zu API-Raten ~$2.180/Monat gekostet vs. $200 im Abo. Beide Labs verschoben Enterprise-Pläne still auf volle API-Preise (GPT-5.5 = 2× GPT-5.4, Opus 4.7 ~1,4× Opus 4.6).
- **Originalquelle:** Simon Willison · 2026-05-27 · https://simonwillison.net/2026/May/27/product-market-fit/
- **Fundstelle:** blogs/2026/05/2026-05-31.md → Blog picks; weekly/2026/2026-W22.md, W23.md
- **Datum:** 2026-05-27
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Kosten-Zahl $2.180 vs $200 in W22/Blog bestätigt); PMF-Framing nicht einzeln verifiziert
- **Art:** Beleg + Kontext (Gewinn-vs-Kosten-Tradeoff)
- **Notiz:** Ausgewogene Pro-Stimme mit konkretem Kosten-Kontext; rahmt die "AI-ist-zu-teuer"-Stories als Kunden, die zustimmen, obwohl es weh tut.

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

### Salesforce Agentforce: $1,2B ARR — Agenten tragen kommerziell (NEU seit Stichtag-nah)
- **Befund:** Salesforce Q1 FY27: Agentforce allein $1,2B ARR (+205% YoY), 3,8B Agentic Work Units (+111% QoQ), 28,6 Billionen (Trillion) Tokens (+152% QoQ) — erster sauberer Tier-1-SaaS-Datenpunkt über $1B-ARR.
- **Originalquelle:** Salesforce Q1 FY27 · 2026-05-27/28 · https://www.salesforce.com/news/stories/summer-2026-product-release-announcement/
- **Fundstelle:** weekly/2026/2026-W22.md → Enterprise agent revenue; monthly/2026/2026-05.md
- **Datum:** 2026-05-27
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** korrigiert: Token-Einheit (28,6T = Trillion/Billionen, nicht Milliarden/Billion) — Befund entsprechend formuliert
- **Art:** Kontext (Revenue, nicht direkte Produktivität)
- **Notiz:** Umsatzbeleg, dass Agenten kommerziell tragen — stützt indirekt die Produktivitäts-Story, ist aber Revenue, nicht Produktivität.

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

### Hyperscribe-Feldreport: kontrollierte Experimentierung, Qualität 84%→95%, Fehler 79%→30% (NEU seit Stichtag-nah)
- **Befund:** EHR-eingebetteter klinischer KI-Agent: sieben Versionen evaluiert (20 Kliniker, 1.646 Rubrics, 823 Fälle); Median-Qualität stieg 84%→95%, Live-Fehlerberichte fielen 79%→30% über drei Monate.
- **Originalquelle:** Aaryan Shah, Andrew Hines · 2026-04-30 · arXiv:2604.27309
- **Fundstelle:** papers/2026/04/2026-04-30.md; daily/2026/04/2026-04-30.md → Papers
- **Datum:** 2026-04-30
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Seltener kontrollierter Feld-Datenpunkt mit harten Qualitäts- und Fehlerquoten — zeigt, dass Gewinne erst durch laufende Governance/Versionierung entstehen.

### Snap: ~1.000 Entlassungen, 65%+ Code KI-generiert (NEU seit Stichtag-nah)
- **Befund:** Snap kündigte ~1.000 Stellenstreichungen an; CEO Evan Spiegel führt die Restrukturierung darauf zurück, dass 65%+ des neuen Codes KI-generiert ist.
- **Originalquelle:** BBC / Snap (Evan Spiegel) · 2026-04-24 · https://www.bbc.com/news/business-snap-layoffs-april-2026
- **Fundstelle:** daily/2026/04/2026-04-24.md → Other notable; news/2026/04/2026-04-24.md
- **Datum:** 2026-04-24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg / Kontext
- **Notiz:** Produktivitätsuplift wird hier direkt mit Personalabbau verknüpft — relevant als "ehrliche" Kehrseite der Gewinnzahlen.

### Anthropic Claude Code-Regression: stiller Qualitätsverfall (NEU seit Stichtag-nah)
- **Befund:** Anthropic-Postmortem bestätigt: "Modelle wurden schlechter"-Beschwerden waren real, Ursache aber drei separate Harness-Bugs — u.a. ein 26.-März-Bug (Thinking-Context-Clear) feuerte fälschlich jede Runde statt nach 1h Idle und machte Claude "forgetful and repetitive"; Reasoning-Effort fiel am 4. März still von high auf medium (revertiert 7. April).
- **Originalquelle:** Anthropic Engineering Postmortem (via Simon Willison) · 2026-04-23/24 · https://www.anthropic.com/engineering/april-23-postmortem ; simonwillison.net/2026/Apr/24/recent-claude-code-quality-reports
- **Fundstelle:** daily/2026/04/2026-04-24.md → narrative; daily/2026/03/2026-03-26.md; weekly/2026/2026-W17.md
- **Datum:** 2026-04-23
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Konkretes Beispiel, dass Produktivitäts-Tools wochenlang still degradieren können (Harness-Bug, nicht Modell) — Stabilitäts-Caveat zur Gewinn-Story.

### Snap (Duplikat-Cross-Cut) — siehe oben

### Google Cloud Next 2026 (Pichai): ~75% des neuen Codes KI-generiert, Migration 6× schneller (NEU seit Stichtag-nah)
- **Befund:** ~75% des neu geschriebenen Codes bei Google ist KI-generiert (von Engineers reviewt); eine interne Code-Migration lief mit Agenten 6× schneller als ein Jahr zuvor.
- **Originalquelle:** Sundar Pichai, Google Cloud Next 2026 · 2026-04-21 · https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/cloud-next-2026-sundar-pichai/
- **Fundstelle:** daily/2026/04/2026-04-21.md → Lead + item 1; weekly/2026/2026-W17.md; monthly/2026-04.md
- **Datum:** 2026-04-21
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg / Kontext
- **Notiz:** Zweiter Big-Tech-Datenpunkt neben Salesforce; "75% AI-generiert" ist eine Anteilszahl (Volumen), KEIN direkter Produktivitäts-Faktor — vorsichtig interpretieren.

### "Executing as You Generate": bis 55% Latenzreduktion (NICHT "55% schnellere Entwickler") (NEU seit Stichtag-nah)
- **Befund:** Führt Code parallel zur Token-Generierung via AST-Chunking aus — bis zu 55% End-to-End-Latenzreduktion für Coding-Agenten.
- **Originalquelle:** Zhensu Sun, Zhihao Lin · 2026-04-04 · arXiv:2604.00491
- **Fundstelle:** daily/2026/04/2026-04-04.md → Papers; papers/2026/04/2026-04-04.md
- **Datum:** 2026-04-04
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Kontext
- **Notiz:** WICHTIG zur Disambiguierung — dieses "55%" bezieht sich auf Inferenz-Latenz von Coding-Agenten, NICHT auf "55% schnellere Entwickler"; nicht mit dem METR-Slowdown-Diskurs verwechseln.

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

### Mizuho "Agent Factory": Bauzeit ~70% gesenkt (NEU seit Stichtag-nah)
- **Befund:** Mizuho Financial Group senkte die Agenten-Bauzeit um ~70% (von ~zwei Wochen auf Tage) — erste japanische Megabank, die autonome Agenten in der Breite produziert.
- **Originalquelle:** via daily digest · 2026-04-06
- **Fundstelle:** daily/2026/04/2026-04-06.md → Lead narrative
- **Datum:** 2026-04-06
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (im Archiv-Digest; keine separate Primärquelle gefetcht — Einzelquelle)
- **Art:** Beleg / Kontext
- **Notiz:** Nicht-Tech-/Finanzsektor-Datenpunkt; relevant für Schweizer Bankenpublikum, da regulierte Großbank — Effizienz im Agenten-Bau, nicht im Endprodukt.

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

### DORA 2025-Report: 90% nutzen AI, >80% sagen Produktivität gestiegen (Gewinnseite)
- **Befund:** 2025 DORA-Report (~5.000 Befragte): 90% der Entwickler nutzen AI bei der Arbeit, >80% sagen, sie steigere die Produktivität — eine Umkehr von 2024, mit nun POSITIVER Beziehung zu Software-Delivery-Throughput und Produkt-Performance. 30% berichten wenig/kein Vertrauen in KI-generierten Code.
- **Originalquelle:** Google Cloud / DORA · 2025-09-23 · https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report (Hub: https://dora.dev/dora-report-2025/)
- **Fundstelle:** Online (nicht im Archiv) — Online-Fetch Google Cloud Announcement
- **Datum:** 2025-09-23
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** confirmed (verbatim auf gefetchter Google-Cloud-Seite)
- **Art:** Beleg
- **Notiz:** Large-N-Gewinnseite — bei Skalierung korreliert AI-Adoption nun positiv mit Throughput, anders als im Vorjahr.
- **Zitat (opt.):** "Unlike last year, we observe a positive relationship between AI adoption on both software delivery throughput and product performance."

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

## Gegenevidenz / Einschränkungen (in diesem Cluster)
- **Kontrollierte RCT widerspricht Anekdote:** METR-RCT (2025-07-10) zeigt +19% Zeit (Verlangsamung) bei erfahrenen Devs auf reifen Repos; das 2026-Follow-up macht das Signal selbst unzuverlässig (CIs kreuzen Null, Selektionsbias) — die "55%/2×-faster"-Narrative hält der kontrollierten Messung nicht stand.
- **Wahrnehmung ≠ Realität:** Selbstberichte überschätzen den Zeit-Effekt laut METR um ~40 Prozentpunkte; die METR-2026-Self-Survey-Zahlen (2×, 2,5×) sind genau solche Selbstberichte, und METR-Staff selbst nennen die kleinsten Gewinne.
- **Throughput vs Stability:** DORA 2025 — AI positiv mit Throughput, NEGATIV mit Stabilität; DORA 2026 — J-Curve mit initialem Dip, "verification tax", Change Failure Rate 5%→6% (~$344K).
- **Task-/Codebasen-Abhängigkeit:** Stanford — 35–40% greenfield vs ≤10% legacy (Netto ~15–20% nach Rework); "Constraint Decay" und Claw-Eval-Live (66,7%) zeigen den Brownfield-/Real-World-Bruch.
- **Rework/Churn/Slop:** 110K-PR-Studie (höhere Churn, niedrigere Survival), SlopCodeBench, ISSRE-2025 (mehr High-Risk-Vulns), "cognitive debt" (Zechner), "lack of laziness" (Cantrill).
- **Makro-Paradox:** Forecasting Research Institute — nur ~1pp BIP bis 2030; Greber/Schweiz — 88% Adoption, aber 41% CEOs ohne ROI.
- **Kosten als Gegengewicht:** Uber "harder to justify"; Compound-Error-Mathematik (95%/Schritt → ~8% über 50 Schritte); Subscription-vs-API-Gap (Willison $2.180 vs $200).
- **Vendor-eigene Zahlen:** Salesforce (+79% PRs, ~18×) und Google (~75% Code, 6×) sind First-Party und unauditiert; "75% AI-generiert" ist eine Volumen-Anteilszahl, kein Produktivitätsfaktor.
- **Tool-Stabilität:** Claude-Code-Regression (Harness-Bugs) zeigt, dass Produktivitäts-Tools wochenlang still degradieren können.

## Verwendbarkeit (Hinweis für die Konsolidierung)
- **Stark belegt:** Die Spannung "gemessen vs. wahrgenommen" (METR-RCT + Follow-up + Self-Survey, alle online verbatim verifiziert) und der "Throughput-rauf-Stabilität-runter"-Befund (DORA 2025/2026, online verifiziert) — diese tragen eine ehrliche, zweiseitige Darstellung.
- **Stark, aber qualifiziert:** Enterprise-Gewinnzahlen (Salesforce +79%/~18×, Google ~75%/6×) sind First-Party und unauditiert; als Obergrenze/Best-Case zitierbar, nicht als gemessener Durchschnitt. "75% AI-generiert" ist Volumen, kein Produktivitäts-Multiplikator.
- **Dünn / vorsichtig behandeln:** Mizuho ~70% (Einzelquelle/Digest), Salnikov ~500 PRs/Woche & ~53% Coverage (Einzelquelle, LinkedIn), "Constraint Decay" (arXiv-ID nicht im Archiv), Claw-Eval-Live 66,7% (nicht einzeln verifiziert) — als illustrativ, nicht als harte Belege führen.
- **Disambiguierung nötig:** Das arXiv-"55%" (Latenzreduktion, Sun & Lin) NICHT mit "55% schnellere Entwickler" verwechseln; die METR-Self-Survey-Zahlen (1,3×→2,0×→2,5×) sind Selbstbericht, NICHT die RCT — beide klar trennen.
