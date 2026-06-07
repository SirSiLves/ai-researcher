# Warum dediziert / aktiv verfolgen — Governance, Enablement, Platform-Teams

_Live-Recherche (Web) · erstellt 2026-06-04 · Thema: Agentic Engineering — Mehrwert / Notwendigkeit / Hiring._

## Kernaussagen dieser Lane

- **Ein Tool zu kaufen genügt nicht — es scheitert an Menschen und Prozessen, nicht an Modellen.** Die MIT-NANDA-Studie findet, dass ~95 % der GenAI-Pilotprojekte keine messbare P&L-Wirkung erzielen; Ursache ist die "learning gap" und mangelnde Verankerung, nicht Modellqualität (MIT/Fortune, Aug 2025). Astrafy/McKinsey-Logik: "AI success is 10% algorithms, 20% data and technology, and 70% people, processes, and cultural transformation."
- **Ohne dedizierte Governance/Owner werden Projekte abgebrochen.** Gartner prognostiziert, dass **über 40 % der agentischen-KI-Projekte bis Ende 2027 gestrichen** werden — wegen eskalierender Kosten, unklarem Geschäftswert und "inadequate risk controls" (Gartner, 25.06.2025).
- **Das Tempo erzwingt aktives Mitverfolgen.** Neue KI-Modelle erscheinen aktuell "roughly every 3 days"; 59 Modelle in den letzten 90 Tagen (AI Flash Report, Stand 01.06.2026). Engineering-Teams müssen kontinuierliche Modell-Updates statt periodischer Upgrades managen.
- **Plattform/Enablement ist die Voraussetzung, nicht das Tool.** DORA 2025: "there is a direct correlation between a high quality internal platform and an organization's ability to unlock the value of AI" — und: "The value of AI is unlocked not by the tools themselves, but by the surrounding technical practices."
- **Lizenzen ohne Enablement verpuffen.** "Simply handing out licenses is not enough" — strukturiertes Enablement steigert Outcomes zweistellig; Booking.com brachte die Nutzung von <10 % auf ~70 % durch gezieltes Enablement (DX, 04.11.2025). Champion-Programme heben Adoption um bis zu 38 % (Faros/GitHub).
- **Governance-Lücke ist real und sicherheitskritisch.** Nur 34 % der Organisationen wenden auf KI-Agenten dieselben Sicherheitskontrollen an wie auf Menschen; 58 % hatten im letzten Jahr einen KI-Sicherheitsvorfall (Okta, 27.05.2026). Für Schweizer Banken zementiert FINMA 08/2024 die Pflicht zu klarer Verantwortung und unabhängiger Validierung.

## Belege

### Modell-Release-Kadenz: alle ~3 Tage ein neues Modell — Tracking wird zur Daueraufgabe
- **Aussage:** Neue KI-Modelle erscheinen aktuell "roughly every 3 days"; 59 Modelle in den letzten 90 Tagen, 120 insgesamt getrackt (Stand 01.06.2026). Konkrete Frühjahr-2026-Launches: Claude Opus 4.8 (28.05.2026), Qwen3.7 Max (19.05.2026), Gemini 3.5 Flash (19.05.2026).
- **Quelle:** AI Flash Report — AI Model Release Timeline 2025–2026 · Stand 01.06.2026
- **Link:** https://aiflashreport.com/model-releases.html
- **Datum:** 01.06.2026
- **Beleg-Zitat:** "New AI models currently arrive roughly every 3 days." / "59 models released in the last 90 days."
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### Okta: Governance-Lücke ist sicherheitskritisch — nur 34 % behandeln Agenten wie menschliche Identitäten
- **Aussage:** Nur 34 % der Organisationen wenden auf ihre agentische "Belegschaft" dieselben Sicherheitskontrollen an wie auf Menschen; 58 % der Führungskräfte meldeten im letzten Jahr einen KI-Sicherheitsvorfall oder Beinahe-Vorfall. Jeder Agent sollte als eigene Identität mit Lifecycle und granularen Rechten behandelt werden.
- **Quelle:** Okta — "AI Agents at Work 2026: Securing the agentic enterprise" · 27.05.2026
- **Link:** https://www.okta.com/newsroom/articles/ai-agents-at-work-2026-agentic-enterprise-security/
- **Datum:** 27.05.2026
- **Beleg-Zitat:** "Only 34% of organizations apply the same security controls to their agentic labor force as their human labor force."
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### Pace/Platform: KI-Agenten werden 2026 "first-class platform citizens" mit RBAC, Quoten und Governance
- **Aussage:** Bis 2026 behandeln reife Plattformen Agenten wie jede andere Nutzerpersona — mit RBAC, Ressourcenquoten und Governance-Policies; Plattform-Teams definieren "agent golden paths". Nicht-deterministischer Code erfordert die Plattform als Reviewer/Auto-Remediator.
- **Quelle:** PlatformEngineering.org — "10 Platform engineering predictions for 2026"
- **Link:** https://platformengineering.org/blog/10-platform-engineering-predictions-for-2026
- **Datum:** 2025/2026 (Predictions 2026)
- **Beleg-Zitat:** "By 2026, mature platforms will treat agents like any other user persona, complete with RBAC permissions, resource quotas, and governance policies."
- **Relevanz:** mehrwert
- **Stärke:** mittel

