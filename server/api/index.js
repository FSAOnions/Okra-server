const router = require('express').Router();

router.use('/products', require('./routes/products'));
router.use('/cart', require('./routes/cart'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;
