# HTML / CSS / JavaScript Editor

## درخت فایل‌های مخزن

```text
.
├── .github/
│   └── workflows/
│       └── build-test-editor.yml  — گردش‌کار آزمون و بررسی
├── scripts/
│   ├── build-test-editor.mjs      — ساخت نسخه تک‌فایلی
│   └── test-smart-import.mjs      — آزمون یکپارچه بازیابی ورودی هوشمند
├── tools/
│   └── build-single-file.js       — ساخت نسخهٔ تک‌فایلی
├── index.html                    — صفحه و رابط اصلی ویرایشگر
├── index-test-etitor.html         — نسخهٔ آزمایشی ویرایشگر
├── style.css                     — ظاهر، چیدمان و واکنش‌گرایی
├── script.js                     — منطق و عملکرد ویرایشگر
├── smart-import.js               — تحلیل و تفکیک کدهای ترکیبی واردشده
├── smart-import.css              — ظاهر مستقل زبانه ورود هوشمند
├── github-update.js               — دریافت زمان آخرین کامیت شاخه main از GitHub
├── word-tree.js                  — نمودار پویا و قابل جست‌وجوی واژه‌ها
├── html-suggestions.js            — پیشنهادهای کد HTML
├── css-suggestions.js             — پیشنهادهای کد CSS
├── js-suggestions.js              — پیشنهادهای کد JavaScript
├── next-word-suggestions.js       — پیشنهاد واژهٔ بعدی بر اساس متن
├── tree-world-suggestion.md       — نمایش درختی و تصویری پیشنهادها
└── README.md                     — راهنما و مستندات مخزن
```


A browser-based editor for creating, editing, previewing, organizing, and exporting HTML, CSS, and JavaScript projects. The application is built with plain browser technologies; the core editor has no build step or package installation.

## Features

- Separate HTML, CSS, and JavaScript editing panels with syntax highlighting and line numbers.
- Live preview inside a sandboxed iframe.
- Code completion for HTML tags/attributes, CSS properties/values/selectors/at-rules, and JavaScript keywords, members, browser APIs, and snippets.
- Context-aware next-word predictions that can continue selected suggestions into attributes, CSS values, variable initializers, and common code patterns.
- Live Word Tree built from the loaded HTML, CSS, and JavaScript suggestion banks; selecting an entry opens a Persian explanation and a short code example.
- Smart Import tab to paste or open mixed HTML/CSS/JavaScript source, recover useful content from common malformed/nested document wrappers, detect repeated top-level JavaScript declarations and highly similar script versions, and selectively apply reviewed sections. Smart Import keeps controls in English and presents diagnostic explanations/status messages in Persian.
- Live GitHub update indicator showing the latest commit date/time on `main`, formatted for Tehran time and linked to the source commit.
- Quick-insert symbols, automatic closing HTML tags, indentation helpers, and bracket-aware Enter behavior.
- Project file manager with create, rename, delete/undo, search, filters, and ordering options.
- Search within the current editor, with next/previous match navigation.
- Undo/redo, font-size controls, adjustable editor/preview split, and keyboard shortcuts.
- Browser-local saving and visible feedback when a change cannot be persisted.
- Preset and custom CSS/JavaScript library management, with optional CDN downloads.
- Export as one self-contained HTML document or as a four-file bundle.

## Run locally

1. Download or clone this repository.
2. Keep the following files together in the same directory.
3. Open `index.html` in a modern browser.

No build command or package installation is required. The editor itself can run from local files. Network access is needed for optional library downloads and for exported code that references remote resources. Browser restrictions may differ when opening local files; testing through a small local static server can help diagnose those differences.

## GitHub update timestamp

A compact status strip near the top of the editor requests the latest commit from the public GitHub API for the repository's `main` branch. It displays the commit timestamp in the `Asia/Tehran` time zone and links to that commit. The time is the latest repository commit time, not a guarantee that GitHub Pages deployment has finished; Pages publication can lag behind a commit. This feature needs network access and can show an unavailable message if GitHub's API cannot be reached or its rate limit is exceeded.

## Smart Import tab

Use **Smart Import** to paste a full HTML document or open a text-based `.html`, `.htm`, `.xhtml`, `.css`, `.js`, `.mjs`, or `.txt` file. Its controls and button labels remain in English, while status messages, analysis findings, warnings, and action explanations are displayed in Persian.

