document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("tbody");
  const progressDiv = document.querySelector(".progress");
  const rows = tableBody.querySelectorAll("tr");
  const totalTasks = rows.length;

  // Add challenge-btn class to all existing action buttons if not present
  const buttons = tableBody.querySelectorAll("button");

  function updateProgress() {
    let completedCount = 0;

    buttons.forEach((btn) => {
      if (btn.classList.contains("is-completed")) {
        completedCount++;
      }
    });

    const percentage = Math.round((completedCount / totalTasks) * 100);
    progressDiv.textContent = `Progress: ${completedCount}/${totalTasks} (${percentage}%)`;
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const parentRow = btn.closest("tr");

      if (btn.classList.contains("is-completed")) {
        // Toggle back to incomplete
        btn.classList.remove("is-completed", "text-emerald-600", "font-bold");
        btn.classList.add("text-[#4D736A]", "hover:underline");
        btn.textContent = "Mark Complete";
        parentRow.classList.remove("bg-emerald-50/50");
      } else {
        // Mark as completed
        btn.classList.add("is-completed", "text-emerald-600", "font-bold");
        btn.classList.remove("text-[#4D736A]", "hover:underline");
        btn.textContent = "✓ Completed";
        parentRow.classList.add("bg-emerald-50/50");
      }

      updateProgress();
    });
  });

  // Initial progress update
  updateProgress();

  // Category / difficulty filters
  const categorySelect = document.getElementById("challenge-category-filter");
  const difficultySelect = document.getElementById("challenge-difficulty-filter");
  const filterStatus = document.getElementById("challenge-filter-status");

  function populateFilterOptions(select, values) {
    [...new Set(values)].forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  function applyFilters() {
    const category = categorySelect.value;
    const difficulty = difficultySelect.value;
    let visibleCount = 0;

    rows.forEach((row) => {
      const matchesCategory = category === "all" || row.dataset.category === category;
      const matchesDifficulty = difficulty === "all" || row.dataset.difficulty === difficulty;
      const isVisible = matchesCategory && matchesDifficulty;
      row.classList.toggle("hidden", !isVisible);
      if (isVisible) {
        visibleCount++;
      }
    });

    filterStatus.textContent = `Showing ${visibleCount} of ${totalTasks} challenges.`;
  }

  if (categorySelect && difficultySelect && filterStatus) {
    populateFilterOptions(categorySelect, [...rows].map((row) => row.dataset.category));
    populateFilterOptions(difficultySelect, [...rows].map((row) => row.dataset.difficulty));

    categorySelect.addEventListener("change", applyFilters);
    difficultySelect.addEventListener("change", applyFilters);

    applyFilters();
  }
});
// Mindset Tip Expandable Widget
const mindsetTips = document.getElementById("mindsetTips");
const expandableTip = document.querySelector(".tip");
mindsetTips.addEventListener("click", () => {
  expandableTip.classList.toggle("hidden");
});
