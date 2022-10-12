const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundError = require('../errors/not-found-errors');
// const { auth } = require('../middlewares/auth');
const { authorizationValidation, registrationValidation } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');

router.post('/signup', registrationValidation, createUser);
router.post('/signin', authorizationValidation, login);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрошенный путь не найден'));
});

module.exports = router;
