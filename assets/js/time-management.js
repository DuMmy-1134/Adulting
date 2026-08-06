/*
  time-management.js
  -----------------------------------------------------------------------
  Powers 3 separate features on time-management.html:
    1. The weekly planner calendar (add / tick off / delete tasks).
    2. The Eisenhower priority matrix (add a task into one of 4 boxes).
    3. The focus timer (a simple Pomodoro-style countdown).

  All 3 features save their data with localStorage, which is a small
  built-in browser "notebook" that keeps information even after the
  visitor closes the tab or restarts their computer. There is no
  server/database here so it lets the planner feel "saved" between visits.
*/

/* 
   1. WEEKLY TIMETABLE
    */

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

// The timetable covers 8:00 AM up to (but not including) 10:00 PM, in
// 1-hour rows — 14 rows in total, the same kind of range a real class
// timetable would use.
const PLANNER_START_HOUR = 7;
const PLANNER_END_HOUR = 23;

// The 7 day columns, in display order, matching the <th> order in the HTML.
const PLANNER_DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

// The key used to store the timetable's tasks inside localStorage. Using
// a prefix like "ltl-" (Level Up Life) avoids clashing with other tools
// that might store their own data under a plain name like "tasks".
const PLANNER_STORAGE_KEY = "ltl-weekly-timetable-tasks";

// Same 4 categories used on the Life Readiness Quiz and Submit a Tip
// pages, so a task's colour means the same thing everywhere on the
// site. blockClass picks one of the 4 solid ".block-*" colours defined
// in styles.css, the same way a real timetable colours each class block
// by subject.
const PLANNER_CATEGORIES = {
  "home-skills": { label: "Home Skills", blockClass: "block-home-skills" },
  "money-time": { label: "Money & Time", blockClass: "block-money-time" },
  "people-safety": { label: "People & Safety", blockClass: "block-people-safety" },
  "practice-growth": { label: "Practice & Growth", blockClass: "block-practice-growth" },
};

// Every task the visitor has added lives in this one array in memory
// while the page is open. Each task looks like:
// { id: 1699999999999, text: "ST0501 lecture", day: "mon",
//   startHour: 9, duration: 2, category: "money-time", done: false }
let plannerTasks = [];

// --- Small time-formatting helpers ---

// Turns a 24-hour number like 13 into a 12-hour clock label like "1:00 PM".
function formatHourLabel(hour) {
  const period = hour < 12 ? "AM" : "PM";
  let displayHour = hour % 12;
  if (displayHour === 0) {
    displayHour = 12; // Both midnight (0) and noon (12) show as "12", not "0".
  }
  return displayHour + ":00 " + period;
}

// Builds the "8:00 AM – 10:00 AM" style caption shown inside a task block.
function formatHourRange(startHour, duration) {
  return formatHourLabel(startHour) + " – " + formatHourLabel(startHour + duration);
}

// ---- Loading / saving ----

function loadPlannerTasks() {
  const savedJson = localStorage.getItem(PLANNER_STORAGE_KEY);
  plannerTasks = savedJson ? JSON.parse(savedJson) : [];
}

function savePlannerTasks() {
  localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(plannerTasks));
}

// ---- Clash checking ----

// Two time ranges overlap unless one of them finishes at or before the
// other one starts. This is the standard way to check whether 2 time
// ranges clash, the same idea a real class-timetable system uses to stop
// you enrolling in 2 clashing classes.
function rangesOverlap(startA, endA, startB, endB) {
  return startA < endB && startB < endA;
}

// Checks the proposed day/start/duration against every task already on
// the timetable for that same day. Returns true if it would clash with
// an existing task.
function hasClash(day, startHour, duration) {
  const proposedEnd = startHour + duration;
  return plannerTasks.some((task) => {
    if (task.day !== day) {
      return false; // Different day — can never clash.
    }
    return rangesOverlap(startHour, proposedEnd, task.startHour, task.startHour + task.duration);
  });
}

