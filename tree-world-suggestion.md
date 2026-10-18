# Tree of HTML, CSS, and JavaScript Suggestions

> **Visual documentation only.** This file is not imported, linked, or loaded by the editor. It does not change application behavior.

This document maps the editor's **context-aware next-word suggestion rules** as branching trees. A branch starts at a recognized typing context and leads to the choices the editor may offer next. It documents the curated suggestion bank, not every word in the HTML, CSS, JavaScript standards or every possible program.

- **Rule source:** `next-word-suggestions.js`
- **Other vocabulary sources:** `html-suggestions.js`, `css-suggestions.js`, and `js-suggestions.js`
- **Documented rule contexts:** 123 pattern rules extracted from the current source file.
- Some continuations are generated dynamically from the selected tag, attribute, property, or runtime data; those cannot be represented as a finite static list here.
- The text shown as a context is the rule's matching pattern, kept close to the implementation so this tree can be checked against the source.

## At a glance

```text
HTML
  └── recognized tag/attribute/value context
       ├── attribute or value suggestion
       ├── another valid value
       └── complete element

CSS
  └── recognized property/selector/at-rule context
       ├── property value
       ├── related declaration or layout rule
       └── responsive/accessibility continuation

JavaScript
  └── recognized keyword/object/API context
       ├── initializer or expression
       ├── method/property/call pattern
       └── control flow, module, or browser API continuation
```

**How to read each branch:** `context` is the text pattern that activates a rule; the child items are labels offered by that rule. Suggestions are finite and context-dependent. Accepting one suggestion does not guarantee another suggestion will appear—the next context must match another rule.


## HTML

