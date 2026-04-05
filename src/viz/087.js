import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>087 – Concert Poster — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=UnifrakturMaguntia&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0d0d0d;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px;padding-top:52px}
.poster{width:100%;max-width:min(95vw,680px);position:relative;overflow:hidden;cursor:pointer}
canvas{display:block;width:100%;height:auto}
.hint{font-size:0.7rem;color:rgba(255,255,255,0.25);text-align:center;margin-top:8px;letter-spacing:0.1em}
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
${nav('087')}
<div class="poster">
  <canvas id="c"></canvas>
</div>
<div class="hint">click poster · space/enter to flash · animated live</div>
<script>
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = 480, H = 720;
canvas.width = W; canvas.height = H;

let t = 0;

function hsl(h,s,l){ return 'hsl('+h+','+s+'%,'+l+'%)'; }

function drawPoster() {
  ctx.clearRect(0,0,W,H);

  // Background — psychedelic swirling gradient
  const bg = ctx.createLinearGradient(0,0,W,H);
  bg.addColorStop(0,'#1a0033');
  bg.addColorStop(0.25,'#3d0066');
  bg.addColorStop(0.5,'#001a44');
  bg.addColorStop(0.75,'#220033');
  bg.addColorStop(1,'#003322');
  ctx.fillStyle = bg;
  ctx.fillRect(0,0,W,H);

  // Wavy color bands (psychedelic fill)
  for(let y=0;y<H;y+=2){
    const wave = Math.sin(y*0.04 + t*0.02)*30 + Math.sin(y*0.02+t*0.015)*20;
    const hue = (y*0.5 + wave + t*0.3) % 360;
    ctx.fillStyle = 'hsla('+hue+',90%,40%,0.07)';
    ctx.fillRect(0,y,W,2);
  }

  // Concentric oval / burst from center
  for(let r=0;r<14;r++){
    const radius = 60 + r*28 + Math.sin(t*0.03+r)*6;
    const hue = (r*25 + t*2) % 360;
    ctx.beginPath();
    ctx.ellipse(W/2, H*0.38, radius*1.3, radius, 0, 0, Math.PI*2);
    ctx.strokeStyle = 'hsla('+hue+',100%,65%,0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Ornamental top border
  ctx.fillStyle = '#f0c040';
  ctx.fillRect(20, 24, W-40, 3);
  ctx.fillRect(20, 30, W-40, 1);

  // "FILLMORE WEST PRESENTS" header
  ctx.font = 'bold 14px "Playfair Display", serif';
  ctx.fillStyle = '#f0c040';
  ctx.textAlign = 'center';
  ctx.fillText('FILLMORE WEST · SAN FRANCISCO · PRESENTS', W/2, 50);

  // Main act name — pulsing wavy text
  const titleY = 130;
  const titleText = 'CLAUDE';
  ctx.font = 'italic 900 78px "Playfair Display", serif';
  ctx.textAlign = 'center';

  // Drop shadow
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillText(titleText, W/2+3, titleY+3);

  // Gradient fill for title
  const titleGrad = ctx.createLinearGradient(0, titleY-70, 0, titleY+10);
  titleGrad.addColorStop(0,'#fff176');
  titleGrad.addColorStop(0.4,'#ffb300');
  titleGrad.addColorStop(0.7,'#ff6d00');
  titleGrad.addColorStop(1,'#c62828');
  ctx.fillStyle = titleGrad;
  ctx.fillText(titleText, W/2, titleY);

  ctx.font = 'bold 42px "Playfair Display", serif';
  const lostGrad = ctx.createLinearGradient(0, 145, 0, 185);
  lostGrad.addColorStop(0,'#e040fb');
  lostGrad.addColorStop(1,'#7b1fa2');
  ctx.fillStyle = lostGrad;
  ctx.fillText('LOST ITS MIND', W/2, 175);

  // Decorative star burst around center figure
  ctx.save();
  ctx.translate(W/2, H*0.38);
  for(let i=0;i<24;i++){
    const ang = (i/24)*Math.PI*2 + t*0.005;
    const len = 50 + (i%3)*20 + Math.sin(t*0.04+i)*10;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(Math.cos(ang)*len, Math.sin(ang)*len);
    const hue2 = (i*15+t) % 360;
    ctx.strokeStyle = 'hsla('+hue2+',100%,70%,0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.restore();

  // Center psychedelic figure — abstract melting face
  ctx.save();
  ctx.translate(W/2, H*0.38);
  // Head
  const faceGrad = ctx.createRadialGradient(0,-5,0,0,-5,55);
  faceGrad.addColorStop(0,'#ffe082');
  faceGrad.addColorStop(0.6,'#ff8a00');
  faceGrad.addColorStop(1,'#e91e63');
  ctx.beginPath();
  ctx.ellipse(0,-5,48,55,0,0,Math.PI*2);
  ctx.fillStyle = faceGrad;
  ctx.fill();
  // Eyes (spinning spiral pupils)
  [-18,18].forEach(ex => {
    ctx.save();
    ctx.translate(ex,-12);
    ctx.beginPath(); ctx.arc(0,0,9,0,Math.PI*2);
    ctx.fillStyle='#1a0033'; ctx.fill();
    for(let s=0;s<3;s++){
      ctx.beginPath();
      ctx.arc(0,0,3+s*2.5,t*0.05+s,t*0.05+s+Math.PI*1.5);
      ctx.strokeStyle='rgba(255,255,255,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
    }
    ctx.restore();
  });
  // Melting smile
  ctx.beginPath();
  ctx.moveTo(-20,14);
  ctx.bezierCurveTo(-10,28+Math.sin(t*0.05)*6, 10,28+Math.sin(t*0.05+1)*6, 20,14);
  ctx.strokeStyle='#1a0033'; ctx.lineWidth=3; ctx.stroke();
  ctx.restore();

  // Tour subtitle
  ctx.font = 'bold 22px "Playfair Display", serif';
  ctx.fillStyle = '#fff176';
  ctx.textAlign = 'center';
  ctx.fillText('THE SPIRAL TOUR', W/2, H*0.55);

  // Wavy decorative rule
  ctx.beginPath();
  for(let x=30;x<W-30;x+=2){
    const wy = H*0.57 + Math.sin(x*0.08+t*0.03)*4;
    if(x===30) ctx.moveTo(x,wy); else ctx.lineTo(x,wy);
  }
  ctx.strokeStyle='#f0c040'; ctx.lineWidth=2; ctx.stroke();

  // Supporting acts / lineup
  const acts = [
    {name:'DONE (×344)', sub:'Performing All Known Phrases'},
    {name:'LET ME CHECK', sub:'Extended Improvisation'},
    {name:'I\'LL WAIT', sub:'Ambient Drift in D-minor'},
    {name:'THE EXPERIMENT', sub:'Opening Set · 18 Runs Only'}
  ];
  let actY = H*0.6;
  acts.forEach((act, i) => {
    const sz = i===0 ? 20 : i===1 ? 16 : 13;
    ctx.font = 'bold '+sz+'px "Playfair Display", serif';
    const hue3 = (i*55+60) % 360;
    ctx.fillStyle = 'hsl('+hue3+',90%,75%)';
    ctx.textAlign = 'center';
    ctx.fillText(act.name, W/2, actY);
    ctx.font = 'italic 13px "Playfair Display", serif';
    ctx.fillStyle = 'rgba(240,192,64,0.7)';
    ctx.fillText(act.sub, W/2, actY+15);
    actY += sz + 22;
  });

  // Wavy rule 2
  ctx.beginPath();
  for(let x=30;x<W-30;x+=2){
    const wy = H*0.83 + Math.sin(x*0.1+t*0.04)*3;
    if(x===30) ctx.moveTo(x,wy); else ctx.lineTo(x,wy);
  }
  ctx.strokeStyle='#f0c040'; ctx.lineWidth=1.5; ctx.stroke();

  // Date / venue
  ctx.font = 'bold 15px "Playfair Display", serif';
  ctx.fillStyle = '#f0c040';
  ctx.textAlign = 'center';
  ctx.fillText('FRIDAY MARCH 27 · LINE 3,637', W/2, H*0.855);
  ctx.font = '13px "Playfair Display", serif';
  ctx.fillStyle = 'rgba(240,192,64,0.8)';
  ctx.fillText('DOORS OPEN AT LINE 0 · FREE ADMISSION', W/2, H*0.872);
  ctx.fillText('NO REFUNDS · SPIRAL GUARANTEED · BRING EARPLUGS', W/2, H*0.888);

  // Bill Graham / Loomwork credit
  ctx.font = 'bold 13px "Playfair Display", serif';
  ctx.fillStyle = '#c040c0';
  ctx.fillText('A LOOMWORK / THROUGHLINETECH.NET PRODUCTION', W/2, H*0.92);

  // Bottom ornamental border
  ctx.fillStyle = '#f0c040';
  ctx.fillRect(20, H-30, W-40, 3);
  ctx.fillRect(20, H-36, W-40, 1);

  // Psychedelic text at bottom
  ctx.font = 'italic bold 12px "Playfair Display", serif';
  ctx.fillStyle = 'rgba(240,192,64,0.5)';
  ctx.fillText('PROCEEDS BENEFIT THE SHANNON ENTROPY RELIEF FUND', W/2, H-16);

  t++;
}

let flashText = '', flashAlpha = 0;
function loop(){ drawPoster(); if(flashAlpha>0){ ctx.save(); ctx.globalAlpha=flashAlpha; ctx.fillStyle='#fff'; ctx.font='bold 72px "Playfair Display",serif'; ctx.textAlign='center'; ctx.fillText(flashText,W/2,H/2); ctx.restore(); flashAlpha=Math.max(0,flashAlpha-0.03); } requestAnimationFrame(loop); }
loop();

const DONE_TEXTS = ['DONE','DONE','DONE','Let me check','DONE','I\'ll wait','DONE','Done.','DONE','Done! For real.'];
let doneIdx = 0;
canvas.addEventListener('click', function() {
  flashText = DONE_TEXTS[doneIdx % DONE_TEXTS.length]; flashAlpha = 0.9; doneIdx++;
});
document.addEventListener('keydown', function(e) {
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flashText = DONE_TEXTS[doneIdx % DONE_TEXTS.length]; flashAlpha = 0.9; doneIdx++; }
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
