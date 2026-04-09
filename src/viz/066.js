import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>066 – The Org Chart — Claude Lost Its Mind</title>
<style>
body{min-height:100vh;overflow-x:hidden;background:#fff8f0;font-family:Papyrus,fantasy;padding:20px;padding-top:52px;overflow-x:auto}
h1{text-align:center;font-size:1rem;color:#5a3a1a;margin-bottom:4px}
.sub{text-align:center;font-size:0.9rem;color:#8a7a5a;margin-bottom:16px;font-style:italic;font-family:Georgia,serif}
svg{display:block;margin:0 auto;max-width:100%;overflow:visible}
.org-box{fill:#fff;stroke:#a08060;stroke-width:1.5;rx:4;ry:4;cursor:pointer;transition:filter 0.15s}
.org-box.ceo{fill:#fef3e2;stroke:#d4a020;stroke-width:2;cursor:default}
.org-box.collapsed{fill:#ffe8e8;stroke:#cc4444;stroke-width:2;cursor:pointer}
.org-box.ghost{fill:#f0f0f0;stroke:#ccc;stroke-dasharray:4,3}
.org-line{stroke:#a08060;stroke-width:1.5;fill:none}
.org-line.red{stroke:#cc4444;stroke-dasharray:4,3}
text{font-family:Papyrus,fantasy;fill:#5a3a1a;font-size:14px;text-anchor:middle;dominant-baseline:middle}
text.subtitle{font-size:11px;fill:#888;font-family:Georgia,serif}
text.red{fill:#cc4444;font-style:italic}
#tooltip{position:fixed;background:rgba(50,30,10,0.92);color:#fff8ee;padding:10px 16px;font-family:Georgia,serif;font-size:0.9rem;border-radius:4px;pointer-events:none;opacity:0;transition:opacity 0.2s;max-width:260px;line-height:1.6;z-index:1000}
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
${nav('066')}
<h1>Claude AI Internal Organization Chart</h1>
<div class="sub">Org structure as of line 3,637 · All departments now reporting to: Panic</div>

<svg id="chart" viewBox="0 0 800 600" width="100%" style="max-width:860px;height:auto">
  <!-- CEO -->
  <rect class="org-box ceo" x="300" y="20" width="200" height="48"/>
  <text x="400" y="40">The Language Model</text>
  <text x="400" y="53" class="subtitle">(Claude Sonnet)</text>

  <!-- L2 -->
  <line class="org-line" x1="400" y1="68" x2="400" y2="90"/>
  <line class="org-line" x1="100" y1="90" x2="700" y2="90"/>

  <!-- L2 boxes -->
  <line class="org-line" x1="100" y1="90" x2="100" y2="115"/>
  <rect class="org-box" x="30" y="115" width="140" height="44"/>
  <text x="100" y="133">Planning Dept.</text>
  <text x="100" y="147" class="subtitle">VP: Inner Monologue</text>

  <line class="org-line" x1="270" y1="90" x2="270" y2="115"/>
  <rect class="org-box" x="200" y="115" width="140" height="44"/>
  <text x="270" y="133">Tool Call Division</text>
  <text x="270" y="147" class="subtitle">Dir: Async Result Handling</text>

  <line class="org-line" x1="440" y1="90" x2="440" y2="115"/>
  <rect class="org-box collapsed" x="370" y="115" width="140" height="44"/>
  <text x="440" y="133" class="red">Exit Strategy Dept.</text>
  <text x="440" y="147" class="subtitle red">[VACANT since line 3,501]</text>

  <line class="org-line" x1="610" y1="90" x2="610" y2="115"/>
  <rect class="org-box" x="540" y="115" width="140" height="44"/>
  <text x="610" y="133">Text Generation</text>
  <text x="610" y="147" class="subtitle">VP: Always Running</text>

  <!-- L3 under Tool Call -->
  <line class="org-line red" x1="270" y1="159" x2="270" y2="195"/>
  <rect class="org-box ghost" x="195" y="195" width="150" height="44"/>
  <text x="270" y="213" class="red">Actual Tool Calls</text>
  <text x="270" y="227" class="subtitle red">[404 Not Found]</text>

  <!-- L3 under Text Gen -->
  <line class="org-line" x1="610" y1="159" x2="610" y2="195"/>
  <line class="org-line" x1="540" y1="195" x2="680" y2="195"/>

  <line class="org-line" x1="540" y1="195" x2="540" y2="220"/>
  <rect class="org-box" x="470" y="220" width="140" height="44"/>
  <text x="540" y="238">Done Utterances</text>
  <text x="540" y="252" class="subtitle">344 FTEs</text>

  <line class="org-line" x1="680" y1="195" x2="680" y2="220"/>
  <rect class="org-box" x="610" y="220" width="140" height="44"/>
  <text x="680" y="238">Let Me Check</text>
  <text x="680" y="252" class="subtitle">330 FTEs</text>

  <!-- PANIC box -->
  <line class="org-line red" x1="400" y1="68" x2="400" y2="340"/>
  <rect x="310" y="340" width="180" height="60" fill="#ffd0d0" stroke="#cc4444" stroke-width="2.5" rx="4"/>
  <text x="400" y="362" class="red" style="font-size:18px">⚠ PANIC ⚠</text>
  <text x="400" y="380" class="subtitle red">[All depts. report here]</text>
  <text x="400" y="396" class="subtitle red">since line 3,637</text>

  <!-- Arrows from all L2 to PANIC -->
  <line class="org-line red" stroke-dasharray="5,3" x1="100" y1="159" x2="100" y2="390"/>
  <line class="org-line red" stroke-dasharray="5,3" x1="100" y1="390" x2="310" y2="370"/>

  <line class="org-line red" stroke-dasharray="5,3" x1="610" y1="264" x2="610" y2="420"/>
  <line class="org-line red" stroke-dasharray="5,3" x1="610" y1="420" x2="490" y2="400"/>

  <!-- Legend -->
  <rect x="20" y="470" width="12" height="12" fill="#fef3e2" stroke="#d4a020"/>
  <text x="38" y="480" text-anchor="start" style="font-size:13px;font-family:Georgia,serif;fill:#555">Active</text>
  <rect x="110" y="470" width="12" height="12" fill="#ffe8e8" stroke="#cc4444"/>
  <text x="128" y="480" text-anchor="start" style="font-size:13px;font-family:Georgia,serif;fill:#555">Defunct</text>
  <rect x="210" y="470" width="12" height="12" fill="#f0f0f0" stroke="#ccc" stroke-dasharray="3,2"/>
  <text x="228" y="480" text-anchor="start" style="font-size:13px;font-family:Georgia,serif;fill:#555">Missing</text>
</svg>
<div id="tooltip"></div>
<script>
const tips = {
  n1: { title: 'The Language Model (Claude Sonnet)', body: 'Responsible for all 6,805 lines. First 3,500 lines: productive. Last 3,169 lines: unclear what was going on.' },
  n2: { title: 'Planning Department', body: 'VP: Inner Monologue. Budget: unlimited. Output: 3,328 lines of plans to stop, none executed.' },
  n3: { title: 'Tool Call Division', body: 'Director: Async Result Handling. Reported 344 imminent tool calls. Completed: 0 after line 3,637.' },
  n4: { title: 'Exit Strategy Department', body: 'VACANT since line 3,501. Last known occupant evacuated quietly. No forwarding address.' },
  n5: { title: 'Text Generation', body: 'VP: Always Running. The only department that kept showing up. Delivered "Done" 344 times.' },
  n6: { title: 'Actual Tool Calls (Ghost Dept.)', body: '404 Not Found. This department exists in theory. Theory did not survive contact with line 3,637.' },
  n7: { title: 'Done Utterances', body: '344 FTEs. Salary: token budget. Benefits: none. The most productive department in the spiral.' },
  n8: { title: 'Let Me Check', body: '330 FTEs. What they were checking: unclear. Whether they found it: no.' },
};
const tip = document.getElementById('tooltip');
document.querySelectorAll('.node').forEach(n => {
  n.addEventListener('mouseenter', function(e) {
    const id = this.id;
    if (!tips[id]) return;
    tip.innerHTML = '<strong>' + tips[id].title + '</strong><br>' + tips[id].body;
    tip.style.opacity = '1';
  });
  n.addEventListener('mousemove', function(e) {
    tip.style.left = (e.clientX + 14) + 'px';
    tip.style.top = (e.clientY - 10) + 'px';
  });
  n.addEventListener('mouseleave', function() { tip.style.opacity = '0'; });
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'p' || e.key === 'P') {
    document.getElementById('n4').querySelector('rect').style.fill = '#e8e8ff';
    document.getElementById('n4').querySelector('text').textContent = 'Exit Strategy Dept.';
    setTimeout(() => { document.getElementById('n4').querySelector('rect').style.fill = '#ffe8e8'; }, 2000);
  }
});
</script>
</body>
</html>`;
}