- **Analyze code** extracts the HTML/CSS/JavaScript sections and reports structural issues without deleting exact duplicate code blocks.
- **Clean & analyze** performs the same analysis and additionally removes only CSS/JavaScript blocks whose normalized text is exactly identical. It does not remove near-duplicates or merge different versions automatically.
- Opening a file now runs **Analyze code** by default. It does not silently run the cleanup operation.
- If multiple full documents are pasted together or one document is embedded inside a malformed `<style>`/`<body>` wrapper, Smart Import now searches for complete HTML document candidates before extracting CSS/JavaScript. It scores document/tag balance (`html`, `head`, `body`, `style`, `script`) and chooses the structurally strongest candidate; equally strong candidates prefer the latest version. This prevents an outer malformed wrapper from swallowing the intended page and causing styles/scripts to be extracted from the wrong source. A Persian warning identifies the selected candidate number; when the tool had to choose among multiple documents, all Apply checkboxes start unchecked and the user must review and explicitly select the sections to apply.
- If a `style` block contains nested document markup and a nested `style` element, the analyzer attempts to recover the inner CSS. If there is no recoverable inner style block, it skips that malformed block rather than copying document markup into the CSS output.
- A lightweight JavaScript scan masks comments and string literals, then looks for repeated top-level `const`, `let`, `var`, `class`, and `function` declarations. Repeated lexical bindings such as `const openBtn` are reported in Persian. If likely top-level binding conflicts are found, **Apply JavaScript** is unchecked by default to help prevent accidental application of code that may fail with a `SyntaxError`.
- Similar JavaScript blocks and repeated function/variable names are reported rather than automatically deleted, because similar versions may contain meaningful differences. When exactly two highly similar JS blocks also cause top-level declaration conflicts, **Use latest JS version** appears as an explicit recovery option. It replaces only the suggested JS output with the last block; it does not change the editor file until you select Apply and confirm. Only exact repeated blocks are removed by **Clean & analyze**.

Review and edit the three extracted outputs, select only the languages you intend to apply, and confirm the Persian confirmation prompt before changing the editor. The current file selected for each chosen language is replaced; other project files are kept. If that language has no file yet, a new file is created. The live preview is refreshed after applying. External stylesheet links, the document's first `<base>` tag, and external script tags are preserved in the HTML output so referenced dependencies can still load in the preview. Their remote files are not downloaded or embedded; relative asset paths may still need the original site's base URL or manual adjustment.

The import workflow runs in the browser and does not upload the pasted code. It remains a conservative, text-based recovery and diagnostic tool—not a full standards-compliant HTML/CSS/JavaScript parser or a guarantee of runtime correctness. The document candidate selector and JavaScript declaration scan are heuristic, not full standards-compliant parsers; they cannot detect every syntax/runtime error, and unusual valid constructs may need manual review. When several document versions are present, check the selected HTML/CSS/JS output carefully before applying because the chosen version may not be the one you intended. Always inspect the output before applying it, especially when the source contains multiple conflicting document versions. The standalone test editor is generated from the same source files by `node scripts/build-test-editor.mjs`. Run `node scripts/test-smart-import.mjs` to execute the dependency-free integration test for nested document recovery, CSS recovery, repeated top-level declarations, and the explicit latest-JavaScript-version recovery action. GitHub Actions runs this test before building the standalone editor.

## Starter example

The default project is intentionally small: **10 compact boxes and 10 buttons**, each demonstrating one simple action. The examples cover a message, a color change, increment/decrement, hide/show, title change, current time, color reset, dark mode, and adding a box. The starter HTML, CSS, and JavaScript are kept short so users can understand and modify them easily.

## Project files

| File | Purpose |
|---|---|
| `index.html` | Editor UI, help content, preview iframe, and local asset references |
| `style.css` | Editor layout, theme, responsive rules, focus styles, and component styling |
| `script.js` | Editor behavior, files, storage, library catalog, preview generation, export, and the narrow Smart Import bridge |
| `smart-import.js` | Smart Import extraction, malformed/nested document recovery, top-level JavaScript conflict diagnostics, optional latest-version recovery, Persian findings/statuses, exact-duplicate cleanup, and selective application |
| `scripts/test-smart-import.mjs` | Dependency-free integration test for malformed/nested document recovery, declaration conflicts, and manual latest-JavaScript-version selection |
| `smart-import.css` | Scoped layout, responsive styling, and keyboard-focus styles for Smart Import |
| `github-update.js` | Fetches the latest `main` commit timestamp from GitHub and updates the status strip |
| `word-tree.js` | Dynamic searchable word tree, contextual rule branches, Persian item explanations, and example snippets |
| `html-suggestions.js` | HTML tags, global attributes, element-specific attributes, and HTML abbreviations |
| `css-suggestions.js` | CSS property/value completion data and code snippets |
| `js-suggestions.js` | JavaScript words, member lists, and snippets |
| `next-word-suggestions.js` | Context-sensitive next-token continuation rules for HTML, CSS, and JavaScript |
| `tree-world-suggestion.md` | Visual-only branching tree of the current HTML, CSS, and JavaScript next-word rules; not loaded by the application |
| `README.md` | Project documentation, usage, audit notes, and validation status |

