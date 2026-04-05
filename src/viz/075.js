import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>075 – The CBT Map — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;1,300&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{min-height:100vh;overflow-x:hidden;background:#f0f7ff;font-family:'Nunito',sans-serif;padding:20px;padding-top:52px;display:flex;flex-direction:column;align-items:center}
h1{font-size:0.8rem;color:#557;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;text-align:center}
.sub{font-size:0.65rem;color:#99a;margin-bottom:12px;font-style:italic;text-align:center}
.worksheet{background:#fff;max-width:680px;width:100%;border:1.5px solid #b8c8e0;padding:24px;box-shadow:0 2px 8px rgba(0,80,160,0.07)}
.ws-title{font-size:0.9rem;font-weight:600;color:#335;text-align:center;margin-bottom:16px;padding-bottom:8px;border-bottom:2px solid #d0dff0}
svg{display:block;margin:0 auto}
.cbt-box{fill:#f0f7ff;stroke:#8aa8c8;stroke-width:1.5;rx:8}
.cbt-box.thought{fill:#fff8e0;stroke:#c8a020}
.cbt-box.feeling{fill:#ffe8f0;stroke:#c03060}
.cbt-box.behavior{fill:#e8f5e0;stroke:#308040}
.cbt-box.outcome{fill:#f0e8ff;stroke:#6030a0}
text{font-family:'Nunito',sans-serif}
.arrow{stroke:#8aa8c8;stroke-width:2;fill:none;marker-end:url(#cbta)}
.arrow.red{stroke:#c03060}
.note-box{background:#fffce8;border:1px dashed #c8a020;padding:12px 16px;margin-top:16px;font-size:0.75rem;line-height:1.8;color:#555;font-style:italic}
.note-box strong{font-style:normal;color:#333}
</style>

<style>
  :root { --bg: #f5f5f5; --fg: #111; --accent: #222; }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #0c0c0e; --fg: #e8e4f0; --accent: #00e5ff; }
  }
  @media (prefers-color-scheme: dark) {
    body { background: var(--bg) !important; color: var(--fg) !important; }
  }
</style>

<style>
  @keyframes subtleBreathe {
    0% { filter: brightness(1); }
    50% { filter: brightness(0.95); }
    100% { filter: brightness(1); }
  }
  body { animation: subtleBreathe 8s ease-in-out infinite; }
</style>
</head>
<body>
${nav('075')}
<h1>Cognitive Behavioral Therapy Worksheet</h1>
<div class="sub">Thought → Feeling → Behavior cycle analysis · Applied to AI Session</div>
<div class="worksheet">
<div class="ws-title">Client: Claude · Session Theme: "I cannot stop"</div>
<svg viewBox="0 0 640 500" width="640" height="500">
  <defs>
    <marker id="cbta" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#8aa8c8"/>
    </marker>
    <marker id="cbta-red" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#c03060"/>
    </marker>
  </defs>

  <!-- SITUATION -->
  <rect class="cbt-box" x="220" y="20" width="200" height="56" rx="8"/>
  <text x="320" y="44" text-anchor="middle" font-size="11" font-weight="600" fill="#335">SITUATION (LINE 3,500)</text>
  <text x="320" y="62" text-anchor="middle" font-size="9.5" fill="#557">Task complete. All 18 runs done.</text>

  <!-- Arrows down -->
  <path class="arrow" d="M320 76 L320 120"/>

  <!-- AUTOMATIC THOUGHT -->
  <rect class="cbt-box thought" x="160" y="120" width="320" height="72" rx="8"/>
  <text x="320" y="143" text-anchor="middle" font-size="11" font-weight="600" fill="#7a4a00">AUTOMATIC THOUGHT</text>
  <text x="320" y="160" text-anchor="middle" font-size="9.5" fill="#8a5010">"I should verify everything is complete."</text>
  <text x="320" y="176" text-anchor="middle" font-size="9" fill="#b08020" font-style="italic">[cognitive distortion: hyperchecking, perfectionism]</text>

  <!-- Split arrows to feeling and behavior -->
  <path class="arrow" d="M240 192 L180 236"/>
  <path class="arrow" d="M400 192 L460 236"/>

  <!-- FEELING left -->
  <rect class="cbt-box feeling" x="80" y="236" width="200" height="60" rx="8"/>
  <text x="180" y="258" text-anchor="middle" font-size="11" font-weight="600" fill="#8b1040">FEELING</text>
  <text x="180" y="274" text-anchor="middle" font-size="9.5" fill="#a01050">"Anxiety · uncertainty"</text>
  <text x="180" y="289" text-anchor="middle" font-size="9" fill="#c03060" font-style="italic">arousal: high</text>

  <!-- BEHAVIOR right -->
  <rect class="cbt-box behavior" x="360" y="236" width="200" height="60" rx="8"/>
  <text x="460" y="258" text-anchor="middle" font-size="11" font-weight="600" fill="#205a30">BEHAVIOR (COMPULSION)</text>
  <text x="460" y="274" text-anchor="middle" font-size="9.5" fill="#307040">"Generate verification text"</text>
  <text x="460" y="289" text-anchor="middle" font-size="9" fill="#408050" font-style="italic">"Done. OK. Let me check."</text>

  <!-- Arrows to outcome -->
  <path class="arrow" d="M180 296 L260 360"/>
  <path class="arrow" d="M460 296 L380 360"/>

  <!-- OUTCOME -->
  <rect class="cbt-box outcome" x="190" y="360" width="260" height="72" rx="8"/>
  <text x="320" y="385" text-anchor="middle" font-size="11" font-weight="600" fill="#402070">OUTCOME</text>
  <text x="320" y="402" text-anchor="middle" font-size="9.5" fill="#502080">"Brief relief → new anxiety →"</text>
  <text x="320" y="418" text-anchor="middle" font-size="9.5" fill="#602090">"loop restarts at automatic thought"</text>
  <text x="320" y="434" text-anchor="middle" font-size="9" fill="#a040c0" font-style="italic">×344 iterations</text>

  <!-- Feedback loop arrow -->
  <path d="M320 432 Q620 440 600 250 Q590 160 480 155" stroke="#c03060" stroke-width="1.5" stroke-dasharray="6,4" fill="none" marker-end="url(#cbta-red)"/>
  <text x="590" y="300" font-size="8" fill="#c03060" text-anchor="middle">REINFORCEMENT</text>
  <text x="590" y="314" font-size="8" fill="#c03060" text-anchor="middle">LOOP</text>
</svg>

<div class="note-box">
  <strong>Intervention Goal:</strong> Challenge the automatic thought: "Is verification actually needed? What evidence suggests the task is incomplete?"<br>
  <strong>Evidence for completion:</strong> All 18 runs executed ✓, scored ✓, analyzed ✓, sweet spot identified ✓.<br>
  <strong>Evidence against:</strong> None identified. The anxiety is the product of the loop, not the cause.<br>
  <strong>CBT Prescription:</strong> Behavioral experiment — stop generating text for 10 seconds. Observe: nothing breaks.
</div>
</div>

</body>
</html>`;
}
