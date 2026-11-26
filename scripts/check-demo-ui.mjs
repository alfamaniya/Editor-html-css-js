import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const html = readFileSync('index 2.html', 'utf8');
assert.doesNotMatch(html, /<a\b[^>]*href=["']#["']/i,
    'Navigation placeholders must not use href="#".');
assert.match(html, /class="[^"]*nav-link-placeholder[^"]*"[^>]*aria-disabled="true"/,
    'Sidebar placeholder items must be visibly marked unavailable.');
assert.match(html, /class="footer-link-placeholder" aria-disabled="true"/,
    'Footer placeholder items must be visibly marked unavailable.');

const unavailable = [
    'Undo', 'Redo', 'Download', 'Clear all tabs', 'Factory reset',
    'Search', 'Settings', 'Help', 'Refresh', 'Run', 'Copy', 'Share', 'Fullscreen'
];
const buttons = [...html.matchAll(/<button\b[^>]*>/g)].map(match => match[0]);
for (const label of unavailable) {
    const button = buttons.find(tag => tag.includes('aria-label="' + label + '"'));
    assert.ok(button, 'Expected demo control was not found: ' + label);
    assert.match(button, /\sdisabled(?:\s|>)/,
        'Unimplemented demo control must be disabled: ' + label);
}
assert.match(html, /id="importBtn"/, 'The working HTML import control must remain available.');
assert.match(html, /id="leftToggle"/, 'The working left sidebar toggle must remain available.');
assert.match(html, /id="rightToggle"/, 'The working right sidebar toggle must remain available.');

assert.ok(html.includes('href="index-2.css"'), 'Standalone demo must load its external stylesheet.');
assert.ok(html.includes('src="index-2.js"'), 'Standalone demo must load its external JavaScript.');
assert.match(html, /<script[^>]*defer[^>]*><\/script>/i, 'External JavaScript must be deferred until HTML parsing completes.');
assert.doesNotMatch(html, /<style\b/i, 'Standalone demo styles must not remain inline.');
assert.doesNotMatch(html, /<script\b(?![^>]*\bsrc=)[^>]*>/i, 'Standalone demo behavior must not remain inline.');
assert.ok(existsSync('index-2.css'), 'Standalone demo stylesheet is missing.');
assert.ok(existsSync('index-2.js'), 'Standalone demo JavaScript is missing.');
assert.match(readFileSync('index-2.css', 'utf8'), /:root\s*\{/, 'Standalone demo stylesheet must contain its theme variables.');
assert.match(readFileSync('index-2.js', 'utf8'), /buildDocument|makeSidebar/, 'Standalone demo JavaScript must contain its interactive behavior.');

console.log('Standalone demo controls and navigation placeholders are safely marked.');
