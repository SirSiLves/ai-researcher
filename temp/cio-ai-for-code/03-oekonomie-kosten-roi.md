# Ökonomie, Kosten & ROI

_Belegsammlung (Rohmaterial für spätere CIO-Konsolidierung). Stichtag Archiv: 2026-06-03. Neutral, vollständig, jede Zahl mit Quelle + Verifizierungsstatus._

## Worum es geht

Dieser Cluster sammelt die ökonomische Faktenlage rund um KI-/Agenten-gestützte Softwareentwicklung: wie sich Inferenz- und Token-Preise entwickeln, welche Kosten pro Task/Agent-Lauf und pro Seat real anfallen, wie sich Pricing-Modelle (von Flatrate zu nutzungs-/verbrauchsbasiert) verschieben, welche Ersparnis Modell-Routing bringt, wie die Hardware-Cost-Curve (NVIDIA Rubin, TPUs, Inferenz-Silizium) verläuft, und welche Umsatz-Run-Rates, Bewertungen und ROI-Belege es gibt. Die Evidenz kann CIO-Fragen adressieren wie: Was kostet agentisches Coding pro Entwickler/Monat? Wohin laufen Token-Preise? Sind die ROI-Zahlen belastbar? Welche Pricing-Risiken (Meter-Shock, Subventionsende) drohen? Die Sammlung enthält bewusst sowohl stützende als auch widersprechende Datenpunkte.

## Befunde

### Anthropic startet IPO-Uhr (vertrauliche S-1) — erstes Frontier-Lab am Public Market
- **Befund:** Anthropic reichte am 1. Juni 2026 vertraulich einen S-1-Entwurf bei der SEC ein — erstes Frontier-Lab, das die IPO-Uhr startet — Tage nach der $65 Mrd./$965 Mrd. Series H; OpenAI gilt als Wochen dahinter mit September-Listing-Ziel über $1 Bio. Partner-Network (40.000+ Firmen, 10.000+ zertifizierte Berater) als Umsatz-Gerüst.
- **Originalquelle:** SEC-Filing-Reporting · 2026-06-01 · zusammengefasst in weekly W23
- **Fundstelle:** weekly/2026/2026-W23.md → IPO countdown; daily/2026/06/2026-06-01.md
- **Datum:** 2026-06-01
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Kontext
- **Notiz:** Erster echter Public-Market-Test von Frontier-Lab-Ökonomie.

### GitHub Copilot: Umstellung aller Pläne auf nutzungsbasierte "AI Credits" (Ende des Flatrate-Abos)
- **Befund:** GitHub Copilot stellte zum 1. Juni 2026 alle Pläne auf nutzungsbasierte "AI Credits" um (1 Credit = $0,01), abgerechnet gegen modellspezifische Token-Raten; Pro+ enthält $39/Monat Credits, Business bleibt $19/User mit $19 Credits, Enterprise $39/User mit $39 Credits. Code-Completions/Next-Edit bleiben unbegrenzt und unmetered. Ende des Flatrate-Coding-Abos.
- **Originalquelle:** GitHub Blog · 2026-06-01 · https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/ (Ankündigung bereits 2026-04-27)
- **Fundstelle:** daily/2026/06/2026-06-01.md → Top items / Why it matters
- **Datum:** 2026-06-01 (wirksam); 2026-04-27 (Ankündigung)
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Archiv + Online-Primärquelle GitHub Blog bestätigen identische Zahlen)
- **Art:** Beleg
- **Notiz:** Klarstes Signal, dass eskalierende Inferenzkosten die gesamte Coding-Kategorie auf nutzungsbasierte Abrechnung zwingen; "meter shock" als Budgetthema.
- **Zitat:** "the all-you-can-eat AI-coding subscription died today"

### ServiceNow/SAP/Workday metern Agent-Zugriff direkt — Enterprise-Agent-Layer spaltet sich (offen vs. Maut)
- **Befund:** ServiceNow, SAP und Workday metern und berechnen Agent-Zugriff jetzt direkt ("pay to play"); SAP blockiert externe Agents und routet alles durch die eigene Joule-Schicht (API-Policy v4/2026 §2.2.2), ServiceNow öffnet via GA-MCP-Server (Action Fabric) für jeden Agent. Datenbesitz wird zur Pricing-Macht über den Agent-Stack.
- **Originalquelle:** Reporting / Vendor-Policies · 2026-06-01/03 · zusammengefasst in daily/weekly; Dave Medd "The Tollbooth Appears" (LinkedIn) · 2026-06-03
- **Fundstelle:** daily/2026/06/2026-06-01.md (Zeile 12+39); weekly/2026/2026-W23.md → enterprise-agent layer fractures; daily/2026/06/2026-06-03.md
- **Datum:** 2026-06-01 / 2026-06-03
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert (Vendor-Policies/Reporting)
- **Art:** Kontext
- **Notiz:** "Wer die System-of-Record-Daten besitzt, entscheidet, welchen Agent-Stack du nutzen darfst — und berechnet ihn dir."
- **Zitat:** "ServiceNow, SAP and Workday are now metering agent access outright"

### Uber deckelt AI-Coding-Tools bei $1.500/Monat pro Mitarbeiter und Tool
- **Befund:** Uber deckelt AI-Coding-Tools (z.B. Claude Code) bei $1.500/Monat pro Mitarbeiter und pro Tool, um Kosten zu steuern — früher, konkreter Datenpunkt, dass agentischer Token-Spend zur Enterprise-Budgetlinie wird, nicht zum Rundungsfehler.
- **Originalquelle:** Simon Willison (Link-Blog) · 2026-06-03 · https://simonwillison.net/2026/Jun/3/uber-caps-usage/
- **Fundstelle:** blogs/2026/06/2026-06-03.md → Blog picks; radar/2026/06/2026-06-03.md → Top topic; hackernews/2026/06/2026-06-03.md
- **Datum:** 2026-06-03 (neuestes Datum im Archiv)
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Macht Pro-Seat-Cap als Kostenkontroll-Mechanismus greifbar.
- **Zitat:** "Uber's $1,500/month AI limit is a useful signal for AI tool pricing"

