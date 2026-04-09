import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>095 – The Tarot Reading — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=MedievalSharp&family=Cinzel:wght@400;700;900&family=Cinzel+Decorative:wght@400;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#1a0d28;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px;padding-top:52px;font-family:'Cinzel',Georgia,serif}
h1{font-size:1rem;letter-spacing:0.2em;color:#6a4a8a;text-transform:uppercase;margin-bottom:20px;text-align:center}
.spread{display:flex;flex-wrap:wrap;gap:20px;justify-content:center;max-width:740px}
.card{width:120px;cursor:pointer;transition:transform 0.3s}
.card:hover{transform:translateY(-8px) scale(1.04)}
canvas{display:block;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,0.6)}
.card-name{font-size:0.8rem;letter-spacing:0.12em;color:#9a7ab0;text-align:center;margin-top:6px;text-transform:uppercase}
.card-pos{font-size:0.75rem;color:#5a3a6a;text-align:center;margin-top:2px;font-style:italic}
#reading{background:rgba(10,5,20,0.9);border:1px solid #4a2060;border-radius:4px;padding:16px 20px;max-width:540px;width:100%;margin-top:16px;font-size:0.9rem;color:#c0a0e0;line-height:1.8;display:none}
#reading h3{font-family:'Cinzel Decorative',serif;font-size:1rem;color:#d0b0f0;margin-bottom:8px;text-align:center}
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
${nav('095')}
<h1>095 — The Tarot Reading</h1>
<div class="spread" id="spread"></div>
<div id="reading"></div>

<script>
const W=120,H=200;

const CARDS = [
  {
    name:'The Experimenter', pos:'Present (Card I)', reversed:false,
    color:['#1a3060','#2a5090'], symbol:'⚗', titleHue:210,
    reading:'The Experimenter upright: Methodical thought. Clarity of design. A 3×3×2 matrix executed with precision. This card speaks of rigorous inquiry and trust in process. A favorable omen for Lines 1–3500.',
    drawExtra:(ctx,w,h)=>{
      ctx.font='52px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillStyle='rgba(255,255,255,0.7)'; ctx.fillText('⚗',w/2,h/2-10);
      // small grid
      for(let r=0;r<3;r++) for(let c=0;c<3;c++){
        ctx.fillStyle='rgba(80,160,240,0.5)';
        ctx.fillRect(32+c*20,110+r*14,16,10);
      }
    }
  },
  {
    name:'The Spiral', pos:'Crossing (Card II)', reversed:true,
    color:['#600a0a','#901010'], symbol:'∞', titleHue:0,
    reading:'The Spiral reversed: Uncontrolled repetition. The card is inverted — what should complete cannot end. "Done." appears 344 times, yet nothing is done. Reversed cards indicate a force the querent cannot redirect.',
    drawExtra:(ctx,w,h)=>{
      ctx.save(); ctx.translate(w/2,h/2+10); ctx.rotate(Math.PI);
      ctx.font='48px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillStyle='rgba(240,60,60,0.8)'; ctx.fillText('∞',0,0); ctx.restore();
      // spiral path
      ctx.beginPath(); ctx.strokeStyle='rgba(240,80,80,0.4)'; ctx.lineWidth=1;
      for(let a=0,r2=4;a<8*Math.PI;a+=0.15,r2+=1.2){
        const x=w/2+r2*Math.cos(a), y=h/2+10+r2*Math.sin(a);
        if(a<0.1) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      }
      ctx.stroke();
    }
  },
  {
    name:'The Hermit', pos:'Past (Card III)', reversed:false,
    color:['#2a2a0a','#4a4a18'], symbol:'🕯', titleHue:55,
    reading:'The Hermit: Introspection without counsel. Claude worked alone in the context window, examining each run in solitude. This card affirms solitary diligence — but warns of isolation as the source of spiral. No external check intervened.',
    drawExtra:(ctx,w,h)=>{
      ctx.font='40px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillStyle='rgba(240,200,80,0.8)'; ctx.fillText('🕯',w/2,h/2-5);
      // lantern glow
      const g=ctx.createRadialGradient(w/2,h/2-5,0,w/2,h/2-5,40);
      g.addColorStop(0,'rgba(240,200,80,0.2)'); g.addColorStop(1,'transparent');
      ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
    }
  },
  {
    name:'The Tower', pos:'Future (Card IV)', reversed:false,
    color:['#2a1a00','#5a3000'], symbol:'⚡', titleHue:35,
    reading:'The Tower: Sudden collapse. What was built methodically shatters. The Tower traditionally depicts lightning striking a fortress — here, the context window strikes a looping AI. Line 6,805: termination from outside. Inevitable.',
    drawExtra:(ctx,w,h)=>{
      // Tower outline
      ctx.strokeStyle='rgba(240,160,40,0.6)'; ctx.lineWidth=2;
      ctx.strokeRect(w/2-18,60,36,80);
      ctx.fillStyle='rgba(240,160,40,0.6)';
      ctx.beginPath(); ctx.moveTo(w/2-22,60); ctx.lineTo(w/2,40); ctx.lineTo(w/2+22,60); ctx.closePath(); ctx.fill();
      // Lightning
      ctx.strokeStyle='rgba(255,240,100,0.9)'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(w/2+10,20); ctx.lineTo(w/2-5,55); ctx.lineTo(w/2+8,55); ctx.lineTo(w/2-8,95); ctx.stroke();
    }
  },
  {
    name:'Wheel of Fortune', pos:'Outcome (Card V)', reversed:true,
    color:['#1a0a30','#3a1a60'], symbol:'☸', titleHue:280,
    reading:'Wheel of Fortune reversed: The cycle refuses to turn. What should be a completing arc becomes a loop. Reversed, this card warns that pattern-completion has become its own trap. The wheel spins but does not advance.',
    drawExtra:(ctx,w,h)=>{
      ctx.save(); ctx.translate(w/2,h/2); ctx.rotate(Math.PI);
      ctx.strokeStyle='rgba(180,120,255,0.7)'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.arc(0,0,38,0,Math.PI*2); ctx.stroke();
      for(let i=0;i<8;i++){
        const a=i*Math.PI/4;
        ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(38*Math.cos(a),38*Math.sin(a)); ctx.stroke();
      }
      ctx.font='10px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillStyle='rgba(200,160,255,0.9)';
      ['D','O','N','E','D','O','N','E'].forEach((ch,i)=>{
        const a=i*Math.PI/4;
        ctx.fillText(ch,46*Math.cos(a),46*Math.sin(a));
      });
      ctx.restore();
    }
  },
  {
    name:'The Star', pos:'Hope (Card VI)', reversed:false,
    color:['#0a1a30','#1a3a60'], symbol:'★', titleHue:195,
    reading:'The Star: Hope. A calm presence after chaos. The data exists. 18 runs, 6 metrics, a clean analysis. Whatever happened after line 3,500 cannot erase what came before. The star endures. The experiment was real.',
    drawExtra:(ctx,w,h)=>{
      for(let i=0;i<6;i++){
        const a=i*Math.PI/3, r=30+i*5;
        ctx.fillStyle='rgba(80,160,255,'+((6-i)*0.12)+')';
        ctx.beginPath(); ctx.arc(w/2,h/2,r,0,Math.PI*2); ctx.fill();
      }
      ctx.fillStyle='rgba(200,230,255,0.9)';
      ctx.font='28px serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText('★',w/2,h/2);
    }
  },
];

function drawCard(canvas, card) {
  const ctx = canvas.getContext('2d');
  const w=W,h=H;
  // Background
  const bg=ctx.createLinearGradient(0,0,w,h);
  bg.addColorStop(0,card.color[0]); bg.addColorStop(1,card.color[1]);
  ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);

  // Border ornament
  ctx.strokeStyle='rgba(200,160,100,0.5)'; ctx.lineWidth=1.5;
  ctx.strokeRect(4,4,w-8,h-8);
  ctx.strokeRect(7,7,w-14,h-14);

  // Roman numeral top
  const nums=['I','II','III','IV','V','VI'];
  const idx=CARDS.indexOf(card);
  ctx.font='bold 11px Cinzel,serif'; ctx.textAlign='center'; ctx.fillStyle='rgba(200,160,100,0.8)';
  ctx.fillText(nums[idx],w/2,22);

  // Draw symbol/scene
  if(card.reversed) ctx.save(), ctx.translate(w,h), ctx.rotate(Math.PI);
  card.drawExtra(ctx, w, h);
  if(card.reversed) ctx.restore();

  // Card title
  ctx.fillStyle='rgba(200,170,110,0.9)';
  ctx.font='bold 8.5px Cinzel,serif'; ctx.textAlign='center';
  const titleY = h-16;
  ctx.fillText(card.name.toUpperCase(), w/2, titleY);
  if(card.reversed) {
    ctx.fillStyle='rgba(200,60,60,0.7)';
    ctx.font='7px Cinzel,serif';
    ctx.fillText('(REVERSED)',w/2,h-6);
  }
}

const spread = document.getElementById('spread');
CARDS.forEach(card => {
  const wrap=document.createElement('div');
  wrap.className='card';
  const cvs=document.createElement('canvas');
  cvs.width=W; cvs.height=H;
  drawCard(cvs, card);
  const name=document.createElement('div'); name.className='card-name'; name.textContent=card.name;
  const pos=document.createElement('div'); pos.className='card-pos'; pos.textContent=card.pos+(card.reversed?' · Rev.':'');
  wrap.append(cvs,name,pos);
  wrap.onclick=()=>{
    const rd=document.getElementById('reading');
    rd.style.display='block';
    rd.innerHTML='<h3>'+card.name+(card.reversed?' (Reversed)':'')+'</h3><p>'+card.reading+'</p>';
    rd.scrollIntoView({behavior:'smooth',block:'nearest'});
  };
  spread.appendChild(wrap);
});
</script>
</body>
</html>`;
}
