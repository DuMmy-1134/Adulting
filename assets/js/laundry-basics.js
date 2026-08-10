
function youtubeEmbedHtml(youtubeId, title) {
  return `
    <div class="aspect-video w-full rounded-xl overflow-hidden">
      <iframe
        class="w-full h-full"
        src="https://www.youtube-nocookie.com/embed/${youtubeId}"
        title="${title}"
        frameborder="0"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>`;
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-youtube-embed]').forEach(function (el) {
    const videoId = el.dataset.youtubeEmbed;
    const title = el.dataset.youtubeTitle || 'Demonstration video';
    el.innerHTML = youtubeEmbedHtml(videoId, title);
  });
});

const GARMENTS = [
  {
    id: 1,
    name: "Cotton T-Shirts",
    temperature: "Warm (40°C)",
    cycle: "Normal",
    drying: "Tumble dry or line dry"
  },
  {
    id: 2,
    name: "Denim Jeans",
    temperature: "Cold (30°C)",
    cycle: "Delicate",
    drying: "Line dry only"
  },
  {
    id: 3,
    name: "Wool Sweaters",
    temperature: "Cold (20°C)",
    cycle: "Wool/Hand wash",
    drying: "Lay flat to dry"
  },
  {
    id: 4,
    name: "Silk Blouses",
    temperature: "Cold (20°C)",
    cycle: "Hand wash/Delicate",
    drying: "Drip dry, no wringing"
  },
  {
    id: 5,
    name: "Underwear & Socks",
    temperature: "Warm (40°C)",
    cycle: "Normal",
    drying: "Tumble dry"
  },
  {
    id: 6,
    name: "Bed Sheets",
    temperature: "Hot (60°C)",
    cycle: "Normal",
    drying: "Tumble dry"
  },
  {
    id: 7,
    name: "Athletic Wear",
    temperature: "Cold (30°C)",
    cycle: "Delicate",
    drying: "Air dry"
  },
  {
    id: 8,
    name: "Jackets",
    temperature: "Cold (30°C)",
    cycle: "Gentle",
    drying: "Air dry, hang up"
  }
];

const garmentCheckboxes = document.getElementById('garment-checkboxes');
const careCardsContainer = document.getElementById('care-cards-container');
const selectedCountDisplay = document.getElementById('selected-count');
const clearAllBtn = document.getElementById('clear-all-btn');

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
    textSpan.className = 'font-body text-sm text-[#2f3e46]';
    textSpan.textContent = garment.name;
    
    label.appendChild(checkbox);
    label.appendChild(textSpan);
    
    garmentCheckboxes.appendChild(label);
  });
}

function updateCareCards() {
  if (!careCardsContainer) return;
  
  const checkboxes = document.querySelectorAll('#garment-checkboxes input[type="checkbox"]:checked');
  // Checkbox values are strings; parse back to numbers to match GARMENTS[].id.
  const selectedIds = Array.from(checkboxes).map(cb => parseInt(cb.value));
  
  careCardsContainer.innerHTML = '';
  
  if (selectedIds.length === 0) {
    careCardsContainer.innerHTML = '<p class="col-span-full text-center text-[#5b6b70] font-body text-sm">Select garments to see care instructions</p>';
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
    title.textContent = garment.name;
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'text-[#d97757] hover:text-[#c2673f] font-bold text-lg cursor-pointer';
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', function() {
      const checkbox = document.querySelector(`#garment-checkboxes input[value="${id}"]`);
      if (checkbox) checkbox.checked = false;
      updateCareCards();
    });
    
    titleDiv.appendChild(title);
    titleDiv.appendChild(removeBtn);
    
    const instructionsDiv = document.createElement('div');
    instructionsDiv.className = 'space-y-3';
    
    const tempDiv = createInstructionRow('Temperature:', garment.temperature);
    const cycleDiv = createInstructionRow('Cycle:', garment.cycle);
    const dryingDiv = createInstructionRow('Drying:', garment.drying);
    
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

function createInstructionRow(label, value) {
  const row = document.createElement('div');
  row.className = 'border-b border-[#f0ece3] pb-2';
  
  const labelSpan = document.createElement('span');
  labelSpan.className = 'font-body font-semibold text-sm text-[#2f3e46]';
  labelSpan.textContent = label;
  
  const valueSpan = document.createElement('span');
  valueSpan.className = 'font-body text-sm text-[#5b6b70]';
  valueSpan.textContent = ` ${value}`;
  
  row.appendChild(labelSpan);
  row.appendChild(valueSpan);
  
  return row;
}

function updateSelectedCount(count) {
  if (!selectedCountDisplay) return;
  
  if (count === 0) {
    selectedCountDisplay.textContent = 'No garments selected';
    selectedCountDisplay.className = 'text-center text-[#5b6b70] font-body text-sm mt-4';
  } else {
    selectedCountDisplay.textContent = `You've selected ${count} garment${count !== 1 ? 's' : ''} for care instructions`;
    selectedCountDisplay.className = 'text-center text-[#52796f] font-semibold font-body text-sm mt-4 p-2 bg-[#eef3f1] rounded-lg';
  }
}

function clearAllSelections() {
  const checkboxes = document.querySelectorAll('#garment-checkboxes input[type="checkbox"]');
  checkboxes.forEach(cb => cb.checked = false);
  updateCareCards();
}

// Persist selections in localStorage so they survive a page refresh.
function saveSelectedGarments(selectedIds) {
  localStorage.setItem('selectedGarments', JSON.stringify(selectedIds));
}

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

if (clearAllBtn) {
  clearAllBtn.addEventListener('click', clearAllSelections);
}

document.addEventListener('DOMContentLoaded', function() {
  // Checkboxes must exist in the DOM before loadSavedGarments() can check them.
  renderGarmentCheckboxes();
  loadSavedGarments();
});