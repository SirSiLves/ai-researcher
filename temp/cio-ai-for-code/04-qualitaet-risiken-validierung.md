# Code-Qualität, Risiken & Validierung

_Belegsammlung (Rohmaterial für spätere CIO-Konsolidierung). Stichtag Archiv: 2026-06-03. Neutral, vollständig, jede Zahl mit Quelle + Verifizierungsstatus._

## Worum es geht
Dieser Cluster sammelt Evidenz zu Qualität, Risiken und Validierung von KI-/agentisch erzeugtem Code: gemessene Code-Qualitätsregression (Churn, Duplication, Slop), AI-generierte Schwachstellen, der Review-/Patch-Bottleneck, Pilot-Scheiterquoten (u.a. MIT NANDA / "GenAI Divide" / "95 %"), Shadow-AI, strukturelle Modell-Schwächen (Compliance-Bias/Abstention, Faithfulness) sowie die "Eval-Gap"-Debatte und Validierung als Voraussetzung für Produktiv-Einsatz. Die Belege können CIO-relevante Fragen adressieren wie: Wie hoch sind Defekt-/Sicherheits-Raten von KI-Code? Wo verschiebt sich der Engpass (Generierung → Review/Patch)? Welche Governance-/Compliance-Rahmen und regulatorischen Fristen sind relevant? Wie verlässlich sind Benchmarks gegenüber Produktion?

## Befunde

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

### EU Digital Omnibus verschiebt High-Risk-AI-Act-Pflichten um 16 Monate
- **Befund:** EU-Digital-Omnibus verschiebt High-Risk-AI-Act-Pflichten (Annex III, nicht Annex I) um 16 Monate von Aug 2026 auf Dezember 2027, verengt den "safety component"-Scope und verschiebt die Regulatory Sandbox um ein Jahr; finale Annahme im Juni erwartet. Bussgeld-Höhe wird in der Quelle nicht genannt.
- **Originalquelle:** weekly/2026/2026-W23.md (lines 14 & 46-47), gestützt durch daily/2026-06-02 und daily/2026-06-03
- **Fundstelle:** weekly/2026/2026-W23.md → Quarter framing / weekly/2026/2026-W20.md → EU AI Act
- **Datum:** 2026-06-03
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** korrigiert: number_wrong — befund/originalquelle bereits korrigiert; "16 Monate" bzw. Annex-III-Bezug gemäss Beleg bestätigt, keine Bussgeld-Zahl in der Quelle
- **Art:** Kontext
- **Notiz:** Reguläre Absicherung verzögert sich, während der Einsatz beschleunigt — strukturelle Validierungslücke auf regulatorischer Ebene.
- **Zitat:** "deferred high-risk AI Act obligations 16 months to December 2027"

### Uber deckelt KI-Coding-Tools auf $1'500/Monat pro Mitarbeiter
- **Befund:** Uber begrenzt KI-Coding-Tools (z.B. Claude Code) auf $1'500/Monat pro Mitarbeiter und pro Tool, um Kosten zu steuern — Datenpunkt, dass agentischer Token-Spend zur echten Enterprise-Budgetlinie wird.
- **Originalquelle:** Simon Willison (Link-Blog) · 2026-06-03 · simonwillison.net/2026/Jun/3/uber-caps-usage
- **Fundstelle:** blogs/2026/06/2026-06-03.md → Blog picks; radar/2026/06/2026-06-03.md → Top topic; hackernews/2026/06/2026-06-03.md
- **Datum:** 2026-06-03
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Kontext
- **Notiz:** Konkreter Kostenkontroll-Mechanismus (Pro-Seat-Cap) für agentisches Coding; neuestes Datum im Archiv.
- **Zitat:** "Uber's $1,500/month AI limit is a useful signal for AI tool pricing"

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

