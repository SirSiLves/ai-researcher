# Security & Patch-Geschwindigkeit (Schwerpunkt)

_Belegsammlung (Rohmaterial für spätere CIO-Konsolidierung). Stichtag Archiv: 2026-06-03. Neutral, vollständig, jede Zahl mit Quelle + Verifizierungsstatus._

## Worum es geht

Dieser Cluster bündelt die Evidenz zur Frage, wie schnell Software-Schwachstellen heute entstehen (CVE-Volumen), gefunden (KI-gestützte Vulnerability-Discovery), ausgenutzt (Time-to-Exploit) und behoben werden (MTTR/Time-to-Patch) — und welche Rolle KI/agentische Systeme auf der Finder- wie auf der Behebungsseite spielen. Die Belege reichen von Rekord-CVE-Zahlen und benannten Frontier-Lab-Programmen (Project Glasswing/Mythos, OpenAI Daybreak, Google AI Threat Defense/CodeMender) über autonome Remediation-Tools (Qualys Agent Val, IBM/Red Hat Project Lightwell) bis zu Benchmarks (CyberGym, NYU-CTF, Cyber Defense Benchmark) und Gegenevidenz zur Remediation-Lücke. Die Evidenz kann CIO-relevante Fragen adressieren wie: Wie groß ist die Lücke zwischen Finden und Beheben, wo verschiebt sich der Engpass (Discovery → Triage → Patch-Kapazität), und welche Governance-/Procurement-Implikationen ergeben sich aus capability-gated Modellen und souveränem AI-Zugang.

## Befunde

### Glasswing-Remediation-Lücke: ~6 % Patch-Rate trotz industrieller Discovery (CSA Labs)
- **Befund:** Cloud Security Alliance Labs analysierte Project Glasswing/Mythos: in seinem ersten Monat ~23.019 Vulns total (6.202 high/critical), 1.726 als True-Positives validiert, 1.094 als high/critical bestätigt. Von 1.596 an 281 OSS-Projekte offengelegten Findings waren per Mai 2026 nur 97 gepatcht — ~6 % Remediation-Rate. Claude Mythos Preview erreichte 83,1 % auf dem CyberGym-Reproduktions-Benchmark.
- **Originalquelle:** Cloud Security Alliance Labs — "Project Glasswing and the AI Vulnerability Disclosure Velocity Crisis" · 2026 (post-Apr) · https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-vuln-discovery-velocity-disclosure-cris/
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2026 (post-April, Daten bis Mai 2026); Glasswing-Launch 2026-04-07
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert (CSA near-primary, zitiert Anthropics eigene Disclosures); newer_than_archive
- **Art:** Beleg + Gegenevidenz (Discovery-Skala vs. Patch-Rate)
- **Notiz:** Quantifiziert direkt die Discovery-vs-Patch-Lücke: industrielle Fund-Skala (10k+/Monat, 83,1 % CyberGym) trifft auf ~6 % menschliche Behebungsrate.
- **Zitat:** "approximately 23,019 total vulnerabilities including 6,202 rated high or critical severity... 1,596 vetted findings to maintainers of 281 open-source projects, of which 97 had been patched... 83.1 percent success rate on the CyberGym ... benchmark"

### Project Glasswing: 10.000+ Vulns in ~30 Tagen (zentrale Produktionszahl)
- **Befund:** Anthropics Project Glasswing meldete in ~30 Tagen 10.000+ kritische/hohe Schwachstellen über 1.000+ Open-Source-Projekte (1.094 bestätigte True-Positives), darunter ein 27 Jahre alter OpenBSD-Remote-Crash-Bug, ein 16 Jahre alter FFmpeg-Fehler und CVE-2026-5194 in WolfSSL (CVSS 9.1). Eingesetzt wurde die unveröffentlichte Claude Mythos Preview mit ~50 Partnern.
- **Originalquelle:** Anthropic — Project Glasswing initial update · 2026-05-26/31 · https://www.anthropic.com/research/glasswing-initial-update
- **Fundstelle:** daily/2026/05/2026-05-31.md → What's happening (Glasswing)
- **Datum:** 2026-05-26
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Die zentrale 30-Tage-Produktionszahl; ankert Governance- und Procurement-Diskussionen.
- **Zitat:** "10,000+ high/critical issues across 1,000+ open-source projects"

### Glasswing-Breakdown: 6.202 H/C in OSS allein (23.019 total); Cloudflare 2.000; Mozilla 271
- **Befund:** Glasswings Mythos-Engine schätzte 6.202 H/C-Bugs allein in Open-Source-Projekten (23.019 total); Cloudflare 2.000 Bugs (400 H/C); Mozilla 271 Firefox-Schwachstellen (10× besser als frühere Claude-Generationen).
- **Originalquelle:** Anthropic / Help Net Security / CSO Online · 2026-05-26 · https://www.anthropic.com/research/glasswing-initial-update
- **Fundstelle:** daily/2026/05/2026-05-26.md → Top stories (Glasswing)
- **Datum:** 2026-05-26
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Detaillierter Breakdown: gesamt 23.019 erkannte Issues, davon 6.202 H/C in OSS allein.
- **Zitat:** "6,202 H/C bugs in open-source projects alone (23,019 total)"

### Erste öffentliche Glasswing-Zahl: 1.752 H/C bei 90,6 % True-Positive-Rate
- **Befund:** Erste öffentliche Glasswing-Zahl (HN, 24. Mai): Anthropic meldete 1.752 high/critical Vulns bei 90,6 % True-Positive-Rate — bevor das 30-Tage-Update mit 10.000+ folgte.
- **Originalquelle:** Anthropic — Project Glasswing: An Initial Update / HN 537 pts · 2026-05-24 · https://www.anthropic.com/news/project-glasswing-update
- **Fundstelle:** daily/2026/05/2026-05-24.md → HN pulse
- **Datum:** 2026-05-24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Zeigt die Eskalation der Zahl innerhalb derselben Woche (1.752 → 10.000+); 90,6 % TP-Rate ist die belastbarste Präzisionsangabe.
- **Zitat:** "1,752 high/critical vulns at 90.6% true-positive rate"

### curl-Maintainer Stenberg widerspricht Glasswing-Claims öffentlich
- **Befund:** curl-Maintainer Daniel Stenberg widersprach öffentlich Anthropics Glasswing-Update (1.752 H/C-Vulns bei 90,6 % TP): keine Evidenz, dass dieses Setup Issues in höherem/fortgeschrittenerem Grad findet als andere Tools — erstmals contestiert ein zertifizierter OSS-Maintainer Anthropics Vuln-Discovery-Claims an der Spitze eines HN-Threads.
- **Originalquelle:** Daniel Stenberg, HN 537 pts · 2026-05-24 · https://news.ycombinator.com/item?id=48240419
- **Fundstelle:** daily/2026/05/2026-05-24.md → HN pulse; weekly/2026/2026-W21.md
- **Datum:** 2026-05-24
- **Status ggü. bisherigem Stand:** widerspricht
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Relativiert die Glasswing-Zahlen aus Maintainer-Sicht; der Mythos-Glaubwürdigkeits-Halo beeinflusst, wie benachbarte Claims gelesen werden.
- **Zitat:** "no evidence that this setup finds issues to any particular higher or more advanced degree than the other tools"

