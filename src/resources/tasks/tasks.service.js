const taskRepo = require('./tasks.memory.repository');

const getAll = () => taskRepo.getAll();
const createTask = task => taskRepo.createTask(task);
const getTask = id => taskRepo.getTask(id);
const updateTask = obj => taskRepo.updateTask(obj);
const deleteTask = id => taskRepo.deleteTask(id);

module.exports = { getAll, createTask, getTask, updateTask, deleteTask };
