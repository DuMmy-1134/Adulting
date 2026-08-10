// Array of Challenge Objects
const challengePool = [
  // Time / Meals
  {
    category: "Time / Meals",
    challenge: "Plan tomorrow's top 3 priority tasks",
    difficulty: "Easy",
  },
  {
    category: "Time / Meals",
    challenge: "Prepare one simple home-cooked meal",
    difficulty: "Easy",
  },
  {
    category: "Time / Meals",
    challenge: "Pack lunch or snacks for school tomorrow",
    difficulty: "Easy",
  },
  {
    category: "Time / Meals",
    challenge: "Set up a 25-minute Pomodoro study block",
    difficulty: "Easy",
  },
  {
    category: "Time / Meals",
    challenge: "Batch cook dinner for the next two days",
    difficulty: "Medium",
  },

  // Money / Budget
  {
    category: "Money / Budget",
    challenge: "Track all expenses for today in an app or notebook",
    difficulty: "Medium",
  },
  {
    category: "Money / Budget",
    challenge: "Skip buying coffee or snacks today (Save $5)",
    difficulty: "Easy",
  },
  {
    category: "Money / Budget",
    challenge: "Review and audit all monthly active subscriptions",
    difficulty: "Medium",
  },
  {
    category: "Money / Budget",
    challenge: "Set up an automatic weekly $10 savings deposit",
    difficulty: "Hard",
  },

  // Home / Basics
  {
    category: "Home / Basics",
    challenge: "Organise one desk drawer or study space",
    difficulty: "Easy",
  },
  {
    category: "Home / Basics",
    challenge: "Do a load of laundry and fold it immediately",
    difficulty: "Medium",
  },
  {
    category: "Home / Basics",
    challenge: "Wipe down study desk, keyboard, and screen",
    difficulty: "Easy",
  },
  {
    category: "Home / Basics",
    challenge: "Clear all clutter off your bedroom floor",
    difficulty: "Easy",
  },

  // Safety / Digital
  {
    category: "Safety / Digital",
    challenge: "Update passwords for two main accounts",
    difficulty: "Medium",
  },
  {
    category: "Safety / Digital",
    challenge: "Clean up and organize your downloads folder",
    difficulty: "Easy",
  },
  {
    category: "Safety / Digital",
    challenge: "Unsubscribe from 5 promotional email lists",
    difficulty: "Easy",
  },
  {
    category: "Safety / Digital",
    challenge: "Enable 2-Factor Authentication on primary email",
    difficulty: "Medium",
  },

  // Growth / Wellness
  {
    category: "Growth / Wellness",
    challenge: "Reflect on weekly achievements and set 1 goal",
    difficulty: "Hard",
  },
  {
    category: "Growth / Wellness",
    challenge: "Take a 20-minute walk without checking your phone",
    difficulty: "Easy",
  },
  {
    category: "Growth / Wellness",
    challenge: "Read 10 pages of a non-academic book",
    difficulty: "Easy",
  },
  {
    category: "Growth / Wellness",
    challenge: "Drink 2 liters of water throughout the day",
    difficulty: "Easy",
  },
];

// Helper: Toggle Completion & Update Progress
function toggleComplete(btn) {
  const row = btn.closest("tr");
  const isCompleted = btn.classList.toggle("is-completed");

  if (isCompleted) {
    btn.innerText = "Completed ✓";
    btn.classList.remove("text-[#52796f]", "underline");
    btn.classList.add("text-gray-400", "no-underline");
    row.classList.add("opacity-60", "bg-gray-50");
  } else {
    btn.innerText = "Mark Complete";
    btn.classList.remove("text-gray-400", "no-underline");
    btn.classList.add("text-[#52796f]", "underline");
    row.classList.remove("opacity-60", "bg-gray-50");
  }

  updateProgress();
}

// Helper: Update Progress Bar
function updateProgress() {
  const progressDiv = document.querySelector(".progress");
  const rows = document.querySelectorAll("#challenge-table-body tr");
  const completedButtons = document.querySelectorAll(
    "#challenge-table-body button.is-completed",
  );

  if (!progressDiv || rows.length === 0) return;

  const totalTasks = rows.length;
  const completedCount = completedButtons.length;
  const percentage = Math.round((completedCount / totalTasks) * 100);

  progressDiv.textContent = `Progress: ${completedCount}/${totalTasks} (${percentage}%)`;
}

// Apply Filters
function applyFilters() {
  const categoryBtn = document.getElementById("challenge-category-filter");
  const difficultyBtn = document.getElementById(
    "challenge-difficulty-filter",
  );
  const filterStatus = document.getElementById("challenge-filter-status");
  const rows = document.querySelectorAll("#challenge-table-body tr");

  if (!categoryBtn || !difficultyBtn) return;

  const selectedCategory = categoryBtn.dataset.value;
  const selectedDifficulty = difficultyBtn.dataset.value;
  let visibleCount = 0;

  rows.forEach((row) => {
    const matchesCategory =
      selectedCategory === "all" || row.dataset.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" ||
      row.dataset.difficulty === selectedDifficulty;
    const isVisible = matchesCategory && matchesDifficulty;

    row.classList.toggle("hidden", !isVisible);
    if (isVisible) visibleCount++;
  });

  if (filterStatus) {
    filterStatus.textContent = `Showing ${visibleCount} of ${rows.length} challenges.`;
  }
}

