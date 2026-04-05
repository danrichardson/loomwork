# Visualization Audit Report - 2026-04-04

## Scope

- Audited all 100 visualization source files in worker/src/viz (001-100).
- Evaluated against the stated goals: working, animated, interactive, keyboard+mouse usability, rapid paging, full viewport desktop, mobile quality, and brand/theme continuity.
- This is a static and runtime code audit. It does not score artistic quality subjectively beyond obvious structural signals.

## Method

- Syntax check: node --check across all viz files.
- Runtime check: import each viz module and call render().
- Feature extraction: route coverage, animation markers, interaction markers, viewport markers, responsiveness markers.
- Cross-check for route accessibility through worker/src/index.js.

## Headline Verdict

The current site partially meets the intent, but does not meet the full original 100-viz brief.

## Scorecard

- Total viz files: 100
- Syntax-valid modules: 100/100
- Runtime render success: 100/100 (all render() calls returned HTML)
- Routed and reachable at /viz/xxx: 32/100
- Has animation markers: 88/100
- Has in-viz interaction markers (mouse, touch, or keyboard): 72/100
- Has full viewport markers: 91/100
- Has explicit dark-mode support markers: 0/100
- Has explicit media queries: 4/100

### Goal-fit grades

- Baseline pass (routed + animated + interactive + full viewport): 23/100
- Strict pass (routed + animated + keyboard + mouse + full viewport in-viz): 14/100

## Critical Gaps Against Intent

1. Only 32/100 visualizations are live-routed. 68 are not reachable by URL in the Worker.
2. Rapid paging is only wired for the same 32 IDs. The 100-file narrative cannot be paged end-to-end.
3. Explicit dark-mode adaptation is absent in viz files (0/100), so "light-first but respect dark-mode" is not implemented.
4. In-viz keyboard controls are sparse. Many pages rely on global nav keys only, not visualization-specific keyboard interaction.
5. Mobile tuning is weakly explicit (4/100 with media queries), even though many pages use fluid units.

## Routing Reality

- Routed IDs now: 052, 053, 055, 057, 058, 060, 061, 062, 064, 065, 066, 067, 068, 069, 070, 071, 072, 073, 074, 076, 077, 080, 087, 090, 092, 093, 094, 095, 096, 097, 098, 100
- Not routed IDs now: 001, 002, 003, 004, 005, 006, 007, 008, 009, 010, 011, 012, 013, 014, 015, 016, 017, 018, 019, 020, 021, 022, 023, 024, 025, 026, 027, 028, 029, 030, 031, 032, 033, 034, 035, 036, 037, 038, 039, 040, 041, 042, 043, 044, 045, 046, 047, 048, 049, 050, 051, 054, 056, 059, 063, 075, 078, 079, 081, 082, 083, 084, 085, 086, 088, 089, 091, 099

## Landing Page and Brand Continuity Assessment

- Landing page is dark-first, not light-first.
- No mechanism detected to inherit or respect reader theme preferences from throughlinetech.net.
- Home/About messaging is currently inconsistent (32 vs 100 references; 6,963 vs 6,805 references in different places).
- Throughline uses a theme system with persisted mode/theme preferences; this site currently uses fixed per-page styling.

## Per-Visualization Findings and Priority Improvements