### UpGuard "State of Shadow AI": >80 % der Mitarbeitenden nutzen ungenehmigte KI-Tools
- **Befund:** Mehr als 80 % der Mitarbeitenden — und nahezu 90 % der Security-Professionals — nutzen ungenehmigte KI-Tools bei der Arbeit; rund die Hälfte regelmässig, unter 20 % nutzen ausschliesslich firmen-genehmigte KI. Paradox: Security-Leader nutzen ungenehmigte Tools häufiger als der Durchschnitt.
- **Originalquelle:** Cybersecurity Dive (über UpGuard-Research), "Shadow AI is widespread — and executives use it the most" · 2025-11-12 · cybersecuritydive.com/news/shadow-ai-employee-trust-upguard/805280/
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2025-11-12
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Werte auf der abgerufenen Seite bestätigt; Basis: zwei 2024er-Umfragen, 1'500 Security-Leader/Mitarbeitende über 7 Länder); newer_than_archive: false
- **Art:** Beleg (Governance-/Shadow-AI-Risiko)
- **Notiz:** Quantifiziert Shadow-AI als nahezu universelles Enterprise-Governance-/Security-Risiko.
- **Zitat:** "More than 80% of workers, including nearly 90% of security professionals, use unapproved AI tools in their jobs."

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

### Anthropic Project Glasswing: 10'000+ kritische/hohe Vulns in ~30 Tagen
- **Befund:** Project Glasswing flaggte in ~30 Tagen 10'000+ critical/high Vulnerabilities über 1'000+ Open-Source-Projekte (1'094 bestätigte True Positives; u.a. 27-Jahre-alter OpenBSD-Bug, 16-Jahre-FFmpeg-Flaw, CVE-2026-5194 WolfSSL); Cloudflare fand 2'000, Mozilla fixte 271 Firefox-Vulns zur 10×-Rate. Bottleneck verschiebt sich von Detection zu Patch/Maintainer-Durchsatz.
- **Originalquelle:** Anthropic (Project Glasswing 30-day Update) · 2026-05-26 · anthropic.com/research/glasswing-initial-update
- **Fundstelle:** weekly/2026/2026-W22.md → AI security pivots / daily/2026/05/2026-05-26.md → Glasswing
- **Datum:** 2026-05-24 (Ankündigung; Beleg-Datierung korrigiert, siehe unten)
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** korrigiert: date_wrong — Glasswing-Ankündigung erscheint im Detail in daily/2026-05-26.md; Zahlen aus W22.md bestätigt
- **Art:** Beleg (Validierungs-/Patch-Bottleneck)
- **Notiz:** Kern-Beleg für den "Validierungs-/Patch-Bottleneck"; IBM+Red Hat antworteten laut Archiv mit $5B "Project Lightwell"-Clearinghouse.
- **Zitat:** "the bottleneck moves from detection to patch/maintainer throughput"

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

### Simon Willison "The Pressure": curl-Maintainer unter Report-Volumen, das Freiwillige nicht absorbieren
- **Befund:** curl-Maintainer stehen unter KI-assistierten Security-Reports in einem Volumen, das Freiwillige nicht absorbieren können — atomare Instanz des Glasswing-Befunds, dass Patch-/Review-Kapazität der Engpass ist.
- **Originalquelle:** Simon Willison · 2026-05-26 · simonwillison.net/2026/May/26/the-pressure
- **Fundstelle:** weekly/2026/2026-W22.md → Best blogs
- **Datum:** 2026-05-26
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext
- **Notiz:** Pointierte Einzelfall-Illustration des Kapazitätsproblems hinter den Glasswing-Zahlen.

### AISI (UK) Frontier AI Trends Report: Oversight-Effektivität degradiert mit Capability
- **Befund:** Erster formeller Trendreport eines Regierungs-Safety-Instituts, der erodierende Kontrollierbarkeit argumentiert: Cyber-Task-Erfolg stieg 9 %→50 % in zwei Jahren, Self-Replication-Eval-Pass <5 %→>60 % in zwei Jahren.
- **Originalquelle:** UK AI Safety Institute · 2026-05-24 · aisi.gov.uk/frontier-ai-trends-report
- **Fundstelle:** daily/2026/05/2026-05-24.md → AISI / weekly/2026/2026-W22.md → AI security (Zahlen in daily/2026-05-26.md)
- **Datum:** 2026-05-24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Kontext / Beleg (Oversight/Validierung)
- **Notiz:** Wird laut Archiv schwer in EU-AI-Act-High-Risk-Konsultation und nächste GPAI-Code-Revision einfliessen.
- **Zitat:** "oversight effectiveness degrading as capability scales"

### Faithfulness-/Halluzinations-Korrektive: Attribution Blind Spot & Provenance-Role Collapse
- **Befund:** "The Attribution Blind Spot" diagnostiziert, ob ein RAG-Modell tatsächlich den abgerufenen Kontext nutzt vs. parametrisches Memory; "Provenance-Role Collapse" benennt einen Source-Monitoring-Fehler, bei dem Long-Term-Agents rohe Evidenz mit wahrheitstragenden Claims verwechseln.
- **Originalquelle:** diverse arXiv · 2026-05-23/26 · arXiv:2605.26778, arXiv:2605.25869
- **Fundstelle:** weekly/2026/2026-W23.md → Notable papers / papers/2026/05/2026-05-26.md → Other items
- **Datum:** 2026-05-26
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Eval-Gap)
- **Notiz:** Zwei benannte Failure-Modes als Evaluation-Gap-Evidenz.

