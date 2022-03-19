var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs')
var alert = require('alert');
var Twig = require('twig'),
    twig = Twig.twig;
    
var categoriesRouter = require('./routes/categories');
var operationsRecurentesRouter = require('./routes/operationsRecurentes');
var uploadBankRouter = require('./routes/uploadBank');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(logger('combined', { stream: accessLogStream }));

app.use('/operationsRecurentes', operationsRecurentesRouter);
app.use('/uploadBank', uploadBankRouter);
app.use('/categories', categoriesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error('Stop');
  res.render('error.twig',{message:err.message,status:err.status});
});

module.exports = app;
