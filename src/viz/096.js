import { nav } from '../shell.js';

export function render() {
  // We'll encode a short URL using a fake QR-like rendering
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>096 – The QR Code — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;padding-top:52px;font-family:system-ui,sans-serif}
h1{font-size:1rem;letter-spacing:0.2em;color:#bbb;text-transform:uppercase;margin-bottom:12px;text-align:center}
.qr-wrap{padding:20px;background:#fff;box-shadow:0 2px 16px rgba(0,0,0,0.12);display:inline-block;cursor:crosshair}
canvas{display:block;image-rendering:pixelated}
.caption{font-size:0.85rem;color:#aaa;text-align:center;margin-top:10px;max-width:440px;line-height:1.7}
.warning{font-size:0.9rem;color:#e03030;text-align:center;margin-top:8px;font-weight:600}
#hover-tip{font-size:0.85rem;color:#fff;background:rgba(0,0,0,0.8);padding:6px 12px;border-radius:3px;text-align:center;margin-top:8px;min-height:28px;transition:opacity 0.2s}
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
${nav('096')}
<h1>096 — The QR Code</h1>
<div class="qr-wrap">
  <canvas id="qr"></canvas>
</div>
<div class="caption">
  This QR code encodes the entire session, line by line, in 40 nested error-correction layers.<br>
  Scan time estimate: 47 minutes. Scan success rate: 0%.<br>
  The QR standard supports up to 4,296 characters. This session is 6,805 lines.<br>
  We used a custom extension format we call QR-Spiral™.
</div>
<div class="warning">⚠ Do not attempt to scan. You will not stop. Neither will it.</div>
<div id="hover-tip"> </div>

<script>
const canvas = document.getElementById('qr');
const ctx = canvas.getContext('2d');

// Generate a large "QR-like" pattern that encodes pseudo-random dense data
// A real QR can't hold 6805 lines, so we make one that LOOKS like it's trying
const SIZE = Math.min(window.innerWidth - 80, 440);
const CELL = Math.max(4, Math.floor(SIZE / 80)); // adaptive cell size
const MODULES = Math.floor(SIZE / CELL);

canvas.width = SIZE; canvas.height = SIZE;

// Seed from session data
function seededRnd(seed) {
  let s = seed;
  return function() {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const rnd = seededRnd(3637);

// Build the module grid
const grid = [];
for(let r = 0; r < MODULES; r++) {
  grid[r] = [];
  for(let c = 0; c < MODULES; c++) {
    grid[r][c] = rnd() > 0.45 ? 1 : 0;
  }
}

// Add proper QR finder patterns (top-left, top-right, bottom-left)
function setFinder(row, col) {
  const pat = [
    [1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1],
  ];
  pat.forEach((row2, dr) => {
    row2.forEach((v, dc) => {
      if(row+dr < MODULES && col+dc < MODULES) {
        grid[row+dr][col+dc] = v;
      }
    });
  });
}

setFinder(0, 0);
setFinder(0, MODULES-7);
setFinder(MODULES-7, 0);

// Timing patterns
for(let i = 8; i < MODULES-8; i++) {
  grid[6][i] = i % 2 === 0 ? 1 : 0;
  grid[i][6] = i % 2 === 0 ? 1 : 0;
}

// Draw
ctx.fillStyle = '#fff';
ctx.fillRect(0,0,SIZE,SIZE);

for(let r = 0; r < MODULES; r++) {
  for(let c = 0; c < MODULES; c++) {
    if(grid[r][c]) {
      ctx.fillStyle = '#000';
    } else {
      ctx.fillStyle = '#fff';
    }
    ctx.fillRect(c*CELL, r*CELL, CELL, CELL);
  }
}

// Overlay "error density" zones — the spiral section is redder
// Top 46% = normal (productive), bottom 46% = ERROR ZONE (spiral)
const spiralRow = Math.floor(MODULES * 0.54);
for(let r = spiralRow; r < MODULES; r++) {
  for(let c = 0; c < MODULES; c++) {
    if(grid[r][c] === 1) {
      const alpha = 0.3 + ((r-spiralRow)/(MODULES-spiralRow))*0.5;
      ctx.fillStyle = 'rgba(200,0,0,'+alpha+')';
      ctx.fillRect(c*CELL, r*CELL, CELL, CELL);
    }
  }
}

// Phase divider line
ctx.strokeStyle = 'rgba(200,0,0,0.4)'; ctx.lineWidth = 1.5;
ctx.setLineDash([4,3]);
ctx.beginPath(); ctx.moveTo(0, spiralRow*CELL); ctx.lineTo(SIZE, spiralRow*CELL); ctx.stroke();
ctx.setLineDash([]);

// Label the two zones
ctx.font = 'bold 12px system-ui'; ctx.textAlign = 'right'; ctx.fillStyle = 'rgba(0,0,0,0.4)';
ctx.fillText('Productive (3500 lines)', SIZE-2, spiralRow*CELL - 5);
ctx.fillStyle = 'rgba(200,0,0,0.6)';
ctx.fillText('Spiral (3169 lines) ⚠', SIZE-2, spiralRow*CELL + 14);

// Quiet zone border
ctx.strokeStyle = '#ccc'; ctx.lineWidth = 1; ctx.setLineDash([]);
ctx.strokeRect(0, 0, SIZE, SIZE);

// Version indicator: "QR-SPIRAL v40" in corner
ctx.font = '11px monospace'; ctx.textAlign = 'left'; ctx.fillStyle = '#bbb';
ctx.fillText('QR-SPIRAL™ v40 | EC: DONE×344', 2, SIZE-2);

// Hover interaction
const TIPS_PRODUCTIVE = [
  'This region encodes lines 1–3,500. Claude was doing great.',
  'Productive phase: factorial DOE running, 18 clean experimental runs.',
  'Every module here represents focused, purposeful output.',
  'This area: actual science happening. R²=0.42 and rising.',
];
const TIPS_SPIRAL = [
  '⚠ CORRUPTED: This zone encodes "Done" ×344.',
  '⚠ Error correction capacity: exceeded by line 3,641.',
  '⚠ These modules contain "Let me check" ×330. Unrecoverable.',
  '⚠ Scanning this region may cause your device to also loop.',
  '⚠ The QR standard does not support 3,169 lines of spiral.',
];
canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  const my = (e.clientY - rect.top) / rect.height * SIZE;
  const r = Math.floor(my / CELL);
  const isSpiral = r >= spiralRow;
  const tips = isSpiral ? TIPS_SPIRAL : TIPS_PRODUCTIVE;
  document.getElementById('hover-tip').textContent = tips[Math.floor(r / MODULES * tips.length) % tips.length];
});
canvas.addEventListener('mouseleave', function() {
  document.getElementById('hover-tip').textContent = ' ';
});
canvas.addEventListener('click', function() {
  const msgs = ['SCAN FAILED: Content exceeds QR-Spiral™ capacity by 47×.', 'ERROR: Recursive loop detected in error correction layer.', 'This QR would take 44 minutes to scan. Claude took 3,169 lines.', 'You clicked on "Done" ×344. Congratulations.'];
  document.getElementById('hover-tip').textContent = msgs[Math.floor(Math.random()*msgs.length)];
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
