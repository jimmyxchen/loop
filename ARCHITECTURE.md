# ARCHITECTURE.md

Status: initial engineering plan, 2026-07-24

## Purpose

This document is the engineering blueprint for Loop.

Loop is a frontend self-evolution factory for the AdventureX track. It takes a short requirement card plus one style sentence, generates a runnable webpage, creates or sources visual assets, verifies the result with browser automation and multimodal review, then loops through code fixes or asset redraws until it reaches a shippable output or a clear stop condition.

The architecture should optimize for:

1. A convincing hackathon demo.
2. Repeatable unattended runs.
3. Full artifact history: code, assets, screenshots, verification results, fixes, metrics.
4. Easy inspection after a 1-hour run.
5. Boring implementation choices.

## Architecture Summary

### Existing Inputs

The current source material is intentionally small:

- `PRD.md` defines product goal, agent roles, core loop, deliverables, metrics, risks, and milestones.
- `exampler-topics.md` lists official-style challenge examples and constraints.

### Minimum Useful System

- One local TypeScript app, not a distributed multi-service system.
- One orchestrator process that runs the loop.
- File-backed state under `runs/`, not a database at first.
- Playwright for browser execution, screenshots, and interaction checks.
- Provider adapters for model calls and image generation.
- Generated web pages isolated under per-run workspaces.

### Deferred Scope

- Multi-tenant SaaS.
- Remote job queue.
- Kubernetes, Redis, or database-backed orchestration.
- Full plugin marketplace.
- Human collaboration UI beyond run inspection.

### Complexity Constraints

- The first implementation should touch more than 8 files because this is a new project, but it should not introduce more than 2 durable abstractions per domain.
- "Agents" should be plain modules behind interfaces, not independent services.
- Parallelism should be limited to safe steps: asset generation/search can run beside frontend planning, but verification and refactor rounds stay sequential.

### Technology Choices

- [Layer 1] Use Playwright for browser automation, screenshots, trace capture, and web server management. It already supports `webServer`, projects, retries, trace-on-retry, and screenshot comparison configuration.
- [Layer 1] Use OpenAI structured outputs or strict function schemas for planner/verifier/refactor JSON. JSON mode alone only promises valid JSON, not schema correctness.
- [Layer 1] Use the current OpenAI image generation API through an adapter, with cost and rate-limit accounting.
- [Layer 3] Keep run state as append-only JSON files first. A database adds accidental complexity before there are concurrent users.

### Key Decisions

These decisions are the backbone of the first implementation:

1. Durable run state is required.
   - `runs/<run-id>/state.json` and round manifests are first-class artifacts because the 1-hour unattended requirement must be auditable after the fact.
2. Verification output must be structured.
   - The verifier emits issues with severity, owner, evidence, and suggested fix so the next round can act automatically.
3. Generated app files stay isolated.
   - Generated apps live only under `runs/<run-id>/workspace/` to avoid self-editing the orchestrator.
4. Agent roles are local modules first.
   - Planner, frontend, asset, verify, and refactor roles are module boundaries, not separate services.

Supporting implementation decisions:

- Prompts, schemas, and validators live together per agent to prevent drift.
- Every asset gets a manifest entry with source, prompt/query, provider, cost, and round.
- Budget checks happen before every model, image, and browser-heavy step.
- The long-run process persists artifacts to disk and keeps only compact round summaries in memory.
- Screenshot and trace storage is bounded so long runs do not balloon indefinitely.
- Retries are capped per step and globally.

## Recommended Stack

Use TypeScript and Node.js for the orchestrator.

Recommended first stack:

- Runtime: Node.js 22+, TypeScript ESM.
- CLI: `tsx` or compiled Node entry.
- Generated app template: Vite + React + TypeScript.
- Browser automation: Playwright.
- Unit tests: Vitest.
- E2E tests: Playwright Test.
- Validation: Zod or JSON Schema with a small validation wrapper.
- State: append-only JSONL event log plus materialized `state.json`.
- Reports: static HTML/Markdown generated from run artifacts.

Do not start with Next.js unless the product explicitly needs server-side rendering. The generated outputs are hackathon webpages and interaction demos; Vite is smaller, faster, and easier to sandbox per run.

