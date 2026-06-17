---
title: Raiffeisen AI Decision Brief — What Project Is Worth Doing
audience: Board / CIO / Head of AI
date: 2026-06-16
status: decision brief (draft for board review)
method: synthesized from 12 weeks (2026-03-15 → 2026-06-16) of AI-industry intelligence in this repo; 5 candidate projects scored across 4 adversarial lenses (FINMA/risk, CIO/budget, tech-durability, cooperative-fit)
---

# Raiffeisen AI Decision Brief — What Project Is Worth Doing

## Bottom line

**Commit to the "Raiffeisen Assistant": a Switzerland-hosted, multilingual (DE/FR/IT/Swiss-German) internal copilot that answers branch and back-office staff questions over Raiffeisen's own product, regulatory and process documents and drafts routine correspondence — architecturally fenced OUT of any lending, credit, fraud or underwriting decision.** It is the single highest-rated candidate (avg 6.3/10, zero reject votes across all four hostile lenses) for one honest reason: it is the only proposal that delivers measurable staff-productivity value while *deliberately staying out of EU AI Act Annex III high-risk scope and out of FINMA's 6–12-month per-system conformity burden*. Every more ambitious candidate — member-data advisory, a 200-bank control plane, a member-facing mortgage bot, a governance utility — earns its higher strategic ceiling by walking straight into the cooperative's two hardest unsolved problems (200 independent data-controllers and member/works-council job-impact optics) inside the very first 90 days. We should buy down those risks with capability and governance muscle *first*, then graduate to the harder use cases from a position of evidence, not slideware.

A candid caveat the board should hear up front: this is a capability-building and efficiency play, not a moat. Its durable value is the in-house RAG/governance/sovereign-stack muscle Raiffeisen will need before any member-data or lending-side work — not a defensible product. We fund it on that basis.

---

## Why this, why now

The 12-week intelligence arc makes four facts load-bearing for any Swiss bank's AI decision:

1. **FINMA moved first and hardest.** On **21 May 2026** FINMA classified Mythos-class frontier capability as an *"immediate systemic risk"* — the **highest-jurisdiction Mythos designation in the global stack** (ahead of BaFin/BSI/FRB/OCC/FSB). Switzerland has **no horizontal AI law** (confirmed W24/June 8) and will not pass one; FINMA/FDPIC is the locus and, precisely because it is principles-based, it can issue banking-specific guidance *faster* than statutory regulators — it did so within days. **Any** Mythos-capable model on a critical path now implies a FINMA cyber-risk dossier. The cleanest way to stay below that bar is to not put a frontier model on a high-stakes decision path at all in v1.

2. **The real compliance clock is closer than the headline.** The EU AI Act Omnibus **deferred Annex III high-risk obligations to 2 Dec 2027** (and Annex I to Aug 2028) — so the "Aug 2 high-risk cliff" several proposals lean on is, for a non-high-risk tool, largely *manufactured urgency* (this brief flags it honestly). What actually binds **2 August 2026** is **Article 50 transparency / GPAI duties** (model cards, GPAI labelling, bias/output logs). The genuine near-term forcing functions named in the evidence are the **recast Product Liability Directive, insurer AI exclusions, and ISO/IEC 42001 procurement** — all live now. **ISO/IEC 42001 has flipped from differentiator to procurement table-stake** (EY Switzerland is hiring a Director-level "AI Governance & Attestation" role explicitly naming "EU AI Act / NIST AI RMF / ISO 42001"), a 6–12-month audit cycle we should start regardless of which project wins.

3. **Sovereign, in-perimeter deployment became real this window — and frontier API access became a live continuity risk in the same window.** Anthropic shipped **Claude Managed Agents (self-hosted sandboxes + single outbound encrypted MCP tunnel)** on ~19 May, explicitly *"the missing enterprise-deployability story for regulated buyers."* Days later, on **13 June**, a US Commerce export-control directive forced Anthropic to **suspend Fable 5 / Mythos 5 globally with a ~90-minute compliance window** — the first state takedown of a generally-available frontier model. The lesson is not "don't use frontier models"; it is **"design so a 90-minute foreign-government off-switch degrades, not breaks, you."** That mandates a **sovereign open-weight default tier** that keeps the service running on its own.

