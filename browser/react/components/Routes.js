import {Link} from 'react-router';
import React from 'react';

export default (props) => {
  const routes = props.routes.sort((a,b) => {
    return +a.routeNumber.match(/\d+/)[0] - +b.routeNumber.match(/\d+/)[0];
  });

  return (
    <div className="item-container col-xs-10 col-sm-8 col-md-6 ">
      {
        routes && routes.map(route => (
          <Link
            to={`/routes/${route.routeNumber}`}
            className="list-group-item"
            key={route.routeNumber}>
              {`${route.routeNumber} ${route.name}`}
          </Link>
        ))
      }
    </div>
  );
};
