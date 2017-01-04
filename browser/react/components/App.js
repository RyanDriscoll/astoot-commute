import React, {Component} from 'react';

import Navbar from './Navbar';

export default (props) => {
  return (
    <div id="main" className="container-fluid">
      <Navbar />
      <div className="col-xs-12 app">
        {
          props.children && React.cloneElement(props.children, props)
        }
      </div>
    </div>
  );
}