### Salesforce-eigene (unauditierte) ROI-Zahlen für Migration auf Claude Code
- **Befund:** Salesforce migrierte seine gesamte Engineering-Org auf Claude Code (unlimitierte Tokens): +79 % PRs/Entwickler, ~5 % weniger Incidents, +50.8 % YoY Work Items; eine 33-Endpoint-API-Migration auf 231 Personentage geschätzt, in 13 erledigt (~18×).
- **Originalquelle:** Salesforce Q1 FY27 / interner Bericht (vendor-eigene, unauditierte Zahlen) · 2026-05-27/28 · salesforce.com/news/stories/how-engineering-became-agentic/ ; weekly/2026/2026-W22.md
- **Fundstelle:** weekly/2026/2026-W22.md → Enterprise agent revenue
- **Datum:** 2026-05-27/28
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Zahlen bestätigt; explizit "vendor's own figures, unaudited")
- **Art:** Beleg / Gegen-Caveat
- **Notiz:** In diesem Cluster relevant als Caveat: das grösste Pro-KI-ROI-Argument stammt vom Vendor selbst und ist unauditiert; ~5 % weniger Incidents ist gering.
- **Zitat:** "the largest first-party agentic-coding ROI number to date (vendor's own figures, unaudited)"

### Anthropic-Postmortem: Claude-Code-Regression real, Ursache drei Harness-Bugs
- **Befund:** Anthropic bestätigt, dass "Modelle wurden schlechter"-Beschwerden real waren, Ursache aber drei separate Harness-Bugs — u.a. ein 26.-März-Bug, der gestaltes Thinking jeden Turn löschte und Claude "forgetful and repetitive" über die ganze Session machte; Reasoning-Effort fiel am 4. März still von high auf medium (revertiert 7. April).
- **Originalquelle:** Anthropic via Simon Willison / Anthropic Engineering Postmortem · 2026-04-23/24 · simonwillison.net/2026/Apr/24/recent-claude-code-quality-reports ; anthropic.com/engineering/april-23-postmortem
- **Fundstelle:** daily/2026/04/2026-04-24.md → Top stories / weekly/2026/2026-W17.md → Anthropic regression
- **Datum:** 2026-04-23/24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Stabilität/Validierung)
- **Notiz:** Konkretester "wir haben es falsch gemacht"-Frontier-Lab-Postmortem 2026; zeigt, dass Produktivitäts-Tools wochenlang still degradieren können (Harness-Bug, nicht Modell).

### Stanford AI Index 2026: Experten-Öffentlichkeits-Lücke (23 % vs 73 %), FMTI-Rückgang 58→40
- **Befund:** 23 % der US-Öffentlichkeit erwarten positive Arbeitsplatz-Auswirkungen von KI vs. 73 % der KI-Experten; der Foundation Model Transparency Index fiel von 58 auf 40.
- **Originalquelle:** Stanford HAI AI Index 2026 · 2026-05-17 · hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report
- **Fundstelle:** daily/2026/05/2026-05-17.md → Top stories / weekly/2026/2026-W20.md → Sentiment
- **Datum:** 2026-05-17
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** korrigiert: number_wrong — Quelle stützt NICHT die Behauptung, dies sei "die grösste Experten-Öffentlichkeits-Lücke, die der Index je gemessen hat"; 23 %/73 % und FMTI 58→40 bestätigt
- **Art:** Kontext (Skepsis-Baseline)
- **Notiz:** Macro-Baseline für die Skepsis-Achse; FMTI-Rückgang 58→40 ist eigener Transparenz-Risiko-Datenpunkt.
- **Zitat:** "only 23% of the US public expects AI to positively affect their work vs 73% of AI experts"

