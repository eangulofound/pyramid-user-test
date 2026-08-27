# The Pyramid — project context

## What this is

A metabolic-care intake experience for Found (joinfound.com). A short quiz sorts a
member into a 3-layer pyramid — **Weight care** (base) → **Hormone care** (middle)
→ **Peptides / prevention** (top) — and tells her where to start. We're testing
**3 different capture mechanics** for the same underlying quiz, to see which one
performs best with real users.

## The end goal

Three **fully scripted, linear** prototypes for a moderated user test in which
**one participant walks through all three options in sequence**:

- Participants answer **as themselves** (no fixed character, no scripted
  responses). The topic sequence is a straight line — overall health → height
  & weight → age → hormone-related changes → longevity areas — with **no
  branches**, neutral fixed reactions, and one predetermined Result:
  **Weight care**.
- The participant interacts for real — typing/speaking in Option 1, tapping
  chips in Option 2, filling blanks in Option 3 — but nothing they choose
  changes the flow, the reactions, or the Result. In Option 1 any non-empty
  answer is accepted as-is (no parsing).
- Reactions and the Result copy are word-for-word identical across the three
  prototypes (guaranteed by `Prototypes/shared/engine.js`).
- **Mobile-first**, with a `max-width` so it doesn't stretch on desktop.
  Deployed via GitHub Pages (manual web upload to the `pyramid-user-test` repo).

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

- **`Question Story.md`** — the master script (source: copy-reviewed PDF,
  Aug 2025). One shared 5-beat journey plus a per-option telling: conversation
  turns (Option 1), chips with the scripted pick marked ✓ (Option 2), and the
  madlib statement with its blanks (Option 3). Copy is final — use as written;
  adapt the interaction, not the meaning.

- **`Result Content.md`** — the single scripted Result (Weight care): hero,
  pyramid labels, the order (Start here / Keep in view / Build on your
  foundation), reassurance callout, "How we got here", next steps, CTA. The
  BMI (~30.3) is part of the character sheet but is never shown or spoken.

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

- The branching engine (4 paths, 10 endings) was retired in Aug 2025 when the
  test pivoted to the scripted plan above. `Prototypes/shared/engine.js` now
  only holds the shared reacts, the screen router, processing, and the Result
  reveal; the Result markup is static in each HTML.
- `Prototypes/shared/` is loaded with a `?v=...` cache-bust query in each HTML;
  bump it on every shared-file change so GitHub Pages visitors get the update.
- The intro is the illustrated meadow scene (ported from
  `illustration example/`), shared verbatim across the three files via
  `shared/intro.js` + per-file markup; its keyframes are namespaced with an
  `n` prefix in `base.css` to avoid collisions.
- Voice in Option 1 uses the Web Speech API: works on HTTPS/localhost in
  Chrome/Safari/Edge; the mic button hides itself when unsupported and degrades
  with a friendly line when blocked (Firefox, Dia, Brave).
