const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  status: {
    type: Sequelize.ENUM("Ordered", "Pending"),
    allowNull: false,
    defaultValue: "Pending",
  },
  total_price: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
    allowNull: false,
  },
  dollars: {
    type: Sequelize.VIRTUAL,
    get() {
      const rawValue = this.getDataValue("total_price");
      const dollar = (rawValue / 100).toFixed(2);
      return `$${dollar}`;
    },
  },
});

module.exports = Order;
