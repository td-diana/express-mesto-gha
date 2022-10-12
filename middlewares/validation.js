const { Joi, celebrate } = require('celebrate');
const JoiObjectId = require('joi-objectid');

const linkСhecking = /^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;

Joi.objectId = JoiObjectId(Joi);
// POST /signup
const registrationValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkСhecking),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// POST /signin
const authorizationValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// PATCH /users/me
const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

// PATCH /users/me/avatar
const avatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(linkСhecking),
  }),
});

// GET /users/:userId
const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

// POST /cards
const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(linkСhecking),
  }),
});

// DELETE /cards/:cardId
// PUT /cards/:cardId/likes
// DELETE /cards/:cardId/likes
const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  authorizationValidation,
  registrationValidation,
  userValidation,
  avatarValidation,
  userIdValidation,
  cardValidation,
  cardIdValidation,
};
