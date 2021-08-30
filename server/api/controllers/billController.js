const { Product, Bill, Order, OrderItem } = require("../../db/models");

module.exports = {
  getUserBill: async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      let user = req.user;
      console.log("USER ", user);

      let bill = await Bill.create({ status: "Pending", total_price: 0 });
      await bill.setRestaurant(restaurantId);
      await bill.setUser(user);
      await user.addBill(bill);

      res.json(bill);
    } catch (e) {
      next(e);
    }
  },
  addToBill: async (req, res, next) => {
    try {
      let user = req.user;
      let bill = user.bills.find((bill) => bill.status == "Pending");

      let orders = req.body;
      //   let orders = JSON.parse(req.body);

      // calculate total_price
      let order = await Order.create({ status: "Pending", total_price: 0 });

      for (let productId of Object.keys(orders)) {
        const { quantity, price } = orders[productId];
        await OrderItem.create({
          productId,
          quantity,
          price,
          orderId: order.id,
        });
      }

      bill.addOrder(order);

      res.send(201);
    } catch (e) {
      next(e);
    }
  },
  payBill: async (req, res, next) => {
    try {
      const user = req.user;

      const lastBill = user.bills.find((bill) => bill.status === "Pending");
      const userBill = await Bill.findByPk(lastBill.id, {
        include: [{ model: Order, include: Product }],
      });
      console.log(userBill.orders);

      //   const newOrder = await Order.create();

      //   await newOrder.setUser(user);
      //   await user.addOrder(newOrder);
      let total_price = 0;

      userBill.orders.map((order) =>
        order.products.map((product) => {
          const { quantity, price } = product["order-item"];

          return (total_price += quantity * price);
        })
      );

      await userBill.update({ status: "Paid", total_price });

      res.send(204);
    } catch (e) {
      next(e);
    }
  },
};
