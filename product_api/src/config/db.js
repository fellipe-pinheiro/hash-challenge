const Sequelize = require('sequelize');

const database = process.env.POSTGRES_DB;
const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const host = process.env.POSTGRES_HOST;

module.exports = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres',
  logging: false,
  operatorsAliases: 0,
});
