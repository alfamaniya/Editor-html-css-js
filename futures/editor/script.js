/*
 * CodeMirror 6 integration for the Futures editor workspace.
 * Each open file keeps its own EditorState while sharing one editor view.
 */
(() => {
  const host = document.getElementById("editor-host");
  const loading = document.querySelector("[data-editor-loading]");
  const tabs = [...document.querySelectorAll(".editor-tab[data-file]")];
  const fileItems = [...document.querySelectorAll("[data-open-file]")];
  const actionButtons = [...document.querySelectorAll("[data-editor-action]")];

  if (!host) return;

  const engine = window.EditorCodeMirror;
  if (!engine?.EditorState || !engine?.EditorView || !engine?.extensions) {
    if (loading) {
      loading.textContent = "CodeMirror could not be loaded. Check the local editor bundle.";
      loading.classList.add("is-error");
    }
    return;
  }

  const files = {
    html: { name: "index.html", language: engine.extensions.html },
    css: { name: "style.css", language: engine.extensions.css },
    javascript: { name: "script.js", language: engine.extensions.javascript }
  };

  const states = {};
  Object.entries(files).forEach(([id, file]) => {
    states[id] = engine.EditorState.create({
      doc: "",
      extensions: [
        ...engine.extensions.base,
        file.language,
        engine.EditorView.updateListener.of((update) => {
          if (!update.docChanged) return;
          window.dispatchEvent(new CustomEvent("workspace:editor-change", {
            detail: { fileId: id, content: update.state.doc.toString() }
          }));
        })
      ]
    });
  });

  let activeFile = "html";
  const view = new engine.EditorView({
    state: states[activeFile],
    parent: host
  });

  const updateActiveState = () => {
    states[activeFile] = view.state;
  };

  const setActiveFile = (fileId) => {
    if (!files[fileId] || fileId === activeFile) return;

    updateActiveState();
    activeFile = fileId;
    view.setState(states[activeFile]);

    tabs.forEach((tab) => {
      const active = tab.dataset.file === activeFile;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    fileItems.forEach((item) => {
      const active = item.dataset.openFile === activeFile;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });

    view.focus();
  };

  const dispatchEditorShortcut = (key, shiftKey = false) => {
    view.focus();
    view.contentDOM.dispatchEvent(new KeyboardEvent("keydown", {
      key,
      ctrlKey: true,
      shiftKey,
      bubbles: true,
      cancelable: true
    }));
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setActiveFile(tab.dataset.file));
  });

  actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.editorAction;
      if (action === "undo") dispatchEditorShortcut("z");
      if (action === "redo") dispatchEditorShortcut("z", true);
      if (action === "clear") {
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: "" }
        });
        view.focus();
      }
    });
  });

  const api = Object.freeze({
    openFile: setActiveFile,
    getActiveFile: () => activeFile,
    getContent: (fileId = activeFile) => {
      if (!files[fileId]) return null;
      return fileId === activeFile ? view.state.doc.toString() : states[fileId].doc.toString();
    },
    setContent: (fileId, content) => {
      if (!files[fileId]) return false;
      if (fileId === activeFile) {
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: String(content ?? "") }
        });
      } else {
        states[fileId] = states[fileId].update({
          changes: { from: 0, to: states[fileId].doc.length, insert: String(content ?? "") }
        });
        window.dispatchEvent(new CustomEvent("workspace:editor-change", {
          detail: { fileId, content: states[fileId].doc.toString() }
        }));
      }
      return true;
    },
    focus: () => view.focus(),
    view
  });

  window.workspaceEditor = api;
  window.dispatchEvent(new CustomEvent("workspace:editor-ready", {
    detail: { editor: api }
  }));

  if (loading) loading.hidden = true;
})();
