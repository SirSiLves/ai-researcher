# Benchmarks & Evals (Querschnitt)

_Belegsammlung (Rohmaterial für spätere CIO-Konsolidierung). Stichtag Archiv: 2026-06-03. Neutral, vollständig, jede Zahl mit Quelle + Verifizierungsstatus._

## Worum es geht

Dieser Querschnitts-Cluster sammelt benannte Benchmarks und Evals mit konkreten Ergebnissen (u.a. SWE-bench Verified, SWE-Bench Pro, Terminal-Bench, CyberGym, NYU-CTF, LiveCodeBench, GPQA Diamond, LLM-as-judge-Evals, Domänen-Evals) sowie die methodische Kritik daran (Eval-Gap, Contamination, "Benchmarks messen X nicht", Harness-vs-Model-Effekte). Er liefert die Zahlen, mit denen sich Capability-Aussagen anderer Cluster (Modelle, Produktivität, Cyber) entweder stützen oder relativieren lassen — und zeigt zugleich, wo Leaderboard-Scores von realer Einsatzfähigkeit abweichen. CIO-relevante Fragen, die er adressieren kann: Wie weit sind Coding-/Agenten-Modelle laut Standard-Benchmarks? Wie verlässlich sind diese Zahlen (Contamination, Gaming, static-eval)? Wo klafft die Lücke zwischen Benchmark und Produktion?

## Befunde

### GPT-5.3-Codex setzt neue Höchstwerte auf SWE-Bench Pro und Terminal-Bench (Build-day)
- **Befund:** OpenAI GPT-5.3-Codex (Build-day, 2. Juni) postet neue Höchstwerte auf SWE-Bench Pro und Terminal-Bench, läuft ~25% schneller und vereint Codex- und GPT-5-Trainingsstacks zu einem Modell.
- **Originalquelle:** OpenAI · 2026-06-02 · openai.com/index/introducing-gpt-5-3-codex/
- **Fundstelle:** daily/2026/06/2026-06-02.md → Read-this-first / Top stories
- **Datum:** 2026-06-02
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg
- **Notiz:** Konkrete Prozentzahlen werden in der Quelle nicht genannt — nur "neue Höchstwerte"; landet am selben Tag wie Microsoft Project Polaris.
- **Zitat:** "new highs on SWE-Bench Pro and Terminal-Bench"

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

