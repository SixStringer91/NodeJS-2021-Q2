import express from 'express';
import {
  getAll, getBoard, createBoard, updateBoard, deleteBoard,
} from './board.service';
import Board from './board.model';

const router = express.Router();
// const deleteBoardTasks = require('../tasks/tasks.service').deleteAllTasks;

router.route('/').get(async (_req, res) => {
  const boards = await getAll();
  if (boards) {
    return res.json(boards.map(Board.toResponse));
  }
  return res.status(404);
});

router.route('/:boardId').get(async (req, res) => {
  const board = await getBoard(req.params.boardId);
  if (board) {
    return res.json(Board.toResponse(board));
  }
  return res.status(404).send('Board not found');
});

router.route('/').post(async (req, res) => {
  const newBoard = await createBoard(new Board(req.body));
  if (newBoard) {
    res.status(201).json(Board.toResponse(newBoard));
  }
});

router.route('/:boardId').put(async (req, res) => {
  const newBoard = await updateBoard({
    ...req.body,
    id: req.params.boardId,
  });
  if (newBoard) {
    return res.status(200).json(Board.toResponse(newBoard));
  }
  return res.status(401);
});

router.route('/:boardId').delete(async (req, res) => {
  const boardFinded = await deleteBoard(req.params.boardId);
  if (boardFinded) {
    // await deleteBoardTasks(req.params.boardId);
    return res.status(204).send('The board has been deleted');
  }
  return res.status(404).send('Board not found');
});

export default router;
