/* ============ UI interactions ============ */
(function () {
  "use strict";
  var root    = document.documentElement;
  var main    = document.getElementById("main");
  var split   = document.getElementById("split");
  var splitDiv = document.getElementById("splitDivider");

  function load(key, fallback) {
    try {
      var v = localStorage.getItem(key);
      return v !== null ? JSON.parse(v) : fallback;
    } catch (e) { return fallback; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  function makeResizer(handle, opts) {
    var dragging = false;
    function valueFromEvent(e) {
      if (opts.percentOf) {
        var rect = opts.percentOf.getBoundingClientRect();
        return ((e.clientX - rect.left) / rect.width) * 100;
      }
      return opts.reverse ? (window.innerWidth - e.clientX) : e.clientX;
    }
    handle.addEventListener("pointerdown", function (e) {
      dragging = true;
      handle.classList.add("is-dragging");
      document.body.classList.add("resizing");
      if (handle.setPointerCapture) handle.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    handle.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      opts.set(valueFromEvent(e));
    });
    function stop() {
      if (!dragging) return;
      dragging = false;
      handle.classList.remove("is-dragging");
      document.body.classList.remove("resizing");
      if (opts.onEnd) opts.onEnd();
    }
    handle.addEventListener("pointerup", stop);
    handle.addEventListener("pointercancel", stop);
    handle.addEventListener("dblclick", function () {
      opts.set(opts.default);
      if (opts.onEnd) opts.onEnd();
    });
    handle.addEventListener("keydown", function (e) {
      var cur = opts.current();
      var step = opts.step || 16;
      if (e.key === "ArrowLeft")  { opts.set(cur - step); e.preventDefault(); if (opts.onEnd) opts.onEnd(); }
      if (e.key === "ArrowRight") { opts.set(cur + step); e.preventDefault(); if (opts.onEnd) opts.onEnd(); }
      if (e.key === "Home")       { opts.set(opts.min);   e.preventDefault(); if (opts.onEnd) opts.onEnd(); }
      if (e.key === "End")        { opts.set(opts.max);   e.preventDefault(); if (opts.onEnd) opts.onEnd(); }
    });
  }

  function makeSidebar(opts) {
    var sidebar = document.getElementById(opts.sidebarId);
    var toggle  = document.getElementById(opts.toggleId);
    var resizer = document.getElementById(opts.resizerId);
    var side    = opts.side;
    var cssVar  = side === "left" ? "--left-w" : "--right-w";
    var railVar = side === "left" ? "--left-rail" : "--right-rail";
    var MAIN_MIN = 200;
    var DEFAULT = load(opts.storeKey, opts.defaultW);
    var current = DEFAULT;
    var isOpen  = false;
    var pinned  = false;
    var closeTimer = null;
    var suppressHoverUntil = 0;

    function getRail() {
      return parseInt(getComputedStyle(root).getPropertyValue(railVar), 10) || 56;
    }
    function isMobile() { return window.innerWidth <= 768; }
    function setWidth(px) {
      var viewportCap = window.innerWidth - MAIN_MIN - getRail() - 20;
      var limit = Math.max(opts.min, Math.min(opts.max, viewportCap));
      var w = Math.round(Math.min(limit, Math.max(opts.min, px)));
      current = w;
      root.style.setProperty(cssVar, w + "px");
      resizer.setAttribute("aria-valuenow", w);
    }
    function applyOpen(open) {
      isOpen = open;
      sidebar.classList.toggle("is-open", open);
      main.classList.toggle(side + "-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", (open ? "Collapse " : "Expand ") + side + " menu");
      resizer.classList.toggle("is-active", open);
    }
    function cancelClose() {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    }
    function scheduleClose() {
      cancelClose();
      if (pinned) return;
      closeTimer = setTimeout(function () {
        if (!pinned) applyOpen(false);
        closeTimer = null;
      }, 250);
    }

    toggle.addEventListener("click", function () {
      cancelClose();
      if (pinned) {
        pinned = false;
        applyOpen(false);
        suppressHoverUntil = Date.now() + 500;
      } else {
        pinned = true;
        applyOpen(true);
      }
    });

    sidebar.addEventListener("pointerenter", function (e) {
      if (e.pointerType !== "mouse") return;
      if (isMobile()) return;
      if (Date.now() < suppressHoverUntil) return;
      cancelClose();
      if (!isOpen) applyOpen(true);
    });
    sidebar.addEventListener("pointerleave", function (e) {
      if (e.pointerType !== "mouse") return;
      if (isMobile()) return;
      scheduleClose();
    });
    resizer.addEventListener("pointerenter", cancelClose);
    resizer.addEventListener("pointerleave", function (e) {
      if (e.pointerType !== "mouse") return;
      if (isMobile()) return;
      scheduleClose();
    });

    makeResizer(resizer, {
      set: setWidth,
      current: function () { return current; },
      default: opts.defaultW,
      min: opts.min,
      max: opts.max,
      step: 16,
      reverse: side === "right",
      onEnd: function () { save(opts.storeKey, current); }
    });

    setWidth(DEFAULT);
    applyOpen(false);
    resizer.setAttribute("aria-valuemin", opts.min);
    resizer.setAttribute("aria-valuemax", opts.max);

    return {
      open:  function () { pinned = true;  applyOpen(true);  },
      close: function () { pinned = false; applyOpen(false); },
      isOpen: function () { return isOpen; }
    };
  }

  var leftSidebar = makeSidebar({
    sidebarId: "sidebarLeft",
    toggleId:  "leftToggle",
    resizerId: "leftResizer",
    side:      "left",
    storeKey:  "alfa-code:left-w",
    defaultW:  240,
    min: 200,
    max: 560
  });
  var rightSidebar = makeSidebar({
    sidebarId: "sidebarRight",
    toggleId:  "rightToggle",
    resizerId: "rightResizer",
    side:      "right",
    storeKey:  "alfa-code:right-w",
    defaultW:  240,
    min: 200,
    max: 560
  });

  var SPLIT_MIN = 15, SPLIT_MAX = 85, SPLIT_DEFAULT = 50;
  var splitVal = load("alfa-code:split", SPLIT_DEFAULT);
  function setSplit(percent) {
    var v = Math.min(SPLIT_MAX, Math.max(SPLIT_MIN, percent));
    splitVal = v;
    split.style.setProperty("--split", v);
    splitDiv.setAttribute("aria-valuenow", Math.round(v));
  }
  makeResizer(splitDiv, {
    percentOf: split,
    set: setSplit,
    current: function () { return splitVal; },
    default: SPLIT_DEFAULT,
    min: SPLIT_MIN,
    max: SPLIT_MAX,
    step: 2,
    onEnd: function () { save("alfa-code:split", splitVal); }
  });
  splitDiv.setAttribute("aria-valuemin", SPLIT_MIN);
  splitDiv.setAttribute("aria-valuemax", SPLIT_MAX);
  setSplit(splitVal);

  var tabs   = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var panels = document.querySelectorAll(".tab-panel");
  function activateTab(tab) {
    tabs.forEach(function (t) {
      var isActive = t === tab;
      t.classList.toggle("active", isActive);
      t.setAttribute("aria-selected", isActive ? "true" : "false");
      t.tabIndex = isActive ? 0 : -1;
    });
    panels.forEach(function (p) { p.classList.remove("active"); });
    var target = document.getElementById("panel-" + tab.dataset.tab);
    if (target) target.classList.add("active");
  }
  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () { activateTab(tab); });
    tab.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
      if (e.key === "ArrowLeft")  next = tabs[(index - 1 + tabs.length) % tabs.length];
      if (next) { next.focus(); activateTab(next); e.preventDefault(); }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (rightSidebar.isOpen()) rightSidebar.close();
      else if (leftSidebar.isOpen()) leftSidebar.close();
    }
  });

  document.addEventListener("pointerdown", function (e) {
    if (window.innerWidth > 768) return;
    if (e.target.closest && e.target.closest(".sidebar")) return;
    if (leftSidebar.isOpen()) leftSidebar.close();
    if (rightSidebar.isOpen()) rightSidebar.close();
  });

  window.addEventListener("resize", function () {
    if (leftSidebar.isOpen() && window.innerWidth < 900) leftSidebar.close();
    if (rightSidebar.isOpen() && window.innerWidth < 900) rightSidebar.close();
  });
})();

