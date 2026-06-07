# AI / Agentic Engineering — Belegsammlung für CIO-Vorlage (Rohmaterial)

## Zweck

Dieser Ordner ist eine breite, neutrale und durchgängig quellenbelegte Belegsammlung zur Leitfrage: „Warum ist KI / Agentic Engineering in der Softwareentwicklung für einen CIO relevant und wo liegt der Mehrwert?". Es handelt sich ausdrücklich um ROHMATERIAL — eine spätere Konsolidierungsstufe verdichtet diese Belege zur eigentlichen Vorlage. Die Sammlung ist bewusst nicht vorab verengt, nicht auf eine These zugeschnitten und nicht foliengerecht aufbereitet; Pro- und Gegenevidenz stehen gleichberechtigt nebeneinander.

## Quellenlage & Methode

Die Belege stammen primär aus einem täglich laufenden KI-Research-Archiv (Sektionen `daily/`, `weekly/`, `monthly/`, `papers/`, `blogs/`, `radar/`, `news/`, `linkedin/`, `hackernews/`) mit einem Zeitfenster von ca. 2026-03-15 bis 2026-06-03 (Stichtag des Archivs), ergänzt um gezielte Online-Recherche für neuere oder im Archiv fehlende Einzelpunkte. Jeder Befund wurde adversarial gegen die Quelldateien geprüft (Zahlen direkt aus den Quellen gelesen, nicht aus dem Gedächtnis paraphrasiert) und trägt einen Status im Feld **Verifizierung**.

**Block-Format der Einzeldateien (01–07):** Jeder Beleg ist als abgeschlossener Block dokumentiert — typischerweise mit (a) einer Kernaussage/Zahl, (b) Quelle und Datum, (c) Kontext/Einordnung und (d) der Verifizierungs-Zeile. Die Konsolidierungsstufe kann jeden Block isoliert bewerten und gewichten. **Verifizierungs-Konvention:** Der Status sagt, wie belastbar die Aussage ist (siehe Legende unten) — er ist die primäre Grundlage dafür, ob eine Zahl ungeprüft in eine CIO-Folie übernommen werden darf oder vorher extern nachgeprüft werden muss.

## Dateien

| Datei | Thema | CIO-relevante Fragen, die sie speist |
|---|---|---|
| `01-adoption-reifegrad.md` | Adoption & Reifegrad von KI-/Agentic Engineering | Wie verbreitet ist KI-generierter Code und wie reif ist die Praxis? Welche Coding-Agents (Claude Code, Copilot, Codex, Cursor) sind im Enterprise-Rollout? Wie schnell ist die Modell-Release-Kadenz? Ist „agentic engineering" Standard? |
| `02-produktivitaet-und-gegenevidenz.md` | Produktivität & Effizienzgewinn (inkl. Gegenevidenz) | Wo ist der Mehrwert messbar — und wo nicht? Was sagen kontrollierte Studien vs. Vendor-Claims zu Tempo, Throughput, Stabilität, Rework/Churn und zur Verlangsamung erfahrener Entwickler? |
| `03-oekonomie-kosten-roi.md` | Ökonomie, Kosten & ROI | Wohin laufen Inferenz-/Token-Kosten? Was kostet ein Agent-Lauf, was der Per-Seat-Spend? Wie wirken Metering/usage-based Pricing und Modell-Routing? Welche ROI-Belege existieren — und wie auditierbar sind sie? |
| `04-qualitaet-risiken-validierung.md` | Code-Qualität, Risiken & Validierung | Welche Qualitäts- und Sicherheitsrisiken bringt KI-Code? Wie real ist der Review-Bottleneck, Shadow-AI, Churn/Duplication? Warum ist Validierung Voraussetzung, nicht Kür? |
| `05-interop-lockin-portfolio.md` | Interoperabilität, Lock-in & Modell-Portfolio | Wie tragfähig sind offene Standards (MCP, A2A)? Wie groß ist die Lock-in-/Tollbooth-Gefahr? Was bringen modell-agnostische Gateways, Routing und ein Multi-Modell-Portfolio? Wie hoch sind Migrationskosten? |
| `06-security-patch-tempo.md` | Security & Patch-Geschwindigkeit (Schwerpunkt) | Wie entwickelt sich das Schwachstellen-Volumen, Time-to-Exploit vs. Patch-Tempo? Wo hilft KI beim Finden UND Beheben? Welche benannten Programme/Benchmarks belegen autonome Remediation? Zentraler Cluster. |
| `07-benchmarks-evals.md` | Benchmarks & Evals (Querschnitt) | Welche benannten Benchmarks (SWE-bench, Terminal-Bench, CyberGym u. a.) liefern belastbare Zahlen — und welche Benchmark-Kritik (Eval-Gap, Contamination) relativiert sie? Stützt/relativiert die Zahlen der anderen Cluster. |

## Querschnitt-Themen, die mehrere Dateien berühren

