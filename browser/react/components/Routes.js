import React from 'react';
import {Link} from 'react-router';

export default (props) => {
  const routes = props.routes;
  console.log("!!!!!!!!!", routes)

  return (
    <div>
      <h1>ROUTES</h1>
      {
        routes && routes.map(route => (
          <div className="col-xs-12" key={route.rt}>
            <h5><span>{route.rt}</span>  <span>{route.rtnm}</span></h5>
          </div>
        ))
      }
    </div>
  )
}