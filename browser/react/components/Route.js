import React from 'react';
import {Link} from 'react-router';

export default (props) => {
  const selectedRoute = props.selectedRoute;
  console.log("route props",props);

  return (
    <div>
      <h1><span>{selectedRoute.routeId}</span>  <span>{selectedRoute.rtnm}</span></h1>

    </div>
  )
}