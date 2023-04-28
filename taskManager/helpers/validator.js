class validator {
  static validateTasks(tasks, newTask) {
    if (
      newTask.hasOwnProperty("id") &&
      newTask.hasOwnProperty("title") &&
      newTask.hasOwnProperty("description") &&
      newTask.hasOwnProperty("completionStatus") &&
      newTask.hasOwnProperty("priorityLevel") &&
      this.validateUniqueTaskId(tasks, newTask)
    ) {
      return { status: true, message: "Task added successfully" };
    }
    if (!this.validateUniqueTaskId(tasks, newTask)) {
      return {
        status: false,
        message: "Task id already exist, please provide a unique id",
      };
    }
    return {
      status: false,
      message: "Some properties are missing, please provide all the properties",
    };
  }
  static validateUniqueTaskId(tasks, newTask) {
    const isTaskExist = tasks.some((task) => task.id === newTask.id);
    return !isTaskExist;
  }
}

module.exports = validator;
