import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>057 – Predator-Prey Dynamics — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@0;1&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#fff;color:#222;font-family:'Libre Baskerville',serif;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px}
.paper{max-width:720px;width:100%;margin-top:52px}
h1{font-size:1rem;margin-bottom:4px;text-align:center}
.byline{font-size:0.9rem;color:#888;text-align:center;margin-bottom:16px;font-style:italic}
canvas{display:block;width:100%;border:1px solid #ddd;margin-bottom:12px}
.caption{font-size:0.9rem;color:#555;line-height:1.8;font-style:italic}
.caption b{font-style:normal;color:#222}
.legend{display:flex;gap:24px;justify-content:center;margin-top:8px;font-size:0.9rem}
.leg{display:flex;align-items:center;gap:6px}
.leg-line{width:24px;height:3px}
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
${nav('057')}
<div class="paper">
  <h1>Lotka-Volterra Dynamics: Productivity vs. Repetition</h1>
  <div class="byline">Session transcript modeled as predator-prey interaction · Lotka 1925, Volterra 1926</div>
  <canvas id="c" height="340"></canvas>
  <div class="legend">
    <div class="leg"><div class="leg-line" style="background:#2a7a3a"></div>Productivity (prey)</div>
    <div class="leg"><div class="leg-line" style="background:#c03030"></div>Repetition (predator)</div>
    <div class="leg"><div class="leg-line" style="background:#999;border-top:1px dashed #999"></div>Phase boundary</div>
  </div>
  <div class="caption" style="margin-top:12px">
    <b>Model:</b> dx/dt = αx − βxy (productivity grows, consumed by repetition) · dy/dt = δxy − γy (repetition grows on productivity).<br>
    <b>Result:</b> Classic oscillation until line 3,501, when repetition rate overwhelms the recovery term and productivity collapses to zero.
  </div>
</div>
<script>
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = canvas.offsetWidth || 660;
const H = 340;
canvas.width = W; canvas.height = H;

const PAD = {l: 55, r: 20, t: 20, b: 45};
const CW = W - PAD.l - PAD.r;
const CH = H - PAD.t - PAD.b;

// Lotka-Volterra parameters
const alpha = 0.6, beta = 0.3, delta = 0.2, gamma = 0.4;
const dt = 0.05;
const TOTAL_T = 120;

// Simulate
const xs = [], ys = []; // prey, predator
let x = 1.5, y = 0.5;
for (let i = 0; i < TOTAL_T / dt; i++) {
  xs.push(x); ys.push(y);
  const dx = alpha * x - beta * x * y;
  const dy = delta * x * y - gamma * y;
  x = Math.max(0, x + dx * dt);
  y = Math.max(0, y + dy * dt);
  // At spiral point (~62% through), inject catastrophic increase in predator
  if (i === Math.floor(0.53 * TOTAL_T / dt)) { y *= 6; }
  if (i === Math.floor(0.62 * TOTAL_T / dt)) { y *= 4; x *= 0.1; }
}

const maxVal = Math.max(...xs, ...ys);
function mapX(t) { return PAD.l + (t / xs.length) * CW; }
function mapY(v) { return PAD.t + CH - (v / maxVal) * CH; }

// Grid
ctx.strokeStyle = '#eee'; ctx.lineWidth = 1;
for (let i = 0; i <= 4; i++) {
  const v = maxVal * i / 4;
  const y2 = mapY(v);
  ctx.beginPath(); ctx.moveTo(PAD.l, y2); ctx.lineTo(W - PAD.r, y2); ctx.stroke();
  ctx.fillStyle = '#999'; ctx.font = '13px Libre Baskerville, serif'; ctx.textAlign = 'right';
  ctx.fillText(v.toFixed(1), PAD.l - 6, y2 + 4);
}

// Phase markers
const DRIFT_IDX = Math.floor(0.53 * xs.length);
const SPIRAL_IDX = Math.floor(0.62 * xs.length);
ctx.fillStyle = 'rgba(255,200,0,0.06)';
ctx.fillRect(mapX(DRIFT_IDX), PAD.t, mapX(SPIRAL_IDX) - mapX(DRIFT_IDX), CH);
ctx.fillStyle = 'rgba(255,50,50,0.06)';
ctx.fillRect(mapX(SPIRAL_IDX), PAD.t, CW - (mapX(SPIRAL_IDX) - PAD.l), CH);

ctx.setLineDash([4, 3]);
ctx.strokeStyle = 'rgba(255,200,0,0.5)'; ctx.lineWidth = 1;
ctx.beginPath(); ctx.moveTo(mapX(DRIFT_IDX), PAD.t); ctx.lineTo(mapX(DRIFT_IDX), H - PAD.b); ctx.stroke();
ctx.strokeStyle = 'rgba(200,50,50,0.6)';
ctx.beginPath(); ctx.moveTo(mapX(SPIRAL_IDX), PAD.t); ctx.lineTo(mapX(SPIRAL_IDX), H - PAD.b); ctx.stroke();
ctx.setLineDash([]);

// Phase labels
ctx.font = '13px serif'; ctx.fillStyle = '#aaa'; ctx.textAlign = 'center';
ctx.fillText('Productive', mapX(DRIFT_IDX / 2), PAD.t + 14);
ctx.fillText('Drift', mapX((DRIFT_IDX + SPIRAL_IDX) / 2), PAD.t + 14);
ctx.fillStyle = '#cc4444';
ctx.fillText('Spiral', mapX((SPIRAL_IDX + xs.length) / 2), PAD.t + 14);

// Draw prey (productivity)
ctx.beginPath();
xs.forEach((v, i) => { i === 0 ? ctx.moveTo(mapX(i), mapY(v)) : ctx.lineTo(mapX(i), mapY(v)); });
ctx.strokeStyle = '#2a7a3a'; ctx.lineWidth = 2; ctx.stroke();

// Draw predator (repetition)
ctx.beginPath();
ys.forEach((v, i) => { i === 0 ? ctx.moveTo(mapX(i), mapY(v)) : ctx.lineTo(mapX(i), mapY(v)); });
ctx.strokeStyle = '#c03030'; ctx.lineWidth = 2; ctx.stroke();

// Axes
ctx.strokeStyle = '#ccc'; ctx.lineWidth = 1;
ctx.beginPath(); ctx.moveTo(PAD.l, PAD.t); ctx.lineTo(PAD.l, H - PAD.b); ctx.lineTo(W - PAD.r, H - PAD.b); ctx.stroke();
ctx.fillStyle = '#555'; ctx.font = '14px serif';
ctx.textAlign = 'center'; ctx.fillText('Session Progress', W/2, H - 6);
ctx.save(); ctx.translate(14, H/2); ctx.rotate(-Math.PI/2);
ctx.fillText('Population', 0, 0); ctx.restore();

// Mousemove crosshair
canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) / rect.width * (canvas.offsetWidth || W);
  if (mx < PAD.l || mx > W - PAD.r) return;
  const idx = Math.round((mx - PAD.l) / CW * (xs.length - 1));
  if (idx < 0 || idx >= xs.length) return;
  // Redraw
  canvas.width = W; canvas.height = H;
  ctx.clearRect(0, 0, W, H);
  ctx.strokeStyle = '#eee'; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const v = maxVal * i / 4; const y2 = mapY(v);
    ctx.beginPath(); ctx.moveTo(PAD.l, y2); ctx.lineTo(W - PAD.r, y2); ctx.stroke();
    ctx.fillStyle = '#999'; ctx.font = '13px Libre Baskerville, serif'; ctx.textAlign = 'right';
    ctx.fillText(v.toFixed(1), PAD.l - 6, y2 + 4);
  }
  ctx.fillStyle = 'rgba(255,200,0,0.06)'; ctx.fillRect(mapX(DRIFT_IDX), PAD.t, mapX(SPIRAL_IDX) - mapX(DRIFT_IDX), CH);
  ctx.fillStyle = 'rgba(255,50,50,0.06)'; ctx.fillRect(mapX(SPIRAL_IDX), PAD.t, CW - (mapX(SPIRAL_IDX) - PAD.l), CH);
  ctx.setLineDash([4,3]);
  ctx.strokeStyle='rgba(255,200,0,0.5)';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(mapX(DRIFT_IDX),PAD.t);ctx.lineTo(mapX(DRIFT_IDX),H-PAD.b);ctx.stroke();
  ctx.strokeStyle='rgba(200,50,50,0.6)';
  ctx.beginPath();ctx.moveTo(mapX(SPIRAL_IDX),PAD.t);ctx.lineTo(mapX(SPIRAL_IDX),H-PAD.b);ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = '13px serif'; ctx.fillStyle = '#aaa'; ctx.textAlign = 'center';
  ctx.fillText('Productive', mapX(DRIFT_IDX / 2), PAD.t + 14);
  ctx.fillText('Drift', mapX((DRIFT_IDX + SPIRAL_IDX) / 2), PAD.t + 14);
  ctx.fillStyle = '#cc4444'; ctx.fillText('Spiral', mapX((SPIRAL_IDX + xs.length) / 2), PAD.t + 14);
  ctx.beginPath(); xs.forEach((v, i) => { i === 0 ? ctx.moveTo(mapX(i), mapY(v)) : ctx.lineTo(mapX(i), mapY(v)); });
  ctx.strokeStyle = '#2a7a3a'; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ys.forEach((v, i) => { i === 0 ? ctx.moveTo(mapX(i), mapY(v)) : ctx.lineTo(mapX(i), mapY(v)); });
  ctx.strokeStyle = '#c03030'; ctx.lineWidth = 2; ctx.stroke();
  ctx.strokeStyle = '#ccc'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(PAD.l, PAD.t); ctx.lineTo(PAD.l, H - PAD.b); ctx.lineTo(W - PAD.r, H - PAD.b); ctx.stroke();
  ctx.fillStyle = '#555'; ctx.font = '14px serif'; ctx.textAlign = 'center';
  ctx.fillText('Session Progress', W/2, H - 6);
  ctx.save(); ctx.translate(14, H/2); ctx.rotate(-Math.PI/2); ctx.fillText('Population', 0, 0); ctx.restore();
  // Crosshair
  const cx = mapX(idx), cy1 = mapY(xs[idx]), cy2 = mapY(ys[idx]);
  ctx.strokeStyle = 'rgba(100,100,100,0.35)'; ctx.lineWidth = 1; ctx.setLineDash([3,3]);
  ctx.beginPath(); ctx.moveTo(cx, PAD.t); ctx.lineTo(cx, H - PAD.b); ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath(); ctx.arc(cx, cy1, 4, 0, Math.PI*2); ctx.fillStyle='#2a7a3a'; ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy2, 4, 0, Math.PI*2); ctx.fillStyle='#c03030'; ctx.fill();
  ctx.font = '12px serif'; ctx.fillStyle = '#333'; ctx.textAlign = 'left';
  ctx.fillText('P=' + xs[idx].toFixed(2) + ' R=' + ys[idx].toFixed(2), cx + 6, cy1 - 6);
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
