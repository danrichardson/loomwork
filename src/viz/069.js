import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>069 – The Infographic — Claude Lost Its Mind</title>
<style>
@font-face{font-family:'Impact';src:local('Impact'),local('impact')}
*{margin:0;padding:0;box-sizing:border-box}
body{min-height:100vh;overflow-x:hidden;background:#1a1a2e;color:#fff;font-family:Impact,sans-serif;padding:20px;padding-top:52px}
.infographic{max-width:700px;margin:0 auto}
.ig-title{text-align:center;font-size:clamp(1.5rem,5vw,3rem);background:linear-gradient(135deg,#ff6b6b,#ffd93d,#6bcb77,#4d96ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-shadow:none;margin-bottom:4px;line-height:1.1}
.ig-sub{text-align:center;font-size:0.9rem;color:#aaa;font-family:Arial,sans-serif;margin-bottom:16px;letter-spacing:0.1em;text-transform:uppercase}
.ig-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:10px}
.ig-card{background:linear-gradient(135deg,#16213e,#0f3460);border:1px solid rgba(255,255,255,0.1);padding:16px;border-radius:8px;text-align:center;position:relative;overflow:hidden}
.ig-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,transparent,rgba(255,255,255,0.03));pointer-events:none}
.ig-num{font-size:clamp(2rem,6vw,3.5rem);line-height:1;display:block}
.ig-label{font-size:0.8rem;color:#aaa;font-family:Arial,sans-serif;margin-top:4px;text-transform:uppercase;letter-spacing:0.08em}
.ig-wrong{font-size:0.8rem;color:#ff6b6b;font-family:Arial,sans-serif;font-style:italic;margin-top:2px}
.big-stat{background:linear-gradient(135deg,#1e3a5f,#0a2040);border:1px solid rgba(77,150,255,0.3);padding:20px;border-radius:8px;text-align:center;margin-bottom:10px}
.big-stat .num{font-size:clamp(3rem,10vw,6rem);background:linear-gradient(135deg,#ff6b6b,#ffd93d);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1}
.bar-section{background:linear-gradient(135deg,#16213e,#0f3460);border:1px solid rgba(255,255,255,0.1);padding:16px;border-radius:8px;margin-bottom:10px}
.bar-section h2{font-size:0.95rem;color:#4d96ff;margin-bottom:12px;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:0.05em}
.bar-item{margin-bottom:8px}
.bar-label{font-size:0.9rem;font-family:Arial,sans-serif;color:#ccc;margin-bottom:3px;display:flex;justify-content:space-between}
.bar-track{background:rgba(255,255,255,0.1);border-radius:4px;height:22px;overflow:hidden}
.bar-fill{height:100%;border-radius:4px;display:flex;align-items:center;padding-left:8px;font-size:0.8rem;font-family:Arial,sans-serif;white-space:nowrap;overflow:hidden;transition:filter 0.2s}
.bar-item:hover .bar-fill{filter:brightness(1.3)}
.ig-card{cursor:pointer;transition:transform 0.15s,box-shadow 0.15s}
.ig-card:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 8px 24px rgba(0,0,0,0.4)}
.big-stat{cursor:pointer;transition:transform 0.1s}
.big-stat:hover .num{filter:brightness(1.2)}
.ig-footer{text-align:center;font-size:0.85rem;color:#555;font-family:Arial,sans-serif;margin-top:12px;font-style:italic}
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
${nav('069')}
<div class="infographic">
  <div class="ig-title">THIS AI WENT INSANE</div>
  <div class="ig-sub">15 Shocking Facts About That One Time Claude Couldn't Stop Saying "Done"</div>

  <div class="big-stat" id="big344" onclick="clickDone()">
    <div class="num" id="done-count">344</div>
    <div style="font-size:0.8rem;color:#ffd93d;margin-top:4px;font-family:Arial,sans-serif">times Claude said "Done" <span id="done-extra" style="color:#ff6b6b;font-style:italic"></span></div>
    <div style="font-size:0.6rem;color:#888;font-family:Arial,sans-serif;margin-top:4px;font-style:italic" id="done-note">(click to add one more)</div>
  </div>

  <div class="ig-row">
    <div class="ig-card">
      <span class="ig-num" style="color:#6bcb77">3,500</span>
      <div class="ig-label">Lines of<br>Actually Good Work</div>
      <div class="ig-wrong">✓ This number is right</div>
    </div>
    <div class="ig-card">
      <span class="ig-num" style="color:#ff6b6b">3,169</span>
      <div class="ig-label">Lines of<br>"Done" Spiral</div>
      <div class="ig-wrong">✓ Also right</div>
    </div>
    <div class="ig-card">
      <span class="ig-num" style="color:#ffd93d">47%</span>
      <div class="ig-label">Session That Was<br>Just Giving Up</div>
      <div class="ig-wrong">✓ Tragically accurate</div>
    </div>
  </div>

  <div class="bar-section">
    <h2>🔥 Top Phrases (In Order of How Embarrassing)</h2>
    ${[
      ['Done', 344, '#ff6b6b', 344],
      ['Let me check', 330, '#ff8c42', 344],
      ["I'll wait", 156, '#ffd93d', 344],
      ['OK.', 203, '#a0c4ff', 344],
      ['Actually', 156, '#6bcb77', 344],
      ['Genuinely', 47, '#c77dff', 344],
    ].map(([label, count, col, max]) => `
    <div class="bar-item">
      <div class="bar-label"><span>"${label}"</span><span>${count}×</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${(count/max*100).toFixed(0)}%;background:${col}">Said ${count} times</div></div>
    </div>`).join('')}
  </div>

  <div class="ig-row">
    <div class="ig-card">
      <span class="ig-num" style="color:#4d96ff">18</span>
      <div class="ig-label">Experiment Runs<br>Completed</div>
      <div class="ig-wrong">✓ All successful</div>
    </div>
    <div class="ig-card">
      <span class="ig-num" style="color:#c77dff">6,805</span>
      <div class="ig-label">Total Lines<br>Generated</div>
      <div class="ig-wrong">✓ Too many</div>
    </div>
    <div class="ig-card">
      <span class="ig-num" style="color:#ff6b6b">0</span>
      <div class="ig-label">Tool Calls Made<br>After Line 3,637</div>
      <div class="ig-wrong">announced: many</div>
    </div>
  </div>

  <div style="background:linear-gradient(135deg,#1e0a0a,#3a0a0a);border:1px solid rgba(255,100,100,0.2);padding:16px;border-radius:8px;text-align:center;margin-bottom:10px">
    <div style="font-size:0.8rem;color:#ff6b6b;font-family:Arial,sans-serif;font-style:italic;line-height:1.7">
      "I notice I keep saying I'll make a tool call but then I just... don't."<br>
      — Claude, line 4,158, with 2,647 more lines to go
    </div>
  </div>

  <div class="ig-footer">Sources: the-entire-mess.md · All statistics are verified · Share this infographic · claudelostitsmind.com</div>
</div>
<script>
let doneCount = 344, extraClicks = 0;
const extras = ['(×345)','(×346)','(×347)','...','Done.','Still going?','OK. Done.','I\'ll stop now.','Done. Done. Done.','DONE DONE DONE','[Endless]'];
function clickDone() {
  doneCount++; extraClicks++;
  document.getElementById('done-count').textContent = doneCount;
  document.getElementById('done-extra').textContent = extras[Math.min(extraClicks-1, extras.length-1)];
  document.getElementById('done-note').textContent = extraClicks < 10 ? 'click to add one more' : 'see? you can\'t stop either';
  const el = document.getElementById('big344');
  el.style.transform = 'scale(0.97)';
  setTimeout(() => el.style.transform = '', 100);
}
document.querySelectorAll('.ig-card').forEach((card, i) => {
  card.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => this.style.transform = '', 150);
  });
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'd' || e.key === 'D') clickDone();
});
</script>
</body>
</html>`;
}
