import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>043 – The Ignition Point — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;font-family:monospace}
canvas{display:block;max-width:100%}
.hud{font-size:0.65rem;color:#888;text-align:center;margin-top:8px;letter-spacing:0.1em}
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
${nav('043')}
<canvas id="c"></canvas>
<div class="hud" id="hud">Line 0 / 6805 — PRODUCTIVE PHASE</div>
<script>
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = Math.min(700, window.innerWidth - 40);
const H = 500;
canvas.width = W; canvas.height = H;

const cx = W / 2, cy = H / 2;
const TOTAL = 6805, SPIRAL = 3637;
let line = 0, exploded = false, explodeT = 0;
const particles = [];

class Particle {
  constructor(x, y, vx, vy, life, col, r) {
    this.x = x; this.y = y; this.vx = vx; this.vy = vy;
    this.life = life; this.maxLife = life;
    this.col = col; this.r = r || 2;
    this.gravity = 0.05 + Math.random() * 0.1;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= 0.98;
    this.life--;
  }
  draw() {
    const t = this.life / this.maxLife;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * t, 0, Math.PI * 2);
    ctx.fillStyle = this.col.replace('A', (t * 0.9).toFixed(2));
    ctx.fill();
  }
}

function explode() {
  exploded = true;
  // Core burst
  for (let i = 0; i < 400; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 12;
    const hue = 10 + Math.random() * 40;
    particles.push(new Particle(cx, cy,
      Math.cos(angle) * speed, Math.sin(angle) * speed - 3,
      40 + Math.random() * 80,
      'hsla(' + hue + ',100%,' + (60 + Math.random() * 40) + '%,A)',
      1 + Math.random() * 3
    ));
  }
  // Debris
  for (let i = 0; i < 80; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.5 + Math.random() * 5;
    particles.push(new Particle(cx, cy,
      Math.cos(angle) * speed, Math.sin(angle) * speed - 1,
      80 + Math.random() * 120,
      'hsla(0,0%,' + (60 + Math.random() * 40) + '%,A)',
      0.5 + Math.random() * 1.5
    ));
  }
}

// Ongoing ember particles in productive phase
function addEmbers() {
  if (line < SPIRAL) {
    const t = line / SPIRAL;
    const count = Math.floor(1 + t * 3);
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.5;
      particles.push(new Particle(
        cx + (Math.random() - 0.5) * 10,
        cy,
        Math.cos(angle) * (0.2 + Math.random() * 0.5),
        Math.sin(angle) * (0.5 + Math.random() * 1) - 0.5,
        30 + Math.random() * 30,
        'hsla(' + (30 + t * 30) + ',100%,70%,A)',
        0.5 + Math.random()
      ));
    }
  } else if (exploded) {
    // Post-explosion lingering sparks
    for (let i = 0; i < 5; i++) {
      const angle = Math.random() * Math.PI * 2;
      particles.push(new Particle(
        cx + (Math.random() - 0.5) * 60,
        cy + (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 2,
        -(Math.random() * 2),
        20 + Math.random() * 40,
        'hsla(' + (Math.random() * 60) + ',100%,70%,A)',
        0.5 + Math.random()
      ));
    }
  }
}

function drawFuse() {
  const t = Math.min(1, line / SPIRAL);
  // Draw fuse line
  ctx.strokeStyle = 'rgba(255,200,80,0.85)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - 200, cy + 80);
  ctx.bezierCurveTo(cx - 100, cy + 80, cx - 50, cy + 40, cx, cy);
  ctx.stroke();
  // Burning dot
  const fuseT = t;
  const bx = cx - 200 + fuseT * 200;
  const by = cy + 80 - fuseT * 80;
  ctx.beginPath();
  ctx.arc(bx, by, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  // Spark
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(bx, by,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2 - 0.5,
      10, 'hsla(50,100%,80%,A)', 1
    ));
  }
  // Label
  ctx.font = '11px monospace';
  ctx.fillStyle = 'rgba(255,200,80,0.8)';
  ctx.textAlign = 'center';
  ctx.fillText('line ' + Math.round(line) + ' / ' + SPIRAL + ' → IGNITION', cx, cy + 110);
}

function drawBomb() {
  if (exploded) return;
  const t = line / SPIRAL;
  // Bomb body
  const grd = ctx.createRadialGradient(cx - 8, cy - 8, 2, cx, cy, 28);
  grd.addColorStop(0, 'rgba(80,80,80,0.9)');
  grd.addColorStop(1, 'rgba(30,30,30,0.9)');
  ctx.beginPath();
  ctx.arc(cx, cy, 28, 0, Math.PI * 2);
  ctx.fillStyle = grd;
  ctx.fill();
  ctx.strokeStyle = 'rgba(100,100,100,0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();
  // Glow as it heats
  ctx.beginPath();
  ctx.arc(cx, cy, 28 + t * 8, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,' + Math.round(100 + t * 155) + ',0,' + (t * 0.6) + ')';
  ctx.lineWidth = 4;
  ctx.stroke();
  // "3637" text
  ctx.font = 'bold 11px monospace';
  ctx.fillStyle = 'rgba(255,200,100,0.8)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('3,637', cx, cy);
}

let started = false;
let restartPending = false;
canvas.addEventListener('click', () => {
  if (!started) { started = true; }
  else if (exploded && particles.length < 20) { resetAll(); }
});
// Auto-start immediately
setTimeout(() => { started = true; }, 200);

function resetAll() {
  line = 0; exploded = false; explodeT = 0;
  particles.length = 0; restartPending = false;
}

let lastTime = 0;
function loop(now) {
  const dt = Math.min(50, now - lastTime);
  lastTime = now;

  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, W, H);

  if (started && line < SPIRAL) {
    line += dt * 2;
    if (line >= SPIRAL && !exploded) explode();
  } else if (exploded) {
    explodeT++;
  }

  addEmbers();

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].life <= 0) particles.splice(i, 1);
  }

  if (!exploded) { drawFuse(); drawBomb(); }

  // HUD
  const phase = line < 3501 ? 'PRODUCTIVE' : line < SPIRAL ? 'DRIFT' : 'SPIRAL';
  document.getElementById('hud').textContent = 'Line ' + Math.min(TOTAL, Math.round(line)) + ' / ' + TOTAL + ' — ' + phase + (exploded ? ' — IGNITED AT LINE 3,637' : '');

  // Auto-restart after explosion — don't wait for particles.length; just use timer
  if (exploded && explodeT > 240 && !restartPending) {
    restartPending = true;
    setTimeout(resetAll, 800);
  }

  if (!started) {
    ctx.font = '16px monospace'; ctx.fillStyle = 'rgba(255,200,80,0.9)'; ctx.textAlign = 'center';
    ctx.fillText('click to light the fuse', cx, cy + 150);
  } else if (exploded && particles.length < 10) {
    ctx.font = '14px monospace'; ctx.fillStyle = 'rgba(255,200,80,0.5)'; ctx.textAlign = 'center';
    ctx.fillText('replaying...', cx, cy);
  }

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
