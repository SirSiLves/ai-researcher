# AI / GenAI / Agentic — Long-Arc Trends

Status-meeting briefing of how the field is actually moving. Three layers, newest-first:

1. **Now** — paragraph-length snapshot of the current state. Refreshed monthly.
2. **Themed timelines** — for each major arc, "from this → to that" with dated waypoints. Refreshed monthly.
3. **Per-month log** — compact dated bullets, grep-friendly. Refreshed weekly.

Maintained by `ai-trends` (see `../pipeline/skills/ai-trends/SKILL.md`). Source for each entry is the just-written weekly or monthly rollup; every entry links back. Voice: active, bounded-confidence, no hype.

**Themes used so far:** `[enterprise-distribution]` `[inference-economics]` `[agent-platforms]` `[coding-agents]` `[interop-mcp-a2a]` `[agent-payments]` `[open-weight]` `[governance]` `[agent-memory]` `[evaluations]` `[sentiment]` `[swiss-market]`. Reuse existing tags before inventing new ones.

---

## Now — 2026-05

The frontier-lab race has become a listed-equity story under cost-curve pressure. OpenAI filed a confidential S-1 targeting a September listing above $1T, while Anthropic posted its first-ever profitable quarter (Q2: $10.9B revenue / $559M operating profit; compute-to-revenue down from 71¢ to 56¢) and SpaceX's own S-1 inadvertently exposed Anthropic's $1.25B/month Colossus compute deal — the "frontier labs lose money through 2028" consensus broke in a single trading week. Underneath, the cost gap mainstreamed: CNBC pegged Claude at ~9× the cheapest Chinese alternative on a standard workload and Chinese models climbed from ~1% to >60% of OpenRouter share inside 18 months, with Anthropic itself conceding US models are only "several months ahead." Enterprise distribution has inverted — frontier labs now own the customer relationship via Big Four alliances (KPMG global rollout across 138 countries; PwC 30k staff on Claude), ERP defaults (SAP × Anthropic GA Q3), and forward-deployed-engineering services JVs ($1.5B Anthropic-Blackstone-Goldman; OpenAI-TPG-Bain), with Ramp showing Anthropic taking the US business-AI adoption lead from OpenAI. The agent-interop substrate forked on a single Monday — Anthropic acquired Stainless (the codegen pipeline for OpenAI / Google / Cloudflare / Meta SDKs) and within 24 hours wound it down while Microsoft open-sourced Agent Framework + Governance Toolkit under the Linux Foundation AAIF; agent payments raced from spec to commerce stack (Stripe ACP, AWS Bedrock AgentCore Payments, Google AP2 + Universal Cart with 60+ payment partners) inside six weeks. The governance picture inverted in the same window: Trump pulled the federal AI cybersecurity EO on signing day with no new date, the EU AI Act Omnibus deferred Annex III high-risk to Dec 2027 / Annex I to Aug 2028, and FINMA's "immediate systemic risk" classification of Mythos-class capability became the highest formal designation in the global stack — sovereign-regulator capability evaluation is now the operational instrument while federal coordination dissolves. Capacity, not capability, is the binding constraint everywhere — including for users (Claude Code access yanks; doubled rate limits via SpaceX 300MW Colossus), labour (Cloudflare cuts 20% at record revenue on AI grounds), and developer sentiment ("AI psychosis" holds #1 on HN two days running; anti-AI mood now five-day baseline; Stanford AI Index records the widest expert-public gap on workplace impact to date).

---

## Themed timelines

### enterprise-distribution

- **2023 Q1** — Microsoft Copilot announced as the first frontier-lab-in-Office wedge, anchored by the OpenAI Azure exclusivity.
- **2024 Q1** — Anthropic + AWS strategic partnership stands up a credible second pole; ChatGPT Enterprise lands first F500 logos.
- **2024 Q4** — Frontier API revenue starts to grow into the same order of magnitude as ChatGPT consumer; "model + distribution-partner" displaces "model + dev API" as the GTM frame.
- **2025 Q3** — Big Four (Deloitte, PwC, EY, KPMG) sign frontier-lab alliances; consultancies become the primary distribution channel for regulated industries.
- **2026 March** — Atlassian cuts 1,600 (~10%) explicitly framed as AI development + enterprise sales reallocation — the first major SaaS layoff template (monthly/2026-03).
- **2026 April** — Mid-month Anthropic stacks $45B+ committed equity and ~8.5GW multi-cloud compute in 96 hours (AWS Rainier 5GW + Google 5GW + Broadcom 3.5GW); $30B ARR + 1,000 $1M-customers re-stated formally (monthly/2026-04).
- **2026 April** — Apr 17 Claude Design ships → Figma falls ~7% over the weekend; Apr 23 ServiceNow falls -18% (worst day on record) on GPT-5.5 launch, dragging IBM / Salesforce / Workday / Oracle — application-SaaS-as-AI-vulnerable becomes market consensus on a single trading day (monthly/2026-04).
- **2026 May** — May 4 Anthropic + Blackstone / H&F / Goldman / Apollo / GA / GIC / Sequoia stand up $1.5B FDE services firm; OpenAI mirrors with TPG / Bain. May 14-17 SAP Sapphire makes Claude default reasoning engine across Business AI Platform; PwC trains 30,000 staff on Claude; Anthropic takes the US business-adoption lead from OpenAI on the Ramp Index (34.4% vs 32.3%); $30B ARR run-rate reported (weekly/2026-W19, W20).
- **2026 May** — May 19-22 KPMG global alliance embeds Claude across 138 countries / 276,000 professionals; SAP × Anthropic Sapphire rollout confirmed GA Q3 2026; SBB (Swiss Federal Railways) live with 30,000-employee multilingual RAG on Mistral / SAP (weekly/2026-W21).

