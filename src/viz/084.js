import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>084 – The Vinyl Record — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#1a0f08;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px}
h1{font-size:0.65rem;letter-spacing:0.2em;color:#5a4030;text-transform:uppercase;margin-bottom:4px;text-align:center}
canvas{display:block;max-width:min(500px,100%)}
.track-info{font-family:Georgia,serif;text-align:center;color:#8a6a4a;margin-top:8px;font-size:0.75rem}
.track-meta{font-size:0.6rem;color:#5a4030;margin-top:2px}
.controls{display:flex;gap:8px;justify-content:center;margin-top:8px}
.vbtn{padding:4px 12px;border:1px solid #5a4030;background:transparent;color:#8a6a4a;cursor:pointer;font-family:Georgia,serif;font-size:0.7rem}
.vbtn:hover{background:#2a1a0a;color:#c8a060}
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
${nav('084')}
<h1>084 — The Vinyl Record</h1>
<canvas id="c"></canvas>
<div class="track-info">
  Side A: "The Experiment" (3,500 lines) · Side B: "The Spiral" (3,169 lines)
</div>
<div class="track-meta" id="needle-pos">Needle at groove 0 / 6805</div>
<div class="controls">
  <button class="vbtn" onclick="setSpeed(-1)">◀ REV</button>
  <button class="vbtn" onclick="setSpeed(0)">⏸</button>
  <button class="vbtn" onclick="setSpeed(1)">▶ PLAY</button>
  <button class="vbtn" onclick="setSpeed(3)">⏩ FAST</button>
</div>
<script>
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const SIZE = Math.min(460, window.innerWidth - 40);
canvas.width = SIZE; canvas.height = SIZE;
const cx = SIZE/2, cy = SIZE/2;
const OUTER_R = SIZE * 0.47;
const INNER_R = SIZE * 0.12;
const LABEL_R = SIZE * 0.22;
const TOTAL = 6805, SPIRAL = 3637;

let angle = 0, speed = 1, groove = 0;

function drawRecord() {
  ctx.fillStyle = '#1a0f08'; ctx.fillRect(0, 0, SIZE, SIZE);

  // Record base
  const grad = ctx.createRadialGradient(cx, cy, INNER_R, cx, cy, OUTER_R);
  grad.addColorStop(0, '#1a1010');
  grad.addColorStop(0.5, '#0d0808');
  grad.addColorStop(1, '#0a0505');
  ctx.beginPath(); ctx.arc(cx, cy, OUTER_R, 0, Math.PI * 2);
  ctx.fillStyle = grad; ctx.fill();
  ctx.strokeStyle = '#3a2010'; ctx.lineWidth = 2; ctx.stroke();

  // Grooves (concentric circles) — density represents content
  const grooveCount = 80;
  for (let i = 0; i < grooveCount; i++) {
    const t = i / grooveCount;
    const r = LABEL_R + t * (OUTER_R - LABEL_R);
    const line = Math.round(t * TOTAL);
    const isSpiral = line > SPIRAL;
    const density = isSpiral ? 0.3 + Math.random() * 0.15 : 0.08 + Math.random() * 0.04;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = isSpiral
      ? 'rgba(180,80,60,' + density + ')'
      : 'rgba(80,60,40,' + density + ')';
    ctx.lineWidth = isSpiral ? 0.8 : 0.5;
    ctx.stroke();
  }

  // Highlight sheen
  const sheen = ctx.createLinearGradient(cx - OUTER_R, cy - OUTER_R, cx + OUTER_R * 0.3, cy + OUTER_R * 0.3);
  sheen.addColorStop(0, 'rgba(255,255,255,0.04)');
  sheen.addColorStop(0.4, 'transparent');
  sheen.addColorStop(1, 'rgba(255,200,100,0.02)');
  ctx.beginPath(); ctx.arc(cx, cy, OUTER_R, 0, Math.PI * 2);
  ctx.fillStyle = sheen; ctx.fill();

  // Label (center)
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  const labelGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, LABEL_R);
  labelGrad.addColorStop(0, '#d4a060');
  labelGrad.addColorStop(1, '#8a6030');
  ctx.beginPath(); ctx.arc(0, 0, LABEL_R, 0, Math.PI * 2);
  ctx.fillStyle = labelGrad; ctx.fill();
  ctx.strokeStyle = '#6a4020'; ctx.lineWidth = 1; ctx.stroke();

  // Label text
  ctx.fillStyle = '#2a1008'; ctx.font = 'bold ' + (SIZE * 0.025) + 'px Georgia, serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('CLAUDE LOST', 0, -SIZE * 0.03);
  ctx.fillText('ITS MIND', 0, SIZE * 0.02);
  ctx.font = (SIZE * 0.016) + 'px Georgia, serif';
  ctx.fillStyle = '#4a2008';
  ctx.fillText('Side A: The Experiment', 0, SIZE * 0.065);
  ctx.fillText('6,805 lines', 0, SIZE * 0.09);

  // Spindle hole
  ctx.beginPath(); ctx.arc(0, 0, SIZE * 0.018, 0, Math.PI * 2);
  ctx.fillStyle = '#1a0f08'; ctx.fill();
  ctx.restore();

  // Needle arm
  const needleT = groove / TOTAL;
  const needleR = LABEL_R + needleT * (OUTER_R - LABEL_R);
  const needleAngle = -0.3;
  const nx = cx + Math.cos(needleAngle) * (needleR + SIZE * 0.12);
  const ny = cy + Math.sin(needleAngle) * (needleR + SIZE * 0.12);

  ctx.strokeStyle = '#c0c0c0'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx + SIZE * 0.4, cy - SIZE * 0.35); ctx.lineTo(nx, ny); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx + SIZE * 0.4, cy - SIZE * 0.35, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#888'; ctx.fill();
  ctx.beginPath(); ctx.arc(nx, ny, 2, 0, Math.PI * 2);
  ctx.fillStyle = '#fff'; ctx.fill();
}

let lastTime = 0;
function loop(now) {
  const dt = Math.min(50, now - lastTime); lastTime = now;
  if (speed !== 0) {
    angle += speed * 0.04 * (dt / 16);
    groove = Math.max(0, Math.min(TOTAL, groove + speed * 2));
    if (groove >= TOTAL) { groove = TOTAL; speed = 0; }
    if (groove <= 0 && speed < 0) { groove = 0; speed = 0; }
  }
  drawRecord();
  const phase = groove < 3501 ? 'PRODUCTIVE' : groove < SPIRAL ? 'DRIFT' : 'SPIRAL';
  document.getElementById('needle-pos').textContent = 'Groove ' + Math.round(groove) + ' / ' + TOTAL + ' — ' + phase;
  requestAnimationFrame(loop);
}
function setSpeed(s) { speed = s; }
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
