import { nav } from '../shell.js';
import { VIZ_META } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>091 – The Galaxy Map — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#02020a;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px;padding-top:52px;font-family:system-ui,sans-serif}
h1{font-size:0.6rem;letter-spacing:0.2em;color:#333;text-transform:uppercase;margin-bottom:8px;text-align:center}
canvas{display:block;cursor:grab;touch-action:none}
canvas:active{cursor:grabbing}
#tooltip{position:fixed;background:rgba(10,8,28,0.95);border:1px solid #2a2060;padding:6px 10px;font-size:0.65rem;color:#c0b0ff;pointer-events:none;display:none;border-radius:3px;z-index:100;max-width:200px;line-height:1.5}
.legend{display:flex;gap:16px;justify-content:center;margin-top:8px;flex-wrap:wrap}
.leg{display:flex;align-items:center;gap:5px;font-size:0.55rem;color:#555}
.leg-dot{width:8px;height:8px;border-radius:50%}
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
${nav('091')}
<h1>091 — Galaxy Map · All 99 Vizzes as a Star Cluster</h1>
<canvas id="c"></canvas>
<div id="tooltip"></div>
<div class="legend">
  <div class="leg"><div class="leg-dot" style="background:#4a9eff"></div>Data Science</div>
  <div class="leg"><div class="leg-dot" style="background:#ff6040"></div>The Breakdown</div>
  <div class="leg"><div class="leg-dot" style="background:#40ff80"></div>Retro Gaming</div>
  <div class="leg"><div class="leg-dot" style="background:#ff40ff"></div>Glitch Art</div>
  <div class="leg"><div class="leg-dot" style="background:#ffc040"></div>Physics</div>
  <div class="leg"><div class="leg-dot" style="background:#40ffff"></div>Biology</div>
  <div class="leg"><div class="leg-dot" style="background:#ff8040"></div>Corporate</div>
  <div class="leg"><div class="leg-dot" style="background:#c080ff"></div>Psychology</div>
  <div class="leg"><div class="leg-dot" style="background:#ff4080"></div>Music</div>
  <div class="leg"><div class="leg-dot" style="background:#fff"></div>Meta</div>
</div>
<script>
const VIZ_META = ${JSON.stringify(VIZ_META)};

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const W = Math.min(700, window.innerWidth - 40);
const H = Math.min(500, window.innerHeight - 180);
canvas.width = W; canvas.height = H;

const SECTION_COLORS = {
  'data':    '#4a9eff',
  'breakdown': '#ff6040',
  'retro':   '#40ff80',
  'glitch':  '#ff40ff',
  'physics': '#ffc040',
  'biology': '#40ffff',
  'corporate':'#ff8040',
  'psych':   '#c080ff',
  'music':   '#ff4080',
  'meta':    '#ffffff',
};

function getColor(id) {
  const n = parseInt(id);
  if(n<=10) return SECTION_COLORS.data;
  if(n<=20) return SECTION_COLORS.breakdown;
  if(n<=30) return SECTION_COLORS.retro;
  if(n<=40) return SECTION_COLORS.glitch;
  if(n<=50) return SECTION_COLORS.physics;
  if(n<=60) return SECTION_COLORS.biology;
  if(n<=70) return SECTION_COLORS.corporate;
  if(n<=80) return SECTION_COLORS.psych;
  if(n<=90) return SECTION_COLORS.music;
  return SECTION_COLORS.meta;
}

// Arrange stars in spiral galaxy shape
const stars = VIZ_META.filter(v=>v.id!=='091').map((v, i) => {
  const total = 99;
  const arm = i % 3; // 3 spiral arms
  const t = i / total;
  const armAngle = arm * (Math.PI * 2/3);
  const radius = 30 + t * (Math.min(W,H)*0.42);
  const angle = armAngle + t * Math.PI * 4 + (Math.random()-0.5)*0.3;
  return {
    v,
    x: W/2 + Math.cos(angle) * radius + (Math.random()-0.5)*15,
    y: H/2 + Math.sin(angle) * radius * 0.65 + (Math.random()-0.5)*12,
    r: 2.5 + Math.random()*2,
    twinkle: Math.random()*Math.PI*2,
    color: getColor(v.id),
  };
});

// Add center black hole / core
let offsetX = 0, offsetY = 0, scale = 1;
let dragging = false, lastMX = 0, lastMY = 0;
let hovered = null;
let t2 = 0;

canvas.addEventListener('mousedown', e => { dragging=true; lastMX=e.clientX; lastMY=e.clientY; });
canvas.addEventListener('mousemove', e => {
  if(dragging) {
    offsetX += e.clientX-lastMX; offsetY += e.clientY-lastMY;
    lastMX=e.clientX; lastMY=e.clientY;
  }
  const rect=canvas.getBoundingClientRect();
  const mx=(e.clientX-rect.left-offsetX)/scale, my=(e.clientY-rect.top-offsetY)/scale;
  hovered=null;
  for(const s of stars) {
    if(Math.hypot(s.x-mx,s.y-my)<s.r*2+4) { hovered=s; break; }
  }
  const tt=document.getElementById('tooltip');
  if(hovered) {
    tt.style.display='block';
    tt.style.left=(e.clientX+12)+'px'; tt.style.top=(e.clientY-10)+'px';
    tt.textContent=hovered.v.id+' — '+hovered.v.title;
  } else {
    tt.style.display='none';
  }
});
canvas.addEventListener('mouseup',()=>dragging=false);
canvas.addEventListener('wheel',e=>{
  e.preventDefault();
  scale = Math.max(0.5, Math.min(3, scale - e.deltaY*0.001));
},{passive:false});
canvas.addEventListener('click', e => {
  if(hovered) window.location.href='/viz/'+hovered.v.id;
});

function draw(){
  t2++;
  ctx.fillStyle='#02020a'; ctx.fillRect(0,0,W,H);

  ctx.save();
  ctx.translate(offsetX,offsetY);
  ctx.scale(scale,scale);

  // Background dust
  for(let i=0;i<200;i++){
    const bx=(i*137.5)%W, by=(i*97.3)%H;
    ctx.fillStyle='rgba(100,80,180,0.04)';
    ctx.fillRect(bx,by,1,1);
  }

  // Nebula core glow
  const coreGrad=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,60);
  coreGrad.addColorStop(0,'rgba(100,80,220,0.3)');
  coreGrad.addColorStop(0.5,'rgba(60,40,120,0.1)');
  coreGrad.addColorStop(1,'transparent');
  ctx.fillStyle=coreGrad; ctx.fillRect(0,0,W,H);

  // Draw stars
  stars.forEach(s => {
    const twinkle = 0.7+Math.sin(t2*0.03+s.twinkle)*0.3;
    const r = s.r * (s===hovered?1.8:1);
    const col = s.color;

    if(s===hovered) {
      ctx.beginPath(); ctx.arc(s.x,s.y,r+6,0,Math.PI*2);
      ctx.fillStyle=col.replace(')',',0.2)').replace('rgb(','rgba(').replace('#','rgba(0,0,0,');
      // Just use a semi-transparent version
      ctx.shadowColor=col; ctx.shadowBlur=12;
      ctx.fillStyle='transparent'; ctx.fill();
      ctx.shadowBlur=0;
    }

    // Glow
    ctx.shadowColor=col; ctx.shadowBlur=r*3;
    ctx.beginPath(); ctx.arc(s.x,s.y,r*twinkle,0,Math.PI*2);
    ctx.fillStyle=col; ctx.fill();
    ctx.shadowBlur=0;

    // Label for hovered
    if(s===hovered||scale>1.8) {
      ctx.font='8px system-ui'; ctx.textAlign='center';
      ctx.fillStyle='rgba(200,190,255,0.9)';
      ctx.fillText(s.v.id, s.x, s.y-r-4);
    }
  });

  // Core
  const cg2=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,12);
  cg2.addColorStop(0,'#ffffff'); cg2.addColorStop(0.4,'#c0a0ff'); cg2.addColorStop(1,'transparent');
  ctx.beginPath(); ctx.arc(W/2,H/2,12,0,Math.PI*2);
  ctx.fillStyle=cg2; ctx.shadowColor='#a080ff'; ctx.shadowBlur=20; ctx.fill(); ctx.shadowBlur=0;
  ctx.font='bold 8px system-ui'; ctx.textAlign='center'; ctx.fillStyle='rgba(0,0,0,0.8)';
  ctx.fillText('091',W/2,H/2+3);

  ctx.restore();
  requestAnimationFrame(draw);
}
draw();
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