### IBM + Red Hat: 5 Mrd. USD Project Lightwell (Remediation-Clearingstelle)
- **Befund:** IBM und Red Hat verpflichteten 5 Mrd. USD für "Project Lightwell" — eine Remediation-Clearingstelle mit 20.000+ Ingenieuren und KI-validiertem Patching, mit Tier-1-Bank-Erstanwendern (Bank of America, BNY, Citi, Goldman Sachs, JPMorgan, Mastercard, Morgan Stanley, RBC, State Street, Visa, Wells Fargo).
- **Originalquelle:** IBM Newsroom / Red Hat · 2026-05-28 · https://newsroom.ibm.com/2026-05-28-ibm-and-red-hat-commit-5-billion-to-redefine-the-future-of-open-source-in-the-ai-era
- **Fundstelle:** daily/2026/05/2026-05-31.md → What's happening (Lightwell)
- **Datum:** 2026-05-28
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (Kontext: "fix layer")
- **Notiz:** Plattform-Layer gibt frontier-lab-Skala für KI-validiertes Patching aus; baut explizit auf Glasswing und OpenAIs Cyber-Programmen auf.
- **Zitat:** "IBM + Red Hat commit $5B to 'Project Lightwell' … AI agents validating fixes"

### Anthropic Claude Compliance API + 28 Enterprise-Security-Integrationen
- **Befund:** Anthropic schiffte eine Claude Compliance API mit 28 Enterprise-Security-Integrationen (CrowdStrike, Palo Alto, Microsoft Purview/Entra, Okta, Zscaler, Wiz, Snyk, SailPoint u. a.) — vollständigste Enterprise-AI-Governance-Integration eines Frontier-Labs (deckt DLP, SASE, SIEM, IAM, e-Discovery, AI-Observability in einem Launch ab).
- **Originalquelle:** Anthropic / SecurityWeek · 2026-05-26 · https://www.securityweek.com/anthropic-expands-claudes-enterprise-security-reach-with-28-new-integrations/
- **Fundstelle:** daily/2026/05/2026-05-26.md → Top stories (Compliance API)
- **Datum:** 2026-05-26
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Kontext
- **Notiz:** Same-day zur 10.000-Vuln-Zahl; Governance-/Integrations-Layer rund um die Security-Modelle.

### curl-Maintainer: AI-Reports im Volumen, das Reviewer nicht absorbieren können
- **Befund:** curl-Maintainer melden, dass AI-assisted Security-Reports in einem Volumen eintreffen, das freiwillige Reviewer nicht absorbieren können — die atomare Instanz der Glasswing-Erkenntnis "patch capacity is the bottleneck".
- **Originalquelle:** Simon Willison, "The pressure" · 2026-05-26 · https://simonwillison.net/2026/May/26/the-pressure/
- **Fundstelle:** daily/2026/05/2026-05-27.md → Best blog reads; weekly/2026/2026-W22.md
- **Datum:** 2026-05-26
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Zeigt die Schattenseite: KI erzeugt Security-Report-Volumen, das Maintainer schlucken müssen — MTTR/Patch-Kapazität als bindende Grenze.
- **Zitat:** "AI-assisted security reports at a volume volunteers can't absorb"

### BNP Paribas verlängert Mistral-Partnerschaft mit Mythos-class-Begründung
- **Befund:** BNP Paribas verlängerte seine Mistral-Partnerschaft um 3 Jahre und wurde die erste europäische Bank, die Anthropic-Mythos-class-Vulnerability-Discovery explizit als Begründung für souveränen AI-Zugang nennt — Mistral-Ingenieure eingebettet bei Zehntausenden Investmentbanking-Mitarbeitern.
- **Originalquelle:** Bloomberg / Finextra / PYMNTS · 2026-05-26 · https://www.bloomberg.com/news/articles/2026-05-26/bnp-paribas-works-with-mistral-to-prep-for-mythos-like-ai-models
- **Fundstelle:** daily/2026/05/2026-05-27.md → Top stories (BNP/Mistral)
- **Datum:** 2026-05-26
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext
- **Notiz:** Framing: europäische Banken könnten ohne sovereign-AI-Zugang hinter US-Peers zurückfallen, angesichts des von Glasswing demonstrierten Triage-Kollapses.
- **Zitat:** "first European bank to … cite Anthropic Mythos-class vulnerability discovery as the explicit justification"

### Cogent + Qualys: Time-to-Exploit invertiert (−1 Tag) vs. 60 Tage MTTR
- **Befund:** Die Zeit von CVE-Veröffentlichung bis erster Ausnutzung fiel laut Qualys-Timeline von 63 Tagen (2018) auf 32 (2021), 5 (2023) und −1 Tag (2024) — Exploitation geht dem Patch voraus. Cogent: Time-to-Exploit "kollabierte von neun Monaten 2022 auf Stunden 2026", doch das durchschnittliche Unternehmen braucht weiterhin 60 Tage zum Schließen einer kritischen Lücke; 62,0 % der kritischen Vulns mit bekanntem Exploit hatten diesen vor jeder Scanner-Detection-Signatur in Umlauf (durchschnittlicher Lag bis 5,1 Tage).
- **Originalquelle:** Qualys Blog "Meet Agent Val" · 2026-03-23 · https://blog.qualys.com/product-tech/2026/03/23/meet-agent-val-closing-the-validation-gap-in-exposure-management-at-machine-speed-with-agentic-ai ; Help Net Security — Cogent · 2026-05-27 · https://www.helpnetsecurity.com/2026/05/27/cogent-zero-day-response-and-autonomous-remediation/
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2026-05-27 (Cogent); 2026-03-23 (Qualys)
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert (Vendor-Framing; Richtung von Mandiant unabhängig gestützt); newer_than_archive
- **Art:** Beleg (Patch-Speed-Kerndatum)
- **Notiz:** Kernbeleg der Patch-Speed-Lücke: Exploit-vor-Patch (−1 Tag) gegen 60-Tage-Enterprise-Remediation; 62 % Scanner-Blindspot zeigt, dass selbst Detection der Exploitation hinterherläuft.
- **Zitat:** "2024: -1 day (exploitation before patch exists)... 62.0% of critical vulnerabilities ... before any scanner released a detection signature... still takes 60 days to close a critical vulnerability"

### Anthropic AISI Frontier AI Trends Report: Cyber 9 %→50 %, Self-Replication <5 %→>60 %
- **Befund:** AISI Frontier AI Trends Report (erster quantifizierter, nicht-advisory Report einer Regierungs-Safety-Institution): Apprentice-Level-Cyber-Task-Erfolg 9 % → 50 % in zwei Jahren; autonome Task-Dauer verdoppelt sich ~alle 8 Monate; Self-Replication-Eval <5 % → >60 % in zwei Jahren; 20+ Pfade, auf denen Oversight degradiert.
- **Originalquelle:** UK AISI Frontier AI Trends Report · 2026-05-26 (auch 2026-05-24 datiert) · https://www.aisi.gov.uk/frontier-ai-trends-report
- **Fundstelle:** daily/2026/05/2026-05-26.md → Top stories (AISI Trends); daily/2026/05/2026-05-24.md
- **Datum:** 2026-05-26
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed (Trendzahlen aus Archiv bestätigt; Cyber 9→50 %, Self-Replication 5→60 %)
- **Art:** Kontext / Beleg
- **Notiz:** Quantifiziert, dass Oversight-Effektivität sinkt, während Fähigkeit steigt; Cyber- und Self-Replication-Kurven sind die belastbaren Trendzahlen.
- **Zitat:** "cyber task-success 9%→50%, self-replication <5%→>60% in two years"

