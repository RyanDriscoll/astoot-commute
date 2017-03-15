import React from 'react';
import Route from './Route';
import {TweenLite, TimelineLite} from 'gsap';


class Routes extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(function() {
      const elArray = [];
      const elements = document.querySelectorAll('.list-group-item');
      for (let i = 0; i < elements.length; i++) {
        elArray.push(elements[i])
      }
      this.tl = new TimelineLite()
      .staggerFromTo(elArray, 0.2, {x: 100, autoAlpha: 0}, {x: 0, autoAlpha: 1, display: 'flex', ease: Power2.easeOut}, 0.1)
    }, 300);
  }

  render() {
    const routes = this.props.routes.sort((a,b) => {
      return +a.routeNumber.match(/\d+/)[0] - +b.routeNumber.match(/\d+/)[0];
    });

    return (
      <div className="item-container col-xs-10 col-sm-8 col-md-6 ">
        {
          !!routes.length && routes.map(route => (
            <Route route={route} key={route.routeNumber} />
          ))
        }
      </div>
    );
  }
}

export default Routes;

