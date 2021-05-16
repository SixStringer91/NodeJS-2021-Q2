const taskRepo = require('./tasks.memory.repository');

const getAll = (boardsId) => taskRepo.getAll(boardsId);
const createTask = (task) => taskRepo.createTask(task);
const getTask = (id) => taskRepo.getTask(id);
const updateTask = (obj) => taskRepo.updateTask(obj);
const deleteTask = (id) => taskRepo.deleteTask(id);
const deleteAllTasks = (boardId) => taskRepo.deleteAllTasks(boardId);
const ifUserDeleted = (userId) => taskRepo.ifUserDeleted(userId);

module.exports = {
  getAll,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  ifUserDeleted,
};
