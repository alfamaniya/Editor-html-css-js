#!/usr/bin/env node
/**
 * Validate the generated standalone editor against every local source asset.
 */
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const sourcePath = 'index.html';
const bundlePath = 'index-test-etitor.html';
const cssFiles = ['style.css', 'settings.css', 'suggestion-manager.css', 'backup-restore.css'];
const scriptFiles = [
    'html-suggestions.js', 'css-suggestions.js', 'js-suggestions.js',
    'suggestion-manager.js', 'next-word-suggestions.js', 'preview-element-inspector.js',
    'script.js', 'settings.js', 'backup-restore.js', 'word-tree.js', 'github-update.js'
];
const expectedAssets = [...cssFiles, ...scriptFiles];
const voidTags = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

function assert(condition, message) {
    if (!condition) throw new Error(message);
}
function readText(path) {
    const content = readFileSync(path, 'utf8');
    assert(content.trim(), 'Required file is empty: ' + path);
    return content;
}
function readAttribute(tag, name) {
    const pattern = new RegExp(
        '\\b' + name + '\\s*=\\s*(?:"([^"]*)"|\\x27([^\\x27]*)\\x27|([^\\s>]+))', 'i'
    );
    const match = tag.match(pattern);
    return match ? (match[1] ?? match[2] ?? match[3] ?? '').trim() : null;
}
function isExternal(reference) {
    return /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference);
}
function normalizePath(reference) {
    const value = reference.split(/[?#]/, 1)[0];
    let decoded;
    try { decoded = decodeURIComponent(value); }
    catch { throw new Error('Invalid percent-encoding in asset URL: ' + reference); }
    return decoded.replace(/\\/g, '/').replace(/^\/+/, '');
}

// Parse markup without scanning inside script/style text or code examples.
function assetReferences(markup) {
    const found = [];
    const tagPattern = /<!--[\s\S]*?-->|<![^>]*>|<\?[\s\S]*?\?>|<\/?([a-zA-Z][\w:.-]*)\b[^>]*>/g;
    let match;
    while ((match = tagPattern.exec(markup)) !== null) {
        const token = match[0];
        if (token.startsWith('<!--') || token.startsWith('<!') || token.startsWith('<?')) continue;
        const name = match[1].toLowerCase();
        const closing = /^<\s*\//.test(token);
        if (!closing && (name === 'script' || name === 'style')) {
            if (name === 'script') {
                const src = readAttribute(token, 'src');
                if (src) found.push(src);
            }
            const closeRe = new RegExp('</\\s*' + name + '\\s*>', 'ig');
            closeRe.lastIndex = tagPattern.lastIndex;
            const close = closeRe.exec(markup);
            assert(close, 'Missing closing tag for <' + name + '>.');
            tagPattern.lastIndex = close.index + close[0].length;
            continue;
        }
        if (!closing && name === 'link') {
            const href = readAttribute(token, 'href');
            if (href) found.push(href);
        }
    }
    return found;
}

function safeInlineCode(source, tagName) {
    const prefix = '<' + String.fromCharCode(92) + '/';
    const closePattern = tagName === 'script' ? /<\/script/gi : /<\/style/gi;
    return source.replace(closePattern, (match) => prefix + match.slice(2));
}
function extractEmbeddedAssets(html) {
    const assets = new Map();
    const patterns = [
        /<style\b[^>]*\bdata-bundled-from="([^"]+)"[^>]*>([\s\S]*?)<\/style\s*>/gi,
        /<script\b[^>]*\bdata-bundled-from="([^"]+)"[^>]*>([\s\S]*?)<\/script\s*>/gi
    ];
    for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(html)) !== null) {
            assert(!assets.has(match[1]), 'Duplicate embedded asset: ' + match[1]);
            assets.set(match[1], match[2]);
        }
    }
    const order = [];
    const markerRe = /<(?:style|script)\b[^>]*\bdata-bundled-from="([^"]+)"[^>]*>/gi;
    let marker;
    while ((marker = markerRe.exec(html)) !== null) order.push(marker[1]);
    return { assets, order };
}
function checkCss(css) {
    const stack = [];
    const pairs = { ')': '(', ']': '[', '}': '{' };
    let state = 'code', quote = '', escaped = false;
    for (let i = 0; i < css.length; i++) {
        const ch = css[i], next = css[i + 1] || '';
        if (state === 'comment') {
            if (ch === '*' && next === '/') { state = 'code'; i++; }
            continue;
        }
        if (state === 'string') {
            if (escaped) { escaped = false; continue; }
            if (ch === '\\') { escaped = true; continue; }
            if (ch === quote) state = 'code';
            continue;
        }
        if (ch === '/' && next === '*') { state = 'comment'; i++; continue; }
        if (ch === '"' || ch === "'") { state = 'string'; quote = ch; continue; }
        if (ch === '(' || ch === '[' || ch === '{') stack.push(ch);
        else if (Object.hasOwn(pairs, ch)) {
            const open = stack.pop();
            assert(open === pairs[ch], 'Unbalanced CSS delimiter at character ' + i + '.');
        }
    }
    assert(state !== 'comment' && state !== 'string', 'CSS contains an unclosed comment or string.');
    assert(stack.length === 0, 'CSS contains an unclosed delimiter.');
}
function checkHtmlStructure(html) {
    const stack = [];
    const tagPattern = /<!--[\s\S]*?-->|<![^>]*>|<\?[\s\S]*?\?>|<\/?([a-zA-Z][\w:.-]*)\b[^>]*>/g;
    let match;
    while ((match = tagPattern.exec(html)) !== null) {
        const token = match[0];
        if (token.startsWith('<!--') || token.startsWith('<!') || token.startsWith('<?')) continue;
        const name = match[1].toLowerCase();
        const closing = /^<\s*\//.test(token);
        const selfClosing = /\/\s*>$/.test(token);
        if (!closing && (name === 'script' || name === 'style')) {
            const closeRe = new RegExp('</\\s*' + name + '\\s*>', 'ig');
            closeRe.lastIndex = tagPattern.lastIndex;
            const close = closeRe.exec(html);
            assert(close, 'Missing closing tag for <' + name + '>.');
            if (!selfClosing) stack.push(name);
            tagPattern.lastIndex = close.index;
            continue;
        }
        if (voidTags.has(name) || selfClosing) {
            assert(!(closing && voidTags.has(name)), 'Void tag </' + name + '> must not have a closing tag.');
        } else if (!closing) {
            stack.push(name);
        } else {
            const open = stack.pop();
            assert(open === name, 'Closing tag </' + name + '> does not match ' + (open || 'any opening tag') + '.');
        }
    }
    assert(stack.length === 0, 'HTML has unclosed tags: ' + stack.join(', '));
}
function checkJavaScript(filename, code) {
    const result = spawnSync(process.execPath, ['--check'], { input: code, encoding: 'utf8' });
    if (result.error) throw result.error;
    assert(result.status === 0, 'Embedded JavaScript syntax failed (' + filename + '):\n' +
        (result.stderr || result.stdout || 'Node exited with status ' + result.status).trim());
}

