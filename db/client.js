const { Sequelize } = require('sequelize');
const client = new Sequelize(
    process.env.DB_NAME, //database name
    process.env.DB_USERNAME, //postgres server username
    process.env.DB_PASSWORD, { //postgres server password
    host: 'localhost',
    dialect: 'postgres'
  });


module.exports = client