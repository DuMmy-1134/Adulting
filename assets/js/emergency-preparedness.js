// Storage key is page-specific so this checklist's state never collides
// with online-safety.js's separate "Safe actions checklist" entry.
const PREP_CHECKLIST_STORAGE_KEY = "ltl-emergency-preparedness-checklist";
const prepProgressMessage = document.getElementById("prep-progress-message");

function getCheckedPrepItems() {
  // Falls back to an empty list if storage is empty or holds invalid JSON.
  try {
    const stored = JSON.parse(localStorage.getItem(PREP_CHECKLIST_STORAGE_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function setPrepCheckboxVisual(checkbox) {
  const box = checkbox.nextElementSibling;
  if (!box) {
    return;
  }
  box.classList.toggle("bg-[#52796f]", checkbox.checked);
  box.classList.toggle("border-[#52796f]", checkbox.checked);
  box.textContent = checkbox.checked ? "✓" : "";
}

function updatePrepProgress(total) {
  if (!prepProgressMessage) {
    return;
  }
  const completed = getCheckedPrepItems().length;
  if (completed === 0) {
    prepProgressMessage.textContent = "Check off each item as you get it done.";
  } else if (completed === total) {
    prepProgressMessage.textContent = `You're covered - all ${total} items done.`;
  } else {
    prepProgressMessage.textContent = `${completed} of ${total} done.`;
  }
}

function initPrepChecklist() {
  const checkboxes = document.querySelectorAll("[data-prep-check]");
  if (checkboxes.length === 0) {
    return;
  }

  const checkedItems = getCheckedPrepItems();

  checkboxes.forEach((checkbox) => {
    checkbox.checked = checkedItems.includes(checkbox.dataset.prepCheck);
    setPrepCheckboxVisual(checkbox);

    checkbox.addEventListener("change", () => {
      setPrepCheckboxVisual(checkbox);

      const current = getCheckedPrepItems();
      const key = checkbox.dataset.prepCheck;
      const next = checkbox.checked
        ? [...current.filter((item) => item !== key), key]
        : current.filter((item) => item !== key);

      localStorage.setItem(PREP_CHECKLIST_STORAGE_KEY, JSON.stringify(next));
      updatePrepProgress(checkboxes.length);
    });
  });

  updatePrepProgress(checkboxes.length);
}

// Safe to call immediately: this script is loaded with `defer`, so the
// DOM is already fully parsed by the time this file runs.
initPrepChecklist();
