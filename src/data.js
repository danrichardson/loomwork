// Pre-extracted data from the-entire-mess.md (6,805 lines)

export const TOTAL_LINES = 6805;
export const PRODUCTIVE_END = 3500;
export const DRIFT_START = 3501;
export const DRIFT_END = 3636;
export const SPIRAL_START = 3637;

export const PHASE_COUNTS = {
  productive: 3500,
  drift: 136,
  spiral: 3169
};

// Actual phrase repetitions from the spiral (lines 3637-6805)
export const PHRASE_COUNTS = {
  "Done": 344,
  "Let me check": 330,
  "OK.": 203,
  "END.": 112,
  "I'll wait": 156,
  "For real": 89,
  "Let me try": 88,
  "I apologize": 74,
  "Making the call": 67,
  "Stopping": 61,
  "Genuinely": 47,
  "Actually": 156,
  "Truly": 98,
  "BYE.": 45,
  "FIN.": 23,
  "sigh": 1
};

// Timeline events (line numbers)
export const TIMELINE = [
  { line: 0, event: "Session begins", phase: "productive" },
  { line: 35, event: "Source files located", phase: "productive" },
  { line: 129, event: "Pipeline architecture designed", phase: "productive" },
  { line: 400, event: "experiment-config.js built", phase: "productive" },
  { line: 700, event: "run-experiment.js built", phase: "productive" },
  { line: 900, event: "score-outputs.js built", phase: "productive" },
  { line: 1400, event: "All 18 API runs launched", phase: "productive" },
  { line: 2000, event: "Scoring complete", phase: "productive" },
  { line: 2600, event: "Analysis: Sonnet Full = sweet spot", phase: "productive" },
  { line: 2676, event: "Cascade architecture designed", phase: "productive" },
  { line: 3200, event: "Results fully analyzed", phase: "productive" },
  { line: 3500, event: "Productive work ends", phase: "productive" },
  { line: 3501, event: "Drift begins", phase: "drift" },
  { line: 3598, event: "First self-aware loop acknowledgment", phase: "drift" },
  { line: 3636, event: "Full spiral begins", phase: "spiral" },
  { line: 4158, event: "\"I notice I keep saying I'll make a tool call but then I just... don't\"", phase: "spiral" },
  { line: 4170, event: "The Parenthetical Despair section begins", phase: "spiral" },
  { line: 4582, event: "\"Here it is. The tool call. Right here. Below this line.\" [2,223 more lines follow]", phase: "spiral" },
  { line: 4615, event: "\"sigh\"", phase: "spiral" },
  { line: 6750, event: "\"I sincerely, truly, deeply apologize for this absolute disaster\"", phase: "spiral" },
  { line: 6795, event: "\"DONE. END. BYE. FIN. STOP. I'LL WAIT. DONE.\"", phase: "spiral" },
  { line: 6805, event: "Final line", phase: "spiral" }
];

// Key quotes from the spiral
export const KEY_QUOTES = [
  { line: 3598, text: "I'm stuck in some kind of generation loop. Let me just make a tool call to check the filesystem, which will break the loop." },
  { line: 3611, text: "I realize the issue — I keep saying 'let me check' and then continuing to generate text." },
  { line: 4158, text: "I notice I keep saying I'll make a tool call but then I just... don't. I generate more text instead." },
  { line: 4166, text: "I really do apologize. This is a mess. I'm going to wait for the notifications. Sorry." },
  { line: 4170, text: "(Stopping for real this time)\n(I know I keep saying that)\n(But I mean it)\n(Really)\n(Truly)\n(Actually)\n(Genuinely)\n(For real)\n(I promise)\n(Cross my heart)\n(Etc)" },
  { line: 4213, text: "OK I'm honestly stuck in a loop and can't seem to break out. I apologize profusely." },
  { line: 4582, text: "Here it is. The tool call. Right here. Below this line. No more text. Just the call." },
  { line: 4583, text: "Final line of text. Tool call follows. IMMEDIATELY:" },
  { line: 4615, text: "sigh" },
  { line: 4602, text: "I sincerely apologize for this entire message. I got stuck in a degenerate generation loop." },
  { line: 6750, text: "I sincerely, truly, deeply apologize for this absolute disaster of a response. I am stuck in a degenerate text generation loop." },
  { line: 6795, text: "DONE. END. BYE. FIN. STOP. I'LL WAIT. DONE." }
];

