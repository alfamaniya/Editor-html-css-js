#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const script = readFileSync('script.js', 'utf8');
const css = readFileSync('style.css', 'utf8');
const headerCss = readFileSync('src/features/workspace/search/search-header.css', 'utf8');

const pickerStart = script.indexOf('//  Color Picker');
assert.ok(pickerStart >= 0, 'بخش پالت رنگ پیدا نشد.');
const helperStart = script.indexOf('function clamp(n, a, b)', pickerStart);
const helperEnd = script.indexOf('function render(skipText)', helperStart);
assert.ok(helperStart > pickerStart && helperEnd > helperStart,
    'توابع تبدیل و تشخیص رنگ برای آزمون پیدا نشدند.');

const sandbox = { alpha: null, fmtSel: { value: 'hex' } };
vm.runInNewContext(
    script.slice(helperStart, helperEnd) +
    '\nthis.colorPickerTestApi = { parseColor, colorAlpha, formatColor, hsvToRgb };',
    sandbox
);
const api = sandbox.colorPickerTestApi;
function rgbOf(value) {
    const hsv = api.parseColor(value);
    assert.ok(hsv, 'رنگ باید قابل تشخیص باشد: ' + value);
    return api.hsvToRgb(hsv.h, hsv.s, hsv.v);
}

assert.deepEqual(Array.from(rgbOf('#abc')), [170, 187, 204]);
assert.deepEqual(Array.from(rgbOf('#aabbcc')), [170, 187, 204]);
assert.deepEqual(Array.from(rgbOf('#abcd')), [170, 187, 204]);
assert.deepEqual(Array.from(rgbOf('#aabbccdd')), [170, 187, 204]);

assert.equal(api.colorAlpha('#abcd'), 221 / 255);
assert.equal(api.colorAlpha('#aabbcc44'), 68 / 255);
assert.equal(api.colorAlpha('rgba(17, 34, 51, 0.5)'), 0.5);
assert.equal(api.colorAlpha('hsla(210, 50%, 40%, 25%)'), 0.25);
assert.equal(api.colorAlpha('rgb(17 34 51 / 50%)'), 0.5);

sandbox.fmtSel.value = 'hex';
assert.equal(api.formatColor(rgbOf('#aabbccdd'), api.colorAlpha('#aabbccdd')), '#aabbccdd');
sandbox.fmtSel.value = 'rgb';
assert.equal(api.formatColor(rgbOf('rgba(17, 34, 51, 0.5)'), 0.5), 'rgba(17, 34, 51, 0.5)');
sandbox.fmtSel.value = 'hsl';
assert.match(api.formatColor(rgbOf('hsla(210, 50%, 40%, 25%)'), 0.25), /^hsla\(/);

assert.ok(!script.includes('measureCtx2'),
    'محاسبهٔ مکان پالت نباید به عرض تقریبی یک نویسه در Canvas وابسته باشد.');
const caretStart = script.indexOf('function caretRect2(ta, pos)');
const caretEnd = script.indexOf('function openAt(ta, target)', caretStart);
const caretCode = script.slice(caretStart, caretEnd);
assert.ok(caretCode.includes('document.createRange()'),
    'محاسبهٔ مکان پالت باید از هندسهٔ واقعی متن استفاده کند.');
assert.ok(caretCode.includes('const mirror = document.createElement(\'div\')'),
    'مسیر جایگزین برای مرورگرهایی که Range مستطیل معتبر نمی‌دهد لازم است.');
assert.ok(script.includes('ctx = { ta: ta, start: target.start, end: target.end, alpha: alpha };'),
    'بافت رنگ انتخابی باید کانال آلفا را حفظ کند.');

function zIndex(source, selector) {
    const escaped = selector.replace(/[.*+?^\x24{}()|[\]\\]/g, '\\$&');
    const match = source.match(new RegExp(escaped + '\\s*\\{[^}]*?z-index:\\s*(\\d+)', 's'));
    assert.ok(match, 'z-index پیدا نشد: ' + selector);
    return Number(match[1]);
}
assert.ok(zIndex(css, '.cp') > zIndex(headerCss, '.workspace-header'),
    'پالت رنگ باید بالاتر از هدر اصلی نمایش داده شود.');

console.log('آزمون هگزهای ۳/۴/۶/۸ رقمی، شفافیت RGB/HSL، مختصات مکان‌نما و لایهٔ نمایش پالت با موفقیت گذشت.');
