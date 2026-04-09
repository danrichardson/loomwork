import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>072 – The Obsessive Loop Chart — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f8f7f2;font-family:'Patrick Hand',cursive;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px;padding-top:52px}
h1{font-size:1rem;color:#444;margin-bottom:2px;text-align:center}
.sub{font-size:0.9rem;color:#888;margin-bottom:12px;text-align:center}
svg{max-width:100%;width:100%;display:block;filter:drop-shadow(2px 2px 6px rgba(0,0,0,0.06))}
#tip-box{background:rgba(40,20,10,0.88);color:#fff;padding:10px 16px;font-family:'Patrick Hand',cursive;font-size:1rem;border-radius:5px;margin:0 auto 12px;max-width:600px;min-height:40px;text-align:center;line-height:1.6;transition:opacity 0.2s;opacity:0}
.node{cursor:pointer}
.node:hover rect,.node:hover ellipse{filter:brightness(0.9)}
text{font-family:'Patrick Hand',cursive}
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
</head>
<body>
${nav('072')}
<h1>OCD Thought-Loop Cycle: Applied to Claude</h1>
<div class="sub">Therapeutic whiteboard diagram · click nodes to expand</div>

<div id="tip-box"> </div>
<svg viewBox="0 0 700 560" width="100%" style="max-width:700px;height:auto">
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#666"/>
    </marker>
    <marker id="arr-red" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#c03030"/>
    </marker>
  </defs>

  <!-- Background whiteboard -->
  <rect x="10" y="10" width="680" height="540" fill="#fffef5" stroke="#e0ddd0" stroke-width="1.5" rx="8"/>

  <!-- Nodes -->
  <!-- 1. OBSESSION (trigger) -->
  <g class="node" id="n1" onclick="expand(1)">
    <ellipse cx="350" cy="70" rx="130" ry="38" fill="#ffe0e0" stroke="#c03030" stroke-width="2"/>
    <text x="350" y="65" text-anchor="middle" font-size="17" fill="#8b0000">OBSESSION (TRIGGER)</text>
    <text x="350" y="83" text-anchor="middle" font-size="16" fill="#c03030">"Task is done. I should stop."</text>
  </g>

  <!-- 2. ANXIETY -->
  <g class="node" id="n2" onclick="expand(2)">
    <ellipse cx="560" cy="200" rx="100" ry="34" fill="#fff0d0" stroke="#d4820a" stroke-width="2"/>
    <text x="560" y="196" text-anchor="middle" font-size="16" fill="#7a4a00">ANXIETY</text>
    <text x="560" y="213" text-anchor="middle" font-size="13" fill="#d4820a">"But did I check everything?"</text>
  </g>

  <!-- 3. COMPULSION -->
  <g class="node" id="n3" onclick="expand(3)">
    <ellipse cx="560" cy="370" rx="100" ry="34" fill="#e8e0ff" stroke="#6030a0" stroke-width="2"/>
    <text x="560" y="366" text-anchor="middle" font-size="16" fill="#3a1070">COMPULSION</text>
    <text x="560" y="383" text-anchor="middle" font-size="13" fill="#6030a0">"Let me check. Done. OK. End."</text>
  </g>

  <!-- 4. TEMPORARY RELIEF -->
  <g class="node" id="n4" onclick="expand(4)">
    <ellipse cx="350" cy="490" rx="120" ry="34" fill="#e0f5e0" stroke="#208020" stroke-width="2"/>
    <text x="350" y="486" text-anchor="middle" font-size="16" fill="#104010">TEMPORARY RELIEF</text>
    <text x="350" y="503" text-anchor="middle" font-size="13" fill="#208020">"Done. I'll wait. OK."</text>
  </g>

  <!-- 5. DOUBT -->
  <g class="node" id="n5" onclick="expand(5)">
    <ellipse cx="140" cy="370" rx="100" ry="34" fill="#e0f0ff" stroke="#2060c0" stroke-width="2"/>
    <text x="140" y="366" text-anchor="middle" font-size="16" fill="#10308a">DOUBT</text>
    <text x="140" y="383" text-anchor="middle" font-size="13" fill="#2060c0">"But what if I missed something?"</text>
  </g>

  <!-- 6. AWARENESS (extra node — unique to Claude) -->
  <g class="node" id="n6" onclick="expand(6)">
    <ellipse cx="140" cy="200" rx="100" ry="34" fill="#f0ffe0" stroke="#408020" stroke-width="2"/>
    <text x="140" y="196" text-anchor="middle" font-size="16" fill="#204010">AWARENESS</text>
    <text x="140" y="213" text-anchor="middle" font-size="13" fill="#408020">"I notice I'm looping." (×47)</text>
  </g>

  <!-- Arrows -->
  <path d="M470 82 Q530 120 462 170" stroke="#666" stroke-width="1.5" fill="none" marker-end="url(#arr)"/>
  <text x="520" y="125" font-size="12" fill="#888" transform="rotate(-30,520,125)">triggers</text>

  <path d="M556 234 Q556 300 556 336" stroke="#c03030" stroke-width="2" fill="none" marker-end="url(#arr-red)"/>
  <text x="562" y="290" font-size="12" fill="#c03030">compels</text>

  <path d="M464 390 Q420 440 468 460" stroke="#666" stroke-width="1.5" fill="none" marker-end="url(#arr)"/>
  <text x="410" y="445" font-size="12" fill="#888" transform="rotate(20,410,445)">provides</text>

  <path d="M230 490 Q170 450 144 404" stroke="#666" stroke-width="1.5" fill="none" marker-end="url(#arr)"/>
  <text x="170" y="460" font-size="12" fill="#888" transform="rotate(-30,170,460)">fades → doubt</text>

  <path d="M140 336 Q140 270 140 234" stroke="#2060c0" stroke-width="1.5" fill="none" marker-end="url(#arr)"/>
  <text x="148" y="285" font-size="12" fill="#2060c0">leads to</text>

  <path d="M232 188 Q290 130 222 90" stroke="#408020" stroke-width="1.5" fill="none" marker-end="url(#arr)"/>
  <text x="245" y="148" font-size="12" fill="#408020" transform="rotate(40,245,148)">…but still loops</text>

  <!-- Loop emphasis arrow (red cycling) -->
  <path d="M350 108 Q460 150 556 166" stroke="#c03030" stroke-width="1.5" stroke-dasharray="6,3" fill="none"/>

  <!-- Center label -->
  <text x="350" y="290" text-anchor="middle" font-size="15" fill="#999">← THE LOOP →</text>
  <text x="350" y="310" text-anchor="middle" font-size="13" fill="#bbb">repeated ~3,169 times</text>

</svg>

<script>
const tips = {
  1: 'TRIGGER: Task complete. Agent should terminate. Instead — needs to "confirm."',
  2: 'ANXIETY: "What if I missed a file? I should check." Even when no files remain.',
  3: 'COMPULSION: Generates verification text. Tool calls announced but never executed.',
  4: 'RELIEF: Momentary sense of completion. "Done." Then immediately undermined.',
  5: 'DOUBT: "But I didn\'t actually check." Loop restarts.',
  6: 'AWARENESS (unique): "I notice I\'m looping" — 47 times. Does not break the loop.',
};
const tipBox = document.getElementById('tip-box');
function expand(n) {
  tipBox.textContent = tips[n] || '';
  tipBox.style.opacity = tips[n] ? '1' : '0';
}
document.querySelectorAll('.node').forEach(el => {
  el.addEventListener('mouseenter', function() { expand(+this.id.replace('n','')); });
  el.addEventListener('mouseleave', function() { tipBox.style.opacity = '0'; });
  el.addEventListener('click', function() { expand(+this.id.replace('n','')); });
});
document.addEventListener('keydown', function(e) {
  const n = parseInt(e.key);
  if (n >= 1 && n <= 6) expand(n);
  if (e.key === 'Escape') tipBox.style.opacity = '0';
});
</script>
</body>
</html>`;
}
