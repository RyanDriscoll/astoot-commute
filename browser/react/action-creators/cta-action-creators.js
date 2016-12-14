import axios from 'axios';
import {RECEIVE_BUS_ROUTES, RECEIVE_BUS_ROUTE} from '../constants';


export const receiveRoutes = routes => ({
  type: RECEIVE_BUS_ROUTES,
  routes
})

export const receieveSelectedRoute = route => ({
  type: RECEIVE_BUS_ROUTE,
  selectedRoute: route
})

export const loadAllRoutes = () => {
  return (dispatch) => {
    axios.get('/api/routes')
    .then(res => res.data['bustime-response'].routes)
    .then(routes => dispatch(receiveRoutes(routes)))
    .catch(err => {
      console.error(err);
    });
  }
}

export const loadSelectedRoute = (routeId) => {
  return (dispatch) => {
    const getAllRoutes = axios.get('/api/routes');
    const getRouteDirections = axios.get(`/api/routes/${routeId}`);

    Promise.all([getAllRoutes, getRouteDirections])
    .then(resArray => {
      const allRoutes = resArray[0].data['bustime-response'].routes;
      const rtDirections = resArray[1].data['bustime-response'].directions;
      const route = allRoutes.filter(route => {
        return (route.rt === routeId);
      })[0];
      route.directions = rtDirections;
      return route;
    })
    .then(selectedRoute => dispatch(receieveSelectedRoute(selectedRoute)))

    // axios.get(`/api/routes/${routeId}`)
    // .then(res => res.data['bustime-response'])
    // .then(route => {
    //   route.routeId = routeId;
    //   return dispatch(receieveSelectedRoute(route));
    // })
    .catch(err => {
      console.error(err);
    });
  }
}


