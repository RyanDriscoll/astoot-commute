import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Arrival from './Arrival';
import {TweenLite, TimelineLite} from 'gsap';

class Arrivals extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      arrivals: [],
      errorMsg: ''
    };
  }

  componentDidMount() {
    setTimeout(function() {
      const element = document.querySelector('.heading-container');
      TweenLite
      .fromTo(element, 0.5, {x: -100, autoAlpha: 0}, {x: 0, autoAlpha: 1, display: 'flex', ease: Power2.easeOut});
    }, 200);

    const routeId = this.props.params.routeId;
    const stopId = this.props.params.stopId;
    this.getArrivals(routeId, stopId);
    this.timerId = setInterval(
      () => this.getArrivals(routeId, stopId), 1000 * 10);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  getArrivals(routeId, stopId) {
    axios.get(`/api/arrivals/${routeId}/${stopId}`)
    .then(res => res.data['bustime-response'])
    .then(arrivalsObj => {
        let arrivals, errorMsg;
        if (arrivalsObj.prd) arrivals = arrivalsObj.prd;
        if (arrivalsObj.error) errorMsg = arrivalsObj.error.map(err => err.msg).join(', ');
        this.setState({
        arrivals: arrivals || [],
        errorMsg: errorMsg || ''
      })
    })
    .catch(err => {
      console.error(err.stack);
    });
  }

  render() {
    const arrivals = this.state.arrivals;
    const errorMsg = this.state.errorMsg;
    const routeNumber = this.props.selectedRoute.routeNumber;
    const routeName = this.props.selectedRoute.name;
    const stopName = this.props.selectedStop.name;
    const direction = this.props.params.direction;
    const upcomingArrivals = `${routeNumber} ${routeName} ${direction}: `;

    return (
      <div className="tracker-container">
        <div className="heading-container col-xs-10 col-sm-8 col-md-6">
          {arrivals.length ? upcomingArrivals : errorMsg}<br />
          {stopName}
        </div>
        <div className="item-container col-xs-10 col-sm-8 col-md-6">
          {
            !!arrivals.length && arrivals.map((arrival, i)=> (
              <Arrival arrival={arrival} index={i} key={arrival.vid} />
            ))
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    selectedRoute: state.cta.selectedRoute,
    selectedStop: state.cta.selectedStop
  };
}

export default connect(mapStateToProps)(Arrivals);