## System Boundaries

Loop has five logical agents, implemented as modules inside one process:

1. Planner Agent: turns requirement + style into tasks and verification criteria.
2. Frontend Agent: writes or edits the generated webpage.
3. Asset Agent: generates, searches, or reuses assets.
4. Verify Agent: captures screenshots, runs interactions, scores the output, and emits structured issues.
5. Refactor Agent: applies focused code or asset-prompt fixes from verifier issues.

They communicate through typed state, not free-form chat transcripts.

```
User input
  |
  v
RequirementCard
  |
  v
+-------------------+
| Orchestrator      |
+-------------------+
  |        |        |
  |        |        +----------------+
  |        |                         |
  v        v                         v
Planner  Asset Agent             Frontend Agent
  |        |                         |
  +--------+-----------+-------------+
                       |
                       v
              Generated workspace
                       |
                       v
                 Playwright run
                       |
                       v
                 Verify Agent
                       |
              structured issues
                       |
         +-------------+-------------+
         |                           |
         v                           v
  Refactor Agent               Asset redraw
         |                           |
         +-------------+-------------+
                       |
                       v
                  next round
```

## Repository Layout

Target layout after implementation:

```
.
|-- ARCHITECTURE.md
|-- PRD.md
|-- exampler-topics.md
|-- package.json
|-- playwright.config.ts
|-- tsconfig.json
|-- src/
|   |-- cli/
|   |   `-- main.ts
|   |-- orchestrator/
|   |   |-- run-loop.ts
|   |   |-- stop-conditions.ts
|   |   `-- budget.ts
|   |-- agents/
|   |   |-- planner/
|   |   |-- frontend/
|   |   |-- asset/
|   |   |-- verify/
|   |   `-- refactor/
|   |-- adapters/
|   |   |-- model-provider.ts
|   |   |-- image-provider.ts
|   |   `-- browser-runner.ts
|   |-- state/
|   |   |-- schema.ts
|   |   |-- repository.ts
|   |   `-- events.ts
|   |-- report/
|   |   `-- build-report.ts
|   `-- templates/
|       |-- vite-react/
|       |-- canvas-webgl/
|       |-- game-3d/
|       |-- audio-visualization/
|       `-- animation/
|-- tests/
|   |-- unit/
|   `-- integration/
|-- e2e/
`-- runs/
    `-- .gitkeep
```

`runs/` should be ignored by git except for `.gitkeep` and small checked-in sample fixtures if needed.

## Core Data Model

The data model must let someone reconstruct a run without reading console logs.

```ts
type RequirementCard = {
  text: string;
  style: string;
  source: "manual" | "example" | "judge";
};

type RunState = {
  id: string;
  status: "created" | "running" | "passed" | "failed" | "stopped";
  requirement: RequirementCard;
  budgets: BudgetState;
  rounds: RoundState[];
  finalOutput?: OutputSummary;
  stopReason?: string;
};

type RoundState = {
  index: number;
  status: "planned" | "generated" | "verified" | "fixed" | "failed";
  plan: PlannerOutput;
  assets: AssetManifestEntry[];
  generatedFiles: FileManifestEntry[];
  screenshots: ScreenshotEntry[];
  verification: VerificationResult;
  fixes: FixEntry[];
  metrics: RoundMetrics;
};

