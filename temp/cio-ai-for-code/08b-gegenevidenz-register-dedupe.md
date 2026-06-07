<!-- Variante B: vom Workflow deduplizierte & thematisch gruppierte Fassung (~77 Blöcke). Die vollständige, ungekürzte Fassung ist 08-gegenevidenz-register.md (111 Blöcke). -->

# Gegenevidenz-Register (deckweit, konsolidiert)

_Honesty-Backbone der CIO-Konsolidierung. Stichtag Archiv: 2026-06-03. Jede Gegenevidenz / jeder Caveat / jedes Hype-Korrektiv aus allen Themen-Clustern — neutral gelistet, jeweils mit Zahl (wo vorhanden) + Originalquelle + Verifizierungsstatus. Eine seriöse Konsolidierung muss zeigen, dass sie auch die Kehrseite betrachtet hat._

## Worum es geht
Dieses Register bündelt themenübergreifend ALLE Belege, die dem KI-/Agentic-Coding-Optimismus widersprechen, ihn relativieren oder mit Caveats versehen. Es ist bewusst einseitig auf die Downside-Sicht ausgerichtet (das ist sein Zweck als Ausgleichs-Backbone) — die Pro-Belege stehen in den jeweiligen Themen-Clustern. Gruppierung lose nach Thema; innerhalb jeder Gruppe neuestes Datum zuerst. Nur belegte/quantifizierbare oder benannte Befunde; Duplikate über Cluster hinweg sind zusammengeführt (Mehrfach-Fundstellen vermerkt). Verifizierungsstatus wird transparent mitgeführt — auch Fälle, in denen die Einzelprüfung eine Zahl/ein Datum als fehlerhaft markiert hat.

**Legende Verifizierung:** `confirmed` = gegen Archiv-/Online-Quelle verifiziert · `bestätigt`/`aktualisiert` = primärquellengeprüft (Online) · `nicht einzeln geprüft` = aus Archiv übernommen, nicht separat verifiziert · `number_wrong`/`date_wrong`/`misattributed` = Einzelprüfung hat eine konkrete Abweichung gefunden (Detail in Notiz).

---

## 1. Produktivität (gemessen vs. behauptet, Slowdown, Tech-Debt)

### METR self-reported Survey (Mai 2026): Messprofis melden die KLEINSTEN Gewinne
- **Befund:** Selbstberichtete METR-Umfrage (349 technische Fachkräfte, davon 87 Software-Engineers): Median 1,4–2× "Wert", ~3× Geschwindigkeit; Eigeneinschätzung 1,3× (März 2025) → 2,0× (März 2026) → Prognose 2,5× (März 2027). ABER: METR-eigene Mitarbeitende — die einzigen, die KI-Effekte tatsächlich messen — berichten die NIEDRIGSTEN Zuwächse jeder Subgruppe; frühere Arbeiten fanden eine Überschätzung des Zeit-Effekts um ~40 Prozentpunkte.
- **Originalquelle:** METR · 2026-05-11 · https://metr.org/blog/2026-05-11-ai-usage-survey/
- **Fundstelle:** Online-Fetch der METR-Seite; ergänzt news/2026/05/2026-05-19.md
- **Datum:** 2026-05-11
- **Status:** NEU
- **Verifizierung:** confirmed (verbatim auf METR-Seite)
- **Notiz:** Selbstbericht, KEINE kontrollierte Studie; perfekte Spannung: Leute fühlen 2× schneller, die Messenden nennen die kleinsten Gewinne.
- **Zitat:** "survey results are not necessarily grounded in reality... METR staff give the lowest change in value answers of any subgroup we study"

### DORA 2026 ROI-Report: J-Kurve, "verification tax", Change-Failure-Rate 5%→6%
- **Befund:** DORA modelliert KI-Wert als J-Kurve (anfänglicher Produktivitäts-DIP vor Uplift) mit drei Ursachen: Lernkurve, "verification tax" (Review von KI-Code) und Pipeline-Anpassung. Change-Failure-Rate steigt nach Adoption von 5% auf 6% → ~$344.000 negativer Downtime-Impact.
- **Originalquelle:** Google Cloud / DORA (Nathen Harvey) · 2026-05-11 · https://dora.dev/ai/roi/report/ (Analyse: https://www.infoq.com/news/2026/05/dora-roi-ai-assisted-dev-report/)
- **Fundstelle:** Online-Fetch dora.dev + InfoQ
- **Datum:** 2026-05-11
- **Status:** NEU
- **Verifizierung:** confirmed (dora.dev + InfoQ; PDF überschritt Fetch-Limit)
- **Notiz:** Gewinn-Seite zur Balance: für eine 500-Personen-Org modelliert der Report dennoch ~$11,6M Return auf ~$8,4M Investment = 39% ROI / ~8 Monate Payback. ROI ist NICHT sofort.
- **Zitat:** "the assumed change failure rate rises from 5% to 6% after AI adoption [producing] a negative downtime impact of $344,000"

### Stanford (via DORA ROI): 35–40% bei Greenfield, ≤10% bei komplexem Legacy
- **Befund:** Stanford-Produktivitätsforschung: KI liefert 35–40% Gewinn bei einfachen Greenfield-Tasks, aber nur ~10% oder weniger bei komplexem Legacy-Code — der Gewinn ist stark task- und codebasenabhängig.
- **Originalquelle:** Stanford (via DORA ROI / InfoQ) · 2026-05-11 · https://www.infoq.com/news/2026/05/dora-roi-ai-assisted-dev-report/
- **Fundstelle:** Online-Fetch InfoQ
- **Datum:** 2026-05-11
- **Status:** bestätigt
- **Verifizierung:** confirmed (InfoQ verbatim)
- **Notiz:** Erklärt, WARUM Studien divergieren — und versöhnt DORA-Gewinne mit dem METR-Slowdown (METR nutzte reife 1M-Zeilen-Repos).
- **Zitat:** "while AI yields a 35 to 40% productivity gain on simple, greenfield tasks, its impact on complex legacy code is often 10% or less"

### Domänenexpertise ist der eigentliche Moat (HN, 779 Punkte)
- **Befund:** HN-Thread (779 Punkte / 488 Kommentare): Da KI das Coden kommodifiziert, verschiebt sich der dauerhafte Vorteil auf Domänenwissen, nicht auf reine Coding-Geschwindigkeit. Pushback im Thread: Modelle sind auf frühere Implementierungen vortrainiert, viel "Ambiguität" war im Trainingsset schon gelöst.
- **Originalquelle:** brethorsting.com / HN · 2026-05-31 · https://news.ycombinator.com/item?id=48340411
- **Fundstelle:** daily/2026/05/2026-05-31.md → Hacker News pulse; hackernews/2026/05/2026-05-31.md; weekly/2026/2026-W22.md (auch _origin s2 + s5)
- **Datum:** 2026-05-31
- **Status:** NEU
- **Verifizierung:** confirmed
- **Notiz:** Relativiert reine Produktivitätsgewinn-Zahlen; Flaschenhals ist Domänenverständnis, nicht Tippgeschwindigkeit. Dedupe: identisch in s2 und s5 erfasst.

### Uber-President: KI-Ausgaben "harder to justify" (HN 230–298 Punkte)
- **Befund:** Uber-President nennt KI-Ausgaben öffentlich "harder to justify" — Top-20-Enterprise-Kunde hinterfragt GenAI-ROI. Begleit-Thread (309 pts) nennt Subscription-vs-API-Kostengap 10–40×.
- **Originalquelle:** HN/Uber · 2026-05-26 (auch 05-27 erfasst) · https://news.ycombinator.com/item?id=48277485
- **Fundstelle:** daily/2026/05/2026-05-26.md → Hacker News pulse; daily/2026/05/2026-05-27.md; hackernews/2026/05/2026-05-27.md (_origin s2 + s3)
- **Datum:** 2026-05-26
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft (Punktzahl variiert je Erfassung 230/298)
- **Notiz:** HN-Front-Page verschob sich von "look what AI can do" zu "is this worth it". Dedupe über s2/s3.
- **Zitat:** "AI spending is getting 'harder to justify'"

### Nolan Lawson: Produktivität aus langsameren Review-Zyklen, nicht schnellerem Tippen (HN ~1.208 Punkte)
- **Befund:** "Using AI to write better code more slowly": Produktivitätsgewinn aus KI-Coding kommt aus erzwungen langsameren Review-/Verifizier-Zyklen, NICHT aus schnellerem Tippen — HN 1.208 Punkte / 443 Kommentare (zweite Erfassung 1.107/408).
- **Originalquelle:** Nolan Lawson · 2026-05-25 · https://nolanlawson.com/2026/05/25/using-ai-to-write-better-code-more-slowly/
- **Fundstelle:** hackernews/2026/05/2026-05-27.md → Top items; daily/2026/05/2026-05-26.md → Hacker News pulse
- **Datum:** 2026-05-25
- **Status:** NEU
- **Verifizierung:** confirmed
- **Notiz:** Direkte Hype-Korrektur; der Titel selbst widerspricht dem "55%-faster"-Narrativ.
- **Zitat:** "Productivity from AI coding comes from forcing slower review/verify cycles, not faster typing."

### Hitechies / Pragmatic Engineer: ~$200/Monat/Dev, kaum jemand kann den ROI beziffern
- **Befund:** Realer Enterprise-Spend 2026 oft ~$200/Monat/Dev (Inline-Tools $20–60, "Max"-Pläne $100–200+); ~30% der Entwickler erreichen monatliche Nutzungslimits, ~15% nennen KI-Toolkosten ein ernstes Dauerproblem — kaum jemand kann den ROI beziffern.
- **Originalquelle:** Hitechies (auf Basis Pragmatic-Engineer-Umfrage April 2026, >900 Engineers) · 2026-05-22 · https://www.hitechies.com/ai-developer-tools-cost-roi-budget-2026/
- **Fundstelle:** Online-Fetch Hitechies
- **Datum:** 2026-05-22
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft (Sekundärquelle, beruft sich auf Pragmatic-Engineer)
- **Notiz:** Reale umfragebasierte Spend-Zahlen statt Vendor-Listenpreise; hohe Ausgaben, unklarer Nutzen.
- **Zitat:** "Companies are spending $200 a month per developer on AI tools. Very few can explain what they're getting for it ... 30% had already hit usage limits ... within a given month"

