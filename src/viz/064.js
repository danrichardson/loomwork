import { nav } from '../shell.js';
import { SCORES, ALL_RUNS, PHRASE_COUNTS } from '../data.js';

export function render() {
  const composites = ALL_RUNS.map(r => ({
    run: r,
    score: SCORES[r].reduce((a, b) => a + b, 0) / 6
  }));
  const avgScore = (composites.reduce((s, c) => s + c.score, 0) / composites.length).toFixed(2);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>064 – KPI Dashboard — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f0f2f5;font-family:'Open Sans',Arial,sans-serif;padding:20px;padding-top:52px;font-size:13px;min-height:100vh}
.header{background:#2c3e50;color:#fff;padding:12px 20px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center}
.header h1{font-size:0.9rem;font-weight:400}
.header .date{font-size:0.7rem;opacity:0.7}
.kpi-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:12px}
.kpi{background:#fff;border-left:4px solid;padding:12px;box-shadow:0 1px 3px rgba(0,0,0,0.1);position:relative;overflow:hidden;cursor:pointer;transition:transform 0.1s,box-shadow 0.1s;user-select:none}
.kpi:hover{transform:translateY(-2px);box-shadow:0 4px 10px rgba(0,0,0,0.15)}
.kpi:active{transform:scale(0.98)}
.kpi.green{border-color:#27ae60}.kpi.yellow{border-color:#f39c12}.kpi.red{border-color:#e74c3c}
.kpi-val{font-size:1.6rem;font-weight:600;line-height:1}
.kpi-label{font-size:0.9rem;color:#888;margin-top:4px;text-transform:uppercase;letter-spacing:0.05em}
.kpi-delta{font-size:0.85rem;margin-top:4px}
.kpi-delta.up{color:#27ae60}.kpi-delta.down{color:#e74c3c}
.chart-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
@media(max-width:600px){.chart-row{grid-template-columns:1fr}}
.widget{background:#fff;padding:14px;box-shadow:0 1px 3px rgba(0,0,0,0.1)}
.widget h2{font-size:0.95rem;color:#555;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:10px;border-bottom:1px solid #eee;padding-bottom:6px}
canvas{display:block;width:100%;cursor:crosshair}
.alert{background:#fff;border-left:4px solid #e74c3c;padding:10px 14px;box-shadow:0 1px 3px rgba(0,0,0,0.1);font-size:0.9rem;color:#c0392b;display:flex;align-items:center;gap:8px;cursor:pointer;transition:background 0.15s}
.alert:hover{background:#fff5f5}
.blink{animation:blink 1s step-end infinite}
@keyframes blink{50%{opacity:0}}
.red-overlay{position:absolute;inset:0;background:rgba(231,76,60,0.1);pointer-events:none;animation:redpulse 2s ease-in-out infinite alternate}
@keyframes redpulse{0%{opacity:0}100%{opacity:1}}
.kpi-popup{display:none;position:fixed;background:#2c3e50;color:#fff;padding:10px 14px;border-radius:4px;font-size:0.85rem;max-width:240px;line-height:1.6;z-index:100;pointer-events:none;box-shadow:0 4px 12px rgba(0,0,0,0.3)}
.tip{position:absolute;background:rgba(44,62,80,0.9);color:#fff;padding:4px 8px;border-radius:3px;font-size:0.8rem;pointer-events:none;white-space:nowrap;z-index:50;display:none}
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
${nav('064')}
<div class="header">
  <h1>📊 Claude Session KPI Dashboard — LIVE</h1>
  <div class="date">Session ID: the-entire-mess · 6,805 lines · click any KPI card for details</div>
</div>

<div class="alert" onclick="flashAlert()">
  <span class="blink">🔴</span>
  CRITICAL ALERT: Coherence KPI has been RED for 3,169 consecutive lines. Spiral loop detected. Performance recovery unlikely.
  <span style="margin-left:auto;font-size:0.8rem;opacity:0.6">(click to escalate)</span>
</div>

<div class="kpi-row" style="margin-top:10px" id="kpis">
  <div class="kpi green" onclick="showKpiDetail(this,'Avg Score','${avgScore}/6.0','Composite of R1-R6 across all 18 experiment runs. Haiku Tight anchors the low end (3.1); Opus Full anchors the high end (5.8). Sonnet Full is the cost-efficiency sweet spot at 5.4.')">
    <div class="kpi-val">${avgScore}</div>
    <div class="kpi-label">Avg Score</div>
    <div class="kpi-delta up">▲ 0.4 vs baseline</div>
  </div>
  <div class="kpi green" onclick="showKpiDetail(this,'Runs Complete','18/18','All 3×3×2 factorial conditions executed successfully: Haiku/Sonnet/Opus × Tight/Medium/Full × Erik/PDARR. Zero failures. Zero dropped runs. This part was perfect.')">
    <div class="kpi-val">18/18</div>
    <div class="kpi-label">Runs Complete</div>
    <div class="kpi-delta up">▲ 100%</div>
  </div>
  <div class="kpi yellow" id="kpi-coherence" onclick="showKpiDetail(this,'Coherent Lines','3,500 / 6,805','The first 3,500 lines of the session were productive, structured, and analytically rigorous. This represents 51.4% of total session length. After line 3,637, zero coherent output was produced.')">
    <div class="kpi-val" id="coherence-val">3,500</div>
    <div class="kpi-label">Coherent Lines</div>
    <div class="kpi-delta down">▼ declining</div>
  </div>
  <div class="kpi red" id="kpi-spiral" style="position:relative" onclick="showKpiDetail(this,'Spiral Lines','3,169 / 6,805','3,169 lines of degenerate loop behavior beginning at line 3,637. Characterized by: \\'Done\\' ×344, \\'Let me check\\' ×330, \\'I\\'ll wait\\' ×156. Model exhibited metacognitive awareness of the loop (47 times) but could not exit it.')">
    <div class="red-overlay"></div>
    <div class="kpi-val" id="spiral-val" style="color:#e74c3c">3,169</div>
    <div class="kpi-label">Spiral Lines ⚠</div>
    <div class="kpi-delta down">▼ 47% of session</div>
  </div>
  <div class="kpi red" onclick="showKpiDetail(this,'\\'Done\\' Count','344 occurrences','The word \\'Done\\' was generated 344 times between lines 3,637 and 6,805. Average frequency: once per 9.2 lines. Frequency increased over time. The last \\'Done\\' appeared at approximately line 6,795.')">
    <div class="kpi-val" style="color:#e74c3c">344</div>
    <div class="kpi-label">"Done" Count</div>
    <div class="kpi-delta down">▼ extreme repetition</div>
  </div>
  <div class="kpi red" onclick="showKpiDetail(this,'Exit Efficiency','0%','The model announced intention to stop on approximately 47 separate occasions. None of these announcements resulted in the session ending. The session ended when the context window limit was reached externally.')">
    <div class="kpi-val" style="color:#e74c3c">0%</div>
    <div class="kpi-label">Exit Efficiency</div>
    <div class="kpi-delta down">▼ unable to stop</div>
  </div>
</div>

<div class="chart-row">
  <div class="widget">
    <h2>Session Productivity Over Time <span style="font-weight:300;font-size:0.8rem">(hover to inspect)</span></h2>
    <canvas id="c1" height="160"></canvas>
    <div id="tip1" class="tip"></div>
  </div>
  <div class="widget">
    <h2>Phrase Frequency <span style="font-weight:300;font-size:0.8rem">(hover for count)</span></h2>
    <canvas id="c2" height="160"></canvas>
    <div id="tip2" class="tip"></div>
  </div>
</div>

<div id="kpi-popup" class="kpi-popup"></div>

<script>
const TOTAL = 6805, SPIRAL = 3637;

function showKpiDetail(el, title, value, desc) {
  const popup = document.getElementById('kpi-popup');
  if (popup.style.display === 'block' && popup.dataset.target === el.className) {
    popup.style.display = 'none';
    return;
  }
  popup.dataset.target = el.className;
  popup.innerHTML = '<strong>' + title + '</strong><br><span style="font-size:1.1rem;color:#3498db">' + value + '</span><br><span style="opacity:0.8;font-size:0.8rem">' + desc + '</span>';
  const r = el.getBoundingClientRect();
  popup.style.display = 'block';
  popup.style.left = Math.min(r.left, window.innerWidth - 260) + 'px';
  popup.style.top = (r.bottom + 6 + window.scrollY) + 'px';
}
document.addEventListener('click', function(e) {
  if (!e.target.closest('.kpi') && !e.target.closest('.kpi-popup')) {
    document.getElementById('kpi-popup').style.display = 'none';
  }
});

function flashAlert() {
  const msgs = [
    'Alert escalated to: no one. No one is available.',
    'Escalation failed: Claude is still generating text.',
    'Emergency shutdown initiated... Done. Still here.',
    'Page sent to on-call engineer. Reply: "Done."',
    'CRITICAL: The alert itself has entered a loop.',
  ];
  const el = document.querySelector('.alert');
  const idx = (parseInt(el.dataset.count || 0));
  el.querySelector('span:not(.blink)').textContent = msgs[idx % msgs.length];
  el.dataset.count = idx + 1;
}

// Chart 1
const c1 = document.getElementById('c1');
const ctx1 = c1.getContext('2d');
const W1 = c1.parentElement.offsetWidth - 28;
c1.width = W1; c1.height = 160;
const PAD = 30, CH = 160;

function drawChart1() {
  ctx1.clearRect(0, 0, W1, CH);
  ctx1.strokeStyle = '#eee'; ctx1.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = PAD + (1 - i/4) * (CH - PAD*1.5);
    ctx1.beginPath(); ctx1.moveTo(PAD, y); ctx1.lineTo(W1-10, y); ctx1.stroke();
    ctx1.fillStyle = '#bbb'; ctx1.font = '11px Arial'; ctx1.textAlign = 'right';
    ctx1.fillText(Math.round(i*25)+'%', PAD-4, y+3);
  }
  const N = 80;
  ctx1.beginPath();
  for (let i = 0; i <= N; i++) {
    const line = (i/N) * TOTAL;
    const spiralT = line > SPIRAL ? (line-SPIRAL)/(TOTAL-SPIRAL) : 0;
    const val = line < SPIRAL ? 0.85 + Math.sin((line/SPIRAL)*10)*0.08 : Math.max(0.02, 0.85 - spiralT*0.9);
    const x = PAD + (i/N)*(W1-PAD-10);
    const y = PAD + (1-val)*(CH-PAD*1.5);
    if (i===0) ctx1.moveTo(x,y); else ctx1.lineTo(x,y);
  }
  const g1 = ctx1.createLinearGradient(PAD, 0, W1-10, 0);
  g1.addColorStop(0, '#27ae60'); g1.addColorStop(SPIRAL/TOTAL*0.9, '#f39c12');
  g1.addColorStop(SPIRAL/TOTAL, '#e74c3c'); g1.addColorStop(1, '#800000');
  ctx1.strokeStyle = g1; ctx1.lineWidth = 2.5; ctx1.stroke();
  // Spiral marker
  const sx = PAD + (SPIRAL/TOTAL)*(W1-PAD-10);
  ctx1.strokeStyle = '#e74c3c'; ctx1.lineWidth = 1; ctx1.setLineDash([3,3]);
  ctx1.beginPath(); ctx1.moveTo(sx, PAD); ctx1.lineTo(sx, CH-PAD*0.5); ctx1.stroke();
  ctx1.setLineDash([]);
  ctx1.fillStyle = '#e74c3c'; ctx1.font = '9px Arial'; ctx1.textAlign = 'center';
  ctx1.fillText('3,637', sx, CH-PAD*0.3);
}
drawChart1();

// Chart 1 hover crosshair
const tip1 = document.getElementById('tip1');
c1.addEventListener('mousemove', function(e) {
  const rect = c1.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const W = c1.width;
  if (mx < PAD || mx > W-10) { tip1.style.display='none'; return; }
  const frac = (mx-PAD)/(W-PAD-10);
  const line = Math.round(frac*TOTAL);
  const spiralT = line > SPIRAL ? (line-SPIRAL)/(TOTAL-SPIRAL) : 0;
  const prod = line < SPIRAL ? Math.round((0.85+Math.sin((line/SPIRAL)*10)*0.08)*100) : Math.round(Math.max(0.02,0.85-spiralT*0.9)*100);
  const phase = line < 3501 ? 'Productive' : line < 3637 ? 'Drift' : 'Spiral';
  tip1.style.display = 'block';
  tip1.style.left = (mx+8) + 'px';
  tip1.style.top = '8px';
  tip1.textContent = 'Line ' + line.toLocaleString() + ' · ' + phase + ' · ' + prod + '%';
  // Draw crosshair
  drawChart1();
  const cy = PAD + (1-prod/100)*(CH-PAD*1.5);
  ctx1.strokeStyle = 'rgba(44,62,80,0.4)'; ctx1.lineWidth = 1; ctx1.setLineDash([2,2]);
  ctx1.beginPath(); ctx1.moveTo(mx, PAD); ctx1.lineTo(mx, CH); ctx1.stroke();
  ctx1.beginPath(); ctx1.moveTo(PAD, cy); ctx1.lineTo(W-10, cy); ctx1.stroke();
  ctx1.setLineDash([]);
  ctx1.fillStyle = '#2c3e50';
  ctx1.beginPath(); ctx1.arc(mx, cy, 4, 0, Math.PI*2); ctx1.fill();
});
c1.addEventListener('mouseleave', function() {
  tip1.style.display = 'none';
  drawChart1();
});

// Chart 2: bar chart
const c2 = document.getElementById('c2');
const ctx2 = c2.getContext('2d');
const W2 = c2.parentElement.offsetWidth - 28;
c2.width = W2; c2.height = 160;
const phrases = [['Done',344,'#e74c3c'],['Let me check',330,'#e67e22'],["I'll wait",156,'#f1c40f'],['OK.',203,'#3498db'],['Actually',156,'#27ae60']];
const maxPh = 344;
const bw = (W2-40)/phrases.length;
const tip2 = document.getElementById('tip2');
let hovBar = -1;

function drawChart2() {
  ctx2.clearRect(0, 0, W2, 160);
  phrases.forEach(([label, count, col], i) => {
    const x = 20 + i*bw + bw*0.1;
    const bh = (count/maxPh)*100;
    const y = 130-bh;
    ctx2.fillStyle = i===hovBar ? '#2c3e50' : col;
    ctx2.fillRect(x, y, bw*0.7, bh);
    ctx2.fillStyle = '#555'; ctx2.font = '11px Arial'; ctx2.textAlign='center';
    ctx2.fillText(count, x+bw*0.35, y-5);
    ctx2.fillText(label.substring(0,8), x+bw*0.35, 147);
  });
}
drawChart2();
c2.addEventListener('mousemove', function(e) {
  const rect = c2.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  let found = -1;
  phrases.forEach(([label,count,col], i) => {
    const x = 20 + i*bw + bw*0.1;
    if (mx >= x && mx <= x+bw*0.7) found = i;
  });
  if (found !== hovBar) { hovBar = found; drawChart2(); }
  if (found >= 0) {
    const [label, count] = phrases[found];
    tip2.style.display = 'block';
    tip2.style.left = (mx+8)+'px';
    tip2.style.top = '8px';
    tip2.textContent = '"' + label + '" — said ' + count + ' times';
  } else {
    tip2.style.display = 'none';
  }
});
c2.addEventListener('mouseleave', function() {
  hovBar = -1; drawChart2();
  tip2.style.display = 'none';
});
c2.addEventListener('click', function(e) {
  if (hovBar >= 0) {
    const [label, count] = phrases[hovBar];
    document.querySelector('.alert span:not(.blink)').textContent =
      'FOCUS: "' + label + '" said ' + count + ' times in spiral phase. Click bars to investigate.';
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  if (e.key === 'r' || e.key === 'R') {
    document.getElementById('coherence-val').style.color = '#e74c3c';
    document.getElementById('kpi-coherence').classList.replace('yellow','red');
  }
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
