/*
  Runs the Life Readiness Quiz: builds a randomised set of questions from
  QUESTION_BANK, tracks progress, validates answers, then scores them by
  category and shows a personalised result with targeted advice.
*/

// Only a random subset of this bank is ever shown: TOTAL_QUESTIONS
// questions are picked per attempt, split evenly across categories, so
// hidden questions never factor into the progress bar, score, or result
// bands. Each question's options are ordered low-readiness to
// high-readiness, so an option's position (1st/2nd/3rd) doubles as its
// point value.
const TOTAL_QUESTIONS = 16;

const QUESTION_BANK = {
  "home-skills": [
    {
      text: "How comfortable are you cooking a simple meal from scratch?",
      options: [
        "Not really - I’d need a recipe open the whole time",
        "A few simple dishes, but I stick to what I know",
        "Very comfortable - I can improvise with whatever is in the fridge",
      ],
    },
    {
      text: "How would you rate your laundry and room-organisation habits?",
      options: [
        "Honestly, a bit of a mess most weeks",
        "I manage, but I put it off until it piles up",
        "Pretty tidy - I keep on top of it as I go",
      ],
    },
    {
      text: "How do you handle grocery shopping for the week?",
      options: [
        "I don’t really plan, I just buy whatever whenever I run out",
        "I have a rough list but often forget things or overbuy",
        "I plan ahead and shop with a list, so I rarely run out or waste food",
      ],
    },
    {
      text: "How would you describe your cleaning routine for your room or bathroom?",
      options: [
        "I only clean when it’s unavoidable",
        "I clean occasionally, but not on any real schedule",
        "I have a routine and keep on top of it regularly",
      ],
    },
    {
      text: "If something small breaks around the house (a loose handle, a flat bike tyre), what do you do?",
      options: [
        "I’d have no idea where to start and would just leave it",
        "I’d try to look it up, but might give up if it got complicated",
        "I’d look it up or fix it myself, or know exactly who to call",
      ],
    },
    {
      text: "Do you meal prep or cook in batches for busier days?",
      options: [
        "Never - I figure out food last minute every day",
        "Sometimes, when I remember or have time",
        "Yes, I regularly prep ahead so busy days are covered",
      ],
    },
    {
      text: "How do you keep track of household essentials like toilet paper or detergent?",
      options: [
        "I only notice when I’ve completely run out",
        "I have a rough sense but still get caught out sometimes",
        "I keep track and restock before I run out",
      ],
    },
    {
      text: "How comfortable are you following a recipe you’ve never tried before?",
      options: [
        "Not comfortable at all - I’d stick to what I know",
        "I’d give it a go but expect to mess it up",
        "Very comfortable - I enjoy trying new recipes",
      ],
    },
  ],
  "money-time": [
    {
      text: "Do you track your spending or follow some kind of budget?",
      options: [
        "Not really, I just spend and hope for the best",
        "I have a rough idea, but nothing written down",
        "Yes, I track it or use a budget regularly",
      ],
    },
    {
      text: "Do you plan your week ahead instead of reacting day to day?",
      options: [
        "Rarely - I mostly just react to whatever comes up",
        "Sometimes, for the busier weeks",
        "Yes, I plan most weeks ahead of time",
      ],
    },
    {
      text: "Do you set aside any savings on a regular basis?",
      options: [
        "No, whatever I have left over just gets spent",
        "Occasionally, when there’s money left over",
        "Yes, I save a set amount regularly",
      ],
    },
    {
      text: "Before making a bigger purchase, do you compare prices or think it over?",
      options: [
        "Not really, I buy on impulse if I want something",
        "Sometimes, if it’s expensive enough",
        "Yes, I usually compare or wait before deciding",
      ],
    },
    {
      text: "Do you know roughly how much you spend on subscriptions each month?",
      options: [
        "No idea - I’ve probably forgotten about some of them",
        "I have a rough idea, but haven’t checked in a while",
        "Yes, I know exactly what I’m subscribed to and paying for",
      ],
    },
    {
      text: "How often do you finish assignments or tasks at the last minute?",
      options: [
        "Almost always - I’m usually racing the deadline",
        "Sometimes, depending on how busy I am",
        "Rarely - I usually finish with time to spare",
      ],
    },
    {
      text: "How well do you balance study or work with your social life?",
      options: [
        "Not well - one usually takes over completely",
        "I manage, but it’s a constant juggling act",
        "Pretty well - I make time for both",
      ],
    },
    {
      text: "Do you have any money set aside for unexpected costs, like a broken phone?",
      options: [
        "No, an unexpected cost would be a real problem",
        "A little, but not really enough to cover much",
        "Yes, I have a small emergency fund set aside",
      ],
    },
  ],
  "people-safety": [
    {
      text: "Do you use a different password for each of your important accounts?",
      options: [
        "No, I mostly reuse the same one or two",
        "Some accounts, but not all of them",
        "Yes, every important account has its own password",
      ],
    },
    {
      text: "If the fire alarm went off in your building right now, would you know exactly what to do?",
      options: [
        "Not really, I’d have to figure it out on the spot",
        "I have a rough idea of the nearest exit",
        "Yes, I know my exits and the assembly point",
      ],
    },
    {
      text: "How careful are you about what personal information you share online?",
      options: [
        "Not very - I don’t really think about it",
        "Somewhat, but I don’t check privacy settings often",
        "Very - I check privacy settings and think before sharing",
      ],
    },
    {
      text: "How confident are you in handling a basic first aid situation, like a cut or a burn?",
      options: [
        "Not confident at all - I wouldn’t know what to do",
        "I know the very basics but would probably panic",
        "Fairly confident - I know the basics and stay calm",
      ],
    },
    {
      text: "Would you recognise a scam or phishing message if you got one?",
      options: [
        "Probably not, I’d likely just click or reply",
        "Maybe, if it was obvious",
        "Yes, I’m confident I’d spot the warning signs",
      ],
    },
    {
      text: "When you go out, do you let someone know where you’re going?",
      options: [
        "Never, no one really knows my plans",
        "Sometimes, if it feels necessary",
        "Usually, someone always has a rough idea",
      ],
    },
    {
      text: "Do you have emergency contacts saved somewhere easy to find?",
      options: [
        "No, I’d have to think hard to remember any numbers",
        "Some, but not somewhere I’d find quickly",
        "Yes, they’re saved and easy for me to reach",
      ],
    },
    {
      text: "How comfortable are you speaking up if you feel unsafe or uncomfortable in a group?",
      options: [
        "Not comfortable at all - I’d probably stay quiet",
        "Somewhat, but it’d take a lot for me to say something",
        "Comfortable - I’d speak up if something felt wrong",
      ],
    },
  ],
  "practice-growth": [
    {
      text: "Do you ever look back at your week to see what went well or badly?",
      options: [
        "Never, one week just blurs into the next",
        "Occasionally, if something went really wrong",
        "Yes, I regularly reflect and adjust",
      ],
    },
    {
      text: "Are you comfortable asking for help when you don’t know something?",
      options: [
        "Not really, I’d rather struggle through alone",
        "Depends who is asking - sometimes it’s awkward",
        "Yes, asking early saves everyone time",
      ],
    },
    {
      text: "Do you set realistic goals for yourself, rather than vague ones?",
      options: [
        "Not really, my goals are usually pretty vague",
        "Sometimes, but I don’t always follow through",
        "Yes, I set clear, realistic goals and check in on them",
      ],
    },
    {
      text: "When you make a mistake, how do you usually respond?",
      options: [
        "I dwell on it and it affects me for a while",
        "I feel bad about it but move on eventually",
        "I try to learn from it and move on fairly quickly",
      ],
    },
    {
      text: "How willing are you to try things outside your comfort zone?",
      options: [
        "Not very - I’d rather stick to what I know",
        "Willing sometimes, if it doesn’t feel too risky",
        "Very willing - I actively look for new things to try",
      ],
    },
    {
      text: "How do you usually take feedback or criticism?",
      options: [
        "Pretty badly - it’s hard not to take it personally",
        "It stings at first, but I come around to it",
        "Well - I try to see it as useful information",
      ],
    },
    {
      text: "Do you follow through on commitments you make to yourself, like a habit or goal?",
      options: [
        "Rarely, they usually fade out after a few days",
        "Sometimes, depending on how motivated I feel",
        "Usually, I try to stick with what I set out to do",
      ],
    },
    {
      text: "Are you able to take breaks or rest without feeling guilty about it?",
      options: [
        "No, I feel guilty resting even when I need it",
        "Somewhat, though it’s not always easy",
        "Yes, I’m comfortable resting when I need to",
      ],
    },
  ],
};

