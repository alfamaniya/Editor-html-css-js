# درخت فایل‌ها و ساختار مخزن

این سند نمای ساختار واقعی شاخهٔ `main` مخزن `Editor-html-css-js` را در قالب جدول درختی ارائه می‌کند. مسیرها از درخت GitHub استخراج شده‌اند. پوشه‌های دارای `.gitkeep` فقط محل رزروشده‌اند و به معنی وجود پیاده‌سازی نیستند.

| درخت فایل‌ها | مسیر دقیق | نوع | کاربرد |
|---|---|---|---|
| &nbsp;&nbsp;&nbsp;&nbsp;build-test-editor.yml | `.github/workflows/build-test-editor.yml` | فایل | گردش‌کار ساخت و کنترل نسخهٔ مستقل |
| &nbsp;&nbsp;&nbsp;&nbsp;check-index-integrity.yml | `.github/workflows/check-index-integrity.yml` | فایل | گردش‌کار بررسی یکپارچگی صفحه و منابع |
| &nbsp;&nbsp;&nbsp;&nbsp;check-index.yml | `.github/workflows/check-index.yml` | فایل | گردش‌کار بررسی صحت صفحهٔ اصلی |
| README.md | `README.md` | فایل | مستند ساختار مخزن |
| &nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `docs/architecture/.gitkeep` | نشانگر پوشه | جایگاه رزروشده برای مستندات معماری |
| &nbsp;&nbsp;&nbsp;&nbsp;tree-world-suggestion.md | `docs/suggestions/tree-world-suggestion.md` | فایل | مستند پیشنهادهای درخت کلمات |
| index-test-etitor.html | `index-test-etitor.html` | فایل | نسخهٔ مستقل/آزمایشی تولیدشده |
| index.html | `index.html` | فایل | صفحهٔ اصلی ویرایشگر |
| script.js | `script.js` | فایل | منطق اصلی برنامه |
| &nbsp;&nbsp;build-test-editor.mjs | `scripts/build-test-editor.mjs` | فایل | ساخت نسخهٔ مستقل از منابع اصلی |
| &nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `scripts/build/.gitkeep` | نشانگر پوشه | جایگاه رزروشده برای اسکریپت‌های ساخت |
| &nbsp;&nbsp;check-backup-restore.mjs | `scripts/check-backup-restore.mjs` | فایل | بررسی پشتیبان‌گیری و بازیابی |
| &nbsp;&nbsp;check-editor-code-processing.mjs | `scripts/check-editor-code-processing.mjs` | فایل | بررسی پردازش کد |
| &nbsp;&nbsp;check-index-integrity.mjs | `scripts/check-index-integrity.mjs` | فایل | بررسی یکپارچگی HTML و منابع |
| &nbsp;&nbsp;check-settings-dialog-keyboard.mjs | `scripts/check-settings-dialog-keyboard.mjs` | فایل | بررسی صفحه‌کلید تنظیمات |
| &nbsp;&nbsp;check-standalone-editor.mjs | `scripts/check-standalone-editor.mjs` | فایل | اعتبارسنجی نسخهٔ مستقل |
| &nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `scripts/checks/.gitkeep` | نشانگر پوشه | جایگاه رزروشده برای اسکریپت‌های کنترل |
| &nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `src/app/.gitkeep` | نشانگر پوشه | جایگاه رزروشده برای راه‌اندازی برنامه |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;backup-restore.css | `src/features/backup-restore/backup-restore.css` | فایل | استایل پشتیبان‌گیری و بازیابی |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;backup-restore.js | `src/features/backup-restore/backup-restore.js` | فایل | منطق پشتیبان‌گیری و بازیابی |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `src/features/editor/autocomplete/.gitkeep` | نشانگر پوشه | جایگاه رزروشده؛ هنوز پیاده‌سازی در این مسیر قرار ندارد |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `src/features/editor/color-picker/.gitkeep` | نشانگر پوشه | جایگاه رزروشده؛ هنوز پیاده‌سازی در این مسیر قرار ندارد |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `src/features/editor/core/.gitkeep` | نشانگر پوشه | جایگاه رزروشده؛ هنوز پیاده‌سازی در این مسیر قرار ندارد |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `src/features/editor/editing-commands/.gitkeep` | نشانگر پوشه | جایگاه رزروشده؛ هنوز پیاده‌سازی در این مسیر قرار ندارد |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `src/features/editor/paste-processing/.gitkeep` | نشانگر پوشه | جایگاه رزروشده؛ هنوز پیاده‌سازی در این مسیر قرار ندارد |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `src/features/editor/search/.gitkeep` | نشانگر پوشه | جایگاه رزروشده؛ هنوز پیاده‌سازی در این مسیر قرار ندارد |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `src/features/editor/syntax-highlighting/.gitkeep` | نشانگر پوشه | جایگاه رزروشده؛ هنوز پیاده‌سازی در این مسیر قرار ندارد |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `src/features/export/.gitkeep` | نشانگر پوشه | جایگاه رزروشده؛ هنوز پیاده‌سازی در این مسیر قرار ندارد |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `src/features/help/.gitkeep` | نشانگر پوشه | جایگاه رزروشده؛ هنوز پیاده‌سازی در این مسیر قرار ندارد |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `src/features/libraries/.gitkeep` | نشانگر پوشه | جایگاه رزروشده؛ هنوز پیاده‌سازی در این مسیر قرار ندارد |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;element-inspector.js | `src/features/live-preview/element-inspector.js` | فایل | بازرس عناصر پیش‌نمایش زنده |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;quick-insert.css | `src/features/quick-insert/quick-insert.css` | فایل | استایل نوار درج سریع |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;quick-insert.js | `src/features/quick-insert/quick-insert.js` | فایل | منطق نوار درج سریع |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;settings.css | `src/features/settings/settings.css` | فایل | استایل تنظیمات |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;settings.js | `src/features/settings/settings.js` | فایل | منطق تنظیمات |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;css-suggestions.js | `src/features/suggestions/data/css-suggestions.js` | فایل | بانک پیشنهادهای CSS |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;html-suggestions.js | `src/features/suggestions/data/html-suggestions.js` | فایل | بانک پیشنهادهای HTML |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;js-suggestions.js | `src/features/suggestions/data/js-suggestions.js` | فایل | بانک پیشنهادهای JavaScript |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suggestion-manager.css | `src/features/suggestions/manager/suggestion-manager.css` | فایل | استایل مدیریت پیشنهادها |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suggestion-manager.js | `src/features/suggestions/manager/suggestion-manager.js` | فایل | مدیریت پیشنهادها |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;next-word-suggestions.js | `src/features/suggestions/next-word/next-word-suggestions.js` | فایل | پیشنهاد ادامهٔ کلمه |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;word-tree.js | `src/features/word-tree/word-tree.js` | فایل | درخت کلمات |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file-manager.css | `src/features/workspace/file-manager/file-manager.css` | فایل | استایل اختصاصی و ظاهر واکنش‌گرای سایدبار فایل‌منیجر |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `src/features/workspace/file-manager/.gitkeep` | نشانگر پوشه | جایگاه رزروشده؛ هنوز پیاده‌سازی در این مسیر قرار ندارد |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `src/features/workspace/project-storage/.gitkeep` | نشانگر پوشه | جایگاه رزروشده؛ هنوز پیاده‌سازی در این مسیر قرار ندارد |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;toolbar-sidebar.css | `src/features/workspace/toolbar/toolbar-sidebar.css` | فایل | استایل سایدبار ابزارها |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;toolbar-sidebar.js | `src/features/workspace/toolbar/toolbar-sidebar.js` | فایل | منطق سایدبار ابزارها |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `src/shared/dom/.gitkeep` | نشانگر پوشه | جایگاه رزروشده برای ابزارهای مشترک DOM |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `src/shared/storage/.gitkeep` | نشانگر پوشه | جایگاه رزروشده برای ابزارهای مشترک ذخیره‌سازی |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `src/shared/ui/.gitkeep` | نشانگر پوشه | جایگاه رزروشده برای ابزارهای مشترک رابط کاربری |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `src/shared/validation/.gitkeep` | نشانگر پوشه | جایگاه رزروشده برای اعتبارسنجی مشترک |
| &nbsp;&nbsp;&nbsp;&nbsp;.gitkeep | `src/styles/.gitkeep` | نشانگر پوشه | جایگاه رزروشده برای استایل‌های مشترک |
| style.css | `style.css` | فایل | استایل اصلی برنامه |
| &nbsp;&nbsp;build-single-file.js | `tools/build-single-file.js` | فایل | ابزار کمکی ساخت فایل مستقل |

## نکات ساختاری

- `index.html` ورودی نسخهٔ اصلی و `index-test-etitor.html` نسخهٔ مستقل/آزمایشی تولیدشده است.
- قابلیت‌های جداشده در مسیرهای `src/features/` نگهداری می‌شوند؛ استایل سایدبار فایل‌منیجر در `src/features/workspace/file-manager/file-manager.css` قرار دارد.
- `script.js` و `style.css` همچنان منابع اصلی مشترک برنامه‌اند؛ انتقال مسئولیت‌های باقی‌مانده باید مرحله‌ای و همراه با بررسی وابستگی‌ها انجام شود.
- اسکریپت‌های `scripts/` برای ساخت و کنترل صحت استفاده می‌شوند و گردش‌کارهای `.github/workflows/` آن‌ها را در CI اجرا می‌کنند.
