import {Link} from 'react-router';
import React from 'react';

export default (props) => {
  const direction = props.direction;
  const stops = props.stops.sort((a,b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  const route = props.selectedRoute;

  // todo - link to predictions

  return (
    <div className="item-container col-xs-10 col-sm-8 col-md-6">
      {
        stops && stops.map(stop => (
          <Link
            to={`/arrivals/${route.routeNumber}/${direction}/${stop.stopId}`}
            className="list-group-item"
            key={stop.id}>
              {stop.name}
          </Link>
        ))
      }
    </div>
  )
}