type VerificationIssue = {
  id: string;
  roundIndex: number;
  fingerprint?: string;
  severity: "blocker" | "major" | "minor";
  category: "layout" | "interaction" | "asset" | "style" | "requirement" | "runtime";
  owner: "frontend" | "asset" | "planner" | "verify";
  evidence: string;
  suggestedFix: string;
};
```

Persist both:

- `runs/<run-id>/events.jsonl`: append-only history.
- `runs/<run-id>/state.json`: current materialized state.

This gives crash recovery and easy debugging.

## State Model And Report Model

Runtime state and trajectory artifacts have different read/write patterns. Keep them separate.

`RunState` and round summaries are optimized for orchestration:

- current round index
- current status
- compact metrics
- budget remaining
- stop reason

Trajectory/report artifacts are optimized for inspection:

- per-round screenshots
- asset manifests
- full verification results
- fix diffs or summaries
- metrics time series

This split keeps long-run memory bounded and makes report generation resilient to partial state corruption.

`runs/<run-id>/metrics.json` should contain the metrics series, not only `state.json`, so the report can render without loading every round blob.

## Run Directory Contract

Each run owns its directory.

```
runs/<run-id>/
|-- input.json
|-- state.json
|-- events.jsonl
|-- metrics.json
|-- workspace/
|   `-- generated app files
|-- assets/
|   |-- round-01/
|   `-- round-02/
|-- screenshots/
|   |-- round-01-desktop.png
|   `-- round-01-mobile.png
|-- traces/
|-- reports/
|   |-- trajectory.md
|   |-- trajectory.html
|   `-- demo-summary.md
`-- logs/
    `-- run.log
```

Generated code must not write outside its own `workspace/`.

## Main Execution Flow

```
create run
  |
  v
validate requirement card
  |
  v
round 1
  |
  +--> planner produces task spec + acceptance criteria
  |
  +--> asset agent produces/reuses visual assets
  |
  +--> frontend agent writes generated app
  |
  +--> browser runner starts generated app
  |
  +--> verify agent captures screenshots + runs interactions
  |
  +--> verifier emits structured issues
  |
  +--> if pass: finalize report
  |
  +--> if fail and budget remains: refactor or redraw
  |
  v
next round
```

Stop conditions:

- Verification passes.
- Max rounds reached.
- Time budget reached.
- Cost budget reached.
- Same blocker repeats for 2 consecutive rounds.
- Generated app fails to boot after retry.
- Required provider is unavailable.

## Agent Contracts

### Planner Agent

Input:

- Requirement card.
- Style sentence.
- Prior round summaries.
- Stop reason history.

Output:

- Functional requirements.
- Visual requirements.
- Interaction checklist.
- Asset needs.
- Acceptance criteria.
- Risk list.

Must preserve original requirement text every round to prevent goal drift.

### Frontend Agent

Input:

- Planner output.
- Asset manifest.
- Prior verifier issues if any.
- Current generated workspace.

Output:

- File patch summary.
- Generated file manifest.
- Run instructions.

Rules:

- Make minimal diffs after round 1.
- Keep generated app self-contained.
- Do not modify orchestrator source during a run.
- Never hide verification failures with fake UI states.

### Asset Agent

Input:

- Planner asset requirements.
- Style sentence.
- Prior asset issues.
- Existing asset manifest.

Output:

- Asset files.
- Asset manifest entries.
- Prompts or search queries.
- Provider usage and cost.

Rules:

- Reuse assets if the verifier says the problem is layout or interaction only.
- Redraw assets only when the issue owner is `asset`.
- Track provenance for generated and searched assets.

### Verify Agent

Input:

- Requirement card.
- Style sentence.
- Generated app URL.
- Asset manifest.
- Browser screenshots.
- Playwright interaction results.

Output:

- Structured verification result.
- Issue list.
- Scores: requirement match, style match, interaction pass rate, asset relevance.
- Recommendation: pass, refactor, redraw, or stop.

Verifier output must be schema-validated. Free-form prose is allowed only as an explanation field.

### Verify Agent contract

The verifier is the main feedback boundary between rounds. This contract should be explicit enough to implement and test before the full loop is built.

Input contract:

- Include original `RequirementCard` every round.
- Include style sentence, asset manifest, generated app URL, screenshots, and Playwright interaction results.
- If static or browser checks failed, multimodal review should still run, but its input should clearly mark failed prerequisites so later agents do not treat model output as ground truth.

Output contract:

- `verdict`: `pass | refactor | redraw | stop`.
- `scores`: normalized `requirementMatch`, `styleMatch`, `interactionPassRate`, `assetRelevance`.
- `issues`: schema-validated issue list with stable identifiers.
- `evidence`: rule-based results and model-based results kept separate.
- `nextStep`: explicit routing recommendation to refactor or asset redraw.

Round comparison contract:

- Issue identity must be comparable across rounds.
- Repeating blocker detection should use issue category plus suggested fix similarity, not only exact string equality.
- A repeated blocker should escalate stop behavior instead of triggering another refactor round.

### Refactor Agent

Input:

- Structured verifier issues.
- Current generated workspace.
- Planner acceptance criteria.

Output:

- Patch summary.
- Files changed.
- Risks introduced.

Rules:

- Fix blocker and major issues before minor polish.
- One round should not rewrite the whole app unless the verifier says the first generation missed the core requirement.
- If the same issue repeats, escalate the stop reason instead of looping forever.

## Verification Architecture

Verification has three layers.

```
Layer 1: Static checks
  - app installs/builds
  - no missing asset paths
  - generated file manifest exists

