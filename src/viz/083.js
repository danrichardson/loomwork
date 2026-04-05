import { nav } from '../shell.js';
import { PHRASE_COUNTS } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>083 – The Equalizer — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px}
h1{font-size:0.65rem;letter-spacing:0.2em;color:#333;text-transform:uppercase;margin-bottom:4px;text-align:center}
canvas{display:block;max-width:100%}
.labels{display:flex;justify-content:space-around;max-width:680px;width:100%;margin-top:6px}
.label{text-align:center;font-size:0.55rem;color:#444;font-family:monospace;flex:1}
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
${nav('083')}
<h1>083 — Equalizer</h1>
<canvas id="c"></canvas>
<div class="labels" id="labels"></div>
<script>
const PHRASE_COUNTS = ${JSON.stringify(PHRASE_COUNTS)};
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = Math.min(680, window.innerWidth - 40);
const H = 320;
canvas.width = W; canvas.height = H;

const phrases = Object.entries(PHRASE_COUNTS);
const N = phrases.length;
const BAR_W = (W - 20) / N - 4;
const MAX_VAL = Math.max(...phrases.map(p=>p[1]));
const TOTAL = 6805, SPIRAL = 3637;

let sessionLine = 0;
let t = 0;

// Bar heights with animation
const bars = phrases.map(([phrase, count], i) => ({
  phrase, count,
  currentH: 0,
  targetH: 0,
  peak: 0,
  peakDecay: 0,
}));

function updateBars() {
  const spiralT = sessionLine > SPIRAL ? (sessionLine - SPIRAL) / (TOTAL - SPIRAL) : 0;
  const isSpiral = sessionLine > SPIRAL;

  bars.forEach((bar, i) => {
    const baseH = (bar.count / MAX_VAL);
    // In productive phase: bars dance rhythmically
    // In spiral: bars slam high for repeated phrases
    let target;
    if (!isSpiral) {
      target = baseH * 0.3 + Math.abs(Math.sin(t * 0.05 + i * 0.8)) * 0.4 * (baseH + 0.2);
    } else {
      const spiralBoost = bar.count > 50 ? spiralT * 0.8 : 0;
      target = baseH * (0.4 + spiralBoost) + Math.abs(Math.sin(t * 0.15 * (1 + spiralT) + i * 0.6)) * (0.3 + spiralT * 0.4);
    }
    bar.targetH = Math.min(1, target);
    bar.currentH += (bar.targetH - bar.currentH) * 0.25;

    if (bar.currentH > bar.peak) {
      bar.peak = bar.currentH;
      bar.peakDecay = 0;
    } else {
      bar.peakDecay++;
      if (bar.peakDecay > 20) bar.peak = Math.max(0, bar.peak - 0.005);
    }
  });
}

function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1;
  for (let i = 1; i <= 4; i++) {
    const y = H - (i/4) * (H - 20);
    ctx.beginPath(); ctx.moveTo(10, y); ctx.lineTo(W-10, y); ctx.stroke();
  }

  const isSpiral = sessionLine > SPIRAL;
  const spiralT = isSpiral ? (sessionLine - SPIRAL) / (TOTAL - SPIRAL) : 0;

  bars.forEach((bar, i) => {
    const x = 10 + i * (BAR_W + 4);
    const barH = bar.currentH * (H - 30);
    const y = H - 10 - barH;

    // Color gradient
    const hue = isSpiral ? (0 + bar.count / MAX_VAL * 30) : (180 + i / N * 80);
    const sat = isSpiral ? 90 + spiralT * 10 : 70;
    const grd = ctx.createLinearGradient(x, y + barH, x, y);
    grd.addColorStop(0, 'hsl(' + hue + ',' + sat + '%,50%)');
    grd.addColorStop(0.5, 'hsl(' + hue + ',' + sat + '%,70%)');
    grd.addColorStop(1, 'hsl(' + ((hue+40)%360) + ',' + sat + '%,90%)');

    // Bar segments (LED-style)
    const segments = Math.floor(barH / 6);
    for (let s = 0; s < segments; s++) {
      const sy = y + barH - s * 6 - 5;
      const t2 = s / (H / 6);
      const segCol = t2 > 0.85 ? '#ff2020' : t2 > 0.7 ? '#ffcc00' : 'hsl(' + hue + ',' + sat + '%,55%)';
      ctx.fillStyle = segCol;
      ctx.fillRect(x, sy, BAR_W, 4);
    }

    // Peak indicator
    const peakY = H - 10 - bar.peak * (H - 30);
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillRect(x, peakY - 1, BAR_W, 2);

    // Glow
    if (bar.currentH > 0.8) {
      ctx.shadowColor = 'hsl(' + hue + ',90%,70%)';
      ctx.shadowBlur = 12;
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, 0, 0);
      ctx.shadowBlur = 0;
    }
  });

  // Session line progress
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.fillRect(10, H - 6, (sessionLine / TOTAL) * (W - 20), 3);

  ctx.font = '9px monospace'; ctx.fillStyle = isSpiral ? '#ff4444' : '#4488ff';
  ctx.textAlign = 'left';
  ctx.fillText('Line ' + Math.round(sessionLine) + ' / ' + TOTAL + ' — ' + (isSpiral ? 'SPIRAL' : sessionLine > 3501 ? 'DRIFT' : 'PRODUCTIVE'), 10, 14);

  t++;
  sessionLine = Math.min(TOTAL, sessionLine + 1.2);
  if (sessionLine >= TOTAL) sessionLine = 0;
}

updateBars();
function loop() { updateBars(); draw(); requestAnimationFrame(loop); }
loop();

// Labels
const labelsEl = document.getElementById('labels');
bars.forEach(b => {
  const d = document.createElement('div');
  d.className = 'label';
  d.textContent = b.phrase.substring(0, 6);
  labelsEl.appendChild(d);
});
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
