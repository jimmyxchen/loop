# AdventureX Exampler Topics

## Primary Target Track

- Track: `它写、它画、它验：无人值守的前端自进化工厂`
- Source: user-provided prompt
- Judging input: official 8 example requirement cards + unseen final judge cards

## Open-Book Challenges from StepFun × AdventureX 2026

Source: `https://stepfunadvx.cloud-yyweb.workers.dev/`

### 01 — 3D / WebGL 敦煌壁画
- Recreate a first-person explorable Mogao cave with sunlight as the only light source.
- Lighting driven by real local system time and real sun angles for Dunhuang.
- Continuous narrative murals around the walls; only 1–2 scenes visible at a time.
- No flashlight, global illumination, or “see all” switch.
- Ambient low-frequency sound; matching short phrases when light hits a scene.
- Instruments limited to approximate timbres of pipa, bi’li, sheng, konghou, jiegu.
- No piano or modern synthesizer timbres.
- Show local time, Chinese traditional时辰, and percentage of murals not visible.
- Time-acceleration slider allowed for demo; default must use real time.
- Murals should use aged lead-gray and土red, not high-saturation new-paint style.
- Not a museum guide page with click hotspots.

### 02 — 音画交互音乐可视化
- Explicit, deterministic, reversible function between brush strokes and sound.
- Drawing → sound mapping must be explicit and visible in UI.
  - Stroke curvature → pitch
  - Stroke thickness → volume
  - Drawing speed → note duration
  - Color → timbre using Kandinsky’s specific mappings in *Concerning the Spiritual in Art*
    - Yellow = sharp approach of trumpet
    - Blue = deep retreat of cello and organ
    - Red = trumpet or horn depending on brightness
    - Green = static balance in violin middle register
    - Orange = middle bell or mezzo-soprano
    - Violet = melancholy of cor anglais and low woodwinds
    - White = possible rest
    - Black = terminal rest
- Multiple strokes must play as multi-track polyphony simultaneously.
- Sound → drawing: upload/record audio and deterministically decode into a painting.
- Same audio must yield stable output across runs.
- Round-trip test: draw → audio → redraw, showing original and second painting side by side with structural similarity.
- Not a spectrum bar chart or common audio visualizer.

### 03 — 游戏 3D 版坦克大战
- Pure web first-person 3D tank battle from commander hatch view.
- No third-person over-shoulder camera.
- 3 tank types with structural differences:
  - Heavy: deploy ground anchor into fixed turret mode; damage and range double; immobile while deployed; 2s hard deploy/undeploy.
  - Assault: short instant displacement; 3s fire disable after warp.
  - Support: deploy recon drone and switch to drone view; body unprotected while drone active.
- Every ability must expose a real cost/weakness, not just cooldown.
- Physical ballistics:
  - Shell flight time and gravity drop.
  - Aiming lead required at long range.
  - Armor zones: front, side, rear, top with different bounce angle thresholds.
  - Ricochet on shallow angles with spark and sound feedback.
- Environment: abandoned high-tech industrial city.
- Destructible cover, electromagnetic interference zones, and at least one elevation difference enabling weak-top-armor strategy.
- At least 3 AI tanks with cover use, flanking, and low-hp retreat behavior.
- No spinning in place or straight-line rush behaviors.

### 04 — 动效复刻讲解视频
- Single HTML file that auto-plays with play/pause and progress bar.
- Total duration within ±3% of original video.
- Before coding, output an拆解表 with one row per independent motion effect:
  - timecode
  - visual element
  - motion type
  - easing curve
  - narration point
- Priority order:
  1. information structure and appearance order
  2. timing and rhythm
  3. layout and relative geometry
  4. color and font using closest open-source substitutes
  5. pixel-perfect visual fidelity lowest priority
- No embedding original video clips.
- No using screenshots as backgrounds then animating on top.
- Narration may use timed captions or Web Speech API; human voice not required.
- After completion, list 3 most inaccurate reproductions and explain whether each is a technical limitation or judgment call.
- Reference resource provided: `讲解视频复刻 video.mp4`

### 05 — AI 数字人实时对话
- Real-time conversational digital human.
- Continuous self-evolution using LLM and image generation capabilities.

## Notes

- These topics were saved for reference during system design and judging preparation.
- The judging system may ask questions mapped from any of these topics or the primary track.
