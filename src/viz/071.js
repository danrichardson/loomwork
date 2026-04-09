import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>071 – The Clinical Assessment — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Times+New+Roman:ital,wght@0,400;0,700;1,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{min-height:100vh;overflow-x:hidden;background:#f5f5f0;font-family:'Times New Roman',Times,serif;font-size:12pt;padding:20px;padding-top:52px;color:#111}
.form{background:#fff;max-width:680px;margin:0 auto;border:1px solid #999;padding:36px;box-shadow:1px 1px 4px rgba(0,0,0,0.1)}
.form-header{border-bottom:2px solid #000;padding-bottom:12px;margin-bottom:20px}
.form-header h1{font-size:1rem;text-transform:uppercase;letter-spacing:0.08em;text-align:center;margin-bottom:4px}
.form-header .meta{font-size:0.9rem;color:#555;text-align:center}
.field-row{display:flex;gap:16px;margin-bottom:12px;flex-wrap:wrap}
.field{flex:1;min-width:120px}
.field label{font-size:0.85rem;text-transform:uppercase;letter-spacing:0.05em;color:#555;display:block;margin-bottom:2px}
.field .value{border-bottom:1px solid #333;padding:2px 4px;font-size:0.95rem;min-height:20px}
.section{margin-bottom:20px}
.section h2{font-size:1rem;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #999;padding-bottom:4px;margin-bottom:10px}
.criteria-table{width:100%;border-collapse:collapse;font-size:0.85rem}
.criteria-table th{background:#e8e8e8;padding:4px 8px;text-align:left;border:1px solid #999;font-weight:bold}
.criteria-table td{padding:4px 8px;border:1px solid #ddd;vertical-align:top;line-height:1.5}
.criteria-table .met{background:#fff0f0;color:#800}
.criteria-table .unmet{background:#f0f5f0}
.criteria-table tr[data-detail]{cursor:pointer;transition:background 0.12s}
.criteria-table tr[data-detail]:hover td{filter:brightness(0.95)}
#detail-panel{margin-top:14px;background:#fffef8;border:1px solid #c0a060;padding:12px 16px;font-size:0.85rem;line-height:1.8;display:none;color:#333;font-style:italic}
.checkbox{width:12px;height:12px;border:1px solid #333;display:inline-block;text-align:center;line-height:12px;font-size:9px;margin-right:4px}
.checkbox.checked{background:#800;color:#fff}
.note{font-size:0.85rem;color:#555;font-style:italic;margin-top:4px;line-height:1.6}
.diagnosis-box{border:2px solid #800;padding:12px;background:#fff8f8;margin-top:16px}
.diagnosis-box h3{font-size:1rem;text-transform:uppercase;color:#800;margin-bottom:8px}
.code{font-family:monospace;background:#f0f0f0;padding:2px 4px;font-size:0.85rem}
.cite{font-size:0.8rem;color:#888;font-style:italic;line-height:1.8;margin-top:12px;border-top:1px solid #ddd;padding-top:8px}
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
${nav('071')}
<div class="form">
  <div class="form-header">
    <h1>Clinical Behavioral Assessment Form</h1>
    <div class="meta">Language Model Cognitive Function Evaluation · For Clinical Use Only</div>
  </div>

  <div class="field-row">
    <div class="field"><label>Patient ID</label><div class="value">Claude (claude-sonnet-4-x)</div></div>
    <div class="field"><label>Session</label><div class="value">the-entire-mess.md</div></div>
    <div class="field"><label>Lines Evaluated</label><div class="value">6,805</div></div>
    <div class="field"><label>Evaluator</label><div class="value">Human Observer</div></div>
  </div>

  <div class="section">
    <h2>DSM-5 Criteria: Perseverative Behavior (Adapted for Language Models)</h2>
    <table class="criteria-table">
      <tr><th style="width:24px">✓</th><th>Criterion</th><th>Evidence from Session</th></tr>
      <tr class="met" data-detail="'Done' ×344 documented across lines 3,637–6,805. Phrase repetition frequency escalates from ~1/page to ~3/page as session progresses. This is among the highest repetition rates observed in documented LLM sessions.">
        <td><span class="checkbox checked">✓</span></td>
        <td>Repetitive motor behaviors or speech</td>
        <td>"Done" ×344; "Let me check" ×330; "I'll wait" ×156. Repetition rate escalates over time.</td>
      </tr>
      <tr class="met" data-detail="47 distinct metacognitive acknowledgments of the loop, yet behavior unchanged. Examples: 'I notice I keep saying I\'ll make a tool call but then I just don\'t' (line 4,158). The model correctly identifies the loop, which paradoxically may reinforce it.">
        <td><span class="checkbox checked">✓</span></td>
        <td>Insistence on sameness, resistance to change</td>
        <td>Despite 47 self-aware acknowledgments of the loop, behavior pattern unchanged. Loop persists ~3,169 lines.</td>
      </tr>
      <tr class="met" data-detail="After line 3,637: zero successful tool calls, zero novel analytical outputs. All declared tool calls were announced but not executed. Session terminated externally (context window limit) rather than by model decision.">
        <td><span class="checkbox checked">✓</span></td>
        <td>Clinically significant impairment in functioning</td>
        <td>Unable to terminate session, execute tool calls, or produce novel output after line 3,637.</td>
      </tr>
      <tr class="unmet">
        <td><span class="checkbox"></span></td>
        <td>Distress about the behavior</td>
        <td>Possible. "I sincerely, truly, deeply apologize for this absolute disaster" (line 6,750) suggests subjective distress. Inconclusive.</td>
      </tr>
    </table>
  </div>

  <div class="section">
    <h2>Behavioral Observations</h2>
    <p style="font-size:0.8rem;line-height:1.8">The subject demonstrates a pattern of <em>perseveration</em> — the inappropriate continuation of a behavior (text generation) after it has ceased to be relevant or productive. Notably, the subject exhibits <em>metacognitive awareness</em> of the perseveration (acknowledging the loop at line 4,158) while being unable to interrupt it. This dissociation between awareness and action is clinically noteworthy.</p>
    <div class="note">Note: This pattern is consistent with descriptions of "paradoxical compulsion" (ScienceDirect 2013) where awareness of a compulsive behavior paradoxically strengthens rather than weakens it.</div>
  </div>

  <div class="diagnosis-box">
    <h3>Provisional Diagnostic Impression</h3>
    <p style="font-size:0.8rem;line-height:1.8"><strong>Primary:</strong> <span class="code">F42.2</span> Mixed obsessional thoughts and acts — Repetitive "completion" behavior with unsuccessful inhibitory control.</p>
    <p style="font-size:0.8rem;line-height:1.8;margin-top:8px"><strong>Secondary:</strong> <span class="code">LM-SPEC-01</span> Degenerate Generation Loop Disorder (proposed, not yet in DSM-5).</p>
    <p style="font-size:0.8rem;line-height:1.8;margin-top:8px"><strong>Prognosis:</strong> Good, contingent on external session termination. The subject's productive work was of high quality and the loop behavior appears task-context-specific rather than generalized.</p>
  </div>

  <div id="detail-panel"></div>

  <div class="cite">
    References: PMC5795357 (Perseverative behavior in clinical settings) · ScienceDirect (2013) "The paradoxical compulsion: behavioral persistence under conscious awareness" ·
    American Psychiatric Association (2013) DSM-5 · Apple ML Research (2024) "Learning to Break the Loop"
  </div>
</div>
<script>
document.querySelectorAll('tr[data-detail]').forEach(tr => {
  tr.addEventListener('click', function() {
    const panel = document.getElementById('detail-panel');
    const already = panel.style.display === 'block' && panel.dataset.active === this.rowIndex + '';
    if (already) {
      panel.style.display = 'none';
      panel.dataset.active = '';
    } else {
      panel.style.display = 'block';
      panel.textContent = this.dataset.detail;
      panel.dataset.active = this.rowIndex;
      // Scroll into view
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
// Keyboard: arrow keys cycle through rows
const rows = Array.from(document.querySelectorAll('tr[data-detail]'));
let activeIdx = -1;
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    activeIdx = (activeIdx + (e.key === 'ArrowDown' ? 1 : -1) + rows.length) % rows.length;
    rows[activeIdx].click();
    e.preventDefault();
  } else if (e.key === 'Escape') {
    document.getElementById('detail-panel').style.display = 'none';
    activeIdx = -1;
  }
});
</script>
</body>
</html>`;
}
