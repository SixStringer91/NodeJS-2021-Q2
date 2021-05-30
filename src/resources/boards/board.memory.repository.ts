import Board from './board.model';

const BOARDS:Board[] = [];

const getAll = async ():Promise<Board[]> => BOARDS;

const getBoard = async (id:string):Promise<Board|void> => BOARDS.find((el) => el.id === id);

const createNewBoard = async (board:Board):Promise<Board|void> => {
  BOARDS.push(board);
  return BOARDS[BOARDS.length - 1];
};

const updateBoard = async (obj:Board):Promise<Board|void> => {
  const boardIndex = BOARDS.findIndex((board) => obj.id === board.id);
  BOARDS[boardIndex] = { ...BOARDS[boardIndex], ...obj };

  return BOARDS[boardIndex];
};

const deleteBoard = async (id:string):Promise<boolean> => {
  const boardIndex = BOARDS.findIndex((el:Board) => el.id === id);
  if (boardIndex !== -1) {
    BOARDS.splice(boardIndex, 1);
    return true;
  }
  return false;
  // for (let i = 0; i < BOARDS.length; i += 1) {
  //   if (BOARDS[i].id === id) {
  //     delete BOARDS[i].columns;
  //     BOARDS.splice(i, 1);
  //     return true;
  //   }
  // }
  // return false;
};

export default {
  deleteBoard, updateBoard, createNewBoard, getBoard, getAll,
};
