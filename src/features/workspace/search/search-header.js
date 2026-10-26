/* تعاملات هدر جست‌وجوی ثابت و بازشدن تدریجی کادر ورودی */
(function () {
    'use strict';
    function init() {
        const wrapper = document.getElementById('workspaceSearch');
        const toggle = document.getElementById('searchExpandButton');
        const panel = document.getElementById('searchPanel');
        const input = document.getElementById('searchInput');
        if (!wrapper || !toggle || !panel || !input) return;

        function open(options) {
            const settings = options || {};
            wrapper.classList.add('is-expanded');
            panel.hidden = false;
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'بستن جست‌وجو');
            toggle.title = 'بستن جست‌وجو';
            if (settings.focus !== false) input.focus();
            if (settings.select === true) input.select();
        }
        function close(options) {
            const settings = options || {};
            wrapper.classList.remove('is-expanded');
            panel.hidden = true;
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'باز کردن جست‌وجو');
            toggle.title = 'جست‌وجو در کد';
            if (settings.focus !== false) toggle.focus();
        }
        toggle.addEventListener('click', function () {
            if (wrapper.classList.contains('is-expanded')) close();
            else open();
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && wrapper.classList.contains('is-expanded')) {
                close({ focus: false });
            }
        });
        window.EditorSearchHeader = Object.freeze({
            open: open,
            close: close,
            isOpen: function () { return wrapper.classList.contains('is-expanded'); }
        });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
}());