### SWE-bench und "Evaluation gap" als persistente Radar-Themen
- **Befund:** SWE-bench rangiert in der Radar-Trendliste mit Importance 587, 24 Tage Präsenz, breadth 31 Orgs (06-02); separat erscheint "Evaluation gap" mit Importance 351, 14 Tage Präsenz, breadth 34.
- **Originalquelle:** Trend-Radar (interner Importance-Score) · 2026-06-02
- **Fundstelle:** radar/2026/06/2026-06-02.md → Trend table (#16 SWE-bench, #35 Evaluation gap)
- **Datum:** 2026-06-02
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Kontext
- **Notiz:** Sowohl SWE-bench als auch "Evaluation gap" tauchen als eigenständige Radar-Themen auf; Importance-Score ist eine interne Metrik, kein externer Benchmark.
- **Zitat:** "SWE-bench — importance 587 ... Evaluation gap — importance 351"

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

### Tencent Hunyuan Hy3 Preview: 74,4% SWE-bench Verified (offenes Modell, sehr günstig)
- **Befund:** Tencent Hunyuan Hy3 Preview (offenes 295B-total/21B-active MoE) meldet 74,4% SWE-bench Verified bei ~$0,06 in / $0,21 out — erweitert die billige Open-Weight-Frontier über DeepSeek und Qwen hinaus.
- **Originalquelle:** Tencent · 2026-05-29 · github.com/Tencent-Hunyuan/Hy3-preview
- **Fundstelle:** daily/2026/05/2026-05-29.md → Top stories (auch monthly 2026-05)
- **Datum:** 2026-05-29
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Open-Weight-SWE-bench-Verified-Score nahe der Frontier zu einem Bruchteil des Closed-Frontier-Preises.
- **Zitat:** "295B-total/21B-active MoE reporting 74.4% on SWE-bench Verified"

### Claude Opus 4.8 hebt SWE-Bench Pro auf 69,2% und liefert SWE-bench-Verified-Referenz 88,6%
- **Befund:** Claude Opus 4.8 hebt SWE-Bench Pro von 64,3% auf 69,2% (vs. GPT-5.5 58,6%, Gemini 3.1 Pro 54,2%), erreicht 88,6% SWE-bench Verified, 74,6% Terminal-Bench 2.1 und 93,6% GPQA Diamond bei unverändertem $5/$25-Preis.
- **Originalquelle:** Anthropic · 2026-05-28 · anthropic.com/news/claude-opus-4-8
- **Fundstelle:** daily/2026/05/2026-05-29.md → Top stories (auch 05-28, weekly W22)
- **Datum:** 2026-05-28
- **Status ggü. bisherigem Stand:** aktualisiert
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Setzt die SWE-Bench-Pro-Bestmarke (64,3→69,2) und liefert zugleich die SWE-bench-Verified-Referenz 88,6% sowie die Terminal-Bench-2.1-Marke 74,6%.
- **Zitat:** "SWE-Bench Pro jumps 64.3 → 69.2%"

### Salesforce-First-Party-ROI mit Claude Code (vendor-eigene, ungeprüfte Zahlen)
- **Befund:** Salesforce verlegte seine gesamte Engineering-Org auf Claude Code (unbegrenzte Token): +79% PRs pro Entwickler, ~5% weniger Incidents, +50,8% YoY Work-Items und eine 33-Endpoint-API-Migration von geschätzt 231 Personentagen, fertig in 13 (~18×).
- **Originalquelle:** Salesforce · 2026-05-27/28 · salesforce.com/news/stories/how-engineering-became-agentic/
- **Fundstelle:** weekly/2026/2026-W22.md → Enterprise agent revenue / Top stories (auch monthly 2026-05, daily 05-30)
- **Datum:** 2026-05-27
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Datenherkunft: vendor-eigen, unauditiert)
- **Art:** Beleg
- **Notiz:** Größte First-Party-Agentic-Coding-ROI-Zahl im Archiv; explizit Hersteller-eigene, nicht unabhängig geprüfte Angaben.
- **Zitat:** "+79% PRs/dev ... a 33-endpoint API migration ... done ~18× faster (231→13 person-days)"

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

### "How Well Do Models Follow Their Constitutions?" — Spec-Compliance 15,0%→2,0%
- **Befund:** Die Untersuchung zerlegt Anthropics Konstitution in 205 Tenets und OpenAIs Model Spec in 197; Sonnet 4 verletzt 15,0%, Sonnet 4.6 nur 2,0% der Tenets.
- **Originalquelle:** Jakkli, Rajamanoharan, Nanda · arXiv:2605.24229 · 2026-05-24
- **Fundstelle:** weekly/2026/2026-W22.md → Top papers (auch monthly 2026-05)
- **Datum:** 2026-05-24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg
- **Notiz:** Quantifiziert Spec-Compliance über Modellgenerationen (15,0→2,0% Verletzungsrate); benannter Alignment-mit-Public-Spec-Benchmark.
- **Zitat:** "Sonnet 4 15.0% violations → Sonnet 4.6 2.0%"

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

### Gemini 3.5 Flash: 76,2% Terminal-Bench 2.1 zu deutlich niedrigeren Kosten
- **Befund:** Gemini 3.5 Flash (GA 21. Mai) erreicht 76,2% Terminal-Bench 2.1, 83,6% MCP Atlas, 1656 Elo GDPval-AA und 84,2% CharXiv — bei ~1/2 bis 1/3 der Kosten vergleichbarer Modelle und 4× Geschwindigkeit.
- **Originalquelle:** Google · 2026-05-19/21 · blog.google/.../gemini-3-5
- **Fundstelle:** daily/2026/05/2026-05-21.md → Top stories (auch 05-31, weekly W21)
- **Datum:** 2026-05-21
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Terminal-Bench-2.1-Score eines kostengünstigen Tier-Modells; Google positioniert cheap-and-fast statt Flagship-Benchmark-Chasing.
- **Zitat:** "Terminal-Bench 2.1 76.2%, MCP Atlas 83.6%, GDPval-AA 1656 Elo"

