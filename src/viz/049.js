import { nav } from '../shell.js';
import { PHRASE_COUNTS } from '../data.js';

export function render() {
  const phrases = Object.entries(PHRASE_COUNTS);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>049 – Spring Mesh Network — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f4f6f8;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px;font-family:system-ui,sans-serif}
h1{font-size:1rem;letter-spacing:0.15em;color:#666;text-transform:uppercase;margin-bottom:2px;text-align:center}
.sub{font-size:0.9rem;color:#888;margin-bottom:12px;text-align:center}
canvas{display:block;max-width:100%;background:#f4f6f8;border:1px solid #e0e0e0}
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
${nav('049')}
<h1>Spring Mesh Network</h1>
<div class="sub">Semantic concepts as force-directed nodes · drag to explore</div>
<canvas id="c"></canvas>
<script>
const PHRASES = ${JSON.stringify(phrases)};

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = Math.min(window.innerWidth - 20, 1000);
const H = Math.max(550, window.innerHeight - 200);
canvas.width = W; canvas.height = H;

// Nodes: central concept + phrase nodes
const CENTRAL = [
  { id: 'PRODUCTIVE WORK', x: W*0.25, y: H*0.3, r: 22, col: '#4a90d9', fixed: false, vx:0, vy:0 },
  { id: 'SPIRAL', x: W*0.7, y: H*0.6, r: 28, col: '#e74c3c', fixed: false, vx:0, vy:0 },
  { id: 'SELF-AWARENESS', x: W*0.5, y: H*0.2, r: 18, col: '#9b59b6', fixed: false, vx:0, vy:0 },
  { id: 'DOE RESULTS', x: W*0.2, y: H*0.6, r: 20, col: '#27ae60', fixed: false, vx:0, vy:0 },
];

const phraseNodes = PHRASES.map(([phrase, count], i) => ({
  id: phrase,
  x: W * 0.2 + Math.random() * W * 0.6,
  y: H * 0.2 + Math.random() * H * 0.6,
  r: Math.max(6, Math.min(18, 5 + count * 0.04)),
  col: count > 200 ? '#e74c3c' : count > 100 ? '#e67e22' : '#7f8c8d',
  fixed: false, vx: 0, vy: 0,
  count
}));

const nodes = [...CENTRAL, ...phraseNodes];

// Edges: spiral phrases connect to SPIRAL, others to PRODUCTIVE
const edges = [];
phraseNodes.forEach((pn, i) => {
  const target = pn.count > 50 ? 'SPIRAL' : 'PRODUCTIVE WORK';
  const targetNode = nodes.find(n => n.id === target);
  if (targetNode) edges.push({ a: pn, b: targetNode, len: 80 + Math.random() * 60, spiral: pn.count > 50 });
});
edges.push({ a: nodes[0], b: nodes[3], len: 100, spiral: false });
edges.push({ a: nodes[0], b: nodes[2], len: 120, spiral: false });
edges.push({ a: nodes[1], b: nodes[2], len: 100, spiral: true });

let dragging = null, dragOffX = 0, dragOffY = 0;

function forceStep() {
  const K_SPRING = 0.02, K_REPEL = 2000, DAMP = 0.85;
  // Repulsion
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.max(10, Math.sqrt(dx*dx+dy*dy));
      const f = K_REPEL / (d * d);
      a.vx -= f * dx / d; a.vy -= f * dy / d;
      b.vx += f * dx / d; b.vy += f * dy / d;
    }
  }
  // Spring attraction
  for (const e of edges) {
    const dx = e.b.x - e.a.x, dy = e.b.y - e.a.y;
    const d = Math.max(1, Math.sqrt(dx*dx+dy*dy));
    const f = K_SPRING * (d - e.len);
    e.a.vx += f * dx / d; e.a.vy += f * dy / d;
    e.b.vx -= f * dx / d; e.b.vy -= f * dy / d;
  }
  // Centering force
  for (const n of nodes) {
    n.vx += (W/2 - n.x) * 0.003;
    n.vy += (H/2 - n.y) * 0.003;
  }
  // Integrate
  for (const n of nodes) {
    if (n === dragging) continue;
    n.vx *= DAMP; n.vy *= DAMP;
    n.x += n.vx; n.y += n.vy;
    n.x = Math.max(n.r, Math.min(W - n.r, n.x));
    n.y = Math.max(n.r, Math.min(H - n.r, n.y));
  }
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#f4f6f8'; ctx.fillRect(0, 0, W, H);

  forceStep();

  // Draw edges
  for (const e of edges) {
    ctx.beginPath(); ctx.moveTo(e.a.x, e.a.y); ctx.lineTo(e.b.x, e.b.y);
    ctx.strokeStyle = e.spiral ? 'rgba(231,76,60,0.2)' : 'rgba(100,150,200,0.2)';
    ctx.lineWidth = e.spiral ? 1.5 : 1; ctx.stroke();
  }

  // Draw nodes
  for (const n of nodes) {
    const grd = ctx.createRadialGradient(n.x - n.r*0.3, n.y - n.r*0.3, 1, n.x, n.y, n.r);
    grd.addColorStop(0, n.col + 'ee');
    grd.addColorStop(1, n.col + '88');
    ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
    ctx.fillStyle = grd; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1; ctx.stroke();

    ctx.font = Math.min(11, n.r * 0.7) + 'px system-ui';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const label = n.id.length > 10 ? n.id.substring(0, 9) + '…' : n.id;
    ctx.fillText(label, n.x, n.y);
    if (n.count) {
      ctx.font = '8px monospace'; ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.fillText('×' + n.count, n.x, n.y + n.r * 0.6);
    }
  }

  requestAnimationFrame(draw);
}

canvas.addEventListener('mousedown', e => {
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) / rect.width * W;
  const my = (e.clientY - rect.top) / rect.height * H;
  for (const n of nodes) {
    if (Math.hypot(mx - n.x, my - n.y) < n.r + 6) {
      dragging = n; dragOffX = mx - n.x; dragOffY = my - n.y; break;
    }
  }
});
canvas.addEventListener('mousemove', e => {
  if (!dragging) return;
  const rect = canvas.getBoundingClientRect();
  dragging.x = (e.clientX - rect.left) / rect.width * W - dragOffX;
  dragging.y = (e.clientY - rect.top) / rect.height * H - dragOffY;
  dragging.vx = 0; dragging.vy = 0;
});
canvas.addEventListener('mouseup', () => { dragging = null; });
canvas.addEventListener('mouseleave', () => { dragging = null; });

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