### Anthropic Q2: Run-Rate $43,6 Mrd.; Claude Code "most-attacked product surface"
- **Befund:** Anthropic-Run-Rate $43,6 Mrd. zum Q2-Ende (Erwartung ~$50 Mrd. bis Ende Juni, später ~$47 Mrd. in W22); Claude Code bei $2,5 Mrd.+ annualisiert und "the most-attacked product surface in enterprise AI".
- **Originalquelle:** WSJ / Bloomberg-Reporting · 2026-05-21 · weekly/2026-W21.md, weekly/2026-W22.md
- **Fundstelle:** weekly/2026-W21.md → TL;DR; weekly/2026-W22.md → The week in 90 seconds
- **Datum:** 2026-05-21
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** korrigiert: number_wrong — Run-Rate $43,6 Mrd. zu Q2-Ende, >$50 Mrd. bis Ende Juni erwartet; ~$47 Mrd. erscheint erst in W22 (25.–31. Mai), nicht W21.
- **Art:** Kontext
- **Notiz:** Verankert Claude Code als reales Produktgeschäft und benennt es zugleich als meistangegriffene Enterprise-AI-Oberfläche.
- **Zitat:** "Claude Code is at $2.5B+ annualized, the most-attacked product surface in enterprise AI"

### Trumps AI-Cybersecurity-Executive-Order kollabiert am Unterschriftstag
- **Befund:** Trumps AI-Cybersecurity-Executive-Order kollabierte am Unterschriftstag (21. Mai); die Order hätte Bundesbehörden bis zu 90 Tage zur Security-Review von Frontier-Modellen vor Release gegeben und Pentagon/Krankenhäuser/Banken gegen Mythos-class-Bedrohungen gehärtet.
- **Originalquelle:** CNBC / WaPo · 2026-05-21 · https://www.cnbc.com/2026/05/21/trump-ai-executive-order-postponed.html
- **Fundstelle:** daily/2026/05/2026-05-21.md → Top stories (EO collapse)
- **Datum:** 2026-05-21
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext
- **Notiz:** Lässt die föderale Koordinierungsschicht als strukturelle Lücke; betrifft Pre-Deployment-Review von Frontier-Modellen.
- **Zitat:** "up to 90 days to security-review frontier models before release"

### Offensive-Cyber-Benchmark: NYU-CTF-Solve-Raten (Claude 4.5 Opus 59 %)
- **Befund:** Offensive-Cyber-Benchmark-Paper (10 Frontier-Modelle auf 200 NYU-CTF-Challenges): Claude 4.5 Opus 59 % Solve-Rate, Gemini 3 Pro 52 %, Gemini 3 Flash bester $/Solve bei $0,05.
- **Originalquelle:** Systematic Capability Benchmarking of Frontier LLMs for Offensive Cyber Tasks · 2026-05 · arXiv:2604.17159
- **Fundstelle:** papers/2026/05/2026-05-14.md → Top papers
- **Datum:** 2026-05-14
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg / Kontext
- **Notiz:** Liefert modell-spezifische Solve-Raten auf NYU-CTF; ergänzt CyberGym als Eval-Frontier.
- **Zitat:** "Claude 4.5 Opus 59% solve rate, Gemini 3 Pro 52%"

### Microsoft MDASH: 16 Patch-Tuesday-Vulns gefunden; 88,45 % auf CyberGym
- **Befund:** Microsofts internes Multi-Agent-System MDASH (100+ spezialisierte Agenten, Ensemble aus Frontier- + destillierten Modellen) fand 16 der gepatchten Patch-Tuesday-Vulns (4 Critical) und erreichte 88,45 % auf CyberGym (vs. ~83 % nächster Eintrag). Private Preview im Juni.
- **Originalquelle:** Henning Steier (LinkedIn) zu Microsoft Patch-Tuesday-Disclosure · 2026-05-13 (Disclosure 2026-05-12) · https://www.linkedin.com/pulse/ai-just-turned-patch-tuesday-benchmark-henning-steier-ecgie
- **Fundstelle:** linkedin/2026/05/2026-05-14.md → Patch Tuesday benchmark; radar/2026/05/2026-05-14.md
- **Datum:** 2026-05-12
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Argument: Vuln-Discovery verschiebt sich von capacity-bound craft zu capital-bound process; Bottleneck verschiebt sich zu Remediation.
- **Zitat:** "16 of its patched vulnerabilities (4 Critical) … 88.45% on CyberGym vs ~83% next entry"

### Henning Steier präzisiert FFmpeg-Bug (16 Jahre, ~5 Mio. Fuzzer-Treffer verfehlt)
- **Befund:** Henning Steier gibt den Mythos-FFmpeg-Bug genauer an: 16-jähriger FFmpeg/H.264-Bug, den ~5 Millionen Fuzzer-Treffer verfehlt hatten — und rahmt Vuln-Discovery als von capacity-bound zu capital-bound verschoben.
- **Originalquelle:** Henning Steier, "AI just turned Patch Tuesday into a benchmark" · 2026-05-13 · https://www.linkedin.com/pulse/ai-just-turned-patch-tuesday-benchmark-henning-steier-ecgie
- **Fundstelle:** linkedin/2026/05/2026-05-14.md → Patch Tuesday benchmark
- **Datum:** 2026-05-13
- **Status ggü. bisherigem Stand:** aktualisiert
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext
- **Notiz:** Präzisiert den 16-Jahre-FFmpeg-Fehler als H.264-Bug, der ~5M Fuzzer-Treffer überlebte — unterstreicht, warum klassische Fuzzing-Methoden versagten.
- **Zitat:** "16-yr FFmpeg/H.264 bug missed by ~5M fuzzer hits"

### OpenAI Daybreak: Drei-Stufen-Cyber-Plattform (inkl. Qualys als Trusted-Access-Partner)
- **Befund:** OpenAI veröffentlichte Daybreak — Drei-Stufen-Cyber-Plattform (GPT-5.5, GPT-5.5 mit Trusted Access for Cyber, GPT-5.5-Cyber) mit Day-One-Partnern Akamai, Cisco, Cloudflare, CrowdStrike, Fortinet, Oracle, Palo Alto, Zscaler, Okta, SentinelOne, Rapid7, Qualys, Snyk. Trusted Access for Cyber deckt secure code review, vuln triage, patch validation ab.
- **Originalquelle:** OpenAI — Daybreak / Trusted Access for Cyber · 2026-05-08 · https://openai.com/daybreak/
- **Fundstelle:** daily/2026/05/2026-05-08.md → Top stories (Daybreak); news/2026/05/2026-05-08.md
- **Datum:** 2026-05-08
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg / Kontext
- **Notiz:** Qualys erscheint hier als Trusted-Access-Partner (kein eigenständiges "Qualys Agent Validation"-Programm im Archiv); TAC deckt secure code review, vuln triage, patch validation ab.
- **Zitat:** "GPT-5.5-Cyber … red teaming, pentesting, controlled validation"

