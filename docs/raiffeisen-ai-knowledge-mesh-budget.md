---
title: "Budget-Einreichung — AI Knowledge Mesh (Raiffeisen Schweiz)"
audience: Topmanagement / CIO / Head of AI — Finanzierungs-Freigabe
date: 2026-06-19
status: Budget-Einreichung (Entwurf zur Freigabe) — Markt-Evidenz-Beleg, interne Zahlen ausstehend
method: >
  9-Block-Extraktion über das externe AI-Industrie-Korpus dieses Repos
  (data/daily 2026-03-15→2026-06-19, 97 Tagesreports · data/weekly W11–W25 ·
  data/monthly 03–05 · trends.md · papers/blogs/news/linkedin/jobs · 1502 org-Dossiers).
  Jeder belastbare Befund pro Block adversarial gegen die zitierte Quelldatei geprüft
  (119 Agenten, je Befund ein Verifizierer). ~12 Roh-Claims wurden korrigiert oder
  verworfen; die Korrekturen sind im Anhang A protokolliert.
---

# Budget-Einreichung — AI Knowledge Mesh

> **EHRLICHKEITS-KASTEN (zuerst lesen).** Dieses Korpus enthält **null Raiffeisen-interne Daten.**
> Die internen Begriffe der Stossrichtung — **Phoeniqs, Sitan, AI4C, Confluence, Data Catalog,
> «Knowledge Mesh», BankG Art. 47-Text, FINMA-Rundschreiben-Text** — liefern **0 Treffer** im2
> gesamten Repo (geprüft). Deshalb gilt durchgängig die folgende Markierung:
>
> - **`[ANNAHME]`** — vom Auftrag/Antragsteller geliefert; **nicht** aus dem Korpus belegbar
>   (alle internen Baseline-, Kosten-, Quellsystem- und Reifegrad-Aussagen über Raiffeisen).
> - **`[MARKT-PROXY]`** — der Markt/die Technologie belegt das *allgemeine* Muster mit Datei + Datum;
>   **nicht** die Raiffeisen-internen Spezifika. Das ist die **dominante** Kategorie hier.
> - **`[BELEGT]`** — direkt im Korpus mit Datei + Datum + Zitat nachweisbar (v. a. Regulatorik-Daten).
>
> **Keine** CHF-Zahl in dieser Einreichung ist gemessen; alle Nutzen-/Kosten-Zahlen sind aus
> Markt-Hebeln **modelliert** und als `[ANNAHME]` zu lesen. Was in den Block-Tabellen steht, ist
> **belastbar zitiert**; was hier als Schätzung steht, ist klar als solche gekennzeichnet.
>
> Diese Einreichung **konkurriert nicht** mit dem bestehenden Portfolio, sondern ist die
> **nutzer- und wissenszentrierte Schicht auf demselben Substrat**: sie konsumiert
> `UC-2 Raiffeisen Agent OS` (Governance-Kontrollebene), `UC-IT-0 Genossenschaftswerkbank`
> (Build-/Entwickler-Ebene) und überschneidet sich bewusst mit `UC-3 Genoss-Wissen`
> (souveräner Wissens-Backbone). Siehe `docs/raiffeisen-ai-portfolio-5-usecases.md` und
> `docs/raiffeisen-ai-it-usecases.md`. **Doppelbau ist explizit auszuschliessen.**

---

## Management-Summary (eine Seite)

**Antrag.** Freigabe eines gestaffelten Budgets für einen **AI Knowledge Mesh**: einen souveränen,
LLM-/anbieterunabhängigen Layer, über den jede Mitarbeitende über **das gesamte eigene und geteilte
institutionelle Wissen chatten/verdichten** kann (zwei Tiers: **privat/personalisiert** = eigene
Mailbox/Notizen/Chats/Files; **allgemein/geteilt** = Jira/Confluence/Shared Drives/Protokolle/
Code-Doku/Data Catalog/Architektur), gekoppelt an eine **No-Code-Agent-Plattform** (jeder User baut
eigene Agents), verdrahtet über das **A2A-Protokoll**.

**Warum jetzt — die vier tragenden Marktfakten (alle belegt):**
1. **Die Wissensschicht, nicht das Modell, ist der differenzierende Engpass.** McKinsey (Fajardo,
   2026-05-14): «Intelligence layer commoditizes; knowledge layer differentiates» — mit explizitem
   *Ownership-Prinzip* (Ontologie/Substrate enterprise-eigen und anbieter-portabel). `[MARKT-PROXY]`
2. **Souveränität ist ein operatives Kontinuitätsrisiko, kein Ideologie-Thema.** Am **2026-06-12**
   zwang eine US-Export-Control-Direktive Anthropic, Fable 5/Mythos 5 in **~90 Minuten** weltweit
   abzuschalten — erster anhaltender Staatszugriff auf ein Frontier-Modell. `[MARKT-PROXY]`
3. **Die Plumbing existiert, aber ist ungesichert.** A2A v1.0 ist stabil (150+ Orgs in Produktion,
   Linux Foundation), No-Code-Orchestrierung ist strategisch (SAP-Beteiligung an n8n, $5.2B) — doch
   **53 % der produktiven MCP-Server nutzen statische Langzeit-Secrets, nur 8.5 % OAuth.** `[MARKT-PROXY]`
4. **Adoption ohne Wissensschicht = kein ROI.** Digital Gipfel Schweiz 2026 (Greber, 2026-06-01):
   **88 % der Schweizer Firmen nutzen AI, 41 % der CEOs berichten keinen ROI** — Produktivität entsteht
   erst durch *Workflow-Redesign*, nicht durch aufgesetzte Tools. `[BELEGT]`

**Was wir vom Board hören sollten — ehrlich:** Der Raiffeisen-**interne** Nutzen, die heutige
Baseline und die Aufbaukosten sind in diesem Beleg-Korpus **nicht** enthalten. Diese Einreichung
liefert den **Markt-Beleg**, dass der Mesh eine geld-hinterlegte Wette ist, und ein **Mess-Gerüst**
für ein Pilot-Gate — sie ersetzt **nicht** die interne Baseline-Messung, die das v1-Gate liefern muss.

---

## Block 1 — Problem / Baseline

**Was uns das Fehlen heute kostet (Such-Zeit, Doppelarbeit, verlorenes institutionelles Gedächtnis):**
Eine Raiffeisen-**interne** Kostenzahl existiert im Korpus nicht und ist `[ANNAHME]` — sie muss im
Pilot gemessen werden (siehe Block 9, Gate). Was der Markt belegt:

