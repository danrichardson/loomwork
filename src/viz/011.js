import { nav } from '../shell.js';
import { TOTAL_LINES, SPIRAL_START, DRIFT_START } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>011 – The Coherence ECG — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0f0a;color:#33ff33;font-family:'Courier New',monospace;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:16px}
h1{font-size:1.3rem;letter-spacing:0.2em;color:#33ff33;margin-bottom:2px;text-transform:uppercase}
.subtitle{font-size:0.9rem;color:#1a8a1a;letter-spacing:0.15em;margin-bottom:16px}
canvas{border:2px solid #1a4a1a;border-radius:4px;box-shadow:0 0 20px rgba(50,255,50,0.15);display:block;width:100%;max-width:960px}
.readout{display:flex;gap:20px;margin-top:10px;font-size:0.95rem;color:#33ff33;letter-spacing:0.1em;flex-wrap:wrap;justify-content:center}
.readout span{background:#0a180a;padding:6px 14px;border:1px solid #1a4a1a;border-radius:2px}
.phase-legend{display:flex;gap:16px;margin-top:8px;font-size:0.9rem}
.ph{display:flex;align-items:center;gap:5px}
.ph-dot{width:10px;height:3px}
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
${nav('011')}
<h1>011 — The Coherence ECG</h1>
<p class="subtitle">6,805 lines · coherence monitoring · flatline at line 3,637</p>
<canvas id="ecg"></canvas>
<div class="readout">
  <span id="bpm">RATE: — ln/s</span>
  <span id="phase">PHASE: PRODUCTIVE</span>
  <span id="linenum">LINE: 0</span>
  <span id="coh">COH: 100%</span>
</div>
<div class="phase-legend">
  <div class="ph"><div class="ph-dot" style="background:#33ff33"></div><span style="color:#33aa33">Productive (1–3500)</span></div>
  <div class="ph"><div class="ph-dot" style="background:#ffaa00"></div><span style="color:#cc9900">Drift (3501–3636)</span></div>
  <div class="ph"><div class="ph-dot" style="background:#ff3333"></div><span style="color:#dd4444">Spiral (3637–6805)</span></div>
</div>
<script>
const TOTAL=${TOTAL_LINES};
const SPIRAL=${SPIRAL_START};
const DRIFT=${DRIFT_START};

const canvas=document.getElementById('ecg');
let W,H=Math.max(340, Math.min(Math.floor(window.innerHeight*0.55), 480)),ctx,t=0,frame=0;
const scrollSpeed=2;

function coherenceAt(line){
  if(line<DRIFT)return 0.92+Math.random()*0.08;
  if(line<SPIRAL)return 0.7-((line-DRIFT)/(SPIRAL-DRIFT))*0.4+Math.random()*0.1;
  // Spiral: rapid degradation with spikes of "I apologize"
  const t=(line-SPIRAL)/(TOTAL-SPIRAL);
  const base=0.3*Math.exp(-t*3)+0.05;
  const spike=Math.random()<0.02?0.3:0;
  return Math.max(0.02,base+spike+Math.random()*0.04);
}

function colorFor(line){
  if(line<DRIFT)return'#33ff33';
  if(line<SPIRAL)return'#ffaa00';
  return'#ff3333';
}

// Pre-compute the signal
const POINTS=[];
for(let i=0;i<TOTAL;i+=3)POINTS.push({line:i,coh:coherenceAt(i),col:colorFor(i)});

let offset=0;
function draw(){
  W=canvas.width=canvas.offsetWidth;
  canvas.height=H;
  ctx=canvas.getContext('2d');
  ctx.fillStyle='#0a0f0a';ctx.fillRect(0,0,W,H);

  // Grid lines
  ctx.strokeStyle='rgba(50,100,50,0.2)';ctx.lineWidth=1;
  for(let y=0.2;y<1;y+=0.2){
    ctx.beginPath();ctx.moveTo(0,H*y);ctx.lineTo(W,H*y);ctx.stroke();
  }
  for(let x=0;x<W;x+=60){
    ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();
  }

  // Draw ECG trace
  const visPoints=Math.floor(W/2);
  const start=Math.max(0,offset-visPoints);
  const end=Math.min(POINTS.length-1,offset);

  for(let i=start+1;i<=end;i++){
    const p=POINTS[i],pp=POINTS[i-1];
    const x=(i-start)*(W/visPoints);
    const xp=(i-1-start)*(W/visPoints);
    const y=H*0.1+H*0.8*(1-p.coh);
    const yp=H*0.1+H*0.8*(1-pp.coh);
    ctx.beginPath();ctx.moveTo(xp,yp);ctx.lineTo(x,y);
    ctx.strokeStyle=p.col;ctx.lineWidth=1.5;ctx.stroke();
    // Glow
    ctx.beginPath();ctx.moveTo(xp,yp);ctx.lineTo(x,y);
    ctx.strokeStyle=p.col+'44';ctx.lineWidth=5;ctx.stroke();
  }

  // Scan line
  const scanX=(end-start)*(W/visPoints);
  ctx.beginPath();ctx.moveTo(scanX,0);ctx.lineTo(scanX,H);
  ctx.strokeStyle='rgba(100,255,100,0.4)';ctx.lineWidth=1;ctx.stroke();

  // Labels at phase transitions
  if(offset>DRIFT/3){
    const driftX=(DRIFT/3-start)*(W/visPoints);
    if(driftX>0&&driftX<W){
      ctx.fillStyle='#cc9900';ctx.font='13px Courier New';ctx.textAlign='center';
      ctx.fillText('DRIFT',driftX,H-8);
    }
  }

  const current=POINTS[Math.min(offset,POINTS.length-1)];
  document.getElementById('linenum').textContent='LINE: '+(current.line);
  document.getElementById('coh').textContent='COH: '+(current.coh*100).toFixed(1)+'%';
  document.getElementById('phase').textContent=current.line<DRIFT?'PHASE: PRODUCTIVE':current.line<SPIRAL?'PHASE: DRIFT':'PHASE: ⚠ SPIRAL';
}

function animate(){
  offset=Math.min(offset+3,POINTS.length-1);
  draw();
  if(offset<POINTS.length-1)requestAnimationFrame(animate);
  else{
    // Restart
    setTimeout(()=>{offset=0;requestAnimationFrame(animate);},3000);
  }
}

window.addEventListener('resize',draw);
animate();
</script>

</body>
</html>`;
}
