import { nav } from '../shell.js';
import { SCORES, ALL_RUNS } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>006 – The Box Plot Ballet — Claude Lost Its Mind</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=EB+Garamond:ital@0;1&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#1a0a05;color:#f5e6c8;font-family:'EB Garamond',serif;min-height:100vh}
.page{max-width:900px;margin:0 auto;padding:30px 20px}
h1{font-family:'Playfair Display',serif;font-size:2rem;color:#d4a843;margin-bottom:4px}
.subtitle{font-style:italic;color:#8a6030;margin-bottom:24px}
canvas{width:100%;border:1px solid #2a1a08;border-radius:4px;background:#120805}
.note{font-size:0.8rem;color:#6a4a20;font-style:italic;margin-top:12px;line-height:1.7}
.controls{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap}
.btn{padding:5px 12px;border:1px solid #3a2010;background:transparent;color:#8a6030;cursor:pointer;font-family:'EB Garamond';font-size:0.85rem;transition:all 0.2s;border-radius:2px}
.btn.active{background:#d4a843;color:#120805;border-color:#d4a843}
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
${nav('006')}
<div class="page">
<h1>006 — The Box Plot Ballet</h1>
<p class="subtitle">How scores distribute across the 18 runs — and where they scatter</p>
<div class="controls" id="controls">
  <button class="btn active" data-m="0">R1</button>
  <button class="btn" data-m="1">R2</button>
  <button class="btn" data-m="2">R3</button>
  <button class="btn" data-m="3">R4</button>
  <button class="btn" data-m="5">R6 Words</button>
</div>
<canvas id="c" height="400"></canvas>
<p class="note">Each box spans the interquartile range (25th–75th percentile). The whiskers extend to the full range. Individual runs shown as dots — each dot is one experimental condition. Haiku orange · Sonnet teal · Opus gold.</p>
</div>
<script>
const SCORES=${JSON.stringify(SCORES)};
const ALL_RUNS=${JSON.stringify(ALL_RUNS)};
const COLORS={Haiku:'#FF6B35',Sonnet:'#4ECDC4',Opus:'#d4a843'};
const MODELS=['Haiku','Sonnet','Opus'];
const METRIC_NAMES=['R1 Completeness','R2 Specificity','R3 Accuracy','R4 Calibration','','R6 Words'];
const MAX=[14,10,10,5,0,2500];

let metric=0;

function getModelData(model,mi){
  return ALL_RUNS.filter(k=>k.startsWith(model)).map(k=>SCORES[k][mi]).sort((a,b)=>a-b);
}

function boxStats(arr){
  const n=arr.length;
  const q=(p)=>{
    const i=(n-1)*p,f=Math.floor(i);
    return f===i?arr[f]:arr[f]+(arr[f+1]-arr[f])*(i-f);
  };
  return{min:arr[0],q1:q(0.25),med:q(0.5),q3:q(0.75),max:arr[n-1]};
}

function draw(){
  const canvas=document.getElementById('c');
  canvas.width=canvas.offsetWidth||800;
  const W=canvas.width,H=canvas.height;
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle='#120805';ctx.fillRect(0,0,W,H);

  const pad={l:60,r:30,t:30,b:50};
  const mi=parseInt(metric);
  const allVals=ALL_RUNS.map(k=>SCORES[k][mi]);
  const dataMin=mi===2?-10:0;
  const dataMax=MAX[mi];
  const toY=v=>H-pad.b-(v-dataMin)/(dataMax-dataMin)*(H-pad.t-pad.b);
  const section=(W-pad.l-pad.r)/MODELS.length;

  // Grid
  const steps=6;
  for(let i=0;i<=steps;i++){
    const v=dataMin+(dataMax-dataMin)*i/steps;
    const y=toY(v);
    ctx.strokeStyle='rgba(212,168,67,0.1)';ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(W-pad.r,y);ctx.stroke();
    ctx.fillStyle='#5a3a10';ctx.font='11px "EB Garamond"';ctx.textAlign='right';
    ctx.fillText(v.toFixed(mi===5?0:1),pad.l-6,y+4);
  }

  MODELS.forEach((model,mi2)=>{
    const cx=pad.l+section*mi2+section/2;
    const data=getModelData(model,mi);
    const stats=boxStats(data);
    const col=COLORS[model];
    const bw=section*0.35;

    // IQR box
    ctx.fillStyle=col+'22';
    ctx.fillRect(cx-bw/2,toY(stats.q3),bw,toY(stats.q1)-toY(stats.q3));
    ctx.strokeStyle=col;ctx.lineWidth=2;
    ctx.strokeRect(cx-bw/2,toY(stats.q3),bw,toY(stats.q1)-toY(stats.q3));

    // Median
    ctx.beginPath();ctx.moveTo(cx-bw/2,toY(stats.med));ctx.lineTo(cx+bw/2,toY(stats.med));
    ctx.strokeStyle='#fff';ctx.lineWidth=2.5;ctx.stroke();

    // Whiskers
    ctx.strokeStyle=col;ctx.lineWidth=1.5;ctx.setLineDash([3,3]);
    ctx.beginPath();ctx.moveTo(cx,toY(stats.q3));ctx.lineTo(cx,toY(stats.max));ctx.stroke();
    ctx.beginPath();ctx.moveTo(cx,toY(stats.q1));ctx.lineTo(cx,toY(stats.min));ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();ctx.moveTo(cx-10,toY(stats.max));ctx.lineTo(cx+10,toY(stats.max));ctx.stroke();
    ctx.beginPath();ctx.moveTo(cx-10,toY(stats.min));ctx.lineTo(cx+10,toY(stats.min));ctx.stroke();

    // Dots
    data.forEach(v=>{
      ctx.beginPath();ctx.arc(cx+(Math.random()-0.5)*bw*0.6,toY(v),4,0,Math.PI*2);
      ctx.fillStyle=col+'cc';ctx.fill();
    });

    // Label
    ctx.fillStyle=col;ctx.font='bold 13px "Playfair Display"';ctx.textAlign='center';
    ctx.fillText(model,cx,H-pad.b+20);
  });

  ctx.fillStyle='#8a6030';ctx.font='13px "EB Garamond"';ctx.textAlign='center';
  ctx.fillText(METRIC_NAMES[mi],W/2,H-4);
}

document.getElementById('controls').addEventListener('click',e=>{
  if(e.target.dataset.m!==undefined){
    metric=e.target.dataset.m;
    document.querySelectorAll('.btn').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    draw();
  }
});

window.addEventListener('resize',draw);
draw();
</script>
</body>
</html>`;
}