### "Compliance bias" in RLHF-Agents (Abstention-Kompetenz fehlt in Benchmarks) — NEU seit Stichtag
- **Befund:** Paper "What Benchmarks Don't Measure" benennt "compliance bias": RLHF-trainierte Agents tendieren strukturell dazu, weiterzumachen, auch ohne ausreichende Inputs/Evidenz/Autorisierung; Evaluationen müssten messen, ob ein Agent überhaupt hätte handeln sollen.
- **Originalquelle:** Victor Ojewale, Suresh Venkatasubramanian · 2026-06-03 · arXiv:2606.02965
- **Fundstelle:** papers/2026/06/2026-06-03.md → Picks; weekly/2026/2026-W23.md → Notable papers
- **Datum:** 2026-06-03
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext (qualitatives Risiko, kostennah über fehlgeleitete Agent-Läufe)
- **Notiz:** Relevant für Kosten/ROI indirekt: Agenten, die "trotzdem handeln", erzeugen Token-Burn ohne Wert.

### Microsoft Project Polaris ersetzt GPT-4 Turbo als Copilot-Default (eigenes Silizium)
- **Befund:** Microsoft kündigte auf Build 2026 "Project Polaris" an — ein eigenes Coding-Modell auf Maia-200-Silizium, das GPT-4 Turbo bis August 2026 als Default-Engine im GitHub Copilot für ALLE Abonnenten ersetzt (automatische Migration, optionaler 3-Monats-Fallback).
- **Originalquelle:** Microsoft Build 2026 (Satya Nadella) · 2026-06-02 · https://chatforest.com/builders-log/microsoft-build-2026-recap-windows-agent-platform-project-polaris-copilot-workspace/
- **Fundstelle:** daily/2026/06/2026-06-02.md → Top-5 / Major news; weekly/2026/2026-W23.md
- **Datum:** 2026-06-02
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Kontext (Cost-Engineering: First-Party-Modell auf eigenem Silizium statt Drittanbieter-API)
- **Notiz:** Zeigt vertikale Integration als Kostenhebel auf der Plattformseite.
- **Zitat:** "replace GPT-4 Turbo as the default GitHub Copilot engine for every subscriber by August 2026"

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

### Anthropic Q2 2026: erstes profitables Quartal, $10,9 Mrd. Umsatz, Compute-zu-Umsatz 71¢→56¢
- **Befund:** Anthropic Q2 2026: $10,9 Mrd. Umsatz (+130% QoQ, größer als ganz 2025), $559 Mio. operativer Gewinn — erstes profitables Quartal; Compute-zu-Umsatz-Verhältnis verbesserte sich von 71¢ auf 56¢; annualisierte Run-Rate $43,6 Mrd. zum Q2-Ende vs. ~$9 Mrd. Ende 2025; >$50 Mrd. bis Ende Juni erwartet; $1M+/Jahr-Kunden verdoppelten sich von 500 auf über 1.000 (Feb–Apr).
- **Originalquelle:** Wall Street Journal (CNBC-Erstmeldung 20. Mai) · 2026-05-22 · https://www.wsj.com/tech/ai/anthropic-projects-record-revenue-and-first-quarterly-operating-profit
- **Fundstelle:** daily/2026/05/2026-05-22.md → Top item 2; weekly/2026/2026-W21.md; news/2026/05/2026-05-22.md
- **Datum:** 2026-05-22
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Profitabilität Jahre früher als der Konsens (bis 2028 defizitär) erwartete; gleichzeitig $1,25 Mrd./Monat Compute an SpaceX.
- **Zitat:** "compute-to-revenue ratio improved 71¢ → 56¢"

### Anthropic Series H: $65 Mrd. bei ~$965 Mrd. Bewertung — überholt OpenAI
- **Befund:** Anthropic schloss eine $65 Mrd. Series H bei ~$965 Mrd. Bewertung ab (Altimeter/Dragoneer/Greenoaks/Sequoia) — ~3× der $380 Mrd.-Marke vom Februar, auf gemeldeter ~$47 Mrd. Umsatz-Run-Rate (stark Claude-Code-getrieben), überholt OpenAI als wertvollstes AI-Startup; faltet $15 Mrd. bereits zugesagtes Geld ein (inkl. $5 Mrd. Amazon); gilt als letzte Privatrunde vor dem IPO.
- **Originalquelle:** Bloomberg / Reporting · 2026-05-31 (W22)
- **Fundstelle:** weekly/2026/2026-W22.md → Anthropic raises $65B; weekly/2026/2026-W23.md
- **Datum:** 2026-05-31
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Cap-Table statt Benchmark entscheidet die Lab-Hierarchie.
- **Zitat:** "$65B Series H at $965B post-money, overtaking OpenAI"

### Salesforce Q1 FY27: Agentforce über $1 Mrd. ARR (+205% YoY) [Zahl korrigiert: 28,6T Tokens]
- **Befund:** Salesforce Q1 FY27: Agentforce allein $1,2 Mrd. ARR (+205% YoY), 3,8 Mrd. Agentic Work Units (+111% QoQ), 28,6 Bio. (Trillion, T) Tokens (+152% QoQ) — erster sauberer Tier-1-SaaS-Datenpunkt über $1 Mrd. ARR.
- **Originalquelle:** Salesforce Q1 FY27 Earnings · 2026-05-28 (W22) · https://www.salesforce.com/news/stories/summer-2026-product-release-announcement/
- **Fundstelle:** weekly/2026/2026-W22.md → Enterprise agent revenue crosses $1B (Zeile 40)
- **Datum:** 2026-05-28
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** korrigiert: Token-Einheit — "28.6T tokens" sind 28,6 Billionen (Trillion), NICHT 28,6 Milliarden (Billion); Originalwert beibehalten und Einheit klargestellt.
- **Art:** Beleg
- **Notiz:** Erster harter Milliarden-ARR-Datenpunkt eines Tier-1-SaaS für Agent-Umsatz.
- **Zitat:** "Agentforce alone at $1.2B ARR (+205% YoY) ... 28.6T tokens"

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

