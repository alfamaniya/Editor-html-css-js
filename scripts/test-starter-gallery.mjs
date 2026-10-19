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
assert(starter.js.includes('while (grid.children.length < 200)'), 'JavaScript should create exactly 200 cards');
assert(starter.js.includes('card.addEventListener("click", () => act(card))'), 'cards should have working click behavior');
assert(starter.js.includes('case "read"'), 'form controls should expose their live values');
assert(starter.js.includes('case "progress"'), 'progress and meter samples should respond to interaction');
assert(starter.js.includes('case "canvas"'), 'canvas sample should draw when activated');
assert(starter.js.includes('htmlCode.textContent = example.markup'), 'HTML examples should be shown as readable code');
assert(starter.js.includes('cssCode.textContent = ".card-"'), 'CSS examples should be shown as readable code');
assert(starter.js.includes('jsCode.textContent ='), 'JavaScript examples should be shown as readable code');
assert(!editorSource.includes('const DEFAULT_HTML = `'), 'starter HTML should no longer be embedded in script.js');
assert(!editorSource.includes('const DEFAULT_CSS = `'), 'starter CSS should no longer be embedded in script.js');
assert(!editorSource.includes('const DEFAULT_JS = `'), 'starter JavaScript should no longer be embedded in script.js');
assert(editorSource.includes('window.EDITOR_STARTER_GALLERY'), 'main editor should load the separate starter module');
new vm.Script(starter.js, { filename: 'generated-starter-script.js' });
console.log('Starter gallery tests passed: separate source module, HTML/CSS/JS defaults, responsive grid, interactive behaviors, visible code samples, and generated JavaScript syntax.');
