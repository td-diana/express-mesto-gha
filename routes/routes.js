const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/not-found-errors');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Запрошенный путь не найден'));
});

module.exports = router;
