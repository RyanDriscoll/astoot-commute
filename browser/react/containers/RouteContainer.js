import Route from '../components/Route';
import {connect} from 'react-redux';

function mapStateToProps(state, ownProps) {
  return {
    selectedRoute: state.cta.selectedRoute
  }
}

function mapDispatchToProps(dispatch, ownProps) {

  return {

  };
}

const RouteContainer = connect(mapStateToProps, mapDispatchToProps)(Route);

export default RouteContainer;