#!/usr/bin/env node
/**
 * Build index-test-etitor.html as a self-contained copy of the editor.
 *
 * The source HTML, stylesheet, and script files remain authoritative.
 * The build fails if an asset is missing, duplicated, external, left unbundled,
 * or different from the source content embedded into the output.
 */
import { readFile, writeFile, rename, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = resolve(root, 'index.html');
const cssPath = resolve(root, 'style.css');
const outputPath = resolve(root, 'index-test-etitor.html');
const temporaryPath = outputPath + '.tmp';

const scriptFiles = [
    'html-suggestions.js',
    'css-suggestions.js',
    'js-suggestions.js',
    'next-word-suggestions.js',
    'script.js',
    'word-tree.js',
    'github-update.js'
];
const expectedAssetOrder = ['style.css', ...scriptFiles];

async function readText(path) {
    const content = await readFile(path, 'utf8');
    if (!content.trim()) throw new Error('Required source file is empty: ' + path);
    return content;
}

function replaceExactlyOnce(source, regex, replacement, label) {
    const flags = regex.flags.includes('g') ? regex.flags : regex.flags + 'g';
    const matches = source.match(new RegExp(regex.source, flags)) || [];
    if (matches.length !== 1) {
        throw new Error('Expected exactly one ' + label + '; found ' + matches.length + '.');
    }
    return source.replace(regex, () => replacement);
}

function escapeInlineScript(source) {
    // One backslash protects the HTML parser boundary while preserving JS semantics.
    const escapedClosingTag = '<' + String.fromCharCode(92) + '/';
    return source.replace(/<\/script/gi, (match) => escapedClosingTag + match.slice(2));
}

function escapeInlineStyle(source) {
    // Prevent a CSS string/comment from ending the generated style element.
    const escapedClosingTag = '<' + String.fromCharCode(92) + '/';
    return source.replace(/<\/style/gi, (match) => escapedClosingTag + match.slice(2));
}

function readAttribute(tag, name) {
    const pattern = new RegExp(
        '\\b' + name + '\\s*=\\s*(?:"([^"]*)"|\\x27([^\\x27]*)\\x27|([^\\s>]+))',
        'i'
    );
    const match = tag.match(pattern);
    return match ? (match[1] ?? match[2] ?? match[3] ?? '').trim() : null;
}

function isExternalReference(reference) {
    return /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference);
}

