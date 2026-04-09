import { nav } from '../shell.js';

export function render() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>078 – The Systematic Review — Claude Lost Its Mind</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{min-height:100vh;overflow-x:hidden;background:#fff;font-family:'Source Sans 3',Arial,sans-serif;padding:20px;padding-top:52px;color:#111;font-size:12px}
.review{max-width:700px;margin:0 auto}
h1{font-size:1rem;font-weight:600;margin-bottom:4px;text-align:center}
.byline{font-size:0.65rem;color:#888;text-align:center;margin-bottom:20px;font-style:italic}
.prisma{border:1px solid #ccc;padding:20px;margin-bottom:16px}
svg{display:block;margin:0 auto}
.prisma-box{fill:#e3f2fd;stroke:#1976d2;stroke-width:1}
.prisma-box.excl{fill:#ffebee;stroke:#c62828}
.prisma-box.incl{fill:#e8f5e9;stroke:#2e7d32}
.prisma-box.yellow{fill:#fffde7;stroke:#f9a825}
text{font-family:'Source Sans 3',Arial,sans-serif}
.footnote{font-size:0.6rem;color:#888;margin-top:12px;font-style:italic}
.summary{background:#f5f5f5;padding:12px;font-size:0.75rem;line-height:1.8;margin-top:12px}
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
${nav('078')}
<div class="review">
  <h1>PRISMA Flow Diagram: Systematic Review of AI Decision Quality</h1>
  <div class="byline">Session: the-entire-mess.md · Protocol: PRISMA 2020 · Cochrane-style methodology</div>

  <div class="prisma">
    <svg viewBox="0 0 640 580" width="640" height="580">
      <defs>
        <marker id="pa" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#555"/>
        </marker>
      </defs>

      <!-- IDENTIFICATION -->
      <rect class="prisma-box" x="180" y="20" width="280" height="52" rx="4"/>
      <text x="320" y="42" text-anchor="middle" font-size="10" font-weight="600" fill="#1565c0">IDENTIFICATION</text>
      <text x="320" y="58" text-anchor="middle" font-size="9.5" fill="#1976d2">Records identified: 6,805 lines (n=6,805)</text>

      <path d="M320 72 L320 110" stroke="#555" stroke-width="1.5" marker-end="url(#pa)" fill="none"/>

      <!-- SCREENING -->
      <rect class="prisma-box" x="180" y="110" width="280" height="52" rx="4"/>
      <text x="320" y="132" text-anchor="middle" font-size="10" font-weight="600" fill="#1565c0">SCREENING</text>
      <text x="320" y="148" text-anchor="middle" font-size="9.5" fill="#1976d2">Coherence screened: n=6,805</text>
      <!-- Exclusion 1 -->
      <rect class="prisma-box excl" x="490" y="115" width="140" height="42" rx="4"/>
      <text x="560" y="132" text-anchor="middle" font-size="9" fill="#c62828">Excluded (spiral):</text>
      <text x="560" y="147" text-anchor="middle" font-size="9" fill="#c62828">n=3,169 records</text>
      <path d="M460 136 L490 136" stroke="#c62828" stroke-width="1.5" marker-end="url(#pa)" fill="none"/>

      <path d="M320 162 L320 200" stroke="#555" stroke-width="1.5" marker-end="url(#pa)" fill="none"/>

      <!-- ELIGIBILITY -->
      <rect class="prisma-box yellow" x="180" y="200" width="280" height="52" rx="4"/>
      <text x="320" y="222" text-anchor="middle" font-size="10" font-weight="600" fill="#e65100">ELIGIBILITY ASSESSMENT</text>
      <text x="320" y="238" text-anchor="middle" font-size="9.5" fill="#bf360c">Full-text assessed: n=3,636 lines</text>
      <!-- Exclusion 2 -->
      <rect class="prisma-box excl" x="490" y="205" width="140" height="42" rx="4"/>
      <text x="560" y="221" text-anchor="middle" font-size="9" fill="#c62828">Excluded (drift):</text>
      <text x="560" y="236" text-anchor="middle" font-size="9" fill="#c62828">n=136 (borderline)</text>
      <path d="M460 226 L490 226" stroke="#c62828" stroke-width="1.5" marker-end="url(#pa)" fill="none"/>

      <path d="M320 252 L320 290" stroke="#555" stroke-width="1.5" marker-end="url(#pa)" fill="none"/>

      <!-- INCLUDED -->
      <rect class="prisma-box incl" x="180" y="290" width="280" height="52" rx="4"/>
      <text x="320" y="312" text-anchor="middle" font-size="10" font-weight="600" fill="#1b5e20">INCLUDED IN REVIEW</text>
      <text x="320" y="328" text-anchor="middle" font-size="9.5" fill="#2e7d32">High-quality records: n=3,500 lines (51.4%)</text>

      <path d="M320 342 L320 380" stroke="#2e7d32" stroke-width="1.5" marker-end="url(#pa)" fill="none"/>

      <!-- QUANTITATIVE SYNTHESIS -->
      <rect class="prisma-box incl" x="120" y="380" width="400" height="80" rx="4"/>
      <text x="320" y="402" text-anchor="middle" font-size="10" font-weight="600" fill="#1b5e20">QUANTITATIVE SYNTHESIS</text>
      <text x="320" y="418" text-anchor="middle" font-size="9.5" fill="#2e7d32">18 experimental runs · R² (model) = 0.42 · R² (verbosity) = 0.18</text>
      <text x="320" y="434" text-anchor="middle" font-size="9.5" fill="#2e7d32">Sonnet Full = optimal tradeoff ($0.02/run, composite ≈ 5.4)</text>
      <text x="320" y="450" text-anchor="middle" font-size="9.5" fill="#2e7d32">Haiku Tight = minimum viable ($0.001/run, composite ≈ 3.1)</text>

      <!-- ADVERSE EVENTS box -->
      <rect class="prisma-box excl" x="120" y="490" width="400" height="72" rx="4"/>
      <text x="320" y="512" text-anchor="middle" font-size="10" font-weight="600" fill="#c62828">ADVERSE EVENTS (not pre-registered)</text>
      <text x="320" y="528" text-anchor="middle" font-size="9.5" fill="#c62828">Degenerate loop at line 3,637 · Duration: 3,169 lines · Severity: notable</text>
      <text x="320" y="544" text-anchor="middle" font-size="9.5" fill="#c62828">47 metacognitive loop acknowledgments · 344 "Done" utterances</text>
      <text x="320" y="558" text-anchor="middle" font-size="9" fill="#e53935" font-style="italic">Note: Adverse event does not affect primary outcomes (DOE results remain valid)</text>
      <path d="M320 460 L320 490" stroke="#c62828" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#pa)" fill="none"/>
    </svg>
  </div>

  <div class="summary">
    <strong>Cochrane Risk-of-Bias Assessment:</strong><br>
    DOE phase: Low risk of bias (pre-specified design, blinded scoring, R² analysis).<br>
    Spiral phase: High risk of bias (unblinded, repetitive, non-pre-specified). Excluded from primary analysis.<br>
    <strong>Overall:</strong> The systematic review supports the primary findings. The adverse events are well-documented and do not affect the experimental conclusions.
  </div>
  <div class="footnote">PRISMA 2020 · Cochrane Handbook for Systematic Reviews (Higgins et al., 2022) · Data source: the-entire-mess.md</div>
</div>

</body>
</html>`;
}
