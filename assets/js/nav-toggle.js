const OPEN_LABEL = "Open menu";
const CLOSE_LABEL = "Close menu";
const DESKTOP_QUERY = "(min-width: 1024px)";

function isDesktop() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

// Keeps the trigger's aria-expanded, its panel's hidden state, and the
// chevron rotation in sync, so assistive tech and sighted users see the
// same open/closed state.
function setGroupExpanded(link, expanded) {
  link.setAttribute("aria-expanded", expanded ? "true" : "false");

  const panelId = link.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : null;
  if (panel) {
    panel.hidden = !expanded;
  }

  const chevron = link.querySelector("[data-nav-chevron]");
  if (chevron) {
    chevron.style.transform = expanded ? "rotate(180deg)" : "";
  }
}

function collapseAllGroups() {
  document.querySelectorAll("[data-nav-group]").forEach((link) => {
    setGroupExpanded(link, false);
  });
}

// Mirrors the open/closed state across the toggle's aria attributes,
// label text, and bars/close icon swap.
function setPanelOpen(open) {
  const toggle = document.getElementById("nav-toggle");
  const panel = document.getElementById("site-nav");
  if (!toggle || !panel) {
    return;
  }

  panel.hidden = !open;
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
  toggle.setAttribute("aria-label", open ? CLOSE_LABEL : OPEN_LABEL);

  const barsIcon = toggle.querySelector('[data-nav-icon="bars"]');
  if (barsIcon) {
    barsIcon.classList.toggle("hidden", open);
  }
  const closeIcon = toggle.querySelector('[data-nav-icon="close"]');
  if (closeIcon) {
    closeIcon.classList.toggle("hidden", !open);
  }

  if (!open) {
    collapseAllGroups();
  }
}

function initNavToggle() {
  const toggle = document.getElementById("nav-toggle");
  const panel = document.getElementById("site-nav");
  if (!toggle || !panel) {
    return;
  }

  setPanelOpen(false);

  toggle.addEventListener("click", () => {
    setPanelOpen(panel.hidden);
  });

  panel.addEventListener("click", (event) => {
    const link = event.target.closest("[data-nav-group]");
    // On desktop the link navigates normally and its dropdown opens on
    // hover via CSS, so only intercept the click on narrow viewports,
    // where there is no hover and the link instead toggles its submenu.
    if (!link || !panel.contains(link) || isDesktop()) {
      return;
    }
    event.preventDefault();
    const willExpand = link.getAttribute("aria-expanded") !== "true";
    collapseAllGroups();
    if (willExpand) {
      setGroupExpanded(link, true);
    }
  });

  // Reset any open/expanded state when crossing the breakpoint, so a menu
  // left open on mobile doesn't carry over after resizing to desktop.
  window.matchMedia(DESKTOP_QUERY).addEventListener("change", () => {
    collapseAllGroups();
    setPanelOpen(false);
  });
}

// Safe to call immediately: this script is loaded with `defer` after each
// page's own script, so the DOM is already fully parsed.
initNavToggle();
