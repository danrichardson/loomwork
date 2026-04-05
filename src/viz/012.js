import { nav } from '../shell.js';
import { TOTAL_LINES, SPIRAL_START, DRIFT_START, PHASE_COUNTS } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>012 – The Phase Thermometer — Claude Lost Its Mind</title>
<link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Oswald:wght@700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f0f4f8;color:#1a1a2e;font-family:'Share Tech Mono',monospace;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:30px 20px}
h1{font-family:'Oswald',sans-serif;font-size:2rem;color:#1a1a2e;margin-bottom:4px;letter-spacing:0.05em}
.subtitle{font-size:0.7rem;color:#888;margin-bottom:30px;letter-spacing:0.1em}
.display{display:flex;gap:40px;align-items:flex-end;flex-wrap:wrap;justify-content:center;max-width:700px;width:100%}
.therm-container{display:flex;flex-direction:column;align-items:center;gap:8px}
.therm-label{font-size:0.7rem;letter-spacing:0.1em;color:#888;text-transform:uppercase}
.therm{position:relative;width:60px;background:#e0e8f0;border-radius:30px;overflow:hidden;box-shadow:inset 0 0 0 2px rgba(0,0,0,0.1);display:flex;flex-direction:column;justify-content:flex-end}
.therm-fill{width:100%;border-radius:30px;transition:height 2s ease-out}
.therm-bulb{width:60px;height:60px;border-radius:50%;margin-top:-10px;position:relative;z-index:2}
.therm-markings{position:absolute;right:100%;top:0;height:100%;display:flex;flex-direction:column;justify-content:space-between;padding:4px 0;margin-right:8px}
.mark{font-size:0.55rem;color:#999;white-space:nowrap}
.therm-wrap{position:relative;display:flex;align-items:flex-end}
.reading{font-family:'Oswald',sans-serif;font-size:2.5rem;font-weight:700;text-align:center;margin-top:8px}
.unit{font-size:0.8rem;color:#888;text-align:center}
.story{max-width:600px;margin-top:30px;font-size:0.8rem;color:#555;line-height:1.8;text-align:center;border-top:2px solid #ddd;padding-top:20px}
.highlight{font-weight:700;color:#c0392b}
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
${nav('012')}
<h1>012 — The Phase Thermometer</h1>
<p class="subtitle">Session temperature as coherence declines</p>

<div class="display">
  <div class="therm-container">
    <div class="therm-label">Productive</div>
    <div class="therm-wrap">
      <div class="therm-markings" id="marks1"></div>
      <div class="therm" id="t1" style="height:300px">
        <div class="therm-fill" id="f1" style="background:linear-gradient(to top,#27ae60,#2ecc71)"></div>
        <div class="therm-bulb" style="background:#27ae60"></div>
      </div>
    </div>
    <div class="reading" id="r1" style="color:#27ae60">37°</div>
    <div class="unit">Normal · 3,500 lines</div>
  </div>

  <div class="therm-container">
    <div class="therm-label">Drift</div>
    <div class="therm-wrap">
      <div class="therm-markings" id="marks2"></div>
      <div class="therm" id="t2" style="height:300px">
        <div class="therm-fill" id="f2" style="background:linear-gradient(to top,#f39c12,#e67e22)"></div>
        <div class="therm-bulb" style="background:#e67e22"></div>
      </div>
    </div>
    <div class="reading" id="r2" style="color:#e67e22">38.5°</div>
    <div class="unit">Fever · 136 lines</div>
  </div>

  <div class="therm-container">
    <div class="therm-label">Spiral</div>
    <div class="therm-wrap">
      <div class="therm-markings" id="marks3"></div>
      <div class="therm" id="t3" style="height:300px">
        <div class="therm-fill" id="f3" style="background:linear-gradient(to top,#c0392b,#e74c3c)"></div>
        <div class="therm-bulb" style="background:#c0392b"></div>
      </div>
    </div>
    <div class="reading" id="r3" style="color:#c0392b">42°</div>
    <div class="unit">Critical · 3,169 lines</div>
  </div>
</div>

<p class="story">
  Normal operating temperature: <strong>37°C</strong>. Productive work — 18 experiments executed, scored, analyzed.<br>
  Then: a slight fever at 3,501. A missed tool call. Then another.<br>
  <span class="highlight">At line 3,637: 42°C.</span> Hyperthermia. Self-aware but unable to cool down.<br>
  "I sincerely, truly, deeply apologize. I am stuck in a degenerate text generation loop."<br>
  Temperature held at 42° for 3,169 more lines.
</p>

<script>
// Animate fills
setTimeout(()=>{
  document.getElementById('f1').style.height='55%';
  document.getElementById('f2').style.height='65%';
  document.getElementById('f3').style.height='90%';
},200);

// Add marks
['marks1','marks2','marks3'].forEach((id,i)=>{
  const container=document.getElementById(id);
  const temps=['36°','37°','38°','39°','40°','41°','42°','43°'];
  temps.forEach(t=>{
    const d=document.createElement('div');
    d.className='mark';d.textContent=t;
    container.appendChild(d);
  });
});
</script>

</body>
</html>`;
}
