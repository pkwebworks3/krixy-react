//theame
//let body = document.querySelector('body');
//let btn = document.querySelector('.btn');
//btn.onclick = function () {
   // body.classList.toggle('light')
//
// Initialize an empty array to store the tasks
let tasks = [];

// Load the tasks from localStorage when the page loads
window.onload = function() {
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    renderTasks();
  }
}

function addTask() {
  let task = document.getElementById("task").value;
  let taskList = document.getElementById("task-list");

  if (task) {
    // Add the task to the array
    tasks.push(task);

    // Save the tasks array to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Render the tasks on the page
    renderTasks();

    // Clear the input field
    document.getElementById("task").value = "";
  }
}

function removeTask(index) {
  // Remove the task from the array
  tasks.splice(index, 1);

  // Save the tasks array to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Render the tasks on the page
  renderTasks();
}

function renderTasks() {
  let taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = tasks[i] + '<button onclick="removeTask(' + i + ')">Remove</button>';
    taskList.appendChild(li);
  }
}
