import React from 'react';
import FilterInput from '../components/FilterInput';
import Routes from '../components/Routes';
import {connect} from 'react-redux';
import {TweenLite, TimelineLite} from 'gsap';


class FilterableRoutesContainer extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      inputValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    setTimeout(function() {
      const element = document.querySelector('.heading-container');
      TweenLite
      .fromTo(element, 0.5, {x: -100, autoAlpha: 0}, {x: 0, autoAlpha: 1, display: 'flex', ease: Power2.easeOut})
    }, 100);
  }

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
        <div className="heading-container col-xs-10 col-sm-8 col-md-6">
            Select a route
          <FilterInput
            handleChange={this.handleChange}
            inputValue={inputValue}
          />
        </div>
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
