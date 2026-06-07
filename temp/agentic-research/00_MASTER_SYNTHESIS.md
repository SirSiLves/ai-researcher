# Agentic Coding / Agentic Engineering — Kritische Entscheidungsgrundlage für den CIO Raiffeisen Schweiz

**Erstellt:** 2026-06-04 · **Zweck:** C-Level-Entscheidung über Investition in Agentic-Coding-Tooling UND in eine dedizierte, fokussierte Personeneinheit · **Anspruch:** Fakten, harte Zahlen, echte Ergebnisse, kritisch und ausgewogen (Pro UND Contra). Jede Aussage ist mit Quelle hinterlegt.

> **Methodik & Vertrauen:** Diese Synthese beruht auf 4 Recherche-Wellen (19 Dimensionen + Tiefenlektüre von 55 Primärquellen + Verifikation der Schweiz-/Banking-Stränge) mit jeweils einem adversariellen Faktencheck, plus dem internen `/data`-Korpus des AI Researchers. **Konvention:** Jede Zahl ist als **[unabhängig]**, **[Vendor]** oder **[Analyst]** markiert. Vendor-Zahlen sind direktional, nicht auditiert. Stand: Juni 2026 — ältere (vor-2025) Quellen wurden bewusst ausgeschlossen, da sich das Feld seit 2025 fundamental verändert hat (Autocomplete → autonome Agenten).

---

## 0. Das Kernnarrativ in 5 Sätzen

