// Suggested entries: 662 (JavaScript words, members, and snippets; contextual duplicates included)
(function () {
    'use strict';
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
    };
    Object.keys(jsMembers).forEach(function (key) { jsMembers[key] = jsMembers[key].split(/\s+/); });
    window.EDITOR_INTELLISENSE_DATA = Object.assign(window.EDITOR_INTELLISENSE_DATA || {}, { jsWords, jsMembers, snippets: Object.assign((window.EDITOR_INTELLISENSE_DATA || {}).snippets || {}, { js: snippets.js }) });
})();
