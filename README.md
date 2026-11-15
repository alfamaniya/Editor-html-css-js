# ساختار و معماری مخزن

این سند نقشهٔ واقعی فایل‌ها و پوشه‌های مخزن **Editor-html-css-js** را نشان می‌دهد. درخت زیر از ساختار ثبت‌شده در شاخهٔ اصلی استخراج شده و توضیح هر بخش بر اساس نقش فایل‌ها، نقاط ورود، وابستگی‌ها و مسئولیت کد آن‌ها نوشته شده است.

## درخت مخزن

```text
Editor-html-css-js/
├── .github/
│   └── workflows/
│       ├── check-index-integrity.yml
│       ├── check-index.yml
│       ├── company-delivery.yml
│       └── deploy-pages.yml
├── docs/
│   ├── architecture/
│   │   └── .gitkeep
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
│   ├── build-combined-editor.mjs
│   ├── build-standalone-visual-editor.mjs
│   ├── build-test-editor.mjs
│   ├── check-backup-restore.mjs
│   ├── check-color-picker.mjs
│   ├── check-combined-editor-browser.mjs
│   ├── check-combined-editor.mjs
│   ├── check-editor-code-processing.mjs
│   ├── check-editor-overlay-alignment.mjs
│   ├── check-index-integrity.mjs
│   ├── check-settings-button-placement.mjs
│   ├── check-settings-dialog-keyboard.mjs
│   ├── check-standalone-editor.mjs
│   └── check-standalone-visual-editor.mjs
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
│   │   ├── visual-editor/
│   │   │   ├── README.md
│   │   │   ├── visual-editor-remote.js
│   │   │   ├── visual-editor-session.js
│   │   │   ├── visual-editor.css
│   │   │   ├── visual-editor.html
│   │   │   └── visual-editor.js
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
├── editor v.html
├── index.html
├── script.js
├── style.css
└── README.md
```

## نمای کلی معماری

پروژه یک برنامهٔ وب سمت کاربر و بدون زنجیرهٔ ساخت مبتنی بر npm است. صفحهٔ اصلی با HTML و CSS بارگذاری می‌شود و منطق مرکزی در `script.js` قرار دارد. قابلیت‌هایی که از هسته جدا شده‌اند در `src/features/` نگهداری می‌شوند و صفحهٔ اصلی آن‌ها را به‌صورت فایل‌های JavaScript و CSS مستقل وارد می‌کند.

دو محیط اصلی وجود دارد:

1. **Editor** برای مدیریت فایل‌های پروژه و نوشتن HTML، CSS و JavaScript.
2. **Visual Editor** برای انتخاب المان، تنظیم ظاهر و تعریف تعامل‌های بصری.

فایل `editor v.html` خروجی بسته‌بندی‌شدهٔ قابل‌انتشار است؛ دو سند مستقل در آن جاسازی شده‌اند و در دو iframe جدا اجرا می‌شوند. فایل‌های `index.html` و `src/features/visual-editor/visual-editor.html` منابع قابل توسعه‌اند، نه جایگزین خروجی بسته‌بندی‌شده.

## فایل‌های ریشه

| فایل | مسئولیت |
|---|---|
| `index.html` | ساختار رابط Editor، پنل‌ها، ویرایشگرها، پیش‌نمایش و نقاط اتصال ماژول‌ها؛ فایل ورودی توسعهٔ محیط اصلی است. |
| `style.css` | استایل پایه و اجزای عمومی رابط Editor، چیدمان فضای کاری، ویرایشگرها و پیش‌نمایش. |
| `script.js` | هستهٔ اجرایی برنامه: مدیریت وضعیت و پروژه، ویرایش HTML/CSS/JS، تاریخچه، پیش‌نمایش، کتابخانه‌ها، پردازش کد چسبانده‌شده، پیشنهادهای درون‌ویرایشگر و اتصال قابلیت‌ها. |
| `editor v.html` | نسخهٔ نهایی یکپارچه؛ شامل پوستهٔ مشترک و دو سند جاسازی‌شده برای Editor و Visual Editor. این فایل از اسکریپت‌های ساخت تولید می‌شود. |
| `README.md` | همین مستند معماری و راهنمای پیمایش مخزن. |

## ماژول‌های `src/features`

### مدیریت پروژه و تجربهٔ محیط کار

