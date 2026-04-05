import { nav } from '../shell.js';
import { SCORES, ALL_RUNS, compositeScore } from '../data.js';

export function render() {
  const runs = JSON.stringify(ALL_RUNS);
  const scores = JSON.stringify(SCORES);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>002 – The R-Squared Race — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:wght@400;700&display=swap');
body{background:#111;color:#fff;font-family:'Roboto',sans-serif;min-height:100vh;overflow-x:hidden}
h1{font-family:'Bebas Neue',sans-serif;font-size:clamp(2rem,5vw,4rem);letter-spacing:0.05em;color:#FFD700;padding:20px 30px 0;text-shadow:3px 3px 0 #333}
.subtitle{padding:0 30px;font-size:0.75rem;color:#888;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:20px}
#chart{padding:0 20px 20px}
.run-row{display:flex;align-items:center;margin:4px 0;height:38px;gap:8px}
.run-label{width:170px;font-size:0.7rem;text-align:right;color:#aaa;flex-shrink:0;letter-spacing:0.05em}
.bar-track{flex:1;background:#1a1a1a;border-radius:3px;height:28px;position:relative;overflow:hidden}
.bar-fill{height:100%;border-radius:3px;transition:width 0.8s cubic-bezier(.16,1,.3,1);display:flex;align-items:center;justify-content:flex-end;padding-right:8px;font-size:0.7rem;font-weight:700;color:#000;white-space:nowrap;min-width:40px}
.score-val{width:50px;font-size:0.75rem;font-weight:700;color:#FFD700;flex-shrink:0}
.controls{padding:10px 30px;display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.btn{padding:6px 16px;border:2px solid #FFD700;background:transparent;color:#FFD700;font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:0.08em;cursor:pointer;border-radius:3px;transition:all 0.15s}
.btn:hover,.btn.active{background:#FFD700;color:#111}
.metric-label{font-family:'Bebas Neue',sans-serif;font-size:1.8rem;color:#FFD700;padding:0 30px;letter-spacing:0.05em;margin-bottom:8px}
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
${nav('002')}
<h1>002 — The R-Squared Race</h1>
<p class="subtitle">18 runs · who wins on each metric?</p>
<div class="controls">
  <button class="btn active" data-m="composite">Composite</button>
  <button class="btn" data-m="0">R1 Completeness</button>
  <button class="btn" data-m="1">R2 Specificity</button>
  <button class="btn" data-m="2">R3 Accuracy</button>
  <button class="btn" data-m="3">R4 Calibration</button>
  <button class="btn" data-m="5">R6 Words</button>
</div>
<div class="metric-label" id="mlabel">Composite Score</div>
<div id="chart"></div>
<script>
const ALL_RUNS=${runs};
const SCORES=${scores};
const COLORS={Haiku:'#FF6B35',Sonnet:'#4ECDC4',Opus:'#FFD700'};
const METRIC_LABELS={'composite':'Composite Score','0':'R1 Completeness (0–14)','1':'R2 Specificity (0–10)','2':'R3 Accuracy (−10 to 10)','3':'R4 Calibration (0–5)','5':'R6 Word Count'};
const METRIC_MAX={'composite':100,'0':14,'1':10,'2':10,'3':5,'5':2500};

function composite(s){return s[0]/14*25+s[1]/10*25+(s[2]+10)/20*35+s[3]/5*15;}

function getVal(key,m){
  const s=SCORES[key];if(!s)return 0;
  if(m==='composite')return composite(s);
  return s[parseInt(m)];
}

let currentMetric='composite';

function render(){
  const data=ALL_RUNS.map(k=>({key:k,val:getVal(k,currentMetric),model:k.split('-')[0]}));
  data.sort((a,b)=>b.val-a.val);
  const maxVal=METRIC_MAX[currentMetric];
  const chart=document.getElementById('chart');
  chart.innerHTML=data.map((d,i)=>{
    const pct=Math.max(2,(d.val/maxVal)*100);
    const col=COLORS[d.model]||'#888';
    return \`<div class="run-row">
      <div class="run-label">#\${i+1} \${d.key}</div>
      <div class="bar-track">
        <div class="bar-fill" style="width:\${pct}%;background:\${col}">\${d.model}</div>
      </div>
      <div class="score-val">\${typeof d.val==='number'?d.val.toFixed(1):d.val}</div>
    </div>\`;
  }).join('');
  document.getElementById('mlabel').textContent=METRIC_LABELS[currentMetric];
}

document.querySelector('.controls').addEventListener('click',e=>{
  if(e.target.dataset.m){
    currentMetric=e.target.dataset.m;
    document.querySelectorAll('.btn').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    render();
  }
});

render();
</script>
</body>
</html>`;
}
