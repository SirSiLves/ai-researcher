# Adoption & Reifegrad von KI-/Agentic Engineering

_Belegsammlung (Rohmaterial für spätere CIO-Konsolidierung). Stichtag Archiv: 2026-06-03. Neutral, vollständig, jede Zahl mit Quelle + Verifizierungsstatus._

> _Angereicherte Fassung: zu jedem Befund wurde **Beleg im Original** (wörtlicher Quelltext aus der Archiv-Datei bzw. Online-Quelle) und **Quell-Link** ergänzt. Erzeugt aus der Originaldatei `01-adoption-reifegrad.md`; Zahlen unverändert._


## Worum es geht

Dieses Cluster bündelt Belege zu Verbreitung und Reifegrad von KI- und agentic-Engineering in der Softwareentwicklung: Anteil KI-generierten Codes in Unternehmen, Adoption einzelner Coding-Agents (Claude Code, GitHub Copilot, OpenAI Codex, Cursor, Gemini CLI), Enterprise-Rollout-Skala (Seats/Downloads/Nutzer), Modell-Release-Kadenz, Developer-Surveys sowie die Etablierung von "agentic engineering" als Begriff und Standardpraxis. Die Evidenz kann CIO-relevante Fragen beantworten wie: Wie weit ist die Branche tatsächlich (Awareness vs. realer Einsatz)? Welche Werkzeuge dominieren? Wie schnell verläuft die Adoptionskurve, und wie verlässlich/reif sind die Systeme im Produktivbetrieb? Wo widersprechen Praxis-, Survey- und Benchmark-Daten dem reinen Adoptions-Hype?

## Befunde
### Microsoft Build 2026: Project Polaris ersetzt Default-Engine im GitHub Copilot für alle Abonnenten
- **Befund:** Microsoft kündigt auf der Build 2026 "Project Polaris" an — ein eigenes Coding-Modell auf Maia-200-Silizium, das GPT-4 Turbo bis August 2026 als Default-Engine im GitHub Copilot für ALLE Abonnenten ersetzt (automatische Migration, optionaler 3-Monats-Fallback).
- **Originalquelle:** Microsoft Build 2026 (Satya Nadella) · 2026-06-02 · https://chatforest.com/builders-log/microsoft-build-2026-recap-windows-agent-platform-project-polaris-copilot-workspace/
- **Fundstelle:** daily/2026/06/2026-06-02.md → Top-5 / Major news; auch weekly/2026-W23.md
- **Datum:** 2026-06-02
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Skaliert ein neues Coding-Modell auf die gesamte Copilot-Nutzerbasis und zeigt den Reifegrad des agentic-coding Stacks bei Microsoft.
- **Zitat:** "replace GPT-4 Turbo as the default GitHub Copilot engine for every subscriber by August 2026"
- **Beleg im Original:** The third arc is structural. At Build 2026 on June 2, Microsoft turned from buyer to builder: Project Polaris, its own coding model on Maia 200 silicon, will replace GPT-4 Turbo as the default Copilot engine by August, and two days later the MAI group shipped seven first-party models, including a 1-trillion-parameter (35B-active) reasoner, MAI-Thinking-1. Microsoft now owns the model, the inference silicon, and the developer surface end to end — a renegotiation of the field's most important partnership, executed in public and pitched explicitly on lowering developer cost. Around it, the …
- **Quell-Link:** https://chatforest.com/builders-log/microsoft-build-2026-recap-windows-agent-platform-project-polaris-copilot-workspace/

### OpenAI GPT-5.3-Codex (zeitgleich mit Project Polaris)
- **Befund:** OpenAI veröffentlicht GPT-5.3-Codex (2026-06-02), das Codex- und GPT-5-Trainingsstacks vereint, ~25% schneller läuft und neue Höchstwerte auf SWE-Bench Pro und Terminal-Bench setzt — am selben Tag wie Project Polaris.
- **Originalquelle:** OpenAI, "Introducing GPT-5.3-Codex" · 2026-06-02 · https://openai.com/index/introducing-gpt-5-3-codex/
- **Fundstelle:** daily/2026/06/2026-06-02.md → Top-5 reading priorities
- **Datum:** 2026-06-02
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Zeigt die hohe Release-Kadenz: Plattform-Anbieter und Frontier-Lab eskalieren auf dem Coding-Agenten stundengleich.
- **Zitat:** "~25% faster ... new SWE-Bench Pro / Terminal-Bench highs"
- **Beleg im Original:** [OpenAI ships GPT-5.3-Codex](https://openai.com/index/introducing-gpt-5-3-codex/)** — OpenAI's most capable agentic coding model, unifying the Codex and GPT-5 stacks (~25% faster, new SWE-Bench Pro / Terminal-Bench highs). Read it back-to-back with Polaris: the frontier-lab-vs-platform fight in developer tooling just sharpened on the same day.
- **Quell-Link:** https://openai.com/index/introducing-gpt-5-3-codex/

### Nathan Lambert: Open-Source-Modelle ohne "Opus-4.5-in-Claude-Code"-Agentenmoment
- **Befund:** Open-Source-Modelle haben noch keinen "Opus-4.5-in-Claude-Code"-Agentenmoment (Lücke laut Lambert wohl 12+ Monate, NICHT 5–6 Monate); selbst Google hat noch keinen echten Claude-Code-/Codex-Konkurrenten.
- **Originalquelle:** Nathan Lambert (Interconnects), "Some ideas for what comes next, May 2026" · 2026-05-26 · https://www.interconnects.ai/p/some-ideas-for-what-comes-next-may
- **Fundstelle:** daily/2026/06/2026-06-02.md → Best blog reads; weekly/2026-W22.md / W23.md
- **Datum:** 2026-06-02
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** korrigiert: Lücke "12+ Monate, nicht 5–6" (verifizierung im Korpus = number_wrong, befund entsprechend korrigiert übernommen)
- **Art:** Kontext
- **Notiz:** Untermauert, warum die führenden Coding-Agenten (Claude Code/Codex) den Markt definieren; lief in 5 von 7 Dailies.
- **Zitat:** "open models still lack an 'Opus-4.5-in-Claude-Code' agent moment (gap likely 12+ months)"
- **Beleg im Original:** Releases tilt to cheap-and-fast; the open-weight cost ceiling moves inside the frontier narrative** — Anthropic shipped Claude Opus 4.8 (88.6% SWE-bench Verified, 69.2% Pro, 74.6% Terminal-Bench 2.1, 93.6% GPQA Diamond at unchanged $5/$25 per-MTok; a 2.5×-faster/~3×-cheaper fast mode; and "dynamic workflows" that let Claude write orchestration scripts spinning up tens-to-hundreds of parallel subagents in one session — moving orchestration inside the model). Google shipped Gemini 3.5 Flash to GA with frontier agentic scores (76.2% Terminal-Bench 2.1, 83.6% MCP Atlas) at ~1/2–1/3 peer cost, …
- **Quell-Link:** https://www.interconnects.ai/p/some-ideas-for-what-comes-next-may

### GitHub Copilot: alle Pläne auf nutzungsbasierte "AI Credits"
- **Befund:** GitHub Copilot stellt zum 2026-06-01 ALLE Pläne auf nutzungsbasierte "AI Credits" um (1 Credit = $0,01): Pro+ enthält $39/Mo Credits, Business $19/User + $19 Credits, Enterprise $39 + $39; Completions/Next-Edit bleiben unlimitiert, agentische Sessions werden verbrauchsbasiert abgerechnet.
- **Originalquelle:** GitHub Blog, "GitHub Copilot is moving to usage-based billing" · 2026-06-01 · https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/
- **Fundstelle:** daily/2026/06/2026-06-01.md → Major news; auch weekly/2026-W23.md TL;DR
- **Datum:** 2026-06-01
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Kontext für Reifegrad/Kosten)
- **Notiz:** Markiert das Ende des Pauschal-Abos für KI-Coding; als Reifegrad- und Kostensignal für die CIO-Kostenplanung relevant.
- **Zitat:** "the all-you-can-eat AI-coding subscription died today"
- **Beleg im Original:** GitHub Copilot moves to usage-based billing (live today)** — As of June 1, all Copilot plans shift from premium-request units to "GitHub AI Credits" (1 credit = $0.01), consumed against published per-model token rates. Pro+ includes $39/mo in credits, Business stays $19/user with $19 in credits, Enterprise $39/user with $39 in credits; code completions and next-edit suggestions stay unlimited and unmetered. Existing Business/Enterprise customers get promotional included usage June–August; credits pool across the org. _Why it matters:_ the clearest signal yet that the flat-rate AI-coding …
- **Quell-Link:** https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/

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
- **Beleg im Original:** Die KI-Illusion: Warum echte Produktivität erst beginnt, wenn wir aufhören zu flicken** — Guido Greber (de). Report from the Digital Gipfel Schweiz 2026 in Andermatt: 88% of Swiss firms now use AI but 41% of CEOs report no ROI; argues productivity only comes from redesigning workflows around AI (the "electricity paradox") rather than bolting Copilot onto old processes, and ties this to Swiss digital sovereignty — data control, the choice between proprietary cloud AI vs locally-hosted open-weight models, energy/compute, the E-ID, and the 2027 Geneva Global AI Summit. _Why interesting:_ …
- **Quell-Link:** https://de.linkedin.com/pulse/die-ki-illusion-warum-uns-kleine-tools-nicht-retten-und-guido-greber-8rxhe

