import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRedirect, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import store from './store';
import {loadAllRoutes, loadSelectedRoute, loadStops, loadArrivals} from './action-creators/cta-action-creators';

import App from './components/App';
import Arrivals from './components/Arrivals';
import SelectedRoute from './components/Route';
import Login from './components/Login';
import FilterableRoutesContainer from './containers/FilterableRoutesContainer';
import FilterableStopsContainer from './containers/FilterableStopsContainer';

function onAppEnter() {
  store.dispatch(loadAllRoutes());
}

function onSelectedRouteEnter(nextRouterState) {
  const routeId = nextRouterState.params.routeId;
  store.dispatch(loadSelectedRoute(routeId));
}

function onStopsOrArrivalsEnter(nextRouterState) {
  const routeId = nextRouterState.params.routeId;
  const direction = nextRouterState.params.direction;
  store.dispatch(loadStops(routeId, direction));
  store.dispatch(loadSelectedRoute(routeId));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={onAppEnter}>
        <IndexRoute component={FilterableRoutesContainer} />
        <Route path="/routes" component={FilterableRoutesContainer} />
        <Route path="/routes/:routeId" component={SelectedRoute} onEnter={onSelectedRouteEnter} />
        <Route path="/routes/:routeId/:direction" component={FilterableStopsContainer} onEnter={onStopsOrArrivalsEnter} />
        <Route path="/arrivals/:routeId/:direction/:stopId" component={Arrivals} onEnter={onStopsOrArrivalsEnter} />
        <Route path="/login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
