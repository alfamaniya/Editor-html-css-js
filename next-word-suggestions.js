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
            ['class', 'id', 'style', 'aria-label'].concat(priority, Array.isArray(specific) ? specific : [])
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
            { pattern: /<html\s*$/i, items: [
                { label: ' lang="en"', insert: ' lang="en"', description: 'Set the document language', caret: 7 },
                { label: ' lang="fa" dir="rtl"', insert: ' lang="fa" dir="rtl"', description: 'Set Persian language and direction', caret: 7 }
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
                    { label: ':  repeat(3, 1fr);', insert: ': repeat(3, 1fr);', description: 'Three equal columns' }
                ]
            },
            {
                pattern: /(?:^|[\n;{]\s*)@media\s*$/i,
                items: [
                    { label: ' (max-width: 768px) { … }', insert: ' (max-width: 768px) {\n    \n}', description: 'Tablet and mobile breakpoint', caret: 29 },
                    { label: ' (prefers-reduced-motion: reduce) { … }', insert: ' (prefers-reduced-motion: reduce) {\n    \n}', description: 'Respect reduced-motion settings', caret: 39 }
                ]
            }
        ],

        js: [
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
                    { label: ' name = ', insert: ' name = ', description: 'Create a variable assignment and continue to its value', caret: 8 },
                    { label: ' element = document.querySelector()', insert: ' element = document.querySelector(\'\')', description: 'Create a DOM element reference', caret: 37 },
                    { label: ' items = []', insert: ' items = []', description: 'Create an array variable', caret: 11 }
                ]
            },
            {
                pattern: /\bfunction$/i,
                items: [
                    { label: ' name() { … }', insert: ' name() {\n    \n}', description: 'Create a function declaration', caret: 5 },
                    { label: ' name(value) { return value; }', insert: ' name(value) {\n    return value;\n}', description: 'Create a function that returns a value', caret: 5 }
                ]
            },
            {
                pattern: /\bif$/i,
                items: [
                    { label: ' (condition) { … }', insert: ' (condition) {\n    \n}', description: 'Create an if block', caret: 2 },
                    { label: ' (!condition) return;', insert: ' (!condition) return;', description: 'Early-return guard', caret: 3 }
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
                    { label: ' value;', insert: ' value;', description: 'Return a value' },
                    { label: ' null;', insert: ' null;', description: 'Return null' },
                    { label: ' Promise.resolve(value);', insert: ' Promise.resolve(value);', description: 'Return a resolved promise' },
                    { label: ';\n', insert: ';\n', description: 'End the statement and continue on the next line' }
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

    window.EDITOR_INTELLISENSE_DATA = Object.assign(window.EDITOR_INTELLISENSE_DATA || {}, { nextWordRules: nextWordRules });
})();