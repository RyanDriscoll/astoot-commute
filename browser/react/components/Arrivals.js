import React from 'react';
import store from '../store';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TransitionGroup from 'react-addons-transition-group';
import TweenLite from 'gsap';
import ReactDOM from 'react-dom';
import Arrival from './Arrival';
const {findDOMNode} = ReactDOM;

class Arrivals extends React.Component {

  constructor(props) {

    super(props);

    this.state = Object.assign({
      arrivals: [],
      errorMsg: ''
    }, store.getState());

    // this.predictionHandler = this.predictionHandler.bind(this);
  }

  componentDidMount(callback) {

    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    const routeId = this.props.params.routeId;
    const stopId = this.props.params.stopId;
    this.getArrivals(routeId, stopId);
    this.timerId = setInterval(
      () => this.getArrivals(routeId, stopId), 1000*10);
  }

  componentWillUnmount() {
    this.unsubscribe();
    clearInterval(this.timerId);
  }

  getArrivals(routeId, stopId) {
    console.log('updating arrivals...')
    axios.get(`/api/arrivals/${routeId}/${stopId}`)
    .then(res => res.data['bustime-response'])
    .then(arrivalsObj => {
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

  // predictionHandler(index) {
  //   const arrival = this.state.arrivals[index];
  //   const arr = arrival.prdtm.split(' ');
  //   let arrivalTime = `${arr[0].slice(0,4)}/${arr[0].slice(4,6)}/${arr[0].slice(6)} ${arr[1]}`
  //   const estimate = Math.floor((new Date(arrivalTime) - new Date())/ 1000/ 60);
  //   const delay = `Experiencing delays: best estimate for arrival in ${estimate} minutes`;
  //   return arrival.dly ?
  //     <span>{delay}</span>
  //     :
  //     arrival.prdctdn === 'DUE' ?
  //       <span>Due</span>
  //       :
  //       <span>{arrival.prdctdn} minutes</span>
  // }

  render() {
    const arrivals = this.state.arrivals;
    const errorMsg = this.state.errorMsg;
    const routeNumber = this.state.cta.selectedRoute.routeNumber;
    const name = this.state.cta.selectedRoute.name;
    const direction = this.props.params.direction;
    const upcomingArrivals = `${routeNumber} ${name} ${direction}: `;

    return (
      <div>
        <h1><span>{arrivals.length ? upcomingArrivals : errorMsg}</span></h1>
          {
            !!arrivals.length && arrivals.map((arrival, i)=> (
              <Arrival arrival={arrival} arrivals={arrivals} index={i} key={arrival.vid} />
            ))
          }
      </div>
    )
  }
}

export default Arrivals;

// <TransitionGroup key={arrival.vid}>
//                 <div className="col-xs-12 col-sm-12 col-md-4" >
//                   <div className="list-group-item" >
//                     <h2><span>{this.predictionHandler(i)}</span></h2>
//                   </div>
//                 </div>
//               </TransitionGroup>