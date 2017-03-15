import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {TweenLite, TimelineLite} from 'gsap';

class Directions extends React.Component {

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
    const selectedRoute = this.props.selectedRoute;
    const directions = selectedRoute.directions;

    return (
      <div className="tracker-container">
        <div className="heading-container">
          {`${selectedRoute.routeNumber} ${selectedRoute.name}`}
        </div>
        <div className="item-container col-xs-10 col-sm-8 col-md-6 ">
          {
            directions && directions.map(direction => (
              <Link
                to={`/routes/${selectedRoute.routeNumber}/${direction}`}
                className="list-group-item"
                key={direction}>
                  {direction}
              </Link>
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
  };
}

export default connect(mapStateToProps)(Directions);
