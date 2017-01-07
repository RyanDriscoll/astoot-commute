import {Link} from 'react-router';
import React from 'react';

export default (props) => {

  const routes = props.routes.sort((a,b) => {
    return +a.routeNumber.match(/\d+/)[0] - +b.routeNumber.match(/\d+/)[0];
  });

  return (
    <div>
      {
        routes && routes.map(route => (
          <div className="col-xs-12 col-sm-12 col-md-6" key={route.routeNumber}>
            <Link to={`/routes/${route.routeNumber}`}>
              <div className="list-group-item" >
                <h2><span>{route.routeNumber}</span>  <span>{route.name}</span></h2>
              </div>
            </Link>
          </div>
        ))
      }
    </div>
  )
}