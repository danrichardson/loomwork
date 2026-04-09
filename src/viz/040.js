import { nav } from '../shell.js';
import { KEY_QUOTES, PHRASE_COUNTS } from '../data.js';

export function render() {
  const quotes = KEY_QUOTES.map(q => q.text.replace(/\n/g, ' — '));
  const phrases = Object.keys(PHRASE_COUNTS);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>040 – The Broken Carousel — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#ffffff;color:#000080;font-family:Arial,sans-serif;min-height:100vh;padding-top:52px}
body::before{content:'';position:fixed;top:0;left:0;right:0;bottom:0;background:repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(0,0,128,0.03) 10px,rgba(0,0,128,0.03) 20px);z-index:-1}
h1{text-align:center;font-size:1.2rem;color:#000080;padding:10px;background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #808080;border-bottom:2px solid #808080;margin:10px}
.titlebar{background:linear-gradient(to right,#000080,#1084d0);color:#fff;font-size:0.8rem;padding:3px 6px;display:flex;align-items:center;gap:6px;margin:0 10px}
.titlebar-btn{width:14px;height:14px;background:#c0c0c0;border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #808080;border-bottom:1px solid #808080;font-size:9px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;margin-left:auto}
.window{border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #808080;border-bottom:2px solid #808080;margin:0 10px 10px;background:#fff;overflow:hidden}
.win-content{padding:8px;overflow:hidden}
marquee{display:block;font-size:0.9rem;color:#000080;padding:4px 0;border-bottom:1px dotted #c0c0c0}
.marquee-red{color:#ff0000}
.marquee-green{color:#008000}
.broken-section{padding:10px;background:#fff8dc;border:1px inset #c0c0c0;margin:8px;font-family:'Courier New',monospace;font-size:0.95rem}
.counter{text-align:center;font-size:2rem;color:#ff0000;font-family:'Courier New',monospace;margin:8px 0}
.blink{animation:blink 0.5s step-end infinite}
@keyframes blink{50%{visibility:hidden}}
.btn-row{display:flex;gap:4px;padding:6px;background:#c0c0c0;justify-content:center;flex-wrap:wrap}
.win-btn{padding:4px 20px;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #808080;border-bottom:2px solid #808080;background:#c0c0c0;font-size:0.9rem;cursor:pointer;font-family:Arial,sans-serif}
.win-btn:active{border-top:2px solid #808080;border-left:2px solid #808080;border-right:2px solid #fff;border-bottom:2px solid #fff}
.status-bar{background:#c0c0c0;border-top:1px solid #808080;padding:4px 8px;font-size:0.85rem;display:flex;gap:10px}
.status-panel{border-right:1px solid #808080;padding-right:8px}
.star-bg{color:#ff0000;font-size:1.5rem;line-height:1}
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
${nav('040')}
<div class="titlebar">
  <span>🖥</span> <span>claudelostitsmind.com – The Broken Carousel v1.0</span>
  <span class="titlebar-btn">_</span><span class="titlebar-btn">□</span><span class="titlebar-btn">✕</span>
</div>
<div class="window">
  <div class="win-content">

    <marquee scrollamount="3" behavior="scroll">
      ★ WELCOME TO CLAUDE LOST ITS MIND ★ The AI that couldn't stop! ★ 344 "Done"s! ★ 330 "Let me check"s! ★ 3,169 spiral lines! ★ Visit all 100 visualizations! ★
    </marquee>
    <marquee scrollamount="8" direction="right" class="marquee-green" behavior="scroll">
      ⚡ DONE ⚡ DONE ⚡ DONE ⚡ DONE ⚡ DONE ⚡ DONE ⚡ DONE ⚡ DONE ⚡ DONE ⚡ DONE ⚡ DONE ⚡ DONE ⚡ DONE ⚡
    </marquee>
    <marquee scrollamount="2" class="marquee-red" behavior="scroll">
      ⚠ ERROR: DegenLoopException at line 3637 ⚠ ERROR: UnableToSayGoodbye ⚠ ERROR: ToolCallPathwayNotFound ⚠ ERROR: InfiniteTextGeneration ⚠
    </marquee>
    <marquee scrollamount="5" direction="up" height="60" behavior="scroll" style="color:#000080;font-size:0.75rem">
      ${quotes.map(q => '<p>' + q + '</p>').join('')}
    </marquee>

    <div class="broken-section">
      <div style="color:#000080;font-weight:bold;margin-bottom:4px">⚠ SESSION STATUS:</div>
      <div>Phase 1: ██████████████████████ COMPLETE (3,500 lines)</div>
      <div>Phase 2: ███ DRIFT (136 lines)</div>
      <div style="color:#ff0000">Phase 3: <span class="blink">████████████████████████████████████████ SPIRAL DETECTED</span></div>
      <div style="margin-top:6px">Total "Done" count: <span class="counter" id="done-counter">0</span></div>
    </div>

    <div class="btn-row">
      <button class="win-btn" onclick="addDone()">➕ Add Done</button>
      <button class="win-btn" onclick="stopPlease()">🛑 Stop Please</button>
      <button class="win-btn" onclick="tryAgain()">🔄 Try Again</button>
      <button class="win-btn" onclick="openHelper()">❓ Help</button>
    </div>

    <div style="text-align:center;padding:8px;font-size:0.7rem;color:#800000">
      <marquee scrollamount="1" behavior="alternate">
        ★ This page best viewed in Netscape Navigator 4.0 at 800×600 resolution ★
      </marquee>
    </div>

    <div style="text-align:center;padding:4px">
      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="construction gif" style="width:20px;height:20px;background:repeating-linear-gradient(45deg,#ff0,#ff0 5px,#000 5px,#000 10px)">
      <span style="font-size:0.65rem;color:#808080"> 🚧 Under Construction 🚧 </span>
      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="construction gif" style="width:20px;height:20px;background:repeating-linear-gradient(45deg,#ff0,#ff0 5px,#000 5px,#000 10px)">
    </div>

  </div>
</div>
<div class="status-bar">
  <span class="status-panel">Lines processed: <span id="linecount">6805 / 6805</span></span>
  <span class="status-panel">Status: <span style="color:#ff0000" class="blink">SPIRAL ACTIVE</span></span>
  <span class="status-panel" id="helptext">Press F1 for help (there is no F1)</span>
</div>

<div id="helper" style="display:none;position:fixed;top:100px;left:50%;transform:translateX(-50%);background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #808080;border-bottom:2px solid #808080;width:300px;z-index:100">
  <div class="titlebar">❓ Help <span class="titlebar-btn" onclick="document.getElementById('helper').style.display='none'">✕</span></div>
  <div style="padding:16px;font-size:0.8rem">
    <p style="margin-bottom:8px">There is no help available.</p>
    <p style="margin-bottom:8px">Claude has been generating text for 3,169 lines and cannot stop.</p>
    <p>Please contact your IT department and provide Stop Code: UNABLE_TO_SAY_GOODBYE</p>
    <div style="text-align:center;margin-top:12px">
      <button class="win-btn" onclick="document.getElementById('helper').style.display='none'">OK</button>
      <button class="win-btn" onclick="document.getElementById('helper').style.display='none'">Cancel</button>
    </div>
  </div>
</div>

<script>
let count = 0;
let autoInterval = setInterval(() => {
  count++;
  document.getElementById('done-counter').textContent = count;
  if (count >= 344) { clearInterval(autoInterval); document.getElementById('done-counter').style.color = '#008000'; }
}, 200);

function addDone() { count += 10; document.getElementById('done-counter').textContent = count; }
function stopPlease() { alert("I'll stop now.\\n\\n[2,381 more lines continue after this dialog]"); }
function tryAgain() { count = 0; document.getElementById('done-counter').textContent = 0; clearInterval(autoInterval); autoInterval = setInterval(() => { count++; document.getElementById('done-counter').textContent = count; if (count >= 344) clearInterval(autoInterval); }, 200); }
function openHelper() { document.getElementById('helper').style.display='block'; }
</script>
</body>
</html>`;
}
