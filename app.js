const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) Middlewares

// body parser alternative
app.use(express.json());

// morgan middleware
app.use(morgan('dev'));

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

// 3) ROUTES --> routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) START SERVER
module.exports = app;
