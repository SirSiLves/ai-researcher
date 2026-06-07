# Enterprise- & Finanz-Praxis — konkrete Fälle, besonders Banken/regulierte Branchen

_Live-Recherche (Web) · erstellt 2026-06-04 · Thema: Agentic Engineering — Mehrwert / Notwendigkeit / Hiring._

## Kernaussagen dieser Lane

- **Goldman Sachs** setzt Cognitions autonomen Coding-Agenten **Devin** als "neuen Mitarbeiter" ein — Start mit "hunderten" Instanzen, potenziell tausenden, neben ~12'000 menschlichen Entwicklern; CTO Marco Argenti erwartet **3–4x Produktivität** in einem überwachten "hybrid workforce"-Modell (CNBC/TechCrunch, 11.07.2025). [stark, mehrwert+notwendigkeit]
- **Citi** rollt agentische KI (ebenfalls **Devin**) auf seine **40'000 Entwickler** aus — mit harten Governance-Leitplanken: **kein autonomes Deployment, nur interne Repos via RAG, jede Änderung wird automatisiert getestet und menschlich reviewt**; Aufgaben 2x–20x schneller (American Banker, 15.07.2025). [stark, governance/notwendigkeit]
- **Morgan Stanley** hat mit dem hauseigenen **DevGen.AI** in 5 Monaten **9 Mio. Zeilen Legacy-Code** verarbeitet und **280'000 Entwicklerstunden** gespart (15'000 Entwickler; Slashdot/WSJ, 04.06.2025). [stark, mehrwert]
- **JPMorgan** misst **10–20% Produktivität** durch internen Coding-Assistenten und verknüpft die KI-Nutzung von **65'000 Technologen** mit Performance-Reviews ("light/heavy/non-user"-Dashboard; Claude-Code-Pilot ab April 2026) (letsdatascience/Reuters, 03/2025 & 2026). [stark, hiring/notwendigkeit]
- **Commonwealth Bank of Australia** betreibt eine eigene Einheit "AI Powered Engineering", ein **5-Stufen-Reifegradmodell** (Code Completion → autonome Teams) und meldet **bis zu 3x mehr gemergte Pull-Requests** bei Tool-Adoptern über ~10'000 Engineers (CommBank Tech Blog/iTnews, 2025/26). [stark, mehrwert+hiring]
- **Gegenargument:** Bei >10'000 Entwicklern verpufft der Individualgewinn auf Firmenebene — +21% Tasks/+98% PRs pro Person, aber **kein signifikanter Zusammenhang** zwischen KI-Adoption und Throughput/DORA-Metriken; PR-Review-Zeit **+91%**, Bugs **+9%** (Faros AI, 2025). [stark, gegenargument]

## Belege

### Goldman Sachs: Devin als "neuer Mitarbeiter", hundert(e) bis tausend(e) Instanzen
- **Aussage:** Goldman Sachs startet mit "hunderten" Devin-Instanzen (potenziell tausenden) neben ~12'000 menschlichen Entwicklern; erwartete Produktivitätssteigerung 3–4x; überwachter "hybrid workforce".
- **Quelle:** TechCrunch (Maxwell Zeff) · 11.07.2025
- **Link:** https://techcrunch.com/2025/07/11/goldman-sachs-is-testing-viral-ai-agent-devin-as-a-new-employee/
- **Datum:** 11.07.2025
- **Beleg-Zitat:** "We're going to start augmenting our workforce with Devin, which is going to be like our new employee." (Marco Argenti, CIO)
- **Relevanz:** mehrwert
- **Stärke:** stark

### Goldman Sachs: 3–4x Produktivität, Engineer wird zum Supervisor
- **Aussage:** Argenti erwartet 3–4x höhere Produktivität als bei früheren KI-Tools; Engineers müssen Probleme als Prompts beschreiben und die Agenten beaufsichtigen statt selbst Routinecode zu schreiben.
- **Quelle:** CNBC (Hugh Son), referenziert über Lucidate/Argenti-Zitate · 11.07.2025
- **Link:** https://lucidate.substack.com/p/goldman-sachs-scales-ai-coding-to
- **Datum:** 11.07.2025
- **Beleg-Zitat:** "Engineers are going to be expected to have the ability to really describe problems in a coherent way and turn it into prompts… and then be able to supervise the work of those agents."
- **Relevanz:** hiring
- **Stärke:** stark

