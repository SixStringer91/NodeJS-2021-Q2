const router = require('express').Router({ mergeParams: true });
const Task = require('./tasks.model');
const taskService = require('./tasks.service');
const { getBoard } = require('../boards/board.service');

router.route('/').get(async (req, res) => {
  const boardId = await getBoard(req.params.boardsId);
  const tasks = await taskService.getAll(req.params.boardsId);
  if (boardId && tasks) return res.status(200).json(tasks.map(Task.toResponse));
  return res.status(404).send('Tasks not found');
});

router.route('/:taskId').get(async (req, res) => {
  const boardId = await getBoard(req.params.boardsId);
  const task = await taskService.getTask(req.params.taskId);
  if (task && boardId) {
    return res.status(200).json(Task.toResponse(task));
  }
  return res.status(404).send('Task not found');
});

router.route('/').post(async (req, res) => {
  const newTask = await taskService.createTask(
    new Task({ ...req.body, boardsId: req.params.boardsId })
  );
  return res.status(201).json(Task.toResponse(newTask));
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

module.exports = router;
