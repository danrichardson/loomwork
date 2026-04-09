import { nav } from '../shell.js';
import { SCORES, ALL_RUNS } from '../data.js';

export function render() {
  // Composite scores per model
  const modelScores = {};
  ALL_RUNS.forEach(r => {
    const model = r.split('-')[0];
    if (!modelScores[model]) modelScores[model] = [];
    modelScores[model].push(SCORES[r].reduce((a, b) => a + b, 0) / 6);
  });
  const avgScores = Object.entries(modelScores).map(([m, s]) => ({
    m, avg: (s.reduce((a, b) => a + b, 0) / s.length).toFixed(1)
  }));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>061 – The Worst Chart Ever — Claude Lost Its Mind</title>
<style>
@font-face{font-family:'Comic Sans MS';src:local('Comic Sans MS'),local('ComicSansMS')}
*{margin:0;padding:0;box-sizing:border-box}
body{min-height:100vh;overflow-x:hidden;background:#ffffff;font-family:'Comic Sans MS','Comic Sans',cursive;padding:20px;padding-top:52px}
h1{text-align:center;font-size:1.8rem;color:#ff0000;text-shadow:3px 3px 0 #ffff00;margin-bottom:4px}
.subtitle{text-align:center;font-size:0.9rem;color:#0000ff;margin-bottom:12px;font-style:italic}
.chart-container{background:linear-gradient(135deg,#ffffcc,#ccffff,#ffccff,#ccffcc);border:4px ridge #ff00ff;padding:20px;margin:0 auto;max-width:720px;position:relative}
.chart-title{text-align:center;font-size:1rem;color:#ff0000;font-weight:bold;margin-bottom:8px}
canvas{display:block;margin:0 auto;cursor:pointer}
.legend{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:12px}
.leg-item{display:flex;align-items:center;gap:4px;font-size:0.85rem;border:2px dashed #888;padding:3px 8px}
.leg-swatch{width:16px;height:16px;border:1px solid #000}
.data-labels{text-align:center;margin-top:8px;font-size:0.85rem;color:#333}
.disclaimer{text-align:center;font-size:0.85rem;color:#ff00ff;margin-top:8px;font-weight:bold}
.watermark{position:absolute;top:50%;left:50%;opacity:0.08;font-size:4rem;color:#ff0000;pointer-events:none;transform:translate(-50%,-50%) rotate(-30deg);white-space:nowrap}
#insight-box{background:#ffff00;border:3px solid #ff0000;padding:10px 16px;margin-top:10px;font-size:0.95rem;color:#0000cc;text-align:center;font-weight:bold;min-height:36px;display:none}
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
${nav('061')}
<h1>📊 The Worst Chart Ever 📊</h1>
<div class="subtitle">IMPORTANT DATA VISUALIZATION!!!  (not to scale)</div>
<div class="chart-container">
  <div class="watermark">CONFIDENTIAL</div>
  <div class="chart-title">🌈 Model Performance (3D Exploded Pie!!!) 🌈</div>
  <canvas id="c" width="600" height="360"></canvas>
  <div class="legend" id="legend"></div>
  <div class="data-labels">
    📌 NOTE: This chart is accurate to within ± 50%. Colors chosen randomly. 3D effect added for PROFESSIONALISM.<br>
    ⚠️ Also Claude spiraled for 3,169 lines after the experiment. This is not shown because it doesn't look good in a pie chart.
  </div>
  <div class="disclaimer">🔥 HOT TAKE: More colors = more insights 🔥</div>
  <div id="insight-box"></div>
</div>
<script>
const SCORES_DATA = ${JSON.stringify(avgScores)};
const RUNS = ${JSON.stringify(ALL_RUNS)};
const ALL_SCORES = ${JSON.stringify(SCORES)};

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = Math.min(window.innerWidth - 80, 620);
const H = Math.round(W * 0.62);
canvas.width = W; canvas.height = H;

const COLORS = ['#FF0000','#00FF00','#0000FF','#FF00FF','#00FFFF','#FFFF00','#FF8800','#8800FF','#00FF88','#FF0088','#88FF00','#0088FF','#FF4400','#44FF00','#0044FF','#FF0044'];
const EXCEL_INSIGHTS = [
  'EXCEL SAYS: This proves Haiku should be banned from Tuesdays.',
  'ACTIONABLE INSIGHT: Make all charts 3D for maximum professionalism.',
  'FINDING: The red slices are 23% more red than last quarter.',
  'NOTE: Opus Full is performing at 127% of expectations (expected: bad).',
  'RECOMMENDATION: Use more gradient fills. Science demands it.',
  'BREAKTHROUGH: The pie confirms what gut feeling already knew.',
  'DATA-DRIVEN: If you squint, this looks like a donut chart. Different insight.',
  'SYNERGY: All models benefited from existing in this chart simultaneously.',
  'OBSERVATION: This slice is clearly an outlier and should be ignored.',
  'CONCLUSION: More data is needed. Specifically, more pie charts.',
];

const data = RUNS.map((r, i) => ({
  label: r,
  value: ALL_SCORES[r].reduce((a,b)=>a+b,0)/6 + 1,
  col: COLORS[i % COLORS.length],
  startAngle: 0, endAngle: 0, explode: 12
}));

const total = data.reduce((s, d) => s + d.value, 0);
const cx = W/2, cy = H/2 - 10;
const R = Math.min(W, H) * 0.38;

let hoveredIdx = -1;

// Pre-compute angles
let angle = -Math.PI/2;
data.forEach(d => {
  const slice = (d.value / total) * Math.PI * 2;
  d.startAngle = angle;
  d.endAngle = angle + slice;
  angle += slice;
});

function draw() {
  ctx.clearRect(0, 0, W, H);
  // Shadows
  data.forEach((d, i) => {
    const mid = (d.startAngle + d.endAngle) / 2;
    const exp = i === hoveredIdx ? 24 : d.explode;
    const ex = Math.cos(mid) * exp, ey = Math.sin(mid) * exp;
    ctx.beginPath();
    ctx.moveTo(cx+ex, cy+ey+12);
    ctx.arc(cx+ex, cy+ey+12, R, d.startAngle, d.endAngle);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fill();
  });
  // Slices
  data.forEach((d, i) => {
    const mid = (d.startAngle + d.endAngle) / 2;
    const exp = i === hoveredIdx ? 24 : d.explode;
    const ex = Math.cos(mid) * exp, ey = Math.sin(mid) * exp;
    ctx.beginPath();
    ctx.moveTo(cx+ex, cy+ey);
    ctx.arc(cx+ex, cy+ey, R, d.startAngle, d.endAngle);
    ctx.closePath();
    ctx.fillStyle = i === hoveredIdx ? '#FFFFFF' : d.col;
    ctx.fill();
    // Hovered slice: add color as tint
    if (i === hoveredIdx) {
      ctx.beginPath();
      ctx.moveTo(cx+ex, cy+ey);
      ctx.arc(cx+ex, cy+ey, R, d.startAngle, d.endAngle);
      ctx.closePath();
      ctx.fillStyle = d.col + '88';
      ctx.fill();
    }
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = i === hoveredIdx ? 4 : 2;
    ctx.stroke();
    // Label
    const lx = cx + ex + Math.cos(mid) * R * 0.65;
    const ly = cy + ey + Math.sin(mid) * R * 0.65;
    ctx.fillStyle = '#000';
    ctx.font = 'bold ' + (i === hoveredIdx ? '11' : '9') + 'px Comic Sans MS, cursive';
    ctx.textAlign = 'center';
    ctx.fillText(d.value.toFixed(1) + '!!!', lx, ly);
  });
  ctx.fillStyle = '#ff0000';
  ctx.font = 'bold 12px Comic Sans MS, cursive';
  ctx.textAlign = 'center';
  ctx.fillText('(numbers are approximately correct, maybe)', W/2, H - 6);
}

function getSliceAt(mx, my) {
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    const mid = (d.startAngle + d.endAngle) / 2;
    const exp = i === hoveredIdx ? 24 : d.explode;
    const ex = Math.cos(mid) * exp, ey = Math.sin(mid) * exp;
    const dx = mx - (cx + ex), dy = my - (cy + ey);
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist > R) continue;
    let a = Math.atan2(dy, dx);
    // Normalize to match startAngle/endAngle range
    let sa = d.startAngle, ea = d.endAngle;
    // Ensure a is in range
    while (a < sa - 0.01) a += Math.PI * 2;
    while (a > ea + 0.01) a -= Math.PI * 2;
    if (a >= sa && a <= ea) return i;
  }
  return -1;
}

canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) / rect.width * W;
  const my = (e.clientY - rect.top) / rect.height * H;
  const idx = getSliceAt(mx, my);
  if (idx !== hoveredIdx) {
    hoveredIdx = idx;
    draw();
    if (idx >= 0) {
      document.getElementById('insight-box').style.display = 'block';
      document.getElementById('insight-box').textContent = '🔍 Hover insight: ' + data[idx].label + ' scores ' + (data[idx].value - 1).toFixed(1) + '/6. ' + EXCEL_INSIGHTS[idx % EXCEL_INSIGHTS.length];
    } else {
      document.getElementById('insight-box').style.display = 'none';
    }
  }
});

canvas.addEventListener('click', function(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) / rect.width * W;
  const my = (e.clientY - rect.top) / rect.height * H;
  const idx = getSliceAt(mx, my);
  if (idx >= 0) {
    data[idx].explode = data[idx].explode > 20 ? 12 : data[idx].explode + 10;
    draw();
    const ib = document.getElementById('insight-box');
    ib.style.display = 'block';
    ib.textContent = '💥 CLICKED INSIGHT: ' + EXCEL_INSIGHTS[Math.floor(Math.random() * EXCEL_INSIGHTS.length)];
  }
});

canvas.addEventListener('mouseleave', function() {
  hoveredIdx = -1;
  draw();
  document.getElementById('insight-box').style.display = 'none';
});

document.addEventListener('keydown', function(e) {
  if (e.key === 's' || e.key === 'S') {
    // Scramble colors
    data.forEach(d => { d.col = COLORS[Math.floor(Math.random() * COLORS.length)]; });
    draw();
    document.getElementById('insight-box').style.display = 'block';
    document.getElementById('insight-box').textContent = '🎨 Colors scrambled for MAXIMUM INSIGHTS. Methodology: vibes.';
  }
  if (e.key === 'r' || e.key === 'R') {
    data.forEach((d, i) => { d.col = COLORS[i % COLORS.length]; d.explode = 12; });
    hoveredIdx = -1; draw();
    document.getElementById('insight-box').style.display = 'none';
  }
});

draw();

// Legend (with wrong colors)
const legEl = document.getElementById('legend');
[...data].sort(() => Math.random()-0.5).forEach(d => {
  const item = document.createElement('div');
  item.className = 'leg-item';
  item.innerHTML = '<div class="leg-swatch" style="background:' + COLORS[Math.floor(Math.random()*COLORS.length)] + '"></div>' + d.label + ' (' + (d.value-1).toFixed(1) + ')';
  legEl.appendChild(item);
});
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
