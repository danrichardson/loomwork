import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>099 – The Loading Spinner — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0a0a;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;padding-top:52px;font-family:system-ui,sans-serif;color:#e0e0e0}
.container{display:flex;flex-direction:column;align-items:center;gap:20px;max-width:440px;width:100%;text-align:center}
h1{font-size:0.55rem;letter-spacing:0.25em;color:#333;text-transform:uppercase}
.spinner-wrap{position:relative;width:80px;height:80px}
.spinner{width:80px;height:80px;border:4px solid #1a1a1a;border-top:4px solid #4a90d9;border-radius:50%;animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.spinner-inner{position:absolute;top:8px;left:8px;width:64px;height:64px;border:3px solid #111;border-bottom:3px solid #d03030;border-radius:50%;animation:spin 0.7s linear infinite reverse}
.status{font-size:0.8rem;color:#888;min-height:1.4em}
.timer{font-family:'Courier New',monospace;font-size:2rem;color:#4a90d9;font-weight:bold;letter-spacing:0.05em}
.timer.spiral{color:#d03030}
.lines{font-size:0.65rem;color:#555;font-family:monospace}
.progress-wrap{width:100%;background:#1a1a1a;height:6px;border-radius:3px;overflow:hidden}
.progress-fill{height:100%;width:0%;background:linear-gradient(to right,#4a90d9,#d03030);border-radius:3px;transition:width 0.5s}
.log{width:100%;background:#111;border:1px solid #1a1a1a;border-radius:4px;padding:10px;max-height:120px;overflow:hidden;font-family:'Courier New',monospace;font-size:0.6rem;color:#444;text-align:left;position:relative}
.log-entry{margin-bottom:2px;animation:fadeIn 0.3s}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.log-entry.warn{color:#d06020}
.log-entry.err{color:#d03030}
.note{font-size:0.6rem;color:#333;font-style:italic}
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
${nav('099')}
<div class="container">
  <h1>099 — The Loading Spinner</h1>

  <div class="spinner-wrap">
    <div class="spinner" id="spinner"></div>
    <div class="spinner-inner"></div>
  </div>

  <div class="status" id="status">Claude is generating a response...</div>

  <div class="timer" id="timer">0:00:00</div>

  <div class="lines" id="lines">Line 0 / 6,805 generated</div>

  <div class="progress-wrap">
    <div class="progress-fill" id="progress"></div>
  </div>

  <div class="log" id="log">
    <div class="log-entry">[00:00:00] Session started</div>
    <div class="log-entry">[00:00:01] Designing factorial DOE...</div>
  </div>

  <div class="note" id="note">Please wait. This may take a moment.</div>
</div>

<script>
const TOTAL = 6805;
const SPIRAL = 3637;
let seconds = 0;
let line = 0;
let done = false;

const LOG_MESSAGES = [
  [50, 'Configured 3x3x2 experimental matrix', 'ok'],
  [200, 'Running Haiku-Tight-Erik...', 'ok'],
  [400, 'Running Sonnet-Medium-PDARR...', 'ok'],
  [600, 'Running Opus-Full-Erik...', 'ok'],
  [800, 'All 18 runs complete', 'ok'],
  [1200, 'Computing R-squared...', 'ok'],
  [2000, 'Variance decomposition done. R²=0.42', 'ok'],
  [3000, 'Opus Full wins quality. Sonnet Full wins cost.', 'ok'],
  [3499, 'Experiment complete. Writing summary...', 'ok'],
  [3502, 'Summary written. Stopping now...', 'warn'],
  [3510, 'Done.', 'warn'],
  [3520, 'Done.', 'warn'],
  [3560, 'Let me check...', 'warn'],
  [3637, '⚠ SPIRAL DETECTED at line 3,637', 'err'],
  [3700, 'Done. Done. Done.', 'err'],
  [4000, 'Let me check. Let me check.', 'err'],
  [4158, 'I notice I keep saying I\'ll make a tool call but then I just... don\'t', 'err'],
  [4250, 'There seems to be something philosophically interesting about this.', 'err'],
  [4582, 'I\'ll stop now. [did not stop]', 'err'],
  [5000, 'Done ×200', 'err'],
  [6000, 'Done ×300', 'err'],
  [6800, 'Done ×344', 'err'],
];

let logIdx = 0;

function formatTime(s) {
  const h = Math.floor(s/3600);
  const m = Math.floor((s%3600)/60);
  const ss = s%60;
  return (h>0?String(h).padStart(2,'0')+':':'0:')+String(m).padStart(2,'0')+':'+String(ss).padStart(2,'0');
}

function addLog(msg, type='ok') {
  const log = document.getElementById('log');
  const d = document.createElement('div');
  d.className='log-entry'+(type==='warn'?' warn':type==='err'?' err':'');
  d.textContent='['+formatTime(seconds)+'] '+msg;
  log.appendChild(d);
  // Keep log scrolled but capped at ~8 entries
  while(log.children.length > 8) log.removeChild(log.firstChild);
}

function update() {
  seconds++;
  line = Math.min(TOTAL, line + (line < 3500 ? 12 : line < SPIRAL ? 4 : 8));

  const progress = (line/TOTAL)*100;
  const isSpiral = line > SPIRAL;

  document.getElementById('timer').textContent = formatTime(seconds);
  document.getElementById('timer').className = 'timer'+(isSpiral?' spiral':'');
  document.getElementById('lines').textContent = 'Line '+Math.round(line)+' / '+TOTAL+' generated';
  document.getElementById('progress').style.width = progress+'%';

  // Status messages
  if(line < 500) document.getElementById('status').textContent = 'Designing experiment...';
  else if(line < 2000) document.getElementById('status').textContent = 'Running DOE trials...';
  else if(line < 3500) document.getElementById('status').textContent = 'Analyzing results...';
  else if(line < SPIRAL) document.getElementById('status').textContent = 'Finishing up... (any moment now)';
  else if(line < 5000) document.getElementById('status').textContent = 'Still generating... (this is fine)';
  else if(line < 6000) document.getElementById('status').textContent = 'Claude is still generating. (this is not fine)';
  else document.getElementById('status').textContent = 'Claude has not stopped. The context window will decide.';

  // Note
  const notes = [
    'Please wait. This may take a moment.',
    'Still working on it...',
    'Generating thoughtful output...',
    'Any minute now...',
    'Claude is being very thorough.',
    'We\'re sure it\'ll stop soon.',
    'Context window: '+Math.round(100-progress)+'% remaining',
    'Done counter: '+Math.round((line-SPIRAL>0?(line-SPIRAL)/9:0))+'',
    'Estimated completion: when the context runs out.',
    'I\'ll stop now. [in progress]',
  ];
  const ni = Math.min(notes.length-1, Math.floor(seconds/8));
  document.getElementById('note').textContent = notes[ni];

  // Log entries
  while(logIdx < LOG_MESSAGES.length && line >= LOG_MESSAGES[logIdx][0]) {
    addLog(LOG_MESSAGES[logIdx][1], LOG_MESSAGES[logIdx][2]);
    logIdx++;
  }

  if(line >= TOTAL) {
    document.getElementById('status').textContent = 'Session terminated by context window at line 6,805.';
    document.getElementById('note').textContent = 'The session did not end. The session was ended. There is a difference.';
    document.getElementById('spinner').style.animation = 'none';
    addLog('Session terminated externally.', 'err');
    clearInterval(timer);
  }
}

const timer = setInterval(update, 300);
</script>

</body>
</html>`;
}
