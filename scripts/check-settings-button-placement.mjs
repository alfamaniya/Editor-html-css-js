#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const settingsId = 'id="btnSettings"';
assert.equal(html.split(settingsId).length - 1, 1,
    'دکمهٔ تنظیمات باید دقیقاً یک بار در صفحه تعریف شده باشد.');

const settingsIdIndex = html.indexOf(settingsId);
const buttonStart = html.lastIndexOf('<button', settingsIdIndex);
const buttonClose = html.indexOf('</button>', settingsIdIndex);
assert.ok(buttonStart >= 0 && buttonClose > buttonStart, 'تگ دکمهٔ تنظیمات بسته نشده است.');
const button = html.slice(buttonStart, buttonClose + '</button>'.length);

const headerStart = html.indexOf('<header class="workspace-header"');
const headerEnd = html.indexOf('</header>', headerStart);
assert.ok(headerStart >= 0 && headerEnd > headerStart, 'هدر اصلی پیدا نشد.');
assert.ok(buttonStart > headerStart && buttonClose < headerEnd,
    'دکمهٔ تنظیمات باید داخل هدر اصلی قرار داشته باشد.');

const sidebarStart = html.indexOf('<aside class="toolbar-sidebar"');
const sidebarEnd = html.indexOf('</aside>', sidebarStart);
assert.ok(sidebarStart >= 0 && sidebarEnd > sidebarStart, 'سایدبار ابزارها پیدا نشد.');
assert.ok(buttonStart < sidebarStart || buttonStart > sidebarEnd,
    'دکمهٔ تنظیمات نباید داخل سایدبار ابزارها باشد.');

assert.ok(button.includes('workspace-menu-button'),
    'دکمهٔ تنظیمات باید از استایل مشترک دکمه‌های هدر استفاده کند.');
assert.ok(button.includes('aria-controls="settingsScreen"'),
    'اتصال دکمه به پنجرهٔ تنظیمات باید حفظ شود.');
assert.ok(button.includes('aria-haspopup="dialog"'),
    'نوع پنجرهٔ بازشونده باید برای دسترس‌پذیری اعلام شود.');
assert.ok(button.includes('aria-label="باز کردن تنظیمات ویرایشگر"'),
    'دکمهٔ آیکونی باید نام قابل‌دسترسی فارسی داشته باشد.');

console.log('آزمون جایگاه، یکتایی و دسترس‌پذیری دکمهٔ تنظیمات با موفقیت گذشت.');