### Lawfare: Trump-Administration erwägt Pre-Deployment-Oversight (73 % Expert-Hacking, 99 % unpatched)
- **Befund:** Lawfare berichtete, die Trump-Administration erwäge pre-deployment Oversight für Frontier-Modelle — getrieben von Mythos-Previews 73 % Erfolgsrate bei Experten-Hacking-Aufgaben (UK-AISI-Assessment) und einer 99-%-unpatched-Vulnerability-Finding.
- **Originalquelle:** Lawfare / Seriously Risky Business · 2026-05-08 · https://www.lawfaremedia.org/article/mythos-fallout--u.s.-government-weighs-ai-model-regulation
- **Fundstelle:** daily/2026/05/2026-05-08.md → Best blog reads (Mythos Fallout)
- **Datum:** 2026-05-08
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert (Einzelmetriken 73 % / 99 %)
- **Art:** Kontext / Beleg
- **Notiz:** Die 73-%-Experten-Hacking-Rate und 99-%-unpatched-Zahl sind belastbare Einzelmetriken zur Mythos-Cybergefahr.
- **Zitat:** "Mythos Preview's 73% expert-hacking-task success rate … and the 99%-unpatched vulnerability finding"

### Claw-Eval-Live: bestes Modell nur 66,7 % auf realen Workflows (allg. Agent-Limit)
- **Befund:** Claw-Eval-Live (Live-Agent-Benchmark): selbst mit deterministischem Grading erreicht das stärkste Modell nur 66,7 % Task-Completion auf sich entwickelnden Real-World-Workflows.
- **Originalquelle:** Chenxin Li, Zhengyang Tang · 2026-05-02 · arXiv:2604.28139
- **Fundstelle:** papers/2026/05/2026-05-02.md; daily/2026/05/2026-05-02.md → Papers
- **Datum:** 2026-05-02
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz / Kontext
- **Notiz:** Allgemeines Agent-Reliability-Limit auf realistischen Workflows; relativiert Hype um autonome Remediation.

### Claude Security Public Beta (Opus 4.7): 500 Produktions-Vulns in 2 Monaten
- **Befund:** Anthropic öffnete Claude Security (powered by Opus 4.7) als Public Beta: Private Preview deckte in 2 Monaten 500 Produktions-Vulns auf (inkl. Bugs, die Experten-Reviews jahrelang überstanden); 5 SecOps-Integrationen am selben Tag (CrowdStrike Project QuiltWorks in Falcon, Palo Alto, SentinelOne, Trend Micro, Wiz).
- **Originalquelle:** SiliconANGLE / SecurityWeek / CrowdStrike · 2026-04-30 · https://siliconangle.com/2026/04/30/anthropic-announces-claude-security-public-beta-find-fix-software-vulnerabilities/
- **Fundstelle:** daily/2026/04/2026-04-30.md → Top stories (Claude Security)
- **Datum:** 2026-04-30
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** QuiltWorks bringt Opus 4.7 direkt in Falcon für vulnerability discovery UND remediation — konkreter Beleg, wo Defensive-Modelle laufen.
- **Zitat:** "500 production vulnerabilities surfaced in two months, including bugs invisible to expert review for years"

### UK AISI: GPT-5.5 mit Mythos-vergleichbaren Cyber-Fähigkeiten — aber allgemein verfügbar
- **Befund:** UK AISI fand am 30. April, dass GPT-5.5 Cyber-Fähigkeiten vergleichbar mit Mythos hat — aber, anders als Mythos, allgemein verfügbar für jeden mit Developer-Key; die Gating-Prämisse bricht damit innerhalb von Wochen.
- **Originalquelle:** UK AISI via Simon Willison · 2026-04-30 · https://simonwillison.net/2026/Apr/30/gpt-55-cyber-capabilities/
- **Fundstelle:** daily/2026/04/2026-04-30.md → Top stories (AISI/GPT-5.5)
- **Datum:** 2026-04-30
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz / Kontext
- **Notiz:** Bricht die Gating-Prämisse, die Mythos Previews Restricted Access einen Monat zuvor rechtfertigte.
- **Zitat:** "GPT-5.5 cyber capabilities comparable to Mythos — but generally available to the public"

### Bobby Holley (Mozilla): Firefox 150 patcht 271 Mythos-gefundene Vulns
- **Befund:** Mozillas Bobby Holley bestätigte, dass Firefox 150 Fixes für 271 Schwachstellen liefert, die von einer frühen Mythos-Preview-Anwendung gefunden wurden — konkretester Einzeldatenpunkt des Mythos-Bogens. Mozilla schloss im April insgesamt 423 Firefox-Vulns.
- **Originalquelle:** Bobby Holley (Mozilla) via Simon Willison · 2026-04-22 · https://simonwillison.net/2026/Apr/22/bobby-holley/
- **Fundstelle:** daily/2026/04/2026-04-22.md → Top stories / Mythos arc
- **Datum:** 2026-04-22
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Holleys Schlusssatz ist die belastbare Aussage der AI-Security-Research-These; Mozilla schloss im April insgesamt 423 Firefox-Vulns.
- **Zitat:** "Firefox 150 ships fixes for 271 vulnerabilities … Defenders finally have a chance to win, decisively"

### Cyber Defense Benchmark: Claude Opus 4.6 markiert nur 3,8 % bösartiger Events (Recall-Realitätscheck)
- **Befund:** Cyber Defense Benchmark (Agentic Threat Hunting Evaluation for LLMs in SecOps): über 106 reale Angriffsprozeduren × 86 MITRE-ATT&CK-Subtechniken markiert selbst Claude Opus 4.6 im Schnitt nur 3,8 % der bösartigen Ereignisse.
- **Originalquelle:** Chona, Kozlov · 2026-04 · arXiv:2604.19533
- **Fundstelle:** weekly/2026/2026-W16.md → Top papers; daily/2026/04/2026-04-19.md
- **Datum:** 2026-04-19
- **Status ggü. bisherigem Stand:** widerspricht
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Gegenevidenz
- **Notiz:** Scharfer Recall-Realitätscheck auf der Defensive-/Threat-Hunting-Seite — relativiert das "Defenders win"-Narrativ.
- **Zitat:** "Claude Opus 4.6 flags only 3.8% of malicious events on average"

### Drew Breunig: "Cybersecurity Looks Like Proof of Work Now"
- **Befund:** Drew Breunig prägte "Cybersecurity Looks Like Proof of Work Now": mehr ausgegebene Tokens = mehr gefundene Exploits; Open-Source-Bibliotheken werden WERTVOLLER, weil Review-Tokens über alle Downstream-Nutzer amortisieren.
- **Originalquelle:** Drew Breunig via Simon Willison · 2026-04-14 · https://simonwillison.net/2026/Apr/14/cybersecurity-proof-of-work/
- **Fundstelle:** daily/2026/04/2026-04-14.md → blogs / Cyber-defence economics
- **Datum:** 2026-04-14
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext
- **Notiz:** Erste Vokabel für die Defensive-Seite der AISI-Mythos-Finding; baut auf der Proof-of-Work-Analogie auf.
- **Zitat:** "more tokens spent = more exploits found"

