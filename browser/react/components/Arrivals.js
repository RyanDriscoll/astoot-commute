import React from 'react';
import store from '../store';
import axios from 'axios';

class Arrivals extends React.Component {

  constructor(props) {

    super(props);

    this.state = Object.assign({
      arrivals: [],
      errorMsg: ''
    }, store.getState());
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    const routeId = this.props.params.routeId;
    const stopId = this.props.params.stopId;
    this.getArrivals(routeId, stopId);
    this.timerId = setInterval(
      () => this.getArrivals(routeId, stopId), 1000*30);
  }

  componentWillUnmount() {
    this.unsubscribe();
    clearInterval(this.timerId);
  }

  getArrivals(routeId, stopId) {
    axios.get(`/api/arrivals/${routeId}/${stopId}`)
    .then(res => res.data['bustime-response'])
    .then(arrivalsObj => {
      console.log(arrivalsObj);
        let arrivals, errorMsg
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
    const routeNumber = this.props.params.routeId;
    const direction = this.props.params.direction;
    const upcomingArrivals = `Route ${routeNumber} ${direction} arriving in: `

    return (
      <div>
        <h1><span>{arrivals.length? upcomingArrivals : errorMsg}</span></h1>
        {
          arrivals.length && arrivals.map(arrival => (
            <div className="col-xs-12 col-sm-6 col-md-4" key={arrival.vid}>
              <div className="list-group-item" >
                <h2><span>{arrival.prdctdn} minutes</span></h2>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default Arrivals;