const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const themeToggleBtn = document.getElementById('toggle-theme');
const addBtn = document.getElementById('add-btn');

// Load theme and tasks on start
window.onload = () => {
  loadTheme();
  loadTasks();
};

addBtn.onclick = () => addTask(taskInput.value);

// Add Task
function addTask(text) {
  if (text.trim() === '') return;

  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;

  const doneBtn = document.createElement('button');
  doneBtn.textContent = '✔️';
  doneBtn.className = 'done-btn';
  doneBtn.onclick = () => {
    li.classList.toggle('completed');
    saveTasks();
  };

  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.className = 'edit-btn';
  editBtn.onclick = () => {
    const newText = prompt('Edit task:', span.textContent);
    if (newText) {
      span.textContent = newText;
      saveTasks();
    }
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = () => {
    li.classList.add('fade-out');
    setTimeout(() => {
      li.remove();
      saveTasks();
    }, 500);
  };

  li.appendChild(span);
  li.appendChild(doneBtn);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
  taskInput.value = '';

  saveTasks();
}

// Local Storage Save
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#task-list li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').textContent,
      done: li.classList.contains('completed'),
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load Tasks
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    addTask(task.text);
    if (task.done) {
      taskList.lastChild.classList.add('completed');
    }
  });
}

// Theme Toggle
themeToggleBtn.onclick = () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
};

function loadTheme() {
  const theme = localStorage.getItem('theme');
  if (theme === 'light') {
    document.body.classList.add('light-mode');
  }
}