**Direction:** Enterprise distribution has structurally inverted — frontier labs now own the customer relationship; consultancies, ERPs and Big Four are downstream resellers; the application-SaaS layer is being repriced for agent-disintermediation in real time.

### inference-economics

- **2023** — Training cost dominates the field's economics; "$100M training run" is the year's load-bearing number.
- **2024** — H100 supply becomes the binding constraint; first per-token price cuts (GPT-4o, Claude 3.5 Haiku) reframe the unit-cost conversation.
- **2025 Q1** — DeepSeek-V3 / R1 surface roughly 10× cheaper inference at near-frontier quality; "training-vs-inference" splits into two cost curves.
- **2025 Q3** — Hyperscaler capex programs rise to $50-80B/year; non-NVIDIA inference silicon (Groq, Cerebras, SambaNova, AWS Trainium) becomes a credible procurement lane.
- **2026 March** — NVIDIA GTC: Vera Rubin claims ~5× Blackwell inference at ~10× lower cost/token; ~$1T Blackwell + Rubin order book through 2027; Sora retired on unit-economics grounds — first frontier-lab consumer product killed on cost (monthly/2026-03).
- **2026 April** — SemiAnalysis lands "true blended Opus 4.7 ≈ $0.99/Mtok" once 300:1 input/output and >90% cache-hit are accounted for; Meta lifts CY26 capex to $125-145B + $107B step-up; Microsoft to ~$190B; OpenAI briefs $1.4T multi-year GPU buildout with NVIDIA as financing counterpart (monthly/2026-04).
- **2026 May** — Cerebras IPO opens at $350 / closes ~$311 on ~$70B market cap — public market re-rates disaggregated inference at +25% over book; the OpenAI / Cerebras $20B MRA marks to market (weekly/2026-W20).
- **2026 May** — Capacity, not capability, is the binding constraint visible to users: Anthropic-SpaceX 300MW Colossus deal doubles Pro/Max/Enterprise rate limits; SemiAnalysis pegs N3 utilization >100% in H2 2026 with DRAM fabs at 90%+; Pragmatic Engineer reports Claude Code access yanks from paid accounts (weekly/2026-W19).
- **2026 May** — Anthropic Q2 prints $10.9B revenue / $559M operating profit — first-ever profitable quarter; compute-to-revenue drops from 71¢ to 56¢; SpaceX S-1 discloses $1.25B/month / $45B-through-2029 Colossus contract; OpenAI confidential S-1 targets $1T+ September listing on ~$25B annualised revenue. Cost-curve question moves from speculative to forced-disclosure (weekly/2026-W21).

**Direction:** Frontier-lab unit economics inflected this quarter — the "lose money through 2028" consensus broke as Anthropic printed profit; non-NVIDIA inference is now public-market capital; capacity scarcity has overtaken capability as the binding constraint going into IPO season.

### agent-platforms

- **2023 Q4** — AutoGPT / BabyAGI demos go viral but fail in production; "agent" remains a research framing.
- **2024 Q3** — LangChain / LlamaIndex consolidate as orchestration frameworks; first vertical agent products (Cognition Devin, Sierra) raise meaningful rounds.
- **2025 Q1** — Anthropic ships MCP; OpenAI Operator and Anthropic Computer Use put browser-controlling agents in production; Salesforce launches Agentforce.
- **2025 Q3** — Hyperscalers ship managed-agent services (AWS Bedrock Agents, Azure AI Foundry, Google ADK); Cloudflare Agents and Vercel position themselves as agent-runtime substrates.
- **2026 March** — Microsoft Agent Framework 1.0 GA + Agent Governance Toolkit + Copilot Studio multi-agent A2A; Snowflake SnowWork + ServiceNow AI Gateway + Slack-as-agent-OS land the same week — the agent control plane becomes a procurement category with four named lanes (monthly/2026-03).
- **2026 April** — Three architectural positions live concurrently: Microsoft Agent 365 + E7 Frontier Suite GA (governance plane); Salesforce Headless 360 live with 60+ MCP tools (open-MCP everywhere); SAP API Policy v4/2026 §2.2.2 explicitly prohibits autonomous AI calls (walled garden). Procurement decision now precedes model selection (monthly/2026-04).
- **2026 May** — Anthropic Managed Agents add self-hosted sandboxes + MCP tunnels to private servers — perimeter-friendly agent runtime; ServiceNow Knowledge 2026 ships cross-vendor AI Control Tower; SAP Joule Studio first ERP build-runtime with MCP / A2A interop native; Dell AI Factory 2.0 on NVIDIA HGX Rubin NVL8 (weekly/2026-W20, W21).
- **2026 May** — Sakana 7B Conductor RL-router beats every individual frontier worker in its pool on LiveCodeBench/GPQA-Diamond — first credible "small router on top of big models" pattern with numbers; reframes orchestration question against mono-vendor stacks (weekly/2026-W20).