### Cognition $1 Mrd.+ bei ~$26 Mrd.; Fireworks/Baseten/Cursor — Inferenz-Infra wird wie SaaS bepreist
- **Befund:** Cognition (Devin) raiste $1 Mrd.+ bei ~$26 Mrd. ($492M ARR; 2,5× in 8 Monaten; 50% MoM Enterprise-Devin-Wachstum über sechs Monate; Mercedes-Benz/NASA/Goldman/Santander als Käufer); Fireworks ($15 Mrd.) und Baseten ($11 Mrd.) bepreisen Inferenz-Infra wie SaaS-plus-Data-Cloud; zweiter autonome-Coding-Bewertungs-Reset binnen 30 Tagen nach Cursor ($50 Mrd.).
- **Originalquelle:** TechCrunch / Bloomberg · 2026-05-27 · https://techcrunch.com/2026/05/27/ai-coding-startup-cognition-raises-1b-at-25b-pre-money-valuation/
- **Fundstelle:** weekly/2026/2026-W22.md → Enterprise agent revenue / Cognition; daily/2026/05/2026-05-27.md → Top-5
- **Datum:** 2026-05-27/28
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Cognition-Zahlen); Fireworks/Baseten-Bewertungen: nicht einzeln verifiziert
- **Art:** Beleg / Kontext
- **Notiz:** Kapital bepreist autonome-Coding- und Inferenz-Infra-Firmen wie SaaS.
- **Zitat:** "Cognition raised $1B+ at ~$26B (2.5× in 8 months)"

### Simon Willison: PMF der Coding-Agents; Eigennutzung ~$2.180/Monat zu API-Raten vs. $200 Abo
- **Befund:** Beide Labs verschoben Enterprise-Pläne still auf volle API-Preise (GPT-5.5 = 2× GPT-5.4, Opus 4.7 ~1,4× Opus 4.6); Willisons eigene Nutzung hätte ~$2.180/Monat zu API-Raten gekostet vs. $200 im Abo — Coding-Agents als erstes Produkt mit echtem Umsatzhebel; April 2026 als PMF-Inflektion.
- **Originalquelle:** Simon Willison, "I think Anthropic and OpenAI have found product-market fit" · 2026-05-27 · https://simonwillison.net/2026/May/27/product-market-fit/
- **Fundstelle:** blogs/2026/05/2026-05-31.md (Zeile 7); weekly/2026/2026-W22.md → Long-form reads; weekly/2026/2026-W23.md
- **Datum:** 2026-05-27
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Subvention-vs-API-Kluft) / Kontext
- **Notiz:** Quantifiziert die Kluft zwischen Abo-Subvention und echten API-Kosten.
- **Zitat:** "his own usage ~$2,180/mo at API rates vs $200 in subs"

### NVIDIA Rekordquartal $81,6 Mrd.; Vera-Rubin verspricht bis zu 10× günstigere Inferenz
- **Befund:** NVIDIA meldete Rekordquartal $81,6 Mrd. (+85% YoY), Data-Center-Umsatz $75,2 Mrd. (+92%), $500 Mrd. Blackwell/Rubin-Pipeline bis Ende 2026; die neue Vera-Rubin-Plattform verspricht bis zu 10× günstigere Inferenz-Token-Kosten vs. Blackwell (AWS/Google Cloud/Azure/OCI als erste Deployer).
- **Originalquelle:** NVIDIA Earnings · ~2026-05-27 (W23)
- **Fundstelle:** weekly/2026/2026-W23.md → NVIDIA record quarter / Why it matters
- **Datum:** 2026-05-27
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Hardware-Cost-Curve)
- **Notiz:** Angebotsseitiges Argument; Rubin-Ökonomie resettet die Cost-per-Token-Baseline.
- **Zitat:** "a Vera Rubin platform promising up to 10× cheaper inference"

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

### Maxim Salnikov: ~24× Kostenlücke Opus 4.7 vs. GPT-5.4 mini — Modell-Routing als Kostenhebel
- **Befund:** Maxim Salnikov (Microsoft/GitHub): ~24× Kostenlücke zwischen Claude Opus 4.7 und GPT-5.4 mini — Modell-Routing (Reasoning-Modelle für Planung, Mid-Tier für Implementierung, kleine Modelle für Refactors; Auto Mode kommt im Juni) und relevanter Kontext als zwei größte Kostenhebel. Compound-Error: 99% Genauigkeit/Schritt über 50 Schritte = ~60% Erfolg; 95% = ~8%. Copilot-CLI-Team liefert ~500 PRs/Woche bei ~53% Test-Coverage.
- **Originalquelle:** Maxim Salnikov (Microsoft/GitHub), LinkedIn · 2026-05-28 · https://www.linkedin.com/pulse/practitioners-guide-getting-more-value-out-ai-coding-agent-salnikov-mhume/
- **Fundstelle:** linkedin/2026/05/2026-05-28.md (Zeile 29)
- **Datum:** 2026-05-28
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert (Einzelquelle/Praktiker-LinkedIn)
- **Art:** Beleg (Modell-Routing-Ersparnis)
- **Notiz:** Operativster Token-Ökonomie-Leitfaden; Modellwahl als ~24×-Hebel quantifiziert.
- **Zitat:** "~24× cost gap between Claude Opus 4.7 and GPT-5.4 mini"

### Anthropic Claude Opus 4.8: 88,6% SWE-bench bei unverändertem $5/$25; ~3× günstigerer Fast-Mode
- **Befund:** Claude Opus 4.8 (Mai 2026): 88,6% SWE-bench Verified, 74,6% Terminal-Bench 2.1, 93,6% GPQA Diamond bei unverändertem $5/$25-Preis; 2,5×-schnellerer/~3×-günstigerer Fast-Mode; "dynamic workflows" starten zehn-bis-hunderte parallele Subagenten in einer Session.
- **Originalquelle:** Anthropic, Claude Opus 4.8 Launch · 2026-05-28/29
- **Fundstelle:** weekly/2026/2026-W22.md → Releases tilt to cheap-and-fast; monthly/2026/2026-05.md
- **Datum:** 2026-05-28
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Preis-stabil bei steigender Capability + günstigerer Fast-Mode)
- **Notiz:** Per-Token-Preis bleibt konstant, während Fast-Mode-Kosten sinken.
- **Zitat:** "88.6% SWE-bench Verified ... a 2.5×-faster / ~3×-cheaper fast mode"

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

