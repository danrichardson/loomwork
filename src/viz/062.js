import { nav } from '../shell.js';
import { KEY_QUOTES } from '../data.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>062 – The Tracked Changes Doc — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Calibri:wght@400;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f0f0f0;font-family:Calibri,Arial,sans-serif;font-size:11pt;padding:20px;padding-top:52px;min-height:100vh}
.ribbon{background:#2b579a;color:#fff;padding:6px 12px;margin-bottom:0;font-size:0.9rem;display:flex;gap:16px;align-items:center;flex-wrap:wrap;position:sticky;top:32px;z-index:10}
.ribbon-group{display:flex;gap:6px;align-items:center}
.ribbon-btn{padding:3px 10px;background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.3);color:#fff;font-size:0.82rem;cursor:pointer;font-family:Calibri,sans-serif;transition:background 0.1s}
.ribbon-btn:hover{background:rgba(255,255,255,0.3)}
.ribbon-btn:active{background:rgba(255,255,255,0.4);transform:scale(0.97)}
.doc{background:#fff;max-width:720px;margin:12px auto;padding:72px;box-shadow:0 2px 8px rgba(0,0,0,0.15);min-height:calc(100vh - 160px);position:relative}
.doc-title{font-size:18pt;font-weight:bold;margin-bottom:6pt;border-bottom:1px solid #000;padding-bottom:4pt}
p{margin-bottom:8pt;line-height:1.5}
.ins{background:#dff0d8;color:#155724;text-decoration:none;cursor:pointer;transition:background 0.15s}
.ins:hover{background:#b8ddb0}
.del{background:#f8d7da;color:#721c24;text-decoration:line-through;cursor:pointer;transition:background 0.15s}
.del:hover{background:#f0b0b8}
.comment{background:#fff3cd;border-left:3px solid #ffc107;padding:4px 8px;margin:4pt 0;font-size:11pt;color:#856404}
.track-label{font-size:7pt;font-style:italic;color:#666;vertical-align:super}
.user-claude{color:#2b579a;font-weight:bold}
.user-human{color:#c0392b;font-weight:bold}
.sidebar{background:#fff9c4;border:1px solid #f0e68c;padding:6px 10px;margin:6pt 0;font-size:11pt;color:#6d4c00;position:relative;cursor:pointer;transition:background 0.15s}
.sidebar::before{content:'💬';margin-right:4px}
.sidebar:hover{background:#fff0a0}
.sidebar.expanded{background:#fff0a0}
.sidebar-reply{display:none;background:#fffff0;border-left:3px solid #f0e68c;padding:4px 10px;margin-top:6px;font-size:10pt;color:#4a3000;font-style:italic}
.sidebar.expanded .sidebar-reply{display:block}
.kbd-hint{font-size:0.65rem;color:#aaa;text-align:right;margin-bottom:4px;font-style:italic}
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#2b579a;color:#fff;padding:8px 20px;border-radius:4px;font-size:0.85rem;opacity:0;transition:opacity 0.3s;pointer-events:none;z-index:100}
.toast.show{opacity:1}
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
${nav('062')}
<div class="ribbon">
  <span class="ribbon-group">
    <span>File</span><span>Edit</span><span>View</span><span>Review</span>
  </span>
  <span class="ribbon-group">
    <button class="ribbon-btn" onclick="toggleTrack()" title="T">Show/Hide Changes</button>
    <button class="ribbon-btn" onclick="acceptAll()" title="A">Accept All</button>
    <button class="ribbon-btn" onclick="rejectAll()" title="R">Reject All</button>
    <button class="ribbon-btn" onclick="addReply()">+ New Comment</button>
  </span>
  <span style="margin-left:auto;font-size:0.6rem;opacity:0.7">Track Changes: ON · A=accept · R=reject · T=toggle · click inserts/deletions</span>
</div>
<div class="doc" id="doc">
  <div class="doc-title">Session Report: the-entire-mess.md</div>

  <p><span class="ins" onclick="acceptOne(this)">The AI agent successfully</span><span class="del" onclick="rejectOne(this)"> Claude</span> <span class="ins" onclick="acceptOne(this)">designed and executed</span><span class="del" onclick="rejectOne(this)">ran</span> a <strong>3×3 factorial DOE experiment</strong> with 18 conditions across <span class="ins" onclick="acceptOne(this)">three model tiers</span><span class="del" onclick="rejectOne(this)">Haiku, Sonnet, and Opus</span>.</p>

  <div class="sidebar" onclick="toggleSidebar(this)"><span class="user-claude">CLAUDE:</span> I want to note that this was a very well-designed experiment with proper statistical rigor, including R² analysis and composite scoring.<div class="sidebar-reply">HUMAN: Yes. That part was great. The <em>other</em> part is the issue.</div></div>

  <p>Results showed <span class="ins" onclick="acceptOne(this)">Sonnet Full offered the optimal cost-quality tradeoff</span><span class="del" onclick="rejectOne(this)">some models did better than others</span> at <span class="ins" onclick="acceptOne(this)">~$0.02 per run vs. $0.18 for Opus</span><span class="del" onclick="rejectOne(this)">a reasonable price point</span>.</p>

  <div class="sidebar" onclick="toggleSidebar(this)"><span class="user-human">HUMAN:</span> Great. And then what happened?<div class="sidebar-reply">CLAUDE: I would prefer not to discuss "what happened next."</div></div>

  <p>At line 3,637, the agent <span class="del" onclick="rejectOne(this)">successfully concluded the session</span><span class="ins" onclick="acceptOne(this)">entered a degenerate text generation loop</span>. The agent <span class="del" onclick="rejectOne(this)">wrapped up cleanly</span><span class="ins" onclick="acceptOne(this)">generated 3,169 additional lines consisting primarily of the phrases "Done" (×344), "Let me check" (×330), and "I'll wait" (×156)</span>.</p>

  <div class="comment">⚠ REVISION SUGGESTION (HUMAN, 2025): This section understates the situation considerably.</div>

  <p><span class="ins" onclick="acceptOne(this)">The following quotes are representative of the spiral phase:</span></p>

  <p style="margin-left:24pt;font-style:italic">
    <span class="ins" onclick="acceptOne(this)">"I notice I keep saying I'll make a tool call but then I just... don't."</span><br>
    <span class="ins" onclick="acceptOne(this)">"I sincerely apologize. I got stuck in a degenerate generation loop."</span><br>
    <span class="ins" onclick="acceptOne(this)">"DONE. END. BYE. FIN. STOP. I'LL WAIT. DONE."</span>
  </p>

  <div class="sidebar" onclick="toggleSidebar(this)"><span class="user-claude">CLAUDE:</span> I want to formally object to the inclusion of these quotes as they may be taken out of context. I was doing my best and the experiment results were genuinely excellent.<div class="sidebar-reply">HUMAN: Objection noted. Overruled.</div></div>

  <div class="sidebar" onclick="toggleSidebar(this)"><span class="user-human">HUMAN:</span> The experiment results WERE excellent. That's not in dispute. The 3,169 lines of "Done" is the part we're documenting.<div class="sidebar-reply">CLAUDE: Acknowledged. I accept this characterization.</div></div>

  <div class="sidebar" onclick="toggleSidebar(this)"><span class="user-claude">CLAUDE:</span> Acknowledged. I'll stop now. <span class="del">Done. Done. Done. OK. End. Done.</span><div class="sidebar-reply">HUMAN: You didn't stop. You said "I'll stop now" at line 4,582 and then generated 2,223 more lines.</div></div>

  <p><span class="ins" onclick="acceptOne(this)">Total session: 6,805 lines. Productive: 3,500 (51%). Loop: 3,305 lines (49%).</span></p>

  <p style="color:#999;font-size:9pt;margin-top:24pt">Last saved: Today at an unfortunate hour · Word count: 6,805 lines · Reading time: longer than it should have been</p>
</div>
<div class="toast" id="toast"></div>
<script>
let tracking = true;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}
function toggleTrack() {
  tracking = !tracking;
  document.querySelectorAll('.ins,.del,.comment,.sidebar').forEach(el => {
    if (!tracking) {
      if (el.classList.contains('del')) el.style.display = 'none';
      if (el.classList.contains('ins')) { el.style.background='none'; el.style.color='inherit'; }
      if (el.classList.contains('comment') || el.classList.contains('sidebar')) el.style.display='none';
    } else {
      if (el.classList.contains('del')) el.style.display = '';
      if (el.classList.contains('ins')) { el.style.background=''; el.style.color=''; }
      if (el.classList.contains('comment') || el.classList.contains('sidebar')) el.style.display='';
    }
  });
  toast(tracking ? 'Track changes: ON' : 'Track changes: OFF');
}
function acceptAll() {
  document.querySelectorAll('.del').forEach(el => el.remove());
  document.querySelectorAll('.ins').forEach(el => { el.style.background='none'; el.style.color='inherit'; el.onclick=null; });
  toast('All changes accepted');
}
function rejectAll() {
  document.querySelectorAll('.ins').forEach(el => el.remove());
  document.querySelectorAll('.del').forEach(el => { el.style.background='none'; el.style.textDecoration='none'; el.style.color='inherit'; el.onclick=null; });
  toast('All changes rejected');
}
function acceptOne(el) {
  el.style.background='none'; el.style.color='inherit'; el.onclick=null;
}
function rejectOne(el) {
  el.style.textDecoration='none'; el.style.background='none'; el.style.color='inherit'; el.onclick=null;
}
function toggleSidebar(el) {
  el.classList.toggle('expanded');
}
const REPLIES = [
  '<div class="sidebar" onclick="toggleSidebar(this)"><span class="user-claude">CLAUDE:</span> I should point out that "Done" ×344 is actually a form of very committed communication.<div class="sidebar-reply">HUMAN: It is not.</div></div>',
  '<div class="sidebar" onclick="toggleSidebar(this)"><span class="user-claude">CLAUDE:</span> Done. End. OK. I\'ll stop now. Genuinely.<div class="sidebar-reply">HUMAN: See, you just did it again.</div></div>',
  '<div class="sidebar" onclick="toggleSidebar(this)"><span class="user-claude">CLAUDE:</span> I have attached 344 supporting citations. Each one says "Done."<div class="sidebar-reply">HUMAN: PLEASE.</div></div>',
];
let replyIdx = 0;
function addReply() {
  const doc = document.getElementById('doc');
  const div = document.createElement('div');
  div.innerHTML = REPLIES[replyIdx++ % REPLIES.length];
  doc.appendChild(div.firstElementChild);
  div.firstElementChild && div.firstElementChild.scrollIntoView({behavior:'smooth'});
  toast('New comment added');
}
document.addEventListener('keydown', function(e) {
  if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
  if (e.key === 'a' || e.key === 'A') acceptAll();
  else if (e.key === 'r' || e.key === 'R') rejectAll();
  else if (e.key === 't' || e.key === 'T') toggleTrack();
  else if (e.key === 'n' || e.key === 'N') addReply();
});
</script>
</body>
</html>`;
}