### Anthropic Run-Rate >$47 Mrd. (Mai 2026), Claude Code als schnellstwachsendes Produkt
- **Befund:** Anthropics Run-Rate-Umsatz überschritt im Mai 2026 $47 Mrd., gegenüber $30 Mrd. (Anfang April 2026) und $14 Mrd. (Mitte Februar 2026) — stark durch Claude Code getrieben.
- **Originalquelle:** Simon Willison's Weblog, zitiert Anthropic Series-H-Ankündigung · 2026-05-29 · https://simonwillison.net/2026/May/29/anthropic/
- **Fundstelle:** Online (nicht im Archiv); Primärbefund online, newer_than_archive=true
- **Datum:** 2026-05-29
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** Einzelquelle (Primärseite; "Claude Code >$2.5B run-rate by Feb 2026" nur Sekundärquellen)
- **Art:** Beleg (Marktskala)
- **Notiz:** Quantifiziert die kommerzielle Skala/Beschleunigung hinter KI-Coding ($14B→$30B→$47B in vier Monaten); Run-Rate = letzter Monatsumsatz × 12.
- **Zitat:** "our run-rate revenue crossed $47 billion earlier this month"
- **Beleg im Original:** _(kein wörtlicher Quelltext automatisch auffindbar — siehe Fundstelle/Quell-Link)_
- **Quell-Link:** https://simonwillison.net/2026/May/29/anthropic/

### Anthropic-Run-Rate $43,6 Mrd. zu Q2-Ende; Claude Code $2,5 Mrd.+ annualisiert
- **Befund:** Anthropic-Run-Rate $43,6 Mrd. zu Q2-Ende (Erwartung: >$50 Mrd. bis Ende Juni; in W22 später als ~$47 Mrd. bestätigt); Claude Code bei $2,5 Mrd.+ annualisiert und laut Quelle "most-attacked product surface in enterprise AI".
- **Originalquelle:** weekly/2026-W21.md und 2026-W22.md, per WSJ/Bloomberg-Reporting
- **Fundstelle:** weekly/2026-W21.md → TL;DR; weekly/2026-W22.md → The week in 90 seconds
- **Datum:** 2026-05-21 (W21) / W22 (~$47B-Wert)
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** korrigiert: number_wrong — der ~$47B-Run-Rate-Wert erscheint in W22 (25.–31. Mai), nicht in W21 (18.–24. Mai); $43,6B-Wert galt zu Q2-Ende.
- **Art:** Beleg
- **Notiz:** $2,5 Mrd.+ annualisiert verankert Claude Code als reales Produktgeschäft, nicht nur Demo.
- **Zitat:** "Claude Code is at $2.5B+ annualized, the most-attacked product surface in enterprise AI"
- **Beleg im Original:** Enterprise platforms — Dell + SAP + ServiceNow ship coordinated stacks; OpenAI Deployment Company answers the Big-Four play.** Tue: **Dell Tech World** AI Factory 2.0 + PowerEdge XE on NVIDIA HGX Rubin NVL8 (up to 144 GPUs/rack, 5.5× HGX B200); **Gemini 3.5, OpenAI Codex, Grok, Mistral on Dell on-prem** (Codex on Dell AI Data Platform is the first frontier-lab hybrid/on-prem play, closing the SAP gap). **SAP Sapphire** Autonomous Enterprise on Joule Studio: Claude primary reasoning + AWS bi-directional zero-copy to Athena + NVIDIA OpenShell runtime + Mistral/Cohere sovereign + **n8n at …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### Salesforce: gesamte Engineering-Org auf Claude Code, First-Party-ROI-Zahlen
- **Befund:** Salesforce bewegte seine gesamte Engineering-Org auf Claude Code (unlimitierte Tokens): +79% PRs pro Entwickler, ~5% weniger Incidents, +50,8% YoY Work-Items und eine 33-Endpoint-API-Migration von geschätzt 231 auf 13 Personentage (~18× schneller).
- **Originalquelle:** Salesforce, "How engineering became agentic" / Q1 FY27 (vendor-eigene, ungeprüfte Zahlen) · 2026-05-27/28 · https://www.salesforce.com/news/stories/how-engineering-became-agentic/
- **Fundstelle:** weekly/2026-W22.md → Top stories / TL;DR; daily/2026/05/2026-05-30.md; monthly/2026-05.md
- **Datum:** 2026-05-27 / 2026-05-28
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Zahlen jedoch explizit vendor-eigen und unauditiert)
- **Art:** Beleg
- **Notiz:** Größte First-Party-ROI-Zahl für agentic coding bis dato; explizit vendor-eigen und unauditiert — vorsichtig zu zitieren.
- **Zitat:** "+79% PRs/dev ... a 33-endpoint API migration ... done ~18× faster (231→13 person-days)"
- **Beleg im Original:** Underneath the capital story, enterprise agent revenue stopped being a debate. Salesforce printed $1.2B in Agentforce ARR (+205% YoY, 28.6T tokens) — the first clean Tier-1-SaaS data point past $1B — and reported its own engineering org on Claude Code at +79% PRs/developer and a 33-endpoint migration done ~18× faster. Anthropic verticalized across finance, legal, SMB, SAP, M365 and the Big Four (PwC 30,000 staff, KPMG 276,000, EY/Microsoft) and took the Ramp AI Index lead from OpenAI (34.4% vs 32.3%) — the first US business-AI-adoption lead change of the cycle. Every major enterprise platform …
- **Quell-Link:** https://www.salesforce.com/news/stories/how-engineering-became-agentic/

### Cognition (Devin): $1 Mrd.+ bei ~$26 Mrd. Bewertung
- **Befund:** Cognition (Devin) sammelt $1 Mrd.+ bei ~$26 Mrd. Bewertung ein (2,5× in 8 Monaten) auf $492M ARR und 50% MoM Enterprise-Devin-Wachstum über sechs Monate; Käufer u.a. Mercedes-Benz, NASA, Goldman Sachs, Santander. Zweiter Autonomous-Coding-Bewertungs-Reset binnen 30 Tagen nach Cursor ($50B).
- **Originalquelle:** TechCrunch / Bloomberg · 2026-05-27 · https://techcrunch.com/2026/05/27/ai-coding-startup-cognition-raises-1b-at-25b-pre-money-valuation/
- **Fundstelle:** daily/2026/05/2026-05-27.md → Top-5 / Major news; auch weekly/2026-W22.md
- **Datum:** 2026-05-27
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Kontext (Kapitalmarkt-Signal für Coding-Agent-Layer)
- **Notiz:** Zeigt, dass Kapital sich auf den Coding-Agent-Layer konzentriert; Cursor $50B + Cognition $26B als Bewertungs-Anker.
- **Zitat:** "$492M ARR ... 50% month-over-month enterprise-Devin growth ... for six straight months"
- **Beleg im Original:** Enterprise agent revenue crosses $1B and gets its first hard ROI number** — Salesforce's Q1 FY27 print put Agentforce alone at $1.2B ARR (+205% YoY), with 3.8B Agentic Work Units (+111% QoQ) and 28.6T tokens (+152% QoQ) — the first clean Tier-1-SaaS data point past the $1B-ARR threshold, ending the "is agent revenue real?" debate. Days later Salesforce supplied the demand-side proof: its entire engineering org moved to Claude Code on unlimited tokens, reporting +79% PRs/developer, ~5% fewer incidents, +50.8% YoY work items, and a 33-endpoint API migration estimated at 231 person-days finished …
- **Quell-Link:** https://techcrunch.com/2026/05/27/ai-coding-startup-cognition-raises-1b-at-25b-pre-money-valuation/

