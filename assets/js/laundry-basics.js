

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



const GARMENTS = [
  {
    id: 1,
    name: "Cotton T-Shirts",
    temperature: "Warm (40°C)",
    cycle: "Normal",
    drying: "Tumble dry or line dry",
    icon: "👕"
  },
  {
    id: 2,
    name: "Denim Jeans",
    temperature: "Cold (30°C)",
    cycle: "Delicate",
    drying: "Line dry only",
    icon: "👖"
  },
  {
    id: 3,
    name: "Wool Sweaters",
    temperature: "Cold (20°C)",
    cycle: "Wool/Hand wash",
    drying: "Lay flat to dry",
    icon: "🧶"
  },
  {
    id: 4,
    name: "Silk Blouses",
    temperature: "Cold (20°C)",
    cycle: "Hand wash/Delicate",
    drying: "Drip dry, no wringing",
    icon: "👗"
  },
  {
    id: 5,
    name: "Underwear & Socks",
    temperature: "Warm (40°C)",
    cycle: "Normal",
    drying: "Tumble dry",
    icon: "🧦"
  },
  {
    id: 6,
    name: "Bed Sheets",
    temperature: "Hot (60°C)",
    cycle: "Normal",
    drying: "Tumble dry",
    icon: "🛏️"
  },
  {
    id: 7,
    name: "Athletic Wear",
    temperature: "Cold (30°C)",
    cycle: "Delicate",
    drying: "Air dry",
    icon: "🏃"
  },
  {
    id: 8,
    name: "Jackets",
    temperature: "Cold (30°C)",
    cycle: "Gentle",
    drying: "Air dry, hang up",
    icon: "🧥"
  }
];

const garmentCheckboxes = document.getElementById('garment-checkboxes');
const careCardsContainer = document.getElementById('care-cards-container');
const selectedCountDisplay = document.getElementById('selected-count');
const clearAllBtn = document.getElementById('clear-all-btn');

// Render checkboxes
function renderGarmentCheckboxes() {
  if (!garmentCheckboxes) return;
  
  garmentCheckboxes.innerHTML = '';
  
  GARMENTS.forEach(garment => {
    const label = document.createElement('label');
    label.className = 'flex items-center gap-3 p-3 bg-[#f5f3f0] rounded-lg hover:bg-[#eef3f1] cursor-pointer transition-all';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = garment.id;
    checkbox.className = 'w-4 h-4 cursor-pointer';
    checkbox.addEventListener('change', updateCareCards);
    
    const textSpan = document.createElement('span');
    textSpan.className = 'font-body text-[13.5px] text-[#2f3e46]';
    textSpan.textContent = `${garment.icon} ${garment.name}`;
    
    label.appendChild(checkbox);
    label.appendChild(textSpan);
    
    garmentCheckboxes.appendChild(label);
  });
}

// Update care cards based on selected garments
function updateCareCards() {
  if (!careCardsContainer) return;
  
  const checkboxes = document.querySelectorAll('#garment-checkboxes input[type="checkbox"]:checked');
  const selectedIds = Array.from(checkboxes).map(cb => parseInt(cb.value));
  
  careCardsContainer.innerHTML = '';
  
  if (selectedIds.length === 0) {
    careCardsContainer.innerHTML = '<p class="text-center text-[#5b6b70] font-body text-[13.5px]">Select garments to see care instructions</p>';
    updateSelectedCount(0);
    return;
  }
  
  selectedIds.forEach(id => {
    const garment = GARMENTS.find(g => g.id === id);
    if (!garment) return;
    
    const card = document.createElement('div');
    card.className = 'bg-white rounded-2xl shadow-sm p-6 border-2 border-[#7c9d96]';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'flex items-center justify-between mb-4';
    
    const title = document.createElement('h3');
    title.className = 'font-heading font-bold text-lg text-[#2f3e46]';
    title.textContent = `${garment.icon} ${garment.name}`;
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'text-[#d97757] hover:text-[#c4624d] font-bold text-lg cursor-pointer';
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', function() {
      const checkbox = document.querySelector(`#garment-checkboxes input[value="${id}"]`);
      if (checkbox) checkbox.checked = false;
      updateCareCards();
    });
    
    titleDiv.appendChild(title);
    titleDiv.appendChild(removeBtn);
    
    // Care instructions
    const instructionsDiv = document.createElement('div');
    instructionsDiv.className = 'space-y-3';
    
    const tempDiv = createInstructionRow('🌡️ Temperature:', garment.temperature);
    const cycleDiv = createInstructionRow('🔄 Cycle:', garment.cycle);
    const dryingDiv = createInstructionRow('💨 Drying:', garment.drying);
    
    instructionsDiv.appendChild(tempDiv);
    instructionsDiv.appendChild(cycleDiv);
    instructionsDiv.appendChild(dryingDiv);
    
    card.appendChild(titleDiv);
    card.appendChild(instructionsDiv);
    careCardsContainer.appendChild(card);
  });
  
  updateSelectedCount(selectedIds.length);
  saveSelectedGarments(selectedIds);
}

