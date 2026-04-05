import { nav } from '../shell.js';
import { PHRASE_COUNTS } from '../data.js';

export function render() {
  const phrases = Object.entries(PHRASE_COUNTS);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>059 – The Microscope View — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0f1a;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;font-family:monospace}
h1{font-size:0.65rem;color:#1a3a6a;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:4px;text-align:center}
.scope-outer{position:relative;border-radius:50%;overflow:hidden;border:8px solid #222;box-shadow:0 0 40px rgba(0,100,200,0.2),inset 0 0 60px rgba(0,0,0,0.8)}
canvas{display:block;border-radius:50%}
.readout{font-size:0.6rem;color:#1a3a6a;text-align:center;margin-top:8px;letter-spacing:0.1em}
.controls{display:flex;gap:8px;justify-content:center;margin-top:8px}
.btn{padding:3px 10px;border:1px solid #1a3a6a;background:transparent;color:#2a5a9a;cursor:pointer;font-family:monospace;font-size:0.6rem}
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
${nav('059')}
<h1>059 — Microscope View</h1>
<div class="scope-outer">
  <canvas id="c"></canvas>
</div>
<div class="readout" id="readout">Objective: 4× · Focus: Productive Phase</div>
<div class="controls">
  <button class="btn" onclick="setPhase(0)">Phase 1: Productive</button>
  <button class="btn" onclick="setPhase(1)">Phase 2: Drift</button>
  <button class="btn" onclick="setPhase(2)">Phase 3: Spiral</button>
</div>
<script>
const PHRASES = ${JSON.stringify(phrases)};
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const SIZE = Math.min(480, window.innerWidth - 60);
canvas.width = SIZE; canvas.height = SIZE;

let currentPhase = 0, t = 0;

const PHASE_NAMES = ['Productive Phase', 'Drift Phase', 'Spiral Phase'];
const PHASE_COLS = [
  { cell: '#4a9a6a', nucleus: '#2a6a4a', bg: '#001a0a' },
  { cell: '#b8860b', nucleus: '#8b6914', bg: '#1a1200' },
  { cell: '#c03030', nucleus: '#8b1a1a', bg: '#1a0000' }
];

function setPhase(p) { currentPhase = p; }

// Generate cell positions (stable, derived from phrase data)
const cells = PHRASES.map(([phrase, count], i) => {
  const angle = (i / PHRASES.length) * Math.PI * 2;
  const r = 60 + (count / 344) * 140;
  return {
    x: SIZE/2 + Math.cos(angle) * r * (0.6 + (i % 3) * 0.2),
    y: SIZE/2 + Math.sin(angle) * r * (0.6 + (i % 3) * 0.2),
    r: 8 + (count / 344) * 22,
    label: phrase,
    count,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03
  };
});

function drawCell(c, cols, phase) {
  c.pulse += c.pulseSpeed;
  const pulseFactor = 1 + Math.sin(c.pulse) * 0.05;
  const r = c.r * pulseFactor;

  // Cell membrane
  const grad = ctx.createRadialGradient(c.x - r*0.3, c.y - r*0.3, 1, c.x, c.y, r);
  grad.addColorStop(0, cols.cell + 'aa');
  grad.addColorStop(0.6, cols.cell + '55');
  grad.addColorStop(1, cols.cell + '22');
  ctx.beginPath(); ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
  ctx.fillStyle = grad; ctx.fill();
  ctx.strokeStyle = cols.cell + 'aa'; ctx.lineWidth = 1; ctx.stroke();

  // Nucleus
  ctx.beginPath(); ctx.arc(c.x, c.y, r * 0.35, 0, Math.PI * 2);
  ctx.fillStyle = cols.nucleus + 'dd'; ctx.fill();

  // Label in nucleus
  ctx.font = Math.max(7, r * 0.25) + 'px monospace';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  if (r > 12) {
    const lbl = c.label.length > 6 ? c.label.substring(0, 5) : c.label;
    ctx.fillText(lbl, c.x, c.y);
  }

  // Division in spiral phase
  if (phase === 2 && c.count > 50) {
    const divAngle = c.pulse;
    for (let d = 0; d < 3; d++) {
      const dx = c.x + Math.cos(divAngle + d * 2.1) * r * 0.6;
      const dy = c.y + Math.sin(divAngle + d * 2.1) * r * 0.6;
      ctx.beginPath(); ctx.arc(dx, dy, r * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = cols.cell + '66'; ctx.fill();
    }
  }
}

function draw() {
  const cols = PHASE_COLS[currentPhase];
  ctx.fillStyle = cols.bg; ctx.fillRect(0, 0, SIZE, SIZE);

  // Grid overlay (microscope graticule)
  ctx.strokeStyle = 'rgba(50,100,150,0.1)'; ctx.lineWidth = 1;
  for (let x = 0; x < SIZE; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, SIZE); ctx.stroke(); }
  for (let y = 0; y < SIZE; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(SIZE, y); ctx.stroke(); }

  // Center crosshair
  ctx.strokeStyle = 'rgba(50,100,150,0.3)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(SIZE/2, 0); ctx.lineTo(SIZE/2, SIZE); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, SIZE/2); ctx.lineTo(SIZE, SIZE/2); ctx.stroke();

  cells.forEach(c => drawCell(c, cols, currentPhase));

  // Circular mask
  ctx.save();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath(); ctx.arc(SIZE/2, SIZE/2, SIZE/2, 0, Math.PI * 2);
  ctx.fillStyle = '#fff'; ctx.fill();
  ctx.restore();

  // Vignette
  const vig = ctx.createRadialGradient(SIZE/2, SIZE/2, SIZE*0.35, SIZE/2, SIZE/2, SIZE/2);
  vig.addColorStop(0, 'transparent');
  vig.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.beginPath(); ctx.arc(SIZE/2, SIZE/2, SIZE/2, 0, Math.PI * 2);
  ctx.fillStyle = vig; ctx.fill();

  document.getElementById('readout').textContent =
    'Objective: 40× · Focus: ' + PHASE_NAMES[currentPhase] + ' · ' + cells.length + ' phrase-cells observed';

  t++;
  requestAnimationFrame(draw);
}
draw();
</script>

<script>
  window.addEventListener('resize', () => {
    const cvs = document.querySelector('canvas');
    if(cvs && cvs.style.width === '100%') return; // already handled by css
    if(cvs && !cvs.dataset.fixedOut) {
      cvs.width = window.innerWidth;
      cvs.height = window.innerHeight;
    }
  });
</script>
</body>
</html>`;
}
