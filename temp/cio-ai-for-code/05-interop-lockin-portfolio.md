# Interoperabilität, Lock-in & Modell-Portfolio

_Belegsammlung (Rohmaterial für spätere CIO-Konsolidierung). Stichtag Archiv: 2026-06-03. Neutral, vollständig, jede Zahl mit Quelle + Verifizierungsstatus._

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

### Survey of Agent Interoperability Protocols (MCP/ACP/A2A/ANP)
- **Befund:** Eine „Survey of Agent Interoperability Protocols" stellt MCP, ACP, A2A und ANP nebeneinander mit Deployment-Trade-offs — der Referenztext, während der MCP-RC sein Validierungsfenster betritt.
- **Originalquelle:** arXiv:2505.02279 · zit. in weekly/2026-W21.md (Mai 2026)
- **Fundstelle:** weekly/2026/2026-W21.md → Top papers
- **Datum:** 2026-05-21
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Art:** Kontext (Standardvergleich)
- **Notiz:** Vier-Protokoll-Vergleich als Referenz für die Interop-Standard-Diskussion.

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
