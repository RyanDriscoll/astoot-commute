import React from 'react';
import FilterInput from '../components/FilterInput';
import Routes from '../components/Routes';

import store from '../store';

class FilterableRoutesContainer extends React.Component {

  constructor() {

    super();

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
    const filteredRoutes = this.state.routes.filter(route => {
      return route.rtnm.toLowerCase().match(inputValue.toLowerCase()) ||
      route.rt.match(inputValue);
    });

    return (
      <div>
        <FilterInput
          handleChange={this.handleChange}
          inputValue={inputValue}
        />
        <Routes routes={filteredRoutes}/>
      </div>
    );
  }
}

export default FilterableRoutesContainer;