

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
  const zoneItem = btn.closest('div[border-2]').closest('div');
  
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

// quiz

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "How much clutter do you currently have in your room?",
    options: [
      { value: "minimal", text: "Minimal - mostly organized" },
      { value: "moderate", text: "Moderate - some clutter" },
      { value: "heavy", text: "Heavy - very cluttered" }
    ]
  },
  {
    id: 2,
    question: "What's your main organization challenge?",
    options: [
      { value: "storage", text: "Lack of storage space" },
      { value: "sorting", text: "Can't sort items properly" },
      { value: "maintenance", text: "Keeping it organized" }
    ]
  },
  {
    id: 3,
    question: "How much time can you dedicate to organizing?",
    options: [
      { value: "quick", text: "Quick sessions (15-30 mins)" },
      { value: "moderate", text: "Moderate (1-2 hours)" },
      { value: "dedicated", text: "Full day project" }
    ]
  },
  {
    id: 4,
    question: "What's your room size?",
    options: [
      { value: "small", text: "Small (single bed room)" },
      { value: "medium", text: "Medium (double bed room)" },
      { value: "large", text: "Large (spacious)" }
    ]
  },
  {
    id: 5,
    question: "Do you prefer minimalist or maximalist approach?",
    options: [
      { value: "minimalist", text: "Minimalist - keep only essentials" },
      { value: "balanced", text: "Balanced - organized but with items" },
      { value: "maximalist", text: "Maximalist - keep everything organized" }
    ]
  }
];

const RECOMMENDATIONS = {
  minimal_storage_quick_small_minimalist: {
    method: "Minimal Shelving Method",
    description: "Focus on vertical storage with slim shelves. Keep only essential items visible.",
    tips: [
      "Use over-the-door organizers",
      "Install floating shelves to maximize wall space",
      "Use drawer dividers for small items",
      "Invest in multi-functional furniture"
    ]
  },
  minimal_storage_quick_small_balanced: {
    method: "Compact Zone Method",
    description: "Create small organized zones for different categories.",
    tips: [
      "Designate specific zones on shelves",
      "Use labeled boxes for quick identification",
      "Keep frequently used items at eye level",
      "Use under-bed storage for seasonal items"
    ]
  },
  moderate_sorting_moderate_medium_balanced: {
    method: "Category-Based Organization",
    description: "Sort items by category and assign each a home.",
    tips: [
      "Group similar items together",
      "Use color-coded labels",
      "Create a 'donation' corner",
      "Review system monthly"
    ]
  },
  heavy_maintenance_dedicated_large_minimalist: {
    method: "KonMari Decluttering Method",
    description: "Keep only items that spark joy. Dedicated deep organization.",
    tips: [
      "Sort by category, not location",
      "Keep items that spark joy",
      "Fold items vertically for visibility",
      "Store like items together",
      "Use beautiful storage containers"
    ]
  }
};

let quizAnswers = {};
let currentQuestion = 1;

const quizContainer = document.getElementById('quiz-container');
const questionDiv = document.getElementById('quiz-question');
const optionsDiv = document.getElementById('quiz-options');
const progressDiv = document.getElementById('quiz-progress');
const nextBtn = document.getElementById('next-question-btn');
const resultsDiv = document.getElementById('quiz-results');

function renderQuestion() {
  const question = QUIZ_QUESTIONS[currentQuestion - 1];
  if (!question) return;
  
  questionDiv.innerHTML = `<h3 class="font-heading font-bold text-lg text-[#2f3e46] mb-4">${question.question}</h3>`;
  
  optionsDiv.innerHTML = '';
  question.options.forEach(option => {
    const label = document.createElement('label');
    label.className = 'flex items-center gap-3 p-3 bg-[#f5f3f0] rounded-lg hover:bg-[#eef3f1] cursor-pointer transition-all mb-3';
    
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = `q${question.id}`;
    radio.value = option.value;
    radio.className = 'w-4 h-4 cursor-pointer';
    radio.addEventListener('change', function() {
      quizAnswers[`q${question.id}`] = this.value;
      nextBtn.disabled = false;
    });
    
    const text = document.createElement('span');
    text.className = 'font-body text-[13.5px] text-[#2f3e46]';
    text.textContent = option.text;
    
    label.appendChild(radio);
    label.appendChild(text);
    optionsDiv.appendChild(label);
  });
  
  updateProgress();
}

function updateProgress() {
  const totalQuestions = QUIZ_QUESTIONS.length;
  const percentage = (currentQuestion / totalQuestions) * 100;
  progressDiv.innerHTML = `<div class="w-full bg-[#f0ece3] rounded-full h-2 mb-4"><div class="bg-[#52796f] h-2 rounded-full" style="width: ${percentage}%"></div></div><p class="text-center font-body text-[13.5px] text-[#5b6b70]">Question ${currentQuestion} of ${totalQuestions}</p>`;
}

function nextQuestion() {
  if (!quizAnswers[`q${currentQuestion}`]) {
    alert('Please select an option before continuing');
    return;
  }
  
  if (currentQuestion < QUIZ_QUESTIONS.length) {
    currentQuestion++;
    renderQuestion();
    nextBtn.disabled = true;
  } else {
    showResults();
  }
}

function showResults() {
  const answers = Object.values(quizAnswers).join('_');
  const recommendation = findBestMatch(answers);
  
  quizContainer.classList.add('hidden');
  resultsDiv.classList.remove('hidden');
  
  const resultsContent = document.getElementById('results-content');
  resultsContent.innerHTML = `
    <h2 class="font-heading font-bold text-2xl text-[#52796f] mb-4">Your Personalized Recommendation</h2>
    
    <div class="bg-[#eef3f1] rounded-2xl p-6 mb-6 border-2 border-[#52796f]">
      <h3 class="font-heading font-bold text-xl text-[#2f3e46] mb-2">${recommendation.method}</h3>
      <p class="font-body text-[13.5px] text-[#5b6b70] mb-4">${recommendation.description}</p>
      
      <h4 class="font-heading font-bold text-[#2f3e46] mb-3">Recommended Tips:</h4>
      <ul class="list-disc list-inside space-y-2">
        ${recommendation.tips.map(tip => `<li class="font-body text-[13.5px] text-[#5b6b70]">${tip}</li>`).join('')}
      </ul>
    </div>
    
    <button id="restart-quiz-btn" class="w-full bg-[#d97757] text-white font-semibold py-3 rounded-lg hover:bg-[#c4624d] transition-all">
      Retake Quiz
    </button>
  `;
  
  document.getElementById('restart-quiz-btn').addEventListener('click', restartQuiz);
}

function findBestMatch(answers) {
  for (const [key, value] of Object.entries(RECOMMENDATIONS)) {
    if (key.split('_').every(part => answers.includes(part))) {
      return value;
    }
  }
  
  // Default recommendation if no exact match
  return {
    method: "Balanced Organization Method",
    description: "A flexible approach combining best practices from multiple methods.",
    tips: [
      "Start small with one zone",
      "Use clear labeling for all storage",
      "Keep similar items together",
      "Review and adjust monthly",
      "Don't rush the process"
    ]
  };
}

function restartQuiz() {
  quizAnswers = {};
  currentQuestion = 1;
  resultsDiv.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  nextBtn.disabled = true;
  renderQuestion();
}

if (nextBtn) {
  nextBtn.addEventListener('click', nextQuestion);
}

document.addEventListener('DOMContentLoaded', function() {
  renderQuestion();
});