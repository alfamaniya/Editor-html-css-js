/* Local, offline-first completion knowledge base. Public language standards; not copied from proprietary editor databases. */
(function () {
    'use strict';
    const htmlTags = (
        'a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd label legend li link main map mark menu meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script search section select slot small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul var video wbr'
    ).split(/\s+/);
    const htmlAttributes = (
        'accept accept-charset accesskey action align allow allowfullscreen alt async autocapitalize autocomplete autofocus autoplay capture cellpadding cellspacing challenge charset checked cite class cols colspan content contenteditable controls coords crossorigin data datetime decoding default defer dir dirname disabled download draggable enctype enterkeyhint for form formaction formenctype formmethod formnovalidate formtarget headers height hidden high href hreflang http-equiv id inert inputmode integrity is itemid itemprop itemref itemscope itemtype kind label lang list loading loop low max maxlength media method min minlength multiple muted name nomodule nonce open optimum pattern placeholder playsinline poster preload readonly referrerpolicy rel required reversed role rows rowspan sandbox scope selected shape size sizes slot span spellcheck src srcdoc srclang srcset start step style tabindex target title translate type usemap value width wrap'
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
        table:'border',
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
        table:'align bgcolor border cellpadding cellspacing frame rules summary width'
    };
    const cssProperties = (
        'accent-color align-content align-items align-self all animation animation-composition animation-delay animation-direction animation-duration animation-fill-mode animation-iteration-count animation-name animation-play-state animation-range animation-timeline animation-timing-function appearance aspect-ratio backdrop-filter backface-visibility background background-attachment background-blend-mode background-clip background-color background-image background-origin background-position background-position-x background-position-y background-repeat background-size block-size border border-block border-block-color border-block-end border-block-start border-bottom border-bottom-color border-bottom-left-radius border-bottom-right-radius border-bottom-style border-bottom-width border-collapse border-color border-image border-inline border-left border-left-color border-left-style border-left-width border-radius border-right border-right-color border-right-style border-right-width border-spacing border-style border-top border-top-color border-top-left-radius border-top-right-radius border-top-style border-top-width border-width bottom box-decoration-break box-shadow box-sizing break-after break-before break-inside caption-side caret-color clear clip clip-path color color-scheme column-count column-fill column-gap column-rule column-span column-width columns contain contain-intrinsic-size container container-name container-type content content-visibility cursor direction display empty-cells filter flex flex-basis flex-direction flex-flow flex-grow flex-shrink flex-wrap float font font-family font-feature-settings font-kerning font-optical-sizing font-size font-size-adjust font-stretch font-style font-variant font-variant-caps font-weight gap grid grid-area grid-auto-columns grid-auto-flow grid-auto-rows grid-column grid-column-end grid-column-start grid-row grid-row-end grid-row-start grid-template grid-template-areas grid-template-columns grid-template-rows hanging-punctuation height hyphens image-rendering inline-size inset inset-block inset-inline isolation justify-content justify-items justify-self left letter-spacing line-break line-height list-style list-style-image list-style-position list-style-type margin margin-block margin-bottom margin-inline margin-left margin-right margin-top mask max-block-size max-height max-inline-size max-width min-block-size min-height min-inline-size min-width mix-blend-mode object-fit object-position offset-path opacity order orphans outline outline-color outline-offset outline-style outline-width overflow overflow-anchor overflow-wrap overflow-x overflow-y overscroll-behavior padding padding-block padding-bottom padding-inline padding-left padding-right padding-top page-break-after page-break-before page-break-inside paint-order perspective perspective-origin place-content place-items place-self pointer-events position print-color-adjust quotes resize right rotate row-gap scale scroll-behavior scroll-margin scroll-padding scroll-snap-align scroll-snap-type scrollbar-color scrollbar-width shape-outside tab-size table-layout text-align text-align-last text-decoration text-decoration-color text-decoration-line text-decoration-style text-decoration-thickness text-indent text-justify text-overflow text-rendering text-shadow text-transform text-underline-offset text-underline-position top touch-action transform transform-origin transform-style transition transition-behavior transition-delay transition-duration transition-property transition-timing-function translate unicode-bidi user-select vertical-align visibility white-space widows width will-change word-break word-spacing overflow-wrap writing-mode z-index zoom'
    ).split(/\s+/);
    // Additional modern, logical, typography, scroll, SVG and form-related CSS properties.
    cssProperties.push(...(
        'anchor-name anchor-scope animation-composition animation-range animation-range-end animation-range-start animation-timeline appearance aspect-ratio block-overflow block-size border-block-color border-block-end-color border-block-end-style border-block-end-width border-block-start-color border-block-start-style border-block-start-width border-inline-color border-inline-end border-inline-end-color border-inline-end-style border-inline-end-width border-inline-start border-inline-start-color border-inline-start-style border-inline-start-width border-start-start-radius border-start-end-radius border-end-start-radius border-end-end-radius border-image-outset border-image-repeat border-image-slice border-image-source border-image-width border-inline-style border-inline-width border-block-style border-block-width box-decoration-break box-shadow break-after break-before break-inside caption-side caret-shape clip-rule color-interpolation color-interpolation-filters color-rendering column-rule-color column-rule-style column-rule-width column-span contain-intrinsic-block-size contain-intrinsic-height contain-intrinsic-inline-size contain-intrinsic-width container container-name container-type content-visibility counter-increment counter-reset counter-set cursor cx cy d direction dominant-baseline fill fill-opacity fill-rule flood-color flood-opacity font-kerning font-optical-sizing font-palette font-size-adjust font-smooth font-synthesis font-synthesis-small-caps font-synthesis-style font-synthesis-weight font-variant-alternates font-variant-emoji font-variant-ligatures font-variant-numeric font-variation-settings font-weight font-width forced-color-adjust gap grid-column-end grid-column-start grid-row-end grid-row-start grid-template-areas hanging-punctuation hyphenate-character hyphenate-limit-chars hyphens image-orientation image-rendering inline-size inset-block inset-block-end inset-block-start inset-inline inset-inline-end inset-inline-start isolation justify-tracks lighting-color line-break line-clamp line-height-step line-height letter-spacing letter-spacing locale marker marker-end marker-mid marker-start mask-border mask-border-mode mask-border-outset mask-border-repeat mask-border-slice mask-border-source mask-border-width mask-clip mask-composite mask-image mask-mode mask-origin mask-position mask-repeat mask-size mask-type math-depth math-shift math-style max-block-size max-inline-size min-block-size min-inline-size object-position offset-anchor offset-distance offset-path offset-position offset-rotate opacity order orphans outline-offset overscroll-behavior overscroll-behavior-block overscroll-behavior-inline overscroll-behavior-x overscroll-behavior-y overflow-block overflow-inline overflow-clip-margin overflow-wrap overflow-anchor overflow-block overflow-inline page page-break-after page-break-before page-break-inside paint-order perspective perspective-origin place-content place-items place-self position-anchor position-area position-try position-try-fallbacks position-try-order print-color-adjust quotes r ruby-align ruby-position rx ry scale scroll-behavior scroll-margin scroll-margin-block scroll-margin-block-end scroll-margin-block-start scroll-margin-bottom scroll-margin-inline scroll-margin-inline-end scroll-margin-inline-start scroll-margin-left scroll-margin-right scroll-margin-top scroll-padding scroll-padding-block scroll-padding-block-end scroll-padding-block-start scroll-padding-bottom scroll-padding-inline scroll-padding-inline-end scroll-padding-inline-start scroll-padding-left scroll-padding-right scroll-padding-top scroll-snap-align scroll-snap-stop scroll-snap-type scrollbar-color scrollbar-gutter scrollbar-width shape-image-threshold shape-margin shape-outside shape-rendering stop-color stop-opacity stroke stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width tab-size text-anchor text-combine-upright text-decoration-skip-ink text-emphasis text-emphasis-color text-emphasis-position text-emphasis-style text-orientation text-rendering text-size-adjust text-spacing text-underline-offset text-underline-position timeline-scope touch-action transform-box transform-origin transform-style transition-behavior translate unicode-bidi user-select vector-effect vertical-align view-transition-name visibility white-space widows width will-change word-break word-spacing writing-mode x y z-index zoom
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
    const jsWords = (
        'async await break case catch class const continue debugger default delete do else export extends finally for function if import in instanceof let new of return static super switch this throw try typeof var void while with yield true false null undefined NaN Infinity arguments console window self globalThis document navigator location history localStorage sessionStorage fetch XMLHttpRequest AbortController URL URLSearchParams FormData Headers Request Response Blob File FileReader FileList FileSystemHandle Worker SharedWorker WebSocket Event EventTarget CustomEvent MutationObserver ResizeObserver IntersectionObserver DOMParser XMLSerializer DOMException Error TypeError RangeError SyntaxError Promise Map Set WeakMap WeakSet Symbol Proxy Reflect Intl JSON Math Object Array String Number Boolean BigInt Date RegExp Function SetTimeout setTimeout clearTimeout setInterval clearInterval requestAnimationFrame cancelAnimationFrame queueMicrotask alert confirm prompt print encodeURI decodeURI encodeURIComponent decodeURIComponent parseInt parseFloat isNaN isFinite structuredClone performance crypto console.log console.warn console.error console.table console.time console.timeEnd getElementById getElementsByClassName getElementsByTagName querySelector querySelectorAll createElement createTextNode createDocumentFragment addEventListener removeEventListener dispatchEvent setAttribute getAttribute removeAttribute hasAttribute classList style innerHTML outerHTML textContent innerText value checked dataset parentNode parentElement children childNodes firstChild lastChild nextSibling previousSibling innerWidth innerHeight offsetWidth offsetHeight getBoundingClientRect closest matches append appendChild prepend before after remove replaceWith insertAdjacentHTML insertAdjacentElement contains focus blur click submit reset preventDefault stopPropagation stopImmediatePropagation target currentTarget type key code clientX clientY forEach map filter reduce reduceRight find findIndex some every includes indexOf lastIndexOf push pop shift unshift slice splice concat join split replace replaceAll match matchAll search trim trimStart trimEnd padStart padEnd toUpperCase toLowerCase charAt charCodeAt codePointAt repeat startsWith endsWith substring substr sort reverse fill flat flatMap from isArray keys values entries assign freeze create defineProperty getOwnPropertyNames hasOwnProperty call apply bind toString valueOf parse stringify stringify parse random floor ceil round abs pow sqrt max min trunc sign hypot PI E log log10 exp sin cos tan now then catch finally all allSettled race any resolve reject allSettled prototype constructor name length size has get set add delete clear keys values entries next done writable enumerable configurable'
    ).split(/\s+/);
    const jsMembers = {
        document:'activeElement body head documentElement forms images links scripts title URL cookie readyState visibilityState createElement createTextNode createDocumentFragment getElementById getElementsByClassName getElementsByTagName querySelector querySelectorAll addEventListener removeEventListener createEvent importNode elementFromPoint',
        window:'document navigator location history localStorage sessionStorage console alert confirm prompt open close print setTimeout clearTimeout setInterval clearInterval requestAnimationFrame cancelAnimationFrame fetch matchMedia getComputedStyle innerWidth innerHeight scrollTo scrollBy addEventListener removeEventListener',
        console:'log info warn error debug table dir time timeEnd group groupEnd clear assert count trace',
        Math:'abs acos acosh asin asinh atan atan2 atanh cbrt ceil clz32 cos cosh exp floor fround hypot imul log log10 log1p log2 max min pow random round sign sin sinh sqrt tan tanh trunc PI E LN2 LN10 SQRT2',
        Array:'from isArray of prototype length at concat copyWithin entries every fill filter find findIndex findLast findLastIndex flat flatMap forEach includes indexOf join keys lastIndexOf map pop push reduce reduceRight reverse shift slice some sort splice toReversed toSorted toSpliced unshift values with',
        String:'fromCharCode fromCodePoint raw prototype at charAt charCodeAt codePointAt concat endsWith includes indexOf lastIndexOf match matchAll normalize padEnd padStart repeat replace replaceAll search slice split startsWith substring toLowerCase toUpperCase trim trimEnd trimStart',
        JSON:'parse stringify',
        Object:'assign create defineProperties defineProperty entries freeze fromEntries getOwnPropertyDescriptor getOwnPropertyDescriptors getOwnPropertyNames getOwnPropertySymbols getPrototypeOf hasOwn is isExtensible isFrozen isSealed keys preventExtensions seal setPrototypeOf values',
        localStorage:'getItem setItem removeItem clear key length',
        sessionStorage:'getItem setItem removeItem clear key length',
        Promise:'all allSettled any race reject resolve with prototype',
        Date:'now parse UTC prototype',
        fetch:'then catch finally',
        navigator:'clipboard geolocation language languages onLine platform userAgent userAgentData vibrate',
        classList:'add contains entries forEach item remove replace supports toggle value',
        dataset:'keys values entries',
        event:'bubbles cancelable composed currentTarget defaultPrevented eventPhase isTrusted target timeStamp type preventDefault stopPropagation stopImmediatePropagation'
    };
    const snippets = {
        js: [
            {label:'log()', insert:'console.log();', description:'Log a value to the console', caret:12},
            {label:'function', insert:'function name() {\n    \n}', description:'Function declaration', caret:9},
            {label:'arrow', insert:'const name = () => {\n    \n};', description:'Arrow function', caret:6},
            {label:'if', insert:'if (condition) {\n    \n}', description:'If statement', caret:4},
            {label:'for', insert:'for (let i = 0; i < length; i++) {\n    \n}', description:'For loop', caret:9},
            {label:'foreach', insert:'items.forEach((item) => {\n    \n});', description:'Array forEach loop', caret:7},
            {label:'trycatch', insert:'try {\n    \n} catch (error) {\n    console.error(error);\n}', description:'Try/catch error handling', caret:8},
            {label:'querySelector', insert:'document.querySelector(\'\')', description:'Select the first matching element', caret:27},
            {label:'addEventListener', insert:'addEventListener(\'click\', (event) => {\n    \n});', description:'Register an event listener', caret:19}
        ],
        css: [
            {label:'flex-center', insert:'display: flex;\njustify-content: center;\nalign-items: center;', description:'Center content with flexbox', caret:0},
            {label:'grid-center', insert:'display: grid;\nplace-items: center;', description:'Center content with grid', caret:0},
            {label:'transition', insert:'transition: all 0.3s ease;', description:'Common transition', caret:0},
            {label:'box-shadow', insert:'0 4px 12px rgba(0, 0, 0, 0.15)', description:'Soft shadow value', caret:0}
        ]
    };
    Object.keys(cssValues).forEach(function (key) { cssValues[key] = cssValues[key].split(/\s+/); });
    Object.keys(jsMembers).forEach(function (key) { jsMembers[key] = jsMembers[key].split(/\s+/); });
    Object.keys(htmlAttrsByTag).forEach(function (key) { htmlAttrsByTag[key] = htmlAttrsByTag[key].split(/\s+/); });
    window.EDITOR_INTELLISENSE_DATA = { htmlTags, htmlAttributes, htmlAttrsByTag, cssProperties, cssValues, jsWords, jsMembers, snippets };
})();