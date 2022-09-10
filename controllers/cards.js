const Card = require('../models/card');
const { ERROR_CODE_BAD_REQUEST, ERROR_CODE_NOT_FOUND, ERROR_CODE_INTERNAL } = require('../utils/constants');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(ERROR_CODE_INTERNAL).send({ message: err.message }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: err.message });
      }
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.send({ card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: err.message });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.send({ card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: err.message });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.send({ card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: err.message });
      }
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
