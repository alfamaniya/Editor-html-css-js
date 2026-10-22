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
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

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
        if (settingsScreen.hidden) return;

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