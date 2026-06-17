---
title: Raiffeisen Switzerland — AI Portfolio Brief (5 use-cases)
subtitle: Five bets, one substrate, a disciplined sequence
audience: Board / CIO / Head of AI
date: 2026-06-16
status: portfolio decision brief (draft for board review)
method: live web research (FINMA, RBI-Austria, Crédit Mutuel, UBS, Morgan Stanley/Goldman/Lloyds agentic-SWE, Apertus/Swisscom sovereign, Azure Swiss regions) + 12-week local AI-intelligence corpus. 5 use-cases generated from distinct strategic angles, each scored by a 5-lens adversarial panel (FINMA/risk, CIO/budget-ROI, tech-durability, cooperative-fit, ambition/upside).
note: cross-bank ROI figures are unaudited vendor/press numbers; only Raiffeisen's own back-tests and pilots reach the board slide.
---

# Raiffeisen Switzerland — AI Portfolio Brief
### Five bets, one substrate, a disciplined sequence. For the Board.

> **Validation note (added after §1–§7 were drafted).** The original five were stress-tested against a 31-candidate field by three independent challengers (§8). Verdict: **the set holds with one disciplined swap** — **"Heimat" (member-facing growth) moves out of the NOW set** to the gated member-facing wave (months 12–24), and the **Sovereign SOC Triage Agent (cyber/SOC)** moves in. Sections §1–§7 below describe Heimat as an incumbent because they predate the validation; read them together with §8, which is authoritative on the final set. The swap makes the launch portfolio **100% zero-/low-member-data on day one** — a tighter defensibility posture, not a softer one.

## 1. Bottom line

Raiffeisen is not facing a "should we do AI" decision — it is facing a "stop being the laggard, in the right order" decision. FINMA's own survey shows **~50% of Swiss institutions already use AI and 91% of AI-using firms use generative AI** ([finma.ch, 24 Apr 2025](https://www.finma.ch/en/news/2025/04/20250424-mm-umfrage-ki)); our sister bank Raiffeisen Bank International (Austria) scaled an internal Azure-OpenAI ChatGPT from 2,000 to **over 20,000 employees** ([Microsoft Customer Story, unaudited](https://www.microsoft.com/en/customers/story/21406-raiffeisen-bank-international-azure)); and we already run a live 4,000-employee multilingual Copilot programme. **The portfolio thesis: do not fund five disconnected pilots. Fund ONE sovereign, FINMA-mapped agent substrate, then ride five use-cases on it so the expensive part — Swiss data-residency, CID/DLP redaction, the FINMA-08/2024 dossier, the Avaloq/Backbase connectors — is built once, not 200 times.**

**Start with the Avaloq Comprehension & Test Engine (Use-Case 5) — the "rewire IT" bet — but scoped to comprehension and test-generation only, on a single ring-fenced repo.** This is counter-intuitive because the panel scored it lowest on average (5.6), but the low score is almost entirely about the *over-reach* (200-bank federation, frontier-vendor dependence, refactoring the core) — **not** the kernel. The kernel attacks our single most defensible, board-legible, member-aligned problem: the **2019 Avaloq go-live left under-documented, bank-specific PL/SQL whose authors are a finite, aging, expensive specialist pool**. Regenerating English/DE specs and dependency maps for that estate is a *continuity and resilience* asset that hardens the institution our members own — it protects jobs by removing single-point-of-failure pressure on our own people, survives any model swap or API takedown, and produces an audited value figure in 90 days with **zero member data and zero core writes**. It is the cheapest, safest place to build the muscle and the governance dossier that every other use-case then inherits. We pair it from day one with the **shared governance substrate (Use-Case 2, scoped down)** as the enabling spine.

---

## 2. The landscape — why now

