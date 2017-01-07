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
      <div className="col-xs-12 col-sm-12 col-md-6" key={direction}>
        <Link to={`/routes/${selectedRoute.routeNumber}/${direction}`}>
          <div className="list-group-item" >
            <h2><span>{direction}</span></h2>
          </div>
        </Link>
      </div>

        ))
      }
    </div>
  )
}