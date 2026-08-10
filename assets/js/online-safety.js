/*
 * Page-behavior script for pages/online-safety.html (the Online Safety page).
 *
 * Convention for this project's content scripts (Phases 6-8 follow this):
 * - One script per page, named after the page it serves - this file,
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
 *   stored, or logged - it exists only in memory for the duration of the
 *   keystroke that produced it.
 */

const STRENGTH_WIDTH_CLASSES = { weak: "w-[33%]", medium: "w-[66%]", strong: "w-full" };
const STRENGTH_FILL_CLASSES = { weak: "bg-[#b3261e]", medium: "bg-[#d97757]", strong: "bg-[#52796f]" };
const STRENGTH_LABEL_TEXT = { weak: "Weak", medium: "Medium", strong: "Strong" };
const ALL_WIDTH_CLASSES = ["w-0", "w-[33%]", "w-[66%]", "w-full"];
const ALL_FILL_CLASSES = ["bg-[#f0ece3]", "bg-[#b3261e]", "bg-[#d97757]", "bg-[#52796f]"];

let currentCardIndex = 0;

// A short list of the most commonly leaked/guessed passwords. Checked
// as a substring match (case-insensitive) so variants like "Password1"
// or "iloveyou99" still get caught, not just exact matches.
const COMMON_WEAK_PASSWORDS = [
  "password", "123456", "12345678", "qwerty", "letmein", "admin",
  "welcome", "monkey", "dragon", "football", "iloveyou", "master",
  "superman", "trustno1", "baseball",
];

// Length and character-class variety alone can't tell "strong" apart
// from something like "aaaaaaaaaaaaaaaa" or "abcdefgh12345678" - both
// are 16+ characters with decent-looking variety, but neither is hard
// to guess. This catches the three most common low-entropy patterns
// so they're always scored weak, regardless of length.
function hasLowEntropyPattern(password) {
  const lower = password.toLowerCase();

  // The same character repeated 4+ times in a row (e.g. "aaaa", "1111").
  if (/(.)\1{3,}/.test(password)) {
    return true;
  }

  // A well-known weak password, used as-is or as part of the string.
  if (COMMON_WEAK_PASSWORDS.some((weak) => lower.includes(weak))) {
    return true;
  }

  // Four or more sequential ascending characters (e.g. "abcd", "5678").
  for (let i = 0; i < lower.length - 3; i++) {
    const a = lower.charCodeAt(i);
    const b = lower.charCodeAt(i + 1);
    const c = lower.charCodeAt(i + 2);
    const d = lower.charCodeAt(i + 3);
    if (b === a + 1 && c === b + 1 && d === c + 1) {
      return true;
    }
  }

  return false;
}

function scorePassword(password) {
  if (password.length === 0) {
    return null;
  }

  const length = password.length;
  const classes = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((pattern) => pattern.test(password)).length;

  // A predictable pattern - repeated characters, a well-known weak
  // password, or a run of sequential characters - is weak no matter how
  // long it is, so this is checked before length gets a say.
  if (hasLowEntropyPattern(password)) {
    return "weak";
  }

  // Length is what actually protects against brute-forcing, so it's
  // checked next and can't be overridden by character-class variety -
  // this is what previously let a 4-character password like "Aa1!" score
  // as "Strong" just because it mixed letters, a digit and a symbol.
  // A password under 10 characters is always weak, no matter what it
  // contains. Between 10 and 13 characters, it's still weak unless it
  // mixes at least two character types.
  if (length < 10) {
    return "weak";
  }
  if (length < 14 && classes <= 1) {
    return "weak";
  }

  // A very long password (20+) is hard to brute-force even with low
  // variety - e.g. a multi-word passphrase - so it counts as strong on
  // length alone. Otherwise, strong requires both real length (14+) and
  // real variety (3+ character types).
  if (length >= 20) {
    return "strong";
  }
  if (length >= 14 && classes >= 3) {
    return "strong";
  }

  return "medium";
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

const SAFETY_CHECKLIST_STORAGE_KEY = "ltl-online-safety-checklist";
const safetyProgressMessage = document.getElementById("safety-progress-message");

function getCheckedSafetyItems() {
  try {
    const stored = JSON.parse(localStorage.getItem(SAFETY_CHECKLIST_STORAGE_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function setCheckboxVisual(checkbox) {
  const box = checkbox.nextElementSibling;
  if (!box) {
    return;
  }
  box.classList.toggle("bg-[#52796f]", checkbox.checked);
  box.classList.toggle("border-[#52796f]", checkbox.checked);
  box.textContent = checkbox.checked ? "✓" : "";
}

function updateSafetyProgress(total) {
  if (!safetyProgressMessage) {
    return;
  }
  const completed = getCheckedSafetyItems().length;
  if (completed === 0) {
    safetyProgressMessage.textContent = "Check off each item as you get it done.";
  } else if (completed === total) {
    safetyProgressMessage.textContent = `You're covered - all ${total} items done.`;
  } else {
    safetyProgressMessage.textContent = `${completed} of ${total} done.`;
  }
}

function initSafetyChecklist() {
  const checkboxes = document.querySelectorAll("[data-safety-check]");
  if (checkboxes.length === 0) {
    return;
  }

  const checkedItems = getCheckedSafetyItems();

  checkboxes.forEach((checkbox) => {
    checkbox.checked = checkedItems.includes(checkbox.dataset.safetyCheck);
    setCheckboxVisual(checkbox);

    checkbox.addEventListener("change", () => {
      setCheckboxVisual(checkbox);

      const current = getCheckedSafetyItems();
      const key = checkbox.dataset.safetyCheck;
      const next = checkbox.checked
        ? [...current.filter((item) => item !== key), key]
        : current.filter((item) => item !== key);

      localStorage.setItem(SAFETY_CHECKLIST_STORAGE_KEY, JSON.stringify(next));
      updateSafetyProgress(checkboxes.length);
    });
  });

  updateSafetyProgress(checkboxes.length);
}

initPasswordStrengthChecker();
initCarousel();
initSafetyChecklist();
