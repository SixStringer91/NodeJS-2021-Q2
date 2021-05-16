const router = require('express').Router({ mergeParams: true });
const Task = require('./tasks.model');
const taskService = require('./tasks.service');

router.route('/').get(async (req, res) => {
  const boards = await taskService.getAll();
  return res.json(boards.map(Task.toResponse));
});

router.route('/').post(async (req, res) => {
  const boards = await taskService.createTask(new Task({...req.body, boardsId:req.params.boardsId}))
  return res.json(boards.map(Task.toResponse));
});


module.exports = router;
