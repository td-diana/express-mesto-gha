const router = require('express').Router();
const {
  getAllCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardValidation, cardIdValidation } = require('../middlewares/validation');

router.get('/', getAllCards);
router.post('/', cardValidation, createCard);
router.delete('/:id', cardIdValidation, deleteCardById);
router.put('/:id/likes', cardIdValidation, likeCard);
router.delete('/:id/likes', cardIdValidation, dislikeCard);

module.exports = router;
