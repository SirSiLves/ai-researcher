# 5-Slide Deck — „Agentic Engineering bei Raiffeisen Schweiz: warum jetzt investieren"

**Zielgruppe:** CIO / C-Level · **Ziel:** Freigabe für Investition in Tooling + dedizierte Einheit · **Ton:** kritisch, faktenbasiert, ausgewogen. Jede Zahl steht mit Quelle in den Speaker Notes. Quellenkürzel: **[U]** unabhängig · **[V]** Vendor (direktional) · **[A]** Analyst · **[R]** Regulator.

> **Designhinweis (Memory):** NICHT im Anthropic-/Claude-Look (kein warmes Papier + Rot + Serif). Nüchtern, datenlastig, bank-seriös — z.B. Raiffeisen-Anthrazit/Schwarz, eine Akzentfarbe, klare Sans-Serif, viel Whitespace, Zahlen gross.

---

## SLIDE 1 — „Die Technologie ist real geworden — aber der Nutzen ist bedingt"
**Kernbotschaft:** Weder Hype noch Verzicht. Die ehrliche Mitte.

**Linke Spalte — Es ist real (Beweispunkte):**
- **~50 %** des Google-eigenen Codes von KI-Agenten geschrieben (Engineers reviewen) — Alphabet CFO, Q4-2025-Call **[U]**
- **88–94 %** verifizierter echter GitHub-Issues lösen Top-Agenten 2026 autonom (SWE-bench Verified; Opus 4.8: 88,6 %) **[A]**
- **>2,5 Mrd. USD** Claude-Code-Run-Rate; Cognition/Devin $26 Mrd. Bewertung **[V/primär]**

**Rechte Spalte — Aber bedingt (die kritische Mitte):**
- **−19 %** — erfahrene Entwickler waren mit KI *langsamer* (METR-RCT, Goldstandard) — während sie sich **+20 %** schneller *fühlten* **[U]**
- **+34 % Durchsatz, ABER +54 % Bugs, ~3× Incidents** — „Acceleration Whiplash", 22'000 Devs (Faros) **[U]**
- Realistischer Netto-Gewinn **~10–25 %** (Gartner ~19 %) — nicht 10× **[A]**

**Take-away-Banner:** *„KI zahlt sich dort aus, wo Test-, Review- und Plattform-Disziplin schon existiert. Deshalb: zuerst Kontrollen & Team, dann Seats."*

