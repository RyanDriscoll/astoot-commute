const express = require('express');
const router = express.Router();
const axios = require('axios');

// const ApiKey = require('../secret');
// const ctaApiPrefix = 'http://www.ctabustracker.com/bustime/api/v2/';
// const format = '&format=json';

const Route = require('../db/models/route');
const Stops = require('../db/models/stop');

module.exports = router;

// get all routes
router.get('/routes', (req, res, next) => {
  Route.findAll()
  .then(routes => res.json(routes))

  // axios.get(`${ctaApiPrefix}getroutes?key=${ApiKey}${format}`)
  // .then(response => response.data['bustime-response'].routes)
  // .then(routes => {
  //   routes.forEach(route => {
  //     axios.get(`${ctaApiPrefix}getdirections?key=${ApiKey}&rt=${route.rt}${format}`)
  //     .then(response => response.data['bustime-response'].directions)
  //     .then(dirArray => {
  //       let newRoute = {name: route.rtnm,
  //         routeNumber: route.rt,
  //         color: route.rtclr,
  //         directions: [dirArray[0].dir, dirArray[1].dir]};
  //       console.log(dirArray, newRoute.directions);
  //       return newRoute;
  //     })
  //     .then(rt => Route.create(rt))
  //     .catch(next);
  //   });
  // })
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

// get selected route with directions
// router.get('/routes/:route', (req, res, next) => {
//   axios.get(`${ctaApiPrefix}getdirections?key=${ApiKey}&rt=${req.params.route}${format}`)
//   .then(response => {
//     console.log("!!!!",response.data['bustime-response']);
//     return response.data['bustime-response'];
//   })
//   .then(directions => res.send(directions))
//   .catch(next);
// });

// get stops
router.get('/routes/:route/:direction', (req, res, next) => {
  Stops.findAll({
    where: {
      routeNumber: req.params.route,
      direction: req.params.direction
    }
  })
  .then(stops => res.json(stops))
  // axios.get(`${ctaApiPrefix}getstops?key=${ApiKey}&rt=${req.params.route}&dir=${req.params.direction}${format}`)
  // .then(response => response.data)
  // .then(stops => res.send(stops))
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
