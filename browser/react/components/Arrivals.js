import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Arrival from './Arrival';

class Arrivals extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      arrivals: [],
      errorMsg: ''
    };
  }

  componentDidMount() {
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
    console.log('updating arrivals...')
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
    const name = this.props.selectedRoute.name;
    const direction = this.props.params.direction;
    const upcomingArrivals = `${routeNumber} ${name} ${direction}: `;

    return (
      <div className="tracker-container">
        {arrivals.length ? upcomingArrivals : errorMsg}
          {
            !!arrivals.length && arrivals.map((arrival, i)=> (
              <Arrival arrival={arrival} index={i} key={arrival.vid} />
            ))
          }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    selectedRoute: state.cta.selectedRoute
  };
}

export default connect(mapStateToProps)(Arrivals);

// <TransitionGroup key={arrival.vid}>
//                 <div className="col-xs-12 col-sm-12 col-md-4" >
//                   <div className="list-group-item" >
//                     <h2><span>{this.predictionHandler(i)}</span></h2>
//                   </div>
//                 </div>
//               </TransitionGroup>