const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/not-found-errors');
const { auth } = require('../middlewares/auth');
const { authorizationValidation, registrationValidation } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');

router.post('/signup', registrationValidation, createUser);
router.post('/signin', authorizationValidation, login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Запрошенный путь не найден'));
});

module.exports = router;
