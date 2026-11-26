# Editor HTML / CSS / JavaScript

ویرایشگر تحت وب برای نوشتن و اجرای زندهٔ کدهای HTML، CSS و JavaScript. این مخزن شامل رابط اصلی ویرایشگر، پیش‌نمایش زنده، مدیریت فایل‌ها، پیشنهاد کد، تنظیمات، ترجمه‌ها و ابزارهای ساخت و اعتبارسنجی است.

> **مرجع توسعه:** فایل‌های `index.html`، `style.css`، `script.js` و ماژول‌های `src/` منابع اصلی پروژه هستند. فایل مستقل از طریق اسکریپت ساخت تولید می‌شود.

## ساختار مخزن

درخت زیر با ساختار فعلی شاخه `main` هماهنگ شده است. فایل‌ها و پوشه‌های خالیِ نگه‌دارندهٔ مسیر نیز نمایش داده شده‌اند.

```text
Editor-html-css-js/
├── .github/
│   └── workflows/
│       ├── check-index.yml
│       ├── company-delivery.yml
│       └── deploy-pages.yml
├── docs/
│   ├── architecture/
│   │   ├── main-files-audit.md
│   │   └── ui-sections-structure.md
│   └── suggestions/
│       └── tree-world-suggestion.md
├── locales/
│   ├── en.js
│   └── fa.js
├── scripts/
│   ├── build/
│   │   └── .gitkeep
│   ├── checks/
│   │   └── .gitkeep
│   ├── build-codemirror.mjs
│   ├── build-test-editor.mjs
│   ├── check-backup-restore.mjs
│   ├── check-color-picker.mjs
│   ├── check-editor-code-processing.mjs
│   ├── check-editor-overlay-alignment.mjs
│   ├── check-index-integrity.mjs
│   ├── check-settings-button-placement.mjs
│   ├── check-settings-dialog-keyboard.mjs
│   ├── check-standalone-editor.mjs
│   └── codemirror-entry.js
├── src/
│   ├── app/
│   │   └── .gitkeep
│   ├── features/
│   │   ├── backup-restore/
│   │   │   ├── backup-restore.css
│   │   │   └── backup-restore.js
│   │   ├── export/
│   │   │   └── .gitkeep
│   │   ├── help/
│   │   │   └── .gitkeep
│   │   ├── libraries/
│   │   │   └── .gitkeep
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
│   │   ├── i18n/
│   │   │   └── i18n.js
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
├── .gitignore
├── index 2.html
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── script.js
└── style.css
```

## فایل‌های اصلی

| مسیر | مسئولیت |
|---|---|
| `index.html` | ساختار رابط ویرایشگر، پنل‌های HTML/CSS/JS و پیش‌نمایش |
| `style.css` | استایل عمومی، چیدمان و واکنش‌گرایی |
| `script.js` | منطق اصلی ویرایشگر، مدیریت کد و پیش‌نمایش زنده |
| `locales/fa.js` و `locales/en.js` | متن‌های رابط فارسی و انگلیسی |
| `src/features/` | پیاده‌سازی قابلیت‌های مستقل ویرایشگر |
| `src/shared/` | ماژول‌های مشترک بین قابلیت‌ها |
| `scripts/` | اسکریپت‌های ساخت و بررسی کیفیت |
| `docs/` | مستندات معماری و پیشنهادهای توسعه |
| `package.json` | فرمان‌های npm و وابستگی‌های توسعه |

## قابلیت‌های ماژولار

- `src/features/backup-restore/`: تهیه و بازیابی نسخهٔ پشتیبان
- `src/features/quick-insert/`: درج سریع قطعه‌کد
- `src/features/settings/`: تنظیمات ویرایشگر
- `src/features/suggestions/`: پیشنهادهای HTML، CSS و JavaScript و تکمیل کلمهٔ بعدی
- `src/features/word-tree/`: درخت واژگان
- `src/features/workspace/file-manager/`: مدیریت فایل‌ها
- `src/features/workspace/search/`: جست‌وجو در کد
- `src/features/workspace/toolbar/`: نوار ابزار کناری
- `src/shared/i18n/`: زیرساخت بین‌المللی‌سازی

## نصب و فرمان‌ها

پیش‌نیاز: Node.js و npm.

```bash
npm install
npm test
```

| فرمان | عملکرد |
|---|---|
| `npm test` | اجرای بررسی یکپارچگی فایل ورودی |
| `npm run check:index` | بررسی یکپارچگی `index.html` |
| `npm run build:main` | تولید خروجی مستقل با اسکریپت `build-test-editor.mjs` |
| `npm run check:main` | اعتبارسنجی خروجی مستقل |
| `npm run build:all` | ساخت CodeMirror، ساخت خروجی مستقل و اعتبارسنجی آن |
| `npm run build:codemirror` | ساخت bundle محلی CodeMirror با esbuild |

## ساخت خروجی مستقل

```bash
npm run build:main
npm run check:main
```

سورس اصلی در `index.html` و فایل‌های CSS/JavaScript معرفی‌شده در اسکریپت ساخت قرار دارد. خروجی تولیدشده یک فایل build است و نباید به‌صورت دستی ویرایش شود.

## GitHub Actions

- `.github/workflows/deploy-pages.yml`: ساخت و انتشار سایت با GitHub Pages.
- `.github/workflows/check-index.yml`: گردش‌کار بررسی فایل ورودی.
- `.github/workflows/company-delivery.yml`: آماده‌سازی و ارسال نسخهٔ Main Editor از طریق ایمیل؛ اجرای موفق آن به Secrets مربوط به SMTP نیاز دارد.

## نکته دربارهٔ ساختار

این درخت، فایل‌ها و مسیرهای ثبت‌شده در مخزن را نشان می‌دهد؛ پوشه‌هایی که فقط فایل `.gitkeep` دارند محل‌های رزروشده برای توسعهٔ بعدی هستند و لزوماً در حال حاضر ماژول اجرایی ندارند.
