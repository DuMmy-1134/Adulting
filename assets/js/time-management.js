/*
  Powers 3 features on time-management.html: the weekly planner, the
  Eisenhower priority matrix, and the focus timer. All 3 persist their
  data to localStorage since this site has no backend to save to.
*/

/* 1. Weekly timetable */

const plannerForm = document.getElementById("planner-form");
const plannerTaskInput = document.getElementById("planner-task-input");
const plannerTaskError = document.getElementById("planner-task-error");
const plannerDaySelect = document.getElementById("planner-day-select");
const plannerStartSelect = document.getElementById("planner-start-select");
const plannerDurationSelect = document.getElementById("planner-duration-select");
const plannerCategorySelect = document.getElementById("planner-category-select");
const plannerClashError = document.getElementById("planner-clash-error");
const plannerClearBtn = document.getElementById("planner-clear");
const plannerStatus = document.getElementById("planner-status");
const plannerTbody = document.getElementById("planner-tbody");

// Hour range shown by the timetable: 7 = 7:00 AM, 23 = 11:00 PM (see formatHourLabel).
const PLANNER_START_HOUR = 7;
const PLANNER_END_HOUR = 23;

// Display order of the 7 day columns, matching the <th> order in the HTML.
const PLANNER_DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

// Prefixed with "ltl-" (Level Up Life) so this doesn't clash with another
// tool storing its own data under a plain key like "tasks".
const PLANNER_STORAGE_KEY = "ltl-weekly-timetable-tasks";

// Same 4 categories used on the Life Readiness Quiz and Submit a Tip pages,
// so a task's colour means the same thing everywhere on the site.
const PLANNER_CATEGORIES = {
  "home-skills": { label: "Home Skills", blockClass: "block-home-skills" },
  "money-time": { label: "Money & Time", blockClass: "block-money-time" },
  "people-safety": { label: "People & Safety", blockClass: "block-people-safety" },
  "practice-growth": { label: "Practice & Growth", blockClass: "block-practice-growth" },
};

// Each task in this array looks like:
// { id: 1699999999999, text: "ST0501 lecture", day: "mon",
//   startHour: 9, duration: 2, category: "money-time", done: false }
let plannerTasks = [];

function formatHourLabel(hour) {
  const period = hour < 12 ? "AM" : "PM";
  let displayHour = hour % 12;
  if (displayHour === 0) {
    displayHour = 12; // Both midnight (0) and noon (12) show as "12", not "0".
  }
  return displayHour + ":00 " + period;
}

function formatHourRange(startHour, duration) {
  return formatHourLabel(startHour) + " – " + formatHourLabel(startHour + duration);
}

function loadPlannerTasks() {
  const savedJson = localStorage.getItem(PLANNER_STORAGE_KEY);
  plannerTasks = savedJson ? JSON.parse(savedJson) : [];
}

function savePlannerTasks() {
  localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(plannerTasks));
}

// Two ranges overlap unless one finishes at or before the other starts.
function rangesOverlap(startA, endA, startB, endB) {
  return startA < endB && startB < endA;
}

function hasClash(day, startHour, duration) {
  const proposedEnd = startHour + duration;
  return plannerTasks.some((task) => {
    if (task.day !== day) {
      return false; // Different day - can never clash.
    }
    return rangesOverlap(startHour, proposedEnd, task.startHour, task.startHour + task.duration);
  });
}

// Builds the Start Time <select> from PLANNER_START_HOUR/PLANNER_END_HOUR
// instead of hardcoding the option list in the HTML.
function populateStartTimeOptions() {
  for (let hour = PLANNER_START_HOUR; hour <= PLANNER_END_HOUR; hour++) {
    const option = document.createElement("option");
    option.value = String(hour);
    option.textContent = formatHourLabel(hour);
    plannerStartSelect.appendChild(option);
  }
}

