/*
 * Shared nav-toggle behavior for the header chrome, used on every page.
 *
 * The header uses a single consolidated <nav id="site-nav"> for both
 * desktop and mobile - there is no separate mobile-only nav DOM. Each
 * category trigger is one <a data-nav-group> that is a real link (desktop:
 * navigates on click, dropdown opens on hover via CSS `group-hover`) and
 * also a disclosure toggle (mobile: click expands/collapses its submenu
 * instead of navigating, since narrow viewports have no hover). Which
 * behavior applies is decided at click time via matchMedia, not by two
 * separate elements, so the markup and category data can't drift out of
 * sync between breakpoints the way two independent nav blocks could.
 *
 * Loaded with `defer`, after each page's own page-behavior script, so the
 * DOM is already fully parsed by the time this file runs.
 */

const OPEN_LABEL = "Open menu";
const CLOSE_LABEL = "Close menu";
const DESKTOP_QUERY = "(min-width: 1024px)";

function isDesktop() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

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

  window.matchMedia(DESKTOP_QUERY).addEventListener("change", () => {
    collapseAllGroups();
    setPanelOpen(false);
  });
}

initNavToggle();