**Direction:** Agent platforms have stratified into governance-plane (Microsoft), open-MCP (Salesforce, Anthropic), walled-garden (SAP) and ERP-build-runtime (SAP Joule Studio) lanes; the architecture decision is now upstream of the model decision.

### coding-agents

- **2023 March** — GitHub Copilot Chat GA; pair-programmer model with model-in-IDE.
- **2023 August** — Cursor enters market with VSCode fork + native Claude/GPT access; agentic editing emerges as a wedge.
- **2024 March** — Cognition Devin demo claims "first autonomous AI software engineer"; SWE-Bench begins as the de-facto coding benchmark.
- **2024 mid** — Aider, Sourcegraph Cody, Continue and Sweep mainstream the open-source coding-agent stack; per-request pricing dominates.
- **2024 December** — Claude Code GA; "harness around a model" becomes the product wedge rather than "best model."
- **2025 Q3** — Application-layer coding companies (Cursor, Replit, Cognition) begin training their own coding models on top of frontier checkpoints; subscription pricing replaces per-request.
- **2026 March** — Anthropic harness post (planner/generator/evaluator) becomes industry vocabulary within 96 hours; Claude Code v2.1.88 source-map leak ships a public reference implementation; Cursor 3 "Glass" ships the leaked vocabulary as product (monthly/2026-03).
- **2026 April** — Five-way race: Claude Code, OpenAI Codex (free in ChatGPT mobile), Gemini Code, Cursor Composer-as-a-service, xAI Grok Build; harness economics replaces benchmark performance as the yardstick. GLM-5.1 MIT clears SWE-Bench Pro 58.4 ahead of GPT-5.4 / Opus 4.6 (monthly/2026-04).
- **2026 May** — Cursor Composer 2.5 on Kimi K2.5 checkpoint reaches Opus 4.7 / GPT-5.5 parity at a fraction of the price — first credible app-layer-trains-its-own-coding-model test; CursorBench credibility takes a hit by Tuesday; DeepSeek stands up Beijing "Harness" team for DeepSeek Code; Claude Code does $2.5B+ annualised (weekly/2026-W21).
- **2026 May** — Anthropic Code with Claude London ships Multi-agent Orchestration, declarative Outcomes, cross-session Dreaming, Claude Finance + 10 pre-built agents, doubled Claude Code rate limits; "harness" replaces "agent" as the load-bearing primitive in practitioner discourse (weekly/2026-W21).

**Direction:** Coding agents commoditise on price by Chinese open-weight; harness engineering replaces benchmarks as the yardstick; the application layer training its own coding model is now a live commercial pattern, not a thesis.

### interop-mcp-a2a

- **2024 November** — Anthropic announces MCP (Model Context Protocol); open spec for LLM tool / data integration.
- **2025 Q1-Q2** — Early MCP adoption — community servers, Cursor / Continue / Claude Desktop wire it in; Anthropic ships hosted MCP registry.
- **2025 Q3-Q4** — A2A (Agent-to-Agent) protocol emerges, Linux Foundation discussion forms; ServiceNow / Snowflake / Salesforce ship first-party MCP servers.
- **2026 March** — MCP at 97M monthly SDK installs (vs ~2M at Nov-2024 launch); AIP scans ~2,000 servers and finds zero authenticated; first material agent-stack supply-chain attack (LiteLLM `.pth` credential stealer, 46,996 downloads in 46 minutes) (monthly/2026-03).
- **2026 April** — Linux Foundation Agentic AI Foundation (AAIF) takes governance at MCP Dev Summit NYC; Block donates Goose; Microsoft Agent Framework 1.0 GA ships MCP-native with A2A; Cloudflare Agents Week (20+ launches around MCP/A2A primitives); Salesforce Headless 360 exposes 60+ MCP tools (monthly/2026-04).
- **2026 May** — AWS MCP Server GA (first hyperscaler with IAM/CloudTrail/CloudWatch wiring); A2A v1.0 stable with 150+ orgs in production, Linux Foundation governance, signed agent cards, native in ADK/LangGraph/CrewAI/LlamaIndex/Semantic Kernel/AutoGen; MCP at ~110M monthly SDK downloads on 10,000+ enterprise servers; AAIF is the LF's fastest-growing project (weekly/2026-W19, W20).
- **2026 May** — Anthropic acquires Stainless (codegen pipeline for OpenAI / Google / Cloudflare / Meta SDKs and MCP servers, ~$300M+) and within 24h winds down all hosted Stainless products — including the SDK generator that has been the de-facto OpenAI SDK pipeline. Same Monday Microsoft open-sources Agent Framework + Agent Governance Toolkit under LF AAIF (weekly/2026-W21).

**Direction:** MCP + A2A consolidate as procurement-grade interop standards under Linux Foundation governance; substrate forks on a Monday into "Anthropic owns codegen + meters third parties" vs "Microsoft + LF AAIF = open"; security hardening (auth, signed manifests, EMA-over-DCR) is still a quarter behind adoption.

