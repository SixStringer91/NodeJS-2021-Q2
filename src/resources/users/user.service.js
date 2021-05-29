const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getUser = (id) => usersRepo.getOneUser(id);
const createUser = (user) => usersRepo.createNewUser(user);
const updateUser = (obj) => usersRepo.updateUser(obj);
const deleteUser = (id) => usersRepo.deleteUser(id);

module.exports = { getAll, createUser, getUser, updateUser, deleteUser };
