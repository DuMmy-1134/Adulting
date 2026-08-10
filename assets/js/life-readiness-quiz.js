/*
  life-readiness-quiz.js
  -----------------------------------------------------------------------
  Runs the Life Readiness Quiz on life-readiness-quiz.html:
    - Picks a random set of questions from a larger question bank (see
      QUESTION_BANK below) every time the page loads or the quiz is
      retaken, so the quiz looks different each attempt.
    - Updates a progress bar as questions get answered.
    - Validates that every question shown is answered before showing
      results.
    - Adds up the points per category and shows a personalised result,
      a score-by-category table (built with JavaScript), and one piece
      of advice pointing at the category the visitor scored lowest on.
*/

// -------------------------------------------------------------------
// Question bank: far more questions exist here than are ever shown at
// once. Each category has 8 candidate questions; every time the quiz
// is built, TOTAL_QUESTIONS of them are picked at random, spread
// equally across the 4 categories (16 / 4 = 4 questions each), and the
// rest stay hidden in the bank for next time. Hidden questions are
// never added to the page, so they never factor into the progress bar,
// the score, or the result bands below - every calculation only ever
// looks at the questions actually shown. Options are always ordered
// low-readiness to high-readiness - the option's position (1st, 2nd,
// 3rd) becomes its point value, exactly like the original hand-written
// questions did with data-points.
// -------------------------------------------------------------------

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

// One entry per category: a friendly display name, the advice text shown
// if that category turns out to be the visitor's weakest, and a link to
// somewhere on the site that helps with it. Home Skills and Practice &
// Growth link to their section on the home page (using the id="..."
// anchors that already exist there); Money & Time and People & Safety
// link straight to the matching module pages since those already exist.
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

// Bands describing the overall result. Written against the original
// 8-question quiz (24 points max: 13, 19 and 24 are roughly 54%, 79%
// and 100% of that). getResultBand() below scales those same
// percentages to however many points the current, randomised quiz is
// actually worth, so the bands stay meaningful no matter how many
// questions ended up on the page.
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

function getResultBand(totalScore, totalMax) {
  const lowCutoff = Math.round(totalMax * (13 / 24));
  const midCutoff = Math.round(totalMax * (19 / 24));
  if (totalScore <= lowCutoff) return RESULT_BANDS[0];
  if (totalScore <= midCutoff) return RESULT_BANDS[1];
  return RESULT_BANDS[2];
}

// -------------------------------------------------------------------
// Element references that don't change once the page has loaded.
// -------------------------------------------------------------------

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

// Re-assigned every time the quiz is (re)built - see renderQuizQuestions().
let quizQuestions = [];

// -------------------------------------------------------------------
// Randomising and building the quiz
// -------------------------------------------------------------------