| مسیر | نقش و جزئیات |
|---|---|
| `workspace/file-manager/file-manager.js` | منطق فایل‌منیجر و اتصال عملیات فایل به رابط اصلی. |
| `workspace/file-manager/file-manager-drawer.js` | کنترل باز و بسته‌شدن کشوی فایل‌منیجر، پس‌زمینه، رویدادهای صفحه‌کلید و رویدادهای سفارشی محیط کار. |
| `workspace/file-manager/file-manager.css` | ظاهر فهرست فایل‌ها و کشوی مدیریت فایل. |
| `workspace/search/search-header.js` | رفتار نوار جست‌وجوی سربرگ و کنترل‌های وابسته به آن. |
| `workspace/search/search-header.css` | چیدمان و ظاهر پنل جست‌وجوی سربرگ. |
| `workspace/toolbar/toolbar-sidebar.js` | رفتار سایدبار ابزارها و کنترل نمایش آن. |
| `workspace/toolbar/toolbar-sidebar.css` | استایل سایدبار ابزارها. |
| `workspace/project-storage/` | محل رزروشده برای جداسازی لایهٔ ذخیره‌سازی پروژه؛ در حال حاضر فقط فایل نگهدارندهٔ پوشه دارد. |

### ویرایش بصری و پیش‌نمایش

| مسیر | نقش و جزئیات |
|---|---|
| `visual-editor/visual-editor.html` | ساختار سند مستقل استودیوی طراحی بصری و پنل‌های آن. |
| `visual-editor/visual-editor.css` | استایل بوم، پالت اجزا، پنل ویژگی‌ها و پنجرهٔ کد Visual Editor. |
| `visual-editor/visual-editor.js` | منطق اصلی طراحی: ساخت و انتخاب اجزا، بوم، تنظیم ویژگی‌ها، تولید HTML/CSS/JavaScript، رفتارهای تعاملی و همگام‌سازی طراحی با کد. |
| `visual-editor/visual-editor-session.js` | ابزار تراکنشی برای نگهداری وضعیت اولیه، اعمال تغییرات موقت، ثبت یا بازگردانی تغییرات DOM. |
| `visual-editor/visual-editor-remote.js` | پل پیام‌رسانی میان Editor اصلی، پوستهٔ یکپارچه و Visual Editor برای انتخاب و ویرایش المان زنده در پیش‌نمایش. |
| `visual-editor/README.md` | قرارداد داخلی انتخاب المان، پیام‌رسانی، ثبت تغییرات، انصراف و آزمون مرورگری این قابلیت. |
| `live-preview/element-inspector.js` | تزریق ابزار انتخاب المان به پیش‌نمایش، استخراج مشخصات و تلاش برای یافتن تگ HTML، قانون CSS و ارجاع JavaScript متناظر در فایل‌های پروژه. |

### پیشنهاد کد و درج سریع

| مسیر | نقش و جزئیات |
|---|---|
| `quick-insert/quick-insert.js` | ساخت نوار درج سریع، رندر آیتم‌ها بر اساس زبان و واکنش به تغییر فهرست آیتم‌ها. |
| `quick-insert/quick-insert.css` | ظاهر نوار و آیتم‌های درج سریع. |
| `suggestions/data/html-suggestions.js` | داده‌های پیشنهاد تگ‌ها، ویژگی‌ها و مقادیر HTML. |
| `suggestions/data/css-suggestions.js` | داده‌های ویژگی‌ها، مقادیر و ساختارهای پیشنهادی CSS. |
| `suggestions/data/js-suggestions.js` | داده‌های پیشنهاد و تکمیل کد JavaScript. |
| `suggestions/next-word/next-word-suggestions.js` | قواعد زمینه‌محور پیشنهاد ادامهٔ کد، قطعه‌کدها و تکمیل واژهٔ بعدی برای زبان‌های پشتیبانی‌شده. |
| `suggestions/manager/suggestion-manager.js` | مدیریت بانک‌ها و دسته‌ها، افزودن و ویرایش واژه‌ها، مرتب‌سازی، فیلتر، شناسه‌های سفارشی و ذخیرهٔ تغییرات پیشنهادها. |
| `suggestions/manager/suggestion-manager.css` | ظاهر پنجره و درخت مدیریت پیشنهادها. |

### تنظیمات، داده و ابزارهای کمکی

| مسیر | نقش و جزئیات |
|---|---|
| `settings/settings.js` | بارگذاری و اعتبارسنجی تنظیمات، اعمال پوسته و گزینه‌ها، ذخیره‌سازی، کنترل پنجرهٔ تنظیمات و مدیریت فهرست درج سریع و تنظیمات کتابخانه‌های داخلی. |
| `settings/settings.css` | ظاهر صفحه، بخش‌ها و پنجره‌های تنظیمات. |
| `backup-restore/backup-restore.js` | ساخت نسخهٔ پشتیبان، خواندن و اعتبارسنجی دادهٔ ورودی، نرمال‌سازی بخش‌ها، ادغام کنترل‌شده و اعمال تغییرات ذخیره‌سازی. |
| `backup-restore/backup-restore.css` | استایل رابط پشتیبان‌گیری و بازیابی. |
| `word-tree/word-tree.js` | ساخت درخت مرور واژه‌ها و نمادهای HTML/CSS/JavaScript، فیلتر و گسترش شاخه‌ها و نمایش مثال قابل کپی. |

