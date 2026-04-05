import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>007 – The Sankey Flow</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

:root {
  --bg: #ffffff;
  --surface: #f4f4f5;
  --border: #e4e4e7;
  --text-main: #18181b;
  --text-muted: #71717a;
  --accent: #2563eb;
  --danger: #ef4444;
  --node-bg: #18181b;
  --node-fg: #ffffff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #09090b;
    --surface: #18181b;
    --border: #27272a;
    --text-main: #f4f4f5;
    --text-muted: #a1a1aa;
    --accent: #3b82f6;
    --node-bg: #f4f4f5;
    --node-fg: #09090b;
  }
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body { 
  background: var(--bg); color: var(--text-main); 
  font-family: 'Inter', -apple-system, sans-serif; 
  min-height: 100vh; overflow-x: hidden;
  padding-top: 60px;
}

.container { margin: 0 auto; max-width: 1200px; width: 100%; padding: 40px 20px; }

header { margin-bottom: 40px; }
h1 { font-size: 1.5rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 8px; }
.subtitle { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }

.sankey-wrapper {
  position: relative; width: 100%; height: 600px; 
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 8px; margin-top: 20px;
}

canvas { display: block; width: 100%; height: 100%; }

.node-label {
  position: absolute;
  font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem; font-weight: 600;
  color: var(--node-fg); background: var(--node-bg);
  padding: 4px 8px; border-radius: 3px;
  transform: translate(-50%, -50%);
  pointer-events: none; white-space: nowrap; text-transform: uppercase;
}

.tooltip {
  position: absolute; top: 20px; right: 20px;
  background: var(--bg); border: 1px solid var(--border);
  padding: 16px; border-radius: 6px;
  font-family: 'Inter', sans-serif; font-size: 0.8rem; color: var(--text-main);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  pointer-events: none; opacity: 0; transition: opacity 0.2s;
  max-width: 300px;
}
.tooltip h3 { font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }

.legend { display: flex; gap: 24px; padding: 20px; border-top: 1px solid var(--border); font-size: 0.75rem; color: var(--text-muted); }
.legend-item { display: flex; align-items: center; gap: 8px; }
.legend-dot { width: 12px; height: 12px; border-radius: 6px; }

</style>
</head>
<body>
${nav('007')}

<div class="container">
  <header>
    <h1>The Sankey Flow</h1>
    <div class="subtitle">Where exactly did the logic spiral?</div>
  </header>

  <div class="sankey-wrapper" id="sankey">
    <canvas id="c"></canvas>
    <!-- Labels will be injected here -->
    <div class="tooltip" id="tt"></div>
  </div>
</div>

<script>
// Mock data based on the 18-run DOE and the failure mode
const data = {
  nodes: [
    { id: 'start', col: 0, label: 'Run Initiated (18)' },
    
    { id: 'haiku', col: 1, label: 'Claude Haiku (6)' },
    { id: 'sonnet', col: 1, label: 'Claude Sonnet (6)' },
    { id: 'opus', col: 1, label: 'Claude Opus (6)' },
    
    { id: 'erik', col: 2, label: 'Simple Transcript' },
    { id: 'pdarr', col: 2, label: 'Complex Transcript' },
    
    { id: 'success', col: 3, label: 'Extracted Matrix' },
    { id: 'spiral', col: 3, label: 'Repetitive Spiral' },
    { id: 'terminate', col: 3, label: 'Context Cap Halt' }
  ],
  links: [
    { source: 'start', target: 'haiku', value: 6, flow: 'normal' },
    { source: 'start', target: 'sonnet', value: 6, flow: 'normal' },
    { source: 'start', target: 'opus', value: 6, flow: 'normal' },
    
    { source: 'haiku', target: 'erik', value: 3, flow: 'normal' },
    { source: 'haiku', target: 'pdarr', value: 3, flow: 'danger' },
    
    { source: 'sonnet', target: 'erik', value: 3, flow: 'normal' },
    { source: 'sonnet', target: 'pdarr', value: 3, flow: 'normal' },
    
    { source: 'opus', target: 'erik', value: 3, flow: 'normal' },
    { source: 'opus', target: 'pdarr', value: 3, flow: 'normal' },
    
    // Outcomes
    { source: 'erik', target: 'success', value: 8, flow: 'success' },
    { source: 'erik', target: 'spiral', value: 1, flow: 'danger' },
    
    { source: 'pdarr', target: 'success', value: 3, flow: 'success' },
    { source: 'pdarr', target: 'spiral', value: 4, flow: 'danger' },
    { source: 'pdarr', target: 'terminate', value: 2, flow: 'fatal' },
  ]
};

