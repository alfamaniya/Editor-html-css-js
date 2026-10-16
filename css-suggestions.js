// Expanded CSS properties, values, selectors, functions, units, and snippets.
(function () {
    'use strict';
    const cssProperties = (
        'accent-color align-content align-items align-self all animation animation-composition animation-delay animation-direction animation-duration animation-fill-mode animation-iteration-count animation-name animation-play-state animation-range animation-timeline animation-timing-function appearance aspect-ratio backdrop-filter backface-visibility background background-attachment background-blend-mode background-clip background-color background-image background-origin background-position background-position-x background-position-y background-repeat background-size block-size border border-block border-block-color border-block-end border-block-start border-bottom border-bottom-color border-bottom-left-radius border-bottom-right-radius border-bottom-style border-bottom-width border-collapse border-color border-image border-inline border-left border-left-color border-left-style border-left-width border-radius border-right border-right-color border-right-style border-right-width border-spacing border-style border-top border-top-color border-top-left-radius border-top-right-radius border-top-style border-top-width border-width bottom box-decoration-break box-shadow box-sizing break-after break-before break-inside caption-side caret-color clear clip clip-path color color-scheme column-count column-fill column-gap column-rule column-span column-width columns contain contain-intrinsic-size container container-name container-type content content-visibility cursor direction display empty-cells filter flex flex-basis flex-direction flex-flow flex-grow flex-shrink flex-wrap float font font-family font-feature-settings font-kerning font-optical-sizing font-size font-size-adjust font-stretch font-style font-variant font-variant-caps font-weight gap grid grid-area grid-auto-columns grid-auto-flow grid-auto-rows grid-column grid-column-end grid-column-start grid-row grid-row-end grid-row-start grid-template grid-template-areas grid-template-columns grid-template-rows hanging-punctuation height hyphens image-rendering inline-size inset inset-block inset-inline isolation justify-content justify-items justify-self left letter-spacing line-break line-height list-style list-style-image list-style-position list-style-type margin margin-block margin-bottom margin-inline margin-left margin-right margin-top mask max-block-size max-height max-inline-size max-width min-block-size min-height min-inline-size min-width mix-blend-mode object-fit object-position offset-path opacity order orphans outline outline-color outline-offset outline-style outline-width overflow overflow-anchor overflow-wrap overflow-x overflow-y overscroll-behavior padding padding-block padding-bottom padding-inline padding-left padding-right padding-top page-break-after page-break-before page-break-inside paint-order perspective perspective-origin place-content place-items place-self pointer-events position print-color-adjust quotes resize right rotate row-gap scale scroll-behavior scroll-margin scroll-padding scroll-snap-align scroll-snap-type scrollbar-color scrollbar-width shape-outside tab-size table-layout text-align text-align-last text-decoration text-decoration-color text-decoration-line text-decoration-style text-decoration-thickness text-indent text-justify text-overflow text-rendering text-shadow text-transform text-underline-offset text-underline-position top touch-action transform transform-origin transform-style transition transition-behavior transition-delay transition-duration transition-property transition-timing-function translate unicode-bidi user-select vertical-align visibility white-space widows width will-change word-break word-spacing overflow-wrap writing-mode z-index zoom'
    ).split(/\s+/);
    // Additional modern, logical, typography, scroll, SVG and form-related CSS properties.
    cssProperties.push(...(
        'anchor-name anchor-scope animation-composition animation-range animation-range-end animation-range-start animation-timeline appearance aspect-ratio block-overflow block-size border-block-color border-block-end-color border-block-end-style border-block-end-width border-block-start-color border-block-start-style border-block-start-width border-inline-color border-inline-end border-inline-end-color border-inline-end-style border-inline-end-width border-inline-start border-inline-start-color border-inline-start-style border-inline-start-width border-start-start-radius border-start-end-radius border-end-start-radius border-end-end-radius border-image-outset border-image-repeat border-image-slice border-image-source border-image-width border-inline-style border-inline-width border-block-style border-block-width box-decoration-break box-shadow break-after break-before break-inside caption-side caret-shape clip-rule color-interpolation color-interpolation-filters color-rendering column-rule-color column-rule-style column-rule-width column-span contain-intrinsic-block-size contain-intrinsic-height contain-intrinsic-inline-size contain-intrinsic-width container container-name container-type content-visibility counter-increment counter-reset counter-set cursor cx cy d direction dominant-baseline fill fill-opacity fill-rule flood-color flood-opacity font-kerning font-optical-sizing font-palette font-size-adjust font-smooth font-synthesis font-synthesis-small-caps font-synthesis-style font-synthesis-weight font-variant-alternates font-variant-emoji font-variant-ligatures font-variant-numeric font-variation-settings font-weight font-width forced-color-adjust gap grid-column-end grid-column-start grid-row-end grid-row-start grid-template-areas hanging-punctuation hyphenate-character hyphenate-limit-chars hyphens image-orientation image-rendering inline-size inset-block inset-block-end inset-block-start inset-inline inset-inline-end inset-inline-start isolation justify-tracks lighting-color line-break line-clamp line-height-step line-height letter-spacing letter-spacing locale marker marker-end marker-mid marker-start mask-border mask-border-mode mask-border-outset mask-border-repeat mask-border-slice mask-border-source mask-border-width mask-clip mask-composite mask-image mask-mode mask-origin mask-position mask-repeat mask-size mask-type math-depth math-shift math-style max-block-size max-inline-size min-block-size min-inline-size object-position offset-anchor offset-distance offset-path offset-position offset-rotate opacity order orphans outline-offset overscroll-behavior overscroll-behavior-block overscroll-behavior-inline overscroll-behavior-x overscroll-behavior-y overflow-block overflow-inline overflow-clip-margin overflow-wrap overflow-anchor overflow-block overflow-inline page page-break-after page-break-before page-break-inside paint-order perspective perspective-origin place-content place-items place-self position-anchor position-area position-try position-try-fallbacks position-try-order print-color-adjust quotes r ruby-align ruby-position rx ry scale scroll-behavior scroll-margin scroll-margin-block scroll-margin-block-end scroll-margin-block-start scroll-margin-bottom scroll-margin-inline scroll-margin-inline-end scroll-margin-inline-start scroll-margin-left scroll-margin-right scroll-margin-top scroll-padding scroll-padding-block scroll-padding-block-end scroll-padding-block-start scroll-padding-bottom scroll-padding-inline scroll-padding-inline-end scroll-padding-inline-start scroll-padding-left scroll-padding-right scroll-padding-top scroll-snap-align scroll-snap-stop scroll-snap-type scrollbar-color scrollbar-gutter scrollbar-width shape-image-threshold shape-margin shape-outside shape-rendering stop-color stop-opacity stroke stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width tab-size text-anchor text-combine-upright text-decoration-skip-ink text-emphasis text-emphasis-color text-emphasis-position text-emphasis-style text-orientation text-rendering text-size-adjust text-spacing text-underline-offset text-underline-position timeline-scope touch-action transform-box transform-origin transform-style transition-behavior translate unicode-bidi user-select vector-effect vertical-align view-transition-name visibility white-space widows width will-change word-break word-spacing writing-mode x y z-index zoom'
    ).split(/\s+/));
    const cssValues = {
        display:'block inline inline-block flex inline-flex grid inline-grid none contents flow-root table table-cell table-row list-item',
        'background-color':'transparent currentColor red green blue black white gray grey silver maroon olive lime aqua teal navy fuchsia purple orange pink brown gold coral tomato crimson indigo violet rebeccapurple lightblue skyblue steelblue dodgerblue royalblue cornflowerblue darkblue lightgreen limegreen seagreen forestgreen darkgreen yellow khaki beige ivory snow whitesmoke gainsboro slategray lightslategray darkslategray aliceblue antiquewhite lavender plum orchid salmon hotpink deeppink firebrick chocolate sienna peru tan wheat inherit initial unset revert',
        color:'currentColor transparent black white red green blue yellow orange purple pink brown gray grey silver maroon olive lime aqua teal navy fuchsia rebeccapurple coral tomato crimson indigo violet gold lightblue skyblue steelblue dodgerblue royalblue cornflowerblue darkblue lightgreen limegreen seagreen forestgreen darkgreen khaki beige ivory snow whitesmoke gainsboro slategray darkslategray aliceblue lavender plum orchid salmon hotpink deeppink firebrick chocolate sienna peru tan wheat',
        'background-image':'none linear-gradient() radial-gradient() conic-gradient() repeating-linear-gradient() repeating-radial-gradient() url()',
        'background-blend-mode':'normal multiply screen overlay darken lighten color-dodge color-burn hard-light soft-light difference exclusion hue saturation color luminosity',
        'background-position-x':'left center right',
        'background-position-y':'top center bottom',
        'border-color':'currentColor transparent red green blue black white gray grey silver maroon olive lime aqua teal navy fuchsia purple orange pink brown gold coral tomato crimson inherit initial unset',
        'border-top-color':'currentColor transparent red green blue black white gray grey silver maroon olive lime aqua teal navy fuchsia purple orange pink brown gold coral tomato crimson inherit initial unset',
        'border-right-color':'currentColor transparent red green blue black white gray grey silver maroon olive lime aqua teal navy fuchsia purple orange pink brown gold coral tomato crimson inherit initial unset',
        'border-bottom-color':'currentColor transparent red green blue black white gray grey silver maroon olive lime aqua teal navy fuchsia purple orange pink brown gold coral tomato crimson inherit initial unset',
        'border-left-color':'currentColor transparent red green blue black white gray grey silver maroon olive lime aqua teal navy fuchsia purple orange pink brown gold coral tomato crimson inherit initial unset',
        'border-top-style':'none hidden dotted dashed solid double groove ridge inset outset',
        'border-right-style':'none hidden dotted dashed solid double groove ridge inset outset',
        'border-bottom-style':'none hidden dotted dashed solid double groove ridge inset outset',
        'border-left-style':'none hidden dotted dashed solid double groove ridge inset outset',
        'font-variant':'normal small-caps',
        'text-decoration-color':'currentColor transparent red green blue black white gray grey silver',
        'text-align-last':'auto start end left right center justify',
        float:'none left right inline-start inline-end',
        clear:'none left right both inline-start inline-end',
        direction:'ltr rtl',
        'transition-behavior':'normal allow-discrete',
        resize:'none both horizontal vertical block inline',
        'outline-style':'none auto dotted dashed solid double groove ridge inset outset',
        'list-style-position':'inside outside',
        'list-style-image':'none url()',
        'animation-composition':'replace add accumulate',
        position:'static relative absolute fixed sticky',
        'flex-direction':'row row-reverse column column-reverse',
        'flex-wrap':'nowrap wrap wrap-reverse',
        'align-items':'normal stretch center start end flex-start flex-end baseline',
        'justify-content':'normal start end center flex-start flex-end space-between space-around space-evenly',
        'text-align':'start end left right center justify match-parent',
        'font-weight':'normal bold bolder lighter 100 200 300 400 500 600 700 800 900',
        'font-style':'normal italic oblique',
        'overflow':'visible hidden clip scroll auto',
        'overflow-x':'visible hidden clip scroll auto',
        'overflow-y':'visible hidden clip scroll auto',
        'visibility':'visible hidden collapse',
        'white-space':'normal nowrap pre pre-wrap pre-line break-spaces',
        'object-fit':'fill contain cover none scale-down',
        'cursor':'auto default none context-menu help pointer progress wait cell crosshair text vertical-text alias copy move no-drop not-allowed grab grabbing zoom-in zoom-out',
        'background-repeat':'repeat repeat-x repeat-y no-repeat space round',
        'background-size':'auto cover contain',
        'background-position':'center top bottom left right',
        'border-style':'none hidden dotted dashed solid double groove ridge inset outset',
        'border-collapse':'collapse separate',
        'box-sizing':'content-box border-box',
        'text-decoration':'none underline overline line-through',
        'text-transform':'none capitalize uppercase lowercase full-width',
        'animation-timing-function':'ease linear ease-in ease-out ease-in-out step-start step-end',
        'transition-timing-function':'ease linear ease-in ease-out ease-in-out',
        'list-style-type':'none disc circle square decimal decimal-leading-zero lower-roman upper-roman lower-alpha upper-alpha',
        'pointer-events':'auto none',
        'user-select':'auto text none contain all',
        'scroll-behavior':'auto smooth',
        'aspect-ratio':'auto 1 / 1 16 / 9 4 / 3 3 / 2',
        'color-scheme':'normal light dark',
        'align-content':'normal center start end flex-start flex-end space-between space-around space-evenly stretch',
        'align-self':'auto normal stretch center start end flex-start flex-end baseline',
        'justify-items':'normal stretch center start end self-start self-end legacy left right',
        'grid-auto-flow':'row column dense row dense column dense',
        'grid-template-columns':'none subgrid masonry repeat minmax fit-content',
        'grid-template-rows':'none subgrid masonry repeat minmax fit-content',
        'background-attachment':'scroll fixed local',
        'background-clip':'border-box padding-box content-box text',
        'background-origin':'border-box padding-box content-box',
        'animation-direction':'normal reverse alternate alternate-reverse',
        'animation-fill-mode':'none forwards backwards both',
        'animation-play-state':'running paused',
        'transition-property':'none all opacity transform color background border box-shadow',
        'text-decoration-line':'none underline overline line-through',
        'text-decoration-style':'solid double dotted dashed wavy',
        'text-overflow':'clip ellipsis',
        'word-break':'normal break-all keep-all break-word',
        'overflow-wrap':'normal break-word anywhere',
        'vertical-align':'baseline sub super text-top text-bottom middle top bottom',
        'border-width':'thin medium thick 0 1px 2px 3px',
        'border-radius':'0 2px 4px 6px 8px 10px 50%',
        'box-shadow':'none inset 0 2px 4px rgba(0, 0, 0, 0.1)',
        'font-family':'Arial Helvetica sans-serif serif monospace system-ui Tahoma Verdana Georgia',
        'opacity':'0 0.1 0.25 0.5 0.75 0.9 1',
        'z-index':'auto 0 1 10 100 999 9999',
        'transform':'none translateX(0) translateY(0) scale(1) rotate(0deg)',
        'filter':'none blur(0) brightness(1) contrast(1) grayscale(0) sepia(0)',
        'place-items':'normal stretch center start end',
        'place-content':'normal center start end space-between space-around space-evenly stretch',
        'flex':'none auto initial 0 1 auto 1 1 0',
        'grid-auto-columns':'auto min-content max-content 1fr minmax(0, 1fr)',
        'grid-auto-rows':'auto min-content max-content 1fr minmax(0, 1fr)',
        'text-rendering':'auto optimizeSpeed optimizeLegibility geometricPrecision',
        'image-rendering':'auto smooth high-quality crisp-edges pixelated'
    };
    const snippets = {
        css: [
            {label:'flex-center', insert:'display: flex;\njustify-content: center;\nalign-items: center;', description:'Center content with flexbox', caret:0},
            {label:'grid-center', insert:'display: grid;\nplace-items: center;', description:'Center content with grid', caret:0},
            {label:'transition', insert:'transition: all 0.3s ease;', description:'Common transition', caret:0},
            {label:'box-shadow', insert:'0 4px 12px rgba(0, 0, 0, 0.15)', description:'Soft shadow value', caret:0}
        ]
    };
    const extendedCssProperties = (
        'all animation-composition animation-range-end animation-range-start animation-timeline anchor-name anchor-scope block-overflow border-block-end-color border-block-end-style border-block-end-width border-block-start-color border-block-start-style border-block-start-width border-inline-end-color border-inline-end-style border-inline-end-width border-inline-start-color border-inline-start-style border-inline-start-width caret-animation caret-shape corner-shape field-sizing font-language-override font-smooth interpolate-size line-clamp line-height-step math-depth math-shift math-style overlay position-anchor position-area position-try position-try-fallbacks position-try-order reading-flow reading-order scroll-initial-target scroll-marker-group scroll-target-group text-box text-box-edge text-box-trim text-wrap text-wrap-mode text-wrap-style view-transition-class view-transition-name white-space-collapse word-space-transform -webkit-appearance -webkit-line-clamp -webkit-text-fill-color -webkit-text-stroke -webkit-text-stroke-color -webkit-text-stroke-width -webkit-font-smoothing --primary-color --secondary-color --surface-color --text-color --muted-color --border-color --accent-color --spacing --radius --shadow --font-size --content-width'
    ).split(/\s+/);
    cssProperties.push(...extendedCssProperties);
    cssProperties.splice(0, cssProperties.length, ...Array.from(new Set(cssProperties)));

    const cssAtRules = (
        '@charset @container @counter-style @font-face @font-feature-values @font-palette-values @import @keyframes @layer @media @namespace @page @property @scope @starting-style @supports @view-transition'
    ).split(/\s+/);
    const cssPseudoClasses = (
        'active any-link autofill blank checked current default defined dir() disabled empty enabled first first-child first-of-type focus focus-visible focus-within fullscreen future has() host host-context() hover in-range indeterminate invalid is() lang() last-child last-of-type left link local-link modal not() nth-child() nth-col() nth-last-child() nth-last-col() nth-last-of-type() nth-of-type() only-child only-of-type optional out-of-range past paused picture-in-picture placeholder-shown playing read-only read-write required right root scope seeking stalled state() target target-within user-invalid user-valid valid visited where()'
    ).split(/\s+/);
    const cssPseudoElements = (
        'after backdrop before cue cue-region file-selector-button first-letter first-line grammar-error highlight() marker part() placeholder selection slotted() spelling-error target-text view-transition view-transition-group view-transition-image-pair view-transition-new view-transition-old'
    ).split(/\s+/);
    const cssFunctions = (
        'abs() acos() anchor() anchor-size() asin() atan() atan2() attr() blur() brightness() calc() calc-size() clamp() color() color-mix() contrast() cos() counter() counters() cubic-bezier() drop-shadow() env() exp() fit-content() grayscale() hsl() hsla() hypot() if() inset() invert() lab() lch() light-dark() linear() linear-gradient() log() matrix() matrix3d() max() min() minmax() mod() opacity() oklab() oklch() perspective() polygon() pow() radial-gradient() rem() repeat() repeating-linear-gradient() repeating-radial-gradient() rotate() rotate3d() round() saturate() scale() scale3d() sepia() sign() sin() skew() sqrt() steps() tan() translate() translate3d() url() var()'
    ).split(/\s+/);
    const cssUnits = (
        'px em rem ex ch cap ic lh rlh vw vh vi vb vmin vmax svw svh lvw lvh dvw dvh cqw cqh cqi cqb cqmin cqmax % deg grad rad turn s ms Hz kHz dpi dpcm dppx fr'
    ).split(/\s+/);

    const extraCssValues = {
        display: 'block inline inline-block flex inline-flex grid inline-grid flow-root contents none',
        position: 'static relative absolute fixed sticky',
        'container-type': 'normal size inline-size scroll-state',
        'text-wrap': 'wrap nowrap balance pretty stable',
        'text-wrap-mode': 'wrap nowrap',
        'text-wrap-style': 'auto balance stable pretty',
        'font-size': 'xx-small x-small small medium large x-large xx-large xxx-large smaller larger clamp() calc() var()',
        width: 'auto min-content max-content fit-content() stretch 100% 100vw 100dvw calc() clamp() var()',
        height: 'auto min-content max-content fit-content() stretch 100% 100vh 100dvh calc() clamp() var()',
        'min-width': 'auto min-content max-content fit-content() 0 100% 100vw',
        'max-width': 'none min-content max-content fit-content() 100% 100vw',
        'min-height': 'auto min-content max-content fit-content() 0 100%',
        'max-height': 'none min-content max-content fit-content() 100%',
        margin: '0 auto auto 1rem 1em calc() clamp() var()',
        padding: '0 0.5rem 1rem 1em 1px calc() clamp() var()',
        gap: 'normal 0 0.25rem 0.5rem 1rem 1em 10px calc() clamp() var()',
        'grid-template-columns': 'none subgrid repeat() minmax() fit-content() 1fr 2fr 100px auto min-content max-content',
        'grid-template-rows': 'none subgrid repeat() minmax() fit-content() 1fr auto min-content max-content',
        'grid-auto-flow': 'row column dense row dense column dense',
        'grid-column': 'auto span 1 / -1',
        'grid-row': 'auto span 1 / -1',
        'border-radius': '0 2px 4px 8px 0.5rem 1rem 50% 999px',
        'box-shadow': 'none 0 1px 2px rgb() 0 4px 12px rgba() inset',
        'text-shadow': 'none 0 1px 2px rgba()',
        color: 'currentColor transparent black white red blue rebeccapurple rgb() rgba() hsl() hsla() oklch() color-mix() light-dark() var()',
        'background-color': 'transparent currentColor rgb() rgba() hsl() hsla() oklch() color-mix() light-dark() var()',
        'background-image': 'none url() linear-gradient() radial-gradient() conic-gradient() repeating-linear-gradient() image-set() cross-fade()',
        transform: 'none translateX() translateY() translate() scale() rotate() skew() matrix() perspective()',
        filter: 'none blur() brightness() contrast() grayscale() hue-rotate() invert() opacity() saturate() sepia() drop-shadow()',
        'backdrop-filter': 'none blur() brightness() contrast() grayscale() hue-rotate() invert() opacity() saturate() sepia()',
        transition: 'none all opacity transform color background-color box-shadow 150ms ease 300ms ease-in-out',
        animation: 'none name 1s ease 0s 1 normal both running',
        'animation-timing-function': 'ease ease-in ease-out ease-in-out linear step-start step-end steps() cubic-bezier() linear()',
        'transition-timing-function': 'ease ease-in ease-out ease-in-out linear step-start step-end steps() cubic-bezier() linear()',
        'font-family': 'system-ui sans-serif serif monospace cursive fantasy ui-sans-serif ui-serif ui-monospace Arial Helvetica Inter Roboto Georgia',
        'font-weight': '100 200 300 400 500 600 700 800 900 normal bold bolder lighter',
        'line-height': 'normal 1 1.25 1.5 1.75 2',
        'object-fit': 'fill contain cover none scale-down',
        'aspect-ratio': 'auto 1 / 1 4 / 3 3 / 2 16 / 9',
        'scroll-behavior': 'auto smooth',
        'scroll-snap-align': 'none start end center',
        'scroll-snap-stop': 'normal always',
        'scroll-snap-type': 'none x y block inline both mandatory proximity',
        'content-visibility': 'visible auto hidden',
        'contain': 'none strict content size inline-size layout style paint',
        'container-type': 'normal size inline-size',
        'color-scheme': 'normal light dark light dark only',
        'accent-color': 'auto currentColor transparent',
        'pointer-events': 'auto none visiblePainted visibleFill visibleStroke painted fill stroke all',
        'overflow': 'visible hidden clip scroll auto',
        'white-space': 'normal pre nowrap pre-wrap pre-line break-spaces',
        'white-space-collapse': 'collapse preserve preserve-breaks preserve-spaces break-spaces',
        'text-overflow': 'clip ellipsis',
        'text-decoration-thickness': 'auto from-font 1px 0.1em',
        'text-underline-offset': 'auto 1px 0.1em',
        'view-transition-name': 'none root match-element',
        'anchor-name': 'none --anchor',
        'position-anchor': 'auto --anchor',
        'position-area': 'none center top bottom left right span-all',
        'field-sizing': 'fixed content',
        'scrollbar-gutter': 'auto stable stable both-edges',
        'writing-mode': 'horizontal-tb vertical-rl vertical-lr',
        'direction': 'ltr rtl',
        'user-select': 'auto text none contain all',
        'touch-action': 'auto none pan-x pan-y manipulation pinch-zoom',
        'font-synthesis': 'weight style small-caps none',
        'font-variant-numeric': 'normal lining-nums oldstyle-nums proportional-nums tabular-nums diagonal-fractions stacked-fractions ordinal slashed-zero',
        'text-emphasis-style': 'none filled open dot circle double-circle triangle sesame',
        'text-align': 'start end left right center justify match-parent',
        'transform-origin': 'center top bottom left right 50% 50%',
        'mask-image': 'none url() linear-gradient() radial-gradient()',
        'clip-path': 'none circle() ellipse() inset() polygon() path() url()',
        'shape-outside': 'none circle() ellipse() inset() polygon() url()',
        'color-interpolation': 'auto sRGB linearRGB',
        'stroke-linecap': 'butt round square',
        'stroke-linejoin': 'arcs bevel miter miter-clip round',
        'fill-rule': 'nonzero evenodd',
        'stroke-width': '0 1 2 1px 2px',
        'animation-range': 'normal cover contain entry exit entry-crossing exit-crossing',
        'timeline-scope': 'none --timeline'
    };
    Object.keys(extraCssValues).forEach(function (key) {
        cssValues[key] = (cssValues[key] || '') + ' ' + extraCssValues[key];
    });

    // Curated browser-supported at-rules, selector pseudo-classes/elements, and value functions.
    const extraCssSnippets = [
        { label: '@media', insert: '@media (max-width: 768px) {\n    \n}', description: 'Responsive media query', caret: 29 },
        { label: '@supports', insert: '@supports (display: grid) {\n    \n}', description: 'Feature query', caret: 31 },
        { label: '@container', insert: '@container (min-width: 400px) {\n    \n}', description: 'Container query', caret: 32 },
        { label: 'flex-center', insert: 'display: flex;\njustify-content: center;\nalign-items: center;', description: 'Center content with flexbox', caret: 0 },
        { label: 'grid-center', insert: 'display: grid;\nplace-items: center;', description: 'Center content with grid', caret: 0 },
        { label: 'responsive-grid', insert: 'display: grid;\ngrid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\ngap: 1rem;', description: 'Responsive auto-fit grid', caret: 0 },
        { label: 'focus-visible', insert: ':focus-visible {\n    outline: 2px solid currentColor;\n    outline-offset: 2px;\n}', description: 'Visible keyboard focus', caret: 0 },
        { label: 'reduced-motion', insert: '@media (prefers-reduced-motion: reduce) {\n    *, *::before, *::after {\n        animation-duration: 0.01ms !important;\n        animation-iteration-count: 1 !important;\n        scroll-behavior: auto !important;\n        transition-duration: 0.01ms !important;\n    }\n}', description: 'Respect reduced motion preference', caret: 0 },
        { label: 'css-variables', insert: ':root {\n    --primary-color: #2563eb;\n    --surface-color: #ffffff;\n    --text-color: #111827;\n    --spacing: 1rem;\n}', description: 'Common custom properties', caret: 0 }
    ];
    snippets.css.push(...extraCssSnippets);

    Object.keys(cssValues).forEach(function (key) {
        const values = Array.isArray(cssValues[key]) ? cssValues[key] : String(cssValues[key]).trim().split(/\s+/);
        cssValues[key] = Array.from(new Set(values.concat(values.filter(Boolean))));
    });
    window.EDITOR_INTELLISENSE_DATA = Object.assign(window.EDITOR_INTELLISENSE_DATA || {}, {
        symbols: Object.assign((window.EDITOR_INTELLISENSE_DATA || {}).symbols || {}, {
            css: [
            { label: "{ }", prefix: "{", suffix: "}", description: "Insert a CSS rule block" },
            { label: ": ;", prefix: ": ", suffix: ";", description: "Insert a CSS declaration" },
            { label: "var(--)", prefix: "var(--", suffix: ")", description: "Reference a CSS custom property" },
            { label: "()", prefix: "(", suffix: ")", description: "Insert paired parentheses" },
            { label: "/* */", prefix: "/* ", suffix: " */", description: "Insert a CSS comment" },
            { label: "@media", prefix: "@media (max-width: 768px) {\n    ", suffix: "\n}", description: "Insert a responsive media query" },
            { label: "calc()", prefix: "calc(", suffix: ")", description: "Insert a CSS calculation" },
            { label: "linear-gradient()", prefix: "linear-gradient(", suffix: ")", description: "Insert a gradient function" },
            { label: "!important", prefix: " !important", suffix: "", description: "Append important priority to a declaration" },
            { label: "#color", prefix: "#", suffix: "", description: "Start a hexadecimal color value" }
            ]
        }),

        cssProperties,
        cssValues,
        cssAtRules,
        cssPseudoClasses,
        cssPseudoElements,
        cssFunctions,
        cssUnits,
        snippets: Object.assign((window.EDITOR_INTELLISENSE_DATA || {}).snippets || {}, { css: snippets.css })
    });
})();
