import React from 'react';
import {Link} from 'react-router';


const Route = props => {
  const route = props.route;
  return (
    <Link
      to={`/routes/${route.routeNumber}`}
      className="list-group-item">
        {`${route.routeNumber} ${route.name}`}
    </Link>
  );
};

export default Route;
