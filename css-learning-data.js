/* Beginner-friendly CSS autocomplete guide. Descriptions are shown beside suggestions. */
(function () {
    'use strict';
    window.EDITOR_CSS_GUIDE_DATA = {
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