const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  console.log(users)
  res.json(users.map(User.toResponse));
});


router.route('/:userId').get(async (req, res) => {
  const user = await usersService.getUser(req.params.userId);
  if(user){
 return res.json(User.toResponse(user));
}
  return res.status(404).send('User not found');
});


router.route('/').post(async (req, res) => {
  const newUser = await usersService.createUser(new User(req.body));
  if(newUser) return res.status(201).json(User.toResponse(newUser));
  return res.status(404).send('bad result');
});

router.route('/:userId').put(async (req, res) => {
  const newBoard = await usersService.updateUser({...req.body, id : req.params.userId});
  try {
    return res.status(200).json(User.toResponse(newBoard));
  } catch (err) {
    return res.status(401).send(err.message);
  }
});

router.route('/:userId').delete(async (req, res) => {
  const userFinded = await usersService.deleteUser(req.params.userId);
  if(userFinded) {
    return res.status(204).send('The board has been deleted');
  }

   return res.status(404).send('Board not found');
});


module.exports = router;
