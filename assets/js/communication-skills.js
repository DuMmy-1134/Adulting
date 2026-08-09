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
      "scenario-pill-btn inline-block px-4 py-2 rounded-full border-2 text-[13.5px] font-semibold text-left transition-colors";
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
