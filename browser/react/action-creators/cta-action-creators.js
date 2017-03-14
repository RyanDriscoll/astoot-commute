import axios from 'axios';
import {
  RECEIVE_BUS_ROUTES,
  RECEIVE_BUS_ROUTE,
  RECEIVE_BUS_STOPS,
  RECEIVE_ARRIVALS
} from '../constants';


export const receiveRoutes = routes => ({
  type: RECEIVE_BUS_ROUTES,
  routes
});

export const receieveSelectedRoute = route => ({
  type: RECEIVE_BUS_ROUTE,
  selectedRoute: route
});

export const receiveStops = (stops, direction) => ({
  type: RECEIVE_BUS_STOPS,
  stops,
  direction
});

export const receiveArrivals = (arrivalsObj) => ({
  type: RECEIVE_ARRIVALS,
  arrivalsObj
});

export const loadAllRoutes = () => {
  return (dispatch) => {
    axios.get('/api/routes')
    .then(res => res.data)
    .then(routes => dispatch(receiveRoutes(routes)))
    .catch(err => {
      console.error(err);
    });
  };
};

export const loadSelectedRoute = (routeId) => {
  return (dispatch) => {
    axios.get(`/api/routes/${routeId}`)
    .then(res => res.data)
    .then(route => dispatch(receieveSelectedRoute(route)))
    .catch(err => {
      console.error(err.stack);
    });
  };
};

export const loadStops = (routeId, direction) => {
  return (dispatch) => {
    axios.get(`/api/routes/${routeId}/${direction}`)
    .then(res => res.data)
    .then(stops => dispatch(receiveStops(stops, direction)))
    .catch(err => {
      console.error(err.stack);
    });
  };
};

export const loadArrivals = (routeId, stopId) => {
  return (dispatch) => {
    axios.get(`/api/arrivals/${routeId}/${stopId}`)
    .then(res => res.data['bustime-response'])
    .then(arrivalsObj => dispatch(receiveArrivals(arrivalsObj)))
    .catch(err => {
      console.error(err.stack);
    });
  };
};
