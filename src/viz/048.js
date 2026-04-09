import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>048 – The Sandfall — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#1a1008;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;font-family:Georgia,serif}
h1{font-size:0.75rem;letter-spacing:0.15em;color:#8a6a3a;text-transform:uppercase;margin-bottom:4px;text-align:center}
canvas{display:block;max-width:100%}
.readout{font-size:0.7rem;color:#8a6a3a;text-align:center;margin-top:8px;font-style:italic}
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
${nav('048')}
<h1>048 — The Sandfall</h1>
<canvas id="c"></canvas>
<div class="readout" id="readout">Coherence flowing through...</div>
<script>
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = Math.min(400, window.innerWidth - 40);
const H = 560;
canvas.width = W; canvas.height = H;

const TOTAL = 6805, SPIRAL = 3637;
const GRAIN_SIZE = 2;
const COLS = Math.floor(W / GRAIN_SIZE);
const ROWS = Math.floor(H / GRAIN_SIZE);

// Sand grid: 0=empty, 1=coherent (golden), 2=corrupted (red), 3=wall
const grid = Array.from({length: ROWS}, () => new Uint8Array(COLS));

// Draw hourglass walls
const mid = Math.floor(ROWS / 2);
const topW = Math.floor(COLS * 0.45);
const neckW = Math.floor(COLS * 0.06);

function setWalls() {
  for (let r = 0; r < ROWS; r++) {
    // Hourglass shape: tapers to neck at mid, expands below
    const t = r < mid
      ? (mid - r) / mid
      : (r - mid) / (ROWS - mid);
    const half = Math.floor(neckW/2 + t * (topW - neckW/2));
    const lx = Math.floor(COLS/2 - half);
    const rx = Math.floor(COLS/2 + half);
    for (let c = 0; c < COLS; c++) {
      if (c < lx || c > rx) grid[r][c] = 3;
    }
  }
  // Top/bottom caps
  for (let c = 0; c < COLS; c++) { grid[0][c] = 3; grid[ROWS-1][c] = 3; }
}
setWalls();

// Fill top half with sand
let sessionLine = 0;
const LINE_PER_FRAME = TOTAL / 3000;

function addSand() {
  const t = Math.min(1, sessionLine / TOTAL);
  const isSpiral = sessionLine > SPIRAL;
  // Spawn in top bulge
  for (let attempt = 0; attempt < 3; attempt++) {
    const c = Math.floor(COLS/2 - 8 + Math.random() * 16);
    const r = 4;
    if (r >= 0 && r < ROWS && c >= 0 && c < COLS && grid[r][c] === 0) {
      grid[r][c] = isSpiral ? 2 : 1;
    }
  }
}

function stepSand() {
  // Iterate bottom-up so grains fall naturally
  for (let r = ROWS - 2; r >= 0; r--) {
    for (let c = 1; c < COLS - 1; c++) {
      const cell = grid[r][c];
      if (cell !== 1 && cell !== 2) continue;
      // Fall straight down
      if (grid[r+1][c] === 0) { grid[r+1][c] = cell; grid[r][c] = 0; }
      // Fall diagonally
      else {
        const dir = Math.random() < 0.5 ? -1 : 1;
        if (grid[r+1][c+dir] === 0 && grid[r][c+dir] === 0) {
          grid[r+1][c+dir] = cell; grid[r][c] = 0;
        } else if (grid[r+1][c-dir] === 0 && grid[r][c-dir] === 0) {
          grid[r+1][c-dir] = cell; grid[r][c] = 0;
        }
      }
    }
  }
}

function drawGrid() {
  ctx.fillStyle = '#1a1008';
  ctx.fillRect(0, 0, W, H);

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const v = grid[r][c];
      if (v === 0) continue;
      const x = c * GRAIN_SIZE, y = r * GRAIN_SIZE;
      if (v === 3) {
        ctx.fillStyle = '#2a1f0a';
      } else if (v === 1) {
        // Golden sand with slight variation
        const shade = 180 + Math.floor(Math.random() * 40);
        ctx.fillStyle = 'rgb(' + shade + ',' + Math.floor(shade*0.7) + ',20)';
      } else {
        // Red corrupted sand
        const shade = 160 + Math.floor(Math.random() * 60);
        ctx.fillStyle = 'rgb(' + shade + ',20,20)';
      }
      ctx.fillRect(x, y, GRAIN_SIZE, GRAIN_SIZE);
    }
  }

  // Hourglass frame
  ctx.strokeStyle = '#4a3010';
  ctx.lineWidth = 3;
  // ... drawn by wall cells
}

let frame = 0;
function loop() {
  frame++;
  sessionLine = Math.min(TOTAL, sessionLine + LINE_PER_FRAME);
  if (frame % 2 === 0) addSand();
  stepSand();
  drawGrid();

  const phase = sessionLine < 3501 ? 'PRODUCTIVE' : sessionLine < SPIRAL ? 'DRIFT' : 'SPIRAL';
  const pct = (sessionLine / TOTAL * 100).toFixed(0);
  document.getElementById('readout').textContent =
    'Line ' + Math.round(sessionLine) + ' / ' + TOTAL + ' — ' + phase + ' (' + pct + '%)';

  requestAnimationFrame(loop);
}
loop();
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
