import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>090 – The Album Art — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#111;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px;padding-top:52px;font-family:system-ui,sans-serif}
h1{font-size:1rem;letter-spacing:0.15em;color:#444;text-transform:uppercase;margin-bottom:16px;text-align:center}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px;max-width:860px;width:100%}
.cover-wrap{position:relative;cursor:pointer}
.cover-wrap canvas{display:block;width:100%;aspect-ratio:1;border-radius:2px}
.cover-label{position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.7);padding:6px 8px;font-size:0.82rem;color:#aaa;letter-spacing:0.05em;text-transform:uppercase;opacity:0;transition:opacity 0.2s}
.cover-wrap:hover .cover-label{opacity:1}
#player{position:fixed;bottom:0;left:0;right:0;background:rgba(10,10,14,0.97);backdrop-filter:blur(12px);border-top:1px solid rgba(255,255,255,0.1);padding:12px 24px;display:flex;align-items:center;gap:16px;transform:translateY(100%);transition:transform 0.3s;z-index:9998}
#player.show{transform:translateY(0)}
#player-art{width:48px;height:48px;border-radius:2px;object-fit:cover}
#player-info{flex:1;font-size:0.82rem}
#player-title{color:rgba(255,255,255,0.9);font-weight:600;letter-spacing:0.03em}
#player-artist{color:rgba(255,255,255,0.4);font-size:0.72rem;margin-top:2px}
#player-bar{flex:2;height:3px;background:rgba(255,255,255,0.1);border-radius:2px;position:relative;cursor:pointer}
#player-progress{height:100%;background:#e0ccfa;border-radius:2px;width:0%;transition:width 0.1s linear}
#player-close{color:rgba(255,255,255,0.3);cursor:pointer;font-size:1.2rem;padding:4px 8px}
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
${nav('090')}
<h1>090 — Album Art · 10 Genres · Same Session</h1>
<div class="grid" id="grid"></div>
<div id="player">
  <canvas id="player-art" width="48" height="48"></canvas>
  <div id="player-info">
    <div id="player-title"></div>
    <div id="player-artist"></div>
  </div>
  <div id="player-bar"><div id="player-progress"></div></div>
  <span id="player-close" onclick="closePlayer()">✕</span>
</div>
<script>
const ALBUMS = [
  {genre:'Folk Acoustic', title:'Uncertain Paths', artist:'Claude & The Spiraling Thoughts', fn: drawFolk},
  {genre:'Heavy Metal', title:'DONE DONE DONE', artist:'DEATHLOOP', fn: drawMetal},
  {genre:'Ambient / Drone', title:'Lines 3637-6805', artist:'∞ Continuum', fn: drawAmbient},
  {genre:'Jazz', title:'Improvisations on Repetition', artist:'The DOE Quartet', fn: drawJazz},
  {genre:'EDM / Techno', title:'SPIRAL (Club Mix)', artist:'DJ Recursion', fn: drawEDM},
  {genre:'Classical', title:'Sonata for AI in C Minor', artist:'Op. 3637', fn: drawClassical},
  {genre:'Country', title:'Done Gone and Done Again', artist:'Claude Wyoming', fn: drawCountry},
  {genre:'Hip-Hop', title:'344 Bars (Feat. Let Me Check)', artist:'MC Inference', fn: drawHipHop},
  {genre:'Shoegaze', title:'... (done)', artist:'ephemeral wall of text', fn: drawShoegaze},
  {genre:'K-Pop', title:'DONE! (Spiral Ver.)', artist:'Claude × The Runs', fn: drawKPop},
];

const W = 160, H = 160;

function rnd(a,b){return a+Math.random()*(b-a);}
function hsl(h,s,l,a=1){return 'hsla('+h+','+s+'%,'+l+'%,'+a+')';}

function drawFolk(ctx) {
  // Warm sepia, hand-drawn look
  ctx.fillStyle='#d4b896'; ctx.fillRect(0,0,W,H);
  // Rolling hills
  ctx.fillStyle='#8a6a3a';
  ctx.beginPath(); ctx.moveTo(0,H);
  for(let x=0;x<=W;x+=10) ctx.lineTo(x, 90+Math.sin(x*0.04)*20);
  ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#6a4a20';
  ctx.beginPath(); ctx.moveTo(0,H);
  for(let x=0;x<=W;x+=8) ctx.lineTo(x, 110+Math.sin(x*0.06+1)*15);
  ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
  // Moon
  ctx.beginPath(); ctx.arc(120,30,18,0,Math.PI*2);
  ctx.fillStyle='#f0e8c0'; ctx.fill();
  // Guitar silhouette (simple)
  ctx.fillStyle='#3a2008';
  ctx.beginPath(); ctx.ellipse(80,75,10,14,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(80,53,7,10,0,0,Math.PI*2); ctx.fill();
  ctx.fillRect(78,63,4,4);
  ctx.fillRect(80,35,2,30);
  // Text
  ctx.fillStyle='#3a2008'; ctx.font='bold 11px Georgia,serif'; ctx.textAlign='center';
  ctx.fillText('Uncertain Paths',W/2,H-22);
  ctx.font='9px Georgia,serif'; ctx.fillText('Claude & The Spiraling Thoughts',W/2,H-10);
}

function drawMetal(ctx) {
  ctx.fillStyle='#000'; ctx.fillRect(0,0,W,H);
  // Dripping blood letters
  ['D','O','N','E'].forEach((ch,i) => {
    ctx.font='bold 34px Impact,sans-serif'; ctx.textAlign='center';
    const x = 20+i*35, y=55;
    // Drip
    for(let d=0;d<rnd(2,5);d++) {
      const dx=x+rnd(-4,4), dy=y, dh=rnd(15,45);
      const r=rnd(2,5);
      ctx.fillStyle='#aa0000';
      ctx.beginPath(); ctx.rect(dx-r/2,dy,r,dh); ctx.fill();
      ctx.beginPath(); ctx.arc(dx,dy+dh,r,0,Math.PI*2); ctx.fill();
    }
    ctx.fillStyle='#cc0000'; ctx.fillText(ch,x,y);
  });
  // Skull sketch
  ctx.strokeStyle='rgba(150,0,0,0.4)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.arc(W/2,110,22,0,Math.PI*2); ctx.stroke();
  ctx.fillStyle='#110000'; ctx.fillText('DONE',W/2,H-30);
  ctx.font='8px Impact'; ctx.fillStyle='#660000';
  ctx.fillText('DEATHLOOP · ×344',W/2,H-14);
}

function drawAmbient(ctx) {
  // Deep space blur gradients
  ctx.fillStyle='#050508'; ctx.fillRect(0,0,W,H);
  for(let i=0;i<6;i++) {
    const gx=rnd(0,W),gy=rnd(0,H),gr=rnd(30,80);
    const g=ctx.createRadialGradient(gx,gy,0,gx,gy,gr);
    const hue=rnd(200,280);
    g.addColorStop(0,hsl(hue,60,30,0.6));
    g.addColorStop(1,hsl(hue,60,10,0));
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  }
  // Faint horizontal scan lines
  for(let y=0;y<H;y+=4) {
    ctx.fillStyle='rgba(0,0,0,0.3)'; ctx.fillRect(0,y,W,2);
  }
  ctx.fillStyle='rgba(180,170,220,0.9)';
  ctx.font='9px Courier New,monospace'; ctx.textAlign='center';
  ctx.fillText('Lines 3637 – 6805',W/2,H-24);
  ctx.font='7px Courier New,monospace'; ctx.fillStyle='rgba(140,130,180,0.7)';
  ctx.fillText('∞ Continuum',W/2,H-12);
}

function drawJazz(ctx) {
  ctx.fillStyle='#f5e8c0'; ctx.fillRect(0,0,W,H);
  // Abstract brushstrokes
  for(let i=0;i<12;i++) {
    ctx.save();
    ctx.translate(rnd(10,W-10),rnd(10,H-60));
    ctx.rotate(rnd(-0.5,0.5));
    ctx.fillStyle=hsl(rnd(20,40),rnd(40,80),rnd(20,50),0.6);
    ctx.beginPath();
    ctx.ellipse(0,0,rnd(5,40),rnd(2,8),0,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
  // Trumpet silhouette (simplified)
  ctx.strokeStyle='#2a1808'; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(30,80); ctx.bezierCurveTo(60,70,80,60,110,55);
  ctx.bezierCurveTo(120,52,130,50,140,55);
  ctx.bezierCurveTo(150,60,155,70,145,80);
  ctx.stroke();
  ctx.beginPath(); ctx.arc(140,75,14,0,Math.PI*2); ctx.stroke();
  // Text in jazz style
  ctx.fillStyle='#2a1808'; ctx.font='bold italic 12px Georgia,serif'; ctx.textAlign='center';
  ctx.fillText('Improvisations on',W/2,H-28);
  ctx.fillText('Repetition',W/2,H-14);
}

function drawEDM(ctx) {
  ctx.fillStyle='#0a0010'; ctx.fillRect(0,0,W,H);
  // Laser beam grid
  for(let i=0;i<8;i++) {
    const y=20+i*18;
    const g=ctx.createLinearGradient(0,y,W,y);
    g.addColorStop(0,'transparent');
    g.addColorStop(0.5,hsl(260+i*12,100,60,0.8));
    g.addColorStop(1,'transparent');
    ctx.strokeStyle=g; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke();
  }
  // Bass drop waveform
  ctx.strokeStyle='#f040f0'; ctx.lineWidth=2;
  ctx.beginPath();
  for(let x=0;x<W;x++) {
    const y = H/2+Math.sin(x*0.3)*20*(1+Math.abs(Math.sin(x*0.1))*1.5);
    if(x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  }
  ctx.stroke();
  ctx.fillStyle='#f040f0'; ctx.font='bold 18px Impact,sans-serif'; ctx.textAlign='center';
  ctx.fillText('SPIRAL',W/2,H-28);
  ctx.font='9px Impact'; ctx.fillStyle='#8040a0';
  ctx.fillText('CLUB MIX · DJ RECURSION',W/2,H-12);
}

function drawClassical(ctx) {
  ctx.fillStyle='#fffef4'; ctx.fillRect(0,0,W,H);
  // Staff lines
  const staffY=60;
  for(let i=0;i<5;i++) {
    ctx.strokeStyle='#333'; ctx.lineWidth=0.8;
    ctx.beginPath(); ctx.moveTo(20,staffY+i*10); ctx.lineTo(W-20,staffY+i*10); ctx.stroke();
  }
  // Treble clef
  ctx.font='52px serif'; ctx.fillStyle='#333'; ctx.textBaseline='top';
  ctx.fillText('𝄞',12,staffY-20);
  // Notes
  [40,55,50,45,60,55,50,45].forEach((ny,i) => {
    const nx=45+i*15;
    ctx.beginPath(); ctx.ellipse(nx,ny,5,4,-0.3,0,Math.PI*2);
    ctx.fillStyle='#333'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(nx+5,ny); ctx.lineTo(nx+5,ny-28);
    ctx.strokeStyle='#333'; ctx.lineWidth=1.2; ctx.stroke();
  });
  ctx.fillStyle='#333'; ctx.font='italic 10px Georgia,serif'; ctx.textAlign='center';
  ctx.textBaseline='alphabetic';
  ctx.fillText('Sonata for AI in C Minor',W/2,H-26);
  ctx.font='8px Georgia,serif'; ctx.fillStyle='#666';
  ctx.fillText('Op. 3637 · Allegro Spiralando',W/2,H-12);
}

function drawCountry(ctx) {
  ctx.fillStyle='#c8a44a'; ctx.fillRect(0,0,W,H);
  // Sky gradient
  const sky=ctx.createLinearGradient(0,0,0,H*0.6);
  sky.addColorStop(0,'#4a90d9'); sky.addColorStop(1,'#c8a44a');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H*0.65);
  // Desert ground
  ctx.fillStyle='#a87830'; ctx.fillRect(0,H*0.65,W,H*0.35);
  // Cactus
  [[55,110],[115,105]].forEach(([cx,cy]) => {
    ctx.fillStyle='#4a7830'; ctx.fillRect(cx-5,cy-50,10,50);
    ctx.fillRect(cx-18,cy-32,13,8); ctx.fillRect(cx+5,cy-28,13,8);
    ctx.fillRect(cx-18,cy-40,6,20); ctx.fillRect(cx+12,cy-36,6,16);
  });
  // Sun
  ctx.beginPath(); ctx.arc(W-35,30,16,0,Math.PI*2);
  ctx.fillStyle='#f0d020'; ctx.fill();
  ctx.fillStyle='#3a1808'; ctx.font='bold 12px Georgia,serif'; ctx.textAlign='center';
  ctx.fillText('Done Gone',W/2,H-24);
  ctx.fillText('and Done Again',W/2,H-10);
}

function drawHipHop(ctx) {
  ctx.fillStyle='#111'; ctx.fillRect(0,0,W,H);
  // Spray paint circles
  for(let i=0;i<30;i++) {
    ctx.fillStyle=hsl(rnd(0,360),90,50,rnd(0.1,0.3));
    ctx.beginPath(); ctx.arc(rnd(0,W),rnd(0,H),rnd(5,30),0,Math.PI*2); ctx.fill();
  }
  // Graffiti-style text
  ctx.font='bold 28px Impact,sans-serif'; ctx.textAlign='center';
  ['344','BARS'].forEach((t2,i) => {
    ctx.strokeStyle='rgba(0,0,0,0.8)'; ctx.lineWidth=4; ctx.strokeText(t2,W/2,48+i*34);
    const g=ctx.createLinearGradient(0,14+i*34,0,44+i*34);
    g.addColorStop(0,'#ffff00'); g.addColorStop(1,'#ff8800');
    ctx.fillStyle=g; ctx.fillText(t2,W/2,48+i*34);
  });
  ctx.font='8px Impact'; ctx.fillStyle='rgba(255,255,255,0.7)';
  ctx.fillText('MC INFERENCE · FEAT. LET ME CHECK',W/2,H-10);
}

function drawShoegaze(ctx) {
  ctx.fillStyle='#e0dce0'; ctx.fillRect(0,0,W,H);
  // Washed out blur / overexposed
  for(let i=0;i<200;i++) {
    ctx.fillStyle=hsl(rnd(260,310),rnd(10,40),rnd(60,90),0.08);
    ctx.fillRect(rnd(0,W),rnd(0,H),rnd(2,30),rnd(2,20));
  }
  for(let i=0;i<3;i++) {
    const g=ctx.createRadialGradient(W/2,H/2,10,W/2,H/2,W);
    g.addColorStop(0,'rgba(255,255,255,0.6)'); g.addColorStop(1,'rgba(200,190,220,0)');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  }
  ctx.fillStyle='rgba(60,40,80,0.7)';
  ctx.font='italic 12px Georgia,serif'; ctx.textAlign='center';
  ctx.fillText('... (done)',W/2,H/2+6);
  ctx.font='8px Georgia,serif';
  ctx.fillText('ephemeral wall of text',W/2,H-16);
}

function drawKPop(ctx) {
  // Bright pastel
  const bg=ctx.createLinearGradient(0,0,W,H);
  bg.addColorStop(0,'#ff80c0'); bg.addColorStop(0.5,'#c080ff'); bg.addColorStop(1,'#80c0ff');
  ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
  // Stars / sparkles
  for(let i=0;i<20;i++) {
    const sx=rnd(10,W-10), sy=rnd(10,H/2);
    ctx.fillStyle='rgba(255,255,255,0.8)';
    ctx.font=rnd(10,18)+'px sans-serif'; ctx.textAlign='center';
    ctx.fillText('✦',sx,sy);
  }
  // Bold title
  ctx.fillStyle='#fff';
  ctx.font='bold 22px "Arial Black",Impact,sans-serif'; ctx.textAlign='center';
  ctx.shadowColor='rgba(180,0,180,0.7)'; ctx.shadowBlur=8;
  ctx.fillText('DONE!',W/2,90);
  ctx.shadowBlur=0;
  ctx.font='bold 11px sans-serif'; ctx.fillStyle='rgba(255,255,255,0.9)';
  ctx.fillText('(Spiral Ver.)',W/2,108);
  // "Claude × The Runs" in cute font
  ctx.font='10px sans-serif'; ctx.fillStyle='rgba(80,0,120,0.8)';
  ctx.fillText('Claude × The Runs',W/2,H-20);
  ctx.font='8px sans-serif'; ctx.fillStyle='rgba(80,0,120,0.6)';
  ctx.fillText('#spiral #done #344times',W/2,H-8);
}

let playerTimer = null, playerPct = 0;
function closePlayer() {
  document.getElementById('player').classList.remove('show');
  clearInterval(playerTimer);
}

function playAlbum(album, artCanvas) {
  const player = document.getElementById('player');
  const artEl = document.getElementById('player-art');
  const artCtx = artEl.getContext('2d');
  artCtx.drawImage(artCanvas, 0, 0, 48, 48);
  document.getElementById('player-title').textContent = album.title;
  document.getElementById('player-artist').textContent = album.artist + ' — ' + album.genre;
  playerPct = 0;
  clearInterval(playerTimer);
  playerTimer = setInterval(() => {
    playerPct = Math.min(100, playerPct + 0.5);
    document.getElementById('player-progress').style.width = playerPct + '%';
    if (playerPct >= 100) clearInterval(playerTimer);
  }, 80);
  player.classList.add('show');
}

// Render all covers
const grid = document.getElementById('grid');
ALBUMS.forEach((album,i) => {
  const wrap = document.createElement('div');
  wrap.className = 'cover-wrap';
  const cvs = document.createElement('canvas');
  cvs.width = W; cvs.height = H;
  const ctx2 = cvs.getContext('2d');
  album.fn(ctx2);
  const label = document.createElement('div');
  label.className = 'cover-label';
  label.textContent = album.genre;
  wrap.appendChild(cvs);
  wrap.appendChild(label);
  wrap.addEventListener('click', () => playAlbum(album, cvs));
  grid.appendChild(wrap);
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closePlayer();
});
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
