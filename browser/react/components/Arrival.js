import React from 'react';
import store from '../store';
import {fadesUp} from './animation-components';

import TransitionGroup from 'react-addons-transition-group';
// import ReactDOM from 'react-dom';

const Arrival = fadesUp(class extends React.Component {
  constructor(props) {

    super(props);

    this.state = Object.assign({
      arrivals: [],
      errorMsg: ''
    }, store.getState());

    this.predictionHandler = this.predictionHandler.bind(this);
  }

  componentDidMount() {
    // const el = findDOMNode(this);
    // TweenLite.fromTo(el, 1, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback});
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  shouldComponentUpdate(nextProps){
    console.log('is it in shouldComponentUpdate?', nextProps.arrival.prdctdn, this.props.arrival.prdctdn)
    if (nextProps.arrival.prdctdn === this.props.arrival.prdctdn) return false;
    return true;
  }

  // componentWillUpdate(nextProps, nextState){
  //   const el = findDOMNode(this);
  //   TweenLite.fromTo(el, 0.3, {y: 0, opacity: 1}, {y: 100, opacity: 0, onComplete: () => {
  //     TweenLite.fromTo(el, 1, {y: -100, opacity: 0, color: 'blue'}, {y: 0, opacity: 1, color: 'black'});
  //     }
  //   });
  // }

  // componentWillEnter (callback) {
  //   const el = findDOMNode(this);
  //   TweenMax.fromTo(el, 1, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback});
  // }

  // componentWillLeave (callback) {
  //   const el = findDOMNode(this);
  //   TweenMax.fromTo(el, 1, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback});
  // }

  predictionHandler(arrival) {
    const arr = arrival.prdtm.split(' ');
    let arrivalTime = `${arr[0].slice(0,4)}/${arr[0].slice(4,6)}/${arr[0].slice(6)} ${arr[1]}`
    const estimate = Math.floor((new Date(arrivalTime) - new Date())/ 1000/ 60);
    const delay = `Experiencing delays: best estimate for arrival in ${estimate} minutes`;
    if (arrival.dly) return <span>{delay}</span>;
    else {
      if (arrival.prdctdn === 'DUE') {
        return <span>Due</span>;
      } else if (arrival.prdctdn === '1') {
        return <span>{arrival.prdctdn} minute</span>
      } else {
        return <span>{arrival.prdctdn} minutes</span>
      }
    }
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
})

export default Arrival;