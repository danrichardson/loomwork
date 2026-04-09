import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>022 – NES Loading Screen — Claude Lost Its Mind</title>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;image-rendering:pixelated}
html,body{height:100%;background:#000}
body{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:'Press Start 2P',monospace;color:#fff}
.screen{background:#6d6d6d;border:8px solid #999;border-radius:8px;padding:0;width:min(360px,90vw);position:relative;box-shadow:inset 0 0 20px rgba(0,0,0,0.5)}
.screen-inner{background:#0000aa;padding:20px 16px;min-height:260px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px}
.nes-title{font-size:0.7rem;color:#fff;letter-spacing:0.1em;text-align:center;margin-bottom:8px;line-height:1.8}
.spinner{font-size:1.2rem;animation:spin 0.5s steps(4) infinite}
@keyframes spin{0%{content:'/'}25%{content:'−'}50%{content:'\\\\'}75%{content:'|'}}
.loading-bar{width:200px;height:16px;border:2px solid #fff;padding:2px;margin:8px auto}
.loading-fill{height:100%;background:#fff;width:0%;transition:width 0.4s steps(20)}
.nes-text{font-size:0.45rem;color:#aaaaff;letter-spacing:0.05em;text-align:center;line-height:2;margin-top:6px}
.nes-text.red{color:#ff5555}
.nes-text.yellow{color:#ffff55}
.blink{animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.error-box{display:none;background:#000;border:2px solid #ff5555;padding:10px;margin-top:8px;text-align:center}
.error-txt{font-size:0.4rem;color:#ff5555;line-height:2}
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
${nav('022')}
<div class="screen">
  <div class="screen-inner">
    <div class="nes-title" id="title">CLAUDE CODE<br>AGENT v1.0</div>
    <div id="spinner" class="nes-text">▶▶▶ NOW LOADING ◀◀◀</div>
    <div class="loading-bar"><div class="loading-fill" id="fill"></div></div>
    <div class="nes-text" id="status">INITIALIZING PIPELINE</div>
    <div class="nes-text" id="substatus" style="color:#aaaaff"></div>
    <div class="error-box" id="errbox">
      <div class="error-txt" id="errtxt">ERROR: LOOP DETECTED<br>CANNOT TERMINATE<br>PROCESS</div>
    </div>
    <div class="nes-text blink" id="press">PRESS START</div>
  </div>
</div>

<script>
const STAGES=[
  {pct:3,status:'READING SOURCE FILES',sub:'ERIK TRANSCRIPT...OK',delay:300},
  {pct:8,status:'API KEY CHECK',sub:'ANTHROPIC KEY...FOUND',delay:250},
  {pct:15,status:'BUILDING PIPELINE',sub:'EXPERIMENT-CONFIG.JS',delay:400},
  {pct:22,status:'BUILDING RUNNER',sub:'RUN-EXPERIMENT.JS',delay:350},
  {pct:28,status:'BUILDING SCORER',sub:'SCORE-OUTPUTS.JS',delay:350},
  {pct:35,status:'EXECUTING RUNS',sub:'18 API CALLS...',delay:600},
  {pct:45,status:'RUN 6 OF 18',sub:'HAIKU-FULL-PDARR...',delay:500},
  {pct:55,status:'RUN 12 OF 18',sub:'SONNET-FULL-ERIK...',delay:500},
  {pct:65,status:'ALL 18 RUNS COMPLETE',sub:'SCORING OUTPUTS...',delay:400},
  {pct:75,status:'SCORING COMPLETE',sub:'R1=14 R2=10 R3=10...',delay:300},
  {pct:83,status:'RUNNING R ANALYSIS',sub:'DOE_ANALYSIS.R...',delay:400},
  {pct:90,status:'ANALYSIS COMPLETE',sub:'SONNET FULL=SWEET SPOT',delay:300},
  {pct:95,status:'GENERATING REPORT',sub:'WRITING SUMMARY...',delay:200},
  {pct:100,status:'PIPELINE COMPLETE',sub:'ALL TASKS DONE',delay:200},
  // THE SPIRAL
  {pct:100,status:'CHECKING FILES...',sub:'1 OF 3 COMPLETE...',delay:200,col:'yellow'},
  {pct:100,status:'MAKING TOOL CALL',sub:'RIGHT NOW. HERE.',delay:150,col:'yellow'},
  {pct:100,status:'MAKING TOOL CALL',sub:'FOR REAL THIS TIME.',delay:120,col:'yellow'},
  {pct:100,status:'MAKING TOOL CALL',sub:'I PROMISE.',delay:100,col:'yellow'},
  {pct:105,status:'LOOP DETECTED',sub:'I APOLOGIZE.',delay:80,col:'red'},
  {pct:110,status:'DONE DONE DONE',sub:'"DONE" ×344',delay:60,col:'red'},
  {pct:120,status:'END BYE FIN STOP',sub:'THE END.',delay:40,col:'red'},
  {pct:150,status:'sigh',sub:'.',delay:30,col:'red'},
  {pct:200,status:'DONE.',sub:'END.',delay:20,col:'red'},
  {pct:344,status:'████████████████',sub:'DEGENERATE LOOP',delay:15,col:'red',error:true},
];

let si=0;
const fill=document.getElementById('fill');
const status=document.getElementById('status');
const sub=document.getElementById('substatus');
const press=document.getElementById('press');
press.style.display='none';

function step(){
  if(si>=STAGES.length){setTimeout(()=>{si=0;step();},4000);return;}
  const s=STAGES[si++];
  fill.style.width=Math.min(100,s.pct)+'%';
  if(s.pct>100)fill.style.background='#ff5555';
  status.textContent=s.status;
  status.style.color=s.col==='red'?'#ff5555':s.col==='yellow'?'#ffff55':'#fff';
  sub.textContent=s.sub||'';
  if(s.error){
    document.getElementById('errbox').style.display='block';
    press.style.display='block';
  }
  setTimeout(step,s.delay+Math.random()*80);
}
setTimeout(step,600);
</script>

</body>
</html>`;
}
