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
        splitRatio: '50',
        layout: 'side-by-side'
    };

    const allowedValues = {
        theme: ['dark', 'light', 'system'],
        accentColor: ['blue', 'green', 'violet', 'orange'],
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
    let systemThemeMedia = null;
    let toastTimer = null;

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
        settingsScreen.hidden = false;
        settingsButton.setAttribute('aria-expanded', 'true');
        saveReturnButton.focus();
    }

    function returnToCodingScreen() {
        settingsScreen.hidden = true;
        settingsButton.setAttribute('aria-expanded', 'false');
        settingsButton.focus();
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
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* مدیریت فهرست درج سریع؛ داده‌ها برای هر زبان مستقل و در همین مرورگر ذخیره می‌شوند. */
    (function initQuickInsertManager() {
        const tabSelect = document.getElementById('quickInsertTab');
        const labelInput = document.getElementById('quickInsertLabel');
        const codeInput = document.getElementById('quickInsertCode');
        const addButton = document.getElementById('btnQuickInsertAdd');
        const list = document.getElementById('quickInsertList');
        const emptyMessage = document.getElementById('quickInsertEmpty');
        const status = document.getElementById('quickInsertStatus');
        if (!tabSelect || !labelInput || !codeInput || !addButton || !list || !emptyMessage || !status) return;

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

        function saveQuickInsertItems(items) {
            return storageSet(quickInsertStorageKey, JSON.stringify(items));
        }

        function renderQuickInsertList() {
            const language = tabSelect.value;
            const items = readQuickInsertItems()[language];
            list.replaceChildren();
            items.forEach(function (item) {
                const row = document.createElement('li');
                row.className = 'settings-quickinsert-item';
                const details = document.createElement('div');
                details.className = 'settings-quickinsert-item-details';
                const title = document.createElement('strong');
                title.textContent = item.label;
                const preview = document.createElement('code');
                preview.textContent = item.prefix.length > 100 ? item.prefix.slice(0, 100) + '…' : item.prefix;
                details.append(title, preview);
                const remove = document.createElement('button');
                remove.type = 'button';
                remove.className = 'settings-quickinsert-remove';
                remove.dataset.quickInsertRemove = item.id;
                remove.textContent = 'حذف';
                remove.setAttribute('aria-label', 'حذف آیتم ' + item.label);
                row.append(details, remove);
                list.appendChild(row);
            });
            emptyMessage.hidden = items.length > 0;
        }

        tabSelect.addEventListener('change', renderQuickInsertList);
        addButton.addEventListener('click', function () {
            const label = labelInput.value.trim();
            const code = codeInput.value;
            if (!label || !code.trim()) {
                status.textContent = 'عنوان و کد درج‌شونده را وارد کنید.';
                return;
            }
            const items = readQuickInsertItems();
            const languageItems = items[tabSelect.value];
            if (languageItems.length >= 100) {
                status.textContent = 'برای هر تب حداکثر ۱۰۰ آیتم سفارشی مجاز است.';
                return;
            }
            if (languageItems.some(function (item) { return item.label.toLocaleLowerCase() === label.toLocaleLowerCase(); })) {
                status.textContent = 'این عنوان در فهرست همین تب وجود دارد؛ عنوان دیگری انتخاب کنید.';
                return;
            }
            languageItems.push({
                id: 'custom-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8),
                label: label,
                prefix: code,
                suffix: '',
                description: label
            });
            if (!saveQuickInsertItems(items)) {
                status.textContent = 'ذخیره‌سازی مرورگر در دسترس نیست؛ آیتم ثبت نشد.';
                return;
            }
            labelInput.value = '';
            codeInput.value = '';
            renderQuickInsertList();
            status.textContent = 'آیتم به فهرست ' + tabSelect.options[tabSelect.selectedIndex].text + ' اضافه و ذخیره شد.';
            window.dispatchEvent(new CustomEvent('editor-quick-insert-change', { detail: { language: tabSelect.value } }));
        });

        list.addEventListener('click', function (event) {
            const button = event.target.closest('button[data-quick-insert-remove]');
            if (!button) return;
            const items = readQuickInsertItems();
            const language = tabSelect.value;
            items[language] = items[language].filter(function (item) { return item.id !== button.dataset.quickInsertRemove; });
            if (!saveQuickInsertItems(items)) {
                status.textContent = 'حذف انجام نشد؛ ذخیره‌سازی مرورگر در دسترس نیست.';
                return;
            }
            renderQuickInsertList();
            status.textContent = 'آیتم از فهرست همین تب حذف شد.';
            window.dispatchEvent(new CustomEvent('editor-quick-insert-change', { detail: { language: language } }));
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
        if (event.key === 'Escape' && !settingsScreen.hidden) {
            event.preventDefault();
            returnToCodingScreen();
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