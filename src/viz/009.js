import { nav } from '../shell.js';
import { SCORES, ALL_RUNS } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>009 – Parallel Coordinates — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0f0f14;color:#d0d0e8;font-family:'Courier New',monospace;min-height:100vh}
.page{padding:24px 16px}
h1{font-size:1.2rem;letter-spacing:0.08em;color:#aaaaee;margin-bottom:4px}
.subtitle{font-size:0.62rem;color:#555568;letter-spacing:0.15em;margin-bottom:20px}
svg{width:100%;overflow:visible}
.axis-label{font-size:10px;fill:#666688;font-family:'Courier New'}
.dim-title{font-size:11px;fill:#9999cc;font-family:'Courier New';text-anchor:middle}
.line{fill:none;stroke-width:1.5;opacity:0.6;transition:opacity 0.2s,stroke-width 0.2s;cursor:pointer}
.line:hover{opacity:1;stroke-width:3}
.legend{display:flex;gap:16px;font-size:0.65rem;margin-top:12px;flex-wrap:wrap}
.leg{display:flex;align-items:center;gap:6px}
.leg-line{width:20px;height:2px}
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
${nav('009')}
<div class="page">
<h1>009 — Parallel Coordinates</h1>
<p class="subtitle">All 18 runs · 5 dimensions · each line = one experimental condition</p>
<svg id="pcplot" height="400"></svg>
<div class="legend">
  <div class="leg"><div class="leg-line" style="background:#FF6B35"></div>Haiku</div>
  <div class="leg"><div class="leg-line" style="background:#4ECDC4"></div>Sonnet</div>
  <div class="leg"><div class="leg-line" style="background:#d4a843"></div>Opus</div>
  <div class="leg" style="opacity:0.5">dashed = PDARR transcript</div>
</div>
</div>
<script>
const SCORES=${JSON.stringify(SCORES)};
const ALL_RUNS=${JSON.stringify(ALL_RUNS)};
const COLORS={Haiku:'#FF6B35',Sonnet:'#4ECDC4',Opus:'#d4a843'};
const DIMS=[
  {key:'R1',idx:0,min:10,max:14,label:'R1 Completeness'},
  {key:'R2',idx:1,min:8,max:10,label:'R2 Specificity'},
  {key:'R3',idx:2,min:-2,max:10,label:'R3 Accuracy'},
  {key:'R4',idx:3,min:2,max:5,label:'R4 Calibration'},
  {key:'R6',idx:5,min:200,max:2400,label:'R6 Words'},
];

function draw(){
  const svg=document.getElementById('pcplot');
  const W=svg.parentElement.offsetWidth||800;
  svg.setAttribute('viewBox',\`0 0 \${W} 400\`);
  const pad={l:60,r:60,t:40,b:60};
  const plotW=W-pad.l-pad.r;
  const H=400;
  const axisX=DIMS.map((_,i)=>pad.l+i*plotW/(DIMS.length-1));
  const toY=(val,dim)=>pad.t+(dim.max-val)/(dim.max-dim.min)*(H-pad.t-pad.b);

  let svgContent='';

  // Axes
  DIMS.forEach((dim,i)=>{
    const x=axisX[i];
    svgContent+=\`<line x1="\${x}" y1="\${pad.t}" x2="\${x}" y2="\${H-pad.b}" stroke="rgba(150,150,200,0.25)" stroke-width="1"/>\`;
    svgContent+=\`<text class="dim-title" x="\${x}" y="\${pad.t-10}">\${dim.label}</text>\`;
    // Ticks
    for(let t=0;t<=4;t++){
      const v=dim.min+(dim.max-dim.min)*t/4;
      const y=toY(v,dim);
      svgContent+=\`<text class="axis-label" x="\${x}" y="\${y+4}" text-anchor="middle">\${v.toFixed(dim.idx===5?0:1)}</text>\`;
      svgContent+=\`<line x1="\${x-4}" y1="\${y}" x2="\${x+4}" y2="\${y}" stroke="rgba(100,100,180,0.4)" stroke-width="1"/>\`;
    }
  });

  // Lines
  ALL_RUNS.forEach(key=>{
    const s=SCORES[key];if(!s)return;
    const parts=key.split('-');
    const model=parts[0],trans=parts[2];
    const col=COLORS[model];
    const pts=DIMS.map((dim,i)=>({x:axisX[i],y:toY(s[dim.idx],dim)}));
    let d='M'+pts.map(p=>\`\${p.x},\${p.y}\`).join(' L');
    const dashAttr=trans==='PDARR'?'stroke-dasharray="4,3"':'';
    svgContent+=\`<path class="line" d="\${d}" stroke="\${col}" \${dashAttr}>
      <title>\${key}: R1=\${s[0]}, R2=\${s[1]}, R3=\${s[2]}, R4=\${s[3]}, R6=\${s[5]}</title>
    </path>\`;
  });

  svg.innerHTML=svgContent;
}

window.addEventListener('resize',draw);draw();
</script>
</body>
</html>`;
}
