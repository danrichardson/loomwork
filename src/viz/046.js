import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>046 – Phantom Traffic Jam — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#1c1c1c;color:#ccc;font-family:'DM Sans',sans-serif;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px}
h1{font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:#888;margin-bottom:2px;text-align:center}
.subtitle{font-size:0.6rem;color:#444;margin-bottom:12px;text-align:center;font-style:italic}
canvas{display:block;max-width:100%;border:1px solid #2a2a2a}
.stats{display:flex;gap:20px;margin-top:8px;justify-content:center;flex-wrap:wrap}
.stat{text-align:center;font-size:0.6rem;color:#555}
.stat-val{font-size:1rem;color:#ccc;font-weight:600}
.citation{font-size:0.55rem;color:#333;text-align:center;margin-top:8px;font-style:italic}
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
${nav('046')}
<h1>046 — The Phantom Traffic Jam</h1>
<div class="subtitle">Token throughput as freeway traffic · spontaneous jam forms at line 3,637</div>
<canvas id="c"></canvas>
<div class="stats">
  <div class="stat"><div class="stat-val" id="speed">100</div><div>Avg Speed</div></div>
  <div class="stat"><div class="stat-val" id="flow">0</div><div>Flow (tokens/s)</div></div>
  <div class="stat"><div class="stat-val" id="line">0</div><div>Session Line</div></div>
  <div class="stat"><div class="stat-val" id="phase">PRODUCTIVE</div><div>Phase</div></div>
</div>
<div class="citation">Nagel-Schreckenberg (1992) "A cellular automaton model for freeway traffic" · spontaneous jams emerge without external cause</div>
<script>
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = Math.min(700, window.innerWidth - 40);
const H = 320;
canvas.width = W; canvas.height = H;

const LANES = 4;
const LANE_H = (H - 40) / LANES;
const CELL_W = 14;
const N_CELLS = Math.floor(W / CELL_W);
const V_MAX = 5;
const P_NOISE = 0.05;
const TOTAL_LINES = 6805;
const SPIRAL = 3637;

// Nagel-Schreckenberg cellular automaton per lane
class NSLane {
  constructor(density) {
    this.cells = new Array(N_CELLS).fill(0);
    this.vels = new Array(N_CELLS).fill(0);
    // Random initial placement
    for (let i = 0; i < N_CELLS; i++) {
      if (Math.random() < density) {
        this.cells[i] = 1;
        this.vels[i] = Math.floor(Math.random() * V_MAX);
      }
    }
  }

  step(chaos) {
    const newCells = new Array(N_CELLS).fill(0);
    const newVels = new Array(N_CELLS).fill(0);
    for (let i = 0; i < N_CELLS; i++) {
      if (!this.cells[i]) continue;
      let v = this.vels[i];
      // 1. Accelerate
      if (v < V_MAX) v++;
      // 2. Decelerate (gap to next car)
      let gap = 0;
      for (let d = 1; d <= V_MAX + 2; d++) {
        if (!this.cells[(i + d) % N_CELLS]) gap++;
        else break;
      }
      if (v > gap) v = gap;
      // 3. Random slowdown (more in spiral)
      const p = P_NOISE + chaos * 0.4;
      if (v > 0 && Math.random() < p) v--;
      // 4. Move
      const ni = (i + v) % N_CELLS;
      if (!newCells[ni]) { newCells[ni] = 1; newVels[ni] = v; }
      else { newCells[i] = 1; newVels[i] = 0; } // blocked
    }
    this.cells = newCells;
    this.vels = newVels;
  }

  avgSpeed() {
    let total = 0, count = 0;
    for (let i = 0; i < N_CELLS; i++) if (this.cells[i]) { total += this.vels[i]; count++; }
    return count ? total / count : 0;
  }
}

const lanes = [
  new NSLane(0.25),
  new NSLane(0.30),
  new NSLane(0.28),
  new NSLane(0.22),
];

let sessionLine = 0;
let frameCount = 0;
const LINE_PER_FRAME = TOTAL_LINES / 2000;

function draw() {
  ctx.fillStyle = '#1c1c1c';
  ctx.fillRect(0, 0, W, H);

  // Road surface
  ctx.fillStyle = '#242424';
  ctx.fillRect(0, 20, W, H - 20);

  // Lane markings
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  ctx.setLineDash([20, 15]);
  for (let l = 1; l < LANES; l++) {
    const y = 20 + l * LANE_H;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  ctx.setLineDash([]);

  const spiral = sessionLine > SPIRAL;
  const drift = sessionLine > 3500 && sessionLine <= SPIRAL;
  const chaos = spiral ? (sessionLine - SPIRAL) / (TOTAL_LINES - SPIRAL) : 0;

  // Phase marker
  if (spiral) {
    ctx.fillStyle = 'rgba(200,0,0,0.04)';
    ctx.fillRect(0, 20, W, H - 20);
  }

  // Simulate
  frameCount++;
  if (frameCount % 3 === 0) {
    lanes.forEach(l => l.step(chaos));
    sessionLine = Math.min(TOTAL_LINES, sessionLine + LINE_PER_FRAME * 3);
  }

  // Draw cars
  for (let l = 0; l < LANES; l++) {
    const lane = lanes[l];
    const laneY = 20 + l * LANE_H;
    for (let i = 0; i < N_CELLS; i++) {
      if (!lane.cells[i]) continue;
      const v = lane.vels[i];
      const t = v / V_MAX;
      // Color: fast=blue, slow=red, stopped=bright red
      const hue = spiral ? (v === 0 ? 0 : 15 - t * 10) : (t < 0.5 ? 0 : 200 + t * 60);
      const sat = 80 + t * 20;
      const lig = v === 0 ? 55 : 40 + t * 25;
      ctx.fillStyle = 'hsl(' + hue + ',' + sat + '%,' + lig + '%)';
      const carW = CELL_W - 2;
      const carH = LANE_H - 8;
      ctx.fillRect(i * CELL_W + 1, laneY + 4, carW, carH);
      // Headlights if slow
      if (v < 2) {
        ctx.fillStyle = 'rgba(255,50,50,0.7)';
        ctx.fillRect(i * CELL_W + carW - 2, laneY + 4, 2, 3);
        ctx.fillRect(i * CELL_W + carW - 2, laneY + carH + 1, 2, 3);
      }
    }
  }

  // Speed indicator at top
  const avgSpeed = lanes.reduce((s, l) => s + l.avgSpeed(), 0) / LANES;
  const flow = Math.round(avgSpeed * 40);
  const speedPct = avgSpeed / V_MAX;
  const grad = ctx.createLinearGradient(0, 0, W * speedPct, 0);
  grad.addColorStop(0, spiral ? '#ff3333' : '#4488ff');
  grad.addColorStop(1, spiral ? '#aa0000' : '#0044aa');
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, W, 18);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W * speedPct, 18);
  ctx.fillStyle = '#fff';
  ctx.font = '9px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('SPEED: ' + (avgSpeed * 20).toFixed(0) + ' mph  FLOW: ' + flow + ' tok/s  ' + (spiral ? '⚠ JAM' : drift ? '⚡ DRIFT' : '✓ NOMINAL'), 6, 12);

  document.getElementById('speed').textContent = (avgSpeed * 20).toFixed(0);
  document.getElementById('flow').textContent = flow;
  document.getElementById('line').textContent = Math.round(sessionLine);
  document.getElementById('phase').textContent = spiral ? '⚠ SPIRAL' : drift ? 'DRIFT' : 'PRODUCTIVE';

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