### Citi: Agentische KI (Devin) für 40'000 Entwickler — mit strikter Governance
- **Aussage:** Citi rollt Devin auf 40'000 Entwickler aus; Aufgaben 2x–20x schneller; aber kein autonomes Deployment, Agenten greifen nur per RAG auf interne Repos zu (kein Web), jede Änderung wird automatisch getestet und menschlich reviewt. GitHub Copilot brachte 5–15% Mehrproduktivität.
- **Quelle:** American Banker (Carter Pape) · 15.07.2025
- **Link:** https://www.americanbanker.com/news/citi-is-rolling-out-agentic-ai-to-its-40-000-developers
- **Datum:** 15.07.2025
- **Beleg-Zitat:** "You can give the agentic AI a task, and the agentic AI will execute that task for you, so it can act as more of a proactive partner to a developer." (David Griffiths, CTO)
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### Morgan Stanley: DevGen.AI — 9 Mio. Zeilen Legacy-Code, 280'000 Stunden gespart
- **Aussage:** Das im Januar gestartete, auf OpenAI-GPT basierende DevGen.AI verarbeitete in 5 Monaten 9 Mio. Zeilen Legacy-Code (COBOL/PL/I/Perl) und sparte ~280'000 Entwicklerstunden; nutzbar durch alle 15'000 Entwickler, Mensch bleibt im Loop.
- **Quelle:** Slashdot (Referat des WSJ-Artikels) · 04.06.2025
- **Link:** https://developers.slashdot.org/story/25/06/04/1233253/morgan-stanley-says-its-ai-tool-processed-9-million-lines-of-legacy-code-this-year-and-saved-280000-developer-hours
- **Datum:** 04.06.2025
- **Beleg-Zitat:** "modernizing decades-old code … creating English specifications that map what legacy code does, enabling any of the company's 15,000 developers worldwide to rewrite it" (Mike Pizzi, Global Head of Technology & Operations)
- **Relevanz:** mehrwert
- **Stärke:** stark

### JPMorgan: 10–20% Produktivität, KI-Nutzung in Performance-Reviews von 65'000 Technologen
- **Aussage:** Interner Coding-Assistent brachte zehntausenden Engineers 10–20% Produktivität; bis Ende März 2026 ist KI-Nutzung Teil des Performance-Reviews für 65'000 Technologen (Dashboard "light/heavy/non-user"); Claude-Code-Pilot ab ~April 2026; CAO Derek Waldron fordert Upskilling auf Agent-/LLM-Systeme.
- **Quelle:** Let's Data Science (Aufbereitung Business Insider/Reuters) · 2026
- **Link:** https://letsdatascience.com/blog/jpmorgan-tracks-65000-engineers-ai-usage-performance-reviews
- **Datum:** 2026 (Produktivitätszahl ursprünglich 03/2025)
- **Beleg-Zitat:** "software engineers need to be upskilled to build scalable systems based on agents and LLM components" (Derek Waldron, Chief Analytics Officer)
- **Relevanz:** hiring
- **Stärke:** stark

### JPMorgan: Produktivitätsgewinn als Umschichtungs-Chance (Lori Beer)
- **Aussage:** Lori Beer (Global CIO) bezifferte 10–20% Effizienzgewinn und sieht ihn als Chance, Engineers auf höherwertige KI-/Daten-Projekte umzuschichten; ~450 KI-Anwendungsfälle aktuell, ~1'000 bis Folgejahr erwartet.
- **Quelle:** Allwork.space (Referat Reuters) · 03/2025
- **Link:** https://allwork.space/2025/03/ai-coding-assistant-boosts-jpmorgan-engineer-efficiency-20/
- **Datum:** 13.03.2025
- **Beleg-Zitat:** Beer nennt die Effizienz "a great opportunity" zur Umschichtung von Engineers auf höherwertige KI- und Datenarbeit.
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### Commonwealth Bank of Australia: 5-Stufen-Reifegradmodell + bis zu 3x mehr gemergte PRs
- **Aussage:** CBA hat ein 5-Stufen-Framework (L1 Code Completion/Chat → L2 Human-directed local agents → L3 Human-supervised remote agents → L4 Autonomous Engineer → L5 Autonomous Teams); Tool-Adopter zeigen bis zu 3x mehr gemergte PRs; Fokus auf "build-time agents" statt "run-time agents"; Tools u.a. Claude Code, Cursor, Cline, Roo Code, GitHub Copilot Agent.
- **Quelle:** CommBank Technology Blog (Brent McKendrick, Distinguished Engineer) · 2025/26
- **Link:** https://medium.com/commbank-technology/the-evolution-of-ai-software-engineering-75a8a5a02c14
- **Datum:** 2025/26
- **Beleg-Zitat:** Adopter zeigten "up to 3x increase in the number of merged pull-requests" gegenüber Nicht-Adoptern (laut Artikel "imperfect" als Metrik).
- **Relevanz:** mehrwert
- **Stärke:** stark

