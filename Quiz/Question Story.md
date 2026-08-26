# The Pyramid — Scripted Question Story (one path, three tellings)

One fixed character. Five signals. One Weight Care result. The facts and
outcome stay consistent across all three prototypes; **only the interaction
changes**.

Source: *The Pyramid — Prototype Question & Response Copy* (copy-reviewed v2,
Aug 2025). Copy below is final — use as written.

---

## The character (identical in all three)

| Fact | Scripted value |
|---|---|
| Age | 44 |
| Height | 5'6" |
| Weight | 188 lb |
| BMI | Approximately 30.3 — **used by the prototype, not shown to the participant** |
| Primary concern | Weight has not changed despite two years of effort |
| Additional concern | Waking around 3 a.m. most nights |
| Energy and strength | Feel steady |
| Starting point | **Weight care** |
| Kept in view | Hormone care · Longevity / peptides |

---

## The shared reactions

After each answer, the reaction shows **on its own** before the next question.
These lines are identical across the three prototypes (they live in
`Prototypes/shared/engine.js`):

| Signal | Reaction |
|---|---|
| What matters now | Thanks for sharing. |
| Height | *(no reaction — flows straight into weight)* |
| Weight | Got it. |
| Age | Thanks for letting us get to know you better. |
| Hormone | That's helpful to know. Changes like these could have more than one cause. |
| Longevity | We have what we need to show you a starting point. |

→ **Go to Result** (always Weight care — see `Result Content.md`).

---

## Option 1 · Conversation (type / voice)

The participant types or speaks each scripted response in their own words.

**Turn 1 · What matters now**
- Question: *How have you been feeling lately?*
- Typing placeholder: *Start wherever feels natural…*
- Scripted response: "My weight hasn't changed in two years, no matter what I try."
- Reaction: *Thanks for sharing.*

**Turn 2 · Weight signal**
- Question: *Could you share your height and current weight?*
- Scripted response: "I'm 5'6" and about 188 pounds."
- Reaction: *Got it.*

**Turn 3 · Age signal**
- Question: *And how old are you?*
- Scripted response: "I'm 44."
- Reaction: *Thanks for letting us get to know you better.*

**Turn 4 · Hormone signal**
- Question: *Have you noticed any changes in your cycle or sleep lately? This
  could include waking at night, night sweats, or hot flashes.*
- Scripted response: "My sleep has changed. I wake up around 3 a.m. most nights."
- Reaction: *That's helpful to know. Changes like these could have more than one
  cause.*

**Turn 5 · Longevity signal**
- Question: *Is there anything else you'd like support with? This could include
  energy, strength, recovery, joint or tendon health, or skin.*
- Scripted response: "I feel good there. My energy and strength are steady."
- Reaction: *We have what we need to show you a starting point.*

**Voice controls:** Type · Speak · Done · Type instead

---

## Option 2 · Quiz (chips — "The Note-Taker")

The same facts become selectable responses. The ✓ marks the scripted selection.
Height and weight are **two separate questions** here; height flows straight
into weight with no reaction in between.

**Q1 · What matters now** *(single-select — the tap is the answer)*
- Question: *How have you been feeling lately?*
- Helper text: *Choose what fits best right now.*
- ✓ *My weight hasn't changed, no matter what I try*
- *My energy feels low*
- *I'm having trouble thinking clearly*
- *Something else*
- Reaction: *Thanks for sharing.*

**Q2 · Height signal**
- Question: *How tall are you?*
- Helper text: *An estimate is fine.*
- Height field: ✓ **5' 6"** · CTA: **Continue**
- *(no reaction — Q3 arrives directly)*

**Q3 · Weight signal**
- Question: *And what's your current weight?*
- Helper text: *An estimate is fine.*
- Weight field: ✓ **188 lb** · CTA: **Continue**
- Reaction: *Got it.*

**Q4 · Age signal**
- Question: *And how old are you?*
- Helper text: *Enter your age.*
- Age field: ✓ **44** · CTA: **Continue**
- Reaction: *Thanks for letting us get to know you better.*

**Q5 · Hormone signal** *(single-select)*
- Question: *Have you noticed any changes in your cycle or sleep lately?*
- ✓ *My sleep has changed, I wake up around 3 a.m. most nights*
- *My cycle has changed*
- *I've noticed night sweats or hot flashes*
- *I haven't noticed any changes*
- Reaction: *That's helpful to know. Changes like these could have more than one
  cause.*

**Q6 · Longevity signal** *(multi-select with an exclusive "steady" chip)*
- Question: *Is there anything else you'd like support with?*
- Helper text: *Choose any areas where support would feel useful.*
- *Energy* · *Strength* · *Recovery* · *Joints and tendons* · *Skin*
- ✓ *I feel good in these areas*
- CTA: **Continue**
- Reaction: *We have what we need to show you a starting point.*

---

## Option 3 · Madlib (fill-in-the-blanks)

The participant builds one statement, one blank at a time. The whole statement
skeleton is visible from the start; the cursor walks it in order. The ✓ marks
each scripted selection. Reactions play between blanks, tray hidden.

**Completed statement:**

> Lately, **my weight hasn't changed in two years, no matter what I try**. I'm
> **5'6"** and about **188 pounds**. I'm **44**. I've also noticed **my sleep
> has changed, I wake up around 3 a.m. most nights**. Beyond that, **my energy
> and strength feel steady**.

**Blank 1 · What's been going on** *(single-select — the tap fills the blank)*
- ✓ *my weight hasn't changed in two years, no matter what I try*
- *my energy feels low*
- *I'm having trouble thinking clearly*
- Reaction: *Thanks for sharing.*

**Blanks 2 & 3 · Height and weight**
- Helper text: *An estimate is fine.*
- Height pickers: ✓ **5'6"** · Weight picker: ✓ **188 lb**
- Reaction (after weight lands): *Got it.*

**Blank 4 · Age**
- Age picker: ✓ **44**
- Reaction: *Thanks for letting us get to know you better.*

**Blank 5 · What has changed** *(words phrased to complete "I've also noticed ___")*
- ✓ *my sleep has changed, I wake up around 3 a.m. most nights*
- *my cycle has changed*
- *night sweats or hot flashes*
- *no real changes*
- Reaction: *That's helpful to know. Changes like these could have more than one
  cause.*

**Blank 6 · Other areas of support**
- ✓ *my energy and strength feel steady*
- *I'd like more support with my energy*
- *I'd like more support with strength and recovery*
- *I'd like more support with my joints, tendons, or skin*
- Reaction: *We have what we need to show you a starting point.*

**Review**
- Supporting copy: *Here's what you shared. Change anything that doesn't feel
  right.*
- CTA: **That's right**

---

## Interaction decisions (agreed during build — they override the PDF where they differ)

- Q1 (quiz) and Blank 1 (madlib) are **single-select with no confirmation
  button** — the tap is the answer. Confirmation CTAs appear only where
  something must be completed: number fields and the multi-select Q6.
- Confirm buttons are always visible, disabled until there's a selection.

## Copy guardrails

- Keep questions and reactions warm, clear, and brief.
- Acknowledge what the participant shared without making the concern sound worse.
- Treat steady signals as useful information.
- Explain why sensitive questions matter when space allows.
- Keep the character facts and reactions consistent across all three prototypes.
- **Adapt the interaction, not the meaning.**
- Do not imply a diagnosis, clinical assessment, or promised outcome.
