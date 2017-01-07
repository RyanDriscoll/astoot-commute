import React from 'react';
import store from '../store';

import TransitionGroup from 'react-addons-transition-group';
import TweenLite from 'gsap';
import ReactDOM from 'react-dom';
const {findDOMNode} = ReactDOM;

class Arrival extends React.Component {
  constructor(props) {

    super(props);

    this.state = Object.assign({
      arrivals: [],
      errorMsg: ''
    }, store.getState());

    this.predictionHandler = this.predictionHandler.bind(this);
  }

  componentDidMount(callback) {
    const el = findDOMNode(this);
    TweenLite.fromTo(el, 1, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback});
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  shouldComponentUpdate(nextProps, nextState){
    // return a boolean value
    if (nextProps.arrival.prdctdn === this.props.arrival.prdctdn) return false;
    return true;
  }

  componentWillUpdate(nextProps, nextState){
    // perform any preparations for an upcoming update
    const el = findDOMNode(this);
    TweenMax.fromTo(el, 1, {y: 100, opacity: 0}, {y: 0, opacity: 1});
  }

  componentWillEnter (callback) {
    const el = findDOMNode(this);
    TweenMax.fromTo(el, 1, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback});
  }

  componentWillLeave (callback) {
    const el = findDOMNode(this);
    TweenMax.fromTo(el, 1, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback});
  }

  predictionHandler(arrival) {
    // const arrival = this.state.arrivals[index];
    const arr = arrival.prdtm.split(' ');
    let arrivalTime = `${arr[0].slice(0,4)}/${arr[0].slice(4,6)}/${arr[0].slice(6)} ${arr[1]}`
    const estimate = Math.floor((new Date(arrivalTime) - new Date())/ 1000/ 60);
    const delay = `Experiencing delays: best estimate for arrival in ${estimate} minutes`;
    return arrival.dly ?
      <span>{delay}</span>
      :
      arrival.prdctdn === 'DUE' ?
        <span>Due</span>
        :
        <span>{arrival.prdctdn} minutes</span>
  }

  render () {
    return (
      <div className="col-xs-12 col-sm-12 col-md-4">
        <div className="list-group-item" >
          <h2><span>{this.predictionHandler(this.props.arrival)}</span></h2>
        </div>
      </div>
    )
  }
}

export default Arrival;