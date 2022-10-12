const router = require('express').Router();
const { userValidation, avatarValidation, userIdValidation } = require('../middlewares/validation');
const {
  getUsers,
  getUserById,
  getUserInfo,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.use(auth);
router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', userIdValidation, getUserById);
router.patch('/me', userValidation, updateUser);
router.patch('/me/avatar', avatarValidation, updateUserAvatar);

module.exports = router;