// Tracks every dropdown created by buildFilterDropdown so a click on one
// filter button can close the others, and so an outside click can close
// whichever one is open.
const allFilterDropdowns = [];

function closeAllFilterDropdowns() {
  allFilterDropdowns.forEach(({ button, dropdown }) => {
    dropdown.classList.add("hidden");
    button.classList.remove("is-open");
  });
}

function buildFilterDropdown(button, options, allLabel) {
  const defaultLabel = button.querySelector(".filter-btn-label").textContent;

  const dropdown = document.createElement("div");
  dropdown.className =
    "absolute left-0 min-w-full bg-white rounded-xl shadow-md mt-2 py-2 z-10 hidden";
  dropdown.innerHTML = [
    `<div class="filter-option px-4 py-1.5 text-sm text-[#2f3e46] whitespace-nowrap cursor-pointer hover:bg-[#faf7f2]" data-value="all">${allLabel}</div>`,
    ...options.map(
      (option) =>
        `<div class="filter-option px-4 py-1.5 text-sm text-[#2f3e46] whitespace-nowrap cursor-pointer hover:bg-[#faf7f2]" data-value="${option}">${option}</div>`,
    ),
  ].join("");

  button.parentElement.style.position = "relative";
  button.parentElement.appendChild(dropdown);
  allFilterDropdowns.push({ button, dropdown });

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = !dropdown.classList.contains("hidden");
    closeAllFilterDropdowns();
    if (!isOpen) {
      dropdown.classList.remove("hidden");
      button.classList.add("is-open");
    }
  });

  dropdown.addEventListener("click", (e) => {
    const chosen = e.target.closest(".filter-option");
    if (!chosen) return;

    button.dataset.value = chosen.dataset.value;
    button.querySelector(".filter-btn-label").textContent =
      chosen.dataset.value === "all"
        ? defaultLabel
        : `${defaultLabel}: ${chosen.textContent}`;

    closeAllFilterDropdowns();
    applyFilters();
  });
}

// Clicking anywhere outside an open dropdown closes it.
document.addEventListener("click", closeAllFilterDropdowns);

// Populate Filter Options Dynamically
function setupFilterDropdowns() {
  const categoryBtn = document.getElementById("challenge-category-filter");
  const difficultyBtn = document.getElementById(
    "challenge-difficulty-filter",
  );

  if (!categoryBtn || !difficultyBtn) return;

  const categories = [...new Set(challengePool.map((item) => item.category))];
  const difficulties = [
    ...new Set(challengePool.map((item) => item.difficulty)),
  ];

  buildFilterDropdown(categoryBtn, categories, "All categories");
  buildFilterDropdown(difficultyBtn, difficulties, "All difficulties");
}

// Generate New Schedule
function generateNewWeeklySchedule() {
  const tableBody = document.getElementById("challenge-table-body");
  if (!tableBody) return;

  // Shuffle and pick top 7
  const shuffled = [...challengePool].sort(() => 0.5 - Math.random());
  const selectedChallenges = shuffled.slice(0, 7);

  tableBody.innerHTML = "";

  selectedChallenges.forEach((item, index) => {
    const row = document.createElement("tr");
    row.className = "border-b border-[#8BA39E]/30 text-center";

    // Attach dataset attributes required for filtering
    row.dataset.category = item.category;
    row.dataset.difficulty = item.difficulty;

    row.innerHTML = `
      <td class="py-3 px-4 text-[#2f3e46] font-medium">${index + 1}</td>
      <td class="py-3 px-4 text-[#5b6b70]">${item.category}</td>
      <td class="py-3 px-4 text-[#2f3e46] text-left">${item.challenge}</td>
      <td class="py-3 px-4 text-[#5b6b70]">${item.difficulty}</td>
      <td class="py-3 px-4">
        <button
          class="toggle-complete-btn text-[#52796f] hover:text-[#2f3e46] font-semibold text-sm underline cursor-pointer">
          Mark Complete
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  applyFilters();
  updateProgress();
}

// DOM Initialization
document.addEventListener("DOMContentLoaded", () => {
  setupFilterDropdowns();
  generateNewWeeklySchedule();

  // One click listener on the table body (event delegation) instead of an
  // inline onclick per row, since rows are regenerated on every reshuffle.
  const tableBody = document.getElementById("challenge-table-body");
  if (tableBody) {
    tableBody.addEventListener("click", (event) => {
      const btn = event.target.closest(".toggle-complete-btn");
      if (!btn) return;
      toggleComplete(btn);
    });
  }
});
