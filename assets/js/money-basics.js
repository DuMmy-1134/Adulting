// Needs or Wants Expandable Cards
const NeedOrWant = document.getElementById("needOrWant");
const expandableContent = document.getElementById("expandable-content");
NeedOrWant.addEventListener("click", () => {
  expandableContent.classList.toggle("hidden");
});

// Budget Goals Expandable Cards
const budgetGoals = document.getElementById("budget-goals");
const expandableBudgetCard = document.getElementById(
  "budget-expandable-content",
);
budgetGoals.addEventListener("click", () => {
  expandableBudgetCard.classList.toggle("hidden");
});

// Saving Habits Expandable Functions
const savingHabits = document.getElementById("saving-habits");
savingHabits.addEventListener("click", (e) => {
  const clickedHabit = e.target.closest(".habit");
  if (!clickedHabit) return;
  const expandableHabit = clickedHabit.querySelector(".invisible-habit");
  expandableHabit.classList.toggle("hidden");
});

// Budget Calculator
// Input Elements
const allowanceInput = document.getElementById("monthly-allowance");
const expensesInput = document.getElementById("monthly-expenses");
const savedInput = document.getElementById("amount-saved");
const targetInput = document.getElementById("savings-target");

// Table Text Output Elements
const summaryAllowance = document.getElementById("summary-allowance");
const summaryExpenses = document.getElementById("summary-expenses");
const summarySaved = document.getElementById("summary-saved");
const summaryTarget = document.getElementById("summary-target");

// Percentage Output Elements
const pctSpent = document.getElementById("pct-spent");
const pctSaved = document.getElementById("pct-saved");
const pctSavedOfTarget = document.getElementById("pct-saved-of-target");
const pctNeededTarget = document.getElementById("pct-needed-target");

// Main calculation function
function updateSummaryTable() {
  const allowance = parseFloat(allowanceInput.value) || 0;
  const expenses = parseFloat(expensesInput.value) || 0;
  const saved = parseFloat(savedInput.value) || 0;
  const target = parseFloat(targetInput.value) || 0;

  // 1. Update amounts
  summaryAllowance.textContent = `S$${allowance.toLocaleString()}`;
  summaryExpenses.textContent = `S$${expenses.toLocaleString()}`;
  summarySaved.textContent = `S$${saved.toLocaleString()}`;
  summaryTarget.textContent = `S$${target.toLocaleString()}`;

  // 2. Percentage Spent (% of Allowance)
  const spentPercentage =
    allowance > 0 ? ((expenses / allowance) * 100).toFixed(1) : 0;
  pctSpent.textContent = `${spentPercentage}%`;

  // 3. Percentage Saved (% of Allowance)
  const savedPercentage =
    allowance > 0 ? ((saved / allowance) * 100).toFixed(1) : 0;
  pctSaved.textContent = `${savedPercentage}%`;

  // 4. Progress toward target & Percentage Needed to reach target
  if (target > 0) {
    const currentProgressPct = ((saved / target) * 100).toFixed(1);
    const neededPct = Math.max(0, 100 - currentProgressPct).toFixed(1);

    pctSavedOfTarget.textContent = `${currentProgressPct}% reached`;
    pctNeededTarget.textContent = `${neededPct}% needed`;
  } else {
    pctSavedOfTarget.textContent = "0%";
    pctNeededTarget.textContent = "100% needed";
  }
}

const calculatorFields = [allowanceInput, expensesInput, savedInput, targetInput];

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