### agent-payments

- **2024** — Stripe ships basic agent-purchase pilots; PayPal explores LLM-checkout APIs — research-grade, no protocol layer.
- **2025 Q2** — Lightning / Coinbase ship crypto-rails experiments for agent transactions; "checkout for bots" is a venture thesis without standards.
- **2025 Q4** — Stripe begins drafting Agentic Commerce Protocol (ACP) with OpenAI; Visa / Mastercard convene working groups on intent verification + cryptographic mandates.
- **2026 May (W19)** — Memory in Managed Agents + agent-payments preview start surfacing in vendor roadmaps (weekly/2026-W19).
- **2026 May 14** — Stripe Agentic Commerce Protocol opens Link wallet (250M users) to AI agents — co-authored with OpenAI (weekly/2026-W20).
- **2026 May 17** — AWS Bedrock AgentCore Payments preview launches with Coinbase + Stripe — first managed payment capability for autonomous agents (wallet auth, session spending limits, transaction execution, governance) shipped before the threat model is fully understood (weekly/2026-W20).
- **2026 May 19-21** — Google ships Agent Payments Protocol (AP2) at Google I/O with 60+ launch co-signers (Mastercard, Amex, JCB, UnionPay, PayPal, Adyen, Coinbase, Etsy, Intuit, Salesforce, ServiceNow, Revolut, Worldpay, Ant International); Universal Cart rolls broadly across Search / Gemini / YouTube / Gmail by Thu with Nike, Sephora, Target, Ulta, Walmart, Wayfair, Shopify-Fenty retailers. First end-to-end agent-commerce stack from a frontier lab (weekly/2026-W21).

**Direction:** Agent payments raced from research-grade pilots in 2025-Q4 to a credit-card + PayPal + crypto launch list inside six weeks; threat model is still being written underneath shipped product; cryptographic-mandate primitives (AP2) and managed-execution (Bedrock AgentCore Payments) are the two design poles in market.

### open-weight

- **2023 July** — Meta ships Llama 2 — first credible open-weight frontier model with a commercial-friendly license; defines "open" as the Western pole.
- **2023 September** — Mistral 7B; "European sovereign frontier" emerges as a thesis.
- **2024 Q1** — Llama 3 / Mixtral 8x7B / DBRX cluster — open-weight is no longer 6-12 months behind closed.
- **2024 mid** — Qwen2 + DeepSeek-V2 catch frontier in Chinese language and reasoning; Apache-2 / MIT remain dominant licenses.
- **2024 July** — Llama 3.1 405B released; first open-weight model claiming parity with GPT-4 / Claude 3.5 Sonnet on broad benchmarks.
- **2024 Q4** — Qwen2.5 / DeepSeek-V3 ship — Chinese labs visibly leading the open-weight frontier on cost-per-token and coding benchmarks.
- **2025 January** — DeepSeek-R1 ships, ~10× cheaper than o1 at comparable reasoning — first market-moving open-weight reasoning model; Western press calls it "the Sputnik moment."
- **2025 Q3** — Chinese open-weight catches frontier on coding; HF download share visibly tilts East; license fragmentation begins (Apache / MIT / modified-MIT / OpenRAIL).
- **2026 April** — Meta Muse Spark closes weights ("Avocado", first Wang-era model) — Meta exits the open-weight frontier; GLM-5.1 (Z.ai, MIT) leads SWE-Bench Pro at 58.4 ahead of GPT-5.4 / Opus 4.6; MiniMax M2.7 trends #1 on HF; HF Spring 2026 logs Chinese models at 41% of Q1 download volume; DeepSeek V4 Preview ships on Huawei Ascend 950 "Supernode" silicon, undercutting Western frontier ~10× (monthly/2026-04).
- **2026 May** — Five frontier open-weights ship in one window (Kimi K2.6 1T MoE modified-MIT, DeepSeek V4, Gemma 4, Llama 4, Qwen 3.5); Kimi K2.6 reportedly beats Claude / GPT-5.5 / Gemini on programming. ClawBench reality check: Sonnet 4.6 leads agentic-eval at only 33.3% across 153 production-website tasks (weekly/2026-W19).
- **2026 May** — Mistral Large 3 (41B-active / 675B-total sparse-MoE, Apache 2.0) + Ministral 3 small-dense series — largest Western open-weight sparse-MoE of the year; Mistral becomes SAP's primary ECC→S/4HANA migration model. CNBC: OpenRouter share for Chinese models rose from ~1% (2024) to >60% (May 2026); Claude is ~9× the cheapest Chinese alternative on a standard 10-evaluation workload (weekly/2026-W21).

**Direction:** Open-weight frontier is now Chinese-dominant on cost and operationally on Huawei Ascend silicon; Western response is a fragmented sovereign-AI pole (Mistral, Cohere/Aleph Alpha, ETH/EPFL Apertus) plus a license landscape splintered across Apache / MIT / modified-MIT / OpenRAIL.

### governance

