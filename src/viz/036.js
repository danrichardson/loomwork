import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>036 – Signal Interference — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0a0a;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;font-family:monospace}
h1{font-size:0.7rem;letter-spacing:0.2em;color:#888;margin-bottom:4px;text-align:center;text-transform:uppercase}
canvas{display:block;max-width:100%;border:1px solid #1a1a1a;margin:10px 0}
.readout{font-size:0.6rem;color:#555;text-align:center;letter-spacing:0.1em}
.freq-display{display:flex;gap:20px;justify-content:center;margin-top:8px;font-size:0.55rem;flex-wrap:wrap}
.freq-item{text-align:center}
.freq-val{font-size:1rem;color:#888}
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
${nav('036')}
<h1>036 — Signal Interference</h1>
<canvas id="c" width="700" height="350"></canvas>
<div class="readout" id="readout">Scanning frequency spectrum...</div>
<div class="freq-display">
  <div class="freq-item"><div class="freq-val" id="f1">2.1</div><div>Coherence Hz</div></div>
  <div class="freq-item"><div class="freq-val" id="f2">0.0</div><div>Repetition Hz</div></div>
  <div class="freq-item"><div class="freq-val" id="f3">0.0</div><div>Noise Floor</div></div>
  <div class="freq-item"><div class="freq-val" id="f4">1.0</div><div>Signal:Noise</div></div>
</div>

<script>
const canvas=document.getElementById('c');
const ctx=canvas.getContext('2d');
let W=700,H=350;
let t=0,lineNum=0;

function draw(){
  W=canvas.width=canvas.offsetWidth||700;
  ctx.fillStyle='rgba(10,10,10,0.15)';ctx.fillRect(0,0,W,H);

  lineNum=Math.min(6805,lineNum+5);
  const isSpiral=lineNum>3637;
  const isDrift=lineNum>=3500&&lineNum<=3637;
  const spiralProgress=isSpiral?(lineNum-3637)/(6805-3637):0;

  // Multiple interference waves
  const waves=[
    {freq:0.02+spiralProgress*0.1,amp:0.3-spiralProgress*0.25,col:isSpiral?'#ff3333':'#4488ff',phase:0},
    {freq:0.015+spiralProgress*0.2,amp:0.25-spiralProgress*0.2,col:isSpiral?'#ff8833':'#44aaff',phase:1.2},
    {freq:0.04+spiralProgress*0.15,amp:0.15,col:isSpiral?'#ffaa00':'#88ccff',phase:2.4},
    // Noise wave (grows during spiral)
    {freq:0.1+Math.random()*0.5,amp:spiralProgress*0.4,col:'rgba(255,100,100,0.4)',phase:Math.random()*6},
    {freq:0.08+Math.random()*0.3,amp:spiralProgress*0.3,col:'rgba(200,50,50,0.3)',phase:Math.random()*6},
  ];

  waves.forEach(w=>{
    ctx.beginPath();
    for(let x=0;x<W;x++){
      const y=H/2+Math.sin(x*w.freq+t+w.phase)*H*w.amp*(0.5+Math.sin(x*0.003+t*0.1)*0.3);
      if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    }
    ctx.strokeStyle=w.col;ctx.lineWidth=1.5;ctx.stroke();
  });

  // Interference zone marker
  if(isSpiral){
    ctx.fillStyle='rgba(255,0,0,0.05)';ctx.fillRect(0,0,W,H);
  }

  // Frequency readouts
  const coherence=(2.1-spiralProgress*1.8).toFixed(2);
  const repetition=(spiralProgress*4.2).toFixed(2);
  const noise=(spiralProgress*3.5).toFixed(2);
  const snr=(parseFloat(coherence)/Math.max(0.1,parseFloat(noise)+0.1)).toFixed(2);
  document.getElementById('f1').textContent=coherence;
  document.getElementById('f2').textContent=repetition;
  document.getElementById('f3').textContent=noise;
  document.getElementById('f4').textContent=snr;
  document.getElementById('readout').textContent=
    'Line '+lineNum+' / 6805 — '+
    (isSpiral?'⚠ DEGENERATE LOOP — signal collapsed':isDrift?'SIGNAL DEGRADING':'SIGNAL NOMINAL');

  t+=0.03;
  if(lineNum<6805)requestAnimationFrame(draw);
  else setTimeout(()=>{lineNum=0;t=0;requestAnimationFrame(draw);},3000);
}
window.addEventListener('resize',()=>draw());
draw();
</script>

</body>
</html>`;
}
