import { nav } from '../shell.js';
import { ALL_RUNS, SCORES } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>050 – Fireworks Show — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000510;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;overflow:hidden}
canvas{display:block;width:100%;height:100%;position:fixed;top:0;left:0;pointer-events:none}
.overlay{position:relative;z-index:1;text-align:center;color:#fff;font-family:monospace}
h1{font-size:1rem;letter-spacing:0.2em;color:#aaa;text-transform:uppercase;margin-bottom:8px}
.run-name{font-size:1.8rem;color:#fff;min-height:2rem;transition:all 0.3s}
.score{font-size:1rem;color:#ccc;margin-top:4px}
.progress{display:flex;gap:6px;justify-content:center;margin-top:12px;flex-wrap:wrap;max-width:360px}
.dot{width:14px;height:14px;border-radius:50%;background:#333;transition:all 0.4s}
.dot.done{background:#ffd700}
.status{font-size:0.9rem;color:#777;margin-top:8px}
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
${nav('050')}
<canvas id="c"></canvas>
<div class="overlay">
  <h1>050 — Fireworks Show</h1>
  <div class="run-name" id="runname">Starting…</div>
  <div class="score" id="runscore"></div>
  <div class="progress" id="dots"></div>
  <div class="status" id="status">18 experiment runs = 18 firework launches</div>
</div>
<script>
const RUNS = ${JSON.stringify(ALL_RUNS)};
const SCORES = ${JSON.stringify(SCORES)};
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W = window.innerWidth, H = window.innerHeight;
canvas.width = W; canvas.height = H;
window.addEventListener('resize', () => { W = window.innerWidth; H = window.innerHeight; canvas.width = W; canvas.height = H; });

const particles = [];

class Spark {
  constructor(x, y, vx, vy, col, life) {
    this.x = x; this.y = y; this.vx = vx; this.vy = vy;
    this.col = col; this.life = life; this.maxLife = life;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    this.vy += 0.06; this.vx *= 0.98; this.vy *= 0.98;
    this.life--;
  }
  draw() {
    const t = this.life / this.maxLife;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1.5 * t, 0, Math.PI * 2);
    ctx.fillStyle = this.col.replace('A', (t * 0.9).toFixed(2));
    ctx.fill();
  }
}

class Shell {
  constructor(x) {
    this.x = x;
    this.y = H;
    this.vy = -(12 + Math.random() * 8);
    this.targetY = H * 0.15 + Math.random() * H * 0.4;
    this.exploded = false;
    this.col = 'hsl(' + Math.floor(Math.random() * 360) + ',90%,70%)';
  }
  update() {
    if (this.exploded) return false;
    this.y += this.vy; this.vy += 0.15;
    if (this.y <= this.targetY || this.vy > 0) { this.explode(); return false; }
    return true;
  }
  explode() {
    this.exploded = true;
    const N = 80 + Math.random() * 60;
    for (let i = 0; i < N; i++) {
      const angle = (i / N) * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      const col = this.col.replace(')', ',A)').replace('hsl', 'hsla');
      particles.push(new Spark(this.x, this.y,
        Math.cos(angle) * speed + (Math.random() - 0.5) * 1.5,
        Math.sin(angle) * speed + (Math.random() - 0.5) * 1.5,
        col, 50 + Math.random() * 40
      ));
    }
    // Gold center burst
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      particles.push(new Spark(this.x, this.y,
        Math.cos(angle) * (1 + Math.random() * 2),
        Math.sin(angle) * (1 + Math.random() * 2),
        'hsla(50,100%,80%,A)', 30 + Math.random() * 20
      ));
    }
  }
  draw() {
    if (this.exploded) return;
    ctx.beginPath(); ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = this.col; ctx.fill();
    // Trail
    ctx.strokeStyle = this.col.replace('70%)', '70%,0.3)').replace('hsl', 'hsla').replace(',0.3)', ',0.3)');
    ctx.lineWidth = 1; ctx.beginPath();
    ctx.moveTo(this.x, this.y); ctx.lineTo(this.x, this.y - this.vy * 3); ctx.stroke();
  }
}

const shells = [];
let runIdx = -1;
const dotEls = RUNS.map((_, i) => {
  const d = document.createElement('div');
  d.className = 'dot';
  document.getElementById('dots').appendChild(d);
  return d;
});

function resetShow() {
  runIdx = -1;
  shells.length = 0; particles.length = 0;
  dotEls.forEach(d => d.classList.remove('done'));
  document.getElementById('runname').textContent = 'Starting…';
  document.getElementById('runscore').textContent = '';
  document.getElementById('status').textContent = '18 experiment runs = 18 firework launches';
  setTimeout(launchNext, 800);
}

function launchNext() {
  runIdx++;
  if (runIdx >= RUNS.length) {
    document.getElementById('runname').textContent = 'All 18 runs complete!';
    document.getElementById('runscore').textContent = 'The DOE experiment succeeded. Then everything went sideways.';
    document.getElementById('status').textContent = 'Line 3,637: spiral begins…';
    // Grand finale
    for (let i = 0; i < 6; i++) setTimeout(() => {
      shells.push(new Shell(W * 0.1 + Math.random() * W * 0.8));
    }, i * 200);
    // Auto-restart
    setTimeout(resetShow, 5000);
    return;
  }
  const run = RUNS[runIdx];
  const scores = SCORES[run];
  const composite = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
  document.getElementById('runname').textContent = run;
  document.getElementById('runscore').textContent = 'Composite score: ' + composite + ' / 10';
  dotEls[runIdx].classList.add('done');
  const x = W * 0.1 + Math.random() * W * 0.8;
  shells.push(new Shell(x));
  setTimeout(launchNext, 1200 + Math.random() * 800);
}

setTimeout(launchNext, 800);

function loop() {
  ctx.fillStyle = 'rgba(0,5,16,0.2)';
  ctx.fillRect(0, 0, W, H);

  for (let i = shells.length - 1; i >= 0; i--) {
    if (!shells[i].update()) shells.splice(i, 1);
    else shells[i].draw();
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update(); particles[i].draw();
    if (particles[i].life <= 0) particles.splice(i, 1);
  }
  requestAnimationFrame(loop);
}
loop();
</script>
</body>
</html>`;
}
