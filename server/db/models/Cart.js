const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  status: {
    type: Sequelize.ENUM("Purchased", "Cart"),
    allowNull: false,
    defaultValue: "Cart",
  },
  total_price: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
    allowNull: false,
  },
  dollars: {
    type: Sequelize.VIRTUAL,
    get() {
      const rawValue = this.getDataValue("totalprice");
      const dollar = (rawValue / 100).toFixed(2);
      return `$${dollar}`;
    },
  },
});

module.exports = Cart;
