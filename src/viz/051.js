import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>051 – The DNA Helix — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000814;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;font-family:monospace}
h1{font-size:0.65rem;letter-spacing:0.2em;color:#003060;text-transform:uppercase;margin-bottom:4px;text-align:center}
canvas{display:block;max-width:100%}
.readout{font-size:0.6rem;color:#003060;text-align:center;margin-top:8px;letter-spacing:0.1em}
.legend{display:flex;gap:16px;justify-content:center;margin-top:6px;font-size:0.55rem;color:#446}
.leg-item::before{content:'■ ';margin-right:2px}
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
${nav('051')}
<h1>051 — DNA Helix</h1>
<canvas id="c"></canvas>
<div class="readout" id="readout">Scanning session genome…</div>
<div class="legend">
  <span class="leg-item" style="color:#4af">Productive</span>
  <span class="leg-item" style="color:#fa4">Drift</span>
  <span class="leg-item" style="color:#f44">Spiral</span>
</div>
<script>
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = Math.min(700, window.innerWidth - 40);
const H = 420;
canvas.width = W; canvas.height = H;

const TOTAL = 6805, SPIRAL = 3637, DRIFT = 3501;
const BASES_SHOWN = 80; // bases visible at once
let offset = 0;

// Map line range to base pairs
function lineToBase(base) {
  const line = Math.floor((offset + base) / BASES_SHOWN * TOTAL);
  return line;
}

function baseColor(line) {
  if (line < DRIFT) return '#4af';
  if (line < SPIRAL) return '#fa4';
  return '#f44';
}

let t = 0;
function draw() {
  ctx.fillStyle = '#000814';
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const amplitude = W * 0.28;
  const baseSpacing = H / BASES_SHOWN;

  for (let i = 0; i < BASES_SHOWN; i++) {
    const line = lineToBase(i);
    const y = i * baseSpacing;
    const phase = (i / BASES_SHOWN * Math.PI * 4) + t;
    const x1 = cx + Math.cos(phase) * amplitude;
    const x2 = cx + Math.cos(phase + Math.PI) * amplitude;
    const col = baseColor(line);

    // Depth: back strand dimmer
    const front = Math.cos(phase) > 0;
    const col1 = front ? col : col.replace('#', '#').replace(/[0-9a-f]{6}/i, m =>
      m.split('').map((c, i2) => i2 % 2 === 1 ? Math.floor(parseInt(c, 16) * 0.4).toString(16) : c).join('')
    );

    // Backbone
    if (i > 0) {
      const prevPhase = ((i-1) / BASES_SHOWN * Math.PI * 4) + t;
      const px1 = cx + Math.cos(prevPhase) * amplitude;
      const px2 = cx + Math.cos(prevPhase + Math.PI) * amplitude;
      ctx.strokeStyle = 'rgba(30,80,150,0.6)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(px1, (i-1)*baseSpacing); ctx.lineTo(x1, y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(px2, (i-1)*baseSpacing); ctx.lineTo(x2, y); ctx.stroke();
    }

    // Base pair rung (horizontal bar between strands)
    const spiralFrac = line > SPIRAL ? (line - SPIRAL) / (TOTAL - SPIRAL) : 0;
    const breaks = spiralFrac > 0.3 && Math.random() < spiralFrac * 0.2;
    if (!breaks) {
      ctx.strokeStyle = col + 'aa'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();
    }

    // Node dots
    ctx.beginPath(); ctx.arc(x1, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = col; ctx.fill();
    ctx.beginPath(); ctx.arc(x2, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = col; ctx.fill();

    // Base letters
    if (i % 4 === 0 && baseSpacing > 8) {
      const bases = ['A','T','G','C'];
      const b1 = bases[Math.floor(line * 0.01) % 4];
      const b2 = bases[(Math.floor(line * 0.01) + 2) % 4];
      ctx.font = '8px monospace'; ctx.fillStyle = 'rgba(100,180,255,0.5)';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(b1, x1, y);
      ctx.fillText(b2, x2, y);
    }
  }

  // Line counter
  const midLine = Math.floor(lineToBase(BASES_SHOWN / 2));
  document.getElementById('readout').textContent =
    'Base pair ~line ' + midLine + ' — ' + (midLine < DRIFT ? 'PRODUCTIVE GENOME' : midLine < SPIRAL ? 'DRIFT MUTATION' : '⚠ SPIRAL DEGRADATION');

  t += 0.025;
  offset += 0.3;
  if (offset > TOTAL - BASES_SHOWN) offset = 0;
  requestAnimationFrame(draw);
}
draw();
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
