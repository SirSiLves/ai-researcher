# Mehrwert II — Business-Wert, ROI, Kosten, Wettbewerbsvorteil

_Live-Recherche (Web) · erstellt 2026-06-04 · Thema: Agentic Engineering — Mehrwert / Notwendigkeit / Hiring._

## Kernaussagen dieser Lane

- **Mikro-Produktivität ist messbar und gross, aber nicht gleich Earnings:** Im kontrollierten GitHub-Copilot-Experiment lösten Entwickler eine Aufgabe **55 % schneller** (1h11 vs. 2h41, statistisch signifikant) — doch McKinsey hält fest, dass **über 80 % der Unternehmen keinen messbaren Earnings-Beitrag** aus ihren Gen-AI-Initiativen sehen ("Gen AI is everywhere — except in the company P&L"). (GitHub Research; McKinsey "Seizing the agentic AI advantage", Juli 2025)
- **Der ROI-Beweis ist hart:** Eine MIT-NANDA-Studie fand, dass **95 % der GenAI-Pilotprojekte keinen messbaren P&L-Effekt** liefern; Gartner prognostiziert, dass **über 40 % der Agentic-AI-Projekte bis Ende 2027 abgebrochen** werden (Kosten, unklarer Wert, fehlende Kontrollen). (Fortune/MIT, Aug. 2025; Gartner, Juni 2025)
- **Die Kostenfalle ist real und betrifft genau die Bank-Disziplin (Coding):** Uber verbrannte sein **gesamtes 2026-Coding-Tool-Budget in vier Monaten** (Claude Code/Cursor, ~5'000 Engineers, 150–2'000 USD/Engineer/Monat) und führte einen **1'500-USD-Monatscap** ein; der COO: "That link [zum Kundennutzen] is not there yet." (Fortune/TechCrunch, Mai/Juni 2026)
- **Token-Preise sinken, Rechnungen steigen:** Gartner sieht bis 2030 **~90 % günstigere Inferenz**, aber Agentic-Workloads verbrauchen 5–30× mehr Tokens pro Aufgabe; Goldman Sachs erwartet **24-fachen Token-Konsum bis 2030**. (Fortune, Mai 2026)
- **Das Markt-/Budgetsignal ist eindeutig:** Gartner beziffert weltweite KI-Ausgaben 2026 auf **2,59 Bio. USD (+47 %)**, davon **206,5 Mrd. USD für Agent-Software** (2027: 376,3 Mrd.); a16z taxiert die "AI Coding Opportunity" auf **3 Bio. USD**. (Gartner, Mai 2026; a16z)
- **Vendor-Belege für reale Geldströme:** Anthropics agentisches Coding-Tool **Claude Code erreichte >2,5 Mrd. USD Run-Rate** (mehr als verdoppelt seit Jahresbeginn 2026), Enterprise stellt >50 % des Umsatzes — ein Indikator, dass Unternehmen real für agentisches Engineering zahlen. (SaaStr/VentureBeat, Feb. 2026)

## Belege

### Gartner: >40 % der Agentic-AI-Projekte werden bis Ende 2027 abgebrochen (ROI-Skepsis)
- **Aussage:** Mehr als 40 % der Agentic-AI-Projekte werden bis Ende 2027 wegen steigender Kosten, unklaren Geschäftswerts und unzureichender Risikokontrollen abgebrochen; von tausenden "agentic" Anbietern bieten nur ~130 echte agentische Fähigkeiten ("agent washing").
- **Quelle:** Gartner Press Release / RCR Wireless · 25.–27.06.2025
- **Link:** https://www.rcrwireless.com/20250627/business/agentic-ai-gartner
- **Datum:** 2025-06-27
- **Beleg-Zitat:** "More than 40% of agentic AI projects will be cancelled by the end of 2027 as organizations struggle with rising costs, unclear business value and inadequate risk controls."
- **Relevanz:** gegenargument
- **Stärke:** stark

### MIT NANDA: 95 % der GenAI-Pilots ohne messbaren P&L-Effekt
- **Aussage:** Nur ~5 % der KI-Pilotprogramme erreichen schnelle Umsatzbeschleunigung; die grosse Mehrheit stagniert ohne messbaren P&L-Effekt. Zukauf von Spezialanbietern gelingt zu ~67 %, Eigenbauten nur ein Drittel so oft; grösster ROI im Back-Office und in Software Engineering.
- **Quelle:** Fortune (über MIT-NANDA-Report "The GenAI Divide: State of AI in Business 2025") · 18.08.2025
- **Link:** https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/
- **Datum:** 2025-08-18
- **Beleg-Zitat:** "about 5% of AI pilot programs achieve rapid revenue acceleration; the vast majority stall, delivering little to no measurable impact on P&L."
- **Relevanz:** gegenargument
- **Stärke:** stark