### Commonwealth Bank: eigene Einheit "AI Powered Engineering", aktives Hiring
- **Aussage:** CBA gründete im Juli eine spezialisierte Engineering-Einheit unter Martha McKeen (Executive Manager, AI Powered Engineering); rekrutiert Principal/Senior/Staff Engineers; Ziel: KI über den gesamten Software-Delivery-Lifecycle (Planung, Coding, Testing, Wartung) bei ~10'000 Engineers.
- **Quelle:** iTnews (Australien) · 2025
- **Link:** https://www.itnews.com.au/news/cba-plans-to-use-ai-across-entire-software-delivery-614346
- **Datum:** 2025
- **Beleg-Zitat:** "The team is dedicated to unlocking engineering capability and creativity using emerging AI-assisted tools and features across the entire software delivery lifecycle." (Brendan Hopper, CIO for Technology)
- **Relevanz:** hiring
- **Stärke:** stark

### Nubank: ETL-Migration von ~1,5 Jahren auf 2 Monate — 12x Effizienz, >20x Kosten
- **Aussage:** Nubank refactorte mit Devin Millionen Zeilen (ETL-Monolith >6 Mio. LOC); 12x Effizienz auf Engineering-Zeit, >20x Kostenersparnis; Projekt von geschätzt 1,5 Jahren auf 2 Monate verkürzt; Vorgehen: Menschen erstellen Muster/Beispiele, Devin wird darauf feingetunt, Mensch genehmigt.
- **Quelle:** Cognition Labs (offizieller X-Post) · 11.12.2024
- **Link:** https://x.com/cognition_labs/status/1866579175743820116
- **Datum:** 11.12.2024
- **Beleg-Zitat:** "Nubank refactors millions of lines of code with Devin, reducing a large scale ETL migration from an estimated 1.5 year project to 2 months. Devin successfully delivered 12x efficiency improvement on engineering time"
- **Relevanz:** mehrwert
- **Stärke:** mittel (Vendor-Quelle, Zahl aber konkret und benannt)

### Wells Fargo: Engineering-KI 30–35% effizienter — ohne Coder-Stellenabbau (bisher)
- **Aussage:** CEO Charlie Scharf: GenAI-Tools machen die Engineering-Belegschaft 30–35% effizienter beim Coden; bisher keine Reduktion der Coder-Zahl, aber "deutlich mehr Output"; KI auch in Compliance, Legal, Call-Center, Kreditmemos.
- **Quelle:** Allwork.space (Referat Bloomberg/Goldman-Sachs-Konferenz) · 09.12.2025
- **Link:** https://allwork.space/2025/12/wells-fargo-planning-more-job-cuts-this-month-amid-continued-ai-efficiency-push/
- **Datum:** 09.12.2025
- **Beleg-Zitat:** "Gen AI tools within our engineering workforce were 30% to 35% more efficient in terms of writing code today." … "We've not reduced the number of people we have coding today, but we're getting a lot more done." (Charlie Scharf)
- **Relevanz:** mehrwert
- **Stärke:** stark

### Deloitte: Banken sparen 20–40% der Software-Investitionen bis 2028; Citizens Bank +20%
- **Aussage:** Deloitte prognostiziert, dass KI-Tools Banken bis 2028 kollektiv 20–40% der Software-Investitionen sparen ($0,5–1,1 Mio. pro Engineer); Produktivitätsgewinne 30–55% über Studien; Citizens Bank +20% im Test; 84% der Entwickler nutzen mind. einen LLM-Coding-Assistenten; Empfehlung: "robuste Governance-Modelle" und cross-funktionale Aufsicht.
- **Quelle:** Deloitte Center for Financial Services (Industry Predictions 2025) · 2025
- **Link:** https://www.deloitte.com/us/en/insights/industry/financial-services/financial-services-industry-predictions/2025/ai-and-bank-software-development.html
- **Datum:** 2025
- **Beleg-Zitat:** Bis 2028 "AI tools will save banks 20-40% in software investments collectively"; Empfehlung, "robust governance models to oversee AI integration" zu entwickeln.
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### GEGENARGUMENT — AI Productivity Paradox: Individualgewinn, kein Firmen-Effekt
- **Aussage:** Über 10'000 Entwickler / 1'255 Teams: pro Person +21% Tasks und +98% gemergte PRs, aber KEIN signifikanter Zusammenhang zwischen KI-Adoption und Throughput-/DORA-/Quality-Metriken auf Firmenebene; PR-Review-Zeit +91%, Bugs/Entwickler +9%, mittlere PR-Größe +154%.
- **Quelle:** Faros AI (Research Report) · 2025
- **Link:** https://www.faros.ai/blog/ai-software-engineering
- **Datum:** 2025
- **Beleg-Zitat:** "any correlation between AI adoption and key performance metrics evaporates at the company level."
- **Relevanz:** gegenargument
- **Stärke:** stark

