/*
 * Page-behavior script for index.html (the Home page).
 *
 * Convention for this project's content scripts (Phases 6-8 follow this):
 * - One script per page, named after the page it serves — this file,
 *   home.js, serves index.html only.
 * - Loaded with `defer` after the two Tailwind script tags, so it runs
 *   once the DOM is fully parsed and never blocks page rendering.
 * - Page content data lives in a module-level `const` array of plain
 *   objects at the top of the file, kept separate from DOM logic.
 * - The DOM is reached only through ids and data-* hooks authored in the
 *   page markup, never by walking tags or reading Tailwind classes, so
 *   restyling the page cannot break this script's behavior.
 * - All injected copy is assigned with textContent, so page text can
 *   never be interpreted as markup.
 *
 * No persistence: filter state and the featured-challenge pick live in
 * memory only and reset on every page load. This project stores nothing
 * in the browser.
 */

const CHALLENGES = [
  {
    title: "Run a 10-minute password check-up",
    text: "Pick your three most-used accounts and make sure none of them share a password.",
    ctaLabel: "Take the challenge",
    ctaHref: "pages/online-safety.html",
  },
  {
    title: "Check what's actually in your emergency kit",
    text: "Open the drawer you call a first-aid kit and check three things: plasters that still stick, a torch that turns on, and water you would actually drink.",
    ctaLabel: "Check your kit",
    ctaHref: "pages/emergency-preparedness.html",
  },
  {
    title: "Track every dollar for one day",
    text: "Write down everything you spend between waking up and lights out, bubble tea included, then look at where it actually went.",
    ctaLabel: "Start tracking",
    ctaHref: "#",
  },
  {
    title: "Clear one surface before you sleep",
    text: "Pick the desk, the chair, or the floor beside your bed, and give yourself ten minutes to clear just that one.",
    ctaLabel: "Take the challenge",
    ctaHref: "#",
  },
];

const FILTER_ACTIVE_CLASSES = ["bg-[#52796f]", "text-white"];
const FILTER_INACTIVE_CLASSES = ["bg-white", "text-[#52796f]", "hover:bg-[#eef3f1]"];

let currentChallengeIndex = -1;

function pickChallengeIndex(excludeIndex) {
  const candidates = CHALLENGES
    .map((_, index) => index)
    .filter((index) => index !== excludeIndex);
  const pool = candidates.length > 0 ? candidates : CHALLENGES.map((_, index) => index);
  return pool[Math.floor(Math.random() * pool.length)];
}

function renderFeaturedChallenge(excludeIndex) {
  const banner = document.getElementById("featured-challenge");
  const titleEl = document.getElementById("featured-challenge-title");
  const textEl = document.getElementById("featured-challenge-text");
  const ctaEl = document.getElementById("featured-challenge-cta");

  if (!banner || !titleEl || !textEl || !ctaEl) {
    return;
  }

  const index = pickChallengeIndex(excludeIndex);
  currentChallengeIndex = index;
  const challenge = CHALLENGES[index];

  titleEl.textContent = challenge.title;
  textEl.textContent = challenge.text;
  ctaEl.textContent = challenge.ctaLabel;
  ctaEl.href = challenge.ctaHref;
}

function initFeaturedChallenge() {
  renderFeaturedChallenge(currentChallengeIndex);

  const body = document.getElementById("featured-challenge-body");
  if (body) {
    body.setAttribute("aria-live", "polite");
  }

  const moreButton = document.getElementById("featured-challenge-more");
  if (!moreButton) {
    return;
  }

  moreButton.addEventListener("click", () => {
    renderFeaturedChallenge(currentChallengeIndex);
  });
}

function applyCategoryFilter(filterValue) {
  const groups = document.querySelectorAll("[data-category-group]");
  groups.forEach((group) => {
    const matches = filterValue === "all" || group.dataset.categoryGroup === filterValue;
    group.hidden = !matches;
  });

  const buttons = document.querySelectorAll("[data-filter]");
  let activeLabel = "";
  buttons.forEach((button) => {
    const isActive = button.dataset.filter === filterValue;
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
    if (isActive) {
      activeLabel = button.textContent.trim();
      button.classList.remove(...FILTER_INACTIVE_CLASSES);
      button.classList.add(...FILTER_ACTIVE_CLASSES);
    } else {
      button.classList.remove(...FILTER_ACTIVE_CLASSES);
      button.classList.add(...FILTER_INACTIVE_CLASSES);
    }
  });

  const statusEl = document.getElementById("filter-status");
  if (!statusEl) {
    return;
  }

  const visibleCount = document.querySelectorAll("[data-category-group]:not([hidden]) [data-module-card]").length;
  const moduleWord = visibleCount === 1 ? "module" : "modules";
  if (filterValue === "all") {
    statusEl.textContent = `Showing all ${visibleCount} ${moduleWord}.`;
  } else {
    statusEl.textContent = `Showing ${visibleCount} ${moduleWord} in ${activeLabel}.`;
  }
}

function initCategoryFilters() {
  const filterBar = document.getElementById("category-filters");
  if (!filterBar) {
    return;
  }

  filterBar.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button || !filterBar.contains(button)) {
      return;
    }
    applyCategoryFilter(button.dataset.filter);
  });
}

function initHomePage() {
  initFeaturedChallenge();
  initCategoryFilters();
}

initHomePage();
