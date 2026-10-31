(function () {
  "use strict";

  const LANGUAGE_KEY = "editor-v-language";
  const VALID_LANGUAGES = new Set(["fa", "en"]);
  const EXCLUDED_CONTENT = ".editor-pane, .code-area, #output, #wordTreeContent, .help-content, pre, code, script, style, textarea";
  const root = document.documentElement;
  const locales = window.EditorVLocales || {};
  const languageButton = document.getElementById("languageToggleButton");
  const nativeAlert = window.alert.bind(window);
  const nativeConfirm = window.confirm.bind(window);
  const nativePrompt = window.prompt.bind(window);
  let language = "fa";
  let observer = null;

  try {
    const saved = window.localStorage.getItem(LANGUAGE_KEY);
    if (VALID_LANGUAGES.has(saved)) language = saved;
  } catch (error) {
    console.warn("Could not read the saved interface language:", error);
  }

  function translateFromDictionary(value, dictionary, reverse) {
    if (!dictionary || typeof value !== "string") return null;
    if (!reverse && Object.prototype.hasOwnProperty.call(dictionary, value)) return dictionary[value];
    for (const template of Object.keys(dictionary)) {
      if (!template.includes("{") || !template.includes("}")) continue;
      const sourceTemplate = reverse ? dictionary[template] : template;
      const targetTemplate = reverse ? template : dictionary[template];
      const names = [];
      const pattern = new RegExp("^" + sourceTemplate.split(/(\{[a-zA-Z][\w]*\})/).map((part) => {
        if (/^\{[a-zA-Z][\w]*\}$/.test(part)) {
          names.push(part.slice(1, -1));
          return "([\\s\\S]*?)";
        }
        return part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }).join("") + "$");
      const match = value.match(pattern);
      if (!match) continue;
      let translated = targetTemplate;
      names.forEach((name, index) => {
        let replacement = match[index + 1];
        if (language === "en") replacement = replacement.replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit));
        if (language === "fa") replacement = replacement.replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
        translated = translated.replace("{" + name + "}", replacement);
      });
      return translated;
    }
    if (reverse) {
      for (const [source, target] of Object.entries(dictionary)) {
        if (target === value) return source;
      }
    }
    return null;
  }

  function translateText(value) {
    if (typeof value !== "string") return value;
    const direct = translateFromDictionary(value, locales[language], false);
    if (direct !== null) return direct;
    return translateFromDictionary(value, locales[language === "fa" ? "en" : "fa"], true) ?? value;
  }

  function isExcluded(element) {
    if (!element) return false;
    if (element.closest("#canvas") && !element.closest("#canvas .hint")) return true;
    return Boolean(element.closest(EXCLUDED_CONTENT));
  }

  function translateElement(element) {
    if (!(element instanceof Element) || isExcluded(element)) return;
    const attributes = ["title", "placeholder", "aria-label", "aria-description", "alt"];
    const elements = [element, ...element.querySelectorAll("*")];
    elements.forEach((currentElement) => {
      if (isExcluded(currentElement)) return;
      attributes.forEach((attribute) => {
        if (!currentElement.hasAttribute(attribute)) return;
        const current = currentElement.getAttribute(attribute);
        const translated = translateText(current);
        if (translated !== current) currentElement.setAttribute(attribute, translated);
      });
    });

    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) translateTextNode(node);
  }

  function translateTextNode(node) {
    if (!(node instanceof Text) || !node.nodeValue) return;

    // MutationObserver can deliver a characterData record after its text node
    // has already been detached from the document. Skip detached nodes safely.
    const parent = node.parentElement;
    if (!(parent instanceof Element) || !parent.isConnected || isExcluded(parent)) return;

    const value = node.nodeValue;
    const trimmed = value.trim();
    if (!trimmed) return;
    const translated = translateText(trimmed);
    if (translated === trimmed) return;
    const start = value.indexOf(trimmed);
    node.nodeValue = value.slice(0, start) + translated + value.slice(start + trimmed.length);
  }

  function updateLanguageButton() {
    if (!languageButton) return;
    languageButton.textContent = language === "fa" ? "EN" : "فا";
    languageButton.setAttribute(
      "aria-label",
      language === "fa" ? "Switch language to English" : "تغییر زبان به فارسی"
    );
    languageButton.title = language === "fa" ? "Switch language to English" : "تغییر زبان به فارسی";
  }

  function applyLanguage() {
    root.lang = language;
    root.dir = language === "fa" ? "rtl" : "ltr";
    root.dataset.language = language;
    document.body.dir = root.dir;
    document.querySelectorAll("[data-i18n-direction]").forEach((element) => {
      element.dir = root.dir;
    });
    if (language === "fa") document.documentElement.style.setProperty("--ui-font-family", "Tahoma, 'Segoe UI', sans-serif");
    else document.documentElement.style.setProperty("--ui-font-family", "'Segoe UI', Tahoma, sans-serif");

    translateElement(document.body);
    updateLanguageButton();
    translateElement(languageButton);
  }

  function setLanguage(nextLanguage, options) {
    if (!VALID_LANGUAGES.has(nextLanguage)) {
      console.error("Unsupported interface language:", nextLanguage);
      return false;
    }
    if (!locales[nextLanguage]) {
      console.error("Language resources are not loaded:", nextLanguage);
      return false;
    }
    language = nextLanguage;
    const settings = options || {};
    if (settings.persist !== false) {
      try {
        window.localStorage.setItem(LANGUAGE_KEY, language);
      } catch (error) {
        console.warn("Could not save the interface language:", error);
      }
    }
    applyLanguage();
    window.dispatchEvent(new CustomEvent("editor-language-change", {
      detail: { language: language, direction: language === "fa" ? "rtl" : "ltr" }
    }));
    if (settings.broadcast !== false && window.parent !== window) {
      window.parent.postMessage({ editorVLanguage: language }, "*");
    }
    return true;
  }

  if (languageButton) {
    languageButton.addEventListener("click", () => {
      setLanguage(language === "fa" ? "en" : "fa");
    });
  }

  window.addEventListener("message", (event) => {
    if (event.source !== window.parent || !event.data) return;
    const requestedLanguage = event.data.editorVSetLanguage || event.data.editorVLanguage;
    if (requestedLanguage !== language) setLanguage(requestedLanguage, { broadcast: false });
  });

  window.addEventListener("storage", (event) => {
    if (event.key === LANGUAGE_KEY && VALID_LANGUAGES.has(event.newValue) && event.newValue !== language) {
      setLanguage(event.newValue, { persist: false, broadcast: false });
    }
  });

  observer = new MutationObserver((records) => {
    records.forEach((record) => {
      if (record.type === "characterData") {
        translateTextNode(record.target);
        return;
      }
      if (record.type === "attributes") {
        translateElement(record.target);
        return;
      }
      record.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
        else if (node.nodeType === Node.ELEMENT_NODE) translateElement(node);
      });
    });
  });
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["title", "placeholder", "aria-label", "aria-description", "alt"]
  });

  window.ProjectI18n = Object.freeze({
    getLanguage: () => language,
    setLanguage: setLanguage,
    t: translateText
  });
  window.alert = (message) => nativeAlert(translateText(String(message)));
  window.confirm = (message) => nativeConfirm(translateText(String(message)));
  window.prompt = (message, value) => nativePrompt(translateText(String(message)), value);
  applyLanguage();
}());
