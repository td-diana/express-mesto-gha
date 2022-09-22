require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
// const { ERROR_CODE_NOT_FOUND } = require('./utils/constants');
const { handleError } = require('./middlewares/handleError');
const NotFoundError = require('./errors/not-found-errors');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// app.use((req, res, next) => {
//   req.user = {
//     _id: '631a0769a917efb99aa41e3f',
//   };

//   next();
// });

app.use(routerCards);
app.use(routerUsers);
app.use(errors());
app.use(handleError);
app.all('/*', (req, res, next) => {
  next(new NotFoundError('Запрошенный путь не найден'));
});

app.listen(PORT);