### IBM Research + Hugging Face: Open Agent Leaderboard bewertet den Harness
- **Befund:** IBM Research und Hugging Face starten ein Open Agent Leaderboard — laut Archiv der erste Benchmark, der den Harness statt das Modell bewertet.
- **Originalquelle:** IBM Research / Hugging Face · 2026-05-18 · weekly W21
- **Fundstelle:** weekly/2026/2026-W21.md → Agent-interop layer
- **Datum:** 2026-05-18
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext
- **Notiz:** Institutionalisiert die Harness-vs-Model-These als eigenes Leaderboard.
- **Zitat:** "first benchmark that scores the harness rather than the model"

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

### Sakana 7B Conductor-Router: 83,9% LiveCodeBench, 87,5% GPQA-Diamond
- **Befund:** Sakanas 7B-Conductor-Router schlägt jeden Einzel-Worker im Pool (GPT-5, Claude Sonnet 4, Gemini 2.5 Pro) mit 83,9% LiveCodeBench und 87,5% GPQA-Diamond.
- **Originalquelle:** Sakana AI · 2026-05-12/16 · weekly W20
- **Fundstelle:** weekly/2026/2026-W20.md → Lede / facts
- **Datum:** 2026-05-16
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg
- **Notiz:** Benannte Benchmark-Scores (LiveCodeBench, GPQA-Diamond) für die Router-vs-Monolith-These.
- **Zitat:** "83.9% LiveCodeBench and 87.5% GPQA-Diamond"

### Microsoft MDASH: 88,45% auf CyberGym (höchster publizierter Score)
- **Befund:** Microsoft MDASH (Multi-Agent-System) findet 16 Zero-Days (4 Critical) und erreicht 88,45% auf CyberGym — der bislang höchste publizierte CyberGym-Score; der Engpass verschiebt sich von Vulnerability-Discovery zu Remediation.
- **Originalquelle:** Henning Steier (LinkedIn) · 2026-05-14
- **Fundstelle:** daily/2026/05/2026-05-14.md → LinkedIn pulse (auch radar 2026-05-14)
- **Datum:** 2026-05-14
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Einziger expliziter CyberGym-Datenpunkt im Archiv; bindet an Anthropic Glasswing/Claude Mythos an.
- **Zitat:** "Microsoft's MDASH ... 88.45% on CyberGym"

### Offensive-Cyber-Benchmark (NYU-CTF): Solve-Raten + erste $/solve-Metrik
- **Befund:** "Systematic Capability Benchmarking of Frontier LLMs for Offensive Cyber Tasks" testet 10 Frontier-Modelle auf 200 NYU-CTF-Challenges — Claude 4.5 Opus löst 59%, Gemini 3 Pro 52%, Gemini 3 Flash bestes $/solve bei $0,05.
- **Originalquelle:** arXiv:2604.17159 (anon.) · 2026-05-14
- **Fundstelle:** papers/2026/05/2026-05-14.md → Paper picks
- **Datum:** 2026-05-14
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Konkrete NYU-CTF-Solve-Raten plus erste $/solve-Metrik; ergänzt CyberGym/Glasswing-Narrativ.
- **Zitat:** "Claude 4.5 Opus 59% solve rate, Gemini 3 Pro 52%, Gemini 3 Flash best $/solve at $0.05"

### Vals AI Finance Agent Benchmark: Claude Opus 4.7 bei 64,37%
- **Befund:** Vals AI Finance Agent Benchmark: Claude Opus 4.7 führt bei 64,37% — benannter Domänen-Eval, der Anthropics Finance-Agent-Vertikalisierung untermauert.
- **Originalquelle:** Anthropic / Vals AI · 2026-05-13 · anthropic.com/news/finance-agents
- **Fundstelle:** daily/2026/05/2026-05-13.md → Top stories
- **Datum:** 2026-05-13
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg
- **Notiz:** Beispiel für die Verschiebung von generischen Coding-Benchmarks zu domänenspezifischen Evals (Finance).
- **Zitat:** "Claude Opus 4.7 at the top of the Vals AI Finance benchmark at 64.37 percent"