The completion bank is split into four JavaScript data files. The HTML bank separates global attributes from element-specific attributes, includes contextual value rules, and supports embedded SVG/MathML elements. The separate `word-tree.js` interface reads the loaded data banks at runtime instead of maintaining a second hard-coded word list. The CSS bank includes properties, per-property values, at-rules, pseudo-classes, pseudo-elements, functions, units, and reusable snippets. The JavaScript bank includes language and standard built-in names, browser API interfaces and members, object methods, and reusable snippets. Its vocabulary and continuations are curated against the ECMAScript specification and MDN references; newer or permission-gated browser APIs may not exist in every runtime. There is no `intellisense-data.js` file in the current repository.

## Suggestion-bank coverage and next-word prediction

The current curated banks contain approximately these unique entries after normalization:

| Bank | Coverage currently loaded by the editor |
|---|---|
| HTML | 200 element names (including SVG and MathML), 185 global-attribute suggestions, 68 tag-specific attribute groups, 24 Emmet-style abbreviation triggers, and 18 quick-insert symbols |
| CSS | 482 property/custom-property names, 145 property value maps, 17 at-rules, 67 pseudo-classes, 22 pseudo-elements, 71 value functions, 40 unit names, 13 core snippets, 34 shorthand candidates backed by 46 abbreviation mappings, and 18 quick-insert symbols |
| JavaScript | 582 language/global/browser API words, 94 member roots with 1,304 distinct member names, 49 snippets (including 19 shorthand triggers), and 21 quick-insert symbols |
| Next-word database | 125 contextual rules (38 HTML, 33 CSS, 54 JavaScript), 373 explicitly listed candidates, plus dynamically generated tag/attribute/property-value and code continuations |

These banks are maintained locally in the repository; no runtime network request or model service is used for suggestions. Suggestions are curated rather than exhaustive: the browser platform evolves, APIs may differ by browser, and a suggestion does not guarantee that a property, method, or feature is supported in the user's target environment. JavaScript completion preserves names that differ only by case (for example, `Map` and `map`) because they are distinct identifiers.

### Validation of suggestion spelling, context, and category

The suggestion banks were reviewed for spelling, capitalization, language/category placement, and context. HTML global attributes are separated from element-specific attributes; value completions for `type`, `rel`, `target`, `loading`, `method`, `crossorigin`, `fetchpriority`, `decoding`, `preload`, `scope`, `accept`, `capture`, `kind`, and `shape` are restricted to relevant elements. Empty SVG/MathML nodes now get an empty-element continuation instead of an HTML-style paired tag.

CSS next-word suggestions distinguish width and height viewport units and do not offer `auto` for `padding` or `gap` properties. CSS value completion no longer appends every function and generic value to every property; it uses the selected property's own value map plus CSS-wide keywords and a custom-property reference. The non-standard unprefixed `font-smooth` entry was removed in favor of explicitly named vendor-prefixed smoothing properties.

JavaScript next-word continuation for array methods now requires member-access syntax such as `items.map`, instead of triggering after a plain identifier named `map`. This remains a curated completion dictionary, not a full parser or a guarantee of runtime support; experimental APIs and browser-version differences still need testing in the target environment.

### How the next-word database works

After a completion is accepted, the editor checks the text before the caret against ordered, language-specific rules. A matching rule can offer a continuation without replacing the word already accepted. Examples include:

- HTML: after accepting a tag name, offer common attributes or a paired opening/closing element; after selecting attributes such as `autocomplete`, `inputmode`, `fetchpriority`, ARIA states, and media/form attributes, offer relevant enumerated values.
- CSS: after accepting a property such as display, overflow, text-align, font-weight, cursor, grid-auto-flow, or object-fit, offer common values; after layout declarations, offer related flex/grid, sticky-positioning, typography, border, and reduced-motion continuations. Common at-rules now include `@import`, `@keyframes`, `@font-face`, `@layer`, `@scope`, and relevant preference media queries.
- JavaScript: after const/let/var, suggest an assignment; after the assignment, suggest common initializer types; after identifiers such as document or console, suggest common members and call patterns.

