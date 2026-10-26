// Expanded HTML, SVG, MathML, global attribute, and contextual attribute suggestions.
(function () {
    'use strict';
    const htmlTags = (
        'a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd label legend li link main map mark menu meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script search section select slot small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul var video wbr'
    ).split(/\s+/);
    const htmlAttributes = (
        'accesskey autocapitalize autocorrect autofocus class contenteditable dir draggable enterkeyhint exportparts hidden id inert inputmode is itemid itemprop itemref itemscope itemtype lang nonce part popover role slot spellcheck style tabindex title translate virtualkeyboardpolicy writingsuggestions aria-activedescendant aria-atomic aria-autocomplete aria-busy aria-checked aria-colcount aria-colindex aria-colspan aria-controls aria-current aria-describedby aria-description aria-details aria-disabled aria-errormessage aria-expanded aria-flowto aria-haspopup aria-hidden aria-invalid aria-keyshortcuts aria-label aria-labelledby aria-level aria-live aria-modal aria-multiline aria-multiselectable aria-orientation aria-owns aria-placeholder aria-posinset aria-pressed aria-readonly aria-relevant aria-required aria-roledescription aria-rowcount aria-rowindex aria-rowspan aria-selected aria-setsize aria-sort aria-valuemax aria-valuemin aria-valuenow aria-valuetext data-testid data-state data-id data-value'
    ).split(/\s+/);
    const htmlAttrsByTag = {
        a:'href target rel download hreflang type referrerpolicy',
        area:'alt coords download href hreflang media rel shape target',
        audio:'autoplay controls controlslist crossorigin loop muted preload src',
        button:'autofocus disabled form formaction formenctype formmethod formnovalidate formtarget name type value',
        form:'accept-charset action autocomplete enctype method name novalidate rel target',
        img:'alt crossorigin decoding fetchpriority height ismap loading referrerpolicy sizes src srcset usemap width',
        input:'accept alt autocomplete autofocus capture checked dirname disabled form formaction formenctype formmethod formnovalidate formtarget height list max maxlength min minlength multiple name pattern placeholder readonly required size src step type value width',
        link:'as crossorigin disabled fetchpriority href hreflang imagesizes imagesrcset integrity media referrerpolicy rel sizes type',
        script:'async crossorigin defer fetchpriority integrity nomodule referrerpolicy src type',
        source:'media sizes src srcset type',
        video:'autoplay controls controlslist crossorigin height loop muted playsinline poster preload src width',
        iframe:'allow allowfullscreen height loading name referrerpolicy sandbox src srcdoc width',
        textarea:'autocomplete autofocus cols dirname disabled form maxlength minlength name placeholder readonly required rows wrap',
        select:'autocomplete autofocus disabled form multiple name required size',
        option:'disabled label selected value',
        ol:'reversed start type',
        li:'value',
        td:'colspan headers rowspan',
        th:'colspan headers rowspan scope abbr',
        meta:'charset content http-equiv name',
        time:'datetime',
        data:'value',
        meter:'value min max low high optimum',
        progress:'value max',
        div:'align accesskey autocapitalize contenteditable dir draggable hidden inputmode is lang role slot spellcheck style tabindex title translate',
        label:'for form',
        fieldset:'disabled form name',
        output:'for form name',
        details:'open name',
        dialog:'open',
        canvas:'height width',
        col:'span',
        colgroup:'span',
        map:'name',
        object:'data form height name type usemap width',
        embed:'height src type width',
        track:'default kind label src srclang',
        table:''
    };
    // Current global attributes cross-checked against MDN's HTML reference.
    const modernGlobalAttributes = 'accesskey autocapitalize autocorrect autofocus class contenteditable dir draggable enterkeyhint exportparts hidden id inert inputmode is itemid itemprop itemref itemscope itemtype lang nonce part popover slot spellcheck style tabindex title translate virtualkeyboardpolicy writingsuggestions'.split(/\s+/);
    htmlAttributes.splice(0, htmlAttributes.length, ...Array.from(new Set(htmlAttributes.concat(modernGlobalAttributes))).filter(function (attr) { return !/^(align|bgcolor|cellpadding|cellspacing|frame|rules|summary)$/.test(attr); }));
    Object.keys(htmlAttrsByTag).forEach(function (tag) {
        // Keep tag-specific attributes as arrays; the completion engine combines arrays.
        htmlAttrsByTag[tag] = Array.from(new Set(htmlAttrsByTag[tag].split(/\s+/).filter(Boolean).filter(function (attr) {
            return !/^(align|bgcolor|border|cellpadding|cellspacing|frame|rules|summary)$/.test(attr);
        })));
    });

    // Embedded SVG and MathML content models are valid inside HTML documents.
    const svgTags = (
        'svg g defs desc title symbol use path circle ellipse rect line polyline polygon text tspan textPath marker pattern linearGradient radialGradient stop clipPath mask filter feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject'
    ).split(/\s+/);
    const mathMlTags = (
        'math maction maligngroup malignmark menclose merror mfenced mfrac mglyph mi mlabeledtr mlongdiv mmultiscripts mn mo mover mpadded mphantom mprescripts mroot mrow ms mspace msqrt mstyle msub msubsup msup mtable mtd mtext mtr munder munderover semantics annotation annotation-xml'
    ).split(/\s+/);
    htmlTags.push(...svgTags, ...mathMlTags);

    // Modern global and event-handler attributes commonly used in browser code.
    const extendedGlobalAttributes = (
        'autocorrect writingsuggestions virtualkeyboardpolicy popover part exportparts slot onabort onanimationcancel onanimationend onanimationiteration onanimationstart onauxclick onbeforeinput onbeforematch onbeforetoggle onblur oncancel oncanplay oncanplaythrough onchange onclick onclose oncontextmenu oncopy oncuechange oncut ondblclick ondrag ondragend ondragenter ondragleave ondragover ondragstart ondrop ondurationchange onemptied onended onerror onfocus onformdata ongotpointercapture onhashchange oninput oninvalid onkeydown onkeypress onkeyup onload onloadeddata onloadedmetadata onloadstart onmessage onmousedown onmouseenter onmouseleave onmousemove onmouseout onmouseover onmouseup onoffline ononline onpagehide onpageshow onpaste onpause onplay onplaying onpointercancel onpointerdown onpointerenter onpointerleave onpointermove onpointerout onpointerover onpointerup onpopstate onprogress onratechange onreset onresize onscroll onscrollend onsecuritypolicyviolation onseeked onseeking onselect onselectionchange onselectstart onslotchange onstalled onsubmit onsuspend ontimeupdate ontoggle ontouchcancel ontouchend ontouchmove ontouchstart ontransitioncancel ontransitionend ontransitionrun ontransitionstart onunhandledrejection onunload onvolumechange onwaiting onwheel'
    ).split(/\s+/);
    htmlAttributes.splice(0, htmlAttributes.length, ...Array.from(new Set(htmlAttributes.concat(extendedGlobalAttributes))).filter(function (attr) {
        return !/^(align|bgcolor|cellpadding|cellspacing|frame|rules|summary)$/.test(attr);
    }));

    const additionalAttrsByTag = {
        a: 'attributionsrc ping',
        audio: 'autoplay controls controlslist crossorigin loop muted preload src',
        button: 'command commandfor popovertarget popovertargetaction',
        base: 'href target',
        blockquote: 'cite',
        del: 'cite datetime',
        ins: 'cite datetime',
        optgroup: 'disabled label',
        param: 'name value',
        q: 'cite',
        dialog: 'closedby',
        form: 'rel',
        iframe: 'allowpaymentrequest credentialless csp',
        img: 'fetchpriority ismap usemap',
        input: 'alpha dirname enterkeyhint formaction formenctype formmethod formnovalidate formtarget popovertarget popovertargetaction',
        link: 'blocking imagesizes imagesrcset',
        meta: 'media',
        script: 'blocking fetchpriority',
        select: 'autocomplete',
        source: 'width height',
        video: 'disablepictureinpicture disableremoteplayback playsinline',
        svg: 'viewBox preserveAspectRatio xmlns fill stroke stroke-width aria-label role',
        path: 'd fill stroke stroke-width stroke-linecap stroke-linejoin transform',
        circle: 'cx cy r fill stroke stroke-width',
        ellipse: 'cx cy rx ry fill stroke stroke-width',
        rect: 'x y width height rx ry fill stroke stroke-width',
        line: 'x1 x2 y1 y2 stroke stroke-width',
        polygon: 'points fill stroke stroke-width',
        polyline: 'points fill stroke stroke-width',
        text: 'x y dx dy text-anchor dominant-baseline fill stroke',
        tspan: 'x y dx dy text-anchor dominant-baseline',
        use: 'href x y width height',
        linearGradient: 'x1 x2 y1 y2 gradientUnits gradientTransform spreadMethod',
        radialGradient: 'cx cy r fx fy fr gradientUnits gradientTransform spreadMethod',
        stop: 'offset stop-color stop-opacity',
        clipPath: 'clipPathUnits transform',
        foreignObject: 'x y width height',
        math: 'display mathvariant xmlns',
        mi: 'mathvariant mathsize',
        mo: 'form fence stretchy symmetric maxsize minsize largeop movablelimits separator',
        mfrac: 'linethickness bevelled',
        mtable: 'columnalign rowalign columnspacing rowspacing frame',
        mtd: 'columnspan rowspan columnalign rowalign',
        annotation: 'encoding src'
    };
    Object.keys(additionalAttrsByTag).forEach(function (tag) {
        const key = tag.toLowerCase();
        const current = Array.isArray(htmlAttrsByTag[key])
            ? htmlAttrsByTag[key]
            : (Array.isArray(htmlAttrsByTag[tag]) ? htmlAttrsByTag[tag] : []);
        htmlAttrsByTag[key] = Array.from(new Set(current.concat(additionalAttrsByTag[tag].split(/\s+/))));
        if (key !== tag) delete htmlAttrsByTag[tag];
    });


    // A practical subset of Emmet-style HTML abbreviations; aliases expand to real markup.
    const htmlDocumentTemplate = '<!doctype html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title></title>\n</head>\n<body>\n    \n</body>\n</html>';
    const htmlAbbreviations = [
        { trigger: '!', label: '! -> HTML5 document', insert: htmlDocumentTemplate, description: 'Expand an HTML5 document skeleton', caret: htmlDocumentTemplate.indexOf('</body>') - 1 },
        { trigger: 'doc', label: 'doc -> HTML5 document', insert: htmlDocumentTemplate, description: 'Expand an HTML5 document skeleton', caret: htmlDocumentTemplate.indexOf('</body>') - 1 },
        { trigger: 'html:5', label: 'html:5 -> HTML5 document', insert: htmlDocumentTemplate, description: 'Expand an HTML5 document skeleton', caret: htmlDocumentTemplate.indexOf('</body>') - 1 },
        { trigger: 'meta:vp', label: 'meta:vp -> viewport meta', insert: '<meta name="viewport" content="width=device-width, initial-scale=1.0">', description: 'Insert a responsive viewport meta tag' },
        { trigger: 'meta:utf', label: 'meta:utf -> UTF-8 meta', insert: '<meta charset="UTF-8">', description: 'Declare UTF-8 character encoding' },
        { trigger: 'link:css', label: 'link:css -> stylesheet link', insert: '<link rel="stylesheet" href="style.css">', description: 'Link a CSS stylesheet' },
        { trigger: 'script:src', label: 'script:src -> deferred script', insert: '<script src="script.js" defer></script>', description: 'Link a deferred external script' },
        { trigger: 'bq', label: 'bq -> blockquote', insert: '<blockquote></blockquote>', description: 'Insert a block quotation', caret: 12 },
        { trigger: 'btn', label: 'btn -> button', insert: '<button type="button"></button>', description: 'Insert a semantic button', caret: 22 },
        { trigger: 'inp', label: 'inp -> text input', insert: '<input type="text" name="" id="">', description: 'Insert a text input', caret: 25 },
        { trigger: 'a:link', label: 'a:link -> anchor', insert: '<a href=""></a>', description: 'Insert a link with an href', caret: 9 },
        { trigger: 'img', label: 'img -> accessible image', insert: '<img src="" alt="">', description: 'Insert an image with source and alt text', caret: 10 },
        { trigger: 'ul+', label: 'ul+ -> unordered list', insert: '<ul>\n    <li></li>\n</ul>', description: 'Insert a list with one item', caret: 13 },
        { trigger: 'ol+', label: 'ol+ -> ordered list', insert: '<ol>\n    <li></li>\n</ol>', description: 'Insert an ordered list with one item', caret: 13 },
        { trigger: 'dl+', label: 'dl+ -> description list', insert: '<dl>\n    <dt></dt>\n    <dd></dd>\n</dl>', description: 'Insert a description list', caret: 13 },
        { trigger: 'table+', label: 'table+ -> basic table', insert: '<table>\n    <thead>\n        <tr><th scope="col"></th></tr>\n    </thead>\n    <tbody>\n        <tr><td></td></tr>\n    </tbody>\n</table>', description: 'Insert a table with header and body', caret: 48 },
        { trigger: 'form:get', label: 'form:get -> GET form', insert: '<form action="" method="get">\n    <label for="field"></label>\n    <input id="field" name="field" type="text">\n    <button type="submit">Submit</button>\n</form>', description: 'Insert a GET form with a label and submit button', caret: 53 },
        { trigger: 'form:post', label: 'form:post -> POST form', insert: '<form action="" method="post">\n    <label for="field"></label>\n    <input id="field" name="field" type="text">\n    <button type="submit">Submit</button>\n</form>', description: 'Insert a POST form with a label and submit button', caret: 54 },
        { trigger: '.container', label: '.container -> div class', insert: '<div class="container"></div>', description: 'Create a div with a container class', caret: 23 },
        { trigger: '#app', label: '#app -> app root', insert: '<div id="app"></div>', description: 'Create an application root element', caret: 14 },
        { trigger: 'div.card', label: 'div.card -> card container', insert: '<div class="card"></div>', description: 'Create a card container', caret: 18 },
        { trigger: 'ul>li*3', label: 'ul>li*3 -> three list items', insert: '<ul>\n    <li></li>\n    <li></li>\n    <li></li>\n</ul>', description: 'Create an unordered list with three items', caret: 13 },
        { trigger: 'video:controls', label: 'video:controls -> video element', insert: '<video controls src=""></video>', description: 'Insert a video control element', caret: 23 },
        { trigger: 'audio:controls', label: 'audio:controls -> audio element', insert: '<audio controls src=""></audio>', description: 'Insert an audio control element', caret: 23 }
    ];

    window.EDITOR_INTELLISENSE_DATA = Object.assign(window.EDITOR_INTELLISENSE_DATA || {}, {
        symbols: Object.assign((window.EDITOR_INTELLISENSE_DATA || {}).symbols || {}, {
            html: [
                {
                    "label": "<!doctype>",
                    "prefix": "<!DOCTYPE html>\n",
                    "suffix": "",
                    "description": "Insert the HTML5 doctype declaration"
                },
                {
                    "label": "<div>",
                    "prefix": "<div>",
                    "suffix": "</div>",
                    "description": "Insert a generic container"
                },
                {
                    "label": "<p>",
                    "prefix": "<p>",
                    "suffix": "</p>",
                    "description": "Insert a paragraph"
                },
                {
                    "label": "<h1>",
                    "prefix": "<h1>",
                    "suffix": "</h1>",
                    "description": "Insert a level-one heading"
                },
                {
                    "label": "<a href=\"\">",
                    "prefix": "<a href=\"",
                    "suffix": "\">link</a>",
                    "description": "Insert a hyperlink; caret starts inside href"
                },
                {
                    "label": "<img>",
                    "prefix": "<img src=\"",
                    "suffix": "\" alt=\"\">",
                    "description": "Insert an image with src and alt attributes"
                },
                {
                    "label": "<button>",
                    "prefix": "<button type=\"button\">",
                    "suffix": "</button>",
                    "description": "Insert a button"
                },
                {
                    "label": "<input>",
                    "prefix": "<input type=\"text\" name=\"",
                    "suffix": "\">",
                    "description": "Insert a text input; caret starts inside name"
                },
                {
                    "label": "<label>",
                    "prefix": "<label for=\"",
                    "suffix": "\">Label</label>",
                    "description": "Insert a label associated with a form control"
                },
                {
                    "label": "<form>",
                    "prefix": "<form action=\"\" method=\"post\">\n    ",
                    "suffix": "\n</form>",
                    "description": "Insert a form block"
                },
                {
                    "label": "<ul><li>",
                    "prefix": "<ul>\n    <li>",
                    "suffix": "</li>\n</ul>",
                    "description": "Insert an unordered list with one item"
                },
                {
                    "label": "<ol><li>",
                    "prefix": "<ol>\n    <li>",
                    "suffix": "</li>\n</ol>",
                    "description": "Insert an ordered list with one item"
                },
                {
                    "label": "<section>",
                    "prefix": "<section>",
                    "suffix": "</section>",
                    "description": "Insert a semantic section"
                },
                {
                    "label": "<main>",
                    "prefix": "<main>",
                    "suffix": "</main>",
                    "description": "Insert the main content landmark"
                },
                {
                    "label": "<header>",
                    "prefix": "<header>",
                    "suffix": "</header>",
                    "description": "Insert a section or page header"
                },
                {
                    "label": "<footer>",
                    "prefix": "<footer>",
                    "suffix": "</footer>",
                    "description": "Insert a section or page footer"
                },
                {
                    "label": "<table>",
                    "prefix": "<table>\n    <thead>\n        <tr><th scope=\"col\">Heading</th></tr>\n    </thead>\n    <tbody>\n        <tr><td>Value</td></tr>\n    </tbody>\n</table>",
                    "suffix": "",
                    "description": "Insert an accessible table skeleton"
                },
                {
                    "label": "<textarea>",
                    "prefix": "<textarea name=\"",
                    "suffix": "\" rows=\"4\"></textarea>",
                    "description": "Insert a multi-line text field"
                },
                {
                    "label": "<script>",
                    "prefix": "<script>\n    ",
                    "suffix": "\n</script>",
                    "description": "Insert an inline script block"
                },
                {
                    "label": "<!-- -->",
                    "prefix": "<!-- ",
                    "suffix": " -->",
                    "description": "Insert an HTML comment"
                }
            ]
        }),

        htmlAbbreviations,
        htmlTags: Array.from(new Set(htmlTags)),
        htmlAttributes,
        htmlAttrsByTag
    });
})();
