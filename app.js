var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var name = require('./routes/name');
var properties = require('./routes/properties');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/public/*',
  function (req, res) {
    res.sendFile(__dirname + req.originalUrl);
  }
);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/resources/images', 'nodejs.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/name', name);
app.use('/properties', properties);

// catch 404 and forward to error handler
app.use(
  function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(
    function (err, req, res) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: 'error 1'
      });
    }
  );
}

// production error handler
// no stacktraces leaked to user
app.use(
  function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  }
);

module.exports = app;
