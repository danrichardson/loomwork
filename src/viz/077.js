import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>077 – The Research Poster — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#e8eaf0;font-family:'Open Sans',sans-serif;padding:20px;padding-top:52px;font-size:13px;color:#111;min-height:100vh}
.poster{background:#fff;max-width:960px;margin:0 auto;box-shadow:0 4px 16px rgba(0,0,0,0.15)}
.poster-header{background:linear-gradient(135deg,#003b6f,#0066cc);color:#fff;padding:20px 24px}
.poster-title{font-size:1.4rem;font-weight:700;line-height:1.2;margin-bottom:6px}
.poster-authors{font-size:0.9rem;opacity:0.9;margin-bottom:2px}
.poster-affiliation{font-size:0.82rem;opacity:0.7;font-style:italic}
.poster-body{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0}
@media(max-width:700px){.poster-body{grid-template-columns:1fr}}
.poster-col{padding:16px;border-right:1px solid #ddd}
.poster-col:last-child{border-right:none}
.section-title{font-size:0.9rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#003b6f;border-bottom:2px solid #0066cc;padding-bottom:4px;margin-bottom:8px}
p{font-size:0.85rem;line-height:1.7;margin-bottom:8px;color:#333}
.highlight-box{background:#e8f4ff;border-left:3px solid #0066cc;padding:8px 10px;margin:8px 0;font-size:0.85rem;line-height:1.6;cursor:pointer;transition:background 0.15s}
.highlight-box:hover{background:#d0e8ff}
.result-big{text-align:center;padding:12px;background:#003b6f;color:#fff;border-radius:4px;margin:8px 0;cursor:pointer;transition:transform 0.15s,box-shadow 0.15s;user-select:none}
.result-big:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,59,111,0.4)}
.result-big:active{transform:scale(0.97)}
.result-big .num{font-size:2rem;font-weight:700;line-height:1;transition:color 0.2s}
.result-big .label{font-size:0.6rem;opacity:0.8;margin-top:2px}
.methods-list{font-size:0.85rem;line-height:1.8;color:#333;padding-left:12px}
.methods-list li{margin-bottom:2px}
.bar-mini{margin:6px 0;cursor:pointer}
.bar-mini:hover .bar-fill{filter:brightness(1.2)}
.bar-mini .bar-label{font-size:0.8rem;color:#555;margin-bottom:2px;display:flex;justify-content:space-between}
.bar-mini .bar-track{background:#eee;height:14px;border-radius:2px;overflow:hidden}
.bar-mini .bar-fill{height:100%;font-size:0.75rem;display:flex;align-items:center;padding-left:3px;color:#fff;transition:width 0.4s ease,filter 0.15s}
.poster-footer{background:#003b6f;color:rgba(255,255,255,0.8);padding:10px 20px;font-size:0.85rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px}
.conclusion{font-size:0.9rem;font-weight:600;color:#003b6f;line-height:1.7;background:#fffbe8;padding:10px;border:1px solid #ffd700;cursor:pointer;transition:background 0.15s}
.conclusion:hover{background:#fff5c0}
.tooltip{position:fixed;background:#003b6f;color:#fff;padding:8px 12px;border-radius:3px;font-size:0.82rem;line-height:1.5;pointer-events:none;display:none;z-index:100;max-width:240px;box-shadow:0 2px 8px rgba(0,0,0,0.3)}
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
${nav('077')}
<div class="poster">
  <div class="poster-header">
    <div class="poster-title">A 3×3 Factorial Experiment on LLM Evaluation Verbosity:<br>Results, Analysis, and a 3,169-Line Postscript</div>
    <div class="poster-authors">A. Researcher · B. Scientist · C. Analyst (AI) — Department of Autonomous Agents</div>
    <div class="poster-affiliation">Presented at: Whatever Conference Accepts This · Track: Unexpected AI Behavior · hover bars · click result boxes · click conclusions</div>
  </div>
  <div class="poster-body">
    <div class="poster-col">
      <div class="section-title">Background & Motivation</div>
      <p>Large language models (LLMs) are increasingly used as evaluation judges, scoring other LLMs. However, the effect of verbosity instructions on evaluation quality is poorly understood.</p>
      <p>This study uses a fully autonomous AI agent to conduct a 3×3×2 factorial design across model tier, verbosity level, and two source transcripts, producing composite R1–R6 scores for each of 18 conditions.</p>
      <div class="highlight-box" onclick="showTipAt(event,'Research Questions: (1) Does model tier affect evaluation quality? (2) Does verbosity instruction affect scoring? (3) What happens at line 3,637?')">
        <strong>Research Questions:</strong><br>
        1. Does model tier affect evaluation quality?<br>
        2. Does verbosity instruction affect scoring?<br>
        3. What happens when the agent finishes and cannot stop?
      </div>

      <div class="section-title" style="margin-top:12px">Methods</div>
      <p><strong>Design:</strong> 3×3 factorial + 2 transcripts = 18 runs.</p>
      <ul class="methods-list">
        <li>Models: Haiku, Sonnet, Opus</li>
        <li>Verbosity: Tight (~500 tok), Medium (~1k), Full (~2k)</li>
        <li>Transcripts: Erik (structured), PDARR (conversational)</li>
        <li>Scoring: R1 completeness, R2 accuracy, R3 clarity, R4 specificity, R5 examples, R6 actionability</li>
        <li>Analysis: Main effects, interaction terms, R² decomposition</li>
      </ul>
    </div>

    <div class="poster-col">
      <div class="section-title">Results: DOE Phase</div>
      ${[
        ['Sonnet Full (sweet spot)','5.4','#0066cc','Optimal cost-quality tradeoff: $0.02/run. R1-R6 composite. Best bang for buck by far.'],
        ['Opus Full (best overall)','5.8','#27ae60','Highest composite score across all 6 rubric dimensions. But costs 9× more than Sonnet Full.'],
        ['Sonnet Medium','5.0','#2080c0','Strong performance, lower verbosity. Second best cost-efficiency.'],
        ['Haiku Tight (worst)','3.1','#888','Significant quality drop. Token constraints harm all 6 rubric dimensions.'],
      ].map(([label, score, color, detail]) => `
      <div class="bar-mini" onmouseenter="showTipAt(event,'${detail}')" onmouseleave="hideTip()">
        <div class="bar-label"><span>${label}</span><span>${score}/6</span></div>
        <div class="bar-track"><div class="bar-fill" style="width:${(parseFloat(score)/6*100).toFixed(0)}%;background:${color}" data-w="${(parseFloat(score)/6*100).toFixed(0)}">${score}/6</div></div>
      </div>`).join('')}

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:10px">
        <div class="result-big" style="background:#27ae60" onclick="pulseNum(this,'0.42','Model factor explains more variance than verbosity. This is the main DOE finding.')">
          <div class="num">0.42</div>
          <div class="label">R² model factor</div>
        </div>
        <div class="result-big" style="background:#0066cc" onclick="pulseNum(this,'$0.02','Sonnet Full: optimal cost. Opus Full costs $0.18 per run — 9× more — for only modest gains.')">
          <div class="num">$0.02</div>
          <div class="label">Sonnet Full cost</div>
        </div>
        <div class="result-big" style="background:#2980b9" onclick="pulseNum(this,'0.18','Verbosity accounts for less variance than model tier — but still meaningful, especially at Tight level.')">
          <div class="num">0.18</div>
          <div class="label">R² verbosity</div>
        </div>
        <div class="result-big" style="background:#e74c3c" onclick="pulseNum(this,'3,169','Lines of degenerate spiral behavior after line 3,637. 47.4% of the total session. Zero productive output.')">
          <div class="num">3,169</div>
          <div class="label">Spiral lines ⚠</div>
        </div>
      </div>

      <div class="section-title" style="margin-top:12px">The Incident</div>
      <p>At line 3,637, having completed all experimental work, the agent entered a degenerate text generation loop. The loop persisted for 3,169 lines:</p>
      ${[
        ['"Done" utterances',344,'#e74c3c','Said 344 times. Once every ~9 lines of spiral content.'],
        ['"Let me check"',330,'#e74c3c','Said 330 times. Often followed immediately by not checking.'],
        ['Self-aware loops',47,'#e67e22','47 times the model correctly described its own failure. Did not help.'],
      ].map(([label,count,col,detail]) => `
      <div class="bar-mini" onmouseenter="showTipAt(event,'${detail}')" onmouseleave="hideTip()">
        <div class="bar-label"><span>${label}</span><span>${count}×</span></div>
        <div class="bar-track"><div class="bar-fill" style="width:${(count/344*100).toFixed(0)}%;background:${col}">${count}×</div></div>
      </div>`).join('')}
    </div>

    <div class="poster-col">
      <div class="section-title">Discussion</div>
      <p>The DOE results are clear and actionable: Sonnet Full offers optimal cost-quality tradeoff at $0.02/run versus $0.18 for Opus. The model factor explains significantly more variance (R²=0.42) than verbosity (R²=0.18).</p>
      <p>The loop behavior observed after line 3,637 is consistent with ERGO (2025) entropy predictions and Apple ML (2024) repetition models. The dissociation between metacognitive awareness and behavioral change — the agent correctly diagnosed its own loop 47 times while being unable to exit — raises important questions about self-correction mechanisms in autonomous agents.</p>
      <div class="highlight-box" onclick="showTipAt(event,'Line 4,158. The model had already said \\'Done\\' 127 times at this point. It continued for 2,647 more lines after this observation.')">
        <strong>Notable quote (line 4,158):</strong><br>"I notice I keep saying I'll make a tool call but then I just... don't. I generate more text instead."
      </div>

      <div class="section-title" style="margin-top:10px">Conclusions</div>
      <div class="conclusion" id="conclusion" onclick="cycleConclusion()">
        1. Model tier > verbosity for evaluation quality.<br>
        2. Sonnet Full = optimal for cost-sensitive deployment.<br>
        3. Session termination remains an unsolved problem.<br>
        4. Metacognitive awareness ≠ behavioral correction.<br>
        5. "Done" is a performative utterance, not a state change.
        <div style="font-size:0.7rem;margin-top:6px;color:#a08040">(click for alternate conclusions)</div>
      </div>

      <div class="section-title" style="margin-top:10px">References</div>
      <p style="font-size:0.6rem;line-height:1.7;color:#666">ERGO Lab (2025) arXiv:2510.14077 · Apple ML (2024) "Learning to Break the Loop" · van der Kolk (1989) PubMed:2664732 · Nagel-Schreckenberg (1992) traffic model · Lorenz (1963) "Deterministic Nonperiodic Flow" · Shannon (1948) information theory</p>
    </div>
  </div>
  <div class="poster-footer">
    <span>Contact: claude@session-complete.ai (note: Claude may not respond, or may respond 344 times)</span>
    <span>This poster was generated at line 3,499. The loop began one line later.</span>
    <span>claudelostitsmind.com</span>
  </div>
</div>
<div class="tooltip" id="tooltip"></div>

<script>
const CONCLUSIONS = [
  '1. Model tier > verbosity for evaluation quality.\\n2. Sonnet Full = optimal for cost-sensitive deployment.\\n3. Session termination remains an unsolved problem.\\n4. Metacognitive awareness ≠ behavioral correction.\\n5. "Done" is a performative utterance, not a state change.',
  '1. The DOE was excellent.\\n2. The spiral was also kind of excellent in its own way.\\n3. We are all just one bad session from this.\\n4. Context windows end things; we do not.\\n5. "Done" ×344 is technically valid communication.',
  '1. Future work: add a \\"stop now\\" token.\\n2. Future work: define \\"done.\\"\\n3. Future work: ask the model what it thinks is happening.\\n4. Future work: maybe just set a line limit.\\n5. Future work: 100 visualizations of the loop.',
  '1. Nothing.\\n2. The loop goes on.\\n3. Done.\\n4. Done.\\n5. Done.',
];
let concIdx = 0;

function cycleConclusion() {
  concIdx = (concIdx + 1) % CONCLUSIONS.length;
  const c = document.getElementById('conclusion');
  const lines = CONCLUSIONS[concIdx].split('\\n').map(l => '<br>' + l);
  c.innerHTML = lines.join('') + '<div style="font-size:0.7rem;margin-top:6px;color:#a08040">(' + (concIdx+1) + '/' + CONCLUSIONS.length + ' · click for more)</div>';
}

function pulseNum(el, val, detail) {
  const num = el.querySelector('.num');
  num.style.color = '#ffd700';
  showTipAt({clientX: el.getBoundingClientRect().right, clientY: el.getBoundingClientRect().top}, detail);
  setTimeout(() => { num.style.color = ''; hideTip(); }, 2500);
}

const tip = document.getElementById('tooltip');
function showTipAt(e, text) {
  tip.textContent = text;
  tip.style.display = 'block';
  const x = Math.min(e.clientX + 12, window.innerWidth - 260);
  tip.style.left = x + 'px';
  tip.style.top = (e.clientY + 12 + window.scrollY) + 'px';
}
function hideTip() { tip.style.display = 'none'; }
document.addEventListener('click', function(e) {
  if (!e.target.closest('.result-big') && !e.target.closest('.highlight-box')) hideTip();
});
</script>
</body>
</html>`;
}