function normalizeReference(reference) {
    const withoutQueryOrHash = reference.split(/[?#]/, 1)[0];
    let decoded;
    try {
        decoded = decodeURIComponent(withoutQueryOrHash);
    } catch {
        throw new Error('A local asset URL contains invalid percent-encoding: ' + reference);
    }
    return decoded.replace(/\\/g, '/').replace(/^\/+/, '');
}

// Read actual markup tags while skipping script/style bodies. This prevents
// HTML-looking strings in JavaScript examples from being mistaken for page markup.
function collectAssetReferences(markup) {
    const references = [];
    const tagPattern = /<!--[\s\S]*?-->|<![^>]*>|<\?[\s\S]*?\?>|<\/?([a-zA-Z][\w:.-]*)\b[^>]*>/g;
    let match;

    while ((match = tagPattern.exec(markup)) !== null) {
        const token = match[0];
        if (token.startsWith('<!--') || token.startsWith('<!') || token.startsWith('<?')) continue;

        const name = match[1].toLowerCase();
        const closing = /^<\s*\//.test(token);

        if (!closing && (name === 'script' || name === 'style')) {
            if (name === 'script') {
                const reference = readAttribute(token, 'src');
                if (reference) references.push({ kind: 'script', reference });
            }

            const closePattern = new RegExp('</\\s*' + name + '\\s*>', 'ig');
            closePattern.lastIndex = tagPattern.lastIndex;
            const close = closePattern.exec(markup);
            if (!close) throw new Error('Missing closing tag for <' + name + '>.');
            tagPattern.lastIndex = close.index + close[0].length;
            continue;
        }

        if (!closing && name === 'link') {
            const reference = readAttribute(token, 'href');
            if (reference) references.push({ kind: 'link', reference });
        }
    }

    return references;
}

function assertSourceAssetContract(html) {
    const references = collectAssetReferences(html);
    const external = references.filter((item) => isExternalReference(item.reference));
    if (external.length) {
        throw new Error(
            'Standalone output must not depend on external script/link assets: ' +
            external.map((item) => item.reference).join(', ')
        );
    }

    const paths = references.map((item) => normalizeReference(item.reference));
    if (JSON.stringify(paths) !== JSON.stringify(expectedAssetOrder)) {
        throw new Error(
            'The local script/stylesheet references in index.html do not match the build manifest. ' +
            'Expected: ' + expectedAssetOrder.join(', ') + '. Found: ' + paths.join(', ') +
            '. Update the build manifest before generating the standalone file.'
        );
    }
}

function assertNoUnbundledAssets(html) {
    const references = collectAssetReferences(html);
    if (references.length) {
        throw new Error(
            'Standalone HTML still contains script/link asset references: ' +
            references.map((item) => item.reference).join(', ')
        );
    }
}

function assertEmbeddedAssetsMatch(html, expectedContent) {
    const found = new Map();
    const patterns = [
        /<style\b[^>]*\bdata-bundled-from="([^"]+)"[^>]*>([\s\S]*?)<\/style\s*>/gi,
        /<script\b[^>]*\bdata-bundled-from="([^"]+)"[^>]*>([\s\S]*?)<\/script\s*>/gi
    ];

    for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(html)) !== null) {
            const file = match[1];
            if (found.has(file)) throw new Error('The asset was embedded more than once: ' + file);
            found.set(file, match[2]);
        }
    }

    if (found.size !== expectedContent.size) {
        throw new Error(
            'Standalone asset count mismatch. Expected ' + expectedContent.size +
            ', found ' + found.size + '.'
        );
    }

    for (const [file, content] of expectedContent) {
        if (!found.has(file)) throw new Error('Missing embedded asset marker: ' + file);
        if (found.get(file) !== '\n' + content + '\n') {
            throw new Error('Embedded content does not match the source file: ' + file);
        }
    }
}

async function build() {
    let html = await readText(htmlPath);
    const css = await readText(cssPath);
    const expectedContent = new Map([['style.css', escapeInlineStyle(css)]]);

    assertSourceAssetContract(html);

    const doctype = html.match(/<!doctype\s+html\s*>/gi) || [];
    if (doctype.length !== 1) {
        throw new Error('index.html must contain exactly one HTML doctype; found ' + doctype.length + '.');
    }

    const banner = '<!-- AUTO-GENERATED by scripts/build-test-editor.mjs. Edit the source files, not this bundle. -->';
    html = replaceExactlyOnce(
        html,
        /<!doctype\s+html\s*>/i,
        doctype[0] + '\n' + banner,
        'DOCTYPE declaration'
    );

    html = replaceExactlyOnce(
        html,
        /<link\b[^>]*\bhref=["']style\.css["'][^>]*>/i,
        '<style data-bundled-from="style.css">\n' + escapeInlineStyle(css) + '\n</style>',
        'stylesheet reference to style.css'
    );

    for (const filename of scriptFiles) {
        const script = await readText(resolve(root, filename));
        const escapedFilename = filename.replace(/\./g, '\\.');
        const scriptTag = new RegExp(
            '<script\\s+src=["\\x27]' + escapedFilename + '["\\x27]\\s*>\\s*</script\\s*>',
            'i'
        );

        html = replaceExactlyOnce(
            html,
            scriptTag,
            '<script data-bundled-from="' + filename + '">\n' +
                escapeInlineScript(script) + '\n</script>',
            'script reference to ' + filename
        );
        expectedContent.set(filename, escapeInlineScript(script));
    }

    assertNoUnbundledAssets(html);
    assertEmbeddedAssetsMatch(html, expectedContent);

    await rm(temporaryPath, { force: true });
    await writeFile(temporaryPath, html, 'utf8');
    await rename(temporaryPath, outputPath);

    console.log(
        'Built and validated ' + outputPath + ' (' +
        Buffer.byteLength(html, 'utf8') + ' bytes, ' + expectedContent.size +
        ' embedded assets).'
    );
}

build().catch(async (error) => {
    console.error('Could not build the standalone test editor:', error);
    try { await rm(temporaryPath, { force: true }); } catch {}
    process.exitCode = 1;
});
