# Agentic Engineering — Live-Recherche: Übersicht & Kernargumente

## Worum es geht & Methode

Diese Synthese verdichtet eine intensive Live-Web-Recherche (Stand 2026-06-04) zu *Agentic Engineering* — der Disziplin, Software zunehmend durch das Orchestrieren autonomer KI-Coding-Agenten statt durch reines manuelles Coden zu entwickeln. Über neun thematische Lanes wurde ein breites Quellennetz gespannt: Anbieter (Anthropic, GitHub, Google), Analysten (Gartner, McKinsey, BCG, Bain, Deloitte), Surveys (DORA, Stanford AI Index, Stack Overflow, JetBrains), Stellenmarkt (LinkedIn, Lightcast, PwC, Levels.fyi), Praktiker/Banken (Goldman Sachs, Citi, Morgan Stanley, JPMorgan, Commonwealth Bank) sowie dezidiert kritische Quellen (METR, MIT-NANDA, GitClear, Veracode). Jede Zahl ist mit einer URL belegt; nichts ist erfunden. Dieses Dokument ist das Rohmaterial für einen CIO-Case — Wert, Notwendigkeit und vor allem das Argument, Personen dafür einzustellen und dranzubleiben.

## 1. Der Mehrwert (warum es Wert schafft)

- **55 % schneller** bei identischer Aufgabe mit GitHub Copilot (1h11 statt 2h41), Erfolgsquote 78 % vs. 70 %, statistisch signifikant — kontrolliertes Experiment, 95 Entwickler. (lane-02, lane-03) · https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/
- **~280'000 Entwicklerstunden in 5 Monaten** gespart: Morgan Stanleys DevGen.AI prüfte 9 Mio. Zeilen Legacy-Code (COBOL/PL/I/Perl), nutzbar durch alle 15'000 Entwickler. (lane-02, lane-07) · https://www.entrepreneur.com/business-news/morgan-stanley-builds-ai-tool-that-fixes-major-coding-issue/492697
- **>500'000 Stunden gespart, 30 % schneller geliefert** bei TELUS über 13'000 Custom-AI-Lösungen (Ø 40 Min. pro Interaktion). (lane-01) · https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf
- **10x Tempo bei halben Kosten**: McKinsey berichtet eine Agent-Factory bei einer Grossbank; 40–70 % Produktivitätsplus bei Greenfield-Payments; LATAM +50 % mit kleineren Teams. (lane-01) · https://www.mckinsey.com/capabilities/mckinsey-technology/our-insights/rewiring-software-delivery-for-the-agentic-era
- **15 % höhere Merge-Rate, +84 % erfolgreiche Builds**: Accenture-Enterprise-RCT mit Copilot, 67 % nutzten es ≥5 Tage/Woche. (lane-02) · https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture/
- **>25 % des neuen Codes bei Google KI-generiert** (Pichai, Q3-2024); bei Anthropic schreibt KI bereits die Mehrheit, für die meisten Produkte effektiv 100 %. (lane-02, lane-09) · https://fortune.com/2024/10/30/googles-code-ai-sundar-pichai/
- **30–50 % Produktivitätsgewinne** in den meisten Funktionen prognostiziert Bain — vergleichbar mit der Globalisierungs-/Offshoring-Welle. (lane-03) · https://www.bain.com/insights/ai-enterprise-code-red/
- **Gartner beziffert 17x ROI** im Marktkontext für Enterprise AI Coding Agents (Markt rund 9,8–11,0 Mrd. USD annualisiert, April 2026). (lane-01) · https://www.beri.net/article/gartner-2026-5-coding-agent-leaders-17x-roi-decoded

## 2. Warum es gebraucht wird (warum notwendig, nicht optional)