- **The regulator is supervising AI now, not later — and it is *enabling*, not blocking.** FINMA Guidance Note 08/2024 (18 Dec 2024) sets risk-based expectations across seven areas (governance, risk classification, data quality, testing/monitoring, documentation, explainability, independent verification) and FINMA has stood up a dedicated **AI Desk** ([finma.ch 08/2024](https://www.finma.ch/en/news/2024/12/20241218-mm-finma-am-08-24/)). It is principles-based — "same business, same risks, same rules" — with **no ban list and no licensing gate**. The cost of entry is governance artefacts, and FINMA explicitly recommends institutions **contact it before deploying AI in critical processes**. The board narrative flips from "why move" to "why are we behind 91% of peers."

- **The in-network precedent already exists.** RBI-Austria's internal ChatGPT on Azure OpenAI drove **30%→62% employee adoption in 18 months** and scaled past 20,000 users (Microsoft, *unaudited vendor figure*). Crédit Mutuel — the closest cooperative analogue — reports freeing **~1M advisor-hours in 2023** across 25,000 advisors on sovereign infrastructure (*unaudited*). Swiss peer **UBS launched 300+ AI use-cases**, deployed an Azure-OpenAI assistant to 30,000 staff, and appointed a Chief AI Officer (Oct 2025).

- **Agentic software engineering crossed from experiment to credible.** Anthropic's Feb-2026 COBOL-modernization positioning moved IBM stock **-13.2% in a day (~$31B erased)** ([CNBC/PYMNTS, 23 Feb 2026](https://www.pymnts.com/news/artificial-intelligence/2026/anthropics-cobol-bet-shakes-mainframe-economics/)). The defensible proof points: Morgan Stanley's **DevGen.AI reviewed 9M+ lines and saved ~280,000 developer hours** (*unaudited*, WSJ Jun 2025); Goldman deployed Devin across its ~12,000-person eng org at a reported **3-4x** on legacy/refactor toil; Lloyds attached **~GBP 50M of GenAI value in 2025** with 5,000 engineers on AI coding tools and 50% faster legacy-code conversion (*all unaudited vendor/press figures*).

- **CRITICAL ACCURACY CORRECTION for the board:** **Avaloq is NOT a COBOL/mainframe system.** It is one of the world's largest **Oracle PL/SQL** applications (ACP/AFP on Oracle Exadata, Java components, OpenShift, Eclipse toolchain). The COBOL narrative does not apply. Our real target is scarce, expensive **Avaloq PL/SQL specialists and undocumented 2019-era customizations** — *not* a rip-and-replace.

- **Sovereignty is now a solved architecture, and a fresh, real risk.** A US Commerce export-control directive (13-15 Jun 2026) forced Anthropic to **disable Fable-5 and Mythos-5 worldwide — including Switzerland — with a ~90-minute compliance window**, the first state takedown of a generally-available frontier model. Frontier-model access is now demonstrably **revocable**. The hedge already exists: **Apertus** (Apache-2.0, 8B/70B, multilingual incl. Swiss-German, EPFL+ETH+CSCS, Sep 2025) on **Swisscom's sovereign platform / Exoscale Geneva (CH-GVA-2)**, and **Azure OpenAI in Swiss Zurich/Geneva regions** (FINMA-accepted, the RBI path). Note: Apertus-70B is still maturing (only the 8B variant is in managed catalogs today) — we benchmark before we pin sensitive workloads to it.

- **Cost has become an architectural variable.** Artificial Analysis benchmarked a **~9x spread** ($4,811 Claude vs $544 GLM on a standard workload); Chinese open-weight share on OpenRouter went **~1%→60%** in 18 months. The enterprise norm is now an **advisor-model router**: cheap sovereign/open default, escalate to frontier only for hard reasoning — and **never route bank-client data to DeepSeek/Qwen/GLM on a regulated path** (data-residency non-starter; cost lever only for non-sensitive work).

- **Governance tooling is procurement-grade.** The **Microsoft Agent Governance Toolkit** (open-source, Linux Foundation, EU-AI-Act/SOC-2 pre-mapped, sub-ms inline enforcement) addresses all 10 OWASP agentic risks. **ISO/IEC 42001** is now table-stakes (EY Switzerland is staffing exactly this) — but note: **ISO 42001 certifies the organisation, it does NOT grant EU-AI-Act conformity.** And the EU AI Act high-risk regime barely touches domestic-only Raiffeisen — **Aug 2, 2026 is not a cliff for us**; design to the high-risk credit template only where it cheaply future-proofs.

---

## 3. The five use-cases

### UC-5 (START HERE) — Avaloq Comprehension & Test Engine: the agentic "rewire IT" bet
**Panel: 5.6/10 avg · effort XL (kernel scoped to L) · CHF 25-60M/yr steady-state (CHF 5-10M tracked, year 1)**

- **Problem.** The 2019 Avaloq go-live — one of the largest IT projects in Swiss history — left bank-specific PL/SQL parameterization and customizations that are under-documented and understood by a finite, aging, expensive specialist pool. That is a **continuity risk to member deposits**, not a productivity fad. Our thin frontier-AI bench cannot scale Avaloq/Backbase integration manually.
- **What it does.** Points an enterprise LLM at the Avaloq PL/SQL + Backbase estate to **auto-generate English/DE specifications, dependency maps and Mermaid call-graphs**, then **generates regression/unit tests** that become the merge gate. *Comprehension and test-generation first — NOT lights-out core migration* (Morgan Stanley DevGen.AI is the template, not auto-rewrite). Avaloq's own deep-call-chain limits (the Bankdata pilot degraded past "level 3") are exactly the scoping caveat that makes this credible to FINMA.
- **Agentic design.** A **planner/generator/evaluator** harness (the now-standard decomposition): planner analyzes legacy contracts, generator drafts specs/tests, evaluator validates against the existing test suite. **Human review on every PR is mandatory and non-delegable** — answering FINMA's "responsibility cannot be delegated to AI" and the empirically-measured **~2.5% harmful-action floor** (WorkBench-Revisited on Opus 4.8) that, at scale, means daily incidents without a hard gate.
- **Architecture.** **Frontier track:** Claude/Opus-class via the FINMA-accepted Swiss-region path, executed in **self-hosted sandboxes** so execution stays in-perimeter. **HONEST CAVEAT we put in front of the board, not hide:** managed-agent products keep *tool execution* in-perimeter but the *model reasoning call* still reaches the vendor — "code never leaves the perimeter" is an overclaim; for the most sensitive modules use the **sovereign Apertus track** (CH-GVA-2). **Hedge:** because the Fable/Mythos takedown hit *all* US-frontier supply at once, the fallback must be a **frontier-grade non-US/portable model (e.g. Mistral Large)** for hard comprehension — *not* Apertus, which is ~12-18 months behind on coding and cannot run the workload alone. CID/PII-redaction + DLP gateway in front of every call (SBA 3rd-ed Cloud Guidelines: no bank-client-data in prompts/training). Governance lane chosen **before** model selection (Microsoft Agent Framework), wired 1:1 to FINMA's seven areas.
- **Board KPI.** Engineering-time reduction on documented + test-gated change work (one tracked CHF figure, Lloyds model), with **"% of 2019-era custom modules with regenerated specs + passing generated tests"** as the resilience headline.
- **Top risks.** (1) Inference-residency overclaim — *disclose it.* (2) **Avaloq AG vendor-warranty/IP** — refactoring vendor-warranted code is a contract risk absent from naive pitches; v1 stays read-only/comprehension to sidestep it. (3) Test-gating + mandatory human review caps the labour multiplier (every agent PR still consumes a scarce reviewer). (4) "Hours freed" must be co-designed with the works council with an enforceable redeployment commitment, or it reads as headcount math.
- **Verdict.** *Sharpest pro (ambition lens, 7/10):* "the rare candidate where the ambition is also the safest place to start... the regenerated-spec coverage map is a genuine board-grade continuity asset that survives any model swap or API takedown." *Sharpest con (finma lens, 4/10):* the architecture's "FINMA-accepted Azure-OpenAI / RBI-Claude precedent" chain is partly fabricated and the vendor is under adverse FINMA attention — **so we correct the architecture (Swiss-region frontier + portable fallback), scope to comprehension, and bring it to the AI Desk before go-live.**

### UC-2 (FUND ALONGSIDE, AS THE SPINE) — Raiffeisen Agent OS: the federated, governed control plane
**Panel: 6.4/10 avg · effort XL · CHF 40-70M/yr at steady state (platform-attributable, *enabling not standalone P&L*)**

- **Problem.** A 200-controller cooperative with a thin bench cannot solve FINMA/ISO-42001 governance, MCP-connector certification and the dossier **200 times.**
- **What it does.** Builds the shared harness, the Swiss-resident runtime, and the **FINMA/ISO-42001 dossier template — ONCE, centrally** — so each regional bank consumes governed, certified agents as a utility. Turns the cooperative's biggest weakness (200 controllers) into its structural advantage: **one central certification → <2 weeks to local activation vs ~6 months standalone.**
- **Agentic design / architecture.** Sovereign-first, two-track by sensitivity; **single outbound encrypted gateway, no member data crosses the boundary** (Art. 47 + FADP + SBA Nov-2025). Per-bank policy overlays preserve each regional bank as an **independent, revocable FADP controller**. Microsoft Agent Governance Toolkit (zero lock-in) + per-agent cryptographic identity + full MCP audit logging.
- **Board KPI.** Banks live on the shared governed platform (target 200/246) + per-bank time-to-deploy a new certified agent.
- **Top risks.** (1) **Correlated systemic risk** — a single federated orchestrator means one regression hits all banks; per-bank overlays segment *authorization*, not the *shared failure surface*. FINMA's operational-resilience/concentration lens (Circ. 2023/1) reads that as a negative. **Mitigation: consume the commoditizing control plane; build only the federation/consent/dossier layer no vendor will ship.** (2) The **200-controller consent model is a legal, not technical, problem** and is the likeliest thing to kill the platform *after* CHF 8-12M is spent — solve it on paper with legal + works council *first*. (3) The runtime layer is itself single-vendor and pre-GA — name a runtime fallback, not just a model fallback.
- **Verdict.** *Sharpest pro:* "one-time build-avoidance plausibly worth CHF 100M+... structurally flips the federation's biggest weakness into a distribution advantage." *Sharpest con:* "fund as ENABLING INFRASTRUCTURE, not as a value-producing use-case on its own P&L" — and **drop the UBS-CAIO analogy; a cooperative is the anti-UBS.**

### UC-3 (NEXT) — RaiffeisenGPT "Genoss-Wissen": sovereign knowledge & advisory backbone
**Panel: 6.1/10 avg · effort L · CHF 60-90M/yr steady-state (*hours-freed, soft*)**

- **Problem.** We have a live 4,000-employee Copilot muscle with **no outcome metrics** — and our member-data-capable knowledge layer does not exist.
- **What it does.** A 100%-Swiss-resident, dual-model copilot for all ~12,000 staff, engineered from day one to **survive a Fable-5-style takedown** (proven via a live failover drill: kill the frontier track, confirm zero advisor-visible downtime on the sovereign track) and to be the reusable substrate every later use-case plugs into.
- **Architecture.** Sovereign track (Apertus/Mistral, CH residency, customer-managed keys) for client-identifying/credit; frontier track (Azure OpenAI Swiss regions) for low-sensitivity drafting. **HONEST CORRECTION:** Azure-Zurich is in-region but Microsoft is US-incorporated → **still Cloud-Act-reachable**; only the Swisscom/Exoscale+Apertus track is genuinely out of scope. Don't conflate "in-region" with "sovereign."
- **Board KPI.** Advisor/staff hours freed/yr (works-council-safe), with daily-active-rate + DE/FR/IT coverage as guardrails.
- **Top risks.** (1) Keystone sovereign model (Apertus-70B) is roadmap, not shipped — **benchmark before pinning sensitive workloads.** (2) A self-serve "custom-GPT factory" across 12,000 staff is a shadow-AI generator — govern it. (3) Member-data advisor-prep is the only hard-ROI lever and it is gated behind FINMA sign-off (months 6-9) — keep it a separate, separately-classified gate.
- **Verdict.** *Pro:* "substrate that compounds rather than depreciates... the moat is the governed, residency-correct integration layer, not the model." *Con:* don't boil the ocean — fund **staff copilot + sovereign failover drill ONLY**; defer member-data + citizen-builder to gated phases.

### UC-1 (GATE — high value, governance-heavy) — RaiffeisenGuard: agentic financial-crime ops
**Panel: 6.4/10 avg · effort L · CHF 8-15M/yr (*FTE-reallocation, unaudited*)**

- **Problem.** ~200 banks feed one central transaction-monitoring function; rule-based systems generate >90% false positives. This is our sharpest FINMA exposure and heaviest manual cost.
- **What it does.** Agents **assemble and pre-score every alert; a human owns every disposition** (never auto-close, never auto-file a SAR). Targets a 50-60% false-positive cut **reported with a true-positive guardrail** ("fewer junk alerts AND more real crime caught"). Tier-1 (TM triage) + Tier-2 (perpetual KYC-refresh) are genuinely fundable; **Tier-3 (cross-bank typology) is deferred.**
- **Architecture.** Read-only over Avaloq (never writes/re-parameterizes the core), sovereign default, wrapped in a FINMA-08/2024 + agentic-control-blueprint mapping. Go-live gate = **shadow-mode back-test against 12 months of known dispositions** — the FP/recall curve is the only number that reaches the board slide.
- **Board KPI.** False-positive reduction with the true-positive guardrail on the same slide.
- **Top risks.** (1) **Tier-3 cross-bank pooling implicates BA Art. 47 banking secrecy as a *criminal* matter** — it needs a statutory/FINMA-blessed basis, not 200 board sign-offs; **strip it from v1.** (2) HSBC-60%/Danske/McKinsey figures are external & *unaudited* — only our own back-test counts. (3) "Re-rank never suppress" is misleading if a true positive sinks to a decile no analyst reaches.
- **Verdict.** *Pro:* "the most defensible-to-FINMA use case because it improves (not weakens) detection." *Con:* "the headline ROI is asserted, not measured... strip Tier-3 and the differentiated thesis collapses back to a Tier-1 tool any vendor could deliver." → **Gate behind UC-5/UC-2 substrate; the back-test precedes any rollout funding.**

### UC-4 (GATE LATEST — biggest upside, biggest member/regulatory risk) — "Heimat": proactive member financial-health agent
**Panel: 6.1/10 avg · effort XL · CHF 40-90M/yr (*broker-leakage + hours, weakest-evidenced*)**

- **Problem.** Our 3.7M-member relationship is episodic; the cooperative promise "your bank looks after you" is unfunded at the data layer; mortgage renewals leak to brokers.
- **What it does.** A sovereign, multilingual companion in Backbase that proactively flags mortgage-renewal/refinancing readiness and SME pre-qualification, handing off to a **named human advisor** ("your advisor, amplified").
- **Architecture.** Two-track sensitivity-routed; first capability is the **low-credit-risk mortgage-renewal-readiness nudge + pre-qual pack**, opt-in, member-controlled frequency, on-screen AI disclosure.
- **Board KPI.** Net member-value uplift per active member + advisor hours freed, with CSAT and a published "% AI-assisted" figure.
- **Top risks.** (1) **Proactive product-adjacent nudges on member data flirt with regulated advice (FinSA/FIDLEG)** and are the single most assembly-detonating element — "CHF 18k is sitting idle" to conservative rural member-owners reads as surveillance + upselling. (2) Broker leakage is a *price* problem a reminder doesn't fix — discount the CHF 40-90M heavily. (3) The "read-only Avaloq" safety claim is contradicted by "IDP writes structured fields back into Avaloq" — a far higher change-control bar.
- **Verdict.** *Pro:* "the rare proposal where the ambition and the moat are the same thing... an always-on advised relationship competitors cannot see." *Con:* "a 24-36 month true-scale story sold as a 12-month arc"; the highest-value leg is the highest-regulatory-risk leg. → **Gate hard; member-facing is the *last* thing we ship, never the first.**

---

## 4. Portfolio matrix

| # | Use-case | Value (steady-state) | Effort | Risk | Time-to-first-value | Panel verdict |
|---|----------|----------------------|--------|------|---------------------|---------------|
| **5** | **Avaloq Comprehension & Test Engine** (rewire IT) | CHF 25-60M (CHF 5-10M yr-1) | XL → **kernel L** | Med (vendor-warranty, residency overclaim) — *zero member data* | **~90 days** (audited spec/test baseline) | 5.6 — *fund the kernel* |
| **2** | **Raiffeisen Agent OS** (governance spine) | CHF 40-70M (enabling) | XL | Med-High (correlated systemic risk; 200-controller consent) | 90 days (1 agent, 5 banks) | 6.4 — *fund as infrastructure* |
| **3** | **RaiffeisenGPT "Genoss-Wissen"** | CHF 60-90M (soft) | L | Med (sovereign-model maturity; shadow-AI) | 60-90 days (500-user pilot) | 6.1 — *fund staff-copilot slice only* |
| **1** | **RaiffeisenGuard** (agentic AML/KYC) | CHF 8-15M | L | High (BA Art. 47 on Tier-3; FINMA exposure) | ~90 days (shadow back-test) | 6.4 — *gate; strip Tier-3* |
| **4** | **"Heimat"** (member-facing growth) | CHF 40-90M | XL | **Highest** (regulated advice; member trust; coordination) | 6-12 mo (gated pilot) | 6.1 — *gate latest* |

*All CHF figures are framed as capacity reallocated, not headcount cut. Cross-bank precedents (HSBC, Danske, Lloyds, BBVA, Crédit Mutuel, Morgan Stanley) are **unaudited vendor/press figures** — only Raiffeisen's own back-tests and pilots reach the board slide.*

---

## 5. Sequencing — one substrate, compounding not fragmenting

**NOW (months 0-6) — build the spine + the safest engine on top of it:**
- **UC-2 (scoped) + UC-5 (kernel) together.** UC-5's 90-day deliverable (FINMA-defensible, audit-logged comprehension + test-gate pilot on ONE ring-fenced non-core repo) *is* the first proof that UC-2's substrate works: it exercises the Swiss-resident runtime, the CID/DLP gateway, the governed MCP connectors, and the FINMA-08/2024 dossier on the **lowest-risk, zero-member-data, highest-continuity-value** workload in the bank. We get a board-grade resilience asset *and* a battle-tested governance template in the same quarter.
- In parallel: open the **proactive FINMA AI-Desk dialogue**, stand up the AI-system inventory + model registry, and run the **Fable-5 failover drill** so "sovereign resilience" is demonstrated, not asserted.

**NEXT (months 6-12) — scale adoption on the proven substrate:**
- **UC-3 staff-copilot slice** rides the *same* runtime, gateway, registry and dossier — no cold start, it scales our existing 4,000-employee Copilot muscle to all 12,000 with measured hours-freed and DE/FR/IT guardrails. Citizen-builder + member-data modes stay as separate gated phases.

**GATE (months 12-24) — high-value, governance-heavy, only after the substrate + back-tests exist:**
- **UC-1 RaiffeisenGuard** (Tiers 1-2 only, behind the shadow-mode back-test gate) — reuses the read-only Avaloq connectors and FINMA dossier built in the NOW phase.
- **UC-4 "Heimat"** is the **last** thing we ship — member-facing, regulated-advice-adjacent, and dependent on every governance and trust artefact the prior four built. Never first.

**The compounding logic:** the expensive, reusable assets — Swiss data-residency, the CID/PII-redaction + DLP gateway, the planner/generator/evaluator harness, the governed MCP catalog over Avaloq/Backbase, and the FINMA-08/2024-mapped dossier — are built **once in the NOW phase** and inherited by every later use-case. Each subsequent bet plugs in instead of re-solving governance from scratch. That is how we avoid Gartner's **40%-of-agentic-projects-cancelled-on-governance** trap.

---

## 6. What we are NOT doing / traps

- **NOT routing bank-client data to DeepSeek/Qwen/GLM.** The ~9x cost advantage is real, but it is a non-starter on any regulated/secrecy path — cost lever for non-sensitive internal work *only*.
- **NOT running production MCP on long-lived static secrets.** ~53% of production MCP servers do; that plus formalized "Plant-Persist-Trigger" sleeper-injection attacks is a FINMA-audit failure waiting to happen. OAuth/OIDC + per-agent cryptographic identity from day one.
- **NOT treating Aug-2-2026 as a high-risk cliff.** Domestic-only Raiffeisen is largely outside the EU AI Act high-risk regime; the binding Swiss draft is only due end-2026. We ship now under FINMA's principles-based regime and design to the high-risk template only where it cheaply future-proofs (credit scoring).
- **NOT claiming "code/data never leaves the perimeter."** Managed-agent products keep *tool execution* in-perimeter; the *model reasoning call* still reaches the vendor. We disclose this to the AI Desk and route the most sensitive workloads to the genuinely-sovereign Apertus track. **And "in-region Azure" ≠ "Cloud-Act-out-of-scope."**
- **NOT making member-facing the first move.** UC-4 is the highest member-trust and regulated-advice risk; one *Blick* headline in an AI-fatigue climate is brand damage no value dashboard offsets. It ships last, gated.
- **NOT building a single 200-bank control plane that concentrates systemic risk.** A federated single orchestrator turns 200 uncorrelated risk pools into one correlated exposure — FINMA's concentration lens treats that as a negative. We consume the commoditizing governance plane and build only the federation/consent/dossier layer; per-bank overlays preserve each bank as an independent, revocable controller, and we solve the 200-controller *consent* problem on paper with legal + works council **before** spend.
- **NOT pinning the rewire-IT fallback to Apertus.** Apertus is the right *sovereignty* hedge for member data, but it is ~12-18 months behind on coding and cannot run frontier comprehension alone — the agentic-SWE fallback is a portable frontier-grade non-US model (e.g. Mistral Large).
- **NOT depending on a single frontier vendor for anything load-bearing.** The Fable/Mythos takedown proved access is revocable in 90 minutes. Multi-vendor — for *models and runtime* — is mandatory in production, not planning.

---

## 7. The decision + first funding ask

**The decision the board must make:** approve the **substrate-first portfolio strategy** — fund **one sovereign, FINMA-mapped agent substrate** and launch the two lowest-risk bets on it (UC-5 comprehension kernel + UC-2 governance spine), rather than greenlighting five parallel pilots that each re-solve governance and fragment the cooperative's posture.

**First funding ask (90-day Phase 0, ring-fenced):**
1. A small central platform squad (8-12 FTE, augmented by a Swiss governance/assurance partner — EY Switzerland is already staffing this) to stand up the governance lane (Microsoft Agent Framework), the Swiss-resident runtime + CID/DLP gateway, and the v1 FINMA-08/2024 / ISO-42001 dossier template.
2. Open the **proactive FINMA AI-Desk dialogue** before any critical-process agent.
3. Run the **UC-5 comprehension kernel** on ONE ring-fenced non-core Avaloq/Backbase repo: regenerate specs + dependency maps + generated test gate; recruit 5 pilot banks; co-design the works-council "augment scarce experts, free engineer hours" narrative with an enforceable redeployment commitment.

**Phase-0 exit criterion (Day 90):** a FINMA-defensible, audit-logged pilot delivering (a) a regenerated-spec/passing-test coverage baseline on the 2019-era estate, (b) one audited first-value (CHF) number, (c) a passed Fable-5 failover drill, and (d) a reusable dossier template — i.e. the evidence pack the board funds the full sequence against, with **zero member data and zero core writes** at risk.

---

## 8. Validation of the top-5 — why these, what they include

**Verdict: the top-5 holds with one disciplined swap.** A field of 31 candidates was uniformly scored, then three challengers judged the incumbent set from three independent angles — a doctrine-anchored lens, a FINMA/risk-conservative lens, and a cooperative-member-advocate lens. **All three converged on the identical conclusion**: keep the four substrate and back-office incumbents, swap **Heimat** out, and swap the **Sovereign SOC Triage Agent** in. That unanimity across independent lenses is strong corroboration, not a rubber stamp — each reached it from different first principles.

**Why the four survivors hold.** Three of the four are the load-bearing foundation the rest of the roadmap consumes: *Avaloq Comprehension* is the zero-data dependency root (its low 5.6 panel score was scope over-reach, not kernel weakness — it is scoped to comprehension-only v1); *Agent OS* is the governance control plane roughly nine field candidates host on, and it supplies the per-system runtime governance that ISO 42001 explicitly does **not** (ISO 42001 certifies the org, not the system); *RaiffeisenGuard* is the highest-FINMA-relevance owned risk function with a clean human-owns-every-disposition wall; *Genoss-Wissen* is the takedown-resilient all-12k staff copilot built on the proven 4,000-seat Copilot and the Crédit Mutuel / RBI cooperative analogues. None can be removed without stranding downstream work.

**Why the one swap.** *Heimat* was the single swap-vulnerable incumbent. It is member-facing on member CID from day 1, XL effort, soft and far-out hours-freed value, and FinSA / EU-AI-Act advice-adjacent — and it directly contradicts the portfolio's own doctrine, *"member-facing is the LAST thing we ship, never the first."* It earned its slot on revenue and strategic appeal, not near-term defensibility or sequencing. It yields to the *Sovereign SOC Triage Agent* (field rank #2, 8/10, finma:9), which fills the top-5's largest unowned gap — **cyber/SOC, which no incumbent touches** — exposes zero member data on day 1, ships in the NOW phase, and federates detection across the 200-bank shared core. For a cooperative, keeping the shared Avaloq core and e-banking estate from a network-wide breach is the most member-protective act available; its failure mode is existential for 3.7M members' trust, not a missed cross-sell. **Heimat is not killed** — it moves to the gated LATER member-facing wave (months 12–24), behind the governance dossier, the sovereign-failover drill, and member-trust/consent artefacts.

> **One evidence guardrail (carried from the fix-bottleneck audit):** the SOC lane is safe because it rests on the *detect/triage* side, which is independently verified (CVE/NIST/FIRST discovery growth holds). It must **never** drift into asserting that *fixing* is the new bottleneck — that fix-side gap is asserted, not measured. The adjacent Vuln-Remediation candidate (#11) correctly confines its v1 to the verified discovery side; that distinction must be preserved if it is later funded.

**Net effect:** the NOW top-5 is now entirely zero/low-member-data-on-day-1. The swap *tightens* the portfolio's defensibility posture — exactly the stance a FINMA-principles, Guidance-08/2024, works-council-sensitive cooperative board expects.

### The validated top-5

| # | Use-case | Panel / Effort | Why included (the slot rationale) |
|---|----------|----------------|-----------------------------------|
| 1 | **Avaloq Comprehension & Test Engine** *(START-HERE)* | XL→L kernel | Zero-data dependency root that de-risks the whole estate and seeds four downstream candidates; comprehension-only v1. |
| 2 | **Raiffeisen Agent OS** *(governance substrate)* | XL (enabling) | Build-once-for-200-banks control plane ~9 field candidates host on; supplies the per-system governance ISO 42001 does not. |
| 3 | **RaiffeisenGuard** *(financial-crime ops)* | L | Highest-FINMA-relevance owned risk function; human owns every disposition; BA Art.47 Tier-3 pooling correctly deferred. |
| 4 | **Genoss-Wissen** *(sovereign knowledge backbone)* | L | Takedown-resilient all-12k staff copilot on the proven Copilot precedent; works-council-defensible augmentation. |
| 5 | **Sovereign SOC Triage Agent** *(SWAPPED IN, gated)* | L | Fills the largest unowned gap (cyber/SOC); finma:9; zero member data day-1; federates across the 200-bank core. |

#### 1. Avaloq Comprehension & Test Engine — START-HERE kernel
- **Why included:** the zero-member-data dependency root; code-not-client-data, internal, test-gated — the most defensible possible first move. Its 5.6 score reflected scope over-reach, not the kernel.
- **Includes:** agentic regeneration of specs, dependency/blast-radius maps, and generated regression tests over the live Avaloq (PL/SQL) + Backbase estate shared by ~200 banks; structure-only diffs/maps can be tokenized so the model call carries no CID.
- **Excludes:** no production-code generation or auto-merge in v1; vendor-owned Avaloq/Oracle releases are tracked, never regenerated; codegen/change-gate layers are deferred to gated fast-follows.

#### 2. Raiffeisen Agent OS — federated governance substrate
- **Why included:** the control plane that makes every other agent FINMA-defensible; removing it orphans most of the field; the purest expression of the cooperative topology (pool controls/models/evals, never client data).
- **Includes:** model/agent inventory, policy-enforced routing (cheap default, escalate-with-logging), in-perimeter inference, a Compliance-API audit surface for every perimeter-leaving call, sovereign-fallback orchestration (Apertus/Mistral on CH-GVA-2), shared eval/red-team harness; hosts the consent-and-purpose ledger backbone now.
- **Excludes:** no cross-bank client/transaction-data pooling (BA Art.47); not itself member-facing; does not produce per-model validation dossiers (that is ModelDoc, in the governance spine).

#### 3. RaiffeisenGuard — agentic financial-crime ops
- **Why included:** mandatory FINMA ground and the highest-defensibility owned risk function; anchors a financial-crime vertical that Anlauf, Sippe, and onboarding-IDP reuse.
- **Includes:** agentic AML transaction-monitoring triage + perpetual KYC-refresh; reads, enriches, drafts the disposition rationale, routes to queue; human owns every disposition; federation-shaped on Agent OS.
- **Excludes:** no autonomous AML/sanctions disposition; no cyber/SOC (that is the new incumbent's lane); Tier-3 cross-bank raw-data pooling deferred for BA Art.47; no payment-ops repair, card disputes, or onboarding.

#### 4. Genoss-Wissen — sovereign knowledge & advisory backbone
- **Why included:** takedown-resilient all-12k staff copilot on the proven 4,000-seat Copilot and Crédit Mutuel (~1M advisor-hours) / RBI (20k-staff) analogues; works-council-defensible; the retrieval substrate under several downstream verticals.
- **Includes:** sovereign, citation-grounded internal Q&A for ~12k staff across CH-de/fr/it, deployable on CH-GVA-2 so frontier-revocation cannot dark it; absorbs the regulatory-correspondence (Korrespondenz) head; hosts Vorsorge-Brücke as a vertical.
- **Excludes:** no member-facing automated advice (staff-only); no transaction execution or decision ownership; no Swiss-German speech layer (Mundart/Stimme) or live-ops correlation (Genoss-SRE).

#### 5. Sovereign SOC Triage Agent — FINMA-grade autonomous-cyber (SWAPPED IN, gated)
- **Why included:** fills the largest unowned gap (cyber/SOC — a different discipline from RaiffeisenGuard's AML); the most FINMA/works-council-defensible entry in the field (finma:9, op-risk-weighted per Guidance 08/2024, human owns containment, real CrowdStrike+Anthropic Compliance-API audit trail); zero member data day-1; ships in NOW; federates across the 200-bank core.
- **Includes:** agentic Tier-1 SOC triage of SIEM/EDR alerts (auto-investigate, enrich with threat intel, dismiss false-positives with audit trail, escalate true-positives with an investigation packet + recommended containment); a sovereign Apertus/Mistral Tier-1 floor on CH-GVA-2 so a 90-minute frontier takedown cannot blind the SOC; every perimeter-leaving model call logged for FINMA; runs on a parallel CrowdStrike/SIEM substrate (does not block on Avaloq).
- **Excludes:** no autonomous containment on anything client-impacting (human analysts own it); no member data day-1; no vulnerability/patch remediation — and **must not** assert a "fixing is the new bottleneck" thesis (only the detect/discovery side is independently evidenced).

### Honorable mentions — strong candidates that just missed, and the one reason each
- **Zahlungs-Klärfall / Payments Exception Triage (8/10)** — strongest NEXT-tier bet; hard back-office FTE ROI on the growing ISO 20022/SIC5/VoP toil stream, but a fast-follow on Agent OS, not a substrate; capped by member-PII-on-day-1.
- **ALM-Copilot / IRRBB & Liquidity Narrative (8/10)** — read-only copilot on the cooperative's most material risk, finma:9, drafts-never-hedges; missed on narrow ALCO audience + lineage-substrate dependency.
- **Anlauf / SME onboarding & lending pre-decision (8/10)** — the clearest revenue-not-cost play, reusing RaiffeisenGuard's KYC substrate; behind the member-data gate (applicant CID day-1 + heavy Zefix/Betreibungsregister integration).
- **IT Service-Desk & Access/Provisioning (7.5/10)** — safest near-term win (internal ticket-actions + SoD-clean JML on the existing Copilot); excluded for low novelty and efficiency-only upside.
- **IKS-Prüfer / Audit Evidence-Testing (7.5/10)** — owns the unowned assurance-over-the-agent-fleet gap with deterministic full-population testing; second-wave, gated on Agent OS + deep Avaloq evidence-plumbing.
- **ModelDoc / Model-Risk Documentation (6.2/10)** — closes the per-model-validation-dossier gap ISO 42001 leaves open; part of the governance spine, not a standalone lead, and replicable by a Big-4/Avaloq.

---

## Appendix — method & honesty notes

Produced from live web research (FINMA 08/2024 + AI Desk, RBI-Austria copilot, Crédit Mutuel, UBS, Morgan Stanley DevGen.AI / Goldman Devin / Lloyds, Apertus + Swisscom/Exoscale sovereign hosting, Azure Swiss regions, Microsoft Agent Governance Toolkit) **and** this repository's 12-week AI-intelligence corpus. Five use-cases were generated from distinct strategic angles and scored by a 5-lens adversarial panel (FINMA/risk, CIO/budget-ROI, tech-durability, cooperative-fit, **ambition/upside**). Final ranking by average panel score (no use-case was unanimously rejected):

| Rank | Use-case | Angle | Score | Effort |
|---|---|---|---|---|
| 1= | RaiffeisenGuard (agentic AML/KYC) | risk-ops | 6.4 | L |
| 1= | Raiffeisen Agent OS (governance spine) | platform | 6.4 | XL |
| 3= | Genoss-Wissen (sovereign copilot) | knowledge | 6.1 | L |
| 3= | "Heimat" (member-facing growth) | member | 6.1 | XL |
| 5 | Avaloq Comprehension & Test Engine (rewire IT) | it-efficiency | 5.6 | XL→L kernel |

**Why we start with the #5-ranked option:** the low score is driven by *scope over-reach* the panel flagged (200-bank federation, frontier-vendor dependence, core refactoring), not by the kernel. Scoped to comprehension + test-generation on one ring-fenced repo, it is the **lowest-risk, zero-member-data, highest-continuity-value** place to build the muscle and the governance dossier every other use-case inherits — which is exactly why it leads the sequence even though it does not lead the score.

**Corrections the panel forced (kept visible on purpose):** Avaloq is Oracle PL/SQL, **not** COBOL; "in-region Azure" is **not** Cloud-Act-out-of-scope (only the Swisscom/Exoscale+Apertus track is genuinely sovereign); managed-agent products do **not** keep the model reasoning call in-perimeter; a prior draft's "FINMA-accepted RBI-Claude precedent" chain was partly fabricated and was corrected. All cross-bank ROI figures are unaudited vendor/press numbers; only Raiffeisen's own back-tests reach the board slide.

**Validation pass (§8, run after the above).** The five were stress-tested against a 31-candidate field (back-office ops, IT-ops/AIOps/SOC, regulatory/ESG/audit/treasury, contact-center/CX, frontier wildcards) by three independent challengers. Outcome: **four incumbents held; "Heimat" was swapped out of the NOW set for the Sovereign SOC Triage Agent** (unanimous across all three lenses, on merit). The §8 table is the authoritative final set; §1–§7's references to Heimat predate the validation and are retained for traceability. Where §8 and §1–§7 differ, **§8 governs.**
