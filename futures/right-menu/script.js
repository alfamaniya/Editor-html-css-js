(() => {
  const menu = document.querySelector(".right-menu");
  const workspace = document.querySelector(".workspace");
  const toggle = menu?.querySelector("[data-menu-toggle='right']");

  if (!menu || !workspace || !toggle) return;

  const setCollapsed = (collapsed) => {
    menu.classList.toggle("is-collapsed", collapsed);
    workspace.classList.toggle("right-menu-collapsed", collapsed);
    toggle.setAttribute("aria-expanded", String(!collapsed));
    toggle.setAttribute("aria-label", collapsed ? "Expand Right Sidebar" : "Collapse Right Sidebar");
    toggle.title = collapsed ? "Expand Right Sidebar" : "Collapse Right Sidebar";
    toggle.querySelector(".toggle-icon").textContent = collapsed ? "‹" : "›";
  };

  toggle.addEventListener("click", () => {
    setCollapsed(!menu.classList.contains("is-collapsed"));
  });

  setCollapsed(true);
})();
