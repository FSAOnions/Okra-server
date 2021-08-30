const router = require("express").Router();
const { getOrders } = require("../controllers/orderController");
const { requireToken } = require("../util/apiMiddleware");

router.get("/", requireToken, getOrders);

module.exports = router;
