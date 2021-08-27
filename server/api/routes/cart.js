const router = require('express').Router();
const {
  getUserCart,
  addItemToCart,
  deleteItemFromCart,
} = require('../controllers/cartController');
const { requireToken } = require('../util/apiMiddleware');

router.get('/:userId', requireToken, getUserCart);
router.post('/:itemId', requireToken, addItemToCart);
router.delete('/itemId', requireToken, deleteItemFromCart);

module.exports = router;
