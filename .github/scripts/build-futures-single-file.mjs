#!/usr/bin/env node
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve, sep } from 'node:path';

const root = resolve('futures');
const output = resolve('dist/futures-preview.html');

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

function sourceLabel(file) {
  return relative(process.cwd(), file).split(sep).join('/');
}

function escapeAttribute(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

async function main() {
  const files = (await walk(root)).sort();
  const rootHtml = resolve(root, 'index.html');
  const rootCss = resolve(root, 'style.css');
  const rootJs = resolve(root, 'script.js');

  for (const required of [rootHtml, rootCss, rootJs]) {
    if (!files.includes(required)) throw new Error('فایل ضروری پیدا نشد: ' + sourceLabel(required));
  }

  const html = await readFile(rootHtml, 'utf8');
  const cssFiles = [rootCss, ...files.filter(file => file.endsWith('.css') && file !== rootCss)];
  const jsFiles = [rootJs, ...files.filter(file => file.endsWith('.js') && file !== rootJs)];
  const moduleHtmlFiles = files.filter(file => file.endsWith('.html') && file !== rootHtml);

  const css = (await Promise.all(cssFiles.map(async file =>
    '/* ===== ' + sourceLabel(file) + ' ===== */\n' + await readFile(file, 'utf8')
  ))).join('\n\n');

  const js = (await Promise.all(jsFiles.map(async file =>
    '// ===== ' + sourceLabel(file) + ' =====\n' + (await readFile(file, 'utf8')).replace(/<\/script/gi, '<\\/script')
  ))).join('\n\n');

  const cssLink = /<link\s+rel="stylesheet"\s+href="\.\/style\.css"\s*>/i;
  const jsTag = /<script\s+src="\.\/script\.js"><\/script>/i;
  if (!cssLink.test(html)) throw new Error('لینک style.css در futures/index.html پیدا نشد.');
  if (!jsTag.test(html)) throw new Error('لینک script.js در futures/index.html پیدا نشد.');

  const inlineCss = '<style>\n' + css + '\n</style>';
  const inlineJs = '<script>\n' + js + '\n</script>';
  let result = html.replace(cssLink, inlineCss);

  const templates = await Promise.all(moduleHtmlFiles.map(async file => {
    const name = escapeAttribute(relative(root, file).split(sep).join('/'));
    const fragment = await readFile(file, 'utf8');
    return '\n<template data-futures-module="' + name + '">\n' + fragment + '\n</template>';
  }));

  result = result.replace(jsTag, templates.join('') + '\n' + inlineJs);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, result, 'utf8');
  console.log('فایل یکپارچه ساخته شد: ' + output);
  console.log('HTML fragments: ' + moduleHtmlFiles.length + ' | CSS files: ' + cssFiles.length + ' | JS files: ' + jsFiles.length);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