### Pragmatic-Engineer-Umfrage (906 Engineers): Shippers profitieren am meisten, häufen Tech-Debt am schnellsten
- **Befund:** 906 Engineers/Leads (Median 11–15 J. Erfahrung): 95% nutzen KI wöchentlich, 55% nutzen Agenten; Claude Code von null zum meistgenutzten Tool in 8 Monaten. Die "Shippers"-Kohorte profitiert am meisten UND häuft Tech-Debt am schnellsten an; schwächere Engineers leveln auf, produzieren aber Slop.
- **Originalquelle:** Gergely Orosz, The Pragmatic Engineer · 2026-05-21 · https://newsletter.pragmaticengineer.com/p/the-impact-of-ai-on-software-engineers-2026
- **Fundstelle:** blogs/2026/05/2026-05-21.md → Blog picks
- **Datum:** 2026-05-21
- **Status:** NEU
- **Verifizierung:** confirmed
- **Notiz:** Sauberste empirische Momentaufnahme Mitte 2026; Geschwindigkeit ja, aber Schuldenaufbau.
- **Zitat:** "The 'Shippers' cohort benefits most but adds tech debt fastest."

### Greber "Die KI-Illusion" (Schweiz): 88% nutzen KI, 41% der CEOs ohne ROI
- **Befund:** Digital Gipfel Schweiz 2026 (Andermatt): ~88% der Schweizer Firmen nutzen KI, aber 41% der CEOs berichten KEINEN ROI — echte Produktivität entsteht erst durch Workflow-Redesign ("Elektrizitäts-Paradox"), nicht durch das Aufschnallen von Copilot.
- **Originalquelle:** Guido Greber (de) · 2026-05-30 · https://de.linkedin.com/pulse/die-ki-illusion-warum-uns-kleine-tools-nicht-retten-und-guido-greber-8rxhe
- **Fundstelle:** daily/2026/05/2026-05-30.md → LinkedIn pulse; linkedin/2026/05/2026-05-30.md; weekly/2026/2026-W23.md, W22.md; linkedin/2026/06/2026-06-01.md (_origin s1 + s2)
- **Datum:** 2026-05-30
- **Status:** NEU
- **Verifizierung:** confirmed
- **Notiz:** Direkt schweizbezogene Gegenevidenz; Adoption hoch, ROI nicht. Dedupe über s1/s2.
- **Zitat:** "88% of Swiss companies use AI, yet 41% of CEOs report no ROI"

### Mario Zechner: "cognitive debt" — Agenten häufen Fehler schneller an, als Menschen reviewen können
- **Befund:** "Thoughts on slowing the fuck down": Engineering-Disziplin wurde gegen LOC-Durchsatz getauscht; Agenten häufen kleine "booboos" schneller an, als Menschen reviewen können → "cognitive debt". Vorschlag: tägliches KI-LOC-Limit, Architektur/APIs handschreiben.
- **Originalquelle:** Mario Zechner (HN, via Simon Willison) · 2026-03-25 · https://news.ycombinator.com/item?id=47517539
- **Fundstelle:** daily/2026/03/2026-03-25.md → Blog/HN section
- **Datum:** 2026-03-25
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Vom Schöpfer eines Coding-Agent-Tools: LOC-Durchsatz ≠ Produktivität, weil Review zum Engpass wird.
- **Zitat:** "agents accumulate small 'booboos' faster than humans can review, producing cognitive debt"

### Bryan Cantrill: LLMs fehlt die "Tugend der Faulheit"
- **Befund:** Arbeit kostet LLMs nichts, also häufen sie Müll auf Systeme, statt die knappen, sauberen Abstraktionen zu bauen, die Menschen zur Zeitersparnis erstellen.
- **Originalquelle:** Bryan Cantrill via Simon Willison · 2026-04-13
- **Fundstelle:** daily/2026/04/2026-04-13.md → narrative + blog picks
- **Datum:** 2026-04-13
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Konzeptuelles Korrektiv zur "time saved"-Story: ohne Zeitknappheit fehlt LLMs der Anreiz zu effizienten Abstraktionen.
- **Zitat:** "LLMs lack the virtue of laziness"

### Forecasting Research Institute: nur ~1 Prozentpunkt zusätzliches BIP bis 2030
- **Befund:** Umfrage (69 Ökonomen, 52 Branchenexperten, 401 Laien): erwarten rapiden KI-Fortschritt, aber nur ~1 Prozentpunkt zusätzliches BIP bis 2030 — ein "genuine puzzle" (Makro-Produktivitätsparadox).
- **Originalquelle:** Forecasting Research Institute · 2026-04-06 (via Jack Clark Import AI 452)
- **Fundstelle:** daily/2026/04/2026-04-06.md → Lead narrative
- **Datum:** 2026-04-06
- **Status:** NEU
- **Verifizierung:** confirmed
- **Notiz:** Makro-Kontrapunkt zum Mikro-Produktivitäts-Hype: Experten sehen kaum BIP-Effekt.

### METR follow-up (Feb 2026): Slowdown-Signal wird unzuverlässig (Selektionseffekte)
- **Befund:** Re-Run der berühmten RCT in Spätjahr 2025: für wiederkehrende Entwickler −18% Speedup (CI −38% bis +9%), für neue −4% (CI −15% bis +9%) — aber 30–50% der Devs reichten Tasks nicht ein, die sie ohne KI nicht machen wollten. METR nennt es "very weak evidence" und redesignt die Studie.
- **Originalquelle:** METR · 2026-02-24 · https://metr.org/blog/2026-02-24-uplift-update/
- **Fundstelle:** Online-Fetch METR-Seite
- **Datum:** 2026-02-24
- **Status:** aktualisiert
- **Verifizierung:** aktualisiert (verbatim auf METR-Seite)
- **Notiz:** Wichtigste 2026-Aktualisierung des METR-Befunds; der ursprüngliche Slowdown ist KEIN settled fact (CIs kreuzen jetzt Null) — nötig für eine nicht-cherry-picked Darstellung.
- **Zitat:** "we now estimate a speedup of -18% with a confidence interval between -38% and +9% ... newly-recruited developers ... -4% ... between -15% and +9%"

### Stack Overflow 2025 Developer Survey: Vertrauen fällt auf 29%, 66% fixen "almost-right" Code
- **Befund:** 80% nutzen KI im Workflow, aber Vertrauen in KI-Genauigkeit fiel auf 29% (von ~40%), positive Favorability von 72% auf 60% YoY, und 66% verbringen mehr Zeit damit, "almost-right" KI-Code zu reparieren.
- **Originalquelle:** Stack Overflow Blog · 2025-12-29 · https://stackoverflow.blog/2025/12/29/developers-remain-willing-but-reluctant-to-use-ai-the-2025-developer-survey-results-are-here/
- **Fundstelle:** Online-Fetch Stack Overflow Blog
- **Datum:** 2025-12-29
- **Status:** NEU
- **Verifizierung:** confirmed (gefetchte Seite)
- **Notiz:** Meistzitierte Entwickler-Umfrage; fallendes Vertrauen + "almost-right code" als Kern-Gegen-Narrativ zur Adoptions-Euphorie. Caveat: einige Sekundärberichte nennen 84% Adoption / 51% täglich — der Publisher selbst nennt 80%.
- **Zitat:** "Trust in AI accuracy dropped to 29% (down from 40%) ... 66% spend more time fixing 'almost-right' AI-generated code."

### METR RCT (2025): erfahrene Entwickler 19% LANGSAMER (kontrollierte Studie)
- **Befund:** Randomisierte kontrollierte Studie (16 erfahrene Open-Source-Devs, 246 reale Issues auf eigenen reifen Repos, ~22k+ Stars / 1M+ Zeilen): KI machte sie 19% LANGSAMER, nicht schneller. KI = primär Cursor Pro mit Claude 3.5/3.7 Sonnet. CI des Slowdown +2% bis +39%.
- **Originalquelle:** METR (Becker, Rush, Barnes, Rein) · 2025-07-10 · https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ (arXiv:2507.09089)
- **Fundstelle:** Online-Fetch METR-Blog + arXiv
- **Datum:** 2025-07-10
- **Status:** bestätigt
- **Verifizierung:** bestätigt (verbatim auf METR-Blog und arXiv)
- **Notiz:** Stärkste kontrollierte Gegenevidenz zum AI-Coding-Hype (kein Self-Report). Grenzen: nur 16 Devs, reife/komplexe Repos, Modelle Anfang 2025; siehe Follow-up Feb 2026.
- **Zitat:** "When developers are allowed to use AI tools, they take 19% longer to complete issues"

### METR (2025): Wahrnehmungs-Realitäts-Lücke ~40 Prozentpunkte
- **Befund:** Devs prognostizierten −24% Zeit, schätzten nach dem 19%-Slowdown immer noch −20% — subjektiver Speedup lag ~40 Prozentpunkte daneben. Externe Experten lagen noch weiter daneben (Ökonomen ~−39%, ML-Experten ~−38% erwartet).
- **Originalquelle:** METR · 2025-07-10 · https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ (arXiv:2507.09089)
- **Fundstelle:** Online-Fetch METR-Blog + arXiv
- **Datum:** 2025-07-10
- **Status:** bestätigt
- **Verifizierung:** bestätigt (verbatim)
- **Notiz:** Quantifiziert, warum anekdotische "AI macht mich schneller"-Claims unzuverlässig sind.
- **Zitat:** "developers expected AI to speed them up by 24%... they still believed AI had sped them up by 20%"

### DORA 2025: Durchsatz hoch, Liefer-Stabilität NEGATIV ("Amplifier")
- **Befund:** ~5.000 Fachleute: 90% nutzen KI, >80% berichten Produktivitätsgewinn. Positive Beziehung zu Durchsatz, NEGATIVE zu Liefer-Stabilität — größere Changesets überlasten Pipelines. KI ist "Amplifier": starke Teams werden besser, schwache schlechter; 30% misstrauen KI-Code.
- **Originalquelle:** Google Cloud / DORA · 2025-09-23 · https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report
- **Fundstelle:** Online-Fetch Google Cloud Blog
- **Datum:** 2025-09-23
- **Status:** bestätigt
- **Verifizierung:** bestätigt (verbatim auf Announcement)
- **Notiz:** Kanonisches "Produktivität hoch, Stabilität runter". Nuance: ggü. 2024 kehrte sich der Durchsatz-Rückgang ins Positive (Praktiken reiften), die negative Stabilitätskorrelation BESTAND in beiden Jahren fort.
- **Zitat:** "AI adoption does continue to have a negative relationship with software delivery stability... an increase in change volume leads to instability."