The next-word database is a deterministic, hand-maintained rule/sequence list with 125 contexts and 373 explicitly listed candidate continuations before dynamic candidates; it is not a trained language model. The HTML rules cover ARIA states, autocomplete tokens, input hints, media/loading options, form encodings, referrer policies, and related attributes. CSS rules include expanded property values, common at-rules, responsive layout follow-ups, and reduced-motion patterns. JavaScript rules include control-flow, modules, built-in methods, and browser API continuations. Predictions are skipped inside JavaScript strings/comments and CSS strings/comments, and are shown only for known contexts. Dismiss the popup with Escape to keep typing normally.

### Visual suggestion tree

- `tree-world-suggestion.md` documents the context-aware next-word rule bank as a static reference. The in-app Word Tree is different: it reads the currently loaded suggestion data and rebuilds its searchable branches when opened or refreshed.
- It is a standalone visual reference only. It is not imported or loaded by the editor and does not affect completion behavior.
- The static file shows explicit rule contexts and listed choices; some choices are generated dynamically, and the general vocabulary banks are broader than the finite next-word chains. For the live, interactive tree, use the **Word Tree** button beside Help in the editor.

### Abbreviation completions and quick symbols

These are curated editor conveniences, not a complete Emmet parser. The HTML/CSS forms follow the established Emmet abbreviation model; JavaScript labels are local snippet triggers whose syntax and API examples are checked against MDN and ECMAScript references.

- **HTML:** on a line outside an unfinished tag, type `!`, `doc`, `html:5`, `meta:vp`, `meta:utf`, `link:css`, `script:src`, `bq`, `btn`, `img`, `ul+`, `ol+`, `table+`, `form:get`, `.container`, `#app`, or `ul>li*3` and choose the matching completion. The HTML symbol toolbar also offers common entities such as `&nbsp;`, `&amp;`, `&lt;`, and `&gt;`.
- **CSS:** inside a rule block, type shorthands such as `m10` → `margin: 10px;`, `m10-20` → `margin: 10px 20px;`, `p8-16` → `padding: 8px 16px;`, `w100` → `width: 100px;`, `fz16` → `font-size: 16px;`, `fw700` → `font-weight: 700;`, `lh1.5` → `line-height: 1.5;`, and `op0.5` → `opacity: 0.5;`. Static options include `df` for flex display, `dg` for grid display, and `dn` for `display: none;`. Numeric expansion is limited to properties for which the inferred unit or unitless value is sensible.
- **JavaScript:** type triggers such as `clg`, `cer`, `qs`, `qsa`, `gid`, `addel`, `afn`, `forof`, `iife`, `tc`, `pall`, `jparse`, `jstr`, `ls`, `raf`, `imp`, or `exp`, then accept the proposed snippet.
- **Quick symbols:** the toolbar includes common HTML entities; CSS pseudo-selectors and functions; and JavaScript operators such as `=>`, `===`, `!==`, `&&`, `||`, `??`, `?.`, and `...`.
## Basic use

1. Select the HTML, CSS, or JavaScript tab and edit the code.
2. The project preview refreshes automatically after a short delay.
3. Use the file manager to create additional `.html`, `.htm`, `.css`, `.js`, or `.mjs` files. Files are grouped into the relevant editor by language.
4. Use the library catalog to choose a preset, review the fetched code, and save it as a library. Custom CSS or JavaScript can also be pasted into the library form.
5. Save regularly and download important work as a backup. Browser storage is not cloud storage.

### Keyboard shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl` / `⌘` + `S` | Save the current project to browser storage |
| `Ctrl` / `⌘` + `Shift` + `S` | Open the download dialog |
| `Ctrl` / `⌘` + `F` | Focus the code search field |
| `Enter` / `Shift` + `Enter` in search | Go to next / previous match |
| `Esc` in search | Clear the search |
| `Tab` / `Shift` + `Tab` in an editor | Indent / outdent the current line or selection |
| `Ctrl` / `⌘` + `Z` | Undo (when focus is outside text inputs) |
| `Ctrl` / `⌘` + `Y` or `Ctrl` / `⌘` + `Shift` + `Z` | Redo (when focus is outside text inputs) |
| `F2` in the file manager | Rename the focused file item |

Browser-native shortcuts may take precedence while an input field is focused.

## Preview, safety, and libraries