// ---- Building the Start Time dropdown ----

// Fills the Start Time <select> with one option per hour of the
// timetable, so it always matches PLANNER_START_HOUR/PLANNER_END_HOUR
// above instead of being typed out by hand in the HTML.
function populateStartTimeOptions() {
  for (let hour = PLANNER_START_HOUR; hour <= PLANNER_END_HOUR; hour++) {
    const option = document.createElement("option");
    option.value = String(hour);
    option.textContent = formatHourLabel(hour);
    plannerStartSelect.appendChild(option);
  }
}

// Whenever the chosen start time changes, some Duration options might no
// longer fit before the timetable's last row (e.g. picking 9:00 PM
// leaves room for only a 1-hour task). This disables (greys out) any
// Duration option that would run past the end of the timetable, instead
// of silently letting the visitor create a task that runs off the edge.
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

// ---- Rendering ----

// Builds one solid-colour task block, complete with its own tick
// checkbox, the time range it covers, and a delete (x) button.
function createPlannerTaskBlock(task) {
  const categoryInfo = PLANNER_CATEGORIES[task.category];

  const block = document.createElement("div");
  // planner-task supplies the shared block layout (it fills the whole
  // cell/rowspan); the category's blockClass supplies its solid colour.
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
  // Ticking the box flips this one task's "done" state, re-saves, and
  // re-renders so the strike-through style (see .done in styles.css)
  // shows up immediately.
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
    // Keep every task EXCEPT the one whose id matches this block's task,
    // which removes just this one task from the array.
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

// Clicking an empty slot is a shortcut: it pre-fills the Day/Start Time
// dropdowns above with that exact slot, instead of making the visitor
// hunt through the dropdowns themselves.
function handleEmptySlotClick(day, hour) {
  plannerDaySelect.value = day;
  plannerStartSelect.value = String(hour);
  updateAvailableDurations();
  plannerTaskInput.focus();
}

// Rebuilds the ENTIRE <tbody>, one hour at a time, from scratch. This is
// simpler and much less error-prone than trying to patch individual
// cells, because which cells even exist changes depending on how many
// multi-hour tasks are currently on the timetable (a 2-hour task means
// one fewer <td> gets drawn on the row underneath it).
function renderPlannerTimetable() {
  plannerTbody.innerHTML = "";

  // Tracks, for each day, how many more rows still need to be SKIPPED
  // because an earlier row's task is still "covering" them with its
  // rowspan. Starts at 0 for every day (nothing covered yet).
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
      // This day's column still has rows left to skip from an earlier
      // multi-hour task, so don't draw a <td> here at all — the table's
      // own rowspan is already covering this row for that column.
      if (rowsToSkip[day] > 0) {
        rowsToSkip[day] -= 1;
        return;
      }

      const taskHere = plannerTasks.find((task) => task.day === day && task.startHour === hour);

      const cell = document.createElement("td");
      cell.className = "planner-slot";

      if (taskHere) {
        // Clamp so a task can never claim rows past the last hour of
        // the timetable, even if old/bad data somehow suggested it should.
        const rowspan = Math.min(taskHere.duration, PLANNER_END_HOUR - hour);
        cell.rowSpan = rowspan;
        cell.appendChild(createPlannerTaskBlock(taskHere));
        rowsToSkip[day] = rowspan - 1; // Skip the rows this task already covers.
      } else {
        cell.addEventListener("click", () => handleEmptySlotClick(day, hour));
      }

      row.appendChild(cell);
    });

    plannerTbody.appendChild(row);
  }
}

// ---- Adding a task ----

