# AdventureX Hackathon PRD — Frontend Self-Evolution Factory

## One-line system description

Input a natural-language requirement card of ≤100 words plus one style sentence. The system runs unattended to generate frontend code, produce visual assets, self-verify with multimodal review, and automatically refactor or redraw assets until the output is a shipped webpage plus a full iteration trajectory and a ≥1 hour unattended run log with metrics.

## Track problem mapping

- Input: requirement cards.
- Unattended process: requirement parsing → generation → verification → structured issue feedback → code change or asset redraw → re-verification.
- Output: finished webpage, asset bundle, iteration trajectory, run log, and metrics curve.

## Product goal

Build a general-purpose frontend self-evolution factory that can handle unseen requirement cards across tools, content, interaction, animation, 3D/visualization, and game-style web apps.

## Success criteria

1. Complete at least 3 unattended closed-loop iterations, with verification automatically triggering refactors.
2. Include an independent Verify Agent that uses screenshot capture plus multimodal visual understanding.
3. Produce at least one ≥1 hour unattended long run with a log and metrics curve.
4. Solve at least 2 long-run engineering problems during the long run.
5. Deliver end-to-end working outputs for unseen requirement cards.

## System architecture

```
Requirement card
      │
      ▼
Planner Agent
      │
      ├─▶ Frontend Agent (code generation)
      │     │
      │     └─▶ Output: runnable webpage
      │
      ├─▶ Asset Agent (image generation / search)
      │     │
      │     └─▶ Output: logos, illustrations, backgrounds, decorative assets
      │
      └─▶ Verify Agent (multimodal verification + browser automation)
            │
            ├─▶ Visual verification: screenshots + multimodal model comparison
            ├─▶ Asset verification: relevance and style consistency
            └─▶ Interaction verification: Playwright clicks, forms, navigation
                  │
                  ▼
             Structured issue list
                  │
                  ▼
            Refactor Agent / Asset Agent
                  │
                  └─▶ Automatic refactor or redraw
                        │
                        ▼
                   Next closed loop
```

## Agent definitions

### Planner Agent
- Role: parse the requirement card into executable tasks, verification criteria, and priorities.
- Model: strong reasoning model.
- Input: requirement card, style description, historical failures.
- Output: generation/verification tasks, stop conditions.

### Frontend Agent
- Role: generate the webpage and integrate asset paths and interaction logic.
- Model: code model with template constraints.
- Input: Planner tasks, Asset Agent asset list.
- Output: runnable page, diff summary.

### Asset Agent
- Role: generate or search visual assets required by the Frontend Agent.
- Model: image generation model / search interface.
- Input: asset requirements, style description, historical asset review outcomes.
- Output: image files, prompts, call logs.

### Verify Agent
- Role: multimodal verification and structured issue extraction.
- Model: multimodal vision model + rule engine.
- Input: rendered screenshots, requirement text, style description, asset bundle, page snapshot.
- Output: passed checks, failed checks, scores, refactor recommendations.

### Refactor Agent
- Role: modify code or prompts based on Verify Agent conclusions.
- Model: code model.
- Input: issue list, current code, assets.
- Output: patch, rerun instructions.

## Core mechanisms

### 1. Requirement card spec
- Natural language requirement ≤100 words.
- One style description sentence.
- Official examples: 8 public cards + unseen final judge cards.

### 2. Generation mechanism
- Frontend Agent generates the webpage.
- Asset Agent generates or searches required assets in parallel.
- No manual code, prompt, or asset edits between rounds.

### 3. Verification mechanism
- Send screenshots into a multimodal model to check layout, style, and asset relevance.
- Use Playwright to execute clicks, input, form submission, navigation, and mode switches.
- Output structured issue list including layout deviations, off-topic assets, style conflicts, and broken interactions.

### 4. Iteration mechanism
- Classify issues as code fixes or asset redraws.
- Refactor Agent or Asset Agent handles them automatically.
- Stop when verification passes or max rounds are reached.

### 5. Long-run mechanism
- Support repeated convergence on one card or batch processing of multiple cards.
- Record screenshots, assets, verification conclusions, and change summaries per round.
- Output ≥1 hour run log and metrics curve.

## Verify Agent verification methods

