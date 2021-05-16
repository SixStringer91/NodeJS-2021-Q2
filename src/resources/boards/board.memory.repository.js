const BOARDS = [];

const getAll = async () => BOARDS;

const getBoard = async (id) => BOARDS.find((el) => el.id === id);

const createNewBoard = async (board) => {
  BOARDS.push(board);
  return board;
};

const updateBoard = async (obj) => {
  const boardIndex = BOARDS.findIndex((board) => obj.id === board.id);
  const currentBoard = BOARDS[boardIndex];
  Object.keys(currentBoard).forEach((key) => {
    if (key in obj) {
      currentBoard[key] = obj[key];
    }
  });
  return currentBoard;
};

const deleteBoard = async (id) => {
  for (let i = 0; i < BOARDS.length; i += 1) {
    if (BOARDS[i].id === id) {
      delete BOARDS[i].columns;
      BOARDS.splice(i, 1);
      return true;
    }
  }
  return false;
};

module.exports = { getAll, getBoard, createNewBoard, updateBoard, deleteBoard };
