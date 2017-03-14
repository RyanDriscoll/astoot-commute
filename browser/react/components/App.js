import React from 'react';

import Navbar from './Navbar';

export default function App(props) {
  return (
    <div id="main-container">
      <Navbar />
      <div className="main">
        {
          props.children && React.cloneElement(props.children, props)
        }
      </div>
    </div>
  );
}
