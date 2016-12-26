
import Routes from '../components/Routes';

import {connect} from 'react-redux';

function mapStateToProps(state, ownProps) {
  return {
    routes: state.routes

  }
}

function mapDispatchToProps(dispatch, ownProps) {

  return {

  };
}

const RoutesContainer = connect(mapStateToProps, mapDispatchToProps)(Routes);

export default RoutesContainer;