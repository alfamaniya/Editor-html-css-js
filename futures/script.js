/*
 * Shared workspace interactions.
 * Drag panel edges to resize the workspace columns and terminal areas.
 */
(() => {
  const workspace = document.querySelector(".workspace");
  if (!workspace) return;

  const root = document.documentElement;
  let drag = null;

  const isCollapsed = (selector) =>
    workspace.querySelector(selector)?.classList.contains("is-collapsed");

  workspace.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;

    const target = event.target;
    const terminal = target.closest(".terminal-panel");
    if (terminal) {
      const rect = terminal.getBoundingClientRect();
      if (Math.abs(event.clientY - rect.top) <= 6) {
        drag = { type: "terminal", start: event.clientY, initial: terminal.offsetHeight };
      }
    }

    if (!drag) {
      const left = target.closest(".left-menu");
      const editor = target.closest(".editor-panel");
      const right = target.closest(".right-menu");

      if (left && !isCollapsed(".left-menu")) {
        const rect = left.getBoundingClientRect();
        if (Math.abs(event.clientX - rect.right) <= 6) {
          drag = { type: "left", start: event.clientX, initial: rect.width };
        }
      } else if (editor) {
        const rect = editor.getBoundingClientRect();
        if (Math.abs(event.clientX - rect.right) <= 6) {
          drag = { type: "editor", start: event.clientX, initial: rect.width };
        }
      } else if (right && !isCollapsed(".right-menu")) {
        const rect = right.getBoundingClientRect();
        if (Math.abs(event.clientX - rect.left) <= 6) {
          drag = { type: "right", start: event.clientX, initial: rect.width };
        }
      }
    }

    if (drag) {
      event.preventDefault();
      workspace.classList.add("is-resizing");
      workspace.setPointerCapture(event.pointerId);
    }
  });

  workspace.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const delta = (drag.type === "terminal" ? drag.start - event.clientY : event.clientX - drag.start);
    const value = drag.initial + delta;

    if (drag.type === "left") {
      root.style.setProperty("--left-menu-width", Math.max(150, Math.min(420, value)) + "px");
    } else if (drag.type === "right") {
      root.style.setProperty("--right-menu-width", Math.max(150, Math.min(420, drag.initial - delta)) + "px");
    } else if (drag.type === "editor") {
      const total = workspace.querySelector(".editor-panel").offsetWidth +
        workspace.querySelector(".preview-panel").offsetWidth;
      const editorWidth = Math.max(240, Math.min(total - 240, value));
      root.style.setProperty("--editor-width", editorWidth + "px");
      root.style.setProperty("--preview-width", (total - editorWidth) + "px");
    } else if (drag.type === "terminal") {
      root.style.setProperty("--terminal-height", Math.max(90, Math.min(420, value)) + "px");
    }
  });

  const stopDragging = () => {
    drag = null;
    workspace.classList.remove("is-resizing");
  };
  workspace.addEventListener("pointerup", stopDragging);
  workspace.addEventListener("pointercancel", stopDragging);
})();