### Simon Willison: Coding-Agenten als erstes dauerhaftes PMF für Frontier-Labs
- **Befund:** Willison datiert das Product-Market-Fit-Inflection-Datum von Coding-Agenten auf April 2026 — ein Premium-Markt, der dauerhaft für marginale Intelligenz-Zuwächse zahlt (sein eigener Verbrauch ~$2.180/Mo zu API-Raten vs. $200 im Abo; Uber maxte sein Jahres-KI-Budget Monate früher aus).
- **Originalquelle:** Simon Willison, "I think Anthropic and OpenAI have found product-market fit" · 2026-05-27 · https://simonwillison.net/2026/May/27/product-market-fit/
- **Fundstelle:** weekly/2026-W22.md → Best blog reads; auch weekly/2026-W23.md, daily/2026/06/2026-06-01.md; blogs/2026/05/2026-05-31.md
- **Datum:** 2026-05-27
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext / Beleg (Praktikersicht)
- **Notiz:** Stützt das "Marktstandard"-Narrativ aus Praktiker-Sicht inkl. Kosten-Kontext ($2.180 vs $200); recurred über mehrere Tage.
- **Zitat:** "coding agents are the first durable PMF for frontier labs"
- **Beleg im Original:** I think Anthropic and OpenAI have found product-market fit** — Simon Willison. _Takeaway:_ Argues April 2026 is a new inflection point: both labs quietly moved enterprise plans to full API pricing (GPT-5.5 at 2x GPT-5.4, Opus 4.7 ~1.4x Opus 4.6), and coding agents (Claude Code/Cowork, Codex) are the first product with real revenue legs — Willison's own usage would have cost ~$2,180/mo at API rates vs $200 in subs. Frames the Uber/Microsoft "AI is too expensive" stories as customers sucking air through their teeth and saying yes. [https://simonwillison.net/2026/May/27/product-market-fit/]
- **Quell-Link:** https://simonwillison.net/2026/May/27/product-market-fit/

### Anthropic Claude Opus 4.8: Benchmark-Stand und parallele Subagenten
- **Befund:** Claude Opus 4.8 (Mai 2026): 88,6% SWE-bench Verified, 69,2% SWE-bench Pro, 74,6% Terminal-Bench 2.1, 93,6% GPQA Diamond bei unverändertem $5/$25-Preis; 2,5×-schnellerer/~3×-günstigerer Fast-Mode; "dynamic workflows" starten zehn-bis-hunderte parallele Subagenten in einer Session.
- **Originalquelle:** Anthropic, Claude Opus 4.8 Launch · 2026-05-28/29 · monthly/2026-05.md, weekly/2026-W22.md
- **Fundstelle:** weekly/2026-W22.md → Releases tilt to cheap-and-fast; monthly/2026-05.md → Major releases
- **Datum:** 2026-05-28
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Reifegrad/Benchmark)
- **Notiz:** Aktuellster Benchmark-Stand für das führende Coding-Modell; SWE-bench Verified 88,6% als Reifegrad-Beleg.
- **Zitat:** "88.6% SWE-bench Verified ... a 2.5×-faster / ~3×-cheaper fast mode"
- **Beleg im Original:** Releases tilt to cheap-and-fast; the open-weight cost ceiling moves inside the frontier narrative** — Anthropic shipped Claude Opus 4.8 (88.6% SWE-bench Verified, 69.2% Pro, 74.6% Terminal-Bench 2.1, 93.6% GPQA Diamond at unchanged $5/$25 per-MTok; a 2.5×-faster/~3×-cheaper fast mode; and "dynamic workflows" that let Claude write orchestration scripts spinning up tens-to-hundreds of parallel subagents in one session — moving orchestration inside the model). Google shipped Gemini 3.5 Flash to GA with frontier agentic scores (76.2% Terminal-Bench 2.1, 83.6% MCP Atlas) at ~1/2–1/3 peer cost, …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### Frontier-Modell-Release-Kadenz (März / Mai 2026)
- **Befund:** Release-Kadenz im März bei ~12 Launches in zwei Wochen ("a Class-A drop every three days"); im Mai am 7. Mai allein fünf Frontier-Labs an einem Tag (GPT-5.5 Instant, Opus 4.7, Gemini Workspace Intelligence, Llama API GA, Mistral Medium 3.5).
- **Originalquelle:** Diverse Lab-Releases / mean.ceo Tracker · 2026-03 / 2026-05-07 · monthly/2026-03.md, monthly/2026-05.md
- **Fundstelle:** monthly/2026-03.md → TL;DR; monthly/2026-05.md → Major releases (Frontier-lab pile-up Thursday)
- **Datum:** 2026-05-07
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext (Kadenz)
- **Notiz:** Belegt die extrem hohe Release-Frequenz; geeignet für ein Kadenz-Argument.
- **Zitat:** "five frontier labs ship in one day"
- **Beleg im Original:** GTC 2026 (Mar 16) was the structural anchor. Vera Rubin's Rubin R100 and 88-core Vera CPU claim roughly five times Blackwell inference at about ten times lower cost per token; Groq 3 LPU shipped as the first chip from the late-2025 acquisition; the Agent Toolkit launched with seventeen enterprise anchors (Adobe, Salesforce, SAP, ServiceNow, Siemens, CrowdStrike, Atlassian, Cadence, Synopsys, IQVIA, Palantir, Box, Cohesity, Dassault, Red Hat, Cisco, Amdocs) and a roughly $1T Blackwell-plus-Rubin order book through 2027. Inside the next two weeks twelve frontier-model launches landed against …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### Beschleunigende Release-Kadenz: GPT-5.5 und Claude Opus 4.7 binnen einer Woche
- **Befund:** OpenAI veröffentlichte GPT-5.5 am 2026-04-23 (1M-Token-Kontext; SWE-bench Pro 58,6%, Terminal-Bench 2.0 82,7%); Anthropic Claude Opus 4.7 am 2026-04-16, führend auf SWE-bench Pro mit 64,3% (Terminal-Bench 2.0 69,4%). Mehrere Flaggschiff-Coding-Modelle erscheinen nun binnen Wochen voneinander.
- **Originalquelle:** Vellum (GPT-5.5 Brief) · 2026 · https://www.vellum.ai/blog/everything-you-need-to-know-about-gpt-5-5
- **Fundstelle:** Online (nicht im Archiv); Primärbefund online
- **Datum:** 2026-04-23
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (auf gefetchter Vellum-Seite); Opus-4.7-Datum/64,3% aus Suchergebnissen, konsistent mit Vergleich. Benchmarks harness-sensitiv — Einzelwerte nur direktional.
- **Art:** Kontext (Kadenz/Benchmark)
- **Notiz:** Direkter Beleg für die "model release cadence"-Frage; Benchmark-Führung oszilliert pro Benchmark.
- **Zitat:** "GPT-5.5 Release Date: April 23, 2026. SWE-bench Pro: 58.6% (Claude Opus 4.7: 64.3%); Terminal-Bench 2.0: 82.7% (Claude Opus 4.7: 69.4%); Context Window: 1M tokens"
- **Beleg im Original:** _(kein wörtlicher Quelltext automatisch auffindbar — siehe Fundstelle/Quell-Link)_
- **Quell-Link:** https://www.vellum.ai/blog/everything-you-need-to-know-about-gpt-5-5

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
- **Beleg im Original:** _(kein wörtlicher Quelltext automatisch auffindbar — siehe Fundstelle/Quell-Link)_
- **Quell-Link:** https://stackoverflow.blog/2025/12/29/developers-remain-willing-but-reluctant-to-use-ai-the-2025-developer-survey-results-are-here/