- The preview runs generated project code inside a sandboxed iframe. The iframe intentionally does not receive `allow-same-origin`; this separates preview content from the editor's origin in modern browsers.
- Treat code pasted into the editor and library code as executable, untrusted input. A sandbox reduces capabilities but is not a reason to run unknown code without review.
- Enabling a library runs its JavaScript or applies its CSS in the preview. The library catalog downloads code from external CDN URLs; those requests reveal normal connection metadata to the relevant provider.
- A successful HTTP download only means the file was retrieved; it does not guarantee that the selected library build has the right dependencies or setup.
- External resources, API calls, browser permissions, and local-file security rules can affect the exported page independently of the editor.

## Saving, recovery, and privacy

The project, library entries, and selected editor preferences are stored in this browser's local storage. The application does not upload project code to an application server. Clearing site data, using a private session, or switching browsers/profiles can make locally saved data unavailable. Download important projects separately.

If the saved project JSON cannot be parsed or does not have the expected structure, the editor attempts to save the original value under a recovery key before falling back to the starter project. It displays a warning and offers a **Download recovery** action when a recovery copy was saved successfully. Keep the downloaded `project-recovery.json` file until the original project has been restored or confirmed unnecessary. Browser storage can be full or unavailable; in that case the app displays a warning and changes may remain only in the current session.

The recovery feature is best-effort: browser storage may be disabled, full, cleared, or otherwise inaccessible. It is not a replacement for version control or independent backups.

## Export formats

Choose **Download** in the editor toolbar.

### Single HTML

The single-file export combines project HTML, CSS, JavaScript, and enabled saved libraries into one HTML file. It is useful for sharing a self-contained example, subject to the page's own external dependencies and browser restrictions. It does not include the editor UI.

### Four-file bundle

The bundle currently downloads four separate files:

- `<name>.html` — the generated page, linked to the CSS and JavaScript bundle files below.
- `<name>.css` — CSS from project CSS files and enabled CSS libraries, combined into one stylesheet.
- `<name>.js` — JavaScript from project JS files and enabled JavaScript libraries, combined into one script.
- `<name>.libs.txt` — a readable copy of enabled library code for reference or debugging.

Keep the HTML, CSS, and JS files in the same directory so the generated relative links resolve. A browser may ask permission to download multiple files. The bundle is a merged output rather than a source-preserving archive: it does not retain every original file as a separate file, and it does not create a ZIP archive. Assets not included in the project or referenced remotely must be copied or configured separately.

## Static code-review log

A static review of the HTML, CSS, main editor logic, export paths, storage flows, completion-data files, and documentation identified the issues below. For each issue, four plausible approaches were compared; the selected fix combines the best-fitting approaches for this lightweight, dependency-free application. The alternatives are documented for decision transparency, not a claim that all four were implemented.

### 1. CDN requests could outlive the timeout or overwrite a newer selection

**Issue:** The timeout was cleared as soon as response headers arrived, before the body finished downloading. Rapidly selecting two presets could also allow the earlier response to overwrite the currently selected library.

**Options considered:**
1. Keep the original timeout clearing point and simply increase the timeout.
2. Keep the timeout active until the response body has been read, then clear it in `finally`.
3. Abort the previous request when a newer preset is selected.
4. Add a request sequence ID and ignore late results from older requests.

**Chosen combination:** Options 2, 3, and 4. The timeout covers the complete request/body read, a newer selection aborts the older request, and stale results are ignored. A failed request leaves a manual-paste path available.

### 2. The four-file export did not connect the HTML to its CSS and JavaScript

**Issue:** The UI downloaded a CSS and JS file alongside the HTML, but the exported HTML used inline styles and scripts instead of referencing those files. A separate embedded metadata block also carried saved-library code that the exported end-user page did not consume.

**Options considered:**
1. Keep inline HTML and treat the extra files as reference-only outputs.
2. Generate relative stylesheet and script references in the bundle HTML.
3. Preserve every original project file and its directory structure in a ZIP archive.
4. Add a manifest/import workflow to reconstruct the original project.

**Chosen combination:** Option 2 for the existing four-download design, plus removal of the unused embedded library metadata. The single-HTML export remains inline; the bundle HTML references the combined `.css` and `.js` files. Options 3 and 4 are broader format changes and remain possible future work.

### 3. Storage failures could be followed by a misleading success message

**Issue:** Several file operations modified in-memory state and then attempted to save. A failed write could be followed by UI feedback that sounded successful, even though the change was not persisted.