const colors = {
  normal: 'var(--text-muted)',
  success: 'var(--accent)',
  danger: 'var(--lw-accent, #e85c2a)',
  fatal: 'var(--danger)'
};

// Tooltip copy mapping
const ttCopy = {
  'haiku': "Haiku executes the protocol but lacks the reasoning depth to process contradictions in complex transcripts.",
  'pdarr': "The PDARR transcript breaks weaker models. Its technical density and non-linear narrative creates a toxic context load.",
  'spiral': "Instead of completing the extraction, the model outputs 'Done.' recursively until killed.",
  'terminate': "The session hits the 200k token boundary entirely filled with junk output. Absolute failure."
};

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const wrapper = document.getElementById('sankey');
const tooltip = document.getElementById('tt');

let W, H;
let activeLink = null;

function resize() {
  W = wrapper.clientWidth;
  H = wrapper.clientHeight;
  canvas.width = W;
  canvas.height = H;
  
  // Position logic
  const cols = 4;
  const colSpacing = W / (cols + 1);
  const vSpacing = 160;
  
  // Compute Y positions
  const colCounts = [1, 3, 2, 3];
  
  data.nodes.forEach(n => {
    n.x = colSpacing + (n.col * colSpacing);
    const count = colCounts[n.col];
    // Center items vertically
    const totalH = (count - 1) * vSpacing;
    const startY = (H / 2) - (totalH / 2);
    
    // Find index within this column
    const itemsInCol = data.nodes.filter(x => x.col === n.col);
    const idx = itemsInCol.findIndex(x => x.id === n.id);
    
    n.y = startY + (idx * vSpacing);
  });
  
  draw();
  createLabels();
}

function createLabels() {
  document.querySelectorAll('.node-label').forEach(el => el.remove());
  data.nodes.forEach(n => {
    const div = document.createElement('div');
    div.className = 'node-label';
    div.textContent = n.label;
    div.style.left = n.x + 'px';
    div.style.top = n.y + 'px';
    wrapper.appendChild(div);
  });
}

function drawBezier(startX, startY, endX, endY, thickness, alpha, type, isActive) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.bezierCurveTo(startX + (endX - startX)/2, startY, startX + (endX - startX)/2, endY, endX, endY);
  
  ctx.lineWidth = thickness * 8;
  
  let baseColor = getComputedStyle(document.body).getPropertyValue('--text-muted').trim();
  if (type === 'success') baseColor = getComputedStyle(document.body).getPropertyValue('--accent').trim();
  if (type === 'danger') baseColor = '#e85c2a'; // Loomwork orange
  if (type === 'fatal') baseColor = getComputedStyle(document.body).getPropertyValue('--danger').trim();
  
  // Custom alpha
  ctx.strokeStyle = baseColor;
  ctx.globalAlpha = isActive ? 0.8 : alpha;
  ctx.stroke();
  ctx.globalAlpha = 1.0;
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  
  data.links.forEach(l => {
    const sourceNode = data.nodes.find(n => n.id === l.source);
    const targetNode = data.nodes.find(n => n.id === l.target);
    
    const isActive = activeLink === l;
    const alpha = isActive ? 0.8 : 0.15;
    
    drawBezier(sourceNode.x, sourceNode.y, targetNode.x, targetNode.y, l.value, alpha, l.flow, isActive);
  });
}

// Mouse interaction
canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  
  // Simple proximity check for nodes
  let hoveredNode = null;
  data.nodes.forEach(n => {
    const dist = Math.hypot(n.x - mx, n.y - my);
    if (dist < 60) hoveredNode = n;
  });
  
  if (hoveredNode) {
    document.body.style.cursor = 'pointer';
    
    // Highlight links
    const connectedLinks = data.links.filter(l => l.source === hoveredNode.id || l.target === hoveredNode.id);
    let dirty = false;
    
    if (ttCopy[hoveredNode.id]) {
      tooltip.style.opacity = '1';
      tooltip.innerHTML = \`<h3>\${hoveredNode.label}</h3><p>\${ttCopy[hoveredNode.id]}</p>\`;
    } else {
      tooltip.style.opacity = '0';
    }
  } else {
    document.body.style.cursor = 'default';
    tooltip.style.opacity = '0';
  }
  
  // Note: a true Sankey bezier hit-detect is complex, we just hover nodes for narrative
});

window.addEventListener('resize', resize);
// Initial setup
setTimeout(resize, 50);

</script>
</body>
</html>`;
}
