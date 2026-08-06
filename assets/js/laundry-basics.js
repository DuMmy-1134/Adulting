

// Define laundry steps data
const LAUNDRY_STEPS = [
  {
    step: 1,
    title: "Sort clothes by color",
    description: "Separate whites, darks, and colors to prevent bleeding"
  },
  {
    step: 2,
    title: "Check care labels",
    description: "Review fabric care instructions on all garments"
  },
  {
    step: 3,
    title: "Load the washer",
    description: "Place sorted clothes into the washing machine"
  },
  {
    step: 4,
    title: "Choose settings and start",
    description: "Select appropriate water temperature and cycle, then start"
  }
];

// Correct order of steps
const correctOrder = LAUNDRY_STEPS.map(step => step.step);

// Initialize the sortable list
const sortableSteps = document.getElementById('sortable-steps');
const checkButton = document.getElementById('check-steps-btn');
const resetButton = document.getElementById('reset-steps-btn');
const feedbackMessage = document.getElementById('steps-feedback');

// Initialize Sortable
if (sortableSteps) {
  Sortable.create(sortableSteps, {
    animation: 150,
    ghostClass: 'sortable-ghost',
    onEnd: function() {
      // Clear feedback when user rearranges
      feedbackMessage.textContent = '';
      feedbackMessage.className = '';
    }
  });
}

// Check if steps are in correct order
function checkStepsOrder() {
  const stepItems = document.querySelectorAll('#sortable-steps .step-item');
  const currentOrder = Array.from(stepItems).map(item => parseInt(item.dataset.step));

  // Compare with correct order
  const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(correctOrder);

  if (isCorrect) {
    feedbackMessage.textContent = '✓ Correct! You\'ve arranged the steps in the right order!';
    feedbackMessage.className = 'mt-4 p-4 bg-[#d4edda] text-[#155724] rounded-lg font-semibold text-center border-2 border-[#52796f]';
  } else {
    feedbackMessage.textContent = '✗ Not quite right. Try again!';
    feedbackMessage.className = 'mt-4 p-4 bg-[#f8d7da] text-[#721c24] rounded-lg font-semibold text-center border-2 border-[#d97757]';
  }
}

// Reset steps to original random order
function resetSteps() {
  const stepItems = document.querySelectorAll('#sortable-steps .step-item');
  const steps = Array.from(stepItems);
  
  // Shuffle the steps
  for (let i = steps.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [steps[i], steps[j]] = [steps[j], steps[i]];
  }
  
  // Re-append shuffled steps
  steps.forEach(step => {
    sortableSteps.appendChild(step);
  });
  
  // Clear feedback
  feedbackMessage.textContent = '';
  feedbackMessage.className = '';
}

// Event listeners
if (checkButton) {
  checkButton.addEventListener('click', checkStepsOrder);
}

if (resetButton) {
  resetButton.addEventListener('click', resetSteps);
}

// Initialize with shuffled order on page load
document.addEventListener('DOMContentLoaded', function() {
  resetSteps();
});