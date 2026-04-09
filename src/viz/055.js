import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>055 – The Fractal Tree — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#faf6ef;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;font-family:Georgia,serif}
h1{font-size:1rem;letter-spacing:0.1em;color:#8a7a5a;text-transform:uppercase;margin-bottom:2px;text-align:center}
.sub{font-size:0.9rem;color:#bba;margin-bottom:12px;text-align:center;font-style:italic}
canvas{display:block;max-width:100%;background:#faf6ef}
.slider-row{display:flex;align-items:center;gap:10px;margin-top:8px;font-size:0.9rem;color:#8a7a5a}
input[type=range]{width:140px}
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
${nav('055')}
<h1>055 — The Fractal Tree</h1>
<div class="sub">L-system tree · drag left/right to scrub session · move mouse over tree to bend branches</div>
<canvas id="c"></canvas>
<div class="slider-row">
  <span>Session line:</span>
  <input type="range" id="lineSlider" min="0" max="6963" value="0">
  <span id="lineLabel">Line 0</span>
</div>
<script>
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = Math.min(window.innerWidth - 40, 900);
const H = Math.max(480, Math.floor(window.innerHeight * 0.65));
canvas.width = W; canvas.height = H;

const TOTAL = 6805, SPIRAL = 3637, DRIFT = 3501;
let sessionLine = 0;
let animating = true;

function drawBranch(x, y, angle, length, depth, maxDepth, phase) {
  if (depth === 0 || length < 1.5) return;
  const spiral = phase === 'spiral';
  const drift = phase === 'drift';

  // Branch end
  const ex = x + Math.cos(angle) * length;
  const ey = y - Math.sin(angle) * length;

  // Branch color: productive=green/brown, drift=amber, spiral=red with noise
  let col;
  const t = depth / maxDepth;
  if (!spiral && !drift) {
    col = t > 0.6 ? 'rgba(100,160,60,' + (0.4 + t * 0.5) + ')' : 'rgba(100,70,30,' + (0.5 + t * 0.5) + ')';
  } else if (drift) {
    col = 'rgba(200,150,30,' + (0.3 + t * 0.6) + ')';
  } else {
    // Spiral: drooping, red, some branches broken
    col = 'rgba(180,40,30,' + (0.3 + t * 0.5) + ')';
  }

  ctx.strokeStyle = col;
  ctx.lineWidth = Math.max(0.5, (depth / maxDepth) * 5);
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey); ctx.stroke();

  // Leaves at tips
  if (depth === 1) {
    ctx.beginPath(); ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = spiral ? 'rgba(200,50,30,0.6)' : drift ? 'rgba(200,170,30,0.6)' : 'rgba(80,160,50,0.6)';
    ctx.fill();
    return;
  }

  const spiralT = sessionLine > SPIRAL ? (sessionLine - SPIRAL) / (TOTAL - SPIRAL) : 0;
  const baseAngle = (spiral ? 0.3 + spiralT * 0.2 : 0.35) + mouseInfluence * 0.15;
  const shrink = spiral ? 0.6 + spiralT * 0.1 : 0.67;

  // Random droop in spiral
  const droopL = spiral ? spiralT * 0.3 : 0;
  const droopR = spiral ? spiralT * 0.1 : 0;

  // Left branch (sometimes die in spiral)
  if (!(spiral && depth > maxDepth * 0.5 && Math.random() < spiralT * 0.3)) {
    drawBranch(ex, ey, angle + baseAngle - droopL, length * shrink, depth - 1, maxDepth, phase);
  }
  // Right branch
  if (!(spiral && depth > maxDepth * 0.4 && Math.random() < spiralT * 0.2)) {
    drawBranch(ex, ey, angle - baseAngle - droopR, length * shrink, depth - 1, maxDepth, phase);
  }
}

function render() {
  ctx.fillStyle = '#faf6ef'; ctx.fillRect(0, 0, W, H);

  const phase = sessionLine < DRIFT ? 'productive' : sessionLine < SPIRAL ? 'drift' : 'spiral';
  const spiralT = sessionLine > SPIRAL ? (sessionLine - SPIRAL) / (TOTAL - SPIRAL) : 0;

  // Depth varies: grows during productive, shrinks in spiral
  const maxDepth = phase === 'productive'
    ? Math.max(3, Math.floor(3 + (sessionLine / DRIFT) * 7))
    : phase === 'drift' ? 8
    : Math.max(3, Math.floor(10 - spiralT * 7));

  const trunkLength = 80 + (maxDepth / 10) * 20;
  const startAngle = Math.PI / 2;

  // Ground line
  ctx.strokeStyle = '#d0c8b0'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, H - 20); ctx.lineTo(W, H - 20); ctx.stroke();

  drawBranch(W / 2, H - 20, startAngle, trunkLength, maxDepth, maxDepth, phase);

  // Phase label
  ctx.font = '14px Georgia, serif'; ctx.fillStyle = '#8a7a5a';
  ctx.textAlign = 'center';
  ctx.fillText(
    phase === 'productive' ? 'Growing · depth ' + maxDepth :
    phase === 'drift' ? 'Plateauing · depth ' + maxDepth :
    'Collapsing · depth ' + maxDepth + ' · ' + Math.round(spiralT * 100) + '% degenerate',
    W / 2, H - 4
  );
}

let mouseInfluence = 0; // -1 to 1, affects branch angle

canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) / rect.width;
  mouseInfluence = (mx - 0.5) * 0.6; // sway ±0.3 rad
  render();
});
canvas.addEventListener('mouseleave', function() {
  mouseInfluence = 0; render();
});

// Click to explode a burst of leaves
canvas.addEventListener('click', function() {
  animating = false;
  const burst = ['productive','drift','spiral'];
  const phase = sessionLine < 3501 ? 'productive' : sessionLine < 3637 ? 'drift' : 'spiral';
  for (let b = 0; b < 8; b++) {
    setTimeout(() => { mouseInfluence = (Math.random()-0.5)*1.2; render(); }, b * 60);
  }
  setTimeout(() => { mouseInfluence = 0; render(); }, 500);
});

let isDragging = false, dragStartX = 0, dragStartLine = 0;
canvas.addEventListener('mousedown', function(e) {
  isDragging = true;
  dragStartX = e.clientX;
  dragStartLine = sessionLine;
  animating = false;
});
window.addEventListener('mousemove', function(e) {
  if (!isDragging) return;
  const delta = e.clientX - dragStartX;
  sessionLine = Math.max(0, Math.min(6963, Math.round(dragStartLine + delta * 15)));
  document.getElementById('lineSlider').value = sessionLine;
  document.getElementById('lineLabel').textContent = 'Line ' + sessionLine;
  render();
});
window.addEventListener('mouseup', function() { isDragging = false; });

document.getElementById('lineSlider').addEventListener('input', function() {
  sessionLine = +this.value;
  document.getElementById('lineLabel').textContent = 'Line ' + sessionLine;
  animating = false;
  render();
});

// Auto-animate
let autoLine = 0;
function autoRun() {
  if (!animating) return;
  autoLine = Math.min(TOTAL, autoLine + 30);
  sessionLine = autoLine;
  document.getElementById('lineSlider').value = autoLine;
  document.getElementById('lineLabel').textContent = 'Line ' + autoLine;
  render();
  if (autoLine < TOTAL) {
    requestAnimationFrame(autoRun);
  } else {
    setTimeout(() => { autoLine = 0; animating = true; requestAnimationFrame(autoRun); }, 3000);
  }
}
render();
requestAnimationFrame(autoRun);
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
