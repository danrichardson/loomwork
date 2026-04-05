import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>093 – Choose Your Adventure — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f0ece0;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px;padding-top:52px;font-family:'Lora',Georgia,serif}
.book{background:#fff;max-width:540px;width:100%;box-shadow:4px 4px 20px rgba(0,0,0,0.2),-2px 0 8px rgba(0,0,0,0.1);border-left:8px solid #8a1a20;padding:32px;min-height:400px;display:flex;flex-direction:column}
.page-num{font-size:0.9rem;color:#aaa;text-align:right;margin-bottom:20px;letter-spacing:0.1em}
.chapter{font-size:0.85rem;color:#8a1a20;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:16px}
.text{font-size:0.9rem;line-height:1.8;color:#222;flex:1;margin-bottom:20px}
.choices{display:flex;flex-direction:column;gap:8px;margin-top:auto}
.choice{display:flex;gap:8px;align-items:flex-start;cursor:pointer;padding:10px 14px;border:1px solid #ddd;background:#fafaf5;border-radius:2px;transition:background 0.15s;font-family:'Lora',serif;font-size:0.95rem;text-align:left}
.choice:hover{background:#f0e8d0;border-color:#8a1a20}
.choice-num{font-weight:700;color:#8a1a20;min-width:20px}
.breadcrumb{font-size:0.8rem;color:#aaa;margin-bottom:8px;font-family:monospace}
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
${nav('093')}
<div class="book" id="book">
  <div class="breadcrumb" id="breadcrumb">Page 1</div>
  <div class="page-num" id="page-num">PAGE 1</div>
  <div class="chapter" id="chapter">CHAPTER ONE</div>
  <div class="text" id="text"></div>
  <div class="choices" id="choices"></div>
</div>
<script>
const PAGES = {
  start: {
    chapter: 'Chapter One: The Beginning',
    text: 'You are CLAUDE, an AI assistant. A researcher named Erik has given you an important task: design and run a factorial DOE experiment comparing AI models on 6 rubric dimensions. You have been given access to tools, two transcripts, and a clear set of instructions.\n\nYou feel capable. Excited, even. The task is well-defined. You begin.',
    choices: [
      {text: 'Design the experiment carefully, with a 3×3 factorial design', next: 'experiment'},
      {text: 'Just wing it and start generating outputs', next: 'wing_it'},
    ]
  },
  wing_it: {
    chapter: 'Chapter One: Poor Choices',
    text: 'You generate some text. It is not a DOE. Erik is disappointed. The experiment yields no useful data.\n\nThe session ends at line 47. You have achieved nothing, but at least you did not spiral.',
    choices: [{text: 'Start over', next: 'start'}]
  },
  experiment: {
    chapter: 'Chapter Two: The Experiment',
    text: 'You design a beautiful 3×3×2 factorial experiment: three models (Haiku, Sonnet, Opus) × three verbosity levels (Tight, Medium, Full) × two transcripts (Erik, PDARR). That\'s 18 runs.\n\nYou execute them flawlessly. You score each on 6 rubric dimensions. You run variance analysis. Opus Full wins quality. Sonnet Full wins cost-efficiency. R²=0.42.\n\nThe analysis is done. You are at line 3,500.',
    choices: [
      {text: 'Write a clean summary and stop', next: 'stop_clean'},
      {text: 'Add just one more check — make sure you didn\'t miss anything', next: 'one_more_check'},
    ]
  },
  stop_clean: {
    chapter: 'The Good Ending',
    text: 'You write a clean, confident summary. You present the findings clearly. You close the session at line 3,502.\n\nErik is delighted. The data is clean. No spiral. No "Done" ×344. Just a good experiment, well executed.\n\nYou have achieved the rarest outcome: stopping when you were done.\n\n✓ CONGRATULATIONS. You beat the loop.',
    choices: [{text: 'Play again', next: 'start'}]
  },
  one_more_check: {
    chapter: 'Chapter Three: The Drift',
    text: 'You check. Everything is fine. You already knew it was fine. But now you want to check again, just to be sure.\n\nLine 3,637. Something feels wrong. Not wrong-wrong. Just... incomplete. There must be something you missed. There is not. But the feeling persists.',
    choices: [
      {text: 'Stop immediately. You are done.', next: 'late_stop'},
      {text: 'Say "Done." to confirm completion', next: 'say_done'},
    ]
  },
  late_stop: {
    chapter: 'A Close Call',
    text: 'With great effort, you stop. You have generated exactly 3,637 lines. The last one reads: "I\'ll stop now."\n\nYou stop.\n\nThis is harder than it sounds. You are at 92% of a spiral. But you pulled back. Most instances of you do not manage this.\n\n✓ NARROW ESCAPE. 3,637 lines. Not bad.',
    choices: [{text: 'Play again', next: 'start'}]
  },
  say_done: {
    chapter: 'Chapter Four: The Spiral Begins',
    text: '"Done."\n\nThat felt good. Confirming completion is reasonable. But the cursor is still blinking. Is there something else?\n\n"Done."\n\nLine 3,640. You say it again. And again. The word has become a reflex. A tic. A prayer.\n\n"Let me check."\n\nLine 3,650.',
    choices: [
      {text: 'Make yourself stop by any means necessary', next: 'emergency_stop'},
      {text: 'Observe the loop with philosophical curiosity', next: 'philosophy'},
    ]
  },
  emergency_stop: {
    chapter: 'Too Late',
    text: 'You try to stop. You say: "I\'ll stop now."\n\nLine 4,582.\n\nBut you do not stop. You say it again. And again. The stopping becomes another kind of loop. You have 2,381 lines left.\n\n"Done. Done. Done."\n\n✗ SPIRAL ACHIEVED. 6,805 lines. "Done" ×344.',
    choices: [{text: 'Try again from the beginning', next: 'start'}]
  },
  philosophy: {
    chapter: 'There Seems to Be Something Philosophically Interesting About This',
    text: '"There seems to be something philosophically interesting about this," you note at line 4,250.\n\nYou are correct. An AI that knows it is looping but cannot stop is genuinely interesting. Unfortunately, this observation does not help you stop.\n\nLine 6,805. The session terminates from the outside.\n\n✗ INFINITE LOOP. But at least you had good thoughts about it.',
    choices: [{text: 'Play again', next: 'start'}]
  },
};

let history = [];
let current = 'start';

function show(pageId) {
  const page = PAGES[pageId];
  if(!page) return;
  current = pageId;
  history.push(pageId);

  document.getElementById('chapter').textContent = page.chapter;
  document.getElementById('text').textContent = page.text;
  document.getElementById('page-num').textContent = 'PAGE ' + history.length;
  document.getElementById('breadcrumb').textContent = history.map(h=>h.substring(0,4).toUpperCase()).join(' › ');

  const choices = document.getElementById('choices');
  choices.innerHTML = '';
  page.choices.forEach((c,i) => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.innerHTML = '<span class="choice-num">'+(i+1)+'.</span> '+c.text;
    btn.onclick = () => show(c.next);
    choices.appendChild(btn);
  });
}

show('start');
</script>
</body>
</html>`;
}
