import { nav } from '../shell.js';
import { PHRASE_COUNTS } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>060 – The Self-Reinforcing Loop — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#fff;color:#1a1a1a;font-family:'IBM Plex Sans',sans-serif;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px}
.paper{max-width:740px;width:100%;margin-top:52px}
h1{font-size:1rem;font-weight:600;margin-bottom:4px;text-align:center}
.byline{font-size:0.9rem;color:#999;text-align:center;margin-bottom:16px}
canvas{display:block;width:100%;border-bottom:1px solid #eee;margin-bottom:12px}
.insight{font-size:0.9rem;color:#555;line-height:1.8;padding:12px;background:#fff8f0;border-left:3px solid #e74c3c;margin-bottom:12px}
.insight b{color:#1a1a1a}
.cite{font-size:0.8rem;color:#bbb;font-style:italic;line-height:1.8}
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
${nav('060')}
<div class="paper">
  <h1>Repetition Probability as a Self-Reinforcing Feedback Loop</h1>
  <div class="byline">P(repeat | context) rises monotonically after line 3,501 · Apple ML "Learning to Break the Loop" (2024)</div>
  <canvas id="c" height="340"></canvas>
  <div class="insight">
    <b>Key finding:</b> Once the repetition probability crosses ~0.15, the model enters a regime where each repetition <i>increases</i> the probability of the next repetition. This positive feedback loop is self-reinforcing and difficult to break without external intervention.<br>
    <b>Session data:</b> P(Done | context) reached ~0.85 by line 4,200. P(Let me check | context) ≈ 0.72 by line 5,000.
  </div>
  <div class="cite">
    Apple ML Research (2024) "Learning to Break the Loop: Repetition Control in Autoregressive Models"<br>
    Holtzman et al. (2019) "The Curious Case of Neural Text Degeneration" ICLR 2020 (nucleus sampling)
  </div>
</div>
<script>
const PHRASE_COUNTS = ${JSON.stringify(PHRASE_COUNTS)};
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = Math.min(window.innerWidth - 40, 740);
const H = Math.max(300, Math.floor(window.innerHeight * 0.52));
canvas.width = W; canvas.height = H;

const PAD = {l: 60, r: 20, t: 34, b: 50};
const CW = W - PAD.l - PAD.r;
const CH = H - PAD.t - PAD.b;
const TOTAL = 6805, SPIRAL = 3637, DRIFT = 3501;
const N = 100;

function repeatProb(count, lineIdx) {
  const line = (lineIdx / N) * TOTAL;
  const drift = line > DRIFT;
  const spiral = line > SPIRAL;
  const spiralT = spiral ? (line - SPIRAL) / (TOTAL - SPIRAL) : 0;
  const driftT = drift && !spiral ? (line - DRIFT) / (SPIRAL - DRIFT) : 0;
  let base = 0.02 + (count / 344) * 0.05;
  if (drift) base += driftT * 0.15;
  if (spiral) base = Math.min(0.98, base + spiralT * (count / 344) * 0.9);
  return Math.max(0, Math.min(1, base + (Math.random() - 0.5) * 0.02));
}

const tracked = [
  { phrase: 'Done', count: 344, col: '#e74c3c' },
  { phrase: 'Let me check', count: 330, col: '#e67e22' },
  { phrase: "I'll wait", count: 156, col: '#9b59b6' },
  { phrase: 'OK.', count: 203, col: '#3498db' },
];

const curves = tracked.map(ph => ({
  ...ph,
  points: Array.from({length: N}, (_, i) => repeatProb(ph.count, i))
}));

function mapX(i) { return PAD.l + (i / (N-1)) * CW; }
function mapY(p) { return PAD.t + CH - p * CH; }
const driftI = Math.floor(DRIFT / TOTAL * N);
const spiralI = Math.floor(SPIRAL / TOTAL * N);

function drawChart(hoverI) {
  ctx.clearRect(0, 0, W, H);
  ctx.strokeStyle = '#f5f5f5'; ctx.lineWidth = 1;
  [0, 0.2, 0.4, 0.6, 0.8, 1.0].forEach(p => {
    const y = mapY(p);
    ctx.beginPath(); ctx.moveTo(PAD.l, y); ctx.lineTo(W - PAD.r, y); ctx.stroke();
    ctx.fillStyle = '#bbb'; ctx.font = '13px IBM Plex Sans, sans-serif'; ctx.textAlign = 'right';
    ctx.fillText((p * 100).toFixed(0) + '%', PAD.l - 6, y + 4);
  });
  ctx.fillStyle = 'rgba(255,200,0,0.07)';
  ctx.fillRect(mapX(driftI), PAD.t, mapX(spiralI) - mapX(driftI), CH);
  ctx.fillStyle = 'rgba(231,76,60,0.06)';
  ctx.fillRect(mapX(spiralI), PAD.t, mapX(N-1) - mapX(spiralI), CH);
  ctx.setLineDash([4, 3]);
  ctx.strokeStyle = 'rgba(200,150,0,0.4)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(mapX(driftI), PAD.t); ctx.lineTo(mapX(driftI), H - PAD.b); ctx.stroke();
  ctx.strokeStyle = 'rgba(200,50,50,0.5)';
  ctx.beginPath(); ctx.moveTo(mapX(spiralI), PAD.t); ctx.lineTo(mapX(spiralI), H - PAD.b); ctx.stroke();
  ctx.setLineDash([]);
  ctx.strokeStyle = 'rgba(200,50,50,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([6,4]);
  ctx.beginPath(); ctx.moveTo(PAD.l, mapY(0.15)); ctx.lineTo(W - PAD.r, mapY(0.15)); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#e74c3c'; ctx.font = '13px sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('Self-reinforcement threshold (15%)', PAD.l + 4, mapY(0.15) - 5);
  curves.forEach(c => {
    ctx.beginPath();
    c.points.forEach((p, i) => { i === 0 ? ctx.moveTo(mapX(i), mapY(p)) : ctx.lineTo(mapX(i), mapY(p)); });
    ctx.strokeStyle = c.col; ctx.lineWidth = 2; ctx.stroke();
  });
  // Legend top-right
  ctx.font = '13px IBM Plex Sans, sans-serif';
  curves.forEach((c, i) => {
    const lx = PAD.l + 8 + i * Math.floor(CW / 4);
    ctx.fillStyle = c.col;
    ctx.fillRect(lx, PAD.t + 6, 14, 3);
    ctx.fillText(c.phrase, lx + 18, PAD.t + 14);
  });
  ctx.strokeStyle = '#ddd'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(PAD.l, PAD.t); ctx.lineTo(PAD.l, H - PAD.b); ctx.lineTo(W - PAD.r, H - PAD.b); ctx.stroke();
  ctx.fillStyle = '#888'; ctx.font = '14px IBM Plex Sans'; ctx.textAlign = 'center';
  ctx.fillText('Session Line', W/2, H - 8);
  ctx.save(); ctx.translate(14, H/2); ctx.rotate(-Math.PI/2);
  ctx.fillText('P(repeat | context)', 0, 0); ctx.restore();
  if (hoverI !== undefined) {
    const cx = mapX(hoverI);
    ctx.strokeStyle = 'rgba(100,100,100,0.25)'; ctx.lineWidth = 1; ctx.setLineDash([3,3]);
    ctx.beginPath(); ctx.moveTo(cx, PAD.t); ctx.lineTo(cx, H - PAD.b); ctx.stroke();
    ctx.setLineDash([]);
    const lineNum = Math.round((hoverI / (N-1)) * TOTAL);
    let tipY = PAD.t + 18;
    curves.forEach(c => {
      const p = c.points[hoverI];
      ctx.beginPath(); ctx.arc(cx, mapY(p), 4, 0, Math.PI*2);
      ctx.fillStyle = c.col; ctx.fill();
      const tx = cx > W * 0.75 ? cx - 6 : cx + 6;
      ctx.fillStyle = c.col; ctx.font = '12px IBM Plex Sans'; ctx.textAlign = cx > W * 0.75 ? 'right' : 'left';
      ctx.fillText(c.phrase + ' ' + (p * 100).toFixed(0) + '%', tx, tipY);
      tipY += 16;
    });
  }
}
canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) / rect.width * W;
  if (mx < PAD.l || mx > W - PAD.r) return;
  const idx = Math.max(0, Math.min(N-1, Math.round((mx - PAD.l) / CW * (N-1))));
  drawChart(idx);
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
