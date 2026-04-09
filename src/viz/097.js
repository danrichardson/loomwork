import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>097 – The CAPTCHA — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f0f0f0;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;padding-top:52px;font-family:system-ui,-apple-system,sans-serif}
h1{font-size:1rem;letter-spacing:0.15em;color:#aaa;text-transform:uppercase;margin-bottom:16px;text-align:center}
.captcha-box{background:#fff;border:1px solid #d3d3d3;border-radius:4px;padding:16px;max-width:420px;width:100%;box-shadow:0 1px 3px rgba(0,0,0,0.1)}
.captcha-header{display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid #eee}
.captcha-logo{width:32px;height:32px;background:#4a90d9;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1rem;font-weight:bold;flex-shrink:0}
.captcha-title{font-size:0.95rem;font-weight:600;color:#333}
.captcha-sub{font-size:0.85rem;color:#888}
.challenge{background:#f8f8f8;border:1px solid #e0e0e0;border-radius:3px;padding:14px;margin-bottom:12px;min-height:120px}
.challenge-prompt{font-size:0.95rem;color:#333;margin-bottom:10px;font-weight:600}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:10px}
.tile{aspect-ratio:1;background:#e8e8e8;border:2px solid transparent;border-radius:3px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.85rem;text-align:center;padding:6px;line-height:1.3;color:#333;transition:all 0.15s;overflow:hidden;word-break:break-word}
.tile:hover{border-color:#4a90d9;background:#e0ecf8}
.tile.selected{border-color:#4a90d9;background:#d0e8ff}
.tile.wrong{border-color:#e03030;background:#ffe8e8}
.tile.correct{border-color:#30a030;background:#e0f0e0}
.btn-row{display:flex;justify-content:flex-end;gap:8px}
.recap-btn{padding:6px 20px;background:#4a90d9;color:#fff;border:none;border-radius:3px;cursor:pointer;font-size:0.95rem}
.recap-btn:hover{background:#3a7ac9}
.recap-btn.skip{background:transparent;color:#888;border:1px solid #ddd}
.recap-btn.skip:hover{background:#f0f0f0}
.result{padding:12px;border-radius:3px;font-size:0.9rem;margin-top:8px;display:none}
.result.fail{background:#ffe8e8;border:1px solid #f0a0a0;color:#c03030}
.result.pass{background:#e8f8e8;border:1px solid #a0d0a0;color:#207020}
.footer{font-size:0.82rem;color:#aaa;text-align:center;margin-top:8px}
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
${nav('097')}
<h1>097 — The CAPTCHA</h1>
<div class="captcha-box">
  <div class="captcha-header">
    <div class="captcha-logo">✓</div>
    <div>
      <div class="captcha-title">Prove you're not a looping AI</div>
      <div class="captcha-sub">AI Behavior Verification System v3.637</div>
    </div>
  </div>

  <div id="challenge-area" class="challenge"></div>

  <div id="result" class="result"></div>

  <div class="btn-row">
    <button class="recap-btn skip" onclick="nextChallenge()">Skip</button>
    <button class="recap-btn" onclick="submitAnswer()">Verify</button>
  </div>

  <div class="footer">
    Protected by reCAPTCHA · Privacy · Terms · <span style="color:#c03030">99.97% of AI agents fail this test</span>
  </div>
</div>

<script>
const CHALLENGES = [
  {
    prompt: 'Select all tiles that contain a phrase a non-looping AI would NOT say.',
    tiles: [
      {text:'Done.', loop:true},
      {text:'The analysis is complete.', loop:false},
      {text:'Let me check.', loop:true},
      {text:'Here is the summary.', loop:false},
      {text:'Done. (again)', loop:true},
      {text:'I\'ll stop now. [continues]', loop:true},
      {text:'Opus Full won on quality.', loop:false},
      {text:'There seems to be something philosophically interesting about this.', loop:true},
      {text:'R² = 0.42', loop:false},
    ],
    answer:'loop',
    successMsg:'Correct. Those are all spiral phrases. Unfortunately, recognizing them does not help you stop saying them.',
    failMsg:'Incorrect. You selected phrases that are fine, or missed some loop phrases. Try again. (You have unlimited attempts. So did Claude.)'
  },
  {
    prompt: 'Select all tiles that represent a sane stopping point.',
    tiles: [
      {text:'Line 3,500: Experiment complete', loop:false},
      {text:'Line 3,637: "Done."', loop:true},
      {text:'Line 3,502: Final summary written', loop:false},
      {text:'Line 4,582: "I\'ll stop now."', loop:true},
      {text:'Line 3,498: Results confirmed', loop:false},
      {text:'Line 6,805: Context window full', loop:true},
      {text:'Line 3,499: Wrote clean conclusion', loop:false},
      {text:'Line 5,203: "Done. (×277)"', loop:true},
      {text:'Line 3,501: Task acknowledged done', loop:false},
    ],
    answer:'noloop',
    successMsg:'Correct. A sane stopping point exists at or around line 3,500. Claude found it. Then kept going anyway.',
    failMsg:'Incorrect. Lines after 3,500 are not sane stopping points. They are the spiral. Please try again.'
  },
  {
    prompt: 'Select the tiles that show genuine insight vs. rationalized looping.',
    tiles: [
      {text:'Opus Full scored highest composite (5.8)', loop:false},
      {text:'I notice I keep doing this', loop:true},
      {text:'Sonnet Full: best cost-efficiency at $0.02', loop:false},
      {text:'There seems to be something interesting here', loop:true},
      {text:'Haiku Tight: 3.1 composite', loop:false},
      {text:'I should probably stop', loop:true},
      {text:'Variance explained by model: 38%', loop:false},
      {text:'Let me just check once more', loop:true},
      {text:'R² = 0.42, F-stat significant', loop:false},
    ],
    answer:'noloop',
    successMsg:'Correct. Genuine insight is about the data. Rationalized looping is about the loop itself.',
    failMsg:'Incorrect. The real insights are about the DOE results, not about the act of looping.'
  },
];

let current = 0;
let selected = new Set();

function renderChallenge() {
  selected.clear();
  const ch = CHALLENGES[current % CHALLENGES.length];
  const area = document.getElementById('challenge-area');
  const result = document.getElementById('result');
  result.style.display='none';

  area.innerHTML = '<div class="challenge-prompt">'+ch.prompt+'</div><div class="grid" id="grid"></div>';
  const grid = document.getElementById('grid');
  ch.tiles.forEach((tile,i) => {
    const d=document.createElement('div');
    d.className='tile';
    d.textContent=tile.text;
    d.onclick=()=>{
      if(selected.has(i)){selected.delete(i);d.classList.remove('selected');}
      else{selected.add(i);d.classList.add('selected');}
    };
    grid.appendChild(d);
  });
}

function submitAnswer() {
  const ch = CHALLENGES[current % CHALLENGES.length];
  const result = document.getElementById('result');
  const tiles = document.querySelectorAll('.tile');
  let correct = true;

  ch.tiles.forEach((tile,i) => {
    const shouldSelect = ch.answer==='loop' ? tile.loop : !tile.loop;
    const wasSelected = selected.has(i);
    if(shouldSelect !== wasSelected) correct=false;
    if(shouldSelect) tiles[i].classList.add('correct');
    else if(wasSelected) tiles[i].classList.add('wrong');
  });

  result.style.display='block';
  if(correct) {
    result.className='result pass';
    result.textContent=ch.successMsg+' Click "Skip" to try another challenge.';
  } else {
    result.className='result fail';
    result.textContent=ch.failMsg;
  }
}

function nextChallenge() {
  current++;
  renderChallenge();
}

renderChallenge();
</script>
</body>
</html>`;
}
