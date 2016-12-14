import React from 'react';
import {Link} from 'react-router';

export default (props) => {
  const routes = props.routes;

  return (
    <div>
      {
        routes && routes.map(route => (
          <div className="col-xs-12 col-sm-6 col-md-4" key={route.rt}>
            <Link to={`/routes/${route.rt}`}>
              <div className="list-group-item" key={route.rt}>
                <h5><span>{route.rt}</span>  <span>{route.rtnm}</span></h5>
              </div>
            </Link>
          </div>
        ))
      }
    </div>
  )
}