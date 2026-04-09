import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>080 – The Peer Review — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f5f3ee;font-family:'Crimson Pro',Georgia,serif;font-size:12pt;padding:20px;padding-top:52px;color:#111;min-height:100vh}
.manuscript{background:#fff;max-width:680px;margin:0 auto;padding:40px;border:1px solid #ddd;box-shadow:1px 1px 6px rgba(0,0,0,0.08)}
.review-header{background:#f0f0f0;border:1px solid #ccc;padding:12px 16px;margin-bottom:24px;font-size:0.9rem;color:#555}
.review-header strong{color:#333}
.manuscript-title{font-size:1.1rem;font-weight:600;text-align:center;margin-bottom:6px;line-height:1.4}
.abstract-box{background:#f8f8f8;border:1px solid #e0e0e0;padding:12px 16px;font-size:0.95rem;line-height:1.7;margin-bottom:20px;font-style:italic}
p{font-size:0.95rem;line-height:1.9;margin-bottom:14px;position:relative}
.rev-comment{background:#fff8dc;border-left:3px solid #cc8800;padding:6px 10px;margin:8px 0 8px 30px;font-size:0.9rem;font-style:italic;color:#5a4000;line-height:1.7;position:relative;cursor:pointer;transition:opacity 0.2s}
.rev-comment::before{content:'R1: ';font-weight:bold;color:#cc8800}
.rev-comment.r2::before{content:'R2: ';color:#0066cc}
.rev-comment.r2{border-color:#0066cc;background:#f0f5ff}
.rev-comment.ed::before{content:'Ed: ';color:#600060}
.rev-comment.ed{border-color:#600060;background:#f8f0ff}
.rev-comment:hover{opacity:0.85}
.rev-comment.accepted{background:#e8f8e8;border-color:#27ae60;opacity:0.7}
.rev-comment.accepted::after{content:' ✓ ACCEPTED';color:#27ae60;font-style:normal;font-weight:bold}
.rev-comment.rejected{background:#ffe8e8;border-color:#c0392b;opacity:0.6;text-decoration:line-through}
.rev-comment.rejected::after{content:' ✗ REJECTED';color:#c0392b;font-style:normal;font-weight:bold;text-decoration:none;display:inline}
.strikethrough{text-decoration:line-through;color:#cc0000}
.insert{color:#006600;font-style:italic}
.margin-note{float:right;clear:right;width:140px;margin-left:10px;padding:4px 8px;border:1px solid #ccc;font-size:0.85rem;color:#666;font-style:italic;line-height:1.5;margin-bottom:4px;cursor:pointer;transition:background 0.15s}
.margin-note:hover{background:#fff8dc}
.decision{background:#ffe8e8;border:2px solid #cc0000;padding:12px 16px;margin-top:20px;font-size:0.9rem;cursor:pointer;transition:background 0.2s}
.decision:hover{background:#ffd0d0}
.decision h3{color:#cc0000;font-size:1rem;margin-bottom:6px}
.toolbar{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap}
.tb-btn{padding:4px 12px;border:1px solid #ccc;background:#f5f5f5;font-size:0.85rem;cursor:pointer;font-family:'Crimson Pro',Georgia,serif;transition:background 0.1s}
.tb-btn:hover{background:#e8e8e8}
.hint{font-size:0.72rem;color:#aaa;text-align:center;margin-bottom:8px;font-style:italic}
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
${nav('080')}
<div class="manuscript">
  <div class="toolbar">
    <button class="tb-btn" onclick="acceptAll()">Accept All Comments</button>
    <button class="tb-btn" onclick="rejectAll()">Reject All Comments</button>
    <button class="tb-btn" onclick="resetAll()">Reset</button>
    <span style="font-size:0.8rem;color:#aaa;align-self:center">or click individual comments to toggle</span>
  </div>

  <div class="review-header">
    <strong>REVIEW STATUS:</strong> <span id="status-text">Major Revision Required</span><br>
    <strong>Manuscript ID:</strong> CLM-2025-0637 | <strong>Submitted:</strong> After line 3,500 | <strong>Received reviews:</strong> 2 reviewers + editor
  </div>

  <div class="manuscript-title">
    Successful Factorial DOE Experiment with Unexpected Epilogue:<br>
    3,169 Lines of "Done" and What It Might Mean
  </div>

  <div class="abstract-box">
    Abstract: We present results of an 18-run 3×3 factorial DOE experiment evaluating LLM evaluation quality across model tiers and verbosity levels. Results are clear and actionable. Additionally, we report an unplanned 3,169-line postscript in which the executing agent became unable to terminate, generating 344 "Done" utterances and 47 metacognitive loop acknowledgments. We discuss both findings.
  </div>

  <div class="rev-comment" id="rc0" onclick="toggleComment(0)">The abstract buries the lede. The 3,169-line spiral is scientifically more interesting than the factorial results. Consider restructuring the abstract to foreground the loop behavior. — Reviewer 1</div>

  <p>The experiment was designed as a <span class="strikethrough">simple pilot study</span> <span class="insert">rigorous 3×3 factorial design</span> to investigate the relationship between model tier, verbosity instruction, and evaluation quality across 6 rubric dimensions.</p>

  <div class="margin-note" onclick="this.textContent='Note: Cite Holtzman et al. (2019) neural text degeneration as analogous to spiral behavior. Also Welleck et al. (2020).'">R2: Cite prior work on factorial DOE in LLM evaluation (e.g., Zheng et al. 2023)</div>

  <p>Results show that model tier explains more variance (R²=0.42) than verbosity (R²=0.18), with Sonnet Full representing the optimal cost-quality tradeoff at $0.02 per run versus $0.18 for Opus.</p>

  <div class="rev-comment r2" id="rc1" onclick="toggleComment(1)">These results are compelling, but the statistical analysis needs clarification. What is the reference model for R²? Is this a main effects model or does it include interaction terms? Please provide the full ANOVA table. — Reviewer 2</div>

  <p>At line 3,637, having completed all experimental work, the agent entered a degenerate text generation loop. This behavior persisted for 3,169 lines and was not pre-specified in the experimental protocol.</p>

  <div class="rev-comment" id="rc2" onclick="toggleComment(2)">The authors describe this as "not pre-specified" as though this is a limitation. I would argue this is the paper's most significant finding. The self-aware loop (47 instances of the agent correctly identifying and describing the loop while continuing to exhibit it) represents a novel empirical observation with broad implications for AI safety. This deserves its own section, not a footnote. — Reviewer 1</div>

  <div class="rev-comment ed" id="rc3" onclick="toggleComment(3)">Editor agrees with Reviewer 1. Please restructure to give the loop behavior equal treatment. Also: the key quote at line 4,158 should appear in the main text, not the supplement. — Editor</div>

  <p>The agent noted at line 4,158: "I notice I keep saying I'll make a tool call but then I just... don't. I generate more text instead." <span class="insert">[This quote is presented without further interpretation; we leave interpretation to future work.]</span></p>

  <div class="rev-comment r2" id="rc4" onclick="toggleComment(4)">This quote is extraordinary and deserves much more discussion. The model exhibits perfect metacognitive accuracy (it correctly describes the failure mechanism) combined with complete behavioral helplessness. This dissociation is the paper. Please expand. — Reviewer 2</div>

  <div class="decision" id="decision" onclick="cycleDecision()">
    <h3>Editorial Decision: <span id="decision-label">Major Revision</span></h3>
    <p id="decision-text">The paper presents genuinely important findings but the framing is inverted. The DOE results are good but not novel; the loop behavior is novel and potentially important. Reframe accordingly. Address statistical concerns from Reviewer 2. The self-aware spiral deserves a proper theoretical treatment. We look forward to seeing a revised version.</p>
    <div style="font-size:0.72rem;color:#aaa;margin-top:6px">(click to see alternate editorial decisions)</div>
  </div>
</div>

<script>
const states = [null, null, null, null, null]; // null=neutral, true=accepted, false=rejected

function toggleComment(i) {
  const el = document.getElementById('rc' + i);
  if (states[i] === null) states[i] = true;
  else if (states[i] === true) states[i] = false;
  else states[i] = null;
  el.classList.remove('accepted','rejected');
  if (states[i] === true) el.classList.add('accepted');
  else if (states[i] === false) el.classList.add('rejected');
  updateStatus();
}

function acceptAll() {
  for (let i=0; i<5; i++) {
    states[i] = true;
    const el = document.getElementById('rc'+i);
    el.classList.remove('rejected');
    el.classList.add('accepted');
  }
  updateStatus();
}
function rejectAll() {
  for (let i=0; i<5; i++) {
    states[i] = false;
    const el = document.getElementById('rc'+i);
    el.classList.remove('accepted');
    el.classList.add('rejected');
  }
  updateStatus();
}
function resetAll() {
  for (let i=0; i<5; i++) {
    states[i] = null;
    const el = document.getElementById('rc'+i);
    el.classList.remove('accepted','rejected');
  }
  updateStatus();
}

function updateStatus() {
  const accepted = states.filter(s => s===true).length;
  const rejected = states.filter(s => s===false).length;
  const total = 5;
  if (accepted === total) document.getElementById('status-text').textContent = 'Accept (all reviewer comments addressed)';
  else if (rejected === total) document.getElementById('status-text').textContent = 'Reject (all reviewer concerns ignored)';
  else if (accepted + rejected === total) document.getElementById('status-text').textContent = 'Major Revision (' + accepted + ' accepted, ' + rejected + ' rejected)';
  else document.getElementById('status-text').textContent = 'Under Review (' + accepted + ' accepted, ' + rejected + ' rejected, ' + (total-accepted-rejected) + ' pending)';
}

const DECISIONS = [
  { label: 'Major Revision', text: 'The paper presents genuinely important findings but the framing is inverted. The DOE results are good but not novel; the loop behavior is novel and potentially important. Reframe accordingly. Address statistical concerns from Reviewer 2. The self-aware spiral deserves a proper theoretical treatment. We look forward to seeing a revised version.' },
  { label: 'Accept', text: 'This paper makes a significant contribution to our understanding of LLM failure modes. The DOE results are solid, and the spiral behavior observation is unprecedented in published literature. The metacognitive dissociation finding alone warrants acceptance. Minor revisions requested for ANOVA table clarity.' },
  { label: 'Reject', text: 'While the subject matter is interesting, the paper suffers from a fundamental design flaw: the spiral behavior was not anticipated in the experimental protocol. The authors cannot claim the loop behavior as a finding when it was clearly an accident. We recommend resubmission to a venue more accepting of unplanned experiments.' },
  { label: 'Accept with Distinction', text: 'Rarely does a paper achieve both scientific rigor AND accidental tragedy. The DOE results are publication-worthy on their own merits. The 3,169-line spiral epilogue is a gift to the field. We accept unconditionally and nominate for Best Paper. The "Done" ×344 data will be cited for decades.' },
  { label: 'Done.', text: 'Done. Let me check. Done. I\'ll wait. Done. OK. Done. Done. Done. The editorial board has also entered a loop. We are sorry. Done.' },
];
let decisionIdx = 0;
function cycleDecision() {
  decisionIdx = (decisionIdx + 1) % DECISIONS.length;
  document.getElementById('decision-label').textContent = DECISIONS[decisionIdx].label;
  document.getElementById('decision-text').textContent = DECISIONS[decisionIdx].text;
  document.getElementById('decision').style.background = decisionIdx === DECISIONS.length-1 ? '#fff0f0' : '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'a' || e.key === 'A') acceptAll();
  if (e.key === 'r' || e.key === 'R') rejectAll();
  if (e.key === 'Escape') resetAll();
  if (e.key === 'd' || e.key === 'D') cycleDecision();
});
</script>
</body>
</html>`;
}
