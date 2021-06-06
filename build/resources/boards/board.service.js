"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoard = exports.updateBoard = exports.createBoard = exports.getBoard = exports.getAll = void 0;
const board_memory_repository_1 = __importDefault(require("./board.memory.repository"));
const getAll = async () => board_memory_repository_1.default.getAll();
exports.getAll = getAll;
const getBoard = (id) => board_memory_repository_1.default.getBoard(id);
exports.getBoard = getBoard;
const createBoard = (board) => board_memory_repository_1.default.createNewBoard(board);
exports.createBoard = createBoard;
const updateBoard = (board) => board_memory_repository_1.default.updateBoard(board);
exports.updateBoard = updateBoard;
const deleteBoard = (id) => board_memory_repository_1.default.deleteBoard(id);
exports.deleteBoard = deleteBoard;
//# sourceMappingURL=board.service.js.map