// Disables any Duration option that would run past the end of the
// timetable for the currently chosen start time, instead of silently
// letting a task be created that runs off the edge.
function updateAvailableDurations() {
  const startHour = Number(plannerStartSelect.value);
  const hoursLeft = PLANNER_END_HOUR - startHour;

  Array.from(plannerDurationSelect.options).forEach((option) => {
    const durationValue = Number(option.value);
    option.disabled = durationValue > hoursLeft;
  });

  // If the currently selected duration no longer fits, fall back to the
  // largest one that still does (always at least "1 hour").
  if (Number(plannerDurationSelect.value) > hoursLeft) {
    plannerDurationSelect.value = "1";
  }
}

function createPlannerTaskBlock(task) {
  const categoryInfo = PLANNER_CATEGORIES[task.category];

  const block = document.createElement("div");
  // "planner-task" is the shared layout class; blockClass supplies the category colour.
  block.className = "planner-task " + categoryInfo.blockClass + (task.done ? " done" : "");
  block.dataset.taskId = task.id;

  const info = document.createElement("div");
  info.className = "planner-task-info";

  const text = document.createElement("p");
  text.className = "planner-task-text text-xs font-semibold truncate";
  text.textContent = task.text;

  const time = document.createElement("p");
  time.className = "planner-task-time text-xs";
  time.textContent = formatHourRange(task.startHour, task.duration);

  info.appendChild(text);
  info.appendChild(time);

  const controls = document.createElement("div");
  controls.className = "planner-task-controls";

  const checkboxLabel = document.createElement("label");
  checkboxLabel.className = "flex items-center gap-1.5 cursor-pointer";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.done;
  checkbox.setAttribute("aria-label", "Mark task done");
  // Re-render so the .done strike-through style (styles.css) applies immediately.
  checkbox.addEventListener("change", () => {
    task.done = checkbox.checked;
    savePlannerTasks();
    renderPlannerTimetable();
  });
  checkboxLabel.appendChild(checkbox);

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "icon-btn text-white";
  deleteBtn.setAttribute("aria-label", "Delete task");
  deleteBtn.textContent = "×";
  deleteBtn.addEventListener("click", () => {
    plannerTasks = plannerTasks.filter((t) => t.id !== task.id);
    savePlannerTasks();
    renderPlannerTimetable();
    showPlannerStatus("Task removed.");
  });

  controls.appendChild(checkboxLabel);
  controls.appendChild(deleteBtn);

  block.appendChild(info);
  block.appendChild(controls);
  return block;
}

// Pre-fills the Day/Start Time dropdowns with the clicked slot, as a shortcut
// to hunting through them manually.
function handleEmptySlotClick(day, hour) {
  plannerDaySelect.value = day;
  plannerStartSelect.value = String(hour);
  updateAvailableDurations();
  plannerTaskInput.focus();
}

// Rebuilds the entire <tbody> from scratch on every change, rather than
// patching individual cells, because which cells exist depends on how
// many multi-hour tasks are on the timetable (a 2-hour task means one
// fewer <td> on the row underneath it).
function renderPlannerTimetable() {
  plannerTbody.innerHTML = "";

  // For each day, how many upcoming rows are already covered by an earlier
  // task's rowspan and should not get their own <td>.
  const rowsToSkip = {};
  PLANNER_DAYS.forEach((day) => {
    rowsToSkip[day] = 0;
  });

  for (let hour = PLANNER_START_HOUR; hour <= PLANNER_END_HOUR; hour++) {
    const row = document.createElement("tr");

    const hourLabelCell = document.createElement("td");
    hourLabelCell.className = "planner-hour-label font-body font-bold text-xs uppercase tracking-wide text-[#52796f] bg-[#eef3f1]";
    hourLabelCell.textContent = formatHourLabel(hour);
    row.appendChild(hourLabelCell);

    PLANNER_DAYS.forEach((day) => {
      // Skip drawing a <td> here - an earlier task's rowspan already covers it.
      if (rowsToSkip[day] > 0) {
        rowsToSkip[day] -= 1;
        return;
      }

      const taskHere = plannerTasks.find((task) => task.day === day && task.startHour === hour);

      const cell = document.createElement("td");
      cell.className = "planner-slot";

      if (taskHere) {
        // Clamp so a task can never claim rows past the last hour of the
        // timetable, even if stale/bad stored data suggested it should.
        const rowspan = Math.min(taskHere.duration, PLANNER_END_HOUR - hour);
        cell.rowSpan = rowspan;
        cell.appendChild(createPlannerTaskBlock(taskHere));
        rowsToSkip[day] = rowspan - 1;
      } else {
        cell.addEventListener("click", () => handleEmptySlotClick(day, hour));
      }

      row.appendChild(cell);
    });

    plannerTbody.appendChild(row);
  }
}

