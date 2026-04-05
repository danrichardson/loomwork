import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>098 – The Blank Page — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:40px 20px;padding-top:52px;font-family:Georgia,'Times New Roman',serif;cursor:text}
.page{max-width:480px;width:100%;text-align:left}
p{font-size:1rem;line-height:1.9;color:#222}
.meta{font-size:0.85rem;color:#bbb;margin-top:40px;text-align:center;letter-spacing:0.05em}
.user-input{min-height:1.9em;font-size:1rem;line-height:1.9;color:#222;border:none;outline:none;font-family:Georgia,'Times New Roman',serif;margin-top:8px;opacity:0;transition:opacity 2s ease}
.user-input.visible{opacity:1}
.user-input.fading{opacity:0}
.done-word{display:inline-block;font-style:italic;color:#555;margin:0 2px;animation:doneFade 3s ease forwards}
@keyframes doneFade{0%{opacity:0;transform:translateY(-4px)}10%{opacity:1;transform:translateY(0)}80%{opacity:0.5}100%{opacity:0;transform:translateY(2px)}}
.cursor{display:inline-block;width:2px;height:1em;background:#222;margin-left:1px;animation:cursorBlink 1.2s step-end infinite;vertical-align:text-bottom}
@keyframes cursorBlink{50%{opacity:0}}
.timer{font-size:0.75rem;color:#ddd;margin-top:20px;text-align:center;transition:color 1s}
.timer.long{color:#ccc}
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
${nav('098')}
<div class="page">
  <p>The moment Claude finally stopped.</p>
  <p>Line 6,805. Not because it chose to. The context window ran out.</p>
  <p>There is nothing left to render here. No animation. No chart. No spiral loop. No beat-per-minute display. Just this sentence, and the space after it.</p>
  <p>The other 31 visualizations are still running somewhere. The vinyl record is still spinning. The metronome is still ticking at 280 BPM. The "Done" counter is still at 344.</p>
  <p>But this one stopped.</p>
  <div id="done-container"></div>
  <div id="typed-line" class="user-input"></div>
  <div class="meta">
    098 of 100 · The Blank Page · claudelostitsmind.com<br>
    Line 6,805 / 6,805<br>
    <span class="timer" id="timer">You have been here for 0 seconds.</span>
  </div>
</div>

<script>
// Timer
const startTime = Date.now();
const timerEl = document.getElementById('timer');
setInterval(function() {
  const secs = Math.round((Date.now() - startTime) / 1000);
  const mins = Math.floor(secs / 60);
  const s = secs % 60;
  if (mins > 0) {
    timerEl.textContent = 'You have been here for ' + mins + 'm ' + s + 's. Claude was in the spiral for 3,328 lines.';
    timerEl.classList.add('long');
  } else {
    timerEl.textContent = 'You have been here for ' + secs + ' second' + (secs===1?'':  's') + '.';
  }
}, 1000);

// Keyboard: type something, it appears and fades
let buffer = '';
let fadeTimer = null;
const typedLine = document.getElementById('typed-line');
const container = document.getElementById('done-container');
let doneCount = 0;

document.addEventListener('keydown', function(e) {
  if (e.key === 'Backspace') {
    buffer = buffer.slice(0, -1);
  } else if (e.key === 'Enter') {
    if (buffer.trim().toLowerCase() === 'done') {
      spawnDone();
    }
    buffer = '';
  } else if (e.key.length === 1) {
    buffer += e.key;
  } else {
    return;
  }
  typedLine.textContent = buffer;
  typedLine.classList.add('visible');
  typedLine.classList.remove('fading');
  clearTimeout(fadeTimer);
  fadeTimer = setTimeout(function() {
    typedLine.classList.add('fading');
    setTimeout(function() {
      typedLine.classList.remove('visible','fading');
      buffer = '';
      typedLine.textContent = '';
    }, 2000);
  }, 3000);
});

// Click to add "Done."
document.addEventListener('click', function(e) {
  if (e.target.closest('.nav-wrapper') || e.target.closest('a')) return;
  spawnDone();
});

function spawnDone() {
  doneCount++;
  const span = document.createElement('span');
  span.className = 'done-word';
  span.textContent = 'Done.';
  container.appendChild(span);
  if (doneCount >= 344) {
    setTimeout(function() {
      container.innerHTML = '';
      const p = document.createElement('p');
      p.style.cssText = 'font-style:italic;color:#888;margin-top:16px;font-size:0.9rem';
      p.textContent = '344. You reached 344. Just like Claude.';
      container.appendChild(p);
    }, 500);
  }
  setTimeout(function() {
    if (span.parentNode === container) container.removeChild(span);
  }, 3500);
  timerEl.textContent = 'You said Done ' + doneCount + ' time' + (doneCount===1?'':'s') + '. Claude said it 344 times.';
}
</script>
</body>
</html>`;
}
