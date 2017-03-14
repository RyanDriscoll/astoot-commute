import React from 'react';
import {TweenLite} from 'gsap';

class Arrival extends React.Component {
  constructor(props) {
    super(props);
    this.predictionHandler = this.predictionHandler.bind(this);
  }

  componentDidMount() {
    TweenLite.fromTo(this.el, 1, {y: 100, opacity: 0}, {y: 0, opacity: 1});
  }

  shouldComponentUpdate(nextProps){
    console.log('is it in shouldComponentUpdate?', nextProps.arrival.prdctdn, this.props.arrival.prdctdn)
    if (nextProps.arrival.prdctdn === this.props.arrival.prdctdn) return false;
    return true;
  }

  componentWillUpdate(nextProps, nextState){
    TweenLite.fromTo(this.el, 0.3, {y: 0, opacity: 1}, {y: 100, opacity: 0, onComplete: () => {
      TweenLite.fromTo(this.el, 1, {y: -100, opacity: 0, color: 'blue'}, {y: 0, opacity: 1, color: 'black'});
      }
    });
  }

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
      <div
        ref={el => {this.el = el;}}
        className="list-group-item">
        {this.predictionHandler(this.props.arrival)}
      </div>
    )
  }
}

export default Arrival;
