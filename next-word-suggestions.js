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

            // Standard HTML/ARIA enumerated attributes and common form/media hints.
            { pattern: /<[^<>]*\b(?:aria-checked|aria-pressed)\s*=\s*["']$/i, items: [
                { label: 'true', insert: 'true' }, { label: 'false', insert: 'false' },
                { label: 'mixed', insert: 'mixed' }
            ]},
            { pattern: /<[^<>]*\b(?:aria-selected|aria-disabled|aria-required|aria-busy)\s*=\s*["']$/i, items: [
                { label: 'true', insert: 'true' }, { label: 'false', insert: 'false' }
            ]},
            { pattern: /<[^<>]*\baria-invalid\s*=\s*["']$/i, items: [
                { label: 'false', insert: 'false' }, { label: 'true', insert: 'true' },
                { label: 'grammar', insert: 'grammar' }, { label: 'spelling', insert: 'spelling' }
            ]},
            { pattern: /<[^<>]*\baria-current\s*=\s*["']$/i, items: [
                { label: 'page', insert: 'page' }, { label: 'step', insert: 'step' },
                { label: 'location', insert: 'location' }, { label: 'date', insert: 'date' },
                { label: 'time', insert: 'time' }, { label: 'true', insert: 'true' },
                { label: 'false', insert: 'false' }
            ]},
            { pattern: /<[^<>]*\baria-sort\s*=\s*["']$/i, items: [
                { label: 'ascending', insert: 'ascending' }, { label: 'descending', insert: 'descending' },
                { label: 'none', insert: 'none' }, { label: 'other', insert: 'other' }
            ]},
            { pattern: /<[^<>]*\b(?:autocomplete)\s*=\s*["']$/i, items: [
                { label: 'on', insert: 'on' }, { label: 'off', insert: 'off' },
                { label: 'name', insert: 'name' }, { label: 'given-name', insert: 'given-name' },
                { label: 'family-name', insert: 'family-name' }, { label: 'email', insert: 'email' },
                { label: 'username', insert: 'username' }, { label: 'current-password', insert: 'current-password' },
                { label: 'new-password', insert: 'new-password' }, { label: 'one-time-code', insert: 'one-time-code' },
                { label: 'street-address', insert: 'street-address' }, { label: 'postal-code', insert: 'postal-code' },
                { label: 'tel', insert: 'tel' }, { label: 'url', insert: 'url' }
            ]},
            { pattern: /<[^<>]*\b(?:enctype|formenctype)\s*=\s*["']$/i, items: [
                { label: 'application/x-www-form-urlencoded', insert: 'application/x-www-form-urlencoded' },
                { label: 'multipart/form-data', insert: 'multipart/form-data' },
                { label: 'text/plain', insert: 'text/plain' }
            ]},
            { pattern: /<[^<>]*\bcrossorigin\s*=\s*["']$/i, items: [
                { label: 'anonymous', insert: 'anonymous' }, { label: 'use-credentials', insert: 'use-credentials' }
            ]},
            { pattern: /<[^<>]*\breferrerpolicy\s*=\s*["']$/i, items: [
                { label: 'no-referrer', insert: 'no-referrer' },
                { label: 'no-referrer-when-downgrade', insert: 'no-referrer-when-downgrade' },
                { label: 'origin', insert: 'origin' },
                { label: 'origin-when-cross-origin', insert: 'origin-when-cross-origin' },
                { label: 'same-origin', insert: 'same-origin' },
                { label: 'strict-origin', insert: 'strict-origin' },
                { label: 'strict-origin-when-cross-origin', insert: 'strict-origin-when-cross-origin' },
                { label: 'unsafe-url', insert: 'unsafe-url' }
            ]},
            { pattern: /<[^<>]*\b(?:fetchpriority)\s*=\s*["']$/i, items: [
                { label: 'high', insert: 'high' }, { label: 'low', insert: 'low' }, { label: 'auto', insert: 'auto' }
            ]},
            { pattern: /<[^<>]*\bdecoding\s*=\s*["']$/i, items: [
                { label: 'async', insert: 'async' }, { label: 'sync', insert: 'sync' }, { label: 'auto', insert: 'auto' }
            ]},
            { pattern: /<[^<>]*\bpreload\s*=\s*["']$/i, items: [
                { label: 'none', insert: 'none' }, { label: 'metadata', insert: 'metadata' }, { label: 'auto', insert: 'auto' }
            ]},
            { pattern: /<[^<>]*\b(?:draggable|spellcheck)\s*=\s*["']$/i, items: [
                { label: 'true', insert: 'true' }, { label: 'false', insert: 'false' }
            ]},
            { pattern: /<[^<>]*\bcontenteditable\s*=\s*["']$/i, items: [
                { label: 'true', insert: 'true' }, { label: 'false', insert: 'false' },
                { label: 'plaintext-only', insert: 'plaintext-only' }
            ]},
            { pattern: /<[^<>]*\bscope\s*=\s*["']$/i, items: [
                { label: 'row', insert: 'row' }, { label: 'col', insert: 'col' },
                { label: 'rowgroup', insert: 'rowgroup' }, { label: 'colgroup', insert: 'colgroup' }
            ]},
            { pattern: /<[^<>]*\baccept\s*=\s*["']$/i, items: [
                { label: 'image/*', insert: 'image/*' }, { label: 'audio/*', insert: 'audio/*' },
                { label: 'video/*', insert: 'video/*' }, { label: '.pdf', insert: '.pdf' },
                { label: '.png,.jpg,.jpeg', insert: '.png,.jpg,.jpeg' },
                { label: '.txt,.csv', insert: '.txt,.csv' }
            ]},
            { pattern: /<[^<>]*\binputmode\s*=\s*["']$/i, items: [
                { label: 'none', insert: 'none' }, { label: 'text', insert: 'text' },
                { label: 'decimal', insert: 'decimal' }, { label: 'numeric', insert: 'numeric' },
                { label: 'tel', insert: 'tel' }, { label: 'search', insert: 'search' },
                { label: 'email', insert: 'email' }, { label: 'url', insert: 'url' }
            ]},
            { pattern: /<[^<>]*\benterkeyhint\s*=\s*["']$/i, items: [
                { label: 'enter', insert: 'enter' }, { label: 'done', insert: 'done' },
                { label: 'go', insert: 'go' }, { label: 'next', insert: 'next' },
                { label: 'previous', insert: 'previous' }, { label: 'search', insert: 'search' },
                { label: 'send', insert: 'send' }
            ]},
            { pattern: /<[^<>]*\bcapture\s*=\s*["']$/i, items: [
                { label: 'user', insert: 'user' }, { label: 'environment', insert: 'environment' }
            ]},
            { pattern: /<[^<>]*\bkind\s*=\s*["']$/i, items: [
                { label: 'subtitles', insert: 'subtitles' }, { label: 'captions', insert: 'captions' },
                { label: 'descriptions', insert: 'descriptions' }, { label: 'chapters', insert: 'chapters' },
                { label: 'metadata', insert: 'metadata' }
            ]},
            { pattern: /<[^<>]*\bshape\s*=\s*["']$/i, items: [
                { label: 'rect', insert: 'rect' }, { label: 'circle', insert: 'circle' },
                { label: 'poly', insert: 'poly' }, { label: 'default', insert: 'default' }
            ]},
            { pattern: /<[^<>]*\b(?:aria-haspopup)\s*=\s*["']$/i, items: [
                { label: 'false', insert: 'false' }, { label: 'true', insert: 'true' },
                { label: 'menu', insert: 'menu' }, { label: 'listbox', insert: 'listbox' },
                { label: 'tree', insert: 'tree' }, { label: 'grid', insert: 'grid' },
                { label: 'dialog', insert: 'dialog' }
            ]},
            { pattern: /<[^<>]*\b(?:aria-autocomplete)\s*=\s*["']$/i, items: [
                { label: 'none', insert: 'none' }, { label: 'inline', insert: 'inline' },
                { label: 'list', insert: 'list' }, { label: 'both', insert: 'both' }
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
                    { label: 'Add gap: 1rem', insert: '\n    gap: 1rem;', description: 'Add consistent spacing between children' },
                    { label: 'Add flex-wrap: wrap', insert: '\n    flex-wrap: wrap;', description: 'Allow flex items to wrap' },
                    { label: 'Add flex-direction: column', insert: '\n    flex-direction: column;', description: 'Stack flex items vertically' },
                    { label: 'Add justify-content: space-between', insert: '\n    justify-content: space-between;', description: 'Distribute items across the main axis' }
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

            // Broader CSS property-value vocabulary curated against MDN's CSS reference.
            {
                pattern: /(?:^|[\n;{]\s*)(overflow|overflow-x|overflow-y|flex-wrap|text-align|font-weight|font-style|text-transform|text-decoration-line|border-style|border-top-style|border-right-style|border-bottom-style|border-left-style|border-collapse|box-sizing|object-fit|background-repeat|background-size|background-position|cursor|visibility|white-space|word-break|overflow-wrap|pointer-events|user-select|list-style-type|outline-style|resize|table-layout|appearance|scroll-behavior|text-overflow|object-position|flex-flow|grid-auto-flow|grid-auto-columns|grid-auto-rows|grid-template-rows|align-content|align-self|justify-items|justify-self|place-items|place-content|place-self|font-family|line-height|letter-spacing|word-spacing|vertical-align|opacity|z-index|order|flex-grow|flex-shrink|aspect-ratio|color-scheme|isolation|contain|container-type|background-image|border|outline|box-shadow|text-shadow|transform|transition|animation|gap|row-gap|column-gap|margin-inline|margin-block|padding-inline|padding-block)\s*$/i,
                create: function (match) {
                    const property = match[1].toLowerCase();
                    const values = {
                        overflow: ['visible', 'hidden', 'clip', 'scroll', 'auto'],
                        'overflow-x': ['visible', 'hidden', 'clip', 'scroll', 'auto'],
                        'overflow-y': ['visible', 'hidden', 'clip', 'scroll', 'auto'],
                        'flex-wrap': ['nowrap', 'wrap', 'wrap-reverse'],
                        'text-align': ['start', 'end', 'left', 'right', 'center', 'justify', 'match-parent'],
                        'font-weight': ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
                        'font-style': ['normal', 'italic', 'oblique'],
                        'text-transform': ['none', 'capitalize', 'uppercase', 'lowercase', 'full-width'],
                        'text-decoration-line': ['none', 'underline', 'overline', 'line-through'],
                        'border-style': ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'],
                        'border-top-style': ['none', 'dotted', 'dashed', 'solid', 'double'],
                        'border-right-style': ['none', 'dotted', 'dashed', 'solid', 'double'],
                        'border-bottom-style': ['none', 'dotted', 'dashed', 'solid', 'double'],
                        'border-left-style': ['none', 'dotted', 'dashed', 'solid', 'double'],
                        'border-collapse': ['collapse', 'separate'],
                        'box-sizing': ['content-box', 'border-box'],
                        'object-fit': ['fill', 'contain', 'cover', 'none', 'scale-down'],
                        'background-repeat': ['repeat', 'repeat-x', 'repeat-y', 'no-repeat', 'space', 'round'],
                        'background-size': ['auto', 'cover', 'contain'],
                        'background-position': ['center', 'top', 'right', 'bottom', 'left', 'left top', 'center center'],
                        cursor: ['auto', 'default', 'none', 'context-menu', 'help', 'pointer', 'progress', 'wait', 'cell', 'crosshair', 'text', 'vertical-text', 'alias', 'copy', 'move', 'no-drop', 'not-allowed', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize', 'zoom-in', 'zoom-out'],
                        visibility: ['visible', 'hidden', 'collapse'],
                        'white-space': ['normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line', 'break-spaces'],
                        'word-break': ['normal', 'break-all', 'keep-all', 'auto-phrase'],
                        'overflow-wrap': ['normal', 'break-word', 'anywhere'],
                        'pointer-events': ['auto', 'none'],
                        'user-select': ['auto', 'text', 'none', 'contain', 'all'],
                        'list-style-type': ['none', 'disc', 'circle', 'square', 'decimal', 'decimal-leading-zero', 'lower-roman', 'upper-roman', 'lower-alpha', 'upper-alpha'],
                        'outline-style': ['none', 'auto', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'],
                        resize: ['none', 'both', 'horizontal', 'vertical', 'block', 'inline'],
                        'table-layout': ['auto', 'fixed'],
                        appearance: ['none', 'auto'],
                        'scroll-behavior': ['auto', 'smooth'],
                        'text-overflow': ['clip', 'ellipsis'],
                        'object-position': ['center', 'top', 'right', 'bottom', 'left', '50% 50%'],
                        'flex-flow': ['row wrap', 'row nowrap', 'column wrap', 'column nowrap'],
                        'grid-auto-flow': ['row', 'column', 'dense', 'row dense', 'column dense'],
                        'grid-auto-columns': ['auto', 'minmax(0, 1fr)', 'min-content', 'max-content'],
                        'grid-auto-rows': ['auto', 'minmax(0, 1fr)', 'min-content', 'max-content'],
                        'grid-template-rows': ['auto', '1fr', 'auto 1fr auto', 'repeat(3, 1fr)', 'minmax(0, 1fr)'],
                        'align-content': ['normal', 'center', 'start', 'end', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly', 'stretch', 'baseline'],
                        'align-self': ['auto', 'normal', 'center', 'start', 'end', 'flex-start', 'flex-end', 'stretch', 'baseline'],
                        'justify-items': ['normal', 'start', 'end', 'center', 'stretch', 'baseline'],
                        'justify-self': ['auto', 'normal', 'start', 'end', 'center', 'stretch', 'baseline'],
                        'place-items': ['center', 'start', 'end', 'stretch', 'baseline'],
                        'place-content': ['center', 'start', 'end', 'space-between', 'space-around', 'space-evenly', 'stretch'],
                        'place-self': ['auto', 'center', 'start', 'end', 'stretch'],
                        'font-family': ['system-ui, sans-serif', 'Arial, sans-serif', 'Georgia, serif', 'monospace', 'sans-serif', 'serif', 'cursive', 'fantasy'],
                        'line-height': ['normal', '1', '1.5', '1.6', '1.75'],
                        'letter-spacing': ['normal', '0.02em', '0.05em', '0.1em'],
                        'word-spacing': ['normal', '0.05em', '0.1em'],
                        'vertical-align': ['baseline', 'middle', 'top', 'bottom', 'text-top', 'text-bottom', 'sub', 'super'],
                        opacity: ['0', '0.5', '0.75', '1'],
                        'z-index': ['auto', '0', '1', '10', '100'],
                        order: ['0', '1', '-1'],
                        'flex-grow': ['0', '1'],
                        'flex-shrink': ['0', '1'],
                        'aspect-ratio': ['auto', '1 / 1', '16 / 9', '4 / 3', '3 / 2'],
                        'color-scheme': ['normal', 'light', 'dark', 'light dark', 'only light', 'only dark'],
                        isolation: ['auto', 'isolate'],
                        contain: ['none', 'strict', 'content', 'size', 'layout', 'style', 'paint'],
                        'container-type': ['normal', 'size', 'inline-size'],
                        'background-image': ['none', 'linear-gradient(135deg, #f5f7fa, #c3cfe2)', 'url("image.jpg")'],
                        border: ['1px solid currentColor', '1px solid #e5e7eb', 'none', '2px dashed currentColor'],
                        outline: ['none', '2px solid currentColor', '2px solid #2563eb'],
                        'box-shadow': ['none', '0 2px 8px rgb(0 0 0 / 12%)', '0 8px 24px rgb(0 0 0 / 16%)', 'inset 0 1px 2px rgb(0 0 0 / 10%)'],
                        'text-shadow': ['none', '0 1px 2px rgb(0 0 0 / 20%)'],
                        transform: ['none', 'translateY(-2px)', 'scale(1.05)', 'rotate(5deg)', 'translateX(10px)'],
                        transition: ['all 0.2s ease', 'opacity 0.2s ease', 'transform 0.2s ease', 'color 0.2s ease, background-color 0.2s ease'],
                        animation: ['none', 'fade-in 0.3s ease both', 'slide-in 0.4s ease-out both'],
                        gap: ['0', '0.5rem', '1rem', '1.5rem', '2rem'],
                        'row-gap': ['0', '0.5rem', '1rem', '1.5rem'],
                        'column-gap': ['0', '0.5rem', '1rem', '1.5rem'],
                        'margin-inline': ['auto', '0', '1rem', '0 auto'],
                        'margin-block': ['0', '1rem', '2rem'],
                        'padding-inline': ['0', '1rem', '1.5rem', '2rem'],
                        'padding-block': ['0', '1rem', '1.5rem', '2rem']
                    }[property] || [];
                    return values.map(function (value) {
                        return { label: ': ' + value + ';', insert: ': ' + value + ';', description: 'Common ' + property + ' value' };
                    });
                }
            },
            { pattern: /(?:^|[\n;{]\s*)@import\s*$/i, items: [
                { label: ' url("./styles.css");', insert: ' url("./styles.css");', description: 'Import another stylesheet', caret: 6 },
                { label: ' url("https://example.com/styles.css") layer(external);', insert: ' url("https://example.com/styles.css") layer(external);', description: 'Import a stylesheet into a cascade layer', caret: 6 }
            ]},
            { pattern: /(?:^|[\n;{]\s*)@keyframes\s*$/i, items: [
                { label: ' fade-in { from { opacity: 0; } to { opacity: 1; } }', insert: ' fade-in {\n    from { opacity: 0; }\n    to { opacity: 1; }\n}', description: 'Define a fade-in animation', caret: 8 },
                { label: ' slide-in { from { transform: translateY(8px); } to { transform: translateY(0); } }', insert: ' slide-in {\n    from { transform: translateY(8px); }\n    to { transform: translateY(0); }\n}', description: 'Define a slide-in animation', caret: 8 }
            ]},
            { pattern: /(?:^|[\n;{]\s*)@font-face\s*$/i, items: [
                { label: ' { font-family: "CustomFont"; src: url("font.woff2") format("woff2"); font-display: swap; }', insert: ' {\n    font-family: "CustomFont";\n    src: url("font.woff2") format("woff2");\n    font-display: swap;\n}', description: 'Declare a downloadable font face', caret: 3 }
            ]},
            { pattern: /(?:^|[\n;{]\s*)@layer\s*$/i, items: [
                { label: ' reset, base, components, utilities;', insert: ' reset, base, components, utilities;', description: 'Establish cascade-layer order', caret: 7 },
                { label: ' components { … }', insert: ' components {\n    \n}', description: 'Create a named cascade layer', caret: 12 }
            ]},
            { pattern: /(?:^|[\n;{]\s*)@scope\s*$/i, items: [
                { label: ' (.component) { … }', insert: ' (.component) {\n    \n}', description: 'Scope styles to a component subtree', caret: 3 },
                { label: ' (.component) to (.component__limit) { … }', insert: ' (.component) to (.component__limit) {\n    \n}', description: 'Define a bounded style scope', caret: 3 }
            ]},
            { pattern: /(?:^|[\n;{]\s*)@starting-style\s*$/i, items: [
                { label: ' { opacity: 0; transform: translateY(8px); }', insert: ' {\n    opacity: 0;\n    transform: translateY(8px);\n}', description: 'Provide an entry style for a newly displayed element', caret: 3 }
            ]},
            { pattern: /(?:^|[\n;{]\s*)@page\s*$/i, items: [
                { label: ' { margin: 1cm; }', insert: ' {\n    margin: 1cm;\n}', description: 'Set print-page margins', caret: 3 },
                { label: ' :first { margin-top: 0; }', insert: ' :first {\n    margin-top: 0;\n}', description: 'Style the first printed page', caret: 3 }
            ]},
            { pattern: /(?:^|[\n;{]\s*)@media\s*\(\s*prefers-color-scheme\s*:\s*$/i, items: [
                { label: 'dark) { … }', insert: 'dark) {\n    \n}', description: 'Use dark-mode preferences', caret: 4 },
                { label: 'light) { … }', insert: 'light) {\n    \n}', description: 'Use light-mode preferences', caret: 5 }
            ]},
            { pattern: /(?:^|[\n;{]\s*)@media\s*\(\s*prefers-reduced-motion\s*:\s*$/i, items: [
                { label: 'reduce) { … }', insert: 'reduce) {\n    \n}', description: 'Respect reduced-motion preferences', caret: 6 },
                { label: 'no-preference) { … }', insert: 'no-preference) {\n    \n}', description: 'Provide motion when allowed', caret: 14 }
            ]},
            { pattern: /(?:^|[\n;{]\s*)flex-direction\s*:\s*(?:row|row-reverse|column|column-reverse)\s*;?$/i, items: [
                { label: 'Add flex-wrap: wrap', insert: '\n    flex-wrap: wrap;', description: 'Allow flex items to wrap' },
                { label: 'Add gap: 1rem', insert: '\n    gap: 1rem;', description: 'Space out flex items' },
                { label: 'Add align-items: center', insert: '\n    align-items: center;', description: 'Align items on the cross axis' }
            ]},
            { pattern: /(?:^|[\n;{]\s*)grid-template-columns\s*:\s*[^;\n]+;?$/i, items: [
                { label: 'Add grid-template-rows: auto 1fr auto', insert: '\n    grid-template-rows: auto 1fr auto;', description: 'Define responsive row tracks' },
                { label: 'Add grid-auto-flow: row', insert: '\n    grid-auto-flow: row;', description: 'Place grid items row by row' },
                { label: 'Add place-items: center', insert: '\n    place-items: center;', description: 'Align grid items on both axes' }
            ]},
            { pattern: /(?:^|[\n;{]\s*)position\s*:\s*sticky\s*;?$/i, items: [
                { label: 'Add top: 0', insert: '\n    top: 0;', description: 'Set the sticky threshold at the top' },
                { label: 'Add z-index: 10', insert: '\n    z-index: 10;', description: 'Keep the sticky element above nearby content' }
            ]},
            { pattern: /(?:^|[\n;{]\s*)font-size\s*:\s*[^;\n]+;?$/i, items: [
                { label: 'Add line-height: 1.5', insert: '\n    line-height: 1.5;', description: 'Set a readable line height' },
                { label: 'Add font-weight: 600', insert: '\n    font-weight: 600;', description: 'Increase text emphasis' }
            ]},
            { pattern: /(?:^|[\n;{]\s*)border-radius\s*:\s*[^;\n]+;?$/i, items: [
                { label: 'Add overflow: hidden', insert: '\n    overflow: hidden;', description: 'Clip child content to rounded corners' },
                { label: 'Add border: 1px solid #e5e7eb', insert: '\n    border: 1px solid #e5e7eb;', description: 'Add a subtle outline' }
            ]},
            { pattern: /(?:^|[\n;{]\s*)transition\s*:\s*[^;\n]+;?$/i, items: [
                { label: 'Add @media (prefers-reduced-motion: reduce)', insert: '\n@media (prefers-reduced-motion: reduce) {\n    .animated-element { transition: none; animation: none; }\n}', description: 'Respect reduced-motion user settings' }
            ]},
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