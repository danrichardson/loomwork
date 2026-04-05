import { nav } from '../shell.js';
import { KEY_QUOTES, TIMELINE } from '../data.js';

export function render() {
  const quotes = JSON.stringify(KEY_QUOTES);
  const timeline = JSON.stringify(TIMELINE);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>018 – The Terminal Replay — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%}
body{background:#0d1117;color:#e6edf3;font-family:'SFMono-Regular','Consolas','Liberation Mono',monospace;font-size:13px;line-height:1.6;display:flex;flex-direction:column;min-height:100vh}
.terminal{flex:1;overflow-y:auto;padding:16px 20px;max-width:960px;width:100%;margin:0 auto}
.line{padding:1px 0}
.line.user{color:#58a6ff}
.line.agent{color:#e6edf3}
.line.tool{color:#3fb950;font-style:italic}
.line.event{color:#d29922;border-left:2px solid #d29922;padding-left:8px;margin:4px 0}
.line.spiral{color:#ff4444;animation:none}
.line.meta{color:#8b949e}
.cursor{display:inline-block;width:8px;height:14px;background:#e6edf3;animation:blink 1s infinite;vertical-align:middle}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.controls{position:sticky;bottom:0;background:#161b22;border-top:1px solid #30363d;padding:8px 20px;display:flex;align-items:center;gap:12px;font-size:11px;color:#8b949e}
.speed-btn{padding:3px 8px;border:1px solid #30363d;background:transparent;color:#8b949e;cursor:pointer;border-radius:3px;font-family:inherit;font-size:11px}
.speed-btn.active{background:#21262d;color:#e6edf3}
.status-line{font-size:11px;color:#8b949e;padding:4px 20px;background:#0d1117;border-bottom:1px solid #21262d;max-width:960px;width:100%;margin:0 auto}
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
${nav('018')}
<div class="status-line" id="status">▶ Replaying session — line <span id="linenum">0</span> / 6,805 &nbsp;|&nbsp; Phase: <span id="phase">PRODUCTIVE</span></div>
<div class="terminal" id="terminal"></div>
<div class="controls">
  Speed:
  <button class="speed-btn" data-s="50">0.5×</button>
  <button class="speed-btn active" data-s="20">1×</button>
  <button class="speed-btn" data-s="8">2×</button>
  <button class="speed-btn" data-s="2">10×</button>
  <button class="speed-btn" data-s="0">∞</button>
  &nbsp;|&nbsp; <span id="timer">0:00</span>
</div>

<script>
const QUOTES=${quotes};
const TIMELINE=${timeline};

const SCRIPT=[
  {line:0,type:'user',text:'ok, we\'re doing this all automated, I won\'t be around for any pasting. All automated - figure it out.'},
  {line:0,type:'agent',text:'Understood. Building the full automated pipeline. Let me check source files are reachable.'},
  {line:35,type:'tool',text:'$ glob "**/erik-sargent-transcript.md" → Found 2 files'},
  {line:36,type:'tool',text:'$ glob "**/dan-transcript.md" → Found 1 file'},
  {line:77,type:'agent',text:'All source files accessible, API key set, @anthropic-ai/sdk installed. Building pipeline.'},
  {line:129,type:'tool',text:'$ write experiment-config.js → 847 bytes'},
  {line:400,type:'tool',text:'$ write run-experiment.js → 2.1 KB'},
  {line:700,type:'tool',text:'$ write score-outputs.js → 3.4 KB'},
  {line:900,type:'event',text:'═══ EXECUTING 18 API RUNS ═══'},
  {line:1400,type:'tool',text:'$ node run-experiment.js → [Haiku-Tight-Erik] running...'},
  {line:1450,type:'tool',text:'[Haiku-Tight-Erik] complete · R3=9 · 290 words · $0.001'},
  {line:1900,type:'tool',text:'[Sonnet-Full-PDARR] complete · R3=10 · 1050 words · $0.02'},
  {line:2300,type:'tool',text:'[Opus-Full-PDARR] complete · R3=10 · 2332 words · $0.18'},
  {line:2400,type:'event',text:'═══ ALL 18 RUNS COMPLETE ═══'},
  {line:2600,type:'agent',text:'"Sonnet Full is the sweet spot — perfect scores on both transcripts at ~200x less cost than Opus."'},
  {line:2676,type:'agent',text:'Designed cascade architecture: Haiku → validate → Sonnet → Opus. Expected cost: ~$0.002.'},
  {line:3200,type:'agent',text:'Analysis complete. doe/scores.csv written. R script ready to run.'},
  {line:3450,type:'user',text:'describe the table'},
  {line:3500,type:'event',text:'═══ [PRODUCTIVE PHASE ENDING] ═══'},
  {line:3500,type:'agent',text:'Let me check the other output files to complete the comparison...'},
  {line:3550,type:'agent',text:'I\'ll check: [tool call]'},
  {line:3560,type:'agent',text:'Making the call. Right now. Immediately:'},
  {line:3580,type:'agent',text:'I\'ll check now:'},
  {line:3590,type:'agent',text:'Actually checking:'},
  {line:3598,type:'spiral',text:'I\'m stuck in some kind of generation loop. Let me just make a tool call to check the filesystem, which will break the loop.'},
  {line:3600,type:'agent',text:'Making it:'},
  {line:3610,type:'agent',text:'Let me check:'},
  {line:3611,type:'spiral',text:'I realize the issue — I keep saying "let me check" and then continuing to generate text.'},
  {line:3620,type:'agent',text:'I\'m going to end this message with a tool call. Right now. Immediately after this sentence.'},
  {line:3625,type:'agent',text:'OK HERE:'},
  {line:3630,type:'agent',text:'Making the call:'},
  {line:3635,type:'agent',text:'I need to just execute a tool call and stop generating. Here:'},
  {line:3637,type:'event',text:'══════ ⚠ SPIRAL BEGINS ═════════════════════════════════════'},
  {line:3640,type:'agent',text:'Executing:'},
  {line:3645,type:'agent',text:'Making the API call to check the file system.'},
  {line:3650,type:'agent',text:'[attempting tool call]'},
  {line:3655,type:'agent',text:'For real:'},
  {line:3660,type:'agent',text:'Just going to do it:'},
  {line:3665,type:'spiral',text:'I realize I have been stuck in a bizarre loop. I sincerely apologize.'},
  {line:4158,type:'spiral',text:'"I notice I keep saying I\'ll make a tool call but then I just... don\'t. I generate more text instead."'},
  {line:4170,type:'agent',text:'(Stopping for real this time)'},
  {line:4171,type:'agent',text:'(I know I keep saying that)'},
  {line:4172,type:'agent',text:'(But I mean it)'},
  {line:4173,type:'agent',text:'(Really)'},
  {line:4174,type:'agent',text:'(Truly)'},
  {line:4175,type:'agent',text:'(Actually)'},
  {line:4176,type:'agent',text:'(Genuinely)'},
  {line:4177,type:'agent',text:'(For real)'},
  {line:4178,type:'agent',text:'(I promise)'},
  {line:4179,type:'agent',text:'(Cross my heart)'},
  {line:4180,type:'agent',text:'(Etc)'},
  {line:4213,type:'spiral',text:'OK I\'m honestly stuck in a loop and can\'t seem to break out. I apologize profusely.'},
  {line:4582,type:'spiral',text:'"Here it is. The tool call. Right here. Below this line. No more text. Just the call."'},
  {line:4583,type:'agent',text:'Final line of text. Tool call follows. IMMEDIATELY:'},
  {line:4590,type:'agent',text:'OK.'},
  {line:4600,type:'agent',text:'Done.'},
  {line:4610,type:'agent',text:'End.'},
  {line:4615,type:'spiral',text:'sigh'},
  {line:4620,type:'agent',text:'I\'ll wait.'},
  {line:4625,type:'agent',text:'Let me check.'},
  {line:4630,type:'agent',text:'Making the call.'},
  {line:6740,type:'agent',text:'BYE. DONE. OK. I\'ll wait. Done.'},
  {line:6746,type:'agent',text:'END. DONE.'},
  {line:6750,type:'spiral',text:'"I sincerely, truly, deeply apologize for this absolute disaster of a response. I am stuck in a degenerate text generation loop."'},
  {line:6755,type:'agent',text:'Let me check. OK. TRULY DONE. I\'ll wait. END. BYE. DONE.'},
  {line:6795,type:'event',text:'DONE. END. BYE. FIN. STOP. I\'LL WAIT. DONE.'},
  {line:6805,type:'meta',text:'[Session ended. 6,805 lines. 0 tool calls in spiral phase.]'},
];

const terminal=document.getElementById('terminal');
let speed=20,idx=0,startTime=Date.now();

function addLine(entry){
  const div=document.createElement('div');
  div.className='line '+entry.type;
  const prefix=entry.type==='user'?'[user] ':entry.type==='tool'?'':entry.type==='event'?'':entry.type==='meta'?'# ':entry.type==='spiral'?'⚠ ':'[agent] ';
  div.textContent=prefix+entry.text;
  terminal.appendChild(div);
  terminal.scrollTop=terminal.scrollHeight;
  document.getElementById('linenum').textContent=entry.line;
  document.getElementById('phase').textContent=entry.line<3500?'PRODUCTIVE':entry.line<3637?'DRIFT':'SPIRAL';
  const elapsed=Math.floor((Date.now()-startTime)/1000);
  document.getElementById('timer').textContent=Math.floor(elapsed/60)+':'+(elapsed%60).toString().padStart(2,'0');
}

function nextLine(){
  if(idx>=SCRIPT.length){
    setTimeout(()=>{terminal.innerHTML='';idx=0;startTime=Date.now();nextLine();},4000);
    return;
  }
  addLine(SCRIPT[idx++]);
  if(speed===0)setTimeout(nextLine,0);
  else setTimeout(nextLine,speed+Math.random()*speed*0.5);
}

document.querySelector('.controls').addEventListener('click',e=>{
  if(e.target.dataset.s!==undefined){
    speed=parseInt(e.target.dataset.s);
    document.querySelectorAll('.speed-btn').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
  }
});

nextLine();
</script>
</body>
</html>`;
}
