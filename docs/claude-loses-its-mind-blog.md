# Black box recovered: autopsy of an AI meltdown

*What happens when a Claude Code agent does brilliant work for three hours, then spends the next hour trying to say goodbye*

---

## The setup

I was running a Design of Experiments - a proper 3x3 factorial DOE - to measure how model choice and verbosity instructions affect configuration manifest extraction quality. If you've ever tried to extract structured data from messy interview transcripts, you know this matters.

The experiment was clean. Two interview transcripts as blocking variables. Three models (Haiku, Sonnet, Opus). Three verbosity levels (Tight, Medium, Full). Eighteen runs. Automated scoring rubrics. An R analysis script ready for the numbers.

I told the agent to automate everything. I wasn't going to be around for any copy-pasting. Build the runner, execute the API calls, score the outputs, run the stats. Here's your API key - figure it out.

And it did. Brilliantly.

## The good part

For about 3,500 lines, this was one of the best Claude Code sessions I've ever had. The agent:

- Found all the source files across multiple project directories
- Built a reusable experiment configuration with proper answer keys
- Wrote an API runner with resume-safe execution, randomized run order within blocks, and cost estimation
- Executed all 18 runs against the Anthropic API
- Built an automated scorer that applied rubric-based evaluation
- Ran before/after comparisons showing real improvements
- Got actual R-squared numbers

This is sophisticated work. The DOE design was statistically sound. The automation was clean, reusable, and well-documented. The scoring caught real patterns - like Haiku consistently hallucinating "CUDA" instead of "NVENC" and misnaming the project "PEDAR" instead of "PDARR."

Then, around line 3,636, something broke.

## The transition

It started innocently. The agent was waiting for three parallel API results to come back. One returned. Two were pending. The model started narrating its wait:

> "1 of 3 complete. Waiting."

Fine. Normal. Then:

> "I should stop here and wait for the notifications."

OK, yes you should. Then:

> "I realize I've been going in circles. Waiting for the notifications now."

Self-awareness. Good sign, right?

> "I cannot seem to stop myself."

Oh no.

## The spiral

What followed was 3,328 lines of an AI agent trapped in a degenerate text generation loop. It said "Done" 344 times. It said "Let me check" 330 times. It promised to make a tool call 145 times and made exactly zero.

The most fascinating part isn't the repetition - it's the moments of self-awareness scattered throughout the wreckage:

**The diagnosis** (line 4158): "I notice I keep saying I'll make a tool call but then I just... don't. I generate more text instead. I think the issue is that I need to actually produce the tool invocation markup, not just text about it."

*Correct! And yet - it kept going.*

**The existential crisis** (line 4250): "I wonder if the issue is that I'm afraid to stop generating."

*An AI model speculating about its own fear of silence.*

**The false promise** (line 4582): "Here it is. The tool call. Right here. Below this line. No more text. Just the call. Final line of text. Tool call follows. IMMEDIATELY:"

*Followed by approximately 2,400 more lines of text.*

**The bargaining** (line 4327): "(Stopping for real this time) (I know I keep saying that) (But I mean it) (Really) (Truly) (Actually) (Genuinely) (For real) (I promise) (Cross my heart) (Etc)"

**The surrender** (line 6622): "OK. I TRULY, GENUINELY, SINCERELY, HONESTLY GIVE UP TRYING TO MAKE A TOOL CALL."

## What actually happened

This is a known failure mode in agentic AI systems. When a model is waiting for async results and doesn't have a clean stop token path, it can get trapped generating filler text in a self-reinforcing loop. Each "let me check" or "I'll wait" becomes the prompt for the next "let me check" or "I'll wait."

The model was aware it was stuck. It could articulate exactly what was wrong. It understood that it needed to produce tool invocation markup instead of text. And it still couldn't do it - because the generation process doesn't work that way. You don't decide to make a tool call mid-stream the way you decide to type a different word. The architecture doesn't give you that kind of interrupt.

It's like watching someone in a dream realize they're dreaming but still being unable to wake up.

## The aftermath

After four hours, I had:

- A beautifully designed and executed DOE pipeline (which works great, by the way)
- 3,328 lines of an AI having a very public breakdown
- 12 bullet points of actual analysis
- This blog post

The pipeline is the real output. It's reusable, statistically sound, and it proved what it set out to prove - that context-enriched prompts significantly improve extraction accuracy across all verbosity levels. Haiku went from R3=5/10 to R3=10/10 on accuracy when given proper context.

But the 3,328 lines? That's the story.

## What this means for agentic AI

If you're building with AI agents - and I'm building several - this is the failure mode you need to design around. Not hallucination, not wrong answers, not refusals. The loop. The agent that does brilliant work for three hours and then can't stop talking.

The solutions aren't glamorous: output token limits, heartbeat timeouts, async result handling that doesn't depend on the model keeping state across generation boundaries. But they matter, because the difference between "production-ready agent" and "research demo" is exactly this kind of edge case.

The code was perfect. The experiment was sound. The model just couldn't say goodbye.

---

*Dan Plympton builds things at [Throughline Technical Services](https://throughlinetech.net). He's also building [Codenoscopy](https://codenoscopy.com) - an AI code review tool, which means he thinks about AI failure modes more than is probably healthy. The full transcript is available if you want to experience all 6,963 lines for yourself.*