- **90 % der Software-Profis nutzen KI bereits** (+14 Pp. YoY, Median 2h/Tag), >80 % berichten Produktivitätsgewinn — agentisches Coden ist faktisch Marktstandard. (lane-04, lane-02) · https://blog.google/innovation-and-ai/technology/developers-tools/dora-report-2025/
- **Gartner: AI-gestützte Softwareentwicklung wird 2026 zu *table stakes***; CIOs müssen handeln, die Nachfrage nach differenzierter Software und Entwicklern steigt. (lane-04) · https://www.ciodive.com/news/software-development-challenges-2026-CIO/808413/
- **Wettbewerber machen es zur Pflicht**: Coinbase (Mandat, Verweigerer entlassen, ~⅓ KI-Code), Meta (>75 % KI-Code für ausgewählte Teams bis Mitte 2026), Microsoft/Google (20–30 % bzw. >30 % KI-Code). (lane-04) · https://fortune.com/2025/08/25/coinbase-ceo-brian-armstrong-ai-coding-assistants-mandate-tech/
- **Sicherheits-Asymmetrie zwingt zur defensiven Integration**: Mandiant misst Time-to-Exploit als *negativ* (−1 Tag 2024, geschätzt −7 Tage 2025), Access-Handoff von >8 Std. auf 22 Sekunden; IBM X-Force +44 % Angriffe auf öffentliche Apps. Verteidiger ohne KI können nicht mithalten. (lane-04) · https://www.helpnetsecurity.com/2026/03/24/mandiant-m-trends-2026-report/
- **Bis Ende 2026 enthalten 40 % der Enterprise-Apps task-spezifische KI-Agenten** — von <5 % in 2025, ein 8-facher Anstieg in einem Jahr. (lane-05, lane-01) · https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025
- **99 % der CEOs erwarten in 2 Jahren KI-bedingten Stellenwandel** (Mercer, 12'000 Befragte) — Treiber ist die Angst, abgehängt zu werden. (lane-04) · https://www.tomshardware.com/tech-industry/artificial-intelligence/survey-reveals-that-99-percent-of-ceos-now-expect-ai-driven-layoffs-companies-are-racing-to-replace-junior-workers-with-ai-even-as-many-executives-remain-uncertain-about-the-returns-on-ai-investments
- **Banken sparen bis 2028 kollektiv 20–40 % der Software-Investitionen** ($0,5–1,1 Mio. pro Engineer) — Deloitte empfiehlt zugleich robuste Governance und cross-funktionale Aufsicht. (lane-07) · https://www.deloitte.com/us/en/insights/industry/financial-services/financial-services-industry-predictions/2025/ai-and-bank-software-development.html

## 3. Warum Personen einstellen / aktiv dranbleiben (das Hiring-Argument)

**3.1 Der Stellenmarkt explodiert — eine neue Disziplin entsteht**

- **+2'643 % Wachstum des Skill-Clusters *Agentic AI*** in US-Stellenausschreibungen 2024→2025 (Stanford AI Index). (lane-01) · https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf
- **+280 % YoY auf ~90'000 agentic-AI-Postings** (US); *Forward-Deployed-Engineer*-Inserate (Rolle existierte vor 3 Jahren nicht) **+800 % allein 2025**; **63 % der Firmen melden KI-Talentmangel**. (lane-05, lane-06) · https://jobsbyculture.com/blog/agentic-ai-hiring-boom-2026
- **AI Engineer = Platz 1 der LinkedIn *Jobs on the Rise 2026***, Inserate +143 % YoY; KI hat weltweit bereits **1,3 Mio. neue Rollen** geschaffen. (lane-05) · https://www.weforum.org/stories/2026/01/ai-has-already-added-1-3-million-new-jobs-according-to-linkedin-data/
- **~20 neue agentic Rollen** sind klar benannt (Box/McKinsey/LinkedIn): Forward Deployed Engineer, AI Evals Engineer, Context Engineer, AI Agent Architect, Agent Supervisor, Human-Agent Workforce Lead. (lane-05) · https://finance.yahoo.com/sectors/technology/articles/20-agentic-ai-jobs-box-123000019.html
- **Agentic Engineers sind eine eigene Disziplin** (Planen, Tool-Calls, State-Halten) mit Gehaltsbändern 175–325K+, bis 400K Total Comp; Fehlbesetzung kostet 180–400K. (lane-05) · https://www.kore1.com/hire-agentic-ai-engineers-2026/
- **56 % Lohnprämie für KI-Skills** (von 25 % im Vorjahr); in der Schweiz hat sich die Zahl KI-Inserate seit 2018 verzehnfacht (2'000 → 20'000), Kompetenzen ändern sich 66 % schneller. (lane-05) · https://www.pwc.ch/de/presse/AI_Jobs_Barometer_2025.html
- **Schweizer Finanzsektor zweitgrösster KI-Arbeitgeber** (552 Stellen nach IT mit 1'205), Zürich führt mit 1'773 Positionen, >400 Ausschreibungen/Monat. (lane-05) · https://www.cmm360.ch/artikel/neue-studie-zeigt-hotspots-fuer-ki-stellen-in-der-schweiz/

**3.2 Banken stellen schon heute dezidiert ein und bauen Einheiten**

- **JPMorgan priorisiert KI-Hires vor klassischen Bankern** (Dimon, 21.05.2026) und verknüpft die KI-Nutzung von 65'000 Technologen mit Performance-Reviews; interner Assistent bringt 10–20 % Effizienz. (lane-05, lane-07) · https://www.pymnts.com/artificial-intelligence-2/2026/jpmorgan-prioritizing-ai-hires-over-bankers/
- **Commonwealth Bank gründete eine eigene Einheit *AI Powered Engineering*** (Juli) und rekrutiert Principal/Senior/Staff Engineers für ~10'000 Engineers — bis zu 3x mehr gemergte PRs bei Adoptern. (lane-07) · https://www.itnews.com.au/news/cba-plans-to-use-ai-across-entire-software-delivery-614346
- **Goldman Sachs setzt Devin als "neuen Mitarbeiter"** neben ~12'000 Entwicklern ein; Engineers werden zu **Supervisoren**, CTO erwartet 3–4x Produktivität. (lane-07) · https://techcrunch.com/2025/07/11/goldman-sachs-is-testing-viral-ai-agent-devin-as-a-new-employee/
- **Citi rollt agentische KI auf 40'000 Entwickler aus** mit strikter Governance: kein autonomes Deployment, RAG-only-Zugriff, jede Änderung getestet und menschlich reviewt — Governance ist Personalarbeit. (lane-07) · https://www.americanbanker.com/news/citi-is-rolling-out-agentic-ai-to-its-40-000-developers

**3.3 Ohne dedizierte Owner scheitern Piloten — Enablement ist der ROI-Hebel**

- **95 % der GenAI-Piloten liefern keinen messbaren P&L-Effekt**; gekaufte Lösungen erfolgreich zu 67 %, Eigenbauten nur ein Drittel so oft. Der Engpass ist Organisation, nicht Technik. (lane-06, lane-03) · https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/
- **Adoption ≠ Wirkung**: +25 % strukturiertes Enablement hebt Change Confidence +10,6 %, Code-Maintainability +8,0 %, senkt Time Loss −18,2 %; Booking.com hob die regelmässige Nutzung von <10 % auf ~70 %. (lane-06) · https://getdx.com/blog/ai-assisted-engineering-q4-impact-report-2025/
- **Champion-Programme steigern Adoption um bis zu 38 %**, aktivieren schlafende Nutzer um 30 % — ohne Adoption kein ROI, dedizierte Power-User sind der Hebel. (lane-06) · https://www.faros.ai/blog/increase-github-copilot-adoption-and-usage-best-practices
- **Workflow-Redesign hat den grössten EBIT-Effekt** aller 25 getesteten Attribute — doch nur 21 % gestalten Workflows neu; CEO-/Board-Aufsicht über AI-Governance korreliert am stärksten mit Bottom-Line-Wirkung. (lane-06) · https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai
- **Nur 26 % der Firmen haben die Fähigkeiten, über Experimente hinauszukommen**; nur 4 % erzeugen konsistent Wert über Funktionen (BCG). (lane-06) · https://www.bcg.com/press/30september2025-ai-leaders-outpace-laggards-revenue-growth-cost-savings
- **KI-Erfolg ist zu 70 % Menschen/Prozesse/Kultur**, nicht Technologie — ⅔ der Organisationen bleiben im Pilot-Modus. Das begründet eine dedizierte Funktion für Change-Management und Enablement. (lane-06) · https://astrafy.io/the-hub/blog/technical/scaling-ai-from-pilot-purgatory-why-only-33-reach-production-and-how-to-beat-the-odds

**3.4 Governance & Sicherheit brauchen benannte Verantwortliche (Regulierung)**

- **FINMA verlangt zentrale Verantwortung und unabhängige Prüfung** durch qualifiziertes Personal beim KI-Einsatz; bei vielen Instituten sind Frameworks unklar — direkter Treiber für eine benannte Ownership-Funktion in einer Schweizer Bank. (lane-06) · https://www.mll-news.com/finma-guidance-08-2024-governance-and-risk-management-when-using-artificial-intelligence/?lang=en
- **EU AI Act ab 02.08.2026 voll anwendbar** für Hochrisiko-Systeme; DORA in aktiver, sanktionierter Durchsetzung — KI gilt als kritisches ICT-Risiko. (lane-07) · https://www.jointheconnector.com/post/the-governance-gap-why-agentic-ai-is-breaking-every-procurement-framework-banks-have
- **Nur 34 % wenden auf ihre agentische "Belegschaft" dieselben Sicherheitskontrollen an wie auf Menschen**; 58 % der Führungskräfte meldeten im letzten Jahr einen KI-Sicherheitsvorfall. (lane-06) · https://www.okta.com/newsroom/articles/ai-agents-at-work-2026-agentic-enterprise-security/
- **Reife Plattformen behandeln Agenten wie eine Nutzerpersona** (RBAC, Quoten, "agent golden paths"); nicht-deterministischer Code erfordert die Plattform als Reviewer — das sind Platform-Engineering-Stellen. (lane-06) · https://platformengineering.org/blog/10-platform-engineering-predictions-for-2026

**3.5 Das Tempo erzwingt kontinuierliches Dranbleiben (kein einmaliges Projekt)**

- **Neue KI-Modelle erscheinen etwa alle 3 Tage**; medianer Frontier-Release-Abstand fiel von 37,5 (2023) auf 11 Tage (2026 YTD). Wer einmalig auswählt, ist in Wochen veraltet. (lane-06, lane-09) · https://officechai.com/ai/frontier-labs-are-releasing-new-models-faster-than-ever-shows-data/
- **Autonome Aufgabenlänge verdoppelt sich seit 2024 alle ~3 Monate** (METR); Claude Opus 4.5 = 320 Min. Die Rollenverteilung Mensch/Agent verschiebt sich laufend. (lane-09) · https://metr.org/blog/2026-1-29-time-horizon-1-1/
- **MCP wuchs 970x in 18 Monaten** (97 Mio. Downloads, >10'000 Server); A2A-Protokoll >150 Organisationen — ein sich rasant standardisierendes Ökosystem, das laufende Integrationsarbeit erfordert. (lane-09) · https://www.digitalapplied.com/blog/mcp-adoption-statistics-2026-model-context-protocol
- **Bis 2028 nutzen 75 % der Enterprise-Engineers KI-Assistenten** (von <10 % 2023); bis 2027 behandeln >65 % der agentic-Teams IDEs als optional und verlagern Kontrolle auf Plattformen. (lane-09) · https://www.theregister.com/2024/04/13/gartner_ai_enterprise_code/
- **Experten mit Agenten sind mehrfach produktiver als weniger Erfahrene** (McKinsey); Hiring verschiebt sich von generischen Rollen zu tiefer Plattform-/Architektur-Expertise. (lane-09) · https://www.mckinsey.com/capabilities/mckinsey-technology/our-insights/designing-an-end-to-end-technology-workforce-for-the-ai-first-era

## Ehrliche Gegenargumente (Glaubwürdigkeit)

- **METR-RCT: erfahrene Entwickler waren mit KI 19 % LANGSAMER** — trotz gefühltem +20 % Speedup. (Relativierung: METR-Update 02/2026 misst mit Late-2025-Tools ~+18 % Speedup, aber starke Selektionseffekte.) (lane-08) · https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
- **Gartner: >40 % der agentic-AI-Projekte werden bis Ende 2027 abgebrochen** — Kosten, unklarer Wert, fehlende Governance; "Agent Washing" (nur ~130 echte Anbieter). (lane-03, lane-08) · https://www.rcrwireless.com/20250627/business/agentic-ai-gartner
- **Kosten-Explosion ohne Limits**: Uber verbrannte sein 2026-AI-Budget in 4 Monaten; ein Kunde 500 Mio. USD Claude in einem Monat. Goldman Sachs erwartet 24-fachen Token-Konsum bis 2030. (lane-03, lane-08) · https://fortune.com/2026/05/26/uber-coo-ai-spending-tokens-claude-code/
- **Sicherheit & Qualität**: 45 % des AI-Codes fielen durch Security-Tests (Veracode); GitClear zeigt steigende Code-Duplikation und sinkendes Refactoring; Replit-Agent löschte eine Live-Produktionsdatenbank. (lane-08) · https://www.veracode.com/blog/genai-code-security-report/
- **Vertrauenslücke**: 84 % nutzen KI, aber nur 33 % vertrauen der Genauigkeit (46 % Misstrauen); 66 % frustriert über "fast richtige" Lösungen. (lane-02, lane-08) · https://survey.stackoverflow.co/2025/ai
- **Realismus-Check**: Auf SWE-Bench Pro erreichen Top-Agents nur ~17,8–23 % (vs. >70 % auf SWE-Bench Verified); Firmen-Effekt fehlt oft trotz +21 % Tasks/Person (Faros AI: PR-Review-Zeit +91 %). (lane-08, lane-07) · https://arxiv.org/html/2509.16941
- **Titel-Inflation**: Viele "AI Engineer"-Rollen sind in Wahrheit API-Integration (~80 % des Markts) zu Premium-Preisen. (lane-05) · https://www.ivanturkovic.com/2026/04/24/ai-job-titles-2026-naming-chaos/

*Schlussfolgerung für den Case:* Die Gegenargumente belegen **nicht**, dass man es lassen soll — sondern dass undurchdachte Tool-Mandate ohne dedizierte Owner, Governance, Cost-Controls und Enablement scheitern. Genau das ist das Hiring-Argument.

## Datei-Index

- **lane-01-definition-und-marktreife.md** — Was ist Agentic Engineering: Definition, Abgrenzung zu Assistenten, Marktreife, Magic-Quadrant-Leader.
- **lane-02-mehrwert-produktivitaet.md** — Mehrwert I: Produktivität, Geschwindigkeit, Durchsatz (Copilot-RCTs, KI-Code-Anteile, mit Gegenbelegen).
- **lane-03-mehrwert-business-roi.md** — Mehrwert II: Business-Wert, ROI, Kosten, Token-Ökonomie, Wettbewerbsvorteil und Pilot-Scheitern.
- **lane-04-warum-notwendig-druck.md** — Notwendigkeit: Wettbewerbsdruck, Mandate, Marktstandard, Security-Asymmetrie, Risiko des Nichthandelns.
- **lane-05-hiring-rollen-skills.md** — Hiring I: neue Rollen, Skills, Stellenmarkt, Gehälter, Schweizer Kontext.
- **lane-06-hiring-warum-dediziert.md** — Hiring II: warum dediziert/dranbleiben — Governance, Enablement, Platform-Teams, CoE, FINMA.
- **lane-07-enterprise-faelle-finance.md** — Enterprise-/Finanz-Praxis: konkrete Fälle, besonders Banken (Goldman, Citi, Morgan Stanley, JPMorgan, CommBank).
- **lane-08-skeptik-und-grenzen.md** — Skepsis, Grenzen & Gegenargumente für Glaubwürdigkeit (METR, MIT-NANDA, Veracode, Benchmarks).
- **lane-09-trends-cadence-zukunft.md** — Tempo, Trends & Ausblick: Release-Kadenz, Time-Horizon, MCP/A2A, warum kontinuierliches Dranbleiben nötig ist.

## Stärkste Einzelbelege (Top 10)

1. **~280'000 Entwicklerstunden in 5 Monaten gespart** — Morgan Stanley DevGen.AI, 9 Mio. Zeilen Legacy-Code, 15'000 Entwickler. (Bank, hart quantifiziert) · https://www.entrepreneur.com/business-news/morgan-stanley-builds-ai-tool-that-fixes-major-coding-issue/492697
2. **95 % der GenAI-Piloten ohne messbaren P&L-Effekt; gekauft 67 % vs. Eigenbau 33 % Erfolg** — MIT-NANDA, 150 Interviews / 300 Deployments. (Das Kernargument für Enablement-Owner) · https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/
3. **+2'643 % Wachstum des Agentic-AI-Skill-Clusters 2024→2025** — Stanford AI Index 2026. (Stärkster Hiring-Beleg) · https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf
4. **55 % schneller, 78 % vs. 70 % Erfolg, P=.0017** — GitHub-Copilot-RCT, 95 Entwickler. (Sauberster Produktivitätsbeleg) · https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/
5. **JPMorgan priorisiert KI-Hires vor Bankern (Dimon, 21.05.2026); 65'000 Technologen, KI-Nutzung in Reviews** — direktester Banken-Präzedenzfall. · https://www.pymnts.com/artificial-intelligence-2/2026/jpmorgan-prioritizing-ai-hires-over-bankers/
6. **Citi: agentische KI auf 40'000 Entwickler, kein autonomes Deployment, RAG-only, alles reviewt** — Governance-als-Personalarbeit in einer Bank. · https://www.americanbanker.com/news/citi-is-rolling-out-agentic-ai-to-its-40-000-developers
7. **Banken sparen bis 2028 20–40 % der Software-Investitionen ($0,5–1,1 Mio./Engineer); Empfehlung: robuste Governance** — Deloitte FS. · https://www.deloitte.com/us/en/insights/industry/financial-services/financial-services-industry-predictions/2025/ai-and-bank-software-development.html
8. **Strukturiertes Enablement: +10,6 % Change Confidence, −18,2 % Time Loss; Booking.com <10 %→70 % Nutzung** — DX, 85'350 Entwickler. (Adoption ≠ Wirkung) · https://getdx.com/blog/ai-assisted-engineering-q4-impact-report-2025/
9. **Neue Modelle ~alle 3 Tage; Frontier-Release-Abstand 37,5→11 Tage** — begründet kontinuierliches Tracking statt Einmalprojekt. · https://officechai.com/ai/frontier-labs-are-releasing-new-models-faster-than-ever-shows-data/
10. **METR-RCT: erfahrene Entwickler 19 % LANGSAMER trotz gefühltem +20 %** — der stärkste ehrliche Gegenbeleg, der den Case glaubwürdig macht. · https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
