const taskRepo = require('./tasks.memory.repository');

const getAll = async () => taskRepo.getAll();


module.exports = { getAll };
