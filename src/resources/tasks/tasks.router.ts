import express, { Request, Response } from 'express';
import Task from './tasks.model';
// import { getBoard } from '../boards/board.service';
import taskService from './tasks.service';

const router = express.Router({ mergeParams: true });

router.route('/').get(async (req: Request, res: Response):Promise<void> => {
  const { boardsId } = req.params;
  if (boardsId) {
    // const boardCheck = await getBoard(boardsId);
    const tasks = await taskService.getAll(boardsId);
    if (tasks) res.status(200).json(tasks.map(Task.toResponse));
  }
  res.status(404).send('Tasks not found');
});

router.route('/:taskId').get(async (req: Request, res: Response):Promise<void> => {
  const { boardsId, taskId } = req.params;
  if (boardsId && taskId) {
    // const boardCheck = await getBoard(boardsId);
    const task = await taskService.getTask(taskId);
    if (task) {
      res.status(200).json(Task.toResponse(task));
    }
  }
  res.status(404).send('Task not found');
});

router.route('/').post(async (req: Request, res: Response):Promise<void> => {
  const { boardsId } = req.params;
  const newTask = await taskService.createTask(
    new Task({ ...req.body, boardsId }),
  );
  if (newTask) res.status(201).json(Task.toResponse(newTask));
  res.status(404);
});

router.route('/:taskId').put(async (req, res) => {
  const updatedTask = await taskService.updateTask({
    ...req.body,
    id: req.params.taskId,
  });
  if (updatedTask) return res.status(200).json(Task.toResponse(updatedTask));
  return res.status(404).send('Task not found');
});

router.route('/:taskId').delete(async (req, res) => {
  const taskFinded = await taskService.deleteTask(req.params.taskId);
  if (taskFinded) {
    return res.status(204).send('The task has been deleted');
  }
  return res.status(404).send('Board not found');
});

export default router;
