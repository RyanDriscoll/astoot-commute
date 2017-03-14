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
          <div className="col-xs-12" key={route.routeNumber}>
            <Link to={`/routes/${route.routeNumber}`}>
              <div className="list-group-item" >
                {`${route.routeNumber} ${route.name}`}
              </div>
            </Link>
          </div>
        ))
      }
    </div>
  );
};
