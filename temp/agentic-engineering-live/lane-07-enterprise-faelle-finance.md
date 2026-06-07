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

### JPMorgan: 10–20% Produktivität, KI-Nutzung in Performance-Reviews von 65'000 Technologen
- **Aussage:** Interner Coding-Assistent brachte zehntausenden Engineers 10–20% Produktivität; bis Ende März 2026 ist KI-Nutzung Teil des Performance-Reviews für 65'000 Technologen (Dashboard "light/heavy/non-user"); Claude-Code-Pilot ab ~April 2026; CAO Derek Waldron fordert Upskilling auf Agent-/LLM-Systeme.
- **Quelle:** Let's Data Science (Aufbereitung Business Insider/Reuters) · 2026
- **Link:** https://letsdatascience.com/blog/jpmorgan-tracks-65000-engineers-ai-usage-performance-reviews
- **Datum:** 2026 (Produktivitätszahl ursprünglich 03/2025)
- **Beleg-Zitat:** "software engineers need to be upskilled to build scalable systems based on agents and LLM components" (Derek Waldron, Chief Analytics Officer)
- **Relevanz:** hiring
- **Stärke:** stark

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

### Citi Arc: Agentic-AI-Plattform für Entwickler im Konzern

- **Aussage:** Citi startete im April 2026 die Agentic-AI-Plattform "Arc" (zentrales "Betriebssystem" für KI-Agenten), die zuerst an die Entwickler ausgerollt wird; über 80% der 180'000 Mitarbeitenden mit Zugang zu Citi-KI-Tools nutzen diese regelmässig. Jeder Agent ist überwacht, auditierbar und governt.
- **Quelle:** CIO Dive / Citi.com · 2026-04-30
- **Link:** https://www.citigroup.com/global/news/perspectives/2026/introducing-ai-agents-next-phase-citi-artificial-intelligence-journey
- **Datum:** 2026-04-30
- **Beleg-Zitat:** "Every agent will be monitored, auditable and governed. We will know what agents are doing, how they are doing it and the value they deliver."
- **Relevanz:** mehrwert
- **Stärke:** stark

### Goldman Sachs: Anthropic-Ingenieure 6 Monate embedded für Accounting/Compliance-Agenten

- **Aussage:** Goldman Sachs entwickelt seit sechs Monaten gemeinsam mit eingebetteten Anthropic-Ingenieuren autonome Claude-Agenten für Trade-Accounting, Compliance, Reconciliation und Client-Onboarding — laut CIO Marco Argenti ein "digitaler Mitarbeiter" für skalierte, komplexe, prozessintensive Tätigkeiten.
- **Quelle:** CNBC / TechBuzz.ai (CNBC-Bericht) · 2026-02-06
- **Link:** https://www.techbuzz.ai/articles/goldman-sachs-deploys-anthropic-s-claude-ai-for-accounting
- **Datum:** 2026-02-06
- **Beleg-Zitat:** "Think of it as a digital co-worker for many of the professions within the firm that are scaled, are complex and very process intensive."
- **Relevanz:** mehrwert
- **Stärke:** stark

### Anthropic Claude in Produktion bei JPMorgan, Goldman, Citi, AIG, Visa

- **Aussage:** Anthropic launchte im Mai 2026 rund 10 vorgebaute Finanz-Agenten (Pitchbooks, Credit Memos, Underwriting, KYC, Month-End-Close); Claude ist "in production at JPMorganChase, Goldman Sachs, Citi, AIG, Visa". AIG-Benchmark: Claude erreichte out-of-the-box 88% der Genauigkeit eines menschlichen Experten bei Versicherungsfällen; Jamie Dimon erstellte in 20 Minuten ein komplettes Dashboard.
- **Quelle:** Fortune · 2026-05-05
- **Link:** https://fortune.com/2026/05/05/anthropic-wall-street-financial-services-agents-jamie-dimon/
- **Datum:** 2026-05-05
- **Beleg-Zitat:** "Claude out of the box scored 88% as accurate as a human expert on insurance claims."
- **Relevanz:** mehrwert
- **Stärke:** stark

### Cognition/Devin: Bank-Kundenstamm und 10x Enterprise-Wachstum 2026

- **Aussage:** Cognitions autonomer Software-Engineer Devin wird in Produktion u.a. von Citi, Goldman Sachs, Santander und Itaú eingesetzt; die Enterprise-Nutzung wuchs seit Jahresbeginn 2026 um mehr als das Zehnfache, die Run-Rate-Umsätze auf 492 Mio. USD. Bei Cognition selbst werden 89% des Codes von Devin committet.
- **Quelle:** Cognition (Series-D-Blog) · 2026-05-27
- **Link:** https://cognition.ai/blog/series-d
- **Datum:** 2026-05-27
- **Beleg-Zitat:** "Our enterprise usage has grown >10x since the start of this year… at Cognition, 89% of code committed by our engineers is committed by Devin."
- **Relevanz:** mehrwert
- **Stärke:** stark

### Itaú (grösste Bank Lateinamerikas): Devin behebt 70% der Security-Vulnerabilities automatisch

