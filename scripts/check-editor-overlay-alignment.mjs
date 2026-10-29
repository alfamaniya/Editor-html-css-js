#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../style.css', import.meta.url), 'utf8');
const script = await readFile(new URL('../script.js', import.meta.url), 'utf8');

function cssRule(selector) {
    const escaped = selector.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&');
    const match = css.match(new RegExp(escaped + '\\s*\\{([^}]*)\\}'));
    assert.ok(match, 'قاعدهٔ CSS پیدا نشد: ' + selector);
    return match[1];
}

const baseLayers = cssRule('.highlight, .input');
for (const property of ['padding: 15px', 'font-family:', 'font-size: inherit', 'line-height: 1.5']) {
    assert.ok(baseLayers.includes(property), 'ویژگی مشترک لایه‌ها وجود ندارد: ' + property);
}
assert.doesNotMatch(cssRule('.highlight'), /padding-(?:right|bottom)\\s*:/,
    'لایهٔ هایلایت نباید padding متفاوتی با textarea داشته باشد.');
assert.doesNotMatch(cssRule('.hl-tag'), /font-weight\\s*:/,
    'رنگ‌بندی تگ‌ها نباید وزن فونت را تغییر دهد.');
assert.doesNotMatch(cssRule('.hl-comment'), /font-style\\s*:/,
    'رنگ‌بندی توضیحات نباید حالت فونت را تغییر دهد.');
assert.ok(css.includes('.highlight code *'), 'قواعد یکسان‌سازی فونت برای فرزندان لایهٔ هایلایت پیدا نشد.');

for (const token of [
    'const width = ta.clientWidth;',
    'const height = ta.clientHeight;',
    'pre.style.width = width + \'px\';',
    'pre.style.height = height + \'px\';',
    'function scrollToPosition(position, visibleLines)',
    'range.getBoundingClientRect()',
    'ed.scrollToPosition(m.start, 3);',
    'editor.scrollToPosition(start, 2);',
    'editor.ta.wrap = value === \'on\' ? \'soft\' : \'off\';',
    'editor.refresh();'
]) {
    assert.ok(script.includes(token), 'بخش هم‌ترازی یا پیمایش پیدا نشد: ' + token);
}

console.log('آزمون هم‌ترازی لایه‌ها، محاسبهٔ موقعیت دیداری، جست‌وجو و انتخاب المان با موفقیت گذشت.');
