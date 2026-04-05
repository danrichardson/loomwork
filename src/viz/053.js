import { nav } from '../shell.js';
import { PHRASE_COUNTS } from '../data.js';

export function render() {
  const seedData = Object.values(PHRASE_COUNTS);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>053 – Cellular Automata — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0a0a;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;font-family:monospace}
h1{font-size:1rem;letter-spacing:0.2em;color:#2a4a2a;text-transform:uppercase;margin-bottom:4px;text-align:center}
canvas{display:block;border:1px solid #1a1a1a}
.controls{display:flex;gap:8px;margin-top:8px;justify-content:center;flex-wrap:wrap}
.btn{padding:5px 14px;border:1px solid #2a4a2a;background:transparent;color:#4a8a4a;cursor:pointer;font-family:monospace;font-size:0.9rem}
.btn:hover{background:#2a4a2a;color:#aaffaa}
.info{font-size:0.9rem;color:#2a4a2a;text-align:center;margin-top:4px}
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
${nav('053')}
<h1>053 — Cellular Automata (Conway's Game of Life)</h1>
<canvas id="c"></canvas>
<div class="controls">
  <button class="btn" onclick="toggleRun()" id="runbtn">⏸ Pause</button>
  <button class="btn" onclick="step()">Step</button>
  <button class="btn" onclick="resetGrid()">Reset</button>
  <button class="btn" onclick="addGlider()">+ Glider</button>
  <button class="btn" onclick="stampDone()">Stamp DONE</button>
</div>
<div class="info" id="info">Generation 0 · click/drag canvas to draw cells · seeded from phrase data</div>
<script>
const SEED = ${JSON.stringify(seedData)};
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

const CELL = 7;
const W = Math.min(window.innerWidth - 20, 1000);
const H = Math.max(520, Math.floor(window.innerHeight - 210));
canvas.width = W; canvas.height = H;
const COLS = Math.floor(W / CELL);
const ROWS = Math.floor(H / CELL);

let grid = Array.from({length: ROWS}, () => new Uint8Array(COLS));
let next = Array.from({length: ROWS}, () => new Uint8Array(COLS));
let gen = 0, running = true;

function resetGrid() {
  gen = 0;
  for (let r = 0; r < ROWS; r++) grid[r].fill(0);
  // Seed from phrase counts (use as bitmask)
  SEED.forEach((count, idx) => {
    const bits = count.toString(2);
    const startC = Math.floor(COLS * 0.1) + idx * 14;
    const startR = Math.floor(ROWS * 0.3);
    for (let b = 0; b < bits.length && b < 14; b++) {
      if (bits[b] === '1' && startC + b < COLS && startR < ROWS) {
        grid[startR][startC + b] = 1;
      }
    }
  });
  // Random scatter
  for (let i = 0; i < 400; i++) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    grid[r][c] = Math.random() < 0.3 ? 1 : 0;
  }
}

function addGlider() {
  const r = Math.floor(Math.random() * (ROWS - 5)) + 2;
  const c = Math.floor(Math.random() * (COLS - 5)) + 2;
  [[0,1],[1,2],[2,0],[2,1],[2,2]].forEach(([dr, dc]) => {
    if (r+dr < ROWS && c+dc < COLS) grid[r+dr][c+dc] = 1;
  });
}

function stepLife() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let n = 0;
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = (r + dr + ROWS) % ROWS;
        const nc = (c + dc + COLS) % COLS;
        n += grid[nr][nc];
      }
      const alive = grid[r][c];
      next[r][c] = (alive && (n === 2 || n === 3)) || (!alive && n === 3) ? 1 : 0;
    }
  }
  [grid, next] = [next, grid];
  gen++;
}

function countAlive() {
  let n = 0;
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) n += grid[r][c];
  return n;
}

function draw() {
  ctx.fillStyle = '#0a0a0a'; ctx.fillRect(0, 0, W, H);
  const alive = countAlive();
  const density = alive / (ROWS * COLS);
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!grid[r][c]) continue;
      // Color based on generation phase analogy
      const hue = Math.min(120, density * 1200); // green = ordered, red = chaotic
      ctx.fillStyle = 'hsl(' + (120 - hue) + ',80%,55%)';
      ctx.fillRect(c * CELL, r * CELL, CELL - 1, CELL - 1);
    }
  }
  const phase = gen < 50 ? 'SETUP' : density < 0.03 ? 'SPARSE' : density < 0.1 ? 'ACTIVE' : 'DENSE';
  document.getElementById('info').textContent =
    'Generation ' + gen + ' · Alive: ' + alive + ' · Density: ' + (density * 100).toFixed(1) + '% · Phase: ' + phase;
}

function step() { stepLife(); draw(); }
function toggleRun() {
  running = !running;
  document.getElementById('runbtn').textContent = running ? '⏸ Pause' : '▶ Run';
}

// Draw DONE in pixel font across the grid
function stampDone() {
  const letters = {
    D:[[1,0],[1,1],[1,2],[1,3],[1,4],[2,0],[2,4],[3,0],[3,1],[3,2],[3,3],[3,4]],
    O:[[1,0],[1,1],[1,2],[1,3],[1,4],[2,0],[2,4],[3,0],[3,1],[3,2],[3,3],[3,4],[4,0],[4,4]],
    N:[[1,0],[1,1],[1,2],[1,3],[1,4],[2,1],[3,2],[4,0],[4,1],[4,2],[4,3],[4,4]],
    E:[[1,0],[1,1],[1,2],[1,3],[1,4],[2,0],[2,2],[3,0],[3,2],[4,0],[4,1],[4,2],[4,3],[4,4]]
  };
  const word = ['D','O','N','E'];
  const startR = Math.floor(ROWS * 0.35), startC = Math.floor(COLS * 0.25);
  word.forEach((ch, li) => {
    const offC = startC + li * 6;
    (letters[ch]||[]).forEach(([dc,dr]) => {
      const r2 = startR + dr, c2 = offC + dc;
      if (r2 >= 0 && r2 < ROWS && c2 >= 0 && c2 < COLS) grid[r2][c2] = 1;
    });
  });
  draw();
}

let painting = false, paintVal = 1;
canvas.addEventListener('mousedown', function(e) {
  painting = true;
  const rect = canvas.getBoundingClientRect();
  const c2 = Math.floor((e.clientX - rect.left) / rect.width * COLS);
  const r2 = Math.floor((e.clientY - rect.top) / rect.height * ROWS);
  if (r2 >= 0 && r2 < ROWS && c2 >= 0 && c2 < COLS) {
    paintVal = grid[r2][c2] ? 0 : 1;
    grid[r2][c2] = paintVal;
  }
  draw();
});
canvas.addEventListener('mousemove', function(e) {
  if (!painting) return;
  const rect = canvas.getBoundingClientRect();
  const c2 = Math.floor((e.clientX - rect.left) / rect.width * COLS);
  const r2 = Math.floor((e.clientY - rect.top) / rect.height * ROWS);
  if (r2 >= 0 && r2 < ROWS && c2 >= 0 && c2 < COLS) grid[r2][c2] = paintVal;
  draw();
});
window.addEventListener('mouseup', function() { painting = false; });

document.addEventListener('keydown', function(e) {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key === ' ') { e.preventDefault(); toggleRun(); }
  if (e.key === 'r' || e.key === 'R') resetGrid();
  if (e.key === 'g' || e.key === 'G') addGlider();
  if (e.key === 'd' || e.key === 'D') stampDone();
});

resetGrid();

let lastStep = 0;
function loop(now) {
  if (running && now - lastStep > 80) { stepLife(); lastStep = now; }
  draw();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
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
