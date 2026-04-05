import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>024 – Space Invaders DOE — Claude Lost Its Mind</title>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;color:#fff;font-family:'Press Start 2P',monospace;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:16px}
h1{font-size:0.6rem;letter-spacing:0.1em;color:#33ff33;margin-bottom:4px}
.subtitle{font-size:0.4rem;color:#444;letter-spacing:0.08em;margin-bottom:12px}
canvas{display:block;border:2px solid #111;max-width:100%}
.score-row{display:flex;gap:20px;font-size:0.5rem;margin-bottom:8px;color:#fff;flex-wrap:wrap;justify-content:center}
.label{font-size:0.4rem;color:#666}
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
${nav('024')}
<h1>SPACE INVADERS: DOE EDITION</h1>
<p class="subtitle">18 EXPERIMENTAL RUNS — DEFEAT THEM ALL — AVOID THE SPIRAL BOSS</p>
<div class="score-row">
  <span>SCORE: <span id="score">0</span></span>
  <span>RUNS LEFT: <span id="rleft">18</span></span>
  <span>PHASE: <span id="phase">PRODUCTIVE</span></span>
</div>
<canvas id="c" width="460" height="420"></canvas>
<script>
const canvas=document.getElementById('c');
const ctx=canvas.getContext('2d');
const W=460,H=420;

// 18 invaders in 3 rows of 6
const LABELS=[
  ['H-T-E','H-T-P','H-M-E','H-M-P','H-F-E','H-F-P'],
  ['S-T-E','S-T-P','S-M-E','S-M-P','S-F-E','S-F-P'],
  ['O-T-E','O-T-P','O-M-E','O-M-P','O-F-E','O-F-P'],
];
const COLORS=['#FF6B35','#4ECDC4','#d4a843'];
const SCORES=[73,67,75,72,84,80, 91,88,94,92,97,96, 87,85,93,91,97,95];

const invaders=[];
LABELS.forEach((row,ri)=>{
  row.forEach((lbl,ci)=>{
    invaders.push({
      x:50+ci*66,y:60+ri*56,
      w:56,h:28,alive:true,
      label:lbl,score:SCORES[ri*6+ci],
      col:COLORS[ri],
      anim:0,
    });
  });
});

let dirX=1,invX=0,dropY=0;
const cannon={x:W/2,y:H-30,w:30};
const bullets=[];
const spiralBullets=[];
let score=0,gamePhase='PRODUCTIVE',frame=0;
let spiralBoss=null,bossActive=false;
let shields=[{x:60,h:20},{x:180,h:20},{x:300,h:20},{x:380,h:20}];

function drawInvader(inv){
  if(!inv.alive)return;
  ctx.fillStyle=inv.col;
  const a=Math.sin(frame*0.1)*2;
  ctx.fillRect(inv.x+invX,inv.y+dropY+a,inv.w,inv.h);
  ctx.fillStyle='#000';
  ctx.font='5px "Press Start 2P"';ctx.textAlign='center';
  ctx.fillText(inv.label,inv.x+invX+inv.w/2,inv.y+dropY+a+10);
  ctx.font='4px "Press Start 2P"';ctx.fillStyle='rgba(255,255,255,0.6)';
  ctx.fillText(inv.score,inv.x+invX+inv.w/2,inv.y+dropY+a+20);
}

function drawCannon(){
  ctx.fillStyle='#33ff33';
  ctx.fillRect(cannon.x-cannon.w/2,cannon.y,cannon.w,8);
  ctx.fillRect(cannon.x-4,cannon.y-8,8,10);
}

function drawBullets(){
  ctx.fillStyle='#fff';
  bullets.forEach(b=>ctx.fillRect(b.x-1,b.y,2,8));
}

function drawSpiral(){
  if(!bossActive||!spiralBoss)return;
  const p=spiralBoss;
  ctx.fillStyle='#ff0000';ctx.fillRect(p.x,p.y,80,30);
  ctx.fillStyle='#ffaaaa';ctx.font='6px "Press Start 2P"';ctx.textAlign='center';
  ctx.fillText('SPIRAL BOSS',p.x+40,p.y+12);
  ctx.font='4px "Press Start 2P"';ctx.fillStyle='#fff';
  ctx.fillText('HP: '+p.hp,p.x+40,p.y+23);
  // Shoot
  if(frame%40===0){
    spiralBullets.push({x:p.x+Math.random()*80,y:p.y+30,dy:3});
  }
}

frame=0;
let autoDir=1;
setInterval(()=>{cannon.x+=autoDir*30;if(cannon.x>W-30||cannon.x<30)autoDir*=-1;},400);
setInterval(()=>{bullets.push({x:cannon.x,y:cannon.y,dy:-7});},1200);

function loop(){
  ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);

  // Move invaders
  frame++;
  const speed=0.3+frame*0.0005;
  invX+=dirX*speed;
  const aliveInvs=invaders.filter(i=>i.alive);
  if(aliveInvs.length===0&&!bossActive){
    bossActive=true;
    spiralBoss={x:W/2-40,y:50,hp:30,dx:2};
    gamePhase='SPIRAL';
    document.getElementById('phase').textContent='SPIRAL';
  }
  const edgeInv=aliveInvs.reduce((a,b)=>invX+(b.x>a.x?b:a).x>W-20||invX+Math.min(...aliveInvs.map(i=>i.x))<10?b:a,aliveInvs[0]);
  if(aliveInvs.some(i=>invX+i.x+i.w>W-5||invX+i.x<5)){
    dirX*=-1;dropY+=5;
  }

  // Boss movement
  if(spiralBoss){
    spiralBoss.x+=spiralBoss.dx;
    if(spiralBoss.x<0||spiralBoss.x>W-80)spiralBoss.dx*=-1;
  }

  // Bullets
  bullets.forEach(b=>b.y+=b.dy);
  spiralBullets.forEach(b=>b.y+=b.dy);

  // Hit detection
  bullets.forEach((b,bi)=>{
    invaders.forEach(inv=>{
      if(!inv.alive)return;
      if(b.x>inv.x+invX&&b.x<inv.x+invX+inv.w&&b.y>inv.y+dropY&&b.y<inv.y+dropY+inv.h){
        inv.alive=false;score+=inv.score;
        document.getElementById('score').textContent=score;
        document.getElementById('rleft').textContent=aliveInvs.length-1;
        bullets.splice(bi,1);
      }
    });
    if(spiralBoss&&b.x>spiralBoss.x&&b.x<spiralBoss.x+80&&b.y>spiralBoss.y&&b.y<spiralBoss.y+30){
      spiralBoss.hp--;bullets.splice(bi,1);
      if(spiralBoss.hp<=0){bossActive=false;spiralBoss=null;}
    }
  });

  // Draw
  invaders.forEach(drawInvader);
  drawCannon();drawBullets();drawSpiral();
  spiralBullets.forEach(b=>{ctx.fillStyle='#ff4444';ctx.fillRect(b.x-2,b.y,4,10);});

  // Ground
  ctx.fillStyle='#33ff33';ctx.fillRect(0,H-15,W,2);
  ctx.fillStyle='#004400';ctx.font='5px "Press Start 2P"';ctx.textAlign='left';
  ctx.fillText(gamePhase,4,H-4);

  requestAnimationFrame(loop);
}
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
