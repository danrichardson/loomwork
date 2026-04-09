import { nav } from '../shell.js';
import { KEY_QUOTES } from '../data.js';

export function render() {
  const quotes = KEY_QUOTES.map(q => q.text);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>031 – The VHS Glitch — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;overflow:hidden}
body{background:#000;display:flex;flex-direction:column;min-height:100vh}
canvas{position:fixed;top:0;left:0;z-index:0;width:100%;height:100%}
.overlay{position:fixed;inset:0;z-index:1;display:flex;flex-direction:column;justify-content:space-between;padding:50px 30px 80px;pointer-events:none}
.vhs-text{font-family:'Courier New',monospace;color:#fff;text-shadow:3px 0 #f00,-3px 0 #0ff;font-size:clamp(1rem,2.5vw,1.6rem);line-height:1.4;mix-blend-mode:screen}
.counter{font-family:'Courier New',monospace;font-size:1rem;color:#fff;opacity:0.8;letter-spacing:0.1em}
.rew-badge{display:inline-block;background:#f00;color:#fff;font-family:'Courier New',monospace;font-size:0.9rem;padding:3px 10px;letter-spacing:0.1em;animation:blink 1s infinite}
@keyframes blink{50%{opacity:0}}
.scanlines{position:fixed;inset:0;z-index:2;pointer-events:none;background:repeating-linear-gradient(transparent,transparent 3px,rgba(0,0,0,0.15) 3px,rgba(0,0,0,0.15) 4px)}
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
${nav('031')}
<canvas id="c"></canvas>
<div class="scanlines"></div>
<div class="overlay">
  <div>
    <div class="rew-badge">▶ PLAY</div>
    <div class="counter" id="counter">00:00:00</div>
  </div>
  <div class="vhs-text" id="main-text">Initializing...</div>
  <div style="display:flex;justify-content:space-between;align-items:flex-end">
    <div class="counter">SP · HI-FI · STEREO</div>
    <div class="counter" id="line-counter">LINE 0 / 6805</div>
  </div>
</div>

<script>
const QUOTES=${JSON.stringify(quotes)};
const canvas=document.getElementById('c');
const ctx=canvas.getContext('2d');
let W,H;

function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
resize();window.addEventListener('resize',resize);

let frame=0,glitchIntensity=0,currentLine=0;
let qi=0;

function draw(){
  W=canvas.width;H=canvas.height;
  // Static noise base
  const imageData=ctx.createImageData(W,H);
  const d=imageData.data;

  // Generate CRT-style video noise
  for(let y=0;y<H;y++){
    const isGlitchLine=Math.random()<glitchIntensity*0.3;
    const shift=isGlitchLine?Math.floor((Math.random()-0.5)*40):0;
    for(let x=0;x<W;x++){
      const i=(y*W+(x+shift+W)%W)*4;
      const noise=Math.random()*20*glitchIntensity;
      // Background gradient: green-ish for productive, red for spiral
      const isSpiral=currentLine>3637;
      const bg=isSpiral?[60,0,0]:[0,40,20];
      d[i]=bg[0]+noise;d[i+1]=bg[1]+noise;d[i+2]=bg[2]+noise;d[i+3]=255;
    }
    // Horizontal tear
    if(Math.random()<glitchIntensity*0.05){
      const tearY=y;
      const tearX=Math.floor(Math.random()*W);
      for(let tx=tearX;tx<Math.min(tearX+200,W);tx++){
        const i=(tearY*W+tx)*4;
        d[i]=200;d[i+1]=200;d[i+2]=200;d[i+3]=255;
      }
    }
  }
  ctx.putImageData(imageData,0,0);

  // Color fringing on text areas
  if(glitchIntensity>0.3){
    ctx.fillStyle=\`rgba(255,0,0,\${glitchIntensity*0.1})\`;
    ctx.fillRect(Math.random()*10-5,0,W,H);
    ctx.fillStyle=\`rgba(0,255,255,\${glitchIntensity*0.1})\`;
    ctx.fillRect(Math.random()*10-5,0,W,H);
  }

  frame++;
  if(currentLine>=6805){
    setTimeout(()=>{currentLine=0;qi=0;},2000);
  } else {
    currentLine=Math.min(6805,currentLine+6);
  }
  glitchIntensity=currentLine<3500?0.1:currentLine<3637?0.1+(currentLine-3500)/137*0.5:0.6+Math.sin(frame*0.05)*0.2;

  // Update counter
  const secs=Math.floor(frame/60);
  document.getElementById('counter').textContent=
    String(Math.floor(secs/3600)).padStart(2,'0')+':'+
    String(Math.floor((secs%3600)/60)).padStart(2,'0')+':'+
    String(secs%60).padStart(2,'0');
  document.getElementById('line-counter').textContent='LINE '+currentLine+' / 6805';

  requestAnimationFrame(draw);
}

// Quote rotation
function rotateQuote(){
  const el=document.getElementById('main-text');
  const q=QUOTES[qi%QUOTES.length];
  const isSpiral=qi>=5;
  el.style.textShadow=isSpiral?'4px 0 #f00,-4px 0 #0ff,0 0 20px #f00':'2px 0 #f00,-2px 0 #0ff';
  el.style.color=isSpiral?'#ff8888':'#fff';
  el.textContent='"'+q.substring(0,100)+'"';
  qi++;
  setTimeout(rotateQuote,3000);
}
rotateQuote();
draw();
</script>
</body>
</html>`;
}
