import {
  RECEIVE_BUS_ROUTES,
  RECEIVE_BUS_ROUTE,
  RECEIVE_BUS_STOPS,
  RECEIVE_ARRIVALS
} from '../constants';

import {combineReducers} from 'redux';
import ctaReducer from './cta-reducer';
import userReducer from './user-reducer';

export default combineReducers({
  cta: ctaReducer,
  user: userReducer
});