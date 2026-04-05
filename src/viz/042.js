import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>042 – The Done Bubble Machine — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px;font-family:monospace}
h1{font-size:1.1rem;color:#888;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:4px;text-align:center}
canvas{display:block;max-width:100%}
.info{font-size:0.9rem;color:#666;text-align:center;margin-top:8px}
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
${nav('042')}
<h1>042 — The Done Bubble Machine</h1>
<canvas id="c"></canvas>
<div class="info">344 "Done"s · each bubble = one utterance · click to pop</div>
<script>
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = Math.min(window.innerWidth - 20, 960);
const H = Math.max(500, window.innerHeight - 200);
canvas.width = W; canvas.height = H;

const TOTAL_DONE = 344;
const bubbles = [];
let popped = 0;

class Bubble {
  constructor(i) {
    this.r = 8 + Math.random() * 18;
    this.x = this.r + Math.random() * (W - this.r * 2);
    this.y = H + this.r;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = -(0.5 + Math.random() * 1.2);
    this.hue = 180 + Math.random() * 60;
    this.alpha = 0.7 + Math.random() * 0.3;
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = 0.02 + Math.random() * 0.03;
    this.alive = true;
    this.popping = false;
    this.popFrame = 0;
    this.label = i < 344 ? 'Done' : '?';
  }

  update() {
    if (this.popping) { this.popFrame++; if (this.popFrame > 8) this.alive = false; return; }
    this.wobble += this.wobbleSpeed;
    this.x += this.vx + Math.sin(this.wobble) * 0.3;
    this.vy -= 0.001; // slight acceleration upward
    this.y += this.vy;
    if (this.x < this.r || this.x > W - this.r) this.vx *= -1;
    if (this.y < -this.r * 2) { this.alive = false; }
  }

  draw(ctx) {
    if (!this.alive) return;
    if (this.popping) {
      // Pop animation
      const t = this.popFrame / 8;
      ctx.strokeStyle = 'rgba(255,255,255,' + (1 - t) + ')';
      ctx.lineWidth = 1;
      for (let a = 0; a < 6; a++) {
        const angle = a / 6 * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(this.x + Math.cos(angle) * this.r * t * 2, this.y + Math.sin(angle) * this.r * t * 2);
        ctx.lineTo(this.x + Math.cos(angle) * this.r * (t * 2 + 0.5), this.y + Math.sin(angle) * this.r * (t * 2 + 0.5));
        ctx.stroke();
      }
      return;
    }
    ctx.save();
    // Iridescent bubble
    const grad = ctx.createRadialGradient(this.x - this.r * 0.3, this.y - this.r * 0.3, 1, this.x, this.y, this.r);
    grad.addColorStop(0, 'hsla(' + (this.hue + 60) + ',80%,95%,0.9)');
    grad.addColorStop(0.4, 'hsla(' + this.hue + ',70%,70%,' + (this.alpha * 0.4) + ')');
    grad.addColorStop(1, 'hsla(' + (this.hue - 30) + ',90%,40%,' + (this.alpha * 0.6) + ')');
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = 'hsla(' + this.hue + ',60%,80%,0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();
    // Shine
    ctx.beginPath();
    ctx.arc(this.x - this.r * 0.3, this.y - this.r * 0.3, this.r * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fill();
    // Label
    ctx.font = Math.max(8, this.r * 0.6) + 'px monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.label, this.x, this.y);
    ctx.restore();
  }

  hitTest(mx, my) {
    return Math.hypot(mx - this.x, my - this.y) < this.r;
  }
}

let spawned = 0;
function spawnBubble() {
  if (spawned < TOTAL_DONE) {
    bubbles.push(new Bubble(spawned));
    spawned++;
    setTimeout(spawnBubble, 150 + Math.random() * 200);
  } else {
    // Auto-restart when all bubbles have floated away
    setTimeout(() => { spawned = 0; popped = 0; spawnBubble(); }, 3000);
  }
}
spawnBubble();

// Mousemove: pop bubble under cursor
canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) / rect.width * W;
  const my = (e.clientY - rect.top) / rect.height * H;
  for (const b of bubbles) {
    if (b.alive && !b.popping && b.hitTest(mx, my)) {
      b.popping = true; popped++; break;
    }
  }
});

canvas.addEventListener('click', function(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) / rect.width * W;
  const my = (e.clientY - rect.top) / rect.height * H;
  for (const b of bubbles) {
    if (b.alive && !b.popping && b.hitTest(mx, my)) {
      b.popping = true;
      popped++;
      break;
    }
  }
});

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(0, 0, W, H);

  for (const b of bubbles) { b.update(); b.draw(ctx); }
  // Remove dead
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (!bubbles[i].alive) bubbles.splice(i, 1);
  }

  ctx.font = '10px monospace';
  ctx.fillStyle = '#444';
  ctx.textAlign = 'left';
  ctx.fillText('Floating: ' + bubbles.filter(b=>b.alive&&!b.popping).length + ' / Popped: ' + popped + ' / Total: ' + spawned, 8, H - 8);

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