### AI-Center-of-Excellence: "paved roads" und Standards verwandeln Einzel-Experimente in skalierbare Praxis
- **Aussage:** Eine AI CoE als Plattform-/Standards-Funktion liefert Referenzarchitekturen, geprüfte Tools, Templates und "paved roadways", damit Teams autonom innerhalb definierter Grenzen arbeiten; sie eliminiert Reibung, reduziert Doppelarbeit und macht aus Einzel-Experimenten verlässliche, skalierbare Lösungen.
- **Quelle:** lakeFS Blog — "AI Center of Excellence" (Einat Orr, PhD) · akt. 23.03.2026
- **Link:** https://lakefs.io/blog/ai-center-of-excellence/
- **Datum:** 23.03.2026
- **Beleg-Zitat:** "When executed well, an AI CoE eliminates friction, reduces redundant effort, and turns one-off experiments into reliable, scalable solutions."
- **Relevanz:** hiring
- **Stärke:** mittel

### Hiring-Signal: Agentische-KI-Stellen +280 % YoY (~90.000 US-Postings); "AI Engineer" #1 schnellstwachsende Rolle
- **Aussage:** Agentische-KI-Stellenausschreibungen wuchsen +280 % YoY auf ~90.000 US-Postings (Stanford AI Index 2026); "forward-deployed engineer"-Listings +800 % in 2025; durchschnittliches Gehalt ~$190k, Senior-Agent-Rollen bei Frontier-Labs $300k–$550k. "AI Engineer" laut LinkedIn #1 der schnellstwachsenden US-Jobtitel; 63 % der Firmen melden KI-Talentmangel.
- **Quelle:** Jobs by Culture — "The Agentic AI Hiring Boom" (zit. Stanford AI Index 2026) · 09.05.2026
- **Link:** https://jobsbyculture.com/blog/agentic-ai-hiring-boom-2026
- **Datum:** 09.05.2026
- **Beleg-Zitat:** "agentic AI job postings grew 280% year-over-year, reaching roughly 90,000 US listings"
- **Relevanz:** hiring
- **Stärke:** mittel

### Gartner: 40% der Unternehmen müssen Agenten zurückstufen — Governance-Lücke

- **Aussage:** Gartner prognostiziert, dass bis 2027 40% der Unternehmen autonome KI-Agenten zurückstufen oder abschalten werden — wegen Governance-Lücken, die erst nach Produktionsvorfällen entdeckt werden. Einheitliche (statt differenzierter, eigens betreuter) Governance ist laut Gartner die Wurzel des Scheiterns.
- **Quelle:** Gartner Pressemitteilung (Shiva Varma, Senior Director Analyst) · 2026-05-26
- **Link:** https://enterprisedna.co/resources/news/gartner-ai-agent-governance-uniform-failure-2026/
- **Datum:** 2026-05-26
- **Beleg-Zitat:** "Enterprises are treating AI agent governance as binary, either locked down or fully trusted, and that is the root cause of failure."
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### DORA 2026: KI-ROI kommt aus dem Fundament, nicht aus dem Tool