```text
HTML
  └── Context: /<[^<>]*\bclass\s*=\s*["']$/i, items: [
       ├── container
       ├── wrapper
       ├── card
       ├── active
       ├── hidden
       ├── sr-only
  └── Context: /<[^<>]*\bid\s*=\s*["']$/i, items: [
       ├── app
       ├── root
       ├── main
       ├── content
       ├── header
       ├── footer
  └── Context: /<([a-z][\w:-]*)\s+\btype\s*=\s*["']$/i, create: function (match) {
       └── [choices generated dynamically by a create() rule]
  └── Context: /<[^<>]*\brole\s*=\s*["']$/i, items: [
       ├── button
       ├── dialog
       ├── alert
       ├── status
       ├── navigation
       ├── main
       ├── tab
       ├── tabpanel
       ├── toolbar
       ├── region
  └── Context: /<[^<>]*\b(?:aria-hidden|aria-expanded)\s*=\s*["']$/i, items: [
       ├── true
       ├── false
  └── Context: /<[^<>]*\baria-live\s*=\s*["']$/i, items: [
       ├── polite
       ├── assertive
       ├── off
  └── Context: /<[^<>]*\btarget\s*=\s*["']$/i, items: [
       ├── _self
       ├── _blank
       ├── _parent
       ├── _top
  └── Context: /<[^<>]*\brel\s*=\s*["']$/i, items: [
       ├── noopener noreferrer
       ├── stylesheet
       ├── icon
       ├── preconnect
       ├── modulepreload
  └── Context: /<[^<>]*\bloading\s*=\s*["']$/i, items: [
       ├── lazy
       ├── eager
  └── Context: /<[^<>]*\bmethod\s*=\s*["']$/i, items: [
       ├── get
       ├── post
       ├── dialog
  └── Context: /<[^<>]*\bdir\s*=\s*["']$/i, items: [
       ├── ltr
       ├── rtl
       ├── auto
  └── Context: /<[^<>]*\blang\s*=\s*["']$/i, items: [
       ├── en
       ├── fa
       ├── ar
       ├── fr
       ├── de
       ├── es
  └── Context: /<[^<>]*\b(?:aria-checked|aria-pressed)\s*=\s*["']$/i, items: [
       ├── true
       ├── false
       ├── mixed
  └── Context: /<[^<>]*\b(?:aria-selected|aria-disabled|aria-required|aria-busy)\s*=\s*["']$/i, items: [
       ├── true
       ├── false
  └── Context: /<[^<>]*\baria-invalid\s*=\s*["']$/i, items: [
       ├── false
       ├── true
       ├── grammar
       ├── spelling
  └── Context: /<[^<>]*\baria-current\s*=\s*["']$/i, items: [
       ├── page
       ├── step
       ├── location
       ├── date
       ├── time
       ├── true
       ├── false
  └── Context: /<[^<>]*\baria-sort\s*=\s*["']$/i, items: [
       ├── ascending
       ├── descending
       ├── none
       ├── other
  └── Context: /<[^<>]*\b(?:autocomplete)\s*=\s*["']$/i, items: [
       ├── on
       ├── off
       ├── name
       ├── given-name
       ├── family-name
       ├── email
       ├── username
       ├── current-password
       ├── new-password
       ├── one-time-code
       ├── street-address
       ├── postal-code
       ├── tel
       ├── url
  └── Context: /<[^<>]*\b(?:enctype|formenctype)\s*=\s*["']$/i, items: [
       ├── application/x-www-form-urlencoded
       ├── multipart/form-data
       ├── text/plain
  └── Context: /<[^<>]*\bcrossorigin\s*=\s*["']$/i, items: [
       ├── anonymous
       ├── use-credentials
  └── Context: /<[^<>]*\breferrerpolicy\s*=\s*["']$/i, items: [
       ├── no-referrer
       ├── no-referrer-when-downgrade
       ├── origin
       ├── origin-when-cross-origin
       ├── same-origin
       ├── strict-origin
       ├── strict-origin-when-cross-origin
       ├── unsafe-url
  └── Context: /<[^<>]*\b(?:fetchpriority)\s*=\s*["']$/i, items: [
       ├── high
       ├── low
       ├── auto
  └── Context: /<[^<>]*\bdecoding\s*=\s*["']$/i, items: [
       ├── async
       ├── sync
       ├── auto
  └── Context: /<[^<>]*\bpreload\s*=\s*["']$/i, items: [
       ├── none
       ├── metadata
       ├── auto
  └── Context: /<[^<>]*\b(?:draggable|spellcheck)\s*=\s*["']$/i, items: [
       ├── true
       ├── false
  └── Context: /<[^<>]*\bcontenteditable\s*=\s*["']$/i, items: [
       ├── true
       ├── false
       ├── plaintext-only
  └── Context: /<[^<>]*\bscope\s*=\s*["']$/i, items: [
       ├── row
       ├── col
       ├── rowgroup
       ├── colgroup
  └── Context: /<[^<>]*\baccept\s*=\s*["']$/i, items: [
       ├── image/*
       ├── audio/*
       ├── video/*
       ├── .pdf
       ├── .png,.jpg,.jpeg
       ├── .txt,.csv
  └── Context: /<[^<>]*\binputmode\s*=\s*["']$/i, items: [
       ├── none
       ├── text
       ├── decimal
       ├── numeric
       ├── tel
       ├── search
       ├── email
       ├── url
  └── Context: /<[^<>]*\benterkeyhint\s*=\s*["']$/i, items: [
       ├── enter
       ├── done
       ├── go
       ├── next
       ├── previous
       ├── search
       ├── send
  └── Context: /<[^<>]*\bcapture\s*=\s*["']$/i, items: [
       ├── user
       ├── environment
  └── Context: /<[^<>]*\bkind\s*=\s*["']$/i, items: [
       ├── subtitles
       ├── captions
       ├── descriptions
       ├── chapters
       ├── metadata
  └── Context: /<[^<>]*\bshape\s*=\s*["']$/i, items: [
       ├── rect
       ├── circle
       ├── poly
       ├── default
  └── Context: /<[^<>]*\b(?:aria-haspopup)\s*=\s*["']$/i, items: [
       ├── false
       ├── true
       ├── menu
       ├── listbox
       ├── tree
       ├── grid
       ├── dialog
  └── Context: /<[^<>]*\b(?:aria-autocomplete)\s*=\s*["']$/i, items: [
       ├── none
       ├── inline
       ├── list
       ├── both
  └── Context: /<html\s*$/i, items: [
       ├── lang="en"
       ├── lang="fa" dir="rtl"
  └── Context: /<([a-z][\w:-]*)$/i, create: htmlTagContinuation }
       └── [continuation is generated by helper logic or no static labels are listed]
```

