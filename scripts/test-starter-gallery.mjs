#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const source = await readFile(resolve(root, 'starter-gallery.js'), 'utf8');
const editorSource = await readFile(resolve(root, 'script.js'), 'utf8');

function assert(condition, message) {
    if (!condition) throw new Error('Starter gallery test failed: ' + message);
}

const window = {};
vm.runInNewContext(source, { window }, { filename: 'starter-gallery.js' });
const starter = window.EDITOR_STARTER_GALLERY;
assert(starter && starter.html && starter.css && starter.js, 'module should export all three starter files');
assert(starter.html.includes('id="tagGrid"'), 'HTML should provide the card grid');
assert(starter.html.includes('200 Interactive Tag Samples'), 'HTML should describe the examples');
assert(starter.css.includes('repeat(auto-fill'), 'CSS should use a responsive auto-filling grid');
assert(starter.css.includes('var(--radius)'), 'card styles should use per-card custom properties');
assert(starter.css.includes('.tag-card:hover'), 'base styles should preserve hover stacking context');
assert(starter.css.includes('.tag-description'), 'base styles should style Persian descriptions');
assert(starter.js.includes('while (grid.children.length < 200)'), 'JavaScript should create exactly 200 cards');
assert(starter.js.includes('card.addEventListener("click", () => act(card))'), 'cards should have working click behavior');
assert(starter.js.includes('dynamicStyles.sheet.insertRule("." + cardClass + ":hover'), 'each card should receive a real CSS hover rule');
assert(starter.js.includes('cssLabel.textContent = "CSS · HOVER"'), 'the hover rule should be displayed inside each card');
assert(starter.js.includes('description.lang = "fa"'), 'each card should mark its explanation as Persian');
assert(starter.js.includes('tagNamesFa[example.tag]'), 'the Persian explanation should name the HTML tag');
assert(starter.js.includes('hoverHelpFa[index % hoverHelpFa.length]'), 'the Persian explanation should describe the hover effect');
assert(starter.js.includes('case "read"'), 'form controls should expose their live values');
assert(starter.js.includes('case "progress"'), 'progress and meter samples should respond to interaction');
assert(starter.js.includes('case "canvas"'), 'canvas sample should draw when activated');
assert(starter.js.includes('htmlCode.textContent = example.markup'), 'HTML examples should be shown as readable code');
assert(starter.js.includes('cssCode.textContent = "." + cardClass + ":hover'), 'the displayed CSS should use the actual hover selector');
assert(starter.js.includes('jsCode.textContent ='), 'JavaScript examples should be shown as readable code');
assert(!editorSource.includes('const DEFAULT_HTML = `'), 'starter HTML should no longer be embedded in script.js');
assert(!editorSource.includes('const DEFAULT_CSS = `'), 'starter CSS should no longer be embedded in script.js');
assert(!editorSource.includes('const DEFAULT_JS = `'), 'starter JavaScript should no longer be embedded in script.js');
assert(editorSource.includes('window.EDITOR_STARTER_GALLERY'), 'main editor should load the separate starter module');
new vm.Script(starter.js, { filename: 'generated-starter-script.js' });