### SpaceX S-1: Anthropic zahlt $1,25 Mrd./Monat (~$45 Mrd. gesamt) für Colossus 1
- **Befund:** SpaceX' S-1 legte den größten je öffentlich gemachten Einzelkunden-Compute-Vertrag offen: Anthropic zahlt $1,25 Mrd./Monat bis Mai 2029 (~$45 Mrd. gesamt) für die volle Ausgabe von Colossus 1 (220k+ NVIDIA-GPUs, 300 MW, Memphis); Colossus 2 GB200-Ramp bis Juni.
- **Originalquelle:** SpaceX S-1 / Axios / TechCrunch · 2026-05-20 · https://techcrunch.com/2026/05/20/anthropic-will-pay-xai-1-25-billion-per-month-for-compute/
- **Fundstelle:** daily/2026/05/2026-05-22.md → Top item 2; weekly/2026/2026-W21.md
- **Datum:** 2026-05-20
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Kontext (rohe Compute-Kostenbasis eines Frontier-Labs)
- **Notiz:** Erstmals in einem SEC-Filing sichtbare Compute-Kostenbasis.
- **Zitat:** "$1.25B/month through May 2029 (~$45B total) for the full output of Colossus 1"

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

### SemiAnalysis "AI Value Capture": Inferenz-Bruttomargen 38%→70%+ trotz 3× Preissenkung
- **Befund:** Anthropic ARR $9 Mrd. → $44 Mrd.+; Inferenz-Bruttomargen 38% → 70%+, obwohl Opus 4.5 die Per-Token-Preise 3× senkte ($15/$75 → $5/$25) via Hopper→Blackwell + Trainium-Software-Gewinne + Per-Token-Kostenkollaps.
- **Originalquelle:** SemiAnalysis, "AI Value Capture — The Shift To Model Labs" · 2026-05-15 · https://newsletter.semianalysis.com/p/ai-value-capture-the-shift-to-model
- **Fundstelle:** weekly/2026/2026-W21.md → Long-form reads; blogs/2026/05/2026-05-15.md
- **Datum:** 2026-05-15
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Token-Ökonomie: fallende Preise UND steigende Margen)
- **Notiz:** Token-Ökonomie (nicht nur Architektur) treibt die Wertschöpfung.
- **Zitat:** "inference gross margins 38% → 70%+ despite Opus 4.5 cutting per-token prices 3×"

### SemiAnalysis-Eigenangaben: Token-Spend ~30% der Mitarbeitervergütung (~$10,95 Mio./Jahr)
- **Befund:** SemiAnalysis beziffert den annualisierten Claude-Token-Spend des eigenen Hauses auf ~$10,95 Mio.; Token-Spend ist ~30% der Mitarbeitervergütung; N3- + DRAM-Fab-Auslastung über 90% gepinnt — Wert konzentriert sich in den Modell-Labs, nicht in der Cloud-Schicht.
- **Originalquelle:** SemiAnalysis · 2026-05-15 · https://newsletter.semianalysis.com/p/ai-value-capture-the-shift-to-model
- **Fundstelle:** blogs/2026/05/2026-05-15.md (Zeile 6); daily/2026/05/2026-05-15.md
- **Datum:** 2026-05-15
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert (Eigenangabe SemiAnalysis, Einzelquelle)
- **Art:** Kontext (Kostenstruktur-Datenpunkt)
- **Notiz:** Token-Spend erreicht ~30% der Personalkosten — radikale Neugewichtung der Kostenstruktur.
- **Zitat:** "token spend is ~30% of employee comp"

### Cerebras-IPO: ~$70 Mrd. Marktkapitalisierung — größter US-Tech-IPO 2026
- **Befund:** Cerebras-IPO: bepreist 13. Mai $185/Aktie (~$56 Mrd. fully-diluted, ~20× überzeichnet, $5,55 Mrd. Erlös), eröffnete 14. Mai bei $350, schloss $311 auf ~$70 Mrd. Marktkapitalisierung — größter US-Tech-IPO 2026; +25% Re-Rating der Inferenz-These über dem Buch am Tag 1. S-1 (April) nannte $20 Mrd.+ OpenAI-MRA für 750 MW.
- **Originalquelle:** Cerebras IPO / Reporting · 2026-05-14 (W20); S-1 2026-04-17 (W16)
- **Fundstelle:** weekly/2026/2026-W20.md → Cerebras priced→traded; weekly/2026/2026-W16.md
- **Datum:** 2026-05-14
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext (Inferenz-Hardware-Bewertung)
- **Notiz:** Disaggregierte-Inferenz/Non-NVIDIA-These ist nun Public-Market-Kapital.
- **Zitat:** "opens at $350 ... closes $311 on ~$70B market cap — largest US tech IPO of 2026"

### METR-Selbstbericht-Umfrage: gefühlter Arbeitswert 1,3× (2025) → 2,0× (2026) → 2,5× (2027 Prognose)
- **Befund:** METR-Selbstbericht-Umfrage: 349 technische Fachkräfte beziffern den "Wert ihrer Arbeit" auf 1,3× (März 2025) → 2,0× (März 2026) → Prognose 2,5× (März 2027).
- **Originalquelle:** METR · 2026-05-11 · https://metr.org/blog/2026-05-11-ai-usage-survey/
- **Fundstelle:** news/2026/05/2026-05-19.md → LinkedIn/Items section
- **Datum:** 2026-05-11
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Existenz/Zahlen), aber SELBSTBERICHTET — nicht die randomisierte METR-Kontrollstudie; Eigeneinschätzung, tendenziell optimistisch
- **Art:** Beleg (ROI-Selbsteinschätzung) — mit klarer Methodik-Einschränkung
- **Notiz:** Selbstberichtete Werte; abzugrenzen vom METR-RCT (siehe Gegenevidenz unten).

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

### Microsoft Q3 FY26: >20 Mio. Copilot-Seats (+75% sequentiell), AI-Run-Rate >$37 Mrd.
- **Befund:** Microsoft Q3 FY26: $82,9 Mrd. Umsatz +18%, Azure +40%, Copilot for M365 zahlende Seats +75% sequentiell auf >20 Mio. (~15 Mio. Nutzer in 80% der Fortune 500), AI-Run-Rate >$37 Mrd. (+123% YoY), CY26-Capex ~$190 Mrd.
- **Originalquelle:** Microsoft Q3 FY26 Earnings (CFO Amy Hood) · 2026-04-29 (W18) · https://news.microsoft.com/source/2026/04/29/microsoft-cloud-and-ai-strength-fuels-third-quarter-results/
- **Fundstelle:** weekly/2026/2026-W18.md → Microsoft Q3 FY26; daily/2026/04/2026-04-29.md
- **Datum:** 2026-04-29
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Per-Seat-Wachstum als Gegenpol zu "per-seat stirbt")
- **Notiz:** Per-Seat-Copilot-Wachstum + $37 Mrd. AI-Run-Rate; Capex-Boden $190 Mrd./Jahr.
- **Zitat:** "Copilot for M365 paid seats up 75% sequential to >20M ... AI run-rate >$37B"