## CSS

```text
CSS
  └── Context: /(?:^|[\n;{]\s*)display\s*$/i
       ├── : flex;
       ├── : grid;
       ├── : block;
       ├── : inline-flex;
       ├── : none;
  └── Context: /(?:^|[\n;{]\s*)position\s*$/i
       ├── : relative;
       ├── : absolute;
       ├── : fixed;
       ├── : sticky;
  └── Context: /(?:^|[\n;{]\s*)(color|background-color|border-color)\s*$/i
       ├── : #2563eb;
       ├── : #111827;
       ├── : #ffffff;
       ├── : currentColor;
       ├── : transparent;
       ├── : var(--primary-color);
  └── Context: /(?:^|[\n;{]\s*)(width|height|max-width|min-width|max-height|min-height)\s*$/i
       ├── : 100%;
       ├── : auto;
       ├── : fit-content;
       ├── : 100dvh;
       ├── : min(100%, 60rem);
  └── Context: /(?:^|[\n;{]\s*)(margin|padding|gap|row-gap|column-gap)\s*$/i
       ├── : 0;
       ├── : 0.5rem;
       ├── : 1rem;
       ├── : 1.5rem;
       ├── : auto;
  └── Context: /(?:^|[\n;{]\s*)display\s*:\s*(?:flex|inline-flex|grid)\s*;?$/i
       ├── Add align-items: center
       ├── Add justify-content: center
       ├── Add gap: 1rem
       ├── Add flex-wrap: wrap
       ├── Add flex-direction: column
       ├── Add justify-content: space-between
  └── Context: /(?:^|[\n;{]\s*)align-items\s*:\s*[^;\n]+;?$/i
       ├── Add justify-content: center
       ├── Add gap: 1rem
       ├── Add flex-wrap: wrap
  └── Context: /(?:^|[\n;{]\s*)grid-template-columns\s*$/i
       ├── : repeat(auto-fit, minmax(220px, 1fr));
       ├── : 1fr 1fr;
       ├── : repeat(3, 1fr);
  └── Context: /(?:^|[\n;{]\s*)@media\s*$/i
       ├── (max-width: 768px) { … }
       ├── (prefers-reduced-motion: reduce) { … }
  └── Context: /(?:^|[\n;{]\s*)@supports\s*$/i, items: [
       ├── (display: grid) { … }
       ├── (backdrop-filter: blur(4px)) { … }
  └── Context: /(?:^|[\n;{]\s*)@container\s*$/i, items: [
       ├── (min-width: 400px) { … }
  └── Context: /(?:^|[\n;{]\s*)font-size\s*$/i, items: [
       ├── : 1rem;
       ├── : 1.25rem;
       ├── : clamp(1rem, 2vw, 2rem);
       ├── : var(--font-size);
  └── Context: /(?:^|[\n;{]\s*)(flex-direction|justify-content|align-items)\s*$/i, create: function (match) {
       ├── : 
  └── Context: /(?:^|[\n;{]\s*)color\s*:\s*[^;\n]+;?$/i, items: [
       ├── Add background-color
       ├── Add contrast-safe text color
  └── Context: /(?:^|[\n;{]\s*)display\s*:\s*grid\s*;?$/i, items: [
       ├── Add responsive grid columns
       ├── Add place-items: center
       ├── Add gap: 1rem
  └── Context: /(?:^|[\n;{]\s*)position\s*:\s*absolute\s*;?$/i, items: [
       ├── Add inset: 0
       ├── Add top/right/bottom/left: 0
       ├── Add z-index: 1
  └── Context: /(?:^|[\n;{]\s*)(overflow|overflow-x|overflow-y|flex-wrap|text-align|font-weight|font-style|text-transform|text-decoration-line|border-style|border-top-style|border-right-style|border-bottom-style|border-left-style|border-collapse|box-sizing|object-fit|background-repeat|background-size|background-position|cursor|visibility|white-space|word-break|overflow-wrap|pointer-events|user-select|list-style-type|outline-style|resize|table-layout|appearance|scroll-behavior|text-overflow|object-position|flex-flow|grid-auto-flow|grid-auto-columns|grid-auto-rows|grid-template-rows|align-content|align-self|justify-items|justify-self|place-items|place-content|place-self|font-family|line-height|letter-spacing|word-spacing|vertical-align|opacity|z-index|order|flex-grow|flex-shrink|aspect-ratio|color-scheme|isolation|contain|container-type|background-image|border|outline|box-shadow|text-shadow|transform|transition|animation|gap|row-gap|column-gap|margin-inline|margin-block|padding-inline|padding-block)\s*$/i
       ├── : 
  └── Context: /(?:^|[\n;{]\s*)@import\s*$/i, items: [
       ├──  url("./styles.css");
       ├──  url("https://example.com/styles.css") layer(external);
  └── Context: /(?:^|[\n;{]\s*)@keyframes\s*$/i, items: [
       ├──  fade-in { from { opacity: 0; } to { opacity: 1; } }
       ├──  slide-in { from { transform: translateY(8px); } to { transform: translateY(0); } }
  └── Context: /(?:^|[\n;{]\s*)@font-face\s*$/i, items: [
       ├──  { font-family: "CustomFont"; src: url("font.woff2") format("woff2"); font-display: swap; }
  └── Context: /(?:^|[\n;{]\s*)@layer\s*$/i, items: [
       ├──  reset, base, components, utilities;
       ├──  components { … }
  └── Context: /(?:^|[\n;{]\s*)@scope\s*$/i, items: [
       ├──  (.component) { … }
       ├──  (.component) to (.component__limit) { … }
  └── Context: /(?:^|[\n;{]\s*)@starting-style\s*$/i, items: [
       ├──  { opacity: 0; transform: translateY(8px); }
  └── Context: /(?:^|[\n;{]\s*)@page\s*$/i, items: [
       ├──  { margin: 1cm; }
       ├──  :first { margin-top: 0; }
  └── Context: /(?:^|[\n;{]\s*)@media\s*\(\s*prefers-color-scheme\s*:\s*$/i, items: [
       ├── dark) { … }
       ├── light) { … }
  └── Context: /(?:^|[\n;{]\s*)@media\s*\(\s*prefers-reduced-motion\s*:\s*$/i, items: [
       ├── reduce) { … }
       ├── no-preference) { … }
  └── Context: /(?:^|[\n;{]\s*)flex-direction\s*:\s*(?:row|row-reverse|column|column-reverse)\s*;?$/i, items: [
       ├── Add flex-wrap: wrap
       ├── Add gap: 1rem
       ├── Add align-items: center
  └── Context: /(?:^|[\n;{]\s*)grid-template-columns\s*:\s*[^;\n]+;?$/i, items: [
       ├── Add grid-template-rows: auto 1fr auto
       ├── Add grid-auto-flow: row
       ├── Add place-items: center
  └── Context: /(?:^|[\n;{]\s*)position\s*:\s*sticky\s*;?$/i, items: [
       ├── Add top: 0
       ├── Add z-index: 10
  └── Context: /(?:^|[\n;{]\s*)font-size\s*:\s*[^;\n]+;?$/i, items: [
       ├── Add line-height: 1.5
       ├── Add font-weight: 600
  └── Context: /(?:^|[\n;{]\s*)border-radius\s*:\s*[^;\n]+;?$/i, items: [
       ├── Add overflow: hidden
       ├── Add border: 1px solid #e5e7eb
  └── Context: /(?:^|[\n;{]\s*)transition\s*:\s*[^;\n]+;?$/i, items: [
       ├── Add @media (prefers-reduced-motion: reduce)
```