## زیرساخت مشترک و پوشه‌های رزروشده

| مسیر | وضعیت و مسئولیت |
|---|---|
| `src/shared/i18n/i18n.js` | زیرساخت تغییر زبان فارسی/انگلیسی، جهت RTL/LTR، ترجمهٔ متن و ویژگی‌های رابط، همگام‌سازی زبان میان فریم‌ها و ذخیرهٔ انتخاب زبان. |
| `src/shared/dom/` | محل رزروشده برای ابزارهای مشترک DOM؛ فعلاً فقط `.gitkeep` دارد. |
| `src/shared/storage/` | محل رزروشده برای انتزاع ذخیره‌سازی مشترک؛ فعلاً فقط `.gitkeep` دارد. |
| `src/shared/ui/` | محل رزروشده برای اجزای رابط مشترک؛ فعلاً فقط `.gitkeep` دارد. |
| `src/shared/validation/` | محل رزروشده برای اعتبارسنجی مشترک؛ فعلاً فقط `.gitkeep` دارد. |
| `src/app/` | محل رزروشده برای نقطهٔ ترکیب یا راه‌اندازی برنامه؛ فعلاً فقط `.gitkeep` دارد. |
| `src/styles/` | محل رزروشده برای تفکیک استایل‌های مشترک؛ فعلاً فقط `.gitkeep` دارد. |
| `src/features/editor/` | زیرشاخه‌های autocomplete، color-picker، core، editing-commands، paste-processing، search و syntax-highlighting فعلاً فقط فایل‌های `.gitkeep` دارند؛ پیاده‌سازی اجرایی متناظر عمدتاً در هسته یا ماژول‌های موجود دیگر قرار دارد. |
| `src/features/export/`، `help/` و `libraries/` | پوشه‌های رزروشده با `.gitkeep`؛ وجود آن‌ها به معنی وجود ماژول مستقل در این مسیرها نیست. |

## زبان‌ها و بومی‌سازی

| مسیر | مسئولیت |
|---|---|
| `locales/fa.js` | فرهنگ واژگان فارسی رابط کاربری. |
| `locales/en.js` | فرهنگ واژگان انگلیسی رابط کاربری. |
| `src/shared/i18n/i18n.js` | مصرف فرهنگ‌ها، اعمال زبان و جهت نوشتار و هماهنگی تغییر زبان. |

## ابزارهای ساخت و اعتبارسنجی در `scripts/`

### سازنده‌ها

| فایل | عملکرد |
|---|---|
| `build-test-editor.mjs` | گردآوری منابع Editor اصلی و تولید سند واسط موردنیاز مرحلهٔ بسته‌بندی. |
| `build-standalone-visual-editor.mjs` | گردآوری HTML، CSS و JavaScript محیط بصری در یک سند مستقل. |
| `build-combined-editor.mjs` | خواندن دو سند مستقل، جاسازی محتوای آن‌ها در پوستهٔ یکپارچه و تولید `editor v.html`. |
| `build-single-file.js` | ورودی سازگاری برای اجرای سازندهٔ Editor؛ منطق اصلی ساخت در اسکریپت‌های ماژولار `.mjs` قرار دارد. |

### آزمون‌ها و کنترل‌های کیفیت

| فایل | حوزهٔ بررسی |
|---|---|
| `check-index-integrity.mjs` | ساختار و یکپارچگی نشانه‌گذاری HTML و جداکننده‌های سند اصلی. |
| `check-editor-code-processing.mjs` | پردازش کد ورودی/چسبانده‌شده و تفکیک محتوای HTML، CSS و JavaScript. |
| `check-color-picker.mjs` | رفتار و اتصال انتخاب‌گر رنگ و قالب‌های رنگی. |
| `check-settings-button-placement.mjs` | محل و یکتایی کنترل تنظیمات در رابط. |
| `check-settings-dialog-keyboard.mjs` | رفتار صفحه‌کلید و جابه‌جایی تمرکز در پنجره‌های تنظیمات. |
| `check-backup-restore.mjs` | اعتبارسنجی قالب پشتیبان، داده‌ها، ادغام و بازیابی. |
| `check-editor-overlay-alignment.mjs` | هم‌ترازی لایه‌های ویرایشگر و نمایش متن/انتخاب. |
| `check-standalone-editor.mjs` | صحت سند مستقل Editor، منابع جاسازی‌شده و ارجاع‌های باقی‌مانده. |
| `check-standalone-visual-editor.mjs` | صحت بستهٔ مستقل Visual Editor. |
| `check-combined-editor.mjs` | تطابق محتوای جاسازی‌شده با اسناد منبع، ساختار پوسته و نحو JavaScript. |
| `check-combined-editor-browser.mjs` | آزمون مرورگری مسیرهای تعاملی نسخهٔ یکپارچه، از جمله انتخاب و ویرایش بصری. |