// Home Skills and Practice & Growth link to their section anchor on the
// home page; Money & Time and People & Safety link straight to their own
// module pages, since those already exist as standalone pages.
const CATEGORY_INFO = {
  "home-skills": {
    label: "Home Skills",
    advice: "Cooking and keeping your space in order are the two habits that make everyday life easiest. Start small: pick one simple recipe and one 10-minute tidy-up routine, and repeat them until they're automatic.",
    link: "../index.html#home-skills",
  },
  "money-time": {
    label: "Money & Time",
    advice: "A little planning goes a long way. Try the weekly planner and priority matrix on the Time Management page to see your week laid out before it happens, instead of reacting to it.",
    link: "time-management.html",
  },
  "people-safety": {
    label: "People & Safety",
    advice: "Small habits like unique passwords and knowing your building's fire exits take minutes to set up but matter a lot in the moment. The Online Safety and Emergency Preparedness pages both have quick checklists.",
    link: "online-safety.html",
  },
  "practice-growth": {
    label: "Practice & Growth",
    advice: "Reflecting on your week and being open to asking for help are habits, not personality traits - they get easier the more you practise them. Try writing down one thing that went well and one thing to change, once a week.",
    link: "../index.html#practice-growth",
  },
};

// Cutoffs are written against the original 8-question quiz (24 points
// max), where 13, 19 and 24 points are roughly 54%, 79% and 100%.
// getResultBand() scales those same percentages to whatever the current,
// randomised quiz is actually worth, so the bands stay meaningful
// regardless of how many questions ended up on the page.
const RESULT_BANDS = [
  {
    title: "Just Getting Started",
    summary: "You're at the very beginning of building these habits, and that's a completely normal place to start from. Pick one category below and focus on that first instead of trying to fix everything at once.",
  },
  {
    title: "Building Momentum",
    summary: "You've already got some solid habits in place. A bit more consistency in your weaker category below will take you a long way.",
  },
  {
    title: "Life Ready",
    summary: "You're handling most of these areas well already. Keep an eye on your lowest-scoring category below so it doesn't slip while you're busy with everything else.",
  },
];

