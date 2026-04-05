import { nav } from '../shell.js';
import { PHRASE_COUNTS } from '../data.js';

export function render() {
  const words = Object.entries(PHRASE_COUNTS)
    .sort((a, b) => b[1] - a[1])
    .map(([w, c]) => ({ w, c }));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>041 – Word Gravity — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#1a1a1a;font-family:'Caveat',cursive;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px}
h1{font-size:1.3rem;color:#ccc;margin-bottom:4px;text-align:center;letter-spacing:0.1em}
canvas{display:block;max-width:100%;border:1px solid #2a2a2a}
.lbl{font-size:0.9rem;color:#777;text-align:center;margin-top:8px;font-family:monospace}
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
${nav('041')}
<h1>Word Gravity</h1>
<canvas id="c"></canvas>
<div class="lbl">Words fall by frequency · Matter.js physics</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"></script>
<script>
const WORDS = ${JSON.stringify(words)};
const { Engine, Render, Runner, Bodies, Body, Composite, Events } = Matter;

const W = Math.min(window.innerWidth - 20, 960);
const H = Math.max(500, window.innerHeight - 200);
const canvas = document.getElementById('c');
canvas.width = W; canvas.height = H;

const engine = Engine.create({ gravity: { y: 1.2 } });
const world = engine.world;

// Ground + walls
const ground = Bodies.rectangle(W/2, H+25, W+200, 50, { isStatic: true });
const wallL = Bodies.rectangle(-25, H/2, 50, H+200, { isStatic: true });
const wallR = Bodies.rectangle(W+25, H/2, 50, H+200, { isStatic: true });
Composite.add(world, [ground, wallL, wallR]);

const colors = ['#ff6b6b','#ffa94d','#ffd43b','#a9e34b','#63e6be','#74c0fc','#da77f2','#f783ac'];
const bodies = [];

function makeWord(item, idx) {
  const size = Math.max(14, Math.min(52, 12 + item.c * 0.12));
  const x = W * 0.1 + Math.random() * W * 0.8;
  const y = -60 - idx * 30;
  // Use a rectangle as a proxy body
  const textWidth = item.w.length * size * 0.55;
  const textHeight = size * 1.2;
  const body = Bodies.rectangle(x, y, textWidth, textHeight, {
    restitution: 0.3,
    friction: 0.8,
    frictionAir: 0.02,
    label: item.w,
    render: { visible: false }
  });
  body._size = size;
  body._text = item.w + ' ×' + item.c;
  body._col = colors[idx % colors.length];
  Composite.add(world, body);
  bodies.push(body);
}

let wordTimeout = null;
function launchWords() {
  WORDS.forEach((item, i) => {
    wordTimeout = setTimeout(() => makeWord(item, i), i * 150);
  });
  // Auto-restart after all words settle
  setTimeout(() => {
    // Remove all phrase bodies and re-launch
    bodies.forEach(b => Composite.remove(world, b));
    bodies.length = 0;
    launchWords();
  }, WORDS.length * 150 + 8000);
}
launchWords();

const ctx = canvas.getContext('2d');
const runner = Runner.create();
Runner.run(runner, engine);

function draw() {
  ctx.clearRect(0, 0, W, H);
  // Chalk-board background
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, W, H);

  // Draw bodies
  for (const b of bodies) {
    if (b.position.y > H + 100) continue;
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(b.angle);
    ctx.font = b._size + 'px Caveat, cursive';
    ctx.fillStyle = b._col;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(b._text, 0, 0);
    ctx.restore();
  }

  // Ground line (chalk)
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, H - 1); ctx.lineTo(W, H - 1); ctx.stroke();

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