پوشه‌های `scripts/build/` و `scripts/checks/` فعلاً فقط فایل نگهدارنده دارند؛ اسکریپت‌های فعال ساخت و بررسی در خود پوشهٔ `scripts/` قرار گرفته‌اند.

## گردش‌کارهای خودکار GitHub

| فایل | مسئولیت |
|---|---|
| `.github/workflows/check-index.yml` | اجرای کنترل‌های اصلی کیفیت و آزمون‌های مرتبط با فایل‌های برنامه در رویدادهای تعریف‌شدهٔ GitHub Actions. |
| `.github/workflows/check-index-integrity.yml` | اجرای مستقل بررسی یکپارچگی ساختار سند اصلی. |
| `.github/workflows/deploy-pages.yml` | ساخت و انتشار محتوای مخزن در GitHub Pages. |
| `.github/workflows/company-delivery.yml` | گردش‌کار دستی ارسال محتوای فایل یکپارچه از طریق SMTP؛ اجرای ارسال به تأیید ورودی گردش‌کار و پیکربندی Secrets نیاز دارد. |

## مستندات و ابزارهای جانبی

| مسیر | مسئولیت |
|---|---|
| `docs/suggestions/tree-world-suggestion.md` | سند پیشنهادها و ایده‌های مرتبط با توسعهٔ درخت واژه‌ها؛ سند مرجع توسعه است و به‌عنوان کد اجرایی بارگذاری نمی‌شود. |
| `docs/architecture/` | محل رزروشده برای مستندات معماری تکمیلی؛ فعلاً فقط `.gitkeep` دارد. |
| `tools/build-single-file.js` | اسکریپت واسط قدیمی/سازگاری برای واگذاری فرایند ساخت به ابزار اصلی در `scripts/`. |

## جریان اجرای برنامه

1. مرورگر سند `index.html` را بارگذاری می‌کند؛ در میزبانی HTTP، صفحه می‌تواند ورود را به نسخهٔ یکپارچهٔ `editor v.html` هدایت کند.
2. `index.html` استایل پایه و استایل ماژول‌ها را بارگذاری می‌کند و `script.js` هستهٔ محیط ویرایش را راه‌اندازی می‌کند.
3. ماژول‌های `src/features/` قابلیت‌های مستقل را به هسته متصل می‌کنند؛ داده‌های پیشنهاد و فرهنگ‌های زبان نیز از فایل‌های جداگانه تأمین می‌شوند.
4. پیش‌نمایش پروژه در iframe اجرا می‌شود. ابزارهای انتخاب المان و ویرایش بصری از طریق پیام‌های بین فریمی با محیط میزبان ارتباط برقرار می‌کنند.
5. در نسخهٔ یکپارچه، پوستهٔ ساخته‌شده در `build-combined-editor.mjs` دو سند مستقل را در iframeهای مجزا قرار می‌دهد و جابه‌جایی محیط‌ها و پیام‌رسانی میان آن‌ها را مدیریت می‌کند.

## ساخت نسخهٔ یکپارچه

فرایند ساخت از ریشهٔ مخزن و با Node.js اجرا می‌شود. ترتیب کلی مراحل:

```bash
node scripts/build-test-editor.mjs
node scripts/check-standalone-editor.mjs
node scripts/build-standalone-visual-editor.mjs
node scripts/check-standalone-visual-editor.mjs
node scripts/build-combined-editor.mjs
node scripts/check-combined-editor.mjs
```

آزمون مرورگری نسخهٔ یکپارچه نیز با اجرای `scripts/check-combined-editor-browser.mjs` انجام می‌شود و به محیط Chromium و پیش‌نیازهای تعریف‌شده در خود اسکریپت نیاز دارد.

## مرزهای معماری فعلی

- هستهٔ Editor هنوز در `script.js` متمرکز است؛ همهٔ قابلیت‌ها به ماژول‌های مستقل منتقل نشده‌اند.
- پوشه‌های دارای `.gitkeep` صرفاً جایگاه‌های رزروشده‌اند و نباید به‌عنوان قابلیت پیاده‌سازی‌شده معرفی شوند.
- فایل `editor v.html` خروجی تولیدی است؛ تغییر پایدار منطق باید در منابع ورودی و اسکریپت‌های ساخت اعمال شود.
- فایل‌های `locales/fa.js` و `locales/en.js` دادهٔ ترجمه‌اند؛ منطق اعمال ترجمه در `src/shared/i18n/i18n.js` است.
- آزمون‌های اسکریپتی و مرورگری، سناریوهای تعریف‌شده در مخزن را کنترل می‌کنند و به‌تنهایی جایگزین ارزیابی دستی همهٔ مرورگرها و رفتارهای کاربر نیستند.
