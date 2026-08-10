/*
 * Page-behavior script for pages/communication-skills.html (the
 * Communication Skills page).
 *
 * Convention for this project's content scripts (Phases 6-8 follow this):
 * - One script per page, named after the page it serves - this file,
 *   communication-skills.js, serves pages/communication-skills.html only.
 * - Loaded with `defer` after the two Tailwind script tags, so it runs
 *   once the DOM is fully parsed and never blocks page rendering.
 * - Page content data lives in a module-level `const` array of plain
 *   objects at the top of the file, kept separate from DOM logic.
 * - The DOM is reached only through ids authored in the page markup,
 *   never by walking tags or reading Tailwind classes, so restyling the
 *   page cannot break this script's behavior.
 * - All injected copy is assigned with textContent, so page text can
 *   never be interpreted as markup.
 */

const SCENARIOS = [
  {
    label: "Asking a professor for a deadline extension",
    response:
      "Hi Professor Tan, I'm writing about the ST0501 CA2 due Friday. I've been dealing with [brief, honest reason] and I'm concerned about submitting quality work on time. Would it be possible to get a short extension, or could we discuss an alternative? I have what I've completed so far ready to share if that's helpful. Thank you for considering it.",
  },
  {
    label: "Telling a friend you need space",
    response:
      "Hey, I want to be upfront with you because I value our friendship. I've been feeling a bit overwhelmed lately and need some time to myself this week. It's not about you - I just need to recharge. Can we catch up again next week instead?",
  },
  {
    label: "A group chat is spiraling into an argument",
    response:
      "Hey everyone, I think this is getting a bit heated and text isn't the best format for it. Can we hop on a call later today to sort it out properly? I don't think anyone here actually disagrees on the goal, just the approach.",
  },
  {
    label: "Declining a group project role you don't have time for",
    response:
      "Thanks for thinking of me for this part - I want to be honest that I'm stretched thin this week and wouldn't be able to give it the attention it deserves. Could someone else take the lead on this piece? I'm happy to help review it once it's drafted.",
  },
  {
    label: "Following up after being left on read",
    response:
      "Hey, no worries if you've been busy! Just following up on my message from earlier about [topic] - let me know whenever you get a chance, no rush.",
  },
  {
    label: "Apologizing after a text was misread",
    response:
      "I think my last message came across differently than I meant it - sorry about that, texts can lose tone. What I meant was [clarify intent]. Let me know if that makes more sense, or we can just talk about it in person.",
  },
];

// Pill active/inactive classes match the filter-pill-btn pattern in
// submit-a-tip.js, reused here for the same "select one of several
// options" interaction.
const ACTIVE_PILL_CLASSES = ["bg-[#52796f]", "border-[#52796f]", "text-white"];
const INACTIVE_PILL_CLASSES = ["border-[#7c9d96]", "text-[#2f3e46]", "hover:bg-[#eef3f1]"];

function setPillActive(pillButton, isActive) {
  if (isActive) {
    pillButton.classList.remove(...INACTIVE_PILL_CLASSES);
    pillButton.classList.add(...ACTIVE_PILL_CLASSES);
  } else {
    pillButton.classList.remove(...ACTIVE_PILL_CLASSES);
    pillButton.classList.add(...INACTIVE_PILL_CLASSES);
  }
}

function renderScenarioPills() {
  const container = document.getElementById("scenario-pills");
  if (!container) {
    return;
  }

  SCENARIOS.forEach((scenario, index) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className =
      "scenario-pill-btn inline-block px-4 py-2 rounded-full border-2 text-sm font-semibold text-left transition-colors";
    pill.dataset.scenarioIndex = String(index);
    pill.textContent = scenario.label;
    setPillActive(pill, false);
    container.appendChild(pill);
  });
}

function showScenarioResponse(index) {
  const wrapper = document.getElementById("scenario-response");
  const textEl = document.getElementById("scenario-response-text");
  if (!wrapper || !textEl) {
    return;
  }

  const scenario = SCENARIOS[index];
  textEl.textContent = scenario.response;
  wrapper.classList.remove("hidden");
}

function initExampleResponses() {
  const container = document.getElementById("scenario-pills");
  if (!container) {
    return;
  }

  renderScenarioPills();

  container.addEventListener("click", (event) => {
    const clickedPill = event.target.closest(".scenario-pill-btn");
    if (!clickedPill) {
      return;
    }

    container.querySelectorAll(".scenario-pill-btn").forEach((pillButton) => {
      setPillActive(pillButton, pillButton === clickedPill);
    });

    showScenarioResponse(Number(clickedPill.dataset.scenarioIndex));
  });
}

