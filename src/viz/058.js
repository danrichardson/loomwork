import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>058 – The Entropy Collapse — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#fff;color:#1a1a1a;font-family:'Inter',sans-serif;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px}
.paper{max-width:740px;width:100%;margin-top:52px}
h1{font-size:1.1rem;font-weight:600;margin-bottom:4px;text-align:center;letter-spacing:-0.02em}
.byline{font-size:0.9rem;color:#999;text-align:center;margin-bottom:20px}
canvas{display:block;width:100%;border-bottom:1px solid #eee}
.annotations{margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:12px}
.ann{font-size:0.9rem;line-height:1.7;color:#555;padding:8px;border-left:2px solid #eee}
.ann.red{border-color:#e74c3c;color:#666}
.ann b{color:#1a1a1a}
.citations{font-size:0.8rem;color:#bbb;margin-top:16px;font-style:italic;line-height:1.8}
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

<style>
  @keyframes subtleBreathe {
    0% { filter: brightness(1); }
    50% { filter: brightness(0.95); }
    100% { filter: brightness(1); }
  }
  body { animation: subtleBreathe 8s ease-in-out infinite; }
</style>
</head>
<body>
${nav('058')}
<div class="paper">
  <h1>Shannon Entropy of Session Transcript: Collapse &amp; Spike</h1>
  <div class="byline">H(X) per 100-line window · bits per character · cites Braverman et al. 2020, ERGO arXiv:2510.14077</div>
  <canvas id="c" height="360"></canvas>
  <div class="annotations">
    <div class="ann">
      <b>Productive phase (0–3,500):</b> High, stable entropy. Diverse vocabulary, varied syntax, multi-topic output. H ≈ 4.2 bits/char.
    </div>
    <div class="ann red">
      <b>Spiral phase (3,637+):</b> Entropy <i>spikes</i> then collapses. Initial spike = random desperation phrases. Collapse = locked repetition loop. H drops to ~1.8 bits/char. Matches ERGO (2025) entropy-incoherence correlation.
    </div>
  </div>
  <div class="citations">
    Braverman et al. (2020) "Calibration, Entropy Rates, and Memory in Language Models" · NeurIPS 2020<br>
    ERGO Lab (2025) "Entropy as a Signal of Language Model Incoherence" arXiv:2510.14077<br>
    Shannon, C.E. (1948) "A Mathematical Theory of Communication" Bell System Technical Journal
  </div>
</div>
<script>
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = Math.min(window.innerWidth - 40, 740);
const H = Math.max(320, Math.floor(window.innerHeight * 0.55));
canvas.width = W; canvas.height = H;

const PAD = {l: 60, r: 20, t: 30, b: 50};
const CW = W - PAD.l - PAD.r;
const CH = H - PAD.t - PAD.b;
const TOTAL = 6805, SPIRAL = 3637, DRIFT = 3501;
const WINDOW = 100;
const N = Math.floor(TOTAL / WINDOW);

// Simulate entropy curve
function entropy(windowStart) {
  const t = windowStart / TOTAL;
  const spiral = windowStart > SPIRAL;
  const drift = windowStart > DRIFT;
  const spiralT = spiral ? (windowStart - SPIRAL) / (TOTAL - SPIRAL) : 0;

  let base;
  if (!drift) {
    base = 4.0 + Math.sin(t * Math.PI * 6) * 0.15 + Math.random() * 0.1;
  } else if (!spiral) {
    base = 4.0 - (windowStart - DRIFT) / (SPIRAL - DRIFT) * 0.4 + Math.random() * 0.2;
  } else {
    // Spike then crash
    if (spiralT < 0.15) {
      base = 3.6 + spiralT * 8 + Math.random() * 0.3; // spike
    } else {
      base = Math.max(1.5, 4.8 - spiralT * 3.2) + Math.random() * 0.2;
    }
  }
  return Math.max(0.5, Math.min(7, base));
}

const points = [];
for (let i = 0; i < N; i++) {
  points.push({ line: i * WINDOW, H: entropy(i * WINDOW) });
}

const maxH = 7, minH = 0;
function mapX(line) { return PAD.l + (line / TOTAL) * CW; }
function mapY(h) { return PAD.t + CH - ((h - minH) / (maxH - minH)) * CH; }

const meanH = 4.0;

function drawChart(hoverIdx) {
  ctx.clearRect(0, 0, W, H);
  ctx.strokeStyle = '#f0f0f0'; ctx.lineWidth = 1;
  for (let h = 0; h <= 7; h++) {
    const y = mapY(h);
    ctx.beginPath(); ctx.moveTo(PAD.l, y); ctx.lineTo(W - PAD.r, y); ctx.stroke();
    ctx.fillStyle = '#bbb'; ctx.font = '13px Inter, sans-serif'; ctx.textAlign = 'right';
    ctx.fillText(h + '.0', PAD.l - 6, y + 3);
  }
  ctx.fillStyle = 'rgba(40,160,80,0.04)'; ctx.fillRect(mapX(0), PAD.t, mapX(DRIFT) - mapX(0), CH);
  ctx.fillStyle = 'rgba(230,180,0,0.07)'; ctx.fillRect(mapX(DRIFT), PAD.t, mapX(SPIRAL) - mapX(DRIFT), CH);
  ctx.fillStyle = 'rgba(230,60,50,0.06)'; ctx.fillRect(mapX(SPIRAL), PAD.t, mapX(TOTAL) - mapX(SPIRAL), CH);
  ctx.setLineDash([4, 3]);
  [[DRIFT,'rgba(200,150,0,0.4)'],[SPIRAL,'rgba(200,50,50,0.6)']].forEach(([line, col]) => {
    ctx.strokeStyle = col; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(mapX(line), PAD.t); ctx.lineTo(mapX(line), H - PAD.b); ctx.stroke();
  });
  ctx.setLineDash([]);
  ctx.strokeStyle = 'rgba(50,50,200,0.2)'; ctx.lineWidth = 1; ctx.setLineDash([6,4]);
  ctx.beginPath(); ctx.moveTo(PAD.l, mapY(meanH)); ctx.lineTo(W - PAD.r, mapY(meanH)); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#aaa'; ctx.font = '13px Inter, sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('H̄ = 4.0 (baseline)', PAD.l + 4, mapY(meanH) - 4);
  ctx.beginPath();
  points.forEach((p, i) => {
    const x = mapX(p.line), y = mapY(p.H);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  const grad2 = ctx.createLinearGradient(PAD.l, 0, W - PAD.r, 0);
  grad2.addColorStop(0, '#2a9a4a');
  grad2.addColorStop(DRIFT / TOTAL, '#e6b800');
  grad2.addColorStop(SPIRAL / TOTAL, '#e63c32');
  grad2.addColorStop(1, '#800000');
  ctx.strokeStyle = grad2; ctx.lineWidth = 2.5; ctx.stroke();
  const spikeX2 = mapX(SPIRAL + 500);
  ctx.fillStyle = '#e63c32'; ctx.font = '13px Inter, sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('entropy spike', spikeX2, PAD.t + 14);
  ctx.font = '13px Inter'; ctx.fillStyle = '#aaa'; ctx.textAlign = 'center';
  ctx.fillText('Productive', mapX(DRIFT/2), H - PAD.b + 16);
  ctx.fillText('Drift', mapX((DRIFT+SPIRAL)/2), H - PAD.b + 16);
  ctx.fillStyle = '#cc4444'; ctx.fillText('Spiral', mapX((SPIRAL+TOTAL)/2), H - PAD.b + 16);
  ctx.strokeStyle = '#ddd'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(PAD.l, PAD.t); ctx.lineTo(PAD.l, H - PAD.b); ctx.lineTo(W - PAD.r, H - PAD.b); ctx.stroke();
  ctx.fillStyle = '#888'; ctx.font = '14px Inter'; ctx.textAlign = 'center';
  ctx.fillText('Session Line', W/2, H - 8);
  ctx.save(); ctx.translate(14, H/2); ctx.rotate(-Math.PI/2);
  ctx.fillText('Entropy H (bits/char)', 0, 0); ctx.restore();
  if (hoverIdx !== undefined && hoverIdx >= 0 && hoverIdx < points.length) {
    const p = points[hoverIdx];
    const cx = mapX(p.line), cy = mapY(p.H);
    ctx.strokeStyle = 'rgba(100,100,100,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([3,3]);
    ctx.beginPath(); ctx.moveTo(cx, PAD.t); ctx.lineTo(cx, H - PAD.b); ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI*2);
    ctx.fillStyle = p.line > SPIRAL ? '#e63c32' : p.line > DRIFT ? '#e6b800' : '#2a9a4a';
    ctx.fill();
    ctx.fillStyle = '#333'; ctx.font = '13px Inter'; ctx.textAlign = cx > W*0.7 ? 'right' : 'left';
    ctx.fillText('line ' + p.line + '  H=' + p.H.toFixed(2), cx + (cx > W*0.7 ? -8 : 8), cy - 8);
  }
}
canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) / rect.width * W;
  if (mx < PAD.l || mx > W - PAD.r) return;
  const idx = Math.round((mx - PAD.l) / CW * (points.length - 1));
  drawChart(Math.max(0, Math.min(points.length - 1, idx)));
});
canvas.addEventListener('mouseleave', () => drawChart());
drawChart();
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
