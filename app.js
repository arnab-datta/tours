const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

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

// 2) ROUTE HANDLERS
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((t) => t.id === id);

  // if(id > tours.length){
  if (!tour) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  }
};

const createTour = (req, res) => {
  const newTourId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newTourId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((t) => t.id === id);
  if (!tour) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  } else {
    tour.name = req.body.name;
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        res.status(200).json({
          status: 'success',
          message: 'updated tour',
          data: { tour },
        });
      }
    );
  }
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((t) => t.id === id);
  if (!tour) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  } else {
    const udpatedTours = tours.filter((t) => t.id !== id);
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(udpatedTours),
      (err) => {
        res.status(204).json({
          status: 'success',
          message: 'deleted tour',
          data: null,
        });
      }
    );
  }
};

// 3) ROUTES

// // GET
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);

// // POST
// app.post('/api/v1/tours', createTour);

// // PATCH
// app.patch('/api/v1/tours/:id', updateTour);

// // DELETE
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// 4) START SERVER
const port = 8080;
app.listen(port, () => {
  // cb will be called as soon as the server start listening
  console.log(`App running at port ${port}`);
});
