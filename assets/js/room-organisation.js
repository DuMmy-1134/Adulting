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
    const zoneItem = document.createElement('details');
    zoneItem.className = 'group bg-white rounded-2xl shadow-sm p-5';
    zoneItem.setAttribute('data-zone-id', zone.id);

    // Zone header
    const summary = document.createElement('summary');
    summary.className = 'list-none flex justify-between items-center gap-4 cursor-pointer font-body font-semibold text-base text-[#2f3e46]';

    const titleSpan = document.createElement('span');
    titleSpan.textContent = zone.title;
    summary.appendChild(titleSpan);

    const plus = document.createElement('span');
    plus.setAttribute('aria-hidden', 'true');
    plus.className = 'text-[#52796f] font-bold shrink-0 group-open:hidden';
    plus.textContent = '+';
    summary.appendChild(plus);

    const minus = document.createElement('span');
    minus.setAttribute('aria-hidden', 'true');
    minus.className = 'text-[#52796f] font-bold shrink-0 hidden group-open:inline';
    minus.textContent = '–';
    summary.appendChild(minus);

    // Zone content
    const content = document.createElement('div');
    content.className = 'mt-2.5 flex flex-col gap-3';

    // Steps list
    const stepsList = document.createElement('ol');
    stepsList.className = 'list-decimal list-inside space-y-2 font-body text-base text-[#5b6b70]';

    zone.tips.forEach(tip => {
      const li = document.createElement('li');
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

    zoneItem.appendChild(summary);
    zoneItem.appendChild(content);

    zonesContainer.appendChild(zoneItem);
  });
}

// Mark zone as complete
function markZoneComplete(e) {
  const btn = e.currentTarget;
  const zoneId = btn.getAttribute('data-zone-id');

  btn.textContent = '✓ Completed';
  btn.className = 'w-full bg-[#eef3f1] text-[#2f3e46] font-semibold py-2 rounded-lg border-2 border-[#52796f]';
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
    progressMessage.className = 'mt-6 p-4 bg-[#eef3f1] text-[#2f3e46] rounded-lg font-semibold text-center border-2 border-[#52796f]';
  } else if (completed > 0) {
    progressMessage.textContent = `Progress: ${completed} of ${total} zones organized (${percentage}%)`;
    progressMessage.className = 'mt-6 p-4 bg-[#f6f2ea] text-[#2f3e46] rounded-lg font-semibold text-center border-2 border-[#d97757]';
  } else {
    progressMessage.textContent = 'Click a zone to start organizing!';
    progressMessage.className = 'mt-6 p-4 bg-[#eef3f1] text-[#2f3e46] rounded-lg font-semibold text-center border-2 border-[#7c9d96]';
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
      btn.className = 'w-full bg-[#eef3f1] text-[#2f3e46] font-semibold py-2 rounded-lg border-2 border-[#52796f]';
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

// RoomOrganisationQuiz.js

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

let quizAnswers = {};
let currentQuestion = 1;

function renderQuestion() {
  const question = QUIZ_QUESTIONS[currentQuestion - 1];
  if (!question) return;
  
  document.getElementById('quiz-question-text').textContent = question.question;
  
  const optionsDiv = document.getElementById('quiz-options');
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
      document.getElementById('next-question-btn').disabled = false;
    });
    
    const text = document.createElement('span');
    text.className = 'font-body text-sm text-[#2f3e46]';
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
  document.getElementById('progress-bar-fill').style.width = percentage + '%';
  document.getElementById('progress-text').textContent = `Question ${currentQuestion} of ${totalQuestions}`;
}

function nextQuestion() {
  if (!quizAnswers[`q${currentQuestion}`]) {
    alert('Please select an option before continuing');
    return;
  }
  
  if (currentQuestion < QUIZ_QUESTIONS.length) {
    currentQuestion++;
    renderQuestion();
    document.getElementById('next-question-btn').disabled = true;
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById('quiz-container').classList.add('hidden');
  document.getElementById('quiz-results').classList.remove('hidden');
}

function restartQuiz() {
  quizAnswers = {};
  currentQuestion = 1;
  document.getElementById('quiz-results').classList.add('hidden');
  document.getElementById('quiz-container').classList.remove('hidden');
  document.getElementById('next-question-btn').disabled = true;
  renderQuestion();
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('next-question-btn').addEventListener('click', nextQuestion);
  document.getElementById('restart-quiz-btn').addEventListener('click', restartQuiz);
  renderQuestion();
});