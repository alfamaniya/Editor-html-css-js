#!/usr/bin/env node
/**
 * ساخت نسخهٔ مستقل Visual Editor با جاسازی CSS و JavaScript در یک HTML.
 * فایل‌های داخل src/features/visual-editor مرجع اصلی باقی می‌مانند.
 */
import { readFile, writeFile, rename, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const base = 'src/features/visual-editor/';
const htmlFile = base + 'visual-editor.html';
const assets = [
  { path: base + 'visual-editor.css', tag: 'style', pattern: /<link\s+rel=["']stylesheet["']\s+href=["']\.\/visual-editor\.css["']\s*>/i },
  { path: base + 'visual-editor-session.js', tag: 'script', pattern: /<script\s+src=["']\.\/visual-editor-session\.js["']\s+defer\s*>\s*<\/script>/i },
  { path: base + 'visual-editor.js', tag: 'script', pattern: /<script\s+src=["']\.\/visual-editor\.js["']\s+defer\s*>\s*<\/script>/i },
  { path: base + 'visual-editor-remote.js', tag: 'script', pattern: /<script\s+src=["']\.\/visual-editor-remote\.js["']\s+defer\s*>\s*<\/script>/i }
];
const output = resolve(root, 'standalone-visual-editor.html');
const temporary = output + '.tmp';

function escapeInline(content, tag) {
  const close = tag === 'script' ? /<\/script/gi : /<\/style/gi;
  return content.replace(close, match => '<' + String.fromCharCode(92) + '/' + match.slice(2));
}
function once(source, pattern, replacement, label) {
  const matches = source.match(new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g')) || [];
  if (matches.length !== 1) throw new Error(label + ': دقیقاً یک ارجاع لازم است؛ تعداد یافت‌شده ' + matches.length);
  return source.replace(pattern, replacement);
}
async function main() {
  let html = await readFile(resolve(root, htmlFile), 'utf8');
  if (!html.trim() || !/<!doctype\s+html\s*>/i.test(html)) throw new Error('سند HTML منبع معتبر نیست.');
  const expected = new Map();
  for (const asset of assets) {
    const source = await readFile(resolve(root, asset.path), 'utf8');
    if (!source.trim()) throw new Error('فایل منبع خالی است: ' + asset.path);
    const embedded = escapeInline(source, asset.tag);
    const marker = 'data-bundled-from="' + asset.path + '"';
    const replacement = asset.tag === 'style'
      ? '<style ' + marker + '>\n' + embedded + '\n</style>'
      : '<script ' + marker + '>\n' + embedded + '\n</script>';
    html = once(html, asset.pattern, replacement, 'ارجاع منبع ' + asset.path);
    expected.set(asset.path, embedded);
  }
  if (/\b(?:src|href)=["'](?:\.\/)?(?:visual-editor\.css|visual-editor\.js|visual-editor-session\.js|visual-editor-remote\.js)["']/i.test(html)) {
    throw new Error('پس از ساخت، ارجاع خارجی به فایل‌های Visual Editor باقی مانده است.');
  }
  for (const [path, content] of expected) {
    const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp('<(?:style|script)\\b[^>]*data-bundled-from="' + escaped + '"[^>]*>([\\s\\S]*?)<\\/(?:style|script)\\s*>', 'i');
    const match = html.match(pattern);
    if (!match || match[1] !== '\n' + content + '\n') throw new Error('محتوای جاسازی‌شده با منبع برابر نیست: ' + path);
  }
  await rm(temporary, { force: true });
  await writeFile(temporary, html, 'utf8');
  await rename(temporary, output);
  console.log('نسخهٔ مستقل Visual Editor ساخته شد: ' + output + ' (' + Buffer.byteLength(html, 'utf8') + ' بایت)');
}
main().catch(async error => {
  console.error('ساخت نسخهٔ مستقل Visual Editor ناموفق بود:', error);
  await rm(temporary, { force: true }).catch(() => {});
  process.exitCode = 1;
});