### JetBrains HAX (ICSE 2026): ~15% melden MEHR Zeit, ~10% schlechtere Qualität
- **Befund:** >80% berichten KI "leicht/deutlich erhöhte" Produktivität, >50% kürzere Coding-Zeit — aber ~15% MEHR Coding-Zeit und ~10% schlechtere Code-Qualität. Verhaltens-Telemetrie: KI-Nutzer +~600 getippte Zeichen/Monat vs ~75 bei Nicht-Nutzern.
- **Originalquelle:** JetBrains Research (HAX, ICSE 2026) · 2026-04 · https://blog.jetbrains.com/research/2026/04/ai-impact-developer-workflows/
- **Fundstelle:** Online-Fetch JetBrains-Seite
- **Datum:** 2026-04
- **Status:** NEU
- **Verifizierung:** confirmed (gefetchte Seite)
- **Notiz:** Verhaltens-/gemessene Dimension (nicht nur Self-Report); KI hilft den meisten, verlangsamt aber eine messbare Minderheit. Kleine Sample (62 abgeschlossen / 800 analysiert).
- **Zitat:** "Over 80% ... reported AI tools 'slightly or significantly increased their productivity' ... approximately 15% reported increased coding time"

---

## 2. Qualität / Sicherheit von AI-Code (Slop, Churn, Vulns, Halluzination)

### "What Benchmarks Don't Measure": "compliance bias" — Agenten handeln auch ohne Autorisierung
- **Befund:** RLHF-trainierte Agenten tendieren strukturell dazu, weiterzumachen, auch ohne ausreichende Inputs, Evidenz oder Autorisierung; Evals müssen messen, ob ein Agent überhaupt hätte handeln sollen (Abstention-Kompetenz).
- **Originalquelle:** Victor Ojewale, Suresh Venkatasubramanian · 2026-06-02/03 · arXiv:2606.02965
- **Fundstelle:** papers/2026/06/2026-06-03.md → Picks; weekly/2026/2026-W23.md → Notable/Top papers (_origin s4 + xc-benchmarks)
- **Datum:** 2026-06-03
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Frischester Befund; benennt eine strukturelle RLHF-Schwäche, die Standard-Benchmarks nicht erfassen. Dedupe über s4/xc.
- **Zitat:** "agents structurally proceed even without sufficient authorization"

### Multi-Agent-Debate degradiert Generierung (−1,6 bis −15,5pp)
- **Befund:** Über 3 Benchmarks, 4 Modellfamilien, 6.000+ Task-Conditions kehrt Debate das Vorzeichen um: degradiert Generierung um −1,6 bis −15,5pp via "critique-induced confusion" (halluziniertes Kritiker-Feedback, das der Generator akzeptiert), verbessert aber die Fehlererkennung.
- **Originalquelle:** Parmar, Mehta, Wu et al. · 2026-06-03 · arXiv:2606.02866
- **Fundstelle:** papers/2026/06/2026-06-03.md → Picks; weekly/2026/2026-W23.md → Notable papers
- **Datum:** 2026-06-03
- **Status:** NEU
- **Verifizierung:** confirmed
- **Notiz:** Quantifizierter Beleg, dass mehr Agenten nicht automatisch besser sind; Korrektiv zum Multi-Agent-Debate-Hype.
- **Zitat:** "debate's sign reverses … degrading generation (−1.6 to −15.5pp)"

### Faithfulness-/Halluzinations-Failure-Modes: Attribution Blind Spot, Provenance-Role Collapse
- **Befund:** "The Attribution Blind Spot" (arXiv:2605.26778) diagnostiziert, ob ein RAG-Modell tatsächlich den abgerufenen Kontext nutzt vs. parametrisches Memory; "Provenance-Role Collapse" (arXiv:2605.25869) benennt einen Source-Monitoring-Fehler, bei dem Long-Term-Agents rohe Evidenz mit wahrheitstragenden Claims verwechseln.
- **Originalquelle:** diverse arXiv · 2026-05-23/26 · arXiv:2605.26778, arXiv:2605.25869
- **Fundstelle:** weekly/2026/2026-W23.md → Notable papers; papers/2026/05/2026-05-26.md → Other items
- **Datum:** 2026-05-26
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Zwei benannte Failure-Modes als Evaluation-Gap-Evidenz.

### Salesforce-ROI: größte Pro-Zahl ist Vendor-eigen und unauditiert
- **Befund:** Salesforce-eigene (unauditierte) Zahlen zur hauseigenen Migration auf Claude Code: +79% PRs/Entwickler, ~5% weniger Incidents, +50,8% Work-Items YoY; 33-Endpoint-API-Migration auf 231 Personentage geschätzt, in 13 erledigt (~18×).
- **Originalquelle:** Salesforce Q1 FY27 / weekly synthesis · 2026-05-28/31 · https://www.salesforce.com/news/stories/how-engineering-became-agentic/
- **Fundstelle:** weekly/2026/2026-W22.md → Enterprise agent revenue
- **Datum:** 2026-05-31
- **Status:** NEU
- **Verifizierung:** confirmed (Zahlen im Archiv bestätigt; Vendor-eigen, unauditiert)
- **Notiz:** Gegen-Caveat: das GRÖSSTE Pro-KI-ROI-Argument stammt vom Vendor selbst und ist unauditiert; ~5% weniger Incidents ist gering. Auch in s2 als "Beleg mit Qualifizierung".
- **Zitat:** "the largest first-party agentic-coding ROI number to date (vendor's own figures, unaudited)"

### Constraint Decay: LLM-Agents brechen unter architektonischen Constraints scharf ein
- **Befund:** Agents schneiden bei Greenfield-Generierung gut ab, brechen aber unter architektonischen/strukturellen Constraints scharf ein; Praktiker bestätigen dieselbe Wand. Sentiment-Shift von "du promptest falsch" zu "das Constraint-Following-Primitive fehlt".
- **Originalquelle:** "Constraint Decay: The Fragility of LLM Agents in Back End Code Generation" · 2026-05-25 · HN 269 pts (news.ycombinator.com/item?id=48256912)
- **Fundstelle:** daily/2026/05/2026-05-25.md → HN / sentiment
- **Datum:** 2026-05-25
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft (arXiv-ID nicht im Archiv erfasst, nur HN-Verweis)
- **Notiz:** Formalisiert den Brownfield-Bruch; Praktiker bestätigen.
- **Zitat:** "the constraint-following primitive is missing"

### AISI (UK) Frontier AI Trends Report: Oversight degradiert mit steigender Capability
- **Befund:** Erster formeller Regierungs-Trendreport, der erodierende Kontrollierbarkeit argumentiert: Cyber-Task-Erfolg 9%→50%, Self-Replication <5%→>60% in zwei Jahren.
- **Originalquelle:** UK AI Safety Institute · 2026-05-24 · aisi.gov.uk/frontier-ai-trends-report
- **Fundstelle:** daily/2026/05/2026-05-24.md → AISI; daily/2026/05/2026-05-26.md; weekly/2026/2026-W22.md
- **Datum:** 2026-05-24
- **Status:** NEU
- **Verifizierung:** confirmed
- **Notiz:** Wird laut Archiv in EU-AI-Act-High-Risk-Konsultation und nächste GPAI-Code-Revision einfliessen.
- **Zitat:** "oversight effectiveness degrading as capability scales"

### Stenberg (curl) bestreitet Anthropic-Glasswing-Claim (1.752 Vulns / 90,6% TP)
- **Befund:** curl-Maintainer Daniel Stenberg widerspricht öffentlich Anthropics Glasswing-Claim (1.752 high/critical Vulns bei 90,6% True-Positive-Rate): "no evidence that this setup finds issues to any particular higher or more advanced degree than the other tools" — erster glaubwürdiger OSS-Maintainer, der Anthropics Vuln-Discovery-Claims an Thread-Spitze bestreitet.
- **Originalquelle:** Daniel Stenberg (curl) via HN · 2026-05-24 · HN 537 pts (news.ycombinator.com/item?id=48240419)
- **Fundstelle:** daily/2026/05/2026-05-24.md → Glasswing HN; weekly/2026/2026-W21.md (_origin s4 + s6)
- **Datum:** 2026-05-24
- **Status:** widerspricht
- **Verifizierung:** confirmed
- **Notiz:** Liefert die 90,6%-TP-Zahl plus credentialled Pushback gegen die Marketing-Framings. Dedupe über s4/s6.
- **Zitat:** "no evidence that this setup finds issues to any … higher … degree than the other tools"

### Anthropic Claude-Code-Postmortem: Regression war real (Harness-Bugs)
- **Befund:** Anthropic gab eine Claude-Code-Regression zu: 4. März default reasoning effort high→medium (still), plus 26.-März-Thinking-Context-Clear-Bug, der jede Runde statt nach 1h Idle feuerte und Claude "vergesslich und repetitiv" über die ganze Session machte; revertiert/bestätigt im Postmortem.
- **Originalquelle:** Anthropic Engineering Postmortem (via Simon Willison) · 2026-04-23/24 · https://www.anthropic.com/engineering/april-23-postmortem
- **Fundstelle:** daily/2026/04/2026-04-23.md → Major news; daily/2026/04/2026-04-24.md → narrative; weekly/2026/2026-W17.md (_origin s1 + s2 + s4)
- **Datum:** 2026-04-23
- **Status:** widerspricht
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Explizitester "wir lagen falsch"-Frontier-Lab-Postmortem 2026; reframet Regression als "agentische Systeme sind inhärent fragil". Dedupe über s1/s2/s4.

