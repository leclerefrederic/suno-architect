# Advanced — direct arrangement editor

## Open the interface, don't ask about every section

Use [assets/advanced-arranger.html](../assets/advanced-arranger.html) when the user asks for a mini-interface or to arrange instrumental sections visually. It is a self-contained runnable HTML fragment: no network, account, build dependencies or music generation. It can also open directly in a browser. The source is shared by the distributed skill and inline preview.

In a host with an HTML visualization renderer, render the fragment through the host's supported mechanism. In Codex's inline visualization surface, write/copy the fragment to the task's writable visualization location and include the resulting visualization reference. Do not merely print the HTML source or promise an interface that was not rendered. If rendering is unavailable, offer the standalone HTML file to open in a browser; explain that limitation briefly and don't replace the editor with a questionnaire. The skill alone does not add a permanent native tab to ChatGPT or Suno.

The workspace includes section-add buttons, ordered blocks with accessible earlier/later/remove buttons, one selected block's settings, and live read-only Lyrics output. These local controls are explicitly exempt from the conversational one-question rule. They never send a chat message. Lyrics is copied using its visible button; if clipboard permission is unavailable, the interface selects the output for manual copying.

## Keep musical intent intact

- This first editor is **instrumental structure only**. Never overwrite an existing sung Lyrics field with its output. Keep existing song words separately unless the user requests a structural rewrite of them.
- Style remains separate and under 1,000 characters. Structure cues remain under 5,000; no sung lyrics are invented. Do not move excess Style text into this field.
- Intro, theme, build, drop, breakdown, solo, contrasting movement and ending are available. Settings describe relative intensity and section length, not seconds or guaranteed timings. A movement is a contrasting interlude, not a promise of a separate composed work.
- All generated instructions are bracketed prompting conventions, not a certified Suno command grammar. They may be ignored or interpreted differently. Suno's official [glossary](https://help.suno.com/en/articles/9010177) defines the musical terms; its [Replace Section note](https://suno.com/release-notes/replace-section) gives a bracketed drum-break example in that editing workflow, but neither certifies this editor's full tag vocabulary in initial generation.
- For an instrumental prompt, preserve no-vocals intent and use Suno's Instrumental toggle where available. Do not claim the tags alone prevent singing or guarantee the planned structure.
- Three presets are starting points, not questionnaires. Apply replaces the local sequence; the generated Lyrics area is read-only. The interface contains no existing user song words to overwrite.

## Language and state

The built-in labels support French, English and Spanish. Select the matching locale before presenting the interface when possible; never use English labels merely because the generated tags are in English. For another user language, translate the label dictionary in the rendered copy, keeping type IDs and compiler output stable; don't pretend a locale is built in when it is not.

When available, the host's `widgetState` carries `modelContent.arranger` (schema 1, locale and up to 16 blocks) and `modelContent.lyrics`. The host receives changes opportunistically; state delivery is not guaranteed and does not trigger a model turn. Check supplied state against the user's later request and count the exact exported field before reusing it. Without this host API, all changes remain local until copied, and reloading starts over. Do not imply cross-conversation memory or automatic transfer into Suno.

Use the actual current sequence as input for later revisions when provided. Never claim to have received local edits based solely on opening the editor. The copy action is the reliable portable handoff.