// Reapplies the ~54% / ~79% cutoffs from the comment above to this
// quiz's actual point total, rather than hardcoding fixed scores.
function getResultBand(totalScore, totalMax) {
  const lowCutoff = Math.round(totalMax * (13 / 24));
  const midCutoff = Math.round(totalMax * (19 / 24));
  if (totalScore <= lowCutoff) return RESULT_BANDS[0];
  if (totalScore <= midCutoff) return RESULT_BANDS[1];
  return RESULT_BANDS[2];
}

const quizQuestionsContainer = document.getElementById("quiz-questions");
const quizProgressFill = document.getElementById("quiz-progress-fill");
const quizProgressText = document.getElementById("quiz-progress-text");
const quizValidationMessage = document.getElementById("quiz-validation-message");
const quizSubmitBtn = document.getElementById("quiz-submit-btn");
const quizSection = document.getElementById("quiz-section");
const quizResultsSection = document.getElementById("quiz-results");
const quizRetakeBtn = document.getElementById("quiz-retake-btn");

const quizResultTitle = document.getElementById("quiz-result-title");
const quizResultSummary = document.getElementById("quiz-result-summary");
const quizResultsTableBody = document.getElementById("quiz-results-table-body");
const quizAdviceIntro = document.getElementById("quiz-advice-intro");
const quizAdviceList = document.getElementById("quiz-advice-list");

// Reassigned each time the quiz is (re)built; see renderQuizQuestions().
let quizQuestions = [];

