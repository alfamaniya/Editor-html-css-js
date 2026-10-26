/* کنترل پنل کشویی فایل‌منیجر؛ انیمیشن و دسترس‌پذیری هم‌الگوی سایدبار ابزارهاست. */
(function () {
    'use strict';

    function init() {
        const openButton = document.getElementById('fileManagerOpenButton');
        const closeButton = document.getElementById('fileManagerCloseButton');
        const explorer = document.getElementById('fileExplorer');
        const backdrop = document.getElementById('fileManagerBackdrop');
        if (!openButton || !closeButton || !explorer || !backdrop) return;

        let isOpen = false;
        const transitionFallbackMs = 280;

        function setOpen(nextOpen, options) {
            const settings = options || {};
            const wasOpen = isOpen;
            isOpen = Boolean(nextOpen);

            explorer.classList.toggle('file-manager-drawer-open', isOpen);
            explorer.setAttribute('aria-hidden', String(!isOpen));
            openButton.setAttribute('aria-expanded', String(isOpen));
            openButton.setAttribute('aria-label', isOpen ? 'بستن فایل‌منیجر' : 'باز کردن فایل‌منیجر');
            openButton.title = isOpen ? 'بستن فایل‌منیجر' : 'باز کردن فایل‌منیجر';

            document.body.classList.toggle('file-manager-drawer-active', isOpen);

            if (isOpen) {
                explorer.setAttribute('role', 'dialog');
                explorer.setAttribute('aria-modal', 'true');
                backdrop.hidden = false;
                backdrop.setAttribute('aria-hidden', 'false');
                /* ایجاد یک نقطهٔ شروع مستقل برای انیمیشن محوشدن پس‌زمینه. */
                void backdrop.offsetWidth;
                backdrop.classList.add('is-visible');
            } else {
                explorer.removeAttribute('role');
                explorer.removeAttribute('aria-modal');
                backdrop.classList.remove('is-visible');
                backdrop.setAttribute('aria-hidden', 'true');

                if (!wasOpen || (window.matchMedia &&
                    window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
                    backdrop.hidden = true;
                } else {
                    window.setTimeout(function () {
                        if (!isOpen) backdrop.hidden = true;
                    }, transitionFallbackMs);
                }
            }

            if (settings.focus === 'close' && isOpen) closeButton.focus();
            else if (!isOpen && settings.focus === 'open') openButton.focus();
        }

        document.addEventListener('workspace-drawer-open', function (event) {
            if (event.detail !== 'file-manager') setOpen(false);
        });

        openButton.addEventListener('click', function () {
            if (isOpen) setOpen(false, { focus: 'open' });
            else {
                document.dispatchEvent(new CustomEvent('workspace-drawer-open', { detail: 'file-manager' }));
                setOpen(true, { focus: 'close' });
            }
        });

        closeButton.addEventListener('click', function () {
            setOpen(false, { focus: 'open' });
        });

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

            const focusable = Array.from(explorer.querySelectorAll(
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
            if (event.shiftKey && (document.activeElement === first || !explorer.contains(document.activeElement))) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && (document.activeElement === last || !explorer.contains(document.activeElement))) {
                event.preventDefault();
                first.focus();
            }
        });

        /* در همهٔ اندازه‌ها، فایل‌منیجر بسته آغاز می‌شود. */
        setOpen(false);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
}());
