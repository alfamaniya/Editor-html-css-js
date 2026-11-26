# Editor HTML / CSS / JavaScript

ویرایشگر تحت وب برای نوشتن و اجرای زندهٔ کدهای HTML، CSS و JavaScript. این مخزن شامل ویرایشگر اصلی، پیش‌نمایش زنده، مدیریت فایل‌ها، پیشنهاد کد، تنظیمات و ابزارهای ساخت و اعتبارسنجی است.

> **مرجع توسعه:** فایل‌های `index.html`، `style.css`، `script.js` و ماژول‌های `src/` منابع اصلی پروژه هستند. خروجی مستقل با اسکریپت ساخت تولید می‌شود.

## ساختار اصلی

```text
Editor-html-css-js/
├── .github/workflows/
│   ├── check-index.yml
│   ├── company-delivery.yml
│   └── deploy-pages.yml
├── docs/
│   ├── architecture/
│   └── suggestions/
├── index.html
├── index 2.html
├── locales/
├── package.json
├── package-lock.json
├── script.js
├── style.css
├── scripts/
│   ├── build-test-editor.mjs
│   ├── build-codemirror.mjs
│   ├── codemirror-entry.js
│   ├── check-index-integrity.mjs
│   └── check-*.mjs
├── src/
│   ├── features/
│   │   ├── backup-restore/
│   │   ├── quick-insert/
│   │   ├── settings/
│   │   ├── suggestions/
│   │   ├── word-tree/
│   │   └── workspace/
│   └── shared/
└── tools/
    └── build-single-file.js
```

## فایل‌های اصلی

| مسیر | مسئولیت |
|---|---|
| `index.html` | ساختار رابط ویرایشگر، پنل‌های HTML/CSS/JS و پیش‌نمایش |
| `style.css` | استایل عمومی، چیدمان و واکنش‌گرایی |
| `script.js` | منطق اصلی ویرایشگر، مدیریت کد و پیش‌نمایش |
| `locales/fa.js` و `locales/en.js` | متن‌های رابط فارسی و انگلیسی |
| `package.json` | فرمان‌های npm و وابستگی‌های توسعه |
| `scripts/build-test-editor.mjs` | تولید نسخهٔ مستقل از منابع اصلی |
| `scripts/check-standalone-editor.mjs` | بررسی خروجی مستقل در برابر منابع |
| `scripts/check-index-integrity.mjs` | بررسی یکپارچگی فایل ورودی |

## قابلیت‌های ماژولار

- `src/features/backup-restore/`: تهیه و بازیابی نسخهٔ پشتیبان
- `src/features/quick-insert/`: درج سریع قطعه‌کد
- `src/features/settings/`: تنظیمات ویرایشگر
- `src/features/suggestions/`: پیشنهادهای HTML، CSS و JavaScript
- `src/features/word-tree/`: درخت واژگان
- `src/features/workspace/file-manager/`: مدیریت فایل‌ها
- `src/features/workspace/search/`: جست‌وجو در کد
- `src/features/workspace/toolbar/`: نوار ابزار کناری
- `src/shared/i18n/`: زیرساخت بین‌المللی‌سازی

## نصب و فرمان‌ها

پیش‌نیاز: Node.js و npm.

```bash
npm install
npm run test
```

| فرمان | عملکرد |
|---|---|
| `npm run test` | اجرای بررسی یکپارچگی ورودی |
| `npm run check:index` | اجرای مستقیم بررسی یکپارچگی `index.html` |
| `npm run build:main` | ساخت خروجی مستقل `index-test-etitor.html` |
| `npm run check:main` | اعتبارسنجی خروجی مستقل |
| `npm run build:all` | ساخت و اعتبارسنجی خروجی مستقل |
| `npm run build:codemirror` | ساخت bundle محلی CodeMirror با esbuild |

## ساخت خروجی مستقل

```bash
npm run build:main
npm run check:main
```

سورس اصلی در `index.html` و فایل‌های CSS/JavaScript معرفی‌شده در manifest اسکریپت ساخت قرار دارد. خروجی `index-test-etitor.html` یک فایل تولیدی است و نباید به‌صورت دستی ویرایش شود.

## GitHub Actions

- `.github/workflows/deploy-pages.yml`: انتشار سایت با GitHub Pages.
- `.github/workflows/company-delivery.yml`: آماده‌سازی و ارسال نسخهٔ Main Editor از طریق ایمیل؛ نیازمند Secrets مربوط به SMTP.
- `.github/workflows/check-index.yml`: گردش‌کار کنترل کیفیت قدیمی؛ وضعیت فعال‌بودن job باید در خود فایل بررسی شود.

## موارد شناخته‌شده

- پیوند Futures Editor در `index.html` به مسیر حذف‌شدهٔ `futures/index.html` اشاره می‌کند و باید جداگانه اصلاح شود.
- `scripts/build-codemirror.mjs` خروجی CodeMirror را در مسیر قدیمی `futures/editor/core/codemirror.js` می‌نویسد؛ این مسیر با حذف Futures سازگار نیست.
- در `package.json` وابستگی Playwright تعریف نشده، در حالی که بعضی اسکریپت‌های بررسی مرورگری ممکن است به آن نیاز داشته باشند.
- آزمون کامل مرورگری و اجرای همهٔ فرمان‌های ساخت در این تغییر انجام نشده است.

