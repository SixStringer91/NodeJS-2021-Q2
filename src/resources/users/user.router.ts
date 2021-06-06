import express from 'express';
import User from './user.model';
import {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from './user.service';
import { ifUserDeleted } from '../tasks/tasks.service';

const router = express.Router();

router.route('/').get(async (_req, res) => {
  const users = await getAll();
  if (users) {
    res.json(users.map(User.toResponse));
  }
  return res.status(404);
});

router.route('/:userId').get(async (req, res) => {
  const user = await getUser(req.params.userId);
  if (user) {
    return res.json(User.toResponse(user));
  }
  return res.status(404).send('User not found');
});

router.route('/').post(async (req, res) => {
  const newUser = await createUser(new User(req.body));
  if (newUser) {
    return res.status(201).json(User.toResponse(newUser));
  }
  return res.status(404).send('bad result');
});

router.route('/:userId').put(async (req, res) => {
  const newBoard = await updateUser({
    ...req.body,
    id: req.params.userId,
  });
  if (newBoard) {
    return res.status(200).json(User.toResponse(newBoard));
  }
  return res.status(401).send('bad result');
});

router.route('/:userId').delete(async (req, res) => {
  const userFinded = await deleteUser(req.params.userId);
  if (userFinded) {
    await ifUserDeleted(req.params.userId);
    return res.status(204).send('The board has been deleted');
  }

  return res.status(404).send('Board not found');
});

export default router;