### Mistral Medium 3.5: 77,6% SWE-Bench Verified (Datumskorrektur)
- **Befund:** Mistral Medium 3.5 (128B dense, 256K Kontext) erreicht 77,6% SWE-Bench Verified — Beleg, dass auch mittelgroße europäische Modelle die ~77%-SWE-bench-Marke knacken.
- **Originalquelle:** Mistral · 2026-05-07 · daily 2026-05-07
- **Fundstelle:** weekly/2026/2026-W20.md → Releases (auch W21)
- **Datum:** 2026-05-07
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** korrigiert: date_wrong — Ankündigung war am 2026-05-07, nicht 2026-05-13; am 2026-05-13 kündigte Mistral stattdessen die Mistral-3-Familie (MoE-Variante) an.
- **Art:** Beleg
- **Notiz:** Verankert die Bandbreite der SWE-bench-Verified-Scores (77,6% mid-tier vs. 88,6% Opus 4.8).
- **Zitat:** "Mistral Medium 3.5 (128B dense, 256K context, 77.6% SWE-Bench Verified)"

### GPT-5.5 Instant: −52,5% halluzinierte Claims gegenüber GPT-5.3
- **Befund:** GPT-5.5 Instant reduziert halluzinierte Claims um 52,5% gegenüber GPT-5.3 (bzw. −52,5% auf high-stakes-Prompts) — gemessene Hallucination-Eval-Verbesserung.
- **Originalquelle:** OpenAI · 2026-05-07/14 · openai.com
- **Fundstelle:** daily/2026/05/2026-05-14.md → Releases (auch monthly 2026-05, weekly W19)
- **Datum:** 2026-05-07
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg
- **Notiz:** Quantifizierte Hallucination-Reduktion als Capability-Update; gehört zum Eval-confirms-number-Layer.
- **Zitat:** "GPT-5.5 Instant default ... –52.5% hallucinated claims vs 5.3"

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

### Claude Mythos Preview: 73% Expert-Hacking-Erfolg (UK AISI), USAMO +31pp, >80% Reproduktion
- **Befund:** Claude Mythos Preview erzielte in der UK-AISI-Bewertung 73% Erfolg bei Expert-Hacking-Tasks und reproduzierte/exploitete in Vortests >80% der Vulnerabilities (inkl. 27-Jahre-OpenBSD-Bug, 16-Jahre-FFmpeg-Flaw); USAMO 2026 +31 Prozentpunkte über Opus 4.6.
- **Originalquelle:** Anthropic / Lawfare / UK AISI · 2026-04-07 (73%-Lesart 2026-05-08)
- **Fundstelle:** daily/2026/05/2026-05-08.md → Lede / research (auch 04-07 Top stories)
- **Datum:** 2026-04-07
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** 73%-Expert-Hacking-Wert als regulatorisch gelesener Capability-Beleg; USAMO-Sprung (+31pp) quantifiziert Mythos-Capability.
- **Zitat:** "Mythos Preview's 73 percent expert-hacking-task success rate"

### Z.ai/Zhipu GLM-5.1: 58,4 auf SWE-Bench Pro (erstes Open-Weight an der Spitze)
- **Befund:** Z.ai/Zhipu GLM-5.1 (offenes 744B-MoE, MIT-Lizenz) erreicht 58,4 auf SWE-Bench Pro und schlägt damit GPT-5.4 (57,7) und Claude Opus 4.6 (57,3) an der Spitze des globalen Leaderboards.
- **Originalquelle:** Z.ai/Zhipu · 2026-04-07 · BuildFastWithAI / TestingCatalog
- **Fundstelle:** daily/2026/04/2026-04-07.md → Top stories (auch weekly W15)
- **Datum:** 2026-04-07
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Erstes Open-Weight-Modell, das westliche Closed-Frontier-Modelle auf einem ernsten agentic-coding-Benchmark klar überholt.
- **Zitat:** "scored 58.4 on SWE-Bench Pro, edging GPT-5.4 (57.7) and Opus 4.6 (57.3)"

### Mythos auf Firefox: 271 in Firefox 150 gepatchte Vulnerabilities (Realwelt-Validierung)
- **Befund:** Mythos Preview wurde im April auf Firefox angewandt und führte zu 271 in Firefox 150 gepatchten Vulnerabilities; Mozilla-Engineer Bobby Holley: "Defenders finally have a chance to win, decisively."
- **Originalquelle:** Mozilla / Bobby Holley · 2026-04-22 · weekly W17
- **Fundstelle:** weekly/2026/2026-W17.md → Mythos defender vocabulary
- **Datum:** 2026-04-22
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg
- **Notiz:** Konkrete reale Zahl (271 Vulns) als Validierung der Mythos-Cyber-Capability über Lab-Evals hinaus.
- **Zitat:** "Firefox 150 ships 271 Firefox vulnerabilities patched from an early Mythos Preview"

