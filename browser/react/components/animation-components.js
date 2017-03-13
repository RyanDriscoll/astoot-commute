import React from 'react';
import {findDOMNode} from 'react-dom';
import {TweenLite} from 'gsap';

export const fadesUp = (Component) => {
  return class FadesUp extends React.Component {
    // componentWillEnter (callback) {
    //   const el = findDOMNode(this);
    //   TweenLite.fromTo(el, 0.3, {
    //     y: 100,
    //     opacity: 0
    //   }, {
    //     y: 0,
    //     opacity: 1,
    //     onComplete: callback
    //   });
    // }

    // componentWillLeave (callback) {
    //   const el = findDOMNode(this);
    //   TweenLite.fromTo(el, 0.3, {
    //     y: 0,
    //     opacity: 1
    //   }, {
    //     y: -100,
    //     opacity: 0,
    //     onComplete: callback
    //   });
    // }
    shouldComponentUpdate(nextProps, nextState){
      console.log('in animation-components')
      if (JSON.stringify(nextProps) === JSON.stringify(this.state) ) return false;
      return true;
    }

    componentDidUpdate(nextProps, nextState){
      const el = findDOMNode(this);
      TweenLite.fromTo(el, 0.3, {
        y: 0,
        opacity: 1
      }, {
        y: 100,
        opacity: 0,
        onComplete: () => {
          TweenLite.fromTo(el, 1, {
            y: -100,
            opacity: 0,
            color: 'blue'
          }, {
            y: 0,
            opacity: 1,
            color: 'black'
          });
        }
      });
    }

    render () {
      return <Component ref="child" {...this.props} />;
    }
  };
};