### UK AISI: Erste souveräne Regulator-Evaluation eines Frontier-Modells (Mythos)
- **Befund:** UK AISI veröffentlichte die erste souveräne Regulator-Evaluation eines Frontier-Modells: Mythos identifizierte/exploitete autonom "tausende" Zero-Days inkl. CVE-2026-4747 (17 Jahre alter NFS-RCE in FreeBSD).
- **Originalquelle:** UK AI Security Institute · 2026-04-13 · https://www.aisi.gov.uk/blog/our-evaluation-of-claude-mythos-previews-cyber-capabilities
- **Fundstelle:** daily/2026/04/2026-04-13.md → Glasswing capability-disclosure week opens
- **Datum:** 2026-04-13
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Erste sovereign-regulator capability evaluation; Framing kam vom Regulator vor Anthropic.
- **Zitat:** "autonomously identified and exploited thousands of previously unknown vulnerabilities"

### Jack Clark Import AI 452: Cyber-Capability-Doubling-Time 5,7 Monate; 50 % auf 3,1–3,2-h-Tasks
- **Befund:** Jack Clarks Import AI 452: Cyber-Capability-Doubling-Time auf 5,7 Monate seit 2024 versteilt; GPT-5.3 Codex und Opus 4.6 erreichen 50 % Erfolg auf Cyberoffense-Aufgaben, die menschliche Experten ~3,1–3,2 h kosten; Open-Weight GLM-5 hängt ~5,7 Monate hinterher.
- **Originalquelle:** Jack Clark, Import AI 452 · 2026-04-06 · https://jack-clark.net/2026/04/06/import-ai-452-scaling-laws-for-cyberwar
- **Fundstelle:** daily/2026/04/2026-04-06.md → Top stories / blogs
- **Datum:** 2026-04-06
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Empirische Steigung ("Skalengesetze für Cyberwar"), in die die Mythos-Disclosure 24 h später landet.
- **Zitat:** "doubling-time on cyber capability steepened to 5.7 months since 2024"

### Empirie-Paper: AI-Agent-Code auf 110K OSS-PRs — höherer Churn, niedrigere Survival-Rate
- **Befund:** AI-Coding-Agenten auf 110K OSS-PRs (Codex/Claude Code/Copilot/Jules/Devin) zeigen höhere PR-Aktivität, aber erhöhten Code-Churn und niedrigere Survival-Raten vs. menschlich-authored Code.
- **Originalquelle:** Investigating Autonomous Agent Contributions in the Wild (Popescu, Gros, TU Delft) · 2026-04-04 · arXiv:2604.00917
- **Fundstelle:** weekly/2026/2026-W14.md → Top papers; papers/2026/04/2026-04-04.md
- **Datum:** 2026-04-04 (im Primär-Set auch als 2026-04-03 geführt)
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Gegenevidenz
- **Notiz:** Konkreter Datenpunkt für die agent-productivity-vs-agent-debt-Debatte; relevant für "security risk of AI code".
- **Zitat:** "elevated code-churn and lower survival rates vs human-authored code"

### OSS-Maintainer: Slop-Tsunami kippt zu echten AI-Reports (2–3/Woche → 5–10/Tag)
- **Befund:** Drei unabhängige OSS-Maintainer (Greg Kroah-Hartman/Linux, Daniel Stenberg/cURL, Willy Tarreau/HAProxy) bestätigten, dass die Kernel-Security-Liste innerhalb ~eines Monats von 2–3 Slop-Reports/Woche auf 5–10 echte AI-assisted Reports/Tag kippte.
- **Originalquelle:** Simon Willison (Kroah-Hartman/Stenberg/Tarreau) · 2026-04-03 · https://simonwillison.net/2026/Apr/3/greg-kroah-hartman/
- **Fundstelle:** daily/2026/04/2026-04-03.md → blogs / Mythos crosses to mainstream
- **Datum:** 2026-04-03
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg (zweischneidig: echte Funde steigen, Triage-Last auch)
- **Notiz:** Bestätigt Ptaceks "Vulnerability Research Is Cooked"-These mit unabhängiger Praxiserfahrung; verschiebt Engpass zur Review-/Triage-Kapazität.
- **Zitat:** "from 2-3 slop reports/week to 5-10 real AI-assisted reports/day"

### Nicholas Carlini MAD Bugs: Claude schreibt 2 Remote-Root-Exploits (FreeBSD CVE-2026-4747)
- **Befund:** Claude schrieb autonom zwei funktionierende Remote-Root-Exploits für FreeBSD CVE-2026-4747 (RPCSEC_GSS Stack-Buffer-Overflow), jeweils beim ersten Versuch nach ~4 h; die Pipeline produzierte 0 → 500+ (4. Apr) → ~1.000 (5. Apr) validierte High-Sev-CVEs in 96 h auf dem öffentlich verfügbaren Claude-Harness.
- **Originalquelle:** Nicholas Carlini, calif.io "MAD Bugs" · 2026-04-01 · https://blog.calif.io/p/mad-bugs-claude-wrote-a-full-freebsd
- **Fundstelle:** daily/2026/04/2026-04-01.md → Security capability — MAD Bugs kickoff
- **Datum:** 2026-04-01
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Beweist, dass die Fähigkeit nicht an ein gegatetes Modell gebunden ist — sie fällt aus dem richtigen Harness auf einem Laptop.
- **Zitat:** "two working remote-root exploits … each succeeding on first attempt after ~4 hours"

### Mythos Preview / Glasswing: erster capability-gated Frontier-Release
- **Befund:** Anthropic disclosed Claude Mythos Preview + Project Glasswing als ersten capability-gated Frontier-Model-Release: in Pre-Release autonom "tausende" bisher unbekannte Vulns über jedes große OS/Browser identifiziert und exploitet (>80 % Reproduktionsrate), +31 pp über Opus 4.6 auf USAMO 2026.
- **Originalquelle:** Anthropic — Project Glasswing announcement / red.anthropic.com Mythos Preview · 2026-04-07 · https://www.anthropic.com/glasswing
- **Fundstelle:** daily/2026/04/2026-04-07.md → Frontier capability — Mythos / Glasswing
- **Datum:** 2026-04-07
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** confirmed
- **Art:** Beleg
- **Notiz:** Erstes "wir haben es gebaut, aber wir shippen es nicht"-Statement eines Frontier-Labs auf Offensive-Cyber-Gründen.
- **Zitat:** "autonomously identified and exploited thousands of previously unknown vulnerabilities … in over 80% of cases"

### Glasswing-Launch: Partnerliste korrigiert (12 statt 11), Token-Preis nicht belegt
- **Befund:** Glasswing startete mit Launch-Partnern: AWS, Anthropic, Apple, Broadcom, Cisco, CrowdStrike, Google, JPMorgan Chase, Linux Foundation, Microsoft, NVIDIA, Palo Alto Networks (12 Entitäten inkl. Anthropic; die ursprüngliche 11-Partner-Behauptung ließ Anthropic aus). Zugang für 40+ Critical-Infrastructure-Orgs, 100 Mio. USD Mythos-Credits und 4 Mio. USD Spenden an OSS-Security sind korrekt. Ein Token-Preis von $25/$125 pro Mio. wird in der Quelle NICHT erwähnt.
- **Originalquelle:** Anthropic — Project Glasswing · 2026-04-07 · daily/2026/04/2026-04-07.md
- **Fundstelle:** daily/2026/04/2026-04-07.md → Frontier capability — Mythos / Glasswing
- **Datum:** 2026-04-07
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** korrigiert: number_wrong — Partnerzahl auf 12 (inkl. Anthropic) korrigiert; $25/$125-Token-Preis aus der Quelle nicht belegt (stammt aus separater LinkedIn-Quelle/Steier).
- **Art:** Beleg / Kontext
- **Notiz:** Das Consortium wurde zur Standardvorlage für spätere capability-gated Releases; 100 Mio. USD Credits und 4 Mio. USD Spenden bestätigt.
- **Zitat:** "$100M in Mythos usage credits … $4M in direct donations to open-source security"

