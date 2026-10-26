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


    // Vocabulary curated against the ECMAScript specification and MDN's JavaScript/Web API references.
    // Static completion is not browser-feature detection; newer APIs may vary by runtime.
    const standardsAndWebApiWords = (
        'using as AggregateError EvalError ReferenceError URIError SuppressedError Generator GeneratorFunction AsyncFunction AsyncGeneratorFunction AsyncGenerator DisposableStack AsyncDisposableStack Iterator AsyncIterator Float16Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array BigInt64Array BigUint64Array ArrayBuffer SharedArrayBuffer DataView Atomics Document Element HTMLElement SVGElement Node Text Comment Attr DocumentType DocumentFragment HTMLFormElement HTMLInputElement HTMLButtonElement HTMLSelectElement HTMLTextAreaElement HTMLAnchorElement HTMLImageElement HTMLScriptElement HTMLStyleElement HTMLLinkElement HTMLTemplateElement HTMLDialogElement HTMLMediaElement HTMLVideoElement HTMLAudioElement HTMLCanvasElement HTMLOptionElement HTMLCollection NodeList RadioNodeList NamedNodeMap DOMTokenList DOMParser XMLSerializer XPathEvaluator XPathExpression XPathResult TreeWalker NodeIterator NodeFilter MutationRecord Range Selection TextEncoder TextDecoder TextEncoderStream TextDecoderStream CompressionStream DecompressionStream ReadableStream ReadableStreamDefaultReader ReadableStreamDefaultController WritableStream WritableStreamDefaultWriter WritableStreamDefaultController TransformStream ByteLengthQueuingStrategy CountQueuingStrategy BroadcastChannel MessageChannel MessagePort ServiceWorker ServiceWorkerContainer ServiceWorkerRegistration Cache CacheStorage IDBFactory IDBDatabase IDBObjectStore IDBIndex IDBKeyRange IDBCursor IDBRequest IDBOpenDBRequest IDBTransaction FileSystemHandle FileSystemFileHandle FileSystemDirectoryHandle FileSystemWritableFileStream EventSource WebTransport RTCPeerConnection RTCDataChannel RTCSessionDescription RTCIceCandidate Notification PermissionStatus PushManager PushSubscription MediaRecorder MediaStream MediaStreamTrack MediaDevices AudioContext OfflineAudioContext AudioNode AudioParam AnalyserNode BiquadFilterNode OscillatorNode GainNode AudioBuffer AudioBufferSourceNode ImageData ImageBitmap ImageBitmapRenderingContext OffscreenCanvas Path2D WebAssembly VisualViewport Screen Storage StorageManager Crypto SubtleCrypto DOMPoint DOMMatrix DOMRect DOMRectReadOnly showOpenFilePicker showSaveFilePicker requestIdleCallback cancelIdleCallback reportError customElements createImageBitmap'
    ).split(/\s+/);
    jsWords.push(...standardsAndWebApiWords);
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


    // Member maps for standard built-ins and commonly used browser interfaces.
    const standardsBrowserMembers = {
        globalThis: 'Infinity NaN undefined Object Function Boolean Symbol Error AggregateError Array String Number BigInt Date RegExp Map Set WeakMap WeakSet Promise Math JSON Reflect Proxy Intl ArrayBuffer SharedArrayBuffer DataView Atomics URL URLSearchParams fetch document navigator location history localStorage sessionStorage console crypto performance indexedDB caches',
        RegExp: 'exec test source flags global hasIndices ignoreCase lastIndex multiline dotAll sticky unicode unicodeSets',
        Number: 'EPSILON MAX_SAFE_INTEGER MAX_VALUE MIN_SAFE_INTEGER MIN_VALUE NaN NEGATIVE_INFINITY POSITIVE_INFINITY isFinite isInteger isNaN isSafeInteger parseFloat parseInt toExponential toFixed toLocaleString toPrecision toString valueOf',
        Boolean: 'toString valueOf',
        BigInt: 'asIntN asUintN',
        Symbol: 'asyncIterator for hasInstance isConcatSpreadable iterator keyFor match matchAll replace search species split toPrimitive toStringTag unscopables dispose asyncDispose description',
        Reflect: 'apply construct defineProperty deleteProperty get getOwnPropertyDescriptor getPrototypeOf has isExtensible ownKeys preventExtensions set setPrototypeOf',
        Proxy: 'revocable',
        WeakMap: 'delete get has set',
        WeakSet: 'add delete has',
        ArrayBuffer: 'byteLength maxByteLength resizable resize slice transfer transferToFixedLength detached isView',
        SharedArrayBuffer: 'byteLength maxByteLength growable grow slice',
        DataView: 'buffer byteLength byteOffset getBigInt64 getBigUint64 getFloat16 getFloat32 getFloat64 getInt8 getInt16 getInt32 getUint8 getUint16 getUint32 setBigInt64 setBigUint64 setFloat16 setFloat32 setFloat64 setInt8 setInt16 setInt32 setUint8 setUint16 setUint32',
        Atomics: 'add and compareExchange exchange isLockFree load notify or pause store sub wait waitAsync xor',
        Element: 'after animate append attachShadow before closest computedStyleMap getAttribute getAttributeNames getBoundingClientRect getClientRects hasAttribute insertAdjacentElement insertAdjacentHTML insertAdjacentText matches prepend querySelector querySelectorAll remove removeAttribute replaceChildren replaceWith requestFullscreen scrollIntoView setAttribute toggleAttribute',
        HTMLElement: 'accessKey blur click contentEditable dataset dir draggable focus hidden inert innerText inputMode lang offsetHeight offsetLeft offsetParent offsetTop offsetWidth outerText popover spellcheck title translate',
        Document: 'activeElement adoptNode body characterSet close compatMode contentType createAttribute createComment createDocumentFragment createElement createElementNS createEvent createNodeIterator createRange createTextNode createTreeWalker doctype documentElement documentURI elementFromPoint elementsFromPoint forms fullscreenElement getElementById getElementsByClassName getElementsByName getElementsByTagName hasFocus head hidden importNode lastModified querySelector querySelectorAll readyState referrer title visibilityState',
        HTMLFormElement: 'acceptCharset action autocomplete elements encoding enctype length method name noValidate rel reset requestSubmit submit target',
        HTMLInputElement: 'accept alt autocomplete checked files form formAction formEnctype formMethod formNoValidate formTarget height indeterminate max maxLength min minLength multiple name pattern placeholder readOnly required selectionEnd selectionStart size src step type validationMessage validity value valueAsDate valueAsNumber width checkValidity reportValidity select setCustomValidity setRangeText setSelectionRange',
        HTMLTextAreaElement: 'cols dirName form maxLength minLength name placeholder readOnly required rows selectionEnd selectionStart textLength type validationMessage validity value wrap checkValidity reportValidity select setCustomValidity setRangeText setSelectionRange',
        HTMLSelectElement: 'disabled form length multiple name options required selectedIndex selectedOptions size type value add checkValidity item namedItem remove reportValidity setCustomValidity',
        HTMLButtonElement: 'disabled form formAction formEnctype formMethod formNoValidate formTarget name type value',
        HTMLCanvasElement: 'height width captureStream getContext toBlob toDataURL transferControlToOffscreen',
        CanvasRenderingContext2D: 'canvas clearRect fillRect strokeRect fillText strokeText measureText beginPath closePath moveTo lineTo arc rect quadraticCurveTo bezierCurveTo fill stroke clip save restore translate rotate scale transform setTransform resetTransform drawImage createImageData getImageData putImageData createLinearGradient createRadialGradient createPattern',
        Node: 'ELEMENT_NODE ATTRIBUTE_NODE TEXT_NODE CDATA_SECTION_NODE COMMENT_NODE DOCUMENT_NODE DOCUMENT_TYPE_NODE DOCUMENT_FRAGMENT_NODE nodeName nodeType nodeValue ownerDocument parentNode parentElement childNodes firstChild lastChild previousSibling nextSibling isConnected textContent baseURI cloneNode compareDocumentPosition contains getRootNode hasChildNodes insertBefore appendChild replaceChild removeChild normalize',
        NodeList: 'length item forEach entries keys values',
        EventTarget: 'addEventListener dispatchEvent removeEventListener',
        Event: 'bubbles cancelable composed currentTarget defaultPrevented eventPhase isTrusted target timeStamp type preventDefault stopPropagation stopImmediatePropagation composedPath',
        CustomEvent: 'detail initCustomEvent',
        KeyboardEvent: 'altKey code ctrlKey isComposing key location metaKey repeat shiftKey',
        MouseEvent: 'altKey button buttons clientX clientY ctrlKey metaKey movementX movementY offsetX offsetY pageX pageY relatedTarget screenX screenY shiftKey',
        PointerEvent: 'height isPrimary pointerId pointerType pressure tangentialPressure tiltX tiltY twist width altitudeAngle azimuthAngle',
        FormData: 'append delete entries forEach get getAll has keys set values',
        Blob: 'arrayBuffer bytes size slice stream text type',
        File: 'lastModified name webkitRelativePath',
        FileReader: 'abort error readAsArrayBuffer readAsBinaryString readAsDataURL readAsText readyState result',
        URL: 'canParse createObjectURL parse revokeObjectURL toJSON hash host hostname href origin password pathname port protocol search searchParams username',
        URLSearchParams: 'append delete entries forEach get getAll has keys set size sort toString values',
        AbortController: 'abort signal',
        AbortSignal: 'aborted any reason timeout throwIfAborted',
        MutationObserver: 'disconnect observe takeRecords',
        IntersectionObserver: 'disconnect observe root rootMargin thresholds takeRecords unobserve',
        ResizeObserver: 'disconnect observe unobserve',
        PerformanceObserver: 'disconnect observe takeRecords supportedEntryTypes',
        XMLHttpRequest: 'DONE HEADERS_RECEIVED LOADING OPENED UNSENT abort getAllResponseHeaders getResponseHeader open overrideMimeType send setRequestHeader readyState response responseText responseType responseURL responseXML status statusText timeout upload withCredentials',
        WebSocket: 'CONNECTING OPEN CLOSING CLOSED binaryType bufferedAmount close extensions onclose onerror onmessage onopen protocol readyState send url',
        Worker: 'onerror onmessage onmessageerror postMessage terminate',
        Headers: 'append delete entries forEach get has keys set values',
        Request: 'cache credentials destination headers integrity keepalive method mode redirect referrer referrerPolicy signal url clone arrayBuffer blob formData json text',
        Response: 'error json redirect headers ok redirected status statusText type url clone arrayBuffer blob formData text bytes',
        TextEncoder: 'encode encodeInto',
        TextDecoder: 'decode fatal ignoreBOM encoding',
        Crypto: 'getRandomValues randomUUID subtle',
        SubtleCrypto: 'decrypt deriveBits deriveKey digest encrypt exportKey generateKey importKey sign unwrapKey verify wrapKey',
        Storage: 'clear getItem key length removeItem setItem',
        indexedDB: 'databases deleteDatabase open cmp',
        IDBDatabase: 'close createObjectStore deleteObjectStore name objectStoreNames transaction version',
        IDBObjectStore: 'add autoIncrement clear count createIndex delete deleteIndex get getAll getAllKeys getKey index keyPath name openCursor openKeyCursor put',
        IDBTransaction: 'db durability error mode objectStoreNames abort commit objectStore',
        ReadableStream: 'cancel getReader locked pipeThrough pipeTo tee values',
        ReadableStreamDefaultReader: 'cancel closed read releaseLock',
        WritableStream: 'abort close getWriter locked',
        WritableStreamDefaultWriter: 'abort close closed desiredSize ready releaseLock write',
        TransformStream: 'readable writable',
        AudioContext: 'baseLatency outputLatency currentTime destination listener sampleRate state close createAnalyser createBuffer createBufferSource createChannelMerger createChannelSplitter createConstantSource createConvolver createDelay createDynamicsCompressor createGain createIIRFilter createMediaElementSource createMediaStreamDestination createMediaStreamSource createOscillator decodeAudioData resume suspend',
        MediaRecorder: 'audioBitsPerSecond mimeType ondataavailable onerror onpause onresume onstart onstop pause requestData resume start state stop stream videoBitsPerSecond',
        MediaStream: 'active getAudioTracks getTrackById getTracks getVideoTracks id onaddtrack onremovetrack oninactive removeTrack addTrack',
        Notification: 'permission close onclick onerror onshow',
        Intl: 'Collator DateTimeFormat DisplayNames DurationFormat ListFormat Locale NumberFormat PluralRules RelativeTimeFormat Segmenter',
        DisposableStack: 'disposed defer dispose move use',
        AsyncDisposableStack: 'disposed defer disposeAsync move use'
    };
    Object.keys(standardsBrowserMembers).forEach(function (key) {
        const current = jsMembers[key] || '';
        jsMembers[key] = Array.from(new Set((current + ' ' + standardsBrowserMembers[key]).trim().split(/\s+/))).join(' ');
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

    // Short triggers inspired by widely used editor snippet conventions.
    // Labels start with the trigger so the existing prefix filter can find them.
    snippets.js.push(
        { label: 'clg -> console.log()', insert: 'console.log(value);', description: 'Shortcut: log a value', caret: 12 },
        { label: 'cer -> console.error()', insert: 'console.error(error);', description: 'Shortcut: log an error', caret: 14 },
        { label: 'cwarn -> console.warn()', insert: 'console.warn(message);', description: 'Shortcut: log a warning', caret: 13 },
        { label: 'qs -> querySelector()', insert: "document.querySelector('.selector')", description: 'Shortcut: select one DOM element', caret: 26 },
        { label: 'qsa -> querySelectorAll()', insert: "document.querySelectorAll('.selector')", description: 'Shortcut: select all matching elements', caret: 29 },
        { label: 'gid -> getElementById()', insert: "document.getElementById('id')", description: 'Shortcut: select an element by ID', caret: 24 },
        { label: 'addel -> addEventListener()', insert: "element.addEventListener('click', (event) => {\n    \n});", description: 'Shortcut: create an event listener', caret: 43 },
        { label: 'afn -> async arrow function', insert: 'const name = async (value) => {\n    \n};', description: 'Shortcut: create an async arrow function', caret: 31 },
        { label: 'fn -> function declaration', insert: 'function name(value) {\n    \n}', description: 'Shortcut: create a function', caret: 18 },
        { label: 'forof -> for...of loop', insert: 'for (const item of items) {\n    \n}', description: 'Shortcut: loop over iterable values', caret: 29 },
        { label: 'iife -> immediately invoked function', insert: '(() => {\n    \n})();', description: 'Shortcut: create an IIFE', caret: 8 },
        { label: 'tc -> try/catch', insert: 'try {\n    \n} catch (error) {\n    console.error(error);\n}', description: 'Shortcut: handle an error', caret: 8 },
        { label: 'pall -> Promise.all()', insert: 'const results = await Promise.all([firstTask(), secondTask()]);', description: 'Shortcut: await multiple tasks', caret: 42 },
        { label: 'jparse -> JSON.parse()', insert: "JSON.parse(text)", description: 'Shortcut: parse JSON text', caret: 11 },
        { label: 'jstr -> JSON.stringify()', insert: 'JSON.stringify(value, null, 2)', description: 'Shortcut: format a value as JSON', caret: 19 },
        { label: 'ls -> localStorage.setItem()', insert: "localStorage.setItem('key', JSON.stringify(value));", description: 'Shortcut: save a JSON value in local storage', caret: 24 },
        { label: 'raf -> requestAnimationFrame()', insert: 'requestAnimationFrame((timestamp) => {\n    \n});', description: 'Shortcut: schedule work before repaint', caret: 34 },
        { label: 'imp -> import named export', insert: "import { name } from './module.js';", description: 'Shortcut: import a named export', caret: 9 },
        { label: 'exp -> export named function', insert: 'export function name(value) {\n    return value;\n}', description: 'Shortcut: export a function', caret: 21 }
    );

    snippets.js.push(
        { label: 'promise-all', insert: 'const results = await Promise.all([\n    firstTask(),\n    secondTask()\n]);', description: 'Run independent asynchronous tasks together', caret: 40 },
        { label: 'form-validation', insert: 'form.addEventListener(\'submit\', (event) => {\n    event.preventDefault();\n    if (!form.checkValidity()) {\n        form.reportValidity();\n        return;\n    }\n    \n});', description: 'Validate a form before handling its data', caret: 163 },
        { label: 'abort-fetch', insert: 'const controller = new AbortController();\nconst response = await fetch(url, { signal: controller.signal });\nif (!response.ok) throw new Error(\'HTTP error\');', description: 'Make a cancellable fetch request', caret: 71 },
        { label: 'intersection-observer-cleanup', insert: 'const observer = new IntersectionObserver((entries) => {\n    for (const entry of entries) {\n        if (entry.isIntersecting) {\n            \n        }\n    }\n});\nobserver.observe(element);', description: 'Observe visibility and react when an element enters view', caret: 140 },
        { label: 'mutation-observer', insert: 'const observer = new MutationObserver((mutations) => {\n    for (const mutation of mutations) {\n        console.log(mutation.type);\n    }\n});\nobserver.observe(element, { childList: true, subtree: true });', description: 'Observe DOM changes', caret: 103 },
        { label: 'storage-parse', insert: 'const raw = localStorage.getItem(\'key\');\nconst value = raw === null ? null : JSON.parse(raw);', description: 'Read and parse a saved JSON value safely', caret: 77 },
        { label: 'module-export', insert: 'export function name(value) {\n    return value;\n}\n\nexport default name;', description: 'Create named and default module exports', caret: 34 }
    );

    Object.keys(jsMembers).forEach(function (key) {
        const value = Array.isArray(jsMembers[key]) ? jsMembers[key].join(' ') : jsMembers[key];
        jsMembers[key] = Array.from(new Set(String(value).split(/\s+/).filter(Boolean)));
    });
    window.EDITOR_INTELLISENSE_DATA = Object.assign(window.EDITOR_INTELLISENSE_DATA || {}, {
        symbols: Object.assign((window.EDITOR_INTELLISENSE_DATA || {}).symbols || {}, {
            js: [
                {
                    "label": "console.log()",
                    "prefix": "console.log(",
                    "suffix": ");",
                    "description": "Log a value to the console"
                },
                {
                    "label": "const",
                    "prefix": "const ",
                    "suffix": " = ",
                    "description": "Declare a constant; caret starts at the variable name"
                },
                {
                    "label": "let",
                    "prefix": "let ",
                    "suffix": " = ",
                    "description": "Declare a block-scoped variable"
                },
                {
                    "label": "if",
                    "prefix": "if (",
                    "suffix": ") {\n    \n}",
                    "description": "Insert an if statement"
                },
                {
                    "label": "if / else",
                    "prefix": "if (",
                    "suffix": ") {\n    \n} else {\n    \n}",
                    "description": "Insert an if/else branch"
                },
                {
                    "label": "function",
                    "prefix": "function ",
                    "suffix": "() {\n    \n}",
                    "description": "Insert a function declaration"
                },
                {
                    "label": "arrow function",
                    "prefix": "() => {\n    ",
                    "suffix": "\n}",
                    "description": "Insert an arrow function body"
                },
                {
                    "label": "addEventListener",
                    "prefix": "document.addEventListener('click', () => {\n    ",
                    "suffix": "\n});",
                    "description": "Insert a click event listener"
                },
                {
                    "label": "querySelector()",
                    "prefix": "document.querySelector('",
                    "suffix": "')",
                    "description": "Select one element by CSS selector"
                },
                {
                    "label": "querySelectorAll()",
                    "prefix": "document.querySelectorAll('",
                    "suffix": "')",
                    "description": "Select all matching elements"
                },
                {
                    "label": "for...of",
                    "prefix": "for (const item of items) {\n    ",
                    "suffix": "\n}",
                    "description": "Insert a for...of loop"
                },
                {
                    "label": "return",
                    "prefix": "return ",
                    "suffix": ";",
                    "description": "Insert a return statement"
                },
                {
                    "label": "try / catch",
                    "prefix": "try {\n    ",
                    "suffix": "\n} catch (error) {\n    console.error(error);\n}",
                    "description": "Insert error handling"
                },
                {
                    "label": "fetch()",
                    "prefix": "fetch('",
                    "suffix": "').then(response => response.json()).then(data => {\n    \n}).catch(error => console.error(error));",
                    "description": "Insert a basic fetch request chain"
                },
                {
                    "label": "async / await",
                    "prefix": "async function ",
                    "suffix": "() {\n    const response = await fetch('');\n    const data = await response.json();\n    \n}",
                    "description": "Insert an async function using await"
                },
                {
                    "label": "setTimeout()",
                    "prefix": "setTimeout(() => {\n    ",
                    "suffix": "\n}, 1000);",
                    "description": "Insert a delayed callback"
                },
                {
                    "label": "JSON.parse()",
                    "prefix": "JSON.parse('",
                    "suffix": "')",
                    "description": "Parse a JSON string"
                },
                {
                    "label": "JSON.stringify()",
                    "prefix": "JSON.stringify(",
                    "suffix": ")",
                    "description": "Convert a value to JSON text"
                },
                {
                    "label": "===",
                    "prefix": " === ",
                    "suffix": "",
                    "description": "Insert strict equality comparison"
                },
                {
                    "label": "// comment",
                    "prefix": "// ",
                    "suffix": "",
                    "description": "Insert a single-line comment"
                }
            ]
        }),

        jsWords,
        jsMembers,
        snippets: Object.assign((window.EDITOR_INTELLISENSE_DATA || {}).snippets || {}, { js: snippets.js })
    });
})();