class FakeElement {
    constructor(tagName) {
        this.tagName = String(tagName).toUpperCase();
        this.className = '';
        this.textContent = '';
        this.innerHTML = '';
        this.lang = '';
        this.dir = '';
        this.hidden = false;
        this.children = [];
        this.listeners = Object.create(null);
        this.attributes = Object.create(null);
        this.dataset = Object.create(null);
        this.styleValues = Object.create(null);
        this.style = {
            setProperty: (name, value) => { this.styleValues[name] = String(value); },
            getPropertyValue: (name) => this.styleValues[name] || ''
        };
        this.classList = {
            add: (...names) => {
                const current = new Set(this.className.split(/\s+/).filter(Boolean));
                names.forEach((name) => current.add(name));
                this.className = Array.from(current).join(' ');
            },
            toggle: (name) => {
                const current = new Set(this.className.split(/\s+/).filter(Boolean));
                if (current.has(name)) current.delete(name); else current.add(name);
                this.className = Array.from(current).join(' ');
                return current.has(name);
            }
        };
        this.sheet = this.tagName === 'STYLE'
            ? { cssRules: [], insertRule: (rule) => { this.sheet.cssRules.push(String(rule)); return this.sheet.cssRules.length - 1; } }
            : null;
    }
    appendChild(child) { this.children.push(child); child.parentNode = this; this.firstElementChild = this.children[0] || null; return child; }
    append(...children) { children.forEach((child) => this.appendChild(child)); }
    addEventListener(type, callback) {
        if (!this.listeners[type]) this.listeners[type] = [];
        this.listeners[type].push(callback);
    }
    setAttribute(name, value) { this.attributes[name] = String(value); }
    getAttribute(name) { return this.attributes[name] ?? null; }
    querySelector() { return null; }
    replaceWith(replacement) {
        if (!this.parentNode) return;
        const index = this.parentNode.children.indexOf(this);
        if (index >= 0) this.parentNode.children[index] = replacement;
        replacement.parentNode = this.parentNode;
    }
}
const styleRules = [];
const grid = new FakeElement('section');
const count = new FakeElement('strong');
const head = new FakeElement('head');
const originalAppendHead = head.appendChild.bind(head);
head.appendChild = (child) => {
    const result = originalAppendHead(child);
    if (child.sheet) {
        const originalInsert = child.sheet.insertRule;
        child.sheet.insertRule = (rule) => {
            styleRules.push(String(rule));
            return originalInsert(rule);
        };
    }
    return result;
};
const document = {
    head,
    getElementById(id) {
        if (id === 'tagGrid') return grid;
        if (id === 'galleryCount') return count;
        return null;
    },
    createElement(tagName) { return new FakeElement(tagName); }
};
vm.runInNewContext(starter.js, { document, console, Date, Math, String }, { filename: 'generated-starter-script.js' });

assert(grid.children.length === 200, 'runtime should create exactly 200 cards');
assert(count.textContent === '200 examples', 'gallery counter should reflect the number of cards');
const hoverRules = styleRules.filter((rule) => /:hover\s*\{/.test(rule));
assert(hoverRules.length === 200, 'runtime should register one active hover rule for every card');
assert(new Set(hoverRules).size >= 20, 'hover treatments should vary across the card gallery');

grid.children.forEach((card, index) => {
    const id = index + 1;
    assert(card.className.includes('tag-card') && card.className.includes('card-' + id), 'card ' + id + ' should have a unique styling class');
    assert(card.children.length === 5, 'card ' + id + ' should contain a demo, Persian explanation, status, and code panel');
    const description = card.children[2];
    assert(description.lang === 'fa' && description.dir === 'rtl', 'card ' + id + ' explanation should be Persian and right-to-left');
    assert(description.textContent.includes('این کارت نمونه‌ای'), 'card ' + id + ' should contain a Persian explanation');
    assert(description.textContent.includes('با رفتن نشانگر روی کارت'), 'card ' + id + ' should explain the hover effect in Persian');
    const codePanel = card.children[4];
    const shownCss = codePanel.children[3].textContent;
    const actualRule = hoverRules.find((rule) => rule.startsWith('.card-' + id + ':hover '));
    assert(Boolean(actualRule), 'card ' + id + ' should have its own active hover rule');
    assert(shownCss === actualRule, 'card ' + id + ' should display the exact CSS hover rule that is applied');
    const jsSnippet = codePanel.children[5].textContent;
    assert(jsSnippet.includes('card.addEventListener("click", () => act(card))'), 'card ' + id + ' should display its working JavaScript action handler');
});

console.log('Starter gallery tests passed: 200 interactive cards, 200 applied/displayed hover rules, 200 Persian explanations, varied hover styles, and generated JavaScript syntax.');
