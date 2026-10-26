/* ماژول مستقل نوار درج سریع کلمات و قطعه‌کدها */
(function() {
    'use strict';

    function create(options) {
        const toolbar = document.getElementById('symbolToolbar');
        const header = toolbar ? toolbar.closest('.page-symbol-header') : null;
        const languages = options.languages || [];
        const labels = {
            html: { header: 'Popular HTML tags and elements', toolbar: 'Quick-insert HTML tags' },
            css: { header: 'Popular CSS properties and patterns', toolbar: 'Quick-insert CSS properties and patterns' },
            js: { header: 'Popular JavaScript snippets', toolbar: 'Quick-insert JavaScript snippets' }
        };

        function render(language) {
            if (!toolbar) return;
            const supported = languages.includes(language);
            if (header) {
                header.hidden = !supported;
                if (supported) header.setAttribute('aria-label', labels[language].header);
            }
            if (!supported) return;
            toolbar.setAttribute('aria-label', labels[language].toolbar);

            const data = window.EDITOR_INTELLISENSE_DATA || {};
            const defaults = data.symbols && Array.isArray(data.symbols[language]) ? data.symbols[language] : [];
            let customItems = [];
            let config = { deleted: [], overrides: {} };
            try {
                const saved = JSON.parse(window.localStorage.getItem('html-editor-quick-insert-v1') || '{}');
                if (saved && Array.isArray(saved[language])) {
                    customItems = saved[language].filter(function(item) {
                        return item && typeof item.label === 'string' &&
                            typeof item.prefix === 'string' && typeof item.suffix === 'string';
                    });
                }
            } catch (error) {
                customItems = [];
            }
            try {
                const savedConfig = JSON.parse(window.localStorage.getItem('html-editor-quick-insert-builtins-v1') || '{}');
                const section = savedConfig && savedConfig[language] && typeof savedConfig[language] === 'object'
                    ? savedConfig[language] : {};
                config = {
                    deleted: Array.isArray(section.deleted) ? section.deleted : [],
                    overrides: section.overrides && typeof section.overrides === 'object' ? section.overrides : {}
                };
            } catch (error) {
                config = { deleted: [], overrides: {} };
            }
            const managed = defaults.map(function(item, index) {
                const id = 'builtin-' + language + '-' + index;
                const override = config.overrides[id];
                return {
                    label: override && typeof override.label === 'string' ? override.label : item.label,
                    prefix: override && typeof override.prefix === 'string' ? override.prefix : item.prefix,
                    suffix: override && typeof override.suffix === 'string' ? override.suffix : item.suffix,
                    description: override && typeof override.description === 'string' ? override.description : item.description
                };
            }).filter(function(item, index) {
                return !config.deleted.includes('builtin-' + language + '-' + index);
            });
            const items = managed.concat(customItems);
            if (!items.length) {
                toolbar.replaceChildren();
                return;
            }
            toolbar.dataset.language = language;
            toolbar.innerHTML = items.map(function(item) {
                const escape = options.escapeHtml;
                return '<button type="button" data-prefix="' + escape(item.prefix || '') +
                    '" data-suffix="' + escape(item.suffix || '') +
                    '" title="' + escape(item.description || item.label || 'Insert symbol') +
                    '" aria-label="' + escape(item.description || item.label || 'Insert symbol') +
                    '">' + escape(item.label || 'Symbol') + '</button>';
            }).join('');
        }

        window.addEventListener('editor-quick-insert-change', function(event) {
            const language = event.detail && event.detail.language;
            if (language === options.getActiveTab()) render(options.getActiveTab());
        });

        if (toolbar) {
            toolbar.addEventListener('mousedown', function(event) {
                if (event.target.closest('button')) event.preventDefault();
            });
            toolbar.addEventListener('click', function(event) {
                const button = event.target.closest('button[data-prefix]');
                const language = options.getActiveTab();
                const editors = options.editors;
                if (!button || !languages.includes(language) || !editors[language]) return;
                const editor = editors[language];
                const textarea = editor.ta;
                const selections = options.getSymbolSelections();
                const live = document.activeElement === textarea;
                const saved = live ? {
                    start: textarea.selectionStart,
                    end: textarea.selectionEnd,
                    direction: textarea.selectionDirection || 'none'
                } : (selections[language] || {
                    start: textarea.selectionStart,
                    end: textarea.selectionEnd,
                    direction: textarea.selectionDirection || 'none'
                });
                const start = Math.max(0, Math.min(saved.start, textarea.value.length));
                const end = Math.max(start, Math.min(saved.end, textarea.value.length));
                const prefix = button.dataset.prefix || '';
                const suffix = button.dataset.suffix || '';
                const selected = textarea.value.slice(start, end);
                textarea.focus({ preventScroll: true });
                textarea.setRangeText(prefix + selected + suffix, start, end, 'select');
                const selectionStart = start + prefix.length;
                if (selected) textarea.setSelectionRange(selectionStart, selectionStart + selected.length, 'forward');
                else textarea.setSelectionRange(selectionStart, selectionStart);
                selections[language] = {
                    start: textarea.selectionStart,
                    end: textarea.selectionEnd,
                    direction: textarea.selectionDirection || 'none'
                };
                textarea.dispatchEvent(new Event('input', { bubbles: true }));
                if (editor.refresh) editor.refresh();
                textarea.focus({ preventScroll: true });
            });
        }
        return { render: render };
    }

    window.EDITOR_QUICK_INSERT = { create: create };
})();
