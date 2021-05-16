const boardRepo = require('./board.memory.repository');

const getAll = async () => boardRepo.getAll();
const getBoard = id => boardRepo.getBoard(id);
const createBoard = board => boardRepo.createNewBoard(board);
const updateBoard = board => boardRepo.updateBoard(board);
const deleteBoard = id => boardRepo.deleteBoard(id);

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