- **Aussage:** Itaú nutzt Devin, um ~70% der Sicherheitslücken (SonarQube, Fortify, Veracode) automatisch zu beheben; .NET→Java-Migration von 59 Services lief 6x schneller bei 5x niedrigeren Kosten, SQL-Server-Migration von 800 Objekten 5x schneller. 75% der Teams nutzen Devin, Warteliste von fast 1'000 Entwicklern innerhalb von fünf Monaten (Tech-Organisation ~17'000 Personen).
- **Quelle:** Devin/Cognition Customer Case (bestätigt im Series-D-Blog 2026-05-27) · 2026-05
- **Link:** https://devin.ai/customers/itau/
- **Datum:** 2026-05
- **Beleg-Zitat:** "~70% of vulnerabilities are resolved automatically… 59 services migrated 6x faster at 5x lower cost."
- **Relevanz:** mehrwert
- **Stärke:** stark

### BNY: 20'000 "Empowered Builders" und 130+ "Digital Employees"

- **Aussage:** BNY (52'000 Mitarbeitende) skalierte 2026 die Multi-Agenten-Plattform Eliza mit 20'000 geschulten "Empowered Builders" und 130+ autonomen "Digital Employees"; 80% der Software-Entwickler nutzen GitHub Copilot täglich. Messbare Ergebnisse: Vertragsprüfung -75% (4h auf 1h), Finanzplanung -60%, 125+ Live-Use-Cases.
- **Quelle:** byteiota (BNY-Bericht) · 2026-03-27
- **Link:** https://byteiota.com/bny-mellon-deploys-20000-ai-agents-at-enterprise-scale/
- **Datum:** 2026-03-27
- **Beleg-Zitat:** "20,000 'Empowered Builders'… 130+ autonomous 'Digital Employees'… Legal contract review time dropped 75% (from 4 hours to 1 hour)."
- **Relevanz:** mehrwert
- **Stärke:** stark

### Accenture-Bankfall: Legacy-Migration mit Agenten 30% effizienter, ~15 Mio. £ gespart

- **Aussage:** In einem Accenture-Bankfall (ursprünglich 250 Entwickler für drei Jahre geplant) machten KI-Agenten neben den Software-Engineers die Entwicklung 30% effizienter und sparten ~15 Mio. £; Dokumentation +40%, Metadaten +35%, Test-Generierung +40%, Rework -25%.
- **Quelle:** Accenture Banking Blog · 2026-01-28
- **Link:** https://bankingblog.accenture.com/agentic-ai-future-of-work
- **Datum:** 2026-01-28
- **Beleg-Zitat:** "Development became 30% more efficient — saving approximately £15m… Documentation improved by 40%… rework reduced by 25%."
- **Relevanz:** mehrwert
- **Stärke:** stark

### FIS + Anthropic: Financial-Crimes-Agent, AML-Untersuchungen von Stunden auf Minuten

- **Aussage:** FIS und Anthropic (eingebettete Forward-Deployed-Engineers) entwickeln einen Financial-Crimes-AI-Agent, der AML-Alert-/Case-Untersuchungen von Stunden auf Minuten verdichtet und False Positives reduziert; BMO und Amalgamated Bank sind in Entwicklung, General Availability für 2. Halbjahr 2026. Governance: jede Agenten-Entscheidung traceable und auditierbar, Daten in FIS-kontrollierter Infrastruktur.
- **Quelle:** FIS Press Release · 2026-05-04
- **Link:** https://www.fisglobal.com/about-us/media-room/press-release/2026/fis-brings-agentic-ai-to-banking-with-anthropic-starting-with-financial-crimes
- **Datum:** 2026-05-04
- **Beleg-Zitat:** "compress anti-money-laundering investigations from hours to minutes… every agent decision is traceable and auditable."
- **Relevanz:** mehrwert
- **Stärke:** stark

### Deutsche Bank + Google Cloud: Agentic AI überwacht Trading, Human-in-the-Loop

- **Aussage:** Die Deutsche Bank entwickelt mit Google Cloud Agentic AI, die den Handel überwacht, Anomalien in Orders/Trades/Marktbewegungen erkennt und diese an einen menschlichen Compliance-Officer zur weiteren Prüfung meldet — explizites Human-in-the-Loop-Governance-Muster in einer regulierten Funktion.
- **Quelle:** PYMNTS · 2026-02-25
- **Link:** https://www.pymnts.com/news/artificial-intelligence/2026/deutsche-bank-google-build-ai-agents-patrol-trading/
- **Datum:** 2026-02-25
- **Beleg-Zitat:** "monitor trading; spot anomalies in orders, trades and market moves; and flag those anomalies to a human compliance officer who can further investigate them."
- **Relevanz:** kontext
- **Stärke:** mittel

### UBS: Chief AI Officer ab 01.01.2026, 300+ KI-Use-Cases, eigene Engineering-Tiefe

- **Aussage:** UBS investiert in ein Portfolio grossskaliger transformativer KI-Programme; 2025 wurden 300+ KI-Use-Cases gestartet. Daniele Magazzeni (zuvor JPMorgan Analytics-Chef) übernahm zum 01.01.2026 als erster Chief AI Officer; UBS betont, mehr Engineers/Entwickler zu haben als viele Tech-Firmen, gesteuert über eine Group-AI-Policy.
- **Quelle:** Banking Dive · 2026-02-06
- **Link:** https://www.bankingdive.com/news/ubs-deploys-ai-programs-unlock-efficiency-ermotti-magazzeni-credit-suisse/811572/
- **Datum:** 2026-02-06
- **Beleg-Zitat:** "we are investing in a portfolio of large-scale transformational AI programs… to unlock higher levels of efficiency and effectiveness across the organization."
- **Relevanz:** hiring
- **Stärke:** mittel

### American Banker AI Talent Shift: Banken STELLEN Software-/AI-Engineers EIN

- **Aussage:** In American Bankers "2026 AI Talent Shift"-Umfrage (März 2026, 206 Banking-Profis) bauen Wealth/Investment-Banking-Einheiten zu 35% Software-Engineers und zu 29% AI-Engineers auf, Payments zu 35% Software-Engineers. 47% der Institute mit erhöhtem KI-Budget planen mehr Headcount, nur 26% weniger.
- **Quelle:** American Banker · 2026-04-14
- **Link:** https://www.americanbanker.com/news/exclusive-research-banks-are-increasing-hiring-in-age-of-ai
- **Datum:** 2026-04-14
- **Beleg-Zitat:** "Close to half (47%) of institutions that increased AI spending over the past 12 months plan to increase their headcount in the months to come, against 26% who plan to decrease staffing levels."
- **Relevanz:** hiring
- **Stärke:** stark

### Gegenargument: Forward-Deployed-Engineers als Engpass — internes Skill-Aufbau nötig

- **Aussage:** Ein CIO-Beitrag warnt, dass Banken ohne eigene Fähigkeiten von Vendor-FDEs abhängig werden; Gartner prognostiziert, dass bis 2028 70% der Unternehmen Agentic-AI-Lösungen aus FDE-Engagements wieder aufgeben — wegen hoher Vendor-Kosten und fehlender interner Skills. Entscheidend: ob die Bank den Agenten-Workflow nach Abzug der FDEs selbst betreiben, überwachen und sicher modifizieren kann.
- **Quelle:** CIO.com · 2026-05-06
- **Link:** https://www.cio.com/article/4167981/anthropics-financial-agents-expose-forward-deployed-engineers-as-new-ai-limiting-factor.html
- **Datum:** 2026-05-06
- **Beleg-Zitat:** "70% of enterprises will be forced to abandon agentic AI solutions from FDE-led engagements because of high vendor costs and lack of internal skills."
- **Relevanz:** gegenargument
- **Stärke:** stark

### Cambridge CCAF: 52% der Finanzbranche bereits in aktiver Agentic-AI-Adoption

- **Aussage:** Der "2026 Global AI in Financial Services Report" der Cambridge Centre for Alternative Finance (mit BIS, IMF, WEF, Weltbank) findet, dass 52% der Branchen-Befragten bereits aktiv mit Agentic AI experimentieren; grösstes wahrgenommenes Risiko ist Datenschutz (73% der Befragten).
- **Quelle:** Cambridge Judge Business School / CCAF · 2026-04-28
- **Link:** https://www.jbs.cam.ac.uk/2026/report-finds-uneven-ai-adoption-in-financial-services/
- **Datum:** 2026-04-28
- **Beleg-Zitat:** "52% are already experimenting with agentic AI… data privacy and protection (73% of respondents)."
- **Relevanz:** kontext
- **Stärke:** stark

## Lücken / Unsicherheiten

- **Schweizer/europäische Banken (UBS, Lloyds, ING, BBVA):** Belege gefunden zu generischer Copilot-/M365-Adoption (UBS "Red", Lloyds M365 Copilot, Barclays "Colleague AI Agent" 15'000→100'000 Nutzer), aber kaum harte, benannte Zahlen speziell zu *agentic software engineering*. Eine UBS-spezifische, zitierbare Coding-Produktivitätszahl konnte ich nicht verifizieren — Lücke für die Schweizer Zielgruppe.
- **CNBC-Originalquelle** zu Goldman war HTTP-403; die Goldman-Zahlen sind über TechCrunch und Lucidate (mit Argenti-Originalzitaten) bestätigt, nicht über CNBC selbst.
- **Nubank-/Devin-Zahlen** stammen von Cognition (Vendor); die 12x/20x-Werte sind konkret und benannt, aber nicht unabhängig auditiert.
- **JPMorgan Claude-Code-Pilot (April 2026)** und das "light/heavy/non-user"-Dashboard stammen aus einer Sekundäraufbereitung (Business Insider/Reuters via letsdatascience) — Primärquelle (JPMorgan-Memo) nicht direkt gefetcht.
- **Governance bei Misserfolg:** Konkrete, benannte *Schadensfälle* (z. B. fehlerhafter Agenten-Code in Produktion bei einer Bank) habe ich nicht gefunden; der Faros-Report liefert die stärkste systematische Vorsicht (Review-Bottleneck, Bug-Anstieg).
