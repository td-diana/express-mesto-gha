const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { ERROR_CODE_NOT_FOUND } = require('./utils/constants');

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
app.all('/*', (req, res) => {
  res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Запрошенный путь не найден' });
});

app.listen(PORT);
