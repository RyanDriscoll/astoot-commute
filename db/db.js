'use strict';
const chalk = require('chalk');
const Sequelize = require('sequelize');
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/astoot';

console.log(chalk.yellow('Opening connection to PostgreSQL'));

// create the database instance
module.exports = new Sequelize(DATABASE_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: true // lets Sequelize know we can use pg-native for ~30% more speed
});
