import React, {Component} from 'react';
import {Link} from 'react-router';
import {TweenLite, TimelineLite} from 'gsap';

class Navbar extends React.Component {

  componentDidMount() {
    setTimeout(function() {
      const element = document.querySelector('.title');
      TweenLite
      .fromTo(element, 1, {x: -300, autoAlpha: 0}, {x: 0, autoAlpha: 1, display: 'flex', ease: Power2.easeOut});
    }, 100);
  }
  render() {
    return (
      <div className="navbar navbar-fixed-top shadow" role="navigation">
        <Link
          to="/"
          className="title">
          <img
            src="/busTrackerOutline.png"
            alt="bus tracker logo"
          />
          astute commute
        </Link>
      </div>
    );
  }
}

export default Navbar;