// Fisher-Yates shuffle. Returns a new shuffled array instead of mutating
// the one passed in, so QUESTION_BANK itself is never touched.
function shuffleArray(items) {
  const shuffled = items.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Splits TOTAL_QUESTIONS evenly across the categories in QUESTION_BANK
// (16 questions / 4 categories = 4 each). Written generically - if
// TOTAL_QUESTIONS or the number of categories ever changed to values
// that don't divide evenly, the leftover questions would be handed out
// to a random subset of categories instead of always the same one.
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

// Picks the random questions for one attempt of the quiz - exactly
// TOTAL_QUESTIONS of them, pulled from QUESTION_BANK using the counts
// above - then shuffles the combined list so the categories are
// interleaved instead of appearing in four separate blocks.
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

// Builds the actual .quiz-question DOM, using the exact same classes as
// the original hand-written HTML so it looks identical on the page.
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

// -------------------------------------------------------------------
// Progress bar: recalculates every time ANY radio button changes.
// -------------------------------------------------------------------

function updateQuizProgress() {
  // "input[type=radio]:checked" selects every radio input on the whole
  // page that is currently selected - one per answered question.
  const answeredCount = document.querySelectorAll('.quiz-question input[type="radio"]:checked').length;
  const totalQuestions = quizQuestions.length;
  const percent = totalQuestions === 0 ? 0 : Math.round((answeredCount / totalQuestions) * 100);

  quizProgressFill.style.width = percent + "%";
  quizProgressText.textContent = answeredCount + " of " + totalQuestions + " answered";
}

// Listens for a "change" event anywhere inside the quiz section. This is
// called "event delegation" - instead of adding a listener to every
// individual radio button, we add ONE listener on their shared parent
// and let the event bubble up to it. Less code, and it still works even
// though the questions themselves are rebuilt from scratch on every
// load and retake.
quizSection.addEventListener("change", (event) => {
  if (event.target.matches('input[type="radio"]')) {
    updateQuizProgress();

    // Also visually mark the chosen answer card. First remove "selected"
    // from every option in this question (in case a different option was
    // chosen before), then add it to the one that was just picked.
    const questionBlock = event.target.closest(".quiz-question");
    questionBlock.querySelectorAll(".quiz-option").forEach((option) => option.classList.remove("selected"));
    event.target.closest(".quiz-option").classList.add("selected");
  }
});

// -------------------------------------------------------------------
// "See My Results" button: validate, then calculate and display results.
// -------------------------------------------------------------------

quizSubmitBtn.addEventListener("click", () => {
  // some() checks each question and stops as soon as it finds one with
  // no checked radio inside it, returning true if any are unanswered.
  const hasUnansweredQuestion = Array.from(quizQuestions).some((question) => {
    return question.querySelector('input[type="radio"]:checked') === null;
  });

  if (hasUnansweredQuestion) {
    quizValidationMessage.classList.remove("hidden");
    // Bring the visitor's attention back up to the questions instead of
    // leaving them stuck looking at an error message with no clue where
    // the unanswered question actually is.
    quizSection.scrollIntoView({ behavior: "smooth" });
    return;
  }

  quizValidationMessage.classList.add("hidden");
  showQuizResults();
});

function showQuizResults() {
  // categoryScores/categoryMax end up looking like:
  // { "home-skills": 9, "money-time": 7, "people-safety": 11, "practice-growth": 6 }
  // { "home-skills": 12, "money-time": 12, "people-safety": 12, "practice-growth": 12 }
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
    // Attributes read from HTML are always text, so Number() converts
    // the "1"/"2"/"3" string into an actual number we can add up.
    const points = Number(checkedInput.dataset.points);

    categoryScores[category] += points;
    categoryMax[category] += 3;
    totalScore += points;
  });

  const totalMax = quizQuestions.length * 3;

  renderResultBand(totalScore, totalMax);
  renderCategoryTable(categoryScores, categoryMax);
  renderAdvice(categoryScores);

  // Swap which section is visible: hide the questions, reveal the
  // results, and scroll up so the visitor sees their result immediately
  // instead of landing in the middle of the page.
  quizSection.classList.add("hidden");
  quizResultsSection.classList.remove("hidden");
  quizResultsSection.scrollIntoView({ behavior: "smooth" });
}

// Picks the matching band based on the total score (scaled to however
// many points this particular quiz was worth) and writes its
// title/summary into the page.
function renderResultBand(totalScore, totalMax) {
  const band = getResultBand(totalScore, totalMax);
  quizResultTitle.textContent = band.title + " (" + totalScore + "/" + totalMax + ")";
  quizResultSummary.textContent = band.summary;
}

// Builds one <tr> per category and inserts them all into the results
// table's <tbody>, which started completely empty in the HTML.
function renderCategoryTable(categoryScores, categoryMax) {
  // Clear out any rows from a previous attempt (e.g. after "Retake").
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

// Finds every category tied for the lowest score - not just the first
// one - and shows advice and a link for each of them. Most attempts
// only have one weakest category, but if two or more categories come
// out equally low, all of them get a block instead of silently
// dropping the rest.
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
    // Every block after the first gets a top border to visually separate
    // it from the one before, instead of the advice blocks running
    // straight into each other with no divider.
    block.className = index === 0 ? "" : "pt-4 border-t border-[#f0ece3]";

    const heading = document.createElement("p");
    heading.className = "font-body text-[14.5px] font-semibold text-[#2f3e46] mb-1";
    heading.textContent = info.label;

    const text = document.createElement("p");
    text.className = "font-body text-base text-[#5b6b70] leading-relaxed mb-2";
    text.textContent = info.advice;

    const link = document.createElement("a");
    link.className = "font-body text-[13.5px] font-semibold text-[#d97757]";
    link.href = info.link;
    link.textContent = "Explore " + info.label + " →";

    block.appendChild(heading);
    block.appendChild(text);
    block.appendChild(link);
    quizAdviceList.appendChild(block);
  });
}

// -------------------------------------------------------------------
// "Retake the Quiz" button: builds a fresh, freshly-shuffled set of
// questions and starts over.
// -------------------------------------------------------------------

quizRetakeBtn.addEventListener("click", () => {
  renderQuizQuestions();
  updateQuizProgress();
  quizResultsSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  quizSection.scrollIntoView({ behavior: "smooth" });
});

// Build the first random set of questions and show the correct starting
// progress the moment the page loads, rather than waiting for the first
// change event.
renderQuizQuestions();
updateQuizProgress();
