import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRedirect, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import store from './store';
import {loadAllRoutes} from './action-creators/cta-action-creators';

import App from './components/App';

import RoutesContainer from './containers/RoutesContainer';

const onRoutesEnter = () => {
  store.dispatch(loadAllRoutes());
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/routes" />
        <Route path="/routes" component={RoutesContainer} onEnter={onRoutesEnter}/>

      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);