- **Aussage:** Der DORA-Report "ROI of AI-Assisted Software Development" (Mai 2026) zeigt: Die grössten KI-Erträge stammen nicht aus den Tools, sondern aus dem zugrundeliegenden Organisationssystem (u.a. einer Quality Internal Platform). Ohne dieses Fundament erzeugt KI nur lokale Produktivitätsinseln, die im nachgelagerten Chaos verloren gehen.
- **Quelle:** DORA / Google Cloud (Nathen Harvey), via InfoQ · 2026-05-11
- **Link:** https://www.infoq.com/news/2026/05/dora-roi-ai-assisted-dev-report/
- **Datum:** 2026-05-11
- **Beleg-Zitat:** "Without this foundation, AI creates localized pockets of productivity that are often lost in downstream chaos."
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### McKinsey: Durchschnittsunternehmen betreibt agentische KI — kann sie aber nicht governen

- **Aussage:** McKinseys "State of AI Trust 2026" findet, dass nur rund ein Drittel der Organisationen eine für ihre bereits eingesetzten autonomen Agenten angemessene Governance-Reife erreicht; das Framework verlangt, dass jeder Agent katalogisiert wird mit definiertem Scope, Zugriffslevel und einem benannten, verantwortlichen Owner.
- **Quelle:** McKinsey State of AI Trust 2026 (Befragung Dez 2025–Jan 2026), via AgentMarketCap-Analyse · 2026-04-07
- **Link:** https://agentmarketcap.ai/blog/2026/04/07/mckinsey-ai-trust-2026-agentic-governance-framework
- **Datum:** 2026-04-07
- **Beleg-Zitat:** "The average enterprise is running agentic AI. The average enterprise is not ready to govern it."
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### Logicalis CIO-Report 2026: 89% "learning as we go", 62% machen Governance-Kompromisse

