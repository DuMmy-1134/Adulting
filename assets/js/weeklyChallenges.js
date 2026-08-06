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
});
// Mindset Tip Expandable Widget
const mindsetTips = document.getElementById("mindsetTips");
const expandableTip = document.querySelector(".tip");
mindsetTips.addEventListener("click", () => {
  expandableTip.classList.toggle("hidden");
});