// Create instruction row
function createInstructionRow(label, value) {
  const row = document.createElement('div');
  row.className = 'border-b border-[#f0ece3] pb-2';
  
  const labelSpan = document.createElement('span');
  labelSpan.className = 'font-body font-semibold text-[13.5px] text-[#2f3e46]';
  labelSpan.textContent = label;
  
  const valueSpan = document.createElement('span');
  valueSpan.className = 'font-body text-[13.5px] text-[#5b6b70]';
  valueSpan.textContent = ` ${value}`;
  
  row.appendChild(labelSpan);
  row.appendChild(valueSpan);
  
  return row;
}

// Update selected count
function updateSelectedCount(count) {
  if (!selectedCountDisplay) return;
  
  if (count === 0) {
    selectedCountDisplay.textContent = 'No garments selected';
    selectedCountDisplay.className = 'text-center text-[#5b6b70] font-body text-[13.5px] mt-4';
  } else {
    selectedCountDisplay.textContent = `You've selected ${count} garment${count !== 1 ? 's' : ''} for care instructions`;
    selectedCountDisplay.className = 'text-center text-[#52796f] font-semibold font-body text-[13.5px] mt-4 p-2 bg-[#eef3f1] rounded-lg';
  }
}

// Clear all selections
function clearAllSelections() {
  const checkboxes = document.querySelectorAll('#garment-checkboxes input[type="checkbox"]');
  checkboxes.forEach(cb => cb.checked = false);
  updateCareCards();
}

// Save selected garments to localStorage
function saveSelectedGarments(selectedIds) {
  localStorage.setItem('selectedGarments', JSON.stringify(selectedIds));
}

// Load saved garments from localStorage
function loadSavedGarments() {
  const saved = localStorage.getItem('selectedGarments');
  if (!saved) return;
  
  const selectedIds = JSON.parse(saved);
  selectedIds.forEach(id => {
    const checkbox = document.querySelector(`#garment-checkboxes input[value="${id}"]`);
    if (checkbox) checkbox.checked = true;
  });
  
  updateCareCards();
}

// Event listeners
if (clearAllBtn) {
  clearAllBtn.addEventListener('click', clearAllSelections);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  renderGarmentCheckboxes();
  loadSavedGarments();
});

// LaundryModuleDetails.js

const MODULE_DETAILS = [
  {
    id: 1,
    title: "Sorting Your Clothes",
    content: `<h3 class="font-heading font-bold text-lg text-[#2f3e46] mb-3">Learn How to Sort Clothes</h3><p class="font-body text-[13.5px] text-[#5b6b70] mb-3">Create three piles: whites, darks, and colors to prevent color bleeding.</p>`
  },
  {
    id: 2,
    title: "Washing Settings Guide",
    content: `<h3 class="font-heading font-bold text-lg text-[#2f3e46] mb-3">Water Temperature Guide</h3><p class="font-body text-[13.5px] text-[#5b6b70] mb-3">Hot water for whites, warm for regular, cold for colors.</p>`
  },
  {
    id: 3,
    title: "Understanding Care Labels",
    content: `<h3 class="font-heading font-bold text-lg text-[#2f3e46] mb-3">Decode Laundry Symbols</h3><p class="font-body text-[13.5px] text-[#5b6b70] mb-3">Check care labels before washing to prevent damage.</p>`
  },
  {
    id: 4,
    title: "Bleach & Chemical Guide",
    content: `<h3 class="font-heading font-bold text-lg text-[#2f3e46] mb-3">Use Bleach Safely</h3><p class="font-body text-[13.5px] text-[#5b6b70] mb-3">Chlorine bleach for whites only, oxygen bleach for colors.</p>`
  },
  {
    id: 5,
    title: "Machine vs. Hand Drying",
    content: `<h3 class="font-heading font-bold text-lg text-[#2f3e46] mb-3">Drying Methods</h3><p class="font-body text-[13.5px] text-[#5b6b70] mb-3">Tumble dry for cotton, air dry for delicates.</p>`
  },
  {
    id: 6,
    title: "Preventing Wrinkles",
    content: `<h3 class="font-heading font-bold text-lg text-[#2f3e46] mb-3">Keep Clothes Wrinkle-Free</h3><p class="font-body text-[13.5px] text-[#5b6b70] mb-3">Remove clothes promptly from dryer and hang immediately.</p>`
  },
  {
    id: 7,
    title: "Extending Garment Life",
    content: `<h3 class="font-heading font-bold text-lg text-[#2f3e46] mb-3">Make Clothes Last Longer</h3><p class="font-body text-[13.5px] text-[#5b6b70] mb-3">Wash inside out, use gentle cycles, and repair damage promptly.</p>`
  }
];

function showModuleDetails(moduleId) {
  const module = MODULE_DETAILS.find(m => m.id === moduleId);
  if (!module) return;
  
  const modal = document.getElementById('module-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  
  modalTitle.textContent = module.title;
  modalContent.innerHTML = module.content;
  
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('module-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', function() {
  const readButtons = document.querySelectorAll('.module-read-btn');
  readButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const moduleId = parseInt(this.getAttribute('data-module-id'));
      showModuleDetails(moduleId);
    });
  });
  
  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  const modal = document.getElementById('module-modal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });
  }
});