### Stanford AI Index 2026: 62 % der Unternehmen nennen Security als Skalierungs-Blocker
- **Befund:** 62 % der Unternehmen nennen Security als Blocker für agentische Skalierung; 47 Länder mit aktiver KI-Gesetzgebung, nur 12 mit Enforcement.
- **Originalquelle:** Stanford AI Index 2026 · 2026-05-14 (Erstpublikation) / 2026-05-17 (Analyse-Artikel "12 Takeaways") · hai.stanford.edu
- **Fundstelle:** weekly/2026/2026-W20.md → EU AI Act / policy
- **Datum:** 2026-05-17
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** korrigiert: date_wrong — Zahlen in W20.md sowie news/2026-05-14 und news/2026-05-15 bestätigt
- **Art:** Beleg (Security-Blocker)
- **Notiz:** Direkter Beleg, dass Security der genannte Skalierungs-Blocker Nr. 1 in Unternehmen ist.
- **Zitat:** "62% of enterprises cite security as blocking agentic scaling"

### Ontario-Audit: 60 % der medizinischen KI-Scribe-Systeme verwechseln Medikamente
- **Befund:** Ontario-Auditoren stellen fest, dass 60 % der geprüften medizinischen KI-Scribe-Systeme routinemässig verschriebene Medikamente verwechseln. Offene Frage im Thread: fehlende menschliche Vergleichs-Baseline.
- **Originalquelle:** Ontario-Auditoren via HN · 2026-05-16 · HN 305 pts/137 comments (news.ycombinator.com/item?id=48142188)
- **Fundstelle:** daily/2026/05/2026-05-16.md → Top HN
- **Datum:** 2026-05-16
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Produktions-Halluzination)
- **Notiz:** Konkrete Produktions-Halluzinationsrate; Caveat: keine menschliche Vergleichs-Baseline im Audit.
- **Zitat:** "60% of audited AI scribe systems mix up prescribed drugs"

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

### Schweiz/EU Shadow-AI: 73 % der Schweizer Internetnutzer haben GenAI probiert
- **Befund:** 73 % der Schweizer Internetnutzer haben GenAI probiert (47 % monatlich, 21 % täglich), mit tiefem Generationen-/Regionen-Gefälle (14-19J 84 % vs >70J 14 %; Romandie 81.6 % vs Deutschschweiz 74.1 %); explizite Forderung nach Governance gegen "Schatten-KI".
- **Originalquelle:** Paul Meyrat, "KI ist angekommen. Aber nicht bei allen." (de-CH) · 2026-05-10/12 · linkedin.com/pulse/ki-ist-angekommen-aber-nicht-bei-allen-paul-meyrat-5ltxe
- **Fundstelle:** daily/2026/05/2026-05-10.md → LinkedIn / linkedin/2026/05/2026-05-14.md (auch daily/2026-05-15.md)
- **Datum:** 2026-05-10
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Shadow-AI, DACH)
- **Notiz:** Schweiz-spezifischer Datenpunkt mit explizitem "Schatten-KI"-Framing.
- **Zitat:** "calls for governance against 'Schatten-KI'"

### ISO/IEC 42001 als operativer Rahmen gegen Schatten-KI
- **Befund:** ISO/IEC 42001 wird als operativer Rahmen positioniert, um von KI-Pilotprojekten in die Produktion zu kommen und Schatten-KI-Risiko zu reduzieren; ergänzt (ersetzt nicht) die EU-AI-Act-Rechtsprüfung und gibt eine gemeinsame Struktur für Evaluation, Freigabe, Monitoring, Dokumentation.
- **Originalquelle:** Annette Zeller, TIMETOACT, "Warum ISO 42001 für KI gerade besonders relevant wird" (de) · 2026-05-08 · linkedin.com/pulse/...annette-zeller-aacgf
- **Fundstelle:** linkedin/2026/05/2026-05-14.md → German long-form
- **Datum:** 2026-05-08
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext (Governance-Hebel)
- **Notiz:** Praktiker-Take auf den Governance-Hebel gegen Schatten-KI; verbindet Pilot-Skalierung mit ISO 42001.

