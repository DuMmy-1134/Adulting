/*
  submit-a-tip.js
  -----------------------------------------------------------------------
  Powers submit-a-tip.html:
    - Validates the tip form (category chosen, title and tip long enough)
      and shows our own error messages instead of the browser's default.
    - A live character counter under the tip textarea.
    - On a valid submit, builds a new tip card with document.createElement
      and puts it at the top of the Community Tips list.
    - Saves submitted tips in localStorage so they are still there the
      next time this browser opens the page (this is a front-end-only
      project with no real server, so localStorage is what simulates
      "sharing" tips between visits).
    - Category filter pills that show/hide cards without reloading the
      page.
*/

// ---- Element references -------------------------------------------------

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

// Category display names and the colour each one's badge should use.
// Re-uses colours already defined for the rest of the site (Primary,
// Secondary, Text and Accent) so no brand-new colours are introduced.
const CATEGORY_INFO = {
  "home-skills": { label: "Home Skills", badgeClass: "bg-[#7c9d96]" },
  "money-time": { label: "Money & Time", badgeClass: "bg-[#52796f]" },
  "people-safety": { label: "People & Safety", badgeClass: "bg-[#2f3e46]" },
  "practice-growth": { label: "Practice & Growth", badgeClass: "bg-[#d97757]" },
};

// A handful of starter tips so the page doesn't look empty on a brand
// new browser that hasn't submitted anything yet. These are NOT saved
// to localStorage — they are always shown in addition to whatever the
// visitor has submitted.
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
    text: "You don't need a full journal entry. Write a single line each night about what went well — it adds up to a useful record after a month.",
    name: "Hakim",
    date: "27 Jul 2026",
  },
];

// Which filter pill is currently selected. Starts on "all".
let activeFilter = "all";

// ---- Loading / saving submitted tips ------------------------------------

// Reads whatever the visitor has submitted before on this browser.
// Returns an empty array if nothing has been saved yet.
function loadStoredTips() {
  const savedJson = localStorage.getItem(TIPS_STORAGE_KEY);
  return savedJson ? JSON.parse(savedJson) : [];
}

function saveStoredTips(tipsArray) {
  localStorage.setItem(TIPS_STORAGE_KEY, JSON.stringify(tipsArray));
}

// ---- Building and rendering tip cards ------------------------------------

// Takes one tip object and returns a fully-built <div> card element,
// ready to be inserted into the page.
function createTipCard(tip) {
  const card = document.createElement("div");
  // data-category is what the filter buttons check against later.
  card.className = "tip-card block w-[300px] bg-white rounded-2xl shadow-sm p-6";
  card.dataset.category = tip.category;

  const badge = document.createElement("span");
  const categoryInfo = CATEGORY_INFO[tip.category];
  badge.className = "inline-block px-2 py-1 rounded-full text-xs font-semibold text-white mb-3 " + categoryInfo.badgeClass;
  badge.textContent = categoryInfo.label;

  const title = document.createElement("h3");
  title.className = "font-heading font-bold text-lg text-[#2f3e46] mb-2";
  title.textContent = tip.title;

  const body = document.createElement("p");
  body.className = "font-body text-[13.5px] text-[#5b6b70] leading-normal mb-3";
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

// Clears the grid and rebuilds it from scratch: newest submitted tips
// first, then the starter tips, skipping anything that doesn't match
// the currently active filter.
function renderTips() {
  tipsGrid.innerHTML = "";

  const storedTips = loadStoredTips();
  // Newest-submitted-first, then the seed tips underneath them.
  const allTips = storedTips.concat(SEED_TIPS);

  const tipsToShow = allTips.filter((tip) => activeFilter === "all" || tip.category === activeFilter);

  if (tipsToShow.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "font-body text-[14.5px] text-[#5b6b70]";
    emptyMessage.textContent = "No tips in this category yet — be the first to add one above!";
    tipsGrid.appendChild(emptyMessage);
    return;
  }

  tipsToShow.forEach((tip) => {
    tipsGrid.appendChild(createTipCard(tip));
  });
}

// ---- Filter pills ---------------------------------------------------------

// Two fixed sets of classes: one look for the pill that is currently
// selected, another for every pill that isn't. Swapping between these
// two sets is all classList.add()/remove() needs to do.
const ACTIVE_PILL_CLASSES = ["bg-[#52796f]", "border-[#52796f]", "text-white"];
const INACTIVE_PILL_CLASSES = ["border-[#7c9d96]", "text-[#2f3e46]", "hover:bg-[#eef3f1]"];

function setPillActive(pillButton, isActive) {
  if (isActive) {
    pillButton.classList.remove(...INACTIVE_PILL_CLASSES);
    pillButton.classList.add(...ACTIVE_PILL_CLASSES);
  } else {
    pillButton.classList.remove(...ACTIVE_PILL_CLASSES);
    pillButton.classList.add(...INACTIVE_PILL_CLASSES);
  }
}

// Style every pill correctly on page load ("All Tips" starts active).
document.querySelectorAll(".filter-pill-btn").forEach((pillButton) => {
  setPillActive(pillButton, pillButton.dataset.filter === activeFilter);
});

// One click listener on the whole pill container (event delegation)
// instead of one listener per button.
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

// ---- Live character counter ----------------------------------------------

tipBodyTextarea.addEventListener("input", () => {
  const currentLength = tipBodyTextarea.value.length;
  tipBodyCounter.textContent = currentLength + " / " + MAX_TIP_LENGTH + " characters";
});

// ---- Form validation and submission ---------------------------------------

// Small helper: shows/hides one field's error message and toggles the
// red-ish "has-error" border, so the same 4 lines aren't repeated for
// every single field below.
function setFieldError(inputElement, errorElement, hasError) {
  errorElement.classList.toggle("hidden", !hasError);
  inputElement.classList.toggle("has-error", hasError);
}

tipForm.addEventListener("submit", (event) => {
  // Stop the browser's normal "reload the page and send the form to a
  // server" behaviour — this is a client-side-only demo.
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
    return; // At least one field failed — stop here, errors are now visible.
  }

  // Build the new tip object. If the name field was left blank, fall
  // back to "Anonymous" instead of showing an empty name on the card.
  const newTip = {
    category: category,
    title: title,
    text: body,
    name: tipNameInput.value.trim() === "" ? "Anonymous" : tipNameInput.value.trim(),
    date: new Date().toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" }),
  };

  // Add the new tip to the front of the saved list (so it shows up
  // first) and write the updated list back to localStorage.
  const storedTips = loadStoredTips();
  storedTips.unshift(newTip);
  saveStoredTips(storedTips);

  // Switch the filter back to "All Tips" so the visitor is guaranteed
  // to see the tip they just posted, even if they had a category filter
  // selected before submitting.
  activeFilter = "all";
  document.querySelectorAll(".filter-pill-btn").forEach((pillButton) => {
    setPillActive(pillButton, pillButton.dataset.filter === "all");
  });
  renderTips();

  // Reset the form back to empty, clear the character counter and any
  // error states, then show a success message that fades away on its own.
  tipForm.reset();
  tipBodyCounter.textContent = "0 / " + MAX_TIP_LENGTH + " characters";
  setFieldError(tipCategorySelect, tipCategoryError, false);
  setFieldError(tipTitleInput, tipTitleError, false);
  setFieldError(tipBodyTextarea, tipBodyError, false);

  tipSuccessMessage.classList.remove("hidden");
  setTimeout(() => {
    tipSuccessMessage.classList.add("hidden");
  }, 4000);
});

// ---- First render on page load ---------------------------------------------

renderTips();