### Fortune-Pre-Disclosure: 27-Jahre-OpenBSD- und 16-Jahre-FFmpeg-Bug, Aktien repreist
- **Befund:** Fortunes Pre-Disclosure (aus dem geleakten Mythos/Capybara-CMS-Draft, ~3.000 unveröffentlichte Assets) am 26./27. März nannte einen 27 Jahre alten OpenBSD-Bug und einen 16 Jahre alten FFmpeg-Fehler — und repreiste gelistete Cybersecurity-Aktien intraday.
- **Originalquelle:** Fortune · 2026-03-26/27 · https://fortune.com/2026/03/27/anthropic-leaked-ai-mythos-cybersecurity-risk/
- **Fundstelle:** monthly/2026/2026-03.md → Vulnerability research re-priced; weekly/2026/2026-W16.md
- **Datum:** 2026-03-26
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext
- **Notiz:** Erster Auftritt der 27-Jahre-OpenBSD- und 16-Jahre-FFmpeg-Zahlen (später durch Glasswing bestätigt); reframte Cybersecurity von Produkt-Feature zu Lab-Positioning.
- **Zitat:** "a 'step change' model 'above Opus' with 'unprecedented cybersecurity risks'"

### Google AI Threat Defense: Always-on-Plattform (Gemini + Wiz + CodeMender + Mandiant)
- **Befund:** Google Cloud lancierte AI Threat Defense — Always-on-Plattform aus Gemini + Wiz + CodeMender + Mandiant mit Vier-Stufen-Loop (prepare → scan/prioritize → remediate → monitor), explizit gegen Anthropic Mythos und OpenAI Daybreak positioniert.
- **Originalquelle:** Help Net Security / SecurityWeek · 2026-05-27 · https://www.helpnetsecurity.com/2026/05/27/google-ai-threat-defense-released/
- **Fundstelle:** daily/2026/05/2026-05-28.md → Top stories (AI Threat Defense)
- **Datum:** 2026-05-27
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Beleg / Kontext
- **Notiz:** CodeMender ist die Fix-/Repair-Komponente; macht Cyberdefense zum meistumkämpften Frontier-Lab-GTM-Vertical.
- **Zitat:** "prepare → scan/prioritize → remediate → monitor"

### Qualys Agent Val: 62,5 Mio. → 150k Funnel, 60–70 % niedrigere MTTR
- **Befund:** Qualys lancierte Agent Val (2026-03-23), beworben als erster KI-Agent für sichere Exploit-Validierung + autonome Remediation. Er verengt 62,5 Mio. Raw-Findings auf 150.000 bestätigte exploitable Exposures (95 % Noise-Reduktion) und beansprucht 60–70 % niedrigere MTTR für bestätigte Exploits. Dieselbe Ankündigung nennt 48.000+ CVEs in 2025 und Time-to-Exploit von −1 Tag.
- **Originalquelle:** Qualys Blog "Meet Agent Val" · 2026-03-23 · https://blog.qualys.com/product-tech/2026/03/23/meet-agent-val-closing-the-validation-gap-in-exposure-management-at-machine-speed-with-agentic-ai
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2026-03-23
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert (Vendor-Performance-Claims, selbstberichtet); newer_than_archive
- **Art:** Beleg (benanntes Remediation-System) / Kontext
- **Notiz:** Benanntes agentic-Validation/autonomous-Remediation-System mit konkreten Zahlen; quantifiziert Triage-at-scale als Engpass, nicht Patch-Verfügbarkeit.
- **Zitat:** "narrows ... from 62.5 million raw findings down to 150,000 confirmed exploitable exposures... 60-70% Lower Mean Time to Remediation (MTTR)... 48,000+ CVEs published in 2025"

### Mandiant M-Trends 2026: Initial-Access-Handoff von 8 h (2022) auf 22 Sekunden (2025)
- **Befund:** M-Trends 2026 (>500.000 h Incident Response 2025): Median-Zeit von Initial Access bis Handoff an eine sekundäre Threat-Gruppe kollabierte von über 8 Stunden (2022) auf 22 Sekunden (2025). Exploits blieben mit 32 % der #1-Initial-Access-Vektor. Globale Median-Dwell-Time 14 Tage. 714 neue Malware-Familien 2025 (von 632 in 2024).
- **Originalquelle:** SecurityWeek — "M-Trends 2026: Initial Access Handoff Shrinks From Hours to 22 Seconds" · 2026-03-23 · https://www.securityweek.com/m-trends-2026-initial-access-handoff-shrinks-from-hours-to-22-seconds/
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2026-03-23
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert (SecurityWeek near-primary auf Mandiant; 22 s in Synack 2026 echoed); newer_than_archive
- **Art:** Beleg (Demand-Seite der Patch-Speed-Lücke)
- **Notiz:** Unabhängige Frontline-Daten: Angreifer-Operations-Geschwindigkeit von Stunden zu Sekunden; Exploits-at-32 % bestätigt Schwachstellen als Top-Einfallsweg.
- **Zitat:** "the median dropped from over 8 hours in 2022 to just 22 seconds in 2025... Exploits dominated at 32% of cases... 714 new malware families"

### OpenAI Daybreak: Trusted Access for Cyber (secure code review, vuln triage, patch validation)
- **Befund:** Siehe oben "OpenAI Daybreak" (2026-05-08). Die Plattform-Stufe Trusted Access for Cyber adressiert explizit secure code review, vuln triage und patch validation — die Behebungsseite des Cyber-Stacks. (Dedupe-Hinweis: vollständig im Daybreak-Befund 2026-05-08 erfasst.)
- **Originalquelle:** OpenAI — Daybreak · 2026-05-08 · https://openai.com/daybreak/
- **Fundstelle:** daily/2026/05/2026-05-08.md → Top stories (Daybreak)
- **Datum:** 2026-05-08
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext
- **Notiz:** Querverweis; zur Vermeidung von Dopplung hier nur als Patch-Validation-Komponente notiert.

### CyberGym (UC Berkeley, Dawn Song): 1.507-Vuln-Benchmark, ~20 % Best-Agent-Baseline
- **Befund:** CyberGym ist ein 1.507-Real-World-Vulnerability-Benchmark über 188 OSS-Projekte (aus Google OSS-Fuzz). In v1 (eingereicht 2025-06-03) reproduzierten die besten AI-Agent-Kombinationen nur ~20 % der Vulns, brachten aber 34 neue Zero-Days und 18 historisch unvollständige Patches hervor. Das Paper wurde am 2026-03-24 substanziell überarbeitet.
- **Originalquelle:** arXiv:2506.02548 — "CyberGym: Evaluating AI Agents' Real-World Cybersecurity Capabilities at Scale" · eingereicht 2025-06-03, v-update 2026-03-24 · https://arxiv.org/abs/2506.02548
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2026-03-24 (Major-Revision); v1 2025-06-03
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** nicht einzeln verifiziert (akademische Primärquelle); newer_than_archive
- **Art:** Gegenevidenz / Beleg (Benchmark-Baseline)
- **Notiz:** Named Benchmark, auf dem Mythos 83,1 % meldete; der ~20-%-Best-Agent-Baseline (vs. Mythos 83,1 %) zeigt den Fähigkeitszuwachs in unter einem Jahr; 34 Zero-Days belegen reale Funde aus Benchmark-Läufen.
- **Zitat:** "1,507 real-world vulnerabilities across 188 software projects... top-performing combinations only achieve a ~20% success rate... discovery of 34 zero-day vulnerabilities and 18 historically incomplete patches"