### 65 % der Entwickler: fehlender/verrotteter Kontext als Hauptursache schlechter AI-Code-Qualität
- **Befund:** 65 % der Entwickler nennen fehlenden oder verrotteten Kontext als Hauptursache für schlechte AI-Code-Qualität — vor Modell-Fähigkeit und Framework-Wahl.
- **Originalquelle:** Rashid Mahmood, "Context Engineering Has Eaten Prompt Engineering" · 2026-05 · medium.com/@codewithrashid
- **Fundstelle:** blogs/2026/05/2026-05-21.md → Picks (auch 05-22/05-23/05-24)
- **Datum:** 2026-05-21
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed — aber Einzelquelle (Medium), load-bearing 65 %-Zahl
- **Art:** Beleg (Qualitätshebel)
- **Notiz:** Rahmt Kontext-Engineering als Qualitätshebel; einzelne Quelle, vorsichtig zu zitieren.
- **Zitat:** "65% of developers cite missing or rotted context as the leading cause of poor AI code quality"

### Claw-Eval-Live: stärkstes Modell nur 66.7 % Task-Completion
- **Befund:** Live-Agent-Benchmark: selbst mit deterministischem Grading erreicht das stärkste Modell nur 66.7 % Task-Completion auf sich entwickelnden Real-World-Workflows.
- **Originalquelle:** Chenxin Li, Zhengyang Tang · 2026-05-02 · arXiv:2604.28139
- **Fundstelle:** papers/2026/05/2026-05-02.md; daily/2026/05/2026-05-02.md → Papers
- **Datum:** 2026-05-02
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz (Eval-Gap)
- **Notiz:** In realistischen, sich ändernden Workflows scheitert selbst das beste Modell zu ~1/3.

### Hyperscribe-Feldreport: Qualität 84→95 %, Fehler 79→30 % unter laufender Governance
- **Befund:** EHR-eingebetteter klinischer KI-Agent, kontrolliertes Feldexperiment: sieben Versionen evaluiert, Median-Qualität stieg 84 %→95 %, Live-Fehlerberichte fielen 79 %→30 % über drei Monate (20 Kliniker, 1'646 Rubrics, 823 Fälle).
- **Originalquelle:** Aaryan Shah, Andrew Hines · 2026-04-30 · arXiv:2604.27309
- **Fundstelle:** papers/2026/04/2026-04-30.md; daily/2026/04/2026-04-30.md → Papers
- **Datum:** 2026-04-30
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Validierung als Voraussetzung)
- **Notiz:** Seltener kontrollierter Feld-Datenpunkt; zeigt, dass Gewinne erst durch laufende Governance/Versionierung entstehen.

### KI-assistierte Vuln-Reports überfluten OSS-Maintainer (Volumen-Datenpunkt)
- **Befund:** Drei unabhängige Maintainer (Kroah-Hartman/Linux, Stenberg/curl, Tarreau/HAProxy) bestätigen, dass die Kernel-Security-Liste in ~einem Monat von 2-3 Slop-Reports/Woche auf 5-10 echte (oft duplizierte) AI-assistierte Reports/Tag kippte.
- **Originalquelle:** Kroah-Hartman, Stenberg, Tarreau via Simon Willison · 2026-04-03 · simonwillison.net/2026/Apr/3/greg-kroah-hartman
- **Fundstelle:** daily/2026/04/2026-04-03.md → Top stories / weekly/2026/2026-W14.md → Autonomous offensive cyber
- **Datum:** 2026-04-03
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Review-/Maintainer-Bottleneck)
- **Notiz:** Konkreter Volumen-Datenpunkt für den Maintainer-/Review-Bottleneck; oft duplizierte Reports.
- **Zitat:** "kernel security list … from 2-3/week to 5-10/day"

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

### MAD Bugs: autonome Exploit-Erzeugung real, nicht modell-gegated
- **Befund:** Publicly available Claude schrieb autonom zwei funktionierende Remote-Root-Exploits für FreeBSD CVE-2026-4747 (jeweils beim ersten Versuch nach ~4h); die Kampagne produzierte 500+ validierte high-severity Vulns bis Mitte/~1'000 bis Monatsende — Capability nicht durch Spezialmodell-Zugang gegated.
- **Originalquelle:** Nicholas Carlini, "MAD Bugs" · 2026-04-01 · blog.calif.io/p/mad-bugs-claude-wrote-a-full-freebsd
- **Fundstelle:** daily/2026/04/2026-04-01.md → Security capability / weekly/2026/2026-W14.md → Autonomous offensive cyber
- **Datum:** 2026-04-01
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext / Beleg (Patch-Safety-/Review-Druck)
- **Notiz:** Belegt, dass autonome Exploit-Erzeugung real und nicht modell-gegated ist — verschärft den Patch-/Review-Druck.
- **Zitat:** "two working remote-root exploits … each succeeding on first attempt after ~4h"

