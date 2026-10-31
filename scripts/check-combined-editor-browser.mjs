#!/usr/bin/env node
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const file = resolve('editor v.html');
const html = await readFile(file);
const indexHtml = await readFile(resolve('index.html'));
const server = createServer((request, response) => {
  if (request.url === '/' || request.url === '/index.html' || request.url.startsWith('/Editor-html-css-js/')) {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'content-length': indexHtml.length });
    response.end(indexHtml);
    return;
  }
  if (request.url === '/editor%20v.html') {
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
  const rootPage = await browser.newPage();
  const sourcePageUrl = 'http://127.0.0.1:4173/Editor-html-css-js/';
  await rootPage.goto(sourcePageUrl, { waitUntil: 'domcontentloaded' });
  if (rootPage.url() !== sourcePageUrl) {
    throw new Error('نشانی اصلی باید روی index.html باقی بماند و به فایل آزمایشی منتقل نشود.');
  }
  if (await rootPage.locator('#btnVisualEditorPick').count() !== 1) {
    throw new Error('صفحهٔ اصلی باید رابط Editor مبتنی بر index.html را نمایش دهد.');
  }
  await rootPage.close();

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
  if (await page.locator('.topbar').count()) throw new Error('هدر بالایی پوسته باید حذف شده باشد.');
  await editor.locator('#languageToggleButton').waitFor({ state: 'visible' });
  if (await editor.locator('html').getAttribute('lang') !== 'fa') {
    throw new Error('زبان پیش‌فرض رابط باید فارسی باشد.');
  }
  await editor.locator('#languageToggleButton').click();
  await page.waitForFunction(() => {
    const frame = document.getElementById('editor-frame');
    return frame?.contentDocument?.documentElement.dataset.language === 'en';
  });
  const removedMenus = ['fileMenu', 'editMenu', 'viewMenu', 'helpMenu'];
  for (const menuId of removedMenus) {
    if (await editor.locator('[aria-controls="' + menuId + '"]').count() !== 0) {
      throw new Error('منوی قدیمی باید از نوار بالایی حذف شده باشد: ' + menuId);
    }
  }
  const visualEditorPageLink = editor.locator('.app-menu-bar a[href="src/features/visual-editor/visual-editor.html"]');
  if (await visualEditorPageLink.count() !== 1 ||
      (await visualEditorPageLink.innerText()).trim() !== 'Visual Editor Page') {
    throw new Error('پیوند میانی باید با عنوان Visual Editor Page نمایش داده شود.');
  }
  await editor.locator('#languageToggleButton').click();
  await page.waitForFunction(() => {
    const frame = document.getElementById('editor-frame');
    return frame?.contentDocument?.documentElement.dataset.language === 'fa';
  });
  await editor.locator('#workspaceModeSwitch [data-workspace-mode="visual"]').waitFor({ state: 'visible' });
  if (await editor.locator('.workspace-brand').count() !== 0) {
    throw new Error('برند و عنوان قدیمی باید از هدر اصلی حذف شده باشند.');
  }
  await editor.locator('#btnSettings').click();
  if (!await editor.locator('#settingsScreen').isVisible()) {
    throw new Error('پنجرهٔ تنظیمات Editor پس از کلیک باز نشد.');
  }
  await editor.locator('#btnSettingsSaveReturn').click();
  if (await editor.locator('#settingsScreen').isVisible()) {
    throw new Error('پنجرهٔ تنظیمات Editor پس از ذخیره بسته نشد.');
  }

  await editor.locator('#workspaceModeSwitch [data-workspace-mode="visual"]').click();
  await page.waitForFunction(() => document.getElementById('visual-frame').hidden === false);
  const visual = page.frameLocator('#visual-frame');
  await visual.locator('#workspaceModeBar [data-workspace-mode="visual"]').waitFor({ state: 'visible' });
  if (await visual.locator('html').getAttribute('lang') !== 'fa') {
    throw new Error('Visual Editor زبان انتخاب‌شده در هدر اصلی را به ارث نبرد.');
  }
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
  await visual.locator('#workspaceModeBar [data-workspace-mode="editor"]').click();
  await page.waitForFunction(() => document.getElementById('editor-frame').hidden === false);
  const output = editor.frameLocator('#output');
  await output.locator('h1').waitFor();
  const visualPicker = editor.locator('#btnVisualEditorPick');
  if (await visualPicker.locator('svg.visual-editor-pick-icon').count() !== 1 ||
      (await visualPicker.innerText()).trim() !== 'ویرایش بصری') {
    throw new Error('دکمهٔ ویرایش بصری باید آیکون مداد و برچسب خوانا داشته باشد.');
  }
  const pickerLayout = await visualPicker.evaluate(button => ({ width: button.getBoundingClientRect().width, contentWidth: button.scrollWidth }));
  if (pickerLayout.width < 110 || pickerLayout.contentWidth > pickerLayout.width + 1) {
    throw new Error('آیکون و برچسب دکمهٔ ویرایش بصری باید داخل قاب دکمه جا شوند.');
  }
  await visualPicker.click();
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
  const remoteUi = await remoteVisual.locator('#externalTargetBar').evaluate(node => ({ html: node.outerHTML, buttons: Array.from(node.querySelectorAll('button')).map(button => ({ id: button.id, text: button.textContent, disabled: button.disabled })) }));
  console.log('گزارش رابط ثبت ویرایش بصری: ' + JSON.stringify(remoteUi));
  if (!remoteUi.buttons.some(button => button.id === 'remoteTargetApply')) throw new Error('دکمهٔ ثبت در نوار Visual Editor بعد از اعمال تغییر زنده حذف شده است.');
  await remoteVisual.locator('#remoteTargetApply').click();
  await page.waitForFunction(() => document.getElementById('visual-frame').hidden && !document.getElementById('editor-frame').hidden, null, { timeout: 10000 });
  await page.waitForFunction(() => document.getElementById('visual-frame').dataset.ready === 'true', null, { timeout: 10000 });
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
  const secondRemoteState = await remoteVisual.locator('#externalTargetBar').evaluate(node => {
    const copy = document.querySelector('.external-preview-shell > *');
    return {
      toolbar: node.outerHTML,
      previewStyle: copy?.getAttribute('style') || '',
      previewFontSize: copy ? getComputedStyle(copy).fontSize : '',
      appClass: document.querySelector('.app')?.className || '',
      ready: document.documentElement.dataset.visualEditorReady || ''
    };
  });
  const secondMainState = await output.locator('h1').evaluate(node => ({
    style: node.getAttribute('style') || '',
    fontSize: getComputedStyle(node).fontSize
  }));
  console.log('گزارش نشست دوم ویرایش بصری: ' + JSON.stringify({ secondRemoteState, secondMainState }));
  let temporaryFontSize = '';
  let styleAckStatus = '';
  for (let attempt = 0; attempt < 30; attempt++) {
    temporaryFontSize = await output.locator('h1').evaluate(node => getComputedStyle(node).fontSize);
    styleAckStatus = await remoteVisual.locator('#externalTargetStatus').textContent();
    if (temporaryFontSize === '55px' || /رد کرد|نپذیرفت/.test(styleAckStatus)) break;
    await page.waitForTimeout(100);
  }
  console.log('وضعیت تأیید تغییر نشست دوم: ' + styleAckStatus);

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
