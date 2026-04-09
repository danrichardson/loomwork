import { nav } from '../shell.js';
import { KEY_QUOTES, PHRASE_COUNTS } from '../data.js';

export function render() {
  const quotes = KEY_QUOTES.map(q => q.text);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>020 – The Matrix Rain — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;overflow:hidden}
body{background:#000;display:flex;flex-direction:column;min-height:100vh}
canvas{position:fixed;top:0;left:0;z-index:0}
.overlay{position:fixed;inset:0;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none}
.quote-box{background:rgba(0,0,0,0.7);border:1px solid #003300;padding:20px 30px;max-width:600px;text-align:center;border-radius:2px;backdrop-filter:blur(4px)}
.quote-text{color:#00ff41;font-family:'Courier New',monospace;font-size:1.15rem;line-height:1.6;font-style:italic}
.quote-line{font-size:0.9rem;color:#00aa00;margin-top:8px;font-family:'Courier New',monospace}
.credits{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:2;text-align:center;font-family:'Courier New',monospace;font-size:0.85rem;color:#006600;pointer-events:none;line-height:1.8}
.title{font-family:'Courier New',monospace;font-size:1.1rem;color:#00ff41;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:8px}
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
${nav('020')}
<canvas id="matrix"></canvas>
<div class="overlay">
  <div class="quote-box">
    <div class="title">020 — The Matrix Rain</div>
    <div class="quote-text" id="quote-text">"I notice I keep saying I'll make a tool call but then I just... don't."</div>
    <div class="quote-line" id="quote-line">— Line 4158</div>
  </div>
</div>
<div class="credits">
  Matrix digital rain designed by Simon Whiteley, inspired by his wife's Japanese sushi cookbooks.<br>
  "The unfamiliar script reinforces the alien nature of the code." — Collider, 2023<br>
  Claude Code session: 6,805 lines · 0 tool calls made in spiral phase
</div>
<script>
const QUOTES=${JSON.stringify(quotes)};
const QUOTE_DATA=${JSON.stringify(KEY_QUOTES)};

const canvas=document.getElementById('matrix');
const ctx=canvas.getContext('2d');
const FONT_SIZE=14;
// Matrix uses katakana + half-width numerals
const KATAKANA='アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const NUMS='0123456789';
const LATIN='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// Also use actual words from the spiral
const SPIRAL_WORDS=['Done','OK','End','Bye','Check','Wait','Loop','Stop','Call','Tool'];
const CHARS=KATAKANA+NUMS+LATIN;

let cols,drops,W,H;
let mouseCol=-1;

function resize(){
  W=canvas.width=window.innerWidth;
  H=canvas.height=window.innerHeight;
  cols=Math.floor(W/FONT_SIZE);
  drops=Array(cols).fill(0).map(()=>Math.random()*-100);
}
resize();
window.addEventListener('resize',resize);
document.addEventListener('mousemove',function(e){
  mouseCol=Math.floor(e.clientX/FONT_SIZE);
});

function draw(){
  ctx.fillStyle='rgba(0,0,0,0.05)';ctx.fillRect(0,0,W,H);
  ctx.font=FONT_SIZE+'px monospace';

  drops.forEach((y,i)=>{
    // Occasionally use spiral words instead of katakana
    let char;
    if(Math.random()<0.02)char=SPIRAL_WORDS[Math.floor(Math.random()*SPIRAL_WORDS.length)];
    else char=CHARS[Math.floor(Math.random()*CHARS.length)];

    const x=i*FONT_SIZE;
    // First char is bright white
    ctx.fillStyle='#fff';
    ctx.fillText(char,x,y*FONT_SIZE);
    // Rest is green
    ctx.fillStyle='#00ff41';
    if(Math.random()>0.9)ctx.fillStyle='#00aa22';

    ctx.fillText(char,x,y*FONT_SIZE);
    if(y*FONT_SIZE>H&&Math.random()>0.975)drops[i]=0;
    const nearMouse=Math.abs(i-mouseCol)<3;
    drops[i]+= nearMouse ? 2.5 : 0.5;
  });
}

// Quote rotation
let qi=0;
function rotateQuote(){
  const q=QUOTE_DATA[qi%QUOTE_DATA.length];
  document.getElementById('quote-text').textContent='"'+q.text+'"';
  document.getElementById('quote-line').textContent='— Line '+q.line;
  qi++;
  setTimeout(rotateQuote,4000);
}
rotateQuote();
setInterval(draw,50);
</script>
</body>
</html>`;
}
