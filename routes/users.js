const routerUsers = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  login,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

routerUsers.get('/users', getAllUsers);
routerUsers.get('/users/:userId', getUserById);
routerUsers.patch('/users/me', updateUser);
routerUsers.patch('/users/me/avatar', updateAvatar);
routerUsers.post('/signup', createUser);
routerUsers.post('/signin', login);

module.exports = routerUsers;