4. **The economics now favour an advisor-model split, and the model is the commodity.** Artificial Analysis benchmarked a standard workload at **$4,811 on Claude vs $544 on Zhipu GLM (~9×)**; OpenRouter Chinese-model share went **~1% → 60% in 18 months**; Anthropic's **15 June pricing reset** split Claude into a flat interactive pool and a *metered* agent pool, making **per-agent cost a first-order architectural variable**. The durable value lives in the **harness/governance layer, not the weights** — which is exactly where a conservative bank with a thin frontier-AI bench *can* compete. For Switzerland the advisor-model default must be **EU/Swiss open-weight (Mistral, with Apertus tracked), explicitly NOT Beijing-hosted (DeepSeek/Qwen)** given near-zero FINMA appetite.

And the competitive read: **Bank J. Safra Sarasin's AI Center of Excellence (LiteLLM + n8n + LangGraph + RAG) and Lombard Odier's "AI Engineer — Generative Applications" reqs recur across 10–11 distinct hiring days; Raiffeisen appears 4 times in 12 weeks (one a work-anniversary post).** Peers are building production RAG muscle. We are not. That is a capability gap to close on its own merits — *not*, as the cooperative-fit lens rightly warns, a "keep up with the private banks" FOMO argument we should ever put in front of a members' assembly.

---

## The recommended project, concretely

**Problem.** A junior Schalter clerk in Thurgau cannot get the same fast, correct, source-cited answer on a Raiffeisen mortgage-product term or an AML/KYC process step that a specialist in Geneva can — and routine correspondence drafting eats specialist time. Answers are slow, inconsistent across 200+ banks and four languages, and bottlenecked on specialist escalation.

**What it does.** A read-only internal assistant that (a) answers staff questions over Raiffeisen's own product, regulatory and process corpus with **mandatory source-citation to the actual Raiffeisen document**, and (b) drafts routine internal/customer correspondence **with a human approving every outbound text**. It does **not** decide credit, touch member accounts, move money, or do SME underwriting — the scope guardrail is enforced in code from gate 0. That single architectural fence is what keeps it out of Annex III "creditworthiness evaluation" scope and out of FINMA's heaviest model-risk treatment.

**Architecture — explicit on sovereignty and residency.**
- **Default tier (≈90% of traffic):** an **EU/Swiss open-weight model — Mistral as the de-risked default** (SBB-validated in Swiss production for DE/FR/IT), with **Apertus 70B tracked as a domestic upgrade path, not a launch dependency** (honest read: Apertus is still an ETH/EPFL research-track program; only an 8B variant is in any managed catalog). **Not** DeepSeek/Qwen.
- **Escalation tier (the hard minority):** a frontier model reached **only via Claude Managed Agents** — tool execution inside the Swiss perimeter through one outbound encrypted tunnel. **Honesty for FINMA:** Managed Agents keep *tool execution and data* in-perimeter, but the *model call still reaches Anthropic infrastructure* and Anthropic orchestrates context from outside the network. We will therefore **claim data-residency, not full inference-residency**, and design the **sovereign default to carry the service standalone** if the escalation tier is switched off (the Fable-5 continuity property). The harness is **model-agnostic by mandate** — every escalation path has a non-US fallback by design.
- **Control plane:** **OAuth/OIDC on every MCP/tool connection from gate 0** (puts us ahead of 91.5% of production servers still on static secrets — the single finding a FINMA exam will reach for — and clears the formally-articulated Sleeper-Attack threat model). **n8n** as the auditable, visual orchestration layer the risk team can read — with eyes open that n8n is **mid-absorption into SAP (Joule, $5.2B) and SAP's API Policy v4 now walls external agents**, so we treat the orchestration layer as swappable, not a permanent bet.
- **Supply chain:** **SBOMs + pinned, containerized dependencies + weekly patch cadence in CI/CD** (Glasswing found 10,000+ critical/high CVEs across 1,000+ OSS projects in 30 days; LiteLLM shipped a credential-stealer to ~47k installs in 46 minutes — assume frequent breaking patches and that any OSS library could carry a backdoor).
- **Data residency for a cooperative:** a **federated governance model** — central control plane + **per-regional-bank data-residency profile** — because Raiffeisen Zurich's clearance cannot be assumed to clear Raiffeisen Thurgau. We validate the *single-controller* case in the pilot and treat the multi-controller fan-out as an explicitly separate, funded program (see below).

