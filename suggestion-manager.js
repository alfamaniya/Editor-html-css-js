/* مدیریت بانک‌ها و کلمات پیشنهادی؛ متصل به بانک واقعی تکمیل خودکار */
(function () {
    'use strict';
    var STORAGE_KEY = 'html-editor-suggestion-manager-v1';
    var data = window.EDITOR_INTELLISENSE_DATA;
    if (!data || typeof data !== 'object') return;

    var languagePrefixes = { html: ['html'], css: ['css'], js: ['js'] };
    var languageLabels = { html: 'HTML', css: 'CSS', js: 'JavaScript' };
    var categories = { html: [], css: [], js: [] };
    var dirty = false, selected = null, expanded = {}, baseline = '', modal = null;

    function clone(value) { return JSON.parse(JSON.stringify(value)); }
    function validValue(value) { return Array.isArray(value) && value.length <= 10000; }
    function isManagedKey(key, lang) {
        if (key === 'snippets') return true;
        return languagePrefixes[lang].some(function (prefix) { return key.toLowerCase().indexOf(prefix.toLowerCase()) === 0; });
    }
    function languageForKey(key) {
        if (/^html/i.test(key)) return 'html';
        if (/^css/i.test(key)) return 'css';
        if (/^js/i.test(key)) return 'js';
        return '';
    }
    function getSnapshot() {
        var result = {};
        Object.keys(data).forEach(function (key) {
            if (key === 'snippets' && data.snippets && typeof data.snippets === 'object') {
                result.snippets = {};
                ['html', 'css', 'js'].forEach(function (lang) {
                    if (Array.isArray(data.snippets[lang])) result.snippets[lang] = clone(data.snippets[lang]);
                });
            } else if (languageForKey(key) && Array.isArray(data[key])) result[key] = clone(data[key]);
        });
        return result;
    }
    function applySnapshot(snapshot) {
        if (!snapshot || typeof snapshot !== 'object') return;
        Object.keys(snapshot).forEach(function (key) {
            if (key === 'snippets' && snapshot.snippets && typeof snapshot.snippets === 'object') {
                data.snippets = data.snippets || {};
                ['html', 'css', 'js'].forEach(function (lang) {
                    if (validValue(snapshot.snippets[lang])) data.snippets[lang] = clone(snapshot.snippets[lang]);
                });
            } else if (languageForKey(key) && validValue(snapshot[key])) data[key] = clone(snapshot[key]);
        });
    }
    function loadSaved() {
        try {
            var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
            if (saved && saved.version === 1 && saved.data) applySnapshot(saved.data);
        } catch (error) { console.warn('بارگذاری بانک پیشنهادها انجام نشد.', error); }
        baseline = JSON.stringify(getSnapshot());
    }
    loadSaved();

    function ensureModal() {
        if (modal) return;
        modal = document.createElement('section');
        modal.id = 'suggestionManagerModal';
        modal.className = 'suggestion-manager-modal';
        modal.hidden = true;
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'suggestionManagerTitle');
        modal.setAttribute('dir', 'rtl');
        modal.innerHTML = '<div class="sm-shell"><header class="sm-top"><div><h2 id="suggestionManagerTitle">مدیریت کلمات پیشنهادی</h2><p>ویرایش مستقیم بانک‌های مورد استفادهٔ تکمیل خودکار</p></div><div class="sm-actions"><button type="button" id="smNewBank">بانک سفارشی</button><button type="button" id="smNewCategory">دسته‌بندی جدید</button><button type="button" id="smNewWord">کلمه جدید</button><button type="button" id="smSave" class="primary">ذخیره تغییرات</button><button type="button" id="smClose" aria-label="بستن پنجره">بستن ✕</button></div></header><div class="sm-search"><label for="smSearch">جست‌وجو در بانک‌ها و کلمات</label><input id="smSearch" type="search" placeholder="نام کلمه، دسته‌بندی یا بانک…"><span id="smStatus" role="status" aria-live="polite">آماده</span></div><div class="sm-workspace"><aside class="sm-tree-panel"><h3>درخت بانک‌ها</h3><div id="smTree" class="sm-tree"></div></aside><section class="sm-editor-panel"><h3 id="smEditorTitle">یک کلمه یا دسته‌بندی را انتخاب کنید</h3><div id="smEditor" class="sm-editor"><p class="sm-empty">برای مشاهده یا ویرایش، یک گره از درخت انتخاب کنید.</p></div></section></div></div>';
        document.body.appendChild(modal);
        modal.querySelector('#smClose').addEventListener('click', closeModal);
        modal.querySelector('#smSave').addEventListener('click', saveChanges);
        modal.querySelector('#smSearch').addEventListener('input', renderTree);
        modal.querySelector('#smNewWord').addEventListener('click', function () { editNode({ kind: 'word', lang: selected && selected.lang || 'html', key: selected && selected.key || 'htmlTags', index: -1 }); });
        modal.querySelector('#smNewCategory').addEventListener('click', addCategory);
        modal.querySelector('#smNewBank').addEventListener('click', addBank);
        modal.addEventListener('click', function (event) { if (event.target === modal) closeModal(); });
        document.addEventListener('keydown', function (event) {
            if (modal.hidden) return;
            if (event.key === 'Escape') { event.preventDefault(); closeModal(); }
        });
    }
    function labelForEntry(entry) {
        if (typeof entry === 'string') return entry;
        if (entry && typeof entry === 'object') return String(entry.label || entry.name || entry.key || '(بدون عنوان)');
        return String(entry);
    }
    function arraysFor(lang) {
        var result = [];
        Object.keys(data).forEach(function (key) {
            if (languageForKey(key) === lang && Array.isArray(data[key])) result.push({ key: key, items: data[key] });
        });
        if (data.snippets && Array.isArray(data.snippets[lang])) result.push({ key: 'snippets.' + lang, items: data.snippets[lang] });
        return result.sort(function (a, b) { return a.key.localeCompare(b.key); });
    }
    function listForKey(key) {
        if (key.indexOf('snippets.') === 0) return data.snippets && data.snippets[key.split('.')[1]];
        return data[key];
    }
    function setList(key, value) {
        if (key.indexOf('snippets.') === 0) { data.snippets = data.snippets || {}; data.snippets[key.split('.')[1]] = value; }
        else data[key] = value;
    }
    function renderTree() {
        if (!modal) return;
        var tree = modal.querySelector('#smTree'), query = modal.querySelector('#smSearch').value.trim().toLowerCase();
        tree.textContent = '';
        ['html', 'css', 'js'].forEach(function (lang) {
            var arrays = arraysFor(lang);
            var bank = document.createElement('details'); bank.open = expanded[lang] !== false;
            var bankSummary = document.createElement('summary'); bankSummary.textContent = languageLabels[lang] + ' (' + arrays.reduce(function (n, a) { return n + a.items.length; }, 0) + ')';
            bank.appendChild(bankSummary);
            arrays.forEach(function (group) {
                var entries = group.items.map(function (entry, index) { return { entry: entry, index: index, label: labelForEntry(entry) }; });
                var filtered = entries.filter(function (item) { return !query || (group.key + ' ' + item.label + ' ' + (item.entry.description || '')).toLowerCase().includes(query); });
                if (query && !filtered.length && !group.key.toLowerCase().includes(query)) return;
                var category = document.createElement('details'); category.open = !!query || expanded[group.key] !== false;
                var summary = document.createElement('summary'); summary.textContent = group.key + ' (' + group.items.length + ')'; category.appendChild(summary);
                summary.addEventListener('click', function () { expanded[group.key] = !category.open; });
                filtered.forEach(function (item) {
                    var button = document.createElement('button'); button.type = 'button'; button.className = 'sm-tree-word';
                    button.textContent = item.label; button.title = group.key + ' / ' + item.label;
                    if (selected && selected.key === group.key && selected.index === item.index) button.classList.add('selected');
                    button.addEventListener('click', function () { selected = { kind: 'word', lang: lang, key: group.key, index: item.index }; renderTree(); editNode(selected); });
                    category.appendChild(button);
                });
                var add = document.createElement('button'); add.type = 'button'; add.className = 'sm-tree-add'; add.textContent = '+ افزودن به این دسته';
                add.addEventListener('click', function () { selected = { kind: 'word', lang: lang, key: group.key, index: -1 }; editNode(selected); });
                category.appendChild(add); bank.appendChild(category);
            });
            tree.appendChild(bank);
        });
        var custom = readCustomBanks();
        if (custom.length) {
            var customBank = document.createElement('details'); customBank.open = true;
            var sum = document.createElement('summary'); sum.textContent = 'بانک‌های سفارشی (' + custom.length + ')'; customBank.appendChild(sum);
            custom.forEach(function (bank, bi) {
                var cat = document.createElement('details'); cat.open = true;
                var cs = document.createElement('summary'); cs.textContent = bank.name + ' (' + bank.words.length + ')'; cat.appendChild(cs);
                bank.words.filter(function (word) { return !query || (bank.name + ' ' + word.label).toLowerCase().includes(query); }).forEach(function (word, wi) {
                    var b = document.createElement('button'); b.type = 'button'; b.className = 'sm-tree-word'; b.textContent = word.label;
                    b.addEventListener('click', function () { selected = { kind: 'customWord', bankIndex: bi, index: wi }; renderTree(); editNode(selected); });
                    cat.appendChild(b);
                }); customBank.appendChild(cat);
            }); tree.appendChild(customBank);
        }
        if (!tree.children.length) tree.innerHTML = '<p class="sm-empty">نتیجه‌ای پیدا نشد.</p>';
    }
    function renderField(label, id, value, multiline) {
        var wrap = document.createElement('label'); wrap.className = 'sm-field'; wrap.textContent = label;
        var input = multiline ? document.createElement('textarea') : document.createElement('input');
        input.id = id; input.value = value == null ? '' : String(value); input.dir = 'auto';
        if (multiline) input.rows = 4;
        wrap.appendChild(input); return wrap;
    }
    function editNode(node) {
        selected = node;
        var editor = modal.querySelector('#smEditor'), title = modal.querySelector('#smEditorTitle');
        editor.textContent = '';
        if (node.kind === 'customWord') {
            var custom = readCustomBanks(), word = custom[node.bankIndex].words[node.index];
            title.textContent = 'ویرایش کلمهٔ سفارشی';
            editor.appendChild(renderField('نام کلمه', 'smLabel', word.label));
            editor.appendChild(renderField('متن درج‌شونده', 'smInsert', word.insert, true));
            editor.appendChild(renderField('توضیحات', 'smDescription', word.description || ''));
            addEditorButtons(editor, function () { word.label = modal.querySelector('#smLabel').value.trim(); word.insert = modal.querySelector('#smInsert').value; word.description = modal.querySelector('#smDescription').value; writeCustomBanks(custom); dirty = true; renderTree(); editNode(node); }, function () { custom[node.bankIndex].words.splice(node.index, 1); writeCustomBanks(custom); dirty = true; selected = null; renderTree(); editor.innerHTML = '<p class="sm-empty">کلمه حذف شد؛ برای نهایی‌کردن، ذخیره تغییرات را بزنید.</p>'; });
            return;
        }
        var list = listForKey(node.key), entry = node.index < 0 ? null : list[node.index];
        title.textContent = node.index < 0 ? 'افزودن کلمه به ' + node.key : 'ویرایش ' + labelForEntry(entry);
        editor.appendChild(renderField('نام / متن نمایشی', 'smLabel', entry == null ? '' : labelForEntry(entry)));
        var objectEntry = entry && typeof entry === 'object';
        if (objectEntry) {
            editor.appendChild(renderField('متن یا پیشوند درج‌شونده', 'smPrefix', entry.prefix !== undefined ? entry.prefix : entry.insert !== undefined ? entry.insert : '', true));
            editor.appendChild(renderField('پسوند درج‌شونده', 'smSuffix', entry.suffix || '', true));
            editor.appendChild(renderField('توضیحات', 'smDescription', entry.description || '', true));
        } else {
            editor.appendChild(renderField('توضیحات اختیاری', 'smDescription', '', true));
            editor.appendChild(renderField('متن درج‌شونده (در صورت تفاوت با نام)', 'smInsert', entry == null ? '' : entry, true));
        }
        addEditorButtons(editor, function () {
            var label = modal.querySelector('#smLabel').value.trim();
            if (!label) { setStatus('نام کلمه الزامی است.', true); return; }
            var result;
            if (objectEntry) {
                result = clone(entry); result.label = label;
                if ('prefix' in result) result.prefix = modal.querySelector('#smPrefix').value;
                else if ('insert' in result) result.insert = modal.querySelector('#smPrefix').value;
                if ('suffix' in result) result.suffix = modal.querySelector('#smSuffix').value;
                if ('description' in result) result.description = modal.querySelector('#smDescription').value;
            } else {
                var insert = modal.querySelector('#smInsert').value;
                result = node.index >= 0 && !insert ? label : (insert && insert !== label ? { label: label, prefix: insert, suffix: '', description: modal.querySelector('#smDescription').value } : label);
            }
            if (node.index < 0) { if (list.some(function (item) { return labelForEntry(item) === label; })) { setStatus('کلمه‌ای با این نام از قبل وجود دارد.', true); return; } list.push(result); node.index = list.length - 1; }
            else list[node.index] = result;
            setList(node.key, list); dirty = true; renderTree(); editNode(node); setStatus('تغییر محلی انجام شد؛ برای ماندگاری ذخیره کنید.');
        }, node.index < 0 ? null : function () {
            if (!window.confirm('این کلمه از بانک پیشنهادها حذف شود؟')) return;
            list.splice(node.index, 1); setList(node.key, list); dirty = true; selected = null; renderTree();
            editor.innerHTML = '<p class="sm-empty">کلمه حذف شد؛ برای نهایی‌کردن، ذخیره تغییرات را بزنید.</p>';
        });
    }
    function addEditorButtons(editor, onSave, onDelete) {
        var actions = document.createElement('div'); actions.className = 'sm-editor-actions';
        var save = document.createElement('button'); save.type = 'button'; save.className = 'primary'; save.textContent = 'اعمال ویرایش';
        save.addEventListener('click', onSave); actions.appendChild(save);
        if (onDelete) { var del = document.createElement('button'); del.type = 'button'; del.className = 'danger'; del.textContent = 'حذف'; del.addEventListener('click', onDelete); actions.appendChild(del); }
        editor.appendChild(actions);
    }
    function readCustomBanks() {
        try { var value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); return Array.isArray(value.customBanks) ? value.customBanks : []; }
        catch (error) { return []; }
    }
    function writeCustomBanks(banks) {
        try { var value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); value.version = 1; value.customBanks = banks; localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); }
        catch (error) { setStatus('ذخیرهٔ بانک سفارشی در مرورگر ناموفق بود.', true); }
    }
    function addCategory() {
        var lang = selected && selected.lang || 'html';
        var name = window.prompt('نام دسته‌بندی جدید را وارد کنید (مثلاً cssCustomValues):');
        if (!name) return;
        name = name.trim();
        var key = name.replace(/[^\w.-]/g, '');
        if (!key || data[key] !== undefined || !/^(html|css|js)/i.test(key)) { setStatus('نام دسته باید یکتا و با html، css یا js آغاز شود.', true); return; }
        data[key] = []; selected = { kind: 'word', lang: languageForKey(key) || lang, key: key, index: -1 }; dirty = true; renderTree(); editNode(selected);
    }
    function addBank() {
        var name = window.prompt('نام بانک سفارشی را وارد کنید:');
        if (!name || !name.trim()) return;
        var banks = readCustomBanks();
        if (banks.some(function (bank) { return bank.name.toLowerCase() === name.trim().toLowerCase(); })) { setStatus('نام این بانک از قبل وجود دارد.', true); return; }
        banks.push({ id: 'custom-' + Date.now().toString(36), name: name.trim(), words: [] });
        writeCustomBanks(banks); dirty = true; renderTree(); setStatus('بانک سفارشی ایجاد شد؛ کلمات آن را از بخش بانک‌های سفارشی مدیریت کنید.');
    }
    function setStatus(message, error) {
        if (!modal) return;
        var status = modal.querySelector('#smStatus'); status.textContent = message; status.classList.toggle('error', !!error);
    }
    function saveChanges() {
        try {
            var snapshot = getSnapshot();
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, data: snapshot, customBanks: readCustomBanks() }));
            baseline = JSON.stringify(snapshot); dirty = false;
            setStatus('تغییرات ذخیره شد و بانک‌های فعال در همین ویرایشگر به‌روزرسانی شدند.');
        } catch (error) { setStatus('ذخیره‌سازی ناموفق بود؛ فضای ذخیره‌سازی مرورگر را بررسی کنید.', true); }
    }
    function openManager() {
        ensureModal(); modal.hidden = false; document.body.classList.add('suggestion-manager-open');
        renderTree(); setStatus(dirty ? 'تغییرات ذخیره‌نشده دارید.' : 'آماده');
        modal.querySelector('#smSearch').focus();
    }
    function closeModal() {
        if (!modal || modal.hidden) return;
        if (dirty && !window.confirm('تغییراتی دارید که هنوز ذخیره نشده‌اند. بدون ذخیره خارج می‌شوید؟')) return;
        if (dirty) { try { applySnapshot(JSON.parse(baseline)); } catch (error) {} dirty = false; renderTree(); }
        modal.hidden = true; document.body.classList.remove('suggestion-manager-open');
        var trigger = document.getElementById('btnSuggestionManager'); if (trigger) trigger.focus();
    }
    document.addEventListener('click', function (event) {
        var button = event.target.closest('#btnSuggestionManager');
        if (button) { event.preventDefault(); openManager(); }
    });
    window.addEventListener('beforeunload', function (event) {
        if (dirty) { event.preventDefault(); event.returnValue = ''; }
    });
    window.SuggestionWordManager = { open: openManager, refresh: renderTree };
})();