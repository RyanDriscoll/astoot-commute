import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const Directions = (props) => {
  const selectedRoute = props.selectedRoute;
  const directions = selectedRoute.directions;

  return (
    <div className="tracker-container">
      {`${selectedRoute.routeNumber} ${selectedRoute.name}`}
        <div className="item-container col-xs-10 col-sm-8 col-md-6 ">
        {
          directions && directions.map(direction => (
            <Link
              to={`/routes/${selectedRoute.routeNumber}/${direction}`}
              className="list-group-item"
              key={direction}>
                {direction}
            </Link>
          )
        )
      }
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    selectedRoute: state.cta.selectedRoute,
  };
}

export default connect(mapStateToProps)(Directions);