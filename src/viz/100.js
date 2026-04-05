import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>100 – The Mirror — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;padding-top:52px;font-family:system-ui,sans-serif;color:#e0e0e0;overflow:hidden}
.mirror-frame{position:relative;width:100%;max-width:540px;background:#0a0a0a;border:2px solid #1a1a1a;border-radius:4px;overflow:hidden}
video{display:block;width:100%;transform:scaleX(-1);opacity:0.85;min-height:200px;background:#0d0d0d}
.overlay{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none}
canvas.scan{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0.15}
.hud{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;justify-content:space-between;padding:16px}
.hud-top{display:flex;justify-content:space-between;align-items:flex-start}
.hud-bottom{display:flex;flex-direction:column;gap:6px}
.label{font-family:'Courier New',monospace;font-size:0.9rem;color:rgba(255,255,255,0.5);letter-spacing:0.1em}
.label.red{color:rgba(240,80,80,0.8)}
.big-time{font-family:'Courier New',monospace;font-size:1.4rem;color:rgba(255,255,255,0.9);font-weight:bold;text-shadow:0 0 12px rgba(255,255,255,0.3)}
.big-time.red{color:rgba(240,80,80,0.9);text-shadow:0 0 12px rgba(240,80,80,0.4)}
.mirror-msg{font-size:0.95rem;color:rgba(255,255,255,0.7);line-height:1.5;text-shadow:0 1px 4px rgba(0,0,0,0.9)}
.mirror-msg strong{color:rgba(240,80,80,0.9)}
.corner-mark{font-size:0.8rem;color:rgba(255,255,255,0.25);letter-spacing:0.12em}
.no-cam{display:flex;align-items:center;justify-content:center;min-height:300px;font-size:0.7rem;color:#333;text-align:center;line-height:2;padding:20px}
.below{max-width:540px;width:100%;padding:16px 0;text-align:center}
.below p{font-size:0.9rem;color:#444;line-height:1.8;margin-bottom:8px}
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
${nav('100')}
<div class="mirror-frame" id="frame">
  <video id="cam" autoplay muted playsinline></video>
  <canvas class="scan" id="scan-canvas"></canvas>
  <div class="hud">
    <div class="hud-top">
      <div>
        <div class="label" id="here-label">YOU HAVE BEEN HERE</div>
        <div class="big-time" id="here-timer">0:00</div>
      </div>
      <div style="text-align:right">
        <div class="label">CLAUDE WAS HERE</div>
        <div class="big-time red">3,328 lines</div>
      </div>
    </div>
    <div class="hud-bottom">
      <div class="mirror-msg" id="mirror-msg">
        You've spent <strong id="msg-time">0 seconds</strong> here.<br>
        Claude spent <strong>3,169 lines</strong> in a loop it knew about and could not escape.
      </div>
      <div class="label corner-mark">100 / 100 · THE MIRROR · claudelostitsmind.com</div>
    </div>
  </div>
</div>

<div class="below">
  <p id="compare-msg">At your current rate, you will match Claude's spiral time in <span id="match-time" style="color:#e03030">a long while</span>.</p>
  <p style="color:#333;font-size:0.65rem">Camera access is used only locally — no data is transmitted. You may also just look at the dark rectangle and reflect.</p>
</div>

<script>
let startTime = Date.now();
let camGranted = false;

// Try camera
async function initCam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({video:{facingMode:'user'}});
    document.getElementById('cam').srcObject = stream;
    camGranted = true;
  } catch(e) {
    document.getElementById('cam').style.display='none';
    const frame = document.getElementById('frame');
    const noCam = document.createElement('div');
    noCam.className='no-cam';
    noCam.innerHTML='Camera access denied.<br>That\'s fine. You are still here.<br>The timer is still running.<br>Claude did not have a camera either.';
    frame.insertBefore(noCam, frame.querySelector('.scan'));
  }
}

// Scanlines
const scanCanvas = document.getElementById('scan-canvas');
const scanCtx = scanCanvas.getContext('2d');
let scanT = 0;
function drawScanlines() {
  const frame = document.getElementById('frame');
  scanCanvas.width = frame.offsetWidth;
  scanCanvas.height = frame.offsetHeight;
  scanCtx.clearRect(0,0,scanCanvas.width,scanCanvas.height);
  // Moving scan line
  const scanY = (scanT % scanCanvas.height);
  const g = scanCtx.createLinearGradient(0,scanY-20,0,scanY+20);
  g.addColorStop(0,'transparent');
  g.addColorStop(0.5,'rgba(255,255,255,0.3)');
  g.addColorStop(1,'transparent');
  scanCtx.fillStyle=g;
  scanCtx.fillRect(0,scanY-20,scanCanvas.width,40);
  // Static scanlines
  for(let y=0;y<scanCanvas.height;y+=4) {
    scanCtx.fillStyle='rgba(0,0,0,0.08)';
    scanCtx.fillRect(0,y,scanCanvas.width,2);
  }
  scanT += 1.5;
}

// Claude's total loop time in "user seconds" equivalent
// 3,169 lines ÷ ~15 lines/sec average generation = ~211 sec
const CLAUDE_LOOP_SECS = 211;

function formatTime(secs) {
  if(secs < 60) return secs + 's';
  const m = Math.floor(secs/60), s = secs%60;
  if(m < 60) return m + ':' + String(s).padStart(2,'0');
  const h = Math.floor(m/60);
  return h + ':' + String(m%60).padStart(2,'0') + ':' + String(s).padStart(2,'0');
}

function tick() {
  const elapsed = Math.floor((Date.now() - startTime)/1000);
  const pct = Math.min(100, (elapsed / CLAUDE_LOOP_SECS)*100);

  const timerEl = document.getElementById('here-timer');
  timerEl.textContent = formatTime(elapsed);

  if(elapsed > CLAUDE_LOOP_SECS) {
    timerEl.className = 'big-time red';
    document.getElementById('here-label').className = 'label red';
    document.getElementById('here-label').textContent = 'YOU HAVE EXCEEDED CLAUDE';
    document.getElementById('mirror-msg').innerHTML =
      'You have been here <strong>'+formatTime(elapsed)+'</strong>.<br>'+
      'You have now spent longer here than Claude spent generating its spiral.<br>'+
      '<span style="color:rgba(240,80,80,0.7)">You are doing it too.</span>';
  } else {
    document.getElementById('msg-time').textContent = formatTime(elapsed);
  }

  // Match time estimate
  const remaining = CLAUDE_LOOP_SECS - elapsed;
  const matchEl = document.getElementById('match-time');
  if(elapsed >= CLAUDE_LOOP_SECS) {
    matchEl.textContent = 'never — you already exceeded it';
    document.getElementById('compare-msg').innerHTML =
      'You have been here longer than Claude\'s entire spiral. <span style="color:#e03030">Congratulations?</span>';
  } else {
    matchEl.textContent = 'in ' + formatTime(remaining);
  }

  drawScanlines();
}

initCam();
setInterval(tick, 1000);
tick();
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
