import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>045 – The Wrecking Ball — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#2a2a2a;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px;font-family:monospace}
h1{font-size:0.7rem;color:#ff8c00;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:4px;text-align:center}
canvas{display:block;max-width:100%;border:1px solid #333}
.info{font-size:0.6rem;color:#666;text-align:center;margin-top:8px}
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
${nav('045')}
<h1>045 — The Wrecking Ball</h1>
<canvas id="c"></canvas>
<div class="info" id="info">Wrecking ball = line 3,637 · click to swing</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"></script>
<script>
const { Engine, Render, Runner, Bodies, Body, Composite, Constraint, Events, Mouse, MouseConstraint } = Matter;

const W = Math.min(700, window.innerWidth - 40);
const H = 480;
const canvas = document.getElementById('c');
canvas.width = W; canvas.height = H;
const ctx = canvas.getContext('2d');

const engine = Engine.create({ gravity: { y: 1.5 } });
const world = engine.world;

// Ground and walls
const ground = Bodies.rectangle(W/2, H+25, W+200, 50, { isStatic: true, label: 'ground' });
const wallL = Bodies.rectangle(-25, H/2, 50, H+200, { isStatic: true });
const wallR = Bodies.rectangle(W+25, H/2, 50, H+200, { isStatic: true });
Composite.add(world, [ground, wallL, wallR]);

// Progress bars (stacked bricks representing phases)
const bricks = [];
const PHASES = [
  { label: 'Phase 1: Productive Work', count: 14, col: '#4a90d9', y: H - 60 },
  { label: 'Phase 2: Drift', count: 2, col: '#f5a623', y: H - 60 },
  { label: 'Phase 3: Spiral', count: 12, col: '#d0021b', y: H - 60 },
];

let bx = 40;
PHASES.forEach((ph, pi) => {
  for (let i = 0; i < ph.count; i++) {
    const brickW = (W - 100) / 28;
    const brickH = 30;
    const brick = Bodies.rectangle(bx + brickW/2, H - brickH/2 - 20, brickW - 2, brickH - 2, {
      restitution: 0.3,
      friction: 0.5,
      label: ph.label,
      render: { visible: false }
    });
    brick._col = ph.col;
    brick._label = pi === 0 && i === 0 ? 'DONE ×344' : pi === 2 && i === ph.count-1 ? 'SPIRAL' : ph.label.substring(0, 8);
    bricks.push(brick);
    bx += brickW;
  }
  bx += 6; // gap between phases
});
Composite.add(world, bricks);

// Wrecking ball on rope
const pivotX = W * 0.15, pivotY = 60;
const ball = Bodies.circle(pivotX - 80, pivotY + 180, 28, {
  restitution: 0.5,
  friction: 0.1,
  frictionAir: 0.005,
  label: 'ball'
});
const rope = Constraint.create({
  pointA: { x: pivotX, y: pivotY },
  bodyB: ball,
  length: 180,
  stiffness: 0.9
});
Composite.add(world, [ball, rope]);

let swung = false;
canvas.addEventListener('click', function() {
  if (!swung) {
    Body.setVelocity(ball, { x: 12, y: -2 });
    swung = true;
    document.getElementById('info').textContent = 'Line 3,637: SPIRAL DETECTED — impact imminent';
  }
});

const runner = Runner.create();
Runner.run(runner, engine);

function draw() {
  ctx.fillStyle = '#2a2a2a';
  ctx.fillRect(0, 0, W, H);

  // Ground
  ctx.fillStyle = '#3a3a3a';
  ctx.fillRect(0, H - 20, W, 20);

  // Draw bricks
  for (const b of bricks) {
    const v = b.vertices;
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(b.angle);
    const bw = Math.abs(v[0].x - v[2].x);
    const bh = Math.abs(v[0].y - v[2].y);
    ctx.fillStyle = b._col;
    ctx.fillRect(-bw/2, -bh/2, bw, bh);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '7px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (bw > 16) ctx.fillText(b._label, 0, 0);
    ctx.restore();
  }

  // Rope
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pivotX, pivotY);
  ctx.lineTo(ball.position.x, ball.position.y);
  ctx.stroke();
  // Pivot
  ctx.beginPath(); ctx.arc(pivotX, pivotY, 6, 0, Math.PI*2);
  ctx.fillStyle = '#666'; ctx.fill();

  // Ball
  const ballGrad = ctx.createRadialGradient(ball.position.x - 8, ball.position.y - 8, 2, ball.position.x, ball.position.y, 28);
  ballGrad.addColorStop(0, '#888');
  ballGrad.addColorStop(1, '#222');
  ctx.beginPath(); ctx.arc(ball.position.x, ball.position.y, 28, 0, Math.PI*2);
  ctx.fillStyle = ballGrad; ctx.fill();
  ctx.strokeStyle = '#aaa'; ctx.lineWidth = 2; ctx.stroke();
  ctx.font = 'bold 9px monospace'; ctx.fillStyle = '#ff8c00';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('3637', ball.position.x, ball.position.y);

  if (!swung) {
    ctx.font = '13px monospace'; ctx.fillStyle = 'rgba(255,140,0,0.8)';
    ctx.textAlign = 'center';
    ctx.fillText('click to swing', W/2, 40);
  }

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
