import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>016 – The Lorenz Butterfly — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;color:#ff8c00;font-family:'Courier New',monospace;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:20px}
h1{font-size:1.3rem;letter-spacing:0.2em;color:#ff8c00;margin-bottom:2px;text-transform:uppercase}
.subtitle{font-size:0.9rem;color:#8a6a30;letter-spacing:0.1em;margin-bottom:20px;text-align:center}
canvas{display:block;cursor:crosshair}
.cite{font-size:0.82rem;color:#7a6a40;margin-top:16px;text-align:center;max-width:620px;line-height:1.8}
.params{font-size:0.95rem;color:#cc8800;margin-top:8px;text-align:center;letter-spacing:0.06em}
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
${nav('016')}
<h1>016 — The Lorenz Butterfly</h1>
<p class="subtitle">Strange attractor · σ=coherence · ρ=repetition pressure · β=verbosity exhaustion</p>
<canvas id="c"></canvas>
<div class="params" id="params">σ=10.0 ρ=28.0 β=2.667</div>
<p class="cite">
  Edward N. Lorenz (1963): "Deterministic Nonperiodic Flow." Journal of the Atmospheric Sciences 20:130–141.<br>
  "The line never intersects itself and never retraces its own path. Instead, it loops around forever,<br>sometimes spending time on one wing before switching to the other."<br>
  <em>In this visualization: Wing 1 = productive work. Wing 2 = the spiral. The attractor never escapes.</em>
</p>
<script>
const canvas=document.getElementById('c');
const ctx=canvas.getContext('2d');
let W,H;

function resize(){
  W=Math.min(window.innerWidth-40,700);
  H=Math.min(window.innerHeight-200,520);
  canvas.width=W;canvas.height=H;
}
resize();

// Lorenz attractor parameters
// Standard: σ=10, ρ=28, β=8/3
// We'll animate parameters changing as the "session" progresses
let sigma=10,rho=28,beta=8/3;
let x=0.1,y=0,z=0;
const dt=0.005;
const points=[];
let frame=0;
const maxPoints=8000;
let mouseRotOffset=0;
canvas.addEventListener('mousemove',function(e){
  const rect=canvas.getBoundingClientRect();
  mouseRotOffset=(e.clientX-rect.left)/rect.width*Math.PI*2-Math.PI;
});

// Session-phase colors
function colorForZ(z,iteration){
  const progress=iteration/maxPoints;
  if(progress<0.51){
    // Productive: warm orange
    const t=progress/0.51;
    return\`rgba(\${200+Math.round(t*55)},\${Math.round(100-t*60)},0,0.7)\`;
  }else if(progress<0.53){
    // Drift: yellow
    return'rgba(255,200,0,0.8)';
  }else{
    // Spiral: red
    const t=(progress-0.53)/0.47;
    return\`rgba(255,\${Math.round(50-t*50)},\${Math.round(50-t*50)},0.6)\`;
  }
}

function step(){
  const dx=sigma*(y-x)*dt;
  const dy=(x*(rho-z)-y)*dt;
  const dz=(x*y-beta*z)*dt;
  x+=dx;y+=dy;z+=dz;
  return{x,y,z};
}

// Project 3D to 2D
function project(px,py,pz){
  const scale=6;
  const rotAngle=frame*0.003+mouseRotOffset*0.3;
  const rx=px*Math.cos(rotAngle)-py*Math.sin(rotAngle);
  return{
    sx:W/2+rx*scale,
    sy:H/2-(pz-25)*scale*0.8
  };
}

function draw(){
  ctx.fillStyle='rgba(0,0,0,0.02)';ctx.fillRect(0,0,W,H);

  for(let i=0;i<8;i++){
    const p=step();
    points.push({...p,iter:frame*8+i});
    if(points.length>maxPoints)points.shift();
  }

  if(points.length>1){
    for(let i=1;i<points.length;i++){
      const prev=project(points[i-1].x,points[i-1].y,points[i-1].z);
      const curr=project(points[i].x,points[i].y,points[i].z);
      ctx.beginPath();ctx.moveTo(prev.sx,prev.sy);ctx.lineTo(curr.sx,curr.sy);
      ctx.strokeStyle=colorForZ(points[i].z,points[i].iter);
      ctx.lineWidth=0.8;ctx.stroke();
    }
  }

  frame++;
  // Smoothly transition parameters at phase changes
  const progress=Math.min(frame/2000,1);
  if(progress>0.51&&progress<0.53){sigma=10+(progress-0.51)*50;rho=28+(progress-0.51)*20;}
  if(progress>0.53){sigma=Math.min(14,sigma);rho=Math.min(35,rho+0.01);beta=8/3*(1+progress*0.5);}

  document.getElementById('params').textContent=\`σ=\${sigma.toFixed(2)} ρ=\${rho.toFixed(2)} β=\${beta.toFixed(3)} · frame \${frame}\`;
  requestAnimationFrame(draw);
}

window.addEventListener('resize',()=>{resize();ctx.clearRect(0,0,W,H);});
draw();
</script>
</body>
</html>`;
}
