import { nav } from '../shell.js';
import { SCORES, ALL_RUNS, COSTS } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>008 – The 3D Response Surface — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#050510;color:#aaaaff;font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;min-height:100vh}
h1{font-size:1.3rem;letter-spacing:0.1em;color:#8888ff;padding:20px 20px 4px;text-align:center;text-transform:uppercase}
.subtitle{font-size:0.65rem;color:#444488;letter-spacing:0.15em;margin-bottom:16px;text-align:center}
#c{cursor:grab;display:block;max-width:100%;margin:0 auto}
#c:active{cursor:grabbing}
.controls{display:flex;gap:16px;margin:10px;font-size:0.65rem;color:#555588;letter-spacing:0.1em;flex-wrap:wrap;justify-content:center}
.note{font-size:0.62rem;color:#333366;text-align:center;max-width:500px;margin:8px auto 20px;line-height:1.6}
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
${nav('008')}
<h1>008 — The 3D Response Surface</h1>
<p class="subtitle">Model × Verbosity → Quality · drag to rotate</p>
<canvas id="c" width="700" height="500"></canvas>
<div class="controls">
  <span>X-axis: Models (Haiku → Sonnet → Opus)</span>
  <span>Z-axis: Verbosity (Tight → Medium → Full)</span>
  <span>Y-axis: Composite Score</span>
</div>
<p class="note">Averaged across both transcripts. Surface shows the quality "landscape" — note the dramatic cliff where Haiku drops on complex inputs, and how Sonnet Full forms the plateau at the summit.</p>
<script>
const DATA=${JSON.stringify(SCORES)};

function composite(s){return s[0]/14*25+s[1]/10*25+(s[2]+10)/20*35+s[3]/5*15;}

const MODELS=['Haiku','Sonnet','Opus'];
const VERBOSITY=['Tight','Medium','Full'];
const TRANSCRIPTS=['Erik','PDARR'];

// Build grid [model][verb] = avg composite
const grid=MODELS.map(m=>VERBOSITY.map(v=>{
  const vals=TRANSCRIPTS.map(t=>DATA[m+'-'+v+'-'+t]).filter(Boolean).map(composite);
  return vals.reduce((a,b)=>a+b,0)/vals.length;
}));

const canvas=document.getElementById('c');
let W=canvas.width,H=canvas.height;
const ctx=canvas.getContext('2d');
let rotX=0.4,rotY=-0.4,dragging=false,lastX=0,lastY=0;

function project3D(x,y,z,W,H){
  // Rotate around Y then X
  const cy=Math.cos(rotY),sy=Math.sin(rotY);
  const cx2=Math.cos(rotX),sx=Math.sin(rotX);
  let rx=x*cy-z*sy,rz=x*sy+z*cy;
  let ry2=y*cx2+rz*sx,rz2=-y*sx+rz*cx2;
  const d=4;const fov=d/(d+rz2+2);
  return{px:W/2+rx*fov*160,py:H/2-ry2*fov*160};
}

function colorForScore(s){
  const t=Math.max(0,Math.min(1,(s-70)/30));
  const r=Math.round((1-t)*220+t*0);
  const g=Math.round(t*200);
  const b=Math.round(50+t*200);
  return\`rgb(\${r},\${g},\${b})\`;
}

function draw(){
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle='#050510';ctx.fillRect(0,0,W,H);

  // Draw surface quads (back to front)
  const polys=[];
  for(let mi=0;mi<MODELS.length-1;mi++){
    for(let vi=0;vi<VERBOSITY.length-1;vi++){
      const xs=[mi,mi+1,mi+1,mi];
      const zs=[vi,vi,vi+1,vi+1];
      const ys=[[mi,vi],[mi+1,vi],[mi+1,vi+1],[mi,vi+1]].map(([m,v])=>(grid[m][v]-70)/30);
      const pts=xs.map((x,i)=>project3D(x-1,ys[i],zs[i]-1,W,H));
      const avgScore=(grid[mi][vi]+grid[mi+1][vi]+grid[mi+1][vi+1]+grid[mi][vi+1])/4;
      const avgZ=(vi+vi+1)/2;
      polys.push({pts,score:avgScore,avgZ,mi,vi});
    }
  }
  // Sort back to front
  polys.sort((a,b)=>b.avgZ-a.avgZ);
  polys.forEach(({pts,score})=>{
    ctx.beginPath();
    pts.forEach((p,i)=>i===0?ctx.moveTo(p.px,p.py):ctx.lineTo(p.px,p.py));
    ctx.closePath();
    ctx.fillStyle=colorForScore(score)+'cc';ctx.fill();
    ctx.strokeStyle='rgba(100,100,200,0.4)';ctx.lineWidth=1;ctx.stroke();
  });

  // Axis labels
  const axisStyle='rgba(150,150,255,0.6)';
  ctx.fillStyle=axisStyle;ctx.font='11px system-ui';ctx.textAlign='center';
  MODELS.forEach((m,i)=>{
    const p=project3D(i-1,-0.1,-1.2,W,H);
    ctx.fillText(m,p.px,p.py);
  });
  VERBOSITY.forEach((v,i)=>{
    const p=project3D(-1.2,-0.1,i-1,W,H);
    ctx.fillText(v,p.px,p.py);
  });
}

canvas.addEventListener('mousedown',e=>{dragging=true;lastX=e.clientX;lastY=e.clientY;});
canvas.addEventListener('mousemove',e=>{
  if(!dragging)return;
  rotY+=(e.clientX-lastX)*0.01;
  rotX+=(e.clientY-lastY)*0.01;
  lastX=e.clientX;lastY=e.clientY;
  draw();
});
canvas.addEventListener('mouseup',()=>dragging=false);
canvas.addEventListener('touchstart',e=>{lastX=e.touches[0].clientX;lastY=e.touches[0].clientY;});
canvas.addEventListener('touchmove',e=>{
  e.preventDefault();
  rotY+=(e.touches[0].clientX-lastX)*0.01;
  rotX+=(e.touches[0].clientY-lastY)*0.01;
  lastX=e.touches[0].clientX;lastY=e.touches[0].clientY;
  draw();
},{passive:false});

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
