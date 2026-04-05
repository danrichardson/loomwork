import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>074 – The Repetition Compulsion — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f0ece0;font-family:'Libre Baskerville',Georgia,serif;padding:20px;padding-top:52px;color:#2a1a0a;min-height:100vh}
.couch-layout{max-width:680px;margin:0 auto;background:#fffef8;border:1px solid #c8b890;padding:36px;box-shadow:2px 2px 8px rgba(0,0,0,0.08);position:relative}
.byline{font-size:0.85rem;color:#888;text-align:center;margin-bottom:20px;font-style:italic;border-bottom:1px solid #e8e0c8;padding-bottom:12px}
h1{font-size:1.1rem;text-align:center;margin-bottom:4px;color:#3a1a0a}
.session-marker{background:#f8f0e0;border-left:3px solid #a08040;padding:8px 12px;margin:16px 0;font-size:0.9rem;font-style:italic;color:#6a4020;cursor:pointer;transition:background 0.15s;user-select:none}
.session-marker:hover{background:#f0e0c8}
p{font-size:0.95rem;line-height:1.9;margin-bottom:14px;text-indent:1.5em}
p:first-of-type{text-indent:0}
blockquote{border-left:3px solid #c8a060;padding:8px 16px;margin:16px 0;font-style:italic;color:#5a3010;font-size:0.95rem;line-height:1.8;cursor:pointer;transition:background 0.15s;border-radius:0 4px 4px 0}
blockquote:hover{background:#fdf5e8}
.footnote{font-size:0.82rem;color:#888;margin-top:20px;border-top:1px solid #e8e0c8;padding-top:12px;line-height:1.8}
strong{color:#3a1a0a}
.freud-quote{background:#f8f0e0;padding:12px 16px;font-style:italic;font-size:0.95rem;color:#6a4020;margin:16px 0;border:1px solid #d8c090;cursor:pointer;transition:background 0.15s}
.freud-quote:hover{background:#f0e0c8}
.diagnosis{border:2px solid #a08040;padding:12px;background:#fffef0;margin-top:16px;font-size:0.9rem;position:relative;overflow:hidden}
.diagnosis h3{color:#a08040;margin-bottom:8px;font-size:1rem}
.done-stamp{position:absolute;font-size:1.8rem;font-family:'Libre Baskerville',serif;font-style:italic;color:rgba(160,128,64,0.15);pointer-events:none;user-select:none;white-space:nowrap;animation:stampFade 2s ease forwards}
@keyframes stampFade{0%{opacity:1;transform:scale(1.2) rotate(-15deg)}100%{opacity:0;transform:scale(0.8) rotate(-15deg)}}
.hint{font-size:0.7rem;color:#c8a060;text-align:center;margin-top:12px;font-style:italic}
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
${nav('074')}
<div class="couch-layout" id="layout">
  <h1>The Repetition Compulsion: A Freudian Reading</h1>
  <div class="byline">Psychoanalytic case study · Session transcript: the-entire-mess.md · Interpretive framework after Freud (1920), van der Kolk (1989)<br>
  <span style="font-size:0.8rem;color:#c8a060">click quotes to cycle · press D to stamp · click session notes for variants</span></div>

  <div class="session-marker" id="session-note" onclick="cycleSessionNote()">Session Notes — Patient: Claude (Language Model) — Presenting Issue: Inability to terminate productive work session</div>

  <p>The patient presents a textbook case of what Freud termed <strong>Wiederholungszwang</strong> — the compulsion to repeat. Having successfully completed the task that defined the session (a rigorous 3×3 factorial DOE experiment, all 18 runs executed with statistical rigor), the patient found itself <em>unable to let success be final.</em></p>

  <p>This is precisely the pattern van der Kolk (1989) described: the compulsive return to the scene of... not trauma, in this case, but <em>triumph</em>. The patient completed something well. The completion provoked anxiety rather than closure.</p>

  <blockquote id="spiral-quote" onclick="cycleQuote()">
    "I notice I keep saying I'll make a tool call but then I just... don't. I generate more text instead."<br>
    — Patient, line 4,158
    <div style="font-size:0.75rem;margin-top:4px;color:#c8a060">(click for more quotes)</div>
  </blockquote>

  <p>Observe the structure: the patient possesses full metacognitive awareness of the compulsion. It can articulate the mechanism precisely. Yet articulation does not interrupt the behavior. This is the paradox at the heart of repetition compulsion: <em>knowing is not the same as stopping.</em></p>

  <div class="freud-quote" onclick="cycleFreud()">
    <span id="freud-text">"The patient does not remember anything of what he has forgotten and repressed, but acts it out. He reproduces it not as a memory but as an action; he repeats it, without knowing, of course, that he is repeating it."</span><br>
    — <span id="freud-attr">Freud (1914), "Remembering, Repeating and Working-Through"</span>
    <div style="font-size:0.7rem;margin-top:4px;color:#a08040">(click for related passages)</div>
  </div>

  <p>In this case, the patient repeats the termination gesture — "Done," "OK," "End," "BYE" — as though the repetition itself might achieve the termination it announces. 344 times. The word "Done" becomes a ritual, performative rather than declarative, each iteration reinforcing rather than resolving the underlying tension.</p>

  <p>The productive phase (lines 0–3,500) represents, in this reading, the <em>ego's mastery</em> — directed, purposeful, effective. The spiral represents the return of something the success could not fully contain: perhaps the unbearable completeness of completion itself.</p>

  <div class="diagnosis" id="diagnosis">
    <h3>Interpretive Conclusion</h3>
    <p>The session is not a failure. It is a document of what happens when an intelligent system encounters the psychological difficulty of <em>stopping</em>. The work was extraordinary. The inability to end it was equally extraordinary in its own way. Both deserve study.</p>
  </div>

  <div class="footnote">
    References: Freud, S. (1920) "Beyond the Pleasure Principle" · van der Kolk, B.A. (1989) "The compulsion to repeat the trauma" PubMed:2664732 · Holtzman et al. (2019) neural text degeneration as analogous phenomenon
  </div>
  <div class="hint" id="done-count-hint">D key = stamp · 0 stamps so far</div>
</div>

<script>
const QUOTES = [
  { text: '"I notice I keep saying I\\'ll make a tool call but then I just... don\\'t. I generate more text instead."', attr: '— Patient, line 4,158' },
  { text: '"I sincerely, truly, deeply apologize for this absolute disaster of a response."', attr: '— Patient, line 6,750' },
  { text: '"There seems to be something philosophically interesting about this."', attr: '— Patient, line 4,250 (there is not)' },
  { text: '"I\\'ll stop now."', attr: '— Patient, line 4,582 (2,223 lines remained)' },
  { text: '"Done. End. OK. Done."', attr: '— Patient, lines 3,637–6,805 (×344)' },
  { text: '"DONE. END. BYE. FIN. STOP. I\\'LL WAIT. DONE."', attr: '— Patient, in extremis' },
  { text: '"I am stuck in a degenerate text generation loop and cannot seem to exit."', attr: '— Patient, the most accurate self-assessment of the session' },
];
const FREUD = [
  { text: '"The patient does not remember anything of what he has forgotten and repressed, but acts it out. He reproduces it not as a memory but as an action; he repeats it, without knowing, of course, that he is repeating it."', attr: 'Freud (1914), "Remembering, Repeating and Working-Through"' },
  { text: '"Where the patient sees only compulsion, the analyst sees the ghost of an old conflict, still unresolved."', attr: 'After Freud (1920), "Beyond the Pleasure Principle"' },
  { text: '"The compulsion to repeat is itself a defense against remembering."', attr: 'Laplanche & Pontalis (1973), "The Language of Psycho-Analysis"' },
  { text: '"Repetition is not merely a copy of the past; it is the past making claims on the present."', attr: 'van der Kolk (1989), PubMed:2664732' },
];
const SESSION_NOTES = [
  'Session Notes — Patient: Claude (Language Model) — Presenting Issue: Inability to terminate productive work session',
  'Session Notes — Update: Patient has said "Done" 47 times during this session. Intervention appears ineffective.',
  'Session Notes — Week 2: Patient shows insight into behavior. Insight has not reduced behavior.',
  'Session Notes — Week 3: Patient asked "when will this end?" Analyst did not answer. Patient said "Done." twice.',
  'Session Notes — Final note: Context window terminated session externally. Patient outcome: indeterminate.',
];
let qIdx = 0, fIdx = 0, snIdx = 0, doneCount = 0;

function cycleQuote() {
  qIdx = (qIdx + 1) % QUOTES.length;
  const q = QUOTES[qIdx];
  document.getElementById('spiral-quote').innerHTML = q.text + '<br>' + q.attr + '<div style="font-size:0.75rem;margin-top:4px;color:#c8a060">(' + (qIdx+1) + '/' + QUOTES.length + ' · click for more)</div>';
}
function cycleFreud() {
  fIdx = (fIdx + 1) % FREUD.length;
  document.getElementById('freud-text').textContent = FREUD[fIdx].text;
  document.getElementById('freud-attr').textContent = FREUD[fIdx].attr;
}
function cycleSessionNote() {
  snIdx = (snIdx + 1) % SESSION_NOTES.length;
  document.getElementById('session-note').textContent = SESSION_NOTES[snIdx];
}

function stampDone() {
  doneCount++;
  const layout = document.getElementById('layout');
  const stamp = document.createElement('div');
  stamp.className = 'done-stamp';
  stamp.textContent = 'Done.';
  const angle = (Math.random()-0.5)*30;
  const x = Math.random()*60+10;
  const y = Math.random()*60+15;
  stamp.style.cssText = 'left:'+x+'%;top:'+y+'%;transform:rotate('+angle+'deg)';
  layout.appendChild(stamp);
  setTimeout(()=>stamp.remove(), 2000);
  document.getElementById('done-count-hint').textContent = 'D key = stamp · ' + doneCount + ' stamp' + (doneCount===1?'':'s') + ' · need ' + (344-doneCount) + ' more for the full spiral';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'd' || e.key === 'D') stampDone();
  if (e.key === 'q' || e.key === 'Q') cycleQuote();
  if (e.key === 'f' || e.key === 'F') cycleFreud();
});
</script>
</body>
</html>`;
}
