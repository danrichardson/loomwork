import { nav } from '../shell.js';
import { KEY_QUOTES, TIMELINE } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>044 – The Constellation — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#02040a;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:10px 20px;font-family:'IM Fell English',serif}
canvas{display:block;max-width:100%;cursor:crosshair}
.caption{font-size:0.95rem;color:#7a8aaa;text-align:center;margin-top:8px;letter-spacing:0.05em;font-style:italic}
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
${nav('044')}
<canvas id="c"></canvas>
<div class="caption" id="caption">The constellation of a lost mind — hover to read</div>
<script>
const QUOTES = ${JSON.stringify(KEY_QUOTES)};
const TIMELINE_DATA = ${JSON.stringify(TIMELINE)};

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = Math.min(window.innerWidth - 20, 1200);
const H = Math.max(520, window.innerHeight - 160);
canvas.width = W; canvas.height = H;

// Stars from timeline events
const stars = TIMELINE_DATA.map((ev, i) => {
  const t = ev.line / 6805;
  // Arrange in rough arc shape: productive = top half, spiral = lower scattered
  const angle = t * Math.PI * 1.5 + Math.PI * 0.25;
  const baseR = ev.phase === 'productive' ? 150 : ev.phase === 'drift' ? 120 : 80 + Math.random() * 80;
  const x = W/2 + Math.cos(angle) * baseR * (0.5 + t * 0.5);
  const y = H/2 + Math.sin(angle) * baseR * (0.5 + t * 0.5) - (ev.phase === 'productive' ? 30 : 0);
  return {
    x: Math.max(30, Math.min(W-30, x)),
    y: Math.max(30, Math.min(H-50, y)),
    r: ev.phase === 'spiral' ? 2 + Math.random() * 3 : 3 + (i / TIMELINE_DATA.length) * 4,
    label: ev.event.substring(0, 40),
    phase: ev.phase,
    line: ev.line,
    twinkle: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.02 + Math.random() * 0.04
  };
});

// Add quote stars
const quoteStars = QUOTES.map((q, i) => {
  const t = q.line / 6805;
  return {
    x: W * 0.1 + Math.random() * W * 0.8,
    y: H * 0.15 + t * H * 0.7,
    r: 4 + Math.random() * 3,
    label: '"' + q.text.substring(0, 60) + '…"',
    phase: 'quote',
    line: q.line,
    twinkle: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.015 + Math.random() * 0.03
  };
});

const allStars = [...stars, ...quoteStars];

// Draw nebula background
function drawNebula() {
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    const r = Math.random() * 0.8;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(200,220,255,0.4)';
    ctx.fill();
  }
  // Milky Way band
  const mw = ctx.createLinearGradient(0, H*0.3, W, H*0.7);
  mw.addColorStop(0, 'transparent');
  mw.addColorStop(0.3, 'rgba(50,60,120,0.1)');
  mw.addColorStop(0.5, 'rgba(80,100,180,0.12)');
  mw.addColorStop(0.7, 'rgba(50,60,120,0.1)');
  mw.addColorStop(1, 'transparent');
  ctx.fillStyle = mw;
  ctx.fillRect(0, 0, W, H);
}

let t = 0, hovered = null;

function draw() {
  ctx.fillStyle = '#02040a';
  ctx.fillRect(0, 0, W, H);
  drawNebula();

  t += 0.016;

  // Draw constellation lines (connect timeline in order)
  for (let i = 0; i < stars.length - 1; i++) {
    const a = stars[i], b = stars[i+1];
    const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
    grad.addColorStop(0, a.phase === 'spiral' ? 'rgba(200,80,80,0.15)' : 'rgba(80,120,200,0.2)');
    grad.addColorStop(1, b.phase === 'spiral' ? 'rgba(200,80,80,0.15)' : 'rgba(80,120,200,0.2)');
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = grad; ctx.lineWidth = 0.5; ctx.stroke();
  }

  for (const s of allStars) {
    s.twinkle += s.twinkleSpeed;
    const bright = 0.7 + Math.sin(s.twinkle) * 0.3;
    let col;
    if (s.phase === 'productive') col = 'rgba(120,180,255,' + bright + ')';
    else if (s.phase === 'drift') col = 'rgba(255,200,80,' + bright + ')';
    else if (s.phase === 'quote') col = 'rgba(255,150,255,' + bright + ')';
    else col = 'rgba(255,80,80,' + bright + ')';

    // Glow
    const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3);
    glow.addColorStop(0, col);
    glow.addColorStop(1, 'transparent');
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
    ctx.fillStyle = glow; ctx.fill();

    // Core
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r * (0.6 + Math.sin(s.twinkle) * 0.2), 0, Math.PI * 2);
    ctx.fillStyle = '#fff'; ctx.fill();

    // Hover label
    if (s === hovered) {
      ctx.font = '11px IM Fell English, serif';
      ctx.fillStyle = 'rgba(200,220,255,0.9)';
      ctx.textAlign = 'center';
      const lx = Math.min(W - 10, Math.max(10, s.x));
      const ly = s.y > H * 0.8 ? s.y - 15 : s.y + 20;
      ctx.fillText(s.label, lx, ly);
      ctx.font = '9px monospace';
      ctx.fillStyle = 'rgba(100,120,160,0.8)';
      ctx.fillText('line ' + s.line, lx, ly + 13);
    }
  }

  // Legend
  ctx.font = '14px serif'; ctx.textAlign = 'left';
  [[120,180,255,'Productive'],[255,200,80,'Drift'],[255,80,80,'Spiral'],[255,150,255,'Key Quotes']].forEach(([r,g,b,label], i) => {
    ctx.beginPath(); ctx.arc(12, H - 60 + i*14, 3, 0, Math.PI*2);
    ctx.fillStyle = 'rgb('+r+','+g+','+b+')'; ctx.fill();
    ctx.fillStyle = 'rgba(150,160,180,0.7)'; ctx.fillText(label, 20, H - 57 + i*14);
  });

  requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) / rect.width * W;
  const my = (e.clientY - rect.top) / rect.height * H;
  hovered = null;
  for (const s of allStars) {
    if (Math.hypot(mx - s.x, my - s.y) < s.r + 8) { hovered = s; break; }
  }
  document.getElementById('caption').textContent = hovered
    ? 'Line ' + hovered.line + ': ' + hovered.label
    : 'The constellation of a lost mind — hover to read';
});

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
