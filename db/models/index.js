//require models, make associations

const Route = require('./route');
const Stop = require('./stop');

// Stop.belongsTo(Route);
// Route.hasMany(Stop);

module.exports = {
  Stop,
  Route
};
