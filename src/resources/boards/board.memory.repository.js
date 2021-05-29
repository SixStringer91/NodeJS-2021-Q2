const BOARDS = [];
 /**
 * get all boards
 * @returns {Array} returns array of all boards
 */ 
const getAll = async () => BOARDS;
 /**
 * get boards by id
 * @param {string} id user id
 * @returns {Object} returns board
 */
const getBoard = async (id) => BOARDS.find((el) => el.id === id);
 /**
 * Create new board in database
 * @param {Object} board user id
 * @returns {Object} returns board
 */
const createNewBoard = async (board) => {
  BOARDS.push(board);
  return board;
};
 /**
 * Update board 
 * @param {Object} obj board body
 * @returns {Object} returns updated board
 */
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
 /**
 * Delete board 
 * @param {string} id board id
 * @returns {boolean} return true of board deleted successfuly
 */
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