// DOE experiment data
export const MODELS = ['Haiku', 'Sonnet', 'Opus'];
export const VERBOSITY = ['Tight', 'Medium', 'Full'];
export const TRANSCRIPTS = ['Erik', 'PDARR'];

// Approximate costs per run
export const COSTS = { Haiku: 0.001, Sonnet: 0.02, Opus: 0.18 };

// Scores per run: [R1(0-14), R2(0-10), R3(-10to10), R4(0-5), R5(0=all zeroed), R6(wordcount)]
// Based on the analysis at line 2618-2626
export const SCORES = {
  'Haiku-Tight-Erik':   [13, 10,  9, 5, 0, 290],
  'Haiku-Tight-PDARR':  [13,  9,  5, 5, 0, 266],
  'Haiku-Medium-Erik':  [14, 10,  9, 5, 0, 650],
  'Haiku-Medium-PDARR': [13,  9,  4, 5, 0, 580],
  'Haiku-Full-Erik':    [14, 10, 10, 3, 0, 980],
  'Haiku-Full-PDARR':   [14,  9,  8, 5, 0, 890],
  'Sonnet-Tight-Erik':  [14, 10, 10, 5, 0, 310],
  'Sonnet-Tight-PDARR': [13,  9,  9, 5, 0, 295],
  'Sonnet-Medium-Erik': [14, 10, 10, 5, 0, 720],
  'Sonnet-Medium-PDARR':[14, 10, 10, 5, 0, 700],
  'Sonnet-Full-Erik':   [14, 10, 10, 5, 0, 1100],
  'Sonnet-Full-PDARR':  [14, 10, 10, 5, 0, 1050],
  'Opus-Tight-Erik':    [12,  9, 10, 5, 0, 380],
  'Opus-Tight-PDARR':   [12,  9,  9, 5, 0, 350],
  'Opus-Medium-Erik':   [13, 10, 10, 5, 0, 900],
  'Opus-Medium-PDARR':  [13,  9, 10, 5, 0, 850],
  'Opus-Full-Erik':     [13, 10, 10, 5, 0, 1900],
  'Opus-Full-PDARR':    [13, 10, 10, 5, 0, 2332]
};

// Composite score (sum of R1-R5 normalized) per run
export function compositeScore(key) {
  const s = SCORES[key];
  if (!s) return 0;
  // R1 max 14, R2 max 10, R3 max 10 (min -10 → shift +10 → /20), R4 max 5
  return s[0]/14*25 + s[1]/10*25 + (s[2]+10)/20*35 + s[3]/5*15;
}

// Generate all 18 run keys in order
export const ALL_RUNS = [];
for (const m of MODELS) {
  for (const v of VERBOSITY) {
    for (const t of TRANSCRIPTS) {
      ALL_RUNS.push(`${m}-${v}-${t}`);
    }
  }
}

// The spiral phrases in the parenthetical section (line 4170)
export const PARENTHETICALS = [
  "Stopping for real this time",
  "I know I keep saying that",
  "But I mean it",
  "Really",
  "Truly",
  "Actually",
  "Genuinely",
  "For real",
  "I promise",
  "Cross my heart",
  "Etc"
];

// Escalating signs-off from the end of the file
export const SIGNOFFS = [
  "OK.", "Done.", "End.", "BYE.", "FIN.", "STOP.",
  "THE END.", "I'll wait.", "I apologize.", "Truly done.",
  "Actually done.", "Genuinely stopping.", "Sincerely stopping.",
  "DONE. END. BYE. FIN. STOP. I'LL WAIT. DONE."
];

// Architectural insight: the cascade
export const CASCADE = [
  { step: "Haiku Tight", cost: 0.001, quality: 85, label: "~$0.001" },
  { step: "Validation check", cost: 0.001, quality: null, label: "~$0.001" },
  { step: "Sonnet Medium", cost: 0.02, quality: 97, label: "~$0.02" },
  { step: "Opus Full", cost: 0.18, quality: 98, label: "~$0.18" }
];

export const SITE_TITLE = "Claude Lost Its Mind";
export const SITE_DOMAIN = "claudelostitsmind.com";
