const db = require('../db');
const Sequelize = db.Sequelize;

module.exports = db.define('stop', {
  routeNumber: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  stopId: {
    type: Sequelize.STRING
  },
  direction: {
    type: Sequelize.STRING
  },
  lat: {
    type: Sequelize.FLOAT
  },
  lon: {
    type: Sequelize.FLOAT
  }
});