### Anthropic mobilisiert ~$45 Mrd.+ Equity + ~8,5 GW Compute in 96 Stunden
- **Befund:** Anthropic mobilisierte in 96 Stunden (20.-24. April) ~$45 Mrd.+ zugesagtes Eigenkapital und ~8,5 GW Multi-Cloud-Compute: Amazon $5 Mrd. Equity bei $350 Mrd. + bis $20 Mrd. milestone + $100 Mrd. AWS-Spend/10 Jahre + 5 GW; Google bis $40 Mrd. ($10 Mrd. jetzt + $30 Mrd. contingent) + 5 GW; Broadcom 3,5 GW TPU bis 2027.
- **Originalquelle:** Anthropic / Reporting · 2026-04-20 bis 2026-04-24 (W17)
- **Fundstelle:** weekly/2026/2026-W17.md → ~$45B+ capital and ~8.5GW; monthly/2026/2026-04.md
- **Datum:** 2026-04-24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext (Kapitalbildung Frontier-AI)
- **Notiz:** Kapitalbildungsregime verschiebt sich Richtung "nationale Infrastruktur".
- **Zitat:** "~$45B+ committed equity and ~8.5GW of multi-cloud compute in 96 hours"

### SemiAnalysis: wahrer geblendeter Opus-4.7-Preis ~$0,99/MTok (trotz $5/$25-Sticker)
- **Befund:** SemiAnalysis beziffert den "wahren" geblendeten Preis für Opus 4.7 auf agentischen Coding-Tasks auf ~$0,99 pro Mio. Token — trotz Sticker-Preis $5/$25 — weil reale Coding-Workloads ein ~300:1 Input:Output-Verhältnis und >90% Cache-Hit-Rate haben.
- **Originalquelle:** SemiAnalysis, "The Coding Assistant Breakdown: More Tokens Please" · 2026-04-24 · https://newsletter.semianalysis.com/p/the-coding-assistant-breakdown-more
- **Fundstelle:** daily/2026/04/2026-04-24.md → Top item 5; weekly/2026/2026-W17.md
- **Datum:** 2026-04-24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Sticker-Preis ≠ effektiver Preis)
- **Notiz:** Caching + asymmetrisches I/O drücken die effektiven Kosten um ~5×.
- **Zitat:** "true blended Opus 4.7 price lands at ~$0.99 per Mtok despite the $5/$25 sticker"

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

### Google Cloud Next: 8th-gen-TPU-Split (Training vs. Inferenz); Google Cloud $70 Mrd./48%
- **Befund:** Google Cloud Next: 8th-gen-TPU-Split — TPU 8t "Sunfish" (Broadcom, Training, 2,7× perf/$) + TPU 8i "Zebrafish" (MediaTek, Inferenz, 80% perf/$, low-latency MoE), beide auf TSMC 2nm, Ende 2027; Ironwood (TPU 7x) GA mit 4,6 PFLOPS/Chip, 42,5 EFLOPS im 9.216-Chip-Superpod. Google Cloud: $70 Mrd. Jahresumsatz bei 48% Wachstum, $240 Mrd. Backlog, 75% AI-generierter Code intern.
- **Originalquelle:** Google Cloud Next 2026 (Pichai Keynote) · 2026-04-21 (W17)
- **Fundstelle:** weekly/2026/2026-W17.md → Google Cloud Next 2026 + 8th-gen TPU split
- **Datum:** 2026-04-21
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext (Inferenz-Cost-Engineering auf Silizium-Ebene)
- **Notiz:** Silizium bifurkiert zwischen schwerem Training und ultra-effizienter Inferenz.
- **Zitat:** "TPU 8i 'Zebrafish' (MediaTek, inference, 80% perf/$ ...)"

### Anthropic ARR-Trajektorie überholt OpenAI ($87M Jan 2024 → $30 Mrd. Apr 2026)
- **Befund:** Anthropic Q2-ARR-Trajektorie: $87M Jan 2024 → $1 Mrd. Dez 2024 → $9 Mrd. Ende 2025 → $14 Mrd. Feb → $19 Mrd. März → $30 Mrd. April (vs. OpenAIs ~$25 Mrd.); $1M+/Jahr-Kunden verdoppelten sich von ~500 auf >1.000 in zwei Monaten. OpenAI bestreitet ~$8 Mrd. an Brutto-Umsatzbuchung.
- **Originalquelle:** Anthropic-Disclosure / Reporting · 2026-04-07 (W15) bzw. 2026-04-01 (W14)
- **Fundstelle:** weekly/2026/2026-W15.md → Anthropic crosses $30B ARR; weekly/2026/2026-W14.md
- **Datum:** 2026-04-07
- **Status ggü. bisherigem Stand:** aktualisiert (Vorläufer der späteren $43,6/$47 Mrd. Run-Rate)
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg (Revenue-Run-Rate-Kurve)
- **Notiz:** Liefert die volle Wachstumskurve, die die spätere Run-Rate kontextualisiert.
- **Zitat:** "$87M Jan 2024 → $1B Dec 2024 → $9B end 2025 → $14B Feb → $19B Mar → $30B Apr"

