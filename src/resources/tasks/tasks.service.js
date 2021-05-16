const taskRepo = require('./tasks.memory.repository');

const getAll = () => taskRepo.getAll();
const createTask = () => taskRepo.createTask();


module.exports = { getAll, createTask };