| Befund | Status | Zahl | Quelle (Datei · Datum) |
|---|---|---|---|
| Raiffeisen-interne Such-/Doppelarbeits-/Wissensverlust-Kosten | **`[ANNAHME]`** | — | nicht im Korpus; muss im Pilot gemessen werden |
| **«Storage ≠ Memory»**: Dokumente in einem Store (Drives/Wikis/Mailboxen) sind *kein* institutionelles Gedächtnis; naive Retrieval verliert den Grossteil des beantwortbaren Wissens | `[MARKT-PROXY]` | **93 % vs 61.4 %** (LoCoMo, >30-Pkt-Lücke aus *Art des Recalls*) | `daily/…/2026-05-07.md` · 2026-05-07 (Adler & Zehavi, «Storage Is Not Memory») |
| Wissens-/Memory-Systeme **kollabieren** bei domänenübergreifender, sich entwickelnder Faktenlogik — genau das «institutionelle Gedächtnis revidieren»-Problem, das ein statisches Shared Drive nicht löst | `[MARKT-PROXY]` | **3 % Cascade / 1 % Absence** Genauigkeit | `daily/…/2026-05-14.md` · 2026-05-14 (MEME-Benchmark) |
| **Veraltetes Wissen** ist ein gemessenes Versagensmuster: Systeme revidieren überholte gespeicherte Annahmen nicht — institutionelles Gedächtnis verrottet ohne aktive Invalidierung | `[MARKT-PROXY]` | — | `trends.md` · 2026-05 (STALE Memory-Invalidation-Benchmark) |
| Fragmentiertes Retrieval = direkte Token-/Zeit-Steuer; ein *kompilierter* Wissens-Layer senkt beides | `[MARKT-PROXY]` | **bis 90 % weniger Token / 30× schneller** (Early-Access, u. a. Financial Services) | `daily/…/2026-05-21.md` · 2026-05-21 (Pinecone Nexus/KnowQL) |
| **Adoption ohne ROI** (Schweiz-Beleg): Nutzung ohne Wissens-/Workflow-Schicht erzeugt geringen realisierten Wert | **`[BELEGT]`** | **88 % nutzen AI · 41 % der CEOs kein ROI** | `daily/…/2026-06-01.md` · 2026-06-01 (Greber, Digital Gipfel Schweiz 2026) |
| Sicherheit/Governance ist der genannte **Top-Blocker** beim Skalieren von Agenten über institutionelles Wissen | `[MARKT-PROXY]` | **62 %** nennen Sicherheit als Blocker; FMTI 58→40 | `weekly/2026-W20.md` · 2026-05-17 (Stanford AI Index 2026) |

> **Baseline-Lesart fürs Board:** Der Markt quantifiziert das *Muster* des Problems (naive
> Speicherung ≠ abrufbares Wissen; veraltete Fakten; Token-Steuer; Adoption ohne ROI). Die
> *Raiffeisen-Zahl* dazu ist im Pilot mit einer Vorher-Messung (Time-to-Answer, Eskalationsrate,
> Doppelarbeit) zu erheben — **bevor** ein CHF-Nutzen behauptet wird.

---

## Block 2 — Konzept & Scope des Mesh

**Die Idee:** «über mein gesamtes Wissen chatten/verdichten» — ein per-User-Assistent über
*governter* institutioneller Kontext, plus persistente, zitierbare Wissens-Artefakte statt
Einmal-Retrieval. Der Markt hat genau diese Wette mehrfach mit Geld hinterlegt:

| Befund (Markt validiert das Konzept) | Status | Quelle (Datei · Datum) |
|---|---|---|
| **«Semantische/Kontext-Schicht, nicht Tool-Wildwuchs, ist der Engpass»** — Snowflake Cortex Sense + Microsoft Work IQ (10 generische MCP-Tools) wetten beide darauf | `[MARKT-PROXY]` | `weekly/2026-W25.md` · W25 (2026-06-15→21) |
| **Microsoft Work IQ (GA 2026-06-16)** baut ein laufend aktualisiertes *semantisches Verständnis der Organisation* aus E-Mail, Kalender, Meetings, Chats, Files, Personen und LOB-Systemen — direktes Analogon zu Privat- + Allgemein-Tier, Agenten-exponiert über MCP | `[MARKT-PROXY]` | `daily/…/2026-06-18.md` · GA 2026-06-16 |
| **Pinecone «begräbt die RAG-Ära»** (Launch Week, 2026-05-21) mit Nexus: ein *Context Compiler*, der task-spezifische, persistente, **zitierbare** Wissens-Artefakte vorbaut (KnowQL = deklarative Query-Sprache für Output-Form/Confidence/Latenz) | `[MARKT-PROXY]` | `weekly/2026-W21.md` + `trends.md` · 2026-05-21 |
| **«Own the governed data-and-context layer, not the model»** — Snowflake CoWork (Claude als Foundational Model) + ServiceNow Action Fabric, gleiche Woche, zwei Tier-1-Vendoren | `[MARKT-PROXY]` | `daily/…/2026-06-03.md` · 2026-06-03 |
| **McKinsey/QuantumBlack publizierte einen produktiven «Agentic AI Mesh»-Blueprint** zum Deployen/Governen von Agenten *«while keeping control and institutional knowledge intact»* — unabhängige Validierung von **Namen und Ziel** | `[MARKT-PROXY]` | `daily/…/2026-06-18.md` · 2026-06-18 |
| Akademischer Beleg fürs *Verdichten statt Abrufen*: «Don't Retrieve, Navigate: Distilling Enterprise Knowledge into Navigable Agent Skills» — direkte Herausforderung an Vanilla-RAG für Enterprise-KB | `[MARKT-PROXY]` | `weekly/2026-W16.md` · arXiv:2604.14572 |

**Scope — v1 vs. später (Empfehlung, abgeleitet aus Block 9-Risiken):**

- **v1 (fundierbar, 0 Mitgliederdaten):** *Allgemein-Tier* über 2–3 hochvolumige, nicht-sensible
  Wissens-Domänen (z. B. Code-/Architektur-Doku + Prozess-/Produkt-Wissen) als **read-only Chat mit
  Pflicht-Quellenzitat**; Mensch-im-Loop; deterministische Eval-Gate vor jeder Antwort. DE zuerst,
  FR/IT vorbereitet. **Begründung:** dies ist die Domäne mit dem grössten Kontinuitäts-/Bench-Wert
  bei kleinstem Regulatorik- und Datenschutz-Risiko.
- **v2 (separat gegatet):** *Privat-Tier* (eigene Mailbox/Notizen/Chats/Files) mit per-User-Scope +
  DLP (Block 6) **und** No-Code-Agent-Plattform pro User (Block 5). Beide bringen die schweren
  Datenschutz- und Memory-Staleness-Risiken in die ersten Tage — daher *nach* dem v1-Gate.
- `[ANNAHME]`: Dass Raiffeisen heute *keine* semantische Kontext-Schicht hat und die konkreten
  internen Quellsysteme (Confluence/Jira/Data Catalog) — alles antragsseitig, 0 Korpus-Treffer.
- `[ANNAHME]`: Ein spezifisches **No-Code-per-User-Agent-Builder-über-A2A-Produkt** wurde im Korpus
  *nicht* als fertiges Produkt gefunden; governte Personal-Agent-Plattformen (CoWork) und A2A als
  Protokoll sind belegt, das exakte v2-Produktbild bleibt teils Annahme.

---

## Block 3 — Quellen-Inventar

**Zwei Tiers.** Die konkreten Raiffeisen-Systeme sind `[ANNAHME]` (0 Korpus-Treffer für Confluence,
Data Catalog, Sitan, Jira-intern). Der Markt belegt aber, dass **genau diese Quellklassen** heute
über governte Konnektoren angebunden werden — d. h. das Inventar ist kein Custom-Build:

