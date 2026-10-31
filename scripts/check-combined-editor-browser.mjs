#!/usr/bin/env node
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const file = resolve('editor v.html');
const html = await readFile(file);
const server = createServer((request, response) => {
  if (request.url === '/' || request.url === '/editor%20v.html') {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'content-length': html.length });
    response.end(html);
    return;
  }
  response.writeHead(404);
  response.end('Not found');
});
await new Promise((resolveListen, reject) => {
  server.once('error', reject);
  server.listen(4173, '127.0.0.1', resolveListen);
});

let browser;
try {
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const runtimeErrors = [];
  page.on('pageerror', error => runtimeErrors.push(error.message));

  await page.goto('http://127.0.0.1:4173/editor%20v.html', { waitUntil: 'load' });
  await page.waitForFunction(() => {
    const editor = document.getElementById('editor-frame');
    const visual = document.getElementById('visual-frame');
    return editor?.contentDocument?.readyState === 'complete' &&
      visual?.contentDocument?.readyState === 'complete' &&
      !!editor.contentDocument.getElementById('btnSettings') &&
      !!visual.contentDocument.getElementById('canvas');
  }, null, { timeout: 30000 });

  const editor = page.frameLocator('#editor-frame');
  await editor.locator('#btnSettings').click();
  if (!await editor.locator('#settingsScreen').isVisible()) {
    throw new Error('پنجرهٔ تنظیمات Editor پس از کلیک باز نشد.');
  }
  await editor.locator('#btnSettingsSaveReturn').click();
  if (await editor.locator('#settingsScreen').isVisible()) {
    throw new Error('پنجرهٔ تنظیمات Editor پس از ذخیره بسته نشد.');
  }

  await page.locator('[data-target="visual"]').click();
  const visual = page.frameLocator('#visual-frame');
  await visual.locator('.palette-item').first().click();
  if (!await visual.locator('#propsPanel').isVisible()) {
    throw new Error('پنل تنظیمات المان Visual Editor پس از انتخاب المان باز نشد.');
  }
  if ((await visual.locator('#styleControls .prop-row').count()) < 1) {
    throw new Error('کنترل‌های تنظیمات المان در Visual Editor ساخته نشدند.');
  }

  const storageProbe = '__editor_v_runtime_probe__';
  await editor.locator('body').evaluate((body, key) => {
    localStorage.setItem(key, 'editor-ok');
  }, storageProbe);
  await visual.locator('body').evaluate((body, key) => {
    localStorage.setItem(key, 'visual-ok');
  }, storageProbe);
  const stored = await page.locator('#visual-frame').evaluate((frame, key) => frame.contentWindow.localStorage.getItem(key), storageProbe);
  if (stored !== 'visual-ok') throw new Error('ذخیره‌سازی مرورگر در iframe بصری کار نمی‌کند.');
  await editor.locator('body').evaluate((body, key) => localStorage.removeItem(key), storageProbe);

  // Select a real element from the main editor's preview and open Visual Editor.
  await page.locator('[data-target="editor"]').click();
  const output = editor.frameLocator('#output');
  await output.locator('h1').waitFor();
  await editor.locator('#btnVisualEditorPick').click();
  await output.locator('h1').click();
  await page.frameLocator('#visual-frame').locator('#externalTargetBar').waitFor({ timeout: 10000 });
  const remoteVisual = page.frameLocator('#visual-frame');
  await remoteVisual.locator('#remote-style-font-size').fill('40');
  let liveFontSize = '';
  for (let attempt = 0; attempt < 30; attempt++) {
    liveFontSize = await output.locator('h1').evaluate(node => getComputedStyle(node).fontSize);
    if (liveFontSize === '40px') break;
    await page.waitForTimeout(100);
  }
  if (liveFontSize !== '40px') throw new Error('تغییر زندهٔ اندازهٔ متن به پیش‌نمایش اصلی منتقل نشد.');
  await remoteVisual.locator('#remoteTargetApply').click();
  await page.waitForFunction(() => document.getElementById('visual-frame').hidden && !document.getElementById('editor-frame').hidden, null, { timeout: 10000 });
  for (let attempt = 0; attempt < 40; attempt++) {
    liveFontSize = await output.locator('h1').evaluate(node => getComputedStyle(node).fontSize);
    if (liveFontSize === '40px') break;
    await page.waitForTimeout(150);
  }
  if (liveFontSize !== '40px') throw new Error('پس از ثبت، اندازهٔ متن در پیش‌نمایش اصلی باقی نماند.');
  const htmlAfterCommit = await editor.locator('#panel-html textarea').inputValue();
  if (!/font-size:\s*40px\s*!important/i.test(htmlAfterCommit)) {
    throw new Error('تغییر بصری در کد HTML اصلی ذخیره نشد.');
  }

  // A second edit must be reversible without changing the source HTML.
  await editor.locator('#btnVisualEditorPick').click();
  await output.locator('h1').click();
  await remoteVisual.locator('#externalTargetBar').waitFor({ timeout: 10000 });
  await remoteVisual.locator('#remote-style-font-size').fill('55');
  let temporaryFontSize = '';
  for (let attempt = 0; attempt < 30; attempt++) {
    temporaryFontSize = await output.locator('h1').evaluate(node => getComputedStyle(node).fontSize);
    if (temporaryFontSize === '55px') break;
    await page.waitForTimeout(100);
  }
  if (temporaryFontSize !== '55px') throw new Error('پیش‌نمایش موقت ویرایش دوم اعمال نشد.');
  await remoteVisual.locator('#remoteTargetCancel').click();
  await page.waitForFunction(() => document.getElementById('visual-frame').hidden && !document.getElementById('editor-frame').hidden, null, { timeout: 10000 });
  let restoredFontSize = '';
  for (let attempt = 0; attempt < 30; attempt++) {
    restoredFontSize = await output.locator('h1').evaluate(node => getComputedStyle(node).fontSize);
    if (restoredFontSize === '40px') break;
    await page.waitForTimeout(100);
  }
  if (restoredFontSize !== '40px') throw new Error('انصراف از ویرایش، استایل قبلی المان را بازنگرداند.');
  const htmlAfterCancel = await editor.locator('#panel-html textarea').inputValue();
  if (!/font-size:\s*40px\s*!important/i.test(htmlAfterCancel) || /font-size:\s*55px\s*!important/i.test(htmlAfterCancel)) {
    throw new Error('انصراف نباید کد ذخیره‌شدهٔ HTML را تغییر دهد.');
  }

  if (runtimeErrors.length) throw new Error('خطای زمان اجرا: ' + runtimeErrors.join(' | '));
  console.log('آزمون مرورگر موفق بود: بارگذاری هر دو iframe، باز و بسته‌شدن تنظیمات Editor، انتخاب المان و بازشدن پنل ویژگی‌های Visual Editor، و localStorage بررسی شدند.');
} finally {
  if (browser) await browser.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
