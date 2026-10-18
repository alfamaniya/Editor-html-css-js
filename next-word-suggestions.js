// Context-aware continuation suggestions for HTML, CSS, and JavaScript.
// This is a curated lightweight n-gram/rule database, not an AI model or a parser.
(function () {
    'use strict';

    const htmlVoidTags = new Set([
        'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
        'link', 'meta', 'param', 'source', 'track', 'wbr'
    ]);

    const htmlAttributePriority = {
        a: ['href', 'target', 'rel', 'title'],
        area: ['href', 'alt', 'shape', 'coords'],
        button: ['type', 'disabled', 'aria-label', 'name'],
        form: ['action', 'method', 'enctype', 'novalidate'],
        img: ['src', 'alt', 'width', 'height'],
        input: ['type', 'name', 'placeholder', 'required'],
        label: ['for', 'form'],
        link: ['rel', 'href', 'media', 'type'],
        script: ['src', 'type', 'defer', 'async'],
        source: ['src', 'srcset', 'type', 'media'],
        textarea: ['name', 'rows', 'cols', 'placeholder'],
        video: ['src', 'controls', 'poster', 'width'],
        iframe: ['src', 'title', 'loading', 'sandbox']
    };

    function htmlTagContinuation(match) {
        const tag = match[1];
        const normalizedTag = tag.toLowerCase();
        const data = window.EDITOR_INTELLISENSE_DATA || {};
        const specific = data.htmlAttrsByTag && data.htmlAttrsByTag[normalizedTag];
        const priority = htmlAttributePriority[normalizedTag] || [];
        const attrs = Array.from(new Set(
            priority.concat(['class', 'id', 'style', 'aria-label'], Array.isArray(specific) ? specific : [])
        )).slice(0, 5);

        const items = attrs.map(function (attr) {
            const insert = ' ' + attr + '=""';
            return {
                label: attr + '=""',
                insert: insert,
                description: 'Add the ' + attr + ' attribute',
                caret: insert.length - 1
            };
        });

        if (htmlVoidTags.has(normalizedTag)) {
            items.push({ label: 'Finish tag with >', insert: '>', description: 'Finish the void element', caret: 1 });
            items.push({ label: 'Finish tag with />', insert: ' />', description: 'Finish with a self-closing slash', caret: 3 });
        } else {
            const insert = '>\n    \n</' + tag + '>';
            items.push({
                label: 'Complete <' + tag + '>…</' + tag + '>',
                insert: insert,
                description: 'Create a matching element and place the caret inside it',
                caret: 6
            });
        }
        return items;
    }

    const nextWordRules = {
        html: [
            // Predict common attribute values after the attribute-name completion inserted its quotes.
            { pattern: /<[^<>]*\bclass\s*=\s*["']$/i, items: [
                { label: 'container', insert: 'container', description: 'Common layout class' },
                { label: 'wrapper', insert: 'wrapper', description: 'Common wrapper class' },
                { label: 'card', insert: 'card', description: 'Common card class' },
                { label: 'active', insert: 'active', description: 'Common active-state class' },
                { label: 'hidden', insert: 'hidden', description: 'Common hidden-state class' },
                { label: 'sr-only', insert: 'sr-only', description: 'Visually hidden but accessible text' }
            ]},
            { pattern: /<[^<>]*\bid\s*=\s*["']$/i, items: [
                { label: 'app', insert: 'app', description: 'Application root ID' },
                { label: 'root', insert: 'root', description: 'Root container ID' },
                { label: 'main', insert: 'main', description: 'Main content ID' },
                { label: 'content', insert: 'content', description: 'Content container ID' },
                { label: 'header', insert: 'header', description: 'Header ID' },
                { label: 'footer', insert: 'footer', description: 'Footer ID' }
            ]},
            { pattern: /<([a-z][\w:-]*)\s+\btype\s*=\s*["']$/i, create: function (match) {
                const tag = match[1].toLowerCase();
                const values = tag === 'input'
                    ? 'text email password number checkbox radio submit button reset date datetime-local file hidden image month search tel time url week color range'.split(/\s+/)
                    : (tag === 'button' ? ['button', 'submit', 'reset']
                    : (tag === 'script' ? ['text/javascript', 'module', 'importmap', 'application/json']
                    : (tag === 'link' ? ['stylesheet', 'icon', 'preconnect', 'modulepreload']
                    : ['text/plain', 'application/json'])));
                return values.map(function (value) { return { label: value, insert: value, description: 'Value for the ' + tag + ' type attribute' }; });
            }},
            { pattern: /<[^<>]*\brole\s*=\s*["']$/i, items: [
                { label: 'button', insert: 'button' }, { label: 'dialog', insert: 'dialog' },
                { label: 'alert', insert: 'alert' }, { label: 'status', insert: 'status' },
                { label: 'navigation', insert: 'navigation' }, { label: 'main', insert: 'main' },
                { label: 'tab', insert: 'tab' }, { label: 'tabpanel', insert: 'tabpanel' },
                { label: 'toolbar', insert: 'toolbar' }, { label: 'region', insert: 'region' }
            ]},
            { pattern: /<[^<>]*\b(?:aria-hidden|aria-expanded)\s*=\s*["']$/i, items: [
                { label: 'true', insert: 'true' }, { label: 'false', insert: 'false' }
            ]},
            { pattern: /<[^<>]*\baria-live\s*=\s*["']$/i, items: [
                { label: 'polite', insert: 'polite' }, { label: 'assertive', insert: 'assertive' }, { label: 'off', insert: 'off' }
            ]},
            { pattern: /<[^<>]*\btarget\s*=\s*["']$/i, items: [
                { label: '_self', insert: '_self' }, { label: '_blank', insert: '_blank' },
                { label: '_parent', insert: '_parent' }, { label: '_top', insert: '_top' }
            ]},
            { pattern: /<[^<>]*\brel\s*=\s*["']$/i, items: [
                { label: 'noopener noreferrer', insert: 'noopener noreferrer' },
                { label: 'stylesheet', insert: 'stylesheet' }, { label: 'icon', insert: 'icon' },
                { label: 'preconnect', insert: 'preconnect' }, { label: 'modulepreload', insert: 'modulepreload' }
            ]},
            { pattern: /<[^<>]*\bloading\s*=\s*["']$/i, items: [
                { label: 'lazy', insert: 'lazy' }, { label: 'eager', insert: 'eager' }
            ]},
            { pattern: /<[^<>]*\bmethod\s*=\s*["']$/i, items: [
                { label: 'get', insert: 'get' }, { label: 'post', insert: 'post' }, { label: 'dialog', insert: 'dialog' }
            ]},
            { pattern: /<[^<>]*\bdir\s*=\s*["']$/i, items: [
                { label: 'ltr', insert: 'ltr' }, { label: 'rtl', insert: 'rtl' }, { label: 'auto', insert: 'auto' }
            ]},
            { pattern: /<[^<>]*\blang\s*=\s*["']$/i, items: [
                { label: 'en', insert: 'en' }, { label: 'fa', insert: 'fa' }, { label: 'ar', insert: 'ar' },
                { label: 'fr', insert: 'fr' }, { label: 'de', insert: 'de' }, { label: 'es', insert: 'es' }
            ]},
            { pattern: /<html\s*$/i, items: [
                { label: 'lang="en"', insert: ' lang="en"', description: 'Set the document language', caret: 7 },
                { label: 'lang="fa" dir="rtl"', insert: ' lang="fa" dir="rtl"', description: 'Set Persian language and direction', caret: 7 }
            ]},
            // When another HTML tag completion is accepted, suggest attributes or a paired element.
            { pattern: /<([a-z][\w:-]*)$/i, create: htmlTagContinuation }
        ],

        css: [
            // Offer common values immediately after accepting a CSS property name.
            {
                pattern: /(?:^|[\n;{]\s*)display\s*$/i,
                items: [
                    { label: ': flex;', insert: ': flex;', description: 'Use a flex layout' },
                    { label: ': grid;', insert: ': grid;', description: 'Use a grid layout' },
                    { label: ': block;', insert: ': block;', description: 'Use a block layout' },
                    { label: ': inline-flex;', insert: ': inline-flex;', description: 'Use an inline flex layout' },
                    { label: ': none;', insert: ': none;', description: 'Hide the element' }
                ]
            },
            {
                pattern: /(?:^|[\n;{]\s*)position\s*$/i,
                items: [
                    { label: ': relative;', insert: ': relative;', description: 'Position relative to normal flow' },
                    { label: ': absolute;', insert: ': absolute;', description: 'Position relative to a positioned ancestor' },
                    { label: ': fixed;', insert: ': fixed;', description: 'Fix to the viewport' },
                    { label: ': sticky;', insert: ': sticky;', description: 'Switch between flow and fixed positioning' }
                ]
            },
            {
                pattern: /(?:^|[\n;{]\s*)(color|background-color|border-color)\s*$/i,
                items: [
                    { label: ': #2563eb;', insert: ': #2563eb;', description: 'Blue color' },
                    { label: ': #111827;', insert: ': #111827;', description: 'Dark slate text' },
                    { label: ': #ffffff;', insert: ': #ffffff;', description: 'White color' },
                    { label: ': currentColor;', insert: ': currentColor;', description: 'Reuse the current text color' },
                    { label: ': transparent;', insert: ': transparent;', description: 'Transparent color' },
                    { label: ': var(--primary-color);', insert: ': var(--primary-color);', description: 'Use a custom property' }
                ]
            },
            {
                pattern: /(?:^|[\n;{]\s*)(width|height|max-width|min-width|max-height|min-height)\s*$/i,
                items: [
                    { label: ': 100%;', insert: ': 100%;', description: 'Fill the available parent size' },
                    { label: ': auto;', insert: ': auto;', description: 'Let the browser calculate the size' },
                    { label: ': fit-content;', insert: ': fit-content;', description: 'Fit the content within constraints' },
                    { label: ': 100dvh;', insert: ': 100dvh;', description: 'Use the dynamic viewport height unit' },
                    { label: ': min(100%, 60rem);', insert: ': min(100%, 60rem);', description: 'Use a responsive maximum size' }
                ]
            },
            {
                pattern: /(?:^|[\n;{]\s*)(margin|padding|gap|row-gap|column-gap)\s*$/i,
                items: [
                    { label: ': 0;', insert: ': 0;', description: 'Remove spacing' },
                    { label: ': 0.5rem;', insert: ': 0.5rem;', description: 'Compact spacing' },
                    { label: ': 1rem;', insert: ': 1rem;', description: 'Standard spacing' },
                    { label: ': 1.5rem;', insert: ': 1.5rem;', description: 'Larger spacing' },
                    { label: ': auto;', insert: ': auto;', description: 'Automatic spacing (where supported)' }
                ]
            },
            {
                pattern: /(?:^|[\n;{]\s*)display\s*:\s*(?:flex|inline-flex|grid)\s*;?$/i,
                items: [
                    { label: 'Add align-items: center', insert: '\n    align-items: center;', description: 'Align children on the cross axis' },
                    { label: 'Add justify-content: center', insert: '\n    justify-content: center;', description: 'Center children on the main axis' },
                    { label: 'Add gap: 1rem', insert: '\n    gap: 1rem;', description: 'Add consistent spacing between children' }
                ]
            },
            {
                pattern: /(?:^|[\n;{]\s*)align-items\s*:\s*[^;\n]+;?$/i,
                items: [
                    { label: 'Add justify-content: center', insert: '\n    justify-content: center;', description: 'Center children along the main axis' },
                    { label: 'Add gap: 1rem', insert: '\n    gap: 1rem;', description: 'Add consistent spacing between children' },
                    { label: 'Add flex-wrap: wrap', insert: '\n    flex-wrap: wrap;', description: 'Allow children to wrap onto new rows' }
                ]
            },
            {
                pattern: /(?:^|[\n;{]\s*)grid-template-columns\s*$/i,
                items: [
                    { label: ': repeat(auto-fit, minmax(220px, 1fr));', insert: ': repeat(auto-fit, minmax(220px, 1fr));', description: 'Responsive grid columns' },
                    { label: ': 1fr 1fr;', insert: ': 1fr 1fr;', description: 'Two equal columns' },
                    { label: ': repeat(3, 1fr);', insert: ': repeat(3, 1fr);', description: 'Three equal columns' }
                ]
            },
            {
                pattern: /(?:^|[\n;{]\s*)@media\s*$/i,
                items: [
                    { label: '(max-width: 768px) { … }', insert: ' (max-width: 768px) {\n    \n}', description: 'Tablet and mobile breakpoint', caret: 26 },
                    { label: '(prefers-reduced-motion: reduce) { … }', insert: ' (prefers-reduced-motion: reduce) {\n    \n}', description: 'Respect reduced-motion settings', caret: 39 }
                ]
            },
            { pattern: /(?:^|[\n;{]\s*)@supports\s*$/i, items: [
                { label: '(display: grid) { … }', insert: ' (display: grid) {\n    \n}', description: 'Feature-support query', caret: 22 },
                { label: '(backdrop-filter: blur(4px)) { … }', insert: ' (backdrop-filter: blur(4px)) {\n    \n}', description: 'Check support for a visual effect', caret: 36 }
            ]},
            { pattern: /(?:^|[\n;{]\s*)@container\s*$/i, items: [
                { label: '(min-width: 400px) { … }', insert: ' (min-width: 400px) {\n    \n}', description: 'Container width query', caret: 23 }
            ]},
            { pattern: /(?:^|[\n;{]\s*)font-size\s*$/i, items: [
                { label: ': 1rem;', insert: ': 1rem;' }, { label: ': 1.25rem;', insert: ': 1.25rem;' },
                { label: ': clamp(1rem, 2vw, 2rem);', insert: ': clamp(1rem, 2vw, 2rem);' },
                { label: ': var(--font-size);', insert: ': var(--font-size);' }
            ]},
            { pattern: /(?:^|[\n;{]\s*)(flex-direction|justify-content|align-items)\s*$/i, create: function (match) {
                const property = match[1].toLowerCase();
                const options = {
                    'flex-direction': ['row', 'column', 'row-reverse', 'column-reverse'],
                    'justify-content': ['center', 'space-between', 'space-around', 'space-evenly', 'flex-start', 'flex-end'],
                    'align-items': ['center', 'stretch', 'flex-start', 'flex-end', 'baseline']
                }[property] || [];
                return options.map(function (value) { return { label: ': ' + value + ';', insert: ': ' + value + ';' }; });
            }},
            { pattern: /(?:^|[\n;{]\s*)color\s*:\s*[^;\n]+;?$/i, items: [
                { label: 'Add background-color', insert: '\n    background-color: #f3f4f6;', description: 'Pair text color with a background' },
                { label: 'Add contrast-safe text color', insert: '\n    color: #111827;', description: 'Use a dark text color on a light surface' }
            ]},
            { pattern: /(?:^|[\n;{]\s*)display\s*:\s*grid\s*;?$/i, items: [
                { label: 'Add responsive grid columns', insert: '\n    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));', description: 'Create responsive columns' },
                { label: 'Add place-items: center', insert: '\n    place-items: center;', description: 'Align grid items on both axes' },
                { label: 'Add gap: 1rem', insert: '\n    gap: 1rem;', description: 'Add consistent spacing' }
            ]},
            { pattern: /(?:^|[\n;{]\s*)position\s*:\s*absolute\s*;?$/i, items: [
                { label: 'Add inset: 0', insert: '\n    inset: 0;', description: 'Stretch to the containing block' },
                { label: 'Add top/right/bottom/left: 0', insert: '\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;', description: 'Set all four offsets' },
                { label: 'Add z-index: 1', insert: '\n    z-index: 1;', description: 'Set stacking order' }
            ]}
        ],

        js: [
            { pattern: /\bnew$/i, items: [
                { label: ' Map()', insert: ' Map()', description: 'Create a Map collection' },
                { label: ' Set()', insert: ' Set()', description: 'Create a Set collection' },
                { label: ' Date()', insert: ' Date()', description: 'Create a date object' },
                { label: ' URL(\'url\')', insert: ' URL(\'url\')', description: 'Parse a URL', caret: 7 },
                { label: ' AbortController()', insert: ' AbortController()', description: 'Create a request cancellation controller' },
                { label: ' IntersectionObserver(callback)', insert: ' IntersectionObserver(callback)', description: 'Observe element visibility' }
            ]},
            { pattern: /\bawait$/i, items: [
                { label: ' fetch(\'url\')', insert: ' fetch(\'url\')', description: 'Wait for a network response', caret: 8 },
                { label: ' Promise.resolve(value)', insert: ' Promise.resolve(value)', description: 'Await a promise value' },
                { label: ' response.json()', insert: ' response.json()', description: 'Parse a JSON response body' }
            ]},
            { pattern: /\bthrow$/i, items: [
                { label: ' new Error(\'message\');', insert: ' new Error(\'message\');', description: 'Throw an error', caret: 15 },
                { label: ' new TypeError(\'message\');', insert: ' new TypeError(\'message\');', description: 'Throw a type error', caret: 19 }
            ]},
            { pattern: /\btry$/i, items: [
                { label: ' { … } catch (error) { … }', insert: ' {\n    \n} catch (error) {\n    console.error(error);\n}', description: 'Create a try/catch block', caret: 4 }
            ]},
            { pattern: /\bcatch$/i, items: [
                { label: ' (error) { … }', insert: ' (error) {\n    console.error(error);\n}', description: 'Handle a caught error', caret: 2 }
            ]},
            { pattern: /\bcatch\s*\(\s*$/i, items: [
                { label: 'error', insert: 'error' }, { label: 'err', insert: 'err' }
            ]},
            { pattern: /\basync$/i, items: [
                { label: ' function name() { … }', insert: ' function name() {\n    \n}', description: 'Declare an asynchronous function', caret: 16 },
                { label: ' () => { … }', insert: ' () => {\n    \n}', description: 'Create an async arrow function', caret: 3 }
            ]},
            { pattern: /\bclass$/i, items: [
                { label: ' Name { constructor() { … } }', insert: ' Name {\n    constructor() {\n        \n    }\n}', description: 'Create a class declaration', caret: 7 }
            ]},
            { pattern: /\bfor$/i, items: [
                { label: ' (let i = 0; i < length; i++) { … }', insert: ' (let i = 0; i < length; i++) {\n    \n}', description: 'Create a counted loop', caret: 2 },
                { label: ' (const item of items) { … }', insert: ' (const item of items) {\n    \n}', description: 'Iterate over an iterable', caret: 2 }
            ]},
            { pattern: /\bfor\s*\(\s*$/i, items: [
                { label: 'let i = 0; i < items.length; i++', insert: 'let i = 0; i < items.length; i++' },
                { label: 'const item of items', insert: 'const item of items' },
                { label: 'const [key, value] of Object.entries(object)', insert: 'const [key, value] of Object.entries(object)' }
            ]},
            { pattern: /\bPromise$/i, items: [
                { label: '.resolve(value)', insert: '.resolve(value)' }, { label: '.all(items)', insert: '.all(items)' },
                { label: '.allSettled(items)', insert: '.allSettled(items)' }, { label: '.reject(error)', insert: '.reject(error)' }
            ]},
            { pattern: /\bJSON$/i, items: [
                { label: '.parse(text)', insert: '.parse(text)' }, { label: '.stringify(value, null, 2)', insert: '.stringify(value, null, 2)' }
            ]},
            { pattern: /\b(?:map|filter|forEach|find|some|every)$/i, items: [
                { label: '((item) => item)', insert: '((item) => item)', description: 'Pass a callback function', caret: 2 },
                { label: '((item) => item.property)', insert: '((item) => item.property)', description: 'Access an item property', caret: 2 }
            ]},
            {
                pattern: /\b(?:const|let|var)\s+[A-Za-z_$][\w$]*\s*=\s*$/i,
                items: [
                    { label: 'null', insert: 'null', description: 'Initialize with null' },
                    { label: '[]', insert: '[]', description: 'Initialize an array' },
                    { label: '{}', insert: '{}', description: 'Initialize an object' },
                    { label: 'false', insert: 'false', description: 'Initialize a boolean' },
                    { label: '0', insert: '0', description: 'Initialize a number' },
                    { label: 'document.querySelector()', insert: 'document.querySelector(\'\')', description: 'Initialize from a selected DOM element', caret: 24 },
                    { label: 'new Map()', insert: 'new Map()', description: 'Initialize a map' },
                    { label: 'new Set()', insert: 'new Set()', description: 'Initialize a set' },
                    { label: 'async () => { … }', insert: 'async () => {\n    \n}', description: 'Initialize with an async arrow function', caret: 15 }
                ]
            },
            {
                pattern: /\b(?:const|let|var)$/i,
                items: [
                    { label: 'name = …', insert: ' name = ', description: 'Create a variable assignment and continue to its value', caret: 8 },
                    { label: 'element = document.querySelector(…)', insert: ' element = document.querySelector(\'\')', description: 'Create a DOM element reference', caret: 37 },
                    { label: 'items = []', insert: ' items = []', description: 'Create an array variable', caret: 11 }
                ]
            },
            {
                pattern: /\bfunction$/i,
                items: [
                    { label: 'name() { … }', insert: ' name() {\n    \n}', description: 'Create a function declaration', caret: 5 },
                    { label: 'name(value) { return value; }', insert: ' name(value) {\n    return value;\n}', description: 'Create a function that returns a value', caret: 5 }
                ]
            },
            {
                pattern: /\bif$/i,
                items: [
                    { label: '(condition) { … }', insert: ' (condition) {\n    \n}', description: 'Create an if block', caret: 2 },
                    { label: '(!condition) return;', insert: ' (!condition) return;', description: 'Early-return guard', caret: 3 }
                ]
            },
            {
                pattern: /\bif\s*\(\s*$/i,
                items: [
                    { label: 'condition', insert: 'condition', description: 'Generic condition' },
                    { label: 'element', insert: 'element', description: 'Check a DOM element' },
                    { label: 'event.target', insert: 'event.target', description: 'Check the event target' },
                    { label: 'value !== null', insert: 'value !== null', description: 'Check for a non-null value' }
                ]
            },
            {
                pattern: /\bdocument$/i,
                items: [
                    { label: '.querySelector(\'\')', insert: '.querySelector(\'\')', description: 'Select the first matching element', caret: 16 },
                    { label: '.getElementById(\'id\')', insert: '.getElementById(\'id\')', description: 'Select by element ID', caret: 17 },
                    { label: '.createElement(\'div\')', insert: '.createElement(\'div\')', description: 'Create an HTML element', caret: 16 },
                    { label: '.querySelectorAll(\'\')', insert: '.querySelectorAll(\'\')', description: 'Select all matching elements', caret: 19 }
                ]
            },
            {
                pattern: /\bconsole$/i,
                items: [
                    { label: '.log(value);', insert: '.log(value);', description: 'Write a value to the console', caret: 5 },
                    { label: '.warn(message);', insert: '.warn(message);', description: 'Write a warning', caret: 6 },
                    { label: '.error(error);', insert: '.error(error);', description: 'Write an error', caret: 7 },
                    { label: '.table(data);', insert: '.table(data);', description: 'Display tabular data', caret: 7 }
                ]
            },
            {
                pattern: /\bwindow$/i,
                items: [
                    { label: '.addEventListener()', insert: '.addEventListener(\'\', () => {})', description: 'Listen for a window event', caret: 18 },
                    { label: '.matchMedia(\'(max-width: 768px)\')', insert: '.matchMedia(\'(max-width: 768px)\')', description: 'Check a responsive media query', caret: 20 },
                    { label: '.localStorage', insert: '.localStorage', description: 'Access browser-local storage' },
                    { label: '.location', insert: '.location', description: 'Access the current URL' }
                ]
            },
            {
                pattern: /\bfetch$/i,
                items: [
                    { label: '(\'url\').then(response => …)', insert: '(\'url\').then((response) => response.json())', description: 'Fetch a resource and parse JSON', caret: 2 },
                    { label: '(\'url\', { method: \'POST\' })', insert: '(\'url\', { method: \'POST\' })', description: 'Send a POST request', caret: 2 }
                ]
            },
            {
                pattern: /\baddEventListener$/i,
                items: [
                    { label: '(\'click\', (event) => { … });', insert: '(\'click\', (event) => {\n    \n});', description: 'Add a click handler', caret: 2 },
                    { label: '(\'input\', (event) => { … });', insert: '(\'input\', (event) => {\n    \n});', description: 'Add an input handler', caret: 2 },
                    { label: '(\'submit\', (event) => { … });', insert: '(\'submit\', (event) => {\n    event.preventDefault();\n    \n});', description: 'Add a form submit handler', caret: 2 }
                ]
            },
            {
                pattern: /\b(?:querySelector|getElementById|querySelectorAll|createElement)$/i,
                create: function (match) {
                    const method = match[0];
                    const isId = method === 'getElementById';
                    const isCreate = method === 'createElement';
                    const isAll = method === 'querySelectorAll';
                    const value = isId ? 'id' : (isCreate ? 'div' : '.selector');
                    const insert = '(\'' + value + '\')';
                    return [{
                        label: insert,
                        insert: insert,
                        description: isId ? 'Enter an element ID' : (isCreate ? 'Enter an element tag name' : (isAll ? 'Enter a CSS selector' : 'Enter a CSS selector')),
                        caret: 2
                    }];
                }
            },
            {
                pattern: /\breturn$/i,
                items: [
                    { label: 'value;', insert: ' value;', description: 'Return a value' },
                    { label: 'null;', insert: ' null;', description: 'Return null' },
                    { label: 'Promise.resolve(value);', insert: ' Promise.resolve(value);', description: 'Return a resolved promise' },
                    { label: 'Continue on next line', insert: ';\n', description: 'End the statement and continue on the next line' }
                ]
            },
            {
                pattern: /=>$/i,
                items: [
                    { label: ' { … }', insert: ' {\n    \n}', description: 'Use a block body', caret: 3 },
                    { label: ' value', insert: ' value', description: 'Return an expression' }
                ]
            }
        ]
    };


    // Additional JavaScript continuations curated against the ECMAScript and MDN references.
    // These remain lightweight text rules; they deliberately do not attempt full syntax parsing.
    const additionalJavaScriptRules = [
        { pattern: /\bswitch$/i, items: [
            { label: ' (expression) { … }', insert: ' (expression) {\n    case value:\n        break;\n    default:\n        break;\n}', description: 'Create a switch statement', caret: 2 }
        ]},
        { pattern: /\bswitch\s*\(\s*$/i, items: [
            { label: 'expression', insert: 'expression' }, { label: 'value', insert: 'value' },
            { label: 'event.key', insert: 'event.key' }, { label: 'status', insert: 'status' }
        ]},
        { pattern: /\bwhile$/i, items: [
            { label: ' (condition) { … }', insert: ' (condition) {\n    \n}', description: 'Create a while loop', caret: 2 }
        ]},
        { pattern: /\bwhile\s*\(\s*$/i, items: [
            { label: 'condition', insert: 'condition' }, { label: 'index < items.length', insert: 'index < items.length' },
            { label: 'element !== null', insert: 'element !== null' }
        ]},
        { pattern: /\bdo$/i, items: [
            { label: ' { … } while (condition);', insert: ' {\n    \n} while (condition);', description: 'Create a do-while loop', caret: 3 }
        ]},
        { pattern: /\belse$/i, items: [
            { label: ' { … }', insert: ' {\n    \n}', description: 'Create an else block', caret: 3 },
            { label: ' if (condition) { … }', insert: ' if (condition) {\n    \n}', description: 'Create an else-if branch', caret: 5 }
        ]},
        { pattern: /\bfinally$/i, items: [
            { label: ' { … }', insert: ' {\n    \n}', description: 'Run cleanup after try/catch', caret: 3 }
        ]},
        { pattern: /\bcase$/i, items: [
            { label: ' value:', insert: ' value:\n    break;', description: 'Add a switch case', caret: 1 },
            { label: ' "name":', insert: ' "name":\n    break;', description: 'Add a string switch case', caret: 2 }
        ]},
        { pattern: /\bdefault$/i, items: [
            { label: ':', insert: ':\n    break;', description: 'Add the default switch branch', caret: 1 }
        ]},
        { pattern: /\bimport$/i, items: [
            { label: ' { name } from "./module.js";', insert: ' { name } from "./module.js";', description: 'Import a named export', caret: 3 },
            { label: ' name from "./module.js";', insert: ' name from "./module.js";', description: 'Import a default export', caret: 1 },
            { label: ' "./module.js";', insert: ' "./module.js";', description: 'Load a module for its side effects', caret: 2 }
        ]},
        { pattern: /\bexport$/i, items: [
            { label: ' default value;', insert: ' default value;', description: 'Export a default value', caret: 8 },
            { label: ' { name };', insert: ' { name };', description: 'Export a named binding', caret: 3 },
            { label: ' function name() { … }', insert: ' function name() {\n    \n}', description: 'Export a function declaration', caret: 10 }
        ]},
        { pattern: /\bMath$/i, items: [
            { label: '.random()', insert: '.random()', description: 'Generate a random number' },
            { label: '.round(value)', insert: '.round(value)', description: 'Round to the nearest integer' },
            { label: '.max(a, b)', insert: '.max(a, b)', description: 'Find the maximum value' },
            { label: '.min(a, b)', insert: '.min(a, b)', description: 'Find the minimum value' },
            { label: '.floor(value)', insert: '.floor(value)', description: 'Round down' },
            { label: '.abs(value)', insert: '.abs(value)', description: 'Get an absolute value' }
        ]},
        { pattern: /\bArray$/i, items: [
            { label: '.isArray(value)', insert: '.isArray(value)', description: 'Check whether a value is an array' },
            { label: '.from(iterable)', insert: '.from(iterable)', description: 'Create an array from an iterable' },
            { label: '.of(value)', insert: '.of(value)', description: 'Create an array from arguments' }
        ]},
        { pattern: /\bObject$/i, items: [
            { label: '.keys(object)', insert: '.keys(object)', description: 'Get an object’s own enumerable keys' },
            { label: '.values(object)', insert: '.values(object)', description: 'Get an object’s own enumerable values' },
            { label: '.entries(object)', insert: '.entries(object)', description: 'Get key/value pairs' },
            { label: '.fromEntries(entries)', insert: '.fromEntries(entries)', description: 'Build an object from key/value pairs' }
        ]},
        { pattern: /\bDate$/i, items: [
            { label: '.now()', insert: '.now()', description: 'Get the current timestamp' },
            { label: '.parse(dateString)', insert: '.parse(dateString)', description: 'Parse a date string' },
            { label: '()', insert: '()', description: 'Create the current date object' }
        ]},
        { pattern: /\bRegExp$/i, items: [
            { label: '(pattern, flags)', insert: '(pattern, flags)', description: 'Create a regular expression' }
        ]},
        { pattern: /\bURL$/i, items: [
            { label: "('https://example.com')", insert: "('https://example.com')", description: 'Parse an absolute URL', caret: 2 },
            { label: '.createObjectURL(blob)', insert: '.createObjectURL(blob)', description: 'Create a temporary URL for a Blob' },
            { label: '.revokeObjectURL(url)', insert: '.revokeObjectURL(url)', description: 'Release a temporary object URL' }
        ]},
        { pattern: /\bURLSearchParams$/i, items: [
            { label: '()', insert: '()', description: 'Create an empty query-parameter list' },
            { label: '(location.search)', insert: '(location.search)', description: 'Parse the current query string', caret: 1 }
        ]},
        { pattern: /\blocalStorage$/i, items: [
            { label: '.getItem("key")', insert: '.getItem("key")', description: 'Read a saved string' },
            { label: '.setItem("key", value)', insert: '.setItem("key", value)', description: 'Save a string value' },
            { label: '.removeItem("key")', insert: '.removeItem("key")', description: 'Remove one saved item' },
            { label: '.clear()', insert: '.clear()', description: 'Remove all saved items for this origin' }
        ]},
        { pattern: /\bsessionStorage$/i, items: [
            { label: '.getItem("key")', insert: '.getItem("key")', description: 'Read a session value' },
            { label: '.setItem("key", value)', insert: '.setItem("key", value)', description: 'Save a session value' },
            { label: '.removeItem("key")', insert: '.removeItem("key")', description: 'Remove one session item' }
        ]},
        { pattern: /\bnavigator$/i, items: [
            { label: '.clipboard', insert: '.clipboard', description: 'Access clipboard operations (permission/security rules apply)' },
            { label: '.geolocation', insert: '.geolocation', description: 'Access geolocation (permission required)' },
            { label: '.mediaDevices', insert: '.mediaDevices', description: 'Access media device APIs (permission/security rules apply)' },
            { label: '.onLine', insert: '.onLine', description: 'Check the browser’s online status' },
            { label: '.language', insert: '.language', description: 'Read the preferred browser language' }
        ]},
        { pattern: /\blocation$/i, items: [
            { label: '.href', insert: '.href', description: 'Read or navigate to the current URL' },
            { label: '.pathname', insert: '.pathname', description: 'Read the URL path' },
            { label: '.search', insert: '.search', description: 'Read the query string' },
            { label: '.reload()', insert: '.reload()', description: 'Reload the current page' }
        ]},
        { pattern: /\bhistory$/i, items: [
            { label: '.back()', insert: '.back()', description: 'Navigate to the previous history entry' },
            { label: '.forward()', insert: '.forward()', description: 'Navigate to the next history entry' },
            { label: '.pushState(state, "", url)', insert: '.pushState(state, "", url)', description: 'Add a same-origin history entry' },
            { label: '.replaceState(state, "", url)', insert: '.replaceState(state, "", url)', description: 'Replace the current history entry' }
        ]},
        { pattern: /\bcrypto$/i, items: [
            { label: '.randomUUID()', insert: '.randomUUID()', description: 'Generate a cryptographically random UUID' },
            { label: '.getRandomValues(array)', insert: '.getRandomValues(array)', description: 'Fill a typed array with random values' },
            { label: '.subtle.digest("SHA-256", data)', insert: '.subtle.digest("SHA-256", data)', description: 'Calculate a cryptographic digest' }
        ]},
        { pattern: /\bperformance$/i, items: [
            { label: '.now()', insert: '.now()', description: 'Get a high-resolution timestamp' },
            { label: '.mark("name")', insert: '.mark("name")', description: 'Create a performance mark' },
            { label: '.measure("name", "start", "end")', insert: '.measure("name", "start", "end")', description: 'Measure between performance marks' }
        ]},
        { pattern: /\bsetTimeout$/i, items: [
            { label: '(() => { … }, delay)', insert: '(() => {\n    \n}, delay)', description: 'Schedule a one-time callback', caret: 13 }
        ]},
        { pattern: /\bsetInterval$/i, items: [
            { label: '(() => { … }, delay)', insert: '(() => {\n    \n}, delay)', description: 'Schedule a repeating callback', caret: 13 }
        ]},
        { pattern: /\brequestAnimationFrame$/i, items: [
            { label: '((timestamp) => { … })', insert: '((timestamp) => {\n    \n})', description: 'Schedule work before the next repaint', caret: 2 }
        ]}
    ];
    nextWordRules.js.push(...additionalJavaScriptRules);

    window.EDITOR_INTELLISENSE_DATA = Object.assign(window.EDITOR_INTELLISENSE_DATA || {}, { nextWordRules: nextWordRules });
})();