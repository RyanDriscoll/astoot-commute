import React from 'react';
import {Link} from 'react-router';

export default (props) => {
  const selectedRoute = props.selectedRoute;
  const directions = selectedRoute.directions;

  return (
    <div>
      <h1><span>{selectedRoute.routeNumber}</span>  <span>{selectedRoute.name}</span></h1>
      {
        directions && directions.map(direction => (

      <Link className="btn btn-primary" key={direction} to={`/routes/${selectedRoute.routeNumber}/${direction}`}>
        <span>{direction}</span>
      </Link>

        ))
      }
    </div>
  )
}