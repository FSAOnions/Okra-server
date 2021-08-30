const { Product, Order } = require("../../db/models");

module.exports = {
  getOrders: async (req, res, next) => {
    try {
      // get user cart will create an active cart if they don't have one.
      let user = req.user;
      let bill = user.bills.find((bill) => bill.status === "Pending");

      res.json(
        await Order.findAll({
          where: { billId: bill.id },
          include: { model: Product },
        })
      );
    } catch (e) {
      next(e);
    }
  },
};