- **Validierung als Voraussetzung** — der Mehrwert hängt an der Prüfbarkeit des Outputs: berührt `04` (Validierung/Eval-Gap), `02` (Rework/Churn, „green build"-Trugschluss), `07` (Eval-Gap, LLM-as-judge-Reliabilität).
- **Kosten vs. Skalierung** — Effizienzgewinn relativiert durch Inferenz-/Seat-Kosten: berührt `03` (Kosten/ROI), `02` (reale Produktivität vs. Vendor-Claims), `01` (Skala des Rollouts).
- **Security als Notwendigkeit, nicht Option** — Schwachstellen-Flut und Patch-Bottleneck: berührt `06` (Schwerpunkt), `04` (AI-generierte Schwachstellen, Maintainer-Bottleneck), `07` (CyberGym/security-Evals).
- **Lock-in vs. offene Standards** — Portfolio- und Migrationsfreiheit: berührt `05` (Schwerpunkt), `03` (Metering/Tollbooth-Ökonomie), `01` (Modell-Kadenz/Anbietervielfalt).
- **Vendor-Claim vs. unabhängige Evidenz** — durchgängige Trennlinie: berührt `02`, `03` (Salesforce/Google-Zahlen vendor-eigen/unauditiert), `01`, `07`.

## Verifizierungs-Legende

- **confirmed** — direkt aus mindestens einer Quelldatei verifiziert und konsistent. *Gewichtung:* darf grundsätzlich übernommen werden; bei einer harten Zahl vor einem CIO dennoch Datum/Quelle mitführen.
- **korrigiert** — Aussage wurde gegenüber der ursprünglichen Annahme/Aufgabenstellung berichtigt (z. B. falsche Zuschreibung, abweichende Zahl). *Gewichtung:* die korrigierte Fassung verwenden; die ursprüngliche Formulierung nicht zitieren.
- **Einzelquelle** — nur eine Fundstelle, keine Kreuzbestätigung. *Gewichtung:* mit Vorbehalt nutzen; vor prominenter Platzierung möglichst extern gegenprüfen.
- **nicht einzeln verifiziert** — im Archiv genannt, aber nicht isoliert belegbar (z. B. nur in Synthese, nur HN-Verweis, vendor-eigen/unauditiert). *Gewichtung:* nicht als Faktum vor einen CIO stellen; nur als Indikation kennzeichnen oder vor Verwendung verifizieren.

## Lücken & Unsicherheiten

Vor dem Setzen einer Zahl vor einen CIO sollte die Konsolidierungsstufe Folgendes gezielt nachprüfen:

- **Fehlende klassische Surveys:** Trotz expliziter Suche keine Treffer für *JetBrains* oder *Stack Overflow Developer Survey* im gesamten Archiv. Survey-Anker sind stattdessen Stanford HAI 2026 AI Index, McKinsey State of AI Trust 2026 sowie Air Street / Pragmatic Engineer.
- **„95 %-Piloten scheitern" / MIT-NANDA / GenAI Divide:** Diese Studie und das „95 %"-Framing kommen im Archiv NICHT vor — „NANDA" bezieht sich durchweg auf den Forscher Neel Nanda; „GenAI Divide" fehlt; „95 %" erscheint nur in unrelated Kontexten. **Falls eine Folie diese Quelle zitiert, zwingend extern verifizieren.**
- **METR-Verlangsamungsstudie:** Die im Auftrag gesuchte randomisierte METR-Studie („AI verlangsamt erfahrene Entwickler") ist im Archiv nicht enthalten; vorhanden sind nur der METR/Epoch-Capability-Benchmark und der METR-Selbstbericht (1,3×→2,0×→2,5×). Vor Verwendung als kontrollierte Studie extern prüfen.
- **DORA:** Alle „DORA"-Treffer betreffen die EU-Verordnung (Digital Operational Resilience Act), nicht das DevOps-Research-Programm. Kein eigenständiger Throughput-vs-Stability-Datenpunkt aus dem Archiv.
- **„55 % faster"-Claim & „green build":** Kein wörtlicher „55 % faster"-Entwickler-Claim (das einzige 55 % bei Coding betrifft Inferenz-Latenz); „green build" kommt als Begriff nicht vor. Nicht als belegt führen.
- **GitClear / harte Code-Qualitätszahlen:** GitClear wird nicht erwähnt; nächste Entsprechung ist das TU-Delft-110K-PR-Churn-Paper und SlopCodeBench. Harte deutschsprachige Code-Qualitätszahlen fehlen.
- **Security-Programme:** *Cogent Security*, *SEC-bench* und *Qualys Agent Validation* kommen im Archiv NICHT vor (Qualys nur als OpenAI-Daybreak-Day-One-Partner). Auch keine expliziten *CISA KEV*-Erwähnungen und keine formal benannte *MTTR*-Kennzahl — das Patch-Bottleneck ist qualitativ und über Project Lightwell quantifiziert. Genannte Security-Programme vor Zitat verifizieren.
- **Gemini CLI:** Keine CLI-Coding-Adoptionszahlen; Gemini-Adoption nur als 750M→900M+ MAU dokumentiert. Laut Archiv am 18. Juni durch Antigravity CLI ersetzt.
- **Backfill/Rekonstruktion:** Viele März/April-Dailies sind als „backfill on 2026-05-14 — historical reconstruction" markiert (rekonstruiert, nicht live erfasst); Live-Tracking begann am 2026-05-04. Zahlen aus diesem Zeitraum mit erhöhter Vorsicht.
- **Vendor-eigene ROI-Zahlen:** Salesforce (+79 % PRs, 18× Migration) und Google (75 %/6×) sind ausdrücklich hersteller-eigen und unauditiert — nicht als unabhängige Evidenz führen.
- **Dünne Bereiche:** Kein isolierter „cost per agent run/task"-Benchmark (außer nano-$52/76k-Fotos und $0.99/Mtok blended); explizite SLM-Benennungen selten (Substanz indirekt über Sakana-7B-Router, Snowflake Cortex, Cohere); A2A-Versionsdaten jenseits v1.0 / 0.3 sparsam; LLM-as-judge dünn an harten Scores (zentraler Datenpunkt: AMEL d=-0,17).

## Eckzahlen (Korpus)

- Archiv-Befunde gesamt: **211**
- davon quantitativ: **155**
- davon Gegenevidenz: **92**
- ergänzende Online-Befunde: **54**
