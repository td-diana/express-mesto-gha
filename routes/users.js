const routerUsers = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getAllUsers,
  getUserById,
  updateUser,
  updateAvatar,
  createUser,
  login,
  getUserInfo,
} = require('../controllers/users');

routerUsers.use(auth);
routerUsers.get('/users', getAllUsers);
routerUsers.get('/users/:userId', getUserById);
routerUsers.patch('/users/me', updateUser);
routerUsers.patch('/users/me/avatar', updateAvatar);
routerUsers.post('/signup', createUser);
routerUsers.post('/signin', login);
routerUsers.get('/users/me', getUserInfo);

module.exports = routerUsers;
