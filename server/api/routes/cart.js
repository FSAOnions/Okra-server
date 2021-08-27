const router = require('express').Router();
const {
  getUserCart,
  addItemToCart,
  deleteItemFromCart,
  checkoutCart,
} = require('../controllers/cartController');
const { requireToken } = require('../util/apiMiddleware');

router.put('/checkout', requireToken, checkoutCart);
router.get('/:userId', requireToken, getUserCart);
router.post('/:itemId', requireToken, addItemToCart);
router.delete('/itemId', requireToken, deleteItemFromCart);

module.exports = router;
