// RoomOrganisationZones.js

const ROOM_ZONES = [
  {
    id: 1,
    title: "Study desk",
    tips: [
      "Clear all items off the surface",
      "Wipe down the desk with a cloth",
      "Organize pens, pencils, and supplies in a cup or organizer",
      "Keep only current books and materials on the desk"
    ]
  },
  {
    id: 2,
    title: "Wardrobe",
    tips: [
      "Remove all clothes from your wardrobe",
      "Sort into categories: tops, bottoms, dresses, etc.",
      "Hang similar colors together",
      "Use hangers consistently and arrange neatly"
    ]
  },
  {
    id: 3,
    title: "Storage area",
    tips: [
      "Identify what storage boxes you have",
      "Label each box by category",
      "Stack boxes neatly and securely",
      "Keep frequently used items at eye level"
    ]
  },
  {
    id: 4,
    title: "Floor space",
    tips: [
      "Remove all items from the floor",
      "Sweep or vacuum the floor thoroughly",
      "Return essential items to proper storage",
      "Keep floor clear for movement and safety"
    ]
  }
];

const zonesContainer = document.getElementById('zones-container');
const progressMessage = document.getElementById('progress-message');
const resetZonesBtn = document.getElementById('reset-zones-btn');

// Render zones with accordion
function renderZones() {
  if (!zonesContainer) return;
  
  zonesContainer.innerHTML = '';
  
  ROOM_ZONES.forEach(zone => {
    const zoneItem = document.createElement('div');
    zoneItem.className = 'border-2 border-[#7c9d96] rounded-lg overflow-hidden mb-3';
    
    // Zone header (clickable)
    const header = document.createElement('button');
    header.className = 'w-full bg-[#f5f3f0] hover:bg-[#eef3f1] p-4 flex items-center justify-between font-heading font-bold text-[#2f3e46] transition-all';
    header.setAttribute('data-zone-id', zone.id);
    
    const titleSpan = document.createElement('span');
    titleSpan.textContent = zone.title;
    
    const chevron = document.createElement('span');
    chevron.className = 'transition-transform';
    chevron.textContent = '▾';
    
    header.appendChild(titleSpan);
    header.appendChild(chevron);
    
    // Zone content (hidden by default)
    const content = document.createElement('div');
    content.className = 'hidden bg-white p-4';
    content.setAttribute('data-zone-id', zone.id);
    
    // Steps list
    const stepsList = document.createElement('ol');
    stepsList.className = 'list-decimal list-inside space-y-2 mb-4';
    
    zone.tips.forEach(tip => {
      const li = document.createElement('li');
      li.className = 'font-body text-[13.5px] text-[#5b6b70]';
      li.textContent = tip;
      stepsList.appendChild(li);
    });
    
    content.appendChild(stepsList);
    
    // Complete button
    const completeBtn = document.createElement('button');
    completeBtn.className = 'w-full bg-[#52796f] text-white font-semibold py-2 rounded-lg hover:bg-[#3d5a56] transition-all complete-zone-btn';
    completeBtn.setAttribute('data-zone-id', zone.id);
    completeBtn.textContent = 'Mark as Complete';
    completeBtn.addEventListener('click', markZoneComplete);
    
    content.appendChild(completeBtn);
    
    zoneItem.appendChild(header);
    zoneItem.appendChild(content);
    
    header.addEventListener('click', toggleZone);
    
    zonesContainer.appendChild(zoneItem);
  });
}

// Toggle zone accordion
function toggleZone(e) {
  const header = e.currentTarget;
  const zoneId = header.getAttribute('data-zone-id');
  const content = document.querySelector(`div[data-zone-id="${zoneId}"]`);
  const chevron = header.querySelector('span:last-child');
  
  content.classList.toggle('hidden');
  chevron.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}

// Mark zone as complete
function markZoneComplete(e) {
  const btn = e.currentTarget;
  const zoneId = btn.getAttribute('data-zone-id');

  btn.textContent = '✓ Completed';
  btn.className = 'w-full bg-[#d4edda] text-[#155724] font-semibold py-2 rounded-lg border-2 border-[#52796f]';
  btn.disabled = true;
  
  // Save to localStorage
  let completedZones = JSON.parse(localStorage.getItem('completedZones')) || [];
  if (!completedZones.includes(zoneId)) {
    completedZones.push(zoneId);
    localStorage.setItem('completedZones', JSON.stringify(completedZones));
  }
  
  updateProgress();
}

// Update progress
function updateProgress() {
  if (!progressMessage) return;
  
  const completedZones = JSON.parse(localStorage.getItem('completedZones')) || [];
  const total = ROOM_ZONES.length;
  const completed = completedZones.length;
  const percentage = Math.round((completed / total) * 100);
  
  if (completed === total) {
    progressMessage.textContent = `✓ Excellent! You've organized all ${total} zones!`;
    progressMessage.className = 'mt-6 p-4 bg-[#d4edda] text-[#155724] rounded-lg font-semibold text-center border-2 border-[#52796f]';
  } else if (completed > 0) {
    progressMessage.textContent = `Progress: ${completed} of ${total} zones organized (${percentage}%)`;
    progressMessage.className = 'mt-6 p-4 bg-[#fff3cd] text-[#856404] rounded-lg font-semibold text-center border-2 border-[#d97757]';
  } else {
    progressMessage.textContent = 'Click a zone to start organizing!';
    progressMessage.className = 'mt-6 p-4 bg-[#e7f3ff] text-[#004085] rounded-lg font-semibold text-center border-2 border-[#7c9d96]';
  }
}

// Reset all zones
function resetAllZones() {
  localStorage.removeItem('completedZones');
  renderZones();
  updateProgress();
  loadCompletedZones();
}

// Load completed zones from localStorage
function loadCompletedZones() {
  const completedZones = JSON.parse(localStorage.getItem('completedZones')) || [];
  
  completedZones.forEach(zoneId => {
    const btn = document.querySelector(`button.complete-zone-btn[data-zone-id="${zoneId}"]`);
    if (btn && !btn.disabled) {
      btn.textContent = '✓ Completed';
      btn.className = 'w-full bg-[#d4edda] text-[#155724] font-semibold py-2 rounded-lg border-2 border-[#52796f]';
      btn.disabled = true;
    }
  });
}

// Event listeners
if (resetZonesBtn) {
  resetZonesBtn.addEventListener('click', resetAllZones);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  renderZones();
  loadCompletedZones();
  updateProgress();
});