if (plannerForm) {
  plannerStartSelect.addEventListener("change", updateAvailableDurations);

  plannerForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Stop the page from reloading.

    const taskText = plannerTaskInput.value.trim();
    const day = plannerDaySelect.value;
    const startHour = Number(plannerStartSelect.value);
    const duration = Number(plannerDurationSelect.value);

    // Run both checks so an empty task AND a clash can each show their
    // own specific message instead of one hiding the other.
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
      // Date.now() gives the current time in milliseconds, which is
      // unique enough to use as a simple id for telling tasks apart.
      id: Date.now(),
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

    // Only clear the task text — leave Day/Start Time/Duration/Category
    // as they are, so adding several tasks in a row is quick.
    plannerTaskInput.value = "";
    plannerTaskInput.focus();
  });
}

// ---- Clearing the whole week ----

if (plannerClearBtn) {
  plannerClearBtn.addEventListener("click", () => {
    plannerTasks = [];
    savePlannerTasks();
    renderPlannerTimetable();
    showPlannerStatus("Week cleared.");
  });
}

// Shows a short confirmation message next to the buttons, then makes it
// disappear again after 2.5 seconds using setTimeout (a timer that runs
// a function once, after the given number of milliseconds).
function showPlannerStatus(message) {
  plannerStatus.textContent = message;
  setTimeout(() => {
    plannerStatus.textContent = "";
  }, 2500);
}

// Set everything up as soon as this script runs: build the Start Time
// dropdown, load any previously saved tasks, and draw the timetable.
if (plannerTbody) {
  populateStartTimeOptions();
  updateAvailableDurations();
  loadPlannerTasks();
  renderPlannerTimetable();
}

/* 
   2. EISENHOWER PRIORITY MATRIX
    */

const priorityForm = document.getElementById("priority-form");
const priorityInput = document.getElementById("priority-input");
const priorityQuadrantSelect = document.getElementById("priority-quadrant");
const priorityError = document.getElementById("priority-error");

// Maps the <select> option values to the <ul> element that should
// receive a new task. Keeping this in one object makes it easy to add
// a 5th quadrant later without touching the rest of the logic.
const quadrantLists = {
  do: document.getElementById("quadrant-do"),
  schedule: document.getElementById("quadrant-schedule"),
  delegate: document.getElementById("quadrant-delegate"),
  delete: document.getElementById("quadrant-delete"),
};

const PRIORITY_STORAGE_KEY = "ltl-priority-tasks";

