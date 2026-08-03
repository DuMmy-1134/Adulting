/*
  life-readiness-quiz.js
  -----------------------------------------------------------------------
  Runs the Life Readiness Quiz on life-readiness-quiz.html:
    - Updates a progress bar as questions get answered.
    - Validates that all 8 questions are answered before showing results.
    - Adds up the points per category and shows a personalised result,
      a score-by-category table (built with JavaScript), and one piece
      of advice pointing at the category the visitor scored lowest on.
*/

// Every question block on the page shares the class "quiz-question" and
// carries a data-category attribute (e.g. data-category="home-skills"),
// which is how we know which category each question belongs to.
const quizQuestions = document.querySelectorAll(".quiz-question");

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
const quizAdviceText = document.getElementById("quiz-advice-text");
const quizAdviceLink = document.getElementById("quiz-advice-link");

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
    advice: "Reflecting on your week and being open to asking for help are habits, not personality traits — they get easier the more you practise them. Try writing down one thing that went well and one thing to change, once a week.",
    link: "../index.html#practice-growth",
  },
};

// Bands describing the overall result, based on a total score out of 24
// (8 questions x a maximum of 3 points each).
const RESULT_BANDS = [
  {
    minScore: 0,
    maxScore: 13,
    title: "Just Getting Started",
    summary: "You're at the very beginning of building these habits, and that's a completely normal place to start from. Pick one category below and focus on that first instead of trying to fix everything at once.",
  },
  {
    minScore: 14,
    maxScore: 19,
    title: "Building Momentum",
    summary: "You've already got some solid habits in place. A bit more consistency in your weaker category below will take you a long way.",
  },
  {
    minScore: 20,
    maxScore: 24,
    title: "Life Ready",
    summary: "You're handling most of these areas well already. Keep an eye on your lowest-scoring category below so it doesn't slip while you're busy with everything else.",
  },
];

// -------------------------------------------------------------------
// Progress bar: recalculates every time ANY radio button changes.
// -------------------------------------------------------------------

function updateQuizProgress() {
  // "input[type=radio]:checked" selects every radio input on the whole
  // page that is currently selected — one per answered question.
  const answeredCount = document.querySelectorAll('.quiz-question input[type="radio"]:checked').length;
  const totalQuestions = quizQuestions.length;
  const percent = Math.round((answeredCount / totalQuestions) * 100);

  quizProgressFill.style.width = percent + "%";
  quizProgressText.textContent = answeredCount + " of " + totalQuestions + " answered";
}

// Listens for a "change" event anywhere inside the quiz section. This is
// called "event delegation" — instead of adding a listener to all 24
// individual radio buttons, we add ONE listener on their shared parent
// and let the event bubble up to it. Less code, and it still works even
// if questions are added or removed later.
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
  // categoryScores will end up looking like:
  // { "home-skills": 5, "money-time": 4, "people-safety": 6, "practice-growth": 3 }
  const categoryScores = {};
  Object.keys(CATEGORY_INFO).forEach((categoryKey) => {
    categoryScores[categoryKey] = 0;
  });

  let totalScore = 0;

  quizQuestions.forEach((question) => {
    const category = question.dataset.category;
    const checkedInput = question.querySelector('input[type="radio"]:checked');
    // Attributes read from HTML are always text, so Number() converts
    // the "1"/"2"/"3" string into an actual number we can add up.
    const points = Number(checkedInput.dataset.points);

    categoryScores[category] += points;
    totalScore += points;
  });

  renderResultBand(totalScore);
  renderCategoryTable(categoryScores);
  renderAdvice(categoryScores);

  // Swap which section is visible: hide the questions, reveal the
  // results, and scroll up so the visitor sees their result immediately
  // instead of landing in the middle of the page.
  quizSection.classList.add("hidden");
  quizResultsSection.classList.remove("hidden");
  quizResultsSection.scrollIntoView({ behavior: "smooth" });
}

// Picks the matching band from RESULT_BANDS based on the total score,
// and writes its title/summary into the page.
function renderResultBand(totalScore) {
  const band = RESULT_BANDS.find((b) => totalScore >= b.minScore && totalScore <= b.maxScore);
  quizResultTitle.textContent = band.title + " (" + totalScore + "/24)";
  quizResultSummary.textContent = band.summary;
}

// Builds one <tr> per category and inserts them all into the results
// table's <tbody>, which started completely empty in the HTML.
function renderCategoryTable(categoryScores) {
  // Clear out any rows from a previous attempt (e.g. after "Retake").
  quizResultsTableBody.innerHTML = "";

  Object.keys(CATEGORY_INFO).forEach((categoryKey) => {
    const row = document.createElement("tr");

    const labelCell = document.createElement("td");
    labelCell.className = "font-body text-[13.5px] text-[#2f3e46]";
    labelCell.textContent = CATEGORY_INFO[categoryKey].label;

    const scoreCell = document.createElement("td");
    scoreCell.className = "font-body text-[13.5px] text-[#2f3e46] font-semibold";
    scoreCell.textContent = categoryScores[categoryKey] + " / 6";

    row.appendChild(labelCell);
    row.appendChild(scoreCell);
    quizResultsTableBody.appendChild(row);
  });
}

// Finds whichever category has the lowest score and shows its advice
// and link. If there's a tie, the first one found (in the order defined
// in CATEGORY_INFO) is used — good enough for a lightweight quiz like
// this one.
function renderAdvice(categoryScores) {
  let weakestCategory = null;
  let lowestScore = Infinity;

  Object.keys(categoryScores).forEach((categoryKey) => {
    if (categoryScores[categoryKey] < lowestScore) {
      lowestScore = categoryScores[categoryKey];
      weakestCategory = categoryKey;
    }
  });

  const info = CATEGORY_INFO[weakestCategory];
  quizAdviceText.textContent = "Your lowest-scoring area was " + info.label + ". " + info.advice;
  quizAdviceLink.textContent = "Explore " + info.label + " →";
  quizAdviceLink.href = info.link;
}

// -------------------------------------------------------------------
// "Retake the Quiz" button: clears every answer and starts over.
// -------------------------------------------------------------------

quizRetakeBtn.addEventListener("click", () => {
  // Uncheck every radio button on the page so the visitor starts fresh.
  document.querySelectorAll('.quiz-question input[type="radio"]').forEach((input) => {
    input.checked = false;
  });
  document.querySelectorAll(".quiz-option.selected").forEach((option) => {
    option.classList.remove("selected");
  });

  updateQuizProgress();
  quizResultsSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  quizSection.scrollIntoView({ behavior: "smooth" });
});

// Show the correct starting progress ("0 of 8 answered") the moment the
// page loads, rather than waiting for the first change event.
updateQuizProgress();