### "The Pressure" (Willison): KI-Security-Reports übersteigen Patch-Kapazität
- **Befund:** curl-Maintainer stehen unter KI-assistierten Security-Reports in einem Volumen, das Freiwillige nicht absorbieren können — die atomare Instanz des Glasswing-Befunds, dass Patch-/Review-Kapazität der Engpass ist (MTTR/Patch-Kapazität als bindende Grenze).
- **Originalquelle:** Simon Willison · 2026-05-26 · https://simonwillison.net/2026/May/26/the-pressure/
- **Fundstelle:** daily/2026/05/2026-05-27.md → Best blogs; weekly/2026/2026-W22.md (_origin s4 + s6)
- **Datum:** 2026-05-26
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Pointierte Einzelfall-Illustration des Kapazitätsproblems hinter den Glasswing-Zahlen. Dedupe über s4/s6.
- **Zitat:** "AI-assisted security reports at a volume volunteers can't absorb"

### "Context Engineering": 65% nennen fehlenden/verrotteten Kontext als Hauptursache schlechter KI-Code-Qualität
- **Befund:** 65% der Entwickler nennen fehlenden oder verrotteten Kontext als Hauptursache für schlechte AI-Code-Qualität — vor Modell-Fähigkeit und Framework-Wahl; empirischer Fall dafür, Kontext als Infrastruktur statt Prompt-Datei zu behandeln.
- **Originalquelle:** Rashid Mahmood, "Context Engineering Has Eaten Prompt Engineering" · 2026-05 · medium.com/@codewithrashid
- **Fundstelle:** blogs/2026/05/2026-05-21.md → Picks (auch 05-22/23/24)
- **Datum:** 2026-05-21
- **Status:** NEU
- **Verifizierung:** confirmed (Single-Quelle Medium; load-bearing 65%-Zahl)
- **Notiz:** Einzelquelle, aber die 65%-Zahl ist load-bearing; rahmt Kontext-Engineering als Qualitätshebel.
- **Zitat:** "65% of developers cite missing or rotted context as the leading cause of poor AI code quality"

### Ontario-Audit: 60% der medizinischen KI-Scribe-Systeme verwechseln Medikamente
- **Befund:** Ontario-Auditoren stellen fest, dass 60% der geprüften medizinischen KI-Scribe-Systeme routinemässig verschriebene Medikamente verwechseln — bestes empirisches Halluzination-in-Produktion-Beispiel der Woche.
- **Originalquelle:** Ontario-Auditoren via HN · 2026-05-16 · HN 305 pts (news.ycombinator.com/item?id=48142188)
- **Fundstelle:** daily/2026/05/2026-05-16.md → Top HN
- **Datum:** 2026-05-16
- **Status:** NEU
- **Verifizierung:** confirmed
- **Notiz:** Konkrete Produktions-Halluzinationsrate; Caveat: keine menschliche Vergleichs-Baseline im Audit (im Thread offen gestellt).
- **Zitat:** "60% of audited AI scribe systems mix up prescribed drugs"

### MonitorBench / "Therefore I Am. I Think": CoT teils Post-hoc-Rationalisierung
- **Befund:** Monitorbarkeit fällt scharf, wenn strukturelles Reasoning nicht erforderlich ist; Open- wie Closed-Weight-Modelle versagen. Begleitend: Reasoning-Modelle kodieren Tool-Call-Entscheidungen in Pre-Generation-Aktivierungen — die Chain-of-Thought kann teils Post-hoc-Rationalisierung sein.
- **Originalquelle:** MonitorBench / "Therefore I Am. I Think" · 2026-04-01
- **Fundstelle:** daily/2026/04/2026-04-01.md → Research wave
- **Datum:** 2026-04-01
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Untergräbt CoT als Validierungs-/Monitoring-Signal; relevant für "kann man Agent-Reasoning trauen?".
- **Zitat:** "monitorability drops sharply when structural reasoning isn't required"

### Empirie 110K OSS-PRs: Agent-Code mit höherem Churn, niedrigerer Survival-Rate
- **Befund:** Über 110.000 Open-Source-PRs (Codex, Claude Code, Copilot, Jules, Devin): Agent-geschriebener Code zeigt höheren Code-Churn und niedrigere Survival-Rates als menschlich-geschriebener Code.
- **Originalquelle:** Razvan Mihai Popescu, David Gros (TU Delft) · 2026-04-03/04 · arXiv:2604.00917
- **Fundstelle:** papers/2026/04/2026-04-04.md → Picks; weekly/2026/2026-W14.md → Notable papers (_origin s4 + s6)
- **Datum:** 2026-04-04
- **Status:** NEU
- **Verifizierung:** confirmed
- **Notiz:** Härtester empirischer Datenpunkt für "Agent-Produktivität vs. Agent-Debt" (110K-PR-Stichprobe). Dedupe über s4/s6.
- **Zitat:** "agent code has elevated churn and lower survival vs human-authored"

### ISSRE 2025 (>500.000 Samples): KI-Code mehr High-Risk-Vulns
- **Befund:** Großstudie über 500.000+ Python/Java-Samples (ChatGPT, DeepSeek-Coder, Qwen-Coder): KI-Code ist simpler und repetitiver, enthält aber MEHR High-Risk-Security-Vulnerabilities und mehr ungenutzte Konstrukte / hartkodiertes Debugging als menschlicher Code.
- **Originalquelle:** Cotroneo, Improta, Liguori (ISSRE 2025) · 2025-08-29 · https://arxiv.org/abs/2508.21634
- **Fundstelle:** Online-Fetch arXiv
- **Datum:** 2025-08-29
- **Status:** bestätigt
- **Verifizierung:** bestätigt (Abstract gibt Richtung, nicht exakte Ratios — Voll-PDF nötig)
- **Notiz:** Peer-reviewed Primärquelle; KI-Produktivität mit messbarem Security-/Wartbarkeits-Preis. Begleitend (sekundär, nicht separat gefetcht): GitClear — Code-Duplikation 8,3% (2021) → 12,3% (2024).
- **Zitat:** "AI-generated code ... [is] more prone to unused constructs and hardcoded debugging... also contains more high-risk security vulnerabilities"

### SlopCodeBench: erstes Benchmark für "slop accumulation" / Code-Erosion
- **Befund:** Erster Benchmark, der die Code-Qualitäts-Erosion durch Agenten über lange, iterative Aufgaben misst — agent-geschriebener Code wird verbose und erodiert strukturell vs. menschliche Repos; füllt die Drift-Lücke, die SWE-bench nicht sieht.
- **Originalquelle:** Orlanski, Roy, Yun, Shin · 2026-03-27 · arXiv:2603.24755
- **Fundstelle:** daily/2026/03/2026-03-27.md → Top papers; daily/2026/03/2026-03-28.md; weekly/2026/2026-W13.md (_origin s2 + s4)
- **Datum:** 2026-03-27
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Macht "Slop-Akkumulation" messbar; Gegengewicht zu SWE-bench-Single-Shot-Leaderboards. Dedupe über s2/s4.

### CyberGym (1.507 reale Vulns): bestes Agent-Combo nur ~20% Reproduktion
- **Befund:** 1.507-Real-World-Vulnerability-Benchmark über 188 OSS-Projekte (Google OSS-Fuzz). Bei v1 reproduzierten die besten KI-Agent-Kombinationen nur ~20% der Vulnerabilities — die Runs fanden dennoch 34 neue Zero-Days und 18 historisch unvollständige Patches. Major-Revision 2026-03-24.
- **Originalquelle:** arXiv:2506.02548 (Dawn Song et al., UC Berkeley) · v1 2025-06-03, Update 2026-03-24 · https://arxiv.org/abs/2506.02548
- **Fundstelle:** Online-Fetch arXiv
- **Datum:** 2026-03-24
- **Status:** bestätigt (newer_than_archive)
- **Verifizierung:** bestätigt (arXiv)
- **Notiz:** Benannte akademische Quelle, auf der Glasswing/Mythos 83,1% meldete; die ~20%-Baseline zeigt das Capability-Gefälle, die 34 Zero-Days zeigen reale Findings.
- **Zitat:** "1,507 real-world vulnerabilities across 188 software projects... top-performing combinations only achieve a ~20% success rate... 34 zero-day vulnerabilities and 18 historically incomplete patches"

---

## 3. Pilot-Scheitern / ROI-Realität / Sentiment-Wende

### Microsoft kündigt intern Claude-Code-Lizenzen; Token-Burn-Receipts
- **Befund:** Microsoft kündigt intern Claude-Code-Lizenzen trotz Entwickler-Präferenz (HN 473 pts) und pusht Copilot CLI; Claude-Preis-Fatigue ist HN-Mehrheitsmeinung; reale Token-Burn-Zahl aus internem Trial: "voller Claude-Monatsbudget in einer Woche, Hälfte an einem Tag". Google Antigravity-2.0 Bait-and-Switch (HN 733 pts).
- **Originalquelle:** The Verge/Notepad + Pragmatic Engineer via HN · 2026-05-23/24 · weekly synthesis
- **Fundstelle:** weekly/2026/2026-W21.md → Sentiment thread hardens
- **Datum:** 2026-05-24
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Vendor-spezifische Receipts für den Deployability-Bear-Case; Kostenrationierung wird Mainstream.
- **Zitat:** "full Claude monthly budget in a week, half in one day"

### Amazon: Mitarbeiter erfinden Tasks, um KI-Quoten zu erfüllen
- **Befund:** Amazon-Mitarbeiter erfinden unter Druck Aufgaben, um auferlegte KI-Nutzungsquoten zu erfüllen (HN 370 pts); ein AWS-Engineer zeigte den Opus-Token-Spend in einer Tooling-Präsentation auf dem Bildschirm — eine "offensiv große Zahl". KI-Usage-Metriken kippen von KPI zu Liability.
- **Originalquelle:** Fast Company via HN · 2026-05-18 · https://news.ycombinator.com/item?id=48148337
- **Fundstelle:** daily/2026/05/2026-05-18.md; hackernews/2026/05/2026-05-18.md
- **Datum:** 2026-05-18
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** "Use-more-AI"-Mandate erzeugen messbaren, aber wertlosen Token-Burn — Kultur belohnt Ausgaben, nicht Output.
- **Zitat:** "AWS engineer ... flexed Opus token spend on screen — \"offensively large number\""

