#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync('settings.js', 'utf8');

function extractRegistration(startAnchor, endMarker, description) {
    const anchor = source.indexOf(startAnchor);
    const start = source.indexOf("document.addEventListener('keydown', function (event) {", anchor);
    const end = source.indexOf(endMarker, start);
    assert.ok(anchor >= 0 && start > anchor && end > start,
        'Could not locate ' + description + '.');
    return source.slice(start, end + '\n        });'.length);
}

const parentRegistration = extractRegistration(
    'const previewNowButton',
    '\n    });\n\n    if (systemThemeMedia)',
    'the settings screen keyboard handler'
);
const childRegistration = extractRegistration(
    "closeButton.addEventListener('click', closeQuickInsertModal);",
    '\n        });\n\n        function resetQuickInsertEditor()',
    'the quick-insert dialog keyboard handler'
);

let parentCloseCount = 0;
let parentHandler;
const settingsScreen = {
    hidden: false,
    querySelectorAll() { return []; },
    contains() { return false; }
};
const parentDocument = {
    activeElement: null,
    addEventListener(type, callback) {
        assert.equal(type, 'keydown');
        parentHandler = callback;
    }
};
vm.runInNewContext(parentRegistration, {
    document: parentDocument,
    settingsScreen,
    returnToCodingScreen() { parentCloseCount++; }
});
assert.equal(typeof parentHandler, 'function', 'Parent keyboard handler was not registered.');

function sendParentKey(key, dialog) {
    let prevented = false;
    parentDocument.activeElement = { closest() { return dialog; } };
    parentHandler({ key, shiftKey: false, preventDefault() { prevented = true; } });
    return prevented;
}

const nestedDialog = { hidden: false };
assert.equal(sendParentKey('Escape', nestedDialog), false,
    'The parent settings handler must not consume Escape inside a child dialog.');
assert.equal(parentCloseCount, 0,
    'Escape inside a child dialog must not close the parent settings screen.');
assert.equal(sendParentKey('Tab', nestedDialog), false,
    'The parent focus trap must not intercept Tab inside a child dialog.');
assert.equal(parentCloseCount, 0,
    'Tab handling inside a child dialog must not close the parent settings screen.');
assert.equal(sendParentKey('Escape', settingsScreen), true,
    'Escape in the settings screen should remain available to close settings.');
assert.equal(parentCloseCount, 1,
    'Escape in the settings screen should close it exactly once.');

let childHandler;
let childCloseCount = 0;
let focused = '';
const first = {
    hidden: false,
    getAttribute() { return null; },
    getClientRects() { return [{}]; },
    focus() { focused = 'first'; childDocument.activeElement = first; }
};
const last = {
    hidden: false,
    getAttribute() { return null; },
    getClientRects() { return [{}]; },
    focus() { focused = 'last'; childDocument.activeElement = last; }
};
const managerCard = {
    querySelectorAll() { return [first, last]; },
    contains(element) { return element === this || element === first || element === last; },
    focus() { focused = 'managerCard'; childDocument.activeElement = managerCard; }
};
const modalOverlay = { hidden: false };
const childDocument = {
    activeElement: managerCard,
    addEventListener(type, callback) {
        assert.equal(type, 'keydown');
        childHandler = callback;
    }
};
vm.runInNewContext(childRegistration, {
    document: childDocument,
    modalOverlay,
    managerCard,
    closeQuickInsertModal() { childCloseCount++; }
});
assert.equal(typeof childHandler, 'function', 'Child dialog keyboard handler was not registered.');

function sendChildKey(key, activeElement, shiftKey = false) {
    let prevented = false;
    childDocument.activeElement = activeElement;
    childHandler({ key, shiftKey, preventDefault() { prevented = true; } });
    return prevented;
}

assert.equal(sendChildKey('Tab', last), true,
    'Tab at the last child-dialog control should wrap to the first control.');
assert.equal(focused, 'first', 'Forward Tab should focus the first control.');
assert.equal(sendChildKey('Tab', first, true), true,
    'Shift+Tab at the first child-dialog control should wrap to the last control.');
assert.equal(focused, 'last', 'Reverse Tab should focus the last control.');
assert.equal(sendChildKey('Escape', managerCard), true,
    'Escape inside the quick-insert dialog should be consumed by that dialog.');
assert.equal(childCloseCount, 1, 'Escape should request closing the child dialog exactly once.');

console.log('Passed 6 nested-dialog keyboard regression checks.');
