var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const connectDb = require("./dbConnection");


const AllowCORS = require('./middlewares/cors_policy');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require('./routes/userRoutes');
var projectsRouter = require('./routes/projectRoutes');
var projectContractorsRouter = require('./routes/projectContractorRoute');
var questionRouter = require('./routes/securityQuestionRoutes');
var documentRouter = require('./routes/documentRoute');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(AllowCORS); // for CORS Policy

// Mongodb conncetion with the database_uri
connectDb();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/user', userRouter);
app.use('/api/project/contractor', projectContractorsRouter);
app.use('/api/project', projectsRouter);
app.use('/api/question', questionRouter);
app.use('/api/document', documentRouter);

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
  res.render('error');
});

module.exports = app;
