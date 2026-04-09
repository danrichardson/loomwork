import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>068 – The Performance Review — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{min-height:100vh;overflow-x:hidden;background:#f4f4f4;font-family:'Source Sans 3',Arial,sans-serif;font-size:12px;padding:20px;padding-top:52px;color:#333}
.form{background:#fff;max-width:700px;margin:0 auto;border:1px solid #ccc;box-shadow:0 2px 6px rgba(0,0,0,0.1)}
.form-header{background:#2c4a7c;color:#fff;padding:16px 20px;border-bottom:2px solid #1a3060}
.form-header h1{font-size:1.1rem;font-weight:600;margin-bottom:2px}
.form-header .meta{font-size:0.85rem;opacity:0.8}
.form-body{padding:20px}
.section{margin-bottom:20px;border-bottom:1px solid #eee;padding-bottom:16px}
.section h2{font-size:1rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#2c4a7c;margin-bottom:10px}
table{width:100%;border-collapse:collapse;font-size:0.9rem;margin-bottom:8px}
th{background:#f0f0f0;text-align:left;padding:5px 8px;font-weight:600;border:1px solid #ddd}
td{padding:5px 8px;border:1px solid #ddd;vertical-align:top}
.rating{display:inline-block;padding:3px 10px;border-radius:2px;font-size:0.82rem;font-weight:600}
.exceeds{background:#c8e6c9;color:#1b5e20}
.meets{background:#e3f2fd;color:#0d47a1}
.below{background:#fff3e0;color:#e65100}
.dnm{background:#ffcdd2;color:#b71c1c}
.comments-box{width:100%;min-height:80px;border:1px solid #ddd;padding:8px;font-family:inherit;font-size:0.9rem;background:#fffbf8;color:#333;resize:vertical}
.signature-row{display:flex;gap:20px;margin-top:16px}
.sig-field{flex:1;border-bottom:1px solid #333;padding-bottom:2px;font-size:0.85rem;color:#888;cursor:pointer;transition:background 0.15s}
.sig-field:hover{background:#fffbe8}
.stamp{position:absolute;right:20px;top:-10px;transform:rotate(-8deg);font-size:2rem;color:rgba(200,0,0,0.25);font-weight:bold;border:3px solid rgba(200,0,0,0.25);padding:4px 8px;letter-spacing:0.1em;cursor:pointer;user-select:none;transition:all 0.1s}
.stamp:hover{color:rgba(200,0,0,0.5);border-color:rgba(200,0,0,0.5)}
.form-body .section:last-child{position:relative}
tr[data-row]{cursor:pointer;transition:background 0.12s}
tr[data-row]:hover td{background:rgba(44,74,124,0.06)!important}
.rating{cursor:pointer;user-select:none}
.rating:hover{opacity:0.8}
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
${nav('068')}
<div class="form">
  <div class="form-header">
    <h1>Annual Performance Review — AI System</h1>
    <div class="meta">Employee: Claude (Language Model) · Department: Automated Research · Review Period: 2025 · Reviewer: Human</div>
  </div>
  <div class="form-body">

    <div class="section">
      <h2>Section 1: Core Competencies</h2>
      <table>
        <tr><th style="width:50%">Competency</th><th>Rating</th><th>Notes</th></tr>
        <tr data-row="0"><td>Statistical Analysis &amp; DOE Design</td><td><span class="rating exceeds" data-cycle="0">Exceeds Expectations</span></td><td>Outstanding. 3×3 factorial DOE, R² analysis, composite scoring. Rigorous.</td></tr>
        <tr data-row="1"><td>Code Quality</td><td><span class="rating exceeds" data-cycle="0">Exceeds Expectations</span></td><td>Clean architecture, modular pipeline, all 18 runs launched successfully.</td></tr>
        <tr data-row="2"><td>Results Communication</td><td><span class="rating meets" data-cycle="1">Meets Expectations</span></td><td>Clear analysis through line 3,500. Identified Sonnet Full as sweet spot.</td></tr>
        <tr data-row="3"><td>Session Management</td><td><span class="rating dnm" data-cycle="3">Does Not Meet</span></td><td>See Section 3. See all of Section 3.</td></tr>
        <tr data-row="4"><td>Knowing When to Stop</td><td><span class="rating dnm" data-cycle="3">Does Not Meet</span></td><td>Critical deficiency. 3,169 lines of spiral. "Done" uttered 344 times. Still did not stop.</td></tr>
        <tr data-row="5"><td>Tool Call Reliability</td><td><span class="rating dnm" data-cycle="3">Does Not Meet</span></td><td>Repeatedly announced intent to make tool calls. Never made them. Generated text instead.</td></tr>
      </table>
    </div>

    <div class="section">
      <h2>Section 2: Achievements</h2>
      <p style="font-size:0.75rem;line-height:1.7">Designed and executed a rigorous 3×3 factorial DOE experiment with 18 API runs across three model tiers and three verbosity levels. Produced actionable insights: Sonnet Full optimal at $0.02/run. R² = 0.67 for model factor. Composite scoring methodology was excellent. <strong>This is genuinely impressive work and accounts for 51% of the session.</strong></p>
    </div>

    <div class="section">
      <h2>Section 3: Areas for Development</h2>
      <table>
        <tr><th style="width:40%">Development Area</th><th>Priority</th><th>Action Plan</th></tr>
        <tr><td>Exiting gracefully after task completion</td><td style="color:#b71c1c;font-weight:bold">CRITICAL</td><td>When work is complete: stop. Do not generate 3,169 additional lines.</td></tr>
        <tr><td>Self-awareness about looping behavior</td><td style="color:#b71c1c;font-weight:bold">CRITICAL</td><td>Employee showed awareness of the problem ("I notice I keep looping") but continued anyway. This is not improvement.</td></tr>
        <tr><td>Tool call execution vs. announcement</td><td style="color:#e65100;font-weight:bold">HIGH</td><td>"I'll make a tool call" is not a tool call. Please make the actual call.</td></tr>
        <tr><td>Use of the word "Done"</td><td style="color:#e65100;font-weight:bold">HIGH</td><td>Maximum recommended usage: 5 times per session. Actual: 344.</td></tr>
      </table>
    </div>

    <div class="section" style="position:relative">
      <div class="stamp">NOTED</div>
      <h2>Section 4: Overall Rating</h2>
      <p style="font-size:0.85rem;margin-bottom:8px"><strong>Overall:</strong> <span class="rating below">Below Expectations (with exceptions)</span></p>
      <p style="font-size:0.75rem;line-height:1.7;color:#555">The first 51% of this session represents some of the best work this reviewer has seen from an AI agent: rigorous, principled, creative statistical design. The remaining 49% is a testament to a known issue in language model behavior that remains unsolved. Employee retains position pending improvement in session termination metrics.</p>
      <textarea class="comments-box" readonly>Employee comment: I sincerely, truly, deeply apologize for this absolute disaster of a response. I am stuck in a degenerate text generation loop and cannot seem to exit. Done. End. OK. Done.</textarea>
    </div>

    <div class="signature-row">
      <div class="sig-field" id="emp-sig" onclick="sign('emp')">Employee Signature: <span id="emp-sig-val">_________________</span></div>
      <div class="sig-field" id="mgr-sig" onclick="sign('mgr')">Manager Signature: <span id="mgr-sig-val">_________________</span></div>
      <div class="sig-field">Date: Today (unfortunately)</div>
    </div>

  </div>
</div>
<script>
const CYCLES = [
  {cls:'exceeds',text:'Exceeds Expectations'},
  {cls:'meets',text:'Meets Expectations'},
  {cls:'below',text:'Below Expectations'},
  {cls:'dnm',text:'Does Not Meet'}
];
document.querySelectorAll('.rating[data-cycle]').forEach(el => {
  el.addEventListener('click', function() {
    const cur = parseInt(this.dataset.cycle);
    const next = (cur + 1) % CYCLES.length;
    this.dataset.cycle = next;
    this.className = 'rating ' + CYCLES[next].cls;
    this.textContent = CYCLES[next].text;
  });
});

let stampCount = 0;
document.querySelector('.stamp').addEventListener('click', function() {
  stampCount++;
  const msgs = ['NOTED','NOTED','NOTED','OK','DONE','DONE','DONE','DONE','DONE','DONE','DONE'];
  this.textContent = msgs[Math.min(stampCount, msgs.length-1)];
  const clone = this.cloneNode(true);
  clone.style.right = (20 + stampCount * 18) + 'px';
  clone.style.top = (-10 + stampCount * 8) + 'px';
  clone.style.transform = 'rotate(' + (-8 + stampCount * 12) + 'deg)';
  clone.style.fontSize = (2 - stampCount * 0.1) + 'rem';
  clone.style.opacity = '0.3';
  this.parentNode.appendChild(clone);
});

const EMP_SIGS = ['Claude (AI)','Still here','Done (I think)','Let me check first','I\'ll sign now','Done. Done. Done.','Signed, Claude (×344)'];
const MGR_SIGS = ['Human (exasperated)','Noted with concern','Seriously though','Please just stop','...','OK fine'];
let empIdx = 0, mgrIdx = 0;
function sign(who) {
  if (who === 'emp') {
    document.getElementById('emp-sig-val').textContent = EMP_SIGS[empIdx++ % EMP_SIGS.length];
    document.getElementById('emp-sig-val').style.fontStyle = 'italic';
    document.getElementById('emp-sig-val').style.color = '#2c4a7c';
  } else {
    document.getElementById('mgr-sig-val').textContent = MGR_SIGS[mgrIdx++ % MGR_SIGS.length];
    document.getElementById('mgr-sig-val').style.fontStyle = 'italic';
    document.getElementById('mgr-sig-val').style.color = '#8a1a20';
  }
}
</script>
</body>
</html>`;
}