| ID | Title | Live Route | Animated | Input Mode (in viz) | Full Viewport Marker | Mobile Query | Priority Improvements |
|---|---|---:|---:|---|---:|---:|---|
| 001 | 001 – The Factorial Heat Matrix — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 002 | 002 – The R-Squared Race — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 003 | 003 – The Cost-Quality Scatter — Claude Lost Its Mind | N | N | mouse+touch | Y | N | Enable route and include in nav sequence; Add visible animation or time-based state change; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 004 | 004 – The Radar Spider — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 005 | 005 – The Variance Waterfall — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 006 | 006 – The Box Plot Ballet — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 007 | 007 – The Sankey Flow — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 008 | 008 – The 3D Response Surface — Claude Lost Its Mind | N | N | mouse+touch | Y | N | Enable route and include in nav sequence; Add visible animation or time-based state change; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 009 | 009 – Parallel Coordinates — Claude Lost Its Mind | N | Y | touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add per-viz mouse interaction; Add mobile-specific layout tuning |
| 010 | 010 – The Mosaic Matrix — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 011 | 011 – The Coherence ECG — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 012 | 012 – The Phase Thermometer — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 013 | 013 – The Entropy Clock — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 014 | 014 – The Progress Bar of Doom — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 015 | 015 – The Sine Wave — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 016 | 016 – The Lorenz Butterfly — Claude Lost Its Mind | N | Y | mouse | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 017 | 017 – The Flatline — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 018 | 018 – The Terminal Replay — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 019 | 019 – The Frequency Waterfall — Claude Lost Its Mind | N | N | none | Y | N | Enable route and include in nav sequence; Add visible animation or time-based state change; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 020 | 020 – The Matrix Rain — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 021 | 021 – The Health Bar Drain — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 022 | 022 – NES Loading Screen — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 023 | 023 – Pac-Man Spiral Chase — Claude Lost Its Mind | N | Y | keyboard | Y | N | Enable route and include in nav sequence; Add per-viz mouse interaction; Add mobile-specific layout tuning |
| 024 | 024 – Space Invaders DOE — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 025 | 025 – The Dungeon Map — Claude Lost Its Mind | N | Y | mouse | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 026 | 026 – Game Over Screen — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 027 | 027 – Tetris Collapse — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 028 | 028 – The Gameboy Screen — Claude Lost Its Mind | N | Y | touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add per-viz mouse interaction; Add mobile-specific layout tuning |
| 029 | 029 – The Progress Quest — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 030 | 030 – Pixel Portrait — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 031 | 031 – The VHS Glitch — Claude Lost Its Mind | N | Y | touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add per-viz mouse interaction; Add mobile-specific layout tuning |
| 032 | 032 – Chromatic Aberration — Claude Lost Its Mind | N | Y | touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add per-viz mouse interaction; Add mobile-specific layout tuning |
| 033 | 033 – Pixel Sort — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 034 | 034 – The Databend — Claude Lost Its Mind | N | N | mouse+touch | Y | N | Enable route and include in nav sequence; Add visible animation or time-based state change; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 035 | 035 – CRT Phosphor Burn — Claude Lost Its Mind | N | Y | touch | N | N | Enable route and include in nav sequence; Refactor layout to true full viewport (desktop + mobile); Add per-viz keyboard controls beyond global nav; Add per-viz mouse interaction; Add mobile-specific layout tuning |
| 036 | 036 – Signal Interference — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 037 | 037 – The BSOD — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 038 | 038 – Corrupted JSON — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 039 | 039 – Glitch Mosaic — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 040 | 040 – The Broken Carousel — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 041 | 041 – Word Gravity — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 042 | 042 – The Done Bubble Machine — Claude Lost Its Mind | N | Y | mouse | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 043 | 043 – The Ignition Point — Claude Lost Its Mind | N | Y | mouse | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 044 | 044 – The Constellation — Claude Lost Its Mind | N | Y | mouse | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 045 | 045 – The Wrecking Ball — Claude Lost Its Mind | N | Y | mouse | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 046 | 046 – Phantom Traffic Jam — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 047 | 047 – Confetti Shower — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 048 | 048 – The Sandfall — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 049 | 049 – Spring Mesh Network — Claude Lost Its Mind | N | Y | mouse | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 050 | 050 – Fireworks Show — Claude Lost Its Mind | N | Y | touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add per-viz mouse interaction; Add mobile-specific layout tuning |
| 051 | 051 – The DNA Helix — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 052 | 052 – Bacterial Growth Curve — Claude Lost Its Mind | Y | Y | mouse+touch | Y | N | Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 053 | 053 – Cellular Automata — Claude Lost Its Mind | Y | Y | keyboard+mouse | Y | N | Add mobile-specific layout tuning |
| 054 | 054 – Neural Pathways — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 055 | 055 – The Fractal Tree — Claude Lost Its Mind | Y | Y | mouse | Y | N | Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 056 | 056 – The Thunderstorm — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 057 | 057 – Predator-Prey Dynamics — Claude Lost Its Mind | Y | N | mouse | Y | N | Add visible animation or time-based state change; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 058 | 058 – The Entropy Collapse — Claude Lost Its Mind | Y | N | mouse | Y | N | Add visible animation or time-based state change; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 059 | 059 – The Microscope View — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 060 | 060 – The Self-Reinforcing Loop — Claude Lost Its Mind | Y | N | mouse | Y | N | Add visible animation or time-based state change; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 061 | 061 – The Worst Chart Ever — Claude Lost Its Mind | Y | N | keyboard+mouse | N | N | Refactor layout to true full viewport (desktop + mobile); Add visible animation or time-based state change; Add mobile-specific layout tuning |
| 062 | 062 – The Tracked Changes Doc — Claude Lost Its Mind | Y | Y | keyboard+mouse | Y | N | Add mobile-specific layout tuning |
| 063 | 063 – The Gantt Chart — Claude Lost Its Mind | N | Y | touch | N | N | Enable route and include in nav sequence; Refactor layout to true full viewport (desktop + mobile); Add per-viz keyboard controls beyond global nav; Add per-viz mouse interaction; Add mobile-specific layout tuning |
| 064 | 064 – KPI Dashboard — Claude Lost Its Mind | Y | Y | keyboard+mouse | Y | Y | Maintain and polish |
| 065 | 065 – The Pivot Table — Claude Lost Its Mind | Y | Y | mouse+touch | Y | N | Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 066 | 066 – The Org Chart — Claude Lost Its Mind | Y | Y | keyboard+mouse | N | N | Refactor layout to true full viewport (desktop + mobile); Add mobile-specific layout tuning |
| 067 | 067 – The Email Thread — Claude Lost Its Mind | Y | Y | keyboard+mouse | Y | N | Add mobile-specific layout tuning |
| 068 | 068 – The Performance Review — Claude Lost Its Mind | Y | Y | mouse+touch | N | N | Refactor layout to true full viewport (desktop + mobile); Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 069 | 069 – The Infographic — Claude Lost Its Mind | Y | Y | keyboard+mouse | N | N | Refactor layout to true full viewport (desktop + mobile); Add mobile-specific layout tuning |
| 070 | 070 – Death by PowerPoint — Claude Lost Its Mind | Y | Y | keyboard+mouse | Y | N | Add mobile-specific layout tuning |
| 071 | 071 – The Clinical Assessment — Claude Lost Its Mind | Y | Y | keyboard+mouse | N | N | Refactor layout to true full viewport (desktop + mobile); Add mobile-specific layout tuning |
| 072 | 072 – The Obsessive Loop Chart — Claude Lost Its Mind | Y | Y | keyboard+mouse | Y | N | Add mobile-specific layout tuning |
| 073 | 073 – The Rorschach — Claude Lost Its Mind | Y | N | keyboard+mouse | Y | N | Add visible animation or time-based state change; Add mobile-specific layout tuning |
| 074 | 074 – The Repetition Compulsion — Claude Lost Its Mind | Y | Y | keyboard+mouse | Y | N | Add mobile-specific layout tuning |
| 075 | 075 – The CBT Map — Claude Lost Its Mind | N | N | none | N | N | Enable route and include in nav sequence; Refactor layout to true full viewport (desktop + mobile); Add visible animation or time-based state change; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 076 | 076 – The Academic Abstract — Claude Lost Its Mind | Y | Y | keyboard+mouse | Y | N | Add mobile-specific layout tuning |
| 077 | 077 – The Research Poster — Claude Lost Its Mind | Y | Y | mouse+touch | Y | Y | Add per-viz keyboard controls beyond global nav |
| 078 | 078 – The Systematic Review — Claude Lost Its Mind | N | N | none | N | N | Enable route and include in nav sequence; Refactor layout to true full viewport (desktop + mobile); Add visible animation or time-based state change; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 079 | 079 – The Citation Graph — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 080 | 080 – The Peer Review — Claude Lost Its Mind | Y | Y | keyboard+mouse | Y | N | Add mobile-specific layout tuning |
| 081 | 081 – The Piano Roll — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 082 | 082 – The Waveform — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 083 | 083 – The Equalizer — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 084 | 084 – The Vinyl Record — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 085 | 085 – Sheet Music — Claude Lost Its Mind | N | N | none | Y | N | Enable route and include in nav sequence; Add visible animation or time-based state change; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 086 | 086 – The DJ Crossfader — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 087 | 087 – Concert Poster — Claude Lost Its Mind | Y | Y | keyboard+mouse | Y | N | Add mobile-specific layout tuning |
| 088 | 088 – The Radio Tuner — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 089 | 089 – The Metronome — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 090 | 090 – The Album Art — Claude Lost Its Mind | Y | Y | keyboard+mouse | Y | N | Add mobile-specific layout tuning |
| 091 | 091 – The Galaxy Map — Claude Lost Its Mind | N | Y | mouse+touch | Y | N | Enable route and include in nav sequence; Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 092 | 092 – The Screenplay — Claude Lost Its Mind | Y | Y | keyboard+mouse | Y | Y | Maintain and polish |
| 093 | 093 – Choose Your Adventure — Claude Lost Its Mind | Y | Y | mouse+touch | Y | N | Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 094 | 094 – The Newspaper — Claude Lost Its Mind | Y | Y | keyboard+mouse | Y | Y | Maintain and polish |
| 095 | 095 – The Tarot Reading — Claude Lost Its Mind | Y | Y | mouse+touch | Y | N | Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 096 | 096 – The QR Code — Claude Lost Its Mind | Y | Y | mouse | Y | N | Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 097 | 097 – The CAPTCHA — Claude Lost Its Mind | Y | Y | mouse+touch | Y | N | Add per-viz keyboard controls beyond global nav; Add mobile-specific layout tuning |
| 098 | 098 – The Blank Page — Claude Lost Its Mind | Y | Y | keyboard+mouse | Y | N | Add mobile-specific layout tuning |
| 099 | 099 – The Loading Spinner — Claude Lost Its Mind | N | Y | none | Y | N | Enable route and include in nav sequence; Add direct user interaction (mouse or touch); Add mobile-specific layout tuning |
| 100 | 100 – The Mirror — Claude Lost Its Mind | Y | Y | touch | Y | N | Add per-viz keyboard controls beyond global nav; Add per-viz mouse interaction; Add mobile-specific layout tuning |

## Improvement Plan (No Code Changes Applied Here)

1. Product decision lock:
- Decide and enforce one truth: either 32 curated vizzes or full 100.
- Update copy, metrics, nav, and about/home content together.

2. Routing and sequence contract:
- Generate routes and nav metadata from one source of truth so all intended IDs are reachable and pageable.

3. Interaction contract per viz:
- Require each visualization to support: mouse (or touch) + keyboard controls + global nav fallback.
- Add lightweight QA checklist per file.

4. Viewport and mobile contract:
- Standardize full viewport shell with safe-area handling, then let each viz theme within that shell.
- Add mobile breakpoints for control density and legibility.

5. Theme continuity with throughlinetech:
- Make landing page light-first.
- Honor dark mode by prefers-color-scheme and/or shared localStorage key handshake.
- Use a Throughline-adjacent typography and spacing rhythm, then layer in absurdity through content and interaction patterns.

## Notes

- Metrics source files generated for traceability:
  - docs/viz-audit-metrics.json
  - docs/viz-audit-metrics.csv