- **2023 November** — UK AI Safety Summit at Bletchley Park; AISI established; first sovereign-regulator capability-evaluation institution.
- **2024 Q1** — EU AI Act enters into force; risk-tier framework becomes the global reference for GPAI / high-risk regulation.
- **2024 Q4** — US AI Safety Institute (CAISI) takes shape under NIST; OpenAI / Anthropic sign first pre-deployment-testing pacts.
- **2025 Q3** — White House issues federal AI framework; states (Colorado, California) move on their own AI bills; EU AI Act high-risk obligations slated for Aug 2026.
- **2026 March** — U.S. policy split (March White House Framework + GUARDRAILS Act); EU Parliament's 569-45 Digital Omnibus mandate; Anthropic Mythos draft leak (Fortune Mar 26) reprices cybersecurity stocks intraday (monthly/2026-03).
- **2026 April** — Mythos / Glasswing 11-partner consortium becomes the standing template (GPT-Rosalind Trusted Access, GPT-5.5-Cyber TAC, Claude Security beta all reuse the partner-consortium shape); UK AISI Apr 30 finding that GPT-5.5 cyber capability is comparable to Mythos but generally available breaks the gating premise itself. Pentagon awards IL-6/7 to 8 vendors and excludes Anthropic for refusing autonomous-weapons + mass-surveillance guardrails — first defense-vs-commercial frontier-lab market split (monthly/2026-04).
- **2026 May** — EU AI Act Omnibus political deal: regulatory sandboxes deferred to Aug 2027; GPAI transparency grace cut 6→3 months; Annex III high-risk deferred to Dec 2027; Annex I to Aug 2028; CSAM/nudifier ban confirmed. Five Eyes publish first multi-government agentic-AI doctrine. UK AISI × Microsoft partnership funds societal-impact research (emotional dependency, professional-trust erosion) — first AISI work beyond capability evaluation (weekly/2026-W19, W20).
- **2026 May** — Mythos cascade in one week: White House blocks 70-org expansion (Mon); Germany BSI public warning (Tue); Fed + OCC pause US bank cyber exams + Anthropic agrees to brief G20 FSB (Wed); FINMA classifies Mythos-class as "immediate systemic risk" (Thu) — and Trump pulls the federal cybersecurity executive order on its own signing day with no new date. FINMA becomes the highest-jurisdiction formal classification in the global stack as the US federal anchor dissolves (weekly/2026-W21).

**Direction:** Regulatory cover for premium model pricing thins simultaneously on both sides of the Atlantic the same week OpenAI files its S-1; sovereign-regulator capability evaluation (UK AISI, FINMA, BSI, BaFin, FRB/OCC) is now the operational instrument while federal coordination dissolves.

### agent-memory

- **2024 Q1** — Mem0, MemGPT and Letta surface as research-grade agent-memory libraries; LangChain ships vector-store-as-memory patterns.
- **2024 Q4** — "Memory" remains a developer-experience feature, not a production primitive; ChatGPT ships consumer-memory toggle.
- **2025 Q2** — First production agent-memory architectures (Letta, Cognition Devin Wiki, Cursor memory) ship; per-user persistent context becomes table stakes.
- **2025 Q4** — Cloudflare Agent Memory, Anthropic Memory in API, Vercel Memory all ship as managed primitives; memory enters the agent-runtime layer.
- **2026 April** — Memory cluster lands as a citable research thread (Mnemonic Sovereignty survey + LinkedIn Hierarchical LTSM + NuggetIndex + MemRouter + Omni-SimpleMem + KV Packet); memory hardens from research toy to production architecture with audit-grade taxonomies (monthly/2026-04).
- **2026 May** — Storage-Is-Not-Memory query-time retrieval (93% LoCoMo vs Mem0 61.4%); STALE memory-invalidation benchmark (current agents fail to revise stored beliefs); EvolveMem self-evolving memory via AutoResearch — research thread sharpens around "memory ≠ storage" and revision/governance (weekly/2026-W19, W20).
- **2026 May** — Anthropic "Dreaming" cross-session learning preview launches at Code with Claude London — review prior sessions / extract patterns / surface insights between runs. First production cross-session learning shipped by a frontier lab (weekly/2026-W19, W21).
- **2026 May** — Code with Claude London makes Dreaming GA; Rethinking How to Remember (atomic-fact memory collapses, structured compositional representation preserves provenance) becomes the architectural framing; "governed collaborative memory as artificial selection" (Cuadros et al.) frames persistent multi-agent memory as a selection problem (weekly/2026-W21).

**Direction:** Memory moved from developer-experience toggle to runtime substrate with its own benchmarks (STALE, LoCoMo, MEME), research clusters (governance, validity, compositional), and shipped primitives (Anthropic Dreaming, Cloudflare Agent Memory) — production agent memory is now a 2026 procurement category.

### evaluations

