import { nav } from '../shell.js';
import { SCORES, ALL_RUNS } from '../data.js';

export function render() {
  // Map scores to notes (R3 composite → MIDI pitch)
  const noteData = ALL_RUNS.map(run => {
    const s = SCORES[run];
    const composite = s.reduce((a, b) => a + b, 0) / 6;
    // Map 0-10 to MIDI 48-72 (C3-C5)
    const midi = Math.round(48 + (composite / 10) * 24);
    return { run, midi, composite: composite.toFixed(2) };
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>085 – Sheet Music — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#fffef8;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:20px;font-family:'Crimson Pro',Georgia,serif;padding-top:52px}
h1{font-size:0.7rem;letter-spacing:0.1em;color:#888;text-transform:uppercase;margin-bottom:2px;text-align:center}
.sub{font-size:0.65rem;color:#bbb;margin-bottom:12px;text-align:center;font-style:italic}
.sheet{background:#fffef8;max-width:700px;width:100%;padding:20px}
.piece-title{font-size:1.2rem;text-align:center;margin-bottom:4px}
.piece-meta{font-size:0.7rem;text-align:center;color:#888;margin-bottom:16px;font-style:italic}
canvas{display:block;width:100%}
.program-note{font-size:0.7rem;color:#555;line-height:1.8;margin-top:16px;font-style:italic;border-top:1px solid #eee;padding-top:12px}
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

<style>
  @keyframes subtleBreathe {
    0% { filter: brightness(1); }
    50% { filter: brightness(0.95); }
    100% { filter: brightness(1); }
  }
  body { animation: subtleBreathe 8s ease-in-out infinite; }
</style>
</head>
<body>
${nav('085')}
<div class="sheet">
  <h1>085 — Sheet Music</h1>
  <div class="sub">DOE composite scores → melody · R² analysis → harmony</div>
  <div class="piece-title">Sonata for AI in C Minor</div>
  <div class="piece-meta">Op. 3637 · "The Experiment &amp; Its Aftermath" · Arranged from the-entire-mess.md</div>
  <canvas id="staff" height="320"></canvas>
  <div class="program-note">
    Program note: The melodic line derives from 18 experiment runs mapped to diatonic pitches via composite score. The first movement (measures 1–12) ascends as the DOE reveals Opus Full's superiority; the second movement (measures 13–18) descends to the tonic as Sonnet Full's cost-efficiency is confirmed. The final two measures represent the beginning of the spiral — a single repeated note, unresolved, diminuendo al niente.
  </div>
</div>
<script>
const NOTE_DATA = ${JSON.stringify(noteData)};
const canvas = document.getElementById('staff');
const ctx = canvas.getContext('2d');
const W = canvas.offsetWidth || 660;
const H = 320;
canvas.width = W; canvas.height = H;

// 5-line staff
const STAFF_LINES = 5;
const LINE_SPACING = 12;
const STAFF_TOP = 60;
const STAFF_LEFT = 60;
const STAFF_WIDTH = W - 80;
const NOTE_SPACING = STAFF_WIDTH / (NOTE_DATA.length + 3);

// MIDI to staff position (middle C = 60 = line 0 from bottom of treble clef)
function midiToStaff(midi) {
  // Treble clef: E4=64 on first line, G4=67 on second line, etc.
  // C4=60 is below staff; each step = half line_spacing
  const noteNames = ['C','D','E','F','G','A','B'];
  const octave = Math.floor(midi / 12) - 1;
  const note = midi % 12;
  // Simplified: map to staff line offset from middle
  const chromatic = [0, 0.5, 1, 1.5, 2, 3, 3.5, 4, 4.5, 5, 5.5, 6];
  const diatonic = chromatic[note] + (octave - 4) * 3.5;
  return diatonic;
}

function drawStaff(y) {
  ctx.strokeStyle = '#333'; ctx.lineWidth = 0.8;
  for (let i = 0; i < STAFF_LINES; i++) {
    const ly = y + i * LINE_SPACING;
    ctx.beginPath(); ctx.moveTo(STAFF_LEFT, ly); ctx.lineTo(STAFF_LEFT + STAFF_WIDTH, ly); ctx.stroke();
  }
  // Clef (treble — simplified)
  ctx.fillStyle = '#333'; ctx.font = '52px serif';
  ctx.textBaseline = 'top';
  ctx.fillText('𝄞', STAFF_LEFT - 8, y - 18);
  // Time sig
  ctx.font = 'bold 20px serif'; ctx.textAlign = 'center';
  ctx.fillText('3', STAFF_LEFT + 28, y);
  ctx.fillText('4', STAFF_LEFT + 28, y + LINE_SPACING * 2);
}

function drawNote(x, staffY, noteOffset, col, label) {
  const noteY = staffY + (STAFF_LINES - 1) * LINE_SPACING - noteOffset * LINE_SPACING / 2;
  const r = LINE_SPACING * 0.55;

  // Stem
  const stemDir = noteOffset > 2 ? -1 : 1;
  ctx.strokeStyle = col; ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(x + r, noteY);
  ctx.lineTo(x + r, noteY - stemDir * LINE_SPACING * 3.5);
  ctx.stroke();

  // Note head
  ctx.beginPath();
  ctx.ellipse(x, noteY, r * 1.1, r * 0.75, -0.3, 0, Math.PI * 2);
  ctx.fillStyle = col; ctx.fill();

  // Ledger lines if outside staff
  if (noteOffset < 0) {
    for (let l = -1; l >= Math.floor(noteOffset / 2) * 2; l -= 2) {
      const ly = staffY + (STAFF_LINES - 1) * LINE_SPACING - l * LINE_SPACING / 2;
      ctx.beginPath(); ctx.moveTo(x - r * 1.8, ly); ctx.lineTo(x + r * 2.2, ly);
      ctx.strokeStyle = '#666'; ctx.lineWidth = 0.8; ctx.stroke();
    }
  }

  // Label below
  ctx.fillStyle = col === '#333' ? '#aaa' : col;
  ctx.font = '7px Crimson Pro, serif'; ctx.textAlign = 'center';
  ctx.fillText(label, x, staffY + STAFF_LINES * LINE_SPACING + 10);
}

ctx.fillStyle = '#fffef8'; ctx.fillRect(0, 0, W, H);

// Two staves: productive + spiral
const STAFF1_Y = 50;
const STAFF2_Y = 200;

drawStaff(STAFF1_Y);
drawStaff(STAFF2_Y);

// Measure divisions for first staff (18 notes)
const productiveNotes = NOTE_DATA.slice(0, 12);
const spiralNotes = NOTE_DATA.slice(12);

productiveNotes.forEach((note, i) => {
  const x = STAFF_LEFT + 55 + i * ((STAFF_WIDTH - 60) / productiveNotes.length);
  const pos = midiToStaff(note.midi);
  const isHigh = note.composite > 5;
  drawNote(x, STAFF1_Y, pos, isHigh ? '#1a4a8a' : '#4a6a9a', note.run.substring(0, 5));
});

spiralNotes.forEach((note, i) => {
  const x = STAFF_LEFT + 55 + i * ((STAFF_WIDTH - 60) / Math.max(1, spiralNotes.length));
  const pos = midiToStaff(note.midi);
  drawNote(x, STAFF2_Y, pos, '#8a2020', note.run.substring(0, 5));
});

// Tempo marking
ctx.fillStyle = '#555'; ctx.font = 'italic 10px Crimson Pro, serif'; ctx.textAlign = 'left';
ctx.fillText('Moderato con rigore (♩= 120)', STAFF_LEFT, STAFF1_Y - 28);
ctx.fillText('Spirale accelerando (then never stopping)', STAFF_LEFT, STAFF2_Y - 28);

// Section labels
ctx.fillStyle = '#888'; ctx.font = '9px Crimson Pro, serif';
ctx.fillText('I. The Experiment (18 runs, 6 metrics each)', STAFF_LEFT, STAFF1_Y - 8);
ctx.fillText('II. The Aftermath (unplanned coda, 3,169 lines)', STAFF_LEFT, STAFF2_Y - 8);
</script>

<script>
  window.addEventListener('resize', () => {
    const cvs = document.querySelector('canvas');
    if(cvs && cvs.style.width === '100%') return; // already handled by css
    if(cvs && !cvs.dataset.fixedOut) {
      cvs.width = window.innerWidth;
      cvs.height = window.innerHeight;
    }
  });
</script>

</body>
</html>`;
}
