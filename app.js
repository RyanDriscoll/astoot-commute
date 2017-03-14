const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes');
const startDb = require('./db');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));
app.use(express.static('./node_modules'));
app.use(express.static('./browser'));



app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/api', router);

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'browser', 'index.html'));
});


// error handling
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

startDb.then(() => {
  app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
  });
});

