/* منطق پنل تنظیمات؛ تمام گزینه‌ها به رفتار واقعی ویرایشگر متصل‌اند. */
(function () {
    'use strict';

    const settingsButton = document.getElementById('btnSettings');
    const settingsScreen = document.getElementById('settingsScreen');
    const saveReturnButton = document.getElementById('btnSettingsSaveReturn');
    const resetButton = document.getElementById('btnSettingsResetDefaults');
    const generalStatus = document.getElementById('settingsGeneralStatus');
    const appearanceStatus = document.getElementById('settingsAppearanceStatus');
    const storageKey = 'html-editor-settings-v1';
    const legacyAppearanceKey = 'html-editor-appearance-v1';
    const splitStorageKey = 'html-editor-split-pos';
    const fontStorageKey = 'html-editor-font';
    const quickInsertStorageKey = 'html-editor-quick-insert-v1';

    /* وضعیت ذخیره‌سازی قبل از اعمال سایر گزینه‌ها به script.js ارسال شود. */
    const defaults = {
        theme: 'dark',
        accentColor: 'blue',
        density: 'normal',
        autoSaveSettings: 'on',
        fontSize: '15',
        lineNumbers: 'on',
        wrapLines: 'off',
        autocomplete: 'on',
        autoPreview: 'on',
        previewDelay: '600',
        splitRatio: '60',
        layout: 'side-by-side'
    };

    const allowedValues = {
        theme: ['dark', 'light', 'system'],
        accentColor: ['blue', 'green', 'red', 'yellow'],
        density: ['compact', 'normal', 'comfortable'],
        autoSaveSettings: ['on', 'off'],
        lineNumbers: ['on', 'off'],
        wrapLines: ['on', 'off'],
        autocomplete: ['on', 'off'],
        autoPreview: ['on', 'off'],
        previewDelay: ['300', '600', '1000'],
        layout: ['side-by-side', 'stacked']
    };

    let settings = loadSettings();

    /* رابط فقط‌خواندنی برای گرفتن تنظیمات زنده هنگام پشتیبان‌گیری */
    window.EditorBackupAPI = window.EditorBackupAPI || {};
    window.EditorBackupAPI.getSettings = function () {
        return JSON.parse(JSON.stringify(settings));
    };
    let systemThemeMedia = null;
    let toastTimer = null;
    let previouslyFocusedElement = null;

    function storageGet(key) {
        try { return window.localStorage.getItem(key); }
        catch (error) { return null; }
    }

    function storageSet(key, value) {
        try { window.localStorage.setItem(key, value); return true; }
        catch (error) { return false; }
    }

    function readObject(key) {
        try {
            const value = JSON.parse(storageGet(key) || 'null');
            return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
        } catch (error) {
            return {};
        }
    }

    function isAllowed(key, value) {
        const normalized = String(value);
        if (key === 'fontSize') {
            const size = Number(normalized);
            return Number.isInteger(size) && size >= 10 && size <= 30;
        }
        if (key === 'splitRatio') {
            const ratio = Number(normalized);
            return Number.isFinite(ratio) && ratio >= 15 && ratio <= 85;
        }
        return !!allowedValues[key] && allowedValues[key].includes(normalized);
    }

    function loadSettings() {
        const saved = readObject(storageKey);
        const legacy = readObject(legacyAppearanceKey);
        const oldSplit = Number(storageGet(splitStorageKey));
        const oldFont = Number(storageGet(fontStorageKey));
        const loaded = {};

        Object.keys(defaults).forEach(function (key) {
            if (Object.prototype.hasOwnProperty.call(saved, key) && isAllowed(key, saved[key])) {
                loaded[key] = String(saved[key]);
            } else if (['theme', 'accentColor', 'density'].includes(key) &&
                       Object.prototype.hasOwnProperty.call(legacy, key) &&
                       isAllowed(key, legacy[key])) {
                loaded[key] = String(legacy[key]);
            } else if (key === 'splitRatio' && Number.isFinite(oldSplit) && oldSplit >= 15 && oldSplit <= 85) {
                loaded[key] = String(oldSplit);
            } else if (key === 'fontSize' && Number.isInteger(oldFont) && oldFont >= 10 && oldFont <= 30) {
                loaded[key] = String(oldFont);
            } else {
                loaded[key] = defaults[key];
            }
        });
        return loaded;
    }

    try {
        if (typeof window.matchMedia === 'function') {
            systemThemeMedia = window.matchMedia('(prefers-color-scheme: light)');
        }
    } catch (error) {
        systemThemeMedia = null;
    }

    function effectiveTheme() {
        if (settings.theme !== 'system') return settings.theme;
        return systemThemeMedia && systemThemeMedia.matches ? 'light' : 'dark';
    }

    function updateSelectedOptions() {
        if (!settingsScreen) return;
        settingsScreen.querySelectorAll('[data-setting][data-value]').forEach(function (button) {
            const selected = String(settings[button.dataset.setting]) === button.dataset.value;
            button.classList.toggle('is-selected', selected);
            button.setAttribute('aria-pressed', String(selected));
        });
    }

    function updateNavigation(activeId) {
        if (!settingsScreen) return;
        settingsScreen.querySelectorAll('[data-settings-nav]').forEach(function (button) {
            const active = button.dataset.settingsNav === activeId;
            button.classList.toggle('is-active', active);
            if (active) button.setAttribute('aria-current', 'location');
            else button.removeAttribute('aria-current');
        });
    }

    function dispatchSettingChange(key) {
        window.dispatchEvent(new CustomEvent('editor-settings-change', {
            detail: { key: key, value: String(settings[key]) }
        }));
    }

    function applySettings(dispatchAll) {
        const root = document.documentElement;
        const theme = effectiveTheme();
        root.dataset.theme = theme;
        root.dataset.themePreference = settings.theme;
        root.dataset.accent = settings.accentColor;
        root.dataset.density = settings.density;
        root.dataset.lineNumbers = settings.lineNumbers;
        root.dataset.wrapLines = settings.wrapLines;
        root.dataset.layout = settings.layout;
        root.style.colorScheme = theme;
        updateSelectedOptions();
        if (dispatchAll) Object.keys(settings).forEach(dispatchSettingChange);
    }

    function updateStatus(message, appearanceRelated) {
        if (generalStatus) generalStatus.textContent = message;
        if (appearanceRelated && appearanceStatus) appearanceStatus.textContent = message;
    }

    function showToast(message, type) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = message;
        toast.className = 'toast show ' + (type || '');
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(function () {
            toast.className = 'toast ' + (type || '');
        }, 2800);
    }

    function persistSettings() {
        const saved = storageSet(storageKey, JSON.stringify(settings));
        if (!saved) return false;
        /* سه گزینهٔ ظاهر در کلید قبلی هم می‌مانند تا نسخه‌های پیشین سازگار بمانند. */
        storageSet(legacyAppearanceKey, JSON.stringify({
            theme: settings.theme,
            accentColor: settings.accentColor,
            density: settings.density
        }));
        return true;
    }

    function setSetting(key, value) {
        if (!isAllowed(key, value)) return;
        settings[key] = String(value);
        applySettings(false);
        dispatchSettingChange(key);

        if (key === 'autoSaveSettings') {
            const saved = persistSettings();
            if (saved) {
                updateStatus(settings.autoSaveSettings === 'on'
                    ? 'ذخیره‌سازی خودکار تنظیمات فعال شد.'
                    : 'ذخیره‌سازی خودکار خاموش شد؛ دکمهٔ ذخیره برای ثبت دستی در دسترس است.');
            } else {
                updateStatus('دسترسی به حافظهٔ مرورگر ممکن نیست؛ تنظیمات فقط در همین نشست می‌مانند.');
                showToast('⚠ ذخیرهٔ تنظیمات ناموفق بود.', 'error');
            }
            return;
        }

        if (settings.autoSaveSettings === 'on') {
            const saved = persistSettings();
            if (saved) {
                const appearanceRelated = ['theme', 'accentColor', 'density'].includes(key);
                updateStatus('تغییر اعمال شد و در همین مرورگر ذخیره شد.', appearanceRelated);
            } else {
                updateStatus('تغییر اعمال شد، اما ذخیره‌سازی مرورگر در دسترس نیست.');
                showToast('⚠ ذخیرهٔ تنظیمات ناموفق بود؛ دسترسی به حافظهٔ مرورگر را بررسی کنید.', 'error');
            }
        } else {
            const appearanceRelated = ['theme', 'accentColor', 'density'].includes(key);
            updateStatus('تغییر فقط در نشست فعلی اعمال شد؛ برای نگهداری آن، ذخیره‌سازی خودکار را فعال یا دستی ذخیره کنید.', appearanceRelated);
        }
    }

    function openSettingsScreen() {
        previouslyFocusedElement = document.activeElement;
        settingsScreen.hidden = false;
        settingsButton.setAttribute('aria-expanded', 'true');
        saveReturnButton.focus();
    }

    function returnToCodingScreen() {
        settingsScreen.hidden = true;
        settingsButton.setAttribute('aria-expanded', 'false');
        const focusTarget = previouslyFocusedElement && document.contains(previouslyFocusedElement)
            ? previouslyFocusedElement
            : settingsButton;
        previouslyFocusedElement = null;
        focusTarget.focus();
    }

    if (!settingsButton || !settingsScreen || !saveReturnButton) return;

    settingsButton.addEventListener('click', openSettingsScreen);
    settingsScreen.querySelectorAll('[data-setting][data-value]').forEach(function (button) {
        button.addEventListener('click', function () {
            setSetting(button.dataset.setting, button.dataset.value);
        });
    });

    saveReturnButton.addEventListener('click', function () {
        if (!persistSettings()) {
            updateStatus('ذخیره‌سازی ناموفق بود؛ تنظیمات اعمال‌شده در همین نشست باقی می‌مانند.');
            showToast('⚠ تنظیمات ذخیره نشدند.', 'error');
            return;
        }
        updateStatus('همهٔ تنظیمات ذخیره شدند.');
        returnToCodingScreen();
        showToast('✅ تنظیمات ذخیره شدند و به کدنویسی بازگشتید.', 'success');
    });

    if (resetButton) {
        resetButton.addEventListener('click', function () {
            if (!window.confirm('همهٔ تنظیمات به مقدار پیش‌فرض برگردند؟ کدهای پروژه تغییر نمی‌کنند.')) return;
            Object.keys(defaults).forEach(function (key) { settings[key] = defaults[key]; });
            applySettings(true);
            if (persistSettings()) {
                updateStatus('همهٔ تنظیمات به مقادیر پیش‌فرض بازگشتند.');
                showToast('تنظیمات به حالت پیش‌فرض برگشتند.', 'success');
            } else {
                updateStatus('تنظیمات بازنشانی شدند اما ذخیره‌سازی مرورگر در دسترس نیست.');
                showToast('⚠ تنظیمات بازنشانی شدند، اما ذخیره نشدند.', 'error');
            }
        });
    }

    settingsScreen.querySelectorAll('[data-settings-nav]').forEach(function (button) {
        button.addEventListener('click', function () {
            const target = document.getElementById(button.dataset.settingsNav);
            if (!target) return;
            updateNavigation(target.id);
            if (target.id === 'settingsQuickInsertCard') {
                window.dispatchEvent(new CustomEvent('editor-open-quick-insert-manager'));
                return;
            }
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* مدیریت فهرست درج سریع؛ آیتم‌های پیش‌فرض و سفارشی هر دو قابل ویرایش و حذف‌اند. */
    (function initQuickInsertManager() {
        const tabSelect = document.getElementById('quickInsertTab');
        const labelInput = document.getElementById('quickInsertLabel');
        const codeInput = document.getElementById('quickInsertCode');
        const addButton = document.getElementById('btnQuickInsertAdd');
        const cancelButton = document.getElementById('btnQuickInsertCancel');
        const list = document.getElementById('quickInsertList');
        const emptyMessage = document.getElementById('quickInsertEmpty');
        const status = document.getElementById('quickInsertStatus');
        const managerCard = document.getElementById('settingsQuickInsertCard');
        if (!tabSelect || !labelInput || !codeInput || !addButton || !cancelButton || !list || !emptyMessage || !status || !managerCard) return;

        const builtinStorageKey = 'html-editor-quick-insert-builtins-v1';
        let editingItemId = null;
        let editingItemType = null;
        let returnFocusTarget = null;

        /* همان بخش و همان کنترل‌ها داخل یک پنجرهٔ مستقل نمایش داده می‌شوند؛ منطق داده تغییر نمی‌کند. */
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'settings-quickinsert-modal-overlay';
        modalOverlay.hidden = true;
        modalOverlay.setAttribute('aria-hidden', 'true');
        const cardHeader = managerCard.querySelector('.settings-card-header');
        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'settings-quickinsert-modal-close';
        closeButton.setAttribute('aria-label', 'بستن پنجره مدیریت فهرست درج سریع');
        closeButton.title = 'بستن پنجره';
        closeButton.textContent = '×';
        if (cardHeader) cardHeader.appendChild(closeButton);
        managerCard.classList.add('settings-quickinsert-modal-card');
        managerCard.setAttribute('role', 'dialog');
        managerCard.setAttribute('aria-modal', 'true');
        managerCard.setAttribute('aria-labelledby', 'settingsQuickInsertTitle');
        managerCard.setAttribute('tabindex', '-1');
        modalOverlay.appendChild(managerCard);
        settingsScreen.appendChild(modalOverlay);

        function hasUnsavedQuickInsertChanges() {
            return Boolean(editingItemId || labelInput.value.trim() || codeInput.value.trim());
        }

        function openQuickInsertModal() {
            if (!modalOverlay.hidden) return;
            returnFocusTarget = settingsScreen.querySelector('[data-settings-nav="settingsQuickInsertCard"]');
            modalOverlay.hidden = false;
            modalOverlay.setAttribute('aria-hidden', 'false');
            renderQuickInsertList();
            managerCard.focus();
        }

        function closeQuickInsertModal() {
            if (modalOverlay.hidden) return;
            if (hasUnsavedQuickInsertChanges() &&
                !window.confirm('فرم شامل تغییرات ذخیره‌نشده است. بدون ذخیره از پنجره خارج شوید؟')) {
                return;
            }
            if (hasUnsavedQuickInsertChanges()) {
                resetQuickInsertEditor();
                status.textContent = 'تغییرات ذخیره‌نشده کنار گذاشته شد.';
            }
            modalOverlay.hidden = true;
            modalOverlay.setAttribute('aria-hidden', 'true');
            if (returnFocusTarget) returnFocusTarget.focus();
        }

        closeButton.addEventListener('click', closeQuickInsertModal);
        modalOverlay.addEventListener('click', function (event) {
            if (event.target === modalOverlay) closeQuickInsertModal();
        });
        window.addEventListener('editor-open-quick-insert-manager', openQuickInsertModal);
        document.addEventListener('keydown', function (event) {
            if (modalOverlay.hidden) return;

            if (event.key === 'Escape') {
                event.preventDefault();
                closeQuickInsertModal();
                return;
            }
            if (event.key !== 'Tab') return;

            /* فوکوس در محدودهٔ همین دیالوگ بماند؛ والد هنگام فوکوس فرزند دخالت نمی‌کند. */
            const focusableElements = Array.from(managerCard.querySelectorAll(
                'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )).filter(function (element) {
                return !element.hidden &&
                    element.getAttribute('aria-hidden') !== 'true' &&
                    element.getClientRects().length > 0;
            });

            if (!focusableElements.length) {
                event.preventDefault();
                managerCard.focus();
                return;
            }

            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];
            if (event.shiftKey && (document.activeElement === first ||
                document.activeElement === managerCard || !managerCard.contains(document.activeElement))) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && (document.activeElement === last ||
                document.activeElement === managerCard || !managerCard.contains(document.activeElement))) {
                event.preventDefault();
                first.focus();
            }
        });

        function resetQuickInsertEditor() {
            editingItemId = null;
            editingItemType = null;
            labelInput.value = '';
            codeInput.value = '';
            tabSelect.disabled = false;
            addButton.textContent = 'افزودن به فهرست';
            cancelButton.hidden = true;
        }

        function readQuickInsertItems() {
            try {
                const parsed = JSON.parse(storageGet(quickInsertStorageKey) || '{}');
                const result = {};
                ['html', 'css', 'js'].forEach(function (language) {
                    result[language] = Array.isArray(parsed[language]) ? parsed[language].filter(function (item) {
                        return item && typeof item.id === 'string' && typeof item.label === 'string' &&
                            typeof item.prefix === 'string' && typeof item.suffix === 'string';
                    }).slice(0, 100) : [];
                });
                return result;
            } catch (error) {
                return { html: [], css: [], js: [] };
            }
        }

        function readBuiltinSettings() {
            const saved = readObject(builtinStorageKey);
            const result = {};
            ['html', 'css', 'js'].forEach(function (language) {
                const section = saved[language] && typeof saved[language] === 'object' ? saved[language] : {};
                result[language] = {
                    deleted: Array.isArray(section.deleted) ? section.deleted.filter(function (id) { return typeof id === 'string'; }) : [],
                    overrides: section.overrides && typeof section.overrides === 'object' && !Array.isArray(section.overrides)
                        ? section.overrides : {}
                };
            });
            return result;
        }

        function saveBuiltinSettings(config) {
            return storageSet(builtinStorageKey, JSON.stringify(config));
        }

        function getBuiltinItems(language) {
            const data = window.EDITOR_INTELLISENSE_DATA || {};
            const defaults = data.symbols && Array.isArray(data.symbols[language]) ? data.symbols[language] : [];
            const config = readBuiltinSettings()[language];
            return defaults.map(function (item, index) {
                const id = 'builtin-' + language + '-' + index;
                const override = config.overrides[id];
                return {
                    id: id,
                    type: 'builtin',
                    label: override && typeof override.label === 'string' ? override.label : item.label || 'آیتم پیش‌فرض',
                    prefix: override && typeof override.prefix === 'string' ? override.prefix : item.prefix || '',
                    suffix: override && typeof override.suffix === 'string' ? override.suffix : item.suffix || '',
                    description: override && typeof override.description === 'string' ? override.description : item.description || item.label || '',
                    deleted: config.deleted.includes(id)
                };
            }).filter(function (item) { return !item.deleted; });
        }

        function getAllVisibleItems(language) {
            return getBuiltinItems(language).concat(readQuickInsertItems()[language].map(function (item) {
                return Object.assign({}, item, { type: 'custom' });
            }));
        }

        function saveQuickInsertItems(items) {
            return storageSet(quickInsertStorageKey, JSON.stringify(items));
        }

        function renderQuickInsertList() {
            const language = tabSelect.value;
            const items = getAllVisibleItems(language);
            list.replaceChildren();
            items.forEach(function (item) {
                const row = document.createElement('li');
                row.className = 'settings-quickinsert-item';
                const details = document.createElement('div');
                details.className = 'settings-quickinsert-item-details';
                const titleRow = document.createElement('div');
                titleRow.className = 'settings-quickinsert-title-row';
                const title = document.createElement('strong');
                title.textContent = item.label;
                const type = document.createElement('span');
                type.className = 'settings-quickinsert-type';
                type.textContent = item.type === 'builtin' ? 'پیش‌فرض' : 'سفارشی';
                titleRow.append(title, type);
                const preview = document.createElement('code');
                const fullCode = String(item.prefix || '') + String(item.suffix || '');
                preview.textContent = fullCode.length > 100 ? fullCode.slice(0, 100) + '…' : fullCode;
                details.append(titleRow, preview);
                const actions = document.createElement('div');
                actions.className = 'settings-quickinsert-item-actions';
                const edit = document.createElement('button');
                edit.type = 'button';
                edit.className = 'settings-quickinsert-edit';
                edit.dataset.quickInsertEdit = item.id;
                edit.dataset.quickInsertType = item.type;
                edit.textContent = 'ویرایش';
                edit.setAttribute('aria-label', 'ویرایش آیتم ' + item.label);
                const remove = document.createElement('button');
                remove.type = 'button';
                remove.className = 'settings-quickinsert-remove';
                remove.dataset.quickInsertRemove = item.id;
                remove.dataset.quickInsertType = item.type;
                remove.textContent = 'حذف';
                remove.setAttribute('aria-label', 'حذف آیتم ' + item.label);
                actions.append(edit, remove);
                row.append(details, actions);
                list.appendChild(row);
            });
            emptyMessage.hidden = items.length > 0;
            emptyMessage.textContent = 'برای این تب آیتمی در فهرست درج سریع وجود ندارد.';
        }

        tabSelect.addEventListener('change', renderQuickInsertList);

        addButton.addEventListener('click', function () {
            const label = labelInput.value.trim();
            const code = codeInput.value;
            if (!label || !code.trim()) {
                status.textContent = 'عنوان و کد درج‌شونده را وارد کنید.';
                return;
            }

            const language = tabSelect.value;
            const customItems = readQuickInsertItems();
            const visibleItems = getAllVisibleItems(language);
            if (!editingItemId && customItems[language].length >= 100) {
                status.textContent = 'برای هر تب حداکثر ۱۰۰ آیتم سفارشی مجاز است.';
                return;
            }
            if (visibleItems.some(function (item) {
                return !(item.id === editingItemId && item.type === editingItemType) &&
                    item.label.toLocaleLowerCase() === label.toLocaleLowerCase();
            })) {
                status.textContent = 'این عنوان در فهرست همین تب وجود دارد؛ عنوان دیگری انتخاب کنید.';
                return;
            }

            if (editingItemType === 'builtin' && editingItemId) {
                const config = readBuiltinSettings();
                config[language].overrides[editingItemId] = {
                    label: label,
                    prefix: code,
                    suffix: '',
                    description: label
                };
                if (!saveBuiltinSettings(config)) {
                    status.textContent = 'ذخیره‌سازی مرورگر در دسترس نیست؛ ویرایش ثبت نشد.';
                    return;
                }
            } else if (editingItemType === 'custom' && editingItemId) {
                const existing = customItems[language].find(function (item) { return item.id === editingItemId; });
                if (!existing) {
                    resetQuickInsertEditor();
                    status.textContent = 'آیتم موردنظر پیدا نشد؛ فهرست را دوباره بررسی کنید.';
                    renderQuickInsertList();
                    return;
                }
                existing.label = label;
                existing.prefix = code;
                existing.suffix = '';
                existing.description = label;
                if (!saveQuickInsertItems(customItems)) {
                    status.textContent = 'ذخیره‌سازی مرورگر در دسترس نیست؛ ویرایش ثبت نشد.';
                    return;
                }
            } else {
                customItems[language].push({
                    id: 'custom-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8),
                    label: label,
                    prefix: code,
                    suffix: '',
                    description: label
                });
                if (!saveQuickInsertItems(customItems)) {
                    status.textContent = 'ذخیره‌سازی مرورگر در دسترس نیست؛ آیتم ثبت نشد.';
                    return;
                }
            }

            const wasEditing = Boolean(editingItemId);
            const editedType = editingItemType;
            resetQuickInsertEditor();
            renderQuickInsertList();
            status.textContent = wasEditing
                ? (editedType === 'builtin' ? 'آیتم پیش‌فرض ویرایش شد؛ تغییر فقط در همین مرورگر ذخیره شد.' : 'ویرایش آیتم سفارشی ذخیره شد.')
                : 'آیتم به فهرست ' + tabSelect.options[tabSelect.selectedIndex].text + ' اضافه و ذخیره شد.';
            window.dispatchEvent(new CustomEvent('editor-quick-insert-change', { detail: { language: language } }));
        });

        cancelButton.addEventListener('click', function () {
            resetQuickInsertEditor();
            status.textContent = 'ویرایش لغو شد؛ فهرست تغییری نکرد.';
        });

        list.addEventListener('click', function (event) {
            const editButton = event.target.closest('button[data-quick-insert-edit]');
            const removeButton = event.target.closest('button[data-quick-insert-remove]');
            const language = tabSelect.value;

            if (editButton) {
                const type = editButton.dataset.quickInsertType;
                const item = getAllVisibleItems(language).find(function (entry) {
                    return entry.id === editButton.dataset.quickInsertEdit && entry.type === type;
                });
                if (!item) {
                    status.textContent = 'آیتم موردنظر پیدا نشد.';
                    return;
                }
                editingItemId = item.id;
                editingItemType = type;
                labelInput.value = item.label;
                codeInput.value = String(item.prefix || '') + String(item.suffix || '');
                tabSelect.disabled = true;
                addButton.textContent = 'ذخیره ویرایش';
                cancelButton.hidden = false;
                status.textContent = type === 'builtin'
                    ? 'آیتم پیش‌فرض را تغییر دهید؛ نسخهٔ اصلی محفوظ می‌ماند و تغییر شما در همین مرورگر ذخیره می‌شود.'
                    : 'عنوان یا کد را تغییر دهید و «ذخیره ویرایش» را بزنید.';
                labelInput.focus();
                return;
            }

            if (removeButton) {
                const type = removeButton.dataset.quickInsertType;
                const id = removeButton.dataset.quickInsertRemove;
                if (type === 'builtin') {
                    const config = readBuiltinSettings();
                    if (!config[language].deleted.includes(id)) config[language].deleted.push(id);
                    delete config[language].overrides[id];
                    if (!saveBuiltinSettings(config)) {
                        status.textContent = 'حذف انجام نشد؛ ذخیره‌سازی مرورگر در دسترس نیست.';
                        return;
                    }
                } else {
                    const allItems = readQuickInsertItems();
                    allItems[language] = allItems[language].filter(function (item) { return item.id !== id; });
                    if (!saveQuickInsertItems(allItems)) {
                        status.textContent = 'حذف انجام نشد؛ ذخیره‌سازی مرورگر در دسترس نیست.';
                        return;
                    }
                }
                if (editingItemId === id) resetQuickInsertEditor();
                renderQuickInsertList();
                status.textContent = type === 'builtin'
                    ? 'آیتم پیش‌فرض از فهرست این مرورگر حذف شد.'
                    : 'آیتم سفارشی از فهرست همین تب حذف شد.';
                window.dispatchEvent(new CustomEvent('editor-quick-insert-change', { detail: { language: language } }));
            }
        });

        renderQuickInsertList();
    })();

    const previewNowButton = document.getElementById('btnSettingsPreviewNow');
    if (previewNowButton) {
        previewNowButton.addEventListener('click', function () {
            window.dispatchEvent(new CustomEvent('editor-refresh-preview'));
            updateStatus('پیش‌نمایش با درخواست دستی به‌روزرسانی شد.');
            showToast('پیش‌نمایش اکنون به‌روزرسانی شد.', 'success');
        });
    }

    window.addEventListener('editor-font-size-change', function (event) {
        const value = event.detail && event.detail.value;
        if (!isAllowed('fontSize', value)) return;
        settings.fontSize = String(value);
        updateSelectedOptions();
        if (settings.autoSaveSettings === 'on') persistSettings();
    });

    window.addEventListener('editor-split-ratio-change', function (event) {
        const value = event.detail && event.detail.value;
        if (!isAllowed('splitRatio', value)) return;
        settings.splitRatio = String(value);
        updateSelectedOptions();
        if (settings.autoSaveSettings === 'on') persistSettings();
    });

    document.addEventListener('keydown', function (event) {
        if (settingsScreen.hidden || event.defaultPrevented) return;

        /* اگر فوکوس داخل پنجرهٔ تو‌در‌تو است، مدیریت صفحه‌کلید را به همان پنجره بسپار. */
        const activeDialog = document.activeElement &&
            document.activeElement.closest('[role="dialog"][aria-modal="true"]');
        if (activeDialog && activeDialog !== settingsScreen) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            returnToCodingScreen();
            return;
        }

        /* فوکوس با Tab داخل پنل گفت‌وگویی تنظیمات محصور بماند. */
        if (event.key !== 'Tab') return;
        const focusableElements = Array.from(settingsScreen.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter(function (element) {
            return !element.hidden &&
                element.getAttribute('aria-hidden') !== 'true' &&
                element.getClientRects().length > 0;
        });

        if (!focusableElements.length) {
            event.preventDefault();
            return;
        }

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && (document.activeElement === first || !settingsScreen.contains(document.activeElement))) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !settingsScreen.contains(document.activeElement))) {
            event.preventDefault();
            first.focus();
        }
    });

    if (systemThemeMedia) {
        const handleSystemThemeChange = function () {
            if (settings.theme === 'system') applySettings(false);
        };
        if (typeof systemThemeMedia.addEventListener === 'function') {
            systemThemeMedia.addEventListener('change', handleSystemThemeChange);
        } else if (typeof systemThemeMedia.addListener === 'function') {
            systemThemeMedia.addListener(handleSystemThemeChange);
        }
    }

    applySettings(true);
    updateStatus(settings.autoSaveSettings === 'on'
        ? 'تنظیمات آماده‌اند؛ تغییرات به‌صورت خودکار ذخیره می‌شوند.'
        : 'ذخیره‌سازی خودکار خاموش است؛ برای ثبت تغییرات از دکمهٔ ذخیره استفاده کنید.');
})();