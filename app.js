const express = require('express');
const morgan = require('morgan');
const globalErrorHanlder = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');

const app = express();

// 1) Middlewares

// Body Parsing: body parser alternative
app.use(express.json());

// Logging: morgan middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serving Static Files
app.use(express.static(`${__dirname}/public`));

// custom middleware
app.use((req, res, next) => {
  console.log('Hi I am the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTE HANDLERS --> controllers
// moved inside controllers

// 3) ROUTES --> routes
// moved inside routes folders
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Handling unhandled Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`), 404);
});

// Global Error Handling Middleware
app.use(globalErrorHanlder);

module.exports = app;