/* ============ Editor, Import, Paste & Live Preview ============ */
(function () {
  "use strict";

  var frame   = document.getElementById("previewFrame");
  var taHtml  = document.querySelector("#panel-html textarea");
  var taCss   = document.querySelector("#panel-css textarea");
  var taJs    = document.querySelector("#panel-js textarea");
  var importBtn  = document.getElementById("importBtn");
  var importFile = document.getElementById("importFile");

  function showToast(msg, isError) {
    var container = document.getElementById("toastContainer");
    if (!container) return;
    var el = document.createElement("div");
    el.className = "toast" + (isError ? " toast--error" : "");
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(function () {
      el.style.opacity = "0";
      el.style.transition = "opacity .25s";
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 250);
    }, 2600);
  }

  if (!frame || !taHtml || !taCss || !taJs) {
    console.error("[Alfa-Code] Editor elements missing; aborting.");
    return;
  }

  /* ---------- Default demo content ---------- */
  var DEFAULT_HTML = [
    '<div class="demo-card">',
    '  <h1>Hello, Alfa-Code!</h1>',
    '  <p>Edit the HTML, CSS, and JS tabs to see live changes.</p>',
    '  <button data-demo-btn>Click me</button>',
    '</div>'
  ].join('\n');

  var DEFAULT_CSS = [
    '.demo-card {',
    '  max-width: 420px;',
    '  margin: 0 auto;',
    '  padding: 24px;',
    '  background: #0d3845;',
    '  border: 1px solid #45d8e8;',
    '  border-radius: 12px;',
    '  color: #d6f5fb;',
    '  font-family: system-ui, sans-serif;',
    '  box-shadow: 0 0 24px rgba(69,216,232,.18);',
    '}',
    '.demo-card h1 { color: #45d8e8; margin: 0 0 12px; font-size: 20px; }',
    '.demo-card p  { color: #7fc0d0; margin: 0 0 16px; font-size: 14px; }',
    '[data-demo-btn] {',
    '  padding: 8px 20px;',
    '  background: #45d8e8;',
    '  color: #041620;',
    '  border: 0;',
    '  border-radius: 8px;',
    '  font-weight: 700;',
    '  cursor: pointer;',
    '  transition: transform .15s ease;',
    '}',
    '[data-demo-btn]:hover { transform: translateY(-1px); }'
  ].join('\n');

  var DEFAULT_JS = [
    "document.addEventListener('click', function (e) {",
    "  if (e.target.matches('[data-demo-btn]')) {",
    "    alert('Hello from Alfa-Code!');",
    "  }",
    "});"
  ].join('\n');

  /* ---------- Persistence ---------- */
  function load(key, fallback) {
    try {
      var v = localStorage.getItem(key);
      return v !== null ? JSON.parse(v) : fallback;
    } catch (e) { return fallback; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }
  function loadString(key, fallback) {
    var v = load(key, null);
    return typeof v === "string" ? v : fallback;
  }

  taHtml.value = loadString("alfa-code:html", DEFAULT_HTML);
  taCss.value  = loadString("alfa-code:css",  DEFAULT_CSS);
  taJs.value   = loadString("alfa-code:js",   DEFAULT_JS);

  var saveTimer = null;
  function persist() {
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      save("alfa-code:html", taHtml.value);
      save("alfa-code:css",  taCss.value);
      save("alfa-code:js",   taJs.value);
      saveTimer = null;
    }, 400);
  }
  function flushPersist() {
    if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
    save("alfa-code:html", taHtml.value);
    save("alfa-code:css",  taCss.value);
    save("alfa-code:js",   taJs.value);
  }
  window.addEventListener("beforeunload", flushPersist);

  /* ---------- HTML / CSS / JS splitting ---------- */
  function splitHTML(input) {
    if (!input) return { html: '', css: '', js: '' };

    var styles  = [];
    var scripts = [];

    try {
      var parser = new DOMParser();
      var doc = parser.parseFromString(input, 'text/html');
      var styleNodes = doc.querySelectorAll('style');
      for (var i = 0; i < styleNodes.length; i++) {
        var t = styleNodes[i].textContent;
        if (t && t.trim()) styles.push(t);
      }
      var scriptNodes = doc.querySelectorAll('script');
      for (var j = 0; j < scriptNodes.length; j++) {
        var s = scriptNodes[j];
        if (!s.src && s.textContent && s.textContent.trim()) scripts.push(s.textContent);
      }
    } catch (e) {
      console.warn("[Alfa-Code] DOMParser split failed, using regex only:", e);
    }

    var html = input
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script\b([^>]*)>[\s\S]*?<\/script>/gi, function (match, attrs) {
        return /\bsrc\s*=/i.test(attrs) ? match : '';
      })
      .replace(/<script\b[^>]*\/>/gi, function (match) {
        return /\bsrc\s*=/i.test(match) ? match : '';
      })
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return {
      html: html,
      css:  styles.map(function (s) { return s.trim(); }).join('\n\n'),
      js:   scripts.map(function (s) { return s.trim(); }).join('\n\n')
    };
  }

  function looksLikeFullDocument(text) {
    return /<!doctype\s+html/i.test(text) || /<html[\s>]/i.test(text);
  }

  /* ---------- Render preview (BUG FIXED HERE) ---------- */
  /*
   * روش قبلی با Regex تلاش می‌کرد <style> را در <head> تزریق کند، اما اگر
   * سند HTML دارای DOCTYPE بود و تگ <html> یا <head> نداشت (مثل
   * <!DOCTYPE html><body>...</body>)، هیچ تطابقی پیدا نمی‌شد و CSS از دست
   * می‌رفت. راه‌حل: با DOMParser سند را نرمال می‌کنیم و سپس style/script را
   * در جای درست به درخت DOM اضافه می‌کنیم.
   */
  function buildDocument() {
    var html = taHtml.value || '';
    var css  = taCss.value  || '';
    var js   = taJs.value   || '';

    // Escape closing tags so the parser doesn't close the outer <style>/<script>
    var safeCss = css.replace(/<\/style/gi, '<\\/style');
    var safeJs  = js.replace(/<\/script/gi, '<\\/script');

    // Normalize HTML into a full document (adds <html>/<head>/<body> if missing)
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');

    // Ensure charset
    if (!doc.querySelector('meta[charset]')) {
      var metaCharset = doc.createElement('meta');
      metaCharset.setAttribute('charset', 'utf-8');
      doc.head.insertBefore(metaCharset, doc.head.firstChild);
    }
    // Ensure viewport
    if (!doc.querySelector('meta[name="viewport"]')) {
      var metaViewport = doc.createElement('meta');
      metaViewport.setAttribute('name', 'viewport');
      metaViewport.setAttribute('content', 'width=device-width,initial-scale=1');
      doc.head.appendChild(metaViewport);
    }

    // Inject CSS into <head>
    var styleEl = doc.createElement('style');
    styleEl.textContent = safeCss;
    doc.head.appendChild(styleEl);

    // Inject JS at end of <body>
    var scriptEl = doc.createElement('script');
    scriptEl.textContent = safeJs;
    doc.body.appendChild(scriptEl);

    return '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
  }

  var timer = null;
  function render() {
    frame.srcdoc = buildDocument();
  }
  function schedule() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(render, 250);
  }

  [taHtml, taCss, taJs].forEach(function (ta) {
    ta.addEventListener("input", function () { schedule(); persist(); });
  });

  /* ---------- Import: apply a full HTML file's content ---------- */
  function applyImportedFile(text, fileName) {
    console.log("[Alfa-Code] Importing file:", fileName || "(pasted)");
    var parts = splitHTML(text);

    taHtml.value = parts.html || '';
    taCss.value  = parts.css  || '';
    taJs.value   = parts.js   || '';
    persist();
    render();

    var htmlTab = document.getElementById("tab-html");
    if (htmlTab) htmlTab.click();

    var summary = "Imported" + (fileName ? " " + fileName : "") + " — ";
    var parts_list = [];
    if (parts.css)  parts_list.push("CSS: " + parts.css.length + " chars");
    if (parts.js)   parts_list.push("JS: " + parts.js.length + " chars");
    parts_list.push("HTML: " + parts.html.length + " chars");
    showToast(summary + parts_list.join(" · "));
  }

  if (importFile) {
    importFile.addEventListener("change", function (e) {
      console.log("[Alfa-Code] File input change fired");
      var file = e.target.files && e.target.files[0];
      if (!file) return;

      var reader = new FileReader();
      reader.onload = function () {
        try {
          applyImportedFile(String(reader.result || ""), file.name);
        } catch (err) {
          console.error("[Alfa-Code] Import failed:", err);
          showToast("Import failed: " + (err && err.message ? err.message : "unknown error"), true);
        }
      };
      reader.onerror = function () {
        console.error("[Alfa-Code] FileReader error:", reader.error);
        showToast("Could not read the file.", true);
      };
      reader.readAsText(file);

      // Allow re-importing the same file
      e.target.value = "";
    });
  }

  if (importBtn && importFile) {
    importBtn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        importBtn.click();
      }
    });
    importBtn.addEventListener("click", function () {
      console.log("[Alfa-Code] Import button clicked (dialog should open)");
    });
  }

  /* ---------- Paste: auto-split full HTML ---------- */
  taHtml.addEventListener("paste", function (e) {
    var cd = e.clipboardData || window.clipboardData;
    if (!cd) return;
    var text = cd.getData("text/plain");
    if (!text || !looksLikeFullDocument(text)) return;

    e.preventDefault();

    var parts = splitHTML(text);

    var start = taHtml.selectionStart;
    var end   = taHtml.selectionEnd;
    var before = taHtml.value.substring(0, start);
    var after  = taHtml.value.substring(end);
    var inserted = parts.html;
    taHtml.value = before + inserted + after;
    var newPos = before.length + inserted.length;
    taHtml.selectionStart = taHtml.selectionEnd = newPos;

    if (parts.css) {
      taCss.value = taCss.value ? (taCss.value.replace(/\s+$/, '') + '\n\n' + parts.css) : parts.css;
    }
    if (parts.js) {
      taJs.value = taJs.value ? (taJs.value.replace(/\s+$/, '') + '\n\n' + parts.js) : parts.js;
    }

    persist();
    render();
    showToast("Pasted HTML split — CSS & JS moved to their tabs");
  });

  /* ---------- Drag & drop an HTML file onto the HTML textarea ---------- */
  ["dragover", "dragenter"].forEach(function (evt) {
    taHtml.addEventListener(evt, function (e) {
      e.preventDefault();
      e.stopPropagation();
      taHtml.classList.add("is-dragover");
    });
  });
  ["dragleave", "dragend"].forEach(function (evt) {
    taHtml.addEventListener(evt, function () {
      taHtml.classList.remove("is-dragover");
    });
  });
  taHtml.addEventListener("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();
    taHtml.classList.remove("is-dragover");
    var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try { applyImportedFile(String(reader.result || ""), file.name); }
      catch (err) {
        console.error("[Alfa-Code] Drop import failed:", err);
        showToast("Could not import dropped file.", true);
      }
    };
    reader.onerror = function () { showToast("Could not read the dropped file.", true); };
    reader.readAsText(file);
  });

  /* ---------- Initial render ---------- */
  render();
  console.log("[Alfa-Code] Editor initialized");
})();