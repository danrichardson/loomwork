import { nav } from '../shell.js';
import { SCORES, ALL_RUNS, COSTS } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>003 – The Cost-Quality Scatter — Claude Lost Its Mind</title>
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#faf8f3;color:#2c2416;font-family:'Source Sans 3',sans-serif;min-height:100vh}
.page{max-width:900px;margin:0 auto;padding:30px 20px}
h1{font-family:'Lora',serif;font-size:clamp(1.4rem,3vw,2rem);color:#2c2416;margin-bottom:4px}
.subtitle{font-family:'Lora',serif;font-style:italic;color:#7a6a4a;margin-bottom:24px;font-size:0.95rem}
#canvas-wrap{position:relative;width:100%;padding-bottom:65%;background:#fff;border:1px solid #ddd6c2;border-radius:4px;overflow:hidden}
canvas{position:absolute;inset:0;width:100%;height:100%}
.tooltip-box{position:absolute;pointer-events:none;background:#fff;border:1px solid #2c2416;padding:8px 12px;border-radius:3px;font-size:0.75rem;display:none;line-height:1.6}
.legend{display:flex;gap:20px;margin-top:14px;flex-wrap:wrap;font-size:0.8rem}
.leg{display:flex;align-items:center;gap:6px}
.leg-dot{width:12px;height:12px;border-radius:50%}
.annotation{font-family:'Lora',serif;font-size:0.82rem;color:#7a6a4a;margin-top:16px;font-style:italic;line-height:1.7;border-left:3px solid #d4c4a0;padding-left:12px}
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
${nav('003')}
<div class="page">
<h1>003 — The Cost-Quality Scatter</h1>
<p class="subtitle">Does spending more actually buy accuracy?</p>
<div id="canvas-wrap">
  <canvas id="c"></canvas>
  <div class="tooltip-box" id="tip"></div>
</div>
<div class="legend">
  <div class="leg"><div class="leg-dot" style="background:#e85c2a"></div>Haiku ($0.001)</div>
  <div class="leg"><div class="leg-dot" style="background:#2a8ae8"></div>Sonnet ($0.02)</div>
  <div class="leg"><div class="leg-dot" style="background:#9c27b0"></div>Opus ($0.18)</div>
  <div class="leg"><div class="leg-dot" style="background:transparent;border:2px solid #333;border-radius:50%"></div>Erik transcript</div>
  <div class="leg" style="opacity:0.5">● = PDARR transcript</div>
</div>
<p class="annotation">"Sonnet Full scored 10/10 accuracy on both transcripts. Opus didn't beat it on any metric." The sweet spot — $0.02 instead of $0.18 — is marked with a star.</p>
</div>
<script>
const SCORES=${JSON.stringify(SCORES)};
const ALL_RUNS=${JSON.stringify(ALL_RUNS)};
const COSTS=${JSON.stringify(COSTS)};
const COLORS={Haiku:'#e85c2a',Sonnet:'#2a8ae8',Opus:'#9c27b0'};

function composite(s){return s[0]/14*25+s[1]/10*25+(s[2]+10)/20*35+s[3]/5*15;}

const data=ALL_RUNS.map(k=>{
  const parts=k.split('-');
  const s=SCORES[k];
  return{key:k,model:parts[0],verb:parts[1],trans:parts[2],cost:COSTS[parts[0]],score:composite(s)};
});

const wrap=document.getElementById('canvas-wrap');
const canvas=document.getElementById('c');
const tip=document.getElementById('tip');
let W,H,pts=[];

function draw(){
  W=canvas.width=wrap.offsetWidth;
  H=canvas.height=wrap.offsetHeight;
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,W,H);

  const pad={l:60,r:30,t:20,b:50};
  const logMin=Math.log10(0.0008),logMax=Math.log10(0.25);
  const scoreMin=70,scoreMax=100;

  function toX(cost){return pad.l+(Math.log10(cost)-logMin)/(logMax-logMin)*(W-pad.l-pad.r);}
  function toY(score){return H-pad.b-(score-scoreMin)/(scoreMax-scoreMin)*(H-pad.t-pad.b);}

  // Grid
  ctx.strokeStyle='#e8e0d0';ctx.lineWidth=1;
  [0.001,0.002,0.005,0.01,0.02,0.05,0.1,0.2].forEach(c=>{
    const x=toX(c);
    ctx.beginPath();ctx.moveTo(x,pad.t);ctx.lineTo(x,H-pad.b);ctx.stroke();
    ctx.fillStyle='#aaa';ctx.font='11px "Source Sans 3"';ctx.textAlign='center';
    ctx.fillText('$'+c,x,H-pad.b+16);
  });
  [75,80,85,90,95,100].forEach(s=>{
    const y=toY(s);
    ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(W-pad.r,y);ctx.stroke();
    ctx.fillStyle='#aaa';ctx.font='11px "Source Sans 3"';ctx.textAlign='right';
    ctx.fillText(s.toFixed(0),pad.l-6,y+4);
  });

  // Axis labels
  ctx.fillStyle='#7a6a4a';ctx.font='12px "Lora"';
  ctx.textAlign='center';ctx.fillText('Cost per run (log scale)',W/2,H-4);
  ctx.save();ctx.translate(14,H/2);ctx.rotate(-Math.PI/2);
  ctx.fillText('Composite Score',0,0);ctx.restore();

  pts=[];
  data.forEach(d=>{
    const x=toX(d.cost),y=toY(d.score);
    const r=d.trans==='Erik'?8:6;
    ctx.beginPath();
    if(d.trans==='Erik')ctx.arc(x,y,r,0,Math.PI*2);
    else{ctx.arc(x,y,r,0,Math.PI*2);}
    ctx.fillStyle=COLORS[d.model]+(d.trans==='PDARR'?'99':'dd');
    ctx.fill();
    if(d.trans==='Erik'){ctx.strokeStyle=COLORS[d.model];ctx.lineWidth=2;ctx.stroke();}
    pts.push({x,y,d,r:r+4});
    // Sweet spot star
    if(d.key==='Sonnet-Full-Erik'||d.key==='Sonnet-Full-PDARR'){
      ctx.fillStyle='#FFD700';ctx.font='18px serif';ctx.textAlign='center';
      ctx.fillText('★',x,y-12);
    }
  });
}

canvas.addEventListener('mousemove',e=>{
  const rect=canvas.getBoundingClientRect();
  const mx=(e.clientX-rect.left)*(W/rect.width);
  const my=(e.clientY-rect.top)*(H/rect.height);
  const hit=pts.find(p=>Math.hypot(p.x-mx,p.y-my)<p.r+4);
  if(hit){
    tip.style.display='block';
    tip.style.left=(e.clientX-wrap.getBoundingClientRect().left+10)+'px';
    tip.style.top=(e.clientY-wrap.getBoundingClientRect().top-50)+'px';
    const s=SCORES[hit.d.key];
    tip.innerHTML=\`<b>\${hit.d.key}</b><br>Cost: $\${hit.d.cost}<br>Score: \${hit.d.score.toFixed(1)}/100<br>R3 Accuracy: \${s[2]}\`;
  }else tip.style.display='none';
});

window.addEventListener('resize',draw);
draw();
</script>
</div>
</body>
</html>`;
}
