const router = require('express').Router({ mergeParams: true });
const Task = require('./tasks.model');
const taskService = require('./tasks.service');
// const getBoards = require('../boards/board.service').getAll;
// const getUsers = require('../users/user.memory.repository').getAll;

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll();
  return res.status(200).json(tasks.map(Task.toResponse));
});

router.route('/:taskId').get(async (req, res) => {
  const task = await taskService.getTask(req.params.taskId);
  if(task) return res.status(200).json(Task.toResponse(task));
  return res.status(404).send('Task not found');
});

router.route('/').post(async (req, res) => {
  console.log(req.body);
  const newTask = await taskService.createTask(
    new Task({...req.body, boardsId: req.params.boardsId})
  );
  return res.status(201).json(Task.toResponse(newTask));
});

router.route('/:taskId').put(async (req, res) => {
  const updatedTask = await taskService.updateTask({...req.body, id: req.params.taskId});
  if(updatedTask) return res.status(200).json(Task.toResponse(updatedTask));
  return res.status(404).send('Task not found');
});

router.route('/:taskId').delete(async (req, res) => {
  const taskFinded = await taskService.deleteTask(req.params.taskId);
  if(taskFinded) {
    return res.status(204).send('The task has been deleted');
  }
   return res.status(404).send('Board not found');
});


module.exports = router;
