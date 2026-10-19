(function (global) {
    'use strict';

    // Source templates for the editor's starter project live here, not in script.js.
    const html = '<main class="interactive-gallery">\n' +
        '  <header class="gallery-heading"><div><p>HTML · CSS · JAVASCRIPT</p><h1>200 Interactive Tag Samples</h1><span>Each card contains a working element and its matching code.</span></div><strong id="galleryCount">200 examples</strong></header>\n' +
        '  <section class="tag-grid" id="tagGrid" aria-label="200 interactive HTML tag examples"></section>\n' +
        '</main>';

    const css = '* { box-sizing: border-box; }\n' +
        'body { margin: 0; padding: 8px; background: #f2f5f3; color: #1c302b; font: 12px/1.4 Arial, sans-serif; }\n' +
        '.interactive-gallery { max-width: 1800px; margin: auto; }\n' +
        '.gallery-heading { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 8px; padding: 9px 11px; border: 1px solid #c7d7d0; border-radius: 8px; background: #fff; }\n' +
        '.gallery-heading p { margin: 0 0 3px; color: #327260; font-size: 8px; font-weight: 700; letter-spacing: .12em; }\n' +
        '.gallery-heading h1 { margin: 0; font-size: 17px; }\n' +
        '.gallery-heading span { display: block; margin-top: 3px; color: #60736c; font-size: 10px; }\n' +
        '.gallery-heading strong { flex: 0 0 auto; padding: 5px 8px; border-radius: 20px; background: #e1f1e9; color: #245b49; font-size: 9px; }\n' +
        '.tag-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 150px), 1fr)); gap: 6px; align-items: stretch; }\n' +
        '.tag-card { position: relative; z-index: 0; min-width: 0; overflow: hidden; padding: 7px; border: 1px solid var(--edge); border-radius: 7px; background: var(--wash); box-shadow: 0 1px 3px #183b2b12; transition: transform .18s ease, box-shadow .18s ease, background-color .18s ease, border-color .18s ease, filter .18s ease; }\n' +
        '.tag-card:hover { z-index: 2; }\n' +
        '.tag-description { margin: 5px 0 0; padding: 4px 5px; border-radius: 4px; background: #ffffffb8; color: #344f46; direction: rtl; text-align: right; font: 9px/1.75 Tahoma, sans-serif; overflow-wrap: anywhere; }\n' +
        '@media (prefers-reduced-motion: reduce) { .tag-card { transition: none; } }\n' +
        '.tag-card h2 { margin: 0 0 5px; padding-bottom: 4px; border-bottom: 1px solid var(--edge); color: var(--ink); font-size: 10px; }\n' +
        '.tag-demo { display: flex; min-height: 42px; align-items: center; justify-content: center; overflow: hidden; padding: 5px; border-radius: 4px; background: #ffffffa8; }\n' +
        '.tag-demo > * { max-width: 100%; }\n' +
        '.tag-demo button, .tag-demo input, .tag-demo select, .tag-demo textarea { font: inherit; }\n' +
        '.tag-demo button { padding: 4px 7px; border: 1px solid var(--ink); border-radius: var(--radius); background: var(--accent); color: white; cursor: pointer; }\n' +
        '.tag-demo button:focus-visible, .tag-demo input:focus-visible, .tag-demo a:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }\n' +
        '.tag-demo input, .tag-demo select, .tag-demo textarea { width: 100%; min-width: 0; padding: 4px; border: 1px solid var(--edge); border-radius: var(--radius); background: white; color: #21342e; }\n' +
        '.tag-demo img { width: 46px; height: 36px; object-fit: cover; border-radius: var(--radius); }\n' +
        '.tag-demo progress, .tag-demo meter { width: 100%; }\n' +
        '.tag-code { margin-top: 5px; padding-top: 4px; border-top: 1px solid var(--edge); }\n' +
        '.tag-code b { display: block; margin-bottom: 2px; color: var(--ink); font-size: 7px; letter-spacing: .08em; }\n' +
        '.tag-code code { display: block; overflow-wrap: anywhere; color: #22352f; font: 8px/1.35 ui-monospace, Consolas, monospace; white-space: pre-wrap; }\n' +
        '.tag-result { min-height: 10px; margin: 4px 0 0; color: var(--ink); font-size: 9px; overflow-wrap: anywhere; }\n' +
        '.tag-demo .demo-pill { display: inline-block; padding: 3px 6px; border-radius: 99px; background: var(--accent); color: white; }\n' +
        '.tag-demo .demo-panel { padding: 5px; border: 1px dashed var(--edge); border-radius: var(--radius); }\n' +
        '.tag-demo .demo-large { font-size: 16px; font-weight: 700; }\n' +
        '.tag-demo .demo-small { font-size: 9px; }\n' +
        '.tag-demo .demo-color { width: 27px; height: 27px; padding: 0; border: 0; border-radius: 50%; }\n' +
        '.tag-card.is-active .tag-demo { background: var(--active-wash); }\n' +
        '@media (max-width: 480px) { body { padding: 5px; } .gallery-heading { align-items: flex-start; } .gallery-heading h1 { font-size: 15px; } .tag-grid { grid-template-columns: repeat(auto-fill, minmax(min(100%, 132px), 1fr)); gap: 4px; } .tag-card { padding: 5px; } }\n';

    // Each definition uses a real HTML element and a named behavior. Variations in
    // spacing, radius, color, typography, and border are applied per card.
    const examples = [
        { tag:'div', label:'Container', markup:'<div class="demo-panel">A small panel</div>', action:'toggle', js:'Toggle this panel style' },
        { tag:'p', label:'Paragraph', markup:'<p class="demo-small">A short paragraph</p>', action:'text', js:'Change paragraph text' },
        { tag:'h2', label:'Heading', markup:'<h2 class="demo-large">Example title</h2>', action:'text', js:'Change the heading' },
        { tag:'button', label:'Button', markup:'<button type="button">Click me</button>', action:'count', js:'Count button clicks' },
        { tag:'a', label:'Link', markup:'<a href="#tagGrid">Jump to examples</a>', action:'link', js:'Show link destination' },
        { tag:'span', label:'Inline label', markup:'<span class="demo-pill">Label</span>', action:'toggle', js:'Toggle label highlight' },
        { tag:'strong', label:'Strong text', markup:'<strong>Important</strong>', action:'text', js:'Change emphasis text' },
        { tag:'em', label:'Emphasis', markup:'<em>Emphasized text</em>', action:'text', js:'Change emphasized text' },
        { tag:'mark', label:'Marked text', markup:'<mark>Marked</mark>', action:'toggle', js:'Toggle marked background' },
        { tag:'small', label:'Small text', markup:'<small>Fine print</small>', action:'text', js:'Change fine print' },
        { tag:'code', label:'Code', markup:'<code>const n = 1;</code>', action:'copy', js:'Copy this sample text' },
        { tag:'pre', label:'Preformatted', markup:'<pre>line 1\\nline 2</pre>', action:'text', js:'Change preformatted text' },
        { tag:'blockquote', label:'Quote', markup:'<blockquote>Short quote</blockquote>', action:'text', js:'Change the quotation' },
        { tag:'ul', label:'Unordered list', markup:'<ul><li>Alpha</li><li>Beta</li></ul>', action:'add', js:'Add a list item' },
        { tag:'ol', label:'Ordered list', markup:'<ol><li>First</li><li>Second</li></ol>', action:'add', js:'Append a numbered item' },
        { tag:'li', label:'List item', markup:'<ul><li>Sample item</li></ul>', action:'text', js:'Change the list item' },
        { tag:'dl', label:'Description list', markup:'<dl><dt>Term</dt><dd>Definition</dd></dl>', action:'text', js:'Change the definition' },
        { tag:'hr', label:'Divider', markup:'<hr>', action:'toggle', js:'Toggle divider appearance' },
        { tag:'br', label:'Line break', markup:'<span>First line<br>Second line</span>', action:'text', js:'Change both lines' },
        { tag:'button', label:'Color button', markup:'<button type="button" class="demo-color" aria-label="Change color">●</button>', action:'color', js:'Cycle the card accent color' },
        { tag:'input', label:'Text input', markup:'<input type="text" value="Edit me" aria-label="Text sample">', action:'read', js:'Read the input value' },
        { tag:'input', label:'Checkbox', markup:'<label><input type="checkbox" checked> Enabled</label>', action:'read', js:'Report checked state' },
        { tag:'input', label:'Range slider', markup:'<input type="range" min="0" max="100" value="35" aria-label="Range">', action:'read', js:'Read slider value' },
        { tag:'input', label:'Color picker', markup:'<input type="color" value="#267c63" aria-label="Color">', action:'read', js:'Show selected color' },
        { tag:'textarea', label:'Textarea', markup:'<textarea rows="2" aria-label="Notes">Write here</textarea>', action:'read', js:'Count entered characters' },
        { tag:'select', label:'Select menu', markup:'<select aria-label="Choose"><option>Apple</option><option>Orange</option><option>Grape</option></select>', action:'read', js:'Show selected option' },
        { tag:'option', label:'Option', markup:'<select aria-label="Option demo"><option>Option A</option><option>Option B</option></select>', action:'read', js:'Report the selected option' },
        { tag:'label', label:'Form label', markup:'<label><input type="checkbox"> Accept</label>', action:'read', js:'Report acceptance state' },
        { tag:'form', label:'Form', markup:'<form><input aria-label="Name" placeholder="Name"><button>Send</button></form>', action:'form', js:'Validate and report the form' },
        { tag:'fieldset', label:'Fieldset', markup:'<fieldset><legend>Choice</legend><label><input type="radio" name="r"> A</label></fieldset>', action:'read', js:'Report the radio selection' },
        { tag:'output', label:'Output', markup:'<output>0</output>', action:'count', js:'Increase the output number' },
        { tag:'progress', label:'Progress', markup:'<progress max="100" value="30"></progress>', action:'progress', js:'Advance progress by 10%' },
        { tag:'meter', label:'Meter', markup:'<meter min="0" max="100" value="60"></meter>', action:'progress', js:'Change meter value' },
        { tag:'details', label:'Details', markup:'<details><summary>More info</summary><p>Hidden details</p></details>', action:'toggle', js:'Open or close details' },
        { tag:'summary', label:'Summary', markup:'<details open><summary>Click summary</summary><p>Details content</p></details>', action:'toggle', js:'Toggle its details section' },
        { tag:'img', label:'Image', markup:'<img alt="Sample gradient" src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2760%27 height=%2740%27%3E%3Crect width=%2760%27 height=%2740%27 fill=%27%23267c63%27/%3E%3C/svg%3E">', action:'image', js:'Switch image tint' },
        { tag:'figure', label:'Figure', markup:'<figure><span class="demo-pill">Figure</span><figcaption>Caption</figcaption></figure>', action:'text', js:'Change the figure caption' },
        { tag:'figcaption', label:'Caption', markup:'<figure><span>Preview</span><figcaption>Caption text</figcaption></figure>', action:'text', js:'Edit the caption' },
        { tag:'time', label:'Time', markup:'<time>12:30</time>', action:'time', js:'Show the current time' },
        { tag:'abbr', label:'Abbreviation', markup:'<abbr title="HyperText Markup Language">HTML</abbr>', action:'text', js:'Reveal the full phrase' },
        { tag:'data', label:'Data value', markup:'<data value="42">Forty-two</data>', action:'text', js:'Show the machine-readable value' },
        { tag:'meter', label:'Score meter', markup:'<meter min="0" max="10" value="7">7/10</meter>', action:'progress', js:'Increase the score' },
        { tag:'table', label:'Table', markup:'<table><tbody><tr><td>A</td><td>B</td></tr></tbody></table>', action:'add', js:'Add a table cell' },
        { tag:'caption', label:'Table caption', markup:'<table><caption>Scores</caption><tbody><tr><td>8</td></tr></tbody></table>', action:'text', js:'Change the caption' },
        { tag:'thead', label:'Table head', markup:'<table><thead><tr><th>Item</th></tr></thead><tbody><tr><td>Pen</td></tr></tbody></table>', action:'add', js:'Add a table row' },
        { tag:'tbody', label:'Table body', markup:'<table><tbody><tr><td>Row one</td></tr></tbody></table>', action:'add', js:'Append a row' },
        { tag:'tfoot', label:'Table foot', markup:'<table><tbody><tr><td>Subtotal</td></tr></tbody><tfoot><tr><td>Total</td></tr></tfoot></table>', action:'text', js:'Change the total label' },
        { tag:'audio', label:'Audio element', markup:'<audio controls aria-label="Audio sample"></audio>', action:'toggle', js:'Show or hide audio controls' },
        { tag:'video', label:'Video element', markup:'<video controls width="90" aria-label="Video sample"></video>', action:'toggle', js:'Show or hide video controls' },
        { tag:'canvas', label:'Canvas', markup:'<canvas width="90" height="32" aria-label="Canvas drawing"></canvas>', action:'canvas', js:'Draw a new pattern' },
        { tag:'svg', label:'SVG', markup:'<svg viewBox="0 0 80 32" width="80" height="32" role="img" aria-label="Circle"><circle cx="16" cy="16" r="10" fill="#267c63"/></svg>', action:'color', js:'Change the SVG color' },
        { tag:'iframe', label:'Iframe', markup:'<iframe title="Tiny preview" srcdoc="<p>Preview</p>"></iframe>', action:'toggle', js:'Toggle the embedded preview' },
        { tag:'dialog', label:'Dialog', markup:'<dialog open>Small dialog</dialog>', action:'toggle', js:'Open or close the dialog' },
        { tag:'nav', label:'Navigation', markup:'<nav><a href="#tagGrid">Examples</a></nav>', action:'link', js:'Show navigation target' },
        { tag:'header', label:'Header', markup:'<header><strong>Card header</strong></header>', action:'text', js:'Change header text' },
        { tag:'footer', label:'Footer', markup:'<footer>Footer note</footer>', action:'text', js:'Change footer text' },
        { tag:'main', label:'Main landmark', markup:'<main><span>Main content</span></main>', action:'text', js:'Change main content' },
        { tag:'section', label:'Section', markup:'<section class="demo-panel">Section block</section>', action:'toggle', js:'Highlight the section' },
        { tag:'article', label:'Article', markup:'<article class="demo-panel">Article sample</article>', action:'text', js:'Change article text' },
        { tag:'aside', label:'Aside', markup:'<aside>Side note</aside>', action:'text', js:'Change side note' },
        { tag:'address', label:'Address', markup:'<address>Example Street</address>', action:'text', js:'Change address text' },
        { tag:'sup', label:'Superscript', markup:'<span>x<sup>2</sup></span>', action:'text', js:'Change exponent' },
        { tag:'sub', label:'Subscript', markup:'<span>H<sub>2</sub>O</span>', action:'text', js:'Change subscript value' },
        { tag:'del', label:'Deleted text', markup:'<del>Old value</del>', action:'text', js:'Change deleted text' },
        { tag:'ins', label:'Inserted text', markup:'<ins>New value</ins>', action:'text', js:'Change inserted text' },
        { tag:'s', label:'Strikethrough', markup:'<s>Old price</s>', action:'toggle', js:'Toggle strike styling' },
        { tag:'u', label:'Underline', markup:'<u>Underlined</u>', action:'toggle', js:'Toggle underline styling' },
        { tag:'b', label:'Bold', markup:'<b>Bold sample</b>', action:'toggle', js:'Toggle bold styling' },
        { tag:'i', label:'Italic', markup:'<i>Italic sample</i>', action:'toggle', js:'Toggle italic styling' },
        { tag:'q', label:'Inline quote', markup:'<q>Short quote</q>', action:'text', js:'Change the quote' },
        { tag:'cite', label:'Citation', markup:'<cite>Reference title</cite>', action:'text', js:'Change citation text' },
        { tag:'dfn', label:'Definition', markup:'<dfn>Term</dfn>', action:'text', js:'Change defined term' },
        { tag:'kbd', label:'Keyboard', markup:'<kbd>Ctrl + S</kbd>', action:'text', js:'Change shortcut text' },
        { tag:'samp', label:'Sample output', markup:'<samp>Saved!</samp>', action:'text', js:'Change output message' },
        { tag:'var', label:'Variable', markup:'<var>total</var>', action:'text', js:'Change variable name' },
        { tag:'ruby', label:'Ruby annotation', markup:'<ruby>漢<rt>kan</rt></ruby>', action:'text', js:'Change annotation' },
        { tag:'bdi', label:'Bi-directional text', markup:'<bdi>user-123</bdi>', action:'text', js:'Change isolated text' },
        { tag:'bdo', label:'Text direction', markup:'<bdo dir="rtl">ABC 123</bdo>', action:'toggle', js:'Switch text direction' },
        { tag:'wbr', label:'Word break', markup:'<span>super<wbr>longword</span>', action:'text', js:'Change the sample word' },
        { tag:'picture', label:'Picture', markup:'<picture><img alt="Color swatch" src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2740%27 height=%2730%27%3E%3Crect width=%2740%27 height=%2730%27 fill=%27%23cf7547%27/%3E%3C/svg%3E"></picture>', action:'image', js:'Switch picture color' },
        { tag:'source', label:'Source', markup:'<video controls width="80"><source type="video/mp4"></video>', action:'toggle', js:'Toggle media control visibility' },
        { tag:'track', label:'Track', markup:'<video controls width="80"><track kind="captions" label="English"></video>', action:'toggle', js:'Toggle media controls' },
        { tag:'map', label:'Image map', markup:'<img usemap="#samplemap" alt="Map demo" width="50" height="32" src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2750%27 height=%2732%27%3E%3Crect width=%2750%27 height=%2732%27 fill=%27%23a4d8c5%27/%3E%3C/svg%3E"><map name="samplemap"><area shape="rect" coords="0,0,50,32" href="#tagGrid" alt="Go"></map>', action:'link', js:'Report image-map action' },
        { tag:'input', label:'Email input', markup:'<input type="email" value="a@example.com" aria-label="Email">', action:'read', js:'Validate email format' },
        { tag:'input', label:'Number input', markup:'<input type="number" value="7" min="0" max="20" aria-label="Number">', action:'read', js:'Read the numeric value' },
        { tag:'input', label:'Date input', markup:'<input type="date" aria-label="Date">', action:'read', js:'Show chosen date' },
        { tag:'input', label:'Search input', markup:'<input type="search" placeholder="Search" aria-label="Search">', action:'read', js:'Show search text' },
        { tag:'input', label:'Password input', markup:'<input type="password" value="sample" aria-label="Password">', action:'read', js:'Report password length only' },
        { tag:'input', label:'Radio input', markup:'<label><input type="radio" name="choice" value="A" checked> A</label>', action:'read', js:'Report radio state' },
        { tag:'input', label:'File input', markup:'<input type="file" aria-label="Choose file">', action:'read', js:'Show selected file name' },
        { tag:'button', label:'Reset button', markup:'<button type="button">Reset demo</button>', action:'reset', js:'Restore this card' },
        { tag:'button', label:'Disable button', markup:'<button type="button">Toggle disabled</button>', action:'disable', js:'Toggle button disabled state' },
        { tag:'button', label:'Hide button', markup:'<button type="button">Hide element</button>', action:'hide', js:'Hide or restore the sample' },
        { tag:'button', label:'Append button', markup:'<button type="button">Add text</button>', action:'add', js:'Append a small text node' },
        { tag:'button', label:'Focus button', markup:'<button type="button">Focus input</button>', action:'focus', js:'Move focus to an input' },
        { tag:'button', label:'Counter button', markup:'<button type="button">+1</button>', action:'count', js:'Increase the counter' },
        { tag:'button', label:'Toggle button', markup:'<button type="button" aria-pressed="false">Toggle state</button>', action:'pressed', js:'Toggle aria-pressed' },
        { tag:'button', label:'Confirm button', markup:'<button type="button">Confirm</button>', action:'confirm', js:'Show a confirmation message' },
        { tag:'button', label:'Random button', markup:'<button type="button">Random number</button>', action:'random', js:'Generate a random number' },
        { tag:'button', label:'Clock button', markup:'<button type="button">Show time</button>', action:'time', js:'Show the current time' },
        { tag:'button', label:'Copy button', markup:'<button type="button">Copy sample</button>', action:'copy', js:'Copy the example label' },
        { tag:'progress', label:'Upload progress', markup:'<progress max="100" value="10"></progress>', action:'progress', js:'Increase progress value' },
        { tag:'output', label:'Calculation output', markup:'<output>12</output>', action:'calculate', js:'Multiply the current number by two' },
        { tag:'select', label:'Language select', markup:'<select aria-label="Language"><option>HTML</option><option>CSS</option><option>JavaScript</option></select>', action:'read', js:'Show chosen language' },
        { tag:'textarea', label:'Message box', markup:'<textarea rows="2" aria-label="Message" placeholder="Message"></textarea>', action:'read', js:'Count message characters' },
        { tag:'details', label:'Disclosure', markup:'<details><summary>Open details</summary><p>Extra information</p></details>', action:'toggle', js:'Toggle the details section' },
        { tag:'ol', label:'Dynamic list', markup:'<ol><li>One</li></ol>', action:'add', js:'Append a new list item' },
        { tag:'table', label:'Data table', markup:'<table><tbody><tr><th>Key</th><td>Value</td></tr></tbody></table>', action:'add', js:'Add another data row' },
        { tag:'img', label:'Image swap', markup:'<img alt="Swatch" src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2740%27 height=%2730%27%3E%3Crect width=%2740%27 height=%2730%27 fill=%27%23267c63%27/%3E%3C/svg%3E">', action:'image', js:'Swap the image swatch' },
        { tag:'div', label:'Flex container', markup:'<div style="display:flex;gap:4px"><span>A</span><span>B</span></div>', action:'toggle', js:'Change the container layout' },
        { tag:'div', label:'Grid container', markup:'<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px"><span>A</span><span>B</span></div>', action:'toggle', js:'Change grid spacing' },
        { tag:'span', label:'Badge', markup:'<span class="demo-pill">NEW</span>', action:'text', js:'Change badge label' },
        { tag:'progress', label:'Task status', markup:'<progress max="5" value="3"></progress>', action:'progress', js:'Advance the task status' },
        { tag:'meter', label:'Battery meter', markup:'<meter min="0" max="100" value="80"></meter>', action:'progress', js:'Decrease the meter level' }
    ];

    const js = '(function () {\n' +
        '  const grid = document.getElementById("tagGrid");\n' +
        '  const count = document.getElementById("galleryCount");\n' +
        '  const examples = ' + JSON.stringify(examples) + ';\n' +
        '  const colors = ["#267c63", "#356ac3", "#b45b38", "#8a58a6", "#9a7625", "#287d91"];\n' +
        '  const dynamicStyles = document.createElement("style"); document.head.appendChild(dynamicStyles);\n' +
        '  const tagNamesFa = { div:"بخش", p:"پاراگراف", h1:"تیتر", h2:"تیتر", button:"دکمه", a:"پیوند", span:"متن درون‌خطی", strong:"متن مهم", em:"متن تأکیدی", mark:"متن برجسته", small:"متن ریز", code:"کد", pre:"متن ازپیش‌قالب‌بندی‌شده", blockquote:"نقل‌قول", ul:"فهرست نشانه‌دار", ol:"فهرست شماره‌دار", li:"مورد فهرست", dl:"فهرست تعریفی", hr:"خط جداکننده", br:"شکست خط", input:"فیلد ورودی", textarea:"کادر متن", select:"فهرست انتخاب", option:"گزینه", label:"برچسب", form:"فرم", fieldset:"گروه فیلدها", output:"خروجی", progress:"نوار پیشرفت", meter:"نشانگر مقدار", details:"بخش جزئیات بازشو", summary:"عنوان جزئیات", img:"تصویر", figure:"شکل یا تصویر", figcaption:"شرح تصویر", time:"زمان", abbr:"مخفف", data:"داده", table:"جدول", caption:"عنوان جدول", thead:"سرجدول", tbody:"بدنه جدول", tfoot:"پایان جدول", audio:"عنصر صدا", video:"عنصر ویدئو", canvas:"بوم رسم", svg:"گرافیک SVG", iframe:"قاب توکار", dialog:"گفت‌وگو", nav:"ناوبری", header:"سربرگ", footer:"پابرگ", main:"محتوای اصلی", section:"بخش محتوا", article:"مقاله", aside:"محتوای جانبی", address:"نشانی", sup:"بالانویس", sub:"زیرنویس", del:"متن حذف‌شده", ins:"متن افزوده", s:"متن خط‌خورده", u:"متن زیرخط‌دار", b:"متن پررنگ", i:"متن مورب", q:"نقل‌قول کوتاه", cite:"ارجاع", dfn:"اصطلاح تعریف‌شده", kbd:"کلید صفحه‌کلید", samp:"نمونه خروجی", var:"متغیر", ruby:"نشانه‌گذاری روبی", bdi:"متن با جهت مستقل", bdo:"متن با جهت اجباری", wbr:"محل مجاز شکست واژه", picture:"تصویر واکنش‌گرا", source:"منبع رسانه", track:"زیرنویس رسانه", map:"نقشه تصویری", area:"ناحیه قابل کلیک" };\n' +
        '  const actionHelpFa = { toggle:"ظاهر یا وضعیت نمایشی نمونه را تغییر بده", text:"متن نمونه را تغییر بده", count:"شمارنده نمونه را افزایش بده", link:"مقصد پیوند را نمایش بده", copy:"متن نمونه را در گزارش کارت نشان بده", read:"مقدار فعلی کنترل را گزارش کن", form:"ورودی فرم را بررسی و نتیجه را نمایش بده", progress:"مقدار نشانگر را تغییر بده", image:"رنگ تصویر را تغییر بده", canvas:"روی بوم یک الگوی رنگی رسم کن", add:"یک مورد، ردیف یا متن به نمونه اضافه کن", time:"زمان فعلی را نمایش بده", reset:"کارت را به حالت اولیه برگردان", disable:"کنترل را فعال یا غیرفعال کن", hide:"عنصر نمونه را مخفی یا دوباره نمایان کن", focus:"تمرکز را به ورودی منتقل کن", pressed:"وضعیت فشرده‌بودن دکمه را تغییر بده", confirm:"پیام تأیید را نمایش بده", random:"یک عدد تصادفی نمایش بده", calculate:"مقدار عددی را دو برابر کن" };\n' +
        '  const hoverHelpFa = ["کارت کمی بالا می‌آید و سایه‌اش پررنگ‌تر می‌شود","کارت کمی بزرگ‌تر می‌شود و سایه می‌گیرد","کارت اندکی می‌چرخد و حاشیه‌اش برجسته می‌شود","رنگ پس‌زمینه تغییر می‌کند و کارت بالا می‌آید","یک قاب داخلی رنگی ظاهر می‌شود","رنگ‌ها زنده‌تر و کارت کمی بزرگ‌تر می‌شود","کارت به کنار حرکت می‌کند و سایه می‌گیرد","دور کارت یک خط بیرونی رنگی دیده می‌شود","پس‌زمینه روشن‌تر و هاله‌ای رنگی ظاهر می‌شود","کارت بالا می‌آید و کمی می‌چرخد"];\n' +
        '  function escapeHTML(value) { return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }\n' +
        '  function makeCard(example, index) {\n' +
        '    const card = document.createElement("article"); card.className = "tag-card";\n' +
        '    const accent = colors[index % colors.length]; const radius = 3 + (index % 9); const pad = 4 + (index % 5); const cardClass = "card-" + (index + 1);\n' +
        '    const hoverEffects = ["transform: translateY(-3px); box-shadow: 0 7px 16px " + accent + "35;", "transform: scale(1.025); box-shadow: 0 5px 14px " + accent + "44;", "transform: rotate(-.6deg) translateY(-2px); border-color: " + accent + ";", "background-color: " + accent + "20; transform: translateY(-2px);", "box-shadow: inset 0 0 0 2px " + accent + "88; transform: translateY(-2px);", "filter: saturate(1.3); transform: scale(1.015);", "transform: translateX(2px); border-color: " + accent + "; box-shadow: 0 4px 12px " + accent + "35;", "outline: 2px solid " + accent + "; outline-offset: 1px;", "background-color: " + accent + "22; box-shadow: 0 0 0 3px " + accent + "22;", "transform: translateY(-4px) rotate(.4deg); box-shadow: 0 9px 16px " + accent + "30;"]; const hoverEffect = hoverEffects[index % hoverEffects.length];\n' +
        '    card.classList.add(cardClass); card.style.setProperty("--accent", accent); card.style.setProperty("--edge", accent + "88"); card.style.setProperty("--ink", accent); card.style.setProperty("--wash", accent + "18"); card.style.setProperty("--active-wash", accent + "35"); card.style.setProperty("--radius", radius + "px"); dynamicStyles.sheet.insertRule("." + cardClass + " { padding: " + pad + "px; border-radius: " + radius + "px; --accent: " + accent + "; }"); dynamicStyles.sheet.insertRule("." + cardClass + ":hover { z-index: 2; " + hoverEffect + " }");\n' +
        '    const title = document.createElement("h2"); title.textContent = String(index + 1).padStart(3, "0") + " · <" + example.tag + "> — " + example.label; card.appendChild(title);\\n' +
        '    const demo = document.createElement("div"); demo.className = "tag-demo"; demo.innerHTML = example.markup; card.appendChild(demo);\n' +
        '    const description = document.createElement("p"); description.className = "tag-description"; description.lang = "fa"; description.dir = "rtl"; description.textContent = "این کارت نمونه‌ای از تگ «" + (tagNamesFa[example.tag] || example.tag) + "» است. " + (actionHelpFa[example.action] || "رفتار نمونه را امتحان کن") + ". با رفتن نشانگر روی کارت، " + hoverHelpFa[index % hoverHelpFa.length] + "."; card.appendChild(description);\n' +
        '    const result = document.createElement("p"); result.className = "tag-result"; result.setAttribute("aria-live", "polite"); card.appendChild(result);\n' +
        '    const code = document.createElement("div"); code.className = "tag-code";\n' +
        '    const htmlLabel = document.createElement("b"); htmlLabel.textContent = "HTML"; code.appendChild(htmlLabel); const htmlCode = document.createElement("code"); htmlCode.textContent = example.markup; code.appendChild(htmlCode);\n' +
        '    const cssLabel = document.createElement("b"); cssLabel.textContent = "CSS · HOVER"; code.appendChild(cssLabel); const cssCode = document.createElement("code"); cssCode.textContent = "." + cardClass + ":hover { z-index: 2; " + hoverEffect + " }"; code.appendChild(cssCode);\n' +
        '    const jsLabel = document.createElement("b"); jsLabel.textContent = "JAVASCRIPT"; code.appendChild(jsLabel); const jsCode = document.createElement("code"); jsCode.textContent = "/* " + example.js + " */\\ncard.addEventListener(\\"click\\", () => act(card))"; code.appendChild(jsCode); card.appendChild(code);\n' +
        '    card._demo = demo; card._result = result; card._example = example; card.addEventListener("click", () => act(card)); return card;\n' +
        '  }\n' +
        '  function act(card) {\n' +
        '    const demo = card._demo, result = card._result, example = card._example; const target = demo.querySelector("button, input, textarea, select, output, progress, meter, details, summary, img, canvas, svg, a, p, h2, span, li, td, figcaption, time, abbr, data, code, pre, blockquote, address, footer, header, main, section, article, aside, q, cite, dfn, kbd, samp, var, ruby, bdi, bdo, del, ins, s, u, b, i, mark, small, strong, em, sup, sub, hr, audio, video, iframe, dialog, fieldset, form, nav, figure, table, dl, ul, ol");\n' +
        '    const firstInput = demo.querySelector("input, textarea, select"); const button = demo.querySelector("button"); const current = target || demo.firstElementChild || demo;\n' +
        '    switch (example.action) {\n' +
        '      case "count": { const n = Number(current.dataset.count || current.textContent.match(/-?\\\\d+/)?.[0] || 0) + 1; current.dataset.count = n; if (current.tagName === "OUTPUT") current.value = n; else current.textContent = "Count: " + n; break; }\n' +
        '      case "text": current.textContent = "Updated: " + example.label; break;\n' +
        '      case "toggle": card.classList.toggle("is-active"); if (current.style) current.style.fontWeight = current.style.fontWeight === "700" ? "" : "700"; if (current.tagName === "DETAILS" || current.tagName === "DIALOG") current.open = !current.open; if (current.tagName === "AUDIO" || current.tagName === "VIDEO") current.controls = !current.controls; if (current.tagName === "IFRAME") current.hidden = !current.hidden; if (current.tagName === "HR") current.style.borderTop = current.style.borderTop ? "" : "3px dashed " + card.style.getPropertyValue("--accent"); break;\n' +
        '      case "color": { const color = colors[(colors.indexOf(card.style.getPropertyValue("--accent")) + 1) % colors.length]; card.style.setProperty("--accent", color); card.style.setProperty("--ink", color); card.style.setProperty("--edge", color + "88"); card.style.setProperty("--wash", color + "18"); const svg = demo.querySelector("circle"); if (svg) svg.setAttribute("fill", color); break; }\n' +
        '      case "read": { const input = firstInput || current; if (input.type === "password") result.textContent = "Password length: " + input.value.length; else if (input.type === "file") result.textContent = input.files[0]?.name || "No file selected"; else if (input.type === "checkbox" || input.type === "radio") result.textContent = input.checked ? "Selected" : "Not selected"; else if (input.type === "range" || input.type === "number") result.textContent = "Value: " + input.value; else if (input.type === "color") result.textContent = "Color: " + input.value; else if (input.type === "email") result.textContent = input.checkValidity() ? "Valid email" : "Please check the email"; else result.textContent = "Value: " + (input.value || "(empty)"); break; }\n' +
        '      case "progress": { const meter = demo.querySelector("progress, meter"); if (meter) meter.value = (Number(meter.value) + 10) > Number(meter.max) ? 0 : Number(meter.value) + 10; result.textContent = "Value: " + meter.value + " / " + meter.max; break; }\n' +
        '      case "add": { const list = demo.querySelector("ul, ol, tbody, table"); if (list) { if (list.tagName === "TABLE") { const row = list.insertRow(); row.insertCell().textContent = "New"; row.insertCell().textContent = String(list.rows.length); } else if (list.tagName === "TBODY") { const row = list.insertRow(); row.insertCell().textContent = "New"; } else { const li = document.createElement("li"); li.textContent = "Added item"; (list.tagName === "TABLE" ? list.tBodies[0] : list).appendChild(li); } } else { const span = document.createElement("span"); span.textContent = " + added"; demo.appendChild(span); } break; }\n' +
        '      case "form": { const form = demo.querySelector("form"); if (form) { const input = form.querySelector("input"); result.textContent = input && input.value.trim() ? "Ready to submit: " + input.value : "Enter a name first"; } break; }\n' +
        '      case "link": result.textContent = "Target: " + ((demo.querySelector("a") || {}).getAttribute("href") || "#"); break;\n' +
        '      case "time": { const t = demo.querySelector("time"); if (t) t.textContent = new Date().toLocaleTimeString(); else result.textContent = new Date().toLocaleTimeString(); break; }\n' +
        '      case "image": { const img = demo.querySelector("img"); if (img) { img.style.filter = img.style.filter ? "" : "hue-rotate(150deg)"; } break; }\n' +
        '      case "canvas": { let canvas = demo.querySelector("canvas"); if (canvas) { const ctx = canvas.getContext("2d"); ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]; ctx.fillRect(0, 0, canvas.width, canvas.height); } break; }\n' +
        '      case "copy": result.textContent = "Sample: " + (current.textContent || example.label); break;\n' +
        '      case "reset": { const fresh = makeCard(example, Number(card.dataset.index)); card.replaceWith(fresh); break; }\n' +
        '      case "disable": if (button) button.disabled = !button.disabled; break;\n' +
        '      case "hide": current.hidden = !current.hidden; break;\n' +
        '      case "focus": { const input = demo.querySelector("input"); if (input) input.focus(); else result.textContent = "This example has no input to focus."; break; }\n' +
        '      case "pressed": if (button) { const pressed = button.getAttribute("aria-pressed") !== "true"; button.setAttribute("aria-pressed", String(pressed)); button.style.opacity = pressed ? ".55" : "1"; result.textContent = pressed ? "Pressed" : "Released"; } break;\n' +
        '      case "confirm": result.textContent = "Confirmed: " + example.label; break;\n' +
        '      case "random": result.textContent = "Random number: " + Math.floor(Math.random() * 100); break;\n' +
        '      case "calculate": { const out = demo.querySelector("output"); if (out) out.value = Number(out.value || out.textContent || 1) * 2; break; }\n' +
        '      default: result.textContent = "Action: " + example.js;\n' +
        '    }\n' +
        '  }\n' +
        '  examples.forEach((example, index) => grid.appendChild(makeCard(example, index % examples.length)));\n' +
        '  while (grid.children.length < 200) { const index = grid.children.length; grid.appendChild(makeCard(examples[index % examples.length], index)); }\n' +
        '' +
        '  grid.addEventListener("submit", event => { event.preventDefault(); const card = event.target.closest(".tag-card"); if (card) act(card); });\n' +
        '  grid.addEventListener("change", event => { const card = event.target.closest(".tag-card"); if (card && card._result) { const input = event.target; card._result.textContent = input.type === "password" ? "Password length: " + input.value.length : input.type === "file" ? (input.files[0]?.name || "No file selected") : input.type === "checkbox" || input.type === "radio" ? (input.checked ? "Selected" : "Not selected") : "Value: " + (input.value || "(empty)"); } });\n' +
        '  count.textContent = grid.children.length + " examples";\n' +
        '})();';

    global.EDITOR_STARTER_GALLERY = Object.freeze({ html: html, css: css, js: js });
})(window);
