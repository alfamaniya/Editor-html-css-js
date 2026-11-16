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

  const starterCode = {
  "html": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My First Project</title>\n</head>\n<body>\n  <main class=\"card\">\n    <span class=\"eyebrow\">FUTURES EDITOR</span>\n    <h1>Hello, world!</h1>\n    <p>Your workspace is ready. Edit the HTML, CSS and JavaScript to get started.</p>\n    <button id=\"actionButton\" type=\"button\">Click me</button>\n    <p id=\"message\" class=\"message\">Waiting for your first interaction.</p>\n  </main>\n</body>\n</html>",
  "css": "* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  padding: 24px;\n  background: #eef4f4;\n  color: #172525;\n  font-family: Arial, sans-serif;\n}\n\n.card {\n  width: min(100%, 520px);\n  padding: 40px;\n  border: 1px solid #d8e5e3;\n  border-radius: 20px;\n  background: #ffffff;\n  box-shadow: 0 18px 50px rgba(20, 55, 52, 0.10);\n}\n\n.eyebrow {\n  color: #159b91;\n  font-size: 12px;\n  font-weight: 700;\n  letter-spacing: 0.14em;\n}\n\nh1 {\n  margin: 14px 0;\n  font-size: clamp(32px, 7vw, 48px);\n}\n\np {\n  line-height: 1.7;\n  color: #617271;\n}\n\nbutton {\n  margin-top: 12px;\n  padding: 12px 20px;\n  border: 0;\n  border-radius: 10px;\n  background: #159b91;\n  color: white;\n  font: inherit;\n  font-weight: 700;\n  cursor: pointer;\n}\n\nbutton:hover {\n  background: #107d75;\n}\n\n.message {\n  min-height: 24px;\n  margin-bottom: 0;\n}",
  "javascript": "const button = document.querySelector(\"#actionButton\");\nconst message = document.querySelector(\"#message\");\n\nbutton.addEventListener(\"click\", () => {\n  message.textContent = \"Great! Your JavaScript is working.\";\n});"
};

  const states = {};
  Object.entries(files).forEach(([id, file]) => {
    states[id] = engine.EditorState.create({
      doc: starterCode[id],
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
