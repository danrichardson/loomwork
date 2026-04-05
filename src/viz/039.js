import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>039 – Glitch Mosaic — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;font-family:monospace}
h1{font-size:0.65rem;letter-spacing:0.2em;color:#444;text-transform:uppercase;margin-bottom:8px;text-align:center}
canvas{display:block;cursor:pointer}
.info{font-size:0.55rem;color:#333;text-align:center;margin-top:8px;line-height:1.8}
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
${nav('039')}
<h1>039 — Glitch Mosaic</h1>
<canvas id="c"></canvas>
<div class="info">Every pixel = one line of the session · click to glitch · <span id="lineinfo">line 0</span></div>
<script>
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const TOTAL = 6805;
const SPIRAL = 3637;
const DRIFT = 3501;
const PX = 2; // px per line

let W, H, cols, rows;
let glitchOffset = 0;
let glitching = false;
let scanLine = 0;

function setup() {
  const maxW = Math.min(680, window.innerWidth - 40);
  cols = Math.floor(maxW / PX);
  rows = Math.ceil(TOTAL / cols);
  W = cols * PX;
  H = rows * PX;
  canvas.width = W;
  canvas.height = H;
}

function lineColor(lineNum, glitch) {
  const phase = lineNum < DRIFT ? 0 : lineNum < SPIRAL ? 1 : 2;
  const t = phase === 2 ? (lineNum - SPIRAL) / (TOTAL - SPIRAL) : lineNum / DRIFT;
  let r, g, b;

  if (phase === 0) {
    // Productive: deep blue → teal
    r = Math.round(10 + t * 30);
    g = Math.round(40 + t * 120);
    b = Math.round(80 + t * 80);
  } else if (phase === 1) {
    // Drift: amber
    r = 200; g = 160; b = 20;
  } else {
    // Spiral: hot red, increasingly chaotic
    r = Math.round(150 + t * 105);
    g = Math.round(t < 0.3 ? 60 - t * 60 : 0);
    b = Math.round(t < 0.2 ? 40 - t * 40 : 0);
    if (glitch && Math.random() < 0.3) {
      r = Math.floor(Math.random() * 256);
      g = Math.floor(Math.random() * 100);
      b = Math.floor(Math.random() * 256);
    }
  }
  return [r, g, b];
}

function draw(glitchAmt) {
  const id = ctx.createImageData(W, H);
  const d = id.data;
  for (let i = 0; i < TOTAL; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = col * PX;
    const y = row * PX;
    const [r, g, b] = lineColor(i, glitchAmt > 0);

    // Glitch: row shift
    const shiftX = glitchAmt > 0 && i > SPIRAL && Math.random() < 0.05
      ? Math.floor((Math.random() - 0.5) * glitchAmt * 20) : 0;

    for (let px = 0; px < PX; px++) {
      for (let py = 0; py < PX; py++) {
        const sx = Math.max(0, Math.min(W - 1, x + px + shiftX));
        const sy = y + py;
        if (sy >= H) continue;
        const idx = (sy * W + sx) * 4;
        d[idx] = r; d[idx+1] = g; d[idx+2] = b; d[idx+3] = 255;
      }
    }
  }
  ctx.putImageData(id, 0, 0);

  // Scan line overlay
  if (glitchAmt > 0) {
    ctx.fillStyle = 'rgba(255,0,0,0.15)';
    for (let y = 0; y < H; y += 8) ctx.fillRect(0, y, W, 1);
  }

  // Phase markers
  const driftY = Math.floor(DRIFT / cols) * PX;
  const spiralY = Math.floor(SPIRAL / cols) * PX;
  ctx.strokeStyle = 'rgba(255,200,0,0.6)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, driftY); ctx.lineTo(W, driftY); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,50,50,0.8)';
  ctx.beginPath(); ctx.moveTo(0, spiralY); ctx.lineTo(W, spiralY); ctx.stroke();

  // Labels
  ctx.font = '9px monospace'; ctx.fillStyle = 'rgba(255,200,0,0.7)';
  ctx.fillText('← DRIFT 3501', 4, driftY - 2);
  ctx.fillStyle = 'rgba(255,50,50,0.9)';
  ctx.fillText('← SPIRAL 3637', 4, spiralY - 2);
}

let glitchTimer = null;
canvas.addEventListener('click', function() {
  if (glitchTimer) { clearInterval(glitchTimer); glitchTimer = null; draw(0); return; }
  let frame = 0;
  glitchTimer = setInterval(() => {
    frame++;
    draw(1 + frame * 0.5);
    if (frame > 20) { clearInterval(glitchTimer); glitchTimer = null; draw(0); }
  }, 50);
});

canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) / rect.width * W;
  const my = (e.clientY - rect.top) / rect.height * H;
  const col = Math.floor(mx / PX);
  const row = Math.floor(my / PX);
  const line = row * cols + col;
  if (line >= 0 && line < TOTAL) {
    document.getElementById('lineinfo').textContent =
      'line ' + line + ' / ' + TOTAL + ' — ' +
      (line < DRIFT ? 'PRODUCTIVE' : line < SPIRAL ? 'DRIFT' : 'SPIRAL');
  }
});

setup();
draw(0);
window.addEventListener('resize', () => { setup(); draw(0); });
</script>
</body>
</html>`;
}
