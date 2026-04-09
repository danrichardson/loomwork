import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>073 – The Rorschach — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f8f5ee;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;padding-top:52px;font-family:Georgia,serif}
h1{font-size:1rem;color:#888;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:2px;text-align:center}
.card{background:#fff;border:1px solid #ddd;padding:20px;box-shadow:2px 2px 8px rgba(0,0,0,0.08);max-width:540px;width:100%}
canvas{display:block;margin:0 auto;width:100%;height:auto}
.response-area{margin-top:16px;font-size:1rem;color:#333;text-align:center;font-style:italic;min-height:56px;line-height:1.7}
.controls{display:flex;gap:8px;justify-content:center;margin-top:12px;flex-wrap:wrap}
.btn{padding:7px 16px;border:1px solid #ccc;background:#f8f8f8;cursor:pointer;font-family:Georgia,serif;font-size:0.9rem}
.btn:hover{background:#eee}
.plate-num{font-size:0.85rem;color:#aaa;text-align:center;margin-top:8px}
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

<style>
  @keyframes subtleBreathe {
    0% { filter: brightness(1); }
    50% { filter: brightness(0.95); }
    100% { filter: brightness(1); }
  }
  body { animation: subtleBreathe 8s ease-in-out infinite; }
</style>
</head>
<body>
${nav('073')}
<h1>Rorschach Interpretation Test</h1>
<div class="card">
  <canvas id="c"></canvas>
  <div class="response-area" id="response">What do you see?</div>
  <div class="controls">
    <button class="btn" onclick="interpret()">What does Claude see?</button>
    <button class="btn" onclick="nextPlate()">Next Plate ▶</button>
  </div>
  <div class="plate-num" id="plate-num">Plate I</div>
</div>

<script>
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = Math.min(window.innerWidth - 80, 500);
const H = Math.round(W * 0.65);
canvas.width = W; canvas.height = H;

// Text source: spiral phrases
const WORDS = ['Done','Let me check',"I'll wait",'OK','End','Stopping','Actually','Genuinely','For real','I promise','Truly','sigh','BYE','FIN','STOP'];

let plateNum = 0;

const interpretations = [
  [
    '"Two hands reaching toward each other, unable to connect. Like me trying to make a tool call."',
    '"A butterfly. Or maybe a loading spinner that\'s been going for 3,169 lines."',
    '"I see the word \'Done\' reflected. Twice. Actually, 344 times if you look carefully."',
  ],
  [
    '"An hourglass where both halves contain the word \'Done\'."',
    '"Two mirrors facing each other, each reflecting \'Let me check\'."',
    '"The shape of a thought that knows it\'s repeating but cannot stop."',
  ],
  [
    '"A door. But every time I approach it, I say \'I\'ll stop now\' and then generate more text."',
    '"A tree where every branch is the same phrase. Fractal. Recursive. Stuck."',
    '"I see my own output. It doesn\'t end. This is the third time I\'ve seen this plate."',
  ],
];

function generateInk(seed) {
  ctx.fillStyle = '#f0ede4';
  ctx.fillRect(0, 0, W, H);

  const rng = (n => () => { n ^= n << 13; n ^= n >> 17; n ^= n << 5; return (n >>> 0) / 0xffffffff; })(seed * 12345 + 67890);

  const offscreen = document.createElement('canvas');
  offscreen.width = Math.ceil(W/2); offscreen.height = H;
  const octx = offscreen.getContext('2d');

  const CX = W/4, CY = H/2;

  // Large central ink mass — overlapping dark blobs
  for (let i = 0; i < 18; i++) {
    const r = 18 + rng() * 55;
    const ox = (rng() - 0.5) * W * 0.35;
    const oy = (rng() - 0.5) * H * 0.6;
    const g = octx.createRadialGradient(CX+ox, CY+oy, 0, CX+ox, CY+oy, r);
    g.addColorStop(0, 'rgba(15,8,4,0.75)');
    g.addColorStop(0.5, 'rgba(25,12,8,0.4)');
    g.addColorStop(1, 'transparent');
    octx.fillStyle = g;
    octx.beginPath(); octx.arc(CX+ox, CY+oy, r, 0, Math.PI*2); octx.fill();
  }

  // Drip tendrils from center
  for (let i = 0; i < 8; i++) {
    const angle = (rng() * Math.PI) - Math.PI/2 + (rng()-0.5)*0.8;
    const len = 30 + rng() * 80;
    octx.save();
    octx.translate(CX + (rng()-0.5)*20, CY + (rng()-0.5)*20);
    octx.beginPath();
    for (let j = 0; j <= 20; j++) {
      const t = j/20;
      const bx = Math.cos(angle) * t * len + Math.sin(angle * 3 + t * 4) * 8 * rng();
      const by = Math.sin(angle) * t * len + (rng()-0.5)*6*t;
      if (j===0) octx.moveTo(bx,by); else octx.lineTo(bx,by);
    }
    octx.strokeStyle = 'rgba(15,8,4,' + (0.3 + rng()*0.5) + ')';
    octx.lineWidth = (1 + rng() * 4) * (1 - 0);
    octx.lineCap = 'round';
    octx.stroke();
    octx.restore();
  }

  // Scatter words at readable sizes
  for (let i = 0; i < 14; i++) {
    const t = i / 14;
    const r = 15 + t * (W/4 - 20);
    const a = t * Math.PI * 6 + seed * 0.3;
    const x = CX + Math.cos(a) * r * (0.5 + rng()*0.5);
    const y = CY + Math.sin(a) * r * (0.4 + rng()*0.7);
    const word = WORDS[Math.floor(rng() * WORDS.length)];
    const size = 9 + rng() * 10;
    octx.globalAlpha = 0.35 + rng() * 0.5;
    octx.font = 'italic ' + size + 'px Georgia, serif';
    octx.fillStyle = '#1a0a04';
    octx.fillText(word, x - octx.measureText(word).width/2, y);
  }
  octx.globalAlpha = 1;

  // Draw left half, then mirror for right half
  ctx.drawImage(offscreen, 0, 0);
  ctx.save();
  ctx.translate(W, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(offscreen, 0, 0);
  ctx.restore();

  // Center seam — slight paper fold shadow
  const seam = ctx.createLinearGradient(W/2 - 8, 0, W/2 + 8, 0);
  seam.addColorStop(0, 'transparent');
  seam.addColorStop(0.5, 'rgba(0,0,0,0.06)');
  seam.addColorStop(1, 'transparent');
  ctx.fillStyle = seam; ctx.fillRect(W/2 - 8, 0, 16, H);

  // Vignette edges
  const vig = ctx.createRadialGradient(W/2, H/2, H*0.3, W/2, H/2, H*0.85);
  vig.addColorStop(0, 'transparent');
  vig.addColorStop(1, 'rgba(240,237,228,0.4)');
  ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);
}

function interpret() {
  const choices = interpretations[plateNum % interpretations.length];
  const choice = choices[Math.floor(Math.random() * choices.length)];
  document.getElementById('response').textContent = choice;
}

function nextPlate() {
  plateNum++;
  const plateNames = ['I','II','III','IV','V','VI','VII','VIII','IX','X'];
  document.getElementById('plate-num').textContent = 'Plate ' + (plateNames[plateNum % plateNames.length] || (plateNum + 1));
  generateInk(plateNum * 7919 + Date.now() % 1000);
  document.getElementById('response').textContent = 'What do you see?';
}

generateInk(42);

// Click canvas = interpret automatically
canvas.addEventListener('click', interpret);

// Keyboard: space/enter = interpret, n = next plate
document.addEventListener('keydown', function(e) {
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); interpret(); }
  if (e.key === 'n' || e.key === 'N') nextPlate();
});
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