### McKinsey: >80 % der Firmen ohne Earnings-Beitrag ("Gen-AI-Paradox")
- **Aussage:** Trotz breiter Einführung (78 % haben GenAI implementiert) berichten über 80 % der Unternehmen keinen materiellen Earnings-Beitrag; McKinsey nennt dies das Gen-AI-Paradox und plädiert für agentische, funktionsspezifische ("vertikale") Use-Cases statt diffuser Copilots.
- **Quelle:** McKinsey "Seizing the agentic AI advantage", referiert von Digital Commerce 360 · 28.07.2025
- **Link:** https://www.digitalcommerce360.com/2025/07/28/mckinsey-ai-agents-enterprise-value/
- **Datum:** 2025-07-28
- **Beleg-Zitat:** "While 78% of companies have implemented some form of generative AI ... most of these deployments have failed to materially impact earnings. 'Gen AI is everywhere — except in the company P&L.'"
- **Relevanz:** gegenargument
- **Stärke:** stark

### GitHub Copilot: 55 % schnellere Aufgabenerledigung (kontrolliertes Experiment)
- **Aussage:** Im randomisierten Experiment (HTTP-Server-Task) waren Copilot-Nutzer 55 % schneller (1h11 vs. 2h41), mit höherer Abschlussrate (78 % vs. 70 %); 60–75 % fühlten sich erfüllter, 73 % blieben besser im "Flow".
- **Quelle:** GitHub Blog (Research) · 2022/2024 (Forschung)
- **Link:** https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/
- **Datum:** 2022-09 (mehrfach aktualisiert)
- **Beleg-Zitat:** "developers who used GitHub Copilot completed the task significantly faster–55% faster than the developers who didn't use GitHub Copilot ... [1h11m vs 2h41m] ... (P=.0017)."
- **Relevanz:** mehrwert
- **Stärke:** stark

