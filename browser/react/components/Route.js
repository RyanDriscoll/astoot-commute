import React from 'react';
import {Link} from 'react-router';


class Route extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const route = this.props.route;
    return (
      <Link
        to={`/routes/${route.routeNumber}`}
        className="list-group-item">
          {`${route.routeNumber} ${route.name}`}
      </Link>
    );
  }
}

export default Route;
