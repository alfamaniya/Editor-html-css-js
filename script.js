    (function() {
        'use strict';

        // ==========================================
        //  ثابت‌ها
        // ==========================================
        const DEFAULT_HTML = '<h1>Hello, world!</h1>';
        const DEFAULT_CSS = 'body { font-family: sans-serif; }';
        const DEFAULT_JS = 'console.log("Hello, world!");';

        // ==========================================
        //  کتابخانه‌های آماده (Presets)
        //  ۸۵ کتابخانه: ۳۰ اصلی + ۳۰ جدید (آفیس، محاسبات، کاربردی) + ۲۵ کتابخانه تکمیلی
        // ==========================================
        const PRESETS = [
            // ---------- ۳۰ کتابخانه اصلی ----------
            { name: 'Bootstrap 5 CSS', type: 'css', desc: 'Popular CSS framework', cdn: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' },
            { name: 'Animate.css', type: 'css', desc: 'Ready-made animations', cdn: 'https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css' },
            { name: 'Tailwind CSS', type: 'js', desc: 'Utility-first (Play CDN script)', cdn: 'https://cdn.tailwindcss.com/3.4.16' },
            { name: 'Font Awesome 6', type: 'css', desc: 'Vector icons', cdn: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.2/css/all.min.css' },
            { name: 'Normalize.css', type: 'css', desc: 'CSS reset', cdn: 'https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css' },
            { name: 'jQuery 3.7', type: 'js', desc: 'DOM library', cdn: 'https://code.jquery.com/jquery-3.7.1.min.js' },
            { name: 'Bootstrap 5 JS', type: 'js', desc: 'Interactive components', cdn: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js' },
            { name: 'Lodash', type: 'js', desc: 'Utility functions', cdn: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js' },
            { name: 'Axios', type: 'js', desc: 'HTTP requests', cdn: 'https://cdn.jsdelivr.net/npm/axios@1.7.7/dist/axios.min.js' },
            { name: 'React 18', type: 'js', desc: 'UI library', cdn: 'https://unpkg.com/react@18/umd/react.production.min.js' },
            { name: 'Vue 3', type: 'js', desc: 'UI framework', cdn: 'https://cdn.jsdelivr.net/npm/vue@3.4.38/dist/vue.global.prod.js' },
            { name: 'Chart.js', type: 'js', desc: 'Charts', cdn: 'https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js' },
            { name: 'D3.js', type: 'js', desc: 'Visualization', cdn: 'https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js' },
            { name: 'Bulma', type: 'css', desc: 'Modern and lightweight', cdn: 'https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css' },
            { name: 'UIkit', type: 'css', desc: 'Lightweight and modular', cdn: 'https://cdn.jsdelivr.net/npm/uikit@3.21.6/dist/css/uikit.min.css' },
            { name: 'Foundation', type: 'css', desc: 'Professional', cdn: 'https://cdn.jsdelivr.net/npm/foundation-sites@6.8.1/dist/css/foundation.min.css' },
            { name: 'Materialize CSS', type: 'css', desc: 'Material Design', cdn: 'https://cdn.jsdelivr.net/npm/materialize-css@1.0.0/dist/css/materialize.min.css' },
            { name: 'Pure CSS', type: 'css', desc: 'Minimal', cdn: 'https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css' },
            { name: 'Alpine.js', type: 'js', desc: 'Lightweight and simple', cdn: 'https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js' },
            { name: 'SweetAlert2', type: 'js', desc: 'Beautiful alerts', cdn: 'https://cdn.jsdelivr.net/npm/sweetalert2@11.12.0/dist/sweetalert2.all.min.js' },
            { name: 'Swiper', type: 'js', desc: 'Touch slider', cdn: 'https://cdn.jsdelivr.net/npm/swiper@11.1.4/swiper-bundle.min.js' },
            { name: 'GSAP', type: 'js', desc: 'Professional animations', cdn: 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js' },
            { name: 'AOS', type: 'js', desc: 'Scroll animations', cdn: 'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js' },
            { name: 'Toastify JS', type: 'js', desc: 'Simple notifications', cdn: 'https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/src/toastify.min.js' },
            { name: 'Day.js', type: 'js', desc: 'Lightweight date handling', cdn: 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/dayjs.min.js' },
            { name: 'Moment.js', type: 'js', desc: 'Date and time', cdn: 'https://cdn.jsdelivr.net/npm/moment@2.30.1/min/moment.min.js' },
            { name: 'Clipboard.js', type: 'js', desc: 'Clipboard copying', cdn: 'https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js' },
            { name: 'CountUp.js', type: 'js', desc: 'Animated counters', cdn: 'https://cdn.jsdelivr.net/npm/countup.js@2.8.0/dist/countUp.min.js' },
            { name: 'Typed.js', type: 'js', desc: 'Typing effects', cdn: 'https://cdn.jsdelivr.net/npm/typed.js@2.1.0/dist/typed.umd.js' },
            { name: 'Lottie', type: 'js', desc: 'JSON animations', cdn: 'https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js' },
            // ---------- ۳۰ کتابخانه جدید (آفیس، محاسبات، کاربردی) ----------
            // --- آفیس و اسناد (۱۰) ---
            { name: 'SheetJS (xlsx)', type: 'js', desc: 'Read/write Excel and CSV', cdn: 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js' },
            { name: 'ExcelJS', type: 'js', desc: 'Excel file handling', cdn: 'https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js' },
            { name: 'PDF.js', type: 'js', desc: 'PDF viewer', cdn: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.7.76/build/pdf.min.js' },
            { name: 'jsPDF', type: 'js', desc: 'Create PDFs in the browser', cdn: 'https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js' },
            { name: 'pdfmake', type: 'js', desc: 'Create PDFs from JSON', cdn: 'https://cdn.jsdelivr.net/npm/pdfmake@0.2.10/build/pdfmake.min.js' },
            { name: 'docx', type: 'js', desc: 'Create Word documents', cdn: 'https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.js' },
            { name: 'docx-preview', type: 'js', desc: 'Preview Word documents in the browser', cdn: 'https://cdn.jsdelivr.net/npm/docx-preview@0.3.3/dist/docx-preview.min.js' },
            { name: 'mammoth', type: 'js', desc: 'Convert Word to HTML', cdn: 'https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js' },
            { name: 'PDF-LIB', type: 'js', desc: 'Create and edit PDFs', cdn: 'https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js' },
            { name: 'docxtemplater', type: 'js', desc: 'Fill Word templates', cdn: 'https://cdn.jsdelivr.net/npm/docxtemplater@3.61.2/build/docxtemplater.js' },
            // --- محاسبات (۱۰) ---
            { name: 'math.js', type: 'js', desc: 'Advanced math calculations', cdn: 'https://cdn.jsdelivr.net/npm/mathjs@13.2.0/lib/browser/math.js' },
            { name: 'decimal.js', type: 'js', desc: 'Precise decimal calculations', cdn: 'https://cdn.jsdelivr.net/npm/decimal.js@10.4.3/decimal.min.js' },
            { name: 'expr-eval', type: 'js', desc: 'Evaluate mathematical expressions', cdn: 'https://cdn.jsdelivr.net/npm/expr-eval@2.0.2/dist/bundle.min.js' },
            { name: 'currency.js', type: 'js', desc: 'Precise currency calculations', cdn: 'https://cdn.jsdelivr.net/npm/currency.js@2.0.3/dist/currency.min.js' },
            { name: 'numeral.js', type: 'js', desc: 'Format numbers and currencies', cdn: 'https://cdn.jsdelivr.net/npm/numeral@2.0.6/numeral.min.js' },
            { name: 'convert', type: 'js', desc: 'Convert measurement units', cdn: 'https://cdn.jsdelivr.net/npm/convert@5.9.0/dist/index.js' },
            { name: 'date-fns', type: 'js', desc: 'Useful date functions', cdn: 'https://cdn.jsdelivr.net/npm/date-fns@4.1.0/cdn.min.js' },
            { name: 'Luxon', type: 'js', desc: 'Dates with time zones', cdn: 'https://cdn.jsdelivr.net/npm/luxon@3.5.0/build/global/luxon.min.js' },
            { name: 'big.js', type: 'js', desc: 'Big-number arithmetic', cdn: 'https://cdn.jsdelivr.net/npm/big.js@6.2.2/big.min.js' },
            { name: 'Fraction.js', type: 'js', desc: 'Fraction calculations', cdn: 'https://cdn.jsdelivr.net/npm/fraction.js@4.3.7/fraction.min.js' },
            // --- کاربردی (۱۰) ---
            { name: 'PapaParse', type: 'js', desc: 'Fast CSV parsing', cdn: 'https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js' },
            { name: 'JSZip', type: 'js', desc: 'Create and read ZIP files', cdn: 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js' },
            { name: 'SortableJS', type: 'js', desc: 'Drag and drop lists', cdn: 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.6/Sortable.min.js' },
            { name: 'Tabulator', type: 'js', desc: 'Advanced data tables', cdn: 'https://cdn.jsdelivr.net/npm/tabulator-tables@6.3.1/dist/js/tabulator.min.js' },
            { name: 'QRCode.js', type: 'js', desc: 'Generate QR codes', cdn: 'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js' },
            { name: 'JsBarcode', type: 'js', desc: 'Generate barcodes', cdn: 'https://cdn.jsdelivr.net/npm/jsbarcode@3.12.1/dist/JsBarcode.all.min.js' },
            { name: 'CryptoJS', type: 'js', desc: 'Encryption and hashing', cdn: 'https://cdn.jsdelivr.net/npm/crypto-js@4.2.0/crypto-js.min.js' },
            { name: 'DOMPurify', type: 'js', desc: 'Sanitize HTML against XSS', cdn: 'https://cdn.jsdelivr.net/npm/dompurify@3.1.7/dist/purify.min.js' },
            { name: 'Tesseract.js', type: 'js', desc: 'Extract text from images (OCR)', cdn: 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js' },
            { name: 'Marked', type: 'js', desc: 'Convert Markdown to HTML', cdn: 'https://cdn.jsdelivr.net/npm/marked@15.0.0/marked.min.js' },
            // ---------- Additional visual, UI, data and utility libraries ----------
            { name: 'Prism.js', type: 'js', desc: 'Syntax highlighting core', cdn: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js' },
            { name: 'Prism.css', type: 'css', desc: 'Syntax highlighting theme', cdn: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css' },
            { name: 'Highlight.js', type: 'js', desc: 'Code syntax highlighting', cdn: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/highlight.min.js' },
            { name: 'Highlight.js CSS', type: 'css', desc: 'Code highlight theme', cdn: 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/styles/github-dark.min.css' },
            { name: 'Bootstrap Icons', type: 'css', desc: 'Bootstrap icon font', cdn: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css' },
            { name: 'Remix Icon', type: 'css', desc: 'Large icon collection', cdn: 'https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css' },
            { name: 'ECharts', type: 'js', desc: 'Interactive data charts', cdn: 'https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js' },
            { name: 'ApexCharts', type: 'js', desc: 'Interactive charts', cdn: 'https://cdn.jsdelivr.net/npm/apexcharts@3.54.1/dist/apexcharts.min.js' },
            { name: 'Leaflet CSS', type: 'css', desc: 'Interactive map styles', cdn: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css' },
            { name: 'Leaflet JS', type: 'js', desc: 'Interactive maps', cdn: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js' },
            { name: 'Flatpickr CSS', type: 'css', desc: 'Date picker styles', cdn: 'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.css' },
            { name: 'Flatpickr JS', type: 'js', desc: 'Date and time picker', cdn: 'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.js' },
            { name: 'Choices.js CSS', type: 'css', desc: 'Enhanced select styles', cdn: 'https://cdn.jsdelivr.net/npm/choices.js@11.0.2/public/assets/styles/choices.min.css' },
            { name: 'Choices.js', type: 'js', desc: 'Enhanced select controls', cdn: 'https://cdn.jsdelivr.net/npm/choices.js@11.0.2/public/assets/scripts/choices.min.js' },
            { name: 'Fuse.js', type: 'js', desc: 'Fuzzy search for lists', cdn: 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js' },
            { name: 'FileSaver.js', type: 'js', desc: 'Save files from browser', cdn: 'https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js' },
            { name: 'html2canvas', type: 'js', desc: 'Capture DOM as image', cdn: 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js' },
            { name: 'Cropper.js CSS', type: 'css', desc: 'Image cropper styles', cdn: 'https://cdn.jsdelivr.net/npm/cropperjs@1.6.2/dist/cropper.min.css' },
            { name: 'Cropper.js', type: 'js', desc: 'Crop images in browser', cdn: 'https://cdn.jsdelivr.net/npm/cropperjs@1.6.2/dist/cropper.min.js' },
            { name: 'p5.js', type: 'js', desc: 'Creative coding and canvas', cdn: 'https://cdn.jsdelivr.net/npm/p5@1.11.0/lib/p5.min.js' },
            { name: 'Anime.js', type: 'js', desc: 'JavaScript animations', cdn: 'https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js' },
            { name: 'FullCalendar', type: 'js', desc: 'Calendar and scheduling UI', cdn: 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js' },
            { name: 'Three.js', type: 'js', desc: '3D graphics with WebGL', cdn: 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js' },
            { name: 'Pikaday CSS', type: 'css', desc: 'Lightweight date picker theme', cdn: 'https://cdn.jsdelivr.net/npm/pikaday@1.8.2/css/pikaday.css' },
            { name: 'Pikaday JS', type: 'js', desc: 'Lightweight date picker', cdn: 'https://cdn.jsdelivr.net/npm/pikaday@1.8.2/pikaday.js' }
        ];

        const LANGS = ['html', 'css', 'js'];

        const outputFrame = document.getElementById('output');
        const editorsBox  = document.getElementById('editors');
        const toast       = document.getElementById('toast');
        const tabButtons  = Array.from(document.querySelectorAll('.tab'));
        const dirtyBadge  = document.getElementById('dirtyBadge');
        const libsPanel   = document.getElementById('libsPanel');
        const editors     = {};

        const STORAGE_KEY = 'html-editor-code-v2';
        const PROJECT_KEY = 'html-editor-project-v3';
        const PROJECT_RECOVERY_KEY = 'html-editor-project-v3-recovery';
        const FONT_KEY    = 'html-editor-font';
        const TAB_KEY     = 'html-editor-tab';
        const LIBS_KEY    = 'html-editor-libs-v1';
        const SPLIT_KEY   = 'html-editor-split-pos';

        let previewTimer = null;
        let autoSaveTimer = null;
        let dirtyResetTimer = null;
        let project = null;
        let projectLoadWarning = '';
        let projectRecoveryAvailable = false;
        let lastExportDependencyWarnings = [];
        let libraries = [];
        let libraryDownloadController = null;
        let libraryDownloadRequest = 0;
        let activeTab = 'html';
        let dirty = false;
        const dirtyFileIds = new Set();

        function setDirty(value) {
            const next = !!value;
            const changed = next !== dirty;
            dirty = next;
            if (!next) dirtyFileIds.clear();
            dirtyBadge.hidden = !dirty;
            // Re-render the file list only when the state changes, not on every keystroke.
            if (changed && project) renderFileExplorer();
        }
        window.addEventListener('beforeunload', function (e) {
            if (dirty) { e.preventDefault(); e.returnValue = ''; }
        });

        function storageGet(key) {
            try { return localStorage.getItem(key); } catch (e) { return null; }
        }
        function storageSet(key, value) {
            try { localStorage.setItem(key, value); return true; } catch (e) { return false; }
        }

        function escHtml(s) {
            return String(s)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }
        function makeId() {
            return 'f_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6);
        }

        // ==========================================
        //  Project
        // ==========================================
        function isUntouchedLegacyStarter(files) {
            const names = { html: 'index.html', css: 'style.css', js: 'script.js' };
            const get = function(type) { return files.find(function(file) { return file.type === type; }); };
            const htmlFile = get('html');
            const cssFile = get('css');
            const jsFile = get('js');
            if (!htmlFile || !cssFile || !jsFile ||
                htmlFile.name !== names.html || cssFile.name !== names.css || jsFile.name !== names.js) return false;

            // Upgrade only known untouched starter signatures. Do not replace user-authored files.
            const oldSingleCard = htmlFile.content.includes('<h1>Hello, World!</h1>') &&
                htmlFile.content.includes('<button id="btn">Click Me</button>') &&
                jsFile.content.includes("alert('It works!');");
            const oldTenButtons = htmlFile.content.includes('10 Small Boxes, 10 Buttons') &&
                htmlFile.content.includes('id="boxGrid"') &&
                jsFile.content.includes('function showMessage()') &&
                jsFile.content.includes('function addBox()');
            const oldTwoHundredCodeCards = htmlFile.content.includes('id="codeGrid"') &&
                htmlFile.content.includes('200 Code Boxes') &&
                cssFile.content.includes('.code-card') &&
                jsFile.content.includes('const totalBoxes = 200') &&
                jsFile.content.includes('boxCount.textContent = grid.children.length + " boxes"');
            const oldTagGallery = htmlFile.content.includes('200 Interactive Tag Samples') ||
                htmlFile.content.includes('id="tagGrid"');
            return oldSingleCard || oldTenButtons || oldTwoHundredCodeCards || oldTagGallery;
        }

        function createDefaultProject() {
            const ids = { html: makeId(), css: makeId(), js: makeId() };
            return {
                files: [
                    { id: ids.html, name: 'index.html', type: 'html', content: DEFAULT_HTML },
                    { id: ids.css,  name: 'style.css',  type: 'css',  content: DEFAULT_CSS },
                    { id: ids.js,   name: 'script.js',  type: 'js',   content: DEFAULT_JS }
                ],
                activeFileId: ids.html,
                lastActiveByLang: { html: ids.html, css: ids.css, js: ids.js },
                documentTitle: 'My Page',
                headExtras: ''
            };
        }

        function loadProject() {
            const rawProject = storageGet(PROJECT_KEY);
            try {
                if (rawProject) {
                    const p = JSON.parse(rawProject);
                    if (p && Array.isArray(p.files)) {
                        const seenIds = new Set();
                        const validFiles = p.files
                            .filter(function(file) {
                                return file && typeof file === 'object' &&
                                    LANGS.includes(file.type) && typeof file.content === 'string';
                            })
                            .map(function(file) {
                                let id = (typeof file.id === 'string' && file.id) ? file.id : makeId();
                                if (seenIds.has(id)) id = makeId();
                                seenIds.add(id);
                                const name = (typeof file.name === 'string' && file.name.trim())
                                    ? file.name.trim().slice(0, 40)
                                    : 'untitled.' + file.type;
                                return { id: id, name: name, type: file.type, content: file.content };
                            });

                        if (validFiles.length) {
                            if (isUntouchedLegacyStarter(validFiles)) {
                                // Keep a recoverable copy, then upgrade only the pristine old starter.
                                storageSet(PROJECT_RECOVERY_KEY, rawProject);
                                const upgraded = createDefaultProject();
                                storageSet(PROJECT_KEY, JSON.stringify(upgraded));
                                return upgraded;
                            }
                            const requestedLast = p.lastActiveByLang && typeof p.lastActiveByLang === 'object'
                                ? p.lastActiveByLang : {};
                            const lastActiveByLang = {};
                            LANGS.forEach(function(lang) {
                                const candidate = validFiles.find(function(file) {
                                    return file.id === requestedLast[lang] && file.type === lang;
                                }) || validFiles.find(function(file) { return file.type === lang; });
                                lastActiveByLang[lang] = candidate ? candidate.id : null;
                            });
                            const active = validFiles.find(function(file) { return file.id === p.activeFileId; });
                            return {
                                files: validFiles,
                                activeFileId: active ? active.id : validFiles[0].id,
                                lastActiveByLang: lastActiveByLang,
                                documentTitle: typeof p.documentTitle === 'string' ? p.documentTitle.slice(0, 200) : 'My Page',
                                headExtras: typeof p.headExtras === 'string' ? p.headExtras : ''
                            };
                        }
                    }
                }
            } catch (e) {}

            // Preserve unreadable or structurally invalid project data before a later
            // autosave can replace it with the fallback starter project.
            if (rawProject) {
                projectRecoveryAvailable = storageSet(PROJECT_RECOVERY_KEY, rawProject);
                projectLoadWarning = projectRecoveryAvailable
                    ? 'Saved project data could not be loaded. Download the recovery copy before editing.'
                    : 'Saved project data could not be loaded, and the browser could not preserve a recovery copy.';
            }

            try {
                const old = storageGet(STORAGE_KEY);
                if (old) {
                    const parsed = JSON.parse(old);
                    if (parsed && (parsed.html || parsed.css || parsed.js)) {
                        const ids = { html: makeId(), css: makeId(), js: makeId() };
                        const migrated = {
                            files: [
                                { id: ids.html, name: 'index.html', type: 'html', content: typeof parsed.html === 'string' ? parsed.html : DEFAULT_HTML },
                                { id: ids.css,  name: 'style.css',  type: 'css',  content: typeof parsed.css === 'string' ? parsed.css : DEFAULT_CSS },
                                { id: ids.js,   name: 'script.js',  type: 'js',   content: typeof parsed.js === 'string' ? parsed.js : DEFAULT_JS }
                            ],
                            activeFileId: ids.html,
                            lastActiveByLang: { html: ids.html, css: ids.css, js: ids.js }
                        };
                        if (isUntouchedLegacyStarter(migrated.files)) {
                            storageSet(PROJECT_KEY, JSON.stringify(createDefaultProject()));
                            return createDefaultProject();
                        }
                        return migrated;
                    }
                }
            } catch (e) {}

            return createDefaultProject();
        }

        function saveProject() {
            let saved = false;
            try {
                saved = storageSet(PROJECT_KEY, JSON.stringify(project));
            } catch (e) {
                saved = false;
            }
            if (!saved) {
                setDirty(true);
                showToast('❌ Saving failed. Check available browser storage.', 'error');
            }
            return saved;
        }

        function scheduleSaveProject() {
            setDirty(true);
            clearTimeout(autoSaveTimer);
            clearTimeout(dirtyResetTimer);
            autoSaveTimer = setTimeout(function() {
                if (saveProject()) {
                    dirtyResetTimer = setTimeout(function() { setDirty(false); }, 700);
                } else {
                    setDirty(true);
                }
            }, 120);
        }

        function getFile(id) {
            return project.files.find(function(f) { return f.id === id; }) || null;
        }
        function getFileForLang(lang) {
            const id = project.lastActiveByLang[lang];
            let f = id ? getFile(id) : null;
            if (f && f.type === lang) return f;
            f = project.files.find(function(x) { return x.type === lang; });
            if (f) project.lastActiveByLang[lang] = f.id;
            return f || null;
        }

        // ==========================================
        //  File Explorer
        // ==========================================
        const feList      = document.getElementById('feList');
        const feAddBtn    = document.getElementById('feAddBtn');
        const fileExplorer = document.getElementById('fileExplorer');
        const feToggleBtn = document.getElementById('feToggleBtn');
        const FILE_EXPLORER_KEY = 'html-editor-file-explorer-collapsed';
        const feSearch = document.getElementById('feSearch');
        const feTypeFilter = document.getElementById('feTypeFilter');
        const feGroupMode = document.getElementById('feGroupMode');

        const fileExplorerMedia = window.matchMedia('(max-width: 768px)');
        const savedExplorerState = storageGet(FILE_EXPLORER_KEY);
        let hasManualExplorerPreference = savedExplorerState === '1' || savedExplorerState === '0';

        function setFileExplorerCollapsed(collapsed, persist) {
            fileExplorer.classList.toggle('is-collapsed', collapsed);
            feToggleBtn.setAttribute('aria-expanded', String(!collapsed));
            feToggleBtn.setAttribute('aria-label', collapsed ? 'Open file manager' : 'Collapse file manager');
            feToggleBtn.title = collapsed ? 'Open file manager' : 'Collapse file manager';
            if (persist !== false) {
                storageSet(FILE_EXPLORER_KEY, collapsed ? '1' : '0');
                hasManualExplorerPreference = true;
            }
        }

        const initialExplorerCollapsed = hasManualExplorerPreference
            ? savedExplorerState === '1'
            : fileExplorerMedia.matches;
        setFileExplorerCollapsed(initialExplorerCollapsed, false);
        const handleExplorerViewportChange = function(event) {
            if (!hasManualExplorerPreference) setFileExplorerCollapsed(event.matches, false);
        };
        if (typeof fileExplorerMedia.addEventListener === 'function') {
            fileExplorerMedia.addEventListener('change', handleExplorerViewportChange);
        } else if (typeof fileExplorerMedia.addListener === 'function') {
            fileExplorerMedia.addListener(handleExplorerViewportChange);
        }
        feToggleBtn.addEventListener('click', function() {
            setFileExplorerCollapsed(!fileExplorer.classList.contains('is-collapsed'));
        });
        const feNewForm   = document.getElementById('feNewForm');
        const feNewName   = document.getElementById('feNewName');
        const feLibraryBtn = document.getElementById('feLibraryBtn');
        const feNewCreate = document.getElementById('feNewCreate');
        const feNewCancel = document.getElementById('feNewCancel');

        function renderFileExplorer() {
            if (!project) return;
            const query = feSearch ? feSearch.value.trim().toLowerCase() : '';
            const typeFilter = feTypeFilter ? feTypeFilter.value : 'all';
            const groupMode = feGroupMode ? feGroupMode.value : 'manual';
            let files = project.files.filter(function(f) {
                return (typeFilter === 'all' || f.type === typeFilter) && (!query || f.name.toLowerCase().includes(query));
            });
            if (groupMode === 'type') {
                const order = { html: 0, css: 1, js: 2 };
                files.sort(function(a, b) { return order[a.type] - order[b.type] || a.name.localeCompare(b.name); });
            } else if (groupMode === 'name') {
                files.sort(function(a, b) { return a.name.localeCompare(b.name); });
            }
            const html = files.map(function(f) {
                const isActive = f.id === project.activeFileId;
                const icon = f.type === 'html' ? '📄' : (f.type === 'css' ? '🎨' : '⚡');
                const isDirty = dirtyFileIds.has(f.id);
                return '<div class="fe-item' + (isActive ? ' active' : '') + '" data-id="' + escHtml(f.id) + '" title="' + escHtml(f.name) + '">' +
                    '<button type="button" class="fe-open" data-role="name" aria-label="Open file ' + escHtml(f.name) + (isActive ? ', active file' : '') + '">' +
                    '<span class="fe-icon" aria-hidden="true">' + icon + '</span>' +
                    '<span class="fe-name">' + escHtml(f.name) + '</span></button>' +
                    (isDirty ? '<span class="fe-dirty-dot" title="Unsaved changes" aria-label="Unsaved changes">●</span>' : '') +
                    '<button type="button" class="fe-rename" data-action="rename" title="Rename ' + escHtml(f.name) + '" aria-label="Rename ' + escHtml(f.name) + '">✏️</button>' +
                    '<button type="button" class="fe-del" data-action="delete" title="Delete ' + escHtml(f.name) + '" aria-label="Delete ' + escHtml(f.name) + '">🗑</button>' +
                '</div>';
            }).join('');
            feList.innerHTML = html || '<div class="fe-empty" role="status">' + (query || typeFilter !== 'all' ? 'No matching files' : 'No files yet') + '</div>';
        }
        let feSearchTimer = null;
        if (feSearch) {
            feSearch.addEventListener('input', function() {
                clearTimeout(feSearchTimer);
                feSearchTimer = setTimeout(renderFileExplorer, 120);
            });
        }
        [feTypeFilter, feGroupMode].forEach(function(control) {
            if (control) control.addEventListener('change', renderFileExplorer);
        });

        feLibraryBtn.addEventListener('click', function() {
            activateTab('libs');
            if (window.matchMedia('(max-width: 768px)').matches) setFileExplorerCollapsed(true);
        });
        document.getElementById('btnHelp').addEventListener('click', function() {
            activateTab('help');
        });

        feAddBtn.addEventListener('click', function() {
            if (fileExplorer.classList.contains('is-collapsed')) {
                setFileExplorerCollapsed(false);
            }
            feNewForm.hidden = !feNewForm.hidden;
            if (!feNewForm.hidden) {
                feNewName.value = '';
                setTimeout(function() { feNewName.focus(); }, 30);
            }
        });

        feNewCancel.addEventListener('click', function() { feNewForm.hidden = true; });

        function fileNameError(name, type, excludeId) {
            if (!name) return 'Enter a file name.';
            if (name.length > 120) return 'File names must be 120 characters or fewer.';
            if (/[\\/:*?"<>|\u0000-\u001f\u007f-\u009f]/.test(name)) return 'File names cannot contain \\ / : * ? " < > | or control characters.';
            if (project.files.some(function(f) { return f.id !== excludeId && f.name.toLowerCase() === name.toLowerCase(); })) return 'A file with that name already exists.';
            return '';
        }
        function fileNameWarning(name, type) {
            const match = name.match(/\.([^.]+)$/);
            const extType = match ? ({ html: 'html', htm: 'html', css: 'css', js: 'js', mjs: 'js' })[match[1].toLowerCase()] : null;
            return extType && extType !== type ? 'The file extension does not match the selected ' + type.toUpperCase() + ' type.' : '';
        }
        feNewCreate.addEventListener('click', function() {
            let name = feNewName.value.trim();
            if (!name) { showToast('❌ Enter a file name with an extension, e.g. style.css', 'error'); feNewName.focus(); return; }
            if (!/\.[^.]+$/.test(name)) {
                const fallbackType = LANGS.includes(activeTab) ? activeTab : 'html';
                name += '.' + fallbackType;
            }
            const extension = (name.match(/\.([^.]+)$/) || [,''])[1].toLowerCase();
            const typeByExtension = { html: 'html', htm: 'html', css: 'css', js: 'js', mjs: 'js' };
            const type = typeByExtension[extension];
            if (!type) { showToast('❌ Supported extensions: .html, .htm, .css, .js, .mjs', 'error'); feNewName.focus(); return; }
            const error = fileNameError(name, type, null);
            if (error) { showToast('❌ ' + error, 'error'); feNewName.focus(); return; }
            const file = { id: makeId(), name: name, type: type, content: '' };
            project.files.push(file);
            renderFileExplorer();
            feNewForm.hidden = true;
            const saved = openFile(file.id);
            if (window.matchMedia('(max-width: 768px)').matches) setFileExplorerCollapsed(true);
            showToast(
                saved ? '✅ File “' + name + '” created' : '⚠ File created in this session, but could not be saved.',
                saved ? 'success' : 'error'
            );
        });

        feNewName.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { e.preventDefault(); feNewCreate.click(); }
            else if (e.key === 'Escape') { e.preventDefault(); feNewForm.hidden = true; }
        });

        feList.addEventListener('click', function(e) {
            const renameBtn = e.target.closest('[data-action="rename"]');
            if (renameBtn) {
                const item = renameBtn.closest('.fe-item');
                if (item) startRename(item, item.dataset.id);
                return;
            }
            const delBtn = e.target.closest('[data-action="delete"]');
            if (delBtn) {
                const item = delBtn.closest('.fe-item');
                if (item) deleteFile(item.dataset.id);
                return;
            }
            if (e.target.matches('input.fe-rename-input')) return;
            const item = e.target.closest('.fe-item');
            if (item) {
                openFile(item.dataset.id);
                if (window.matchMedia('(max-width: 768px)').matches) setFileExplorerCollapsed(true);
            }
        });
        feList.addEventListener('keydown', function(e) {
            const item = e.target.closest('.fe-item');
            if (!item || e.target.matches('input.fe-rename-input')) return;
            if (e.key === 'F2' && !e.target.closest('[data-action="delete"], [data-action="rename"]')) {
                e.preventDefault();
                startRename(item, item.dataset.id);
            }
            // Open/rename/delete controls retain their native keyboard activation.
        });

        feList.addEventListener('dblclick', function(e) {
            const nameEl = e.target.closest('[data-role="name"]');
            if (!nameEl) return;
            const item = nameEl.closest('.fe-item');
            if (!item) return;
            startRename(item, item.dataset.id);
        });

        function startRename(itemEl, fileId) {
            const file = getFile(fileId);
            if (!file) return;
            const nameEl = itemEl.querySelector('[data-role="name"]');
            if (!nameEl) return;

            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'fe-rename-input';
            input.value = file.name;
            input.maxLength = 120;
            input.spellcheck = false;
            nameEl.replaceWith(input);
            input.focus();
            input.select();

            let committed = false;
            function commit() {
                if (committed) return;
                committed = true;
                const newName = input.value.trim();
                if (!newName) { showToast('❌ File name cannot be empty.', 'error'); renderFileExplorer(); return; }
                const error = fileNameError(newName, file.type, file.id);
                if (error) { showToast('❌ ' + error, 'error'); renderFileExplorer(); return; }
                const warning = fileNameWarning(newName, file.type);
                if (warning && !window.confirm(warning + ' Rename anyway?')) {
                    renderFileExplorer();
                    return;
                }
                file.name = newName;
                const saved = saveProject();
                if (saved) setDirty(false);
                renderFileExplorer();
                if (!saved) {
                    showToast('⚠ Rename is only in this session; browser storage could not save it.', 'error');
                } else {
                    const successMessage = '✅ File renamed to “' + newName + '”' +
                        (warning ? ' (the extension differs from the file type)' : '');
                    showToast(successMessage, 'success');
                }
            }
            function cancel() {
                if (committed) return;
                committed = true;
                renderFileExplorer();
            }
            input.addEventListener('blur', commit);
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
                else if (e.key === 'Escape') {
                    e.preventDefault();
                    input.removeEventListener('blur', commit);
                    cancel();
                }
            });
        }

        function deleteFile(fileId) {
            const idx = project.files.findIndex(function(f) { return f.id === fileId; });
            if (idx === -1) return;
            const file = project.files[idx];
            const wasActive = project.activeFileId === fileId;
            const warning = (wasActive ? ' This is the active file.' : '') + (dirty ? ' There are unsaved editor changes.' : '');
            if (!window.confirm('Delete “' + file.name + '”?' + warning + '\n\nYou can undo this deletion from the notification.')) return;

            // Keep only what Undo needs: the deleted file, its position, its prior
            // "last active" pointer, and the blank placeholder created in its place (if any).
            const undoInfo = {
                file: file,
                index: idx,
                wasActive: wasActive,
                prevLastActive: project.lastActiveByLang[file.type],
                blankId: null
            };

            project.files.splice(idx, 1);

            LANGS.forEach(function(lang) {
                if (project.lastActiveByLang[lang] === fileId) project.lastActiveByLang[lang] = null;
            });

            if (!project.files.some(function(f) { return f.type === file.type; })) {
                const blank = { id: makeId(), name: 'untitled.' + file.type, type: file.type, content: '' };
                project.files.push(blank);
                project.lastActiveByLang[file.type] = blank.id;
                undoInfo.blankId = blank.id;
            }

            if (wasActive) {
                const currentLang = LANGS.includes(activeTab) ? activeTab : file.type;
                const next = getFileForLang(currentLang) || project.files[0];
                if (next) {
                    project.activeFileId = next.id;
                    const ed = editors[next.type];
                    if (ed) {
                        ed.ta.value = next.content;
                        ed.refresh();
                    }
                }
            }

            const saved = saveProject();
            if (saved) setDirty(false);
            renderFileExplorer();
            updatePreviewNow();
            showToast(
                saved ? '🗑 “' + file.name + '” deleted' : '⚠ File deleted in this session, but could not be saved.',
                saved ? 'info' : 'error',
                'Undo',
                function() { restoreDeletedFile(undoInfo); }
            );
        }

        function restoreDeletedFile(info) {
            const file = info.file;
            // Do not duplicate a file if the same id is somehow present already.
            if (getFile(file.id)) return;

            // Remove the placeholder that was created when the file was deleted, but only if it is still empty.
            if (info.blankId) {
                const blankIdx = project.files.findIndex(function(f) { return f.id === info.blankId && f.content === ''; });
                if (blankIdx !== -1) project.files.splice(blankIdx, 1);
            }

            // Re-insert the file where it was, keeping every edit made to other files since deletion.
            project.files.splice(Math.min(info.index, project.files.length), 0, file);

            if (!project.lastActiveByLang[file.type] || !getFile(project.lastActiveByLang[file.type])) {
                project.lastActiveByLang[file.type] = file.id;
            }

            if (info.wasActive) {
                project.activeFileId = file.id;
                const ed = editors[file.type];
                if (ed) { ed.ta.value = file.content; ed.refresh(); }
                activateTab(file.type);
            }

            const saved = saveProject();
            if (saved) setDirty(false);
            renderFileExplorer();
            updatePreviewNow();
            showToast(saved ? '↩ File restored' : '⚠ File restored in this session, but could not be saved.', saved ? 'success' : 'error');
        }

        // ==========================================
        //  Open file
        // ==========================================
        function openFile(fileId) {
            const file = getFile(fileId);
            if (!file) return;

            project.activeFileId = fileId;
            project.lastActiveByLang[file.type] = fileId;

            const ed = editors[file.type];
            if (ed) {
                // Avoid resetting the textarea value when it already matches; this preserves native undo history.
                if (ed.ta.value !== file.content) {
                    ed.ta.value = file.content;
                    ed.refresh();
                }
            }

            activateTab(file.type);
            const saved = saveProject();
            if (saved) setDirty(false);
            updatePreviewNow();
            return saved;
        }

        function activateTab(lang) {
            if (lang !== 'libs' && lang !== 'help' && !editors[lang]) lang = 'html';
            picker.close();
            IntelliSense.hide();
            activeTab = lang;
            renderSymbolToolbar(lang);

            LANGS.forEach(function(l) { editors[l].wrap.hidden = true; });
            libsPanel.hidden = true;
            document.getElementById('helpPanel').hidden = true;
            if (lang === 'libs') libsPanel.hidden = false;
            else if (lang === 'help') document.getElementById('helpPanel').hidden = false;
            else if (editors[lang]) editors[lang].wrap.hidden = false;

            tabButtons.forEach(function(b) {
                const on = b.dataset.tab === lang;
                b.classList.toggle('active', on);
                b.setAttribute('aria-selected', on ? 'true' : 'false');
            });

            if (LANGS.includes(lang)) {
                editors[lang].syncScroll();
                const f = getFileForLang(lang);
                if (f) project.activeFileId = f.id;
                renderFileExplorer();
                // Matches are offsets into one editor; recompute them for the newly shown editor.
                if (searchInput.value) scheduleSearch();
            } else {
                searchMatches = []; searchIndex = -1;
                renderSearchResults();
            }

            storageSet(TAB_KEY, lang);
        }

        function switchTab(lang) {
            if (lang === 'libs' || lang === 'help') { activateTab(lang); return; }
            const file = getFileForLang(lang);
            if (file) openFile(file.id);
            else activateTab(lang);
        }

        
        tabButtons.forEach(function(b) {
            b.addEventListener('click', function() { switchTab(b.dataset.tab); });
        });

        // ==========================================
        //  Libraries
        // ==========================================
        function loadLibraries() {
            try {
                const raw = storageGet(LIBS_KEY);
                if (!raw) return [];
                const arr = JSON.parse(raw);
                if (!Array.isArray(arr)) return [];

                const seenIds = new Set();
                return arr.filter(function(lib) {
                    return lib && typeof lib === 'object' &&
                        typeof lib.name === 'string' &&
                        typeof lib.code === 'string' &&
                        (lib.type === 'css' || lib.type === 'js');
                }).map(function(lib) {
                    let id = typeof lib.id === 'string' && lib.id.trim()
                        ? lib.id.trim().slice(0, 100) : makeLibId();
                    if (seenIds.has(id)) id = makeLibId();
                    seenIds.add(id);
                    return {
                        id: id,
                        name: lib.name.trim().slice(0, 100) || 'Unnamed library',
                        type: lib.type,
                        code: lib.code,
                        enabled: lib.enabled === true
                    };
                });
            } catch (e) { return []; }
        }
        function saveLibraries() {
            try {
                return storageSet(LIBS_KEY, JSON.stringify(libraries));
            } catch (e) {
                return false;
            }
        }
        function makeLibId() { return 'lib_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8); }

        function renderLibraries() {
            const list = document.getElementById('libList');
            const badge = document.getElementById('libCountBadge');
            if (!libraries.length) {
                list.innerHTML = '<div class="lib-empty">No libraries have been added yet.<br><small>Choose one from the preset list above or paste the code manually.</small></div>';
                badge.textContent = '';
                return;
            }
            const enabled = libraries.filter(function(l) { return l.enabled; }).length;
            badge.textContent = '(' + enabled + ' enabled of ' + libraries.length + ')';
            list.innerHTML = libraries.map(function(lib) {
                return '<div class="lib-item' + (lib.enabled ? '' : ' disabled') + '" data-id="' + escHtml(lib.id) + '">' +
                    '<input type="checkbox" ' + (lib.enabled ? 'checked' : '') + ' data-action="toggle">' +
                    '<span class="lib-item-name">' + escHtml(lib.name) + '</span>' +
                    '<span class="lib-item-type ' + escHtml(lib.type) + '">' + (lib.type === 'css' ? 'CSS' : 'JS') + '</span>' +
                    '<button type="button" class="lib-item-del" data-action="delete" title="Delete">🗑</button>' +
                '</div>';
            }).join('');
        }

        function renderPresets() {
            const grid = document.getElementById('libPresetsGrid');
            const search = (document.getElementById('libPresetSearch').value || '').trim().toLowerCase();
            const type = document.getElementById('libPresetTypeFilter').value;
            const filtered = PRESETS.map(function(p, i) { return { preset: p, index: i }; }).filter(function(item) {
                const p = item.preset;
                const matchesText = !search || (p.name + ' ' + p.desc).toLowerCase().includes(search);
                return matchesText && (type === 'all' || p.type === type);
            });
            document.getElementById('libPresetCount').textContent = filtered.length + ' of ' + PRESETS.length + ' libraries';
            if (!filtered.length) {
                grid.innerHTML = '<div class="lib-empty">No libraries match this search. Try another word or choose “All libraries”.</div>';
                return;
            }
            grid.innerHTML = filtered.map(function(item) {
                const p = item.preset;
                return '<button type="button" class="lib-preset" data-preset-idx="' + item.index + '" data-tooltip="' + escHtml(p.desc) + '">' +
                    '<span class="lib-preset-name">' + escHtml(p.name) + '</span>' +
                    '<span class="lib-preset-desc">' + escHtml(p.desc) + '</span>' +
                    '<span class="lib-preset-type ' + p.type + '">' + p.type.toUpperCase() + '</span>' +
                '</button>';
            }).join('');
        }

        document.getElementById('libPresetSearch').addEventListener('input', renderPresets);
        document.getElementById('libPresetTypeFilter').addEventListener('change', renderPresets);

        document.getElementById('helpPanel').addEventListener('click', function(e) {
            const button = e.target.closest('[data-help-tab]');
            if (button) activateTab(button.dataset.helpTab);
        });

        document.getElementById('helpPanel').addEventListener('click', function(e) {
            const button = e.target.closest('[data-help-language]');
            if (!button) return;
            const language = button.dataset.helpLanguage;
            const englishGuide = document.getElementById('helpEnglish');
            const persianGuide = document.getElementById('helpPersian');
            const isPersian = language === 'fa';
            englishGuide.hidden = isPersian;
            persianGuide.hidden = !isPersian;
            document.querySelectorAll('[data-help-language]').forEach(function(toggle) {
                const selected = toggle.dataset.helpLanguage === language;
                toggle.classList.toggle('active', selected);
                toggle.setAttribute('aria-pressed', String(selected));
            });
        });

        document.getElementById('libPresetsGrid').addEventListener('click', async function(e) {
            const btn = e.target.closest('.lib-preset');
            if (!btn) return;
            const preset = PRESETS[+btn.dataset.presetIdx];
            if (!preset) return;

            const nameIn = document.getElementById('libName');
            const typeIn = document.getElementById('libType');
            const codeIn = document.getElementById('libCode');

            // A newer choice cancels the previous request so its response cannot
            // overwrite the library currently selected by the user.
            if (libraryDownloadController) libraryDownloadController.abort();
            const requestId = ++libraryDownloadRequest;
            const ctrl = new AbortController();
            libraryDownloadController = ctrl;

            nameIn.value = preset.name;
            typeIn.value = preset.type;
            codeIn.value = '';
            codeIn.placeholder = 'Downloading from CDN...';
            showToast('⏳ Attempting to download ' + preset.name + ' from CDN...', 'info');

            const timeoutId = setTimeout(function() { ctrl.abort(); }, 8000);
            try {
                const res = await fetch(preset.cdn, { signal: ctrl.signal });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                const code = await res.text();
                if (requestId !== libraryDownloadRequest) return;
                if (code && code.length > 10) {
                    codeIn.value = code;
                    codeIn.placeholder = '';
                    showToast('✅ Code downloaded (' + Math.round(code.length / 1024) + ' KB)', 'success');
                } else {
                    throw new Error('Empty response');
                }
            } catch (err) {
                if (requestId !== libraryDownloadRequest) return;
                codeIn.placeholder = '⚠ Automatic download failed. Paste the code manually.';
                showToast('⚠ Offline or CDN unavailable', 'error');
            } finally {
                clearTimeout(timeoutId);
                if (libraryDownloadController === ctrl) libraryDownloadController = null;
            }
            if (requestId === libraryDownloadRequest) codeIn.focus();
        });

        function addLibrary() {
            const nameIn = document.getElementById('libName');
            const typeIn = document.getElementById('libType');
            const codeIn = document.getElementById('libCode');
            const name = nameIn.value.trim();
            const type = typeIn.value;
            const code = codeIn.value;

            if (!name) { showToast('❌ Enter a library name', 'error'); nameIn.focus(); return; }
            if (!code.trim()) { showToast('❌ Enter library code', 'error'); codeIn.focus(); return; }

            libraries.unshift({ id: makeLibId(), name: name, type: type, code: code, enabled: true });
            if (!saveLibraries()) {
                libraries.shift();
                showToast('❌ Library could not be saved. Check available browser storage.', 'error');
                return;
            }
            renderLibraries();
            nameIn.value = '';
            codeIn.value = '';
            codeIn.placeholder = 'Paste library code here...';
            nameIn.focus();
            updatePreviewNow();
            showToast('✅ Library “' + name + '” added', 'info');
        }

        function toggleLibrary(id, enabled) {
            const lib = libraries.find(function(l) { return l.id === id; });
            if (!lib) return;
            const previousEnabled = lib.enabled;
            lib.enabled = !!enabled;
            if (!saveLibraries()) {
                lib.enabled = previousEnabled;
                renderLibraries();
                showToast('❌ Library changes could not be saved. Check available browser storage.', 'error');
                return;
            }
            renderLibraries();
            updatePreviewNow();
        }
        function deleteLibrary(id) {
            const idx = libraries.findIndex(function(l) { return l.id === id; });
            if (idx === -1) return;
            const removed = libraries[idx];
            const name = removed.name;
            libraries.splice(idx, 1);
            if (!saveLibraries()) {
                libraries.splice(idx, 0, removed);
                renderLibraries();
                showToast('❌ Library could not be deleted. Check available browser storage.', 'error');
                return;
            }
            renderLibraries();
            updatePreviewNow();
            showToast('🗑 “' + name + '” deleted', 'info');
        }

        document.getElementById('libList').addEventListener('click', function(e) {
            const item = e.target.closest('.lib-item');
            if (!item) return;
            if (e.target.matches('[data-action="delete"]')) deleteLibrary(item.dataset.id);
        });
        document.getElementById('libList').addEventListener('change', function(e) {
            const item = e.target.closest('.lib-item');
            if (!item) return;
            if (e.target.matches('[data-action="toggle"]')) toggleLibrary(item.dataset.id, e.target.checked);
        });
        document.getElementById('libAddBtn').addEventListener('click', addLibrary);
        document.getElementById('libName').addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { e.preventDefault(); document.getElementById('libCode').focus(); }
        });

        // ==========================================
        //  Highlight
        // ==========================================
        function esc(text) {
            return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        function span(cls, text) { return '<span class="' + cls + '">' + esc(text) + '</span>'; }
        function tokenize(raw, re, classify) {
            let out = '', last = 0, m;
            re.lastIndex = 0;
            while ((m = re.exec(raw)) !== null) {
                if (m[0] === '') { re.lastIndex++; continue; }
                out += esc(raw.slice(last, m.index));
                const cls = classify(m);
                out += cls ? span(cls, m[0]) : esc(m[0]);
                last = re.lastIndex;
            }
            return out + esc(raw.slice(last));
        }
        function highlightAttrs(text) {
            return tokenize(text, /("[^"]*"?|'[^']*'?)|([^\s"'=\/>]+)(?=\s*=)/g,
                m => m[1] ? 'hl-string' : 'hl-attr');
        }
        function highlightHTML(raw) {
            const re = /(\x3C!--[\s\S]*?(?:-->|$))|(<!DOCTYPE[^>]*>?)|(<\/?[a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>])*)(>|$)/gi;
            let out = '', last = 0, m;
            while ((m = re.exec(raw)) !== null) {
                if (m[0] === '') { re.lastIndex++; continue; }
                out += esc(raw.slice(last, m.index));
                if (m[1]) out += span('hl-comment', m[1]);
                else if (m[2]) out += span('hl-doctype', m[2]);
                else {
                    out += span('hl-tag', m[3]);
                    out += highlightAttrs(m[4]);
                    if (m[5]) out += span('hl-tag', m[5]);
                }
                last = re.lastIndex;
            }
            return out + esc(raw.slice(last));
        }
        function highlightCSS(raw) {
            const re = new RegExp(
                '(\\/\\*[\\s\\S]*?(?:\\*\\/|$))' +
                '|("(?:\\\\.|[^"\\\\\\n])*"?|\'(?:\\\\.|[^\'\\\\\\n])*\'?)' +
                '|(@[\\w-]+)' +
                '|(#[0-9a-fA-F]{3,8}\\b)' +
                '|(-?\\d*\\.?\\d+(?:px|em|rem|%|vh|vw|s|ms|deg|fr)?)' +
                '|([\\w-]+)(?=\\s*:\\s*[^;{}]*[;}])',
                'g'
            );
            return tokenize(raw, re, m => {
                if (m[1]) return 'hl-comment';
                if (m[2]) return 'hl-string';
                if (m[3]) return 'hl-tag';
                if (m[4]) return 'hl-num';
                if (m[5]) {
                    const previous = raw[m.index - 1];
                    if (previous && /[\\w-]/.test(previous)) return '';
                    return 'hl-num';
                }
                if (m[6]) return 'hl-attr';
                return '';
            });
        }
        const JS_KEYWORDS = 'const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|import|export|from|default|try|catch|finally|throw|async|await|typeof|instanceof|in|of|delete|this|super|yield';
        function highlightJS(raw) {
            const re = new RegExp(
                '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?(?:\\*\\/|$))' +
                '|("(?:\\\\.|[^"\\\\\\n])*"?|\'(?:\\\\.|[^\'\\\\\\n])*\'?|`(?:\\\\[\\s\\S]|[^`\\\\])*`?)' +
                '|\\b(' + JS_KEYWORDS + ')\\b' +
                '|\\b(true|false|null|undefined|NaN|Infinity)\\b' +
                '|(\\d+\\.?\\d*\\b)' +
                '|\\b(document|window|console|alert|setTimeout|setInterval|Math|JSON|Array|Object|String|Number|Promise|fetch)\\b',
                'g'
            );
            return tokenize(raw, re, m => {
                if (m[1]) return 'hl-comment';
                if (m[2]) return 'hl-string';
                if (m[3]) return 'hl-tag';
                if (m[4]) return 'hl-num';
                if (m[5]) {
                    const previous = raw[m.index - 1];
                    if (previous && /[\\w$.]/.test(previous)) return '';
                    return 'hl-num';
                }
                if (m[6]) return 'hl-doctype';
                return '';
            });
        }
        const HIGHLIGHTERS = { html: highlightHTML, css: highlightCSS, js: highlightJS };


        // انتقال محافظه‌کارانه CSS و JavaScript هنگام Paste در تب HTML
        const HTML_PASTE_VOID_TAGS = new Set([
            'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'
        ]);
        const HTML_PASTE_RAW_TEXT_TAGS = new Set([
            'textarea','title','xmp','iframe','noembed','noframes','noscript','plaintext'
        ]);

        function findPasteTagEnd(source, start) {
            let quote = '';
            for (let i = start + 1; i < source.length; i++) {
                const ch = source[i];
                if (quote) { if (ch === quote) quote = ''; }
                else if (ch === '"' || ch === "'") quote = ch;
                else if (ch === '>') return i;
            }
            return -1;
        }

        function readPasteTagAttributes(tag) {
            const match = tag.match(/^<\s*[A-Za-z][\w:-]*/);
            if (!match) return null;
            const attrs = Object.create(null);
            let i = match[0].length;
            while (i < tag.length - 1) {
                while (i < tag.length - 1 && (/\s/.test(tag[i]) || tag[i] === '/')) i++;
                if (i >= tag.length - 1) break;
                const start = i;
                while (i < tag.length - 1 && !/[\s=/>]/.test(tag[i])) i++;
                if (start === i) { i++; continue; }
                const name = tag.slice(start, i).toLowerCase();
                while (i < tag.length - 1 && /\s/.test(tag[i])) i++;
                let value = '';
                if (tag[i] === '=') {
                    i++;
                    while (i < tag.length - 1 && /\s/.test(tag[i])) i++;
                    if (tag[i] === '"' || tag[i] === "'") {
                        const quote = tag[i++];
                        const valueStart = i;
                        while (i < tag.length - 1 && tag[i] !== quote) i++;
                        if (i >= tag.length - 1) return null;
                        value = tag.slice(valueStart, i++);
                    } else {
                        const valueStart = i;
                        while (i < tag.length - 1 && !/[\s>]/.test(tag[i])) i++;
                        value = tag.slice(valueStart, i);
                    }
                }
                if (!Object.prototype.hasOwnProperty.call(attrs, name)) attrs[name] = value;
            }
            return attrs;
        }

        function scanMarkupForPaste(source) {
            const text = String(source || '');
            const blocks = [], tags = [], stack = [];
            let templateDepth = 0, hasDoctype = false, i = 0;
            while (i < text.length) {
                const start = text.indexOf('<', i);
                if (start < 0) break;
                if (text.slice(start, start + 4) === '<!--') {
                    const end = text.indexOf('-->', start + 4);
                    if (end < 0) return { invalid: true, blocks: [], tags: [], hasDoctype: false };
                    i = end + 3; continue;
                }
                if (text.slice(start, start + 9).toLowerCase() === '<!doctype') {
                    const end = findPasteTagEnd(text, start);
                    if (end < 0) return { invalid: true, blocks: [], tags: [], hasDoctype: false };
                    hasDoctype = true; i = end + 1; continue;
                }
                if (text.slice(start, start + 9) === '<![CDATA[') {
                    const end = text.indexOf(']]>', start + 9);
                    if (end < 0) return { invalid: true, blocks: [], tags: [], hasDoctype: false };
                    i = end + 3; continue;
                }
                if (text.slice(start, start + 2) === '<!' || text.slice(start, start + 2) === '<?') {
                    const isProcessing = text.slice(start, start + 2) === '<?';
                    const end = isProcessing ? text.indexOf('?>', start + 2) : findPasteTagEnd(text, start);
                    if (end < 0) return { invalid: true, blocks: [], tags: [], hasDoctype: false };
                    i = end + (isProcessing ? 2 : 1); continue;
                }
                const header = text.slice(start).match(/^<\s*(\/?)\s*([A-Za-z][\w:-]*)/);
                if (!header) { i = start + 1; continue; }
                const end = findPasteTagEnd(text, start);
                if (end < 0) return { invalid: true, blocks: [], tags: [], hasDoctype: hasDoctype };
                const token = text.slice(start, end + 1);
                const name = header[2].toLowerCase();
                const closing = !!header[1];
                const selfClosing = /\/\s*>$/.test(token);
                tags.push({ name: name, closing: closing, start: start, end: end + 1 });
                if (closing) {
                    if (name === 'template') templateDepth = Math.max(0, templateDepth - 1);
                    let position = -1;
                    for (let j = stack.length - 1; j >= 0; j--) {
                        if (stack[j].name === name) { position = j; break; }
                    }
                    if (position >= 0) stack.length = position;
                    i = end + 1; continue;
                }
                const parentTags = stack.map(function(item) { return item.name; });
                const attrs = readPasteTagAttributes(token);
                if (!attrs) return { invalid: true, blocks: [], tags: tags, hasDoctype: hasDoctype };
                if (name === 'style' || name === 'script') {
                    const closePattern = new RegExp('</\\s*' + name + '\\s*>', 'ig');
                    closePattern.lastIndex = end + 1;
                    const close = closePattern.exec(text);
                    if (!close) return { invalid: true, blocks: [], tags: tags, hasDoctype: hasDoctype };
                    blocks.push({
                        name: name, start: start, openEnd: end + 1, contentStart: end + 1,
                        contentEnd: close.index, end: close.index + close[0].length,
                        content: text.slice(end + 1, close.index), attrs: attrs,
                        parentTags: parentTags, templateDepth: templateDepth
                    });
                    i = close.index + close[0].length; continue;
                }
                if (HTML_PASTE_RAW_TEXT_TAGS.has(name)) {
                    if (name === 'plaintext') break;
                    const closePattern = new RegExp('</\\s*' + name + '\\s*>','ig');
                    closePattern.lastIndex = end + 1;
                    const close = closePattern.exec(text);
                    if (!close) return { invalid: true, blocks: [], tags: tags, hasDoctype: hasDoctype };
                    i = close.index + close[0].length; continue;
                }
                if (name === 'template') templateDepth++;
                if (!HTML_PASTE_VOID_TAGS.has(name) && !selfClosing) stack.push({ name: name, start: start });
                i = end + 1;
            }
            return { invalid: false, blocks: blocks, tags: tags, hasDoctype: hasDoctype };
        }

        function normalizeCodeForComparison(code) {
            return String(code == null ? '' : code).replace(/\r\n?/g, '\n').trim();
        }

        function codeBlockAlreadyExists(existing, candidate) {
            const wanted = normalizeCodeForComparison(candidate);
            const haystack = normalizeCodeForComparison(existing);
            if (!wanted || !haystack) return false;
            let from = 0, index = haystack.indexOf(wanted, from);
            while (index >= 0) {
                const before = index === 0 || /\s/.test(haystack[index - 1]);
                const afterAt = index + wanted.length;
                const after = afterAt === haystack.length || /\s/.test(haystack[afterAt]);
                if (before && after) return true;
                from = index + 1;
                index = haystack.indexOf(wanted, from);
            }
            return false;
        }

        function appendUniqueCode(existing, chunks) {
            const current = String(existing == null ? '' : existing);
            const additions = [];
            chunks.forEach(function(chunk) {
                const code = String(chunk == null ? '' : chunk);
                if (!normalizeCodeForComparison(code) || codeBlockAlreadyExists(current, code)) return;
                if (additions.some(function(item) {
                    return normalizeCodeForComparison(item) === normalizeCodeForComparison(code);
                })) return;
                additions.push(code);
            });
            if (!additions.length) return current;
            if (!current.trim()) return current + additions.join('\n\n');
            return current + (/\n$/.test(current) ? '\n' : '\n\n') + additions.join('\n\n');
        }

        function looksLikeStandaloneCss(source) {
            const text = String(source || '').trim();
            if (!text || /<\/?\s*[a-z][^>]*>/i.test(text)) return false;
            let state = 'code', quote = '', escaped = false, depth = 0;
            let segmentStart = 0, hasSelector = false, hasDeclaration = false;
            for (let i = 0; i < text.length; i++) {
                const ch = text[i], next = text[i + 1] || '';
                if (state === 'comment') { if (ch === '*' && next === '/') { state = 'code'; i++; } continue; }
                if (state === 'string') {
                    if (escaped) { escaped = false; continue; }
                    if (ch === '\\') { escaped = true; continue; }
                    if (ch === quote) state = 'code';
                    continue;
                }
                if (ch === '/' && next === '*') { state = 'comment'; i++; continue; }
                if (ch === '"' || ch === "'") { state = 'string'; quote = ch; continue; }
                if (ch === '{') {
                    if (!depth) {
                        const selector = text.slice(segmentStart, i).trim();
                        if (selector && (selector[0] === '@' || /[.#*:[\]a-zA-Z]/.test(selector))) hasSelector = true;
                    }
                    depth++;
                } else if (ch === '}') {
                    if (--depth < 0) return false;
                    if (!depth) segmentStart = i + 1;
                } else if (ch === ':' && depth) hasDeclaration = true;
            }
            return depth === 0 && state !== 'comment' && state !== 'string' && hasSelector && hasDeclaration;
        }

        function looksLikeStandaloneJavaScript(source) {
            const text = String(source || '').trim();
            if (!text || /<\/?\s*[a-z][^>]*>/i.test(text)) return false;
            const syntax = /(?:=>|===|!==|==|!=|\+\+|--|\b(?:const|let|var|function|class|return|if|for|while|switch|throw|try|catch|finally|new|async|await|import|export)\b)/;
            const call = /\b(?:console\s*\.\s*(?:log|warn|error|info|debug)|alert|confirm|prompt|fetch|setTimeout|setInterval|requestAnimationFrame|addEventListener|document\s*\.|window\s*\.)\s*[\.(]/;
            return (syntax.test(text) && /[=({;]/.test(text)) || call.test(text);
        }

        function getPasteStyleCode(block, scan) {
            if (block.templateDepth || block.parentTags.includes('template') || block.parentTags.includes('noscript')) return null;
            const attrs = block.attrs;
            if (Object.keys(attrs).some(function(name) { return name !== 'type' && name !== 'media'; })) return null;
            const type = String(attrs.type || '').split(';')[0].trim().toLowerCase();
            if (type && type !== 'text/css') return null;
            if (!block.content.trim()) return null;
            const names = scan.tags.filter(function(tag) { return !tag.closing; }).map(function(tag) { return tag.name; });
            const structured = scan.hasDoctype || names.some(function(name) { return ['html','head','body'].includes(name); });
            const hasBody = names.includes('body');
            if (hasBody && !block.parentTags.includes('head')) return null;
            if (structured && !block.parentTags.includes('head')) {
                const bodyTag = scan.tags.find(function(tag) { return !tag.closing && tag.name === 'body'; });
                const beforeBody = !bodyTag || block.start < bodyTag.start;
                if (hasBody || !beforeBody || block.parentTags.includes('body')) return null;
            }
            if (Object.prototype.hasOwnProperty.call(attrs, 'media')) {
                const media = String(attrs.media || '').trim();
                if (!media || /[{};]/.test(media)) return null;
                return '@media ' + media + ' {\n' + block.content + '\n}';
            }
            return block.content;
        }

        function getPasteScriptCode(block) {
            if (block.templateDepth || block.parentTags.includes('template') || block.parentTags.includes('noscript') ||
                Object.prototype.hasOwnProperty.call(block.attrs, 'src')) return null;
            if (Object.keys(block.attrs).some(function(name) { return name !== 'type'; })) return null;
            const type = String(block.attrs.type || '').split(';')[0].trim().toLowerCase();
            if (!['','text/javascript','application/javascript','text/ecmascript','application/ecmascript'].includes(type)) return null;
            if (!block.content.trim() || block.parentTags.includes('head')) return null;
            return block.content;
        }

        function canMovePasteScriptToEnd(block, scan, source, laterBlocks) {
            if (block.parentTags.some(function(name) { return !['html','body'].includes(name); })) return false;
            const names = scan.tags.filter(function(tag) { return !tag.closing; }).map(function(tag) { return tag.name; });
            const hasHtml = names.includes('html'), hasHead = names.includes('head'), hasBody = names.includes('body');
            if (block.parentTags.includes('head')) return false;
            if (hasBody && !block.parentTags.includes('body')) return false;
            if ((hasHtml || hasHead) && !block.parentTags.includes('body')) return false;
            let tail = source.slice(block.end);
            laterBlocks.slice().sort(function(a,b) { return b.start-a.start; }).forEach(function(other) {
                const a = other.start - block.end, b = other.end - block.end;
                if (a >= 0 && b >= a && b <= tail.length) tail = tail.slice(0,a) + tail.slice(b);
            });
            tail = tail.replace(/<!--[\s\S]*?-->/g, '').replace(/<\/\s*(?:body|html)\s*>/gi, '');
            return !tail.trim();
        }

        function extractPasteAssets(source) {
            const text = String(source == null ? '' : source);
            if (!text.trim()) return null;
            try {
                const scan = scanMarkupForPaste(text);
                if (scan.invalid) return null;
                const names = scan.tags.filter(function(tag) { return !tag.closing; }).map(function(tag) { return tag.name; });
                const structured = scan.hasDoctype || names.some(function(name) { return ['html','head','body','title'].includes(name); });
                const cssItems = [], scriptItems = [];
                scan.blocks.forEach(function(block) {
                    if (block.name === 'style') {
                        const code = getPasteStyleCode(block, scan);
                        if (code) cssItems.push({block:block, code:code});
                    } else {
                        const code = getPasteScriptCode(block);
                        if (code) scriptItems.push({block:block, code:code});
                    }
                });
                const movableScripts = scriptItems.filter(function(item) {
                    const later = scan.blocks.filter(function(other) {
                        return other.start >= item.block.end && (
                            (other.name === 'style' && !!getPasteStyleCode(other, scan)) ||
                            (other.name === 'script' && !!getPasteScriptCode(other))
                        );
                    });
                    return canMovePasteScriptToEnd(item.block, scan, text, later);
                });
                const removable = cssItems.map(function(item) { return item.block; }).concat(
                    movableScripts.map(function(item) { return item.block; })
                );
                let html = text;
                removable.slice().sort(function(a,b) { return b.start-a.start; }).forEach(function(block) {
                    html = html.slice(0,block.start) + html.slice(block.end);
                });
                const unique = function(items) {
                    const seen = new Set(), result = [];
                    items.forEach(function(code) {
                        const normalized = normalizeCodeForComparison(code);
                        if (normalized && !seen.has(normalized)) { seen.add(normalized); result.push(code); }
                    });
                    return result;
                };
                let css = unique(cssItems.filter(function(item) { return removable.includes(item.block); }).map(function(item) { return item.code; }));
                let js = unique(movableScripts.map(function(item) { return item.code; }));
                if (!css.length && !js.length && !structured && !scan.tags.length) {
                    if (looksLikeStandaloneCss(text)) css = [text];
                    else if (looksLikeStandaloneJavaScript(text)) js = [text];
                    if (css.length || js.length) html = '';
                }
                if (!css.length && !js.length) return null;
                return { html:html, css:css, js:js };
            } catch (error) {
                return null;
            }
        }

        function handleHtmlEditorPaste(event) {
            if (!event || event.defaultPrevented || !event.clipboardData) return;
            const pasted = event.clipboardData.getData('text/plain');
            if (!pasted) return;
            const extracted = extractPasteAssets(pasted);
            if (!extracted || (!extracted.css.length && !extracted.js.length)) return;
            const htmlEditor = editors.html, cssEditor = editors.css, jsEditor = editors.js;
            if (!htmlEditor || !cssEditor || !jsEditor) return;
            const htmlBefore = htmlEditor.ta.value, cssBefore = cssEditor.ta.value, jsBefore = jsEditor.ta.value;
            const start = htmlEditor.ta.selectionStart, end = htmlEditor.ta.selectionEnd;
            const htmlAfter = htmlBefore.slice(0,start) + extracted.html + htmlBefore.slice(end);
            const cssAfter = appendUniqueCode(cssBefore, extracted.css);
            const jsAfter = appendUniqueCode(jsBefore, extracted.js);
            event.preventDefault();
            try {
                if (htmlAfter !== htmlBefore) htmlEditor.ta.setRangeText(extracted.html,start,end,'end');
                if (cssAfter !== cssBefore) cssEditor.ta.value = cssAfter;
                if (jsAfter !== jsBefore) jsEditor.ta.value = jsAfter;
                if (htmlAfter !== htmlBefore) htmlEditor.ta.dispatchEvent(new Event('input',{bubbles:true}));
                if (cssAfter !== cssBefore) cssEditor.ta.dispatchEvent(new Event('input',{bubbles:true}));
                if (jsAfter !== jsBefore) jsEditor.ta.dispatchEvent(new Event('input',{bubbles:true}));
                if (htmlAfter !== htmlBefore) {
                    const caret = start + extracted.html.length;
                    htmlEditor.ta.setSelectionRange(caret,caret);
                }
                const moved = [];
                if (extracted.css.length) moved.push('CSS');
                if (extracted.js.length) moved.push('JavaScript');
                showToast('Paste processed. Extracted ' + moved.join(' and ') + '; existing tab code was preserved.','success');
            } catch (error) {
                htmlEditor.ta.value = htmlBefore;
                cssEditor.ta.value = cssBefore;
                jsEditor.ta.value = jsBefore;
                [htmlEditor,cssEditor,jsEditor].forEach(function(editor) {
                    editor.refresh();
                    const file = getFileForLang(editor.lang);
                    if (file) file.content = editor.ta.value;
                });
                showToast('Paste processing failed. The previous editor contents were restored.','error');
            }
        }

        function containsDocumentStructure(markup) {
            const scan = scanMarkupForPaste(markup);
            if (scan.invalid) return /<!doctype\s+html\b|<\s*\/?\s*(?:html|head|body|title)\b/i.test(String(markup || ''));
            return scan.hasDoctype || scan.tags.some(function(tag) {
                return !tag.closing && ['html','head','body','title'].includes(tag.name);
            });
        }

        function getLocalAssetFilename(url) {
            const value = String(url || '').trim();
            if (!value || /[?#]/.test(value) || /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value)) return null;
            let path = value.replace(/\\/g,'/');
            if (path.startsWith('/')) return null;
            path = path.replace(/^(?:\.\/)+/,'');
            if (!path || path.includes('/')) return null;
            try { return decodeURIComponent(path).toLowerCase(); } catch (error) { return null; }
        }

        function isClassicJavaScriptType(value) {
            const type = String(value || '').split(';')[0].trim().toLowerCase();
            return !type || ['text/javascript','application/javascript','text/ecmascript','application/ecmascript'].includes(type);
        }

        function canInlineBundledScript(node, file) {
            if (!String(file.content || '').trim()) return false;
            const attrs = Array.from(node.attributes).map(function(attr) { return attr.name.toLowerCase(); });
            if (attrs.some(function(name) { return !['src','type'].includes(name); })) return false;
            if (!isClassicJavaScriptType(node.getAttribute('type'))) return false;
            if (/\bdocument\s*\.\s*currentScript\b/.test(file.content)) return false;
            return true;
        }

        function canInlineBundledStylesheet(node, file) {
            if (!String(file.content || '').trim()) return false;
            const attrs = Array.from(node.attributes).map(function(attr) { return attr.name.toLowerCase(); });
            if (attrs.some(function(name) { return !['href','rel','media','title','type'].includes(name); })) return false;
            const rel = String(node.getAttribute('rel') || '').trim().toLowerCase().split(/\s+/).filter(Boolean);
            const type = String(node.getAttribute('type') || '').split(';')[0].trim().toLowerCase();
            return rel.length === 1 && rel[0] === 'stylesheet' && (!type || type === 'text/css');
        }

        function comparableInlineAssetCode(markup, type) {
            const doc = new DOMParser().parseFromString(String(markup || ''),'text/html');
            const tag = type === 'css' ? 'style' : 'script';
            return Array.from(doc.querySelectorAll(tag)).filter(function(node) {
                const contentType = String(node.getAttribute('type') || '').split(';')[0].trim().toLowerCase();
                if (type === 'css') return !contentType || contentType === 'text/css';
                return !node.hasAttribute('src') && isClassicJavaScriptType(contentType);
            }).map(function(node) { return normalizeCodeForComparison(node.textContent); }).filter(Boolean);
        }

        function fileStillReferenced(markup, type, filename) {
            const doc = new DOMParser().parseFromString(String(markup || ''),'text/html');
            const nodes = type === 'css' ? doc.querySelectorAll('link[rel~="stylesheet"][href]') : doc.querySelectorAll('script[src]');
            return Array.from(nodes).some(function(node) {
                return getLocalAssetFilename(node.getAttribute(type === 'css' ? 'href' : 'src')) === String(filename || '').toLowerCase();
            });
        }

        function buildUniqueAssetCode(markup, type, files, libs) {
            const seen = new Set(comparableInlineAssetCode(markup,type));
            const parts = [];
            const items = (libs || []).map(function(lib) {
                return {name:lib.name,content:lib.code,isLibrary:true};
            }).concat((files || []).map(function(file) {
                return {name:file.name,content:file.content,filename:file.name,isLibrary:false};
            }));
            items.forEach(function(item) {
                const content = String(item.content || ''), normalized = normalizeCodeForComparison(content);
                if (!normalized || seen.has(normalized)) return;
                if (!item.isLibrary && fileStillReferenced(markup,type,item.filename)) return;
                seen.add(normalized);
                parts.push('/* === ' + safeCommentLabel(item.name) + (item.isLibrary ? ' (lib)' : '') + ' === */\n' + content);
            });
            const closing = type === 'css' ? '<\\/style' : '<\\/script';
            return parts.join('\n\n').replace(type === 'css' ? /<\/style/gi : /<\/script/gi,closing);
        }

        function getLocalAssetDependencyWarnings(markup, ignore) {
            const doc = new DOMParser().parseFromString(String(markup || ''),'text/html');
            const ignored = new Set(ignore || []);
            const found = [];
            doc.querySelectorAll('script[src], link[rel~="stylesheet"][href]').forEach(function(node) {
                const ref = String(node.getAttribute(node.tagName.toLowerCase() === 'script' ? 'src' : 'href') || '').trim();
                if (!ref || /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(ref) || ignored.has(ref)) return;
                if (!found.includes(ref)) found.push(ref);
            });
            return found;
        }

        // Remove local asset references when the same files are embedded below.
        // Keep remote URLs and local files that are not part of this project bundle.
        // تعبیه فایل محلی فقط پس از یافتن محتوای متناظر و در محل اصلی تگ
        function stripBundledAssetReferences(markup, cssFiles, jsFiles, preserveDocument) {
            const source = String(markup || '');
            const cssByName = new Map(cssFiles.filter(function(file) { return String(file.content || '').trim(); })
                .map(function(file) { return [String(file.name || '').toLowerCase(),file]; }));
            const jsByName = new Map(jsFiles.filter(function(file) { return String(file.content || '').trim(); })
                .map(function(file) { return [String(file.name || '').toLowerCase(),file]; }));
            const template = preserveDocument ? null : document.createElement('template');
            const parsed = preserveDocument ? new DOMParser().parseFromString(source,'text/html') : null;
            const root = preserveDocument ? parsed : template.content;
            if (!preserveDocument) template.innerHTML = source;
            const owner = preserveDocument ? parsed : document;
            root.querySelectorAll('script[src], link[rel~="stylesheet"][href]').forEach(function(node) {
                const script = node.tagName.toLowerCase() === 'script';
                const filename = getLocalAssetFilename(node.getAttribute(script ? 'src' : 'href'));
                if (!filename) return;
                const file = (script ? jsByName : cssByName).get(filename);
                if (!file) return;
                if (script) {
                    if (!canInlineBundledScript(node,file)) return;
                    const replacement = owner.createElement('script');
                    if (node.hasAttribute('type')) replacement.setAttribute('type',node.getAttribute('type'));
                    replacement.textContent = String(file.content).replace(/<\/script/gi,'<\\/script');
                    node.replaceWith(replacement);
                } else {
                    if (!canInlineBundledStylesheet(node,file)) return;
                    const replacement = owner.createElement('style');
                    ['type','media','title'].forEach(function(name) {
                        if (node.hasAttribute(name)) replacement.setAttribute(name,node.getAttribute(name));
                    });
                    replacement.textContent = String(file.content).replace(/<\/style/gi,'<\\/style');
                    node.replaceWith(replacement);
                }
            });
            if (!preserveDocument) return template.innerHTML;
            return '<!DOCTYPE html>\n' + parsed.documentElement.outerHTML;
        }

        // Keep user-controlled file and library names inside generated comments.
        function safeCommentLabel(value) {
            return String(value == null ? '' : value)
                .replace(/\*\//g, '* /')
                .replace(/[\r\n\u2028\u2029]+/g, ' ')
                .trim();
        }

        // ==========================================
        //  Build document
        // ==========================================
        function normalizeExistingDocument(markup, fallbackTitle) {
            const parsed = new DOMParser().parseFromString(String(markup || ''),'text/html');
            const titles = Array.from(parsed.head.querySelectorAll('title'));
            if (!titles.length) {
                const title = parsed.createElement('title');
                title.textContent = fallbackTitle;
                parsed.head.insertBefore(title,parsed.head.firstChild);
            } else {
                if (!String(titles[0].textContent || '').trim()) titles[0].textContent = fallbackTitle;
                titles.slice(1).forEach(function(extra) {
                    const preserved = safeCommentLabel(extra.textContent).replace(/--/g,'- -');
                    extra.replaceWith(parsed.createComment('Additional title preserved as comment: ' + preserved));
                });
            }
            return '<!DOCTYPE html>\n' + parsed.documentElement.outerHTML;
        }

        function buildDocument(forExport, externalAssetBaseName) {
            const htmlFiles = project.files.filter(function(file) { return file.type === 'html'; });
            const cssFiles = project.files.filter(function(file) { return file.type === 'css'; });
            const jsFiles = project.files.filter(function(file) { return file.type === 'js'; });
            const sourceHtml = htmlFiles.map(function(file) { return file.content; }).join('\n');
            const fullDocument = containsDocumentStructure(sourceHtml);
            let html = stripBundledAssetReferences(sourceHtml,cssFiles,jsFiles,fullDocument);
            const enabledLibs = libraries.filter(function(lib) { return lib.enabled; });
            const libCss = enabledLibs.filter(function(lib) { return lib.type === 'css'; });
            const libJs = enabledLibs.filter(function(lib) { return lib.type === 'js'; });
            const css = buildUniqueAssetCode(html,'css',cssFiles,libCss);
            const js = buildUniqueAssetCode(html,'js',jsFiles,libJs);
            const errorHook = forExport ? '' : [
                '<script>',
                'window.addEventListener("error",function(e){ parent.postMessage({editorError:true,message:String(e.message)},"*"); });',
                'window.addEventListener("unhandledrejection",function(e){ var r=e.reason; parent.postMessage({editorError:true,message:"Promise: "+String(r&&r.message?r.message:r)},"*"); });',
                'window.addEventListener("keydown",function(e){ if((e.ctrlKey||e.metaKey)&&String(e.key).toLowerCase()==="s"){ e.preventDefault(); parent.postMessage({editorSave:true},"*"); } });',
                '<\/script>'
            ].join('\n');
            const safeTitle = String(project.documentTitle || 'My Page')
                .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
            let output;
            if (fullDocument) {
                html = normalizeExistingDocument(html,project.documentTitle || 'My Page');
                const headParts = [];
                if (!/<meta\b[^>]*\bcharset\s*=/i.test(html)) headParts.push('<meta charset="UTF-8">');
                if (!/<meta\b[^>]*\bname\s*=\s*["']viewport["']/i.test(html)) {
                    headParts.push('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
                }
                const extraHead = stripBundledAssetReferences(project.headExtras || '',cssFiles,jsFiles,false);
                if (extraHead.trim()) headParts.push(extraHead);
                if (errorHook) headParts.push(errorHook);
                if (externalAssetBaseName) {
                    if (css.trim()) headParts.push('<link rel="stylesheet" href="' + escHtml(externalAssetBaseName) + '.css">');
                } else if (css.trim()) headParts.push('<style>\n' + css + '\n</style>');
                output = html.replace(/<\/head\s*>/i,headParts.filter(Boolean).join('\n') + '\n</head>');
                const bodyParts = [];
                if (externalAssetBaseName) {
                    if (js.trim()) bodyParts.push('<script src="' + escHtml(externalAssetBaseName) + '.js"><\/script>');
                } else if (js.trim()) bodyParts.push('<script>\n' + js + '\n<\/script>');
                output = output.replace(/<\/body\s*>/i,bodyParts.join('\n') + '\n</body>');
            } else {
                const headParts = [
                    '<meta charset="UTF-8">',
                    '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                    '<title>' + safeTitle + '</title>'
                ];
                const extraHead = stripBundledAssetReferences(project.headExtras || '',cssFiles,jsFiles,false);
                if (extraHead.trim()) headParts.push(extraHead);
                if (errorHook) headParts.push(errorHook);
                if (externalAssetBaseName) {
                    if (css.trim()) headParts.push('<link rel="stylesheet" href="' + escHtml(externalAssetBaseName) + '.css">');
                } else if (css.trim()) headParts.push('<style>\n' + css + '\n</style>');
                const bodyParts = [];
                if (externalAssetBaseName) {
                    if (js.trim()) bodyParts.push('<script src="' + escHtml(externalAssetBaseName) + '.js"><\/script>');
                } else if (js.trim()) bodyParts.push('<script>\n' + js + '\n<\/script>');
                output = '<!DOCTYPE html>\n<html lang="en" dir="ltr">\n<head>\n' + headParts.join('\n') +
                    '\n</head>\n<body>\n' + html + '\n' + bodyParts.join('\n') + '\n</body>\n</html>';
            }
            if (forExport) {
                const ignore = externalAssetBaseName ? [externalAssetBaseName + '.css',externalAssetBaseName + '.js'] : [];
                lastExportDependencyWarnings = getLocalAssetDependencyWarnings(output,ignore);
            }
            return output;
        }

        function updatePreviewNow() {
            clearTimeout(previewTimer);
            outputFrame.srcdoc = buildDocument(false);
        }
        function schedulePreview() {
            clearTimeout(previewTimer);
            previewTimer = setTimeout(updatePreviewNow, 300);
        }

        window.addEventListener('message', function (e) {
            if (e.source !== outputFrame.contentWindow || !e.data) return;
            if (e.data.editorError) showToast('JS error: ' + e.data.message, 'error');
            if (e.data.editorSave) saveCode();
        });

        // ==========================================
        //  Insert / Undo / Redo
        // ==========================================
        function insertText(ta, text) {
            ta.focus();
            let ok = false;
            try { ok = document.execCommand('insertText', false, text); } catch (e) { ok = false; }
            if (!ok) {
                ta.setRangeText(text, ta.selectionStart, ta.selectionEnd, 'end');
                ta.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }

        // Quick-insert toolbar: keep the active editor selection while a toolbar
        // button temporarily takes focus (especially on touch/mobile browsers).
        const symbolToolbar = document.getElementById('symbolToolbar');
        function renderSymbolToolbar(language) {
            if (!symbolToolbar) return;
            const header = symbolToolbar.closest('.page-symbol-header');
            const supportedLanguage = LANGS.includes(language);
            const labels = {
                html: { header: 'Popular HTML tags and elements', toolbar: 'Quick-insert HTML tags' },
                css: { header: 'Popular CSS properties and patterns', toolbar: 'Quick-insert CSS properties and patterns' },
                js: { header: 'Popular JavaScript snippets', toolbar: 'Quick-insert JavaScript snippets' }
            };
            if (header) {
                header.hidden = !supportedLanguage;
                if (supportedLanguage) header.setAttribute('aria-label', labels[language].header);
            }
            if (!supportedLanguage) return;
            symbolToolbar.setAttribute('aria-label', labels[language].toolbar);

            const data = window.EDITOR_INTELLISENSE_DATA || {};
            const items = data.symbols && data.symbols[language];
            if (!Array.isArray(items)) {
                symbolToolbar.replaceChildren();
                return;
            }
            symbolToolbar.dataset.language = language;
            symbolToolbar.innerHTML = items.map(function(item) {
                return '<button type="button" data-prefix="' + escHtml(item.prefix || '') +
                    '" data-suffix="' + escHtml(item.suffix || '') +
                    '" title="' + escHtml(item.description || item.label || 'Insert symbol') +
                    '" aria-label="' + escHtml(item.description || item.label || 'Insert symbol') +
                    '">' + escHtml(item.label || 'Symbol') + '</button>';
            }).join('');
        }

        if (symbolToolbar) {
            // Prevent mouse focus transfer where supported, but also retain a saved range
            // for browsers that still move focus when tapping a toolbar button.
            symbolToolbar.addEventListener('mousedown', function(e) {
                if (e.target.closest('button')) e.preventDefault();
            });
            symbolToolbar.addEventListener('click', function(e) {
                const button = e.target.closest('button[data-prefix]');
                if (!button || !LANGS.includes(activeTab) || !editors[activeTab]) return;

                const ta = editors[activeTab].ta;
                // Prefer the live caret/selection whenever the editor still owns focus.
                // The remembered range is only a fallback for browsers that move focus
                // to the toolbar before dispatching its click event.
                const liveSelection = document.activeElement === ta;
                const saved = liveSelection ? {
                    start: ta.selectionStart,
                    end: ta.selectionEnd,
                    direction: ta.selectionDirection || 'none'
                } : (symbolSelections[activeTab] || {
                    start: ta.selectionStart,
                    end: ta.selectionEnd,
                    direction: ta.selectionDirection || 'none'
                });
                const start = Math.max(0, Math.min(saved.start, ta.value.length));
                const end = Math.max(start, Math.min(saved.end, ta.value.length));
                const prefix = button.dataset.prefix || '';
                const suffix = button.dataset.suffix || '';
                const selected = ta.value.slice(start, end);
                const replacement = prefix + selected + suffix;

                ta.focus({ preventScroll: true });
                ta.setRangeText(replacement, start, end, 'select');
                const selectionStart = start + prefix.length;
                const selectionEnd = selectionStart + selected.length;
                if (selected) {
                    ta.setSelectionRange(selectionStart, selectionEnd, 'forward');
                } else {
                    // Place the caret inside paired symbols; line-comment has no suffix.
                    ta.setSelectionRange(selectionStart, selectionStart);
                }
                symbolSelections[activeTab] = {
                    start: ta.selectionStart,
                    end: ta.selectionEnd,
                    direction: ta.selectionDirection || 'none'
                };
                ta.dispatchEvent(new Event('input', { bubbles: true }));
                if (editors[activeTab].refresh) editors[activeTab].refresh();
                ta.focus({ preventScroll: true });
            });
        }

        renderSymbolToolbar(activeTab);

        function doUndo() {
            const ed = editors[activeTab];
            if (!ed) return;
            ed.ta.focus();
            try { document.execCommand('undo'); } catch (e) {}
            setTimeout(function() {
                ed.refresh();
                setDirty(true);
                schedulePreview();
            }, 0);
        }
        function doRedo() {
            const ed = editors[activeTab];
            if (!ed) return;
            ed.ta.focus();
            try { document.execCommand('redo'); } catch (e) {}
            setTimeout(function() {
                ed.refresh();
                setDirty(true);
                schedulePreview();
            }, 0);
        }

        // ==========================================
        //  Indent
        // ==========================================
        function lineStartAt(val, pos) { return pos > 0 ? val.lastIndexOf('\n', pos - 1) + 1 : 0; }
        function currentIndent(val, pos) {
            const ls = lineStartAt(val, pos);
            return val.substring(ls, pos).match(/^[ \t]*/)[0];
        }
        function indentSelection(ta, outdent) {
            const val   = ta.value;
            const start = ta.selectionStart;
            const end   = ta.selectionEnd;
            if (start === end && !outdent) { insertText(ta, '    '); return; }
            const effEnd     = (end > start && val.charAt(end - 1) === '\n') ? end - 1 : end;
            const blockStart = lineStartAt(val, start);
            let blockEnd = val.indexOf('\n', effEnd);
            if (blockEnd === -1) blockEnd = val.length;
            const block = val.slice(blockStart, blockEnd);
            const newBlock = block.split('\n').map(function(line) {
                if (!outdent) return '    ' + line;
                return line.replace(/^(?: {1,4}|\t)/, '');
            }).join('\n');
            if (newBlock === block) return;
            ta.setSelectionRange(blockStart, blockEnd);
            insertText(ta, newBlock);
            if (start === end) {
                const caret = Math.max(blockStart, start + (newBlock.length - block.length));
                ta.setSelectionRange(caret, caret);
            } else {
                ta.setSelectionRange(blockStart, blockStart + newBlock.length);
            }
        }
        function handleEnter(e, ta, lang) {
            const pos       = ta.selectionStart;
            const collapsed = ta.selectionStart === ta.selectionEnd;
            const val       = ta.value;
            const indent    = currentIndent(val, pos);
            const prev      = val.charAt(pos - 1);
            const next      = val.charAt(pos);
            const between = collapsed && (
                (lang !== 'html' && prev === '{' && next === '}') ||
                (lang === 'html' && prev === '>' && next === '<' && val.charAt(pos + 1) === '/')
            );
            if (between) {
                e.preventDefault();
                insertText(ta, '\n' + indent + '    \n' + indent);
                const caret = pos + 1 + indent.length + 4;
                ta.setSelectionRange(caret, caret);
            } else if (collapsed && lang !== 'html' && prev === '{') {
                e.preventDefault();
                insertText(ta, '\n' + indent + '    ');
            } else if (indent) {
                e.preventDefault();
                insertText(ta, '\n' + indent);
            }
        }

        // ==========================================
        //  IntelliSense
        // ==========================================
        const IntelliSense = (function() {
            const HTML_TAGS = [
                'a','abbr','address','area','article','aside','audio','b','base','bdi','bdo',
                'blockquote','body','br','button','canvas','caption','cite','code','col','data',
                'datalist','dd','del','details','dfn','dialog','div','dl','dt','em','embed',
                'fieldset','figcaption','figure','footer','form','h1','h2','h3','h4','h5','h6',
                'head','header','hgroup','hr','html','i','iframe','img','input','ins','kbd',
                'label','legend','li','link','main','map','mark','menu','meta','meter','nav',
                'noscript','object','ol','optgroup','option','output','p','param','picture','pre',
                'progress','q','rp','rt','ruby','s','samp','script','section','select','slot',
                'small','source','span','strong','style','sub','summary','sup','table','tbody',
                'td','template','textarea','tfoot','th','thead','time','title','tr','track','u',
                'ul','var','video','wbr'
            ];
            const CSS_PROPS = [
                'align-content','align-items','align-self','animation','animation-delay',
                'animation-direction','animation-duration','animation-fill-mode',
                'animation-iteration-count','animation-name','animation-play-state',
                'animation-timing-function','aspect-ratio','backdrop-filter','backface-visibility',
                'background','background-attachment','background-blend-mode','background-clip',
                'background-color','background-image','background-origin','background-position',
                'background-repeat','background-size','border','border-bottom','border-bottom-color',
                'border-bottom-left-radius','border-bottom-right-radius','border-bottom-style',
                'border-bottom-width','border-collapse','border-color','border-image','border-left',
                'border-left-color','border-left-style','border-left-width','border-radius',
                'border-right','border-right-color','border-right-style','border-right-width',
                'border-spacing','border-style','border-top','border-top-color','border-top-left-radius',
                'border-top-right-radius','border-top-style','border-top-width','border-width',
                'bottom','box-shadow','box-sizing','caret-color','clear','clip','clip-path','color',
                'column-count','column-gap','column-rule','column-width','columns','content','cursor',
                'direction','display','filter','flex','flex-basis','flex-direction','flex-flow',
                'flex-grow','flex-shrink','flex-wrap','float','font','font-family',
                'font-feature-settings','font-size','font-stretch','font-style','font-variant',
                'font-weight','gap','grid','grid-area','grid-auto-columns','grid-auto-flow',
                'grid-auto-rows','grid-column','grid-column-end','grid-column-gap','grid-column-start',
                'grid-gap','grid-row','grid-row-end','grid-row-gap','grid-row-start','grid-template',
                'grid-template-areas','grid-template-columns','grid-template-rows','height','inset',
                'justify-content','justify-items','justify-self','left','letter-spacing','line-height',
                'list-style','list-style-image','list-style-position','list-style-type','margin',
                'margin-bottom','margin-left','margin-right','margin-top','max-height','max-width',
                'min-height','min-width','object-fit','object-position','opacity','order','outline',
                'outline-color','outline-offset','outline-style','outline-width','overflow','overflow-x',
                'overflow-y','padding','padding-bottom','padding-left','padding-right','padding-top',
                'perspective','pointer-events','position','resize','right','row-gap','scroll-behavior',
                'src','table-layout','text-align','text-decoration','text-decoration-color',
                'text-decoration-line','text-decoration-style','text-indent','text-overflow',
                'text-shadow','text-transform','top','transform','transform-origin','transition',
                'transition-delay','transition-duration','transition-property',
                'transition-timing-function','user-select','vertical-align','visibility','white-space',
                'width','will-change','word-break','word-spacing','word-wrap','writing-mode','z-index'
            ];
            const JS_WORDS = [
                'async','await','break','case','catch','class','const','continue','debugger','default',
                'delete','do','else','export','extends','finally','for','function','if','import','in',
                'instanceof','let','new','of','return','static','super','switch','this','throw','try',
                'typeof','var','void','while','with','yield',
                'true','false','null','undefined','NaN','Infinity',
                'console','window','document','navigator','location','history','localStorage',
                'sessionStorage','fetch','setTimeout','setInterval','clearTimeout','clearInterval',
                'requestAnimationFrame','alert','confirm','prompt','JSON','Math','Object','Array',
                'String','Number','Boolean','Date','RegExp','Error','Promise','Map','Set','WeakMap',
                'WeakSet','Symbol','Proxy','Reflect','Intl','URL','Blob','File','FileReader','FormData',
                'getElementById','getElementsByClassName','getElementsByTagName','querySelector',
                'querySelectorAll','createElement','createTextNode','appendChild','removeChild',
                'insertBefore','replaceChild','cloneNode','addEventListener','removeEventListener',
                'dispatchEvent','setAttribute','getAttribute','removeAttribute','hasAttribute',
                'classList','style','innerHTML','textContent','innerText','value','checked','dataset',
                'parentNode','parentElement','children','childNodes','firstChild','lastChild',
                'nextSibling','previousSibling','innerWidth','innerHeight','offsetWidth','offsetHeight',
                'forEach','map','filter','reduce','reduceRight','find','findIndex','some','every',
                'includes','indexOf','lastIndexOf','push','pop','shift','unshift','slice','splice',
                'concat','join','split','replace','replaceAll','match','matchAll','search','trim',
                'trimStart','trimEnd','padStart','padEnd','toUpperCase','toLowerCase','charAt',
                'charCodeAt','codePointAt','repeat','startsWith','endsWith','substring','substr',
                'sort','reverse','fill','flat','flatMap','from','isArray','keys','values','entries',
                'assign','freeze','create','defineProperty','getOwnPropertyNames','hasOwnProperty',
                'parseInt','parseFloat','isNaN','isFinite','random','floor','ceil','round','abs',
                'pow','sqrt','max','min','now'
            ];

            const el = document.createElement('div');
            el.className = 'intellisense';
            el.hidden = true;
            document.body.appendChild(el);

            let currentItems = [];
            let currentIndex = 0;
            let currentTa = null;
            let currentFrom = 0;
            let currentTo = 0;
            let justAccepted = false;

            const measureCtx = document.createElement('canvas').getContext('2d');

            // Read completion data when suggestions are requested, not during initialization.
            // This also supports bundled projects where the data script appears later.
            function getIntelliSenseData() {
                return window.EDITOR_INTELLISENSE_DATA || {};
            }

            // Preserve source offsets while masking CSS comments.
            function maskCssComments(text) {
                return text.replace(/\/\*[\s\S]*?(?:\*\/|$)/g, function(comment) {
                    return comment.replace(/[^\n]/g, ' ');
                });
            }

            // Do not offer CSS value completions while the caret is inside a quoted string.
            function isInsideCssString(text) {
                let quote = null;
                let escaped = false;
                for (let i = 0; i < text.length; i++) {
                    const ch = text.charAt(i);
                    if (escaped) { escaped = false; continue; }
                    if (quote && ch === '\\') { escaped = true; continue; }
                    if (quote) {
                        if (ch === quote) quote = null;
                    } else if (ch === "'" || ch === '"') {
                        quote = ch;
                    }
                }
                return !!quote;
            }

            // Avoid suggestions inside JavaScript strings and comments.
            function isInsideJsStringOrComment(text) {
                let quote = null;
                let escaped = false;
                let lineComment = false;
                let blockComment = false;
                for (let i = 0; i < text.length; i++) {
                    const ch = text.charAt(i);
                    const next = text.charAt(i + 1);
                    if (lineComment) {
                        if (ch === '\n' || ch === '\r') lineComment = false;
                        continue;
                    }
                    if (blockComment) {
                        if (ch === '*' && next === '/') { blockComment = false; i++; }
                        continue;
                    }
                    if (quote) {
                        if (escaped) { escaped = false; continue; }
                        if (ch === '\\') { escaped = true; continue; }
                        if (ch === quote) quote = null;
                        continue;
                    }
                    if (ch === '/' && next === '/') { lineComment = true; i++; continue; }
                    if (ch === '/' && next === '*') { blockComment = true; i++; continue; }
                    if (ch === "'" || ch === '"' || ch === '`') quote = ch;
                }
                return !!quote || lineComment || blockComment;
            }

            // Find an unfinished HTML tag without treating > inside quoted attributes as tag end.
            function findOpenHtmlTagStart(text) {
                let tagStart = -1;
                let quote = null;
                let inComment = false;
                for (let i = 0; i < text.length; i++) {
                    if (inComment) {
                        if (text.slice(i, i + 3) === '-->') {
                            inComment = false;
                            i += 2;
                        }
                        continue;
                    }
                    if (!quote && text.slice(i, i + 4) === '<!--') {
                        inComment = true;
                        tagStart = -1;
                        i += 3;
                        continue;
                    }
                    const ch = text.charAt(i);
                    if (quote) {
                        if (ch === quote) quote = null;
                        continue;
                    }
                    if (tagStart >= 0 && (ch === '"' || ch === "'")) {
                        quote = ch;
                        continue;
                    }
                    if (ch === '<') tagStart = i;
                    else if (ch === '>') tagStart = -1;
                }
                return tagStart;
            }

            function getWordAndContext(ta, lang) {
                const val = ta.value;
                const pos = ta.selectionStart;
                const before = val.substring(0, pos);

                if (lang === 'html') {
                    const tagLt = findOpenHtmlTagStart(before);

                    // CSS completion inside an unfinished inline style attribute.
                    if (tagLt >= 0 && before.slice(tagLt, tagLt + 4) !== '<!--') {
                        const tagFragment = before.slice(tagLt);
                        const styleMatch = tagFragment.match(/\bstyle\s*=\s*(["'])((?:(?!\1)[\s\S])*)$/i);
                        if (styleMatch) {
                            const cssBefore = styleMatch[2];
                            const declaration = cssBefore.match(/(?:^|;)\s*([a-zA-Z-][\w-]*)\s*:\s*([^;]*)$/);
                            if (declaration) {
                                const valueText = declaration[2];
                                if (isInsideCssString(valueText)) return null;
                                const valueMatch = valueText.match(/([a-zA-Z0-9_#.%+-]+)$/);
                                const word = valueMatch ? valueMatch[1] : '';
                                return { word: word, from: pos - word.length, to: pos, kind: 'cssValue', property: declaration[1].toLowerCase(), inlineStyle: true };
                            }
                            const propertyMatch = cssBefore.match(/(?:^|;)\s*([a-zA-Z-][\w-]*)?$/);
                            if (propertyMatch) {
                                const word = propertyMatch[1] || '';
                                return { word: word, from: pos - word.length, to: pos, kind: 'cssProperty', inlineStyle: true };
                            }
                        }
                    }

                    if (tagLt < 0) {
                        // Suggest a small, curated set of Emmet-style HTML shortcuts only when
                        // the current line contains a single abbreviation-like token.
                        const lineStart = Math.max(before.lastIndexOf('\n'), before.lastIndexOf('\r')) + 1;
                        const lineFragment = before.slice(lineStart);
                        const abbreviationMatch = lineFragment.match(/^([ \t]*)([^\s<"']+)$/);
                        if (abbreviationMatch) {
                            const token = abbreviationMatch[2];
                            const abbreviations = (getIntelliSenseData().htmlAbbreviations || []);
                            if (abbreviations.some(function (item) {
                                return String(item.trigger || '').toLowerCase().startsWith(token.toLowerCase());
                            })) {
                                return { word: token, from: pos - token.length, to: pos, kind: 'htmlAbbreviation' };
                            }
                        }
                        return null;
                    }
                    const fragment = before.slice(tagLt);
                    const tagMatch = fragment.match(/^<\/?([a-zA-Z][\w:-]*)/);
                    if (!tagMatch) return null;
                    const tag = tagMatch[1].toLowerCase();
                    if (fragment.charAt(1) === '/') {
                        const m = fragment.match(/^<\/([a-zA-Z][\w:-]*)$/);
                        return m ? { word: m[1], from: pos - m[1].length, to: pos, kind: 'htmlTag' } : null;
                    }
                    const afterName = fragment.slice(tagMatch[0].length);
                    if (!afterName.length && !/\s/.test(fragment.slice(-1))) {
                        return { word: tagMatch[1], from: pos - tagMatch[1].length, to: pos, kind: 'htmlTag' };
                    }
                    if (/^\s/.test(afterName)) {
                        if (/=\s*$/.test(afterName) || /=\s*["'][^"']*$/.test(afterName)) return null;
                        const attrMatch = afterName.match(/([^\s"'<>/=]*)$/);
                        if (!attrMatch) return null;
                        return { word: attrMatch[1], from: pos - attrMatch[1].length, to: pos, kind: 'htmlAttr', tag: tag };
                    }
                    return { word: tagMatch[1], from: pos - tagMatch[1].length, to: pos, kind: 'htmlTag' };
                }
                if (lang === 'css') {
                    const clean = maskCssComments(before);
                    const depth = (clean.match(/\{/g) || []).length - (clean.match(/\}/g) || []).length;

                    // At-rules can occur both at the top level and inside supported grouping rules.
                    const atRuleLineStart = Math.max(clean.lastIndexOf('\n'), clean.lastIndexOf('{'), clean.lastIndexOf('}'), clean.lastIndexOf(';')) + 1;
                    const atRuleLine = clean.slice(atRuleLineStart);
                    const atRule = atRuleLine.match(/^\s*(@[\w-]*)$/);
                    if (atRule) {
                        return { word: atRule[1], from: pos - atRule[1].length, to: pos, kind: 'cssAtRule' };
                    }

                    if (depth <= 0) {
                        const selectorLineStart = Math.max(clean.lastIndexOf('\n'), clean.lastIndexOf('{'), clean.lastIndexOf('}')) + 1;
                        const selectorLine = clean.slice(selectorLineStart);

                        const pseudoElement = selectorLine.match(/::([\w-]*)$/);
                        if (pseudoElement) {
                            return { word: pseudoElement[1], from: pos - pseudoElement[1].length, to: pos, kind: 'cssPseudoElement' };
                        }

                        const pseudoClass = selectorLine.match(/:([\w-]*)$/);
                        if (pseudoClass && selectorLine.charAt(pseudoClass.index - 1) !== ':') {
                            return { word: pseudoClass[1], from: pos - pseudoClass[1].length, to: pos, kind: 'cssPseudoClass' };
                        }
                        return null;
                    }
                    const lineStart = Math.max(clean.lastIndexOf('{'), clean.lastIndexOf(';'), clean.lastIndexOf('}')) + 1;
                    const line = clean.slice(lineStart);
                    const declaration = line.match(/^\s*([a-zA-Z-][\w-]*)\s*:\s*([^;]*)$/);
                    if (declaration) {
                        const valueText = declaration[2];
                        if (isInsideCssString(valueText)) return null;
                        const m = valueText.match(/([a-zA-Z0-9_#.%+-]+)$/);
                        return { word: m ? m[1] : '', from: m ? pos - m[1].length : pos, to: pos, kind: 'cssValue', property: declaration[1].toLowerCase() };
                    }
                    const m = line.match(/^\s*([a-zA-Z-][\w-]*)?$/);
                    if (!m) return null;
                    const word = m[1] || '';
                    return { word: word, from: pos - word.length, to: pos, kind: 'cssProperty' };
                }
                if (lang === 'js') {
                    if (isInsideJsStringOrComment(before)) return null;
                    const member = before.match(/([a-zA-Z_$][\w$]*)\.([a-zA-Z_$][\w$]*)?$/);
                    if (member) {
                        const word = member[2] || '';
                        return { word: word, from: pos - word.length, to: pos, kind: 'jsMember', root: member[1] };
                    }
                    const m = before.match(/([a-zA-Z_$][\w$]*)$/);
                    if (!m) return null;
                    return { word: m[1], from: pos - m[1].length, to: pos, kind: 'jsWord' };
                }
                return null;
            }

            // Resolve a contextual continuation at the caret. Rules are curated in
            // next-word-suggestions.js and only run outside strings and comments.
            function getNextWordContext(ta, lang) {
                if (!ta || ta.selectionStart !== ta.selectionEnd) return null;
                const pos = ta.selectionStart;
                let before = ta.value.slice(0, pos);

                if (lang === 'js' && isInsideJsStringOrComment(before)) return null;
                if (lang === 'css') {
                    before = maskCssComments(before);
                    if (isInsideCssString(before)) return null;
                }
                if (lang === 'html' && findOpenHtmlTagStart(before) < 0) return null;

                const data = getIntelliSenseData();
                const rules = data.nextWordRules && data.nextWordRules[lang];
                if (!Array.isArray(rules)) return null;

                for (let i = 0; i < rules.length; i++) {
                    const rule = rules[i];
                    const match = rule.pattern && rule.pattern.exec(before);
                    if (!match) continue;
                    const items = Array.isArray(rule.items)
                        ? rule.items
                        : (typeof rule.create === 'function' ? rule.create(match, before) : []);
                    if (!Array.isArray(items) || !items.length) continue;
                    return { kind: 'nextWord', word: '', from: pos, to: pos, lang: lang, items: items };
                }
                return null;
            }

            function asItem(item) {
                return typeof item === 'string' ? { label: item, insert: item, description: '' } : item;
            }
            function filterList(list, word) {
                const w = (word || '').toLowerCase();
                const out = [];
                const seenLabels = new Set();
                const items = (list || []).map(asItem);
                for (let i = 0; i < items.length; i++) {
                    const label = String(items[i].label || items[i].insert || '');
                    // JavaScript is case-sensitive: keep distinct names such as Map and map.
                    if (!label || seenLabels.has(label)) continue;
                    seenLabels.add(label);
                    if (!w || label.toLowerCase().startsWith(w)) {
                        out.push(items[i]);
                        if (out.length >= 24) break;
                    }
                }
                return out;
            }

            function resolveCssAbbreviation(word, data) {
                const mappings = (data && data.cssAbbreviationProperties) || {};
                const match = String(word || '').match(/^([a-z]+)(\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)?(?:-\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)?){0,3})$/i);
                if (!match) return null;
                const property = mappings[match[1].toLowerCase()];
                if (!property) return null;

                const values = match[2].match(/\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)?/gi) || [];
                if (!values.length || values.join('-').toLowerCase() !== match[2].toLowerCase()) return null;
                const multiValueProperties = new Set(['margin', 'padding', 'border-radius', 'border-width', 'border-style', 'border-color', 'gap']);
                if (values.length > 1 && !multiValueProperties.has(property)) return null;
                if (property === 'gap' && values.length > 2) return null;

                const unitlessProperties = new Set(['opacity', 'z-index', 'font-weight', 'line-height', 'order', 'flex-grow', 'flex-shrink']);
                const lengthProperties = new Set([
                    'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
                    'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
                    'width', 'height', 'min-width', 'max-width', 'min-height', 'max-height',
                    'top', 'right', 'bottom', 'left', 'gap', 'row-gap', 'column-gap',
                    'font-size', 'letter-spacing', 'border-radius', 'border-width'
                ]);
                if (!unitlessProperties.has(property) && !lengthProperties.has(property)) return null;
                const expandedValues = values.map(function (value) {
                    return /(?:px|rem|em|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)$/i.test(value) || unitlessProperties.has(property)
                        ? value
                        : value + 'px';
                });
                const insert = property + ': ' + expandedValues.join(' ') + ';';
                return {
                    label: String(word) + ' -> ' + insert,
                    insert: insert,
                    description: 'Expand a CSS shorthand abbreviation into a standard declaration'
                };
            }

            function completionList(ctx) {
                const data = getIntelliSenseData();
                if (ctx.kind === 'nextWord') return filterList(ctx.items || [], '');
                if (ctx.kind === 'cssAtRule') return filterList(data.cssAtRules || [], ctx.word);
                if (ctx.kind === 'cssPseudoClass') return filterList(data.cssPseudoClasses || [], ctx.word);
                if (ctx.kind === 'cssPseudoElement') return filterList(data.cssPseudoElements || [], ctx.word);
                if (ctx.kind === 'htmlAbbreviation') return filterList(data.htmlAbbreviations || [], ctx.word);
                if (ctx.kind === 'htmlTag') {
                    return filterList(data.htmlTags || HTML_TAGS, ctx.word);
                }
                if (ctx.kind === 'htmlAttr') {
                    const attrs = (data.htmlAttributes || []).concat((data.htmlAttrsByTag || {})[ctx.tag] || []);
                    return filterList(Array.from(new Set(attrs)).map(function (name) {
                        const hasValue = /^(class|id|style|title|alt|src|href|placeholder|name|value|type|role|lang|dir|for|target|rel|method|action|width|height|colspan|rowspan|scope|accept|autocomplete|pattern|inputmode|on[a-z][a-z0-9-]*|aria-[\w-]+|data-[\w-]+)$/.test(name);
                        return { label: name, insert: hasValue ? name + '=""' : name,
                            caret: hasValue ? name.length + 2 : null };
                    }), ctx.word);
                }
                if (ctx.kind === 'cssProperty') {
                    const shorthand = resolveCssAbbreviation(ctx.word, data);
                    if (shorthand) return [shorthand];
                    const snippets = (data.snippets && data.snippets.css) || [];
                    return filterList(snippets.concat(data.cssAbbreviations || [], data.cssProperties || CSS_PROPS), ctx.word);
                }
                if (ctx.kind === 'cssValue') {
                    const values = (data.cssValues || {})[ctx.property] || [];
                    const common = ['inherit', 'initial', 'unset', 'revert', 'revert-layer', 'var(--custom-property)'];
                    return filterList(values.concat(common), ctx.word);
                }
                if (ctx.kind === 'jsMember') {
                    const members = (data.jsMembers || {})[ctx.root] || [];
                    return filterList(members, ctx.word);
                }
                if (ctx.kind === 'jsWord') {
                    const snippets = (data.snippets && data.snippets.js) || [];
                    return filterList(snippets.concat(data.jsWords || JS_WORDS), ctx.word);
                }
                return [];
            }

            function caretRect(ta, pos) {
                const cs = getComputedStyle(ta);
                measureCtx.font = cs.fontSize + ' ' + cs.fontFamily;
                const charW = measureCtx.measureText('M').width;
                const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.5;
                const lines = ta.value.substring(0, pos).split('\n');
                const row = lines.length - 1;
                const col = lines[row].length;
                const r = ta.getBoundingClientRect();
                return {
                    x: r.left + parseFloat(cs.paddingLeft) + col * charW - ta.scrollLeft,
                    bottom: r.top + parseFloat(cs.paddingTop) + (row + 1) * lh - ta.scrollTop,
                    lh: lh
                };
            }

            function show(items, ta, from, to) {
                currentItems = items;
                currentIndex = 0;
                currentTa = ta;
                currentFrom = from;
                currentTo = to;
                el.innerHTML = items.map(function(raw, i) {
                    const item = asItem(raw);
                    return '<div class="intellisense-item' + (i === 0 ? ' selected' : '') + '" data-idx="' + i + '">' +
                        '<span class="intellisense-label">' + escHtml(item.label || item.insert) + '</span>' +
                        '</div>';
                }).join('');
                el.hidden = false;
                positionDropdown(ta, to);
            }
            function positionDropdown(ta, pos) {
                const c = caretRect(ta, pos);
                const w = el.offsetWidth || 180;
                const h = el.offsetHeight || 180;
                let left = c.x;
                let top  = c.bottom + 4;
                if (left + w > window.innerWidth - 8) left = Math.max(8, window.innerWidth - w - 8);
                if (top + h > window.innerHeight - 8) top = Math.max(8, c.bottom - c.lh - h - 4);
                el.style.left = Math.max(8, left) + 'px';
                el.style.top  = top + 'px';
            }
            function updateSelection() {
                const nodes = el.querySelectorAll('.intellisense-item');
                for (let i = 0; i < nodes.length; i++) nodes[i].classList.toggle('selected', i === currentIndex);
                const sel = el.querySelector('.intellisense-item.selected');
                if (sel && sel.scrollIntoView) sel.scrollIntoView({ block: 'nearest' });
            }
            function hide() {
                el.hidden = true;
                currentItems = [];
                currentIndex = 0;
                currentTa = null;
            }
            function accept() {
                if (!currentItems.length || !currentTa) return;
                const item = asItem(currentItems[currentIndex]);
                const ta = currentTa;
                const from = currentFrom;
                const to = currentTo;
                hide();
                ta.focus();
                ta.setSelectionRange(from, to);
                justAccepted = true;
                insertText(ta, item.insert || item.label);
                if (Number.isInteger(item.caret) && item.caret > 0) {
                    const caret = from + item.caret;
                    ta.setSelectionRange(caret, caret);
                }
                const acceptedLang = LANGS.find(function(lang) {
                    return editors[lang] && editors[lang].ta === ta;
                });
                if (acceptedLang) {
                    setTimeout(function() {
                        if (document.activeElement !== ta) return;
                        const nextCtx = getNextWordContext(ta, acceptedLang);
                        if (!nextCtx) return;
                        const nextItems = completionList(nextCtx);
                        if (nextItems.length) show(nextItems, ta, nextCtx.from, nextCtx.to);
                    }, 0);
                }
                setTimeout(function() { justAccepted = false; }, 80);
            }
            function onInput(ta, lang, e) {
                if (justAccepted) { justAccepted = false; return; }
                // Re-evaluate after typing, deletion, paste, and other edits; mobile
                // keyboards do not always report inputType as "insertText".
                if (!e || e.isComposing) { hide(); return; }
                const ctx = getWordAndContext(ta, lang) || getNextWordContext(ta, lang);
                if (!ctx || (ctx.kind !== 'nextWord' && ctx.word.length < 1 && !['htmlAttr', 'cssValue', 'cssProperty', 'jsMember', 'cssPseudoClass', 'cssPseudoElement'].includes(ctx.kind))) { hide(); return; }

                const items = completionList(ctx);
                if (!items.length) { hide(); return; }
                if (items.length === 1 && String(asItem(items[0]).label || asItem(items[0]).insert).toLowerCase() === ctx.word.toLowerCase()) { hide(); return; }
                show(items, ta, ctx.from, ctx.to);
            }
            function onKeyDown(e) {
                if (el.hidden) return false;
                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        currentIndex = (currentIndex + 1) % currentItems.length;
                        updateSelection();
                        return true;
                    case 'ArrowUp':
                        e.preventDefault();
                        currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
                        updateSelection();
                        return true;
                    case 'Enter':
                    case 'Tab':
                        e.preventDefault();
                        accept();
                        return true;
                    case 'Escape':
                        e.preventDefault();
                        hide();
                        return true;
                    case 'ArrowLeft':
                    case 'ArrowRight':
                    case 'Home':
                    case 'End':
                        hide();
                        return false;
                }
                return false;
            }
            el.addEventListener('mousedown', function(e) {
                const item = e.target.closest('.intellisense-item');
                if (!item) return;
                e.preventDefault();
                currentIndex = +item.dataset.idx;
                accept();
            });
            el.addEventListener('mouseover', function(e) {
                const item = e.target.closest('.intellisense-item');
                if (!item) return;
                const idx = +item.dataset.idx;
                if (idx === currentIndex) return;
                currentIndex = idx;
                updateSelection();
            });
            document.addEventListener('pointerdown', function(e) {
                if (!el.hidden && !el.contains(e.target)) hide();
            }, true);
            window.addEventListener('resize', hide);

            return { onInput, onKeyDown, hide, isOpen: function() { return !el.hidden; } };
        })();

        // ==========================================
        //  Color Picker
        // ==========================================
        const picker = (function() {
            const SV_SIZE = 108, RING_R = 90, CENTER = 100;
            const el = document.createElement('div');
            el.className = 'cp';
            el.hidden = true;
            el.innerHTML =
                '<div class="cp-wheel"><div class="cp-ring"></div><div class="cp-inner"></div>' +
                '<div class="cp-sv"><div class="cp-sv-handle"></div></div><div class="cp-ring-handle"></div></div>' +
                '<div class="cp-row"><div class="cp-swatch"><span class="cp-old"></span><span class="cp-new"></span></div>' +
                '<input class="cp-text" type="text" spellcheck="false" autocomplete="off">' +
                '<select class="cp-fmt"><option value="hex">HEX</option><option value="rgb">RGB</option><option value="hsl">HSL</option></select></div>' +
                '<div class="cp-actions"><button type="button" class="cp-ok">✔ Apply Color</button>' +
                '<button type="button" class="cp-cancel">Cancel</button></div>';
            document.body.appendChild(el);

            const wheel = el.querySelector('.cp-wheel');
            const ring = el.querySelector('.cp-ring');
            const ringHandle = el.querySelector('.cp-ring-handle');
            const sv = el.querySelector('.cp-sv');
            const svHandle = el.querySelector('.cp-sv-handle');
            const oldSw = el.querySelector('.cp-old');
            const newSw = el.querySelector('.cp-new');
            const textIn = el.querySelector('.cp-text');
            const fmtSel = el.querySelector('.cp-fmt');

            let h = 204, s = 0.7626, v = 0.8588;
            let ctx = null;
            let timer = null;

            function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
            function hsvToRgb(hh, ss, vv) {
                const c = vv * ss;
                const x = c * (1 - Math.abs((hh / 60) % 2 - 1));
                const m = vv - c;
                let r, g, b;
                if (hh < 60)       { r = c; g = x; b = 0; }
                else if (hh < 120) { r = x; g = c; b = 0; }
                else if (hh < 180) { r = 0; g = c; b = x; }
                else if (hh < 240) { r = 0; g = x; b = c; }
                else if (hh < 300) { r = x; g = 0; b = c; }
                else               { r = c; g = 0; b = x; }
                return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
            }
            function rgbToHsv(r, g, b) {
                r /= 255; g /= 255; b /= 255;
                const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
                let hh = 0;
                if (d !== 0) {
                    if (max === r)      hh = 60 * (((g - b) / d) % 6);
                    else if (max === g) hh = 60 * ((b - r) / d + 2);
                    else                hh = 60 * ((r - g) / d + 4);
                    if (hh < 0) hh += 360;
                }
                return { h: hh, s: max === 0 ? 0 : d / max, v: max };
            }
            function rgbToHsl(r, g, b) {
                r /= 255; g /= 255; b /= 255;
                const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
                const l = (max + min) / 2;
                let hh = 0, ss = 0;
                if (d !== 0) {
                    ss = d / (1 - Math.abs(2 * l - 1));
                    if (max === r)      hh = 60 * (((g - b) / d) % 6);
                    else if (max === g) hh = 60 * ((b - r) / d + 2);
                    else                hh = 60 * ((r - g) / d + 4);
                    if (hh < 0) hh += 360;
                }
                return [Math.round(hh), Math.round(ss * 100), Math.round(l * 100)];
            }
            function toHex(rgb) {
                return '#' + rgb.map(function(n) {
                    return clamp(n, 0, 255).toString(16).padStart(2, '0');
                }).join('');
            }
            function formatColor(rgb) {
                const f = fmtSel.value;
                if (f === 'rgb') return 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')';
                if (f === 'hsl') {
                    const c = rgbToHsl(rgb[0], rgb[1], rgb[2]);
                    return 'hsl(' + c[0] + ', ' + c[1] + '%, ' + c[2] + '%)';
                }
                return toHex(rgb);
            }
            function parseColor(str) {
                str = (str || '').trim();
                let m = str.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
                if (m) {
                    let x = m[1];
                    if (x.length === 3) x = x.charAt(0) + x.charAt(0) + x.charAt(1) + x.charAt(1) + x.charAt(2) + x.charAt(2);
                    return rgbToHsv(parseInt(x.substr(0, 2), 16), parseInt(x.substr(2, 2), 16), parseInt(x.substr(4, 2), 16));
                }
                m = str.match(/^rgba?\(\s*(\d{1,3})\s*[, ]\s*(\d{1,3})\s*[, ]\s*(\d{1,3})/i);
                if (m) return rgbToHsv(clamp(+m[1], 0, 255), clamp(+m[2], 0, 255), clamp(+m[3], 0, 255));
                m = str.match(/^hsla?\(\s*(\d{1,3}(?:\.\d+)?)\s*[, ]\s*(\d{1,3}(?:\.\d+)?)%\s*[, ]\s*(\d{1,3}(?:\.\d+)?)%/i);
                if (m) {
                    const hh = (+m[1]) % 360, ss = clamp(+m[2], 0, 100) / 100, ll = clamp(+m[3], 0, 100) / 100;
                    const vv = ll + ss * Math.min(ll, 1 - ll);
                    return { h: hh, s: vv === 0 ? 0 : 2 * (1 - ll / vv), v: vv };
                }
                return null;
            }
            function render(skipText) {
                const rgb = hsvToRgb(h, s, v);
                sv.style.backgroundColor = 'hsl(' + h + ',100%,50%)';
                svHandle.style.left = (s * SV_SIZE) + 'px';
                svHandle.style.top = ((1 - v) * SV_SIZE) + 'px';
                const rad = h * Math.PI / 180;
                ringHandle.style.left = (CENTER + RING_R * Math.sin(rad)) + 'px';
                ringHandle.style.top = (CENTER - RING_R * Math.cos(rad)) + 'px';
                newSw.style.background = toHex(rgb);
                if (!skipText) textIn.value = formatColor(rgb);
            }
            function setHsv(c, keepHueWhenGray) {
                if (keepHueWhenGray && (c.s === 0 || c.v === 0)) c.h = h;
                h = c.h; s = c.s; v = c.v;
            }
            function bindDrag(target, handler) {
                target.addEventListener('pointerdown', function(e) {
                    e.preventDefault();
                    target.setPointerCapture(e.pointerId);
                    handler(e);
                    function move(ev) { handler(ev); }
                    function up() {
                        target.removeEventListener('pointermove', move);
                        target.removeEventListener('pointerup', up);
                        target.removeEventListener('pointercancel', up);
                    }
                    target.addEventListener('pointermove', move);
                    target.addEventListener('pointerup', up);
                    target.addEventListener('pointercancel', up);
                });
            }
            bindDrag(ring, function(e) {
                const r = wheel.getBoundingClientRect();
                const dx = e.clientX - (r.left + r.width / 2);
                const dy = e.clientY - (r.top + r.height / 2);
                let ang = Math.atan2(dx, -dy) * 180 / Math.PI;
                if (ang < 0) ang += 360;
                h = ang % 360;
                render(false);
            });
            bindDrag(sv, function(e) {
                const r = sv.getBoundingClientRect();
                s = clamp((e.clientX - r.left) / r.width, 0, 1);
                v = 1 - clamp((e.clientY - r.top) / r.height, 0, 1);
                render(false);
            });
            textIn.addEventListener('input', function() {
                const c = parseColor(textIn.value);
                if (c) { setHsv(c, true); render(true); }
            });
            textIn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') { e.preventDefault(); apply(); }
            });
            fmtSel.addEventListener('change', function() { render(false); });
            el.addEventListener('mousedown', function(e) {
                if (!e.target.closest('input,select')) e.preventDefault();
            });
            function apply() {
                if (!ctx) return;
                const c = ctx;
                const text = ': ' + formatColor(hsvToRgb(h, s, v)) + ';';
                close();
                c.ta.focus();
                c.ta.setSelectionRange(c.pos, c.pos + c.replaceLen);
                insertText(c.ta, text);
            }
            function close() { clearTimeout(timer); el.hidden = true; ctx = null; }
            el.querySelector('.cp-ok').addEventListener('click', apply);
            el.querySelector('.cp-cancel').addEventListener('click', function() {
                const ta = ctx && ctx.ta; close(); if (ta) ta.focus();
            });
            document.addEventListener('pointerdown', function(e) {
                if (!el.hidden && !el.contains(e.target)) close();
            }, true);
            document.addEventListener('keydown', function(e) {
                if (!el.hidden && e.key === 'Escape') {
                    e.preventDefault();
                    const ta = ctx && ctx.ta; close(); if (ta) ta.focus();
                }
            }, true);
            window.addEventListener('resize', closeIfOpen);

            function isColorContext(val, pos, lang) {
                const before = val.substring(0, pos);
                let token = null;
                if (lang === 'css') {
                    const clean = before.replace(/\/\*[\s\S]*?(?:\*\/|$)/g, '');
                    const depth = (clean.match(/\{/g) || []).length - (clean.match(/\}/g) || []).length;
                    if (depth <= 0) return false;
                    const line = clean.substring(clean.lastIndexOf('\n') + 1);
                    const declarationStart = Math.max(line.lastIndexOf(';'), line.lastIndexOf('{'), line.lastIndexOf('}')) + 1;
                    const declaration = line.slice(declarationStart);
                    const m = declaration.match(/^\s*([\w-]+)\s*:\s*[^;{}]*$/);
                    token = m && m[1];
                } else if (lang === 'html') {
                    const tag = before.substring(before.lastIndexOf('<'));
                    const styleMatch = tag.match(/\bstyle\s*=\s*(["'])([\s\S]*)$/i);
                    if (!styleMatch) return false;
                    const declarations = styleMatch[2];
                    const declaration = declarations.slice(declarations.lastIndexOf(';') + 1);
                    const m = declaration.match(/^\s*([\w-]+)\s*:\s*[^;]*$/);
                    token = m && m[1];
                } else { return false; }
                return !!token && (token.toLowerCase() === 'color' || /-color$/i.test(token));
            }
            const measureCtx2 = document.createElement('canvas').getContext('2d');
            function caretRect2(ta, pos) {
                const cs = getComputedStyle(ta);
                measureCtx2.font = cs.fontSize + ' ' + cs.fontFamily;
                const charW = measureCtx2.measureText('M').width;
                const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.5;
                const lines = ta.value.substring(0, pos).split('\n');
                const row = lines.length - 1;
                const col = lines[row].length;
                const r = ta.getBoundingClientRect();
                return {
                    x: r.left + parseFloat(cs.paddingLeft) + col * charW - ta.scrollLeft,
                    bottom: r.top + parseFloat(cs.paddingTop) + (row + 1) * lh - ta.scrollTop,
                    lh: lh
                };
            }
            function openAt(ta, pos, lang) {
                const rest = ta.value.substring(pos);
                const rm = rest.match(/^[ \t]*:[ \t]*([^;\n}"']*);?/);
                const initial = rm ? parseColor(rm[1]) : null;
                ctx = { ta: ta, pos: pos, replaceLen: rm ? rm[0].length : 0 };
                if (initial) setHsv(initial, true);
                else { h = 204; s = 0.7626; v = 0.8588; }
                oldSw.style.background = toHex(hsvToRgb(h, s, v));
                render(false);
                el.hidden = false;
                const c = caretRect2(ta, pos);
                const w = el.offsetWidth, hgt = el.offsetHeight;
                let left = clamp(c.x, 8, Math.max(8, window.innerWidth - w - 8));
                let top = c.bottom + 6;
                if (top + hgt > window.innerHeight - 8) top = c.bottom - c.lh - hgt - 6;
                top = clamp(top, 8, Math.max(8, window.innerHeight - hgt - 8));
                el.style.left = left + 'px';
                el.style.top = top + 'px';
            }
            function onInput(ta, lang, e) {
                clearTimeout(timer); close();
                if (lang === 'js') return;
                if (!e || e.inputType !== 'insertText' || !e.data || e.data.toLowerCase() !== 'r') return;
                const pos = ta.selectionStart;
                if (!isColorContext(ta.value, pos, lang)) return;
                timer = setTimeout(function() {
                    if (document.activeElement === ta && ta.selectionStart === pos &&
                        isColorContext(ta.value, pos, lang)) {
                        openAt(ta, pos, lang);
                    }
                }, 300);
            }
            function closeIfOpen() { if (!el.hidden) close(); }
            return { onInput, close, closeIfOpen };
        })();

        // ==========================================
        //  Search
        // ==========================================
        const searchInput    = document.getElementById('searchInput');
        const searchCount    = document.getElementById('searchCount');
        const searchResults  = document.getElementById('searchResults');
        const searchPrevBtn  = document.getElementById('searchPrev');
        const searchNextBtn  = document.getElementById('searchNext');
        const searchClearBtn = document.getElementById('searchClear');

        let searchMatches = [];
        let searchIndex = -1;
        let searchTimer = null;

        function performSearch(query) {
            searchMatches = [];
            searchIndex = -1;
            const ed = LANGS.includes(activeTab) ? editors[activeTab] : null;
            if (!ed || !query) { renderSearchResults(); return; }

            const text  = ed.ta.value;
            const lower = text.toLowerCase();
            const q     = query.toLowerCase();
            const qLen  = query.length;
            const lineStarts = [0];
            for (let i = 0; i < text.length; i++) if (text.charCodeAt(i) === 10) lineStarts.push(i + 1);
            let pos = 0;
            while (true) {
                const idx = lower.indexOf(q, pos);
                if (idx === -1) break;
                let lo = 0, hi = lineStarts.length - 1;
                while (lo < hi) {
                    const mid = (lo + hi + 1) >> 1;
                    if (lineStarts[mid] <= idx) lo = mid; else hi = mid - 1;
                }
                searchMatches.push({ start: idx, end: idx + qLen, line: lo + 1 });
                pos = idx + Math.max(1, qLen);
            }
            renderSearchResults();
        }
        function scheduleSearch() {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(function() {
                performSearch(searchInput.value);
                // Re-render the syntax layer so every match is highlighted as the query changes.
                if (editors[activeTab]) editors[activeTab].refresh();
            }, 120);
        }
        function renderSearchResults() {
            const n = searchMatches.length;
            searchCount.textContent = n;
            searchCount.classList.toggle('zero', n === 0);
            if (!searchInput.value || n === 0) {
                searchResults.hidden = true;
                searchResults.innerHTML = '';
                return;
            }
            const lineMap = new Map();
            searchMatches.forEach(function(m, i) { if (!lineMap.has(m.line)) lineMap.set(m.line, i); });
            const parts = [];
            let first = true;
            lineMap.forEach(function(idx, line) {
                if (!first) parts.push('<span class="search-sep">-</span>');
                first = false;
                parts.push('<button type="button" class="search-line" data-idx="' + idx + '">' + line + '</button>');
            });
            searchResults.innerHTML = parts.join('');
            searchResults.hidden = false;
        }
        function jumpToMatch(idx) {
            const m = searchMatches[idx];
            if (!m) return;
            const ed = editors[activeTab];
            if (!ed) return;
            const ta = ed.ta;
            // Keep keyboard focus in the search field so Enter never edits the selected code.
            ta.setSelectionRange(m.start, m.end);
            const cs = getComputedStyle(ta);
            const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.5;
            ta.scrollTop = Math.max(0, (m.line - 4) * lh);
            ed.syncScroll();
            searchIndex = idx;
            searchResults.querySelectorAll('.search-line').forEach(function(b) {
                b.classList.toggle('active', +b.dataset.idx === idx);
            });
            const activeBtn = searchResults.querySelector('.search-line.active');
            if (activeBtn && activeBtn.scrollIntoView) activeBtn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
        function nextMatch() { if (!searchMatches.length) return; jumpToMatch(searchIndex < 0 ? 0 : (searchIndex + 1) % searchMatches.length); }
        function prevMatch() { if (!searchMatches.length) return; jumpToMatch(searchIndex < 0 ? searchMatches.length - 1 : (searchIndex - 1 + searchMatches.length) % searchMatches.length); }
        function clearSearch() {
            searchInput.value = '';
            searchMatches = []; searchIndex = -1;
            renderSearchResults();
            if (editors[activeTab]) editors[activeTab].ta.focus();
        }
        searchInput.addEventListener('input', scheduleSearch);
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { e.preventDefault(); if (e.shiftKey) prevMatch(); else nextMatch(); }
            else if (e.key === 'Escape') { e.preventDefault(); clearSearch(); }
        });
        searchPrevBtn.addEventListener('click', prevMatch);
        searchNextBtn.addEventListener('click', nextMatch);
        searchClearBtn.addEventListener('click', clearSearch);
        searchResults.addEventListener('click', function(e) {
            const btn = e.target.closest('.search-line');
            if (!btn) return;
            jumpToMatch(+btn.dataset.idx);
        });

        // ==========================================
        //  Create editor
        // ==========================================
        const VOID_TAGS = ['area','base','br','col','embed','hr','img','input',
                           'link','meta','param','source','track','wbr'];

        function applySearchHighlights(code, query) {
            const term = String(query || '');
            if (term.length < 2) return;
            const lowerTerm = term.toLocaleLowerCase();
            const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
            const nodes = [];
            while (walker.nextNode()) nodes.push(walker.currentNode);
            nodes.forEach(function(node) {
                const value = node.nodeValue || '';
                const lowerValue = value.toLocaleLowerCase();
                let from = 0;
                let index = lowerValue.indexOf(lowerTerm, from);
                if (index < 0) return;
                const fragment = document.createDocumentFragment();
                while (index >= 0) {
                    if (index > from) fragment.appendChild(document.createTextNode(value.slice(from, index)));
                    const mark = document.createElement('mark');
                    mark.className = 'search-match-highlight';
                    mark.textContent = value.slice(index, index + term.length);
                    fragment.appendChild(mark);
                    from = index + term.length;
                    index = lowerValue.indexOf(lowerTerm, from);
                }
                if (from < value.length) fragment.appendChild(document.createTextNode(value.slice(from)));
                node.parentNode.replaceChild(fragment, node);
            });
        }

        function createEditor(lang) {
            const wrap = document.createElement('div');
            wrap.className = 'editor-wrap';
            wrap.id = 'panel-' + lang;
            wrap.setAttribute('role', 'tabpanel');
            wrap.setAttribute('aria-labelledby', 'tab-' + lang);
            wrap.hidden = true;
            wrap.innerHTML =
                '<div class="line-numbers">1</div>' +
                '<div class="code-wrap">' +
                    '<pre class="highlight" aria-hidden="true"><code></code></pre>' +
                    '<textarea class="input" wrap="off" spellcheck="false" autocomplete="off" ' +
                    'autocorrect="off" autocapitalize="off" aria-label="Editor ' + lang + '"></textarea>' +
                '</div>';
            editorsBox.appendChild(wrap);

            const lineNumbers = wrap.querySelector('.line-numbers');
            const pre         = wrap.querySelector('.highlight');
            const code        = pre.querySelector('code');
            const ta          = wrap.querySelector('textarea');
            const highlight   = HIGHLIGHTERS[lang];

            function syncScroll() {
                pre.scrollTop  = ta.scrollTop;
                pre.scrollLeft = ta.scrollLeft;
                lineNumbers.scrollTop = ta.scrollTop;
            }
            function refresh() {
                code.innerHTML = highlight(ta.value) + '\n';
                applySearchHighlights(code, searchInput.value);
                const count = ta.value.split('\n').length;
                const parts = new Array(count);
                for (let i = 0; i < count; i++) parts[i] = i + 1;
                lineNumbers.textContent = parts.join('\n');
                syncScroll();
            }

            if (lang === 'html') ta.addEventListener('paste', handleHtmlEditorPaste);

            ta.addEventListener('input', function(e) {
                const wasDirty = dirty;
                let addedDirtyFile = false;
                const activeId = project.lastActiveByLang[lang];
                const file = activeId ? getFile(activeId) : null;
                if (file && file.type === lang) {
                    file.content = ta.value;
                    if (!dirtyFileIds.has(file.id)) {
                        dirtyFileIds.add(file.id);
                        addedDirtyFile = true;
                    }
                } else {
                    const f = project.files.find(function(x) { return x.type === lang; });
                    if (f) {
                        f.content = ta.value;
                        project.lastActiveByLang[lang] = f.id;
                        if (!dirtyFileIds.has(f.id)) {
                            dirtyFileIds.add(f.id);
                            addedDirtyFile = true;
                        }
                    }
                }

                refresh();
                setDirty(true);
                if (addedDirtyFile && wasDirty) renderFileExplorer();
                scheduleSaveProject();
                schedulePreview();
                IntelliSense.onInput(ta, lang, e);
                picker.onInput(ta, lang, e);
            });

            ta.addEventListener('scroll', function() {
                syncScroll();
                picker.closeIfOpen();
                IntelliSense.hide();
            });

            ta.addEventListener('keydown', function(e) {
                if (e.isComposing) return;

                if (IntelliSense.onKeyDown(e)) return;
                picker.close();

                if (e.key === 'Tab' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    e.preventDefault();
                    indentSelection(ta, e.shiftKey);
                    return;
                }
                if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
                    handleEnter(e, ta, lang);
                    return;
                }
                if (lang === 'html' && e.key === '>' && !e.ctrlKey && !e.metaKey && !e.altKey &&
                    ta.selectionStart === ta.selectionEnd) {
                    const start  = ta.selectionStart;
                    const before = ta.value.substring(0, start);
                    const match  = before.match(/<([a-zA-Z][\w:-]*)(?:\s[^<>]*)?$/);
                    if (match && !before.endsWith('/')) {
                        const tagName = match[1].toLowerCase();
                        if (!VOID_TAGS.includes(tagName)) {
                            e.preventDefault();
                            insertText(ta, '></' + match[1] + '>');
                            ta.setSelectionRange(start + 1, start + 1);
                        }
                    }
                }
            });

            return { lang, wrap, ta, refresh, syncScroll };
        }

        // ==========================================
        //  Save / Download
        // ==========================================
        function saveCode() {
            if (!saveProject()) {
                setDirty(true);
                return;
            }
            setDirty(false);
            showToast('✅ Saved successfully.', 'success');
        }

        function downloadFile(content, filename, mime) {
            let url = '';
            let anchor = null;
            try {
                if (!window.URL || typeof window.URL.createObjectURL !== 'function') {
                    throw new Error('This browser does not support file downloads from the editor.');
                }
                const blob = new Blob([content], { type: mime || 'text/plain;charset=utf-8' });
                url = URL.createObjectURL(blob);
                anchor = document.createElement('a');
                anchor.href = url;
                anchor.download = filename;
                anchor.rel = 'noopener';
                anchor.style.position = 'fixed';
                anchor.style.left = '-10000px';
                anchor.style.top = '0';
                document.body.appendChild(anchor);
                anchor.click();

                // Some browsers need the object URL to remain available after the click.
                setTimeout(function() {
                    if (anchor && anchor.parentNode) anchor.parentNode.removeChild(anchor);
                    if (url) URL.revokeObjectURL(url);
                }, 60000);
                return true;
            } catch (error) {
                if (anchor && anchor.parentNode) anchor.parentNode.removeChild(anchor);
                if (url) {
                    try { URL.revokeObjectURL(url); } catch (revokeError) {}
                }
                throw error;
            }
        }

        function sanitizeFilename(name) {
            let s = String(name || 'my-project').trim();
            s = s.replace(/[\\/:*?"<>|]+/g, '-');
            s = s.replace(/\s+/g, '-');
            s = s.replace(/-+/g, '-');
            s = s.replace(/^-|-$/g, '');
            if (!s) s = 'my-project';
            return s.substring(0, 50);
        }
        function buildLibsTextFile() {
            const enabledLibs = libraries.filter(function(l) { return l.enabled; });
            if (!enabledLibs.length) return '/* No active libraries */\n';
            const lines = [];
            lines.push('/* ====================================================');
            lines.push('   Active project libraries');
            lines.push('   Date: ' + new Date().toLocaleString('en-US'));
            lines.push('   Count: ' + enabledLibs.length);
            lines.push('   ==================================================== */');
            lines.push('');
            enabledLibs.forEach(function(lib, i) {
                lines.push('/* ====================================================');
                lines.push('   [' + (i + 1) + '] ' + safeCommentLabel(lib.name) + '  (' + lib.type.toUpperCase() + ')');
                lines.push('   ==================================================== */');
                lines.push(lib.code);
                lines.push('');
            });
            return lines.join('\n');
        }
        function buildAllCssCombined() {
            const htmlFiles = project.files.filter(function(file) { return file.type === 'html'; });
            const cssFiles = project.files.filter(function(file) { return file.type === 'css'; });
            const jsFiles = project.files.filter(function(file) { return file.type === 'js'; });
            const markup = htmlFiles.map(function(file) { return file.content; }).join('\n');
            const transformed = stripBundledAssetReferences(markup,cssFiles,jsFiles,containsDocumentStructure(markup));
            const libs = libraries.filter(function(lib) { return lib.enabled && lib.type === 'css'; });
            return buildUniqueAssetCode(transformed,'css',cssFiles,libs);
        }
        function buildAllJsCombined() {
            const htmlFiles = project.files.filter(function(file) { return file.type === 'html'; });
            const cssFiles = project.files.filter(function(file) { return file.type === 'css'; });
            const jsFiles = project.files.filter(function(file) { return file.type === 'js'; });
            const markup = htmlFiles.map(function(file) { return file.content; }).join('\n');
            const transformed = stripBundledAssetReferences(markup,cssFiles,jsFiles,containsDocumentStructure(markup));
            const libs = libraries.filter(function(lib) { return lib.enabled && lib.type === 'js'; });
            return buildUniqueAssetCode(transformed,'js',jsFiles,libs);
        }

        function reportExportResult(filename) {
            if (lastExportDependencyWarnings.length) {
                showToast('Download requested. Local references were preserved: ' + lastExportDependencyWarnings.join(', '),'error');
            } else {
                showToast('Download requested for ' + filename + '. If it does not appear, check the browser downloads list and site download permissions.','info');
            }
        }
        function downloadSingle(name) {
            const safe = sanitizeFilename(name);
            try {
                const content = buildDocument(true);
                downloadFile(content,safe + '.html','text/html;charset=utf-8');
                reportExportResult(safe + '.html');
            } catch (error) {
                showToast('Could not create the download: ' + String(error && error.message ? error.message : error),'error');
            }
        }
        function downloadBundle(name) {
            const safe = sanitizeFilename(name);
            try {
                const html = buildDocument(true,safe);
                const css = buildAllCssCombined();
                const js = buildAllJsCombined();
                const files = [
                    {content:html,filename:safe + '.html',mime:'text/html;charset=utf-8'},
                    {content:css,filename:safe + '.css',mime:'text/css;charset=utf-8'},
                    {content:js,filename:safe + '.js',mime:'text/javascript;charset=utf-8'},
                    {content:buildLibsTextFile(),filename:safe + '.libs.txt',mime:'text/plain;charset=utf-8'}
                ];
                files.forEach(function(file,index) {
                    setTimeout(function() {
                        try { downloadFile(file.content,file.filename,file.mime); }
                        catch (error) {
                            showToast('Could not create ' + file.filename + ': ' + String(error && error.message ? error.message : error),'error');
                        }
                    },index * 300);
                });
                if (lastExportDependencyWarnings.length) {
                    showToast('Download requests sent. Local references were preserved: ' + lastExportDependencyWarnings.join(', '),'error');
                } else {
                    showToast('Download requests sent for 4 files. Your browser may ask permission for multiple downloads.','info');
                }
            } catch (error) {
                showToast('Could not prepare the download bundle: ' + String(error && error.message ? error.message : error),'error');
            }
        }

        const nameModal = document.getElementById('nameModal');
        function getDownloadBaseName() {
            const activeFile = project.files.find(function(file) { return file.id === project.activeFileId; });
            if (!activeFile || !activeFile.name) return 'my-project';
            // Use the name saved in File Explorer, removing only a matching file extension.
            const extension = /\.(html?|css|mjs|js)$/i;
            return sanitizeFilename(activeFile.name.replace(extension, '')) || 'my-project';
        }
        function openNameModal() {
            nameModal.hidden = false;
        }
        function closeNameModal() { nameModal.hidden = true; }
        document.getElementById('modalCancel').addEventListener('click', closeNameModal);
        document.getElementById('modalDownloadSingle').addEventListener('click', function() {
            const name = getDownloadBaseName();
            closeNameModal();
            downloadSingle(name);
        });
        document.getElementById('modalDownloadBundle').addEventListener('click', function() {
            const name = getDownloadBaseName();
            closeNameModal();
            downloadBundle(name);
        });
        nameModal.addEventListener('click', function(e) { if (e.target === nameModal) closeNameModal(); });

        // ==========================================
        //  Toast / Font
        // ==========================================
        let toastTimer;
        function showToast(msg, type, actionLabel, onAction) {
            toast.replaceChildren();
            const message = document.createElement('span');
            message.textContent = msg;
            toast.appendChild(message);
            if (actionLabel && typeof onAction === 'function') {
                const action = document.createElement('button');
                action.type = 'button';
                action.className = 'toast-action';
                action.textContent = actionLabel;
                action.addEventListener('click', function() {
                    clearTimeout(toastTimer);
                    toast.className = 'toast';
                    onAction();
                }, { once: true });
                toast.appendChild(action);
            }
            toast.className = 'toast show ' + (type || '');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(function() { toast.className = 'toast ' + (type || ''); }, actionLabel ? 6000 : 2500);
        }
        let fontSize = parseInt(storageGet(FONT_KEY), 10) || 15;
        function applyFontSize() {
            fontSize = Math.max(10, Math.min(30, fontSize));
            document.documentElement.style.setProperty('--editor-font', fontSize + 'px');
            storageSet(FONT_KEY, fontSize);
            if (editors[activeTab]) editors[activeTab].syncScroll();
        }

        // ==========================================
        //  Divider (تغییر اندازه پنل‌ها)
        // ==========================================
        const divider     = document.getElementById('divider');
        const editorPane  = document.querySelector('.editor-pane');
        const containerEl = document.querySelector('.container');

        (function initDivider() {
            const saved = parseFloat(storageGet(SPLIT_KEY));
            if (!isNaN(saved) && saved >= 15 && saved <= 85) {
                editorPane.style.width = saved + '%';
            }

            let dragging = false;

            divider.addEventListener('pointerdown', function(e) {
                e.preventDefault();
                dragging = true;
                divider.classList.add('dragging');
                document.body.style.userSelect = 'none';
                document.body.style.cursor = 'col-resize';
                try { divider.setPointerCapture(e.pointerId); } catch (err) {}
            });

            divider.addEventListener('pointermove', function(e) {
                if (!dragging) return;
                const rect = containerEl.getBoundingClientRect();
                if (rect.width <= 0) return;
                let pct = ((e.clientX - rect.left) / rect.width) * 100;
                pct = Math.max(15, Math.min(85, pct));
                editorPane.style.width = pct + '%';
            });

            function endDrag(e) {
                if (!dragging) return;
                dragging = false;
                divider.classList.remove('dragging');
                document.body.style.userSelect = '';
                document.body.style.cursor = '';
                try { divider.releasePointerCapture(e.pointerId); } catch (err) {}
                const pct = parseFloat(editorPane.style.width);
                if (!isNaN(pct)) storageSet(SPLIT_KEY, pct);
            }
            divider.addEventListener('pointerup', endDrag);
            divider.addEventListener('pointercancel', endDrag);
        })();

        // ==========================================
        //  Buttons
        // ==========================================
        document.getElementById('btnDownload').addEventListener('click', openNameModal);
        document.getElementById('btnUndo').addEventListener('click', doUndo);
        document.getElementById('btnRedo').addEventListener('click', doRedo);

        document.getElementById('btnReset').addEventListener('click', function() {
            if (confirm('All files will be restored to their defaults. Are you sure?')) {
                clearTimeout(autoSaveTimer);
                clearTimeout(dirtyResetTimer);
                project = createDefaultProject();
                const resetSaved = saveProject();
                LANGS.forEach(function(lang) {
                    const f = getFileForLang(lang);
                    if (f) {
                        editors[lang].ta.value = f.content;
                        editors[lang].refresh();
                    }
                });
                renderFileExplorer();
                if (activeTab !== 'libs') {
                    const f = getFileForLang(activeTab);
                    if (f) project.activeFileId = f.id;
                }
                updatePreviewNow();
                setDirty(!resetSaved);
                showToast(resetSaved ? '🔁 Reset complete' : '⚠ Reset is active only in this session; download a backup.', resetSaved ? 'info' : 'error');
            }
        });

        document.getElementById('btnClear').addEventListener('click', function() {
            if (activeTab === 'libs') {
                document.getElementById('libName').value = '';
                document.getElementById('libCode').value = '';
                showToast('🗑 Editor cleared', 'info');
                return;
            }
            const ed = editors[activeTab];
            if (!ed) { showToast('Open an HTML, CSS or JS tab to clear a file', 'info'); return; }
            const f = getFileForLang(activeTab);
            ed.ta.value = '';
            if (f) f.content = '';
            ed.refresh();
            setDirty(true);
            scheduleSaveProject();
            updatePreviewNow();
            showToast('🗑 File cleared', 'info');
        });

        document.getElementById('btnClearAll').addEventListener('click', function() {
            project.files.forEach(function(f) { f.content = ''; });
            LANGS.forEach(function(lang) {
                editors[lang].ta.value = '';
                editors[lang].refresh();
            });
            const saved = saveProject();
            if (saved) setDirty(false);
            updatePreviewNow();
            showToast(saved ? '🧹 All files cleared' : '⚠ Files cleared in this session, but could not be saved.', saved ? 'info' : 'error');
        });

        document.getElementById('btnFontInc').addEventListener('click', function() {
            fontSize++; applyFontSize();
            showToast('Font size: ' + fontSize + 'px', 'info');
        });
        document.getElementById('btnFontDec').addEventListener('click', function() {
            fontSize--; applyFontSize();
            showToast('Font size: ' + fontSize + 'px', 'info');
        });

        // ==========================================
        //  Shortcuts
        // ==========================================
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !nameModal.hidden) { e.preventDefault(); closeNameModal(); return; }
            if (!(e.ctrlKey || e.metaKey) || e.altKey) return;
            const k = String(e.key).toLowerCase();
            if (k === 's' && e.shiftKey) { e.preventDefault(); openNameModal(); return; }
            if (k === 's') { e.preventDefault(); if (project) { clearTimeout(autoSaveTimer); if (saveProject()) { setDirty(false); showToast('✅ Auto-saved', 'success'); } } return; }
            if (k === 'f') {
                e.preventDefault();
                searchInput.focus();
                searchInput.select();
                return;
            }
            const tag = (e.target && e.target.tagName || '').toUpperCase();
            if (tag === 'TEXTAREA' || tag === 'INPUT') return;
            if (activeTab === 'libs') return;
            if (k === 'z' && !e.shiftKey) { e.preventDefault(); doUndo(); }
            else if (k === 'y' || (k === 'z' && e.shiftKey)) { e.preventDefault(); doRedo(); }
        }, true);

        // ==========================================
        //  Init
        // ==========================================
        LANGS.forEach(function(l) { editors[l] = createEditor(l); });

        const symbolSelections = Object.create(null);
        LANGS.forEach(function(lang) {
            const editor = editors[lang];
            if (!editor || !editor.ta) return;
            const ta = editor.ta;
            const rememberSelection = function() {
                symbolSelections[lang] = {
                    start: ta.selectionStart,
                    end: ta.selectionEnd,
                    direction: ta.selectionDirection || 'none'
                };
            };
            ['select', 'keyup', 'click', 'input', 'pointerup'].forEach(function(eventName) {
                ta.addEventListener(eventName, rememberSelection);
            });
            rememberSelection();
        });

        LANGS.forEach(function(l) {
            editors[l].ta.addEventListener('input', function() {
                if (searchInput.value) scheduleSearch();
            });
        });

        project = loadProject();

        LANGS.forEach(function(lang) {
            if (!project.files.some(function(f) { return f.type === lang; })) {
                const blank = { id: makeId(), name: 'untitled.' + lang, type: lang, content: '' };
                project.files.push(blank);
                project.lastActiveByLang[lang] = blank.id;
            } else if (!project.lastActiveByLang[lang]) {
                const f = project.files.find(function(x) { return x.type === lang; });
                if (f) project.lastActiveByLang[lang] = f.id;
            }
        });
        if (!project.activeFileId || !getFile(project.activeFileId)) {
            project.activeFileId = project.files[0].id;
        }

        LANGS.forEach(function(lang) {
            const f = getFileForLang(lang);
            if (f) {
                editors[lang].ta.value = f.content;
                editors[lang].refresh();
            }
        });

        libraries = loadLibraries();
        renderLibraries();
        renderPresets();
        renderFileExplorer();

        applyFontSize();
        activateTab(storageGet(TAB_KEY) || 'html');

        setDirty(false);
        updatePreviewNow();
        if (projectLoadWarning) {
            if (projectRecoveryAvailable) {
                showToast(projectLoadWarning, 'error', 'Download recovery', function() {
                    const recovery = storageGet(PROJECT_RECOVERY_KEY);
                    if (recovery) downloadFile(recovery, 'project-recovery.json', 'application/json;charset=utf-8');
                });
            } else {
                showToast(projectLoadWarning, 'error');
            }
        }


    })();
    