**Speaker Notes / Quellen:**
- METR: metr.org/blog/2025-07-10… · Faros: faros.ai/blog/ai-acceleration-whiplash-takeaways · DORA 2025 („KI verstärkt, sie repariert nicht") · Alphabet CFO: cfodive.com … · SWE-bench: llm-stats.com/benchmarks/swe-bench-verified
- Wichtig mündlich: Die Wahrnehmungslücke (−19 % real vs +20 % gefühlt) ist *das* Argument für Telemetrie statt Selbstauskunft.

---

## SLIDE 2 — „Geld: Was es kostet, und ob wir Entwickler sparen"
**Kernbotschaft:** Günstig im Verhältnis zum Gehalt; Ziel ist Output/Entwickler, nicht Headcount-Abbau; Kosten sind volatil → FinOps nötig.

**Block A — Die Vergleichsrechnung (gross, visuell):**
| | Pro Entwickler/Jahr |
|---|---|
| CH-Entwicklergehalt (vollkostenbelastet) | **130–200'000 CHF** **[U]** |
| Token/Tool-Budget | **3–7'000 CHF** **[V]** |
| Gesparte Zeit (3,9 h/Wo, 400+ Firmen) → Wert | **~18'000 CHF** **[U]** |
| **Verhältnis Wert : Kosten** | **~3–6×** |

**Block B — Spart man Entwickler? (ehrlich):**
- Kurzfristig: **gleiche Headcount, mehr Output** + kleine dedizierte Einheit. Mittelfristig Skill-Mix-Verschiebung (Review/Orchestrierung), nicht primär Abbau.
- Gegensignale offen zeigen: Salesforce 0 neue Engineers FY26 **[U]** ↔ GitHub: +18 % projiziertes Dev-Jobwachstum **[V]**.

**Warnbanner:** *„Kosten sind metered & volatil — GitHub stoppte 4/2026 Copilot-Signups, Cursor-Bills sprangen 20×. Ohne Caps eskaliert es. → FinOps gehört zur Einheit."*

**Speaker Notes:** DX-ROI-Rechner (getdx.com/blog/ai-roi-calculator) · Claude-Code $150–250/Mo (schwer 800–2'000) · CH-Gehälter whatisthesalary.com · NICHT mit „wir sparen X Entwickler" pitchen — von Evidenz nicht gedeckt, METR/Faros zeigen Qualitätsschaden bei naiver Substitution.

---

## SLIDE 3 — „Nichts-tun ist das grössere Risiko: Shadow AI + Wettbewerb"
**Kernbotschaft:** Die Entwickler nutzen KI bereits. Die einzige Frage: governt über unsere Plattform oder ungovt über private Konten mit unserem Code.

**Block A — Shadow AI (das Bank-Risiko):**
- **Quellcode = #1-Datenkategorie**, die in KI-Tools abfliesst (Netskope) **[U]**
- **+670'000 USD** Mehrkosten pro Shadow-AI-Breach; **1 von 5** Breaches involviert Shadow AI (IBM 2025) **[U]**
- **~90 %** der KI-Logins über persönliche/Nicht-SSO-Konten — unsichtbar für IT (LayerX) **[U]**
- Samsung leakte Chip-Code Wochen nach Verbots-Aufhebung **[U]**

**Block B — Wettbewerb/Cost-of-Inaction:**
- McKinsey: Leader schlagen Nachzügler **2–6×** auf TSR, Lücke *wächst* — „nicht verzögern" **[A]**
- Schweizer Neobanken ~**25 %** Bevölkerungspenetration, liefern in Wochen statt Quartalen **[U]**
- ~**73 %** der CH-Bevölkerung nutzen GenAI; ~**60 %** der CH-Firmen setzen KI ein **[U]**

**Hero-Statement (zentral, gross):** *„Eine offiziell governte, FINMA-konforme Plattform ist das Gegenmittel zu Shadow AI — nicht deren Ursache."*

**Speaker Notes:** IBM newsroom 2025-07-30 · Harmonic/Netskope/LayerX Reports · McKinsey „Rewired" · UZH/gfs.bern (73 %) · UBS/Intervista (~60 % CH-Firmen). Ehrlich: das „88 %/41 %"-Paar ist KEINE saubere CH-Statistik (global+MIT-Mix) — die korrekten CH-Zahlen nutzen.

---

## SLIDE 4 — „Was Peers tun — und was es braucht (dedizierte Einheit)"
**Kernbotschaft:** Regulierte/Schweizer Akteure handeln bereits; 95 % scheitern an fehlender *fokussierter Befähigung*, nicht an Technik.

**Block A — Peer-Belege (Logos + Zahl):**
- **Goldman Sachs:** Devin als „neuer Mitarbeiter", hunderte→tausende Instanzen (CIO Argenti) **[U]**
- **UBS:** „Red" für **30'000** Mitarbeitende, **280+** Use-Cases, 1. Chief AI Officer ab 1/2026 **[V/Kunde]**
- **KPMG:** Claude für **276'000** in **138 Ländern** **[primär×2]**
- **SBB:** RAG für **30'000** (EU-gehostet) **[V]** · **BNP Paribas × Mistral** (souveräne KI) **[primär]**
- **Raiffeisen-eigener Chancenreport 2026:** **>60 %** der CH-Firmen sehen KI als Chance, 1,3 % als Risiko **[primär]**

**Block B — Warum eine dedizierte Einheit (nicht Lizenzen verteilen):**
- **95 %** der GenAI-Piloten ohne P&L-Effekt — Ursache: Integrations-Lücke. **Buy/Partner gelingt 2:1 vs Eigenbau** (MIT) **[U]**
- **Booking.com:** dediziertes Team → Adoption **<10 % → 70 %**, ~150'000 h/Jahr gespart **[V]**
- Staffing: **2–3 FTE** für 20–40 Devs, reift zu **20:1**; CH-Talentmarkt hat „Agentic AI"-Rollen bereits (CHF 120–140k) **[Benchmark]**

**Speaker Notes:** MIT NANDA via Fortune · DX/Booking.com getdx.com · Goldman cnbc.com 2025-07-11 · UBS ubs.com + ciodive.com · KPMG anthropic.com/news/anthropic-kpmg · Raiffeisen raiffeisen.ch …/chancenreport-2026.

---

## SLIDE 5 — „Empfehlung: Tools + Team, Kontrollen zuerst — der Plan"
**Kernbotschaft:** Konkreter, FINMA-konformer, messbarer Pilot mit Break-even im Jahr 1.

**Block A — Der Pilot (Q3 2026):**
- **Scope:** 20–40 Entwickler, 1 Tool (Claude Code via Bedrock/Vertex in eigener VPC, Zero-Data-Retention; CH-Datenresidenz)
- **Team:** 2–3 dedizierte Enablement-Engineers (Center of Excellence, hub-and-spoke)
- **Budget:** ~**510–630'000 CHF/Jahr** · **Break-even Jahr 1, 3–5× an der Skalierung** · Payback-Median 5,1 Mo **[eigene Kalkulation/Benchmark]**
- **Use-Cases mit belegtem ROI:** Legacy-Migrationen (10–18×), Test-Coverage, Onboarding (Time-to-PR 91→49 Tage)

**Block B — Governance ab Tag 1 (FINMA-konform):**
- Zentrales **KI-Inventar** + Risikoklassifizierung (FINMA 08/2024) **[R]**
- Allow-listed MCP · Least-Privilege · **Human-in-the-Loop** („PRs öffnen, nie mergen") · Audit-Logs · **FinOps-Caps**
- **ISO/IEC 42001** als Dach (deckt AI Act/DORA/NIS2) · die Einheit = Compliance-Vehikel

**Block C — Messen, nicht glauben:**
- Telemetrie über Selbstauskunft (METR-Wahrnehmungslücke). Durchsatz **UND** Stabilität/Incidents tracken (Faros-Lehre).

**Closing-Banner:** *„Wir holen kontrolliert auf — mit den Kontrollen, die wir für jede kundenseitige KI ohnehin brauchen. Investition in Tools UND Menschen, Governance zuerst."*

**Speaker Notes:** FINMA 08/2024 finma.ch · ISO 42001 iso.org · Claude Code Enterprise/VPC/ZDR claude.com/product/claude-code/enterprise · Pilot-Sizing aus DX-Stunden + CH-Gehältern + Plattform-Ratios (als eigene konservative Kalkulation kennzeichnen).

---

## Optionale Backup-Slides (für Q&A / Anhang)
- **B1 — Sicherheit im Detail:** Veracode ~45 % verwundbarer KI-Code · „Lethal Trifecta" (Willison) · Replit-Prod-DB-Löschung · malicious MCP · Mitigations-Stack.
- **B2 — Vendor-Vergleich/Lock-in:** Claude Code (VPC/ZDR) vs Copilot (EU+EFTA inkl. CH, +10 %) vs Cursor (kein on-prem) vs Amazon Q (US-only) vs JetBrains (air-gapped, Capability-Tradeoff). Lock-in-Belege: Anthropic→Windsurf-Cutoff, Cursor-Repricing.
- **B3 — Regulierungs-Timeline:** FINMA 08/2024 (bindend, CH) · EU AI Act Omnibus (High-Risk → Dez 2027) · PLD (9.12.2026) · Coding-Tools i.d.R. nicht high-risk (ausser Mitarbeiter-Monitoring).
- **B4 — Stimmen-Map:** Advocates (Ronacher, Beck „augmented coding", Gene Kim/Yegge, Nadella/Pichai, Argenti) · Skeptiker (METR, Faros, Veracode) · Nuanciert (Willison „lethal trifecta", Osmani „70 %-Problem", Böckeler „care about the code").
