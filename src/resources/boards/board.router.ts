import express from 'express';
import {
  getAll, getBoard, createBoard, updateBoard, deleteBoard
} from './board.service';
import Board from './board.model';
import { deleteAllTasks } from '../tasks/tasks.service';
import { ErrorHandler } from '../../middlewares/error.handler';

const router = express.Router();

router.route('/').get(async (_req, res, next) => {
  const boards = await getAll();
  if (boards) {
    res.json(boards);
  } else next(new ErrorHandler(404));
});

router.route('/:boardId').get(async (req, res, next) => {
  const board = await getBoard(req.params.boardId);
  if (board) {
    res.json(board);
  } else next(new ErrorHandler(404, 'Board not found'));
});

router.route('/').post(async (req, res, next) => {
  const newBoard = await createBoard(new Board(req.body));
  if (newBoard) {
    res.status(201).json(newBoard);
  } else next(new ErrorHandler(404));
});

router.route('/:boardId').put(async (req, res, next) => {
  const newBoard = await updateBoard({
    ...req.body,
    id: req.params.boardId
  });
  if (newBoard) {
    res.status(200).json(newBoard);
  } else next(new ErrorHandler(401));
});

router.route('/:boardId').delete(async (req, res, next) => {
  const boardFinded = await deleteBoard(req.params.boardId);
  if (boardFinded) {
    await deleteAllTasks(req.params.boardId);
    res.status(204).send('The board has been deleted');
  } else next(new ErrorHandler(404, 'Board not found'));
});

export default router;