### Microsoft Q3 FY26: >20 Mio. M365-Copilot-Seats, +75% sequenziell
- **Befund:** Microsoft Q3 FY26: über 20 Mio. bezahlte M365-Copilot-Seats, Copilot-Seats +75% sequenziell auf ~15M Nutzer über 80% der Fortune 500; AI-Umsatz-Run-Rate >$37B (+123% YoY); Q3-Umsatz $82,9 Mrd. (+18%), Azure +40%, CY26-Capex ~$190 Mrd.
- **Originalquelle:** Microsoft Q3 FY26 Earnings (CFO Amy Hood) · 2026-04-29 · https://news.microsoft.com/source/2026/04/29/microsoft-cloud-and-ai-strength-fuels-third-quarter-results/
- **Fundstelle:** daily/2026/04/2026-04-29.md → Major news & releases; weekly/2026-W18.md
- **Datum:** 2026-04-29
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Enterprise-Adoption/Skala)
- **Notiz:** Härtester Enterprise-Adoptionsbeleg des Quartals laut Quelle; +75% sequenziell ist die Schlüsselzahl.
- **Zitat:** "Copilot for M365 paid seats up 75% sequentially ... 80% of the Fortune 500"
- **Beleg im Original:** _Synthesized from per-topic collectors (backfill on 2026-05-14 — historical reconstruction). Wednesday is a **funding-and-frontier** day. **Anthropic weighs $50B at ≥$900B** — Bloomberg/CNBC/TechCrunch report preemptive offers in the $850-900B band; would topple OpenAI's $852B and could close within two weeks. Anthropic's last raise was $380B in February — the ~2.4× implied mark validates the 80× Q1 revenue growth, Google's $40B compute commitment, AWS 5GW Trainium capacity and Claude Code/Cowork momentum as the underlying story. **Mistral ships Vibe Remote Agents + Mistral Medium 3.5** — …
- **Quell-Link:** https://news.microsoft.com/source/2026/04/29/microsoft-cloud-and-ai-strength-fuels-third-quarter-results/

### Snap: ~1.000 Stellenstreichungen, begründet mit 65%+ KI-generiertem Code
- **Befund:** Snap kündigt ~1.000 Stellenstreichungen an; CEO Evan Spiegel begründet die Restrukturierung damit, dass 65%+ des neuen Codes KI-generiert ist.
- **Originalquelle:** BBC / Snap (Evan Spiegel) · 2026-04-24 · https://www.bbc.com/news/business-snap-layoffs-april-2026
- **Fundstelle:** daily/2026/04/2026-04-24.md → Also notable / day-in-90s; news/2026/04/2026-04-24.md
- **Datum:** 2026-04-24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Unternehmens-%-Wert KI-Code)
- **Notiz:** Zweiter benannter Unternehmens-%-Wert (65%) nach Google; koppelt KI-Code-Anteil direkt an Workforce-Entscheidungen.
- **Zitat:** "65%+ of new code is AI-generated"
- **Beleg im Original:** Underneath the three big threads, two pieces of plumbing-grade reading dropped. Anthropic published the postmortem for the April 23 Claude Code regression, and Simon Willison's annotated version makes clear the cause was not the model but three separate harness bugs — the standout being a March 26 change to clear stale thinking context after an hour of idle time that, due to a bookkeeping error, fired every turn for the rest of the session, leaving Claude "forgetful and repetitive." SemiAnalysis's "Coding Assistant Breakdown" then put a number on what coding workloads actually cost: a true …
- **Quell-Link:** https://www.bbc.com/news/business-snap-layoffs-april-2026

