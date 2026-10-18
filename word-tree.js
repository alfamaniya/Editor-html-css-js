(function () {
    'use strict';

    const $ = function (id) { return document.getElementById(id); };
    const treeModal = $('wordTreeModal');
    const detailModal = $('wordDetailModal');
    const openButton = $('btnWordTree');
    const treeContent = $('wordTreeContent');
    const searchInput = $('wordTreeSearch');
    const languageFilter = $('wordTreeLanguage');
    const stats = $('wordTreeStats');
    const detailTitle = $('wordDetailTitle');
    const detailCategory = $('wordDetailCategory');
    const detailDescription = $('wordDetailDescription');
    const detailCode = $('wordDetailCode');
    const detailCopyStatus = $('wordDetailCopyStatus');
    if (!treeModal || !detailModal || !openButton || !treeContent) return;

    const voidTags = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
    const emptyForeignTags = new Set(['path','circle','ellipse','rect','line','polyline','polygon','stop','feBlend','feColorMatrix','feComposite','feConvolveMatrix','feDisplacementMap','feDropShadow','feFlood','feFuncA','feFuncB','feFuncG','feFuncR','feGaussianBlur','feImage','feMergeNode','feMorphology','feOffset','fePointLight','feDistantLight','feSpotLight','feTile','feTurbulence','mspace','mprescripts','mglyph']);
    const booleanAttrs = new Set(['allowfullscreen','async','autofocus','autoplay','checked','controls','default','defer','disabled','formnovalidate','hidden','inert','ismap','loop','multiple','muted','nomodule','novalidate','open','playsinline','readonly','required','reversed','selected','itemscope']);
    const tagDescriptions = {
        a: 'برای ایجاد پیوند به بخش دیگری از صفحه یا یک نشانی اینترنتی استفاده می‌شود.',
        article: 'برای محتوایی مستقل مانند مقاله، خبر یا کارت محتوایی مناسب است.',
        button: 'یک کنترل تعاملی برای اجرای عمل یا ارسال فرم ایجاد می‌کند.',
        div: 'یک ظرف عمومی برای گروه‌بندی محتوا و اعمال استایل است.',
        form: 'عناصر ورودی را برای دریافت و ارسال اطلاعات در یک فرم گروه‌بندی می‌کند.',
        h1: 'عنوان اصلی صفحه یا بخش را مشخص می‌کند.',
        img: 'تصویر را در صفحه نمایش می‌دهد؛ متن جایگزین مناسب برای دسترس‌پذیری مهم است.',
        input: 'یک کنترل ورود اطلاعات ایجاد می‌کند؛ نوع آن با ویژگی type تعیین می‌شود.',
        label: 'عنوان یک کنترل فرم را مشخص می‌کند و می‌تواند آن را به ورودی مرتبط سازد.',
        main: 'محتوای اصلی و منحصربه‌فرد صفحه را مشخص می‌کند.',
        p: 'یک بند متنی می‌سازد.',
        script: 'کد JavaScript یا یک اسکریپت خارجی را به سند پیوند می‌دهد.',
        section: 'محتوا را در یک بخش موضوعی گروه‌بندی می‌کند.',
        span: 'یک ظرف درون‌خطی عمومی برای بخشی از متن یا محتوا است.',
        svg: 'یک بوم گرافیکی برداری برای ترسیم شکل‌ها و مسیرها ایجاد می‌کند.',
        path: 'یک مسیر برداری را در SVG تعریف می‌کند.',
        style: 'قواعد CSS را درون سند قرار می‌دهد.',
        textarea: 'یک ورودی متنی چندخطی ایجاد می‌کند.',
        video: 'یک پخش‌کنندهٔ ویدئو را در صفحه قرار می‌دهد.'
    };
    const attrDescriptions = {
        alt: 'متن جایگزین تصویر را مشخص می‌کند و هنگام بارگذاری ناموفق یا برای فناوری‌های کمکی کاربرد دارد.',
        class: 'یک یا چند نام کلاس به عنصر می‌دهد تا در CSS و JavaScript قابل انتخاب باشد.',
        href: 'نشانی مقصد یک پیوند یا منبع مرتبط را مشخص می‌کند.',
        id: 'شناسه‌ای برای ارجاع یکتا به یک عنصر در سند تعیین می‌کند.',
        rel: 'نوع رابطهٔ منبع پیوندشده با سند فعلی را بیان می‌کند.',
        src: 'نشانی منبعی مانند تصویر، صدا، ویدئو یا اسکریپت را مشخص می‌کند.',
        style: 'قواعد CSS درون‌خطی را روی همان عنصر اعمال می‌کند.',
        type: 'نوع ورودی، دکمه یا منبع مرتبط را بسته به عنصر تعیین می‌کند.',
        value: 'مقدار کنترل فرم یا دادهٔ مرتبط با عنصر را مشخص می‌کند.',
        'aria-label': 'نام دسترس‌پذیری عنصر را برای صفحه‌خوان‌ها فراهم می‌کند.',
        'aria-hidden': 'تعیین می‌کند که عنصر در درخت دسترس‌پذیری پنهان باشد یا نه.'
    };
    const cssDescriptions = {
        color: 'رنگ متن را تعیین می‌کند.',
        'background-color': 'رنگ پس‌زمینهٔ عنصر را مشخص می‌کند.',
        display: 'نحوهٔ مشارکت عنصر در چیدمان صفحه را تعیین می‌کند.',
        flex: 'رشد، جمع‌شدن و اندازهٔ پایهٔ فرزند در Flexbox را کنترل می‌کند.',
        'font-size': 'اندازهٔ قلم متن را تعیین می‌کند.',
        gap: 'فاصلهٔ بین فرزندان یک چیدمان را مشخص می‌کند.',
        height: 'ارتفاع عنصر را تعیین می‌کند.',
        'align-items': 'ترازبندی فرزندان را در محور متقاطع چیدمان کنترل می‌کند.',
        'justify-content': 'نحوهٔ توزیع فرزندان را در محور اصلی چیدمان مشخص می‌کند.',
        margin: 'فاصلهٔ بیرونی عنصر را تنظیم می‌کند.',
        padding: 'فاصلهٔ داخلی بین محتوا و لبهٔ عنصر را تنظیم می‌کند.',
        position: 'روش قرارگیری عنصر را در جریان عادی یا نسبت به یک مرجع تعیین می‌کند.',
        'border-radius': 'میزان گردی گوشه‌های کادر عنصر را مشخص می‌کند.',
        transform: 'عنصر را از نظر جابه‌جایی، چرخش یا مقیاس دگرگون می‌کند.',
        transition: 'تغییر تدریجی ویژگی‌های CSS را در بازهٔ زمانی تعریف می‌کند.',
        width: 'عرض عنصر را تعیین می‌کند.',
        'z-index': 'ترتیب روی‌هم‌افتادن عناصر را کنترل می‌کند.',
        opacity: 'میزان شفافیت عنصر را مشخص می‌کند.',
        'grid-template-columns': 'اندازه و تعداد ستون‌های صریح CSS Grid را تعیین می‌کند.'
    };
    const jsDescriptions = {
        const: 'متغیری با اتصال ثابت تعریف می‌کند؛ مقدار شیء هنوز می‌تواند تغییر کند.',
        let: 'متغیری با دامنهٔ بلوکی تعریف می‌کند که مقدارش می‌تواند دوباره انتساب یابد.',
        function: 'یک تابع قابل فراخوانی تعریف می‌کند.',
        if: 'بخشی از کد را فقط در صورت درست بودن شرط اجرا می‌کند.',
        return: 'اجرای تابع را پایان می‌دهد و در صورت وجود، نتیجه‌ای را برمی‌گرداند.',
        document: 'به سند HTML بارگذاری‌شده در پنجرهٔ فعلی دسترسی می‌دهد.',
        window: 'به محیط سراسری پنجرهٔ مرورگر و APIهای آن دسترسی می‌دهد.',
        console: 'ابزارهای ثبت پیام، هشدار، خطا و بررسی داده‌ها را فراهم می‌کند.',
        fetch: 'یک درخواست شبکه ارسال می‌کند و نتیجه را به شکل Promise برمی‌گرداند.',
        Promise: 'نتیجهٔ یک عملیات ناهمگام را نمایش می‌دهد که ممکن است موفق یا ناموفق شود.',
        Array: 'سازنده و ابزارهای مربوط به آرایه‌ها را فراهم می‌کند.',
        Object: 'ابزارهای کار با شیءها و ویژگی‌های آن‌ها را فراهم می‌کند.',
        Date: 'برای ساخت و کار با تاریخ و زمان استفاده می‌شود.',
        Math: 'توابع و ثابت‌های ریاضی را فراهم می‌کند.',
        JSON: 'ابزارهای تبدیل متن JSON به مقدار JavaScript و برعکس را فراهم می‌کند.',
        localStorage: 'برای ذخیرهٔ رشته‌ها در حافظهٔ پایدار همان مبدأ مرورگر کاربرد دارد.'
    };

    let nodeCounter = 0;
    let model = [];
    let expandAll = false;
    let lastWordButton = null;
    let returnFocusTo = null;

    function asArray(value) { return Array.isArray(value) ? value : (value == null ? [] : [value]); }
    function unique(values) {
        const seen = new Set();
        return values.filter(function (value) {
            const key = String(value);
            if (!key || seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }
    function canonicalTag(tag, data) {
        const tags = asArray(data.htmlTags);
        for (let i = 0; i < tags.length; i++) if (String(tags[i]).toLowerCase() === String(tag).toLowerCase()) return String(tags[i]);
        return String(tag);
    }
    function branch(name, children, meta) {
        const options = meta || {};
        return {
            nodeType: 'branch', id: 'tree-' + (++nodeCounter), name: String(name), children: asArray(children).filter(Boolean),
            language: options.language || '', languageKey: options.languageKey || '', group: options.group || '',
            kind: options.kind || 'group', context: options.context || ''
        };
    }
    function htmlAttributeTag(attribute, data) {
        const preferred = { href:'a', target:'a', rel:'a', src:'img', srcset:'img', alt:'img', type:'input', checked:'input', placeholder:'input', value:'input', method:'form', action:'form', formmethod:'button', formtarget:'button', formaction:'button', for:'label', scope:'th', colspan:'td', rowspan:'td', poster:'video', kind:'track', datetime:'time', coords:'area', shape:'area', loading:'img', preload:'video', accept:'input', capture:'input', fetchpriority:'img', decoding:'img', crossorigin:'script' };
        const byTag = data.htmlAttrsByTag || {};
        const selected = preferred[String(attribute).toLowerCase()];
        if (selected && Array.isArray(byTag[selected]) && byTag[selected].includes(attribute)) return canonicalTag(selected, data);
        const tags = Object.keys(byTag);
        for (let i = 0; i < tags.length; i++) if (Array.isArray(byTag[tags[i]]) && byTag[tags[i]].includes(attribute)) return canonicalTag(tags[i], data);
        return 'div';
    }
    function htmlAttributeValue(attribute) {
        const key = String(attribute).toLowerCase();
        const examples = { class:'example-card', id:'example', href:'#example', src:'image.png', srcset:'image-1.png 1x, image-2.png 2x', alt:'Example image', type:'text', role:'button', dir:'auto', lang:'en', target:'_blank', rel:'noopener noreferrer', width:'320', height:'200', method:'get', formmethod:'get', autocomplete:'off', accept:'image/*', loading:'lazy', decoding:'async', preload:'metadata', fetchpriority:'high' };
        if (examples[key]) return examples[key];
        if (key.startsWith('aria-')) return 'true';
        if (key.startsWith('data-')) return 'example';
        if (key.startsWith('on')) return 'handleEvent()';
        return 'example';
    }
    function htmlTagExample(name) {
        const tag = String(name), key = tag.toLowerCase();
        if (voidTags.has(key)) {
            if (key === 'img') return '<img src="image.png" alt="Example image">';
            if (key === 'input') return '<input type="text" name="example">';
            if (key === 'link') return '<link rel="stylesheet" href="styles.css">';
            if (key === 'meta') return '<meta charset="UTF-8">';
            return '<' + tag + '>';
        }
        if (emptyForeignTags.has(key) || key.startsWith('fe') || key === 'image') return '<' + tag + ' />';
        if (key === 'svg') return '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" /></svg>';
        if (key === 'math') return '<math><mi>x</mi><mo>+</mo><mn>1</mn></math>';
        return '<' + tag + '>Example</' + tag + '>';
    }
    function htmlAttributeExample(name, data) {
        const tag = htmlAttributeTag(name, data);
        const attr = String(name);
        const assignment = booleanAttrs.has(attr.toLowerCase()) ? '' : '="' + htmlAttributeValue(attr) + '"';
        if (attr.toLowerCase() === 'onclick') return '<button type="button" onclick="handleClick()">Click me</button>';
        if (voidTags.has(tag.toLowerCase())) return '<' + tag + ' ' + attr + assignment + '>';
        return '<' + tag + ' ' + attr + assignment + '>Example</' + tag + '>';
    }
    function completeCssValue(value) {
        let text = String(value);
        text = text.replace(/var\(\)/g, 'var(--primary-color)');
        text = text.replace(/url\(\)/g, 'url("image.png")');
        text = text.replace(/rgba?\(\)/g, 'rgb(37 99 235 / 80%)');
        text = text.replace(/hsl\(\)/g, 'hsl(220 80% 55%)');
        text = text.replace(/linear-gradient\(\)/g, 'linear-gradient(135deg, #2563eb, #7c3aed)');
        text = text.replace(/radial-gradient\(\)/g, 'radial-gradient(circle, #60a5fa, #1e3a8a)');
        text = text.replace(/conic-gradient\(\)/g, 'conic-gradient(from 0deg, #2563eb, #7c3aed)');
        text = text.replace(/minmax\(\)/g, 'minmax(0, 1fr)');
        text = text.replace(/repeat\(\)/g, 'repeat(3, 1fr)');
        text = text.replace(/calc\(\)/g, 'calc(100% - 2rem)');
        text = text.replace(/clamp\(\)/g, 'clamp(1rem, 2vw, 2rem)');
        text = text.replace(/fit-content\(\)/g, 'fit-content(24rem)');
        text = text.replace(/color-mix\(\)/g, 'color-mix(in srgb, #2563eb, white)');
        text = text.replace(/translateX\(\)/g, 'translateX(8px)');
        text = text.replace(/translateY\(\)/g, 'translateY(8px)');
        text = text.replace(/scale\(\)/g, 'scale(1.05)');
        text = text.replace(/rotate\(\)/g, 'rotate(5deg)');
        text = text.replace(/blur\(\)/g, 'blur(4px)');
        return text;
    }
    function cssPropertyExample(name, data) {
        const property = String(name);
        if (property.startsWith('--')) return ':root { ' + property + ': initial; }';
        const values = asArray((data.cssValues || {})[property]);
        const value = values.length ? completeCssValue(values[0]) : 'initial';
        return '.example {\n    ' + property + ': ' + value + ';\n}';
    }
    function cssValueExample(property, value) { return '.example {\n    ' + property + ': ' + completeCssValue(value) + ';\n}'; }
    function atRuleExample(name) {
        if (name === '@charset') return '@charset "UTF-8";';
        if (name === '@import') return '@import url("./styles.css");';
        if (name === '@keyframes') return '@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }';
        if (name === '@font-face') return '@font-face { font-family: "Example"; src: url("font.woff2") format("woff2"); }';
        if (name === '@property') return '@property --accent { syntax: "<color>"; inherits: false; initial-value: rebeccapurple; }';
        if (name === '@container') return '@container (min-width: 400px) { .card { display: grid; } }';
        if (name === '@scope') return '@scope (.card) { .title { color: rebeccapurple; } }';
        return name + ' (max-width: 768px) {\n    .example { color: #2563eb; }\n}';
    }
    function pseudoExample(name, isElement) {
        let selector = String(name).replace(/\(\)/g, isElement ? '(.example)' : '(2)');
        if (isElement) selector = selector.replace(/^([^:])/, '::$1');
        return '.example' + (isElement ? '' : ':') + selector + ' {\n    color: #2563eb;\n}';
    }
    function jsWordExample(name) {
        const word = String(name);
        const samples = {
            const:'const value = 1;', let:'let value = 1;', var:'var value = 1;',
            function:'function example() { return true; }',
            if:'if (condition) {\n    console.log("matched");\n}', return:'return value;',
            await:'const data = await fetch("/api/data");', throw:'throw new Error("Something went wrong");',
            try:'try { runTask(); } catch (error) { console.error(error); }', new:'const map = new Map();',
            document:'document.querySelector("#app");', window:'window.location.href;', console:'console.log("Hello");',
            fetch:'fetch("/api/data");', Promise:'Promise.resolve(value).then(console.log);', Array:'Array.isArray(value);',
            Object:'Object.keys(value);', Date:'new Date().toISOString();', Math:'Math.max(10, 20);', JSON:'JSON.stringify(value);',
            localStorage:'localStorage.setItem("key", "value");'
        };
        if (samples[word]) return samples[word];
        if (/^[A-Z_$][\w$]*$/.test(word)) return 'const value = ' + word + ';';
        return 'const ' + word.replace(/[^a-zA-Z0-9_$]/g, '_') + ' = "example";';
    }
    function symbolExample(raw, kind) {
        const label = String(raw.label || raw.insert || '');
        const samples = {
            '=>':'const transform = (value) => value;', '===':'const matches = left === right;', '!==':'const changed = current !== previous;',
            '&&':'if (isReady && hasData) { runTask(); }', '||':'const label = primaryLabel || "Default";', '??':'const count = inputCount ?? 0;',
            '?.':'const city = user?.address?.city;', '...':'const copy = { ...original };', '++':'count++;', '+=':'total += amount;',
            'console.log()':'console.log("Hello");', 'querySelector()':'document.querySelector("#app");',
            'calc()':'.example { width: calc(100% - 2rem); }',
            'linear-gradient()':'.example { background: linear-gradient(135deg, #2563eb, #7c3aed); }',
            'var(--)':':root { --primary-color: #2563eb; }'
        };
        if (samples[label]) return samples[label];
        if (kind === 'html-symbol') return String(raw.prefix || '') + String(raw.suffix || '');
        if (kind === 'css-symbol') return '.example {\n    ' + String(raw.prefix || '') + String(raw.suffix || '') + '\n}';
        if (kind === 'js-symbol') return String(raw.prefix || '') + 'value' + String(raw.suffix || '');
        return String(raw.insert || label);
    }
    function nextWordExample(item) {
        const insertion = String(item.raw.insert || item.name), context = String(item.context || '');
        if (item.language === 'HTML' && context.startsWith('<')) {
            if (context.includes('="')) return context + insertion + '">';
            if (insertion.startsWith(' ')) return context + insertion + '>';
            return context + insertion;
        }
        if (item.language === 'CSS' && context && !context.includes(':') && insertion.startsWith(':')) return context + insertion;
        if (context && (item.language === 'CSS' || item.language === 'JavaScript')) return context + insertion;
        return insertion;
    }
    function exampleFor(item, data) {
        const name = item.name;
        if (item.kind === 'html-element') return htmlTagExample(name);
        if (item.kind === 'html-attribute' || item.kind === 'html-tag-attribute') return htmlAttributeExample(name, data);
        if (item.kind === 'html-abbreviation') return String(item.raw.insert || item.raw.prefix || name);
        if (item.kind.endsWith('-symbol')) return symbolExample(item.raw, item.kind);
        if (item.kind === 'css-property') return cssPropertyExample(name, data);
        if (item.kind === 'css-value') return cssValueExample(item.context, name);
        if (item.kind === 'css-at-rule') return atRuleExample(name);
        if (item.kind === 'css-pseudo-class') return pseudoExample(name, false);
        if (item.kind === 'css-pseudo-element') return pseudoExample(name, true);
        if (item.kind === 'css-function') {
            const fn = name.replace(/\(\)$/, '');
            if (fn === 'url') return '.example { background-image: url("image.png"); }';
            if (fn.includes('gradient')) return '.example { background-image: ' + completeCssValue(name) + '; }';
            if (fn === 'var') return '.example { color: var(--primary-color); }';
            if (fn === 'calc') return '.example { width: calc(100% - 2rem); }';
            return '.example { transform: ' + completeCssValue(name).replace(/\(\)$/, '(8px)') + '; }';
        }
        if (item.kind === 'css-unit') return '.example { width: 12' + name + '; }';
        if (item.kind === 'css-abbreviation') return String(item.raw.insert || name).replace(/:\s*;/g, ': 10px;');
        if (item.kind === 'css-snippet' || item.kind === 'js-snippet') return String(item.raw.insert || name);
        if (item.kind === 'js-word') return jsWordExample(name);
        if (item.kind === 'js-member') return 'const value = ' + item.context + '.' + name + ';';
        if (item.kind === 'next-word') return nextWordExample(item);
        return String(item.raw.insert || name);
    }
    function makeWord(raw, language, languageKey, group, kind, meta, data) {
        const value = raw && typeof raw === 'object' ? raw : { label: String(raw), insert: String(raw) };
        const options = meta || {};
        let name = value.label || value.name || value.word || value.value || value.trigger || value.insert;
        if (kind === 'html-abbreviation' && value.trigger) name = value.trigger;
        name = String(name == null ? '' : name).trim();
        if (!name) return null;
        const item = {
            nodeType:'word', id:'tree-' + (++nodeCounter), name:name, language:language, languageKey:languageKey,
            group:group, kind:kind, context:options.context || '', raw:value
        };
        item.code = exampleFor(item, data);
        return item;
    }
    function wordItems(values, language, languageKey, group, kind, meta, data) {
        const seen = new Set();
        return asArray(values).map(function (raw) {
            const item = makeWord(raw, language, languageKey, group, kind, meta, data);
            if (!item || seen.has(item.name)) return null;
            seen.add(item.name);
            return item;
        }).filter(Boolean);
    }
    function addGroup(list, label, items, language, languageKey, group) {
        if (!items || !items.length) return;
        list.push(branch(label, items, { language:language, languageKey:languageKey, group:group || label }));
    }
    function ruleCandidates(lang, rule, data) {
        const source = rule.pattern && rule.pattern.source ? rule.pattern.source : '';
        if (lang === 'html') {
            const tags = unique(asArray(data.htmlTags).concat(Object.keys(data.htmlAttrsByTag || {})));
            const attributes = unique(asArray(data.htmlAttributes).concat(...Object.values(data.htmlAttrsByTag || {})))
                .filter(function (attribute) { return String(attribute).length > 2 && source.toLowerCase().includes(String(attribute).toLowerCase()); });
            const out = [];
            if (source.includes('<html')) out.push('<html');
            attributes.forEach(function (attribute) {
                tags.forEach(function (tag) { out.push('<' + canonicalTag(tag, data) + ' ' + attribute + '="'); });
            });
            tags.forEach(function (tag) { out.push('<' + canonicalTag(tag, data)); });
            return out;
        }
        if (lang === 'css') {
            const out = asArray(data.cssProperties).concat(asArray(data.cssAtRules));
            Object.keys(data.cssValues || {}).forEach(function (property) {
                out.push(property);
                asArray(data.cssValues[property]).slice(0, 12).forEach(function (value) { out.push(property + ': ' + value + ';'); });
            });
            out.push('@media (prefers-color-scheme: ', '@media (prefers-reduced-motion: ', 'display: flex;');
            return out;
        }
        const words = asArray(data.jsWords), out = words.slice();
        words.forEach(function (word) { out.push('items.' + word); });
        out.push('const value = ', 'let value = ', 'var value = ', 'if (', 'switch (', 'while (', 'for (');
        Object.keys(data.jsMembers || {}).forEach(function (root) {
            asArray(data.jsMembers[root]).forEach(function (member) { out.push(root + '.' + member); });
        });
        return out;
    }
    function sampleForRule(lang, rule, data, index) {
        const candidates = ruleCandidates(lang, rule, data);
        for (let i = 0; i < candidates.length; i++) {
            const context = String(candidates[i]);
            let match = null;
            try { rule.pattern.lastIndex = 0; match = rule.pattern.exec(context); } catch (error) { match = null; }
            if (!match) continue;
            let choices = Array.isArray(rule.items) ? rule.items : [];
            if (typeof rule.create === 'function') {
                try { choices = rule.create(match, context) || []; } catch (error) { choices = []; }
            }
            if (Array.isArray(choices) && choices.length) return { context:context, choices:choices, label:'After ' + context };
        }
        return { context:'', choices:Array.isArray(rule.items) ? rule.items : [], label:'Rule ' + (index + 1) };
    }
    function nextRuleBranch(langKey, data, language) {
        const rules = asArray((data.nextWordRules || {})[langKey]);
        const items = rules.map(function (rule, index) {
            const sample = sampleForRule(langKey, rule, data, index);
            const children = wordItems(sample.choices, language, langKey, 'Next Word Suggestions', 'next-word', { context:sample.context }, data);
            if (!children.length) return makeWord({label:sample.label, insert:sample.context || sample.label}, language, langKey, 'Next Word Rules', 'next-rule', {context:sample.context}, data);
            return branch(sample.label, children, { language:language, languageKey:langKey, group:'Next Word Rules', context:sample.context });
        }).filter(Boolean);
        return branch('Next Word Rules', items, {language:language, languageKey:langKey});
    }

    function buildTree() {
        const data = window.EDITOR_INTELLISENSE_DATA || {};
        nodeCounter = 0;
        const html = [];
        addGroup(html, 'Elements', wordItems(data.htmlTags, 'HTML', 'html', 'Elements', 'html-element', {}, data), 'HTML', 'html');
        addGroup(html, 'Global Attributes', wordItems(data.htmlAttributes, 'HTML', 'html', 'Global Attributes', 'html-attribute', {}, data), 'HTML', 'html');
        const attrGroups = Object.keys(data.htmlAttrsByTag || {}).sort().map(function (tag) {
            const normalized = canonicalTag(tag, data);
            return branch('<' + normalized + '> Attributes', wordItems(data.htmlAttrsByTag[tag], 'HTML', 'html', 'Element-Specific Attributes', 'html-tag-attribute', {context:normalized}, data), {language:'HTML', languageKey:'html', group:'Element-Specific Attributes'});
        });
        addGroup(html, 'Element-Specific Attributes', attrGroups, 'HTML', 'html');
        addGroup(html, 'Emmet Abbreviations', wordItems(data.htmlAbbreviations, 'HTML', 'html', 'Emmet Abbreviations', 'html-abbreviation', {}, data), 'HTML', 'html');
        addGroup(html, 'Quick Symbols', wordItems(data.symbols && data.symbols.html, 'HTML', 'html', 'Quick Symbols', 'html-symbol', {}, data), 'HTML', 'html');
        if (data.nextWordRules && Array.isArray(data.nextWordRules.html)) html.push(nextRuleBranch('html', data, 'HTML'));

        const css = [];
        addGroup(css, 'Properties', wordItems(data.cssProperties, 'CSS', 'css', 'Properties', 'css-property', {}, data), 'CSS', 'css');
        const valueGroups = Object.keys(data.cssValues || {}).sort().map(function (property) {
            return branch(property, wordItems(data.cssValues[property], 'CSS', 'css', 'Property Values', 'css-value', {context:property}, data), {language:'CSS', languageKey:'css', group:'Property Values'});
        });
        addGroup(css, 'Property Values', valueGroups, 'CSS', 'css');
        addGroup(css, 'At-Rules', wordItems(data.cssAtRules, 'CSS', 'css', 'At-Rules', 'css-at-rule', {}, data), 'CSS', 'css');
        addGroup(css, 'Pseudo-Classes', wordItems(data.cssPseudoClasses, 'CSS', 'css', 'Pseudo-Classes', 'css-pseudo-class', {}, data), 'CSS', 'css');
        addGroup(css, 'Pseudo-Elements', wordItems(data.cssPseudoElements, 'CSS', 'css', 'Pseudo-Elements', 'css-pseudo-element', {}, data), 'CSS', 'css');
        addGroup(css, 'Functions', wordItems(data.cssFunctions, 'CSS', 'css', 'Functions', 'css-function', {}, data), 'CSS', 'css');
        addGroup(css, 'Units', wordItems(data.cssUnits, 'CSS', 'css', 'Units', 'css-unit', {}, data), 'CSS', 'css');
        addGroup(css, 'Abbreviations', wordItems(data.cssAbbreviations, 'CSS', 'css', 'Abbreviations', 'css-abbreviation', {}, data), 'CSS', 'css');
        addGroup(css, 'Snippets', wordItems(data.snippets && data.snippets.css, 'CSS', 'css', 'Snippets', 'css-snippet', {}, data), 'CSS', 'css');
        addGroup(css, 'Quick Symbols', wordItems(data.symbols && data.symbols.css, 'CSS', 'css', 'Quick Symbols', 'css-symbol', {}, data), 'CSS', 'css');
        if (data.nextWordRules && Array.isArray(data.nextWordRules.css)) css.push(nextRuleBranch('css', data, 'CSS'));

        const js = [];
        addGroup(js, 'Language & Browser API Words', wordItems(data.jsWords, 'JavaScript', 'js', 'Language & Browser API Words', 'js-word', {}, data), 'JavaScript', 'js');
        const memberGroups = Object.keys(data.jsMembers || {}).sort().map(function (root) {
            return branch(root, wordItems(data.jsMembers[root], 'JavaScript', 'js', 'Members', 'js-member', {context:root}, data), {language:'JavaScript', languageKey:'js', group:'Members'});
        });
        addGroup(js, 'Members & API Methods', memberGroups, 'JavaScript', 'js');
        addGroup(js, 'Snippets', wordItems(data.snippets && data.snippets.js, 'JavaScript', 'js', 'Snippets', 'js-snippet', {}, data), 'JavaScript', 'js');
        addGroup(js, 'Quick Symbols', wordItems(data.symbols && data.symbols.js, 'JavaScript', 'js', 'Quick Symbols', 'js-symbol', {}, data), 'JavaScript', 'js');
        if (data.nextWordRules && Array.isArray(data.nextWordRules.js)) js.push(nextRuleBranch('js', data, 'JavaScript'));

        return [
            branch('HTML', html, {language:'HTML', languageKey:'html', kind:'language'}),
            branch('CSS', css, {language:'CSS', languageKey:'css', kind:'language'}),
            branch('JavaScript', js, {language:'JavaScript', languageKey:'js', kind:'language'})
        ];
    }

    function countWords(node) {
        if (!node) return 0;
        if (node.nodeType === 'word') return 1;
        return asArray(node.children).reduce(function (total, child) { return total + countWords(child); }, 0);
    }
    function countBranches(node) {
        if (!node || node.nodeType === 'word') return 0;
        return 1 + asArray(node.children).reduce(function (total, child) { return total + countBranches(child); }, 0);
    }
    function filterTree(node, query) {
        if (!query) return node;
        const searchable = [node.name, node.language, node.group, node.context, node.kind].join(' ').toLowerCase();
        if (searchable.includes(query)) return node;
        if (node.nodeType === 'word') return null;
        const children = asArray(node.children).map(function (child) { return filterTree(child, query); }).filter(Boolean);
        return children.length ? Object.assign({}, node, {children:children}) : null;
    }
    function renderNode(node, parent, depth, searching) {
        if (node.nodeType === 'word') {
            const button = document.createElement('button');
            button.type = 'button'; button.className = 'word-tree-leaf'; button.textContent = node.name;
            button.title = 'View details and example for ' + node.name;
            button.addEventListener('click', function () { openDetails(node, button); });
            parent.appendChild(button);
            return;
        }
        const details = document.createElement('details');
        details.className = 'word-tree-branch word-tree-depth-' + Math.min(depth, 3);
        details.open = depth === 0 || expandAll || searching;
        const summary = document.createElement('summary');
        const label = document.createElement('span');
        label.textContent = node.name;
        const count = document.createElement('span');
        count.className = 'word-tree-branch-count'; count.textContent = countWords(node).toLocaleString();
        summary.append(label, count); details.appendChild(summary);
        const childContainer = document.createElement('div');
        childContainer.className = 'word-tree-children'; details.appendChild(childContainer);
        let rendered = false;
        function fillChildren() {
            if (rendered) return;
            rendered = true; childContainer.replaceChildren();
            const children = asArray(node.children);
            if (children.every(function (child) { return child.nodeType === 'word'; })) {
                const leafList = document.createElement('div');
                leafList.className = 'word-tree-leaf-list';
                children.forEach(function (child) { renderNode(child, leafList, depth + 1, searching); });
                childContainer.appendChild(leafList);
            } else children.forEach(function (child) { renderNode(child, childContainer, depth + 1, searching); });
        }
        if (details.open) fillChildren();
        details.addEventListener('toggle', function () { if (details.open) fillChildren(); });
        parent.appendChild(details);
    }
    function renderTree() {
        treeContent.replaceChildren();
        const query = String(searchInput.value || '').trim().toLowerCase();
        const selected = languageFilter.value || 'all';
        const visible = model.filter(function (node) { return selected === 'all' || node.languageKey === selected; })
            .map(function (node) { return filterTree(node, query); }).filter(Boolean);
        const total = visible.reduce(function (sum, node) { return sum + countWords(node); }, 0);
        const branches = visible.reduce(function (sum, node) { return sum + countBranches(node); }, 0);
        stats.textContent = total.toLocaleString() + ' clickable entries · ' + branches.toLocaleString() + ' branches';
        if (!visible.length || !total) {
            const empty = document.createElement('p');
            empty.className = 'word-tree-empty';
            empty.textContent = query ? 'No matching entries. Try another search.' : 'No suggestion data is available.';
            treeContent.appendChild(empty); return;
        }
        visible.forEach(function (node) { renderNode(node, treeContent, 0, Boolean(query)); });
    }

    function persianDescription(item) {
        const name = item.name, key = name.toLowerCase();
        if (item.kind === 'html-element') return 'تگ «' + name + '» بخشی از ساختار سند HTML است. ' + (tagDescriptions[key] || 'برای نمایش یا سازمان‌دهی محتوا در صفحه استفاده می‌شود.') + ' نمونهٔ زیر شکل پایهٔ استفاده از این تگ را نشان می‌دهد.';
        if (item.kind === 'html-attribute' || item.kind === 'html-tag-attribute') return 'ویژگی «' + name + '» اطلاعات یا رفتاری را به عنصر HTML اضافه می‌کند. ' + (attrDescriptions[key] || 'معتبر بودن و معنای دقیق آن به نوع عنصر و قواعد HTML وابسته است.') + ' نمونه از یک عنصر مرتبط ساخته شده است.';
        if (item.kind === 'html-abbreviation') return 'این میان‌بر در فهرست پیشنهادهای HTML پروژه تعریف شده است و با پذیرفتن آن، قطعه‌کد آماده درج می‌شود. متن نمونه را با محتوای موردنظر خود هماهنگ کن.';
        if (item.kind.endsWith('-symbol')) return 'این نماد در نوار ابزار سریع ویرایشگر قرار دارد تا درج ساختار یا عملگر مربوط را آسان کند. نمونه، کاربرد رایج آن را نشان می‌دهد.';
        if (item.kind === 'css-property') return 'ویژگی CSS «' + name + '» بخشی از ظاهر یا چیدمان عنصر را کنترل می‌کند. ' + (cssDescriptions[key] || 'مقدار آن باید مطابق قواعد همین ویژگی و مرورگر هدف انتخاب شود.') + ' نمونه از مقادیر موجود در بانک پیشنهادهای پروژه ساخته شده است.';
        if (item.kind === 'css-value') return 'این مقدار از فهرست مقدارهای ویژگی «' + item.context + '» استخراج شده است. آن را در همان ویژگی به کار ببر و پشتیبانی مرورگر هدف را در نظر بگیر.';
        if (item.kind === 'css-at-rule') return 'دستور «' + name + '» یک at-rule در CSS است و برای تعریف رفتارهایی در سطح stylesheet، مانند رسانه، پشتیبانی ویژگی یا بارگذاری منابع، کاربرد دارد.';
        if (item.kind === 'css-pseudo-class') return 'شبه‌کلاس «' + name + '» یک حالت یا وضعیت عنصر را در انتخابگر CSS مشخص می‌کند؛ مانند وضعیت تعاملی، ساختار سند یا وضعیت فرم.';
        if (item.kind === 'css-pseudo-element') return 'شبه‌عنصر «' + name + '» بخشی از عنصر را هدف می‌گیرد یا محتوای مجازی را با CSS قالب‌بندی می‌کند.';
        if (item.kind === 'css-function') return 'تابع «' + name + '» برای محاسبه یا ساخت یک مقدار CSS استفاده می‌شود؛ کاربرد آن به ویژگی‌ای بستگی دارد که مقدارش را می‌پذیرد.';
        if (item.kind === 'css-unit') return 'واحد «' + name + '» برای بیان اندازه یا مقدار عددی در CSS استفاده می‌شود. واحد مناسب را بر اساس نیاز طراحی و رفتار واکنش‌گرا انتخاب کن.';
        if (item.kind === 'css-abbreviation') return 'این میان‌بر برای درج یک اعلان یا الگوی رایج CSS تعریف شده است. مقدار نمونه را پس از درج با نیاز طرح خود جایگزین کن.';
        if (item.kind === 'css-snippet' || item.kind === 'js-snippet') return 'این قطعه‌کد از مجموعهٔ snippetهای ویرایشگر استخراج شده است تا یک الگوی پرکاربرد را سریع درج کند. نام‌ها و مقدارهای نمونه را متناسب با پروژه بررسی کن.';
        if (item.kind === 'js-word') return 'واژه یا شناسهٔ «' + name + '» در بانک پیشنهادهای JavaScript و APIهای مرورگر پروژه وجود دارد. ' + (jsDescriptions[name] || 'معنای دقیق و امکان استفادهٔ آن به نوع شناسه، بافت کد و پشتیبانی محیط اجرا بستگی دارد.') + ' نمونه یک کاربرد کوتاه را نشان می‌دهد.';
        if (item.kind === 'js-member') return 'عضو «' + name + '» در مجموعهٔ «' + item.context + '» از اعضا و APIهای شناخته‌شدهٔ ویرایشگر قرار دارد. این نمونه دسترسی به عضو را نشان می‌دهد؛ برای فراخوانی متد باید آرگومان‌های لازم را وارد کنی.';
        if (item.kind === 'next-word') return 'این گزینه یک ادامهٔ پیشنهادی برای بافت «' + (item.context || 'کد فعلی') + '» است. نمایش آن به متن قبل از مکان‌نما وابسته است؛ فقط زمانی آن را بپذیر که با ساختار کد سازگار باشد.';
        return 'این مورد از داده‌های فعلی ویرایشگر استخراج شده است. کاربرد آن را در بافت درست زبان مربوط بررسی کن.';
    }
    function openDetails(item, button) {
        lastWordButton = button || null;
        detailCategory.textContent = item.language + ' · ' + item.group;
        detailTitle.textContent = item.name;
        detailDescription.textContent = persianDescription(item);
        detailCode.textContent = item.code || item.raw.insert || item.name;
        detailCopyStatus.textContent = '';
        detailModal.hidden = false;
        $('wordDetailClose').focus();
    }
    function closeDetails() {
        detailModal.hidden = true;
        if (lastWordButton && document.contains(lastWordButton)) lastWordButton.focus();
    }
    function openTree() {
        returnFocusTo = document.activeElement;
        treeModal.hidden = false;
        model = buildTree();
        expandAll = false;
        renderTree();
        $('wordTreeClose').focus();
    }
    function closeTree() {
        if (!detailModal.hidden) closeDetails();
        treeModal.hidden = true;
        if (returnFocusTo && document.contains(returnFocusTo)) returnFocusTo.focus();
        else openButton.focus();
    }
    function copyExample() {
        const code = detailCode.textContent || '';
        if (!code) return;
        const fallback = function () {
            const box = document.createElement('textarea');
            box.value = code; box.setAttribute('readonly', ''); box.style.position = 'fixed'; box.style.opacity = '0';
            document.body.appendChild(box); box.select();
            let copied = false;
            try { copied = document.execCommand('copy'); } catch (error) { copied = false; }
            box.remove();
            detailCopyStatus.textContent = copied ? 'Copied.' : 'Copy was not available in this browser.';
        };
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            navigator.clipboard.writeText(code).then(function () { detailCopyStatus.textContent = 'Copied.'; }).catch(fallback);
        } else fallback();
    }

    openButton.addEventListener('click', openTree);
    $('wordTreeRefresh').addEventListener('click', function () { model = buildTree(); renderTree(); });
    $('wordTreeClose').addEventListener('click', closeTree);
    $('wordTreeFooterClose').addEventListener('click', closeTree);
    $('wordDetailClose').addEventListener('click', closeDetails);
    $('wordDetailCopy').addEventListener('click', copyExample);
    searchInput.addEventListener('input', renderTree);
    languageFilter.addEventListener('change', renderTree);
    $('wordTreeExpand').addEventListener('click', function () { expandAll = true; renderTree(); });
    $('wordTreeCollapse').addEventListener('click', function () { expandAll = false; renderTree(); });
    treeModal.addEventListener('click', function (event) { if (event.target === treeModal) closeTree(); });
    detailModal.addEventListener('click', function (event) { if (event.target === detailModal) closeDetails(); });
    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;
        if (!detailModal.hidden) { event.stopPropagation(); closeDetails(); }
        else if (!treeModal.hidden) { event.stopPropagation(); closeTree(); }
    });
})();