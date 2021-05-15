const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:userId').get(async (req, res) => {
  const users = await usersService.getUser(req.params.userId);
  res.json(User.toResponse(users));
});

router.route('/').post(async (req, res) => {
  const newUser = usersService.createUser(new User(req.body));
  res.status(201).json(User.toResponse(newUser));
});

router.route('/:userId').put(async (req, res) => {
  const newUser = usersService.updateUser({...req.body, id : req.params.userId});
  res.status(200).json(User.toResponse(newUser));
});

router.route('/:userId').delete(async (req, res) => {
  const newUser = usersService.deleteUser(req.params.userId);
  console.log(newUser)
  res.status(200).json(User.toResponse(newUser));
});





module.exports = router;