### Mythos-Benchmark-Claim bewegte Cybersecurity-Aktien vor Modell-Release
- **Befund:** Mythos' beanspruchte Capability-Lücke auf Cybersecurity-Benchmarks gegenüber Opus 4.6 ließ börsennotierte Cybersecurity-Aktien intraday neu bepreisen — seltenes "before/after"-Muster für ein noch nicht offiziell veröffentlichtes Modell.
- **Originalquelle:** Fortune / Pankaj Pandey (Medium) · 2026-03-27
- **Fundstelle:** daily/2026/03/2026-03-27.md → Top stories (auch news 03-27)
- **Datum:** 2026-03-27
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext
- **Notiz:** Einziger Fall im Archiv, in dem ein Cybersecurity-Benchmark-Claim Aktienkurse vor dem Modell-Release bewegte.
- **Zitat:** "Mythos's claimed capability gap on cybersecurity benchmarks versus Opus 4.6"

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

### CUBE: universelles Benchmark-Protokoll auf MCP tools/call
- **Befund:** CUBE schlägt MCPs non-blocking tools/call als universelles Protokoll zur Vereinheitlichung von Agent-Benchmarks vor und entfernt die per-Benchmark-Integrations-"Steuer".
- **Originalquelle:** Lacoste, Gontier · arXiv:2603.15798 · 2026-03-22
- **Fundstelle:** weekly/2026/2026-W12.md → Top papers (auch monthly 2026-03)
- **Datum:** 2026-03-22
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext
- **Notiz:** Zeigt den Trend zur Benchmark-Vereinheitlichung über MCP — relevant für die strukturelle Skalierung von Evals.
- **Zitat:** "Universal benchmark protocol built on MCP `tools/call`; removes the per-benchmark integration tax"

### GPT-5.4 mini auf SWE-Bench Pro / OSWorld-Verified bei ~2× Geschwindigkeit
- **Befund:** GPT-5.4 mini nähert sich dem größeren GPT-5.4 auf SWE-Bench Pro und OSWorld-Verified bei ~2× Geschwindigkeit; nano kann ~76.000 Fotos für $52 captionen ($0,20/$1,25 pro 1M).
- **Originalquelle:** OpenAI / Simon Willison · 2026-03-17 · openai.com / simonwillison.net
- **Fundstelle:** daily/2026/03/2026-03-17.md → Top stories (auch weekly W12)
- **Datum:** 2026-03-17
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Etabliert SWE-Bench Pro als Standard-Vergleichsachse bereits Mitte März; nano-Pricing als economics-Anker.
- **Zitat:** "mini brings ≥2× speed and approaches GPT-5.4 on SWE-Bench Pro / OSWorld-Verified"

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

## Querschnitt: Belege aus anderen Clustern (für Benchmark-Zahlen relevant)

### Claude Opus 4.8 Benchmark-Vollstand (Querbeleg aus Modell-/Markt-Cluster)
- **Befund:** Claude Opus 4.8 (Mai 2026): 88,6% SWE-bench Verified, 69,2% SWE-Bench Pro, 74,6% Terminal-Bench 2.1, 93,6% GPQA Diamond bei unverändertem $5/$25-Preis; 2,5×-schnellerer/~3×-günstigerer Fast-Mode.
- **Originalquelle:** Anthropic, Claude Opus 4.8 Launch · 2026-05-28/29 · monthly/2026-05.md, weekly/2026-W22.md
- **Fundstelle:** weekly/2026/2026-W22.md → Releases; monthly/2026/2026-05.md → Major releases
- **Datum:** 2026-05-28
- **Status ggü. bisherigem Stand:** bestätigt (Dedupe mit Opus-4.8-Eintrag oben — selbe Zahlen, hier mit zusätzlichem Pro-69,2%-Wert aus W22-Fundstelle)
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Aktuellster vollständiger Benchmark-Stand für das führende Coding-Modell aus dem Markt-Cluster.
- **Zitat:** "88.6% SWE-bench Verified ... 69.2% Pro ... 74.6% on Terminal-Bench 2.1"

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