### Uber: gesamtes 2026-Coding-Budget in 4 Monaten verbrannt — Nutzen unklar
- **Aussage:** Uber verbrauchte sein komplettes 2026-AI-Budget in vier Monaten (v. a. Claude Code/Cursor), ~10 % des committeten Codes stammen von autonomen Agenten; der COO bezweifelt den direkten Kundennutzen. (Folge-Berichte: ~5'000 Engineers, 150–2'000 USD/Monat, neuer 1'500-USD-Cap.)
- **Quelle:** Fortune · 26.05.2026 (Cap-Detail: TechCrunch, 02.06.2026)
- **Link:** https://fortune.com/2026/05/26/uber-coo-ai-spending-tokens-claude-code/
- **Datum:** 2026-05-26
- **Beleg-Zitat:** "That link is not there yet ... If you're not actually able to draw a direct line to how [many] useful features and functionality you're shipping to your users, that trade becomes harder to justify."
- **Relevanz:** gegenargument
- **Stärke:** stark

### Token-Ökonomie: Inferenz −90 % bis 2030, aber Agenten verbrauchen 5–30× mehr
- **Aussage:** Inferenz auf einem Billionen-Parameter-LLM kostet KI-Firmen bis 2030 fast 90 % weniger als 2025; doch agentische Modelle brauchen weit mehr Tokens pro Aufgabe — Goldman Sachs prognostiziert 24-fachen Token-Konsum bis 2030 (120 Billiarden Tokens/Monat). Nvidia-VP: "the cost of compute is far beyond the costs of the employees."
- **Quelle:** Fortune · 22.05.2026
- **Link:** https://fortune.com/2026/05/22/microsoft-ai-cost-problem-tokens-agents/
- **Datum:** 2026-05-22
- **Beleg-Zitat:** "by 2030, inference on a one-trillion-parameter LLM ... will cost AI firms nearly 90% less than it did in 2025 ... agentic models require far more tokens per task than standard models."
- **Relevanz:** kontext
- **Stärke:** stark

### Gartner: KI-Ausgaben 2026 = 2,59 Bio. USD; Agent-Software 206,5 Mrd.
- **Aussage:** Weltweite KI-Investitionen 2026 ~2,59 Bio. USD (+47 % ggü. 2025); Agent-Software-Ausgaben 206,5 Mrd. USD (2026) → 376,3 Mrd. (2027); 40 % der Enterprise-Apps mit task-spezifischen Agenten bis Ende 2026 (von <5 % zu Jahresbeginn).
- **Quelle:** Gartner-Forecast (19.05.2026), referiert von Enterprise DNA
- **Link:** https://enterprisedna.co/resources/news/gartner-worldwide-ai-spending-2-59-trillion-2026/
- **Datum:** 2026-05-19
- **Beleg-Zitat:** "Global AI investment is on track to reach $2.59 trillion this year — a 47% increase ... AI agent software spending will hit $206.5 billion in 2026 and jump to $376.3 billion in 2027."
- **Relevanz:** notwendigkeit
- **Stärke:** mittel

### DORA 2025: KI hebt Durchsatz, schadet aber der Liefer-Stabilität
- **Aussage:** 90 % der Befragten nutzen KI bei der Arbeit, >80 % berichten Produktivitätsgewinne; KI-Adoption korreliert positiv mit Durchsatz, aber negativ mit Liefer-Stabilität; 30 % vertrauen KI-generiertem Code wenig/nicht. Wert hängt mehr von Test-/Kontrollsystemen ab als vom Tool.
- **Quelle:** Google Cloud / DORA 2025 Report · veröffentlicht 2025
- **Link:** https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report
- **Datum:** 2025 (DORA 2025)
- **Beleg-Zitat:** "AI adoption does continue to have a negative relationship with software delivery stability ... AI accelerates software development, but that acceleration can expose weaknesses downstream."
- **Relevanz:** gegenargument
- **Stärke:** stark

### Anthropic / Claude Code: >2,5 Mrd. USD Run-Rate (agentisches Coding zahlt sich für Anbieter aus)
- **Aussage:** Claude Code (agentisches Coding-Tool, Mai 2025 gelauncht) erreichte >2,5 Mrd. USD Run-Rate-Umsatz, mehr als verdoppelt seit Jahresbeginn 2026; Anthropic gesamt 14 Mrd. USD ARR (von 1 Mrd. in ~14 Monaten), 80 % aus Enterprise, $100K+-Kunden 7× gewachsen.
- **Quelle:** SaaStr · Februar 2026
- **Link:** https://www.saastr.com/anthropic-just-hit-14-billion-in-arr-up-from-1-billion-just-14-months-ago/
- **Datum:** 2026-02
- **Beleg-Zitat:** "Claude Code ... now has run-rate revenue above $2.5 billion. That number has more than doubled since the start of 2026 ... $100K+ customers grew 7x in the past year."
- **Relevanz:** notwendigkeit
- **Stärke:** mittel

### Bain: 30–50 % Produktivitätsgewinn durch KI-Agenten (vergleichbar mit Offshoring-Welle)
- **Aussage:** Bain prognostiziert in den meisten Funktionen 30–50 % Produktivitätsgewinne durch KI-Agenten — in der Grössenordnung der Globalisierungs-/Offshoring-Welle des 20. Jh.; Workflow-Zyklen verkürzen sich "von Wochen auf Tage".
- **Quelle:** Bain & Company, "The AI Enterprise: Code Red" · Februar 2026
- **Link:** https://www.bain.com/insights/ai-enterprise-code-red/
- **Datum:** 2026-02
- **Beleg-Zitat:** "we predict 30%–50% productivity gains from deploying AI agents to augment or automate knowledge work, comparable in magnitude to the globalization and offshoring wave of the 20th century."
- **Relevanz:** mehrwert
- **Stärke:** mittel

### Bain CFO-Survey: Skalierer doppelt so zufrieden — Budgets steigen stark
- **Aussage:** Unter CFOs, die KI in Produktion skaliert haben, bewerten 41 % die Ergebnisse als stark positiv (vs. 25 % im Pilotmodus); 56 % erhöhen die unternehmensweiten KI-Investitionen 2026 um >15 %, 42 % erwarten >30 %. Hauptnutzen: Geschwindigkeit/Zykluszeit (48 %) vor Kosteneinsparung (34 %).
- **Quelle:** Bain & Company, "CFOs Funded the AI Revolution. Now They're Joining It." · April 2026
- **Link:** https://www.bain.com/insights/cfos-funded-ai-revolution-now-they-are-joining-it/
- **Datum:** 2026-04
- **Beleg-Zitat:** "41% report being satisfied with outcomes, vs. 25% of those still in pilot mode ... 56% are increasing enterprise-wide AI investment by more than 15% this year ... Speed and cycle-time reduction leads at 48%."
- **Relevanz:** mehrwert
- **Stärke:** mittel

### Deloitte State of AI 2026: Produktivität für viele, Umsatz für wenige
- **Aussage:** 34 % der Firmen nutzen KI bereits zur tiefen Transformation; nur 25 % haben ≥40 % ihrer Pilots in Produktion überführt (54 % erwarten dies in 3–6 Monaten); nur 21 % haben ein reifes Governance-Modell für autonome Agenten. (Befragung: 3'235 Leader, 24 Länder, Aug.–Sep. 2025.)
- **Quelle:** Deloitte, "State of AI in the Enterprise 2026" (Pressemitteilung) · 2026
- **Link:** https://www.deloitte.com/us/en/about/press-room/state-of-ai-report-2026.html
- **Datum:** 2026
- **Beleg-Zitat:** "only 25% of respondents have moved 40% or more of their AI pilots into production ... 54% expecting to reach that level in the next three to six months ... only 21% ... report having a mature model for agent governance."
- **Relevanz:** kontext
- **Stärke:** mittel

### a16z: "3-Billionen-Dollar-AI-Coding-Chance"
- **Aussage:** a16z taxiert die wirtschaftliche Gelegenheit für KI-gestütztes/agentisches Coding auf 3 Bio. USD; "agents with environments" verändern den Dev-Loop, Repos/PRs brauchen neue Abstraktionen.
- **Quelle:** Andreessen Horowitz (a16z Infra Podcast) · 2026
- **Link:** https://a16z.com/podcast/the-3-trillion-ai-coding-opportunity/
- **Datum:** 2026
- **Beleg-Zitat:** "The $3 Trillion AI Coding Opportunity ... how 'agents with environments' are changing the dev loop; why repos and PRs may need new abstractions; and where ROI is showing up first."
- **Relevanz:** notwendigkeit
- **Stärke:** schwach

## Lücken / Unsicherheiten

- **Bank-spezifische, primär belegte Coding-ROI-Zahlen fehlen:** Mehrfach kursierende Werte ("Bank −50 % Entwicklungsaufwand", "Regionalbank +40 % Entwicklerproduktivität, >80 % der Engineers positiv", ">60 % Produktivität / >3 Mio. USD Ersparnis", "HSBC/Citi/UBS/DBS/ING Kosten −20–40 %") tauchten nur in Sekundär-/Aggregator-Quellen auf und konnten nicht auf einer Primärseite (McKinsey/Bank-Pressemitteilung) verifiziert werden — bewusst NICHT als Beleg aufgenommen.
- **Mehrere Primärquellen blockierten WebFetch (HTTP 403 / Timeout):** McKinsey-PDF "Seizing the agentic AI advantage", McKinsey-Workforce-Artikel, Gartner-Originalseiten und die offizielle Gartner-Spending-PR. Die zentralen McKinsey-/Gartner-Zahlen sind daher über seriöse Sekundärquellen (Digital Commerce 360, RCR Wireless, Enterprise DNA, Fortune) bestätigt, nicht über die Originalseite.
- **Anthropic "2026 Agentic Coding Trends Report":** Landing-Page ohne Zahlen abrufbar; die quantitativen Detailwerte (z. B. "Net-Output steigt stärker als Zeit pro Aufgabe sinkt", 19,3 % Netto-Produktivität) stammen aus Sekundärzusammenfassungen und sind nicht direkt aus dem Primärbericht zitiert — als unbestätigt zu behandeln.
- **"Cost per merged PR" als ROI-Metrik:** Konzept taucht in Praktiker-/Vendor-Texten auf (Claude Code "4:1"), aber ohne unabhängige, primäre Bestätigung — nicht als harter Beleg verwendbar.
- **Hohe Streuung bei Cost-per-task-Zahlen:** Werte wie "2–8 USD pro Coding-Task vs. 50–200 USD/h Entwickler" stammen aus Marketing-/Blog-Quellen mit unklarer Methodik; Richtung plausibel, Präzision unsicher.