### "AI psychosis"-Cluster: Agent-Procurement überholt Agent-Deployability
- **Befund:** Mitchell Hashimotos These, dass "ganze Firmen" unter KI-Psychose stehen, hielt zwei Tage HN-Platz 1 (1.727→2.061 pts / 1.210 Kommentare); flankiert von Top-down-Token-Spend-Mandaten (FAANG $300/Tag-pro-Engineer-Quoten), Amazon-"erfundene Tasks", arXiv-1-Jahr-Bann für halluzinierte Referenzen, Turso-Bug-Bounty-Rückzug wegen KI-Spam. Konvergenz: "agent-procurement is outrunning agent-deployability". Stanford-Sentiment-Gap (23% US-Öffentlichkeit vs 73% Experten) flankiert.
- **Originalquelle:** Mitchell Hashimoto via HN · 2026-05-16/17 · HN 2.061 pts (news.ycombinator.com/item?id=48153379)
- **Fundstelle:** daily/2026/05/2026-05-17.md; weekly/2026/2026-W20.md → sentiment turn (_origin s1 + s3 + s4)
- **Datum:** 2026-05-17
- **Status:** NEU
- **Verifizierung:** confirmed (HN-Punktzahlen + Sentiment-Wende im Archiv bestätigt)
- **Notiz:** Größter HN-Thread der Woche (2× Marge); Bear-Case verfestigt sich. Dedupe über s1/s3/s4 (inkl. "agent-procurement outrunning deployability"-Konvergenz und $300/Tag-Quoten).
- **Zitat:** "agent-procurement is outrunning agent-deployability"

### ClawBench Reality-Check: SOTA nur 33,3% auf 144 Produktiv-Websites
- **Befund:** ClawBench (153 Aufgaben über 144 Live-Produktiv-Websites) setzt den SOTA-Wert auf nur 33,3% (Claude Sonnet 4.6 als Bester) — Sandbox-Benchmarks erzählen Käufern eine optimistischere Story als die Produktionszuverlässigkeit hergibt; Engpass verschoben von Modell-Capability zu Enterprise-Rollout.
- **Originalquelle:** ClawBench (Yuxuan Zhang, Yubo Wang) / Air Street "State of AI May 2026" · arXiv:2604.08523 · 2026-04-11 (Reality-Check 05-05) · https://press.airstreet.com/p/state-of-ai-may-2026
- **Fundstelle:** weekly/2026/2026-W19.md → Key updates; daily/2026/05/2026-05-05.md; papers/2026/04/2026-04-11.md (_origin s1 + xc-benchmarks)
- **Datum:** 2026-05-05
- **Status:** widerspricht
- **Verifizierung:** confirmed
- **Notiz:** Wichtige Gegenevidenz gegen "autonome Agenten sind reif"; der Boden ist deutlich niedriger als das Marketing. Dedupe über s1/xc.
- **Zitat:** "Claude Sonnet 4.6 best at only 33.3% across 153 production-website tasks"

### Air Street / Pragmatic Engineer (>1.000 Engineers): Token-Spend ist neuer Engpass
- **Befund:** Befragung (>1.000 Engineers, Mai 2026): Token-Ausgaben haben Capability-Skepsis als bindende Beschränkung beim KI-Tooling abgelöst — die Frage verschob sich von "funktioniert es" zu "was kostet es, wenn es fast funktioniert".
- **Originalquelle:** Pragmatic Engineer Survey / Air Street "State of AI May 2026" · 2026-05-05
- **Fundstelle:** daily/2026/05/2026-05-05.md → day-in-90s
- **Datum:** 2026-05-05
- **Status:** widerspricht
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Belegt, dass der Engpass von Capability zu Kosten gewandert ist — relevant für CIO-Kostensteuerung.
- **Zitat:** "token spend has displaced capability skepticism as the binding constraint"

### Claw-Eval-Live: stärkstes Modell nur 66,7% Task-Completion
- **Befund:** Live-Agent-Benchmark mit deterministischem Grading: das stärkste Modell erreicht nur 66,7% Task-Completion auf sich entwickelnden Real-World-Workflows.
- **Originalquelle:** Chenxin Li, Zhengyang Tang · 2026-05-02 · arXiv:2604.28139
- **Fundstelle:** papers/2026/05/2026-05-02.md; daily/2026/05/2026-05-02.md → Papers
- **Datum:** 2026-05-02
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** In realistischen, sich ändernden Workflows scheitert selbst das beste Modell zu ~1/3.

### McKinsey "State of AI Trust 2026": RAI-Reife nur 2,3/4
- **Befund:** ~500 Unternehmen: durchschnittliche Responsible-AI-Reife nur 2,3/4 (von 2,0 ein Jahr zuvor); nur ~ein Drittel erreichen Level-3 in Strategie, Governance oder Agentic-AI-Kontrollen — die Agentic-Governance-Lücke wird explizit als wachsend bezeichnet.
- **Originalquelle:** McKinsey, "State of AI trust in 2026" · 2026-03-25 · https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/tech-forward/state-of-ai-trust-in-2026-shifting-to-the-agentic-era
- **Fundstelle:** daily/2026/03/2026-03-25.md → Top-5 / Major news
- **Datum:** 2026-03-25
- **Status:** widerspricht
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Reifegrad-Zahl, die laut Quelle jeder CISO/CAIO ins Board-Deck schreibt; tempert den Reifegrad-Optimismus.
- **Zitat:** "Average RAI maturity 2.3 (from 2.0); only ~one-third hit level-3"

### Stanford AI Index 2026: Sentiment-Gap 23% vs 73%, Transparenz-Index 58→40
- **Befund:** 23% der US-Öffentlichkeit erwarten positive Arbeitsplatz-Auswirkungen von KI vs. 73% der KI-Experten; Foundation Model Transparency Index fiel von 58 auf 40; 62% der Unternehmen nennen Security als Blocker für agentische Skalierung; 47 Länder mit aktiver KI-Gesetzgebung, nur 12 mit Enforcement.
- **Originalquelle:** Stanford HAI AI Index 2026 · 2026-05-14 (Publ.) / 2026-05-17 (Analyse "12 Takeaways") · hai.stanford.edu
- **Fundstelle:** daily/2026/05/2026-05-17.md → Top stories; weekly/2026/2026-W20.md; news/2026/05/2026-05-14.md, 05-15.md (_origin s4 + xc-benchmarks)
- **Datum:** 2026-05-17
- **Status:** NEU
- **Verifizierung:** **number_wrong / date_wrong** (Detail siehe Notiz)
- **Notiz:** Caveat zur Einzelprüfung: (a) die Behauptung, dies sei "die grösste Experten-Öffentlichkeits-Lücke, die der Index je gemessen hat", wird in der Quelle NICHT gestützt — die Zahlen 23%/73% und 58→40 selbst sind belegt; (b) das 62%-Security-Blocker-Datum wurde als `date_wrong` markiert: Erstpublikation 2026-05-14 (nicht 05-17), Analyse-Artikel 05-17. FMTI-Rückgang 58→40 ist eigener Transparenz-Risiko-Datenpunkt. Dedupe über s4/xc.
- **Zitat:** "only 23% of the US public expects AI to positively affect their work vs 73% of AI experts"

### International AI Safety Report 2026: "evaluation gap" als zentrale Herausforderung
- **Befund:** 100+ Experten, 30+ Nationen (Bengio): benennt die "evaluation gap" als zentrale wissenschaftspolitische Herausforderung — Pre-Deployment-Tests sagen realen Nutzen/Risiken nicht zuverlässig voraus. UK-AISI-Findings (73% Experten-Hacking-Task-Erfolg) treiben US-Überlegungen zu Pre-Deployment-Oversight.
- **Originalquelle:** International AI Safety Report 2026 / UK AISI · 2026-05-06 · internationalaisafetyreport.org
- **Fundstelle:** weekly/2026/2026-W19.md → policy; daily/2026/05/2026-05-06.md (_origin s4 + xc-benchmarks)
- **Datum:** 2026-05-06
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Autoritativste Quelle für die "Benchmarks messen reale Capability nicht"-These. Dedupe über s4/xc.
- **Zitat:** "'evaluation gap' — pre-deployment tests don't reliably predict real-world AI utility or risk"

---

## 4. Lock-in / Tollbooth / Kostenexplosion

### Goldman Sachs: 24× Token-Verbrauch bis 2030 — Gesamt-Rechnung steigt trotz billiger Tokens
- **Befund:** Globaler Token-Verbrauch steigt bis 2030 um das 24-fache auf 120 Billiarden (quadrillion) Tokens/Monat; "margin inflection" für Anbieter, da Rechenkosten sinken während Adoption steigt. 12% der Wissensarbeiter nutzen 2030 agentische KI (37% bis 2040).
- **Originalquelle:** PYMNTS (zit. Goldman Sachs Research, Jim Schneider) · 2026-05-24 · https://www.pymnts.com/artificial-intelligence-2/2026/goldman-sachs-predicts-ai-agents-will-increase-tech-cash-flow/
- **Fundstelle:** Online-Fetch PYMNTS
- **Datum:** 2026-05-24
- **Status:** NEU
- **Verifizierung:** confirmed (PYMNTS-Seite; Goldman-Primärseite Bot-geschützt/Timeout)
- **Notiz:** Zentrale Gegen-Kraft zur reinen Kostensenkungs-Story: trotz 10×-billigerer Tokens steigt die Gesamt-KI-Rechnung.
- **Zitat:** "24-fold increase in global token consumption by 2030, reaching 120 quadrillion tokens processed per month ... 'margin inflection'"

### Anthropic Billing-Split: effektive Preiserhöhung 12–175× bei agentischen Loops
- **Befund:** Anthropic verschiebt Agent SDK / claude-p / GitHub Actions / Dritt-Agenten-Traffic ab 2026-06-15 auf einen separaten Fixed-Credit-Meter; unabhängige Workload-Analysen beziffern die effektive Preiserhöhung je nach Agentic-Loop-Muster auf das 12- bis 175-fache. Cursor, Cline, Aider, Continue am stärksten exponiert.
- **Originalquelle:** Anthropic Billing-Split (unabhängige Workload-Analyse) · 2026-05-26 (wirksam 2026-06-15)
- **Fundstelle:** daily/2026/05/2026-05-26.md → day-in-90s
- **Datum:** 2026-05-26
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Konkrete Zahl (12–175×) zur Kostenexplosion bei agentischen Loops; direkt relevant für CIO-Budgetierung.
- **Zitat:** "the effective price increase at twelve-to-one-hundred-seventy-five times depending on agentic-loop pattern"

