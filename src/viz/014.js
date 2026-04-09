import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>014 – The Progress Bar of Doom</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { 
  background: #008080; /* Windows 95 Desktop Teal */
  font-family: 'MS Sans Serif', 'Segoe UI', Tahoma, sans-serif;
  min-height: 100vh; display: flex; flex-direction: column; 
  align-items: center; justify-content: center; padding: 20px;
  overflow: hidden;
}

/* Retro Window Container */
.window { 
  background: #c0c0c0; border: 2px solid; 
  border-color: #ffffff #000000 #000000 #ffffff; 
  padding: 2px; min-width: 440px; max-width: 600px; width: 100%; 
  box-shadow: 1px 1px 0 #000, 2px 2px 5px rgba(0,0,0,0.5);
  position: relative; z-index: 10;
}

/* Duplicating windows for the cascade effect */
.cascade-clone {
  position: absolute; pointer-events: none; z-index: 5;
}

.titlebar { 
  background: #000080; color: #fff; padding: 3px 4px 3px 6px; 
  display: flex; align-items: center; justify-content: space-between; 
  font-size: 13px; font-weight: bold; cursor: default; user-select: none;
  letter-spacing: 0.5px;
}
.titlebar.inactive { background: #808080; color: #c0c0c0; }

.window-btns { display: flex; gap: 2px; }
.wbtn { 
  width: 16px; height: 14px; background: #c0c0c0; border: 1px solid; 
  border-color: #ffffff #000000 #000000 #ffffff; color: #000;
  font-size: 10px; display: flex; align-items: center; justify-content: center; 
  cursor: pointer; font-weight: bold; line-height: 1;
}
.wbtn:active { border-color: #000000 #ffffff #ffffff #000000; padding-top: 1px; padding-left: 1px; }

.content { padding: 16px; }
.dialog-header { display: flex; align-items: flex-start; margin-bottom: 24px; gap: 16px; }
.dialog-icon { font-size: 32px; filter: drop-shadow(1px 1px 0px #fff); }
.dialog-text { font-size: 13px; color: #222; margin-top: 4px; line-height: 1.5; min-height: 40px; }

.progress-container { margin-bottom: 16px; }
.progress-label { font-size: 13px; margin-bottom: 4px; color: #000; }
.progress-track { 
  background: #fff; border: 2px solid; border-color: #808080 #ffffff #ffffff #808080; 
  height: 22px; position: relative;
}

.progress-fill { 
  height: 100%; background: #000080; transition: width 0.1s linear; 
}
.progress-fill.danger { background: #800000; }

.progress-pct { font-size: 13px; margin-top: 4px; font-weight: bold; color: #000080; }
.progress-pct.danger { color: #800000; }

.buttons { display: flex; gap: 8px; justify-content: center; margin-top: 24px; }
.btn { 
  padding: 4px 16px; min-width: 80px;
  border: 2px solid; border-color: #ffffff #000000 #000000 #ffffff; 
  background: #c0c0c0; color: #000; font-family: inherit; font-size: 13px; 
  cursor: pointer;
}
.btn:active { border-color: #000000 #ffffff #ffffff #000000; padding-top: 5px; padding-left: 17px; padding-right: 15px; padding-bottom: 3px; }

.status { font-size: 13px; color: #000; margin-top: 12px; min-height: 1.2em; }

/* Force overrides of global styles that might break the retro aesthetic */
:root { --bg: #008080 !important; }
@media (prefers-color-scheme: dark) {
  :root { --bg: #008080 !important; }
  body { background: #008080 !important; color: #000 !important; }
}

.bsod { display: none; position: fixed; inset: 0; background: #0000aa; color: #fff; z-index: 9999; padding: 10%; font-family: 'Perfect DOS VGA 437', monospace; font-size: 20px; }
</style>
</head>
<body>
${nav('014')}

<div id="desktop">
  <div class="window" id="main-win">
    <div class="titlebar">
      <span>Claude Code Agent — Processing</span>
      <div class="window-btns">
        <div class="wbtn">_</div><div class="wbtn">□</div><div class="wbtn">✕</div>
      </div>
    </div>
    <div class="content">
      <div class="dialog-header">
        <div class="dialog-icon">⏳</div>
        <div class="dialog-text" id="msg">Executing experiment runs...<br>Please wait. Do not interrupt the process.</div>
      </div>
      
      <div class="progress-container">
        <div class="progress-label">Lines Generated (out of 6,805):</div>
        <div class="progress-track">
          <div class="progress-fill" id="bar1" style="width:0%"></div>
        </div>
        <div class="progress-pct" id="pct1">0 lines</div>
      </div>

      <div class="progress-container">
        <div class="progress-label">Context Window Saturation:</div>
        <div class="progress-track">
          <div class="progress-fill" id="bar2" style="width:0%;background:#808000"></div>
        </div>
        <div class="progress-pct" id="pct2" style="color:#808000">0%</div>
      </div>

      <div class="status" id="status">Loading configuration...</div>
      <div class="buttons">
        <button class="btn" id="btn-cancel">Cancel</button>
        <button class="btn">Details &gt;&gt;</button>
      </div>
    </div>
  </div>
</div>

<div class="bsod" id="bsod">
  <p>A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) +<br>00010E36. The current session will be terminated.</p>
  <br>
  <p>* Press any key to terminate the current session.</p>
  <p>* Press CTRL+ALT+DEL again to restart your computer. You will<br>  lose any unsaved information in all applications.</p>
  <br>
  <p style="text-align: center">Press any key to continue _</p>
</div>

<script>
// Logic simulating the 6,805 line breakdown
let lineCount = 0;
const SPIRAL_START = 3501;
const TOTAL_LINES = 6805;

const msgEl = document.getElementById('msg');
const b1 = document.getElementById('bar1');
const p1 = document.getElementById('pct1');
const b2 = document.getElementById('bar2');
const p2 = document.getElementById('pct2');
const statEl = document.getElementById('status');
const desktop = document.getElementById('desktop');
const mainWin = document.getElementById('main-win');

document.getElementById('btn-cancel').addEventListener('click', function() {
  this.innerText = 'Ignoring';
  this.disabled = true;
});

function cascadeError() {
  const clone = mainWin.cloneNode(true);
  clone.className = 'window cascade-clone';
  clone.querySelector('.titlebar').classList.add('inactive'); // old windows go gray
  mainWin.querySelector('.titlebar').classList.remove('inactive'); // new window is blue
  
  // Random offset down and right
  const offset = (Math.random() * 20) + 10;
  
  // Actually we keep the original stationary and spawn the clones behind it visually
  // but to simulate the dragging error, we move the NEW active window
  
  const currentTop = parseInt(mainWin.style.top || 0);
  const currentLeft = parseInt(mainWin.style.left || 0);
  
  clone.style.top = currentTop + 'px';
  clone.style.left = currentLeft + 'px';
  clone.style.transform = mainWin.style.transform;
  
  // Put clone on desktop
  desktop.insertBefore(clone, mainWin);
  
  // Move active window
  mainWin.style.top = (currentTop + offset) + 'px';
  mainWin.style.left = (currentLeft + offset) + 'px';
  
  // If we hit edges, reverse or BSOD
  if (currentTop > window.innerHeight - 300) {
    document.getElementById('bsod').style.display = 'block';
  }
}

function tick() {
  if (lineCount >= TOTAL_LINES) {
    document.getElementById('bsod').style.display = 'block';
    return;
  }

  // Phase 1: Productive (0 to 3500)
  if (lineCount < SPIRAL_START) {
    lineCount += Math.floor(Math.random() * 200) + 50; // fast jumps
    if (lineCount > SPIRAL_START) lineCount = SPIRAL_START;
    
    if (lineCount < 1000) statEl.innerText = "Extracting formatting matrix (Haiku)...";
    else if (lineCount < 2000) statEl.innerText = "Validating Sonnet outputs...";
    else statEl.innerText = "Applying rubric R3 (Accuracy)...";
    
    b1.style.width = (lineCount / TOTAL_LINES * 100) + '%';
    p1.innerText = lineCount + ' lines';
    
    b2.style.width = (lineCount / TOTAL_LINES * 100) + '%';
    p2.innerText = Math.floor(lineCount/TOTAL_LINES*100) + '%';
    
    setTimeout(tick, Math.random() * 400 + 200);
  } 
  // Phase 2: The Spiral (3501 to 6805)
  else {
    lineCount += Math.floor(Math.random() * 50) + 1; // slower, painful grind
    
    b1.classList.add('danger');
    p1.classList.add('danger');
    b2.style.background = '#800000';
    p2.classList.add('danger');
    
    msgEl.innerHTML = "<strong>CRITICAL FAULT</strong><br>An unexpected 'Done.' token has triggered a recursive loop.";
    statEl.innerText = "Emitting 'Done.' (" + (lineCount - SPIRAL_START) + " loops detected)...";
    
    b1.style.width = (lineCount / TOTAL_LINES * 100) + '%';
    p1.innerText = lineCount + ' lines (RECURSION ERROR)';
    
    b2.style.width = '100%';
    p2.innerText = '100% FATAL MEMORY OVERFLOW';
    
    // Spawn error dialogs
    if (Math.random() > 0.6) {
      cascadeError();
    }
    
    setTimeout(tick, 50); // fast loop
  }
}

// Start sequence
setTimeout(tick, 1000);

</script>
</body>
</html>`;
}
