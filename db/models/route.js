const db = require('../db');
const Sequelize = db.Sequelize;

module.exports = db.define('route', {
  name: {
    type: Sequelize.STRING
  },
  routeNumber: {
    type: Sequelize.STRING
  },
  directions: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  color: {
    type: Sequelize.STRING
  }
});
