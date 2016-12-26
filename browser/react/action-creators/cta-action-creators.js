import axios from 'axios';
import {RECEIVE_BUS_ROUTES, RECEIVE_BUS_ROUTE, RECEIVE_BUS_STOPS} from '../constants';


export const receiveRoutes = routes => ({
  type: RECEIVE_BUS_ROUTES,
  routes
})

export const receieveSelectedRoute = route => ({
  type: RECEIVE_BUS_ROUTE,
  selectedRoute: route
})

export const receiveStops = (stops, direction) => {
  return {
  type: RECEIVE_BUS_STOPS,
  stops,
  direction
  }
}

export const loadAllRoutes = () => {
  return (dispatch) => {
    // if (cachedRoutes.length) {
    //   return dispatch(receiveRoutes(cachedRoutes));
    // }
    axios.get('/api/routes')
    .then(res => res.data)
    .then(routes => {
      // cachedRoutes = routes;
      return dispatch(receiveRoutes(routes))
    })
    .catch(err => {
      console.error(err);
    });
  }
}

export const loadSelectedRoute = (routeId) => {
  return (dispatch) => {
    axios.get(`/api/routes/${routeId}`)
    .then(res => res.data)
    .then(route => dispatch(receieveSelectedRoute(route)))
    .catch(err => {
      console.error(err.stack);
    });
  }
}

export const loadStops = (routeId, direction) => {
  return (dispatch) => {
    axios.get(`/api/routes/${routeId}/${direction}`)
    .then(res => res.data)
    .then(stops => dispatch(receiveStops(stops, direction)))
    .catch(err => {
      console.error(err.stack);
    });
  }
}

// const getRouteWithDirections = routeId => {
//   const promiseForAllRoutes = axios.get(`/api/routes/${routeId}`)
//   const promiseForDirArray = axios.get(`/api/routes/${routeId}`)
//   if (cachedRoutes.length) {
//     return promiseForDirArray
//     .then(res => res.data.directions)
//     .then(dirObj => {
//       return filterRoutes(cachedRoutes, dirObj, routeId);
//     });
//   } else {
//     return Promise.all([promiseForAllRoutes, promiseForDirArray])
//     .then(result => {
//       const allRoutes = result[0].data;
//       const dirObj = result[1].data.directions;
//       return filterRoutes(allRoutes, dirObj, routeId);
//     });
//   }
// }

// const filterRoutes = (routesArr, dirObj, routeId) => {
//   const newRoute = routesArr.filter(dirObj => {
//     return dirObj.rt === routeId;
//   })[0];
//   newRoute.directions = dirObj;
//   return newRoute;
// }

// const addSetsOfStops = (route, dispatch) => {
//   const dir1 = axios.get(`/api/routes/${route.rt}/${route.directions[0].dir}`);
//   const dir2 = axios.get(`/api/routes/${route.rt}/${route.directions[1].dir}`);
//   return Promise.all([dir1, dir2])
//   .then(setsOfStops => {
//     route.directions[0].stops = setsOfStops[0].data['bustime-response'].stops;
//     route.directions[1].stops = setsOfStops[1].data['bustime-response'].stops;
//     dispatch(receieveSelectedRoute(route));
//   })
//   .catch(err => {
//     console.error(err);
//   });
// }

// export const loadStops = (routeId, direction) => {
//   return (dispatch) => {
//     axios.get(`/api/routes/${routeId}/${direction}`)
//     .then(res => res.data['bustime-response'].stops)
//     .then(stops => {
//       const newRoute = cachedRoutes.filter(route => {
//         return route.rt === routeId;
//       })[0];
//       newRoute.stops = stops;
//       return newRoute;
//     })
//     .then(routeWithStops => dispatch(receiveStops(routeWithStops)))
//     .catch(err => {
//       console.error(err.stack);
//     });
//   }
// }


