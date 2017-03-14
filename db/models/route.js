const db = require('../db');
const Sequelize = db.Sequelize;
const axios = require('axios');
const ApiKey = process.env.cta_api_key || require('../../secret');
const ctaApiPrefix = 'http://www.ctabustracker.com/bustime/api/v2/';
const format = '&format=json';

const Stop = require('../../db/models/stop');

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
}, {
  hooks: {
    afterCreate: function(route) {
      axios.get(`${ctaApiPrefix}getdirections?key=${ApiKey}&rt=${route.routeNumber}${format}`)
      .then(res => res.data['bustime-response'].directions)
      .then(dirArray => dirArray.map(dirObj => dirObj.dir))
      .then(directions => {
        route.update({
          directions
        });
      })
      .catch(err => console.error(err.stack));
    },
    afterUpdate: function(route) {
      route.directions.forEach(direction => {
        axios.get(`${ctaApiPrefix}getstops?key=${ApiKey}&rt=${route.routeNumber}&dir=${direction}${format}`)
        .then(response => response.data['bustime-response'].stops)
        .then(stopArray => {
          stopArray.forEach(stop => {
            Stop.create({
              routeNumber: route.routeNumber,
              name: stop.stpnm,
              stopId: stop.stpid,
              direction: direction,
              lat: stop.lat,
              lon: stop.lon
            });
          });
        })
        .catch(err => console.error(err.stack));
      });
    }
  }
});
