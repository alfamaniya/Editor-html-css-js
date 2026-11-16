(() => {
  const menu = document.querySelector(".left-menu");
  const workspace = document.querySelector(".workspace");
  const toggle = menu?.querySelector("[data-menu-toggle='left']");

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

  setCollapsed(window.matchMedia("(max-width: 520px)").matches);
})();
