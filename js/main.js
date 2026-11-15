/* ==========================================================
   Student Portfolio — shared JavaScript (used by every page)
   1. Mobile menu   2. Footer year   3. Contact form checks
   4. Study planner (saved in the browser with localStorage)
   5. Light / dark mode toggle
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {
  setupThemeToggle();
  setupMobileMenu();
  setFooterYear();
  setupContactForm();
  setupPlanner();
});

/* ---------- 1. Mobile menu ---------- */
function setupMobileMenu() {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  function setMenu(open) {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.innerHTML = open ? "&#10005;" : "&#9776;"; // ✕ when open, ☰ when closed
  }

  toggle.addEventListener("click", function (event) {
    event.stopPropagation();
    setMenu(!links.classList.contains("open"));
  });

  // Close the menu when a link is tapped, when tapping outside it, or on Escape
  links.addEventListener("click", function (event) {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("click", function (event) {
    if (!links.contains(event.target)) setMenu(false);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenu(false);
  });
}

/* ---------- 2. Footer year ---------- */
function setFooterYear() {
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

/* ---------- 3. Contact form validation ---------- */
function setupContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return; // only runs on contact.html

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var message = document.getElementById("message");
    var valid = true;

    // Rule 1: no field may be empty (checked for every field in this array)
    var fields = [name, email, phone, message];
    fields.forEach(function (field) {
      if (field.value.trim() === "") {
        showError(field, "This field is required.");
        valid = false;
      } else {
        clearError(field);
      }
    });

    // Rule 2: email must look like name@example.com
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() !== "" && !emailPattern.test(email.value.trim())) {
      showError(email, "Please enter a valid email address.");
      valid = false;
    }

    // Rule 3: phone number may contain digits only
    var digitsOnly = /^[0-9]+$/;
    if (phone.value.trim() !== "" && !digitsOnly.test(phone.value.trim())) {
      showError(phone, "Phone number must contain digits only (0-9).");
      valid = false;
    }

    if (valid) {
      document.getElementById("form-success").classList.remove("hidden");
      form.reset();
    }
  });
}

function showError(input, text) {
  input.classList.add("invalid");
  document.getElementById(input.id + "-error").textContent = text;
}

function clearError(input) {
  input.classList.remove("invalid");
  document.getElementById(input.id + "-error").textContent = "";
}

/* ---------- 4. Study planner ---------- */
var STORAGE_KEY = "studyPlannerTasks";

function setupPlanner() {
  var form = document.getElementById("planner-form");
  if (!form) return; // only runs on planner.html

  var tasks = loadTasks();
  renderTasks(tasks);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var title = document.getElementById("task-title");
    var course = document.getElementById("task-course");
    var due = document.getElementById("task-due");
    var priority = document.getElementById("task-priority");

    if (title.value.trim() === "") {
      showError(title, "Please describe the task.");
      return;
    }
    clearError(title);

    tasks.push({
      id: Date.now(),
      title: title.value.trim(),
      course: course.value.trim() || "General",
      due: due.value,
      priority: priority.value,
      done: false
    });

    saveTasks(tasks);
    renderTasks(tasks);
    form.reset();
  });

  document.getElementById("task-list").addEventListener("click", function (event) {
    var item = event.target.closest(".task");
    if (!item) return;
    var id = Number(item.dataset.id);

    if (event.target.matches(".task-delete")) {
      tasks = tasks.filter(function (t) { return t.id !== id; });
    } else if (event.target.matches("input[type='checkbox']")) {
      tasks.forEach(function (t) { if (t.id === id) t.done = event.target.checked; });
    } else {
      return;
    }
    saveTasks(tasks);
    renderTasks(tasks);
  });

  document.getElementById("clear-done").addEventListener("click", function () {
    tasks = tasks.filter(function (t) { return !t.done; });
    saveTasks(tasks);
    renderTasks(tasks);
  });
}

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    /* storage unavailable — the planner still works until the page is closed */
  }
}

function renderTasks(tasks) {
  var list = document.getElementById("task-list");
  list.innerHTML = "";

  // Sort: unfinished first, then by due date
  var sorted = tasks.slice().sort(function (a, b) {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return (a.due || "9999").localeCompare(b.due || "9999");
  });

  sorted.forEach(function (task) {
    var li = document.createElement("li");
    li.className = "task priority-" + task.priority + (task.done ? " done" : "");
    li.dataset.id = task.id;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", "Mark " + task.title + " as done");

    var info = document.createElement("div");
    info.className = "task-info";
    var title = document.createElement("div");
    title.className = "task-title";
    title.textContent = task.title;
    var meta = document.createElement("small");
    meta.textContent = task.course + " · " +
      (task.due ? "Due " + task.due : "No due date") + " · " + task.priority + " priority";
    info.appendChild(title);
    info.appendChild(meta);

    var del = document.createElement("button");
    del.className = "task-delete";
    del.setAttribute("aria-label", "Delete " + task.title);
    del.textContent = "×";

    li.appendChild(checkbox);
    li.appendChild(info);
    li.appendChild(del);
    list.appendChild(li);
  });

  var doneCount = tasks.filter(function (t) { return t.done; }).length;
  document.getElementById("stat-total").textContent = tasks.length;
  document.getElementById("stat-done").textContent = doneCount;
  document.getElementById("stat-left").textContent = tasks.length - doneCount;
  document.getElementById("empty-state").classList.toggle("hidden", tasks.length > 0);
}

/* ---------- 5. Light / dark mode toggle ---------- */
function setupThemeToggle() {
  var button = document.querySelector(".theme-toggle");
  if (!button) return;
  var root = document.documentElement;

  // The theme on screen: the one the visitor picked, otherwise their device setting
  function currentTheme() {
    var picked = root.getAttribute("data-theme");
    if (picked) return picked;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  // Show a moon in light mode (click for dark) and a sun in dark mode (click for light)
  function updateButton() {
    var dark = currentTheme() === "dark";
    button.innerHTML = dark ? "&#9728;&#65039;" : "&#127769;";
    button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }

  button.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* storage unavailable — the theme still changes for this page */
    }
    updateButton();
  });

  updateButton();
}
