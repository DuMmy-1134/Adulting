const budgetGoals = document.getElementById("budget-goals");
const expandableBudgetCard = document.getElementById(
  "budget-expandable-content",
);
budgetGoals.addEventListener("click", () => {
  expandableBudgetCard.classList.toggle("hidden");
});

const savingHabits = document.getElementById("saving-habits");
// Single delegated listener: habit cards are toggled dynamically, so
// listening on the container avoids binding a handler to each card.
savingHabits.addEventListener("click", (e) => {
  const clickedHabit = e.target.closest(".habit");
  if (!clickedHabit) return;
  const expandableHabit = clickedHabit.querySelector(".invisible-habit");
  expandableHabit.classList.toggle("hidden");
});

const allowanceInput = document.getElementById("monthly-allowance");
const expensesInput = document.getElementById("monthly-expenses");
const savedInput = document.getElementById("amount-saved");
const targetInput = document.getElementById("savings-target");

const summaryAllowance = document.getElementById("summary-allowance");
const summaryExpenses = document.getElementById("summary-expenses");
const summarySaved = document.getElementById("summary-saved");
const summaryTarget = document.getElementById("summary-target");

const pctSpent = document.getElementById("pct-spent");
const pctSaved = document.getElementById("pct-saved");
const pctSavedOfTarget = document.getElementById("pct-saved-of-target");
const pctNeededTarget = document.getElementById("pct-needed-target");

function updateSummaryTable() {
  const allowance = parseFloat(allowanceInput.value) || 0;
  const expenses = parseFloat(expensesInput.value) || 0;
  const saved = parseFloat(savedInput.value) || 0;
  const target = parseFloat(targetInput.value) || 0;

  // S$ (Singapore dollar) matches the site's locale; form inputs keep the generic $ prefix.
  summaryAllowance.textContent = `S$${allowance.toLocaleString()}`;
  summaryExpenses.textContent = `S$${expenses.toLocaleString()}`;
  summarySaved.textContent = `S$${saved.toLocaleString()}`;
  summaryTarget.textContent = `S$${target.toLocaleString()}`;

  // Guard against dividing by zero before an allowance is entered.
  const spentPercentage =
    allowance > 0 ? ((expenses / allowance) * 100).toFixed(1) : 0;
  pctSpent.textContent = `${spentPercentage}%`;

  const savedPercentage =
    allowance > 0 ? ((saved / allowance) * 100).toFixed(1) : 0;
  pctSaved.textContent = `${savedPercentage}%`;

  if (target > 0) {
    const currentProgressPct = ((saved / target) * 100).toFixed(1);
    // Clamp at 0 so saving past the target doesn't show a negative "needed" percentage.
    const neededPct = Math.max(0, 100 - currentProgressPct).toFixed(1);

    pctSavedOfTarget.textContent = `${currentProgressPct}% reached`;
    pctNeededTarget.textContent = `${neededPct}% needed`;
  } else {
    pctSavedOfTarget.textContent = "0%";
    pctNeededTarget.textContent = "100% needed";
  }
}

const calculatorFields = [
  allowanceInput,
  expensesInput,
  savedInput,
  targetInput,
];

function setFieldError(input, hasError) {
  const errorText = document.getElementById(`${input.id}-error`);
  input.classList.toggle("border-[#d97757]", hasError);
  input.classList.toggle("border-[#7c9d96]", !hasError);
  if (errorText) {
    errorText.classList.toggle("hidden", !hasError);
  }
}

const inputForm = document.getElementById("money-calculator");
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;
  calculatorFields.forEach((field) => {
    const fieldIsEmpty = field.value.trim() === "";
    setFieldError(field, fieldIsEmpty);
    if (fieldIsEmpty) {
      isValid = false;
    }
  });

  if (!isValid) {
    return;
  }

  updateSummaryTable();
});
