import React from 'react';
import FilterInput from '../components/FilterInput';
import Routes from '../components/Routes';
import {connect} from 'react-redux';


import store from '../store';

class FilterableRoutesContainer extends React.Component {

  constructor(props) {

    super(props);

    // this.state = Object.assign({
    //   inputValue: ''
    // }, store.getState());
    this.state = {
      inputValue: ''
    };

    this.handleChange = this.handleChange.bind(this);

  }

  // componentDidMount() {
  //   this.unsubscribe = store.subscribe(() => {
  //     this.setState(store.getState());
  //   });
  // }

  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

  handleChange(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    const inputValue = this.state.inputValue;
    const filteredRoutes = this.props.routes.filter(route => {
      return route.name.toLowerCase().match(inputValue.toLowerCase()) ||
      route.routeNumber.match(inputValue);
    });

    return (
      <div className="tracker-container">
        Select a route
        <FilterInput
          handleChange={this.handleChange}
          inputValue={inputValue}
        />
        <Routes routes={filteredRoutes}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    routes: state.cta.routes
  };
}

export default connect(mapStateToProps)(FilterableRoutesContainer);
