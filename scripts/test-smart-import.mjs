#!/usr/bin/env node
/**
 * Small dependency-free integration test for Smart Import's recovery path.
 * Run with: node scripts/test-smart-import.mjs
 */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const script = await readFile(resolve(root, 'smart-import.js'), 'utf8');

class FakeElement {
    constructor(id) {
        this.id = id;
        this.value = '';
        this.textContent = '';
        this.hidden = false;
        this.checked = false;
        this.disabled = false;
        this.lang = '';
        this.dir = '';
        this.className = '';
        this.children = [];
        this.listeners = Object.create(null);
        this.classList = {
            add: (name) => {
                const classes = new Set(this.className.split(/\s+/).filter(Boolean));
                classes.add(name);
                this.className = Array.from(classes).join(' ');
            }
        };
    }
    addEventListener(type, callback) { this.listeners[type] = callback; }
    click() { if (this.listeners.click) return this.listeners.click({ preventDefault() {}, stopPropagation() {} }); }
    focus() {}
    scrollIntoView() {}
    replaceChildren(...children) { this.children = children; }
    appendChild(child) { this.children.push(child); return child; }
    append(...children) { this.children.push(...children); }
}

const ids = [
    'siSource', 'siResults', 'siSummary', 'siStats', 'siNotes', 'siActionStatus',
    'siFileInput', 'siResultHtml', 'siApplyHtml', 'siCountHtml', 'siResultCss',
    'siApplyCss', 'siCountCss', 'siResultJs', 'siApplyJs', 'siCountJs',
    'siJsRecovery', 'siUseLatestJs', 'siAnalyze', 'siCleanAnalyze', 'siChooseFile',
    'siPaste', 'siClear', 'siApply'
];
const elements = new Map(ids.map((id) => [id, new FakeElement(id)]));
const document = {
    getElementById: (id) => elements.get(id) || null,
    createElement: (tagName) => new FakeElement(tagName)
};
const window = { HTMLCSJSEditor: { applyImportedCode: () => ({ applied: [], saved: true }) } };
const navigator = { clipboard: { readText: async () => '' } };
const sandbox = { document, window, navigator, console, Set, Map, Array, Object, String, RegExp, Math };
vm.runInNewContext(script, sandbox, { filename: 'smart-import.js' });

const firstJs = [
    "const openBtn = document.getElementById('openBtn');",
    "const overlay = document.getElementById('overlay');",
    "const yesBtn = document.getElementById('yesBtn');",
    "const noBtn = document.getElementById('noBtn');",
    "const tabs = document.getElementById('tabs');",
    "const result = document.getElementById('result');",
    "const view1 = document.getElementById('view1');",
    "const view2 = document.getElementById('view2');",
    "const datesContainer = document.getElementById('datesContainer');",
    "const dateResult = document.getElementById('dateResult');",
    "const closeBtn = document.getElementById('closeBtn');",
    "function openModal() { overlay.classList.add('active'); }",
    "function closeModal() { overlay.classList.remove('active'); }",
    "openBtn.addEventListener('click', openModal);",
    "yesBtn.addEventListener('click', () => { view1.style.display = 'none'; });",
    "noBtn.addEventListener('click', closeModal);",
    "result.textContent = 'Version one';"
].join('\n');
const latestJs = [
    "const openBtn = document.getElementById('openBtn');",
    "const overlay = document.getElementById('overlay');",
    "const yesBtn = document.getElementById('yesBtn');",
    "const noBtn = document.getElementById('noBtn');",
    "const tabs = document.getElementById('tabs');",
    "const result = document.getElementById('result');",
    "const view1 = document.getElementById('view1');",
    "const view2 = document.getElementById('view2');",
    "const datesContainer = document.getElementById('datesContainer');",
    "const dateResult = document.getElementById('dateResult');",
    "const closeBtn = document.getElementById('closeBtn');",
    "function openModal() { overlay.classList.add('active'); }",
    "function closeModal() { overlay.classList.remove('active'); }",
    "openBtn.addEventListener('click', openModal);",
    "yesBtn.addEventListener('click', () => { view1.style.display = 'none'; });",
    "noBtn.addEventListener('click', closeModal);",
    "result.textContent = 'Version two';"
].join('\n');

const sampleSource = [
    '<!DOCTYPE html>',
    '<html lang="fa"><head><style>',
    '<!DOCTYPE html>',
    '<html lang="fa"><head><style>',
    'body { color: red; }',
    '<\\/style></head><body><div>Old embedded body</div></body></html>',
    '</style></head><body>',
    '<!DOCTYPE html><html lang="fa"><head><style>',
    'body { color: blue; }',
    '</style></head><body><div id="latest-page">Latest body</div></body></html>',
    '</body></html>',
    '<script>',
    firstJs,
    '</script>',
    '<script>',
    latestJs,
    '</script>'
].join('\n');
elements.get('siSource').value = sampleSource;

function assert(condition, message) {
    if (!condition) throw new Error('Smart Import test failed: ' + message);
}

elements.get('siAnalyze').click();

const html = elements.get('siResultHtml').value;
const css = elements.get('siResultCss').value;
const js = elements.get('siResultJs').value;
const diagnostics = elements.get('siNotes').children.map((item) => item.textContent).join('\n');

assert(html.includes('Latest body'), 'should select the latest complete body as the HTML candidate');
assert(!html.includes('Old embedded body'), 'should not preserve the malformed nested document as the chosen body');
assert(!/<(?:!doctype|html|head)\b/i.test(css), 'recovered CSS output should not contain document wrapper tags');
assert(!js.includes('Version one') && !js.includes('Version two'), 'script blocks outside the selected complete document should not be merged into it');
assert(diagnostics.includes('چند نسخه یا شروع سند HTML'), 'should explain in Persian why a single coherent document was selected');

// Now test an ordinary document with two conflicting script blocks inside that same document.
elements.get('siSource').value = [
    '<!DOCTYPE html><html lang="fa"><head><style>body { color: blue; }</style></head><body>',
    '<div id="latest-page">Valid body</div>',
    '<script>', firstJs, '</script>',
    '<script>', latestJs, '</script>',
    '</body></html>'
].join('\n');
elements.get('siAnalyze').click();

const conflictedJs = elements.get('siResultJs').value;
const conflictDiagnostics = elements.get('siNotes').children.map((item) => item.textContent).join('\n');
assert(conflictedJs.includes('Version one') && conflictedJs.includes('Version two'), 'normal analysis should preserve both conflicting script blocks for review');
assert(conflictDiagnostics.includes('openBtn'), 'should report the repeated top-level openBtn binding');
assert(elements.get('siApplyJs').checked === false, 'should uncheck Apply JavaScript when top-level conflicts are found');
assert(elements.get('siJsRecovery').hidden === false, 'should offer latest-version recovery for two highly similar conflicting scripts');

elements.get('siUseLatestJs').click();
assert(elements.get('siResultJs').value.trim() === latestJs.trim(), 'recovery action should select only the latest JS block');
assert(elements.get('siApplyJs').checked === true, 'Apply JavaScript should be re-selected when the chosen version has no detected binding conflict');
assert(elements.get('siActionStatus').textContent.includes('فایل اصلی هنوز تغییر نکرده'), 'recovery action should clearly say that it only changes the suggested output');

console.log('Smart Import integration test passed: document selection, CSS recovery, declaration conflicts, and explicit latest-JS recovery.');
