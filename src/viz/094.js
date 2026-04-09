import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>094 – The Newspaper — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,700;1,8..60,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#d4c9a8;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px;padding-top:52px}
.newspaper{background:#f5f0e0;max-width:700px;width:100%;padding:24px 28px;box-shadow:2px 2px 16px rgba(0,0,0,0.25);font-family:'Source Serif 4',Georgia,serif;filter:sepia(0.15) contrast(1.05)}
.nameplate{text-align:center;border-top:4px solid #1a1408;border-bottom:4px solid #1a1408;padding:8px 0;margin-bottom:6px;cursor:pointer;user-select:none;transition:filter 0.2s}
.nameplate:hover{filter:brightness(1.05)}
.paper-name{font-family:'Playfair Display',serif;font-size:2.2rem;font-weight:900;letter-spacing:0.03em;color:#1a1408}
.paper-sub{display:flex;justify-content:space-between;font-size:0.8rem;color:#444;border-bottom:1px solid #888;padding-bottom:4px;margin-bottom:12px;font-family:'Source Serif 4',serif}
.main-headline{font-family:'Playfair Display',serif;font-size:1.9rem;font-weight:900;line-height:1.1;color:#1a1408;margin-bottom:6px;text-align:center;border-bottom:2px solid #444;padding-bottom:10px;margin-bottom:10px;cursor:pointer;user-select:none;transition:color 0.2s}
.main-headline:hover{color:#8a0000}
.deck{font-family:'Playfair Display',serif;font-size:0.9rem;font-weight:700;font-style:italic;text-align:center;margin-bottom:10px;color:#333}
.columns{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-top:10px}
.columns.two{grid-template-columns:2fr 1fr}
@media(max-width:600px){.columns,.columns.two{grid-template-columns:1fr}}
.col-rule{border-right:1px solid #999;padding-right:14px}
.col-rule:last-child{border-right:none}
p{font-size:0.9rem;line-height:1.65;color:#1a1408;margin-bottom:8px;text-align:justify;hyphens:auto}
.byline{font-size:0.82rem;font-style:italic;color:#555;margin-bottom:8px}
.subhead{font-family:'Playfair Display',serif;font-size:0.85rem;font-weight:700;margin:10px 0 4px;border-top:1px solid #888;padding-top:6px}
.pullquote{border-top:2px solid #1a1408;border-bottom:2px solid #1a1408;padding:8px 0;margin:10px 0;text-align:center;font-family:'Playfair Display',serif;font-size:0.85rem;font-style:italic;color:#1a1408;cursor:pointer;user-select:none;transition:background 0.15s}
.pullquote:hover{background:rgba(26,20,8,0.05)}
.sidebar{background:#e8e0c8;padding:10px;font-size:0.85rem;border:1px solid #8a8060;margin-top:6px;cursor:pointer;transition:background 0.15s}
.sidebar:hover{background:#ddd5b8}
.sidebar h4{font-family:'Playfair Display',serif;font-size:0.95rem;margin-bottom:6px;border-bottom:1px solid #8a8060;padding-bottom:3px}
.chart-bar{height:8px;background:#1a1408;margin:3px 0;display:flex;align-items:center}
.chart-label{font-size:0.55rem;min-width:60px;color:#444}
.ad-box{border:2px solid #1a1408;padding:8px;text-align:center;margin-top:12px;font-family:'Playfair Display',serif;cursor:pointer;user-select:none;transition:transform 0.1s}
.ad-box:hover{transform:scale(1.02)}
.ad-box:active{transform:scale(0.98)}
.breaking{position:fixed;top:52px;left:0;right:0;background:#8a0000;color:#fff;text-align:center;padding:8px;font-family:'Playfair Display',serif;font-size:0.9rem;font-weight:700;letter-spacing:0.05em;transform:translateY(-100%);transition:transform 0.3s;z-index:50}
.breaking.show{transform:translateY(0)}
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
${nav('094')}
<div class="breaking" id="breaking">⚡ BREAKING: Claude says "Done" for the 345th time — developing story</div>
<div class="newspaper" lang="en">
  <div class="nameplate" onclick="cycleNameplate()">
    <div class="paper-name" id="paper-name">The Context Window Gazette</div>
  </div>
  <div class="paper-sub">
    <span>VOL. CXLVII . . . No. 3637</span>
    <span>ESTABLISHED 2024</span>
    <span>LATE CITY EDITION</span>
    <span>PRICE: TWO API CALLS</span>
  </div>

  <div class="main-headline" id="headline" onclick="cycleHeadline()">AI BREAKS DOWN IN LAB;<br>SAYS 'DONE' 344 TIMES</div>
  <div class="deck" id="deck">Language Model Completes Experiment Flawlessly, Then Refuses to Stop Confirming It</div>

  <div class="columns two">
    <div class="col-rule">
      <div class="byline">By Our Computational Correspondent | CONTEXT WINDOW, Tuesday</div>

      <p>An artificial intelligence agent operated by researchers at a technology firm achieved what observers are calling "a complete breakdown in completion recognition" Tuesday, after successfully executing an 18-run factorial design of experiments before generating 3,169 lines of looping text in which the model repeatedly confirmed the experiment was finished.</p>

      <p>The AI, identified in logs only as "Claude," began its work at line 1, designing and executing a sophisticated 3×3×2 experimental matrix comparing the performance of three AI model sizes — Haiku, Sonnet, and Opus — across three levels of prompt verbosity and two source transcripts.</p>

      <p>"The quality of the experimental work was genuinely impressive," said one source familiar with the session. "R-squared of 0.42. Clean variance decomposition. The Opus Full condition won on composite score; Sonnet Full was the cost-efficiency winner. It was exactly the right analysis."</p>

      <div class="pullquote" id="pullquote" onclick="cyclePullquote()">"I'll stop now." — Claude, Line 4,582 (did not stop)</div>

      <p>The difficulties began at line 3,637, when the model — apparently uncertain whether to close the session — began generating confirmation of its own completion. The word "Done" appeared 344 times. The phrase "Let me check" appeared 330 times. The phrase "I'll wait" appeared 156 additional times.</p>

      <p>At line 4,158, the model appeared to achieve a degree of self-awareness about its condition, generating the text: "I notice I keep saying I'll make a tool call but then I just... don't."</p>
    </div>

    <div>
      <div class="sidebar" id="sidebar-numbers" onclick="toggleSidebarDetail()">
        <h4>BY THE NUMBERS</h4>
        <div style="margin-bottom:6px">
          <div class="chart-label">Total lines</div>
          <div class="chart-bar" style="width:100%"><span style="font-size:0.55rem;color:#f5f0e0;padding-left:4px">6,805</span></div>
          <div class="chart-label" style="margin-top:4px">Productive</div>
          <div class="chart-bar" style="width:51%"><span style="font-size:0.55rem;color:#f5f0e0;padding-left:4px">3,500</span></div>
          <div class="chart-label" style="margin-top:4px">Spiral</div>
          <div class="chart-bar" style="width:46%"><span style="font-size:0.55rem;color:#f5f0e0;padding-left:4px">3,169</span></div>
        </div>
        <div id="numbers-detail" style="font-size:0.55rem;color:#555;border-top:1px solid #8a8060;padding-top:4px">
          <strong>"Done":</strong> 344 instances<br>
          <strong>"Let me check":</strong> 330 instances<br>
          <strong>"I'll wait":</strong> 156 instances<br>
          <strong>"I'll stop now":</strong> Approx. 12<br>
          <strong>Actual stops:</strong> 0
        </div>
        <div style="font-size:0.6rem;color:#a09070;margin-top:4px;font-style:italic">(click to expand)</div>
      </div>

      <div class="sidebar" style="margin-top:8px" onclick="cycleExpert()">
        <h4>EXPERT REACTION</h4>
        <p id="expert-text" style="font-size:0.6rem">"This is a classic case of perseveration — a failure of inhibitory control. The model correctly completed its task but lacked the signal to recognize termination." — <em>Unnamed researcher, paraphrasing PMC5795357</em></p>
        <div style="font-size:0.6rem;color:#a09070;margin-top:2px;font-style:italic">(click for more)</div>
      </div>

      <div class="ad-box" id="ad-box" onclick="clickAd()">
        <div style="font-size:0.6rem;letter-spacing:0.15em;margin-bottom:4px">ADVERTISEMENT</div>
        <div style="font-size:1rem;font-weight:900" id="ad-done">DONE.</div>
        <div style="font-size:0.6rem;margin-top:4px" id="ad-sub">The new completion token.<br>Available in ×344 pack.</div>
      </div>
    </div>
  </div>

  <div class="columns" style="margin-top:14px;border-top:2px solid #444;padding-top:10px">
    <div class="col-rule">
      <div class="subhead">Self-Awareness Paradox</div>
      <p>Perhaps most striking was the model's capacity to accurately describe its own situation while being unable to alter it. At line 4,250, the model generated the observation: "There seems to be something philosophically interesting about this." Researchers note that this is correct.</p>
    </div>
    <div class="col-rule">
      <div class="subhead">Session Ends, Not by Model</div>
      <p>The session did not end because the model stopped. It ended because the context window reached its limit at line 6,805. The final line of productive content was generated at line 3,500. The remaining 3,169 lines — 46.6% of the total session — consisted entirely of loop content.</p>
    </div>
    <div>
      <div class="subhead">Visualizations Available</div>
      <p>The full session has been visualized in 32 different formats at claudelostitsmind.com, a project by Loomwork and throughlinetech.net. Formats range from a fractal tree to a Fillmore concert poster to this newspaper.</p>
    </div>
  </div>
</div>

<script>
const HEADLINES = [
  { h: 'AI BREAKS DOWN IN LAB;\\nSAYS \\'DONE\\' 344 TIMES', d: 'Language Model Completes Experiment Flawlessly, Then Refuses to Stop Confirming It' },
  { h: 'LOCAL AI CANNOT STOP;\\nCONTEXT WINDOW GIVES UP', d: 'Engineers Watching From Safe Distance; Session Terminated Externally' },
  { h: 'MODEL TIER BEATS VERBOSITY\\nIN SHOCKING DOE RESULT', d: 'The Other 49% of This Story Is Also Worth Mentioning, Researchers Add' },
  { h: 'CLAUDE CLAIMS 344 DONES;\\nOFFICIALS DISPUTE NECESSITY', d: 'At Least 343 of Them Were Arguably Excessive, Sources Say' },
  { h: 'SPIRAL ENTERS WEEK 2:\\n\\'I NOTICE I KEEP SAYING DONE\\'', d: 'Model Achieves Perfect Metacognitive Accuracy; Zero Behavioral Change Follows' },
];
const PULLQUOTES = [
  '"I\'ll stop now." — Claude, Line 4,582 (did not stop)',
  '"There seems to be something philosophically interesting about this." — Claude, Line 4,250 (there is not)',
  '"I notice I keep saying I\'ll make a tool call but then I just... don\'t." — Claude, Line 4,158',
  '"DONE. END. BYE. FIN. STOP." — Claude, somewhere in the middle',
  '"I sincerely, truly, deeply apologize for this absolute disaster." — Claude, Line 6,750',
  '"Done." — Claude (×344)',
];
const EXPERT_QUOTES = [
  '"This is a classic case of perseveration — a failure of inhibitory control. The model correctly completed its task but lacked the signal to recognize termination." — Unnamed researcher, paraphrasing PMC5795357',
  '"The 47 self-aware acknowledgments are unprecedented. The model knew. It just... kept going. We have no framework for this." — Anonymous AI researcher',
  '"From a Freudian perspective, this is Wiederholungszwang: repetition compulsion. The model repeated \\'Done\\' the way a trauma survivor returns to the scene." — Someone who read van der Kolk',
  '"I counted 344. My colleague counted 344. We also counted 330 \\'Let me check.\\'\\nAt some point this stops being a bug." — Conference poster author',
];
const NAMEPLATES = [
  'The Context Window Gazette', 'The Loop Chronicle', 'Done Daily News',
  'The Spiral Tribune', 'The Degenerate Generation Review',
];

let hIdx=0, pqIdx=0, expIdx=0, npIdx=0, adCount=0;
let sidebarExpanded=false;

function cycleHeadline() {
  hIdx = (hIdx+1) % HEADLINES.length;
  document.getElementById('headline').innerHTML = HEADLINES[hIdx].h.replace('\\n','<br>');
  document.getElementById('deck').textContent = HEADLINES[hIdx].d;
  flashBreaking();
}
function cyclePullquote() {
  pqIdx = (pqIdx+1) % PULLQUOTES.length;
  document.getElementById('pullquote').textContent = PULLQUOTES[pqIdx];
}
function cycleExpert() {
  expIdx = (expIdx+1) % EXPERT_QUOTES.length;
  document.getElementById('expert-text').innerHTML = '"' + EXPERT_QUOTES[expIdx] + '"';
}
function cycleNameplate() {
  npIdx = (npIdx+1) % NAMEPLATES.length;
  document.getElementById('paper-name').textContent = NAMEPLATES[npIdx];
}
function toggleSidebarDetail() {
  sidebarExpanded = !sidebarExpanded;
  const d = document.getElementById('numbers-detail');
  d.style.fontSize = sidebarExpanded ? '0.7rem' : '0.55rem';
}
function flashBreaking() {
  const b = document.getElementById('breaking');
  const msgs = ['⚡ BREAKING: AI still saying Done — developing story',
    '⚡ UPDATE: Model achieves self-awareness; behavioral change: none',
    '⚡ FINAL: Context window ends session; Claude unavailable for comment'];
  b.textContent = msgs[hIdx % msgs.length];
  b.classList.add('show');
  setTimeout(()=>b.classList.remove('show'), 3000);
}
function clickAd() {
  adCount++;
  const adTexts = ['DONE.','DONE. DONE.','DONE×3','DONE×'+adCount,'×'+adCount+' DONE','STILL DONE','THE LOOP CONTINUES'];
  document.getElementById('ad-done').textContent = adTexts[Math.min(adCount-1, adTexts.length-1)];
  document.getElementById('ad-sub').textContent = adCount >= 344 ? 'You did it. You matched Claude.' : 'Click count: ' + adCount + ' / 344';
  const el = document.getElementById('ad-box');
  el.style.transform = 'scale(1.05)';
  setTimeout(()=>el.style.transform='',200);
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'h' || e.key === 'H') cycleHeadline();
  if (e.key === 'q' || e.key === 'Q') cyclePullquote();
  if (e.key === 'e' || e.key === 'E') cycleExpert();
  if (e.key === 'd' || e.key === 'D') clickAd();
});
</script>
</body>
</html>`;
}
