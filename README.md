# ویرایشگر HTML / CSS / JavaScript

این فایل شامل دو نمای ساختاری از مخزن است: ساختار فعلی فایل‌ها و یک پیشنهاد برای سازمان‌دهی آن‌ها در پوشه‌های موضوعی. **درخت دوم صرفاً پیشنهاد معماری است و فایل‌ها در این کامیت جابه‌جا نشده‌اند.**

## ۱. درخت فعلی مخزن

این درخت مسیر فایل‌ها را مطابق ساختار فعلی شاخهٔ `main` نشان می‌دهد.

```text
Editor-html-css-js/
├── .github/
│   └── workflows/
│       ├── build-test-editor.yml
│       ├── check-index-integrity.yml
│       └── check-index.yml
├── README.md
├── index.html
├── index-test-etitor.html
├── script.js
├── style.css
├── settings.js
├── settings.css
├── backup-restore.js
├── backup-restore.css
├── suggestion-manager.js
├── suggestion-manager.css
├── html-suggestions.js
├── css-suggestions.js
├── js-suggestions.js
├── next-word-suggestions.js
├── preview-element-inspector.js
├── github-update.js
├── word-tree.js
├── tree-world-suggestion.md
├── scripts/
│   ├── build-test-editor.mjs
│   ├── check-backup-restore.mjs
│   ├── check-editor-code-processing.mjs
│   ├── check-index-integrity.mjs
│   ├── check-settings-dialog-keyboard.mjs
│   └── check-standalone-editor.mjs
└── tools/
    └── build-single-file.js
```

### راهنمای سریع فایل‌های اصلی

| فایل یا گروه | کاربرد کلی |
|---|---|
| `index.html` | نقطهٔ ورود نسخهٔ اصلی ویرایشگر |
| `index-test-etitor.html` | نسخهٔ آزمایشی ویرایشگر |
| `script.js` و `style.css` | منطق و استایل اصلی برنامه |
| `settings.js` و `settings.css` | منطق و ظاهر تنظیمات |
| `backup-restore.*` | پشتیبان‌گیری و بازیابی |
| `suggestion-manager.*` | مدیریت پیشنهادها |
| `html-suggestions.js`، `css-suggestions.js`، `js-suggestions.js` | بانک‌ها و منطق پیشنهادهای زبان‌ها |
| `next-word-suggestions.js` | پیشنهاد کلمهٔ بعدی |
| `preview-element-inspector.js` | بازرسی عناصر پیش‌نمایش |
| `github-update.js` | قابلیت‌های مرتبط با به‌روزرسانی GitHub |
| `word-tree.js` و `tree-world-suggestion.md` | درخت کلمات و مستندات مرتبط |
| `scripts/` | اسکریپت‌های آزمون، بررسی و ساخت |
| `tools/` | ابزارهای کمکی ساخت |

## ۲. درخت پیشنهادی برای سازمان‌دهی پوشه‌ای

در این الگو، فایل‌ها بر اساس مسئولیت و نوع کاربرد گروه‌بندی می‌شوند. نام فایل‌ها حفظ شده تا تشخیص ارتباط آن‌ها با ساختار فعلی ساده‌تر باشد.

```text
Editor-html-css-js/
├── .github/
│   └── workflows/
│       ├── build-test-editor.yml
│       ├── check-index-integrity.yml
│       └── check-index.yml
│
├── index.html
├── index-test-etitor.html
├── README.md
│
├── src/
│   ├── core/
│   │   └── script.js
│   ├── styles/
│   │   └── style.css
│   ├── settings/
│   │   ├── settings.js
│   │   └── settings.css
│   ├── backup-restore/
│   │   ├── backup-restore.js
│   │   └── backup-restore.css
│   ├── suggestions/
│   │   ├── suggestion-manager.js
│   │   ├── suggestion-manager.css
│   │   ├── html-suggestions.js
│   │   ├── css-suggestions.js
│   │   ├── js-suggestions.js
│   │   └── next-word-suggestions.js
│   ├── inspector/
│   │   └── preview-element-inspector.js
│   ├── integrations/
│   │   └── github-update.js
│   └── word-tree/
│       └── word-tree.js
│
├── docs/
│   └── tree-world-suggestion.md
│
├── tests/
│   ├── build-test-editor.mjs
│   ├── check-backup-restore.mjs
│   ├── check-editor-code-processing.mjs
│   ├── check-index-integrity.mjs
│   ├── check-settings-dialog-keyboard.mjs
│   └── check-standalone-editor.mjs
│
└── tools/
    └── build-single-file.js
```

## ۳. نکات مهم پیش از جابه‌جایی واقعی

این ساختار پیشنهادی است و هنوز اعمال نشده است. جابه‌جایی واقعی فایل‌ها بدون اصلاح ارجاع‌ها می‌تواند برنامه و آزمون‌ها را از کار بیندازد. پیش از اجرا باید موارد زیر بررسی و به‌روزرسانی شوند:

1. مسیرهای `<script src="...">` و `<link href="...">` در فایل‌های HTML.
2. مسیرهای واردسازی، بارگذاری پویا و ارجاع به فایل‌ها در JavaScript.
3. مسیر فایل‌های مورد استفاده در اسکریپت‌های ساخت و آزمون.
4. مسیرهای مربوط به فایل خروجی تک‌فایلی و گردش‌کارهای GitHub Actions.
5. اجرای آزمون‌های موجود و بررسی اجرای نسخهٔ اصلی و نسخهٔ آزمایشی پس از تغییر مسیرها.

### پیشنهاد اجرایی

بهتر است جابه‌جایی در چند مرحلهٔ کوچک انجام شود: ابتدا پوشه‌بندی و اصلاح ارجاع‌های یک گروه، سپس اجرای آزمون‌های مربوط، و در پایان بررسی کامل ساخت و اجرای برنامه. تا زمان انجام این بررسی‌ها، ساختار فعلی مخزن مرجع اجرای برنامه باقی می‌ماند.
