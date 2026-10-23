/* پشتیبان‌گیری و بازیابی داده‌های قابل مدیریت ویرایشگر */
(function () {
    'use strict';

    var FORMAT = 'editor-backup';
    var VERSION = 1;
    var APP_ID = 'Editor-html-css-js';
    var MAX_BYTES = 5 * 1024 * 1024;
    var MAX_NODES = 100000;
    var MAX_ITEMS = 10000;
    var LANGS = ['html', 'css', 'js'];
    var SETTINGS_KEYS = [
        'theme', 'accentColor', 'density', 'autoSaveSettings', 'fontSize',
        'lineNumbers', 'wrapLines', 'autocomplete', 'autoPreview',
        'previewDelay', 'splitRatio', 'layout'
    ];
    var DEFAULT_SETTINGS = {
        theme: 'dark', accentColor: 'blue', density: 'normal', autoSaveSettings: 'on',
        fontSize: '15', lineNumbers: 'on', wrapLines: 'off', autocomplete: 'on',
        autoPreview: 'on', previewDelay: '600', splitRatio: '50', layout: 'side-by-side'
    };
    var ALLOWED = {
        theme: ['dark', 'light', 'system'],
        accentColor: ['blue', 'green', 'violet', 'orange'],
        density: ['compact', 'normal', 'comfortable'],
        autoSaveSettings: ['on', 'off'],
        lineNumbers: ['on', 'off'], wrapLines: ['on', 'off'],
        autocomplete: ['on', 'off'], autoPreview: ['on', 'off'],
        previewDelay: ['300', '600', '1000'],
        layout: ['side-by-side', 'stacked']
    };
    var LABELS = {
        settings: 'تنظیمات و ترجیحات محیط',
        project: 'پروژه و فایل‌های ویرایشگر',
        libraries: 'کتابخانه‌های سفارشی',
        suggestedWords: 'بانک‌های کلمات پیشنهادی',
        quickInsert: 'فهرست درج سریع'
    };
    var MERGEABLE = ['libraries', 'suggestedWords', 'quickInsert'];
    var KEYS = {
        settings: 'html-editor-settings-v1',
        appearance: 'html-editor-appearance-v1',
        font: 'html-editor-font',
        tab: 'html-editor-tab',
        split: 'html-editor-split-pos',
        explorer: 'html-editor-file-explorer-collapsed',
        project: 'html-editor-project-v3',
        legacyCode: 'html-editor-code-v2',
        libraries: 'html-editor-libs-v1',
        words: 'html-editor-suggestion-manager-v1',
        wordUi: 'html-editor-suggestion-manager-ui-v1',
        quick: 'html-editor-quick-insert-v1',
        quickBuiltins: 'html-editor-quick-insert-builtins-v1'
    };

    function error(message) { throw new Error(message); }
    function assert(test, message) { if (!test) error(message); }
    function own(object, key) { return Object.prototype.hasOwnProperty.call(object, key); }
    function record(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value) &&
            Object.prototype.toString.call(value) === '[object Object]';
    }
    function clone(value) { return JSON.parse(JSON.stringify(value)); }
    function canonical(value) {
        if (Array.isArray(value)) return value.map(canonical);
        if (record(value)) {
            var sorted = {};
            Object.keys(value).sort().forEach(function (key) { sorted[key] = canonical(value[key]); });
            return sorted;
        }
        return value;
    }
    function sameJson(left, right) {
        return JSON.stringify(canonical(left)) === JSON.stringify(canonical(right));
    }
    function signature(raw) {
        if (raw === null) return 'null';
        var hash = 2166136261;
        for (var i = 0; i < raw.length; i++) hash = Math.imul(hash ^ raw.charCodeAt(i), 16777619) >>> 0;
        return 'text:' + raw.length + ':' + hash.toString(16);
    }
    function onlyKeys(value, allowed, label) {
        Object.keys(value).forEach(function (key) {
            assert(allowed.indexOf(key) !== -1, label + ' دارای فیلد پشتیبانی‌نشدهٔ «' + key + '» است.');
        });
    }
    function safeKey(key, label) {
        assert(key !== '__proto__' && key !== 'prototype' && key !== 'constructor',
            label + ' دارای کلید ناامن است.');
    }
    function text(value, label, max, emptyAllowed) {
        assert(typeof value === 'string', label + ' باید متن باشد.');
        assert(value.length <= (max || 10000), label + ' از حد مجاز طولانی‌تر است.');
        if (!emptyAllowed) assert(value.trim().length > 0, label + ' نمی‌تواند خالی باشد.');
        return value;
    }
    function inspect(value, state, depth, label) {
        state.nodes++;
        assert(state.nodes <= MAX_NODES, label + ' بیش از حد پیچیده است.');
        assert(depth <= 20, label + ' بیش از حد تو در تو است.');
        if (value === null || typeof value === 'boolean') return;
        if (typeof value === 'string') {
            assert(value.length <= 2 * 1024 * 1024, label + ' شامل متن بیش از حد بزرگ است.');
            return;
        }
        if (typeof value === 'number') {
            assert(Number.isFinite(value), label + ' شامل عدد نامعتبر است.');
            return;
        }
        if (Array.isArray(value)) {
            assert(value.length <= MAX_ITEMS, label + ' تعداد آیتم بیش از حد مجاز دارد.');
            value.forEach(function (item) { inspect(item, state, depth + 1, label); });
            return;
        }
        assert(record(value), label + ' شامل نوع دادهٔ پشتیبانی‌نشده است.');
        Object.keys(value).forEach(function (key) {
            safeKey(key, label);
            inspect(value[key], state, depth + 1, label);
        });
    }

    function normalizeSettings(input) {
        assert(record(input), 'ساختار تنظیمات پشتیبان معتبر نیست.');
        onlyKeys(input, SETTINGS_KEYS, 'تنظیمات');
        var result = {};
        SETTINGS_KEYS.forEach(function (key) {
            assert(own(input, key), 'تنظیم الزامی «' + key + '» در فایل وجود ندارد.');
            var value = String(input[key]);
            if (key === 'fontSize') {
                var font = Number(value);
                assert(Number.isInteger(font) && font >= 10 && font <= 30, 'اندازهٔ قلم خارج از محدودهٔ مجاز است.');
            } else if (key === 'splitRatio') {
                var ratio = Number(value);
                assert(Number.isFinite(ratio) && ratio >= 15 && ratio <= 85, 'نسبت پنل‌ها خارج از محدودهٔ مجاز است.');
            } else {
                assert(ALLOWED[key] && ALLOWED[key].indexOf(value) !== -1,
                    'مقدار تنظیم «' + key + '» پشتیبانی نمی‌شود.');
            }
            result[key] = value;
        });
        return result;
    }

    function normalizeProject(value) {
        assert(record(value), 'بخش پروژه ساختار معتبری ندارد.');
        onlyKeys(value, ['files', 'activeFileId', 'lastActiveByLang', 'documentTitle', 'headExtras'], 'پروژه');
        assert(Array.isArray(value.files) && value.files.length > 0 && value.files.length <= 500,
            'فهرست فایل‌های پروژه خالی یا بیش از حد بزرگ است.');
        var ids = Object.create(null);
        var files = value.files.map(function (file, index) {
            assert(record(file), 'ساختار فایل شمارهٔ ' + (index + 1) + ' معتبر نیست.');
            onlyKeys(file, ['id', 'name', 'type', 'content'], 'فایل پروژه');
            var id = text(file.id, 'شناسهٔ فایل', 100, false).trim();
            assert(id.length > 0, 'شناسهٔ فایل نمی‌تواند خالی باشد.');
            assert(!own(ids, id), 'شناسهٔ تکراری در فایل‌های پروژه وجود دارد.');
            ids[id] = true;
            assert(LANGS.indexOf(file.type) !== -1, 'نوع فایل پروژه پشتیبانی نمی‌شود.');
            return {
                id: id,
                name: text(file.name, 'نام فایل', 40, false).trim(),
                type: file.type,
                content: text(file.content, 'محتوای فایل', 1024 * 1024, true)
            };
        });
        LANGS.forEach(function (lang) {
            assert(files.some(function (file) { return file.type === lang; }),
                'پروژه باید دست‌کم یک فایل معتبر برای زبان ' + lang + ' داشته باشد.');
        });
        assert(typeof value.activeFileId === 'string' && own(ids, value.activeFileId),
            'شناسهٔ فایل فعال به هیچ فایل معتبری اشاره نمی‌کند.');
        assert(record(value.lastActiveByLang), 'ارتباط آخرین فایل فعال هر زبان معتبر نیست.');
        onlyKeys(value.lastActiveByLang, LANGS, 'آخرین فایل فعال');
        var last = {};
        LANGS.forEach(function (lang) {
            var candidate = value.lastActiveByLang[lang];
            if (candidate === null || candidate === undefined || candidate === '') {
                last[lang] = null;
                return;
            }
            assert(typeof candidate === 'string' && own(ids, candidate),
                'شناسهٔ فایل فعال در زبان ' + lang + ' ناشناخته است.');
            var linked = files.find(function (file) { return file.id === candidate; });
            assert(linked && linked.type === lang, 'پیوند فایل فعال با زبان ' + lang + ' ناسازگار است.');
            last[lang] = candidate;
        });
        LANGS.forEach(function (lang) {
            var id = last[lang];
            if (!files.some(function (file) { return file.id === id && file.type === lang; })) {
                last[lang] = (files.find(function (file) { return file.type === lang; }) || {}).id || null;
            }
        });
        return {
            files: files,
            activeFileId: value.activeFileId,
            lastActiveByLang: last,
            documentTitle: text(value.documentTitle === undefined ? 'My Page' : value.documentTitle, 'عنوان سند', 200, true),
            headExtras: text(value.headExtras === undefined ? '' : value.headExtras, 'محتوای تکمیلی head', 100000, true)
        };
    }

    function normalizeLibraries(input) {
        assert(Array.isArray(input) && input.length <= 500, 'فهرست کتابخانه‌های سفارشی معتبر نیست.');
        var ids = Object.create(null);
        return input.map(function (lib, index) {
            assert(record(lib), 'ساختار کتابخانهٔ شمارهٔ ' + (index + 1) + ' معتبر نیست.');
            onlyKeys(lib, ['id', 'name', 'type', 'code', 'enabled'], 'کتابخانه');
            var id = text(lib.id, 'شناسهٔ کتابخانه', 100, false).trim();
            assert(id.length > 0, 'شناسهٔ کتابخانه نمی‌تواند خالی باشد.');
            assert(!own(ids, id), 'شناسهٔ تکراری در کتابخانه‌ها وجود دارد.');
            ids[id] = true;
            assert(lib.type === 'css' || lib.type === 'js', 'نوع کتابخانه فقط می‌تواند CSS یا JavaScript باشد.');
            return {
                id: id,
                name: text(lib.name, 'نام کتابخانه', 100, false).trim().slice(0, 100),
                type: lib.type,
                code: text(lib.code, 'کد کتابخانه', 1024 * 1024, true),
                enabled: lib.enabled === true
            };
        });
    }

    function normalizeBanks(input) {
        assert(Array.isArray(input) && input.length <= 1000, 'تعداد بانک‌های سفارشی بیش از حد مجاز است.');
        var ids = Object.create(null);
        return input.map(function (bank, index) {
            assert(record(bank), 'ساختار بانک سفارشی شمارهٔ ' + (index + 1) + ' معتبر نیست.');
            onlyKeys(bank, ['id', 'name', 'lang', 'target', 'words'], 'بانک سفارشی');
            var id = text(bank.id, 'شناسهٔ بانک', 150, false);
            assert(!own(ids, id), 'شناسهٔ تکراری در بانک‌های سفارشی وجود دارد.');
            ids[id] = true;
            assert(LANGS.indexOf(bank.lang) !== -1, 'زبان بانک سفارشی پشتیبانی نمی‌شود.');
            var target = text(bank.target, 'مسیر مقصد بانک', 250, false);
            assert(/^(?:html|css|js)[A-Za-z0-9_.-]*$|^snippets\.(?:html|css|js)$/.test(target),
                'مسیر مقصد بانک سفارشی معتبر نیست.');
            assert(Array.isArray(bank.words) && bank.words.length <= MAX_ITEMS, 'فهرست کلمات بانک سفارشی معتبر نیست.');
            var wordIds = Object.create(null);
            var words = bank.words.map(function (word) {
                assert(record(word), 'ساختار یک کلمهٔ سفارشی معتبر نیست.');
                onlyKeys(word, ['id', 'label', 'insert', 'description', 'active'], 'کلمهٔ سفارشی');
                var wordId = word.id === undefined || word.id === null ? '' : text(word.id, 'شناسهٔ کلمه', 150, true);
                if (wordId) {
                    assert(!own(wordIds, wordId), 'شناسهٔ تکراری در کلمات یک بانک وجود دارد.');
                    wordIds[wordId] = true;
                }
                return {
                    id: wordId,
                    label: text(word.label, 'عنوان کلمه', 500, false),
                    insert: text(word.insert, 'متن درج‌شوندهٔ کلمه', 100000, true),
                    description: text(word.description === undefined ? '' : word.description, 'توضیحات کلمه', 10000, true),
                    active: word.active !== false
                };
            });
            return { id: id, name: text(bank.name, 'نام بانک سفارشی', 200, false), lang: bank.lang, target: target, words: words };
        });
    }

    function normalizeLabels(input) {
        assert(record(input), 'عنوان‌های سفارشی دسته‌بندی معتبر نیستند.');
        var result = {};
        Object.keys(input).forEach(function (key) {
            safeKey(key, 'عنوان دسته‌بندی');
            text(key, 'شناسهٔ دسته‌بندی', 250, false);
            result[key] = text(input[key], 'عنوان دسته‌بندی', 250, true);
        });
        return result;
    }

    function normalizeWordSnapshot(input) {
        assert(record(input) && input.version === 1 && record(input.data),
            'نسخه یا ساختار بانک کلمات پیشنهادی پشتیبانی نمی‌شود.');
        onlyKeys(input, ['version', 'data', 'customBanks', 'categoryLabels'], 'بانک کلمات پیشنهادی');
        var data = {};
        Object.keys(input.data).forEach(function (key) {
            safeKey(key, 'بانک کلمات پیشنهادی');
            assert(key === 'snippets' || /^(?:html|css|js)[A-Za-z0-9_]*$/.test(key),
                'کلید بانک «' + key + '» در این قالب پشتیبانی نمی‌شود.');
            assert(record(input.data[key]) || Array.isArray(input.data[key]), 'ساختار بانک «' + key + '» معتبر نیست.');
            inspect(input.data[key], { nodes: 0 }, 0, 'بانک «' + key + '»');
            data[key] = clone(input.data[key]);
        });
        return {
            version: 1,
            data: data,
            customBanks: normalizeBanks(input.customBanks === undefined ? [] : input.customBanks),
            categoryLabels: normalizeLabels(input.categoryLabels === undefined ? {} : input.categoryLabels)
        };
    }

    function normalizeQuickItems(input) {
        assert(record(input), 'فهرست درج سریع ساختار معتبری ندارد.');
        onlyKeys(input, LANGS, 'فهرست درج سریع');
        var result = {};
        LANGS.forEach(function (lang) {
            var items = input[lang] === undefined ? [] : input[lang];
            assert(Array.isArray(items) && items.length <= 100, 'در هر زبان حداکثر ۱۰۰ آیتم درج سریع پشتیبانی می‌شود.');
            var ids = Object.create(null);
            result[lang] = items.map(function (item) {
                assert(record(item), 'ساختار یک آیتم درج سریع معتبر نیست.');
                onlyKeys(item, ['id', 'label', 'prefix', 'suffix', 'description'], 'آیتم درج سریع');
                var id = text(item.id, 'شناسهٔ آیتم درج سریع', 150, false);
                assert(!own(ids, id), 'شناسهٔ تکراری در فهرست درج سریع وجود دارد.');
                ids[id] = true;
                return {
                    id: id,
                    label: text(item.label, 'عنوان آیتم درج سریع', 200, false),
                    prefix: text(item.prefix, 'متن اصلی آیتم درج سریع', 5000, true),
                    suffix: text(item.suffix === undefined ? '' : item.suffix, 'پسوند درج سریع', 5000, true),
                    description: text(item.description === undefined ? '' : item.description, 'توضیحات آیتم درج سریع', 1000, true)
                };
            });
        });
        return result;
    }

    function normalizeBuiltinConfig(input) {
        assert(record(input), 'تنظیمات آیتم‌های پیش‌فرض درج سریع معتبر نیست.');
        onlyKeys(input, LANGS, 'تنظیمات آیتم‌های پیش‌فرض درج سریع');
        var result = {};
        LANGS.forEach(function (lang) {
            var section = input[lang] === undefined ? {} : input[lang];
            assert(record(section), 'بخش تنظیمات درج سریع برای ' + lang + ' معتبر نیست.');
            onlyKeys(section, ['deleted', 'overrides'], 'تنظیمات آیتم‌های پیش‌فرض درج سریع');
            var deleted = section.deleted === undefined ? [] : section.deleted;
            assert(Array.isArray(deleted) && deleted.length <= MAX_ITEMS, 'فهرست حذف آیتم‌های پیش‌فرض معتبر نیست.');
            deleted = deleted.map(function (id) {
                text(id, 'شناسهٔ آیتم پیش‌فرض', 150, false);
                assert(new RegExp('^builtin-' + lang + '-\\d+$').test(id),
                    'شناسهٔ آیتم پیش‌فرض با زبان انتخاب‌شده ناسازگار است.');
                return id;
            }).filter(function (id, index, all) { return all.indexOf(id) === index; });
            var overrides = section.overrides === undefined ? {} : section.overrides;
            assert(record(overrides), 'جایگزین‌های آیتم‌های پیش‌فرض معتبر نیستند.');
            var cleanOverrides = {};
            Object.keys(overrides).forEach(function (id) {
                safeKey(id, 'شناسهٔ جایگزین');
                assert(new RegExp('^builtin-' + lang + '-\\d+$').test(id),
                    'شناسهٔ جایگزین با زبان انتخاب‌شده ناسازگار است.');
                var override = overrides[id];
                assert(record(override), 'جایگزین آیتم پیش‌فرض معتبر نیست.');
                onlyKeys(override, ['label', 'prefix', 'suffix', 'description'], 'جایگزین آیتم پیش‌فرض');
                var clean = {};
                ['label', 'prefix', 'suffix', 'description'].forEach(function (key) {
                    if (own(override, key)) clean[key] = text(override[key], 'مقدار جایگزین', 5000, true);
                });
                cleanOverrides[id] = clean;
            });
            result[lang] = { deleted: deleted, overrides: cleanOverrides };
        });
        return result;
    }

    function normalizeSection(name, section) {
        assert(own(LABELS, name), 'بخش پشتیبان‌گیری ناشناخته است.');
        assert(record(section), 'ساختار بخش «' + LABELS[name] + '» معتبر نیست.');
        if (name === 'settings') {
            onlyKeys(section, ['values', 'ui'], 'تنظیمات');
            assert(record(section.ui), 'ترجیحات محیط در فایل پشتیبان معتبر نیست.');
            onlyKeys(section.ui, ['activeTab', 'fileExplorerCollapsed', 'suggestionManagerTreeWidth'], 'ترجیحات محیط');
            assert(['html', 'css', 'js', 'libs', 'help'].indexOf(section.ui.activeTab) !== -1, 'تب فعال پشتیبانی نمی‌شود.');
            var collapsed = section.ui.fileExplorerCollapsed;
            assert(collapsed === null || collapsed === '0' || collapsed === '1', 'وضعیت فهرست فایل‌ها معتبر نیست.');
            var width = Number(section.ui.suggestionManagerTreeWidth);
            assert(Number.isFinite(width) && width >= 25 && width <= 65, 'عرض پنل بانک‌ها خارج از محدودهٔ مجاز است.');
            return { values: normalizeSettings(section.values), ui: {
                activeTab: section.ui.activeTab,
                fileExplorerCollapsed: collapsed,
                suggestionManagerTreeWidth: width
            } };
        }
        if (name === 'project') {
            onlyKeys(section, ['value'], 'پروژه');
            return { value: normalizeProject(section.value) };
        }
        if (name === 'libraries') {
            onlyKeys(section, ['items'], 'کتابخانه‌ها');
            return { items: normalizeLibraries(section.items) };
        }
        if (name === 'suggestedWords') {
            onlyKeys(section, ['value'], 'بانک‌های کلمات پیشنهادی');
            return { value: normalizeWordSnapshot(section.value) };
        }
        if (name === 'quickInsert') {
            onlyKeys(section, ['items', 'builtinConfig'], 'فهرست درج سریع');
            return { items: normalizeQuickItems(section.items), builtinConfig: normalizeBuiltinConfig(section.builtinConfig) };
        }
        error('بخش پشتیبان‌گیری قابل پردازش نیست.');
    }

    function validateBackupPayload(input) {
        assert(record(input), 'ساختار فایل JSON پشتیبان معتبر نیست.');
        onlyKeys(input, ['format', 'schemaVersion', 'createdAt', 'app', 'sections'], 'فایل پشتیبان');
        assert(input.format === FORMAT, 'این فایل متعلق به قالب پشتیبان ویرایشگر نیست.');
        assert(input.schemaVersion === VERSION, 'نسخهٔ قالب پشتیبان ناشناخته است؛ بازیابی متوقف شد.');
        assert(typeof input.createdAt === 'string' &&
            /^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(input.createdAt) &&
            Number.isFinite(Date.parse(input.createdAt)), 'تاریخ تهیهٔ پشتیبان معتبر نیست.');
        assert(record(input.app), 'مشخصات برنامه در فایل پشتیبان معتبر نیست.');
        onlyKeys(input.app, ['id', 'name'], 'مشخصات برنامه');
        assert(input.app.id === APP_ID, 'فایل پشتیبان برای برنامهٔ دیگری ساخته شده است.');
        text(input.app.name, 'نام برنامه', 150, false);
        assert(record(input.sections), 'فهرست بخش‌های پشتیبان معتبر نیست.');
        var names = Object.keys(input.sections);
        assert(names.length > 0, 'فایل پشتیبان هیچ بخشی ندارد.');
        var sections = {};
        names.forEach(function (name) { sections[name] = normalizeSection(name, input.sections[name]); });
        return {
            format: FORMAT, schemaVersion: VERSION, createdAt: input.createdAt,
            app: { id: APP_ID, name: input.app.name }, sections: sections
        };
    }

    function itemIdentity(item) {
        if (typeof item === 'string') return 's:' + item.toLocaleLowerCase();
        if (record(item)) {
            if (typeof item.id === 'string' && item.id) return 'id:' + item.id;
            if (typeof item.label === 'string' && item.label) return 'label:' + item.label.toLocaleLowerCase();
            if (typeof item.name === 'string' && item.name) return 'name:' + item.name.toLocaleLowerCase();
        }
        return 'json:' + JSON.stringify(item);
    }
    function mergeArray(current, incoming, duplicateLabels) {
        var result = clone(current);
        var seen = Object.create(null);
        result.forEach(function (item) {
            seen[itemIdentity(item)] = true;
            if (duplicateLabels && record(item) && typeof item.label === 'string') {
                seen['label:' + item.label.toLocaleLowerCase()] = true;
            }
        });
        incoming.forEach(function (item) {
            var key = itemIdentity(item);
            var labelKey = duplicateLabels && record(item) && typeof item.label === 'string'
                ? 'label:' + item.label.toLocaleLowerCase() : '';
            if (own(seen, key) || (labelKey && own(seen, labelKey))) return;
            result.push(clone(item));
            seen[key] = true;
            if (labelKey) seen[labelKey] = true;
        });
        return result;
    }
    function mergeJson(current, incoming) {
        if (Array.isArray(current) && Array.isArray(incoming)) return mergeArray(current, incoming, true);
        if (record(current) && record(incoming)) {
            var result = clone(current);
            Object.keys(incoming).forEach(function (key) {
                safeKey(key, 'دادهٔ ادغام');
                if (!own(result, key)) result[key] = clone(incoming[key]);
                else result[key] = mergeJson(result[key], incoming[key]);
            });
            return result;
        }
        return current === undefined ? clone(incoming) : clone(current);
    }
    function mergeSection(name, current, incoming) {
        assert(MERGEABLE.indexOf(name) !== -1,
            'ادغام برای بخش «' + (LABELS[name] || name) + '» پشتیبانی نمی‌شود.');
        var oldValue = normalizeSection(name, current);
        var newValue = normalizeSection(name, incoming);
        if (name === 'libraries') {
            return { items: mergeArray(oldValue.items, newValue.items, false) };
        }
        if (name === 'quickInsert') {
            var items = {};
            var config = {};
            LANGS.forEach(function (lang) {
                items[lang] = mergeArray(oldValue.items[lang], newValue.items[lang], true);
                var oldConfig = oldValue.builtinConfig[lang];
                var newConfig = newValue.builtinConfig[lang];
                var deleted = oldConfig.deleted.concat(newConfig.deleted).filter(function (id, i, all) {
                    return all.indexOf(id) === i;
                });
                var overrides = clone(newConfig.overrides);
                Object.keys(oldConfig.overrides).forEach(function (id) { overrides[id] = clone(oldConfig.overrides[id]); });
                config[lang] = { deleted: deleted, overrides: overrides };
            });
            return { items: items, builtinConfig: config };
        }
        var data = mergeJson(oldValue.value.data, newValue.value.data);
        var banks = mergeArray(oldValue.value.customBanks, newValue.value.customBanks, false);
        var bankIds = Object.create(null);
        var bankNames = Object.create(null);
        banks = banks.filter(function (bank) {
            var id = 'id:' + bank.id;
            var name = 'name:' + bank.name.toLocaleLowerCase();
            if (own(bankIds, id) || own(bankNames, name)) return false;
            bankIds[id] = true;
            bankNames[name] = true;
            return true;
        });
        var labels = clone(newValue.value.categoryLabels);
        Object.keys(oldValue.value.categoryLabels).forEach(function (key) { labels[key] = oldValue.value.categoryLabels[key]; });
        return { value: { version: 1, data: data, customBanks: banks, categoryLabels: labels } };
    }

    function applyStorageChanges(storage, changes) {
        var keys = Object.keys(changes);
        var originals = Object.create(null);
        keys.forEach(function (key) { originals[key] = storage.getItem(key); });
        try {
            keys.forEach(function (key) {
                if (changes[key] === null) storage.removeItem(key);
                else storage.setItem(key, changes[key]);
            });
            keys.forEach(function (key) {
                assert(storage.getItem(key) === changes[key], 'تأیید ذخیره‌سازی برای یک کلید ناموفق بود.');
            });
            return { success: true };
        } catch (writeError) {
            var rollbackFailed = false;
            keys.slice().reverse().forEach(function (key) {
                try {
                    if (originals[key] === null) storage.removeItem(key);
                    else storage.setItem(key, originals[key]);
                    if (storage.getItem(key) !== originals[key]) rollbackFailed = true;
                } catch (rollbackError) { rollbackFailed = true; }
            });
            throw new Error(rollbackFailed
                ? 'ذخیره‌سازی و بازگردانی خودکار کامل نشد. وضعیت داده‌ها را بررسی کنید؛ تضمین بازگشت وجود ندارد.'
                : 'ذخیره‌سازی انجام نشد؛ تغییرات ناقص بازگردانده شدند و داده‌های قبلی حفظ شدند. ' +
                    (writeError && writeError.message ? writeError.message : 'خطای ناشناخته'));
        }
    }

    function getStorage() {
        try { return window.localStorage; }
        catch (e) { error('دسترسی به حافظهٔ محلی مرورگر ممکن نیست.'); }
    }
    function rawValue(key) {
        var value = getStorage().getItem(key);
        return value === null ? null : value;
    }
    function jsonValue(key, fallback) {
        var raw = rawValue(key);
        if (raw === null) return clone(fallback);
        try { return JSON.parse(raw); }
        catch (e) { error('دادهٔ ذخیره‌شده قابل خواندن نیست؛ برای جلوگیری از بازیابی ناسالم عملیات متوقف شد.'); }
    }
    function setChange(changes, key, value) {
        changes[key] = value === null ? null : (typeof value === 'string' ? value : JSON.stringify(value));
    }
    function quickFallback() { return { html: [], css: [], js: [] }; }
    function builtinFallback() {
        return { html: { deleted: [], overrides: {} }, css: { deleted: [], overrides: {} }, js: { deleted: [], overrides: {} } };
    }
    function wordsFallback() { return { version: 1, data: {}, customBanks: [], categoryLabels: {} }; }

    function settingsSection() {
        var bridge = window.EditorBackupAPI || {};
        var values = typeof bridge.getSettings === 'function'
            ? bridge.getSettings() : jsonValue(KEYS.settings, DEFAULT_SETTINGS);
        var uiData = jsonValue(KEYS.wordUi, { treeWidth: 36 });
        var width = uiData && Number.isFinite(Number(uiData.treeWidth)) ? Number(uiData.treeWidth) : 36;
        var tab = typeof bridge.getActiveTab === 'function' ? bridge.getActiveTab() : rawValue(KEYS.tab);
        if (['html', 'css', 'js', 'libs', 'help'].indexOf(tab) === -1) tab = 'html';
        var explorer = rawValue(KEYS.explorer);
        if (explorer !== '0' && explorer !== '1') explorer = null;
        return {
            values: normalizeSettings(values),
            ui: {
                activeTab: tab,
                fileExplorerCollapsed: explorer,
                suggestionManagerTreeWidth: Math.max(25, Math.min(65, width))
            }
        };
    }
    function projectSection() {
        var bridge = window.EditorBackupAPI || {};
        var value = typeof bridge.getProject === 'function' ? bridge.getProject() : jsonValue(KEYS.project, null);
        assert(value, 'پروژهٔ فعلی در دسترس نیست؛ پشتیبان‌گیری از پروژه متوقف شد.');
        return { value: normalizeProject(value) };
    }
    function librariesSection() {
        var bridge = window.EditorBackupAPI || {};
        var value = typeof bridge.getLibraries === 'function' ? bridge.getLibraries() : jsonValue(KEYS.libraries, []);
        return { items: normalizeLibraries(value) };
    }
    function wordsSection() {
        return { value: normalizeWordSnapshot(jsonValue(KEYS.words, wordsFallback())) };
    }
    function quickSection() {
        return {
            items: normalizeQuickItems(jsonValue(KEYS.quick, quickFallback())),
            builtinConfig: normalizeBuiltinConfig(jsonValue(KEYS.quickBuiltins, builtinFallback()))
        };
    }

    function createBackup(names) {
        assert(Array.isArray(names) && names.length > 0, 'حداقل یک بخش را برای پشتیبان‌گیری انتخاب کنید.');
        var sections = {};
        names.forEach(function (name) {
            assert(own(LABELS, name) && !own(sections, name), 'بخش پشتیبان‌گیری ناشناخته یا تکراری است.');
            if (name === 'settings') sections[name] = settingsSection();
            else if (name === 'project') sections[name] = projectSection();
            else if (name === 'libraries') sections[name] = librariesSection();
            else if (name === 'suggestedWords') sections[name] = wordsSection();
            else if (name === 'quickInsert') sections[name] = quickSection();
        });
        return validateBackupPayload({
            format: FORMAT, schemaVersion: VERSION, createdAt: new Date().toISOString(),
            app: { id: APP_ID, name: 'ویرایشگر HTML/CSS/JavaScript' }, sections: sections
        });
    }

    function currentMergeSection(name) {
        if (name === 'libraries') return { items: normalizeLibraries(jsonValue(KEYS.libraries, [])) };
        if (name === 'quickInsert') return {
            items: normalizeQuickItems(jsonValue(KEYS.quick, quickFallback())),
            builtinConfig: normalizeBuiltinConfig(jsonValue(KEYS.quickBuiltins, builtinFallback()))
        };
        if (name === 'suggestedWords') return { value: normalizeWordSnapshot(jsonValue(KEYS.words, wordsFallback())) };
        error('ادغام برای این بخش پشتیبانی نمی‌شود.');
    }

    function buildChanges(names, payload, mode) {
        var changes = {};
        names.forEach(function (name) {
            assert(own(payload.sections, name), 'بخش انتخاب‌شده در فایل پشتیبان وجود ندارد.');
            var section = payload.sections[name];
            if (mode === 'merge') section = mergeSection(name, currentMergeSection(name), section);
            else assert(mode === 'replace', 'روش بازیابی معتبر نیست.');
            if (name === 'settings') {
                setChange(changes, KEYS.settings, section.values);
                setChange(changes, KEYS.appearance, {
                    theme: section.values.theme, accentColor: section.values.accentColor, density: section.values.density
                });
                setChange(changes, KEYS.font, section.values.fontSize);
                setChange(changes, KEYS.split, section.values.splitRatio);
                setChange(changes, KEYS.tab, section.ui.activeTab);
                setChange(changes, KEYS.explorer, section.ui.fileExplorerCollapsed);
                setChange(changes, KEYS.wordUi, { treeWidth: section.ui.suggestionManagerTreeWidth });
            } else if (name === 'project') {
                setChange(changes, KEYS.project, section.value);
            } else if (name === 'libraries') {
                setChange(changes, KEYS.libraries, section.items);
            } else if (name === 'suggestedWords') {
                setChange(changes, KEYS.words, section.value);
            } else if (name === 'quickInsert') {
                setChange(changes, KEYS.quick, section.items);
                setChange(changes, KEYS.quickBuiltins, section.builtinConfig);
            }
        });
        return changes;
    }

    function unsavedDraft(names) {
        if (names.indexOf('suggestedWords') !== -1) {
            var save = document.querySelector('#suggestionManagerModal #smSave');
            if (save && !save.disabled) return 'ابتدا تغییرات مدیریت کلمات پیشنهادی را ذخیره کنید یا لغو کنید.';
        }
        if (names.indexOf('quickInsert') !== -1) {
            var label = document.getElementById('quickInsertLabel');
            var code = document.getElementById('quickInsertCode');
            var cancel = document.getElementById('btnQuickInsertCancel');
            if ((label && label.value.trim()) || (code && code.value.trim()) || (cancel && !cancel.hidden)) {
                return 'ابتدا ویرایش باز فهرست درج سریع را ذخیره یا لغو کنید.';
            }
        }
        return '';
    }

    function init() {
        var root = document.getElementById('settingsBackupRestoreCard');
        if (!root) return;
        var status = root.querySelector('#backupRestoreStatus');
        var fileInput = root.querySelector('#backupRestoreFile');
        var preview = root.querySelector('#backupRestorePreview');
        var sectionList = root.querySelector('#backupRestoreSectionChoices');
        var modeSelect = root.querySelector('#backupRestoreMode');
        var applyButton = root.querySelector('#btnBackupRestoreApply');
        var payload = null;
        var fileName = '';

        function report(message, state) {
            status.textContent = message;
            status.dataset.state = state || 'info';
            status.setAttribute('aria-live', state === 'error' ? 'assertive' : 'polite');
        }
        function selectedBackupNames() {
            return Array.from(root.querySelectorAll('[data-backup-section]:checked')).map(function (item) { return item.value; });
        }
        function selectedRestoreNames() {
            return Array.from(sectionList.querySelectorAll('[data-restore-section]:checked')).map(function (item) { return item.value; });
        }
        function addText(parent, tag, className, value) {
            var node = document.createElement(tag);
            if (className) node.className = className;
            node.textContent = value;
            parent.appendChild(node);
            return node;
        }
        function updateMode() {
            var selected = selectedRestoreNames();
            var incompatible = selected.some(function (name) { return MERGEABLE.indexOf(name) === -1; });
            var mergeOption = modeSelect.querySelector('option[value="merge"]');
            mergeOption.disabled = !selected.length || incompatible;
            if (incompatible && modeSelect.value === 'merge') {
                modeSelect.value = 'replace';
                report('ادغام برای تنظیمات و پروژه پشتیبانی نمی‌شود؛ روش به جایگزینی تغییر کرد.', 'warning');
            }
            applyButton.disabled = !payload || !selected.length || (modeSelect.value === 'merge' && incompatible);
        }
        function readFile(file) {
            return new Promise(function (resolve, reject) {
                if (typeof file.text === 'function') {
                    file.text().then(resolve).catch(reject);
                    return;
                }
                var reader = new FileReader();
                reader.onload = function () { resolve(String(reader.result || '')); };
                reader.onerror = function () { reject(new Error('خواندن فایل پشتیبان ناموفق بود.')); };
                reader.readAsText(file, 'UTF-8');
            });
        }
        function renderPreview(data) {
            preview.hidden = false;
            root.querySelector('#backupRestoreFileName').textContent = fileName;
            root.querySelector('#backupRestoreAppName').textContent = data.app.name;
            root.querySelector('#backupRestoreSchemaVersion').textContent = String(data.schemaVersion);
            root.querySelector('#backupRestoreCreatedAt').textContent = new Date(data.createdAt).toLocaleString();
            root.querySelector('#backupRestoreIncludedSections').textContent =
                Object.keys(data.sections).map(function (name) { return LABELS[name]; }).join('، ');
            sectionList.replaceChildren();
            Object.keys(data.sections).forEach(function (name) {
                var label = document.createElement('label');
                label.className = 'backup-restore-choice';
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = name;
                checkbox.checked = true;
                checkbox.dataset.restoreSection = name;
                checkbox.addEventListener('change', updateMode);
                label.appendChild(checkbox);
                addText(label, 'span', '', LABELS[name]);
                sectionList.appendChild(label);
            });
            modeSelect.value = 'replace';
            updateMode();
        }

        root.querySelector('#btnBackupCreate').addEventListener('click', function () {
            var names = selectedBackupNames();
            if (!names.length) {
                report('حداقل یک بخش را برای تهیهٔ پشتیبان انتخاب کنید.', 'error');
                return;
            }
            var draft = unsavedDraft(names);
            if (draft) {
                report(draft, 'warning');
                return;
            }
            report('در حال آماده‌سازی نسخهٔ پشتیبان…', 'busy');
            try {
                var data = createBackup(names);
                var serialized = JSON.stringify(data, null, 2);
                var blob = new Blob([serialized], { type: 'application/json;charset=utf-8' });
                assert(blob.size <= MAX_BYTES, 'حجم نسخهٔ پشتیبان از ۵ مگابایت بیشتر است؛ بخش‌های انتخاب‌شده را کاهش دهید.');
                var url = window.URL.createObjectURL(blob);
                var anchor = document.createElement('a');
                anchor.href = url;
                anchor.download = 'editor-backup-' + data.createdAt.replace(/[:.]/g, '-').replace('T', '-') + '.editor-backup.json';
                anchor.hidden = true;
                document.body.appendChild(anchor);
                anchor.click();
                anchor.remove();
                window.setTimeout(function () { window.URL.revokeObjectURL(url); }, 1000);
                report('فایل پشتیبان ساخته شد و درخواست دانلود آن ارسال شد. فایل را در محل امن نگهداری کنید.', 'success');
            } catch (err) {
                report(err && err.message ? err.message : 'تهیهٔ نسخهٔ پشتیبان ناموفق بود.', 'error');
            }
        });

        root.querySelector('#btnBackupChooseFile').addEventListener('click', function () {
            fileInput.value = '';
            fileInput.click();
        });

        fileInput.addEventListener('change', function () {
            payload = null;
            applyButton.disabled = true;
            preview.hidden = true;
            sectionList.replaceChildren();
            var file = fileInput.files && fileInput.files[0];
            if (!file) {
                report('فایلی انتخاب نشد.', 'info');
                return;
            }
            fileName = String(file.name || 'backup.json');
            if (!/\.json$/i.test(fileName)) {
                report('فقط فایل JSON با قالب پشتیبان پشتیبانی می‌شود.', 'error');
                fileInput.value = '';
                return;
            }
            if (!Number.isFinite(file.size) || file.size <= 0 || file.size > MAX_BYTES) {
                report('حجم فایل باید بیشتر از صفر و حداکثر ۵ مگابایت باشد.', 'error');
                fileInput.value = '';
                return;
            }
            report('در حال خواندن و اعتبارسنجی کامل فایل…', 'busy');
            readFile(file).then(function (raw) {
                var parsed;
                try { parsed = JSON.parse(raw); }
                catch (err) { error('محتوای فایل JSON معتبر نیست یا ناقص است.'); }
                var validated = validateBackupPayload(parsed);
                assert(new Blob([JSON.stringify(validated)]).size <= MAX_BYTES,
                    'محتوای واقعی فایل پس از اعتبارسنجی از ۵ مگابایت بیشتر است.');
                payload = validated;
                renderPreview(validated);
                report('فایل معتبر است. بخش‌ها و روش بازیابی را انتخاب کنید؛ سپس تأیید نهایی را انجام دهید.', 'success');
            }).catch(function (err) {
                payload = null;
                preview.hidden = true;
                report(err && err.message ? err.message : 'اعتبارسنجی فایل ناموفق بود.', 'error');
            });
        });

        sectionList.addEventListener('change', updateMode);
        modeSelect.addEventListener('change', updateMode);
        applyButton.addEventListener('click', function () {
            if (!payload) {
                report('ابتدا یک فایل پشتیبان معتبر انتخاب کنید.', 'error');
                return;
            }
            var names = selectedRestoreNames();
            if (!names.length) {
                report('حداقل یک بخش برای بازیابی انتخاب کنید.', 'error');
                return;
            }
            var mode = modeSelect.value;
            if (mode === 'merge' && names.some(function (name) { return MERGEABLE.indexOf(name) === -1; })) {
                report('ادغام فقط برای کتابخانه‌ها، بانک‌های کلمات و فهرست درج سریع پشتیبانی می‌شود.', 'error');
                return;
            }
            var draft = unsavedDraft(names);
            if (draft) {
                report(draft, 'warning');
                return;
            }
            var summary = names.map(function (name) { return LABELS[name]; }).join('، ');
            var beforeRestorePayload = null;
            var beforeRestoreError = '';
            if (mode === 'replace') {
                try {
                    beforeRestorePayload = createBackup(names);
                    assert(new Blob([JSON.stringify(beforeRestorePayload, null, 2)],
                        { type: 'application/json;charset=utf-8' }).size <= MAX_BYTES,
                        'حجم پشتیبان فعلی از ۵ مگابایت بیشتر است.');
                } catch (backupError) {
                    beforeRestorePayload = null;
                    beforeRestoreError = backupError && backupError.message ? backupError.message : 'خطای ناشناخته';
                }
            }
            var prompt = mode === 'replace'
                ? 'این بخش‌ها جایگزین داده‌های فعلی می‌شوند: ' + summary +
                    (beforeRestorePayload
                        ? '. پیش از جایگزینی، درخواست دانلود یک فایل پشتیبان جداگانه از وضعیت فعلی همین بخش‌ها صادر می‌شود. مطمئن شوید مرورگر آن را ذخیره می‌کند.'
                        : '. تهیهٔ نسخهٔ پشتیبان پیش از بازیابی ناموفق بود (' + beforeRestoreError +
                            '). در صورت ادامه، فایل پشتیبان قبلی در دسترس نخواهد بود و بازگشت پس از بسته‌شدن یا خرابی مرورگر تضمین نمی‌شود.') +
                    ' ادامه می‌دهید؟'
                : 'داده‌ها با این بخش‌ها ادغام می‌شوند: ' + summary +
                    '. در تعارض شناسه یا عنوان، دادهٔ فعلی حفظ می‌شود و مورد تکراری وارد نمی‌شود. ادامه می‌دهید؟';
            if (!window.confirm(prompt)) {
                report('بازیابی لغو شد؛ هیچ داده‌ای تغییر نکرد.', 'info');
                return;
            }
            if (mode === 'replace' && beforeRestorePayload) {
                var beforeUrl = null;
                var beforeAnchor = null;
                try {
                    var beforeBlob = new Blob([JSON.stringify(beforeRestorePayload, null, 2)],
                        { type: 'application/json;charset=utf-8' });
                    beforeUrl = window.URL.createObjectURL(beforeBlob);
                    beforeAnchor = document.createElement('a');
                    beforeAnchor.href = beforeUrl;
                    beforeAnchor.download = 'editor-backup-before-restore-' +
                        beforeRestorePayload.createdAt.replace(/[:.]/g, '-').replace('T', '-') +
                        '.editor-backup.json';
                    beforeAnchor.hidden = true;
                    document.body.appendChild(beforeAnchor);
                    beforeAnchor.click();
                    beforeAnchor.remove();
                    beforeAnchor = null;
                    window.setTimeout(function () { window.URL.revokeObjectURL(beforeUrl); }, 5000);
                } catch (downloadError) {
                    if (beforeAnchor && beforeAnchor.parentNode) beforeAnchor.parentNode.removeChild(beforeAnchor);
                    if (beforeUrl) {
                        try { window.URL.revokeObjectURL(beforeUrl); } catch (revokeError) {}
                    }
                    report('دانلود پشتیبان پیش از بازیابی آغاز نشد؛ برای جلوگیری از جایگزینی بدون نسخهٔ بازگشت، هیچ داده‌ای تغییر نکرد. ' +
                        (downloadError && downloadError.message ? downloadError.message : ''), 'error');
                    return;
                }
            }
            var projectProtectionSet = false;
            try {
                var changes = buildChanges(names, payload, mode);
                if (names.indexOf('project') !== -1) {
                    try {
                        window.sessionStorage.setItem('editor-backup-project-restore-v1', '1');
                        projectProtectionSet = true;
                    } catch (sessionError) {
                        throw new Error('امکان ثبت نشانگر محافظت از پروژه وجود ندارد؛ برای جلوگیری از بازنویسی ناخواسته، بازیابی پروژه انجام نشد.');
                    }
                }
                var checks = Object.keys(changes).map(function (key) {
                    return { key: key, signature: signature(changes[key]) };
                });
                applyStorageChanges(getStorage(), changes);
                try {
                    window.sessionStorage.setItem('editor-backup-restore-result-v1',
                        JSON.stringify({ sections: names, checks: checks }));
                } catch (sessionError) {}
                report('ذخیرهٔ داده‌ها تأیید شد؛ برنامه برای بارگذاری و بررسی وضعیت جدید بازخوانی می‌شود.', 'success');
                window.setTimeout(function () { window.location.reload(); },
                    mode === 'replace' && beforeRestorePayload ? 1500 : 250);
            } catch (err) {
                if (projectProtectionSet) {
                    try { window.sessionStorage.removeItem('editor-backup-project-restore-v1'); } catch (cleanupError) {}
                }
                report(err && err.message ? err.message : 'بازیابی ناموفق بود.', 'error');
            }
        });

        try {
            var previous = window.sessionStorage.getItem('editor-backup-restore-result-v1');
            if (previous) {
                window.sessionStorage.removeItem('editor-backup-restore-result-v1');
                try {
                    var marker = JSON.parse(previous);
                    assert(record(marker) && Array.isArray(marker.sections) && Array.isArray(marker.checks),
                        'نشانگر بررسی پس از بازیابی معتبر نیست.');
                    marker.checks.forEach(function (check) {
                        assert(record(check) && typeof check.key === 'string' && typeof check.signature === 'string',
                            'ساختار بررسی نهایی معتبر نیست.');
                        assert(signature(rawValue(check.key)) === check.signature,
                            'بررسی ذخیره‌سازی کلید «' + check.key + '» پس از بارگذاری مجدد ناموفق بود.');
                    });
                    var bridge = window.EditorBackupAPI || {};
                    if (marker.sections.indexOf('settings') !== -1) {
                        assert(typeof bridge.getSettings === 'function' &&
                            sameJson(normalizeSettings(bridge.getSettings()), normalizeSettings(jsonValue(KEYS.settings, null))),
                            'تنظیمات زنده پس از بارگذاری با دادهٔ ذخیره‌شده مطابقت ندارند.');
                    }
                    if (marker.sections.indexOf('project') !== -1) {
                        assert(typeof bridge.getProject === 'function' &&
                            sameJson(normalizeProject(bridge.getProject()), normalizeProject(jsonValue(KEYS.project, null))),
                            'پروژهٔ بارگذاری‌شده با نسخهٔ ذخیره‌شده مطابقت ندارد.');
                    }
                    if (marker.sections.indexOf('libraries') !== -1) {
                        assert(typeof bridge.getLibraries === 'function' &&
                            sameJson(normalizeLibraries(bridge.getLibraries()), normalizeLibraries(jsonValue(KEYS.libraries, []))),
                            'کتابخانه‌های فعال پس از بارگذاری با نسخهٔ ذخیره‌شده مطابقت ندارند.');
                    }
                    if (marker.sections.indexOf('suggestedWords') !== -1) {
                        var words = normalizeWordSnapshot(jsonValue(KEYS.words, wordsFallback()));
                        var activeData = window.EDITOR_INTELLISENSE_DATA;
                        assert(activeData && typeof activeData === 'object',
                            'موتور پیشنهادها پس از بازیابی بارگذاری نشده است.');
                        Object.keys(words.data).forEach(function (key) {
                            assert(own(activeData, key), 'بخش «' + key + '» در موتور پیشنهادها بارگذاری نشده است.');
                        });
                    }
                    if (marker.sections.indexOf('quickInsert') !== -1) {
                        normalizeQuickItems(jsonValue(KEYS.quick, quickFallback()));
                        normalizeBuiltinConfig(jsonValue(KEYS.quickBuiltins, builtinFallback()));
                    }
                    report('بازیابی ثبت شد؛ مقادیر ذخیره‌شده دوباره خوانده و بخش‌های بارگذاری‌شده بررسی شدند.', 'success');
                } catch (verifyError) {
                    report('داده‌ها ذخیره شدند، اما بررسی نهایی پس از بارگذاری کامل نشد: ' +
                        (verifyError && verifyError.message ? verifyError.message : 'خطای ناشناخته') +
                        '. پیش از ادامه، داده‌ها را بررسی کنید.', 'warning');
                }
            }
        } catch (err) {}
    }

    window.EditorBackupTools = {
        validateBackupPayload: validateBackupPayload,
        mergeSection: mergeSection,
        applyStorageChanges: applyStorageChanges,
        sectionNames: clone(LABELS),
        schemaVersion: VERSION
    };
    if (typeof document !== 'undefined') init();
})();