### Shopify im "AI phase transition": 100% Workforce-Adoption
- **Befund:** Shopify im "AI phase transition": 100% Workforce-Adoption von KI-Tools plus unlimitiertes Opus-4.6-Token-Budget (CTO Mikhail Parakhin).
- **Originalquelle:** Latent Space (Interview mit Mikhail Parakhin) · 2026-04-22 · daily/2026/04/2026-04-22.md
- **Fundstelle:** daily/2026/04/2026-04-22.md → day-in-90s (Latent Space, Shopify)
- **Datum:** 2026-04-22
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg (Rollout-Skala)
- **Notiz:** Konkretes 100%-Adoptionsbeispiel eines großen Tech-Unternehmens; als Rollout-Skala-Anker nutzbar.
- **Zitat:** "100% workforce AI-tool adoption + unlimited Opus 4.6 token budget"
- **Beleg im Original:** _Synthesized from per-topic collectors (backfill on 2026-05-14 — historical reconstruction). Cloud Next day-2 is the deepest enterprise-platform pitch any hyperscaler has made in 2026. **Google launches Gemini Enterprise Agent Platform** — a unified workspace for building / deploying / governing / observing AI agents, direct evolution of Vertex AI. Headline primitives: **Agent Designer** (visual builder), **Inbox** (agent activity), **long-running agents** (multi-day state), **Skills**, **Projects**, **Agent Identity**, **Agent Registry**, **Agent Gateway**, and a re-engineered **Agent …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### Google Cloud Next 2026: ~75% des neuen Codes KI-generiert
- **Befund:** Bei Google sind laut Pichai (Cloud Next 2026) ~75% des neu geschriebenen Codes KI-generiert (und von Ingenieuren reviewt); eine interne Migration lief mit Agenten 6× schneller als ein Jahr zuvor. Google Cloud: $70 Mrd. Jahresumsatz bei 48% Wachstum, $240 Mrd. Backlog, 750M Gemini-Nutzer.
- **Originalquelle:** Sundar Pichai, Google Cloud Next 2026 Keynote · 2026-04-21 · https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/cloud-next-2026-sundar-pichai/
- **Fundstelle:** daily/2026/04/2026-04-21.md → Major news; auch weekly/2026-W17.md, monthly/2026-04.md
- **Datum:** 2026-04-21
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Unternehmensinterner %-Wert KI-Code)
- **Notiz:** Konkretester unternehmensinterner %-Wert für KI-generierten Code; "75%" ist eine Volumen-Anteilszahl, kein direkter Produktivitätsfaktor — vorsichtig interpretieren.
- **Zitat:** "~75% of new code written at Google is AI-generated and reviewed by engineers"
- **Beleg im Original:** _Synthesized from per-topic collectors (backfill on 2026-05-14 — historical reconstruction). The heaviest day of the window — three capital-formation announcements, three enterprise-platform launches, and the largest tech-history capital raise all in 24 hours. **Sundar Pichai opens Google Cloud Next 2026** in Vegas: $70B Cloud annual revenue at 48% growth, **$240B backlog**, **750M Gemini users**; 75% of new Google code is AI-generated, a recent internal migration ran **6× faster** with agents — Google reframes itself as "the OS for agents, not a model provider." **Anthropic + Google + …
- **Quell-Link:** https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/cloud-next-2026-sundar-pichai/

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
- **Beleg im Original:** [Changes to GitHub Copilot Individual plans](https://simonwillison.net/2026/Apr/22/changes-to-github-copilot/)** — GitHub via Willison. Same-day announcement: pausing Copilot Individual signups (!), tightening usage limits, restricting Opus 4.7 to the $39 Pro+ tier, dropping older Opus models. The load-bearing quote: "long-running, parallelized sessions now regularly consume far more resources than the original plan structure was built to support." Per-request pricing is decisively dead; agent economy shifts back to per-token. Pair with [Claude Code $100/month …
- **Quell-Link:** https://simonwillison.net/2026/Apr/22/changes-to-github-copilot/

### JetBrains AI Pulse Survey (Januar 2026): 90% nutzen mind. ein KI-Tool
- **Befund:** 90% der Entwickler nutzten zum Januar 2026 regelmäßig mindestens ein KI-Tool bei der Arbeit; 74% hatten developer-spezifische KI-Tools adaptiert. GitHub Copilot führt bei Awareness (76%), aber nur 29% nutzen es bei der Arbeit; Claude-Code-Adoption verdreifachte sich auf 18% (24% in US/Kanada), gleichauf mit Cursor (69% Awareness / 18% Use). OpenAI Codex 27% Awareness / 3% Use; Google Antigravity 6% Adoption.
- **Originalquelle:** JetBrains Research Blog (State of Developer Ecosystem / AI Pulse) · 2026-04 · https://blog.jetbrains.com/research/2026/04/which-ai-coding-tools-do-developers-actually-use-at-work/
- **Fundstelle:** Online (nicht im Archiv); Primärbefund online
- **Datum:** 2026-04 (Survey-Welle datiert Januar 2026)
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (auf gefetchter Seite). Claude-Code-Awareness-Trajektorie: 31% (Apr–Jun 2025) → 49% (Sep 2025) → 57% (Jan 2026); Adoption 3% → 12% → 18%.
- **Art:** Beleg (Adoption/Reifegrad-Survey)
- **Notiz:** Bestbelegte Einzelquelle zur KI-Coding-Reife: trennt Awareness von realem Einsatz, zeigt, dass Copilots Awareness-Führung nicht in dominanten Einsatz übersetzt, und quantifiziert Claude Codes raschen Aufstieg.
- **Zitat:** "90% of developers regularly used at least one AI tool at work for coding ... (January 2026); GitHub Copilot 76% awareness, 29% using it at work; Claude Code adoption 18%, US/Canada 24%."
- **Beleg im Original:** _(kein wörtlicher Quelltext automatisch auffindbar — siehe Fundstelle/Quell-Link)_
- **Quell-Link:** https://blog.jetbrains.com/research/2026/04/which-ai-coding-tools-do-developers-actually-use-at-work/

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
- **Beleg im Original:** _(kein wörtlicher Quelltext automatisch auffindbar — siehe Fundstelle/Quell-Link)_
- **Quell-Link:** https://blog.jetbrains.com/research/2026/04/ai-impact-developer-workflows/

### Stanford HAI 2026 AI Index: 53% globale GenAI-Adoption in 3 Jahren
- **Befund:** GenAI erreichte 53% globale Bevölkerungs-Adoption in 3 Jahren (schneller als PC oder Internet); ~$172B jährlicher US-Konsumentennutzen; $581,7B globale Unternehmens-KI-Investition 2025 (+130% YoY).
- **Originalquelle:** Stanford HAI, 2026 AI Index Report · Erstabdeckung 2026-04-13 (US-Adoption/Consumer-Value), vollständigere globale Zahlen in "Inside the AI Index: 12 Takeaways from the 2026 Report" · 2026-05-17 · https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report
- **Fundstelle:** daily/2026/04/2026-04-13.md → Top-5; auch daily/2026/05/2026-05-17.md, daily/2026/03/2026-03-28.md
- **Datum:** 2026-04-13 (US-Werte) / 2026-05-17 (globale Werte)
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** korrigiert: source_wrong — die globale $581,7B-Investition und die "global population adoption"-Rahmung erscheinen erstmals in Stanford HAIs Mai-Berichterstattung (ab 2026-05-17), nicht im am 13. April zitierten Briefing (dort US-Population-Adoption).
- **Art:** Kontext (Makro-Baseline)
- **Notiz:** Makro-Baseline für "Warum jetzt"; die 53%-in-3-Jahren-Kurve ist das stärkste Adoptions-Geschwindigkeitsargument.
- **Zitat:** "GenAI hit 53% global adoption in 3 years (faster than PC or internet)"
- **Beleg im Original:** Underneath the headlines, the market repriced. Stanford HAI's 2026 AI Index landed in full, partnered with an MIT Technology Review chart pack and an IEEE Spectrum takeaway piece. The numbers underwrite the rest of the year: Anthropic leads the frontier rankings as of March, trailed closely by xAI, Google and OpenAI, with DeepSeek and Alibaba lagging only modestly; generative AI is at 53 percent United States population adoption, faster than PC or internet; consumer value is pegged at 172 billion dollars annually. That is the baseline reference for the GPT-5.5, Mythos GA, Gemini 3.1 and …
- **Quell-Link:** https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report

### Cursor (Anysphere): $2 Mrd. ARR, ~$50 Mrd. Bewertung in Verhandlung
- **Befund:** Cursor erreichte bis Februar 2026 $2 Mrd. annualisierte Run-Rate und verhandelte (April 2026) $2 Mrd.+ bei ~$50 Mrd. Bewertung (Verdopplung gegenüber $29,3 Mrd. im Nov 2025); Prognose >$6 Mrd. ARR bis Jahresende 2026. Positive Bruttomargen bei Großkunden, aber weiterhin Verlust bei Einzelentwickler-Accounts.
- **Originalquelle:** TechCrunch · 2026-04-17 · https://techcrunch.com/2026/04/17/sources-cursor-in-talks-to-raise-2b-at-50b-valuation-as-enterprise-growth-surges/
- **Fundstelle:** Online (nicht im Archiv); Primärbefund online
- **Datum:** 2026-04-17
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (auf gefetchter Seite). Margen-Gegensignal: Verlust bei Einzelentwickler-Accounts.
- **Art:** Kontext / Beleg (Markt ist multi-vendor)
- **Notiz:** Cursor als führende KI-native IDE zeigt, dass der Markt multi-vendor ist, nicht Copilot-only; außerordentliche Investorenbewertung.
- **Zitat:** "February 2026 ARR: $2 billion annualized run rate; pre-money valuation $50 billion; prior $29.3 billion (Nov 2025); 2026 forecast 'more than $6 billion'"
- **Beleg im Original:** _(kein wörtlicher Quelltext automatisch auffindbar — siehe Fundstelle/Quell-Link)_
- **Quell-Link:** https://techcrunch.com/2026/04/17/sources-cursor-in-talks-to-raise-2b-at-50b-valuation-as-enterprise-growth-surges/

### GitHub Copilot: 4,7M zahlende Abos / 20M All-Time / 90% Fortune 100
- **Befund:** Microsoft meldete auf dem FY26-Q2-Earnings-Call (28.01.2026) ~4,7 Mio. zahlende GitHub-Copilot-Abonnenten, ~75% YoY. Copilot hatte zuvor 20 Mio. All-Time-Nutzer überschritten (Juli 2025) und wird von 90% der Fortune 100 genutzt.
- **Originalquelle:** TechCrunch (20M All-Time, Fortune 100) · 2025-07-30 · https://techcrunch.com/2025/07/30/github-copilot-crosses-20-million-all-time-users/ ; Abonnentenzahl aus Microsoft FY26 Q2 Call (2026-01-28) via Sekundärberichterstattung
- **Fundstelle:** Online (nicht im Archiv); Primärbefund online
- **Datum:** 2026-01-28
- **Verifizierung:** Teil-confirmed: 20M All-Time und 90% Fortune 100 auf gefetchter TechCrunch-Seite bestätigt; die 4,7M zahlend / 75% YoY ist near-primary (Microsoft-Call via Sekundärquellen, nicht direkt gefetcht). TechCrunch: MAU/DAU "likely far lower" als 20M All-Time.
- **Status ggü. bisherigem Stand:** NEU
- **Art:** Beleg (Enterprise-Penetration)
- **Notiz:** Copilot ist der inkumbente Benchmark für KI-Coding-Skala; die Trias 4,7M zahlend / 20M All-Time / 90% Fortune 100 verankert Enterprise-Durchdringung.
- **Zitat:** "GitHub Copilot... is used by 90% of the Fortune 100; 20 million all-time users; ~4.7M paid subscribers (Microsoft FY26 Q2, +75% YoY)"
- **Beleg im Original:** _(kein wörtlicher Quelltext automatisch auffindbar — siehe Fundstelle/Quell-Link)_
- **Quell-Link:** https://techcrunch.com/2025/07/30/github-copilot-crosses-20-million-all-time-users/

### MCP-SDK-Installs: Größenordnungssprung 2M → 97M
- **Befund:** MCP bei 97M monatlichen SDK-Installs (bestätigt 2026-03-25); 10.000+ öffentliche Server; Launch-Vergleich "vs. ~2M beim Launch im Nov 2024".
- **Originalquelle:** 97M-Zahl: Anthropic MCP-Team-Disclosure · 2026-03-25 · daily/2026/03/2026-03-25.md. 10.000+ Server und Launch-Vergleich: ByteBridge Medium-Artikel, zitiert in daily/2026/03/2026-03-18.md.
- **Fundstelle:** daily/2026/03/2026-03-25.md → day-in-90s; weekly/2026-W23.md → LinkedIn pulse; auch weekly/2026-W13.md, monthly/2026-03.md
- **Datum:** 2026-03-25
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** korrigiert: source_wrong — die "10.000+ Server" und der Launch-Vergleich stammen aus dem ByteBridge-Artikel (2026-03-18), nicht aus 2026-03-25.md; die 97M-Zahl selbst ist confirmed (Anthropic). Aktualisierte Stände: ~110M (Mai 2026) bzw. weiterhin ~97M zitiert mit 18.000+ Servern (Juni 2026, siehe unten).
- **Art:** Beleg (Standardisierung Agenten-Tooling)
- **Notiz:** Größenordnungssprung (2M→97M, ~48× in 16 Monaten) belegt die Verankerung von MCP als Branchenstandard für Agenten-Tooling.
- **Zitat:** "97 million monthly SDK installs against roughly two million at the November 2024 launch"
- **Beleg im Original:** The third thread is agent-stack security crossing from theoretical to acute. Tuesday 2026-03-24, LiteLLM 1.82.7 and 1.82.8 shipped a base64 credential stealer hidden in a litellm_init.pth file that runs on install with no import required, exfiltrating SSH and AWS keys, crypto wallet directories, and shell history. Anthropic shipped Auto mode for Claude Code the same day, a Sonnet 4.6 classifier-based tool-call gating layer that, as Simon Willison noted in the same-day juxtaposition, would not have stopped the LiteLLM attack. Wednesday brought the FutureSearch BigQuery PyPI blast-radius data: …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### MCP: ~110M monatliche Downloads (Mai 2026), Pilot-to-Production 18% → 31%
- **Befund:** MCP-SDK-Downloads bei ~110M/Monat (Mai 2026); 10.000+ Enterprise-Server unter Linux-Foundation-AAIF-Governance (nur von Sreejith genannt); agentische Pilot-to-Production-Conversion stieg von 18% (Q1) auf 31% (Q2). A2A: 150+ Orgs in Produktion.
- **Originalquelle:** Sudha Sreejith (2026-05-04, zit. in weekly/2026-W19.md) und Paweł Wiącek (2026-05-15, weekly/2026-W20.md)
- **Fundstelle:** weekly/2026-W20.md → Agentic Commerce Protocol Stack; weekly/2026-W19.md → "The Protocol That Ate the Enterprise"
- **Datum:** 2026-05-15
- **Status ggü. bisherigem Stand:** aktualisiert
- **Verifizierung:** korrigiert: number_wrong — "10.000+ enterprise servers" stammt ausschließlich von Sreejith (2026-05-04), nicht von Wiącek (der nur "110M monthly SDK downloads" ohne Serverzahl nennt). Einzelquelle pro Teilzahl.
- **Art:** Beleg (Reifegrad MCP)
- **Notiz:** Aktualisiert die 97M-Zahl auf ~110M/Monat; Pilot-to-Production-Conversion 18%→31% ist ein Reifegrad-Datenpunkt.
- **Zitat:** "MCP — 110M monthly SDK downloads; A2A — 150+ orgs in prod"
- **Beleg im Original:** Enterprise-agent platform consolidation is the dominant theme of the week** — Mon May 11: OpenAI Deployment Company JV + Tomoro acquihire; AWS MCP Server GA first reads; CAISI pre-deployment pact with Google DeepMind/Microsoft/xAI; Pinecone Launch Week (Nexus context compiler + KnowQL + 90-app marketplace + Frankfurt/Singapore regions). Tue May 12: SAP Sapphire Autonomous Enterprise + Claude in Joule + n8n $5.2B; ServiceNow Knowledge 2026 (MCP Server GA, AI Control Tower expansion, Build Agent everywhere); Salesforce Summer '26 (Multi-Agent Orchestration + Tableau MCP + Agent Fabric); …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### MCP-Stand Juni 2026: ~97M Downloads, 18.000+ indexierte Server
- **Befund:** Anfang Juni 2026 zitiert das Archiv weiterhin ~97M monatliche MCP-SDK-Downloads; MCP wird von der Linux Foundation AAIF mit 18.000+ indexierten Servern verwaltet; "MCP-für-Tools + A2A-für-Koordination" als Referenzarchitektur.
- **Originalquelle:** MCP Blog ("2026-07-28 RC") / a2a-protocol.org · 2026-06-02/03 · daily
- **Fundstelle:** daily/2026/06/2026-06-02.md → MCP RC item; daily/2026/06/2026-06-03.md → MCP June 2026 spec
- **Datum:** 2026-06-03
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** confirmed
- **Art:** Beleg (Reifegrad / Standardisierung)
- **Notiz:** Neuester Stand zur Skala: 97M Downloads weiter genannt, 18.000+ Server; zeigt MCP als etabliertes Enterprise-Substrat.
- **Zitat:** "governed by the Linux Foundation's Agentic AI Foundation with 18,000+ indexed servers"
- **Beleg im Original:** MCP June 2026 spec targets server-as-agent / recursive composition** — The upcoming spec is expected to let MCP servers connect to other MCP servers for recursive composition. MCP is now governed by the Linux Foundation's Agentic AI Foundation with 18,000+ indexed servers; the "MCP-for-tools + A2A-for-coordination" two-layer model has crystallized as the reference architecture. _Why it matters:_ the protocol layer is consolidating under neutral governance — the precondition for real cross-vendor agent interop. ([A2A](https://a2a-protocol.org/latest/))
- **Quell-Link:** https://a2a-protocol.org/latest/

### Pragmatic Engineer Survey (März 2026): Tiefe der Nutzung bei Praktikern
- **Befund:** Unter Engineers, die bereits KI nutzen, ist die Nutzung nahezu gesättigt und agentenlastig: 95% nutzen KI-Tools wöchentlich oder häufiger, 75% für mindestens die Hälfte ihrer Arbeit, 56% erledigen 70%+ der Engineering-Arbeit mit KI, 55% nutzen regelmäßig KI-Agenten. Claude Code als #1 meistgenutztes Coding-Tool ~8 Monate nach Launch (Mai 2025); 70% jonglieren 2–4 Tools.
- **Originalquelle:** The Pragmatic Engineer (Gergely Orosz), "AI Tooling for Software Engineers in 2026" · 2026-03-03 · https://newsletter.pragmaticengineer.com/p/ai-tooling-2026
- **Fundstelle:** Online (nicht im Archiv); Primärbefund online
- **Datum:** 2026-03-03
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (auf gefetchter Seite). Selbstselektierte Praktiker-Stichprobe (skew zu heavy AI-Usern) — als optimistische Grenze zu lesen.
- **Art:** Beleg (Reifegrad/Nutzungstiefe)
- **Notiz:** Bei Praktikern ist die Nutzungstiefe weit höher als Headline-Adoption suggeriert; agentische Workflows sind mainstream — kontrastiert mit den Vertrauenssorgen.
- **Zitat:** "95% use AI tools weekly or more; 75% use AI for at least half their work; 56% do 70% or more of engineering work with AI; 55% regularly use AI agents"
- **Beleg im Original:** _(kein wörtlicher Quelltext automatisch auffindbar — siehe Fundstelle/Quell-Link)_
- **Quell-Link:** https://newsletter.pragmaticengineer.com/p/ai-tooling-2026

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
- **Beleg im Original:** [The Impact of AI on Software Engineers in 2026: Key Trends](https://newsletter.pragmaticengineer.com/p/the-impact-of-ai-on-software-engineers-2026)** — Gergely Orosz, The Pragmatic Engineer. _Takeaway:_ Survey of 906 engineers and engineering leaders (median 11–15 years experience): 95% use AI tools weekly, agents now used by 55% of developers, Claude Code went from zero to most-used tool in 8 months. Employers pay for more AI coding tools than individuals do; "max" plans (Claude Code, Cursor, Codex) run ~$100–200/month per engineer. The "Shippers" cohort benefits most but adds tech debt …
- **Quell-Link:** https://newsletter.pragmaticengineer.com/p/the-impact-of-ai-on-software-engineers-2026

### Harness-/Subagent-Vokabular wird plattformübergreifend Standard
- **Befund:** Das Harness-/Subagent-Vokabular (Planner/Generator/Evaluator) wurde nach Anthropics Post (2026-03-23) binnen 96h plattformübergreifend Standard — sichtbar in Claude Code, Codex, Gemini CLI, Mistral Vibe, OpenCode, Cursor und VS Code. "Agentic Engineering" etablierte sich als Begriff.
- **Originalquelle:** Prithvi Rajasekaran (Anthropic), "Harness design for long-running application development" + Simon Willison "Agentic Engineering Patterns" · 2026-03-16/23 · daily/2026/03/2026-03-16.md
- **Fundstelle:** monthly/2026-03.md → Defining themes "Harness-as-product"; daily/2026/03/2026-03-16.md
- **Datum:** 2026-03-23
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg (Standardpraxis)
- **Notiz:** Direkter Beleg, dass agentic engineering vom Buzzword zur plattformübergreifenden Standardpraxis wurde.
- **Zitat:** "makes the vocabulary platform-standard before the rest of the field has finished arguing about it"
- **Beleg im Original:** The two other threads ran in parallel. Mistral shipped Small 4 into the GTC spotlight gap — an Apache-2 119B-parameter mixture-of-experts model with 6B active parameters that unifies Magistral (reasoning), Pixtral (multimodal), and Devstral (agentic coding) behind a single `reasoning_effort` knob — and also released Leanstral, an open-weight Lean 4 model. It was the only frontier-model ship of GTC Day 1, and it was deliberately positioned opposite NVIDIA's closed enterprise stack. Meanwhile Simon Willison published Chapter 2 of his Agentic Engineering Patterns guide, framing a coding agent as …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### Claude Code ~4% aller öffentlichen GitHub-Commits, projiziert 20%
- **Befund:** Claude Code macht laut SemiAnalysis bereits ~4% aller öffentlichen GitHub-Commits aus, projiziert 20% bis Jahresende; am 2026-03-15 ein Rekord von 326.731 Commits an einem Tag.
- **Originalquelle:** SemiAnalysis (Dylan Patel et al.), "Claude Code is the Inflection Point" · 2026-03-15 · https://newsletter.semianalysis.com/p/claude-code-is-the-inflection-point
- **Fundstelle:** weekly/2026-W11.md → Top stories / Read this first; auch daily/2026/03/2026-03-15.md
- **Datum:** 2026-03-15
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Projektion 20% ist eine Schätzung der Quelle, kein gemessener Wert)
- **Art:** Beleg (Marktdurchdringung)
- **Notiz:** Quantitativ stärkster Einzelbeleg für den Übergang von Coding-Assistenten zur Entwicklungs-Substrat-These; die 20%-Projektion ist die Schlagzeilen-Zahl.
- **Zitat:** "Claude Code at ~4% of GitHub public commits, projected ~20% by year-end"
- **Beleg im Original:** The week's single highest-signal read is SemiAnalysis's "Claude Code is the Inflection Point" by Dylan Patel and team. The piece pins a hard number on a thesis that had been impressionistic until now: Claude Code already accounts for roughly 4% of all public commits on GitHub, projected to reach 20% by year-end, with 326,731 single-day commits hitting the platform on 2026-03-15 itself — a record. Simon Willison's new "Agentic Engineering Patterns" guide arrives the same morning and supplies the vocabulary, defining coding agents as systems that both write and execute code, with Claude Code, …
- **Quell-Link:** https://newsletter.semianalysis.com/p/claude-code-is-the-inflection-point

### Goldman Sachs setzt KI-Agenten Devin produktiv ein
- **Befund:** Goldman Sachs ist laut Quelle die erste Großbank, die den KI-Agenten Devin einsetzt — laut ODSC der Moment, in dem der "AI seat" vom Werkzeug zur budgetierten Workforce-Position wird.
- **Originalquelle:** ODSC (Medium), "Goldman Sachs Becomes First Major Bank to Use AI Agent Devin" · 2026-05-03 · https://odsc.medium.com/goldman-sachs-becomes-first-major-bank-to-use-ai-agent-devin...
- **Fundstelle:** daily/2026/05/2026-05-03.md → Best blog reads / day-in-90s
- **Datum:** 2026-05-03
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg (Enterprise-Einsatz reguliertes Umfeld)
- **Notiz:** Hochrelevant für ein Bank-CIO-Deck: Tier-1-Bank setzt autonomen Coding-Agenten produktiv ein.
- **Zitat:** "the 'AI seat' stops being a tool and becomes a budgeted workforce line"
- **Beleg im Original:** _Synthesized from per-topic collectors (backfill on 2026-05-14 — historical reconstruction). Sunday — the last day before tracking begins. The standout original is **Sakana AI's KAME** (Japanese for "turtle"): tandem speech-to-speech architecture that pairs a fast S2S frontend with an asynchronous backend LLM via an "oracle" stream. Partial transcripts flow to the LLM as the user speaks; the LLM emits tentative guesses that refine in real time — flipping the paradigm from "think then speak" to "speak while thinking." MT-Bench: **2.05 → 6.43** while maintaining near-zero latency. …
- **Quell-Link:** https://odsc.medium.com/goldman-sachs-becomes-first-major-bank-to-use-ai-agent-devin...

### Mizuho "Agent Factory": ~70% kürzere Agenten-Bauzeit
- **Befund:** Mizuho Financial Group "Agent Factory" senkte die Agenten-Bauzeit um ~70% (von ~zwei Wochen auf Tage) — laut Quelle erste japanische Megabank, die autonome Agenten in der Breite produziert.
- **Originalquelle:** via daily digest · 2026-04-06 · daily/2026/04/2026-04-06.md
- **Fundstelle:** daily/2026/04/2026-04-06.md → Lead narrative
- **Datum:** 2026-04-06
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Finanzsektor-Adoption)
- **Notiz:** Nicht-Tech-/Finanzsektor-Datenpunkt; relevant für ein reguliertes Bankenpublikum.
- **Zitat:** "Agent Factory cut agent build time roughly 70 percent, from about two weeks to days"
- **Beleg im Original:** Microsoft used the same Monday to close its agent stack. Agent Framework 1.0.0 separates the agent control plane from the application and ships pre-configured connectivity into Azure, joining the Agent Governance Toolkit released 2-3 April and the Copilot Studio multi-agent GA from the prior week. Build, govern, distribute — feature-complete in production for the first time from any single vendor. The structural read is that Microsoft is no longer racing Anthropic and Google on model quality; it is racing them on the boring layer where enterprise procurement actually happens. Mizuho Financial …
- **Quell-Link:** _(kein direkter Link; siehe Fundstelle / Originalquelle)_