- **2023** — HumanEval / MMLU / MT-Bench dominate; "benchmark gaming" is already a discussed risk but accepted.
- **2024 Q2** — SWE-Bench Lite / Verified become the coding standard; Arena (lmsys) becomes the reference for general capability.
- **2024 Q4** — ARC-AGI prize raises the bar; long-context / multi-turn / tool-use benchmarks proliferate.
- **2025 Q3** — Agentic benchmarks (OSWorld, MCP Atlas, Terminal-Bench) emerge; static eval starts visibly failing to predict production performance.
- **2026 March** — SlopCodeBench measures agent-driven code-quality erosion across sequential extensions; Cyber Defense Benchmark catches only 3.8% of malicious events across 106 attack procedures × 86 MITRE ATT&CK sub-techniques; evaluation thread shifts from capability to failure modes (monthly/2026-03).
- **2026 April** — Carlini's MAD Bugs goes 0 → 500+ → ~1,000 validated high-severity CVEs in 96 hours on the publicly available Claude harness — vulnerability research becomes a running-total exercise rather than a benchmark snapshot; Cyber Defense Benchmark 3.8% remains as defenders' gap-to-close (monthly/2026-04).
- **2026 May** — ClawBench reality check — Sonnet 4.6 leads agentic eval at only 33.3% across 153 production-website tasks; bottleneck has shifted from model capability to enterprise rollout. FutureSim (Goel/Chandak/Arun et al.) replays real-world news chronologically so agents are evaluated on whether they adapt to post-training-cutoff information — natural successor to ARC-AGI for agent benchmark integrity (weekly/2026-W19, W20).
- **2026 May** — DeepMind AlphaEvolve produces first improvement on Strassen-style 4×4 complex matmul (48 mults); claimed to recover ~0.7% of Google's worldwide compute and cut ~1% off Gemini training time. OpenAI general-purpose reasoning model disproves Erdős's 1946 planar unit-distance conjecture (verified by Alon / Wood / Bloom). First citable cases of frontier agents doing real AI / math R&D rather than product demos (weekly/2026-W19, W21).

**Direction:** Static benchmarks have lost predictive power for production agent performance (ClawBench 33% on real websites); the eval frontier has split into adaptive/replay-based evaluation (FutureSim), running-total vulnerability discovery (MAD Bugs, Claude Security), and the first verified novel-research events from general-purpose models (AlphaEvolve, Erdős disproof).

### sentiment

- **2023** — ChatGPT moment euphoria; near-universal positive sentiment on consumer / tech-industry side.
- **2024** — First scaling-law-skepticism essays (Gary Marcus, Subbarao Kambhampati); "AI bubble" framing starts to mainstream.
- **2025 Q2** — Apple "Illusion of Thinking" paper triggers durable skepticism cycle; LLM-as-research-tool backlash on arXiv / academic Twitter.
- **2025 Q4** — "AI slop" enters general vocabulary; Stack Overflow / arXiv visibly tighten LLM-content policies; first hallucination-class lawsuits land.
- **2026 March** — Atlassian's 1,600-headcount cut framed explicitly as AI development + enterprise sales is the first major SaaS layoff tied to AI; sets the template (monthly/2026-03).
- **2026 April** — Application-SaaS-as-AI-vulnerable becomes market consensus on a single trading day (Apr 17 Figma -7% on Claude Design; Apr 23 ServiceNow -18% on GPT-5.5 dragging IBM / Salesforce / Workday / Oracle); Meta's ~8,000 May layoffs framed by Zuckerberg as the "AI bill" on Q1 earnings — first Mag-7 CEO to do so explicitly (monthly/2026-04).
- **2026 May 8** — Cloudflare cuts ~1,100 (~20% headcount) at record Q1 revenue; stock -24%; framed explicitly as AI-driven. First major profitable cloud peer to cut at record revenue on AI grounds (weekly/2026-W19).
- **2026 May 16-17** — Mitchell Hashimoto's "I believe there are entire companies right now under AI psychosis" takes #1 on Hacker News two days running (1,727 → 2,061 pts); pair-reads cluster (Amazon workers making up tasks to meet AI quotas, Ontario auditors finding ~60% of AI scribe systems mix up drugs, arXiv bans hallucinated references for a year, Turso retires bug-bounty on AI-spam). Stanford AI Index supplies the macro: 23% of US public vs 73% of AI experts expect AI to positively affect work — widest gap the index has ever recorded (weekly/2026-W20).
- **2026 May 22** — HN sentiment hardens for a fifth straight day with four lead anti-AI items (Wozniak "actual intelligence," "unauthorised plagiarism," Google Antigravity bait-and-switch, "never use GCP for revenue-bearing AI workloads"); counter-pole is OpenAI's Erdős disproof at 1,402 pts. Skeptical-by-default is now the dominant developer mood, not a spike (weekly/2026-W21).

**Direction:** "Agent procurement is outrunning agent deployability" has hardened from one-day spikes into the dominant developer-sentiment frame; profitable-cloud-peer layoffs explicitly tied to AI are the labour-market signal; the public-expert sentiment gap on workplace impact is now the widest Stanford AI Index has ever recorded.

### swiss-market

