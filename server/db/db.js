const Sequelize = require("sequelize");
const config = require("./config");

const db = new Sequelize({
  database: config.database.name,
  username: config.database.username,
  password: config.database.password,
  host: config.database.host,
  port: config.database.port,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = db;
