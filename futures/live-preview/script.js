/*
 * Live Preview runtime.
 * Reads the three CodeMirror documents and renders them in an isolated iframe.
 */
(() => {
  const frame = document.querySelector("[data-live-preview-frame]");
  const status = document.querySelector("[data-preview-status]");
  const refreshButton = document.querySelector("[data-preview-refresh]");
  if (!frame || !status) return;

  let editorApi = null;
  let refreshTimer = 0;

  const setStatus = (message, state = "") => {
    status.classList.toggle("is-live", state === "live");
    status.classList.toggle("is-error", state === "error");
    status.lastChild.textContent = message;
  };

  const escapeStyle = (value) => value.replace(/<\/style/gi, "<\\/style");
  const escapeScript = (value) => value.replace(/<\/script/gi, "<\\/script");

  const buildDocument = () => {
    if (!editorApi) return "";
    const html = editorApi.getContent("html") || "";
    const css = editorApi.getContent("css") || "";
    const js = editorApi.getContent("javascript") || "";
    const styleTag = css ? "\n<style data-live-preview-style>\n" + escapeStyle(css) + "\n</style>\n" : "";
    const scriptTag = js ? "\n<script data-live-preview-script>\n" + escapeScript(js) + "\n</script>\n" : "";

    let documentText = html.trim();
    if (!documentText) {
      documentText = "<!doctype html><html><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"></head><body style=\"margin:0;min-height:100vh;display:grid;place-items:center;background:#f4f6f7;color:#647174;font:14px Arial,sans-serif\"><p>Start writing HTML, CSS or JavaScript to see your live preview.</p></body></html>";
    }

    if (styleTag) {
      if (/<\/head\s*>/i.test(documentText)) {
        documentText = documentText.replace(/<\/head\s*>/i, styleTag + "</head>");
      } else if (/<html\b[^>]*>/i.test(documentText)) {
        documentText = documentText.replace(/<html\b[^>]*>/i, (match) => match + "<head>" + styleTag + "</head>");
      } else {
        documentText = "<!doctype html><html><head><meta charset=\"UTF-8\">" + styleTag + "</head><body>" + documentText + "</body></html>";
      }
    }

    if (scriptTag) {
      if (/<\/body\s*>/i.test(documentText)) {
        documentText = documentText.replace(/<\/body\s*>/i, scriptTag + "</body>");
      } else if (/<\/html\s*>/i.test(documentText)) {
        documentText = documentText.replace(/<\/html\s*>/i, scriptTag + "</html>");
      } else {
        documentText += scriptTag;
      }
    }
    return documentText;
  };

  const render = () => {
    if (!editorApi) {
      setStatus("Editor unavailable", "error");
      return;
    }
    try {
      frame.srcdoc = buildDocument();
      setStatus("Live preview updated", "live");
    } catch (error) {
      setStatus("Preview could not be updated", "error");
      console.error("Live Preview:", error);
    }
  };

  const scheduleRender = () => {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(render, 180);
  };

  const connectEditor = (api) => {
    if (!api || typeof api.getContent !== "function") return;
    editorApi = api;
    render();
  };

  window.addEventListener("workspace:editor-ready", (event) => {
    connectEditor(event.detail?.editor || window.workspaceEditor);
  });
  window.addEventListener("workspace:editor-change", scheduleRender);
  refreshButton?.addEventListener("click", render);

  if (window.workspaceEditor) connectEditor(window.workspaceEditor);
  else setStatus("Waiting for editor");
})();