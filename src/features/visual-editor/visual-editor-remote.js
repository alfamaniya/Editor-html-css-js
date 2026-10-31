/* ویرایش مستقیم المان انتخاب‌شده از پیش‌نمایش Editor اصلی */
(() => {
  "use strict";
  const DEFINITIONS = [
    { property: "color", label: "رنگ متن", type: "color" },
    { property: "background-color", label: "رنگ پس‌زمینه", type: "color" },
    { property: "font-size", label: "اندازهٔ متن", type: "number", unit: "px" },
    { property: "font-weight", label: "ضخامت متن", type: "select", options: ["300", "400", "500", "600", "700", "800", "900"] },
    { property: "text-align", label: "تراز متن", type: "select", options: ["left", "center", "right", "justify", "start", "end"] },
    { property: "width", label: "عرض", type: "number", unit: "px" },
    { property: "height", label: "ارتفاع", type: "number", unit: "px" },
    { property: "border-radius", label: "گردی گوشه‌ها", type: "number", unit: "px" },
    { property: "padding", label: "فاصلهٔ داخلی", type: "text" },
    { property: "margin", label: "فاصلهٔ بیرونی", type: "text" },
    { property: "opacity", label: "شفافیت", type: "number", unit: "" },
    { property: "display", label: "نحوهٔ نمایش", type: "select", options: ["block", "inline", "inline-block", "flex", "grid", "none"] },
    { property: "border", label: "کادر", type: "text" }
  ];
  const ALLOWED = new Set(DEFINITIONS.map(item => item.property));
  let target = null, changes = Object.create(null), previewNode = null, toolbar = null, waiting = false;
  const byId = id => document.getElementById(id);
  function send(message) { if (window.parent && window.parent !== window) window.parent.postMessage(message, "*"); }
  function colorToHex(value) {
    const text = String(value || "").trim();
    if (/^#[0-9a-f]{6}$/i.test(text)) return text;
    if (/^#[0-9a-f]{3}$/i.test(text)) return "#" + text.slice(1).split("").map(char => char + char).join("");
    const match = text.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
    if (!match) return "#000000";
    return "#" + match.slice(1, 4).map(part => Math.max(0, Math.min(255, Number(part))).toString(16).padStart(2, "0")).join("");
  }
  function controlValue(definition, value) {
    if (definition.type === "color") return colorToHex(value);
    if (definition.type === "number") { const number = parseFloat(value); return Number.isFinite(number) ? String(number) : ""; }
    return String(value || "");
  }
  function cssValue(definition, raw) {
    const value = String(raw ?? "").trim();
    if (!value) return "";
    return definition.unit === "px" ? value + "px" : value;
  }
  function safePreviewNode(markup) {
    if (typeof markup !== "string" || !markup.trim() || markup.length > 100000) throw new Error("ساختار HTML المان برای پیش‌نمایش بیش از حد بزرگ یا نامعتبر است.");
    const parsed = new DOMParser().parseFromString("<!doctype html><body>" + markup + "</body>", "text/html");
    const sourceNode = parsed.body.firstElementChild;
    if (!sourceNode) throw new Error("ساختار المان انتخاب‌شده قابل نمایش نیست.");
    const blocked = new Set(["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED", "LINK", "META", "BASE"]);
    const node = document.importNode(sourceNode, true);
    [node, ...node.querySelectorAll("*")].forEach(element => {
      if (blocked.has(element.tagName)) { element.remove(); return; }
      Array.from(element.attributes).forEach(attribute => {
        const name = attribute.name.toLowerCase(), value = attribute.value.trim();
        if (name.startsWith("on") || ((name === "href" || name === "src" || name === "xlink:href") && /^\s*javascript:/i.test(value))) element.removeAttribute(attribute.name);
      });
    });
    return node;
  }
  function addToolbar() {
    if (toolbar) return toolbar;
    const workspace = document.querySelector(".workspace"), body = document.querySelector(".workspace-body");
    if (!workspace || !body) throw new Error("ساختار محیط Visual Editor پیدا نشد.");
    const style = document.createElement("style");
    style.id = "external-target-mode-style";
    style.textContent = ".app.external-target-mode{grid-template-columns:minmax(0,1fr)!important}.app.external-target-mode>.editor-panel,.app.external-target-mode>.splitter,.app.external-target-mode .palette-library{display:none!important}.app.external-target-mode>.workspace{grid-column:1;min-width:0}.external-target-toolbar{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:12px 18px;background:#fff;border-bottom:1px solid #e5e9f1}.external-target-summary{min-width:0;flex:1;color:#273449;font-size:12px;font-weight:700;overflow-wrap:anywhere}.external-target-summary small{display:block;margin-top:4px;color:#8591a5;font-size:10px;font-weight:500}.external-target-actions{display:flex;gap:7px}.external-target-actions button{border:1px solid #d9deea;border-radius:8px;padding:8px 12px;background:#fff;color:#344054;font:600 11px Tahoma,Arial;cursor:pointer}.external-target-actions button.primary{border-color:#5f54d8;background:#6559df;color:#fff}.external-target-actions button:disabled{opacity:.55;cursor:wait}.external-target-status{flex-basis:100%;color:#78849a;font-size:10px}.external-preview-shell{display:flex;align-items:flex-start;justify-content:center;min-height:220px;padding:36px 24px;border:1px dashed #c9c4ff;border-radius:12px;background:linear-gradient(135deg,#fff,#f8f8ff);overflow:auto}.external-preview-shell>*{max-width:100%!important}.app.external-target-mode .props-panel{display:flex!important}.app.external-target-mode .props-panel .props-section{padding:14px 16px}@media(max-width:760px){.external-target-toolbar{padding:10px 12px}.external-preview-shell{padding:22px 12px}}";
    document.head.appendChild(style);
    toolbar = document.createElement("section");
    toolbar.id = "externalTargetBar"; toolbar.className = "external-target-toolbar";
    toolbar.setAttribute("aria-label", "ویرایش المان انتخاب‌شده از صفحهٔ اصلی");
    const summary = document.createElement("div"); summary.id = "externalTargetSummary"; summary.className = "external-target-summary";
    const actions = document.createElement("div"); actions.className = "external-target-actions";
    const apply = document.createElement("button"); apply.id = "remoteTargetApply"; apply.className = "primary"; apply.type = "button"; apply.textContent = "ثبت تغییرات در کد اصلی";
    const cancel = document.createElement("button"); cancel.id = "remoteTargetCancel"; cancel.type = "button"; cancel.textContent = "انصراف و بازگشت";
    const status = document.createElement("div"); status.id = "externalTargetStatus"; status.className = "external-target-status"; status.setAttribute("role", "status"); status.setAttribute("aria-live", "polite");
    apply.addEventListener("click", () => {
      if (!target || waiting) return;
      waiting = true; apply.disabled = true; cancel.disabled = true; status.textContent = "در حال ثبت تغییرات در کد HTML پروژه…";
      send({ editorVisualEditorCommit: { sessionId: target.sessionId, styles: { ...changes } } });
    });
    cancel.addEventListener("click", () => {
      if (!target || waiting) return;
      waiting = true; apply.disabled = true; cancel.disabled = true; status.textContent = "در حال بازگرداندن استایل اولیه…";
      send({ editorVisualEditorCancel: { sessionId: target.sessionId } });
    });
    actions.append(apply, cancel); toolbar.append(summary, actions, status); workspace.insertBefore(toolbar, body);
    return toolbar;
  }
  function renderControls(selection) {
    const panel = byId("propsPanel"), type = byId("propsType"), styleControls = byId("styleControls");
    const hoverSection = byId("hoverControls")?.closest(".props-section"), actionSection = byId("actionList")?.closest(".props-section");
    if (!panel || !type || !styleControls) throw new Error("پنل ویژگی‌های Visual Editor پیدا نشد.");
    panel.classList.add("visible"); panel.setAttribute("aria-hidden", "false"); panel.hidden = false;
    type.textContent = "<" + selection.tag + ">" + (selection.id ? " · #" + selection.id : "");
    byId("deleteComponentBtn").hidden = true; byId("addActionBtn").hidden = true;
    if (hoverSection) hoverSection.hidden = true; if (actionSection) actionSection.hidden = true;
    styleControls.replaceChildren();
    DEFINITIONS.forEach(definition => {
      const row = document.createElement("div"); row.className = "prop-row";
      const label = document.createElement("label"); label.textContent = definition.label;
      label.htmlFor = "remote-style-" + definition.property.replace(/[^a-z0-9-]/gi, "-");
      let input;
      if (definition.type === "select") {
        input = document.createElement("select");
        const current = String(selection.computedStyle?.[definition.property] || "");
        Array.from(new Set([current, ...definition.options].filter(Boolean))).forEach(value => {
          const option = document.createElement("option"); option.value = value; option.textContent = value; input.appendChild(option);
        });
      } else {
        input = document.createElement("input"); input.type = definition.type === "color" ? "color" : definition.type;
        if (definition.type === "number") input.step = "any";
        if (definition.type === "text") input.spellcheck = false;
      }
      input.id = "remote-style-" + definition.property.replace(/[^a-z0-9-]/gi, "-");
      input.value = controlValue(definition, selection.computedStyle?.[definition.property]);
      input.addEventListener("input", () => {
        if (!target || waiting) return;
        const value = cssValue(definition, input.value); changes[definition.property] = value;
        if (previewNode) { if (value) previewNode.style.setProperty(definition.property, value); else previewNode.style.removeProperty(definition.property); }
        send({ editorVisualEditorApplyStyle: { sessionId: target.sessionId, property: definition.property, value } });
        const status = byId("externalTargetStatus");
        if (status) status.textContent = "پیش‌نمایش زنده است؛ برای ذخیره در HTML دکمهٔ ثبت تغییرات را بزنید.";
      });
      row.append(label, input); styleControls.appendChild(row);
    });
  }
  function begin(selection) {
    if (!selection || typeof selection.sessionId !== "string" || typeof selection.tag !== "string") return;
    try {
      target = selection; changes = Object.create(null); waiting = false;
      const app = document.querySelector(".app"), editorPanel = document.querySelector(".editor-panel"), splitter = document.querySelector(".splitter");
      const canvas = byId("canvas");
      addToolbar();
      const summary = byId("externalTargetSummary");
      app.classList.add("external-target-mode");
      if (editorPanel) editorPanel.hidden = true; if (splitter) splitter.hidden = true;
      const title = document.createElement("span");
      title.textContent = "<" + selection.tag + ">" + (selection.id ? "  #" + selection.id : "") + ((selection.classes || []).length ? "  ." + selection.classes.join(".") : "");
      const sub = document.createElement("small");
      sub.textContent = (selection.text || "المان انتخاب‌شده از پیش‌نمایش") + (selection.bounds ? " · " + Math.round(selection.bounds.width) + " × " + Math.round(selection.bounds.height) + " px" : "");
      summary.replaceChildren(title, sub);
      const wrapper = document.createElement("div"); wrapper.className = "external-preview-shell";
      previewNode = safePreviewNode(selection.outerHTML);
      Object.entries(selection.computedStyle || {}).forEach(([property, value]) => { if (ALLOWED.has(property) && value) previewNode.style.setProperty(property, String(value)); });
      previewNode.style.setProperty("max-width", "100%", "important");
      wrapper.appendChild(previewNode); canvas.replaceChildren(wrapper); canvas.classList.remove("empty");
      const status = byId("externalTargetStatus");
      if (status) status.textContent = "المان اصلی انتخاب شده است؛ تغییرات به‌صورت زنده روی همان المان در پیش‌نمایش اعمال می‌شوند.";
      renderControls(selection);
    } catch (error) {
      target = null; waiting = false; send({ editorVisualEditorCancel: { sessionId: selection.sessionId } });
      const status = byId("externalTargetStatus");
      if (status) status.textContent = error.message || "بازکردن المان انتخاب‌شده ناموفق بود.";
      else console.error("Visual editor target setup failed:", error);
    }
  }
  window.addEventListener("message", event => {
    if (event.source !== window.parent || !event.data) return;
    if (event.data.editorVisualEditorSelection) { begin(event.data.editorVisualEditorSelection); return; }
    if (event.data.editorVisualEditorError) {
      waiting = false;
      const apply = byId("remoteTargetApply"), cancel = byId("remoteTargetCancel");
      if (apply) apply.disabled = false; if (cancel) cancel.disabled = false;
      const status = byId("externalTargetStatus"); if (status) status.textContent = String(event.data.editorVisualEditorError);
      return;
    }
    if (event.data.editorVisualEditorFinished) {
      const result = event.data.editorVisualEditorFinished;
      if (result.ok) {
        waiting = false;
        target = null;
        changes = Object.create(null);
        previewNode = null;
        const status = byId("externalTargetStatus");
        if (status) status.textContent = result.action === "cancel" ? "تغییرات لغو شد." : "تغییرات در کد اصلی ثبت شد.";
        send({ editorVisualEditorResetting: true });
        setTimeout(() => window.location.reload(), 80);
      } else {
        waiting = false;
        const apply = byId("remoteTargetApply"), cancel = byId("remoteTargetCancel");
        if (apply) apply.disabled = false; if (cancel) cancel.disabled = false;
        const status = byId("externalTargetStatus"); if (status) status.textContent = result.message || "ثبت تغییرات ناموفق بود.";
      }
    }
  });
  document.documentElement.dataset.visualEditorReady = "true";
  send({ editorVisualEditorReady: true });
})();