**Governance hooks.** Org-level **ISO/IEC 42001** certification track opened now (6–12-mo cycle, procurement table-stake) **PLUS** per-system **Article 50** artifacts (model card, GPAI label, bias/output logs) ready by 2 Aug 2026. A red-team plan with a **stated leak-rate acceptance threshold** and DLP on retrieval output, tested against the field-proven **€0.01-memo prompt-injection class** and multi-turn "boiling-the-frog" escalation.

**Board-slide outcome.** A measured **20–30% reduction in time-to-answer** for the covered query/drafting categories across the pilot cohort, with **deflection rate** (routine questions resolved without specialist escalation) as the headline KPI. **Defensible anchor:** Salesforce's **audited $1.2B Agentforce ARR (+205% YoY)** as proof enterprise agents produce real ROI. We **do not** cite the unaudited "+79% PRs/dev" figure, and — per the cooperative-fit lens — we **reframe "deflection" as specialist-time-relief**, not headcount savings, and pair the board's reclaimed-hours economics with an explicit **no-net-reduction / redeployment** posture so we are not telling the board and the works council two different stories.

---

## First 90 days (fundable pilot) and the 12-month arc

**First 90 days — single-region, single-domain, contained blast radius.** One regional bank, two high-volume document domains (e.g. mortgage product terms + AML/KYC process FAQ) in DE first (FR ready).
- **Days 0–30:** stand up the n8n + Mistral-default RAG stack inside the Swiss perimeter; ingest the two domains; **OAuth/OIDC + SBOM/pinned-deps + read-only scope guardrail enforced from gate 0**; baseline current time-to-answer and escalation rates; convene the works council *and a member delegate* into the gate decision (not a post-hoc survey).
- **Days 30–60:** 30–50 branch/back-office users live; wire the Claude Managed Agents escalation tier through the single outbound tunnel; produce the Article 50 transparency pack; open the ISO/IEC 42001 org-cert track.
- **Days 60–90:** measure deflection and hours reclaimed vs baseline; run a red-team pass on poisoned source docs with a stated leak-rate threshold; run a **documented model-swap/continuity drill** (disable the escalation tier, prove the sovereign default keeps serving — the Fable-5 test); deliver a board pack with the measured KPI delta, per-query TCO **built on a real benchmark cohort (not the borrowed Deutsche Bank €2B number)**, an explicit non-high-risk scoping memo for FINMA, and the federation rollout design.

**12-month arc.**
- **Months 3–6:** if the pilot clears its gate, expand to FR/IT/Swiss-German and 3–5 additional regional banks **as the proving ground for the federation/consent model** — this is where the project's real risk lives, so we fund it as its own phase with per-bank works-council sign-off, not as a free "scale-out."
- **Months 6–9:** complete ISO/IEC 42001 evidence collection; harden the reusable per-system Article 50 dossier template.
- **Months 9–12:** board gate to decide whether the proven sovereign stack + governance muscle graduates to a **member-data advisory pilot** (the Rank-2/Rank-4 use case) under a *separate* FINMA conformity track. No member-data and no lending decisioning enters scope before this gate.

---

## Grafts from the runner-ups (what we steal and from whom)

- **From Rank 2 (SovereignDesk):** the **documented resilience drill** — disable the frontier-escalation tier and prove the sovereign default keeps serving — adopted as a hard Day-60–90 deliverable, and the **per-bank scoped index / FADP boundary** discipline (each bank gets its own index, never one central pool).
- **From Rank 3 (GACP / "Agent OS"):** the **O(200)→O(1) governance arbitrage** — we don't build the full multi-tenant control plane now (it concentrates systemic risk and over-reaches on consent), but we **build the Article 50 dossier + model-card + bias-log artifacts as a *reusable template* every bank inherits**, capturing the "certify-once" economics without the premature centralization that the cooperative-fit and FINMA lenses both flagged as a single-point-of-failure and a consent problem.
- **From Rank 4 (RaiBot Hypothek):** two design rules that survive every model swap and takedown — **"the LLM narrates, never computes"** (all numbers from deterministic Raiffeisen calculators called as tools) and **mandatory source-citation on every answer**, both folded into the drafting/answer paths now so they are habits before we ever go member-facing.
- **From Rank 5 (FINMA-Ready):** the **partner-led delivery model (EY/KPMG Switzerland, both now shipping Claude natively)** to bridge the in-house talent gap — but as a *capability-transfer* engagement with explicit hand-back milestones, because the panels rightly warned this can quietly become permanent systems-integrator lock-in on our most security-critical substrate.

