const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
// const { createUser, login } = require('./controllers/users');
// const { auth } = require('./middlewares/auth');
const router = require('./routes/routes');
const { handleError } = require('./middlewares/handleError');
// const { authorizationValidation, registrationValidation } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());

// app.post('/signup', registrationValidation, createUser);
// app.post('/signin', authorizationValidation, login);

// app.use(auth);

app.use(router);

app.use(errors());
app.use(handleError);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT);
