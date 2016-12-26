import {connect} from 'react-redux';
import Stops from '../components/Stops';

function mapStateToProps(state, ownProps) {
  return {
    selectedRoute: state.selectedRoute,
    stops: state.stops
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const StopsContainer = connect(mapStateToProps, mapDispatchToProps)(Stops);

export default StopsContainer;
