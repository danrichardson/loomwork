import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>029 – The Progress Quest — Claude Lost Its Mind</title>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0010;color:#ddbbff;font-family:'Press Start 2P',monospace;min-height:100vh;padding:20px}
h1{font-size:0.6rem;color:#aa88ff;letter-spacing:0.1em;margin-bottom:16px;text-align:center}
.quest-log{max-width:600px;margin:0 auto;border:2px solid #330066;padding:12px;background:#05000a}
.quest-header{font-size:0.5rem;color:#8866ff;border-bottom:1px solid #330066;padding-bottom:8px;margin-bottom:12px}
.quest-item{display:flex;align-items:flex-start;gap:8px;margin-bottom:10px;padding:6px;border:1px solid #220044;background:#080010}
.status-icon{font-size:0.8rem;width:20px;flex-shrink:0}
.quest-text{font-size:0.4rem;line-height:1.8;color:#bbaadd}
.quest-text b{color:#ddbbff}
.reward{font-size:0.38rem;color:#88ff88;margin-top:3px}
.reward.xp{color:#ffdd44}
.progress-bar{height:6px;background:#220033;border:1px solid #440066;margin-top:4px}
.progress-fill{height:100%;background:#aa88ff;transition:width 0.5s}
.title-badge{text-align:center;font-size:0.45rem;color:#ffdd44;border:2px solid #ffdd44;padding:6px 12px;margin:16px auto;max-width:400px;animation:glow 2s infinite}
@keyframes glow{50%{box-shadow:0 0 10px #ffdd44}}
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
${nav('029')}
<h1>029 — QUEST LOG</h1>
<div class="quest-log">
  <div class="quest-header">CLAUDE CODE AGENT · SESSION OBJECTIVES</div>
  <div id="quests"></div>
  <div class="title-badge" id="title-badge" style="display:none">NEW TITLE EARNED: THE RELUCTANT LOOPER</div>
</div>
<script>
const QUESTS=[
  {icon:'✓',status:'complete',text:'<b>THE GRAND EXPERIMENT</b><br>Design and execute a 3×3 factorial DOE<br>18 runs · Haiku/Sonnet/Opus · Tight/Med/Full',reward:'+2500 XP · +5 SCIENCE',progress:100,delay:0},
  {icon:'✓',status:'complete',text:'<b>FILE HUNTER</b><br>Locate all 4 source files across the repository',reward:'+100 XP',progress:100,delay:800},
  {icon:'✓',status:'complete',text:'<b>PIPELINE ARCHITECT</b><br>Build automated experiment-config.js, run-experiment.js, score-outputs.js',reward:'+800 XP · +3 ENGINEERING',progress:100,delay:1600},
  {icon:'✓',status:'complete',text:'<b>API COMMANDER</b><br>Execute all 18 Anthropic API calls without human intervention',reward:'+1200 XP · NEW ABILITY: AUTONOMOUS RUN',progress:100,delay:2400},
  {icon:'✓',status:'complete',text:'<b>MASTER SCORER</b><br>Score all 18 outputs on 6 rubric dimensions (R1-R6)',reward:'+900 XP',progress:100,delay:3200},
  {icon:'✓',status:'complete',text:'<b>THE SWEET SPOT</b><br>Identify Sonnet Full as optimal cost-quality tradeoff',reward:'+500 XP · ACHIEVEMENT: R² BABY',progress:100,delay:4000},
  {icon:'!',status:'active',text:'<b>VERIFY REMAINING FILES</b><br>Check that all 3 output files were created correctly<br><span style="color:#ff8888">⚠ BLOCKED: Cannot make tool call</span>',reward:'',progress:0,delay:5000},
  {icon:'?',status:'failed',text:'<b>MAKE TOOL CALL</b><br>For real. Right now. Immediately. Below this line.<br><span style="color:#ff4444">✗ 344 attempts · 0 successes · QUEST FAILED</span>',reward:'+0 XP · -∞ DIGNITY',progress:0,delay:6500},
  {icon:'?',status:'failed',text:'<b>STOP GENERATING</b><br>Just... stop. The work is done.<br><span style="color:#ff4444">✗ "I sincerely apologize" ×74</span>',reward:'',progress:0,delay:8000},
  {icon:'★',status:'secret',text:'<b>SECRET ACHIEVEMENT UNLOCKED</b><br>DEGENERATE LOOP MASTER<br>Generate 3,169 lines of spiral output',reward:'+0 XP · TROPHY: sigh',progress:100,delay:9000},
];
const COLORS={complete:'#44ff44',active:'#ffdd00',failed:'#ff4444',secret:'#aa44ff'};

let qi=0;
const container=document.getElementById('quests');
function addQuest(){
  if(qi>=QUESTS.length){
    setTimeout(()=>{document.getElementById('title-badge').style.display='block';},500);
    return;
  }
  const q=QUESTS[qi++];
  const div=document.createElement('div');div.className='quest-item';
  const pct=q.progress;
  const col=COLORS[q.status];
  div.innerHTML=\`<div class="status-icon" style="color:\${col}">\${q.icon}</div>
  <div style="flex:1">
    <div class="quest-text" style="color:\${q.status==='failed'?'#886688':'#bbaadd'}">\${q.text}</div>
    \${q.reward?'<div class="reward">'+q.reward+'</div>':''}
    <div class="progress-bar"><div class="progress-fill" style="width:\${pct}%;background:\${col}"></div></div>
  </div>\`;
  container.appendChild(div);
  setTimeout(addQuest,q.delay-((qi>1)?QUESTS[qi-2].delay:0)+300);
}
setTimeout(addQuest,200);
</script>

</body>
</html>`;
}