### International AI Safety Report 2026: "evaluation gap" als zentrale Herausforderung
- **Befund:** International AI Safety Report 2026 (100+ Experten, 30+ Nationen) benennt die "evaluation gap" als zentrale wissenschafts-politische Herausforderung; UK-AISI-Findings (73 % Experten-Hacking-Task-Erfolg, "99 %-unpatched-vulnerability"-Framing) treiben US-Überlegungen zu Pre-Deployment-Oversight.
- **Originalquelle:** International AI Safety Report 2026 / UK AISI · 2026-05-06/08 · weekly synthesis
- **Fundstelle:** weekly/2026/2026-W19.md → EU AI Act simplification / policy
- **Datum:** 2026-05-06
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext (Eval-Gap, regulatorisch)
- **Notiz:** Setzt den "evaluation gap" als regulatorisch zentrierten Begriff; 73 %-Experten-Hacking-Erfolg als Capability-Anker.
- **Zitat:** "flags the 'evaluation gap' as the central science-policy challenge"

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

### MIT NANDA "GenAI Divide": 95 % der Enterprise-GenAI-Piloten ohne messbaren P&L-Effekt
- **Befund:** 95 % der Enterprise-GenAI-Piloten liefern keinen messbaren P&L-Effekt; nur 5 % erreichen Produktion/extrahieren Wert. Pilot-Funnel: 60 % evaluierten Enterprise-Systeme, 20 % erreichten Pilot, nur 5 % Produktion. Ursache laut Report: "learning gap" (Systeme behalten Feedback nicht/adaptieren nicht), nicht Infrastruktur oder Modellqualität.
- **Originalquelle:** Fortune (über MIT Project NANDA, "The GenAI Divide: State of AI in Business 2025", Lead-Autor Aditya Challapally) · 2025-08-18 · fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2025-08-18
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (95 %/5 % auf der abgerufenen Fortune-Seite bestätigt; Methodik: ~150 Interviews / 52 Executive-Interviews, Surveys von 153-350 Leadern/Mitarbeitenden, Analyse von 300 öffentlichen Deployments); newer_than_archive: false
- **Art:** Kontext / Beleg (Pilot-Scheiterquote, Makro)
- **Notiz:** Headline-Statistik des Clusters; bezieht sich auf Enterprise-GenAI breit, NICHT spezifisch AI-Coding — Makro-Framing.
- **Zitat:** "About 5% of AI pilot programs achieve rapid revenue acceleration; the vast majority stall, delivering little to no measurable impact on P&L."

