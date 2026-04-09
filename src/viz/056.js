import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>056 – The Thunderstorm — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0f1a;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;font-family:monospace}
h1{font-size:0.65rem;color:#1a3a5a;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:2px;text-align:center}
canvas{display:block;max-width:100%}
.citation{font-size:0.55rem;color:#1a2a3a;text-align:center;margin-top:8px;font-style:italic}
.hud{display:flex;gap:16px;justify-content:center;margin-top:6px;font-size:0.6rem;color:#446}
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
${nav('056')}
<h1>056 — The Thunderstorm</h1>
<canvas id="c"></canvas>
<div class="hud">
  <span>Re = <span id="reynolds">420</span></span>
  <span>Phase: <span id="phase">LAMINAR</span></span>
  <span>Line: <span id="lineval">0</span></span>
</div>
<div class="citation">Laminar → turbulent transition · Reynolds number Re > 2300 → turbulence onset · Lorenz 1963 strange attractor</div>
<script>
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = Math.min(700, window.innerWidth - 40);
const H = 420;
canvas.width = W; canvas.height = H;

const TOTAL = 6805, SPIRAL = 3637, DRIFT = 3501;

// Particle system: laminar flow becomes turbulent
const N = 200;
const particles = Array.from({length: N}, (_, i) => ({
  x: Math.random() * W,
  y: H * 0.1 + (i / N) * H * 0.8,
  baseY: H * 0.1 + (i / N) * H * 0.8,
  vx: 1.5 + Math.random() * 0.5,
  vy: 0,
  turbulence: 0,
  trail: []
}));

const lightning = [];
let sessionLine = 0, t = 0;

function addLightning() {
  const x = W * 0.1 + Math.random() * W * 0.8;
  const segs = [];
  let cx2 = x, cy2 = 0;
  while (cy2 < H * 0.7) {
    const nx = cx2 + (Math.random() - 0.5) * 60;
    const ny = cy2 + 30 + Math.random() * 20;
    segs.push({x1: cx2, y1: cy2, x2: nx, y2: ny});
    cx2 = nx; cy2 = ny;
  }
  lightning.push({ segs, life: 8 });
}

function draw() {
  ctx.fillStyle = 'rgba(10,15,26,0.3)';
  ctx.fillRect(0, 0, W, H);

  sessionLine = Math.min(TOTAL, sessionLine + 1.5);
  t++;

  const spiralT = sessionLine > SPIRAL ? (sessionLine - SPIRAL) / (TOTAL - SPIRAL) : 0;
  const driftT = sessionLine > DRIFT ? (sessionLine - DRIFT) / (SPIRAL - DRIFT) : 0;
  const turbulenceLevel = sessionLine > SPIRAL ? spiralT : sessionLine > DRIFT ? driftT * 0.3 : 0;
  const reynolds = Math.floor(420 + turbulenceLevel * 3500);

  // Background storm color
  const stormAlpha = turbulenceLevel * 0.3;
  ctx.fillStyle = 'rgba(50,20,10,' + stormAlpha + ')';
  ctx.fillRect(0, 0, W, H);

  // Rain in spiral phase
  if (sessionLine > SPIRAL) {
    for (let i = 0; i < 20 * spiralT; i++) {
      const rx = Math.random() * W;
      const ry = Math.random() * H;
      ctx.strokeStyle = 'rgba(100,150,200,' + (0.1 + spiralT * 0.3) + ')';
      ctx.lineWidth = 0.5; ctx.beginPath();
      ctx.moveTo(rx, ry); ctx.lineTo(rx + 2, ry + 10); ctx.stroke();
    }
  }

  // Cloud-like haze
  if (turbulenceLevel > 0) {
    ctx.fillStyle = 'rgba(30,40,60,' + turbulenceLevel * 0.4 + ')';
    ctx.fillRect(0, 0, W, H * 0.25);
  }

  // Update and draw particles
  particles.forEach((p, i) => {
    p.turbulence += (turbulenceLevel * 0.1 - p.turbulence) * 0.05;
    const wave = Math.sin(p.x * 0.02 + t * 0.05 + i * 0.1) * p.turbulence * 30;
    const chaos = (Math.random() - 0.5) * p.turbulence * 8;
    p.vy += (p.baseY + wave + chaos - p.y) * 0.02;
    p.vy *= 0.9;
    p.y += p.vy;
    p.x += p.vx;
    if (p.x > W) { p.x = 0; p.y = p.baseY + (Math.random() - 0.5) * 10; }

    p.trail.push({x: p.x, y: p.y});
    if (p.trail.length > 6) p.trail.shift();

    // Color: blue=laminar, white=transition, red=turbulent
    const hue = turbulenceLevel < 0.3 ? 200 : 200 - turbulenceLevel * 200;
    const sat = 60 + turbulenceLevel * 40;
    const lig = 40 + turbulenceLevel * 30;
    ctx.strokeStyle = 'hsla(' + hue + ',' + sat + '%,' + lig + '%,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    p.trail.forEach((pt, idx) => idx === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y));
    ctx.stroke();
  });

  // Lightning
  if (sessionLine > SPIRAL && Math.random() < spiralT * 0.03) addLightning();
  for (let i = lightning.length - 1; i >= 0; i--) {
    const l = lightning[i];
    l.life--;
    const alpha = l.life / 8;
    l.segs.forEach(s => {
      ctx.strokeStyle = 'rgba(200,220,255,' + alpha + ')';
      ctx.lineWidth = l.life > 4 ? 2 : 1;
      ctx.beginPath(); ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2); ctx.stroke();
    });
    if (l.life <= 0) lightning.splice(i, 1);
  }

  const phase = sessionLine < DRIFT ? 'LAMINAR' : sessionLine < SPIRAL ? 'TRANSITION' : '⚡ TURBULENT';
  document.getElementById('reynolds').textContent = reynolds;
  document.getElementById('phase').textContent = phase;
  document.getElementById('lineval').textContent = Math.round(sessionLine);

  if (sessionLine >= TOTAL) { sessionLine = 0; t = 0; }
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
