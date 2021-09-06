const db = require("../db");
const Sequelize = require("sequelize");

const Restaurant = db.define("restaurant", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imgUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tables: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false,
  }
});

module.exports = Restaurant;
