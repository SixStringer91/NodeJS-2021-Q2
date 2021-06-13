"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BOARDS = [];
const getAll = async () => BOARDS;
const getBoard = async (id) => BOARDS.find((el) => el.id === id);
const createNewBoard = async (board) => {
    BOARDS.push(board);
    return BOARDS[BOARDS.length - 1];
};
const updateBoard = async (obj) => {
    const boardIndex = BOARDS.findIndex((board) => obj.id === board.id);
    BOARDS[boardIndex] = { ...BOARDS[boardIndex], ...obj };
    return BOARDS[boardIndex];
};
const deleteBoard = async (id) => {
    const boardIndex = BOARDS.findIndex((el) => el.id === id);
    if (boardIndex !== -1) {
        BOARDS.splice(boardIndex, 1);
        return true;
    }
    return false;
};
exports.default = {
    deleteBoard, updateBoard, createNewBoard, getBoard, getAll,
};
//# sourceMappingURL=board.memory.repository.js.map