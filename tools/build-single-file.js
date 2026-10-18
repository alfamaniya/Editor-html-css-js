#!/usr/bin/env node
'use strict';

// Builds index-test-etitor.html by inlining the app's local CSS and JavaScript.
// Run with: node tools/build-single-file.js
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'index.html');
const outputPath = path.join(root, 'index-test-etitor.html');
let html = fs.readFileSync(sourcePath, 'utf8');

const assets = [
  { tag: /<link\s+rel=["']stylesheet["']\s+href=["']style\.css["']\s*\/?>/i, file: 'style.css', type: 'style' },
  { tag: /<script\s+src=["']html-suggestions\.js["']\s*>\s*<\/script>/i, file: 'html-suggestions.js', type: 'script' },
  { tag: /<script\s+src=["']css-suggestions\.js["']\s*>\s*<\/script>/i, file: 'css-suggestions.js', type: 'script' },
  { tag: /<script\s+src=["']js-suggestions\.js["']\s*>\s*<\/script>/i, file: 'js-suggestions.js', type: 'script' },
  { tag: /<script\s+src=["']next-word-suggestions\.js["']\s*>\s*<\/script>/i, file: 'next-word-suggestions.js', type: 'script' },
  { tag: /<script\s+src=["']script\.js["']\s*>\s*<\/script>/i, file: 'script.js', type: 'script' }
  { tag: /<script\s+src=["']word-tree\.js["']\s*>\s*<\/script>/i, file: 'word-tree.js', type: 'script' }
];

for (const asset of assets) {
  const match = html.match(asset.tag);
  if (!match) throw new Error('Could not find asset reference in index.html: ' + asset.file);
  const content = fs.readFileSync(path.join(root, asset.file), 'utf8');
  const safeContent = content.replace(/<\/script/gi, '<\\/script');
  const inline = asset.type === 'style'
    ? '<style>\n/* Bundled from ' + asset.file + ' */\n' + safeContent + '\n</style>'
    : '<script>\n/* Bundled from ' + asset.file + ' */\n' + safeContent + '\n</script>';
  html = html.replace(match[0], inline);
}

html = html.replace(/<title>[^<]*<\/title>/i, '<title>HTML Editor — Single File Test</title>');
html = html.replace('</head>', '  <meta name="generated-single-file" content="true">\n</head>');
fs.writeFileSync(outputPath, html, 'utf8');
console.log('Built index-test-etitor.html from index.html and 7 local assets.');
