/*
 * Page-behavior script for pages/online-safety.html (the Online Safety page).
 *
 * Convention for this project's content scripts (Phases 6-8 follow this):
 * - One script per page, named after the page it serves — this file,
 *   online-safety.js, serves pages/online-safety.html only.
 * - Loaded with `defer` after the two Tailwind script tags, so it runs
 *   once the DOM is fully parsed and never blocks page rendering.
 * - Page content data lives in a module-level `const` array of plain
 *   objects at the top of the file, kept separate from DOM logic.
 * - The DOM is reached only through ids and data-* hooks authored in the
 *   page markup, never by walking tags or reading Tailwind classes, so
 *   restyling the page cannot break this script's behavior.
 * - All injected copy is assigned with textContent, so page text can
 *   never be interpreted as markup.
 * - The test password this script reads is never sent over the network,
 *   stored, or logged — it exists only in memory for the duration of the
 *   keystroke that produced it.
 */

const STRENGTH_WIDTH_CLASSES = { weak: "w-[33%]", medium: "w-[66%]", strong: "w-full" };
const STRENGTH_FILL_CLASSES = { weak: "bg-[#b3261e]", medium: "bg-[#d97757]", strong: "bg-[#52796f]" };
const STRENGTH_LABEL_TEXT = { weak: "Weak", medium: "Medium", strong: "Strong" };
const ALL_WIDTH_CLASSES = ["w-0", "w-[33%]", "w-[66%]", "w-full"];
const ALL_FILL_CLASSES = ["bg-[#f0ece3]", "bg-[#b3261e]", "bg-[#d97757]", "bg-[#52796f]"];

let currentCardIndex = 0;

function scorePassword(password) {
  if (password.length === 0) {
    return null;
  }

  const classes = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((pattern) => pattern.test(password)).length;

  let tier;
  if (password.length < 8) {
    tier = "weak";
  } else if (password.length <= 11) {
    tier = "medium";
  } else {
    tier = "strong";
  }

  if (tier === "weak" && classes >= 3) {
    tier = "medium";
  }
  if (tier === "medium" && classes === 4) {
    tier = "strong";
  }

  return tier;
}

function renderStrength(tier) {
  const fillEl = document.getElementById("password-strength-fill");
  const labelEl = document.getElementById("password-strength-label");
  if (!fillEl || !labelEl) {
    return;
  }

  fillEl.classList.remove(...ALL_WIDTH_CLASSES, ...ALL_FILL_CLASSES);

  if (tier === null) {
    fillEl.classList.add("w-0", "bg-[#f0ece3]");
    labelEl.textContent = "";
    return;
  }

  fillEl.classList.add(STRENGTH_WIDTH_CLASSES[tier], STRENGTH_FILL_CLASSES[tier]);
  labelEl.textContent = STRENGTH_LABEL_TEXT[tier];
}

function initPasswordStrengthChecker() {
  const inputEl = document.getElementById("password-strength-input");
  if (!inputEl) {
    return;
  }

  renderStrength(null);

  inputEl.addEventListener("input", () => {
    renderStrength(scorePassword(inputEl.value));
  });
}

function showCard(index) {
  const cards = document.querySelectorAll("[data-scam-card]");
  if (cards.length === 0) {
    return;
  }

  cards.forEach((card, i) => {
    card.hidden = i !== index;
  });

  currentCardIndex = index;

  const statusEl = document.getElementById("scam-carousel-status");
  if (statusEl) {
    statusEl.textContent = `${index + 1} / ${cards.length}`;
  }
}

function initCarousel() {
  const prevButton = document.getElementById("scam-carousel-prev");
  const nextButton = document.getElementById("scam-carousel-next");
  if (!prevButton || !nextButton) {
    return;
  }

  const cards = document.querySelectorAll("[data-scam-card]");

  showCard(0);

  prevButton.addEventListener("click", () => {
    showCard((currentCardIndex - 1 + cards.length) % cards.length);
  });

  nextButton.addEventListener("click", () => {
    showCard((currentCardIndex + 1) % cards.length);
  });
}

initPasswordStrengthChecker();
initCarousel();
