const {
  Product,
  Order,
  Bill,
  OrderItem,
  Restaurant,
  User,
} = require("../../db/models");
const { Op } = require("sequelize");

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
  getOrderHistory: async (req, res, next) => {
    try {
      res.json(
        // await Order.findAll({
        //   include: {
        //     model: Bill.findAll({
        //       where: { status: "Paid" },
        //       include: { model: User },
        //     }),
        //     model: Product,
        //     include: { model: Restaurant },
        //   },
        // })
        //await Bill.findAll({ where: {status: "Paid", }, include: { all: true, nested: true }})
        await Bill.findAll({ where: {status: "Paid", userId: req.user.id}, include: { all: true, nested: true }})
      );
    } catch (e) {
      next(e);
    }
  },
};
