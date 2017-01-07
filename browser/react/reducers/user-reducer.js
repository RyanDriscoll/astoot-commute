import {
  SET_CURRENT_USER
} from '../constants';

const initialState = {
  user: {}
};

export default function (state = initialState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case SET_CURRENT_USER:
      newState.user = action.routes;
      break;

    default:
      return state;

  }

  return newState;

}