### Claude Code: $2,5 Mrd.+ annualisiert [Zahl/Datierung korrigiert]
- **Befund:** Claude Code bei $2,5 Mrd.+ annualisiert, "most-attacked product surface in enterprise AI"; treibt Anthropic-Run-Rate ($43,6 Mrd. zum Q2-Ende, Erwartung >$50 Mrd. Ende Juni, später ~$47 Mrd. in W22 bestätigt).
- **Originalquelle:** WSJ / Bloomberg Reporting · 2026-05-21 (W21) / W22
- **Fundstelle:** weekly/2026/2026-W21.md → TL;DR (Zeile 32/39); weekly/2026/2026-W22.md → week in 90 seconds
- **Datum:** 2026-05-21
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** korrigiert: die ~$47 Mrd. Run-Rate erscheint in W22 (25.-31. Mai), nicht in W21; W21 nennt $43,6 Mrd. zum Q2-Ende und Erwartung >$50 Mrd. Ende Juni. $2,5 Mrd.+ Claude-Code-Wert bestätigt.
- **Art:** Beleg (Coding-Produkt-Umsatz)
- **Notiz:** $2,5 Mrd.+ verankert Claude Code als reales Produktgeschäft.
- **Zitat:** "Claude Code is at $2.5B+ annualized, the most-attacked product surface in enterprise AI"

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

### OpenAI schließt $122 Mrd.-Runde bei $852 Mrd. Post-Money; $2 Mrd./Monat Umsatz
- **Befund:** OpenAI schloss am 31. März die größte Privatrunde der Geschichte: $122 Mrd. bei $852 Mrd. Post-Money; bestätigte $2 Mrd./Monat Umsatz (~$24-25 Mrd. annualisiert), 900 Mio. wöchentliche ChatGPT-Nutzer, Enterprise >40% des Umsatzes, IPO "as soon as late 2026".
- **Originalquelle:** OpenAI / Reporting · 2026-03-31 (W14)
- **Fundstelle:** weekly/2026/2026-W14.md → OpenAI closes $122B round
- **Datum:** 2026-03-31
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext (Finanzierungsdecke / Run-Rate)
- **Notiz:** Setzt die Finanzierungsdecke; explizit für Compute-Capex bis 2028 getaggt.
- **Zitat:** "$122B round at an $852B post-money valuation"

### Mistral Voxtral TTS: $0,016 pro 1.000 Zeichen (~10× unter ElevenLabs)
- **Befund:** Mistral Voxtral TTS (open-weights, 4B Parameter, 9 Sprachen, 3-Sek-Voice-Cloning) zu $0,016 pro 1.000 Zeichen — ~10× günstiger als ElevenLabs bei laut früher Bewertung Paritätsqualität.
- **Originalquelle:** Mistral · 2026-03-26 · https://mistral.ai/news/voxtral
- **Fundstelle:** daily/2026/03/2026-03-26.md → Top item 2; news/2026/03/2026-03-26.md; monthly/2026/2026-03.md
- **Datum:** 2026-03-26
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg (offene Modelle unterbieten proprietäre Inferenz-Ökonomie ~10×)
- **Notiz:** Konkretes ~10×-Cost-Down-Beispiel im Voice-Stack.
- **Zitat:** "$0.016 per 1,000 chars (~10× under ElevenLabs at parity quality)"

### OpenAI retirt Sora auf Unit-Economics-Gründen (~$1 Mio./Tag Compute)
- **Befund:** OpenAI retirte Sora (App+API) auf Unit-Economics-Gründen: ~$1 Mio./Tag Compute gegen eine Nutzerbasis, die von ~1 Mio. auf <500K aktive fiel; Compute wird zu Coding-/Enterprise-Produkten mit planbarerem Umsatz umgeleitet. Erster explizit kostengetriebener Consumer-AI-Produktrückzug eines Frontier-Labs.
- **Originalquelle:** OpenAI Help Center · 2026-03-24 · https://help.openai.com/en/articles/20001152-what-to-know-about-the-sora-discontinuation
- **Fundstelle:** daily/2026/03/2026-03-24.md → Top item 1; monthly/2026/2026-03.md
- **Datum:** 2026-03-24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext (Vendor investieren, wo Unit-Economics funktionieren — Coding/Enterprise)
- **Notiz:** Setzt das Q2-Muster: investieren wo Unit-Economics funktionieren, retiren wo nicht.
- **Zitat:** "~$1M/day in compute against a base that fell from ~1M to <500K actives"

### GPT-5.4 nano: $0,20/$1,25 pro Mio. — 76.000 Fotos für $52 (Subagent-Ökonomie)
- **Befund:** GPT-5.4 nano läuft zu $0,20/$1,25 pro Mio. Token (In/Out), API-only — Willisons Rechnung: ~76.000 Fotos für $52 beschriftbar; "Beweis der Ökonomie" für die These kleiner Modelle als Agent-Worker/Subagents.
- **Originalquelle:** Simon Willison · 2026-03-17 · https://simonwillison.net/2026/Mar/17/mini-and-nano/
- **Fundstelle:** daily/2026/03/2026-03-17.md → Read this first / Top item 1
- **Datum:** 2026-03-17
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg (Kosten-pro-Task für Subagent-Workloads)
- **Notiz:** Konkretes Kosten-pro-Aufgabe-Beispiel für Subagent-Workloads.
- **Zitat:** "GPT-5.4 nano ... can describe 76,000 photos for $52"

### NVIDIA GTC: Vera Rubin (~5× Blackwell-Inferenz, ~10× niedrigere Kosten/Token; ~$1 Bio. Auftragsbuch)
- **Befund:** NVIDIA GTC (16. März): Vera Rubin (Rubin R100, 336B Transistoren + 88-Core Vera CPU) mit ~5× Blackwell-Inferenz bei ~10× niedrigeren Kosten pro Token; ~$1 Bio. Blackwell+Rubin-Auftragsbuch-Prognose bis 2027.
- **Originalquelle:** NVIDIA GTC 2026 Keynote (Jensen Huang) · 2026-03-16 · via Stratechery/SemiAnalysis
- **Fundstelle:** monthly/2026/2026-03.md; weekly/2026/2026-W12.md → NVIDIA GTC; daily/2026/03/2026-03-16.md
- **Datum:** 2026-03-16
- **Status ggü. bisherigem Stand:** bestätigt (frühester Ankerpunkt der 10×-Rubin-Story)
- **Verifizierung:** confirmed
- **Art:** Beleg (Hardware-Cost-Curve)
- **Notiz:** Setzt den Cost-per-Token-Boden, an dem sich H2-Pricing orientiert.
- **Zitat:** "~5× Blackwell inference at ~10× lower cost/token"

