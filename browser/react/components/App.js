import React, {Component} from 'react';

export default (props) => {
  console.log(props.children);
  return (
    <div id="main" className="container-fluid">
      <h1>Hello</h1>
      <div className="col-xs-12">
        {
          props.children && React.cloneElement(props.children, props)
        }
      </div>
    </div>
  );
}