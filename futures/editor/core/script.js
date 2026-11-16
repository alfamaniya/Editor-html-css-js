(function () {
  const FILES = {
    html: { name: "index.html", language: "html", value: "<!doctype html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>My Project</title>\n</head>\n<body>\n  <h1>Hello, world!</h1>\n</body>\n</html>\n" },
    css: { name: "style.css", language: "css", value: "body {\n  margin: 0;\n  font-family: Arial, sans-serif;\n}\n" },
    javascript: { name: "script.js", language: "javascript", value: "console.log(\"Hello, world!\");\n" }
  };

  window.createEditorCore = function (monaco, host) {
    if (!monaco || !host) throw new Error("Monaco and its host element are required.");
    monaco.editor.defineTheme("workspace-dark", {
      base: "vs-dark", inherit: true, rules: [],
      colors: {
        "editor.background": "#0B1012", "editor.foreground": "#E6F0F0",
        "editorLineNumber.foreground": "#526566", "editorLineNumber.activeForeground": "#91A5A5",
        "editorCursor.foreground": "#55E5D9", "editor.selectionBackground": "#245B5A",
        "editor.inactiveSelectionBackground": "#1B4140", "editor.lineHighlightBackground": "#11191B",
        "editorIndentGuide.background1": "#263438", "editorIndentGuide.activeBackground1": "#42615F",
        "editorWidget.background": "#111719", "editorWidget.border": "#263438",
        "editorSuggestWidget.background": "#111719", "editorSuggestWidget.border": "#263438",
        "editorSuggestWidget.selectedBackground": "#192326"
      }
    });
    const models = Object.fromEntries(Object.entries(FILES).map(([id, file]) => [
      id, monaco.editor.createModel(file.value, file.language, monaco.Uri.parse("inmemory://workspace/" + file.name))
    ]));
    const editor = monaco.editor.create(host, {
      model: models.html, theme: "workspace-dark", automaticLayout: true,
      fontFamily: "Consolas, 'Courier New', monospace", fontSize: 14, lineHeight: 22,
      tabSize: 2, insertSpaces: true, minimap: { enabled: false },
      scrollBeyondLastLine: false, smoothScrolling: true, cursorBlinking: "smooth",
      cursorSmoothCaretAnimation: "on", renderWhitespace: "selection",
      bracketPairColorization: { enabled: true }, guides: { indentation: true, bracketPairs: true },
      folding: true, glyphMargin: true, padding: { top: 12, bottom: 12 },
      suggest: { preview: true }, wordWrap: "off"
    });
    let activeFile = "html";
    const emitChange = () => host.dispatchEvent(new CustomEvent("workspace:code-change", {
      bubbles: true, detail: { file: activeFile, name: FILES[activeFile].name, value: editor.getValue() }
    }));
    const changeSubscription = editor.onDidChangeModelContent(emitChange);
    function openFile(fileId) {
      if (!models[fileId]) throw new Error("Unknown workspace file: " + fileId);
      activeFile = fileId; editor.setModel(models[fileId]); editor.focus(); return models[fileId];
    }
    function getValue(fileId = activeFile) { return models[fileId]?.getValue() ?? null; }
    function setValue(fileId, value) {
      if (!models[fileId]) throw new Error("Unknown workspace file: " + fileId);
      models[fileId].setValue(String(value));
    }
    function getAllFiles() {
      return Object.fromEntries(Object.keys(FILES).map(id => [id, {
        name: FILES[id].name, language: FILES[id].language, value: models[id].getValue()
      }]));
    }
    const api = {
      editor, models, openFile, getValue, setValue, getAllFiles,
      getActiveFile: () => activeFile, focus: () => editor.focus(),
      layout: () => editor.layout(),
      dispose() {
        changeSubscription.dispose(); editor.dispose();
        Object.values(models).forEach(model => model.dispose());
      }
    };
    window.workspaceEditor = api;
    host.dispatchEvent(new CustomEvent("workspace:editor-ready", { bubbles: true }));
    return api;
  };
})();