### NVIDIA Rubin (offizielle Pressemitteilung): bis zu 10× niedrigere Token-Kosten, 4× weniger GPUs für MoE-Training
- **Befund:** NVIDIA Rubin (Vera Rubin) platform: bis zu 10× niedrigere Kosten pro Token und bis zu 5× höhere Inferenz-Performance vs. Blackwell, mit 4× weniger GPUs zum Training von MoE-Modellen; verfügbar 2. Halbjahr 2026.
- **Originalquelle:** NVIDIA Newsroom (offizielle Pressemitteilung) · 2026-01-05 · https://nvidianews.nvidia.com/news/rubin-platform-ai-supercomputer
- **Fundstelle:** Online (nicht im Archiv); Tom's Hardware (2026-01-05) bestätigt unabhängig (50 PFLOPS NVFP4-Inferenz)
- **Datum:** 2026-01-05
- **Status ggü. bisherigem Stand:** bestätigt (Primärquelle zur GTC/W23-Story)
- **Verifizierung:** confirmed (Herstellerangabe "up to 10x" — Marketing-Benchmark, kein unabhängiger Test; gilt speziell für MoE-/Reasoning-/Agentic-Inferenz)
- **Art:** Beleg (Hardware-Cost-Curve, Primärquelle)
- **Notiz:** Herstellerangabe; Deployment 2026 durch AWS, Google Cloud, Microsoft, Oracle, CoreWeave u.a.
- **Zitat:** "up to 10x reduction in inference token cost ... 4x reduction in number of GPUs to train MoE models [vs Blackwell]"

### a16z "State of AI" (OpenRouter): Token-Volumen ~10 Bio./Jahr → >100 Bio. (Mitte 2025); Coding größter Treiber
- **Befund:** Token-Volumen wuchs von ~10 Billionen/Jahr auf >100 Billionen Mitte 2025; >1 Billion Tokens/Tag zuletzt. Coding und Creative sind die größten Treiber; günstige Open-Reasoning-Modelle (DeepSeek R1, Kimi K2) gewinnen Anteile durch Kosteneffizienz.
- **Originalquelle:** Andreessen Horowitz (a16z) "State of AI" · 2025-12-04 · https://a16z.com/state-of-ai/
- **Fundstelle:** Online (nicht im Archiv) — OpenRouter-Datenbasis (5+ Mio. Entwickler, 300+ Modelle)
- **Datum:** 2025-12-04
- **Status ggü. bisherigem Stand:** NEU (vor Stichtag, kontextualisierend)
- **Verifizierung:** nicht einzeln verifiziert (Primärquelle a16z; keine expliziten $-pro-Token-Zahlen)
- **Art:** Beleg (Volumenexplosion + Routing zu günstigen Modellen)
- **Notiz:** Coding als größter Token-Treiber; Kostensenkung treibt Nachfrage nach günstigen Modellen.
- **Zitat:** "from handling roughly 10 trillion tokens per year to more than 100 trillion as of mid-2025"

### Epoch AI: LLM-Inferenzpreise für fixes Performance-Niveau fallen ~50× pro Jahr (Median; 9×-900× Spanne)
- **Befund:** LLM-Inferenzpreise für ein fixes Performance-Niveau fallen im Median ~50× pro Jahr (Spanne 9×-900× je Benchmark); seit Jan 2024 sogar ~200×/Jahr Median. GPT-4-Niveau bei PhD-Wissenschaftsfragen (GPQA) wurde 40×/Jahr billiger.
- **Originalquelle:** Epoch AI, "LLM inference prices have fallen rapidly but unequally across tasks" · 2025-03-12 · https://epoch.ai/data-insights/llm-inference-price-trends
- **Fundstelle:** Online (nicht im Archiv) — sechs Benchmarks (MMLU, GPQA Diamond, MATH-500/Level5, HumanEval, Chatbot Arena)
- **Datum:** 2025-03-12
- **Status ggü. bisherigem Stand:** NEU (vor Stichtag, Referenzwert)
- **Verifizierung:** nicht einzeln verifiziert (rigorose unabhängige Quantifizierung; älter, aber Referenz)
- **Art:** Beleg (Kostenkurve, unabhängig)
- **Notiz:** Wichtige Nuance: Verfall ist sehr ungleich verteilt (9× bis 900×).
- **Zitat:** "The rate of decline varies dramatically ... ranging from 9x to 900x per year ... GPT-4's performance ... fell by 40x per year"

### a16z "LLMflation": Kosten für gleiche Leistung sinken 10× pro Jahr ($60 → $0,06 pro Mio. Token)
- **Befund:** Für ein LLM gleicher Leistung sinken die Kosten um 10× pro Jahr. GPT-3-Niveau (MMLU 42) fiel von $60 auf $0,06 pro Mio. Tokens in 3 Jahren = 1000×; GPT-4-Niveau (MMLU 83) ~62× günstiger seit März 2023.
- **Originalquelle:** Andreessen Horowitz (a16z), Guido Appenzeller "Welcome to LLMflation" · 2024-11-12 · https://a16z.com/llmflation-llm-inference-cost/
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2024-11-12
- **Status ggü. bisherigem Stand:** NEU (älteste Quelle, Faustregel)
- **Verifizierung:** nicht einzeln verifiziert (Primärquelle a16z; gilt für FIXES Leistungsniveau, NICHT für Frontier-Modelle — o1 kostet weiterhin ~$60/Mio. Output wie GPT-3 bei Launch)
- **Art:** Beleg (Kostenkurve-Faustregel) — mit wichtigem Caveat
- **Notiz:** "10×/Jahr" gilt nur bei fixem Leistungsniveau; Frontier-Pricing folgt dem nicht.
- **Zitat:** "For an LLM of equivalent performance, the cost is decreasing by 10x every year ... cost $0.06 per million tokens"

## Gegenevidenz / Einschränkungen (in diesem Cluster)

