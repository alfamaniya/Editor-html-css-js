/* File-manager presentation renderer. Data and editing actions remain in the editor core. */
(function () {
    'use strict';
    function render(files, activeFileId, dirtyFileIds, escapeHtml) {
        return files.map(function (file) {
            const active = file.id === activeFileId;
            const icon = file.type === 'html' ? '📄' : (file.type === 'css' ? '🎨' : '⚡');
            const dirty = dirtyFileIds.has(file.id);
            const id = escapeHtml(file.id);
            const name = escapeHtml(file.name);
            return '<div class="fe-item' + (active ? ' active' : '') + '" data-id="' + id + '" title="' + name + '">' +
                '<button type="button" class="fe-open" data-role="name" aria-label="Open file ' + name + (active ? ', active file' : '') + '">' +
                '<span class="fe-icon" aria-hidden="true">' + icon + '</span>' +
                '<span class="fe-name">' + name + '</span></button>' +
                (dirty ? '<span class="fe-dirty-dot" title="Unsaved changes" aria-label="Unsaved changes">●</span>' : '') +
                '<button type="button" class="fe-rename" data-action="rename" title="Rename ' + name + '" aria-label="Rename ' + name + '">✏️</button>' +
                '<button type="button" class="fe-del" data-action="delete" title="Delete ' + name + '" aria-label="Delete ' + name + '">🗑</button>' +
                '</div>';
        }).join('');
    }
    window.FileManagerView = Object.freeze({ render: render });
}());
