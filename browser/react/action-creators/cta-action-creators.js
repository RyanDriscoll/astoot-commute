import axios from 'axios';
import {RECEIVE_BUS_ROUTES} from '../constants';


export const receiveRoutes = routes => ({
  type: RECEIVE_BUS_ROUTES,
  routes
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