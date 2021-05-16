const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const deleteBoardTasks = require('../tasks/tasks.service').deleteAllTasks;

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  return res.json(boards.map(Board.toResponse));
});

router.route('/:boardId').get(async (req, res) => {
  const board = await boardsService.getBoard(req.params.boardId);
  if (board) {
    return res.json(Board.toResponse(board));
  }
  return res.status(404).send('Board not found');
});

router.route('/').post(async (req, res) => {
  const newBoard = await boardsService.createBoard(new Board(req.body));
  res.status(201).json(Board.toResponse(newBoard));
});

router.route('/:boardId').put(async (req, res) => {
  const newBoard = await boardsService.updateBoard({
    ...req.body,
    id: req.params.boardId,
  });
  try {
    return res.status(200).json(Board.toResponse(newBoard));
  } catch (err) {
    return res.status(401).send(err.message);
  }
});

router.route('/:boardId').delete(async (req, res) => {
  const boardFinded = await boardsService.deleteBoard(req.params.boardId);
  if (boardFinded) {
    await deleteBoardTasks(req.params.boardId);
    return res.status(204).send('The board has been deleted');
  }
  return res.status(404).send('Board not found');
});

module.exports = router;
