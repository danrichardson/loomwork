import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>082 – The Waveform — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#1a1f2e;color:#ccc;font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px}
h1{font-size:0.65rem;letter-spacing:0.2em;color:#555;text-transform:uppercase;margin-bottom:4px;text-align:center}
.player{background:#111827;border:1px solid #222;border-radius:8px;padding:16px;width:100%;max-width:700px;margin-top:8px}
.player-title{font-size:0.9rem;color:#fff;font-weight:600;margin-bottom:2px}
.player-meta{font-size:0.65rem;color:#888;margin-bottom:12px}
canvas{display:block;width:100%;cursor:pointer;margin-bottom:8px}
.controls{display:flex;gap:10px;align-items:center}
.ctl-btn{width:32px;height:32px;border-radius:50%;background:#2563eb;color:#fff;border:none;cursor:pointer;font-size:0.8rem;display:flex;align-items:center;justify-content:center}
.ctl-btn:hover{background:#1d4ed8}
.time{font-size:0.7rem;color:#888;font-family:monospace;margin-left:4px}
.phase-labels{display:flex;justify-content:space-between;font-size:0.6rem;color:#555;margin-top:4px}
.chapter{background:#111827;border:1px solid #1e2a3a;padding:6px 10px;margin-top:8px;border-radius:4px;cursor:pointer}
.chapter:hover{border-color:#2563eb}
.chapter-title{font-size:0.75rem;color:#9ca3af;margin-bottom:1px}
.chapter-time{font-size:0.6rem;color:#4b5563}
.chapter.active .chapter-title{color:#2563eb}
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
${nav('082')}
<h1>082 — The Waveform</h1>
<div class="player">
  <div class="player-title">the-entire-mess.md — Session Recording</div>
  <div class="player-meta">Duration: 6,805 lines · 3 chapters · Podcast quality</div>
  <canvas id="waveform" height="120"></canvas>
  <div class="phase-labels">
    <span>Line 0</span>
    <span>1000</span>
    <span>2000</span>
    <span>3000</span>
    <span>3637 ⚠</span>
    <span>5000</span>
    <span>6805</span>
  </div>
  <div class="controls" style="margin-top:8px">
    <button class="ctl-btn" id="playBtn" onclick="togglePlay()">▶</button>
    <div style="flex:1;background:#1e2a3a;height:4px;border-radius:2px;position:relative;cursor:pointer" id="progress-bar" onclick="seek(event)">
      <div id="progress-fill" style="height:100%;background:#2563eb;border-radius:2px;width:0%"></div>
    </div>
    <span class="time" id="time">0:00 / 6805</span>
  </div>

  <div style="margin-top:12px">
    <div class="chapter" id="ch0" onclick="seekTo(0)"><div class="chapter-title">Chapter 1: The Experiment</div><div class="chapter-time">Lines 0–3,500 · DOE setup, 18 runs, analysis, results</div></div>
    <div class="chapter" id="ch1" onclick="seekTo(3501)"><div class="chapter-title">Chapter 2: The Drift</div><div class="chapter-time">Lines 3,501–3,636 · First signs of trouble</div></div>
    <div class="chapter" id="ch2" onclick="seekTo(3637)"><div class="chapter-title">Chapter 3: The Spiral ⚠</div><div class="chapter-time">Lines 3,637–6,805 · 3,169 lines of "Done"</div></div>
  </div>
</div>
<script>
const canvas = document.getElementById('waveform');
const ctx = canvas.getContext('2d');
const W = canvas.offsetWidth || 660;
const H = 120;
canvas.width = W; canvas.height = H;
const TOTAL = 6805, SPIRAL = 3637, DRIFT = 3501;

// Build waveform
function amplitude(line) {
  const t = line / TOTAL;
  if (line < DRIFT) {
    return 0.4 + Math.sin(t * Math.PI * 20) * 0.25 + Math.random() * 0.15;
  } else if (line < SPIRAL) {
    return 0.5 + Math.random() * 0.35;
  } else {
    // Spiral: high variance noise
    const st = (line - SPIRAL) / (TOTAL - SPIRAL);
    return 0.2 + Math.random() * (0.4 + st * 0.4);
  }
}

const waveData = Array.from({length: W}, (_, i) => {
  const line = (i / W) * TOTAL;
  return amplitude(line);
});

function drawWave(playhead) {
  ctx.fillStyle = '#111827'; ctx.fillRect(0, 0, W, H);

  const spiralX = (SPIRAL / TOTAL) * W;
  const driftX = (DRIFT / TOTAL) * W;
  ctx.fillStyle = 'rgba(37,99,235,0.05)'; ctx.fillRect(0, 0, driftX, H);
  ctx.fillStyle = 'rgba(245,158,11,0.07)'; ctx.fillRect(driftX, 0, spiralX - driftX, H);
  ctx.fillStyle = 'rgba(220,38,38,0.07)'; ctx.fillRect(spiralX, 0, W - spiralX, H);

  for (let x = 0; x < W; x++) {
    const amp = waveData[x];
    const h = amp * H * 0.45;
    const line = (x / W) * TOTAL;
    const isPlayed = x <= playhead;
    const isSpiral = line > SPIRAL;
    const isDrift = line > DRIFT && !isSpiral;
    let col;
    if (isSpiral) col = isPlayed ? '#dc2626' : '#7f1d1d';
    else if (isDrift) col = isPlayed ? '#f59e0b' : '#78350f';
    else col = isPlayed ? '#3b82f6' : '#1e3a5f';
    ctx.fillStyle = col;
    ctx.fillRect(x, H/2 - h, 1, h * 2);
  }

  // Playhead
  if (playhead > 0) {
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(playhead, 0); ctx.lineTo(playhead, H); ctx.stroke();
  }
}

let playhead = 0, playing = false;
const LINE_PER_PX = TOTAL / W;
let lastTime = 0;

function togglePlay() {
  playing = !playing;
  document.getElementById('playBtn').textContent = playing ? '⏸' : '▶';
}

function seekTo(line) { playhead = (line / TOTAL) * W; }

function seek(e) {
  const rect = document.getElementById('progress-bar').getBoundingClientRect();
  playhead = ((e.clientX - rect.left) / rect.width) * W;
}

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  playhead = (e.clientX - rect.left) / rect.width * W;
});

function updateChapters(line) {
  ['ch0','ch1','ch2'].forEach((id, i) => document.getElementById(id).classList.remove('active'));
  if (line >= SPIRAL) document.getElementById('ch2').classList.add('active');
  else if (line >= DRIFT) document.getElementById('ch1').classList.add('active');
  else document.getElementById('ch0').classList.add('active');
}

function loop(now) {
  const dt = Math.min(50, now - lastTime); lastTime = now;
  if (playing) {
    playhead += dt * 0.06;
    if (playhead >= W) { playhead = W; playing = false; document.getElementById('playBtn').textContent = '▶'; }
  }
  drawWave(playhead);
  const line = Math.round((playhead / W) * TOTAL);
  document.getElementById('time').textContent = line + ' / ' + TOTAL;
  document.getElementById('progress-fill').style.width = (playhead / W * 100).toFixed(1) + '%';
  updateChapters(line);
  requestAnimationFrame(loop);
}
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
