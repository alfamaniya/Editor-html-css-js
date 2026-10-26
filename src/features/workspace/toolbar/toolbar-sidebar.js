/* کنترل نوار ابزار کناری؛ در دسکتاپ باز و در موبایل به‌صورت پنجرهٔ پوشاننده بسته آغاز می‌شود. */
(function () {
    'use strict';
    const sidebar = document.getElementById('toolbarSidebar');
    const openButton = document.getElementById('toolbarSidebarOpen');
    const closeButton = document.getElementById('toolbarSidebarClose');
    const backdrop = document.getElementById('toolbarSidebarBackdrop');
    const media = window.matchMedia('(max-width: 760px)');
    if (!sidebar || !openButton || !closeButton || !backdrop) return;
    let isOpen = !media.matches;

    function setOpen(nextOpen, options) {
        const settings = options || {};
        isOpen = Boolean(nextOpen);
        const mobileModal = isOpen && media.matches;
        document.body.classList.toggle('toolbar-sidebar-open', isOpen);
        document.body.classList.toggle('toolbar-sidebar-mobile-open', mobileModal);
        sidebar.setAttribute('aria-hidden', String(!isOpen));
        openButton.setAttribute('aria-expanded', String(isOpen));
        if (mobileModal) {
            sidebar.setAttribute('role', 'dialog');
            sidebar.setAttribute('aria-modal', 'true');
            backdrop.hidden = false;
            backdrop.setAttribute('aria-hidden', 'false');
        } else {
            sidebar.removeAttribute('role');
            sidebar.removeAttribute('aria-modal');
            backdrop.hidden = true;
            backdrop.setAttribute('aria-hidden', 'true');
        }
        if (settings.focus === 'close' && isOpen) closeButton.focus();
        if (!isOpen && settings.focus === 'open') openButton.focus();
    }

    openButton.addEventListener('click', function () {
        if (isOpen) setOpen(false, { focus: 'open' });
        else setOpen(true, { focus: 'close' });
    });
    closeButton.addEventListener('click', function () { setOpen(false, { focus: 'open' }); });
    backdrop.addEventListener('click', function () { setOpen(false, { focus: 'open' }); });
    document.addEventListener('keydown', function (event) {
        if (!isOpen) return;
        if (event.key === 'Escape') {
            event.preventDefault();
            setOpen(false, { focus: 'open' });
            return;
        }
        if (!media.matches || event.key !== 'Tab') return;
        const focusable = Array.from(sidebar.querySelectorAll(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter(function (element) {
            return !element.hidden && element.getAttribute('aria-hidden') !== 'true' && element.getClientRects().length > 0;
        });
        if (!focusable.length) { event.preventDefault(); closeButton.focus(); return; }
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || !sidebar.contains(document.activeElement))) {
            event.preventDefault(); last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !sidebar.contains(document.activeElement))) {
            event.preventDefault(); first.focus();
        }
    });
    function handleViewportChange() { setOpen(!media.matches); }
    if (typeof media.addEventListener === 'function') media.addEventListener('change', handleViewportChange);
    else if (typeof media.addListener === 'function') media.addListener(handleViewportChange);
    setOpen(!media.matches);
})();
