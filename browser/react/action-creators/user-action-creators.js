import axios from 'axios';

import {SET_CURRENT_USER} from '../constants';


export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
})

export const login = (user) => {
  return (dispatch) => {
    axios.post(`/api/routes/${routeId}/${direction}`)
    .then(res => res.data)
    .then(stops => dispatch(setCurrentUser(user)))
    .catch(err => {
      console.error(err.stack);
    });
  }
}