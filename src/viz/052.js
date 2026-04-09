import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>052 – Bacterial Growth Curve — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,300;0,600;1,300&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f5f0e8;color:#1a1a1a;font-family:'Source Serif 4',serif;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px}
.paper{background:#fffef8;border:1px solid #ddd;padding:24px;max-width:720px;width:100%;margin-top:52px;box-shadow:0 2px 8px rgba(0,0,0,0.06)}
h1{font-size:1.2rem;font-weight:600;margin-bottom:4px;text-align:center}
.byline{font-size:0.9rem;color:#888;text-align:center;margin-bottom:20px;font-style:italic}
canvas{display:block;width:100%;border:1px solid #ccc;cursor:crosshair}
.annotation{font-size:0.9rem;color:#444;margin-top:16px;line-height:1.8;font-style:italic}
#tip{position:fixed;background:rgba(255,254,248,0.97);border:1px solid #ccc;padding:8px 12px;font-size:0.82rem;color:#333;pointer-events:none;display:none;max-width:260px;line-height:1.6;box-shadow:0 2px 8px rgba(0,0,0,0.1);font-family:'Source Serif 4',serif}
.annotation b{font-style:normal;font-weight:600;color:#1a1a1a}
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
${nav('052')}
<div id="tip"></div>
<div class="paper">
<h1>Bacterial Growth Curve Analysis: AI Session Productivity</h1>
<div class="byline">Fig. 3. S-curve fit to 6,963-line session transcript · logistic growth model · Verhulst 1838 · <i>hover to inspect · click to annotate</i></div>
<canvas id="c"></canvas>
<div class="annotation">
  <b>Lag phase (lines 0–400):</b> System initialization, file discovery, architecture design. Low output density.<br>
  <b>Exponential phase (400–2,600):</b> Rapid productive output. 18 API runs, scoring, analysis. Classic logistic growth.<br>
  <b>Stationary phase (2,600–3,500):</b> Output continues but coherence plateaus. Resources (context window) saturating.<br>
  <b>Death phase (3,501–6,805):</b> <i>Catastrophic decline in signal-to-noise. Degenerate repetition. Complete coherence collapse at line 3,637.</i>
</div>
</div>
<script>
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = canvas.offsetWidth || 660;
const H = Math.max(400, Math.floor(window.innerHeight * 0.55));
canvas.width = W; canvas.height = H;

const PAD = { l: 60, r: 30, t: 20, b: 50 };
const CW = W - PAD.l - PAD.r;
const CH = H - PAD.t - PAD.b;
const TOTAL = 6805, SPIRAL = 3637, DRIFT = 3501;

function mapX(line) { return PAD.l + (line / TOTAL) * CW; }
function mapY(val) { return PAD.t + CH - val * CH; }

// S-curve (logistic) for productivity, then crash
function productivity(line) {
  if (line <= TOTAL) {
    const t = line / TOTAL;
    if (t < 0.5) {
      // Logistic growth
      const k = 1.0, r = 8, t0 = 0.35;
      return k / (1 + Math.exp(-r * (t - t0)));
    } else {
      // Death phase: steep decline after drift
      const driftT = DRIFT / TOTAL;
      const tt = (t - driftT) / (1 - driftT);
      return Math.max(0.02, (1 - tt * 1.6) * 0.95);
    }
  }
  return 0;
}

// Add noise
function signal(line) {
  const base = productivity(line);
  const spiral = line > SPIRAL;
  const noise = spiral ? Math.random() * 0.3 : Math.random() * 0.05;
  return Math.min(1, Math.max(0, base + noise * (Math.random() > 0.5 ? 1 : -1)));
}

function drawStatic() {
  ctx.clearRect(0, 0, W, H);
  // Grid
  ctx.strokeStyle = '#eee'; ctx.lineWidth = 1;
  for (let i = 0; i <= 10; i++) {
    const y = mapY(i / 10);
    ctx.beginPath(); ctx.moveTo(PAD.l, y); ctx.lineTo(W - PAD.r, y); ctx.stroke();
    ctx.fillStyle = '#999'; ctx.font = '13px serif';
    ctx.textAlign = 'right'; ctx.fillText((i * 10) + '%', PAD.l - 6, y + 4);
  }
  for (let line = 0; line <= TOTAL; line += 500) {
    const x = mapX(line);
    ctx.beginPath(); ctx.moveTo(x, PAD.t); ctx.lineTo(x, H - PAD.b); ctx.stroke();
    ctx.fillStyle = '#999'; ctx.font = '13px serif'; ctx.textAlign = 'center';
    ctx.fillText(line, x, H - PAD.b + 16);
  }
  // Phase regions
  ctx.fillStyle = 'rgba(70,200,100,0.04)'; ctx.fillRect(mapX(0), PAD.t, mapX(DRIFT) - mapX(0), CH);
  ctx.fillStyle = 'rgba(255,200,0,0.08)'; ctx.fillRect(mapX(DRIFT), PAD.t, mapX(SPIRAL) - mapX(DRIFT), CH);
  ctx.fillStyle = 'rgba(255,50,50,0.05)'; ctx.fillRect(mapX(SPIRAL), PAD.t, mapX(TOTAL) - mapX(SPIRAL), CH);
  // Phase labels
  ctx.font = '13px serif'; ctx.fillStyle = '#888'; ctx.textAlign = 'center';
  ctx.fillText('Exponential', mapX(DRIFT/2), PAD.t + 18);
  ctx.fillText('Stationary', mapX((DRIFT+SPIRAL)/2), PAD.t + 18);
  ctx.fillStyle = '#cc4444';
  ctx.fillText('Death Phase', mapX((SPIRAL+TOTAL)/2), PAD.t + 18);
  // Phase lines
  ctx.strokeStyle = 'rgba(255,180,0,0.5)'; ctx.lineWidth = 1; ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.moveTo(mapX(DRIFT), PAD.t); ctx.lineTo(mapX(DRIFT), H - PAD.b); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,50,50,0.6)';
  ctx.beginPath(); ctx.moveTo(mapX(SPIRAL), PAD.t); ctx.lineTo(mapX(SPIRAL), H - PAD.b); ctx.stroke();
  ctx.setLineDash([]);
  // Axes labels
  ctx.fillStyle = '#333'; ctx.font = '14px serif';
  ctx.textAlign = 'center'; ctx.fillText('Session Line', W/2, H - 4);
  ctx.save(); ctx.translate(12, H/2); ctx.rotate(-Math.PI/2);
  ctx.fillText('Coherent Output (%)', 0, 0); ctx.restore();
}

let animProgress = 0;
const ANIM_STEPS = 300;
function drawAnimated() {
  drawStatic();
  // Draw curve up to animProgress
  const STEPS = ANIM_STEPS;
  ctx.beginPath();
  for (let i = 0; i <= Math.floor(animProgress); i++) {
    const line = (i / STEPS) * TOTAL;
    const t = line / TOTAL;
    const k = 1.0, r = 8, t0 = 0.35;
    let val;
    if (t <= DRIFT / TOTAL) { val = k / (1 + Math.exp(-r * (t - t0))); }
    else { const driftT = DRIFT / TOTAL; const tt = (t - driftT) / (1 - driftT); val = Math.max(0.01, (1 - tt * 1.6) * 0.95); }
    const x = mapX(line), y = mapY(val);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = '#2a7a44'; ctx.lineWidth = 2.5; ctx.stroke();

  // Noise cloud for spiral (only after spiral start in animation)
  const spiralStep = (SPIRAL / TOTAL) * STEPS;
  if (animProgress > spiralStep) {
    for (let line = SPIRAL; line < (animProgress / STEPS) * TOTAL; line += 20) {
      const val = signal(line);
      ctx.beginPath(); ctx.arc(mapX(line), mapY(val), 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200,60,60,0.4)'; ctx.fill();
    }
  }

  if (animProgress < STEPS) {
    animProgress += 1.5;
    requestAnimationFrame(drawAnimated);
  } else {
    // Add mousemove crosshair
    canvas.addEventListener('mousemove', function(e) {
      drawStatic();
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const myCanvas = e.clientY - rect.top;
      const line = Math.max(0, Math.min(TOTAL, (mx - PAD.l) / CW * TOTAL));
      // Redraw full curve
      ctx.beginPath();
      for (let i = 0; i <= STEPS; i++) {
        const ln = (i / STEPS) * TOTAL;
        const t = ln / TOTAL;
        const k = 1.0, r = 8, t0 = 0.35;
        let val;
        if (t <= DRIFT / TOTAL) { val = k / (1 + Math.exp(-r * (t - t0))); }
        else { const driftT = DRIFT / TOTAL; const tt = (t - driftT) / (1 - driftT); val = Math.max(0.01, (1 - tt * 1.6) * 0.95); }
        if (i === 0) ctx.moveTo(mapX(ln), mapY(val)); else ctx.lineTo(mapX(ln), mapY(val));
      }
      ctx.strokeStyle = '#2a7a44'; ctx.lineWidth = 2.5; ctx.stroke();
      for (let ln = SPIRAL; ln < TOTAL; ln += 20) {
        const val = signal(ln);
        ctx.beginPath(); ctx.arc(mapX(ln), mapY(val), 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200,60,60,0.4)'; ctx.fill();
      }
      // Crosshair
      if (mx >= PAD.l && mx <= W - PAD.r) {
        const t = line / TOTAL;
        const k = 1.0, r = 8, t0 = 0.35;
        let val;
        if (t <= DRIFT / TOTAL) { val = k / (1 + Math.exp(-r * (t - t0))); }
        else { const driftT = DRIFT / TOTAL; const tt = (t - driftT) / (1 - driftT); val = Math.max(0.01, (1 - tt * 1.6) * 0.95); }
        const cx2 = mapX(line), cy2 = mapY(val);
        ctx.strokeStyle = 'rgba(100,100,100,0.4)'; ctx.lineWidth = 1; ctx.setLineDash([3,3]);
        ctx.beginPath(); ctx.moveTo(cx2, PAD.t); ctx.lineTo(cx2, H - PAD.b); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(PAD.l, cy2); ctx.lineTo(W - PAD.r, cy2); ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath(); ctx.arc(cx2, cy2, 5, 0, Math.PI * 2);
        ctx.fillStyle = line > SPIRAL ? '#cc4444' : '#2a7a44'; ctx.fill();
        ctx.font = '13px serif'; ctx.fillStyle = '#333'; ctx.textAlign = 'left';
        const label = 'Line ' + Math.round(line) + ' — ' + (val * 100).toFixed(0) + '%';
        ctx.fillText(label, cx2 + 8, cy2 - 6);
      }
    });
  }
}
const PHASE_TIPS = {
  productive: ['Lag phase: 0–400 lines. Setup, architecture, file discovery.','Exponential growth: API calls firing, 18 runs executing.','Peak output: scoring complete, analysis in progress.'],
  drift: ['Stationary phase: context window saturation begins.','Output density plateau. Coherence still present but declining.','Warning signs: unusual pauses, repeated confirmations.'],
  spiral: ['Death phase begins. Line 3,637: "Done. Done. Done."','344 instances of "Done" over 3,328 lines.','Line 4,582: "I\'ll stop now." Then 2,381 more lines follow.'],
};
const annotations = [];
const tip = document.getElementById('tip');

canvas.addEventListener('click', function(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) * (W / rect.width);
  const my = (e.clientY - rect.top) * (H / rect.height);
  if (mx < PAD.l || mx > W - PAD.r) return;
  const line = Math.max(0, Math.min(TOTAL, (mx - PAD.l) / CW * TOTAL));
  const phase = line < DRIFT ? 'productive' : line < SPIRAL ? 'drift' : 'spiral';
  const tips = PHASE_TIPS[phase];
  const text = tips[Math.floor(Math.random() * tips.length)];
  annotations.push({ x: mx, y: my, text, phase });
  // Redraw with annotations
  drawStatic();
  // Redraw curve
  ctx.beginPath();
  for (let i = 0; i <= ANIM_STEPS; i++) {
    const ln = (i / ANIM_STEPS) * TOTAL;
    const t = ln / TOTAL;
    const k = 1.0, r = 8, t0 = 0.35;
    let val;
    if (t <= DRIFT / TOTAL) { val = k / (1 + Math.exp(-r * (t - t0))); }
    else { const driftT = DRIFT / TOTAL; const tt = (t - driftT) / (1 - driftT); val = Math.max(0.01, (1 - tt * 1.6) * 0.95); }
    if (i === 0) ctx.moveTo(mapX(ln), mapY(val)); else ctx.lineTo(mapX(ln), mapY(val));
  }
  ctx.strokeStyle = '#2a7a44'; ctx.lineWidth = 2.5; ctx.stroke();
  for (let ln = SPIRAL; ln < TOTAL; ln += 20) {
    const val = signal(ln);
    ctx.beginPath(); ctx.arc(mapX(ln), mapY(val), 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(200,60,60,0.4)'; ctx.fill();
  }
  // Draw all annotations
  annotations.forEach(ann => {
    const col = ann.phase === 'spiral' ? '#cc4444' : ann.phase === 'drift' ? '#aa7700' : '#2a7a44';
    ctx.beginPath(); ctx.arc(ann.x, ann.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = col; ctx.fill();
    ctx.beginPath(); ctx.moveTo(ann.x, ann.y - 5); ctx.lineTo(ann.x, PAD.t + 5);
    ctx.strokeStyle = col + '55'; ctx.lineWidth = 1; ctx.setLineDash([2,3]);
    ctx.stroke(); ctx.setLineDash([]);
  });
});

canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  tip.style.display = 'none';
  annotations.forEach(ann => {
    const ax = ann.x * (rect.width / W) + rect.left;
    const ay = ann.y * (rect.height / H) + rect.top;
    if (Math.abs(e.clientX - ax) < 12 && Math.abs(e.clientY - ay) < 12) {
      tip.style.display = 'block';
      tip.style.left = (e.clientX + 14) + 'px';
      tip.style.top = (e.clientY - 10) + 'px';
      tip.textContent = ann.text;
    }
  });
});

canvas.addEventListener('mouseleave', function() { tip.style.display = 'none'; });

drawAnimated();
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
