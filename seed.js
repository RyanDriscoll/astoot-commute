const axios = require('axios');
const ApiKey = process.env.cta_api_key;
const ctaApiPrefix = 'http://www.ctabustracker.com/bustime/api/v2/';
const format = '&format=json';
// const process = require('process');

const Route = require('./db/models/route');
// const Stop = require('./db/models/stop');

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

// const getDirectionsAndCreateRoutes = routes => {
//   const modRoutes = [];
//   const arrayOfPromises = routes.map((route, i) => {
//     axios.get(`${ctaApiPrefix}getdirections?key=${ApiKey}&rt=${route.rt}${format}`);

//   });
//   Promise.all(arrayOfPromises)
//   .then((array) => {
//     array.forEach(res => res.data['bustime-response'].directions)
//     .then(dirArray => {
//       routes[i].directions = dirArray.map(dir => dir.dir);
//       modRoutes.push(routes[i]);
//     })
//     .catch(err => console.error(err.stack));
//   });
//   // console.log('routes$$$$$$$$$$$', routes);
//   console.log(modRoutes);
//   return modRoutes;
// };
  // Promise.all(ArrayOfPromisesForDirections)
  //   .then(directionsArray => directionsArray.map((dirObj) => dirObj.data['bustime-response'].directions))
  //   .then(dirArray => {
  //     dirArray.map((dirObj, i) => {
  //       let newRoute = {
  //         name: routes[i].rtnm,
  //         routeNumber: routes[i].rt,
  //         color: routes[i].rtclr,
  //         directions: dirArray.map(dir => dir.dir)
  //       };
  //       return newRoute;

  //     })
  //   });


// getRoutes().then(routes => getDirectionsAndCreateRoutes(routes));


// const seedDb = () => {
//   axios.get(`${ctaApiPrefix}getroutes?key=${ApiKey}${format}`)
//   .then(response => response.data['bustime-response'].routes)
//   .then(routes => {
//     routes.forEach(route => {
//       axios.get(`${ctaApiPrefix}getdirections?key=${ApiKey}&rt=${route.rt}${format}`)
//       .then(response => response.data['bustime-response'].directions)
//       .then(dirArray => {
//         let newRoute = {
//           name: route.rtnm,
//           routeNumber: route.rt,
//           color: route.rtclr,
//           directions: dirArray.map(dirObj => dirObj.dir)
//         };
//         return Promise.resolve(newRoute);
//       })
//       .then(rt => Route.create(rt))
//       .then(createdRoute => {
//         createdRoute.directions.forEach(dir => {
//           axios.get(`${ctaApiPrefix}getstops?key=${ApiKey}&rt=${createdRoute.routeNumber}&dir=${dir}${format}`)
//           .then(response => response.data['bustime-response'].stops)
//           .then(stopArray => {
//             stopArray.forEach(stop => {
//               Stop.create({
//                 routeNumber: createdRoute.routeNumber,
//                 name: stop.stpnm,
//                 stopId: stop.stpid,
//                 direction: dir,
//                 lat: stop.lat,
//                 lon: stop.lon
//               });
//             });
//           });
//         });
//       })
//       .catch(err => console.error(err.stack));
//     });
//   })
//   .catch(err => console.error(err.stack))
// };

// seedDb();


  // .then((what) => {
//   console.log('in route.findall', what);
//   Route.findOne({where: {routeNumber: "50"}})
//   .then(routes => {
//     console.log(routes);
//     routes.forEach(route => {
//       route.directions.forEach(dir => {
//         axios.get(`${ctaApiPrefix}getstops?key=${ApiKey}&rt=${route.routeNumber}&dir=${dir}${format}`)
//         .then(response => response.data['bustime-response'].stops)
//         .then(stopArray => {
//           stopArray.forEach(stop => {
//             console.log(stop);
//             Stop.create({
//               name: stop.stpnm,
//               stopId: stop.stpid,
//               direction: dir,
//               lat: stop.lat,
//               lon: stop.lon
//             });
//           });
//         });
//       });
//     });
//   });
// })
