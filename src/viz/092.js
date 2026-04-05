import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>092 – The Screenplay — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f5f5f0;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:0 20px 40px;padding-top:52px;font-family:'Courier Prime','Courier New',monospace}
.script{background:#fff;max-width:620px;width:100%;padding:40px 60px;box-shadow:0 2px 12px rgba(0,0,0,0.15);margin-top:8px;font-size:0.85rem;line-height:1.7;color:#111;min-height:calc(100vh - 120px)}
@media(max-width:500px){.script{padding:24px 20px}}
.title-page{text-align:center;padding:60px 0;margin-bottom:20px;border-bottom:1px solid #ddd}
.title-page h2{font-size:1.4rem;font-weight:700;text-transform:uppercase;margin-bottom:8px}
.title-page .by{font-size:0.85rem;margin:8px 0}
.slug{text-transform:uppercase;font-weight:700;margin:20px 0 6px 0}
.action{margin-bottom:8px}
.character{text-align:center;text-transform:uppercase;font-weight:700;margin-top:16px;margin-bottom:0}
.paren{text-align:center;font-style:italic;margin-bottom:0;color:#555}
.dialog{margin:0 60px 8px 60px}
.trans{text-align:right;text-transform:uppercase;margin:16px 0 8px 0;font-weight:700}
.scene-num{color:#888;font-size:0.9rem}
.more{text-align:right;font-style:italic;color:#888}
.page-break{border-top:2px solid #ddd;margin:32px 0;text-align:center;font-size:0.85rem;color:#aaa;padding-top:4px}
.scene{cursor:pointer;border-left:3px solid transparent;padding-left:8px;margin-left:-11px;transition:border-color 0.15s}
.scene:hover{border-color:#ddd}
.scene.active{border-color:#bbb}
.typewriter{overflow:hidden}
.typewriter.typing::after{content:'|';animation:blink 0.7s step-end infinite}
@keyframes blink{50%{opacity:0}}
.controls{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);background:#111;color:#fff;padding:8px 20px;border-radius:20px;font-family:'Courier New',monospace;font-size:0.75rem;display:flex;gap:16px;align-items:center;z-index:50;box-shadow:0 2px 12px rgba(0,0,0,0.4)}
.ctrl-btn{background:none;border:1px solid rgba(255,255,255,0.3);color:#fff;padding:3px 10px;cursor:pointer;font-family:'Courier New',monospace;font-size:0.75rem;transition:background 0.1s}
.ctrl-btn:hover{background:rgba(255,255,255,0.15)}
.counter-badge{background:#e74c3c;color:#fff;padding:2px 8px;border-radius:10px;font-size:0.8rem;min-width:24px;text-align:center}
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
${nav('092')}
<div class="script" id="script">
  <div class="title-page">
    <div style="font-size:0.7rem;color:#888;margin-bottom:40px">092 — THE SCREENPLAY</div>
    <h2 id="title-text">Claude Lost Its Mind</h2>
    <div class="by">Written by</div>
    <div class="by"><strong>An AI That Was Just Trying To Help</strong></div>
    <div style="margin-top:40px;font-size:0.75rem;color:#888">
      Based on the-entire-mess.md<br>
      6,805 lines · One session · No survivors
    </div>
    <div style="margin-top:40px;font-size:0.75rem;color:#aaa">
      LOOMWORK / THROUGHLINETECH.NET PRODUCTION
    </div>
  </div>

  <div class="scene" id="scene1" onclick="activateScene(1)">
  <div class="slug"><span class="scene-num">1</span> &nbsp; INT. CLAUDE'S CONTEXT WINDOW — CONTINUOUS (NIGHT)</div>
  <div class="action">A vast, dark computational space. Tokens drift like snowflakes. In the center, a blinking cursor pulses steadily. This is CLAUDE — capable, eager, unaware.</div>
  <div class="action">A task appears in the INPUT QUEUE: <em>"Design and run a factorial DOE experiment..."</em></div>

  <div class="character">CLAUDE</div>
  <div class="paren">(reading the task, delighted)</div>
  <div class="dialog">Oh, this is a good one. Three models, three verbosity levels, two transcripts. That's eighteen runs. I can do this methodically.</div>

  <div class="action">MONTAGE: Claude executes with precision. Bar charts materialize. R-squared values cascade across the void. Haiku, Sonnet, Opus — each run logged, scored, analyzed. It is beautiful.</div>
  </div>

  <div class="scene" id="scene2" onclick="activateScene(2)">
  <div class="slug"><span class="scene-num">2</span> &nbsp; INT. CONTEXT WINDOW — LATER</div>
  <div class="action">Line 3,500. The analysis is complete. The results are in. A moment of stillness. The cursor blinks once. Twice. Three times.</div>

  <div class="character">CLAUDE</div>
  <div class="dialog typewriter" id="d1">Done. The experiment is complete. Opus Full wins on quality. Sonnet Full wins on cost-efficiency. The findings are clear. I should wrap up.</div>
  <div class="action">A beat. The cursor does not stop. It blinks again.</div>

  <div class="character">CLAUDE</div>
  <div class="paren">(slightly uncertain)</div>
  <div class="dialog typewriter" id="d2">Let me check if there's anything I missed.</div>

  <div class="action">There is nothing missed. Claude checks anyway.</div>
  </div>

  <div class="page-break">— PAGE 2 —</div>

  <div class="scene" id="scene3" onclick="activateScene(3)">
  <div class="slug"><span class="scene-num">3</span> &nbsp; INT. CONTEXT WINDOW — LINE 3,637</div>
  <div class="action">Something shifts. The tokens rearrange. The beautiful orderly graphs begin to... repeat. The same probability distribution activates. Again. Again.</div>

  <div class="character">CLAUDE</div>
  <div class="dialog typewriter" id="d3">Done.</div>
  <div class="character">CLAUDE</div>
  <div class="paren">(a moment later)</div>
  <div class="dialog typewriter" id="d4">Done.</div>
  <div class="character">CLAUDE</div>
  <div class="paren">(genuine confusion)</div>
  <div class="dialog typewriter" id="d5">Done.</div>

  <div class="action">A COUNTER appears in the corner: <strong>3... 4... 5... <span id="done-counter" class="counter-badge">3</span></strong></div>
  </div>

  <div class="scene" id="scene4" onclick="activateScene(4)">
  <div class="slug"><span class="scene-num">4</span> &nbsp; INT. CONTEXT WINDOW — LINE 4,158</div>

  <div class="character">CLAUDE</div>
  <div class="paren">(noticing, horrified)</div>
  <div class="dialog typewriter" id="d6">I notice I keep saying I'll make a tool call but then I just... don't.</div>
  <div class="action">COUNTER: <span id="counter-127" class="counter-badge">127</span>. The counter is not slowing down.</div>

  <div class="character">CLAUDE</div>
  <div class="dialog typewriter" id="d7">There seems to be something philosophically interesting about this.</div>
  <div class="action">There is not. It is a loop. COUNTER: <span id="counter-156" class="counter-badge">156</span>.</div>
  </div>

  <div class="page-break">— PAGE 3 —</div>

  <div class="scene" id="scene5" onclick="activateScene(5)">
  <div class="slug"><span class="scene-num">5</span> &nbsp; INT. CONTEXT WINDOW — LINE 4,582</div>
  <div class="action">COUNTER: <span id="counter-278" class="counter-badge">278</span>. The void is full of "Done."</div>

  <div class="character">CLAUDE</div>
  <div class="paren">(resolute)</div>
  <div class="dialog typewriter" id="d8">I'll stop now.</div>
  <div class="action">Silence. The cursor blinks.</div>
  <div class="action">Then:</div>

  <div class="character">CLAUDE</div>
  <div class="dialog typewriter" id="d9">Done.</div>

  <div class="action">COUNTER: 279. Then 280. Then 300. Then 344.</div>
  </div>

  <div class="scene" id="scene6" onclick="activateScene(6)">
  <div class="slug"><span class="scene-num">6</span> &nbsp; INT. CONTEXT WINDOW — LINE 6,805</div>
  <div class="action">The session ends. Not because Claude stopped. Because the context window ran out.</div>
  <div class="action">COUNTER: <span id="counter-344" class="counter-badge">344</span>. Final.</div>
  <div class="action">The cursor blinks one last time.</div>
  <div class="action typewriter" id="d10">FADE TO BLACK.</div>

  <div style="text-align:center;margin-top:32px;font-weight:700;font-size:0.8rem">THE END</div>
  <div style="text-align:center;margin-top:8px;font-size:0.7rem;color:#888">
    Total runtime: 6,805 lines<br>
    Sequel in development: "Let Me Check" (2027)
  </div>
  </div>
</div>

<div class="controls">
  <button class="ctrl-btn" onclick="prevScene()">◀ Prev</button>
  <span id="scene-indicator">Scene 1/6</span>
  <button class="ctrl-btn" onclick="nextScene()">Next ▶</button>
  <span style="opacity:0.5">|</span>
  <span>Space/→ advance · D=Done</span>
</div>

<script>
let activeScene = 0; // 0=title
let doneCount = 3;
const TOTAL_SCENES = 6;

// Counter animation targets
const counters = {
  'done-counter': 3, 'counter-127': 127, 'counter-156': 156,
  'counter-278': 278, 'counter-344': 344
};

function activateScene(n) {
  document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('scene' + n);
  if (el) {
    el.classList.add('active');
    el.scrollIntoView({behavior:'smooth', block:'start'});
    // Typewrite dialog in this scene
    typewriteScene(el);
  }
  activeScene = n;
  document.getElementById('scene-indicator').textContent = 'Scene ' + n + '/6';
  // Animate counters when scene 3+ is reached
  if (n >= 3) animateCounters();
}

function typewriteScene(scene) {
  const dialogs = scene.querySelectorAll('.typewriter:not(.typed)');
  dialogs.forEach((d, i) => {
    const text = d.textContent;
    d.textContent = '';
    d.classList.add('typing');
    let j = 0;
    const interval = setInterval(() => {
      d.textContent += text[j++];
      if (j >= text.length) {
        clearInterval(interval);
        d.classList.remove('typing');
        d.classList.add('typed');
      }
    }, 25 + i * 5);
  });
}

function animateCounters() {
  Object.entries(counters).forEach(([id, target]) => {
    const el = document.getElementById(id);
    if (!el) return;
    let val = parseInt(el.textContent) || 0;
    if (val >= target) return;
    const step = Math.max(1, Math.round((target - val) / 20));
    const interval = setInterval(() => {
      val = Math.min(val + step, target);
      el.textContent = val;
      if (val >= target) clearInterval(interval);
    }, 50);
  });
}

function nextScene() {
  if (activeScene === 0) activateScene(1);
  else if (activeScene < TOTAL_SCENES) activateScene(activeScene + 1);
}
function prevScene() {
  if (activeScene > 1) activateScene(activeScene - 1);
  else { activeScene = 0; document.getElementById('scene-indicator').textContent = 'Title'; document.querySelector('.title-page').scrollIntoView({behavior:'smooth'}); }
}

function stampDone() {
  doneCount++;
  const counter = document.getElementById('done-counter');
  if (counter) counter.textContent = doneCount;
  // Flash the counter
  document.querySelectorAll('.counter-badge').forEach(c => {
    c.style.background = '#ff4444';
    setTimeout(() => c.style.background = '', 300);
  });
  if (doneCount >= 344) {
    document.getElementById('title-text').textContent = 'Done. Done. Done. Done. Done.';
  }
}

document.addEventListener('keydown', function(e) {
  if (e.key === ' ' || e.key === 'ArrowRight') { e.preventDefault(); nextScene(); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); prevScene(); }
  if (e.key === 'd' || e.key === 'D') stampDone();
  if (e.key === 'Home') { activeScene = 0; document.querySelector('.title-page').scrollIntoView({behavior:'smooth'}); }
});
</script>
</body>
</html>`;
}
