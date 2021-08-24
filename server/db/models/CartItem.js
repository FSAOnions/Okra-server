const Sequelize = require("sequelize");
const db = require("../db");

const CartItem = db.define("cart-item", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
  },
});

module.exports = CartItem;
