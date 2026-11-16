(function () {
  const MONACO_VERSION = "0.52.2";
  const MONACO_BASE = "https://cdn.jsdelivr.net/npm/monaco-editor@" + MONACO_VERSION + "/min";
  const host = document.getElementById("monaco-editor");

  function loadMonaco() {
    if (!window.require) return Promise.reject(new Error("The Monaco loader did not load. Check your network connection and CDN access."));
    window.MonacoEnvironment = {
      getWorkerUrl() {
        const workerMain = MONACO_BASE + "/vs/base/worker/workerMain.js";
        const source = "self.MonacoEnvironment = { baseUrl: '" + MONACO_BASE + "/' }; importScripts('" + workerMain + "');";
        return "data:text/javascript;charset=utf-8," + encodeURIComponent(source);
      }
    };
    window.require.config({ paths: { vs: MONACO_BASE + "/vs" } });
    return new Promise((resolve, reject) => window.require(["vs/editor/editor.main"], () => resolve(window.monaco), reject));
  }

  function setActiveTab(fileId) {
    document.querySelectorAll(".editor-tab[data-file]").forEach(tab => {
      const active = tab.dataset.file === fileId;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
  }
  function showLoading(message, isError = false) {
    const loading = document.querySelector("[data-editor-loading]");
    if (!loading) return;
    loading.hidden = false; loading.textContent = message;
    loading.classList.toggle("is-error", isError);
  }
  async function initializeEditor() {
    if (!host) throw new Error("The Monaco host element #monaco-editor was not found.");
    if (typeof window.createEditorCore !== "function") throw new Error("The Monaco editor core did not load.");
    showLoading("Loading Monaco Editor…");
    const monaco = await loadMonaco();
    const core = window.createEditorCore(monaco, host);
    document.querySelector("[data-editor-loading]")?.setAttribute("hidden", "");
    document.querySelectorAll(".editor-tab[data-file]").forEach(tab => tab.addEventListener("click", () => {
      core.openFile(tab.dataset.file); setActiveTab(tab.dataset.file);
    }));
    document.querySelectorAll("[data-editor-action]").forEach(button => button.addEventListener("click", () => {
      const action = button.dataset.editorAction;
      if (action === "undo") core.editor.trigger("toolbar", "undo", null);
      if (action === "redo") core.editor.trigger("toolbar", "redo", null);
      if (action === "clear") core.setValue(core.getActiveFile(), "");
    }));
    window.addEventListener("resize", () => core.layout());
    window.dispatchEvent(new CustomEvent("workspace:editor-ready", { detail: { editor: core } }));
  }
  initializeEditor().catch(error => {
    console.error("[Editor] Monaco initialization failed:", error);
    showLoading("Unable to load Monaco Editor. Check your connection and refresh.", true);
  });
})();
