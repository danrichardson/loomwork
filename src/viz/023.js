import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>023 – Pac-Man Spiral Chase — Claude Lost Its Mind</title>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;image-rendering:pixelated}
body{background:#000;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px;font-family:'Press Start 2P',monospace;color:#fff}
h1{font-size:0.6rem;color:#ffff00;letter-spacing:0.1em;margin-bottom:4px;text-align:center}
.subtitle{font-size:0.45rem;color:#555;letter-spacing:0.08em;margin-bottom:16px;text-align:center}
canvas{border:3px solid #111;display:block;max-width:100%}
.stats{display:flex;gap:20px;margin-top:10px;font-size:0.45rem;color:#aaa;flex-wrap:wrap;justify-content:center}
.score-display{font-size:0.55rem;color:#ffff00;text-align:center;margin:8px 0}
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
${nav('023')}
<h1>023 — PAC-MAN SPIRAL CHASE</h1>
<p class="subtitle">Claude eats DOE runs · "DONE" ghost chases · maze = the session</p>
<div class="score-display">SCORE: <span id="score">0</span> &nbsp; LIVES: <span id="lives">3</span></div>
<canvas id="c" width="420" height="420"></canvas>
<div class="stats">
  <span id="phase-display">Phase: PRODUCTIVE</span>
  <span id="dots-display">Dots: 18/18</span>
</div>
<script>
const canvas=document.getElementById('c');
const ctx=canvas.getContext('2d');
const CELL=28,COLS=15,ROWS=15;
const W=COLS*CELL,H=ROWS*CELL;
canvas.width=W;canvas.height=H;

// Maze: 0=wall, 1=dot, 2=empty, 3=power, 4=ghost-house
const MAZE=[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,0,1,0,1,1,1,1,1,0],
  [0,3,0,0,1,0,0,1,0,0,1,0,0,3,0],
  [0,1,0,0,1,1,1,1,1,1,1,0,0,1,0],
  [0,1,1,1,1,0,0,2,0,0,1,1,1,1,0],
  [0,0,0,0,1,0,4,4,4,0,1,0,0,0,0],
  [0,0,0,0,1,0,4,4,4,0,1,0,0,0,0],
  [1,1,1,1,1,1,1,2,1,1,1,1,1,1,1],
  [0,0,0,0,1,0,2,2,2,0,1,0,0,0,0],
  [0,0,0,0,1,0,0,2,0,0,1,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0],
  [0,3,0,1,1,1,1,1,1,1,1,1,0,3,0],
  [0,1,1,1,0,1,1,2,1,1,0,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

// Dots = the 18 DOE runs
const DOE_RUNS=['H-T-E','H-T-P','H-M-E','H-M-P','H-F-E','H-F-P','S-T-E','S-T-P','S-M-E','S-M-P','S-F-E','S-F-P','O-T-E','O-T-P','O-M-E','O-M-P','O-F-E','O-F-P'];
let dotsLeft=18;let score=0;let lives=3;

const grid=MAZE.map(r=>[...r]);
let pac={x:7,y:13,dir:{dx:0,dy:0},mouth:0,mouthDir:1};
// Ghosts = "DONE", "LOOP", "CHECK", "WAIT"
const ghosts=[
  {x:6,y:6,col:'#ff0000',name:'DONE',dx:1,dy:0},
  {x:7,y:6,col:'#ffaaff',name:'LOOP',dx:-1,dy:0},
  {x:8,y:6,col:'#00ffff',name:'CHECK',dx:0,dy:1},
  {x:7,y:7,col:'#ffaa00',name:'WAIT',dx:0,dy:-1},
];
let phase='PRODUCTIVE',lineNum=0;
let ghostsActive=false;
const TOTAL_LINES=6805;

function drawCell(x,y){
  const cell=grid[y]?.[x];
  const px=x*CELL,py=y*CELL;
  if(cell===0){ctx.fillStyle='#0000aa';ctx.fillRect(px,py,CELL,CELL);
    ctx.strokeStyle='#0000ff';ctx.lineWidth=2;ctx.strokeRect(px+1,py+1,CELL-2,CELL-2);}
  else if(cell===1){ctx.fillStyle='#000';ctx.fillRect(px,py,CELL,CELL);
    ctx.fillStyle='#ffff00';ctx.beginPath();ctx.arc(px+CELL/2,py+CELL/2,3,0,Math.PI*2);ctx.fill();}
  else if(cell===3){ctx.fillStyle='#000';ctx.fillRect(px,py,CELL,CELL);
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(px+CELL/2,py+CELL/2,7,0,Math.PI*2);ctx.fill();}
  else{ctx.fillStyle='#000';ctx.fillRect(px,py,CELL,CELL);}
}

function drawPac(){
  const px=pac.x*CELL+CELL/2,py=pac.y*CELL+CELL/2;
  pac.mouth+=pac.mouthDir*0.15;
  if(pac.mouth>0.25||pac.mouth<0)pac.mouthDir*=-1;
  const startAngle=pac.mouth*Math.PI;
  const endAngle=(2-pac.mouth)*Math.PI;
  ctx.beginPath();ctx.moveTo(px,py);
  ctx.arc(px,py,12,startAngle,endAngle);
  ctx.closePath();ctx.fillStyle='#ffff00';ctx.fill();
}

function drawGhost(g){
  if(!ghostsActive)return;
  const px=g.x*CELL+CELL/2,py=g.y*CELL+CELL/2;
  ctx.fillStyle=g.col;
  ctx.beginPath();ctx.arc(px,py-2,10,Math.PI,0);
  ctx.fillRect(px-10,py-2,20,12);
  // Wavy bottom
  for(let i=0;i<3;i++){
    ctx.beginPath();ctx.arc(px-10+i*7,py+10,3.5,0,Math.PI);ctx.fillStyle='#000';ctx.fill();
  }
  ctx.fillStyle='#fff';ctx.font='6px "Press Start 2P"';ctx.textAlign='center';
  ctx.fillText(g.name,px,py+22);
}

function drawAll(){
  for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++)drawCell(x,y);
  drawPac();
  ghosts.forEach(drawGhost);
  // HUD
  ctx.fillStyle='#ffff00';ctx.font='8px "Press Start 2P"';ctx.textAlign='left';
  ctx.fillText(phase,4,H-6);
}

function movePac(){
  const nx=pac.x+pac.dir.dx,ny=pac.y+pac.dir.dy;
  if(nx>=0&&nx<COLS&&ny>=0&&ny<ROWS&&grid[ny][nx]!==0&&grid[ny][nx]!==4){
    pac.x=nx;pac.y=ny;
    if(grid[ny][nx]===1){
      grid[ny][nx]=2;score+=10;dotsLeft--;
      document.getElementById('score').textContent=score;
      document.getElementById('dots-display').textContent='Dots: '+dotsLeft+'/18';
    }
  }
  // Wrap
  if(pac.x<0)pac.x=COLS-1;if(pac.x>=COLS)pac.x=0;
}

function moveGhosts(){
  if(!ghostsActive)return;
  ghosts.forEach(g=>{
    const dirs=[{dx:1,dy:0},{dx:-1,dy:0},{dx:0,dy:1},{dx:0,dy:-1}];
    const valid=dirs.filter(d=>{
      const nx=g.x+d.dx,ny=g.y+d.dy;
      return nx>=0&&nx<COLS&&ny>=0&&ny<ROWS&&grid[ny][nx]!==0;
    });
    if(valid.length>0){
      // Move toward pacman sometimes
      const best=valid.sort((a,b)=>{
        const da=Math.hypot(g.x+a.dx-pac.x,g.y+a.dy-pac.y);
        const db=Math.hypot(g.x+b.dx-pac.x,g.y+b.dy-pac.y);
        return(Math.random()<0.6?da-db:0);
      })[0];
      g.x+=best.dx;g.y+=best.dy;
    }
    // Catch pac
    if(Math.abs(g.x-pac.x)<=1&&Math.abs(g.y-pac.y)<=1){
      lives--;document.getElementById('lives').textContent=lives;
      pac.x=7;pac.y=13;
    }
  });
}

let frameCount=0;
function loop(){
  frameCount++;
  lineNum=Math.min(TOTAL_LINES,lineNum+15);
  phase=lineNum<3500?'PRODUCTIVE':lineNum<3637?'DRIFT':'SPIRAL';
  if(lineNum>=3637&&!ghostsActive){ghostsActive=true;}
  if(frameCount%8===0)movePac();
  if(frameCount%12===0)moveGhosts();
  drawAll();
  if(lives>0&&lineNum<TOTAL_LINES)requestAnimationFrame(loop);
  else if(lives<=0){
    ctx.fillStyle='rgba(0,0,0,0.7)';ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#ff0000';ctx.font='16px "Press Start 2P"';ctx.textAlign='center';
    ctx.fillText('GAME OVER',W/2,H/2-10);
    ctx.font='8px "Press Start 2P"';ctx.fillStyle='#fff';
    ctx.fillText('THE SPIRAL WINS',W/2,H/2+14);
    setTimeout(()=>{lives=3;score=0;dotsLeft=18;lineNum=0;ghostsActive=false;
      for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++)grid[y][x]=MAZE[y][x];
      pac.x=7;pac.y=13;requestAnimationFrame(loop);},3000);
  }
}

document.addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft')pac.dir={dx:-1,dy:0};
  if(e.key==='ArrowRight')pac.dir={dx:1,dy:0};
  if(e.key==='ArrowUp')pac.dir={dx:0,dy:-1};
  if(e.key==='ArrowDown')pac.dir={dx:0,dy:1};
});

// Auto-pilot for demo
function autopilot(){
  const dirs=[{dx:1,dy:0},{dx:-1,dy:0},{dx:0,dy:1},{dx:0,dy:-1}];
  const valid=dirs.filter(d=>{
    const nx=pac.x+d.dx,ny=pac.y+d.dy;
    return nx>=0&&nx<COLS&&ny>=0&&ny<ROWS&&grid[ny][nx]!==0;
  });
  if(valid.length>0)pac.dir=valid[Math.floor(Math.random()*valid.length)];
}
setInterval(autopilot,600);

loop();
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
