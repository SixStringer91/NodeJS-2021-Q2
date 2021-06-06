"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getAll = void 0;
const user_memory_repository_1 = __importDefault(require("./user.memory.repository"));
const getAll = () => user_memory_repository_1.default.getAll();
exports.getAll = getAll;
const getUser = (id) => user_memory_repository_1.default.getOneUser(id);
exports.getUser = getUser;
const createUser = (user) => user_memory_repository_1.default.createNewUser(user);
exports.createUser = createUser;
const updateUser = (obj) => user_memory_repository_1.default.updateUser(obj);
exports.updateUser = updateUser;
const deleteUser = (id) => user_memory_repository_1.default.deleteUser(id);
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.service.js.map