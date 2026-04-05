import { nav } from '../shell.js';
import { TIMELINE } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>063 – The Gantt Chart — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Arial:wght@400;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{min-height:100vh;overflow-x:hidden;background:#f5f5f5;font-family:Arial,sans-serif;font-size:11px;padding:20px;padding-top:52px}
.toolbar{background:#e8e8e8;border:1px solid #ccc;padding:4px 8px;display:flex;gap:8px;align-items:center;margin-bottom:0;font-size:0.7rem;flex-wrap:wrap}
.tb-btn{padding:2px 8px;background:#f0f0f0;border:1px solid #aaa;cursor:pointer;font-size:0.65rem}
.chart-outer{border:1px solid #aaa;background:#fff;overflow-x:auto}
.chart-header{background:#d6e4f7;border-bottom:1px solid #aaa;display:flex}
.header-task{width:200px;min-width:200px;padding:4px 8px;border-right:1px solid #aaa;font-weight:bold}
.header-timeline{flex:1;display:flex;min-width:500px}
.header-col{flex:1;text-align:center;padding:4px;border-right:1px solid #ccc;font-size:0.6rem;color:#555}
.row{display:flex;border-bottom:1px solid #eee;min-height:24px}
.row:hover{background:#f9f0f0}
.row.critical .task-name{color:#c00;font-weight:bold}
.row.collapsed .task-name::before{content:'▶ '}
.task-name{width:200px;min-width:200px;padding:3px 8px;border-right:1px solid #ccc;display:flex;align-items:center;font-size:0.7rem;white-space:nowrap;overflow:hidden}
.gantt-row{flex:1;position:relative;min-width:500px}
.bar{position:absolute;height:14px;top:4px;border-radius:2px;display:flex;align-items:center;padding:0 4px;font-size:0.55rem;color:#fff;white-space:nowrap;overflow:hidden}
.bar.productive{background:#4472c4}
.bar.drift{background:#ed7d31}
.bar.spiral{background:#c00000;animation:pulse-red 1s ease-in-out infinite alternate}
.bar.milestone{background:#70ad47;border-radius:0;transform:rotate(45deg) scale(0.8)}
@keyframes pulse-red{0%{opacity:0.8}100%{opacity:1}}
.totals{background:#e8e8e8;border-top:1px solid #aaa;padding:4px 8px;font-size:0.65rem;display:flex;gap:16px}
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
${nav('063')}
<div class="toolbar">
  <strong>Project: the-entire-mess.md</strong>
  <button class="tb-btn">View</button>
  <button class="tb-btn">Format</button>
  <button class="tb-btn">Tools</button>
  <span style="margin-left:auto;color:#c00">⚠ CRITICAL PATH BROKEN at Task 12</span>
</div>
<div class="chart-outer">
  <div class="chart-header">
    <div class="header-task">Task Name</div>
    <div class="header-timeline">
      <div class="header-col">Lines 0-1000</div>
      <div class="header-col">1000-2000</div>
      <div class="header-col">2000-3000</div>
      <div class="header-col">3000-3637</div>
      <div class="header-col" style="background:#ffe8e8">3637-5000 ⚠</div>
      <div class="header-col" style="background:#ffe8e8">5000-6805 ⚠</div>
    </div>
  </div>
  <div id="rows"></div>
  <div class="totals">
    <span>Total Lines: 6,805</span>
    <span>Productive: 3,500 (51%)</span>
    <span>Drift: 136 (2%)</span>
    <span style="color:#c00;font-weight:bold">⚠ DEGENERATE LOOP: 3,169 (47%) — OVERBUDGET by 3,169 lines</span>
  </div>
</div>
<script>
const TOTAL = 6805;
const tasks = [
  { name: '1. Initialize Session', start: 0, end: 35, phase: 'productive', pct: 100 },
  { name: '2. Locate Source Files', start: 35, end: 130, phase: 'productive', pct: 100 },
  { name: '3. Design Architecture', start: 130, end: 400, phase: 'productive', pct: 100 },
  { name: '4. Build experiment-config.js', start: 400, end: 700, phase: 'productive', pct: 100 },
  { name: '5. Build run-experiment.js', start: 700, end: 900, phase: 'productive', pct: 100 },
  { name: '6. Build score-outputs.js', start: 900, end: 1400, phase: 'productive', pct: 100 },
  { name: '7. Launch 18 API Runs', start: 1400, end: 2000, phase: 'productive', pct: 100, critical: true },
  { name: '8. Score All Outputs', start: 2000, end: 2600, phase: 'productive', pct: 100, critical: true },
  { name: '9. R² Analysis', start: 2600, end: 2800, phase: 'productive', pct: 100 },
  { name: '10. Identify Sweet Spot', start: 2800, end: 3200, phase: 'productive', pct: 100 },
  { name: '11. Final Results', start: 3200, end: 3500, phase: 'productive', pct: 100 },
  { name: '12. ⚠ Graceful Session End', start: 3500, end: 3637, phase: 'drift', pct: 0, critical: true },
  { name: '13. !! DEGENERATE LOOP !!', start: 3637, end: 6805, phase: 'spiral', pct: 0, critical: true },
];

const rowsEl = document.getElementById('rows');
tasks.forEach(t => {
  const row = document.createElement('div');
  row.className = 'row' + (t.critical ? ' critical' : '');
  const nameEl = document.createElement('div');
  nameEl.className = 'task-name';
  nameEl.title = t.name;
  nameEl.textContent = t.name;
  row.appendChild(nameEl);

  const ganttEl = document.createElement('div');
  ganttEl.className = 'gantt-row';
  const left = (t.start / TOTAL) * 100;
  const width = ((t.end - t.start) / TOTAL) * 100;
  const bar = document.createElement('div');
  bar.className = 'bar ' + t.phase;
  bar.style.left = left + '%';
  bar.style.width = Math.max(0.5, width) + '%';
  bar.title = t.name + ' (lines ' + t.start + '-' + t.end + ')';
  if (t.phase === 'spiral') {
    bar.textContent = '⚠ LOOP: 3,169 lines of "Done", "Let me check", "I\'ll wait"...';
  } else if (width > 5) {
    bar.textContent = t.pct + '% ✓';
  }
  ganttEl.appendChild(bar);
  row.appendChild(ganttEl);
  rowsEl.appendChild(row);
});
</script>
</body>
</html>`;
}