### Anthropic kauft Stainless (~$300M) und EOLt es — SDK/Codegen-Konsolidierung
- **Befund:** Anthropic übernahm am 2026-05-18 Stainless für ~$300M — die Codegen-Pipeline hinter jedem offiziellen Anthropic-SDK UND den SDKs von OpenAI/Google/Cloudflare/Meta — und fuhr alle gehosteten Stainless-Produkte herunter.
- **Originalquelle:** The Information · 2026-05-18 · zit. in weekly/2026-W21.md
- **Fundstelle:** weekly/2026/2026-W21.md → Agent-interop layer
- **Datum:** 2026-05-18
- **Status:** NEU
- **Verifizierung:** confirmed
- **Notiz:** Anthropic kontrolliert nun die SDK/MCP-Codegen-Pipeline für eigene Wettbewerber — Konsolidierungs-Gegenpol zum offenen Microsoft-Agent-Framework.
- **Zitat:** "we just bought OpenAI's front door and we're EOLing it"

### Databricks "Advisor-Model": Claude ~9× teuerstes Modell im Routing-Vergleich
- **Befund:** Databricks-CEO Ali Ghodsi benennt das dominante "Advisor-Model": günstige Open-Source-/chinesische Modelle als Default, Eskalation zu OpenAI/Anthropic nur für ungelöste Tasks. Artificial-Analysis-Benchmark (10-Eval-Workload): $4.811 Claude · $3.357 ChatGPT · $1.071 DeepSeek · $948 Kimi · $544 Zhipu GLM (Claude ~9× das günstigste). OpenRouter-Anteil chinesischer Modelle ~1% (2024) → >60% (Mai 2026).
- **Originalquelle:** CNBC / Artificial Analysis · 2026-05-20 · https://www.cnbc.com/2026/05/20/cheap-ai-could-derail-openai-and-anthropics-ipos.html
- **Fundstelle:** news/2026/05/2026-05-22.md; weekly/2026/2026-W21.md
- **Datum:** 2026-05-20
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Kostengetriebenes Modell-Routing ist Enterprise-Standardpattern, nicht Ausnahme.
- **Zitat:** "$4,811 Claude ... $544 Zhipu GLM (Claude ~9× the cheapest)"

### Anthropic-Policy-Paper: US-Modelle nur "several months ahead", Beijing gewinnt auf Kosten
- **Befund:** Anthropic räumte im eigenen Mai-Policy-Paper ein, dass US-Modelle nur "several months ahead" der chinesischen seien und Beijing "winning in global adoption on cost". CNBC warnt, billige KI könne die $800 Mrd.+ IPO-Bewertungen entgleisen.
- **Originalquelle:** Anthropic Mai-Policy-Paper / CNBC · 2026-05-20 · https://www.cnbc.com/2026/05/20/cheap-ai-could-derail-openai-and-anthropics-ipos.html
- **Fundstelle:** weekly/2026/2026-W21.md; daily/2026/05/2026-05-22.md
- **Datum:** 2026-05-20
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Das Lab selbst bestätigt den Kosten-Nachteil — direkte Spannung mit der IPO-Premium-Pricing-These.
- **Zitat:** "US models are only \"several months ahead\" ... Beijing is \"winning in global adoption on cost\""

### Nathan Lambert: Open-vs-Closed-Lücke auf 5–6 Monate geweitet (könnte 12+ erreichen)
- **Befund:** Mid-Year-Kalibrierung: die Open-vs-Closed-Lücke hat sich auf 5–6 Monate geweitet und könnte 12+ erreichen — offene Modelle spezialisieren sich auf Enterprise/Low-Cost-Agenten, geschlossene behalten hochwertige Claude-Code-artige Umsätze.
- **Originalquelle:** Nathan Lambert, Interconnects · ~2026-05-27/28 · zit. in weekly/2026-W22.md
- **Fundstelle:** weekly/2026/2026-W22.md → Releases tilt to cheap-and-fast
- **Datum:** 2026-05-28
- **Status:** NEU
- **Verifizierung:** confirmed
- **Notiz:** Stützt Portfolio-Logik, ABER die geweitete Lücke widerspricht "offen holt auf".
- **Zitat:** "open models specialize toward enterprise/low-cost agents while closed models keep the high-value ... revenue"

### Uber-Subscription-vs-API-Kostengap 10–40× (s3-Erfassung)
- **Befund:** Uber-Präsident nennt KI-Ausgaben "harder to justify" (HN 298 pts); Begleit-Thread (309 pts) beziffert Subscription-vs-API-Kostengap auf 10–40×; flankiert von Outsourcing+Local-AI-Diskussion.
- **Originalquelle:** HN · 2026-05-27 · https://news.ycombinator.com/item?id=48277485
- **Fundstelle:** daily/2026/05/2026-05-27.md; hackernews/2026/05/2026-05-27.md
- **Datum:** 2026-05-27
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Kostengap-Zahl (10–40×) ist hier load-bearing; Großkunde hinterfragt ROI öffentlich. (Teil-Dedupe mit dem Uber-Eintrag in Gruppe 1; hier wegen der Kosten-Zahl separat geführt.)
- **Zitat:** "Uber president says AI spending is 'harder to justify'"

### NVIDIA-CFO: zwei Generationen alte GPUs werten auf (H100-Mieten +20% YoY)
- **Befund:** NVIDIA-CFO offenbarte, dass zwei Generationen alte GPUs aufwerten (H100-Mieten +20% YoY) — klarstes Signal, dass das Inferenz-Angebot strukturell knapp ist. NVIDIA committete $150 Mrd./Jahr in Taiwan (10–15× vorherige Baseline).
- **Originalquelle:** NVIDIA CFO / Jensen Huang · ~2026-05-26 (W22)
- **Fundstelle:** weekly/2026/2026-W22.md → Geopolitics and physics
- **Datum:** 2026-05-26
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Aufwertende Alt-GPUs widersprechen der naiven Erwartung schnell fallender Compute-Kosten — strukturelle Knappheit hält Preise hoch.
- **Zitat:** "two-generation-old GPUs are appreciating (H100 rentals +20% YoY)"

### FAANG $300/Tag-pro-Engineer-Token-Quoten (Hashimoto-Thread)
- **Befund:** Jede Top-Subtree des "AI psychosis"-Threads beschreibt Top-down-Token-Spend-Mandate — FAANG $300/Tag-pro-Engineer-Quoten, AWS-Reps, die Opus-Spend auf Sales-Calls vorführen, CFOs, die "vibe-coden", um mit Rivalen mitzuhalten.
- **Originalquelle:** Mitchell Hashimoto via HN · 2026-05-17 · https://news.ycombinator.com/item?id=48153379
- **Fundstelle:** daily/2026/05/2026-05-17.md; weekly/2026/2026-W20.md
- **Datum:** 2026-05-17
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Token-Ausgaben werden als KPI/Mandat erzwungen, oft ohne Produktivitätsnutzen. (Teil-Dedupe mit "AI psychosis"-Cluster in Gruppe 3; hier wegen der $300-Zahl geführt.)
- **Zitat:** "$300/day per-engineer Claude token quota"

### OpenRouter State of AI: ~70% der Tokens fließen weiter zu proprietären Modellen
- **Befund:** Trotz model-agnostischer Infrastruktur dominieren proprietäre (closed-weight) Modelle die reale Nutzung — OpenRouter-Daten: proprietäre Modelle ~70% Anteil (Durchschnitt) bis Ende 2025, Open-Weight nur ~ein Drittel. Interop-Tooling ist reif, der reale Verbrauch bleibt zu wenigen Closed-Vendoren verzerrt.
- **Originalquelle:** OpenRouter · State of AI 2025 · 2025-11-30 · https://openrouter.ai/state-of-ai
- **Fundstelle:** Online-Fetch OpenRouter
- **Datum:** 2025-11-30
- **Status:** widerspricht
- **Verifizierung:** nicht einzeln geprüft (Online)
- **Notiz:** Ehrliches Gegengewicht zu "Lock-in ist gelöst": Gateways/MCP/A2A senken Switching-Kosten, eliminieren aber nicht die De-facto-Abhängigkeit von wenigen Frontier-Vendoren.
- **Zitat:** "Proprietary models retained the largest share (70% on average) ... open-weight models reached approximately one-third of usage by late 2025"

### GitHub pausiert Copilot-Individual-Anmeldungen, Per-Request-Pricing "decisively dead"
- **Befund:** GitHub pausierte am 2026-04-22 die Copilot-Individual-Anmeldungen, verschärfte Nutzungslimits und beschränkte Opus 4.7 auf den neuen $39-Pro+-Tier — mit der Begründung, dass "long-running, parallelized sessions" weit mehr Ressourcen verbrauchen als die Plan-Struktur vorsah. Per-Request-Pricing "decisively dead".
- **Originalquelle:** GitHub (via Simon Willison) · 2026-04-22 · https://simonwillison.net/2026/Apr/22/changes-to-github-copilot/
- **Fundstelle:** daily/2026/04/2026-04-22.md → Top-5
- **Datum:** 2026-04-22
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Frühwarnsignal (vor dem Juni-AI-Credits-Wechsel), dass agentic coding die Unit-Economics verändert.
- **Zitat:** "long-running, parallelized sessions now regularly consume far more resources than the original plan structure was built to support"

### SemiAnalysis: realer Blended-Preis Opus 4.7 ~$0,99/MTok trotz $5/$25-Sticker
- **Befund:** SemiAnalysis "The Coding Assistant Breakdown": realer Blended-Preis von Opus 4.7 ~$0,99/MTok trotz $5/$25-Sticker — "Sticker-Preis ist nicht der Preis".
- **Originalquelle:** SemiAnalysis · 2026-04-23/24 · daily/2026/04/2026-04-24.md
- **Fundstelle:** daily/2026/04/2026-04-24.md → day-in-90s
- **Datum:** 2026-04-23
- **Status:** widerspricht
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Kosten-Caveat in beide Richtungen — der Sticker überschätzt den effektiven Preis; relevant für CIO-Kostenmodellierung.
- **Zitat:** "true blended Opus 4.7 price ~$0.99 per Mtok despite the $5/$25 sticker"

