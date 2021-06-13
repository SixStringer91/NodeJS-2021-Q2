import express, { Request, Response } from 'express';
import Task from './tasks.model';
import { getBoard } from '../boards/board.service';
import taskService from './tasks.service';
import { ErrorHandler } from '../../middlewares/error.handler';

const router = express.Router({ mergeParams: true });

router.route('/').get(async (req: Request, res: Response, next) => {
  const { boardsId } = req.params;
  if (boardsId) {
    const boardCheck = await getBoard(boardsId);
    const tasks = await taskService.getAll(boardsId);
    if (tasks && boardCheck) res.status(200).json(tasks.map(Task.toResponse));
  } else next(new ErrorHandler(404, 'Tasks not found'));
});

router.route('/:taskId').get(async (req: Request, res: Response, next) => {
  const { boardsId, taskId } = req.params;
  if (boardsId && taskId) {
    const boardCheck = await getBoard(boardsId);
    const task = await taskService.getTask(taskId);
    if (task && boardCheck) {
      res.status(200).json(Task.toResponse(task));
    } else next(new ErrorHandler(404, 'Task not found'));
  } else next(new ErrorHandler(404, 'Task not found'));
});

router.route('/').post(async (req: Request, res: Response, next) => {
  const { boardsId } = req.params;

  if (boardsId) {
    const boardCheck = await getBoard(boardsId);
    const newTask = await taskService.createTask(
      new Task({ ...req.body, boardId: boardsId })
    );
    if (newTask && boardCheck) res.status(201).json(Task.toResponse(newTask));
  } else next(new ErrorHandler(404, 'Bad result'));
});

router.route('/:taskId').put(async (req: Request, res: Response, next) => {
  const updatedTask = await taskService.updateTask({
    ...req.body,
    id: req.params['taskId']
  });
  if (updatedTask) res.status(200).json(Task.toResponse(updatedTask));
  else next(new ErrorHandler(404, 'Task not found'));
});

router.route('/:taskId').delete(async (req: Request, res: Response, next) => {
  const { taskId } = req.params;
  if (taskId) {
    const taskFinded = await taskService.deleteTask(taskId);
    if (taskFinded) {
      res.status(204).send('The task has been deleted');
    }
  } else next(new ErrorHandler(404, 'Board not found'));
});

export default router;