### Qualys Agent Val — siehe oben
- **Befund:** (Dedupe-Hinweis: vollständig im Agent-Val-Befund 2026-03-23 erfasst; hier nur Querverweis, dass dieselbe Quelle die −1-Tag-Time-to-Exploit und 48.000+ CVEs 2025 trägt.)
- **Originalquelle:** Qualys Blog · 2026-03-23
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2026-03-23
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext

### OpenAI Sora-Retirement (Kontext: Compute zu Coding/Enterprise umgeleitet)
- **Befund:** OpenAI retirte Sora (App+API) auf Unit-Economics-Gründen (~$1 Mio./Tag Compute gegen eine von ~1 Mio. auf <500K gefallene Nutzerbasis) und leitete Compute zu Coding-/Enterprise-Produkten mit planbarerem Umsatz um.
- **Originalquelle:** OpenAI Help Center · 2026-03-24 · https://help.openai.com/en/articles/20001152-what-to-know-about-the-sora-discontinuation
- **Fundstelle:** daily/2026/03/2026-03-24.md → Top item 1; monthly/2026/2026-03.md
- **Datum:** 2026-03-24
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert
- **Art:** Kontext (Randbezug)
- **Notiz:** Belegt, dass Vendor Compute dorthin lenken, wo Unit-Economics tragen (Coding/Enterprise/Security) — schwacher Cluster-Bezug, zur Vollständigkeit gelistet.

### XBOW: erster nicht-menschlicher #1 auf HackerOne-US-Leaderboard
- **Befund:** XBOW, ein vollautonomer KI-Pentester, wurde #1-gerankter Researcher auf HackerOnes US-Leaderboard (erster Nicht-Mensch) — nahezu 1.060 Vulns eingereicht, davon 130 resolved und 303 triaged; über ein 90-Tage-Fenster klassifizierten Programme 54 critical, 242 high, 524 medium, 65 low. XBOW absolviert umfassende Pentests "in nur wenigen Stunden"; $75 Mio. Series B.
- **Originalquelle:** XBOW Blog — "The road to Top 1: How XBOW did it" · 2025-06-24 · https://xbow.com/blog/top-1-how-xbow-did-it
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2025-06-24
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** nicht einzeln verifiziert (XBOW-Eigenangaben, US-Leaderboard-spezifisch; HackerOne verlangt menschliches Review vor Submission); pre-cutoff; von Dark Reading / Help Net Security korroboriert
- **Art:** Beleg
- **Notiz:** Benanntes System für autonome Offensive-Security in human-beating Scale/Speed (Stunden vs. Tage); 130-resolved/303-triaged-Split zeigt zugleich, dass Volumen Confirmation/Remediation überholt.
- **Zitat:** "XBOW submitted nearly 1,060 vulnerabilities... 130 ... resolved ... 303 ... Triaged... in just a few hours"

### Google Big Sleep: erster KI-Agent, der einen In-the-Wild-Exploit vereitelt (CVE-2025-6965)
- **Befund:** Googles Big Sleep (DeepMind + Project Zero) nutzte CVE-2025-6965, einen kritischen SQLite-Fehler "known only to threat actors", um laut Google erstmals durch einen KI-Agenten "direkt Bemühungen zu vereiteln, eine Vuln in the wild auszunutzen". Bis Sommer 2025 fand Big Sleep 20+ Vulns in weit genutzter OSS (FFmpeg, ImageMagick u. a.); separat meldete Googles OSS-Fuzz via AI-generierter Fuzz-Targets 26 Vulns an Maintainer.
- **Originalquelle:** Google Cloud Blog — "Cloud CISO Perspectives: Our Big Sleep agent makes a big leap" · 2025-07-18 · https://cloud.google.com/blog/products/identity-security/cloud-ciso-perspectives-our-big-sleep-agent-makes-big-leap
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2025-07-18
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** nicht einzeln verifiziert (Google-Primärblog; 20-Flaws- und 26-OSS-Fuzz-Zahlen von Infosecurity Magazine/Computing korroboriert); pre-cutoff
- **Art:** Beleg
- **Notiz:** Benanntes System, das KI sowohl beim Finden ALS AUCH beim Verhindern realer Zero-Day-Exploitation zeigt; CVE-2025-6965 ist ein konkreter "AI prevented an in-the-wild exploit"-Meilenstein.
- **Zitat:** "We believe this is the first time an AI agent has been used to directly foil efforts to exploit a vulnerability in the wild"

### FIRST 2026 Vulnerability Forecast: Median ~59.427 neue CVEs in 2026
- **Befund:** FIRSTs 2026 Vulnerability Forecast (veröffentlicht 2026-02-11) projiziert einen Median von ~59.427 neuen CVEs in 2026 (90 % CI: 30.012 bis 117.673) — 2026 wäre das erste Jahr mit über 50.000 veröffentlichten CVEs; "realistische Szenarien" legen 70.000 bis 100.000 nahe. Der 2025-Backtest hatte einen Mean Absolute Percentage Error von 7,48 % (jährlich) / 4,96 % (Q4).
- **Originalquelle:** FIRST.org Newsroom — "2026 Vulnerability Report" · 2026-02-11 · https://www.first.org/newsroom/releases/20260211
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2026-02-11
- **Status ggü. bisherigem Stand:** NEU
- **Verifizierung:** nicht einzeln verifiziert (Forecast, nicht Ist; FIRST primär — Organisation hinter CVSS/EPSS; auf Infosecurity Magazine cross-confirmed); newer_than_archive
- **Art:** Beleg (CVE-Volumen, vorwärtsgerichtet)
- **Notiz:** Quantifiziert das Rekord-/beschleunigende CVE-Volumen, das die Patch-Speed-Krise treibt; ausdrücklich Prognose mit Konfidenzintervall.
- **Zitat:** "approximately 59,427 CVEs in 2026, with a 90% confidence interval ranging from 30,012 to 117,673... first year to exceed 50,000... 70,000 to 100,000 ... entirely possible"

