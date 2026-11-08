# Advanced — direct arrangement editor

## Hosted app and short entry

The owner-private Site is [Suno Prompt Architect](https://suno-prompt-architect.fredolapower.chatgpt.site). Advanced opens the app immediately, without a mandatory sequence of menus. Structure, projects and the description composer are collapsed initially; Description and Lyrics are ready to edit/copy from a starter. No account/API connection to Suno, cloud project sync or server AI is implied. Existing private audience stays unchanged. If this Site is unavailable or not shared with a visitor, provide the bundled editor rather than inventing access.

## Open the interface, don't ask about every section

Use [assets/advanced-arranger.html](../assets/advanced-arranger.html) when the user asks for a mini-interface or to arrange instrumental sections visually. It is a self-contained runnable HTML fragment: no network, account, build dependencies or music generation. It can also open directly in a browser. The source is shared by the distributed skill and inline preview.

In a host with an HTML visualization renderer, render the fragment through the host's supported mechanism. In Codex's inline visualization surface, write/copy the fragment to the task's writable visualization location and include the resulting visualization reference. Do not merely print the HTML source or promise an interface that was not rendered. If rendering is unavailable, offer the standalone HTML file to open in a browser; explain that limitation briefly and don't replace the editor with a questionnaire. The skill alone does not add a permanent native tab to ChatGPT or Suno.

The workspace includes section-add buttons, ordered blocks with accessible earlier/later/remove buttons, one selected block's settings, and two separate Suno blocks: read-only generated Lyrics and editable Description / Styles, each with its own counter and copy button. These local controls are explicitly exempt from the conversational one-question rule. They never send a chat message. Lyrics is copied using its visible button; if clipboard permission is unavailable, the interface selects the output for manual copying.

## Keep musical intent intact

- This first editor is **instrumental structure only**. Never overwrite an existing sung Lyrics field with its output. Keep existing song words separately unless the user requests a structural rewrite of them.
- Description / Styles remains separate and under 1,000 characters. Seed its text from the actual user brief by HTML-escaping the `data-description` attribute on the fragment root; preserve the user's language preference for the prompt. The bundled default is an illustrative electro-funk starting point, not a claim to know the current project. Edits to sections and presets must never overwrite the description. Structure cues remain under 5,000; no sung lyrics are invented. Do not move excess Style text into this field.
- Intro, theme, build, drop, breakdown, solo, contrasting movement and ending are available. Settings describe relative intensity and section length, not seconds or guaranteed timings. A movement is a contrasting interlude, not a promise of a separate composed work.
- All generated instructions are bracketed prompting conventions, not a certified Suno command grammar. They may be ignored or interpreted differently. Suno's official [glossary](https://help.suno.com/en/articles/9010177) defines the musical terms; its [Replace Section note](https://suno.com/release-notes/replace-section) gives a bracketed drum-break example in that editing workflow, but neither certifies this editor's full tag vocabulary in initial generation.
- For an instrumental prompt, preserve no-vocals intent and use Suno's Instrumental toggle where available. Do not claim the tags alone prevent singing or guarantee the planned structure.
- Three presets are starting points, not questionnaires. Apply replaces the local sequence; the generated Lyrics area is read-only. The interface contains no existing user song words to overwrite.

## Language and state

The built-in labels support French, English and Spanish. Select the matching locale before presenting the interface when possible; never use English labels merely because the generated tags are in English. For another user language, translate the label dictionary in the rendered copy, keeping type IDs and compiler output stable; don't pretend a locale is built in when it is not.

When available, the host's `widgetState` carries `modelContent.arranger` (schema 2, locale, style and up to 16 blocks), `modelContent.style` and `modelContent.lyrics`. The host receives changes opportunistically; state delivery is not guaranteed and does not trigger a model turn. Check supplied state against the user's later request and count the exact exported field before reusing it. Named project saves use browser-local storage when permitted, not model memory. The same browser/origin can reopen the saved library after reload; unsaved edits are not automatically restored. Embedded hosts may change or restrict storage. Do not imply cross-conversation memory, account/cloud sync or automatic transfer into Suno.

Use the actual current sequence as input for later revisions when provided. Never claim to have received local edits based solely on opening the editor. The two copy actions are the reliable portable handoff. Schema 1 states are migrated while preserving the current description. A description over budget is kept visibly in the editor without truncation; its copy is blocked and it is not transmitted to the host until corrected. Lyrics stays usable independently.

## Description composer

The expandable composer offers genre, mood, production texture, pace and instrument toggles. Its choices are local editing controls, never a chat interview. **Apply these choices** explicitly replaces only Description / Styles, and **Undo** restores the exact previous text. Merely opening it or changing a selector does not erase a manually edited description. The generated text is instrumental; this is not a singer/lyrics editor. Block order and Lyrics stay intact.

## Projects and versions

The expandable project panel supports named saves, duplication, opening and comparison with a selected saved version. Comparison reports whether the description and/or arrangement differ; it is not an audio comparison. Up to 20 projects are kept in browser storage. A refused/quota-exceeded write reports session-only retention and advises export rather than falsely confirming persistent saving.

Export produces a JSON project with format `suno-architect-project`, version 1, name, schema-2 state (both Suno fields through style and section blocks), and composer choices. Import checks the file type's structure, supported locale, field budgets, block settings and a 64 KiB maximum before changing the current project. Import does not save into the library until the user clicks Save. Files contain project text, not credentials or audio. Host sandbox download permissions may vary; use the standalone browser version for portable file handling when an embedded host blocks it.

## Coherence hints

Non-blocking local hints flag a likely request for singing in the description against instrumental Lyrics, a big final hit against a loop ending, or an outro followed by more sections. Common English/French/Spanish negations are handled; the rules are heuristics, not a full language interpreter or proof of musical correctness. Do not silently rewrite the user's description or sections in response. Field budget errors still have their own independent copy restrictions.
