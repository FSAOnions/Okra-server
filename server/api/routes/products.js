const router = require('express').Router();
const {
  getAllProducts,
  getSingleProduct,
} = require('../controllers/productsController');
const { requireToken, requireAdmin } = require('../util/apiMiddleware');

router.get('/', requireToken, getAllProducts);
router.get('/:id', requireToken, getSingleProduct);

module.exports = router;
