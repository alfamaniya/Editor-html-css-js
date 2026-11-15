# راهنمای ساختار مخزن

این مخزن یک ویرایشگر تحت وب برای HTML، CSS و JavaScript است. برنامه بدون مرحلهٔ نصب وابستگی‌های npm اجرا می‌شود و صفحهٔ اصلی مستقیماً از `index.html` بارگذاری می‌شود.

## نقاط ورود

- `index.html`: ساختار رابط، پنل‌های ویرایش، پیش‌نمایش و اتصال فایل‌های قابلیت‌ها.
- `style.css`: استایل پایه و اجزای عمومی.
- `script.js`: منطق اصلی پروژه، ویرایشگرها، تاریخچه، ذخیره‌سازی، پیش‌نمایش و خروجی.
- `locales/fa.js` و `locales/en.js`: فرهنگ‌های فارسی و انگلیسی.
- `src/shared/i18n/i18n.js`: اعمال ترجمه و جهت RTL/LTR.

## ساختار قابلیت‌ها

```text
src/
├── features/
│   ├── backup-restore/
│   ├── editor/                 # جایگاه‌های رزروشده برای توسعهٔ بعدی
│   ├── quick-insert/
│   ├── settings/
│   ├── suggestions/
│   │   ├── data/
│   │   ├── manager/
│   │   └── next-word/
│   ├── word-tree/
│   └── workspace/
│       ├── file-manager/
│       ├── search/
│       └── toolbar/
├── shared/
│   └── i18n/
└── styles/                     # جایگاه رزروشده
```

ماژول‌های فعال شامل مدیریت فایل، نوار ابزار، جست‌وجو، درج سریع، تنظیمات، پیشنهاد کد، پشتیبان‌گیری/بازیابی و درخت واژه‌ها هستند. پوشه‌هایی که فقط `.gitkeep` دارند جایگاه رزروشده‌اند و قابلیت اجرایی محسوب نمی‌شوند.

پیش‌نمایش کد کاربر در iframe sandbox اجرا می‌شود. ارتباط آن با صفحهٔ میزبان برای خطاها و ذخیره‌سازی از طریق پیام‌ها انجام می‌شود. رابط اصلی به یک محیط واحد محدود است و ماژول یا پل جداگانه‌ای برای Visual Editor وجود ندارد.

## ساخت و کنترل کیفیت

اسکریپت‌های فعال در `scripts/` قرار دارند:

- `build-test-editor.mjs`: ساخت یک HTML مستقل از منابع اصلی در فایل موقت `index-test-etitor.html`.
- `check-standalone-editor.mjs`: بررسی ساختار HTML، ترتیب و تطابق دقیق منابع جاسازی‌شده و نحو JavaScript.
- `check-index-integrity.mjs`: بررسی توازن تگ‌ها و جداکننده‌های کد در `index.html`.
- `check-editor-code-processing.mjs`: آزمون پردازش و چسباندن HTML/CSS/JavaScript.
- سایر فایل‌های `check-*.mjs`: آزمون‌های متمرکز تنظیمات، رنگ، پشتیبان‌گیری و هم‌ترازی ویرایشگر.

اجرای بررسی‌های اصلی از ریشهٔ مخزن:

```bash
node scripts/check-index-integrity.mjs
node scripts/build-test-editor.mjs
node scripts/check-standalone-editor.mjs
node scripts/check-editor-code-processing.mjs
node scripts/check-settings-dialog-keyboard.mjs
node scripts/check-backup-restore.mjs
```

فایل `index-test-etitor.html` خروجی موقت آزمون ساخت است و منبع اصلی برنامه نیست. نسخهٔ منتشرشده از `index.html` و فایل‌های وابسته به آن تشکیل می‌شود.

## گردش‌کارهای GitHub

- `.github/workflows/check-index.yml`: ساخت و اجرای بررسی‌های خودکار.
- `.github/workflows/check-index-integrity.yml`: بررسی مستقل یکپارچگی HTML.
- `.github/workflows/deploy-pages.yml`: انتشار مخزن در GitHub Pages.
- `.github/workflows/company-delivery.yml`: ارسال دستی نسخهٔ مستقل ساخته‌شده، پس از تأیید صریح و تنظیم Secrets مربوط به SMTP.

## نکات نگهداری

- تغییرات رابط را در فایل‌های منبع انجام دهید، نه در خروجی موقت ساخت.
- هنگام افزودن فایل CSS/JavaScript جدید به `index.html`، فهرست منابع در سازنده و اعتبارسنج مستقل را نیز به‌روزرسانی کنید.
- پوشه‌های رزروشده را تا زمان افزودن پیاده‌سازی واقعی، به‌عنوان ماژول فعال مستند نکنید.
- آزمون‌های اسکریپتی سناریوهای تعریف‌شده را پوشش می‌دهند؛ برای اطمینان از تجربهٔ کاربری، بررسی دستی در مرورگرهای هدف نیز لازم است.
