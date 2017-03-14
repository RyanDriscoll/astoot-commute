import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const Route = (props) => {
  const selectedRoute = props.selectedRoute;
  const directions = selectedRoute.directions;

  return (
    <div className="tracker-container">
      {`${selectedRoute.routeNumber} ${selectedRoute.name}`}
      {
        directions && directions.map(direction => (
          <div className="list-group-item" key={direction}>
            <Link to={`/routes/${selectedRoute.routeNumber}/${direction}`}>
                {direction}
            </Link>
          </div>
        )
      )
      }
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    selectedRoute: state.cta.selectedRoute,
  };
}

export default connect(mapStateToProps)(Route);