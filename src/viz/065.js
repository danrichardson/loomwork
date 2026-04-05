import { nav } from '../shell.js';
import { PHRASE_COUNTS, PHASE_COUNTS } from '../data.js';

export function render() {
  const phrases = Object.entries(PHRASE_COUNTS);
  const phases = ['Productive', 'Drift', 'Spiral'];

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>065 – The Pivot Table — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#fff;font-family:Calibri,Arial,sans-serif;font-size:13px;padding:20px;padding-top:52px;min-height:100vh}
h1{font-size:1rem;color:#333;margin-bottom:8px}
.pivot-wrapper{overflow-x:auto;margin-bottom:12px}
table{border-collapse:collapse;font-size:13px;min-width:600px;width:100%}
th,td{border:1px solid #bfbfbf;padding:3px 8px;white-space:nowrap}
th{background:#dce6f1;font-weight:bold;text-align:center;cursor:pointer;user-select:none;transition:background 0.1s}
th:hover{background:#bcd2e8}
th.row-header{background:#e2efda;text-align:left}
th.sort-asc::after{content:' ▲'}
th.sort-desc::after{content:' ▼'}
td{text-align:right;cursor:pointer;transition:background 0.1s}
td:hover{filter:brightness(0.92)}
td.row-label{text-align:left;background:#f2f2f2;font-weight:bold;cursor:default}
td.row-label:hover{filter:none}
td.subtotal{background:#fce4d6;font-weight:bold}
td.grand-total{background:#dce6f1;font-weight:bold}
td.zero{color:#bbb}
td.high{background:#c6efce;color:#276221}
td.medium{background:#ffeb9c;color:#9c6500}
td.extreme{background:#ffc7ce;color:#9c0006;font-weight:bold}
tr.row-selected td{outline:2px solid #4472c4;outline-offset:-1px}
.slicer{display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap;align-items:center}
.slicer-btn{padding:4px 12px;border:1px solid #aaa;background:#f5f5f5;cursor:pointer;font-size:0.9rem;transition:background 0.1s}
.slicer-btn:hover{background:#e8e8e8}
.slicer-btn.active{background:#dce6f1;border-color:#4472c4}
.field-list{background:#f5f5f5;border:1px solid #ddd;padding:6px 10px;margin-bottom:8px;font-size:0.85rem;color:#555}
.field-list strong{color:#222;font-size:0.9rem}
.tooltip{position:fixed;background:#2c3e50;color:#fff;padding:6px 10px;border-radius:3px;font-size:0.82rem;line-height:1.5;pointer-events:none;display:none;z-index:50;max-width:220px}
.status{font-size:0.75rem;color:#888;margin-top:4px;min-height:16px}
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
${nav('065')}
<h1>065 — PivotTable: Phrase × Phase × Count</h1>
<div class="field-list">
  <strong>Fields:</strong> Phrase (rows) · Phase (columns) · Count (values) · <em>click cells for detail · click headers to sort · click rows to highlight · arrow keys navigate</em>
</div>
<div class="slicer">
  <strong style="font-size:0.65rem">Filter:</strong>
  <button class="slicer-btn active" onclick="filterPhrase('all',this)">All phrases</button>
  <button class="slicer-btn" onclick="filterPhrase('spiral',this)">Spiral heavy (>50)</button>
  <button class="slicer-btn" onclick="filterPhrase('productive',this)">Productive-only (≤50)</button>
  <button class="slicer-btn" onclick="filterPhrase('extreme',this)">Extreme only (>200)</button>
</div>
<div class="pivot-wrapper">
<table id="pivot">
  <thead>
    <tr>
      <th class="row-header" onclick="sortBy(-1)">Phrase ▼</th>
      <th onclick="sortBy(0)">Productive<br>(lines 0-3500)</th>
      <th onclick="sortBy(1)">Drift<br>(3501-3636)</th>
      <th onclick="sortBy(2)">Spiral<br>(3637-6805)</th>
      <th class="grand-total" onclick="sortBy(3)">Grand Total</th>
    </tr>
  </thead>
  <tbody id="tbody"></tbody>
  <tfoot id="tfoot"></tfoot>
</table>
</div>
<div class="status" id="status">Click a cell to see details.</div>
<div class="tooltip" id="tooltip"></div>

<script>
const PHRASES = ${JSON.stringify(phrases)};
let currentFilter = 'all';
let sortCol = -2, sortDir = 1;
let selectedRow = -1;

function distribute(phrase, totalCount) {
  const isSpiral = totalCount > 50;
  const productive = isSpiral ? Math.round(totalCount * 0.02) : Math.round(totalCount * 0.5);
  const drift = isSpiral ? Math.round(totalCount * 0.05) : Math.round(totalCount * 0.3);
  const spiral = totalCount - productive - drift;
  return [productive, drift, spiral];
}

function cellClass(val, max) {
  if (val === 0) return 'zero';
  if (val > max * 0.7) return 'extreme';
  if (val > max * 0.3) return 'medium';
  return 'high';
}

function filterPhrase(f, btn) {
  currentFilter = f;
  document.querySelectorAll('.slicer-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedRow = -1;
  build();
}

function build() {
  const tbody = document.getElementById('tbody');
  const tfoot = document.getElementById('tfoot');
  tbody.innerHTML = ''; tfoot.innerHTML = '';
  let totProd = 0, totDrift = 0, totSpiral = 0;

  let allPhrases = PHRASES.filter(([p, c]) => {
    if (currentFilter === 'spiral') return c > 50;
    if (currentFilter === 'productive') return c <= 50;
    if (currentFilter === 'extreme') return c > 200;
    return true;
  });

  // Build data with distributed counts
  let rows = allPhrases.map(([phrase, count]) => {
    const [prod, drift, spiral] = distribute(phrase, count);
    return { phrase, count, prod, drift, spiral };
  });

  // Sort
  if (sortCol === -1) rows.sort((a,b) => sortDir * a.phrase.localeCompare(b.phrase));
  else if (sortCol === 0) rows.sort((a,b) => sortDir * (b.prod - a.prod));
  else if (sortCol === 1) rows.sort((a,b) => sortDir * (b.drift - a.drift));
  else if (sortCol === 2) rows.sort((a,b) => sortDir * (b.spiral - a.spiral));
  else if (sortCol === 3) rows.sort((a,b) => sortDir * (b.count - a.count));

  const maxCount = Math.max(...rows.map(r => r.count));

  rows.forEach((r, idx) => {
    totProd += r.prod; totDrift += r.drift; totSpiral += r.spiral;
    const tr = document.createElement('tr');
    tr.dataset.idx = idx;
    if (idx === selectedRow) tr.classList.add('row-selected');
    tr.innerHTML =
      '<td class="row-label">' + r.phrase + '</td>' +
      '<td class="' + cellClass(r.prod, maxCount) + '" data-val="' + r.prod + '" data-desc="' + r.phrase + ' in Productive phase: ' + r.prod + ' times (estimated)">' + (r.prod || '<span class="zero">—</span>') + '</td>' +
      '<td class="' + cellClass(r.drift, maxCount) + '" data-val="' + r.drift + '" data-desc="' + r.phrase + ' in Drift phase: ' + r.drift + ' times (estimated)">' + (r.drift || '<span class="zero">—</span>') + '</td>' +
      '<td class="' + (r.spiral > 100 ? 'extreme' : cellClass(r.spiral, maxCount)) + '" data-val="' + r.spiral + '" data-desc="' + r.phrase + ' in Spiral phase: ' + r.spiral + ' times — ' + (r.spiral > 100 ? 'EXTREME frequency' : 'moderate') + '">' + r.spiral + '</td>' +
      '<td class="subtotal" data-val="' + r.count + '" data-desc="Total for &quot;' + r.phrase + '&quot;: ' + r.count + ' occurrences across all phases">' + r.count + '</td>';
    tr.addEventListener('click', function(e) {
      if (e.target.closest('td.row-label')) {
        // Select row
        selectedRow = selectedRow === idx ? -1 : idx;
        build();
        return;
      }
      const td = e.target.closest('td[data-desc]');
      if (td) {
        document.getElementById('status').textContent = td.dataset.desc;
      }
    });
    tr.addEventListener('mouseover', function(e) {
      const td = e.target.closest('td[data-desc]');
      if (td) showTip(e, td.dataset.desc);
    });
    tr.addEventListener('mouseout', hideTip);
    tbody.appendChild(tr);
  });

  const grandTotal = totProd + totDrift + totSpiral;
  tfoot.innerHTML =
    '<tr><td class="row-label">Grand Total</td>' +
    '<td class="grand-total">' + totProd + '</td>' +
    '<td class="grand-total">' + totDrift + '</td>' +
    '<td class="grand-total extreme">' + totSpiral + '</td>' +
    '<td class="grand-total">' + grandTotal + '</td></tr>';
}

function sortBy(col) {
  if (sortCol === col) sortDir = -sortDir;
  else { sortCol = col; sortDir = -1; }
  // Update header classes
  document.querySelectorAll('#pivot th').forEach((th, i) => {
    th.classList.remove('sort-asc','sort-desc');
    const thCol = i === 0 ? -1 : i-1;
    if (thCol === col) th.classList.add(sortDir > 0 ? 'sort-asc' : 'sort-desc');
  });
  build();
}

const tip = document.getElementById('tooltip');
function showTip(e, text) {
  tip.textContent = text;
  tip.style.display = 'block';
  tip.style.left = (e.clientX + 12) + 'px';
  tip.style.top = (e.clientY + 12) + 'px';
}
function hideTip() { tip.style.display = 'none'; }
document.addEventListener('mousemove', function(e) {
  if (tip.style.display === 'block') {
    tip.style.left = (e.clientX + 12) + 'px';
    tip.style.top = (e.clientY + 12) + 'px';
  }
});

build();
</script>
</body>
</html>`;
}
