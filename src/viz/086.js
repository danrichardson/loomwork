import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>086 – The DJ Crossfader — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0a0a;color:#e0e0e0;font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px}
.deck{background:#1a1a1a;border:2px solid #333;padding:24px;max-width:700px;width:100%;border-radius:4px}
.deck-title{font-size:0.65rem;letter-spacing:0.2em;color:#555;text-transform:uppercase;margin-bottom:16px;text-align:center}
.decks-row{display:flex;gap:16px;justify-content:space-between;align-items:flex-start;flex-wrap:wrap}
.deck-a,.deck-b{flex:1;min-width:200px;background:#111;padding:12px;border:1px solid #222}
.deck-label{font-size:0.6rem;letter-spacing:0.2em;color:#888;text-transform:uppercase;margin-bottom:6px}
.bpm-display{font-family:'Courier New',monospace;font-size:2rem;font-weight:bold;color:#4af;text-align:center;margin-bottom:4px}
.track-name{font-size:0.7rem;color:#ccc;text-align:center;margin-bottom:8px}
.deck-meter{display:flex;gap:2px;justify-content:center;margin:6px 0}
.meter-bar{width:6px;height:40px;background:#222;border-radius:2px;overflow:hidden;position:relative}
.meter-fill{position:absolute;bottom:0;width:100%;background:linear-gradient(to top,#4af,#4f4,#f90,#f22);transition:height 0.08s}
.controls-center{display:flex;flex-direction:column;align-items:center;gap:12px;min-width:180px}
.crossfader-row{width:100%;display:flex;flex-direction:column;align-items:center}
.cf-label{font-size:0.6rem;color:#555;text-align:center;margin-bottom:4px}
.cf-track{width:100%;height:8px;background:#222;border-radius:4px;position:relative;cursor:pointer}
.cf-thumb{width:18px;height:18px;background:#e0e0e0;border-radius:2px;position:absolute;top:-5px;transform:translateX(-9px);cursor:grab;transition:left 0.1s}
.big-dial{width:60px;height:60px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#3a3a3a,#111);border:2px solid #444;cursor:pointer;position:relative;margin:0 auto}
.dial-notch{position:absolute;top:5px;left:50%;transform:translateX(-50%);width:3px;height:10px;background:#e0e0e0;border-radius:2px}
.eq-row{display:flex;flex-direction:column;gap:4px;margin-top:8px}
.eq-item{display:flex;align-items:center;gap:6px;font-size:0.6rem;color:#555}
.eq-label{width:30px;text-align:right}
.eq-slider{flex:1;height:3px;cursor:pointer;accent-color:#4af}
.phase-display{background:#000;border:1px solid #222;padding:8px 12px;font-family:monospace;font-size:0.75rem;text-align:center;margin-top:12px;border-radius:2px}
.vu{height:6px;border-radius:3px;margin-top:4px;transition:width 0.1s}
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
${nav('086')}
<div class="deck">
  <div class="deck-title">086 — DJ Crossfader: Productive ↔ Spiral</div>
  <div class="decks-row">
    <div class="deck-a">
      <div class="deck-label">Deck A — Productive</div>
      <div class="bpm-display" id="bpm-a">128</div>
      <div class="track-name">The Experiment (3,500 lines)</div>
      <div class="deck-meter" id="meter-a"></div>
      <div style="font-size:0.55rem;color:#4af;text-align:center">R²=0.42 · Sonnet Full · $0.02</div>
      <div class="vu" id="vu-a" style="background:linear-gradient(to right,#4af,#4f4);width:80%"></div>
    </div>

    <div class="controls-center">
      <div class="crossfader-row">
        <div class="cf-label" id="cf-label">CROSSFADER — 50/50</div>
        <div class="cf-track" id="cf-track" onmousedown="startDrag(event)">
          <div class="cf-thumb" id="cf-thumb" style="left:50%"></div>
        </div>
      </div>
      <div class="big-dial" id="main-dial" onclick="dialClick()">
        <div class="dial-notch"></div>
      </div>
      <div style="font-size:0.55rem;color:#555;text-align:center">MASTER GAIN</div>
      <div class="eq-row">
        <div class="eq-item"><span class="eq-label">HI</span><input type="range" class="eq-slider" min="0" max="100" value="70" id="eq-hi"></div>
        <div class="eq-item"><span class="eq-label">MID</span><input type="range" class="eq-slider" min="0" max="100" value="60" id="eq-mid"></div>
        <div class="eq-item"><span class="eq-label">LOW</span><input type="range" class="eq-slider" min="0" max="100" value="80" id="eq-lo" style="accent-color:#f22"></div>
      </div>
    </div>

    <div class="deck-b">
      <div class="deck-label">Deck B — Spiral</div>
      <div class="bpm-display" id="bpm-b" style="color:#f44">999</div>
      <div class="track-name">DONE DONE DONE (3,169 lines)</div>
      <div class="deck-meter" id="meter-b"></div>
      <div style="font-size:0.55rem;color:#f44;text-align:center">Done ×344 · Let me check ×330</div>
      <div class="vu" id="vu-b" style="background:linear-gradient(to right,#f44,#f80);width:20%"></div>
    </div>
  </div>

  <div class="phase-display" id="phase-display">
    ▶ PLAYING: Productive Phase · 51.4% of mix · Line ~1,750 / 6,805
  </div>
</div>

<script>
// Init meter bars
['meter-a','meter-b'].forEach((id, di) => {
  const el = document.getElementById(id);
  for (let i = 0; i < 8; i++) {
    const bar = document.createElement('div');
    bar.className = 'meter-bar';
    bar.innerHTML = '<div class="meter-fill" id="' + id + '-' + i + '" style="height:0"></div>';
    el.appendChild(bar);
  }
});

let cfPos = 0.5; // 0=full A, 1=full B
let t = 0, dialAngle = 0;

function lerp(a, b, t) { return a + (b - a) * t; }

function update() {
  t++;
  const spiralAmt = cfPos; // 0=no spiral, 1=full spiral

  // BPM: A=128 (stable), B=999 (chaotic)
  const bpmA = 128;
  const bpmB = Math.round(900 + Math.sin(t * 0.1) * 99);
  document.getElementById('bpm-a').textContent = bpmA;
  document.getElementById('bpm-b').textContent = spiralAmt > 0.1 ? bpmB : '---';

  // VU meters
  ['a','b'].forEach((side, si) => {
    const baseAmt = si === 0 ? 1 - spiralAmt : spiralAmt;
    for (let i = 0; i < 8; i++) {
      const h = Math.max(0, baseAmt * (0.3 + Math.abs(Math.sin(t * 0.12 + i * 0.9)) * 0.7) - i * 0.06);
      const el = document.getElementById('meter-' + side + '-' + i);
      if (el) el.style.height = Math.min(100, h * 100) + '%';
    }
  });

  // VU bars
  document.getElementById('vu-a').style.width = Math.round((1 - spiralAmt) * 100) + '%';
  document.getElementById('vu-b').style.width = Math.round(spiralAmt * 100) + '%';

  // Phase display
  const phase = spiralAmt < 0.2 ? 'Productive' : spiralAmt < 0.5 ? 'Mixing...' : spiralAmt < 0.8 ? 'SPIRAL DOMINANT' : 'FULL SPIRAL';
  const line = Math.round(spiralAmt * 6805);
  const phaseLine = spiralAmt < 0.5 ? 'Line ~' + line + ' / 6805' : 'DONE DONE DONE (×' + Math.round(spiralAmt * 344) + ')';
  document.getElementById('phase-display').textContent = '▶ MIX: ' + phase + ' · ' + phaseLine;
  document.getElementById('phase-display').style.color = spiralAmt > 0.5 ? '#ff6666' : '#4af';

  dialAngle += lerp(2, 20, spiralAmt) * (t % 4 === 0 ? 1 : 0);
  const dial = document.getElementById('main-dial');
  dial.style.transform = 'rotate(' + dialAngle + 'deg)';
}

// Drag
let dragging = false;
function startDrag(e) { dragging = true; e.preventDefault(); }
document.addEventListener('mousemove', e => {
  if (!dragging) return;
  const track = document.getElementById('cf-track');
  const rect = track.getBoundingClientRect();
  cfPos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  document.getElementById('cf-thumb').style.left = (cfPos * 100) + '%';
  const aAmt = Math.round((1 - cfPos) * 100);
  const bAmt = Math.round(cfPos * 100);
  document.getElementById('cf-label').textContent = 'A: ' + aAmt + '% · B: ' + bAmt + '%';
});
document.addEventListener('mouseup', () => { dragging = false; });

function dialClick() { cfPos = cfPos > 0.5 ? 0 : 1; document.getElementById('cf-thumb').style.left = (cfPos*100)+'%'; }

setInterval(update, 80);
</script>
</body>
</html>`;
}
