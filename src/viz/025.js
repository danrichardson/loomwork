import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>025 – The Dungeon Map — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;image-rendering:pixelated}
body{background:#1a0a00;color:#ffcc44;font-family:'Courier New',monospace;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:16px}
h1{font-size:0.7rem;letter-spacing:0.15em;color:#ff8c00;margin-bottom:4px;text-transform:uppercase}
canvas{border:3px solid #3a2000;display:block;max-width:100%;background:#000}
.legend{display:flex;gap:12px;margin-top:10px;font-size:0.5rem;color:#886600;flex-wrap:wrap;justify-content:center}
.room-info{font-size:0.55rem;color:#ffaa00;text-align:center;margin-top:8px;min-height:2em}
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
${nav('025')}
<h1>025 — THE DUNGEON MAP</h1>
<canvas id="c" width="480" height="360"></canvas>
<div class="legend">
  <span style="color:#44aa44">■ Productive rooms</span>
  <span style="color:#aaaa00">■ Drift corridor</span>
  <span style="color:#aa0000">■ Spiral dungeon</span>
  <span style="color:#ffff44">@ Claude</span>
</div>
<div class="room-info" id="room-info">Move with arrow keys or click rooms</div>
<script>
const canvas=document.getElementById('c');
const ctx=canvas.getContext('2d');
const W=480,H=360,CELL=24;

const ROOMS=[
  // Productive zone (green)
  {id:'start',x:1,y:1,w:3,h:2,col:'#0a2a0a',border:'#44cc44',label:'CAMP\nSTART',phase:'prod'},
  {id:'files',x:5,y:0,w:4,h:2,col:'#0a2a0a',border:'#44cc44',label:'FILE\nVAULT',phase:'prod'},
  {id:'config',x:10,y:0,w:4,h:2,col:'#0a2a0a',border:'#44cc44',label:'FORGE\n(CONFIG)',phase:'prod'},
  {id:'runner',x:5,y:3,w:4,h:2,col:'#0a3a0a',border:'#66dd66',label:'API\nRUNNER',phase:'prod'},
  {id:'scorer',x:10,y:3,w:4,h:2,col:'#0a3a0a',border:'#66dd66',label:'SCORER\nCHAMBER',phase:'prod'},
  {id:'runs',x:2,y:5,w:6,h:3,col:'#0a3a0a',border:'#88ff88',label:'THE 18 RUNS\n(GREAT HALL)',phase:'prod'},
  {id:'analysis',x:9,y:5,w:5,h:3,col:'#0a4a0a',border:'#aaffaa',label:'ANALYSIS\nTHRONE',phase:'prod'},
  // Drift corridor (yellow)
  {id:'drift',x:7,y:8,w:3,h:2,col:'#2a2000',border:'#dddd00',label:'DRIFT\nCORRIDOR',phase:'drift'},
  // Spiral dungeon (red)
  {id:'loop1',x:3,y:10,w:4,h:3,col:'#3a0000',border:'#cc2222',label:'LOOP\nCHAMBER I',phase:'spiral'},
  {id:'loop2',x:8,y:10,w:4,h:3,col:'#3a0000',border:'#ee2222',label:'LOOP\nCHAMBER II',phase:'spiral'},
  {id:'abyss',x:5,y:13,w:5,h:2,col:'#550000',border:'#ff4444',label:'THE ABYSS\n(3328 LINES)',phase:'spiral'},
];

const CORRIDORS=[
  ['start','files'],[' files','config'],['files','runner'],['config','scorer'],
  ['runner','scorer'],['runner','runs'],['scorer','analysis'],['runs','analysis'],
  ['runs','drift'],['drift','loop1'],['drift','loop2'],['loop1','loop2'],
  ['loop1','abyss'],['loop2','abyss'],
];

const SCALE=24;
let player={room:'start',x:2.5,y:2};
let currentRoom=ROOMS[0];

function roomRect(r){return{x:r.x*SCALE,y:r.y*SCALE,w:r.w*SCALE,h:r.h*SCALE};}

function draw(){
  ctx.fillStyle='#0a0500';ctx.fillRect(0,0,W,H);

  // Draw rooms
  ROOMS.forEach(r=>{
    const {x,y,w,h}=roomRect(r);
    ctx.fillStyle=r.id===currentRoom.id?r.col+'88':r.col;
    ctx.fillRect(x,y,w,h);
    ctx.strokeStyle=r.border;ctx.lineWidth=r.id===currentRoom.id?3:1;
    ctx.strokeRect(x,y,w,h);
    const lines=r.label.split('\n');
    ctx.fillStyle=r.border;ctx.font=\`\${SCALE*0.4}px 'Courier New'\`;ctx.textAlign='center';
    lines.forEach((l,i)=>ctx.fillText(l,x+w/2,y+h/2-((lines.length-1)/2-i)*SCALE*0.5+2));
  });

  // Player
  const pr=ROOMS.find(r=>r.id===player.room);
  if(pr){
    const {x,y,w,h}=roomRect(pr);
    ctx.fillStyle='#ffff44';
    ctx.font=SCALE*0.7+'px monospace';ctx.textAlign='center';
    ctx.fillText('@',x+w/2,y+h/2+SCALE*0.25);
  }

  // Dots on unexplored rooms
  ROOMS.filter(r=>r.id!==player.room).forEach(r=>{
    if(Math.random()<0.01){
      const {x,y,w,h}=roomRect(r);
      ctx.fillStyle=r.phase==='prod'?'#00ff00':r.phase==='drift'?'#ffff00':'#ff0000';
      ctx.fillRect(x+Math.random()*w,y+Math.random()*h,1,1);
    }
  });
}

function setRoom(roomId){
  currentRoom=ROOMS.find(r=>r.id===roomId)||ROOMS[0];
  player.room=roomId;
  const msgs={
    start:'You stand at CAMP START. The session begins. 18 runs await.',
    files:'FILE VAULT — transcripts loaded. Erik and PDARR are here.',
    config:'FORGE — experiment-config.js hammered out. 3×3×2 design inscribed.',
    runner:'API RUNNER — 18 calls will fly from here. The pipeline lives.',
    scorer:'SCORER CHAMBER — R1 through R6. Rubrics on the walls.',
    runs:'THE GREAT HALL — 18 runs executed. All complete. Brilliant work.',
    analysis:'ANALYSIS THRONE — R² calculated. Sonnet Full = sweet spot. Victory.',
    drift:'DRIFT CORRIDOR — Something is... off. "Let me check the other files..."',
    loop1:'LOOP CHAMBER I — "I\'ll check now. Making the call. Right now. Here."',
    loop2:'LOOP CHAMBER II — "For real. Actually. Genuinely. I promise."',
    abyss:'THE ABYSS — 3,328 lines. "DONE. END. BYE. FIN. STOP." Forever.',
  };
  document.getElementById('room-info').textContent=msgs[roomId]||'';
  draw();
}

canvas.addEventListener('click',e=>{
  const rect=canvas.getBoundingClientRect();
  const mx=(e.clientX-rect.left)*(W/rect.width)/SCALE;
  const my=(e.clientY-rect.top)*(H/rect.height)/SCALE;
  const hit=ROOMS.find(r=>mx>=r.x&&mx<r.x+r.w&&my>=r.y&&my<r.y+r.h);
  if(hit)setRoom(hit.id);
});

// Auto-walk through the dungeon
const WALKPATH=['start','files','config','runner','scorer','runs','analysis','drift','loop1','loop2','abyss'];
let wi=0;
function autoWalk(){
  setRoom(WALKPATH[wi%WALKPATH.length]);
  wi++;
  setTimeout(autoWalk,1500);
}
autoWalk();
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
