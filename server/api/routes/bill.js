const router = require("express").Router();
const {
  getUserBill,
  payBill,
  addToBill,
} = require("../controllers/billController");
const { requireToken } = require("../util/apiMiddleware");

router.get("/:restaurantId", requireToken, getUserBill);
router.post("/addToBill", requireToken, addToBill);
router.put("/payBill", requireToken, payBill);

module.exports = router;
