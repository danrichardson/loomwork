import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>010 – The Mosaic Matrix — Claude Lost Its Mind</title>
<link href="https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@300;700&family=Inter:wght@300;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#fff;color:#111;font-family:'Inter',Helvetica,sans-serif;min-height:100vh;padding:30px 20px}
h1{font-size:1.4rem;font-weight:700;letter-spacing:-0.02em;margin-bottom:4px}
.subtitle{font-size:0.72rem;color:#888;margin-bottom:24px}
.mosaic{display:flex;gap:4px;width:100%;max-width:860px;margin:0 auto;align-items:flex-end}
.model-col{flex:1;display:flex;flex-direction:column;gap:4px}
.model-header{text-align:center;font-size:0.7rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:6px 0;color:#fff;border-radius:3px 3px 0 0}
.verb-block{display:flex;flex-direction:column;justify-content:center;align-items:center;border-radius:2px;cursor:default;position:relative;transition:filter 0.2s}
.verb-block:hover{filter:brightness(1.2);z-index:2}
.verb-label{font-size:0.65rem;font-weight:700;color:rgba(255,255,255,0.9);text-transform:uppercase;letter-spacing:0.08em}
.verb-score{font-size:1.1rem;font-weight:700;color:#fff}
.verb-desc{font-size:0.55rem;color:rgba(255,255,255,0.6);margin-top:2px}
.tooltip{position:fixed;display:none;background:#111;color:#fff;padding:10px 14px;border-radius:4px;font-size:0.72rem;line-height:1.8;pointer-events:none;z-index:100;max-width:220px}
.x-labels{display:flex;gap:4px;margin-bottom:6px;max-width:860px;margin-left:auto;margin-right:auto}
.x-label{flex:1;text-align:center;font-size:0.62rem;color:#888;letter-spacing:0.08em;text-transform:uppercase}
.legend{display:flex;gap:20px;margin-top:16px;font-size:0.7rem;color:#888;flex-wrap:wrap;justify-content:center}
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
${nav('010')}
<h1>010 — The Mosaic Matrix</h1>
<p class="subtitle">Mondrian-style: block area ∝ composite score · color = model · height = word count</p>

<div class="x-labels">
  <div class="x-label">Haiku</div>
  <div class="x-label">Sonnet</div>
  <div class="x-label">Opus</div>
</div>
<div class="mosaic" id="mosaic"></div>
<div class="legend">
  <span>Bright = Erik (simple)</span>
  <span>Dim = PDARR (complex)</span>
  <span>Block height ∝ word count</span>
</div>
<div class="tooltip" id="tip"></div>

<script>
const SCORES={
  'Haiku-Tight-Erik':[13,10,9,5,0,290],'Haiku-Tight-PDARR':[13,9,5,5,0,266],
  'Haiku-Medium-Erik':[14,10,9,5,0,650],'Haiku-Medium-PDARR':[13,9,4,5,0,580],
  'Haiku-Full-Erik':[14,10,10,3,0,980],'Haiku-Full-PDARR':[14,9,8,5,0,890],
  'Sonnet-Tight-Erik':[14,10,10,5,0,310],'Sonnet-Tight-PDARR':[13,9,9,5,0,295],
  'Sonnet-Medium-Erik':[14,10,10,5,0,720],'Sonnet-Medium-PDARR':[14,10,10,5,0,700],
  'Sonnet-Full-Erik':[14,10,10,5,0,1100],'Sonnet-Full-PDARR':[14,10,10,5,0,1050],
  'Opus-Tight-Erik':[12,9,10,5,0,380],'Opus-Tight-PDARR':[12,9,9,5,0,350],
  'Opus-Medium-Erik':[13,10,10,5,0,900],'Opus-Medium-PDARR':[13,9,10,5,0,850],
  'Opus-Full-Erik':[13,10,10,5,0,1900],'Opus-Full-PDARR':[13,10,10,5,0,2332],
};
function composite(s){return s[0]/14*25+s[1]/10*25+(s[2]+10)/20*35+s[3]/5*15;}
const COLORS={Haiku:'#e8350a',Sonnet:'#0a7ae8',Opus:'#6a0ae8'};
const MODELS=['Haiku','Sonnet','Opus'];
const VERBOSITY=['Tight','Medium','Full'];
const TRANSCRIPTS=['Erik','PDARR'];
const tip=document.getElementById('tip');

const mosaic=document.getElementById('mosaic');
let html='';
MODELS.forEach(m=>{
  const col=COLORS[m];
  html+=\`<div class="model-col">\`;
  html+=\`<div class="model-header" style="background:\${col}">\${m}</div>\`;
  VERBOSITY.forEach(v=>{
    const erikS=SCORES[m+'-'+v+'-Erik'];
    const pdarrS=SCORES[m+'-'+v+'-PDARR'];
    const erikC=composite(erikS),pdarrC=composite(pdarrS);
    const avgWords=(erikS[5]+pdarrS[5])/2;
    const heightPx=Math.round(30+(avgWords/2500)*180);
    const erikPct=Math.round(erikC);
    html+=\`<div class="verb-block" style="background:\${col};height:\${heightPx}px;opacity:\${0.5+erikPct/200}"
      data-key="\${m}-\${v}"
      data-e="\${JSON.stringify(erikS)}" data-p="\${JSON.stringify(pdarrS)}" data-ec="\${erikC.toFixed(1)}" data-pc="\${pdarrC.toFixed(1)}">
      <div class="verb-label">\${v}</div>
      <div class="verb-score">\${((erikC+pdarrC)/2).toFixed(1)}</div>
      <div class="verb-desc">\${avgWords.toFixed(0)}w avg</div>
    </div>\`;
  });
  html+=\`</div>\`;
});
mosaic.innerHTML=html;

mosaic.addEventListener('mousemove',e=>{
  const block=e.target.closest('[data-key]');
  if(block){
    tip.style.display='block';
    tip.style.left=(e.clientX+12)+'px';
    tip.style.top=(e.clientY-80)+'px';
    const ec=block.dataset.ec,pc=block.dataset.pc;
    tip.innerHTML=\`<b>\${block.dataset.key}</b><br>Erik: \${ec}/100<br>PDARR: \${pc}/100<br>Avg: \${((+ec+ +pc)/2).toFixed(1)}/100\`;
  }else tip.style.display='none';
});
mosaic.addEventListener('mouseleave',()=>tip.style.display='none');
</script>
</body>
</html>`;
}
