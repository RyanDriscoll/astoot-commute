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
          <div className="col-xs-12 col-sm-6 col-md-4" key={route.routeNumber}>
            <Link to={`/routes/${route.routeNumber}`}>
              <div className="list-group-item" >
                <h5><span>{route.routeNumber}</span>  <span>{route.name}</span></h5>
              </div>
            </Link>
          </div>
        ))
      }
    </div>
  )
}