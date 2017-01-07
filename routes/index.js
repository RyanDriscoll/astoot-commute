const express = require('express');
const router = express.Router();
const axios = require('axios');
const ApiKey = require('../secret');
const ctaApiPrefix = 'http://www.ctabustracker.com/bustime/api/v2/';
const format = '&format=json';

const Route = require('../db/models').Route;
const Stop = require('../db/models').Stop;
const User = require('../db/models').User;

module.exports = router;

// get all routes
router.get('/routes', (req, res, next) => {
  Route.findAll()
  .then(routes => res.json(routes))
  .catch(next);
});

// get selected route
router.get('/routes/:route', (req, res, next) => {
  Route.findOne({
    where: {
      routeNumber: req.params.route
    }
  })
  .then(route => res.json(route))
  .catch(next);
});

// get stops
router.get('/routes/:route/:direction', (req, res, next) => {
  Stop.findAll({
    where: {
      routeNumber: req.params.route,
      direction: req.params.direction
    }
  })
  .then(stops => res.json(stops))
  .catch(next);
});

// get arrival predictions
router.get('/arrivals/:routeId/:stopId', (req, res, next) => {
  axios.get(`${ctaApiPrefix}getpredictions?key=${ApiKey}&rt=${req.params.routeId}&stpid=${req.params.stopId}${format}`)
  .then(response => response.data)
  .then(arrivals => res.json(arrivals))
  .catch(next);
});

// log in user
router.post('/login', (req, res, next) => {
  // very strange body parsing bug
  req.body = JSON.parse(Object.keys(req.body)[0]);
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
  .then(user => {
    if (!user) {
      res.sendStatus(401);
    } else {
      req.session.userId = user.id;
      res.sendStatus(204);
    }
  })
  .catch(next);
});



router.use(function (req, res) {
  res.status(404).end();
});
