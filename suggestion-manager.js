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
    var customBanks = [], categoryLabels = {}, previousFocus = null;
    var UI_STORAGE_KEY = 'html-editor-suggestion-manager-ui-v1';

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
    function stripManagedEntries(value) {
        if (Array.isArray(value)) return value.filter(function (item) {
            return !(item && typeof item === 'object' && item.__suggestionManagerBankId);
        }).map(stripManagedEntries);
        if (value && typeof value === 'object') {
            var result = {};
            Object.keys(value).forEach(function (key) { result[key] = stripManagedEntries(value[key]); });
            return result;
        }
        return value;
    }
    function getSnapshot() {
        var result = {};
        Object.keys(data).forEach(function (key) {
            if (key === 'snippets' && data.snippets && typeof data.snippets === 'object') {
                result.snippets = stripManagedEntries(data.snippets);
            } else if (/^(html|css|js)/i.test(key) && data[key] && typeof data[key] === 'object') {
                result[key] = stripManagedEntries(data[key]);
            }
        });
        return result;
    }
    function applySnapshot(snapshot) {
        if (!snapshot || typeof snapshot !== 'object') return;
        Object.keys(data).forEach(function (key) {
            if (/^(html|css|js)/i.test(key) && Object.prototype.hasOwnProperty.call(snapshot, key) === false) {
                if (Array.isArray(data[key]) || (data[key] && typeof data[key] === 'object')) delete data[key];
            }
        });
        Object.keys(snapshot).forEach(function (key) {
            if (key === 'snippets' && snapshot.snippets && typeof snapshot.snippets === 'object') {
                data.snippets = clone(snapshot.snippets);
            } else if (/^(html|css|js)/i.test(key) && snapshot[key] && typeof snapshot[key] === 'object') {
                data[key] = clone(snapshot[key]);
            }
        });
    }
    function getBaseline() {
        return JSON.stringify({ data: getSnapshot(), customBanks: customBanks, categoryLabels: categoryLabels });
    }
    function markDirty(message) {
        dirty = true;
        if (modal) {
            var save = modal.querySelector('#smSave');
            if (save) save.disabled = false;
        }
        setStatus(message || 'تغییرات ذخیره‌نشده دارید.');
    }
    function loadSaved() {
        try {
            var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
            if (saved && saved.version === 1 && saved.data) {
                applySnapshot(saved.data);
                customBanks = Array.isArray(saved.customBanks) ? clone(saved.customBanks) : [];
                categoryLabels = saved.categoryLabels && typeof saved.categoryLabels === 'object' ? clone(saved.categoryLabels) : {};
            }
        } catch (error) { console.warn('بارگذاری بانک پیشنهادها انجام نشد.', error); }
        syncCustomBanks();
        baseline = getBaseline();
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
        modal.innerHTML = '<div class="sm-shell"><header class="sm-top"><div><h2 id="suggestionManagerTitle">مدیریت کلمات پیشنهادی</h2><p>ویرایش مستقیم بانک‌های مورد استفادهٔ تکمیل خودکار</p></div><div class="sm-actions"><button type="button" id="smNewBank">بانک سفارشی</button><button type="button" id="smNewCategory">دسته‌بندی جدید</button><button type="button" id="smNewWord">کلمه جدید</button><button type="button" id="smSave" class="primary" disabled>ذخیره تغییرات</button><button type="button" id="smClose" aria-label="بستن پنجره">بستن ✕</button></div></header><div class="sm-search"><label for="smSearch">جست‌وجو</label><input id="smSearch" type="search" placeholder="نام کلمه، دسته‌بندی، بانک یا شناسه…"><label for="smLangFilter">زبان</label><select id="smLangFilter"><option value="all">همه</option><option value="html">HTML</option><option value="css">CSS</option><option value="js">JavaScript</option></select><label for="smTypeFilter">نوع</label><select id="smTypeFilter"><option value="all">همه</option><option value="category">دسته‌بندی</option><option value="word">کلمه</option></select><button type="button" id="smResetFilters">پاک‌کردن فیلترها</button><span id="smResultCount" aria-live="polite">۰ نتیجه</span><span id="smStatus" role="status" aria-live="polite">آماده</span></div><nav class="sm-mobile-tabs" aria-label="نمایش پنل"><button type="button" data-sm-view="tree" aria-pressed="true">درخت بانک‌ها</button><button type="button" data-sm-view="details" aria-pressed="false">جزئیات</button></nav><div class="sm-workspace" data-mobile-view="tree"><aside class="sm-tree-panel"><h3>درخت بانک‌ها</h3><div id="smTree" class="sm-tree"></div></aside><div id="smSplitter" class="sm-splitter" role="separator" tabindex="0" aria-label="تغییر عرض پنل درخت" aria-orientation="vertical"></div><section class="sm-editor-panel"><h3 id="smEditorTitle">یک کلمه یا دسته‌بندی را انتخاب کنید</h3><div id="smEditor" class="sm-editor"><p class="sm-empty">برای مشاهده یا ویرایش، یک گره از درخت انتخاب کنید.</p></div></section></div></div>';
        document.body.appendChild(modal);
        modal.querySelector('#smClose').addEventListener('click', closeModal);
        modal.querySelector('#smSave').addEventListener('click', saveChanges);
        modal.querySelector('#smSearch').addEventListener('input', renderTree);
        ['#smLangFilter', '#smTypeFilter'].forEach(function (selector) { modal.querySelector(selector).addEventListener('change', renderTree); });
        modal.querySelector('#smResetFilters').addEventListener('click', function () { modal.querySelector('#smSearch').value = ''; modal.querySelector('#smLangFilter').value = 'all'; modal.querySelector('#smTypeFilter').value = 'all'; renderTree(); });
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
        if (lang === 'css' && data.cssValues && typeof data.cssValues === 'object') {
            Object.keys(data.cssValues).forEach(function (name) {
                if (Array.isArray(data.cssValues[name])) result.push({ key: 'cssValues.' + name, items: data.cssValues[name] });
            });
        }
        if (lang === 'html' && data.htmlAttrsByTag && typeof data.htmlAttrsByTag === 'object') {
            Object.keys(data.htmlAttrsByTag).forEach(function (name) {
                if (Array.isArray(data.htmlAttrsByTag[name])) result.push({ key: 'htmlAttrsByTag.' + name, items: data.htmlAttrsByTag[name] });
            });
        }
        if (lang === 'js' && data.jsMembers && typeof data.jsMembers === 'object') {
            Object.keys(data.jsMembers).forEach(function (name) {
                if (Array.isArray(data.jsMembers[name])) result.push({ key: 'jsMembers.' + name, items: data.jsMembers[name] });
            });
        }
        if (data.snippets && Array.isArray(data.snippets[lang])) result.push({ key: 'snippets.' + lang, items: data.snippets[lang] });
        return result.sort(function (a, b) { return a.key.localeCompare(b.key); });
    }
    function listForKey(key) {
        var parts = key.split('.');
        if (parts[0] === 'snippets') return data.snippets && data.snippets[parts[1]];
        if (parts.length === 2 && ['cssValues', 'htmlAttrsByTag', 'jsMembers'].indexOf(parts[0]) !== -1) {
            return data[parts[0]] && data[parts[0]][parts[1]];
        }
        return data[key];
    }
    function setList(key, value) {
        var parts = key.split('.');
        if (parts[0] === 'snippets') { data.snippets = data.snippets || {}; data.snippets[parts[1]] = value; }
        else if (parts.length === 2 && ['cssValues', 'htmlAttrsByTag', 'jsMembers'].indexOf(parts[0]) !== -1) {
            data[parts[0]] = data[parts[0]] || {}; data[parts[0]][parts[1]] = value;
        } else data[key] = value;
    }
    function defaultTarget(lang) {
        return lang === 'css' ? 'cssProperties' : lang === 'js' ? 'jsWords' : 'htmlTags';
    }
    function targetList(target) {
        if (!target || typeof target !== 'string') return null;
        if (target.indexOf('snippets.') === 0) {
            var snippetLang = target.split('.')[1];
            if (['html', 'css', 'js'].indexOf(snippetLang) === -1) return null;
            data.snippets = data.snippets || {};
            data.snippets[snippetLang] = Array.isArray(data.snippets[snippetLang]) ? data.snippets[snippetLang] : [];
            return data.snippets[snippetLang];
        }
        if (target.indexOf('cssValues.') === 0) {
            data.cssValues = data.cssValues || {};
            var property = target.slice('cssValues.'.length);
            data.cssValues[property] = Array.isArray(data.cssValues[property]) ? data.cssValues[property] : [];
            return data.cssValues[property];
        }
        var list = listForKey(target);
        return Array.isArray(list) ? list : null;
    }
    function syncCustomBanks() {
        Object.keys(data).forEach(function (key) {
            if (Array.isArray(data[key])) data[key] = data[key].filter(function (item) { return !(item && item.__suggestionManagerBankId); });
        });
        ['html', 'css', 'js'].forEach(function (lang) {
            ['snippets', 'cssValues', 'htmlAttrsByTag', 'jsMembers'].forEach(function (root) {
                var obj = data[root];
                if (obj && typeof obj === 'object' && !Array.isArray(obj)) Object.keys(obj).forEach(function (name) {
                    if (Array.isArray(obj[name])) obj[name] = obj[name].filter(function (item) { return !(item && item.__suggestionManagerBankId); });
                });
            });
        });
        customBanks.forEach(function (bank) {
            if (!bank || !bank.id || !bank.lang || !Array.isArray(bank.words)) return;
            var target = bank.target || defaultTarget(bank.lang);
            var list = targetList(target);
            if (!list) return;
            bank.words.forEach(function (word) {
                if (!word || word.active === false || !String(word.label || '').trim() || !String(word.insert || '').trim()) return;
                list.push({ label: String(word.label), insert: String(word.insert), description: String(word.description || ''),
                    active: word.active !== false, __suggestionManagerBankId: bank.id, __suggestionManagerWordId: word.id || '' });
            });
        });
    }
    function renderTree() {
        if (!modal) return;
        var tree = modal.querySelector('#smTree');
        var query = modal.querySelector('#smSearch').value.trim().toLowerCase();
        var langFilter = modal.querySelector('#smLangFilter').value;
        var typeFilter = modal.querySelector('#smTypeFilter').value;
        var resultCount = 0;
        tree.textContent = '';
        ['html', 'css', 'js'].forEach(function (lang) {
            if (langFilter !== 'all' && langFilter !== lang) return;
            var arrays = arraysFor(lang);
            var bank = document.createElement('details'); bank.open = !!query || expanded[lang] !== false;
            var bankSummary = document.createElement('summary');
            bankSummary.textContent = languageLabels[lang] + ' (' + arrays.reduce(function (n, a) { return n + a.items.filter(function (entry) { return !(entry && entry.__suggestionManagerBankId); }).length; }, 0) + ')';
            bank.appendChild(bankSummary);
            arrays.forEach(function (group) {
                var entries = group.items.map(function (entry, index) { return { entry: entry, index: index, label: labelForEntry(entry) }; })
                    .filter(function (item) { return !(item.entry && item.entry.__suggestionManagerBankId); });
                var categoryMatch = (group.key + ' ' + lang).toLowerCase().indexOf(query) !== -1;
                var filtered = entries.filter(function (item) {
                    var haystack = (group.key + ' ' + item.label + ' ' + (item.entry && item.entry.description || '') + ' ' + (item.entry && item.entry.id || '')).toLowerCase();
                    return !query || categoryMatch || haystack.indexOf(query) !== -1;
                });
                if (typeFilter === 'category' && !categoryMatch) return;
                if (typeFilter === 'word' && !filtered.length) return;
                if (query && !filtered.length && !categoryMatch) return;
                resultCount += typeFilter === 'category' ? 1 : filtered.length;
                var category = document.createElement('details'); category.open = !!query || expanded[group.key] !== false;
                var summary = document.createElement('summary'); summary.textContent = (categoryLabels[group.key] || group.key) + ' (' + entries.length + ')'; category.appendChild(summary);
                summary.addEventListener('click', function () {
                    expanded[group.key] = !category.open;
                    selected = { kind: 'category', lang: lang, key: group.key };
                    editNode(selected);
                });
                var tools = document.createElement('span'); tools.className = 'sm-node-tools';
                var rename = document.createElement('button'); rename.type = 'button'; rename.textContent = 'ویرایش دسته'; rename.title = 'ویرایش مشخصات دسته‌بندی';
                rename.addEventListener('click', function (event) { event.preventDefault(); event.stopPropagation(); selected = { kind: 'category', lang: lang, key: group.key }; editNode(selected); });
                tools.appendChild(rename); category.appendChild(tools);
                if (typeFilter !== 'category') filtered.forEach(function (item) {
                    var button = document.createElement('button'); button.type = 'button'; button.className = 'sm-tree-word';
                    button.textContent = item.label; button.title = group.key + ' / ' + item.label;
                    if (selected && selected.kind === 'word' && selected.key === group.key && selected.index === item.index) button.classList.add('selected');
                    button.addEventListener('click', function () { selected = { kind: 'word', lang: lang, key: group.key, index: item.index }; renderTree(); editNode(selected); });
                    category.appendChild(button);
                });
                if (typeFilter !== 'category') {
                    var add = document.createElement('button'); add.type = 'button'; add.className = 'sm-tree-add'; add.textContent = '+ افزودن به این دسته';
                    add.addEventListener('click', function () { selected = { kind: 'word', lang: lang, key: group.key, index: -1 }; editNode(selected); });
                    category.appendChild(add);
                }
                bank.appendChild(category);
            });
            if (bank.children.length > 1) tree.appendChild(bank);
        });
        var custom = readCustomBanks();
        if (typeFilter !== 'category' && custom.some(function (bank) { return langFilter === 'all' || bank.lang === langFilter; })) {
            var customBank = document.createElement('details'); customBank.open = true;
            var sum = document.createElement('summary'); sum.textContent = 'بانک‌های سفارشی (' + custom.length + ')'; customBank.appendChild(sum);
            custom.forEach(function (bank, bi) {
                if (langFilter !== 'all' && bank.lang !== langFilter) return;
                var words = bank.words || [];
                var matching = words.map(function (word, wi) { return { word: word, index: wi }; }).filter(function (item) {
                    return !query || (bank.name + ' ' + bank.id + ' ' + bank.lang + ' ' + bank.target + ' ' + item.word.label + ' ' + item.word.insert + ' ' + (item.word.description || '')).toLowerCase().indexOf(query) !== -1;
                });
                if (query && !matching.length && (bank.name + ' ' + bank.id + ' ' + bank.target).toLowerCase().indexOf(query) === -1) return;
                resultCount += matching.length;
                var cat = document.createElement('details'); cat.open = true;
                var cs = document.createElement('summary'); cs.textContent = bank.name + ' (' + words.length + ')'; cat.appendChild(cs);
                cs.addEventListener('click', function () { selected = { kind: 'customBank', bankIndex: bi }; editNode(selected); });
                var bankEdit = document.createElement('button'); bankEdit.type = 'button'; bankEdit.className = 'sm-tree-add'; bankEdit.textContent = 'ویرایش بانک';
                bankEdit.addEventListener('click', function () { selected = { kind: 'customBank', bankIndex: bi }; editNode(selected); });
                cat.appendChild(bankEdit);
                matching.forEach(function (item) {
                    var b = document.createElement('button'); b.type = 'button'; b.className = 'sm-tree-word';
                    b.textContent = (item.word.active === false ? '⏸ ' : '') + item.word.label;
                    b.addEventListener('click', function () { selected = { kind: 'customWord', bankIndex: bi, index: item.index }; renderTree(); editNode(selected); });
                    cat.appendChild(b);
                });
                var addWord = document.createElement('button'); addWord.type = 'button'; addWord.className = 'sm-tree-add'; addWord.textContent = '+ افزودن کلمه به این بانک';
                addWord.addEventListener('click', function () { selected = { kind: 'customWord', bankIndex: bi, index: -1 }; editNode(selected); });
                cat.appendChild(addWord); customBank.appendChild(cat);
            });
            tree.appendChild(customBank);
        }
        if (!tree.children.length) tree.innerHTML = '<p class="sm-empty">نتیجه‌ای پیدا نشد.</p>';
        modal.querySelector('#smResultCount').textContent = resultCount + ' نتیجه';
    }
    function editNode(node) {
        selected = node;
        var workspace = modal.querySelector('.sm-workspace');
        if (window.matchMedia && window.matchMedia('(max-width: 760px)').matches && workspace) {
            workspace.dataset.mobileView = 'details';
            modal.querySelectorAll('[data-sm-view]').forEach(function (button) { button.setAttribute('aria-pressed', String(button.dataset.smView === 'details')); });
        }
        var editor = modal.querySelector('#smEditor'), title = modal.querySelector('#smEditorTitle');
        editor.textContent = '';
        if (node.kind === 'customBank') {
            var banks = readCustomBanks(), bank = banks[node.bankIndex];
            if (!bank) { setStatus('بانک انتخاب‌شده دیگر وجود ندارد.', true); return; }
            title.textContent = 'ویرایش بانک سفارشی';
            editor.appendChild(renderField('نام نمایشی بانک', 'smBankName', bank.name));
            var langField = document.createElement('label'); langField.className = 'sm-field'; langField.textContent = 'زبان پیشنهاد';
            var langSelect = document.createElement('select'); langSelect.id = 'smBankLang';
            [['html','HTML'],['css','CSS'],['js','JavaScript']].forEach(function (pair) { var option = document.createElement('option'); option.value = pair[0]; option.textContent = pair[1]; langSelect.appendChild(option); });
            langSelect.value = bank.lang || 'html'; langField.appendChild(langSelect); editor.appendChild(langField);
            editor.appendChild(renderField('مسیر منبع پیشنهاد', 'smBankTarget', bank.target || defaultTarget(bank.lang || 'html')));
            addEditorButtons(editor, function () {
                var name = modal.querySelector('#smBankName').value.trim(), lang = modal.querySelector('#smBankLang').value;
                var target = modal.querySelector('#smBankTarget').value.trim() || defaultTarget(lang);
                if (!name) { setStatus('نام بانک الزامی است.', true); return; }
                if (banks.some(function (other, index) { return index !== node.bankIndex && other.name.toLowerCase() === name.toLowerCase(); })) { setStatus('بانکی با این نام وجود دارد.', true); return; }
                if (target.indexOf('cssValues.') !== 0 && target.indexOf('snippets.') !== 0 && !Array.isArray(data[target])) { setStatus('مسیر منبع معتبر نیست؛ از کلید آرایه‌ای موجود استفاده کنید.', true); return; }
                bank.name = name; bank.lang = lang; bank.target = target;
                writeCustomBanks(banks); renderTree(); editNode(node);
            }, function () {
                var count = (bank.words || []).length;
                if (!window.confirm('حذف بانک «' + bank.name + '» و ' + count + ' کلمهٔ آن؟ این کلمات از پیشنهادهای فعال نیز حذف می‌شوند.')) return;
                banks.splice(node.bankIndex, 1); writeCustomBanks(banks); selected = null; renderTree();
                editor.innerHTML = '<p class="sm-empty">بانک حذف شد؛ برای نهایی‌کردن، ذخیره تغییرات را بزنید.</p>';
            });
            return;
        }
        if (node.kind === 'customWord') {
            var custom = readCustomBanks(), bankForWord = custom[node.bankIndex];
            if (!bankForWord) { setStatus('بانک انتخاب‌شده دیگر وجود ندارد.', true); return; }
            var isNewCustom = node.index < 0;
            var word = isNewCustom ? { id: 'word-' + Date.now().toString(36), label: '', insert: '', description: '', active: true } : bankForWord.words[node.index];
            if (!word) { setStatus('کلمه انتخاب‌شده دیگر وجود ندارد.', true); return; }
            title.textContent = (isNewCustom ? 'افزودن کلمه به ' : 'ویرایش کلمهٔ ') + bankForWord.name;
            editor.appendChild(renderField('عنوان نمایشی', 'smLabel', word.label));
            editor.appendChild(renderField('متن دقیق درج‌شونده', 'smInsert', word.insert, true));
            editor.appendChild(renderField('توضیحات', 'smDescription', word.description || '', true));
            var activeLabel = document.createElement('label'); activeLabel.className = 'sm-check-field';
            var activeInput = document.createElement('input'); activeInput.type = 'checkbox'; activeInput.id = 'smActive'; activeInput.checked = word.active !== false;
            activeLabel.appendChild(activeInput); activeLabel.appendChild(document.createTextNode('فعال در پیشنهادهای ویرایشگر')); editor.appendChild(activeLabel);
            addEditorButtons(editor, function () {
                var label = modal.querySelector('#smLabel').value.trim(), insert = modal.querySelector('#smInsert').value;
                if (!label || !insert.trim()) { setStatus('عنوان نمایشی و متن درج‌شونده الزامی هستند.', true); return; }
                if (bankForWord.words.some(function (other, index) { return index !== node.index && other.label.toLowerCase() === label.toLowerCase(); })) { setStatus('کلمه‌ای با این عنوان در بانک وجود دارد.', true); return; }
                word.label = label; word.insert = insert; word.description = modal.querySelector('#smDescription').value; word.active = activeInput.checked;
                if (isNewCustom) bankForWord.words.push(word);
                writeCustomBanks(custom);
                if (isNewCustom) node.index = bankForWord.words.length - 1;
                renderTree(); editNode(node); setStatus('تغییر محلی انجام شد؛ برای ماندگاری ذخیره کنید.');
            }, isNewCustom ? null : function () {
                if (!window.confirm('کلمهٔ «' + word.label + '» از بانک و پیشنهادهای فعال حذف شود؟')) return;
                bankForWord.words.splice(node.index, 1); writeCustomBanks(custom); selected = null; renderTree();
                editor.innerHTML = '<p class="sm-empty">کلمه حذف شد؛ برای نهایی‌کردن، ذخیره تغییرات را بزنید.</p>';
            });
            return;
        }
        if (node.kind === 'category') {
            var categoryList = listForKey(node.key) || [];
            var categoryKey = node.key;
            title.textContent = 'مشخصات دسته‌بندی';
            editor.appendChild(renderField('شناسهٔ فنی دسته‌بندی', 'smCategoryKey', categoryKey));
            editor.appendChild(renderField('نام نمایشی', 'smCategoryLabel', categoryLabels[categoryKey] || categoryKey));
            addEditorButtons(editor, function () {
                var nextKey = modal.querySelector('#smCategoryKey').value.trim();
                var nextLabel = modal.querySelector('#smCategoryLabel').value.trim() || nextKey;
                if (!nextKey || nextKey === 'snippets' || nextKey.indexOf(' ') !== -1) { setStatus('شناسه فنی معتبر وارد کنید.', true); return; }
                if (nextKey !== categoryKey && data[nextKey] !== undefined) { setStatus('این شناسه قبلاً استفاده شده است.', true); return; }
                if (nextKey !== categoryKey) {
                    var parts = categoryKey.split('.');
                    if (parts.length === 2 && ['cssValues','htmlAttrsByTag','jsMembers','snippets'].indexOf(parts[0]) !== -1) {
                        data[parts[0]] = data[parts[0]] || {};
                        data[parts[0]][nextKey] = data[parts[0]][parts[1]];
                        delete data[parts[0]][parts[1]];
                    } else { data[nextKey] = data[categoryKey]; delete data[categoryKey]; }
                    if (categoryLabels[categoryKey]) { categoryLabels[nextKey] = categoryLabels[categoryKey]; delete categoryLabels[categoryKey]; }
                    node.key = nextKey; categoryKey = nextKey;
                }
                if (nextLabel && nextLabel !== categoryKey) categoryLabels[categoryKey] = nextLabel;
                else if (nextLabel === categoryKey) delete categoryLabels[categoryKey];
                markDirty('مشخصات دسته‌بندی تغییر کرد؛ ذخیره کنید تا باقی بماند.');
                renderTree(); editNode(node);
            }, function () {
                var direct = categoryList.filter(function (entry) { return !(entry && entry.__suggestionManagerBankId); }).length;
                if (!window.confirm('حذف دسته‌بندی «' + categoryKey + '» و ' + direct + ' کلمهٔ مستقیم آن؟')) return;
                var parts = categoryKey.split('.');
                if (parts.length === 2 && ['cssValues','htmlAttrsByTag','jsMembers','snippets'].indexOf(parts[0]) !== -1) {
                    if (data[parts[0]]) delete data[parts[0]][parts[1]];
                } else delete data[categoryKey];
                delete categoryLabels[categoryKey];
                selected = null; markDirty('دسته‌بندی حذف شد؛ ذخیره کنید تا نهایی شود.'); renderTree();
                editor.innerHTML = '<p class="sm-empty">دسته‌بندی حذف شد.</p>';
            });
            return;
        }
                var list = listForKey(node.key), entry = node.index < 0 ? null : list[node.index];
        title.textContent = node.index < 0 ? 'افزودن کلمه به ' + node.key : 'ویرایش ' + labelForEntry(entry);
        editor.appendChild(renderField('نام / متن نمایشی', 'smLabel', entry == null ? '' : labelForEntry(entry)));
        var objectEntry = entry && typeof entry === 'object';
        if (objectEntry) {
            editor.appendChild(renderField('متن درج‌شونده', 'smPrefix', entry.insert !== undefined ? entry.insert : entry.prefix !== undefined ? entry.prefix : labelForEntry(entry), true));
            editor.appendChild(renderField('پسوند درج‌شونده (برای قالب‌ها)', 'smSuffix', entry.suffix || '', true));
            editor.appendChild(renderField('توضیحات', 'smDescription', entry.description || '', true));
        } else {
            editor.appendChild(renderField('توضیحات اختیاری', 'smDescription', '', true));
            editor.appendChild(renderField('متن درج‌شونده (در صورت تفاوت با نام)', 'smInsert', entry == null ? '' : entry, true));
        }
        var activeWrap = document.createElement('label'); activeWrap.className = 'sm-check-field';
        var activeCheck = document.createElement('input'); activeCheck.type = 'checkbox'; activeCheck.id = 'smBaseActive'; activeCheck.checked = !(entry && typeof entry === 'object' && (entry.active === false || entry.enabled === false));
        activeWrap.appendChild(activeCheck); activeWrap.appendChild(document.createTextNode('فعال در پیشنهادهای ویرایشگر')); editor.appendChild(activeWrap);
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
                result.active = activeCheck.checked;
            } else {
                var insert = modal.querySelector('#smInsert').value;
                result = node.index >= 0 && !insert && activeCheck.checked ? label : (insert && insert !== label || !activeCheck.checked ? { label: label, insert: insert || label, description: modal.querySelector('#smDescription').value, active: activeCheck.checked } : label);
            }
            if (node.index < 0) { if (list.some(function (item) { return labelForEntry(item) === label; })) { setStatus('کلمه‌ای با این نام از قبل وجود دارد.', true); return; } list.push(result); node.index = list.length - 1; }
            else list[node.index] = result;
            setList(node.key, list); markDirty(); renderTree(); editNode(node); setStatus('تغییر محلی انجام شد؛ برای ماندگاری ذخیره کنید.');
        }, node.index < 0 ? null : function () {
            if (!window.confirm('این کلمه از بانک پیشنهادها حذف شود؟')) return;
            list.splice(node.index, 1); setList(node.key, list); markDirty(); selected = null; renderTree();
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
    function readCustomBanks() { return clone(customBanks); }
    function writeCustomBanks(banks) {
        customBanks = clone(banks);
        syncCustomBanks();
        markDirty('تغییرات بانک سفارشی ذخیره‌نشده است.');
    }
    function addCategory() {
        var lang = selected && selected.lang || 'html';
        var name = window.prompt('نام دسته‌بندی جدید را وارد کنید (مثلاً cssCustomValues):');
        if (!name) return;
        name = name.trim();
        var key = name.replace(/[^\w.-]/g, '');
        if (!key || data[key] !== undefined || !/^(html|css|js)/i.test(key)) { setStatus('نام دسته باید یکتا و با html، css یا js آغاز شود.', true); return; }
        data[key] = []; selected = { kind: 'word', lang: languageForKey(key) || lang, key: key, index: -1 }; markDirty(); renderTree(); editNode(selected);
    }
    function addBank() {
        var name = window.prompt('نام بانک سفارشی را وارد کنید:');
        if (!name || !name.trim()) return;
        var banks = readCustomBanks();
        if (banks.some(function (bank) { return bank.name.toLowerCase() === name.trim().toLowerCase(); })) { setStatus('نام این بانک از قبل وجود دارد.', true); return; }
        var lang = selected && selected.lang || 'html';
        banks.push({ id: 'custom-' + Date.now().toString(36), name: name.trim(), lang: lang, target: defaultTarget(lang), words: [] });
        writeCustomBanks(banks); renderTree(); setStatus('بانک سفارشی ایجاد شد؛ برای افزودن کلمه، از گزینهٔ افزودن داخل همان بانک استفاده کنید.');
    }
    function saveUiState() {
        try {
            localStorage.setItem(UI_STORAGE_KEY, JSON.stringify({ treeWidth: treeWidthValue() }));
        } catch (error) {}
    }
    function treeWidthValue() {
        if (!modal) return 36;
        var value = parseFloat(modal.style.getPropertyValue('--sm-tree-width'));
        return Number.isFinite(value) ? Math.max(25, Math.min(65, value)) : 36;
    }
    function restoreUiState() {
        try {
            var saved = JSON.parse(localStorage.getItem(UI_STORAGE_KEY) || 'null');
            if (saved && Number.isFinite(saved.treeWidth)) modal.style.setProperty('--sm-tree-width', Math.max(25, Math.min(65, saved.treeWidth)) + '%');
        } catch (error) {}
        var splitter = modal.querySelector('#smSplitter');
        if (splitter && !splitter.dataset.bound) {
            splitter.dataset.bound = 'true';
            splitter.addEventListener('keydown', function (event) {
                if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
                event.preventDefault();
                var current = treeWidthValue() + (event.key === 'ArrowRight' ? 3 : -3);
                current = Math.max(25, Math.min(65, current));
                modal.style.setProperty('--sm-tree-width', current + '%'); saveUiState();
            });
            splitter.addEventListener('pointerdown', function (event) {
                if (window.matchMedia && window.matchMedia('(max-width: 760px)').matches) return;
                event.preventDefault();
                var startX = event.clientX, startWidth = treeWidthValue(), workspace = modal.querySelector('.sm-workspace');
                function move(moveEvent) {
                    var width = workspace.getBoundingClientRect().width || 1;
                    var next = startWidth + ((startX - moveEvent.clientX) / width * 100);
                    modal.style.setProperty('--sm-tree-width', Math.max(25, Math.min(65, next)) + '%');
                }
                function up() { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); saveUiState(); }
                document.addEventListener('pointermove', move); document.addEventListener('pointerup', up, { once: true });
            });
        }
        modal.querySelectorAll('[data-sm-view]').forEach(function (button) {
            if (button.dataset.bound) return;
            button.dataset.bound = 'true';
            button.addEventListener('click', function () {
                modal.querySelector('.sm-workspace').dataset.mobileView = button.dataset.smView;
                modal.querySelectorAll('[data-sm-view]').forEach(function (item) {
                    item.setAttribute('aria-pressed', String(item === button));
                });
            });
        });
    }
    function setStatus(message, error) {
        if (!modal) return;
        var status = modal.querySelector('#smStatus'); status.textContent = message; status.classList.toggle('error', !!error);
        status.setAttribute('aria-live', error ? 'assertive' : 'polite');
    }
    function saveChanges() {
        try {
            var snapshot = getSnapshot();
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, data: snapshot, customBanks: readCustomBanks(), categoryLabels: categoryLabels }));
            baseline = getBaseline(); dirty = false;
            var save = modal && modal.querySelector('#smSave');
            if (save) save.disabled = true;
            setStatus('تغییرات با موفقیت ذخیره شد؛ پیشنهادهای فعال در همین ویرایشگر به‌روزرسانی شدند.');
        } catch (error) {
            setStatus('ذخیره‌سازی ناموفق بود؛ تغییرات در پنجره حفظ شده‌اند. فضای ذخیره‌سازی مرورگر را بررسی کنید.', true);
        }
    }
    function openManager() {
        ensureModal(); previousFocus = document.activeElement; modal.hidden = false; document.body.classList.add('suggestion-manager-open');
        var save = modal.querySelector('#smSave'); if (save) save.disabled = !dirty;
        renderTree(); setStatus(dirty ? 'تغییرات ذخیره‌نشده دارید.' : 'آماده');
        restoreUiState(); modal.querySelector('#smSearch').focus();
    }
    function closeModal() {
        if (!modal || modal.hidden) return;
        if (dirty && !window.confirm('تغییراتی دارید که هنوز ذخیره نشده‌اند. بدون ذخیره خارج می‌شوید؟')) return;
        if (dirty) {
            try {
                var saved = JSON.parse(baseline);
                applySnapshot(saved.data || {});
                customBanks = Array.isArray(saved.customBanks) ? clone(saved.customBanks) : [];
                categoryLabels = saved.categoryLabels && typeof saved.categoryLabels === 'object' ? clone(saved.categoryLabels) : {};
                syncCustomBanks();
            } catch (error) { setStatus('بازگردانی تغییرات ناموفق بود؛ پنجره باز می‌ماند.', true); return; }
            dirty = false;
            var save = modal.querySelector('#smSave'); if (save) save.disabled = true;
            renderTree();
        }
        modal.hidden = true; document.body.classList.remove('suggestion-manager-open');
        if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
        else { var trigger = document.getElementById('btnSuggestionManager'); if (trigger) trigger.focus(); }
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