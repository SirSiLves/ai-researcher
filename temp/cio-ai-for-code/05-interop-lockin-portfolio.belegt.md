# Interoperabilität, Lock-in & Modell-Portfolio

_Belegsammlung (Rohmaterial für spätere CIO-Konsolidierung). Stichtag Archiv: 2026-06-03. Neutral, vollständig, jede Zahl mit Quelle + Verifizierungsstatus._

> _Angereicherte Fassung: zu jedem Befund wurde **Beleg im Original** (wörtlicher Quelltext aus der Archiv-Datei bzw. Online-Quelle) und **Quell-Link** ergänzt. Erzeugt aus der Originaldatei `05-interop-lockin-portfolio.md`; Zahlen unverändert._


## Worum es geht

Dieser Cluster sammelt Belege zur Frage, wie portabel bzw. austauschbar die Bausteine einer agentischen Software-Engineering-Landschaft sind: offene Interoperabilitätsstandards (MCP, A2A), modell-agnostische Gateways/Orchestrierung, Multi-Modell-Routing, kleine/domänenadaptierte Modelle (SLMs), Migrationskosten sowie Vendor-Lock-in, Metering/„Tollbooth"-Mechanismen und die Control-Plane-Debatte (offen vs. ummauert). Das Material kann CIO-relevante Fragen adressieren wie: Wie etabliert ist MCP/A2A als Produktionsstandard, wie weit sinken Wechsel-/Migrationskosten, welche ökonomischen Effekte hat Modell-Portfolio/Routing, und wo entstehen neue Abhängigkeiten (Datenbesitz, Metering, Governance-Lücken).