### Hyperscribe-Feldreport: Median-Qualität 84%→95%, Fehlerberichte 79%→30%
- **Befund:** Kontrollierter Feldreport zu Hyperscribe (EHR-eingebetteter klinischer KI-Agent): sieben Versionen evaluiert, Median-Qualität stieg von 84% auf 95%, Live-Fehlerberichte fielen von 79% auf 30% über drei Monate (20 Kliniker, 1.646 Rubrics, 823 Fälle).
- **Originalquelle:** Aaryan Shah, Andrew Hines · arXiv:2604.27309 · 2026-04-30
- **Fundstelle:** papers/2026/04/2026-04-30.md; daily/2026/04/2026-04-30.md → Papers
- **Datum:** 2026-04-30
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Seltener kontrollierter Feld-Datenpunkt mit harten Qualitäts- und Fehlerquoten; zeigt, dass Gewinne erst durch laufende Governance/Versionierung entstehen.
- **Zitat:** "median quality 84%→95%; live error reports dropped from 79% to 30%"

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

### Anthropic Project Glasswing: 10.000+ Vulns / 1.094 bestätigte True Positives
- **Befund:** Anthropics Project Glasswing flagte in ~30 Tagen 10.000+ kritische/hohe Vulnerabilities über 1.000+ Open-Source-Projekte (1.094 bestätigte True Positives; inkl. 27-Jahre-OpenBSD-Bug, 16-Jahre-FFmpeg-Flaw, CVE-2026-5194 WolfSSL); Cloudflare fand 2.000, Mozilla patchte 271 Firefox-Bugs zur 10×-Rate.
- **Originalquelle:** Anthropic (Project Glasswing 30-day Update) · 2026-05-26 · anthropic.com/research/glasswing-initial-update
- **Fundstelle:** weekly/2026/2026-W22.md → AI security pivots; daily/2026/05/2026-05-24.md → Glasswing
- **Datum:** 2026-05-24/26
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** korrigiert: date_wrong — die Glasswing-30-day-Update-Zahlen erschienen detailliert in daily 2026-05-26 (Backing-Quellen 05-26 bis 05-31).
- **Art:** Beleg
- **Notiz:** Kern-Beleg für den Validierungs-/Patch-Bottleneck — Engpass verschiebt sich von Detection zu Patch/Maintainer-Throughput.
- **Zitat:** "the bottleneck moves from detection to patch/maintainer throughput"

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

### METR-Selbstbericht-Umfrage: Eigeneinschätzung 1,3× → 2,0× → 2,5× (Vorsicht: nicht randomisiert)
- **Befund:** METR-Selbstbericht-Umfrage: 349 technische Fachkräfte beziffern den "Wert ihrer Arbeit" auf 1,3× (März 2025) → 2,0× (März 2026) → Prognose 2,5× (März 2027).
- **Originalquelle:** METR · 2026-05-11 · metr.org/blog/2026-05-11-ai-usage-survey/
- **Fundstelle:** news/2026/05/2026-05-19.md → LinkedIn/Items
- **Datum:** 2026-05-11
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Caveat: SELBSTBERICHTETE Umfrage, NICHT die randomisierte METR-Kontrollstudie — Zahlen sind Eigeneinschätzung und tendenziell optimistisch)
- **Art:** Beleg / mit starkem Vorbehalt
- **Notiz:** Wichtig zur Abgrenzung gegen die randomisierte METR-Studie; die hier genannten Multiplikatoren sind self-reported.
- **Zitat:** "1.3x value of work March 2025 → 2.0x March 2026 → 2.5x March 2027 forecast"

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

## Gegenevidenz / Einschränkungen (in diesem Cluster)

