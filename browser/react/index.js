import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRedirect, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import store from './store';
import {loadAllRoutes, loadSelectedRoute} from './action-creators/cta-action-creators';

import App from './components/App';

import RoutesContainer from './containers/RoutesContainer';
import RouteContainer from './containers/RouteContainer';
import FilterableRoutesContainer from './containers/FilterableRoutesContainer';

const onRoutesEnter = () => {
  store.dispatch(loadAllRoutes());
}

const onSelectedRouteEnter = (nextRouterState) => {
  console.log("!!!!!!!!!!!", nextRouterState);
  const routeId = nextRouterState.params.routeId;
  store.dispatch(loadSelectedRoute(routeId));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/routes" />
        <Route path="/routes" component={FilterableRoutesContainer} onEnter={onRoutesEnter} />
        <Route path="/routes/:routeId" component={RouteContainer} onEnter={onSelectedRouteEnter} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);