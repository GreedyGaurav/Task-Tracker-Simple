const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const sortBtn = document.getElementById("sort-btn");

const tasks = [];

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
            <span>${task.name}</span>
            <span class="priority-${
              task.priority
            }">${task.priority.toUpperCase()}</span>
            <button class="delete-btn" data-index="${index}">X</button>
        `;
    taskList.appendChild(taskItem);
  });

  // Add delete functionality
  document.querySelectorAll(".delete-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      tasks.splice(index, 1);
      renderTasks();
    })
  );
}

// Add task
addTaskBtn.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (taskName) {
    tasks.push({ name: taskName, priority });
    taskInput.value = "";
    renderTasks();
  } else {
    alert("Please enter a task name.");
  }
});

// Sort tasks by priority
sortBtn.addEventListener("click", () => {
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  renderTasks();
});