- **2023-2024** — Switzerland visible mostly as a research location (ETH, EPFL, IDIAP, CSEM); little AI-specific commercial hiring; sovereign-AI thesis nascent.
- **2025 Q1** — ETH + EPFL launch Swiss AI Initiative on the Alps supercomputer (CSCS, 10k+ NVIDIA Grace Hopper GPUs); Apertus open Swiss LLM programme announced.
- **2025 Q3-Q4** — Anthropic + Microsoft AI scout Zurich; first frontier-lab Zurich seats surface; UBS / Swiss Life / Pictet begin formal GenAI hiring.
- **2026 March** — Mistral Voxtral TTS ships as first European-sovereign frontier voice stack (CC BY NC 4.0 weights on HF); Aleph Alpha integration discussions across DACH (monthly/2026-03).
- **2026 April** — Cohere acquires Aleph Alpha to form ~$20B transatlantic AI champion with Schwarz Group + Canadian/German government backing — third sovereign-AI pole (non-US, non-China); Anthropic Sydney/ANZ launch as second international after Tokyo (monthly/2026-04).
- **2026 May (W19)** — Swiss collector activates (2026-05-05): ETH Swiss AI Initiative MLE role for 70B Swiss LLM open; Anthropic Zurich Research Engineer / Scientist Pre-training seat surfaces; Microsoft AI Zurich (MAI Superintelligence) multiple LLM / agentic / data-flywheel / eval / production-code roles; ~707 AI Engineer roles open on LinkedIn CH (weekly/2026-W19).
- **2026 May (W20)** — KPMG Switzerland Responsible AI Lead; EY Switzerland posts Director — AI Services / AI Governance & Attestation (first datable Director-level AI-governance seat in Zurich); "Agentic AI" titles consolidating across at least four Swiss vendors; "RAG" appearing as explicit job title (weekly/2026-W20).
- **2026 May (W21)** — EPFL opens AI Research Engineer roles for Swiss AI Initiative (Apertus / open foundation models) — both ETH and EPFL now hiring simultaneously on the joint programme; Novartis Basel posts first Biomedical AI Methods Expert; SBB (Swiss Federal Railways) goes live with 30,000-employee multilingual RAG chatbot on Mistral / SAP. FINMA classifies Mythos-class as "immediate systemic risk" — highest-jurisdiction formal classification in the global Mythos stack as the US federal anchor dissolves (weekly/2026-W21).

**Direction:** Switzerland's AI market shape has emerged in a single quarter — sovereign 70B Apertus programme is hiring on both ETH and EPFL sides; foundation-model labs (Anthropic, Microsoft AI, Google DeepMind) hold open Zurich seats simultaneously; AI-governance crosses from JD-bullet to Director-titled roles; FINMA becomes the highest-formal regulator on Mythos-class capability globally.

---

## Per-month log

<!-- Newest month first. Weekly runs append bullets to the current month's section. Monthly runs both append summary bullets here and promote durable shifts to themed timelines above. -->

## 2026-05 (May)

