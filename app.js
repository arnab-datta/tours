const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

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

// 4) START SERVER
module.exports = app;
