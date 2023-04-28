const taskRoutes = require("express").Router();
const tasksData = require("../tasks.json");
const path = require("path");
const fs = require("fs");
const validator = require("../helpers/validator");
const bodyParser = require("body-parser");

taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());

taskRoutes.get("/", (req, res) => {
  let status = req.query.completionStatus;
  let sort = req.query.sort;
  let modifiedTask = tasksData;
  if (status) {
    let completionStatus;
    if (status === "true") {
      completionStatus = true;
    }
    if (status === "false") {
      completionStatus = false;
    }
    modifiedTask = tasksData.filter(
      (task) => task.completionStatus === completionStatus
    );
  }
  if (sort) {
    if (sort === "olderFirst") {
      modifiedTask = modifiedTask.sort(
        (task1, task2) => task1.creationDate - task2.creationDate
      );
    }

    if (sort === "latestFirst") {
      modifiedTask = modifiedTask.sort(
        (task1, task2) => task2.creationDate - task1.creationDate
      );
    }
  }
  res.status(200).send(modifiedTask);
});

taskRoutes.post("/", (req, res) => {
  const newTask = req.body;
  const validateTasks = validator.validateTasks(tasksData, newTask);
  const tasks = JSON.parse(JSON.stringify(tasksData));
  const creationDate = Date.now();
  tasks.push({ ...newTask, creationDate });
  const writePath = path.join(__dirname, "..", "tasks.json");

  if (validateTasks.status) {
    fs.writeFileSync(writePath, JSON.stringify(tasks), {
      encoding: "utf8",
      flag: "w",
    });
    res.status(200).send(validateTasks);
  } else {
    res.status(400).send(validateTasks);
  }
});

taskRoutes.get("/:id", (req, res) => {
  const taskId = req.params.id;
  const filteredTask = tasksData.filter((task) => task.id === taskId);

  res.status(200).send(filteredTask);
});

taskRoutes.get("/priority/:level", (req, res) => {
  const priorityLevel = req.params.level;
  const modifiedTask = tasksData.filter(
    (task) => task.priorityLevel === priorityLevel
  );
  res.status(200).send(modifiedTask);
});

taskRoutes.put("/:id", (req, res) => {
  const taskId = req.params.id;
  const body = req.body;
  const taskToUpdate = tasksData.find((task) => task.id === taskId);
  const writePath = path.join(__dirname, "..", "tasks.json");

  if (taskToUpdate) {
    taskToUpdate.title = body.title || taskToUpdate.title;
    taskToUpdate.description = body.description || taskToUpdate.description;
    taskToUpdate.completionStatus =
      body.completionStatus || taskToUpdate.completionStatus;
    taskToUpdate.priorityLevel =
      body.priorityLevel || taskToUpdate.priorityLevel;

    const tasks = JSON.parse(JSON.stringify(tasksData));
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    const updatedTasks = [...filteredTasks, taskToUpdate];
    fs.writeFileSync(writePath, JSON.stringify(updatedTasks), {
      encoding: "utf8",
      flag: "w",
    });

    res.status(200).send({ message: "Task was updated successfully" });
  } else {
    res.status(400).send({
      message: "Task was not found for the requested id " + taskId,
    });
  }
});

taskRoutes.delete("/:id", (req, res) => {
  const taskId = req.params.id;
  const taskToDelete = tasksData.find((tasks) => tasks.id === taskId);
  const writePath = path.join(__dirname, "..", "tasks.json");

  if (taskToDelete) {
    const tasks = JSON.parse(JSON.stringify(tasksData));
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    fs.writeFileSync(writePath, JSON.stringify(filteredTasks), {
      encoding: "utf8",
      flag: "w",
    });
    res.status(200).send({ message: "Task was deleted successfully" });
  } else {
    res.status(400).send({
      message: "Task was not found for the requested id " + taskId,
    });
  }
});

module.exports = taskRoutes;
