import React, {Component} from 'react';
import {Link} from 'react-router';


export default function Navbar() {
  return (
    <div className="navbar navbar-fixed-top shadow" role="navigation">
      <Link
        to="/"
        className="navbar-brand">
        <img
          src="/busTrackerOutline.png"
          alt="bus tracker logo"
        />
        Astoot Commute
      </Link>
    </div>
  );
}
        // <div className="collapse navbar-collapse">
        //   <ul className="nav navbar-nav">
        //     <li className="active"><a href="/login">Login</a></li>
        //     <li><a href="/about">About</a></li>
        //     <li><a href="/contact">Contact</a></li>
        //   </ul>
        // </div>