| Quellklasse | Markt-Proxy-Beleg (Konnektor existiert) | Status | Quelle · Datum |
|---|---|---|---|
| **PRIVAT** — eigene Mailbox/Kalender/Notizen/Docs/Ticketing | Snowflake Cortex Agents MCP-Konnektoren: **Gmail / Calendar / Docs / Jira / Salesforce / Slack** | `[MARKT-PROXY]` | `weekly/2026-W17.md` · 2026-04-21 |
| **PRIVAT** — eigene Files (Workspace/M365) | Claude for Small Business: native **QuickBooks/PayPal/HubSpot/Canva/DocuSign/Google Workspace/M365** | `[MARKT-PROXY]` | `weekly/2026-W20.md` · 2026-05-13 |
| **ALLGEMEIN** — Cloud-Drives/ERP/HR/IT-Systeme (Confluence/Jira/Shared Drives/Data Catalog-Äquivalent) | ServiceNow AI Control Tower: **30 Konnektoren über AWS/Azure/GCP + SAP/Oracle/Workday** — erste cross-vendor Agent-Governance-Ebene | `[MARKT-PROXY]` | `weekly/2026-W21.md` · 2026-05-19 |
| **ALLGEMEIN** — Dokumenten-/Wissensmanagement (Code-Doku/Architektur) | Anthropic Legal-Stack: **20+ MCP-Konnektoren + 12 Plugins** (iManage/NetDocuments/Harvey/Relativity/Everlaw) — Proxy fürs Anbinden von DMS/Wissenssystemen | `[MARKT-PROXY]` | `weekly/2026-W20.md` · 2026-05-12 |
| **Substrat** — MCP als de-facto Enterprise-Daten-Layer | Alle vier Hyperscaler liefern First-Party-MCP; AWS-MCP frontet **300+ Services / 15'000+ APIs** über *ein* Tool | `[MARKT-PROXY]` | `weekly/2026-W20.md` · 2026-05-15 |
| **Offener, on-prem-fähiger Multi-Source-Stack** | Mistral Search Toolkit: open-source, backend-agnostisch, Ingestion + BM25/dense/hybrid + Eval-Suite (recall/precision/MRR/NDCG), cloud/on-prem/edge, MCP-Konnektoren | `[MARKT-PROXY]` | `weekly/2026-W24.md` · 2026-06-12 |

**Weitere allgemeine Quellen, die wir ergänzen sollten** (aus dem Markt-Muster abgeleitet, `[ANNAHME]`
für die Raiffeisen-Auswahl): Meeting-Transkripte/Protokolle (Work IQ deckt genau diese Klasse),
BI-/Data-Catalog-Semantik (Snowflake Cortex Sense liefert «business meaning behind the schema»),
und die Architektur-/Doku-Bestände (analog zum Legal-DMS-Konnektor-Muster).

**Eval-/Governance-Lücke beim Multi-Source-Ingest (ehrlich zu benennen):**

- **Permission-aware Ingest:** Der kanonische *empfohlene* Enterprise-RAG-Entwurf ist ACL-Filterung
  *im Retriever/Index* mit `allowed_users/allowed_groups`-Metadaten — die Quelle warnt, dass die
  meisten Designs genau das **versäumen** (`weekly/2026-W20.md`, 2026-05-17). *(Korrektur ggü.
  Roh-Befund: ACL-im-Index ist die Best Practice, nicht der Fehler — siehe Anhang A.)*
- **Konnektor-Auth-Schuld:** Adoption von MCP-Konnektoren überholt das Härten — **53 % statische
  Secrets / 8.5 % OAuth** (Ken Priore, `weekly/2026-W21.md`, 2026-05-21). Der Mesh erbt diese Schuld.
- **Indirekte Prompt-Injection** auf ingesteten Inhalten ist eine Default-Abwehr-Kategorie geworden
  (Snowflake Cortex AI Guardrails GA, `weekly/2026-W20.md`, ~2026-05-15/16).

---

## Block 4 — Souveränität & Produktunabhängigkeit

Dies ist der **am stärksten belegte** Block.

**(a) Phoeniqs / On-Prem.** **`[ANNAHME]`** — «Phoeniqs» liefert **0 Treffer** im gesamten Korpus.
Was es konkret ist, Stand und Kapazität sind interne Fakten, die der Antrag liefern muss; aus diesem
Beleg-Korpus **nicht** ableitbar. *(Der On-Prem-Frontier-Trend selbst ist belegt — siehe unten —,
aber die Raiffeisen-Plattform-Spezifika sind Annahme.)*

**(b) LLM-/anbieterunabhängige Architektur (Modell tauschbar) — belegt als Mainstream-Strategie:**

