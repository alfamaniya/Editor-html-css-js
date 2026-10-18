(function () {
    'use strict';
    const byId = (id) => document.getElementById(id);
    const sourceInput = byId('siSource');
    const resultsPanel = byId('siResults');
    const summary = byId('siSummary');
    const stats = byId('siStats');
    const notes = byId('siNotes');
    const actionStatus = byId('siActionStatus');
    const fileInput = byId('siFileInput');
    if (!sourceInput || !resultsPanel) return;

    const targets = {
        html: { output: byId('siResultHtml'), checkbox: byId('siApplyHtml'), count: byId('siCountHtml') },
        css:  { output: byId('siResultCss'),  checkbox: byId('siApplyCss'),  count: byId('siCountCss') },
        js:   { output: byId('siResultJs'),   checkbox: byId('siApplyJs'),   count: byId('siCountJs') }
    };

    function countMatches(source, regex) { return (source.match(regex) || []).length; }

    function extractBlocks(source, tagName) {
        // Supports escaped closing tags and recovery at nearby document boundaries.
        const pattern = new RegExp(
            '<' + tagName + '\\b([^>]*)>([\\s\\S]*?)(?:<\\\\?\\/' + tagName +
            '\\s*>|(?=<\\/(?:head|body|html)\\s*>|<script\\b|<style\\b|<!doctype\\b|<html\\b|<body\\b|$))',
            'gi'
        );
        const blocks = [];
        let match;
        while ((match = pattern.exec(source)) !== null) {
            const attrs = match[1] || '';
            blocks.push({
                start: match.index, end: match.index + match[0].length,
                attrs: attrs, content: match[2] || '',
                hasSource: /\bsrc\s*=/i.test(attrs),
                isJavaScript: !/\bsrc\s*=/i.test(attrs) &&
                    (!/\btype\s*=/i.test(attrs) || /\btype\s*=\s*["']?(?:text|application)\/(?:java|ecma)script|module/i.test(attrs))
            });
            if (match[0].length === 0) pattern.lastIndex++;
        }
        return blocks;
    }

    function removeRanges(source, blocks) {
        let result = source;
        blocks.slice().sort((a, b) => b.start - a.start).forEach((block) => {
            result = result.slice(0, block.start) + result.slice(block.end);
        });
        return result;
    }

    function uniqueBlocks(parts, clean) {
        const seen = new Set(), result = [];
        let removed = 0;
        parts.forEach((part) => {
            const key = part.replace(/\r\n?/g, '\n').trim();
            if (!key) return;
            if (seen.has(key)) {
                removed++;
                if (clean) return;
            } else seen.add(key);
            result.push(clean ? part.trim() : part);
        });
        return { parts: result, removed: removed };
    }

    function looksLikeCss(source) {
        return source.includes('{') &&
            /(?:@(?:media|supports|keyframes|import|font-face|layer)\b|\b(?:color|background|margin|padding|display|font|width|height|border|position|grid|flex|opacity|transform|animation)\s*:|--[\w-]+\s*:)/i.test(source) &&
            /:\s*[^;{}]+;?/.test(source);
    }

    function looksLikeJavaScript(source) {
        return /(?:\b(?:const|let|var|function|class|import|export|return|async|await|console|document|window)\b|=>|\baddEventListener\s*\(|\bquerySelector\s*\()/.test(source);
    }

    function cleanMarkup(source) {
        let markup = source;
        const bodyMatch = /<body\b[^>]*>([\s\S]*?)<\/body\s*>/i.exec(markup);
        if (bodyMatch) {
            // The first body is deliberately chosen if the paste contains several documents.
            markup = bodyMatch[1];
        } else {
            markup = markup.replace(/<head\b[^>]*>[\s\S]*?<\/head\s*>/gi, '');
            markup = markup.replace(/<head\b[^>]*>[\s\S]*?(?=<body\b|$)/gi, '');
            const bodyOpen = /<body\b[^>]*>/i.exec(markup);
            if (bodyOpen) markup = markup.slice(bodyOpen.index + bodyOpen[0].length);
        }
        return markup
            .replace(/<!doctype\b[^>]*>/gi, '')
            .replace(/<\/?(?:html|head|body)\b[^>]*>/gi, '')
            .replace(/<\\?\/?style\b[^>]*>/gi, '')
            .replace(/<title\b[^>]*>[\s\S]*?<\/title\s*>/gi, '')
            .replace(/<meta\b[^>]*>/gi, '')
            .replace(/<link\b[^>]*>/gi, '')
            .trim();
    }

    function setNotes(items) {
        notes.replaceChildren();
        if (!items.length) {
            const item = document.createElement('li');
            item.className = 'si-note si-note-ok';
            item.textContent = 'No obvious structural warning was detected. Review the extracted code before applying it anyway.';
            notes.appendChild(item);
            return;
        }
        items.forEach((text) => {
            const item = document.createElement('li');
            item.className = 'si-note';
            item.textContent = text;
            notes.appendChild(item);
        });
    }

    function updateOutputState(language, autoCheck) {
        const target = targets[language];
        const value = target.output.value;
        target.count.textContent = value.length.toLocaleString() + ' chars';
        target.checkbox.disabled = !value.trim();
        if (autoCheck !== undefined) target.checkbox.checked = !!autoCheck && !!value.trim();
        else if (!value.trim()) target.checkbox.checked = false;
    }

    function renderStats(values) {
        stats.replaceChildren();
        values.forEach((value) => {
            const card = document.createElement('div');
            card.className = 'si-stat';
            const number = document.createElement('strong');
            number.textContent = String(value.value);
            const label = document.createElement('span');
            label.textContent = value.label;
            card.append(number, label);
            stats.appendChild(card);
        });
    }

    function analyze(clean) {
        const raw = sourceInput.value.replace(/^\uFEFF/, '');
        if (!raw.trim()) {
            resultsPanel.hidden = true;
            summary.textContent = '';
            actionStatus.textContent = 'Paste code or open a file first.';
            sourceInput.focus();
            return;
        }

        const styleBlocks = extractBlocks(raw, 'style');
        const allScriptBlocks = extractBlocks(raw, 'script');
        const inlineScriptBlocks = allScriptBlocks.filter((block) => block.isJavaScript);
        let cssParts = styleBlocks.map((block) => block.content).filter((part) => part.trim());
        let jsParts = inlineScriptBlocks.map((block) => block.content).filter((part) => part.trim());
        let detectedAs = 'Mixed document';
        const hasAnyHtmlTag = /<\/?[a-z][^>]*>/i.test(raw);
        if (!styleBlocks.length && !allScriptBlocks.length && !hasAnyHtmlTag) {
            if (looksLikeJavaScript(raw)) {
                jsParts = [raw]; detectedAs = 'JavaScript fragment';
            } else if (looksLikeCss(raw)) {
                cssParts = [raw]; detectedAs = 'CSS fragment';
            } else detectedAs = 'HTML fragment';
        }

        const dedupedCss = uniqueBlocks(cssParts, clean);
        const dedupedJs = uniqueBlocks(jsParts, clean);
        cssParts = dedupedCss.parts;
        jsParts = dedupedJs.parts;

        // Preserve runtime dependencies in the HTML output. Their source files are not downloaded or embedded.
        const baseTagMatch = /<base\b[^>]*>/i.exec(raw);
        const externalCssTags = [];
        const allLinkTags = raw.match(/<link\b[^>]*>/gi) || [];
        allLinkTags.forEach((tag) => {
            if (/\.css(?:[?#][^"'\s>]*)?["']?/i.test(tag) ||
                /\brel\s*=\s*["']?[^"'>]*\bstylesheet\b/i.test(tag) ||
                /\brel\s*=\s*["']?[^"'>]*\bmodulepreload\b/i.test(tag)) {
                externalCssTags.push(tag);
            }
        });
        const externalScriptBlocks = allScriptBlocks.filter((block) => block.hasSource);
        const externalScriptTags = externalScriptBlocks
            .map((block) => raw.slice(block.start, block.end).trim())
            .filter(Boolean);
        const removedScripts = inlineScriptBlocks.concat(externalScriptBlocks);
        const markupSource = removeRanges(raw, styleBlocks.concat(removedScripts));
        const documentWrappers = /<!doctype\b|<html\b|<head\b|<body\b/i.test(markupSource);
        let html = (detectedAs === 'CSS fragment' || detectedAs === 'JavaScript fragment') ? '' : cleanMarkup(markupSource);
        if (!documentWrappers && detectedAs === 'HTML fragment') html = markupSource.trim();
        if (detectedAs !== 'CSS fragment' && detectedAs !== 'JavaScript fragment') {
            const preservedHeadResources = uniqueBlocks(
                (baseTagMatch ? [baseTagMatch[0]] : []).concat(externalCssTags), true
            ).parts;
            const preservedScripts = uniqueBlocks(externalScriptTags, true).parts;
            html = preservedHeadResources.concat(html.trim() ? [html.trim()] : [], preservedScripts)
                .filter(Boolean).join('\n\n');
        }

        const externalCss = [];
        const cssLinkPattern = /<link\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>/gi;
        let linkMatch;
        while ((linkMatch = cssLinkPattern.exec(raw)) !== null) {
            if (/\.css(?:[?#]|$)/i.test(linkMatch[1]) || /\brel\s*=\s*["']?stylesheet/i.test(linkMatch[0])) externalCss.push(linkMatch[1]);
        }
        const externalJs = [];
        const externalScriptPattern = /<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi;
        let scriptMatch;
        while ((scriptMatch = externalScriptPattern.exec(raw)) !== null) externalJs.push(scriptMatch[1]);

        const documentCount = Math.max(countMatches(raw, /<!doctype\b/gi), countMatches(raw, /<html\b/gi));
        const duplicateBlocks = dedupedCss.removed + dedupedJs.removed;
        const warnings = [];
        if (documentCount > 1) warnings.push('More than one document wrapper was found (' + documentCount + '). The first body section is selected to avoid merging conflicting page versions.');
        if (countMatches(raw, /<style\b/gi) !== styleBlocks.length) warnings.push('One or more style blocks may be incomplete. Check for cut-off rules or missing braces.');
        if (countMatches(raw, /<script\b/gi) !== allScriptBlocks.length) warnings.push('One or more script blocks may be incomplete or use an unusual type. Review the extracted code.');
        if (duplicateBlocks) warnings.push(clean
            ? duplicateBlocks + ' exact repeated CSS/JavaScript block(s) were removed.'
            : duplicateBlocks + ' exact repeated CSS/JavaScript block(s) were detected. Choose “Clean & analyze” to remove exact duplicates.');
        if (externalCss.length) warnings.push('External stylesheet references were found (' + externalCss.length + '). Their link tags were kept in the HTML output; remote files were not downloaded or embedded.');
        if (externalJs.length) warnings.push('External script references were found (' + externalJs.length + '). Their script tags were kept in the HTML output; remote files were not downloaded or embedded.');
        if (!html.trim() && !cssParts.length && !jsParts.length) warnings.push('No usable section was extracted. The source may use an unsupported or malformed structure.');
        if (!clean && countMatches(raw, /<(?:html|style|script)\b/gi) > 1 && !duplicateBlocks) warnings.push('Multiple structural blocks were found. Only exact duplicate CSS/JS blocks can be removed automatically; review all outputs manually.');

        targets.html.output.value = html;
        targets.css.output.value = cssParts.join('\n\n').trim();
        targets.js.output.value = jsParts.join('\n\n').trim();
        Object.keys(targets).forEach((language) => updateOutputState(language, !!targets[language].output.value.trim()));

        renderStats([
            { value: detectedAs, label: 'Input recognized as' },
            { value: documentCount || 0, label: 'Document wrappers' },
            { value: styleBlocks.length, label: 'Style blocks' },
            { value: inlineScriptBlocks.length, label: 'Inline JS blocks' },
            { value: duplicateBlocks, label: 'Exact duplicates' }
        ]);
        setNotes(warnings);
        summary.textContent = 'Analysis complete — review the three sections below. Nothing has changed yet.';
        actionStatus.textContent = '';
        resultsPanel.hidden = false;
        resultsPanel.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    byId('siAnalyze').addEventListener('click', () => analyze(false));
    byId('siCleanAnalyze').addEventListener('click', () => analyze(true));
    Object.keys(targets).forEach((language) => {
        targets[language].output.addEventListener('input', () => updateOutputState(language));
        targets[language].checkbox.addEventListener('change', () => { actionStatus.textContent = ''; });
    });

    byId('siChooseFile').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', async () => {
        const file = fileInput.files && fileInput.files[0];
        if (!file) return;
        try {
            sourceInput.value = await file.text();
            actionStatus.textContent = 'Loaded “' + file.name + '”. Review the source and run analysis.';
            analyze(true);
        } catch (error) {
            actionStatus.textContent = 'Could not read this file. Try a text-based HTML, CSS, or JavaScript file.';
        } finally { fileInput.value = ''; }
    });

    byId('siPaste').addEventListener('click', async () => {
        if (!navigator.clipboard || typeof navigator.clipboard.readText !== 'function') {
            actionStatus.textContent = 'Clipboard access is unavailable here. Paste into the source box manually.';
            sourceInput.focus(); return;
        }
        try {
            sourceInput.value = await navigator.clipboard.readText();
            actionStatus.textContent = 'Clipboard pasted. Run analysis to inspect the extracted code.';
            sourceInput.focus();
        } catch (error) {
            actionStatus.textContent = 'Clipboard permission was denied or unavailable. Paste manually into the source box.';
            sourceInput.focus();
        }
    });

    byId('siClear').addEventListener('click', () => {
        sourceInput.value = '';
        Object.keys(targets).forEach((language) => {
            targets[language].output.value = '';
            updateOutputState(language, false);
        });
        resultsPanel.hidden = true;
        stats.replaceChildren(); notes.replaceChildren();
        summary.textContent = ''; actionStatus.textContent = '';
        sourceInput.focus();
    });

    byId('siApply').addEventListener('click', () => {
        const selected = {};
        Object.keys(targets).forEach((language) => {
            const target = targets[language];
            if (target.checkbox.checked && !target.checkbox.disabled && target.output.value.trim()) selected[language] = target.output.value;
        });
        if (!Object.keys(selected).length) {
            actionStatus.textContent = 'Select at least one non-empty section to apply.';
            return;
        }
        if (!window.HTMLCSJSEditor || typeof window.HTMLCSJSEditor.applyImportedCode !== 'function') {
            actionStatus.textContent = 'The editor bridge is not available. Reload the editor and try again.';
            return;
        }
        const result = window.HTMLCSJSEditor.applyImportedCode(selected);
        if (result && result.cancelled) actionStatus.textContent = 'Cancelled — no editor files were changed.';
        else if (result && result.error) actionStatus.textContent = result.error;
        else if (result && result.applied && result.applied.length) {
            const labels = { html: 'HTML', css: 'CSS', js: 'JavaScript' };
            actionStatus.textContent = 'Applied to ' + result.applied.map((lang) => labels[lang]).join(', ') + '. Check the editor tabs and live preview.';
        }
    });
})();