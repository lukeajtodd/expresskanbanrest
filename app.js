var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/public', express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, '/node_modules')));

app.use( bodyParser.json() );  

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', index);

module.exports = app;
