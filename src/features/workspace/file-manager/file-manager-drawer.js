/* رفتار پنل کشویی فایل‌منیجر در نمایشگرهای کوچک */
(function () {
    'use strict';
    function init() {
        const button = document.getElementById('fileManagerOpenButton');
        const explorer = document.getElementById('fileExplorer');
        const backdrop = document.getElementById('fileManagerBackdrop');
        if (!button || !explorer || !backdrop) return;

        function isMobile() { return window.matchMedia('(max-width: 760px)').matches; }
        function open() {
            if (!isMobile()) {
                const toggle = document.getElementById('feToggleBtn');
                if (toggle && explorer.classList.contains('is-collapsed')) toggle.click();
                return;
            }
            explorer.classList.remove('is-collapsed');
            explorer.classList.add('file-manager-drawer-open');
            backdrop.hidden = false;
            document.body.classList.add('file-manager-drawer-active');
            button.setAttribute('aria-expanded', 'true');
            explorer.setAttribute('aria-modal', 'true');
            explorer.setAttribute('role', 'dialog');
            const closeButton = document.getElementById('feToggleBtn');
            if (closeButton) {
                closeButton.setAttribute('aria-label', 'بستن فایل‌منیجر');
                closeButton.setAttribute('title', 'بستن فایل‌منیجر');
            }
        }
        function close() {
            explorer.classList.remove('file-manager-drawer-open');
            backdrop.hidden = true;
            document.body.classList.remove('file-manager-drawer-active');
            button.setAttribute('aria-expanded', 'false');
            explorer.removeAttribute('aria-modal');
            explorer.removeAttribute('role');
            const closeButton = document.getElementById('feToggleBtn');
            if (closeButton) {
                closeButton.setAttribute('aria-label', 'باز کردن فایل‌منیجر');
                closeButton.setAttribute('title', 'باز کردن فایل‌منیجر');
            }
        }
        button.addEventListener('click', function () {
            if (explorer.classList.contains('file-manager-drawer-open')) close();
            else open();
        });
        backdrop.addEventListener('click', close);
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && explorer.classList.contains('file-manager-drawer-open')) close();
        });
        window.addEventListener('resize', function () {
            if (!isMobile()) close();
        });
        const existingToggle = document.getElementById('feToggleBtn');
        if (existingToggle) existingToggle.addEventListener('click', function (event) {
            if (explorer.classList.contains('file-manager-drawer-open')) {
                event.preventDefault();
                event.stopImmediatePropagation();
                close();
            }
        }, true);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
}());