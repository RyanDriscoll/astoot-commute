const express = require('express');
const router = express.Router();
const axios = require('axios');
const request = require('request-promise');
module.exports = router;

const ApiKey = require('../secret');
const ctaApiPrefix = 'http://www.ctabustracker.com/bustime/api/v2/';
const format = '&format=json';

// get all routes
router.get('/routes', (req, res, next) => {
  axios.get(`${ctaApiPrefix}getroutes?key=${ApiKey}${format}`)
  .then(response => response.data)
  .then(routes => res.send(routes))
  .catch(next);
});

// get route directions
router.get('/routes/:route', (req, res, next) => {
  axios.get(`${ctaApiPrefix}getdirections?key=${ApiKey}&rt=${req.params.route}${format}`)
  .then(response => response.data)
  .then(directions => res.send(directions))
  .catch(next);
});

// get stops
router.get('/routes/:route/:direction', (req, res, next) => {
  axios.get(`${ctaApiPrefix}getstops?key=${ApiKey}&rt=${req.params.route}&dir=${req.params.direction}${format}`)
  .then(response => response.data)
  .then(stops => res.send(stops))
  .catch(next);
});

// get arrival predictions
router.get('/routes/:route/:direction/:stops/:arrivals', (req, res, next) => {
  axios.get(`${ctaApiPrefix}getpredictions?key=${ApiKey}&stpid=${req.params.arrivals}${format}`)
  .then(response => response.data)
  .then(arrivals => res.send(arrivals))
  .catch(next);
});


router.use(function (req, res) {
  res.status(404).end();
});