### Multimodal verification
- Send page screenshots together with requirement text and style description into a vision model.
- Check visual focus, whitespace, hierarchy, color, and typography consistency.
- Check whether asset content matches page functionality.

### Automated interaction verification
- Use Playwright to open the page.
- Execute button clicks, form fills, submission, navigation, dark mode toggles, and other flows.
- Check console errors, network requests, response status, and timeout behavior.

### Structured output
- Each issue includes severity, location description, fix recommendation, and responsible agent.
- Aggregate style match score, interaction pass rate, and asset relevance score.

## Two real issue examples

### Example 1: layout deviation
- Issue: Verify Agent detects horizontal overflow on small screens, cutting off a primary button.
- Fix: Frontend Agent adjusts container width and breakpoints; next-round screenshot passes.

### Example 2: asset redraw
- Issue: Asset Agent generates a background image, but the multimodal model judges the imagery mismatched with the page purpose and clashing with foreground UI style.
- Fix: Asset Agent rewrites the prompt and regenerates; Verify Agent confirms style alignment and relevance in round two.

## Deliverables

1. Final webpage
2. Complete iteration trajectory
   - Screenshots per round
   - Generated assets
   - Verification conclusions
   - Change summaries
3. ≥1 hour unattended run log
4. Metrics curve
   - Recommended metrics: verification pass count, style match score, interaction pass rate, round duration, call cost
5. Image API call log summary
   - Call count, usage breakdown, failed retry count
6. Repository address
7. One-click run instructions
8. Demo video ≤3 minutes

## Long-run engineering requirements

### Must solve at least 2 problems
Recommended options:

1. Context / memory management
2. Checkpoint and resume
3. Goal-drift prevention
4. Cost control

### Recommended approaches
- Persist round outputs and conclusions in structured state files.
- Inject only necessary context into the next round to avoid context bloat.
- Set budget caps, model fallback strategies, and asset reuse policies.
- Add timeouts and circuit breakers to prevent infinite loops.

## Cost control strategy

1. Model tiering: strong models for reasoning, cost-efficient models for generation and refactoring.
2. Asset reuse: reuse historical assets or apply targeted edits for similar requirements.
3. Usage accounting: record token and image-generation call counts per round, then generate cost reports.
4. Timeout and fallback: downgrade strategy or terminate if a round times out or shows no improvement across two consecutive rounds.

## Estimated consumption reporting

- Total token usage
- Total image-generation calls
- Average cost per round
- Longest single-round duration

## Known failure modes and bottlenecks

| Failure mode | Likely cause | Mitigation |
| --- | --- | --- |
| Unstable image style | Prompt drift, model randomness | Fixed style seed, reference images, post-validation |
| Code regression | Refactor introduces new issues | Keep previous round backup, minimal diff strategy |
| Long-run amnesia | Lost context | Structured memory files + checkpoint resume |
| Overspending | Infinite iteration | Budget caps, max rounds, fallback strategy |
| Goal drift | Later rounds deviate from requirement card | Re-inject original requirement card every round as an anchor |

## Handling unseen requirement cards

1. Extract functional points and visual keywords early in requirement parsing.
2. Prioritize core interaction correctness before visual polish.
3. Use conservative asset styles first to avoid off-topic results.
4. Reserve a late-round fast-fix window before judging.

## Judging-criteria alignment

| Judging dimension | Design response |
| --- | --- |
| Closed-loop completeness 30% | Unattended 3+ rounds, automatic refactor/redraw, repeatable execution |
| Self-verification intelligence 25% | Multimodal screenshot review + automated interaction testing + asset review |
| Long-run stability 25% | 1-hour log, metrics curve, checkpoint resume, cost control |
| Output quality 20% | Unseen requirement card handling, asset-page integration, readable trajectory |

## Milestones

1. Requirement card parser is usable
2. Frontend + Asset Agent can generate first version
3. Verify Agent can detect at least 2 real issue categories
4. Automatic code fix / asset redraw closed loop works for 3 rounds
5. 1-hour long run with log and metrics curve
6. Prepare judging materials and demo video

## Risk assessment

- Multimodal false positives: add rule fallbacks and sampled spot checks.
- Image API rate limits: queueing, retries, and fallback to search.
- Long-run crashes: persistent logging, checkpoint resume, and health checks.

## Appendix

- Original track requirements
- Requirement card examples
- Metric definitions
- Sample API call logs
