"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const USERS = [];
const getAll = async () => USERS;
const createNewUser = (user) => {
    const newUser = USERS.push(user);
    return USERS[newUser - 1];
};
const getOneUser = async (id) => USERS
    .find((user) => id === user['id']);
const updateUser = (obj) => {
    const userIndex = USERS.findIndex((user) => obj.id === user['id']);
    USERS[userIndex] = { ...USERS[userIndex], ...obj };
    return USERS[userIndex];
};
const deleteUser = async (id) => USERS
    .splice(USERS.findIndex((user) => id === user['id']), 1);
exports.default = {
    getAll, createNewUser, getOneUser, updateUser, deleteUser,
};
//# sourceMappingURL=user.memory.repository.js.map