## JavaScript

```text
JavaScript
  └── Context: /\bnew$/i, items: [
       ├──  Map()
       ├──  Set()
       ├──  Date()
       ├──  URL(\
       ├──  AbortController()
       ├──  IntersectionObserver(callback)
  └── Context: /\bawait$/i, items: [
       ├──  fetch(\
       ├──  Promise.resolve(value)
       ├──  response.json()
  └── Context: /\bthrow$/i, items: [
       ├──  new Error(\
       ├──  new TypeError(\
  └── Context: /\btry$/i, items: [
       ├──  { … } catch (error) { … }
  └── Context: /\bcatch$/i, items: [
       ├──  (error) { … }
  └── Context: /\bcatch\s*\(\s*$/i, items: [
       ├── error
       ├── err
  └── Context: /\basync$/i, items: [
       ├──  function name() { … }
       ├──  () => { … }
  └── Context: /\bclass$/i, items: [
       ├──  Name { constructor() { … } }
  └── Context: /\bfor$/i, items: [
       ├──  (let i = 0; i < length; i++) { … }
       ├──  (const item of items) { … }
  └── Context: /\bfor\s*\(\s*$/i, items: [
       ├── let i = 0; i < items.length; i++
       ├── const item of items
       ├── const [key, value] of Object.entries(object)
  └── Context: /\bPromise$/i, items: [
       ├── .resolve(value)
       ├── .all(items)
       ├── .allSettled(items)
       ├── .reject(error)
  └── Context: /\bJSON$/i, items: [
       ├── .parse(text)
       ├── .stringify(value, null, 2)
  └── Context: /\b(?:map|filter|forEach|find|some|every)$/i, items: [
       ├── ((item) => item)
       ├── ((item) => item.property)
  └── Context: /\b(?:const|let|var)\s+[A-Za-z_$][\w$]*\s*=\s*$/i
       ├── null
       ├── []
       ├── {}
       ├── false
       ├── 0
       ├── document.querySelector()
       ├── new Map()
       ├── new Set()
       ├── async () => { … }
  └── Context: /\b(?:const|let|var)$/i
       ├── name = …
       ├── element = document.querySelector(…)
       ├── items = []
  └── Context: /\bfunction$/i
       ├── name() { … }
       ├── name(value) { return value; }
  └── Context: /\bif$/i
       ├── (condition) { … }
       ├── (!condition) return;
  └── Context: /\bif\s*\(\s*$/i
       ├── condition
       ├── element
       ├── event.target
       ├── value !== null
  └── Context: /\bdocument$/i
       ├── .querySelector(\
       ├── .getElementById(\
       ├── .createElement(\
       ├── .querySelectorAll(\
  └── Context: /\bconsole$/i
       ├── .log(value);
       ├── .warn(message);
       ├── .error(error);
       ├── .table(data);
  └── Context: /\bwindow$/i
       ├── .addEventListener()
       ├── .matchMedia(\
       ├── .localStorage
       ├── .location
  └── Context: /\bfetch$/i
       ├── (\
  └── Context: /\baddEventListener$/i
       ├── (\
  └── Context: /\b(?:querySelector|getElementById|querySelectorAll|createElement)$/i
       └── [choices generated dynamically by a create() rule]
  └── Context: /\breturn$/i
       ├── value;
       ├── null;
       ├── Promise.resolve(value);
       ├── Continue on next line
  └── Context: /=>$/i
       ├──  { … }
       ├──  value
  └── Context: /\bswitch$/i, items: [
       ├──  (expression) { … }
  └── Context: /\bswitch\s*\(\s*$/i, items: [
       ├── expression
       ├── value
       ├── event.key
       ├── status
  └── Context: /\bwhile$/i, items: [
       ├──  (condition) { … }
  └── Context: /\bwhile\s*\(\s*$/i, items: [
       ├── condition
       ├── index < items.length
       ├── element !== null
  └── Context: /\bdo$/i, items: [
       ├──  { … } while (condition);
  └── Context: /\belse$/i, items: [
       ├──  { … }
       ├──  if (condition) { … }
  └── Context: /\bfinally$/i, items: [
       ├──  { … }
  └── Context: /\bcase$/i, items: [
       ├──  value:
       ├──  "name":
  └── Context: /\bdefault$/i, items: [
       ├── :
  └── Context: /\bimport$/i, items: [
       ├──  { name } from "./module.js";
       ├──  name from "./module.js";
       ├──  "./module.js";
  └── Context: /\bexport$/i, items: [
       ├──  default value;
       ├──  { name };
       ├──  function name() { … }
  └── Context: /\bMath$/i, items: [
       ├── .random()
       ├── .round(value)
       ├── .max(a, b)
       ├── .min(a, b)
       ├── .floor(value)
       ├── .abs(value)
  └── Context: /\bArray$/i, items: [
       ├── .isArray(value)
       ├── .from(iterable)
       ├── .of(value)
  └── Context: /\bObject$/i, items: [
       ├── .keys(object)
       ├── .values(object)
       ├── .entries(object)
       ├── .fromEntries(entries)
  └── Context: /\bDate$/i, items: [
       ├── .now()
       ├── .parse(dateString)
       ├── ()
  └── Context: /\bRegExp$/i, items: [
       ├── (pattern, flags)
  └── Context: /\bURL$/i, items: [
       ├── ('https://example.com')
       ├── .createObjectURL(blob)
       ├── .revokeObjectURL(url)
  └── Context: /\bURLSearchParams$/i, items: [
       ├── ()
       ├── (location.search)
  └── Context: /\blocalStorage$/i, items: [
       ├── .getItem("key")
       ├── .setItem("key", value)
       ├── .removeItem("key")
       ├── .clear()
  └── Context: /\bsessionStorage$/i, items: [
       ├── .getItem("key")
       ├── .setItem("key", value)
       ├── .removeItem("key")
  └── Context: /\bnavigator$/i, items: [
       ├── .clipboard
       ├── .geolocation
       ├── .mediaDevices
       ├── .onLine
       ├── .language
  └── Context: /\blocation$/i, items: [
       ├── .href
       ├── .pathname
       ├── .search
       ├── .reload()
  └── Context: /\bhistory$/i, items: [
       ├── .back()
       ├── .forward()
       ├── .pushState(state, "", url)
       ├── .replaceState(state, "", url)
  └── Context: /\bcrypto$/i, items: [
       ├── .randomUUID()
       ├── .getRandomValues(array)
       ├── .subtle.digest("SHA-256", data)
  └── Context: /\bperformance$/i, items: [
       ├── .now()
       ├── .mark("name")
       ├── .measure("name", "start", "end")
  └── Context: /\bsetTimeout$/i, items: [
       ├── (() => { … }, delay)
  └── Context: /\bsetInterval$/i, items: [
       ├── (() => { … }, delay)
  └── Context: /\brequestAnimationFrame$/i, items: [
       ├── ((timestamp) => { … })
```

## What this tree does and does not represent

- It shows the **explicit next-word contexts and their listed choices** in the current rule source, including branching alternatives.
- The broader completion banks also contain HTML element names and attributes, CSS properties and values, JavaScript language/global/browser API names, snippets, abbreviations, and quick-insert symbols. Those are vocabulary/completion lists rather than a single chained tree, so they do not all have one natural parent-child sequence.
- This is not an exhaustive list of every valid HTML tag, CSS property, JavaScript identifier, or possible code continuation.
- It is not an AI model and does not predict arbitrary code. The current implementation uses curated rules plus a few dynamic continuations.
- Editing this Markdown file alone has **no effect** on suggestions or editor behavior.

## Related source files

- `next-word-suggestions.js` — contextual next-word rules.
- `html-suggestions.js` — HTML vocabulary, attributes, abbreviations, and symbols.
- `css-suggestions.js` — CSS vocabulary, property values, snippets, abbreviations, and symbols.
- `js-suggestions.js` — JavaScript vocabulary, members, snippets, and symbols.
- `README.md` — project overview and documentation.
