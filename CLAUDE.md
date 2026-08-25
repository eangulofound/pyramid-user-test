# The Pyramid — project context

## What this is

A metabolic-care intake experience for Found (joinfound.com). A short quiz sorts a
member into a 3-layer pyramid — **Weight care** (base) → **Hormone care** (middle)
→ **Peptides / prevention** (top) — and tells her where to start. We're testing
**3 different capture mechanics** for the same underlying quiz, to see which one
performs best with real users.

## The end goal

Turn the 3 static HTML drafts into **fully functional, testable prototypes**:

- A real person can open each prototype and actually answer with their own input
  (not just watch a scripted demo).
- All 3 prototypes must run the **exact same underlying question logic** (see
  `Quiz/Question Story.md`) and produce the **exact same kind of Result** (see
  `Quiz/Result Content.md`) — only how the questions are asked/answered differs.
- **Mobile-first**, but should not break on desktop. Don't over-engineer
  responsiveness — a simple `max-width` on the device container so it doesn't
  stretch full-bleed on wide screens is enough.

## Folder structure

### `Drafts/`

The 3 starting-point HTML files — visual/interaction concepts, not yet wired to
real input. Each is a self-contained HTML file (same design system/CSS, same
Introduction and Result screens) that only differs in the **Capture** step:

| File | Capture mechanic | Notes |
|---|---|---|
| `Pyramid_Option_1.html` | **Conversation** — she types or speaks free-form answers to Found | Hardest to build: needs real text/voice input handling, parsing (e.g. free-text age, height/weight, yes/no intent, negation), not just scripted playback. |
| `Pyramid_Option_2.html` | **Quiz** ("The Note-Taker") — Duolingo-style, tap a chip/option per question | Simplest to make functional — closest to a standard multiple-choice quiz. |
| `Pyramid_Option_3.html` | **Madlib** — one sentence about her with blanks; she taps a blank, picks a word, it fills in | Simple — similar complexity to Option 2, just a different visual metaphor for the same taps. |

All 3 currently share identical CSS and the same Intro/Result markup — only the
middle "Capture" scene's markup/JS differs between them.

### `Quiz/`

- **`Question Story.md`** — the master script. This is the single source of truth
  for *what gets asked, in what order, what each answer fills, and what Found says
  back*. It's written as 4 linear paths (based on her first answer to the opener)
  so it's easy to follow start to finish. **The underlying logic and information
  captured must be identical across all 3 options** — same questions, same signals
  filled (Weight/Hormone/Peptides), same branching rules. What can (and should)
  differ is *presentation*: Option 1 phrases things as natural conversational
  turns (text/voice), Options 2/3 phrase the same questions as tappable chips or
  blanks. Don't reduce or simplify the underlying question logic when adapting it
  to Option 1 or 3 — only reword/re-present it for that capture mechanic.

- **`Result Content.md`** — a **content guide** for the Result screen, not
  copy-paste-ready final copy. It maps all 10 possible outcomes (combinations of
  Weight/Hormone/Peptides yes-no + named priority) to a headline, a oneliner, and
  a status (Start here / Worth watching / Later, and that's good news / Steady)
  per pyramid layer, each with reusable why-text. When writing the actual
  on-screen copy for the Result step, use this as the direction/intent, not a
  literal script — but don't drift from the brand voice rules below while doing
  it.

## Brand voice — applies to any copy you write or touch

Found's tone of voice has 4 pillars. Apply all 4:

1. **Empathetic & Non-Judgmental** — never implies fault, never makes one answer
   feel like the "better" one.
2. **Scientifically Grounded** — specific, not vague; no invented claims.
3. **Honest & Transparent** — honest expectations, hedge instead of promising
   ("tends to", "may ease" — never "guaranteed").
4. **Warm & Personal** — second person ("you", "your body", "your plan"); lead
   with the member, not the product/system (say "you start here", not "we start
   you here"; avoid describing her in system terms like "sorted" or "signals").

**Avoided vocabulary — never use:** diet, obesity, obese, guaranteed, just,
simply, patients, quick fix.

**Other rules:**
- Short, direct sentences.
- Be specific — avoid vague reassurance.
- CTA language is invitational, never pushy.
- React and question never share a screen — the react is a separate beat.
- A question can only *point at* what she already said, never quote/repeat her
  words back verbatim.
- The pyramid, its name, and the 3 layer names stay invisible until the Result
  screen.

## Known state / decisions already made

- The 3 HTML drafts' `<title>` tags were already fixed to match their `<h1>`
  (Option 1 / 2 / 3, in that order — no more "Option 3"/"Option 4" mislabeling).
- `Question Story.md` already resolved a few content bugs worth knowing about if
  you touch it further: the "peptides/prevention" question can't use
  "get ahead of it" framing right after she's already named an active complaint
  (contradiction — fixed by branching the wording by context); "as they come" was
  changed to "if they come" (don't presuppose problems are coming).
