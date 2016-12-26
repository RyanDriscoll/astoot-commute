const express = require('express');
const app = express();
const router = require('./routes/cta');
const startDb = require('./db');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = 1337;

app.use(express.static('./public'));
app.use(express.static('./node_modules'));
app.use(express.static('./browser'));

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/api', router);

// error handling
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// create server
// const server =

startDb.then(() => {
  app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
  });
});

// set up sockets
// const io = require('socket.io').listen(server);

// io.sockets.on('connection', function (socket) {
//   console.log('connected to socket');
// });
