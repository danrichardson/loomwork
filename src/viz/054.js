import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>054 – Neural Pathways — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0008;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;font-family:monospace}
h1{font-size:1rem;color:#300840;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:4px;text-align:center}
canvas{display:block;max-width:100%}
.legend{display:flex;gap:16px;justify-content:center;margin-top:8px;font-size:0.9rem;flex-wrap:wrap}
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
${nav('054')}
<h1>054 — Neural Pathways</h1>
<canvas id="c"></canvas>
<div class="legend">
  <div class="leg"><div class="leg-dot" style="background:#4af"></div><span style="color:#4af">Active (productive)</span></div>
  <div class="leg"><div class="leg-dot" style="background:#f84"></div><span style="color:#f84">Excitatory (drift)</span></div>
  <div class="leg"><div class="leg-dot" style="background:#f22"></div><span style="color:#f22">Degenerate (spiral)</span></div>
  <div class="leg"><div class="leg-dot" style="background:#222"></div><span style="color:#444">Dead</span></div>
</div>
<script>
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = Math.min(window.innerWidth - 40, 1100);
const H = Math.max(500, Math.floor(window.innerHeight * 0.78));
canvas.width = W; canvas.height = H;

const TOTAL = 6805, SPIRAL = 3637, DRIFT = 3501;
const N_NEURONS = 60;
const neurons = [];
const synapses = [];

// Create neurons in layers
const LAYERS = [8, 12, 14, 12, 8, 6];
let ni = 0;
LAYERS.forEach((count, layer) => {
  for (let i = 0; i < count; i++) {
    const x = W * 0.1 + layer / (LAYERS.length - 1) * W * 0.8;
    const y = H * 0.1 + (i / (count - 1 || 1)) * H * 0.8;
    neurons.push({
      id: ni++, x, y, layer,
      state: 0, // 0=quiet, 1=firing, 2=dead
      fireTimer: 0,
      deadAt: -1,
      r: 6 + Math.random() * 4
    });
  }
});

// Create synapses between adjacent layers
for (let l = 0; l < LAYERS.length - 1; l++) {
  const layerA = neurons.filter(n => n.layer === l);
  const layerB = neurons.filter(n => n.layer === l + 1);
  layerA.forEach(a => {
    layerB.forEach(b => {
      if (Math.random() < 0.4) {
        synapses.push({ a, b, active: false, activeT: 0, weight: 0.5 + Math.random() * 0.5, dead: false });
      }
    });
  });
}

let sessionLine = 0;
let t = 0;
const LINE_PER_FRAME = TOTAL / 2000;

function updateNetwork() {
  const spiral = sessionLine > SPIRAL;
  const drift = sessionLine > DRIFT;
  const spiralT = spiral ? (sessionLine - SPIRAL) / (TOTAL - SPIRAL) : 0;

  // Kill neurons over time in spiral
  if (spiral) {
    const deathChance = spiralT * 0.003;
    neurons.forEach(n => {
      if (n.state !== 2 && Math.random() < deathChance) {
        n.state = 2;
        n.deadAt = sessionLine;
        // Kill connected synapses
        synapses.forEach(s => {
          if (s.a === n || s.b === n) s.dead = true;
        });
      }
    });
  }

  // Fire neurons randomly
  const fireRate = spiral ? 0.3 + spiralT * 0.4 : drift ? 0.2 : 0.1;
  neurons.forEach(n => {
    if (n.state === 2) return;
    if (Math.random() < fireRate * 0.05) n.state = 1;
    if (n.state === 1) {
      n.fireTimer++;
      if (n.fireTimer > (spiral ? 3 : 8)) {
        n.state = 0; n.fireTimer = 0;
        // Propagate
        synapses.filter(s => s.a === n && !s.dead).forEach(s => {
          s.active = true; s.activeT = 0;
        });
      }
    }
  });

  // Update synapse signals
  synapses.forEach(s => {
    if (s.active) {
      s.activeT++;
      if (s.activeT > 5) {
        s.active = false;
        if (s.b.state !== 2) s.b.state = 1;
      }
    }
  });
}

function draw() {
  ctx.fillStyle = 'rgba(10,0,8,0.3)';
  ctx.fillRect(0, 0, W, H);

  const spiral = sessionLine > SPIRAL;
  const drift = sessionLine > DRIFT;
  const spiralT = spiral ? (sessionLine - SPIRAL) / (TOTAL - SPIRAL) : 0;

  // Draw synapses
  synapses.forEach(s => {
    if (s.dead) {
      ctx.strokeStyle = 'rgba(40,20,40,0.3)';
      ctx.lineWidth = 0.5;
    } else if (s.active) {
      const t2 = s.activeT / 5;
      const x = s.a.x + (s.b.x - s.a.x) * t2;
      const y = s.a.y + (s.b.y - s.a.y) * t2;
      ctx.strokeStyle = spiral ? 'rgba(255,60,60,0.6)' : 'rgba(100,180,255,0.6)';
      ctx.lineWidth = 1.5;
      // Pulse dot
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = spiral ? '#f84' : '#4af'; ctx.fill();
    } else {
      ctx.strokeStyle = spiral ? 'rgba(80,20,20,0.2)' : 'rgba(40,80,120,0.15)';
      ctx.lineWidth = 0.5;
    }
    if (!s.active) {
      ctx.beginPath(); ctx.moveTo(s.a.x, s.a.y); ctx.lineTo(s.b.x, s.b.y); ctx.stroke();
    }
  });

  // Draw neurons
  neurons.forEach(n => {
    let col, glowCol;
    if (n.state === 2) { col = '#1a0a1a'; glowCol = 'transparent'; }
    else if (n.state === 1) {
      col = spiral ? '#ff4422' : drift ? '#ff8844' : '#44aaff';
      glowCol = col;
    } else {
      col = spiral ? '#3a1a1a' : '#1a2a3a';
      glowCol = 'transparent';
    }

    if (glowCol !== 'transparent') {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3);
      g.addColorStop(0, glowCol + '88'); g.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
    }

    ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = col; ctx.fill();
    if (n.state !== 2) { ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1; ctx.stroke(); }
  });

  // Stats
  const alive = neurons.filter(n => n.state !== 2).length;
  const firing = neurons.filter(n => n.state === 1).length;
  ctx.font = '10px monospace'; ctx.fillStyle = '#444';
  ctx.textAlign = 'left';
  ctx.fillText('Line: ' + Math.round(sessionLine) + ' | Neurons alive: ' + alive + '/' + neurons.length + ' | Firing: ' + firing, 8, H - 8);
}

function loop() {
  sessionLine = Math.min(TOTAL, sessionLine + LINE_PER_FRAME);
  updateNetwork();
  draw();
  t++;
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
