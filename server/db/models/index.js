const Sequelize = require("sequelize");
const db = require("../db");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const User = require("./User");
const Product = require("./Product");
const Restaurant = require("./Restaurant");
const Bill = require("./Bill");

const orderThroughTable = { through: OrderItem };

Restaurant.hasMany(Product);
Product.belongsTo(Restaurant);

Order.belongsToMany(Product, orderThroughTable);
Product.belongsToMany(Order, orderThroughTable);

Bill.hasMany(Order);
Order.belongsTo(Bill);

User.belongsToMany(Bill, { through: "user-bill" });
Bill.belongsTo(User);

Restaurant.hasMany(Bill);
Bill.belongsTo(Restaurant);

module.exports = {
  db,
  Restaurant,
  Order,
  OrderItem,
  User,
  Product,
  Bill,
};
