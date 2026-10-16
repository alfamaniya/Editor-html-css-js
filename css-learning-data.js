/* Beginner-friendly CSS autocomplete guide. Descriptions are shown beside suggestions. */
(function () {
    'use strict';
    window.EDITOR_CSS_GUIDE_DATA = {
        htmlTags: {"html":"ریشه سند HTML؛ همه عناصر صفحه درون آن قرار می‌گیرند.","head":"اطلاعات صفحه، عنوان، متادیتا و پیوند فایل‌ها.","body":"محتوای قابل نمایش صفحه.","title":"عنوانی که معمولاً در زبانه مرورگر دیده می‌شود.","meta":"تنظیمات و اطلاعات صفحه مانند charset و viewport.","link":"اتصال فایل خارجی؛ اغلب CSS.","style":"نوشتن CSS داخل HTML.","script":"کد یا فایل JavaScript.","main":"محتوای اصلی صفحه.","header":"سربرگ صفحه یا یک بخش.","footer":"پاورقی صفحه یا بخش.","nav":"بخش پیوندهای ناوبری.","section":"بخش موضوعی محتوا.","article":"محتوای مستقل مانند مقاله یا پست.","aside":"محتوای جانبی.","h1":"عنوان اصلی صفحه.","h2":"عنوان زیربخش سطح دوم.","h3":"عنوان زیربخش سطح سوم.","h4":"عنوان سطح چهارم.","h5":"عنوان سطح پنجم.","h6":"عنوان سطح ششم.","p":"پاراگراف متن.","div":"ظرف عمومی بلوکی برای گروه‌بندی.","span":"ظرف عمومی درون‌خطی برای بخشی از متن.","a":"پیوند؛ مقصد را معمولاً با href مشخص می‌کنیم.","img":"تصویر؛ برای دسترس‌پذیری alt بنویسید.","picture":"انتخاب نسخه مناسب تصویر برای شرایط مختلف.","source":"منبع رسانه برای picture/audio/video.","audio":"پخش صدا.","video":"پخش ویدئو.","iframe":"جاسازی صفحه خارجی.","canvas":"سطح ترسیم با JavaScript.","svg":"گرافیک برداری مقیاس‌پذیر.","ul":"فهرست بدون شماره.","ol":"فهرست شماره‌دار.","li":"یک مورد فهرست.","table":"جدول داده‌ها.","caption":"عنوان جدول.","thead":"گروه سرستون‌های جدول.","tbody":"ردیف‌های اصلی جدول.","tfoot":"ردیف‌های پایانی جدول.","tr":"ردیف جدول.","th":"سلول عنوان/سرستون.","td":"سلول داده جدول.","form":"فرم ورود و ارسال اطلاعات.","label":"برچسب کنترل فرم؛ با for به id وصل می‌شود.","input":"کنترل ورودی؛ نوع آن با type تعیین می‌شود.","textarea":"ورودی متن چندخطی.","button":"دکمه تعاملی.","select":"فهرست کشویی.","option":"گزینه داخل select یا datalist.","optgroup":"گروه‌بندی گزینه‌های select.","datalist":"پیشنهادهای قابل استفاده در input.","fieldset":"گروه‌بندی کنترل‌های مرتبط فرم.","legend":"عنوان fieldset.","output":"نمایش نتیجه محاسبه یا فرم.","progress":"نمایش میزان پیشرفت.","meter":"نمایش مقدار در یک بازه.","details":"بخش قابل باز و بسته شدن.","summary":"عنوان کلیک‌پذیر details.","dialog":"پنجره محاوره‌ای.","template":"قالبی که تا زمان استفاده نمایش داده نمی‌شود.","time":"تاریخ/زمان ماشین‌خوان.","code":"قطعه کد.","pre":"متن با حفظ فاصله‌ها و خطوط.","blockquote":"نقل‌قول بلند.","q":"نقل‌قول کوتاه.","em":"تأکید معنایی.","strong":"اهمیت زیاد معنایی.","b":"برجسته‌سازی بصری.","i":"متن با حالت متفاوت.","small":"یادداشت یا متن فرعی.","mark":"برجسته کردن متن.","sub":"زیرنویس.","sup":"بالانویس.","br":"رفتن به خط بعد.","hr":"جداکننده موضوعی.","figure":"محتوای مستقل مثل نمودار یا تصویر.","figcaption":"شرح figure.","address":"اطلاعات تماس.","abbr":"مخفف.","del":"متن حذف‌شده.","ins":"متن اضافه‌شده.","noscript":"محتوای جایگزین در صورت غیرفعال بودن JavaScript.","wbr":"نقطه مجاز برای شکستن خط.","map":"نقشه تصویری.","area":"ناحیه قابل کلیک در نقشه تصویری.","embed":"جاسازی محتوای خارجی.","object":"محتوای خارجی جاسازی‌شده.","track":"زیرنویس رسانه.","dl":"فهرست اصطلاح و توضیح.","dt":"اصطلاح.","dd":"توضیح اصطلاح.","dfn":"اصطلاح در حال تعریف.","cite":"عنوان اثر یا منبع.","kbd":"ورودی صفحه‌کلید.","samp":"نمونه خروجی برنامه.","var":"نام متغیر.","ruby":"حاشیه‌نویسی تلفظی.","bdi":"جدا کردن جهت متن.","bdo":"تعیین صریح جهت متن.","slot":"جایگاه محتوا در Web Components."},
        htmlAttributes: {"id":"شناسه یکتا برای CSS و JavaScript.","class":"کلاس برای گروه‌بندی و استایل‌دهی عناصر.","style":"CSS مستقیم روی عنصر؛ برای پروژه بزرگ معمولاً فایل CSS بهتر است.","title":"اطلاعات تکمیلی، گاهی به صورت راهنمای شناور.","lang":"زبان محتوا، مانند fa یا en.","dir":"جهت متن: rtl، ltr یا auto.","hidden":"پنهان کردن عنصر از نمایش معمول.","tabindex":"تنظیم فوکوس صفحه‌کلید.","role":"نقش دسترس‌پذیری.","contenteditable":"اجازه ویرایش محتوا.","draggable":"قابل کشیدن بودن عنصر.","spellcheck":"بررسی املای متن.","href":"نشانی مقصد پیوند یا فایل.","target":"محل باز شدن مقصد؛ مانند _blank.","rel":"رابطه پیوند با مقصد.","download":"درخواست دانلود منبع پیوند.","src":"نشانی منبع فایل یا رسانه.","srcset":"نسخه‌های مختلف تصویر برای اندازه/تراکم.","sizes":"راهنمای اندازه تصویر برای srcset.","alt":"توضیح جایگزین تصویر.","width":"عرض عنصر/رسانه.","height":"ارتفاع عنصر/رسانه.","loading":"بارگذاری lazy یا eager.","decoding":"راهنمای رمزگشایی تصویر.","fetchpriority":"اولویت دریافت منبع.","crossorigin":"تنظیم CORS برای منبع خارجی.","referrerpolicy":"تعیین اطلاعات Referer ارسالی.","autoplay":"درخواست پخش خودکار؛ ممکن است محدود شود.","controls":"نمایش کنترل‌های رسانه.","loop":"تکرار پخش.","muted":"شروع با صدای خاموش.","preload":"راهنمای بارگذاری اولیه رسانه.","poster":"تصویر پیش‌نمایش ویدئو.","type":"نوع کنترل، داده یا منبع؛ وابسته به عنصر.","name":"نام داده هنگام ارسال فرم.","value":"مقدار کنترل یا گزینه.","placeholder":"راهنمای داخل ورودی خالی؛ جایگزین label نیست.","required":"اجباری بودن مقدار.","disabled":"غیرفعال کردن کنترل.","readonly":"جلوگیری از ویرایش مقدار.","autofocus":"درخواست فوکوس هنگام بارگذاری.","autocomplete":"راهنمای تکمیل خودکار مرورگر.","checked":"انتخاب اولیه checkbox/radio.","multiple":"اجازه چند انتخاب یا چند فایل.","min":"کمترین مقدار مجاز.","max":"بیشترین مقدار مجاز.","step":"فاصله مجاز مقادیر عددی.","minlength":"حداقل طول متن.","maxlength":"حداکثر طول متن.","pattern":"الگوی اعتبارسنجی با عبارت منظم.","accept":"نوع فایل‌های قابل قبول.","inputmode":"راهنمای صفحه‌کلید مجازی.","for":"اتصال label به id کنترل.","action":"نشانی دریافت داده فرم.","method":"روش ارسال فرم؛ معمولاً get یا post.","enctype":"نوع رمزگذاری فرم؛ برای فایل multipart/form-data.","novalidate":"غیرفعال کردن اعتبارسنجی خودکار فرم.","rows":"تعداد خطوط قابل مشاهده textarea.","cols":"عرض textarea بر حسب تعداد کاراکتر تقریبی.","wrap":"رفتار شکستن خط در textarea.","selected":"انتخاب اولیه option.","open":"باز بودن اولیه details/dialog.","start":"عدد شروع فهرست شماره‌دار.","reversed":"شماره‌گذاری معکوس فهرست.","colspan":"تعداد ستون‌های پوشش‌داده‌شده سلول.","rowspan":"تعداد ردیف‌های پوشش‌داده‌شده سلول.","scope":"ارتباط سرستون با سلول‌های جدول.","headers":"شناسه سرستون‌های مرتبط.","datetime":"تاریخ/زمان ماشین‌خوان.","charset":"کدگذاری نویسه‌ها؛ معمولاً UTF-8.","content":"مقدار متادیتای meta.","http-equiv":"معادل برخی سرآیندها در meta.","async":"اجرای اسکریپت هنگام آماده‌شدن بدون حفظ ترتیب.","defer":"اجرای اسکریپت پس از پردازش HTML.","integrity":"بررسی صحت فایل خارجی.","aria-label":"نام قابل‌دسترسی برای فناوری‌های کمکی.","aria-labelledby":"گرفتن نام از متن عناصر مشخص‌شده.","aria-describedby":"اتصال توضیح به عنصر.","aria-hidden":"پنهان‌سازی از درخت دسترس‌پذیری؛ با احتیاط.","aria-expanded":"اعلام وضعیت باز/بسته کنترل.","aria-controls":"شناسه بخشی که کنترل تغییر می‌دهد.","aria-live":"اعلام تغییرات پویا به فناوری‌های کمکی.","data-*":"ویژگی سفارشی؛ در JS از dataset خوانده می‌شود."},
        htmlAttrsByTag: {"a":"href target rel download hreflang type","img":"alt src srcset sizes width height loading decoding","input":"type name value placeholder required disabled checked min max step minlength maxlength pattern autocomplete accept multiple","button":"type name value disabled autofocus form","form":"action method enctype autocomplete novalidate","label":"for","link":"href rel media type crossorigin integrity","script":"src type async defer crossorigin integrity","meta":"charset name content http-equiv","select":"name required disabled multiple autocomplete","option":"value selected disabled label","textarea":"name rows cols placeholder required maxlength minlength readonly","video":"src controls autoplay muted loop poster preload width height playsinline","audio":"src controls autoplay muted loop preload","source":"src srcset sizes type media","track":"src kind srclang label default","iframe":"src title width height loading sandbox allow","td":"colspan rowspan headers","th":"scope colspan rowspan headers","ol":"start reversed type","li":"value","time":"datetime","progress":"max value","meter":"min max low high optimum value","details":"open","dialog":"open","fieldset":"disabled name","output":"for name","area":"href alt shape coords target"},
        properties: {
            padding: 'فاصله داخلی؛ فضای بین محتوا و لبه کادر.',
            margin: 'فاصله بیرونی؛ فضای بیرون کادر و بین عناصر.',
            display: 'نحوه قرارگیری عنصر در صفحه.',
            'background-color': 'رنگ پس‌زمینه عنصر.',
            color: 'رنگ متن.',
            'text-align': 'تراز افقی متن.',
            'font-size': 'اندازه نوشته.',
            'border': 'خط دور عنصر؛ معمولاً ضخامت، نوع و رنگ.',
            position: 'روش تعیین جای عنصر در صفحه.',
            width: 'عرض عنصر.',
            height: 'ارتفاع عنصر.',
            'border-radius': 'گردی گوشه‌های کادر.',
            'justify-content': 'توزیع عناصر در راستای اصلی Flexbox.',
            'align-items': 'تراز عناصر در راستای عمود بر محور اصلی Flexbox.',
            overflow: 'رفتار محتوا وقتی از کادر بیرون می‌زند.'
        },
        values: {
            padding: [
                {label:'10px',insert:'10px',description:'۱۰ پیکسل فاصله داخلی از هر طرف.'},
                {label:'20px',insert:'20px',description:'۲۰ پیکسل فاصله داخلی از هر طرف.'},
                {label:'1em',insert:'1em',description:'فاصله متناسب با اندازه فونت عنصر.'},
                {label:'1rem',insert:'1rem',description:'فاصله متناسب با اندازه فونت ریشه صفحه.'},
                {label:'10px 20px',insert:'10px 20px',description:'۱۰px بالا و پایین، ۲۰px چپ و راست.'},
                {label:'10px 20px 30px 40px',insert:'10px 20px 30px 40px',description:'به ترتیب: بالا، راست، پایین، چپ.'},
                {label:'0',insert:'0',description:'بدون فاصله داخلی.'},
                {label:'inherit',insert:'inherit',description:'مقدار را از عنصر والد به ارث می‌برد.'},
                {label:'initial',insert:'initial',description:'مقدار پیش‌فرض تعریف‌شده در CSS را می‌گذارد.'},
                {label:'unset',insert:'unset',description:'بسته به ویژگی، مثل inherit یا initial رفتار می‌کند.'}
            ],
            margin: [
                {label:'10px',insert:'10px',description:'۱۰ پیکسل فاصله بیرونی از هر طرف.'},
                {label:'0 auto',insert:'0 auto',description:'بالا و پایین صفر؛ چپ و راست خودکار، برای وسط‌چین کردن عنصر بلوکی با عرض مشخص.'},
                {label:'20px 0',insert:'20px 0',description:'۲۰px بالا و پایین؛ چپ و راست صفر.'},
                {label:'0',insert:'0',description:'بدون فاصله بیرونی.'},
                {label:'auto',insert:'auto',description:'مرورگر فضای قابل‌استفاده را محاسبه می‌کند.'}
            ],
            display: [
                {label:'block',insert:'block',description:'عنصر معمولاً یک خط کامل را می‌گیرد.'},
                {label:'inline',insert:'inline',description:'عنصر در جریان متن قرار می‌گیرد.'},
                {label:'inline-block',insert:'inline-block',description:'در خط می‌ماند اما عرض و ارتفاع می‌پذیرد.'},
                {label:'flex',insert:'flex',description:'چیدمان انعطاف‌پذیر برای مرتب‌کردن فرزندان.'},
                {label:'grid',insert:'grid',description:'چیدمان شبکه‌ای سطری و ستونی.'},
                {label:'none',insert:'none',description:'عنصر نمایش داده نمی‌شود و فضایی نمی‌گیرد.'}
            ],
            'background-color': [
                {label:'red',insert:'red',description:'پس‌زمینه قرمز.'},
                {label:'#3498db',insert:'#3498db',description:'رنگ با کد HEX.'},
                {label:'rgb(52, 152, 219)',insert:'rgb(52, 152, 219)',description:'رنگ با مقادیر قرمز، سبز و آبی.'},
                {label:'transparent',insert:'transparent',description:'پس‌زمینه شفاف.'},
                {label:'white',insert:'white',description:'پس‌زمینه سفید.'}
            ],
            color: [
                {label:'black',insert:'black',description:'متن سیاه.'},
                {label:'white',insert:'white',description:'متن سفید.'},
                {label:'red',insert:'red',description:'متن قرمز.'},
                {label:'#333',insert:'#333',description:'رنگ متن با کد HEX کوتاه.'},
                {label:'currentColor',insert:'currentColor',description:'از رنگ فعلی متن/عنصر استفاده می‌کند.'}
            ],
            'text-align': [
                {label:'left',insert:'left',description:'تراز از چپ.'},
                {label:'right',insert:'right',description:'تراز از راست.'},
                {label:'center',insert:'center',description:'وسط‌چین کردن متن.'},
                {label:'justify',insert:'justify',description:'کشیدن متن تا هر دو لبه.'}
            ],
            'font-size': [
                {label:'16px',insert:'16px',description:'اندازه ثابت ۱۶ پیکسل.'},
                {label:'1rem',insert:'1rem',description:'اندازه نسبت به فونت ریشه صفحه.'},
                {label:'1.2em',insert:'1.2em',description:'۱٫۲ برابر اندازه فونت عنصر والد.'},
                {label:'small',insert:'small',description:'اندازه کوچک از مقیاس مرورگر.'},
                {label:'large',insert:'large',description:'اندازه بزرگ از مقیاس مرورگر.'}
            ],
            border: [
                {label:'1px solid #333',insert:'1px solid #333',description:'خط ۱px پیوسته با رنگ خاکستری تیره.'},
                {label:'none',insert:'none',description:'بدون خط دور.'},
                {label:'2px dashed red',insert:'2px dashed red',description:'خط‌چین قرمز با ضخامت ۲px.'}
            ],
            position: [
                {label:'static',insert:'static',description:'حالت عادی؛ مقدار پیش‌فرض.'},
                {label:'relative',insert:'relative',description:'نسبت به جای عادی خود جابه‌جا می‌شود.'},
                {label:'absolute',insert:'absolute',description:'نسبت به نزدیک‌ترین والد موقعیت‌دار جای‌گذاری می‌شود.'},
                {label:'fixed',insert:'fixed',description:'نسبت به پنجره مرورگر ثابت می‌ماند.'},
                {label:'sticky',insert:'sticky',description:'در اسکرول، در محدوده مشخص به حالت چسبان درمی‌آید.'}
            ],
            overflow: [
                {label:'visible',insert:'visible',description:'محتوای بیرون‌زده دیده می‌شود.'},
                {label:'hidden',insert:'hidden',description:'محتوای بیرون‌زده بریده و پنهان می‌شود.'},
                {label:'auto',insert:'auto',description:'در صورت نیاز اسکرول ایجاد می‌شود.'},
                {label:'scroll',insert:'scroll',description:'قابلیت اسکرول نمایش داده می‌شود.'}
            ],
            'border-radius': [
                {label:'5px',insert:'5px',description:'گوشه‌ها کمی گرد می‌شوند.'},
                {label:'10px',insert:'10px',description:'گوشه‌ها با شعاع ۱۰ پیکسل گرد می‌شوند.'},
                {label:'50%',insert:'50%',description:'در کادر مربع معمولاً شکل دایره می‌سازد.'}
            ],
            width: [
                {label:'100%',insert:'100%',description:'تمام عرض فضای والد.'},
                {label:'300px',insert:'300px',description:'عرض ثابت ۳۰۰ پیکسل.'},
                {label:'auto',insert:'auto',description:'مرورگر عرض را با توجه به چیدمان محاسبه می‌کند.'},
                {label:'fit-content',insert:'fit-content',description:'عرض متناسب با محتوا، در محدوده فضای موجود.'}
            ],
            height: [
                {label:'auto',insert:'auto',description:'ارتفاع بر اساس محتوا محاسبه می‌شود.'},
                {label:'100vh',insert:'100vh',description:'برابر با ۱۰۰٪ ارتفاع پنجره مرورگر.'},
                {label:'200px',insert:'200px',description:'ارتفاع ثابت ۲۰۰ پیکسل.'}
            ],
            'justify-content': [
                {label:'flex-start',insert:'flex-start',description:'عناصر در ابتدای محور اصلی جمع می‌شوند.'},
                {label:'center',insert:'center',description:'عناصر در مرکز محور اصلی قرار می‌گیرند.'},
                {label:'space-between',insert:'space-between',description:'فضای خالی بین عناصر پخش می‌شود.'},
                {label:'space-around',insert:'space-around',description:'اطراف هر عنصر فضای خالی توزیع می‌شود.'},
                {label:'space-evenly',insert:'space-evenly',description:'فاصله‌ها تقریباً برابر می‌شوند.'}
            ],
            'align-items': [
                {label:'stretch',insert:'stretch',description:'عناصر تا حد ممکن در محور عمود کشیده می‌شوند.'},
                {label:'center',insert:'center',description:'عناصر در محور عمود وسط‌چین می‌شوند.'},
                {label:'flex-start',insert:'flex-start',description:'عناصر ابتدای محور عمود قرار می‌گیرند.'},
                {label:'flex-end',insert:'flex-end',description:'عناصر انتهای محور عمود قرار می‌گیرند.'}
            ]
        }
    };
})();