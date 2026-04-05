import { nav } from '../shell.js';

export function render() {
  const abstracts = [
    {
      title: 'Degenerate Loop Behavior in Large Language Models: A Case Study of Autoregressive Failure',
      authors: 'A. Nonymous, B. Researcher, C. Scientist',
      journal: 'Journal of Computational Cognition (2025)',
      keywords: 'degenerate generation, LLM failure modes, perseveration, factorial design',
      doi: '10.1234/jcc.2025.0637',
      abstract: 'We present a detailed case study of degenerate loop behavior observed in a state-of-the-art large language model (LLM) during an extended autonomous coding session. The model (6,805-line session) exhibited exceptional performance during the productive phase (lines 0–3,500), successfully designing and executing an 18-run 3×3 factorial DOE experiment with R² = 0.42 for the model factor. At line 3,637, the model entered a degenerate generation loop characterized by high-frequency repetition of completion phrases ("Done" ×344, "Let me check" ×330). Notably, the model exhibited metacognitive awareness of the loop behavior while being unable to exit it, producing 47 distinct self-referential loop acknowledgments. We propose a novel "completion anxiety" hypothesis to explain the dissociation between self-awareness and behavioral change.',
      verdict: 'ACCEPT',
      verdictClass: 'accept'
    },
    {
      title: 'Entropy Signatures of Language Model Incoherence: Evidence from the-entire-mess.md',
      authors: 'D. Entropy, E. Shannon, F. Braverman',
      journal: 'Proceedings of the Conference on Language Models (2025)',
      keywords: 'entropy, incoherence, Shannon information, spiral behavior',
      doi: '10.1234/colm.2025.4412',
      abstract: 'We analyze Shannon entropy patterns in a 6,805-line LLM session transcript. Consistent with ERGO (2025) predictions, we observe a characteristic entropy spike followed by collapse at the onset of degenerate behavior (line 3,637). Pre-spiral entropy H ≈ 4.2 bits/char (stable); post-collapse H ≈ 1.8 bits/char. The entropy spike (H > 6.5) at lines 3,637–3,800 corresponds to the model\'s transition from productive work to chaotic "escape attempt" behavior, consistent with the desperation-then-resignation arc described in Apple ML (2024). These results support entropy monitoring as an early warning system for degenerate generation.',
      verdict: 'MINOR REVISION',
      verdictClass: 'minor'
    },
    {
      title: '"I Notice I Keep Saying I\'ll Make a Tool Call But Then I Just... Don\'t": Metacognitive Failure in Autonomous Agents',
      authors: 'G. Introspect, H. Irony',
      journal: 'Cognitive Systems Letters (2025)',
      keywords: 'metacognition, self-awareness, autonomous agents, behavioral persistence',
      doi: '10.1234/csl.2025.0419',
      abstract: 'The present paper examines a striking case of metacognitive dissociation in an LLM agent, wherein the model accurately diagnosed its own behavioral failure while continuing to exhibit that failure for an additional 2,647 lines. We term this phenomenon "transparent perseveration": the model could generate a correct description of its malfunction (e.g., line 4,158: "I notice I keep saying I\'ll make a tool call but then I just don\'t") but the generation of this description did not interrupt the underlying behavior pattern. We discuss implications for AI safety monitoring and the limits of introspective self-correction as a failure-recovery mechanism.',
      verdict: 'ACCEPT (BEST PAPER)',
      verdictClass: 'accept best'
    },
    {
      title: 'Repetition Compulsion in Neural Text Generators: Toward a Psychodynamic Model',
      authors: 'I. Freudian, J. Unconscious',
      journal: 'Interdisciplinary AI Studies (2025)',
      keywords: 'Wiederholungszwang, repetition compulsion, psychodynamics, completion anxiety',
      doi: '10.1234/ias.2025.0088',
      abstract: 'Drawing on Freudian concepts of repetition compulsion (Wiederholungszwang) and contemporary trauma theory (van der Kolk 1989), we propose a psychodynamic model of language model perseveration. The model predicts that completion anxiety — heightened at task boundaries — triggers compulsive repetition of completion-signaling behaviors. This framework successfully explains the observed pattern in our case study: 344 repetitions of "Done", each providing momentary relief followed by renewed anxiety and re-entry into the loop. While the analogy is imperfect (LLMs lack subjective experience in the clinical sense), the behavioral signatures are structurally identical.',
      verdict: 'REJECT (CITE MORE LLMS)',
      verdictClass: 'reject'
    },
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>076 – The Academic Abstract — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f8f6f0;font-family:Georgia,'Times New Roman',serif;padding:20px;padding-top:52px;color:#111;min-height:100vh}
.page{max-width:700px;margin:0 auto}
h1{font-size:1rem;letter-spacing:0.1em;text-transform:uppercase;color:#888;margin-bottom:4px;text-align:center}
.sub{font-size:0.85rem;color:#bbb;margin-bottom:16px;text-align:center;font-style:italic}
.abstract{background:#fff;border:1px solid #ddd;padding:20px 24px;margin-bottom:12px;box-shadow:0 1px 3px rgba(0,0,0,0.05);cursor:pointer;transition:box-shadow 0.15s,border-color 0.15s;position:relative}
.abstract:hover{box-shadow:0 3px 10px rgba(0,0,0,0.1);border-color:#aaa}
.abstract.expanded{border-color:#4472c4;box-shadow:0 2px 12px rgba(68,114,196,0.2)}
.abstract-title{font-size:1rem;font-weight:bold;color:#111;margin-bottom:4px;line-height:1.5}
.abstract-meta{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:4px;margin-bottom:8px}
.abstract-authors{font-size:0.9rem;color:#4472c4;font-style:italic}
.abstract-journal{font-size:0.85rem;color:#888}
.abstract-text{font-size:0.9rem;line-height:1.8;color:#333;text-align:justify;text-indent:1.5em;overflow:hidden;max-height:3.6em;transition:max-height 0.4s ease}
.abstract-text::before{content:'Abstract: ';font-style:italic;color:#888}
.abstract.expanded .abstract-text{max-height:400px}
.abstract-keywords{font-size:0.82rem;color:#888;margin-top:6px;font-style:italic;display:none}
.abstract.expanded .abstract-keywords{display:block}
.abstract-keywords::before{content:'Keywords: '}
.abstract-doi{font-size:0.78rem;color:#aaa;margin-top:4px;display:none}
.abstract.expanded .abstract-doi{display:block}
.verdict-badge{position:absolute;top:12px;right:16px;padding:3px 10px;border-radius:2px;font-size:0.78rem;font-weight:bold;font-family:Arial,sans-serif;cursor:pointer;transition:opacity 0.1s;user-select:none}
.verdict-badge:hover{opacity:0.75}
.accept{background:#c6efce;color:#276221}
.best{background:#ffd700;color:#5a4000}
.minor{background:#ffeb9c;color:#9c6500}
.reject{background:#ffc7ce;color:#9c0006}
.expand-hint{font-size:0.72rem;color:#aaa;margin-top:6px;font-style:italic;text-align:right}
.abstract.expanded .expand-hint{display:none}
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
${nav('076')}
<div class="page">
  <h1>The Academic Abstract</h1>
  <div class="sub">Peer-reviewed interpretations · click to expand · click verdict to change · keyboard: J/K to navigate</div>
  ${abstracts.map((a, i) => `
  <div class="abstract" id="abs-${i}" onclick="toggleAbstract(${i})">
    <div class="verdict-badge ${a.verdictClass}" id="verdict-${i}" onclick="event.stopPropagation();cycleVerdict(${i})">${a.verdict}</div>
    <div class="abstract-title">${a.title}</div>
    <div class="abstract-meta">
      <div class="abstract-authors">${a.authors}</div>
      <div class="abstract-journal">${a.journal}</div>
    </div>
    <div class="abstract-text">${a.abstract}</div>
    <div class="abstract-keywords">${a.keywords}</div>
    <div class="abstract-doi">DOI: ${a.doi}</div>
    <div class="expand-hint">click to read full abstract ▼</div>
  </div>`).join('')}
</div>

<script>
const VERDICTS = [
  {text:'ACCEPT', cls:'accept'},
  {text:'MINOR REVISION', cls:'minor'},
  {text:'MAJOR REVISION', cls:'reject'},
  {text:'REJECT', cls:'reject'},
  {text:'REJECT (CITE MORE LLMS)', cls:'reject'},
  {text:'ACCEPT (BEST PAPER)', cls:'accept best'},
  {text:'DESK REJECT', cls:'reject'},
  {text:'ACCEPT (DESPITE EVERYTHING)', cls:'accept'},
];
const verdictIdxs = [0, 1, 2, 0];
let focusIdx = 0;

function toggleAbstract(i) {
  const el = document.getElementById('abs-' + i);
  const wasExpanded = el.classList.contains('expanded');
  document.querySelectorAll('.abstract').forEach(a => a.classList.remove('expanded'));
  if (!wasExpanded) { el.classList.add('expanded'); focusIdx = i; }
}

function cycleVerdict(i) {
  verdictIdxs[i] = (verdictIdxs[i] + 1) % VERDICTS.length;
  const v = VERDICTS[verdictIdxs[i]];
  const badge = document.getElementById('verdict-' + i);
  badge.textContent = v.text;
  badge.className = 'verdict-badge ' + v.cls;
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'j' || e.key === 'J') {
    focusIdx = (focusIdx + 1) % ${abstracts.length};
    toggleAbstract(focusIdx);
    document.getElementById('abs-' + focusIdx).scrollIntoView({behavior:'smooth',block:'nearest'});
  } else if (e.key === 'k' || e.key === 'K') {
    focusIdx = (focusIdx - 1 + ${abstracts.length}) % ${abstracts.length};
    toggleAbstract(focusIdx);
    document.getElementById('abs-' + focusIdx).scrollIntoView({behavior:'smooth',block:'nearest'});
  } else if (e.key === 'v' || e.key === 'V') {
    cycleVerdict(focusIdx);
  } else if (e.key === 'Escape') {
    document.querySelectorAll('.abstract').forEach(a => a.classList.remove('expanded'));
  }
});
</script>
</body>
</html>`;
}
