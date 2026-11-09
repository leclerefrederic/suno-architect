# Creative toolbox

Use only the relevant section. All questions still follow the main skill's one-menu-per-turn contract. Translate examples naturally into the user's language.

## Change the destination, keep the music

Treat conversion as editing, not truncation. The source prompt is available context, not a new questionnaire.

1. Preserve the core: recognizable genre, mood/scene, lead sound, vocal choice and the user's most important constraint.
2. For Earn Credits (200), compress into a single musical direction. Drop optional solos and fine production detail before dropping identity. For Creative Simple (3,000), keep one coherent prompt. For Advanced, put sound and production in Style (1,000); put actual requested song words in Lyrics (5,000), separately.
3. Lyrics is not an overflow field for a long instrumental prompt. Do not write sung instructions or invent lyrics to use spare space. With explicit permission, instrumental section markers can go in Lyrics; otherwise leave it absent.
4. Mention any meaningful sacrifice briefly outside the copyable text. Expanding a short prompt does not justify inventing a new genre, singer or extra instruments against the brief.

An explicit target or character budget is enough to act. If target and budget conflict (e.g. 'Advanced Style, 3,000 characters'), use the smaller valid field budget and explain it; ask only if the conflict changes the musical request.

## Targeted revisions

Keep the genre, scene, lead sound and vocal preference unless the user asks to change them. Return the complete replacement field, not a disconnected instruction to append. State the audible adjustment in one short sentence.

- **More danceable:** strengthen pulse and rhythmic interaction first; don't automatically add speed or change genres.
- **Less busy:** remove competing parts, leave rests and keep the hook. Don't confuse sparse with sad or slow.
- **Shorter intro:** have the core instruments playing from the first beat; remove contradictory buildup language.
- **Stronger ending:** replace fade/loop instructions with a resolving final phrase or shared hit, as requested.
- **No voice:** remove vocal invitations and specify instrumental; mention the Instrumental toggle where available.

If the user's complaint is clear, revise directly. Do not make them choose a diagnosis. Without audio inspection, explain the intended change rather than asserting what the generated recording sounds like.

## Two directions on request

Give two short, evocative directions sharing the user's anchor and changing one meaningful axis (e.g. intimate vs celebratory). Explain each in a single sentence, then ask ONE menu: two clear labels and 'Choisis pour moi'. These are sketches, not two final full prompts. Keep any mode, budget and instrumental requirement already supplied.

After a selection, deliver one complete prompt without re-asking the brief. If the user explicitly asks for two final copyable prompts, provide both, each independently within its destination budget, and skip the choice menu.

## Surprise and scene starters

Infer intensity when the user has already described it. If they ask to control it, use one menu:

- 'Une petite touche inattendue': one unusual texture or dialogue between instruments.
- 'Emmène-moi ailleurs': a stronger contrast in arrangement or a complementary second style.
- 'Carte blanche': a bold coherent interpretation of the anchor, preserving explicit exclusions.
- 'Choisis pour moi'.

Never ask an anchor menu and intensity menu in the same turn. A user who delegates the whole direction has authorized you to choose the anchor too. 'Carte blanche' does not cancel 'no vocals', the destination budget or an established emotional intention.

For scene starters, offer three concrete, contrasting scenes plus a delegated choice. Scenes are invitations, not invented genre names. Translate the selected scene into familiar genre, rhythm and instrumentation, then deliver once the destination is known.

## A family of tracks

When asked for a series, define a short shared signature (genre/era, key instruments, production character) and vary one role per track (energy, lead or narrative moment). Preserve the signature in every standalone prompt so each can be used independently. Infer series size from the request; if it is missing, ask one menu with manageable choices such as 2, 3 or 'Choisis pour moi'. Do not promise continuity or saved presets outside available context.

## Video, narration and loops

- **Video:** translate described events into a musical arc: opening hook, a useful contrast, return and conclusion. Use flexible timing language; exact length and synchronized hits are preferences Suno may not follow. Don't ask for an entire editing plan when one scene is enough.
- **Under speech:** favor instrumental, a stable pulse, restrained lead melodies, fewer competing accents and gentle transitions. Respect a requested featured instrument by making it supportive rather than removing it. Distinguish spoken narration over the music from a request to generate a spoken voice.
- **Loop:** aim for a steady texture, compatible opening/closing harmony and rhythm, no fade or terminal flourish. Do not simultaneously demand a dramatic final hit. Say the join needs checking on the generated audio; do not claim a seamless loop from text alone.

## Lyrics only when wanted

Use the requested theme, language and singer/voice preference. Write new lyrics in English by default. Use a different language only when the user explicitly requests it for the Suno text. Keep the surrounding conversation in its established language. In Advanced, deliver separate copyable Style and Lyrics fields, checked separately. Lyrics contains singable words and optionally concise section markers, not a second production essay. A sung song's Style must not retain 'instrumental/no vocals'.

For a conversion from Simple with existing lyrics, preserve the supplied words unless asked to rewrite. If they exceed 5,000 characters, ask one menu to choose shortening or selecting an excerpt rather than silently discarding verses.
