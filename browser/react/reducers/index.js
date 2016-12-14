import {
  RECEIVE_BUS_ROUTES,
  RECEIVE_BUS_ROUTE
} from '../constants';

const initialState = {
  selectedRoute: {},
  routes: []
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

    default:
      return state;

  }

  return newState;

}