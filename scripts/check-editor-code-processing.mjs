#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync('script.js','utf8');
const start = source.indexOf('const HTML_PASTE_VOID_TAGS');
const end = source.indexOf('// Remove local asset references when the same files are embedded below.',start);
assert.ok(start >= 0 && end > start,'Paste helper block was not found.');
const context = {};
vm.runInNewContext(source.slice(start,end) + '\nthis.api = {extractPasteAssets,appendUniqueCode,scanMarkupForPaste,handleHtmlEditorPaste};',context);
const api = context.api;
let passed = 0;
function test(label, fn) { fn(); passed++; console.log('PASS ' + label); }

const example = '<!DOCTYPE html><html lang="fa"><head><meta charset="UTF-8"><title>آزمایش</title><style>body { background:#eee; }\nh1 { color: blue; }</style></head><body><h1>سلام دنیا</h1><button id="test">کلیک کن</button><script>document.getElementById("test").addEventListener("click", () => alert("سلام"));</script></body></html>';

test('full document extraction preserves structure and Persian text',() => {
    const result = api.extractPasteAssets(example);
    assert.ok(result); assert.equal(result.css.length,1); assert.equal(result.js.length,1);
    assert.match(result.html,/<!DOCTYPE html>/i); assert.match(result.html,/<title>آزمایش<\/title>/);
    assert.match(result.html,/<button id="test">کلیک کن<\/button>/);
    assert.doesNotMatch(result.html,/<style\b/i); assert.doesNotMatch(result.html,/<script\b/i);
});
test('plain HTML fragment keeps default paste behavior',() => {
    assert.equal(api.extractPasteAssets('<div><p>متن فارسی</p><button>ثبت</button></div>'),null);
});
test('raw CSS only transfers to CSS tab',() => {
    const r=api.extractPasteAssets('body { color: red; }'); assert.ok(r);
    assert.equal(r.css.length,1); assert.equal(r.js.length,0); assert.equal(r.html,'');
});
test('raw JavaScript only transfers to JS tab',() => {
    const r=api.extractPasteAssets('console.log("سلام");'); assert.ok(r);
    assert.equal(r.js.length,1); assert.equal(r.css.length,0); assert.equal(r.html,'');
});
test('media attribute becomes equivalent @media block',() => {
    const r=api.extractPasteAssets('<style media="screen and (min-width:500px)">h1 { color:red; }</style><div>ok</div>');
    assert.ok(r); assert.match(r.css[0],/^@media screen and \(min-width:500px\) \{/);
});
test('duplicate style/script blocks are merged once',() => {
    const r=api.extractPasteAssets('<html><head><style>h1 { color:red; }</style><style>h1 { color:red; }</style></head><body><h1>x</h1><script>console.log(1);</script><script>console.log(1);</script></body></html>');
    assert.ok(r); assert.equal(r.css.length,1); assert.equal(r.js.length,1);
});
test('old destination content is retained and exact duplicate is skipped',() => {
    const merged=api.appendUniqueCode('h1 { color:blue; }',['h1 { color:blue; }','p { color:green; }']);
    assert.match(merged,/h1 \{ color:blue; \}/); assert.match(merged,/p \{ color:green; \}/);
    assert.equal((merged.match(/h1 \{ color:blue; \}/g)||[]).length,1);
});
test('script not at safe tail remains in HTML',() => {
    assert.equal(api.extractPasteAssets('<body><script>console.log("early");</script><div>later</div></body>'),null);
});
test('malformed style or script fails safely',() => {
    assert.equal(api.extractPasteAssets('<style>body { color:red; }'),null);
    assert.equal(api.extractPasteAssets('<body><script>alert(1);'),null);
});
test('module, JSON-LD and template scripts are not extracted',() => {
    const input='<html><head><script type="module">import x from "x";</script><script type="application/ld+json">{"x":1}</script><template><script>doNothing()</script><style>p {color:red}</style></template></head></html>';
    assert.equal(api.extractPasteAssets(input),null);
});
test('comments containing tag-like text are ignored',() => {
    assert.equal(api.scanMarkupForPaste('<!-- <script>alert(1)</script> -->').blocks.length,0);
});
test('doctype remains when safe CSS is extracted',() => {
    const r=api.extractPasteAssets('<!DOCTYPE html><style>p { color:red; }</style><p>hello</p>');
    assert.ok(r); assert.equal((r.html.match(/<!DOCTYPE html>/gi)||[]).length,1);
});
test('ordinary text keeps native paste behavior',() => {
    assert.equal(api.extractPasteAssets('این فقط یک متن معمولی است.'),null);
});
test('HTML-only clipboard content is split by the paste handler',() => {
    function editor(lang, value) {
        const ta = {
            value, selectionStart:0, selectionEnd:0,
            setRangeText(text, start, end) {
                this.value = this.value.slice(0,start) + text + this.value.slice(end);
            },
            setSelectionRange(start, end) { this.selectionStart=start; this.selectionEnd=end; },
            dispatchEvent() {}
        };
        return {lang,ta,refresh(){}};
    }
    context.editors = {
        html:editor('html',''), css:editor('css',''), js:editor('js','')
    };
    context.showToast = function() {};
    context.getFileForLang = function() { return null; };
    context.Event = class { constructor(type, options) { this.type=type; this.bubbles=options.bubbles; } };
    const markup = '<!doctype html><html><head><style>body { color:red; }</style></head>' +
        '<body><p>hello</p><script>window.ready=true;</script></body></html>';
    const values = {'text/plain':'','text/html':markup};
    const event = {
        defaultPrevented:false,
        clipboardData:{getData(type) { return values[type] || ''; }},
        preventDefault() { this.defaultPrevented=true; }
    };
    api.handleHtmlEditorPaste(event);
    assert.equal(event.defaultPrevented,true);
    assert.match(context.editors.css.ta.value,/body \{ color:red; \}/);
    assert.match(context.editors.js.ta.value,/window\.ready=true;/);
    assert.doesNotMatch(context.editors.html.ta.value,/<style\b|<script\b/i);
    assert.match(context.editors.html.ta.value,/<p>hello<\/p>/);
});
test('the most complete clipboard format is selected',() => {
    function editor(lang, value) {
        const ta = {
            value, selectionStart:0, selectionEnd:0,
            setRangeText(text, start, end) {
                this.value = this.value.slice(0,start) + text + this.value.slice(end);
            },
            setSelectionRange(start, end) { this.selectionStart=start; this.selectionEnd=end; },
            dispatchEvent() {}
        };
        return {lang,ta,refresh(){}};
    }
    context.editors = {
        html:editor('html',''), css:editor('css',''), js:editor('js','')
    };
    const markup = '<style>h1 { color:navy; }</style><h1>rich</h1><script>alert("rich");</script>';
    const values = {'text/plain':'h1 { color:red; }','text/html':markup};
    const event = {
        defaultPrevented:false,
        clipboardData:{getData(type) { return values[type] || ''; }},
        preventDefault() { this.defaultPrevented=true; }
    };
    api.handleHtmlEditorPaste(event);
    assert.equal(event.defaultPrevented,true);
    assert.match(context.editors.css.ta.value,/h1 \{ color:navy; \}/);
    assert.doesNotMatch(context.editors.css.ta.value,/h1 \{ color:red; \}/);
    assert.match(context.editors.js.ta.value,/alert\("rich"\);/);
    assert.match(context.editors.html.ta.value,/<h1>rich<\/h1>/);
});
test('complete standalone editor copied into HTML tab extracts every bundled asset',() => {
    const markup = readFileSync('index-test-etitor.html','utf8');
    const result = api.extractPasteAssets(markup);
    assert.ok(result,'The standalone editor should be recognized as a complete HTML document.');
    assert.equal(result.css.length,8,'All eight bundled CSS blocks should be extracted.');
    assert.equal(result.js.length,15,'All fifteen bundled JavaScript blocks should be extracted.');
    assert.match(result.html,/<!doctype\s+html/i);
    assert.match(result.html,/id="tab-html"/);
    const remaining = api.scanMarkupForPaste(result.html);
    assert.equal(remaining.invalid,false,'The remaining HTML should remain parseable.');
    assert.equal(remaining.blocks.length,0,'No bundled style/script blocks should remain in HTML.');
    assert.ok(result.js[0].includes('htmlTags'),'The first script should remain in original bundle order.');
    assert.ok(result.js.some((code) => code.includes('window.EditorSearchHeader')),
        'The final bundled module should not be lost during extraction.');

    function editor(lang, value) {
        const ta = {
            value, selectionStart:0, selectionEnd:0,
            setRangeText(text, start, end) {
                this.value = this.value.slice(0,start) + text + this.value.slice(end);
            },
            setSelectionRange(start, end) { this.selectionStart=start; this.selectionEnd=end; },
            dispatchEvent() {}
        };
        return {lang,ta,refresh(){}};
    }
    context.editors = {
        html:editor('html',''), css:editor('css',''), js:editor('js','')
    };
    context.showToast = function() {};
    context.getFileForLang = function() { return null; };
    context.Event = class { constructor(type, options) { this.type=type; this.bubbles=options.bubbles; } };
    const event = {
        defaultPrevented:false,
        clipboardData:{getData(type) { return type === 'text/plain' ? markup : ''; }},
        preventDefault() { this.defaultPrevented=true; }
    };
    api.handleHtmlEditorPaste(event);
    assert.equal(event.defaultPrevented,true,'Pasting the complete source should be intercepted.');
    assert.ok(context.editors.css.ta.value.includes(result.css[0]),'Extracted CSS should reach the CSS editor.');
    assert.ok(context.editors.js.ta.value.includes(result.js[0]),'Extracted JavaScript should reach the JS editor.');
    assert.match(context.editors.html.ta.value,/<!doctype\s+html/i);
    assert.match(context.editors.html.ta.value,/id="tab-html"/);
    assert.equal(api.scanMarkupForPaste(context.editors.html.ta.value).blocks.length,0);
});
test('bundle metadata is allowed without allowing unrelated tag attributes',() => {
    assert.equal(api.extractPasteAssets('<style id="unexpected">a { color:red; }</style>'),null);
    assert.equal(api.extractPasteAssets('<body><script async>window.ready=true;</script></body>'),null);
});
console.log('Passed ' + passed + ' paste-processing tests.');