Layer 2: Browser checks
  - app boots
  - no console errors
  - screenshots render nonblank pixels
  - desktop/mobile layouts fit viewport
  - required interactions work

Layer 3: Multimodal review
  - screenshots compared to requirement and style
  - assets checked for relevance
  - hierarchy, spacing, color, typography, and layout judged
  - structured issues emitted
```

Use Playwright for layer 2. Its configuration should use a web server, project targets, retries on CI, trace-on-first-retry, and test artifact output.

Use model-based review only after browser checks have produced screenshots and interaction results. Do not ask a model to judge a page that did not boot.

## State Machine

```
created
  |
  v
running
  |
  +--> round_planning
  |       |
  |       v
  |   round_generating
  |       |
  |       v
  |   round_verifying
  |       |
  |       +--> passed
  |       |
  |       +--> round_fixing --> round_planning
  |       |
  |       +--> failed
  |
  +--> stopped
```

Every state transition writes an event first, then updates `state.json`.

## Error Handling

Error policy:

- Retriable provider errors: retry with backoff up to the step limit.
- Invalid structured output: retry once with validation errors included, then fail the step.
- Browser boot failure: capture logs, retry once, then fail the round.
- Verification disagreement: keep both rule result and model result in the issue evidence.
- Budget exceeded: stop cleanly and generate partial report.
- Crash: resume from `events.jsonl` and latest completed round.

Do not let a failed provider call erase prior round artifacts.

## Resume Semantics

Resume is a first-class long-run behavior, not a best-effort recovery step.

Rules:

- The source of truth for resume is `events.jsonl`, followed by the latest completed round artifacts.
- If the last event is incomplete or mid-round, resume should treat that round as unfinished and rebuild state from the last completed transition instead of replaying partial work.
- Missing screenshots or assets for a completed round do not invalidate resume; the run should remain inspectable and should generate a partial report when necessary.
- Resume should not re-run side-effecting provider calls from prior rounds unless explicitly requested; it should rebuild orchestration state from persisted artifacts.
- If replay reaches an unknown or newer schema version, resume should stop with a clear schema-mismatch error instead of silently dropping events.

## Budget And Cost Controls

Budget checks happen before expensive work.

Treat budget as a first-class domain object, not an ad hoc counter.

`BudgetState` should expose behavior for each expensive domain:

- model calls: estimate tokens, record actual usage, and stop before call if unavailable or exhausted
- image calls: estimate provider cost, apply rate-limit/retry policy, and stop cleanly when unavailable
- browser-heavy steps: track wall-clock and retries; treat repeated browser boot failure as a stop condition

Track:

- Total model calls.
- Total image calls.
- Estimated token/image cost.
- Wall-clock time.
- Round duration.
- Retry count.
- Generated asset count.

If provider pricing or usage metadata is unavailable, budget estimation should degrade to conservative caps rather than unlimited accounting.

Default stop limits for first implementation:

- Max rounds: 4.
- Max repeated blocker: 2.
- Max wall-clock for normal run: configurable.
- Long-run mode: at least 1 hour, with periodic checkpoint and heartbeat events.

## Metrics

Required metrics:

- Verification pass count.
- Blocker, major, minor issue count per round.
- Style match score.
- Requirement match score.
- Asset relevance score.
- Interaction pass rate.
- Round duration.
- Cumulative cost estimate.
- Retry count.
- Stop reason.

Metrics should be written to both `state.json` and `metrics.json` so the final report can render without replaying the full event log.

## Testing Plan

Initial framework:

- Vitest for pure logic.
- Playwright Test for generated app verification and end-to-end run smoke tests.

Coverage diagram:

```
CODE PATH COVERAGE
==================
[GAP] src/orchestrator/run-loop.ts
  |
  +-- createRun()
  |   +-- [UNIT] valid requirement creates run directory and state
  |   +-- [UNIT] invalid requirement fails before provider calls
  |
  +-- runRound()
  |   +-- [UNIT] pass result finalizes
  |   +-- [UNIT] fail result schedules refactor
  |   +-- [UNIT] repeated blocker stops run
  |   +-- [UNIT] cost budget exceeded stops run
  |
  +-- resumeRun()
      +-- [UNIT] rebuilds state from events.jsonl
      +-- [UNIT] handles partial last event safely