## Befunde
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
- **Beleg im Original:** [Capability Advertisement as a Market for Lemons: A Trust Layer for Heterogeneous Agent Networks](https://arxiv.org/abs/2606.03034)** — Gaurav Naresh Mittal. Argues MCP/A2A registries naively treat advertised agent capabilities as static and truthful, creating an adverse-selection problem, and proposes a trust/verification layer. The most pointed of several agent-trust papers today and a direct theoretical counterpoint to the "just open the MCP server" enterprise enthusiasm.
- **Quell-Link:** https://arxiv.org/abs/2606.03034

### ServiceNow Action Fabric GA — offener MCP-Server als Gegenpol zu SAP
- **Befund:** ServiceNow stellte auf Knowledge 2026 „Action Fabric" GA — einen Model-Context-Protocol-Server, der das gesamte System of Action für jeden Agenten (Claude, Copilot, eigene) öffnet — als direkter Gegensatz zu SAPs Joule-Mauer.
- **Originalquelle:** ServiceNow Newsroom · 2026-06-03
- **Fundstelle:** daily/2026/06/2026-06-03.md → Top items #3; weekly/2026/2026-W23.md → openness vs tolls
- **Datum:** 2026-06-03
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Art:** Beleg
- **Notiz:** Signal, dass grosse Enterprise-Plattformen auf offenen MCP-Zugang setzen — das offene Gegenstück zu SAP.
- **Zitat:** „opens its full system of action to any agent ... through a generally available MCP server"
- **Beleg im Original:** The third arc is structural. At Build 2026 on June 2, Microsoft turned from buyer to builder: Project Polaris, its own coding model on Maia 200 silicon, will replace GPT-4 Turbo as the default Copilot engine by August, and two days later the MAI group shipped seven first-party models, including a 1-trillion-parameter (35B-active) reasoner, MAI-Thinking-1. Microsoft now owns the model, the inference silicon, and the developer surface end to end — a renegotiation of the field's most important partnership, executed in public and pitched explicitly on lowering developer cost. Around it, the …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### SAP API-Policy v4/2026 §2.2.2 — der „Tollbooth" über Joule/A2A
- **Befund:** SAPs API-Policy v4/2026 §2.2.2 blockiert externe AI-Agenten vom eigenständigen Scheduling/Ausführen von Calls und zwingt sie über die eigene Joule-Schicht unter A2A — der „Tollbooth", der laut Dave Medd „vor zwei Monaten noch nicht existierte".
- **Originalquelle:** Dave Medd „The Tollbooth Appears" (LinkedIn) · 2026-06-03; SAP API Policy (29. Apr.)
- **Fundstelle:** daily/2026/06/2026-06-03.md → Practitioner pulse; daily/2026/06/2026-06-01.md → enterprise tollbooth; weekly/2026/2026-W18.md
- **Datum:** 2026-06-03
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Art:** Beleg (Lock-in/Metering)
- **Notiz:** Klarstes Tollbooth-Beispiel: SAP definiert den vermittelnden Agenten und metert A2A-Verkehr.
- **Zitat:** „a toll layer that two months ago did not exist"
- **Beleg im Original:** SAP blocks external AI agents while Salesforce and ServiceNow open up** — SAP's API Policy v4/2026 (§2.2.2) prohibits AI systems that independently schedule or execute API calls, forcing any external agent (Microsoft Copilot for Finance, Salesforce Agentforce, ServiceNow agents) to route through SAP's own Joule agents under A2A. Salesforce goes the opposite way — headless, MCP-first, welcoming third-party agents as first-class users — while ServiceNow's "Action Fabric" lets external agents in but mediates and meters them. _Why it matters:_ the agent-interoperability fight is now a …
- **Quell-Link:** https://www.techzine.eu/blogs/applications/141323/sap-blocks-external-ai-agents-salesforce-and-servicenow-dont/

### MCP-Skala-Stand Anfang Juni: ~97M Downloads, 18.000+ indexierte Server unter LF AAIF
- **Befund:** Anfang Juni 2026 zitiert das Archiv weiterhin ~97 Mio. monatliche MCP-SDK-Downloads; MCP wird von der Linux Foundation AAIF mit 18.000+ indexierten Servern verwaltet; „MCP-für-Tools + A2A-für-Koordination" als Referenzarchitektur.
- **Originalquelle:** MCP Blog (RC-Posting) / a2a-protocol.org · 2026-06-02/03
- **Fundstelle:** daily/2026/06/2026-06-02.md → MCP RC item; daily/2026/06/2026-06-03.md → MCP June 2026 spec
- **Datum:** 2026-06-03
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Neuester Archiv-Stand zur Skala; 97M-Downloads weiter genannt, Serverzahl auf 18.000+ indexiert gestiegen.
- **Zitat:** „governed by the Linux Foundation's Agentic AI Foundation with 18,000+ indexed servers"
- **Beleg im Original:** MCP June 2026 spec targets server-as-agent / recursive composition** — The upcoming spec is expected to let MCP servers connect to other MCP servers for recursive composition. MCP is now governed by the Linux Foundation's Agentic AI Foundation with 18,000+ indexed servers; the "MCP-for-tools + A2A-for-coordination" two-layer model has crystallized as the reference architecture. _Why it matters:_ the protocol layer is consolidating under neutral governance — the precondition for real cross-vendor agent interop. ([A2A](https://a2a-protocol.org/latest/))
- **Quell-Link:** https://a2a-protocol.org/latest/

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
- **Beleg im Original:** MCP / A2A consolidate as enterprise interop substrate; AWS ships agent payments; security has its first hardening week** — Mon-Wed: AWS MCP Server GA (first hyperscaler with IAM / CloudTrail / CloudWatch wiring; one tool fronts 300+ services + 15,000+ APIs). ServiceNow MCP Server GA in every Now Assist SKU; Salesforce Tableau MCP; Anthropic 20+ MCP connectors + 12 legal plugins; Snowflake Cortex MCP connectors (Atlassian / GitHub / Salesforce / Google Workspace / Slack). Thu May 14: Stripe Agentic Commerce Protocol opens Link wallet (250M users) to AI agents — co-authored with OpenAI. Fri May …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### Schweizer Stellen-Skill-Signal: LiteLLM/LangChain/LangGraph/CrewAI/n8n
- **Befund:** LiteLLM, LangChain, LangGraph, CrewAI und n8n sind das dominante Skill-Signal in Schweizer Stelleninseraten (BLP Digital, Bank J. Safra Sarasin, Sunrise, Eraneos) — modell-agnostische Gateways/Orchestrierung als gefragte Praxis.
- **Originalquelle:** Schweizer Job-Postings · 2026-06-02/03
- **Fundstelle:** weekly/2026/2026-W23.md → Agentic-orchestration demand; daily/2026/06/2026-06-02.md → jobs
- **Datum:** 2026-06-03
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext (Praxis-Puls)
- **Notiz:** LiteLLM (unified LLM proxy/gateway) + LangGraph als gefragte modell-agnostische Skills — Portfolio-Ansatz im Schweizer Markt.
- **Zitat:** „Orchestration frameworks (LiteLLM, n8n, LangChain, LangGraph, CrewAI)"
- **Beleg im Original:** AI Engineer** at **Bank J. Safra Sarasin** — Switzerland. Orchestration frameworks (LiteLLM, n8n, LangChain, LangGraph, CrewAI); RAG on pgvector / Azure AI Search. ([link](https://www.glassdoor.com/Job/switzerland-artificial-intelligence-jobs-SRCH_IL.0,11_IN226_KO12,35.htm))
- **Quell-Link:** https://www.glassdoor.com/Job/switzerland-artificial-intelligence-jobs-SRCH_IL.0,11_IN226_KO12,35.htm

### Trend-Radar (3. Juni): MCP/Interop strukturell schwer und konsolidierend
- **Befund:** „MCP adoption" rangiert im 30-Tage-Radar mit Importance 822 (30 Tage Präsenz / 7 Quellen, Breite 48 Orgs); „Agent SDKs" 908, „Multi-agent coordination" 850, „A2A protocol" 440, „Tool-use standards" 489 — alle als strukturell schwer/konsolidierend eingestuft.
- **Originalquelle:** Trend-Radar · 2026-06-03
- **Fundstelle:** radar/2026/06/2026-06-03.md → Agents & infrastructure cluster
- **Datum:** 2026-06-03
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext
- **Notiz:** Bestätigt, dass MCP/Interop strukturell schwer und konsolidierend ist (nicht nur Wochen-Lärm).
- **Zitat:** „MCP adoption — importance 822 · 30d presence · breadth 48 · consolidating"
- **Beleg im Original:** | 6 | MCP adoption | 822 | 30d/7s | 48 | consolidating | Agents & infrastructure |
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### ServiceNow/SAP/Workday metern Agentenzugriff; GitHub Copilot wechselt zu AI Credits
- **Befund:** ServiceNow, SAP und Workday meterten ab dem 1. Juni 2026 Agenten-Zugriff direkt („pay to play"); zugleich wechselte GitHub Copilot alle Pläne auf nutzungsbasierte „AI Credits" zu 1¢ pro Credit. Pro+ enthält $39/Mo Credits, Business $19/User + $19, Enterprise $39 + $39; Code-Completions/Next-Edit bleiben unbegrenzt.
- **Originalquelle:** GitHub Blog (github.blog) · 2026-06-01; news/daily 2026-06-01
- **Fundstelle:** news/2026/06/2026-06-01.md → GitHub Copilot usage-based billing; daily/2026/06/2026-06-01.md
- **Datum:** 2026-06-01
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Metering/Tollbooth)
- **Notiz:** Beendet das All-you-can-eat-AI-Coding-Abo; Datenbesitz an System-of-Record wird zur Pricing-Macht über den Agent-Stack; „meter shock" droht.
- **Zitat:** „all Copilot plans shift ... to 'GitHub AI Credits' (1 credit = $0.01)"
- **Beleg im Original:** The less glamorous but more immediately practical story is that the all-you-can-eat AI-coding subscription died today. GitHub Copilot moved every plan to metered "AI Credits" priced at one cent each, consumed against per-model token rates: Pro+ now bundles $39 a month in credits, Business stays $19 per user with $19 in credits, and Enterprise lands at $39 with a matching allowance. Code completions and next-edit suggestions stay unlimited and unmetered, but agentic sessions now bill by consumption. It is the clearest signal yet that escalating inference cost is forcing the entire category …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### Datenbesitz als Pricing-Macht über den Agent-Stack
- **Befund:** ServiceNow, SAP und Workday metern und berechnen Agent-Zugriff jetzt direkt; SAP blockiert externe Agents und routet alles durch Joule, ServiceNow öffnet via GA-MCP-Server (Action Fabric) für jeden Agent. „Wer die System-of-Record-Daten besitzt, entscheidet, welchen Agent-Stack du nutzen darfst — und berechnet ihn dir."
- **Originalquelle:** Reporting / Vendor-Policies · 2026-06-01 · zusammengefasst in daily/weekly
- **Fundstelle:** daily/2026/06/2026-06-01.md (Zeile 12+39); weekly/2026/2026-W23.md → enterprise-agent layer fractures
- **Datum:** 2026-06-01
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg (Lock-in via Datenbesitz)
- **Notiz:** Enterprise-Agent-Layer spaltet sich in „offen vs. Maut"; Datenbesitz wird zur Pricing-Macht über den Agent-Stack.
- **Zitat:** „ServiceNow, SAP and Workday are now metering agent access outright"
- **Beleg im Original:** SAP blocks external AI agents while Salesforce and ServiceNow open up** — SAP's API Policy v4/2026 (§2.2.2) prohibits AI systems that independently schedule or execute API calls, forcing any external agent (Microsoft Copilot for Finance, Salesforce Agentforce, ServiceNow agents) to route through SAP's own Joule agents under A2A. Salesforce goes the opposite way — headless, MCP-first, welcoming third-party agents as first-class users — while ServiceNow's "Action Fabric" lets external agents in but mediates and meters them. _Why it matters:_ the agent-interoperability fight is now a …
- **Quell-Link:** https://www.techzine.eu/blogs/applications/141323/sap-blocks-external-ai-agents-salesforce-and-servicenow-dont/

### Snowflake Summit: governed-data-and-context plane mit Claude, offene Interoperabilität
- **Befund:** Snowflake Summit 2026 setzte auf die „governed-data-and-context plane" (Cortex Sense/Training, CoWork, Horizon Catalog via Apache Polaris + Iceberg v3, offenes Interoperabilitäts-Framework) mit Claude als Foundational Model — explizit das Gegenteil von Single-Vendor-Lock-in.
- **Originalquelle:** Snowflake BusinessWire/Press · 2026-06-02/03
- **Fundstelle:** daily/2026/06/2026-06-03.md → Top items #2; daily/2026/06/2026-06-02.md → Snowflake Summit
- **Datum:** 2026-06-02
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Art:** Beleg
- **Notiz:** Inverse von Microsofts Full-Stack-Wette: eigene den governed-Daten-Layer, nicht das Modell; offene Daten als Schlachtfeld gegen Lock-in.
- **Zitat:** „own the governed-data-and-context plane that agents run on top of, not the model"
- **Beleg im Original:** A third front opened from the data side. At Snowflake Summit 2026, the company centered the "agentic enterprise" with Cortex Sense (a shared context layer for agents), Cortex Training (managed GPU fine-tuning of open models like Qwen and Mistral), the Horizon Catalog for cross-system governance via Apache Polaris and Iceberg v3, and a rebrand of Snowflake Intelligence to "CoWork." It is the inverse of Microsoft's full-stack bet: own the governed-data-and-context plane that agents run on top of, not the model itself. Underneath all of it, Hacker News spent the day not on technology but on …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### Snowflake Cortex Training: managed Fine-Tuning offener Modelle (Qwen/Mistral)
- **Befund:** Snowflake Cortex Training bietet managed GPU-Fine-Tuning offener Modelle wie Qwen und Mistral auf proprietären Daten — domain-adaptierte Modelle als Default-Feature der Daten-Plattform.
- **Originalquelle:** Snowflake Summit · 2026-06-02
- **Fundstelle:** daily/2026/06/2026-06-02.md → Snowflake Summit; daily/2026/06/2026-06-03.md
- **Datum:** 2026-06-02
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Art:** Beleg (SLM/domänenadaptiert)
- **Notiz:** Konkretes Produkt für domänenangepasste, offene Modelle (Qwen/Mistral) auf eigenen Daten — Anti-Frontier-Lock-in auf Modellebene.
- **Zitat:** „Cortex Training (managed GPU fine-tuning of open models like Qwen and Mistral)"
- **Beleg im Original:** Underneath the money, the structural fight of the day was over who owns the enterprise plane. ServiceNow opened its full system of action to any agent — Claude, Copilot, or homegrown — through a generally available MCP server it calls Action Fabric, a direct rebuke to SAP's meter-everything-through-Joule posture that LinkedIn's "The Tollbooth Appears" dissected the same morning. Snowflake Summit fully landed in the same key: Cortex Training, the CoWork personal agent, Cortex Sense, and an open interoperability framework, all governed by default and all powered by Claude as Snowflake's …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### Microsoft Build: Windows Agent Framework 1.0 (MIT), Azure Agent Mesh, Foundry first-party Modelle
- **Befund:** Microsoft öffnete auf Build 2026 das Windows Agent Framework 1.0 unter MIT, modell-agnostisch (läuft Claude, Gemini, alles); Azure Agent Mesh federiert Agenten-Ausführung über Azure/AWS Bedrock/Google Cloud/on-prem (GA Q4); Azure AI Foundry machte Claude/DeepSeek/Llama/Mistral first-party.
- **Originalquelle:** windowsnews.ai / aitoolsrecap / epcgroup · 2026-06-02
- **Fundstelle:** daily/2026/06/2026-06-02.md → Microsoft Build items (WAF, Agent Mesh, Foundry)
- **Datum:** 2026-06-02
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Art:** Beleg (modell-agnostisch/Multi-Cloud)
- **Notiz:** Klassisches Framework-verschenken/Plattform-besitzen; explizit multi-cloud, nicht Azure-only.
- **Zitat:** „Model-agnostic (runs Claude, Gemini, anything)"
- **Beleg im Original:** At Build 2026 in San Francisco, Satya Nadella reframed AI from synchronous assistant to "async coworker," and the proof point was Project Polaris — Microsoft's own coding model, trained and served on its Maia 200 silicon, set to replace GPT-4 Turbo as the default GitHub Copilot engine for every subscriber by August 2026. The migration is automatic, with only an optional three-month fallback. Around it Microsoft shipped the full stack: Windows Agent Framework 1.0 open-sourced under MIT, an Azure Agent Mesh control plane that federates agent execution across Azure, AWS Bedrock, Google Cloud and …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

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
- **Beleg im Original:** Releases tilt to cheap-and-fast; the open-weight cost ceiling moves inside the frontier narrative** — Anthropic shipped Claude Opus 4.8 (88.6% SWE-bench Verified, 69.2% Pro, 74.6% Terminal-Bench 2.1, 93.6% GPQA Diamond at unchanged $5/$25 per-MTok; a 2.5×-faster/~3×-cheaper fast mode; and "dynamic workflows" that let Claude write orchestration scripts spinning up tens-to-hundreds of parallel subagents in one session — moving orchestration inside the model). Google shipped Gemini 3.5 Flash to GA with frontier agentic scores (76.2% Terminal-Bench 2.1, 83.6% MCP Atlas) at ~1/2–1/3 peer cost, …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### „Domain expertise has always been the real moat" (HN, 779 Punkte)
- **Befund:** „Domain expertise has always been the real moat" erreichte 779 Punkte / 488 Kommentare auf Hacker News — Domänenexpertise, nicht das Modell oder Coding selbst, sei der eigentliche Burggraben. Pushback: Modelle sind auf frühere Implementierungen vortrainiert, viel „Ambiguität" war im Trainingsset bereits aufgelöst.
- **Originalquelle:** brethorsting.com / Hacker News · 2026-05-31 · news.ycombinator.com/item?id=48340411
- **Fundstelle:** hackernews/2026/05/2026-05-31.md → Domain expertise; weekly/2026/2026-W22.md
- **Datum:** 2026-05-31
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert (Punktzahl/HN-Thread bestätigt; Interpretation Praktiker-Diskurs)
- **Art:** Kontext (Anti-Lock-in-Argument)
- **Notiz:** Untermauert, dass der portable Wert in Domäne/Daten liegt, nicht im Modell-Anbieter.
- **Zitat:** „domain expertise has always been the real moat"
- **Beleg im Original:** Sentiment tilted skeptical.** A measurable AI-fatigue cluster trended on Hacker News all week — "I'm Tired of Talking to AI" (1,717 pts), "MCP is dead?", cost-rationing, AI-job-grief — alongside a $5–10T-payback debate and "domain expertise is the real moat" (779 pts). The Vatican encyclical produced its first ethics-washing counter-narrative.
- **Quell-Link:** https://news.ycombinator.com/item?id=48340411

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
- **Beleg im Original:** [MCP is dead?](https://www.quandri.io/engineering-blog/mcp-is-dead)** — 392 pts · 388 comments · 1 day ago · `www.quandri.io` · [HN discussion](https://news.ycombinator.com/item?id=48330436)
- **Quell-Link:** https://www.quandri.io/engineering-blog/mcp-is-dead

### Salesforce: 33-Endpoint-API-Migration ~18× schneller (231→13 Personentage)
- **Befund:** Salesforce migrierte 33 API-Endpunkte ~18× schneller (231 Personentage geschätzt → 13 tatsächlich) mit Claude Code; Gesamtbild: +79% PRs/Entwickler, ~5% weniger Incidents, +50,8% YoY Work-Items — der grösste First-Party-Agentic-Coding-ROI bisher (Hersteller-eigene, ungeprüfte Zahlen).
- **Originalquelle:** Salesforce Q1 FY27 / „How engineering became agentic" · 2026-05-27/28 · salesforce.com/news
- **Fundstelle:** weekly/2026/2026-W22.md → Enterprise agent revenue; monthly/2026/2026-05.md
- **Datum:** 2026-05-27
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Zahl bestätigt; vendor-reported und unaudited)
- **Art:** Beleg (Migrationskosten)
- **Notiz:** Konkrete Migrations-Beschleunigungszahl, die Willisons „Lock-in reversibel"-These stützt; explizit vendor-eigen und nicht unabhängig geprüft.
- **Zitat:** „a 33-endpoint API migration estimated at 231 person-days finished in 13 (~18×)"
- **Beleg im Original:** Underneath the capital story, enterprise agent revenue stopped being a debate. Salesforce printed $1.2B in Agentforce ARR (+205% YoY, 28.6T tokens) — the first clean Tier-1-SaaS data point past $1B — and reported its own engineering org on Claude Code at +79% PRs/developer and a 33-endpoint migration done ~18× faster. Anthropic verticalized across finance, legal, SMB, SAP, M365 and the Big Four (PwC 30,000 staff, KPMG 276,000, EY/Microsoft) and took the Ramp AI Index lead from OpenAI (34.4% vs 32.3%) — the first US business-AI-adoption lead change of the cycle. Every major enterprise platform …
- **Quell-Link:** https://salesforce.com/news

### Caleb Sima: Multi-Provider-Routing 40–70% Token-Kosten-Reduktion
- **Befund:** „Agents are Boring. The Future is the Harness": Multi-Provider-Routing erzielt 40–70% Token-Kosten-Reduktion, während einzelne autonome Agenten $5K–$25K/Tag verbrennen können.
- **Originalquelle:** Caleb Sima (LinkedIn) · ~2026-05-21 · zit. in weekly/2026-W21.md
- **Fundstelle:** weekly/2026/2026-W21.md → „Agents are Boring. The Future is the Harness"
- **Datum:** 2026-05-21
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Routing-Ökonomie)
- **Notiz:** Quantifiziert den ökonomischen Vorteil von Modell-Portfolio/Routing gegenüber Single-Provider-Lock-in.
- **Zitat:** „multi-provider routing yields 40-70% token-cost reductions"
- **Beleg im Original:** ["Agents are Boring. The Future is the Harness" — Caleb Sima](https://www.linkedin.com/pulse/agents-boring-future-harness-caleb-sima-uojqe)**. Phases the agent evolution: Phase 1 standalone agent → Phase 2 orchestrator + subagents → Phase 3 *the harness* (orchestrator wired into Linear/queues/cron/approval gates with human as reviewer). Cost as the 2026 constraint nobody pitched: single autonomous agents can burn $5K-$25K/day; multi-provider routing yields 40-70% token-cost reductions.
- **Quell-Link:** https://www.linkedin.com/pulse/agents-boring-future-harness-caleb-sima-uojqe

### Maxim Salnikov: ~24× Kostengap Opus 4.7 vs. GPT-5.4 mini; Modell-Routing als Hebel
- **Befund:** ~24× Kostenlücke zwischen Claude Opus 4.7 und GPT-5.4 mini — Modell-Routing (Reasoning-Modelle für Planung, Mid-Tier für Implementierung, kleine Modelle für Refactors; Auto Mode im Juni) und relevanter Kontext sind die grössten Kostenhebel. Compound-Error: 99% Genauigkeit/Schritt über 50 Schritte ≈ 60% Erfolg; 95% ≈ 8%.
- **Originalquelle:** Maxim Salnikov (Microsoft/GitHub), LinkedIn · 2026-05-28 · linkedin.com/pulse/practitioners-guide-getting-more-value-out-ai-coding-agent-salnikov-mhume
- **Fundstelle:** linkedin/2026/05/2026-05-28.md (Zeile 29)
- **Datum:** 2026-05-28
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg (Routing/Portfolio-Ökonomie)
- **Notiz:** Operativster Token-Ökonomie-Leitfaden; quantifiziert Modellwahl als ~24×-Hebel.
- **Zitat:** „~24× cost gap between Claude Opus 4.7 and GPT-5.4 mini"
- **Beleg im Original:** A practitioner's guide to getting more value out of AI coding: agent quality & token optimization** — Maxim Salnikov, Microsoft/GitHub (lang: en). GitHub workshop write-up triggered by GitHub's shift from premium-requests to usage-based billing. Core reframe: stop asking "how do we cut token spend?" and start asking "how do we make every token count?" Compound-error math that should haunt anyone running multi-step agents — 99% accuracy/step over 50 steps = ~60% workflow success; 95% accuracy/step = ~8%. The two biggest levers vastly outweigh everything else: model choice (~24× cost gap …
- **Quell-Link:** https://linkedin.com/pulse/practitioners-guide-getting-more-value-out-ai-coding-agent-salnikov-mhume

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
- **Beleg im Original:** Chinese-model adoption hits 60% of OpenRouter usage — CNBC investigation warns cheap AI could derail OpenAI/Anthropic IPO valuations** — CNBC's May 20 investigation (widely refreshed May 22) cites Artificial Analysis benchmarking that running a standard 10-evaluation workload costs $4,811 with Claude, $3,357 with ChatGPT, $1,071 with DeepSeek, $948 with Kimi, and $544 with Zhipu GLM — Claude is ~9x more expensive than the cheapest Chinese alternative for the same workload. On OpenRouter, Chinese-model share rose from ~1% in 2024 to over 60% by May 2026. Databricks CEO Ali Ghodsi described the …
- **Quell-Link:** https://cnbc.com/2026/05/20/cheap-ai-could-derail-openai-and-anthropics-ipos.html

### Cohere Command A+: erstes frontier-klassiges Apache-2.0-Enterprise-Modell
- **Befund:** Cohere Command A+ (23. Mai) ist das erste frontier-klassige Enterprise-Modell mit voller Apache-2.0-Lizenz ohne Commercial-Use-Steuer (218B sparse MoE / 25B aktiv, läuft auf 2× H100 oder 1× B200, native Grounding-Span-Zitate, 48 Sprachen, $2,50/$10 pro M Tokens).
- **Originalquelle:** Cohere · 2026-05-23
- **Fundstelle:** weekly/2026/2026-W21.md → Cohere Command A+
- **Datum:** 2026-05-23
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg (offene Modelle / Portfolio)
- **Notiz:** Gibt souveränen Käufern (EU/UK/Gulf) eine frontier-klassige Apache-2.0-Option — schärft die Open-vs-Frontier-Distributionswahl.
- **Zitat:** „First frontier-class enterprise-positioned model without the usual 'open weights but no commercial use' tax"
- **Beleg im Original:** Frontier-lab talent + open-weights + app-layer story — Karpathy → Anthropic; Cohere Command A+ ships full Apache 2.0; Mistral acquires Emmi for vertical engineering AI; Cursor Composer 2.5 tests the app-layer thesis; DeepSeek stands up "Harness" team for DeepSeek Code** — Mon May 19: **Andrej Karpathy** (OpenAI founding member, ex-Tesla AI Director, founder of Eureka Labs) **joins Anthropic** to lead a new pre-training research team under **Nick Joseph**, with an explicit charter to "use Claude to accelerate pre-training research." Karpathy: "I think the next few years at the frontier of LLMs …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### MCP 2026-07-28 Release Candidate — grösste Spec-Revision seit Launch
- **Befund:** Der MCP-2026-07-28-Release-Candidate (publiziert 23. Mai 2026) ist die grösste Spec-Revision seit Launch: stateless Core, Tasks-Extension, MCP Apps (server-gerenderte UI), OAuth/OIDC-aligned Auth, formale Deprecation-Policy; 10-Wochen-Validierungsfenster; AWS/ServiceNow/Snowflake/Weaviate liefern bereits.
- **Originalquelle:** MCP Blog (blog.modelcontextprotocol.io) · 2026-05-23
- **Fundstelle:** weekly/2026/2026-W21.md → Agent-interop layer; monthly/2026/2026-05.md → MCP RC
- **Datum:** 2026-05-23
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Art:** Beleg (Standard-Reife)
- **Notiz:** Benanntes Versionsevent; graduiert MCP in Enterprise-Infrastruktur mit echter Auth statt Ad-hoc.
- **Zitat:** „largest spec revision since launch: stateless core ... OAuth/OIDC-aligned authorization"
- **Beleg im Original:** The enterprise agent control plane consolidates; MCP and A2A become procurement-grade substrate** — Every major enterprise platform shipped its agent-control-plane play inside the month, peaking at SAP Sapphire (Autonomous Enterprise: 50+ Joule Assistants over 200+ agents, Claude as default reasoning engine, n8n embedded at a doubled $5.2B valuation as the orchestration layer) and radiating outward: ServiceNow's cross-vendor AI Control Tower (30 connectors across AWS/Azure/GCP/SAP/Oracle/Workday) + Otto + Action Fabric; Salesforce Agentforce Multi-Agent Orchestration + Agent Fabric; AWS …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### SAP × Mistral: Schweizer Bundesbahnen (SBB) live, 30.000 Mitarbeitende
- **Befund:** SBB gingen mit 30.000 Mitarbeitenden auf einem mehrsprachigen RAG-Chatbot (DE/FR/IT) live, der S/4HANA-Migrationsfragen beantwortet — Mistral als primäres Modell für die SAP-S/4HANA-Migration.
- **Originalquelle:** SAP × Mistral · ~2026-05-19
- **Fundstelle:** weekly/2026/2026-W21.md → Sovereign-AI Swiss data points
- **Datum:** 2026-05-19
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Modell-Portfolio / souverän)
- **Notiz:** Konkreter Schweizer Receipt für Modell-Portfolio (Mistral statt US-Frontier) in einer Migrations-Use-Case.
- **Zitat:** „Swiss Federal Railways (SBB) live with 30,000 employees"
- **Beleg im Original:** Sovereign-AI gets concrete Swiss data points; CHUV/Meditron, Lakera Zurich, ETH/EPFL Apertus; Swiss Federal Railways on Mistral for S/4HANA.** Sun: **CHUV** begins clinical pilot of Swiss medical LLM **Meditron** (EPFL) in the Lausanne ER — first publicly disclosed Swiss-built medical LLM moving from sandbox to front-line clinical decision support (>300 medical professionals tested on hypothetical cases during 2025). Sun: **Lakera Zurich** opens five-role AI-security hiring cluster (Software Engineer Agentic team; Senior Research Engineer Security Foundation Models; Senior ML Engineer Gandalf …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

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
- **Beleg im Original:** Agent-interop layer splits open vs consolidated in eight days.** Mon May 18: **Anthropic acquires Stainless** (~$300M reported, The Information) — the codegen pipeline behind every official Anthropic SDK *and* the SDKs for OpenAI/Google/Cloudflare/Meta in TS/Python/Go/Java/Kotlin; **all hosted Stainless products being wound down** (HN top comment: "we just bought OpenAI's front door and we're EOLing it"). Same day: **Microsoft Agent Framework SDK + runtime + Governance Toolkit open-sourced** under the Linux Foundation's Agentic AI Foundation (its fastest-growing project ever). Tue: **Claude …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### Microsoft Open-Sourcet Agent Framework unter LF AAIF
- **Befund:** Microsoft Open-Sourcete am 18. Mai 2026 das Agent Framework SDK + Runtime + Governance Toolkit unter der Agentic AI Foundation der Linux Foundation — bereits das am schnellsten wachsende Projekt der LF-Geschichte.
- **Originalquelle:** Open Source Summit NA · 2026-05-18 · zit. in weekly/2026-W21.md
- **Fundstelle:** weekly/2026/2026-W21.md → Microsoft Agent Framework open-sourced
- **Datum:** 2026-05-18
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Art:** Beleg (offene Standards/Governance)
- **Notiz:** Der offene Gegenpol zur Anthropic-Stainless-Konsolidierung — neutrale LF-Governance.
- **Zitat:** „Microsoft Agent Framework SDK + runtime ... under the Linux Foundation's Agentic AI Foundation"
- **Beleg im Original:** Agent-interop layer splits open vs consolidated in eight days — Anthropic-Stainless + Claude Managed Agents (self-hosted sandboxes + MCP tunnels) vs Microsoft Agent Framework open-source + MCP 2026-07-28 RC; Anthropic now owns the SDK/MCP generation pipeline AND the private-network MCP runtime** — Mon May 18: **Anthropic acquired Stainless** (~$300M reported by The Information; codegen pipeline behind every official Anthropic SDK *and* the SDKs for OpenAI, Google, Cloudflare, and Meta in TypeScript/Python/Go/Java/Kotlin; founded 2022). Tue: **all hosted Stainless products being wound down**, …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### Sakana „Conductor": 7B-Router auf heterogenen Frontier-Workern schlägt jeden Worker
- **Befund:** Sakanas RL-trainiertes 7B „Conductor"-Modell routet Subtasks über einen Pool heterogener Frontier-Worker (GPT-5, Claude Sonnet 4, Gemini 2.5 Pro) und schlägt jeden einzelnen Worker im Pool — 83,9% LiveCodeBench, 87,5% GPQA-Diamond.
- **Originalquelle:** VentureBeat / Latent.Space AINews · 2026-05-16
- **Fundstelle:** daily/2026/05/2026-05-16.md → Top items #4; weekly/2026/2026-W20.md → Sakana Conductor
- **Datum:** 2026-05-16
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Multi-Modell-Orchestrierung/Routing)
- **Notiz:** Erstes glaubwürdiges „kleiner Router auf grossen Modellen"-Muster mit Zahlen — flippt die Orchestrierungsfrage gegen Mono-Vendor-Stacks.
- **Zitat:** „a 7B model that orchestrates GPT-5, Claude Sonnet 4, and Gemini 2.5 Pro and beats them"
- **Beleg im Original:** The third thread is the orchestrator layer, where Sakana's RL-trained 7B Conductor model dispatched subtasks across a pool of GPT-5, Claude Sonnet 4 and Gemini 2.5 Pro and reportedly beat every single worker it called, hitting 83.9% on LiveCodeBench and 87.5% on GPQA-Diamond — the first credible "small router on top of big models" pattern with real numbers attached. Pair that with AWS MCP Server reaching GA — removing the last hyperscaler holdout from first-party MCP support, with IAM-guardrailed and CloudTrail-audited access to any AWS API through a single tool — and with Kranthi …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### Simon Willison: „Not so locked in any more" — Migrationskosten sinken
- **Befund:** Simon Willison argumentiert (14. Mai 2026), dass Sprach-/Framework-Lock-in nicht mehr tragend ist, sobald Coding-Agenten eine Codebasis re-plattformieren können (Native→React-Native-Rewrite, Buns Zig→Rust-Migration) — frühere Einbahnstrassen werden reversibel.
- **Originalquelle:** Simon Willison · simonwillison.net · 2026-05-14
- **Fundstelle:** weekly/2026/2026-W20.md → blogs list; blogs/2026/05/2026-05-16.md → Not so locked in
- **Datum:** 2026-05-14
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Art:** Beleg (Migrationskosten / Anti-Lock-in)
- **Notiz:** Schlüssel-Argument für „Portfolio"/Anti-Lock-in: Migrationskosten sinken, Entscheidungen werden reversibel.
- **Zitat:** „Decisions that used to be one-way doors are reversible"
- **Beleg im Original:** Not so locked in any more** — Simon Willison. _Takeaway:_ The Native-to-React-Native rewrite plus Bun's Zig-to-Rust migration argue that language/framework lock-in is no longer load-bearing once coding agents can re-platform a codebase. Decisions that used to be one-way doors are reversible. (Carried over from May 14 — still the freshest substantive Willison post as of this run.) [https://simonwillison.net/2026/May/14/not-so-locked-in/](https://simonwillison.net/2026/May/14/not-so-locked-in/)
- **Quell-Link:** https://simonwillison.net/2026/May/14/not-so-locked-in/

### LangChain Interrupt: LLM Gateway + Runtime, die Lock-in (server-seitige Compaction) meidet
- **Befund:** LangChain stellte auf Interrupt 2026 (14. Mai) ein LLM Gateway (Spend-Limits + PII-Redaction vor Egress) und Managed Deep Agents vor; ein LangChain-Post betont, Agent-Runtimes sollten server-seitige Compaction-Lock-in explizit vermeiden.
- **Originalquelle:** LangChain Interrupt 2026 / langchain.com · 2026-05-05/14
- **Fundstelle:** weekly/2026/2026-W20.md → LangChain LLM Gateway; weekly/2026/2026-W19.md → runtime avoids lock-in
- **Datum:** 2026-05-14
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Art:** Beleg (Anti-Lock-in-Design)
- **Notiz:** Open-Stack-Runtime, das Lock-in (server-seitige Compaction) bewusst vermeidet — direkter Anti-Lock-in-Designbeleg.
- **Zitat:** „LLM Gateway (spend limits + PII redaction pre-egress)"
- **Beleg im Original:** Frontier-lab "ship your own coding agent" becomes universal + Sakana's 7B Conductor reframes the orchestration question** — Wed May 13: Cognition pivots Devin to an agent-native IDE with $20 entry tier (Devin for Terminal companion piece documents hybrid local/cloud agent pattern; multi-Devin agent-native IDE with Interactive Planning, Devin Search with cited codebase Q&A, Devin Wiki auto-rebuilt every few hours with architecture diagrams). Thu May 14: LangChain Interrupt 2026 ships production-agent stack — LangSmith Engine (watches traces, clusters failures, opens fix PRs), Managed Deep …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### McKinsey-Fajardo: Wissensschicht muss enterprise-eigen und vendor-portabel bleiben
- **Befund:** McKinsey-Fajardo-Framing: die Wissensschicht (Ontologie, Substrate, Knowledge Engineering) muss enterprise-eigen und vendor-portabel bleiben („ownership principle"); Intelligenz-Schicht kommodifiziert, Wissensschicht differenziert.
- **Originalquelle:** McKinsey (Fajardo) · ~2026-05-13
- **Fundstelle:** weekly/2026/2026-W20.md → knowledge layer contested ground
- **Datum:** 2026-05-13
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Art:** Kontext (Anti-Lock-in-Strategie)
- **Notiz:** Strategie-Beleg für „kontrolliert skalieren ohne Lock-in": eigene und portable Ontologie/Substrate halten.
- **Zitat:** „ontology / substrates / knowledge engineering must remain enterprise-owned and vendor-portable"
- **Beleg im Original:** McKinsey Fajardo "The Layer Most Enterprises Are Underinvesting In" + "ownership principle" (ontology / substrates / knowledge engineering must remain enterprise-owned and vendor-portable).
- **Quell-Link:** https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-layer-most-enterprises-are-underinvesting-in-will-decide-the-winners-of-the-agentic-era
- **Beleg-Notiz:** Found in weekly/2026/2026-W20.md line 56 with full reference. URL inferred from McKinsey article title and author (Anton Fajardo, Thu May 14); article describes six-substrate knowledge-layer architecture with ownership principle explicitly framing knowledge layer as enterprise-owned and vendor-portable.

### SAP Sapphire: n8n-Beteiligung verdoppelt Bewertung auf $5,2 Mrd.
- **Befund:** SAP nahm auf Sapphire (Mai 2026) eine strategische n8n-Beteiligung, die n8n auf $5,2 Mrd. verdoppelte (von ~$2,5 Mrd. Okt. 2025) — eingebettet als Orchestrierungs-/Workflow-Schicht in Joule Studio; 1.400+ Enterprise-Kunden, 1,7M monatlich aktive Entwickler, 1.000+ Integrationen (embedded GA Q3 2026).
- **Originalquelle:** SAP Sapphire · 2026-05-12/14
- **Fundstelle:** weekly/2026/2026-W20.md → SAP Sapphire consolidation; weekly/2026/2026-W21.md
- **Datum:** 2026-05-12
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Vorbewertung ~$2,5 Mrd. und 1.000+ Integrationen nur im daily 23. Mai belegt, nicht in W20)
- **Art:** Kontext (Orchestrierung)
- **Notiz:** n8n wird zum europäischen Orchestrierungs-Default; SAP wählt OSS-Workflow-Engine UND Claude-Default, zäunt externe Agenten aber via Joule ein.
- **Zitat:** „n8n strategic stake doubles its valuation to $5.2B"
- **Beleg im Original:** Enterprise platforms — Dell Tech World + SAP Sapphire + ServiceNow Knowledge + OpenAI Deployment Company; Anthropic-KPMG; n8n at $5.2B as the European orchestration default** — Tue May 19: **Dell Tech World** unveils AI Factory 2.0 with **PowerEdge XE9880L/XE9885L/XE9882L** — first Dell systems built on **NVIDIA HGX Rubin NVL8** (up to 144 GPUs per rack, up to 5.5× HGX B200). **Dell Deskside Agentic AI** enables local agent execution off-cloud via NVIDIA NemoClaw. Frontier models on Dell on-prem: Google Distributed Cloud with Gemini 3.0/3.5, **OpenAI Codex on Dell AI Data Platform** (first …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

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
- **Beleg im Original:** Enterprise platforms — Dell Tech World + SAP Sapphire + ServiceNow Knowledge + OpenAI Deployment Company; Anthropic-KPMG; n8n at $5.2B as the European orchestration default** — Tue May 19: **Dell Tech World** unveils AI Factory 2.0 with **PowerEdge XE9880L/XE9885L/XE9882L** — first Dell systems built on **NVIDIA HGX Rubin NVL8** (up to 144 GPUs per rack, up to 5.5× HGX B200). **Dell Deskside Agentic AI** enables local agent execution off-cloud via NVIDIA NemoClaw. Frontier models on Dell on-prem: Google Distributed Cloud with Gemini 3.0/3.5, **OpenAI Codex on Dell AI Data Platform** (first …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### MCP-SDK-Downloads ~110M/Monat; Pilot-to-Production 18%→31%
- **Befund:** MCP-SDK-Downloads standen im Mai 2026 bei ~110M/Monat; agentische Pilot-to-Production-Conversion stieg 18% (Q1) → 31% (Q2). Einschränkung zur Server-Zahl: „10.000+ enterprise servers under LF AAIF" stammt ausschliesslich von Sudha Sreejith (2026-05-04, W19); Paweł Wiącek (2026-05-15, W20) nennt nur „110M monthly SDK downloads" ohne Serverzahl.
- **Originalquelle:** Sudha Sreejith (2026-05-04) zit. in weekly/2026/2026-W19.md (Z. 103); Paweł Wiącek (2026-05-15) in weekly/2026/2026-W20.md (Z. 112)
- **Fundstelle:** weekly/2026/2026-W20.md → Agentic Commerce Protocol Stack; weekly/2026/2026-W19.md → „The Protocol That Ate the Enterprise"
- **Datum:** 2026-05-15
- **Status ggü. bisherigem Stand:** aktualisiert (von ~97M)
- **Verifizierung:** korrigiert: Serverzahl „10.000+" nur Sreejith zugeordnet, nicht Wiącek (ursprünglich number_wrong markiert). 110M-Downloads-Zahl ist Drittquelle, nicht Anthropic-offiziell.
- **Art:** Beleg (Adoption)
- **Notiz:** Aktualisiert die 97M-Zahl auf ~110M/Monat; die parallele Archiv-Zahl Anfang Juni nennt weiter ~97M (Diskrepanz beachten — 110M ist Drittanalysten-Angabe).
- **Zitat:** „MCP — 110M monthly SDK downloads; A2A — 150+ orgs in prod"
- **Beleg im Original:** W19 didn't have an AI-IPO. W20 has Cerebras priced (~$56B) then traded (~$70B first-day cap; closes $311 on $185 price). The market re-rated the inference thesis at +25% over the priced book on day one — floor-setter for Groq / SambaNova and any 2026 inference IPO candidate.
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### Alle vier Hyperscaler liefern first-party MCP-Server; AWS MCP frontet 300+ Services / 15.000+ APIs
- **Befund:** Alle vier Hyperscaler liefern nun first-party MCP-Server (AWS MCP GA + ServiceNow + Salesforce Tableau MCP + Snowflake Cortex + Google Colab MCP); der AWS-MCP-Server frontet 300+ Services + 15.000+ APIs über ein einzelnes Tool.
- **Originalquelle:** daily 2026-05-06/15 · zit. in weekly/2026-W20.md
- **Fundstelle:** weekly/2026/2026-W20.md → MCP/A2A consolidate as enterprise interop substrate
- **Datum:** 2026-05-15
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** confirmed
- **Art:** Beleg (Standard-Breite)
- **Notiz:** Belegt, dass MCP der Enterprise-Daten-Substrat ist, nicht ein proprietäres Anthropic-Feature.
- **Zitat:** „All four hyperscalers now ship first-party MCP — MCP is decisively the enterprise-data substrate, not a Claude feature"
- **Beleg im Original:** MCP / A2A consolidate as enterprise interop substrate; AWS ships agent payments; security has its first hardening week** — Mon-Wed: AWS MCP Server GA (first hyperscaler with IAM / CloudTrail / CloudWatch wiring; one tool fronts 300+ services + 15,000+ APIs). ServiceNow MCP Server GA in every Now Assist SKU; Salesforce Tableau MCP; Anthropic 20+ MCP connectors + 12 legal plugins; Snowflake Cortex MCP connectors (Atlassian / GitHub / Salesforce / Google Workspace / Slack). Thu May 14: Stripe Agentic Commerce Protocol opens Link wallet (250M users) to AI agents — co-authored with OpenAI. Fri May …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### A2A: 150+ Organisationen in Produktion, GA-native in den Clouds, v1.0 stabil
- **Befund:** A2A (Agent-to-Agent) erreichte 150+ Organisationen in Produktion, GA-native in Bedrock AgentCore / Azure AI Foundry / Google Cloud; A2A v1.0 stabil ein Jahr nach der Linux-Foundation-Spende; nativ in ADK/LangGraph/CrewAI/LlamaIndex/Semantic Kernel/AutoGen; signierte Agent Cards.
- **Originalquelle:** daily 2026-05-10/15 · zit. in weekly/2026-W19.md & W20.md
- **Fundstelle:** weekly/2026/2026-W19.md → A2A crosses 150+ orgs; weekly/2026/2026-W20.md → A2A v1.0 stable
- **Datum:** 2026-05-10
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** confirmed
- **Art:** Beleg (Interop-Schicht)
- **Notiz:** A2A graduiert von emerging zu Produktionsschicht; bildet mit MCP die Zwei-Schichten-Interop („MCP-für-Tools, A2A-für-Koordination").
- **Zitat:** „A2A crosses 150+ organizations ... GA-native in Bedrock AgentCore / Azure AI Foundry / Google Cloud"
- **Beleg im Original:** MCP / A2A consolidate as enterprise interop substrate; AWS ships agent payments; security has its first hardening week** — Mon-Wed: AWS MCP Server GA (first hyperscaler with IAM / CloudTrail / CloudWatch wiring; one tool fronts 300+ services + 15,000+ APIs). ServiceNow MCP Server GA in every Now Assist SKU; Salesforce Tableau MCP; Anthropic 20+ MCP connectors + 12 legal plugins; Snowflake Cortex MCP connectors (Atlassian / GitHub / Salesforce / Google Workspace / Slack). Thu May 14: Stripe Agentic Commerce Protocol opens Link wallet (250M users) to AI agents — co-authored with OpenAI. Fri May …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### Survey of Agent Interoperability Protocols (MCP/ACP/A2A/ANP)
- **Befund:** Eine „Survey of Agent Interoperability Protocols" stellt MCP, ACP, A2A und ANP nebeneinander mit Deployment-Trade-offs — der Referenztext, während der MCP-RC sein Validierungsfenster betritt.
- **Originalquelle:** arXiv:2505.02279 · zit. in weekly/2026-W21.md (Mai 2026)
- **Fundstelle:** weekly/2026/2026-W21.md → Top papers
- **Datum:** 2026-05-21
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Art:** Kontext (Standardvergleich)
- **Notiz:** Vier-Protokoll-Vergleich als Referenz für die Interop-Standard-Diskussion.
- **Beleg im Original:** A Survey of Agent Interoperability Protocols: MCP, ACP, A2A, ANP** — Side-by-side of the four leading agent-communication protocols with deployment-context trade-offs. _Why notable:_ The reference text the same week the MCP 2026-07-28 RC enters its 10-week implementer validation window. [arXiv:2505.02279](https://arxiv.org/abs/2505.02279)
- **Quell-Link:** https://arxiv.org/abs/2505.02279

### Salesforce Headless 360: gesamte Plattform als APIs/MCP-Tools/CLI (60+ MCP-Tools)
- **Befund:** Salesforce Headless 360 („biggest platform change in 25 years") legte die gesamte Plattform als APIs/MCP-Tools/CLI offen — 60+ MCP-Tools nutzbar aus Claude Code/Cursor/Codex/Windsurf — als expliziter Gegenpol zu SAPs API-Policy-Lockout.
- **Originalquelle:** Salesforce TDX 2026 · 2026-04-15 (live 2026-05-01)
- **Fundstelle:** weekly/2026/2026-W16.md → Headless 360; weekly/2026/2026-W18.md → enterprise control-plane fork
- **Datum:** 2026-04-15
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg (Open-MCP vs. walled garden)
- **Notiz:** Frühestes klares Open-MCP-vs-walled-garden-Gegensatzpaar; „everything is an MCP tool".
- **Zitat:** „every Salesforce surface as APIs / MCP tools / CLI; 60+ MCP tools"
- **Beleg im Original:** The third thread is structural rather than political. Friday May 1 was the day the enterprise agent control plane forked. Microsoft Agent 365 and the M365 E7 Frontier Suite went GA — Agent 365 standalone at $15 per user per month, E7 at $99 bundling M365 E5 plus Copilot plus Agent 365, cross-cloud registry sync with AWS Bedrock and Google Cloud in public preview, Anthropic IP setting decommissioned and Claude defaulted as the M365 Copilot subprocessor for Excel and PowerPoint. The same day Salesforce Headless 360 lit up with 60-plus MCP tools wired to Claude Code, Cursor and any MCP runtime — …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### Drei Control-Plane-Positionen live in derselben Woche (1. Mai 2026)
- **Befund:** Drei architektonische Enterprise-Agent-Positionen wurden in derselben Woche live: Microsoft Governance-Plane (Agent 365, $15/User; E7 $99), Salesforce Open-MCP-everywhere (60+ MCP-Tools), SAP Walled Garden (API Policy v4/2026) — die Beschaffungsentscheidung geht der Modellwahl voraus.
- **Originalquelle:** daily/weekly · 2026-05-01
- **Fundstelle:** weekly/2026/2026-W18.md → enterprise control-plane fork; monthly/2026/2026-04.md
- **Datum:** 2026-05-01
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext (Control-Plane-Debatte)
- **Notiz:** Kanonische Dreiteilung der Control-Plane-Debatte; „procurement decision now precedes model selection".
- **Zitat:** „Microsoft governance plane, Salesforce open-MCP everywhere, SAP walled garden"
- **Beleg im Original:** MCP and the agent-control-plane fork** — The protocol started the month as "Anthropic's standard" and ended as the procurement-grade integration layer of enterprise agent stacks. Linux Foundation AAIF takes over MCP at the NYC Dev Summit (Apr 2–3) with 1,200 attendees, an OAuth profile, and reference implementations; Block donates Goose the same weekend, joining MCP and AGENTS.md as AAIF anchors. Microsoft Agent Framework 1.0 (Apr 6) ships MCP-native with A2A. Cloudflare Agents Week (Apr 13–17) bundles compute + memory + networking + identity + inference around MCP/A2A primitives across 20+ …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### Block spendet Goose an die Linux Foundation; MCP-Governance bei AAIF
- **Befund:** Block spendete am 5. April 2026 Goose neben MCP und AGENTS.md an die Linux Foundation (AAIF), die MCP-Governance beim NYC Dev Summit (2.–3. Apr., 1.200 Teilnehmer, OAuth-Profil) übernahm — Formalisierung der Open-Standards-Wette.
- **Originalquelle:** MCP Dev Summit NYC / Block · 2026-04-02/05
- **Fundstelle:** weekly/2026/2026-W14.md → open-standards bet; monthly/2026/2026-04.md → MCP procurement-grade
- **Datum:** 2026-04-05
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg (Governance/offene Standards)
- **Notiz:** MCP von „Anthropics Standard" zur procurement-grade Integrationsschicht unter neutraler LF-Governance.
- **Zitat:** „Block donates Goose alongside MCP and AGENTS.md"
- **Beleg im Original:** The third thread sits underneath both: the agent-control-plane war crystallised in a few days. Salesforce reframed Slack as the agentic operating system on Tuesday with thirty-plus Slackbot AI features, Slack MCP server GA, and Claude as the back-end model — the largest enterprise-platform validation of MCP to date. Microsoft answered on Friday with its governance day: the open-source Agent Governance Toolkit (first to address all ten OWASP agentic-AI risks with sub-millisecond policy enforcement), Copilot Studio multi-agent GA, Agent Framework 1.0 GA, and forty-one M365 Copilot April …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

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
- **Beleg im Original:** The third thread is agent-stack security crossing from theoretical to acute. Tuesday 2026-03-24, LiteLLM 1.82.7 and 1.82.8 shipped a base64 credential stealer hidden in a litellm_init.pth file that runs on install with no import required, exfiltrating SSH and AWS keys, crypto wallet directories, and shell history. Anthropic shipped Auto mode for Claude Code the same day, a Sonnet 4.6 classifier-based tool-call gating layer that, as Simon Willison noted in the same-day juxtaposition, would not have stopped the LiteLLM attack. Wednesday brought the FutureSearch BigQuery PyPI blast-radius data: …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### MCP erreicht ~97 Mio. monatliche SDK-Installationen (vs. ~2 Mio. beim Launch)
- **Befund:** MCP erreichte ~97 Mio. monatliche SDK-Installationen (vs. ~2 Mio. beim Launch im Nov. 2024) — Anthropics offizielle Zahl, die jeden Enterprise-MCP-Pitch in Q2 verankerte. Hinweis: Die 97M-Zahl stammt aus der Anthropic-MCP-Roadmap (2026-03-25); die „10.000+ Server" und der „vs. ~2M"-Launch-Vergleich stammen aus dem ByteBridge-Artikel (2026-03-18).
- **Originalquelle:** Anthropic-Offenlegung · 2026-03-25 (97M); ByteBridge (Medium) · 2026-03-18 (10.000+ Server, Launch-Vergleich)
- **Fundstelle:** weekly/2026/2026-W13.md → Why-it-matters; daily/2026/03/2026-03-25.md; daily/2026/03/2026-03-18.md; monthly/2026/2026-03.md → MCP scale meets MCP security
- **Datum:** 2026-03-25
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** korrigiert: Quellzuordnung — 97M (Anthropic 25. Mär.) vs. 10.000+ Server & 2M-Launch (ByteBridge 18. Mär.) (urspr. source_wrong markiert)
- **Art:** Beleg (zentraler Adoptionsbeleg)
- **Notiz:** Der am häufigsten zitierte Adoptionsbeleg für MCP — Grössenordnungssprung um ~48× in 16 Monaten.
- **Zitat:** „97 million monthly SDK installs against roughly two million at the November 2024 launch"
- **Beleg im Original:** The third thread is agent-stack security crossing from theoretical to acute. Tuesday 2026-03-24, LiteLLM 1.82.7 and 1.82.8 shipped a base64 credential stealer hidden in a litellm_init.pth file that runs on install with no import required, exfiltrating SSH and AWS keys, crypto wallet directories, and shell history. Anthropic shipped Auto mode for Claude Code the same day, a Sonnet 4.6 classifier-based tool-call gating layer that, as Simon Willison noted in the same-day juxtaposition, would not have stopped the LiteLLM attack. Wednesday brought the FutureSearch BigQuery PyPI blast-radius data: …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### NVIDIA: SLMs sind die Zukunft agentischer KI
- **Befund:** NVIDIA-Research-Positionspapier argumentiert, dass kleine Sprachmodelle (SLMs) „sufficiently powerful, inherently more suitable, and necessarily more economical for many invocations in agentic systems" sind, weil die meisten Agenten-Tasks spezialisiert, repetitiv und varianzarm sind.
- **Originalquelle:** Belcak et al., NVIDIA Research · „Small Language Models are the Future of Agentic AI" · arXiv:2506.02153 · v1 2025-06-02, v2 2025-09-15
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2025-09-15
- **Status ggü. bisherigem Stand:** bestätigt (online)
- **Verifizierung:** confirmed (Primärquelle/arXiv-Abstract). Korrektur: das oft zitierte „10–30× günstiger" steht NICHT im Abstract — nur im Paper-Body/Sekundärberichten; daher nur die These als abstract-verifiziert zitieren, das Kostenmultiplikator-Mass als „commonly-cited-but-not-abstract-confirmed".
- **Art:** Beleg (SLM/Lock-in-Reduktion)
- **Notiz:** Ein Chiphersteller (ohne Anreiz, Compute zu unterverkaufen) argumentiert für SLMs statt Frontier-LLMs für die meisten Agenten-Calls.
- **Zitat:** „small language models (SLMs) are ... the future of agentic AI"
- **Beleg im Original:** Small language models (SLMs) are sufficiently powerful, inherently more suitable, and necessarily more economical for many invocations in agentic systems, and are therefore the future of agentic AI.
- **Quell-Link:** https://arxiv.org/abs/2506.02153
- **Beleg-Notiz:** Confirmed on arXiv abstract page: paper "Small Language Models are the Future of Agentic AI" by Belcak et al. (NVIDIA Research), arXiv:2506.02153, v1 submitted 2025-06-02 (v2 2025-09-15). Abstract verbatim matches the recorded claim about SLMs being sufficiently powerful, more suitable, and more economical for agentic systems.

## Online-Befunde (newer_than_archive bzw. Primärquellen)

### OpenRouter: ~1,5 Billiarden Tokens/Jahr Run-Rate über 400+ Modelle
- **Befund:** OpenRouters model-agnostisches Gateway läuft nun bei ~1,5 Billiarden (quadrillion) Tokens/Jahr Run-Rate (~15× ggü. ~100 Bio. ein Jahr zuvor) mit 8M+ Entwicklern (von 2,5M) über 400+ Modelle; geschätzt 15–30% von Googles, 20–40% von OpenAIs und vermutlich >50% von Azure Foundrys Token-Run-Rate.
- **Originalquelle:** Menlo Ventures · 2026-05-26 · menlovc.com/perspective/openrouter-now-processes-more-than-a-quadrillion-tokens-a-year/
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2026-05-26
- **Status ggü. bisherigem Stand:** NEU seit Stichtag-nah (online, newer_than_archive)
- **Verifizierung:** Einzelquelle (Investor; OpenRouter ist Menlo-Portfolio — günstige Rahmung; Provider-Share-Schätzungen sind Menlo-Schätzungen, nicht auditiert)
- **Art:** Beleg (model-agnostisches Gateway, höchste Magnitude)
- **Notiz:** Stärkster Einzeldatenpunkt für die Abstraktionsschicht zwischen Apps und Modellanbietern; Anbieter-Shares sind Schätzungen.
- **Zitat:** „~1.5 quadrillion tokens/year run rate" (vs. „~100 trillion tokens/year run rate" ein Jahr zuvor)
- **Beleg im Original:** _(kein wörtlicher Quelltext automatisch auffindbar — siehe Fundstelle/Quell-Link)_
- **Quell-Link:** https://menlovc.com/perspective/openrouter-now-processes-more-than-a-quadrillion-tokens-a-year/

### Unabhängige MCP-Messung: 9.652 Registry-Records, 15.926 GitHub-Repos, 41% in Produktion
- **Befund:** Die offizielle MCP-Registry-API lieferte am 2026-05-24 9.652 „latest"-Server-Records, die GitHub-Search-API 15.926 Repos mit dem Topic mcp-server, der modelcontextprotocol/servers-Repo hatte 86.148 Stars. Stackloks 2026-Survey: 41% der Software-Organisationen in limitierter oder breiter Produktion mit MCP-Servern (29% limitiert + 12% breit).
- **Originalquelle:** Digital Applied (Analyst, zitiert MCP Registry API + GitHub Search API + Stacklok 2026 survey) · Snapshot 2026-05-24 · digitalapplied.com/blog/mcp-adoption-statistics-2026-model-context-protocol
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2026-05-24
- **Status ggü. bisherigem Stand:** aktualisiert (online, newer_than_archive)
- **Verifizierung:** Einzelquelle / nicht einzeln verifiziert (Sekundär-/Analystenquelle, zitiert aber Live-APIs mit Pull-Datum; 9.652 als analyst-reported behandeln; Stacklok-41% ist Survey, kein Zensus)
- **Art:** Beleg (Produktions-Adoption)
- **Notiz:** Datierte, methodisch explizite Produktions-Adoptionszahl (41% in Produktion) plus unabhängiger Server-Count-Cross-Check zur „10.000+"-Behauptung.
- **Zitat:** „41% of surveyed software organizations in limited or broad production with MCP servers"
- **Beleg im Original:** _(kein wörtlicher Quelltext automatisch auffindbar — siehe Fundstelle/Quell-Link)_
- **Quell-Link:** https://digitalapplied.com/blog/mcp-adoption-statistics-2026-model-context-protocol

### A2A: 150+ Orgs, v1.0, 22.000+ GitHub-Stars, 5 Produktions-SDKs (LF-Primärquelle)
- **Befund:** Googles A2A (jetzt LF-gehostet) überschritt das Ein-Jahres-Mark mit 150+ unterstützenden Organisationen (von 50+ bei Launch), veröffentlichte v1.0 als erste stabile Spec, überschritt 22.000 GitHub-Stars und erweiterte SDKs auf fünf produktionsreife Sprachen (Python, JavaScript, Java, Go, .NET). Microsoft integrierte A2A in Azure AI Foundry und Copilot Studio; AWS via Amazon Bedrock AgentCore Runtime.
- **Originalquelle:** Linux Foundation (via PR Newswire) · 2026-04-09 · prnewswire.com/news-releases/a2a-protocol-surpasses-150-organizations-...
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2026-04-09
- **Status ggü. bisherigem Stand:** bestätigt (online, newer_than_archive)
- **Verifizierung:** confirmed (offizielle LF-PR). Verifizierte Version ist 1.0; eine „1.2"-Angabe aus einem unverifizierten Snippet wird NICHT verwendet.
- **Art:** Beleg (Interop-Standard)
- **Notiz:** Primärquellen-Bestätigung der A2A-Adoptionszahlen; Supporter u.a. AWS, Cisco, Google, IBM, Microsoft, Salesforce, SAP, ServiceNow.
- **Zitat:** „grown from more than 50 to over 150 organizations"; „version 1.0" als „first stable specification"
- **Beleg im Original:** _(kein wörtlicher Quelltext automatisch auffindbar — siehe Fundstelle/Quell-Link)_
- **Quell-Link:** https://prnewswire.com/news-releases/a2a-protocol-surpasses-150-organizations-...

### MCP donated to AAIF: 97M+ Downloads, 10.000+ Server, Multi-Vendor-Governance
- **Befund:** Anthropic spendete MCP an die neu etablierte Agentic AI Foundation (AAIF, gerichteter Fonds unter der Linux Foundation), mitgegründet von Anthropic, Block und OpenAI mit Unterstützung von Google, Microsoft, AWS, Cloudflare und Bloomberg — MCP unter neutrale Multi-Vendor-Governance. Bestätigt 97M+ monatliche SDK-Downloads und 10.000 aktive Server.
- **Originalquelle:** Anthropic · 2025-12-09 · anthropic.com/news/donating-the-model-context-protocol-...; MCP Blog · 2025-12-09 · blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2025-12-09
- **Status ggü. bisherigem Stand:** bestätigt (online)
- **Verifizierung:** confirmed (Primär/Near-Primär). Hinweis: 97M ist ein Snapshot der Dez-2025-Spende; spätere Drittquellen (März/Mai 2026) wiederholen dieselbe 97M-Zahl — gemeldetes Wachstum scheint auf diesem Niveau zu plateauen.
- **Art:** Beleg (offene Standards/Anti-Lock-in)
- **Notiz:** Der Standard wird von einer Stiftung kontrolliert, die von konkurrierenden AI-Vendoren (inkl. OpenAI) getragen wird.
- **Zitat:** „Over 97 million monthly SDK downloads, 10,000 active servers and first-class client support across major AI platforms"
- **Beleg im Original:** _(kein wörtlicher Quelltext automatisch auffindbar — siehe Fundstelle/Quell-Link)_
- **Quell-Link:** https://anthropic.com/news/donating-the-model-context-protocol-...

### OpenRouter State of AI: 100T+ Tokens über 300+ Modelle / 60+ Anbieter
- **Befund:** OpenRouters State-of-AI-Studie analysierte über 100 Billionen (trillion) Tokens realen LLM-Traffics, geroutet über 300+ aktive Modelle von 60+ Anbietern durch eine einheitliche API; >50% der Nutzung ausserhalb der USA; offene Gewichte erreichten ~ein Drittel der Nutzung Ende 2025 (proprietär ~70% im Mittel).
- **Originalquelle:** OpenRouter · State of AI 2025 (rollende 13 Monate bis Nov 2025) · openrouter.ai/state-of-ai
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2025-11-30
- **Status ggü. bisherigem Stand:** bestätigt (online)
- **Verifizierung:** confirmed (Primärquelle, OpenRouter eigene Studie)
- **Art:** Beleg (model-agnostisches Gateway, Mainstream)
- **Notiz:** Provider-agnostische API routet bereits 100T+ Tokens über 60+ Anbieter; offene Gewichte als materieller, wachsender Anteil.
- **Zitat:** „over 100 trillion tokens of real-world LLM interactions"; „more than 300+ active models from over 60 providers"
- **Beleg im Original:** _(kein wörtlicher Quelltext automatisch auffindbar — siehe Fundstelle/Quell-Link)_
- **Quell-Link:** https://openrouter.ai/state-of-ai

## Gegenevidenz / Einschränkungen (in diesem Cluster)

- **Proprietäre Modelle dominieren weiter die Nutzung:** Trotz model-agnostischer Infrastruktur entfielen ~70% der Tokens im Mittel auf geschlossene Modelle, offene Gewichte nur ~ein Drittel (OpenRouter State of AI 2025, 2025-11-30, openrouter.ai/state-of-ai · confirmed/Primär). Interoperabilität senkt Wechselkosten, hat die De-facto-Abhängigkeit von wenigen Frontier-Anbietern aber nicht beseitigt.
- **Konsolidierung im Interop-Layer:** Anthropics Stainless-Übernahme (~$300M, 2026-05-18, The Information · confirmed) zentralisiert die SDK/MCP-Codegen-Pipeline für mehrere Wettbewerber unter einem Anbieter — Gegenpol zur offenen LF-Governance.
- **MCP-Sicherheits-/Governance-Lücke:** 53% statische Secrets, nur 8,5% OAuth, ~41% ohne Auth, 30+ CVEs in 2026 (Ken Priore/Descope/CyberSeQ, 2026-05-21 · nicht einzeln verifiziert). Adoption läuft der Härtung voraus.
- **Offene Registries laden adverse Selektion ein:** „Capability Advertisement as a Market for Lemons" (arXiv:2606.03034, 2026-06-03 · nicht einzeln verifiziert) — beworbene Agenten-Fähigkeiten werden naiv als wahr behandelt.
- **„MCP is dead?"-Debatte:** Praktiker streiten, ob Skills+Scripts MCP ökonomisch schlagen (quandri.io/HN, 392 Punkte, 2026-05-31 · confirmed) — MCP-Wert liegt eher in Org-Level-Governance als im Token-Budget.
- **Supply-Chain-Risiko des Gateways:** LiteLLM-Angriff (46.996 Downloads in 46 Min., 88% von 2.337 Dependents ungepinnt, 2026-03-24 · nicht einzeln verifiziert).
- **Open-vs-Closed-Lücke besteht/wächst:** Lambert sieht 5–6 Monate, ggf. 12+ (2026-05-28 · confirmed) — zugleich existiert in s1-markt die widersprechende Aussage „gap likely 12+ months, not 5–6" für den spezifischen Coding-Agent-Moment (number_wrong); beide Aussagen betreffen verschiedene Kontexte.
- **SAP-Mauer-Nuance:** Joule Studio 2.0 nutzt MCP/A2A intern und bietet Modell-Portfolio (Claude/Mistral/Cohere); die Mauer betrifft v.a. externe autonome Agenten (W21 · nicht einzeln geprüft) — die „Walled-Garden"-Charakterisierung ist also abzustufen.
- **Vendor-/Investor-gerahmte Zahlen mit Vorsicht:** Salesforce-Migrationszahl ~18× (vendor-eigen, unaudited); OpenRouter-Run-Rate und Provider-Shares (Menlo-Ventures-Schätzungen, Portfolio-Bezug); Drittanalysten-Zahlen 110M Downloads / 9.652 Registry-Records / 41%-in-Produktion (Survey, kein Zensus).
- **SLM-Kostenvorteil nicht abstract-belegt:** Die NVIDIA-These ist abstract-verifiziert, das oft zitierte „10–30× günstiger" steht nur im Paper-Body/Sekundärberichten.

## Verwendbarkeit (Hinweis für die Konsolidierung)

- **Stark belegt:** MCP/A2A als produktionsnahe, multi-vendor-governte offene Standards (mehrere Primärquellen: Anthropic/AAIF-Spende, LF-A2A-PR, alle vier Hyperscaler mit first-party MCP). Model-agnostische Gateways im Mainstream (OpenRouter-Primärdaten, 100T–1,5Q Tokens). Diese Punkte stützen ein Anti-Lock-in-/Portfolio-Narrativ robust.
- **Mittel belegt / nuanciert:** Migrationskosten sinken (Willison „Not so locked in", Salesforce-18×) — qualitativ plausibel, quantitativ aber vendor-eigen/anekdotisch. Multi-Modell-Routing-Ökonomie (40–70%, ~24×-Gap, Advisor-Model) ist mehrfach belegt, aber teils single-source/praktiker-gerahmt.
- **Mit Vorsicht zu behandeln:** Die MCP-Download-Zahl variiert (97M vs. 110M) und stammt teils von Drittanalysten; Server-Zählungen (10.000+ / 18.000+ / 9.652) sind quell- und stichtagsabhängig. OpenRouter-Provider-Shares (15–30% etc.) sind Investor-Schätzungen, nicht auditiert. SLM-„10–30×" nicht abstract-belegt.
- **Gegenevidenz für Balance:** Die Konsolidierung (Stainless), die MCP-Sicherheitslücke (53%/8,5%), die fortbestehende ~70%-Dominanz proprietärer Modelle und die „MCP is dead?"/adverse-selection-Debatte sind die zentralen Caveats, die ein „Lock-in ist gelöst"-Overclaiming verhindern.
