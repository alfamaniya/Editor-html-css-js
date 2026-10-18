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

    [summary, actionStatus].forEach((element) => {
        if (element) { element.lang = 'fa'; element.dir = 'rtl'; }
    });

    function countMatches(source, regex) { return (source.match(regex) || []).length; }

    
    // Lightweight static checks for top-level JavaScript bindings. This is deliberately
    // conservative: it masks comments/strings and does not claim to replace a full parser.
    function maskJavaScript(source) {
        const chars = source.split('');
        let state = 'code';
        for (let i = 0; i < source.length; i++) {
            const ch = source[i], next = source[i + 1] || '';
            if (state === 'line-comment') {
                if (ch === '\n') state = 'code';
                else chars[i] = ' ';
                continue;
            }
            if (state === 'block-comment') {
                if (ch === '*' && next === '/') {
                    chars[i] = chars[i + 1] = ' ';
                    i++; state = 'code';
                } else if (ch !== '\n' && ch !== '\r') chars[i] = ' ';
                continue;
            }
            if (state === 'single' || state === 'double' || state === 'template') {
                if (ch === '\\') {
                    if (ch !== '\n' && ch !== '\r') chars[i] = ' ';
                    if (i + 1 < source.length) {
                        if (source[i + 1] !== '\n' && source[i + 1] !== '\r') chars[i + 1] = ' ';
                        i++;
                    }
                    continue;
                }
                if ((state === 'single' && ch === "'") ||
                    (state === 'double' && ch === '"') ||
                    (state === 'template' && ch.charCodeAt(0) === 96)) {
                    chars[i] = ' '; state = 'code'; continue;
                }
                if (ch !== '\n' && ch !== '\r') chars[i] = ' ';
                continue;
            }
            if (ch === '/' && next === '/') {
                chars[i] = chars[i + 1] = ' ';
                i++; state = 'line-comment'; continue;
            }
            if (ch === '/' && next === '*') {
                chars[i] = chars[i + 1] = ' ';
                i++; state = 'block-comment'; continue;
            }
            if (ch === "'") { chars[i] = ' '; state = 'single'; continue; }
            if (ch === '"') { chars[i] = ' '; state = 'double'; continue; }
            if (ch.charCodeAt(0) === 96) { chars[i] = ' '; state = 'template'; continue; }
        }
        return chars.join('');
    }

    function analyzeTopLevelDeclarations(parts) {
        const grouped = new Map();
        const declarationPattern = /\b(const|let|var|class|function)\s+([A-Za-z_$][\w$]*)/g;
        parts.forEach((part, partIndex) => {
            const masked = maskJavaScript(part);
            const depthAt = new Array(masked.length);
            let braces = 0, parens = 0, brackets = 0;
            for (let i = 0; i < masked.length; i++) {
                depthAt[i] = braces === 0 && parens === 0 && brackets === 0;
                const ch = masked[i];
                if (ch === '{') braces++;
                else if (ch === '}') braces = Math.max(0, braces - 1);
                else if (ch === '(') parens++;
                else if (ch === ')') parens = Math.max(0, parens - 1);
                else if (ch === '[') brackets++;
                else if (ch === ']') brackets = Math.max(0, brackets - 1);
            }
            declarationPattern.lastIndex = 0;
            let match;
            while ((match = declarationPattern.exec(masked)) !== null) {
                if (!depthAt[match.index]) continue;
                const prior = masked[match.index - 1] || '';
                if (prior === '.' || /[\w$]/.test(prior)) continue;
                const name = match[2];
                if (!grouped.has(name)) grouped.set(name, []);
                grouped.get(name).push({
                    name: name, kind: match[1], part: partIndex + 1,
                    line: 1 + (part.slice(0, match.index).match(/\n/g) || []).length
                });
            }
        });

        const conflicts = [], repeated = [];
        grouped.forEach((items, name) => {
            if (items.length < 2) return;
            const hasLexical = items.some((item) => item.kind === 'const' || item.kind === 'let' || item.kind === 'class');
            const details = items.map((item) => 'بخش ' + item.part + '، خط ' + item.line + ' (' + item.kind + ')');
            if (hasLexical) conflicts.push({ name: name, items: items, details: details });
            else repeated.push({ name: name, items: items, details: details });
        });
        return { conflicts: conflicts, repeated: repeated };
    }

    function compareScriptSimilarity(parts) {
        const pairs = [];
        const signatures = parts.map((part) => {
            return new Set(maskJavaScript(part).split(/\r?\n/)
                .map((line) => line.replace(/\s+/g, ' ').trim())
                .filter((line) => line.length > 12));
        });
        for (let i = 0; i < signatures.length; i++) {
            for (let j = i + 1; j < signatures.length; j++) {
                if (signatures[i].size < 12 || signatures[j].size < 12) continue;
                let shared = 0;
                signatures[i].forEach((line) => { if (signatures[j].has(line)) shared++; });
                const union = signatures[i].size + signatures[j].size - shared;
                const ratio = union ? shared / union : 0;
                if (ratio >= 0.58) pairs.push({ first: i + 1, second: j + 1, ratio: ratio });
            }
        }
        return pairs;
    }

    function prepareStyleBlock(block) {
        let content = block.content || '';
        const containsDocumentMarkup = /<!doctype\b|<\/?(?:html|head|body|title|meta)\b/i.test(content);
        if (containsDocumentMarkup) {
            const nestedStyles = Array.from(content.matchAll(/<style\b[^>]*>/gi));
            if (nestedStyles.length) {
                const lastStyle = nestedStyles[nestedStyles.length - 1];
                content = content.slice(lastStyle.index + lastStyle[0].length);
                return {
                    content: content.replace(/<\\?\/?style\b[^>]*>/gi, '').trim(),
                    recovered: true,
                    skipped: false
                };
            }
            return { content: '', recovered: false, skipped: true };
        }
        return {
            content: content.replace(/<\\?\/?style\b[^>]*>/gi, '').trim(),
            recovered: false,
            skipped: false
        };
    }


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
        const bodyMatches = Array.from(markup.matchAll(/<body\b[^>]*>([\s\S]*?)<\/body\s*>/gi));
        if (bodyMatches.length) {
            // Prefer the last complete body when several documents were pasted together.
            // This avoids wrapping the later, intended page inside the first malformed body.
            markup = bodyMatches[bodyMatches.length - 1][1];
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
            item.textContent = 'هشدار ساختاری مشخصی پیدا نشد؛ بااین‌حال، پیش از اعمال خروجی حتماً آن را بررسی کن.';
            item.lang = 'fa'; item.dir = 'rtl';
            notes.appendChild(item);
            return;
        }
        items.forEach((text) => {
            const item = document.createElement('li');
            item.className = 'si-note';
            const critical = text.indexOf('CRITICAL:') === 0;
            item.textContent = critical ? text.slice(9).trim() : text;
            item.lang = 'fa'; item.dir = 'rtl';
            if (critical) item.classList.add('si-note-critical');
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
            actionStatus.textContent = 'ابتدا کد را در کادر وارد کن یا یک فایل باز کن.';
            sourceInput.focus();
            return;
        }

        const styleBlocks = extractBlocks(raw, 'style');
        const allScriptBlocks = extractBlocks(raw, 'script');
        const inlineScriptBlocks = allScriptBlocks.filter((block) => block.isJavaScript);
        const preparedStyles = styleBlocks.map(prepareStyleBlock);
        let cssParts = preparedStyles.map((item) => item.content).filter((part) => part.trim());
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
        const declarationReport = analyzeTopLevelDeclarations(jsParts);
        const similarScripts = compareScriptSimilarity(jsParts);
        const warnings = [];
        if (documentCount > 1) warnings.push('در ورودی ' + documentCount + ' نشانهٔ شروع سند HTML پیدا شد. ابزار بخش body آخر را برای خروجی انتخاب کرده تا نسخه‌های تو‌در‌تو با هم ادغام نشوند؛ اگر نسخهٔ دیگری مدنظر توست، خروجی HTML را بررسی کن.');
        if (preparedStyles.some((item) => item.recovered)) warnings.push('یک بلوک style شامل نشانه‌های HTML و یک style تو‌در‌تو بود؛ CSS داخلی آن بازیابی شد. خروجی CSS را بررسی کن، چون این ورودی ساختار معتبر HTML/CSS ندارد.');
        if (preparedStyles.some((item) => item.skipped)) warnings.push('یک بلوک style حاوی ساختار HTML بود اما style داخلی قابل بازیابی پیدا نشد؛ آن بلوک از خروجی CSS کنار گذاشته شد تا HTML به‌اشتباه وارد فایل CSS نشود.');
        if (countMatches(raw, /<style\b/gi) !== styleBlocks.length) warnings.push('احتمالاً یک یا چند بلوک style ناقص است یا تگ پایانی آن شکل غیرمعمولی دارد.');
        if (countMatches(raw, /<script\b/gi) !== allScriptBlocks.length) warnings.push('احتمالاً یک یا چند بلوک script ناقص است یا ساختار/نوع غیرمعمولی دارد؛ کد استخراج‌شده را بررسی کن.');
        if (duplicateBlocks) warnings.push(clean
            ? 'تعداد ' + duplicateBlocks + ' بلوک CSS/JavaScript که متنشان دقیقاً یکسان بود، حذف شد.'
            : 'تعداد ' + duplicateBlocks + ' بلوک CSS/JavaScript کاملاً تکراری شناسایی شد. برای حذف فقط موارد کاملاً یکسان از Clean & analyze استفاده کن.');
        if (declarationReport.conflicts.length) {
            const names = declarationReport.conflicts.map((item) => item.name);
            const visibleNames = names.slice(0, 10).join('، ') + (names.length > 10 ? ' و ' + (names.length - 10) + ' مورد دیگر' : '');
            warnings.push('CRITICAL:تعریف متغیر/کلاس سطح اصلی با const، let یا class بیش از یک بار دیده شد: ' + visibleNames + '. اگر این بخش‌ها با هم در یک فایل اجرا شوند، ممکن است کل JavaScript به‌دلیل خطای SyntaxError اجرا نشود. تیک Apply JavaScript برداشته می‌شود تا قبل از اصلاح، ناخواسته اعمال نشود.');
        }
        if (similarScripts.length) {
            warnings.push('چند بخش JavaScript شباهت زیادی دارند (' + similarScripts.map((pair) => 'بخش‌های ' + pair.first + ' و ' + pair.second).join('؛ ') + '). این‌ها احتمالاً نسخه‌های مختلف یک کد هستند. چون تفاوت‌های کوچک ممکن است مهم باشند، ابزار آن‌ها را خودکار حذف یا ادغام نکرده است.');
        }
        if (declarationReport.repeated.length) {
            const names = declarationReport.repeated.map((item) => item.name).slice(0, 8).join('، ');
            warnings.push('نام‌های تابع یا متغیر تکراری دیگری پیدا شد: ' + names + '. همهٔ این موارد الزاماً خطای نحوی نیستند، اما ممکن است تعریف بعدی رفتار قبلی را عوض کند.');
        }
        if (externalCss.length) warnings.push('تعداد ' + externalCss.length + ' ارجاع به فایل/منبع CSS خارجی پیدا شد. تگ‌های آن‌ها در HTML حفظ شده‌اند، اما فایل‌های راه‌دور دانلود یا در خروجی جاسازی نشده‌اند.');
        if (externalJs.length) warnings.push('تعداد ' + externalJs.length + ' ارجاع به فایل/منبع JavaScript خارجی پیدا شد. تگ‌های آن‌ها در HTML حفظ شده‌اند، اما فایل‌های راه‌دور دانلود یا در خروجی جاسازی نشده‌اند.');
        if (!html.trim() && !cssParts.length && !jsParts.length) warnings.push('بخش قابل استفاده‌ای استخراج نشد؛ ممکن است ساختار ورودی ناقص یا پشتیبانی‌نشده باشد.');
        if (!clean && countMatches(raw, /<(?:html|style|script)\b/gi) > 1 && !duplicateBlocks && !warnings.length) warnings.push('چند بلوک ساختاری پیدا شد. فقط تکرارهای کاملاً یکسان به‌صورت خودکار پاک‌سازی می‌شوند؛ خروجی‌ها را دستی بررسی کن.');

        targets.html.output.value = html;
        targets.css.output.value = cssParts.join('\n\n').trim();
        targets.js.output.value = jsParts.join('\n\n').trim();
        Object.keys(targets).forEach((language) => updateOutputState(language, !!targets[language].output.value.trim()));

        const detectedAsFa = {
            'Mixed document': 'سند ترکیبی',
            'JavaScript fragment': 'بخش JavaScript',
            'CSS fragment': 'بخش CSS',
            'HTML fragment': 'بخش HTML'
        }[detectedAs] || detectedAs;
        renderStats([
            { value: detectedAsFa, label: 'نوع ورودی' },
            { value: documentCount || 0, label: 'نشانه‌های شروع سند' },
            { value: styleBlocks.length, label: 'بلوک‌های style' },
            { value: inlineScriptBlocks.length, label: 'بلوک‌های JavaScript' },
            { value: duplicateBlocks, label: 'تکرارهای دقیق' }
        ]);
        setNotes(warnings);
        if (declarationReport.conflicts.length) targets.js.checkbox.checked = false;
        summary.textContent = declarationReport.conflicts.length
            ? 'تحلیل انجام شد؛ پیش از اعمال JavaScript، تعارض‌های گزارش‌شده را اصلاح کن.'
            : 'تحلیل انجام شد. هر سه خروجی را بررسی کن؛ هنوز تغییری در فایل‌های اصلی ویرایشگر اعمال نشده است.';
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
            actionStatus.textContent = 'فایل «' + file.name + '» باز شد. برای تشخیص اولیه، حالت Analyze code اجرا می‌شود؛ پاک‌سازی خودکار انجام نمی‌شود.';
            analyze(false);
        } catch (error) {
            actionStatus.textContent = 'خواندن فایل ممکن نشد. یک فایل متنی HTML، CSS یا JavaScript انتخاب کن.';
        } finally { fileInput.value = ''; }
    });

    byId('siPaste').addEventListener('click', async () => {
        if (!navigator.clipboard || typeof navigator.clipboard.readText !== 'function') {
            actionStatus.textContent = 'دسترسی به کلیپ‌بورد در این محیط فعال نیست؛ کد را دستی در کادر بچسبان.';
            sourceInput.focus(); return;
        }
        try {
            sourceInput.value = await navigator.clipboard.readText();
            actionStatus.textContent = 'متن کلیپ‌بورد وارد شد. برای بررسی و تفکیک کد، Analyze code را اجرا کن.';
            sourceInput.focus();
        } catch (error) {
            actionStatus.textContent = 'دسترسی به کلیپ‌بورد رد شد یا در دسترس نیست؛ کد را دستی وارد کن.';
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
            actionStatus.textContent = 'برای اعمال کد، دست‌کم یک بخش غیرخالی را انتخاب کن.';
            return;
        }
        if (!window.HTMLCSJSEditor || typeof window.HTMLCSJSEditor.applyImportedCode !== 'function') {
            actionStatus.textContent = 'ارتباط با ویرایشگر در دسترس نیست. صفحه را دوباره بارگذاری و دوباره امتحان کن.';
            return;
        }
        const result = window.HTMLCSJSEditor.applyImportedCode(selected);
        if (result && result.cancelled) actionStatus.textContent = 'عملیات لغو شد؛ هیچ‌یک از فایل‌های ویرایشگر تغییر نکرد.';
        else if (result && result.error) actionStatus.textContent = 'اعمال کد انجام نشد: ' + result.error;
        else if (result && result.applied && result.applied.length) {
            const labels = { html: 'HTML', css: 'CSS', js: 'JavaScript' };
            actionStatus.textContent = 'کد در بخش‌های ' + result.applied.map((lang) => labels[lang]).join('، ') + ' اعمال شد. زبانه‌های ویرایشگر و پیش‌نمایش زنده را بررسی کن.';
        }
    });
})();