---

## What we are NOT doing, and why

- **Rank 2 — SovereignDesk (member-data mortgage/SME advisory).** *Set aside because the value rests on putting banking-secrecy-protected member loan/KYC files through the agent pipeline on day one — a categorically higher FADP/FINMA risk class.* Its load-bearing "proven SBB pattern" is **mischaracterized**: SBB's 30,000-employee bot answers *S/4HANA migration* questions, not member-financial data — so the precedent does not de-risk member-data reasoning. Its Article-6 single-compound conformity assessment is a **2–4-year, 8-figure program** dressed as a 90-day pilot. Right second move, wrong first move — we sequence it behind the Month-9–12 gate.
- **Rank 3 — Genossenschaft Agent Control Plane.** *Set aside because it solves the cooperative's hardest problem (200 independent banks) by assuming away the consent: "certify once, deploy 200×" requires ~200 sovereign cooperative boards to cede regulatory accountability to a central artifact — a governance/legal bet, not an engineering one, and unproven with FINMA or a single bank.* It also **inverts the risk profile**: one shared control plane means one defect or supply-chain compromise exposes all 200 banks in a single FINMA exam — the exact correlated systemic risk FINMA just flagged. We harvest its template idea without the premature centralization.
- **Rank 4 — RaiBot Hypothek (member-facing co-pilot).** *Set aside because member-facing is the wrong place to make our first mistakes.* Its value slide targets "25–40% of intake deflected" benchmarked against a **cost-savings** competitor — which a works council reads as headcount reduction with a friendlier label, against a verified, *sustained* AI-fatigue baseline ("I'm Tired of Talking to AI," 1,717 pts; not a spike). Forcing a chatbot between an often older, rural Swiss-German member and their local advisor on their largest financial decision risks the exact head-office-distancing the cooperative exists to prevent. Excellent design rules (narrate-don't-compute, source-citation) graft in; the member-facing surface waits.
- **Rank 5 — FINMA-Ready governance utility.** *Set aside (lowest score, 5.4) because it asks a member-owned cooperative with no demonstrated AI track record to be a first-mover building — and reselling — a frontier-AI governance utility, while choosing SME/mortgage credit pre-qualification (a 3-agent high-risk compound that automates the local credit officer's affordability judgment) as its day-90 proving ground.* That is the single most member-sensitive decision in a cooperative, chosen as the first thing members see. Its inference-residency and "Managed Agents shipped" claims were also among the most contested by the FINMA lens.

**Traps we are explicitly steering around (from the evidence):**
- Do **not** treat the Aug-2 date as a high-risk cliff — Annex III is deferred to **Dec 2027**; only Article 50/GPAI binds Aug 2. We do the Article 50 work and skip the manufactured urgency.
- Do **not** claim "inference-residency solved" — Managed Agents keep tool execution in-perimeter; the model call still reaches Anthropic. We claim data-residency and design for standalone sovereign continuity.
- Do **not** treat ISO 42001 cert as system conformity — it governs the org, not the system; we need both.
- Do **not** present the SBB bot as "the exact pattern in Swiss production" — it's an SAP-migration helpdesk. Use it only as a shape, not a proof.
- Do **not** put DeepSeek/Qwen on any path — near-zero FINMA appetite. Swiss advisor-model default is EU/Swiss open-weight.
- Do **not** mandate static-secret MCP — 53% of production is on static secrets; OAuth from gate 0 is non-negotiable.
- Do **not** assume the federation is a config line — it is the project's real second phase.

---

## Top risks and how the pilot de-risks them

| Risk | Evidence | De-risking structure |
|---|---|---|
| **Frontier-API off-switch** | Fable-5/Mythos-5 forced offline globally in ~90 min (13 June) | Sovereign Mistral default carries the service standalone; documented continuity drill is a Day-60–90 deliverable; model-agnostic harness |
| **Inference-residency overclaim fails FINMA review** | Managed Agents orchestrate context from outside the perimeter | We claim data-residency only; sovereign default does the high-volume work; escalation tier is optional and severable |
| **Cooperative consent / 200 data-controllers** | Zurich ≠ Thurgau clearance; 200 independent member-owned boards | Pilot validates one controller; federation is a *separately funded* phase with per-bank works-council + member-delegate sign-off, not a scale-out line item |
| **Job-impact optics / member trust** | Sustained AI-fatigue baseline; Atlassian/Cloudflare AI-framed cuts | "Specialist-time-relief," explicit no-net-reduction/redeployment posture, works-council + member delegate inside the gate decision; never benchmark on a cost-out competitor |
| **Prompt injection over bank data** | €0.01 Bunq memo PoC; Opus 4.8 still 2.5% harmful actions on WorkBench | Read-only scope (nothing it can be tricked into *does* anything), input sanitisation, DLP on retrieval, red-team with a stated leak-rate threshold, human approves all outbound text |
| **OSS supply-chain compromise** | Glasswing 10k+ CVEs/30 days; LiteLLM credential-stealer | SBOMs, pinned/containerized deps, weekly patch cadence, anomalous-token-usage detection |
| **18-month commoditization** (a hyperscaler/Avaloq ships an equivalent governed assistant) | SAP Joule, Microsoft Copilot, ServiceNow racing managed RAG into the perimeter | Fund as **capability-building** (RAG + governance + sovereign-stack muscle for later member-data/lending work), with a contained budget and a hard pilot gate before scale-out |

---

## The decision the board must make

**Approve a contained-budget, single-region, read-only internal-assistant pilot — explicitly scoped out of all lending/credit/fraud decisioning — with a hard 90-day decision gate before any multi-region fan-out, and a Month-9–12 gate before any member-data or lending-side use case is even scoped.** Concretely, the board is asked to: (1) fund the 90-day pilot at one regional bank in DE; (2) authorize opening the ISO/IEC 42001 org-certification track now; (3) authorize a partner-led delivery engagement (EY/KPMG-CH) with explicit capability hand-back; and (4) endorse the principle that **the federation/consent model and any member-data use are separate, separately-gated programs** — not implied by this approval. What we are buying is the muscle and the governance posture to do the harder, higher-value work later, safely — not a finished moat today.

---

## Appendix — how this brief was produced

Synthesized from this repository's 12-week intelligence corpus (3 monthly rollups, 15 weekly rollups, 1,492 entity dossiers, the radar/gap tracker, 2026-03-15 → 2026-06-16). Five readers extracted decision-relevant evidence (Swiss/EU regulatory, peer-bank deployments, enterprise architecture, cost/sovereignty, risk/sentiment — 66 findings). Five candidate projects were generated from distinct strategic angles, then scored by an adversarial panel across four hostile lenses. Final ranking (avg score / reject votes across all lenses):

| Rank | Candidate | Angle | Score | Rejects |
|---|---|---|---|---|
| 1 | **Raiffeisen Assistant** (sovereign internal copilot) | pragmatic-roi | **6.3** | 0 |
| 2 | SovereignDesk (member-data mortgage/SME advisory) | sovereign-differentiator | 6.0 | 0 |
| 3 | Genossenschaft Agent Control Plane ("Agent OS") | platform-not-pilot | 5.9 | 0 |
| 4 | RaiBot Hypothek (member-facing mortgage co-pilot) | member-facing | 5.6 | 0 |
| 5 | FINMA-Ready (AI governance / model-risk utility) | regulatory-moat | 5.4 | 0 |

No candidate was unanimously rejected; the spread is narrow, which is itself a finding — the *sequencing* (which to do first) mattered more than the *idea*. Vendor-reported figures (Salesforce ROI, Deutsche Bank cost numbers) are flagged in-text as unaudited where used.
