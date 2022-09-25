const router = require('express').Router();
const { userValidation, avatarValidation, userIdValidation } = require('../middlewares/validation');
const {
  getAllUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getUserInfo);
router.get('/:id', userIdValidation, getUserById);
router.patch('/me', userValidation, updateUser);
router.patch('/me/avatar', avatarValidation, updateAvatar);

module.exports = router;
