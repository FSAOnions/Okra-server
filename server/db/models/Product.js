const db = require("../db");
const Sequelize = require("sequelize");

const Product = db.define("product", {
  product_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  product_imgUrl: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  threeD_imgUrl: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
      not: ["[a-z]", "i"],
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  product_type: {
    type: Sequelize.ENUM("Appetizer", "Entree", "Drink", "Dessert"),
    allowNull: false,
  },
  assets: {
    type: Sequelize.JSON,
  },
});

module.exports = Product;
