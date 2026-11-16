(() => {
  const menu = document.querySelector(".left-menu");
  const workspace = document.querySelector(".workspace");
  const toggle = menu?.querySelector("[data-menu-toggle='left']");
  const tree = menu?.querySelector(".file-tree");

  if (!menu || !workspace || !toggle) return;

  const setCollapsed = (collapsed) => {
    menu.classList.toggle("is-collapsed", collapsed);
    workspace.classList.toggle("left-menu-collapsed", collapsed);
    toggle.setAttribute("aria-expanded", String(!collapsed));
    toggle.setAttribute("aria-label", collapsed ? "Expand File Manager" : "Collapse File Manager");
    toggle.title = collapsed ? "Expand File Manager" : "Collapse File Manager";
    toggle.querySelector(".toggle-icon").textContent = collapsed ? "›" : "‹";
  };

  toggle.addEventListener("click", () => {
    setCollapsed(!menu.classList.contains("is-collapsed"));
  });

  const selectFile = (fileId) => {
    const editor = window.workspaceEditor;
    if (!editor) return;

    try {
      editor.openFile(fileId);
      tree?.querySelectorAll("[data-open-file]").forEach((item) => {
        const active = item.dataset.openFile === fileId;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });
      document.querySelectorAll(".editor-tab[data-file]").forEach((tab) => {
        const active = tab.dataset.file === fileId;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
      });
    } catch (error) {
      console.error("[File Manager] Unable to open file:", error);
    }
  };

  tree?.addEventListener("click", (event) => {
    const item = event.target.closest("[data-open-file]");
    if (item) selectFile(item.dataset.openFile);
  });

  window.addEventListener("workspace:editor-ready", (event) => {
    if (event.detail?.editor) window.workspaceEditor = event.detail.editor;
  });

  setCollapsed(true);
})();