| Befund | Status | Zahl | Quelle · Datum |
|---|---|---|---|
| **Kontinuitätsrisiko ist real:** Ein Staat kann ein Frontier-Lab zwingen, sein Flagship weltweit abzuschalten — mit ~Null Vorlauf | `[MARKT-PROXY]` | **~90 Min** Compliance-Fenster; weltweiter Pull | `daily/…/2026-06-16.md` · Order 2026-06-12 |
| Das abgeschaltete Modell war ein Frontier-SKU mit ~**3-Tage-Verfügbarkeitslebensdauer** (Fable 5: Release 06-09, Abschaltung 06-12) | `[MARKT-PROXY]` | 80.3 % vs 69.2 % SWE-Bench Pro | `daily/…/2026-06-17.md` · 2026-06-17 |
| Simon Willison instrumentierte den (staatlich angeordneten, öffentlichen) Cut-off und loggte den exakten Zeitpunkt | `[MARKT-PROXY]` | 9:59pm-ET Cut-off | `daily/…/2026-06-14.md` · Log 2026-06-13 |
| Industrie-Konsens: die Suspension ist die **Gründungs-Präzedenz** für Export-Control als lebenden Hebel auf Frontier-Modelle — direkte Konsequenz für jede These, die auf der Verfügbarkeit *eines* geschlossenen Modells beruht | `[MARKT-PROXY]` | — | `weekly/2026-W24.md` · 2026-06-13 (Lambert «AGI era of governance») |
| **Anbieterunabhängigkeit ist Mainstream-Hyperscaler-Strategie:** Microsoft baut **7 First-Party-MAI-Modelle**, um die OpenAI-Abhängigkeit zu senken | `[MARKT-PROXY]` | 7 Modelle | `daily/…/2026-06-09.md` · 2026-06-09 |
| **«Advisor-Model»-/Router-Muster** ist Enterprise-Default: günstiges Open-Modell als Default, Eskalation zum Frontier-Modell nur für harte Tasks | `[MARKT-PROXY]` | ~9× Kostenlücke ($4'811 vs $544) | `monthly/2026-05.md` · 2026-05-22 |
| **Managed Multi-Vendor-Swappable-Inference existiert** als Produkt mit EU-Style-Governance-Hooks: IBM/Red Hat AI Inference auf IBM Cloud, 5-Modell-Open-Weight-Katalog hinter OpenAI-kompatiblen APIs | `[MARKT-PROXY]` | 5-Modell-Katalog | `daily/…/2026-05-24.md` · GA 2026-05-22 |
| **On-Prem-Frontier-Deployment ist real:** Gemini 3.5, OpenAI Codex, Grok, Mistral laufen auf Dell on-prem | `[MARKT-PROXY]` | 4 Frontier-Modelle on-prem | `daily/…/2026-05-20.md` · Dell Tech World 2026-05-19 |
| **HPE Confidential Computing für agentic AI** (NVIDIA AI Factory + Vera-CPU für Orchestrierung + Confidential Computing) — Souveränitäts-Primitiv | `[MARKT-PROXY]` | — | `weekly/2026-W25.md` · ~2026-06-16 |
| **Strategie-Endorsement der These:** Regulierte EU-Banken können Souveränität *nicht* auf geschlossenen Frontier-Gewichten erfüllen — aber die **98.4 %** Produkt-Engineering-Schicht (File-Edit-Loop, Planner, MCP-Layer, Validatoren) ist genau, wo Europa auf Daten/Workflow/Trust konkurriert | `[MARKT-PROXY]` | 98.4 % | `linkedin/…/2026-05-18.md` · 2026-05-17 (Malvik) |

**(c) Apertus / Swiss-sovereign-LLM, Export-Control-Bezug (Fable/Mythos):**

| Befund | Status | Quelle · Datum |
|---|---|---|
| **Swiss-souveränes 70B-LLM ist real und aktiv:** ETH+EPFL Swiss AI Initiative trainiert **Apertus 70B** (offen) auf dem CSCS-Alps-Supercomputer (10k+ Grace-Hopper-GPUs), beidseitig hiring | `[MARKT-PROXY]` | `weekly/2026-W21.md` · W21 |
| **Swiss-souveräne Produktions-Receipts:** SBB live mit **30'000 Mitarbeitenden** auf mehrsprachigem (DE/FR/IT) RAG-Chatbot auf Mistral/SAP, Europe-only Sovereign-Cloud | `[MARKT-PROXY]` | `daily/…/2026-05-21.md` · 2026-05-21 |
| **Frontier-class ohne Commercial-Use-Steuer:** Cohere Command A+ (218B MoE/25B aktiv), läuft auf 2× H100 / 1× B200, **Apache 2.0**, $2.50/$10.00 pro M Token — souveräne/on-prem Self-Host-Option | `[MARKT-PROXY]` | `weekly/2026-W21.md` · 2026-05-23 |

> **Souveränitäts-Lesart fürs Board (ehrlich, im Hausstil):** «Daten-Residenz ≠ Inferenz-Residenz»
> und «In-Region-Azure ≠ Cloud-Act-out-of-scope». Der Mesh muss so gebaut sein, dass ein **90-Minuten-
> Ausland-Aus-Schalter degradiert, nicht bricht** — d. h. ein souveräner Open-Weight-Default-Tier (Mistral
> de-risked; **Apertus benchmark-first, nicht Launch-Abhängigkeit**) trägt den Dienst eigenständig,
> Eskalation zum Frontier-Modell ist optional und hat per Mandat einen Non-US-Fallback. Apertus ist
> ETH/EPFL-Forschungs-Track und beim Coding ~12–18 Monate hinten — als **Upgrade-Pfad** tracken,
> lasttragendes Reasoning ggf. auf Mistral Large (CH-Region), **nie auf Apertus allein**.

---

## Block 5 — Agent-Plattform

**No-Code (+ Pro-Code) Agent-Plattform, verbunden via A2A; jeder User baut personalisierte Agents.**
Das Substrat existiert im Markt — der Mesh emuliert es, statt es zu erfinden:

| Befund | Status | Zahl | Quelle · Datum |
|---|---|---|---|
| **A2A v1.0 stabil** — 150+ Orgs in Produktion, Linux-Foundation-Governance, signierte Agent-Cards, nativ in ADK/LangGraph/CrewAI/LlamaIndex/Semantic Kernel/AutoGen | `[MARKT-PROXY]` | 150+ Orgs | `weekly/2026-W20.md` · 2026-05-15 |
| A2A graduierte: GA-nativ in Bedrock AgentCore / Azure AI Foundry / Google Cloud, ein Jahr nach LF-Donation | `[MARKT-PROXY]` | 150+ Orgs | `weekly/2026-W19.md` · 2026-05-10 |
| A2A wuchs von **50 Launch-Partnern auf 150 Production-Deployer**; Gartner: 40 % der Enterprise-Apps haben bis Ende 2026 AI-Agenten (von 5 % in 2025) | `[MARKT-PROXY]` | 50→150; 40 % vs 5 % | `daily/…/2026-04-02.md` · 2026-04-02 |
| A2A ist **durables, hochfrequentes Korpus-Signal**: `a2a`-Dossier = **235 Mentions über 19 Tage** (first 05-18, last 06-17); `a2a-protocol` +20 über 13 Tage | `[MARKT-PROXY]` | 235/19 | `orgs/a2a.json` (Frequenz-Zähler) |
| **No-Code cross-framework über A2A:** Microsoft Copilot Studio Multi-Agent GA mit nativem A2A — kollaboriert mit LangGraph/CrewAI/Google-ADK-Agenten | `[MARKT-PROXY]` | — | `daily/…/2026-04-03.md` · 2026-04-03 |
| **Multi-Agent-Orchestrierung + No-Code-Builder + deterministische Kontrolle ist GA:** Salesforce Agentforce Multi-Agent Orchestration GA (06-15), + Agent Script (deterministisch) + Agentforce Builder (visuelle Canvas) | `[MARKT-PROXY]` | — | `daily/…/2026-06-17.md` · 2026-06-15 |
| **No-Code-Orchestrierung ist strategische Schicht:** SAP nahm **~$60M-Beteiligung an n8n** ($5.2B Bewertung, >2× ggü. Okt-2025), n8n-Canvas nativ in Joule Studio bis Q3 2026 | `[MARKT-PROXY]` | $5.2B; ~$60M | `daily/…/2026-06-13.md` · 2026-06-13 |
| n8n-Skala signalisiert Tragfähigkeit einer per-User-Plattform: **1'400+ Enterprise-Kunden, 1.7M MAU-Entwickler, 1'000+ Integrationen**; Mercedes-Benz separat live auf n8n | `[MARKT-PROXY]` | 1'400+/1.7M/1'000+ | `weekly/2026-W21.md` · 2026-05-19 |
| **Per-User/No-Code NL-Agent-Builder produktisiert:** Google Gemini Enterprise Agent Platform — **Agent Designer** (visueller Builder) + Inbox + Skills + Agent Identity/Registry/Gateway GA | `[MARKT-PROXY]` | 200+ Modelle | `daily/…/2026-04-22.md` · GA 2026-04-22 |
| **Azure Agent Mesh** (Preview): föderierte Multi-Agent-Kontroll-Ebene über Azure/AWS Bedrock/Google Cloud/on-prem (via Arc) unter *einer* Entra+Purview-Governance — explizit multi-cloud, GA Q4 2026 | `[MARKT-PROXY]` | — | `daily/…/2026-06-02.md` · 2026-06-02 |
| **SAP Joule Studio** = erstes ERP-Build-Runtime mit nativem MCP + A2A, interoperiert mit Copilot/Agentforce/Now Assist | `[MARKT-PROXY]` | — | `daily/…/2026-05-20.md` · 2026-05-20 |

**Beispiele, die der Markt bereits zeigt** (Antrags-Beispiele Mail-Agent / Review-Agent sind
plausibel, Raiffeisen-Umsetzung `[ANNAHME]`): Snowflake **CoWork** = «personal agent for knowledge
workers» über governten Kontext (`daily/…/2026-06-03.md`); OpenAI-Agents-SDK-«handoffs» und
A2A-Agent-Handoff sind eine benannte Produktkategorie.

> **Identitäts-Warnung (korrigiert, ehrlich):** Der *eigentlich* harte Teil einer Agent-zu-Agent-
> Plattform ist nicht der einzelne Agent, sondern der **Handoff** — das «Confused-Deputy»-Problem
> bei rekursiver Delegation, das OAuth/OIDC/SAML strukturell *nicht* lösen; Kandidaten-Stack:
> RFC 8693 Token-Exchange, SPIFFE/SPIRE, Macaroons (`daily/…/2026-06-18.md`, ein Praktiker-Post —
> **kein** Industriestandard; NIST-AI-RMF wird in dieser Quelle *nicht* genannt, siehe Anhang A).
> → Handoff-/Identitäts-Governance muss **mitbudgetiert** werden, nicht nur die Agenten.

---

## Block 6 — Governance für den privaten Tier (offensiv)

**RBAC, per-User-Daten-Scope, DLP/Redaction, «Datenschutz by construction».**

**Regulatorischer Rahmen — ehrlich getrennt nach belegt vs. Annahme:**

| Regulatorik | Status | Korpus-Beleg | Quelle · Datum |
|---|---|---|---|
| **BankG Art. 47** (Bankgeheimnis) + **FINMA-RS-Text** als bindende Basis für RBAC/per-User-Scope | **`[ANNAHME]`** | *Text* nicht im Korpus (0 Treffer) | — antragsseitig |
| **FINMA** klassifizierte Frontier-AI (Mythos-class) als **«immediate systemic risk»** fürs Banking | `[MARKT-PROXY]` | FINMA *schloss sich* BaFin/BSI/FRB/OCC/FSB an («closing the ring») | `daily/…/2026-05-21.md` · 2026-05-21 |
| FINMA ist **prinzipien-basiert**; GRC-Muster für CH-Institut: «build to the strictest regime, treat carve-outs as obligations» über US/EU/FINMA | `[MARKT-PROXY]` | «One Control Environment, Three Regulators» | `linkedin/…/2026-06-07.md` · 2026-06-07 |
| **EU AI Act — GPAI/Art.-50-Transparenz** (Modellkarten, GPAI-Labeling, synthetic-content) bindet **2026-08-02**; Watermark-Übergang bis 2026-12-02 | **`[BELEGT]`** | «Commission GPAI enforcement powers come into force Aug 2, 2026» | `daily/…/2026-05-10.md` · 2026-05-10 |
| **EU AI Act — Annex III High-Risk deferred auf 2027-12-02**, Annex I auf 2028-08-02 | **`[BELEGT]`** | «Annex III high-risk obligations move to 2 December 2027, Annex I to 2 August 2028» | `daily/…/2026-05-22.md` · 2026-05-22 |
| EU-Entwurf (Art. 6) behandelt ein **compound/multi-agent-System mit High-Risk-Zweck als *ein* High-Risk-System**, end-to-end bewertet — eine A2A-Agent-Plattform fällt wahrscheinlich als *ein* reguliertes System in Scope | `[MARKT-PROXY]` | — *(GPAI bindet 08-2026; High-Risk erst 12-2027 — nicht bündeln, s. Anhang A)* | `monthly/2026-05.md` · 2026-05-19 |

> **WICHTIGE KORREKTUR zur Bussgeld-Zahl:** Dieses Korpus belegt für die GPAI/diese Provisionen
> **«up to €15M or 3 % worldwide turnover»** (`daily/…/2026-05-17.md`). Die in früheren Briefs
> kursierende **€35M/7 %-Zahl ist hier NICHT korroboriert** — nicht als belegt zitieren (Anhang A).
> Zusatz-Beleg: EU-Enforcement ist bereits material (~€250M Bussen ausgesprochen), UK FCA/BoE ziehen
> Frontier-AI in SMCR-Style-Personenverantwortung — «AI-Governance ist jetzt ein Board-Level-Problem»
> (`daily/…/2026-05-23.md`).

**Datenschutz «by construction» — produktisierte Bausteine (Markt-Referenzen):**

| Kontrolle | Markt-Beleg | Status | Quelle · Datum |
|---|---|---|---|
| **DLP/PII-Redaction + per-User-Scope + Shared-Memory-Partitionen** | Credal.ai: Agent-Registry + A2A mit Memory-Partitionen + SOC2/HIPAA/GDPR + PII-Redaction (MongoDB/Wise/Comcast/HHS) | `[MARKT-PROXY]` | `linkedin/…/2026-05-28.md` · 2026-05-28 |
| **Retriever-enforced Access Control** (Scope *im* Retriever, nicht post-hoc) — motiviert durch realen Cross-Tenant-Leak (EchoLeak CVE-2025-32711) | `[MARKT-PROXY]` | `daily/…/2026-06-16.md` · 2026-06-16 |
| **Per-Agent-Krypto-Identität + per-Agent-RBAC + Full Audit Trails** als Daten-Plattform-Primitiv | Snowflake AI Agent Identity GA (Summit 2026) | `[MARKT-PROXY]` | `daily/…/2026-06-13.md` · 2026-06-13 |
| **MCP-Auth-Härtung** als harte Pflicht: 53 % statische Secrets / 8.5 % OAuth (Ken Priore), gegen EU-AI-Act Art. 14 «meaningful intervention» | `[MARKT-PROXY]` | `daily/…/2026-05-23.md` · 2026-05-23 |
| Unabhängige Scans: **~41 % von 5'000+ public MCP-Servern ohne Auth**; **KNOSTIC-Scan** ~2'000 Server alle ohne Auth; ~50 % statische Keys in Env-Vars; 30+ MCP-CVEs (inkl. CVSS 9.6 RCE) | `[MARKT-PROXY]` | `daily/…/2026-05-13.md` · 2026-05-13 |
| **«Right-to-be-forgotten»/Memory-Invalidation ist ein OFFENES Problem**, nicht gelöst — STALE-Benchmark (400 Szenarien): Agenten erkennen invalidierte persönliche Memories nicht → GDPR/Löschpfad explizit designen, nicht annehmen | `[MARKT-PROXY]` | `daily/…/2026-05-17.md` · 2026-05-17 |

**Schweizer Nachfrage-Beleg:** Schweizer Finanz-Arbeitgeber (PwC, McKinsey, Zürich) stellen
Responsible-AI/Governance-Rollen ein, die explizit «guardrails, data handling, access controls,
prompt-leakage prevention; FINMA/EU-AI-Act alignment» scopen (`jobs/…/2026-06-13.md`). *(Die in
einer separaten Stellen-Zeile genannte CHF-85k–145k-Bandbreite gehört NICHT zu diesen Rollen — s.
Anhang A.)*

> **Offensive Governance-Haltung:** OAuth/OIDC + per-Agent-Identität + Retriever-enforced ACL +
> DLP/Redaction **ab Gate 0** setzt uns vor 91.5 % der produktiven MCP-Server (die noch auf statischen
> Secrets laufen) — genau der Befund, nach dem ein FINMA-Exam greift. Privat-Tier-Datenschutz wird so
> zur *Konstruktionseigenschaft*, nicht zum nachträglichen Kontroll-Aufsatz.

---

## Block 7 — Kosten / FinOps

**Raiffeisen-Aufbaukosten (Engineering-FTEs, Infra-Capex, GPU/Cloud, Integration, Plattform-Lizenzen)
sind `[ANNAHME]` — aus diesem Korpus NICHT ableitbar; keine erfundene CHF-Zahl.** Was der Markt als
**TCO-Variablen** und Kostenhebel liefert (das ist der Wert dieses Blocks):

| Kostenhebel / Variable | Status | Zahl | Quelle · Datum |
|---|---|---|---|
| **Inferenz-Kostenspreizung Frontier vs Open ≈ 9×** — Standard-Workload $4'811 (Claude) vs $544 (Zhipu GLM); ChatGPT $3'357, DeepSeek $1'071, Kimi $948 | `[MARKT-PROXY]` | ~9× | `weekly/2026-W21.md` · 2026-05-20 (Artificial Analysis) |
| **«Advisor-Model»-Architektur** ist Default — günstiges Open-Modell default, Frontier nur für harte Tasks; Referenz für die Kosten-Kontroll-Schicht | `[MARKT-PROXY]` | — | `monthly/2026-05.md` · 2026-05-31 |
| **Flatrate-AI-Abo ist tot:** GitHub Copilot auf metered «AI Credits» (1 Credit = $0.01), agentic Sessions nach Verbrauch | `[MARKT-PROXY]` | $0.01/Credit | `daily/…/2026-06-01.md` · 2026-06-01 |
| **Anthropic Pricing-Reset (06-15):** Split in flat interactive Pool + metered Agent-Pool — beendet die versteckte Subvention günstiger Agenten; «ändert direkt, wie Teams Multi-Modell-Stacks bauen» | `[MARKT-PROXY]` | — | `daily/…/2026-06-16.md` · 2026-06-15 |
| **Per-User-Budget-Hüllen sind real:** Uber capped agentic-coding-Spend auf **$1'500/Monat pro Tool** | `[MARKT-PROXY]` | $1'500/Mt **pro Tool** | `daily/…/2026-06-06.md` · 2026-06-03 |
| **Pay-per-Operation-Gateways:** ServiceNow (Action Fabric)/SAP/Workday metern externen Agent-Zugriff auf Systems-of-Record — per-Seat-Pricing erodiert; Run-Cost muss diese Tolls budgetieren | `[MARKT-PROXY]` | — | `weekly/2026-W25.md` · ~2026-06-17/18 |
| **Open-Weight-Kostenboden:** GLM-5.2 top der Open-Weights-Leaderboard nahe Opus-4.7-Qualität; Qwen 3.6/Gemma auf 128GB-Macs handhaben ~90 % des täglichen Codings lokal | `[MARKT-PROXY]` | ~90 % lokal | `weekly/2026-W25.md` · W25 |
| **Cache-Hit-Pricing als Hebel:** DeepSeek macht 75 %-Rabatt permanent (Cache-Hit = 1/10 Launch-Preis); ein Praktiker: 39.1M Cache-Hits vs 1.7M Misses → ~Grössenordnung Einsparung | `[MARKT-PROXY]` | 1/10; 39.1M/1.7M | `weekly/2026-W21.md` · 2026-05-24 |
| **Vendor-Lock-in = quantifiziertes Risiko:** OpenRouter-Anteil chinesischer Modelle ~1 % (2024) → >60 % (Mai 2026); Anthropic räumt selbst nur «several months ahead» ein | `[MARKT-PROXY]` | ~1 %→>60 % | `trends.md` · 2026-05-22 |

**Kostenmodell-Empfehlung (`[ANNAHME]`, aus Markt-Hebeln modelliert):** Der Mesh-Run-Cost ist als
**usage-based, nicht seat-based** zu planen; eine **LLM-agnostische Router-/Kosten-Kontroll-Schicht**
mit per-User/per-Initiative-Token-Budgets, Cost-per-Task-Telemetrie und Open-Weight-Default-Tier
adressiert die ~9×-Spreizung und die metered-Gateway-Tolls direkt. **Die absolute CHF-Aufbau-/Betriebs-
Zahl muss intern (FinOps + Infra) beziffert werden — sie steht bewusst nicht hier.**

---

## Block 8 — Nutzen / ROI

**Raiffeisen-spezifischer ROI = `[ANNAHME]`** (keine interne Baseline im Korpus). **Verteidigbare
Markt-Anker** (klar getrennt: auditiert vs. vendor-claimed):

| Anker | Status | Zahl | Quelle · Datum |
|---|---|---|---|
| **AUDITIERT — sauberster Anker:** Salesforce Agentforce **$1.2B ARR, +205 % YoY** (Q1-FY27-Earnings-Print, 28.6T Token) — erster klarer Tier-1-SaaS-Punkt über $1B-ARR; **zitieren** (GAAP-Earnings-Line) | `[MARKT-PROXY]` | $1.2B / +205 % | `weekly/2026-W22.md` · 2026-05-27 |
| **Wissens-Layer-Effizienz (vendor-claimed):** Pinecone Nexus Early-Access (Financial Services/Healthcare/Legal) — **bis 90 % weniger Token, 30× schneller** | `[MARKT-PROXY]` | bis 90 % / 30× | `weekly/2026-W21.md` · 2026-05-21 |
| **Trusted-Context-Genauigkeit (Praktiker zitiert Anthropic):** ~21 % Analytics-Genauigkeit ohne kuratierten Kontext vs **>95 %** mit — Kern-Begründung, in die Wissens-/Kontext-Schicht zu investieren statt nur ins Modell | `[MARKT-PROXY]` | ~21 %→>95 % | `daily/…/2026-06-17.md` · 2026-06-17 (Eric Du) |
| **Forschungs-Anker (akademisch):** ObjectGraph — typed knowledge-graph-Fileformat, **bis 95.3 % weniger Token** bei Parität-Genauigkeit vs Dokument-Injektion | `[MARKT-PROXY]` | bis 95.3 % | `weekly/2026-W18.md` · arXiv:2604.27820 |
| **Coding-Produktivitäts-Proxy (vendor-disclosed):** Google — ~75 % des neuen Codes AI-generiert (engineer-reviewed); interne Migration 6× schneller mit Agenten | `[MARKT-PROXY]` | ~75 % / 6× | `daily/…/2026-04-21.md` · 2026-04-21 (Pichai) |
| **Schweizer Vergleichs-Deployment:** SBB 30'000 MA, mehrsprachiger (DE/FR/IT) Wissens-Chat — Machbarkeits-Beleg fürs «über institutionelles Wissen chatten»-Tier, **kein** ROI | `[MARKT-PROXY]` | 30'000 | `daily/…/2026-05-21.md` · 2026-05-21 |
| **Adoptions-Momentum (Nachfrage-Validierung):** Ramp AI Index — Anthropic 34.4 % überholt OpenAI 32.3 % (erste Führungswechsel); stützt LLM-agnostische Haltung | `[MARKT-PROXY]` | 34.4 % vs 32.3 % | `daily/…/2026-05-16.md` · 2026-05-16 |
| **Kosten-Rückenwind:** Frontier wird billig-und-schnell (Gemini 3.5 Flash GA ~1/3 Peer-Kosten; DeepSeek 75 %-off permanent) — fallende Token-Kosten verstärken jeden Token-Reduktions-Nutzen | `[MARKT-PROXY]` | ~1/3 | `weekly/2026-W22.md` · 2026-05-31 |

> **NICHT als ROI zitieren (explizit, fürs Board):** die Salesforce-**internen** Claude-Code-Zahlen
> (**+79 % PRs/Entwickler**, ~5 % weniger Incidents, 231→13 Personentage / ~18× API-Migration) — das
> Korpus selbst kennzeichnet sie als **vendor-reported und UNAUDITED** (`monthly/2026-05.md`). Nur als
> Richtungs-Farbe, nie als verteidigbarer quantifizierter Nutzen.

> **EHRLICHES GEGENGEWICHT (für Glaubwürdigkeit zwingend):** Digital Gipfel Schweiz 2026 — **88 %
> Adoption, 41 % kein ROI**; Produktivität nur durch **Workflow-Redesign**, nicht durch aufgesetzte
> Tools (`daily/…/2026-06-01.md`). Der Mesh-ROI ist **konditional**: Budget so scopen, dass es
> Workflow-Redesign + Messung finanziert, nicht nur Tooling.

---

## Block 9 — Reifegrad & Risiken

**Was heute existiert (PoC/Pilot/Komponenten/Vendor-Evaluationen) — Markt vs. Raiffeisen:**
Raiffeisens *eigener* Reifegrad (existierende PoCs, Vendor-Evals, interne Komponenten) ist
**`[ANNAHME]`** — 0 Korpus-Treffer. Marktseitig sind die Bausteine reif bis GA (A2A v1.0, n8n/Joule,
Agentforce, MCP-Konnektoren, souveräne Inferenz, DLP/Identity — alle oben belegt). Die **Risiken**,
ehrlich benannt:

| Risiko | Status | Zahl | Quelle · Datum |
|---|---|---|---|
| **Technisch — Eval-Gap:** Best-in-class-Agenten bestehen nur einen Bruchteil realer Produktions-Tasks; Engpass verschob sich von Modell-Capability zu Enterprise-Rollout → **assistiert/Mensch-im-Loop scopen, nicht autonom** | `[MARKT-PROXY]` | **33.3 %** von 153 Web-Tasks (ClawBench); LifeSciBench best 36.1 % | `weekly/2026-W19.md` · 2026-05-05 |
| **Technisch — Robustheit:** kontaminations-resistente Benchmarks legen grosse Capability-Lücke offen (DeFAb 65 %→23.5 % unter robuster Eval) → internes Eval *vor* Vertrauen auf Bank-Wissen | `[MARKT-PROXY]` | 65 %→23.5 % | `weekly/2026-W25.md` · 2026-06-19 |
| **Technisch — Multi-Agent brittle:** die meisten Produktionsfehler sind **Koordinations-Defekte**, nicht Modellqualität; Single-Agent matched Multi-Agent bei gleichem Token-Budget → **single-agent starten**, Koordination als separierbare governte Schicht | `[MARKT-PROXY]` | **41–87 %** der MAS-Fehler = Koordination | `weekly/2026-W20.md` · 2026-05-06/14 *(Datum korr., s. Anhang A)* |
| **Technisch — Debatte schadet:** mehr Agenten/Debatte degradieren Output («critique-induced confusion») | `[MARKT-PROXY]` | −1.6 bis −15.5pp | `weekly/2026-W23.md` · W23 (2026-06-01→07) |
| **Technisch — RAG bricht:** klassisches top-k-Vektor-RAG (der naheliegende erste Build) bricht unter Langläufer-Agent-Traffic; Feld re-architektiert Richtung Context-Engineering → **Retrieval-Schicht ist Design-Risiko, keine gelöste Commodity** | `[MARKT-PROXY]` | 62 % vs 31 % top-1 (Self-Aware Embeddings) | `weekly/2026-W24.md` · 2026-06-14 |
| **Technisch — Memory unzuverlässig:** Memory-Layer (z. B. Mem0) verletzen **57.5 %** der Preference-Checks; «recall ≠ compliance» → Privat-Tier-Memory braucht explizite Decay/Validierungs-Governance | `[MARKT-PROXY]` | 57.5 % | `weekly/2026-W24.md` · 2026-06-14 (TRACE) |
| **Supply-Chain:** Credential-Stealer verbreiten sich in Minuten — LiteLLM 1.82.7/8 (base64-.pth-Stealer): **46'996 Downloads in 46 Min**, 88 % der Dependents un-pinned | `[MARKT-PROXY]` | 46'996/46 Min | `monthly/2026-03.md` · 2026-03-24 |
| **Supply-Chain:** AI-Vuln-Discovery überholt Patch-Kapazität — Glasswing: **10'000+ critical/high Vulns über 1'000+ OSS-Projekte in ~30 Tagen** → Dependency-Backlog als stehendes Op-Risiko | `[MARKT-PROXY]` | 10'000+/1'000+/30d | `monthly/2026-05.md` · 2026-05-31 |
| **Vendor-Verfügbarkeit:** staatliche Suspension eines Frontier-Flagships (06-13) ist das stärkste Einzel-Argument für LLM-agnostisches, souveränes, tauschbares Design *(NICHT zusätzlich «IDE-bait-and-switch/cancelled tooling» behaupten — nicht belegt, s. Anhang A)* | `[MARKT-PROXY]` | — | `weekly/2026-W24.md` · 2026-06-13 |
| **Vendor-Lock-in (jenseits Suspension):** Vendoren deprecaten/ersetzen Produkte ohne saubere Migration; Grosskunden kündigen über Pricing (Antigravity-Auto-Update; MS cancelt interne Claude-Code-Lizenzen trotz Dev-Präferenz) | `[MARKT-PROXY]` | — | `weekly/2026-W21.md` · 2026-05-22 |
| **Regulatorisch:** EU-Entwurf behandelt Multi-Agent-System mit High-Risk-Zweck als *ein* reguliertes System; **GPAI bindet 2026-08-02**, High-Risk (Annex III) erst **2027-12-02** | `[MARKT-PROXY]`/`[BELEGT]` | — | `monthly/2026-05.md` · 2026-05-19 |
| **Regulatorisch:** FINMA hat Frontier-AI-Capability als systemisches Risiko klassifiziert — Swiss-Regulator-Anker fürs souveräne, governte Design | `[MARKT-PROXY]` | — | `daily/…/2026-05-21.md` · 2026-05-21 |

**Abhängigkeiten (zwingend, vor Doppelbau):** Der Mesh **konsumiert** `UC-2 Agent OS`
(Governance/Runtime/Identity-Issuer), `UC-IT-0 Genossenschaftswerkbank` (Build-Plane/Scaffold) und
überschneidet sich mit `UC-3 Genoss-Wissen` (souveräner Wissens-Backbone). Identity-Issuing,
Eval-Runtime, Inference-Gateway und Dossier-System-of-Record liegen dort — **nicht** im Mesh
nachbauen.

---

## Erste 90 Tage (fundierbares Gate) & 12-Monats-Bogen

**Erste 90 Tage — single-Domain, contained blast radius, 0 Mitgliederdaten:**
- **Tag 0–30:** v1-Allgemein-Tier-Chat über 2 nicht-sensible Wissens-Domänen (DE) auf souveränem
  Default-Tier; **OAuth/OIDC + Retriever-enforced ACL + Zero-Static-Secrets + read-only Scope ab Gate 0**;
  **Baseline messen** (Time-to-Answer, Eskalations-/Doppelarbeits-Rate) — das ist Block-1-`[ANNAHME]`
  → gemessene Zahl.
- **Tag 30–60:** 30–50 User live; Article-50-Transparenz-Pack; deterministische Eval-Gate;
  ISO-42001-Org-Track öffnen.
- **Tag 60–90:** Deflection + zurückgewonnene Stunden vs Baseline messen; Red-Team auf vergiftete
  Quell-Docs (Leak-Rate-Schwelle); **dokumentierter Modell-Swap-/Kontinuitäts-Drill** (Eskalations-
  Tier abschalten, beweisen dass souveräner Default weiterträgt — der Fable-5-Test); Board-Pack mit
  gemessenem KPI-Delta, per-Query-TCO auf realer Kohorte, Non-High-Risk-Scoping-Memo für FINMA.

**12-Monats-Bogen:** v2 (Privat-Tier + No-Code-Agent-Plattform) als **separat gegatete** Phase mit
per-User-DLP, Memory-Decay/Löschpfad und Handoff-Identitäts-Governance — *nach* dem v1-Gate.

---

## Anhang A — Korrektur-Register (adversariale Verifikation)

Jeder belastbare Befund wurde gegen seine Quelldatei geprüft. Die folgenden Roh-Claims wurden
**korrigiert oder verworfen** — sie stehen hier, damit das Board sieht, was *nicht* behauptet wird:

1. **Bussgeld €35M/7 %** → **verworfen als unbelegt.** Korpus belegt **€15M/3 %** für diese
   GPAI-Provisionen (`daily/…/2026-05-17.md`). Nicht als belegt zitieren.
2. **FINMA «highest-jurisdiction»** → **korrigiert.** FINMA *schloss sich als letzte* der bestehenden
   Gruppe (BaFin/BSI/FRB/OCC/FSB) an («closing the ring»), war nicht «höchste Instanz».
3. **GPAI + High-Risk binden beide 2026-08-02** → **korrigiert.** Nur **GPAI** bindet 08-2026;
   **Annex-III-High-Risk erst 2027-12-02**, Annex I 2028-08-02. Nicht bündeln.
4. **Uber-Cap «$1'500/Engineer»** → **korrigiert** auf **$1'500/Monat pro *Tool***
   (`daily/…/2026-06-06.md`). «Local-inference-break-even» war in der Datei nicht belegt.
5. **MCP-Zero-Auth ~2'000-Server-Scan «AIP-Paper»** → **korrigiert:** Quelle ist **KNOSTIC**
   (`daily/…/2026-05-13.md`). Separat: «97M SDK-Downloads / 10k+ Server» stehen *nicht* in der
   05-23-Datei — aus jenem Zitat entfernt (in W21/05-21 hingegen belegt).
6. **«Snowflake+Dataiku Cobuild» + «Mistral Le Chat Enterprise Agent-Builder»** → **verworfen**
   (nicht in der zitierten Datei). Nur **Google Gemini Agent Designer** bleibt (`daily/…/2026-04-22.md`).
7. **«Azure Agent Mesh + Agentforce» als GA-Bündel aus 05-23** → **verworfen** (REFUTED): in jener
   Datei nur IBM watsonx Orchestrate, und nur **Private Preview**. Azure Agent Mesh separat aus
   seiner eigenen belegten Datei zitiert (`daily/…/2026-06-02.md`, Preview, GA Q4).
8. **ACL-im-Index als «der Fehler» + «Privat/Allgemein-Tier-Fusion in einem Index»** → **korrigiert:**
   ACL-im-Retriever/Index ist die *empfohlene* Best Practice; die «Tier-Fusion in einem Index»-Story
   steht nicht in der Quelle (`weekly/2026-W20.md`).
9. **Willison «eigener Zugriff mid-session widerrufen»** → **korrigiert:** es war eine *staatlich
   angeordnete, öffentliche* Suspension von Fable 5/Mythos 5, die Willison loggte — keine persönliche
   Mid-Session-Sperre.
10. **Handoff-Stack «OpenAI-Agents-SDK first-class primitive» + «NIST AI RMF»** → **korrigiert:**
    ein einzelner Praktiker-Post (Binod Kumar), kein Industriestandard; dritter Stack-Baustein ist
    **Macaroons**, nicht NIST AI RMF (`daily/…/2026-06-18.md`).
11. **Multi-Agent-Koordinations-Paper «2026-05-16»** → **Datum korrigiert** auf 2026-05-06/14 (bzw.
    W20-Weekly). Zahl 41–87 % unverändert belegt.
12. **«+79 % PRs/dev»-Klasse** → als **DO-NOT-CITE**-Gegenbeispiel geführt (vendor-unaudited).
13. **Snowflake Cortex Sense «2026-06-03/06-17»-Spanne** + **Pinecone-Nexus-RBAC-Pillar** + **Pay-per-
    operation «2026-06-21»** → kleinere Datums-/Bündel-Korrekturen; Kern-Snippets bleiben belegt.

## Anhang B — Methode & Geltungsbereich (Ehrlichkeit)

- **Beleg-Basis:** externes AI-Industrie-Korpus dieses Repos (97 Tagesreports 2026-03-15→06-19,
  W11–W25 weekly, 03–05 monthly, trends.md, papers/blogs/news/linkedin/jobs, 1502 org-Dossiers).
- **Verifikation:** 119 Agenten; je Befund ein adversarialer Verifizierer gegen die zitierte Datei
  (CONFIRMED/CORRECTED/REFUTED). Alle CORRECTED/REFUTED-Verdikte sind in Anhang A umgesetzt.
- **Was dieser Beleg NICHT ist:** Er enthält **keine** Raiffeisen-internen Daten. Baseline-Kosten
  (Block 1), Quellsystem-Spezifika (Block 3), Phoeniqs/On-Prem-Stand (Block 4), regulatorische
  *Texte* (Block 6), Aufbaukosten (Block 7) und der eigene Reifegrad (Block 9) sind durchgängig
  `[ANNAHME]` und müssen intern erhoben werden — primär im 90-Tage-Pilot-Gate.
- **Frequenz-Zähler** (z. B. A2A 235/19 Tage) sind reale Counts über org-Dossiers/Reports — das
  auditierbare Markt-Analogon zu «Häufigkeit», **nicht** interne Thread-Counts.
