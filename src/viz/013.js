import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>013 – The Entropy Clock — Claude Lost Its Mind</title>
<link href="https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@100;400;700&family=Inter:wght@100;400;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#d40000;color:#fff;font-family:'Inter',Helvetica,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px}
h1{font-size:clamp(1rem,4vw,1.8rem);font-weight:700;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:6px;text-align:center}
.subtitle{font-size:0.95rem;font-weight:100;letter-spacing:0.2em;opacity:0.8;margin-bottom:30px;text-align:center}
canvas{border-radius:50%;box-shadow:0 0 60px rgba(255,200,200,0.3);display:block}
.readout{margin-top:20px;text-align:center;font-size:1rem;letter-spacing:0.15em;font-weight:100;opacity:0.85}
.cite{font-size:0.8rem;opacity:0.6;margin-top:24px;text-align:center;max-width:500px;line-height:1.8;font-weight:100;letter-spacing:0.03em}
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
${nav('013')}
<h1>013 — The Entropy Clock</h1>
<p class="subtitle">Shannon entropy per 100-line window · as the session progresses</p>
<canvas id="c"></canvas>
<div class="readout" id="readout">LINE 0 — ENTROPY: NOMINAL</div>
<p class="cite">
  "Shannon entropy spikes in next-token probability distributions indicate model confusion and breakdown in multi-turn comprehension. When entropy exceeds baseline, it signals the onset of incoherence."<br>
  — ERGO, arXiv:2510.14077 (2025). Also: Braverman et al., "Calibration, Entropy Rates, and Memory in Language Models," PMLR 2020.
</p>

<script>
const canvas=document.getElementById('c');
const ctx=canvas.getContext('2d');
const SZ=Math.min(Math.min(window.innerWidth-40,window.innerHeight-260),520);
canvas.width=SZ;canvas.height=SZ;
const W=SZ,H=SZ,cx=W/2,cy=H/2;

// Simulated entropy values based on session phases
function entropy(line){
  if(line<3500){return 2.1+Math.sin(line/200)*0.15+Math.random()*0.1;}
  if(line<3637){return 2.1+(line-3500)/137*1.8+Math.random()*0.2;}
  // Spiral: entropy collapses (loop) but spikes on apologies
  const t=(line-3637)/(6805-3637);
  const base=Math.max(0.4,3.9-t*3.5);
  const spike=Math.random()<0.03?2.5:0;
  return base+spike+Math.random()*0.15;
}

const TOTAL=6805;
let frame=0;
const SPEEDS=[10,5,2]; // slow → fast as entropy rises
let animSpeed=10;

function drawClock(line){
  ctx.clearRect(0,0,W,H);
  const bg=line<3500?'#d40000':line<3637?'#8a0000':'#000';
  ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);

  const R=180;
  // Outer ring
  ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);
  ctx.strokeStyle='rgba(255,255,255,0.3)';ctx.lineWidth=2;ctx.stroke();

  // Hour marks
  for(let i=0;i<12;i++){
    const a=i/12*Math.PI*2-Math.PI/2;
    const r1=R-10,r2=R-3;
    ctx.beginPath();
    ctx.moveTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1);
    ctx.lineTo(cx+Math.cos(a)*r2,cy+Math.sin(a)*r2);
    ctx.strokeStyle='rgba(255,255,255,0.5)';ctx.lineWidth=i%3===0?3:1;ctx.stroke();
  }

  // Entropy arc (fills as entropy grows)
  const H_val=Math.min(4,entropy(line));
  const maxH=4.0;
  const arcEnd=(H_val/maxH)*Math.PI*2-Math.PI/2;
  const entropyColor=H_val>3.5?'#ff6666':H_val>2.5?'#ff9900':'#ffffff';
  ctx.beginPath();ctx.arc(cx,cy,R-20,-Math.PI/2,arcEnd);
  ctx.strokeStyle=entropyColor;ctx.lineWidth=8;ctx.stroke();

  // Second hand (position = line progress)
  const secAngle=(line/TOTAL)*Math.PI*2-Math.PI/2;
  ctx.beginPath();ctx.moveTo(cx,cy);
  ctx.lineTo(cx+Math.cos(secAngle)*(R-30),cy+Math.sin(secAngle)*(R-30));
  ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();

  // Minute hand (phase progress)
  const phaseAngle=line<3500?(line/3500)*Math.PI-Math.PI/2:
    line<3637?Math.PI/2+(line-3500)/136*Math.PI/4:
    3*Math.PI/4+(line-3637)/(6805-3637)*Math.PI/2;
  ctx.beginPath();ctx.moveTo(cx,cy);
  ctx.lineTo(cx+Math.cos(phaseAngle)*(R-60),cy+Math.sin(phaseAngle)*(R-60));
  ctx.strokeStyle='rgba(255,255,255,0.7)';ctx.lineWidth=4;ctx.stroke();

  // Center dot
  ctx.beginPath();ctx.arc(cx,cy,8,0,Math.PI*2);
  ctx.fillStyle='#fff';ctx.fill();

  // Phase label
  ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='14px Inter';ctx.textAlign='center';
  const phase=line<3500?'PRODUCTIVE':line<3637?'DRIFT':'SPIRAL';
  ctx.fillText(phase,cx,cy+R/2);
  ctx.font='bold 22px Inter';ctx.fillStyle='#fff';
  ctx.fillText('H='+H_val.toFixed(2),cx,cy+R/2+28);

  document.getElementById('readout').textContent=\`LINE \${line} — ENTROPY: \${H_val.toFixed(3)} bits\${line>=3637?' ⚠ DEGENERATE LOOP':''}\`;
}

let line=0;
function animate(){
  if(line<6805){
    drawClock(line);
    // Speed up entropy rise = faster animation in spiral
    const speed=line<3500?8:line<3637?4:1;
    line+=speed;
    requestAnimationFrame(animate);
  }else{
    setTimeout(()=>{line=0;animate();},2000);
  }
}
animate();
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
