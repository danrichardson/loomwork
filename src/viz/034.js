import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>034 – The Databend — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#111;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;font-family:monospace}
h1{font-size:0.7rem;color:#ff8c00;letter-spacing:0.2em;margin-bottom:4px;text-transform:uppercase}
canvas{display:block;max-width:min(600px,100%);border:1px solid #222;margin:10px 0}
.label{font-size:0.6rem;color:#555;text-align:center;margin-bottom:10px;line-height:1.8}
.controls{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:10px}
.btn{padding:4px 12px;border:1px solid #333;background:transparent;color:#888;cursor:pointer;font-size:0.6rem}
.btn:hover{border-color:#ff8c00;color:#ff8c00}
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
${nav('034')}
<h1>034 — The Databend</h1>
<p class="label">Session data rendered as raw bytes, then bent.<br>Corruption as aesthetic. Error as art.</p>
<canvas id="c" width="560" height="420"></canvas>
<div class="controls">
  <button class="btn" onclick="bend()">► BEND</button>
  <button class="btn" onclick="reset()">↺ RESET</button>
  <span id="offset" style="font-size:0.55rem;color:#555">offset: 0</span>
</div>
<script>
const canvas=document.getElementById('c');
const ctx=canvas.getContext('2d');
const W=560,H=420;

// Generate base image from session data
function makeBase(){
  const id=ctx.createImageData(W,H);
  const d=id.data;
  for(let i=0;i<d.length;i+=4){
    const x=(i/4)%W,y=Math.floor(i/4/W);
    const line=Math.floor(y/H*6805);
    const isSpiral=line>3637;
    const t=y/H;
    // Encode session phase as image content
    d[i]=isSpiral?Math.round(100+Math.sin(x*0.1)*80+Math.random()*50):Math.round(20+x/W*80);
    d[i+1]=isSpiral?Math.round(Math.sin(x*0.05)*40+Math.random()*20):Math.round(40+t*100);
    d[i+2]=isSpiral?Math.round(Math.random()*30):Math.round(80+Math.cos(t*Math.PI)*60);
    d[i+3]=255;
  }
  return id;
}

let base=makeBase();
ctx.putImageData(base,0,0);
let offset=0;

function bend(){
  const fresh=makeBase();
  const d=fresh.data;
  // Classic databend: shift bytes by offset
  offset=(offset+137)%4000;
  const out=new Uint8ClampedArray(d);
  for(let i=offset;i<d.length-4;i++){
    out[i]=d[(i+offset*3)%d.length];
  }
  // Add scan-line corruption
  for(let y=0;y<H;y+=Math.floor(8+Math.random()*20)){
    const startByte=y*W*4;
    const shiftAmt=Math.floor(Math.random()*200)*4;
    for(let x=0;x<W*4;x++){
      out[startByte+x]=d[(startByte+x+shiftAmt)%d.length];
    }
  }
  // RGB channel shift
  for(let i=0;i<out.length;i+=4){
    const tmp=out[i];
    out[i]=out[(i+offset*4)%out.length];
    out[(i+offset*4)%out.length]=tmp;
  }
  const id=new ImageData(out,W,H);
  ctx.putImageData(id,0,0);
  document.getElementById('offset').textContent='offset: '+offset;
}

function reset(){offset=0;ctx.putImageData(base,0,0);document.getElementById('offset').textContent='offset: 0';}
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
