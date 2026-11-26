import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

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

console.log('Standalone demo controls and navigation placeholders are safely marked.');
