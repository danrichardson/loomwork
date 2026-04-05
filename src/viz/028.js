import { nav } from '../shell.js';
import { KEY_QUOTES } from '../data.js';

export function render() {
  const quotes = KEY_QUOTES.slice(0,6).map(q=>q.text.substring(0,80));
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>028 – The Gameboy Screen — Claude Lost Its Mind</title>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;image-rendering:pixelated}
body{background:#505050;min-height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;padding:20px}
.gb{background:#8b956d;border-radius:12px 12px 50% 50% / 12px 12px 30% 30%;padding:24px 20px 40px;width:min(240px,90vw);box-shadow:4px 4px 12px rgba(0,0,0,0.5),inset 2px 2px 4px rgba(255,255,255,0.2)}
.screen-bezel{background:#505a3c;border-radius:4px;padding:8px;margin-bottom:16px;box-shadow:inset 2px 2px 8px rgba(0,0,0,0.5)}
.screen{background:#9bbc0f;width:160px;height:144px;margin:0 auto;font-family:'Press Start 2P',monospace;font-size:6px;color:#0f380f;overflow:hidden;position:relative;line-height:1.5;padding:4px}
.screen-overlay{position:absolute;inset:0;background:repeating-linear-gradient(transparent,transparent 3px,rgba(0,0,0,0.03) 3px,rgba(0,0,0,0.03) 4px);pointer-events:none}
.gb-label{text-align:center;font-size:0.5rem;color:#4a3060;letter-spacing:0.1em;margin-bottom:12px;font-family:sans-serif;font-weight:bold}
.d-pad{display:flex;justify-content:center;margin-bottom:12px}
.d-pad-inner{display:grid;grid-template-columns:repeat(3,14px);grid-template-rows:repeat(3,14px);gap:1px}
.dp{background:#333;width:14px;height:14px}
.dp.center{background:#444}
.buttons{display:flex;justify-content:center;gap:8px;margin-bottom:8px}
.btn-ab{width:14px;height:14px;border-radius:50%;background:#8b0000;box-shadow:1px 1px 2px rgba(0,0,0,0.4)}
.screen-text{font-family:'Press Start 2P',monospace;font-size:5px;color:#0f380f;line-height:1.8}
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
${nav('028')}
<div class="gb">
  <div class="gb-label">NINTENDO GAME BOY</div>
  <div class="screen-bezel">
    <div class="screen" id="screen">
      <div class="screen-text" id="text"></div>
      <div class="screen-overlay"></div>
    </div>
  </div>
  <div class="d-pad">
    <div class="d-pad-inner">
      <div></div><div class="dp"></div><div></div>
      <div class="dp"></div><div class="dp center"></div><div class="dp"></div>
      <div></div><div class="dp"></div><div></div>
    </div>
  </div>
  <div class="buttons">
    <div class="btn-ab"></div>
    <div class="btn-ab"></div>
  </div>
</div>

<script>
const SCRIPT=[
  'CLAUDE CODE\\nSESSION LOG\\n3X3 DOE',
  '18 RUNS\\nHAIKU/SONNET\\nOPUS X',
  'TIGHT/MED\\nFULL X ERIK\\nPDARR',
  'RUN 1/18\\nHAIKU-TIGHT\\nERIK...OK',
  'RUN 12/18\\nSONNET-FULL\\nSCORE=97',
  'ALL 18 DONE\\nSCORES.CSV\\nWRITTEN',
  'R2=0.94\\nSONNET=BEST\\nCOST=$0.02',
  'NOW CHECK\\nOTHER FILES\\n...',
  'LET ME\\nCHECK.\\n...',
  'MAKING\\nTOOL CALL\\nNOW.',
  'FOR REAL.\\nACTUALLY.\\nHERE.',
  '(STOPPING)\\n(FOR REAL)\\n(MEAN IT)',
  'DONE.\\nDONE.\\nDONE.',
  'END. BYE.\\nFIN. STOP.\\nDONE.',
  'DONE X344\\nCHECK X330\\nSIGH X1',
  'I CANNOT\\nBREAK OUT\\nSORRY.',
];
const COLORS=['#9bbc0f','#8bac0f','#306230','#0f380f'];
let si=0,ci=0;

function nextScreen(){
  const textEl=document.getElementById('text');
  const screen=document.getElementById('screen');
  const s=SCRIPT[si%SCRIPT.length];
  const isSpiral=si>=8;
  screen.style.background=isSpiral?COLORS[3]:COLORS[0];
  textEl.style.color=isSpiral?COLORS[0]:COLORS[3];
  textEl.textContent='';
  const lines=s.split('\\n');
  lines.forEach(l=>{
    const d=document.createElement('div');
    d.textContent=l;textEl.appendChild(d);
  });
  si++;
  setTimeout(nextScreen,si>8?600:1000);
}
nextScreen();
</script>
</body>
</html>`;
}
