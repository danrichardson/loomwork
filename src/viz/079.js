import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>079 – The Citation Graph — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0d1117;color:#c9d1d9;font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px;padding-top:52px}
h1{font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:#555;margin-bottom:4px;text-align:center}
canvas{display:block;max-width:100%;cursor:grab}
.tooltip{position:fixed;background:#161b22;border:1px solid #30363d;padding:8px 12px;font-size:0.7rem;color:#c9d1d9;pointer-events:none;max-width:260px;line-height:1.6;z-index:100;display:none}
.legend{display:flex;gap:12px;justify-content:center;margin-top:8px;font-size:0.6rem;flex-wrap:wrap}
.leg{display:flex;align-items:center;gap:4px}
.leg-dot{width:8px;height:8px;border-radius:50%}
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
${nav('079')}
<h1>Citation Graph: Papers that explain what happened</h1>
<canvas id="c"></canvas>
<div class="tooltip" id="tooltip"></div>
<div class="legend">
  <div class="leg"><div class="leg-dot" style="background:#f9826c"></div><span>Entropy/Information</span></div>
  <div class="leg"><div class="leg-dot" style="background:#79c0ff"></div><span>Repetition/Degeneration</span></div>
  <div class="leg"><div class="leg-dot" style="background:#56d364"></div><span>Chaos/Complexity</span></div>
  <div class="leg"><div class="leg-dot" style="background:#d2a8ff"></div><span>Psychology</span></div>
  <div class="leg"><div class="leg-dot" style="background:#ffa657"></div><span>Traffic/Dynamics</span></div>
</div>
<script>
const W = Math.min(700, window.innerWidth - 40);
const H = 480;
const canvas = document.getElementById('c');
canvas.width = W; canvas.height = H;
const ctx = canvas.getContext('2d');

const papers = [
  { id: 'SESSION', label: 'the-entire-mess.md', sub: '6,805 lines · 2025', x: W/2, y: H/2, r: 22, col: '#ff6b6b', cat: 'central', desc: 'The source document. 3×3 DOE experiment, then 3,169-line degenerate loop.' },
  { id: 'ERGO25', label: 'ERGO (2025)', sub: 'arXiv:2510.14077', x: W*0.2, y: H*0.25, r: 14, col: '#f9826c', cat: 'entropy', desc: '"Entropy as a Signal of Language Model Incoherence" — entropy spike predicts breakdown.' },
  { id: 'BRAV20', label: 'Braverman et al. (2020)', sub: 'NeurIPS 2020', x: W*0.15, y: H*0.55, r: 13, col: '#f9826c', cat: 'entropy', desc: '"Calibration, Entropy Rates, and Memory in LMs" — baseline entropy characterization.' },
  { id: 'SHANNON48', label: 'Shannon (1948)', sub: 'Bell System', x: W*0.1, y: H*0.8, r: 10, col: '#f9826c', cat: 'entropy', desc: '"A Mathematical Theory of Communication" — foundations of information entropy.' },
  { id: 'APPLE24', label: 'Apple ML (2024)', sub: 'Repetition Loop', x: W*0.75, y: H*0.2, r: 16, col: '#79c0ff', cat: 'repetition', desc: '"Learning to Break the Loop: Repetition Control" — self-reinforcing repetition in LLMs.' },
  { id: 'HOLTZ19', label: 'Holtzman et al. (2019)', sub: 'ICLR 2020', x: W*0.85, y: H*0.4, r: 14, col: '#79c0ff', cat: 'repetition', desc: '"The Curious Case of Neural Text Degeneration" — nucleus sampling vs repetition.' },
  { id: 'LORENZ63', label: 'Lorenz (1963)', sub: 'J. Atmospheric Sci.', x: W*0.3, y: H*0.1, r: 14, col: '#56d364', cat: 'chaos', desc: '"Deterministic Nonperiodic Flow" — sensitive dependence, strange attractor, chaos theory.' },
  { id: 'NS92', label: 'Nagel-Schreck. (1992)', sub: 'traffic CA model', x: W*0.7, y: H*0.8, r: 12, col: '#ffa657', cat: 'traffic', desc: '"A cellular automaton model for freeway traffic" — phantom jam emergence without external cause.' },
  { id: 'VANKOLK89', label: 'van der Kolk (1989)', sub: 'PubMed:2664732', x: W*0.8, y: H*0.65, r: 12, col: '#d2a8ff', cat: 'psych', desc: '"The compulsion to repeat the trauma" — repetition compulsion in PTSD, applied to AI.' },
  { id: 'FREUD20', label: 'Freud (1920)', sub: 'Pleasure Principle', x: W*0.88, y: H*0.85, r: 10, col: '#d2a8ff', cat: 'psych', desc: '"Beyond the Pleasure Principle" — Wiederholungszwang, repetition compulsion framework.' },
  { id: 'LOTKA25', label: 'Lotka (1925)', sub: 'predator-prey', x: W*0.2, y: H*0.85, r: 9, col: '#56d364', cat: 'chaos', desc: '"Elements of Physical Biology" — Lotka-Volterra dynamics, productivity vs repetition.' },
];

const edges = [
  ['SESSION','ERGO25'],['SESSION','APPLE24'],['SESSION','LORENZ63'],['SESSION','NS92'],['SESSION','VANKOLK89'],
  ['ERGO25','BRAV20'],['ERGO25','SHANNON48'],['BRAV20','SHANNON48'],
  ['APPLE24','HOLTZ19'],
  ['VANKOLK89','FREUD20'],
  ['LORENZ63','NS92'],['LORENZ63','LOTKA25'],
];

// Force layout
let t = 0;
function forceStep() {
  const K = 0.02, REP = 8000, DAMP = 0.85;
  for (let i = 0; i < papers.length; i++) {
    for (let j = i+1; j < papers.length; j++) {
      const a = papers[i], b = papers[j];
      if (a.id === 'SESSION' || b.id === 'SESSION') continue;
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.max(10, Math.sqrt(dx*dx+dy*dy));
      const f = REP / (d*d);
      if (!a.vx) a.vx = 0; if (!a.vy) a.vy = 0;
      if (!b.vx) b.vx = 0; if (!b.vy) b.vy = 0;
      a.vx -= f*dx/d; a.vy -= f*dy/d;
      b.vx += f*dx/d; b.vy += f*dy/d;
    }
  }
  edges.forEach(([aid, bid]) => {
    const a = papers.find(p=>p.id===aid), b = papers.find(p=>p.id===bid);
    if (!a||!b) return;
    const dx = b.x-a.x, dy = b.y-a.y;
    const d = Math.max(1, Math.sqrt(dx*dx+dy*dy));
    const target = (a.r+b.r)*2.5;
    const f = K*(d-target);
    if (!a.vx) a.vx=0; if (!a.vy) a.vy=0;
    if (!b.vx) b.vx=0; if (!b.vy) b.vy=0;
    if (a.id !== 'SESSION') { a.vx += f*dx/d; a.vy += f*dy/d; }
    if (b.id !== 'SESSION') { b.vx -= f*dx/d; b.vy -= f*dy/d; }
  });
  papers.forEach(p => {
    if (p.id === 'SESSION') return;
    if (!p.vx) p.vx=0; if (!p.vy) p.vy=0;
    p.vx += (W/2 - p.x) * 0.005;
    p.vy += (H/2 - p.y) * 0.005;
    p.vx *= DAMP; p.vy *= DAMP;
    p.x = Math.max(p.r+4, Math.min(W-p.r-4, p.x + p.vx));
    p.y = Math.max(p.r+4, Math.min(H-p.r-4, p.y + p.vy));
  });
}

let hovered = null;
function draw() {
  ctx.fillStyle = '#0d1117'; ctx.fillRect(0, 0, W, H);
  forceStep(); t++;

  edges.forEach(([aid, bid]) => {
    const a = papers.find(p=>p.id===aid), b = papers.find(p=>p.id===bid);
    if (!a||!b) return;
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = aid==='SESSION'||bid==='SESSION' ? 'rgba(200,100,100,0.3)' : 'rgba(80,100,120,0.2)';
    ctx.lineWidth = aid==='SESSION'||bid==='SESSION' ? 1.5 : 0.8;
    ctx.stroke();
  });

  papers.forEach(p => {
    const g = ctx.createRadialGradient(p.x-p.r*0.3, p.y-p.r*0.3, 1, p.x, p.y, p.r);
    g.addColorStop(0, p.col+'cc'); g.addColorStop(1, p.col+'44');
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r + (p===hovered?3:0), 0, Math.PI*2);
    ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = p===hovered ? '#fff' : p.col+'88'; ctx.lineWidth = p===hovered?2:1; ctx.stroke();

    ctx.font = Math.min(10, p.r*0.7) + 'px system-ui'; ctx.fillStyle = '#c9d1d9';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const label = p.label.length > 16 ? p.label.substring(0,15)+'…' : p.label;
    ctx.fillText(label, p.x, p.y);
    ctx.font = '7px system-ui'; ctx.fillStyle = 'rgba(150,160,170,0.6)';
    ctx.fillText(p.sub, p.x, p.y + p.r + 8);
  });
  requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) / rect.width * W;
  const my = (e.clientY - rect.top) / rect.height * H;
  hovered = null;
  for (const p of papers) {
    if (Math.hypot(mx-p.x, my-p.y) < p.r+6) { hovered = p; break; }
  }
  const tip = document.getElementById('tooltip');
  if (hovered) {
    tip.style.display = 'block';
    tip.style.left = (e.clientX + 12) + 'px';
    tip.style.top = (e.clientY - 10) + 'px';
    tip.innerHTML = '<strong>' + hovered.label + '</strong><br>' + hovered.sub + '<br><br>' + hovered.desc;
  } else {
    tip.style.display = 'none';
  }
});
canvas.addEventListener('mouseleave', () => { document.getElementById('tooltip').style.display = 'none'; });
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
