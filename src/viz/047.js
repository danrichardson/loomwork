import { nav } from '../shell.js';
import { ALL_RUNS } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>047 – Confetti Shower — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;font-family:'Arial Black',sans-serif;overflow:hidden}
canvas{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none}
.content{position:relative;z-index:1;text-align:center;max-width:500px}
h1{font-size:clamp(1.5rem,5vw,3rem);color:#222;margin-bottom:12px}
.runs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:16px 0}
.run{padding:8px;background:#f5f5f5;border-radius:6px;font-size:0.85rem;color:#333;border:2px solid transparent;transition:all 0.3s;font-family:monospace}
.run.done{background:#e8f5e9;border-color:#4caf50;color:#2e7d32}
.run.active{animation:pop 0.4s ease-out}
@keyframes pop{0%{transform:scale(1.3)}100%{transform:scale(1)}}
.counter{font-size:2rem;color:#333;margin-top:8px}
.sub{font-size:0.75rem;color:#888;margin-top:4px}
.btn{margin-top:16px;padding:10px 24px;background:#222;color:#fff;border:none;font-family:'Arial Black',sans-serif;font-size:0.8rem;cursor:pointer}
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
${nav('047')}
<canvas id="c"></canvas>
<div class="content">
  <h1>18 Runs Complete!</h1>
  <div class="runs" id="runs">
    ${ALL_RUNS.map(r => '<div class="run" id="run-' + r + '">' + r + '</div>').join('')}
  </div>
  <div class="counter"><span id="count">0</span> / 18</div>
  <div class="sub">Each confetti burst = one experiment run completing</div>
  <button class="btn" onclick="restart()">REPLAY</button>
</div>
<script>
const RUNS = ${JSON.stringify(ALL_RUNS)};
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const particles = [];

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);

const COLORS = ['#ff595e','#ffca3a','#6a4c93','#1982c4','#8ac926','#ff924c','#c77dff','#ff70a6','#70d6ff','#e9ff70'];

class Confetto {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.vx = (Math.random() - 0.5) * 10;
    this.vy = -(3 + Math.random() * 12);
    this.r = 4 + Math.random() * 6;
    this.col = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.rot = Math.random() * Math.PI * 2;
    this.rotV = (Math.random() - 0.5) * 0.3;
    this.gravity = 0.3 + Math.random() * 0.2;
    this.life = 1;
    this.decay = 0.008 + Math.random() * 0.005;
    this.shape = Math.random() < 0.5 ? 'rect' : 'circle';
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= 0.99;
    this.rot += this.rotV;
    this.life -= this.decay;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.fillStyle = this.col;
    if (this.shape === 'rect') {
      ctx.fillRect(-this.r, -this.r * 0.4, this.r * 2, this.r * 0.8);
    } else {
      ctx.beginPath(); ctx.arc(0, 0, this.r * 0.6, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }
}

function burst(x, y, n) {
  for (let i = 0; i < n; i++) particles.push(new Confetto(x, y));
}

let runIdx = 0, running = false;
function doRun() {
  if (runIdx >= RUNS.length) { running = false; setTimeout(restart, 4000); return; }
  const run = RUNS[runIdx];
  const el = document.getElementById('run-' + run);
  if (el) { el.classList.add('done', 'active'); setTimeout(() => el.classList.remove('active'), 400); }
  document.getElementById('count').textContent = runIdx + 1;
  // Random position near the card
  const x = canvas.width * (0.2 + (runIdx % 3) / 3 * 0.6);
  const y = canvas.height * 0.4;
  burst(x, y, 60);
  runIdx++;
  setTimeout(doRun, 600 + Math.random() * 400);
}

function restart() {
  runIdx = 0; particles.length = 0; running = false;
  RUNS.forEach(r => {
    const el = document.getElementById('run-' + r);
    if (el) el.classList.remove('done');
  });
  document.getElementById('count').textContent = 0;
  running = true; setTimeout(doRun, 500);
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update(); particles[i].draw();
    if (particles[i].life <= 0 || particles[i].y > canvas.height + 50) particles.splice(i, 1);
  }
  requestAnimationFrame(loop);
}
loop();
restart();
</script>
</body>
</html>`;
}