### CISA KEV: 1.484 aktiv ausgenutzte Flaws Ende 2025; Synack MTTR 63 → 38 Tage
- **Befund:** CISAs KEV-Catalog schloss 2025 mit 1.484 aktiv ausgenutzten Flaws; 245 wurden 2025 hinzugefügt (~20 % Wachstum, >30 % über dem 185–187/Jahr-Trend von 2023–2024). Microsoft führte mit 39 Additions (von 36 in 2024). Synacks 2026-Report fand zugleich, dass die durchschnittliche MTTR von 63 auf 38 Tage fiel (−47 %), während RCE-Findings 39 % YoY stiegen — Verteidiger werden schneller, doch Exploitation (Stunden) überholt Patching (Wochen) weiterhin deutlich.
- **Originalquelle:** The Cyber Express — "CISA Known Exploited Vulnerabilities (KEV) Soared 20% In 2025" · 2026 · https://thecyberexpress.com/cisa-known-exploited-vulnerabilities-kev-2025/ ; Kiteworks/Synack 2026 report · https://www.kiteworks.com/cybersecurity-risk-management/synack-2026-exploit-window-report/
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2026-01 (Analyse); KEV-Counts Jahresende 2025
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** nicht einzeln verifiziert (KEV-Counts pre-cutoff; Synack zitiert 2025-CVEs 48.244, +20 % YoY)
- **Art:** Beleg + Gegenevidenz (63→38 Tage zeigt Verbesserung)
- **Notiz:** KEV-Stats quantifizieren das steigende Volumen bestätigter In-the-Wild-Exploitation; der MTTR-Rückgang ist ein positiver Trend-Gegenpunkt zum Doom-Framing.
- **Zitat:** "ended 2025 with 1,484 software and hardware flaws... 245 vulnerabilities were added... a roughly 20% growth rate... Average MTTR dropped from 63 days to 38 days"

### 2025 Rekord-CVE-Jahr: 48.185 CVEs (+20,6 % YoY); Dezember 2025 mit 5.500
- **Befund:** 2025 schloss als Rekord-CVE-Jahr: 48.185 veröffentlichte CVEs (CVE.org) — +20,6 % gegenüber 2024 (39.962, selbst ein ~38-%-Sprung). Dezember 2025 war der volumenstärkste Monat aller Zeiten mit 5.500 CVEs (>11 % des Jahres in einem Monat), ~132 CVEs/Tag. Top-CNA war Patchstack mit 7.007 CVEs ("WordPress-Effekt").
- **Originalquelle:** JerryGamblin.com — "2025 CVE Data Review" · 2026-01-01 · https://jerrygamblin.com/2026/01/01/2025-cve-data-review/
- **Fundstelle:** Online (nicht im Archiv)
- **Datum:** 2026-01-01 (Analyse); Counts 2025
- **Status ggü. bisherigem Stand:** bestätigt
- **Verifizierung:** nicht einzeln verifiziert (Quellvarianz: Synack 48.244, einige Tracker 46.407; 48.185 / 20,6 % ist die meistzitierte CVE.org-Zahl); newer_than_archive=false
- **Art:** Beleg (CVE-Volumen-Baseline, Ist)
- **Notiz:** Harte, primärdaten-gestützte 2025-Ist-Rekordzahl; unabhängig von Synack (48.244) und Qualys (48.000+) korroboriert.
- **Zitat:** "48,185 published CVEs in 2025, representing a 20.6% increase from 2024's 39,962... December saw the peak volume with 5,500 CVEs... Patchstack (#1) alone assigned 7,007 CVEs"

## Gegenevidenz / Einschränkungen (in diesem Cluster)

- **Remediation-Lücke ~6 %:** Trotz industrieller Discovery-Skala (Glasswing 10k+/Monat, 83,1 % CyberGym) waren von 1.596 offengelegten Findings nur 97 gepatcht (~6 %). Die Behebungsseite hängt der Finderseite massiv hinterher (CSA Labs, online, nicht einzeln verifiziert).
- **Maintainer-Volumen-Überlastung:** AI-Reports treffen in einem Volumen ein, das freiwillige Reviewer nicht absorbieren können; Patch-Kapazität ist der bindende Engpass (Willison "The pressure", 2026-05-26).
- **Stenberg-Widerspruch:** Ein zertifizierter OSS-Maintainer bestreitet öffentlich, dass das Glasswing-Setup besser findet als bestehende Tools (HN, 2026-05-24).
- **Defensive-Recall niedrig:** Im Cyber Defense Benchmark markiert selbst Claude Opus 4.6 nur 3,8 % bösartiger Events — Threat-Hunting/Defense ist noch weit von "gelöst" (arXiv:2604.19533).
- **CyberGym-Baseline:** Beste AI-Agent-Kombinationen erreichten zunächst nur ~20 % Reproduktionsrate (vs. Mythos 83,1 %) — die Capability ist jung und stark modellabhängig (arXiv:2506.02548).
- **Gating-Prämisse fragil:** UK AISI fand GPT-5.5 mit Mythos-vergleichbaren Cyber-Fähigkeiten, aber allgemein verfügbar — Capability-Gating hält nur Wochen (2026-04-30).
- **AI-Agent-Code-Qualität:** 110K-OSS-PR-Studie zeigt höheren Churn und niedrigere Survival-Raten von Agent-Code (arXiv:2604.00917) — relevant für das Security-Risiko von AI-generiertem Code.
- **Agent-Reliability-Limit:** Bestes Modell nur 66,7 % auf realen Workflows (Claw-Eval-Live) — relativiert Hype um vollautonome Remediation.
- **Vendor-/Forecast-Caveats:** Qualys-/Cogent-Day-Counts (−1 Tag, 60 Tage, 62 %, 60–70 % MTTR) sind Vendor-Framing/Marketing-Metriken; FIRST ~59.427 CVEs ist eine Prognose mit breitem 90-%-CI (30.012–117.673), kein Ist.
- **MTTR verbessert sich:** Synack 63 → 38 Tage (−47 %) zeigt, dass Verteidiger schneller werden — wichtiger Gegenpunkt zum reinen Doom-Framing, auch wenn Exploitation (Stunden) Patching (Wochen) weiterhin überholt.

## Verwendbarkeit (Hinweis für die Konsolidierung)

- **Starke Evidenz** für die Discovery-vs-Patch-Lücke als zentrale These: mehrere unabhängige, gut datierte Quellen (Glasswing/Mythos, MDASH, Mozilla 271, Carlini MAD Bugs, M-Trends 22 s, Qualys −1 Tag, FIRST/CVE.org-Volumen). Die 2025-CVE-Ist-Zahl (48.185, +20,6 %) und Mandiant 22 s sind belastbar (primärdaten-/Frontline-gestützt).
- **Dünnere/vorsichtig zu behandelnde Evidenz:** vendor-self-reported Metriken (Qualys Agent Val 62,5 M→150k, 60–70 % MTTR; Cogent-Day-Counts; CSA ~6 %-Patch-Rate als near-primary), Forecast-Zahlen (FIRST 59.427 mit weitem CI) und Einzelmetriken aus Sekundärberichten (Lawfare 73 %/99 %). Diese als Richtungsindikatoren, nicht als harte Punktwerte zitieren.
- **Zentral korrigierte Punkte beachten:** Glasswing-Partnerliste = 12 (inkl. Anthropic), nicht 11; der $25/$125-Token-Preis ist NICHT aus der Glasswing-Quelle belegt; Anthropic-Run-Rate $43,6 Mrd. (Q2-Ende) vs. ~$47 Mrd. (W22).
- **Balance für ein CIO-Deck:** Dem "Defenders win"-Narrativ stehen harte Gegenpunkte gegenüber (Cyber Defense Benchmark 3,8 % Recall, ~6 % Patch-Rate, Maintainer-Überlastung, fragiles Capability-Gating). Der Engpass verschiebt sich nachweisbar von Discovery zu Triage/Remediation/Patch-Kapazität — diese Verschiebung ist die robusteste, mehrfach belegte Aussage des Clusters.