initExampleResponses();

// CommunicationSkillsScenarios.js

const SIMULATOR_SCENARIOS = [
  {
    id: 1,
    title: "Scenario 1: Disagreeing with a Friend",
    situation: "Your friend says they want to quit school to pursue social media fame. You disagree with this decision. How do you respond?",
    options: [
      {
        text: "That's a stupid idea. You'll regret it.",
        feedback: "❌ Poor Response",
        explanation: "This response is judgmental and dismissive. It attacks your friend rather than addressing the issue. This will likely hurt the friendship and make them defensive.",
        score: 0
      },
      {
        text: "I'm worried about your future. Can we talk about what's driving this decision? What if we explore other options together?",
        feedback: "✅ Great Response",
        explanation: "This response shows you care, uses 'I' statements, and opens dialogue. You validate their feelings while offering support to explore alternatives together.",
        score: 10
      },
      {
        text: "Whatever you want to do is fine with me.",
        feedback: "⚠️ Passive Response",
        explanation: "While this seems accepting, it doesn't show you care enough to engage in a real conversation. A true friend should express concerns thoughtfully.",
        score: 5
      }
    ]
  },
  {
    id: 2,
    title: "Scenario 2: Handling Criticism at Work/School",
    situation: "Your teacher/boss says your work was below expectations and needs improvement. You're feeling defensive. How do you respond?",
    options: [
      {
        text: "I did my best. If you don't like it, that's your problem.",
        feedback: "❌ Aggressive Response",
        explanation: "This response is confrontational and closes communication. It damages your relationship with authority and shows you're not open to feedback.",
        score: 0
      },
      {
        text: "Oh okay... I guess I'm just not good at this.",
        feedback: "⚠️ Passive Response",
        explanation: "You're accepting blame without understanding the issue. Better to ask clarifying questions and show you're willing to improve.",
        score: 5
      },
      {
        text: "Thank you for the feedback. Can you be more specific about what I should improve? I'd like to understand where I went wrong so I can do better next time.",
        feedback: "✅ Excellent Response",
        explanation: "This shows maturity, openness to learning, and professionalism. You ask for specific guidance and demonstrate commitment to improvement.",
        score: 10
      }
    ]
  },
  {
    id: 3,
    title: "Scenario 3: Setting Boundaries with a Friend",
    situation: "A friend constantly borrows money but never pays you back. They're asking again. What do you say?",
    options: [
      {
        text: "I can't lend you money anymore. I need you to pay back what you already owe me.",
        feedback: "✅ Assertive & Clear",
        explanation: "You're setting a clear boundary while being respectful. You state your position factually without being harsh. This is healthy communication.",
        score: 10
      },
      {
        text: "Sure, take whatever you need. I don't mind.",
        feedback: "❌ Enabling Response",
        explanation: "You're not respecting your own financial limits. This enables poor behavior and damages your relationship long-term.",
        score: 0
      },
      {
        text: "You always do this! You're so irresponsible!",
        feedback: "⚠️ Accusatory Response",
        explanation: "While you're setting a boundary, you're doing it aggressively by attacking their character. This will hurt them and damage your friendship.",
        score: 4
      }
    ]
  },
  {
    id: 4,
    title: "Scenario 4: Apologizing Sincerely",
    situation: "You said something hurtful to a friend and they're upset with you. How do you apologize?",
    options: [
      {
        text: "I'm sorry you feel that way, but I didn't mean it that way.",
        feedback: "❌ Non-apology Apology",
        explanation: "This isn't a real apology. You're making excuses and putting the blame on their feelings rather than taking responsibility.",
        score: 0
      },
      {
        text: "I'm sorry for what I said. I know it hurt you, and that wasn't okay. I'll be more careful with my words.",
        feedback: "✅ Genuine Apology",
        explanation: "This is a real apology. You acknowledge the hurt, take responsibility, and show commitment to change. This rebuilds trust.",
        score: 10
      },
      {
        text: "I said sorry already. Can we just move on?",
        feedback: "⚠️ Dismissive Apology",
        explanation: "You're trying to end the conversation without truly addressing the hurt. Real apologies take time and genuine reflection.",
        score: 3
      }
    ]
  },
  {
    id: 5,
    title: "Scenario 5: Asking for Help",
    situation: "You're struggling in school and need help from a classmate. How do you ask?",
    options: [
      {
        text: "Can you help me? I'm really struggling and I think you're good at this. Would you mind explaining it to me?",
        feedback: "✅ Respectful & Clear",
        explanation: "You're specific about your need, acknowledge their strength, and ask respectfully. This shows humility and opens positive dialogue.",
        score: 10
      },
      {
        text: "You have to help me. I need your help.",
        feedback: "❌ Demanding Response",
        explanation: "Demanding help without considering the other person's time or willingness is disrespectful. People help those who ask nicely.",
        score: 0
      },
      {
        text: "Never mind, I'll figure it out myself...",
        feedback: "⚠️ Avoidant Response",
        explanation: "You're isolating yourself instead of reaching out. Asking for help is a sign of strength, not weakness. This could hurt your learning.",
        score: 4
      }
    ]
  }
];