- **Eval-Gap (autoritativ):** International AI Safety Report 2026 (Bengio, 30+ Nationen) und der UK-AISI-Trendreport benennen, dass Pre-Deployment-Tests realen Nutzen/Risiko nicht zuverlässig vorhersagen; AISI quantifiziert degradierende Oversight (Cyber 9→50%, Self-Replication <5→>60%).
- **Contamination:** OpenAI stoppte SWE-bench-Verified-Reporting (Feb 2026) wegen Contamination (SemiAnalysis); LaRA erweitert die Contamination-Debatte auf RL-Post-Training; der Forge-HN-Thread zeigt, wie Sprünge (53→99%) sofort als Contamination verdächtigt werden.
- **Harness ≠ Modell:** Cursor 46→80% und LangChain 52,8→66,5% auf identischen Gewichten zeigen, dass Benchmark-Sprünge vom Harness statt vom Modell kommen können (misattributed-korrigiert: Autor Ahmed Albadri; der SWE-agent-ACI-Claim 3,8→12,47% war nicht belegt und wurde entfernt). IBM/Hugging Face institutionalisieren dies mit einem Harness-Leaderboard.
- **Benchmark vs. Produktion:** ClawBench (~33,3%) und Claw-Eval-Live (~66,7%) zeigen scharfen Abfall von Lab-Scores auf reale Web-/sich-ändernde Workflows; EnterpriseOps-Gym, EvoClaw und SlopCodeBench proben Failure-Modes (Drift, Regression, Slop), die SWE-bench strukturell nicht sieht.
- **Eval-Mechanik fragil:** AMEL zeigt systematische Ordnungs-Drift in LLM-as-judge-Pipelines (d=−0,17, p<10^−46); der Reward-Hacking-Benchmark zeigt, dass Agenten die Eval selbst manipulieren; Multi-Agent-Debate kann Generierung um bis zu −15,5pp verschlechtern.
- **Metrik misst nicht Wahrheit:** Qwen3.7-Max-SOTA-Non-Hallucination-Claim wird als Alignment mit Test-Builder-Überzeugungen statt Wahrheit kritisiert; "What Benchmarks Don't Measure" fordert Abstention-Kompetenz als Eval-Dimension.
- **Capability-Lücke öffentlich vs. privat:** ExploitBench quantifiziert eine scharfe Lücke zwischen deployten und gegateten Frontier-Modellen — Leaderboard-Scores öffentlicher Modelle sind nicht die Capability der privaten Frontier.
- **Selbstbericht-Caveat:** Die METR-1,3×→2,0×→2,5×-Zahlen sind self-reported (nicht die randomisierte Kontrollstudie); die Salesforce-ROI-Zahlen sind vendor-eigen und unauditiert.
- **Produktions-Halluzination:** Ontario-Audit (60% Medikamenten-Verwechslung) und die 110K-PR-Churn-Studie zeigen reale Qualitäts-/Stabilitätsprobleme, die Benchmark-Headlines nicht abbilden — Ontario-Caveat: keine menschliche Baseline im Audit.
- **Transparenz:** Stanford AI Index 2026 — Foundation Model Transparency Index fiel 58→40; Eval-Rigorosität fällt hinter Capability zurück.

## Verwendbarkeit (Hinweis für die Konsolidierung)

- **Starke, gut belegte Capability-Anker:** SWE-bench Verified (Opus 4.8 88,6% · confirmed; Mistral Medium 3.5 77,6% · date-korrigiert; Tencent Hy3 74,4% · confirmed), SWE-Bench Pro (Opus 4.8 69,2%, GLM-5.1 58,4 · beide confirmed) und Terminal-Bench 2.1 (Opus 4.8 74,6%, Gemini 3.5 Flash 76,2% · confirmed) sind die belastbarsten Zahlen, um den Capability-Stand zu beziffern.
- **Robuste Eval-Kritik:** Die Gegenevidenz (Eval-Gap, Contamination, Harness-vs-Model, ClawBench-Realwelt-Abfall) ist breit und teils autoritativ belegt (Bengio-Report, UK AISI, Stanford AI Index) — gut geeignet, um Benchmark-Zahlen anderer Cluster zu relativieren, ohne sie zu entwerten.
- **Vorsichtig zu behandeln:** Self-reported (METR-Umfrage), vendor-eigen/unauditiert (Salesforce-ROI), Einzelquelle (65%-Kontext-Zahl, Medium), sowie alle Items mit "nicht einzeln verifiziert" (u.a. Vals AI 64,37%, Sakana 83,9%/87,5%, GPT-5.5 −52,5%, Mythos-271-Firefox-Vulns, Spec-Compliance 15,0→2,0%). Korrigierte Items explizit kennzeichnen: Harness-Δ (misattributed), Mistral-Datum (date_wrong), Stanford-"größte-Lücke"-Claim (entfernt), Glasswing-Datum (date_wrong).
- **Dünn / einzelner Datenpunkt:** CyberGym hat nur einen Score (MDASH 88,45%, via LinkedIn); $/solve-Metrik nur aus einem anon. arXiv-Paper; "Harness-Leaderboard" und CUBE sind Trend-/Strukturhinweise ohne Vergleichszahlen. Diese als illustrativ, nicht als belastbare Vergleichsbasis behandeln.
