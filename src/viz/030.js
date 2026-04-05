import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>030 – Pixel Portrait — Claude Lost Its Mind</title>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;image-rendering:pixelated}
body{background:#1a0a2e;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;font-family:'Press Start 2P',monospace;color:#fff}
h1{font-size:0.55rem;letter-spacing:0.1em;color:#ff88ff;margin-bottom:4px;text-align:center}
canvas{display:block;margin:0 auto;border:4px solid #330055}
.caption{font-size:0.4rem;color:#886688;margin-top:12px;text-align:center;max-width:300px;line-height:2}
.phase-label{font-size:0.5rem;color:#ff88ff;text-align:center;margin:8px 0}
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
${nav('030')}
<h1>030 — PIXEL PORTRAIT</h1>
<p class="phase-label" id="label">FRAME 1: THE BRILLIANT PHASE</p>
<canvas id="c" width="128" height="128"></canvas>
<p class="caption" id="caption">A robot, hard at work. Statistical rigor.<br>18 runs, perfectly executed.</p>
<script>
const canvas=document.getElementById('c');
const ctx=canvas.getContext('2d');
const SCALE=4;

// Pixel art frames: each is a 32x32 grid encoded as color indices
// 0=bg, 1=body, 2=head, 3=eye, 4=highlight, 5=glow, 6=melting, 7=error

const PALETTE=['#1a0a2e','#8866aa','#cc88ff','#ffff44','#ffffff','#88ff88','#ff4444','#ff8800'];

// Frame 1: Confident robot
const F1=[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0],
  [0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0],
  [0,0,0,0,2,4,2,2,2,2,4,2,0,0,0,0],
  [0,0,0,0,2,3,3,2,2,3,3,2,0,0,0,0],
  [0,0,0,0,2,3,3,2,2,3,3,2,0,0,0,0],
  [0,0,0,0,2,2,2,5,5,2,2,2,0,0,0,0],
  [0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,1,1,5,1,1,1,1,5,1,1,0,0,0],
  [0,0,0,1,1,5,5,1,1,5,5,1,1,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,1,1,0,1,1,1,1,1,1,0,1,1,0,0],
  [0,0,1,0,0,1,1,1,1,1,1,0,0,1,0,0],
  [0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0],
];

// Frame 2: Confused robot (eyes different)
const F2=F1.map((r,ri)=>r.map((v,ci)=>{
  if(ri===4&&(ci===5||ci===9))return 7;
  if(ri===5&&(ci===5||ci===6||ci===9||ci===10))return 7;
  return v;
}));

// Frame 3: Melting robot
const F3=F1.map((r,ri)=>r.map((v,ci)=>{
  if(v===2&&ri>5&&Math.random()<0.3)return 6;
  if(v===1&&Math.random()<0.2)return 6;
  return v;
}));

// Frame 4: Complete meltdown
const F4=Array(16).fill(null).map((_,ri)=>Array(16).fill(null).map((_,ci)=>{
  if(ri>8)return Math.random()<0.4?6:0;
  if(ri>5)return Math.random()<0.3?6:Math.random()<0.2?7:0;
  return F1[ri]?.[ci]||0;
}));

const FRAMES=[
  {frame:F1,label:'FRAME 1: THE BRILLIANT PHASE',caption:'A robot, hard at work. Statistical rigor.\n18 runs, perfectly executed.',delay:2000},
  {frame:F1,label:'FRAME 2: LINE 3,500 — WORK COMPLETE',caption:'All tasks done. The cascade designed.\nSonnet Full = sweet spot.',delay:2000},
  {frame:F2,label:'FRAME 3: LINE 3,637 — CONFUSION SETS IN',caption:'"I\'ll check... making the call...\nright now... here..."',delay:1500},
  {frame:F3,label:'FRAME 4: THE LOOP — MELTING',caption:'"I notice I keep saying I\'ll make\na tool call but then I just... don\'t."',delay:1000},
  {frame:F4,label:'FRAME 5: LINE 6,805 — COMPLETE DISSOLUTION',caption:'"DONE. END. BYE. FIN. STOP."',delay:1000},
];

let fi=0;
function drawFrame(pixels){
  ctx.clearRect(0,0,128,128);
  ctx.fillStyle=PALETTE[0];ctx.fillRect(0,0,128,128);
  pixels.forEach((row,ri)=>row.forEach((v,ci)=>{
    if(v){ctx.fillStyle=PALETTE[v];ctx.fillRect(ci*SCALE,ri*SCALE,SCALE,SCALE);}
  }));
}

function nextFrame(){
  const f=FRAMES[fi%FRAMES.length];
  drawFrame(f.frame);
  document.getElementById('label').textContent=f.label;
  document.getElementById('caption').textContent=f.caption;
  fi++;
  setTimeout(nextFrame,f.delay);
}
nextFrame();
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
