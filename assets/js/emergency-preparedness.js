/*
 * Page-behavior script for pages/emergency-preparedness.html (the Emergency
 * Preparedness page).
 *
 * Convention for this project's content scripts (Phases 6-8 follow this):
 * - One script per page, named after the page it serves - this file,
 *   emergency-preparedness.js, serves pages/emergency-preparedness.html only.
 * - Loaded with `defer` after the two Tailwind script tags, so it runs
 *   once the DOM is fully parsed and never blocks page rendering.
 * - Page content data lives in a module-level `const` at the top of the
 *   file, kept separate from DOM logic.
 * - The DOM is reached only through ids and data-* hooks authored in the
 *   page markup, never by walking tags or reading Tailwind classes, so
 *   restyling the page cannot break this script's behavior.
 * - All injected copy is assigned with textContent, so page text can
 *   never be interpreted as markup.
 * - This script enhances rather than replaces the native
 *   <details>/<summary> elements - with JavaScript unavailable every
 *   guide still opens and closes, the script only adds mutual
 *   exclusivity, the status line, and the Collapse-all control.
 */

const STATUS_ALL_CLOSED_TEXT = "All action guides are closed.";
const STATUS_OPEN_PREFIX = "Showing: ";

// Both the status line and the Collapse-all button stay hidden/empty
// until the visitor opens (or collapses) a guide for the first time -
// there's nothing useful to say or collapse before that.
let hasInteracted = false;

function getGuides() {
  return document.querySelectorAll("[data-action-guide]");
}

function getGuideTitle(guide) {
  const titleEl = guide.querySelector("[data-guide-title]");
  if (!titleEl) {
    return "";
  }
  return titleEl.textContent.trim();
}

function renderStatus() {
  const statusEl = document.getElementById("action-guides-status");
  const collapseButton = document.getElementById("action-guides-collapse");

  if (collapseButton) {
    collapseButton.hidden = !hasInteracted;
  }

  if (!statusEl) {
    return;
  }

  if (!hasInteracted) {
    statusEl.textContent = "";
    return;
  }

  let openGuide = null;
  getGuides().forEach((guide) => {
    if (guide.open) {
      openGuide = guide;
    }
  });

  statusEl.textContent = openGuide ? STATUS_OPEN_PREFIX + getGuideTitle(openGuide) : STATUS_ALL_CLOSED_TEXT;
}

function closeOtherGuides(openedGuide) {
  getGuides().forEach((guide) => {
    if (guide !== openedGuide) {
      guide.open = false;
    }
  });
}

function collapseAllGuides() {
  hasInteracted = true;
  getGuides().forEach((guide) => {
    guide.open = false;
  });
  renderStatus();
}

function initActionGuides() {
  const guides = getGuides();
  if (guides.length === 0) {
    return;
  }

  guides.forEach((guide) => {
    guide.addEventListener("toggle", () => {
      hasInteracted = true;
      if (guide.open) {
        closeOtherGuides(guide);
      }
      renderStatus();
    });
  });

  const collapseButton = document.getElementById("action-guides-collapse");
  if (collapseButton) {
    collapseButton.addEventListener("click", collapseAllGuides);
  }
}

initActionGuides();
