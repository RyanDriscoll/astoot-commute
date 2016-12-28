import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRedirect, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import store from './store';
import {loadAllRoutes, loadSelectedRoute, loadStops, loadArrivals} from './action-creators/cta-action-creators';

import App from './components/App';
import Arrivals from './components/Arrivals';

import RoutesContainer from './containers/RoutesContainer';
import FilterableStopsContainer from './containers/FilterableStopsContainer';
import RouteContainer from './containers/RouteContainer';
import FilterableRoutesContainer from './containers/FilterableRoutesContainer';

const onAppEnter = () => {
  store.dispatch(loadAllRoutes());
}

const onSelectedRouteEnter = (nextRouterState) => {
  const routeId = nextRouterState.params.routeId;
  store.dispatch(loadSelectedRoute(routeId));
}

const onStopsEnter = (nextRouterState) => {
  const routeId = nextRouterState.params.routeId;
  const direction = nextRouterState.params.direction;
  store.dispatch(loadStops(routeId, direction));
}

const onArrivalsEnter = (nextRouterState) => {
  const stopId = nextRouterState.params.stopId;
  const routeId = nextRouterState.params.routeId;
  store.dispatch(loadArrivals(routeId, stopId))
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} onEnter={onAppEnter}>
        <IndexRoute component={FilterableRoutesContainer} />
        <Route path="/routes" component={FilterableRoutesContainer} />
        <Route path="/routes/:routeId" component={RouteContainer} onEnter={onSelectedRouteEnter} />
        <Route path="/routes/:routeId/:direction" component={FilterableStopsContainer} onEnter={onStopsEnter} />
        <Route path="/arrivals/:routeId/:direction/:stopId" component={Arrivals} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={hashHistory}>
//       <Route path="/" component={App} onEnter={onAppEnter}>
//         <IndexRoute component={FilterableRoutesContainer} />
//         <Route path="/routes" component={FilterableRoutesContainer}>
//           <Route path="/routes/:routeId" component={RouteContainer} onEnter={onSelectedRouteEnter}>
//             <Route path="/routes/:routeId/:direction" component={FilterableStopsContainer} onEnter={onStopsEnter}>
//               <Route path="/routes/:routeId/:direction/arrivals" component={Arrivals} onEnter={onArrivalsEnter} />
//             </Route>
//           </Route>
//         </Route>
//       </Route>
//     </Router>
//   </Provider>,
//   document.getElementById('app')
// );