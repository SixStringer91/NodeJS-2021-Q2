const router = require('express').Router();
const Task = require('./tasks.model');
const taskService = require('./tasks.service');

router.route('/').get(async (req, res) => {
  const boards = await taskService.getAll();
  return res.json(boards.map(Task.toResponse));
});


module.exports = router;