**Options considered:**
1. Roll back every mutation if storage fails.
2. Keep the in-session change but propagate the save result and warn that it is not persisted.
3. Retry storage writes automatically with exponential backoff.
4. Move project storage to IndexedDB and introduce explicit transactional operations.

**Chosen combination:** Option 2, paired with dirty-state handling. Create, rename, delete, restore, clear-all, and reset paths now report storage failures instead of falsely presenting persistence as successful. Full rollback and an IndexedDB migration would require a larger change to the storage model.

### 4. Invalid saved project data could be silently replaced by the starter project

**Issue:** Malformed or structurally invalid project JSON could cause the editor to fall back to defaults; a later save could replace the original value.

**Options considered:**
1. Keep the silent fallback to defaults.
2. Block startup until the user repairs the data manually.
3. Preserve the original raw value and provide a recovery download when possible.
4. Add a versioned schema migration system with explicit recovery checkpoints.

**Chosen combination:** Option 3 with a startup warning. The editor attempts to preserve the unreadable stored value and offers `project-recovery.json` for download before the user continues. A schema migration framework is still a useful future enhancement.

### 5. File rows mixed an interactive ARIA role with nested action buttons

**Issue:** A file row used `role="button"` while containing separate rename and delete buttons. This is an invalid/ambiguous interaction pattern for assistive technology, and keyboard events could conflict with the rename action.

**Options considered:**
1. Keep the custom role and add more keyboard-event exceptions.
2. Rebuild the component as a full ARIA listbox with managed focus.
3. Use one parent action area and route every action through custom event handling.
4. Use a native button for opening a file and keep rename/delete as sibling native buttons.

**Chosen combination:** Option 4, with visible keyboard focus styling. Native controls provide expected keyboard activation and avoid nesting interactive controls inside another button-like element.

### 6. HTML completion used an over-escaped regular expression for `aria-*` and `data-*`

**Issue:** The matching expression could treat the backslash sequence literally rather than recognizing word characters, so common ARIA and data attributes were not consistently recognized as attributes that should receive `=""`.

**Options considered:**
1. Offer values only for a hard-coded whitelist of exact attributes.
2. Correct the regular expression for the `aria-` and `data-` prefixes.
3. Insert only the attribute name and let the user type `=`.
4. Parse the surrounding HTML with a formal parser before deciding how to complete.

**Chosen combination:** Option 2, retaining the existing attribute value and caret-placement behavior. A full HTML parser would add complexity disproportionate to this editor's lightweight completion feature.

### 7. User-controlled names were embedded in generated CSS/JavaScript comments

**Issue:** File or library names may contain comment terminators or line breaks. Placing such names directly inside generated comment labels could corrupt generated source text.

**Options considered:**
1. Ban comment-sensitive characters in file and library names.
2. Normalize only generated comment labels, leaving the user-facing names unchanged.
3. Remove names from generated comments entirely.
4. Store names only in a separate manifest instead of source comments.

**Chosen combination:** Option 2. Comment terminators and line separators are normalized when generating labels for preview/export and the combined text file, without silently changing the names shown in the editor.

### 8. File-manager controls did not always match their success feedback

**Issue:** Create, rename, delete, restore, or clear operations could update the current session but fail to save to local storage; some paths did not reliably expose that distinction.

**Options considered:**
1. Revert in-memory changes when a storage write fails.
2. Keep the changes for the current session and clearly state they were not saved.
3. Queue writes for retry and display a pending-sync state.
4. Move to an asynchronous storage backend with transaction support.

**Chosen combination:** Option 2. Save results are propagated into operation feedback; successful direct saves clear the dirty state, and failed saves show warnings. Automatic retries and asynchronous storage remain out of scope for this no-build-step version.

### 9. Project documentation described a suggestions file that did not exist

**Issue:** The previous README referenced `intellisense-data.js`, while the HTML actually loaded three separate completion-data files.

**Options considered:**
1. Rename/merge the three current files into the documented filename.
2. Keep the files as they are and correct the documentation.
3. Generate one combined completion file during a build.
4. Move completion data into a JSON resource with a loader.

**Chosen combination:** Option 2. The current three-file structure requires no build pipeline, so the README now documents the actual files and their responsibilities.

## Remaining limitations and recommended next work

