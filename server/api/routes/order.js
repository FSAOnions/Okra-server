const router = require("express").Router();
const {
  getOrders,
  getOrderHistory,
} = require("../controllers/orderController");
const { requireToken } = require("../util/apiMiddleware");

router.get("/", requireToken, getOrders);
router.get("/history", requireToken, getOrderHistory);

module.exports = router;
