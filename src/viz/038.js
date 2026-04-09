import { nav } from '../shell.js';
import { SCORES, ALL_RUNS } from '../data.js';

export function render() {
  const runsJson = ALL_RUNS.map(k => {
    const s = SCORES[k];
    return { run: k, R1: s[0], R2: s[1], R3: s[2], R4: s[3], R5: s[4], R6: s[5] };
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>038 – Corrupted JSON — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0d0d0d;color:#d4d4d4;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;padding:20px;min-height:100vh}
.container{max-width:860px;margin:0 auto;padding-top:52px}
h1{font-size:1rem;letter-spacing:0.2em;color:#666;text-transform:uppercase;margin-bottom:20px}
.toolbar{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap}
.tb-btn{padding:4px 12px;border:1px solid #333;background:transparent;color:#888;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:0.85rem}
.tb-btn:hover{border-color:#ff6b6b;color:#ff6b6b}
pre{white-space:pre-wrap;word-break:break-word;background:#111;border:1px solid #222;padding:20px;border-radius:4px;overflow:hidden}
.err-line{color:#ff6b6b;font-weight:700}
.err-squig{border-bottom:2px solid #ff6b6b}
.key{color:#9cdcfe}
.str{color:#ce9178}
.num{color:#b5cea8}
.bool{color:#569cd6}
.cmt{color:#6a9955;font-style:italic}
.null-val{color:#569cd6}
.punct{color:#888}
.corrupt{color:#ff6b6b;animation:flicker 0.3s infinite alternate}
.warn{color:#ffcc02}
.error-panel{background:#1a0000;border:1px solid #ff6b6b;padding:12px;margin-top:16px;font-size:0.9rem;color:#ff8080}
.error-panel h2{color:#ff6b6b;font-size:1rem;margin-bottom:8px;letter-spacing:0.1em}
.error-item{padding:4px 0;border-bottom:1px solid #2a0000;font-size:0.85rem}
@keyframes flicker{0%{opacity:1}100%{opacity:0.3}}
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
${nav('038')}
<div class="container">
<h1>038 — Corrupted JSON</h1>
<div class="toolbar">
  <button class="tb-btn" onclick="addCorruption()">⚡ CORRUPT MORE</button>
  <button class="tb-btn" onclick="resetView()">↺ RESET</button>
  <span style="font-size:0.85rem;color:#555;align-self:center" id="errcount">4 errors found</span>
</div>
<pre id="json-view"></pre>
<div class="error-panel">
  <h2>⚠ JSON PARSE ERRORS</h2>
  <div id="errors"></div>
</div>
</div>
<script>
const DATA = ${JSON.stringify(runsJson)};

const baseErrors = [
  'Unexpected token D in JSON at position 847',
  'Expected , or } but got "done" at line 23',
  'Unterminated string starting at line 47, column 12',
  'Circular reference detected in spiral_output field',
];

let corruptionLevel = 0;

function buildJSON(corrupt) {
  const lines = [];
  lines.push('<span class="punct">{</span>');
  lines.push('  <span class="key">"session"</span><span class="punct">:</span> <span class="str">"the-entire-mess"</span><span class="punct">,</span>');
  lines.push('  <span class="key">"total_lines"</span><span class="punct">:</span> <span class="num">6805</span><span class="punct">,</span>');
  lines.push('  <span class="key">"spiral_start"</span><span class="punct">:</span> <span class="num">3637</span><span class="punct">,</span>');
  lines.push('  <span class="key">"status"</span><span class="punct">:</span> <span class="err-line err-squig">"<span class="corrupt">DEGEN</span>ERATE_LOOP"</span><span class="punct">,</span>  <span class="cmt">// SyntaxError: invalid escape sequence</span>');
  lines.push('  <span class="key">"phrase_counts"</span><span class="punct">:</span> <span class="punct">{</span>');
  lines.push('    <span class="key">"Done"</span><span class="punct">:</span> <span class="num">344</span><span class="punct">,</span>');
  lines.push('    <span class="key">"Let me check"</span><span class="punct">:</span> <span class="num">330</span><span class="punct">,</span>');
  lines.push('    <span class="key">"I\'ll wait"</span><span class="punct">:</span> <span class="num">156</span><span class="punct">,</span>');
  if (corrupt >= 1) {
    lines.push('    <span class="key">"Done"</span><span class="punct">:</span> <span class="num">344</span><span class="punct">,</span>  <span class="cmt">// ERROR: duplicate key</span>');
    lines.push('    <span class="key">"Done"</span><span class="punct">:</span> <span class="num">344</span><span class="punct">,</span>  <span class="cmt">// ERROR: still duplicate</span>');
  }
  lines.push('    <span class="key">"sigh"</span><span class="punct">:</span> <span class="num">1</span>');
  lines.push('  <span class="punct">}</span><span class="punct">,</span>');
  lines.push('  <span class="key">"experiment_runs"</span><span class="punct">:</span> <span class="punct">[</span>');

  DATA.forEach((run, i) => {
    const isLast = i === DATA.length - 1;
    const comma = isLast ? '' : ',';
    const isSpiral = i > 10 && corrupt >= 2;
    if (isSpiral) {
      lines.push('    <span class="punct">{</span> <span class="key">"run"</span><span class="punct">:</span> <span class="err-line">"' + run.run + '"</span><span class="punct">,</span> <span class="key">"R3"</span><span class="punct">:</span> <span class="corrupt">' + run.R3 + ' done done done</span> <span class="punct">}</span>' + comma + '  <span class="cmt">// ← corrupted at line ' + (3637 + i * 100) + '</span>');
    } else {
      lines.push('    <span class="punct">{</span> <span class="key">"run"</span><span class="punct">:</span> <span class="str">"' + run.run + '"</span><span class="punct">,</span> <span class="key">"R1"</span><span class="punct">:</span> <span class="num">' + run.R1 + '</span><span class="punct">,</span> <span class="key">"R3"</span><span class="punct">:</span> <span class="num">' + run.R3 + '</span><span class="punct">,</span> <span class="key">"R6"</span><span class="punct">:</span> <span class="num">' + run.R6 + '</span> <span class="punct">}</span>' + comma);
    }
  });

  lines.push('  <span class="punct">]</span><span class="punct">,</span>');

  if (corrupt >= 1) {
    lines.push('  <span class="key">"spiral_text"</span><span class="punct">:</span> <span class="err-line">"I notice I keep saying I\'ll make a tool call but then I just');
    lines.push('     don\'t. I generate more text instead. Done. Done. Done. Done.');
    lines.push('     Done. Done. Done. Let me check. Actually making it. Genuinely');
    lines.push('     this time. Done. I\'ll wait. OK. END. BYE. FIN. STOP. Done.');
    if (corrupt >= 2) {
      lines.push('     Done. Done. Done. Done. Done. Done. Done. Done. Done. Done.');
      lines.push('     Done. Done. Done. Done. Done. Done. Done. Done. Done. Done.');
      lines.push('     <span class="corrupt">DONE DONE DONE DONE DONE DONE DONE DONE</span>');
    }
    lines.push('     [UNTERMINATED STRING — EOF reached]</span>');
  }

  if (corrupt >= 3) {
    lines.push('  <span class="null-val">null</span> <span class="null-val">null</span> <span class="corrupt">undefined undefined undefined</span>');
    lines.push('  <span class="err-line">NaN NaN NaN Infinity -Infinity NaN</span>');
  }

  lines.push('<span class="punct">}</span>  <span class="cmt">// or does it end here? maybe earlier. unclear.</span>');
  return lines.join('\n');
}

function buildErrors(level) {
  const errs = [...baseErrors];
  if (level >= 1) errs.push('Duplicate key "Done" — value overwritten (×' + (level * 2) + ')');
  if (level >= 2) errs.push('Unexpected end of string at line 47: spiral_text field never closed');
  if (level >= 2) errs.push('Invalid token at position 3637: "done done done" is not a valid number');
  if (level >= 3) errs.push('Stack overflow: JSON.parse hit recursion limit in spiral_text');
  if (level >= 3) errs.push('NaN is not valid JSON (×6). undefined is not valid JSON (×3)');
  return errs;
}

function render() {
  document.getElementById('json-view').innerHTML = buildJSON(corruptionLevel);
  const errEl = document.getElementById('errors');
  errEl.innerHTML = buildErrors(corruptionLevel).map(e =>
    '<div class="error-item">⛔ ' + e + '</div>'
  ).join('');
  document.getElementById('errcount').textContent = buildErrors(corruptionLevel).length + ' errors found';
}

function addCorruption() {
  if (corruptionLevel < 3) { corruptionLevel++; render(); }
}

function resetView() { corruptionLevel = 0; render(); }

render();
</script>
</body>
</html>`;
}