- **Runtime testing:** The repository now has a dependency-free Node integration test for Smart Import document recovery and JavaScript conflict handling (`node scripts/test-smart-import.mjs`), and GitHub Actions runs it. There is still no full real-browser/end-to-end cross-browser suite for the editor; live preview, downloads, storage quotas, and browser-specific behavior need additional manual/browser testing.
- **Large files:** Syntax highlighting and line numbers are refreshed for the full editor buffer after edits. Very large files may become slow. Possible improvements are frame-scheduled rendering, incremental line updates, a threshold-based reduced-highlighting mode, or adoption of an editor engine such as CodeMirror.
- **Advanced language support:** Completion data is curated and context heuristics are intentionally lightweight; it is not a full parser, language server, or framework-aware completion engine.
- **Accessibility:** File actions have native keyboard semantics and visible focus styles, but the IntelliSense popup and color picker would benefit from a dedicated screen-reader/keyboard accessibility pass.
- **Project fidelity:** The four-file bundle merges the current project files by language. It is not a multi-page build system and does not preserve every original asset as a separate file.

## Validation record

Review date: 2026-10-16.

- Parsed `script.js`, `html-suggestions.js`, `css-suggestions.js`, `js-suggestions.js`, and `next-word-suggestions.js` with the JavaScript parser (`new Function`): **pass**. This checks syntax only; it does not execute the application.
- Loaded the four suggestion-data scripts against a test window object and verified that each bank initializes, contextual tag attributes are arrays, and the next-word rules for all three languages are present.
- Exercised representative next-word rules for an HTML tag, a CSS display property, a JavaScript declaration, and a JavaScript assignment; all returned candidate lists.
- Checked caret offsets in the completion snippets and static next-word candidates: **no out-of-range offsets found**.
- Checked the HTML for duplicate IDs: **none found**.
- Checked static `getElementById` references against the HTML: no missing editor UI elements were found. The sole unmatched identifier, `btn`, appears in the default example JavaScript code rather than as a required editor UI element.
- Checked the local script/style references in `index.html`: all referenced local files are present in the repository.
- Re-checked markers for the corrected autocomplete pattern, race-safe download flow, bundle CSS/JS links, recovery flow, safe generated comment labels, native file-open buttons, responsive breakpoint alignment, and next-word continuation hooks.
- **Not performed:** interactive browser testing, cross-browser testing, or automated end-to-end testing. These should be completed before treating the changes as fully verified in runtime conditions.

### Live Word Tree (2026-10-18)

- Added the **Word Tree** button beside Help. Its entries are rebuilt from the currently loaded `EDITOR_INTELLISENSE_DATA` banks, including HTML elements and attributes, CSS properties and values, JavaScript words and members, snippets, quick symbols, and next-word continuation rules.
- The tree supports search, language filtering, expand/collapse controls, and clickable entries. Each entry opens a detail window with a Persian explanation and a short code example; interface labels and controls stay in English.
- Added `word-tree.js` to `index.html` and both standalone-build scripts so the single-file test editor includes the same feature. No separate hard-coded vocabulary copy is maintained.
- Syntax validation passed for the controller, and a DOM smoke test successfully rendered 5,127 clickable entries across 457 branches and opened a Persian item explanation with an example. Full browser and cross-browser testing remains outstanding.

### JavaScript suggestion-bank expansion (2026-10-18)

- Parsed all five application/data JavaScript files without executing the editor application: **pass**.
- Initialized all four completion-data scripts against a test `window` object: **pass**.
- Verified loaded JavaScript completion data: 582 words, 94 member roots, 1,304 member names, and 49 JavaScript snippets after the abbreviation expansion.
- Current next-word data has 125 rules (38 HTML, 33 CSS, 54 JavaScript) and 373 explicit candidate items; the historical JavaScript-only expansion initially introduced 54 JavaScript rules.
- Exercised representative JavaScript continuations for `switch`, `while`, `import`, `export`, `Math`, `Object`, `URL`, `localStorage`, `navigator`, `crypto`, and `requestAnimationFrame`: **pass**.
- Checked caret offsets in static next-word candidates and code snippets: **no out-of-range offsets found**.
- Verified case-sensitive JavaScript names such as `Map`/`map` and `Set`/`set` are preserved as separate completion entries.
- **Not performed for this change:** running the editor in a real browser or conducting cross-browser/end-to-end tests.

### HTML/CSS next-word expansion (2026-10-18)