// Fisher-Yates shuffle; returns a new array instead of mutating the one
// passed in, so QUESTION_BANK itself is never touched.
function shuffleArray(items) {
  const shuffled = items.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Splits TOTAL_QUESTIONS evenly across the given categories. Written
 * generically so that if TOTAL_QUESTIONS or the category count ever
 * changed to values that don't divide evenly, the leftover questions go
 * to a random subset of categories instead of always the same one.
 * @param {string[]} categories - keys from QUESTION_BANK
 * @returns {Object<string, number>} question count to pick per category
 */
function pickQuestionCountsByCategory(categories) {
  const baseCount = Math.floor(TOTAL_QUESTIONS / categories.length);
  const extraCount = TOTAL_QUESTIONS % categories.length;
  const categoriesWithExtra = new Set(shuffleArray(categories).slice(0, extraCount));

  const counts = {};
  categories.forEach((category) => {
    counts[category] = baseCount + (categoriesWithExtra.has(category) ? 1 : 0);
  });
  return counts;
}

// Picks TOTAL_QUESTIONS questions using the counts above, then shuffles
// the combined list so categories are interleaved instead of appearing
// in four separate blocks.
function pickQuizQuestions() {
  const categories = Object.keys(QUESTION_BANK);
  const countsByCategory = pickQuestionCountsByCategory(categories);
  const picked = [];

  categories.forEach((category) => {
    const shuffledBank = shuffleArray(QUESTION_BANK[category]);
    shuffledBank.slice(0, countsByCategory[category]).forEach((question) => {
      picked.push({ category, text: question.text, options: question.options });
    });
  });

  return shuffleArray(picked);
}

// Reuses the same classes as the original hand-written markup so the
// generated questions look identical to it.
function renderQuizQuestions() {
  const selected = pickQuizQuestions();
  quizQuestionsContainer.innerHTML = "";

  selected.forEach((question, index) => {
    const questionNumber = index + 1;
    const inputName = "q" + questionNumber;

    const questionBlock = document.createElement("div");
    questionBlock.className = "quiz-question bg-white rounded-2xl shadow-sm p-6 mb-4";
    questionBlock.dataset.category = question.category;

    const prompt = document.createElement("p");
    prompt.className = "font-body font-semibold text-base text-[#2f3e46] mb-3";
    prompt.textContent = questionNumber + ". " + question.text;
    questionBlock.appendChild(prompt);

    const optionList = document.createElement("div");
    optionList.className = "flex flex-col gap-2";

    question.options.forEach((optionText, optionIndex) => {
      const label = document.createElement("label");
      label.className = "quiz-option flex items-center gap-2.5 rounded-lg p-4 cursor-pointer";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = inputName;
      // Options are written low-readiness to high-readiness, so their
      // position (1st/2nd/3rd) doubles as the point value.
      input.dataset.points = String(optionIndex + 1);

      const span = document.createElement("span");
      span.className = "font-body text-base text-[#2f3e46]";
      span.textContent = optionText;

      label.appendChild(input);
      label.appendChild(span);
      optionList.appendChild(label);
    });

    questionBlock.appendChild(optionList);
    quizQuestionsContainer.appendChild(questionBlock);
  });

  quizQuestions = document.querySelectorAll(".quiz-question");
}

function updateQuizProgress() {
  const answeredCount = document.querySelectorAll('.quiz-question input[type="radio"]:checked').length;
  const totalQuestions = quizQuestions.length;
  const percent = totalQuestions === 0 ? 0 : Math.round((answeredCount / totalQuestions) * 100);

  quizProgressFill.style.width = percent + "%";
  quizProgressText.textContent = answeredCount + " of " + totalQuestions + " answered";
}

// Uses event delegation (one listener on the shared parent) instead of
// one per radio button, so it still works after the questions are
// rebuilt from scratch on every load and retake.
quizSection.addEventListener("change", (event) => {
  if (event.target.matches('input[type="radio"]')) {
    updateQuizProgress();

    // Clear "selected" from every option in this question before adding
    // it to the one just picked, in case a different option was chosen
    // first.
    const questionBlock = event.target.closest(".quiz-question");
    questionBlock.querySelectorAll(".quiz-option").forEach((option) => option.classList.remove("selected"));
    event.target.closest(".quiz-option").classList.add("selected");
  }
});

quizSubmitBtn.addEventListener("click", () => {
  const hasUnansweredQuestion = Array.from(quizQuestions).some((question) => {
    return question.querySelector('input[type="radio"]:checked') === null;
  });

  if (hasUnansweredQuestion) {
    quizValidationMessage.classList.remove("hidden");
    // Scroll back up so the visitor can see which question they missed,
    // instead of being stuck looking at the error text alone.
    quizSection.scrollIntoView({ behavior: "smooth" });
    return;
  }

  quizValidationMessage.classList.add("hidden");
  showQuizResults();
});

function showQuizResults() {
  // categoryMax is tallied per category (not assumed to be a fixed 12)
  // so scoring still works correctly if TOTAL_QUESTIONS or the category
  // count ever changes to values that don't split evenly.
  const categoryScores = {};
  const categoryMax = {};
  Object.keys(CATEGORY_INFO).forEach((categoryKey) => {
    categoryScores[categoryKey] = 0;
    categoryMax[categoryKey] = 0;
  });

  let totalScore = 0;

  quizQuestions.forEach((question) => {
    const category = question.dataset.category;
    const checkedInput = question.querySelector('input[type="radio"]:checked');
    // dataset values are always strings, so Number() converts the
    // "1"/"2"/"3" into a number that can be added up.
    const points = Number(checkedInput.dataset.points);

    categoryScores[category] += points;
    categoryMax[category] += 3;
    totalScore += points;
  });

  const totalMax = quizQuestions.length * 3;

  renderResultBand(totalScore, totalMax);
  renderCategoryTable(categoryScores, categoryMax);
  renderAdvice(categoryScores);

  // Scrolls to the top of the results so the visitor sees them
  // immediately, instead of landing wherever the page happened to be.
  quizSection.classList.add("hidden");
  quizResultsSection.classList.remove("hidden");
  quizResultsSection.scrollIntoView({ behavior: "smooth" });
}

function renderResultBand(totalScore, totalMax) {
  const band = getResultBand(totalScore, totalMax);
  quizResultTitle.textContent = band.title + " (" + totalScore + "/" + totalMax + ")";
  quizResultSummary.textContent = band.summary;
}

// Inserts one <tr> per category into the results table's <tbody>, which
// starts empty in the HTML.
function renderCategoryTable(categoryScores, categoryMax) {
  // Clear rows from a previous attempt (e.g. after "Retake").
  quizResultsTableBody.innerHTML = "";

  Object.keys(CATEGORY_INFO).forEach((categoryKey) => {
    const row = document.createElement("tr");

    const labelCell = document.createElement("td");
    labelCell.className = "font-body text-base text-[#2f3e46]";
    labelCell.textContent = CATEGORY_INFO[categoryKey].label;

    const scoreCell = document.createElement("td");
    scoreCell.className = "font-body text-base text-[#2f3e46] font-semibold";
    scoreCell.textContent = categoryScores[categoryKey] + " / " + categoryMax[categoryKey];

    row.appendChild(labelCell);
    row.appendChild(scoreCell);
    quizResultsTableBody.appendChild(row);
  });
}

// Finds every category tied for the lowest score (not just the first),
// so if two or more categories end up equally low, each one gets its
// own advice block instead of the rest being silently dropped.
function renderAdvice(categoryScores) {
  const lowestScore = Math.min(...Object.values(categoryScores));
  const weakestCategories = Object.keys(categoryScores).filter(
    (categoryKey) => categoryScores[categoryKey] === lowestScore
  );

  quizAdviceIntro.textContent =
    weakestCategories.length > 1
      ? "You tied for the lowest score across a few areas - here's where to start with each:"
      : "Your lowest-scoring area was " + CATEGORY_INFO[weakestCategories[0]].label + ":";

  quizAdviceList.innerHTML = "";

  weakestCategories.forEach((categoryKey, index) => {
    const info = CATEGORY_INFO[categoryKey];

    const block = document.createElement("div");
    // Top border on every block after the first, so multiple tied
    // categories are visually separated instead of running together.
    block.className = index === 0 ? "" : "pt-4 border-t border-[#f0ece3]";

    const heading = document.createElement("p");
    heading.className = "font-body text-sm font-semibold text-[#2f3e46] mb-1";
    heading.textContent = info.label;

    const text = document.createElement("p");
    text.className = "font-body text-base text-[#5b6b70] leading-relaxed mb-2";
    text.textContent = info.advice;

    const link = document.createElement("a");
    link.className = "font-body text-sm font-semibold text-[#d97757]";
    link.href = info.link;
    link.textContent = "Explore " + info.label + " →";

    block.appendChild(heading);
    block.appendChild(text);
    block.appendChild(link);
    quizAdviceList.appendChild(block);
  });
}

quizRetakeBtn.addEventListener("click", () => {
  renderQuizQuestions();
  updateQuizProgress();
  quizResultsSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  quizSection.scrollIntoView({ behavior: "smooth" });
});

// Renders the initial progress immediately, rather than waiting for the
// first change event.
renderQuizQuestions();
updateQuizProgress();
