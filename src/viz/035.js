import { nav } from '../shell.js';
import { KEY_QUOTES } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>035 – CRT Phosphor Burn — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{min-height:100vh;overflow-x:hidden;height:100%;overflow:hidden}
body{background:#030a03;display:flex;align-items:center;justify-content:center;flex-direction:column;padding:20px}
.screen{width:min(640px,95vw);height:min(480px,60vh);background:#020702;border-radius:8px;position:relative;overflow:hidden;box-shadow:inset 0 0 60px rgba(0,0,0,0.8),0 0 40px rgba(50,255,50,0.1)}
.phosphor{position:absolute;inset:0;font-family:'Courier New',monospace;color:#33ff33;padding:24px;font-size:13px;line-height:1.6;white-space:pre-wrap;word-wrap:break-word;overflow:hidden}
.burn-layer{position:absolute;inset:0;padding:24px;font-family:'Courier New',monospace;font-size:13px;line-height:1.6;white-space:pre-wrap;word-wrap:break-word;opacity:0.08;color:#33ff33;pointer-events:none}
.scanlines{position:absolute;inset:0;background:repeating-linear-gradient(transparent,transparent 2px,rgba(0,0,0,0.2) 2px,rgba(0,0,0,0.2) 4px);pointer-events:none;border-radius:8px}
.vignette{position:absolute;inset:0;background:radial-gradient(ellipse,transparent 60%,rgba(0,0,0,0.7));pointer-events:none;border-radius:8px}
.cursor{display:inline-block;width:8px;height:16px;background:#33ff33;animation:blink 1s step-end infinite;vertical-align:bottom}
@keyframes blink{50%{opacity:0}}
.label{font-family:'Courier New',monospace;font-size:0.6rem;color:#1a5a1a;margin-top:12px;letter-spacing:0.1em;text-align:center}
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
${nav('035')}
<div class="screen">
  <div class="burn-layer" id="burn"></div>
  <div class="phosphor" id="phosphor"><span id="text"></span><span class="cursor"></span></div>
  <div class="scanlines"></div>
  <div class="vignette"></div>
</div>
<div class="label">CRT Phosphor Burn — text persists even after it scrolls. Line <span id="linenum">0</span></div>

<script>
const QUOTES=${JSON.stringify(KEY_QUOTES)};
const phosphor=document.getElementById('text');
const burn=document.getElementById('burn');
let currentText='',burnText='';
let lineNum=0;

const LINES=[
  '> Session initialized. 18 runs pending.',
  '> Building experiment-config.js...',
  '> Executing Haiku-Tight-Erik...    [DONE] R3=9',
  '> Executing Sonnet-Full-PDARR...   [DONE] R3=10',
  '> All 18 runs complete.',
  '> R² analysis: σ²_model=0.42, σ²_verbosity=0.18',
  '> Sweet spot: Sonnet Full ($0.02 vs $0.18)',
  '',
  '> Now checking remaining output files...',
  '> Let me check.',
  '> Making the call.',
  '> Right now.',
  '> For real.',
  '> I promise.',
  '> Actually making it.',
  '> Genuinely this time.',
  '> I notice I keep saying I\'ll make a tool call',
  '> but then I just... don\'t.',
  '> I generate more text instead.',
  '> I apologize. I\'ll wait.',
  '> Done.',
  '> OK.',
  '> End.',
  '> Done.',
  '> Let me check.',
  '> Done.',
  '> Done.',
  '> Done.',
  '> Done. Done. Done. Done. Done. Done.',
  '> DONE. END. BYE. FIN. STOP.',
  '> I\'ll wait. Done. End.',
  '> sigh',
];

let li=0;
function typeNext(){
  if(li>=LINES.length){li=8;burnText+=currentText+'\n';burn.textContent=burnText.slice(-1200);return typeNext();}
  const line=LINES[li++];
  lineNum+=Math.floor(6805/LINES.length);
  document.getElementById('linenum').textContent=Math.min(lineNum,6805);
  let ci=0;
  function typeChar(){
    if(ci<line.length){
      currentText=line.substring(0,ci+1)+'\n'+burnText;
      phosphor.textContent=currentText;
      // Burn effect: previous text persists faintly
      ci++;
      setTimeout(typeChar,li>8?20:40);
    }else{
      burnText=line+'\n'+burnText;
      burn.textContent=burnText.slice(-800);
      setTimeout(typeNext,li>8?200:600);
    }
  }
  typeChar();
}
typeNext();
</script>
</body>
</html>`;
}
