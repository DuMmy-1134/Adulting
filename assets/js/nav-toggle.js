/*
 * Shared mobile-nav-toggle behavior for the header chrome on all 3 pages
 * (index.html, pages/online-safety.html, pages/emergency-preparedness.html).
 *
 * (a) This script is not named after a single page because it serves the
 *     shared header chrome that is byte-identical across all 3 pages
 *     (enforced by tools/validate.mjs SITE-04 shared-chrome parity) — the
 *     same shared-asset precedent as assets/js/tailwind-config.js, which
 *     also serves all 3 pages rather than one.
 * (b) It is loaded with `defer`, after each page's own page-behavior
 *     script, so the DOM is already fully parsed by the time this file
 *     runs. That means no load-event listener is needed here — the
 *     deferred load order already guarantees the DOM is ready.
 * (c) Per SITE-03 and the Phase 9 09-UI-SPEC progressive-enhancement note,
 *     the mobile nav toggle is JS-dependent by design: a toggle button has
 *     no native no-JS equivalent (unlike the Phase 8 <details> accordion,
 *     which still works with JS off). This is an accepted, documented
 *     tradeoff for this milestone, not an oversight.
 */

const OPEN_LABEL = "Open menu";
const CLOSE_LABEL = "Close menu";

function setGroupExpanded(button, expanded) {
  button.setAttribute("aria-expanded", expanded ? "true" : "false");

  const listId = button.getAttribute("aria-controls");
  const list = listId ? document.getElementById(listId) : null;
  if (list) {
    list.hidden = !expanded;
  }

  const chevron = button.querySelector("[data-nav-chevron]");
  if (chevron) {
    chevron.style.transform = expanded ? "rotate(180deg)" : "";
  }
}

function collapseAllGroups() {
  const groups = document.querySelectorAll("[data-nav-group]");
  groups.forEach((button) => {
    setGroupExpanded(button, false);
  });
}

function setPanelOpen(open) {
  const toggle = document.getElementById("nav-toggle");
  const panel = document.getElementById("mobile-nav");
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
  const panel = document.getElementById("mobile-nav");
  if (!toggle || !panel) {
    return;
  }

  setPanelOpen(false);

  toggle.addEventListener("click", () => {
    setPanelOpen(panel.hidden);
  });

  panel.addEventListener("click", (event) => {
    const button = event.target.closest("[data-nav-group]");
    if (!button || !panel.contains(button)) {
      return;
    }
    const willExpand = button.getAttribute("aria-expanded") !== "true";
    collapseAllGroups();
    if (willExpand) {
      setGroupExpanded(button, true);
    }
  });
}

initNavToggle();
