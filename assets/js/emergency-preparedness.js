// EmergencyPreparednessChecklist.js
// Same sr-only checkbox + localStorage pattern as online-safety.js's
// "Safe actions checklist", scoped to this page's own storage key and
// data attribute so the two checklists never collide.

const PREP_CHECKLIST_STORAGE_KEY = "ltl-emergency-preparedness-checklist";
const prepProgressMessage = document.getElementById("prep-progress-message");

function getCheckedPrepItems() {
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

initPrepChecklist();
