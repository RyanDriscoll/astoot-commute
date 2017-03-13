const axios = require('axios');
const ApiKey = process.env.cta_api_key;
const ctaApiPrefix = 'http://www.ctabustracker.com/bustime/api/v2/';
const format = '&format=json';

const Route = require('./db/models/route');

const getRoutes = () => {
  return axios.get(`${ctaApiPrefix}getroutes?key=${ApiKey}${format}`)
  .then(response => {
    return response.data['bustime-response'].routes;
  })
  .then(routes => {
    routes.forEach(route => {
      Route.create({
        name: route.rtnm,
        routeNumber: route.rt,
        color: route.rtclr
      });
    });
  })
  .catch(err => console.error(err.stack));
};

getRoutes();
