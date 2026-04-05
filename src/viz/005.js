import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>005 – The Variance Waterfall — Claude Lost Its Mind</title>
<link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,400&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#1a1209;color:#e8d5aa;font-family:'Merriweather',serif;min-height:100vh;padding:30px 20px}
h1{font-size:1.5rem;color:#f5c842;margin-bottom:4px}
.subtitle{font-size:0.75rem;color:#8a7040;font-style:italic;margin-bottom:30px}
.chart{max-width:700px;margin:0 auto}
.bar-group{margin-bottom:22px}
.label{font-family:'Roboto Mono',monospace;font-size:0.72rem;color:#c8b07a;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.08em}
.bar-row{display:flex;align-items:center;gap:10px;margin-bottom:4px}
.bar-name{width:120px;font-size:0.7rem;color:#8a7040;text-align:right;flex-shrink:0}
.bar-outer{flex:1;background:#0d0b05;border-radius:2px;height:26px;position:relative;overflow:hidden}
.bar-inner{height:100%;border-radius:2px;display:flex;align-items:center;padding:0 8px;font-family:'Roboto Mono',monospace;font-size:0.68rem;font-weight:500;white-space:nowrap;transition:width 1.2s cubic-bezier(.4,0,.2,1)}
.bar-val{font-family:'Roboto Mono',monospace;font-size:0.7rem;color:#f5c842;width:40px;flex-shrink:0}
.connector{border-left:2px dashed rgba(248,200,66,0.2);margin-left:128px;height:10px}
.total-row{margin-top:20px;padding:12px;background:rgba(245,200,66,0.08);border:1px solid rgba(245,200,66,0.2);border-radius:3px;display:flex;justify-content:space-between;align-items:center}
.total-label{font-family:'Roboto Mono',monospace;font-size:0.8rem;color:#f5c842;letter-spacing:0.1em}
.annotation{font-size:0.78rem;color:#6a5430;font-style:italic;margin-top:24px;line-height:1.8;border-top:1px solid #2a2010;padding-top:16px}
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
${nav('005')}
<h1>005 — The Variance Waterfall</h1>
<p class="subtitle">What's actually driving differences in output quality?</p>
<div class="chart" id="chart"></div>

<script>
const factors=[
  {label:'Model Choice (Haiku vs Sonnet vs Opus)',desc:'Cross-transcript accuracy spread',val:42,col:'#f5c842',detail:'Haiku R3 collapses on complex transcripts. Sonnet/Opus hold at 8–10.'},
  {label:'Transcript Complexity (Erik vs PDARR)',desc:'Simple vs complex input',val:28,col:'#e85c2a',detail:'PDARR (profanity, contradictions, 20+ technical terms) breaks Haiku.'},
  {label:'Verbosity Instruction (Tight/Medium/Full)',desc:'Token budget effect',val:18,col:'#4ECDC4',detail:'Full verbosity rescues Haiku on PDARR. Sonnet/Opus unaffected.'},
  {label:'Model × Verbosity Interaction',desc:'Does more tokens help all models equally?',val:8,col:'#9c27b0',detail:'Haiku Full on PDARR (R3=8) vs Haiku Tight (R3=5). No effect on Sonnet.'},
  {label:'Residual / Unexplained',desc:'Run-to-run noise',val:4,col:'#555',detail:'Small but nonzero. Consistent with N=2 transcript blocking.'},
];

let total=0;
const chart=document.getElementById('chart');
let html='';
factors.forEach((f,i)=>{
  total+=f.val;
  const pct=f.val;
  html+=\`<div class="bar-group">
    <div class="label">\${i+1}. \${f.label}</div>
    <div class="bar-row">
      <div class="bar-name">\${f.desc}</div>
      <div class="bar-outer">
        <div class="bar-inner" style="width:\${pct}%;background:\${f.col}20;border-left:3px solid \${f.col};color:\${f.col}">
          \${f.detail}
        </div>
      </div>
      <div class="bar-val">\${f.val}%</div>
    </div>
    \${i<factors.length-1?'<div class="connector"></div>':''}
  </div>\`;
});
html+=\`<div class="total-row">
  <span class="total-label">TOTAL EXPLAINED VARIANCE</span>
  <span class="total-label">~\${total}%</span>
</div>\`;
html+=\`<p class="annotation">
  Model choice is the dominant factor — but only on complex transcripts. The real story is the interaction:
  verbosity only matters when the model is underpowered. On easy transcripts, Haiku Tight and Opus Full
  are virtually indistinguishable on completeness and specificity (R1=13–14, R2=9–10 across all).
  The regression runs in the R script will quantify this properly.
</p>\`;
chart.innerHTML=html;
</script>

</body>
</html>`;
}
