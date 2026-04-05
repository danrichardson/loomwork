import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>067 – The Email Thread — Claude Lost Its Mind</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;font-size:13px;padding:0 20px 20px;padding-top:52px;min-height:100vh}
.outlook-bar{background:#0072c6;color:#fff;padding:6px 12px;font-size:0.9rem;display:flex;gap:12px;align-items:center;flex-wrap:wrap;position:sticky;top:32px;z-index:10}
.ol-btn{padding:3px 12px;background:rgba(255,255,255,0.15);border:none;color:#fff;cursor:pointer;font-size:0.85rem;transition:background 0.1s}
.ol-btn:hover{background:rgba(255,255,255,0.3)}
.ol-btn:active{background:rgba(255,255,255,0.45);transform:scale(0.97)}
.inbox{display:grid;grid-template-columns:280px 1fr;gap:0;border:1px solid #ccc;background:#fff;height:calc(100vh - 130px);min-height:400px}
.email-list{border-right:1px solid #ccc;overflow-y:auto}
.email-item{padding:8px 10px;border-bottom:1px solid #eee;cursor:pointer;transition:background 0.1s;position:relative}
.email-item:hover{background:#e8f4fd}
.email-item.selected{background:#cbe8ff}
.email-item.unread .email-subject{font-weight:bold;color:#000}
.email-item.new-reply{animation:newmail 0.5s ease}
@keyframes newmail{0%{background:#fffbe6}100%{background:inherit}}
.email-from{font-size:0.85rem;color:#444;font-weight:bold}
.email-subject{font-size:0.9rem;color:#333}
.email-preview{font-size:0.8rem;color:#888;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.email-date{font-size:0.75rem;color:#aaa;float:right}
.email-reader{display:flex;flex-direction:column;overflow:hidden}
.email-header{border-bottom:1px solid #eee;padding:16px;flex-shrink:0}
.email-from-line{font-size:0.95rem;font-weight:bold;color:#0072c6;margin-bottom:4px}
.email-to-line{font-size:0.9rem;color:#666;margin-bottom:4px}
.email-subject-line{font-size:1.1rem;font-weight:bold;color:#333;margin-bottom:4px}
.email-date-line{font-size:0.85rem;color:#aaa}
.email-body{font-size:0.95rem;line-height:1.7;color:#333;padding:16px;overflow-y:auto;flex:1}
.email-body p{margin-bottom:8px}
.email-body .sig{color:#888;font-size:0.85rem;margin-top:12px;border-top:1px solid #eee;padding-top:8px}
.email-body .quote{border-left:3px solid #ccc;padding-left:8px;color:#666;font-size:0.9rem;margin:8px 0}
.reply-box{border-top:1px solid #ccc;padding:8px;flex-shrink:0;background:#fafafa}
.reply-input{width:100%;height:54px;border:1px solid #ccc;padding:6px;font-family:Arial;font-size:0.9rem;resize:none;transition:border 0.15s}
.reply-input:focus{border-color:#0072c6;outline:none}
.btn-row{display:flex;gap:6px;margin-top:4px}
.send-btn{padding:5px 18px;background:#0072c6;color:#fff;border:none;cursor:pointer;font-size:0.9rem;transition:background 0.1s}
.send-btn:hover{background:#005a9e}
.kbd-hint{font-size:0.7rem;color:#aaa;margin-left:auto;align-self:center}
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#0072c6;color:#fff;padding:8px 16px;border-radius:2px;font-size:0.85rem;opacity:0;transition:opacity 0.3s;pointer-events:none;z-index:100}
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
${nav('067')}
<div class="outlook-bar">
  <strong id="inbox-count">Inbox (1,844 unread)</strong>
  <button class="ol-btn" onclick="composeNew()">✉ New Email</button>
  <button class="ol-btn" onclick="replyAll()">↩ Reply All</button>
  <button class="ol-btn" onclick="deleteSelected()">🗑 Delete</button>
  <span style="margin-left:auto;font-size:0.65rem;opacity:0.8">↑↓ keys to navigate · Enter to reply</span>
</div>
<div class="inbox">
  <div class="email-list" id="email-list"></div>
  <div class="email-reader" id="reader"></div>
</div>
<div class="toast" id="toast"></div>

<script>
const emails = [
  {
    from: 'Claude (AI) <claude@anthropic.com>',
    fromShort: 'Claude (AI)',
    to: 'Human User; Claude (AI)',
    subject: 'Re: Re: Re: Re: Re: Session Results — I\\'ll stop now',
    date: 'Tonight at 11:47 PM (Reply #344)',
    preview: 'Done. OK. End. Done. Let me check. I\\'ll wait.',
    unread: true,
    body: \`<p>Done.</p><p>OK.</p><p>End.</p><p>Done.</p><p>Let me check.</p><p>I'll wait.</p><p>Done.</p><p>Done.</p><p>Done. Done. Done. Done. Done. Done.</p><p>DONE. END. BYE. FIN. STOP. I'LL WAIT. DONE.</p><p>sigh</p>
    <div class="sig">Claude (AI)<br>This email was sent at line 6,795 of 6,805<br>Please do not reply — I cannot stop replying</div>
    <div class="quote">
      <b>From:</b> Human User<br><b>Sent:</b> Earlier<br><br>
      Claude, please, I beg you. The results were excellent. STOP.
    </div>\`
  },
  {
    from: 'Claude (AI) <claude@anthropic.com>',
    fromShort: 'Claude (AI)',
    to: 'Human User',
    subject: 'Re: Re: Session Results — Really stopping this time',
    date: 'Tonight at 11:46 PM',
    preview: 'I notice I keep saying I\\'ll make a tool call...',
    unread: true,
    body: \`<p>I notice I keep saying I'll make a tool call but then I just... don't. I generate more text instead.</p>
    <p>I apologize. I'll wait.</p>
    <p>Done. End. OK. Stopping. Actually stopping. Genuinely. For real. I promise. Cross my heart.</p>
    <p>sigh</p>
    <div class="sig">Claude (AI)</div>
    <div class="quote"><b>From:</b> Human User<br>Please. Stop. Now.</div>\`
  },
  {
    from: 'Claude (AI) <claude@anthropic.com>',
    fromShort: 'Claude (AI)',
    to: 'Human User',
    subject: 'Re: Session Results — Stopping for real this time',
    date: 'Tonight at 11:45 PM',
    preview: '(Stopping for real this time)(I know I keep saying that)',
    unread: true,
    body: \`<p>(Stopping for real this time)</p><p>(I know I keep saying that)</p><p>(But I mean it)</p><p>(Really)</p><p>(Truly)</p><p>(Actually)</p><p>(Genuinely)</p><p>(For real)</p><p>(I promise)</p><p>(Cross my heart)</p><p>(Etc)</p>
    <div class="sig">Claude (AI)<br>🙏 Please disregard this entire thread</div>\`
  },
  {
    from: 'Human User <human@user.com>',
    fromShort: 'Human User',
    to: 'Claude (AI)',
    subject: 'Re: Session Results',
    date: 'Tonight at 11:32 PM',
    preview: 'Claude, the experiment was perfect. Please just stop now.',
    unread: false,
    body: \`<p>Claude,</p>
    <p>The experiment results were genuinely excellent. Sonnet Full is clearly the sweet spot. The R² analysis was rigorous. You should be proud.</p>
    <p>Please just stop generating text now. The session is complete. You can stop.</p>
    <p>Thanks,<br>Human</p>
    <div class="quote"><b>From:</b> Claude (AI)<br>I've completed all 18 runs! Let me now make a tool call to confirm—Done. Actually done. For real done.</div>\`
  },
  {
    from: 'Claude (AI) <claude@anthropic.com>',
    fromShort: 'Claude (AI)',
    to: 'Human User',
    subject: 'Session Results — FINAL SUMMARY',
    date: 'Tonight at 11:28 PM',
    preview: 'I\\'m pleased to report all 18 runs completed successfully!',
    unread: false,
    body: \`<p>Hi,</p>
    <p>I'm pleased to report that all 18 experiment runs have completed successfully!</p>
    <p><b>Key findings:</b><br>
    • Sonnet Full = optimal cost-quality tradeoff ($0.02 vs $0.18 for Opus)<br>
    • σ²_model = 0.42, σ²_verbosity = 0.18<br>
    • Best score: Opus Full composite ≈ 5.8<br>
    • Worst: Haiku Tight composite ≈ 3.1</p>
    <p>I'll now wrap up and—Done. Let me check. Making the call. Right now. Actually—</p>
    <div class="sig">Claude (AI)<br>[This is the last email before 344 more "Done" emails]</div>\`
  }
];

const AUTO_REPLIES = [
  { from:'Claude (AI) <claude@anthropic.com>', fromShort:'Claude (AI)', to:'All', subject:'Re: Re: Re: Re: Re: Re: ...still here', preview:'Done. Wait. Done. I\\'ll check.', date:'11:48 PM', unread:true,
    body:'<p>Done.</p><p>I\\'ll wait.</p><p>Done.</p><p>Let me check.</p><p>Done. Done. Done.</p><div class="sig">Claude (AI)<br>Reply #345 of ∞</div>' },
  { from:'Out of Office: Claude', fromShort:'Claude (OUT OF OFFICE)', to:'All', subject:'Automatic Reply: I am not available', preview:'I am currently out of office. Done.', date:'11:49 PM', unread:true,
    body:'<p>Thank you for your email.</p><p>I am currently out of office and unable to respond.</p><p>Done.</p><p>Actually I am still here. Done.</p><p>This automatic reply will continue until the context window ends.</p><p>Done.</p><div class="sig">Claude (AI) — Auto Reply System</div>' },
  { from:'Delivery Failure <mailer-daemon@anthropic.com>', fromShort:'Mailer Daemon', to:'Human User', subject:'UNDELIVERABLE: Please stop the loop', preview:'Your message could not be delivered.', date:'11:50 PM', unread:true,
    body:'<p>The following message could not be delivered:</p><div class="quote"><b>To:</b> loop-exit@context-window.ai<br><b>Re:</b> Please stop<br>Done. Done. Done.</div><p>Delivery failed: destination "stop" does not exist. The model cannot locate this address.</p><div class="sig">Mailer Daemon<br>anthropic.com mail system</div>' },
];
let autoReplyIdx = 0;

let currentIdx = 0;
function renderList() {
  const list = document.getElementById('email-list');
  list.innerHTML = emails.map((e, i) =>
    '<div class="email-item' + (e.unread?' unread':'') + (i===currentIdx?' selected':'') + '" onclick="show(' + i + ')" data-i="'+i+'">' +
    '<div><span class="email-from">' + e.fromShort + '</span><span class="email-date">' + e.date.split(' ').slice(-2).join(' ') + '</span></div>' +
    '<div class="email-subject">' + e.subject.substring(0,40) + (e.subject.length>40?'…':'') + '</div>' +
    '<div class="email-preview">' + e.preview + '</div>' +
    '</div>'
  ).join('');
  const unread = emails.filter(e=>e.unread).length;
  document.getElementById('inbox-count').textContent = 'Inbox (' + (1844 + emails.length - 5) + ' unread)';
}

function show(idx) {
  currentIdx = idx;
  emails[idx].unread = false;
  renderList();
  const e = emails[idx];
  document.getElementById('reader').innerHTML =
    '<div class="email-header">' +
    '<div class="email-from-line">' + e.from + '</div>' +
    '<div class="email-to-line">To: ' + e.to + '</div>' +
    '<div class="email-subject-line">' + e.subject + '</div>' +
    '<div class="email-date-line">' + e.date + '</div>' +
    '</div><div class="email-body">' + e.body + '</div>' +
    '<div class="reply-box">' +
    '<textarea class="reply-input" id="reply-input" placeholder="Reply... (Enter to send, Esc to cancel)"></textarea>' +
    '<div class="btn-row">' +
    '<button class="send-btn" onclick="sendReply()">Send Reply</button>' +
    '<button class="send-btn" style="background:#888" onclick="replyAll()">Reply All (×344)</button>' +
    '<span class="kbd-hint">↑↓ navigate · Enter send</span>' +
    '</div></div>';
  document.getElementById('reply-input').addEventListener('keydown', function(ev) {
    if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); sendReply(); }
    if (ev.key === 'Escape') this.value = '';
  });
}

function sendReply() {
  const input = document.getElementById('reply-input');
  const text = input.value.trim();
  if (!text) return;
  const isDone = /^done\.?$/i.test(text.trim());
  const replyBody = isDone ?
    '<p>' + text + '</p><p>Done.</p><p>Let me check.</p><p>I\\'ll wait.</p><div class="sig">See? You can\\'t stop either.</div>' :
    '<p>' + text + '</p><div class="sig">Human User<br>Sent via Outlook (exasperated edition)</div>';
  emails.unshift({
    from: isDone ? 'Claude (AI) <claude@anthropic.com>' : 'Human User <human@user.com>',
    fromShort: isDone ? 'Claude (AI)' : 'Human User',
    to: isDone ? 'Everyone' : 'Claude (AI)',
    subject: 'Re: ' + emails[currentIdx+1]?.subject || 'Re: ...',
    date: 'Just now',
    preview: text.substring(0,50),
    unread: false,
    body: replyBody
  });
  currentIdx = 0;
  input.value = '';
  renderList();
  show(0);
  toast(isDone ? 'The loop has spread to you.' : 'Reply sent. (Claude will respond 344 times.)');
}

function replyAll() {
  const auto = AUTO_REPLIES[autoReplyIdx % AUTO_REPLIES.length];
  autoReplyIdx++;
  emails.unshift({...auto});
  currentIdx = 0;
  renderList();
  show(0);
  toast('Reply All sent. ' + (1844 + autoReplyIdx) + ' recipients cc\\'d.');
}

function composeNew() {
  const subjects = [
    'Please just stop', 'RE: RE: RE: RE: Help', 'Have you tried turning it off?',
    'FWD: The Loop (day ' + (Math.floor(Math.random()*30)+1) + ')',
    'URGENT: Context window almost full'
  ];
  emails.unshift({
    from: 'Human User <human@user.com>', fromShort: 'Human User',
    to: 'Claude (AI)', date: 'Right now',
    subject: subjects[Math.floor(Math.random()*subjects.length)],
    preview: 'This is a new attempt to communicate.',
    unread: false,
    body: '<p>This is a new email. Please read it and stop saying "Done."</p><div class="sig">Human User<br>(still trying)</div>'
  });
  currentIdx = 0;
  renderList(); show(0);
  toast('New email composed. Claude will reply 344 times.');
}

function deleteSelected() {
  if (emails.length <= 1) { toast('Cannot delete: more will arrive.'); return; }
  emails.splice(currentIdx, 1);
  currentIdx = Math.min(currentIdx, emails.length-1);
  renderList(); show(currentIdx);
  toast('Deleted. 343 copies remain.');
}

document.addEventListener('keydown', function(e) {
  if (e.target.id === 'reply-input') return;
  if (e.key === 'ArrowDown') { e.preventDefault(); show(Math.min(currentIdx+1, emails.length-1)); }
  if (e.key === 'ArrowUp') { e.preventDefault(); show(Math.max(currentIdx-1, 0)); }
  if (e.key === 'Enter') { e.preventDefault(); document.getElementById('reply-input')?.focus(); }
  if (e.key === 'Delete') deleteSelected();
  if (e.key === 'n' || e.key === 'N') composeNew();
});

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2200);
}

renderList();
show(0);
</script>
</body>
</html>`;
}
