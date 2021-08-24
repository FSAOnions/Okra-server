const Sequelize = require("sequelize");
const db = require("../db");
const Cart = require("./Cart");
const CartItem = require("./CartItem");
const User = require("./User");
const Product = require("./Product");
const Restaurant = require("./Restaurant");

const cartThroughTable = { through: CartItem };

Restaurant.hasMany(Product);
Product.belongsTo(Restaurant);

Cart.belongsToMany(Product, cartThroughTable);
Product.belongsToMany(Cart, cartThroughTable);

User.hasMany(Cart);
Cart.belongsTo(User);

Restaurant.hasMany(Cart);
Cart.belongsTo(Restaurant);

module.exports = {
  db,
  Restaurant,
  Cart,
  CartItem,
  User,
  Product,
};