let currentScenario = 1;
let totalScore = 0;

function renderScenario() {
  const scenario = SIMULATOR_SCENARIOS[currentScenario - 1];
  
  document.getElementById('scenario-title').textContent = scenario.title;
  document.getElementById('scenario-situation').textContent = scenario.situation;
  
  const optionsDiv = document.getElementById('scenario-options');
  optionsDiv.innerHTML = '';
  
  scenario.options.forEach(option => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className =
      'scenario-option-btn block w-full text-left font-body text-sm text-[#2f3e46] bg-white border-2 border-[#7c9d96] rounded-lg px-4 py-3 hover:bg-[#eef3f1] hover:border-[#52796f] transition-colors';
    button.textContent = option.text;
    button.addEventListener('click', () => selectOption(option));
    optionsDiv.appendChild(button);
  });
  
  updateProgress();
}

function selectOption(option) {
  totalScore += option.score;
  
  document.getElementById('scenario-feedback-title').textContent = option.feedback;
  document.getElementById('scenario-feedback-text').textContent = option.explanation;
  document.getElementById('scenario-score').textContent = option.score;
  
  document.getElementById('scenario-options').innerHTML = '';
  document.getElementById('scenario-feedback').style.display = 'block';
  
  const nextBtn = document.getElementById('next-scenario-btn');
  nextBtn.disabled = false;
  
  if (currentScenario === SIMULATOR_SCENARIOS.length) {
    nextBtn.textContent = 'See Results';
  }
}

function updateProgress() {
  const percentage = (currentScenario / SIMULATOR_SCENARIOS.length) * 100;
  document.getElementById('progress-bar').style.width = percentage + '%';
  document.getElementById('progress-text').textContent = `Scenario ${currentScenario} of ${SIMULATOR_SCENARIOS.length}`;
}

function nextScenario() {
  if (currentScenario < SIMULATOR_SCENARIOS.length) {
    currentScenario++;
    document.getElementById('scenario-feedback').style.display = 'none';
    renderScenario();
  } else {
    showResults();
  }
}

function showResults() {
  const maxScore = SIMULATOR_SCENARIOS.length * 10;
  const percentage = (totalScore / maxScore) * 100;
  
  document.getElementById('scenario-container').style.display = 'none';
  document.getElementById('scenario-results').style.display = 'block';
  
  document.getElementById('total-score').textContent = totalScore;
  document.getElementById('max-score').textContent = maxScore;
  document.getElementById('percentage').textContent = Math.round(percentage);
  
  const resultBar = document.getElementById('result-progress-bar');
  resultBar.style.width = percentage + '%';
  
  let message = '';
  if (percentage >= 80) {
    message = 'Excellent! You have strong communication skills. Keep practicing and you\'ll be a great communicator!';
  } else if (percentage >= 60) {
    message = 'Good job! You have solid communication skills. Keep working on assertiveness and active listening.';
  } else if (percentage >= 40) {
    message = 'Fair. You\'re on the right track. Practice more empathy and assertiveness in your daily conversations.';
  } else {
    message = 'Keep learning! Communication skills take practice. Review the feedback and try again.';
  }
  
  document.getElementById('result-message').textContent = message;
}

function restartScenarios() {
  currentScenario = 1;
  totalScore = 0;
  document.getElementById('scenario-container').style.display = 'block';
  document.getElementById('scenario-results').style.display = 'none';
  document.getElementById('scenario-feedback').style.display = 'none';
  document.getElementById('next-scenario-btn').disabled = true;
  document.getElementById('next-scenario-btn').textContent = 'Next Scenario';
  renderScenario();
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('next-scenario-btn').addEventListener('click', nextScenario);
  document.getElementById('restart-scenarios-btn').addEventListener('click', restartScenarios);
  renderScenario();
});
