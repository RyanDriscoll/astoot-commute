import {
  RECEIVE_BUS_ROUTES,
  RECEIVE_BUS_ROUTE,
  RECEIVE_BUS_STOPS,
  RECEIVE_BUS_STOP,
  RECEIVE_ARRIVALS
} from '../constants';

const initialState = {
  selectedRoute: {},
  routes: [],
  stops: [],
  selectedStop: {},
  direction: ''
};

export default function (state = initialState, action) {

  const newState = Object.assign({}, state);
  switch (action.type) {

    case RECEIVE_BUS_ROUTES:
      newState.routes = action.routes;
      break;

    case RECEIVE_BUS_ROUTE:
      newState.selectedRoute = action.selectedRoute;
      break;

    case RECEIVE_BUS_STOPS:
      newState.stops = action.stops;
      newState.direction = action.direction;
      break;

    case RECEIVE_BUS_STOP:
      newState.selectedStop = action.selectedStop;
      break;

    case RECEIVE_ARRIVALS:
      newState.arrivalsObj = action.arrivalsObj;
      break;

    default:
      return state;

  }

  return newState;

}