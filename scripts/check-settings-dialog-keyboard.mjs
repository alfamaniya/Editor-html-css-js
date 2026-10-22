#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync('settings.js', 'utf8');
const anchor = source.indexOf('const previewNowButton');
const start = source.indexOf("document.addEventListener('keydown', function (event) {", anchor);
const endMarker = '\n    });\n\n    if (systemThemeMedia)';
const end = source.indexOf(endMarker, start);
assert.ok(anchor >= 0 && start > anchor && end > start,
    'Could not locate the settings screen keyboard handler.');

const registration = source.slice(start, end + '\n    });'.length);
let closeCount = 0;
let handler;
const settingsScreen = {
    hidden: false,
    querySelectorAll() { return []; },
    contains() { return false; }
};
const document = {
    activeElement: null,
    addEventListener(type, callback) {
        assert.equal(type, 'keydown');
        handler = callback;
    }
};
const context = {
    document,
    settingsScreen,
    returnToCodingScreen() { closeCount++; }
};
vm.runInNewContext(registration, context);
assert.equal(typeof handler, 'function', 'Keyboard handler was not registered.');

function sendKey(key, dialog) {
    let prevented = false;
    document.activeElement = { closest() { return dialog; } };
    handler({ key, shiftKey: false, preventDefault() { prevented = true; } });
    return prevented;
}

const nestedDialog = { hidden: false };
assert.equal(sendKey('Escape', nestedDialog), false,
    'The parent settings handler must not consume Escape inside a child dialog.');
assert.equal(closeCount, 0,
    'Escape inside a child dialog must not close the parent settings screen.');

assert.equal(sendKey('Tab', nestedDialog), false,
    'The parent focus trap must not intercept Tab inside a child dialog.');
assert.equal(closeCount, 0,
    'Tab handling inside a child dialog must not close the parent settings screen.');

assert.equal(sendKey('Escape', settingsScreen), true,
    'Escape in the settings screen should remain available to close settings.');
assert.equal(closeCount, 1,
    'Escape in the settings screen should close it exactly once.');

console.log('Passed 3 nested-dialog keyboard regression checks.');
