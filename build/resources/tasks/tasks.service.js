"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ifUserDeleted = exports.deleteAllTasks = void 0;
const tasks_memory_repository_1 = __importDefault(require("./tasks.memory.repository"));
const getAll = (boardsId) => tasks_memory_repository_1.default.getAll(boardsId);
const createTask = (task) => tasks_memory_repository_1.default.createTask(task);
const getTask = (id) => tasks_memory_repository_1.default.getTask(id);
const updateTask = (obj) => tasks_memory_repository_1.default.updateTask(obj);
const deleteTask = (id) => tasks_memory_repository_1.default.deleteTask(id);
const deleteAllTasks = (boardId) => tasks_memory_repository_1.default.deleteAllTasks(boardId);
exports.deleteAllTasks = deleteAllTasks;
const ifUserDeleted = (userId) => tasks_memory_repository_1.default.ifUserDeleted(userId);
exports.ifUserDeleted = ifUserDeleted;
exports.default = {
    getAll,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};
//# sourceMappingURL=tasks.service.js.map