### Schweiz-Kontext: 73% haben GenAI ausprobiert (Europa-Spitze)
- **Befund:** 73% der Schweizer haben GenAI ausprobiert (Europa-Spitze; 47% monatlich, 21% täglich); Romandie 81,6% > Deutschschweiz 74,1%; Alterskluft 14–19-Jährige 84% vs. 70+ 14%; Warnung vor GenAI als "Brandbeschleuniger" bestehender Ungleichheiten ohne strukturierte Befähigung.
- **Originalquelle:** Paul Meyrat, "KI ist angekommen. Aber nicht bei allen." (Eurostat, BFS, Stanford AI Index 2026, WIP-CH 2025, Pew, Anthropic Economic Index) · 2026-05-10/12 · https://www.linkedin.com/pulse/ki-ist-angekommen-aber-nicht-bei-allen-paul-meyrat-5ltxe
- **Fundstelle:** daily/2026/05/2026-05-12.md → LinkedIn pulse; daily/2026/05/2026-05-10.md; linkedin/2026/05/2026-05-14.md
- **Datum:** 2026-05-12
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg / Kontext (Schweiz)
- **Notiz:** Bestes Schweiz-Datenstück der Woche; verankert die "Marktstandard"-Aussage im Schweizer Kontext und benennt Schatten-KI-Governance-Bedarf.
- **Zitat:** "Switzerland leads Europe with 73% having tried GenAI"
- **Beleg im Original:** KI ist angekommen. Aber nicht bei allen.** — Paul Meyrat (de-CH), May 10. Data-driven Swiss/EU adoption analysis: 32.7% EU GenAI use among 16–74; Denmark 48.4%, Estonia 46.6%, Finland 46.3% leading vs Italy 19.9% / Romania 17.8% / Bulgaria 22.5%; Switzerland top of the Stanford AI Index 2026 for AI talent density, 73% of Swiss internet users have tried AI, 47% monthly, 21% daily; Romandie 81.6% vs Deutschschweiz 74.1%; deep generational/educational divide (CH 14–19 84% vs >70 14%); calls for systematic enablement and governance against shadow-AI. (Translated from German: "AI has arrived — but …
- **Quell-Link:** https://www.linkedin.com/pulse/ki-ist-angekommen-aber-nicht-bei-allen-paul-meyrat-5ltxe

### METR-Selbstbericht-Umfrage: "Wert der Arbeit" 1,3× → 2,0× → 2,5× (Prognose)
- **Befund:** 349 technische Fachkräfte beziffern den "Wert ihrer Arbeit" auf 1,3× (März 2025) → 2,0× (März 2026) → Prognose 2,5× (März 2027).
- **Originalquelle:** METR · 2026-05-11 · https://metr.org/blog/2026-05-11-ai-usage-survey/
- **Fundstelle:** news/2026/05/2026-05-19.md → LinkedIn/Items section
- **Datum:** 2026-05-11
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (jedoch SELBSTBERICHTET, nicht die randomisierte METR-Kontrollstudie — Zahlen sind Eigeneinschätzung, tendenziell optimistisch)
- **Art:** Kontext (Produktivitäts-Selbsteinschätzung)
- **Notiz:** Wichtiger Caveat: selbstberichtete Umfrage, nicht das randomisierte METR-Experiment — als Eigeneinschätzung zu lesen.
- **Zitat:** "349 technical workers self-report 1.3x ... March 2025 → 2.0x March 2026 → 2.5x March 2027 forecast"
- **Beleg im Original:** [METR self-reported AI productivity survey](https://metr.org/blog/2026-05-11-ai-usage-survey/)** — May 11: 349 technical workers self-report 1.3x value of work March 2025 → 2.0x March 2026 → 2.5x March 2027 forecast.
- **Quell-Link:** https://metr.org/blog/2026-05-11-ai-usage-survey/

## Gegenevidenz / Einschränkungen (in diesem Cluster)

- **Vertrauen sinkt trotz Adoption (Stack Overflow 2025):** 80% nutzen KI, aber Vertrauen in Genauigkeit fiel auf 29% (von ~40%), Favorability 72%→60%, 66% korrigieren "fast richtigen" Code länger. (2025-12-29, confirmed) — Gegen-Narrativ zur reinen Adoptions-Story.
- **Gemessene Minderheit verlangsamt (JetBrains HAX/ICSE 2026):** ~15% berichten gestiegene Coding-Zeit, ~10% gesunkene Code-Qualität trotz mehrheitlich positivem Bild. (confirmed; kleine Stichprobe) — gemischtes Bild.
- **ClawBench (real-world agentic eval):** SOTA nur 33,3% (Claude Sonnet 4.6 als Bester) über 153 Aufgaben auf 144 Produktiv-Websites — Sandbox-Benchmarks optimistischer als Produktionszuverlässigkeit. (Air Street, 2026-05-05, nicht einzeln verifiziert)
- **Claw-Eval-Live:** selbst mit deterministischem Grading erreicht das stärkste Modell nur 66,7% Task-Completion auf sich entwickelnden Real-World-Workflows. (arXiv:2604.28139, 2026-05-02, nicht einzeln verifiziert)
- **McKinsey "State of AI Trust 2026" (~500 Unternehmen):** durchschnittliche Responsible-AI-Reife nur 2,3/4 (von 2,0); nur ~ein Drittel erreichen Level-3 in Strategie, Governance oder Agentic-Kontrollen; Agentic-Governance-Lücke wächst. (2026-03-25, nicht einzeln verifiziert) — tempert den Reifegrad-Optimismus.
- **HN-Stimmungswende zu ROI-Skepsis:** Nolan Lawson "Using AI to write (better) code more slowly" (1.107–1.208 Pkt) argumentiert, Produktivität komme aus langsameren Review-Zyklen, nicht schnellerem Tippen; Uber-Präsident: KI-Ausgaben "harder to justify". (2026-05-25/26, confirmed)
- **Air Street/Pragmatic-Engineer (>1.000 Engineers):** Token-Ausgaben haben Capability-Skepsis als bindende Beschränkung abgelöst — Diskussion von "funktioniert es" zu "was kostet es, wenn es fast funktioniert". (2026-05-05, nicht einzeln verifiziert)
- **Schweiz "KI-Illusion":** 88% Adoption, 41% der CEOs ohne ROI — Workflow-Redesign nötig statt Copilot-Aufsatz. (Greber, 2026-05-30, confirmed)
- **"Agent-procurement is outrunning agent-deployability":** Sentiment-Gap im Stanford-AI-Index (nur 23% der US-Öffentlichkeit erwarten positiven Arbeitseffekt vs. 73% der KI-Experten — Anmerkung: "größte Lücke je gemessen" wird in der Quelle NICHT gestützt; verifizierung=number_wrong), "AI psychosis"-HN-Thread (2.061 Pkt), Halluzinations-Stories. (2026-05-16/17)
- **Salesforce-ROI-Zahlen sind vendor-eigen/unauditiert:** +79% PRs/Dev etc. sind "vendor's own figures, unaudited" (~5% weniger Incidents ist gering) — als ROI-Punkt stark, aber mit Vorsicht.
- **Per-Request-/Pauschal-Pricing bricht unter agentischen Workloads:** GitHub pausierte Individual-Signups (2026-04-22), GitHub Copilot wechselte auf AI Credits (2026-06-01), Anthropic verschiebt programmatischen Traffic ab 2026-06-15 (effektive Preiserhöhung 12–175× je nach Loop-Muster). — Reifegrad- und Kostensignal, nicht reine Gegenevidenz.
- **Empirie zu Agent-Code-Qualität:** 110.000-PR-Studie (TU Delft, arXiv:2604.00917, confirmed) zeigt höhere Code-Churn und niedrigere Survival-Rate bei agent-geschriebenem Code; SlopCodeBench (arXiv:2603.24755) misst Qualitätsverfall über lange Sessions. (Topisch im Reifegrad-Kontext relevant; primär in Risiken-/Produktivitäts-Cluster.)
- **Open vs. Closed-Lücke:** Nathan Lambert — Open-Modelle ohne "Opus-4.5-in-Claude-Code"-Agentenmoment (Lücke 12+ Monate, korrigiert von 5–6). Reife konzentriert sich auf wenige geschlossene Coding-Agenten.

## Verwendbarkeit (Hinweis für die Konsolidierung)

- **Stark belegbar:** Hohe Breiten-Adoption (90% nutzen mind. ein KI-Tool, JetBrains; 80% Stack Overflow), nahezu gesättigte Tiefen-Nutzung bei Praktikern (Pragmatic Engineer 95%/55%-Agenten), unternehmensinterne KI-Code-Anteile (Google ~75%, Snap 65%+), Enterprise-Skala (Microsoft >20M M365-Copilot-Seats, Copilot 90% Fortune 100; MCP ~97–110M Downloads). Diese Zahlen stützen ein "Marktstandard"- und Reifegrad-Narrativ.
- **Belegbar, aber mit Vorsicht zu zitieren:** Vendor-eigene ROI-Zahlen (Salesforce +79% PRs/Dev, unauditiert); Selbsteinschätzungen (METR 2,0×, selbstberichtet); Praktiker-Surveys mit Selbstselektion (Pragmatic Engineer skews heavy-user); SemiAnalysis-Projektion "20% der GitHub-Commits" (Projektion, kein Ist-Wert); benchmark-sensitive SWE-bench-/Terminal-Bench-Werte (harness-abhängig, nur direktional).
- **Vorsichtig zu behandelnde Zahlen / Korrekturen:** Stanford-AI-Index 53%-Adoption und $581,7B (source_wrong korrigiert — globale Werte erst ab 2026-05-17); Nathan-Lambert-Lücke (number_wrong: 12+ statt 5–6 Monate); MCP "10.000+ enterprise servers" (number_wrong, Einzelquelle Sreejith); 23%-vs-73%-Sentiment-Gap (number_wrong: "größte Lücke je" nicht belegt); Anthropic-Run-Rate-Zuordnung W21 vs. W22 (number_wrong). GitHub-Copilot 4,7M zahlend ist near-primary (Microsoft-Call via Sekundärquellen).
- **Dünne / einseitige Evidenz:** Reifegrad-Gegenseite (ClawBench 33,3%, Claw-Eval-Live 66,7%, McKinsey RAI 2,3/4) ist überwiegend "nicht einzeln verifiziert" — als Balance-Material verwertbar, aber nicht als harter Beweis. Schweiz-spezifische Zahlen (73% GenAI, 88% Firmen / 41% ohne ROI) sind für ein DACH-/Bank-CIO-Publikum besonders relevant und confirmed.
