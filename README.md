# Editor HTML / CSS / JavaScript

ویرایشگر تحت وب برای نوشتن و اجرای زندهٔ کدهای HTML، CSS و JavaScript. مخزن شامل ویرایشگر اصلی، محیط ویرایش بصری، ابزارهای ساخت خروجی مستقل، آزمون‌های Node.js و گردش‌کارهای GitHub Actions است.

> **مرجع توسعه:** نسخهٔ چندفایلی شامل `index.html`، `style.css`، `script.js` و فایل‌های مرتبط در `src/` است. فایل‌های مستقل و فایل یکپارچه خروجی‌های تولیدشده‌اند و نباید به‌عنوان منبع اصلی توسعه ویرایش شوند.

## فهرست مطالب

- [ساختار و فناوری‌ها](#ساختار-و-فناوریها)
- [درخت فعلی مخزن](#درخت-فعلی-مخزن)
- [فایل‌های اصلی برنامه](#فایلهای-اصلی-برنامه)
- [قابلیت‌های ماژولار](#قابلیتهای-ماژولار)
- [نصب و دستورها](#نصب-و-دستورها)
- [ساخت خروجی‌ها](#ساخت-خروجیها)
- [آزمون و کنترل کیفیت](#آزمون-و-کنترل-کیفیت)
- [GitHub Actions و انتشار](#github-actions-و-انتشار)
- [محدودیت‌ها و موارد نیازمند اصلاح](#محدودیتها-و-موارد-نیازمند-اصلاح)
- [مشارکت و توسعه](#مشارکت-و-توسعه)

## ساختار و فناوری‌ها

پروژه از سه بخش اصلی تشکیل شده است:

1. **برنامهٔ اصلی:** صفحهٔ چندفایلی `index.html`، استایل عمومی `style.css`، منطق مرکزی `script.js` و قابلیت‌های ماژولار در `src/`.
2. **ابزارهای ساخت و بررسی:** اسکریپت‌های Node.js در `scripts/` و ابزار سازگاری قدیمی در `tools/`.
3. **خروجی‌های توزیع:** فایل `index-test-etitor.html` برای نسخهٔ مستقل Editor، فایل `standalone-visual-editor.html` برای نسخهٔ مستقل Visual Editor و فایل `editor v.html` برای پوستهٔ ترکیبی. این سه خروجی در زمان ساخت تولید می‌شوند و در درخت فعلی مخزن به‌عنوان فایل منبع حضور ندارند.

فناوری‌های قابل مشاهده در مخزن:

- HTML و CSS
- JavaScript بدون چارچوب (Vanilla JavaScript)
- Node.js و npm برای ساخت و اجرای آزمون‌ها
- esbuild برای تولید bundle محلی CodeMirror 6
- GitHub Actions برای انتشار Pages و تحویل ایمیلی
- Playwright در اسکریپت آزمون مرورگری؛ این بسته در وابستگی‌های فعلی `package.json` تعریف نشده است.

## درخت فعلی مخزن

این فهرست بر اساس فایل‌های موجود در شاخهٔ `main` تهیه شده است. فایل‌های خروجی موقت که اسکریپت‌های ساخت تولید می‌کنند، در این درخت نیامده‌اند.

```text
Editor-html-css-js/
├── .github/
│   └── workflows/
│       ├── build-combined-editor.yml
│       ├── check-index.yml
│       ├── company-delivery.yml
│       └── deploy-pages.yml
├── docs/
│   ├── architecture/
│   │   ├── main-files-audit.md
│   │   └── ui-sections-structure.md
│   └── suggestions/
│       └── tree-world-suggestion.md
├── .gitignore
├── README.md
├── editor v.html
├── index 2.html
├── index.html
├── locales/
│   ├── en.js
│   └── fa.js
├── package.json
├── package-lock.json
├── script.js
├── style.css
├── scripts/
│   ├── build-codemirror.mjs
│   ├── codemirror-entry.js
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
│   ├── check-standalone-visual-editor.mjs
│   ├── build/
│   │   └── .gitkeep
│   └── checks/
│       └── .gitkeep
├── src/
│   ├── app/.gitkeep
│   ├── features/
│   │   ├── backup-restore/
│   │   ├── export/.gitkeep
│   │   ├── help/.gitkeep
│   │   ├── libraries/.gitkeep
│   │   ├── live-preview/
│   │   ├── quick-insert/
│   │   ├── settings/
│   │   ├── suggestions/
│   │   │   ├── data/
│   │   │   ├── manager/
│   │   │   └── next-word/
│   │   ├── visual-editor/
│   │   ├── word-tree/
│   │   └── workspace/
│   │       ├── file-manager/
│   │       ├── project-storage/.gitkeep
│   │       ├── search/
│   │       └── toolbar/
│   ├── shared/
│   │   ├── dom/.gitkeep
│   │   ├── i18n/
│   │   ├── storage/.gitkeep
│   │   ├── ui/.gitkeep
│   │   └── validation/.gitkeep
│   └── styles/.gitkeep
└── tools/
    └── build-single-file.js
```

پوشه‌ها یا مسیرهایی که فقط `.gitkeep` دارند، محل رزرو هستند و به‌معنای وجود قابلیت پیاده‌سازی‌شده در آن مسیر نیستند.

## فایل‌های اصلی برنامه

| مسیر | نقش فعلی |
|---|---|
| `index.html` | نقطهٔ ورود و ساختار رابط ویرایشگر اصلی؛ شامل پنل‌های کد، پیش‌نمایش، ابزارها، تنظیمات و ارجاع به فایل‌های CSS و JavaScript |
| `style.css` | استایل عمومی برنامه، چیدمان، پنل ویرایش، پیش‌نمایش، پوسته و قواعد واکنش‌گرا |
| `script.js` | هستهٔ اصلی منطق؛ مدیریت ویرایش HTML/CSS/JS، فایل‌ها، پیش‌نمایش، پردازش Paste، Undo/Redo، جست‌وجو، تکمیل کد و ابزار انتخاب رنگ |
| `editor v.html` | فایل یکپارچهٔ موجود در مخزن؛ شامل پوستهٔ ترکیبی و محتوای تعبیه‌شدهٔ دو محیط ویرایش |
| `index 2.html` | صفحهٔ HTML مستقل با عنوان Alfa-Code Layout؛ در ورودی‌های ساخت و زنجیرهٔ اصلی برنامه به آن ارجاعی دیده نمی‌شود |
| `locales/fa.js` و `locales/en.js` | داده‌های متن فارسی و انگلیسی رابط کاربری |
| `package.json` | تعریف فرمان‌های npm و وابستگی‌های توسعه |
| `package-lock.json` | قفل نسخه‌های حل‌شدهٔ وابستگی‌های npm |

## قابلیت‌های ماژولار

| مسیر | مسئولیت |
|---|---|
| `src/features/backup-restore/` | تهیه، اعتبارسنجی و بازیابی نسخهٔ پشتیبان |
| `src/features/live-preview/element-inspector.js` | انتخاب المان از پیش‌نمایش و ارسال اطلاعات آن برای محیط ویرایش بصری |
| `src/features/quick-insert/` | نوار درج سریع قطعه‌کدها |
| `src/features/settings/` | تنظیمات ظاهر و رفتار ویرایشگر |
| `src/features/suggestions/data/` | بانک پیشنهادهای HTML، CSS و JavaScript |
| `src/features/suggestions/manager/` | مدیریت و نمایش بانک پیشنهادها |
| `src/features/suggestions/next-word/` | پیشنهاد ادامهٔ کد بر اساس متن و زمینه |
| `src/features/visual-editor/` | رابط، استایل، منطق و ارتباطات محیط طراحی بصری |
| `src/features/word-tree/` | قابلیت درخت واژگان |
| `src/features/workspace/file-manager/` | مدیریت فایل‌ها و پنل فایل‌منیجر |
| `src/features/workspace/search/` | نوار و رابط جست‌وجو |
| `src/features/workspace/toolbar/` | نوار ابزار کناری |
| `src/shared/i18n/i18n.js` | زیرساخت تغییر زبان و اعمال ترجمه‌ها |

## نصب و دستورها

پیش‌نیاز: Node.js و npm.

در ریشهٔ مخزن اجرا کنید:

```bash
npm install
```

فرمان‌های تعریف‌شده در `package.json`:

| فرمان | عملکرد |
|---|---|
| `npm test` | اجرای `npm run check:index` |
| `npm run check:index` | بررسی ساختار HTML و بخش‌هایی از نحو کد در `index.html` |
| `npm run build:codemirror` | ساخت bundle محلی CodeMirror 6 با esbuild |
| `npm run build:main` | تولید `index-test-etitor.html` از منابع ویرایشگر اصلی |
| `npm run check:main` | اعتبارسنجی خروجی مستقل ویرایشگر اصلی |
| `npm run build:visual` | تولید `standalone-visual-editor.html` |
| `npm run check:visual` | اعتبارسنجی خروجی مستقل Visual Editor |
| `npm run build:combined` | ترکیب دو خروجی مستقل در `editor v.html` |
| `npm run check:combined` | بررسی فایل ترکیبی و محتوای تعبیه‌شده |
| `npm run build:all` | اجرای زنجیرهٔ ساخت CodeMirror، Editor، Visual Editor و فایل ترکیبی همراه با بررسی‌های مربوط |

## ساخت خروجی‌ها

### ویرایشگر اصلی

```bash
npm run build:main
npm run check:main
```

اسکریپت `scripts/build-test-editor.mjs` منابع معرفی‌شده در manifest داخلی خود را از `index.html` می‌خواند، CSS و JavaScript را در سند مستقل جاسازی می‌کند و خروجی را با نام `index-test-etitor.html` می‌نویسد. نام فایل خروجی در اسکریپت با همین املای `etitor` تعریف شده است.

### ویرایشگر بصری

```bash
npm run build:visual
npm run check:visual
```

منابع `src/features/visual-editor/` به‌همراه فایل‌های زبان و بین‌المللی‌سازی در یک سند مستقل با نام `standalone-visual-editor.html` جاسازی می‌شوند.

### خروجی ترکیبی

```bash
npm run build:combined
npm run check:combined
```

اسکریپت ترکیب، دو سند مستقل را در فایل `editor v.html` قرار می‌دهد و پوسته‌ای برای جابه‌جایی میان Editor و Visual Editor می‌سازد.

### بستهٔ محلی CodeMirror

```bash
npm run build:codemirror
```

اسکریپت `scripts/build-codemirror.mjs` ورودی `scripts/codemirror-entry.js` را با esbuild بسته‌بندی می‌کند و در مسیر `futures/editor/core/codemirror.js` می‌نویسد. این مسیر در حال حاضر در درخت مخزن وجود ندارد و اجرای فرمان آن را دوباره ایجاد می‌کند. همچنین در HTML اصلی، ارجاع فعالی به این bundle مشاهده نمی‌شود؛ بنابراین نباید فرض کرد که CodeMirror در رابط فعلی بارگذاری و استفاده می‌شود.

## آزمون و کنترل کیفیت

اسکریپت‌های بررسی موجود عبارت‌اند از:

- `check-index-integrity.mjs`: بررسی ساختار و جفت‌شدن تگ‌ها و برخی جداکننده‌های کد در صفحهٔ اصلی.
- `check-backup-restore.mjs`: آزمون منطق اعتبارسنجی و بازیابی داده‌های پشتیبان.
- `check-color-picker.mjs`: آزمون توابع تبدیل و تشخیص رنگ.
- `check-editor-code-processing.mjs`: آزمون پردازش Paste و استخراج HTML/CSS/JavaScript.
- `check-editor-overlay-alignment.mjs`: بررسی قواعد هم‌ترازی لایهٔ ورودی و هایلایت.
- `check-settings-button-placement.mjs`: بررسی محل قرارگیری دکمهٔ تنظیمات.
- `check-settings-dialog-keyboard.mjs`: بررسی رفتار صفحه‌کلید در پنجره‌های تنظیمات.
- `check-standalone-editor.mjs`: اعتبارسنجی خروجی مستقل Editor.
- `check-standalone-visual-editor.mjs`: اعتبارسنجی خروجی مستقل Visual Editor.
- `check-combined-editor.mjs`: اعتبارسنجی ساختار و منابع فایل ترکیبی.
- `check-combined-editor-browser.mjs`: آزمون مرورگری با Chromium و Playwright؛ این اسکریپت در فرمان‌های npm فعلی فراخوانی نشده است.

برای اجرای بررسی‌های پایه و ساخت خروجی‌ها از فرمان‌های npm بالا استفاده کنید. وجود یک اسکریپت آزمون در مخزن به‌تنهایی به معنی اجرای خودکار آن در CI نیست.

## GitHub Actions و انتشار

فایل‌های Workflow موجود در شاخهٔ `main`:

| فایل | عملکرد و وضعیت قابل مشاهده |
|---|---|
| `.github/workflows/deploy-pages.yml` | فعال؛ با push به شاخهٔ `main` یا اجرای دستی، سایت را با GitHub Pages منتشر می‌کند |
| `.github/workflows/company-delivery.yml` | فعال؛ اجرای دستی برای آماده‌سازی و ارسال نسخهٔ انتخاب‌شدهٔ Main Editor، Visual Editor یا Combined Editor از طریق ایمیل |
| `.github/workflows/check-index.yml` | تعریف شده، اما job اصلی آن با شرط `if: false` غیرفعال است |
| `.github/workflows/build-combined-editor.yml` | تعریف شده، اما job ساخت آن با شرط `if: false` غیرفعال است |

Workflow تحویل ایمیلی به Secrets مربوط به SMTP نیاز دارد. گیرنده و نوع خروجی از ورودی‌های اجرای دستی انتخاب می‌شوند و ارسال فقط در صورت فعال‌کردن تأیید ارسال انجام می‌شود.

## محدودیت‌ها و موارد نیازمند اصلاح

موارد زیر در کد یا پیکربندی فعلی مشاهده شده‌اند و صرفاً برای شفافیت مستند شده‌اند؛ این README آن‌ها را اصلاح نمی‌کند:

1. **ارجاع باقیمانده به مسیر حذف‌شده:** در `index.html` یک لینک به `futures/index.html` وجود دارد، اما چنین فایلی در شاخهٔ فعلی مخزن نیست. این لینک در رابط کاربری به مقصد ناموجود می‌رود.
2. **مسیر خروجی قدیمی CodeMirror:** `scripts/build-codemirror.mjs` هنوز bundle را در `futures/editor/core/codemirror.js` تولید می‌کند. اجرای `npm run build:codemirror` پوشهٔ حذف‌شدهٔ `futures/` را دوباره ایجاد خواهد کرد.
3. **عدم اتصال bundle CodeMirror به صفحهٔ اصلی:** در ارجاع‌های فایل `index.html`، بارگذاری bundle تولیدشدهٔ CodeMirror دیده نمی‌شود. وجود وابستگی‌ها و اسکریپت ساخت به‌تنهایی نشان‌دهندهٔ استفادهٔ برنامه از آن نیست.
4. **غیرفعال بودن کنترل کیفیت خودکار:** Workflow مربوط به `check-index.yml` با `if: false` اجرا نمی‌شود؛ در نتیجه pushها این job را به‌عنوان کنترل خودکار اجرا نمی‌کنند.
5. **غیرفعال بودن Workflow ساخت Combined:** فایل `build-combined-editor.yml` نیز job غیرفعال دارد. ساخت خروجی ترکیبی از طریق فرمان npm یا Workflow تحویل ایمیلی قابل درخواست است، اما این Workflow ساخت به‌صورت خودکار اجرا نمی‌شود.
6. **وابستگی تعریف‌نشدهٔ Playwright:** اسکریپت `scripts/check-combined-editor-browser.mjs` از بستهٔ `playwright` استفاده می‌کند، اما Playwright در `dependencies` یا `devDependencies` فعلی `package.json` ثبت نشده و فرمان npm مستقیمی نیز برای این آزمون تعریف نشده است.
7. **خروجی‌های ساخت در مخزن ثبت نشده‌اند:** فایل‌های `index-test-etitor.html` و `standalone-visual-editor.html` توسط اسکریپت‌ها تولید می‌شوند و در درخت فعلی وجود ندارند. بررسی‌کننده‌های مستقل و ترکیبی برای اجرا به خروجی‌های ساخته‌شده نیاز دارند.
8. **صفحهٔ مستقل با نقش نامشخص:** فایل `index 2.html` با عنوان Alfa-Code Layout در مخزن وجود دارد، اما در ورودی‌های ساخت اصلی و فهرست فایل‌های مورد استفادهٔ `index.html` نقشی برای آن پیدا نشد. ارتباط آن با برنامه باید مشخص شود.
9. **بخش‌هایی از منطق هنوز متمرکز هستند:** بخش عمده‌ای از منطق برنامه همچنان در `script.js` قرار دارد و `index.html` و `style.css` نیز ساختار و استایل‌های قابل‌توجهی را در خود نگه داشته‌اند. پوشه‌های رزرو‌شده در `src/app`، `src/shared` و برخی قابلیت‌ها هنوز صرفاً دارای `.gitkeep` هستند.

## مشارکت و توسعه

- تغییر قابلیت‌ها را در فایل‌های منبع چندفایلی انجام دهید، نه در خروجی‌های تولیدشده.
- پس از تغییر منابع، خروجی مستقل مربوط را دوباره بسازید و checker متناظر را اجرا کنید.
- اگر مسیر یا ترتیب فایل‌های CSS/JavaScript در `index.html` تغییر کرد، manifestهای مورد استفاده در اسکریپت ساخت و بررسی مستقل نیز باید با آن هماهنگ شوند.
- پیش از فعال‌کردن Workflowهای غیرفعال، وابستگی‌ها و فرمان‌های آن‌ها را بررسی کنید.
- پس از هر تغییر ساختاری، این README و درخت فایل‌ها را با وضعیت واقعی شاخهٔ `main` تطبیق دهید.
