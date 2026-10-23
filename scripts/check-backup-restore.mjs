import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../backup-restore.js', import.meta.url), 'utf8');
const editorSource = readFileSync(new URL('../script.js', import.meta.url), 'utf8');
const exposedWindow = {};
const sandbox = {
    window: exposedWindow,
    document: { getElementById() { return null; }, querySelector() { return null; } },
    console,
};
vm.runInNewContext(source, sandbox, { filename: 'backup-restore.js' });
const tools = exposedWindow.EditorBackupTools;
assert.ok(tools, 'ابزارهای اعتبارسنجی پشتیبان باید در دسترس باشند.');

const settings = {
    theme: 'dark', accentColor: 'blue', density: 'normal', autoSaveSettings: 'on',
    fontSize: '15', lineNumbers: 'on', wrapLines: 'off', autocomplete: 'on',
    autoPreview: 'on', previewDelay: '600', splitRatio: '50', layout: 'side-by-side',
};
const valid = {
    format: 'editor-backup',
    schemaVersion: 1,
    createdAt: '2026-10-23T10:00:00.000Z',
    app: { id: 'Editor-html-css-js', name: 'ویرایشگر HTML/CSS/JavaScript' },
    sections: {
        settings: {
            values: settings,
            ui: { activeTab: 'html', fileExplorerCollapsed: null, suggestionManagerTreeWidth: 36 },
        },
        project: {
            value: {
                files: [
                    { id: 'file-html', name: 'index.html', type: 'html', content: '<h1>سلام 🌍</h1>' },
                    { id: 'file-css', name: 'style.css', type: 'css', content: 'body { color: navy; }' },
                    { id: 'file-js', name: 'script.js', type: 'js', content: 'const پیام = "سلام";' },
                ],
                activeFileId: 'file-html',
                lastActiveByLang: { html: 'file-html', css: 'file-css', js: 'file-js' },
                documentTitle: 'آزمایش فارسی',
                headExtras: '',
            },
        },
        libraries: {
            items: [{ id: 'lib-1', name: 'کتابخانهٔ سفارشی', type: 'js', code: 'const پیام = "سلام";', enabled: true }],
        },
        suggestedWords: {
            value: {
                version: 1,
                data: { cssProperties: [{ label: 'box-shadow', insert: 'box-shadow' }, { label: 'حاشیه', insert: 'border' }] },
                customBanks: [],
                categoryLabels: {},
            },
        },
        quickInsert: {
            items: {
                html: [{ id: 'quick-1', label: 'کارت', prefix: '<article>سلام</article>', suffix: '', description: 'نمونه' }],
                css: [],
                js: [],
            },
            builtinConfig: {
                html: { deleted: [], overrides: {} },
                css: { deleted: [], overrides: {} },
                js: { deleted: [], overrides: {} },
            },
        },
    },
};

const validated = tools.validateBackupPayload(JSON.parse(JSON.stringify(valid)));
assert.equal(validated.format, 'editor-backup');
assert.equal(validated.sections.project.value.files[0].content, '<h1>سلام 🌍</h1>');
assert.equal(validated.sections.suggestedWords.value.data.cssProperties[0].label, 'box-shadow');
assert.equal(validated.sections.quickInsert.items.html[0].label, 'کارت');
assert.equal(validated.sections.quickInsert.items.html[0].prefix, '<article>سلام</article>');

assert.throws(() => tools.validateBackupPayload({ ...valid, schemaVersion: 99 }), /نسخهٔ قالب/);
assert.throws(() => tools.validateBackupPayload({ ...valid, format: 'not-a-backup' }), /قالب پشتیبان/);
assert.throws(() => tools.validateBackupPayload({ ...valid, sections: { mystery: {} } }), /ناشناخته/);
const badSettings = JSON.parse(JSON.stringify(valid));
badSettings.sections.settings.values.theme = 'execute';
assert.throws(() => tools.validateBackupPayload(badSettings), /مقدار تنظیم/);
const brokenProject = JSON.parse(JSON.stringify(valid));
brokenProject.sections.project.value.activeFileId = 'missing-file';
assert.throws(() => tools.validateBackupPayload(brokenProject), /فایل فعال/);
const unsafeWords = JSON.parse(JSON.stringify(valid));
unsafeWords.sections.suggestedWords.value.data.cssProperties =
    JSON.parse('[{"label":"x","__proto__":{"polluted":true}}]');
assert.throws(() => tools.validateBackupPayload(unsafeWords), /کلید ناامن/);
const tooManyQuickItems = JSON.parse(JSON.stringify(valid));
tooManyQuickItems.sections.quickInsert.items.html = Array.from({ length: 101 }, (_, index) => ({
    id: 'id-' + index, label: 'item-' + index, prefix: 'x', suffix: '', description: '',
}));
assert.throws(() => tools.validateBackupPayload(tooManyQuickItems), /۱۰۰ آیتم/);

const mergedLibraries = tools.mergeSection('libraries',
    { items: [{ id: 'same', name: 'نسخهٔ فعلی', type: 'css', code: '.old{}', enabled: true }] },
    { items: [
        { id: 'same', name: 'نسخهٔ پشتیبان', type: 'css', code: '.new{}', enabled: false },
        { id: 'new', name: 'کتابخانهٔ تازه', type: 'js', code: 'console.log(1);', enabled: true },
    ] });
assert.equal(mergedLibraries.items.length, 2);
assert.equal(mergedLibraries.items[0].name, 'نسخهٔ فعلی');
assert.equal(mergedLibraries.items[1].id, 'new');

class MemoryStorage {
    constructor(initial) { this.data = new Map(Object.entries(initial)); this.writes = 0; this.failOnWrite = 0; }
    getItem(key) { return this.data.has(key) ? this.data.get(key) : null; }
    setItem(key, value) {
        this.writes += 1;
        if (this.failOnWrite && this.writes === this.failOnWrite) {
            this.failOnWrite = 0;
            throw new Error('خطای آزمایشی ذخیره‌سازی');
        }
        this.data.set(key, String(value));
    }
    removeItem(key) { this.data.delete(key); }
}
const goodStorage = new MemoryStorage({ a: 'old-a' });
tools.applyStorageChanges(goodStorage, { a: 'new-a', b: 'new-b' });
assert.equal(goodStorage.getItem('a'), 'new-a');
assert.equal(goodStorage.getItem('b'), 'new-b');
const failingStorage = new MemoryStorage({ a: 'old-a', b: 'old-b' });
failingStorage.failOnWrite = 2;
assert.throws(() => tools.applyStorageChanges(failingStorage, { a: 'new-a', b: 'new-b' }), /بازگردانده شدند/);
assert.equal(failingStorage.getItem('a'), 'old-a');
assert.equal(failingStorage.getItem('b'), 'old-b');

assert.doesNotMatch(source, /\beval\s*\(/, 'فایل پشتیبان نباید کد ورودی را اجرا کند.');
assert.match(editorSource, /editor-backup-project-restore-v1/,
    'بازیابی پروژه باید از مهاجرت خودکار صفحهٔ آغازین محافظت شود.');
assert.match(editorSource, /!skipLegacyStarterUpgrade\s*&&\s*isUntouchedLegacyStarter\(validFiles\)/,
    'مهاجرت خودکار نباید پروژهٔ بازیابی‌شده را بازنویسی کند.');
assert.match(source, /editor-backup-before-restore-/,
    'جایگزینی باید برای تهیهٔ پشتیبان پیش از بازیابی تلاش کند.');
console.log('آزمون‌های قالب، اعتبارسنجی، Unicode، ادغام، بازگردانی خطا و محافظت از پروژه موفق بودند.');