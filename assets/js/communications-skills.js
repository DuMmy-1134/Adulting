// scenarios

const SCENARIOS = [
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
  const scenario = SCENARIOS[currentScenario - 1];
  
  document.getElementById('scenario-title').textContent = scenario.title;
  document.getElementById('scenario-situation').textContent = scenario.situation;
  
  const optionsDiv = document.getElementById('scenario-options');
  optionsDiv.innerHTML = '';
  
  scenario.options.forEach(option => {
    const button = document.createElement('button');
    button.className = 'scenario-option-btn';
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
  
  if (currentScenario === SCENARIOS.length) {
    nextBtn.textContent = 'See Results';
  }
}

function updateProgress() {
  const percentage = (currentScenario / SCENARIOS.length) * 100;
  document.getElementById('progress-bar').style.width = percentage + '%';
  document.getElementById('progress-text').textContent = `Scenario ${currentScenario} of ${SCENARIOS.length}`;
}

function nextScenario() {
  if (currentScenario < SCENARIOS.length) {
    currentScenario++;
    document.getElementById('scenario-feedback').style.display = 'none';
    renderScenario();
  } else {
    showResults();
  }
}

function showResults() {
  const maxScore = SCENARIOS.length * 10;
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