if (plannerForm) {
  plannerStartSelect.addEventListener("change", updateAvailableDurations);

  plannerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskText = plannerTaskInput.value.trim();
    const day = plannerDaySelect.value;
    const startHour = Number(plannerStartSelect.value);
    const duration = Number(plannerDurationSelect.value);

    // Both checks run regardless, so an empty task and a clash can each
    // show their own message instead of one masking the other.
    const taskIsEmpty = taskText === "";
    const taskClashes = !taskIsEmpty && hasClash(day, startHour, duration);

    plannerTaskError.classList.toggle("hidden", !taskIsEmpty);
    plannerTaskInput.classList.toggle("has-error", taskIsEmpty);
    plannerClashError.classList.toggle("hidden", !taskClashes);

    if (taskIsEmpty) {
      plannerTaskInput.focus();
      return;
    }
    if (taskClashes) {
      return;
    }

    plannerTasks.push({
      id: Date.now(), // Milliseconds timestamp, unique enough to use as a simple task id.
      text: taskText,
      day: day,
      startHour: startHour,
      duration: duration,
      category: plannerCategorySelect.value,
      done: false,
    });

    savePlannerTasks();
    renderPlannerTimetable();
    showPlannerStatus("Task added to your timetable.");

    // Only the task text is cleared - leaving the other fields as they are
    // makes adding several tasks in a row quicker.
    plannerTaskInput.value = "";
    plannerTaskInput.focus();
  });
}

if (plannerClearBtn) {
  plannerClearBtn.addEventListener("click", () => {
    plannerTasks = [];
    savePlannerTasks();
    renderPlannerTimetable();
    showPlannerStatus("Week cleared.");
  });
}

function showPlannerStatus(message) {
  plannerStatus.textContent = message;
  setTimeout(() => {
    plannerStatus.textContent = "";
  }, 2500); // Confirmation message visible for 2.5 seconds.
}

if (plannerTbody) {
  populateStartTimeOptions();
  updateAvailableDurations();
  loadPlannerTasks();
  renderPlannerTimetable();
}

/* 2. Eisenhower priority matrix */

const priorityForm = document.getElementById("priority-form");
const priorityInput = document.getElementById("priority-input");
const priorityQuadrantSelect = document.getElementById("priority-quadrant");
const priorityError = document.getElementById("priority-error");

// Maps <select> option values to the <ul> that should receive a new task,
// so a 5th quadrant could be added here without touching the rest of the logic.
const quadrantLists = {
  do: document.getElementById("quadrant-do"),
  schedule: document.getElementById("quadrant-schedule"),
  delegate: document.getElementById("quadrant-delegate"),
  delete: document.getElementById("quadrant-delete"),
};

const PRIORITY_STORAGE_KEY = "ltl-priority-tasks";

