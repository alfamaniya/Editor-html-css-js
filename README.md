# ویرایشگر HTML / CSS / JavaScript

ویرایشگر تحت وب برای نوشتن و آزمایش HTML، CSS و JavaScript با پیش‌نمایش زنده، تکمیل خودکار، مدیریت فایل‌های مجازی، کتابخانه‌ها و دریافت خروجی. نسخهٔ اصلی بدون نصب پکیج یا Build اجرا می‌شود.

## قابلیت‌ها

- ویرایش جداگانهٔ HTML، CSS و JavaScript با رنگ‌آمیزی نحوی، شمارهٔ خطوط، Undo/Redo و جست‌وجو.
- پیش‌نمایش زنده در محیط محدودشدهٔ `iframe`.
- پیشنهادهای زمینه‌ای کد و ابزار **Word Tree**؛ این امکانات جایگزین IDE یا تحلیل‌گر کامل زبان نیستند.
- مدیریت فایل‌های مجازی و کتابخانه‌های CSS/JavaScript.
- ذخیره‌سازی در `localStorage` و امکان دریافت نسخهٔ بازیابی در برخی خطاها.
- سکشن «ظاهر برنامه» در تنظیمات؛ استایل و منطق آن در `settings.css` و `settings.js` نگهداری می‌شوند.
- خروجی به‌صورت یک فایل HTML مستقل یا بستهٔ چهار‌فایلی.

## اجرا

1. مخزن را Clone یا دریافت کنید.
2. فایل `index.html` را در مرورگر باز کنید.
3. اگر ذخیره‌سازی در حالت `file://` درست کار نکرد، از وب‌سرور محلی استفاده کنید.

برای اجرای اسکریپت‌های ساخت و بررسی، **Node.js 20** لازم است:

```bash
node scripts/check-index-integrity.mjs
node scripts/build-test-editor.mjs
node scripts/check-standalone-editor.mjs
```

فایل `index-test-etitor.html` خروجی تولیدشده است؛ فایل‌های منبع را ویرایش کنید و خروجی را دوباره بسازید.

## راهنمای کوتاه

- تب‌های HTML، CSS و JavaScript برای ویرایش کدها هستند.
- فهرست فایل‌ها، فایل‌های مجازی داخل برنامه را مدیریت می‌کند و مستقیماً فایل‌های دیسک را بازنویسی نمی‌کند.
- پیش‌نمایش پس از وقفه‌ای کوتاه به‌روز می‌شود؛ محدودیت‌های `sandbox` ممکن است بعضی قابلیت‌ها را مسدود کند.
- کتابخانه‌های آمادهٔ CDN به اینترنت نیاز دارند.
- در بخش **Download**، خروجی HTML مستقل یا بسته‌ای شامل `نام.html`، `نام.css`، `نام.js` و `نام.libs.txt` دریافت کنید.

## ذخیره‌سازی و محدودیت‌ها

- داده‌های پروژه در `localStorage` همان مرورگر ذخیره می‌شوند و ممکن است با پاک‌کردن داده‌های مرورگر از بین بروند؛ از پروژه‌های مهم پشتیبان بگیرید.
- نمایش آخرین کامیت و دریافت کتابخانه از CDN به اینترنت وابسته است.
- آزمون‌های خودکار، جایگزین بررسی دستی پیش‌نمایش، ذخیره‌سازی و دانلود در مرورگر نیستند.

## ساختار مخزن

```text
.
├── .github/workflows/
│   ├── build-test-editor.yml
│   ├── check-index-integrity.yml
│   └── check-index.yml
├── scripts/
│   ├── build-test-editor.mjs
│   ├── check-index-integrity.mjs
│   └── check-standalone-editor.mjs
├── tools/build-single-file.js
├── index.html
├── index-test-etitor.html
├── style.css
├── settings.css
├── script.js
├── settings.js
├── github-update.js
├── word-tree.js
├── html-suggestions.js
├── css-suggestions.js
├── js-suggestions.js
├── next-word-suggestions.js
├── tree-world-suggestion.md
└── README.md
```

| فایل | کاربرد |
|---|---|
| `index.html`، `style.css`، `script.js` | ساختار صفحه، ظاهر و منطق اصلی ویرایشگر |
| `settings.css`، `settings.js` | استایل پنل تنظیمات و منطق سکشن ظاهر برنامه |
| `html-suggestions.js`، `css-suggestions.js`، `js-suggestions.js` | بانک پیشنهادهای زبان‌ها |
| `next-word-suggestions.js`، `word-tree.js` | پیشنهاد ادامهٔ کد و نمایش Word Tree |
| `github-update.js` | نمایش زمان آخرین کامیت GitHub |
| `scripts/` و `tools/` | بررسی و ساخت خروجی تک‌فایلی |
| `index-test-etitor.html` | خروجی تک‌فایلی تولیدشده برای آزمایش |

## GitHub Actions و آزمون‌ها

- **Build standalone test editor:** فقط دستی از مسیر **Actions → Build standalone test editor → Run workflow** اجرا می‌شود؛ خروجی را می‌سازد و اعتبارسنجی می‌کند و در صورت تغییر، آن را کامیت می‌کند.
- **Check index syntax and delimiters:** ساختار تگ‌ها، جداکننده‌ها و نحو JavaScript درون‌خطی را بررسی می‌کند.
- **Check index file:** ساختار پایهٔ HTML و ارجاع‌های محلی را بررسی می‌کند.

گزارش اجراها در زبانهٔ **Actions** مخزن قرار دارد. نام `index-test-etitor.html` مطابق نام فعلی پروژه است و اسکریپت‌های ساخت به آن وابسته‌اند.

## منابع

- [HTML در MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference)
- [CSS در MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- [JavaScript در MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [مستندات Emmet](https://docs.emmet.io/abbreviations/)
- [استاندارد HTML در WHATWG](https://html.spec.whatwg.org/multipage/)
