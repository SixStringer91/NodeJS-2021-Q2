const TASKS = [];

const getAll = async () => TASKS;
const createTask = async (task) => {
  TASKS.push(task);
  return task
};

module.exports = { getAll, createTask };