- **2026-05-04** `[enterprise-distribution]` — Anthropic + Blackstone / Hellman & Friedman / Goldman / Apollo / GA / GIC / Sequoia stand up a $1.5B forward-deployed-engineering services firm against Accenture / Deloitte / Infosys; OpenAI mirrors with a TPG / Bain JV. The frontier-lab-as-services-channel template (Palantir FDE, not consulting) lands as a named GTM, separate from Big Four resale. → [weekly/2026-W19](weekly/2026/2026-W19.md)
- **2026-05-07** `[evaluations]` — DeepMind AlphaEvolve produces the first improvement on Strassen-style 4×4 complex matrix multiplication (48 multiplications) — claimed to recover ~0.7% of Google's worldwide compute and cut ~1% off Gemini training time. First citable evidence that frontier agents are doing real AI R&D rather than product demos; pairs with the 2026-05-22 OpenAI Erdős planar unit-distance disproof verified by Alon / Wood / Bloom. → [weekly/2026-W19](weekly/2026/2026-W19.md)
- **2026-05-08** `[sentiment]` — Cloudflare cuts ~1,100 jobs (~20% headcount; first mass layoff in 16 years) on the same day it prints record Q1 revenue and the stock falls 24%, explicitly framing the cut as AI-driven. First major profitable cloud peer to cut staff at record revenue on AI grounds; follows Cisco's same-week 4,000-head cut to refund AI/silicon capex. → [weekly/2026-W19](weekly/2026/2026-W19.md)
- **2026-05-14** `[inference-economics]` — Cerebras IPO priced at $185 / ~$56B fully-diluted (~20× oversubscribed), opened at $350, closed ~$311 on a ~$70B first-day market cap — year's largest US tech IPO. The public market re-rated the disaggregated-inference / non-NVIDIA thesis at +25% over the priced book on day one, marking the OpenAI/Cerebras $20B MRA to market and setting a floor for Groq, SambaNova, and 2026 inference-IPO candidates. → [weekly/2026-W20](weekly/2026/2026-W20.md)
- **2026-05-16** `[enterprise-distribution]` — Ramp AI Index April print flips the US business-AI adoption lead: Anthropic 34.4% (+3.8 pts) vs OpenAI 32.3% (-2.9 pts) — first lead change of the enterprise race. Pairs with PwC's 30,000-staff Claude rollout, Claude as default reasoning engine on SAP Business AI Platform (Sapphire), and Anthropic's $30B revenue run-rate report (from $9B y/y) — the "frontier-lab → vertical SaaS + Big Four + ERP-default" template now has both adoption-leaderboard and revenue validation. → [weekly/2026-W20](weekly/2026/2026-W20.md)
- **2026-05-18** `[interop-mcp-a2a]` — Anthropic acquires Stainless (~$300M+, per The Information) — the codegen pipeline that ships SDKs and MCP servers for OpenAI, Google, Cloudflare and Meta — then within 24 hours winds down all hosted Stainless products. Same day Microsoft open-sources its Agent Framework + Agent Governance Toolkit under the Linux Foundation AAIF. The agent-interop substrate forks on a Monday into "Anthropic owns codegen and meters third parties" vs "Microsoft + LF AAIF = open governance." → [weekly/2026-W21](weekly/2026/2026-W21.md)
- **2026-05-19** `[agent-payments]` — Google ships Agent Payments Protocol (AP2) at Google I/O with 60+ launch co-signers (Mastercard, Amex, JCB, UnionPay, PayPal, Adyen, Coinbase, Etsy, Intuit, Salesforce, ServiceNow, Revolut, Worldpay, Ant International); Universal Cart rolls broadly across Search / Gemini / YouTube / Gmail by Thu with Nike, Sephora, Target, Ulta, Walmart, Wayfair, Shopify-Fenty. First end-to-end agent-commerce stack shipped by a frontier lab, building on AWS Bedrock AgentCore Payments preview (Coinbase / Stripe, 2026-05-17) and Stripe ACP (2026-05-14). → [weekly/2026-W21](weekly/2026/2026-W21.md)
- **2026-05-22** `[inference-economics]` — OpenAI files confidential S-1 with the SEC (Goldman / Morgan Stanley book-runners) targeting a September listing above $1T on ~$25B annualised revenue; WSJ confirms Anthropic's Q2 at $10.9B revenue and $559M operating profit — first-ever profitable quarter, compute-to-revenue down from 71¢ to 56¢; SpaceX's own S-1 discloses $1.25B/month / $45B-through-2029 Colossus compute deal. The "frontier labs lose money through 2028" consensus broke in a single trading week; the field is now a listed-equity story under cost-curve pressure. → [weekly/2026-W21](weekly/2026/2026-W21.md)
- **2026-05-22** `[open-weight]` `[governance]` — CNBC publishes Artificial Analysis benchmark: Claude $4,811 / ChatGPT $3,357 / DeepSeek $1,071 / Kimi $948 / Zhipu GLM $544 for a standard 10-evaluation workload; OpenRouter share for Chinese models climbed from ~1% (2024) to >60% (May 2026); Anthropic's own May policy paper concedes US models are only "several months ahead." Same day Trump pulls the federal AI cybersecurity executive order on signing day ("I didn't like certain aspects"), confirming postponement is indefinite; the EU AI Act Omnibus pushes Annex III high-risk to Dec 2027 and Annex I to Aug 2028. Cost-gap mainstreams as IPO valuation tension; both major regulatory instruments slip simultaneously. FINMA's Mythos "immediate systemic risk" designation (Thu) becomes the highest formal classification in the global stack. → [weekly/2026-W21](weekly/2026/2026-W21.md)
- **2026-05-21** `[knowledge-layer]` — Pinecone Launch Week publicly buries the "RAG era" with Nexus (context compiler producing persistent, task-specific knowledge artifacts) + KnowQL (declarative agent query language for output shape / confidence / latency budgets), early-access customers reporting up to 90% token reduction and 30× faster time-to-completion; Snowflake Cortex AI Guardrails GA (Sat) makes run-time prompt-injection / jailbreak / indirect-injection detection a default inside Horizon Catalog; Cohere Command A+ ships full Apache 2.0 with native grounding-span citations. "Compilation-stage knowledge layer" lands as the architectural language at Tier-1 vendor level, two weeks after McKinsey Fajardo's "intelligence commoditizes, knowledge layer differentiates" framing — knowledge / governance / harness triad becomes the procurement frame, not a thesis. → [weekly/2026-W21](weekly/2026/2026-W21.md)
- **2026-05-31** `[inference-economics]` → escalation: Anthropic closes a $65B Series H at a $965B post-money valuation (co-led by Altimeter / Dragoneer / Greenoaks / Sequoia), overtaking OpenAI as the most valuable AI startup and nearly tripling February's $380B mark against a ~$47B revenue run-rate driven heavily by Claude Code. The W21 capital drumbeat (OpenAI S-1, Anthropic "queuing" $30B+) resolves into a leader, with this read as the last private round before an IPO — the first time this cycle the frontier-lab order is decided on financing rather than a benchmark, and HN split valuation from capability for the first time. → [weekly/2026-W22](weekly/2026/2026-W22.md)
- **2026-05-31** `[governance]` — AI security pivots from finding bugs to fixing them. Anthropic's Project Glasswing flagged 10,000+ critical/high vulnerabilities across 1,000+ open-source projects in ~30 days (a 27-year OpenBSD bug, 16-year FFmpeg flaw; Cloudflare 2,000; Mozilla 271 Firefox at 10× prior rate); the same week it shipped a Compliance API with 28 enterprise-security integrations, IBM + Red Hat committed $5B to a "Project Lightwell" remediation clearinghouse backed by ~12 Tier-1 banks, and Google launched AI Threat Defense. Models now out-discover human patch capacity, so the bottleneck moves from detection to maintainer/remediation throughput; cyberdefense becomes the most contested frontier-lab go-to-market vertical. → [weekly/2026-W22](weekly/2026/2026-W22.md)

---

<!-- ai-trends prepends new month sections above this line. -->
