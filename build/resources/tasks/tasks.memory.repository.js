"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TASKS = [];
const getAll = async (boardsId) => {
    const filtered = TASKS.filter((el) => el.boardId === boardsId);
    return filtered;
};
const createTask = async (task) => {
    TASKS.push(task);
    return TASKS[TASKS.length - 1];
};
const getTask = async (id) => {
    const currentTask = TASKS.find((task) => task.id === id);
    return currentTask;
};
const updateTask = async (obj) => {
    const taskIndex = TASKS.findIndex((user) => obj.id === user.id);
    if (taskIndex !== -1) {
        TASKS[taskIndex] = { ...TASKS[taskIndex], ...obj };
        return TASKS[taskIndex];
    }
    return null;
};
const deleteTask = async (id) => {
    const taskIndex = TASKS.findIndex((user) => id === user.id);
    if (taskIndex !== -1) {
        TASKS.splice(taskIndex, 1);
        return true;
    }
    return false;
};
const deleteAllTasks = async (boardsId) => {
    TASKS.forEach((task, i) => {
        if (task.boardId === boardsId) {
            TASKS.splice(i, 1);
        }
    });
};
const ifUserDeleted = async (userId) => {
    TASKS.forEach((task, i) => {
        if (task.userId === userId) {
            const currentTask = { ...task, userId: null };
            TASKS[i] = { ...currentTask };
        }
    });
};
exports.default = {
    getAll,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    deleteAllTasks,
    ifUserDeleted
};
//# sourceMappingURL=tasks.memory.repository.js.map