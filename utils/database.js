const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.SCHEMA_NAME,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
