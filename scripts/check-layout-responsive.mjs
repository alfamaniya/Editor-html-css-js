import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync('style.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const mobileDividerRules = css.match(/:root\[data-layout="side-by-side"\] \.divider\s*\{/g) || [];
assert.equal(mobileDividerRules.length, 1,
    'Mobile side-by-side layout must have one consolidated divider rule.');
assert.doesNotMatch(css, /@media\s*\(max-width:\s*768px\)[\s\S]{0,1600}:root\[data-layout="side-by-side"\] \.divider\s*\{\s*display:\s*none/,
    'The mobile divider must not be hidden by an earlier conflicting rule.');
assert.match(css, /:root\[data-layout="side-by-side"\] \.divider\s*\{[^}]*display:\s*block/s,
    'The mobile divider must remain visible and resizable.');
assert.match(css, /:root\[data-layout="side-by-side"\] \.preview-pane\s*\{[^}]*height:\s*calc\(100% - var\(--editor-pane-ratio, 50%\) - 6px\)/s,
    'The mobile preview height must account for the divider.');

console.log('Responsive editor divider and preview layout rules are consistent.');