function main() {
    const sourceHtml = readText(sourcePath);
    const bundleHtml = readText(bundlePath);
    assert(/<!doctype\s+html\s*>/i.test(bundleHtml), 'Missing HTML doctype.');
    assert(/<html\b/i.test(bundleHtml) && /<head\b/i.test(bundleHtml) &&
        /<body\b/i.test(bundleHtml) && /<\/body\s*>/i.test(bundleHtml) &&
        /<\/html\s*>/i.test(bundleHtml), 'Missing required HTML document structure.');

    const sourceRefs = assetReferences(sourceHtml);
    assert(sourceRefs.every((ref) => !isExternal(ref)),
        'The source HTML depends on an external script or linked asset.');
    assert(JSON.stringify(sourceRefs.map(normalizePath)) === JSON.stringify(expectedAssets),
        'Source asset list/order changed; update the standalone builder and checker manifest.');

    const remainingRefs = assetReferences(bundleHtml);
    assert(remainingRefs.length === 0,
        'Standalone HTML still contains script/link references: ' + remainingRefs.join(', '));

    const embedded = extractEmbeddedAssets(bundleHtml);
    assert(JSON.stringify(embedded.order) === JSON.stringify(expectedAssets),
        'Embedded assets are missing, duplicated, or in a different load order.');
    assert(embedded.assets.size === expectedAssets.length,
        'Expected ' + expectedAssets.length + ' embedded assets; found ' + embedded.assets.size + '.');

    const expectedContent = new Map();
    for (const filename of cssFiles) expectedContent.set(filename, safeInlineCode(readText(filename), 'style'));
    for (const filename of scriptFiles) expectedContent.set(filename, safeInlineCode(readText(filename), 'script'));

    for (const [filename, content] of expectedContent) {
        assert(embedded.assets.has(filename), 'Missing embedded asset: ' + filename);
        assert(embedded.assets.get(filename) === '\n' + content + '\n',
            'Embedded asset differs from source: ' + filename);
        if (filename.endsWith('.js')) checkJavaScript(filename, embedded.assets.get(filename));
    }

    for (const filename of cssFiles) checkCss(embedded.assets.get(filename));
    checkHtmlStructure(bundleHtml);

    for (const id of [
        'tab-html', 'tab-css', 'tab-js', 'output', 'fileExplorer',
        'btnDownload', 'btnReset', 'btnClear', 'btnClearAll',
        'helpPanel', 'libsPanel', 'wordTreeModal', 'settingsScreen', 'btnSettingsSaveReturn'
    ]) {
        assert(sourceHtml.includes('id="' + id + '"') && bundleHtml.includes('id="' + id + '"'),
            'Core editor control is missing from standalone output: ' + id);
    }

    console.log('Standalone editor validation passed: HTML structure, CSS delimiters, ' +
        expectedAssets.length + ' embedded assets and ' + scriptFiles.length + ' JavaScript syntax checks.');
}

try {
    main();
} catch (error) {
    console.error('Standalone editor validation failed: ' + error.message);
    process.exitCode = 1;
}
