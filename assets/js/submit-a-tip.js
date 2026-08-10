/*
  This is a front-end-only project with no real server, so localStorage
  stands in for one: submitted tips persist per-browser and simulate
  "sharing" tips between visits.
*/

// ---- Element references ----

const tipForm = document.getElementById("tip-form");
const tipNameInput = document.getElementById("tip-name");
const tipCategorySelect = document.getElementById("tip-category");
const tipCategoryError = document.getElementById("tip-category-error");
const tipTitleInput = document.getElementById("tip-title");
const tipTitleError = document.getElementById("tip-title-error");
const tipBodyTextarea = document.getElementById("tip-body");
const tipBodyError = document.getElementById("tip-body-error");
const tipBodyCounter = document.getElementById("tip-body-counter");
const tipSuccessMessage = document.getElementById("tip-success-message");
const tipsGrid = document.getElementById("tips-grid");
const tipFilters = document.getElementById("tip-filters");

const TIPS_STORAGE_KEY = "ltl-community-tips";
const MAX_TIP_LENGTH = 300;

// Re-uses the site's existing Primary/Secondary/Text/Accent colours for
// each badge instead of introducing new ones.
const CATEGORY_INFO = {
  "home-skills": { label: "Home Skills", badgeClass: "bg-[#7c9d96]" },
  "money-time": { label: "Money & Time", badgeClass: "bg-[#52796f]" },
  "people-safety": { label: "People & Safety", badgeClass: "bg-[#2f3e46]" },
  "practice-growth": { label: "Practice & Growth", badgeClass: "bg-[#d97757]" },
};

// Starter tips so the page isn't empty on a fresh browser. Not persisted
// to localStorage - always shown in addition to whatever a visitor submits.
const SEED_TIPS = [
  {
    category: "home-skills",
    title: "Cook double, freeze half",
    text: "Whenever you cook rice or a curry, make double the amount and freeze half in a container. Future you gets a free meal on a busy day.",
    name: "Min",
    date: "12 Jul 2026",
  },
  {
    category: "money-time",
    title: "Pay yourself first",
    text: "The moment your allowance or pay comes in, move a fixed amount straight into a separate savings account before you spend on anything else.",
    name: "Ming",
    date: "18 Jul 2026",
  },
  {
    category: "people-safety",
    title: "Screenshot your ID before you travel",
    text: "Keep a photo of your student ID and any important cards in a private album, not just your wallet. It saves a lot of stress if you lose the physical copy.",
    name: "Anonymous",
    date: "22 Jul 2026",
  },
  {
    category: "practice-growth",
    title: "One line a day is enough",
    text: "You don't need a full journal entry. Write a single line each night about what went well - it adds up to a useful record after a month.",
    name: "Hakim",
    date: "27 Jul 2026",
  },
];

let activeFilter = "all";

// ---- Loading / saving submitted tips ----

function loadStoredTips() {
  const savedJson = localStorage.getItem(TIPS_STORAGE_KEY);
  return savedJson ? JSON.parse(savedJson) : [];
}

function saveStoredTips(tipsArray) {
  localStorage.setItem(TIPS_STORAGE_KEY, JSON.stringify(tipsArray));
}

// ---- Building and rendering tip cards ----

/**
 * @param {{category: string, title: string, text: string, name: string, date: string}} tip
 * @returns {HTMLDivElement}
 */
function createTipCard(tip) {
  const card = document.createElement("div");
  card.className = "tip-card block bg-white rounded-2xl shadow-sm p-6";
  // Mirrors each filter pill's data-filter value, so a pill's selection
  // maps directly onto the tips it should show.
  card.dataset.category = tip.category;

  const badge = document.createElement("span");
  const categoryInfo = CATEGORY_INFO[tip.category];
  badge.className = "inline-block px-2 py-1 rounded-full text-xs font-semibold text-white mb-3 " + categoryInfo.badgeClass;
  badge.textContent = categoryInfo.label;

  const title = document.createElement("h3");
  title.className = "font-heading font-bold text-lg text-[#2f3e46] mb-2";
  title.textContent = tip.title;

  const body = document.createElement("p");
  body.className = "font-body text-base text-[#5b6b70] leading-normal mb-3";
  body.textContent = tip.text;

  const meta = document.createElement("p");
  meta.className = "font-body text-xs text-[#7c9d96]";
  meta.textContent = "By " + tip.name + " · " + tip.date;

  card.appendChild(badge);
  card.appendChild(title);
  card.appendChild(body);
  card.appendChild(meta);
  return card;
}

function renderTips() {
  // The grid starts empty in the markup; every card (seed and submitted)
  // is built and inserted here.
  tipsGrid.innerHTML = "";

  const storedTips = loadStoredTips();
  // storedTips is unshifted onto (newest first), so concatenating here
  // keeps a visitor's own tips ahead of the starter tips.
  const allTips = storedTips.concat(SEED_TIPS);

  const tipsToShow = allTips.filter((tip) => activeFilter === "all" || tip.category === activeFilter);

  if (tipsToShow.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "font-body text-sm text-[#5b6b70]";
    emptyMessage.textContent = "No tips in this category yet - be the first to add one above!";
    tipsGrid.appendChild(emptyMessage);
    return;
  }

  tipsToShow.forEach((tip) => {
    tipsGrid.appendChild(createTipCard(tip));
  });
}

