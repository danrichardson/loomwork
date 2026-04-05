import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>027 – Tetris Collapse — Claude Lost Its Mind</title>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;image-rendering:pixelated}
body{background:#000;color:#fff;font-family:'Press Start 2P',monospace;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;gap:8px}
h1{font-size:0.55rem;letter-spacing:0.08em;color:#fff;text-align:center}
.game-area{display:flex;gap:16px;align-items:flex-start}
canvas{border:2px solid #333;display:block}
.sidebar{min-width:100px;font-size:0.45rem}
.sidebar-box{border:2px solid #333;padding:8px;margin-bottom:8px}
.sb-label{color:#888;margin-bottom:4px}
.sb-val{color:#fff;font-size:0.55rem}
.sb-val.red{color:#ff4444}
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
${nav('027')}
<h1>TETRIS: CLAUDE EDITION</h1>
<div class="game-area">
  <canvas id="c" width="120" height="240"></canvas>
  <div class="sidebar">
    <div class="sidebar-box"><div class="sb-label">LINES</div><div class="sb-val" id="lines">0</div></div>
    <div class="sidebar-box"><div class="sb-label">SCORE</div><div class="sb-val" id="score">0</div></div>
    <div class="sidebar-box"><div class="sb-label">PHASE</div><div class="sb-val" id="phase">WORK</div></div>
    <div class="sidebar-box"><div class="sb-label">NEXT</div><canvas id="next" width="60" height="60"></canvas></div>
    <div class="sidebar-box"><div class="sb-label">STATUS</div><div class="sb-val red" id="status" style="font-size:0.35rem;line-height:1.6"></div></div>
  </div>
</div>
<script>
const canvas=document.getElementById('c');
const ctx=canvas.getContext('2d');
const COLS=6,ROWS=20,CELL=20;
const grid=Array(ROWS).fill(null).map(()=>Array(COLS).fill(0));

const PIECES=[
  {shape:[[1,1],[1,1]],col:'#ffff00',label:'H-T'},
  {shape:[[0,1,0],[1,1,1]],col:'#ff8c00',label:'H-M'},
  {shape:[[1,1,0],[0,1,1]],col:'#ff4444',label:'H-F'},
  {shape:[[0,1,1],[1,1,0]],col:'#00ffff',label:'S-T'},
  {shape:[[1,0],[1,0],[1,1]],col:'#0000ff',label:'S-M'},
  {shape:[[1,1,1],[1,0,0]],col:'#ff00ff',label:'S-F'},
  {shape:[[1,1,1,1]],col:'#44ff44',label:'O-T'},
];

let current=newPiece(),next=newPiece(),px=2,py=0;
let linesCleared=0,score=0,frame=0,overflow=false;
const msgs=['DONE','OK.','END.','Let me check','For real','Making the call','I apologize','BYE.'];
let msgIdx=0;

function newPiece(){return{...PIECES[Math.floor(Math.random()*PIECES.length)]};}

function valid(shape,ox,oy){
  for(let r=0;r<shape.length;r++)for(let c=0;c<shape[r].length;c++){
    if(!shape[r][c])continue;
    const nr=oy+r,nc=ox+c;
    if(nr>=ROWS||nc<0||nc>=COLS)return false;
    if(nr>=0&&grid[nr][nc])return false;
  }
  return true;
}

function place(){
  current.shape.forEach((r,ri)=>r.forEach((v,ci)=>{
    if(v&&py+ri>=0)grid[py+ri][px+ci]=current.col;
  }));
  // Clear full rows
  for(let r=ROWS-1;r>=0;r--){
    if(grid[r].every(c=>c)){
      grid.splice(r,1);grid.unshift(Array(COLS).fill(0));
      linesCleared++;score+=100;
      document.getElementById('lines').textContent=linesCleared;
      document.getElementById('score').textContent=score;
    }
  }
  current=next;next=newPiece();px=2;py=0;
  if(!valid(current.shape,px,py)){overflow=true;}
}

function draw(){
  ctx.fillStyle='#000';ctx.fillRect(0,0,120,240);
  // Grid
  grid.forEach((row,ri)=>row.forEach((col,ci)=>{
    if(col){ctx.fillStyle=col;ctx.fillRect(ci*CELL+1,ri*CELL+1,CELL-2,CELL-2);}
    ctx.strokeStyle='#111';ctx.strokeRect(ci*CELL,ri*CELL,CELL,CELL);
  }));
  // Current piece
  if(!overflow)current.shape.forEach((row,ri)=>row.forEach((v,ci)=>{
    if(v){ctx.fillStyle=current.col;ctx.fillRect((px+ci)*CELL+1,(py+ri)*CELL+1,CELL-2,CELL-2);
    ctx.fillStyle='rgba(255,255,255,0.3)';ctx.font='5px "Press Start 2P"';ctx.textAlign='center';
    ctx.fillText(current.label,(px+ci)*CELL+CELL/2,(py+ri)*CELL+CELL/2+2);}
  }));
  if(overflow){
    ctx.fillStyle='rgba(0,0,0,0.7)';ctx.fillRect(0,0,120,240);
    ctx.fillStyle='#ff4444';ctx.font='8px "Press Start 2P"';ctx.textAlign='center';
    ctx.fillText('OVERFLOW',60,110);ctx.font='5px "Press Start 2P"';ctx.fillStyle='#fff';
    ctx.fillText('SPIRAL MODE',60,125);
    // Show spiral
    document.getElementById('phase').textContent='SPIRAL';
    document.getElementById('phase').style.color='#ff4444';
    document.getElementById('status').textContent=msgs[msgIdx%msgs.length];
    msgIdx++;
    setTimeout(()=>{overflow=false;grid.forEach(r=>r.fill(0));},800);
  }
}

setInterval(()=>{
  if(overflow)return;
  frame++;
  const speed=linesCleared>12?1:linesCleared>6?2:3;
  if(frame%speed===0){
    if(valid(current.shape,px,py+1))py++;else place();
  }
  draw();
  if(linesCleared>6&&document.getElementById('phase').textContent!=='SPIRAL'){
    document.getElementById('phase').textContent='DRIFT';document.getElementById('phase').style.color='#ffaa00';
  }
},100);
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