### Veracode 2025 GenAI Code Security Report: 45 % des AI-Codes scheitert an Security-Tests
- **Befund:** 45 % der AI-generierten Code-Samples scheiterten an Security-Tests und führten OWASP-Top-10-Schwachstellen ein; neuere/grössere Modelle waren nicht sicherer. Sprach-Fehlerquoten: Java 72 %, C# 45 %, JavaScript 43 %, Python 38 %. Cross-Site Scripting (CWE-80): in 86 % der relevanten Samples nicht verteidigt.
- **Originalquelle:** Veracode, "2025 GenAI Code Security Report" ("We Asked 100+ AI Models to Write Code...") · 2025-07-30 · veracode.com/blog/genai-code-security-report/
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2025-07-30
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (45 %, 72 % auf der Primärseite bestätigt; getestet 100+ LLMs über 80+ Coding-Tasks in Java/Python/C#/JavaScript). Das oft zitierte "2.74× mehr Vulnerabilities als Menschen" war auf der Primärseite NICHT sichtbar — nicht als primär geführt. newer_than_archive: false
- **Art:** Beleg (Security-Risiko)
- **Notiz:** Strukturelles Problem (Skalierung behebt es nicht); fast die Hälfte des AI-Codes unsicher.
- **Zitat:** "45% of code samples failed security tests and introduced OWASP Top 10 security vulnerabilities."

### Apiiro: 10'000+ neue Security-Findings/Monat durch AI-Code (10× in sechs Monaten)
- **Befund:** AI-generierter Code führte bis Juni 2025 10'000+ neue Security-Findings/Monat ein — ein 10×-Spike in sechs Monaten (vs. Dez 2024) — und schafft 322 % mehr Privilege-Escalation-Pfade und 153 % mehr Design-Fehler als menschlicher Code. AI-assistierte Devs exponierten Cloud-Credentials nahezu doppelt so oft. Gegenläufig: AI REDUZIERTE Syntax-Fehler um 76 % und Logik-Bugs um 60 %+; AI-Devs produzierten 3-4× mehr Commits in weniger/grösseren PRs.
- **Originalquelle:** Apiiro, "4x Velocity, 10x Vulnerabilities: AI Coding Assistants Are Shipping More Risks" · 2025-09-04 · apiiro.com/blog/4x-velocity-10x-vulnerabilities-ai-coding-assistants-are-shipping-more-risks/
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2025-09-04
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Werte auf der abgerufenen Seite bestätigt; Basis: zehntausende Repositories, mehrere tausend Devs, Fortune-50-Enterprises, Apiiro Deep Code Analysis); newer_than_archive: false
- **Art:** Beleg (Vuln-Volumen/Risiko)
- **Notiz:** AI fixt flache Bugs, multipliziert aber tiefe architektonische/Security-Risiken; Trajektorie steigt, nicht flach.
- **Zitat:** "By June 2025, AI-generated code was introducing over 10,000 new security findings per month ... a 10x spike in just six months."

### GitClear: AI erodiert Code-Qualität (Clone steigen 8.3→12.3 %, Refactoring fällt)
- **Befund:** Copy/pasted (geklonte) Zeilen stiegen von 8.3 % (2021) auf 12.3 % (2024), während refactored/"moved" Zeilen von ~25 % auf unter 10 % fielen; 2024 war das erste Jahr, in dem Copy/Paste das "moved code" überstieg. Kurzfristige Churn (Revision innerhalb ~2 Wochen) stieg ebenfalls. Geklonter Code ist mit 15-50 % mehr Defekten assoziiert.
- **Originalquelle:** GitClear, "AI Copilot Code Quality: 2025 Look Back / 4x Growth in Code Clones" · 2025-02 · gitclear.com/ai_assistant_code_quality_2025_research
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2025-02
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Werte auf der abgerufenen Seite bestätigt; analysiert 211 Mio. geänderte Code-Zeilen, Jan 2020–Dez 2024, Repos von Google/Microsoft/Meta + Enterprise-C-Corps); newer_than_archive: false
- **Art:** Beleg (Code-Churn/Duplication)
- **Notiz:** Stärkster Datensatz zur AI-Degradation von Code-Qualitäts-/Maintainability-Metriken.
- **Zitat:** "Copy/pasted lines rose from 8.3% to 12.3% of changed lines (2021->2024), while refactored 'moved' lines fell from ~25% to under 10%."

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

### Compound-Error-Rechnung: 99 % Genauigkeit/Schritt über 50 Schritte = ~60 % Erfolg
- **Befund:** Praktiker-Leitfaden quantifiziert Fehlerakkumulation in agentischen Loops: 99 % Genauigkeit/Schritt über 50 Schritte ergeben ~60 % Gesamterfolg; 95 %/Schritt ergeben ~8 %. (Begleitkontext: ~24× Kostengap zwischen Claude Opus 4.7 und GPT-5.4 mini; Copilot-CLI-Team ~500 PRs/Woche bei ~53 % Test-Coverage.)
- **Originalquelle:** Maxim Salnikov (Microsoft/GitHub), LinkedIn · 2026-05-28 · linkedin.com/pulse/practitioners-guide-getting-more-value-out-ai-coding-agent-salnikov-mhume/
- **Fundstelle:** linkedin/2026/05/2026-05-28.md (Zeile 29)
- **Datum:** 2026-05-28
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext (Validierungs-/Zuverlässigkeitsmathematik)
- **Notiz:** Illustriert, warum hohe Per-Step-Genauigkeit über viele Schritte stark abfällt — relevant für Validierungs-Argument.
- **Zitat:** "~24× cost gap between Claude Opus 4.7 and GPT-5.4 mini"

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

