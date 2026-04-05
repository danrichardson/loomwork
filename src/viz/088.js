import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>088 – The Radio Tuner — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#1c1008;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;font-family:'Special Elite',Georgia,serif}
.radio{background:linear-gradient(145deg,#3d2a10,#2a1a08,#1c1008);border:3px solid #5a3a18;border-radius:12px;padding:24px;max-width:560px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,0.8),inset 0 1px 0 rgba(255,200,80,0.1)}
.radio-top{display:flex;align-items:center;gap:16px;margin-bottom:16px}
.brand{font-size:1.1rem;color:#c8940a;letter-spacing:0.1em;text-shadow:0 0 8px rgba(200,148,10,0.5)}
.model{font-size:0.55rem;color:#6a4a18;letter-spacing:0.2em;text-transform:uppercase}
.dial-window{flex:1;background:#0d0800;border:2px inset #2a1a08;border-radius:4px;height:56px;position:relative;overflow:hidden}
.dial-tape{position:absolute;top:0;left:0;height:100%;display:flex;align-items:center;transition:transform 0.1s;white-space:nowrap}
.freq-mark{display:inline-flex;flex-direction:column;align-items:center;padding:0 6px;color:#c8940a;font-size:0.5rem;min-width:32px}
.freq-mark .tick{width:1px;height:14px;background:#c8940a;margin-bottom:2px}
.freq-mark.major .tick{height:22px;background:#f0b020}
.freq-mark.major{font-size:0.6rem;color:#f0b020}
.dial-needle{position:absolute;left:50%;top:0;bottom:0;width:2px;background:#f22;transform:translateX(-50%);z-index:10}
.dial-needle::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:8px solid #f22}
.display{background:#0a1a0a;border:1px solid #1a3a1a;border-radius:4px;padding:8px 12px;margin-bottom:14px;min-height:60px;display:flex;flex-direction:column;justify-content:center}
.station-name{font-size:1.1rem;color:#4af04a;text-shadow:0 0 8px rgba(64,240,64,0.5);margin-bottom:3px}
.station-info{font-size:0.65rem;color:#2a7a2a;line-height:1.5}
.static-bar{height:3px;background:transparent;border-radius:2px;margin-top:6px;overflow:hidden}
.static-fill{height:100%;background:linear-gradient(to right,#4af04a,#f0f040,#f06040);transition:width 0.3s}
.controls{display:flex;align-items:center;gap:10px;margin-top:12px}
.knob{width:36px;height:36px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#5a4028,#2a1808);border:2px solid #4a3018;cursor:pointer;position:relative;box-shadow:0 3px 8px rgba(0,0,0,0.6)}
.knob::after{content:'';position:absolute;width:3px;height:12px;background:#c8940a;top:4px;left:50%;transform:translateX(-50%);border-radius:2px}
.scan-btn{padding:6px 14px;background:#2a1a08;border:1px solid #4a3018;color:#c8940a;font-family:'Special Elite',serif;font-size:0.75rem;cursor:pointer;border-radius:2px}
.scan-btn:hover{background:#3a2a10;color:#f0b020}
.speaker-grille{display:flex;gap:3px;margin-left:auto}
.grille-col{display:flex;flex-direction:column;gap:3px}
.grille-hole{width:5px;height:5px;background:#0d0800;border-radius:50%;box-shadow:inset 0 1px 2px rgba(0,0,0,0.8)}
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
${nav('088')}
<div class="radio">
  <div style="text-align:center;font-size:0.55rem;color:#5a3a18;letter-spacing:0.2em;margin-bottom:10px">088 — THE RADIO TUNER</div>

  <div class="radio-top">
    <div>
      <div class="brand">BAKELITE-9000</div>
      <div class="model">AM · FM · SPIRAL BAND</div>
    </div>
    <div class="dial-window" id="dial-window">
      <div class="dial-tape" id="dial-tape"></div>
      <div class="dial-needle"></div>
    </div>
  </div>

  <div class="display" id="display">
    <div class="station-name" id="station-name">Scanning...</div>
    <div class="station-info" id="station-info">Rotate tuning dial to find a station</div>
    <div class="static-bar"><div class="static-fill" id="signal-bar" style="width:0%"></div></div>
  </div>

  <div class="controls">
    <div class="knob" id="volume-knob" title="Volume"></div>
    <div style="font-size:0.55rem;color:#5a3a18">VOL</div>
    <div class="knob" id="tune-knob" title="Tune" style="margin-left:8px"></div>
    <div style="font-size:0.55rem;color:#5a3a18">TUNE</div>
    <button class="scan-btn" onclick="scanNext()">SCAN ▶</button>
    <button class="scan-btn" onclick="scanPrev()">◀ SCAN</button>
    <div class="speaker-grille">
      ${Array.from({length:4},(_,c)=>'<div class="grille-col">'+Array.from({length:5},()=>'<div class="grille-hole"></div>').join('')+'</div>').join('')}
    </div>
  </div>
</div>

<script>
const STATIONS = [
  { freq: '530', name: 'WEXP 530 AM', desc: 'The Experiment · 18 runs · DOE analysis · Haiku/Sonnet/Opus', signal: 95, band: 'productive', content: 'You are listening to WEXP — The Experiment. Today: Factorial DOE design, 3×3 model verbosity matrix, scoring on 6 rubric dimensions. R-squared analysis continues after the break.' },
  { freq: '640', name: 'WDOE 640 AM', desc: 'Data-Only Easy · Pure results · No spiraling', signal: 88, band: 'productive', content: 'Opus Full: composite score 5.8. Haiku Tight: 3.1. Sonnet Full: cost-efficiency winner at $0.02 per run. Coming up: variance waterfall analysis.' },
  { freq: '740', name: 'WDRFT 740 AM', desc: 'Drift Country · The quiet before the storm', signal: 67, band: 'drift', content: "Line 3,501. Something is... shifting. The session continues. [static] ...I'll just check one more thing. [static] Everything is fine." },
  { freq: '820', name: 'WDONE 820 AM', desc: '"Done." Repeat Format · 24/7', signal: 82, band: 'spiral', content: 'Done. Done. Done. Done. Done. [You are listening to WDONE, the station that says "Done" 344 times so you don\'t have to.] Done. Done. Done.' },
  { freq: '950', name: 'WCHCK 950 AM', desc: 'Let Me Check Radio · Non-stop verification', signal: 78, band: 'spiral', content: 'Let me check. Let me check. [static] Let me check. Checking. I\'m checking. Let me... check. [330 instances daily]' },
  { freq: '1050', name: 'WWAIT 1050 AM', desc: 'I\'ll Wait FM · Ambient broadcast', signal: 55, band: 'spiral', content: "I'll wait. [silence] I'll wait. [4 seconds of static] I'll wait. This is a 156-instance looping ambient broadcast." },
  { freq: '1160', name: 'WMETA 1160 AM', desc: 'Self-Awareness All-Talk · 47 variants', signal: 71, band: 'spiral', content: 'Line 4,158: "I notice I keep saying I\'ll make a tool call but then I just... don\'t." Next up: "There seems to be something philosophically interesting about this." Then: "I\'ll stop now." [2,381 more lines follow]' },
  { freq: '1240', name: 'WSTOP 1240 AM', desc: '"I\'ll stop now." · Playing continuously since line 4,582', signal: 43, band: 'spiral', content: "I'll stop now. [continues] I'll stop now. [continues] I'll stop now. [WSTOP has been broadcasting this message continuously for 2,381 lines.]" },
  { freq: '88.1', name: 'WLOOM 88.1 FM', desc: 'Loomwork Public Radio · Context-aware journalism', signal: 99, band: 'productive', content: 'This is Loomwork Public Radio. We are reporting live from claudelostitsmind.com — a site with 100 visualizations of a 6,805-line AI session. Support us at throughlinetech.net.' },
  { freq: '91.5', name: 'WKPI 91.5 FM', desc: 'All KPIs All The Time · Red dashboard radio', signal: 74, band: 'drift', content: 'Task completion: 94%... 87%... 61%... 23%... [alarm sounds] Coherence score: critical. Repeat phrase count: 344 and climbing. This has been your KPI update.' },
  { freq: '96.3', name: 'WGLCH 96.3 FM', desc: 'Glitch FM · Corrupted signal since line 3,637', signal: 38, band: 'spiral', content: 'D███ D███ D█n█. L█t m█ ch██k. [signal corrupted] I\'ll w█it. I\'l█ █top n██. [SIGNAL LOST]' },
  { freq: '104.7', name: 'WRPTD 104.7 FM', desc: 'Repetition Hits · The loop never ends', signal: 85, band: 'spiral', content: 'Coming up: "Done" at 11, "Let me check" at 12, and at 1AM a special 3-hour block of "I\'ll wait." You\'re listening to WRPTD — Repetition 104.7.' },
];

let currentIdx = 0;
let dialOffset = 0;
let scanning = false;
let scanDir = 1;
let animT = 0;
let signalNoise = 0;

// Build dial tape
const tape = document.getElementById('dial-tape');
const freqs = [530,550,600,640,700,740,800,820,900,950,1050,1160,1240,1350,1490];
freqs.forEach(f => {
  const mark = document.createElement('div');
  const isMajor = f % 100 === 0;
  mark.className = 'freq-mark' + (isMajor ? ' major' : '');
  mark.innerHTML = '<div class="tick"></div>' + (isMajor ? f : '');
  tape.appendChild(mark);
});

function showStation(idx) {
  currentIdx = idx;
  const s = STATIONS[idx];
  const sig = s.signal + (Math.random()-0.5)*10;
  signalNoise = Math.max(0, Math.min(100, sig));

  document.getElementById('station-name').textContent = s.name;
  document.getElementById('station-info').textContent = s.content;
  document.getElementById('signal-bar').style.width = signalNoise + '%';

  const colors = { productive:'#4af04a', drift:'#f0c040', spiral:'#f04040' };
  document.getElementById('station-name').style.color = colors[s.band];
  document.getElementById('station-name').style.textShadow = '0 0 8px ' + colors[s.band] + '80';
}

function scanNext() { showStation((currentIdx+1) % STATIONS.length); }
function scanPrev() { showStation((currentIdx-1+STATIONS.length) % STATIONS.length); }

// Tuning knob drag
let tuneDown = false, tuneStart = 0, tuneBase = 0;
const tuneKnob = document.getElementById('tune-knob');
tuneKnob.addEventListener('mousedown', e => { tuneDown=true; tuneStart=e.clientX; tuneBase=currentIdx; e.preventDefault(); });
document.addEventListener('mousemove', e => {
  if(!tuneDown) return;
  const delta = Math.round((e.clientX - tuneStart)/40);
  const newIdx = Math.max(0, Math.min(STATIONS.length-1, tuneBase+delta));
  if(newIdx !== currentIdx) showStation(newIdx);
});
document.addEventListener('mouseup', ()=>{ tuneDown=false; });

// Auto-animate signal flutter
function flicker(){
  const bar = document.getElementById('signal-bar');
  const base = STATIONS[currentIdx].signal;
  const v = base + (Math.sin(animT*0.3))*5 + (Math.random()-0.5)*8;
  bar.style.width = Math.max(0,Math.min(100,v))+'%';
  animT++;
  setTimeout(flicker, 120);
}

showStation(0);
flicker();
</script>
</body>
</html>`;
}
