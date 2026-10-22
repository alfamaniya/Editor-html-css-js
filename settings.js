/* منطق مستقل سکشن «ظاهر برنامه» در پنل تنظیمات */
(function () {
    'use strict';

    const settingsButton = document.getElementById('btnSettings');
    const settingsScreen = document.getElementById('settingsScreen');
    const settingsSaveReturnButton = document.getElementById('btnSettingsSaveReturn');
    const settingsAppearanceStatus = document.getElementById('settingsAppearanceStatus');
    const appearanceStorageKey = 'html-editor-appearance-v1';
    const allowedValues = {
        theme: ['dark', 'light', 'system'],
        accentColor: ['blue', 'green', 'violet', 'orange'],
        density: ['compact', 'normal', 'comfortable']
    };
    const defaults = { theme: 'dark', accentColor: 'blue', density: 'normal' };
    let appearanceSettings = loadAppearanceSettings();
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

    function loadAppearanceSettings() {
        let saved = null;
        try { saved = JSON.parse(storageGet(appearanceStorageKey) || 'null'); }
        catch (error) { saved = null; }

        const settings = {};
        Object.keys(defaults).forEach(function (key) {
            settings[key] = saved && allowedValues[key].includes(saved[key])
                ? saved[key]
                : defaults[key];
        });
        return settings;
    }

    try {
        if (typeof window.matchMedia === 'function') {
            systemThemeMedia = window.matchMedia('(prefers-color-scheme: light)');
        }
    } catch (error) {
        systemThemeMedia = null;
    }

    function applyAppearanceSettings() {
        const root = document.documentElement;
        const effectiveTheme = appearanceSettings.theme === 'system'
            ? (systemThemeMedia && systemThemeMedia.matches ? 'light' : 'dark')
            : appearanceSettings.theme;

        root.dataset.theme = effectiveTheme;
        root.dataset.themePreference = appearanceSettings.theme;
        root.dataset.accent = appearanceSettings.accentColor;
        root.dataset.density = appearanceSettings.density;
        root.style.colorScheme = effectiveTheme;

        if (settingsScreen) {
            settingsScreen.querySelectorAll('[data-setting][data-value]').forEach(function (button) {
                const selected = appearanceSettings[button.dataset.setting] === button.dataset.value;
                button.classList.toggle('is-selected', selected);
                button.setAttribute('aria-pressed', String(selected));
            });
        }
    }

    function showSettingsToast(message, type) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.replaceChildren();
        const node = document.createElement('span');
        node.textContent = message;
        toast.appendChild(node);
        toast.className = 'toast show ' + (type || '');
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(function () {
            toast.className = 'toast ' + (type || '');
        }, 2500);
    }

    function saveAppearanceSettings() {
        applyAppearanceSettings();
        const saved = storageSet(appearanceStorageKey, JSON.stringify(appearanceSettings));
        if (!saved) {
            if (settingsAppearanceStatus) {
                settingsAppearanceStatus.textContent =
                    'ذخیره‌سازی در مرورگر در دسترس نیست؛ تغییرات فقط تا زمان باز بودن صفحه اعمال شده‌اند.';
            }
            showSettingsToast('⚠ ذخیرهٔ تنظیمات ظاهر ناموفق بود؛ دسترسی به حافظهٔ مرورگر را بررسی کنید.', 'error');
            return false;
        }
        if (settingsAppearanceStatus) {
            settingsAppearanceStatus.textContent = 'تنظیمات ظاهر در همین مرورگر ذخیره شده است.';
        }
        return true;
    }

    function openSettingsScreen() {
        settingsScreen.hidden = false;
        settingsButton.setAttribute('aria-expanded', 'true');
        settingsSaveReturnButton.focus();
    }

    function returnToCodingScreen() {
        settingsScreen.hidden = true;
        settingsButton.setAttribute('aria-expanded', 'false');
        settingsButton.focus();
    }

    applyAppearanceSettings();
    if (!settingsButton || !settingsScreen || !settingsSaveReturnButton) return;

    settingsButton.addEventListener('click', openSettingsScreen);
    settingsScreen.querySelectorAll('[data-setting][data-value]').forEach(function (button) {
        button.addEventListener('click', function () {
            const key = button.dataset.setting;
            const value = button.dataset.value;
            if (!allowedValues[key] || !allowedValues[key].includes(value)) return;
            appearanceSettings[key] = value;
            const saved = saveAppearanceSettings();
            if (saved && settingsAppearanceStatus) {
                settingsAppearanceStatus.textContent = 'تغییر اعمال شد و در مرورگر ذخیره شد.';
            }
        });
    });

    settingsSaveReturnButton.addEventListener('click', function () {
        if (!saveAppearanceSettings()) return;
        returnToCodingScreen();
        showSettingsToast('✅ تنظیمات ظاهر ذخیره شد و اعمال شده است.', 'success');
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !settingsScreen.hidden) {
            event.preventDefault();
            returnToCodingScreen();
        }
    });

    if (systemThemeMedia) {
        const handleSystemThemeChange = function () {
            if (appearanceSettings.theme === 'system') applyAppearanceSettings();
        };
        if (typeof systemThemeMedia.addEventListener === 'function') {
            systemThemeMedia.addEventListener('change', handleSystemThemeChange);
        } else if (typeof systemThemeMedia.addListener === 'function') {
            systemThemeMedia.addListener(handleSystemThemeChange);
        }
    }
})();
