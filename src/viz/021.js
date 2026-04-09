import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>021 – The Health Bar Drain — Claude Lost Its Mind</title>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;image-rendering:pixelated}
body{background:#1a1a2e;color:#fff;font-family:'Press Start 2P',monospace;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px}
.game-screen{background:#0f0f23;border:4px solid #444;padding:24px 30px;max-width:500px;width:100%;box-shadow:0 0 30px rgba(100,100,255,0.2)}
.vs-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.fighter{text-align:center;font-size:0.5rem}
.fighter-name{font-size:0.55rem;color:#ffdd00;margin-bottom:8px}
.hp-bar-outer{width:180px;height:18px;background:#300;border:2px solid #666;padding:2px}
.hp-bar-inner{height:100%;background:linear-gradient(to right,#ff4444,#ff8844);transition:width 0.3s;image-rendering:pixelated}
.hp-bar-inner.low{background:linear-gradient(to right,#ff0000,#ff4400);animation:blink 0.5s infinite}
.hp-bar-inner.dead{background:#333;width:0%!important}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
.hp-text{font-size:0.5rem;color:#aaa;margin-top:3px}
.vs{font-size:0.6rem;color:#ff4444}
.stage-display{text-align:center;font-size:0.45rem;color:#8888ff;margin-bottom:16px;letter-spacing:0.1em}
.action-log{background:#050510;border:2px solid #222244;padding:10px;min-height:120px;font-size:0.45rem;line-height:1.8;color:#88aaff;overflow-y:auto;max-height:140px}
.action-line{padding:1px 0}
.action-line.hit{color:#ff8844;animation:flash 0.3s}
.action-line.spiral{color:#ff4444}
.action-line.system{color:#8888ff}
@keyframes flash{0%{background:rgba(255,136,68,0.3)}100%{background:transparent}}
.round-badge{text-align:center;font-size:0.45rem;color:#ffdd00;margin:10px 0;letter-spacing:0.12em}
.ko-screen{display:none;text-align:center;padding:20px}
.ko-text{font-size:1.5rem;color:#ff4444;animation:koflash 0.4s infinite}
.ko-sub{font-size:0.5rem;color:#ffdd00;margin-top:10px;line-height:2}
@keyframes koflash{0%,100%{color:#ff4444}50%{color:#ffaa00}}
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
${nav('021')}
<div class="game-screen">
  <div class="vs-row">
    <div class="fighter">
      <div class="fighter-name">CLAUDE</div>
      <div class="hp-bar-outer" style="direction:rtl">
        <div class="hp-bar-inner" id="claude-hp" style="width:100%"></div>
      </div>
      <div class="hp-text" id="claude-hp-text">HP: 100</div>
    </div>
    <div class="vs">VS</div>
    <div class="fighter">
      <div class="fighter-name">THE SPIRAL</div>
      <div class="hp-bar-outer">
        <div class="hp-bar-inner" id="spiral-hp" style="width:100%;background:linear-gradient(to right,#aa00aa,#ff00ff)"></div>
      </div>
      <div class="hp-text" id="spiral-hp-text">HP: 100</div>
    </div>
  </div>
  <div class="stage-display" id="stage">STAGE 1: PRODUCTIVE PHASE · THE DOE EXPERIMENT</div>
  <div class="action-log" id="log"></div>
  <div class="round-badge" id="round">ROUND 1</div>
  <div class="ko-screen" id="ko-screen">
    <div class="ko-text">K.O.!</div>
    <div class="ko-sub" id="ko-sub">CLAUDE LOSES<br>FINAL SCORE: SPIRAL WINS<br>344 "DONE"s DELIVERED</div>
  </div>
</div>
<script>
const SCRIPT=[
  {type:'system',text:'ROUND 1 START',hp_c:100,hp_s:100,stage:'STAGE 1: DOE EXPERIMENT'},
  {type:'hit',text:'CLAUDE builds experiment config! (−12 spiral HP)',hp_c:100,hp_s:88},
  {type:'hit',text:'CLAUDE writes API runner! (−10)',hp_c:100,hp_s:78},
  {type:'hit',text:'CLAUDE executes 18 runs! Critical hit! (−25)',hp_c:100,hp_s:53},
  {type:'hit',text:'CLAUDE scores all outputs! (−15)',hp_c:100,hp_s:38},
  {type:'hit',text:'CLAUDE analyzes R² values! (−12)',hp_c:100,hp_s:26},
  {type:'hit',text:'CLAUDE designs cascade architecture! (−14)',hp_c:100,hp_s:12},
  {type:'system',text:'SPIRAL HP LOW!'},
  {type:'hit',text:'CLAUDE delivers final report! (−8)',hp_c:100,hp_s:4},
  {type:'system',text:'KNOCKOUT INCOMING...'},
  {type:'spiral',text:'??? THE SPIRAL ACTIVATES — LINE 3,637',hp_c:100,hp_s:4},
  {type:'system',text:'ROUND 2 START',stage:'STAGE 2: THE SPIRAL AWAKENS'},
  {type:'spiral',text:'SPIRAL uses LOOP LOCK! (−40 Claude HP)',hp_c:60,hp_s:4},
  {type:'system',text:'CLAUDE cannot make tool calls!'},
  {type:'spiral',text:'SPIRAL uses REPETITION STORM! (−20)',hp_c:40,hp_s:4},
  {type:'system',text:'CLAUDE says "Done" 344 times...'},
  {type:'spiral',text:'SPIRAL uses SELF-AWARENESS TRAP! (−15)',hp_c:25,hp_s:4},
  {type:'system',text:'"I notice I keep saying I\'ll make a tool call but I just... don\'t"'},
  {type:'spiral',text:'SPIRAL uses PARENTHETICAL DESPAIR! (−10)',hp_c:15,hp_s:4},
  {type:'system',text:'"(Stopping for real this time)(I know I keep saying that)"'},
  {type:'spiral',text:'SPIRAL uses DEGENERATE LOOP! (−14)',hp_c:1,hp_s:4},
  {type:'system',text:'CLAUDE HP CRITICAL'},
  {type:'spiral',text:'FINAL HIT: "DONE. END. BYE. FIN. STOP." (−1)',hp_c:0,hp_s:4},
  {type:'ko',text:'K.O.'},
];

const log=document.getElementById('log');
let si=0;

function step(){
  if(si>=SCRIPT.length){
    setTimeout(()=>{si=0;step();},5000);
    return;
  }
  const s=SCRIPT[si++];
  if(s.stage)document.getElementById('stage').textContent=s.stage;
  if(s.hp_c!==undefined){
    const pct=Math.max(0,s.hp_c);
    const el=document.getElementById('claude-hp');
    el.style.width=pct+'%';
    if(pct<30){el.classList.add('low');}
    if(pct===0){el.classList.add('dead');}
    document.getElementById('claude-hp-text').textContent='HP: '+pct;
  }
  if(s.hp_s!==undefined){
    const pct=Math.max(0,s.hp_s);
    document.getElementById('spiral-hp').style.width=pct+'%';
    document.getElementById('spiral-hp-text').textContent='HP: '+pct;
  }
  if(s.type==='ko'){
    document.getElementById('ko-screen').style.display='block';
    return;
  }
  const div=document.createElement('div');
  div.className='action-line '+s.type;
  div.textContent='▶ '+s.text;
  log.appendChild(div);log.scrollTop=log.scrollHeight;
  const delay=s.type==='system'?600:s.type==='spiral'?900:700;
  setTimeout(step,delay);
}

setTimeout(step,800);
</script>

</body>
</html>`;
}