function createPriorityListItem(taskText) {
  const li = document.createElement("li");
  li.className = "flex items-center justify-between gap-2 bg-[#eef3f1] rounded-md px-3 py-2";

  const span = document.createElement("span");
  span.className = "font-body text-sm text-[#2f3e46]";
  span.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "icon-btn text-[#d97757] font-bold";
  deleteBtn.setAttribute("aria-label", "Delete task");
  deleteBtn.textContent = "×";
  // Re-save after removing so the deletion persists across a refresh.
  deleteBtn.addEventListener("click", () => {
    li.remove();
    savePriorityMatrixToStorage();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  return li;
}

// Saves the whole matrix as one object keyed by quadrant, e.g.
// { do: ["Finish CA2"], schedule: [], delegate: [], delete: ["Tidy desk"] }
function savePriorityMatrixToStorage() {
  const matrixData = {};

  Object.keys(quadrantLists).forEach((quadrantKey) => {
    const listElement = quadrantLists[quadrantKey];
    const tasks = Array.from(listElement.querySelectorAll("span")).map((span) => span.textContent);
    matrixData[quadrantKey] = tasks;
  });

  localStorage.setItem(PRIORITY_STORAGE_KEY, JSON.stringify(matrixData));
}

function loadPriorityMatrixFromStorage() {
  const savedJson = localStorage.getItem(PRIORITY_STORAGE_KEY);
  if (!savedJson) {
    return;
  }
  const matrixData = JSON.parse(savedJson);

  Object.keys(matrixData).forEach((quadrantKey) => {
    const listElement = quadrantLists[quadrantKey];
    if (!listElement) {
      return;
    }
    matrixData[quadrantKey].forEach((taskText) => {
      listElement.appendChild(createPriorityListItem(taskText));
    });
  });
}

if (priorityForm) {
  loadPriorityMatrixFromStorage();

  // Listening for "submit" (not a button click) covers both clicking Add
  // and pressing Enter in the text field.
  priorityForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskText = priorityInput.value.trim();

    if (taskText === "") {
      priorityError.classList.remove("hidden");
      priorityInput.classList.add("has-error");
      priorityInput.focus();
      return;
    }

    priorityError.classList.add("hidden");
    priorityInput.classList.remove("has-error");

    const chosenQuadrant = priorityQuadrantSelect.value;
    const targetList = quadrantLists[chosenQuadrant];
    targetList.appendChild(createPriorityListItem(taskText));

    savePriorityMatrixToStorage();

    priorityForm.reset();
    priorityInput.focus();
  });
}

/* 3. Focus timer (Pomodoro-style countdown) */

const timerDisplay = document.getElementById("timer-display");
const timerToggleBtn = document.getElementById("timer-toggle");
const timerResetBtn = document.getElementById("timer-reset");
const timerLengthSelect = document.getElementById("timer-length");
const timerStatus = document.getElementById("timer-status");

if (timerDisplay) {
  let secondsRemaining = Number(timerLengthSelect.value) * 60;

  // null whenever the timer is not currently running; otherwise the
  // setInterval id, needed to stop it with clearInterval.
  let intervalId = null;

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
  }

  function renderTimer() {
    timerDisplay.textContent = formatTime(secondsRemaining);
  }

  // Runs once per second while the timer is active.
  function tickTimer() {
    secondsRemaining -= 1;
    renderTimer();

    if (secondsRemaining <= 0) {
      stopTimer();
      timerStatus.textContent = "Time's up! Take a short break before your next session.";
    }
  }

  function startTimer() {
    intervalId = setInterval(tickTimer, 1000);
    timerToggleBtn.textContent = "Pause";
    timerStatus.textContent = "Focus time - stay on one task until this rings.";
  }

  function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
    timerToggleBtn.textContent = "Start";
  }

  // One button serves as both Start and Pause, branching on whether
  // intervalId is currently set.
  timerToggleBtn.addEventListener("click", () => {
    if (intervalId === null) {
      startTimer();
    } else {
      stopTimer();
      timerStatus.textContent = "Paused.";
    }
  });

  timerResetBtn.addEventListener("click", () => {
    stopTimer();
    secondsRemaining = Number(timerLengthSelect.value) * 60;
    renderTimer();
    timerStatus.textContent = "";
  });

  // Only update immediately if not running, so changing the dropdown
  // doesn't disrupt an in-progress countdown.
  timerLengthSelect.addEventListener("change", () => {
    if (intervalId === null) {
      secondsRemaining = Number(timerLengthSelect.value) * 60;
      renderTimer();
    }
  });

  renderTimer(); // Show the initial time immediately on page load.
}
