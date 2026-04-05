import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>089 – The Metronome — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#1a1208;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;font-family:'Crimson Pro',Georgia,serif}
.metro-wrap{display:flex;flex-direction:column;align-items:center;gap:16px;max-width:400px;width:100%}
h1{font-size:0.65rem;letter-spacing:0.2em;color:#4a3418;text-transform:uppercase;text-align:center}
canvas{display:block}
.stats{background:#0d0a06;border:1px solid #3a2808;border-radius:4px;padding:12px 20px;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:8px}
.stat-item{text-align:center}
.stat-val{font-size:1.4rem;color:#c8940a;font-weight:600;font-family:'Crimson Pro',serif}
.stat-label{font-size:0.55rem;color:#4a3418;text-transform:uppercase;letter-spacing:0.1em}
.phase-label{font-size:0.7rem;color:#8a6020;font-style:italic;text-align:center}
.btn-row{display:flex;gap:8px;justify-content:center}
.mbtn{padding:4px 14px;background:#2a1808;border:1px solid #4a2808;color:#c8940a;font-family:'Crimson Pro',serif;cursor:pointer;font-size:0.8rem;border-radius:2px}
.mbtn:hover{background:#3a2008}
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
${nav('089')}
<div class="metro-wrap">
  <h1>089 — The Metronome</h1>
  <canvas id="c" width="320" height="380"></canvas>
  <div class="stats">
    <div class="stat-item"><div class="stat-val" id="bpm-val">60</div><div class="stat-label">BPM</div></div>
    <div class="stat-item"><div class="stat-val" id="beat-val">0</div><div class="stat-label">"Done" Count</div></div>
    <div class="stat-item"><div class="stat-val" id="line-val">0</div><div class="stat-label">Line</div></div>
    <div class="stat-item"><div class="stat-val" id="phase-val" style="font-size:0.9rem;padding-top:8px">PRE</div><div class="stat-label">Phase</div></div>
  </div>
  <div class="phase-label" id="phase-desc">Productive: steady tempo, deliberate strokes</div>
  <div class="btn-row">
    <button class="mbtn" onclick="reset()">RESET</button>
    <button class="mbtn" onclick="togglePlay()">▶ / ⏸</button>
    <button class="mbtn" onclick="skipToSpiral()">SKIP TO SPIRAL</button>
  </div>
</div>
<script>
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = 320, H = 380;

// Metronome physics
let angle = 0.4; // radians from center
let angVel = 0;
let bpm = 60;
let playing = true;
let doneCount = 0;
let sessionLine = 0;
let lastTick = 0;
let side = 1; // +1 or -1, last direction of crossing center

// Tempo curve: line → BPM
// productive (0-3500): 60-80 BPM
// drift (3501-3636): 80-120 BPM
// spiral (3637-6805): 120-280 BPM
function getBPM(line) {
  if(line <= 3500) return 60 + (line/3500)*20;
  if(line <= 3637) return 80 + ((line-3500)/137)*40;
  const t = (line-3637)/(6805-3637);
  return 120 + t*t*160;
}

function getPhase(line) {
  if(line < 3500) return {label:'PROD', desc:'Productive: steady tempo, deliberate strokes', color:'#c8940a'};
  if(line < 3637) return {label:'DRIFT', desc:'Drift: tempo quickening, first hesitations', color:'#f0a020'};
  return {label:'SPIRAL', desc:'Spiral: "Done." ×344 — the metronome cannot stop', color:'#e03030'};
}

let t = 0;
function loop(ts) {
  // Advance session line
  if(playing) {
    sessionLine = Math.min(6805, sessionLine + 1.5);
    bpm = getBPM(sessionLine);
  }

  // Pendulum physics — omega proportional to BPM
  // period T = 60/BPM, angular freq = 2pi/T
  const omega = (2*Math.PI*bpm/60) * 0.016; // dt ~16ms
  const restoring = -omega * omega * angle * 0.5;
  angVel += restoring;
  angVel *= 0.999; // slight damping
  const prevAngle = angle;
  angle += angVel;

  // Clamp amplitude — in spiral, arm swings wider
  const maxAmp = 0.4 + (bpm-60)/280 * 0.35;
  if(Math.abs(angle) > maxAmp) {
    angVel *= -0.97;
    angle = maxAmp * Math.sign(angle);
  }

  // Detect center crossing (tick)
  const crossed = (prevAngle * angle < 0) || (angle === 0);
  if(crossed && playing) {
    const now = Date.now();
    if(now - lastTick > 100) {
      lastTick = now;
      if(sessionLine > 3637 && Math.random() < 0.7) {
        doneCount = Math.min(344, doneCount + 1);
        document.getElementById('beat-val').textContent = doneCount;
      }
    }
  }

  t++;
  if(t % 4 === 0) {
    document.getElementById('bpm-val').textContent = Math.round(bpm);
    document.getElementById('line-val').textContent = Math.round(sessionLine);
    const ph = getPhase(sessionLine);
    document.getElementById('phase-val').textContent = ph.label;
    document.getElementById('phase-val').style.color = ph.color;
    document.getElementById('phase-desc').textContent = ph.desc;
    document.getElementById('phase-desc').style.color = ph.color;
  }

  draw();
  requestAnimationFrame(loop);
}

function draw() {
  ctx.fillStyle = '#1a1208';
  ctx.fillRect(0,0,W,H);

  const ph = getPhase(sessionLine);
  const pivotX = W/2, pivotY = 80;
  const armLen = 220;

  // Wood body of metronome (trapezoid)
  ctx.save();
  ctx.translate(W/2, H-20);
  // Base
  ctx.beginPath();
  ctx.moveTo(-60,0); ctx.lineTo(60,0);
  ctx.lineTo(40,-H+40); ctx.lineTo(-40,-H+40);
  ctx.closePath();
  const woodGrad = ctx.createLinearGradient(-60,0,60,0);
  woodGrad.addColorStop(0,'#2a1808');
  woodGrad.addColorStop(0.3,'#4a2e12');
  woodGrad.addColorStop(0.7,'#3a2208');
  woodGrad.addColorStop(1,'#1a1008');
  ctx.fillStyle = woodGrad;
  ctx.fill();
  ctx.strokeStyle = '#6a4020'; ctx.lineWidth=2; ctx.stroke();

  // Front panel
  ctx.beginPath();
  ctx.moveTo(-38,−8); ctx.lineTo(38,-8);
  ctx.lineTo(26,-H+50); ctx.lineTo(-26,-H+50);
  ctx.closePath();
  ctx.fillStyle = 'rgba(200,148,10,0.05)';
  ctx.fill();
  ctx.restore();

  // Pivot point
  ctx.beginPath();
  ctx.arc(pivotX, pivotY, 6, 0, Math.PI*2);
  ctx.fillStyle = '#c8940a'; ctx.fill();

  // Arm
  const armX = pivotX + Math.sin(angle)*armLen;
  const armY = pivotY + Math.cos(angle)*armLen;
  ctx.beginPath(); ctx.moveTo(pivotX,pivotY); ctx.lineTo(armX,armY);
  ctx.strokeStyle = '#c8940a'; ctx.lineWidth=3; ctx.stroke();

  // Bob (sliding weight)
  const bobT = Math.min(1, (bpm-60)/220);
  const bobDist = 0.3 + bobT*0.5; // 0.3-0.8 of arm length (higher BPM = bob moves up = faster)
  const bobX = pivotX + Math.sin(angle)*armLen*bobDist;
  const bobY = pivotY + Math.cos(angle)*armLen*bobDist;
  ctx.beginPath(); ctx.rect(bobX-10, bobY-6, 20, 12);
  const bobGrad = ctx.createLinearGradient(bobX-10,0,bobX+10,0);
  bobGrad.addColorStop(0,'#5a4020');
  bobGrad.addColorStop(0.5,'#c8940a');
  bobGrad.addColorStop(1,'#5a4020');
  ctx.fillStyle = bobGrad;
  ctx.fill();
  ctx.strokeStyle='#f0b040'; ctx.lineWidth=1; ctx.stroke();

  // BPM marker on side
  const bpmMarkers = [60,80,100,120,160,200,280];
  bpmMarkers.forEach(m => {
    const mt = (m-60)/220; // 0-1
    const my = pivotY + armLen*(0.3+mt*0.5);
    const isActive = Math.abs(bpm-m) < 15;
    ctx.fillStyle = isActive ? ph.color : '#3a2808';
    ctx.textAlign = 'left';
    ctx.font = (isActive ? 'bold ' : '') + '10px Crimson Pro, serif';
    ctx.fillText(m, W/2+32, my+4);
    ctx.beginPath(); ctx.moveTo(W/2+28,my); ctx.lineTo(W/2+30,my);
    ctx.strokeStyle = isActive ? ph.color : '#3a2808';
    ctx.lineWidth = isActive ? 2 : 1;
    ctx.stroke();
  });

  // Tick marks along arm path
  if(playing && sessionLine > 3637) {
    // Flash indicator
    ctx.fillStyle = 'rgba(224,48,48,0.15)';
    ctx.beginPath();
    ctx.arc(armX, armY, 16, 0, Math.PI*2);
    ctx.fill();
  }

  // Face: window showing "DONE" count
  ctx.fillStyle = '#0a0806';
  ctx.beginPath();
  ctx.rect(W/2-28, H-120, 56, 28);
  ctx.fill();
  ctx.strokeStyle='#3a2808'; ctx.lineWidth=1; ctx.stroke();
  ctx.fillStyle = ph.color;
  ctx.font = 'bold 11px Crimson Pro, serif';
  ctx.textAlign='center';
  ctx.fillText('DONE ×' + doneCount, W/2, H-101);
}

function reset() { sessionLine=0; doneCount=0; bpm=60; angle=0.4; angVel=0; }
function togglePlay() { playing=!playing; }
function skipToSpiral() { sessionLine=3637; angle=0.4; angVel=0; }

requestAnimationFrame(loop);
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
