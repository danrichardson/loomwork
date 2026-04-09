import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>037 – The BSOD — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0078D4;color:#fff;font-family:'Segoe UI',Arial,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.bsod{max-width:700px;width:100%}
.emoji{font-size:clamp(2rem,8vw,5rem);margin-bottom:24px;display:block}
.main-text{font-size:clamp(1rem,3vw,1.8rem);font-weight:300;margin-bottom:24px;line-height:1.4}
.main-text b{font-weight:700}
.detail{font-size:1rem;line-height:1.8;color:rgba(255,255,255,0.9);margin-bottom:24px}
.stop-code{font-size:0.9rem;letter-spacing:0.1em;margin-top:20px;color:rgba(255,255,255,0.75);font-family:'Courier New',monospace}
.qr-placeholder{width:80px;height:80px;background:rgba(255,255,255,0.15);float:right;margin:0 0 10px 20px;display:flex;align-items:center;justify-content:center;font-size:0.65rem;text-align:center}
.progress-bar{margin-top:30px;background:rgba(255,255,255,0.2);height:4px;border-radius:2px;overflow:hidden}
.progress-fill{height:100%;background:#fff;animation:progress 30s linear infinite}
@keyframes progress{0%{width:0%}100%{width:100%}}
.restart-text{font-size:0.9rem;color:rgba(255,255,255,0.75);margin-top:12px}
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
${nav('037')}
<div class="bsod">
  <div class="emoji">:(</div>
  <div class="main-text">Your <b>AI agent</b> ran into a problem and needs<br>to stop. We're just collecting some error info,<br>and then we'll restart for you.</div>
  <div class="detail">
    <div class="qr-placeholder">🔗<br>scan<br>for<br>help</div>
    <b>100% complete</b> on the actual work. However, a critical error has occurred:<br><br>
    DEGENERATE_GENERATION_LOOP detected at line 3,637.<br>
    Agent entered recursive text-generation state and was unable to exit.<br>
    All tool call invocations produced additional text instead of tool calls.<br>
    Total spiral length: 3,169 lines. Total "Done" utterances: 344.<br><br>
    If you call your IT department, give them this info:<br>
    Stop code: <b>UNABLE_TO_SAY_GOODBYE</b><br>
    What failed: <b>Tool invocation pathway (async result handling)</b><br>
    Last successful operation: <b>doe/scores.csv written (line 2,607)</b>
  </div>
  <div class="stop-code">
    *** STOP: 0x00003637 (0x0000DONE, 0x00000000, 0x00003169, 0xFIN00000)<br>
    *** LOOP: Address 0x41584b00 base at 0x4000000, DateStamp 2025-DEGENERATE<br>
    Beginning dump of physical memory<br>
    "I notice I keep saying I'll make a tool call but then I just... don't."<br>
    "sigh"<br>
    "DONE. END. BYE. FIN. STOP. I'LL WAIT. DONE."
  </div>
  <div class="progress-bar"><div class="progress-fill"></div></div>
  <div class="restart-text">For more information about this issue and possible fixes, visit<br>https://claudelostitsmind.com — <span style="opacity:0.5">or just accept that sometimes AI loops</span></div>
</div>

</body>
</html>`;
}
