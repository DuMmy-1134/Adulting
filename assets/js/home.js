// DOM lookups use ids/data-* attributes only (never tag names or Tailwind
// classes) so restyling this page can't silently break this script, and all
// copy is injected via textContent so it can never be parsed as markup.

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
    ctaHref: "pages/money-basics.html",
  },
  {
    title: "Clear one surface before you sleep",
    text: "Pick the desk, the chair, or the floor beside your bed, and give yourself ten minutes to clear just that one.",
    ctaLabel: "Take the challenge",
    ctaHref: "pages/room-organisation.html",
  },
  {
    title: "Cook one real meal tonight",
    text: "Skip the delivery app and pick a recipe filtered to the time and difficulty you've actually got energy for.",
    ctaLabel: "Browse meals",
    ctaHref: "pages/quick-meal.html",
  },
  {
    title: "Check a care label before you regret it",
    text: "Find one item you've been washing on a guess, and match its symbols against the guide before the next load shrinks it.",
    ctaLabel: "Decode the symbols",
    ctaHref: "pages/laundry-basics.html",
  },
  {
    title: "Sort today's to-do list into four boxes",
    text: "Urgent-and-important, important-but-not-urgent, urgent-but-not-important, neither. Most lists are shorter than they look once you do this.",
    ctaLabel: "Set your priorities",
    ctaHref: "pages/time-management.html",
  },
  {
    title: "Rehearse one hard conversation before you have it",
    text: "Pick a scenario close to one you're actually avoiding and try out a response before it's real.",
    ctaLabel: "Try it",
    ctaHref: "pages/communication-skills.html",
  },
  {
    title: "Commit to a 7-day habit",
    text: "Pick one five-minute daily challenge from the list, filtered by category or difficulty, and check it off for a week.",
    ctaLabel: "Pick a challenge",
    ctaHref: "pages/weekly-challenges.html",
  },
  {
    title: "Take the 2-minute Life Readiness Quiz",
    text: "Answer a few quick questions and get a personalised path through the modules you're weakest on.",
    ctaLabel: "Take the quiz",
    ctaHref: "pages/life-readiness-quiz.html",
  },
  {
    title: "Share the one tip you wish you'd known sooner",
    text: "Something that cost you time, money, or a burnt pot the first time round - pass it on so someone else skips that step.",
    ctaLabel: "Submit your tip",
    ctaHref: "pages/submit-a-tip.html",
  },
];

const FILTER_ACTIVE_CLASSES = ["bg-[#52796f]", "text-white"];
const FILTER_INACTIVE_CLASSES = ["bg-white", "text-[#52796f]", "hover:bg-[#eef3f1]"];

// Kept in memory only (no localStorage) - the featured challenge resets to
// a fresh random pick on every page load rather than persisting.
let currentChallengeIndex = -1;

// Excludes the currently-shown challenge so "Show another" always changes
// the banner; falls back to the full list if excluding would empty the pool.
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

  // Set via JS, not the HTML attribute, so screen readers announce the
  // swapped challenge text on click without re-announcing on initial render.
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

  // Visually the hidden/shown cards already communicate the filter result;
  // this sr-only status text gives screen-reader users the same information.
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

// Safe to call immediately: this script is loaded with `defer`, so the DOM
// is already fully parsed by the time this runs.
initHomePage();
