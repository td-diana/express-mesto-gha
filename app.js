const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/users');
const routerCards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '631a0769a917efb99aa41e3f',
  };

  next();
});

app.use(router);
app.use(routerCards);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