// Builds one <li> for a task, complete with its own delete ("x") button,
// and returns it so the caller can decide which list to put it in.
function createPriorityListItem(taskText) {
  const li = document.createElement("li");
  li.className = "flex items-center justify-between gap-2 bg-[#eef3f1] rounded-md px-3 py-2";

  const span = document.createElement("span");
  span.className = "font-body text-[13.5px] text-[#2f3e46]";
  span.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "icon-btn text-[#d97757] font-bold";
  deleteBtn.setAttribute("aria-label", "Delete task");
  deleteBtn.textContent = "×";
  // Clicking the x removes just this one <li> from the page, then
  // re-saves the matrix so the deletion "sticks" after a refresh.
  deleteBtn.addEventListener("click", () => {
    li.remove();
    savePriorityMatrixToStorage();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  return li;
}

// Walks every quadrant's <ul>, collects the task text left inside it,
// and saves the whole matrix as one object, e.g.
// { do: ["Finish CA2"], schedule: [], delegate: [], delete: ["Tidy desk"] }
function savePriorityMatrixToStorage() {
  const matrixData = {};

  Object.keys(quadrantLists).forEach((quadrantKey) => {
    const listElement = quadrantLists[quadrantKey];
    // Array.from() converts the list of <li> elements (a NodeList) into
    // a real array so we can use .map() on it.
    const tasks = Array.from(listElement.querySelectorAll("span")).map((span) => span.textContent);
    matrixData[quadrantKey] = tasks;
  });

  localStorage.setItem(PRIORITY_STORAGE_KEY, JSON.stringify(matrixData));
}

// Restores the matrix from localStorage when the page is opened again.
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

  // "submit" fires when the button is pressed OR when Enter is pressed
  // while inside the text field — using the form's submit event instead
  // of just a button click covers both cases automatically.
  priorityForm.addEventListener("submit", (event) => {
    // Forms normally reload the page when submitted; preventDefault()
    // stops that so we can handle everything with JavaScript instead.
    event.preventDefault();

    const taskText = priorityInput.value.trim();

    // Validation: a task must not be empty. If it is, show the error
    // message and highlight the field instead of silently doing nothing.
    if (taskText === "") {
      priorityError.classList.remove("hidden");
      priorityInput.classList.add("has-error");
      priorityInput.focus();
      return; // Stop here — do not add an empty task.
    }

    // Input was valid: clear any previous error state first.
    priorityError.classList.add("hidden");
    priorityInput.classList.remove("has-error");

    const chosenQuadrant = priorityQuadrantSelect.value;
    const targetList = quadrantLists[chosenQuadrant];
    targetList.appendChild(createPriorityListItem(taskText));

    savePriorityMatrixToStorage();

    // Reset the form so the visitor can immediately type their next task.
    priorityForm.reset();
    priorityInput.focus();
  });
}

/* 
   3. FOCUS TIMER (Pomodoro-style countdown)
    */

const timerDisplay = document.getElementById("timer-display");
const timerToggleBtn = document.getElementById("timer-toggle");
const timerResetBtn = document.getElementById("timer-reset");
const timerLengthSelect = document.getElementById("timer-length");
const timerStatus = document.getElementById("timer-status");

if (timerDisplay) {
  // secondsRemaining counts down to 0. It starts at 25 minutes worth of
  // seconds because the <select> defaults to its first option, "25".
  let secondsRemaining = Number(timerLengthSelect.value) * 60;

  // intervalId stores the ID returned by setInterval so we can later
  // stop it with clearInterval. It is null whenever the timer is not
  // currently running.
  let intervalId = null;

  // Turns a raw number of seconds into a "MM:SS" string, e.g. 65 -> "01:05".
  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    // padStart(2, "0") adds a leading zero so we always get 2 digits,
    // e.g. "5" becomes "05".
    return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
  }

  function renderTimer() {
    timerDisplay.textContent = formatTime(secondsRemaining);
  }

  // Called once per second while the timer is running.
  function tickTimer() {
    secondsRemaining -= 1;
    renderTimer();

    if (secondsRemaining <= 0) {
      // Time's up: stop the interval so tickTimer() is not called again,
      // and reset the button/state back to "not running".
      stopTimer();
      timerStatus.textContent = "Time's up! Take a short break before your next session.";
    }
  }

  function startTimer() {
    // setInterval repeatedly calls tickTimer every 1000 milliseconds
    // (1 second) until we stop it with clearInterval.
    intervalId = setInterval(tickTimer, 1000);
    timerToggleBtn.textContent = "Pause";
    timerStatus.textContent = "Focus time — stay on one task until this rings.";
  }

  function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
    timerToggleBtn.textContent = "Start";
  }

  // Start/Pause is a single button that checks whether a timer is
  // currently running (intervalId is not null) to decide what to do.
  timerToggleBtn.addEventListener("click", () => {
    if (intervalId === null) {
      startTimer();
    } else {
      stopTimer();
      timerStatus.textContent = "Paused.";
    }
  });

  // Reset always stops any running timer and puts the countdown back to
  // whatever length is currently selected in the dropdown.
  timerResetBtn.addEventListener("click", () => {
    stopTimer();
    secondsRemaining = Number(timerLengthSelect.value) * 60;
    renderTimer();
    timerStatus.textContent = "";
  });

  // If the visitor changes the length while the timer is paused/stopped,
  // update the countdown immediately to match the new choice.
  timerLengthSelect.addEventListener("change", () => {
    if (intervalId === null) {
      secondsRemaining = Number(timerLengthSelect.value) * 60;
      renderTimer();
    }
  });

  renderTimer(); // Show "25:00" (or whichever length is selected) immediately on page load.
}