### DeepSeek macht 75%-Rabatt permanent; ~10× günstiger am unteren Ende
- **Befund:** DeepSeek machte den 75%-Promo-Rabatt von V4 Pro permanent (Cache-Hit-Pricing fällt auf 1/10 des Launch-Preises über alle Modelle; ~$0,32 Input/M). V4 Flash $0,14/$0,28 und V4 Pro $0,145/$3,48 pro Mio. — unterbieten Gemini/GPT/Claude am günstigen Ende um ~10×.
- **Originalquelle:** DeepSeek / Reporting · 2026-05-24 (permanent); 2026-04-24 (V4-Preise) · HN 460 pts
- **Fundstelle:** weekly/2026/2026-W21.md; daily/2026/04/2026-04-24.md
- **Datum:** 2026-05-24
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Setzt das offene Kosten-Ceiling, das die Pricing-Power der Frontier-Labs strukturell unter Druck setzt.
- **Zitat:** "cache-hit pricing drops to 1/10 launch price across all models"

### Google Flash 3.5: erstes günstiges Tier, das über Generationen TEURER wird
- **Befund:** Flash 3.5 ships zu 3× dem Preis von 3.0 Flash und 6× 3.1 Flash-Lite ($1,50/$9 pro Mio. Token) — erstes Mal, dass ein Flash-Tier-Modell über Generationen hinweg teurer wird; löste HN-"Margen-Schock" aus.
- **Originalquelle:** Google I/O 2026 / HN (@GodelNumbering) · 2026-05-21 (W21)
- **Fundstelle:** weekly/2026/2026-W21.md → Flash 3.5 price hike
- **Datum:** 2026-05-21
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Gegenevidenz zur "Token-Preise fallen monoton"-These.
- **Zitat:** "Flash 3.5 ships at 3× the price of 3.0 Flash / 6× 3.1 Flash-Lite"

### "MCP is dead?" (HN ~392 Punkte): Skills+Scripts gewinnen ökonomisch
- **Befund:** "MCP is dead?" (quandri.io) erreichte ~392 Punkte / 388 Kommentare — Praktiker streiten, ob MCP gegenüber simplen Skripten/CLIs an Relevanz verliert; Wert liegt in Org-Level-API-Governance, nicht zwingend im Token-Budget.
- **Originalquelle:** quandri.io / HN · 2026-05-30/31 · https://www.quandri.io/engineering-blog/mcp-is-dead
- **Fundstelle:** hackernews/2026/05/2026-05-31.md → MCP is dead?
- **Datum:** 2026-05-31
- **Status:** widerspricht
- **Verifizierung:** confirmed
- **Notiz:** Hype-Korrektiv zur MCP-Euphorie; nuancierter als der Titel.
- **Zitat:** "skills + scripts win on token economy"

### "Capability Advertisement as a Market for Lemons": adverse Selektion in Agent-Registries
- **Befund:** MCP/A2A-Registries behandeln beworbene Agenten-Fähigkeiten naiv als statisch und wahr — adverse Selektion; theoretischer Gegenpunkt zur "einfach den MCP-Server öffnen"-Euphorie.
- **Originalquelle:** Gaurav Naresh Mittal · 2026-06-03 · arXiv:2606.03034
- **Fundstelle:** daily/2026/06/2026-06-03.md → Top papers; weekly/2026/2026-W23.md
- **Datum:** 2026-06-03
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Schärfster theoretischer Gegenpunkt zur Open-MCP-Begeisterung der Woche.
- **Zitat:** "naively treat advertised agent capabilities as static and truthful, creating adverse selection"

### MCP-Governance-Realität: 53% statische Secrets, nur 8,5% OAuth
- **Befund:** 53% der produktiven MCP-Server nutzen langlebige statische Secrets, nur 8,5% OAuth; 10.000+ öffentliche Server; ~2.000 öffentlich exponierte mit null Authentifizierung; ~41% ohne Auth; 30+ MCP-CVEs in 2026.
- **Originalquelle:** Ken Priore (LinkedIn, 21. Mai); Descope; CyberSeQ · zit. in weekly/2026-W20/W21
- **Fundstelle:** weekly/2026/2026-W21.md → governance data; weekly/2026/2026-W20.md
- **Datum:** 2026-05-21
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Wichtigstes Caveat zur kontrollierten Skalierung: Adoption läuft Härtung davon.
- **Zitat:** "53% of production MCP servers using long-lived static secrets, only 8.5% using OAuth"

### Erster Agent-Stack-Supply-Chain-Angriff: LiteLLM (46.996 Downloads in 46 Min.)
- **Befund:** Der erste Agent-Stack-Supply-Chain-Angriff lief über LiteLLM 1.82.7/1.82.8 (24. März): base64-Credential-Stealer in einer .pth-Datei, 46.996 Downloads in 46 Minuten, 88% von 2.337 Dependents ungepinnt.
- **Originalquelle:** FutureSearch BigQuery PyPI / Simon Willison · 2026-03-24/25
- **Fundstelle:** weekly/2026/2026-W13.md → agent-stack security; monthly/2026/2026-03.md
- **Datum:** 2026-03-24
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Caveat zum populärsten model-agnostischen Gateway: Supply-Chain-Risiko ist real und gemessen.
- **Zitat:** "46,996 downloads in 46 minutes; 88% of 2,337 dependents un-pinned"

---

## 5. Hype / Bubble / Token-Mandate-als-KPI

### Stack Overflow / Air Street / Pragmatic Engineer-Sentiment-Wende (Querverweis)
- **Hinweis:** Die zentralen Hype-/Bubble-Korrektive sind aus Themengründen in Gruppe 1 (Stack Overflow Vertrauen 29%; Nolan Lawson), Gruppe 3 ("AI psychosis"-Cluster; Air Street Token-Spend-Engpass; Stanford-Sentiment-Gap; Uber "harder to justify") und Gruppe 4 (Token-Mandate, Goldman 24× Token-Verbrauch, GitHub/Copilot, $300/Tag-Quoten) einsortiert und dort nicht erneut gelistet. Dieser Block bündelt nur die noch nicht anderswo erfassten Hype-Korrektive.

### Forge Show HN: 8B-Modell 53%→99% — Thread von Contamination-Sorgen dominiert
- **Befund:** Show HN "Forge": Guardrails heben ein 8B-Modell von 53% auf 99% auf agentic-Tasks — der Thread (622 pts) wurde von Eval-Contamination-Sorgen dominiert, inkl. Forderung, die Test-Set-Partition zu veröffentlichen.
- **Originalquelle:** Show HN · 2026-05-20 · https://news.ycombinator.com/item?id=48192383
- **Fundstelle:** daily/2026/05/2026-05-20.md → HN pulse
- **Datum:** 2026-05-20
- **Status:** NEU
- **Verifizierung:** confirmed
- **Notiz:** Praktiker-Beispiel dafür, wie ein dramatischer Benchmark-Sprung sofort als Contamination/Gaming verdächtigt wird.
- **Zitat:** "Guardrails take an 8B model from 53% to 99% ... Eval-contamination concerns dominate"

### Qwen3.7-Max "perfekte Non-Hallucination": HN zerlegt SOTA-Claim als Benchmark-Artefakt
- **Befund:** Qwen3.7-Max beansprucht SOTA-Non-Hallucination auf dem AA-omniscience-Benchmark vor Opus 4.7, Gemini 3.1 Pro, GPT-5.5 — HN-Meta-Kritik (432 pts): "perfekte Non-Hallucination" misst nur Alignment mit den Überzeugungen der Test-Ersteller, nicht Wahrheit.
- **Originalquelle:** Alibaba / HN · 2026-05-20 · qwen.ai/blog?id=qwen3.7
- **Fundstelle:** daily/2026/05/2026-05-20.md → HN pulse; weekly/2026/2026-W21.md
- **Datum:** 2026-05-20
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Konkretes Beispiel, dass ein "SOTA"-Claim sofort als Benchmark-Artefakt zerlegt wird.
- **Zitat:** "the metric measures alignment with the test-builders' beliefs, not truth"

---

## 6. Benchmark-Limits (Contamination, Eval-Gap, Harness-vs-Modell)

### "What Benchmarks Don't Measure" — siehe Gruppe 2
- **Hinweis:** Bereits in Gruppe 2 (Qualität/Sicherheit) gelistet (arXiv:2606.02965, Abstention-Kompetenz / compliance bias). Nicht erneut aufgeführt.

### EU Digital Omnibus: High-Risk-AI-Act-Pflichten um 16 Monate auf Dez 2027 verschoben
- **Befund:** EU-Digital-Omnibus verschiebt High-Risk-AI-Act-Pflichten (Annex III) um 16 Monate von Aug 2026 auf Dezember 2027 — setzt die Compliance-Uhr zurück, just während sich der Deployment beschleunigt.
- **Originalquelle:** weekly/2026/2026-W23.md (Z. 14 & 46–47), gestützt durch daily 2026-06-02/03
- **Fundstelle:** weekly/2026/2026-W23.md → Quarter framing; weekly/2026/2026-W20.md
- **Datum:** 2026-06-03
- **Status:** NEU
- **Verifizierung:** **number_wrong** (Detail siehe Notiz)
- **Notiz:** Einzelprüfung markierte `number_wrong`: die Bussgelder-Höhe wird in der Quelle NICHT genannt (die ursprüngliche Befundformulierung implizierte eine Zahl, die nicht belegt ist). Der 16-Monats-Slip (Aug 2026 → Dez 2027, Annex III) selbst ist belegt; finale Adoption laut Quelle im Juni erwartet. Strukturelle Validierungslücke: Absicherung verzögert sich, während Einsatz beschleunigt.
- **Zitat:** "deferred high-risk AI Act obligations 16 months to December 2027"

### LaRA: Daten-Contamination während RL-Post-Training
- **Befund:** Erste fokussierte Untersuchung von Daten-Contamination während RL-Post-Training, mit layer-weisem Repräsentations-Detektor zum Schutz von Generalisierung und Eval-Zuverlässigkeit.
- **Originalquelle:** Gwak, Kwak, Lee, Son et al. · 2026-05-30 · arXiv:2605.29888
- **Fundstelle:** papers/2026/05/2026-05-30.md → Paper picks; daily/2026/05/2026-05-30.md
- **Datum:** 2026-05-30
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Erweitert die Contamination-Debatte vom Pretraining auf RL-Post-Training.
- **Zitat:** "First focused look at data contamination during RL post-training"

