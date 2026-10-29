#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const openingTags = html.match(/<button\\b[^>]*\\bid="btnSettings"[^>]*>/g) || [];
assert.equal(openingTags.length, 1, 'دکمهٔ تنظیمات باید دقیقاً یک بار در صفحه تعریف شده باشد.');

const buttonStart = html.indexOf(openingTags[0]);
const buttonClose = html.indexOf('</button>', buttonStart);
assert.ok(buttonClose > buttonStart, 'تگ دکمهٔ تنظیمات بسته نشده است.');
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

assert.match(button, /class="[^"]*workspace-menu-button[^"]*"/,
    'دکمهٔ تنظیمات باید از استایل مشترک دکمه‌های هدر استفاده کند.');
assert.match(button, /aria-controls="settingsScreen"/,
    'اتصال دکمه به پنجرهٔ تنظیمات باید حفظ شود.');
assert.match(button, /aria-haspopup="dialog"/,
    'نوع پنجرهٔ بازشونده باید برای دسترس‌پذیری اعلام شود.');
assert.match(button, /aria-label="باز کردن تنظیمات ویرایشگر"/,
    'دکمهٔ آیکونی باید نام قابل‌دسترسی فارسی داشته باشد.');

console.log('آزمون جایگاه، یکتایی و دسترس‌پذیری دکمهٔ تنظیمات با موفقیت گذشت.');
