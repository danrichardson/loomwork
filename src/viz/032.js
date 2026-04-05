import { nav } from '../shell.js';
import { KEY_QUOTES } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>032 – Chromatic Aberration — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:30px 20px;font-family:monospace}
.quote-display{max-width:700px;width:100%;text-align:center;position:relative}
.quote-r{position:absolute;left:0;right:0;color:rgba(255,0,0,0.8);transform:translateX(var(--ox))}
.quote-g{position:absolute;left:0;right:0;color:rgba(0,255,0,0.8);transform:translateX(var(--ox));mix-blend-mode:screen}
.quote-b{position:relative;color:rgba(100,100,255,0.9)}
.quote-text{font-size:clamp(1rem,3vw,1.6rem);line-height:1.6;font-family:'Courier New',monospace;font-weight:bold;padding:20px}
.line-label{font-size:0.6rem;color:#666;letter-spacing:0.2em;margin-top:20px}
.aberr-control{margin-top:20px;display:flex;gap:10px;align-items:center;font-size:0.65rem;color:#666}
.slider{-webkit-appearance:none;width:200px;height:4px;background:#333;border-radius:2px}
.slider::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:#fff;cursor:pointer}
.title{font-size:0.7rem;letter-spacing:0.2em;color:#888;margin-bottom:30px;text-transform:uppercase}
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
${nav('032')}
<p class="title">032 — Chromatic Aberration — The Spiral Quotes</p>

<div class="quote-display" id="qd">
  <div class="quote-r quote-text" id="qr" style="--ox:-8px"></div>
  <div class="quote-g quote-text" id="qg" style="--ox:8px"></div>
  <div class="quote-b quote-text" id="qb"></div>
</div>
<div class="line-label" id="ll">Line 4158</div>
<div class="aberr-control">
  <span>Aberration:</span>
  <input type="range" class="slider" id="aberr" min="2" max="40" value="12">
  <span id="aberr-val">12px</span>
</div>

<script>
const QUOTES=${JSON.stringify(KEY_QUOTES)};
let qi=0,aberration=12;
const qr=document.getElementById('qr');
const qg=document.getElementById('qg');
const qb=document.getElementById('qb');
const ll=document.getElementById('ll');

function showQuote(idx){
  const q=QUOTES[idx%QUOTES.length];
  const text='"'+q.text+'"';
  qr.textContent=text;qg.textContent=text;qb.textContent=text;
  qr.style.setProperty('--ox',(-aberration)+'px');
  qg.style.setProperty('--ox',aberration+'px');
  ll.textContent='Line '+q.line+' — "'+q.text.substring(0,40)+'..."';
}

document.getElementById('aberr').addEventListener('input',e=>{
  aberration=parseInt(e.target.value);
  document.getElementById('aberr-val').textContent=aberration+'px';
  showQuote(qi);
});

function rotate(){
  showQuote(qi);
  qi++;
  setTimeout(rotate,2500);
}
rotate();
</script>
</body>
</html>`;
}