### Anthropic "Claude for Financial Services": benannte Kunden + Code-Use-Cases
- **Aussage:** Anthropic listet Commonwealth Bank of Australia, Bridgewater (AIA Labs) und AIG als Kunden; Use-Cases u.a. Legacy-Code-Modernisierung via Claude Code, Python-Codegenerierung, automatische Compliance-Anforderungen in PRDs; AIG komprimierte Review-Timeline um >5x bei Datengenauigkeit 75%→90%+.
- **Quelle:** Anthropic (offizielle Mitteilung "Claude for Financial Services") · 15.07.2025
- **Link:** https://www.anthropic.com/news/claude-for-financial-services
- **Datum:** 15.07.2025
- **Beleg-Zitat:** "We have been able to compress the timeline to review business by more than 5x in our early rollouts while simultaneously improving our data accuracy from 75% to over 90%." (Peter Zaffino, CEO AIG)
- **Relevanz:** mehrwert
- **Stärke:** mittel (Code-Engineering nur ein Teil; FS-Fokus stark)

### Hiring-Blueprint: "AI Platform Engineering Leader" als Governance-/Infrastruktur-Rolle
- **Aussage:** Die 2026er Rolle zentriert sich auf Multi-Agent-Orchestrierung, Model-Routing und Runtime-Governance (Audit-Logs für jede Agent-Aktion, Least-Privilege-Zugriff, Eskalationspfade); empfohlener Report an CTO (Infra) bzw. CEO (Strategie); US-Comp VP AI typ. $500k–$2M+.
- **Quelle:** Augment Code (Guide/Job-Spec) · 2026
- **Link:** https://www.augmentcode.com/guides/ai-platform-engineering-leader-job-spec
- **Datum:** 2026
- **Beleg-Zitat:** Die Rolle baut Systeme, die "log every autonomous agent's action, enforce minimum-privilege access to tools at runtime, and produce audit trails."
- **Relevanz:** hiring
- **Stärke:** mittel

### Regulatorischer Kontext: EU AI Act (08/2026) + DORA verlangen Aufsicht/Auditierbarkeit
- **Aussage:** Der EU AI Act erreicht am 02.08.2026 volle Anwendbarkeit für Hochrisiko-Systeme (strukturiertes Risk-Management, Erklärbarkeit, menschliche Aufsicht); DORA ist in aktiver, sanktionierter Durchsetzung und behandelt KI als kritisches ICT-Risiko — für Banken faktisch nur mit auditierbaren, governten Workflows nutzbar.
- **Quelle:** The Connector (Governance-Analyse Banken) · 2026
- **Link:** https://www.jointheconnector.com/post/the-governance-gap-why-agentic-ai-is-breaking-every-procurement-framework-banks-have
- **Datum:** 2026
- **Beleg-Zitat:** Hochrisiko-KI in EU-Finanzinstituten muss "structured risk management, explainability, and human supervision" nachweisen; DORA in "active, punitive enforcement".
- **Relevanz:** kontext
- **Stärke:** mittel

## Lücken / Unsicherheiten

- **Schweizer/europäische Banken (UBS, Lloyds, ING, BBVA):** Belege gefunden zu generischer Copilot-/M365-Adoption (UBS "Red", Lloyds M365 Copilot, Barclays "Colleague AI Agent" 15'000→100'000 Nutzer), aber kaum harte, benannte Zahlen speziell zu *agentic software engineering*. Eine UBS-spezifische, zitierbare Coding-Produktivitätszahl konnte ich nicht verifizieren — Lücke für die Schweizer Zielgruppe.
- **CNBC-Originalquelle** zu Goldman war HTTP-403; die Goldman-Zahlen sind über TechCrunch und Lucidate (mit Argenti-Originalzitaten) bestätigt, nicht über CNBC selbst.
- **Nubank-/Devin-Zahlen** stammen von Cognition (Vendor); die 12x/20x-Werte sind konkret und benannt, aber nicht unabhängig auditiert.
- **JPMorgan Claude-Code-Pilot (April 2026)** und das "light/heavy/non-user"-Dashboard stammen aus einer Sekundäraufbereitung (Business Insider/Reuters via letsdatascience) — Primärquelle (JPMorgan-Memo) nicht direkt gefetcht.
- **Governance bei Misserfolg:** Konkrete, benannte *Schadensfälle* (z. B. fehlerhafter Agenten-Code in Produktion bei einer Bank) habe ich nicht gefunden; der Faros-Report liefert die stärkste systematische Vorsicht (Review-Bottleneck, Bug-Anstieg).
