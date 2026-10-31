#!/usr/bin/env node
/**
 * اعتبارسنجی نسخهٔ مستقل Visual Editor در برابر تمام منابع مرجع.
 */
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const htmlPath = 'src/features/visual-editor/visual-editor.html';
const bundlePath = 'standalone-visual-editor.html';
const assets = [
  ['src/features/visual-editor/visual-editor.css', 'style'],
  ['src/features/visual-editor/visual-editor-session.js', 'script'],
  ['src/features/visual-editor/visual-editor.js', 'script'],
  ['src/features/visual-editor/visual-editor-remote.js', 'script']
];
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const read = path => {
  const value = readFileSync(path, 'utf8');
  assert(value.trim(), 'فایل خالی است: ' + path);
  return value;
};
const safe = (value, tag) => value.replace(tag === 'script' ? /<\/script/gi : /<\/style/gi,
  match => '<' + String.fromCharCode(92) + '/' + match.slice(2));

function main() {
  const source = read(htmlPath);
  const html = read(bundlePath);
  assert(/<!doctype\s+html\s*>/i.test(html), 'DOCTYPE در خروجی وجود ندارد.');
  assert(/<html\b/i.test(html) && /<head\b/i.test(html) && /<body\b/i.test(html) &&
    /<\/body\s*>/i.test(html) && /<\/html\s*>/i.test(html), 'ساختار کامل سند HTML وجود ندارد.');
  assert(/Visual Builder Studio/.test(html), 'عنوان Visual Editor در خروجی نیست.');
  assert(/id=["']propsPanel["']/.test(html) && /id=["']canvas["']/.test(html) &&
    /id=["']styleControls["']/.test(html), 'بخش‌های اصلی محیط ویرایش در خروجی ناقص‌اند.');
  assert(!/\b(?:src|href)=["'](?:\.\/)?(?:visual-editor\.css|visual-editor\.js|visual-editor-session\.js|visual-editor-remote\.js)["']/i.test(html),
    'ارجاع خارجی به منابع Visual Editor باقی مانده است.');

  for (const [path, tag] of assets) {
    const content = safe(read(path), tag);
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp('<(?:style|script)\\b[^>]*data-bundled-from="' + escaped + '"[^>]*>([\\s\\S]*?)<\\/(?:style|script)\\s*>', 'i');
    const match = html.match(pattern);
    assert(match && match[1] === '\n' + content + '\n', 'منبع جاسازی‌شده با فایل اصلی مطابقت ندارد: ' + path);
    if (path.endsWith('.js')) {
      const result = spawnSync(process.execPath, ['--check'], { input: content, encoding: 'utf8' });
      assert(result.status === 0, 'خطای نحو JavaScript در ' + path + ':\n' + (result.stderr || result.stdout));
    }
  }
  assert((html.match(/data-bundled-from=/g) || []).length === assets.length,
    'تعداد منابع جاسازی‌شده صحیح نیست یا منبع تکراری وجود دارد.');
  console.log('اعتبارسنجی Visual Editor مستقل موفق بود: ساختار HTML، چهار منبع جاسازی‌شده و نحو JavaScript بررسی شدند.');
}
try { main(); } catch (error) {
  console.error('اعتبارسنجی Visual Editor مستقل ناموفق بود: ' + error.message);
  process.exitCode = 1;
}
