//require models, make associations

const Route = require('./route');
const Stop = require('./stop');
const User = require('./user');

// Stop.belongsTo(Route);
// Route.hasMany(Stop);

module.exports = {
  Stop,
  Route,
  User
};
