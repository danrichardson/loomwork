import { nav } from '../shell.js';
import { PHRASE_COUNTS, TIMELINE } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>081 – The Piano Roll — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#1a1a2a;color:#ccc;font-family:monospace;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px}
h1{font-size:0.65rem;letter-spacing:0.2em;color:#555;text-transform:uppercase;margin-bottom:4px;text-align:center}
.daw{background:#111;border:1px solid #222;width:100%;max-width:700px;margin-top:8px;overflow:hidden}
.daw-header{background:#181828;padding:6px 10px;display:flex;gap:12px;align-items:center;border-bottom:1px solid #222}
.transport-btn{width:24px;height:24px;background:#2a2a3a;border:1px solid #333;color:#888;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.7rem}
.transport-btn:hover{background:#3a3a4a;color:#fff}
.tempo{font-size:0.65rem;color:#666;margin-left:auto}
.track-list{border-right:1px solid #222;width:80px;min-width:80px;background:#141424}
.track-name{font-size:7px;padding:3px 4px;height:24px;display:flex;align-items:center;border-bottom:1px solid #1a1a2a;color:#666;overflow:hidden}
canvas{display:block}
.daw-body{display:flex}
.info{font-size:0.55rem;color:#444;text-align:center;margin-top:4px;letter-spacing:0.1em}
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
${nav('081')}
<h1>081 — Piano Roll</h1>
<div class="daw">
  <div class="daw-header">
    <button class="transport-btn" id="playBtn" onclick="togglePlay()">▶</button>
    <button class="transport-btn" onclick="rewind()">⏮</button>
    <span id="pos" style="font-size:0.65rem;color:#4af;margin-left:8px">00:00:000</span>
    <span class="tempo">BPM: <span id="bpm">120</span> · Key: C minor · Length: 6,805 "notes"</span>
  </div>
  <div class="daw-body">
    <div class="track-list" id="tracks"></div>
    <canvas id="roll"></canvas>
  </div>
</div>
<div class="info" id="info">Phrase frequency → pitch · session position → time · spiral = red notes</div>
<script>
const PHRASE_COUNTS = ${JSON.stringify(PHRASE_COUNTS)};
const TIMELINE = ${JSON.stringify(TIMELINE)};
const TOTAL = 6805, SPIRAL = 3637;

const canvas = document.getElementById('roll');
const ctx = canvas.getContext('2d');
const W = Math.min(700, window.innerWidth - 40) - 80;
const TRACK_H = 24;
const phrases = Object.entries(PHRASE_COUNTS).sort((a,b)=>b[1]-a[1]);
const N_TRACKS = phrases.length;
const H = N_TRACKS * TRACK_H + 20;
canvas.width = W; canvas.height = H;

// Build track list
const trackListEl = document.getElementById('tracks');
phrases.forEach(([phrase]) => {
  const div = document.createElement('div');
  div.className = 'track-name';
  div.textContent = phrase;
  trackListEl.appendChild(div);
});

// Build notes: each phrase occurrence = a note
// Map phrase count to notes spread across timeline
function buildNotes() {
  const notes = [];
  phrases.forEach(([phrase, count], trackIdx) => {
    const isSpiral = count > 50;
    // Spread notes: most in spiral range, some in productive
    for (let i = 0; i < Math.min(count, 60); i++) {
      const t = isSpiral
        ? SPIRAL / TOTAL + (i / count) * (1 - SPIRAL / TOTAL) + (Math.random() - 0.5) * 0.05
        : (i / count) * (SPIRAL / TOTAL) * 0.8;
      const x = Math.max(0, Math.min(1, t));
      const noteW = Math.max(2, (1 / TOTAL) * W * 200);
      notes.push({
        x: x * W,
        y: trackIdx * TRACK_H + 4,
        w: noteW,
        h: TRACK_H - 8,
        spiral: t > SPIRAL / TOTAL,
        phrase
      });
    }
  });
  return notes;
}

const notes = buildNotes();
let playhead = 0, playing = false;

function drawRoll() {
  ctx.fillStyle = '#111'; ctx.fillRect(0, 0, W, H);

  // Grid: beat lines
  for (let x = 0; x < W; x += W / 32) {
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  // Track lanes
  for (let i = 0; i < N_TRACKS; i++) {
    const y = i * TRACK_H;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, y, W, TRACK_H);
  }

  // Spiral zone
  const spiralX = (SPIRAL / TOTAL) * W;
  ctx.fillStyle = 'rgba(200,50,50,0.04)';
  ctx.fillRect(spiralX, 0, W - spiralX, H);

  // Notes
  notes.forEach(n => {
    const atPlayhead = playhead >= n.x && playhead < n.x + n.w;
    const col = n.spiral ? (atPlayhead ? '#ff8888' : '#c03030') : (atPlayhead ? '#88ddff' : '#4080c0');
    ctx.fillStyle = col;
    ctx.fillRect(n.x, n.y, n.w, n.h);
    if (n.w > 16) {
      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '7px monospace';
      ctx.textBaseline = 'middle'; ctx.fillText(n.phrase.charAt(0), n.x + 2, n.y + n.h/2);
    }
  });

  // Playhead
  ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(playhead, 0); ctx.lineTo(playhead, H); ctx.stroke();

  // Phase labels
  ctx.fillStyle = 'rgba(80,200,80,0.5)'; ctx.font = '8px monospace'; ctx.textAlign = 'left';
  ctx.fillText('PRODUCTIVE', 4, H - 4);
  ctx.fillStyle = 'rgba(200,50,50,0.7)'; ctx.textAlign = 'right';
  ctx.fillText('SPIRAL', W - 4, H - 4);
}

let lastTime = 0;
function loop(now) {
  const dt = Math.min(50, now - lastTime); lastTime = now;
  if (playing) {
    playhead += dt * 0.08;
    if (playhead >= W) { playhead = 0; playing = false; document.getElementById('playBtn').textContent = '▶'; }
    const linePos = Math.round((playhead / W) * TOTAL);
    const mins = Math.floor(linePos / 1000);
    const secs = Math.floor((linePos % 1000) / 16.67);
    document.getElementById('pos').textContent = String(mins).padStart(2,'0') + ':' + String(secs).padStart(2,'0') + ':' + String(linePos % 1000).padStart(3,'0');
    const phase = linePos < 3501 ? 'PRODUCTIVE' : linePos < SPIRAL ? 'DRIFT' : 'SPIRAL';
    document.getElementById('info').textContent = 'Line ' + linePos + ' / ' + TOTAL + ' — ' + phase;
  }
  drawRoll();
  requestAnimationFrame(loop);
}

function togglePlay() {
  playing = !playing;
  document.getElementById('playBtn').textContent = playing ? '⏸' : '▶';
}
function rewind() { playhead = 0; }

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  playhead = (e.clientX - rect.left) / rect.width * W;
});

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
