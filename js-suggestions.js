// Expanded JavaScript language and browser API suggestions; see extended lists below.
(function () {
    'use strict';
    const jsWords = (
        'async await break case catch class const continue debugger default delete do else export extends finally for function if import in instanceof let new of return static super switch this throw try typeof var void while with yield true false null undefined NaN Infinity arguments console window self globalThis document navigator location history localStorage sessionStorage fetch XMLHttpRequest AbortController URL URLSearchParams FormData Headers Request Response Blob File FileReader FileList FileSystemHandle Worker SharedWorker WebSocket Event EventTarget CustomEvent MutationObserver ResizeObserver IntersectionObserver DOMParser XMLSerializer DOMException Error TypeError RangeError SyntaxError Promise Map Set WeakMap WeakSet Symbol Proxy Reflect Intl JSON Math Object Array String Number Boolean BigInt Date RegExp Function setTimeout clearTimeout setInterval clearInterval requestAnimationFrame cancelAnimationFrame queueMicrotask alert confirm prompt print encodeURI decodeURI encodeURIComponent decodeURIComponent parseInt parseFloat isNaN isFinite structuredClone performance crypto console.log console.warn console.error console.table console.time console.timeEnd getElementById getElementsByClassName getElementsByTagName querySelector querySelectorAll createElement createTextNode createDocumentFragment addEventListener removeEventListener dispatchEvent setAttribute getAttribute removeAttribute hasAttribute classList style innerHTML outerHTML textContent innerText value checked dataset parentNode parentElement children childNodes firstChild lastChild nextSibling previousSibling innerWidth innerHeight offsetWidth offsetHeight getBoundingClientRect closest matches append appendChild prepend before after remove replaceWith insertAdjacentHTML insertAdjacentElement contains focus blur click submit reset preventDefault stopPropagation stopImmediatePropagation target currentTarget type key code clientX clientY forEach map filter reduce reduceRight find findIndex some every includes indexOf lastIndexOf push pop shift unshift slice splice concat join split replace replaceAll match matchAll search trim trimStart trimEnd padStart padEnd toUpperCase toLowerCase charAt charCodeAt codePointAt repeat startsWith endsWith substring substr sort reverse fill flat flatMap from isArray keys values entries assign freeze create defineProperty getOwnPropertyNames hasOwnProperty call apply bind toString valueOf parse stringify stringify parse random floor ceil round abs pow sqrt max min trunc sign hypot PI E log log10 exp sin cos tan now then catch finally all allSettled race any resolve reject allSettled prototype constructor name length size has get set add delete clear keys values entries next done writable enumerable configurable'
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
            {label:'querySelector', insert:'document.querySelector(\'\')', description:'Select the first matching element', caret:24},
            {label:'addEventListener', insert:'addEventListener(\'click\', (event) => {\n    \n});', description:'Register an event listener', caret:19}
        ],
    };
    const extendedJsWords = (
        'globalThis AggregateError WeakRef FinalizationRegistry SuppressedError Iterator AsyncIterator Temporal Intl.Locale Intl.DateTimeFormat Intl.NumberFormat Intl.Collator Intl.PluralRules Intl.ListFormat Intl.RelativeTimeFormat Intl.Segmenter URLPattern structuredClone queueMicrotask reportError scheduler AbortSignal DOMParser XMLSerializer XPathEvaluator XPathResult TreeWalker NodeIterator NodeFilter MutationRecord ShadowRoot DocumentFragment DocumentType DocumentTimeline DOMTokenList NamedNodeMap HTMLCollection NodeList StaticRange Selection Range TreeWalker MutationObserver ResizeObserver IntersectionObserver PerformanceObserver PerformanceEntry PerformanceResourceTiming PerformanceNavigationTiming PerformancePaintTiming PerformanceMark PerformanceMeasure CSS CSSStyleSheet CSSRule CSSStyleDeclaration CSSStyleValue CSSUnitValue CSSKeywordValue CustomElementRegistry HTMLElement Element Node Attr Text Comment CharacterData DocumentFragment NodeList StaticRange HTMLAnchorElement HTMLButtonElement HTMLCanvasElement HTMLFormElement HTMLInputElement HTMLImageElement HTMLLinkElement HTMLScriptElement HTMLSelectElement HTMLTextAreaElement HTMLTemplateElement HTMLSlotElement HTMLDialogElement HTMLDetailsElement HTMLMediaElement HTMLVideoElement HTMLAudioElement DOMRect DOMRectReadOnly DOMPoint DOMMatrix DOMMatrixReadOnly DOMQuad DOMException Event EventTarget CustomEvent MessageEvent KeyboardEvent MouseEvent PointerEvent TouchEvent FocusEvent InputEvent SubmitEvent ErrorEvent ProgressEvent StorageEvent HashChangeEvent PopStateEvent PromiseRejectionEvent BeforeUnloadEvent AnimationEvent TransitionEvent WheelEvent ClipboardEvent DragEvent CompositionEvent FormDataEvent URLSearchParams TextEncoder TextDecoder TextEncoderStream TextDecoderStream CompressionStream DecompressionStream ReadableStream ReadableStreamDefaultReader ReadableStreamBYOBReader ReadableStreamDefaultController WritableStream WritableStreamDefaultWriter WritableStreamDefaultController TransformStream ByteLengthQueuingStrategy CountQueuingStrategy Blob File FileList FileReader FileReaderSync FileSystemHandle FileSystemFileHandle FileSystemDirectoryHandle FileSystemWritableFileStream FileSystemObserver Storage StorageManager StorageEvent BroadcastChannel MessageChannel MessagePort Worker SharedWorker ServiceWorker ServiceWorkerContainer ServiceWorkerRegistration Cache CacheStorage caches indexedDB IDBFactory IDBDatabase IDBObjectStore IDBIndex IDBKeyRange IDBCursor IDBRequest IDBOpenDBRequest IDBTransaction IDBVersionChangeEvent WebSocket WebTransport XMLHttpRequest XMLHttpRequestUpload Request Response Headers navigator credentials mediaDevices permissions serviceWorker locks userAgentData sendBeacon Notification PushManager PushSubscription PaymentRequest Bluetooth NFC Serial USB HID Gamepad Audio AudioContext OfflineAudioContext AudioNode AudioParam AnalyserNode BiquadFilterNode OscillatorNode GainNode MediaStream MediaStreamTrack MediaRecorder MediaDevices RTCPeerConnection RTCDataChannel RTCSessionDescription RTCIceCandidate WebRTC WebAssembly WebGLRenderingContext WebGL2RenderingContext CanvasRenderingContext2D OffscreenCanvas Path2D Image ImageData ImageBitmap ImageBitmapRenderingContext createImageBitmap requestIdleCallback cancelIdleCallback requestAnimationFrame cancelAnimationFrame IntersectionObserver MutationObserver ResizeObserver getComputedStyle matchMedia scrollTo scrollBy scrollIntoView requestSubmit reportValidity checkValidity setCustomValidity showModal close showPopover hidePopover togglePopover startViewTransition VisualViewport screen orientation devicePixelRatio isSecureContext crossOriginIsolated trustedTypes performance crypto subtle randomUUID getRandomValues digest encrypt decrypt sign verify deriveBits deriveKey generateKey importKey exportKey wrapKey unwrapKey encode decode'
    ).split(/\s+/);
    jsWords.push(...extendedJsWords);
    jsWords.splice(0, jsWords.length, ...Array.from(new Set(jsWords)));

    const extendedJsMembers = {
        document: 'adoptNode createRange createTreeWalker createNodeIterator createEvent exitFullscreen exitPictureInPicture fullscreenElement pictureInPictureElement scrollingElement getSelection hasFocus createExpression createNSResolver getAnimations startViewTransition',
        window: 'globalThis self frames parent top opener origin isSecureContext crossOriginIsolated visualViewport devicePixelRatio crypto indexedDB caches trustedTypes scheduler requestIdleCallback cancelIdleCallback getComputedStyle scrollTo scrollBy open print stop reportError',
        navigator: 'clipboard credentials geolocation hardwareConcurrency language languages locks maxTouchPoints mediaCapabilities mediaDevices permissions platform plugins presentation serviceWorker storage userAgent userAgentData onLine vibrate wakeLock',
        location: 'assign reload replace toString ancestorOrigins hash host hostname href origin pathname port protocol search',
        history: 'back forward go pushState replaceState length scrollRestoration state',
        Element: 'animate append attachShadow before after closest computedStyleMap getAttributeNames getBoundingClientRect getClientRects getHTML hasPointerCapture insertAdjacentElement insertAdjacentHTML insertAdjacentText matches prepend querySelector querySelectorAll releasePointerCapture remove removeAttribute requestFullscreen replaceChildren replaceWith scroll scrollIntoView setAttribute setHTML toggleAttribute',
        HTMLElement: 'accessKey attachInternals blur click contentEditable dataset dir draggable focus hidden inert innerText inputMode lang offsetHeight offsetLeft offsetParent offsetTop offsetWidth outerText popover spellcheck title translate',
        Node: 'appendChild baseURI childNodes cloneNode compareDocumentPosition contains getRootNode hasChildNodes insertBefore isConnected isEqualNode isSameNode normalize parentElement parentNode removeChild replaceChild textContent',
        Event: 'AT_TARGET BUBBLING_PHASE CAPTURING_PHASE NONE bubbles cancelable composed currentTarget defaultPrevented eventPhase isTrusted preventDefault stopImmediatePropagation stopPropagation target timeStamp type',
        event: 'altKey button buttons clientX clientY composedPath ctrlKey currentTarget data defaultPrevented detail key keyCode metaKey offsetX offsetY pointerId pointerType shiftKey target timeStamp type',
        Request: 'cache credentials destination headers integrity keepalive method mode redirect referrer referrerPolicy signal url clone arrayBuffer blob formData json text',
        Response: 'error json redirect headers ok redirected status statusText type url clone arrayBuffer blob formData text',
        Headers: 'append delete entries forEach get has keys set values',
        URL: 'canParse createObjectURL parse revokeObjectURL toJSON',
        URLSearchParams: 'append delete entries forEach get getAll has keys set sort toString values',
        Promise: 'all allSettled any race reject resolve try with then catch finally',
        Array: 'at concat copyWithin entries every fill filter find findIndex findLast findLastIndex flat flatMap forEach from fromAsync includes indexOf join keys lastIndexOf map of pop push reduce reduceRight reverse shift slice some sort splice toLocaleString toReversed toSorted toSpliced unshift values with',
        Object: 'assign create defineProperties defineProperty entries freeze fromEntries getOwnPropertyDescriptor getOwnPropertyDescriptors getOwnPropertyNames getOwnPropertySymbols getPrototypeOf groupBy hasOwn is isExtensible isFrozen isSealed keys preventExtensions seal setPrototypeOf toString values',
        String: 'at charAt charCodeAt codePointAt concat endsWith includes indexOf italics lastIndexOf localeCompare match matchAll normalize padEnd padStart repeat replace replaceAll search slice small split startsWith strike sub substr substring sup toLocaleLowerCase toLocaleUpperCase toLowerCase toString toUpperCase trim trimEnd trimStart valueOf',
        Map: 'clear delete entries forEach get has keys set size values',
        Set: 'add clear delete difference entries forEach has intersection isDisjointFrom isSubsetOf isSupersetOf keys size symmetricDifference union values',
        RegExp: 'dotAll exec flags global hasIndices ignoreCase lastIndex multiline source sticky test unicode unicodeSets',
        Date: 'getDate getDay getFullYear getHours getMilliseconds getMinutes getMonth getSeconds getTime getTimezoneOffset getUTCDate getUTCDay getUTCFullYear getUTCHours getUTCMilliseconds getUTCMinutes getUTCMonth getUTCSeconds now parse setDate setFullYear setHours setMilliseconds setMinutes setMonth setSeconds setTime toDateString toISOString toJSON toLocaleDateString toLocaleString toLocaleTimeString toString toTimeString toUTCString UTC valueOf',
        Math: 'abs acos acosh asin asinh atan atan2 atanh cbrt ceil clz32 cos cosh exp expm1 floor fround hypot imul log log10 log1p log2 max min pow random round sign sin sinh sqrt tan tanh trunc',
        JSON: 'isRaw parse raw stringify',
        Intl: 'Collator DateTimeFormat DisplayNames DurationFormat ListFormat Locale NumberFormat PluralRules RelativeTimeFormat Segmenter',
        performance: 'clearMarks clearMeasures clearResourceTimings getEntries getEntriesByName getEntriesByType mark measure now setResourceTimingBufferSize timeOrigin toJSON',
        crypto: 'getRandomValues randomUUID subtle',
        SubtleCrypto: 'decrypt deriveBits deriveKey digest encrypt exportKey generateKey importKey sign unwrapKey verify wrapKey',
        Storage: 'clear getItem key length removeItem setItem',
        IDBDatabase: 'close createObjectStore deleteObjectStore name objectStoreNames transaction version',
        IDBObjectStore: 'add autoIncrement clear count createIndex delete deleteIndex get getAll getAllKeys getKey index keyPath name openCursor openKeyCursor put',
        ReadableStream: 'cancel getReader locked pipeThrough pipeTo tee values',
        WritableStream: 'abort close getWriter locked',
        AbortSignal: 'abort any timeout aborted reason throwIfAborted'
    };
    Object.keys(extendedJsMembers).forEach(function (key) {
        const current = jsMembers[key] || '';
        jsMembers[key] = Array.from(new Set((current + ' ' + extendedJsMembers[key]).trim().split(/\s+/))).join(' ');
    });

    const extraJsSnippets = [
        { label: 'fetch-json', insert: 'fetch(url)\n    .then((response) => {\n        if (!response.ok) throw new Error("HTTP error");\n        return response.json();\n    })\n    .then((data) => {\n        console.log(data);\n    })\n    .catch((error) => {\n        console.error(error);\n    });', description: 'Fetch JSON with response and error checks', caret: 6 },
        { label: 'async-function', insert: 'async function name() {\n    try {\n        const response = await fetch(url);\n        if (!response.ok) throw new Error("HTTP error");\n        return await response.json();\n    } catch (error) {\n        console.error(error);\n        throw error;\n    }\n}', description: 'Async function with error handling', caret: 15 },
        { label: 'dom-ready', insert: 'document.addEventListener(\'DOMContentLoaded\', () => {\n    \n});', description: 'Run after HTML parsing', caret: 54 },
        { label: 'query-all', insert: 'document.querySelectorAll(\'.item\').forEach((element) => {\n    \n});', description: 'Loop over matching elements', caret: 48 },
        { label: 'toggle-class', insert: 'element.classList.toggle(\'active\');', description: 'Toggle a CSS class', caret: 26 },
        { label: 'form-submit', insert: 'form.addEventListener(\'submit\', (event) => {\n    event.preventDefault();\n    \n});', description: 'Handle form submission', caret: 57 },
        { label: 'local-storage', insert: 'localStorage.setItem(\'key\', JSON.stringify(value));', description: 'Store JSON in local storage', caret: 28 },
        { label: 'try-catch', insert: 'try {\n    \n} catch (error) {\n    console.error(error);\n}', description: 'Handle a synchronous error', caret: 8 },
        { label: 'promise', insert: 'Promise.resolve(value)\n    .then((result) => {\n        \n    })\n    .catch((error) => {\n        console.error(error);\n    });', description: 'Promise chain with error handling', caret: 51 },
        { label: 'debounce', insert: 'let timer;\nfunction debounce(callback, delay = 250) {\n    clearTimeout(timer);\n    timer = setTimeout(callback, delay);\n}', description: 'Small debounce pattern', caret: 55 },
        { label: 'event-delegation', insert: 'container.addEventListener(\'click\', (event) => {\n    const target = event.target.closest(\'[data-action]\');\n    if (!target) return;\n    \n});', description: 'Event delegation pattern', caret: 130 },
        { label: 'intersection-observer', insert: 'const observer = new IntersectionObserver((entries) => {\n    entries.forEach((entry) => {\n        if (entry.isIntersecting) {\n            \n        }\n    });\n});', description: 'Observe an element entering the viewport', caret: 113 },
        { label: 'module-import', insert: 'import { name } from \'./module.js\';', description: 'ES module named import', caret: 9 },
        { label: 'class', insert: 'class Name {\n    constructor(options = {}) {\n        this.options = options;\n    }\n}', description: 'ES class with constructor', caret: 6 }
    ];
    snippets.js.push(...extraJsSnippets);

    Object.keys(jsMembers).forEach(function (key) {
        const value = Array.isArray(jsMembers[key]) ? jsMembers[key].join(' ') : jsMembers[key];
        jsMembers[key] = Array.from(new Set(String(value).split(/\s+/).filter(Boolean)));
    });
    window.EDITOR_INTELLISENSE_DATA = Object.assign(window.EDITOR_INTELLISENSE_DATA || {}, {
        symbols: Object.assign((window.EDITOR_INTELLISENSE_DATA || {}).symbols || {}, {
            js: [
            { label: "console.log()", prefix: "console.log(", suffix: ");", description: "Log a value to the console" },
            { label: "querySelector()", prefix: "document.querySelector('", suffix: "')", description: "Select an element with a CSS selector" },
            { label: "addEventListener", prefix: "addEventListener('click', () => {\n    ", suffix: "\n});", description: "Add a click event handler" },
            { label: "() => { }", prefix: "() => {", suffix: "}", description: "Insert an arrow function body" },
            { label: "if ( )", prefix: "if (", suffix: ") {\n    \n}", description: "Insert an if statement" },
            { label: "{ }", prefix: "{", suffix: "}", description: "Insert paired braces" },
            { label: "[ ]", prefix: "[", suffix: "]", description: "Insert an array or bracket pair" },
            { label: "/* */", prefix: "/* ", suffix: " */", description: "Insert a block comment" },
            { label: "//", prefix: "// ", suffix: "", description: "Start a single-line comment" },
            { label: "try/catch", prefix: "try {\n    ", suffix: "\n} catch (error) {\n    console.error(error);\n}", description: "Insert error handling" }
            ]
        }),

        jsWords,
        jsMembers,
        snippets: Object.assign((window.EDITOR_INTELLISENSE_DATA || {}).snippets || {}, { js: snippets.js })
    });
})();
