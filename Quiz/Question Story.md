# The Pyramid — Question Story (participants as themselves)

Participants answer **as themselves** — there is no fixed character and no
scripted responses. What stays fixed across all three prototypes: the topic
sequence, the reactions, and the predetermined **Weight Care** result. Only
the interaction changes.

Source: *The Pyramid — Prototype Question & Response Copy* (v3, Aug 2025).
Copy below is final — use as written.

---

## Shared experience logic

- Participants use their own health experiences; there are no scripted user
  responses.
- The shared story moves from overall health concerns to height and weight,
  age, hormone-related changes, and longevity-related areas.
- If an earlier response already covers a later topic, skip or prefill that
  question instead of asking for the same information again. *(Design
  guideline — the prototypes keep the fixed sequence, since honoring this
  would require interpreting free-text answers.)*
- The result remains **Weight Care**, with Hormone Care and Longevity /
  Peptides kept in view.

## The shared reactions

After each answer, the reaction shows **on its own** before the next question.
Identical across the three prototypes (they live in
`Prototypes/shared/engine.js`). Reactions are neutral by design — they must
work with any participant response.

| Topic | Reaction |
|---|---|
| Overall health | Thanks for sharing. |
| Height | *(no reaction — flows straight into weight)* |
| Weight | Got it. |
| Age | Thank you for letting us get to know you better. |
| Hormone-related changes | Thanks for sharing. |
| Longevity-related areas | We have what we need to show you a starting point. |

→ **Go to Result** (always Weight Care — see `Result Content.md`).

---

## Option 1 · Conversation (type / voice)

The participant types or speaks in their own words.

**Turn 1 · Overall health**
- Question: *How have you been feeling lately?*
- Typing placeholder: *Start wherever feels natural…*
- Reaction: *Thanks for sharing.*

**Turn 2 · Height and weight**
- Question: *Could you share your height and current weight?*
- Reaction: *Got it.*

**Turn 3 · Age**
- Question: *And how old are you?*
- Reaction: *Thank you for letting us get to know you better.*

**Turn 4 · Hormone-related changes**
- Question: *Have you noticed any changes in your cycle, sleep, mood, or other
  midlife symptoms like hot flashes or night sweats?*
- Reaction: *Thanks for sharing.*

**Turn 5 · Longevity-related areas**
- Question: *Is there anything else you'd like support with, such as energy,
  strength, recovery, joint or tendon health, skin, or healthy aging?*
- Reaction: *We have what we need to show you a starting point.*

**Voice controls:** Type · Speak · Done · Type instead

---

## Option 2 · Quiz (chips — "The Note-Taker")

The participant selects the responses that fit their own experience.

**Q1 · Overall health** *(multi-select — more than one can be true)*
- Question: *How have you been feeling lately?*
- *I've been trying to lose weight, but it hasn't changed*
- *I've noticed hormone or midlife changes*
- *My energy, strength, or recovery feels different*
- *I've been thinking more about my overall health*
- *I'm not sure how to describe it*
- *Something else*
- Confirmation: **Continue**
- Reaction: *Thanks for sharing.*

**Q2 · Height**
- Question: *How tall are you?*
- Helper text: *An estimate is fine.*
- Height field · CTA: **Continue**
- *(no reaction — Q3 arrives directly)*

**Q3 · Weight**
- Question: *And what's your current weight?*
- Helper text: *An estimate is fine.*
- Weight field · CTA: **Continue**
- Reaction: *Got it.*

**Q4 · Age**
- Question: *And how old are you?*
- Age field · CTA: **Continue**
- Reaction: *Thank you for letting us get to know you better.*

**Q5 · Hormone-related changes** *(single-select — the tap is the answer)*
- Question: *Have you noticed any changes in your cycle, sleep, or other
  midlife symptoms lately?*
- *Changes in my cycle*
- *Changes in my sleep or waking up during the night*
- *Night sweats or hot flashes*
- *Changes in mood or focus*
- *Changes in sexual health*
- *I haven't noticed any changes*
- *I prefer not to answer*
- Reaction: *Thanks for sharing.*

**Q6 · Longevity-related areas** *(single-select — the tap is the answer)*
- Question: *Are there any other areas you'd like support with?*
- *Energy*
- *Strength*
- *Recovery*
- *Joint or tendon health*
- *Skin*
- *Healthy aging*
- *Nothing else right now*
- Reaction: *We have what we need to show you a starting point.*

---

## Option 3 · Madlib (fill-in-the-blanks)

The participant builds a statement using their own selections. The whole
statement skeleton is visible from the start; the cursor walks it in order.
Reactions play between blanks, tray hidden.

**Statement template:**

> Lately, **[what's been going on]**. I'm **[height]** and about **[weight]**.
> I'm **[age]**. Also, I've noticed **[what I've noticed]**. Beyond that,
> **[support]**.

**Blank 1 · What's been going on**
- *I've been trying to lose weight, but it hasn't changed*
- *I've noticed hormone or midlife changes*
- *my energy, strength, or recovery feels different*
- *I've been thinking more about my overall health*
- *I'm not sure how to describe how I've been feeling*
- *I have something else on my mind*
- Reaction: *Thanks for sharing.*

**Blanks 2 & 3 · Height and weight**
- Helper text: *An estimate is fine.*
- Height pickers · Weight picker
- Reaction (after weight lands): *Got it.*

**Blank 4 · Age**
- Age picker
- Reaction: *Thank you for letting us get to know you better.*

**Blank 5 · What I've noticed**
- *changes in my cycle*
- *difficulty sleeping*
- *waking up during the night*
- *night sweats or hot flashes*
- *changes in my mood or focus*
- *changes in my sexual health*
- *nothing in particular*
- *I prefer not to answer*
- **Behavior:** if "I prefer not to answer" is selected, this sentence is
  omitted from the final statement.
- Reaction: *Thanks for sharing.*

**Blank 6 · Support**
- *I'd like more support with my energy*
- *I'd like more support with strength or recovery*
- *I'd like support for my joints or tendons*
- *I'd like support for my skin*
- *I'd like support with healthy aging*
- *I don't need support with anything else right now*
- Reaction: *We have what we need to show you a starting point.*

**Review**
- Supporting copy: *Here's what you shared. Change anything that doesn't feel
  right.*
- CTA: **That's right**

---

## Interaction decisions (agreed during build)

- Q1 (quiz) is multi-select with **Continue** per the source doc; Q5 and Q6
  list no confirmation, so the tap is the answer. Blank 1 (madlib) is a
  single word per blank — the tap fills it.
- Confirm buttons are always visible, disabled until there's a selection.
- The source doc's age reaction ("Thank you for let us getting…") was
  grammatically broken; the prototypes use *"Thank you for letting us get to
  know you better."*

## Copy guardrails

- Keep questions and reactions warm, clear, and brief.
- Use helper text only when it reduces uncertainty or pressure.
- Keep reactions neutral enough to work with any participant response.
- Do not infer, summarize, or interpret what the participant shared in a
  reaction.
- Skip or prefill later questions when the participant already provided that
  information.
- Keep hormone-related topics focused on cycle, sleep, and other midlife
  symptoms.
- Keep longevity-related topics focused on energy, strength, recovery, joints
  or tendons, skin, and healthy aging.
- Keep the topic sequence and predetermined Weight Care result consistent
  across all three prototypes.
- Adapt the interaction, not the meaning.
- Do not imply a diagnosis, clinical assessment, or promised outcome.