## Gegenevidenz / Einschränkungen (in diesem Cluster)
- **Pilot-Scheitern als Makro-Befund, nicht Coding-spezifisch:** Die 95 %-Zahl (MIT NANDA / GenAI Divide) bezieht sich auf Enterprise-GenAI breit, nicht auf AI-Coding im Engeren — beim Übertragen kennzeichnen.
- **Vendor-eigene ROI-Zahlen:** Die grössten Pro-KI-ROI-Zahlen (Salesforce +79 % PRs/Dev, ~18×-Migration) sind explizit unauditiert und vom Vendor selbst; ~5 % weniger Incidents ist gering.
- **DORA-Zweiseitigkeit:** 2024 zeigte AI-Adoption −1.5 % Throughput / −7.2 % Stabilität; 2025 kehrte den Throughput-Befund teils um, Stabilität blieb negativ. Nicht überclaimen.
- **Fehlende menschliche Baselines:** Mehrere "Halluzination-in-Produktion"-Befunde (z.B. Ontario 60 % Scribe-Verwechslungen) haben keine menschliche Vergleichs-Baseline.
- **Benchmark vs. Produktion:** Sandbox-Leaderboards (SWE-Bench) überzeichnen Reife gegenüber Live-Evals (ClawBench 33.3 %, Claw-Eval-Live 66.7 %).
- **Disambiguierung "55 %":** Das "55 %" aus "Executing as You Generate" (arXiv:2604.00491) ist Inferenz-Latenzreduktion für Coding-Agents, NICHT "55 % schnellere Entwickler" — nicht verwechseln.
- **Einzelquellen / nicht einzeln verifiziert:** 65 %-Kontext-Zahl (Medium, Einzelquelle); Constraint Decay, Glasswing-Volumen-Framing, AISI-Folgewirkungen, MonitorBench, MAD Bugs, International AI Safety Report — teils nur via Synthese/HN erfasst, arXiv-IDs/Primärseiten teils nicht im Archiv.
- **Korrekturen angewandt:** Glasswing (date_wrong → daily 2026-05-26); Stanford-Index (number_wrong → "grösste Lücke je"-Behauptung nicht gestützt); Stanford-Security-Blocker (date_wrong); EU Digital Omnibus (number_wrong → 16-Monats-Slip/Annex-III bestätigt, keine Bussgeld-Zahl).

## Verwendbarkeit (Hinweis für die Konsolidierung)
- **Stark belegt:** Review-Bottleneck (Faros 98 %/91 %/154 %, CodeRabbit ~1.7×), Code-Qualitätsregression (GitClear 8.3→12.3 %, 110K-PR-Studie Churn/Survival), AI-Security-Volumen (Veracode 45 %, Apiiro 10×), Shadow-AI (UpGuard >80 %), Pilot-Scheitern (NANDA 95 %) — mehrere unabhängige Primärquellen, teils gegenseitig stützend.
- **Mässig/zweiseitig:** Delivery-Stabilität (DORA 2024 vs 2025 widersprechen sich beim Throughput, Stabilität konsistent negativ); Patch-/Maintainer-Bottleneck (Glasswing vs. Stenberg-Pushback — Discovery real, aber Durchsatz/TP-Qualität bestritten).
- **Dünn / vorsichtig zu behandeln:** 65 %-Kontext-Zahl (Einzelquelle Medium); Compliance-Bias/Abstention, Constraint Decay, Eval-Gap-Failure-Modes (arXiv/HN, nicht einzeln verifiziert); 2.74×-Veracode-Zahl bewusst NICHT als primär geführt; vendor-eigene ROI-Zahlen (Salesforce) nur mit Caveat.
- **Numerische Vorsicht für Konsolidierungs-Agent:** "95 %" = Enterprise-GenAI breit (nicht Coding); "55 %" je nach Quelle Latenz vs. Produktivität trennen; DORA-Throughput nur mit Jahr/Vorzeichen zitieren; EU-Frist "16 Monate auf Dez 2027" ohne Bussgeld-Zahl; AISI-Zahlen (9→50 %, <5→>60 %) sind Capability-Trend, nicht Code-Qualität.
