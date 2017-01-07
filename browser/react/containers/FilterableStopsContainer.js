import React from 'react';
import FilterInput from '../components/FilterInput';
import Stops from '../components/Stops';

import store from '../store';

class FilterableStopsContainer extends React.Component {

  constructor(props) {

    super(props);

    this.state = Object.assign({
      inputValue: ''
    }, store.getState());

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    const inputValue = this.state.inputValue;
    const route = this.state.cta.selectedRoute;
    const direction = this.state.cta.direction;
    const filteredStops = this.state.cta.stops.filter(stop => {
      return stop.name.toLowerCase().match(inputValue.toLowerCase())
    });

    return (
      <div>
        <h1><span>{route.routeNumber}</span>  <span>{route.name}</span>  <span>{direction}</span></h1>
        <FilterInput
          handleChange={this.handleChange}
          inputValue={inputValue}
        />
        <Stops
          stops={filteredStops}
          direction={direction}
          selectedRoute={route} />
      </div>
    );
  }
}

export default FilterableStopsContainer;