- **METR RCT (randomisiert-kontrolliert):** Erfahrene Open-Source-Entwickler waren mit KI-Tools 19% LANGSAMER (nicht schneller) — obwohl sie vorab 24% Beschleunigung erwarteten und nachher glaubten, 20% schneller gewesen zu sein. 16 Entwickler, 246 Aufgaben, Anfang 2025. (METR / arXiv:2507.09089 · 2025-07-12 · https://arxiv.org/abs/2507.09089). Grenzen: nur 16 Entwickler, reife/komplexe Repos, Modelle Anfang 2025; Studiendesign 2026-02-24 überarbeitet. Stärkste rigorose Gegen-Evidenz zur ROI-Story; Wahrnehmungs-Realitäts-Lücke. _Online, nicht im Archiv._
- **2025 DORA Report (~5.000 Fachleute):** 90% nutzen KI, >80% berichten Produktivitätsgewinn — aber positive Beziehung zu Durchsatz, NEGATIVE zu Liefer-Stabilität; KI als "Verstärker"; 30% misstrauen KI-Code. (Google Cloud Blog · 2025-09-23). Erklärt, warum ROI-Ergebnisse streuen. _Online, nicht im Archiv._
- **Hitechies/Pragmatic Engineer:** ~$200/Monat/Entwickler, ~30% erreichen Limits, ~15% nennen Kosten ein Dauerproblem — "Very few can explain what they're getting for it". (2026-05-22)
- **Forecasting Research Institute (69 Ökonomen u.a.):** erwartet rapiden KI-Fortschritt, aber nur ~1 Prozentpunkt zusätzliches BIP bis 2030 — Makro-Produktivitätsparadox. (2026-04-06; daily/2026/04/2026-04-06.md)
- **"KI-Illusion" (Digital Gipfel Schweiz 2026, Guido Greber):** ~88% der Schweizer Firmen nutzen KI, aber 41% der CEOs berichten KEINEN ROI; Produktivität erst durch Workflow-Redesign ("Elektrizitäts-Paradox"). (2026-05-30; daily/2026/05/2026-05-30.md; weekly/2026/2026-W23.md) — Schweiz-spezifisch.
- **NVIDIA-CFO:** H100-Mieten +20% YoY (Alt-GPUs werten auf) — strukturelle Knappheit widerspricht naiver "Compute-Kosten fallen schnell"-Erwartung. (2026-05-26)
- **Google I/O Flash 3.5:** erstes günstiges Tier-Modell, das über Generationen TEURER wird (3×/6×). (2026-05-21)
- **GPT-5.5 Rate-Card-Verdopplung:** Frontier-Pricing steigt; Subventionsende. (2026-04-23)
- **Anthropic-Billing-Split:** effektive Preiserhöhung 12-175× bei agentischen Loops (Einzelquelle/Workload-Analyse). (2026-05-26)
- **DeepSeek/chinesische Modelle:** offenes Kosten-Ceiling unterbietet Frontier ~10×; OpenRouter-Anteil chinesischer Modelle ~1% → >60%; Anthropic räumt selbst Kosten-Nachteil ein — Spannung mit IPO-Premium-These. (2026-05-20/24)
- **Token-Spend als Mandat/KPI:** $300/Tag-Quoten, erfundene Aufgaben zur Quotenerfüllung, "offensively large" Token-Spend als Status — Beschaffung läuft Einsetzbarkeit davon. (HN, 2026-05-17/18)
- **Uber-Präsident:** AI-Ausgaben "harder to justify"; Subscription-vs-API-Kostengap 10-40×. (2026-05-27)
- **Salesforce-ROI-Caveat:** größte Pro-KI-ROI-Zahl ist vendor-eigen und unauditiert; ~5% weniger Incidents ist gering.
- **METR-Selbstbericht (2,0× Arbeitswert):** selbstberichtet/optimistisch — abzugrenzen vom METR-RCT (−19%).
- **McKinsey (2023):** Routineaufgaben (Doku halbe Zeit, neuer Code ~halbe Zeit, Refactoring ~zwei Drittel) — gilt NUR für Routine, nicht Systemdesign/komplexes Debugging; Primärseite konnte nicht gefetcht werden (WebSearch-Auszug, vor Verwendung verifizieren). _Online, nicht im Archiv._
- **Goldman/Volumeneffekt:** Stückkosten fallen, aber Token-Volumen ×24 bis 2030 → Gesamt-AI-Rechnung steigt trotzdem.

## Verwendbarkeit (Hinweis für die Konsolidierung)

- **Stark belegt (mehrfach/primär):** Der strukturelle Pricing-Shift von Flatrate zu nutzungs-/verbrauchsbasiert (GitHub Copilot AI Credits, Anthropic-Billing-Split, ServiceNow/SAP/Workday-Metering) ist durch Primärquellen und mehrere unabhängige Belege gut abgestützt. Ebenso die Hardware-Cost-Curve (NVIDIA Rubin "bis zu 10×") — aber als Herstellerangabe/Marketing-Benchmark zu kennzeichnen.
- **Stark, aber mit Caveat:** Revenue-Run-Rates und Bewertungen (Anthropic $43,6/$47 Mrd., $65 Mrd. Series H, OpenAI $122 Mrd., Microsoft >$37 Mrd. AI-Run-Rate, Salesforce Agentforce $1,2 Mrd.) sind confirmed. Die zentrale Kosten-Kennzahl ($0,99/MTok geblendeter Opus-4.7-Preis) ist confirmed, gilt aber spezifisch für Coding-Workloads mit hohem Cache-Hit.
- **Dünn / vorsichtig behandeln:** ROI-Zahlen sind überwiegend vendor-eigen/unauditiert (Salesforce ~18×, +79% PRs) oder selbstberichtet (METR 2,0×). Die einzige rigorose RCT-Evidenz (METR −19%) widerspricht und sollte als Pflicht-Caveat mitgeführt werden. Die 12-175×-Spanne (Anthropic-Loops) und ~24×-Routing-Lücke (Salnikov) sind Einzelquellen. Reale Per-Seat-Zahlen (~$200/Monat, Max-Pläne $100-200) sind umfragebasiert und plausibel, aber nicht primär-auditiert.
- **Zentrale ökonomische Spannung für das Deck:** Token-Stückkosten fallen schnell (Epoch ~50×/Jahr, a16z 10×/Jahr — nur bei FIXEM Leistungsniveau), aber (a) Frontier-Pricing steigt (GPT-5.5 2×, Flash 3.5 teurer), (b) Volumen explodiert (Goldman ×24), (c) agentische Loops vervielfachen den effektiven Spend (12-175×). Konsolidierung sollte "Token-Preise fallen" nicht ohne diese drei Gegenkräfte verwenden.
