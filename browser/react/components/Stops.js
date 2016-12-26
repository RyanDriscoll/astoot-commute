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
    <div>
      {
        stops && stops.map(stop => (
          <div className="col-xs-12 col-sm-6 col-md-4" key={stop.id}>
            <Link to={`/routes/${route.routeNumber}/${direction}`}>
              <div className="list-group-item" >
                <h5><span>{stop.name}</span></h5>
              </div>
            </Link>
          </div>
        ))
      }
    </div>
  )
}