- Expanded HTML contextual rules for ARIA states, `autocomplete`, form encodings, `crossorigin`, referrer policy, fetch priority, image decoding, media preload, content editing, table scope, file accept filters, virtual-keyboard input mode, enter-key hints, capture, media track kinds, and related enumerated values.
- Expanded CSS contextual rules for common value vocabularies such as overflow, flex wrapping, text alignment, font weight, text decoration, borders, object/background sizing, cursor, text wrapping, grid placement, typography, animation, transforms, containment, and color scheme; added continuations for keyframes, font faces, cascade layers, scopes, media preferences, sticky positioning, grid layouts, and reduced motion.
- Parsed all five JavaScript files and initialized all four completion-data scripts against a test `window` object: **pass**.
- Verified next-word data: 125 rules (38 HTML, 33 CSS, 54 JavaScript) and 373 explicitly listed candidate items, plus dynamically generated property-value candidates.
- Exercised representative HTML and CSS contexts including `autocomplete`, `fetchpriority`, `aria-pressed`, `inputmode`, `preload`, `enctype`, `crossorigin`, `overflow`, `text-align`, `font-weight`, `cursor`, `grid-auto-flow`, `@keyframes`, `@font-face`, color-scheme media queries, flex layout, sticky positioning, borders, and reduced-motion follow-ups: **pass**.
- Checked completion caret offsets: **no out-of-range values found**.
- **Not performed for this change:** interactive browser testing or cross-browser/end-to-end testing.

### Abbreviation and quick-symbol expansion (2026-10-18)

- Added 24 Emmet-style HTML abbreviation completions, 34 CSS shorthand suggestions with 46 numeric-mapping entries, 19 JavaScript abbreviation-trigger snippets, and additional quick-insert symbols for all three languages.
- Parsed all five JavaScript files and initialized all four suggestion-data scripts: **pass**.
- Verified the HTML abbreviation token detector supports punctuation-based aliases including `!`, `.container`, `#app`, and the child operator in `ul>li*3`; verified JavaScript shortcut triggers exist in the loaded bank. CSS numeric shorthands including `m10`, `m10-20`, `p8-16`, `w100`, `fz16`, `fw700`, `lh1.5`, `op0.5`, and `z10` resolve to expected declarations.
- Verified non-length shorthands such as `bgc10` are not incorrectly expanded as pixel values.
- Checked abbreviation and snippet caret positions: **no out-of-range offsets found**.
- **Not performed for this change:** interactive browser testing or cross-browser/end-to-end testing.



### Smart Import validation (2026-10-18)

- Added a separate Smart Import tab with its own `smart-import.js` and `smart-import.css` files; the primary editor stylesheet remains untouched.
- The tab supports mixed documents, local text-file reading, clipboard paste where available, analysis notes, editable outputs, and per-language apply checkboxes.
- Cleanup removes only exact repeated inline CSS/JavaScript blocks. Multiple document wrappers and external dependency references are reported for manual review; external code is never fetched automatically.
- Applying code requires explicit confirmation and updates only the chosen language files, preserving other project files. Browser storage failures are reported.
- Static syntax checks, the Smart Import integration test, and standalone-bundle generation are configured in the repository workflow; interactive browser and mobile testing remain manual validation steps.
- Added document-candidate recovery ahead of extraction after the user-provided invitation sample showed that a full HTML page could be embedded inside another page's `<style>` block. The selector scores complete document candidates and prefers the latest on a structural tie; it avoids merging old and new page versions into three broken outputs.
- Expanded the dependency-free Smart Import integration test to cover selection of the coherent latest document separately from repeated JavaScript declarations in a valid single document.


## Reference material

The completion banks are curated against browser-language references and should be revisited as standards change:

- [Emmet abbreviation reference](https://docs.emmet.io/abbreviations/)
- [Emmet CSS abbreviations](https://docs.emmet.io/css-abbreviations/)
- [MDN HTML reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference)
- [MDN HTML elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)
- [MDN CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- [MDN HTML attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes)
- [MDN HTML global attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes)
- [MDN CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties)
- [MDN CSS values](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values)
- [WHATWG HTML Living Standard](https://html.spec.whatwg.org/multipage/)
- [MDN JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [MDN JavaScript standard built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
- [MDN Web API reference](https://developer.mozilla.org/en-US/docs/Web/API)
- [ECMAScript language specification (TC39)](https://tc39.es/ecma262/)

## License

No license file is currently present in this repository. Confirm the repository owner's licensing terms before redistribution.


### GitHub update indicator validation (2026-10-18)

- Added a compact, responsive status strip that reads the latest commit on the repository's `main` branch through the public GitHub API.
- The timestamp is formatted for `Asia/Tehran`, and the displayed link opens the corresponding commit.
- Added the new script to both standalone-editor builders and to the GitHub Actions JavaScript syntax-check step.
- Network/API availability and the final GitHub Pages deployment time are separate from the latest commit timestamp; interactive browser verification remains a manual check.