// ---- Filter pills ----

// Fixed active/inactive class sets swapped via classList.add()/remove(),
// so pill styling logic lives in one place.
const ACTIVE_PILL_CLASSES = ["bg-[#52796f]", "border-[#52796f]", "text-white"];
const INACTIVE_PILL_CLASSES = ["bg-white", "border-[#7c9d96]", "text-[#2f3e46]", "hover:bg-[#eef3f1]"];

function setPillActive(pillButton, isActive) {
  if (isActive) {
    pillButton.classList.remove(...INACTIVE_PILL_CLASSES);
    pillButton.classList.add(...ACTIVE_PILL_CLASSES);
  } else {
    pillButton.classList.remove(...ACTIVE_PILL_CLASSES);
    pillButton.classList.add(...INACTIVE_PILL_CLASSES);
  }
}

// "All Tips" is active by default, so style every pill accordingly on load.
document.querySelectorAll(".filter-pill-btn").forEach((pillButton) => {
  setPillActive(pillButton, pillButton.dataset.filter === activeFilter);
});

// One click listener on the whole pill container (event delegation)
// instead of one per button. Each pill's data-filter is compared directly
// against a tip's category (see renderTips), which is also mirrored onto
// its card's data-category.
tipFilters.addEventListener("click", (event) => {
  const clickedPill = event.target.closest(".filter-pill-btn");
  if (!clickedPill) {
    return;
  }

  activeFilter = clickedPill.dataset.filter;

  document.querySelectorAll(".filter-pill-btn").forEach((pillButton) => {
    setPillActive(pillButton, pillButton === clickedPill);
  });

  renderTips();
});

// ---- Live character counter ----

// Recalculated on every keystroke (not just on submit) so the counter
// below the textarea always reflects the current length.
tipBodyTextarea.addEventListener("input", () => {
  const currentLength = tipBodyTextarea.value.length;
  tipBodyCounter.textContent = currentLength + " / " + MAX_TIP_LENGTH + " characters";
});

// ---- Form validation and submission ----

// Shows/hides one field's error message and toggles its "has-error"
// border, so this isn't repeated for every field below.
function setFieldError(inputElement, errorElement, hasError) {
  errorElement.classList.toggle("hidden", !hasError);
  inputElement.classList.toggle("has-error", hasError);
}

tipForm.addEventListener("submit", (event) => {
  // The form has novalidate in the markup, and preventDefault stops the
  // browser's own reload/native-bubble behaviour, so every message below
  // is our own styled text instead of the browser's default validation UI.
  event.preventDefault();

  const category = tipCategorySelect.value;
  const title = tipTitleInput.value.trim();
  const body = tipBodyTextarea.value.trim();

  // Run all 3 checks (not just the first one that fails) so the visitor
  // sees every problem at once instead of fixing them one at a time.
  const categoryIsValid = category !== "";
  const titleIsValid = title.length >= 4;
  const bodyIsValid = body.length >= 20;

  setFieldError(tipCategorySelect, tipCategoryError, !categoryIsValid);
  setFieldError(tipTitleInput, tipTitleError, !titleIsValid);
  setFieldError(tipBodyTextarea, tipBodyError, !bodyIsValid);

  if (!categoryIsValid || !titleIsValid || !bodyIsValid) {
    return; // At least one field failed - stop here, errors are now visible.
  }

  // Falls back to "Anonymous" if the name field was left blank, instead
  // of showing an empty name on the card.
  const newTip = {
    category: category,
    title: title,
    text: body,
    name: tipNameInput.value.trim() === "" ? "Anonymous" : tipNameInput.value.trim(),
    date: new Date().toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" }),
  };

  // unshift (not push) so the new tip appears first in Community Tips.
  const storedTips = loadStoredTips();
  storedTips.unshift(newTip);
  saveStoredTips(storedTips);

  // Reset to "All Tips" so the visitor is guaranteed to see the tip they
  // just posted, even if a category filter was active before submitting.
  activeFilter = "all";
  document.querySelectorAll(".filter-pill-btn").forEach((pillButton) => {
    setPillActive(pillButton, pillButton.dataset.filter === "all");
  });
  renderTips();

  tipForm.reset();
  tipBodyCounter.textContent = "0 / " + MAX_TIP_LENGTH + " characters";
  setFieldError(tipCategorySelect, tipCategoryError, false);
  setFieldError(tipTitleInput, tipTitleError, false);
  setFieldError(tipBodyTextarea, tipBodyError, false);

  tipSuccessMessage.classList.remove("hidden");
  setTimeout(() => {
    tipSuccessMessage.classList.add("hidden"); // Hide again after 4s.
  }, 4000);
});

// ---- First render on page load ----

renderTips();
