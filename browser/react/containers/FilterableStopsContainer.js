import React from 'react';
import {connect} from 'react-redux';
import FilterInput from '../components/FilterInput';
import Stops from '../components/Stops';
import {TweenLite, TimelineLite} from 'gsap';

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

  componentDidMount() {
    setTimeout(function() {
      const element = document.querySelector('.heading-container');
      TweenLite
      .fromTo(element, 0.5, {x: -100, autoAlpha: 0}, {x: 0, autoAlpha: 1, display: 'flex', ease: Power2.easeOut});

      const elArray = [];
      const elements = document.querySelectorAll('.list-group-item');
      for (let i = 0; i < elements.length; i++) {
        elArray.push(elements[i])
      }
      this.tl = new TimelineLite()
      .staggerFromTo(elArray, 0.2, {x: 100, autoAlpha: 0}, {x: 0, autoAlpha: 1, display: 'flex', ease: Power2.easeOut}, 0.1)
    }, 100);
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
        <div className="heading-container col-xs-10 col-sm-8 col-md-6">
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
