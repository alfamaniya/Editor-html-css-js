/* سایدبار ابزارها در دسکتاپ و موبایل یک رفتار واحد دارد: پنل روی صفحه باز می‌شود. */
(function () {
    'use strict';

    function init() {
        const sidebar = document.getElementById('toolbarSidebar');
        const openButton = document.getElementById('toolbarSidebarOpen');
        const closeButton = document.getElementById('toolbarSidebarClose');
        const backdrop = document.getElementById('toolbarSidebarBackdrop');
        if (!sidebar || !openButton || !closeButton || !backdrop) return;

        let isOpen = false;

        function setOpen(nextOpen, options) {
            const settings = options || {};
            isOpen = Boolean(nextOpen);

            document.body.classList.toggle('toolbar-sidebar-open', isOpen);
            document.body.classList.toggle('toolbar-sidebar-active', isOpen);
            sidebar.setAttribute('aria-hidden', String(!isOpen));
            openButton.setAttribute('aria-expanded', String(isOpen));
            openButton.setAttribute('aria-label', isOpen ? 'بستن سایدبار تنظیمات' : 'باز کردن سایدبار تنظیمات');
            openButton.title = isOpen ? 'بستن سایدبار تنظیمات' : 'باز کردن سایدبار تنظیمات';

            backdrop.hidden = !isOpen;
            backdrop.setAttribute('aria-hidden', String(!isOpen));

            if (isOpen) {
                sidebar.setAttribute('role', 'dialog');
                sidebar.setAttribute('aria-modal', 'true');
            } else {
                sidebar.removeAttribute('role');
                sidebar.removeAttribute('aria-modal');
            }

            if (settings.focus === 'close' && isOpen) closeButton.focus();
            else if (!isOpen && settings.focus === 'open') openButton.focus();
        }

        openButton.addEventListener('click', function () {
            if (isOpen) setOpen(false, { focus: 'open' });
            else setOpen(true, { focus: 'close' });
        });

        closeButton.addEventListener('click', function () {
            setOpen(false, { focus: 'open' });
        });

        /* همانند فایل‌منیجر، هر کلیک روی فضای بیرون پنل آن را می‌بندد. */
        backdrop.addEventListener('click', function () {
            setOpen(false, { focus: 'open' });
        });

        document.addEventListener('keydown', function (event) {
            if (!isOpen) return;

            if (event.key === 'Escape') {
                event.preventDefault();
                setOpen(false, { focus: 'open' });
                return;
            }

            if (event.key !== 'Tab') return;
            const focusable = Array.from(sidebar.querySelectorAll(
                'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )).filter(function (element) {
                return !element.hidden &&
                    element.getAttribute('aria-hidden') !== 'true' &&
                    element.getClientRects().length > 0;
            });

            if (!focusable.length) {
                event.preventDefault();
                closeButton.focus();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && (document.activeElement === first || !sidebar.contains(document.activeElement))) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && (document.activeElement === last || !sidebar.contains(document.activeElement))) {
                event.preventDefault();
                first.focus();
            }
        });

        /* در همهٔ اندازه‌ها سایدبار بسته آغاز می‌شود؛ تغییر اندازه ظاهر پنل را CSS مدیریت می‌کند. */
        setOpen(false);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
}());
