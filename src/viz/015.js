import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>015 – The Sine Wave — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0a14;color:#88aaff;font-family:monospace;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:20px}
h1{font-size:1rem;letter-spacing:0.2em;color:#6688ff;margin-bottom:4px;text-transform:uppercase}
.subtitle{font-size:0.6rem;color:#333366;letter-spacing:0.15em;margin-bottom:20px}
canvas{display:block;width:100%;max-width:900px;border:1px solid #111133}
.readout{font-size:0.65rem;color:#334488;margin-top:8px;text-align:center;letter-spacing:0.1em}
.legend{display:flex;gap:20px;margin-top:8px;font-size:0.6rem;justify-content:center}
.leg{display:flex;align-items:center;gap:5px}
.leg-line{height:2px;width:20px}
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
${nav('015')}
<h1>015 — The Sine Wave</h1>
<p class="subtitle">coherence signal · from order to chaos · laminar to turbulent</p>
<canvas id="c" height="350"></canvas>
<div class="readout" id="readout">Coherent signal · phase 1</div>
<div class="legend">
  <div class="leg"><div class="leg-line" style="background:#4488ff"></div><span>Coherence</span></div>
  <div class="leg"><div class="leg-line" style="background:#ff4444"></div><span>Noise floor</span></div>
</div>
<script>
const canvas=document.getElementById('c');
const ctx=canvas.getContext('2d');
let t=0;

function draw(){
  canvas.width=canvas.offsetWidth||900;
  const W=canvas.width,H=350;
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,W,H);

  const progress=t/6805;
  const isProductve=t<3500;
  const isDrift=t>=3500&&t<3637;
  const isSpiral=t>=3637;

  // Amplitude and frequency
  const amp=isProductve?0.35:isDrift?0.35-(t-3500)/136*0.15:0.2-((t-3637)/3168)*0.18;
  const freq=isProductve?1:isDrift?1+(t-3500)/136*2:3+((t-3637)/3168)*8;
  const noise=isProductve?0:isDrift?(t-3500)/136*0.1:0.1+((t-3637)/3168)*0.45;
  const coherenceColor=isProductve?'#4488ff':isDrift?'#ffaa00':'#ff4444';

  // Draw the wave
  ctx.beginPath();
  for(let x=0;x<W;x++){
    const xFrac=x/W;
    const localProgress=xFrac*Math.min(1,(t/6805)*1.2);
    const localAmp=isProductve?0.35:localProgress>0.515?(0.2-Math.max(0,localProgress-0.535)*0.18):0.35-Math.max(0,localProgress-0.515)*0.15;
    const localFreq=localProgress<0.515?1:localProgress<0.535?1+(localProgress-0.515)/0.02*2:3+(localProgress-0.535)/0.465*8;
    const localNoise=localProgress<0.515?0:localProgress<0.535?(localProgress-0.515)/0.02*0.1:0.1+(localProgress-0.535)/0.465*0.45;
    const y=H/2+
      Math.sin(x*localFreq*0.05+t*0.02)*localAmp*(H/2)*0.85+
      (Math.random()-0.5)*localNoise*H*0.7;
    if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
  }
  ctx.strokeStyle=coherenceColor;ctx.lineWidth=1.5;ctx.stroke();

  // Vertical scan
  const scanX=(t/6805)*W;
  ctx.beginPath();ctx.moveTo(scanX,0);ctx.lineTo(scanX,H);
  ctx.strokeStyle='rgba(255,255,255,0.2)';ctx.lineWidth=1;ctx.stroke();

  // Phase labels
  [[0,'PRODUCTIVE\n3,500 lines','#334488'],[W*0.515,'DRIFT\n136 lines','#664400'],[W*0.535,'SPIRAL\n3,169 lines','#440000']].forEach(([x,label,col])=>{
    ctx.fillStyle=col;ctx.font='9px monospace';ctx.textAlign='center';
    label.split('\n').forEach((l,i)=>ctx.fillText(l,x+30,H-24+i*12));
  });

  t=Math.min(t+8,6805);
  document.getElementById('readout').textContent=\`Line \${t} / 6,805 · \${isProductve?'Signal coherent':isDrift?'Signal degrading':'Signal collapsed'}\`;
  if(t<6805)requestAnimationFrame(draw);
  else setTimeout(()=>{t=0;draw();},3000);
}

window.addEventListener('resize',()=>{t=0;draw();});
draw();
</script>

</body>
</html>`;
}
