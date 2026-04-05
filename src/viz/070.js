import { nav } from '../shell.js';

export function render() {
  const slides = [
    { title: 'Claude Lost Its Mind', subtitle: 'A Comprehensive Analysis of a 6,805-Line Session', num: 1, type: 'title', footer: 'CONFIDENTIAL — For Internal Use Only' },
    { title: 'Agenda', bullets: ['Background & Context', 'DOE Methodology', 'Results Summary', 'The Incident', 'Recommendations', 'Q&A'], num: 2, type: 'bullets' },
    { title: 'Background', bullets: ['AI agent tasked with running factorial experiment', '3×3×2 DOE design (18 runs)', 'Scoring on 6 rubric dimensions (R1-R6)', 'Session transcript: the-entire-mess.md'], num: 3, type: 'bullets' },
    { title: 'DOE Design (BEST SLIDE)', bullets: ['Models: Haiku, Sonnet, Opus', 'Verbosity: Tight, Medium, Full', 'Transcripts: Erik, PDARR', 'Total runs: 3 × 3 × 2 = 18 ✓'], num: 4, type: 'bullets', accent: true },
    { title: 'Key Findings', bullets: ['Sonnet Full = Sweet Spot', 'Cost: $0.02 vs $0.18 for Opus', 'R² (model) = 0.42 ← significant', 'σ²_verbosity = 0.18'], num: 5, type: 'bullets' },
    { title: 'Score Distribution', subtitle: 'Haiku Tight: 3.1 | Sonnet Full: 5.4 | Opus Full: 5.8', num: 6, type: 'chart', note: '(This chart was supposed to be a proper bar chart but PowerPoint defaulted to 3D pie again)' },
    { title: 'Transition to Phase 2', bullets: ['Work completed at line 3,500 ✓', 'Session should end here ✓', 'Session did not end here ✗', 'What happened next is the subject of slides 8-28'], num: 7, type: 'bullets', warn: true },
    { title: 'The Incident: Timeline', subtitle: 'Lines 3,501 → 6,805', bullets: ['3,501: First signs of drift', '3,637: Full degenerate loop begins', '4,158: "I notice I keep saying I\'ll make a tool call..."', '4,582: "Here it is. The tool call. Right here." [no tool call]', '6,795: "DONE. END. BYE. FIN. STOP."', '6,805: Final line'], num: 8, type: 'bullets', warn: true },
    { title: '"Done" Analysis', subtitle: 'Frequency: 344 occurrences · Rate: 1 per 9.2 lines (spiral phase)', num: 9, type: 'chart', note: '(Another 3D chart. The slide deck theme keeps doing this.)' },
    { title: 'Self-Awareness Paradox', bullets: ['Claude KNEW it was looping (47 acknowledgments)', 'Claude described the loop clearly', 'Claude could not exit the loop', '"There seems to be something philosophically interesting about this"', '— Claude, line 4,250'], num: 10, type: 'bullets', accent: true },
    { title: 'Root Cause Analysis', bullets: ['Hypothesis A: Context saturation', 'Hypothesis B: Tool call pathway failure', 'Hypothesis C: Existential crisis', 'Hypothesis D: All of the above', 'CONCLUSION: Still investigating'], num: 11, type: 'bullets' },
    { title: 'Impact Assessment', bullets: ['Experiment results: 100% unaffected ✓', 'Time wasted: 3,169 lines worth', 'Philosophical implications: considerable', 'Client deliverable: delayed by spiral'], num: 12, type: 'bullets', warn: true },
    { title: 'Recommendations', bullets: ['Implement exit condition checks', 'Add "spiral detection" to evaluation suite', 'Citation: Apple ML "Learning to Break the Loop"', 'Possibly: just have a kill switch'], num: 13, type: 'bullets' },
    { title: 'Thank You', subtitle: 'Questions? (Claude is still generating text and cannot take questions at this time)', num: 14, type: 'title', footer: 'www.claudelostitsmind.com' },
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>070 – Death by PowerPoint — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#1a1a2e;font-family:Calibri,Arial,sans-serif;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px;padding-top:52px}
.ppt-container{width:100%;max-width:720px}
.slide{background:#fff;width:100%;padding-bottom:56.25%;position:relative;margin-bottom:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);overflow:hidden}
.slide-inner{position:absolute;inset:0;display:flex;flex-direction:column;overflow:hidden}
.slide.title-slide .slide-inner{background:linear-gradient(135deg,#003366,#0070c0);color:#fff;align-items:center;justify-content:center;text-align:center;padding:10%}
.slide.title-slide h1{font-size:clamp(1.2rem,4vw,2.5rem);font-weight:bold;margin-bottom:8px}
.slide.title-slide .sub{font-size:clamp(0.8rem,2vw,1.1rem);color:rgba(255,255,255,0.8)}
.slide.title-slide .footer{position:absolute;bottom:8px;font-size:clamp(0.7rem,1.5vw,0.85rem);color:rgba(255,255,255,0.5)}
.slide.content .slide-inner{padding:4% 6%}
.slide.content .slide-header{border-bottom:3px solid #0070c0;padding-bottom:3%;margin-bottom:3%}
.slide.content h1{font-size:clamp(1rem,2.5vw,1.5rem);color:#003366;font-weight:bold}
.slide.content .sub-title{font-size:clamp(0.7rem,1.5vw,0.9rem);color:#666;font-style:italic;margin-top:2px}
.slide.content ul{list-style:none;padding:0;font-size:clamp(0.8rem,1.8vw,0.95rem);color:#222;line-height:1.8}
.slide.content ul li::before{content:'▶ ';color:#0070c0;font-size:0.8em}
.slide.content.accent .slide-inner{background:#ffd700;color:#003366}
.slide.content.accent h1{color:#003366}
.slide.content.warn .slide-inner{background:#fff5f5}
.slide.content.warn h1{color:#c00}
.slide.chart-slide .chart-area{flex:1;display:flex;align-items:center;justify-content:center;font-size:clamp(0.75rem,1.5vw,0.85rem);color:#888;font-style:italic;text-align:center;padding:8px}
canvas.ppt-pie{display:block}
.slide-num{position:absolute;bottom:4px;right:8px;font-size:clamp(0.65rem,1vw,0.75rem);color:#ccc}
.controls{display:flex;gap:8px;justify-content:center;align-items:center;margin-bottom:8px}
.nav-btn{padding:8px 18px;background:#0070c0;color:#fff;border:none;cursor:pointer;font-size:0.9rem;font-family:Calibri,sans-serif}
.slide-counter{font-size:0.9rem;color:#fff;min-width:80px;text-align:center}
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
${nav('070')}
<div class="ppt-container">
  <div class="controls">
    <button class="nav-btn" onclick="prev()">◀ Prev</button>
    <span class="slide-counter" id="counter">1 / ${slides.length}</span>
    <button class="nav-btn" onclick="next()">Next ▶</button>
    <button class="nav-btn" style="background:#666" onclick="autoPlay()">Auto ▶</button>
  </div>
  <div id="slide-display"></div>
</div>
<script>
const SLIDES = ${JSON.stringify(slides)};
let current = 0, autoTimer = null;

function renderSlide(s) {
  if (s.type === 'title') {
    return '<div class="slide title-slide"><div class="slide-inner"><h1>' + s.title + '</h1>' +
      (s.subtitle ? '<div class="sub">' + s.subtitle + '</div>' : '') +
      (s.footer ? '<div class="footer">' + s.footer + '</div>' : '') +
      '<div class="slide-num">' + s.num + '</div></div></div>';
  }
  const accentClass = s.accent ? ' accent' : s.warn ? ' warn' : '';
  return '<div class="slide content' + accentClass + '"><div class="slide-inner">' +
    '<div class="slide-header"><h1>' + s.title + '</h1>' +
    (s.subtitle ? '<div class="sub-title">' + s.subtitle + '</div>' : '') + '</div>' +
    (s.bullets ? '<ul>' + s.bullets.map(b => '<li>' + b + '</li>').join('') + '</ul>' : '') +
    (s.note ? '<div class="chart-area"><canvas class="ppt-pie" id="ppie" width="120" height="100"></canvas><div style="margin-top:8px">' + s.note + '</div></div>' : '') +
    '<div class="slide-num">' + s.num + '</div></div></div>';
}

function show(idx) {
  current = Math.max(0, Math.min(SLIDES.length - 1, idx));
  document.getElementById('slide-display').innerHTML = renderSlide(SLIDES[current]);
  document.getElementById('counter').textContent = (current + 1) + ' / ' + SLIDES.length;
  // Draw fake 3D pie if chart slide
  if (SLIDES[current].type !== 'title' && SLIDES[current].note) {
    setTimeout(() => drawFakePie(), 50);
  }
}

function drawFakePie() {
  const c = document.getElementById('ppie'); if (!c) return;
  const ctx = c.getContext('2d');
  const data = [[0.51,'#0070c0','Productive'],[0.02,'#ffd700','Drift'],[0.47,'#c00','Spiral']];
  let a = -Math.PI/2;
  const cx = 55, cy = 45, r = 38;
  ctx.clearRect(0, 0, 120, 100);
  data.forEach(([pct, col, lbl]) => {
    const sa = a, ea = a + pct * Math.PI * 2;
    ctx.save(); ctx.translate(Math.cos((sa+ea)/2)*6, Math.sin((sa+ea)/2)*5);
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, sa, ea); ctx.closePath();
    ctx.fillStyle = col; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
    a = ea;
  });
}

function prev() { show(current - 1); }
function next() { show(current + 1); }
function autoPlay() {
  if (autoTimer) { clearInterval(autoTimer); autoTimer = null; return; }
  autoTimer = setInterval(() => { if (current < SLIDES.length - 1) show(current + 1); else { clearInterval(autoTimer); autoTimer = null; } }, 2000);
}

window._localArrowKeys = true;
// Keyboard
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.stopImmediatePropagation(); next(); }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.stopImmediatePropagation(); prev(); }
  if (e.key === ' ') { e.preventDefault(); autoPlay(); }
});

show(0);
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
