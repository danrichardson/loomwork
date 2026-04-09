import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>033 – Pixel Sort — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px;font-family:monospace}
h1{font-size:0.7rem;letter-spacing:0.2em;color:#ff8800;margin-bottom:4px;text-align:center;text-transform:uppercase}
canvas{display:block;max-width:100%}
.controls{display:flex;gap:12px;margin:10px 0;font-size:0.6rem;color:#888;flex-wrap:wrap;justify-content:center}
.btn{padding:4px 12px;border:1px solid #444;background:transparent;color:#888;cursor:pointer;font-family:monospace;font-size:0.6rem}
.btn.active{background:#ff8800;color:#000;border-color:#ff8800}
.subtitle{font-size:0.6rem;color:#444;text-align:center;margin-bottom:16px}
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
${nav('033')}
<h1>033 — Pixel Sort</h1>
<p class="subtitle">Session data visualized as pixel-sorted image · sorted by brightness = phase transition</p>
<div class="controls">
  <button class="btn active" id="sort-btn">▶ Sort</button>
  <button class="btn" id="reset-btn">↺ Reset</button>
  <span id="progress">Line: 0 / 6805</span>
</div>
<canvas id="c" width="600" height="400"></canvas>
<script>
const canvas=document.getElementById('c');
const ctx=canvas.getContext('2d');
const W=600,H=400;

// Generate the "image" from session data
// Each column = a 100-line window; each row = a different metric/phrase
function generateImage(){
  const imageData=ctx.createImageData(W,H);
  const d=imageData.data;
  const WINDOW=11; // 600px / 6805 lines ≈ 11 lines/px
  const N_COLS=Math.floor(6805/WINDOW);

  for(let x=0;x<W;x++){
    const lineStart=Math.floor(x/W*6805);
    const isSpiral=lineStart>=3637;
    const isDrift=lineStart>=3500&&lineStart<3637;
    const t=isSpiral?(lineStart-3637)/(6805-3637):0;

    for(let y=0;y<H;y++){
      const band=y/H;
      const i=(y*W+x)*4;

      let r,g,b;
      if(!isSpiral&&!isDrift){
        // Productive: warm gradient from deep blue to orange
        const progress=lineStart/3500;
        r=Math.round(progress*200+20);g=Math.round(progress*150+20);b=Math.round(150-progress*100);
      }else if(isDrift){
        r=220;g=180;b=0;
      }else{
        // Spiral: hot reds with noise
        r=Math.round(180+Math.random()*75);
        g=Math.round((1-t)*80+Math.random()*20);
        b=Math.round((1-t)*80+Math.random()*20);
      }
      // Add per-row variation (different "channels")
      const rowOffset=Math.sin(band*Math.PI*8+lineStart*0.01)*20;
      d[i]=Math.min(255,Math.max(0,r+rowOffset));
      d[i+1]=Math.min(255,Math.max(0,g-rowOffset*0.5));
      d[i+2]=Math.min(255,Math.max(0,b));
      d[i+3]=255;
    }
  }
  return imageData;
}

const originalData=generateImage();
ctx.putImageData(originalData,0,0);

let sorted=false,animating=false;

function pixelSort(){
  if(animating)return;
  animating=true;
  const imageData=ctx.createImageData(W,H);
  const orig=ctx.getImageData(0,0,W,H);
  imageData.data.set(orig.data);

  let col=0;
  function sortColumn(){
    if(col>=W){animating=false;sorted=true;return;}
    // Get column pixels
    const pixels=[];
    for(let y=0;y<H;y++){
      const i=(y*W+col)*4;
      const brightness=0.299*imageData.data[i]+0.587*imageData.data[i+1]+0.114*imageData.data[i+2];
      pixels.push({brightness,r:imageData.data[i],g:imageData.data[i+1],b:imageData.data[i+2]});
    }
    // Sort by brightness
    pixels.sort((a,b)=>a.brightness-b.brightness);
    // Write back
    pixels.forEach((p,y)=>{
      const i=(y*W+col)*4;
      imageData.data[i]=p.r;imageData.data[i+1]=p.g;imageData.data[i+2]=p.b;imageData.data[i+3]=255;
    });
    ctx.putImageData(imageData,0,0);
    document.getElementById('progress').textContent='Col: '+col+' / '+W;
    col+=3;
    requestAnimationFrame(sortColumn);
  }
  sortColumn();
}

document.getElementById('sort-btn').addEventListener('click',()=>{if(!sorted&&!animating)pixelSort();});
document.getElementById('reset-btn').addEventListener('click',()=>{
  sorted=false;animating=false;
  ctx.putImageData(originalData,0,0);
  document.getElementById('progress').textContent='Line: 0 / 6805';
});
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