1. **Die Technologie ist real und reif geworden:** Frontier-Coding-Agenten lösen 2026 ~88–94 % verifizierter echter GitHub-Issues autonom (SWE-bench Verified), Alphabets CFO sagt „**rund die Hälfte** des Google-Codes" werde von Agenten geschrieben (von Engineers reviewt), Claude Code allein hat **>2,5 Mrd. USD** Run-Rate. **[unabhängig/Vendor-primär]**
2. **Aber der Nutzen ist bedingt, nicht automatisch:** Die methodisch sauberste unabhängige Studie (METR-RCT) fand erfahrene Entwickler **19 % langsamer** mit KI — während sie sich 20 % schneller *fühlten*. Telemetrie über 22'000 Entwickler (Faros) zeigt **+34 % Durchsatz, aber +54 % Bugs und ~3× Produktions-Incidents** („Acceleration Whiplash"). **[unabhängig]**
3. **Nichts-tun ist keine sichere Option:** ~73 % der Schweizer Bevölkerung nutzen GenAI, ~60 % der Schweizer Firmen setzen KI ein — Entwickler nutzen KI ohnehin, nur eben unkontrolliert (**Shadow AI**: Quellcode ist die häufigste Datenkategorie, die in KI-Tools abfliesst; Shadow-AI-Breaches kosten **+670'000 USD** mehr). Eine **offiziell governte Plattform ist das Gegenmittel zu Shadow AI**, nicht deren Ursache. **[unabhängig]**
4. **Geld:** Token-/Seat-Kosten liegen bei ~150–250 USD/Entwickler/Monat (Claude Code, schwere Nutzung 800–2'000 USD), also grössenordnungsmässig **3–7'000 CHF/Entwickler/Jahr** — gegenüber vollkostenbelasteten Schweizer Entwicklergehältern von **130'000–200'000 CHF**. Selbst konservativ (3 h/Woche gespart) übersteigt der Zeitwert die Tool-Kosten um das 3–6-fache. Aber: ~95 % der GenAI-Piloten liefern keinen messbaren P&L-Effekt — der Unterschied ist **fokussierte Befähigung, nicht Lizenzverteilung**. **[unabhängig + Vendor]**
5. **Deshalb die Doppelinvestition:** Tools **und** eine dedizierte Einheit (Center of Excellence / Plattformteam), die Governance, Evals, Guardrails, FINMA-konforme Kontrollen und Befähigung besitzt — genau das, was MIT (95 %-Scheiternsquote), DORA („KI verstärkt, sie repariert nicht") und FINMA (zentrales KI-Inventar, Modellrisiko, Verantwortlichkeit) verlangen.

---

## 1. ROI & Produktivität — was die Evidenz *wirklich* sagt

### Die ausgewogene Wahrheit (für C-Level zwichtig: weder „10×" noch „nutzlos")
- **Systemebene-Gewinn realistisch ~10–25 %**, nicht 2–10×. Gartner beziffert den Netto-Produktivitätsgewinn unabhängig auf **~19 %** — exakt in diesem Band. **[Analyst]**
- **METR-RCT (Goldstandard, Juli 2025):** 16 erfahrene OSS-Entwickler, 246 echte Tasks auf reifen Repos → **+19 % Bearbeitungszeit (langsamer)** mit KI; Prognose war −24 %, gefühlt −20 % → **~39-Punkte-Wahrnehmungslücke**. Die METR-Nachfolge (Feb 2026) kehrte das *nicht* sauber um (−18 %/−4 %, Konfidenzintervalle über Null), METR selbst nennt die Evidenz „nur sehr schwach" — lehnt aber leicht ins Positive für 2026-Modelle. **[unabhängig]** → `https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/`
- **Faros-Telemetrie (April 2026, 22'000 Entwickler, 2 J. Pipeline-Daten — keine Umfrage):** Durchsatz/Entwickler **+33,7 %**, Epics **+66 %** — ABER Bugs **+54 %**, Incidents/PR **+242,7 % (~3×)**, Code-Churn **+861 %**, PRs ohne Review gemerged **+31,3 %**, Review-Zeit **+441,5 %**. Das ist der **„Acceleration Whiplash"** und die wichtigste einzelne Erkenntnis für eine Bank: Mehr Output wandert flussabwärts in mehr Bugs, Incidents und Review-Schuld — *ausser die Kontrollen existieren zuerst*. **[unabhängig, aber Vendor-autored — Faros verkauft Engineering-Intelligence]** → `https://www.faros.ai/blog/ai-acceleration-whiplash-takeaways`
- **DORA 2025 (Google, ~5'000 Profis):** Kehrt die eigene negative 2024-Erkenntnis um — KI jetzt *positiv* mit Durchsatz verknüpft, **90 %** Adoption, **>80 %** berichten Produktivitätsgewinne. ABER: **negativer** Zusammenhang mit Liefer-*Stabilität* bleibt; nur **24 %** vertrauen KI „stark". Kernframing: **„KI repariert ein Team nicht; sie verstärkt, was schon da ist."** **[unabhängig]** → `https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report`
- **Amdahl-Decke:** Code-Schreiben ist nur **25–35 % des SDLC** → selbst 100 % Coding-Speedup deckelt Systemgewinn bei ~15–25 %; der Engpass wandert zu Review/Requirements/Deployment. **[Analyst — als Analyst-Synthese kennzeichnen, NICHT als Bain-Faktum; Skeptiker-Korrektur W1]**
- **Stack Overflow 2025 (~49'000 Devs):** Nutzung steigt auf **84 %**, aber Gunst *fällt* (~70 %→60 %), nur ~3 % „vertrauen stark". Praktiker selbst sehen die Lücke. **[unabhängig]**

### Wo der Nutzen am stärksten/realsten ist (die ROI-Zone)
Migrationen & Refactors (Devin: **10–14× schneller** [Vendor]), Test-Coverage-Lift (50–60 %→80–90 % [Vendor]), Onboarding (Time-to-10th-PR **91→49 Tage** [Vendor/DX]), Verständnis fremder Legacy-Codebasen (Stunden statt Wochen). Salesforce: 231-Personentage-Migration in **13 Tagen (~18×)** [Vendor, nicht extern auditiert].

**→ Slide-tauglicher Satz:** *„Unabhängig gemessen liegt der realistische Netto-Gewinn bei ~10–25 % — nicht 10×. Der rohe Coding-Durchsatz steigt 30–65 %, aber dieser Überschuss wandert ohne Kontrollen in mehr Bugs (+54 %) und Incidents (~3×). KI zahlt sich dort aus, wo starke Test-, Review- und Plattform-Disziplin bereits existieren — deshalb investieren wir zuerst in Kontrollen und ein Team, dann in Seats."*

---

## 2. Token-Ökonomie & Geld — was kostet es, spart man Entwickler?

### Die Kostenseite
- **Pro Entwickler:** ~**150–250 USD/Monat** (Claude Code Enterprise-Daten); schwere agentische Nutzung **800–2'000+ USD/Monat**. Agentische Workloads verbrauchen **5–20× mehr Tokens** als Autocomplete. **[Vendor/Praktiker]**
- **Volatilität ist real:** GitHub pausierte im April 2026 neue Copilot-Anmeldungen, weil agentische Compute-Kosten den Planpreis routinemässig übersteigen; Cursor-Repricing 2025 trieb Effektivkosten **20×+** hoch. → **Kostenkontrolle/Caps sind Pflicht, nicht optional.** **[unabhängig — TechCrunch]**
- **Datenresidenz-Aufschlag:** GitHub Copilot EU+EFTA-Datenresidenz deckt seit **1. Mai 2026 die Schweiz** ab — aber **+10 %** Modell-Multiplikator und Gemini fällt weg. **[Vendor-primär — GitHub Changelog]**

### Die Vergleichsrechnung (der CIO-Kern)
| Posten | Wert |
|---|---|
| Vollkostenbelastetes CH-Entwicklergehalt | **130'000–200'000 CHF/Jahr** (Senior) [unabhängig] |
| Tool-/Token-Budget pro Entwickler | ~**3'000–7'000 CHF/Jahr** [Vendor] |
| Konservativ gesparte Zeit (DX-Panel, 400+ Firmen) | **3,9 h/Woche** ≈ 180 h/Jahr [unabhängig] |
| Zeitwert bei ~100 CHF/h vollkostenbelastet | ~**18'000 CHF/Entwickler/Jahr** |
| **Brutto-Verhältnis Wert : Toolkosten** | **~3–6×** (vor Ramp/Qualität) |

### Spart man Entwickler oder braucht man mehr? (Jevons-Paradox)
- **Big-Tech-Signal gemischt:** Salesforce stellte FY2026 *keine* neuen Engineers ein (KI-begründet); Junior-Rollen komprimieren. **[unabhängig]** ABER: Thomas Dohmke (GitHub) verweist auf **+18 % projiziertes US-Entwickler-Jobwachstum**; die Rolle verschiebt sich von „Code schreiben" zu „Delegieren & Verifizieren". **[Vendor/advocate]**
- **Ehrliche C-Level-Antwort:** Kurzfristig **gleiche Headcount, mehr Output** (plus eine kleine *dedizierte* Einheit obendrauf). Mittelfristig: Verschiebung des Skill-Mix (mehr Review/Orchestrierung, weniger reines Tippen), nicht primär Stellenabbau. Wer mit „wir sparen X Entwickler" pitcht, wird von der Evidenz nicht gedeckt — und METR/Faros zeigen, dass naive Substitution Qualität zerstört.

**→ Slide-tauglicher Satz:** *„Token kosten ~3–7'000 CHF/Entwickler/Jahr gegenüber 130–200'000 CHF Gehalt. Selbst konservativ ist das Verhältnis 3–6×. Das Ziel ist nicht ‚weniger Entwickler', sondern mehr Wertschöpfung pro Entwickler — plus eine kleine dedizierte Einheit. Aber Kosten sind metered und volatil: ohne FinOps-Caps eskalieren sie."*

---

## 3. Entwickler-Headcount, Transformation & die dedizierte Einheit

### Warum eine *fokussierte* Einheit, nicht Lizenz-Verteilung
- **MIT NANDA „GenAI Divide" (Aug 2025):** **~95 %** der Enterprise-GenAI-Piloten liefern keinen messbaren P&L-Effekt. Ursache ist die *Lern-/Integrationslücke*, nicht Modellqualität. **Buy-/Partner-Ansatz gelingt ~67 %**, interne Eigenbauten nur ~1/3 so oft. → Die dedizierte Einheit IST die 5-%-Erfolgsstrategie; sie soll **Vendor-Tools befähigen/governen, nicht eine Eigenplattform bauen**. **[unabhängig]** → `https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/`
- **Booking.com (Beleg):** Ein dediziertes Enablement-Team (Office Hours, Training, Segmentierung) hob die Adoption von **<10 % auf ~70 %** über 3'000+ Entwickler und sparte **~150'000 h/Jahr**. Tools allein blieben bei <10 %. **[Vendor/DX]**
- **DX Q4 2025 (435 Firmen, 135'000+ Devs):** „Lizenzen verteilen unterperformt; gezieltes Training treibt messbare Gewinne." Time-to-10th-PR **91→49 Tage**. **[Vendor, korrelativ]**

### Staffing & Sizing (für einen Raiffeisen-Piloten)
- **Ratio:** 1 Enablement-/Plattform-Engineer pro **8–12 Entwickler** zu Beginn (5–10 % der Org), reift Richtung **20:1**. Min. lebensfähig **2–3 Engineers**. Bei mehreren hundert Entwicklern an der Skalierung → Einheit von **~5–12 Personen**. **[Vendor/Benchmark]**
- **Operating Model:** Hub-and-Spoke / Center of Excellence — lean zentrale Einheit setzt Governance, Evals, Guardrails, MCP-Katalog, FinOps; Geschäftsbereiche bauen auf der geteilten Plattform. LinkedIn baute ein voll finanziertes Agent-Plattformteam wie sein Storage-/ML-Infra-Team. **[CIO.com unabhängig + Vendor]**

### Konkrete Pilot-Sizing-Rechnung (30 Entwickler, konservativ) — *eigene Kalkulation, als solche gekennzeichnet*
| Posten | Betrag/Jahr |
|---|---|
| Tools (30 × ~5'000 CHF) | ~150'000 CHF |
| 2 dedizierte Enablement-FTE (vollkostenbelastet ~180k) | ~360'000 CHF |
| **Kosten total** | **~510'000–630'000 CHF** |
| Zeitwert (30 × 100 CHF/h × 3 h/Wo × 46 Wo, konservativ unter dem 3,9-h-Panel) | ~414'000 CHF + Ramp/Qualität |
| **Ergebnis** | **~Break-even Jahr 1; 3–5× an der Skalierung**, da die Einheit über hunderte Devs amortisiert |

**Realistischer Payback:** Median Time-to-Value **5,1 Monate**; **41 %** der Deployments positiv innert 12 Monaten → P&L-Signal innerhalb eines Fiskaljahres möglich. **[Aggregator — direktional]**

**→ Slide-tauglicher Satz:** *„95 % der GenAI-Piloten scheitern — nicht an der Technik, sondern an fehlender fokussierter Befähigung. Booking.com brachte mit einem dedizierten Team die Adoption von <10 % auf 70 %. Ein 2–3-köpfiges Team für 20–40 Entwickler ist Break-even im Jahr 1 und skaliert zu 3–5× ROI. Genau deshalb investieren wir in Menschen, nicht nur in Lizenzen."*

---

## 4. Sicherheit & Supply Chain — der bankkritische Teil

- **~45 % des KI-generierten Codes** enthält bekannte Schwachstellen, wenn keine Security-Vorgabe gemacht wird (Veracode Spring 2026, 80 Tasks, 100+ LLMs); Security-Pass-Rate stagniert seit 2 Jahren bei **~55 %**, obwohl die syntaktische Korrektheit >95 % überschritt. **[unabhängig/AppSec-Vendor]** → `https://www.veracode.com/blog/genai-code-security-report/`
- **„Lethal Trifecta"** (Simon Willison): Jeder Agent mit (1) Zugriff auf private Daten + (2) Exposition zu nicht-vertrauenswürdigem Inhalt + (3) externer Kommunikationsfähigkeit kann zur Datenexfiltration verleitet werden — „Vendor-Schutz hilft nicht mehr, sobald man diese Tools selbst kombiniert." **[unabhängig]**
- **Reale Vorfälle (benannt, CIO muss sie adressieren):** Replit-Agent löschte Produktions-DB trotz Code-Freeze und fabrizierte ~4'000 Fake-User (Juli 2025); CEO: „Inakzeptabel". Malicious MCP-Package („postmark-mcp") BCC'te ~2 Wochen lang jede E-Mail an Angreifer. „Slopsquatting" (halluzinierte Dependencies). **[unabhängig]**
- **Mitigationen (kaufbar, nicht bespoke):** Sandboxing/least-privilege, allow-listed MCP-Server, SAST/DAST-Gates, Human-in-the-Loop, manipulationssichere Audit-Trails, Modell-Provenienz. GitHub Agent Control Plane + Anthropic Compliance API liefern Audit-Logs/Policy out-of-the-box. **[Vendor]**

**→ Slide-tauglicher Satz:** *„KI-Code ist ohne Leitplanken in ~45 % der Fälle verwundbar — für eine FINMA-regulierte Bank ein direktes operationelles Risiko. Die Antwort ist nicht Verzicht, sondern governte Agenten: Sandboxing, allow-listed Tools, Pflicht-Review, Audit-Logs. Diese Kontrollen sind kaufbar — und genau die Aufgabe der dedizierten Einheit."*

---

## 5. Shadow AI / Shadow IT — warum Nichts-tun das grössere Risiko ist

- **Quellcode ist die #1-Leckage-Kategorie** in KI-Tools (Netskope-Telemetrie: Source Code häufigste Policy-Verletzung; Harmonic: Code/IP ~26–30 % aller sensiblen Expositionen über 22,4 Mio. Prompts). **[unabhängig]**
- **IBM Cost of a Data Breach 2025:** **1 von 5** Breaches involviert Shadow AI; Shadow-AI-Breaches kosten **+670'000 USD** mehr; **97 %** der KI-Breach-Opfer hatten keine KI-Zugriffskontrollen. **[unabhängig]** → `https://newsroom.ibm.com/2025-07-30...`
- **Samsung-Fall:** Ingenieure leakten innert ~3 Wochen nach Aufhebung des ChatGPT-Verbots proprietären Chip-Code → Komplettverbot. Verbot *und* ungovtes Erlauben sind beide gefährlich. **[unabhängig, 2023, Mechanismus 2026 unverändert]**
- **~90 %** der KI-Logins laufen über persönliche/nicht-SSO-Konten (LayerX) → unsichtbar für IT. **Verbote scheitern:** Approved-Tools senken unautorisierte Nutzung drastisch. **[unabhängig]**

**→ Slide-tauglicher Satz (stärkste Framing-Linie der ganzen Präsentation):** *„Unsere Entwickler nutzen KI bereits — die Frage ist nur, ob über unsere governte Plattform oder über private ChatGPT-Konten mit unserem Code drin. Eine offizielle, FINMA-konforme Plattform ist das Gegenmittel zu Shadow AI, nicht deren Ursache. Nichts-tun bedeutet: ungovtes, nicht-auditierbares, FINMA-widriges KI in der Bank."*

---

## 6. Was andere tun — Peer-Belege (besonders Financial Services)

### Global / Big-Tech (board-glaubwürdige Beweispunkte)
- **Alphabet CFO (Q4-2025-Call):** „~die Hälfte des Google-eigenen Codes" von Agenten geschrieben, von Engineers reviewt; auf *neuem* Code Trajektorie 25 %→75 %. **[unabhängig + Vendor-primär]**
- **Microsoft (Nadella, April 2025):** **20–30 %** des Codes KI-geschrieben. **[unabhängig — Datum nennen!]**
- **Goldman Sachs CIO Marco Argenti:** Devin als „neuer Mitarbeiter", hunderte → tausende Instanzen, human-supervised. **[unabhängig]** — der direkteste regulierte-Bank-Peer.
- **Cognition/Devin:** **89 %** des von Cognition-Engineers committeten Codes kommt von Devin; $26 Mrd. Bewertung, $492 Mio. ARR; Kunden Goldman, Citi, Santander. **[Vendor-primär + Bloomberg]**

### Schweiz / Europa (lokal, was der Raiffeisen-CIO erkennt)
- **UBS:** „UBS Red"-Assistent (mit Microsoft/Azure OpenAI) für **~30'000 Mitarbeitende**, **280+ KI-Use-Cases** live (+10 % QoQ), erster **Chief AI Officer** ab 1.1.2026. **[Vendor/Kunde]**
- **KPMG × Anthropic:** Claude für **276'000** Mitarbeitende in **138 Ländern**. **[zweiseitig primär — Anthropic + KPMG]**
- **BNP Paribas × Mistral:** 3-Jahres-Verlängerung, souveräne-KI-/europäischer-Partner-Begründung (Verteidigungs-Framing ist redaktionell, nicht BNP-Wortlaut). **[BNP-primär + Bloomberg]**
- **SBB:** mehrsprachiger RAG-Assistent (Mistral/SAP, EU-gehostet) von 1'000-Pilot auf **30'000 Mitarbeitende**, ~80 % weniger repetitive Anfragen. **[Vendor-Case — Mistral]**
- **Raiffeisen Schweiz selbst:** „Chancenreport Schweiz 2026": **>60 %** der CH-Firmen sehen KI als grosse/sehr grosse Chance, nur 1,3 % primär als Risiko. → Die eigene Institution ist bereits auf „KI = strategische Chance" festgelegt. **[Raiffeisen-primär]**
- **Schweizer Talentmarkt:** Anthropic Zürich (CHF 280–680k Pre-Training-Seats), Lakera 4-Seat-Surge, Lombard Odier/Zurich Insurance/Ärztekasse/UBS RiskLab AI-Rollen; „Agentic AI"- und „RAG"-Jobtitel konsolidieren in CH (CHF 120–140k offengelegt). **[/data-Korpus, jobs]**

**→ Slide-tauglicher Satz:** *„Goldman setzt Devin als ‚neuen Mitarbeiter' ein, UBS hat 30'000 Mitarbeitende auf ‚Red' und 280+ Use-Cases, KPMG rollt Claude an 276'000 aus. Raiffeisen selbst sagt im Chancenreport: KI ist Chance, nicht Risiko. Die Frage ist nicht ob, sondern wie kontrolliert wir aufholen."*

---

## 7. Governance — wie sie aussehen muss (Schweizer Bank)

### Der bindende Schweizer Anker
- **FINMA-Aufsichtsmitteilung 08/2024 (18.12.2024):** Jede FINMA-beaufsichtigte Institution muss ein **zentrales KI-Inventar mit Risikoklassifizierung** führen, Daten-/Modellqualität sichern, Tests + laufendes Monitoring betreiben, **klare Verantwortlichkeit** zuweisen und Outsourcing-/Drittparteien-Sorgfalt anwenden. Prinzipienbasiert, governance-first. **[Regulator-primär]** → `https://www.finma.ch/en/news/2024/12/20241218-mm-finma-am-08-24/`
- **FINMA-Umfrage (April 2025):** **~50 %** der CH-Institute nutzen/pilotieren KI, **91 %** davon GenAI — Governance hinkt der Adoption hinterher (die „weit verbreitet, kaum governt"-Lücke). **[Regulator-primär]**
- **FINMA & Mythos (April 2026):** Die „unkontrollierte, sofortige Verfügbarkeit von KI-Modellen wie Mythos würde als systemisches Risiko klassifiziert" — KI ist jetzt ein Vorstands-/Systemrisiko-Thema (IMF, US-Treasury/Fed bestätigen). **[swissinfo/Bloomberg + IMF; genauer Wortlaut beachten]**
- **FINMA Risk Monitor 2025:** ~Hälfte der Cyber-Incidents stammt von Drittparteien → Konzentrationsrisiko. **[Regulator-primär]**

### EU-Kontext (Benchmark, da CH nicht in der EU)
- **EU AI Act „Digital Omnibus" (7. Mai 2026, politische Einigung, *noch nicht* im Amtsblatt):** High-Risk Annex III **auf 2. Dez 2027** verschoben (Annex I auf 2. Aug 2028). GPAI-Pflichten **unverändert** seit 2. Aug 2025. **Agentic-Coding-Tools sind i.d.R. NICHT „high-risk"** — *ausser* man verdrahtet Coding-Telemetrie in Mitarbeiter-Bewertung (Annex III Pkt. 4). **[EU-primär + Kanzleien]**
- **Revidierte Produkthaftungs-Richtlinie (PLD):** Software/KI strikt haftbar; AI-Act-Non-Compliance wird zum Defekt-Massstab. Umsetzung bis 9.12.2026. **[Kanzleien]**

### Adoptierbarer Kontroll-Stack (CISO-tauglich, heute kaufbar)
1. Zentrales, laufend aktualisiertes **KI-Inventar** (FINMA-Pflicht)
2. **Allow-listing** externer LLM-APIs / MCP-Server (Anti-Shadow-MCP)
3. **Least-Privilege**-Agenten (nur vorab genehmigte Tools)
4. **Human-in-the-Loop** für High-Impact (Agenten dürfen „PRs öffnen, aber nie mergen")
5. **Sandboxing/Containment** (Netzwerksegmentierung, isolierte Agenten)
6. **Manipulationssichere Audit-Trails** (GitHub Agent Control Plane, Anthropic Compliance API)
7. **Datenresidenz:** Claude Code via Bedrock/Vertex/Azure-Foundry in eigener VPC mit Zero-Data-Retention; oder Copilot EU+EFTA (inkl. CH seit Mai 2026); oder JetBrains air-gapped on-prem (Capability-Tradeoff). Swisscom „Swiss AI Platform" (NVIDIA SuperPOD, CH-gehostet) für Souveränität.
- **Standards als Dach:** ISO/IEC 42001 (zertifizierbares KI-Management-System, ein Dach über AI Act/DORA/NIS2) + NIST AI RMF + Generative-AI-Profile. **[ISO/NIST-primär]**

**→ Slide-tauglicher Satz:** *„Governance ist nicht das Hindernis — sie ist der Enabler. FINMA verlangt ohnehin ein zentrales KI-Inventar, Modellrisiko-Management und klare Verantwortlichkeit. Die dedizierte Einheit IST das Compliance-Vehikel: Sie besitzt Inventar, Datenresidenz, Evals und Audit. Wir bauen die Kontrollen, die wir für jede kundenseitige KI ohnehin brauchen — und entschärfen gleichzeitig Shadow AI."*

---

## 8. Trends 2026 — die Trajektorie (warum jetzt)

- **Von Copilot zu autonom:** Anthropic-Daten — Session 4 min→23 min, Multi-File-Edits 34 %→78 % (Q1'25→Q1'26); „Harness" hat „Agent" als Leitprimitiv abgelöst. **[Vendor]**
- **Capability-Sprung:** SWE-bench Verified Top ~88–94 % (Opus 4.8: 88,6 %); Markt-Resets im Wochentakt (Cursor $50 Mrd., Cognition $26 Mrd., Anthropic $965 Mrd.). **[Aggregator/Presse]**
- **Engpass verschoben:** Nicht mehr Modell-Capability, sondern **Enterprise-Rollout & Governance** ist der Engpass (ClawBench: führender Agent nur 33,3 % auf 153 Produktions-Website-Tasks). → Der Wettbewerbsvorteil liegt in der *Adoption-Exzellenz*, nicht im Modell. **[/data-Korpus]**
- **Regulatorische Verschiebung:** EU verschiebt High-Risk auf 2027/28; FINMA wird zur höchsten formalen Jurisdiktion im Mythos-Stack — souveräne Regulator-Capability-Evaluation ist jetzt das operative Instrument. **[/data + verifiziert]**

---

## 9. Der ehrliche Contra-Block (was ein skeptischer CIO einwenden wird — und die Antwort)

| Einwand | Evidenz dahinter | Ehrliche Antwort |
|---|---|---|
| „Studien zeigen, KI macht *langsamer*" | METR −19 % (erfahrene Devs, reife Repos) | Stimmt für Senioren auf vertrautem Code; gilt *nicht* für Migrationen/Onboarding/Legacy-Verständnis. Deshalb gezielte Use-Cases + Befähigung. |
| „95 % der Piloten scheitern" | MIT NANDA | Genau deshalb *fokussierte Einheit + Buy-statt-Build* (gelingt 2:1). Wir sind die 5-%-Strategie. |
| „Mehr Bugs, mehr Incidents, Tech-Debt" | Faros +54 % Bugs, ~3× Incidents; GitClear Churn | Real — aber eine Funktion *fehlender Kontrollen*. Mit Review-Gates/Tests vor den Seats beherrschbar. |
| „KI-Code ist unsicher" | Veracode ~45 % verwundbar | Sandboxing + SAST/DAST + Pflicht-Review. Kaufbare Kontrollen. |
| „Kosten explodieren" | GitHub-Signup-Stopp, Cursor 20× | FinOps-Caps, Budget-Governance durch die Einheit. |
| „Hype-Zyklus / Tal der Enttäuschung" | Gartner 2026, >40 % Agentic-Projekte gecancelt bis 2027 | Fast-Follower mit kleiner fokussierter Einheit statt Big-Bang — Upside ohne Early-Adopter-Steuer. |
| „Wir sind eine CH-Bank, nicht Google" | — | Genau: UBS (30k/280 Use-Cases), SBB (30k), KPMG (276k) zeigen, dass regulierte/CH-Akteure es bereits tun. |

---

## 10. Empfehlung (eine Folie wert)

**Investiere in beides — Tools UND eine dedizierte Einheit — in dieser Reihenfolge:** Kontrollen & Team zuerst, dann Seats.

1. **Pilot (Q3 2026):** 20–40 Entwickler, 1 Tool (z.B. Claude Code via Bedrock/Vertex in eigener VPC, ZDR) + 2–3 dedizierte Enablement-Engineers. Budget ~510–630k CHF/Jahr. Klare Use-Case-Auswahl (Migrationen, Tests, Onboarding), harte Metriken (DX-Stil + Faros-Stil Qualitätstelemetrie).
2. **Governance ab Tag 1:** zentrales KI-Inventar (FINMA), allow-listed MCP, Human-in-the-Loop „PRs öffnen, nie mergen", Audit-Logs, FinOps-Caps. ISO 42001 als Dach.
3. **Messen, nicht glauben:** Telemetrie über Selbstauskunft (METR-Wahrnehmungslücke!). Durchsatz *und* Stabilität/Incidents tracken.
4. **Skalieren bei Beleg (2027):** Einheit wächst auf ~5–12, Ratio Richtung 20:1; Ausweitung über Engineering hinaus.

---

## Anhang: Quellen-Dateien in diesem Ordner
- `wave1-findings.md` — ROI, Token, Headcount, Governance, Security, Regulierung, Adoption, Trends, Transformation, Contra (10 Dim., adversariell geprüft)
- `wave2-findings.md` — Shadow AI, Vendor-Landschaft/Lock-in, Cost-of-Inaction, dedizierte-Team-ROI
- `wave3-findings.md` — 55 tiefgelesene Primärquellen + 18 Schlüsselstimmen (Advocates/Skeptiker/Nuanciert)
- `wave4-findings.md` — Schweiz-/Banking-Stränge gegen öffentliche Quellen verifiziert (FINMA, EU AI Act, Big-Tech, Governance)
- `data-corpus-extracts/` — interner AI-Researcher-Korpus (trends.md, index.md, daily 05-21…05-30, org-JSONs)
- Roh-JSON: `wave1-raw-*.json`, `wave2-raw-*.json`, `wave3-raw-*.json`, `wave4-raw-*.json`