- **Aussage:** Im Logicalis 2026 CIO Report (über 1'000 CIOs global) beschreiben 89% den Ansatz ihrer Organisation als "learning as we go"; 62% berichten, bei Governance Kompromisse einzugehen, weil ihnen das Wissen fehlt, und nur 44% verstehen die Risiken der KI-Einführung vollständig — Governance, Skills und Infrastruktur kommen nicht mit dem Tempo mit.
- **Quelle:** Logicalis 2026 CIO Report · 2026-03-02
- **Link:** https://www.logicalis.com/insights/cio-report-2026-ai-investment-governance
- **Datum:** 2026-03-02
- **Beleg-Zitat:** "62% report compromising on governance due to limited knowledge and just 44% say they fully grasp the risks of AI adoption."
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### Grant Thornton 2026: Governance verwandelt ein Portfolio von Pilots in eine Performance-Engine

- **Aussage:** Im Grant Thornton 2026 AI Impact Survey (950 Führungskräfte, Feb–März 2026) geben 48% der Technologie-Leader an, dass Governance- oder Compliance-Barrieren zur Unterperformance ihrer KI beigetragen haben; der Report rahmt Governance als die Struktur, die ein Portfolio aus Pilots in eine Enterprise-Performance-Engine verwandelt.
- **Quelle:** Grant Thornton 2026 AI Impact Survey Report · 2026-04-21
- **Link:** https://www.grantthornton.com/insights/survey-reports/technology/2026/technology-2026-ai-impact-survey-report
- **Datum:** 2026-04-21
- **Beleg-Zitat:** "Governance is the structure that converts a portfolio of pilots into an enterprise performance engine."
- **Relevanz:** notwendigkeit
- **Stärke:** stark

### CNCF 2026-Forecast: generische Guardrails reichen nicht — Plattformteams müssen Kontrolle bauen

- **Aussage:** Der CNCF 2026-Forecast "The autonomous enterprise and the four pillars of platform control" argumentiert, dass autonome Agenten ein ausgereiftes Governance-Framework verlangen und ein generischer Guardrail-Ansatz unzureichend ist — Plattformteams müssen Golden Paths, Guardrails, Safety Nets und Review-Workflows bewusst als vernetzte Systeme designen.
- **Quelle:** CNCF Blog (2026 Forecast) · 2026-01-23
- **Link:** https://www.cncf.io/blog/2026/01/23/the-autonomous-enterprise-and-the-four-pillars-of-platform-control-2026-forecast/
- **Datum:** 2026-01-23
- **Beleg-Zitat:** "This new level of automation demands a sophisticated governance framework. A generic 'guardrail' approach is insufficient."
- **Relevanz:** notwendigkeit
- **Stärke:** mittel

### Anthropic 2026: KI in ~60% der Arbeit, aber nur 0–20% voll delegierbar — Mensch bleibt zentral

- **Aussage:** Anthropics 2026 Agentic Coding Trends Report findet, dass Engineers KI in rund 60% ihrer Arbeit nutzen, aber nur 0–20% der Aufgaben voll delegieren können — effektive Zusammenarbeit verlangt aktive menschliche Beteiligung über Setup, Prompting, Supervision und Validierung; die Koordinationsebene wird zum Hauptfokus der Engineering-Arbeit in Multi-Agent-Systemen.
- **Quelle:** Anthropic 2026 Agentic Coding Trends Report, via Hivetrail-Analyse · 2026-04-24
- **Link:** https://hivetrail.com/blog/anthropic-2026-agentic-coding-report/
- **Datum:** 2026-04-24
- **Beleg-Zitat:** "engineers report using AI in roughly 60% of their work - but describe being able to 'fully delegate' only 0–20% of tasks"
- **Relevanz:** mehrwert
- **Stärke:** stark

### Neue 2026-Rollen: AgentOps Engineer, AI Governance Specialist, AI Enablement Lead

- **Aussage:** Eine Übersicht der 2026 neu nachgefragten KI-Rollen nennt explizit AgentOps Engineers, AI Governance Specialists und AI Enablement Leads als dedizierte Funktionen — AgentOps-Engineers werden gebraucht, damit autonome Agenten in Produktion nicht driften, kollidieren oder ausfallen.
- **Quelle:** WeCloudData — "7 New AI Roles Organizations Are Hiring For in 2026" · 2026-06-03
- **Link:** https://weclouddata.com/blog/7-new-ai-roles-organizations-are-hiring-for-in-2026/
- **Datum:** 2026-06-03
- **Beleg-Zitat:** "As businesses move from static chatbots to autonomous agent workflows, they need engineers to ensure these agents don't drift, conflict, or fail in production."
- **Relevanz:** hiring
- **Stärke:** mittel

### Shadow-AI 2026: ein Fünftel bis ein Drittel arbeitet ausserhalb der IT-Governance

- **Aussage:** Die Lenovo "Work Reborn Research Series 2026" (6'000 Vollzeit-Beschäftigte) zeigt eine wachsende Lücke zwischen KI-Adoption der Mitarbeitenden und den Kontrollen der Organisation: zwischen einem Fünftel und einem Drittel der Beschäftigten nutzt KI ausserhalb von Einfluss und Governance der IT-Funktion; 31% erhalten gar kein Arbeitgeber-Training.
- **Quelle:** Lenovo Work Reborn Research Series 2026, via Help Net Security · 2026-05-01
- **Link:** https://www.helpnetsecurity.com/2026/05/01/shadow-ai-risks-it-oversight/
- **Datum:** 2026-05-01
- **Beleg-Zitat:** "Between one-fifth and one-third of workers use AI outside the influence and governance of the IT function."
- **Relevanz:** notwendigkeit
- **Stärke:** mittel

## Lücken / Unsicherheiten

- **FINMA-Originalwortlaut nicht direkt zitiert:** Der Guidance-08/2024-Volltext liegt nur als PDF vor; das obige Zitat stammt aus der MLL-News-Zusammenfassung (Paraphrase nahe am Original), nicht aus dem FINMA-Dokument selbst. Für die finale Vorlage sollte das FINMA-PDF direkt zitiert werden.
- **Gartner-Primärquelle blockiert:** Die Gartner-Pressemitteilung (gartner.com) lieferte HTTP 403/blockiert WebFetch; Zahlen (>40 %, Analystin Anushree Verma) sind über zwei unabhängige Sekundärquellen (Trullion, RCR/BigDATAwire-Suchtreffer) konsistent bestätigt, aber nicht von der Originalseite gefetcht.
- **EPAM-CoE-Quelle (403):** Das prägnante Zitat "The problem is not models or tools, but the absence of shared coordination" stammt aus dem EPAM-Artikel, der WebFetch mit 403 ablehnte; ersatzweise wurde die fetchbare lakeFS-CoE-Quelle verwendet.
- **Hiring-Zahlen:** Die +280 %/90.000-Postings-Angabe verweist auf den Stanford AI Index 2026, wurde aber über einen Sekundärartikel (Jobs by Culture) bestätigt, nicht am Stanford-Originalbericht verifiziert.
- **McKinsey-PDF:** Direkter PDF-Fetch lief zweimal in Timeout; Zahlen (21 %, 28 %, 17 %) stammen aus der gefetchten McKinsey-HTML-Übersichtsseite bzw. konsistenten Such-Snippets.