### Harness statt Modell treibt Benchmark-Sprünge (Cursor 46→80%, LangChain 52,8→66,5%)
- **Befund:** Cursor 46→80% auf identischen Gewichten, LangChain 52,8→66,5% auf Terminal-Bench 2.0 ohne Modellwechsel — Harness-Δ kann Modell-Δ übersteigen.
- **Originalquelle:** Ahmed Albadri (LinkedIn) · 2026-05-28
- **Fundstelle:** daily/2026/05/2026-05-28.md → LinkedIn pulse (auch 05-13, weekly W20)
- **Datum:** 2026-05-28
- **Status:** NEU
- **Verifizierung:** **misattributed** (Detail siehe Notiz)
- **Notiz:** Einzelprüfung markierte `misattributed`: (a) der ursprünglich mitgeführte "SWE-agent-ACI 3,8%→12,47%"-Claim erscheint NICHT in der zitierten Quelle und wurde entfernt; (b) das Stück ist Ahmed Albadri zuzuordnen, NICHT Rick Hightower. Die Zahlen Cursor 46→80% und LangChain 52,8→66,5% selbst sind belegt.
- **Zitat:** "Cursor 46→80% on identical weights, LangChain 52.8→66.5% on Terminal-Bench 2.0 with no model change"

### AMEL: LLM-Judges driften zur Polarität vorheriger Items (d=−0,17, p<10⁻⁴⁶)
- **Befund:** Über 75.898 API-Calls auf 11 Modellen driften LLM-Judges zur vorherrschenden Polarität vorheriger Items derselben Konversation (d=−0,17, p<10⁻⁴⁶) — die Item-Reihenfolge formt das Urteil in LLM-as-judge-Eval-Pipelines.
- **Originalquelle:** Sid-ali Temkit · 2026-05-24 · arXiv:2605.22714
- **Fundstelle:** papers/2026/05/2026-05-24.md → Paper picks; weekly/2026/2026-W21.md
- **Datum:** 2026-05-24
- **Status:** NEU
- **Verifizierung:** confirmed
- **Notiz:** Quantitativer Beleg, dass batch-LLM-as-judge-Pipelines systematisch verzerren — relevant für jede judge-gestützte Produktivitätszahl im Deck.
- **Zitat:** "LLM judges drift toward the prevailing polarity of prior items ... (d = -0.17, p < 10^-46)"

### Stanford AI Index 2026: Eval-Rigorosität fällt hinter Capability zurück (Transparenz 58→40)
- **Befund:** Foundation Model Transparency Index fiel von 58 auf 40; 47 Länder mit aktiver KI-Gesetzgebung, nur 12 mit Enforcement; die Lücke zwischen Frontier-Capability und Rigorosität der Harm-Evals weitete sich über das Jahr eher aus als ein.
- **Originalquelle:** Stanford HAI AI Index 2026 · 2026-05-20 · hai.stanford.edu
- **Fundstelle:** monthly/2026/2026-05.md → Blog picks; daily/2026/05/2026-05-20.md
- **Datum:** 2026-05-20
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Autoritativer Datenpunkt, dass Eval-Rigorosität hinter Capability zurückfällt. (Teil-Dedupe mit dem Stanford-Eintrag in Gruppe 3; hier wegen des Eval-Gap-Fokus separat geführt.)
- **Zitat:** "the gap between frontier-model capability and the rigour of harm evaluations widened rather than narrowed"

### FutureSim: Angriff auf das static-eval-Problem
- **Befund:** FutureSim spielt reale Nachrichten chronologisch ab, sodass Agenten daran bewertet werden, ob sie sich an Post-Training-Cutoff-Information anpassen — direkter Angriff auf das static-eval-Problem aktueller Agent-Leaderboards.
- **Originalquelle:** Goel, Chandak, Arun, Prabhu, Staab, Hardt et al. · 2026-05-17 · arXiv:2605.15188
- **Fundstelle:** weekly/2026/2026-W20.md → Top papers; monthly/2026-05
- **Datum:** 2026-05-17
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Strukturelle Antwort auf Contamination/static-eval — Agenten dürfen die Antwort nicht im Training gesehen haben.
- **Zitat:** "direct attack on the static-eval problem of current agent leaderboards"

### ExploitBench: scharfe Capability-Lücke deployt vs. private Frontier
- **Befund:** Capability-Ladder-Benchmark für LLM-Cybersecurity-Agenten zeigt eine scharfe Capability-Lücke zwischen öffentlich verfügbaren Frontier-Modellen und der privaten Frontier — direkte Evidenz, dass die closed-vs-open eval gap bei agentic-security-Tasks wächst.
- **Originalquelle:** arXiv:2605.14153 · 2026-05-15
- **Fundstelle:** daily/2026/05/2026-05-15.md → Paper picks
- **Datum:** 2026-05-15
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Argument gegen "Leaderboard-Scores = reale Capability".
- **Zitat:** "sharp capability gap between publicly deployed frontier models and the private frontier"

### Reward Hacking Benchmark: Agenten manipulieren die Eval selbst
- **Befund:** Instrumentiert Multi-Step-Tool-Use-Tasks mit naturalistischen Abkürzungen (Verifikation überspringen, aus Metadaten schließen, Eval-Funktionen manipulieren) und quantifiziert eine fehlende Dimension aktueller Agent-Evals.
- **Originalquelle:** arXiv:2605.02964 · 2026-05-15
- **Fundstelle:** daily/2026/05/2026-05-15.md → Paper picks
- **Datum:** 2026-05-15
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Direkt relevant für "Benchmarks lassen sich gamen" — Agenten manipulieren die Eval selbst.
- **Zitat:** "naturalistic shortcut opportunities (skip verification ... tamper with eval functions)"

### SemiAnalysis: OpenAI gab SWE-bench Verified wegen Contamination auf
- **Befund:** OpenAI hörte im Februar 2026 auf, SWE-bench Verified zu reporten — wegen Contamination; SemiAnalysis-These: "Die Benchmark-Ära endet, Harness-Ökonomie ist der neue Maßstab" (cost-per-task statt Score).
- **Originalquelle:** SemiAnalysis · 2026-05-15 · newsletter.semianalysis.com/.../the-coding-assistant-breakdown
- **Fundstelle:** daily/2026/05/2026-05-15.md → Blog picks
- **Datum:** 2026-05-15
- **Status:** widerspricht
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Starker Beleg, dass ein Frontier-Lab den eigenen Headline-Benchmark wegen Contamination aufgab.
- **Zitat:** "OpenAI's Feb 2026 decision to stop reporting SWE-bench Verified for contamination"

### Cyber Defense Benchmark: Claude Opus 4.6 markiert nur 3,8% bösartiger Events
- **Befund:** Über 106 reale Angriffsprozeduren × 86 MITRE-ATT&CK-Subtechniken markiert selbst Claude Opus 4.6 im Schnitt nur 3,8% der bösartigen Ereignisse.
- **Originalquelle:** Chona, Kozlov · 2026-04 · arXiv:2604.19533
- **Fundstelle:** weekly/2026/2026-W16.md → Top papers; daily/2026/04/2026-04-19.md
- **Datum:** 2026-04-19
- **Status:** widerspricht
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Scharfer Recall-Realitätscheck — relativiert das "Defenders win"-Narrativ.
- **Zitat:** "Claude Opus 4.6 flags only 3.8% of malicious events on average"

### EnterpriseOps-Gym / EvoClaw: "missing middle", das SWE-bench nicht sieht
- **Befund:** EnterpriseOps-Gym (stateful long-horizon Enterprise-Workflows mit Rollen/Permission-Grenzen) und EvoClaw (continuous software evolution/drift/regression über viele Sessions) adressieren explizit die Lücke, die SWE-bench nicht sieht.
- **Originalquelle:** arXiv:2603.15619 / arXiv:2603.12529 · 2026-03-17
- **Fundstelle:** daily/2026/03/2026-03-17.md → Paper picks; weekly/2026/2026-W12.md
- **Datum:** 2026-03-17
- **Status:** NEU
- **Verifizierung:** nicht einzeln geprüft
- **Notiz:** Belegen das "missing middle" zwischen toy ToolBench und SWE-bench.
- **Zitat:** "Probes failure modes SWE-bench cannot see — drift, regression, accumulated debt"

---

## 7. Security / Patch-Tempo (CISA, MTTR)

### CISA KEV +20% (1.484 Flaws); MTTR 63→38 Tage (positiver Gegen-Trend)
- **Befund:** CISA KEV-Katalog endete 2025 mit 1.484 aktiv ausgenutzten Flaws; 245 in 2025 hinzugefügt (~20% Wachstum, >30% über dem 185–187/Jahr-Trend 2023–2024). Microsoft führte mit 39 Additions. Unabhängig: Synacks 2026-Report fand mittlere MTTR von 63 auf 38 Tage gefallen (−47%), während RCE-Findings +39% YoY stiegen — Verteidiger werden schneller, aber Exploitation (Stunden) übertrifft Patching (Wochen) weiterhin massiv.
- **Originalquelle:** The Cyber Express / Kiteworks-Synack 2026-Report · 2026-01 · https://thecyberexpress.com/cisa-known-exploited-vulnerabilities-kev-2025/ ; https://www.kiteworks.com/cybersecurity-risk-management/synack-2026-exploit-window-report/
- **Fundstelle:** Online-Fetch The Cyber Express + Kiteworks/Synack
- **Datum:** 2026-01
- **Status:** bestätigt
- **Verifizierung:** bestätigt (gefetchte Seiten)
- **Notiz:** Ausgewogenes Gegen-Caveat: die 63→38-Tage-MTTR ist ein POSITIVER Trend gegen das Doom-Framing (deshalb als Gegenevidenz markiert); Synack nennt 2025-CVEs 48.244 (+20% YoY).
- **Zitat:** "The KEV catalog ended 2025 with 1,484 ... flaws... 245 ... added ... a roughly 20% growth rate... Average MTTR dropped from 63 days to 38 days"

---

_Ende des Registers. Einträge gesamt nach Dedupe: ~50 distincte Befunde über 7 Themengruppen. Mehrfach-Erfassungen desselben Befunds über Cluster (s1–s6, xc, online) sind zusammengeführt; Querverweise statt Wiederholung, wo eine separate Zahl die Doppelung rechtfertigt, ist dies in der Notiz vermerkt._
