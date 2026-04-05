import { nav } from '../shell.js';
import { SCORES, MODELS, VERBOSITY } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>004 – The Radar Spider — Claude Lost Its Mind</title>
<link href="https://fonts.googleapis.com/css2?family=Futura:wght@400;700&family=Inter:wght@400;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0a0a;color:#fff;font-family:'Inter',sans-serif;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px}
h1{font-size:1.4rem;font-weight:900;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:4px;color:#fff}
.subtitle{font-size:0.65rem;letter-spacing:0.2em;color:#555;margin-bottom:20px;text-transform:uppercase}
#canvas-container{position:relative;display:flex;gap:20px;flex-wrap:wrap;justify-content:center}
canvas{border:1px solid #1a1a1a}
.controls{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;justify-content:center}
.btn{padding:6px 14px;border:1px solid #333;background:transparent;color:#888;cursor:pointer;font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;transition:all 0.2s;border-radius:2px}
.btn.active{color:#fff;border-color:currentColor}
.btn[data-model="Haiku"].active{color:#FF6B35;border-color:#FF6B35}
.btn[data-model="Sonnet"].active{color:#4ECDC4;border-color:#4ECDC4}
.btn[data-model="Opus"].active{color:#FFD700;border-color:#FFD700}
.note{font-size:0.62rem;color:#444;margin-top:16px;text-align:center;max-width:500px;line-height:1.6}
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
${nav('004')}
<h1>004 — The Radar Spider</h1>
<p class="subtitle">model performance profiles · all 6 metrics</p>
<div class="controls" id="controls">
  <button class="btn active" data-model="Haiku">Haiku</button>
  <button class="btn active" data-model="Sonnet">Sonnet</button>
  <button class="btn active" data-model="Opus">Opus</button>
</div>
<canvas id="c" width="600" height="500"></canvas>
<p class="note">Each axis = one scoring dimension. Area fill = model's coverage. Tight/Medium/Full verbosity shown as line weight. R5 zeroed (hallucination scoring required transcript access).</p>
<script>
const SCORES=${JSON.stringify(SCORES)};
const MODELS=${JSON.stringify(MODELS)};
const VERBOSITY=${JSON.stringify(VERBOSITY)};
const COLORS={Haiku:'#FF6B35',Sonnet:'#4ECDC4',Opus:'#FFD700'};
const AXES=['R1 Complete','R2 Specific','R3 Accurate','R4 Calibrate','R6 Words'];
const MAX=[14,10,10,5,2500];
const SCORE_IDX=[0,1,2,3,5];

let active=new Set(['Haiku','Sonnet','Opus']);

function getModelAvg(model){
  return AXES.map((_,i)=>{
    const vals=VERBOSITY.flatMap(v=>['Erik','PDARR'].map(t=>SCORES[model+'-'+v+'-'+t]));
    const sum=vals.reduce((acc,s)=>acc+(s?s[SCORE_IDX[i]]:0),0);
    return sum/vals.length;
  });
}

function draw(){
  const canvas=document.getElementById('c');
  const W=canvas.width,H=canvas.height;
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,W,H);
  const cx=W/2,cy=H/2,R=Math.min(W,H)*0.38;
  const n=AXES.length;

  // Grid circles
  for(let r=1;r<=5;r++){
    ctx.beginPath();
    for(let i=0;i<n;i++){
      const angle=(i/n)*Math.PI*2-Math.PI/2;
      const x=cx+Math.cos(angle)*R*(r/5);
      const y=cy+Math.sin(angle)*R*(r/5);
      if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    }
    ctx.closePath();
    ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  }

  // Axis lines + labels
  for(let i=0;i<n;i++){
    const angle=(i/n)*Math.PI*2-Math.PI/2;
    const x=cx+Math.cos(angle)*R;
    const y=cy+Math.sin(angle)*R;
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(x,y);
    ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1;ctx.stroke();
    const lx=cx+Math.cos(angle)*(R+28);
    const ly=cy+Math.sin(angle)*(R+28);
    ctx.fillStyle='#888';ctx.font='11px Inter';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(AXES[i],lx,ly);
  }

  MODELS.forEach(model=>{
    if(!active.has(model))return;
    const avgs=getModelAvg(model);
    const col=COLORS[model];

    // Per-verbosity lines
    VERBOSITY.forEach((v,vi)=>{
      const vals=AXES.map((_,i)=>{
        const scores=['Erik','PDARR'].map(t=>SCORES[model+'-'+v+'-'+t]);
        const avg=scores.reduce((a,s)=>a+(s?s[SCORE_IDX[i]]:0),0)/scores.length;
        return avg/MAX[i];
      });
      ctx.beginPath();
      vals.forEach((val,i)=>{
        const angle=(i/n)*Math.PI*2-Math.PI/2;
        const x=cx+Math.cos(angle)*R*val;
        const y=cy+Math.sin(angle)*R*val;
        if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
      });
      ctx.closePath();
      ctx.strokeStyle=col;ctx.lineWidth=[1,2,3][vi];ctx.globalAlpha=0.7;ctx.stroke();
      if(vi===2){
        ctx.fillStyle=col;ctx.globalAlpha=0.12;ctx.fill();
      }
      ctx.globalAlpha=1;
    });

    // Label
    const r=0;
    const angle=(r/n)*Math.PI*2-Math.PI/2;
    const avgNorm=avgs[0]/MAX[0];
    ctx.fillStyle=col;ctx.font='bold 12px Inter';ctx.textAlign='left';
    ctx.fillText(model,cx+Math.cos(angle)*R*avgNorm+10,cy+Math.sin(angle)*R*avgNorm);
  });
}

document.getElementById('controls').addEventListener('click',e=>{
  if(e.target.dataset.model){
    const m=e.target.dataset.model;
    if(active.has(m))active.delete(m);else active.add(m);
    e.target.classList.toggle('active');
    draw();
  }
});

draw();
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
