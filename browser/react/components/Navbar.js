import React, {Component} from 'react';

export default (props) => {
  return (
    <div>
      <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="navbar-header">
          <a className="navbar-brand" href="/"><img src="/busTrackerOutline.png" alt="bus tracker logo"></img><span>Astoot Commute</span></a>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li className="active"><a href="/login">Login</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}