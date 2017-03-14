import {Link} from 'react-router';
import React from 'react';

export default (props) => {
  const routes = props.routes.sort((a,b) => {
    return +a.routeNumber.match(/\d+/)[0] - +b.routeNumber.match(/\d+/)[0];
  });

  return (
    <div className="item-container">
      {
        routes && routes.map(route => (
          <div className="col-xs-12 col-sm-10 col-md-6 list-group-item" key={route.routeNumber}>
            <Link to={`/routes/${route.routeNumber}`}>
              {`${route.routeNumber} ${route.name}`}
            </Link>
          </div>
        ))
      }
    </div>
  );
};
