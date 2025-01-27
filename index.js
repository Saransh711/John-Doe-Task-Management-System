const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
const app = express();
const port = 3000;

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

app.use(cors());

app.use(express.static('static'));

function addATask(tasks, task) {
  tasks.push(task);
  return tasks;
}

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let task = { taskId: taskId, text: text, priority: priority };
  let result = addATask(tasks, task);
  res.json({ tasks: result });
});

app.get('/tasks', (req, res) => {
  let result = tasks.slice();
  res.json({ tasks: result });
});

function sortingLowTohigh(tasks1, tasks2) {
  return tasks1.priority - tasks2.priority;
}

app.get('/tasks/sort-by-priority', (req, res) => {
  let tasksCopy = tasks.slice();
  let sortedArrayByPriority = tasksCopy.sort(sortingLowTohigh);
  res.json({ tasks: sortedArrayByPriority });
});

function editTheTaskPriority(taskId, priority, tasks) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let tasksCopy = tasks.slice();
  let editedTheTaskPriority = editTheTaskPriority(taskId, priority, tasksCopy);
  res.json({ tasks: editedTheTaskPriority });
});

function editTheTaskText(taskId, text, tasks) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let tasksCopy = tasks.slice();
  let editedTheTaskText = editTheTaskText(taskId, text, tasksCopy);
  res.json({ tasks: editedTheTaskText });
});

function deleteTaskById(taskId, task) {
  return task.taskId != taskId;
}

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let tasksCopy = tasks.slice();
  let deletedTaskById = tasksCopy.filter((task) =>
    deleteTaskById(taskId, task)
  );
  res.json({ tasks: deletedTaskById });
});

function filterTasksByPriority(priority, task) {
  return task.priority === priority;
}

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let tasksCopy = tasks.slice();
  let filteredTasksByPriority = tasksCopy.filter((task) =>
    filterTasksByPriority(priority, task)
  );
  res.json({ tasks: filteredTasksByPriority });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
