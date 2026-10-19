#!/usr/bin/env node
/**
 * Dependency-free test for the default 200-card code gallery.
 * Run with: node scripts/test-starter-gallery.mjs
 */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const source = await readFile(resolve(root, 'script.js'), 'utf8');
const tick = String.fromCharCode(96);

function extractTemplate(name) {
    const marker = 'const ' + name + ' = ' + tick;
    const start = source.indexOf(marker);
    if (start < 0) throw new Error('Missing default template: ' + name);
    const valueStart = start + marker.length;
    const end = source.indexOf(tick + ';', valueStart);
    if (end < 0) throw new Error('Unterminated default template: ' + name);
    return source.slice(valueStart, end);
}

function assert(condition, message) {
    if (!condition) throw new Error('Starter gallery test failed: ' + message);
}

const html = extractTemplate('DEFAULT_HTML');
const css = extractTemplate('DEFAULT_CSS');
const js = extractTemplate('DEFAULT_JS');

assert(html.includes('id="codeGrid"'), 'HTML should provide the code-card grid');
assert(html.includes('200 Code Boxes'), 'HTML should identify the 200-card starter');
assert(css.includes('grid-template-columns: repeat(auto-fill'), 'CSS should use a responsive auto-filling grid');
assert(css.includes('min(100%, 112px)'), 'CSS should keep cards compact');
assert(js.includes('const totalBoxes = 200'), 'JavaScript should generate exactly 200 cards');
assert(js.includes('code.textContent = source'), 'code snippets should be rendered as text, not executed as markup');
assert(source.includes('const PREVIOUS_DEFAULTS = {'), 'previous starter signature should be retained for a safe migration');
assert(source.includes('[LEGACY_STARTER_DEFAULTS, PREVIOUS_DEFAULTS]'), 'migration should support both old untouched starter versions');

class FakeElement {
    constructor(tagName) {
        this.tagName = tagName;
        this.className = '';
        this.textContent = '';
        this.children = [];
        this.style = { setProperty() {} };
    }
    appendChild(child) { this.children.push(child); return child; }
    append(...children) { this.children.push(...children); }
}
const grid = new FakeElement('section');
const boxCount = new FakeElement('span');
const document = {
    getElementById(id) {
        if (id === 'codeGrid') return grid;
        if (id === 'boxCount') return boxCount;
        return null;
    },
    createElement(tagName) { return new FakeElement(tagName); }
};

vm.runInNewContext(js, { document, String, Math }, { filename: 'DEFAULT_JS' });

assert(grid.children.length === 200, 'runtime should create 200 cards');
assert(boxCount.textContent === '200 boxes', 'the visible counter should report 200 cards');
grid.children.forEach((card, index) => {
    assert(card.className === 'code-card', 'card ' + (index + 1) + ' should use the card style');
    assert(card.children.length === 4, 'card ' + (index + 1) + ' should have a title and three code lines');
    const labels = card.children.slice(1).map((line) => line.children[0].textContent);
    const snippets = card.children.slice(1).map((line) => line.children[1].textContent);
    assert(labels.join('|') === 'HTML|CSS|JAVASCRIPT', 'card ' + (index + 1) + ' should show all three languages');
    assert(snippets.every((snippet) => snippet.length > 0), 'card ' + (index + 1) + ' should have non-empty code samples');
});
console.log('Starter gallery test passed: 200 compact cards, 600 visible code snippets, responsive CSS, and safe previous-demo migration markers.');
