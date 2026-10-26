/* کنترل یگانهٔ فایل‌منیجر؛ مسیر قدیمی بازشدن پنل حذف شده است. */
(function () {
    'use strict';
    function init() {
        const button = document.getElementById('fileManagerOpenButton');
        const explorer = document.getElementById('fileExplorer');
        const backdrop = document.getElementById('fileManagerBackdrop');
        if (!button || !explorer || !backdrop) return;

        function open() {
            explorer.classList.remove('is-collapsed');
            explorer.classList.add('file-manager-drawer-open');
            backdrop.hidden = false;
            backdrop.setAttribute('aria-hidden', 'false');
            document.body.classList.add('file-manager-drawer-active');
            button.setAttribute('aria-expanded', 'true');
            button.setAttribute('aria-label', 'بستن فایل‌منیجر');
            button.title = 'بستن فایل‌منیجر';
            explorer.setAttribute('aria-modal', 'true');
            explorer.setAttribute('role', 'dialog');
        }
        function close() {
            explorer.classList.remove('file-manager-drawer-open');
            explorer.classList.add('is-collapsed');
            backdrop.hidden = true;
            backdrop.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('file-manager-drawer-active');
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-label', 'باز کردن فایل‌منیجر');
            button.title = 'باز کردن فایل‌منیجر';
            explorer.removeAttribute('aria-modal');
            explorer.removeAttribute('role');
        }
        button.addEventListener('click', function () {
            if (explorer.classList.contains('file-manager-drawer-open')) close();
            else open();
        });
        backdrop.addEventListener('click', close);
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && explorer.classList.contains('file-manager-drawer-open')) close();
        });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
}());
