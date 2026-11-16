
console.log("----- Day 17: Task Manager -----");

// ===================================
// 1. SELECT HTML ELEMENTS
// ===================================

const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");
const emptyMessage = document.querySelector("#empty-message");
const filterButtons = document.querySelectorAll(".filter-btn");

// ===================================
// 2. LOCAL STORAGE SETTINGS
// ===================================

const STORAGE_KEY = "day17-task-manager-tasks";

// NEW: Read saved tasks from the browser.
function loadTasks() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    // No saved tasks yet.
    if (savedData === null) {
      return [];
    }

    // Convert JSON text back into JavaScript data.
    const parsedTasks = JSON.parse(savedData);

    // Saved data must be an array.
    if (!Array.isArray(parsedTasks)) {
      console.warn("Saved tasks are not an array.");
      return [];
    }

    // Ignore invalid saved task objects.
    const validTasks = parsedTasks.filter(function(task) {
      return (
        task !== null &&
        typeof task === "object" &&
        typeof task.id === "string" &&
        typeof task.text === "string" &&
        task.text.trim().length > 0 &&
        task.text.length <= 100 &&
        typeof task.completed === "boolean" &&
        typeof task.createdAt === "string"
      );
    });

    console.log("Tasks loaded:", validTasks.length);

    return validTasks;

  } catch (error) {
    console.warn("Could not load saved tasks:", error);

    // Keep the app running if storage is corrupted.
    return [];
  }
}

// NEW: Save tasks to the browser.
function saveTasks() {
  try {
    const tasksJSON = JSON.stringify(tasks);

    localStorage.setItem(STORAGE_KEY, tasksJSON);

    console.log("Tasks saved successfully!");

  } catch (error) {
    console.warn("Could not save tasks:", error);
  }
}

// ===================================
// 3. APPLICATION STATE
// ===================================

// NEW: Start with saved tasks instead of an empty array.
let tasks = loadTasks();

let currentFilter = "all";

// ===================================
// 4. ADD A TASK
// ===================================

function addTask(taskText) {
  const newTask = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    text: taskText,
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);

  // NEW: Save every added task.
  saveTasks();

  renderTasks();
}

// ===================================
// 5. GET FILTERED TASKS
// ===================================

function getFilteredTasks() {
  if (currentFilter === "active") {
    return tasks.filter(function(task) {
      return !task.completed;
    });
  }

  if (currentFilter === "completed") {
    return tasks.filter(function(task) {
      return task.completed;
    });
  }

  return tasks;
}

// ===================================
// 6. RENDER TASKS
// ===================================

function renderTasks() {
  taskList.replaceChildren();

  const visibleTasks = getFilteredTasks();

  visibleTasks.forEach(function(task) {
    // Create task item.
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    if (task.completed) {
      listItem.classList.add("completed");
    }

    // Create main task area.
    const taskMain = document.createElement("label");
    taskMain.className = "task-main";

    // Checkbox.
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.dataset.taskId = task.id;

    // Task text.
    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    taskMain.append(checkbox, taskText);

    // Action buttons.
    const taskActions = document.createElement("div");
    taskActions.className = "task-actions";

    // Edit button.
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "edit-btn";
    editButton.textContent = "Edit";
    editButton.dataset.taskId = task.id;

    editButton.setAttribute(
      "aria-label",
      `Edit task: ${task.text}`
    );

    // Delete button.
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.taskId = task.id;

    deleteButton.setAttribute(
      "aria-label",
      `Delete task: ${task.text}`
    );

    taskActions.append(editButton, deleteButton);

    listItem.append(taskMain, taskActions);

    taskList.append(listItem);
  });

  // Count all incomplete tasks.
  const remainingTasks = tasks.filter(function(task) {
    return !task.completed;
  }).length;

  taskCount.textContent =
    `${remainingTasks} tasks remaining`;

  // Empty state.
  emptyMessage.hidden = visibleTasks.length > 0;

  if (tasks.length === 0) {
    emptyMessage.textContent =
      "No tasks yet. Add your first task!";
  } else if (currentFilter === "active") {
    emptyMessage.textContent =
      "No active tasks found.";
  } else if (currentFilter === "completed") {
    emptyMessage.textContent =
      "No completed tasks found.";
  } else {
    emptyMessage.textContent =
      "No tasks to display.";
  }

  // Highlight selected filter.
  filterButtons.forEach(function(button) {
    const isActive =
      button.dataset.filter === currentFilter;

    button.classList.toggle("active", isActive);

    button.setAttribute(
      "aria-pressed",
      String(isActive)
    );
  });
}

// ===================================
// 7. HANDLE ADD TASK FORM
// ===================================

taskForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  if (taskText.length > 100) {
    alert("Tasks must be 100 characters or fewer.");
    return;
  }

  addTask(taskText);

  taskInput.value = "";
  taskInput.focus();
});

// ===================================
// 8. TOGGLE TASK COMPLETION
// ===================================

taskList.addEventListener("change", function(event) {
  if (!event.target.matches(".task-checkbox")) {
    return;
  }

  const taskId = event.target.dataset.taskId;

  const task = tasks.find(function(item) {
    return item.id === taskId;
  });

  if (!task) {
    return;
  }

  task.completed = event.target.checked;

  // NEW: Save updated completion status.
  saveTasks();

  renderTasks();
});

// ===================================
// 9. EDIT TASK
// ===================================

function editTask(taskId) {
  const task = tasks.find(function(item) {
    return item.id === taskId;
  });

  if (!task) {
    return;
  }

  const newText = prompt("Edit your task:", task.text);

  if (newText === null) {
    return;
  }

  const updatedText = newText.trim();

  if (updatedText === "") {
    alert("A task cannot be empty.");
    return;
  }

  if (updatedText.length > 100) {
    alert("Tasks must be 100 characters or fewer.");
    return;
  }

  task.text = updatedText;

  // NEW: Save edited task text.
  saveTasks();

  renderTasks();
}

// ===================================
// 10. DELETE TASK
// ===================================

function deleteTask(taskId) {
  tasks = tasks.filter(function(task) {
    return task.id !== taskId;
  });

  // NEW: Save the updated task list.
  saveTasks();

  renderTasks();
}

// ===================================
// 11. EDIT AND DELETE BUTTON EVENTS
// ===================================

taskList.addEventListener("click", function(event) {

  const editButton = event.target.closest(".edit-btn");

  if (editButton && taskList.contains(editButton)) {
    editTask(editButton.dataset.taskId);
    return;
  }

  const deleteButton = event.target.closest(".delete-btn");

  if (deleteButton && taskList.contains(deleteButton)) {
    deleteTask(deleteButton.dataset.taskId);
  }
});

// ===================================
// 12. FILTER BUTTON EVENTS
// ===================================

filterButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    currentFilter = button.dataset.filter;

    renderTasks();
  });
});

// ===================================
// 13. INITIAL DISPLAY
// ===================================

renderTasks();

console.log("Task Manager is ready!");
