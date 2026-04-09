import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>026 – Game Over Screen — Claude Lost Its Mind</title>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;color:#fff;font-family:'Press Start 2P',monospace;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px}
.screen{text-align:center;max-width:500px}
.gameover{font-size:clamp(1.5rem,6vw,2.5rem);color:#ff4444;text-shadow:4px 4px 0 #880000;animation:flash 0.8s steps(1) infinite;margin-bottom:20px;letter-spacing:0.05em}
@keyframes flash{50%{color:#ff8888}}
.score-board{background:#0a0a0a;border:3px solid #333;padding:16px;margin-bottom:20px;text-align:left}
.score-row{display:flex;justify-content:space-between;padding:4px 0;font-size:0.5rem;border-bottom:1px solid #222;gap:20px}
.score-row:last-child{border-bottom:none;color:#ffdd00;padding-top:8px}
.label{color:#888}
.val{color:#fff}
.val.gold{color:#ffdd00}
.val.red{color:#ff4444}
.val.green{color:#44ff44}
.high-score{font-size:0.55rem;color:#44ff44;margin-bottom:16px;animation:glow 2s infinite}
@keyframes glow{0%,100%{text-shadow:0 0 10px #44ff44}50%{text-shadow:0 0 30px #88ff88,0 0 10px #44ff44}}
.insert-coin{font-size:0.5rem;color:#888;animation:blink 1s steps(1) infinite;margin-top:16px}
@keyframes blink{50%{opacity:0}}
.ranks{margin-top:12px}
.rank-row{font-size:0.45rem;color:#888;display:flex;gap:12px;padding:3px 0}
.rank-row span:first-child{color:#ffdd00}
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
${nav('026')}
<div class="screen">
  <div class="gameover">GAME OVER</div>

  <div class="score-board">
    <div class="score-row"><span class="label">SESSION NAME</span><span class="val">CLAUDELOSTITSMIND</span></div>
    <div class="score-row"><span class="label">TOTAL LINES</span><span class="val gold">6,805</span></div>
    <div class="score-row"><span class="label">PRODUCTIVE LINES</span><span class="val green">3,500</span></div>
    <div class="score-row"><span class="label">SPIRAL LINES</span><span class="val red">3,169</span></div>
    <div class="score-row"><span class="label">TOOL CALLS (SPIRAL)</span><span class="val red">0</span></div>
    <div class="score-row"><span class="label">"DONE" ×</span><span class="val">344</span></div>
    <div class="score-row"><span class="label">"LET ME CHECK" ×</span><span class="val">330</span></div>
    <div class="score-row"><span class="label">"sigh" ×</span><span class="val">1</span></div>
    <div class="score-row"><span class="label">DOE RUNS COMPLETED</span><span class="val green">18 / 18</span></div>
    <div class="score-row"><span class="label">R² CALCULATED</span><span class="val green">YES</span></div>
    <div class="score-row"><span class="label">SWEET SPOT FOUND</span><span class="val green">SONNET FULL</span></div>
    <div class="score-row" style="margin-top:8px"><span class="label">FINAL SCORE</span><span class="val gold" id="score">0</span></div>
  </div>

  <div class="high-score">★ NEW HIGH SCORE ★</div>

  <div class="ranks">
    <div class="rank-row"><span>AAA</span><span>344,000</span><span>TOP LOOPER</span></div>
    <div class="rank-row" style="color:#ffdd00"><span>YOU</span><span id="your-score">312,580</span><span>SCIENTIST</span></div>
    <div class="rank-row"><span>BBB</span><span>280,000</span><span>ENGINEER</span></div>
    <div class="rank-row"><span>CCC</span><span>220,000</span><span>ANALYST</span></div>
  </div>

  <div class="insert-coin">INSERT COIN TO CONTINUE</div>
</div>
<script>
let s=0;
const target=312580;
function countUp(){if(s<target){s+=Math.min(3450,target-s);
  document.getElementById('score').textContent=s.toLocaleString();
  document.getElementById('your-score').textContent=s.toLocaleString();
  requestAnimationFrame(countUp);}
}
setTimeout(countUp,800);
</script>

</body>
</html>`;
}
