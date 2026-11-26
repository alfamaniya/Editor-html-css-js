import { spawnSync } from 'node:child_process';

const commands = [
    ['Build standalone editor', ['scripts/build-test-editor.mjs']],
    ['Check index integrity', ['scripts/check-index-integrity.mjs']],
    ['Check standalone output', ['scripts/check-standalone-editor.mjs']],
    ['Check editor code processing', ['scripts/check-editor-code-processing.mjs']],
    ['Check backup and restore', ['scripts/check-backup-restore.mjs']],
    ['Check color picker', ['scripts/check-color-picker.mjs']],
    ['Check editor overlay alignment', ['scripts/check-editor-overlay-alignment.mjs']],
    ['Check settings button placement', ['scripts/check-settings-button-placement.mjs']],
    ['Check settings dialog keyboard behavior', ['scripts/check-settings-dialog-keyboard.mjs']],
];

let failed = false;
for (const [label, args] of commands) {
    console.log('\n▶ ' + label);
    const result = spawnSync(process.execPath, args, { stdio: 'inherit' });
    if (result.error) {
        console.error(result.error);
        failed = true;
        break;
    }
    if (result.status !== 0) {
        console.error('✖ ' + label + ' failed with exit code ' + result.status);
        failed = true;
        break;
    }
    console.log('✔ ' + label);
}

if (failed) process.exit(1);
console.log('\nAll editor checks passed.');