[GAP] src/agents/verify/
  |
  +-- verifyGeneratedApp()
  |   +-- [E2E] app boots and screenshot is nonblank
  |   +-- [E2E] console error becomes runtime issue
  |   +-- [E2E] required interaction failure becomes interaction issue
  |
  +-- parseVerifierOutput()
      +-- [UNIT] valid structured issue accepted
      +-- [UNIT] malformed model JSON rejected and retried

[GAP] src/agents/asset/
  |
  +-- resolveAssets()
      +-- [UNIT] reuses asset when issue owner is frontend
      +-- [UNIT] redraws asset when issue owner is asset
      +-- [UNIT] records prompt/query/provider/cost

[GAP] src/report/build-report.ts
  |
  +-- buildTrajectoryReport()
      +-- [UNIT] includes screenshots, assets, issues, fixes, metrics
      +-- [UNIT] renders partial report for stopped run
```

User flow coverage:

```
USER FLOW COVERAGE
==================
[GAP] [E2E] happy path: requirement -> 3+ rounds -> final report
[GAP] [E2E] generated app fails to boot -> clear stopped report
[GAP] [E2E] asset mismatch -> redraw in next round
[GAP] [E2E] layout overflow on mobile -> frontend refactor in next round
[GAP] [E2E] long-run mode writes heartbeat and resumes after interruption
[GAP] [EVAL] verifier judges screenshot against requirement and style
```

Quality target:

- Pure state transitions: 100% branch coverage.
- Schema parsers: 100% branch coverage.
- Browser verifier: happy path plus at least 3 failure cases.
- Long-run resume: interruption and partial-write cases.
- Model/prompt behavior: eval fixtures for at least 8 public-style requirement cards.

## Failure Modes

| Codepath | Realistic failure | Test required | Error handling |
| --- | --- | --- | --- |
| Run creation | Requirement over limit or empty style | Unit | Reject before side effects |
| Planner call | Model returns malformed JSON | Unit with fake provider | Retry once, then fail round |
| Asset generation | Rate limit or unsafe output refusal | Unit with fake provider | Retry/backoff or mark asset issue |
| Frontend generation | Generated app references missing asset | Unit/integration | Static manifest check before browser |
| Browser boot | Dev server never starts | E2E | Capture logs, retry once, stop cleanly |
| Screenshot capture | Blank canvas or white page | E2E | Nonblank pixel check and runtime issue |
| Interaction check | Button missing or click no-op | E2E | Interaction issue with selector/evidence |
| Multimodal review | False positive style critique | Eval | Keep rule evidence and allow pass threshold |
| Refactor | Fix regresses previous interaction | E2E | Re-run all required interaction checks each round |
| State write | Process dies mid-write | Unit | Append event first, atomic state write |
| Long run | Memory grows with screenshots | Integration | Persist artifacts, keep compact memory state |
| Budgeting | Infinite redraw loop burns image calls | Unit | Global cost/round/repeated-blocker stop |

Critical gaps if skipped:

- No resume test for partial writes.
- No nonblank screenshot check.
- No schema validation around verifier output.
- No repeated-blocker stop condition.

## Performance Plan

First version performance requirements:

- Keep only the current round plus compact summaries in memory.
- Store screenshots and traces on disk.
- Use bounded concurrency for asset work.
- Avoid running multimodal review if static/browser checks already failed.
- Use model tiering: high-reasoning for planning and final verification, cheaper model for small refactor classification when evals prove it works.
- Cache generated/search assets by prompt hash and requirement category.

Long-run mode should emit heartbeat events every few minutes:

```json
{"type":"heartbeat","runId":"...","round":2,"elapsedMs":123456,"costEstimate":1.23}
```

## Security And Safety

- Store API keys only in environment variables.
- Never write secrets into run artifacts.
- Generated apps run in a sandboxed directory.
- Do not execute arbitrary shell commands produced by a model.
- The frontend/refactor agent may edit only `runs/<run-id>/workspace/`.
- Provider adapters own all external API calls and logging redaction.
- External publishing is out of scope until explicitly approved.

## NOT In Scope

- SaaS auth, teams, billing, and hosted user accounts.
- Production deployment automation.
- Database-backed queueing.
- Multi-machine workers.
- Custom browser automation engine.
- Pixel-perfect video reproduction engine for every reference task.
- Fully autonomous public posting or publishing.
- Real-money cost optimization beyond budget accounting and stop limits.

## Worktree Parallelization Strategy

Initial implementation can split into lanes after project scaffolding.

| Step | Modules touched | Depends on |
| --- | --- | --- |
| Scaffolding | root config, `src/`, `tests/` | - |
| State and budget | `src/state/`, `src/orchestrator/` | Scaffolding |
| Provider adapters | `src/adapters/` | Scaffolding |
| Agent contracts | `src/agents/` | State and budget |
| Browser verifier | `src/adapters/`, `src/agents/verify/`, `e2e/` | Scaffolding |
| Report builder | `src/report/` | State and budget |
| Full run loop | `src/orchestrator/`, `src/cli/` | State, adapters, agents, verifier |

Parallel lanes:

- Lane A: state and budget -> full run loop.
- Lane B: provider adapters.
- Lane C: browser verifier.
- Lane D: report builder.

Execution order:

1. Do scaffolding first.
2. Launch Lane A foundation, Lane B, Lane C, and Lane D in parallel.
3. Merge lanes.
4. Implement full run loop and CLI sequentially.

Conflict flags:

- Lane A and full run loop both touch `src/orchestrator/`, so keep full loop after state primitives land.
- Browser verifier and provider adapters both touch `src/adapters/`; coordinate file ownership or keep browser in `browser-runner.ts` and model/image in separate files.

## Implementation Milestones

### Milestone 1: Runnable Skeleton

Done when:

- `npm test` runs unit tests.
- CLI accepts requirement + style.
- Run directory is created with `input.json`, `events.jsonl`, and `state.json`.

### Milestone 2: Static First Generation

Done when:

- Frontend Agent creates a Vite app in `runs/<id>/workspace/`.
- Browser runner opens it.
- Screenshot is captured.
- Report includes generated file list and screenshot.

### Milestone 3: Structured Verification

Done when:

- Verify Agent emits schema-validated issues.
- Browser failures become structured issues.
- Multimodal screenshot review produces scores and recommendations.

### Milestone 4: Closed Loop

Done when:

- At least 3 automatic rounds run without manual edits.
- Issues route to frontend refactor or asset redraw.
- Each round records screenshots, issues, fixes, metrics, and cost.

### Milestone 5: Long Run

Done when:

- At least 1-hour run works unattended.
- Heartbeats and checkpoints are present.
- Resume works after interruption.
- Metrics curve and trajectory report are generated.

### Milestone 6: Demo Package

Done when:

- Final webpage is runnable with one command.
- Trajectory report is readable.
- Demo video script can be produced from run artifacts.
- Repository has setup and run instructions.

## References

- OpenAI function calling and Structured Outputs: https://help.openai.com/en/articles/8555517-function-calling-in-the-openai-api-Function
- OpenAI API authentication: https://developers.openai.com/api/reference/overview
- OpenAI image generation API announcement: https://openai.com/index/image-generation-api/
- Playwright Test configuration: https://playwright.dev/docs/test-configuration
- Playwright best practices: https://playwright.dev/docs/best-practices
