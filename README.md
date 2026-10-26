# درخت فایل‌ها و ساختار مخزن

این سند ساختار واقعی شاخهٔ `main` را بر اساس درخت Git مخزن نشان می‌دهد. درخت در تاریخ **۲۶ اکتبر ۲۰۲۶** بررسی و با مسیرهای موجود تطبیق داده شده است. فایل‌های `.gitkeep` فقط برای نگه‌داشتن پوشه‌های خالی در Git هستند و نشان‌دهندهٔ پیاده‌سازی قابلیت نیستند.

## درخت فایل‌ها

```text
Editor-html-css-js/
├── .github/
│   └── workflows/
│       ├── build-test-editor.yml
│       ├── check-index-integrity.yml
│       └── check-index.yml
├── docs/
│   ├── architecture/
│   │   └── .gitkeep
│   └── suggestions/
│       └── tree-world-suggestion.md
├── scripts/
│   ├── build/
│   │   └── .gitkeep
│   ├── checks/
│   │   └── .gitkeep
│   ├── build-test-editor.mjs
│   ├── check-backup-restore.mjs
│   ├── check-editor-code-processing.mjs
│   ├── check-index-integrity.mjs
│   ├── check-settings-dialog-keyboard.mjs
│   └── check-standalone-editor.mjs
├── src/
│   ├── app/
│   │   └── .gitkeep
│   ├── features/
│   │   ├── backup-restore/
│   │   │   ├── backup-restore.css
│   │   │   └── backup-restore.js
│   │   ├── editor/
│   │   │   ├── autocomplete/
│   │   │   │   └── .gitkeep
│   │   │   ├── color-picker/
│   │   │   │   └── .gitkeep
│   │   │   ├── core/
│   │   │   │   └── .gitkeep
│   │   │   ├── editing-commands/
│   │   │   │   └── .gitkeep
│   │   │   ├── paste-processing/
│   │   │   │   └── .gitkeep
│   │   │   ├── search/
│   │   │   │   └── .gitkeep
│   │   │   └── syntax-highlighting/
│   │   │       └── .gitkeep
│   │   ├── export/
│   │   │   └── .gitkeep
│   │   ├── help/
│   │   │   └── .gitkeep
│   │   ├── libraries/
│   │   │   └── .gitkeep
│   │   ├── live-preview/
│   │   │   └── element-inspector.js
│   │   ├── quick-insert/
│   │   │   ├── quick-insert.css
│   │   │   └── quick-insert.js
│   │   ├── settings/
│   │   │   ├── settings.css
│   │   │   └── settings.js
│   │   ├── suggestions/
│   │   │   ├── data/
│   │   │   │   ├── css-suggestions.js
│   │   │   │   ├── html-suggestions.js
│   │   │   │   └── js-suggestions.js
│   │   │   ├── manager/
│   │   │   │   ├── suggestion-manager.css
│   │   │   │   └── suggestion-manager.js
│   │   │   └── next-word/
│   │   │       └── next-word-suggestions.js
│   │   ├── word-tree/
│   │   │   └── word-tree.js
│   │   └── workspace/
│   │       ├── file-manager/
│   │       │   ├── .gitkeep
│   │       │   ├── file-manager-drawer.js
│   │       │   ├── file-manager.css
│   │       │   └── file-manager.js
│   │       ├── project-storage/
│   │       │   └── .gitkeep
│   │       ├── search/
│   │       │   ├── search-header.css
│   │       │   └── search-header.js
│   │       └── toolbar/
│   │           ├── toolbar-sidebar.css
│   │           └── toolbar-sidebar.js
│   ├── shared/
│   │   ├── dom/
│   │   │   └── .gitkeep
│   │   ├── storage/
│   │   │   └── .gitkeep
│   │   ├── ui/
│   │   │   └── .gitkeep
│   │   └── validation/
│   │       └── .gitkeep
│   └── styles/
│       └── .gitkeep
├── tools/
│   └── build-single-file.js
├── index-test-etitor.html
├── index.html
├── README.md
├── script.js
└── style.css
```

## نقش مسیرهای اصلی

| مسیر | مسئولیت |
|---|---|
| `index.html` | سند HTML نسخهٔ اصلی و نقطهٔ ورود رابط کاربری |
| `style.css` | استایل‌های عمومی و مشترک رابط اصلی |
| `script.js` | منطق اصلی برنامه و اتصال بخش‌های مختلف |
| `index-test-etitor.html` | نسخهٔ مستقل/آزمایشی تولیدشده؛ باید پس از تغییر منابع، در صورت نیاز دوباره ساخته و اعتبارسنجی شود |
| `src/features/settings/` | منطق و استایل صفحهٔ تنظیمات |
| `src/features/workspace/file-manager/` | فایل‌های اختصاصی فایل‌منیجر: کنترل پنل کشویی، استایل، و نمایش آیتم‌ها |
| `src/features/workspace/toolbar/` | منطق و استایل سایدبار ابزارها |
| `src/features/workspace/search/` | هدر و جست‌وجوی محیط کار |
| `src/features/suggestions/` | بانک‌های پیشنهاد HTML/CSS/JavaScript، مدیریت و پیشنهاد ادامهٔ کلمه |
| `src/features/backup-restore/` | پشتیبان‌گیری و بازیابی |
| `src/features/word-tree/` | منطق درخت کلمات |
| `src/features/live-preview/` | بازرس عناصر پیش‌نمایش زنده |
| `src/features/quick-insert/` | درج سریع |
| `src/shared/` | جایگاه برنامه‌ریزی‌شده برای ابزارهای مشترک؛ پوشه‌های دارای فقط `.gitkeep` هنوز پیاده‌سازی ندارند |
| `scripts/` | اسکریپت‌های ساخت و بررسی خودکار |
| `tools/` | ابزارهای کمکی توسعه و ساخت |
| `.github/workflows/` | گردش‌کارهای خودکار بررسی و ساخت در GitHub Actions |
| `docs/` | مستندات پروژه |

## نکات دقت و نگهداری

- این درخت از مسیرهای واقعی ثبت‌شده در Git ساخته شده است؛ فایل یا پوشه‌ای صرفاً بر اساس برنامهٔ آینده به آن اضافه نشده است.
- وجود `.gitkeep` به معنی کامل‌بودن یا فعال‌بودن قابلیت متناظر نیست.
- فایل‌های ماژولار زیر `src/features/` در کنار منابع اصلی ریشه قرار دارند؛ انتقال کامل منطق از `script.js` و `style.css` به ماژول‌ها باید مرحله‌ای و با بررسی وابستگی‌ها انجام شود.
- `src/features/workspace/file-manager/file-manager-drawer.js` مسئول رفتار پنل کشویی فایل‌منیجر است؛ `file-manager.js` رندر آیتم‌ها را بر عهده دارد و `file-manager.css` استایل اختصاصی آن را نگه می‌دارد.
- `src/features/workspace/toolbar/toolbar-sidebar.js` و `toolbar-sidebar.css` به‌ترتیب منطق و ظاهر سایدبار ابزارها را نگه می‌دارند.
- بعد از تغییر منابع اصلی، وضعیت همگام‌بودن `index-test-etitor.html` را جداگانه بررسی کنید؛ به‌روزرسانی فایل‌های منبع به‌تنهایی تضمین نمی‌کند نسخهٔ مستقل نیز بازسازی شده باشد.
- اسکریپت‌های بررسی در `scripts/check-*.mjs` قرار دارند و گردش‌کارهای `.github/workflows/` آن‌ها را برای مسیرهای مشخص‌شده اجرا می‌کنند.
