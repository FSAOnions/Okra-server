const router = require('express').Router();
const {
  getAllProducts,
  getSingleProduct,
  getRestaurantMenu,
  getAllRestaurants
} = require('../controllers/productsController');
const { requireToken, requireAdmin } = require('../util/apiMiddleware');

router.get('/', requireToken, getAllProducts);
router.get('/restaurants', requireToken, getAllRestaurants)
router.get('/restaurants/:id', requireToken, getRestaurantMenu)
router.get('/:id', requireToken, getSingleProduct);

module.exports = router;
