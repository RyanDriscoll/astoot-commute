import React from 'react';
import {connect} from 'react-redux';
import FilterInput from '../components/FilterInput';
import Stops from '../components/Stops';

class FilterableStopsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    const inputValue = this.state.inputValue;
    const route = this.props.selectedRoute;
    const direction = this.props.direction;
    const filteredStops = this.props.stops.filter(stop => {
      return stop.name.toLowerCase().match(inputValue.toLowerCase())
    });

    return (
      <div className="tracker-container">
        <div className="heading-container">
          {`${route.routeNumber} ${route.name} ${direction}`}
          <FilterInput
            handleChange={this.handleChange}
            inputValue={inputValue}
          />
        </div>
        <Stops
          stops={filteredStops}
          direction={direction}
          selectedRoute={route}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    selectedRoute: state.cta.selectedRoute,
    direction: state.cta.direction,
    stops: state.cta.stops
  }
}

// function mapDispatchToProps(dispatch, ownProps) {
//   return {};
// }

export default connect(mapStateToProps)(FilterableStopsContainer);
