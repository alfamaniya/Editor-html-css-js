// Suggested entries: 484 (HTML tags and attributes, including contextual duplicates)
(function () {
    'use strict';
    const htmlTags = (
        'a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd label legend li link main map mark menu meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script search section select slot small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul var video wbr'
    ).split(/\s+/);
    const htmlAttributes = (
        'accept accept-charset accesskey action align allow allowfullscreen alt async autocapitalize autocomplete autofocus autoplay capture cellpadding cellspacing challenge charset checked cite class cols colspan content contenteditable controls coords crossorigin data datetime decoding default defer dir dirname disabled download draggable enctype enterkeyhint for form formaction formenctype formmethod formnovalidate formtarget headers height hidden high href hreflang http-equiv id inert inputmode integrity is itemid itemprop itemref itemscope itemtype kind label lang list loading loop low max maxlength media method min minlength multiple muted name nomodule nonce open optimum pattern placeholder playsinline poster preload readonly referrerpolicy rel required reversed role rows rowspan sandbox scope selected shape size sizes slot span spellcheck src srcdoc srclang srcset start step style tabindex target title translate type usemap value width wrap'
    ).split(/\s+/);
    const htmlAttrsByTag = {
        a:'href target rel download hreflang type referrerpolicy',
        area:'alt coords download href hreflang media rel shape target',
        audio:'autoplay controls controlslist crossorigin loop muted preload src',
        button:'autofocus disabled form formaction formenctype formmethod formnovalidate formtarget name type value',
        form:'accept-charset action autocomplete enctype method name novalidate rel target',
        img:'alt crossorigin decoding fetchpriority height ismap loading referrerpolicy sizes src srcset usemap width',
        input:'accept alt autocomplete autofocus capture checked dirname disabled form formaction formenctype formmethod formnovalidate formtarget height list max maxlength min minlength multiple name pattern placeholder readonly required size src step type value width',
        link:'as crossorigin disabled fetchpriority href hreflang imagesizes imagesrcset integrity media referrerpolicy rel sizes type',
        script:'async crossorigin defer fetchpriority integrity nomodule referrerpolicy src type',
        source:'media sizes src srcset type',
        video:'autoplay controls controlslist crossorigin height loop muted playsinline poster preload src width',
        iframe:'allow allowfullscreen height loading name referrerpolicy sandbox src srcdoc width',
        textarea:'autocomplete autofocus cols dirname disabled form maxlength minlength name placeholder readonly required rows wrap',
        select:'autocomplete autofocus disabled form multiple name required size',
        option:'disabled label selected value',
        ol:'reversed start type',
        li:'value',
        td:'colspan headers rowspan',
        th:'colspan headers rowspan scope abbr',
        meta:'charset content http-equiv name',
        time:'datetime',
        data:'value',
        meter:'value min max low high optimum',
        progress:'value max',
        div:'align accesskey autocapitalize contenteditable dir draggable hidden inputmode is lang role slot spellcheck style tabindex title translate',
        label:'for form',
        fieldset:'disabled form name',
        output:'for form name',
        details:'open name',
        dialog:'open',
        canvas:'height width',
        col:'span',
        colgroup:'span',
        map:'name',
        object:'data form height name type usemap width',
        embed:'height src type width',
        track:'default kind label src srclang',
        table:'align bgcolor border cellpadding cellspacing frame rules summary width'
    };
    window.EDITOR_INTELLISENSE_DATA = Object.assign(window.EDITOR_INTELLISENSE_DATA || {}, { htmlTags, htmlAttributes, htmlAttrsByTag });
})();
