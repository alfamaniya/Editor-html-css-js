import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

for (const file of ['locales/en.js', 'locales/fa.js']) {
    const source = readFileSync(file, 'utf8');
    const keys = new Set();
    const duplicates = [];
    for (const [index, line] of source.split(/\r?\n/).entries()) {
        const match = line.match(/^\s*"((?:[^"\\]|\\.)+)"\s*:/);
        if (!match) continue;
        const key = match[1];
        if (keys.has(key)) duplicates.push({ key, line: index + 1 });
        keys.add(key);
    }
    assert.deepEqual(duplicates, [], file + ' contains duplicate translation keys: ' +
        duplicates.map(item => item.key + ' (line ' + item.line + ')').join(', '));
}

console.log('Locale files contain no duplicate translation keys.');
