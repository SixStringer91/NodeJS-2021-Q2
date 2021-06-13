import express from 'express';
import { ErrorHandler } from '../../middlewares/error.handler';
import User from './user.model';
import {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from './user.service';
import { ifUserDeleted } from '../tasks/tasks.service';

const router = express.Router();

router.route('/').get(async (_req, res, next) => {
  const users = await getAll();
  if (users) {
    res.json(users.map(User.toResponse));
  } else next(new ErrorHandler(404));
});

router.route('/:userId').get(async (req, res, next) => {
  const user = await getUser(req.params.userId);
  if (user) {
    res.json(User.toResponse(user));
  } else next(new ErrorHandler(404, 'User not found'));
});

router.route('/').post(async (req, res, next) => {
  const newUser = await createUser(new User(req.body));
  if (newUser) {
    res.status(201).json(User.toResponse(newUser));
  } else next(new ErrorHandler(404, 'bad result'));
});

router.route('/:userId').put(async (req, res, next) => {
  const newBoard = await updateUser({
    ...req.body,
    id: req.params.userId
  });
  if (newBoard) {
    res.status(200).json(User.toResponse(newBoard));
  } else next(new ErrorHandler(401, 'bad result'));
});

router.route('/:userId').delete(async (req, res, next) => {
  const userFinded = await deleteUser(req.params.userId);
  if (userFinded) {
    await ifUserDeleted(req.params.userId);
    res.status(204).send('The board has been deleted');
  } else next(new ErrorHandler(404, 'Board not found'));
});

export default router;
